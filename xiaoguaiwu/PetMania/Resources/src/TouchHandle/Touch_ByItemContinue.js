
var _TouchItemHandlerDiryMap = {};

var _TouchItemHandler = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function()
    {
        return this;
    }
});

//======================================================================================================================
var _TouchItemHandler_CreateSpec = _TouchItemHandler.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function (srcPos, count, createFunc, dirtyMap, useItemFunc)
    {
        this._super();

        this.m_StartPos = srcPos;
        this.m_Count = count;
        this.m_CreateFunc = createFunc;
        this.m_DirtyMap = dirtyMap || {};
        this.m_UseItemFunc = useItemFunc;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super();

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

            //
            if (_CanUseItemToMonster(middleObj)
                && !_TouchItemHandlerDiryMap[middleObj.getObjectID()]
                && !middleObj.getParentNode().isBlock()
                )
            {
                monsters.push(middleObj);
            }
        }

        if (monsters.length <= 0)
        {
		    var curTouchItemNum = cc.DataMng.getInstance().getCurTouchItemNum() - 1;
            cc.DataMng.getInstance().setCurTouchItemNum(curTouchItemNum);
            cc.log("self.finish curTouchItemNum = " + curTouchItemNum);
            this.finish();
            return this;
        }

        //道具使用成功
        Tools.shuffle(monsters);
        monsters = monsters.slice(0, this.m_Count);

        //
        var self = this;
        var finishCount = 0;

        //
        var callBack = function(tapObj)
        {
            var gridParent = tapObj.getParentNode();
            gameLevel.disposal(tapObj);

            var createNew = null;
            if (self.m_CreateFunc)
            {
                createNew = self.m_CreateFunc(tapObj);
            }

            if (gridParent && createNew)
            {
                gridParent.addNode(createNew);
                createNew.updateNodePosition();
                createNew.renderNode();
            }

            ++finishCount;
            if(finishCount >= monsters.length)
            {

                if (cc.Guide.round_12 == 0) //修改道具滑动的BUG
                {
                    gameLevel.addCommand(cc.Cmd_EveryDestroy.create([]));
                    gameLevel.addCommand(cc.Cmd_EveryMoveNext.create([]));
                    _ChangeGameLevelStateTo(cc.State_GameLevel.getInstance(), "841");
                }


                var curTouchItemNum = cc.DataMng.getInstance().getCurTouchItemNum() - 1;
                cc.DataMng.getInstance().setCurTouchItemNum(curTouchItemNum);
                cc.log("self.finish curTouchItemNum = " + curTouchItemNum);
                self.finish();
            }
        };

        //
        if (this.m_UseItemFunc && !this.m_UseItemFunc())
        {
            this.finish();
            return this;
        }

        //
        monsters.forEach(
            function(mons)
            {
                //标记!!!!
                _TouchItemHandlerDiryMap[mons.getObjectID()] = true;

                //
                var endPoint = mons.getSprite().getPosition();
                cc.EffectMng.getInstance().displayTailerBezierPath(
                    self.m_StartPos,
                    endPoint,
                    callBack,
                    mons);
            }
        );

        return this;
    }
});

_TouchItemHandler_CreateSpec.createDirection = function(srcPos, count, dirtyMap)
{
    return new _TouchItemHandler_CreateSpec(
        srcPos,
        count,
        function(monster)
        {
            /*var hvDirection = Defines.DIRECTION.parseHorizontalOrVertical(
                Tools.randomEx(100) < 50 ? Defines.DIRECTION.TOP : Defines.DIRECTION.RIGHT
            );*/

            var hvDirection = _RandHVDirection();
            return monster.createMonsterDirection(hvDirection);
        },
        dirtyMap,
        function()
        {
            return cc.DataMng.getInstance().useItemById(Defines.GameItems.ITEM_DIRECTION_EX.ID);
        }
    );
};

_TouchItemHandler_CreateSpec.createColorful = function(srcPos, count, dirtyMap)
{
    return new _TouchItemHandler_CreateSpec(
        srcPos,
        count,
        function(monster)
        {
            return cc.Obj_MonsterColorful.create();
        },
        dirtyMap,
        function()
        {
            return cc.DataMng.getInstance().useItemById(Defines.GameItems.ITEM_COLORFUL_EX.ID);
        }
    );
};

