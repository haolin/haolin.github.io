
cc.ScoreVisitorBase = cc.IVisitor.extend({

    ctor: function(scoreType)
    {
        this._super();
        this.m_ScoreType = scoreType;
        this.m_ScoreDatas = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    visit: function(visElement)
    {
        this._super(visElement);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    canPlayRunningAnimation: function()
    {
        return cc.ArmatureDataMng.getInstance().isValid();
    },

    //------------------------------------------------------------------------------------------------------------------
    canPlayFlyToUFOAnimation: function()
    {
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        return curLevelData && (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_MINE || curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_MINELOTTERY);
    }
});

cc.ScoreVisitorBase.parseMonstersGroup = function(scoreType, monsters)
{
    var scoreValue = 0;

    //
    switch (scoreType)
    {
    case Defines.SCORE_TYPE.SCORE_DES_NORMAL_GROUP: //普通三消
    case Defines.SCORE_TYPE.SCORE_CREATE_DIRECTION:    //创建条纹糖
        {
            scoreValue = scoreType.SCORE;
        }
        break;

    //创建多彩糖
    case Defines.SCORE_TYPE.SCORE_CREATE_COLORFUL:
        {
            //一步普通消除五只或七只动物，创造一只变色龙的计280分或380分
            scoreValue = (monsters.length >= 7) ?
                scoreType.SCORE_WITH_SEVEN : scoreType.SCORE_WITH_FIVE;
        }
        break;

    //创建爆炸糖
    case Defines.SCORE_TYPE.SCORE_CREATE_WRAP:
        {
            scoreValue = (monsters.length >= 6) ?
                scoreType.SCORE_WITH_SIX : scoreType.SCORE_WITH_FIVE;
        }
        break;

    case Defines.SCORE_TYPE.SCORE_CREATE_UNWRAP:
        {
            scoreValue = scoreType.SCORE_EACH * monsters.length;
        }
        break;

    case Defines.SCORE_TYPE.SCORE_DES_WRAP_WITH_WRAP:
        {
            scoreValue = scoreType.SCORE_EACH * monsters.length;
        }
        break;


    case Defines.SCORE_TYPE.SCORE_CREATE_BY_FLOWER_SEED:
    case Defines.SCORE_TYPE.SCORE_CREATE_BY_FLOWER_STEM:
    case Defines.SCORE_TYPE.SCORE_CREATE_BY_FLOWER_FLOWER:
        {
            var max = monsters.length;
            if (max > 6)
            {
                max = 6;
            }

            scoreType[max.toString()] = scoreType[max.toString()] || 10;
            scoreValue = scoreType[max.toString()];
        }
        break;

    default:
        break;
    }

    var bombs = monsters.filter(
        function(each)
        {
            return each instanceof cc.Obj_Bomb;
        }
    );

    //一个炸弹多加1000分
    bombs = bombs || [];
    scoreValue += Defines.SCORE_TYPE.SCORE_DES_BOMB.SCORE * bombs.length;
    return scoreValue;
};


cc.ScoreVisitorBase.descriptionToScoreType =  function(description)
{
    if (!cc.ScoreVisitorSingle.register)
    {
        cc.ScoreVisitorSingle.register = {};
        var reg = cc.ScoreVisitorSingle.register;

        reg["Obj_Floor"] = Defines.SCORE_TYPE.SCORE_DES_FLOOR;

        reg["Obj_Lock"] = Defines.SCORE_TYPE.SCORE_DES_LOCK;
        reg["Obj_Stone"] = Defines.SCORE_TYPE.SCORE_DES_LOCK_STONE;
        reg["Obj_Haze"] = Defines.SCORE_TYPE.SCORE_DES_HAZE;
        reg["Obj_Ice"] = Defines.SCORE_TYPE.SCORE_DES_ICE;


        reg["Obj_Bubble"] = Defines.SCORE_TYPE.SCORE_DES_BUBBLE;
        reg["Obj_BubbleCreator"] = Defines.SCORE_TYPE.SCORE_DES_CREATOR;

        //
        reg["Obj_Flower_" + FLOWER_LEVEL_DEFINE.SEED] = Defines.SCORE_TYPE.SCORE_CREATE_BY_FLOWER_SEED;
        reg["Obj_Flower_" + FLOWER_LEVEL_DEFINE.STEM] = Defines.SCORE_TYPE.SCORE_CREATE_BY_FLOWER_STEM;
        reg["Obj_Flower_" + FLOWER_LEVEL_DEFINE.FLOWER] = Defines.SCORE_TYPE.SCORE_CREATE_BY_FLOWER_FLOWER;
    }

    var result = cc.ScoreVisitorSingle.register[description];
    return result ? result : Defines.SCORE_TYPE.SCORE_NULL;
};


//======================================================================================================================
cc.ScoreVisitorGroup = cc.ScoreVisitorBase.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(scoreType)
    {
        this._super(scoreType);
    },

    //------------------------------------------------------------------------------------------------------------------
    getCenterPosition: function(objsGroup)
    {
        if (objsGroup.length > 0)
        {
            //记录分数显示的位置
            var sumPosX = 0;
            var sumPosY = 0;

            objsGroup.forEach(
                function(each)
                {
                    var pos = each.getPosition();
                    sumPosX += pos.x;
                    sumPosY += pos.y;
                }
            );

            //计算中点
            var len = objsGroup.length;
            return { x: sumPosX/len, y: sumPosY/len };
        }

        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    visitFinish: function(forcePosition)
    {
        this._super();

        var self = this;

        if (this.m_Elements.length <= 0)
        {
            return this;
        }

        cc.PraiseMng.getInstance().handleVisitFinish(this);
        cc.MonsterAddTimeMng.getInstance().handleVisitFinish(this);
        cc.BubbleCreateorMonstersMng.getInstance().handleVisitFinish(this);
        cc.BossMng.getInstance().handleVisitFinish(this);
        cc.PipeAndSnakeGame.getInstance().handleVisitFinish(this);


        var monsters = [];
        var otherObjs = [];
        this.m_Elements.forEach(
            function(element)
            {
                if (element instanceof cc.Obj_Monster)
                {
                    monsters.push(element);
                }
                else
                {
                    otherObjs.push(element);
                }
            }
        );

        if (monsters.length > 0)
        {
            monsters.forEach(
                function(monster)
                {
                    //
					if (monster instanceof cc.Obj_MonsterSpecial)
                    {
                        cc.EffectMng.getInstance().displayMineDestroy(
                            monster.getPosition()
                        );
                    }
					else if (monster instanceof cc.Obj_MonsterDiamond)
                    {
                        cc.EffectMng.getInstance().displayMineDestroy(
                            monster.getPosition()
                        );
                    }
					else if (monster instanceof cc.Obj_MonsterMine)
                    {
                        cc.EffectMng.getInstance().displayMineNorDestroy(
                            monster.getPosition()
                        );
                    }
					else {
						cc.EffectMng.getInstance().displayMonsterDesSingle(
							monster.getPosition(),
							cc.DataMng.getInstance().targetCheck(monster)
						);
					}

                    if (self.canPlayFlyToUFOAnimation())
                    {
                        cc.EffectMng.getInstance().displayMonsterFlyToUFO(monster);
                    }
                    else if (self.canPlayRunningAnimation())
                    {
                        cc.ArmatureDataMng.getInstance().runningArmature(monster);
                    }
                }
            );
		
			
            var scoreValue = cc.ScoreVisitorBase.parseMonstersGroup(this.m_ScoreType, monsters);
            if (scoreValue > 0)
            {
                var scorePos = forcePosition ? forcePosition : this.getCenterPosition(monsters);
                this.m_ScoreDatas.push(
                    {
                        score: scoreValue,
                        position: scorePos,
                        objs: monsters,
                        withObjs: [],
                        color: monsters[0].getColor()
                    }
                );
            }
        }

        var self = this;
        otherObjs.forEach(
            function(obj)
            {
                var scoreType = cc.ScoreVisitorBase.descriptionToScoreType(obj.description());

                //果冻单独处理
                if (obj instanceof cc.Obj_Floor)
                {
                    var monsData = self.m_ScoreDatas[0];
                    monsData.score += scoreType.SCORE;
                    monsData.withObjs.push(obj);

                    cc.AudioMng.getInstance().playFloorDestory();

                    cc.EffectMng.getInstance().displayFloorDestroy(
                        obj.getPosition()
                    );
                }
                else
                {
                    if (obj instanceof cc.Obj_Ice)
                    {
                        cc.EffectMng.getInstance().displayIceDestroy(
                            obj.getPosition()
                        );
                    }
                    else  if (obj instanceof cc.Obj_Stone)
                    {
                        cc.EffectMng.getInstance().displayStoneDestroy(
                            obj.getPosition()
                        );
                    }
                    else if (obj instanceof cc.Obj_Lock)
                    {
                        cc.EffectMng.getInstance().displayLockDestroy(
                            obj.getPosition()
                        );
                    }
                    else if (obj instanceof cc.Obj_Bubble)
                    {
                        cc.EffectMng.getInstance().displayBubbleDestroy(
                            obj.getPosition()
                        );
                    }
                    else if (obj instanceof cc.Obj_BubbleCreator)
                    {
                        cc.EffectMng.getInstance().displayBubbleCreatorDestroy(
                            obj.getPosition()
                        );
                    }
                    else if (obj instanceof cc.Obj_Snake)
                    {
                        cc.EffectMng.getInstance().displayMonsterDesSingle(
                            obj.getPosition()
                        );
                    }
                    else if (obj instanceof cc.Obj_Haze)
                    {
                        cc.EffectMng.getInstance().displayHazeDestroy(
                            obj.getPosition()
                        );
                    }

                    self.m_ScoreDatas.push(
                        {
                            score: scoreType.SCORE,
                            position: obj.getPosition(),
                            objs: obj,
                            withObjs: [],
                            color: Defines.COLOR.NULL
                        }
                    );
                }
            }
        );
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_MINELOTTERY){
            return this;
        }
        //
        var continuous = cc.DataMng.getInstance().getContinuousDestroyCount();
        this.m_ScoreDatas.forEach(
            function(scoreData)
            {
                scoreData.score *= continuous;
                if (scoreData.score > 0)
                {
                    cc.DataMng.getInstance().addScore(scoreData.score);
					if (curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_MINELOTTERY){
						cc.EffectMng.getInstance().displayScore(
							scoreData.score,
							scoreData.position,
							scoreData.color
						);
					}

                }
                else
                {
                    cc.log("+了一个小于0的分数?????");
                }
            }
        );

        return this;
    }
});

