/**
 * Created by hong.zhang on 2014/7/18.
 */

var KakaoJoyInterface = cc.Class.extend({

    ctor: function()
    {

    },

    init: function()
    {

    },

    sendMessageForAskHelp: function(nId, sucFunc, failFunc)
    {
        joysdk = opJoy.OpJoy();
        this.sendTemplateMessage(KakaoJoyInterface.MessageType.NORMAL,
                                    nId,
                                    KakaoJoyInterface.TempleteID.ASK_HELP,
                                    "","", sucFunc, failFunc);
    },

    sendMessageForAskHeart: function(nId, sucFunc, failFunc)
    {
//        cc.log("kakaoTest: " + kakaoTest);
        joysdk = opJoy.OpJoy();
        this.sendTemplateMessage(KakaoJoyInterface.MessageType.NORMAL,
                                    nId,
                                    KakaoJoyInterface.TempleteID.ASK_HEART,
                                    "","", sucFunc, failFunc);
    },

    sendMessageForSendHeart: function(nId, sucFunc, failFunc)
    {
        joysdk = opJoy.OpJoy();
        this.sendTemplateMessage(KakaoJoyInterface.MessageType.NORMAL,
                                    nId,
                                    KakaoJoyInterface.TempleteID.SHOP_GIFT,
                                    "","", sucFunc, failFunc);
    },

    sendMessageForShareScore: function(nId, sender_nick, score, sucFunc, failFunc)
    {
        joysdk = opJoy.OpJoy();

        var tInfo = {
            sender_nick: sender_nick,
            score: score.toString()
        };

        this.sendTemplateMessage(KakaoJoyInterface.MessageType.NORMAL,
                                    nId,
                                    KakaoJoyInterface.TempleteID.SHARE_SCORE,
                                    "",
                                    JSON.stringify(tInfo), sucFunc, failFunc);
    },

    sendMessageForInviteFriends:function(nId, sucFunc, failFunc)
    {
        joysdk = opJoy.OpJoy();
        this.sendTemplateMessage(KakaoJoyInterface.MessageType.INVITE,
                                    nId,
                                    KakaoJoyInterface.TempleteID.INVITE_FRIENDS,
                                    "","", sucFunc, failFunc);
    },

    sendMessageForVenusGift:function(nId, sender_name, sucFunc, failFunc)
    {
        var tInfo = {
            sender_name: sender_name
        }
        joysdk = opJoy.OpJoy();
        this.sendTemplateMessage(KakaoJoyInterface.MessageType.NORMAL,
            nId,
            KakaoJoyInterface.TempleteID.VENUS_GIFT,
            "",JSON.stringify(tInfo), sucFunc, failFunc);
    },

    sendMessageForEarthGift:function(nId, sender_name, sucFunc, failFunc)
    {
        var tInfo = {
            sender_name: sender_name
        }
        joysdk = opJoy.OpJoy();
        this.sendTemplateMessage(KakaoJoyInterface.MessageType.NORMAL,
            nId,
            KakaoJoyInterface.TempleteID.EARTH_GIFT,
            "",JSON.stringify(tInfo), sucFunc, failFunc);
    },

    sendMessageForMars_Gift:function(nId, sender_name, sucFunc, failFunc)
    {
        var tInfo = {
            sender_name: sender_name
        }
        joysdk = opJoy.OpJoy();
        this.sendTemplateMessage(KakaoJoyInterface.MessageType.NORMAL,
            nId,
            KakaoJoyInterface.TempleteID.MARS_GIFT,
            "",JSON.stringify(tInfo), sucFunc, failFunc);
    },

    sendTemplateMessage :function( messageType, id, templeteId, excuteurl, info, sucFunc, failFunc)
    {
        cc.log("KakaoJoyInterface sendTemplateMessage");
        var friendInfo = FriendsMng.getInstance().getFriendInfoByRoleId(id);
        var strBlockMessage = Resource.KoreanTxt["message_blocked"];

        if(!friendInfo)
        {
            cc.log("这个好友不在游戏中");
            friendInfo = FriendsMng.getInstance().getOtherFriendInfoByRoleId(id);
            strBlockMessage = Resource.KoreanTxt["message_block_other"];
//            return;
        }

        if(!friendInfo)
        {
            cc.log("没有这个好友的信息啊");
            return;
        }

        cc.log("getMessageBlocked: " + friendInfo.getMessageBlocked());
        if(friendInfo.getMessageBlocked())
        {
            cc.GUIMsgView.getInstance().openWindow(cc.Director.getInstance().getRunningScene(), strBlockMessage);
            cc.log("对方已经不想接受消息了");
            return;
        }

        var self = this;
        _sendTemplateMessageCallback = function(data)
        {
            cc.log("_sendTemplateMessageCallback: " + data);
            var jsonObj = JSON.parse(data);
            var status = jsonObj.status;
            var nStatus = parseInt(status);

            if(0 == nStatus)
            {
                if(sucFunc)
                {
                    sucFunc(nStatus);
                }
            }
            else
            {
                if(failFunc)
                {
                    failFunc(nStatus);
                }
            }
        };

        joy.interface.getInstance().registCallBack("sendTemplateMessage",_sendTemplateMessageCallback);

        joysdk = opJoy.OpJoy();
        joysdk.sendTemplateMessage(messageType, id, templeteId, excuteurl, info);
    },



    showMessageBlockDialog: function()
    {
        joysdk = opJoy.OpJoy();
        joysdk.showMessageBlockDialog();
    }
});

KakaoJoyInterface._instance = null;
KakaoJoyInterface.getInstance = function(){
    if(KakaoJoyInterface._instance == null){
        KakaoJoyInterface._instance = new KakaoJoyInterface();
        KakaoJoyInterface._instance.init();
    }
    return  KakaoJoyInterface._instance;
};

KakaoJoyInterface.MessageType = {
    NORMAL: 1,
    INVITE: 2
}

KakaoJoyInterface.TempleteID =  {
    ASK_HELP: "1708",
    ASK_HEART: "1707",
    SHOP_GIFT: "1706",
    SHARE_SCORE: "1705",
    INVITE_FRIENDS: "1698",

    VENUS_GIFT: "1789",
    EARTH_GIFT: "1790",
    MARS_GIFT: "1791"
}