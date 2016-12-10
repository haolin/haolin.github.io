//
//  Statistics.cpp
//  PetMania
//
//  Created by 周成山 on 13-8-14.
//
//


#include "Statistics.h"
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
#include "CWriteDown.h"
#include "CocoBIKakao.h"
#endif

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    #include <android/log.h>
    #include "jni/JniHelper.h"
    #include <jni.h>
#endif

Statistics::Statistics()
:m_isStart(false)
{
    
}

Statistics::~Statistics()
{
    
}

void Statistics::logEvent(const char *eventName , bool isUseBI)
{
    if(!m_isStart)
    {
        CCLog("没有初始化Statistics统计");
        return;
    }
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
    if (JniHelper::getStaticMethodInfo(t
                                       , "com/thirdsdk/wrapper/NativeWrapper"
                                       , "logEvent"
                                       , "(Ljava/lang/String;Z)V"))
    {
        jstring stringEventName = t.env->NewStringUTF(eventName);
        t.env->CallStaticVoidMethod(t.classID, t.methodID, stringEventName ,isUseBI);
        t.env->DeleteLocalRef(stringEventName);
    }
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CWriteDown::share()->logEvent(eventName);
#endif
}

void Statistics::logEventEx(const char* eventName ,const char *HashStr , bool isUseBI)
{
    if(!m_isStart)
    {
        CCLog("没有初始化Statistics统计");
        return;
    }
    
    
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
    if (JniHelper::getStaticMethodInfo(t
                                       , "com/thirdsdk/wrapper/NativeWrapper"
                                       , "logEvent"
                                       , "(Ljava/lang/String;Ljava/lang/String;Z)V"))
    {
        jstring stringEventName = t.env->NewStringUTF(eventName);
//        jclass class_Hashtable = t.env->FindClass("java/util/Hashtable");
//        jmethodID construct_method = t.env->GetMethodID( class_Hashtable, "<init>","()V");
//        jobject obj_Map = t.env->NewObject( class_Hashtable, construct_method, "");
//
//        jmethodID add_method= t.env->GetMethodID( class_Hashtable,"put","(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;");
//
//        for (std::map<std::string, std::string>::iterator it = par->m_map.begin(); it != par->m_map.end(); ++it)
//        {
//            t.env->CallObjectMethod(obj_Map, add_method, t.env->NewStringUTF(it->first.c_str()), t.env->NewStringUTF(it->second.c_str()));
//        }
        // t.env->DeleteLocalRef(class_Hashtable);

        jstring eventDes = t.env->NewStringUTF(HashStr);
        t.env->CallStaticVoidMethod(t.classID, t.methodID, stringEventName, eventDes , isUseBI);
        // t.env->DeleteLocalRef(t.classID);
    }
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CWriteDown::share()->logEventEx(eventName, HashStr);
#endif
}

void Statistics::registerWithAccount(const char* account,const char* roleID)
{
    if(!m_isStart)
    {
        CCLog("没有初始化Statistics统计");
        return;
    }
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
       JniMethodInfo t;
       if (JniHelper::getStaticMethodInfo(t
                                          , "com/thirdsdk/wrapper/NativeWrapper"
                                          , "registerWithAccount"
                                          , "(Ljava/lang/String;Ljava/lang/String;)V"))
       {
           jstring stringAccount = t.env->NewStringUTF(account);
           jstring stringRoleId = t.env->NewStringUTF(roleID);
           t.env->CallStaticVoidMethod(t.classID, t.methodID, stringAccount ,stringRoleId);
           t.env->DeleteLocalRef(stringAccount);
           t.env->DeleteLocalRef(stringRoleId);
       }
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CWriteDown::share()->registerWithAccount(account, roleID);
#endif
}

