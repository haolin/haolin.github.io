//======================================================================================================================
cc.MineMng = cc.Class.extend({
    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {

        //
        this.m_MineLevelData = null;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    init:function()
    {

        this.m_MineLevelDatas = [];
        this.m_curLevelKey = null;
        this.MINE_LEVEL_SETTING_NOR = null;
        this.DIAMONDS_PLUS_NOR = null;
        this.DIAMONDS_GET_NOR = null;
        this.DIAMONDS_NOR_RATE_NOR = null;
        this.DIAMONDS_FREE_NOR = null;
        this.initLocalMineData();
        
        return this;
    },

    initLocalMineData: function()
    {
        this.m_MineLevelDatas = [];

        var self = this;
        Defines.GAME_MINE_LEVELS.forEach(
            function(_level, index)
            {
                //
                var loadData = _level;
                loadData.ID = index;
                loadData.TILED_MAP_NAME = "MineLevel_1.tmx";//"MineLevel_" + (index + 1) + ".tmx";
				
				cc.log("loadData.ID = " + loadData.ID);
                //
                var key = loadData.NAME + "_";

                loadData.CUR_SCORE = /*cc.GameDataNumber*/cc.GameLevelHistoryScore.create(key + "CUR_SCORE", 0, _DB_OP_GAME_LEVELS, Defines.MAX_NUMBER_DATA_VALUE);
                loadData.LAST_HISTORY_MAX_SCORE = /*cc.GameDataNumber*/cc.GameLevelHistoryScore.create(key + "LAST_HISTORY_MAX_SCORE", 0, _DB_OP_GAME_LEVELS, Defines.MAX_NUMBER_DATA_VALUE);
                loadData.HISTORY_MAX_SCORE = /*cc.GameDataNumber*/cc.GameLevelHistoryScore.create(key + "HISTORY_MAX_SCORE", 0, _DB_OP_GAME_LEVELS, Defines.MAX_NUMBER_DATA_VALUE);

                loadData.SPEC_AWARD_SAVE = cc.GameData.create(null, loadData.SPEC_AWARD.concat());
                loadData.SPEC_RATE_SAVE = cc.GameData.create(null, loadData.SPEC_RATE.concat());
                loadData.SPEC_AWARDPOINT_SAVE = cc.GameData.create(null, loadData.SPEC_AWARDPOINT.concat());

                loadData.LINE_RATE_SAVE = cc.GameData.create(null, loadData.LINE_RATE);
                loadData.DIAMONDS_BONUS_LEVEL_SAVE = cc.GameData.create(null, loadData.DIAMONDS_BONUS_LEVEL);
                loadData.DIAMONDS_BONUS_RATE_SAVE = cc.GameData.create(null, loadData.DIAMONDS_BONUS_RATE);
                loadData.TOOL_TYPE_SAVE = cc.GameData.create(null, loadData.TOOL_TYPE);
				cc.log("loadData.TOOL_TYPE = " + loadData.TOOL_TYPE);
                loadData.STAR_NUM_SAVE = cc.GameData.create(null, loadData.STAR_NUM);
                loadData.CD_TIME_SAVE = cc.GameData.create("mineCD_" + index, 0, _DB_OP_GAME);
                loadData.CD_TIME_SAVE.load();
                self.m_MineLevelDatas.push(loadData);
            }
        );

        //以下是公共数据
        var loadData = Defines.GAME_MINE_LEVELS[0];

        this.MINE_LEVEL_SETTING_SAVE = cc.GameData.create(null, loadData.MINE_LEVEL_SETTING);
        this.DIAMONDS_PLUS_SAVE = cc.GameData.create(null, loadData.DIAMONDS_PLUS);
        this.DIAMONDS_GET_SAVE = cc.GameData.create(null, loadData.DIAMONDS_GET);
        this.DIAMONDS_NOR_RATE_SAVE = cc.GameData.create(null, loadData.DIAMONDS_NOR_RATE);
        this.DIAMONDS_FREE_SAVE = cc.GameData.create(null, loadData.DIAMONDS_FREE);

        this.MINE_LEVEL_SETTING_NOR = loadData.MINE_LEVEL_SETTING;
        this.DIAMONDS_PLUS_NOR = loadData.DIAMONDS_PLUS;
        this.DIAMONDS_GET_NOR = loadData.DIAMONDS_GET;
        this.DIAMONDS_NOR_RATE_NOR = loadData.DIAMONDS_NOR_RATE;
        this.DIAMONDS_FREE_NOR = loadData.DIAMONDS_FREE;

        this.PROGRESS_GET_SAVE = cc.GameData.create(null, loadData.PROGRESS_GET);
        this.PROGRESS_ITEM_SAVE = cc.GameData.create(null, loadData.PROGRESS_ITEM);
        this.PROGRESS_LINE_SAVE = cc.GameData.create(null, loadData.PROGRESS_LINE);
        this.ENTER_TIME_LINE_SAVE = cc.GameData.create(null, loadData.ENTER_TIME_LINE);
        this.ENTER_CANDY_SAVE = cc.GameData.create(null, loadData.ENTER_CANDY);
        this.BEFORE_ENTER_DIAMOND_SAVE = cc.GameData.create(null, loadData.BEFORE_ENTER_DIAMOND);
        this.DIAMONDS_GET_NUM_SAVE = cc.GameData.create(null, loadData.DIAMONDS_GET_NUM);
        this.STAR_NOTFILL_NUM_SAVE = cc.GameData.create(null, loadData.STAR_NOTFILL_NUM);


    },

    initSeverMineData: function(_levelTotal)
    {

        cc.log("initSeverMineData");
        var self = this;

        var levelDataTotal = JSON.parse(_levelTotal[0]);

        this.MINE_LEVEL_SETTING_SAVE.set(levelDataTotal['mine_level_setting']);

        this.DIAMONDS_PLUS_SAVE.set(levelDataTotal['diamonds_plus']);

        this.DIAMONDS_GET_SAVE.set(levelDataTotal['diamonds_get']);

        this.DIAMONDS_NOR_RATE_SAVE.set(levelDataTotal['diamonds_nor_rate']);

        this.DIAMONDS_FREE_SAVE.set(levelDataTotal['diamonds_free']);

        this.MINE_LEVEL_SETTING_NOR = levelDataTotal['mine_level_setting'];
        this.DIAMONDS_PLUS_NOR = levelDataTotal['diamonds_plus'];
        this.DIAMONDS_GET_NOR = levelDataTotal['diamonds_get'];
        this.DIAMONDS_NOR_RATE_NOR = levelDataTotal['diamonds_nor_rate'];
        this.DIAMONDS_FREE_NOR = levelDataTotal['diamonds_free'];

        this.PROGRESS_GET_SAVE.set(levelDataTotal['progress_get']);
        this.PROGRESS_ITEM_SAVE.set(levelDataTotal['progress_item']);
        this.PROGRESS_LINE_SAVE.set(levelDataTotal['progress_line']);
        this.ENTER_TIME_LINE_SAVE.set(levelDataTotal['enter_time_line']);
        this.ENTER_CANDY_SAVE.set(levelDataTotal['enter_candy']);
        this.BEFORE_ENTER_DIAMOND_SAVE.set(levelDataTotal['before_enter_diamond']);
        this.DIAMONDS_GET_NUM_SAVE.set(levelDataTotal['diamonds_get_num']);
        this.STAR_NOTFILL_NUM_SAVE.set(levelDataTotal['star_notfill_num']);

        self.m_MineLevelDatas.forEach(
            function(_level, idx)
            {
                if (_levelTotal[idx + 1]){
                    var levelIdx = JSON.parse(_levelTotal[idx + 1]);
                    _level.SPEC_AWARD_SAVE.set(levelIdx['spec_award']);
                    _level.SPEC_RATE_SAVE.set(levelIdx['spec_rate']);
                    _level.SPEC_AWARDPOINT_SAVE.set(levelIdx['spec_awardpoint']);

                    _level.LINE_RATE_SAVE.set(levelIdx['line_rate']);
                    _level.DIAMONDS_BONUS_LEVEL_SAVE.set(levelIdx['diamonds_bonus_level']);
                    _level.DIAMONDS_BONUS_RATE_SAVE.set(levelIdx['diamonds_bonus_rate']);
                    _level.TOOL_TYPE_SAVE.set(levelIdx['tool_type']);
                    _level.STAR_NUM_SAVE.set(levelIdx['star_num']);

                    cc.log("_level.CD_TIME_SAVE = " + _level.CD_TIME_SAVE.get());
                }
            }
        );
    },

    getMineGameData: function()
    {
        if (!Defines.PLATFORM.isMobile())
        {
            return this;
        }

        cc.log("获取采矿数据");

        var self = this;

        //
        var getMineGameDataCallBack = function(result, packet)
        {
            cc.log("获取采矿数据返回结果 result ＝ " + result);

            //
            if (result)
            {
                cc.log("获取采矿数据返回结果 成功 packet = " + JSON.stringify(packet));
                cc.MineMng.getInstance().initSeverMineData(packet);
                //处理核心好友信息
                var body = packet['name'];
                if (body )
                {
                    cc.log("body name= " + body);
                }

            }
            else
            {
                cc.log("获取采矿数据 失败 错误号 = " + packet);
//            manager.fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_FROM_HOME_FAILED);
            }
        };

        //
        cc.log("获取采矿数据........");
        cc.NodeSelf.getInstance().getMineGameLevelInfo(
            getMineGameDataCallBack);

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    getMineLevelDataWithID: function(levelID)
    {
        return this.m_MineLevelDatas[levelID];
    },
	
	//------------------------------------------------------------------------------------------------------------------
    getCurMineLevelData: function()
    {
        return this.m_MineLevelDatas[this.m_curLevelKey];
    },
    setCurLevelKey: function(num){
        this.m_curLevelKey = num;
        return this.m_curLevelKey;
    },

    getCurLevelKey: function(){
        return this.m_curLevelKey;
    },

    getSpec_Award: function(){
        var curlevelData = this.m_MineLevelDatas[this.getCurLevelKey()];
        return curlevelData.SPEC_AWARD_SAVE.get();
    },

    getSpec_AwardItem: function(idx){
        var itemArr = _GetMineSpecialArr();
        var getSpecAward = this.getSpec_Award();
        return itemArr[getSpecAward[idx] - 1];
    },

    getSpec_RATE: function(){
        var curlevelData = this.m_MineLevelDatas[this.getCurLevelKey()];
        return curlevelData.SPEC_RATE_SAVE.get();
    },

    getSpec_AWARDPOINT: function(){
        var curlevelData = this.m_MineLevelDatas[this.getCurLevelKey()];
        return curlevelData.SPEC_AWARDPOINT_SAVE.get();
    },

    getLINE_RATE: function(){
        var curlevelData = this.m_MineLevelDatas[this.getCurLevelKey()];
        return curlevelData.LINE_RATE_SAVE.get();
    },

    getDIAMONDS_BONUS_LEVEL: function(){
        var curlevelData = this.m_MineLevelDatas[this.getCurLevelKey()];
        return curlevelData.DIAMONDS_BONUS_LEVEL_SAVE.get();
    },

    getDIAMONDS_BONUS_RATE: function(){
        var curlevelData = this.m_MineLevelDatas[this.getCurLevelKey()];
        return curlevelData.DIAMONDS_BONUS_RATE_SAVE.get();
    },

    getTOOL_TYPE: function(){
        var curlevelData = this.m_MineLevelDatas[this.getCurLevelKey()];
        return curlevelData.TOOL_TYPE_SAVE.get();
    },

    getSTAR_NUM: function(){
        var curlevelData = this.m_MineLevelDatas[this.getCurLevelKey()];
        return curlevelData.STAR_NUM_SAVE.get();
    },
//    setMineCDTime : function(leveldata){
//        var nowTime = _ServerTime();
//
//        var targetTimeDay = cc.MineMng.getInstance().getENTER_TIME_LINE()[cc.MineMng.getInstance().getTOOL_TYPE()];
//
//        var updateTime = targetTimeDay * 24 * 60 * 60;
//        this.m_MineCDTime.set(nowTime + updateTime);
//        cc.log("setMineCDTime  = " + (nowTime + updateTime));
//        this.m_MineCDTime.save();
//    },
//
//    freshMineCDTime: function(){
//        var nowTime = _ServerTime();
//        var curCokeEndTime = this.m_MineCDTime.get();
//        var passTime = nowTime - curCokeEndTime;
//        if (passTime >= 0)
//        {
//            this.m_MineCDTime.set(0);
//            this.m_MineCDTime.save();
//        }
//
//        return this.m_MineCDTime.get();
//    },
    setCD_TIME: function(){

        var nowTime = _ServerTime();
        var curlevelData = this.m_MineLevelDatas[this.getCurLevelKey()];
        curlevelData.CD_TIME_SAVE.set(nowTime);
		var targetTimeDay = this.getENTER_TIME_LINE()[this.getTOOL_TYPE()];
        var updateTime = targetTimeDay * 24 * 60 * 60;
        cc.log("curlevelData.CD_TIME_SAVE  = " + (nowTime + updateTime));
        curlevelData.CD_TIME_SAVE.save();
    },

    getCD_TIME: function(){
        var targetTimeDay = this.getENTER_TIME_LINE()[this.getTOOL_TYPE()];
        var updateTime = targetTimeDay * 24 * 60 * 60;
        var curlevelData = this.m_MineLevelDatas[this.getCurLevelKey()];

        var nowTime = _ServerTime();
        var curCokeEndTime = curlevelData.CD_TIME_SAVE.get() + updateTime;
        var passTime = nowTime - curCokeEndTime;
        if (passTime >= 0)
        {
            curlevelData.CD_TIME_SAVE.set(0);
            curlevelData.CD_TIME_SAVE.save();
            curCokeEndTime = 0;
        }

        cc.log("curlevelData.getCD_TIME  = " + curCokeEndTime);
        return curCokeEndTime;
    },
///////////////以下是公共内容
    getMINE_LEVEL_SETTING: function(){
//        return this.MINE_LEVEL_SETTING_SAVE.get();
        return this.MINE_LEVEL_SETTING_NOR;
    },

    getDIAMONDS_PLUS: function(){
//        return this.DIAMONDS_PLUS_SAVE.get();
        return this.DIAMONDS_PLUS_NOR;
    },

    getDIAMONDS_GET: function(){
//        return this.DIAMONDS_GET_SAVE.get();
        return this.DIAMONDS_GET_NOR;
    },

    getDIAMONDS_NOR_RATE: function(){
//        return this.DIAMONDS_NOR_RATE_SAVE.get();
        return this.DIAMONDS_NOR_RATE_NOR;
    },

    getDIAMONDS_FREE: function(){
//        return this.DIAMONDS_FREE_SAVE.get();
        return this.DIAMONDS_FREE_NOR;
    },

    getPROGRESS_GET: function(){
        return this.PROGRESS_GET_SAVE.get();
    },

    getPROGRESS_ITEM: function(){
        return this.PROGRESS_ITEM_SAVE.get();
    },

    getPROGRESS_LINE: function(){
        return this.PROGRESS_LINE_SAVE.get();
    },

    getENTER_TIME_LINE: function(){
        return this.ENTER_TIME_LINE_SAVE.get();
    },

    getENTER_CANDY: function(){
        return this.ENTER_CANDY_SAVE.get();
    },

    getBEFORE_ENTER_DIAMOND: function(){
        return this.BEFORE_ENTER_DIAMOND_SAVE.get();
    },

    getDIAMONDS_GET_NUM: function(){
        return this.DIAMONDS_GET_NUM_SAVE.get();
    },

    getSTAR_NOTFILL_NUM: function(){
        return this.STAR_NOTFILL_NUM_SAVE.get();
    }
});

//单件模式
cc.MineMng._instance = null;
cc.MineMng.getInstance = function()
{
    if (!this._instance)
    {
        cc.log("ccMineMng.getInstance refresh");
        this._instance = new cc.MineMng();
        this._instance.init();
//        this._instance.load();

        this._instance.setCurLevelKey(0);
    }

    return this._instance;
};