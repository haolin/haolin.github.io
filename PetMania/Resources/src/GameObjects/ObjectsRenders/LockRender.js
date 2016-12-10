//======================================================================================================================
var LockRender = cc.Class.extend({

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
        //
        var newSprite = cc.Sprite.createWithSpriteFrameName("lock.png");

        //
        var batchNode = topObjBatchNode();
        if (batchNode)
        {
            newSprite.setVisible(false);
            batchNode.addChild(newSprite);
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

//======================================================================================================================
var StoneRender = LockRender.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(node)
    {
        this._super(node);
    },

    //------------------------------------------------------------------------------------------------------------------
    createMySprite: function()
    {
        //
        var newSprite = cc.Sprite.createWithSpriteFrameName("stone.png");

        //
        var batchNode = topObjBatchNode();
        if (batchNode)
        {
            newSprite.setVisible(false);
            batchNode.addChild(newSprite);
        }

        return newSprite;
    }
});

//======================================================================================================================
var IceRender = LockRender.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(node)
    {
        this._super(node);
    },

    //------------------------------------------------------------------------------------------------------------------
    createMySprite: function()
    {
        //
        var tmp = this.m_Node.getLocksCount() - 1;
        if (tmp < 0)
        {
            tmp = 0;
        }
        else if (tmp > 2)
        {
            tmp = 2;
        }

        //
        var frameName = "ice" + tmp + ".png";
        var newSprite = cc.Sprite.createWithSpriteFrameName(frameName);

        //
        var batchNode = topObjBatchNode();
        if (batchNode)
        {
            newSprite.setVisible(false);
            batchNode.addChild(newSprite);
        }

        return newSprite;
    }
});
