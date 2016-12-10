

//======================================================================================================================
cc.Obj_Haze = cc.NormalObj.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(layersCount)
    {
        this._super(Defines.NORMAL_GRID_OBJ_LAYER.CEIL, Defines.GRID_OBJS_ZORDER.OBJ_CEIL);
        this.m_HazeCount = layersCount;
        this.m_HazeRender = new HazeRender(this);
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_Haze";
    },

    //------------------------------------------------------------------------------------------------------------------
    getHazeCount: function()
    {
        return this.m_HazeCount;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        this._super();

        if (this.m_HazeRender)
        {
            this.m_HazeRender.release();
            this.m_HazeRender = null;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createSprite: function()
    {
        return this.m_HazeRender ? this.m_HazeRender.createMySprite() : null;
    },

    //------------------------------------------------------------------------------------------------------------------
    renderNode: function()
    {
        return this.m_HazeRender ? this.m_HazeRender.render() : this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isBlock: function()
    {
        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    subHazeCount: function(completely)
    {
        var old = this.m_HazeCount;

        if(completely)
        {
            this.m_HazeCount = 0;
        }
        else
        {
            --this.m_HazeCount;
            if (this.m_HazeCount <= 0)
            {
                this.m_HazeCount = 0;
            }
        }

        return old - this.m_HazeCount;
    },

    //------------------------------------------------------------------------------------------------------------------
    destroy: function(desSrc, gameLevel, visitor, completely)
    {
        if (visitor)
        {
            visitor.visit(this);
        }

        //
        var subCount = this.subHazeCount(completely);
        if (subCount > 0)
        {
            /*cc.DataMng.getInstance().recordDestroy*/_DiaryDestroyNodeObject(this, subCount);
        }

        //
        if (this.getHazeCount() > 0)
        {
            this.m_HazeRender.release();
            this.m_HazeRender.render();
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
        if (notifySrc.getPosition().x == this.getPosition().x
            || notifySrc.getPosition().y == this.getPosition().y)
        {
            this.destroy(notifySrc, gameLevel, visitor);
        }

        return this;
    }

});

cc.Obj_Haze.create = function(_layersCount)
{
    var layersCount = _layersCount || 1;
    return new cc.Obj_Haze(layersCount);
};