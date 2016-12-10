/**
 * Created by hong.zhang on 2014/7/11.
 */

//======================================================================================================================
var Impl_FriendsMngPhoneKakao = Impl_FriendsMngPhone.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(/*ditchName*/)
    {
        this._super();

        //
        //this.m_DitchName = ditchName;
//        this.m_HashContactInfo = {};
    },
//------------------------------------------------------------------------------------------------------------------
    _applyFriendsInfosFromThirdParty: function(manager)
    {
        var self = this;

        //
        var succCallBackForKakao = function()
        {
            succCallBack();
            //清除掉
            self.m_OtherFriendsInfos = [];
            self.m_OtherHashFriendsInfosByRoleId = {};
            cc.log("社交平台的所有没加入数量 = " + g_otherFriends.length);

            if (g_otherFriends.length > 0)
            {
                var allPlayersUIDs = [];

                g_otherFriends.forEach(
                    function(a_bodyData)
                    {
                        var friend = FriendInfo.createByHomeData(a_bodyData);

                        self.m_OtherFriendsInfos.push(friend);
                        self.m_OtherHashFriendsInfosByRoleId[friend.getRoleId()] = friend;
                    }
                );

                manager.fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_FROM_HOME_SUCC);

                //
                cc.log("我自己 = " + cc.NodeSelf.getInstance().getRoleId() + ", 有" + self.m_OtherFriendsInfos.length + "个不在游戏好友");
                if (self.m_OtherFriendsInfos.length > 0)
                {
                    //
                    cc.log("通知BI部分");
                    BIMng.getBISocial().logFriendsCount(self.m_OtherFriendsInfos.length);

                    //
                    cc.log("开始载入其他好友的照片");
                    self.m_OtherFriendsInfos.forEach(
                        function(friendInfo)
                        {
                            friendInfo.loadSocialInfo();
                        }
                    );
                }
            }
            else
            {
                cc.log("没有任何一个好友，就直接算完成");
                manager.fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_FROM_HOME_SUCC);
            }
        };

        var succCallBack = function()
        {
            //清除掉
            self.m_FriendsInfos = [];
            self.m_HashFriendsInfosByRoleId = {};
            cc.log("社交平台的好友数量 = " + g_joyFriends.length);

            if (g_joyFriends.length > 0)
            {
                var allPlayersUIDs = [];

                g_joyFriends.forEach(
                    function(a_bodyData)
                    {
                        var friend = FriendInfo.createByHomeData(a_bodyData);

                        self.m_FriendsInfos.push(friend);
                        self.m_HashFriendsInfosByRoleId[friend.getRoleId()] = friend;
						allPlayersUIDs.push(id);
                    }
                );

                manager.fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_FROM_HOME_SUCC);

                //
                cc.log("我自己 = " + cc.NodeSelf.getInstance().getRoleId() + ", 有" + self.m_FriendsInfos.length + "个游戏好友");
                if (self.m_FriendsInfos.length > 0)
                {
                    //
                    cc.log("通知BI部分");
                    BIMng.getBISocial().logFriendsCount(self.m_FriendsInfos.length);

                    //
                    cc.log("开始载入好友的照片");
                    self.m_FriendsInfos.forEach(
                        function(friendInfo)
                        {
                            friendInfo.loadSocialInfo();
                        }
                    );
                }

//                g_joyFriends.forEach(
//                    function(id)
//                    {
//                        allPlayersUIDs.push(id);
//                        cc.log("好友 UID = " + id);
//                    }
//                );
//
//                cc.log("________________________________________________");
                self._applyFriendsInfosFromHome(allPlayersUIDs, manager);
            }
            else
            {
                cc.log("没有任何一个好友，就直接算完成");
                manager.fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_FROM_HOME_SUCC);
            }
        };

        //
        var failedCallBack = function()
        {
            manager.fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_FROM_THIRD_PARTY_FAILED);
        };

        //
        cc.log("kakao 从社交平台获得好友数据 = " + _ParseChannel());
        joyCommon.getInstance().getJoyFriendsList(
            (JoyType.JOY_KAKAO == JOY_FLAG)? succCallBackForKakao : succCallBack,
            failedCallBack
        );

        return this;
    },
//------------------------------------------------------------------------------------------------------------------
    applyFriendsInfosFromThirdParty: function(manager) {
        // return this._applyFriendsInfosFromThirdPartyEx(manager);
        cc.log("applyFriendsInfosFromThirdParty, JOY_FLAG:" + JOY_FLAG);

        return this._applyFriendsInfosFromThirdParty(manager); // kakao

    },

    //------------------------------------------------------------------------------------------------------------------
    getOtherFriendsInfos: function()
    {
        cc.log("kakao getOtherFriendsInfos");
        return this.m_OtherFriendsInfos.concat();
    },

    //------------------------------------------------------------------------------------------------------------------
    getOtherFriendsInfosSize: function()
    {
        return this.m_OtherFriendsInfos.length;
    },

    //------------------------------------------------------------------------------------------------------------------
    getOtherFriendsInfosByRoleId: function(roleId)
    {
        return this.m_OtherHashFriendsInfosByRoleId[roleId];
    }
});

Impl_FriendsMngPhoneKakao.create = function(ditchName)
{
    return new Impl_FriendsMngPhoneKakao(ditchName);
};