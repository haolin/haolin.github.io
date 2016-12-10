/**
 * 用户系统sdk封装
 * @type {*}
 */

var OPjoyInterface = joyBase.extend({

    init : function(){
        this.callBackArray = {};
        this.downloadCallArray = [];//下载图片回调数组
    },

    registCallBack : function(key , callBack){
        cc.log("registCallBack, key = " + key);
        this.callBackArray[key] = callBack;
    },

    handlerCallBack : function(key , data){
        cc.log("key = " + key + " data : " + data);
        this.callBackArray[key](data);
    },

    isEnabledAutoLogin : function(sucCall , failCall , joyFlag){
       cc.log("is can auto login " + joyFlag);
       var joysdk = opJoy.OpJoy();
       var self = this;
       self.autoSucCall = sucCall;
       self.autoFailCall = failCall;
       self.registCallBack("isAuto" , function(data){self.isAutoLogin(data);});

       joysdk.isAutoLogin(joyFlag);
    },

    isAutoLogin : function(data){
        cc.log("OPJoyInterface : isAuto Login " + data);
        var self = this;
        if(data == null){
           if(self.loginFailCall){
                self.loginFailCall();
           }
           return;
        }

        var jsonObj = JSON.parse(data);
        var status = jsonObj.state;
        switch(status){
            case 1:
                if(self.autoSucCall)self.autoSucCall();
                break;
            case 0:
                if(self.autoFailCall)self.autoFailCall();
                break;
        }
    },

    //登陆接口
    login : function(sucCall , failCall , joyFlag){
        cc.log("begin to login in js " + joyFlag);
        var joysdk = opJoy.OpJoy();
        var self = this;
        self.loginSucCall = sucCall;
        self.loginFailCall = failCall;

        self.registCallBack("login" ,
            function(data){
                cc.log("get login callback");
                self.postServerToGetInfo(data);});

        joysdk.login(joyFlag);
    },
	
    /**
     * code : xxxx,          第三方code or token
     * name : xxx,
     * avatar : xxx
     * passport : weibo/coco/qihoo
     *
     * @param data
     */
    postServerToGetInfo : function(data){
        var self = this;
		
		cc.log("postServerToGetInfo = " + data);
		
        if(data == null || data == ""){
           this.joyLoginBack(data);
           return;
        }
        var jsonData = JSON.parse(data);

        var status = jsonData.state;
        var un = "";
        var avatar = "";

		cc.log("postServerToGetInfo");
        switch(status){
            case 0:
                self.joyLoginBack(data);
                break;
            case 1:
			    var passport = jsonData.data.passport;
                JOY_PASSPORT =  passport;
				
				cc.log("passport ==  " + passport);
				if (passport == "kakao"){
					var thirdCode =
					{"access_token" : jsonData.data.code,
					"user_id" : jsonData.data.userid,
					"nick" : jsonData.data.un,
					"avatar" : jsonData.data.avatar
					}//jsonData.data.code;
				}
				else {
					var thirdCode = jsonData.data.code;
				}

                un = jsonData.data.un;
                avatar = jsonData.data.avatar;
                cc.log("applyGameServerAccess: " + JSON.stringify(thirdCode));
                cc.NodeSelf.getInstance().applyGameServerAccess(passport , thirdCode ,function(bOk , obj){
					cc.log("postServerToGetInfo callback bOK = " + bOk);
					
                     if(!bOk){
                         self.joyLoginBack(null); //登陆失败的具体原因，待细化
                         return;
                     }
                     obj.un = un;
                     obj.avatar = avatar;
                     var respJsonData = {};
                     respJsonData.state = 1;
                     respJsonData.data = obj;

                     self.joyLoginBack(JSON.stringify(respJsonData));
                });
                break;
        }
    },

    joyLoginBack : function (data){
        cc.log("OPJoyInterface  : Login ...... callback : " + data);
        var self = this;
        if(data == null){
            if(self.loginFailCall)
				{
				self.loginFailCall();
				}
            return;
        }
        var jsonObj = JSON.parse(data);
        var status = jsonObj.state;
        switch(status){
            case 1:   //登录成功
                jsonObj.data.roleidx = parseInt(jsonObj.data.roleidx);

                g_player.cocoId = jsonObj.data.userid;
                g_player.token = jsonObj.data.token;
                g_player.name = jsonObj.data.un;
                g_player.roleId = jsonObj.data.roleid;//.userid;//
                g_player.avatar = jsonObj.data.avatar;
                g_player.roleIdx = jsonObj.data.roleidx;
                g_player.isfirst = jsonObj.data.isfirst;
                g_player.createat = jsonObj.data.createat;

                //如果是360，或coco joy,还得把token传到java层
                self.loginCallBack(jsonObj.data.token ,jsonObj.data.userid);
				
//				if (g_player.avatar.length > 0){
					self.downSelfPhoto(g_player.roleId , g_player.avatar);
//				}

                cc.log("game roleid = " + g_player.roleId
                    + " roleidx = " + g_player.roleIdx
                    + " joy_userId = " + g_player.cocoId
                    + "  joy_token = " + g_player.token
                    + "  joy_name = " + g_player.name
                    + " avatar : " + g_player.avatar
                    + " createat : " + g_player.createat);

                var joysdk = opJoy.OpJoy();
                //test code :  joysdk.addGetUidInfo("1525239220");

                cc.NodeSelf.getInstance().configure(ROBOT_IMEI , g_player.roleId , g_player.token, g_player.roleIdx, g_player.cocoId, g_player.name);
                //cc.NodeHelper.getInstance().onPassportAuthorization(_ParseChannel(), jsonObj.data.coco, jsonObj.data.roleid, jsonObj.data.roleidx, jsonObj.data.tkn);
                if(self.loginSucCall){
                   self.loginSucCall(jsonObj.data); //jsonObj.isfirst
                }
                break;
            case 0:   //登录失败
                cc.log("OPJoyInterface : Login .... errors : " + jsonObj.error);
                if(self.loginFailCall){
                   self.loginFailCall();
                }
                break;
        }
    },

    loginCallBack : function(token , cocoid){
        var joysdk = opJoy.OpJoy();
        joysdk.loginCallBack(token , cocoid)
    },

    JoyPayCallBack : function(data){
        var self = this;
        cc.log("OPJoyInterface : JoyPayCallBack : " + data);
        if(data == null){
            if(self.payFailCall != null)self.payFailCall();
            return;
        }

        var jsonObj = JSON.parse(data);
        var status = jsonObj.status;

        switch(status){
            case 1:   //suc

                self.paySucCall(jsonObj.type , jsonObj.payid);

                break;
            case 0:   //pay fail
                cc.log("OPJoyInterface : pay .... errors : " + jsonObj.error);
                self.payFailCall(data);
                break;
            case -1://pay cancel
                self.payFailCall(data);
                break;
        }
    },

    pay : function(paySucCall , payFailCall , type, payid , roleid , billInfo){
        var joysdk = opJoy.OpJoy();
        var self = this;
        self.paySucCall = paySucCall;
        self.payFailCall = payFailCall;
        self.registCallBack("pay" , function(data){self.JoyPayCallBack(data);});
        var strBillInfo = JSON.stringify(billInfo);
        joysdk.payBilling(type , payid , roleid , strBillInfo);
    },

    //{"is_friend":0,"phone":"a8f2fad1352dd80910dcfc825fd995f9","nick":"","sortkey":"0","qid":"","last_invited_time":0,"is_invited":0,"avatar":" , cun:"}
    readContactList : function(readConSucCall , readConFailCall , ask){
        g_contactInfoList.splice(0 , g_contactInfoList.length);
        var self = this;
        self.readConSucCall = readConSucCall;
        self.readConFailCall = readConFailCall;

        var joysdk =  opJoy.OpJoy();
        self.registCallBack("readContact" , function(data){self.joyReadContactCall(data);});
        joysdk.getAbledInviteFriends();
    },

    joyReadContactCall : function(data){
        cc.log("OPJoyInterface : joyReadContactCall " + data);
        var self = this;
        if(!data){
           self.readConFailCall();
           return;
        }
        var jsonObj = JSON.parse(data);
        var status = jsonObj.state;
        cc.log("readContact : status : " + status);
        switch(status){
            case 1:
                g_contactInfoList.splice(0 , g_contactInfoList.length);
                for(var i = 0 ; i< jsonObj.data.length; i++){
                    //如果有cun这个字段，则根据其删除已经是游戏好友的人
                    var cun = jsonObj.data[i].cun;
                    do{
                        if(!cun){
                            cc.log("contact list friend : " + JSON.stringify(jsonObj.data[i]));
                            g_contactInfoList.push(jsonObj.data[i]); //先不过滤 360已经过滤
                            break;
                        }
                        var isFind = g_joyFriends.some(function(_friend){
                            if(_friend.cun == cun){
                                cc.log('have Become Friend =='+_friend.cun);
                                // _friend.nick = cun;//把昵称换成通讯录中的名字
                                return true;
                            }
                            return false;
                        });
                        if(isFind){
                            g_contactInfoList.splice(i , 1);
                            i--;
                            break;
                        }
                    }while(false);
                }
                self.readConSucCall();
                break;
            case 0:
                self.readConFailCall();
                break;
        }
    },
    //{"nick":"wmpdwaxx","id":"15017200","avatar":"http://u.qhimg.com/qhimg/quc/100_100/16/02/22/1602229q117d50.a46a31.jpg","phone":"" }//触控用户系统另外有个cun  在通讯录中的名字
    getJoyFriendsList : function(joyFriendSucCall , joyFriendFailCall){
		  cc.log("OPJOY getJoyFriendsList");
          g_joyFriends.splice(0 , g_joyFriends.length);
          var self = this;
          self.joyFriendsSucCall = joyFriendSucCall;
          self.joyFriendsFailCall = joyFriendFailCall;
          var joysdk = opJoy.OpJoy();
          self.registCallBack("getJoyFriends" , function(data){self.getJoyFriendDispater(data);});
          joysdk.getJoyGameFriends();
    },

    getJoyFriendsListMessageBlock: function(joyFriendSucCall , joyFriendFailCall)
    {
        cc.log("OPJOY getJoyFriendsListMessageBlock");
//        g_joyFriends.splice(0 , g_joyFriends.length);
        var self = this;
        self.joyFriendsMessageBlockSucCall = joyFriendSucCall;
        self.joyFriendsMessageBlockFailCall = joyFriendFailCall;
        var joysdk = opJoy.OpJoy();
        self.registCallBack("getJoyFriends" , function(data){self.getJoyFriendMessageBlock(data);});
        joysdk.getJoyGameFriends();
    },

    getJoyFriendDispater : function(data){
        cc.log("getJoyFriendDispater : " + data);
        var self = this;
        if(data == null){
           self.joyFriendsListCall(data);
           return;
        }

        var obj = JSON.parse(data);
        var passport = obj.passport;
        cc.log("passport : " + passport);
        if(passport == "kakao" || passport == "qihoo" || passport == "coco"){
           cc.log("kakao joyFriendsListCall");
           self.joyFriendsListCall(data);
           return;
        }
        var state = obj.state;
        var hasNext = obj.hasNext;

        switch(state){
            case 0:
                self.joyFriendsListCall(data);
                break;
            case 1:{
                var ids = obj.data;
                
                cc.log("ids  = " + JSON.stringify(ids));

                if(ids.length == 0){
                    cc.log("joyFriends is " + JSON.stringify(g_joyFriends));
                    self.joyFriendsSucCall();
                    break;
                }

                cc.NodeSelf.getInstance().validPassportFriends(passport , ids , function(isOk , data){
                    cc.log("clean joy friends array : " + JSON.stringify(data));
                     if(!isOk){
                         self.joyFriendsListCall(null);
                         return;
                     }
                     var friendIds = data;
                     if(data != null && data != undefined){
                        g_joyFriends = g_joyFriends.concat(data);
                        cc.log("g_joyFriends is " + JSON.stringify(g_joyFriends));
                     }
                     for(var j = ids.length -1 ; j >= 0 ; j--){
                          var friendId = ids[j];
                          var isFriend = false;
                          for(var m = 0 ; m < g_joyFriends.length ; m++){
                              var id = g_joyFriends[m];
                              if(id != null && id != "" && id == friendId){
                                  isFriend = true;
                                  break;
                              }
                          }
                          if(!isFriend){
                              g_contactInfoList.push(friendId);
                          }
                     }
                     if(!hasNext){
                         cc.log("joyFriends is " + JSON.stringify(g_joyFriends));

                         self.joyFriendsSucCall();

                     }
                });
            }
                break;
        }
    },

    getJoyFriendMessageBlock: function(data)
    {
        cc.log("getJoyFriendMessageBlock : " + data);
        var self = this;
        if(data == null){
            return;
        }

        var obj = JSON.parse(data);
        var arrFriends = obj.otherdata;

        if(!arrFriends)
        {
            cc.log("getJoyFriendMessageBlock 没有取到好友信息");
            self.joyFriendsMessageBlockFailCall();
            return;
        }

        cc.log("arrFriends: " + JSON.stringify(arrFriends));
        for(var i = 0; i < arrFriends.length; ++i)
        {
            cc.log("refresh message_blocked: " + i);
            var friendInfo = FriendsMng.getInstance().getOtherFriendInfoByRoleId(arrFriends[i].user_id);
            if(friendInfo)
            {

                cc.log("user_id: " + arrFriends[i].user_id);
                cc.log("message_blocked: " + arrFriends[i].message_blocked);
                friendInfo.setMessageBlocked(arrFriends[i].message_blocked);
            }
        }
        self.joyFriendsMessageBlockSucCall();

    },

    joyFriendsListCall : function(data){
        var self = this;
        cc.log("OPJoyInterface : joyFriendsListCall " + data);
        if(data == null){
            self.joyFriendsFailCall();
            return;
        }
        var jsonObj = JSON.parse(data);
        var status = jsonObj.state;
        var hasNext = jsonObj.hasNext;
        switch (status){
            case 1:
                g_joyFriends.splice(0 , g_joyFriends.length);
                jsonObj.data.forEach(function(friend){
                    g_joyFriends.push(friend);
                });
                for(var i = 0 ; i < g_joyFriends.length ; i++){
                    cc.log("g_joyFriends : " + JSON.stringify(g_joyFriends[i]));
                }

                if("kakao" == jsonObj.passport)
                {
                    g_otherFriends.splice(0 , g_otherFriends.length);
                    jsonObj.otherdata.forEach(function(friend){
                        g_otherFriends.push(friend);
                    });
                    for(var i = 0 ; i < g_otherFriends.length ; i++){
                        cc.log("g_otherFriends : " + JSON.stringify(g_otherFriends[i]));
                    }
                }

                if(!hasNext){
                    self.joyFriendsSucCall();
                }
//                self.joyFriendsSucCall(); //修改 by shuiliu  20140717


                break;
            case 0:
                self.joyFriendsFailCall();
                break;
        }
    },

    /**
     * 绑定账号
     * @param bindUserSucCall  绑定成功的回调
     * @param changeUserCall   切换账号的回调
     * @param bindUserCall     绑定失败的回调
     */
    bindUserInfo : function(bindUserSucCall , changeUserCall , bindUserFailCall){
         var self = this;
         self.bindUserSucCall = bindUserSucCall;
         self.changeUserCall = changeUserCall;
         self.bindUserFailCall = bindUserFailCall;
         self.registCallBack("binder"  , function(data){self.joyBindingCall(data);});
         opJoy.OpJoy().bindUserInfo(4);    // 绑定用户名传2，手机号传4
    },

    joyBindingCall : function(data){
        cc.log("OPJoyInterface : joyBindingCall " + data);
        var self = this;
        if(data == null){
           self.bindUserFailCall();
           return;
        }
        var jsonObj = JSON.parse(data);
        var status = jsonObj.state;

        switch(status){
            case 1:    //绑定成功
                var data = jsonObj.data;
                var cocoId = data.coco;
                var token = data.tkn;
                var name = data.un;
                if(cocoId != g_player.cocoId){
                    g_player.cocoId = cocoId;
                    g_player.token = token;
                    g_player.name = name;
                    self.changeUserCall();
                }else{
                    self.bindUserSucCall();
                }
                break;
            case 0:    //绑定失败
                self.bindUserFailCall();
                break;
        }
    },

    inviteFriendBySmm : function(telNum , content ,  sucCall , failCall){
        var self = this;
        self.inviteSucCall = sucCall;
        self.inviteFailCall = failCall;
        var joysdk = opJoy.OpJoy();
        self.registCallBack("invite" , function(data){self.joyInviteFriendCall(data);});
        joysdk.inviteOneFriend(telNum , content);
    },

    joyInviteFriendCall : function(data){
        cc.log("OPJoyInterface : joyInviteFriend : " + data);
        var self = this;
        if(data == null){
            self.inviteFailCall();
            return;
        }
        var jsonObj = JSON.parse(data);
        var status = jsonObj.state;
        switch(status){
            case 1:
                self.inviteSucCall();
                break;
            case 0:
                self.inviteFailCall();
                break;
        }
    },

    downUserPhoto : function(array ,downcallback){
        var self = this;
//        var key = self.downloadCallArray.length;
//        self.downloadCallArray.push(downcallback);
        cc.log("opjoy : downUserPhoto : " + array.toString());
        var photoJSON = {};
        var photoArray =[];

        for(var i = 0 ; i < array.length ; i++){
            var friend = array[i];
            cc.log("key : " + friend.getRoleId() + " url : " + friend.avatar);
            photoArray.push({
                roleid : friend.getRoleId(),
                url : friend.avatar
            });
        }
        //photoJSON.photos = photoArray;
        var joysdk = opJoy.OpJoy();

        var maxNum = 20;
        var pageNum = photoArray.length/maxNum + 1;
        for(var pageIndex = 0 ; pageIndex < pageNum ; pageIndex ++){
            var newArray = [];

            for(var k = pageIndex * maxNum ; k < (pageIndex + 1) * maxNum && k < photoArray.length; k ++){
                newArray.push(photoArray[k]);
            }

            photoJSON.photos = newArray;
            var key = self.downloadCallArray.length;
            self.downloadCallArray.push(downcallback);
			cc.log("self.downloadCallArray.length = " + key + ", photoJSON:" + JSON.stringify(photoJSON));
            joysdk.downUserPhoto(key , JSON.stringify(photoJSON));
        }
    },


    logout : function(sucCall , failCall){
        var self = this;
        self.logoutSuc = sucCall;
        self.logoutFail = failCall;
        self.registCallBack("logout"  , function(data){self.logoutCall(data);});
        opJoy.OpJoy().logout();    // 绑定用户名传2，手机号传4
    },

    logoutCall:function(data){
        cc.log("opjoy logout : " + data);
        var self = this;
        if(data == null){
           self.logoutFail();
            return;
        }
        var jsonObj = JSON.parse(data);
        var status = jsonObj.state;
        switch(status){
            case 1:
                {
                    g_joyFriends.splice(0 , g_joyFriends.length);
                    g_contactInfoList.splice(0 , g_contactInfoList.length);
                    cc.NodeSelf.getInstance().logout();

                    if (self.logoutSuc)
                    {
                        self.logoutSuc();
                    }
                }
                break;

            case 0:
                {
                    if (self.logoutFail)
                    {
                        self.logoutFail();
                    }
                }
                break;

            default:
                {
                    cc.log("logoutCall status = " + status);
                }
                break;
        }
    },

    unregister : function(sucCall , failCall){
		cc.log("begin unregister in js");
        var self = this;
        self.unregisterSuc = sucCall;
        self.unregisterFail = failCall;
        self.registCallBack("unregister"  , function(data){self.unregisterCall(data);});
        opJoy.OpJoy().unregister();
    },

    unregisterCall:function(data){
        cc.log("opjoy unregister : " + data);
        var self = this;
        if(data == null){
           self.unregisterFail();
            return;
        }
        var jsonObj = JSON.parse(data);
        var status = jsonObj.state;
		
        switch(status){
            case 1:
                {
//                    g_joyFriends.splice(0 , g_joyFriends.length);
//                    g_contactInfoList.splice(0 , g_contactInfoList.length);
//					cc.DataMng.getInstance().init();
//                    cc.NodeSelf.getInstance().logout();
//                    cc.DataMng.getInstance().cleanUpDataForUnRegister();
                    if (self.unregisterSuc)
                    {
                        self.unregisterSuc();
                    }
                }
                break;

            case 0:
                {
                    if (self.unregisterFail)
                    {
                        self.unregisterFail();
                    }
                }
                break;

            default:
                {
                    cc.log("unregisterCall status = " + status);
                }
                break;
        }
    },

    updateUserPhoto:function(){
        cc.log("start to update user photo");
        var self = this;
        this.registCallBack("updatePhoto" , function(data){self.updateUserPhotoCall(data);});
        opJoy.OpJoy().updateUserPhoto();
    },

    updateUserPhotoCall : function(data){
        cc.log("opjoy updateUserPhoto : " + data);
        var self = this;

        if(data == null){
           cc.log("update userphoto failed in js");
           return;
        }
        var jsonObj = JSON.parse(data);
        var status = jsonObj.state;
        switch(status){
            case 1:
                var url = jsonObj.url;
                //self.downSelfPhoto(g_player.roleId , url);
                break;
            case 0:

                break;
        }
    },

    downSelfPhoto : function(g_roleid , g_url){
		cc.log("downSelfPhoto");
        var downcallback = function(jsonData){
            var obj = JSON.parse(jsonData);
            var photoArray = obj.data;
			cc.log("downSelfPhoto downcallback");
            PhotoLoad.getInstance().handle(photoArray);
        };
        var tag = this.downloadCallArray.length;
        this.downloadCallArray.push(downcallback);
        var photoArray = [];
        var photoJSON = {};
        photoArray.unshift({roleid : g_roleid , url : g_url});
        photoJSON.photos = photoArray;
        var joysdk = opJoy.OpJoy();
        joysdk.downUserPhoto(tag ,JSON.stringify(photoJSON));
    }

});

