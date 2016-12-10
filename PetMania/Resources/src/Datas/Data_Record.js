//游戏的消费记录和物品记录的基础类

var Data_Record = cc.IObject.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        //
        this._super();

        //
        this._time = new safevar();     //创建时间
        this._roleId = new safevar();   //人物
        this._source = new safevar();   //原因 见MoneySource.js
        this._value = new safevar();    //数值：钱或者道具数量
        this._params = new safevar();   //额外参数
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Data_Record";
    },

    //------------------------------------------------------------------------------------------------------------------
    //初始化
    init: function(roleId, source, value, params)
    {
        //
        this._time.setValue(parseInt(_LocalTime()/1000));
        this._roleId.setValue(roleId);
        this._source.setValue(source);
        this._value.setValue(value);
        this._params.setValue(params || {});

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return this.serialize();
    },

    //------------------------------------------------------------------------------------------------------------------
    //序列化
    serialize : function()
    {
        var json = {
            'time' : this.getTime(),
            'roleid' : this.getRoleId(),
            'source' : this.getSource(),
            'value' : this.getValue(),
            'params' : this.getParams()
        };

        return JSON.stringify(json);
    },

    //------------------------------------------------------------------------------------------------------------------
    //反序列化
    deserialize: function(str)
    {
        var json = JSON.parse(str);
        if (!json)
        {
            return this;
        }

        var validJson = json.time && json.roleid && json.source && json.value;
        if (!validJson)
        {
            //cc.log("deserialize error = " + JSON.stringify(json));
        }

        //
        this._time.setValue(json.time);
        this._roleId.setValue(json.roleid);
        this._source.setValue(json.source);
        this._value.setValue(json.value);
        this._params.setValue(json.params);

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getTime: function()
    {
        return this._time.getValue();
    },

    //------------------------------------------------------------------------------------------------------------------
    getRoleId: function()
    {
        return this._roleId.getValue();
    },

    //------------------------------------------------------------------------------------------------------------------
    getSource: function()
    {
        return this._source.getValue();
    },

    //------------------------------------------------------------------------------------------------------------------
    getValue: function()
    {
        return this._value.getValue();
    },

    //------------------------------------------------------------------------------------------------------------------
    getParams: function()
    {
        return this._params.getValue();
    },

    //------------------------------------------------------------------------------------------------------------------
    setParams: function(setting)
    {
        this._params.setValue(setting);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //缩写，因为发往服务器，就要短点
    short: function()
    {
        var res = "" + this.getTime() + "," + this.getRoleId() + "," + this.getSource() + "," + this.getValue();

        //
        var realParams = this.getParams();
        var propertyArr = Object.keys(realParams).filter(
            function(pro)
            {
                return realParams.hasOwnProperty(pro);
            }
        ) || [];

        //
        propertyArr.forEach(
            function(property)
            {
                res += "," + realParams[property];
            }
        );

        return res;
    }
});