_TouchItemHandler_CreateSpec.createWrap = function(srcPos, count, dirtyMap)
{
    return new _TouchItemHandler_CreateSpec(
        srcPos,
        count,
        function(monster)
        {
            return monster.createMonsterWrap();
        },
        dirtyMap,
        function()
        {
            return cc.DataMng.getInstance().useItemById(Defines.GameItems.ITEM_WARP_EX.ID);
        }
    );
};

//======================================================================================================================
cc.Touch_ByItemContinue = cc.Touch_ByItem.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this.m_MyHandlers = [];
        _TouchItemHandlerDiryMap = {};
        this.m_DelayTimer = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUpDirty: function()
    {
        _TouchItemHandlerDiryMap = {};
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createHandler: function(itemFlag, srcPos)
    {
        var newHandler = null;

        switch (itemFlag)
        {
        case Defines.GameItems.ITEM_DIRECTION_EX.ID:
            {
                newHandler = _TouchItemHandler_CreateSpec.createDirection(srcPos, 3, this.m_DirtyMap);
            }
            break;

        case Defines.GameItems.ITEM_COLORFUL_EX.ID:
            {
                newHandler = _TouchItemHandler_CreateSpec.createColorful(srcPos, 1, this.m_DirtyMap);
            }
            break;

        case Defines.GameItems.ITEM_WARP_EX.ID:
            {
                newHandler = _TouchItemHandler_CreateSpec.createWrap(srcPos, 2, this.m_DirtyMap);
            }
            break;

        default:
            break;
        }

        return newHandler;
    },

    //------------------------------------------------------------------------------------------------------------------
    addHandler: function(itemFlag, srcPos)
    {
        var newHandler = this.createHandler(itemFlag, srcPos);
        if (!newHandler)
        {
            return null;
        }

        //
        this.m_MyHandlers.push(newHandler);

        var self = this;
        newHandler.finish = function()
        {
            for (var index = 0; index < self.m_MyHandlers.length; ++index)
            {
                if (self.m_MyHandlers[index] == newHandler)
                {
                    self.m_MyHandlers.splice(index, 1);
                    break;
                }
            }
        };

        return newHandler;
    },

    //------------------------------------------------------------------------------------------------------------------
    useAgain: function(itemFlag, srcPos, gameLevel)
    {
        var curTouchItemNum = cc.DataMng.getInstance().getCurTouchItemNum() + 1;
        cc.DataMng.getInstance().setCurTouchItemNum(curTouchItemNum);

        var newHandler = this.addHandler(itemFlag, srcPos);
        if (newHandler)
        {
            newHandler.start(gameLevel);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return cc.Touch_ByItemContinue.description();
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function (gameLevel)
    {
        //
        this.cleanUpDirty();

        //
        this.m_MyHandlers.forEach(
            function (a_handler)
            {
                a_handler.start(gameLevel);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    swallowMoveTouch: function ()
    {
        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    endTransposition: function(gameLevel)
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    update: function(state, time)
    {
        //cc.log("cc.Touch_ByItemContinue update");

        if (this.m_MyHandlers.length <= 0)
        {
            this.m_DelayTimer += time;
            if (this.m_DelayTimer >= Defines.FPS * 5)
            {
                this.m_DelayTimer = 0;

                this.m_IsFinish = true;
                this.forcedInterrupt();
                this.cleanUpDirty();
            }
        }

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

//
cc.Touch_ByItemContinue.description = function()
{
    return "Touch_ByItemContinue";
};

//
cc.Touch_ByItemContinue.create = function(itemFlag, srcPos)
{
    var curTouchItemNum = cc.DataMng.getInstance().getCurTouchItemNum() + 1;
    cc.DataMng.getInstance().setCurTouchItemNum(curTouchItemNum);
    cc.log("cc.Touch_ByItemContinue.creat curTouchItemNum = " + curTouchItemNum);
    var createNew = new cc.Touch_ByItemContinue();
    if (createNew)
    {
        createNew.addHandler(itemFlag, srcPos);
    }

    return createNew;
};
