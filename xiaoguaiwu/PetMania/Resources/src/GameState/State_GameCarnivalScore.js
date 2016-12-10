
var _GetSpecMonsters =  function(gameLevel)
{
    //
    var monsters = [];

    var itr = gameLevel.getTable().createIterForMiddleObjects();
    for (itr.first(); !itr.isDone(); itr.next())
    {
        var middleObj = itr.getCurrent();
        if (!middleObj || middleObj.getParentNode().isBlock())
        {
            continue;
        }

        if (middleObj instanceof cc.Obj_MonsterDirection
            || middleObj instanceof cc.Obj_MonsterWrap
            || middleObj instanceof cc.Obj_MonsterColorful
            )
        {
            monsters.push(middleObj);
        }
    }

    return monsters;
};

var _GetNormalMonsters =  function(gameLevel)
{
    //
    var monsters = [];

    var itr = gameLevel.getTable().createIterForMiddleObjects();
    for (itr.first(); !itr.isDone(); itr.next())
    {
        var middleObj = itr.getCurrent();
        if (!middleObj || middleObj.getParentNode().isBlock())
        {
            continue;
        }

        if (middleObj.description() == "Obj_Monster")
        {
            monsters.push(middleObj);
        }
    }

    return monsters;
};


//======================================================================================================================
cc.State_GameCarnivalScore = cc.State_GameCarnivalBase.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //this.m_GameLevel = null;
        this.m_AddCommand = false;
        //this.m_IsShowCute = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "State_GameCarnivalScore";
    },

    //------------------------------------------------------------------------------------------------------------------
    //进入这个State
    enter: function (wrapper, fromState)
    {
        if (!(fromState instanceof cc.State_GameLevel))
        {
            return this;
        }

        //this.m_GameLevel = fromState.m_GameLevel;
        this.m_AddCommand = false;

        //
        cc.AudioMng.getInstance().playCarnival();

        var self = this;

        this.createRole();

        var carnival = this.getCarnival();
        //var cuteMonster = this.getCuteMonster();

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

        var newCommand = cc.Cmd_CarnivalScore.create();
        /*self.m_GameLevel*/wrapper.getGameLevel().addCommand(newCommand);

        var boySprite = this.getBoy();
        /*this.m_GameLevel*/wrapper.getGameLevel().addCommand(cc.Cmd_CuteCarnivalChange.create(boySprite,carnival));

        //
        cc.AudioMng.getInstance().playGameLevelWin();
        /*this.m_GameLevel*/wrapper.getGameLevel().addCommand(cc.Cmd_CarnivalBoyEnter.create(boySprite));

        /*this.m_GameLevel*/wrapper.getGameLevel().addCommand(cc.Cmd_FlowerShow.create());

        /*this.m_GameLevel*/wrapper.getGameLevel().addCommand(cc.Cmd_CuteBoyLeave.create(boySprite));

        self.m_AddCommand = true;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    leave: function (/*wrapper*/)
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
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
cc.State_GameCarnivalScore._instance = null;
cc.State_GameCarnivalScore.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.State_GameCarnivalScore();
        //cc.GameManager.getInstance().registerState(this._instance);
    }

    return this._instance;
};