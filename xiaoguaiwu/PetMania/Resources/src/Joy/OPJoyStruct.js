/**
 * 个人信息类
 * @constructor
 */
function Player(){
    this.roleId = "";           //游戏唯一id
    this.roleIdx = 1;
    this.cocoId = "";           //第三方id
    this.token = "";
    this.name = "";
    this.avatar = "";
    this.heartCount = 0;        //红心个数
    this.heartDelayTime = 0 ;   //恢复下一个红心的cd时间，非恢复满的cd时间
    this.scores = [];           //每一个关卡的score     有多少个，就表示到了多少关卡
//    this.level = 0;             //当前玩到的关卡
}


/**
 * 好友信息类
 * @constructor
 */
function Friend(){
    this.cocoId = "";    //cocoid
    this.name = "";       //名字
}

/**
 * 通讯录中的好友信息
 * @constructor
 */
function ContactFriend(){
    this.name = "";       //名字
    this.phoneNum = "";  //手机号
}

/**
 * 邮件
 * @constructor
 */
function Mail(){
    this.type = 0;//mail 类型
    this.senderId = "";//发信人cocoId
    this.senderTime = "";//发信time
}


var g_player = new Player();

var g_joyFriends = []; //用户系统返回的好友信息   {"nick":"wmpdwaxx","id":"15017200","avatar":"http://u.qhimg.com/qhimg/quc/100_100/16/02/22/1602229q117d50.a46a31.jpg","phone":""}
var g_otherFriends = []; //kakao返回的所有好友

var g_contactInfoList = []; //读取的通讯录信息,相当于可邀请好友列表   {"is_friend":0,"phone":"a8f2fad1352dd80910dcfc825fd995f9","nick":"å¨å§","sortkey":"0","qid":"","last_invited_time":0,"is_invited":0,"avatar":""}

