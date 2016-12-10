//State_GameLevel 继承IState
//游戏关卡状态

cc.State_GameLevel = cc.IState.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        this.m_Paused = false;
        this.m_NotifyGuideState = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    resetState: function()
    {
        this.m_Paused = false;
        this.m_NotifyGuideState = false;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "State_GameLevel";
    },

    //------------------------------------------------------------------------------------------------------------------
    //进入这个State
    enter: function(wrapper, fromState)
    {
        this._super(wrapper, fromState);

        //
        this._addTouchPad(wrapper);

        if (this.m_Paused)
        {
            this.m_Paused = false;
            wrapper.getGameLevel().forceFinishSomeCommands();
            cc.GUIGameLevel.getInstance().gameLevelStateResumed();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //离开这个State
    leave: function(wrapper)
    {
        this._super(wrapper);

        //
        this._removeTouchPad();

        //
        if (!this.m_Paused)
        {
            this.m_Paused = true;
            wrapper.getGameLevel().forceFinishSomeCommands();
            cc.GUIGameLevel.getInstance().gameLevelStatePaused();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //处理游戏结果
    result: function(wrapper)
    {
        var result = cc.DataMng.getInstance().getGameLevelResult();
        if (!result)
        {
            var finData = {};
            if (wrapper.getGameLevel().handleFinish(finData))
            {
                return true;
            }
        }

        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    setGuideState: function(desc)
    {
        if (desc)
        {
            cc.log("强制设置教学状态 = " + desc);
        }

        this.m_NotifyGuideState = true;
        return this.m_NotifyGuideState;
    },

    //------------------------------------------------------------------------------------------------------------------
    //更新
    _guideState: function(wrapper)
    {
		//return false;
	
        var needGuid = cc.State_GameGuide.getInstance().check();
        if (needGuid)
        {
            //这个里面的条件 依赖isEndRound 所以cc.DataMng.getInstance().endRound(); 需要先调用
            cc.log("条件满足 进入教学状态!!!!!");
            wrapper.changeTo(cc.State_GameGuide.getInstance());
        }
        else
        {
            //cc.log("条件不满足");
        }

        return needGuid;
    },

    //------------------------------------------------------------------------------------------------------------------
    //更新
    update: function(wrapper, time)
    {
        //
        this._super(wrapper, time);

        //
        if (!this.isPaused())
        {
            //处理命令
            //var commandsLog = "";
            var cmdLenBegin = wrapper.getGameLevel().hasAnyCommands();
            /*if (cmdLenBegin > 0)
            {
                commandsLog = wrapper.getGameLevel().m_Commands.toString();
            }*/

            wrapper.getGameLevel().updateTimer(this, time);
            wrapper.getGameLevel().updateCommands(this, time);
            wrapper.getGameLevel().updateDump();

            var cmdLenEnd = wrapper.getGameLevel().hasAnyCommands();

            //命令结果
            var cmdClean = (cmdLenEnd <= 0 && cmdLenBegin > 0);
            var timeOut = (cmdLenEnd <= 0 && wrapper.getGameLevel().getTimer().isTimeOut());
            var isEndRound = cmdClean && cc.DataMng.getInstance().endRound();

            if (timeOut)
            {
                //时间到了 直接计算结果
                this.result(wrapper);
                return this;
            }
            else if (this.m_NotifyGuideState)
            {
                this.m_NotifyGuideState = false;

                //cc.log("强制教学状态");
                if (this._guideState(wrapper))
                {
                    return this;
                }
            }
            else if (cmdClean)
            {
                //
                if (this.result(wrapper))
                {
                    //清空命令队列 处理结果
                    return this;
                }

                //
                //cc.log("命令清空后的教学状态");
                //cc.log("commandsLog = " + commandsLog);
                if (this._guideState(wrapper))
                {
                    return this;
                }

                if (isEndRound)
                {
                    //这里可能触发命令的添加 会再次进入 cmdClean;
                    cc.RoundEndEventsManager.getInstance().notifyAllChildrenRoundEnd(wrapper.getGameLevel());
                    return this;
                }
            }

            //添加提示的问题
            if (!wrapper.getGameLevel().hasAnyCommands())
            {
                wrapper.getGameLevel().addCommand(cc.Cmd_Prompt.create(3));
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isPaused: function()
    {
        return this.m_Paused;
    },

    //------------------------------------------------------------------------------------------------------------------
    //暂停
    pause: function()
    {
        this.m_Paused = true;
        this._setTouchPadEnabled(false);
        return this.isPaused();
    },

    //------------------------------------------------------------------------------------------------------------------
    //继续
    resume: function()
    {
        this.m_Paused = false;
        this._setTouchPadEnabled(true);
        return this.isPaused();
    },

    //------------------------------------------------------------------------------------------------------------------
    _removeTouchPad: function()
    {
        _GameLevelScene.removeChildByTag(Defines.CHILD_LAYERS.TOUCH_PAD.TAG);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _addTouchPad: function(wrapper)
    {
        this._removeTouchPad();

        var newTouchPad = TouchPad_SwapObject.create(wrapper.getGameLevel());
        if (newTouchPad)
        {
            _GameLevelScene.addChild(newTouchPad,
                Defines.CHILD_LAYERS.TOUCH_PAD.Z,
                Defines.CHILD_LAYERS.TOUCH_PAD.TAG);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _setTouchPadEnabled: function(isEnabled)
    {
        var touchPad = _GameLevelScene.getChildByTag(Defines.CHILD_LAYERS.TOUCH_PAD.TAG);
        if (touchPad)
        {
            touchPad.setTouchEnabled(isEnabled);
        }

        return this;
    }

});

cc.State_GameLevel._instance = null;
cc.State_GameLevel.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.State_GameLevel();
    }

    return this._instance;
};
