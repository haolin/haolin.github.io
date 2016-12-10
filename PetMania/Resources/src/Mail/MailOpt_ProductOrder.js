
//======================================================================================================================
var MailHandler_ProductOrder = IMailHandler.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(productid)
    {
        this._super();

        //
        this.productid = new safevar();
        this.productid.setValue(productid);

        //cc.log("MailHandler_ProductOrder = " + productid);
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        var id = this.getProductId();
        var shopData = _GetShopDataByID(id);
        return shopData ? shopData.NAME : ("(" + id + ")");
    },

    //------------------------------------------------------------------------------------------------------------------
    getProductId: function()
    {
        return this.productid.getValue();
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function()
    {
        parsePayInfoToUser(this.getProductId());
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseMailContent: function(/*mailInfo*/)
    {
        return Resource.ChineseTxt[100] + this.toString();
    },

    //------------------------------------------------------------------------------------------------------------------
    immeHandle: function()
    {
        var needHandle = this.getProductId() == GUI.SHOP_DATA.SHOP_DATA_MOVES[0].ID
            || this.getProductId() == GUI.SHOP_DATA.SHOP_DATA_TIME[0].ID;

        if (needHandle)
        {
            parsePayInfoToUser(this.getProductId());
        }

        //
        return  needHandle;
    }
});

MailHandler_ProductOrder.create = function(productid)
{
    //cc.log("MailHandler_ProductOrder.create = " + productid);
    return new MailHandler_ProductOrder(parseInt(productid));
};




