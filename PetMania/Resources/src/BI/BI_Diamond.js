
//======================================================================================================================
var BI_Diamond = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logDiamondCost: function(diamond, type, typeCount)
    {
        //
        var config = {};

        //花了多少钻石
        config["num"] = diamond;

        //消费的东西的编号
        config["type"] = type;

        //消费的东西的数量
        //config["typeCount"] = typeCount;

        BIMng.getInstance().logEventEx("DiamondCost", config, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logDiamondCost_NewZone: function(diamond)
    {
        this.logDiamondCost(diamond, DIAMOND_COST.UNLOCK_NEW_STAR, 1);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logDiamondCost_ItemContainer: function(diamond)
    {
        this.logDiamondCost(diamond, DIAMOND_COST.UNLOCK_ITEM_CONTAINER, 1);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logDiamondCost_GameContinue: function(diamond)
    {
        this.logDiamondCost(diamond, DIAMOND_COST.GAME_CONTINUE, 1);
        return this;
    },

    //==================================================================================================================
    logDiamondIncome: function(count, from)
    {
        //
        var config = {};

        //获取了多少钻石
        config["num"] = count;

        //钻石来源编号
        config["type"] = from;

        BIMng.getInstance().logEventEx("DiamondAcquire", config, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logDiamondIncome_IAP: function(shopData)
    {
        var count = shopData.COUNT.get();
        var giftCount = shopData.GIFT_COUNT.get();
		var discount = parseInt(shopData.DISCOUNT * count / 100);
        var sfGift = shopData.SF_GIFT ? shopData.SF_GIFT.get() : 0;

        this.logDiamondIncome(count + giftCount + sfGift + discount, DIAMOND_INCOME.IAP);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logDiamondIncome_LevelWin: function(count)
    {
        this.logDiamondIncome(count, DIAMOND_INCOME.LEVEL_WIN);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logDiamondIncome_Share: function(count)
    {
        this.logDiamondIncome(count, DIAMOND_INCOME.SHARE);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logDiamondIncome_Guide: function(count)
    {
        this.logDiamondIncome(count, DIAMOND_INCOME.GUIDE);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logDiamondIncome_FirstLogin: function(count)
    {
        //首次登陆奖励需要判断
        if (count > 0)
        {
            this.logDiamondIncome(count, DIAMOND_INCOME.FIRST_LOGIN);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logDiamondIncome_SysBonus: function(count)
    {
        //系统奖励需要判断
        if (count > 0)
        {
            this.logDiamondIncome(count, DIAMOND_INCOME.SYS_BONUS);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logDiamondIncome_CDKey: function(count)
    {
        this.logDiamondIncome(count, DIAMOND_INCOME.CD_KEY);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logDiamondIncome_BIKey: function(count)
    {
        this.logDiamondIncome(count, DIAMOND_INCOME.BI_KEY);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logDiamondIncome_PhoneCard: function(count)
    {
        this.logDiamondIncome(count, DIAMOND_INCOME.PHONE_CARD);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logDiamondIncome_NewPack: function(count)
    {
        this.logDiamondIncome(count, DIAMOND_INCOME.NEW_PACK);
        return this;
    }

});

//======================================================================================================================
BI_Diamond._instance = null;
BI_Diamond.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new BI_Diamond();
        this._instance.init();
    }

    return this._instance;
};