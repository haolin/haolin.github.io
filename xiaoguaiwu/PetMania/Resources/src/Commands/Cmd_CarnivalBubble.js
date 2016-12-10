/*
 在捕捉模式中首先一次消除所有残留的泡泡，然后每一次剩余的步数将使一只随机怪物变为一只纵横消怪物，然后所有纵横消怪物激活。
 */

//======================================================================================================================
cc.Cmd_CarnivalDesAllBubbles = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        this.m_DelayTimer = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    _getMonstersWithBubbles: function(gameLevel)
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

            if (_IsAnyBubbleCoverMonster(middleObj))
            {
                monsters.push(middleObj);
            }
        }

        return monsters;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //拿所有有泡泡的怪物
        var monstersWithBubbles = this._getMonstersWithBubbles(gameLevel);
        if (monstersWithBubbles.length <= 0)
        {
            return this;
        }

        this.m_DelayTimer = Defines.FPS * 10;

        //
        var visitor = cc.ScoreVisitorSingle.create(Defines.SCORE_TYPE.SCORE_NULL);
        monstersWithBubbles.forEach(
            function(a_monster)
            {
                a_monster.destroy(a_monster, gameLevel, visitor);
            }
        );

        visitor.visitFinish();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        //
        this.m_DelayTimer -= time;
        return this.m_DelayTimer <= 0;
    }
});

cc.Cmd_CarnivalDesAllBubbles.create = function()
{
    return new cc.Cmd_CarnivalDesAllBubbles();
};

