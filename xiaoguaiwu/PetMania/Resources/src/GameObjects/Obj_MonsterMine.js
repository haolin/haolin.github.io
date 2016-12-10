var ifKuangLineShow = false;


//矿石怪物

//======================================================================================================================
var MonsterMineRender = MonsterRender.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(node)
    {
        this._super(node);

        if ((!node instanceof cc.Obj_MonsterMine))
        {
            cc.Assert(0)
        }
		
    },

    //------------------------------------------------------------------------------------------------------------------
    createMySprite: function()
    {
        var newSprite = null;
		var panel = null;
		newSprite = cc.Sprite.createWithSpriteFrameName("dikuai01.png");

        //
        var gridSize = Defines.TABLE_GRID_SIZE;
		var contentPanelName = "fengeceng.png";
		var orignalPanel = cc.Sprite.createWithSpriteFrameName(contentPanelName);
		var orignalSize = orignalPanel.getContentSize();
//		var destroy1 = /*cc.DataMng.getInstance().getRecordDestroy*/DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterMineDesLine");
//		destroy1 = destroy1 || 0;
		var targetSize = cc.size(gridSize * 9.7, orignalSize.height);

        var overLineHeight = (_ScreenHeight() - gridSize * 11)/2 + gridSize + gridSize * 3;

//        var desLabel = null;
		if (!ifKuangLineShow){
			
            panel = cc.Scale9Sprite.createWithSpriteFrameName(contentPanelName,
					cc.rect(13 * Defines.BASE_SCALE, 10 * Defines.BASE_SCALE, 11 * Defines.BASE_SCALE, 5 * Defines.BASE_SCALE));
            panel.setPreferredSize(targetSize);
			panel.setPosition(cc.p(_ScreenWidth()/2 + newSprite.getContentSize().width*1.25 , overLineHeight));
//			
//			desLabel = GUI.createNumberLabel(destroy1.toString(), _GUIPath + "Num/num_1_18x22.png", 18, 22,"0");
////			var targetSize = cc.size(newSprite.getContentSize().width * 9.7, orignalSize.height);
//			gameTableLayer().addChild(desLabel,Defines.BATCH_NODE.OBJECT_GATE.Z + 1);
//			desLabel.setAnchorPoint(cc.p(0.5, 0.5));
//			desLabel.setPosition(cc.p(_ScreenWidth()/2 + newSprite.getContentSize().width*1.25 + targetSize.width* 0.46,  overLineHeight +orignalSize.height * 0.06));
//			desLabel.setScale(0.85);
		
			gameTableLayer().addChild(panel, Defines.BATCH_NODE.OBJECT_GATE.Z);     
			ifKuangLineShow = true;

		}

//		if (desLabel!=null){
//			desLabel.setString(destroy1.toString());
//		}
//		else {
//			desLabel = GUI.createNumberLabel(destroy1.toString(),_GUIPath + "Num/num_1_18x22.png", 18, 22,"0");
////			var targetSize = cc.size(newSprite.getContentSize().width * 9.7, orignalSize.height);
//			gameTableLayer().addChild(desLabel , Defines.BATCH_NODE.OBJECT_GATE.Z + 1);
//			desLabel.setAnchorPoint(cc.p(0.5, 0.5));
//			desLabel.setPosition(cc.p(_ScreenWidth()/2 + newSprite.getContentSize().width*1.25 + targetSize.width* 0.46,  overLineHeight +orignalSize.height * 0.06));
//			desLabel.setScale(0.85);
//		}
//
        if (this.getNode() instanceof cc.Obj_MonsterMineRad)
        {
			newSprite = cc.Sprite.createWithSpriteFrameName("tebiedikuai.png");
        }
        else if (this.getNode() instanceof cc.Obj_MonsterMineTask)
		{
			newSprite = cc.Sprite.createWithSpriteFrameName("dikuai0" + this.getNode().getMineLevel() + ".png");
			if (this.getNode().getMineLevel() == 1){
				var taskSprite = cc.Sprite.createWithSpriteFrameName("caikuangdaoju.png");
				newSprite.addChild(taskSprite, 10000);
				taskSprite.setAnchorPoint(cc.p(0.5, 0.5));
				taskSprite.setPosition(cc.p(newSprite.getContentSize().width/2, newSprite.getContentSize().height/2));
			}			
		}
        else if (this.getNode() instanceof cc.Obj_MonsterSpecial){
//            newSprite = cc.Sprite.createWithSpriteFrameName("images-zuanshidi-0" + this.getNode().getMineLevel() + ".png");
            newSprite = cc.Sprite.createWithSpriteFrameName("tebiedikuai.png");
        }
		else if (this.getNode() instanceof cc.Obj_MonsterDiamond)// || this.getNode() instanceof cc.Obj_MonsterSpecial)
		{
//			newSprite = cc.Sprite.createWithSpriteFrameName("images-zuanshidi-0" + this.getNode().getMineLevel() + ".png");
			newSprite = cc.Sprite.createWithSpriteFrameName("tebiedikuai.png");
		}
        else {
			newSprite = cc.Sprite.createWithSpriteFrameName("dikuai0" + this.getNode().getMineLevel() + ".png");
        }
        var batchNode = objectsNode();
        if (batchNode)
        {
            newSprite.setVisible(false);
            batchNode.addChild(newSprite, this.getNode().getZOrder());
        }		

        return newSprite;
    },
    //------------------------------------------------------------------------------------------------------------------
    updateNumSprite: function(sprite)
    {
        sprite.removeChildByTag(_BOMB_NUM_SPRITE_TAG);

        var numSprite = GUI.createNumberLabel(this.getNode().getDiamondTime().toString(), _GUIPath + "Num/num_1_18x22.png", 18, 22,"0");
        sprite.addChild(numSprite, 10000, _BOMB_NUM_SPRITE_TAG);
        numSprite.setAnchorPoint(cc.p(0.5, 0.5));
        numSprite.setPosition(cc.p(sprite.getContentSize().width * 0.8, sprite.getContentSize().height * 0.2));

        if (this.getNode().getDiamondTime() < 4){
            var time = Defines.FPS * 20;
            numSprite.runAction(
                cc.Sequence.create(
                    cc.ScaleTo.create(time, 1.25, 1.25),
                    cc.ScaleTo.create(time, 1, 1)
                )
            );
        }
        return this;
    }
});

