
//======================================================================================================================
cc.Obj_BubbleCreator = cc.Obj_Bubble.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_BubbleCreator";
    },

    //------------------------------------------------------------------------------------------------------------------
    renderNode: function()
    {
        this.updateNodePosition();

        var parent = this.getParentNode();

        //
        var newRender = new BubbleCreatorRender(parent.getRender());
        parent.setRender(newRender);
        parent.renderNode();
        parent.updateNodePosition();

        return this;
    }
});

cc.Obj_BubbleCreator.create = function(coreMonster)
{
    //
    var children = coreMonster.getChildrenNodes().filter(
        function(child)
        {
            return child && child instanceof cc.Obj_BubbleCreator;
        }
    );

    //
    if (children.length <= 0)
    {
        var newBubble = new cc.Obj_BubbleCreator(coreMonster);
        coreMonster.addNode(newBubble);
    }

    return coreMonster;
};









