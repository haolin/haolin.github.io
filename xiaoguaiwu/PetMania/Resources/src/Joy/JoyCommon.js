var JoyCommon = cc.Class.extend({

    init : function(){
        this.joy = joy.interface.getInstance();
    },

    isAutoLogin : function(sucCall , failCall , joyFlag){
        this.joy.isEnabledAutoLogin(sucCall , failCall , joyFlag);
    },

    /**
     *
     * @param sucCall
     * @param failCall
     * @param joyFlag           传入该值，JOY_FLAG，选定用户系统时，设置次值，并传入
     */
    login : function(sucCall , failCall ,joyFlag){
        //noticeJaveHandler(6);   //???
        this.joy.login(sucCall , failCall , joyFlag);
    },

    /**
     *
     * @param sucCall
     * @param failCall
     */
    unregister: function(sucCall, failCall)
    {
        this.joy.unregister(sucCall,failCall);
    },

    /**
     *
     * @param paySucCall
     * @param payFailCall
     * @param payid
     * @param type     ”sms” ： 短信支付  ，其他： "other"
     * @param roleid   游戏角色id
     * @param billInfo 游戏订单信息
     *
     * data : {
     *     status : 1,成功
              state : 1,支付成功
                      2.订单已提交
              count : 购买的钻石数量
              type  : 购买的类型
           status : 0, 失败
              error : 购买失败的错误代码

     * }
     */
    pay : function(paySucCall , payFailCall , type, payid , roleid , billInfo){
        this.joy.pay(paySucCall , payFailCall , type, payid , roleid , billInfo);
    },

    readContactList : function(readConSucCall , readConFailCall , ask){
        this.joy.readContactList(readConSucCall , readConFailCall , ask);
    },

    bindUserInfo : function(bindUserSucCall , changeUserCall , bindUserFailCall){
        this.joy.bindUserInfo(bindUserSucCall , changeUserCall , bindUserFailCall);
    },

    getJoyFriendsList : function(joyFriendSucCall , joyFriendFailCall){
        this.joy.getJoyFriendsList(joyFriendSucCall , joyFriendFailCall);
    },

    getJoyFriendsListMessageBlock: function(joyFriendSucCall , joyFriendFailCall){
        this.joy.getJoyFriendsListMessageBlock(joyFriendSucCall , joyFriendFailCall);
    },

    inviteFriendBySmm : function(telNum , content , sucCall , failCall){
        this.joy.inviteFriendBySmm(telNum , content , sucCall , failCall);
    },

    downUserPhoto : function(array , callback){
        this.joy.downUserPhoto(array , callback);
    },

    updateUserPhoto : function(){
        this.joy.updateUserPhoto();
    },

    logout : function(logoutSucCall , logoutFailCall){
        this.joy.logout(logoutSucCall , logoutFailCall);
    }
	
});

var joyCommon = {};
joyCommon._instance = null;

joyCommon.getInstance = function(){
    if(joyCommon._instance == null){
        joyCommon._instance = new JoyCommon();
        joyCommon._instance.init();
    }
    return joyCommon._instance;
}
