
//======================================================================================================================
var IMailHandler = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseMailName: function()
    {
        return "new Mail";
    },

    //------------------------------------------------------------------------------------------------------------------
    parseMailContent: function()
    {
        return "";
    },

    //------------------------------------------------------------------------------------------------------------------
    immeHandle: function()
    {
        return false;
    }

});

//======================================================================================================================
/**
 * 按统一的物品列表增加物品,注:目前只用作邮件收取时服务器删除邮件并累加物品在服务器的记录,客户端按照返回的物品列表累加到本地,不上传服务器!
 * @param {JSON} info 物品列表JSON 详见 NodeSelf collectMail
 */
var ParseGameObjectInfo = function(info)
{
    if (!info)
    {
        return;
    }

    //钻石
    if (info && info["diamond"] > 0)
    {
        cc.DataMng.getInstance().addMoneyLocal(info["diamond"]);
    }

    //薄荷糖
    if (info && info["candy"] > 0)
    {
        cc.DataMng.getInstance().addHeartLocal(info["candy"]);
    }

    //薄荷糖上线
    if (info && info["candy_urv"] > 0)
    {
        cc.DataMng.getInstance().addHeartRecoverMaxLocal(info["candy_urv"]);
    }

    //游戏继续
    if (info && info["ConGame"] > 0)
    {
        cc.DataMng.getInstance().addGameContinueCountLocal(info["ConGame"]);
    }

    //道具
    var itemFunc = function(itemName)
    {
        var itemData = Defines.GameItems[itemName];
        var itemKey = itemData.ENG_NAME;
        if (info[itemKey] && info[itemKey] > 0)
        {
            cc.DataMng.getInstance().addItemLocal(itemData.ID, info[itemKey]);
        }
    };

    Object.keys(Defines.GameItems).forEach(itemFunc);
};