
//======================================================================================================================
cc.Obj_Lock = cc.NormalObj.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(layersCount)
    {
        this._super(Defines.NORMAL_GRID_OBJ_LAYER.TOP, Defines.GRID_OBJS_ZORDER.OBJ_TOP);

        //
        this.m_LocksCount = layersCount;
        this.m_LockRender = new LockRender(this);
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_Lock";
    },

    //------------------------------------------------------------------------------------------------------------------
    getLocksCount: function()
    {
        return this.m_LocksCount;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        this._super();

        if(this.m_LockRender)
        {
            this.m_LockRender.release();
            this.m_LockRender = null;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createSprite: function()
    {
        return this.m_LockRender ? this.m_LockRender.createMySprite() : null;
    },

    //------------------------------------------------------------------------------------------------------------------
    renderNode: function()
    {
        return this.m_LockRender ? this.m_LockRender.render() : this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isBlock: function()
    {
        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    subLocksCount: function(completely)
    {
        var old = this.m_LocksCount;

        if(completely)
        {
            this.m_LocksCount = 0;
        }
        else
        {
            --this.m_LocksCount;
            if (this.m_LocksCount <= 0)
            {
                this.m_LocksCount = 0;
            }
        }

        return old - this.m_LocksCount;
    },

    //------------------------------------------------------------------------------------------------------------------
    destroy: function(desSrc, gameLevel, visitor, completely)
    {
        if (visitor)
        {
            visitor.visit(this);
        }

        //
        var subCount = this.subLocksCount(completely);
        if (subCount > 0)
        {
            /*cc.DataMng.getInstance().recordDestroy*/_DiaryDestroyNodeObject(this);
        }

        //
        if (this.getLocksCount() <= 0)
        {
            gameLevel.disposal(this);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    beNotifiedDestroy: function(notifySrc, gameLevel, visitor)
    {
        //只能被通知删除
        var canNotify = this.getParentNode() == notifySrc.getParentNode();
        if (!canNotify)
        {
            return this;
        }

        //
        this.destroy(notifySrc, gameLevel, visitor, false);
        return this;
    }
    //------------------------------------------------------------------------------------------------------------------
});


cc.Obj_Lock.create = function(_layersCount)
{
    var layersCount = _layersCount || 1;
    return new cc.Obj_Lock(layersCount);
};


