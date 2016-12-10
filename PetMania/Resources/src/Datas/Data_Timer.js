/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-9-26
 * Time: 下午5:39
 * Version: 1.0
 * Function: This file use to do...
 *//*


var Timer_0 = "Timer_0";

var Data_Timer = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_FinishTimer = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this.m_FinishTimer = cc.GameDataMap.create("m_FinishTimer", _DB_OP_GAME);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this.m_FinishTimer.set({});
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    resetTimer: function()
    {
        this.m_FinishTimer.setByKey("GameRunTimer", 0);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setTimer: function(Timer)
    {
        var value = this.m_FinishTimer.getByKey("GameRunTimer");
        if (!value)
        {
            this.resetTimer();
            value = this.m_FinishTimer.getByKey("GameRunTimer");
        }
        //
        this.m_FinishTimer.setByKey("GameRunTimer", Timer);
        this.save();

        //
        //cc.log("finishStory Data_Story = " + this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getGameRunTotalTime: function()
    {
        //cc.log("isStoryFinish Data_Story = " + this);
        var value = this.m_FinishTimer.getByKey("GameRunTimer");
        if (!value)
        {
            this.resetTimer();
            value = this.m_FinishTimer.getByKey("GameRunTimer");
        }
        return value;
    },

    //------------------------------------------------------------------------------------------------------------------
    save: function()
    {
        this.m_FinishTimer.save();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    load: function()
    {
        this.m_FinishTimer.load();
        //cc.log("Data_Story = " + this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        var res = "";

        var allStories = this.m_FinishTimer.get();

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
    addRunTimer : function  (runTimer)
    {
        if (!this.getGameRunTotalTime())
        {
            this.resetTimer();
        }

        var totalGameRunTimer = this.getGameRunTotalTime();
        totalGameRunTimer += runTimer;
        this.setTimer(totalGameRunTimer);
    },
    //------------------------------------------------------------------------------------------------------------------
    getItemList : function()
    {
        return this.m_FinishTimer;
    }
});

//
Data_Timer.create = function()
{
    var createNew = new Data_Timer();
    if (createNew)
    {
        createNew.init();
    }

    return createNew;
};
*/
