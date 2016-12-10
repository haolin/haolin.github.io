
//======================================================================================================================
var BI_Home = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_Impl = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        if (this.isValid())
        {
            this.m_Impl = statistics.Statistics.getInstance();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isValid: function()
    {
        return Defines.PLATFORM.isMobile() && !Defines.OS.isWindows();
    },

    //------------------------------------------------------------------------------------------------------------------
    /**首次登陆**
     *	@brief	帐号注册
     *
     *	@param 	account 	帐号名
     *	@param 	roleID 	帐号ID
     */
    registerWithAccount: function(account, roleID)
    {
        if (!this.isValid())
        {
            return this;
        }

        this.m_Impl.registerWithAccount(account, roleID);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    /**2
     *	@brief	帐号登陆
     *
     *	@param 	account 	帐号名
     *	@param 	roleID 	帐号ID
     */
    loginWithAccount: function(account, roleID)
    {
        if (!this.isValid())
        {
            return this;
        }

        this.m_Impl.loginWithAccount(account, roleID);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    /**3
     *	@brief	创建角色
     *
     *	@param 	account 	帐号名
     *	@param 	roleID 	角色ID
     *	@param 	roleName 	角色名
     *	@param 	charactor 	特点或职业
     */
    createRoleWithAccount: function(account, roleID, roleName, charactor)
    {
        if (!this.isValid())
        {
            return this;
        }

        this.m_Impl.createRoleWithAccount(account, roleID, roleName, charactor);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    /**4
     *	@brief	角色登陆
     *
     *	@param 	account 	帐号名
     *	@param 	roleID 	角色ID
     *	@param 	roleName 	角色名
     *	@param 	level 	角色等级
     */
    roleLoginWithAccount: function(account, roleID, roleName, level)
    {
        if (!this.isValid())
        {
            return this;
        }

        this.m_Impl.roleLoginWithAccount(account, roleID, roleName, level);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    /**5
     *	@brief	角色登出
     *
     *	@param 	account 	帐号名
     *	@param 	roleID 	角色ID
     *	@param 	roleName 	角色名
     *	@param 	level 	角色等级
     *	@param 	interval 	在线时长
     */
    roleLogoutWithAccount: function(account, roleID, roleName, level, interval)
    {
        if (!this.isValid())
        {
            return this;
        }

        this.m_Impl.roleLogoutWithAccount(account, roleID, roleName, level, interval);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    /**6
     *	@brief	充值
     *
     *	@param 	account 	帐号名
     *	@param 	payType 	充值方式
     *	@param 	cashAdd 	本次充值后身上剩余钱数（分）
     *	@param 	delta 	本次充值数（分）
     */
    addCashWithAccount: function(account, payType, cashAdd, delta)
    {
        if (!this.isValid())
        {
            return this;
        }

        this.m_Impl.addCashWithAccount(account, payType, cashAdd, delta);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    /**7
     * @param accountName  账号名
     * @param orderID      订单号
     * @param itemID       道具ID
     * @param itemNum      购买数量
     * @param buyType      购买方式
     * @param cashLeft     购买后剩余钱数（单位：分）
     * @param cashUsed     花费的钱数（单位：分）
     */
    shopBiTrader: function(accountName, orderID, itemID, itemNum, buyType, cashLeft, cashUsed)
    {
        cc.log("+++++++++++ ShopBiTrader >>>>> accountName: " + accountName
            + ", orderID: " + orderID + ", itemID: " + itemID + ", itemNum: " + itemNum
            + ", buyType: " + buyType + ", cashLeft: " + cashLeft + ", cashUsed（美分）: " + cashUsed * 100);

        if (!this.isValid())
        {
            return this;
        }
		
//		if (!itemNum)
//		{
//			itemNum = 0;
//		}

//        var cashFianl = PayMng.PayLogInfo_Android.hasOwnProperty(CHANNEL) ? cashUsed : cashUsed * 100;
        this.m_Impl.shopBiTrader(accountName, orderID, itemID, itemNum, buyType, cashLeft, cashUsed*100);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    testBIHome: function()
    {
        //
        var config = BIMng.getInstance().getPlayerConfig();

        //
        this.registerWithAccount(config["DeviceID"], "");
        this.createRoleWithAccount(config["DeviceID"], config["RoleID"], GAME_VERSION, CHANNEL);

        this.loginWithAccount(config["DeviceID"], config["RoleID"]);
        this.roleLoginWithAccount(config["DeviceID"], config["RoleID"], GAME_VERSION, config["MaxLevel"]);

        //在线时长
        this.roleLogoutWithAccount(config["DeviceID"], config["RoleID"], GAME_VERSION, config["MaxLevel"], config["Interval"]);

        this.logBiTrader_RMB(GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1], 20);
        this.logBiTrader_Diamond(GUI.SHOP_DATA.SHOP_DATA_ITEM[1]);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logFirstPlayGame: function()
    {
        if (!this.isValid())
        {
            return this;
        }

        var pConfig = BIMng.getInstance().getPlayerConfig("registerWithAccount");
        this.registerWithAccount(pConfig["DeviceID"], "");

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //进入后台
    logAppDisactive: function()
    {
        if (!this.isValid())
        {
            return this;
        }

        var pConfig = BIMng.getInstance().getPlayerConfig("roleLogoutWithAccount");
        this.roleLogoutWithAccount(pConfig["DeviceID"], pConfig["RoleID"], GAME_VERSION, pConfig["MaxLevel"], pConfig["Interval"]);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //From后台
    logAppActive: function()
    {
        if (!this.isValid())
        {
            return this;
        }

        var pConfig = BIMng.getInstance().getPlayerConfig("loginWithAccount");
        this.loginWithAccount(pConfig["DeviceID"], pConfig["RoleID"]);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logFirstLogin: function()
    {
        if (!this.isValid())
        {
            return this;
        }

        var pConfig = BIMng.getInstance().getPlayerConfig("createRoleWithAccount");
        this.createRoleWithAccount(pConfig["DeviceID"], pConfig["RoleID"], GAME_VERSION, CHANNEL);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logLogin: function(result)
    {
        if (!this.isValid())
        {
            return this;
        }

        if (result)
        {
            var pConfig = BIMng.getInstance().getPlayerConfig("roleLoginWithAccount");
            this.roleLoginWithAccount(pConfig["DeviceID"], pConfig["RoleID"], GAME_VERSION, pConfig["MaxLevel"]);
        }

        return this;
    },

	logBiBuySuccess: function(orderID)
	{
		this.m_Impl.logBiBuySuccess(orderID);
	},
	
	logBiBuyFailed: function(orderID)
	{
		this.m_Impl.logBiBuyFailed(orderID);
	},

    //------------------------------------------------------------------------------------------------------------------
    logBiTrader_RMB: function(shopData, amount)
    {
        if (!this.isValid())
        {
            return this;
        }

        //充值
        var payTypeStr = PayMng.getInstance().canPayByOthers(shopData.TOTAL_PRICE.get());
        var payType = payTypeStr == "sms" ? 0 : 1;

        //
        var price = shopData.TOTAL_PRICE.get();
        if (amount && parseInt(amount) > 0)
        {
            if (parseInt(amount) > price)
            {
                price = parseInt(amount);
            }
        }

        //
        var norCount = shopData.COUNT.get();
        var giftCount = shopData.GIFT_COUNT ? shopData.GIFT_COUNT.get() : 0;
		
		if (shopData.DISCOUNT){
			var discount = parseInt(shopData.DISCOUNT * norCount / 100);
		}
		else {
			var discount = 0;
		}

        var sfGift = shopData.SF_GIFT ? shopData.SF_GIFT.get() : 0;
        var count = norCount + giftCount + sfGift + discount;

        //
        this.addCashWithAccount(g_player.roleId.toString(), payType, 0, price);
        this.shopBiTrader(g_player.roleId.toString(), shopData.orderID , shopData.ID, count, payType, 0, price);
        return this
    },

    //------------------------------------------------------------------------------------------------------------------
    logBiTrader_Diamond: function(shopData, diamond, count)
    {
        if (!this.isValid())
        {
            return this;
        }

		

        //充值
        var payType = 2;
//        this.shopBiTrader(g_player.roleId.toString(), shopData.orderID, shopData.ID, count, payType, 0, diamond);

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

//======================================================================================================================
BI_Home._instance = null;
BI_Home.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new BI_Home();
        this._instance.init();
    }

    return this._instance;
};