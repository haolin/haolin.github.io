//================================================ GUIGameActivate =====================================================
cc.GUIGameActivate = cc.GUIWindow.extend ({

    description: function ()
    {
        return "GUIGameActivate";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        this.m_MainUI = null;
        this.m_ButtonClose = null;
        this.m_ButtonActivate = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function ()
    {
        this._super();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function ()
    {
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
        var labelTitle = cc.LabelTTF.create("正版激活", Defines.DefaultFont, 25 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelTitle);
        labelTitle.setPosition(cc.p(mainSize.width * 0.5, mainSize.height - 38 * Defines.BASE_SCALE));

        //
        var labelDesc = cc.LabelTTF.create("是否正版激活？", Defines.DefaultFont, 18 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelDesc);
        labelDesc.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.55));

        //
		this.m_ButtonActivate = cc.MenuItemSprite.create(
			cc.Sprite.createWithSpriteFrameName("general_btn_temp_nor.png"),
			cc.Sprite.createWithSpriteFrameName("general_btn_temp_sel.png"),
			this._btnActivateCallback, this);
		this.m_ButtonActivate.setPosition(cc.p(mainSize.width * 0.5, 45 * Defines.BASE_SCALE));

        //
        var spriteCurrency = cc.Sprite.createWithSpriteFrameName("general_rmb.png");
        this.m_ButtonActivate.addChild(spriteCurrency);
        spriteCurrency.setAnchorPoint(cc.p(0, 0.5));

        //
        var shopData = GUI.SHOP_DATA.SHOP_DATA_ACTIVATE[0];
        var labelPrice = GUI.createNumberLabel(
            shopData.TOTAL_PRICE.get(), _GUIPath + "Num/num_12_28x40.png", 28, 40, ".");
        this.m_ButtonActivate.addChild(labelPrice);
        labelPrice.setAnchorPoint(cc.p(0, 0.5));

        //
        var buttonBuySize = this.m_ButtonActivate.getContentSize();
        var currencySize = spriteCurrency.getContentSize();
        var labelPriceSize = labelPrice.getContentSize();
        var toSide = (buttonBuySize.width - currencySize.width - labelPriceSize.width) * 0.5;

        //
        spriteCurrency.setPosition(cc.p(toSide, buttonBuySize.height * 0.55));
        labelPrice.setPosition(cc.p(toSide + currencySize.width, buttonBuySize.height * 0.55));
		
		
		this.m_ButtonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        this.m_ButtonClose.setPosition(cc.p(mainSize.width - 25 * Defines.BASE_SCALE, mainSize.height - 25 * Defines.BASE_SCALE));
		
        //
        var menu = cc.Menu.create(this.m_ButtonClose, this.m_ButtonActivate);
        menu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(menu);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback:function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        this.playLeaveAction(function()
        {
            //
            _ChangeGameLevelStateTo(cc.State_GameLevel.getInstance());

            //
            cc.DataMng.getInstance().setGameLevelResult(Defines.GAME_RESULT.RESULT_FAILED);
            _ChangeGameLevelStateTo(cc.State_GameFail.getInstance());
        });

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnActivateCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //支付成功后，在支付成功的回调中关闭窗口
        //this.closeWindow();

        var shopData = GUI.SHOP_DATA.SHOP_DATA_ACTIVATE[0];

        //
        if (Defines._NeedPayConfirm())
        {
            var myScene = this.getWindow().getParent();
            cc.GUIBuyPrompt.getInstance().openWindow(myScene, shopData);
            return this;
        }

        //
        _Pay_ByRMB(shopData);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playEnterAction: function(event)
    {
        var winSize = cc.Director.getInstance().getWinSize();

        var mainSize = this.m_MainUI.getContentSize();
        var mainUIToPosition = cc.p(winSize.width * 0.5, winSize.height * 0.5);
        var mainUIFromPosition = cc.p(winSize.width * 0.5, winSize.height + mainSize.height * 0.5);
        this.m_MainUI.setPosition(mainUIFromPosition);
        this.m_MainUI.stopAllActions();
        this.m_MainUI.runAction(cc.Sequence.create(
            cc.EaseElasticOut.create(cc.MoveTo.create(Defines.FPS * 30, mainUIToPosition), 0.6),
            cc.CallFunc.create(event, this)));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playLeaveAction: function(event)
    {
        var winSize = cc.Director.getInstance().getWinSize();

        var mainSize = this.m_MainUI.getContentSize();
        var mainUIToPosition = cc.p(winSize.width * 0.5, winSize.height + mainSize.height * 0.5);
        this.m_MainUI.stopAllActions();
        this.m_MainUI.runAction(cc.Sequence.create(
            cc.MoveTo.create(Defines.FPS * 10, mainUIToPosition),
            cc.CallFunc.create(event, this)));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyOpenWindow: function(window)
    {
        if (window instanceof cc.GUIBuyPrompt)
        {
            this.getWindow().setVisible(false);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyCloseWindow: function(window)
    {
        if (window instanceof cc.GUIBuyPrompt)
        {
            this.getWindow().setVisible(true);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);

        //
        cc.AudioMng.getInstance().playOpenWindow();

        //
		this.addContent();
        this.playEnterAction();

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

cc.GUIGameActivate._instance = null;
cc.GUIGameActivate.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIGameActivate();
        this._instance.init();
    }

    return this._instance;
};