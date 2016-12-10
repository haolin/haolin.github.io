
//----------JS层数据参数控制---------\\

//网络的类型
#define NETWORK_TYPE 3 //正式OFFICIAL 1  | 内网INNER 2 | 测试外网TESTOUTER 3 | 国外FaceBook 4
//是否打包状态
#define PACKED 1
//是否Debug菜单 1 true   0 false
#define GAME_DEBUG 1

 
//---------- 渠道不同ID区分 ---------\\

#if CHANNEL_APPSTORE//AppStore渠道ID
    #define CHANNEL_DEFINE_ISDEF 1//是否定义成功
    #define CHANNEL_ID "500026"//渠道号
    #define FLURRY_KEY "3JFDGNSSBJ33C66R3DQC"//Flurry统计
    #define COUNTLY_APP_KEY "244f7652b1db8232b0ff8dbe11033b4bf7f38158"//自由统计
#endif

#if CHANNEL_PP//PP助手
    #define CHANNEL_DEFINE_ISDEF 1//是否定义成功
    #define CHANNEL_ID "500003"//渠道号
    #define CHUKONG_PAY_KEY "916F47C4-1A94-BBAD-5A9E-4666C4AE6561"//触控支付
    #define CHUKONG_PAY_SECRET "577fa528a90a7ccd87abe1403132e812"//触控支付
    #define FLURRY_KEY "W47TBJQ72N65SKG29JBM"//Flurry统计
    #define COUNTLY_APP_KEY "463c2e560869ae91fedb24948669201d113dcbcd"//自由统计
#endif

#if CHANNEL_91//91助手
    #define CHANNEL_DEFINE_ISDEF 1//是否定义成功
    #define CHANNEL_ID "500001"//渠道号
    #define CHUKONG_PAY_KEY "8B0A9E3E-085C-8E15-F611-3193FD073673"//触控支付
    #define CHUKONG_PAY_SECRET "604bfa21714115a4d303301c68802725"//触控支付
    #define FLURRY_KEY "W47TBJQ72N65SKG29JBM"//Flurry统计
    #define COUNTLY_APP_KEY "f8a412c698c3ad9db0b8b6a46d2fe214f2d21b4b"//自有统计
#endif

#if CHANNEL_TONGBUTUI//同步推助手
    #define CHANNEL_DEFINE_ISDEF 1//是否定义成功
    #define CHANNEL_ID "500002"//渠道号
    #define CHUKONG_PAY_KEY "BCBEBF67-1FF0-4959-683C-032A1CD5B46F"//触控支付
    #define CHUKONG_PAY_SECRET "b44f51e446df944cb2ab1dc0a876ad04"//触控支付
    #define FLURRY_KEY "W47TBJQ72N65SKG29JBM"//Flurry统计
    #define COUNTLY_APP_KEY "f3316cc678eb033a2a4eee3b311012d9069e65a2"//自有统计
#endif

#if CHANNEL_KUAIYONG//快用渠道ID
    #define CHANNEL_DEFINE_ISDEF 1//是否定义成功
    #define CHANNEL_ID "500016"//渠道号
    #define FLURRY_KEY "W47TBJQ72N65SKG29JBM"//Flurry统计
    #define COUNTLY_APP_KEY "463c2e560869ae91fedb24948669201d113dcbcd"//自有统计
#endif

#ifndef CHANNEL_DEFINE_ISDEF
//如果前面都没赋值那么变为未知渠道
    #define CHANNEL_DEFINE_ISDEF 1//是否定义成功
    #define CHANNEL_ID "5112233"
    #define FLURRY_KEY "W47TBJQ72N65SKG29JBM"//Flurry统计
    #define COUNTLY_APP_KEY "d7615be9d2bc1c6f3a019787265bb8d31c20fdc6"//自有统计
#endif

//--------公司的信息 多语言自行添加-----------\\

#define INFO_GAME_NAME "进击的小怪物"
#define INFO_GAME_PHONE 4006661551
#define INFO_GAME_COMPANY "北京触控科技有限公司"
#define INFO_GAME_GMMAIL "kefu@punchbox.org"


