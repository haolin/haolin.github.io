//
//  Jni.c
//  CrystalCraze
//
//  Created by 周成山 on 13-7-16.
//
//

#include <stdio.h>
#include <string>
#include "ScriptingCore.h"
#include "cocos2d.h"
#include "../share/shareSdk.h"
#include "Jni.h"
//#include "CGameConfig.h"
#include "FileMgr.h"

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
#include "CSystemInfoMgr.h"
#include "ShareToGame.h"
#include "CSharingCode.h"
#include "CHttpUpdateZip.h"
#include "CHttpPhoto.h"
#include "noticeJavaHandlerWithArg.h"
#include "UserIAP.h"
#include "CGameConfig.h"
#include "configToJs.h"
#include "FileUnZip.h"
#include "CWebView.h"
#endif

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#include <jni.h>
#include <android/log.h>
#include "jni/JniHelper.h"
#include "jni/Java_org_cocos2dx_lib_Cocos2dxHelper.h"
#endif



using namespace cocos2d;

extern "C" {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    __attribute__ ((visibility("default"))) jboolean JNICALL Java_com_thirdsdk_share_ShareInterface_getShareAward(JNIEnv * env, jobject obj)
    {
        Jni::shareBackJS();
        return true;
    }

    __attribute__ ((visibility("default"))) jboolean JNICALL Java_com_netWork_NetWorkReceiver_getNetWorkType(JNIEnv *env , jobject obj, jint type)
    {
        //CCLog("Java_com_netWork_NetWorkReceiver_netWorkConnected ! %d " , type);
        /*
        JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
        JSObject *global = ScriptingCore::getInstance()->getGlobalObject();
        jsval argv[1];
        jsval res;
        jsval argv_1 = int32_to_jsval(context , type);
        argv[0] = argv_1;
        JS_CallFunctionName(context , global , "setNetWorkType" , 1 , argv , &res);
         */
        Jni::setNetWorkType(type);
        return true;
    }

    __attribute__ ((visibility("default"))) jboolean JNICALL Java_com_common_lib_GameParentActivity_nativeInputCodeToJs(JNIEnv *env ,jobject obj, jstring jsonStr)
    {
       std::string jsonstr = JniHelper::jstring2string(jsonStr);

       Jni::nativeInputCodeToJs(jsonstr);
       return true;
    }

    __attribute__ ((visibility("default"))) jboolean JNICALL Java_com_common_lib_GameParentActivity_nativeKeyBack(JNIEnv *env ,jobject obj, jstring jsonStr)
    {
       //CCLog("Java_com_common_lib_GameParentActivity_nativeKeyBack");
       JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
       JSObject *global = ScriptingCore::getInstance()->getGlobalObject();
       jsval argv[0];
       jsval res;
       JS_CallFunctionName(context,global,"pressBackKey" , 0 , argv, &res);

       return true;
    }

    __attribute__ ((visibility("default"))) jboolean JNICALL Java_com_download_ImageInterface_nativeUpdateUserPhoto(JNIEnv *env ,jobject obj, jint tag ,jstring jsonStr)
    {
       std::string jsonstr = JniHelper::jstring2string(jsonStr);
       Jni::nativeUpdateUserPhoto(tag ,jsonstr);
       return true;
    }

    __attribute__ ((visibility("default"))) jboolean JNICALL Java_com_download_UpdateAllMgr_nativeUpdateDownloadProgress(JNIEnv *env ,jobject obj, jint progress)
    {

       Jni::updateDownloadProgress(progress);
       return true;
    }

    __attribute__ ((visibility("default"))) jboolean JNICALL Java_com_download_UpdateAllMgr_nativeUpdateDownloadComplete(JNIEnv *env ,jobject obj ,jstring filePath)
    {

       std::string sfilepath = JniHelper::jstring2string(filePath);
       Jni::updateDownloadComplete(sfilepath);
       return true;
    }

    __attribute__ ((visibility("default"))) jboolean JNICALL Java_com_download_UpdateAllMgr_nativeUpdateDownloadFail(JNIEnv *env ,jobject obj)
    {
       Jni::updateDownloadFail();
       return true;
    }

    __attribute__ ((visibility("default"))) jboolean JNICALL Java_com_download_UpdateAllMgr_nativeUpdateUnzipCompleted(JNIEnv *env ,jobject obj)
    {
       Jni::updateUnzipCompleted();
       return true;
    }

    __attribute__ ((visibility("default"))) jboolean JNICALL Java_com_download_UpdateAllMgr_nativeUpdateUnzipFail(JNIEnv *env ,jobject obj)
    {
       Jni::updateUnzipFail();
       return true;
    }

    __attribute__ ((visibility("default"))) jboolean JNICALL Java_com_thirdsdk_wrapper_BIAPIWrapper_nativeBiCodeFeedBack(JNIEnv *env ,jobject obj, jstring jsonStr)
    {
       std::string jsonstr = JniHelper::jstring2string(jsonStr);
       //CCLog("Java__com_thirdsdk_wrapper_BIAPIWrapper_nativeBiCodeFeedBack %s", jsonstr.c_str());

       JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
       JSObject *global = ScriptingCore::getInstance()->getGlobalObject();
       jsval argv[1];
       jsval res;

       jsval argv_1 = std_string_to_jsval(context , jsonstr);
       argv[0] = argv_1;
       JS_CallFunctionName(context , global , "biCodeFeedBack" , 1 , argv , &res);
       return true;
    }

    __attribute__ ((visibility("default"))) jboolean JNICALL Java_com_common_lib_GameParentActivity_nativeAutoToLogin(JNIEnv *env ,jobject obj)
    {
       Jni::autoToLogin();
       return true;
    }

    __attribute__ ((visibility("default"))) void JNICALL Java_com_punchbox_lib_PunchBoxAd_nativeOfferWallCallBack(JNIEnv *env, jobject obj, jstring taskCoinsJson)
    {
        std::string taskCoins = JniHelper::jstring2string(taskCoinsJson);
        Jni::adOfferWallCallBack(taskCoins);
    }

#endif
}

