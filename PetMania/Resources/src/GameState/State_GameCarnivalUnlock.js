
//======================================================================================================================
cc.State_GameCarnivalUnlock = cc.State_GameCarnivalBase.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //this.m_GameLevel = null;
        this.m_Moves = 0;
        this.m_AddCommand = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "State_GameCarnivalUnlock";
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(moves)
    {
        this.m_Moves = moves;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //进入这个State
    enter: function (wrapper, fromState)
    {
        if (!(fromState instanceof cc.State_GameLevel))
        {
            return this;
        }

        this.m_AddCommand = false;
        //this.m_GameLevel = fromState.m_GameLevel;

        cc.AudioMng.getInstance().playCarnival();
//        var carnivalSprite = cc.Sprite.create(Resource.carnival);
        var carnivalSprite = cc.Sprite.createWithSpriteFrameName("Images_game_succeed.png");
        _GUILayer().addChild(carnivalSprite);

        var self = this;

        this.createRole();
        var carnival = this.getCarnival();
        var cuteMonster = this.getCuteMonster();

        /*this.m_GameLevel*/wrapper.getGameLevel().addCommand(cc.Cmd_CarnivalBoyEnter.create(carnival));

        /*this.m_GameLevel*/wrapper.getGameLevel().addCommand(cc.Cmd_CuteMonsterMoveToTarget.create(cuteMonster,true));

        /*this.m_GameLevel*/wrapper.getGameLevel().addCommand(cc.Cmd_CuteBoyLeave.create(carnival));

        var cmdDestroy1 = cc.Cmd_EveryDestroy.create();
        cmdDestroy1.finish = function()
        {

        };
        /*this.m_GameLevel*/wrapper.getGameLevel().addCommand(cmdDestroy1);

        //
        var cmdNext1 = cc.Cmd_EveryMoveNext.create();
        cmdNext1.finish = function()
        {

        };
        /*this.m_GameLevel*/wrapper.getGameLevel().addCommand(cmdNext1);

        //var newCommand = cc.Cmd_CarnivalScore.create();
        /*this.m_GameLevel*/wrapper.getGameLevel().addCommand(cc.Cmd_CarnivalScore.create());

        //var newCommand = cc.Cmd_CarnivalUnlock.create(self.m_Moves);
        /*this.m_GameLevel*/wrapper.getGameLevel().addCommand(cc.Cmd_CarnivalUnlock.create(self.m_Moves));

        var cmdDestroy = cc.Cmd_EveryDestroy.create();
        cmdDestroy.finish = function()
        {

        };
        /*this.m_GameLevel*/wrapper.getGameLevel().addCommand(cmdDestroy);

        //
        var cmdNext = cc.Cmd_EveryMoveNext.create();
        cmdNext.finish = function()
        {

        };
        /*this.m_GameLevel*/wrapper.getGameLevel().addCommand(cmdNext);

        var boySprite = this.getBoy();
        /*this.m_GameLevel*/wrapper.getGameLevel().addCommand(cc.Cmd_CuteCarnivalChange.create(boySprite,carnival));

        //
        var cmdBoyEnter = cc.Cmd_CarnivalBoyEnter.create(boySprite);
        cmdBoyEnter.finish = function()
        {
            cc.AudioMng.getInstance().playGameLevelWin();
        };
        /*this.m_GameLevel*/wrapper.getGameLevel().addCommand(cmdBoyEnter);

        /*this.m_GameLevel*/wrapper.getGameLevel().addCommand(cc.Cmd_CuteMonsterMoveBack.create(boySprite,cuteMonster));

        /*this.m_GameLevel*/wrapper.getGameLevel().addCommand(cc.Cmd_FlowerShow.create());

        /*this.m_GameLevel*/wrapper.getGameLevel().addCommand(cc.Cmd_CuteBoyLeave.create(boySprite));

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
            /*this.m_GameLevel*/wrapper.getGameLevel().update(this, time);
        }

        if (this.m_AddCommand && /*this.m_GameLevel*/wrapper.getGameLevel().m_Commands.length <= 0)
        {
            wrapper.changeTo(cc.State_GameLevelWinCelebrate.getInstance());
        }

        return this;
    }
});

//单件模式
cc.State_GameCarnivalUnlock._instance = null;
cc.State_GameCarnivalUnlock.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.State_GameCarnivalUnlock();
        //cc.GameManager.getInstance().registerState(this._instance);
    }

    return this._instance;
};