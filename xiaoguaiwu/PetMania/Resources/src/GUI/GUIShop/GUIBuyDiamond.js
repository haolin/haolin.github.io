
//================================================ GUIBuyDiamond =====================================================
//
cc.GUIBuyDiamond = cc.GUIPopupWindow.extend ({

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
        this.m_buyPrice = 0;
        this.m_buyType = GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND;
        this.m_callback = null;
        this.m_candyLimitOpen = false;
    },

    isCandyLimitOpen: function(){
        var processLevelData = cc.DataMng.getInstance().getMaxProcessLevelData();

        var gameFailOpen = cc.GUIGameLevelEndFail.getInstance().isWindowOpen();
        var gameSuccessOpen = cc.GUIGameLevelEndWin.getInstance().isWindowOpen();
        if (gameFailOpen || gameSuccessOpen){
            return false;
        }

        return this.m_candyLimitOpen || (processLevelData.ID < 14);
    },

    //------------------------------------------------------------------------------------------------------------------
    addSpringContent: function(needCount)
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(blockLayer, -1);

        //
        var tempMain = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png");
        var srcSize = tempMain.getContentSize();

        var mainSize = cc.size(330 * Defines.BASE_SCALE + _ScreenCenter().x , 280 * Defines.BASE_SCALE+ _ScreenCenter().y);
        //
        var spriteTitle = cc.Sprite.createWithSpriteFrameName("girlFestival_title.png");
        this.getWindow().addChild(spriteTitle);
        spriteTitle.setPosition(cc.p(_ScreenCenter().x, _ScreenCenter().y + 180 * Defines.BASE_SCALE));

//        //
//        var spriteLeft = cc.Sprite.createWithSpriteFrameName("zhuangshi-chunjie.png");
//        this.getWindow().addChild(spriteLeft);
//        spriteLeft.setPosition(cc.p(_ScreenCenter().x -200 * Defines.BASE_SCALE, _ScreenCenter().y));
//        var spriteRight = cc.Sprite.createWithSpriteFrameName("zhuangshi-xianshi.png");
//        this.getWindow().addChild(spriteRight);
//        spriteRight.setPosition(cc.p(_ScreenCenter().x + 200 * Defines.BASE_SCALE, _ScreenCenter().y));
//        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(
            cc.p(_ScreenWidth()  - 50 * Defines.BASE_SCALE,
                _ScreenHeight()  - 40 * Defines.BASE_SCALE));

        //钻石内容

        var shopDataArr = GUI.getSpringFestivalDiamondPack();

        var diamondLeft = cc.Sprite.createWithSpriteFrameName("shop_cell_panel.png");
        diamondLeft.setPosition(cc.p(_ScreenCenter().x, _ScreenCenter().y));
        diamondLeft.setTag(shopDataArr.ID);
        this.getWindow().addChild(diamondLeft);

        var buttonHouseUp = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("button-mashangquqiang-up.png"),
            cc.Sprite.createWithSpriteFrameName("button-mashangquqiang-down.png"),
            this._btnBuyDiamondCallback, this);

        var currencySize = diamondLeft.getContentSize();
        buttonHouseUp.setPosition(cc.p(_ScreenCenter().x, _ScreenCenter().y - diamondLeft.getContentSize().height / 2));
		buttonHouseUp.setTag(shopDataArr.ID);
		
        var cellBuilder = new Shop_CellBuilder();
        cellBuilder.buildSpringCell(diamondLeft, shopDataArr);

        var discount = 83;
        cellBuilder.decorateCellDiscount(diamondLeft, shopDataArr.DISCOUNT,true);

        var menu = cc.GUIMenu.create(buttonHouseUp, buttonClose);
        menu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(menu);

        this.runBackgroundLightAction();
        return this;

    },

    runBackgroundLightAction: function()
    {
        //
        var rate = 0;
        var backgroundLight_0 = cc.Sprite.createWithSpriteFrameName("start_end_bg_light_0.png");
        this.getWindow().addChild(backgroundLight_0, -1);
        backgroundLight_0.setPosition(_ScreenCenter());
        backgroundLight_0.setScale(4);
        backgroundLight_0.setOpacity(0);

        //
        backgroundLight_0.runAction(cc.Sequence.create(
            cc.DelayTime.create(Defines.FPS * 20),
            cc.CallFunc.create(function(){
                backgroundLight_0.runAction(cc.FadeIn.create(0.6));
                backgroundLight_0.runAction(cc.RepeatForever.create(cc.RotateBy.create(18, 360)));
            })
        ));

        var backgroundLight_2 = cc.Sprite.createWithSpriteFrameName("start_end_bg_light_2.png");
        this.m_AnimationLayer.addChild(backgroundLight_2);
        backgroundLight_2.setPosition(_ScreenCenter());
        backgroundLight_2.setOpacity(0);

        var backgroundLight_3 = cc.Sprite.createWithSpriteFrameName("start_end_bg_light_3.png");
        backgroundLight_2.addChild(backgroundLight_3);
        var bgSize = backgroundLight_2.getContentSize();
        backgroundLight_3.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.5));
        backgroundLight_3.setOpacity(0);

        backgroundLight_2.runAction(cc.Sequence.create(
            cc.DelayTime.create(Defines.FPS * 20 * (rate + 1)),
            cc.FadeIn.create(0.01)
        ));

        backgroundLight_3.runAction(cc.Sequence.create(
            cc.DelayTime.create(Defines.FPS * 20 * (rate + 1)),
            cc.FadeIn.create(0.01)
        ));

        backgroundLight_2.runAction(cc.Sequence.create(
            cc.DelayTime.create(Defines.FPS * 20 * (rate + 1)),
            cc.ScaleTo.create(0.25, 6),
            cc.CallFunc.create(function(sender){
                sender.removeFromParent(true);
            })
        ));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function(needCount)
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(blockLayer, -1);

        //
        var spriteTitle = cc.Sprite.createWithSpriteFrameName("shop_label_big_discount.png");
        this.getWindow().addChild(spriteTitle);
        spriteTitle.setPosition(cc.p(_ScreenWidth()/2, _ScreenHeight()/2 + 160 * Defines.BASE_SCALE));

        //

        var levelData = cc.DataMng.getInstance().getCurLevelData();
        if (levelData && levelData.MODEL == Defines.TARGET_MODEL.MODEL_MINELOTTERY && needCount <= 100){
            var buttonClose = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
                cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
                this._btnCloseToEndCallback, this);

            buttonClose.setPosition(cc.p(_ScreenWidth() - 50 * Defines.BASE_SCALE, _ScreenHeight() - 40 * Defines.BASE_SCALE));
        }
        else {
            var buttonClose = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
                cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
                this._btnCloseCallback, this);

            buttonClose.setPosition(cc.p(_ScreenWidth() - 50 * Defines.BASE_SCALE, _ScreenHeight() - 40 * Defines.BASE_SCALE));
        }
        //钻石内容
        var shopDataArr = GUI.getExactDoubleDiamondShopData(needCount);

        //
        var diamondRight = cc.GUIMenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("shop_cell_panel.png"),
            this._btnBuyDiamondCallback, this);
        diamondRight.setPosition(cc.p(_ScreenWidth()/2, _ScreenHeight()/2 - 20 * Defines.BASE_SCALE));
        diamondRight.setTag(shopDataArr[1].ID);

        var cellBuilder = new Shop_CellBuilder();
        cellBuilder.buildCell(diamondRight, shopDataArr[1]);
        cellBuilder.decorateCellDiscount(diamondRight, shopDataArr[1].DISCOUNT);

        //
        var menu = cc.GUIMenu.create(diamondRight, buttonClose);
        menu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(menu);

        //old
        /*var tempMain = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png");
        var srcSize = tempMain.getContentSize();

        //
        this.m_MainUI = cc.Scale9Sprite.create(
            _GUIPath + "GUINewGeneral/general_back9.png",
            cc.rect(0, 0, srcSize.width, srcSize.height),
            cc.rect(srcSize.width * 0.3, srcSize.height * 0.3, srcSize.width * 0.4, srcSize.height * 0.4));

        //
        var mainSize = cc.size(630 * Defines.BASE_SCALE, 280 * Defines.BASE_SCALE);

        //
        this.m_MainUI.setContentSize(mainSize);
        this.getWindow().addChild(this.m_MainUI);
        this.m_MainUI.setPosition(_ScreenCenter());

        //
        var spriteTitle = cc.Sprite.createWithSpriteFrameName("shop_label_big_discount.png");
        this.m_MainUI.addChild(spriteTitle);
        spriteTitle.setPosition(cc.p(mainSize.width * 0.55, mainSize.height + 20 * Defines.BASE_SCALE));

        //
        var spriteMonster = cc.Sprite.createWithSpriteFrameName("Images_monster_4.png");
        this.m_MainUI.addChild(spriteMonster);
        spriteMonster.setPosition(cc.p(mainSize.width * 0.2, mainSize.height));
        spriteMonster.setScale(0.8);

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(
            cc.p(_ScreenWidth()/2 + mainSize.width/2 - 50 * Defines.BASE_SCALE,
                _ScreenHeight()/2 + mainSize.height/2 - 40 * Defines.BASE_SCALE));

        //钻石内容
        var shopDataArr = GUI.getExactDoubleDiamondShopData(needCount);

        var diamondLeft = cc.GUIMenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("shop_cell_panel.png"),
            //cc.Sprite.createWithSpriteFrameName("shop_cell_panel.png"),
            this._btnBuyDiamondCallback, this);
        diamondLeft.setPosition(cc.p(165 * Defines.BASE_SCALE, 120 * Defines.BASE_SCALE));
        diamondLeft.setTag(shopDataArr[0].ID);

        var cellBuilder = new Shop_CellBuilder();
        cellBuilder.buildCell(diamondLeft, shopDataArr[0]);
        cellBuilder.decorateCellDiscount(diamondLeft, shopDataArr[0].DISCOUNT);

        //
        var diamondRight = cc.GUIMenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("shop_cell_panel.png"),
            //cc.Sprite.createWithSpriteFrameName("shop_cell_panel.png"),
            this._btnBuyDiamondCallback, this);
        diamondRight.setPosition(cc.p(mainSize.width - 165 * Defines.BASE_SCALE, 120 * Defines.BASE_SCALE));
        diamondRight.setTag(shopDataArr[1].ID);

        cellBuilder.buildCell(diamondRight, shopDataArr[1]);
        cellBuilder.decorateCellDiscount(diamondRight, shopDataArr[1].DISCOUNT);

        //
        var menu = cc.GUIMenu.create(diamondLeft, diamondRight, buttonClose);
        menu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(menu);*/

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
    addContentForNewUI: function(needCount)
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(blockLayer, -1);
        var winSize = cc.Director.getInstance().getWinSize();
        blockLayer.setPosition(cc.p(0, -winSize.height * 0.1));
        this.getWindow().setPosition(cc.p(0, winSize.height * 0.1));
        //
        this.m_MainUI_01 = cc.Sprite.createWithSpriteFrameName("images_panel_newDiamondBuy03.png");
        this.getWindow().addChild(this.m_MainUI_01);
        this.m_MainUI_01.setScale(2);

        this.m_MainUI_01.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.5));//1.2
        var mainSize = this.m_MainUI_01.getContentSize();


        if (this.m_buyType == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND){
            this.addDiamondContent(needCount, winSize);
        }
        else if (this.m_buyType == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE){
            this.addLifeContent(winSize);
        }
        else if (this.m_buyType == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE){
            this.addContinueContent(winSize);
        }
        else if (this.m_buyType == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_HEART_LIMIT){
            this.addCandyPlusContent(winSize);
        }
