
//
//  Config.cpp
//  PetMania
//
//  Created by 周成山 on 13-7-22.
//
//

#include "Config.h"
#include "../jni/Jni.h"

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#include <android/log.h>
#include "jni/JniHelper.h"
#include <jni.h>
#endif

#include "CGameConfig.h"
#include "FileMgr.h"

Config::Config()
{
    
}

Config::~Config()
{

}

Config* Config::getInstance()
{
	static Config *i = new Config();
    
	return i;
}

int Config::getSmsCardType()
{
    return Jni::getSmsCardType();
}

int Config::getUserSystemFlag()
{
    return Jni::getUserSystemFlag();
}

const char* Config::getImei(){
    return Jni::getIMEI();
}

const char* Config::getMacAddress(){
    
    return Jni::getMacAddress();
    
}//获取设备MAc地址

const char* Config::getIDFA()
{
    return Jni::getIDFA();
    
}//广告跟踪标识

const char* Config::getAppVersion()//系统版本号
{
    //{"version":6.0}  {"version":2.3.3}
    return Jni::getAppVersion();
}


void Config::noticeJavaHandlerWithArg(int flag , const char* arg)
{
    Jni::noticeJavaHandlerWithArg(flag , arg);
}

void Config::freshToken(const char* token){
    Jni::freshToken(token);
}

void Config:: payListToJava(const char* payList){
    if(!payList)
    {
        return;
    }
    
    Jni::transPayList(payList);
}

void Config::showMessageToast(const char* content)
{
    Jni::showMessageToast(content);
}

void Config::transIPUrl(const char* url)
{
    Jni::transIPUrl(url);
}

void Config::transAPYUrl(const char* url)
{
    Jni::transAPYUrl(url);
}

const char* Config::getConfigParam()
{
    return Jni::getConfigParam();
}

const char* Config::getPhoneModel()
{
    return Jni::getPhoneModel();
}

void Config::cancelPush()
{
   Jni::cancelNotification();
}

const char* Config::GetDownloadPath()
{
    std::string downloadPath = std::string(K_GAME_WRITE_PATH)+std::string(K_GAME_WRITE_DOWN_PATH);
    CCString *downLoadPathCocos2d = CCString::create(downloadPath.c_str());
    const char* downloadPathC = downLoadPathCocos2d->getCString();
    CCLOG("Config :: GetDownloadPath : %s" , downloadPathC);
    return downloadPathC;
}

const char* Config::GetUnzipPath()
{
    std::string unzipPath = std::string(K_GAME_WRITE_PATH)+std::string(K_GAME_WRITE_TYPE_DATA_PATH);
    CCString *unzipPathCocos2d = CCString::create(unzipPath.c_str());
    const char* unzipPathC = unzipPathCocos2d->getCString();
    return unzipPathC;
}


void Config::updateDownOneFile(const char* saveDir , const char* type, const char* url)
{
    std::string downDir = FileMgr::getWriteFilePath()+std::string(saveDir);
    CCString *downDirCocos2d = CCString::create(downDir.c_str());
    CCLOG("downDir:   %s    type: %s    url: %s",downDir.c_str(),type,url);
    const char* downDirC = downDirCocos2d->getCString();
    Jni::updateDownOneFile(downDirC, type , url);
}

void Config::updateUnzipFile(const char* filePath, const char* targetDir){
   std::string saveDir = FileMgr::getWriteFilePath()+std::string(targetDir);
   CCString *saveDirCocos2d = CCString::create(saveDir.c_str());
   Jni::updateUnzipFile(filePath , saveDirCocos2d->getCString());
}

const char* Config::getVersionName(){
    CCLog("versionName : %s" , Jni::getVersionName());
    return Jni::getVersionName();
}

void Config::restartApp(){
    Jni::restartApp();
}

void Config::installApk(const char * apkPath)
{
    Jni::installApk(apkPath);
}

void Config::sendMails(const char *mails, const char* subject, const char* context){
    Jni::sendMails(mails , subject , context);
}

bool Config::isSizeEnough(int size)
{
   return Jni::isSizeEnough(size);
}

int Config::getAssetsFileSize(const char* path)
{
    return Jni::getAssetsFileSize(path);
}

int Config::getUrlFileSize(const char* url)
{
   return Jni::getUrlFileSize(url);
}

void Config::showDialog(const char* context){
  Jni::showDialog(context);
}

void Config::showMessageBox(const char* context,const char* buttonLeft,const char* buttonRight){
    Jni::showMessageBox(context,buttonLeft,buttonRight);
}

bool Config::isDebug(){
    return  GAME_DEBUG;
}

int Config::getNetWorkType(){
    return NETWORK_TYPE;
}

const char * Config::getDeviceModel()
{
    return Jni::getDeviceModel();
}

const char*  Config::printScene(float scale,float offsetY)
{
    std::string path = Jni::printScene(scale,offsetY);
    
    CCString *csPicPath = CCString::create(path);
    
    const char* picPathC = csPicPath->getCString();
    
    CCLog("printScene:  %s ",picPathC);
    
    return picPathC;
}

const char*  Config::printLayer(int tag,float scale)
{
    std::string path = Jni::printLayer(tag, scale);
    
    CCString *csPicPath = CCString::create(path);
    
    const char* picPathC = csPicPath->getCString();
    
    CCLog("printLayer:  %s",picPathC);
    
    return picPathC;
}

const char*  Config::printSystemView()
{
    std::string path = Jni::printSystemView();
    
    CCLog("printSystemView path is %s" , path.c_str());
    
    CCString *csPicPath = CCString::create(path);
    
    const char* picPathC = csPicPath->getCString();
    
    CCLog("printLayer:  %s",picPathC);
    
    return picPathC;
}

void Config::openURL(const char *url)
{
    Jni::openURL(url);
}

void Config::showDialogEx(int tag,const char* title,const char* message,const char* buttonJsonArray)
{
    Jni::showDialogEx(tag,title,message,buttonJsonArray);
}

const char* Config::getFileFromSD(const char* path)
{
    std::string strWritePath = FileMgr::getWriteFilePath()+K_GAME_WRITE_PATH;
    std::string dataFolderPath = strWritePath+K_GAME_WRITE_DATA_PATH;
    
    std::string fileName = FileMgr::InterceptionRightStr(path, ".app/");
    std::string fileSDPath = dataFolderPath+fileName;
    
    if (CCFileUtils::sharedFileUtils()->isAbsolutePath(fileSDPath)) {
        return fileSDPath.c_str();
    }else
    {
        return "";
    }
}

const char* Config::getSignHash()
{
    return Jni::getSignHash();
}

const char* Config::dexMd5()
{
    return Jni::getDexMd5();
}

void Config::openWebView(const char* url)
{

    Jni::openWebView(url);
}

void Config::kakaoLogin()
{
    Jni::kakaoLogin();
}

void Config::setTimeOutPassSign(bool sign)
{
	CCLog("Config::setTimeOutPassSign = %d" , sign);
    Jni::setTimeOutPassSign(sign);
}



