
//================================================ GUIBuySuccess =====================================================
cc.GUIBuySuccess = cc.GUIPopupWindow.extend ({

    description: function ()
    {
        return "GUIBuySuccess";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        this.m_MainUI = null;
        this.m_ShopData = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    setContent: function ()
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
//        var labelName = cc.LabelTTF.create(this.m_ShopData.NAME, Defines.DefaultFont, 25 * Defines.BASE_SCALE);
//        this.m_MainUI.addChild(labelName);
//        labelName.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.75));

        var tarSize = cc.size(mainSize.width * 0.4, mainSize.height * 0.4);

        //
        var spriteItem = cc.Sprite.createWithSpriteFrameName(this.m_ShopData.SPRITE_SOURCE);
        this.m_MainUI.addChild(spriteItem);
        spriteItem.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.5));

        if (tarSize.width / spriteItem.getContentSize().width < 1){
            spriteItem.setScale(tarSize.width / spriteItem.getContentSize().width);
        }

        //

        if (this.m_ShopData.ITEM_TYPE != GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND){
            if (this.m_ShopData.COUNT.get() > 1)
            {
                var labelCount = GUI.createNumberLabel(
                    this.m_ShopData.COUNT.get(), _GUIPath + "Num/num_9_20x24.png", 20, 24, "0");
                this.m_MainUI.addChild(labelCount);
                labelCount.setAnchorPoint(cc.p(1, 0.5));
                labelCount.setPosition(cc.p(mainSize.width - 50 * Defines.BASE_SCALE, 140 * Defines.BASE_SCALE));

                if (this.m_ShopData.SF_GIFT && this.m_ShopData.SF_GIFT.get() > 0){
                    labelCount.setPosition(cc.p(mainSize.width - 60 * Defines.BASE_SCALE, 140 * Defines.BASE_SCALE));
                }
                var typeHaveGift = this.m_ShopData.GIFT_COUNT && this.m_ShopData.GIFT_COUNT.get() >= 0;
                var labelCountMulti = typeHaveGift ?
                    cc.Sprite.createWithSpriteFrameName("general_label_buy.png") :
                    cc.Sprite.create(_GUIPath + "Num/num_9_x.png");
                this.m_MainUI.addChild(labelCountMulti);
                labelCountMulti.setAnchorPoint(cc.p(1, 0.5));

                var offset = typeHaveGift ? cc.p(0, 0) : cc.p(-5 * Defines.BASE_SCALE, 0);
                var multiPos = cc.p(labelCount.getPosition().x - labelCount.getContentSize().width, 140 * Defines.BASE_SCALE);
                labelCountMulti.setPosition(cc.pAdd(multiPos, offset));
            }

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
                    spriteGift.setAnchorPoint(cc.p(1, 0.5));

                    this.m_MainUI.addChild(labelGiftCount);
                    labelGiftCount.setAnchorPoint(cc.p(1, 0.5));

                    labelGiftCount.setPosition(cc.p(mainSize.width - 50 * Defines.BASE_SCALE, 110 * Defines.BASE_SCALE));
                    spriteGift.setPosition(cc.p(labelGiftCount.getPosition().x - labelGiftCount.getContentSize().width, 110 * Defines.BASE_SCALE));
                }


                if (this.m_ShopData.SF_GIFT && this.m_ShopData.SF_GIFT.get() > 0){
                    var contentSize = mainSize;
                    var cell = this.m_MainUI;
                    labelGiftCount.setPosition(cc.p(contentSize.width/2 + 75 * Defines.BASE_SCALE, 110 * Defines.BASE_SCALE));
                    spriteGift.setPosition(cc.p(labelGiftCount.getPosition().x - labelGiftCount.getContentSize().width, 110 * Defines.BASE_SCALE));

                    var giftBg = cc.Sprite.createWithSpriteFrameName("game_add_moves_back_spring.png");
                    cell.addChild(giftBg);
                    giftBg.setPosition(cc.p(contentSize.width - 18 * Defines.BASE_SCALE, 100 * Defines.BASE_SCALE));
                    giftBg.setScale(0.5);

                    var giftAdd = cc.Sprite.createWithSpriteFrameName("start_end_diamond_add_spring.png");
                    cell.addChild(giftAdd);
                    giftAdd.setPosition(cc.p(contentSize.width - 36 * Defines.BASE_SCALE, 100 * Defines.BASE_SCALE));
                    giftAdd.setScale(0.4);

                    var labelGiftCount = GUI.createNumberLabel(
                        this.m_ShopData.SF_GIFT.get(),
                        _GUIPath + "Num/num_10_16x20.png", 16, 20, "0");

                    cell.addChild(labelGiftCount);
                    labelGiftCount.setScale(0.8);
                    labelGiftCount.setPosition(cc.p(contentSize.width - 28 * Defines.BASE_SCALE, 92 * Defines.BASE_SCALE));
                }
            }
            //
        }


        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(mainSize.width - 25 * Defines.BASE_SCALE, mainSize.height - 25 * Defines.BASE_SCALE));

        //
        var buttonConfirm = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_sel.png"),
            this._btnConfirmCallback, this);
        buttonConfirm.setPosition(cc.p(mainSize.width * 0.5, 40 * Defines.BASE_SCALE));

        //
        var menu = cc.Menu.create(buttonClose, buttonConfirm);
        menu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(menu);

        //
        this.m_LabelTitle = cc.LabelTTF.create(Resource.ChineseTxt[168], Defines.DefaultFont, 30 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(this.m_LabelTitle);
        this.m_LabelTitle.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.9));

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
    _btnConfirmCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        this.closeWindow();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, shopData)
    {
        this._super(render);

        //
        cc.AudioMng.getInstance().playOpenWindow();
        this.getWindow().removeAllChildren(true);

        //
        this.m_ShopData = shopData;

        //
        this.setContent();

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

        //
        if (cc.Guide.isEnterShopGuide)
        {
            var contentList = [
                Resource.ChineseTxt[73],
                Resource.ChineseTxt[79]
            ];

            var blacks0 = cc.rect(0,0,0,0);
            var blacks1 = cc.GUIShop.getInstance().getButtonCloseRectForGuide();

            var blackList = [
                blacks0,
                blacks1
            ];

            var fingerPos = [
                cc.p(0,0),
                cc.p(blacks1.x,blacks1.y + blacks1.height/2)
            ];

            var isFlip = [
                false,
                true
            ];

            cc.GUIGuideNormal.getInstance().showCustomCuteMonsterList(
                "BuySuccessful",
                contentList,
                cc.GUIShop.getInstance().getWindow().getParent(),
                blackList,
                false,
                fingerPos,
                isFlip
            );
        }

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIBuySuccess._instance = null;
cc.GUIBuySuccess.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIBuySuccess();
        this._instance.init();
    }

    return this._instance;
};