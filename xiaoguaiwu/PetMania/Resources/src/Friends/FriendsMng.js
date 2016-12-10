//回调事件标志
var _FRIENDS_MNG_EVENT = {

    //登陆
    LOGIN_SUCC: 100,
    LOGIN_FAILED: 200,

    //第3方要数据
    GET_FRIENDS_FROM_THIRD_PARTY_SUCC: 300,
    GET_FRIENDS_FROM_THIRD_PARTY_FAILED: 400,

    //我方要数据
    GET_FRIENDS_FROM_HOME_SUCC: 500,
    GET_FRIENDS_FROM_HOME_FAILED: 600,

    //我方要分数
    GET_FRIENDS_SCORE_SUCC: 700,
    GET_FRIENDS_SCORE_FAILED: 800,

    //获得通讯目录
    GET_FRIENDS_IN_CONTACT_LIST_SUCC: 900,
    GET_FRIENDS_IN_CONTACT_LIST_FAILED: 1000,

    //邀请好友
    INVITE_FRIENDS_SUCC: 1100,
    INVITE_FRIENDS_FAILED: 1200,

    //送心
    GIVE_FRIEND_HEART_SUCC: 1300,
    GIVE_FRIEND_HEART_FAILED: 1400,

    //要心
    ASK_FRIEND_HEART_SUCC: 1500,
    ASK_FRIEND_HEART_FAILED: 1600,

    //要帮助
    ASK_FRIEND_HELP_SUCC: 1700,
    ASK_FRIEND_HELP_FAILED: 1800,

    //照片头像载入
    LOAD_PHOTO: 1900,

    //周排行系列
    GET_FRIENDS_WEEKLY_SUCC: 2000,
    GET_FRIENDS_WEEKLY_FAILED: 2100

};

//送心的结果 说明枚举
var GIVE_FRIEND_HEART_RESULT = {
    NO_FRIEND: 0,
    TIME_FAIL: 1
};

