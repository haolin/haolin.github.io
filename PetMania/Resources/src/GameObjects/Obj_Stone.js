
//======================================================================================================================
cc.Obj_Stone = cc.Obj_Lock.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(layersCount)
    {
        this._super(layersCount);
        this.m_LockRender = new StoneRender(this);
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_Stone";
    },

    //------------------------------------------------------------------------------------------------------------------
    beNotifiedDestroy: function(notifySrc, gameLevel, visitor)
    {
        //
        if (notifySrc.getPosition().x == this.getPosition().x
            || notifySrc.getPosition().y == this.getPosition().y)
        {
            this.destroy(notifySrc, gameLevel, visitor);
        }

        return this;
    }

});

//工厂方法
cc.Obj_Stone.create = function(_layersCount)
{
    var layersCount = _layersCount || 1;
    return new cc.Obj_Stone(layersCount);
};

