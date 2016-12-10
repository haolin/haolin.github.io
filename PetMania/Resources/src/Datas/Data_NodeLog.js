/*
var Data_NodeLog = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._deviceID = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._deviceID = cc.GameData.create("_deviceID", "", _DB_OP_GAME);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this._deviceID.set("");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getDeviceID: function()
    {
        return this._deviceID.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    save: function()
    {
        this._deviceID.save();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    load: function()
    {
        var self = this;

        //
        this._deviceID.load();
        cc.NodeLog.getInstance().configureDeviceID(this._deviceID.get());
        cc.log("Data_NodeLog load " + this + ", 有了内测设备唯一标识");

        if (this._deviceID.get() == "" && Defines.IS_CBT)
        {
            cc.NodeLog.getInstance().applyDeviceID(
                "chukong",
                function(result, deviceid)
                {
                    if (result)
                    {
                        cc.log("\n");cc.log("\n");cc.log("\n");
                        cc.log("deviceid = " + deviceid);

                        self._deviceID.set(deviceid.toString());
                        self._deviceID.save();
                        cc.NodeLog.getInstance().configureDeviceID(self._deviceID.get());

                        cc.log("Data_NodeLog 成功 " + self);
                        cc.log("\n");cc.log("\n");cc.log("\n");
                    }
                    else
                    {
                        cc.log("Data_NodeLog 失败");
                    }
                }
            );
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "this._deviceID = " + this._deviceID.get();
    }
});

Data_NodeLog.create = function()
{
    var createNew = new Data_NodeLog();
    createNew.init();
    return createNew;
};*/