void Jni::updateDownloadProgress(int progress)
{
     JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
     JSObject *global = ScriptingCore::getInstance()->getGlobalObject();
     jsval argv[1];
     jsval res;
     jsval argv_1 = int32_to_jsval(context , progress);
     argv[0] = argv_1;
     JS_CallFunctionName(context , global , "downOneFileProgress" , 1 , argv , &res);
}

void Jni::adOfferWallCallBack(std::string taskCoins)
{
    JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
    JSObject *global = ScriptingCore::getInstance()->getGlobalObject();
    jsval argv[1];
    jsval res;
    jsval argv_1 = std_string_to_jsval(context , taskCoins);
    argv[0] = argv_1;
    JS_CallFunctionName(context , global , "adOfferWallCallBack" , 1 , argv , &res);
}


void Jni::updateDownloadComplete(std::string filePath)
{
    JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
    JSObject *global = ScriptingCore::getInstance()->getGlobalObject();
    jsval argv[1];
    jsval res;

    jsval argv_1 = std_string_to_jsval(context , filePath);
    argv[0] = argv_1;
    JS_CallFunctionName(context , global , "updateDownloadComplete" , 1 , argv , &res);
}

void Jni::updateDownloadFail()
{
    JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
    JSObject *global = ScriptingCore::getInstance()->getGlobalObject();
    jsval argv[0];
    jsval res;
    JS_CallFunctionName(context , global , "updateDownloadFail" , 0 , argv , &res);
}

void Jni::updateUnzipCompleted()
{
    JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
    JSObject *global = ScriptingCore::getInstance()->getGlobalObject();
    jsval argv[0];
    jsval res;
    JS_CallFunctionName(context , global , "updateUnzipCompleted" , 0 , argv , &res);
}

void Jni::updateUnzipFail()
{
    JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
    JSObject *global = ScriptingCore::getInstance()->getGlobalObject();
    jsval argv[0];
    jsval res;
    JS_CallFunctionName(context , global , "updateUnzipFail" , 0 , argv , &res);
}



void Jni::shareBackJS()
{
    //CCLog("Java_com_thirdsdk_share_ThirdInterface_getShareAward");
    JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
    JSObject *global = ScriptingCore::getInstance()->getGlobalObject();
    jsval argv[0];
    jsval res;
    JS_CallFunctionName(context,global,"shareback" , 0 , argv, &res);

}

void Jni::nativeInputCodeToJs(std::string jsonstr)
{
    JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
    JSObject *global = ScriptingCore::getInstance()->getGlobalObject();
    jsval argv[1];
    jsval res;
    
    jsval argv_1 = std_string_to_jsval(context , jsonstr);
    argv[0] = argv_1;
    JS_CallFunctionName(context , global , "inputCodeBack" , 1 , argv , &res);

}

void Jni::nativeUpdateUserPhoto(int tag ,std::string jsonstr)
{
    //CCLog("Java_com_download_ImageInterface_nativeUpdateUserPhoto %s", jsonstr.c_str());
    
    JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
    JSObject *global = ScriptingCore::getInstance()->getGlobalObject();
    jsval argv[2];
    jsval res;
    
    jsval argv_2 = std_string_to_jsval(context , jsonstr);
    jsval argv_1 = int32_to_jsval(context , tag);
    argv[0] = argv_1;
    argv[1] = argv_2;
    JS_CallFunctionName(context , global , "getUserPhotoUrl" , 2 , argv , &res);
}

void Jni::appPushNotification()
{
    cancelNotification();
    
    JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
    JSObject *global = ScriptingCore::getInstance()->getGlobalObject();

    jsval argv[0];
    jsval res;
    JS_CallFunctionName(context,global,"getPlayerPowerDelayTime" , 0 , argv, &res);
    JSString*  jsonStr = JSVAL_TO_STRING(res);
    
    char *buffer = NULL;
    
    unsigned short* pStrUTF16 = (unsigned short*)JS_GetStringCharsZ(context, jsonStr);
    buffer = cc_utf16_to_utf8(pStrUTF16, -1, NULL, NULL);
    
    if (buffer) {
        cancelNotification();
        pushNotification(buffer);
    }
}


void Jni::dialogButtonClickIndexToJS(int tag,int buttonIndex)
{
    JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
    JSObject *global = ScriptingCore::getInstance()->getGlobalObject();
    jsval argv[2];
    jsval res;
    jsval argv_1 = int32_to_jsval(context , tag);
    jsval argv_2 = int32_to_jsval(context , buttonIndex);
    argv[0] = argv_1;
    argv[1] = argv_2;
    JS_CallFunctionName(context , global , "dialogExCallBack" , 2 , argv , &res);
}



