
//管道格子的渲染封装
var PipelineGridRender = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(node)
    {
        this.m_Node = node;

        //
        this.m_BackImage = null;
        this.m_GateImageFrom = null;
        this.m_GateImageTo = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        if (this.m_BackImage)
        {
            this.m_BackImage.removeFromParent(true);
            this.m_BackImage = null;
        }

        if (this.m_GateImageFrom)
        {
            this.m_GateImageFrom.removeFromParent(true);
            this.m_GateImageFrom = null;
        }

        if (this.m_GateImageTo)
        {
            this.m_GateImageTo.removeFromParent(true);
            this.m_GateImageTo = null;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    prepare: function()
    {
        if (!this.m_BackImage)
        {
            this.m_BackImage = this.createBackImage();
        }

        if (!this.m_GateImageFrom && this.m_Node.getTransFrom())
        {
            this.m_GateImageFrom = this.createGateImage(this.m_Node.getTransFrom(), true, false);
        }

        if (!this.m_GateImageTo && this.m_Node.getTransTo())
        {
            this.m_GateImageTo = this.createGateImage(this.m_Node.getTransTo(), false, true);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createGateImage: function(direction, from, to)
    {
        //
        var frameName = "gate_blue";
        frameName = from ? "gate_red" : frameName;

        var gateImage = cc.Sprite.createWithSpriteFrameName(frameName + "0.png");

        //
        var animation = cc.Animation.create(cc.ResourceMng.getInstance().getAnimationFrames(frameName), 1/20);//1/10);
        gateImage.runAction(
            cc.RepeatForever.create(
                cc.Animate.create(animation)
            ));

        switch (direction)
        {
        case Defines.DIRECTION.TOP:
            {
                gateImage.setScaleY(-1);
            }
            break;

        case Defines.DIRECTION.BOTTOM:
            {

            }
            break;

        case Defines.DIRECTION.LEFT:
            {
                gateImage.setRotation(90);

            }
            break;

        case Defines.DIRECTION.RIGHT:
            {
                gateImage.setRotation(-90);

            }
            break;

        default:
            {
                cc.Assert(0, "direction =  " + direction);
            }
            break;
        }

        return gateImage;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateGateImagePosition: function(gateImage, direction)
    {
        gateImage.setPosition(this.m_Node.getPosition());

        switch (direction)
        {
        case Defines.DIRECTION.TOP:
            {
                gateImage.setPositionY(gateImage.getPosition().y + 15);
            }
            break;

        case Defines.DIRECTION.BOTTOM:
            {
                gateImage.setPositionY(gateImage.getPosition().y - 15);
            }
            break;

        case Defines.DIRECTION.LEFT:
            {
                gateImage.setPositionX(gateImage.getPosition().x - 15);
            }
            break;

        case Defines.DIRECTION.RIGHT:
            {
                gateImage.setPositionX(gateImage.getPosition().x + 15);
            }
            break;

        default:
            {
                cc.Assert(0, "direction =  " + direction);
            }
            break;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createBackImage: function()
    {
        //
        var batchNode = gridBatchNodePipe();
        var texture = batchNode.getTexture();

        //
        var createNew = cc.Sprite.createWithTexture(
            texture,
            cc.rect(0, 0, texture.getContentSize().width, texture.getContentSize().height)
        );

        //
        if (Defines.TABLE_GRID_SIZE != texture.getContentSize().width)
        {
            createNew.setScale(Defines.TABLE_GRID_SIZE/texture.getContentSize().width);
        }

        //
        return createNew;
    },

    //------------------------------------------------------------------------------------------------------------------
    render: function()
    {
        this.prepare();

        if (this.m_BackImage)
        {
            var batchNode = gridBatchNodePipe();
            batchNode.addChild(this.m_BackImage, Defines.GRID_OBJS_ZORDER.BACK_IMG);
  
            //
            var showName = false;
            if (showName)
            {
                var nodeID = cc.LabelTTF.create(this.m_Node.getPathNode(), Defines.DefaultFont, 10 * Defines.BASE_SCALE);
                _GUILayer().addChild(nodeID, 10000);
                nodeID.setPosition(this.m_BackImage.getPosition());
            }
        }

        if (this.m_Node.getTransFrom())
        {
            objectGate().addChild(this.m_GateImageFrom);
        }

        if (this.m_Node.getTransTo())
        {
            objectGate().addChild(this.m_GateImageTo);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updatePositionByNode: function()
    {
        this.prepare();

        var nodePosition = this.m_Node.getPosition();

        //
        if (this.m_BackImage)
        {
            this.m_BackImage.setPosition(nodePosition);
        }

        if (this.m_GateImageFrom)
        {
            this.updateGateImagePosition(this.m_GateImageFrom, this.m_Node.getTransFrom());
        }

        if (this.m_GateImageTo)
        {
            this.updateGateImagePosition(this.m_GateImageTo, this.m_Node.getTransTo());
        }

        return this;
    }
});

//======================================================================================================================
//======================================================================================================================
//管道格子的类
cc.PipelineGrid = cc.NormalGrid.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(gridPos)
    {
        this._super(gridPos);

        //
        this.m_MyGridRender = new PipelineGridRender(this);

        //为了 多个路径准备的
        this.m_MutiPipePre = {};
        this.m_MutiPipeNext = {};

        //
        this.m_TransDirFrom = null;
        this.m_TransDirTo = null;

        //
        this.m_FactoryPool = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "PipelineGrid";
    },

    //------------------------------------------------------------------------------------------------------------------
    getSnakeObj: function()
    {
        return this.getMiddleObject();
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        var pathNode = this.getPathNode();
        if (!pathNode)
        {
            var gridPos = this.getGridPos();
            return "Empty " + this.description() + " = (" + gridPos.x + ", " + gridPos.y + ")";
        }

        return this.description() + ", " + pathNode;
    },

    //------------------------------------------------------------------------------------------------------------------
    isBlock: function()
    {
        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    destroy: function(desSrc, gameLevel, visitor)
    {
        for (var indx = 0; indx < Defines.NORMAL_GRID_OBJ_LAYER_ARRAY.length; ++indx)
        {
            var layerIndex = Defines.NORMAL_GRID_OBJ_LAYER_ARRAY[indx];
            var child = this.getChildrenNodes()[layerIndex];
            if (child && !(child instanceof cc.Obj_PipeFactory))
            {
                //反向遇到第一个可删除的就停掉
                //Top -> Bottom
                child.destroy(desSrc, gameLevel, visitor);
                break;
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getPipeFactory: function()
    {
        return this.getCeilObject();
    },

    //------------------------------------------------------------------------------------------------------------------
    addNodeToFactoryPool: function(newNode)
    {
        this.m_FactoryPool.push(newNode);
        newNode.setParentNode(this);
        return this.m_FactoryPool;
    },

    //------------------------------------------------------------------------------------------------------------------
    beNotifiedDestroy: function(desSrc, gameLevel, visitor)
    {
        //十字方向
        var isCrossDirection = (
            desSrc.getPosition().x == this.getPosition().x
            || desSrc.getPosition().y == this.getPosition().y);

        if (isCrossDirection)
        {
            this.destroy(desSrc, gameLevel, visitor);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setPipePre: function(pre, pathName)
    {
        if (pathName instanceof Array)
        {
            cc.Assert(0, "");
        }

        if (pathName)
        {
            this.m_MutiPipePre[pathName] = pre;
        }
        else
        {
            cc.Assert(0, "setPipePre");
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setPipeNext: function(next, pathName)
    {
        if (pathName instanceof Array)
        {
            cc.Assert(0, "");
        }

        if (pathName)
        {
            this.m_MutiPipeNext[pathName] = next;
        }
        else
        {
            cc.Assert(0, "setPipeNext");
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getPipePre: function(pathName)
    {
        if (!pathName)
        {
            cc.Assert(0, "getPipePre");
        }

        return this.m_MutiPipePre[pathName];
    },

    //------------------------------------------------------------------------------------------------------------------
    getPipeNext: function(pathName)
    {
        if (!pathName)
        {
            cc.Assert(0, "getPipePre");
        }

        return this.m_MutiPipeNext[pathName];
    },

    //------------------------------------------------------------------------------------------------------------------
    getPathNode: function()
    {
        return this.getBottomObject();
    },

    //------------------------------------------------------------------------------------------------------------------
    setTransFrom: function(direction)
    {
        this.m_TransDirFrom = direction;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setTransTo: function(direction)
    {
        this.m_TransDirTo = direction;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getTransFrom: function()
    {
        return this.m_TransDirFrom;
    },

    //------------------------------------------------------------------------------------------------------------------
    getTransTo: function()
    {
        return this.m_TransDirTo;
    },

    //------------------------------------------------------------------------------------------------------------------
    reverseTransDirection: function()
    {
        //cc.log("reverseTransDirection = " + this);

        var tmpDirection = this.m_TransDirFrom;
        this.m_TransDirFrom =  this.m_TransDirTo;
        this.m_TransDirTo = tmpDirection;

        //this.logAboutTrans();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleTake: function(/*pathName*/)
    {
        //
        for (var preName in this.m_MutiPipePre)
        {
            if (this.m_MutiPipePre.hasOwnProperty(preName))
            {
                var pre = this.getPipePre(preName);
                if (pre.getMiddleObject())
                {
                    pre.getMiddleObject().unlock();
                }
            }
        }

        //
        for (var nextName in this.m_MutiPipeNext)
        {
            if (this.m_MutiPipeNext.hasOwnProperty(nextName))
            {
                var next = this.getPipeNext(nextName);
                if (next.getMiddleObject())
                {
                    next.getMiddleObject().unlock();
                }
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logAboutTrans: function()
    {
        //
        cc.log("传送门信息 = " + this);
        cc.log("trans from = " + this.getTransFrom());
        cc.log("trans to = " + this.getTransTo());

        return this;
    }
});

cc.PipelineGrid.create = function(gridPos)
{
    return new cc.PipelineGrid(gridPos);
};