//分数狂欢命令

//======================================================================================================================
cc.Cmd_CarnivalCreateWrap = cc.ICommand.extend({

    //--------------------------------------------------------------------------------------------
    ctor: function(monster)
    {
        this._super();
        this.m_Monster = monster;
        this.m_DelayTime = 0;
    },

    //--------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //创建
        var grid = this.m_Monster.getParentNode();
        var createNew = this.m_Monster.createMonsterWrap();
        cc.AudioMng.getInstance().playCreateWrap(this.m_Monster);

        //
        this.m_Monster.destroy(null, gameLevel, null);
        if (this.m_Monster.getParentNode())
        {
            createNew.release();
        }
        else
        {
            grid.addNode(createNew);
            createNew.updateNodePosition();
            createNew.renderNode();
        }

        //
        cc.DataMng.getInstance().addTouchMoves();

        return this;
    },

    //--------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        this.m_DelayTime += time;
        return this.m_DelayTime > Defines.FPS * 20;
    }
});

//工厂方法
cc.Cmd_CarnivalCreateWrap.create = function(monster)
{
    return new cc.Cmd_CarnivalCreateWrap(monster);
};

//======================================================================================================================
cc.Cmd_CarnivalUnlock = cc.ICommandGroup.extend({

    ctor: function(moves)
    {
        this._super();

        this.m_Moves = moves;
        this.m_CreateWrap = false;
        this.m_DestroyAllAgain = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);



        var self = this;

        var cmd = cc.Cmd_CarnivalScore.create();
        cmd.finish = function(/*gameLevel*/)
        {
            var cmd1 = cc.Cmd_EveryDestroy.create();
            cmd1.finish = function(/*gameLevel*/)
            {

            };

            self.addCommand(cmd1);

            var cmd2 = cc.Cmd_EveryMoveNext.create();
            cmd2.finish = function(/*gameLevel*/)
            {

            };

            self.addCommand(cmd2);
        };

        this.addCommand(cmd);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createWraps: function(gameLevel)
    {
        var monsters = [];

        //
        var table = gameLevel.getTable();
        var itr = table.createIterForMiddleObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var middleObj = itr.getCurrent();
            if (!middleObj)
            {
                continue;
            }

            if (middleObj.description() == "Obj_Monster")
            {
                monsters.push(middleObj);
            }
        }

        Tools.shuffle(monsters);
        monsters = monsters.slice(0, this.m_Moves);

        //
        var self = this;
        monsters.forEach(
            function(monster)
            {
                self.addCommand(cc.Cmd_CarnivalCreateWrap.create(monster));
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanAllSpecMonsters: function(/*gameLevel*/)
    {
        var self = this;
        var cmd = cc.Cmd_CarnivalScore.create();
        cmd.finish = function(/*gameLevel*/)
        {
            var cmd1 = cc.Cmd_EveryDestroy.create();
            cmd1.finish = function(/*gameLevel*/)
            {

            };

            self.addCommand(cmd1);

            var cmd2 = cc.Cmd_EveryMoveNext.create();
            cmd2.finish = function(/*gameLevel*/)
            {

            };

            self.addCommand(cmd2);
        };

        this.addCommand(cmd);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        if (this.m_Commands.length <= 0)
        {
            if (!this.m_CreateWrap)
            {
                this.m_CreateWrap = true;
                this.createWraps(gameLevel);
            }
            else
            {
                if (!this.m_DestroyAllAgain)
                {
                    this.m_DestroyAllAgain = true;
                    this.cleanAllSpecMonsters(gameLevel);
                }
            }
        }

        return this.m_Commands.length <= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        gameLevel.addCommand(cc.Cmd_EveryDestroy.create());
        return this;
    }
});

cc.Cmd_CarnivalUnlock.create = function(moves)
{
    return new cc.Cmd_CarnivalUnlock(moves);
};



