//
//  OpJoy.h
//  OpJoy
//
//  Created by Louis Vector on 13-7-22.
//
//

#ifndef __OpJoy__OpJoy__
#define __OpJoy__OpJoy__

#include <string>
#include <stdlib.h>
#include <cocos2d.h>

using namespace cocos2d;


enum UserSystemType {
    uCoco=0,
    uQihoo=1,
    uSina=2,
    uFacebook=3,
    uRenren=4,
	uKakao=5
};

class OpJoy : public cocos2d::CCObject {
public :
	OpJoy();
	~OpJoy();
    
    static OpJoy* getInstance();

    void isAutoLogin(int joyFlag);
    
	void login(int flag);

	void unregister();

	void loginCallBack(const char* token , const char* cocoId);
    
    void addGetUidInfo(const char* tag,const char* uid);//通过Uid获取对应的详细信息

	void logout();
	
    void payBilling( const char* payType , int payid , const char* roleid , const char* billInfo);
	
    void bindUserInfo(int flag);

    void getJoyGameFriends();

    void getAbledInviteFriends();

    void inviteOneFriend(const char* inviteCode, const char* inviteContent);
    
    void CommonInterface_navitecallBack(std::string key ,std::string jsonstr);
    
    void CommonUserInfo_navitecallBack(std::string tag ,std::string uid ,std::string info);
    
    void downUserPhoto(int key , const char* photoList);

    void updateUserPhoto();
    
    void facebookInvite(const char* inviteContent);
    
    void addFriendFromID(const char* uid);
    
    /////GameCenter
    //设备是否支持GameCenter
    bool isGameCenterAvailable();
    //登陆GameCenter
    void GameCenterLogin();
    //是否已经登陆GameCenter
    bool isGameCenterLogin();
    //上传分数
    void ReportGameCenterScore(int score);
    //显示GameCenter排行榜
    void ShowGameCenterLeaderboard();
};

#endif
