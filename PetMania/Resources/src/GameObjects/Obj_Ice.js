
//======================================================================================================================
cc.Obj_Ice  = cc.Obj_Stone.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(layersCount)
    {
        this._super(layersCount);
        this.m_LockRender = new IceRender(this);
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_Ice";
    },

    //------------------------------------------------------------------------------------------------------------------
    destroy: function(desSrc, gameLevel, visitor, compeletely)
    {
        if (visitor)
        {
            visitor.visit(this);
        }

        //
        var subCount = this.subLocksCount(compeletely);
        if (subCount > 0)
        {
            /*cc.DataMng.getInstance().recordDestroy*/_DiaryDestroyNodeObject(this);
        }

        //
        if (this.getLocksCount() > 0)
        {
            this.m_LockRender.release();
            this.m_LockRender.render();
            this.m_LockRender.updatePositionByNode();
        }
        else
        {
            gameLevel.disposal(this);
        }

        return this;
    }
});

//工厂方法
cc.Obj_Ice.create = function(layersCount)
{
    return new cc.Obj_Ice(layersCount);
};

