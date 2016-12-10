
//======================================================================================================================
cc.State_GameCarnivalBoss = cc.State_GameCarnivalBase.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //this.m_GameLevel = null;
        this.m_Moves = 0;
        this.m_Times = 0;
        this.m_AddCommand = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "State_GameCarnivalBoss";
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(leftMoves,leftTime)
    {
        this.m_Moves = leftMoves;
        this.m_Times = leftTime;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //进入这个State
    enter: function (wrapper, fromState)
    {
        if (!(fromState instanceof cc.State_GameLevel))
        {
            cc.Assert(0, "fromState instanceof cc.State_GameLevel");
            return this;
        }


        //this.m_GameLevel = fromState.m_GameLevel;
        this.m_AddCommand = false;


        //
        cc.AudioMng.getInstance().playCarnival();


        var self = this;

        this.createRole();
        var carnival = this.getCarnival();
        var cuteMonster = this.getCuteMonster();

//        if ((this.m_Moves && this.m_Moves > 0) || (this.m_Times && this.m_Times > 0))
//        {
//             carnival.setVisible(true);
//        }
//        else
//        {
//            carnival.setVisible(false);
//        }

        /*this.m_GameLevel*/wrapper.getGameLevel().addCommand(cc.Cmd_CarnivalBoyEnter.create(carnival));

        var comd = cc.Cmd_CuteMonsterMoveToTarget.create(cuteMonster,true);
        comd.finish = function()
        {

        };

        /*self.m_GameLevel*/wrapper.getGameLevel().addCommand(comd);

        /*self.m_GameLevel*/wrapper.getGameLevel().addCommand(cc.Cmd_CuteBoyLeave.create(carnival));

        var cmdDestroy1 = cc.Cmd_EveryDestroy.create();
        cmdDestroy1.finish = function()
        {

        };
        /*self.m_GameLevel*/wrapper.getGameLevel().addCommand(cmdDestroy1);

        //
        var cmdNext1 = cc.Cmd_EveryMoveNext.create();
        cmdNext1.finish = function()
        {

        };
        /*self.m_GameLevel*/wrapper.getGameLevel().addCommand(cmdNext1);

        var newCommand = cc.Cmd_CarnivalScore.create();
        /*self.m_GameLevel*/wrapper.getGameLevel().addCommand(newCommand);

        if ((self.m_Moves && self.m_Moves > 0) || (self.m_Times && self.m_Times > 0)){
			var levelData = cc.DataMng.getInstance().getCurLevelData();
			var cmd_CallBack;
			switch (levelData.MODEL_MIX)
			{
				case Defines.TARGET_MODEL.MODEL_BUBBLE:
					cmd_CallBack = cc.Cmd_CarnivalBoss_Catch.create(self.m_Moves);
					break;
				case Defines.TARGET_MODEL.MODEL_TIME:
					cmd_CallBack = cc.Cmd_CarnivalBoss_LimitTime.create(self.m_Times);
					break;
				default:
					cmd_CallBack = cc.Cmd_CarnivalBoss.create(self.m_Moves);
					break;
			}

			/*self.m_GameLevel*/wrapper.getGameLevel().addCommand(cmd_CallBack);
		}
		
        var cmdDestroy = cc.Cmd_EveryDestroy.create();
        cmdDestroy.finish = function()
        {

        };
        /*self.m_GameLevel*/wrapper.getGameLevel().addCommand(cmdDestroy);

        //
        var cmdNext = cc.Cmd_EveryMoveNext.create();
        cmdNext.finish = function()
        {

        };
        /*self.m_GameLevel*/wrapper.getGameLevel().addCommand(cmdNext);

//        this.createBoy();
        var boySprite = this.getBoy();
        /*self.m_GameLevel*/wrapper.getGameLevel().addCommand(cc.Cmd_CuteCarnivalChange.create(boySprite,carnival));


        //
        var cmdBoyEnter = cc.Cmd_CarnivalBoyEnter.create(boySprite);
        cmdBoyEnter.finish = function()
        {
            cc.AudioMng.getInstance().playGameLevelWin();
        };

        /*self.m_GameLevel*/wrapper.getGameLevel().addCommand(cmdBoyEnter);

        /*self.m_GameLevel*/wrapper.getGameLevel().addCommand(cc.Cmd_CuteMonsterMoveBack.create(carnival,cuteMonster));

        /*self.m_GameLevel*/wrapper.getGameLevel().addCommand(cc.Cmd_FlowerShow.create());

        /*self.m_GameLevel*/wrapper.getGameLevel().addCommand(cc.Cmd_CuteBoyLeave.create(boySprite));

        self.m_AddCommand = true;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //离开这个State
    leave: function (/*wrapper*/)
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //更新
    update: function (wrapper, time)
    {
        this._super(wrapper, time);

        if (/*this.m_GameLevel*/wrapper.getGameLevel())
        {
            ///*this.m_GameLevel*/wrapper.getGameLevel().update(this, time);

            wrapper.getGameLevel().updateCommands(this, time)
        }

        if (this.m_AddCommand && /*this.m_GameLevel*/wrapper.getGameLevel().m_Commands.length <= 0)
        {
            wrapper.changeTo(cc.State_GameLevelWinCelebrate.getInstance());
        }

        return this;
    }
});

//单件模式
cc.State_GameCarnivalBoss._instance = null;
cc.State_GameCarnivalBoss.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.State_GameCarnivalBoss();
        //cc.GameManager.getInstance().registerState(this._instance);
    }

    return this._instance;
};