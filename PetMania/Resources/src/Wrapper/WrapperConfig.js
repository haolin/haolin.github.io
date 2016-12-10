var JoyType = {
    JOY_NONE : -1,
    JOY_COCO : 0,
    JOY_QIHOO : 1,
    JOY_WEIBO : 2,
    JOY_FACEBOOK : 3,
    JOY_RENREN : 4,
    JOY_KAKAO: 5
};

var CHANNEL = "500026";

var JOY_FLAG = -1;   // -1:没有用户系统 0 : 触控用户系统    1： qihoo   2：weibo     3: facebook    4.renren   5: kakao

var JOY_PASSPORT = "";      //weibo , renren, facebook , coco

var MUSIC_ON = true;

var SHARE_ENABLED = true;                           //分享开关

var ROBOT_IMEI = "121212";                          //机器imei

var netWorkType = 0;                                //网络类型   0 ： 没有网络    1：wifi   2: not wifi

var storeUri = Defines.STOREURL;           //默认分享的下载地址

var inviteUri = "";                                 //邀请好友的地址

var SMS_TYPE = 0;                                   //手机卡类型 { 0 : 不识别 ； 1 ： 移动cm   2 ： 电信ct   3 ： 联通cu}

var LOGIN_IP = '';                 //登陆ip

var CLIENT_IP = '';                //逻辑ip

var APY_IP = '';                   //支付ip

var UPDATE_IP = '';                //更新ip

var RES_VERSION = "2";             // 资源版本号

var GAME_VERSION = '1.0.4';        // apk版本号

var SMALL_VERSION = "1";          //特殊版本标记

var currentIP = "";               //控制测试内外网

var ZONE = "t1";                //游戏区标识




var IPList = {
    IP_INTRANET : 0,   //内网开发环境
    IP_OUTER : 1,       //外网开发环境
    IP_OFFICIAL : 2,         //正式外网的
    IP_INNER : 3,             //员工内部测试
    IP_FACEBOOK : 4          //Facebook
};
/**
 * 控制Ip
 * @param ip
 */
function controlIP(ip)
{
    currentIP = ip;
    switch(currentIP)
    {
        case IPList.IP_INTRANET://内网
//            //kakao 开发测试内网
//            /*登陆服务器*/LOGIN_IP =  "http://121.78.113.184:28900";
//            /*游戏逻辑服务器*/CLIENT_IP = 'http://121.78.113.184:28800';
//            /*支付验证*/APY_IP = 'http://121.78.113.184:28200';
//            /*更新服务器*/UPDATE_IP = 'http://121.78.113.184:28100';

            //kakao 开发人员使用
            /*登陆服务器*/LOGIN_IP =  "http://121.78.113.186:22490";
            /*游戏逻辑服务器*/CLIENT_IP = 'http://121.78.113.186:22450';
            /*支付验证*/APY_IP = 'http://121.78.113.186:22420';
            /*更新服务器*/UPDATE_IP = 'http://121.78.113.186:22410';

            ZONE = "d1";
            break;
        case IPList.IP_OUTER://测试外网

			/*登陆服务器*/LOGIN_IP =  "http://121.78.113.184:22490";
            /*游戏逻辑服务器*/CLIENT_IP = 'http://121.78.113.184:22450';
            /*支付验证*/APY_IP = 'http://121.78.113.184:22420';
            /*更新服务器*/UPDATE_IP = 'http://121.78.113.184:22410';

//            小怪物测试服
//            /*登陆服务器*/LOGIN_IP =  "http://117.121.32.93:20490";
//            /*游戏逻辑服务器*/CLIENT_IP = 'http://117.121.32.93:20450';
//            /*支付验证*/APY_IP = 'http://117.121.32.93:20420';
//            /*更新服务器*/UPDATE_IP = 'http://117.121.32.93:20410';
            ZONE = "t1";
            break;
        case IPList.IP_OFFICIAL://正式
            /*登陆服务器*/LOGIN_IP =  "http://yourstardev.chukong-inc.co.kr:22490";
            /*游戏逻辑服务器*/CLIENT_IP = 'http://yourstardev.chukong-inc.co.kr:22450';
            /*支付验证*/APY_IP = 'http://yourstardev.chukong-inc.co.kr:22420';
            /*更新服务器*/UPDATE_IP = 'http://yourstardev.chukong-inc.co.kr:22410';//'http://jjdxgw.download.appget.cn';
            ZONE = "s1";
            break;
//      case IPList.IP_INNER:      //内部测试的
//            /*登陆服务器*/LOGIN_IP =  "http://117.121.32.93:20490";
//            /*游戏逻辑服务器*/CLIENT_IP = 'http://117.121.32.93:20459';
//            /*支付验证*/APY_IP = 'http://117.121.32.93:20420';
//            /*更新服务器*/UPDATE_IP = 'http://117.121.32.93:20410';
//            break;
        case IPList.IP_FACEBOOK:
            /*登陆服务器*/LOGIN_IP =  "http://54.202.88.165:20490";
            /*游戏逻辑服务器*/CLIENT_IP = 'http://54.202.88.165:20450';    //// 'http://54.200.72.105:20450 //
            /*支付验证*/APY_IP = 'http://54.202.88.165:20420';
            /*更新服务器*/UPDATE_IP = 'http://54.202.88.165:20410';
            ZONE = "t2";
            break;
    }
}

