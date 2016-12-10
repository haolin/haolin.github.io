
//===================================================== GUIMapCokePrompt ===============================================
//
cc.GUIMapCokePrompt = cc.GUIWindow.extend ({

    description: function ()
    {
        return "GUIMapCokePrompt";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        this.m_MainUI = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setContent: function(strTimer)
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(blockLayer, -1);

        //
        this.m_MainUI = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back0.png");
        this.getWindow().addChild(this.m_MainUI);

        var mainSize = this.m_MainUI.getContentSize();
        var winSize = cc.Director.getInstance().getWinSize();

        //
        this.m_MainUI.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.5));

        //
        var backFrame = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back5.png");
        this.m_MainUI.addChild(backFrame);
        backFrame.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.53));

        //
        var strName = Resource.ChineseTxt["space_5"];
        var labelName = cc.LabelTTF.create(strName, Defines.DefaultFont, 18 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelName);
        labelName.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.55));

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(mainSize.width - 25 * Defines.BASE_SCALE, mainSize.height - 25 * Defines.BASE_SCALE));

        //
        var buttonHelp = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("map_btn_friend_help_nor.png"),
            cc.Sprite.createWithSpriteFrameName("map_btn_friend_help_sel.png"),
            this._btnFriendAidCallback, this);
        buttonHelp.setPosition(cc.p(mainSize.width * 0.25, 50 * Defines.BASE_SCALE));

        //
