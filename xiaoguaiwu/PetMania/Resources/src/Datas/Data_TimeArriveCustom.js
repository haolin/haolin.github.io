/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-9-26
 * Time: 下午6:39
 * Version: 1.0
 * Function: This file use to do...
 *//*

var TimeArriveCustom_0 = "TimerArriveCustom_0";

var Data_TimeArriveCustom = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_FinishTimerArriveCustom = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this.m_FinishTimerArriveCustom = cc.GameDataMap.create("m_FinishTimerArriveCustom", _DB_OP_GAME);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this.m_FinishTimerArriveCustom.set({});
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    resetArriveCustom: function(customName,time)
    {
        var CustomTime = {
            CustomName : customName,
            CustomTime : time
        };

        this.m_FinishTimerArriveCustom.setByKey(customName, CustomTime);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setArriveCustom: function(customName,time)
    {
        var CustomTime = {
            CustomName : customName,
            CustomTime : time
        };

        cc.log("custom name : " + CustomTime.CustomName + " custom time : " + CustomTime.CustomTime);
        this.m_FinishTimerArriveCustom.setByKey(customName, CustomTime);

//        var value = this.m_FinishTimerArriveCustom.getByKey("GameTimerArriveCustom");
//        if (!value)
//        {
//            this.resetArriveCustom();
//            value = this.m_FinishTimerArriveCustom.getByKey("GameTimerArriveCustom");
//        }
//        //
//        this.m_FinishTimerArriveCustom.setByKey("GameTimerArriveCustom", Timer);
        this.save();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getGameTimeArriveCustom: function(customName)
    {
        var value = this.m_FinishTimerArriveCustom.getByKey(customName);
        return value;
    },

    //------------------------------------------------------------------------------------------------------------------
    save: function()
    {
        this.m_FinishTimerArriveCustom.save();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    load: function()
    {
        this.m_FinishTimerArriveCustom.load();
        //cc.log("Data_Story = " + this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        var res = "";

        var allStories = this.m_FinishTimerArriveCustom.get();

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
    setArriveCustomTime : function  (runCustom,runTimer)
    {
//        var totalGameRunTimer = this.getGameTimeArriveCustom();
//        totalGameRunTimer += runTimer;
        this.setArriveCustom(runCustom,runTimer);
    },
    //------------------------------------------------------------------------------------------------------------------
    getItemList : function()
    {
        return this.m_FinishTimerArriveCustom;
    }
});

//
Data_TimeArriveCustom.create = function()
{
    var createNew = new Data_TimeArriveCustom();
    if (createNew)
    {
        createNew.init();
    }

    return createNew;
};

*/
