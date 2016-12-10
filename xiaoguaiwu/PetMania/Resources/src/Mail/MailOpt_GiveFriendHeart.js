
//======================================================================================================================
var MailHandler_GiveFriendHeart = IMailHandler.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(recvrid)
    {
        this._super();
        this.recvrid = recvrid;
        //cc.log("MailHandler_GiveFriendHeart");
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "MailHandler_GiveFriendHeart";
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function(mailInfo, objectInfo)
    {
        //服务器返回邮件内的物品
        ParseGameObjectInfo(objectInfo);

        //
        BIMng.getBISocial().logReceiveHeartFromFriend();

        //
        //cc.DataMng.getInstance().addHeart(1);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseMailContent: function(/*mailInfo*/)
    {
        var friendInfo = FriendsMng.getInstance().getFriendInfoByRoleId(this.recvrid);
        if (friendInfo)
        {
            return friendInfo.getName() + Resource.ChineseTxt[82];
        }

        return Resource.ChineseTxt["mail_content_0"] + Resource.ChineseTxt[82];

        //return IMailHandler.parseFriendName(mailInfo)/*this.getFriendNameFromMail(mailInfo)*/ + Resource.ChineseTxt[82];
    }
});

MailHandler_GiveFriendHeart.create = function(recvrid)
{
    return new MailHandler_GiveFriendHeart(recvrid);
};




