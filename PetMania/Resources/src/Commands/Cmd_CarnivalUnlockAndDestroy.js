
//======================================================================================================================
cc.Cmd_CarnivalCreateWrapGroup = cc.ICommandGroup.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(createCount)
    {
        this._super();
        this.m_CreateCount = createCount;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        var monsters = _GetNormalMonsters(gameLevel);
        if (monsters.length > 0)
        {
            //
            Tools.shuffle(monsters);
            monsters = monsters.slice(0, this.m_CreateCount);

            //
            var self = this;
            monsters.forEach(
                function(a_monster)
                {
                    self.addCommand(cc.Cmd_CarnivalCreateWrap.create(a_monster));
                }
            );
        }

        return this;
    }
});

cc.Cmd_CarnivalCreateWrapGroup.create = function(createCount)
{
    return new cc.Cmd_CarnivalCreateWrapGroup(createCount);
};

//======================================================================================================================
cc.Cmd_CarnivalUnlockAndDestroy = cc.ICommandGroup.extend({

    ctor: function(moves)
    {
        this._super();
        this.m_Moves = moves;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //
        var self = this;

        var cmd0 = cc.Cmd_CarnivalScore.create();
        cmd0.finish = function()
        {

        };

        self.addCommand(cmd0);

        var cmd1 = cc.Cmd_EveryDestroy.create();
        cmd1.finish = function()
        {

        };

        self.addCommand(cmd1);

        var cmd2 = cc.Cmd_EveryMoveNext.create();
        cmd2.finish = function()
        {

        };

        self.addCommand(cmd2);

        //
//        var cmd3 = cc.Cmd_CarnivalCreateWrapGroup.create(this.m_Moves);
//        cmd3.finish = function()
//        {
//            if (self.createWrapFinish)
//            {
//                self.createWrapFinish();
//            }
//        };
//
//        self.addCommand(cmd3);

        var cmd_Cmd_LeftMovesToBombWrapMonster = cc.Cmd_LeftMovesToBombWrapMonster.create(this.m_Moves);
        cmd_Cmd_LeftMovesToBombWrapMonster.finish = function()
        {

        }
        self.addCommand(cmd_Cmd_LeftMovesToBombWrapMonster);

        //
        var cmd4 = cc.Cmd_CarnivalScore.create();
        cmd4.finish = function()
        {

        };

        self.addCommand(cmd4);

        var cmd5 = cc.Cmd_EveryDestroy.create();
        cmd5.finish = function()
        {

        };

        self.addCommand(cmd5);

        var cmd6 = cc.Cmd_EveryMoveNext.create();
        cmd6.finish = function()
        {

        };

        self.addCommand(cmd6);
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        gameLevel.addCommand(cc.Cmd_EveryDestroy.create());
        return this;
    }
});

cc.Cmd_CarnivalUnlockAndDestroy.create = function(moves)
{
    return new cc.Cmd_CarnivalUnlockAndDestroy(moves);
};


//======================================================================================================================
cc.Cmd_MiningGameBonusTotal = cc.ICommandGroup.extend({

    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //
        var self = this;

        var cmd1 = cc.Cmd_EveryDestroy.create();
        cmd1.finish = function()
        {

        };

        self.addCommand(cmd1);

        var cmd2 = cc.Cmd_EveryMoveNext.create();
        cmd2.finish = function()
        {

        };

        self.addCommand(cmd2);

        var cmd_Cmd_LeftMovesToBombWrapMonster = cc.Cmd_MiningGameBonusMonster.create();
        cmd_Cmd_LeftMovesToBombWrapMonster.finish = function()
        {

        }
        self.addCommand(cmd_Cmd_LeftMovesToBombWrapMonster);

        var cmd5 = cc.Cmd_EveryDestroy.create();
        cmd5.finish = function()
        {

        };

        self.addCommand(cmd5);

        var cmd6 = cc.Cmd_EveryMoveNext.create();
        cmd6.finish = function()
        {

        };

        self.addCommand(cmd6);
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        gameLevel.addCommand(cc.Cmd_EveryDestroy.create());

        return this;
    }
});

cc.Cmd_MiningGameBonusTotal.create = function()
{
    return new cc.Cmd_MiningGameBonusTotal();
};

