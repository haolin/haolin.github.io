
//======================================================================================================================
var BIMng = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        //实现的核心
        this.m_Impl = null;
        this.m_Timer = null;

        this.m_BIHome = null;
        this.m_BIIAP = null;
        this.m_BIDiamond = null;
        this.m_BIItem = null;
        this.m_BISocial = null;
        this.m_BICountly = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        if (this.isValid())
        {
            this.m_Impl = statistics.Statistics.getInstance();
            this.m_Impl.start();
        }

        //
        this.m_BIHome = BI_Home.getInstance();
        this.m_BIIAP = BI_IAP.getInstance();
        this.m_BIDiamond = BI_Diamond.getInstance();
        this.m_BIItem = BI_Item.getInstance();
        this.m_BISocial = BI_Social.getInstance();
        this.m_BICountly = BI_Countly.getInstance();

        //
        this.logOpenGame();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isValid: function()
    {
        return Defines.PLATFORM.isMobile() && !Defines.OS.isWindows();
    },

    //------------------------------------------------------------------------------------------------------------------
    registerBITimer: function(timer)
    {
        this.m_Timer = timer;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    resetTimer: function()
    {
        if (this.m_Timer)
        {
            this.m_Timer.resetTimer();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logEvent: function(eventName, isUseBI)
    {
        if (this.isValid())
        {
            var localEventName = _Localization_Type(eventName, "cn");
            this.m_Impl.logEvent(localEventName, isUseBI);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logEventEx: function(eventName, config, isUseBI)
    {
        //
        config["Brand"]= "Brand " + CHANNEL;//确保config不是空的
        var localEventName = _Localization_Type(eventName, "cn");
        cc.log("logEventEx localEventName :" + localEventName + ", config: " + JSON.stringify(config));

        //
        if (this.isValid())
        {
            this.m_Impl.logEventEx(localEventName, JSON.stringify(config), isUseBI);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getPlayerConfig: function(desc)
    {
        var config = {};

        //
        if (!this.isValid())
        {
            return config;
        }

        //
        config["DeviceID"] = wrapperConfig.Config.getInstance().getImei().toString();

        //
        config["RoleID"] = g_player.roleId.toString();

        //
        var maxLevelData = cc.DataMng.getInstance().getMaxProcessLevelData();

        if (maxLevelData.IS_SPACE_LEVEL)
        {
            var mapDefine = GUI._GetMapDefineWithLevelData(maxLevelData);
            config["MaxLevel"] = mapDefine.MAX_LEVEL_ID + 1;
        }
        else
        {
            config["MaxLevel"] = maxLevelData.ID + 1;
        }

        //
        config["Interval"] = this.m_Timer.getCurTime();

        //
        cc.log("BIMng PlayerConfig(" + desc + ") ----- DeviceID :" + config["DeviceID"]
            + ", RoleID :" + config["RoleID"] + ", MaxLevel :" + config["MaxLevel"] + ", Interval" + config["Interval"]);

        return config;
    },

    //------------------------------------------------------------------------------------------------------------------
    logOpenGame: function()
    {
        var config = {"Flag": "1"};
        this.logEventEx("OpenGame", config, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logCloseGame: function()
    {
        var config = {"Flag": "1"};
        this.logEventEx("CloseGame", config, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logFirstPlayGame: function()
    {
        //
        var config = {"Flag": "1"};
        this.logEventEx("FirstPlayGame", config, true);

        //
        this.m_BIHome.logFirstPlayGame();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //进入后台
    logAppDisactive: function()
    {
        //
        this.m_BIHome.logAppDisactive();

        //
        this.resetTimer();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //From后台
    logAppActive: function()
    {
        //
        this.m_BIHome.logAppActive();

        //
        this.resetTimer();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logFirstLogin: function()
    {
        this.m_BIHome.logFirstLogin();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logLogin: function(result)
    {
        this.m_BISocial.logLogin(result);
        this.m_BIHome.logLogin(result);

        return this;
    },
	
	//------------------------------------------------------------------------------------------------------------------
    logBiBuySuccess: function(orderID)
    {
        this.m_BIHome.logBiBuySuccess(orderID);

        return this;
    },
	
	//------------------------------------------------------------------------------------------------------------------
    logBiBuyFailed: function(orderID)
    {
        this.m_BIHome.logBiBuyFailed(orderID);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logPlayGameLevel: function()
    {
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();

        if (!curLevelData)
        {
            return this;
        }

        //
        var config = {};

        //
        config["CurLevel"] = curLevelData.NAME;

        //
        this.logEventEx("PlayGameLevel", config, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logEndGameLevel: function(result, time)
    {
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();

        if (!curLevelData)
        {
            return this;
        }

        //
        var config = {};

        //
        config["CurLevel"] = curLevelData.NAME;

        //
        if (result != Defines.GAME_RESULT.RESULT_SUCCESS)
        {
            config["Result"] = "0";
        }
        else
        {
            var curScore = cc.DataMng.getInstance().getCurScore() || 0;
            config["Result"] = Tools.getScoreRate(curScore, curLevelData.TARGET_SCORES);
        }

        //
        config["Time"] = time.toString();

        //
        this.logEventEx("EndGameLevel", config, true);

        //
        this.m_BICountly.logEndGameLevel(curLevelData, config["Result"]);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logGameLevelFailBeforeWin: function(time)
    {
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();

        if (!curLevelData)
        {
            return this;
        }

        //
        var config = {};

        //
        config["CurLevel"] = curLevelData.NAME;

        //
        config["Time"] = time.toString();

        //
        this.logEventEx("FailBeforeWin", config, true);

        //
        this.m_BICountly.logGameLevelFailBeforeWin(curLevelData);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logMaxProcessLevel: function()
    {
        var config = {};

        config["MaxLevel"] = cc.DataMng.getInstance().getMaxProcessLevelKey();

        //
        this.logEventEx("MaxProcessLevel", config, true);

        //
        var levelData = cc.DataMng.getInstance().getLevelDataWithName(config["MaxLevel"]);
        this.m_BICountly.logMaxProcessLevel(levelData);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logGuideNormal: function(guideName)
    {
        //
        var config = {};

        config["Guide"] = guideName;

        //
        this.logEventEx("Guide", config, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logPlayOverStory: function(isOver)
    {
        var config = {};

        //
        config["isAllPlayed"] = isOver;

        //
        this.logEventEx("PlayStory", config, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logFirstLoginBonus: function(diamond, mint, horizontal, vertical)
    {
        this.m_BIDiamond.logDiamondIncome_FirstLogin(diamond);


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logSysBonus: function(baseData, itemData)
    {
        this.m_BIDiamond.logDiamondIncome_SysBonus(baseData["diamond"]);


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logPayByBI: function(shopData)
    {
        switch (parseInt(shopData.ITEM_TYPE))
        {
        //钻石
        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND :
            {
                var count = shopData.COUNT.get();
                var giftCount = shopData.GIFT_COUNT.get();
				var discount = parseInt(shopData.DISCOUNT * count / 100);
                var sfGift = shopData.SF_GIFT ? shopData.SF_GIFT.get() : 0;
                this.m_BIDiamond.logDiamondIncome_BIKey(count + giftCount + sfGift + discount);
            }
            break;

        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_ITEM :
            {
                //this.m_BIItem.logItemIncome_BIKey(shopData);
            }
            break;

        default :
            break;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logPayByRMB: function(shopData, amount)
    {
        this.m_BIIAP.logIAP(shopData, amount);
        this.m_BIHome.logBiTrader_RMB(shopData, amount);

        //
        switch (parseInt(shopData.ITEM_TYPE))
        {
        //钻石
        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND :
            {
                this.m_BIDiamond.logDiamondIncome_IAP(shopData);
            }
            break;

        //薄荷糖
        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE:
            {
                this.logBuyHeart(shopData);
            }
            break;

        //继续游戏
        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_TIME:
            {
            this.logSingleContinueGame(false);
            }
            break;

        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_MOVES:
            {
                this.logSingleContinueGame(true);
            }
            break;

        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_NEW :
            {
                //this.m_BIItem.logItemIncome_NewPack();
                this.m_BIDiamond.logDiamondIncome_NewPack(1200);
            }
            break;

        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_SUPER :
            {
                //this.m_BIItem.logItemIncome_SuperPack();
            }
            break;

        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_WORLD :
            {
                //this.m_BIItem.logItemIncome_WorldPack();
            }
            break;

        default :
            break;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logPayByDiamond: function(shopData)
    {
        //
        var diamond = shopData.TOTAL_PRICE.get();
        var norCount = shopData.COUNT.get();
        var giftCount = shopData.GIFT_COUNT ? shopData.GIFT_COUNT.get() : 0;
		if (shopData.DISCOUNT){
			var discount = parseInt(shopData.DISCOUNT * norCount / 100);
		}
		else {
			var discount = 0;
		}
        var count = norCount + giftCount + discount;

        var inGame = (cc.Director.getInstance().getRunningScene() instanceof Scene_GameLevel);
        var isItem = (shopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_ITEM);
        if (inGame && isItem)
        {
            diamond = shopData.UNIT_PRICE.get();
            count = 1;
        }

        this.m_BIDiamond.logDiamondCost(diamond, shopData.ID, count);
//        this.m_BIHome.logBiTrader_Diamond(shopData, diamond, count);

        //
        switch (parseInt(shopData.ITEM_TYPE))
        {
        //薄荷糖
        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE:
            {
                this.logBuyHeart(shopData);
            }
            break;

        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_ITEM :
            {
                //this.m_BIItem.logItemIncome_Diamond(shopData.ID, count);
                this.logBuyItem(shopData, inGame);
            }
            break;

        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE :
            {
                this.logBuyContinuePack(shopData, inGame);
            }
            break;

        default :
            break;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logBuyHeart: function(shopData)
    {
        var config = {};

        //
        config["Name"] = shopData.NAME;

        //每种薄荷糖包销量
        config["Count"] = shopData.COUNT.get().toString();

        //赠送
        config["GiftCount"] = shopData.GIFT_COUNT.get().toString();

        //消耗钻石
        if (shopData.CURRENCY == GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB)
        {
            config["Money"] = shopData.TOTAL_PRICE.get().toString();
        }
        else
        {
            config["Diamond"] = shopData.TOTAL_PRICE.get().toString();
        }

        //关卡
        config["MaxLevel"] = cc.DataMng.getInstance().getMaxProcessLevelKey();

        //剩余薄荷糖
        var lastValue = cc.DataMng.getInstance().getCurrentHeart();
        config["Last"] =  lastValue > 6 ? 6 : lastValue;

        //
        this.logEventEx("BuyHeart", config, true);
    },

    //------------------------------------------------------------------------------------------------------------------
    logBuyItem: function(shopData, inGame)
    {
        var config = {};

        //
        if (inGame)
        {
            config["Place"] = "InGame";
            var curLevelData = cc.DataMng.getInstance().getCurLevelData();
            config["CurLevel"] = curLevelData ? curLevelData.NAME : "0";
        }
        else
        {
            config["Place"] = "InShop";
            config["MaxLevel"] = cc.DataMng.getInstance().getMaxProcessLevelKey();
        }

        config["ShopID"] = shopData.ID.toString();

        //
        this.logEventEx("BuyItem", config, true);
    },

    //------------------------------------------------------------------------------------------------------------------
    logUseItem: function(itemID, buyForUse)
    {
        var shopData = GUI.getShopDataWithItemID(itemID);
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();

        //
        var config = {};

        //
        config["ShopID"] = shopData.ID.toString();

        //
        config["CurLevel"] = curLevelData.NAME;

        //
        config["BuyForUse"] = buyForUse;

        //
        this.logEventEx("UseItem", config, true);
    },

    //------------------------------------------------------------------------------------------------------------------
    logBuyContinuePack: function(shopData, inGame)
    {
        var config = {};

        //
        if (inGame)
        {
            config["Place"] = "InGame";
            var curLevelData = cc.DataMng.getInstance().getCurLevelData();
            config["CurLevel"] = curLevelData ? curLevelData.NAME : "0";
        }
        else
        {
            config["Place"] = "InShop";
            config["MaxLevel"] = cc.DataMng.getInstance().getMaxProcessLevelKey();
        }

        config["ShopID"] = shopData.ID.toString();

        //
        this.logEventEx("BuyContinuePack", config, true);
    },

    //------------------------------------------------------------------------------------------------------------------
    logUseContinuePack: function()
    {
        var config = {};

        config["Storage"] = cc.DataMng.getInstance().getGameContinueCount().toString();

        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        config["CurLevel"] = curLevelData ? curLevelData.NAME : "0";

        this.logEventEx("UseContinuePack", config, true);
    },

    //------------------------------------------------------------------------------------------------------------------
    logSingleContinueGame: function(moveModel)
    {
        if (!_GameContinue_ByRMB)
        {
            this.m_BIDiamond.logDiamondCost_GameContinue(1500);
        }

        //
        var config = {};

        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        config["CurLevel"] = curLevelData ? curLevelData.NAME : "0";

        var eventName = moveModel ? "BuyMoves" : "BuyTime";
        this.logEventEx(eventName, config, true);
    },

    //------------------------------------------------------------------------------------------------------------------
    logMineEnterGame: function(enterType)
    {
        var config = {};

        config["levelType"] = cc.Guide.MiningGameType + 1;

        var eventName = enterType ? "CostDiamond" : "CostCandy";
        this.logEventEx(eventName, config, true);
    },

    //------------------------------------------------------------------------------------------------------------------
    logMineLeaveGame: function(config)
    {
        var eventName = "mineLeaveGame";
        this.logEventEx(eventName, config, true);
    }

    //------------------------------------------------------------------------------------------------------------------
});

//======================================================================================================================
BIMng._instance = null;
BIMng.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new BIMng();
        this._instance.init();
    }

    return this._instance;
};

//自家的统计
BIMng.getBIHome = function()
{
    return BIMng.getInstance().m_BIHome;
};

BIMng.getBIIAP = function()
{
    return BIMng.getInstance().m_BIIAP;
};

BIMng.getBIDiamond = function()
{
    return BIMng.getInstance().m_BIDiamond;
};

BIMng.getBIItem = function()
{
    return BIMng.getInstance().m_BIItem;
};

BIMng.getBISocial = function()
{
    return BIMng.getInstance().m_BISocial;
};

//Countly的特殊统计需求
BIMng.getBICountly = function()
{
    return BIMng.getInstance().m_BICountly;
};