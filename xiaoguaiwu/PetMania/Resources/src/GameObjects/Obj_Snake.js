
var TestSnake = 0;

//======================================================================================================================
var SnakeRender = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(node)
    {
        this.m_Node = node;

        if (!(this.getNode() instanceof cc.Obj_Snake))
        {
            cc.Assert(0, "SnakeRender 只能绘制 Obj_Snake !!!!!");
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
        var frameName = "";
        switch (this.getNode().getSnakeLevel())
        {
        case 1:
            frameName = Resource.snake_0_png;
            break;

        case 2:
            frameName = Resource.snake_1_png;
            break;

        case 3:
            frameName = Resource.snake_2_png;
            break;

        default:
            {
               cc.Assert(0, "frameName = " + frameName);
            }
            break;
        }

        var newSprite = cc.Sprite.create(frameName);//cc.Sprite.createWithSpriteFrameName(frameName);
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

//
SnakeRender.createSprite = function(color)
{
    if (!color || color == Defines.COLOR.NULL)
    {
        cc.Assert(0, "!color || color == Defines.COLOR.NULL  " + color);
    }

    return cc.Sprite.createWithSpriteFrameName(color.getName() + "_Wrap.png");
};

//======================================================================================================================
cc.Obj_Snake = cc.NormalObj.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(snakeLevel)
    {
        this._super(Defines.NORMAL_GRID_OBJ_LAYER.MIDDLE, Defines.GRID_OBJS_ZORDER.OBJ_MIDDLE);

        //
        this.m_SnakeLevel = snakeLevel;

        //将渲染部分分离出来
        this.m_MyRender = new SnakeRender(this);

        //锁住
        this.m_Lock = false;

        //
        this.m_SavePathNames = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    isNormalSnake: function()
    {
        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    getSavePathNames: function()
    {
        return this.m_SavePathNames;
    },

    //------------------------------------------------------------------------------------------------------------------
    isLocked: function()
    {
        return this.m_Lock;
    },

    //------------------------------------------------------------------------------------------------------------------
    lock: function()
    {
        this.m_Lock = true;
        return this.isLocked();
    },

    //------------------------------------------------------------------------------------------------------------------
    unlock: function()
    {
        this.m_Lock = false;
        return this.isLocked();
    },

    //------------------------------------------------------------------------------------------------------------------
    getRender: function()
    {
        return this.m_MyRender;
    },

    //------------------------------------------------------------------------------------------------------------------
    getSnakeLevel: function()
    {
        return this.m_SnakeLevel;
    },

    //------------------------------------------------------------------------------------------------------------------
    subSnakeLevel: function()
    {
        --this.m_SnakeLevel;
        if (this.m_SnakeLevel < 0)
        {
            this.m_SnakeLevel = 0;
        }

        return this.m_SnakeLevel;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_Snake";
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
    savePathNamesWhenDestroy: function()
    {
        var self = this;

        var parent = this.getParentNode();
        if (parent.getPathNode() instanceof cc.Obj_PipelinePathNode)
        {
            var pathName = parent.getPathNode().getPathName();
            if (pathName instanceof Array)
            {
                pathName.forEach(
                    function(a_name)
                    {
                        self.m_SavePathNames.push(a_name);
                    }
                );
            }
            else
            {
                this.m_SavePathNames.push(pathName);
            }
        }

        cc.log("m_SavePathNames = " + this.m_SavePathNames);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    destroy: function(desSrc, gameLevel, visitor)
    {
        //return this;

        this.savePathNamesWhenDestroy();

        if (visitor)
        {
            visitor.visit(this);
        }

        /*cc.DataMng.getInstance().recordDestroy*/_DiaryDestroyNodeObject(this);

        //
        if (this.subSnakeLevel() > 0)
        {
            this.m_MyRender.release();
            this.m_MyRender.render();
        }
        else
        {
            ++TestSnake;
            gameLevel.disposal(this);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //被通知销毁
    beNotifiedDestroy: function(/*notifySrc, gameLevel, visitor*/)
    {
        cc.Assert(0, "调用到这了就是错了");
        return this;
    }
});

//
cc.Obj_Snake.create = function(snakeLevel)
{
    //cc.log("生成等级为" + snakeLevel + "的蛇");

    var _snakeLevel = snakeLevel || 1;
    if (_snakeLevel < 1 || _snakeLevel > 4)
    {
        _snakeLevel = 1;
        cc.log("等级不对！！！！！ ＝ " + _snakeLevel);
    }

    return new cc.Obj_Snake(_snakeLevel);
};








