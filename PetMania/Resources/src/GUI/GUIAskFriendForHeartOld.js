/*

//======================================================================================================================
cc.GUIAskFriendForHeart = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        this.m_BlackLayer = null;
        this.m_GUIBackGround = null;

        this.m_FromLevelKey = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return cc.GUIAskFriendForHeart.description();
    },

    //------------------------------------------------------------------------------------------------------------------
    updatePosition: function()
    {
        var position =  _ScreenCenter();
        */
/*if (cc.GUISubFriendsList.getInstance().isWindowOpen())
        {
            //
            position = cc.p(position.x - 250 * Defines.BASE_SCALE, position.y)
        }*//*


        if (this.m_GUIBackGround)
        {
            this.m_GUIBackGround.setPosition(position);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentForCM: function()
    {
        //
        this.m_BlackLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(this.m_BlackLayer);

        //
        this.m_GUIBackGround = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back0.png");
        this.m_BlackLayer.addChild(this.m_GUIBackGround);
        this.m_GUIBackGround.setPosition(_ScreenCenter());

        //
        this.createCloseButton(this.m_GUIBackGround, this.closeWindow, this);

        //
        var mainSize = this.m_GUIBackGround.getContentSize();

        //
        var backFrame = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back5.png");
        this.m_GUIBackGround.addChild(backFrame);
        backFrame.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.53));

        //
        var itemMenu = cc.Menu.create();
        itemMenu.setPosition(cc.p(0, 0));
        this.m_GUIBackGround.addChild(itemMenu, 10000);


        //购买按钮
        var buttonBuy = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_buy_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_buy_sel.png"),
            this.buy,
            this);

        itemMenu.addChild(buttonBuy);
        buttonBuy.setPosition(cc.p(mainSize.width/2, 40 * Defines.BASE_SCALE));

        //一堆薄荷糖
        var sugars = cc.Sprite.createWithSpriteFrameName("general_sugars.png");
        this.m_GUIBackGround.addChild(sugars);
        sugars.setPosition(cc.p(mainSize.width/2, mainSize.height/2));

        //
        var contentLabel = cc.LabelTTF.create(Resource.ChineseTxt[98], "Arial-Bold", 18 * Defines.BASE_SCALE);
        this.m_GUIBackGround.addChild(contentLabel);
        contentLabel.setPosition(cc.p(mainSize.width/2, mainSize.height/2 + 80 * Defines.BASE_SCALE));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        this.m_BlackLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(this.m_BlackLayer);

        //
        this.m_GUIBackGround = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back0.png");
        this.m_BlackLayer.addChild(this.m_GUIBackGround);

        //
        this.updatePosition();
        this.createCloseButton(this.m_GUIBackGround, this.closeWindow, this);

        //
        var mainSize = this.m_GUIBackGround.getContentSize();

        //
        var backFrame = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back5.png");
        this.m_GUIBackGround.addChild(backFrame);
        backFrame.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.53));

        //
        var itemMenu = cc.Menu.create();
        itemMenu.setPosition(cc.p(0, 0));
        this.m_GUIBackGround.addChild(itemMenu, 10000);

        //求助按钮
        var buttonHelp = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_ask_help_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_ask_help_sel.png"),
            this.openFriendsGUI,
            this);

        itemMenu.addChild(buttonHelp);
        buttonHelp.setPosition(cc.p(mainSize.width/2 - 80 * Defines.BASE_SCALE, 40 * Defines.BASE_SCALE));

        //购买按钮
        var buttonBuy = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_buy_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_buy_sel.png"),
            this.buy,
            this);

        itemMenu.addChild(buttonBuy);
        buttonBuy.setPosition(cc.p(mainSize.width/2 + 80 * Defines.BASE_SCALE, 40 * Defines.BASE_SCALE));

        //一堆薄荷糖
        var sugars = cc.Sprite.createWithSpriteFrameName("general_sugars.png");
        this.m_GUIBackGround.addChild(sugars);
        sugars.setPosition(cc.p(mainSize.width/2, mainSize.height/2));

        //
        var contentLabel = cc.LabelTTF.create(Resource.ChineseTxt[66], "Arial-Bold", 20 * Defines.BASE_SCALE);
        this.m_GUIBackGround.addChild(contentLabel);
        contentLabel.setPosition(cc.p(mainSize.width/2, mainSize.height/2 + 80 * Defines.BASE_SCALE));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openFriendsGUI: function()
    {
        var myScene = this.getWindow().getParent();
        this.closeWindow();

        //
        if (cc.NodeSelf.getInstance().isLogin())
        {
            var friendOpen = cc.GUISubFriendsList.getInstance().isWindowOpen();
            if (!friendOpen)
            {
                cc.GUISubFriendsList.getInstance().openWindow(
                    myScene,
                    new GUISubFriendsList_Operation_AskHeart()
                );
            }
            else
            {
                cc.GUISubFriendsList.getInstance().closeWindow();
            }

            //this.updatePosition();
        }
        else
        {
            _NeedLogin();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    buy: function()
    {
        //
        var fromLevelKey = this.m_FromLevelKey;
        this.closeWindow();

        Scene_Shop.changeTo(GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE, fromLevelKey);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createCloseButton: function(back, callBack, target)
    {
        //关闭按钮
        var mainSize = back.getContentSize();
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            callBack,
            target);
        //
        var itemMenu = cc.Menu.create();
        itemMenu.setPosition(cc.p(0, 0));
        itemMenu.addChild(buttonClose);
        back.addChild(itemMenu, 10000);

        var btnSize = buttonClose.getContentSize();
        buttonClose.setPosition(cc.p(mainSize.width - btnSize.width/2, mainSize.height - btnSize.height/2));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, levelKey)
    {
        this._super(render);
        cc.AudioMng.getInstance().playOpenWindow();

        //
        this.m_FromLevelKey = levelKey;

        this.getWindow().removeAllChildren(true);

        //
        if (isTelcomOperators())
        {
            this.addContentForCM();
        }
        else
        {
            this.addContent();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();
        cc.AudioMng.getInstance().playCloseWindow();
        this.getWindow().removeAllChildren(true);

        //
        this.m_FromLevelKey = null;

        return this;
    }
});

//======================================================================================================================
cc.GUIAskFriendForHeart.description = function()
{
    return "GUIAskFriendForHeart";
};

//======================================================================================================================
cc.GUIAskFriendForHeart._instance = null;
cc.GUIAskFriendForHeart.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIAskFriendForHeart();
        this._instance.init();
    }

    return this._instance;
};*/