void Jni::cancelNotification()
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
    if (JniHelper::getStaticMethodInfo(t
        , "com/tool/natives/Native"
        , "cancelNotification"
        , "()V"))
    {
        t.env->CallStaticVoidMethod(t.classID, t.methodID);

        // t.env->DeleteLocalRef(t.classID);
    }
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CSystemInfoMgr::sharedSystemInfoMgr()->cancelLocal();
#endif
}

void Jni::pushNotification(const char *jsonData)
{
//    cancelNotification();

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)

    JniMethodInfo t;
    if (JniHelper::getStaticMethodInfo(t
        , "com/tool/natives/Native"
        , "pushNotification"
        , "(Ljava/lang/String;)V"))
    {
        jstring stringData = t.env->NewStringUTF(jsonData);
        t.env->CallStaticVoidMethod(t.classID, t.methodID, stringData);
        t.env->DeleteLocalRef(stringData);
        // t.env->DeleteLocalRef(t.classID);
    }
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CSystemInfoMgr::sharedSystemInfoMgr()->localPush(jsonData);
#endif
}

int Jni::getSmsCardType()
{
  #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
      JniMethodInfo t;
      if (JniHelper::getStaticMethodInfo(t
          , "com/tool/natives/Native"
          , "getSmsCardType"
          , "()I"))
      {
          jint flag = t.env->CallStaticIntMethod(t.classID, t.methodID);
          return flag;
      }
  #endif
    return 0;
}

int Jni::getUserSystemFlag()
{
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
       JniMethodInfo t;
        if (JniHelper::getStaticMethodInfo(t
            , "com/onepiece/usersystem/common/OutInterface"
            , "GetUserSystem"
            , "()I"))
        {
            jint flag = t.env->CallStaticIntMethod(t.classID, t.methodID);
            return flag;
        }

    #endif
//#if (GK_USER_SYSTEM_STATE == K_DEFINE_FACEBOOK)
//    return 3;
//#endif
//    
//#if (GK_USER_SYSTEM_STATE == K_DEFINE_WEIBO)
//    return 2;
//#endif
    return 2;
}

void Jni::shareToShareType(EGameShareType type,const char* content,const char* picPath, bool isShowUI)
{
    //CCLog("shareToShareType : %s" , picPath);
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    std::string shareFunction = "shareToSina";
    switch (type) {
        case eSinaWeibo:
            shareFunction = "shareToSina";
            break;
        case eTencentWeibo:
            shareFunction = "shareToTencentWeibo";
            break;
        case eWeChatFriend:
            shareFunction = "shareToWechat";
            break;
        case eWeChatCircle:
            shareFunction = "shareToWechatMoments";
            break;
        case eRenRen:
            shareFunction = "shareToRenRen";
            break;
        case eFacebook:
            shareFunction = "shareToFacebook";
            break;
    }
    
    JniMethodInfo t;
    if (JniHelper::getStaticMethodInfo(t
                                       , "com/thirdsdk/share/ShareInterface"
                                       , shareFunction.c_str()
                                       , "(Ljava/lang/String;Ljava/lang/String;Z)V"))
    {
        jstring stringContent = t.env->NewStringUTF(content);
        jstring stringPicPath = t.env->NewStringUTF(picPath);
        t.env->CallStaticVoidMethod(t.classID, t.methodID , stringContent , stringPicPath , isShowUI);
        t.env->DeleteLocalRef(stringContent);
        t.env->DeleteLocalRef(stringPicPath);
    }
    
    
#endif
    
    
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    ShareToGame::ShareInstance()->shareToShareType(type,content,picPath,isShowUI);
#endif
}

void Jni::shareToMail(const char *subject,const char* content,const char* picPath, bool isShowUI)
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    ShareToGame::ShareInstance()->sendMailInApp(subject, content, picPath,isShowUI);
#endif
 
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
    if (JniHelper::getStaticMethodInfo(t
                                       , "com/thirdsdk/share/ShareInterface"
                                       , "shareToEmail"
                                       , "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V"))
    {
        jstring stringSubject = t.env->NewStringUTF(subject);
        jstring stringContent = t.env->NewStringUTF(content);
        jstring stringPicPath = t.env->NewStringUTF(picPath);
        t.env->CallStaticVoidMethod(t.classID, t.methodID , stringSubject , stringContent , stringPicPath);
        t.env->DeleteLocalRef(stringSubject);
        t.env->DeleteLocalRef(stringContent);
        t.env->DeleteLocalRef(stringPicPath);
    }
#endif
    
}

void Jni::noticeJavaHandlerWithArg(int flag , const char* arg)
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
    if (JniHelper::getStaticMethodInfo(t
                                       , "com/common/lib/GameParentActivity"
                                       , "handlerJSNotice"
                                       , "(ILjava/lang/String;)V"))
    {
        jstring stringArg = t.env->NewStringUTF(arg);
        t.env->CallStaticVoidMethod(t.classID, t.methodID , flag , stringArg);
        t.env->DeleteLocalRef(stringArg);
    }
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    noticeJavaHandlerWithArg::Handle(flag, arg);
#endif
}
//android获取内存: {"data":512}  IOS获取设备: {"data":"iphone3,1"}
const char* Jni::getPhoneModel()
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
      //CCLog("deviceInfo in c ++ : %s" , getDeviceMemory());
      return getDeviceMemory();