void Statistics::loginWithAccount(const char* account,const char* roleID)
{
    if(!m_isStart)
    {
        CCLog("没有初始化Statistics统计");
        return;
    }

#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
//       JniMethodInfo t;
//       if (JniHelper::getStaticMethodInfo(t
//                                          , "com/thirdsdk/wrapper/NativeWrapper"
//                                          , "loginWithAccount"
//                                          , "(Ljava/lang/String;Ljava/lang/String;)V"))
//       {
//           jstring stringAccount = t.env->NewStringUTF(account);
//           jstring stringRoleId = t.env->NewStringUTF(roleID);
//           t.env->CallStaticVoidMethod(t.classID, t.methodID, stringAccount ,stringRoleId);
//           t.env->DeleteLocalRef(stringAccount);
//           t.env->DeleteLocalRef(stringRoleId);
//       }
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CocoBIKakao::share()->loginWithAccount(account, roleID);
#endif
}

void Statistics::createRoleWithAccount(const char* account,const char* roleID,const char* roleName,const char* charactor)
{
    if(!m_isStart)
    {
        CCLog("没有初始化Statistics统计");
        return;
    }
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
       JniMethodInfo t;
       if (JniHelper::getStaticMethodInfo(t
                                          , "com/thirdsdk/wrapper/NativeWrapper"
                                          , "createRoleWithAccount"
                                          , "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V"))
       {
           jstring stringAccount = t.env->NewStringUTF(account);
           jstring stringRoleId = t.env->NewStringUTF(roleID);
           jstring stringRoleName = t.env->NewStringUTF(roleName);
           jstring stringCharactor = t.env->NewStringUTF(charactor);
           t.env->CallStaticVoidMethod(t.classID, t.methodID, stringAccount ,stringRoleId , stringRoleName , stringCharactor);
           t.env->DeleteLocalRef(stringAccount);
           t.env->DeleteLocalRef(stringRoleId);
           t.env->DeleteLocalRef(stringRoleName);
           t.env->DeleteLocalRef(stringCharactor);
       }
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CWriteDown::share()->createRoleWithAccount(account, roleID, roleName, charactor);
#endif
    
}

void Statistics::roleLoginWithAccount(const char* account,const char* roleID,const char* roleName,int level)
{
    if(!m_isStart)
    {
        CCLog("没有初始化Statistics统计");
        return;
    }
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
       JniMethodInfo t;
       if (JniHelper::getStaticMethodInfo(t
//                                          , "com/thirdsdk/wrapper/NativeWrapper"
                                          , "com/coco/bi/CocoAnalyse"
                                          , "roleLoginWithAccount"
                                          , "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;I)V"))
       {
           jstring stringAccount = t.env->NewStringUTF(account);
           jstring stringRoleId = t.env->NewStringUTF(roleID);
           jstring stringRoleName = t.env->NewStringUTF(roleName);
           t.env->CallStaticVoidMethod(t.classID, t.methodID, stringAccount ,stringRoleId , stringRoleName , level);
           t.env->DeleteLocalRef(stringAccount);
           t.env->DeleteLocalRef(stringRoleId);
           t.env->DeleteLocalRef(stringRoleName);
       }
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CocoBIKakao::share()->roleLoginWithAccount(account,roleID,roleName,level);
#endif
}

void Statistics::roleLogoutWithAccount(const char* account,const char* roleID,const char* roleName,int level,int interval)
{
    if(!m_isStart)
    {
        CCLog("没有初始化Statistics统计");
        return;
    }
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
       JniMethodInfo t;
       if (JniHelper::getStaticMethodInfo(t
                                          , "com/thirdsdk/wrapper/NativeWrapper"
                                          , "roleLogoutWithAccount"
                                          , "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;II)V"))
       {
           jstring stringAccount = t.env->NewStringUTF(account);
           jstring stringRoleId = t.env->NewStringUTF(roleID);
           jstring stringRoleName = t.env->NewStringUTF(roleName);
           t.env->CallStaticVoidMethod(t.classID, t.methodID, stringAccount ,stringRoleId , stringRoleName , level , interval);
           t.env->DeleteLocalRef(stringAccount);
           t.env->DeleteLocalRef(stringRoleId);
           t.env->DeleteLocalRef(stringRoleName);
       }
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CWriteDown::share()->roleLogoutWithAccount(account,roleID,roleName,level,interval);
#endif
}

