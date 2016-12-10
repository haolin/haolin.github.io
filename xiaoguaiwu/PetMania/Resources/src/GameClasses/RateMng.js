
//======================================================================================================================
var RateMng = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._rated = null;
        this._shouldRate = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._rated = cc.GameDataBoolean.create("_rated", false, _DB_OP_GAME);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    load: function()
    {
        this._rated.load();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isValid: function()
    {
        //TODO AppStore的Facebook版
        var cdKeyEnabled = cc.DataMng.getInstance().isCDKeyEnabled();
        return isAppStoreWeiBo() && !this.isRated() && cdKeyEnabled;
    },

    //------------------------------------------------------------------------------------------------------------------
    setRated: function(setting)
    {
        setting ? this._rated.setFlag() : this._rated.resetFlag();
        this._rated.save();
        return this.isRated();
    },

    //------------------------------------------------------------------------------------------------------------------
    isRated: function()
    {
        return this._rated.getFlag();
    },

    //------------------------------------------------------------------------------------------------------------------
    shouldRate: function()
    {
		return false;
//        return this._shouldRate;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseRate: function()
    {
        //
        if (!this.isValid())
        {
            return this;
        }

        //
        if (!cc.GUIMapMng.getInstance().isNextLevelNew())
        {
            return this;
        }

        //
        var rateLevels = GUI._GetFirstLevelNamesOfZone();
        rateLevels.shift();
        rateLevels.unshift("LEVEL_13");

        //
        var maxLevelName = cc.DataMng.getInstance().getMaxProcessLevelKey();
        for (var index = 0; index < rateLevels.length; index++)
        {
            var rateLevel = rateLevels[index];
            if (rateLevel == maxLevelName)
            {
                cc.log("RateMng rateLevels = " + rateLevels);
                cc.log("RateMng rateLevel = " + rateLevel);
                this._shouldRate = true;
                break;
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    rate: function()
    {
        if (!this.isValid())
        {
            return this;
        }

        //
        var self = this;
        this._shouldRate = false;

        //
        var title = Resource.ChineseTxt["rate_title"];
        var message = Resource.ChineseTxt["rate_desc"];
        var btnNames = [
            Resource.ChineseTxt["rate_name_0"],
            Resource.ChineseTxt["rate_name_1"],
            Resource.ChineseTxt["rate_name_2"]
        ];

        //
        var rateFunc = function(buttonIndex)
        {
            //已评论
            if (buttonIndex == 0)
            {
                cc.log("Rate 已评论");
                var configClass = wrapperConfig.Config.getInstance();
                configClass.openURL(Defines.APPSTORE_URL);

                self.setRated(true);
            }
            //下次再说
            else if (buttonIndex == 1)
            {
                cc.log("Rate 下次再说");
            }
            //不再提示
            else
            {
                cc.log("Rate 不再提示");
                self.setRated(true);
            }

            return this;
        };

        //
        showDialogEx(title, message, JSON.stringify(btnNames), rateFunc);

        return this;
    }
});

//======================================================================================================================
RateMng._instance = null;
RateMng.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new RateMng();
        this._instance.init();
        this._instance.load();
    }

    return this._instance;
};