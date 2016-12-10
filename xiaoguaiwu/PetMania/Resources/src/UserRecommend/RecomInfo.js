
//======================================================================================================================
var RecomInfo = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_MyJSON = null;
		this.id = "";
        this.avatar = "";
		this.nick = "";
        this.m_followFlag = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(jsonRecom)
    {
        this.m_MyJSON = jsonRecom;
        this.m_followFlag = false;
//		this.id = "3838992859";
		this.id = this.m_MyJSON['uid'];
//        this.avatar = "http://tp4.sinaimg.cn/3838992859/50/5676202159/1";
        this.avatar = this.m_MyJSON['avatar'];
		this.nick = this.m_MyJSON['nick'];
        return this;
    },
	
	 //------------------------------------------------------------------------------------------------------------------
    initNew: function(_nick, _id, _avatar)
    {
		this.nick = _nick;
		this.id = _id;
        this.avatar = _avatar;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function()
    {
        var self = this;
        var _callBack = function(result, reply)
        {
            if (result)
            {
                cc.log("关注用户成功 = " + result);
                //去掉关注按钮 显示已关注

            }
            else
            {
                cc.log("关注用户失败 ");
            }
        };
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
        var _json = this.getMyJson();
        cc.log("cc.NodeSelf.getInstance().asyncAddActionUser id = " + this.getRoleId());
        cc.NodeSelf.getInstance().asyncAddActionUser(_provider, this.getRoleId(), _callBack);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMyJson: function()
    {
        return this.m_MyJSON;
    },

    //------------------------------------------------------------------------------------------------------------------
    getVatar: function()
    {
        return this.avatar;
    },

	setPhotoUrl: function(url){
		this.avatar = url;
		cc.log("this.avatar = " + this.getVatar());
		return this.getVatar();
	},

    //------------------------------------------------------------------------------------------------------------------
    getName: function()
    {
        return this.nick;
    },

    //------------------------------------------------------------------------------------------------------------------
    getLocation: function()
    {
        return this.getMyJson()['location'];
    },

    //------------------------------------------------------------------------------------------------------------------
    getFollowCount: function()
    {
        return this.getMyJson()['followers_count'];
    },

    //------------------------------------------------------------------------------------------------------------------
    getIsVerified: function()
    {
        return this.getMyJson()['verified'];
    },

    //------------------------------------------------------------------------------------------------------------------
    getLevel: function()
    {
        return this.getMyJson()['level'];
    },

    //------------------------------------------------------------------------------------------------------------------
    getScores: function()
    {
        return this.getMyJson()['scores'];
    },

    //------------------------------------------------------------------------------------------------------------------
    getRoleId: function()
    {
        return this.id;
//        return this.getMyJson()['roleid'];
    },

    setFollowFlag: function(value)
    {
        this.m_followFlag = value;
    },

    getFollowFlag: function()
    {

        return this.m_followFlag;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
//        return "Recom:" + this.getMyJson().sid + " = （" + this.getMyMailContent() + ")" ;
        return "recom: getName" + this.getName() +
            "; getlocation = " + this.getLocation() +
            "; getFollowCount = " + this.getFollowCount() +
            "; get isv = " + this.getIsVerified() +
            "; get level = " + this.getLevel() +
            "; get score = " + this.getScores();
    },

    //------------------------------------------------------------------------------------------------------------------
    equal: function(otherJson)
    {
        var myJson = this.getMyJson();
        return myJson.mid == otherJson.mid;
    },
    //------------------------------------------------------------------------------------------------------------------
    loadSocialInfo: function(manager)
    {
        //3838992859s
        var self = this;

        //
        var callBack = function(id, info)
        {
            cc.log("好友推荐 返回了一个结果 = " + id);

            var json = JSON.parse(info);
            if (parseInt(json.state) > 0)
            {
                //
                self.initNew(json.data.nick,
                    id,
                    json.data.avatar);

                //
                cc.log(id + "好友推荐 社交信息获取成功, 开始下载照片");

                //
                joyCommon.getInstance().downUserPhoto(
                    [self],
                    function(jsonData)
                    {
                        var obj = JSON.parse(jsonData);
						cc.log("好友推荐 get jsonData = " + jsonData);
                        obj.data.forEach(
                            function(userPhoto)
                            {
                                cc.log("userPhoto : roleid : " + userPhoto.roleid + " url : " + userPhoto.url);
								userPhoto.id = id;
//								if (userPhoto.roleid == self.getRoleId()){
                                    self.setPhotoUrl(userPhoto.url);
//                                }
                            }
                        );
						
//                        PhotoLoad.getInstance().handle(obj.data);
						
                        manager.fireEvent(_RECOM_MNG_EVENT.LOAD_PHOTO,obj.data);
                    });
                cc.log("manager.fireEvent(_RECOM_MNG_EVENT.LOAD_PHOTO)");

            }
            else
            {
                //
                cc.log(id + " 好友推荐 社交信息获取失败");
            }
        };

        //
        cc.log("好友推荐 开始下载社交信息 = " + this.getRoleId());
        GetInfoFromUid(this.getRoleId(), callBack);

        //
        return this;
    }
    //------------------------------------------------------------------------------------------------------------------

});

//
RecomInfo.create = function(jsonRecom)
{
    var createNew = new RecomInfo();
    if (createNew)
    {
        createNew.init(jsonRecom);
    }

    return createNew;
};

//RecomInfo.createTest = function(handler)
//{
//    var createNew = new RecomInfo();
//    if (createNew)
//    {
//        createNew.init(
//            {'mt' : 1, 'ct' : _ServerTime(), 'sid' : 1, 'msg' : ""},
//            handler);
//    }
//
//    return createNew;
//};


