/**
 * Created with JetBrains WebStorm.
 * User: Forward
 * Date: 13-8-7
 * Time: 下午7:50
 * To change this template use File | Settings | File Templates.
 */
//======================================================================================================================
cc.Cmd_HandleLimtMonster = cc.ICommandGroup.extend({

    ctor: function()
    {
        this._super();
        this.m_IsFinished = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        var monsterAddTime = [];
        var table = gameLevel.getTable();
        var itr = table.createIterForMiddleObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var curObj = itr.getCurrent();
            if (!curObj)
            {
                continue;
            }

            if (curObj instanceof cc.Obj_MonsterAddTime)
            {
                monsterAddTime.push(curObj);
            }
        }

        if (monsterAddTime.length <= 0)
        {
            this.m_IsFinished = true;
            return this;
        }

        var visitor = cc.ScoreVisitorGroup.create(Defines.SCORE_TYPE.SCORE_CREATE_WRAP);
       // var bombMonsters = [];
        monsterAddTime.forEach(
            function (a_monster)
            {
                var grid = a_monster.getParentNode();
                var createNew = a_monster.createMonsterWrap();

                //删除源
                a_monster.destroy(a_monster, gameLevel, visitor);
                if (a_monster.getParentNode())
                {
                    createNew.release();
                }
                else
                {
                    //创建的东西添加给格子
                    grid.addNode(createNew);
                    createNew.updateNodePosition();
                    createNew.renderNode();
                }
            }
        )

        this.m_IsFinished = true;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        return this.m_IsFinished;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        gameLevel.addCommand(cc.Cmd_EveryDestroy.create());
        return this;
    }
});

cc.Cmd_HandleLimtMonster.create = function()
{
    return new cc.Cmd_HandleLimtMonster();
};

//======================================================================================================================
cc.Cmd_LeftTimeToBombMonster = cc.ICommandGroup.extend({

    ctor: function(time)
    {
        this._super();
        this.m_Times = time;
        this.m_IsFinished = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        var leftTime = this.m_Times;
        var bombCount = parseInt(leftTime/5) + (leftTime % 5 > 0 ? 1 : 0);

        var normalMonster = [];
        var table = gameLevel.getTable();
        var itr = table.createIterForMiddleObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var curObj = itr.getCurrent();
            if (!curObj)
            {
                continue;
            }

            if (curObj.description() == "Obj_Monster")
            {
                normalMonster.push(curObj);
            }
        }

        if (normalMonster.length <= 0)
        {
            return this;
        }

        Tools.shuffle(normalMonster);
        normalMonster = normalMonster.slice(0,bombCount);

        var visitor = cc.ScoreVisitorGroup.create(Defines.SCORE_TYPE.SCORE_CREATE_WRAP);

        var needFinishCount = normalMonster.length;
        var hasFinishCount = 0;
        var delayTime = 0;
        var self = this;

        var num = 1;
        normalMonster.forEach(
            function (a_monster,index)
            {
                cc.log("index = " + index);
                if (num % 5 == 0)
                {
                    delayTime += 0.3;
                }

                num++;
                a_monster.getSprite().runAction(
                    cc.Sequence.create(
                        cc.DelayTime.create(delayTime),
                        cc.CallFunc.create(
                            function ()
                            {
                                var targetRect = cc.GUIGameLevel.getInstance().getTimeRectForGuide();
                                var posStart = cc.p(targetRect.x+targetRect.width/2,targetRect.y-20);
//                                var posStart = cc.p(130,470);
                                var posEnd = a_monster.getSprite().getPosition();
                                cc.EffectMng.getInstance().displayTailerBezierPath(posStart, posEnd,
                                    function(a_monster)
                                    {
                                        a_monster.getSprite().runAction(
                                            cc.CallFunc.create(
                                                function ()
                                                {
                                                var grid = a_monster.getParentNode();
                                                var createNew = a_monster.createMonsterWrap();

                                                //删除源
                                                a_monster.destroy(a_monster, gameLevel, visitor);
                                                if (a_monster.getParentNode())
                                                {
                                                    createNew.release();
                                                }
                                                else
                                                {
                                                    //创建的东西添加给格子
                                                    grid.addNode(createNew);
                                                    createNew.updateNodePosition();
                                                    createNew.renderNode();
                                                }

                                                cc.DataMng.getInstance().subGameLevelTime(5);
                                                hasFinishCount++;
                                                if (hasFinishCount >= needFinishCount)
                                                {
                                                    cc.DataMng.getInstance().subGameLevelTime(5);
                                                    self.m_IsFinished = true;
                                                }
                                            }
                                            )
                                        )
                                    },
                                    a_monster);
                            }
                        )
                    )
                );
            }
        );
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        return this.m_IsFinished;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        gameLevel.addCommand(cc.Cmd_EveryDestroy.create());
        return this;
    }
});

