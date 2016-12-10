
cc.IBackGround = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._displayIOSFlag = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    display: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayIOS: function()
    {
        this._displayIOSFlag = true;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseBackGroundImageRes: function()
    {
        return "";
    }
});

//======================================================================================================================
cc.MapZoneBackGround = cc.IBackGround.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_BackBottom = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        if (this.m_BackBottom)
        {
            this.m_BackBottom.removeFromParent(true);
            this.m_BackBottom = null;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    display: function(layer)
    {
        if (!this.m_BackBottom)
        {
            this.m_BackBottom = cc.Sprite.create(Resource._MapZone);
            this.m_BackBottom.setVisible(false);
        }

        if (layer)
        {
            var size = layer.getContentSize();
            var zOrder = -10000;

            if (!this.m_BackBottom.getParent())
            {
                layer.addChild(this.m_BackBottom, zOrder);
                this.m_BackBottom.setPosition(cc.p(size.width/2, size.height/2));
                this.m_BackBottom.setVisible(false);
                GUI.mapZonesBackGroundScaleToScreen(this.m_BackBottom);
            }
        }

        this.m_BackBottom.setVisible(true);
        return this;
    }
});