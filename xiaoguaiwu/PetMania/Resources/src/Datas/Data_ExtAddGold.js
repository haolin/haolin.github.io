/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-9-26
 * Time: 下午9:52
 * Version: 1.0
 * Function: This file use to do...
 */
/*

var ExtAddGold_0 = "ExtAddGold_0";

var Data_ExtAddGold = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_FinishAddGold = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this.m_FinishAddGold = cc.GameDataMap.create("m_FinishAddGold", _DB_OP_GAME);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this.m_FinishAddGold.set({});
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    resetTimer: function()
    {
        var addData = {
            AddGold : 0,
            AddTime : 0
        };
        this.m_FinishAddGold.setByKey("GameAddGold", addData);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setAddGold: function(Timer)
    {
        var value = this.m_FinishAddGold.getByKey("GameAddGold");
        if (!value)
        {
            this.resetTimer();
            value = this.m_FinishAddGold.getByKey("GameAddGold");
        }

        value.AddGold = Timer.AddGold;
        value.AddTime = Timer.AddTime;
        //
        this.m_FinishAddGold.setByKey("GameAddGold", value);
        this.save();

        //
        //cc.log("finishStory Data_Story = " + this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getGameTotalAddGold: function()
    {
        //cc.log("isStoryFinish Data_Story = " + this);
        var value = this.m_FinishAddGold.getByKey("GameAddGold");
        if (!value)
        {
            this.resetTimer();
            value = this.m_FinishAddGold.getByKey("GameAddGold");
        }
        return value;
    },

    //------------------------------------------------------------------------------------------------------------------
    save: function()
    {
        this.m_FinishAddGold.save();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    load: function()
    {
        this.m_FinishAddGold.load();
        //cc.log("Data_Story = " + this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        var res = "";

        var allStories = this.m_FinishAddGold.get();

        for (var stroyName in allStories)
        {
            if (!allStories.hasOwnProperty(stroyName))
            {
                continue;
            }

            if (allStories[stroyName])
            {
                res += "(" + stroyName + " = " + allStories[stroyName] +  "), "
            }
        }

        return res;
    },

    //------------------------------------------------------------------------------------------------------------------
    addAddGold : function  (runTimer,localTime)
    {
        if (!this.getGameTotalAddGold())
        {
            this.resetTimer();
        }

        var totalGameRunTimer = this.getGameTotalAddGold();
        totalGameRunTimer.AddGold += runTimer;
        totalGameRunTimer.AddTime = localTime;

//        this.m_FinishAddGold.setByKey("GameAddGold", totalGameRunTimer);
//        this.save();
        this.setAddGold(totalGameRunTimer);
    }
});

//
Data_ExtAddGold.create = function()
{
    var createNew = new Data_ExtAddGold();
    if (createNew)
    {
        createNew.init();
    }

    return createNew;
};*/