////////////////属性Key配置//////////////
//PunchBox广告平台见JS层
//苹果
#define APP_ID  "691060201"
#define BUNDLE_ID "com.cocoentertainment.jinjidexiaoguaiwu"

//第三方支付
//快用
#define KYPAY_ID  "2407"
#define KYPAY_SIGN "vgYxi3VNH4sffqFc4waSiKdhvGqfOvcj"
#define KYPAY_TEST 0   /*1 表示 打开，0 表示 关闭*/
//联通短带
///应用编号
#define UNI_PAY_APPID "90543208420130909153838288400"
///开发商VAC资质编号
#define UNI_PAY_CPID "86001651"
///开发商编号
#define UNI_PAY_CPCODE "905432084"

//分享方面如果修改了Key记得修改info.plist
//微信
#define WeChat_APPKEY "wx97db8463e9faace1"
//新浪微博
#define SinaWeibo_AppKey  "876702860"
#define SinaWeibo_AppSecret  "56fc926b3c125f4116d3a74ff4d9e21d"
#define SinaWeibo_Uri  "http://s1.jjdxgw.appget.cn:20450/weibo/auth"
//腾讯
#define TencentWeibo_AppKey "801408524"
#define TencentWeibo_AppSecret "ce7fd795099e031e18cff38699916d34"
#define TencentWeibo_Uri "http://sns.whalecloud.com/app/0V57K"
//人人网
#define RenRen_ID "240825"
#define RenRen_AppKey "20a92ed1b6b44b6d96e34aa235677349"
#define RenRen_AppSecret "aec22e379ada4bcfbb52faa9cee98474"
//FaceBook
#define FaceBook_AppKey "1431541033726127"
#define FaceBook_AppSecret "7ec8d48626f612bb644666102df53484"

//自有统计地址
#define COUNTLY_HOST "http://countly.jjdxgw.appget.cn:20500"
//分享AppKey
#define SHARE_SDK_APPKEY "e00dd7e39fb"

//游戏微博的名称
#define SINAWEIBO_NAME "进击的小怪物"
#define TencentWEIBO_NAME "CosmicCrashers"
//小怪物官网
#define XGW_WEB "http://xgw.coco.cn/welcome/"
#define XGW_APPSTORE_WEB "https://itunes.apple.com/cn/app/id691060201"

//kakao相关信息
#define KCLIENT_ID @"91838841253758497"
#define KCLIENT_SECRET @"TuLxOVvzDOrRcmTbcDIYh1qYQuHjlvZvNDcfGpIms1eDp0gxB/cUWek+zf7WwKOIyZP5sNESTdIVOhCJ94wKEw=="
#define KREDIRECT_URL @"kakao91838841253758497://exec"

////////////////ANDROID//////////////


///////////////C++////////////                                                                                                                                                                                                                                                 
const uint32_t DefaultEncryptKey[4] = { 0x766fd43f,0x77fc92a0,0x77ed7a8d,0x77fd5728 };

#define K_GAME_PREVIOUS_MD5 "K_GAME_PREVIOUS_MD5"
#define K_GAME_WRITE_PATH "PetCrash/"              /*更新机制在SD卡的总目录*/
#define K_GAME_WRITE_DOWN_PATH "download/"          /*下载zip数据，下载成功后解压到typedata*/
#define K_GAME_WRITE_DATA_PATH "data/"             /*游戏启动后的资源数据需要从这里来拿*/
#define K_GAME_WRITE_TYPE_DATA_PATH "typedata/"    /*zip临时解压数据，下次启动拷贝到data中*/
#define K_GAME_WRITE_SHARE_PIC_PATH "sharePic/"

//mark noticeJavaHandlerWithArg 回调的key
#define LOGIN  "login"
#define ISAUTO  "isAuto"
#define PAY "pay"
#define GETINVITEFRIENDS "readContact"
#define GETJOYFRIENDS "getJoyFriends"
#define GETJOYFRIENDSMESSAGEBLOCK "getJoyFriendsListMessageBlock"
#define SENDMESSAGE "sendTemplateMessage"
#define BINDER "binder"
#define INVITEFRIEND "invite"
#define LOGOUT  "logout"
#define UNREGISTER  "unregister"

//mark end
