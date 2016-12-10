

//======================================================================================================================
var ItemRecord = Data_Record.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        //
        this._super();

        //
       /* this._time = new safevar();
        this._roleId = new safevar();
        this._source = new safevar();
        this._count = new safevar();
        this._params = new safevar();*/
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "ItemRecord";
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(roleId, source, count)
    {
        this._super(roleId, source, count);

        //
       /* this._time.setValue(parseInt(_LocalTime()/1000));
        this._roleId.setValue(roleId);
        this._source.setValue(source);
        this._count.setValue(count);
        this._params.setValue({});*/

        //
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
    /*toString: function()
    {
        return this.serialize();
    },

    //------------------------------------------------------------------------------------------------------------------
    serialize : function()
    {
        var json = {
            'time' : this.getTime(),
            'roleid' : this.getRoleId(),
            'source' : this.getSource(),
            'count' : this.getCount(),
            'params' : this.getParams()
        };

        return JSON.stringify(json);
    },*/

    //------------------------------------------------------------------------------------------------------------------
    /*deserialize: function(str)
    {
        var json = JSON.parse(str);
        if (!json)
        {
            return this;
        }

        var validJson = json.time && json.roleid && json.source && json.count;
        if (!validJson)
        {
            //return this;
        }

        //
        this._time.setValue(json.time);
        this._roleId.setValue(json.roleid);
        this._source.setValue(json.source);
        this._count.setValue(json.count);
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
    },*/

    //------------------------------------------------------------------------------------------------------------------
   /* getSource: function()
    {
        return this._source.getValue();
    },*/

    //------------------------------------------------------------------------------------------------------------------
   /* getCount: function()
    {
        return this._count.getValue();
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
    },*/

    //------------------------------------------------------------------------------------------------------------------
    /*short: function()
    {
        //
        var res = "" + this.getTime() + "," + this.getRoleId() + "," + this.getSource() + "," + this.getCount();

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
    }*/
});

//
ItemRecord.create = function(source, count)
{
    return (new ItemRecord()).init(cc.NodeSelf.getInstance().getLocalRoleID() || "", source, count);
};

//
ItemRecord.createByDeserialize = function(str)
{
    return (new ItemRecord()).deserialize(str);
};
