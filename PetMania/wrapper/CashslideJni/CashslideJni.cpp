//
//  CashslideJni.cpp
//  PetMania
//
//  Created by hong.zhang on 14-8-19.
//
//

#include "CashslideJni.h"
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
    __attribute__ ((visibility("default"))) jboolean JNICALL Java_com_xgw_kakao_gameservice_PlayGameWrapper_nativeCashslideJniServiceInit(JNIEnv *env ,jobject obj, jstring jsonStr)
    {
       std::string jsonstr = JniHelper::jstring2string(jsonStr);

       JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
       JSObject *global = ScriptingCore::getInstance()->getGlobalObject();
       jsval argv[1];
       jsval res;

       if (context == NULL)
       {
            CCLOG("nativeCashslideJniServiceInit__________________context is null !");
            return false;
       }
       jsval argv_1 = std_string_to_jsval(context , jsonstr);
       argv[0] = argv_1;
       JS_CallFunctionName(context,global,"CashslideJniInit" , 1 , argv, &res);

       return true;
    }
#endif


}



CashslideJni::CashslideJni()
{
}

CashslideJni* CashslideJni::getInstance(){
    static CashslideJni CashslideJni;

    return &CashslideJni;
}

void CashslideJni::appFirstLaunched(){
    #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        JniMethodInfo t;
        if (JniHelper::getStaticMethodInfo(t
                                           , "com/ad/cashslide/CashslideInterface"
                                           , "appFirstLaunched"
                                           , "()V"))
        {
            t.env->CallStaticVoidMethod(t.classID, t.methodID);
        }
    #endif

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)

#endif

}



