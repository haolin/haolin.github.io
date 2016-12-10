//======================================================================================================================
var FriendInfo = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.nick = "";
        this.id = "";
        this.avatar = "";
        this.phone = "";

        //
        this.roleId = "";
        this.maxFinGameLevelCount = 0;
        this.askHeartTime = 0;
        this.giveHeartTime = 0;
        this.helpGameLeveIndex = 0;
        this.helpTime = 0;
        this.maxFinSpaceLevelCount = 0;

		//总分 总关卡 周总分
        this.total_Score = 0;
        this.total_Level = 0;
        this.weekly_Score = 0;

        this.supported_device = 0;
        this.message_blocked = false;

        this.gameLevelScore = {};
        //
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(nick, id, avatar, phone)
    {
        //
        this.nick = nick;
        this.id = id;
        this.setPhotoUrl(avatar);
        this.phone = phone;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    initNew: function(uid, nick, avatar, roleid, score1, score2, give_power_cd, beg_power_cd, stage_help_cds, supported_device, message_blocked)
    {
        //
        cc.log("friendInfo initNew");
        this.id = uid;
        this.nick = nick;
        this.setPhotoUrl(avatar);
        this.roleId = roleid;

        //
        this.maxFinGameLevelCount = score1;
        this.maxFinSpaceLevelCount = score2;

        //
        this.giveHeartTime = give_power_cd;
        this.askHeartTime = beg_power_cd;
        cc.log("supported_device: " + supported_device);
        this.supported_device = supported_device;
        cc.log("this.supported_device: " + this.supported_device);
        cc.log("message_blocked: " + message_blocked);
        this.message_blocked = message_blocked;
        cc.log("this.message_blocked: " + this.message_blocked);

        //TODO
        cc.log("___________________________________");

        cc.log("社交好友:" + " id = " + this.id + ", roleId = " + this.roleId);
        cc.log("名字 = " + this.nick);

        cc.log("头像照片地址 = " + this.getPhotoUrl());

        //
        cc.log("完成普通关卡数量 = " + this.maxFinGameLevelCount);
        cc.log("完成空间站关卡数量 = " + this.maxFinSpaceLevelCount);

        //
        cc.log("给好友薄荷糖CD = " + this.giveHeartTime);
        cc.log("向好友请求薄荷糖CD = " + this.askHeartTime);

        return this;
    },

    setScoreUpData : function(Score)
    {
        this.weekly_Score = Score;
        return this;
    },

    getScoreUpData : function()
    {
        return this.weekly_Score;
    },

    setTotalScore : function(score)
    {
        this.total_Score = score;
    },

    getTotalScore: function()
    {
//        if (this.total_Score != 0){
//            return this.total_Score;
//        }
//
//        for (var gameLevelIndx in this.gameLevelScore)
//        {
//            if (!this.gameLevelScore.hasOwnProperty(gameLevelIndx))
//            {
//                continue;
//            }
//
//            this.total_Score += this.gameLevelScore[gameLevelIndx];
//        }

        return this.total_Score;
    },

    setTotalLevel : function(level)
    {
        this.total_Level = level;
        cc.log("this.total_Level = " + this.getTotalLevel());
    },

    getTotalLevel : function()
    {
        if (this.total_Level > 0){
            return this.total_Level - 1;
        }
        return 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    setPhotoUrl: function(photoUrl)
    {
        this.avatar = photoUrl;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getPhotoUrl: function()
    {
        return this.avatar;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        //
        var base =  "" +
            "nick:" + this.nick + ", " +
            "id:" + this.id + ", " +
            "roleId:" + this.roleId + ", " +
            "maxlevel:" + this.getMaxGameLevelIndx() + ", " +
            "askHeartTime:" + this.askHeartTime + ", " +
            "giveHeartTime:" + this.giveHeartTime + ", " +
            "helpGameLeveIndex:" + this.helpGameLeveIndex + ", " +
            "helpTime:" + this.helpTime + ", " +
            "maxFinSpaceLevelCount:" + this.maxFinSpaceLevelCount;

        //
        var aboutScore = "";
        var self = this;
        for (var gameLevelIndx in this.gameLevelScore)
        {
            if (!this.gameLevelScore.hasOwnProperty(gameLevelIndx))
            {
                continue;
            }

            aboutScore += ("(" + gameLevelIndx + ", " + self.gameLevelScore[gameLevelIndx] + ")");
        }

        if (aboutScore != "")
        {
            base += (" =>" + aboutScore);
        }

        return base;
    },

    //------------------------------------------------------------------------------------------------------------------
    setInfoFromHome: function(infosArray)
    {
        //
        var PARSE = {
            ROLE_ID: 0,
            MAX_FIN_GAME_COUNT: 1,
            ASK_HEART_CD: 2,
            GIVE_HEART_CD: 3,
            HELP_INFO: 4,
            MAX_FIN_SPACE_COUNT: 5
        };

        //
        this.roleId = infosArray[PARSE.ROLE_ID];
        this.maxFinGameLevelCount = infosArray[PARSE.MAX_FIN_GAME_COUNT];
        //this.setMaxGameLevelIndx(infosArray[PARSE.MAX_FIN_GAME_COUNT]);
        this.askHeartTime = infosArray[PARSE.ASK_HEART_CD];
        this.giveHeartTime = infosArray[PARSE.GIVE_HEART_CD];

        //
        var helpInfo = infosArray[PARSE.HELP_INFO];
        if (helpInfo)
        {
            this.helpGameLeveIndex = helpInfo.stageid;
            this.helpTime = helpInfo.cd;
        }

        //
        this.maxFinSpaceLevelCount = infosArray[PARSE.MAX_FIN_SPACE_COUNT];

        return this;
    },

    getRealLength: function(str){
        var realLength = 0;
        var len = str.length;
        var charCode = -1;

        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return realLength;
    },

    getRealDrop: function(str,length){
        var realLength = 0;
        var len = str.length;
        var charCode = -1;

        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
            if (realLength > length){
                return i;
            }
        }
        return length;
    },

    //------------------------------------------------------------------------------------------------------------------
    getID: function()
    {
        return this.id;
    },

    //------------------------------------------------------------------------------------------------------------------
    getRoleId: function()
    {
        return this.roleId;
    },

    //------------------------------------------------------------------------------------------------------------------
    getName: function(length)
    {
        if (!length){
            return this.nick;
        }

        if (this.getRealLength(this.nick) > length){
            var real_str = this.nick.substring(0 , this.getRealDrop(this.nick, length));
            return real_str + "...";
        }
        else {
            return this.nick;
        }
    },

    getSupportedDevice: function()
    {
        return this.supported_device;
    },

    getMessageBlocked: function()
    {
        return this.message_blocked;
    },

    setMessageBlocked: function( bBlocked )
    {
        this.message_blocked = bBlocked;
    },

    //------------------------------------------------------------------------------------------------------------------
    /*setMaxGameLevelIndx: function(maxFinGameLevelCount)
    {
        this.maxFinGameLevelCount = maxFinGameLevelCount;
        return this;
    },*/

    //------------------------------------------------------------------------------------------------------------------
    //正常关卡的ID
    getMaxGameLevelIndx: function()
    {
        var indx = this.maxFinGameLevelCount - 1;
//        cc.log("this.maxFinGameLevelCount");
        if (indx < 0)
        {

//            for (var gameLevelIndx in this.gameLevelScore)
//            {
//                cc.log("getMaxGameLevelIndx = " + gameLevelIndx);
//                if (!this.gameLevelScore.hasOwnProperty(gameLevelIndx))
//                {
//                    continue;
//                }
//
//                indx = cc.DataMng.getInstance().getLevelDataWithName(gameLevelIndx).ID + 1;
////                aboutScore += ("(" + gameLevelIndx + ", " + self.gameLevelScore[gameLevelIndx] + ")");
//            }
//            if (indx < 0 ){
                indx = 0;
//            }
//            indx = 0;
        }

        return indx;
    },

    //------------------------------------------------------------------------------------------------------------------
    //没有玩挑战关卡时，完成的挑战关卡数是0，挑战关卡的ID是-1
    //注：挑战关卡的ID是-1时不可返回0，否则认为是第一关挑战关卡已玩过,外部调用需判断
    getMaxSpaceLevelIndx: function()
    {
        return this.maxFinSpaceLevelCount - 1;
    },

    //------------------------------------------------------------------------------------------------------------------
    //真正的最远关卡
    getFinMaxLevelName: function()
    {
        var maxNorID = this.getMaxGameLevelIndx();
        var maxSpaceID = this.getMaxSpaceLevelIndx();

        var isNormalMax = maxSpaceID < 0 || GUI._CompareNorLevelWithSpaceLevel(maxNorID, maxSpaceID);
        var maxLevelIndx = isNormalMax ? maxNorID : maxSpaceID;

        var maxLevelData = cc.DataMng.getInstance().getLevelDataWithID(maxLevelIndx, !isNormalMax);

        return maxLevelData.NAME;
    },

    //------------------------------------------------------------------------------------------------------------------
    //所在星球
    getCurrentMap: function()
    {
        var nLevel = this.getMaxGameLevelIndx();
        cc.log("nLevel = " + nLevel);

        for (var prop in GUI.MAP_DEFINE)
        {
            if (GUI.MAP_DEFINE.hasOwnProperty(prop))
            {
                var minID = GUI.MAP_DEFINE[prop].MIN_LEVEL_ID;
                var maxID = GUI.MAP_DEFINE[prop].MAX_LEVEL_ID;

                if( nLevel >= minID && nLevel <= maxID)
                {
                    return GUI.MAP_DEFINE[prop].NAME;
                }
            }
        }

        return "";
    },

    //------------------------------------------------------------------------------------------------------------------
    setGameLevelScore: function(gameLevelName, scoreValue)
    {
        scoreValue = scoreValue || 0;
        this.gameLevelScore[gameLevelName] = scoreValue;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getGameLevelScore: function(gameLevelName)
    {
        this.gameLevelScore[gameLevelName] = this.gameLevelScore[gameLevelName] || 0;
        return this.gameLevelScore[gameLevelName];
    },

    //------------------------------------------------------------------------------------------------------------------
    setGiveHeartTime: function(giveHeartTime)
    {
        this.giveHeartTime = giveHeartTime;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getGiveHeartTime: function()
    {
        return this.giveHeartTime;
    },

    //------------------------------------------------------------------------------------------------------------------
    setAskHeartTime: function(askHeartTime)
    {
        this.askHeartTime = askHeartTime;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getAskHeartTime: function()
    {
        return this.askHeartTime;
    },

    //------------------------------------------------------------------------------------------------------------------
    getHelpTime: function()
    {
        if(!this.helpTime)
        {
            cc.log("第一次使用askHeartTime初始化为0");
            this.helpTime = 0;
        }
        return this.helpTime;
    },

    //------------------------------------------------------------------------------------------------------------------
    setHelpTime: function(cdTime)
    {
        this.helpTime = cdTime;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    loadSocialInfo: function()
    {
        //
        var self = this;

//        //
        var callBack = function(id, info)
        {
            cc.log("返回了一个结果 = " + id);

            var json = JSON.parse(info);
            if (parseInt(json.state) > 0)
            {
                //
                self.init(json.data.nick,
                    id,
                    json.data.avatar,
                    json.data.phone);

                //
				if (json.data.avatar != ""){
				    cc.log(id + "社交信息获取成功, 开始下载照片");

					//
					joyCommon.getInstance().downUserPhoto(
						[self],
						function(jsonData)
						{
							var obj = JSON.parse(jsonData);
							obj.data.forEach(
								function(userPhoto)
								{
									cc.log("userPhoto : jsonData : " + JSON.stringify(userPhoto));
								}
						);

						PhotoLoad.getInstance().handle(obj.data);
					});
				}

            }
            else
            {
                //
                cc.log(id + "社交信息获取失败");
            }
        };

        //
        cc.log("开始下载社交信息 = " + this.id);
        if(JoyType.JOY_KAKAO == JOY_FLAG)
        {
//			if (json.data.avatar != ""){
			    joyCommon.getInstance().downUserPhoto(
                [self],
                function(jsonData)
                {
                    var obj = JSON.parse(jsonData);
                    obj.data.forEach(
                        function(userPhoto)
                        {
                            cc.log("userPhoto : roleid : " + userPhoto.roleid + " url : " + userPhoto.url);
                            cc.log(self.toString());
                        }
                    );

                    PhotoLoad.getInstance().handle(obj.data);
                }
            );
//			}
        }
        else
        {
            GetInfoFromUid(this.id, callBack);
        }


        //
        return this;
    }
});

//
FriendInfo.create = function(_joyFriend)
{
    var createNew = new FriendInfo();
    if (createNew)
    {
        createNew.init(_joyFriend.nick,
            _joyFriend.id,
            _joyFriend.avatar,
            _joyFriend.phone);
    }

    return createNew;
};

//
FriendInfo.createEx = function(uid, array)
{
    return (new FriendInfo()).init("", uid, "", "").setInfoFromHome(array);
};

//
FriendInfo.createByHomeData = function(a_friendData)
{
    return (new FriendInfo()).initNew(
        a_friendData["user_id"],    //uid
        a_friendData["nickname"],    //nick
        a_friendData["profile_image_url"],    //avatar
        a_friendData["user_id"],    //roleid
        0,//a_friendData[4],    //score1
        0,//a_friendData[5],    //score2
        0,//a_friendData[6],    //give_power_cd
        0,//a_friendData[7],    //beg_power_cd
        0,//a_friendData[8]     //stage_help_cds
        a_friendData["supported_device"],
        a_friendData["message_blocked"]
    );
};

//
var FriendInfoSelf = FriendInfo.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        this.lastGameLevelScore = {};
    },

    //------------------------------------------------------------------------------------------------------------------
    setLastGameLevelScore: function(gameLevelName, scoreValue)
    {
        scoreValue = scoreValue || 0;
        this.lastGameLevelScore[gameLevelName] = scoreValue;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getLastGameLevelScore: function(gameLevelName)
    {
        this.lastGameLevelScore[gameLevelName] = this.lastGameLevelScore[gameLevelName] || 0;
        return this.lastGameLevelScore[gameLevelName];
    }
});

//
var FriendInfoInvite = FriendInfo.extend({

});

//
FriendInfo.createSelf = function(gameLevelName)
{
    var createNew = new FriendInfoSelf();
    if (createNew)
    {
        //
        createNew.init(cc.NodeSelf.getInstance().getNick(),
            cc.NodeSelf.getInstance().getUID() ? cc.NodeSelf.getInstance().getUID().toString() : "",
            cc.NodeSelf.getInstance().getSelfPhoto() != "" ? cc.NodeSelf.getInstance().getSelfPhoto() : "",
            "");

        //
        var levelData = cc.DataMng.getInstance().getLevelDataWithName(gameLevelName);
        if (levelData)
        {
            //
           /* cc.log("\n");cc.log("\n");cc.log("\n");cc.log("\n");
            cc.log("gameLevelName = " + gameLevelName);
            cc.log("LAST_HISTORY_MAX_SCORE = " + levelData.LAST_HISTORY_MAX_SCORE.get());
            cc.log("HISTORY_MAX_SCORE = " + levelData.HISTORY_MAX_SCORE.get());
            cc.log("\n");cc.log("\n");cc.log("\n");cc.log("\n");*/

            //
            createNew.setLastGameLevelScore(gameLevelName, levelData.LAST_HISTORY_MAX_SCORE.get());
            createNew.setGameLevelScore(gameLevelName, levelData.HISTORY_MAX_SCORE.get());
        }
    }

    return createNew;
};

FriendInfo.createSelfForTotalScore = function()
{
    var createNew = new FriendInfoSelf();
    if (createNew)
    {
        //
        createNew.init(cc.NodeSelf.getInstance().getNick(),
            cc.NodeSelf.getInstance().getUID() ? cc.NodeSelf.getInstance().getUID().toString() : "",
            cc.NodeSelf.getInstance().getSelfPhoto() != "" ? cc.NodeSelf.getInstance().getSelfPhoto() : "",
            "");

        //

        createNew.setScoreUpData(cc.DataMng.getInstance().getWeeklyScore());


        var totalData = cc.DataMng.getInstance().getTotalData();
        createNew.setTotalScore(totalData[0]);
        createNew.setTotalLevel(totalData[1]);
    }

    return createNew;
};


//
FriendInfo.createTest = function(_name, _photo, giveHeartCD)
{
    var name = _name || "TestFriend";
    var photo = _photo || Resource.normalGrid;

    var createNew = new FriendInfo();
    if (createNew)
    {
        createNew.init(
            name,
            "0",
            photo,
            "");

        if (giveHeartCD && giveHeartCD > 0)
        {
            createNew.setGiveHeartTime(_LocalTime()/1000 + giveHeartCD);
        }
    }

    return createNew;
};

//
FriendInfo.createInvite = function()
{
    var createNew = new FriendInfoInvite();
    if (createNew)
    {
        createNew.init(Resource.ChineseTxt[86],
            "",
            "",
            "");
    }

    return createNew;
};

//======================================================================================================================
var ContactInfo = cc.Class.extend({

    //
    ctor: function()
    {
        this.is_friend = 0;
        this.phone = "";

        this.nick = "";
        this.sortkey = "";
        this.qid = "";
        this.avatar = "";

        //
        this.last_invited_time = 0;
        this.is_invited = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    getName: function()
    {
        return this.nick;
    },

    //------------------------------------------------------------------------------------------------------------------
    getPhone: function()
    {
        return this.phone;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(is_friend, phone, nick, sortkey, qid, avatar, last_invited_time, is_invited)
    {

        //
        this.is_friend = is_friend;
        this.phone = phone;

        this.nick = nick;
        this.sortkey = sortkey;
        this.qid = qid;
        this.avatar = avatar;

        //
        this.last_invited_time = last_invited_time;
        this.is_invited = is_invited;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return this.nick + ", " + this.phone;
    }
});

//
ContactInfo.create = function(contactData)
{
    var createNew = new ContactInfo();
    if (createNew)
    {
        createNew.init(contactData.is_friend,
            contactData.phone,
            contactData.nick,
            contactData.sortkey,
            contactData.qid,
            contactData.avatar,
            contactData.last_invited_time,
            contactData.is_invited);
    }

    return createNew;
};

//
ContactInfo.createTest = function(name)
{
    var createNew = new ContactInfo();
    if (createNew)
    {
        createNew.nick = name || "ContactInfo";
    }

    return createNew;
};


