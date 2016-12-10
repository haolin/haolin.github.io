//
//  JoySDK.cpp
//  JoySDK
//
//  Created by Louis Vector on 13-7-22.
//
//


#include "OpJoy.h"
#include "../jni/Jni.h"
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#include <android/log.h>
#include "jni/JniHelper.h"
#include "../jni/Jni.h"
#include <jni.h>
#endif

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
#include "CUserSystem.h"
#include "UserIAP.h"
#include "CGameCenter.h"
#endif

#include "ScriptingCore.h"



static std::string m_externalAssetPath;

OpJoy :: OpJoy() {

}

OpJoy :: ~OpJoy(){
    
}

OpJoy* OpJoy::getInstance()
{
	static OpJoy _joy;
	return &_joy;
}


void OpJoy :: login(int flag)
{   
    //CCLog("OpJoy exec OpJoy flag[%d]", flag);
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
    if (JniHelper::getStaticMethodInfo(t
                                       , "com/onepiece/usersystem/common/OutInterface"
                                       , "login"
                                       , "(I)V"))
    {
        t.env->CallStaticVoidMethod(t.classID, t.methodID, flag);
    }

#endif
    
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    UserSystemType type = (UserSystemType)flag;

    CUserSystem::share()->Login(type);
#endif
}

void OpJoy::unregister()
{
    //CCLog("OpJoy exec OpJoy flag[%d]", flag);
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
    if (JniHelper::getStaticMethodInfo(t
                                       , "com/onepiece/usersystem/common/OutInterface"
                                       , "unregister"
                                       , "()V"))
    {
        t.env->CallStaticVoidMethod(t.classID, t.methodID);
    }

#endif

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CUserSystem::share()->Unregister();
#endif
}

void OpJoy::loginCallBack(const char* token , const char* cocoId)
{
   #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
       JniMethodInfo t;
       if (JniHelper::getStaticMethodInfo(t
                                          , "com/onepiece/usersystem/common/OutInterface"
                                          , "loginCallBack"
                                          , "(Ljava/lang/String;Ljava/lang/String;)V"))
       {
           jstring jtoken = t.env->NewStringUTF(token);
           jstring jcocoId = t.env->NewStringUTF(cocoId);
           t.env->CallStaticVoidMethod(t.classID, t.methodID, jtoken , jcocoId);
           t.env->DeleteLocalRef(jtoken);
           t.env->DeleteLocalRef(jcocoId);
       }

   #endif
}

void OpJoy :: isAutoLogin(int joyFlag){

#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
       JniMethodInfo t;
       if (JniHelper::getStaticMethodInfo(t
                                          , "com/onepiece/usersystem/common/OutInterface"
                                          , "isAutologin"
                                          , "(I)V"))
       {
   //	        jstring stringIndex = t.env->NewStringUTF(index);
           t.env->CallStaticVoidMethod(t.classID, t.methodID , joyFlag);
   //	        t.env->DeleteLocalRef(stringIndex);
       }
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    UserSystemType type = (UserSystemType)joyFlag;
    CUserSystem::share()->isAutoLogin(type);
#endif
    
}

void OpJoy::logout(){

   #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
          JniMethodInfo t;
          if (JniHelper::getStaticMethodInfo(t
                                             , "com/onepiece/usersystem/common/OutInterface"
                                             , "loginOut"
                                             , "()V"))
          {
      //	        jstring stringIndex = t.env->NewStringUTF(index);
              t.env->CallStaticVoidMethod(t.classID, t.methodID);
      //	        t.env->DeleteLocalRef(stringIndex);
          }
   #endif
   #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CUserSystem::share()->LogOut();
   #endif
}


void OpJoy :: getJoyGameFriends()
{
    //CCLog("getJoyGameFriends");
    
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
    if (JniHelper::getStaticMethodInfo(t
                                       , "com/onepiece/usersystem/common/OutInterface"
                                       , "getGameFriends"
                                       , "()V"))
    {
        t.env->CallStaticVoidMethod(t.classID, t.methodID);
    }
    
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CUserSystem::share()->getFriendInfo();
#endif
}

