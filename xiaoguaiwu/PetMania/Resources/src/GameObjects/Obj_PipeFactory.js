

//======================================================================================================================
cc.Obj_PipeFactory = cc.NormalObj.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(builder)
    {
        this._super(Defines.NORMAL_GRID_OBJ_LAYER.CEIL, Defines.GRID_OBJS_ZORDER.OBJ_TOP);
        this.m_Builder = builder;
    },


    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_PipeFactory";
    },

    //------------------------------------------------------------------------------------------------------------------
    createNew: function()
    {
        //工厂创建 就是用核心m_Builder创建 多个工厂就是实现多个核心
        if (!this.getBuilder())
        {
            return null;
        }

        var newObj = this._create();
        if (newObj)
        {
            this.getParentNode().addNodeToFactoryPool(newObj);

            //
            newObj.updateNodePosition();
            newObj.renderNode();
            newObj.getSprite().setVisible(true);
        }

        return newObj;
    },

    //------------------------------------------------------------------------------------------------------------------
    _create: function()
    {
        return this.getBuilder() ? this.getBuilder().createNew() : null;
    },

    //------------------------------------------------------------------------------------------------------------------
    getBuilder: function()
    {
        return this.m_Builder;
    },

    //------------------------------------------------------------------------------------------------------------------
    addToPool: function(object)
    {
        return this.getBuilder() ? this.getBuilder().addToPool(object) : null;
    }
});

cc.Obj_PipeFactory.create = function(builder)
{
    return new cc.Obj_PipeFactory(builder);
};