#endif
    
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    return CSystemInfoMgr::sharedSystemInfoMgr()->getPhoneModel();
#endif
    return "Unknown";
}


void Jni::freshToken(const char *token)
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
      JniMethodInfo t;
      if (JniHelper::getStaticMethodInfo(t
                                         , "com/onepiece/usersystem/common/CommonInterface"
                                         , "freshToken"
                                         , "(Ljava/lang/String;)V"))
      {
            jstring stringToken = t.env->NewStringUTF(token);
            t.env->CallStaticVoidMethod(t.classID, t.methodID , stringToken);
            t.env->DeleteLocalRef(stringToken);
      }
#endif
}

void Jni::transPayList(const char* payList)
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
      JniMethodInfo t;
      if (JniHelper::getStaticMethodInfo(t
                                         , "com/oppay/common/PayInterface"
                                         , "parsePayBillList"
                                         , "(Ljava/lang/String;)V"))
      {
            jstring stringPayList = t.env->NewStringUTF(payList);
            t.env->CallStaticVoidMethod(t.classID, t.methodID , stringPayList);
            t.env->DeleteLocalRef(stringPayList);
      }
#endif

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    UserIAP::share()->setPayList(payList);
#endif
}

void Jni::downUserPhoto(int key , const char* photoList)
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
       JniMethodInfo t;
       if (JniHelper::getStaticMethodInfo(t
                                          , "com/tool/natives/Native"
                                          , "parseUserPhoto"
                                          , "(ILjava/lang/String;)V"))
       {
             jstring stringPhotoList = t.env->NewStringUTF(photoList);
             t.env->CallStaticVoidMethod(t.classID, t.methodID , key , stringPhotoList);
             t.env->DeleteLocalRef(stringPhotoList);
             t.env->DeleteLocalRef(t.classID);

       }
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CHttpPhoto::share()->startDown(key,photoList);
#endif
}

void Jni::showMessageToast(const char* content){
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
   JniMethodInfo t;
   if (JniHelper::getStaticMethodInfo(t
                                      , "com/common/lib/GameParentActivity"
                                      , "showMessage"
                                      , "(Ljava/lang/String;)V"))
   {
         jstring stringContent = t.env->NewStringUTF(content);
         t.env->CallStaticVoidMethod(t.classID, t.methodID , stringContent);
         t.env->DeleteLocalRef(stringContent);
   }
#endif
#if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CSystemInfoMgr::sharedSystemInfoMgr()->showLog(content);
#endif
}

void Jni::redWithCode(const char* code)
{
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
   JniMethodInfo t;
  if(JniHelper::getStaticMethodInfo(t
                                     , "com/tool/natives/Native"
                                     , "redeemCode"
                                     , "(Ljava/lang/String;)V"))
  {
        jstring stringCode = t.env->NewStringUTF(code);
        t.env->CallStaticVoidMethod(t.classID, t.methodID , stringCode);
        t.env->DeleteLocalRef(stringCode);
  }
#endif
}

void Jni::transIPUrl(const char* url)
{
    //CCLOG("jni::transIPUrl: %s",url);
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
//    JniMethodInfo t;
//    if(JniHelper::getStaticMethodInfo(t
//                                        ,"com/onepiece/usersystem/common/OutInterface"
//                                        ,"setServerUrl"
//                                        ,"(Ljava/lang/String;)V")){
//         jstring stringUrl = t.env->NewStringUTF(url);
//         t.env->CallStaticVoidMethod(t.classID , t.methodID , stringUrl);
//         t.env->DeleteLocalRef(stringUrl);
//    }
#endif
#if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CSystemInfoMgr::sharedSystemInfoMgr()->setLogicalServer(url);
#endif
}

void Jni::transAPYUrl(const char* url)
{
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
      JniMethodInfo t;
      if(JniHelper::getStaticMethodInfo(t
                                          ,"com/oppay/common/PayInterface"
                                          ,"setPayIpUrl"
                                          ,"(Ljava/lang/String;)V")){
           jstring stringUrl = t.env->NewStringUTF(url);
           t.env->CallStaticVoidMethod(t.classID , t.methodID , stringUrl);
           t.env->DeleteLocalRef(stringUrl);
      }
#endif
#if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CSystemInfoMgr::sharedSystemInfoMgr()->setVPSServer(url);
#endif
}

