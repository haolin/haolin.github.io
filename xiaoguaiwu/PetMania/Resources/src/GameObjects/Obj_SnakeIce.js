//Obj_SnakeIce
//======================================================================================================================
var SnakeIceRender = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(node)
    {
        this.m_Node = node;

        if (!(this.getNode() instanceof cc.Obj_SnakeIce))
        {
            cc.Assert(0, "SnakeIceRender 只能绘制 Obj_SnakeIce !!!!!");
        }

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
        if (this.getNode().getSnakeLevel() < 1)
        {
            cc.Assert(0, "this.getNode().getSnakeLevel() = " + this.getNode().getSnakeLevel());
        }

        var frameName = this.getNode().getSnakeLevel() - 1;

        var newSprite = cc.Sprite.createWithSpriteFrameName("ice" + frameName + ".png");
        objectsNode().addChild(newSprite);
        newSprite.setPosition(this.getNode().getPosition());

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
cc.Obj_SnakeIce = cc.Obj_Snake.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(iceCount)
    {
        //等级为0
        this._super(iceCount);

        //将渲染部分分离出来
        this.m_MyRender = new SnakeIceRender(this);
    },

    //------------------------------------------------------------------------------------------------------------------
    isNormalSnake: function()
    {
        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    isLocked: function()
    {
        return this.getIceCount() > 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    getIceCount: function()
    {
        return this.getSnakeLevel();
    },

    //------------------------------------------------------------------------------------------------------------------
    getRender: function()
    {
        return this.m_MyRender;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_SnakeIce";
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        var parent = this.getParentNode();
        if (parent)
        {
            var gridPos = parent.getGridPos();
            return this.description() + "(" + gridPos.x + ", " + gridPos.y + ") ";
        }

        return this.description();
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        this._super();

        //
        if (this.m_MyRender)
        {
            this.m_MyRender.release();
            this.m_MyRender = null;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //拿精灵
    getSprite: function()
    {
        return this.getRender() ? this.getRender().getSprite() : null;
    },

    //------------------------------------------------------------------------------------------------------------------
    createSprite: function()
    {
        return this.getRender() ? this.getRender().createMySprite() : null;
    },

    //------------------------------------------------------------------------------------------------------------------
    renderNode: function()
    {
        this._super();

        if (this.getRender())
        {
            this.getRender().render();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //更新位置
    updateNodePosition: function()
    {
        this._super();

        //
        if (this.getRender())
        {
            this.getRender().updatePositionByNode();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    snakeBreakIce: function(gameLevel)
    {
        //
        if (this.subSnakeLevel() > 0)
        {
            this.m_MyRender.release();
            this.m_MyRender.render();
        }
        else
        {
            gameLevel.disposal(this);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    destroy: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    beNotifiedDestroy: function()
    {
        return this;
    }
});

//
cc.Obj_SnakeIce.create = function(iceCount)
{
    var _iceCount = iceCount;
    if (_iceCount > 3)
    {
        _iceCount = 3;
    }
    else if (_iceCount < 1)
    {
        _iceCount = 1;
    }

    return new cc.Obj_SnakeIce(_iceCount);
};








