/*

//================================================ GUIBuyDiamond =====================================================
//
cc.GUIBuyDiamond = cc.GUIWindow.extend ({

    description: function ()
    {
        return "GUIBuyDiamond";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        this.m_MainUI = null;

        this.m_ShopData = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
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
        var labelTitle = cc.Sprite.createWithSpriteFrameName("general_label_diamond_devoid.png");
        this.m_MainUI.addChild(labelTitle);
        labelTitle.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.9));

        //
        var labelName = cc.LabelTTF.create(this.m_ShopData.NAME, Defines.DefaultFont, 25 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelName);
        labelName.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.75));

        //
        var spriteItem = cc.Sprite.createWithSpriteFrameName(this.m_ShopData.SPRITE_SOURCE);
        this.m_MainUI.addChild(spriteItem);
        spriteItem.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.55));

        //
        var labelCount = GUI.createNumberLabel(
            this.m_ShopData.COUNT.get(), _GUIPath + "Num/num_9_20x24.png", 20, 24, "0");
        this.m_MainUI.addChild(labelCount);
        labelCount.setAnchorPoint(cc.p(1, 0.5));
        labelCount.setPosition(cc.p(mainSize.width - 50 * Defines.BASE_SCALE, 140 * Defines.BASE_SCALE));

        //var labelCountMulti = cc.Sprite.create(_GUIPath + "Num/num_9_x.png");
        var labelCountMulti = cc.Sprite.createWithSpriteFrameName("general_label_buy.png");
        this.m_MainUI.addChild(labelCountMulti);
        labelCountMulti.setAnchorPoint(cc.p(1, 0.5));
        labelCountMulti.setPosition(
            cc.p(labelCount.getPosition().x - labelCount.getContentSize().width, 140 * Defines.BASE_SCALE));

        //
        if (this.m_ShopData.GIFT_COUNT && this.m_ShopData.GIFT_COUNT.get() > 0)
        {
            var spriteGift = null;
            var labelGiftCount = null;
            switch (this.m_ShopData.ITEM_TYPE)
            {
                case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND:
                {
                    spriteGift = cc.Sprite.createWithSpriteFrameName("general_label_gift_1.png");
                    labelGiftCount = GUI.createNumberLabel(
                        this.m_ShopData.GIFT_COUNT.get(), _GUIPath + "Num/num_10_16x20.png", 16, 20, "0");
                }
                    break;

                case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE:
                case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE:
                {
                    spriteGift = cc.Sprite.createWithSpriteFrameName("general_label_gift_2.png");
                    labelGiftCount = GUI.createNumberLabel(
                        this.m_ShopData.GIFT_COUNT.get(), _GUIPath + "Num/num_8_16x22.png", 16, 20, "0");
                }
                    break;

                default :
                    break;
            }

            if (spriteGift && labelGiftCount)
            {
                this.m_MainUI.addChild(spriteGift);
                spriteGift.setAnchorPoint(cc.p(0, 0.5));

                this.m_MainUI.addChild(labelGiftCount);
                labelGiftCount.setAnchorPoint(cc.p(0, 0.5));

                spriteGift.setPosition(cc.p(205 * Defines.BASE_SCALE, 110 * Defines.BASE_SCALE));
                labelGiftCount.setPosition(
                    cc.pAdd(spriteGift.getPosition(), cc.p(spriteGift.getContentSize().width, 0)));
            }
        }

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(mainSize.width - 25 * Defines.BASE_SCALE, mainSize.height - 25 * Defines.BASE_SCALE));

        //
        var buttonBuy = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_temp_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_temp_sel.png"),
            this._btnBuyDiamondCallback, this);
        buttonBuy.setPosition(cc.p(mainSize.width * 0.5, 45 * Defines.BASE_SCALE));

        //
        var currencyFile = this.m_ShopData.CURRENCY == GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB ?
            "general_rmb.png" : "general_diamond_2.png";
        var spriteCurrency = cc.Sprite.createWithSpriteFrameName(currencyFile);
        buttonBuy.addChild(spriteCurrency);
        spriteCurrency.setAnchorPoint(cc.p(0, 0.5));

        //
        var labelPrice = GUI.createNumberLabel(
            this.m_ShopData.TOTAL_PRICE.get(), _GUIPath + "Num/num_12_28x40.png", 28, 40, ".");
        buttonBuy.addChild(labelPrice);
        labelPrice.setAnchorPoint(cc.p(0, 0.5));

        //
        var buttonBuySize = buttonBuy.getContentSize();
        var currencySize = spriteCurrency.getContentSize();
        var labelPriceSize = labelPrice.getContentSize();
        var toSide = (buttonBuySize.width - currencySize.width - labelPriceSize.width) * 0.5;

        //
        spriteCurrency.setPosition(cc.p(toSide, buttonBuySize.height * 0.55));
        labelPrice.setPosition(cc.p(toSide + currencySize.width, buttonBuySize.height * 0.55));

        //
        var buyMenu = cc.Menu.create(buttonClose, buttonBuy);
        buyMenu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(buyMenu);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentForTelcomOperators: function()
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
        var labelTitle = cc.Sprite.createWithSpriteFrameName("general_label_diamond_devoid.png");
        this.m_MainUI.addChild(labelTitle);
        labelTitle.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.9));

        //
        var labelDesc = cc.LabelTTF.create(Resource.ChineseTxt[167], Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelDesc);
        labelDesc.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.55));

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(mainSize.width - 25 * Defines.BASE_SCALE, mainSize.height - 25 * Defines.BASE_SCALE));

        //
        var buttonConfirm = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_sel.png"),
            this._btnCloseCallback, this);
        buttonConfirm.setPosition(cc.p(mainSize.width * 0.5, 45 * Defines.BASE_SCALE));

        //
        var buyMenu = cc.Menu.create(buttonClose, buttonConfirm);
        buyMenu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(buyMenu);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback:function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        this.closeWindow();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnBuyDiamondCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        var myScene = this.getWindow().getParent();
        this.closeWindow();

        //电信的有二次确认
        if (Defines._NeedPayConfirm())
        {
            cc.GUIBuyPrompt.getInstance().openWindow(myScene, this.m_ShopData);
            return this;
        }

        //
        _Pay_ByRMB(this.m_ShopData);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, needCount)
    {
        this._super(render);

        //
        cc.AudioMng.getInstance().playOpenWindow();
        this.getWindow().removeAllChildren(true);

        //step1:
        this.m_ShopData = GUI.getExactDiamondShopData(needCount);

        //step2:
        Defines._CanPayDiamond() ? this.addContent() : this.addContentForTelcomOperators();

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

cc.GUIBuyDiamond._instance = null;
cc.GUIBuyDiamond.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIBuyDiamond();
        this._instance.init();
    }

    return this._instance;
};*/
