
//======================================================================================================================
var MailOpt_GenuineBonus = IMailHandler.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        this._baseValue = new safevar();
        this._itemValue = new safevar();

        this._baseValue.setValue({});
        this._itemValue.setValue({});

        this._description = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(base, items, desc)
    {
        //
        var baseData = this._baseValue.getValue();
        baseData["diamond"] = base["diamond"] || 0;
        baseData["candy"] = base["candy"] || 0;
        baseData["candy_urv"] = base["candy_urv"] || 0;
        this._baseValue.setValue(baseData);

        //
        if (items){
            var itemData = this._itemValue.getValue();
            for (var prop in Defines.GameItems)
            {
                if (Defines.GameItems.hasOwnProperty(prop))
                {
                    var itemID = Defines.GameItems[prop].ID;
                    var itemName = Defines.GameItems[prop].NAME;
                    itemData[itemID] = items[itemName] || 0;
                }
            }

            this._itemValue.setValue(itemData);
        }

        //
        this._description = desc || "";
        if(this._description == "desp_100001")
        {
            this._description = "친구를 초대하고 보상을 받았어요";
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        var baseData = this._baseValue.getValue();
        var itemData = this._itemValue.getValue();
        return "MailOpt_GenuineBonus = "
            + "\n" + JSON.stringify(baseData)
            + "\n" + JSON.stringify(itemData);
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function(mailInfo, objectInfo)
    {
        //服务器返回邮件内的物品
        ParseGameObjectInfo(objectInfo);

        /*cc.log("购买正版奖励 = " + this);

        //
        var baseData = this._baseValue.getValue();
        baseData["diamond"] = baseData["diamond"] || 0;
        baseData["candy"] = baseData["candy"] || 0;
        baseData["candy_urv"] = baseData["candy_urv"] || 0;

        cc.DataMng.getInstance().addMoney(baseData["diamond"], MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_SYS); //系统奖励
        cc.DataMng.getInstance().addHeart(baseData["candy"]);

        //
        cc.DataMng.getInstance().addHeartRecoverMax(baseData["candy_urv"]);

        //
        var itemData = this._itemValue.getValue();
        for (var prop in itemData)
        {
            if (itemData.hasOwnProperty(prop))
            {
                var itemID = parseInt(prop);
                var itemNum = itemData[prop] || 0;
                cc.DataMng.getInstance().buyItemByID(itemID, itemNum, 0);
            }
        }

        //
//        var msgStr = this._description + Resource.ChineseTxt["msg_3"];
//        var runningScene = cc.Director.getInstance().getRunningScene();
//        cc.GUIMsgView.getInstance().openWindow(runningScene, msgStr);

        //
        BIMng.getInstance().logSysBonus(baseData, itemData);*/

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseMailContent: function()
    {
        return this._description;
    }
});

MailOpt_GenuineBonus.create = function(jsonMail)
{
    cc.log("MailOpt_GenuineBonus jsonMail = " + JSON.stringify(jsonMail));

    var createNew = new MailOpt_GenuineBonus();
    createNew.init(
        jsonMail.msg.base,
        jsonMail.msg.item,
        jsonMail.msg.brief
    );

    cc.log(" " + createNew);
    return createNew;
};