cc.Cmd_LeftTimeToBombMonster.create = function(time)
{
    return new cc.Cmd_LeftTimeToBombMonster(time);
};

//======================================================================================================================
cc.Cmd_CarnivalBoss_LimitTime = cc.ICommandGroup.extend({

    ctor: function(time)
    {
        this._super();
        this.m_Times = time;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        var cmd0 = cc.Cmd_CarnivalScore.create();
        cmd0.finish = function()
        {

        };
        this.addCommand(cmd0);


        //
        var cmd1 = cc.Cmd_EveryDestroy.create();
        cmd1.finish = function()
        {

        };
        this.addCommand(cmd1);

        //
        var cmd2 = cc.Cmd_EveryMoveNext.create();
        cmd2.finish = function()
        {

        };
        this.addCommand(cmd2);

        var time = this.m_Times;
        var cmdHandleTimeMonster = cc.Cmd_HandleLimtMonster.create();
        this.addCommand(cmdHandleTimeMonster);

        var cmdLeftTimeToBombMonster = cc.Cmd_LeftTimeToBombMonster.create(this.m_Times);
        this.addCommand(cmdLeftTimeToBombMonster);

        var cmd3 = cc.Cmd_BossChangeColorful.create();
        this.addCommand(cmd3);

        var cmd4 = cc.Cmd_CarnivalScore.create();
        cmd4.finish = function()
        {

        };
        this.addCommand(cmd4);


        this.addCarnivalCommand();
//        //
//        var cmd5 = cc.Cmd_EveryDestroy.create();
//        cmd5.finish = function()
//        {
//
//        };
//        this.addCommand(cmd5);
//
//        //
//        var cmd6 = cc.Cmd_EveryMoveNext.create();
//        cmd6.finish = function()
//        {
//
//        };
//        this.addCommand(cmd6);
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    addCarnivalCommand : function()
    {
        var self = this;
        var cmd_Cmd_LeftMovesToMonster = cc.Cmd_LeftMovesToMonsterWithNumber.create();
        cmd_Cmd_LeftMovesToMonster.finish = function()
        {
            var monsters = cmd_Cmd_LeftMovesToMonster.getMonsterList();

            //
            var cmd4 = cc.Cmd_BossSwallowMonster.create(cc.DataMng.getInstance().getLeftTouchMoves(),monsters);
            cmd4.finish = function()
            {
            };
            self.addCommand(cmd4);

            var cmd5 = cc.Cmd_EveryMoveNext.create();
            cmd5.finish = function()
            {

            };
            self.addCommand(cmd5);

            var leftMoves = cc.DataMng.getInstance().getLeftTouchMoves();
            if (leftMoves > 0)
            {
                self.addCarnivalCommand();
            }
        }
        this.addCommand(cmd_Cmd_LeftMovesToMonster);
    },
    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        return this.m_Commands.length <= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        gameLevel.addCommand(cc.Cmd_EveryDestroy.create());
        return this;
    }
});

cc.Cmd_CarnivalBoss_LimitTime.create = function(time)
{
    return new cc.Cmd_CarnivalBoss_LimitTime(time);
};
