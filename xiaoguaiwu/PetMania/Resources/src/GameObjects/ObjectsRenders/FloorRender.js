//======================================================================================================================
var FloorRender = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(node)
    {
        this.m_Node = node;
        this.m_Sprite = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    getNode: function()
    {
        return this.m_Node;
    },

    //------------------------------------------------------------------------------------------------------------------
    createMySprite: function()
    {
        var frameName = "floor" + ((this.m_Node.getFloorCount() >= 2) ? "1.png" : "0.png");
        var newSprite = cc.Sprite.createWithSpriteFrameName(frameName);
        if (newSprite)
        {
            var batchNode = bottomObjBatchNode();
            if (batchNode)
            {
                newSprite.setVisible(false);
                batchNode.addChild(newSprite);
            }
        }

        return newSprite;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        if (this.m_Sprite)
        {
            this.m_Sprite.removeFromParent(true);
            this.m_Sprite = null;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getSprite: function()
    {
        this.m_Sprite = this.m_Sprite || this.createMySprite();
        return this.m_Sprite;
    },

    //------------------------------------------------------------------------------------------------------------------
    render: function()
    {
        if (this.getSprite())
        {
            this.getSprite().setVisible(true);
            this.updatePositionByNode();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updatePositionByNode: function()
    {
        if (this.getSprite())
        {
            this.getSprite().setPosition(this.getNode().getPosition());
        }

        return this;
    }
});