void OpJoy :: getAbledInviteFriends()
{
   //CCLog("getAbledInviteFriends");
    
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
   JniMethodInfo t;
   if (JniHelper::getStaticMethodInfo(t
                                      , "com/onepiece/usersystem/common/OutInterface"
                                      , "getAbledInviteFriendsList"
                                      , "()V"))
   {
       t.env->CallStaticVoidMethod(t.classID, t.methodID);
   }
   
#endif
}

void OpJoy :: inviteOneFriend(const char* inviteCode, const char* inviteContent)
{
    //CCLog("inviteOneFriend");
    
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
    if(JniHelper::getStaticMethodInfo(t
                                      , "com/onepiece/usersystem/common/OutInterface"
                                      , "inviteOneFriend"
                                      , "(Ljava/lang/String;Ljava/lang/String;)V"))
    {
       jstring jInviteCode = t.env->NewStringUTF(inviteCode);
       jstring jcontent = t.env->NewStringUTF(inviteContent);
       t.env->CallStaticVoidMethod(t.classID, t.methodID ,jInviteCode , jcontent);
       t.env->DeleteLocalRef(jInviteCode);
       t.env->DeleteLocalRef(jcontent);
    }
#endif
}

void OpJoy :: bindUserInfo(int flag)
{
    //CCLog("OpJoySDK exec bindUserInfo flag[%d]", flag);
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
    if (JniHelper::getStaticMethodInfo(t
                                       , "com/onepiece/usersystem/common/OutInterface"
                                       , "binderUser"
                                       , "(I)V"))
    {
        t.env->CallStaticVoidMethod(t.classID, t.methodID, flag);
    }
#endif
}

void OpJoy :: payBilling(const char* payType , int payid , const char* roleid , const char* billInfo)
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
    if (JniHelper::getStaticMethodInfo(t
                                       , "com/onepiece/usersystem/pay/PayOutInterface"
                                       , "pay"
                                       , "(Ljava/lang/String;ILjava/lang/String;Ljava/lang/String;)V"))
    {
//        t.env->CallStaticVoidMethod(t.classID, t.methodID, money,type,name,count,ext1,ext2,ext3,ext4);
        jstring jStrPayType = t.env->NewStringUTF(payType);

        jstring jStrRoleid = t.env->NewStringUTF(roleid);

        jstring jStrBillInfo = t.env->NewStringUTF(billInfo);

        t.env->CallStaticVoidMethod(t.classID, t.methodID, jStrPayType , payid, jStrRoleid, jStrBillInfo);
        t.env->DeleteLocalRef(jStrPayType);
        t.env->DeleteLocalRef(jStrRoleid);
        t.env->DeleteLocalRef(jStrBillInfo);
    }
    
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    UserIAP::share()->buy(payType,payid,billInfo, roleid);
#endif
}

void OpJoy::addGetUidInfo(const char* tag, const char* uid)
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CUserSystem::share()->addGetUidInfo(tag,uid);
#endif
    
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    //具体实现 , 返回的json串中，还有 id， nick(昵称) ， avatar(图像) , phone(邀请id ,在次为id)
    JniMethodInfo t;
    if (JniHelper::getStaticMethodInfo(t
                                       , "com/onepiece/usersystem/common/OutInterface"
                                       , "getUidInfo"
                                       , "(Ljava/lang/String;Ljava/lang/String;)V"))
    {
        jstring jtag = t.env->NewStringUTF(tag);
        jstring jUid = t.env->NewStringUTF(uid);
        t.env->CallStaticVoidMethod(t.classID, t.methodID, jtag ,jUid);
        t.env->DeleteLocalRef(jtag);
        t.env->DeleteLocalRef(jUid);
    }
    
#endif
}

void OpJoy::downUserPhoto(int key , const char* photoList)
{
    Jni::downUserPhoto(key ,photoList);
}

void OpJoy::updateUserPhoto()
{
    Jni::updateUserPhoto();
}

void OpJoy::facebookInvite(const char* inviteContent)
{
#if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CUserSystem::share()->facebookInvite(inviteContent);
#endif
    
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    Jni::facebookInvite(inviteContent);
#endif
}

void OpJoy::addFriendFromID(const char* uid)
{
#if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CUserSystem::share()->addFriendFromID(uid);
#endif
}

bool OpJoy::isGameCenterAvailable()
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    return CGameCenter::isAvailable();
#endif
    
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    return false;
#endif
}
//登陆GameCenter
void OpJoy::GameCenterLogin()
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)

    CGameCenter::Login();
    
