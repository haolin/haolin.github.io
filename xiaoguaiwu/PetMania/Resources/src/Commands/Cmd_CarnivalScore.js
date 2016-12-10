//分数狂欢命令

//======================================================================================================================
cc.Cmd_CarnivalScore = cc.ICommandGroup.extend({

    ctor: function()
    {
        this._super();
        this.m_Monsters = [];
        this.m_Finish = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);
        this._restart(gameLevel);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _restart: function(gameLevel)
    {
        var table = gameLevel.getTable();

        //
        var itr = table.createIterForMiddleObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var middleObj = itr.getCurrent();
            if (!middleObj)
            {
                continue;
            }

            //
            if (_IsAnyBubbleCoverMonster(middleObj))
            {
                continue;
            }

            //
            if (middleObj instanceof cc.Obj_MonsterDirection
                || middleObj instanceof cc.Obj_MonsterWrap
                || middleObj instanceof cc.Obj_MonsterColorful
                )
            {
                this.m_Monsters.push(middleObj);
            }
        }

        //
        this.m_Monsters = this.m_Monsters.filter(
            function(monster)
            {
                return monster && monster.getParentNode();
            }
        );

        //
        if (this.m_Monsters.length > 0)
        {
            Tools.shuffle(this.m_Monsters);
            this.m_Monsters[0].toFire(gameLevel);

            //
            var cmd0 = cc.Cmd_EveryDestroy.create(null);
            cmd0.finish = function()
            {

            };

            this.addCommand(cmd0);

            //
            var cmd1 = cc.Cmd_EveryMoveNext.create();
            cmd1.finish = function()
            {

            };

            this.addCommand(cmd1);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        var self = this;

        //
        var needFirstReStart = (!this.m_Finish && this.m_Commands.length <= 0);
        if (needFirstReStart)
        {
            this._restart(gameLevel);
        }

        //
        var needFinish = (!this.m_Finish && this.m_Commands.length <= 0);
        if (needFinish)
        {
            var cmd0 = cc.Cmd_EveryDestroy.create(null);
            cmd0.finish = function()
            {
                if (cmd0.m_IsDestroyAny)
                {
                    var cmd1 = cc.Cmd_EveryMoveNext.create();
                    cmd1.finish = function()
                    {

                    };

                    self.addCommand(cmd1);
                }
                else
                {
                    self.m_Finish = true;
                }
            };

            this.addCommand(cmd0);
        }

        return (this.m_Finish && this.m_Commands.length <= 0);
    }
});

cc.Cmd_CarnivalScore.create = function()
{
    return new cc.Cmd_CarnivalScore();
};



