
//======================================================================================================================
cc.GUIAskFriendForHeart = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();
        this.m_MainUI = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "GUIAskFriendForHeart";
    },

    //------------------------------------------------------------------------------------------------------------------
    getHeartData: function()
    {
        return GUI.SHOP_DATA.SHOP_DATA_LIFE[3];
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
        this.m_MainUI.setPosition(_ScreenCenter());

        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        var backFrame = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back5.png");
        this.m_MainUI.addChild(backFrame);
        backFrame.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.53));

        //
        var labelDesc = cc.LabelTTF.create(Resource.ChineseTxt["ask_heart_desc"], Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelDesc);
        labelDesc.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.68));

        //薄荷糖物品部分
        var heartData = this.getHeartData();

        //
        var spriteItem = cc.Sprite.createWithSpriteFrameName(heartData.SPRITE_SOURCE);
        this.m_MainUI.addChild(spriteItem);
        spriteItem.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.5));

        //
        var labelCount = GUI.createNumberLabel(heartData.COUNT.get(), _GUIPath + "Num/num_9_20x24.png", 20, 24, "0");
        this.m_MainUI.addChild(labelCount);
        labelCount.setAnchorPoint(cc.p(1, 0.5));
        labelCount.setPosition(cc.p(mainSize.width - 50 * Defines.BASE_SCALE, 140 * Defines.BASE_SCALE));

        var labelCountMulti = cc.Sprite.createWithSpriteFrameName("general_label_buy.png");
        this.m_MainUI.addChild(labelCountMulti);
        labelCountMulti.setAnchorPoint(cc.p(1, 0.5));
        labelCountMulti.setPosition(cc.p(labelCount.getPosition().x - labelCount.getContentSize().width, 140 * Defines.BASE_SCALE));

        if (heartData.GIFT_COUNT && heartData.GIFT_COUNT.get() > 0)
        {
            var labelGiftCount = GUI.createNumberLabel(heartData.GIFT_COUNT.get(), _GUIPath + "Num/num_8_16x22.png", 16, 20, "0");
            this.m_MainUI.addChild(labelGiftCount);
            labelGiftCount.setAnchorPoint(cc.p(1, 0.5));
            labelGiftCount.setPosition(cc.p(mainSize.width - 50 * Defines.BASE_SCALE, 110 * Defines.BASE_SCALE));

            var spriteGift = cc.Sprite.createWithSpriteFrameName("general_label_gift_2.png");
            this.m_MainUI.addChild(spriteGift);
            spriteGift.setAnchorPoint(cc.p(1, 0.5));
            spriteGift.setPosition(cc.p(labelGiftCount.getPosition().x - labelGiftCount.getContentSize().width, 110 * Defines.BASE_SCALE));
        }

        //   CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND,
		if (heartData.CURRENCY == GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND){
			var strPrice = heartData.TOTAL_PRICE.get() + Resource.ChineseTxt["common_diamond"];
		}
		else {
			var strPrice = heartData.TOTAL_PRICE.get() + "元";		
		}
        var labelPrice = cc.LabelTTF.create(strPrice, Defines.DefaultFont, 16 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelPrice);
        labelPrice.setPosition(cc.p(mainSize.width/2, 15 * Defines.BASE_SCALE));

        //
        var heartMenu = cc.Menu.create();
        heartMenu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(heartMenu);

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(mainSize.width - 25 * Defines.BASE_SCALE, mainSize.height - 25 * Defines.BASE_SCALE));
        heartMenu.addChild(buttonClose);

        //
        var buttonBuy = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_want_heart_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_want_heart_sel.png"),
            this._btnBuyCallback, this);
        buttonBuy.setPosition(cc.p(mainSize.width/2, 50 * Defines.BASE_SCALE));
        heartMenu.addChild(buttonBuy);

        //求助按钮
        var buttonHelp = cc.MenuItemFont.create(Resource.ChineseTxt["ask_heart_help"], this._btnAskHelpCallback, this);
        buttonHelp.setPosition(cc.p(mainSize.width - 40 * Defines.BASE_SCALE, -20 * Defines.BASE_SCALE));
        buttonHelp.setFontSize(16 * Defines.BASE_SCALE);
        heartMenu.addChild(buttonHelp);

        if (isTelcomOperators() || !cc.NodeSelf.getInstance().isLogin())
        {
            buttonHelp.setVisible(false);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        this.closeWindow();
        cc.GUISimpleShop.getInstance().openWindow(_GUILayer(),1);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnBuyCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        var myScene = this.getWindow().getParent();
        this.closeWindow();

        var heartData = this.getHeartData();
        var needDiamond = heartData.TOTAL_PRICE.get();

        if (cc.DataMng.getInstance().canSpendMoney(needDiamond))
        {
            cc.DataMng.getInstance().spendMoney(needDiamond ,MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_BUY_HEART);
            cc.DataMng.getInstance().addHeart(heartData.COUNT.get() + heartData.GIFT_COUNT.get());

            cc.GUIBuySuccess.getInstance().openWindow(myScene, heartData);
            BIMng.getInstance().logPayByDiamond(heartData);
        }
        else
        {
            cc.GUIBuyDiamond.getInstance().openWindow(myScene, needDiamond);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnAskHelpCallback: function()
    {
        if (cc.NodeSelf.getInstance().isLogin())
        {
            var friendOpen = cc.GUISubFriendsList.getInstance().isWindowOpen();
            if (!friendOpen)
            {
                cc.GUISubFriendsList.getInstance().openWindow(
                    this.getWindow().getParent(),
                    new GUISubFriendsList_Operation_AskHeart()
                );
            }
        }
        else
        {
            _NeedLogin();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyOpenWindow: function(window)
    {
        if (this.isWindowOpen() && window instanceof cc.GUISubFriendsList)
        {
            this.m_MainUI.runAction(
                cc.MoveTo.create(0.1,  cc.p(_ScreenWidth()/2 - 235 * Defines.BASE_SCALE, _ScreenHeight()/2)));
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyCloseWindow: function(window)
    {
        if (this.isWindowOpen() && window instanceof cc.GUISubFriendsList)
        {
            this.m_MainUI.runAction(
                cc.MoveTo.create(0.1,  cc.p(_ScreenWidth()/2, _ScreenHeight()/2)));
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);
        cc.AudioMng.getInstance().playOpenWindow();

        this.getWindow().removeAllChildren(true);
        this.addContent();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();
        cc.AudioMng.getInstance().playCloseWindow();
        this.getWindow().removeAllChildren(true);

        return this;
    }
});

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
};