//设置Ip
controlIP(IPList.IP_OFFICIAL);

/**
 * 是否是coco用户系统
 */
function isJOYSystem(){
   return JOY_FLAG == 0;
}

/**
 * 取消Push
 */
function cancelPush()
{
    var configClass = wrapperConfig.Config.getInstance();
    configClass.cancelPush();
}

function getConfigParams(){
    var configClass = wrapperConfig.Config.getInstance();
    var configParam = configClass.getConfigParam();
//    cc.log("configParam : " + configParam);
    var configObj = JSON.parse(configParam);
    
    if(Defines.OS.isAndroid())
    {
        netWorkType = configObj.netWorkType;
        MUSIC_ON = configObj.musicEnabled;
        SMS_TYPE = configObj.simType;
    }else
    {
        netWorkType = false;
        MUSIC_ON = true;
        SMS_TYPE = configObj.simType;
    }
    
    CHANNEL = configObj.channel + "";
    
    ROBOT_IMEI = configObj.imei;

    GAME_VERSION = configObj.versionName;
    //configObj.versionCode;
}

function isDebug(){
     var configClass = wrapperConfig.Config.getInstance();
     return configClass.isDebug();
}

//  OFFICIAL   1
//  INNER      2
//  TESTOUTER  3
function getNetWorkType(){
    var configClass = wrapperConfig.Config.getInstance();
    return configClass.getNetWorkType();
}

/**
 * 初始化defines中的一些变量以及设置国外ip
 */
function initDefines()
{
    Defines.DEBUG_FUNC = isDebug();                     //是否是debug
    if(Defines.OS.isAndroid())
    {
        Defines.IS_EN = isSupportEn();
        Defines.IS_GOOGLE_PLAY = isSupportPlay();
    }
    //控制国内网服务器
    if(Defines.IS_GOOGLE_PLAY){
        JOY_FLAG = JoyType.JOY_FACEBOOK;
        controlIP(IPList.IP_FACEBOOK);
    }else{
        var netWorkType = getNetWorkType();
        switch (netWorkType){
            case 1:
                controlIP(IPList.IP_OFFICIAL);
                break;
            case 2:
                controlIP(IPList.IP_INTRANET);
                break;
            case 3:
                controlIP(IPList.IP_OUTER);
                break;
            case 4:
                controlIP(IPList.IP_FACEBOOK);
                break;
        }
    }
}


//把游戏逻辑支付验证服务器地址放到java或ios层
function transAPYUrlToPlatform(){
    cc.log("transAPYUrlToPlatform  "+APY_IP);
    var configClass = wrapperConfig.Config.getInstance();
    configClass.transAPYUrl(APY_IP);
}

