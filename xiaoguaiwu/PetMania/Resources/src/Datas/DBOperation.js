//数据

//======================================================================================================================
cc.DBOperation = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_MyDBKey = "";
        this.m_MyDB = null;
        this.m_PrepareLoad = null;
        this.m_PrepareSave = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "DBOperation";
    },

    //------------------------------------------------------------------------------------------------------------------
    prepareLoad: function()
    {
        if (this.m_PrepareLoad)
        {
            cc.Assert(0);
        }

        this.m_PrepareLoad = this.m_MyDB.getValue();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    prepareLoadFinish: function()
    {
        if (!this.m_PrepareLoad)
        {
            cc.Assert(0);
        }

        this.m_PrepareLoad = null;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    prepareSave: function()
    {
        if (this.m_PrepareSave)
        {
            cc.Assert(0);
        }

        this.m_PrepareSave = this.m_MyDB.getValue();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    prepareSaveFinish: function()
    {
        if (this.m_PrepareSave)
        {
            this.m_MyDB.setValue(this.m_PrepareSave);
        }
        else
        {
            cc.Assert(0);
        }

        this.m_PrepareSave = null;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(dbKey)
    {
        //
        this.m_MyDBKey = dbKey;

        //
        var load = cc.SafeFile.getInstance().get(this.m_MyDBKey);
        load = load || {};

        //
        this.m_MyDB = new safevar();
        this.m_MyDB.setValue(load);

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    save: function(key, value)
    {
        if (!this.m_MyDB)
        {
            return this;
        }

        if (this.m_PrepareSave)
        {
            //cc.log(key + " = " + value);
            this.m_PrepareSave[key] = value;
            return this;
        }

        var val = this.m_MyDB.getValue();
        val[key] = value;
        this.m_MyDB.setValue(val);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    load: function(key)
    {
        if (this.m_PrepareLoad)
        {
            //cc.log(key + " = " + this.m_PrepareLoad[key]);
            return this.m_PrepareLoad[key];
        }

        return this.m_MyDB.getValue()[key];
    },

    //------------------------------------------------------------------------------------------------------------------
    toDB: function(log)
    {
        if (!this.m_MyDB)
        {
            return this;
        }

        var value = this.m_MyDB.getValue();
        cc.SafeFile.getInstance().set(this.m_MyDBKey, value);

        /*if (log)
        {
            for (var key in value)
            {
                if (value.hasOwnProperty(key))
                {
                    cc.log("toDB: " + "Key = " + key + " = " + value[key]);
                }
            }
        }*/

        return this;
    }
});

cc.DBOperation.create = function(dbKey)
{
    return new cc.DBOperation().init(dbKey);
};

//======================================================================================================================
var _DB_OP_GAME_LEVELS = null;//cc.DBOperation.create("_DB_OP_GAME_LEVELS");
var _DB_OP_GAME_ITEMS = null;//cc.DBOperation.create("_DB_OP_GAME_ITEMS");
var _DB_OP_GAME = null;//cc.DBOperation.create("_DB_OP_GAME");
var _DB_OP_ITEM_RECORD = null;//cc.DBOperation.create("_DB_OP_ITEM_RECORD");
var _DB_OP_MONEY_RECORD = null;//cc.DBOperation.create("_DB_OP_MONEY_RECORD");

//
var _InitAllDBOperations = function()
{
    cc.log("准备开始创建所有的 DBOperation");

    _DB_OP_GAME_LEVELS = _DB_OP_GAME_LEVELS || cc.DBOperation.create("_DB_OP_GAME_LEVELS");
    _DB_OP_GAME_ITEMS = _DB_OP_GAME_ITEMS || cc.DBOperation.create("_DB_OP_GAME_ITEMS");
    _DB_OP_GAME = _DB_OP_GAME || cc.DBOperation.create("_DB_OP_GAME");
    //_DB_OP_ITEM_RECORD = _DB_OP_ITEM_RECORD || cc.DBOperation.create("_DB_OP_ITEM_RECORD");
    //_DB_OP_MONEY_RECORD = _DB_OP_MONEY_RECORD || cc.DBOperation.create("_DB_OP_MONEY_RECORD");
};

var _SaveGame = function()
{
    var nowTime = Date.now();

    //
    cc.log("_SaveGame______________________________________________________________0");

    //
    cc.log("_SaveGame 数据准备");
    cc.SafeFile.getInstance().prepareBegin();

    cc.log("_SaveGame______________________________________________________________1 = " + (Date.now() - nowTime));
    nowTime = Date.now();

    //
    _InitAllDBOperations();

    //
    cc.log("_DB_OP_GAME_ITEMS 存储必存");
    _DB_OP_GAME_ITEMS.toDB();

    //
    cc.log("_DB_OP_GAME 存储必存");
    _DB_OP_GAME.toDB();

    if (!cc.GameManager.getInstance().isCurrentGameLevel())
    {
        //
        cc.log("_DB_OP_GAME_LEVELS 存储");
        _DB_OP_GAME_LEVELS.toDB();

        //
        //cc.log("_DB_OP_ITEM_RECORD 存储");
        //_DB_OP_ITEM_RECORD.toDB();

        //
        //cc.log("_DB_OP_MONEY_RECORD 存储");
        //_DB_OP_MONEY_RECORD.toDB();
    }

    //
    cc.log("_SaveGame______________________________________________________________2 = " + (Date.now() - nowTime));
    nowTime = Date.now();

    //
    cc.log("_SaveGame 数据关闭");
    cc.SafeFile.getInstance().prepareEnd();

    //
    cc.log("_SaveGame______________________________________________________________1 = " + (Date.now() - nowTime));
};