void Statistics::addCashWithAccount(const char* account,int payType,int cashAdd,int delta)
{
    if(!m_isStart)
    {
        CCLog("没有初始化Statistics统计");
        return;
    }
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
       JniMethodInfo t;
       if (JniHelper::getStaticMethodInfo(t
                                          , "com/thirdsdk/wrapper/NativeWrapper"
                                          , "addCashWithAccount"
                                          , "(Ljava/lang/String;III)V"))
       {
           jstring stringAccount = t.env->NewStringUTF(account);
           t.env->CallStaticVoidMethod(t.classID, t.methodID, stringAccount ,payType , cashAdd , delta);
           t.env->DeleteLocalRef(stringAccount);
       }
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CWriteDown::share()->addCashWithAccount(account,payType,cashAdd, delta);
#endif
}

void Statistics::logBiBuyFailed(const char* orderID)
{
    if(!m_isStart)
    {
        CCLog("没有初始化Statistics统计");
        return;
    }
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
           if (JniHelper::getStaticMethodInfo(t
//                                              , "com/thirdsdk/wrapper/NativeWrapper"
                                              , "com/coco/bi/CocoAnalyse"
                                              , "logBiBuyFailed"
                                              , "(Ljava/lang/String;)V"))
           {
               jstring stringorderID = t.env->NewStringUTF(orderID);
               t.env->CallStaticVoidMethod(t.classID, t.methodID, stringorderID);
               t.env->DeleteLocalRef(stringorderID);
           }

#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CocoBIKakao::share()->logBiBuyFailed(orderID);
#endif
}

void Statistics::logBiBuySuccess(const char* orderID)
{
    if(!m_isStart)
    {
        CCLog("没有初始化Statistics统计");
        return;
    }
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
               if (JniHelper::getStaticMethodInfo(t
        //                                          , "com/thirdsdk/wrapper/NativeWrapper"
                                                  , "com/coco/bi/CocoAnalyse"
                                                  , "logBiBuySuccess"
                                                  , "(Ljava/lang/String;)V"))
               {
                   jstring stringorderID = t.env->NewStringUTF(orderID);
                   t.env->CallStaticVoidMethod(t.classID, t.methodID, stringorderID);
                   t.env->DeleteLocalRef(stringorderID);
               }
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CocoBIKakao::share()->logBiBuySuccess(orderID);
#endif
}

void Statistics::shopBiTrader(const char* account , const char* orderID , const char* itemID , int itemCount , int buyType , int cashLeft , int delta)
{
    if(!m_isStart)
    {
        CCLog("没有初始化Statistics统计");
        return;
    }
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
    if (JniHelper::getStaticMethodInfo(t
//                                       , "com/thirdsdk/wrapper/NativeWrapper"
                                       , "com/coco/bi/CocoAnalyse"
                                       , "shopTrader"
                                       , "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;IIII)V"))
    {
        jstring stringAccountName = t.env->NewStringUTF(account);
        jstring stringOrderID = t.env->NewStringUTF(orderID);
        jstring stringItemID = t.env->NewStringUTF(itemID);
        t.env->CallStaticVoidMethod(t.classID, t.methodID, stringAccountName, stringOrderID , stringItemID,itemCount , buyType , cashLeft , delta);
        t.env->DeleteLocalRef(stringAccountName);
        t.env->DeleteLocalRef(stringOrderID);
        t.env->DeleteLocalRef(stringItemID);
    }
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CocoBIKakao::share()->shopBiTrader(account, orderID, itemID, itemCount, buyType,cashLeft, delta);
#endif
}

void Statistics::start()
{
    m_isStart = true;
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#endif
    
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CocoBIKakao::share()->start();
#endif
}

Statistics* Statistics::getInstance()
{
    static Statistics _statistics;
    return &_statistics;
}

void Statistics::redeemCode(const char* code)
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
