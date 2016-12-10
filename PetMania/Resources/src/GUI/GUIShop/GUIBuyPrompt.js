/**
 * 目前只有钻石不足的情况
 */
//================================================ GUIBuyPrompt =====================================================
//
cc.GUIBuyPrompt = cc.GUIPopupWindow.extend ({

    description: function ()
    {
        return "GUIBuyPrompt";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        this.m_MainUI = null;

        this.m_ShopData = null;
        this.m_ForceOther = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    addMainContent: function()
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

        //是否购买中包薄荷糖 是否购买5个横竖消
//        var titleNum = (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_ITEM) ? (this.m_ShopData.COUNT.get() + "个") : "";
//        var labelName = cc.LabelTTF.create("是否购买" + titleNum + this.m_ShopData.NAME + "？", Defines.DefaultFont, 25 * Defines.BASE_SCALE);
        var labelName = cc.LabelTTF.create("아이템 구입", Defines.DefaultFont, 25 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelName);
        labelName.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.9));

        //
        var backFrame = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back5.png");
        this.m_MainUI.addChild(backFrame);
        backFrame.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.53));

        var currencyFile = Defines.OS.isiOS() ? "$" : "";

        if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND){
            var labelDescription = cc.LabelTTF.create("다이아\n" +  this.m_ShopData.COUNT.get() + "개를" + " " +currencyFile +
                this.m_ShopData.TOTAL_PRICE.get() +"\n" + "에 구입 하시겠습니까?", Defines.DefaultFont, 18 * Defines.BASE_SCALE);
            labelDescription.setPosition(cc.p(mainSize.width * 0.65 - 5 * Defines.BASE_SCALE, mainSize.height * 0.5));
            this.addContentForShop();
        }
        else {
            var labelDescription = cc.LabelTTF.create(this.m_ShopData.NAME + " 아이템을 구매 \n하시겠습니까? ", Defines.DefaultFont, 18 * Defines.BASE_SCALE);
            labelDescription.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.6));
            var labelDesColor = cc.LabelTTF.create("(구매하신 아이템은 \n환불이되지 않습니다.)", Defines.DefaultFont, 16 * Defines.BASE_SCALE);
            this.m_MainUI.addChild(labelDesColor);
            labelDesColor.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.6 - labelDescription.getContentSize().height / 2 - labelDesColor.getContentSize().height / 2 - 10 * Defines.BASE_SCALE));
        }

        this.m_MainUI.addChild(labelDescription);


        //
//        var currencyFile = this.m_ShopData.CURRENCY == GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB ?
//            "general_rmb.png" : "general_diamond_2.png";
//        var spriteCurrency = cc.Sprite.createWithSpriteFrameName(currencyFile);
//        this.m_MainUI.addChild(spriteCurrency);
//        spriteCurrency.setAnchorPoint(cc.p(0, 0.5));

        //
//        var labelPrice = GUI.createNumberLabel(
//            this.m_ShopData.TOTAL_PRICE.get(), _GUIPath + "Num/num_12_28x40.png", 28, 40, ".");
//        this.m_MainUI.addChild(labelPrice);
//        labelPrice.setAnchorPoint(cc.p(0, 0.5));

        //
        //var buttonBuySize = buttonBuy.getContentSize();
