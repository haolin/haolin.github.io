/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-9-26
 * Time: 下午3:02
 * Version: 1.0
 * Function: This file use to do...
 *//*


var Item_0 = "Item_0";

var Data_Item = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_FinishItem = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this.m_FinishItem = cc.GameDataMap.create("m_FinishItem", _DB_OP_GAME);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this.m_FinishItem.set({});
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    resetItem: function(stroyName)
    {
        var itemData = {
            ItemName : stroyName,
            ItemCount : 0
        };

        this.m_FinishItem.setByKey(stroyName, itemData);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addItem: function(stroyName)
    {
        var value = this.m_FinishItem.getByKey(stroyName);
        if (!value)
        {
            this.resetItem(stroyName);
            value = this.m_FinishItem.getByKey(stroyName);
        }
        value.ItemCount++;
        //
        this.m_FinishItem.setByKey(stroyName, value);
        this.save();

        //
        //cc.log("finishStory Data_Story = " + this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getItemValue: function(stroyName)
    {
        //cc.log("isStoryFinish Data_Story = " + this);
        return this.m_FinishItem.getByKey(stroyName);
    },

    //------------------------------------------------------------------------------------------------------------------
    save: function()
    {
        this.m_FinishItem.save();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    load: function()
    {
        this.m_FinishItem.load();
        //cc.log("Data_Story = " + this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        var res = "";

        var allStories = this.m_FinishItem.get();

        for (var stroyName in allStories)
        {
            if (!allStories.hasOwnProperty(stroyName))
            {
                continue;
            }

            if (allStories[stroyName])
            {
                res += "(" + stroyName + " = " + allStories[stroyName].ItemName + ": Count = " + allStories[stroyName].ItemCount + "), "
            }
        }

        return res;
    },

    //------------------------------------------------------------------------------------------------------------------
    addItemCount : function(itemName)
    {
        var self = this;
        var valueObject = self.getItemValue(itemName);
        if (valueObject)
        {
            self.addItem(itemName);
        }
        else
        {
            self.resetItem(itemName);
        }
    },

    //------------------------------------------------------------------------------------------------------------------
    getItemCount : function(itemName)
    {
        for (var a_item in this.m_FinishItem)
        {
            if (!this.m_FinishItem.hasOwnProperty(a_item))
            {
                return 0;
            }

            return a_item.ItemCount;
        }

        return 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    getItemList : function()
    {
        return this.m_FinishItem;
    }
});

//
Data_Item.create = function()
{
    var createNew = new Data_Item();
    if (createNew)
    {
        createNew.init();
    }

    return createNew;
};
*/
