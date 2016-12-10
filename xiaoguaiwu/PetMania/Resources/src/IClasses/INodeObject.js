//节点管理和基础游戏对象

//======================================================================================================================
cc.INodeObject = cc.IObject.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        this.m_ObjectID = cc.INodeObject.generateObjectID();

        //
        this.m_ParentNode = null;
        this.m_ChildrenNodes = [];
        this.m_Position = cc.p(0, 0);
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "INodeObject";
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getObjectID: function()
    {
        return this.m_ObjectID;
    },

    //------------------------------------------------------------------------------------------------------------------
    setParentNode: function(parent)
    {
        this.m_ParentNode = parent;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getParentNode: function()
    {
        return this.m_ParentNode;
    },

    //------------------------------------------------------------------------------------------------------------------
    getChildrenNodes: function()
    {
        return this.m_ChildrenNodes;
    },

    //------------------------------------------------------------------------------------------------------------------
    hasAnyChildrenNodes: function()
    {
        return this.getChildrenNodes().length > 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    setPosition: function(pos)
    {
        this.m_Position = cc.p(pos.x, pos.y);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getPosition: function()
    {
        return cc.p(this.m_Position.x, this.m_Position.y);
    },

    //------------------------------------------------------------------------------------------------------------------
    addNode: function(node)
    {
        if (node.getParentNode())
        {
            cc.log("!!!!!" + node.getParentNode());
        }

        this.m_ChildrenNodes.push(node);
        node.setParentNode(this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    removeNode: function(node)
    {
        for (var indx = 0; indx < this.getChildrenNodes().length; ++indx)
        {
            if (this.getChildrenNodes()[indx] == node)
            {
                node.setParentNode(null);
                this.m_ChildrenNodes.splice(indx, 1);
                break;
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    removeFromParentNode: function()
    {
        var parent = this.getParentNode();
        if (parent)
        {
            parent.removeNode(this);
        }

        return parent;
    },

    //------------------------------------------------------------------------------------------------------------------
    //是不是遮挡体?
    isBlock: function()
    {
        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateNodePosition: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    renderNode: function()
    {
        return this;
    }

});

//全局的id
cc.INodeObject._INodeObjectID = 0;
cc.INodeObject.generateObjectID = function()
{
    return cc.INodeObject._INodeObjectID++;
};