std::string Jni::cdKeySharePictures(const char* key,const char* picPath, float scale)
{
    //CCLog("cdKeySharePictures : picPath  : %s" , picPath);
    bool isCode = true;
    
    std::string codeKey = std::string(key);
    
    if (codeKey=="" || codeKey.length()<4) {
        //CCLog("codeKey:  %s",codeKey.c_str());
        isCode = false;
    }
    
    CCSprite *sprite = CCSprite::create(picPath);
    
    if (!sprite) {
        return picPath;
    }

    sprite->setScale(scale);
    
    
    CCSize spriteContentSize = sprite->getContentSize();
    
    CCSize winSize = CCSizeMake(spriteContentSize.width*scale, spriteContentSize.height*scale);
    
    //定义一个屏幕大小的渲染纹理e
    CCRenderTexture* pScreen = CCRenderTexture::create(winSize.width,winSize.height);
    
    //获得当前的场景指针
    CCScene* pCurScene = CCScene::create();
    
    CCLayer *layer = CCLayer::create();
    
    layer->setContentSize(winSize);
    
    layer->setAnchorPoint(ccp(0, 0));
    
    layer->setPosition(ccp(0,0));
    
    sprite->setAnchorPoint(ccp(0.5, 0.5));
    
    sprite->setPosition(ccp(winSize.width/2, winSize.height/2));
    
    layer->addChild(sprite);
    
    if(isCode)
    {
        CCLabelTTF *_field = CCLabelTTF::create(key, "Heiti SC", 30);
        
        _field->setAnchorPoint(ccp(0, 0));
        
        _field->setPosition(ccp(0, 0));
        
        CCSize LabelSize= _field->getContentSize();
        
        float scaleX = LabelSize.width/winSize.width;
        
        if (scaleX > 1) {
            _field->setScale((1.0/scaleX));
        }
        
        layer->addChild(_field);
    }
    
    pCurScene->addChild(layer);

    //渲染纹理开始捕捉
    pScreen->begin();
    //当前场景参与绘制
    pCurScene->visit();
    //结束捕捉
    pScreen->end();
    
    pCurScene->removeChild(layer);

    //保存为jpg，经过裁切的
    std::string fileName = "Print.jpg";
    
    std::string fullpath = CCFileUtils::sharedFileUtils()->getWritablePath() + fileName;

    pScreen->saveToFile(fileName.c_str(), kCCImageFormatJPEG);
    
    //CCLog("fullPath : %s" , fullpath.c_str());
    
    return fullpath;
}

//截屏Scene
std::string Jni::printScene(float scale,float offsetY)
{
    
    CCSize size = CCDirector::sharedDirector()->getWinSize();

    //定义一个屏幕大小的渲染纹理e
    CCRenderTexture* pScreen = CCRenderTexture::create(size.width*scale,(size.height+offsetY)*scale);
    
    //获得当前的场景指针
    CCScene* pCurScene = CCDirector::sharedDirector()->getRunningScene();
    
    if (!pCurScene) {
        return "";
    }

    int runSceneScale = pCurScene->getScale();
    float runScenePosY = pCurScene->getPosition().y;
    
    pCurScene->setScale(scale);
    pCurScene->setPositionY(runScenePosY + offsetY * scale);
    
    
    //渲染纹理开始捕捉
    pScreen->begin();
    //当前场景参与绘制
    pCurScene->visit();
    //结束捕捉
    pScreen->end();
    
    pCurScene->setScale(runSceneScale);
    
    pCurScene->setPositionY(runScenePosY);
    
    //保存为jpg，经过裁切的
    std::string fileName = "Print.jpg";
    
    std::string fullpath = CCFileUtils::sharedFileUtils()->getWritablePath() + fileName;
    
    pScreen->saveToFile(fileName.c_str(), kCCImageFormatJPEG);
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CSystemInfoMgr::sharedSystemInfoMgr()->addSkipBackupAttributeToItemAtURL(fullpath.c_str());
#endif
    return fullpath.c_str();
}

//截屏Layer
std::string Jni::printLayer(int tag,float scale)
{
    //获得当前的场景指针
    CCScene* pCurScene = CCDirector::sharedDirector()->getRunningScene();
    
    CCLayer *layer = (CCLayer *)pCurScene->getChildByTag(tag);
    
    if (!layer) {
        return "";
    }
    
    CCSize size = layer->getContentSize();
    
    //定义一个屏幕大小的渲染纹理e
    CCRenderTexture* pScreen = CCRenderTexture::create(size.width*scale,size.height*scale);

    int layerScale = layer->getScale();
    bool isVisible = layer->isVisible();

    layer->setVisible(true);
    layer->setScale(scale);
    
    
    //渲染纹理开始捕捉
    pScreen->begin();
    //当前场景参与绘制
    pCurScene->visit();
    //结束捕捉
    pScreen->end();
    
    //保存为jpg，经过裁切的
    std::string fileName = "Print.jpg";
    
    std::string fullpath = CCFileUtils::sharedFileUtils()->getWritablePath() + fileName;
    
    layer->setScale(layerScale);
    layer->setVisible(isVisible);
    
    pScreen->saveToFile(fileName.c_str(), kCCImageFormatJPEG);
	
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CSystemInfoMgr::sharedSystemInfoMgr()->addSkipBackupAttributeToItemAtURL(fullpath.c_str());
	#endif
		
    return fullpath.c_str();
}

std::string Jni::printSystemView()
{
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    return CSystemInfoMgr::sharedSystemInfoMgr()->printGLView();
    #endif
   
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    
    JniMethodInfo t;
    if (JniHelper::getStaticMethodInfo(t
                                       , "com/thirdsdk/share/ShareInterface"
                                       , "screenShot"
                                       , "()Ljava/lang/String;"))
    {
        jstring str = (jstring)t.env->CallStaticObjectMethod(t.classID, t.methodID);
        CCString *ret = new CCString(JniHelper::jstring2string(str).c_str());
        ret->autorelease();
        t.env->DeleteLocalRef(str);
        t.env->DeleteLocalRef(t.classID);
        return ret->m_sString;
    }
    #endif
    
}

