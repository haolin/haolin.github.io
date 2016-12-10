/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-9-25
 * Time: 下午6:09
 * Version: 1.0
 * Function: This file use to do...
 */

var Drama_0 = "Drama_0";

var Data_Drama = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_FinishDrama = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this.m_FinishDrama = cc.GameDataMap.create("m_FinishDrama", _DB_OP_GAME);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this.m_FinishDrama.set({});
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    resetDrama: function(stroyName)
    {
        this.m_FinishDrama.setByKey(stroyName, true);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finishDrama: function(stroyName)
    {
        //
        this.m_FinishDrama.setByKey(stroyName, true);
        this.save();

        //
        //cc.log("finishStory Data_Story = " + this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isDramaFinish: function(stroyName)
    {
        //cc.log("isStoryFinish Data_Story = " + this);
        return this.m_FinishDrama.getByKey(stroyName);
    },

    //------------------------------------------------------------------------------------------------------------------
    save: function()
    {
        this.m_FinishDrama.save();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    load: function()
    {
        this.m_FinishDrama.load();
        //cc.log("Data_Story = " + this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        var res = "";

        var allStories = this.m_FinishDrama.get();

        for (var stroyName in allStories)
        {
            if (!allStories.hasOwnProperty(stroyName))
            {
                continue;
            }

            if (allStories[stroyName])
            {
                res += "(" + stroyName + " = " + allStories[stroyName] + "), "
            }
        }

        return res;
    }
});

//
Data_Drama.create = function()
{
    var createNew = new Data_Drama();
    if (createNew)
    {
        createNew.init();
    }

    return createNew;
};
