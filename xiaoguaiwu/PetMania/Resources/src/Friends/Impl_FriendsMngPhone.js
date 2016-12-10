
//======================================================================================================================
var ApplyFriendScore = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(gameLevelName, size)
    {
        this.m_GameLevelName = gameLevelName;
        this.m_BatchSize = size;
        this.m_ApplyCount = 0;
        this.m_FinishCount = 0;
        this.m_Result = {};
    },

    //------------------------------------------------------------------------------------------------------------------
    apply: function(friendsInfos)
    {
        //
        var self = this;
        var myCallBack = function(result, gameLevelIndx, scores)
        {
            if (result)
            {
				cc.log("ApplyFriendScore apply begin !!!!!!!!!!!!!!!!!!");
                for (var id in scores)
                {
                    if (scores.hasOwnProperty(id))
                    {
						cc.log("scores[" + id + "] = " + scores[id]);
                        self.m_Result[id] = scores[id];
                    }
                }

                ++self.m_FinishCount;
                if (self.m_FinishCount >= self.m_ApplyCount)
                {
                    self.finish();
                }
            }
            else
            {
                cc.log("ApplyFriendScore apply false !!!!!!!!!!!!!!!!!!");
                self.finish();
            }
        };

        //
        var a_batch = [];

        //
        var destGameLevelData = cc.DataMng.getInstance().getLevelDataWithName(this.m_GameLevelName);
        var destGameLevelIndx = destGameLevelData.ID;

        //
        friendsInfos.forEach(
            function(friendData, indx, array)
            {
                a_batch.push(friendData.getID());
                if (a_batch.length >= self.m_BatchSize || indx >= (array.length - 1))
                {
                    if (destGameLevelData.IS_SPACE_LEVEL)
                    {
                        cc.NodeSelf.getInstance().getSpaceportStageScoresFromFriend(
                            destGameLevelIndx,
                            a_batch.concat(),
                            myCallBack)
                    }
                    else
                    {
                        cc.NodeSelf.getInstance().getStageScoresFromFriends(
                            destGameLevelIndx,
                            a_batch.concat(),
                            myCallBack);
                    }

                    //
                    ++self.m_ApplyCount;

                    //清除掉
                    a_batch = [];
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getResult: function()
    {
        return this.m_Result;
    }
});

//======================================================================================================================
var Impl_FriendsMngPhone = Impl_FriendsMng.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(/*ditchName*/)
    {
        this._super();

        //
        //this.m_DitchName = ditchName;
        this.m_HashContactInfo = {};
    },

    //------------------------------------------------------------------------------------------------------------------
    isValid: function()
    {
        return this._super() && Defines.PLATFORM.isMobile();
    },

    //------------------------------------------------------------------------------------------------------------------
    _applyFriendsInfosFromThirdParty: function(manager)
    {
        var self = this;

        var succCallBackKakao = function()
        {
            succCallBack();

            self.m_OtherFriendsInfos = [];
            self.m_OtherHashFriendsInfosByRoleId = {};
            cc.log("社交平台的好友数量 = " + g_otherFriends.length);

            if (g_otherFriends.length > 0)
            {
                var allPlayersUIDs = [];

                g_otherFriends.forEach(
                    function(a_bodyData)
                    {
                        var friend = FriendInfo.createByHomeData(a_bodyData);

                        self.m_OtherFriendsInfos.push(friend);
                        self.m_OtherHashFriendsInfosByRoleId[friend.getID()] = friend;
                        cc.log("friend.getID()  = " + friend.getID());
                        cc.log("self.m_OtherHashFriendsInfosByRoleId[friend.getID()]  = " + friend);

                        allPlayersUIDs.push(friend.getID());
                    }
                );

//                manager.fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_FROM_HOME_SUCC);

                //
                cc.log("我自己 = " + cc.NodeSelf.getInstance().getRoleId() + ", 有" + self.m_OtherFriendsInfos.length + "不在游戏好友");
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
							if (friendInfo.getPhotoUrl().length > 0){
								friendInfo.loadSocialInfo();
							}
                        }
                    );
                }

//                self._applyFriendsInfosFromHome(allPlayersUIDs, manager);
            }
            else
            {
                cc.log("没有任何一个好友，就直接算完成");
                manager.fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_FROM_HOME_SUCC);
            }
        }

        var succCallBack = function()
        {
            //清除掉
            self.m_FriendsInfos = [];
            self.m_HashFriendsInfosByUid = {};
            cc.log("社交平台的好友数量 = " + g_joyFriends.length);

            if (g_joyFriends.length > 0)
            {
                var allPlayersUIDs = [];
				
				g_joyFriends.forEach(
					function(a_bodyData)
					{
						var friend = FriendInfo.createByHomeData(a_bodyData);

						self.m_FriendsInfos.push(friend);
						self.m_HashFriendsInfosByUid[friend.getID()] = friend;
						cc.log("friend.getID()  = " + friend.getID());
						cc.log("self.m_HashFriendsInfosByUid[friend.getID()]  = " + friend);
						
						allPlayersUIDs.push(friend.getID());
					}
				);
				
//				manager.fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_FROM_HOME_SUCC);

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
							if (friendInfo.getPhotoUrl().length > 0){
								friendInfo.loadSocialInfo();
							}
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
            (JoyType.JOY_KAKAO == JOY_FLAG) ? succCallBackKakao :succCallBack,
            failedCallBack
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _applyFriendsInfosFromThirdPartyEx: function(manager)
    {
        cc.log("申请好友，新流程");

        var self = this;

        //
        var getFriendsListCallBack = function(result, packet)
        {
            cc.log("申请社交好友返回结果 result ＝ " + result);
            self.m_FriendsInfos = [];
            self.m_HashFriendsInfosByRoleId = {};

            //
            if (result)
            {
                cc.log("新流程申请好友 成功 packet = " + JSON.stringify(packet));

                /*
                 Cocos2d: JS: 新流程申请好友 成功______________________________________packet = {"c":-1,
                 "friends":{"header":["uid","nick","avatar","roleid","score1","score2","give_power_cd","beg_power_cd","stage_help_cds"],
                 "body":[["1525239220","王存锴","http://tp1.sinaimg.cn/1525239220/50/5649518685/1","6",30,3,0,0],
                 ["3839296540","刘金武4","http://tp1.sinaimg.cn/3839296540/50/0/1","a90",1,0,0,0],
                 ["3841274347","刘金武2","http://tp4.sinaimg.cn/3841274347/50/0/1","51",45,5,0,0]]},"stagehelp":{}}


                 Cocos2d: JS: 新流程申请好友 成功 packet = {"c":-1,
                 "friends":{
                 "header":["uid","nick","avatar","roleid","score1","score2","give_power_cd","beg_power_cd","stage_help_cds"],

                 "body":[
                 ["231152282","黄庆铖",null,"anu",100,14,0,0],
                 ["272106085","税柳",null,"acz",11,0,0,0]
                 ]
                 },
                 "stagehelp":{"stageid":1,"cds":{"anu":1392107330,"acz":1392107332}
                 }}

                 */

                //处理核心好友信息
                var body = packet['friends']['body'];
                if (body && body instanceof Array)
                {
                    body.forEach(
                        function(a_bodyData)
                        {
                            var friend = FriendInfo.createByHomeData(a_bodyData);

                            self.m_FriendsInfos.push(friend);
                            self.m_HashFriendsInfosByRoleId[friend.getRoleId()] = friend;
                        }
                    );
                }

                //处理空间站求助信息
                var stagehelp = packet['stagehelp'];
                if (stagehelp && stagehelp['stageid'])
                {
                    cc.log("我自己 = " + cc.NodeSelf.getInstance().getRoleId() + "有好友求助信息, 空间站关卡号为 = " + stagehelp['stageid']);
                    var cds = stagehelp['cds'];

                    if (cds)
                    {
                        for (var roleId in cds)
                        {
                            if (!cds.hasOwnProperty(roleId))
                            {
                                continue;
                            }

                            var askHelpFriend = self.m_HashFriendsInfosByRoleId[roleId];
                            if (askHelpFriend)
                            {
                                var cdValue = cds[roleId] || 0;
                                cc.log("我向" + askHelpFriend.getName() + "请求了帮助 cd = " + cdValue);

                                askHelpFriend.setHelpTime(cdValue);
                            }
                        }
                    }
                }
                else
                {
                    cc.log("我自己 = " + cc.NodeSelf.getInstance().getRoleId() + "没有空间站请求帮助的信息");
                }

                //
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
            }
            else
            {
                cc.log("新流程申请好友 失败 错误号 = " + packet);
                manager.fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_FROM_HOME_FAILED);
            }
        };

        //
        cc.log("申请社交好友的数据__________________");
        cc.log("用户系统(ditch) = " + _ParseChannel());
        cc.log("社交平台ID(uid) = " + cc.NodeSelf.getInstance().getUserID(_ParseChannel()));
        cc.log("访问令牌(atoken) = " + cc.NodeSelf.getInstance().getToken());

        //
        cc.log("开始申请社交好友........");
        cc.NodeSelf.getInstance().asyncGetPassportFriendsList(
            _ParseChannel(),
            cc.NodeSelf.getInstance().getUserID(_ParseChannel()),
            cc.NodeSelf.getInstance().getToken(),
            getFriendsListCallBack);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    applyFriendsInfosFromThirdParty: function(manager)
    {
        return this._applyFriendsInfosFromThirdParty(manager);
//        return this._applyFriendsInfosFromThirdPartyEx(manager);


        if (!this.isValid())
        {
            return this;
        }

        var self = this;
        var succCallBack = function()
        {

            //清除掉
            self.m_FriendsInfos = [];
            cc.log("g_joyFriends.length = " + g_joyFriends.length);
            if (g_joyFriends.length > 0)
            {
                g_joyFriends.forEach(
                    function(friend_data_3_party)
                    {
                        var newData = FriendInfo.create(friend_data_3_party);
                        if (newData)
                        {
                            self.m_FriendsInfos.push(newData);
                        }
                    }
                );

                //
                self.applyFriendsInfosFromHome(manager);
            }
            else
            {
                if (manager)
                {
                    manager.fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_SCORE_SUCC);
                }
            }

            //
            if (manager)
            {
                manager.fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_FROM_THIRD_PARTY_SUCC);
            }
        };

        //
        var failedCallBack = function()
        {

            if (manager)
            {
                manager.fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_FROM_THIRD_PARTY_FAILED);
            }
        };

        //
        joyCommon.getInstance().getJoyFriendsList(
            succCallBack,
            failedCallBack
        );

        return this;
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
    },

    //------------------------------------------------------------------------------------------------------------------
    //获取通信录
    applyFriendsInContactList: function(manager)
    {
        if (!this.isValid())
        {
            return this;
        }

        //
        this.m_ContactInfos = [];
        this.m_HashContactInfo = {};

        var self = this;
        var succ = function()
        {
            //清除掉
            g_contactInfoList.forEach(
                function(a_contactInfo)
                {
                    var newData = ContactInfo.create(a_contactInfo);
                    if (newData)
                    {
                        self.m_ContactInfos.push(newData);
                        self.m_HashContactInfo[newData.getName()] = newData;
                    }
                }
            );

            //
            cc.log("contact succ!------------------------------------------------------------------------------------");
            self.m_ContactInfos.forEach(
                function(a_contactInfo)
                {
                    cc.log("--->" + a_contactInfo);
                }
            );

            if (manager)
            {
                manager.fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_IN_CONTACT_LIST_SUCC);
            }
        };

        //
        var failed = function()
        {
            if (manager)
            {
                manager.fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_IN_CONTACT_LIST_FAILED);
            }
        };

        joyCommon.getInstance().readContactList(succ, failed, true);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    inviteFriendByName: function(name, manager)
    {
        if (!this.isValid())
        {
            return this;
        }

        var self = this;
        var succ = function()
        {
            cc.log("inviteFriendByName =" + name);

            //
            BIMng.getBISocial().logInviteFriend("360", name, true);

            if (manager)
            {
                manager.fireEvent(_FRIENDS_MNG_EVENT.INVITE_FRIENDS_SUCC);
            }
        };

        //
        var failed = function()
        {
            //
            BIMng.getBISocial().logInviteFriend("360", name, false);

            if (manager)
            {
                manager.fireEvent(_FRIENDS_MNG_EVENT.INVITE_FRIENDS_FAILED);
            }
        };

        //
        var findData = self.m_HashContactInfo[name];
        if (findData)
        {
            //
            var contentId = 1;
            joyCommon.getInstance().inviteFriendBySmm(findData.getPhone(),
                contentId,
                succ ,
                failed);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getFriendInfoByRoleId: function(roleId)
    {
        return this.m_HashFriendsInfosByUid[roleId];
    },

    getStarScoreTop: function(starNum)
    {
        return this.m_HashStarScoreTop[starNum];
    },

    //------------------------------------------------------------------------------------------------------------------
    _applyFriendsInfosFromHome: function(uids, manager)
    {
        cc.log("社交平台的好友UID = " + uids);

        var self = this;

        if (uids.length <= 0)
        {
            cc.log("error");
        }

        //
//        this.m_HashFriendsInfosByUid = {};

        //
        cc.NodeSelf.getInstance().getFriendsInfo(
            cc.NodeSelf.getInstance().getUID(),
            _ParseChannel(),
            uids,
            function(result, packet, starArr)
            {
                if (result && packet)
                {
					cc.log("getFriendsInfo success");
                    uids.forEach(
                        function(_uid)
                        {
                            var da = packet[_uid];
							cc.log("_uid = " + _uid);
                            var valid = (da && da.length > 0);
                            if (!valid)
                            {
								cc.log("getFriendsInfo data failed");
                                return;
                            }

                            //
//                            var newFriend = FriendInfo.createEx(_uid, da);
//                            self.m_FriendsInfos.push(newFriend);
                            cc.log("初始化一个好友数据: " + JSON.stringify(da));
                            self.m_HashFriendsInfosByUid[_uid].setInfoFromHome(da);
                            cc.log("一个好友数据初步完成 = " + self.m_HashFriendsInfosByUid[_uid]);
                        }
                    );
					cc.log("manager.fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_FROM_HOME_SUCC);");


					for (var starNum = 1; starNum <= 10; starNum++){
                        var da = starArr[starNum.toString()];

                        var valid = (da && da.length > 0);
                        if (!valid){
                            cc.log("getStarScore data failed");
                            return;
                        }

                        cc.log("getStarScore data success, starNum:" + starNum);
                        cc.log(JSON.stringify(da));

                        self.m_HashStarScoreTop[starNum] = da;

					}
					
                    //
                    manager.fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_FROM_HOME_SUCC);

                    //
//                    if (self.m_FriendsInfos.length > 0)
//                    {
//                        //
//                        BIMng.getBISocial().logFriendsCount(self.m_FriendsInfos.length);
//
//                        //
//                        self.m_FriendsInfos.forEach(
//                            function(friendInfo)
//                            {
//                                friendInfo.loadSocialInfo();
//                            }
//                        );
//                    }
//                    else
//                    {
//                        cc.log("没有好友");
//                    }
                }
                else
                {
                    manager.fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_FROM_HOME_FAILED);
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    applyFriendsInfosFromHome: function(manager)//弃用
    {
//        cc.log("applyFriendsInfosFromHome .......");
//        var self = this;
//        this.m_HashFriendsInfosByUid = {};
//
//        //
//        var ids = [];
//        this.m_FriendsInfos.forEach(
//            function(friendData)
//            {
//                ids.push(friendData.id);
//            }
//        );
//
//        if (ids.length <= 0)
//        {
//            return this;
//        }
//
//        //
//        cc.NodeSelf.getInstance().getFriendsInfo(
//            cc.NodeSelf.getInstance.getRoleId(),
//            _ParseChannel("applyFriendsInfosFromHome"),
//            ids,
//            function(result, packet)
//            {
//                if (result && packet)
//                {
//                    cc.log("获取游戏好友成功了");
//                    self.m_FriendsInfos.forEach(
//                        function(friendData, index, array)
//                        {
//                            var datasArray = packet[friendData.id];
//                            var isValid = (datasArray && datasArray.length > 0 && friendData.id);
//                            if (isValid)
//                            {
//                                friendData.setInfoFromHome(datasArray);
//                                self.m_HashFriendsInfosByUid[friendData.getID()] = friendData;
//                            }
//                            else
//                            {
//                                array[index].invalid = true;
//                                cc.log("array[index].invalid = " + friendData);
//                            }
//                        }
//                    );
//
//                    //过滤一下
//                    self.m_FriendsInfos = self.m_FriendsInfos.filter(
//                        function(info)
//                        {
//                            return !info.invalid;
//                        }
//                    );
//
//                    //
//                    BIMng.getBISocial().logFriendsCount(self.getFriendsInfosSize());
//
//                    //
//                    if (manager)
//                    {
//                        manager.fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_FROM_HOME_SUCC);
//                        joyCommon.getInstance().downUserPhoto(self.m_FriendsInfos , function(jsonData){
//                            var obj = JSON.parse(jsonData);
//                            var photoArray = obj.data;
//                            photoArray.forEach(
//                                function(userPhoto)
//                                {
//                                    cc.log("userPhoto : roleid : " + userPhoto.roleid + " url : " + userPhoto.url);
//                                }
//                            );
//
//                            PhotoLoad.getInstance().handle(photoArray);
//                        });
//                    }
//                }
//                else
//                {
//                    cc.log("获取好友失败了");
//                    self.m_FriendsInfos = [];
//
//                    if (manager)
//                    {
//                        manager.fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_FROM_HOME_FAILED);
//                        joyCommon.getInstance().downUserPhoto(self.m_FriendsInfos , function(jsonData){
//                            var obj = JSON.parse(jsonData);
//                            var photoArray = obj.data;
//                            photoArray.forEach(
//                                function(userPhoto)
//                                {
//                                    cc.log("userPhoto : roleid : " + userPhoto.roleid + " url : " + userPhoto.url);
//                                }
//                            );
//
//                            PhotoLoad.getInstance().handle(photoArray);
//                        });
//                    }
//                }
//            }
//        );
//
//        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    applyFriendsGameLevelScoresFromHome: function(gameLevelName, manager)
    {
        cc.log("要分数的数据________________________________________________________ = " + this.m_FriendsInfos.length);

        if (this.m_FriendsInfos.length <= 0)
        {
            return this;
        }

        var self = this;

        var newApply = new ApplyFriendScore(gameLevelName, 60);
        newApply.finish = function()
        {
            var friends = [];

            var result = newApply.getResult();
            for (var id in result)
            {
                if (!result.hasOwnProperty(id))
                {
                    continue;
                }

				cc.log("newApply.finish id = " + id);
                //
                var friendData = self.m_HashFriendsInfosByUid[id];
                if (friendData)
                {
                    var scoreValue = result[id];
                    //
                    friendData.setGameLevelScore(gameLevelName, scoreValue);
                    if (scoreValue > 0)
                    {
                        friends.push(friendData);
                    }
                }
            }

            cc.log("获取好友 关卡数据 = " + gameLevelName + ": " + friends);
            manager.fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_SCORE_SUCC, friends);
        };

        //
        newApply.apply(this.m_FriendsInfos);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    giveFriendHeart: function(uId, count, manager)
    {
        //
        var friendInfo = this.getFriendsInfosByUid(uId);
        if (!friendInfo)
        {
            cc.log("giveFriendHeart 没有这个好友 = " + uId);
            manager.fireEvent(_FRIENDS_MNG_EVENT.GIVE_FRIEND_HEART_FAILED, GIVE_FRIEND_HEART_RESULT.NO_FRIEND);
            return this;
        }

        var callBack = function(result, param1, param2)
        {
            //
            cc.log("赠送好友薄荷糖 giveFriendHeart 结果 = " + result);

            //
            if (result)
            {
                cc.log("赠送好友薄荷糖成功 CD = " + param1);
                friendInfo.setGiveHeartTime(param1);
				KakaoJoyInterface.getInstance().sendMessageForSendHeart(friendInfo.getID());
                //
                manager.fireEvent(_FRIENDS_MNG_EVENT.GIVE_FRIEND_HEART_SUCC, [friendInfo]);
            }
            else
            {
                if (param2 && param2.message)
                {
					if (Defines.IS_EN){
						showMessageToast("Cooling down...");
					}
					else {
					    showMessageToast(param2.message);
					}

                }

                manager.fireEvent(_FRIENDS_MNG_EVENT.GIVE_FRIEND_HEART_FAILED);
            }

            //
            BIMng.getBISocial().logSendHeartToFriend(result);
        };

        //
        cc.NodeSelf.getInstance().givePowerToFriend(uId, 1, callBack);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    askFriendHeart: function(uId, count, manager)
    {
        var friendInfo = this.getFriendsInfosByUid(uId);
        if (!friendInfo)
        {
            return this;
        }

        var callBack = function(result, newCD)
        {
            cc.log("_____________askFriendHeart callBack");

            if (result)
            {
                cc.log("_____________askFriendHeart result = " + result);
                friendInfo.setAskHeartTime(newCD);
				if (cc.GUIAskHeartKakao.getInstance().isWindowOpen()){
				   cc.GUIAskHeartKakao.getInstance().reloadTableView();
				}

                KakaoJoyInterface.getInstance().sendMessageForAskHeart(friendInfo.getID());
                if (manager)
                {
                    cc.log("_____________askFriendHeart newCD = " + newCD);
                    manager.fireEvent(_FRIENDS_MNG_EVENT.ASK_FRIEND_HEART_SUCC, [friendInfo]);
                }

                cc.GUITaskKakao.getInstance().addTaskScore(Task.TaskID.DAILY_ASK_HEART,1);
                cc.GUITaskKakao.getInstance().addTaskScore(Task.TaskID.WEEKEND_ASK_HEART,1);
                cc.GUIAchievement.getInstance().addAchievementScore(Achieve.AchieveType.TYPE_ASK_HEART.toString(),1);
            }
            else
            {
                if (manager)
                {
                    manager.fireEvent(_FRIENDS_MNG_EVENT.ASK_FRIEND_HEART_FAILED);
                }
            }

            //
            BIMng.getBISocial().logAskFriendForHeart(result);
        };

        //
        cc.log("_____________askFriendHeart begPowerToFriend");
        cc.NodeSelf.getInstance().begPowerToFriend(uId, 1, callBack);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    begHelpToFriends: function(friendsIds, gameLevelIndx, manager)
    {
        var self = this;
        var callBack = function(result, cdtimes)
        {
            cc.log("begHelpToFriends___________________________1");

            if (result)
            {
                cc.log("begHelpToFriends___________________________2");
                var finFriends = [];

                //cc.log('cdtimes is ' + JSON.stringify(cdtimes));
                friendsIds.forEach(
                    function(friendRoleId)
                    {
                        var a_friend = self.getFriendInfoByRoleId(friendRoleId);
                        if (a_friend)
                        {
                            //
                            cc.log("friendRoleId = " + friendRoleId);
                            cc.log("a_friend = " + a_friend);
                            cc.log("cdtimes = " + cdtimes[friendRoleId]);

                            //
                            a_friend.setHelpTime(cdtimes[friendRoleId]);
                            if(cc.GUIAskHelpKakao.getInstance().isWindowOpen())
                            {
                                cc.GUIAskHelpKakao.getInstance().reloadTableView();
                            }

                            finFriends.push(a_friend);
                        }
                    }
                );

                if (manager)
                {
                    cc.log("begHelpToFriends___________________________3");
                    finFriends.forEach(
                        function(a_friend)
                        {
                            cc.log("a_friend = " + a_friend);
                        }
                    );

                    manager.fireEvent(_FRIENDS_MNG_EVENT.ASK_FRIEND_HELP_SUCC, finFriends);
                }
            }
            else
            {
                if (manager)
                {
                    manager.fireEvent(_FRIENDS_MNG_EVENT.ASK_FRIEND_HELP_FAILED);
                }
            }

            //
            BIMng.getBISocial().logAskFriendForHelp(result);
        };

        //
        cc.log("begHelpToFriends___________________________0" + JSON.stringify(friendsIds));
        cc.NodeSelf.getInstance().begStageHelpToFriends(
            friendsIds.concat(),
            gameLevelIndx,
            callBack
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    loadUserPhotoUrl: function(datas, manager)
    {
        if (datas.length <= 0)
        {
            return this;
        }

        var self = this;
        var friends = [];
        datas.forEach(
            function(a_data)
            {
                var bFriendInGame = true;
                var a_friend = self.getFriendInfoByRoleId(a_data.roleid);
                if(!a_friend)
                {
                    a_friend = self.getOtherFriendsInfosByRoleId(a_data.roleid);
                    bFriendInGame = false;
                }
                cc.log("a_data.roleid = " + a_data.roleid);
                if (a_friend)
                {
                    //cc.log("\n");  cc.log("\n");cc.log("\n");cc.log("\n");cc.log("\n");
                    cc.log("a_data.url = " + a_data.url);
                    a_friend.setPhotoUrl(a_data.url);
                    if(bFriendInGame)
                    {
                        friends.push(a_friend);
                    }
                }


            }
        );

        if (manager)
        {
            manager.fireEvent(_FRIENDS_MNG_EVENT.LOAD_PHOTO, friends);
        }

        return this;
    }
});

Impl_FriendsMngPhone.create = function(ditchName)
{
    return new Impl_FriendsMngPhone(ditchName);
};

