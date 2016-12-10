//======================================================================================================================
var PipePathNodeRender = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(node)
    {
        this.m_Node = node;

        if (!(this.m_Node instanceof cc.Obj_PipelinePathNode))
        {
            cc.Assert(0, "(!(this.m_Node instanceof cc.Obj_PipelinePathNode))");
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
        if (this.getNode().hasCreateEvent())
        {
            frameName =  Resource.food_png;
        }
        else if (this.getNode().hasFailedEvent())
        {
            frameName =  Resource.spiral_png;
        }
        else
        {
            //cc.log("没有事件");
        }

        if (frameName != "")
        {
            var newSprite = cc.Sprite.create(frameName);
            if (newSprite)
            {
                var batchNode = gameTableLayer();
                if (batchNode)
                {
                    newSprite.setVisible(false);
                    batchNode.addChild(newSprite, Defines.BATCH_NODE.OBJECTS_BOTTOM.Z);
                }

                if (this.getNode().hasFailedEvent())
                {
                    newSprite.runAction(cc.RepeatForever.create(cc.RotateBy.create(3, 360)));
                }
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

            //nodeID 测试渲染
           /* var nodeID = cc.LabelTTF.create(this.getNode(), Defines.DefaultFont, 10);
            _GUILayer().addChild(nodeID, 10000);
            nodeID.setPosition(this.getSprite().getPosition());*/
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
//======================================================================================================================
//======================================================================================================================
//======================================================================================================================
//======================================================================================================================
//======================================================================================================================

//======================================================================================================================
cc.Obj_PipelinePathNode = cc.NormalObj.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(pathName, nodeID, direction, createDirection)
    {
        this._super(Defines.NORMAL_GRID_OBJ_LAYER.BOTTOM, Defines.GRID_OBJS_ZORDER.OBJ_BOTTOM);

        //
        this._render = new PipePathNodeRender(this);

        //
        this._pathName = pathName;
        this._nodeID = nodeID;

        //
        this._direction = direction;
        this._createDirection = createDirection || Defines.DIRECTION.BOTTOM;

        //
        this._nodeEvents = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return this.description() + ":" + this.getNodeID();
    },

    //------------------------------------------------------------------------------------------------------------------
    addPathNodeEvent: function(event)
    {
        this._nodeEvents.push(event);
        return this._nodeEvents;
    },

    //------------------------------------------------------------------------------------------------------------------
    _hasEvent: function(eventName)
    {
        return this._nodeEvents.some(
            function(an_event)
            {
                return an_event.getEventName() == eventName;
            }
        );
    },

    //------------------------------------------------------------------------------------------------------------------
    hasCreateEvent: function()
    {
        return this._hasEvent(Property.Create);
    },

    //------------------------------------------------------------------------------------------------------------------
    hasFailedEvent: function()
    {
        return this._hasEvent(Property.Failed);
    },

    //------------------------------------------------------------------------------------------------------------------
    firePathNodeEvent: function()
    {
        var self = this;

        this._nodeEvents.forEach(
            function(an_evnt)
            {
                PipeAndSnakeGameEvent.getInstance().catchPathNodeEvent(self.getPathName(), an_evnt);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getPathNodeEvents: function()
    {
        return this._nodeEvents;
    },

    //------------------------------------------------------------------------------------------------------------------
    hasPathNodeEvents: function()
    {
        return this.getPathNodeEvents().length > 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    getCreateDirection: function()
    {
        return this._createDirection;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMoveDirection: function()
    {
        return this._direction;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return this.getPathName();
    },

    //------------------------------------------------------------------------------------------------------------------
    getPathName: function()
    {
        return this._pathName;
    },

    //------------------------------------------------------------------------------------------------------------------
    getNodeID: function()
    {
        return this._nodeID;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        this._super();

        if (this._render)
        {
            this._render.release();
            this._render = null;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createSprite: function()
    {
        return this._render ? this._render.createMySprite() : null;
    },

    //------------------------------------------------------------------------------------------------------------------
    renderNode: function()
    {
        return this._render ? this._render.render() : this;
    },

    //------------------------------------------------------------------------------------------------------------------
    destroy: function()
    {
        //永远不会被摧毁
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    beNotifiedDestroy: function()
    {
        //永远不会被摧毁
        return this;
    }
});

cc.Obj_PipelinePathNode.create = function(pathName, nodeID, direction, createDirection)
{
    return new cc.Obj_PipelinePathNode(
        (pathName || "piple"),
        (nodeID || 0),
        direction,
        createDirection
    );
};

//======================================================================================================================
//======================================================================================================================
//======================================================================================================================
//======================================================================================================================
//======================================================================================================================
//======================================================================================================================
//多项路点!!!!!!
cc.Obj_PipelineMutiPathNode = cc.Obj_PipelinePathNode.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(pathNames, nodeID, direction, createDirection)
    {
        this._super(pathNames, nodeID, direction, createDirection);
    },

    //------------------------------------------------------------------------------------------------------------------
    firePathNodeEvent: function()
    {
        var pathNames = this.getPathName();
        this._nodeEvents.forEach(
            function(an_evnt)
            {
                pathNames.forEach(
                    function(a_pathName)
                    {
                        cc.log("a_pathName = " + a_pathName);
                        PipeAndSnakeGameEvent.getInstance().catchPathNodeEvent(a_pathName, an_evnt);
                    }
                );
            }
        );

        return this;
    }
});

cc.Obj_PipelineMutiPathNode.create = function(pathNames, nodeID, direction, createDirection)
{
    if (!pathNames || pathNames.length <= 1)
    {
        cc.Assert(0, "");
    }

    return new cc.Obj_PipelineMutiPathNode(
        pathNames.concat(),
        (nodeID || 0),
        direction,
        createDirection
    );
};




