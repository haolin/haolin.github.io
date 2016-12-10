
//======================================================================================================================
var MailOpt_FirstLogin = IMailHandler.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //
        this._safeValue = new safevar();
        this._safeValue.setValue({});
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(diamond, mint, horizontal, vertical)
    {
        //
        var data = this._safeValue.getValue();
        data["diamond"] = diamond || 0;
        data["mint"] = mint || 0;
        data["horizontal"] = horizontal || 0;
        data["vertical"] = vertical || 0;

        //
        this._safeValue.setValue(data);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        var data = this._safeValue.getValue();
        return "MailOpt_FirstLogin = "
            + ", diamond = " + data["diamond"]
            + ", mint = " + data["mint"]
            + ", horizontal = " + data["horizontal"]
            + ", vertical = " + data["vertical"];
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function(mailInfo, objectInfo)
    {
        /*cc.log("首次登录获得奖励 = " + this);

        //
        var data = this._safeValue.getValue();
        data["diamond"] = data["diamond"] || 0;
        data["mint"] = data["mint"] || 0;
        data["horizontal"] = data["horizontal"] || 0;
        data["vertical"] = data["vertical"] || 0;

        //
        cc.DataMng.getInstance().addMoney(data["diamond"]);
        cc.DataMng.getInstance().addHeart(data["mint"]);
        cc.DataMng.getInstance().buyItemByID(Defines.GameItems.ITEM_DIRECTION_EX.ID, data["horizontal"], 0);
        cc.DataMng.getInstance().buyItemByID(Defines.GameItems.ITEM_DIRECTION_EX.ID, data["vertical"], 0);

        //
        BIMng.getInstance().logFirstLoginBonus(data["diamond"], data["mint"], data["horizontal"], data["vertical"]);*/

        //服务器返回邮件内的物品
        ParseGameObjectInfo(objectInfo);

        //
        _MsgView_FirstLogin();

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseMailContent: function()
    {
        return Resource.ChineseTxt[113];
    }
});

MailOpt_FirstLogin.create = function(jsonMail)
{
    cc.log("\n");
    cc.log("\n");
    cc.log("\n");
    cc.log("收到了首次登录的邮件 MailOpt_FirstLogin jsonMail = " + jsonMail.toString());

    var createNew = new MailOpt_FirstLogin();

    //
    createNew.init(
        jsonMail.msg.diamond,
        jsonMail.msg.mint,
        jsonMail.msg.horizontal,
        jsonMail.msg.vertical
    );

    cc.log(" " + createNew);

    return createNew;
};