void Jni::openURL(const char *url)
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CSystemInfoMgr::sharedSystemInfoMgr()->openURL(url);
#endif
    
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
    if (JniHelper::getStaticMethodInfo(t
                                       , "com/common/lib/OpWrapper"
                                       , "openUri"
                                       , "(Ljava/lang/String;)V"))
    {
        jstring jurl = t.env->NewStringUTF(url);
        t.env->CallStaticVoidMethod(t.classID, t.methodID , jurl);
        t.env->DeleteLocalRef(jurl);
    }
#endif
}

void Jni::closeGameTouch()
{
    cocos2d::CCDirector::sharedDirector()->getTouchDispatcher()->setDispatchEvents(false);
}

void Jni::openGameTouch()
{
    cocos2d::CCDirector::sharedDirector()->getTouchDispatcher()->setDispatchEvents(true);
}

const char* Jni::getConfigParam()
{
     #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
            JniMethodInfo t;
             if (JniHelper::getStaticMethodInfo(t
                 , "com/tool/natives/Native"
                 , "getConfigParams"
                 , "()Ljava/lang/String;"))
             {
                jstring str = (jstring)t.env->CallStaticObjectMethod(t.classID, t.methodID);
                CCString *ret = new CCString(JniHelper::jstring2string(str).c_str());
                ret->autorelease();
                t.env->DeleteLocalRef(str);
                t.env->DeleteLocalRef(t.classID);
                return ret->m_sString.c_str();
             }
     #endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    string configObj= configToJs::getConfigStr();

    return configObj.c_str();
#endif
}

void Jni::applicationWillEnterForeground(){
     #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
            JniMethodInfo t;
             if (JniHelper::getStaticMethodInfo(t
                 , "com/common/lib/GameParentActivity"
                 , "applicationWillEnterForeground"
                 , "()V"))
             {
                t.env->CallStaticVoidMethod(t.classID, t.methodID);
             }
     #endif
}

void Jni::updateUserPhoto(){
     #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
          JniMethodInfo t;
          if(JniHelper::getStaticMethodInfo(t
                                              ,"com/onepiece/usersystem/common/OutInterface"
                                              ,"updateUserPhoto"
                                              ,"()V")){
               t.env->CallStaticVoidMethod(t.classID , t.methodID);
          }
     #endif
}

const char* Jni::getIMEI(){
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
      JniMethodInfo t;
      if (JniHelper::getStaticMethodInfo(t
          , "org/cocos2dx/lib/Cocos2dxActivity"
          , "getImei"
          , "()Ljava/lang/String;"))
      {
          jstring str = (jstring)t.env->CallStaticObjectMethod(t.classID, t.methodID);
          CCString *ret = new CCString(JniHelper::jstring2string(str).c_str());
          ret->autorelease();
          t.env->DeleteLocalRef(str);
          t.env->DeleteLocalRef(t.classID);
          return ret->m_sString.c_str();
      }
#endif

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    return CSystemInfoMgr::sharedSystemInfoMgr()->getDeviceID().c_str();
#endif
    return "";
}

const char* Jni::getMacAddress()
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
	return "123456";//先屏蔽掉BUG
//    return CSystemInfoMgr::sharedSystemInfoMgr()->getMacAddress().c_str();
#endif
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo methodInfo;
	jstring jstr;
	if (JniHelper::getStaticMethodInfo(methodInfo, "org/cocos2dx/lib/Cocos2dxHelper", "getMacAddress", "()Ljava/lang/String;"))
	{
		jstr = (jstring)methodInfo.env->CallStaticObjectMethod(methodInfo.classID, methodInfo.methodID);
	}
	methodInfo.env->DeleteLocalRef(methodInfo.classID);
	const char* macAddress = methodInfo.env->GetStringUTFChars(jstr, NULL);
    return macAddress;
#endif
}//获取设备MAc地址

const char* Jni::getIDFA()
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    return CSystemInfoMgr::sharedSystemInfoMgr()->getIDFA().c_str();
#endif
    return "";
}//广告跟踪标识

const char* Jni::getAppVersion()
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    return CSystemInfoMgr::sharedSystemInfoMgr()->getAppVersion().c_str();
#endif
    
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo methodInfo;
	jstring jstr;
	if (JniHelper::getStaticMethodInfo(methodInfo, "org/cocos2dx/lib/Cocos2dxHelper", "getSystemVersion", "()Ljava/lang/String;"))
	{
		jstr = (jstring)methodInfo.env->CallStaticObjectMethod(methodInfo.classID, methodInfo.methodID);
	}
	methodInfo.env->DeleteLocalRef(methodInfo.classID);
	const char* sysVersion = methodInfo.env->GetStringUTFChars(jstr, NULL);
    return sysVersion;
#endif
}


void Jni::setNetWorkType(int netWorkType)
{
//    CCLog("网络环境发生了改变 ＝ %d", netWorkType);
//    
    JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
    JSObject *global = ScriptingCore::getInstance()->getGlobalObject();
    if (!context || !global) {
        return;
    }
    jsval argv[1];
    jsval res;
    jsval argv_1 = int32_to_jsval(context , netWorkType);
    argv[0] = argv_1;
    JS_CallFunctionName(context , global , "setNetWorkType" , 1 , argv , &res);
}