//工厂方法
cc.ScoreVisitorGroup.create = function(scoreType)
{
    return new cc.ScoreVisitorGroup(scoreType);
};


//======================================================================================================================
cc.ScoreVisitorSingle = cc.ScoreVisitorBase.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(scoreType)
    {
        this._super(scoreType);
    },

    //------------------------------------------------------------------------------------------------------------------
    visitFinish: function()
    {
        this._super();

        var self = this;

        if (this.m_Elements.length <= 0)
        {
            return this;
        }

        cc.PraiseMng.getInstance().handleVisitFinish(this);
        cc.MonsterAddTimeMng.getInstance().handleVisitFinish(this);
        cc.BubbleCreateorMonstersMng.getInstance().handleVisitFinish(this);
        cc.BossMng.getInstance().handleVisitFinish(this);
        cc.PipeAndSnakeGame.getInstance().handleVisitFinish(this);

        var self = this;
        this.m_Elements.forEach(
            function(element)
            {
                if (element instanceof cc.Obj_Monster)
                {
                    //
					if (element instanceof cc.Obj_MonsterSpecial)
                    {
                        cc.EffectMng.getInstance().displayMineDestroy(
                            element.getPosition()
                        );
                    }
					else if (element instanceof cc.Obj_MonsterDiamond)
                    {
                        cc.EffectMng.getInstance().displayMineDestroy(
                            element.getPosition()
                        );
                    }
					else if (element instanceof cc.Obj_MonsterMine)
                    {
                        cc.EffectMng.getInstance().displayMineNorDestroy(
                            element.getPosition()
                        );
                    }
					else {
						cc.EffectMng.getInstance().displayMonsterDesSingle(
							element.getPosition(),
							cc.DataMng.getInstance().targetCheck(element)
						);
					}

                    //
                    if (self.canPlayFlyToUFOAnimation())
                    {
                        cc.EffectMng.getInstance().displayMonsterFlyToUFO(element);
                    }
                    else if (self.canPlayRunningAnimation())
                    {
                        cc.ArmatureDataMng.getInstance().runningArmature(element);
                    }

                    //
                    var scoreValue = element instanceof cc.Obj_Bomb ?  Defines.SCORE_TYPE.SCORE_DES_BOMB.SCORE
                        : self.m_ScoreType.SCORE_EACH;

                    //
                    self.m_ScoreDatas.push(
                        {
                            score: scoreValue,
                            position: element.getPosition(),
                            objs: element,
                            withObjs: [],
                            color: element.getColor()
                        }
                    );
                }
                else
                {
                    if (element instanceof cc.Obj_Ice)
                    {
                        cc.EffectMng.getInstance().displayIceDestroy(
                            element.getPosition()
                        );
                    }
                    else if (element instanceof cc.Obj_Floor)
                    {
                        cc.AudioMng.getInstance().playFloorDestory();

                        cc.EffectMng.getInstance().displayFloorDestroy(
                            element.getPosition()
                        );
                    }
                    else if (element instanceof cc.Obj_Stone)
                    {
                        cc.EffectMng.getInstance().displayStoneDestroy(
                            element.getPosition()
                        );
                    }
                    else if (element instanceof cc.Obj_Lock)
                    {
                        //
                        cc.EffectMng.getInstance().displayLockDestroy(
                            element.getPosition()
                        );
                    }
                    else if (element instanceof cc.Obj_Bubble)
                    {
                        cc.EffectMng.getInstance().displayBubbleDestroy(
                            element.getPosition()
                        );
                    }
                    else if (element instanceof cc.Obj_BubbleCreator)
                    {
                        cc.EffectMng.getInstance().displayBubbleCreatorDestroy(
                            element.getPosition()
                        );
                    }
                    else if (element instanceof cc.Obj_Snake)
                    {
                        cc.EffectMng.getInstance().displayMonsterDesSingle(
                            element.getPosition()
                        );
                    }
                    else if (element instanceof cc.Obj_Haze)
                    {
                        cc.EffectMng.getInstance().displayHazeDestroy(
                            element.getPosition()
                        );
                    }

					
                    var scoreType = cc.ScoreVisitorBase.descriptionToScoreType(element.description());
                    self.m_ScoreDatas.push(
                        {
                            score: scoreType.SCORE,
                            position: element.getPosition(),
                            objs: element,
                            withObjs: [],
                            color: Defines.COLOR.NULL
                        }
                    );
                }
            }
        );

        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_MINELOTTERY){
            return this;
        }
        //
        var continuous = cc.DataMng.getInstance().getContinuousDestroyCount();
        this.m_ScoreDatas.forEach(
            function(scoreData)
            {
                scoreData.score *= continuous;
                if (scoreData.score > 0)
                {
                    cc.DataMng.getInstance().addScore(scoreData.score);

                    cc.EffectMng.getInstance().displayScore(
                        scoreData.score,
                        scoreData.position,
                        scoreData.color
                    );
                }
                else
                {
                    cc.log("+了一个小于0的分数?????");
                }
            }
        );

        return this;
    }

});

//工厂方法
cc.ScoreVisitorSingle.create = function(scoreType)
{
    return new cc.ScoreVisitorSingle(scoreType);
};