//        //小怪物们
        var monster_pink = cc.Sprite.createWithSpriteFrameName("image_DiamondBuy_monster_01.png");
        this.getWindow().addChild(monster_pink);
        monster_pink.setPosition(cc.p(winSize.width * 0.35, winSize.height * 0.5 - 110 * Defines.BASE_SCALE));

        var monster_green = cc.Sprite.createWithSpriteFrameName("image_DiamondBuy_monster_04.png");
        this.getWindow().addChild(monster_green);
        monster_green.setPosition(cc.p(winSize.width * 0.41, winSize.height * 0.5 - 140 * Defines.BASE_SCALE));

        var monster_purple = cc.Sprite.createWithSpriteFrameName("image_DiamondBuy_monster_02.png");
        this.getWindow().addChild(monster_purple);
        monster_purple.setPosition(cc.p(winSize.width * 0.45, winSize.height * 0.5 - 147 * Defines.BASE_SCALE));

        var monster_orange = cc.Sprite.createWithSpriteFrameName("image_DiamondBuy_monster_06.png");
        this.getWindow().addChild(monster_orange);
        monster_orange.setPosition(cc.p(winSize.width * 0.34, winSize.height * 0.5 - 215 * Defines.BASE_SCALE));

        var monster_blue = cc.Sprite.createWithSpriteFrameName("image_DiamondBuy_monster_03.png");
        this.getWindow().addChild(monster_blue);
        monster_blue.setPosition(cc.p(winSize.width * 0.65, winSize.height * 0.5 - 210 * Defines.BASE_SCALE));

        var monster_red = cc.Sprite.createWithSpriteFrameName("image_DiamondBuy_monster_05.png");
        this.getWindow().addChild(monster_red);
        monster_red.setPosition(cc.p(winSize.width * 0.7, winSize.height * 0.5 - 210 * Defines.BASE_SCALE));

        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(winSize.width - 50 * Defines.BASE_SCALE, winSize.height* 0.9 - 50 * Defines.BASE_SCALE));

        var closeMenu = cc.Menu.create(buttonClose);
        closeMenu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(closeMenu);

        return this;
    },

    getDiamondShopData: function(needCount){
        var shopDataArr = GUI.getExactDiamondShopData(needCount); //获得目标data

        var recommendPrice = (Defines.OS.isiOS()) ? 30 : 20 ;
        this.m_buyPrice = shopDataArr.TOTAL_PRICE.get();
        if (this.m_buyPrice <= recommendPrice){
            shopDataArr = GUI.getExactShopDataByDiamond(recommendPrice);
            this.m_buyPrice = recommendPrice;
        }

        return shopDataArr;
    },

    addDiamondContent: function(needCount, winSize){
        var shopDataArr = this.getDiamondShopData(needCount);
        //买钻石送钻石的label

        var height_getDiamond = winSize.height * 0.5 + 185 * Defines.BASE_SCALE;
        var label_getDiamond = cc.Sprite.createWithSpriteFrameName("wenzi_huode.png");
        this.getWindow().addChild(label_getDiamond);
        label_getDiamond.setPosition(cc.p(winSize.width * 0.42, height_getDiamond));

        var labelBuyCount = GUI.createNumberLabel(
            shopDataArr.COUNT.get(),  _GUIPath + "Num/num_9_20x24.png", 20, 24, "0");
        labelBuyCount.setAnchorPoint(cc.p(0.5, 0.5));
        this.getWindow().addChild(labelBuyCount);
        labelBuyCount.setPosition(cc.p(winSize.width * 0.5, height_getDiamond));

        var text_getDiamond = cc.Sprite.createWithSpriteFrameName("wenzi_zuanshi.png");
        this.getWindow().addChild(text_getDiamond);
        text_getDiamond.setPosition(cc.p(winSize.width * 0.58, height_getDiamond));

        var  height_sendDiamond = winSize.height * 0.5 + 100 * Defines.BASE_SCALE;

        var image_sendDiamond = cc.Sprite.createWithSpriteFrameName("game_add_moves_back.png");
        this.getWindow().addChild(image_sendDiamond);
        image_sendDiamond.setPosition(cc.p(winSize.width * 0.5, height_sendDiamond));

        var label_sendDiamond = cc.Sprite.createWithSpriteFrameName("wenzi_zensong.png");
        this.getWindow().addChild(label_sendDiamond);
        label_sendDiamond.setPosition(cc.p(winSize.width * 0.38, height_sendDiamond));

        var labelGiftCount = GUI.createNumberLabel(
            shopDataArr.GIFT_COUNT.get(),  _GUIPath + "Num/num_12_28x40.png", 28, 40,".");
        labelGiftCount.setAnchorPoint(cc.p(0.5, 0.5));
        this.getWindow().addChild(labelGiftCount);
        labelGiftCount.setPosition(cc.p(winSize.width * 0.5, height_sendDiamond));

        if (Defines.IS_EN || Defines.IS_KO){
            text_getDiamond.setPosition(cc.p(winSize.width * 0.61, height_getDiamond));
            var text_sendDiamond = cc.Sprite.createWithSpriteFrameName("wenzi_da.png");
        }
        else {
            var text_sendDiamond = cc.Sprite.createWithSpriteFrameName("wenzi_zuanshida.png");
        }

        this.getWindow().addChild(text_sendDiamond);
        text_sendDiamond.setPosition(cc.p(winSize.width * 0.62, height_sendDiamond));
        //
        var backFrame = cc.Sprite.createWithSpriteFrameName("icon_diamond_7.png");//"bg-zuanshikuangchang.png");
        this.getWindow().addChild(backFrame);
        backFrame.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.46));
        backFrame.setScale(0.9);
        //
        var buttonConfirm = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_sel.png"),
            this._btnBuyDiamondCallback, this);
        buttonConfirm.setTag(shopDataArr.ID);
        buttonConfirm.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.5 - 210 * Defines.BASE_SCALE));

        //
        var buyMenu = cc.Menu.create( buttonConfirm);
        buyMenu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(buyMenu);
    },

    addLifeContent: function(winSize){
        var shopDataArr = this.getHeartData(); //获得目标data
         //买糖送糖的label

        var height_getDiamond = winSize.height * 0.5 + 185 * Defines.BASE_SCALE;
        var label_getDiamond = cc.Sprite.createWithSpriteFrameName("wenzi_huode.png");
        this.getWindow().addChild(label_getDiamond);
        label_getDiamond.setPosition(cc.p(winSize.width * 0.42, height_getDiamond));

        var labelBuyCount = GUI.createNumberLabel(
            shopDataArr.COUNT.get(),  _GUIPath + "Num/num_9_20x24.png", 20, 24, "0");
        labelBuyCount.setAnchorPoint(cc.p(0.5, 0.5));
        this.getWindow().addChild(labelBuyCount);
        labelBuyCount.setPosition(cc.p(winSize.width * 0.5, height_getDiamond));

        var text_getDiamond = cc.Sprite.createWithSpriteFrameName("wenzi_bohetang.png");
        this.getWindow().addChild(text_getDiamond);
        text_getDiamond.setPosition(cc.p(winSize.width * 0.58, height_getDiamond));

        var  height_sendDiamond = winSize.height * 0.5 + 100 * Defines.BASE_SCALE;

        var image_sendDiamond = cc.Sprite.createWithSpriteFrameName("game_add_moves_back.png");
        this.getWindow().addChild(image_sendDiamond);
        image_sendDiamond.setPosition(cc.p(winSize.width * 0.5, height_sendDiamond));

        var label_sendDiamond = cc.Sprite.createWithSpriteFrameName("wenzi_zensong.png");
        this.getWindow().addChild(label_sendDiamond);
        label_sendDiamond.setPosition(cc.p(winSize.width * 0.38, height_sendDiamond));

        var labelGiftCount = GUI.createNumberLabel(
            shopDataArr.GIFT_COUNT.get(),  _GUIPath + "Num/num_12_28x40.png", 28, 40,".");
        labelGiftCount.setAnchorPoint(cc.p(0.5, 0.5));
        this.getWindow().addChild(labelGiftCount);
        labelGiftCount.setPosition(cc.p(winSize.width * 0.5, height_sendDiamond));

        if (Defines.IS_EN || Defines.IS_KO){
            text_getDiamond.setPosition(cc.p(winSize.width * 0.6, height_getDiamond));
            var text_sendDiamond = cc.Sprite.createWithSpriteFrameName("wenzi_da.png");
        }
        else {
            var text_sendDiamond = cc.Sprite.createWithSpriteFrameName("wenzi_bohetangda.png");
        }
        this.getWindow().addChild(text_sendDiamond);
        text_sendDiamond.setPosition(cc.p(winSize.width * 0.62, height_sendDiamond));
        //
        var backFrame = cc.Sprite.createWithSpriteFrameName("icon_heart_4.png");//bg-zuanshikuangchang.png");
        this.getWindow().addChild(backFrame);
        backFrame.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.46));
        backFrame.setScale(1.4);
        //
        var buttonConfirm = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_sel.png"),
            this._buyHeartsCallback, this);
        buttonConfirm.setTag(shopDataArr.ID);
        buttonConfirm.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.5 - 210 * Defines.BASE_SCALE));

        //
        var buyMenu = cc.Menu.create( buttonConfirm);
        buyMenu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(buyMenu);
    },

    addContinueContent: function( winSize){
        var shopDataArr = this.getContinueData();
        //买继续游戏包的label
        var height_getDiamond = winSize.height * 0.5 + 185 * Defines.BASE_SCALE;
		if (!Defines.IS_EN && !Defines.IS_KO){
	        var labelStorage = cc.LabelTTF.create("继续游戏机会4送1！", Defines.DefaultFont, 25 * Defines.BASE_SCALE);
			this.getWindow().addChild(labelStorage);
			labelStorage.setPosition(cc.p(winSize.width * 0.5, height_getDiamond));
		}

        var  height_sendDiamond = winSize.height * 0.5 + 105 * Defines.BASE_SCALE;
        var image_sendDiamond = cc.Sprite.createWithSpriteFrameName("wenzi_mashangjixubao.png");
        this.getWindow().addChild(image_sendDiamond);
        image_sendDiamond.setPosition(cc.p(winSize.width * 0.5, height_sendDiamond));


        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        this.m_MoveModel =
            curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_TIME &&
                curLevelData.MODEL_MIX != Defines.TARGET_MODEL.MODEL_TIME;
        var movesFileName = this.m_MoveModel ? "game_add_moves_five.png" : "game_add_time_fifteen.png";

//        for (var i = -2; i< 3; i ++){
		var i = 0;
        var backFrame = cc.Sprite.createWithSpriteFrameName("game_add_moves_back.png");
        this.getWindow().addChild(backFrame);
        backFrame.setPosition(cc.p(winSize.width * 0.5 + i * backFrame.getContentSize().width * 0.25, winSize.height * 0.46));

        var spriteMoves = cc.Sprite.createWithSpriteFrameName(movesFileName);
        this.getWindow().addChild(spriteMoves);
        spriteMoves.setPosition(cc.p(winSize.width * 0.5 + i * backFrame.getContentSize().width * 0.25, winSize.height * 0.46));

        var en_Offset = 0;

        if (Defines.IS_EN){
            en_Offset = backFrame.getContentSize().width * 0.2;
        }

        var labelCen = cc.LabelTTF.create("X", Defines.DefaultFont, 30 * Defines.BASE_SCALE);
        this.getWindow().addChild(labelCen);
        labelCen.setColor(cc.c3b(212,62,10));
        labelCen.setPosition(cc.p(winSize.width * 0.5 + backFrame.getContentSize().width * 0.7 + en_Offset, winSize.height * 0.46));

        var labelFive = cc.LabelTTF.create("5", Defines.DefaultFont, 38 * Defines.BASE_SCALE);
        this.getWindow().addChild(labelFive);
        labelFive.setColor(cc.c3b(212,62,10));
        labelFive.setPosition(cc.p(winSize.width * 0.5 + backFrame.getContentSize().width * 0.9 + en_Offset, winSize.height * 0.46));


        var buttonConfirm = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_sel.png"),
            this._buyContinueCallback, this);
        buttonConfirm.setTag(shopDataArr.ID);
        buttonConfirm.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.5 - 210 * Defines.BASE_SCALE));

        //
        var buyMenu = cc.Menu.create( buttonConfirm);
        buyMenu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(buyMenu);
    },

    addCandyPlusContent: function( winSize){
        var shopDataArr = Tools.clone(GUI.SHOP_DATA.SHOP_DATA_HEART_LIMIT[0]);
        //买薄荷糖加一的label

        var  height_sendDiamond = winSize.height * 0.5 + 105 * Defines.BASE_SCALE;

        var image_sendDiamond = cc.Sprite.createWithSpriteFrameName("wenzi_bohetangshangxianplus.png");
        this.getWindow().addChild(image_sendDiamond);
        image_sendDiamond.setPosition(cc.p(winSize.width * 0.5, height_sendDiamond));

        var backFrame = cc.Sprite.createWithSpriteFrameName("icon_heart_5.png");
        this.getWindow().addChild(backFrame);
        backFrame.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.46));
        backFrame.setScale(0.9);

        var buttonConfirm = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_sel.png"),
            this._btnBuyDiamondCallback, this);
        buttonConfirm.setTag(shopDataArr.ID);
        buttonConfirm.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.5 - 210 * Defines.BASE_SCALE));

        //
        var buyMenu = cc.Menu.create( buttonConfirm);
        buyMenu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(buyMenu);

        this.m_candyLimitOpen = true;
    },
    //------------------------------------------------------------------------------------------------------------------
    getHeartData: function()
    {
        return GUI.SHOP_DATA.SHOP_DATA_LIFE[3];
    },

    //------------------------------------------------------------------------------------------------------------------
    getContinueData: function()
    {
        return GUI.SHOP_DATA.SHOP_DATA_CONTINUE[0];
    },


    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback:function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        this.closeWindow();


        if (this.m_buyType == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE){
            cc.GUIGameOutMoves.getInstance().openWindow(_GUILayer());
        }
        else if (this.m_buyType != GUI.SHOP_ITEM_TYPE.SHOP_ITEM_HEART_LIMIT){
            cc.GUISimpleShop.getInstance().openWindow(_GUILayer(), this.m_buyType, this.m_buyPrice);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCloseToEndCallback:function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        var levelData = cc.DataMng.getInstance().getCurLevelData();
        var mineDesLine = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterDiamond");
		var mineDesLine_nor = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterMine");
		mineDesLine = (mineDesLine + mineDesLine_nor) || 0;
		cc.DataMng.getInstance().setCurLevelDiamondBonus(mineDesLine);
        cc.DataMng.getInstance().addMoney(mineDesLine, MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_GAME_WIN);//游戏胜利
        cc.GUITaskKakao.getInstance().addTaskScore(Task.TaskID.DAILY_BUY_DIAMOND,1);
        cc.DataMng.getInstance().closeNotifyGUIObservers(NOTIFY_EVENT.FOR_MONEY);

        BIMng.getBIDiamond().logDiamondIncome_LevelWin(this.m_DiamondBonus);
        cc.GUIGameLevelEndWin.getInstance().setLevelData(levelData);
//        this.playLeaveAction(
//            function()
//            {
                this.closeWindow();
                Scene_MainMap.changeTo(cc.GUIGameLevelEndWin.getInstance());
//            }
//        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnBuyDiamondCallback: function(sender)
    {
        cc.log("pay button press");
        cc.AudioMng.getInstance().playButtonSound(true);

        var shopID = sender.getTag();
        var shopData = _GetShopDataByID(shopID);

        //
        var myScene = this.getWindow().getParent();
        this.closeWindow();

        //电信的有二次确认
        if (Defines._NeedPayConfirm())
        {
            cc.GUIBuyPrompt.getInstance().openWindow(myScene, shopData, true);
            return this;
        }

        //
        _Pay_ByRMB(shopData);

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    _buyHeartsCallback: function(sender)
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        var shopID = sender.getTag();
        var shopData = _GetShopDataByID(shopID);
        var myScene = this.getWindow().getParent();
        if (_CheckUpperLimit_Heart(shopData) || _CheckUpperLimit_HeartRecover(shopData))
        {
            _MsgView_BuyUpperLimit();
            return this;
        }
        //
        if (shopData.CURRENCY == GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB)
        {
            if (Defines._NeedPayConfirm())
            {
                cc.GUIBuyPrompt.getInstance().openWindow(myScene, shopData);
            }
            else
            {
                _Pay_ByRMB(shopData);
            }

            return this;
        }

        //钻石购买部分
        if (shopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE)
        {
            this._buyHeartsByDiamond(shopData);
        }
        else if (shopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_HEART_LIMIT)
        {
            this._buyHeartLimitByDiamond(shopData);
        }

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    _buyContinueCallback: function(sender)
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        var shopID = sender.getTag();
        var shopData = _GetShopDataByID(shopID);
        var myScene = this.getWindow().getParent();

        if (cc.DataMng.getInstance().canSpendMoney(shopData.TOTAL_PRICE.get()))
        {
//        //            cc.GUIBuyDiamond.getInstance().openWindow(myScene, this.m_ShopData.TOTAL_PRICE.get());
            //
            cc.DataMng.getInstance().spendMoney(shopData.TOTAL_PRICE.get(), MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_IN_SHOP, {"id": shopData.ID});//商店购买
            cc.DataMng.getInstance().addGameContinueCount(shopData.COUNT.get() + shopData.GIFT_COUNT.get());
            BIMng.getInstance().logPayByDiamond(shopData);
            this.openOutMovesCallBack();
            this.closeWindow();
//            return false;
        }
        else {
            //直接购买钻石
            var shopDataArr = this.getDiamondShopData(shopData.TOTAL_PRICE.get());
            //
            var myScene = this.getWindow().getParent();

            //电信的有二次确认
            if (Defines._NeedPayConfirm())
            {
                cc.GUIBuyPrompt.getInstance().openWindow(myScene, shopDataArr);
                return this;
            }

            _Pay_ByRMB(shopDataArr);
        }

        return this;
    },

    openOutMovesCallBack: function(){
//        var myScene = this.getWindow().getParent();
        cc.GUIGameOutMoves.getInstance().openWindow(_GUILayer());

    },

    //------------------------------------------------------------------------------------------------------------------
    _buyHeartsByDiamond: function(shopData)
    {
        var needDiamond = shopData.TOTAL_PRICE.get();
        var myScene = this.getWindow().getParent();

        if (cc.DataMng.getInstance().canSpendMoney(needDiamond))
        {
            cc.DataMng.getInstance().spendMoney(needDiamond, MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_IN_SHOP, {"id": shopData.ID}); //商店购买
            var addCount = shopData.COUNT.get() + shopData.GIFT_COUNT.get();
            cc.DataMng.getInstance().addHeart(addCount);
            cc.GUITaskKakao.getInstance().addTaskScore(Task.TaskID.DAILY_BUY_HEART,1);

            cc.GUIBuySuccess.getInstance().openWindow(myScene, shopData);
            BIMng.getInstance().logPayByDiamond(shopData);
        }
        else
        {
            cc.GUIBuyDiamond.getInstance().openWindow(myScene, needDiamond, GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND);
//            cc.GUIBuyDiamond.getInstance().openWindow(myScene, needDiamond);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _buyHeartLimitByDiamond: function(shopData)
    {
        var needDiamond = shopData.TOTAL_PRICE.get();
        var myScene = this.getWindow().getParent();

        if (cc.DataMng.getInstance().canSpendMoney(needDiamond))
        {
            cc.DataMng.getInstance().spendMoney(needDiamond, MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_IN_SHOP, {"id": shopData.ID});
            var addCount = shopData.COUNT.get();
            cc.DataMng.getInstance().addHeartRecoverMax(addCount);

            cc.GUIBuySuccess.getInstance().openWindow(myScene, shopData);
            BIMng.getInstance().logPayByDiamond(shopData);
        }
        else
        {
            cc.GUIBuyDiamond.getInstance().openWindow(myScene, needDiamond, GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND);
//            cc.GUIBuyDiamond.getInstance().openWindow(myScene, needDiamond);
        }

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, needCount, needType, _callback)
    {
        cc.log("GUI BuyDiamond call");
        this.m_callback = _callback;
        if (isCM() && Tools.compareDateNow(Defines.CM_PAY_PROMPT))
        {
            var shopData = GUI.getExactDiamondShopData(needCount);

            if (needType == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE){
                var curLevelData = cc.DataMng.getInstance().getCurLevelData();
                this.m_MoveModel =
                    curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_TIME &&
                        curLevelData.MODEL_MIX != Defines.TARGET_MODEL.MODEL_TIME;
                shopData = this.m_MoveModel ? GUI.SHOP_DATA.SHOP_DATA_MOVES[0] : GUI.SHOP_DATA.SHOP_DATA_TIME[0];
            }
            cc.log("shopData.price= " + shopData.TOTAL_PRICE.get());

            if (needType != GUI.SHOP_ITEM_TYPE.SHOP_ITEM_HEART_LIMIT){
                _Pay_ByRMB(shopData);
            }

            return this;
        }
        this.m_buyType = needType;
        //
        this._super(render);

        cc.ResourceMng.getInstance().addToCache(
            Resource._GUIDiamondBuy_plist,
            Resource._GUIDiamondBuy_png);

        //
        this.m_AnimationLayer = cc.Layer.create();
        this.getWindow().getParent().addChild(this.m_AnimationLayer, 10000);

        cc.AudioMng.getInstance().playOpenWindow();
        this.getWindow().removeAllChildren(true);

        Defines._CanPayDiamond() ? this.addContentForNewUI(needCount) : this.addContentForTelcomOperators();
//
//        //
//        if (cc.DataMng.getInstance().isSpringFestival())
//        {
//            cc.ResourceMng.getInstance().addToCache(
//                Resource._GUIGameLevel_Start_EndWin_EndFail_plist,
//                Resource._GUIGameLevel_Start_EndWin_EndFail_png);
//
//            Defines._CanPayDiamond() ? this.addSpringContent(needCount) : this.addContentForTelcomOperators();
//        }
//        else
//        {
//            Defines._CanPayDiamond() ? this.addContent(needCount) : this.addContentForTelcomOperators();
//        }

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
        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUIDiamondBuy_plist,
            Resource._GUIDiamondBuy_plist);

        //春节活动相关  不判断强行删除
        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUIGameLevel_Start_EndWin_EndFail_plist,
            Resource._GUIGameLevel_Start_EndWin_EndFail_png);

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
};