void Jni::updateDownOneFile(const char* saveDir , const char* type, const char* url){
    
    #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
         JniMethodInfo t;
         if(JniHelper::getStaticMethodInfo(t
                                             ,"com/download/UpdateAllMgr"
                                             ,"updateDownOneFile"
                                             ,"(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V")){
              jstring stringDir = t.env->NewStringUTF(saveDir);
              jstring stringType = t.env->NewStringUTF(type);
              jstring stringUrl = t.env->NewStringUTF(url);
              t.env->CallStaticVoidMethod(t.classID , t.methodID , stringDir , stringType , stringUrl);
              t.env->DeleteLocalRef(stringDir);
              t.env->DeleteLocalRef(stringType);
              t.env->DeleteLocalRef(stringUrl);
         }
    #endif
    
    #if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        CHttpUpdateZip::share()->startDownFile(saveDir,url);
    #endif
}

void Jni::updateUnzipFile(const char* filePath, const char* targetDir){
   #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
         JniMethodInfo t;
         if(JniHelper::getStaticMethodInfo(t
                                             ,"com/download/UpdateAllMgr"
                                             ,"Unzip"
                                             ,"(Ljava/lang/String;Ljava/lang/String;)V")){
              jstring stringfilePath = t.env->NewStringUTF(filePath);
              jstring stringTDir = t.env->NewStringUTF(targetDir);
              t.env->CallStaticVoidMethod(t.classID , t.methodID , stringfilePath , stringTDir);
              t.env->DeleteLocalRef(stringfilePath);
              t.env->DeleteLocalRef(stringTDir);
         }
   #endif
#if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    bool unzip = CFileUnZip::start(filePath, targetDir);
    if (unzip==false) {
        Jni::updateUnzipFail();
    }else
    {
        Jni::updateUnzipCompleted();
    }
#endif
    
    if (cocos2d::CCFileUtils::sharedFileUtils()->isFileExist(filePath)) {
        remove(filePath);
    }
}

const char* Jni::getVersionName(){
    #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
       JniMethodInfo t;
       if(JniHelper::getStaticMethodInfo(t
                                         ,"com/common/lib/Config"
                                         ,"getVersionName"
                                         ,"()Ljava/lang/String;")){

          jstring version = (jstring)t.env->CallStaticObjectMethod(t.classID , t.methodID);
          CCString *versioncoco = new CCString(JniHelper::jstring2string(version).c_str());
          versioncoco->autorelease();
          t.env->DeleteLocalRef(version);
          //CCLog("jni versionName : %s" , versioncoco->m_sString.c_str());
          return versioncoco->m_sString.c_str();
       }
    #endif
    
#if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    return CSystemInfoMgr::sharedSystemInfoMgr()->getVersionName().c_str();
#endif
}

void Jni::restartApp()
{
  #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
         JniMethodInfo t;
         if(JniHelper::getStaticMethodInfo(t
                                           ,"com/download/UpdateAllMgr"
                                           ,"restartApp"
                                           ,"()V")){
            t.env->CallStaticVoidMethod(t.classID , t.methodID);
         }
  #endif
}

void Jni::installApk(const char *apkPath)
{
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
    if(JniHelper::getStaticMethodInfo(t
                                      ,"com/download/UpdateAllMgr"
                                      ,"installApk"
                                      ,"(Ljava/lang/String;)V")){
        
        jstring jstrApkPath = t.env->NewStringUTF(apkPath);
        
        t.env->CallStaticVoidMethod(t.classID , t.methodID , jstrApkPath);
        
        t.env->DeleteLocalRef(jstrApkPath);
    }
#endif
    
#if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CHttpUpdateZip::share()->updateAPP(apkPath);
#endif
}

void Jni::sendMails(const char *mails, const char* subject, const char* context)
{
   //CCLog("send mails %s" , subject);
   #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
    if(JniHelper::getStaticMethodInfo(t , "com/common/lib/GameParentActivity"
                                        , "toKefuEmail"
                                        , "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V"
                                        )){
        jstring jmails = t.env->NewStringUTF(mails);
        jstring jsubject = t.env->NewStringUTF(subject);
        jstring jcontext = t.env->NewStringUTF(context);
        t.env->CallStaticVoidMethod(t.classID , t.methodID , jmails ,jsubject , jcontext);
        t.env->DeleteLocalRef(jsubject);
        t.env->DeleteLocalRef(jcontext);
        t.env->DeleteLocalRef(jmails);
    }
   #endif
#if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CSystemInfoMgr::sharedSystemInfoMgr()->sendMails(mails, subject, context);
#endif

}

bool Jni::isSizeEnough(int size)
{
   #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
   JniMethodInfo t;
   if(JniHelper::getStaticMethodInfo(t , "com/android/tool/CSPackage"
                                       , "isSizeEnough"
                                       ,"(I)Z")){
       jboolean ret = t.env->CallStaticBooleanMethod(t.classID , t.methodID , size);
       //CCLog("ret is %d" , ret);
       return ret;
   }
   #endif
   return true;
}

