//
//  Statistics.h
//  PetMania
//
//  Created by 周成山 on 13-8-14.
//
//

#ifndef __PetMania__Statistics__
#define __PetMania__Statistics__
#include <iostream>
#include <string>
#include <cocos2d.h>

using namespace std;
using namespace cocos2d;

class Statistics : public cocos2d::CCObject
{
    bool m_isStart;
public:
    static Statistics* getInstance();
    
    Statistics();
    virtual ~Statistics();
    void start();
    
    void logEvent(const char *evnetName , bool isUseBI);
    void logEventEx(const char* evnetName ,const char *HashStr , bool isUseBI);

    void redeemCode(const char* code);
    
    //下面函数为BI部门的特殊要求，必须实现的功能.
    /**
     *	@brief	帐号注册
     *
     *	@param 	account 	帐号名
     *	@param 	accountID 	帐号ID
     */
    void registerWithAccount(const char* account,const char* roleID);//帐号注册
    /**
     *	@brief	帐号登陆
     *
     *	@param 	account 	帐号名
     *	@param 	accountID 	帐号ID
     */
    void loginWithAccount(const char* account,const char* roleID);//帐号登陆
    /**
     *	@brief	创建角色
     *
     *	@param 	account 	帐号名
     *	@param 	roleID 	角色ID
     *	@param 	roleName 	角色名
     *	@param 	charactor 	特点或职业
     */
    void createRoleWithAccount(const char* account,const char* roleID,const char* roleName,const char* charactor);//创建角色
    /**
     *	@brief	角色登陆
     *
     *	@param 	account 	帐号名
     *	@param 	roleID 	角色ID
     *	@param 	roleName 	角色名
     *	@param 	level 	角色等级
     */
    void roleLoginWithAccount(const char* account,const char* roleID,const char* roleName,int level);
    
    /**
     *	@brief	角色登出
     *
     *	@param 	account 	帐号名
     *	@param 	roleID 	角色ID
     *	@param 	roleName 	角色名
     *	@param 	level 	角色等级
     *	@param 	interval 	在线时长
     */
    void roleLogoutWithAccount(const char* account,const char* roleID,const char* roleName,int level,int interval);
    
    /**
     *	@brief	充值
     *
     *	@param 	account 	帐号名
     *	@param 	payType 	充值方式
     *	@param 	cashAdd 	本次充值后身上剩余钱数（分）
     *	@param 	delta 	本次充值数（分）
     */
    void addCashWithAccount(const char* account,int payType,int cashAdd,int delta);
    
    /**
     *	@brief	商城购买
     *
     *	@param 	account 	帐号名
     *	@param 	orderID 	订单ID
     *	@param 	itemID 	物品ID
     *	@param 	itemCount 	物品数量
     *	@param 	buyType 	购买方式
     *	@param 	cashLeft 	本次消费后身上剩余的钱数（分）
     *	@param 	delta 	本次消费钱数（分）
     */
    void shopBiTrader(const char* account , const char* orderID , const char* itemID , int itemCount , int buyType , int cashLeft , int delta);
	
	/*
		购买成功回调
	*/
	void logBiBuySuccess(const char* orderID);
	
	/*
		购买失败回调
	*/
	void logBiBuyFailed(const char* orderID);
};
#endif /* defined(__PetMania__Statistics__) */
