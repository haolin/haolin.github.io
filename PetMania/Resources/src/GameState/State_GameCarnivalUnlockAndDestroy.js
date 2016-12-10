
//======================================================================================================================
cc.State_GameCarnivalUnlockAndDestroy = cc.State_GameCarnivalBase.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //
        this.m_Moves = 0;
        this.m_AddCommand = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "State_GameCarnivalUnlockAndDestroy";
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(moves)
    {
        this.m_Moves = moves;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMoves: function()
    {
        return this.m_Moves > 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    enter: function (wrapper, fromState)
    {
        if (!(fromState instanceof cc.State_GameLevel))
        {
            return this;
        }

        var self = this;
        this.m_AddCommand = false;

        //
        cc.AudioMng.getInstance().playCarnival();

        this.createRole();
        var carnival = this.getCarnival();
        var cuteMonster = this.getCuteMonster();

        if (this.getMoves() > 0)
        {
            wrapper.getGameLevel().addCommand(cc.Cmd_CarnivalBoyEnter.create(carnival));
            wrapper.getGameLevel().addCommand(cc.Cmd_CuteMonsterMoveToTarget.create(cuteMonster,true));
            wrapper.getGameLevel().addCommand(cc.Cmd_CuteBoyLeave.create(carnival));
        }

        var cmdDestroy1 = cc.Cmd_EveryDestroy.create();
        cmdDestroy1.finish = function()
        {

        };

        wrapper.getGameLevel().addCommand(cmdDestroy1);

        //
        var cmdNext1 = cc.Cmd_EveryMoveNext.create();
        cmdNext1.finish = function()
        {

        };

        wrapper.getGameLevel().addCommand(cmdNext1);
        wrapper.getGameLevel().addCommand(cc.Cmd_CarnivalScore.create());

		if (self.getMoves() > 0)
        {
            //安全性添加 by shuiliu 20131104
			wrapper.getGameLevel().addCommand(cc.Cmd_CarnivalUnlockAndDestroy.create(self.m_Moves));
		}

        var cmdDestroy = cc.Cmd_EveryDestroy.create();
        cmdDestroy.finish = function()
        {

        };

        wrapper.getGameLevel().addCommand(cmdDestroy);

        //
        var cmdNext = cc.Cmd_EveryMoveNext.create();
        cmdNext.finish = function()
        {

        };

        wrapper.getGameLevel().addCommand(cmdNext);

        var boySprite = this.getBoy();
        wrapper.getGameLevel().addCommand(cc.Cmd_CuteCarnivalChange.create(boySprite,carnival));

        //
        var cmdBoyEnter = cc.Cmd_CarnivalBoyEnter.create(boySprite);
        cmdBoyEnter.finish = function()
        {
            cc.AudioMng.getInstance().playGameLevelWin();
        };

        wrapper.getGameLevel().addCommand(cmdBoyEnter);
        wrapper.getGameLevel().addCommand(cc.Cmd_CuteMonsterMoveBack.create(boySprite,cuteMonster));
        wrapper.getGameLevel().addCommand(cc.Cmd_FlowerShow.create());
        wrapper.getGameLevel().addCommand(cc.Cmd_CuteBoyLeave.create(boySprite));

        self.m_AddCommand = true;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    leave: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //更新
    update: function (wrapper, time)
    {
        this._super(wrapper, time);

        if (wrapper.getGameLevel())
        {
            wrapper.getGameLevel().update(this, time);
        }

        if (this.m_AddCommand && wrapper.getGameLevel().m_Commands.length <= 0)
        {
            wrapper.changeTo(cc.State_GameLevelWinCelebrate.getInstance());
        }

        return this;
    }
});

//单件模式
cc.State_GameCarnivalUnlockAndDestroy._instance = null;
cc.State_GameCarnivalUnlockAndDestroy.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.State_GameCarnivalUnlockAndDestroy();
    }

    return this._instance;
};