//======================================================================================================================
cc.Obj_MonsterMineDesLine = cc.INodeObject.extend({

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_MonsterMineDesLine";
    }
});

//======================================================================================================================
cc.Obj_MonsterMine = cc.Obj_Monster.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(level)
    {
        //
        this._super(Defines.COLOR.NULL);

        //没有匹配消除的规则
        //this.m_DesRule = null;

        //将渲染部分 分离出来
        this.m_MyRender = null;

        var radSum = 3;
        var radRes = Tools.randomEx(radSum) || 1;
        //
        this.m_MineLevel = level || radRes;

        this.isDirty = false;
    },

    setDirty: function()
    {
        this.isDirty = true;
    },

    getDirty: function()
    {
        return this.isDirty;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_MonsterMine";
    },

    //------------------------------------------------------------------------------------------------------------------
    getDestroyRule: function()
    {
        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        var parent = this.getParentNode();
        if (parent)
        {
            var gridPos = parent.getGridPos();
            return this.description() + "(" + gridPos.x + ", " + gridPos.y + ") ";
        }

        return this.description();
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        this._super();

        //
        if (this.m_MyRender)
        {
            this.m_MyRender.release();
            this.m_MyRender = null;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    destroy: function(desSrc, gameLevel, visitor)
    {
        var self = this;
        if (visitor)
        {
            visitor.visit(this);
//            /*cc.DataMng.getInstance().recordDestroy*/_DiaryDestroyNodeObject(this);
        }

        --this.m_MineLevel;
        if (this.m_MineLevel > 0)
        {
            this.m_MyRender.release();
            this.m_MyRender.render();
        }
        else
        {
            cc.AudioMng.getInstance().playStoneBreak();

            //检查消除了多少行
            this.checkDestroyRow();

            //爆炸中心是不是我 我都直接消除
            gameLevel.disposal(this);

//			var levelData = cc.DataMng.getInstance().getCurLevelData();
//            if (levelData ){
                var radSum = 100;
                var radRes = Tools.randomEx(radSum);
                if (radRes > cc.MineMng.getInstance().getDIAMONDS_NOR_RATE()){
                    return this;
                }
//            }

            var getDiamond = 5;

            _DiaryDestroyNodeObject(this, getDiamond);

            cc.AudioMng.getInstance().playDiamondGet();

            cc.EffectMng.getInstance().displayScore(
                getDiamond,
                this.getPosition(),
                Defines.COLOR.YELLOW
            );

            var targetRect = cc.GUIGameLevel.getInstance().getTargetRectForGuide();
            var pos = cc.p(200,200);
            cc.EffectMng.getInstance().addDiamondFlyTo(getDiamond, this.getPosition(), cc.p(targetRect.x+targetRect.width/2,targetRect.y+targetRect.height/2));

        }

        return this;
    },

    checkRowRule: function(parent){
        var dirs = [Defines.DIRECTION.LEFT, Defines.DIRECTION.RIGHT];
        var isEmpty = true;

        //
        for (var indx = 0; indx < dirs.length; ++indx)
        {
            var a_dir = dirs[indx];
            for (var grid = parent.getGridByDirection(a_dir);
                 grid;
                 grid = grid.getGridByDirection(a_dir))
            {
                if (grid.getMiddleObject && grid.getMiddleObject() && grid.getMiddleObject() instanceof cc.Obj_MonsterMine)
                {
                    isEmpty = false;
                    break;
                }
            }
        }
        return isEmpty;
    },

    //------------------------------------------------------------------------------------------------------------------
    checkDestroyRow: function()
    {
        //
        var parent = this.getParentNode();

        var isEmpty = false;

        var upDir = Defines.DIRECTION.TOP;
        var topGrid = parent;

		for (var grid = parent.getGridByDirection(upDir);
			 grid ;
			 grid = grid.getGridByDirection(upDir))
		{
            if (grid.getMiddleObject && grid.getMiddleObject() && !(grid.getMiddleObject() instanceof cc.Obj_MonsterMine)){
                break;
            }
//
//            if (grid.getDirty()){
//                break;
//            }

            var nextGrid = grid.getGridByDirection(upDir);
            var nextObj = null;
            if (nextGrid && nextGrid.getMiddleObject && nextGrid.getMiddleObject()){
                nextObj = nextGrid.getMiddleObject();
            }
            if (!nextGrid || !nextObj || !(nextObj instanceof cc.Obj_MonsterMine)){
                topGrid = grid;
//                topGrid.setDirty();
                break;
            }
		}

        isEmpty = this.checkRowRule(topGrid);

        if (isEmpty)
        {
            cc.log("消除了一行的矿物!!!!!!!");
            /*cc.DataMng.getInstance().recordDestroy*/_DiaryDestroyNodeObject(new cc.Obj_MonsterMineDesLine());
            cc.DataMng.getInstance().notifyGUIObservers(NOTIFY_EVENT.FOR_MINE);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //被通知销毁
    beNotifiedDestroy: function(notifySrc, gameLevel, visitor)
    {
        var isCross = notifySrc.getPosition().x == this.getPosition().x
            || notifySrc.getPosition().y == this.getPosition().y;

        if (isCross)
        {
            this.destroy(notifySrc, gameLevel, visitor);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //是否可手动移动
    canTouch: function()
    {
        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMineLevel: function()
    {
        return this.m_MineLevel;
    }
});




//======================================================================================================================
//带钻石的矿石
cc.Obj_MonsterDiamond = cc.Obj_MonsterMine.extend({
    //------------------------------------------------------------------------------------------------------------------
    ctor: function(level, levelData)
    {
        //
        this._super(level);
        this.m_DiamondLine = 20;
        this.m_DiamondTime = this.m_DiamondLine;
        this.m_levelData = levelData;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_MonsterDiamond";
    },
    getDiamondTime: function()
    {
        return this.m_DiamondTime;
    },
    //--------------------------------------------------------------------------------------------------------------
    tick: function()
    {
        var overLineHeight = Defines.TABLE_GRID_SIZE * 3.5;
        var mySprite = this.getRender().getSprite();

        cc.log("mySprite.getPosition().y  = " + mySprite.getPosition().y );
        cc.log("overLineHeight = " + overLineHeight);

        if (mySprite.getPosition().y > overLineHeight){
            --this.m_DiamondTime;
            if (this.m_DiamondTime <= 0)
            {
                this.m_DiamondTime = 0;
            }
        }
//        else if (this.m_DiamondTime != this.m_DiamondLine){
//            this.m_DiamondTime = this.m_DiamondLine;
//        }


//        if (this.getRender())
//        {
//            this.getRender().updateNumSprite(this.getRender().getSprite());
//        }

        return this.m_DiamondTime <= 0;
    },

    getShock : function(pos){
        var distance = 20 * Defines.BASE_SCALE;
        var deltaTime = 2;
        var delta = 2;
        var centerPos = cc.p(pos.x,pos.y);
        var endPos = cc.p(pos.x,pos.y);
        var targetPos = centerPos;
        targetPos.y -= distance;

        var Sq = cc.Sequence.create(
            cc.MoveTo.create(
                Defines.FPS*deltaTime,
                cc.p(pos.x,pos.y - distance)
            ),
            cc.MoveTo.create(
                Defines.FPS*deltaTime,
                cc.p(pos.x,pos.y + distance)
            ),

            cc.CallFunc.create(
                function (sender)
                {
                    var position = sender.getPosition();
                    sender.setPosition(pos);
                },
                null)
        );
        return Sq;
    },

    //------------------------------------------------------------------------------------------------------------------
    //被通知销毁
    beNotifiedDestroy: function(notifySrc, gameLevel, visitor)
    {
        var isCross = notifySrc.getPosition().x == this.getPosition().x
            || notifySrc.getPosition().y == this.getPosition().y;

        if (isCross)
        {

            this.destroy(notifySrc, gameLevel, visitor);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    destroy: function(desSrc, gameLevel, visitor, nowDestroy)
    {
        var self = this;
        var curLevel = null;
        if (desSrc && desSrc.getLevel){
            cc.log("desSrc.getLevel = " + desSrc.getLevel());
            curLevel = desSrc.getLevel();
        }

//		cc.log("destroy cur level = " + curLevel);
//        cc.log("nowDesroy = " + nowDestroy);
        if (visitor)
        {
            visitor.visit(this);
        }

		if (!this.m_levelData){
			this.m_levelData = cc.DataMng.getInstance().getCurLevelData();
		}

        if (!nowDestroy){
            if (cc.MineMng.getInstance().getDIAMONDS_GET()){
				var radSum = 100;
				var radRes = Tools.randomEx(radSum);
                var curLevelRate = cc.DataMng.getInstance().getMineGameLevelDiamondRate(curLevel);

                //计算盈亏
                var finalStepArr = cc.DataMng.getInstance().getMineGameLevelStep();
                var totalCostDiamond = 0;

                for (var i = 0; i < 9 ; i++){
                    var levelNum = cc.MineMng.getInstance().getMINE_LEVEL_SETTING()[i];
                    finalStepArr[i] = finalStepArr[i] || 0;
                    totalCostDiamond += finalStepArr[i] * levelNum[0];
                }

                totalCostDiamond += cc.MineMng.getInstance().getSTAR_NOTFILL_NUM() * cc.MineMng.getInstance().getSTAR_NUM();
                var mineDesLine = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterDiamond");
                var ifWin = mineDesLine - totalCostDiamond;

                cc.log("mineDesLine = " +mineDesLine );
                cc.log("totalCostDiamond = " + totalCostDiamond);
                cc.log("ifWin = " +ifWin );

                var winValueRate = (ifWin >= 200) ? 0.7 : 1;

				if (radRes > winValueRate * (cc.MineMng.getInstance().getDIAMONDS_GET()[this.m_MineLevel - 1] + curLevelRate)){
					return this;
				}
			}
        }

        var getDiamond = cc.MineMng.getInstance().getDIAMONDS_GET_NUM()[this.m_MineLevel - 1] || 0;

        var radSum = 100;
        var radRes = Tools.randomEx(radSum);
        if (radRes == 3){
            getDiamond = 1000;
        }

        if (this.m_DiamondTime > 0){

            _DiaryDestroyNodeObject(this, getDiamond);

            cc.AudioMng.getInstance().playDiamondGet();

            cc.EffectMng.getInstance().displayScore(
                getDiamond,
                this.getPosition(),
                Defines.COLOR.YELLOW
            );

            var targetRect = cc.GUIGameLevel.getInstance().getTargetRectForGuide();
            var pos = cc.p(200,200);
			cc.EffectMng.getInstance().addDiamondFlyTo(getDiamond, this.getPosition(), cc.p(targetRect.x+targetRect.width/2,targetRect.y+targetRect.height * 0.5));
        }
        //检查消除了多少行
        this.checkDestroyRow();

        //爆炸中心是不是我 我都直接消除
        gameLevel.disposal(this);


        return this;
    }
});
cc.Obj_MonsterDiamond.create = function()
{
    var createNew = new cc.Obj_MonsterDiamond(1);
    if (createNew)
    {
        createNew.setRender(new MonsterMineRender(createNew));
    }

    return createNew;
};

//======================================================================================================================
//带特殊奖励的矿石
cc.Obj_MonsterSpecial = cc.Obj_MonsterDiamond.extend({
    //------------------------------------------------------------------------------------------------------------------
    ctor: function(level, levelData, giftType, idx)
    {
        //
        this._super(level, levelData);
        this._giftType = giftType;
        this._idx = idx;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_MonsterSpecial";
    },
    //------------------------------------------------------------------------------------------------------------------
    destroy: function(desSrc, gameLevel, visitor)
    {
        var self = this;
        cc.log("destroy task level = " + this.m_MineLevel);

        if (visitor)
        {
            visitor.visit(this);
        }

//        if (this.m_levelData && !nowDestroy){
//            if (this.m_levelData.DIAMONDS_GET){
//                var radSum = 100;
//                var radRes = Tools.randomEx(radSum);
//                if (radRes > this.m_levelData.DIAMONDS_GET[this.m_MineLevel - 1]){
//                    return this;
//                }
//            }
//        }

        var sourceName = null;
		var itemArr = _GetMineSpecialArr();

        var targetItem = itemArr[this._giftType - 1];
//        switch (this._giftType){
//            case Defines.GameMineSpecial.ITEM_DIRECTION_EX.ID:
//                targetItem = Defines.GameMineSpecial.ITEM_DIRECTION_EX;
//                break;
//            case Defines.GameMineSpecial.ITEM_COLORFUL_EX.ID:
//                targetItem = Defines.GameMineSpecial.ITEM_COLORFUL_EX;
//                break;
//            case Defines.GameMineSpecial.ITEM_WARP_EX.ID:
//                targetItem = Defines.GameMineSpecial.ITEM_WARP_EX;
//                break;
//            default :
//                targetItem = Defines.GameMineSpecial.ITEM_DIRECTION_EX;
//                break;
//        }

        if (targetItem){
            DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().addCreateEventToDiary("mineSpecial_" + targetItem.NAME);
            sourceName = targetItem.SPRITESOURCE;
        }
//        cc.AudioMng.getInstance().playDiamondGet();

//        cc.EffectMng.getInstance().displayScore(
//            getDiamond,
//            this.getPosition(),
//            Defines.COLOR.YELLOW
//        );

        var targetRect = cc.GUIGameLevel.getInstance().getTargetRectForGuide();
        if (this._idx == 0){
            targetRect.y = targetRect.y+targetRect.height/2;
        }
        else {
            targetRect.y = targetRect.y+targetRect.height * 0.26;
        }

        var pos = cc.p(200,200);
        cc.EffectMng.getInstance().addItemsFlyTo(sourceName, this.getPosition(), cc.p(targetRect.x+targetRect.width/2,targetRect.y));
        //检查消除了多少行
        this.checkDestroyRow();

        //爆炸中心是不是我 我都直接消除
        gameLevel.disposal(this);

        return this;
    }
});
cc.Obj_MonsterSpecial.create = function(itemIdx,levelData)
{
//
//    var desLineFlag = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().getCreateObjectContent("desLine_" + desLineNum)||0;
////    if (desLineNum == levelData.SPEC_AWARDPOINT[0] || desLineNum == levelData.SPEC_AWARDPOINT[0] + levelData.SPEC_AWARDPOINT[1] + Tools.randomEx(levelData.SPEC_AWARDPOINT[2])){
//    if (!desLineFlag){
//        var targetDesLine = levelData.SPEC_AWARD.concat();
//        var rateDesLine = levelData.SPEC_RATE.concat();
//        var radSum = 0;
//        var getRad = Tools.randomEx(100);
//        for (var i = 0; i < targetDesLine.length; i++){
//            radSum += rateDesLine[i];
//            if (getRad < radSum){
//                createNew = new cc.Obj_MonsterSpecial(1,levelData,targetDesLine[i], i);
//                if (createNew)
//                {
//                    createNew.setRender(new MonsterMineRender(createNew));
//                }
//                DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().addCreateEventToDiary("desLine_" + desLineNum);
//                return createNew;
//            }
//        }
//    }

    var targetDesLine = cc.MineMng.getInstance().getSpec_Award();
    var desLineNum = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterMineDesLine");
    desLineNum = desLineNum || 0;

    var createNew = new cc.Obj_MonsterSpecial(1,levelData,targetDesLine[itemIdx], itemIdx);
    if (createNew)
    {
        createNew.setRender(new MonsterMineRender(createNew));
    }
    DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().addCreateEventToDiary("desLine_" + desLineNum);
    return createNew;
};

//======================================================================================================================
//放射性矿石
cc.Obj_MonsterMineRad = cc.Obj_MonsterMine.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super(0);
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_MonsterMineRad";
    },

    //------------------------------------------------------------------------------------------------------------------
    destroy: function(desSrc, gameLevel, visitor)
    {
        var canDes = desSrc instanceof cc.Obj_Monster && desSrc.isSpecial();
        if (!canDes)
        {
            return this;
        }

        if (visitor)
        {
            visitor.visit(this);
            /*cc.DataMng.getInstance().recordDestroy*/_DiaryDestroyNodeObject(this);
        }

        //检查消除了多少行
        this.checkDestroyRow();

        //爆炸中心是不是我 我都直接消除
        gameLevel.disposal(this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //只能被范围攻击
    beNotifiedDestroy: function(/*notifySrc, gameLevel, visitor*/)
    {
        return this;
    }
});

//

//======================================================================================================================
//任务型矿石
cc.Obj_MonsterMineTask = cc.Obj_MonsterMine.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(level)
    {
        //
        this._super(level);

    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_MonsterMineTask";
    },

    //------------------------------------------------------------------------------------------------------------------
    destroy: function(desSrc, gameLevel, visitor)
    {
		cc.log("destroy task level = " + this.m_MineLevel);
        if (visitor)
        {
            visitor.visit(this);
        }

        --this.m_MineLevel;
        if (this.m_MineLevel > 0)
        {
            this.m_MyRender.release();
            this.m_MyRender.render();
        }
        else
        {
			/*cc.DataMng.getInstance().recordDestroy*/_DiaryDestroyNodeObject(this);
		
            //检查消除了多少行
            this.checkDestroyRow();

            //爆炸中心是不是我 我都直接消除
            gameLevel.disposal(this);
        }

        return this;
    }

});
//
cc.Obj_MonsterMine.TYPE = {
	rad: "rad",
    task: "task",
	normal_1: "normal_1",
	normal_2: "normal_2",
	normal_3: "normal_3",
	diamond: "diamond"
};

////
cc.Obj_MonsterMine.randType = function(simple)
{
	var randomItemData_1 = [//]cc.Obj_MonsterMine.TYPE.rad,
//            cc.Obj_MonsterMine.TYPE.task,//支线模式不包括任务矿石
//        cc.Obj_MonsterMine.TYPE.normal_1,
		cc.Obj_MonsterMine.TYPE.normal_2,
		cc.Obj_MonsterMine.TYPE.normal_3
//			cc.Obj_Mons                                         terMine.TYPE.diamond
    ];
    var randomItemData_2 = [//cc.Obj_MonsterMine.TYPE.rad,
//            cc.Obj_MonsterMine.TYPE.task,//支线模式不包括任务矿石
        cc.Obj_MonsterMine.TYPE.normal_1,
		cc.Obj_MonsterMine.TYPE.normal_2,
		cc.Obj_MonsterMine.TYPE.normal_3,
			cc.Obj_MonsterMine.TYPE.diamond
    ];


    if (simple){
        var levelData = cc.DataMng.getInstance().getCurLevelData();
        var desLineNum = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterMineDesLine");
        desLineNum = desLineNum || 0;

        var radSum = 100;
        var radRes = Tools.randomEx(radSum);
        var norRate_1 = 33;
        if (desLineNum > cc.MineMng.getInstance().getLINE_RATE()){
            norRate_1 *= cc.MineMng.getInstance().getLINE_RATE() / desLineNum;
        }
        if (radRes < norRate_1){
            return cc.Obj_MonsterMine.TYPE.normal_1;
        }
        else {
            return Tools.arrayRandom(randomItemData_1);
        }
    }
    else {
	    return Tools.arrayRandom(randomItemData_2);
    }
};

cc.Obj_MonsterMine.createMine = function(simple)
{
    var createNew = null;
    var mineType =  cc.Obj_MonsterMine.randType(simple);
	
    switch (mineType)
    {
        case cc.Obj_MonsterMine.TYPE.rad:
        {
            createNew = new cc.Obj_MonsterMineRad();
        }
            break;

        case cc.Obj_MonsterMine.TYPE.normal_1:
        {
            createNew = new cc.Obj_MonsterMine(1);
        }
            break;
		case cc.Obj_MonsterMine.TYPE.normal_2:
        {
            createNew = new cc.Obj_MonsterMine(2);
        }
            break;
		case cc.Obj_MonsterMine.TYPE.normal_3:
        {
            createNew = new cc.Obj_MonsterMine(3);
        }
            break;

        case cc.Obj_MonsterMine.TYPE.task:
        {
            createNew = new cc.Obj_MonsterMineTask(Tools.rangeRandom(1, 3, true));
        }
            break;

        case cc.Obj_MonsterMine.TYPE.diamond:
        {
            createNew = new cc.Obj_MonsterDiamond(Tools.rangeRandom(1, 3, true));
        }
            break;

        default:
        {
            cc.log("出错了！");
            createNew = new cc.Obj_MonsterMine(Tools.rangeRandom(1, 3, true));
        }
            break;
    }
    return createNew;
};

//
cc.Obj_MonsterMine.create = function(justNor, levelData_1)
{
    var createNew = null;

	var levelData = cc.DataMng.getInstance().getCurLevelData();

    if (justNor){
        createNew =  new cc.Obj_MonsterMine(Tools.rangeRandom(1, 3, true));
    }
    else if (levelData){
        if (cc.MineMng.getInstance().getDIAMONDS_FREE()){
            var radSum = 1000;
            var radRes = Tools.randomEx(radSum);
            if (radRes < cc.Obj_MonsterMine.diamondCreateRad(levelData, 2)){
                createNew = new cc.Obj_MonsterDiamond(3,levelData);
            }
            else if (radRes < cc.Obj_MonsterMine.diamondCreateRad(levelData, 1)){
                createNew = new cc.Obj_MonsterDiamond(2,levelData);
            }
            else if (radRes < cc.Obj_MonsterMine.diamondCreateRad(levelData, 0)){
                createNew = new cc.Obj_MonsterDiamond(1,levelData);
            }
            else {
                createNew = cc.Obj_MonsterMine.createMine(true);
            }
        }
    }
    else {
        createNew = cc.Obj_MonsterMine.createMine(false);
    }

    if (createNew)
    {
        createNew.setRender(new MonsterMineRender(createNew));
    }

    return createNew;
};

cc.Obj_MonsterMine.diamondCreateRad = function(levelData,num){
	var basePer = cc.MineMng.getInstance().getDIAMONDS_FREE()[num];
	var addPer = cc.MineMng.getInstance().getDIAMONDS_PLUS()[cc.Guide.MiningGameType];
    var levelAddPer = cc.DataMng.getInstance().getMineGameLevelDiamondCreateRate();
	return (basePer + addPer + levelAddPer[num - 1]) * 10;
};


cc.Obj_MonsterMine.resetLine = function(){
	ifKuangLineShow = false;
}









