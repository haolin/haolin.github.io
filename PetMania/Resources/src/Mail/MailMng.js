
var _MAIL_MNG_EVENT = {
    RELOAD_MAILS_FINISH: 100,
    RECV_NEW_MAIL: 200,
    PICK_MAIL: 300
};

var MailMng = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_IsValid = true;
        this.m_MyMails = [];

        //事件队列
        this.m_MailEvents = IEvent.create(this);
    },

    //------------------------------------------------------------------------------------------------------------------
    isValid: function()
    {
        return this.m_IsValid && cc.NodeSelf.getInstance().isLogin();
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //注册事件
    registerEvent: function(eventName, _eventFunction, _eventTarget)
    {
        this.m_MailEvents.registerEvent(eventName, _eventFunction, _eventTarget);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //触发事件
    fireEvent: function(eventName)
    {
        this.m_MailEvents.fireEvent(eventName);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMailsList: function()
    {
        return this.m_MyMails.concat();
    },

    //------------------------------------------------------------------------------------------------------------------
    getMailsCount: function()
    {
        return this.m_MyMails.length;
    },

    //------------------------------------------------------------------------------------------------------------------
    createGetItemMail: function(wayIndex, items, needResponse)
    {
        this.m_MyMails.push(
            MailInfo.createGetItem(MailHandler_GetItem.create(wayIndex, items), needResponse)
        );
    },
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    createHandler: function(jsonMail)
    {
        switch (jsonMail.mt)
        {
        case cc.NodeDefine.MAILTYPES.kGivePower:
            return MailHandler_GiveFriendHeart.create(jsonMail.sid);

        case cc.NodeDefine.MAILTYPES.kBegStageHelp:
            return MailHandler_FriendAskMeForHelp.create(jsonMail.sid);

        case cc.NodeDefine.MAILTYPES.kBegPower:
            return MailHandler_FriendAskMeForHeart.create(jsonMail.sid/*, jsonMail*/);

        case cc.NodeDefine.MAILTYPES.kPayOrderCompleted:
            //cc.log("jsonMail = " + JSON.stringify(jsonMail));
            return MailHandler_ProductOrder.create(jsonMail.msg.productid);

        case cc.NodeDefine.MAILTYPES.kFirstTimeLoginReward:
            return MailOpt_FirstLogin.create(jsonMail);

        case cc.NodeDefine.MAILTYPES.kReward:
            return MailOpt_GenuineBonus.create(jsonMail);

            case cc.NodeDefine.MAILTYPES.kPropsRewardMail:
            {
                return MailHandler_GetItem.createByJson(jsonMail);
            }

        default:
            {
                cc.log("createHandler jsonMail.mt = " + jsonMail.mt);
            }
            break;
        }

        //
        if (jsonMail.mt == cc.NodeDefine.MAILTYPES.kNormal)
        {
            var msgJson = JSON.parse(jsonMail.msg);
            if (msgJson)
            {
                cc.log("msgJson.type = " + msgJson.type);

                if (msgJson.type == MailDefine.type_help)
                {
                    return MailHandler_FriendGiveMeHelp.create(jsonMail.sid);
                }
                else if (msgJson.type == MailDefine.type_heart)
                {
                    return MailHandler_FriendGiveMeHeart.create(jsonMail.sid);
                }
            }
        }

        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    getRecvMail: function(jsonMail)
    {
        for (var indx = 0; indx < this.m_MyMails.length; ++indx)
        {
            var a_mail = this.m_MyMails[indx];
            if (a_mail.equal(jsonMail))
            {
//                cc.log("\n");cc.log("\n");
//                cc.log("重复的邮件 = " + a_mail);
                return a_mail;
            }
        }

        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    recvMail: function(jsonMail)
    {
//        if(cc.DataMng.getInstance().isOptionCheckSel())
//        {
//            cc.log("setting not to recvMail");
//            return this;
//        }
        if (!jsonMail || this.getRecvMail(jsonMail))
        {
            return this;
        }

        var needResponse = false;
        cc.log("recvMail: " + jsonMail.mt);
        if(parseInt(jsonMail.mt) == cc.NodeDefine.MAILTYPES.kBegStageHelp || parseInt(jsonMail.mt) == cc.NodeDefine.MAILTYPES.kBegPower)
        {
            cc.log("recvMail, needResponse is true");
            needResponse = true;
        }
        var mailInfo = MailInfo.create(
            jsonMail,
            this.createHandler(jsonMail), needResponse);

        //
        if (mailInfo.getHandler())
        {
            cc.log("压入一个合法邮件 = " + mailInfo);
            this.m_MyMails.push(mailInfo);

            if (mailInfo.getHandler().immeHandle())
            {
                cc.log("立即执行的邮件 ＝ " + mailInfo);
                this.m_MyMails.pop();
            }
        }
        else
        {
            cc.log("不识别的邮件");
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    loadMails: function()
    {
        if (!this.isValid())
        {
            return this;
        }

        //
        var self = this;
        var callBack = function(result, ml)
        {
            if (result)
            {
//                cc.log("mails  = " + ml.length);

                ml.forEach(
                    function(json)
                    {
//                        cc.log("json = " + JSON.stringify(json));
                        self.recvMail(json);
                    }
                );
            }
            else
            {

            }

            //var _eventName = eventName || _MAIL_MNG_EVENT.RELOAD_MAILS_FINISH;
            self.m_MailEvents.fireEvent(_MAIL_MNG_EVENT.RELOAD_MAILS_FINISH);
//            self.logAllMails();
        };

        //
        this.m_MyMails = [];
        cc.NodeSelf.getInstance().getMailList(callBack);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logAllMails: function()
    {
        cc.log("logAllMails begin ********************************************************");

        this.m_MyMails.forEach(
            function(a_mail, index)
            {
                cc.log("Mail_"+ index + " = " + a_mail);
            }
        );

        cc.log("logAllMails end **********************************************************");

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    removeMail: function(mailInfo)
    {
        for (var index = 0; index < this.m_MyMails.length; ++index)
        {
            if (mailInfo == this.m_MyMails[index])
            {
                this.m_MyMails.splice(index, 1);
                break;
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    pickAll: function()
    {
        /*this.m_MyMails.forEach(
            function(a_mail)
            {
                a_mail.handle();
            }
        );

        this.m_MyMails = [];
        this.fireEvent(_MAIL_MNG_EVENT.PICK_MAIL);*/

        if (this.m_MyMails.length <= 0)
        {
            return this;
        }

        var self = this;
        var callBack = function(result, objectInfo)
        {
            cc.GameManager.getInstance().getGameTimerGroup().remove("mail");
            noticeJaveHandler(7);

            if (result)
            {
                //收取全部 服务器返回所有邮件内物品的累加
                cc.log("[邮件] 收取邮件成功 = PickAll");
                cc.log("[邮件] 邮件内的物品 = " + JSON.stringify(objectInfo));
                ParseGameObjectInfo(objectInfo);

                self.m_MyMails.forEach(
                    function(mailInfo)
                    {
                        if (mailInfo.getHandler())
                        {
                            mailInfo.getHandler().handle(mailInfo, {});
                        }
                    }
                );

                self.m_MyMails = [];
                self.fireEvent(_MAIL_MNG_EVENT.PICK_MAIL);
            }
            else
            {
                cc.log("[邮件] 收取邮件失败 = PickAll");
            }
        };

        //-1表示收取全部
        cc.NodeSelf.getInstance().collectMail(-1, callBack);
        noticeJaveHandler(6, "");

        var groupTimer = cc.GameManager.getInstance().getGameTimerGroup();
        groupTimer.add(15,
            function()
            {
                noticeJaveHandler(7);
            },
            "mail"
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    pick: function(mailInfo)
    {
        /*mail.handle();
        this.removeMail(mail);
        this.fireEvent(_MAIL_MNG_EVENT.PICK_MAIL);*/

        var self = this;
        var callBack = function(result, objectInfo)
        {
            cc.GameManager.getInstance().getGameTimerGroup().remove("mail");
            noticeJaveHandler(7);

            if (result)
            {
                if (mailInfo.getHandler())
                {
                    cc.log("[邮件] 收取邮件成功 = " + mailInfo.getHandler());
                    cc.log("[邮件] 邮件内的物品 = " + JSON.stringify(objectInfo));
                    mailInfo.getHandler().handle(mailInfo, objectInfo);
                }

                self.removeMail(mailInfo);
                self.fireEvent(_MAIL_MNG_EVENT.PICK_MAIL);
            }
            else
            {
                cc.log("[邮件] 收取邮件失败 = " + mailInfo.getHandler());
            }
        };

        var _json = mailInfo.getMyJson();
        cc.NodeSelf.getInstance().collectMail(_json.mid, callBack);

        noticeJaveHandler(6, "");
        var groupTimer = cc.GameManager.getInstance().getGameTimerGroup();
        groupTimer.add(15,
            function()
            {
                noticeJaveHandler(7);
            },
            "mail"
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyLogout: function()
    {
        this.m_MyMails = [];
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createTest: function(count)
    {
        for (var index = 0; index < count; ++index)
        {
            var rendProId = Tools.rangeRandom(1, 23, true);
            this.m_MyMails.push(
                MailInfo.createTest(MailHandler_ProductOrder.create(rendProId))
            );
        }
//        var items = [];
//        items.push({'type':"money", 'amount' : 100});
//        this.createGetItemMail(ITEM_GET_WAY.ACHIEVE_SUCCESS,
//            items,
//            false);

        return this;
    }
});

MailMng._instance = null;
MailMng.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new MailMng();
        this._instance.init();
  //      this._instance.createTest(50);

        //
        var self = this;
        cc.NodeSelf.getInstance().registerActionCallback(
            cc.NodeDefine.NET_ACTIONS.kRecvNewMail,
            function(json)
            {
                cc.log("收到通知 + =" + json);
                cc.log("收到通知 + =" + JSON.stringify(json));
                self._instance.recvMail(json);
                self._instance.fireEvent(_MAIL_MNG_EVENT.RECV_NEW_MAIL);
            }
        );
    }

    return this._instance;
};