#endif
}

//是否已经登陆GameCenter
bool OpJoy::isGameCenterLogin()
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)

    return CGameCenter::isLogin();
    
#endif
}

//上传分数
void OpJoy::ReportGameCenterScore(int score)
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)

    CGameCenter::ReportScore(score);
    
#endif
}

//显示GameCenter排行榜
void OpJoy::ShowGameCenterLeaderboard()
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)

    CGameCenter::ShowLeaderboard();
    
#endif
}

void OpJoy::CommonInterface_navitecallBack(std::string key ,std::string jsonstr)
{
    JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
    JSObject *global = ScriptingCore::getInstance()->getGlobalObject();
    
    jsval res;
    jsval argv[2];
    
    jsval argv_2 = std_string_to_jsval(context , jsonstr);
    //std::string strSrc(getExternalAssetPath());
    jsval argv_1 = std_string_to_jsval(context , key);
    argv[0] = argv_1;
    argv[1] = argv_2;
    
	std::cout << "string is : " << jsonstr <<std::endl;
	
    JS_CallFunctionName(context , global ,"javaToJsCallBack" , 2 , argv, &res);
}

void OpJoy::CommonUserInfo_navitecallBack(std::string tag ,std::string uid ,std::string info)
{
    JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
    JSObject *global = ScriptingCore::getInstance()->getGlobalObject();
    
    jsval res;
    jsval argv[3];

    
    argv[0] = std_string_to_jsval(context , tag);
    argv[1] = std_string_to_jsval(context , uid);
    argv[2] = std_string_to_jsval(context , info);
    
    JS_CallFunctionName(context , global ,"infoFromUidCallBack" , 3 , argv, &res);
}


extern "C" {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    __attribute__ ((visibility("default"))) jboolean JNICALL Java_com_onepiece_usersystem_common_CommonInterface_navitecallBack(JNIEnv * env, jobject obj, jstring key , jstring jsonStr)
    {
        std::string strKey = JniHelper::jstring2string(key);
        std::string jsonstr = JniHelper::jstring2string(jsonStr);
       // CCLog("Java_com_onepiece_usersystem_common_CommonInterface %s", jsonstr.c_str());
//        if(strKey == ""||strKey.equal("")){
//            OpJoy::getInstance()->CommonUserInfo_navitecallBack(strKey , jsonstr);
//        }
        
        OpJoy::getInstance()->CommonInterface_navitecallBack(strKey ,jsonstr);
        return true;
    }
    
    __attribute__ ((visibility("default"))) jboolean JNICALL Java_com_onepiece_usersystem_common_CommonInterface_nativeCommonUserInfo(JNIEnv * env, jobject obj, jstring tag ,jstring uid , jstring jsonStr)
    {
        std::string strTag = JniHelper::jstring2string(tag);
        std::string strUid = JniHelper::jstring2string(uid);
        std::string jsonstr = JniHelper::jstring2string(jsonStr);
        // CCLog("Java_com_onepiece_usersystem_common_CommonInterface %s", jsonstr.c_str());
        OpJoy::getInstance()->CommonUserInfo_navitecallBack(strTag , strUid , jsonstr);
        return true;
    }

    __attribute__ ((visibility("default"))) jboolean JNICALL Java_com_onepiece_usersystem_pay_PayOutInterface_nativepayCallBack(JNIEnv * env, jobject obj, jstring jsonStr)
    {
        std::string jsonstr = JniHelper::jstring2string(jsonStr);
        std::string strKey =  "pay";
       // CCLog("Java_com_oppay_common_PayInterface_nativepayCallBack %s", jsonstr.c_str());

        JSContext *context = ScriptingCore::getInstance()->getGlobalContext();
        JSObject *global = ScriptingCore::getInstance()->getGlobalObject();

        jsval res;
        jsval argv[2];
        jsval argv_1 = std_string_to_jsval(context , strKey);
        jsval argv_2 = std_string_to_jsval(context , jsonstr);
        argv[0] = argv_1;
        argv[1] = argv_2;

        JS_CallFunctionName(context, global, "javaToJsCallBack", 2, argv, &res);
        return true;
    }
#endif
}


