//空的块

cc.EmptyGrid = cc.IGrid.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(gridPos)
    {
        this._super(gridPos);
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "EmptyGrid";
    },

    //------------------------------------------------------------------------------------------------------------------
    getContent: function()
    {
        return this.getChildrenNodes()[0];
    },

    //------------------------------------------------------------------------------------------------------------------
    //是不是遮挡体
    isBlock: function()
    {
        var content = this.getContent();
        return content && content.isBlock();
    }
});

cc.EmptyGrid.create = function(gridPos)
{
    return new cc.EmptyGrid(gridPos);
};