int Jni::getAssetsFileSize(const char* context) {
    #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
        if(JniHelper::getStaticMethodInfo(t , "com/android/tool/CSPackage"
                                            , "assetsFileSize"
                                            ,"(Ljava/lang/String;)I")){
            jstring jcontext = t.env->NewStringUTF(context);
            jint num = t.env->CallStaticIntMethod(t.classID , t.methodID , jcontext);
            t.env->DeleteLocalRef(jcontext);
            return num;
        }
    #endif
    return 0;
}

int Jni::getUrlFileSize(const char* url){
   #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
   JniMethodInfo t;
       if(JniHelper::getStaticMethodInfo(t , "com/android/tool/CSPackage"
                                           , "netWorkFileSize"
                                           ,"(Ljava/lang/String;)I")){
           jstring jurl = t.env->NewStringUTF(url);
           jint num = t.env->CallStaticIntMethod(t.classID , t.methodID , jurl);
           t.env->DeleteLocalRef(jurl);
           return num;
       }
   #endif
   return 0;
}

void Jni::showDialog(const char* context){
    #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
       JniMethodInfo t;
           if(JniHelper::getStaticMethodInfo(t , "com/common/lib/GameParentActivity"
                                               , "showDialogAndExitGame"
                                               ,"(Ljava/lang/String;)V")){
               jstring jcontext = t.env->NewStringUTF(context);
               t.env->CallStaticVoidMethod(t.classID , t.methodID , jcontext);
               t.env->DeleteLocalRef(jcontext);
           }
    #endif
}

void Jni::showMessageBox(const char* context,const char* buttonLeft,const char* buttonRight)
{
#if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CSystemInfoMgr::sharedSystemInfoMgr()->showMessageBox(context, buttonLeft, buttonRight);
#endif
}

void Jni::autoToLogin(){
    JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
    JSObject *global = ScriptingCore::getInstance()->getGlobalObject();
    jsval argv[0];
    jsval res;
    JS_CallFunctionName(context , global , "nativeAutoToLogin" , 0 , argv , &res);
}

void Jni::showDialogEx(int tag,const char* title,const char* message,const char* buttonJsonArray)
{
#if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CSystemInfoMgr::sharedSystemInfoMgr()->showDialogEx(tag, title, message, buttonJsonArray);
#endif
}

const char* Jni::getDeviceModel(){
  #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo methodInfo;
	jstring jstr;
	if (JniHelper::getStaticMethodInfo(methodInfo, "org/cocos2dx/lib/Cocos2dxHelper", "getDeviceModel", "()Ljava/lang/String;"))
	{
		jstr = (jstring)methodInfo.env->CallStaticObjectMethod(methodInfo.classID, methodInfo.methodID);
	}
	methodInfo.env->DeleteLocalRef(methodInfo.classID);
	
	const char* deviceModel = methodInfo.env->GetStringUTFChars(jstr, NULL);
    return deviceModel;
  #endif
  #if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    return "";
  #endif
}

void Jni::facebookInvite(const char* content)
{
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
    if(JniHelper::getStaticMethodInfo(t
                                      , "com/onepiece/usersystem/common/OutInterface"
                                      , "inviteFriend"
                                      , "(Ljava/lang/String;)V"))
    {
        jstring jcontent = t.env->NewStringUTF(content);
        t.env->CallStaticVoidMethod(t.classID, t.methodID ,jcontent);
        t.env->DeleteLocalRef(jcontent);
    }
    
#endif
}

const  char* Jni::getSignHash(){
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
    if(JniHelper::getStaticMethodInfo(t
                                      , "com/common/lib/Config"
                                      , "getSignInfo"
                                      , "()Ljava/lang/String;"))
    {
        
        jstring signHash = (jstring)t.env->CallStaticObjectMethod(t.classID , t.methodID);
        CCString *signHashString = new CCString(JniHelper::jstring2string(signHash).c_str());
        signHashString->autorelease();
        t.env->DeleteLocalRef(signHash);
        return signHashString->m_sString.c_str();
    }
    
#endif
    
#if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    return "";
#endif
}


void Jni::openWebView(const char *url)
{
  #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CWebView::show(url);
  #endif
    
  #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
    if (JniHelper::getStaticMethodInfo(t
                                       , "com/common/lib/GameParentActivity"
                                       , "openURLDialog"
                                       , "(Ljava/lang/String;)V"))
    {
        jstring jurl = t.env->NewStringUTF(url);
        t.env->CallStaticVoidMethod(t.classID, t.methodID , jurl);
        t.env->DeleteLocalRef(jurl);
    }
  #endif
}

const char* Jni::getDexMd5()
{
    return (STR_MD5);
}



void Jni::kakaoLogin()
{
    //CCLog("shareToShareType : %s" , picPath);
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
        if (JniHelper::getStaticMethodInfo(t
                                           , "com/onepiece/usersystem/common/OutInterface"
                                           , "login"
                                           , "(I)V"))
        {
            t.env->CallStaticVoidMethod(t.classID, t.methodID);
        }
#endif

}
	
void Jni::setTimeOutPassSign(bool sign)
{
#if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CCLog("setTimeOutPassSign = %d",sign);
    UserIAP::share()->setPassTimeOutSign(sign);
#endif

}
