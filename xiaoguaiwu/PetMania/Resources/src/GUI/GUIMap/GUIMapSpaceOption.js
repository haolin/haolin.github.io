
//======================================================================================================================
cc.GUIMapSpaceOption = cc.GUIWindow.extend({

    description: function ()
    {
        return "GUIMapSpaceOption";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        this.m_CurMapDefine = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        var background = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(background);

        //
        var spriteTitle = cc.Sprite.createWithSpriteFrameName("map_label_space_option.png");
        this.getWindow().addChild(spriteTitle);
        spriteTitle.setPosition(cc.p(_ScreenWidth()/2, _ScreenHeight()/2 + 165 * Defines.BASE_SCALE));

        //挑战3关
        var optionChallenge = cc.Sprite.createWithSpriteFrameName("map_space_option_0.png");
        this.getWindow().addChild(optionChallenge);
        optionChallenge.setPosition(cc.p(_ScreenWidth()/2 - 250 * Defines.BASE_SCALE, _ScreenHeight()/2 - 20 * Defines.BASE_SCALE));

        var optionSize = optionChallenge.getContentSize();

        var btnChallenge = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("map_btn_challenge_three_nor.png"),
            cc.Sprite.createWithSpriteFrameName("map_btn_challenge_three_sel.png"),
            this._btnChallengeCallback, this);
        btnChallenge.setPosition(cc.p(optionSize.width/2, 10 * Defines.BASE_SCALE));

        var optionMenu = cc.Menu.create(btnChallenge);
        optionMenu.setPosition(cc.p(0, 0));
        optionChallenge.addChild(optionMenu);

        //求助好友
        var optionFriends = cc.Sprite.createWithSpriteFrameName("map_space_option_1.png");
        this.getWindow().addChild(optionFriends);
        optionFriends.setPosition(cc.p(_ScreenWidth()/2, _ScreenHeight()/2 - 20 * Defines.BASE_SCALE));

        optionSize = optionFriends.getContentSize();

        var btnFriends = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("map_btn_ask_help_nor.png"),
            cc.Sprite.createWithSpriteFrameName("map_btn_ask_help_sel.png"),
            this._btnAskHelpCallback, this);
        btnFriends.setPosition(cc.p(optionSize.width/2, 10 * Defines.BASE_SCALE));

        optionMenu = cc.Menu.create(btnFriends);
        optionMenu.setPosition(cc.p(0, 0));
        optionFriends.addChild(optionMenu);

        //购买
        var optionBuy = cc.Sprite.createWithSpriteFrameName("map_space_option_2.png");
        this.getWindow().addChild(optionBuy);
        optionBuy.setPosition(cc.p(_ScreenWidth()/2 + 250 * Defines.BASE_SCALE, _ScreenHeight()/2 - 20 * Defines.BASE_SCALE));

        optionSize = optionFriends.getContentSize();

        var buttonBuy = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_temp_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_temp_sel.png"),
            this._btnBuyCallback, this);
        buttonBuy.setPosition(cc.p(optionSize.width/2, 10 * Defines.BASE_SCALE));

        optionMenu = cc.Menu.create(buttonBuy);
        optionMenu.setPosition(cc.p(0, 0));
        optionBuy.addChild(optionMenu);

        if (_UnlockNewStar_ByRMB && (Defines.IS_KO ? false : true))
        {
            var spriteCurrency = cc.Sprite.createWithSpriteFrameName("general_rmb.png");
            buttonBuy.addChild(spriteCurrency);
            spriteCurrency.setPositionY(buttonBuy.getContentSize().height * 0.55);

            var labelPrice = GUI.createNumberLabel(
                GUI.SHOP_DATA.SHOP_DATA_UNLOCK_NEW_ZONE[0].TOTAL_PRICE.get(), _GUIPath + "Num/num_12_28x40.png", 28, 40, ".");
            buttonBuy.addChild(labelPrice);
            labelPrice.setPositionY(buttonBuy.getContentSize().height * 0.55);

            GUI.autoLayoutX([spriteCurrency, labelPrice], buttonBuy.getContentSize().width, 0);
        }
        else
        {
            var diamondImg = cc.Sprite.createWithSpriteFrameName("general_diamond_2.png");
            buttonBuy.addChild(diamondImg);
            diamondImg.setScale(1.2);
            diamondImg.setPositionY(buttonBuy.getContentSize().height * 0.55);

            var diamond = Defines.DIAMOND_PAY.UNLOCK_NEW_STAR;
            var number = GUI.createNumberLabel(diamond.toString(), _GUIPath + "Num/num_12_28x40.png", 28, 40, ".");
            buttonBuy.addChild(number);
            number.setPositionY(buttonBuy.getContentSize().height * 0.55);

            GUI.autoLayoutX([diamondImg, number], buttonBuy.getContentSize().width, 0);
        }

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(_ScreenWidth() - 50 * Defines.BASE_SCALE, _ScreenHeight() - 50 * Defines.BASE_SCALE));

        //
        var closeMenu = cc.Menu.create(buttonClose);
        closeMenu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(closeMenu);

        //运营商无社交
        //韩国版暂时没有
        if (isTelcomOperators() || Defines.IS_KO)
        {
            optionFriends.setVisible(false);
            optionChallenge.setPositionX(_ScreenWidth()/2 - 150 * Defines.BASE_SCALE);
            optionBuy.setPositionX(_ScreenWidth()/2 + 150 * Defines.BASE_SCALE);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnChallengeCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        this.closeWindow();
        var myScene = cc.Director.getInstance().getRunningScene();
        cc.GUIMapCoke.getInstance().openWindow(myScene, this.m_CurMapDefine);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnAskHelpCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
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
    _btnBuyCallback: function()
    {
        //
        cc.AudioMng.getInstance().playButtonSound(true);
        var myScene = cc.Director.getInstance().getRunningScene();

        //
        if (_UnlockNewStar_ByRMB && (Defines.IS_KO ? false : true))
        {
            var shopData = GUI.SHOP_DATA.SHOP_DATA_UNLOCK_NEW_ZONE[0];
            if (Defines._NeedPayConfirm())
            {
                this.closeWindow();
                cc.GUIBuyPrompt.getInstance().openWindow(myScene, shopData);
            }
            else
            {
                _Pay_ByRMB(shopData);
            }
        }
        else
        {
            var needDiamond = Defines.DIAMOND_PAY.UNLOCK_NEW_STAR;
            if (cc.DataMng.getInstance().canSpendMoney(needDiamond))
            {
                cc.DataMng.getInstance().spendMoney(needDiamond, MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_NEW_PLANT); //解锁新星球
                cc.GUIMapMng.getInstance().unlockNewZone();
                BIMng.getBIDiamond().logDiamondCost_NewZone();
            }
            else
            {
                this.closeWindow();
                cc.GUIBuyDiamond.getInstance().openWindow(myScene, needDiamond, GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND);
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        this.closeWindow();
        cc.GUIMap.getInstance().setZonesEnabled(true);
        cc.GUIMap.getInstance().handleMapEnterAction(true);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyLoginFinish: function()
    {
        if (this.isWindowOpen())
        {
            cc.log("GUIMapSpaceOption：覆盖数据后，关闭窗口");
            this._btnCloseCallback();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, curMapDefine)
    {
        this._super(render);

        this.m_CurMapDefine = curMapDefine;
        this.addContent();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();
        this.getWindow().removeAllChildren(true);
        return this;
    }
});

cc.GUIMapSpaceOption._instance = null;
cc.GUIMapSpaceOption.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIMapSpaceOption();
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