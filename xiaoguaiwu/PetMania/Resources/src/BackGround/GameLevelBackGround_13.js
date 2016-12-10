/**
 * Created by tongkuan.zhu on 2014/10/29.
 */

cc.GameLevelBackGround_13 = cc.IBackGround.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        cc.log("GameLevelBackGround_13 ctor");
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
                    _ImagesPath + "background_13.plist",
                    _ImagesPath + "background_13.pvr.ccz"
            );

        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseBackGroundImageRes: function()
    {
        return _ImagesPath + "background_13.jpg";
    },

    //------------------------------------------------------------------------------------------------------------------
    display: function(_backGroundLayer)
    {
        this._super(_backGroundLayer);

        var mainBack = cc.Sprite.create(this.parseBackGroundImageRes());
        _backGroundLayer.addChild(mainBack);
        GUI.backGroundScaleToScreen(mainBack);
        mainBack.setAnchorPoint(cc.p(0, 0));

        cc.ResourceMng.getInstance().removeTextureCache(this.parseBackGroundImageRes());

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayIOS: function(_backGroundLayer)
    {
        this._super(_backGroundLayer);

        cc.log("GameLevelBackGround_13 displayIOS");

        //加载资源
        cc.ResourceMng.getInstance().addToCache(
                _ImagesPath + "background_13.plist",
                _ImagesPath + "background_13.pvr.ccz");

        //创建
        var mainBack = cc.Sprite.createWithSpriteFrameName("background_13.jpg");
        _backGroundLayer.addChild(mainBack);
        GUI.backGroundScaleToScreen(mainBack);
        mainBack.setAnchorPoint(cc.p(0, 0));

        //Cache不要了
        cc.ResourceMng.getInstance().removeTextureCache(_ImagesPath + "background_13.pvr.ccz");

        //
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GameLevelBackGround_13.create = function()
{
    return new cc.GameLevelBackGround_13();
};
