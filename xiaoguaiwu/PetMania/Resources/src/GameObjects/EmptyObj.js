
cc.EmptyObj = cc.INodeObject.extend({

    description: function()
    {
        return cc.EmptyObj.description();
    }
});

cc.EmptyObj.description = function()
{
    return "EmptyObj";
};

cc.EmptyObj.create = function()
{
    return new cc.EmptyObj();
};




