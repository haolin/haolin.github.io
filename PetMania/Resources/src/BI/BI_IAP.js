
//======================================================================================================================
var BI_IAP = cc.Class.extend({

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
    logIAP: function(shopData, amount)
    {
        var price = shopData.TOTAL_PRICE.get();

        //快用版充值卡处理
        if (amount && parseInt(amount) > 0)
        {
            if (parseInt(amount) > price)
            {
                price = parseInt(amount);
            }
        }

        //
        var config = {};

        //花的钱
        config["num"] = price;

        //消费的东西的ID
        config["type"] = shopData.ID;

        BIMng.getInstance().logEventEx("IapCost", config, true);

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

//======================================================================================================================
BI_IAP._instance = null;
BI_IAP.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new BI_IAP();
        this._instance.init();
    }

    return this._instance;
};