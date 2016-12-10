#ifndef  _ANDROID_JNI_H_
#define  _ANDROID_JNI_H_

#include "string"
#include "cocos2d.h"
#include "MD5String.h"

enum EGameShareType {
    eSinaWeibo=0,
    eTencentWeibo=1,
    eWeChatFriend=2,
    eWeChatCircle=3,
    eRenRen=4,
    eFacebook=5
};

class  Jni{
    public :
    
    static void appPushNotification();
    static void nativeInputCodeToJs(std::string jsonstr);
    
    static void cancelNotification();
    
    static void pushNotification(const char *jsonData);
    
    static void shareToMail(const char *subject,const char* content,const char* picPath, bool isShowUI);
    
    static void shareToShareType(EGameShareType type,const char* content,const char* picPath, bool isShowUI);
    
    static int getSmsCardType();
    
    static const char* getIMEI();
    
    static const char* getMacAddress();//获取设备MAc地址
    
    static const char* getIDFA();//广告跟踪标识
    
    static const char* getAppVersion();//系统版本号

    static int getUserSystemFlag();
    
    static void noticeJavaHandlerWithArg(int flag , const char* arg);
    
    static void freshToken(const char* token);
    
    static void transPayList(const char* payList);
    
    static void downUserPhoto(int ,const char* photoList);
    
    static void nativeUpdateUserPhoto(int ,std::string jsonstr);
    
    static void showMessageToast(const char* content);
    
    static void redWithCode(const char* code);
    
    static void transIPUrl(const char* url);
    
    static void transAPYUrl(const char* url);
    
    static const char* getConfigParam();
    
    static void shareBackJS();
    
    static std::string cdKeySharePictures(const char* key,const char* picPath,float scale);//兑换码打印到Pic
    
    static std::string printScene(float scale,float offsetY);//截屏Scene

    static std::string printLayer(int tag,float scale);//截屏Layer
    
    static std::string printSystemView();//系统截屏

    static void openURL(const char *url);
    
    static void closeGameTouch();//关闭触摸响应
    
    static void openGameTouch();//打开触摸响应
    
    static void applicationWillEnterForeground();
    
    static const char* getPhoneModel();//获取机器状态
    
    static void updateUserPhoto();
    
    static void setNetWorkType(int netWorkType);
    
    static void adOfferWallCallBack(std::string taskCoins);//积分墙下载成功后
    
    static void updateDownloadProgress(int progress);
    
    static void updateDownloadComplete(std::string);
    
    static void updateDownloadFail();
    
    static void updateUnzipCompleted();
    
    static void updateUnzipFail();
    
    static void updateDownOneFile(const char* , const char* , const char*);
    
    static void updateUnzipFile(const char* , const char*);
    
    static void installApk(const char*);
    
    static const char* getVersionName();
    
    static void restartApp();
    
    static void sendMails(const char * , const char* , const char*);
    
    static bool isSizeEnough(int);
    
    static int getAssetsFileSize(const char*);
    
    static int getUrlFileSize(const char*);
    
    static void showDialog(const char*);
    
    static void showMessageBox(const char* context,const char* buttonLeft,const char* buttonRight);

    static void autoToLogin();
    
    static void showDialogEx(int tag,const char* title,const char* message,const char* buttonJsonArray);
    
    static void dialogButtonClickIndexToJS(int tag,int buttonIndex);

    static const char* getDeviceModel();
    
    static void facebookInvite(const char*);
    
    static const char* getSignHash();
    
    static const char* getDexMd5();

    static void openWebView(const char*);
	
	//kakao
	static void kakaoLogin();
	
	static void setTimeOutPassSign(bool);

};

#endif