//        if (_UnlockNewStar_ByRMB)
//        {
//            var buttonBuy = cc.MenuItemSprite.create(
//                cc.Sprite.createWithSpriteFrameName("general_btn_temp_nor.png"),
//                cc.Sprite.createWithSpriteFrameName("general_btn_temp_sel.png"),
//                this._btnBuyCallback, this);
//            buttonBuy.setPosition(cc.p(mainSize.width * 0.75, 50 * Defines.BASE_SCALE));
//            buttonBuy.setScale(0.8);
//
//            //
//            var spriteCurrency = cc.Sprite.createWithSpriteFrameName("general_rmb.png");
//            buttonBuy.addChild(spriteCurrency);
//            spriteCurrency.setAnchorPoint(cc.p(0, 0.5));
//
//            //
//            var labelPrice = GUI.createNumberLabel(
//                GUI.SHOP_DATA.SHOP_DATA_UNLOCK_NEW_ZONE[0].TOTAL_PRICE.get(), _GUIPath + "Num/num_12_28x40.png", 28, 40, ".");
//            buttonBuy.addChild(labelPrice);
//            labelPrice.setAnchorPoint(cc.p(0, 0.5));
//
//            //
//            var buttonBuySize = buttonBuy.getContentSize();
//            var currencySize = spriteCurrency.getContentSize();
//            var labelPriceSize = labelPrice.getContentSize();
//            var toSide = (buttonBuySize.width - currencySize.width - labelPriceSize.width) * 0.5;
//
//            //
//            spriteCurrency.setPosition(cc.p(toSide, buttonBuySize.height * 0.55));
//            labelPrice.setPosition(cc.p(toSide + currencySize.width, buttonBuySize.height * 0.55));
//        }
//        else
//        {
//        var buttonBuy = cc.MenuItemSprite.create(
//            cc.Sprite.createWithSpriteFrameName("general_btn_temp_small_nor.png"),
//            cc.Sprite.createWithSpriteFrameName("general_btn_temp_small_sel.png"),
//            this._btnBuyCallback, this);
//        buttonBuy.setPosition(cc.p(mainSize.width * 0.75, 50 * Defines.BASE_SCALE));
//
//        var diamondButtonSize = buttonBuy.getContentSize();
//
//        var diamondImg = cc.Sprite.createWithSpriteFrameName("general_diamond_2.png");
//        buttonBuy.addChild(diamondImg);
//        diamondImg.setPosition(cc.p(diamondButtonSize.width * 0.25, diamondButtonSize.height * 0.55));
//
//        var diamond = Defines.DIAMOND_PAY.UNLOCK_NEW_STAR;
//        var number = GUI.createNumberLabel(diamond.toString(), _GUIPath + "Num/num_12_28x40.png", 28, 40, ".");
//        buttonBuy.addChild(number);
//        number.setAnchorPoint(cc.p(0.5, 0.5));
//        number.setPosition(cc.p(diamondButtonSize.width * 0.65, diamondButtonSize.height * 0.55));
//        number.setScale(0.8);
//        }

        if(Defines.IS_KO)
        {
//            buttonBuy = null;
            var buttonBuy = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("map_begin_now_nor.png"),
                cc.Sprite.createWithSpriteFrameName("map_begin_now_sel.png"),
                this._btnBuyCallback, this);
            buttonBuy.setPosition(cc.p(mainSize.width * 0.75, 50 * Defines.BASE_SCALE));
        }
        //

        if(!Defines.IS_KO)
        {
            var labelBuy = cc.LabelTTF.create(Resource.ChineseTxt["space_2"], Defines.DefaultFont, 18 * Defines.BASE_SCALE);
            this.m_MainUI.addChild(labelBuy);
            labelBuy.setPosition(cc.p(mainSize.width * 0.75, 20 * Defines.BASE_SCALE));
        }
        //
        var promptMenu = cc.Menu.create(buttonClose, buttonHelp, buttonBuy);
        promptMenu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(promptMenu);

        //
        if (isTelcomOperators())
        {
            buttonHelp.setVisible(false);
            buttonBuy.setPositionX(mainSize.width * 0.5);
            labelBuy.setPositionX(mainSize.width * 0.5);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnBuyCallback: function()
    {
        //
        var myScene = cc.GUIMap.getInstance().getWindow().getParent();

        //
//        if (_UnlockNewStar_ByRMB)
//        {
//            var shopData = GUI.SHOP_DATA.SHOP_DATA_UNLOCK_NEW_ZONE[0];
//            if (Defines._NeedPayConfirm())
//            {
//                this.closeWindow();
//                cc.GUIBuyPrompt.getInstance().openWindow(myScene, shopData);
//            }
//            else
//            {
//                _Pay_ByRMB(shopData);
//            }
//        }
//        else
//        {
            var needDiamond = Defines.DIAMOND_PAY.UNLOCK_NEW_STAR;

            if (cc.DataMng.getInstance().canSpendMoney(needDiamond))
            {
                var shopData = GUI.SHOP_DATA.SHOP_DATA_UNLOCK_NEW_ZONE[0];
                this.closeWindow();
                cc.GUIBuyPrompt.getInstance().openWindow(myScene, shopData);
            }
            else
            {
                this.closeWindow();
                cc.GUIBuyDiamond.getInstance().openWindow(myScene, needDiamond, GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND);
            }
//        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback: function()
    {
        //
        this.closeWindow();

        //
        cc.GUIMap.getInstance().setZonesEnabled(true);
        cc.GUIMap.getInstance().handleMapEnterAction(true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnFriendAidCallback: function()
    {
        this.closeWindow();

        if (cc.NodeSelf.getInstance().isLogin())
        {
            var myScene = cc.Director.getInstance().getRunningScene();
            cc.GUIMapFriendAid.getInstance().openWindow(myScene);
        }
        else
        {
            _NeedLogin();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyLoginFinish: function()
    {
        if (!this.isWindowOpen())
        {
            return this;
        }

        //
        cc.log("GUIMapCokePrompt：覆盖数据后，关闭窗口");
        this._btnCloseCallback();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, strTimer)
    {
        this._super(render);

        //
        cc.AudioMng.getInstance().playOpenWindow();

        //
        this.setContent(strTimer);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        //
        cc.AudioMng.getInstance().playCloseWindow();

        //
        this.getWindow().removeAllChildren(true);

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIMapCokePrompt._instance = null;
cc.GUIMapCokePrompt.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIMapCokePrompt();
        this._instance.init();

        var self = this;

        //
        FriendsMng.getInstance().registerEvent(
            _FRIENDS_MNG_EVENT.LOGIN_SUCC,
            function()
            {
                if (self._instance.isWindowOpen())
                {
                    self._instance.notifyLoginFinish();
                }
            },
            null);
    }

    return this._instance;
};