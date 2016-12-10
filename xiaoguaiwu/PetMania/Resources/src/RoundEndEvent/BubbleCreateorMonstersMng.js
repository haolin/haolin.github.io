//======================================================================================================================
cc.BubbleCreateorMonstersMng = cc.A_RoundEndEvent.extend({

    m_IsValid: false,

    m_NeedStopCreate: false,

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this.m_IsValid = false;
        this.m_NeedStopCreate = false;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "BubbleCreateorMonstersMng";
    },

    //------------------------------------------------------------------------------------------------------------------
    roundEnd: function(gameLevel)
    {
        if (!this.m_IsValid)
        {
            return false;
        }

        cc.log("BubbleCreateorMonstersMng 行动逻辑");

        //
        var res = this.parse(gameLevel);

        //step1:
        var handledMonsters = this.handleFactoryCreateNew(res.bubbleCreators, gameLevel);

        if (this.m_NeedStopCreate)
        {
            this.m_NeedStopCreate = false;
            return false;
        }

        var handleRes = handledMonsters.length > 0;
        if (res.bubbleCreators.length > 0)
        {
            //step2:
            handleRes = this.handleBubbleMonstersMove(res.bubbleCreators, gameLevel, handledMonsters);
        }

        return handleRes;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleFactoryCreateNew: function(bubbleCreators, gameLevel)
    {
        var monsters = [];

        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        if (!curLevelData)
        {
            return monsters;
        }

        //
        var targetCount = curLevelData.TARGET_DES_BUBBLES;
        var curCount = /*cc.DataMng.getInstance().getRecordDestroy*/DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_BubbleCreator");

        //
        var needCreateCount = Math.min(targetCount - curCount,
            curLevelData.BUBBLES_MAX
        );

        needCreateCount -= bubbleCreators.length;
        if (needCreateCount <= 0)
        {
            return monsters;
        }

        var itr = gameLevel.getTable().createIterForMiddleObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var obj = itr.getCurrent();
            /*if (obj
                && !_IsAnyBubbleCoverMonster(obj)
                && (obj instanceof cc.Obj_Monster)
                && !(obj instanceof cc.Obj_MonsterColorful)
                )
            {
                monsters.push(obj);
            }*/

            if (!obj)
            {
                continue;
            }

            //
            var hasBubble = _IsAnyBubbleCoverMonster(obj);
            var isMonster = obj instanceof cc.Obj_Monster;
            var isMonsterColorful = obj instanceof cc.Obj_MonsterColorful;
            var isBomb = obj instanceof cc.Obj_Bomb;

            //泡泡怪物只找 怪物，但是不找彩球和炸弹
            if (!hasBubble && isMonster && !isMonsterColorful && !isBomb)
            {
                monsters.push(obj);
            }
        }

        Tools.shuffle(monsters);
        monsters = monsters.slice(0, needCreateCount);
        gameLevel.addCommand(cc.Cmd_CreateBubbleCreator.create(monsters));

        return monsters;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleBubbleMonstersMove: function(bubbleCreators, gameLevel, handledMonsters)
    {
        //
        var directions = Defines.DIRECTION.CROSS.concat();
        var _bubbleCreators = [];

        bubbleCreators.concat().forEach(
            function(_bubbleCreator)
            {
                var centerGrid = _bubbleCreator.getParentNode().getParentNode();
                if (!centerGrid)
                {
                    return;
                }

                var validObjs = [];

                directions.forEach(
                    function(dir)
                    {
                        var directionGrid = centerGrid.getGridByDirection(dir);
                        if (!directionGrid || !(directionGrid instanceof cc.NormalGrid) || directionGrid.isBlock())
                        {
                            return;
                        }

                        var obj = directionGrid.getMiddleObject();
                        /*if (!obj || _IsAnyBubbleCoverMonster(obj) || (obj instanceof cc.Obj_MonsterColorful))
                        {
                            return;
                        }*/

                        if (!obj)
                        {
                            return;
                        }

                        //
                        var hasBubble = _IsAnyBubbleCoverMonster(obj);
                        var isMonster = obj instanceof cc.Obj_Monster;
                        var isMonsterColorful = obj instanceof cc.Obj_MonsterColorful;
                        var isBomb = obj instanceof cc.Obj_Bomb;

                        //泡泡怪物只找 怪物，但是不找彩球和炸弹
                        if (hasBubble || !isMonster || isMonsterColorful || isBomb)
                        {
                            return;
                        }

                        //
                        if (handledMonsters.some(
                            function(x)
                            {
                                return x == obj
                            }
                        ))
                        {
                            return;
                        }

                        validObjs.push(obj);
                    }
                );

                if (validObjs.length > 0)
                {
                    var data = {
                        bubbleCreator: _bubbleCreator,
                        validObjs: validObjs
                    };

                    _bubbleCreators.push(data);
                }
            }
        );

        if (_bubbleCreators.length <= 0)
        {
            return false;
        }

        Tools.shuffle(_bubbleCreators);

        var first = _bubbleCreators.shift();
        gameLevel.addCommand(cc.Cmd_MoveBubbleCreator.create(first.bubbleCreator.getParentNode(), first.validObjs));

        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    parse: function(gamelevel)
    {
        //
        var bubbleCreators = [];
        var bubbles = [];

        var itr = gamelevel.getTable().createIterForMiddleObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var obj = itr.getCurrent();
            if (!obj || !(obj instanceof cc.Obj_Monster))
            {
                continue;
            }

            var hisChildren = obj.getChildrenNodes();
            hisChildren.forEach(
                function(child)
                {
                    if (child instanceof cc.Obj_BubbleCreator)
                    {
                        bubbleCreators.push(child);
                    }
                    else if (child instanceof cc.Obj_Bubble)
                    {
                        bubbles.push(child);
                    }
                }
            );
        }

        return {
            bubbleCreators: bubbleCreators,
            bubbles: bubbles
        };
    },

    //------------------------------------------------------------------------------------------------------------------
    //添加工厂
    init: function(/*gamelevel*/)
    {
        this.cleanUp();

        //
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();

        //
        this.m_IsValid = (curLevelData && (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_BUBBLE ||
            curLevelData.MODEL_MIX == Defines.TARGET_MODEL.MODEL_BUBBLE));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleVisitFinish: function(visitor)
    {
        var bubbleElements = [];
        visitor.m_Elements.forEach(
            function(element)
            {
                if (element instanceof cc.Obj_Bubble)
                {
                    bubbleElements.push(element);
                }
            }
        );

        if (bubbleElements.length > 0)
        {
            this.m_NeedStopCreate = true;
        }

        return this;
    }
});

//单件模式
cc.BubbleCreateorMonstersMng._instance = null;
cc.BubbleCreateorMonstersMng.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.BubbleCreateorMonstersMng();
        cc.RoundEndEventsManager.getInstance().addChildEventMng(this._instance);
    }

    return this._instance;
};



