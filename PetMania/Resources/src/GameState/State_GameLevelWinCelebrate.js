
//======================================================================================================================
cc.State_GameLevelWinCelebrate = cc.IState.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //
        this._timer = 0;
        this._monsters = [];
        this._drama = null;
        this._finished = false;
        this._delayTime = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "State_GameLevelWinCelebrate";
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        //
        this._timer = 0;
        this._monsters = [];
        this._drama = null;
        this._finished = false;
        this._delayTime = Defines.FPS * 60;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _finishByDrama: function(wrapper)
    {
        cc.GUIGameLevel.getInstance().playLeaveAction();

        var self = this;
        var action = cc.Sequence.create(
            cc.EaseElasticOut.create(cc.MoveTo.create(Defines.FPS * 75,  cc.p(0, _ScreenHeight())), 0.6),
            cc.DelayTime.create(Defines.FPS * 60),
            cc.CallFunc.create(
                function ()
                {
                    //
                    self._drama.start();
                    self._drama.finish = function()
                    {
                        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
                        if (curLevelData)
                        {
                            cc.DataMng.getDrama().finishDrama(curLevelData.DRAMA_START);
                            wrapper.changeTo(cc.State_GameLevel.getInstance());
                        }

                        Scene_MainMap.changeTo(cc.GUIGameLevelEndWin.getInstance());
                    }
                },
                null
            ));

        //
        gameTableLayer().runAction(action);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(wrapper)
    {
        if(this._drama)
        {
            this._finishByDrama(wrapper);
        }
        else
        {
            //
            wrapper.changeTo(cc.State_GameLevel.getInstance());
            Scene_MainMap.changeTo(cc.GUIGameLevelEndWin.getInstance());
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    enter: function(wrapper)
    {
        //
        var time = Date.now();
        cc.DataMng.getInstance().setGameLevelResult(Defines.GAME_RESULT.RESULT_SUCCESS);

        cc.GUITaskKakao.getInstance().addTaskScore(Task.TaskID.DAILY_CLEAT_STAGE,1);
        cc.GUITaskKakao.getInstance().addTaskScore(Task.TaskID.WEEKEND_CLEAR_STAGE,1);

        cc.log("State_GameLevelWinCelebrate  setGameLevelResult = " + (Date.now() - time));

        //清除数据
        this.cleanUp(wrapper);

        //
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        if (curLevelData && curLevelData.DRAMA_END)
        {
            cc.log(curLevelData.NAME + "结尾剧情 = " + curLevelData.DRAMA_END);
            this._drama = cc.DramaMng.getInstance().createDrama(curLevelData.DRAMA_END);
        }

        //
        this._buildMonsters(wrapper);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _buildMonsters: function(wrapper)
    {
        var table = wrapper.getGameLevel().getTable();
        var children = table.getChildrenNodes();
        for (var x = 0; x < children.length; ++x)
        {
            for (var y = 0; y < children[x].length; ++y)
            {
                var grid = children[x][y];
                if (!grid || !(grid instanceof cc.NormalGrid))
                {
                    continue;
                }

                var middleObj = grid.getMiddleObject();
                if (!middleObj)
                {
                    continue;
                }

                var isNormalMons = middleObj instanceof cc.Obj_Monster;
                var isMineMons = middleObj instanceof cc.Obj_MonsterMine;
                if (!isNormalMons || isMineMons)
                {
                    continue;
                }

                //
                this._monsters[x] = this._monsters[x] || [];
                this._monsters[x].push(middleObj);
            }
        }

        //
        this._monsters = this._monsters.filter(
            function(x)
            {
                return x && x.length > 0;
            }
        ) || [];

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    leave: function(wrapper)
    {
        if (!wrapper.getGameLevel())
        {
            return this;
        }

        var itr = wrapper.getGameLevel().getTable().createIterForMiddleObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var middleObj = itr.getCurrent();
            if (middleObj)
            {
                cc.ArmatureDataMng.getInstance().stopArmature(middleObj);
                middleObj.getSprite().setVisible(true);
                middleObj.getSprite().stopAllActions();
                middleObj.getSprite().setRotation(0);
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateMonsters: function(wrapper, time)
    {
        if (this._monsters.length > 0)
        {
            this._timer += time;
            if (this._timer > Defines.FPS * 10)
            {
                this._timer = 0;
                this._monsters.shift().forEach(
                    function(mons)
                    {
                        if (!mons.getSprite())
                        {
                            return;
                        }

                        if (cc.ArmatureDataMng.getInstance().winArmature(mons))
                        {
                            mons.getSprite().setVisible(false);
                        }
                        else
                        {
                            mons.getSprite().runAction(cc.RepeatForever.create(cc.RotateBy.create(2, 360)));
                        }
                    }
                );
            }
        }

        return this._monsters.length <= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    update: function(wrapper, time)
    {
        if (this.updateMonsters(wrapper, time))
        {
            this._delayTime -= time;
            if (this._delayTime <= 0)
            {
                if (!this._finished)
                {
                    this._finished = true;
                    this.finish(wrapper);
                }
            }
        }

        return this;
    }
});

//
cc.State_GameLevelWinCelebrate._instance = null;
cc.State_GameLevelWinCelebrate.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.State_GameLevelWinCelebrate();
    }

    return this._instance;
};