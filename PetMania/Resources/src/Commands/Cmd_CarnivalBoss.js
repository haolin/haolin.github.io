//======================================================================================================================
cc.Cmd_MiningGameBonusMonster = cc.ICommandGroup.extend({

    ctor: function()
    {
        this._super();
        this.m_IsFinished = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);
        var self = this;

        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        var targetType = 0;
        if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_MINELOTTERY){
            if (cc.MineMng.getInstance().getPROGRESS_GET()){
                var radSum = 100;
                var radRes = Tools.randomEx(radSum);
                if (radRes > cc.MineMng.getInstance().getPROGRESS_GET()[0] + cc.MineMng.getInstance().getPROGRESS_GET()[1]){
                    targetType = 2;
                }
                else if (radRes > cc.MineMng.getInstance().getPROGRESS_GET()[0] ){
                    targetType = 1;
                }
                else {
                    targetType = 0;
                }

            }
        }
        else {
            return this;
        }

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

            if (curObj.description() == "Obj_Monster" && targetType == 0)
            {
                normalMonster.push(curObj);
            }
            else if (curObj.description() == "Obj_MonsterMine" && targetType == 1)
            {
                normalMonster.push(curObj);
            }
            else if (curObj.description() == "Obj_MonsterDiamond" && targetType == 2)
            {
                normalMonster.push(curObj);
            }
        }

        if (normalMonster.length <= 0 )
        {
            this.m_IsFinished = true;
            return this;
        }

        Tools.shuffle(normalMonster);
        normalMonster = normalMonster.slice(0,1);

        var visitor = cc.ScoreVisitorGroup.create(Defines.SCORE_TYPE.SCORE_CREATE_WRAP);
        var delayTime = 0.3;
        var self = this;

        normalMonster.forEach(
            function (a_monster)
            {

                a_monster.getSprite().runAction(
                    cc.Sequence.create(
                        cc.DelayTime.create(delayTime),
                        cc.CallFunc.create(
                            function ()
                            {
                                var posStart = cc.GUIGameLevel.getInstance().getGameProgressTopPosForMiningGame();
                                var posEnd = a_monster.getSprite().getPosition();
                                var posMid = cc.pSub(posStart,posEnd);
                                var randDistance = Defines.TABLE_GRID_SIZE * 2;
                                posMid.x  += Tools.rangeRandom(-randDistance, randDistance);
                                posMid.y  -= Tools.rangeRandom(0, randDistance);
                                cc.EffectMng.getInstance().displayTailerBezierPath(posStart, posEnd,
                                    function(a_monster)
                                    {
                                        a_monster.getSprite().runAction(
                                            cc.CallFunc.create(
                                                function ()
                                                {
                                                    var grid = a_monster.getParentNode();
                                                    if (a_monster.description() == "Obj_Monster" ){
                                                        var radSum = 100;
                                                        var radRes = Tools.randomEx(radSum);
														var rate_PROGRESS_ITEM = cc.MineMng.getInstance().getPROGRESS_ITEM();
                                                        if (radRes > rate_PROGRESS_ITEM[0] + rate_PROGRESS_ITEM[1]){
                                                            var createNew = a_monster.createMonsterColorful();
                                                        }
                                                        else if (radRes > rate_PROGRESS_ITEM[0]){
                                                            var createNew = a_monster.createMonsterWrap();
                                                        }
                                                        else {
                                                            var createNew = a_monster.createMonsterDirection();
                                                        }
                                                        a_monster.destroy(a_monster, gameLevel, visitor);
                                                    }
                                                    else if (a_monster.description() == "Obj_MonsterMine" ){
                                                        var createNew = cc.Obj_MonsterDiamond.create();
                                                        gameLevel.disposal(a_monster);
                                                    }
                                                    else {
                                                        var createNew = null;
                                                        a_monster.destroy(a_monster, gameLevel, visitor, true);
                                                    }

                                                    //删除源
//                                                    a_monster.destroy(a_monster, gameLevel, visitor);
                                                    if (createNew){
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

                                                    self.m_IsFinished = true;
													var curMonsterNum = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_Monster");
													cc.log("准备清除采矿小怪物 原始：" + curMonsterNum +" 现在 ： " + (curMonsterNum - cc.MineMng.getInstance().getPROGRESS_LINE()));
                                                    DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().setDestroyObjectToDiary("Obj_Monster", curMonsterNum - cc.MineMng.getInstance().getPROGRESS_LINE());
                                                }
                                            )
                                        )
                                    },
                                    a_monster,
                                    cc.pAdd(cc.p(posMid.x / 2, posMid.y / 2), posEnd));
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

cc.Cmd_MiningGameBonusMonster.create = function()
{
    return new cc.Cmd_MiningGameBonusMonster();
};

//分数狂欢命令
//======================================================================================================================
cc.Cmd_BossChangeColorful = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        this.m_IsFinish = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        var self = this;
        var bosses = cc.BossMng.getInstance().getAllBosses();
        bosses.forEach(
            function(a_boss)
            {
                if (a_boss instanceof cc.Obj_ColorBoss)
                {
                    a_boss.changeColorful(
                        function()
                        {
                            self.m_IsFinish = true;
                        }
                    );
                }
            }
        );
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
   /* callBack : function()
    {
        this.m_IsFinish = true;
    },*/

    //------------------------------------------------------------------------------------------------------------------
    finish : function()
    {
        this.m_IsFinish;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        return this.m_IsFinish;
    }
});

cc.Cmd_BossChangeColorful.create = function()
{
    return new cc.Cmd_BossChangeColorful();
};

//======================================================================================================================
cc.Cmd_LeftMovesToMonster = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(moves)
    {
        this._super();
        this.m_Moves = moves;
        this.m_DelayTime = 0;
        this.m_MonsterList = [];
        this.m_IsFinish = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);
        var self = this;
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

        var bossArray = cc.BossMng.getInstance().getAllBosses().concat();
        var monsterNumber = this.m_Moves;
//        monsterNumber = monsterNumber*5 < bossArray.length*10 ? monsterNumber*5 : bossArray.length*10;

        Tools.shuffle(monsters);
        var newMonsters = monsters.slice(0,monsterNumber);
        if (newMonsters.length <= 0)
        {
            this.m_IsFinish = true;
            return this;
        }

        var needFinishCount = newMonsters.length;
        var hasFinishCount = 0;
        var delayTime = 0;

        var num = 1;
        newMonsters.forEach(
            function (a_monster)
            {
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
                                var targetRect = cc.GUIGameLevel.getInstance().getMovesRectForGuide();
                                var posStart = cc.p(targetRect.x+targetRect.width/2,targetRect.y-20);
//                                var posStart = cc.p(130,470);

                                var posEnd = a_monster.getSprite().getPosition();
                                cc.EffectMng.getInstance().displayTailerBezierPath(posStart, posEnd,
                                    function(a_monster)
                                    {
                                        var monsterScale = cc.ScaleTo.create(Defines.FPS*30,1.2,1.2);
                                        var monsterScaleBack = cc.ScaleTo.create(Defines.FPS*30,1,1);

                                        a_monster.getSprite().runAction(
                                            cc.RepeatForever.create(
                                                cc.Sequence.create(
                                                    monsterScale,
                                                    monsterScaleBack
                                                )
                                            )
                                        );
                                    },
                                    a_monster);

                                self.m_MonsterList.push(a_monster);
                                cc.DataMng.getInstance().addTouchMoves();
                                hasFinishCount++;
                                if (hasFinishCount >= needFinishCount)
                                {
                                    self.m_IsFinish = true;
                                }
                            }
                        )
                    )
                );
            }
        )
        return this;
    },

    getNewMonsterList : function()
    {
        return this.m_MonsterList;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        if (this.m_IsFinish)
        {
            this.m_DelayTime += time;
            if (this.m_DelayTime > Defines.FPS * 60)
            {
                return true;
            }
        }

        return false;
    }
});