//把游戏逻辑服务器地址放到java或ios层
function transIPUrlToPlatform(){
    cc.log("transIPUrlToPlatform  "+APY_IP);
    var configClass = wrapperConfig.Config.getInstance();
    configClass.transIPUrl(LOGIN_IP);

}

//获取硬件的一些配置信息
function getDeviceInfo(){
   var configClass = wrapperConfig.Config.getInstance();
   //var deviceInfo = configClass.getPhoneModel();
   cc.log("deviceInfo : in js " + configClass.getPhoneModel());
   return JSON.parse(configClass.getPhoneModel());
   //return deviceInfo;
}

function initWrapper()
{
    getConfigParams();
    initDefines();
    getDeviceInfo();

    if(!Defines.OS.isAndroid()){
        transIPUrlToPlatform();
        transAPYUrlToPlatform();
    }
}

if(Defines.OS.isAndroid() || Defines.OS.isiOS()){
    initWrapper();
}

//分析渠道号
var _ParseChannel = function(des)
{
        if (des)
        {
            cc.log("_ParseChannel = " + des);
        }
    
    
     cc.log("JOY_PASSPORT : " + JOY_PASSPORT);
     return  JOY_PASSPORT;
};

//是否可以邀请好友?
var _CanInviteFriend = function()
{
    return JOY_FLAG == 0 || JOY_FLAG == 1;
};

//用户系统是否是微博
var _IsWeibo = function()
{
    return JOY_FLAG == 2;
};

var _IsFacebook = function()
{
    return JOY_FLAG == 3;
};

var _IsRenren = function()
{
    return JOY_FLAG == 4;
};

//是否有网络环境
var _IsNetWorkEnable = function()
{
    return netWorkType > 0;
};

//有网络环境 而且 网络环境是wifi
var _IsNetWorkWifi = function()
{
    return _IsNetWorkEnable() && netWorkType == 1;
};

//有网络环境 而且 网络环境不是wifi
var _IsNetWorkNotWifi = function()
{
    return _IsNetWorkEnable() && !_IsNetWorkWifi();
};

function isCM()
{
     return CHANNEL == "000266";
}

function isCT()
{
    return CHANNEL == "000032";
}

function isCU()
{
    return CHANNEL == "000056";
}

function isCMMM()
{
    return CHANNEL == "000013";
}

////iOS////

function isAppStoreWeiBo()
{
    return CHANNEL == "500026";
}

///END iOS///

function musicControl(){
    if(isCM())
        cc.AudioMng.getInstance().force(MUSIC_ON);
}

/**
 * 是否支持英文版本
 * @returns {boolean}
 */
function isSupportEn()
{
    return CHANNEL == "000512";
}

/**
 * 是否支持精简版
 */
function isSupportTile()
{
    return isTelcomOperators();
}

function isSupportPlay(){
    return CHANNEL == "000512";
}

/**
 * 是否可以分享
 */
function isEnabledShare(){
    if(isCM() || isCT() || isCU() || isCMMM()){
        return false;
    }
    return true;
}

/**
 * 是否是运营商
 */
function isTelcomOperators(){
    if(isCM() || isCT() || isCU() || isCMMM()){
        return true;
    }
    return false;
}

function isXiaoMi909(){
    return CHANNEL == "000909";
}

//获得系统版本号
function getAppVersion()
{
    //
    var vstring = wrapperConfig.Config.getInstance().getAppVersion();
    var vJson = JSON.parse(vstring);
    if (vJson)
    {
        return vJson["version"];
    }
    cc.log("系统版本号有问题 vstring = " + vstring);
    return 0;
}

/*
cc.log("  channel : " + CHANNEL
       + "  JOY FALG : " + JOY_FLAG
       + "  cmMusic : " + MUSIC_ON
       +  "  networkType : " + netWorkType
       + "  smsType : " + SMS_TYPE
       + "  GAME_VERSION : " + GAME_VERSION
        + " OS_VERSION : " + getAppVersion());
 */


