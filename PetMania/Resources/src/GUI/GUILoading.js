
//======================================================================================================================
cc.GUILoading = cc.GUIWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUILoading";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        this._enterredMap = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function(loadHandler)
    {
        //
        var backLayer = cc.LayerColor.create(cc.c4b(0, 0, 0, 255));
        this.getWindow().addChild(backLayer);

        //
        var animationKey = "loading_";
        var monster = cc.Sprite.createWithSpriteFrameName(animationKey + "0.png");
        this.getWindow().addChild(monster);

        //
        if (monster && !Defines.LOW_PERFORMANCE)
        {
            //
            var animation = cc.Animation.create(cc.ResourceMng.getInstance().getAnimationFrames(animationKey), 1/10);
            monster.runAction(
                cc.RepeatForever.create(
                    cc.Animate.create(animation)
                ));
        }

        monster.setPosition(_ScreenCenter());

        //
        if (!Defines.IS_KO && !Defines.IS_EN && !this._enterredMap && loadHandler instanceof LoadHandler_ToMap)
        {
            this._enterredMap = true;

            var labelWarn = cc.LabelTTF.create(Resource.ChineseTxt["load_content_0"], Defines.DefaultFont, 20 * Defines.BASE_SCALE);
            this.getWindow().addChild(labelWarn);
            labelWarn.setPosition(cc.p(_ScreenWidth()/2, _ScreenHeight() * 0.15))
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, loadHandler)
    {
        this._super(render);

        //
        cc.ResourceMng.getInstance().addToCache(
            Resource.loading_plist,
            Resource.loading_png);


        cc.Director.getInstance().setNotificationNode(this.getWindow());

        this.getWindow().setVisible(true);
        this.getWindow().removeAllChildren(true);
        this.addContent(loadHandler);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();
        this.getWindow().setVisible(false);
        this.getWindow().removeAllChildren(true);

        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource.loading_plist,
            Resource.loading_png);

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});


cc.GUILoading._instance = null;
cc.GUILoading.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUILoading();
        this._instance.init();
    }

    return this._instance;
};