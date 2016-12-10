
//======================================================================================================================
var BI_Social = cc.Class.extend({

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
    logLogin: function(result)
    {
        var config = {};
        config["Result"] = result;
        config["JoyFlag"] = cc.DataMng.getInstance().getCurJoyFlag();
        BIMng.getInstance().logEventEx("Login", config, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //玩家分享的位置
    logShare: function(place)
    {
        if (!place)
        {
            return this;
        }

        var config = {};

        //
        config["SharePlace"] = place;

        //
        BIMng.getInstance().logEventEx("Share", config, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //玩家收到的体力数
    logReceiveHeartFromFriend: function()
    {
        var config = {};

        config["Flag"] = "1";

        //
        BIMng.getInstance().logEventEx("ReceiveHeart", config, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //玩家发送体力求助的次数
    logAskFriendForHeart: function(result)
    {
        var config = {};

        config["Result"] = result;

        //
        BIMng.getInstance().logEventEx("AskHeart", config, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //玩家送出体力的次数
    logSendHeartToFriend: function(result)
    {
        var config = {};

        config["Result"] = result;

        //
        BIMng.getInstance().logEventEx("SendHeart", config, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //玩家为好友提供打开星球援助的次数
    logSendHelpToFriend: function(result)
    {
        var config = {};

        config["Result"] = result;

        //
        BIMng.getInstance().logEventEx("SendHelp", config, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //玩家向好友请求打开星球援助的次数
    logAskFriendForHelp: function(result)
    {
        var config = {};

        config["Result"] = result;

        //
        BIMng.getInstance().logEventEx("AskHelp", config, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //玩家收到好友打开星球援助的次数
    logReceiveHelpFromFriend: function()
    {
        var config = {};

        config["Flag"] = "1";

        //
        BIMng.getInstance().logEventEx("ReceiveHelp", config, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //玩家邀请的次数（限定渠道中有）
    logInviteFriend: function(channel, friendName, result)
    {
        var config = {};

        //
        config["Channel"] = channel;

        //
        config["Name"] = friendName;

        //
        config["Result"] = result;

        //
        BIMng.getInstance().logEventEx("InviteFriend", config, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //玩家的好友数
    logFriendsCount: function(count)
    {
        var config = {};

        config["Count"] = count;

        //
        BIMng.getInstance().logEventEx("FriendsCount", config, true);

        return this;
    }

});

//======================================================================================================================
BI_Social._instance = null;
BI_Social.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new BI_Social();
        this._instance.init();
    }

    return this._instance;
};