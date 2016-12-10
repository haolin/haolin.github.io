//
//  GooglePlayGame.cpp
//  PetMania
//
//  Created by 周成山 on 14-3-4.
//
//

#include "GooglePlayGame.h"
#include "cocos2d.h"
#include "ScriptingCore.h"
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#include <jni.h>
#include <android/log.h>
#include "jni/JniHelper.h"
#include "jni/Java_org_cocos2dx_lib_Cocos2dxHelper.h"
#endif

using namespace cocos2d;

extern "C"{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    __attribute__ ((visibility("default"))) jboolean JNICALL Java_com_xgw_googleplay_gameservice_PlayGameWrapper_nativeGooglePlayGameServiceInit(JNIEnv *env ,jobject obj, jstring jsonStr)
    {
       std::string jsonstr = JniHelper::jstring2string(jsonStr);

       JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
       JSObject *global = ScriptingCore::getInstance()->getGlobalObject();
       jsval argv[1];
       jsval res;

       if (context == NULL)
       {
            CCLOG("nativeGooglePlayGameServiceInit__________________context is null !");
            return false;
       }
       jsval argv_1 = std_string_to_jsval(context , jsonstr);
       argv[0] = argv_1;
       JS_CallFunctionName(context,global,"GooglePlayGameInit" , 1 , argv, &res);

       return true;
    }
#endif
}



GooglePlayGame::GooglePlayGame()
{
}

GooglePlayGame* GooglePlayGame::getInstance(){
    static GooglePlayGame googleplayGame;
    
    return &googleplayGame;
}

void GooglePlayGame::increment(const char *achievementId, int increment){
    #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        JniMethodInfo t;
        if(JniHelper::getStaticMethodInfo(t , 
            "com/xgw/googleplay/gameservice/PlayGameWrapper"
            ,"increment"
            ,"(Ljava/lang/String;I)V")){
            jstring strAchievementId = t.env->NewStringUTF(achievementId);
            t.env->CallStaticVoidMethod(t.classID,t.methodID , strAchievementId , increment);
            t.env->DeleteLocalRef(strAchievementId);
        } 
    #endif
    
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)

    #endif
    
}

void GooglePlayGame::unLockAchievement(const char* achievementId)
{
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
    if(JniHelper::getStaticMethodInfo(t ,
                                      "com/xgw/googleplay/gameservice/PlayGameWrapper"
                                      ,"unLockAchievements"
                                      ,"(Ljava/lang/String;)V")){
        jstring strAchievementId = t.env->NewStringUTF(achievementId);
        t.env->CallStaticVoidMethod(t.classID,t.methodID , strAchievementId);
        t.env->DeleteLocalRef(strAchievementId);
    }
#endif
    
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    
#endif
}

void GooglePlayGame::submitLevel(const char *leaderBoardId, int newLevel){
    #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        JniMethodInfo t;
        if(JniHelper::getStaticMethodInfo(t , 
            "com/xgw/googleplay/gameservice/PlayGameWrapper"
            ,"submitLevel"
            ,"(Ljava/lang/String;I)V")){
            jstring strleaderBoardId = t.env->NewStringUTF(leaderBoardId);
            t.env->CallStaticVoidMethod(t.classID,t.methodID , strleaderBoardId , newLevel);
            t.env->DeleteLocalRef(strleaderBoardId);
        }
    #endif
    
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    
    #endif
}

void GooglePlayGame::displayAchievement(){
    #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
        if(JniHelper::getStaticMethodInfo(t , 
            "com/xgw/googleplay/gameservice/PlayGameWrapper"
            ,"displayAchievement"
            ,"()V")){
            t.env->CallStaticVoidMethod(t.classID,t.methodID);
        }
    #endif
    
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    
    #endif
}

void GooglePlayGame::displayLeaderBoard(const char* leaderBoardId){
    #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
        JniMethodInfo t;
        if(JniHelper::getStaticMethodInfo(t , 
            "com/xgw/googleplay/gameservice/PlayGameWrapper"
            ,"displayLeaderBoard"
            ,"(Ljava/lang/String;)V")){
            jstring strleaderBoardId = t.env->NewStringUTF(leaderBoardId);
            t.env->CallStaticVoidMethod(t.classID,t.methodID , strleaderBoardId);
            t.env->DeleteLocalRef(strleaderBoardId);
        }
    #endif
    
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    
    #endif
}
