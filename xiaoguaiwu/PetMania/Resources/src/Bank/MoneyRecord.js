//钱的记录

var MoneyRecord = Data_Record.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "MoneyRecord";
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(roleId, source, value, params)
    {
        this._super(roleId, source, value, params);
        return this;
    }
});

//创建
MoneyRecord.create = function(source, value, params)
{
    return (new MoneyRecord()).init(
        cc.NodeSelf.getInstance().getLocalRoleID() || "",
        source,
        value,
        params);
};

//读档创建
MoneyRecord.createByDeserialize = function(str)
{
    return (new MoneyRecord()).deserialize(str);
};