cc.Cmd_LeftMovesToMonster.create = function(moves)
{
    return new cc.Cmd_LeftMovesToMonster(moves);
};

//======================================================================================================================
cc.Cmd_LeftMovesToMonsterWithNumber = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        this.m_DelayTime = 0;
        this.m_MonsterList = [];
        this.m_IsFinish = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        var leftMoves = cc.DataMng.getInstance().getLeftTouchMoves();
        if (leftMoves <= 0)
        {
            this.m_IsFinish = true;
            return this;
        }

        var self = this;
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

        var bossArray = cc.BossMng.getInstance().getAllBosses().concat();
        var monsterNumber = 0;
//        monsterNumber = monsterNumber*5 < bossArray.length*10 ? monsterNumber*5 : bossArray.length*10;
        monsterNumber = leftMoves > bossArray.length*5 ? bossArray.length*5 : leftMoves;

        Tools.shuffle(monsters);
        var newMonsters = monsters.slice(0,monsterNumber*3);
        if (newMonsters.length <= 0)
        {
            this.m_IsFinish = true;
            return this;
        }

        var needFinishCount = newMonsters.length;
        var hasFinishCount = 0;
        var delayTime = 0;

        var num = 1;
        newMonsters.forEach(
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
                                var posStart = cc.p(targetRect.x+targetRect.width/2,targetRect.y);
//                                var posStart = cc.p(130,470);
                                var posEnd = a_monster.getSprite().getPosition();
                                cc.EffectMng.getInstance().displayTailerBezierPath(posStart, posEnd,
                                    function(a_monster)
                                    {
                                        var monsterScale = cc.ScaleTo.create(Defines.FPS*30,1.2,1.2);
                                        var monsterScaleBack = cc.ScaleTo.create(Defines.FPS*30,1,1);

                                        a_monster.getSprite().runAction(
                                            cc.RepeatForever.create(
                                                cc.Sequence.create(
                                                    monsterScale,
                                                    monsterScaleBack
                                                )
                                            )
                                        );
                                    },
                                    a_monster);

                                self.m_MonsterList.push(a_monster);
                                hasFinishCount++;
                                if (hasFinishCount % 3 == 0)
                                {
                                    cc.DataMng.getInstance().addTouchMoves();
                                }
                                if (hasFinishCount >= needFinishCount)
                                {
                                    self.m_IsFinish = true;
                                }
                            }
                        )
                    )
                );
            }
        )
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMonsterList : function()
    {
        return this.m_MonsterList;
    },
    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        if (this.m_IsFinish)
        {
            this.m_DelayTime += time;
            if (this.m_DelayTime > Defines.FPS * 60)
            {
                return true;
            }
        }

        return false;
    }
});

