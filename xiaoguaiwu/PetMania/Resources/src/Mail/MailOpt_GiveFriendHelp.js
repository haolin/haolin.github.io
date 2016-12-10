
//======================================================================================================================
var MailHandler_FriendAskMeForHelp = IMailHandler.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(recvrid)
    {
        this._super();
        this.recvrid = recvrid;
        //cc.log("MailHandler_FriendAskMeForHelp = " + recvrid);
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "MailHandler_FriendAskMeForHelp";
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function(/*mailInfo, objectInfo*/)
    {
        var callBack = function(result)
        {
            if (result)
            {

            }
            else
            {

            }

            //
            BIMng.getBISocial().logSendHelpToFriend(result);
        };

        var json = {};
        json[MailDefine.type] = MailDefine.type_help;
        cc.NodeSelf.getInstance().sendMail(this.recvrid, JSON.stringify(json), callBack);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseMailContent: function(/*mailInfo*/)
    {
        var friendInfo = FriendsMng.getInstance().getFriendInfoByRoleId(this.recvrid);
        if (friendInfo)
        {
            return friendInfo.getName() + Resource.ChineseTxt["mail_content_9"];
        }

        return Resource.ChineseTxt["mail_content_9"];

        /*return IMailHandler.parseFriendName(mailInfo)*//*this.getFriendNameFromMail(mailInfo)*//* + Resource.ChineseTxt[83];*/
    }
});

MailHandler_FriendAskMeForHelp.create = function(recvrid)
{
    return new MailHandler_FriendAskMeForHelp(recvrid);
};

//======================================================================================================================
var MailHandler_FriendGiveMeHelp = IMailHandler.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(recvrid)
    {
        this._super();
        this.recvrid = recvrid;
        cc.log("MailHandler_FriendGiveMeHelp = " + recvrid);
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "MailHandler_FriendGiveMeHelp";
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function(/*mailInfo, objectInfo*/)
    {
        //
        BIMng.getBISocial().logReceiveHelpFromFriend();
        cc.log("cc.DataMng.getInstance().setFriendCokeHelp(this.recvrid); = " + this.recvrid);
        //
        cc.DataMng.getInstance().setFriendCokeHelp(this.recvrid);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseMailContent: function(/*mailInfo*/)
    {
        var friendInfo = FriendsMng.getInstance().getFriendInfoByRoleId(this.recvrid);
        if (friendInfo)
        {
            return friendInfo.getName() + Resource.ChineseTxt[84];
        }

        return Resource.ChineseTxt["mail_content_0"] + Resource.ChineseTxt[84];


        //return IMailHandler.parseFriendName(mailInfo)/*this.getFriendNameFromMail(mailInfo)*/ + Resource.ChineseTxt[84];
    }
});

MailHandler_FriendGiveMeHelp.create = function(recvrid)
{
    return new MailHandler_FriendGiveMeHelp(recvrid);
};

