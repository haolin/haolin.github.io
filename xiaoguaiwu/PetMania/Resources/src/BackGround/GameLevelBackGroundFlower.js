
cc.GameLevelBackGroundFlower = cc.IBackGround.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        this._super();

        //
        cc.ResourceMng.getInstance().removeTextureCache(this.parseBackGroundImageRes());

        if (this._displayIOSFlag)
        {
            //
            cc.ResourceMng.getInstance().removeFromCache(
                _ImagesPath + "background_2.plist",
                _ImagesPath + "background_2.pvr.ccz"
            );
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseBackGroundImageRes: function()
    {
        return _ImagesPath + "background_2.jpg";
    },

    //------------------------------------------------------------------------------------------------------------------
    display: function(_backGroundLayer)
    {
        this._super(_backGroundLayer);

        ///
        var mainBack = cc.Sprite.create(this.parseBackGroundImageRes());
        _backGroundLayer.addChild(mainBack);
        mainBack.setAnchorPoint(cc.p(0, 0));

        //
        GUI.backGroundScaleToScreen(mainBack);
        cc.ResourceMng.getInstance().removeTextureCache(this.parseBackGroundImageRes());

        //
        /*var firefly = cc.ArmatureDataMng.getInstance().createFireFly();
        if (firefly)
        {
            _backGroundLayer.addChild(firefly);
            firefly.setPosition(cc.p(_ScreenCenter().x+50,_ScreenCenter().y+20));
        }*/

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayIOS: function(_backGroundLayer)
    {
        this._super(_backGroundLayer);

        cc.log("GameLevelBackGroundFlower displayIOS");

        //加载资源
        cc.ResourceMng.getInstance().addToCache(
            _ImagesPath + "background_2.plist",
            _ImagesPath + "background_2.pvr.ccz");

        //创建
        var mainBack = cc.Sprite.createWithSpriteFrameName("background_2.png");
        _backGroundLayer.addChild(mainBack);
        mainBack.setAnchorPoint(cc.p(0, 0));

        //设置位置
        GUI.backGroundScaleToScreen(mainBack);

        //Cache不要了
        cc.ResourceMng.getInstance().removeTextureCache(_ImagesPath + "background_2.pvr.ccz");

        //
       /* var firefly = cc.ArmatureDataMng.getInstance().createFireFly();
        if (firefly)
        {
            _backGroundLayer.addChild(firefly);
            firefly.setPosition(cc.p(_ScreenCenter().x+50,_ScreenCenter().y+20));
        }*/

        //
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GameLevelBackGroundFlower.create = function()
{
    return new cc.GameLevelBackGroundFlower();
};