//======================================================================================================================
cc.Cmd_LeftMovesToBombDirectionMonster = cc.ICommandGroup.extend({

    ctor: function(moves)
    {
        this._super();

        //
        this.m_Moves = moves;
        //this.m_IsFinished = false;
        this.m_TargetsCount = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    _findTargets: function(gameLevel)
    {
        var res = [];

        //
        var itr = gameLevel.getTable().createIterForMiddleObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var mons = itr.getCurrent();
            if (mons && mons.isNormal())
            {
                res.push(mons);
            }
        }

        //
        Tools.shuffle(res);
        if (res.length > this.m_Moves)
        {
            res = res.slice(0, this.m_Moves);
        }

        //
        return res;
    },

    //------------------------------------------------------------------------------------------------------------------
    _runEffectToGroup: function(gameLevel, group, startPos)
    {
        var self = this;

        group.forEach(
            function(mons)
            {
                cc.EffectMng.getInstance().displayTailerBezierPath(
                    startPos,
                    mons.getPosition(),
                    function()
                    {
                        //改变步数
                        cc.DataMng.getInstance().addTouchMoves();

                        //标记完成一个
                        --self.m_TargetsCount;

                        //创建怪物!!!
                        var createNew = cc.Obj_MonsterDirection.create(mons.getColor(), _RandHVDirection());
                        cc.AudioMng.getInstance().playCreateDirection(mons);

                        //移除旧的
                        var grid = mons.removeFromParentNode();
                        gameLevel.disposal(mons);

                        //添加新的
                        grid.addNode(createNew);
                        createNew.updateNodePosition();
                        createNew.renderNode();
                    });
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _runEffect: function(gameLevel, targets)
    {
        //
        var self = this;

        //3个一组释放特效
        var groups = [];
        var a_groupLen = 3;
        while (targets.length > a_groupLen)
        {
            var a_group = targets.slice(0, a_groupLen);
            targets = targets.slice(a_groupLen, targets.length);

            //
            groups.push(a_group);
        }

        //最后剩余的压入
        groups.push(targets);

        //发起位置????
        var targetRect = cc.GUIGameLevel.getInstance().getMovesRectForGuide();
        var posStart = cc.p(targetRect.x + targetRect.width/2, targetRect.y - 20);

        //
        groups.forEach(
            function(a_group, index)
            {
                cc.log("输出每个小组 a_group = " + a_group);

                //
                gameTableLayer().runAction(
                    cc.Sequence.create(
                        cc.DelayTime.create(index * Defines.FPS * 20),
                        cc.CallFunc.create(
                            function()
                            {
                                self._runEffectToGroup(gameLevel, a_group, posStart);
                            }
                        )
                    ));
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _start: function(gameLevel)
    {
        //
        var targets = this._findTargets(gameLevel);
        if (targets.length <= 0)
        {
            cc.log("Cmd_LeftMovesToBombDirectionMonster 找不到任何目标????");
            return this;
        }

        cc.log("Cmd_LeftMovesToBombDirectionMonster 选取这些目标 = " + targets);
        this.m_TargetsCount = targets.length;
        this._runEffect(gameLevel, targets);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);
        return this._start(gameLevel);
        /*

         var self = this;

         var leftMoves = this.m_Moves;
         var monsterNumber = leftMoves;

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
         this.m_IsFinished = true;
         return this;
         }

         Tools.shuffle(normalMonster);
         normalMonster = normalMonster.slice(0,monsterNumber);

         var visitor = cc.ScoreVisitorGroup.create(Defines.SCORE_TYPE.SCORE_CREATE_WRAP);
         var needFinishCount = normalMonster.length;
         var hasFinishCount = 0;
         var delayTime = 0;
         var self = this;

         var num = 1;
         normalMonster.forEach(
         function (a_monster)
         {
         if (num % 3 == 0)
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
         var targetRect = cc.GUIGameLevel.getInstance().getMovesRectForGuide();
         var posStart = cc.p(targetRect.x+targetRect.width/2,targetRect.y-20);
         //                                var posStart = cc.p(130,470);
         var posEnd = a_monster.getSprite().getPosition();
         cc.EffectMng.getInstance().displayTailerBezierPath(posStart, posEnd,
         function(a_monster)
         {
         a_monster.getSprite().runAction(
         cc.CallFunc.create(
         function()
         {
         var monsterList = [];
         monsterList.push(a_monster);
         var cmd1 = cc.Cmd_CarnivalCreateDirectionGroup.create(monsterList);
         cmd1.finish = function()
         {
         hasFinishCount++;
         cc.DataMng.getInstance().addTouchMoves();
         if (hasFinishCount >= needFinishCount)
         {
         self.m_IsFinished = true;
         }
         };

         self.addCommand(cmd1);
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
         return this;*/
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        return /*this.m_IsFinished || */this.m_TargetsCount <= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        gameLevel.addCommand(cc.Cmd_EveryDestroy.create());
        return this;
    }
});

cc.Cmd_LeftMovesToBombDirectionMonster.create = function(moves)
{
    return new cc.Cmd_LeftMovesToBombDirectionMonster(moves);
};


//======================================================================================================================
cc.Cmd_CarnivalBubble = cc.ICommandGroup.extend({

    ctor: function(moves)
    {
        this._super();

        //
        this.m_Moves = moves;
        this.m_DelayTime = Defines.FPS * 30;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //
        var cmd0 = cc.Cmd_CarnivalDesAllBubbles.create();
        this.addCommand(cmd0);

        //
        var self = this;

        //TODO  Cmd_LeftMovesToBombDirectionMonster 需要重构
        var cmd1 = cc.Cmd_LeftMovesToBombDirectionMonster.create(this.m_Moves);
        cmd1.finish = function()
        {

        };

        this.addCommand(cmd1);

        //
        var cmd2 = cc.Cmd_CarnivalScore.create();
        cmd2.finish = function()
        {

        };

        self.addCommand(cmd2);

        //
        var cmd3 = cc.Cmd_EveryDestroy.create();
        cmd3.finish = function()
        {

        };

        self.addCommand(cmd3);

        //
        var cmd4 = cc.Cmd_EveryMoveNext.create();
        cmd4.finish = function()
        {

        };

        self.addCommand(cmd4);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        if (this.m_Commands.length <= 0)
        {
            this.m_DelayTime -= time;
        }

        return this.m_Commands.length <= 0 && this.m_DelayTime <= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        gameLevel.addCommand(cc.Cmd_EveryDestroy.create());
        return this;
    }
});

cc.Cmd_CarnivalBubble.create = function(moves)
{
    return new cc.Cmd_CarnivalBubble(moves);
};



