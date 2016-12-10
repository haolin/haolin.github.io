
var NormalGridRender = cc.Class.extend({

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

        if (!this.m_GateImageFrom && this.m_Node.isConnectFrom())
        {
            this.m_GateImageFrom = this.createGateImage(false);
        }

        if (!this.m_GateImageTo && this.m_Node.isConnectTo())
        {
            this.m_GateImageTo = this.createGateImage(true);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getBackImage: function()
    {
        return this.m_BackImage;
    },

    //------------------------------------------------------------------------------------------------------------------
    createBackImage: function()
    {
        //
        var batchNode = gridBatchNode();
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

        return createNew;
    },

    //------------------------------------------------------------------------------------------------------------------
    createGateImage: function(isTo)
    {
        var gateImage = cc.Sprite.createWithSpriteFrameName("gate_nor0.png");

        //
        var animation = cc.Animation.create(cc.ResourceMng.getInstance().getAnimationFrames("gate_nor"), 1/20);//1/10);
        gateImage.runAction(
            cc.RepeatForever.create(
                cc.Animate.create(animation)
            ));

        if (isTo)
        {
            gateImage.setScaleY(-1);
        }

        return gateImage;
    },

    //------------------------------------------------------------------------------------------------------------------
    render: function()
    {
        this.prepare();

        if (this.m_BackImage)
        {
            var batchNode = gridBatchNode();
            batchNode.addChild(this.m_BackImage, Defines.GRID_OBJS_ZORDER.BACK_IMG);
        }

        if (this.m_GateImageFrom)
        {
            objectGate().addChild(this.m_GateImageFrom);
        }

        if (this.m_GateImageTo)
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

        var gateImgPosOff = Defines.TABLE_GRID_SIZE * 0.2;

        if (this.m_GateImageFrom)
        {
            this.m_GateImageFrom.setPosition(cc.p(nodePosition.x, nodePosition.y - gateImgPosOff));
        }

        if (this.m_GateImageTo)
        {
            this.m_GateImageTo.setPosition(cc.p(nodePosition.x, nodePosition.y + gateImgPosOff));
        }

        return this;
    }

});

cc.NormalGrid = cc.IGrid.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(gridPos)
    {
        this._super(gridPos);

        this.m_IsBlock = false;
        this.m_ConnectFrom = false;
        this.m_ConnectTo = false;

        //
        this.m_MyGridRender = new NormalGridRender(this);
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        this._super();

        if (this.m_MyGridRender)
        {
            this.m_MyGridRender.release();
            this.m_MyGridRender = null;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "NormalGrid";
    },

    //------------------------------------------------------------------------------------------------------------------
    setConnectFrom: function(setting)
    {
        this.m_ConnectFrom = setting;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isConnectFrom: function()
    {
        return this.m_ConnectFrom;
    },

    //------------------------------------------------------------------------------------------------------------------
    setConnectTo: function(setting)
    {
        this.m_ConnectTo = setting;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isConnectTo: function()
    {
        return this.m_ConnectTo;
    },

    //------------------------------------------------------------------------------------------------------------------
    addNode: function(add)
    {
        if (!add)
        {
            return this;
        }

        //
        var layerIndx = add.getGridLayerIndx();

        var old = this.getChildrenNodes()[layerIndx];
        if (old)
        {
            //走到这里应该就是错了
            old.release();
            this.m_ChildrenNodes[layerIndx] = null;
            cc.log("Error : the grid should not hava child in this zOrder = " + this);
        }

        this.m_ChildrenNodes[layerIndx] = add;
        add.setParentNode(this);

        //
        this.updateBlock();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    removeNode: function(node)
    {
        if (!node)
        {
            return this;
        }

        for (var indx = 0; indx < this.getChildrenNodes().length; ++indx)
        {
            if (this.getChildrenNodes()[indx] == node)
            {
                node.setParentNode(null);
                this.m_ChildrenNodes[indx] = null;
                break;
            }
        }

        //
        this.updateBlock();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //返回触摸的对象
    getTouchEnabledObject: function()
    {
        if (this.isBlock() || this.isLockTouch())
        {
            return null;
        }

        var touchedObj = this.getMiddleObject();
        if (!touchedObj || !touchedObj.canTouch())
        {
            //不能touch的 就返回null
            return null;
        }

        return touchedObj;
    },

    //------------------------------------------------------------------------------------------------------------------
    //是不是遮挡体
    updateBlock: function()
    {
        //
        var array = this.getChildrenNodes().filter(
            function(node)
            {
                return node && node.isBlock();
            }
        );

        this.m_IsBlock = array && array.length > 0;
        return this.m_IsBlock;
    },

    //------------------------------------------------------------------------------------------------------------------
    //是不是遮挡体
    isBlock: function()
    {
        return this.m_IsBlock;
    },

    //------------------------------------------------------------------------------------------------------------------
    getBottomObject: function()
    {
        return this.getChildrenNodes()[Defines.NORMAL_GRID_OBJ_LAYER.BOTTOM];
    },

    //------------------------------------------------------------------------------------------------------------------
    getMiddleObject: function()
    {
        return this.getChildrenNodes()[Defines.NORMAL_GRID_OBJ_LAYER.MIDDLE];
    },

    //------------------------------------------------------------------------------------------------------------------
    getTopObject: function()
    {
        return this.getChildrenNodes()[Defines.NORMAL_GRID_OBJ_LAYER.TOP];
    },

    //------------------------------------------------------------------------------------------------------------------
    getCeilObject: function()
    {
        return this.getChildrenNodes()[Defines.NORMAL_GRID_OBJ_LAYER.CEIL];
    },

    //------------------------------------------------------------------------------------------------------------------
    beNotifiedDestroy: function(desSrc, gameLevel, visitor)
    {
        var self = this;

        //通知其他的人
        var ceil = this.getChildrenNodes()[Defines.NORMAL_GRID_OBJ_LAYER.CEIL];
        if (ceil)
        {
            ceil.beNotifiedDestroy(desSrc, gameLevel, visitor);
            return this;
        }

        //通知其他的人
        var top = this.getChildrenNodes()[Defines.NORMAL_GRID_OBJ_LAYER.TOP];
        if (top)
        {
            top.beNotifiedDestroy(desSrc, gameLevel, visitor);
            return this;
        }

        var middle = this.getChildrenNodes()[Defines.NORMAL_GRID_OBJ_LAYER.MIDDLE];
        if (middle)
        {
            middle.beNotifiedDestroy(desSrc, gameLevel, visitor);
        }

        var bottom = this.getChildrenNodes()[Defines.NORMAL_GRID_OBJ_LAYER.BOTTOM];
        if (bottom)
        {
            bottom.beNotifiedDestroy(desSrc, gameLevel, visitor);
        }

        if (desSrc.getGridLayerIndx() != Defines.NORMAL_GRID_OBJ_LAYER.MIDDLE)
        {
            //只有中间层 的东西 销毁了 才会通知邻居的格子
            return this;
        }

        //
        var notifyRadius = Defines.LOW_PERFORMANCE ? Defines.DIRECTION.CROSS.concat() : Defines.DIRECTION.CIRCLE.concat();
        notifyRadius.forEach(
            function(dir)
            {
                var otherGrid = self.getGridByDirection(dir);
                if (!otherGrid || !(otherGrid instanceof cc.NormalGrid))
                {
                    return;
                }

                if (otherGrid instanceof cc.PipelineGrid)
                {
                    otherGrid.beNotifiedDestroy(desSrc, gameLevel, visitor);
                    return;
                }

                var hisChildren = otherGrid.getChildrenNodes();
                if (hisChildren.length <= 0)
                {
                    return;
                }

                for (var indx = Defines.NORMAL_GRID_OBJ_LAYER.CEIL; indx >= Defines.NORMAL_GRID_OBJ_LAYER.BOTTOM; --indx)
                {
                    var child = hisChildren[indx];
                    if (child)
                    {
                        child.beNotifiedDestroy(desSrc, gameLevel, visitor);
                        break;
                    }
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //销毁
    destroy: function(desSrc, gameLevel, visitor , param_1, param_2)
    {
        for (var indx = 0; indx < Defines.NORMAL_GRID_OBJ_LAYER_ARRAY.length; ++indx)
        {
            var layerIndex = Defines.NORMAL_GRID_OBJ_LAYER_ARRAY[indx];
            var child = this.getChildrenNodes()[layerIndex];
            if (child)
            {
                //反向遇到第一个可删除的就停掉
                //Top -> Bottom
				if (child && child.description() == "Obj_MonsterDiamond"){
					child.destroy(desSrc, gameLevel, visitor , param_1, param_2);
				}
				else {
					child.destroy(desSrc, gameLevel, visitor);
				}
                
                break;
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //更新位置
    updateNodePosition: function()
    {
        this._super();
        this.m_MyGridRender.updatePositionByNode(this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //添加给layer
    renderNode: function()
    {
        this._super();

        if (this.m_MyGridRender)
        {
            this.m_MyGridRender.render(this);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //添加给layer
    setRenderColor: function(color)
    {
        if (!this.m_MyGridRender || !this.m_MyGridRender.getBackImage())
        {
            return this;
        }

        if (color)
        {
            this.m_MyGridRender.getBackImage().setColor(color);
        }
        else
        {
            this.m_MyGridRender.getBackImage().setColor(cc.c3b(255, 255, 255));
        }

        return this;
    }
});

cc.NormalGrid.create = function(gridPos)
{
    return new cc.NormalGrid(gridPos);
};