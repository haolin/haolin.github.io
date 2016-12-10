
//======================================================================================================================
var BI_Item = cc.Class.extend({

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
    logItemCost: function(itemID, buyForUse)
    {
        var shopData = GUI.getShopDataWithItemID(itemID);
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();

        if (!shopData || !curLevelData)
        {
            return this;
        }

        //
        var config = {};

        //道具编号
        config["type"] = shopData.ID;

        //当前所在关卡
        config["CurLevel"] = curLevelData.NAME;

        //用之前是否是先买的
        config["BuyForUse"] = buyForUse;

        BIMng.getInstance().logEventEx("ItemCost", config, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logItemIncome: function(shopID, count, from)
    {
        //
        var config = {};

        //道具编号
        config["item"] = shopID;

        //多少个道具
        config["num"] = count;

        //道具来源的编号
        config["type"] = from;

        BIMng.getInstance().logEventEx("ItemIncome", config, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logItemIncome_Diamond: function(shopID, count)
    {
        this.logItemIncome(shopID, count, ITEM_INCOME.DIAMOND);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logItemIncome_NewPack: function()
    {
        this.logItemIncome(GUI.SHOP_DATA.SHOP_DATA_ITEM[0].ID, 1, ITEM_INCOME.NEW_PACK);
        this.logItemIncome(GUI.SHOP_DATA.SHOP_DATA_ITEM[1].ID, 1, ITEM_INCOME.NEW_PACK);
        this.logItemIncome(GUI.SHOP_DATA.SHOP_DATA_ITEM[2].ID, 1, ITEM_INCOME.NEW_PACK);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logItemIncome_SuperPack: function()
    {
        var self = this;
        GUI.SHOP_DATA.SHOP_DATA_ITEM.forEach(
            function(shopData)
            {
                self.logItemIncome(shopData.ID, 5, ITEM_INCOME.SUPER_PACK);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logItemIncome_WorldPack: function()
    {
        var self = this;
        GUI.SHOP_DATA.SHOP_DATA_ITEM.forEach(
            function(shopData)
            {
                self.logItemIncome(shopData.ID, 25, ITEM_INCOME.WORLD_PACK);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logItemIncome_DailyBonus: function(itemID, count)
    {
        var shopData = GUI.getShopDataWithItemID(itemID);
        this.logItemIncome(shopData.ID, count, ITEM_INCOME.DAILY_BONUS);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logItemIncome_BIKey: function(shopData)
    {
        this.logItemIncome(shopData.ID, shopData.COUNT.get(), ITEM_INCOME.BI_KEY);
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
    /*logItemIncome_FirstLogin: function(count)
    {
        return this;
    },*/

    //------------------------------------------------------------------------------------------------------------------
    /*logItemIncome_SysBonus: function(count)
    {
        return this;
    },*/

    //------------------------------------------------------------------------------------------------------------------
});

//======================================================================================================================
BI_Item._instance = null;
BI_Item.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new BI_Item();
        this._instance.init();
    }

    return this._instance;
};