//
//  PartyTrackJni.cpp
//  PetMania
//
//  Created by hong.zhang on 14-8-18.
//
//

#include "PartyTrackJni.h"
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
    __attribute__ ((visibility("default"))) jboolean JNICALL Java_com_xgw_kakao_gameservice_PlayGameWrapper_nativePartyTrackJniServiceInit(JNIEnv *env ,jobject obj, jstring jsonStr)
    {
       std::string jsonstr = JniHelper::jstring2string(jsonStr);

       JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
       JSObject *global = ScriptingCore::getInstance()->getGlobalObject();
       jsval argv[1];
       jsval res;

       if (context == NULL)
       {
            CCLOG("nativePartyTrackJniServiceInit__________________context is null !");
            return false;
       }
       jsval argv_1 = std_string_to_jsval(context , jsonstr);
       argv[0] = argv_1;
       JS_CallFunctionName(context,global,"PartyTrackJniInit" , 1 , argv, &res);

       return true;
    }
#endif


}



PartyTrackJni::PartyTrackJni()
{
}

PartyTrackJni* PartyTrackJni::getInstance(){
    static PartyTrackJni PartyTrackJni;

    return &PartyTrackJni;
}

void PartyTrackJni::partytrackEvent(int nId){
    #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        JniMethodInfo t;
        if (JniHelper::getStaticMethodInfo(t
                                           , "com/id/partytrack/Partytrack"
                                           , "partyTrackEvent"
                                           , "(I)V"))
        {
            t.env->CallStaticVoidMethod(t.classID, t.methodID, nId);
        }
    #endif

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)

#endif

}

void PartyTrackJni::partytrackPayment(const char* itemName, const char* itemPriceCurrency, int itemPrice, int itemNum){
    #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        JniMethodInfo t;
        if (JniHelper::getStaticMethodInfo(t
                                           , "com/id/partytrack/Partytrack"
                                           , "partyTrackPayment"
                                           , "(Ljava/lang/String;Ljava/lang/String;II)V"))
        {
            jstring jsstritemName = t.env->NewStringUTF(itemName);
            jstring jsstritemPriceCurrency = t.env->NewStringUTF(itemPriceCurrency);


            t.env->CallStaticVoidMethod(t.classID, t.methodID, jsstritemName, jsstritemPriceCurrency, itemPrice, itemNum);

            t.env->DeleteLocalRef(jsstritemName);
            t.env->DeleteLocalRef(jsstritemPriceCurrency);

        }
    #endif

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)

#endif

}


