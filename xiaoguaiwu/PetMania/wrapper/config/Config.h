//
//  Config.h
//  PetMania
//
//  Created by 周成山 on 13-7-22.
//
//

#ifndef __PetMania__Config__
#define __PetMania__Config__

#include <iostream>
#include "cocos2d.h"
#include <string>
#include <stdlib.h>
using namespace cocos2d;

class Config : public cocos2d::CCObject
{
public :
    static Config* getInstance();
    Config();
    ~Config();

    const char* getImei();//获取设备唯一表示
    const char* getMacAddress();//获取设备MAc地址
    const char* getIDFA();//广告跟踪标识
    const char* getAppVersion();//获取系统版本号

    int getSmsCardType();
    int getUserSystemFlag();
    void noticeJavaHandlerWithArg(int flag , const char* arg);

    void freshToken(const char* token);
    void payListToJava(const char* payList);
    void showMessageToast(const char* content);
    void transIPUrl(const char* url);
    void transAPYUrl(const char* url);
    const char* getConfigParam();
    const char* getPhoneModel();
    void cancelPush();
    
    const char* GetDownloadPath();
    const char* GetUnzipPath();

    void updateDownOneFile(const char* , const char* , const char*);

    void updateUnzipFile(const char* , const char*);

    const char* getVersionName();

    void restartApp();
    
    void installApk(const char *);

    void sendMails(const char * , const char* , const char*);

    bool isSizeEnough(int);

    int getAssetsFileSize(const char*);

    int getUrlFileSize(const char*);

    void showDialog(const char*);
    
    void showMessageBox(const char* context,const char* buttonLeft,const char* buttonRight);

    bool isDebug();
    
    int getNetWorkType();
    
    const char* getDeviceModel();
    
    const char*  printScene(float scale,float offsetY);//截屏Scene
    
    const char*  printLayer(int tag,float scale);//截屏Layer
    
    const char*  printSystemView();//系统截屏
    
    void openURL(const char *url);
    
    void showDialogEx(int tag,const char* title,const char* message,const char* buttonJsonArray);
//可扩展对话框 按钮通过json数据来决定
    
    const char*  getFileFromSD(const char* path);//获取文件在SD卡的目录
    
    const char* getSignHash();
    
    const char* dexMd5();

    void openWebView(const char*);
	
	void kakaoLogin();
	
	void setTimeOutPassSign(bool);
};

#endif /* defined(__PetMania__Config__) */
