/*

var Data_NodeSelf = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._nodeSelfConfigure = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._nodeSelfConfigure = cc.GameData.create("_nodeSelfConfigure", "", _DB_OP_GAME);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this._nodeSelfConfigure.set("");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    write: function()
    {
        cc.log("开始存储 = " + cc.NodeSelf.getInstance().serialize());
        this._nodeSelfConfigure.set(cc.NodeSelf.getInstance().serialize());

        //
        this.save();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    save: function()
    {
        cc.log("" + this);
        this._nodeSelfConfigure.save();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    load: function()
    {
        this._nodeSelfConfigure.load();
        cc.log("" + this);

        //
        var value = this._nodeSelfConfigure.get();
        if (value != "")
        {
            //第一次反序列化
            //cc.NodeSelf.getInstance().deserialize(this._nodeSelfConfigure.get());
            //cc.NodeSelf.getInstance().configure("", null, null);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        var value = this._nodeSelfConfigure.get();
        return "Data_NodeSelf = " + value;
    },

    //------------------------------------------------------------------------------------------------------------------
    check: function(loginSuccRoleId)
    {
        //
        var json = this.getJson();
        if (!json)
        {
            return {
                _diffRole: false,
                _isFirstBind: false
            };
        }

        //
        cc.log("json = " + JSON.stringify(json));
        var diffRole = (json.roleid != loginSuccRoleId);
        var isFirstBind = (json.roleid == "");

        //
        var res = {
            _diffRole: diffRole,
            _isFirstBind: isFirstBind
        };

        res.log = function()
        {
            //
            cc.log("从文件里读出来的 roleId = " + json.roleid);
            cc.log("登陆成功后的 roleId = " + loginSuccRoleId);

            //
            if (res._diffRole)
            {
                cc.log("登陆的roldId不一样!!!!!!!");
            }

            //
            if (res._isFirstBind)
            {
                cc.log("是第一次绑定此设备");
            }
        };

        res.log();
        return res;
    },

    //------------------------------------------------------------------------------------------------------------------
    isFirstBind: function()
    {
        var json = this.getJson();
        if (json)
        {
            return !json.roleid || json.roleid == "";
        }

        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    isDiffRole: function(loginSuccRoleId)
    {
        if (this.isFirstBind())
        {
            return true;
        }

        //
        var json = this.getJson();
        cc.log("json = " + JSON.stringify(json));
        return (json.roleid != loginSuccRoleId);
    },

    //------------------------------------------------------------------------------------------------------------------
    isEverLogin: function()
    {
        cc.log("json = " + this._nodeSelfConfigure.get());
        return this._nodeSelfConfigure.get() != "";
    },

    //------------------------------------------------------------------------------------------------------------------
    getJson: function()
    {
        var value = this._nodeSelfConfigure.get();
        return value != "" ? JSON.parse(value) : null;
    },

    //------------------------------------------------------------------------------------------------------------------
    getRoleId: function()
    {
        var json = this.getJson();
        return json && json.roleid ? json.roleid : "";
    },

    //------------------------------------------------------------------------------------------------------------------
    getToken: function()
    {
        var json = this.getJson();
        return json && json.token ? json.token : "";
    },

    //------------------------------------------------------------------------------------------------------------------
    getDeviceID: function()
    {
        var json = this.getJson();
        return json && json.deviceid ? json.deviceid : "";
    }
});

Data_NodeSelf.create = function()
{
    var createNew = new Data_NodeSelf();
    if (createNew)
    {
        createNew.init();
    }

    return createNew;
};*/
