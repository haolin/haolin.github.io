//
//  KakaoJoy.cpp
//  PetMania
//
//  Created by hong.zhang on 14-7-18.
//
//

#include "KakaoJoy.h"
#include "cocos2d.h"
#include "ScriptingCore.h"
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#include <jni.h>
#include <android/log.h>
#include "jni/JniHelper.h"
#include "jni/Java_org_cocos2dx_lib_Cocos2dxHelper.h"
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
#include "CUserSystem.h"
#include "UserIAP.h"
#include "CGameCenter.h"
#endif
using namespace cocos2d;

extern "C"{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    __attribute__ ((visibility("default"))) jboolean JNICALL Java_com_xgw_kakao_gameservice_PlayGameWrapper_nativeKakaoJoyServiceInit(JNIEnv *env ,jobject obj, jstring jsonStr)
    {
       std::string jsonstr = JniHelper::jstring2string(jsonStr);

       JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
       JSObject *global = ScriptingCore::getInstance()->getGlobalObject();
       jsval argv[1];
       jsval res;

       if (context == NULL)
       {
            CCLOG("nativeKakaoJoyServiceInit__________________context is null !");
            return false;
       }
       jsval argv_1 = std_string_to_jsval(context , jsonstr);
       argv[0] = argv_1;
       JS_CallFunctionName(context,global,"KakaoJoyInit" , 1 , argv, &res);

       return true;
    }
#endif


}



KakaoJoy::KakaoJoy()
{
}

KakaoJoy* KakaoJoy::getInstance(){
    static KakaoJoy KakaoJoy;

    return &KakaoJoy;
}

void KakaoJoy::sendTemplateMessage(int nType, const char* strUserid, const char* strTempleteId, const char* strExcuteUrl, const char* strJson){
    #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        JniMethodInfo t;
        if (JniHelper::getStaticMethodInfo(t
                                           , "com/onepiece/usersystem/common/OutInterface"
                                           , "sendTemplateMessage"
                                           , "(ILjava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V"))
        {
            jstring jsstrUserid = t.env->NewStringUTF(strUserid);
            jstring jsstrTempleteId = t.env->NewStringUTF(strTempleteId);
            jstring jsstrExcuteUrl = t.env->NewStringUTF(strExcuteUrl);
            jstring jsstrJson = t.env->NewStringUTF(strJson);

            t.env->CallStaticVoidMethod(t.classID, t.methodID, nType, jsstrUserid, jsstrTempleteId, jsstrExcuteUrl, jsstrJson);

            t.env->DeleteLocalRef(jsstrUserid);
            t.env->DeleteLocalRef(jsstrTempleteId);
            t.env->DeleteLocalRef(jsstrExcuteUrl);
            t.env->DeleteLocalRef(jsstrJson);
        }
    #endif

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
	CUserSystem::share()->sendMessage(nType, strUserid, strTempleteId, strExcuteUrl, strJson);
#endif

}


void KakaoJoy::showMessageBlockDialog(){
    #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        JniMethodInfo t;
        if (JniHelper::getStaticMethodInfo(t
                                           , "com/onepiece/usersystem/common/OutInterface"
                                           , "showMessageBlockDialog"
                                           , "()V"))
        {
            t.env->CallStaticVoidMethod(t.classID, t.methodID);
        }
    #endif

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
	CUserSystem::share()->showMessageBlockDialog();
#endif

}

