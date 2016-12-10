/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-10-9
 * Time: 下午2:57
 * Version: 1.0
 * Function: This file use to do...
 */

var CustomResult_0 = "Item_0";

var Data_CustomResult = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_CustomResult = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this.m_CustomResult = cc.GameDataMap.create("m_CustomResult", _DB_OP_GAME);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this.m_CustomResult.set({});
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    resetCustomData: function(customName)
    {
        var result = this.m_CustomResult.getByKey(customName);
        if (!result)
        {
            var customData = {
                CustomName : customName,
                CustomFailedCount : 0
            };

            this.m_CustomResult.setByKey(customName, customData);
        }
        else
        {
            result.CustomFailedCount = 0;
            this.m_CustomResult.setByKey(customName, result);
        }

        this.save();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addCustomData: function(customName)
    {
        var value = this.m_CustomResult.getByKey(customName);
        if (!value)
        {
            this.resetCustomData(customName);
            value = this.m_CustomResult.getByKey(customName);
        }
        value.CustomFailedCount++;
        //
        this.m_CustomResult.setByKey(customName, value);
        this.save();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getCustomValue: function(customName)
    {
        return this.m_CustomResult.getByKey(customName);
    },

    //------------------------------------------------------------------------------------------------------------------
    save: function()
    {
        this.m_CustomResult.save();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    load: function()
    {
        this.m_CustomResult.load();
        //cc.log("Data_Story = " + this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        var res = "";

        var allStories = this.m_CustomResult.get();

        for (var stroyName in allStories)
        {
            if (!allStories.hasOwnProperty(stroyName))
            {
                continue;
            }

            if (allStories[stroyName])
            {
                res += "(" + stroyName + " = " + allStories[stroyName].CustomName + ": Count = " + allStories[stroyName].CustomFailedCount + "), "
            }
        }

        return res;
    }
});

//
Data_CustomResult.create = function()
{
    var createNew = new Data_CustomResult();
    if (createNew)
    {
        createNew.init();
    }

    return createNew;
};

