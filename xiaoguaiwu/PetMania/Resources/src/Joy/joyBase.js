/**
 * 用户系统所有接口基类
 * @type {*}
 */
var joyBase = cc.Class.extend({
    /**
     * 登陆接口
     * @param sucCall 登陆成功call
     * @param failCall 登陆失败call
     */
    login : function(sucCall , failCall){},

    /**
     * @param paySucCall  购买成功回调
     * @param payFailCall 购买失败回调
     * @param billInfo : {
     *         money:支付金额,单位:元
     *         type:支付类型
     *         name:支付名称
     *         count:兑换的游戏币数量
               ext1: 扩展参数 用于回调服务器
               ext2: 扩展参数 用于回调服务器
               ext3: 扩展参数 用于回调服务器
               ext4: 扩展参数 用于回调服务器
     * }订单信息
     * @constructor
     */
    pay : function(paySucCall , payFailCall , billInfo){},

    /**
     *
     * @param readConSucCall 成功回调
     * @param readConFailCall  失败回调
     * @param ask   是否显示询问...
     */
    readContactList : function(readConSucCall , readConFailCall , ask){},

    /**
     * 获取用户系统的好友
     * @param joyFriendSucCall     成功的回调
     * @param joyFriendFailCall    失败的回调
     */
    getJoyFriendsList : function(joyFriendSucCall , joyFriendFailCall){},

    /**
     * 绑定账号
     * @param bindUserSucCall  绑定成功的回调
     * @param changeUserCall   切换账号的回调
     * @param bindUserCall     绑定失败的回调
     */
    bindUserInfo : function(bindUserSucCall , changeUserCall , bindUserFailCall){},

    /**
     * 邀请好友
     * @param telNum 被邀请的号码
     * @param sucCall  邀请成功回调
     * @param failCall  邀请失败回调
     */
    inviteFriendBySmm : function(telNum , sucCall , failCall){}
});


/**
 * 获取游戏好友在通讯录中的名字
 */
function getFriendName(cocoId){
    for(var i = 0 ; i < g_joyFriends.length ; i++){
        if(g_joyFriends[i].coco == cocoId){

            if(g_joyFriends[i].Un != null && g_joyFriends[i].Un != undefined && g_joyFriends[i].Un != ""){
                if(JOY_ENABLED){
                    if(textUtility.getTextLength(g_joyFriends[i].Un) > 6){
                        g_joyFriends[i].Un = textUtility.subStr(g_joyFriends[i].Un,6) + "...";
                    }
                }
                return g_joyFriends[i].Un;
            }
            if(g_joyFriends[i].un != null && g_joyFriends[i].un != undefined && g_joyFriends[i].un != ""){
                if(JOY_ENABLED){
                    if(textUtility.getTextLength(g_joyFriends[i].Un) > 6){
                        g_joyFriends[i].Un = textUtility.subStr(g_joyFriends[i].Un,6) + "...";
                    }
                }
                return g_joyFriends[i].un;
            }
        }
    }
    return cocoId;
}