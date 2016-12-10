//分数狂欢命令    Cmd_CarnivalDestroy

//======================================================================================================================
cc.Cmd_CarnivalCreateDirection = cc.ICommand.extend({

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

        //走到这里说明没有换位的
       /* var hvDirection = Defines.DIRECTION.parseHorizontalOrVertical(
            Tools.randomEx(100) < 50 ? Defines.DIRECTION.TOP : Defines.DIRECTION.RIGHT
        );*/

        var hvDirection = _RandHVDirection();

        var createNew = this.m_Monster.createMonsterDirection(hvDirection);
        cc.AudioMng.getInstance().playCreateDirection(this.m_Monster);

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
cc.Cmd_CarnivalCreateDirection.create = function(monster)
{
    return new cc.Cmd_CarnivalCreateDirection(monster);
};

//======================================================================================================================
cc.Cmd_CarnivalDestroy = cc.ICommandGroup.extend({

    ctor: function(moves)
    {
        this._super();

        this.m_Moves = moves;
        this.m_CreateDirection = false;
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

//            var cmd_Cmd_LeftMovesToMonster = cc.Cmd_LeftMovesToMonster.create();
//            cmd_Cmd_LeftMovesToMonster.finish = function()
//            {
//                var monsters = cmd_Cmd_LeftMovesToMonster.getNewMonsterList();
//
//            }
//            self.addCommand(cmd_Cmd_LeftMovesToMonster);
        };

        this.addCommand(cmd);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createDirections: function(gameLevel)
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
                self.addCommand(cc.Cmd_CarnivalCreateDirection.create(monster));
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
            if (!this.m_CreateDirection)
            {
                this.m_CreateDirection = true;
                this.createDirections(gameLevel);
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

cc.Cmd_CarnivalDestroy.create = function(moves)
{
    return new cc.Cmd_CarnivalDestroy(moves);
};









