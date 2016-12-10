//======================================================================================================================
var MailInfo = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_MyJSON = null;
        this.m_MailHandler = null;
        this._needResponse = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(jsonMail, collectHandler, needResponse)
    {
        cc.log("init a new Mail!");
        cc.log("jsonMail: " + JSON.stringify(jsonMail));
        this.m_MyJSON = jsonMail;
        this.m_MailHandler = collectHandler;
        this._needResponse = needResponse;
        return this;
    },

    getMailIcon: function()
    {
        if(this.m_MailHandler && this.m_MailHandler.toString() == "MailHandler_GetItem")
        {
            return this.m_MailHandler.getIconSprite();
        }
        else
        {
            return "default";
        }
    },

    needResponse: function()
    {
        return this._needResponse;
    },

    //------------------------------------------------------------------------------------------------------------------
    getHandler: function()
    {
        return this.m_MailHandler;
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function()
    {
        /*转移到了MailMng里做了  区分单个邮件收还是收取全部
        var self = this;
        var callBack = function(result)
        {
            if (result)
            {
                if (self.m_MailHandler)
                {
                    cc.log("收取邮件成功 = " + self.m_MailHandler);
                    self.m_MailHandler.handle(self);
                }
            }
            else
            {
                cc.log("收取邮件失败 = " + self.m_MailHandler);
            }
        };

        var _json = this.getMyJson();
        if(*//*_json.mt == 9*//*false)//本地测试增加item邮件
        {
            callBack(true);
        }
        else
        {
            cc.NodeSelf.getInstance().collectMail(_json.mid, callBack);
        }
        */

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMyJson: function()
    {
        return this.m_MyJSON;
    },

    //------------------------------------------------------------------------------------------------------------------
    getRoleId: function()
    {
        var json = this.getMyJson();
        return json ? json.sid : -1;
    },

    getMailName: function()
    {
        return this.m_MailHandler ? this.m_MailHandler.parseMailName(this) : "Mail";
    },

    getMailTime: function()
    {
        var date = new Date(this.m_MyJSON.ct*1000);

        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        return year + "-" + month + "-" + day;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMyMailContent: function()
    {
        return this.m_MailHandler ? this.m_MailHandler.parseMailContent(this) : "";
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "Mail:" + this.getMyJson().sid + " = （" + this.getMyMailContent() + ")" ;
    },

    //------------------------------------------------------------------------------------------------------------------
    equal: function(otherJson)
    {
        var myJson = this.getMyJson();
        return myJson.mid == otherJson.mid;
    }

    //------------------------------------------------------------------------------------------------------------------

});

//
MailInfo.create = function(jsonMail, handler, needResponse)
{
    var createNew = new MailInfo();
    if (createNew)
    {
        createNew.init(jsonMail, handler, needResponse);
    }

    return createNew;
};

MailInfo.createTest = function(handler)
{
    var createNew = new MailInfo();
    if (createNew)
    {
        createNew.init(
            {'mt' : 1, 'ct' : _ServerTime(), 'sid' : 1, 'msg' : ""},
            handler);
    }

    return createNew;
};

MailInfo.createGetItem = function(handler, needResponse)
{
    var createNew = new MailInfo();
    if(createNew)
    {
        createNew.init(
            {'mt' : 9, 'ct' : _ServerTime(), 'sid' : 1, 'msg' : ""},
        handler, needResponse);
    }
    return createNew;
};


