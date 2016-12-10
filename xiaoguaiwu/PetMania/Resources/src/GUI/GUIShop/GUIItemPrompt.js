/**
 * 目前只有钻石不足的情况
 */
//================================================ GUIBuyPrompt =====================================================
//
cc.GUIItemPrompt = cc.GUIPopupWindow.extend ({

    description: function ()
    {
        return "GUIItemPrompt";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        this.m_MainUI = null;
        this.m_ShopData = null;
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

        var currencyFile = this.m_ShopData.CURRENCY == GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB ?
            "원에" : "다이아";

        var labelDescription = cc.LabelTTF.create(this.m_ShopData.GAME_ITEM.NAME + " 아이템을 구매 \n하시겠습니까? ", Defines.DefaultFont, 18 * Defines.BASE_SCALE);
        labelDescription.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.6));
        var labelDesColor = cc.LabelTTF.create("(구매하신 아이템은 \n환불이되지 않습니다.)", Defines.DefaultFont, 16 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelDesColor);
        labelDesColor.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.6 - 50 * Defines.BASE_SCALE));

        this.m_MainUI.addChild(labelDescription);

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

        this.closeWindow();

        //
        cc.log("GUIBuyPrompt _btnBuyCallback");

        cc.DataMng.getInstance().realBuyItemByID(this.m_ID, this.m_Num, this.m_price);

//        var needDiamond = this.m_ShopData.TOTAL_PRICE.get();
//
//        if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE){
//
//            cc.DataMng.getInstance().spendMoney(needDiamond, MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_IN_SHOP, {"id": this.m_ShopData.ID}); //商店购买
//            var addCount = this.m_ShopData.COUNT.get() + this.m_ShopData.GIFT_COUNT.get();
//            cc.DataMng.getInstance().addHeart(addCount);
//            cc.GUITaskKakao.getInstance().addTaskScore(Task.TaskID.DAILY_BUY_HEART,1);
//
////            cc.GUIBuySuccess.getInstance().openWindow(myScene, this.m_ShopData);
//        }
//        else if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_HEART_LIMIT){
//            cc.DataMng.getInstance().spendMoney(needDiamond);
//            var addCount = this.m_ShopData.COUNT.get();
//            cc.DataMng.getInstance().addHeartRecoverMax(addCount);
//
//            cc.GUIBuySuccess.getInstance().openWindow(myScene, this.m_ShopData);
//        }
//        else if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE){
//            cc.DataMng.getInstance().spendMoney(this.m_ShopData.TOTAL_PRICE.get(), MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_IN_SHOP, {"id": this.m_ShopData.ID});//商店购买
//            cc.DataMng.getInstance().addGameContinueCount(this.m_ShopData.COUNT.get() + this.m_ShopData.GIFT_COUNT.get());
//        }
//        else if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_SUPER)
//        {
//            for (var prop in Defines.GameItems)
//            {
//                if (Defines.GameItems.hasOwnProperty(prop))
//                {
//                    cc.DataMng.getInstance().realBuyItemByID(prop.ID, this.m_ShopData.COUNT.get(), this.m_ShopData.TOTAL_PRICE.get());
//                }
//            }
//        }
//        else if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_WORLD)
//        {
//            for (var prop in Defines.GameItems)
//            {
//                if (Defines.GameItems.hasOwnProperty(prop))
//                {
//                    cc.DataMng.getInstance().realBuyItemByID(prop.ID, this.m_ShopData.COUNT.get(), this.m_ShopData.TOTAL_PRICE.get());
//                }
//            }
//        }
//        else {
//            var gameItem = this.m_ShopData.GAME_ITEM;
//            cc.DataMng.getInstance().realBuyItemByID(gameItem.ID, this.m_ShopData.COUNT.get(), this.m_ShopData.TOTAL_PRICE.get());
//        }
//        BIMng.getInstance().logPayByDiamond(this.m_ShopData);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, ItemID, Number, totalPrice)
    {
        this._super(render);

        //
        cc.AudioMng.getInstance().playOpenWindow();
        this.getWindow().removeAllChildren(true);
        //step2:

        this.m_ShopData = GUI.getShopDataWithItemID(ItemID);

        this.m_ID = ItemID;
        this.m_Num = Number;
        this.m_price = totalPrice;

        this.addMainContent();

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

cc.GUIItemPrompt._instance = null;
cc.GUIItemPrompt.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIItemPrompt();
        this._instance.init();
    }

    return this._instance;
};