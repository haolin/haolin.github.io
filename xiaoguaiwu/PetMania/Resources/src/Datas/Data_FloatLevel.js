
//======================================================================================================================
var Data_FloatLevel = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_FloatKey = null;
        this.m_FloatLevelData = [];
        this.m_MaxProcessFloat = null;
        this.m_MaxProcessState = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        //
        this.m_FloatKey = cc.GameDataNumber.create("m_FloatKey", 0, _DB_OP_GAME_ITEMS, Defines.MAX_NUMBER_DATA_VALUE);
        this.m_MaxProcessFloat = cc.GameDataMap.create("m_MaxProcessFloat", _DB_OP_GAME);

        //记录开启状态，不需要写在本地
        this.m_MaxProcessState = cc.GameDataMap.create();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this.m_FloatKey = null;
        this.m_FloatLevelData = [];
        this.m_MaxProcessFloat = null;
        this.m_MaxProcessState = null;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getFloatLevelData: function(floatID)
    {
        return this.m_FloatLevelData[floatID];
    },

    //------------------------------------------------------------------------------------------------------------------
    addFloatKey: function(addValue)
    {
        if (addValue < 0)
        {
            return this.getFloatKey();
        }

        //
        this.m_FloatKey.add(addValue);
        this.m_FloatKey.save();

        //
        cc.DataMng.getInstance().notifyGUIObservers();

        return this.getFloatKey();
    },

    //------------------------------------------------------------------------------------------------------------------
    subFloatKey: function(subValue)
    {
        //
        this.m_FloatKey.sub(subValue);
        this.m_FloatKey.save();

        //
        cc.DataMng.getInstance().notifyGUIObservers();

        return this.getFloatKey();
    },

    //------------------------------------------------------------------------------------------------------------------
    spendFloatKey: function(spendValue)
    {
        var handle = false;

        //
        var curValue = this.getFloatKey();
        if (curValue >= spendValue)
        {
            handle = true;
            this.subFloatKey(spendValue);
        }

        return handle;
    },

    //------------------------------------------------------------------------------------------------------------------
    getFloatKey: function()
    {
        return this.m_FloatKey.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    setMaxProcessFloat: function(mapID, floatID)
    {
        //
        var levelData = this.getFloatLevelData(floatID);
        levelData.LAST_HISTORY_MAX_SCORE.set(0);
        levelData.LAST_HISTORY_MAX_SCORE.save();

        levelData.HISTORY_MAX_SCORE.set(0);
        levelData.HISTORY_MAX_SCORE.save();

        //
        this.m_MaxProcessFloat.setByKey(mapID, floatID);
        this.m_MaxProcessFloat.save();

        return this.getMaxProcessFloat(mapID);
    },

    //------------------------------------------------------------------------------------------------------------------
    getMaxProcessFloat: function(mapID)
    {
        var mapDefine = GUI._GetMapDefineWithID(mapID);
        return this.m_MaxProcessFloat.getByKey(mapID) || mapDefine.MIN_FLOAT_ID;
    },

    //------------------------------------------------------------------------------------------------------------------
    syncMaxProcessState: function()
    {
        for (var prop in GUI.MAP_DEFINE)
        {
            if (GUI.MAP_DEFINE.hasOwnProperty(prop))
            {
                var mapID = GUI.MAP_DEFINE[prop].ID;
                var maxFloatID = this.getMaxProcessFloat(mapID);
                this.m_MaxProcessState.setByKey(mapID, maxFloatID);
            }
        }

        cc.log("Data_FloatLevel-----syncMaxProcessState: " + JSON.stringify(this.m_MaxProcessFloat.m_Core.getValue()));
        cc.log("Data_FloatLevel-----syncMaxProcessState: " + JSON.stringify(this.m_MaxProcessState.m_Core.getValue()));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isNextFloatLevelNew: function(mapID)
    {
        var maxFloatID = this.getMaxProcessFloat(mapID);
        var maxStateID = this.m_MaxProcessState.getByKey(mapID);
        return maxStateID != maxFloatID;
    },

    //------------------------------------------------------------------------------------------------------------------
    loadFloatLevels: function()
    {
        this.m_FloatLevelData = [];

        //
        var self = this;
        Defines.FLOAT_LEVELS.forEach(
            function(levelData, index)
            {
                //
                levelData.ID = index;
                levelData.IS_FLOAT_LEVEL = true;
                levelData.TILED_MAP_NAME = "Level_" + (index + 1) + ".tmx";

                //
                var key = levelData.NAME + "_";

                levelData.CUR_SCORE = cc.GameDataNumber.create(key + "CUR_SCORE", 0, _DB_OP_GAME_LEVELS, Defines.MAX_NUMBER_DATA_VALUE);
                levelData.LAST_HISTORY_MAX_SCORE = cc.GameDataNumber.create(key + "LAST_HISTORY_MAX_SCORE", 0, _DB_OP_GAME_LEVELS, Defines.MAX_NUMBER_DATA_VALUE);
                levelData.HISTORY_MAX_SCORE = cc.GameDataNumber.create(key + "HISTORY_MAX_SCORE", 0, _DB_OP_GAME_LEVELS, Defines.MAX_NUMBER_DATA_VALUE);

                //
                self.m_FloatLevelData.push(levelData);

                //load
                levelData.LAST_HISTORY_MAX_SCORE.load();
                levelData.HISTORY_MAX_SCORE.load();
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    load: function()
    {
        //
        this.m_FloatKey.load();
        this.m_MaxProcessFloat.load();
        this.loadFloatLevels();

        //
        this.syncMaxProcessState();

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

//
Data_FloatLevel.create = function()
{
    var createNew = new Data_FloatLevel();
    createNew.init();
    return createNew;
};
