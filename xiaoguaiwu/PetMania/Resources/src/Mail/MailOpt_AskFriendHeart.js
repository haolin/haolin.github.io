
//======================================================================================================================
var MailHandler_FriendAskMeForHeart = IMailHandler.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(recvrid/*, mailInfo*/)
    {
        this._super(/*mailInfo*/);
        this.recvrid = recvrid;

        //
        //cc.log("" + this + " ctor");
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "MailHandler_FriendAskMeForHeart";
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
        };

        var json = {};
        json[MailDefine.type] = MailDefine.type_heart;
        cc.NodeSelf.getInstance().sendMail(/*this.getMailInfo().getMyJson().sid*/
            this.recvrid,
            JSON.stringify(json),
            callBack);
        cc.GUIAchievement.getInstance().addAchievementScore(Achieve.AchieveType.TYPE_ANSWER_HEART.toString(),1);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseMailContent: function(/*mailInfo*/)
    {
        //cc.log("============================================================================================");

        var friendInfo = FriendsMng.getInstance().getFriendInfoByRoleId(this.recvrid);
        if (friendInfo)
        {
            return friendInfo.getName() + Resource.ChineseTxt[85];
        }

        return Resource.ChineseTxt["mail_content_6"];

        //return IMailHandler.parseFriendName(mailInfo)/*this.getFriendNameFromMail(mailInfo)*/ + Resource.ChineseTxt["mail_content_6"];
    }
});

MailHandler_FriendAskMeForHeart.create = function(recvrid/*, mailInfo*/)
{
    return new MailHandler_FriendAskMeForHeart(recvrid/*, mailInfo*/);
};

//======================================================================================================================
var MailHandler_FriendGiveMeHeart = IMailHandler.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(recvrid)
    {
        this._super();
        this.recvrid = recvrid;
        //cc.log("MailHandler_FriendGiveMeHeart");
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "MailHandler_FriendGiveMeHeart";
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function(mailInfo, objectInfo)
    {
        //服务器返回邮件内的物品
        ParseGameObjectInfo(objectInfo);

        //加薄荷糖
        //cc.DataMng.getInstance().addHeart(1);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseMailContent: function(/*mailInfo*/)
    {
        var friendInfo = FriendsMng.getInstance().getFriendInfoByRoleId(this.recvrid);
        if (friendInfo)
        {
            return friendInfo.getName() + Resource.ChineseTxt["mail_content_3"];
        }

        return Resource.ChineseTxt["mail_content_3"];

        //return IMailHandler.parseFriendName(mailInfo)/*this.getFriendNameFromMail(mailInfo)*/ + Resource.ChineseTxt["mail_content_3"];
    }
});

MailHandler_FriendGiveMeHeart.create = function(recvrid)
{
    return new MailHandler_FriendGiveMeHeart(recvrid);
};

