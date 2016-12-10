
//======================================================================================================================
cc.Obj_Bubble = cc.INodeObject.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_Bubble";
    },

    //------------------------------------------------------------------------------------------------------------------
    updateNodePosition: function()
    {
        if (this.getParentNode())
        {
            this.setPosition(this.getParentNode().getPosition());
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setParentNode: function(parent)
    {
        this._super(parent);

        this.updateNodePosition();

        //
        if (this.getParentNode())
        {
            //改变父节点的渲染方法
            this.renderNode();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    renderNode: function()
    {
        //我的渲染的实现
        this.updateNodePosition();

        var parent = this.getParentNode();

        //
        var newRender = new BubbleRender(parent.getRender());
        parent.setRender(newRender);
        parent.renderNode();
        parent.updateNodePosition();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    destroy: function(desSrc, gameLevel, visitor)
    {
        if (visitor)
        {
            visitor.visit(this);
            /*cc.DataMng.getInstance().recordDestroy*/_DiaryDestroyNodeObject(this);
        }

        //先更新一下 为了做爆炸效果
        this.updateNodePosition();

        //父节点 还原回老的渲染方式
        var parent = this.removeFromParentNode();

        //
        parent.setRender(parent.getRender().popRender());
        parent.getRender().release();
        parent.renderNode();
        parent.updateNodePosition();

        return true;
    }
});

cc.Obj_Bubble.create = function(coreMonster)
{
    //
    var children = coreMonster.getChildrenNodes().filter(
        function(child)
        {
            return child && child instanceof cc.Obj_Bubble;
        }
    );

    //
    if (children.length <= 0)
    {
        var newBubble = new cc.Obj_Bubble(coreMonster);
        coreMonster.addNode(newBubble);
    }

    return coreMonster;
};