//======================================================================================================================
var FriendsMng = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(impl)
    {
        //事件队列
        this.m_FriendsEvents = IEvent.create(this);

        //实现的核心
        this.m_Impl = impl;
    },

    //------------------------------------------------------------------------------------------------------------------
    //是否可用
    isValid: function()
    {
        return this.m_Impl && this.m_Impl.isValid();
    },

    //------------------------------------------------------------------------------------------------------------------
    //是否登陆
    isLogin: function()
    {
        return cc.NodeSelf.getInstance().isLogin();
    },

    //------------------------------------------------------------------------------------------------------------------
    //初始化
    init: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //注册事件
    registerEvent: function(eventName, _eventFunction, _eventTarget)
    {
        this.m_FriendsEvents.registerEvent(eventName, _eventFunction, _eventTarget);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //触发事件
    fireEvent: function(eventName, params)
    {
        this.m_FriendsEvents.fireEvent(eventName, params);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //获得好友队列
    getFriendsInfos: function()
    {
        return this.m_Impl ? this.m_Impl.getFriendsInfos(): [];
    },

    //------------------------------------------------------------------------------------------------------------------
    //获得好友队列
    getFriendInfoByRoleId: function(roleId)
    {
        return this.m_Impl ? this.m_Impl.getFriendInfoByRoleId(roleId) : null;
    },

    //------------------------------------------------------------------------------------------------------------------
    //获得好友队列大小
    getFriendsInfosSize: function()
    {
        return this.m_Impl ? this.m_Impl.getFriendsInfos().length : 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    //获得未加入游戏好友队列
    getOtherFriendsInfos: function()
    {
        return this.m_Impl ?
            (this.m_Impl.getOtherFriendsInfos ? this.m_Impl.getOtherFriendsInfos() : this.m_Impl.getFriendsInfos()):
            [];
    },

    //------------------------------------------------------------------------------------------------------------------
    //获得未加入游戏好友队列
    getOtherFriendInfoByRoleId: function(roleId)
    {
        return this.m_Impl ?
            (this.m_Impl.getOtherFriendsInfosByRoleId ?
                    this.m_Impl.getOtherFriendsInfosByRoleId(roleId) : this.m_Impl.getFriendInfoByRoleId(roleId)):
            [];
//        return this.m_Impl ? this.m_Impl.getFriendInfoByRoleId(roleId) : null;
    },

    //------------------------------------------------------------------------------------------------------------------
    //获得未加入游戏好友队列大小
    getOtherFriendsInfosSize: function()
    {
        return this.m_Impl ?
            (this.m_Impl.getOtherFriendsInfos ? this.m_Impl.getOtherFriendsInfos().length : this.m_Impl.getFriendsInfos().length):
            0;
//        return this.m_Impl ? this.m_Impl.getFriendsInfos().length : 0;
    },

    //获得星球排行队列
    getStarScoreTop: function(starNum)
    {
        return this.m_Impl ? this.m_Impl.getStarScoreTop(starNum): [];
    },

    //------------------------------------------------------------------------------------------------------------------
    //第3方申请好友数据 例如360
    applyFriendsInfosFromThirdParty: function()
    {
        cc.log("func applyFriendsInfosFromThirdParty");
        if (this.isLogin() && this.m_Impl)
        {
            this.m_Impl.applyFriendsInfosFromThirdParty(this);
        }

       /* if (this.m_Impl)
        {
            return this.m_Impl.applyFriendsInfosFromThirdParty(this);
        }*/

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //自家申请好友数据 例如360
    applyFriendsInfosFromHome: function()
    {
        if (this.isLogin() && this.m_Impl)
        {
            this.m_Impl.applyFriendsInfosFromHome(this);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //从自己家申请游戏好友的分数
    applyFriendsGameLevelScoresFromHome: function(gameLevelName)
    {
        if (this.isLogin() && this.m_Impl)
        {
            this.m_Impl.applyFriendsGameLevelScoresFromHome(gameLevelName, this);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //获取通信录
    applyFriendsInContactList: function()
    {
        if (this.isLogin() && this.m_Impl)
        {
            this.m_Impl.applyFriendsInContactList(this);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //获取通信录
    getFriendsInContactList: function()
    {
        if (this.isLogin() && this.m_Impl)
        {
            return this.m_Impl.getFriendsInContactList();
        }

        return [];
    },

    //------------------------------------------------------------------------------------------------------------------
    //获取通信录
    inviteFriendByName: function(name)
    {
        if (this.isLogin() && this.m_Impl)
        {
            this.m_Impl.inviteFriendByName(name, this);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //送心
    giveFriendHeart: function(roleId, count)
    {
        if (this.isLogin() && this.m_Impl)
        {
            this.m_Impl.giveFriendHeart(roleId, count, this);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //要求帮助
    askFriendHeart: function(roleId, count)
    {
        if (this.isLogin() && this.m_Impl)
        {
            this.m_Impl.askFriendHeart(roleId, count, this);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //要求帮助
    begHelpToFriends: function(friendsIds, gameLevelIndx)
    {
        if (this.isLogin() && this.m_Impl)
        {
            this.m_Impl.begHelpToFriends(friendsIds, gameLevelIndx, this);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //要求帮助
    loadUserPhotoUrl: function(datas)
    {
        if (this.isLogin() && this.m_Impl)
        {
            this.m_Impl.loadUserPhotoUrl(datas, this);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyLogout: function()
    {
        return this.m_Impl &&  this.m_Impl.notifyLogout();
    }
});

FriendsMng._instance = null;
FriendsMng.getInstance = function()
{
    if (!this._instance)
    {
        cc.log("IS KO? " + Defines.IS_KO?1:0);
        this._instance =
//		(Defines.IS_KO) ?
//            new FriendsMng(Impl_FriendsMngPhoneKakao.create(_ParseChannel("FriendsMng.getInstance"))):
            new FriendsMng(Impl_FriendsMngPhone.create(_ParseChannel("FriendsMng.getInstance")));
        this._instance.init();

        //
        FriendsMng.getInstance().registerEvent(
            _FRIENDS_MNG_EVENT.INVITE_FRIENDS_SUCC,
            function()
            {
                _MsgView_InviteFriend(true);
            },
            null);

        //
        FriendsMng.getInstance().registerEvent(
            _FRIENDS_MNG_EVENT.INVITE_FRIENDS_FAILED,
            function()
            {
                _MsgView_InviteFriend(false);
            },
            null);
    }

    return this._instance;
};

//new
//获得超越进度的好友
var _GetSurpassFriends = function(levelName)
{
    //TODO：暂时解决 有可能是切换账号引起的好友信息中包含自己的问题
    var selfName = g_player.name;

    //
    var allFriends = FriendsMng.getInstance().getFriendsInfos();
    allFriends = allFriends.filter(
        function(a_friend)
        {
            return (levelName == a_friend.getFinMaxLevelName()) && (selfName != a_friend.getName());
        }
    );

    //
    allFriends = allFriends || [];
    return allFriends;
};

//old
//获得超越进度的好友
/*var _GetSurpassFriends = function(gameIndex)
{
    //
    var nextGameLevel = cc.DataMng.getInstance().getLevelDataWithID(gameIndex + 1, false);
    if (!nextGameLevel)
    {
        return [];
    }

    //
    var historyScore = nextGameLevel.HISTORY_MAX_SCORE.get();
    if (historyScore > 0)
    {
        return [];
    }

    //
    var allFriends = FriendsMng.getInstance().getFriendsInfos();
    allFriends = allFriends.filter(
        function(a_friend)
        {
            return (gameIndex) == a_friend.getMaxGameLevelIndx();
        }
    );

    //
    allFriends = allFriends || [];
    return allFriends;
};*/


