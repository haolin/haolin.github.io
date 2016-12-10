
//======================================================================================================================
cc.State_GameCarnivalBubble = cc.State_GameCarnivalBase.extend({

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
        return "State_GameCarnivalBubble";
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

        //
        this.m_AddCommand = false;

        //
        cc.AudioMng.getInstance().playCarnival();

        var self = this;

        this.createRole();
        var carnival = this.getCarnival();
        var cuteMonster = this.getCuteMonster();

        wrapper.getGameLevel().addCommand(cc.Cmd_CarnivalBoyEnter.create(carnival));

        wrapper.getGameLevel().addCommand(cc.Cmd_CuteMonsterMoveToTarget.create(cuteMonster,true));

        wrapper.getGameLevel().addCommand(cc.Cmd_CuteBoyLeave.create(carnival));

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

        var newCommand = cc.Cmd_CarnivalScore.create();
        wrapper.getGameLevel().addCommand(newCommand);

        if (self.m_Moves > 0)
        {
			var levelData = cc.DataMng.getInstance().getCurLevelData();

            //
			var _cmd = null;
			switch (levelData.MODEL_MIX)
			{
            case Defines.TARGET_MODEL.MODEL_BOSS:
                {
                    _cmd = cc.Cmd_CarnivalBoss.create(self.m_Moves);
                }
                break;

            default:
                {
                    _cmd = cc.Cmd_CarnivalBubble.create(self.m_Moves);
                }
                break;
			}

            //
			wrapper.getGameLevel().addCommand(_cmd);
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
    update: function(wrapper, time)
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
cc.State_GameCarnivalBubble._instance = null;
cc.State_GameCarnivalBubble.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.State_GameCarnivalBubble();
    }

    return this._instance;
};