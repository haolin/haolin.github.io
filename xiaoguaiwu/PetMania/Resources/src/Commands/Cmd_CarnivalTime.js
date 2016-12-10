//======================================================================================================================
cc.Cmd_CarnivalCreateWrapByMonsterAddTime = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(time)
    {
        this._super();
        this.m_LeftTime = time;
        this.m_DelayTime = 0;
        this.m_MaxDelayTime = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //
        var monsters = _GetAddTimeMonsters(gameLevel);

        //
        monsters.forEach(
            function(a_monster)
            {
                //
                var hisParent = a_monster.getParentNode();
                var createNew = a_monster.createMonsterWrap();
                cc.AudioMng.getInstance().playCreateWrap(a_monster);

                //
                gameLevel.disposal(a_monster);

                //
                if (a_monster.getParentNode())
                {
                    createNew.release();
                    return;
                }

                //
                cc.EffectMng.getInstance().displayMonsterDesWrap(
                    a_monster.getPosition(),
                    1,
                    null);

                //
                hisParent.addNode(createNew);
                createNew.updateNodePosition();
                createNew.renderNode();

                this.m_MaxDelayTime = Defines.FPS * 20;
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        this.m_DelayTime += time;
        return this.m_DelayTime > this.m_MaxDelayTime;
    }
});

cc.Cmd_CarnivalCreateWrapByMonsterAddTime.create = function(time)
{
    return new cc.Cmd_CarnivalCreateWrapByMonsterAddTime(time);
};


//======================================================================================================================
cc.Cmd_CarnivalCreateDirectionGroup = cc.ICommandGroup.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(monsterList)
    {
        this._super();
        this.m_MonsterList = monsterList;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //var monsters = _GetNormalMonsters(gameLevel);
        var monsters = this.m_MonsterList;
        if (monsters.length <= 0)
        {
            return this;
        }

        //
        Tools.shuffle(monsters);

//        if (this.m_LeftTime > 0)
//        {
//            monsters = monsters.slice(0, parseInt(this.m_LeftTime/3));
//        }
//        else if (this.m_LeftMoves > 0)
//        {
//            monsters = monsters.slice(0, this.m_LeftMoves);
//        }

        monsters = this.m_MonsterList;
        if (monsters && monsters.length > 0)
        {
            //
            var self = this;
            monsters.forEach(
                function(a_monster)
                {
                    self.addCommand(cc.Cmd_CarnivalCreateDirection.create(a_monster));
                }
            );
        }

        return this;
    }
});

cc.Cmd_CarnivalCreateDirectionGroup.create = function(monsterList)
{
    return new cc.Cmd_CarnivalCreateDirectionGroup(monsterList);
};
//======================================================================================================================
cc.Cmd_CarnivalTime = cc.ICommandGroup.extend({

    ctor: function(moves)
    {
        this._super();
        this.m_Time = moves;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        var self = this;

        var wrapFinish = false;

        //
        var cmd0 = cc.Cmd_CarnivalCreateWrapByMonsterAddTime.create(this.m_Time);
        cmd0.finish = function()
        {
//            if (!wrapFinish && self.createWrapFinish)
//            {
//                self.createWrapFinish();
//                wrapFinish = true;
//            }
        };

        self.addCommand(cmd0);

        //
        var cmd1 = cc.Cmd_CarnivalScore.create();
        cmd1.finish = function()
        {

        };

        self.addCommand(cmd1);

        //
        var cmd2 = cc.Cmd_EveryDestroy.create();
        cmd2.finish = function()
        {

        };

        self.addCommand(cmd2);

        //
        var cmd3 = cc.Cmd_EveryMoveNext.create();
        cmd3.finish = function()
        {

        };

        self.addCommand(cmd3);

        var leftTime = this.m_Time / 5;
        if (this.m_Time % 5 != 0)
        {
            leftTime++;
        }

        var monsters = [];
        var table = gameLevel.getTable();
        var itr = table.createIterForMiddleObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var middleObj = itr.getCurrent();
            if (!middleObj)
            {
                continue;
            }

            if (!middleObj.canTouch())
            {
                continue;
            }

            //
            monsters.push(middleObj);
        }

        Tools.shuffle(monsters);
        monsters = monsters.slice(0,leftTime);
        //
        var cmd4 = cc.Cmd_CarnivalCreateDirectionGroup.create(monsters);
        cmd4.finish = function()
        {
//            if (!wrapFinish && self.createWrapFinish)
//            {
//                self.createWrapFinish();
//                wrapFinish = true;
//            }
        };

        self.addCommand(cmd4);

        //
        var cmd5 = cc.Cmd_CarnivalScore.create();
        cmd5.finish = function()
        {

        };

        self.addCommand(cmd5);

        var cmd6 = cc.Cmd_EveryDestroy.create();
        cmd6.finish = function()
        {

        };

        self.addCommand(cmd6);

        var cmd7 = cc.Cmd_EveryMoveNext.create();
        cmd7.finish = function()
        {

        };

        self.addCommand(cmd7);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        gameLevel.addCommand(cc.Cmd_EveryDestroy.create());
        return this;
    }
});

cc.Cmd_CarnivalTime.create = function(moves)
{
    return new cc.Cmd_CarnivalTime(moves);
};



