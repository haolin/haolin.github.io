
//======================================================================================================================
var BI_Countly = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logEndGameLevel: function(levelData, result)
    {
        var config = {};

        //
        var baseID = levelData.IS_SPACE_LEVEL ? 10000 : 0;
        config["LevelID"] = baseID + levelData.ID;
        config["Result"] = result;

        //
        BIMng.getInstance().logEventEx("EndLevel", config, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logGameLevelFailBeforeWin: function(levelData)
    {
        var config = {};

        //
        var baseID = levelData.IS_SPACE_LEVEL ? 10000 : 0;
        config["LevelID"] = baseID + levelData.ID;

        //
        BIMng.getInstance().logEventEx("UnlockLevelFailed", config, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logMaxProcessLevel: function(levelData)
    {
        var config = {};

        //
        var baseID = levelData.IS_SPACE_LEVEL ? 10000 : 0;
        config["LevelID"] = baseID + levelData.ID;

        //
        BIMng.getInstance().logEventEx("UnlockNewLevel", config, true);

        return this;
    }

});

//======================================================================================================================
BI_Countly._instance = null;
BI_Countly.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new BI_Countly();
        this._instance.init();
    }

    return this._instance;
};