
cc.MapZoneBackGroundTest = cc.MapZoneBackGround.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        this.m_LeftDeco = null;
        this.m_RightDeco = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        this._super();

        if (this.m_LeftDeco)
        {
            this.m_LeftDeco.removeFromParent(true);
            this.m_LeftDeco = null;
        }

        if (this.m_RightDeco)
        {
            this.m_RightDeco.removeFromParent(true);
            this.m_RightDeco = null;
        }
    },

    //------------------------------------------------------------------------------------------------------------------
    setFlip: function(isFlip)
    {
        if (this.m_BackBottom)
        {
            this.m_BackBottom.setFlipX(isFlip);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addLeftDecoration: function(render)
    {
        this.m_LeftDeco = cc.Sprite.create(Resource._MapZone);
        this.m_LeftDeco.setAnchorPoint(cc.p(1, 0));
        render.addChild(this.m_LeftDeco, -10000);
        this.m_LeftDeco.setPosition(cc.p(0, 0));
        GUI.mapZonesBackGroundScaleToScreen(this.m_LeftDeco);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addRightDecoration: function(render)
    {
        this.m_RightDeco = cc.Sprite.create(Resource._MapZone);
        this.m_RightDeco.setAnchorPoint(cc.p(0, 0));
        render.addChild(this.m_RightDeco, -10000);
        this.m_RightDeco.setPosition(cc.p(this.m_BackBottom.getContentSize().width, 0));
        GUI.mapZonesBackGroundScaleToScreen(this.m_RightDeco);

        return this;
    }

});

cc.MapZoneBackGroundTest.create = function()
{
    return new cc.MapZoneBackGroundTest();
};
