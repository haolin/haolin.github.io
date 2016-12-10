

//======================================================================================================================
cc.Obj_Floor = cc.NormalObj.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(layersCount)
    {
        this._super(Defines.NORMAL_GRID_OBJ_LAYER.BOTTOM, Defines.GRID_OBJS_ZORDER.OBJ_BOTTOM);
        this.m_MyFloorCount = layersCount;
        this.m_FloorRender = new FloorRender(this);
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_Floor";
    },

    //------------------------------------------------------------------------------------------------------------------
    getFloorCount: function()
    {
        return this.m_MyFloorCount;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        this._super();
        this.m_FloorRender.release();
        this.m_FloorRender = null;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createSprite: function()
    {
        return this.m_FloorRender ? this.m_FloorRender.createMySprite() : null;
    },

    //------------------------------------------------------------------------------------------------------------------
    renderNode: function()
    {
        return this.m_FloorRender ? this.m_FloorRender.render() : this;
    },

    //------------------------------------------------------------------------------------------------------------------
    subFloorCount: function(completely)
    {
        var old = this.m_MyFloorCount;

        if(completely)
        {
            this.m_MyFloorCount = 0;
        }
        else
        {
            --this.m_MyFloorCount;
            if (this.m_MyFloorCount <= 0)
            {
                this.m_MyFloorCount = 0;
            }
        }

        return old - this.m_MyFloorCount;
    },

    //------------------------------------------------------------------------------------------------------------------
    destroy: function(desSrc, gameLevel, visitor, completely)
    {
        if (visitor)
        {
            visitor.visit(this);
        }

        //
        var subCount = this.subFloorCount(completely);
        if (subCount > 0)
        {
            /*cc.DataMng.getInstance().recordDestroy*/_DiaryDestroyNodeObject(this, subCount);
        }

        //
        if (this.getFloorCount() > 0)
        {
            this.m_FloorRender.release();
            this.m_FloorRender.render();
        }
        else
        {
            gameLevel.disposal(this);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    beNotifiedDestroy: function(notifySrc, gameLevel, visitor)
    {
        if (this.getParentNode() == notifySrc.getParentNode())
        {
            this.destroy(notifySrc, gameLevel, visitor);
        }

        return this;
    }

});

cc.Obj_Floor.create = function(_layersCount)
{
    var layersCount = _layersCount || 1;
    return new cc.Obj_Floor(layersCount);
};




