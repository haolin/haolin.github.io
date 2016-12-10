/*
道具的封装
 */

//======================================================================================================================
var ItemPack = cc.IObject.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        //
        this._super();

        //道具
        this._items = {};

        //薄荷糖
        this._itemHeart = null;

        //
        this._itemRecordKey = "_itemRecordKey";
        this._itemRecord = [];

        //
        this._heartRecordKey = "_heartRecordKey";
        this._heartRecord = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "ItemPack";
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        var allDefines = Defines.GameItems;

        for (var itemDef in allDefines)
        {
            if (!allDefines.hasOwnProperty(itemDef))
            {
                continue;
            }

            //
            var newItem = Item.create(allDefines[itemDef]);
            this._items[newItem.getItemID()] = newItem;
        }

        //
        this._itemHeart = ItemHeart.create();

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getDB: function()
    {
        return _DB_OP_ITEM_RECORD;
    },

    //------------------------------------------------------------------------------------------------------------------
    save: function()
    {
        var array1 = [];
        this._heartRecord.forEach(
            function(record)
            {
                array1.push(record.serialize());
            }
        );

        this.getDB().save(this._heartRecordKey, array1);

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    load: function()
    {
        var self = this;

        //
        cc.log("背包载入____________________________________________________________________");

        //
        for (var itemID in this._items)
        {
            if (this._items.hasOwnProperty(itemID))
            {
                this._items[itemID].load();
            }
        }

        //
        cc.log("薄荷糖载入________________________________________________________________________");
        this._itemHeart.load();

        //
        cc.log("物品记录载入_______________________________________________________________________");

        //
        cc.log("薄荷糖记录载入_____________________________________________________________________");
        (this.getDB().load(this._heartRecordKey) || []).forEach(
            function(json, index)
            {
                //
                self._heartRecord.push(
                    ItemRecord.createByDeserialize(json)
                );
            }
        );

        //
        cc.log("_________________________________________________________________________________");
        this.logItems();
        this.logItemHeart();
        this.logRecord();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getItemByID: function(itemID)
    {
        return this._items[itemID];
    },

    //------------------------------------------------------------------------------------------------------------------
    getItemHeart: function()
    {
        return this._itemHeart;
    },

    //------------------------------------------------------------------------------------------------------------------
    logItems: function()
    {
        for (var itemID in this._items)
        {
            if (this._items.hasOwnProperty(itemID))
            {
                cc.log("" + this._items[itemID]);
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logItemHeart: function()
    {
        cc.log("薄荷糖数据 = " + this.getItemHeart());
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logRecord: function()
    {
        cc.log("薄荷糖数据记录______________________________________________________");
        this._heartRecord.forEach(
            function(record, index)
            {
                cc.log(index + ": " + record);
                cc.log(index + ": " + record.short());
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    restorePack: function()
    {
        cc.log("重置背包___________________________________________________________");

        //
        for (var itemID in this._items)
        {
            if (this._items.hasOwnProperty(itemID))
            {
                this._items[itemID].restore();
            }
        }

        //
        this.getItemHeart().restore();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addHeartRecord: function(newRecord)
    {
        //
        this._heartRecord.push(newRecord);
        cc.log("添加了薄荷糖记录 = " + (this._heartRecord.length - 1) + ": "+ newRecord.serialize());

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //同步数据
    async: function()
    {
        cc.log("物品背包同步数据 目前是清除");
        this._itemRecord = [];
        this._heartRecord = [];
        this.save();
        return this;
    }
});

//
ItemPack._instance = null;
ItemPack.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = (new ItemPack()).init();
    }

    return this._instance;
};