//        var currencySize = spriteCurrency.getContentSize();
//        var labelPriceSize = labelPrice.getContentSize();
//        var toSide = (mainSize.width - currencySize.width - labelPriceSize.width) * 0.5;
//
//        //
//        spriteCurrency.setPosition(cc.p(toSide, 60 * Defines.BASE_SCALE));
//        labelPrice.setPosition(cc.p(toSide + currencySize.width, 60 * Defines.BASE_SCALE));

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_cancel_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_cancel_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(mainSize.width * 0.72, 50 * Defines.BASE_SCALE));

        //
        var buttonBuy = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_sel.png"),
            this._btnBuyCallback, this);
        buttonBuy.setPosition(cc.p(mainSize.width * 0.28, 50 * Defines.BASE_SCALE));

        //
        var buyMenu = cc.Menu.create(buttonClose, buttonBuy);
        buyMenu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(buyMenu);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentForShop: function()
    {
        //
        var mainSize = this.m_MainUI.getContentSize();

        //
//        var labelDesc = cc.LabelTTF.create(this.m_ShopData.DESCRIPTION, Defines.DefaultFont, 18 * Defines.BASE_SCALE);
//        this.m_MainUI.addChild(labelDesc);
//        labelDesc.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.72));

        //
        var spriteItem = cc.Sprite.createWithSpriteFrameName(this.m_ShopData.SPRITE_SOURCE);
        this.m_MainUI.addChild(spriteItem);
        spriteItem.setPosition(cc.p(mainSize.width * 0.25, mainSize.height * 0.5));
        spriteItem.setScale(100 * Defines.BASE_SCALE / spriteItem.getContentSize().width);

        //
//        var labelCount = GUI.createNumberLabel(
//            this.m_ShopData.COUNT.get(), _GUIPath + "Num/num_9_20x24.png", 20, 24, "0");
//        this.m_MainUI.addChild(labelCount);
//        labelCount.setAnchorPoint(cc.p(1, 0.5));
//        labelCount.setPosition(cc.p(mainSize.width - 50 * Defines.BASE_SCALE, 140 * Defines.BASE_SCALE));
//
//        //var labelCountMulti = cc.Sprite.create(_GUIPath + "Num/num_9_x.png");
//        var labelCountMulti = cc.Sprite.createWithSpriteFrameName("general_label_buy.png");
//        this.m_MainUI.addChild(labelCountMulti);
//        labelCountMulti.setAnchorPoint(cc.p(1, 0.5));
//        labelCountMulti.setPosition(
//            cc.p(labelCount.getPosition().x - labelCount.getContentSize().width, 140 * Defines.BASE_SCALE));
//
//        //
//        if (this.m_ShopData.GIFT_COUNT && this.m_ShopData.GIFT_COUNT.get() > 0)
//        {
//            var spriteGift = null;
//            var labelGiftCount = null;
//            switch (this.m_ShopData.ITEM_TYPE)
//            {
//                case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND:
//                {
//                    spriteGift = cc.Sprite.createWithSpriteFrameName("general_label_gift_1.png");
//                    labelGiftCount = GUI.createNumberLabel(
//                        this.m_ShopData.GIFT_COUNT.get(), _GUIPath + "Num/num_10_16x20.png", 16, 20, "0");
//                }
//                    break;
//
//                case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE:
//                case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE:
//                {
//                    spriteGift = cc.Sprite.createWithSpriteFrameName("general_label_gift_2.png");
//                    labelGiftCount = GUI.createNumberLabel(
//                        this.m_ShopData.GIFT_COUNT.get(), _GUIPath + "Num/num_8_16x22.png", 16, 20, "0");
//                }
//                    break;
//
//                default :
//                    break;
//            }
//
//            if (spriteGift && labelGiftCount)
//            {
//                this.m_MainUI.addChild(spriteGift);
//                spriteGift.setAnchorPoint(cc.p(0, 0.5));
//
//                this.m_MainUI.addChild(labelGiftCount);
//                labelGiftCount.setAnchorPoint(cc.p(0, 0.5));
//
//                spriteGift.setPosition(cc.p(205 * Defines.BASE_SCALE, 110 * Defines.BASE_SCALE));
//                labelGiftCount.setPosition(
//                    cc.pAdd(spriteGift.getPosition(), cc.p(spriteGift.getContentSize().width, 0)));
//            }
//        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentForGame: function()
    {
        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        var addCount = cc.GUIGameOutMoves.getInstance().getAddCount();
        var giftItem = cc.GUIGameOutMoves.getInstance().getGiftItemData();
        var giftData = GUI.getShopDataWithItemID(giftItem.ID);
        var isAddMoves = (this.a.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_MOVES);

        //
        var descStr = "马上就要达成目标了？\n立刻增加" + addCount + (isAddMoves ? "步" : "秒") + "送3个" + giftData.NAME;
        var labelDesc = cc.LabelTTF.create(descStr, Defines.DefaultFont, 18 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelDesc);
        labelDesc.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.72));

        //
        var movesBackground = cc.Sprite.createWithSpriteFrameName("game_add_moves_back.png");
        this.m_MainUI.addChild(movesBackground);
        movesBackground.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.5));
        movesBackground.setScale(0.8);

        //
        var movesFileName = isAddMoves ?
            (addCount == 5 ? "game_add_moves_five.png" : "game_add_moves_ten.png") :
            (addCount == 15 ? "game_add_time_fifteen.png" : "game_add_time_thirty.png");
        var spriteMoves = cc.Sprite.createWithSpriteFrameName(movesFileName);
        this.m_MainUI.addChild(spriteMoves);
        spriteMoves.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.5));
        spriteMoves.setScale(0.8);

        //
        var labelGive = cc.Sprite.createWithSpriteFrameName("general_label_gift_0.png");
        this.m_MainUI.addChild(labelGive);
        labelGive.setPosition(cc.p(mainSize.width * 0.37, mainSize.height * 0.33));

        //
        var spriteItem = cc.Sprite.createWithSpriteFrameName(giftItem.SPRITESOURCE);
        this.m_MainUI.addChild(spriteItem);
        spriteItem.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.36));
        spriteItem.setScale(68/130);

        //
        var labelMulti = cc.Sprite.createWithSpriteFrameName("general_num_multi.png");
        labelMulti.setPosition(cc.p(mainSize.width * 0.57, mainSize.height * 0.33));
        this.m_MainUI.addChild(labelMulti);

        //
        var labelCount = GUI.createNumberLabel("3", _GUIPath + "Num/num_11_16x26.png", 16, 26, "0");
        labelCount.setAnchorPoint(cc.p(0, 0.5));
        labelCount.setPosition(cc.p(mainSize.width * 0.60, mainSize.height * 0.33));
        this.m_MainUI.addChild(labelCount, 1);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentForMap: function()
    {
        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        var labelDesc = cc.LabelTTF.create(this.m_ShopData.DESCRIPTION, Defines.DefaultFont, 18 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelDesc);
        labelDesc.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.72));

        //
        var spriteItem = cc.Sprite.createWithSpriteFrameName("map_space_station_nor.png");
        this.m_MainUI.addChild(spriteItem);
        spriteItem.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.5));

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
    _btnBuyCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        cc.log("GUIBuyPrompt _btnBuyCallback" + this.m_ForceOther);
        var needDiamond = this.m_ShopData.TOTAL_PRICE.get();
        if (this.m_ShopData.CURRENCY == GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB){
            cc.log("GUI call pay by rmb");
            _Pay_ByRMB(this.m_ShopData, true);
            this.closeWindow();
            return this;
        }

        if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE){

            cc.DataMng.getInstance().spendMoney(needDiamond, MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_IN_SHOP, {"id": this.m_ShopData.ID}); //商店购买
            var addCount = this.m_ShopData.COUNT.get() + this.m_ShopData.GIFT_COUNT.get();
            cc.DataMng.getInstance().addHeart(addCount);
            cc.GUITaskKakao.getInstance().addTaskScore(Task.TaskID.DAILY_BUY_HEART,1);

//            cc.GUIBuySuccess.getInstance().openWindow(myScene, this.m_ShopData);
        }
        else if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_HEART_LIMIT){
            cc.DataMng.getInstance().spendMoney(needDiamond, MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_IN_SHOP, {"id": this.m_ShopData.ID});
            var addCount = this.m_ShopData.COUNT.get();
            cc.DataMng.getInstance().addHeartRecoverMax(addCount);
        }
        else if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_FREE_CANDY){
            cc.DataMng.getInstance().spendMoney(needDiamond, MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_IN_SHOP, {"id": this.m_ShopData.ID});
			cc.DataMng.getInstance().setFreeCandyData(0);
			cc.DataMng.getInstance().buyItemByID(Defines.GameItems.ITEM_DIRECTION_EX.ID,3,0);
			cc.DataMng.getInstance().buyItemByID(Defines.GameItems.ITEM_COLORFUL_EX.ID,3,0);
        }
        else if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE){
            cc.DataMng.getInstance().spendMoney(this.m_ShopData.TOTAL_PRICE.get(), MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_IN_SHOP, {"id": this.m_ShopData.ID});//商店购买
            cc.DataMng.getInstance().addGameContinueCount(this.m_ShopData.COUNT.get() + this.m_ShopData.GIFT_COUNT.get());
        }
        else if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_SUPER)
        {
			cc.log("this.m_ShopData.SHOP_ITEM_SUPER TOTAL_PRICE.get() = " + this.m_ShopData.TOTAL_PRICE.get());
			var addFlag = false;
            for (var prop in Defines.GameItems)
            {
                if (Defines.GameItems.hasOwnProperty(prop))
                {
					cc.log("Defines.GameItems. = " + Defines.GameItems[prop].NAME);
					if (!addFlag){
						cc.DataMng.getInstance().buyItemByID(Defines.GameItems[prop].ID, this.m_ShopData.COUNT.get(), this.m_ShopData.TOTAL_PRICE.get());
						addFlag = true;
					}
                    else {
						cc.DataMng.getInstance().buyItemByID(Defines.GameItems[prop].ID, this.m_ShopData.COUNT.get(), 0);
					}
                }
            }
        }
        else if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_WORLD)
        {
			var addFlag = false;
            for (var prop in Defines.GameItems)
            {
                if (Defines.GameItems.hasOwnProperty(prop))
                {
					if (!addFlag){
						cc.DataMng.getInstance().buyItemByID(Defines.GameItems[prop].ID, this.m_ShopData.COUNT.get(), this.m_ShopData.TOTAL_PRICE.get());
						addFlag = true;
					}
                    else {
						cc.DataMng.getInstance().buyItemByID(Defines.GameItems[prop].ID, this.m_ShopData.COUNT.get(), 0);
					}
                }
            }
        }
		else if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_UNLOCK_NEW_ZONE){
		    var needDiamond = Defines.DIAMOND_PAY.UNLOCK_NEW_STAR;
			cc.DataMng.getInstance().spendMoney(needDiamond, MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_NEW_PLANT);//解锁新星球
			cc.GUIMapMng.getInstance().unlockNewZone();
			BIMng.getBIDiamond().logDiamondCost_NewZone();
			
			this.closeWindow();
			return this;
		}
        else {
            var gameItem = this.m_ShopData.GAME_ITEM;
            cc.DataMng.getInstance().buyItemByID(gameItem.ID, this.m_ShopData.COUNT.get(), this.m_ShopData.TOTAL_PRICE.get());
        }
        var myScene = cc.Director.getInstance().getRunningScene();
		cc.GUIBuySuccess.getInstance().openWindow(myScene,  this.m_ShopData);
        BIMng.getInstance().logPayByDiamond(this.m_ShopData);
        this.closeWindow();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, shopData, forceOther)
    {
        this._super(render);
        cc.log("GUIBuyPrompt openWindow");
        //
        cc.AudioMng.getInstance().playOpenWindow();
        this.getWindow().removeAllChildren(true);

        //step1:
        this.m_ShopData = shopData;
        this.m_ForceOther = forceOther;

        //step2:
        this.addMainContent();

        //
        var isInGame = this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_TIME
            || this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_MOVES;

        var isInMap = this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_UNLOCK_NEW_ZONE;

//        if (isInGame)
//        {
//            this.addContentForGame();
//        }
//        else if (isInMap)
//        {
//            this.addContentForMap();
//        }
//        else
//        {

//        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();
        cc.log("cc.GUIBuyPrompt.closeWindow()");

        //
        cc.AudioMng.getInstance().playCloseWindow();

        //
        this.getWindow().removeAllChildren(true);
        this.m_ShopData = null;
        this.m_ForceOther = null;

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIBuyPrompt._instance = null;
cc.GUIBuyPrompt.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIBuyPrompt();
        this._instance.init();
    }

    return this._instance;
};