//数据管理器
var NOTIFY_EVENT = {
    FOR_SCORE: 100,
    FOR_MOVES: 200,
    FOR_TIME: 300,
    FOR_MONEY: 400,
    FOR_HEARTS: 600,
	FOR_MINE: 800,
    FOR_COVER_DATA: 700    //登录账号覆盖数据
};

//======================================================================================================================
var DataMngDirty = cc.Class.extend({

    ctor: function()
    {
        //
        this._diamondDirty = false;
        this._scoresDirty = false;
        this._spaceScoresDirty = false;
        this._heartDirty = false;
        this._cokeTimeDirty = false;
        this._itemDirty = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    diamondDirty: function()
    {
        return this._diamondDirty;
    },

    //------------------------------------------------------------------------------------------------------------------
    scoresDirty: function()
    {
        return this._scoresDirty;
    },

    //------------------------------------------------------------------------------------------------------------------
    spaceScoresDirty: function()
    {
        return this._spaceScoresDirty;
    },

    //------------------------------------------------------------------------------------------------------------------
    heartDirty: function()
    {
        return this._heartDirty;
    },

    //------------------------------------------------------------------------------------------------------------------
    cokeTimeDirty: function()
    {
        return this._cokeTimeDirty;
    },

    //------------------------------------------------------------------------------------------------------------------
    itemDirty: function()
    {
        return this._itemDirty;
    },

    //------------------------------------------------------------------------------------------------------------------
    setDiamondDirty: function(setting)
    {
        cc.log("钻石数量发生的了改变--->需要上传");
        this._diamondDirty = setting;
        return this.diamondDirty();
    },

    //------------------------------------------------------------------------------------------------------------------
    setScoresDirty: function(setting)
    {
        cc.log("普通关卡数量改变--->需要上传");
        this._scoresDirty = setting;
        return this.scoresDirty();
    },

    //------------------------------------------------------------------------------------------------------------------
    setSpaceScoresDirty: function(setting)
    {
        cc.log("空间站关卡数量改变--->需要上传");
        this._spaceScoresDirty = setting;
        return this.spaceScoresDirty();
    },

    //------------------------------------------------------------------------------------------------------------------
    setHeartDirty: function(setting)
    {
        cc.log("薄荷糖上线数量改变--->需要上传");
        this._heartDirty = setting;
        return this.heartDirty();
    },

    //------------------------------------------------------------------------------------------------------------------
    setCokeTimeDirty: function(setting)
    {
        cc.log("可乐时间改变--->需要上传");
        this._cokeTimeDirty = setting;
        return this.cokeTimeDirty();
    },

    //------------------------------------------------------------------------------------------------------------------
    setItemDirty: function(setting)
    {
        cc.log("道具数量改变--->需要上传");
        this._itemDirty = setting;
        return this.itemDirty();
    },

    //------------------------------------------------------------------------------------------------------------------
    isDiamondDirty: function()
    {
        return this.diamondDirty();
    },

    //------------------------------------------------------------------------------------------------------------------
    isOthersDirty: function()
    {
        return this.scoresDirty() || this.spaceScoresDirty() || this.heartDirty() || this.cokeTimeDirty();
    },

    //------------------------------------------------------------------------------------------------------------------
    isItemDirty: function()
    {
        return this.itemDirty();
    },

    //------------------------------------------------------------------------------------------------------------------
    isDirty: function()
    {
        return this.isDiamondDirty() || this.isOthersDirty() || this.isItemDirty();
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanDiamondDirty: function()
    {
        this._diamondDirty = false;
        return this.isDiamondDirty();
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanOthersDirty: function()
    {
        this._scoresDirty = false;
        this._spaceScoresDirty = false;
        this._heartDirty = false;
        this._cokeTimeDirty = false;
        return this.isOthersDirty();
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanItemDirty: function()
    {
        this._itemDirty = false;
        return this.isItemDirty();
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanDirty: function()
    {
        this.cleanDiamondDirty();
        this.cleanOthersDirty();
        this.cleanItemDirty();
        return this.isDirty();
    }

});

//======================================================================================================================
cc.DataMng = cc.Class.extend({

    //////////运行关卡的本地数据数据
    m_CurLevelData: null,

    //
    m_CurScore: null,

    //关于局的 数据
    m_EmunAboutRounds: {
        ROUND_IDLE: 0,
        ROUND_BEGIN: 1
    },

    //局的标志
    m_RoundFlag: 0,

    //局数,只作为参考
    m_Rounds: 0,

    //同时进行的纵横 爆炸 同色消道具个数
    m_touchItemNum: 0,
    //关卡时间
    m_GameLevelTime: 0,

    //BI统计时间
    m_GameLevelBITime: 0,

    //连锁消除数量
    m_ContinuousDestroyCount: 0,

    //消除的对象的记录
    m_DestroyRecord: {},

    //消除的对象的记录
    //m_CreateRecord: {},

    //颜色消除的记录
    m_DestroyColorRecord: {},

    //
    //m_AllObjectsRecords: {},

    //记录步数，每个回合开始的时候更新
    m_TouchMoves: 0,

    //添加5步
    m_ExtraTouchMoves: 0,

    //采矿游戏级别
    m_MineGameLevel: 1,

    //采矿游戏—下一个出现特殊奖励的X坐标
    m_MineGameSpecialPos: null,

    //采矿游戏-出现提示气泡的坐标
    m_MineGamePopTipPos: null,

    //采矿游戏-出现提示气泡的步数间隔
    m_MineGamePopTipStep: 0,
    //
    m_GameLevelResult: null,

    //钻石奖励
    m_DiamondBonus: 0,
	
	m_MineLevelStep:[],

    m_WeeklyScores: 0,

    m_autoLoginFlag: true,

    //////////下面的是通用的----------------------------------------------------------------------------------------------
    //
    m_GUIObservers: [],

    //
    m_GameLevelDatas: [],

    //
    m_GameSpaceLevelData: [],

//    m_MineLevelDatas: [],
    //
	m_GameItems:[],

    //
    m_Hearts: null,
    m_HeartRecoverMax: null,
    m_HeartRecoverAdd: null,

    //
    m_MoneyDiamond: null,
    m_MoneyDiamondCost: null,
    m_MoneyDiamondIncome: null,

    //
    m_GameItemsContainers: null,

    //解锁最远关卡
    m_MaxProcessLevelKey: null,

    //
    m_CokeEndTime: null,

	m_FreeCandyTime: null,
	
	m_CandyCDTime: null,
    //
    m_FirstPlayGame: null,

    //
    m_AddHeartTime: null,

    //
    m_NotifyEvents: {},

    //
    m_GameLevelTargetChecker: null,

    //
    m_GameGuidData: null,

    //
    m_FirstShare: null,

    //是否购买过新手特惠包
    m_PayedNewPackage: null,

    m_OptionCheckSel: null,
    //
    //m_ShowStory: null,

    //解锁新星球好友帮助
    m_FriendCokeHelp: null,
    //春节活动日常
    m_SpringDaily: null,
    //
    m_DataDaily: null,
	//每日分享送薄荷糖
	m_candyDaily: null,
    m_diamondDaily: null,
    //
    m_DataStory: null,

    //
    m_DataDrama : null,

    //
    //m_DataNodeLog: null,
    //m_DataNodeSelf: null,

    //
    //m_DataItem : {},

    //
    //m_DataTimer : null,

    //
    //m_DataAddGold : null,

    //
    m_DataCustomResult : {},

    //
    //m_DataArriveCustomTime : null,

    //
    //m_DataRole: null,

    // 小怪道具提示次数
    //m_TipsCuteCount : 0,

    //通关界面是否分享成功过
    m_LastLevelShared: null,

    //
    m_PopupShareCount: null,

    //解锁关卡前的失败次数
    m_FailedBeforeWin: null,

    //是否可推送
    m_CanPush: null,

    //AppStore版本获取是否可显示兑换码
    m_CDKeyEnabled: false,
	
	//是否可显示排行榜
	m_ScoreRankingsEnabled: false,
	
	//是否可显示广告条
	m_BannerADEnabled: false,

    //是否可显示全屏广告
    m_FullScreenADEnabled: false,

    //是否可显示更多钻石按钮
    m_MoreDiamondADEnabled: false,

    //是否可显示guest入口
    m_GetGuestEnabled: false,

    //是否可显示更多游戏按钮
    m_MoreGameADEnabled: false,

    //标记脏位
    m_DataMngDirty: new DataMngDirty(),

    //漂浮关卡
    m_DataFloatLevel: null,

    //加油卡
    m_MovesCard: null,

    //继续游戏次数
    m_GameContinueCount: null,

    //继续游戏次数入账
    m_GameContinueCountIncome: null,

    //继续游戏次数出账
    m_GameContinueCountCost: null,

    //运营商的正版激活
    m_TelcomActivate: null,

    //当前登录的用户系统
    m_CurJoyFlag: null,

    //是否处于春节活动
    m_SpringFestival: null,
	
	//失败的次数
	m_totalFailedTime: null,

    //最近的排名
    m_lastLevelTopNum: null,

    //总关卡胜利次数
    m_totalSuccessTime: null,

    m_dataSignIn: null,

    m_updateScore: null,
    //------------------------------------------------------------------------------------------------------------------
    //关卡数据清除了
    cleanUpAboutGameLevel: function()
    {
        //
        this.m_CurLevelData = null;
        this.m_CurScore && this.m_CurScore.set(0);
        this.m_RoundFlag = this.m_EmunAboutRounds.ROUND_IDLE;
        this.m_Rounds = 0;
        this.m_touchItemNum = 0;
        this.m_GameLevelTime = 0;
        this.m_GameLevelBITime = 0;
        this.m_ContinuousDestroyCount = 0;
        this.m_DestroyRecord = {};
        //this.m_CreateRecord = {};
        this.m_DestroyColorRecord = {};
        //this.m_AllObjectsRecords = {};
        this.m_TouchMoves = 0;
        this.m_MineGameLevel = 1;
        this.m_MineGameSpecialPos = null;
        this.m_MineGamePopTipPos = null;
        this.m_MineGamePopTipStep = 0;
        this.m_ExtraTouchMoves = 0;
        this.m_GameLevelResult = null;
        this.m_DiamondBonus = 0;
		this.m_itemBonus = null;
		this.m_MineLevelStep = [];


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        //
        this.cleanUpAboutGameLevel();

        //
        this.m_GUIObservers = [];
        this.m_GameLevelDatas = [];
        this.m_GameSpaceLevelData = [];
//        this.m_MineLevelDatas = [];
        this.m_GameItems = [];
        this.m_Hearts = null;
        this.m_HeartRecoverMax = null;
        this.m_HeartRecoverAdd = null;
        this.m_MoneyDiamond = null;
        this.m_MoneyDiamondCost = null;
        this.m_MoneyDiamondIncome = null;
        this.m_GameItemsContainer = [];
        this.m_MaxProcessLevelKey = null;
        this.m_CokeEndTime = null;
		this.m_FreeCandyTime = null;
		this.m_CandyCDTime = null;
        this.m_FirstPlayGame = null;
        this.m_AddHeartTime = null;
        this.m_NotifyEvents = null;
        this.m_GameGuidData = null;
        this.m_FirstShare = null;
        this.m_PayedNewPackage = null;
        this.m_OptionCheckSel = null;
        //this.m_ShowStory = null;
        this.m_FriendCokeHelp = null;
        this.m_SpringDaily = null;
		this.m_candyDaily = null;
        this.m_diamondDaily = null;
        this.m_DataDaily = null;
        this.m_DataStory = null;
        //this.m_DataRole = null;
        this.m_LastLevelShared = null;
        this.m_PopupShareCount = null;
        this.m_FailedBeforeWin = null;
        this.m_totalSuccessTime = null;
        this.m_CanPush = null;

        //this.m_DataItem = [];
        this.m_DataCustomResult = [];
        this.m_DataFloatLevel = null;
        this.m_MovesCard = null;
        this.m_GameContinueCount = null;
        this.m_GameContinueCountIncome = null;
        this.m_GameContinueCountCost = null;
        this.m_TelcomActivate = null;
        this.m_CurJoyFlag = null;
        this.m_SpringFestival = null;
        this.m_lastLevelTopNum = null;
		this.m_totalFailedTime = null;
        this.m_curFreshLine = null;
        this.m_MineCDTime = null;
        //
		this.m_MineLevelStep = [];
        this.m_updateScore = 0;
        this.m_WeeklyScores = 0;
        this.m_autoLoginFlag = true;
        return this;
    },

    cleanUpDataForUnRegister: function()
    {
//        this.m_MaxProcessLevelKey.load();

//        this.loadGameLevels();
//
//        //载入关卡 空间站
//        this.loadSpaceGameLevels();

        this.restoreGameData();
        this.cleanItems();

        //第一次登陆
        this.m_FirstPlayGame.set(true);
        this.m_FirstPlayGame.save();

        this.m_AddHeartTime.set(0);
        this.m_AddHeartTime.save();

        //消耗金钱
        this.coverDiamondData(0);
        //首次分享
        this.setFirstShare(true);
        //
        this.m_PayedNewPackage.resetFlag();
        this.m_PayedNewPackage.save();

        this.m_OptionCheckSel.resetFlag();
        this.m_OptionCheckSel.save();
        //
        this.m_FriendCokeHelp.set(0);
        this.m_FriendCokeHelp.save();

//        this.m_candyDaily.save();
//
//        this.m_diamondDaily.save();
//
//        this.m_LastLevelShared.save();
//
//        //
//        this.m_PopupShareCount.save();
//
//        //
//        this.m_FailedBeforeWin.save();
//
//        this.m_totalSuccessTime.save();
//        //
//        this.m_CanPush.save();
//        //
//
//        this.m_MovesCard.save();
//
//        //
//        this.m_GameContinueCount.save();
//
//        //
//        this.m_TelcomActivate.save();
//
//        //
//        this.m_CurJoyFlag.save();
//        //
////        this.afterLoad();
//
//        this.m_totalFailedTime.save();

    },

    //------------------------------------------------------------------------------------------------------------------
    restoreGameData: function()
    {
        _DB_OP_GAME_LEVELS.prepareSave();

        this.m_GameLevelDatas.forEach(
            function(each)
            {
                each.HISTORY_MAX_SCORE.set(0);
                each.HISTORY_MAX_SCORE.save();

                each.LAST_HISTORY_MAX_SCORE.set(0);
                each.LAST_HISTORY_MAX_SCORE.save();
            }
        );

        this.m_GameSpaceLevelData.forEach(
            function(each)
            {
                if (each.HISTORY_MAX_SCORE)
                {
                    each.HISTORY_MAX_SCORE.set(0);
                    each.HISTORY_MAX_SCORE.save();
                }

                if (each.LAST_HISTORY_MAX_SCORE)
                {
                    each.LAST_HISTORY_MAX_SCORE.set(0);
                    each.LAST_HISTORY_MAX_SCORE.save();
                }
            }
        );

        _DB_OP_GAME_LEVELS.prepareSaveFinish();

        this.setMaxProcessLevelKey(this.getLevelDataWithID(0).NAME);
        this.resetCokeEndTime();

        this.m_MoneyDiamond.set(0);
        this.m_MoneyDiamond.save();

        this.m_Hearts.set(Defines._GetMaxHearts());
//        this.m_Hearts.save();

        this.m_HeartRecoverMax.set(0);
        this.m_HeartRecoverAdd.set(0);

        //清除教学的数据**********************************
        this.m_GameGuidData.set({});
        cc.Guide.isEnterShopGuide = false;
        cc.Guide.round = 0;
        cc.Guide.round_2 = 0;
        cc.Guide.round_7 = 0;
        cc.Guide.round_8 = 0;
		cc.Guide.round_12 = 0;
        cc.Guide.round_17 = 0;
        cc.Guide.round_19 = 0;
        cc.Guide.round_21 = 0;
        cc.Guide.round_28 = 0;
        cc.Guide.round_36 = 0;
        cc.Guide.round_46 = 0;
        cc.Guide.round_30 = 0;
        cc.Guide.buy_round = 0;
		cc.Guide.buy_GoldenKey = 0;
		cc.Guide.MiningGameType = 0;
        //**********************************************

        //
        this.m_DataDaily.cleanUp();
        this.m_DataStory.cleanUp();
        this.m_DataDrama.cleanUp();
        //this.m_DataRole.cleanUp();
        //this.m_DataTimer.cleanUp();
        //this.m_DataArriveCustomTime.cleanUp();
        //this.m_DataAddGold.cleanUp();
        //this.m_DataNodeSelf.cleanUp();
        //this.m_DataNodeLog.cleanUp();

        //this.m_DataItem.cleanUp();
        this.m_DataCustomResult.cleanUp();
        //
        /*_DB_OP_GAME_ITEMS.toDB();
        _DB_OP_GAME.toDB();*/

        //清除
        //ItemPack.getInstance().restorePack();

        //
        this.notifyGUIObservers();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    init:function()
    {
        this.cleanUp();
        cc.log("datamng init");
        //
        this.m_CurScore = cc.GameLevelScore.create("m_CurScore", 0, _DB_OP_GAME, Defines.MAX_NUMBER_DATA_VALUE);//cc.GameDataNumber.create("m_CurScore", 0, _DB_OP_GAME, Defines.MAX_NUMBER_DATA_VALUE);
        this.m_Hearts = cc.GameDataNumber.create("m_Hearts", Defines._GetMaxHearts(), _DB_OP_GAME, Defines.MAX_HEART_COUNT);
        this.m_HeartRecoverMax = cc.GameDataNumber.create("m_HeartRecoverMax", 0, _DB_OP_GAME, Defines.MAX_HEART_COUNT);
        this.m_HeartRecoverAdd = cc.GameDataNumber.create("m_HeartRecoverAdd", 0, _DB_OP_GAME, Defines.MAX_HEART_COUNT);
        this.m_MoneyDiamond = cc.GameDataNumber.create("m_MoneyDiamond", 0, _DB_OP_GAME_ITEMS, Defines.MAX_NUMBER_DATA_VALUE);
        this.m_MoneyDiamondCost = cc.GameDataNumber.create("m_MoneyDiamondCost", 0, _DB_OP_GAME_ITEMS, Defines.MAX_NUMBER_DATA_VALUE);
        this.m_MoneyDiamondIncome = cc.GameDataNumber.create("m_MoneyDiamondIncome", 0, _DB_OP_GAME_ITEMS, Defines.MAX_NUMBER_DATA_VALUE);
        this.m_MaxProcessLevelKey = cc.GameData.create("m_MaxProcessLevelKey", "LEVEL_1", _DB_OP_GAME_LEVELS);
        this.m_CokeEndTime = cc.GameDataTime.create("m_CokeEndTime", 0, _DB_OP_GAME);
		this.m_FreeCandyTime = cc.GameDataTime.create("m_FreeCandyTime", 0, _DB_OP_GAME);
		this.m_CandyCDTime = cc.GameDataTime.create("m_CandyCDTime", 0, _DB_OP_GAME);
        this.m_curFreshLine = cc.GameDataTime.create("m_curFreshLine", 0, _DB_OP_GAME);
        this.m_MineCDTime = cc.GameDataTime.create("m_MineCDTime", 0, _DB_OP_GAME);
        this.m_FirstPlayGame = cc.GameDataBoolean.create("m_FirstPlayGame", true, _DB_OP_GAME);
        this.m_AddHeartTime = cc.GameDataTime.create("m_AddHeartTime", 0, _DB_OP_GAME);
        this.m_GameGuidData = cc.GameDataMap.create("m_GameGuidData", _DB_OP_GAME);
        this.m_FirstShare = cc.GameDataBoolean.create("m_FirstShare", true, _DB_OP_GAME);
        this.m_PayedNewPackage = cc.GameDataBoolean.create("m_PayedNewPackage", false, _DB_OP_GAME);
        this.m_OptionCheckSel = cc.GameDataBoolean.create("m_OptionCheckSel", false, _DB_OP_GAME);
        //this.m_TipsCuteCount = cc.GameDataNumber.create("ShowCuteNumber", 0, _DB_OP_GAME, 99);
        //this.m_ShowStory = cc.GameDataBoolean.create("m_ShowStory", true, _DB_OP_GAME);
        this.m_FriendCokeHelp = cc.GameDataMap.create("m_FriendCokeHelp", _DB_OP_GAME);
        this.m_SpringDaily = cc.GameDataTime.create("m_SpringDaily", 0, _DB_OP_GAME);
		this.m_candyDaily = cc.GameDataTime.create("m_candyDaily", 0, _DB_OP_GAME);
        this.m_diamondDaily = cc.GameDataTime.create("m_diamondDaily", 0, _DB_OP_GAME);
        this.m_DataDaily = Data_Daily.create();
        this.m_DataStory = Data_Story.create();
        this.m_DataDrama = Data_Drama.create();
        //this.m_DataRole = Data_Role.create();
        //this.m_DataTimer = Data_Timer.create();
        //this.m_DataAddGold = Data_ExtAddGold.create();
        //this.m_DataNodeLog = Data_NodeLog.create();
        //this.m_DataNodeSelf = Data_NodeSelf.create();
        //this.m_DataArriveCustomTime = Data_TimeArriveCustom.create();
        this.m_LastLevelShared = cc.GameDataBoolean.create("m_LastLevelShared", false, _DB_OP_GAME);
        this.m_PopupShareCount = cc.GameDataNumber.create("m_PopupShareCount", 0, _DB_OP_GAME, 3);
        this.m_FailedBeforeWin = cc.GameDataNumber.create("m_FailedBeforeWin", 0, _DB_OP_GAME, 8);
        this.m_totalSuccessTime = cc.GameDataNumber.create("m_totalSuccessTime", 0, _DB_OP_GAME, 8);
        this.m_CanPush = cc.GameDataBoolean.create("m_CanPush", true, _DB_OP_GAME);
        this.m_MovesCard = cc.GameDataNumber.create("m_MovesCard", 0, _DB_OP_GAME, Defines.MAX_NUMBER_DATA_VALUE);
        this.m_GameContinueCount = cc.GameDataNumber.create("m_GameContinueCount", 0, _DB_OP_GAME, Defines.MAX_NUMBER_DATA_VALUE);
        this.m_GameContinueCountIncome = cc.GameDataNumber.create("m_GameContinueCountIncome", 0, _DB_OP_GAME, Defines.MAX_NUMBER_DATA_VALUE);
        this.m_GameContinueCountCost = cc.GameDataNumber.create("m_GameContinueCountCost", 0, _DB_OP_GAME, Defines.MAX_NUMBER_DATA_VALUE);
        this.m_TelcomActivate = cc.GameDataBoolean.create("m_TelcomActivate", false, _DB_OP_GAME);
        this.m_CurJoyFlag = cc.GameDataNumber.create("m_CurJoyFlag", -1, _DB_OP_GAME, Defines.MAX_NUMBER_DATA_VALUE);

        //this.m_DataItem = Data_Item.create();
        this.m_DataCustomResult = Data_CustomResult.create();
        this.m_DataFloatLevel = Data_FloatLevel.create();

        this.m_dataSignIn = Data_Sign.create();

        //
        this.m_CDKeyEnabled = !isAppStoreWeiBo();
        this.m_SpringFestival = cc.GameDataBoolean.create("m_SpringFestival", false, null);
		this.m_ScoreRankingsEnabled = cc.GameDataBoolean.create("m_ScoreRankings", false, null);
		this.m_BannerADEnabled = cc.GameDataBoolean.create("m_BannerAD", false, null);
        this.m_FullScreenADEnabled = cc.GameDataBoolean.create("m_FullScreenAD", false, null);
        this.m_MoreDiamondADEnabled = cc.GameDataBoolean.create("m_MoreDiamondAD", false, null);
        this.m_GetGuestEnabled = cc.GameDataBoolean.create("m_GetGuestEnabled", false, null);
        this.m_MoreGameADEnabled = cc.GameDataBoolean.create("m_MoreGameAD", false, null);
        this.m_lastLevelTopNum = cc.GameDataNumber.create("m_lastLevelTopNum", -1, _DB_OP_GAME, Defines.MAX_NUMBER_DATA_VALUE);
		this.m_totalFailedTime = cc.GameDataNumber.create("m_totalFailedTime", 0, _DB_OP_GAME, Defines.MAX_NUMBER_DATA_VALUE);
		//
        for (var indx = 0; indx < Defines.MAX_ITEM_CONTAINER_COUNT; ++indx)
        {
            var key = "m_GameItemsContainer" + "_" + indx;
            var data = cc.GameDataBoolean.create(key, false, _DB_OP_GAME_ITEMS);
            this.m_GameItemsContainer.push(data);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addGUIObserver: function(gui)
    {
        if (gui instanceof cc.GUIWindow)
        {
            this.m_GUIObservers.push(gui);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateGUIObservers: function()
    {
        if (this.m_GUIObservers.length <= 0 || !this.m_NotifyEvents)
        {
            return this;
        }

        //
        var self = this;

        //先锁住分数
        if (this.m_NotifyEvents[NOTIFY_EVENT.FOR_SCORE])
        {
            this._updateScoreValue();
        }

        //
        this.m_GUIObservers.forEach(
            function(observer)
            {
                observer.notifiedUpdate(self, self.m_NotifyEvents);
            }
        );

        //
        self.m_NotifyEvents = null;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyGUIObservers: function(event)
    {
        this.m_NotifyEvents = this.m_NotifyEvents || {};
        this.m_NotifyEvents[event] = true;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeNotifyGUIObservers: function(event)
    {
        this.m_NotifyEvents = this.m_NotifyEvents || {};
        this.m_NotifyEvents[event] = false;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getGameLevelResult: function()
    {
        return this.m_GameLevelResult;
    },

    //------------------------------------------------------------------------------------------------------------------
    getCurScore: function(/*faceValue*/)
    {
        return this.m_CurScore.getScoreValue();
        //return this.m_CurScore.get();
        //return faceValue ? this.m_CurScore.getFaceValue() : this.m_CurScore.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    _updateScoreValue: function()
    {
        this.m_CurScore.updateScoreValue();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addScore: function(score)
    {
        this.m_CurScore.add(score);
        this.notifyGUIObservers(NOTIFY_EVENT.FOR_SCORE);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getContinuousDestroyCount: function()
    {
        return this.m_ContinuousDestroyCount;
    },

    //------------------------------------------------------------------------------------------------------------------
    getLeftGameLevelTime: function()
    {
        /*this.m_GameLevelTime = this.m_GameLevelTime || 0;
        var leftTime = this.m_CurLevelData.TIME - this.m_GameLevelTime;
        if (leftTime < 0)
        {
            leftTime = 0;
        }

        return leftTime;*/

        return this.m_GameLevelTime;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateGameLevelTime: function(time)
    {
        var finish = false;

        //
        this.m_GameLevelTime -= time;
        if (this.m_GameLevelTime <= 0)
        {
            this.m_GameLevelTime = 0;
            finish = true;
        }

        /*if (this.m_GameLevelTime >= this.m_CurLevelData.TIME)
        {
            this.m_GameLevelTime = this.m_CurLevelData.TIME;
            finish = true;
        }
*/
        this.notifyGUIObservers(NOTIFY_EVENT.FOR_TIME);
        return finish;
    },

    //------------------------------------------------------------------------------------------------------------------
    addGameLevelTime: function(time/*, checkLimit*/)
    {
        this.m_GameLevelTime += time;

       /* if (checkLimit)
        {
            if (this.m_GameLevelTime < 0)
            {
                this.m_GameLevelTime = 0;
            }
        }*/

        this.notifyGUIObservers(NOTIFY_EVENT.FOR_TIME);
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    addGameLevelTimeForItemClock: function(time)
    {
        cc.log("addGameLevelTimeForItemClock 这个函数需要重构");
        this.addGameLevelTime(time, true);
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    subGameLevelTime: function(time)
    {
        this.m_GameLevelTime -= time;
        if (this.m_GameLevelTime <= 0)
        {
            this.m_GameLevelTime = 0;
        }

        this.notifyGUIObservers(NOTIFY_EVENT.FOR_TIME);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateGameLevelBITime: function(time)
    {
        this.m_GameLevelBITime += time;
        return this.m_GameLevelBITime;
    },

    //------------------------------------------------------------------------------------------------------------------
    beginRound: function(flag)
    {
        if (this.m_RoundFlag == this.m_EmunAboutRounds.ROUND_IDLE)
        {
            /*_TestLog = Tools.MyTimeLog.create();
            _TestLog.start("开始一个局");*/

            this.m_RoundFlag = this.m_EmunAboutRounds.ROUND_BEGIN;

			if (!flag){
				this.addTouchMoves(); //解决火流星步数计算BUG
			}

            ++this.m_Rounds;
            //cc.log("this.m_Rounds = " + this.m_Rounds);
        }

        this.m_ContinuousDestroyCount = 0;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    endRound: function()
    {
        var isEndRound = false;
        if (this.m_RoundFlag == this.m_EmunAboutRounds.ROUND_BEGIN)
        {
            //_TestLog.finish("结束一个局");
            isEndRound = true;
            this._updateScoreValue();
        }

        this.m_RoundFlag = this.m_EmunAboutRounds.ROUND_IDLE;
        this.m_ContinuousDestroyCount = 0;

        return isEndRound;
    },

    //------------------------------------------------------------------------------------------------------------------
    getCurRounds: function()
    {
        return this.m_Rounds;
    },

    setCurTouchItemNum: function(value)
    {
        if (value < 0){
            value = 0;
        }
        this.m_touchItemNum = value;
        return this.m_touchItemNum;
    },

    getCurTouchItemNum: function()
    {
        return this.m_touchItemNum;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMaxTouchMoves: function()
    {
        //return this.m_CurLevelData.MOVES + this.m_ExtraTouchMoves;
        //return this.m_CurLevelData.MOVES_SAVE.get() + this.m_ExtraTouchMoves;

        var configMoves = this.m_CurLevelData.MOVES_SAVE ? this.m_CurLevelData.MOVES_SAVE.get() : 0;
        return configMoves + this.m_ExtraTouchMoves;
    },

    //------------------------------------------------------------------------------------------------------------------
    getLeftTouchMoves: function()
    {
        var value = this.getMaxTouchMoves() - this.m_TouchMoves;
        if (value < 0)
        {
            value = 0;
        }

        return value;
    },

    addMineGameLevel: function()
    {
		this.m_MineGameLevel ++;
        if (this.m_MineGameLevel > 9){
            this.m_MineGameLevel = 9;
        }

        var levelNum = cc.MineMng.getInstance().getMINE_LEVEL_SETTING()[this.m_MineGameLevel - 1];
		cc.GUIGameLevel.getInstance().updateContentGameInfoForMine();
//		this.notifyGUIObservers(NOTIFY_EVENT.FOR_MOVES);
        cc.log("addMineGameLevel = " + this.m_MineGameLevel);
        DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().setDestroyObjectToDiary("firstLevelBonus_" + levelNum[0],0);
        return levelNum[0];
    },

    getMineGameLevel: function()
    {
//        var levelNum = [1,2,3,5,10,20,30,50,100];
//        this.m_MineGameLevel = this.m_MineGameLevel || 1;
//        return levelNum[this.m_MineGameLevel - 1];

        var levelNum = cc.MineMng.getInstance().getMINE_LEVEL_SETTING()[this.m_MineGameLevel - 1];
        this.m_MineGameLevel = this.m_MineGameLevel || 1;
        return levelNum[0];
    },

    subMineGameLevel: function()
    {
//        var levelNum = [1,2,3,5,10,20,30,50,100];

        this.m_MineGameLevel --;
        this.m_MineGameLevel = this.m_MineGameLevel || 1;
        var levelNum = cc.MineMng.getInstance().getMINE_LEVEL_SETTING()[this.m_MineGameLevel - 1];
		cc.GUIGameLevel.getInstance().updateContentGameInfoForMine();
        DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().setDestroyObjectToDiary("firstLevelBonus_" + levelNum[0],0);
//		this.notifyGUIObservers(NOTIFY_EVENT.FOR_MOVES);
        return levelNum[0];
    },

	getMineLevelNum : function()
	{
		return this.m_MineGameLevel;
	},

	addMineGameLevelStep: function()
	{
		var curStep = this.m_MineLevelStep[this.m_MineGameLevel - 1] || 0;
		curStep ++;
		this.m_MineLevelStep[this.m_MineGameLevel - 1] = curStep;
		return curStep;
	},
	
	getMineGameLevelStep: function()
	{
		return this.m_MineLevelStep;
	},

    getMineGameSpecialPos: function()
    {
        return this.m_MineGameSpecialPos;
    },

    setMineGameSpecialPos: function(pos)
    {
        this.m_MineGameSpecialPos = pos;
        this.m_MineGamePopTipStep = 0;
        return this.m_MineGameSpecialPos;
    },

    getMineGameSpecialPopTipPos: function()
    {
        return this.m_MineGamePopTipPos;
    },

    setMineGamePopTipPos: function(pos)
    {
        this.m_MineGamePopTipPos = pos;
        return this.m_MineGamePopTipPos;
    },

    getMineGamePopTipStep: function()
    {
        return this.m_MineGamePopTipStep;
    },

    addMineGamePopTipStep: function()
    {
        this.m_MineGamePopTipStep ++;
        return this.m_MineGamePopTipStep;
    },

    getMineGameLevelSpendMoney: function()
    {
        return this.getMineGameLevel();
    },

    getMineGameLevelDiamondRate: function(level)
    {
        if (level){
            var levelNum = cc.MineMng.getInstance().getMINE_LEVEL_SETTING()[level - 1];
        }
        else {
            var levelNum = cc.MineMng.getInstance().getMINE_LEVEL_SETTING()[this.m_MineGameLevel - 1];
        }
        return levelNum[4];
    },

    getMineGameLevelDiamondCreateRate: function() // 不同等级下钻石的生成几率
    {
        var levelNum = cc.MineMng.getInstance().getMINE_LEVEL_SETTING()[this.m_MineGameLevel - 1];

        return levelNum[5];
    },

    getMineGameLevelItemCreateRate: function(idx) // 不同等级下道具的掉落几率
    {
        var levelNum = cc.MineMng.getInstance().getMINE_LEVEL_SETTING()[this.m_MineGameLevel - 1];

        return levelNum[idx];
    },
    //------------------------------------------------------------------------------------------------------------------
    getCurTouchMoves: function()
    {
        return this.m_TouchMoves;
    },

    //------------------------------------------------------------------------------------------------------------------
    addTouchMoves: function()
    {
        ++this.m_TouchMoves;
        if (this.m_TouchMoves > this.getMaxTouchMoves() && this.m_CurLevelData.MODEL != Defines.TARGET_MODEL.MODEL_MINELOTTERY)
        {
            this.m_TouchMoves = this.getMaxTouchMoves();
        }

        this.notifyGUIObservers(NOTIFY_EVENT.FOR_MOVES);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanTouchMoves: function()
    {
        while(this.m_TouchMoves < this.getMaxTouchMoves())
        {
            ++this.m_TouchMoves;
        }

        this.notifyGUIObservers(NOTIFY_EVENT.FOR_MOVES);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addExtraTouchMoves: function(addValue)
    {
        this.m_ExtraTouchMoves += addValue;
        this.notifyGUIObservers(NOTIFY_EVENT.FOR_MOVES);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleMoveClock: function()
    {
        this.m_ContinuousDestroyCount = 0;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    continuousDestroy: function()
    {
        ++this.m_ContinuousDestroyCount;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    /*recordDestroy: function(desObj, _count)
    {
        if (!desObj)
        {
            return this;
        }

        var count = _count || 1;

        if (desObj instanceof cc.INodeObject)
        {
            var desc = desObj.description();
            this.m_DestroyRecord[desc] = this.m_DestroyRecord[desc] || 0;
            this.m_DestroyRecord[desc] += count;
        }

        if (desObj instanceof cc.Obj_Monster)
        {
            var color = desObj.getColor();
            this.m_DestroyColorRecord[color] = this.m_DestroyColorRecord[color] || 0;
            this.m_DestroyColorRecord[color] += count;
        }

        this.notifyGUIObservers(NOTIFY_EVENT.FOR_SCORE);
        return this;
    },*/

    //------------------------------------------------------------------------------------------------------------------
    /*recordCreate: function(desObj)
    {
        if (!desObj)
        {
            return this;
        }

        if (desObj instanceof cc.NormalObj)
        {
            var desc = desObj.description();
            this.m_CreateRecord[desc] = this.m_CreateRecord[desc] || 0;
            ++this.m_CreateRecord[desc];
        }

        return this;
    },*/

    //------------------------------------------------------------------------------------------------------------------
  /*  getRecordDestroy: function(className)
    {
        return this.m_DestroyRecord[className] ? this.m_DestroyRecord[className] : 0;
    },*/

    //------------------------------------------------------------------------------------------------------------------
    /*getBuildObjectsRecords: function (className)
    {
        return this.m_AllObjectsRecords[className] ? this.m_AllObjectsRecords[className] : 0;
    },*/

    //------------------------------------------------------------------------------------------------------------------
   /* getCreateRecord: function(className)
    {
        return this.m_CreateRecord[className] ? this.m_CreateRecord[className] : 0;
    },*/

    //------------------------------------------------------------------------------------------------------------------
    /*getRecordColor: function (color)
    {
        return this.m_DestroyColorRecord[color] ? this.m_DestroyColorRecord[color] : 0;
    },*/

    //------------------------------------------------------------------------------------------------------------------
    setCurLevelData: function(curLevelData)
    {
        this.m_CurLevelData =  curLevelData;

        if (this.m_CurLevelData)
        {
            this.m_GameLevelTargetChecker = GameLevelTargetChecker.create(this.m_CurLevelData);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    targetCheck: function(object)
    {
        return this.m_GameLevelTargetChecker && this.m_GameLevelTargetChecker.check(object);
    },

    //------------------------------------------------------------------------------------------------------------------
    getCurLevelData: function ()
    {
        return this.m_CurLevelData;
    },

    //------------------------------------------------------------------------------------------------------------------
    getLevelDataWithID: function(levelID, isSpaceLevel)
    {
        return isSpaceLevel ? this.m_GameSpaceLevelData[levelID] : this.m_GameLevelDatas[levelID];
    },

    //------------------------------------------------------------------------------------------------------------------
    getLevelDataWithName: function(levelName)
    {
        if (!levelName)
        {
            return null;
        }

        //
        var norLevelName = "LEVEL_";
        var spaceLevelName = "SPACE_LEVEL_";

        if (levelName.slice(0, norLevelName.length) == norLevelName)
        {
            return this.getLevelDataWithID(parseInt(levelName.slice(norLevelName.length)) - 1, false);
        }
        else if (levelName.slice(0, spaceLevelName.length) == spaceLevelName)
        {
            return this.getLevelDataWithID(parseInt(levelName.slice(spaceLevelName.length)) - 1, true)
        }

        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    //maxGameLevel用于批量比较，防止一帧多次掉get
    isGameLevelEnabled: function(levelID, isSpaceLevel, maxGameLevel)
    {
        maxGameLevel = maxGameLevel ? maxGameLevel : this.getMaxProcessLevelData();
        var maxID = maxGameLevel.ID;

        //
        if (maxGameLevel.IS_SPACE_LEVEL)
        {
            return isSpaceLevel ? levelID <= maxID : GUI._CompareSpaceLevelWithNorLevel(maxID, levelID);
        }

        //
        return isSpaceLevel ? GUI._CompareNorLevelWithSpaceLevel(maxID, levelID) : levelID <= maxID;
    },

    //------------------------------------------------------------------------------------------------------------------
    getItemsWithLevelData: function(levelData)
    {
        //
        var configItems = [];

        //
        var strItems = levelData.ITEMS || [];
        strItems.forEach(function(each)
        {
            if (Defines.GameItems[each])
            {
                configItems.push(Defines.GameItems[each]);
            }
        });

        //
        if (strItems.length != configItems.length)
        {
            cc.log("getItemsWithLevelData ----- GameLevelData." + levelData.NAME + ":ITEMS ERROR");
        }

        return configItems;
    },

    getFreeFlagFromItem: function(itemID)
    {
        var ItemFlag = cc.GUIGameLevel.getInstance().getGameItem().getItemFreeInfo();
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();

        var configItems = cc.DataMng.getInstance().getItemsWithLevelData(curLevelData);

        var resFlag = false;

        configItems.forEach(
            function (item, index)
            {
                if (item.ID == itemID){
                    resFlag = ItemFlag[index];
                }
            }
        );

        cc.log("no. " + itemID + "    resFlag = " + resFlag);

        return resFlag;
    },

    //------------------------------------------------------------------------------------------------------------------
    buyItemByID: function(ItemID, Number, totalPrice, upLoadFlag)
    {
        if (!this.canSpendMoney(totalPrice))
        {
            return this;
        }

		cc.log("buyItemByID ID = " + ItemID);

		if (Number == GUI.SHOP_DATA.SHOP_DATA_SUPER[0].COUNT.get()){
			this.spendMoney(totalPrice,  MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_IN_SHOP, {"id": GUI.SHOP_DATA.SHOP_DATA_SUPER[0].ID});
		}
		else if (Number == GUI.SHOP_DATA.SHOP_DATA_WORLD[0].COUNT.get()){
			this.spendMoney(totalPrice,  MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_IN_SHOP, {"id": GUI.SHOP_DATA.SHOP_DATA_WORLD[0].ID});
		}
		else {
			this.spendMoney(totalPrice, MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_BUY_ITEM, {"ItemID": ItemID, "Number": Number}); //购买道具
		}


        var handled = false;

        var curState = _GetCurGameLevelState();

        for (var indx = 0; indx < this.m_GameItems.length; ++indx)
        {
            var item = this.m_GameItems[indx];
            if (item.ID == ItemID)
            {
                item.Number.add(Number);

//                if (!this.getFreeFlagFromItem(ItemID) && !(curState instanceof cc.State_GameGuide)){
                    item.Income.add(Number);
//                }
                handled = true;
                cc.log("add item success" + ItemID);
                break;
            }
        }

        var upLoaditemData = {};

        upLoaditemData["Number"] = item.Number;
        upLoaditemData["Income"] = Number;
        upLoaditemData["Cost"] = 0;

        upLoaditemData["ENG_NAME"] = item.ENG_NAME;
        upLoaditemData["ID"] = item.ID;

        if (handled )
        {
//            if (!this.getFreeFlagFromItem(ItemID) && !(curState instanceof cc.State_GameGuide)){
                cc.NodeHelper.getInstance().uploadItems(upLoaditemData);
//            }

            this.notifyGUIObservers(NOTIFY_EVENT.FOR_MONEY);
        }
        cc.log("add item " + ItemID);

//        if (totalPrice <= 0){
//            cc.DataMng.getInstance().realBuyItemByID(ItemID, Number, totalPrice);
//            return this;
//        }
//
////        var shopData = GUI.getShopDataWithItemID(ItemID);
//        cc.GUIItemPrompt.getInstance().openWindow(_GUILayer(), ItemID, Number, totalPrice); // 先确认

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addItemLocal: function(itemID, addValue)
    {
        var itemData = this.getItemByID(itemID);
        if (itemData)
        {
            itemData.Number.add(addValue);
            this.notifyGUIObservers(NOTIFY_EVENT.FOR_MONEY);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    useItemById: function(itemID)
    {
        var handled = false;
        var buyForUse = false;

        //
        var itemData = this.getItemByID(itemID);
        if (itemData && itemData.Number.get() <= 0)
        {
            var shopData = GUI.getShopDataWithItemID(itemID);
            if (shopData && this.canSpendMoney(shopData.UNIT_PRICE.get()))
            {
                this.buyItemByID(itemID, 1, shopData.UNIT_PRICE.get());
                BIMng.getInstance().logPayByDiamond(shopData);
                buyForUse = true;
            }
        }
        var curState = _GetCurGameLevelState();
        //
        if (itemData && itemData.Number.get() >= 1)
        {
            itemData.Number.sub(1);
//            if (!this.getFreeFlagFromItem(itemID) &&!(curState instanceof cc.State_GameGuide)){
                itemData.Cost.add(1);

//            }
            handled = true;
//            itemData.Number.save();

        }

		var upLoaditemData = {};

		upLoaditemData["Number"] = itemData.Number;
		upLoaditemData["Income"] = 0;
		upLoaditemData["Cost"] = 1;

		upLoaditemData["ENG_NAME"] = itemData.ENG_NAME;
		upLoaditemData["ID"] = itemData.ID;

        if (handled)
        {
//            if (!this.getFreeFlagFromItem(itemID) && !(curState instanceof cc.State_GameGuide)){

                cc.NodeHelper.getInstance().uploadItems(upLoaditemData);
//            }
//            else if (this.getFreeFlagFromItem(itemID)){
//                var curLevelData = cc.DataMng.getInstance().getCurLevelData();
//                var configItems = cc.DataMng.getInstance().getItemsWithLevelData(curLevelData);
//
//                configItems.forEach(
//                    function (item, index)
//                    {
//                        if (item.ID == itemID){
//                            cc.GUIGameLevel.getInstance().getGameItem().setItemFreeInfo(index, false);
//                        }
//                    }
//                );
//            }
            this.notifyGUIObservers(NOTIFY_EVENT.FOR_MONEY);
            BIMng.getInstance().logUseItem(itemID, buyForUse);

        }

        return handled;
    },

    //------------------------------------------------------------------------------------------------------------------
    getItemByID: function(ItemId)
    {
        for (var indx = 0; indx < this.m_GameItems.length; ++indx)
        {
            var item = this.m_GameItems[indx];
            if (item.ID == ItemId)
            {
                return item;
            }
        }

        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    setFloatLevelWin: function()
    {
        var mapID = GUI._GetMapIDWithLevelData(this.m_CurLevelData);
        var maxProcess = this.m_DataFloatLevel.getMaxProcessFloat(mapID);

        if (maxProcess == this.m_CurLevelData.ID)
        {
            var mapDefine = GUI._GetMapDefineWithID(mapID);
            if (maxProcess < mapDefine.MAX_FLOAT_ID)
            {
                this.m_DataFloatLevel.setMaxProcessFloat(mapID, maxProcess + 1);
            }
        }

        return this;
    },
	
	getGameLevelBITime : function()
	{
		return this.m_GameLevelBITime;
	},
	
    //------------------------------------------------------------------------------------------------------------------
    setGameLevelResult: function (result)
    {
        //step1:
        this.m_GameLevelResult = result;

        //step2:
        this.m_CurLevelData.CUR_SCORE.set(this.getCurScore());
        cc.GUITaskKakao.getInstance().addTaskScore(Task.TaskID.DAILY_SCORE,this.getCurScore());
        cc.GUITaskKakao.getInstance().addTaskScore(Task.TaskID.WEEKEND_SCORE,this.getCurScore());

        //step3:
        BIMng.getInstance().logEndGameLevel(this.m_GameLevelResult, this.m_GameLevelBITime);

        //
        if (this.m_GameLevelResult != Defines.GAME_RESULT.RESULT_SUCCESS)
        {
            // 记录失败次数
            var customResult = cc.DataMng.getCustomResult();
            if (customResult)
            {
                customResult.addCustomData(this.m_CurLevelData.NAME);
                var FailedResult = customResult.getCustomValue(this.m_CurLevelData.NAME);
                cc.log("DataMng +++ customResult level name = " + FailedResult.CustomName + " result = " + FailedResult.CustomFailedCount);
            }

            //
            if (this.getMaxProcessLevelKey() == this.m_CurLevelData.NAME)
            {
                this.addFailedBeforeWin(1);
                BIMng.getInstance().logGameLevelFailBeforeWin(this.m_GameLevelBITime);
            }

            return this;
        }
        else {
           this.addTotalWinTime(1);
        }

        //成功后把心加回去
		if (!cc.DataMng.getInstance().getFreeCandyFlag()){
			this.addHeart(1);
		}

        //记录
       /* ItemPack.getInstance().addHeartRecord(
            ItemRecord.create(HEART_SOURCE.SOURCE_ADD_HEART_FOR_WIN_GAME_LEVEL, 1)
        ).save();*/

        // 重置失败次数
        customResult = cc.DataMng.getCustomResult();
        if (customResult)
        {
            customResult.resetCustomData(this.m_CurLevelData.NAME);
        }

        //
        if (this.m_CurLevelData.CUR_SCORE.get() > this.m_CurLevelData.HISTORY_MAX_SCORE.get())
        {
            //
            var lastRate = Tools.getScoreRate(
                this.m_CurLevelData.HISTORY_MAX_SCORE.get(), this.m_CurLevelData.TARGET_SCORES_SAVE.get());

            //
            this.m_CurLevelData.LAST_HISTORY_MAX_SCORE.set(this.m_CurLevelData.HISTORY_MAX_SCORE.get());
            this.m_CurLevelData.LAST_HISTORY_MAX_SCORE.save();

            //
            this.m_CurLevelData.HISTORY_MAX_SCORE.set(this.m_CurLevelData.CUR_SCORE.get());
            this.m_CurLevelData.HISTORY_MAX_SCORE.save();

            //
            var diamondBonus = GUI._GetDiamondBonusWithLevelData(this.m_CurLevelData);
            var curRate = Tools.getScoreRate(
                this.m_CurLevelData.HISTORY_MAX_SCORE.get(), this.m_CurLevelData.TARGET_SCORES_SAVE.get());

            if(curRate == 3 && lastRate < 3)
            {
                cc.GUIAchievement.getInstance().addAchievementScoreWithOutUpload(Achieve.AchieveType.TYPE_PERFECT_CLRAR.toString(),1);
            }

            for (var index = lastRate; index < curRate; index++)
            {
                this.m_DiamondBonus += diamondBonus[index];
            }

			this.m_DiamondBonus = 0; //需求修改  关闭加钻石的设定

//            if (this.m_DiamondBonus > 0)
//            {
//                //加钱 不通知界面
//                this.addMoney(this.m_DiamondBonus, MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_GAME_WIN);//游戏胜利
//                this.closeNotifyGUIObservers(NOTIFY_EVENT.FOR_MONEY);
//
//                BIMng.getBIDiamond().logDiamondIncome_LevelWin(this.m_DiamondBonus);
//            }
        }

        //悬浮关卡的成功
        if (this.m_CurLevelData.IS_FLOAT_LEVEL)
        {
            this.setFloatLevelWin();
            return this;
        }

        //
        if (this.getMaxProcessLevelKey() == this.m_CurLevelData.NAME)
        {
            //
            this.resetFailedBeforeWin();

            //
            var nextLevelKey = cc.GUIMapMng.getInstance().getNextMapItemKey(this.m_CurLevelData.NAME);

            if (nextLevelKey)
            {
                var nextLevelData = this.getLevelDataWithName(nextLevelKey);

                if (nextLevelData)
                {
                    this.setMaxProcessLevelKey(nextLevelKey, true);

                    //
                    this.m_CurLevelData.IS_SPACE_LEVEL ? this.getDirty().setSpaceScoresDirty(true)
                        : this.getDirty().setScoresDirty(true);

                    //下一关是空间站关卡
                    if (this.m_CurLevelData.IS_SPACE_LEVEL && nextLevelData.IS_SPACE_LEVEL)
                    {
                        this.setNewCokeEndTime();
                    }
                }
            }
        }
		cc.NodeHelper.getInstance().uploadWeeklyData();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleGameLevelStart: function(gameLevel)
    {
        if (!gameLevel || !(gameLevel instanceof cc.GameLevel))
        {
            cc.Assert(0, "handleGameLevelStart !gameLevel || !(gameLevel instanceof cc.GameLevel)");
            return this;
        }

        this.m_GameLevelResult = null;

        this.m_DestroyRecord = {};
        //this.m_CreateRecord = {};
        //this.m_AllObjectsRecords = {};

        //
        var self = this;
        var itr = gameLevel.getTable().createIterForGrids();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            //
            var grid = itr.getCurrent();
            if (!grid)
            {
                continue;
            }

            //
            var objectsNodes = grid.getChildrenNodes();
            objectsNodes.forEach(
                function(obj)
                {
                    if (!obj)
                    {
                        return;
                    }

                    /*var description = obj.description();
                    self.m_AllObjectsRecords[description] = self.m_AllObjectsRecords[description] || 0;

                    if (obj instanceof cc.Obj_Floor)
                    {
                        self.m_AllObjectsRecords[description] += obj.getFloorCount();
                    }
                    else
                    {
                        ++self.m_AllObjectsRecords[description];
                    }*/

                    //
                    DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().addCreateObjectToDiary(obj);
                }
            );
        }

        //
        DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().logCreateObjects();

        //
        if (this.m_CurLevelData && this.m_CurLevelData.TIME)
        {
            this.m_GameLevelTime = this.m_CurLevelData.TIME;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    loadGameLevels: function()
    {
		cc.log("loadGameLevels");
        this.m_GameLevelDatas = [];

        var self = this;
        Defines.GAME_LEVELS.forEach(
            function(_level, index)
            {
                //
                var loadData = _level;//Tools.clone(_level);
                loadData.ID = index;
                loadData.TILED_MAP_NAME = "Level_" + (index + 1) + ".tmx";

                //
                var key = loadData.NAME + "_";

                loadData.CUR_SCORE = /*cc.GameDataNumber*/cc.GameLevelHistoryScore.create(key + "CUR_SCORE", 0, _DB_OP_GAME_LEVELS, Defines.MAX_NUMBER_DATA_VALUE);
                loadData.LAST_HISTORY_MAX_SCORE = /*cc.GameDataNumber*/cc.GameLevelHistoryScore.create(key + "LAST_HISTORY_MAX_SCORE", 0, _DB_OP_GAME_LEVELS, Defines.MAX_NUMBER_DATA_VALUE);
                loadData.HISTORY_MAX_SCORE = /*cc.GameDataNumber*/cc.GameLevelHistoryScore.create(key + "HISTORY_MAX_SCORE", 0, _DB_OP_GAME_LEVELS, Defines.MAX_NUMBER_DATA_VALUE);

                //
                self.m_GameLevelDatas.push(loadData);

                //load
                loadData.LAST_HISTORY_MAX_SCORE.load();
                loadData.HISTORY_MAX_SCORE.load();
            }
        );

        return this;
    },
//    //------------------------------------------------------------------------------------------------------------------
//    loadMineLevels: function()
//    {
//        cc.log("loadMineLevels");
//		_GetMineGameData();
//        this.m_MineLevelDatas = [];
//
//        var self = this;
//        Defines.GAME_MINE_LEVELS.forEach(
//            function(_level, index)
//            {
//                //
//                var loadData = _level;
//                loadData.ID = index;
//                loadData.TILED_MAP_NAME = "MineLevel_" + (index + 1) + ".tmx";
//
//                //
//                var key = loadData.NAME + "_";
//
//				loadData.CUR_SCORE = /*cc.GameDataNumber*/cc.GameLevelHistoryScore.create(key + "CUR_SCORE", 0, _DB_OP_GAME_LEVELS, Defines.MAX_NUMBER_DATA_VALUE);
//                loadData.LAST_HISTORY_MAX_SCORE = /*cc.GameDataNumber*/cc.GameLevelHistoryScore.create(key + "LAST_HISTORY_MAX_SCORE", 0, _DB_OP_GAME_LEVELS, Defines.MAX_NUMBER_DATA_VALUE);
//                loadData.HISTORY_MAX_SCORE = /*cc.GameDataNumber*/cc.GameLevelHistoryScore.create(key + "HISTORY_MAX_SCORE", 0, _DB_OP_GAME_LEVELS, Defines.MAX_NUMBER_DATA_VALUE);
//
//                //
//                self.m_MineLevelDatas.push(loadData);
//            }
//        );
//
//        return this;
//    },
    //------------------------------------------------------------------------------------------------------------------
    getTotalData: function()
	{
		var totalScore = 0;

		var levelLength = isSpaceLevel ? Defines.GAME_SPACE_LEVELS.length : Defines.GAME_LEVELS.length;
        var maxGameLevel = cc.DataMng.getInstance().getMaxProcessLevelData();

        //
        var scores = 0;
		var levels = 0;
        for (var indx = 0; indx < Defines.GAME_LEVELS.length; ++indx)
        {
			var isSpaceLevel = false;
            var levelData = cc.DataMng.getInstance().getLevelDataWithID(indx, isSpaceLevel);
            if (!levelData)
            {
                break;
            }

            //挑战关卡有可能是花钱买过的，空间站中的挑战关卡有可能有多个为0分的
            if (!cc.DataMng.getInstance().isGameLevelEnabled(indx, isSpaceLevel, maxGameLevel))
            {
				if (indx >= 1){
					levels += indx;
				}
                break;
            }

            //
            var scoreValue = levelData.HISTORY_MAX_SCORE.getFaceValue();
            scores += scoreValue;
        }

		for (var indx = 0; indx < Defines.GAME_SPACE_LEVELS.length; ++indx)
        {
			var isSpaceLevel = true;
            var levelData = cc.DataMng.getInstance().getLevelDataWithID(indx, isSpaceLevel);
            if (!levelData)
            {
                break;
            }

            //挑战关卡有可能是花钱买过的，空间站中的挑战关卡有可能有多个为0分的
            if (!cc.DataMng.getInstance().isGameLevelEnabled(indx, isSpaceLevel, maxGameLevel))
            {
//				if (indx >= 1){
//					levels += indx;
////                    cc.log("levels space= " + indx -1);
//				}
                break;
            }

            //
            var scoreValue = levelData.HISTORY_MAX_SCORE.getFaceValue();
            scores += scoreValue;
        }

		var datas = [scores, levels];
		return datas;
	},
	
	getSingleStarScore: function(mapID)
	{
        var minID = -1;
        var maxID = -1;
        var starScore = 0;
        var maxGameLevel = cc.DataMng.getInstance().getMaxProcessLevelData();

        for (var prop in GUI.MAP_DEFINE)
        {
            if (GUI.MAP_DEFINE.hasOwnProperty(prop))
            {
                if (mapID == GUI.MAP_DEFINE[prop].ID){
                    minID = GUI.MAP_DEFINE[prop].MIN_LEVEL_ID;
                    maxID = GUI.MAP_DEFINE[prop].MAX_LEVEL_ID;
                }
            }
        }

        for (var indx = minID; indx <= maxID; ++indx)
        {
            var isSpaceLevel = false;
            var levelData = cc.DataMng.getInstance().getLevelDataWithID(indx, isSpaceLevel);
            if (!levelData)
            {
                break;
            }

            //挑战关卡有可能是花钱买过的，空间站中的挑战关卡有可能有多个为0分的
            if (!cc.DataMng.getInstance().isGameLevelEnabled(indx, isSpaceLevel, maxGameLevel))
            {
                break;
            }

            //
            var score = levelData.HISTORY_MAX_SCORE.getFaceValue();

            starScore += score;
        }

        return starScore;
	},
	
    //------------------------------------------------------------------------------------------------------------------
    getTotalStarNum: function() //获得目前的总星数
	{
		var totalScore = 0;

		var levelLength = isSpaceLevel ? Defines.GAME_SPACE_LEVELS.length : Defines.GAME_LEVELS.length;
        var maxGameLevel = cc.DataMng.getInstance().getMaxProcessLevelData();

        //
        var starNum = 0;
        for (var indx = 0; indx < Defines.GAME_LEVELS.length; ++indx)
        {
			var isSpaceLevel = false;
            var levelData = cc.DataMng.getInstance().getLevelDataWithID(indx, isSpaceLevel);
            if (!levelData)
            {
                break;
            }

            //挑战关卡有可能是花钱买过的，空间站中的挑战关卡有可能有多个为0分的
            if (!cc.DataMng.getInstance().isGameLevelEnabled(indx, isSpaceLevel, maxGameLevel))
            {
                break;
            }

            //
			var score = levelData.HISTORY_MAX_SCORE.getFaceValue();
			var targets = levelData.TARGET_SCORES.concat();
			var starRate = Tools.getScoreRate(score, targets);

            starNum += starRate;
        }

		for (var indx = 0; indx < Defines.GAME_SPACE_LEVELS.length; ++indx)
        {
			var isSpaceLevel = true;
            var levelData = cc.DataMng.getInstance().getLevelDataWithID(indx, isSpaceLevel);
            if (!levelData)
            {
                break;
            }

            //挑战关卡有可能是花钱买过的，空间站中的挑战关卡有可能有多个为0分的
            if (!cc.DataMng.getInstance().isGameLevelEnabled(indx, isSpaceLevel, maxGameLevel))
            {
                break;
            }

            //
			var score = levelData.HISTORY_MAX_SCORE.getFaceValue();
			var targets = levelData.TARGET_SCORES.concat();
			var starRate = Tools.getScoreRate(score, targets);

            starNum += starRate;
        }

		return starNum;
	},

    //------------------------------------------------------------------------------------------------------------------
    loadSpaceGameLevels: function()
    {
        //空间站关卡数据
        this.m_GameSpaceLevelData = [];

        var self = this;
        Defines.GAME_SPACE_LEVELS.forEach(
            function(_spaceLevel, index)
            {
                //
                var loadData = _spaceLevel;//Tools.clone(_spaceLevel);
                loadData.ID = index;
                loadData.IS_SPACE_LEVEL = true;
                loadData.TILED_MAP_NAME = "SpaceLevel_" + (index + 1) + ".tmx";

                var key = loadData.NAME + "_";

                loadData.CUR_SCORE = /*cc.GameDataNumber*/cc.GameLevelHistoryScore.create(key + "CUR_SCORE", 0, _DB_OP_GAME_LEVELS, Defines.MAX_NUMBER_DATA_VALUE);
                loadData.LAST_HISTORY_MAX_SCORE = /*cc.GameDataNumber*/cc.GameLevelHistoryScore.create(key + "LAST_HISTORY_MAX_SCORE", 0, _DB_OP_GAME_LEVELS, Defines.MAX_NUMBER_DATA_VALUE);
                loadData.HISTORY_MAX_SCORE = /*cc.GameDataNumber*/cc.GameLevelHistoryScore.create(key + "HISTORY_MAX_SCORE", 0, _DB_OP_GAME_LEVELS, Defines.MAX_NUMBER_DATA_VALUE);

                //
                self.m_GameSpaceLevelData.push(loadData);

                //load
                loadData.LAST_HISTORY_MAX_SCORE.load();
                loadData.HISTORY_MAX_SCORE.load();
            }
        );

        //最后一个空间站只作为待续结束语没有实际关卡数据,占位标记
        var lastSpaceLevelData = {};
        lastSpaceLevelData.ID = this.m_GameSpaceLevelData.length;
        lastSpaceLevelData.IS_SPACE_LEVEL = true;
        lastSpaceLevelData.NAME = "SPACE_LEVEL_" + (lastSpaceLevelData.ID + 1);

        //
        lastSpaceLevelData.HISTORY_MAX_SCORE = /*cc.GameDataNumber*/cc.GameLevelHistoryScore.create(
            lastSpaceLevelData.NAME + "_" + "HISTORY_MAX_SCORE", 0, _DB_OP_GAME_LEVELS, Defines.MAX_NUMBER_DATA_VALUE);

        //
        lastSpaceLevelData.LAST_HISTORY_MAX_SCORE = /*cc.GameDataNumber*/cc.GameLevelHistoryScore.create(
            lastSpaceLevelData.NAME + "_" + "LAST_HISTORY_MAX_SCORE", 0, _DB_OP_GAME_LEVELS, Defines.MAX_NUMBER_DATA_VALUE);

        //
        this.m_GameSpaceLevelData.push(lastSpaceLevelData);

        return this;
    },

    cleanItems: function()
    {
        for (var prop in Defines.GameItems)
        {
            if (!Defines.GameItems.hasOwnProperty(prop))
            {
                continue;
            }

            //
            var itemCore = Tools.clone(Defines.GameItems[prop]);
            if (itemCore)
            {
                //
                itemCore.Number = cc.GameDataNumber.create(itemCore.NAME, 0, _DB_OP_GAME_ITEMS, Defines.MAX_ITEM_COUNT);
                itemCore.Income = cc.GameDataNumber.create(itemCore.NAME + "income", 0, _DB_OP_GAME_ITEMS, Defines.MAX_ITEM_COUNT);
                itemCore.Cost = cc.GameDataNumber.create(itemCore.NAME + "cost", 0, _DB_OP_GAME_ITEMS, Defines.MAX_ITEM_COUNT);
                itemCore.Number.set(0);
                itemCore.Income.set(0);
                itemCore.Cost.set(0);
//                itemCore.Number.save();
            }
        }

    },

    //------------------------------------------------------------------------------------------------------------------
    loadItems: function()
    {
        //载入物品
        var self = this;

        //载入物品容器
        this.m_GameItemsContainer.forEach(
            function(container)
            {
                container.load();
            }
        );

        this.m_GameItems.splice(0, this.m_GameItems.length);
        for (var prop in Defines.GameItems)
        {
            if (!Defines.GameItems.hasOwnProperty(prop))
            {
                continue;
            }

            //
            var itemCore = Tools.clone(Defines.GameItems[prop]);
            if (itemCore)
            {
                //
                itemCore.Number = cc.GameDataNumber.create(itemCore.NAME, 0, _DB_OP_GAME_ITEMS, Defines.MAX_ITEM_COUNT);
                itemCore.Income = cc.GameDataNumber.create(itemCore.NAME + "income", 0, _DB_OP_GAME_ITEMS, Defines.MAX_ITEM_COUNT);
                itemCore.Cost = cc.GameDataNumber.create(itemCore.NAME + "cost", 0, _DB_OP_GAME_ITEMS, Defines.MAX_ITEM_COUNT);
                itemCore.Number.load();

                //
                self.m_GameItems.push(itemCore);
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    load: function()
    {
        /*var needPreLoad = true;

        //
        if (needPreLoad)
        {
            _DB_OP_GAME_LEVELS.prepareLoad();
            _DB_OP_GAME_ITEMS.prepareLoad();
            _DB_OP_GAME.prepareLoad();
        }*/
        cc.log("datamng load");
        //载入关卡 最远关卡
        this.m_MaxProcessLevelKey.load();

        //载入关卡
        //载入关卡 普通
        this.loadGameLevels();

        //载入关卡 空间站
        this.loadSpaceGameLevels();

        //载入关卡 采矿模式
//        cc.MineMng.getInstance().getMineGameData();

//        //载入道具
//        this.loadItems();

        //第一次登陆
        this.m_FirstPlayGame.load();

        //加心 减心 需要立即存一下
//        this.m_Hearts.load();
//        this.m_Hearts.save();

//        this.m_HeartRecoverMax.load();
//        this.m_HeartRecoverAdd.load();
        this.m_AddHeartTime.load();

        //消耗金钱
        this.m_MoneyDiamond.load();
        this.m_MoneyDiamondCost.load();
        this.m_MoneyDiamondIncome.load();

        //更新可乐
        this.m_CokeEndTime.load();

        //更新采矿CD
        this.m_MineCDTime.load();

        //游戏教学
        this.m_GameGuidData.load();

        //首次分享
        this.m_FirstShare.load();

        //
        this.m_PayedNewPackage.load();

        this.m_OptionCheckSel.load();
        //
        //this.m_ShowStory.load();

        //
        this.m_FriendCokeHelp.load();
        
//        this.m_SpringDaily.load();
        //
        this.m_DataDaily.load();

		this.m_candyDaily.load();

        this.m_diamondDaily.load();
        //
        this.m_DataStory.load();

        //
        this.m_DataDrama.load();

        //
        //this.m_DataRole.load();

        //
        //this.m_DataTimer.load();

        //
        //this.m_DataAddGold.load();

        //
        //this.m_DataNodeLog.load();
        //this.m_DataNodeSelf.load();

        //
        //this.m_DataArriveCustomTime.load();

        //
        this.m_LastLevelShared.load();

        //
        this.m_PopupShareCount.load();

        //
        this.m_FailedBeforeWin.load();

        this.m_totalSuccessTime.load();
        //
        this.m_CanPush.load();

        //
        //this.m_DataItem.load();

        //
        this.m_DataCustomResult.load();

        //
        this.m_DataFloatLevel.load();

        //
        this.m_MovesCard.load();

        //
        this.m_GameContinueCount.load();

        //
        this.m_TelcomActivate.load();

        //
        this.m_CurJoyFlag.load();

        //
       /* if (needPreLoad)
        {
            _DB_OP_GAME_LEVELS.prepareLoadFinish();
            _DB_OP_GAME_ITEMS.prepareLoadFinish();
            _DB_OP_GAME.prepareLoadFinish();
        }*/

        //
        this.afterLoad();
		
		this.m_totalFailedTime.load();
		this.m_totalFailedTime.save();

        this.m_dataSignIn.load();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isGameLevelGuidFinish: function(gameLevelName, needLog)
    {
        if (needLog)
        {
            cc.log("isGameLevelGuidFinish = " + gameLevelName + " = " + this.m_GameGuidData.getByKey(gameLevelName));
        }

        return this.m_GameGuidData.getByKey(gameLevelName);
    },

    //------------------------------------------------------------------------------------------------------------------
    setGameLevelGuidFinish: function(gameLevelName, needLog)
    {
        //
        this.m_GameGuidData.setByKey(gameLevelName, true);
        this.m_GameGuidData.save();
        //_DB_OP_GAME.toDB();

        //
        if (needLog)
        {
            cc.log("setGameLevelGuidFinish = " + gameLevelName + " = " + this.m_GameGuidData.getByKey(gameLevelName));
        }

        return this;
    },
	
	//------------------------------------------------------------------------------------------------------------------
    setGameLevelGuidFinishValue: function(gameLevelName, value)
    {
        //
        this.m_GameGuidData.setByKey(gameLevelName, value);
        this.m_GameGuidData.save();
        //_DB_OP_GAME.toDB();

        //
        cc.log("setGameLevelGuidFinishValue = " + gameLevelName + " = " + this.m_GameGuidData.getByKey(gameLevelName));
        

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    afterLoad: function()
    {
        //更新一下心
        this.m_DataDaily.dailyStart();
        this.updateHeart();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isHeartFull: function()
    {
		if (!this.getHeartRecoverMax()){
			return true;
		}
	
        return this.getCurrentHeart() >= this.getHeartRecoverMax()/*Defines._GetMaxHearts()*/;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateHeart: function()
    {
        //ItemPack.getInstance().getItemHeart().updateHeartByTime();

        //返回值小于等于0则为已满标志

        var handled = false;

        if (this.isHeartFull())
        {
            this.m_AddHeartTime.set(0);
            handled = true;
        }
        else
        {
            var nowTime = _LocalTime()/1000;
            var updateTime = this.getCandyCDTime();

            var curAddHeartTime = this.m_AddHeartTime.get();

            if (!curAddHeartTime){
                curAddHeartTime = 0;
            }

            if (curAddHeartTime <= 0)
            {
                var nextAddHeartTime = nowTime + updateTime;
                this.m_AddHeartTime.set(nextAddHeartTime);
                handled = true;
            }
            else
            {
                var passTime = nowTime - curAddHeartTime;
                if (passTime >= 0)
                {
                    var addCount = parseInt(passTime/updateTime);
                    ++addCount;

                    //需要控制最大值
                    var oldHeart = this.getCurrentHeart();
                    this.addHeart(addCount, true);
                    var newHeart = this.getCurrentHeart();

                    //
                    if (newHeart > oldHeart)
                    {
                        //记录
                        /*ItemPack.getInstance().addHeartRecord(
                            ItemRecord.create(HEART_SOURCE.SOURCE_ADD_HEART_BY_TIME, newHeart - oldHeart).setParams(
                                {
                                    'addTime': curAddHeartTime,
                                    'nowTime': nowTime
                                }
                            )
                        ).save();*/
                    }

                    //
                    if (!this.isHeartFull())
                    {
                        var leftTime = passTime%updateTime;
                        cc.log("leftTime = " + leftTime);
                        this.m_AddHeartTime.set(nowTime + (updateTime - leftTime));
                    }
                    else
                    {
                        this.m_AddHeartTime.set(0);
                    }

                    handled = true;
                }
            }
        }

        if (handled)
        {
            this.m_AddHeartTime.save();
            //_DB_OP_GAME.toDB();
        }

        return this.getAddHeartTime();
    },

    //------------------------------------------------------------------------------------------------------------------
    getAddHeartTime: function()
    {
        return this.m_AddHeartTime.get();
    },

    getCurFreshLine : function(){
        return this.m_curFreshLine.get();
    },

    setCurFreshLine : function(){
        var curDays = new Date().getDay() + 1;
        var totalSec = 86400;

        var freshLine = curDays * totalSec;

//        test
//        var curDays = new Date().getDay();
//        var leftHours = new Date().getHours();
//        var leftMin = new Date().getMinutes();
//        var leftSec = new Date().getSeconds();
//        var totalSec = 86400;

//        var leftTime = totalSec - leftHours * 60 * 60 - leftMin * 60 - leftSec;
//        var nowTimes = curDays * totalSec + leftHours * 60 * 60 + leftMin * 60 + leftSec + 30;
//        this.m_curFreshLine.set(nowTimes);
        this.m_curFreshLine.set(freshLine);
        this.m_curFreshLine.save();
    },

    getNowLeftTime: function(){
        var curDays = new Date().getDay();
        var leftHours = new Date().getHours();
        var leftMin = new Date().getMinutes();
        var leftSec = new Date().getSeconds();
        var totalSec = 86400;

//        var leftTime = totalSec - leftHours * 60 * 60 - leftMin * 60 - leftSec;
        var nowTimes = curDays * totalSec + leftHours * 60 * 60 + leftMin * 60 + leftSec;
        return nowTimes;
    },

    setMineCDTime : function(leveldata){
        var nowTime = _ServerTime();

        var targetTimeDay = cc.MineMng.getInstance().getENTER_TIME_LINE()[cc.MineMng.getInstance().getTOOL_TYPE()];

        var updateTime = targetTimeDay * 24 * 60 * 60;
        this.m_MineCDTime.set(nowTime + updateTime);
        cc.log("setMineCDTime  = " + (nowTime + updateTime));
        this.m_MineCDTime.save();
    },

    freshMineCDTime: function(){
        var nowTime = _ServerTime();
        var curCokeEndTime = this.m_MineCDTime.get();
        cc.log("freshMineCDTime");
		cc.log("nowTime = " + nowTime);
		cc.log("curCokeEndTime  = " + curCokeEndTime);
        var passTime = nowTime - curCokeEndTime;
        if (passTime >= 0)
        {
            this.m_MineCDTime.set(0);
            this.m_MineCDTime.save();
        }

        return this.m_MineCDTime.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    resetMineCDTime: function()
    {
        this.m_MineCDTime.set(0);
        this.m_MineCDTime.save();
        cc.log("resetMineCDTime ");
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    updateCokeEndTime: function()
    {
        var nowTime = _ServerTime();
        var curCokeEndTime = this.m_CokeEndTime.get();

        var passTime = nowTime - curCokeEndTime;
        if (passTime >= 0)
        {
            this.resetCokeEndTime();
        }

        return this.m_CokeEndTime.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    setNewCokeEndTime: function()
    {
        //可乐关卡完设置下一个可乐关卡
        if (this.m_CokeEndTime.get() > 0)
        {
            cc.log("DataMng>>>>>setNewCokeEndTime 异常");
        }

        var nowTime = _ServerTime();
        var updateTime = Defines._GetUnlockNewStarTime();

        //运营商是固定时间点,其它按配置走
        if (!isTelcomOperators())
        {
            var maxLevelData = this.getMaxProcessLevelData();
            var maxMapDefine = GUI._GetMapDefineWithLevelData(maxLevelData);
            updateTime = maxMapDefine ? maxMapDefine.COKE_TIME : updateTime;
        }

        this.m_CokeEndTime.set(nowTime + updateTime);
        this.m_CokeEndTime.save();

        this.getDirty().setCokeTimeDirty(true);
        return this.m_CokeEndTime.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    resetCokeEndTime: function(needUpload)
    {
        this.m_CokeEndTime.set(0);
        this.m_CokeEndTime.save();

        //需要传的点：付费解锁新星球，Debug功能消除时间
        if (needUpload)
        {
            this.getDirty().setCokeTimeDirty(true);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setFriendCokeHelp: function(recvrid)
    {
        var processLevelData = this.getMaxProcessLevelData();

        if (!processLevelData.IS_SPACE_LEVEL)
        {
            return null;
        }

        //
        var mapKey = GUI._GetMapIDWithLevelData(processLevelData).toString();
        var helpValue = this.m_FriendCokeHelp.getByKey(mapKey);

        if (!helpValue)
        {
            helpValue = [];
        }

        helpValue.push(recvrid);

        //
        this.m_FriendCokeHelp.setByKey(mapKey, helpValue);
        this.m_FriendCokeHelp.save();

        return this.getFriendCokeHelp(mapKey);
    },

    //------------------------------------------------------------------------------------------------------------------
    getFriendCokeHelp: function(key)
    {
        return this.m_FriendCokeHelp.getByKey(key);
    },
    //------------------------------------------------------------------------------------------------------------------
    setSpringDaily: function()
    {
        this.m_SpringDaily.set(_LocalTime());
//        this.m_SpringDaily.save();
        return this.m_SpringDaily.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    getSpringDaily: function()
    {
        return this.m_SpringDaily.get();
    },

    resetSpringDaily: function()
    {
        this.m_SpringDaily.set(0);
        return this.m_SpringDaily.get();
    },
	
	//------------------------------------------------------------------------------------------------------------------
    setCandyDaily: function()
    {
        this.m_candyDaily.set(_LocalTime());
        this.m_candyDaily.save();
        return this.m_candyDaily.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    getCandyDaily: function()
    {
        return this.m_candyDaily.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    setDiamondDaily: function()
    {
        this.m_diamondDaily.set(_LocalTime());
        this.m_diamondDaily.save();
        return this.m_diamondDaily.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    getDiamondDaily: function()
    {
        return this.m_diamondDaily.get();
    },

	//------------------------------------------------------------------------------------------------------------------
    addFailedTime: function()
    {
		this.m_totalFailedTime.add(1);
		this.m_totalFailedTime.save();

        //
        return this.getCurrentFailedTime();
    },
	
	//------------------------------------------------------------------------------------------------------------------
    getCurrentFailedTime: function()
    {
        return this.m_totalFailedTime.get();
    },
	
    //------------------------------------------------------------------------------------------------------------------
    addHeart: function(addValue, checkMax)
    {
        if (!checkMax)
        {
            this.m_Hearts.add(addValue);
//            this.m_Hearts.save();

            //ItemPack.getInstance().getItemHeart().addCurrentHeart(addValue);
        }
        else
        {
            //
            var curValue = this.m_Hearts.get();
            curValue += addValue;
			
			var recoverMax = this.getHeartRecoverMax();
			
			if (!recoverMax){
				recoverMax = Defines._GetMaxHearts();
			}
			
            if (curValue > recoverMax/*Defines._GetMaxHearts()*/)
            {
                curValue = recoverMax/*Defines._GetMaxHearts()*/;
            }

            this.m_Hearts.set(curValue);
//            this.m_Hearts.save();
        }

        //
        this.notifyGUIObservers(NOTIFY_EVENT.FOR_HEARTS);

        cc.NodeHelper.getInstance().uploadOthers();

		cc.log("addHeart = " + this.getCurrentHeart());
        return this.getCurrentHeart();
    },

    addHeartLocal: function(addValue)
    {
        //
        var curValue = this.m_Hearts.get();
        curValue += addValue;

        var recoverMax = this.getHeartRecoverMax();

        if (!recoverMax){
            recoverMax = Defines._GetMaxHearts();
        }

        if (curValue > recoverMax)
        {
            curValue = recoverMax;
        }

        this.m_Hearts.set(curValue);

        return this.getCurrentHeart();
    },

    //------------------------------------------------------------------------------------------------------------------
    desHeart: function(desValue)
    {
//	    if (confirmFlag){
//
//        }
//        else {
//            if (cc.DataMng.getInstance().getFreeCandyFlag()){
//                return this;
//            }
//        }

        //
        this.m_Hearts.sub(desValue);
//        this.m_Hearts.save();

        //
        //ItemPack.getInstance().getItemHeart().subCurrentHeart(desValue);

        //
        this.updateHeart();

        //
        this.notifyGUIObservers(NOTIFY_EVENT.FOR_HEARTS);
        cc.NodeHelper.getInstance().uploadOthers();
		cc.log("desHeart = " + this.getCurrentHeart());
        return this.getCurrentHeart();
    },

    //------------------------------------------------------------------------------------------------------------------
    getCurrentHeart: function()
    {
        cc.log("getCurrentHeart = " + this.m_Hearts.get());
        return this.m_Hearts.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    addHeartRecoverMax: function(addValue)
    {
        this.m_HeartRecoverMax.add(addValue);
//        this.m_HeartRecoverMax.save();

        this.m_HeartRecoverAdd.add(addValue);
//        this.m_HeartRecoverAdd.save();

        //
        //ItemPack.getInstance().getItemHeart().addMaxHeart(addValue);

        //
        this.updateHeart();

        //
        this.notifyGUIObservers(NOTIFY_EVENT.FOR_HEARTS);

        //
        this.getDirty().setHeartDirty(true);


        cc.NodeHelper.getInstance().uploadOthers();

        //
        return this.getHeartRecoverMax();
    },

    //------------------------------------------------------------------------------------------------------------------
    addHeartRecoverMaxLocal: function(addValue)
    {
        this.m_HeartRecoverMax.add(addValue);
//        this.m_HeartRecoverMax.save();

        this.updateHeart();
        this.notifyGUIObservers(NOTIFY_EVENT.FOR_HEARTS);

        return this.getHeartRecoverMax();
    },

    //------------------------------------------------------------------------------------------------------------------
    getHeartRecoverMax: function()
    {
		if (!this.m_HeartRecoverMax.get() || this.m_HeartRecoverMax.get() <= 0 ){
			return Defines._GetMaxHearts();
		}

        return this.m_HeartRecoverMax.get() + Defines._GetMaxHearts();
    },

    //------------------------------------------------------------------------------------------------------------------
    addFailedBeforeWin: function(addValue)
    {
        this.m_FailedBeforeWin.add(addValue);
        this.m_FailedBeforeWin.save();
        return this.getFailedBeforeWin();
    },

    //------------------------------------------------------------------------------------------------------------------
    resetFailedBeforeWin: function()
    {
        this.m_FailedBeforeWin.set(0);
        this.m_FailedBeforeWin.save();
        return this.getFailedBeforeWin();
    },

    //------------------------------------------------------------------------------------------------------------------
    getFailedBeforeWin: function()
    {
        return this.m_FailedBeforeWin.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    addTotalWinTime: function(addValue)
    {
        if (!this.m_totalSuccessTime.get()){
            this.m_totalSuccessTime.set(0);
        }
        this.m_totalSuccessTime.add(addValue);
        this.m_totalSuccessTime.save();
        return this.getTotalWinTime();
    },

    //------------------------------------------------------------------------------------------------------------------
    resetTotalWinTime: function()
    {
        this.m_totalSuccessTime.set(0);
        this.m_totalSuccessTime.save();
        return this.getTotalWinTime();
    },

    //------------------------------------------------------------------------------------------------------------------
    getTotalWinTime: function()
    {
        if (!this.m_totalSuccessTime.get()){
            this.m_totalSuccessTime.set(0);
        }
        return this.m_totalSuccessTime.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    isItemContainerEnable: function(indx)
    {
        var value = this.m_GameItemsContainer[indx];
        return value && value.getFlag();
    },

    //------------------------------------------------------------------------------------------------------------------
    setItemContainerEnable: function(indx, setting)
    {
        var data = this.m_GameItemsContainer[indx];
        if (data)
        {
            setting ? data.setFlag() : data.resetFlag();
            data.save();
        }

        return data.getFlag();
    },

    //------------------------------------------------------------------------------------------------------------------
    getCurLevelDiamondBonus: function()
    {
        return this.m_DiamondBonus;
    },
    //------------------------------------------------------------------------------------------------------------------
    setCurLevelDiamondBonus: function(diamondBonus)
    {
        this.m_DiamondBonus = diamondBonus;
    },

    /**
     * 获取当前角色周排行成绩
     */
    getWeeklyScore : function()
    {
        return this.m_WeeklyScores;
    },
    /**
     * 设置当前角色周排行成绩
     */
    setWeeklyScore : function(score)
    {
        this.m_WeeklyScores = score;
        return this.m_WeeklyScores;
    },

    /**
     * 是否可以自动登录
     */
    getAutoLoginFlag : function()
    {
        return this.m_autoLoginFlag;
    },
    /**
     * 设置当前角色周排行成绩
     */
    setAutoLoginFlag : function(flag)
    {
        this.m_autoLoginFlag = flag;
        return this.m_autoLoginFlag;
    },

    //------------------------------------------------------------------------------------------------------------------
    setMaxProcessLevelKey: function(key, logBI)
    {
        var levelData = this.getLevelDataWithName(key);

        //重置一下分数
        levelData.LAST_HISTORY_MAX_SCORE.set(0);
        levelData.LAST_HISTORY_MAX_SCORE.save();

        levelData.HISTORY_MAX_SCORE.set(0);
        levelData.HISTORY_MAX_SCORE.save();

        this.m_MaxProcessLevelKey.set(key);
        this.m_MaxProcessLevelKey.save();

        var norLevelName = "LEVEL_";

        if (key.slice(0, norLevelName.length) == norLevelName)
        {
            cc.GUIAchievement.getInstance().setAchievementScore(Achieve.AchieveType.TYPE_CLEAR_STAGE.toString(),levelData.ID);
        }

        //
        if (logBI)
        {
            BIMng.getInstance().logMaxProcessLevel();
        }

        return this.getMaxProcessLevelKey();
    },

    //------------------------------------------------------------------------------------------------------------------
    getMaxProcessLevelKey: function()
    {
//        if (this.m_MaxProcessLevelKey.get() == null){
//            return "LEVEL_1";
//        }
        return this.m_MaxProcessLevelKey.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    getMaxProcessLevelData: function()
    {
        var tarLevelData = this.getLevelDataWithName(this.getMaxProcessLevelKey());

//        if (tarLevelData == null){
            return tarLevelData;
//        }
    },

    //------------------------------------------------------------------------------------------------------------------
    setFirstPlayGame: function(setting)
    {
        setting ? this.m_FirstPlayGame.setFlag() : this.m_FirstPlayGame.resetFlag();
        this.m_FirstPlayGame.save();
        return this.isFirstPlayGame();
    },

    //------------------------------------------------------------------------------------------------------------------
    isFirstPlayGame: function()
    {
        return this.m_FirstPlayGame.getFlag();
    },

    //------------------------------------------------------------------------------------------------------------------
    setFirstShare: function(setting)
    {
        setting ? this.m_FirstShare.setFlag() : this.m_FirstShare.resetFlag();
        this.m_FirstShare.save();
        return this.isFirstPlayGame();
    },

    //------------------------------------------------------------------------------------------------------------------
    isFirstShare: function()
    {
        return this.m_FirstShare.getFlag();
    },

    //------------------------------------------------------------------------------------------------------------------
    setLastLevelShared: function(setting)
    {
        setting ? this.m_LastLevelShared.setFlag() : this.m_LastLevelShared.resetFlag();
        this.m_LastLevelShared.save();
        return this.isLastLevelShared();
    },

    //------------------------------------------------------------------------------------------------------------------
    isLastLevelShared: function()
    {
        return this.m_LastLevelShared.getFlag();
    },

    //------------------------------------------------------------------------------------------------------------------
    addPopupShareCount: function(addValue)
    {
        this.m_PopupShareCount.add(addValue);
        this.m_PopupShareCount.save();
        return this.getPopupShareCount();
    },

    //------------------------------------------------------------------------------------------------------------------
    getPopupShareCount: function()
    {
        return this.m_PopupShareCount.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    payedNewPackage: function(setting)
    {
        setting ? this.m_PayedNewPackage.setFlag() : this.m_PayedNewPackage.resetFlag();
        this.m_PayedNewPackage.save();

        this.notifyGUIObservers();
        return this.isPayedNewPackage();
    },

    //------------------------------------------------------------------------------------------------------------------
    isPayedNewPackage: function()
    {
        return this.m_PayedNewPackage.getFlag();
    },

    isOptionCheckSel: function()
    {
        return this.m_OptionCheckSel.getFlag();
    },

    changeOptionCheckSel: function(setting)
    {
        setting ? this.m_OptionCheckSel.setFlag() : this.m_OptionCheckSel.resetFlag();
        this.m_OptionCheckSel.save();
    },

    //------------------------------------------------------------------------------------------------------------------
    setCanPush: function(setting)
    {
        setting ? this.m_CanPush.setFlag() : this.m_CanPush.resetFlag();
        this.m_CanPush.save();
        return this.canPush();
    },

    //------------------------------------------------------------------------------------------------------------------
    canPush: function()
    {
        return this.m_CanPush.getFlag();
    },

    //------------------------------------------------------------------------------------------------------------------
    setCDKeyEnabled: function(isEnabled)
    {
        this.m_CDKeyEnabled = isEnabled;
        this.notifyGUIObservers();
        return this.isCDKeyEnabled();
    },

    //------------------------------------------------------------------------------------------------------------------
    isCDKeyEnabled: function()
    {
        return this.m_CDKeyEnabled;
    },

    //------------------------------------------------------------------------------------------------------------------
    setBannerADEnabled: function(isEnabled)
    {
        isEnabled ? this.m_BannerADEnabled.setFlag() : this.m_BannerADEnabled.resetFlag();
        this.m_BannerADEnabled.save();
        return this.isBannerADEnabled();
    },

    //------------------------------------------------------------------------------------------------------------------
    isBannerADEnabled: function()
    {
        return this.m_BannerADEnabled.getFlag();
    },

    //------------------------------------------------------------------------------------------------------------------
    setFullScreenADEnabled: function(isEnabled)
    {
        isEnabled ? this.m_FullScreenADEnabled.setFlag() : this.m_FullScreenADEnabled.resetFlag();
        this.m_FullScreenADEnabled.save();
        return this.isFullScreenADEnabled();
    },

    //------------------------------------------------------------------------------------------------------------------
    isFullScreenADEnabled: function()
    {
        return this.m_FullScreenADEnabled.getFlag();
    },

    //------------------------------------------------------------------------------------------------------------------
    setMoreDiamondADEnabled: function(isEnabled)
    {
        isEnabled ? this.m_MoreDiamondADEnabled.setFlag() : this.m_MoreDiamondADEnabled.resetFlag();
        this.m_MoreDiamondADEnabled.save();
        this.notifyGUIObservers();
        return this.isMoreDiamondADEnabled();
    },

    //------------------------------------------------------------------------------------------------------------------
    isGetGuestEnabled: function()
    {
        return this.m_GetGuestEnabled.getFlag();
    },

    //------------------------------------------------------------------------------------------------------------------
    setGetGuestEnabled: function(isEnabled)
    {
        isEnabled ? this.m_GetGuestEnabled.setFlag() : this.m_GetGuestEnabled.resetFlag();
        this.m_GetGuestEnabled.save();
        this.notifyGUIObservers();
        return this.isGetGuestEnabled();
    },

    //------------------------------------------------------------------------------------------------------------------
    isMoreDiamondADEnabled: function()
    {
        return this.m_MoreDiamondADEnabled.getFlag() && Define_SysConfig.getInstance().isADEnable();
    },

    //------------------------------------------------------------------------------------------------------------------
    setMoreGameADEnabled: function(isEnabled)
    {
        isEnabled ? this.m_MoreGameADEnabled.setFlag() : this.m_MoreGameADEnabled.resetFlag();
        this.m_MoreGameADEnabled.save();
        this.notifyGUIObservers();
        return this.isMoreGameADEnabled();
    },

    //------------------------------------------------------------------------------------------------------------------
    isMoreGameADEnabled: function()
    {
        return this.m_MoreGameADEnabled.getFlag() && Define_SysConfig.getInstance().isADEnable();
    },
	
	//------------------------------------------------------------------------------------------------------------------
    setScoreRankingsEnabled: function(isEnabled)
    {
        isEnabled ? this.m_ScoreRankingsEnabled.setFlag() : this.m_ScoreRankingsEnabled.resetFlag();
        this.m_ScoreRankingsEnabled.save();
        this.notifyGUIObservers();
        return this.isScoreRankingsEnabled();
    },

    //------------------------------------------------------------------------------------------------------------------
    isScoreRankingsEnabled: function()
    {
        return this.m_ScoreRankingsEnabled.getFlag() && !isTelcomOperators();
    },

    //------------------------------------------------------------------------------------------------------------------
    setSpringFestival: function(setting)
    {
        setting ? this.m_SpringFestival.setFlag() : this.m_SpringFestival.resetFlag();
        this.m_SpringFestival.save();
        return this.isSpringFestival();
    },

    //------------------------------------------------------------------------------------------------------------------
    isSpringFestival: function()
    {
		return this.m_SpringFestival.getFlag();
    },

    //------------------------------------------------------------------------------------------------------------------
    setLastLevelTopNum: function(value)
    {
        this.m_lastLevelTopNum.set(value);
        this.m_lastLevelTopNum.save();

        //
        return this.getLastLevelTopNum();
    },

    //------------------------------------------------------------------------------------------------------------------
    getLastLevelTopNum: function()
    {
        return this.m_lastLevelTopNum.get();
    },
    //------------------------------------------------------------------------------------------------------------------
    /*finishStory: function(stroyName)
    {
        this.m_DataStory.finishStory(stroyName);
        return this.isStoryFinish(stroyName);
    },*/

    //------------------------------------------------------------------------------------------------------------------
    /*isStoryFinish: function(stroyName)
    {
        return this.m_DataStory.isStoryFinish(stroyName);
    },*/

    //------------------------------------------------------------------------------------------------------------------
    /*resetStory: function(stroyName)
    {
        return this.m_DataStory.resetStory(stroyName);
    },*/

    //------------------------------------------------------------------------------------------------------------------
    addMoney: function(addValue/*, forbidNotify*/, addSource)
    {
        if (addValue < 0)
        {
            cc.log("addValue = " + addValue);
            return this.getMoney();
        }

		if (addSource == MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_PAY){
			if (Defines.OS.isiOS()){
				addSource = MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_PAY_APP;
			}
			else {
				addSource = MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_PAY_ANDROID;
			}
		}

        this.m_MoneyDiamond.add(addValue);
        this.m_MoneyDiamond.save();

        this.m_MoneyDiamondIncome.add(addValue);
        this.m_MoneyDiamondIncome.save();

        //
        this.getDirty().setDiamondDirty(true);

        //
        //if (!forbidNotify)
        //{
            this.notifyGUIObservers(NOTIFY_EVENT.FOR_MONEY);
        //}

        //Bank.getInstance().addMoney(addValue, (addSource || MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_DEFAULT));

        //上传一次
        if (!isTelcomOperators())
        {
            cc.NodeHelper.getInstance().uploadDiamond(addSource);
        }

        return this.getMoney();
    },

    //------------------------------------------------------------------------------------------------------------------
    addMoneyLocal: function(addValue)
    {
        if (addValue > 0)
        {
            this.m_MoneyDiamond.add(addValue);
            this.m_MoneyDiamond.save();
            this.notifyGUIObservers(NOTIFY_EVENT.FOR_MONEY);
        }

        return this.getMoney();
    },

    //------------------------------------------------------------------------------------------------------------------
    getMoney: function()
    {
        return this.m_MoneyDiamond.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    /*getCostMoney: function()
    {
        return this.m_MoneyDiamondCost.get();
    },*/

    //------------------------------------------------------------------------------------------------------------------
    canSpendMoney: function(spendValue)
    {
        return spendValue <= this.getMoney() && spendValue >= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    spendMoney: function(spendValue, spendSource, params)
    {
        if (!this.canSpendMoney(spendValue))
        {
            return this;
        }

        if (spendValue > 0)
        {
            cc.log("花费钻石 = " + spendValue);
            this.m_MoneyDiamond.sub(spendValue);
            this.m_MoneyDiamond.save();
            cc.log("剩余钻石 = " + this.m_MoneyDiamond.get());

            cc.log("出账添加 = " + spendValue);
            this.m_MoneyDiamondCost.add(spendValue);
            this.m_MoneyDiamondCost.save();
            cc.log("出账数量 = " + this.m_MoneyDiamondCost.get());

            //通知界面系统
            this.notifyGUIObservers(NOTIFY_EVENT.FOR_MONEY);

            //标记脏位
            this.getDirty().setDiamondDirty(true);

            //标记消费
            //Bank.getInstance().spendMoney(spendValue, (spendSource || MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_DEFAULT), params);

			if (spendSource == MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_BUY_ITEM && params["ItemID"]){
				spendSource += params["ItemID"];
			}
			else if (spendSource == MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_IN_SHOP && params["id"]){
				spendSource += params["id"];
			}

            //上传
            if (!isTelcomOperators())
            {
                cc.NodeHelper.getInstance().uploadDiamond(spendSource);
            }
        }

        return this.m_MoneyDiamond.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    addMovesCard: function(addValue)
    {
        this.m_MovesCard.add(addValue);
        this.m_MovesCard.save();

        return this.getMovesCard();
    },

    //------------------------------------------------------------------------------------------------------------------
    getMovesCard: function()
    {
        return this.m_MovesCard.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    spendMovesCard: function(spendValue)
    {
        var handle = false;

        //
        var curValue = this.getMovesCard();
        if (curValue >= spendValue)
        {
            handle = true;
            this.m_MovesCard.sub(spendValue);
            this.m_MovesCard.save();
        }

        return handle;
    },

    //------------------------------------------------------------------------------------------------------------------
    addGameContinueCount: function(addValue)
    {
        this.m_GameContinueCount.add(addValue);
        this.m_GameContinueCountIncome.add(addValue);
//        this.m_GameContinueCount.save();

        cc.log("DataMng addGameContinueCount = " + this.getGameContinueCount());

        var itemData = {};

        itemData["Number"] = this.m_GameContinueCount;
        itemData["Income"] = 0;
        itemData["Cost"] = 1;
        itemData["ENG_NAME"] = "ConGame";
        itemData["ID"] = -1;

        cc.NodeHelper.getInstance().uploadItems(itemData);

        return this.getGameContinueCount();
    },

    //------------------------------------------------------------------------------------------------------------------
    addGameContinueCountLocal: function(addValue)
    {
        this.m_GameContinueCount.add(addValue);
        return this.getGameContinueCount();
    },

    //------------------------------------------------------------------------------------------------------------------
    getGameContinueCount: function()
    {
        return this.m_GameContinueCount.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    spendGameContinueCount: function(spendValue)
    {
        var handle = false;

        //
        var curValue = this.getGameContinueCount();
        if (curValue >= spendValue)
        {
            handle = true;
            this.m_GameContinueCount.sub(spendValue);
            this.m_GameContinueCountCost.add(spendValue);

            var itemData = {};

            itemData["Number"] = this.m_GameContinueCount;
//            itemData["Income"] = this.m_GameContinueCountIncome;
//            itemData["Cost"] = this.m_GameContinueCountCost;
            itemData["Income"] = 0;
            itemData["Cost"] = 1;

            itemData["ENG_NAME"] = "ConGame";
            itemData["ID"] = -1;

            cc.NodeHelper.getInstance().uploadItems(itemData);

//            this.m_GameContinueCount.save();
        }

        return handle;
    },

    //------------------------------------------------------------------------------------------------------------------
    setTelcomActivate: function(setValue)
    {
        this.m_TelcomActivate.set(setValue);
        this.m_TelcomActivate.save();

        return this.getTelcomActivate();
    },

    //------------------------------------------------------------------------------------------------------------------
    getTelcomActivate: function()
    {
        return this.m_TelcomActivate.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    setCurJoyFlag: function(setValue)
    {
        if (setValue >= 0)
        {
            this.m_CurJoyFlag.set(setValue);
            this.m_CurJoyFlag.save();
        }

        return this.getCurJoyFlag();
    },

    //------------------------------------------------------------------------------------------------------------------
    getCurJoyFlag: function()
    {
        if (this.m_CurJoyFlag == null){
            return -1;
        }
        return this.m_CurJoyFlag.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    getDiamondUploadData: function()
    {
        var value = {
            "cur" : this.m_MoneyDiamond.get(),
            "cost" : this.m_MoneyDiamondCost.get(),
            "income" : this.m_MoneyDiamondIncome.get()
        };

        cc.log("-------------------------DiamondUploadData: cur = " + value["cur"]);
        cc.log("-------------------------DiamondUploadData: cost = " + value["cost"]);
        cc.log("-------------------------DiamondUploadData: income = " + value["income"]);

        return value;
    },

    //------------------------------------------------------------------------------------------------------------------
    getDiamondTempUploadData: function()
    {
        var value = {
            "cur" : 0,
            "cost" : 0,
            "income" : 0
        };

        cc.log("-------------------------DiamondTempUploadData: cur = " + value["cur"]);
        cc.log("-------------------------DiamondTempUploadData: cost = " + value["cost"]);
        cc.log("-------------------------DiamondTempUploadData: income = " + value["income"]);

        return value;
    },

    //------------------------------------------------------------------------------------------------------------------
    coverDiamondData: function(newDiamondValue)
    {
        //
        this.m_MoneyDiamond.set(newDiamondValue);
        this.m_MoneyDiamond.save();

        //
        this.m_MoneyDiamondIncome.set(0);
        this.m_MoneyDiamondIncome.save();

        //
        this.m_MoneyDiamondCost.set(0);
        this.m_MoneyDiamondCost.save();

        cc.log("覆盖了钻石->" + newDiamondValue);
        return newDiamondValue;
    },

    //------------------------------------------------------------------------------------------------------------------
    coverItemData: function(newItem)
    {
        //载入物品
        var self = this;

        //载入物品容器
        this.m_GameItemsContainer.forEach(
            function(container)
            {
                container.load();
            }
        );

        this.m_GameItems.splice(0, this.m_GameItems.length);

        for (var prop in Defines.GameItems)
        {
            if (!Defines.GameItems.hasOwnProperty(prop))
            {
                continue;
            }

            //
            var itemCore = Tools.clone(Defines.GameItems[prop]);
            if (itemCore)
            {
                //
                var updateNum = newItem[itemCore.ENG_NAME] || 0;
                itemCore.Number = cc.GameDataNumber.create(itemCore.NAME, 0, _DB_OP_GAME_ITEMS, Defines.MAX_ITEM_COUNT);
                itemCore.Income = cc.GameDataNumber.create(itemCore.NAME + "income", 0, _DB_OP_GAME_ITEMS, Defines.MAX_ITEM_COUNT);
                itemCore.Cost = cc.GameDataNumber.create(itemCore.NAME + "cost", 0, _DB_OP_GAME_ITEMS, Defines.MAX_ITEM_COUNT);
                itemCore.Number.set(updateNum);
                itemCore.Income.set(0);
                itemCore.Cost.set(0);

                cc.log("覆盖了道具" + itemCore.ENG_NAME + " -> " + updateNum);

                self.m_GameItems.push(itemCore);
//                itemCore.Number.save();
            }
        }

        var continueNum = newItem["ConGame"];

        this.m_GameContinueCount.set(continueNum);
        this.m_GameContinueCountIncome.set(0);
        this.m_GameContinueCountCost.set(0);

        cc.log("getGameContinueCount = " + this.getGameContinueCount());

        return newItem;
    },

    //------------------------------------------------------------------------------------------------------------------
    getScoresUploadData: function(isSpaceLevel)
    {
        //
        var levelLength = isSpaceLevel ? Defines.GAME_SPACE_LEVELS.length : Defines.GAME_LEVELS.length;
        var maxGameLevel = cc.DataMng.getInstance().getMaxProcessLevelData();

        //
        var scores = [];
        for (var indx = 0; indx < levelLength; ++indx)
        {
            var levelData = cc.DataMng.getInstance().getLevelDataWithID(indx, isSpaceLevel);
            if (!levelData)
            {
                break;
            }

            //挑战关卡有可能是花钱买过的，空间站中的挑战关卡有可能有多个为0分的
            if (!cc.DataMng.getInstance().isGameLevelEnabled(indx, isSpaceLevel, maxGameLevel))
            {
                break;
            }

            //
            var scoreValue = levelData.HISTORY_MAX_SCORE.get();
            scores.push(scoreValue);
        }

        //
        cc.log("-------------------------ScoresUploadData: " + isSpaceLevel + " = " + scores);

        return scores;
    },

    //------------------------------------------------------------------------------------------------------------------
    coverScoresData: function(norScores, spaceScores)
    {
        var self = this;

        //
        cc.log("coverData 设置分数 normalLength = " + norScores.length + "\n norScores = " + norScores);
        norScores.forEach(
            function(scoreValue, index)
            {
                var data = self.getLevelDataWithID(index);
                if (!data)
                {
                    return;
                }

                //分都设置上
                data.LAST_HISTORY_MAX_SCORE.set(0);
                data.LAST_HISTORY_MAX_SCORE.save();

                //
                if (data.HISTORY_MAX_SCORE)
                {
                    //分都 覆盖掉
                    data.HISTORY_MAX_SCORE.set(parseInt(scoreValue));
                    data.HISTORY_MAX_SCORE.save();
                }
            }
        );

        //
        cc.log("coverData 设置分数 spaceLength = " + spaceScores.length + "\nspaceScores = " + spaceScores);
        spaceScores.forEach(
            function(scoreValue, index)
            {
                var data = self.getLevelDataWithID(index, true);
                if (!data)
                {
                    return;
                }

                //分都设置上
                data.LAST_HISTORY_MAX_SCORE.set(0);
                data.LAST_HISTORY_MAX_SCORE.save();

                //
                if (data.HISTORY_MAX_SCORE)
                {
                    //分都 覆盖掉
                    data.HISTORY_MAX_SCORE.set(parseInt(scoreValue));
                    data.HISTORY_MAX_SCORE.save();
                }
            }
        );

        //正常关卡
        var normalLevelIndx = norScores.length - 1;
        if (normalLevelIndx < 0)
        {
            normalLevelIndx = 0;
        }

        //太空站关卡长度可能是0
        var spaceLevelIndx = spaceScores.length - 1;

        //较新的版本覆盖到较老的版本上可能会超出现有的关卡
        var maxNormalID = cc.GUIMapMng.getInstance().getMaxMapLevelID();
        if (normalLevelIndx > maxNormalID)
        {
            normalLevelIndx = maxNormalID;
        }

        var maxSpaceID = cc.GUIMapMng.getInstance().getMaxSpaceLevelID();
        if (spaceLevelIndx > maxSpaceID)
        {
            spaceLevelIndx = maxSpaceID;
        }

        //判断最远关卡
        var isNormalMax = spaceLevelIndx < 0 || GUI._CompareNorLevelWithSpaceLevel(normalLevelIndx, spaceLevelIndx);
        var maxLevelIndx = isNormalMax ? normalLevelIndx : spaceLevelIndx;

        //
        var gameLevelData = this.getLevelDataWithID(maxLevelIndx, !isNormalMax);
        if (gameLevelData)
        {
            cc.log("coverData 覆盖的关卡号 = " + gameLevelData.NAME);
            this.setMaxProcessLevelKey(gameLevelData.NAME);
            cc.GUIMapMng.getInstance().resetMaxProcessMapItem(gameLevelData.NAME);
        }

        this.notifyGUIObservers(NOTIFY_EVENT.FOR_COVER_DATA);
        return gameLevelData;
    },

    //------------------------------------------------------------------------------------------------------------------
    getHeartUploadData: function()
    {
        var value = {
            "max" : this.getHeartRecoverMax(),
            "add" : this.m_HeartRecoverAdd.get(),
            "cur" : this.m_Hearts.get()
        };

        cc.log("-------------------------HeartUploadData: max = " + value["max"]);
        cc.log("-------------------------HeartUploadData: add = " + value["add"]);
        cc.log("-------------------------HeartUploadData: cur = " + value["cur"]);


        //-------------------------------------------------------------------------------------------
        /*var value2 = {
            "max" : ItemPack.getInstance().getItemHeart().getMaxValue(),
            "add" : ItemPack.getInstance().getItemHeart().getRecoverAddValue(),
            "cur" : ItemPack.getInstance().getItemHeart().getCurrentValue(),

            toString: function()
            {
                return "max = " + this.max + ", add = " + this.add + ", cur = " + this.cur;
            }
        };

        //
        cc.log("ItemPack ItemHeart = " + value2);*/

        return value;
    },

    //------------------------------------------------------------------------------------------------------------------
    coverHeartData: function(heartRecoverMax, candy)
    {
        //
        if (heartRecoverMax > 0){
            this.m_HeartRecoverMax.set(heartRecoverMax);
        }
        else {
            this.m_HeartRecoverMax.set(0);
        }
//        this.m_HeartRecoverMax.save();

        if (candy > 0){
            this.m_Hearts.set(candy);
        }
        else {
            this.m_Hearts.set(0);
        }
		
        //
        this.m_HeartRecoverAdd.set(0);
//        this.m_HeartRecoverAdd.save();

        cc.log("覆盖了薄荷糖上限->" + heartRecoverMax);
        //ItemPack.getInstance().getItemHeart().setMaxHeart(heartRecoverMax);

        return heartRecoverMax;
    },

    //------------------------------------------------------------------------------------------------------------------
    getCokeTimeUploadData: function()
    {
        var maxProcessData = this.getMaxProcessLevelData();

        var cokeID = maxProcessData.IS_SPACE_LEVEL ? maxProcessData.ID : -1;
        var cokeTime = this.updateCokeEndTime();

        //check
        if (cokeID == -1 && cokeTime > 0)
        {
            cc.log("DataMng-----getCokeTimeUploadData: 可乐恢复时间异常");
        }

        var value = {
            "ssrn" : cokeID,
            "ssrt" : cokeTime
        };

        cc.log("-------------------------CokeTimeUploadData: ssrn = " + value["ssrn"]);
        cc.log("-------------------------CokeTimeUploadData: ssrt = " + value["ssrt"]);

        return value;
    },

    //------------------------------------------------------------------------------------------------------------------
    coverCokeTimeData: function(cokeValue)
    {
        var maxProcessData = this.getMaxProcessLevelData();

        var cokeID = cokeValue["ssrn"];
        var cokeTime = cokeValue["ssrt"];

        if (maxProcessData.IS_SPACE_LEVEL && maxProcessData.ID == cokeID)
        {
            this.m_CokeEndTime.set(cokeTime);
            this.m_CokeEndTime.save();
        }

        cc.log("覆盖了可乐恢复时间->" + JSON.stringify(cokeValue));
        return cokeValue;
    },

    //------------------------------------------------------------------------------------------------------------------
    getFreeCandyFlag: function()
    {
	
        var value = this.m_FreeCandyTime.get();
		cc.log("-------------------------FreeCandyData: value = " + value);
//		cc.log("nowTime = " + _LocalTime() / 1000);
//        var nowTime = _LocalTime() / 1000;

        if (value > 0){
            return true;
        }
        else {
            if (value != 0){
                this.coverFreeCandyData(0);
            }

            return false;
        }

    },

    //------------------------------------------------------------------------------------------------------------------
    coverFreeCandyData: function(cokeValue)
    {
        if (cokeValue >= 0)
        {
            this.m_FreeCandyTime.set(cokeValue);
//            this.m_FreeCandyTime.save();
			cc.log("覆盖了无限薄荷糖时间->" + cokeValue);
        }

        return cokeValue;
    },

    //------------------------------------------------------------------------------------------------------------------
    setFreeCandyData: function()
    {
        var nowTime = _LocalTime();

        var targetValue = nowTime / 1000+ 5 * 60;

        var self = this;
        var callBack = function(result, param1, param2)
        {
            //
            cc.log("购买薄荷糖无限结果 = " + result);
            cc.log("购买薄荷糖无限时间 = " + new Date(param1).toLocaleString());
			
			cc.log("本地计算的理论实践 = " + new Date(targetValue).toLocaleString() );
			_SystemLoadingControl(false);
            //
            if (result)
            {
                self.coverFreeCandyData(param1);
            }
            else
            {
//                showMessageToast("Cooling down...");
            }
        };
		_SystemLoadingControl(true);
        //
        cc.NodeSelf.getInstance().asyncUpdateUnlimitedCandyGift(callBack);

        return this;
    },
	
	setCandyCDTime: function(value)
	{
		if (value < 0){
			cc.log("薄荷糖恢复时间异常");
			return this;
		}
		
		cc.log("覆盖了薄荷糖恢复时间 -----》" + value);
		
		this.m_CandyCDTime.set(value);
		
		return this.m_CandyCDTime.get();
	},
	
	getCandyCDTime: function()
	{
		if (this.m_CandyCDTime.get() <= 0){
			cc.log("薄荷糖恢复时间异常");
			return Defines.RESPONSE_TIME;
		}
		return this.m_CandyCDTime.get();
	},

    //------------------------------------------------------------------------------------------------------------------
    getDirty: function()
    {
        return this.m_DataMngDirty;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanRoleData: function(norScores, spaceScores)
    {
        this.m_MoneyDiamond.set(0);
        this.m_MoneyDiamond.save();

        //
        this.m_MoneyDiamondIncome.set(0);
        this.m_MoneyDiamondIncome.save();

        //
        this.m_MoneyDiamondCost.set(0);
        this.m_MoneyDiamondCost.save();

        //
        this.m_HeartRecoverMax.set(0);
//        this.m_HeartRecoverMax.save();

        //
        this.m_HeartRecoverAdd.set(0);
        this.m_HeartRecoverAdd.save();

        this.cleanItems();

        this.m_GameContinueCount.set(0);
        this.m_GameContinueCountIncome.set(0);
        this.m_GameContinueCountCost.set(0);

        //
        var first = cc.DataMng.getInstance().getLevelDataWithID(0);
        if (first)
        {
            cc.DataMng.getInstance().setMaxProcessLevelKey(first.NAME);
            cc.GUIMapMng.getInstance().resetMaxProcessMapItem(first.NAME);
        }

        return this;
    },

    setUpdateScore : function(score){
        this.m_updateScore = score;
        return this.getUpdateScore();
    },

    getUpdateScore : function(){
		return this.getCurScore();
        return this.m_updateScore;
    }
});

//单件模式
cc.DataMng._instance = null;
cc.DataMng.getInstance = function()
{
//	cc.log("cc.DataMng.getInstance normal");
    if (!this._instance)
    {
		cc.log("cc.DataMng.getInstance refresh");
        this._instance = new cc.DataMng();
        this._instance.init();
        this._instance.load();

        //如果第一次登陆的默认处理
        if (this._instance.isFirstPlayGame())
        {
            this._instance.setFirstPlayGame(false);
            this._instance.setMaxProcessLevelKey("LEVEL_1");
            BIMng.getInstance().logFirstPlayGame();
        }
    }

    return this._instance;
};

cc.DataMng.getStory = function()
{
    return cc.DataMng.getInstance().m_DataStory;
};

cc.DataMng.getDrama = function()
{
    return cc.DataMng.getInstance().m_DataDrama;
};

/*cc.DataMng.getItem = function()
{
    return cc.DataMng.getInstance().m_DataItem;
};*/

cc.DataMng.getCustomResult = function()
{
    return cc.DataMng.getInstance().m_DataCustomResult;
};

/*
cc.DataMng.getGameRunTimer = function()
{
    return cc.DataMng.getInstance().m_DataTimer;
};
*/

/*cc.DataMng.getTimeArriveCustom = function()
{
    return cc.DataMng.getInstance().m_DataArriveCustomTime;
};*/

/*cc.DataMng.getGameTotalAddGold = function()
{
    return cc.DataMng.getInstance().m_DataAddGold;
};*/

/*cc.DataMng.getNodeSelf = function()
{
    return cc.DataMng.getInstance().m_DataNodeSelf;
};*/

cc.DataMng.getFloatLevel = function()
{
    return cc.DataMng.getInstance().m_DataFloatLevel;
};

cc.DataMng.getDataDaily = function()
{
    return cc.DataMng.getInstance().m_DataDaily;
};

cc.DataMng.getDataSignIn = function()
{
    return cc.DataMng.getInstance().m_dataSignIn;
};