cc.Cmd_LeftMovesToMonsterWithNumber.create = function()
{
    return new cc.Cmd_LeftMovesToMonsterWithNumber();
};

//======================================================================================================================
cc.Cmd_LeftMovesToBombWrapMonster = cc.ICommandGroup.extend({

    ctor: function(moves)
    {
        this._super();
        this.m_Moves = moves;
        this.m_IsFinished = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);
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
                                var targetRect = cc.GUIGameLevel.getInstance().getMovesRectForGuide();
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

                                                    cc.DataMng.getInstance().addTouchMoves();
                                                    hasFinishCount++;
                                                    if (hasFinishCount >= needFinishCount)
                                                    {
                                                        self.m_IsFinished = true;
                                                        cc.DataMng.getInstance().cleanTouchMoves();
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

cc.Cmd_LeftMovesToBombWrapMonster.create = function(moves)
{
    return new cc.Cmd_LeftMovesToBombWrapMonster(moves);
};


//======================================================================================================================
cc.Cmd_LeftMovesToFlowerMonster = cc.ICommandGroup.extend({

    ctor: function(moves)
    {
        this._super();
        this.m_Moves = moves;
        this.m_IsFinished = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);
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

        var monsterList = [];
        var visitor = cc.ScoreVisitorGroup.create(Defines.SCORE_TYPE.SCORE_CREATE_WRAP);
        var needFinishCount = normalMonster.length;
        var hasFinishCount = 0;
        var delayTime = 0;
        var self = this;

        var num = 1;
        normalMonster.forEach(
            function (a_monster)
            {
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
                                var targetRect = cc.GUIGameLevel.getInstance().getMovesRectForGuide();
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
                                                    monsterList.push(a_monster);
                                                    var monsterScale = cc.ScaleTo.create(Defines.FPS*30,1.2,1.2);
                                                    var monsterScaleBack = cc.ScaleTo.create(Defines.FPS*30,1,1);

                                                    a_monster.getSprite().runAction(
                                                        cc.RepeatForever.create(
                                                            cc.Sequence.create(
                                                                monsterScale,
                                                                monsterScaleBack
                                                            )
                                                        )
                                                    );

                                                    cc.DataMng.getInstance().addTouchMoves();
                                                    hasFinishCount++;
                                                    if (hasFinishCount >= needFinishCount)
                                                    {
                                                        var cmd1 = cc.Cmd_CarnivalFlower.create(monsterList);
                                                        cmd1.finish = function()
                                                        {
                                                            self.m_IsFinished = true;
                                                        };
                                                        self.addCommand(cmd1);
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

cc.Cmd_LeftMovesToFlowerMonster.create = function(moves)
{
    return new cc.Cmd_LeftMovesToFlowerMonster(moves);
};
//======================================================================================================================
cc.Cmd_BossSwallowMonster = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(moves, monseters)
    {
        this._super();

        this.m_Moves = moves;

        this.m_IsFinish = false;
        //this.m_FinishCount = 0;
        this.m_NewMonster = monseters;
        this.m_BossScoreMap = {};
        this.m_AddValue = {};
    },

    //------------------------------------------------------------------------------------------------------------------
    _start: function(gameLevel)
    {
        if (this.m_NewMonster.length <= 0)
        {
            this.m_IsFinish = true;
            return this;
        }

        //
        var self = this;

        /////
        var bossArray = cc.BossMng.getInstance().getAllBosses().concat();
        var visitor = cc.ScoreVisitorSingle.create(Defines.SCORE_TYPE.SCORE_DES_NORMAL);
        var finishCount = 0;

//        var addValue[] = 0;
        ///
        this.m_NewMonster.forEach(
            function (each, index, array)
            {
                //
                var randBoss = Tools.arrayRandom(bossArray);
                var randPosition = randBoss.getPosition();

                //
                each.destroy(each, gameLevel, visitor);
                cc.AudioMng.getInstance().playMonsterEscape();

                //
                cc.EffectMng.getInstance().displayMonsterFlyTo(
                    each,
                    randPosition,
                    function(/*sender*/)
                    {
                        ++finishCount;
                        if (finishCount >= array.length)
                        {
                            self.m_IsFinish = true;
                        }

                        //分数问题
                        var bossID = randBoss.getObjectID();
                        self.m_BossScoreMap[bossID] = self.m_BossScoreMap[bossID] || 0;
                        self.m_AddValue[bossID] = self.m_AddValue[bossID] || 0;
                        ++self.m_BossScoreMap[bossID];

                        //
                        if (self.m_BossScoreMap[bossID] >= 3)
//                        if ((index+1) % 3 == 0)
                        {
                            self.m_BossScoreMap[bossID] = 0;
//                            addValue += 1800;
                            self.m_AddValue[bossID] += 1800;
                            cc.DataMng.getInstance().addScore(self.m_AddValue[bossID]);
                            var randDisX = Tools.rangeRandom(-10,10,false);
                            var randDisY = Tools.rangeRandom(-10,10,false);
                            cc.EffectMng.getInstance().displayScore(self.m_AddValue[bossID], cc.p(randPosition.x+randDisX,randPosition.y+randDisY), _RandColor());
                        }

                    },
                    null);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);
        return this._start(gameLevel);





        var newMonsters = this.m_NewMonster;
        if (newMonsters.length <= 0)
        {
            this.m_IsFinish = true;
            return this;
        }

        var self = this;
        var bossArray = cc.BossMng.getInstance().getAllBosses().concat();
        //
        var totalCount = 0;
        var addScore = 0;
        bossArray.forEach(
            function(boss, index, array)
            {
                var monCount = 0;

                if (index == array.length - 1)
                {
                    monCount = newMonsters.length - totalCount;
                }
                else
                {
                    monCount = parseInt(newMonsters.length / array.length);
                    totalCount += monCount;
                }


                var needFinishCount = newMonsters.length;
                //
                var visitor = cc.ScoreVisitorSingle.create(Defines.SCORE_TYPE.SCORE_DES_NORMAL);
                newMonsters.forEach(
                    function(mons)
                    {
                        //
                        cc.EffectMng.getInstance().displayMonsterFlyTo(
                            mons,
                            boss.getPosition(),
                            function(/*sender*/)
                            {
                                //
                                //var visitor = cc.ScoreVisitorSingle.create(Defines.SCORE_TYPE.SCORE_DES_NORMAL);
                                mons.destroy(mons, gameLevel, visitor);
                                //visitor.visitFinish();

                                ++self.m_FinishCount;
                                cc.AudioMng.getInstance().playMonsterEscape();
                                if (self.m_FinishCount >= needFinishCount)
                                {
                                    self.m_IsFinish = true;
                                }
                            },
                            null);

                        //
                        addScore += 1;
                        if (addScore % 3 == 0)
                        {
                            addScore = 0;

                            var scoreValue = 1800;
                            cc.DataMng.getInstance().addScore(scoreValue);
                            cc.EffectMng.getInstance().displayScore(scoreValue, boss.getPosition(), _RandColor()/*Defines.COLOR.randColorCode()*/);
                        }
                    }
                );
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);


        //this.m_DelayTime += time;
        //return this.m_DelayTime > Defines.FPS * 20;
        return this.m_IsFinish;
    }
});

cc.Cmd_BossSwallowMonster.create = function(moves,monseters)
{
    /*cc.log("===========================================================================");
    monseters.forEach(
        function (each)
        {
            cc.log("--\n" + each.toString());
        }
    );
*/

    return new cc.Cmd_BossSwallowMonster(moves, monseters);
};

//======================================================================================================================
cc.Cmd_CarnivalBoss = cc.ICommandGroup.extend({

    ctor: function(moves)
    {
        this._super();
        this.m_Moves = moves;
        this.m_DelayTimer = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);
        var self = this;
        //
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


        //
        var cmd3 = cc.Cmd_BossChangeColorful.create();
        this.addCommand(cmd3);

        var monsters = [];

         this.addCarnivalCommand();


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
            var cmd4 = cc.Cmd_BossSwallowMonster.create(self.m_Moves,monsters);
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

        /*if (!this.isStart())
        {
            this.start(gameLevel);
        }

        if (this.m_CommandClouds)
        {
            //
            for (var indx = 0; indx < this.m_Commands.length;)
            {
                if (this.m_Commands[indx].command(gameLevel, time))
                {
                    //完成 就删除掉
                    this.m_Commands[indx].finish(gameLevel);
                    this.m_Commands.splice(indx, 1);
                }
                else
                {
                    ++indx;
                }
            }

            if (this.m_Commands.length <= 0)
            {
                this.m_CommandClouds = false;

                //
                var cmd4 = cc.Cmd_EveryMoveNext.create();
                cmd4.finish = function(*//*gameLevel*//*)
                {

                };

                this.addCommand(cmd4);

                //
                var self = this;
                var cmd3 =  cc.Cmd_CarnivalScore.create();
                cmd3.finish = function(*//*gameLevel*//*)
                {
                    var _cmd1 = cc.Cmd_EveryDestroy.create();
                    _cmd1.finish = function(*//*gameLevel*//*)
                    {

                    };

                    self.addCommand(_cmd1);

                    var _cmd2 = cc.Cmd_EveryMoveNext.create();
                    _cmd2.finish = function(*//*gameLevel*//*)
                    {

                    };

                    self.addCommand(_cmd2);
                };

                this.addCommand(cmd3);
            }
        }
        else
        {
            if (this.m_Commands.length > 0)
            {
                if (this.m_Commands[0].command(gameLevel, time))
                {
                    this.m_Commands[0].finish(gameLevel);
                    this.m_Commands.shift();
                }
            }
        }*/

        return this.m_Commands.length <= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        gameLevel.addCommand(cc.Cmd_EveryDestroy.create());
        return this;
    }
});

cc.Cmd_CarnivalBoss.create = function(moves)
{
    return new cc.Cmd_CarnivalBoss(moves);
};



