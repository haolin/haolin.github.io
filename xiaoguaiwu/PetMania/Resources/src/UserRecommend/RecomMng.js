
var _RECOM_MNG_EVENT = {
    RELOAD_RECOMS_FINISH: 100,
    FOLLOW_RECOM: 300,
    LOAD_PHOTO:400
};

var RecomMng = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_IsValid = true;
        this.m_MyRecoms = [];

        //事件队列
        this.m_RecomEvents = IEvent.create(this);
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
        this.m_RecomEvents.registerEvent(eventName, _eventFunction, _eventTarget);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //触发事件
    fireEvent: function(eventName, params)
    {
        this.m_RecomEvents.fireEvent(eventName, params);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getRecomsList: function()
    {
        return this.m_MyRecoms.concat();
    },

    //------------------------------------------------------------------------------------------------------------------
    getRecomsCount: function()
    {
        return this.m_MyRecoms.length;
    },


    //------------------------------------------------------------------------------------------------------------------
    loadRecoms: function()
    {
        if (!this.isValid())
        {
            return this;
        }
		
		cc.log("loadRecoms");
        //
        var self = this;
        var callBack = function(result, ml)
        {
            if (result)
            {
                cc.log("好友推荐请求成功 recoms  = " + ml.length);

                ml.forEach(
                    function(json)
                    {
                        cc.log("json = " + JSON.stringify(json));
                        var recomInfo = RecomInfo.create(json);
                        cc.log("recvRecom recomInfo = " + recomInfo);
                        self.m_MyRecoms.push(recomInfo);
                    }
                );

                if (self.m_MyRecoms.length > 0)
                {
                    //
                    cc.log("开始载入好友的照片");
                    self.m_MyRecoms.forEach(
                        function(recomInfo)
                        {
                            recomInfo.loadSocialInfo(self);
                        }
                    );
                }
            }
            else
            {
                cc.log("好友推荐请求失败");
            }

            //var _eventName = eventName || _MAIL_MNG_EVENT.RELOAD_MAILS_FINISH;
            self.m_RecomEvents.fireEvent(_RECOM_MNG_EVENT.RELOAD_RECOMS_FINISH);
//            self.logAllMails();
        };

        //
        this.m_MyRecoms = [];

        var _provider = 'weibo';
        switch (JOY_FLAG){
            case JoyType.JOY_WEIBO :
                _provider = 'weibo';
                break;
            case JoyType.JOY_FACEBOOK :
                _provider = 'facebook';
                break;
            case JoyType.JOY_RENREN :
                _provider = 'renren';
                break;
            default :
                _provider = 'weibo';
                break;
        }

        cc.log("provider = " + _provider);
        cc.NodeSelf.getInstance().asyncGetRecomendUsers(_provider,callBack);
        return this;
    },


    //------------------------------------------------------------------------------------------------------------------
    followUser: function(recom)
    {
        recom.handle();
        recom.setFollowFlag(true);
        this.fireEvent(_RECOM_MNG_EVENT.FOLLOW_RECOM);
        return this;
    },

    needRefresh: function()
    {
        var freshFlag = false;

        this.m_MyRecoms.forEach(
            function(a_recom, index)
            {
                if (a_recom.getFollowFlag()){
                    freshFlag = true;
                }
            }
        );

        cc.log("needRefresh freshFlag =" + freshFlag);
        return freshFlag;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyLogout: function()
    {
        this.m_MyRecoms = [];
        return this;
    }

});

RecomMng._instance = null;
RecomMng.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new RecomMng();
        this._instance.init();
    }

    return this._instance;
};