var joy = joy || {};
joy.interface = {};
joy.interface._instance = null;
joy.interface.getInstance = function(){
    if(OPjoyInterface._instance == null){
        OPjoyInterface._instance = new OPjoyInterface();
        OPjoyInterface._instance.init();
    }
    return  OPjoyInterface._instance;
};

function javaToJsCallBack(key ,data){
    cc.log("javaToJsCallBack(key ,data)");
//   cc.log(": key = " + key);
   joy.interface.getInstance().handlerCallBack(key , data);
}

/*<<<<<<< HEAD

//function infoFromUidCallBack(uid,info)
//{
//    cc.log("infoFromUidCallBack uid: " + uid + ", info = " + info);
//    //GameTopModel.getInstance().handleInfoFromUidCallBack(uid, info);

=======
function infoFromUidCallBack(uid,info)
{
    cc.log("infoFromUidCallBack uid: " + uid + ", info = " + info);
    GameTopModel.getInstance().handleInfoFromUidCallBack(uid, info);
}
>>>>>>> 3677a41fe0e002fb04e8441048f0fc9c6da76a0e*/

//-------------------------------------------------------------------------
/**
 *
 * @param jsonData        data : [{roleid : 44 , url : xxxx}]
 */
function getUserPhotoUrl(tag , jsonData){
    cc.log("getUserPhotoUrl ,tag = " + tag + " jsonData : " + jsonData);

    joy.interface.getInstance().downloadCallArray[tag](jsonData);
}
/**
 * facebook 邀请接口
 * @param content    邀请内容
 */
function facebookInvite(content)
{
    var joysdk = opJoy.OpJoy();
    joysdk.facebookInvite(content);

}
