//
//  shareSdk.h
//  CrystalCraze
//
//  Created by �ㄦ�灞�on 13-7-16.
//
//

#ifndef __CrystalCraze__shareSdk__
#define __CrystalCraze__shareSdk__

#include <string>
#include <stdlib.h>
#include <cocos2d.h>
using namespace cocos2d;

class Share : public cocos2d::CCObject{
public :
	Share();
	~Share();
    
    void shareToSinaWeibo(const char* content, const char* picPath, bool isShowUI);

    void shareToTencentWeibo(const char* content, const char* picPath, bool isShowUI);

    void shareToWeChatFriend(const char* content, const char* picPath, bool isShowUI);
    
    void shareToWeChatCircle(const char* content, const char* picPath, bool isShowUI);

    void shareToRenRen(const char* content, const char* picPath, bool isShowUI);

    void shareToMail(const char *subject,const char* content, const char* picPath, bool isShowUI);
    
    void shareToFacebook(const char* content , const char* picPath, bool isShowUI);

	void shareback();
	
	static Share* getInstance();
};

#endif /* defined(__CrystalCraze__shareSdk__) */
