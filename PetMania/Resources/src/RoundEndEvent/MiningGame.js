
//======================================================================================================================
cc.MiningGame = cc.A_RoundEndEvent.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //
        this._running = false;
        this._mineFactories = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this._super();

        //
        this._running = false;
        this._mineFactories = [];

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "MiningGame";
    },

    //------------------------------------------------------------------------------------------------------------------
    isRunning: function()
    {
        return this._running;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMineFactories: function()
    {
        return this._mineFactories;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(gameLevel)
    {
        this.cleanUp();

        //
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        this._running = curLevelData && (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_MINE || curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_MINELOTTERY);

        //
        if (!this.isRunning())
        {
            cc.log("不是采矿模式 放弃初始化");
            return this;
        }

        //
        cc.log("是采矿模式 初始化!!!!!!!");
        this.initFactories(gameLevel);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    test0: function()
    {
        //
        this._mineFactories.forEach(
            function(factory)
            {
                var normalFactories = [];
                for (var grid = factory.getParentNode().getGridByDirection(Defines.DIRECTION.TOP);
                     grid;
                     grid = grid.getGridByDirection(Defines.DIRECTION.TOP)
                    )
                {
                    if (grid instanceof cc.EmptyGrid
                        && grid.getContent() instanceof cc.Obj_Factory)
                    {
                        normalFactories.push(grid);
                    }
                }

                if (normalFactories.length <= 0)
                {
                    cc.log("factory = " + factory + "正上方没有工厂???!!!!!!!");
                    cc.Assert(0);
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    initFactories: function(gameLevel)
    {
        //
        var itr = gameLevel.getTable().createIterForEmptyObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var obj = itr.getCurrent();
            if (!obj)
            {
                continue;
            }

            if (obj instanceof cc.Obj_FactoryMine)
            {
                this._mineFactories.push(obj);
            }
        }

        if (this._mineFactories.length <= 0)
        {
            cc.log("这关有问题 一个矿脉都没有??????");
            cc.Assert(0);
            return this;
        }

        //
        cc.log("采矿模式的矿脉 = " + this._mineFactories);
        this.test0();

        //
        this._mineFactories.forEach(
            function(factory)
            {
                factory.parseMyGrids(gameLevel);
            }
        );


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    /*testRoundEnd: function(gameLevel)
    {
        this.getMineFactories().forEach(
            function(factory)
            {
                factory.getGridsDeep().forEach(
                    function(grid)
                    {
                        gameLevel.disposal(grid.getMiddleObject());

                        var createNew = cc.Obj_MonsterMine.create();
                        grid.addNode(createNew);
                        createNew.updateNodePosition();
                        createNew.renderNode();
                    }
                );
            }
        );

        return this;
    },*/

    //------------------------------------------------------------------------------------------------------------------
    roundEnd: function(gameLevel)
    {
        this._super();

        if (!this.isRunning())
        {
            return this;
        }
		
        //var allDiamond = this.getDiamond(gameLevel);

        /*var handleTick = */this.diamondTick(gameLevel/*, allDiamond*/);

//        if (this.m_MinBombs > 0)
//        {
//            this.createBombsToFacotry(gameLevel, allBombs);
//        }
        //this.testRoundEnd(gameLevel);

        //
        if (this.isAllMineInHeightEmpty())
        {
            cc.log("水平线以上空了????????");
            var needMoveStep = this.parseAllRiseStep(gameLevel);
            if (needMoveStep > 0)
            {

                var newCmd = Cmd_MineRiseGroup.create(needMoveStep);
                if (newCmd)
                {
                    //cc.log("整体矿石上升 ＝ " + needMoveStep);
                    gameLevel.addCommand(newCmd);
                    //cc.log("playStoneShift");
                    cc.AudioMng.getInstance().playStoneShift();
                }
            }
            else
            {
                cc.log("没有可以移动的步数 不能移动!!!!");
            }
        }
		
		var curMonsterNum = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_Monster");
		cc.log("curMonsterNum mineGame =  " + curMonsterNum);
		var curLevelData = cc.DataMng.getInstance().getCurLevelData();
		if (curMonsterNum >= cc.MineMng.getInstance().getPROGRESS_LINE()){
			gameLevel.addCommand(cc.Cmd_MiningGameBonusTotal.create());
		}
        return true;
    },
	
	//--------------------------------------------------------------------------------------------------------------
    diamondTick: function(gameLevel/*, allDiamond*/)
    {
        var itr = gameLevel.getTable().createIterForMiddleObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var obj = itr.getCurrent();
            if (!obj || !(obj instanceof cc.Obj_MonsterDiamond))
            {
                continue;
            }

            if (!obj.tick(gameLevel))
            {
                continue;
            }

            cc.AudioMng.getInstance().playDiamondGone();

            //
            var parent = obj.getParentNode();
            cc.log("Obj_MonsterDiamond 时间到期 = " + obj + "，创建普通的矿石添加给 = " + parent);
            gameLevel.disposal(obj);

            //
            var createNew = cc.Obj_MonsterMine.create(true);
            parent.addNode(createNew);
            createNew.updateNodePosition();
            createNew.renderNode();
        }

        /* old
        //
        var handle = false;
        var timeoutArray = [];

        //
        allDiamond.forEach(
            function(a_diamond)
            {
                var isTimeout = a_diamond.tick(gameLevel);
                if (isTimeout)
                {
                    timeoutArray.push(a_diamond);
                }
            }
        );

        //
        timeoutArray.forEach(
            function(a_diamond)
            {
				//临时
                var cmd = cc.Cmd_CreateMineDiamond.create(a_diamond);
                if (cmd)
                {
                    gameLevel.addCommand(cmd);
                    handle = true;
				
                }
            }
        );
        */

        return this;
    },
    //--------------------------------------------------------------------------------------------------------------
    getDiamond: function(gameLevel)
    {
        var allDiamond = [];

        var itr = gameLevel.getTable().createIterForMiddleObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var obj = itr.getCurrent();
            if (!obj)
            {
                continue;
            }

            if (obj instanceof cc.Obj_MonsterDiamond)
            {
               allDiamond.push(obj);
            }
			
			/*if (obj instanceof cc.Obj_BombTip)
            {
                allBombs.push(obj);
            }*/
        }

        return allDiamond;
    },
    //------------------------------------------------------------------------------------------------------------------
    //分析上升高度???
    parseAllRiseStep: function()
    {
        //var stepMap = {};
        var stepArr = [];

        this.getMineFactories().forEach(
            function(factory)
            {
                //stepMap[factory.toString()] = factory.parseRiseStep();
                stepArr.push(factory.parseRiseStep());
            }
        );

       /* for (var facDesc in stepMap)
        {
            if (stepMap.hasOwnProperty(facDesc))
            {
                cc.log(facDesc + " step = " + stepMap[facDesc]);
            }
        }*/

        stepArr.sort(
            function(left, right)
            {
                return left < right? -1 : 1;
            }
        );
		cc.log("stepArr[0] = " + stepArr[0]);
		
        return stepArr[0] - 1;
    },

    //------------------------------------------------------------------------------------------------------------------
    getAllMineInHeight: function()
    {
        var allMine = [];
        this.getMineFactories().forEach(
            function(factory)
            {
                var mine = factory.getMineObjectsInHeight();
                if (mine.length > 0)
                {
                    allMine = allMine.concat(mine);
                }
            }
        );

        cc.log("所有水平线以上的矿石???? = " + allMine);
        return allMine;
    },

    //------------------------------------------------------------------------------------------------------------------
    isAllMineInHeightEmpty: function()
    {
        return this.getAllMineInHeight().length <= 0;
    }
});

cc.MiningGame._instance = null;
cc.MiningGame.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.MiningGame();
        cc.RoundEndEventsManager.getInstance().addChildEventMng(this._instance);
    }

    return this._instance;
};



