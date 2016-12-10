//
//  shareSdk.cpp
//  CrystalCraze
//
//  Created by �ㄦ�灞�on 13-7-16.
//
//

#include "shareSdk.h"
#include "../jni/Jni.h"
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#include <android/log.h>
#include "jni/JniHelper.h"
#include <jni.h>
#endif

//using namespace cocos2d;

Share :: Share(){
    
}

Share :: ~Share(){
    
}

void Share::shareToSinaWeibo(const char* content, const char* picPath, bool isShowUI)
{
    Jni::shareToShareType(eSinaWeibo, content, picPath,isShowUI);
}

void Share::shareToTencentWeibo(const char* content, const char* picPath, bool isShowUI)
{
    Jni::shareToShareType(eTencentWeibo, content, picPath,isShowUI);
}

void Share::shareToWeChatFriend(const char* content, const char* picPath, bool isShowUI)
{
    //CCLog("shareToWeChatFriend : %s" , std::string(picPath));
    Jni::shareToShareType(eWeChatFriend, content, picPath,isShowUI);
}

void Share::shareToWeChatCircle(const char* content, const char* picPath, bool isShowUI)
{
    Jni::shareToShareType(eWeChatCircle, content, picPath,isShowUI);
}

void Share::shareToRenRen(const char* content, const char* picPath, bool isShowUI)
{
    Jni::shareToShareType(eRenRen, content, picPath,isShowUI);
}

void Share::shareToMail(const char *subject,const char* content, const char* picPath, bool isShowUI)
{
    Jni::shareToMail(subject,content,picPath,isShowUI);
}

void Share::shareToFacebook(const char* content , const char* picPath, bool isShowUI)
{
    Jni::shareToShareType(eFacebook ,content , picPath,isShowUI);
}


//成功分享的回调
void Share :: shareback()
{
	CCLog("shareback");
}
	
Share* Share::getInstance()
{
	static Share *i = new Share();
	
	return i;
}
