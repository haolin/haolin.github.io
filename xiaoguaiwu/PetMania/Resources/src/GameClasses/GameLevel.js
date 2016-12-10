//游戏关卡的对象

//======================================================================================================================
cc.GameLevel = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        //游戏桌面
        this.m_MyBackGround = null;
        this.m_Table = null;

        //是否是第一次启动?
        this.m_IsStart = false;

        //命令队列
        this.m_Commands = [];

        //垃圾堆
        this.m_MyDump = new GameLevelDump();

        //时钟管理
        this.m_MyTimer = new GameLevelTimer();

        //
    },

    //------------------------------------------------------------------------------------------------------------------
    //获得游戏桌面
    isStart: function()
    {
        return this.m_IsStart;
    },

    //------------------------------------------------------------------------------------------------------------------
    //获得游戏桌面
    getTimer: function()
    {
        return this.m_MyTimer;
    },

    //------------------------------------------------------------------------------------------------------------------
    //获得游戏桌面
    getTable: function()
    {
        return this.m_Table;
    },

    //------------------------------------------------------------------------------------------------------------------
    //释放
    release: function()
    {
        //cc.log("game Level release");

        if (this.m_Table)
        {
            //cc.log("this.m_Table release");
            this.m_Table.release();
            this.m_Table = null;
        }

        if (this.m_MyBackGround)
        {
            //cc.log("this.m_MyBackGround release");
            this.m_MyBackGround.release();
            this.m_MyBackGround = null;
        }

        this.m_IsStart = false;
        this.m_Commands = [];

        //
        this.m_MyDump.release();
        this.m_MyDump = null;

        //
        this.m_MyTimer.release();
        this.m_MyTimer = null;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //用builder构造这个关卡
    build: function(builder, needShuffle)
    {
        //创造背景
        this.m_MyBackGround = builder.createBackGround();

        //builder创造游戏桌面
        this.m_Table = builder.buildTable();

        //
        this.m_Table.setPosition(builder.buildTablePosition(_ScreenWidth(), _ScreenHeight(), Defines.TABLE_GRID_SIZE));
        if (this.m_Table.isNeedAdjustVerticalPosition())
        {
            //cc.log("如果顶格就向下调整半个格子");
            var pos = this.m_Table.getPosition();
            pos.y -= Defines.TABLE_GRID_SIZE/2;
            this.m_Table.setPosition(pos);
        }

        //开始渲染
        backGroundLayer().removeAllChildren(true);
        _UsePVR ? this.m_MyBackGround.displayIOS(backGroundLayer()) : this.m_MyBackGround.display(backGroundLayer());
        this.m_Table.renderNode();

        //
        if (needShuffle)
        {
            var shuffler = TiledMapTableShuffle.create(this.m_Table);
            shuffler.shuffle(1, false);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateTimer: function(state, time)
    {
        if (!this.isStart())
        {
            return this;
        }

        //
        this.m_MyTimer.updateTimer(state, time);

        //
        if (state instanceof cc.State_GameLevel)
        {
            if (this.m_MyTimer.isTimeOut())
            {
                this.forceFinishSomeCommands();
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //更新
    updateDump: function()
    {
        this.m_MyDump.update();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //更新
    update: function(state, time)
    {
        //添加关卡事件给 DataMng
        if (!this.isStart())
        {
            return this;
        }

        //更新时钟
        this.updateTimer(state, time);

        //命令队列更新
        this.updateCommands(state, time);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //进入关卡状态的回调
    stateEnter: function(immeStart)
    {
        var self = this;
        if (!immeStart)
        {
            var curLevelData = cc.DataMng.getInstance().getCurLevelData();
            var dramaKey = curLevelData.DRAMA_START;
            var drama = cc.DramaMng.getInstance().createDrama(dramaKey);
            if (drama)
            {
                //
                gameTableLayer().setVisible(false);
                _GUILayer().setVisible(false);

                drama.start();
                drama.finish = function()
                {
                    cc.DataMng.getDrama().finishDrama(dramaKey);
                    self.startGameLevel();
                }
            }
            else
            {
                self.startGameLevel();
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //启动关卡
    startGameLevel: function()
    {
        var self = this;

        //
        gameTableLayer().setVisible(true);
        _GUILayer().setVisible(true);

        //
        if (!cc.GUIGameLevel.getInstance().isWindowOpen())
        {
            cc.GUIGameLevel.getInstance().openWindow(_GUILayer());
            //cc.GUIGameLevel.getInstance().getWindow().setVisible(false);
        }

        //标记去了
        this.m_IsStart = true;

        //
        this.addCommand(cc.Cmd_OpeningCeremony.create(cc.DataMng.getInstance().getCurLevelData()));

        //添加一个消除
        var cmd0 = cc.Cmd_EveryDestroy.create();
        cmd0.finish = function()
        {

        };

        this.addCommand(cmd0);

        //加一个下落
        this.addCommand(cc.Cmd_EveryMoveNext.create());

        //添加一个消除
        var cmd2 = cc.Cmd_EveryDestroy.create();
        cmd2.finish = function()
        {

        };

        this.addCommand(cmd2);

        //再加一个下落
        this.addCommand(cc.Cmd_EveryMoveNext.create());

        //在时间模式关卡，需要新手引导结束之后再开始游戏，类似28关
        var cmd3 = cc.ICommand.create();
        cmd3.finish = function()
        {
            self.m_MyTimer.startTimer(cc.DataMng.getInstance().getCurLevelData());
            self.addCommand(cc.Cmd_EveryDestroy.create());
        };

        this.addCommand(cmd3);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //添加游戏命令
    addCommand: function(cmd)
    {
        if (!this.isStart())
        {
            //被锁住了 不能添加
            return this;
        }

        if (cmd)
        {
            this.m_Commands.push(cmd);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //添加游戏命令
    hasAnyCommands: function()
    {
        return this.m_Commands.length;
    },

    //------------------------------------------------------------------------------------------------------------------
    //命令队列更新
    updateCommands: function(state, time)
    {
        if (!this.isStart())
        {
            return this;
        }

        //var old = this.m_Commands.length;

        if (this.m_Commands.length > 0)
        {
            if (this.m_Commands[0].command(this, time))
            {
                this.m_Commands[0].finish(this);
                this.m_Commands.shift();
            }

            if (this.m_Commands.length <= 0)
            {
                //清除垃圾
                this.m_MyDump.notify();
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    checkRecordDestroy: function(objNames)
    {
        var current = 0;
        var max = 0;

        objNames.forEach(
            function(name)
            {
                current += /*cc.DataMng.getInstance().getRecordDestroy*/DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent(name);
                max += DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().getCreateObjectContent(name);//cc.DataMng.getInstance().getBuildObjectsRecords(name);
            }
        );

        return (current >= max);
    },

    //------------------------------------------------------------------------------------------------------------------
    handleFinish: function(finData)
    {
        //分数、锁链、锁、木桩条件是必须达到的
        var levelData = cc.DataMng.getInstance().getCurLevelData();
        var curScore =  cc.DataMng.getInstance().getCurScore();

        //
        //finData.finish = curScore >= levelData.TARGET_SCORES[0];
        var targetScores = levelData.TARGET_SCORES_SAVE.get();
        finData.finish = curScore >= targetScores[0];
        finData.handled = false;

        switch (levelData.MODEL)
        {
        //得分模式
        case Defines.TARGET_MODEL.MODEL_SCORE:
            {
                var movesOut = cc.DataMng.getInstance().getLeftTouchMoves() <= 0;
                finData.finish = (movesOut && finData.finish);
            }
            break;

        //解锁模式
        case Defines.TARGET_MODEL.MODEL_UNLOCK:
            {
                finData.finish = this.checkRecordDestroy(["Obj_Lock", "Obj_Floor"]);
            }
            break;

        //清除模式
        case Defines.TARGET_MODEL.MODEL_DESTROY:
            {
                var desData = levelData.TARGET_DES_DATA;
                var finCount = 0;

                desData.forEach(
                    function(data)
                    {
                        if (data.obj)
                        {
                            var destroy = /*cc.DataMng.getInstance().getRecordDestroy*/DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent(data.obj);
                            destroy = destroy || 0;

                            if (destroy >= data.num_save.get()/*data.num*/)
                            {
                                ++finCount;
                            }
                        }
                        else if (data.color)
                        {
                            var destroy1 = /*cc.DataMng.getInstance().getRecordColor*/DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyMonsterByColorContent(data.color);
                            destroy1 = destroy1 || 0;

                            if (destroy1 >= data.num_save.get()/*data.num*/)
                            {
                                ++finCount;
                            }
                        }
						else if (data.action){
							var destroy1 = cc.DataMng.getInstance().getRecordDestroy(data.action);
							
                            destroy1 = destroy1 || 0;

                            if (destroy1 >= data.num_save.get()/*data.num*/)
                            {
                                ++finCount;
                            }
						
						}
                    }
                );

                finData.finish = (finCount >= desData.length);
            }
            break;

        //时间模式
        case Defines.TARGET_MODEL.MODEL_TIME:
            {
                var isTimeOut = cc.DataMng.getInstance().getLeftGameLevelTime() <= 0;
                finData.finish = (isTimeOut) && finData.finish;
            }
            break;

        //捕捉模式
        case Defines.TARGET_MODEL.MODEL_BUBBLE:
            {
                //var finishCount = levelData.TARGET_DES_BUBBLES;
                var finishCount = levelData.TARGET_DES_BUBBLES_SAVE.get();

                var desCount = /*cc.DataMng.getInstance().getRecordDestroy*/DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_BubbleCreator");
                desCount = desCount || 0;

                finData.finish = (desCount >= finishCount);
            }
            break;

        case Defines.TARGET_MODEL.MODEL_FLOWER:
            {
                //总的目标
                var targetOfFlowers = levelData.TARGET_DES_DATA;
                var finTargetCount = 0;

                //检查每个目标
                targetOfFlowers.forEach(
                    function(data)
                    {
                        if (!data.level)
                        {
                            return;
                        }

                        //创造了多少个花?
                        var flowerDesc = "Obj_Flower_" + data.level;
                        var create = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getCreateObjFlowerWhenGameLevelRunning(data.level);//cc.DataMng.getInstance().getCreateRecord(flowerDesc);
                        create = create || 0;
                        if (create >= data.num_save.get()/*data.num*/)
                        {
                            //完成了一个目标
                            ++finTargetCount;
                        }
                    }
                );

                finData.finish = (finTargetCount >= targetOfFlowers.length);
            }
            break;

        //boss战
        case Defines.TARGET_MODEL.MODEL_BOSS:
            {
                finData.finish = cc.BossMng.getInstance().isFinish(this);
            }
            break;

        //贪吃蛇模式
        case Defines.TARGET_MODEL.MODEL_SNAKE:
            {
                var cur = /*cc.DataMng.getInstance().getRecordDestroy*/DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_Snake") || 0;
                finData.finish = (cur >= levelData.SNAKE_COUNT);
            }
            break;

        //采矿有奖模式
        case Defines.TARGET_MODEL.MODEL_MINELOTTERY:
            {
//			    var movesOut = cc.DataMng.getInstance().getLeftTouchMoves() <= 0;
                finData.finish = false;
			}
			break;
			
		//采矿模式
        case Defines.TARGET_MODEL.MODEL_MINE:
            {
				var lineOk = true;
				if (levelData.MINE_LINE)
				{
					var destroy1 = /*cc.DataMng.getInstance().getRecordDestroy*/DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterMineDesLine");
					destroy1 = destroy1 || 0;
					if (destroy1 < levelData.MINE_LINE)
					{
						lineOk = false;
					}
				}
				
				var radOk = true;
				if (levelData.RAD_NUM)
				{
					var destroy1 = /*cc.DataMng.getInstance().getRecordDestroy*/DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterMineRad");
					destroy1 = destroy1 || 0;
					if (destroy1 < levelData.RAD_NUM)
					{
						radOk = false;
					}
				}
//
				var taskOk = true;
				if (levelData.TASK_NUM)
				{
					var destroy1 = /*cc.DataMng.getInstance().getRecordDestroy*/DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterMineTask");
					destroy1 = destroy1 || 0;
					if (destroy1 < levelData.TASK_NUM)
					{
						taskOk = false;
					}
				}
//
				finData.finish = lineOk && radOk && taskOk;
				cc.log("finData.finish = "+finData.finish);
			
				
//                var finCount = 0;
//				var desData = levelData.TARGET_DES_DATA.concat();
//                if (desData.length == 0)
//                {
//                    return;
//                }
//
//                desData.forEach(
//                    function(data,index)
//                    {
//						var destroy1 = 0;
//						if (index == 0){
//							destroy1 = /*cc.DataMng.getInstance().getRecordDestroy*/DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterMineDesLine");
//						}
//						else if (index == 1){
//							destroy1 = /*cc.DataMng.getInstance().getRecordDestroy*/DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterMineRad");
//						}
//						else if (index == 2){
//							destroy1 = /*cc.DataMng.getInstance().getRecordDestroy*/DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterMineTask");
//						}
//						destroy1 = destroy1 || 0;
//						cc.log("finData.destroy1 = "+destroy1);
//						if (destroy1 >= data.num)
//						{
//							++finCount;
//						}
//                        
//                    }
//                );
//				cc.log("finData.finish = "+finCount);
//                finData.finish = (finCount >= desData.length);
				
            }
            break;

        default:
            break;
        }

        //混合模式
        switch (levelData.MODEL_MIX)
        {
        //捕捉模式
        case Defines.TARGET_MODEL.MODEL_BUBBLE:
            {
                //var mixFinishCount = levelData.TARGET_DES_BUBBLES;
                var mixFinishCount = levelData.TARGET_DES_BUBBLES_SAVE.get();

                var mixDesCount = /*cc.DataMng.getInstance().getRecordDestroy*/DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_BubbleCreator");
                mixDesCount = mixDesCount || 0;

                finData.finish = (mixDesCount >= mixFinishCount && finData.finish);
            }
            break;

        //boss战
        case Defines.TARGET_MODEL.MODEL_BOSS:
            {
                finData.finish = (cc.BossMng.getInstance().isFinish(this) && finData.finish);
            }
            break;
        default:
            break;
        }

        //
        if (!finData.finish)
        {
			if (levelData.MODEL != Defines.TARGET_MODEL.MODEL_MINELOTTERY){
				this.gameLevelFailed(finData);
			}

        }
        else
        {
			var key = "FreeItems_" + levelData.NAME ;
			var Itemkey = "FreeItemsUsed";
			if (levelData.FREE_ITEM && !cc.DataMng.getInstance().isGameLevelGuidFinish(key, false) && cc.DataMng.getInstance().isGameLevelGuidFinish(Itemkey, false)){
				
				cc.DataMng.getInstance().setGameLevelGuidFinish(key);
			}
            this.gameLevelSuccess(finData);
        }

        return finData.handled;
    },

    //------------------------------------------------------------------------------------------------------------------
    gameLevelFailed: function(finData)
    {
        var levelData = cc.DataMng.getInstance().getCurLevelData();
        var needChangeState = null;

        if (levelData.MODEL == Defines.TARGET_MODEL.MODEL_TIME
            || levelData.MODEL_MIX == Defines.TARGET_MODEL.MODEL_TIME)
        {
            if (cc.DataMng.getInstance().getLeftGameLevelTime() <= 0)
            {
                needChangeState = cc.State_GameOutTime.getInstance();
            }
        }
        else
        {
            if (cc.DataMng.getInstance().getLeftTouchMoves() <= 0)
            {
                needChangeState = cc.State_GameOutMoves.getInstance();
            }
            else if (levelData.MODEL == Defines.TARGET_MODEL.MODEL_SNAKE)
            {
                if (cc.PipeAndSnakeGame.getInstance().checkFailed(this))
                {
                    needChangeState = cc.State_GameFail.getInstance();
                }
            }
        }

        if (needChangeState)
        {
            finData.handled = true;
            _ChangeGameLevelStateTo(needChangeState);
        }
        else
        {

        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    gameLevelSuccess: function(finData)
    {
        //
        var leftMoves = cc.DataMng.getInstance().getLeftTouchMoves();
        var leftTime = cc.DataMng.getInstance().getLeftGameLevelTime();
        var levelData = cc.DataMng.getInstance().getCurLevelData();
        finData.handled = false;

        //狂欢处理
        switch (levelData.MODEL)
        {
        //得分模式
        case Defines.TARGET_MODEL.MODEL_SCORE:
            {
                finData.handled = true;
                _ChangeGameLevelStateTo(cc.State_GameCarnivalScore.getInstance());
            }
            break;

        case Defines.TARGET_MODEL.MODEL_UNLOCK:  //解锁模式
        case Defines.TARGET_MODEL.MODEL_DESTROY: //清除模式
            {
                //if (leftMoves > 0 || this.hasSpecItemOnTable())
                //{
                    finData.handled = true;
                    _ChangeGameLevelStateTo(cc.State_GameCarnivalUnlockAndDestroy.getInstance().init(leftMoves));
                //}
            }
            break;

        case Defines.TARGET_MODEL.MODEL_TIME:  //时间模式
            {
                finData.handled = true;
                _ChangeGameLevelStateTo(cc.State_GameCarnivalTime.getInstance().init(leftTime));
            }
            break;

        //捕捉模式
        case Defines.TARGET_MODEL.MODEL_BUBBLE:
            {
                if (leftMoves > 0 || this.hasSpecItemOnTable())
                {
                    finData.handled = true;
                    _ChangeGameLevelStateTo(cc.State_GameCarnivalBubble.getInstance().init(leftMoves));
                }
            }
            break;

        case Defines.TARGET_MODEL.MODEL_FLOWER:
            {
                if (leftMoves > 0 || this.hasSpecItemOnTable())
                {
                    finData.handled = true;
                    _ChangeGameLevelStateTo(cc.State_GameCarnivalFlower.getInstance().init(leftMoves));
                }
            }
            break;

        //颜色消除模式
        case Defines.TARGET_MODEL.MODEL_BOSS:
            {
                if ((leftMoves && leftMoves > 0) || (leftTime && leftTime > 0) || this.hasSpecItemOnTable())
                {
                    finData.handled = true;
                    _ChangeGameLevelStateTo(cc.State_GameCarnivalBoss.getInstance().init(leftMoves,leftTime));
                }
            }
            break;

        case Defines.TARGET_MODEL.MODEL_SNAKE:
            {
                finData.handled = true;
                _ChangeGameLevelStateTo(cc.State_GameCarnivalScore.getInstance());
            }
            break;

        case Defines.TARGET_MODEL.MODEL_MINE:
            {
                if (leftMoves > 0 || this.hasSpecItemOnTable())
                {
                    finData.handled = true;
                    _ChangeGameLevelStateTo(cc.State_GameCarnivalUnlockAndDestroy.getInstance().init(leftMoves));
                }
            }
            break;

        case Defines.TARGET_MODEL.MODEL_MINELOTTERY:
            {
                if (leftMoves > 0 || this.hasSpecItemOnTable())
                {
                    finData.handled = true;
                    _ChangeGameLevelStateTo(cc.State_GameCarnivalUnlockAndDestroy.getInstance().init(leftMoves));
                }
            }
            break;
			
        default:
            {
                cc.log("未知的模式?????????????????????????? = " + levelData.MODEL);
            }
            break;
        }

        if (!finData.handled)
        {
            finData.handled = true;
            _ChangeGameLevelStateTo(cc.State_GameLevelWinCelebrate.getInstance());
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //是否可以输入Touch事件
    canTouch: function()
    {
        if (!this.isStart())
        {
            return false;
        }

        if (this.m_Commands.length <= 0)
        {
            return true;
        }
        else if (this.m_Commands.length == 1)
        {
            var firstCommand = this.m_Commands[0];
            if (this.checkCommandCancelEnable(firstCommand))
            {
                return true;
            }
        }

        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    //是否可以输入Touch事件
    /*canUnLockItem: function()
    {
        var canTouch = this.canTouch();
        var isPrompt = false;

        //
        if (this.m_Commands.length == 1)
        {
            var firstCommand = this.m_Commands[0];
            if (firstCommand instanceof cc.Cmd_Prompt)
            {
                isPrompt = true;
            }
        }

        return canTouch && isPrompt;
    },*/

    //------------------------------------------------------------------------------------------------------------------
    //垃圾处理
    disposal: function(normalObj)
    {
        this.m_MyDump.addToDump(normalObj);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //只有这些命令可以被强行完成(即取消)
    checkCommandCancelEnable: function(command)
    {
        if (!command)
        {
            return false;
        }

        return (
            command instanceof cc.Cmd_Prompt
            || command instanceof cc.Cmd_AfterTouchSwapFail
            || ( command instanceof cc.Cmd_MoveBubbleCreator && command.cancel())  //这个命令必须是处于完成状态 才能取消
            || ( command instanceof cc.Cmd_OpeningCeremony)
            || ( command instanceof cc.Cmd_Empty)
            )
    },

    //------------------------------------------------------------------------------------------------------------------
    //只有这些命令可以被强行完成(即取消)
    forceFinishSomeCommands: function()
    {
        /*for (var indx = 0; indx < this.m_Commands.length;)
        {
            var command = this.m_Commands[indx];
            if (this.checkCommandCancelEnable(command))
            {
                command.finish(this);
                this.m_Commands.splice(indx, 1);
            }
            else
            {
                ++indx;
            }
        }*/

        //
        var self = this;
        this.m_Commands.forEach(
            function(command, index, array)
            {
                if (self.checkCommandCancelEnable(command))
                {
                    command.finish(this);
                    array.splice(index, 1);
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //只有这些命令可以被强行完成(即取消)
    addTouchSwapObjectsCommand: function(beginPos, endPos)
    {
        //发起的格子
        var srcGrid = this.getTable().getGridByPos(beginPos);
        if (!srcGrid || srcGrid.isLockTouch())
        {
            return this;
        }

        //根据方向找目标格子
        var srcToDirection = _ParseCrossDirection(beginPos, endPos);
        var dstGrid = srcGrid.getGridByDirection(srcToDirection);
        if (!dstGrid || dstGrid.isLockTouch())
        {
            return this;
        }

        var bothGridTypOk = srcGrid instanceof cc.NormalGrid && dstGrid instanceof cc.NormalGrid;
        if (!bothGridTypOk)
        {
            return this;
        }

        //原来格子 可以移动的obj
        var srcMoveObj = srcGrid.getTouchEnabledObject();
        var dstMoveObj = dstGrid.getTouchEnabledObject();
        if (!srcMoveObj || !dstMoveObj)
        {
            return this;
        }

        //
        var cmd = cc.Cmd_TouchSwapObj.create(
            srcMoveObj,
            dstMoveObj);

        if (cmd)
        {
            //cc.log("添加一个交换");
            this.addCommand(cmd);
        }

        return this;
    },

	//------------------------------------------------------------------------------------------------------------------
    //只有这些命令可以被强行完成(即取消)
    hasSpecItemOnTable: function()
    {
        var itr = this.getTable().createIterForMiddleObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var middleObj = itr.getCurrent();
            if (!middleObj)
            {
                continue;
            }

            if (middleObj instanceof cc.Obj_MonsterDirection
                || middleObj instanceof cc.Obj_MonsterWrap
                || middleObj instanceof cc.Obj_MonsterColorful)
            {
                return true;
            }
        }

        return false;
    }
});

//工厂方法
cc.GameLevel.create = function()
{
    return new cc.GameLevel();
};