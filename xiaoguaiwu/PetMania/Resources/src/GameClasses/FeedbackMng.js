
//======================================================================================================================
var FeedbackMng = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    isValid: function()
    {
        return Defines.PLATFORM.isMobile();
    },

    //------------------------------------------------------------------------------------------------------------------
    _formatMaxLevel: function()
    {
        var maxLevelData = cc.DataMng.getInstance().getMaxProcessLevelData();
        var maxLevelID = maxLevelData.ID + 1;
        var formatMax = maxLevelID < 10 ? "0" + maxLevelID : "" + maxLevelID;

        if (maxLevelData.IS_SPACE_LEVEL)
        {
            return "s" + formatMax;
        }

        return maxLevelID < 100 ? "0" + formatMax : "" + formatMax;
    },

    //------------------------------------------------------------------------------------------------------------------
    _getSubject: function()
    {
        var formatDate = Tools.formatDate("yyyyMMdd");
        var formatLevel = this._formatMaxLevel();
        var formatDiamond = cc.NodeHelper.getInstance().getRoleConsumptionDiamondLevel();
        var serialNumber = formatDate + formatLevel + formatDiamond;
        return Resource.ChineseTxt["feedback_subject"] + serialNumber;
    },

    //------------------------------------------------------------------------------------------------------------------
    _getContent: function()
    {
        var content_0 = "Hi!";
        var content_1 = "";
        var content_2 = Resource.ChineseTxt["feedback_content_1"];

        //TODO: 分用户系统加载名称
        if (cc.NodeSelf.getInstance().isLogin())
        {
            if (_IsWeibo() && g_player.name && g_player.name != "")
            {
                content_1 = Resource.ChineseTxt["feedback_content_0"] + g_player.name + "，";
            }
        }

        return content_0 + content_1 + content_2;
    },

    //------------------------------------------------------------------------------------------------------------------
    feedback: function()
    {
        if (!this.isValid())
        {
            return this;
        }

        //
        var subject = this._getSubject();
        var content = this._getContent();

        cc.log("FeedbackMng subject = " + subject);
        cc.log("FeedbackMng content = " + content);

        //
        sendMails(Defines.FBURL , subject , content);

        return this;
    }
});

//======================================================================================================================
FeedbackMng._instance = null;
FeedbackMng.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new FeedbackMng();
    }

    return this._instance;
};