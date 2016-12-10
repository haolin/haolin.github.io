
//======================================================================================================================
var FLOWER_LEVEL_DEFINE =
{
    SEED: 0,
    STEM: 1,
    FLOWER: 2,
    FRUIT: 3
};
//======================================================================================================================
var _ParseFlowerScoreType = function(flowerLevel)
{
    switch (flowerLevel)
    {
        case FLOWER_LEVEL_DEFINE.SEED:
            return Defines.SCORE_TYPE.SCORE_CREATE_BY_FLOWER_SEED;

        case FLOWER_LEVEL_DEFINE.STEM:
            return Defines.SCORE_TYPE.SCORE_CREATE_BY_FLOWER_STEM;

        case FLOWER_LEVEL_DEFINE.FLOWER:
            return Defines.SCORE_TYPE.SCORE_CREATE_BY_FLOWER_FLOWER;

        default:
            break;
    }

    return Defines.SCORE_TYPE.SCORE_CREATE_BY_FLOWER_SEED;
};
//======================================================================================================================
var _AddFlowerToFactorysPool = function()
{
    //
    var curState = _GetCurGameLevelState()/*cc.GameManager.getInstance().getCurState()*/;
    if (!curState || !(curState instanceof cc.State_GameLevel))
    {
        return this;
    }

    //
    var curLevelData = cc.DataMng.getInstance().getCurLevelData();
    if (!curLevelData || curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_FLOWER)
    {
        return this;
    }

    //
    var factories = _GetFactoryObjects();
    Tools.shuffle(factories);

    //
    factories.forEach(
        function(fac)
        {
            var randOk = Tools.rangeRandom(0, 100, true) < 15;

            if (!randOk || !fac.ifHasFlower())
            {
                return;
            }

            var newFlower = cc.Obj_Flower.create(FLOWER_LEVEL_DEFINE.SEED);
            if (newFlower)
            {
                newFlower.getRender().stopAnimateAction();
                fac.addToPool(newFlower);
            }
        }
    );

    return this;
};
//======================================================================================================================
var _GetCurGameLevelMaxFlowersLevel = function()
{
    var gameLevelData = cc.DataMng.getInstance().getCurLevelData();
    if (!gameLevelData || gameLevelData.MODEL != Defines.TARGET_MODEL.MODEL_FLOWER)
    {
        return FLOWER_LEVEL_DEFINE.FRUIT;
    }

    return gameLevelData.MAX_FLOWER_LEVEL;
};

//======================================================================================================================
cc.Obj_Flower = cc.Obj_Monster.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(flowerLevel)
    {
        this._super(Defines.COLOR.NULL);

        //
        this.m_FlowerLevel = flowerLevel;
        //this.m_DesRule = cc.DestroyRule_Flower.create(this);
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return cc.Obj_Flower.description() + "_" + this.getFlowerLevel();
    },

    //------------------------------------------------------------------------------------------------------------------
    destroy: function(desSrc, gameLevel, visitor)
    {
        if (!desSrc || !(desSrc instanceof cc.Obj_Flower))
        {
            return this;
        }

        if (visitor)
        {
            visitor.visit(this);
            /*cc.DataMng.getInstance().recordDestroy*/_DiaryDestroyNodeObject(this);
        }

        var parent = this.getParentNode();
        if (parent)
        {
            parent.beNotifiedDestroy(this, gameLevel, visitor);
        }

        gameLevel.disposal(this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    beNotifiedDestroy: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //拿消除规则
    getDestroyRule: function()
    {
        return cc.DestroyRule_Flower.create(this);/*this.m_DesRule*/
    },

    //------------------------------------------------------------------------------------------------------------------
    getFlowerLevel: function()
    {
        return this.m_FlowerLevel;
    },

    //------------------------------------------------------------------------------------------------------------------
    leaveFromFactory: function()
    {
        this._super();

        if (this.getRender())
        {
            this.getRender().startAnimateAction();
        }

        return this;
    }
});

cc.Obj_Flower.description = function()
{
    return "Obj_Flower";
};

cc.Obj_Flower.create = function(flowerLevel)
{
    var createNew = new cc.Obj_Flower(flowerLevel);
    if (createNew)
    {
        createNew.setRender(new MonsterFlowerRender(createNew));
    }

    return createNew;
};









