
//============================================= GUINewPlayerPack =================================================
cc.GUINewPlayerPack = cc.GUIPopupWindow.extend ({

    description: function ()
    {
        return "GUINewPlayerPack";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();
        this.m_MainUI = null;
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

//        //
//        var priceFiles = {
//            "1": "map_label_new_pack_1.png",
//            "5": "map_label_new_pack_0.png",
//            "6": "map_label_new_pack_0.png",
//            "0.99": "map_label_new_pack_0.png", /*英文版*/
//            "3300" : "map_label_new_pack_0.png"
//        };

//        var packPrice = GUI.SHOP_DATA.SHOP_DATA_NEW[0].TOTAL_PRICE.get();
//        var titleFile = priceFiles[packPrice];
        var labelTitle = cc.Sprite.createWithSpriteFrameName("map_label_new_pack_0.png");
        this.m_MainUI.addChild(labelTitle);
        var titleOffset = Defines.IS_EN ? cc.p(-15 * Defines.BASE_SCALE, 0) : cc.p(0, 0);
        labelTitle.setPosition(cc.pAdd(cc.p(mainSize.width * 0.5, mainSize.height * 0.9), titleOffset));

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(mainSize.width - 25 * Defines.BASE_SCALE, mainSize.height - 25 * Defines.BASE_SCALE));

        //
        var buttonBuy = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_buy_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_buy_sel.png"),
            this._btnBuyCallback, this);
        buttonBuy.setPosition(cc.p(mainSize.width * 0.5, 45 * Defines.BASE_SCALE));

        //
        var buyMenu = cc.Menu.create(buttonClose, buttonBuy);
        buyMenu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(buyMenu);
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentForNor: function()
    {
        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        var newPackLogo = cc.Sprite.createWithSpriteFrameName("image_panel_libao.png");
        this.m_MainUI.addChild(newPackLogo);
        newPackLogo.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.6));

//        //
//        var priceFiles = {
//            "1": "map_new_pack_price_0.png",
//            "5": "map_new_pack_price_1.png",
//            "6": "map_new_pack_price_2.png",
//            "0.99": "map_new_pack_price_2.png" /*英文版*/
//        };

        //
//        var packPrice = GUI.SHOP_DATA.SHOP_DATA_NEW[0].TOTAL_PRICE.get();
//        var priceFile = "wenzi_jiazhi.png";
//        var spritePrice = cc.Sprite.createWithSpriteFrameName(priceFile);
//        this.m_MainUI.addChild(spritePrice);
//        spritePrice.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.70));

//        var priceTextImg = cc.Sprite.createWithSpriteFrameName("wenzi_jihuijinciyici.png");
//        this.m_MainUI.addChild(priceTextImg);
//        priceTextImg.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.65));

        var strDes = "";
        if(Defines.IS_KO)
        {
            strDes = GUI.SHOP_DATA.SHOP_DATA_NEW[0].PUSH ? GUI.SHOP_DATA.SHOP_DATA_NEW[0].PUSH :Resource.ChineseTxt["new_pack"];
        }
        else
        {
            strDes = Resource.ChineseTxt["new_pack"];
        }
        var promptLabel = cc.LabelTTF.create(strDes, Defines.DefaultFont, 18 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(promptLabel);
        promptLabel.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.4));
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback:function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        this.closeWindow();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnBuyCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        var shopData = GUI.SHOP_DATA.SHOP_DATA_NEW[0];
        _Pay_ByRMB(shopData/*, true*/);

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
        this.addContentForNor();

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

cc.GUINewPlayerPack._instance = null;
cc.GUINewPlayerPack.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUINewPlayerPack();
        this._instance.init();
    }

    return this._instance;
};