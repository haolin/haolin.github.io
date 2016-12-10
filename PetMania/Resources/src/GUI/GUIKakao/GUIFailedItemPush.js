/**
 * Created by hong.zhang on 2014/7/8.
 */


//======================================================================================================================
cc.GUIFailedItemPush = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        this.m_buttonNeverShowNor = null;
        this.m_buttonNeverShowSel = null;

        this.m_NeverShow = cc.GameDataBoolean.create("m_NeverShow",false,_DB_OP_GAME);
        this.m_NeverShowTime = cc.GameDataTime.create("m_NeverShowDate",0,_DB_OP_GAME);

        this.m_NeverShow.load();
        this.m_NeverShowTime.load();
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "GUIFailedItemPush";
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function ()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 100));
        this.getWindow().addChild(blockLayer, -1);

        var spriteBackground = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back11.png");
        this.getWindow().addChild(spriteBackground);
        spriteBackground.setPosition(cc.p(_ScreenWidth()/2,_ScreenHeight()/2));

        var nBackWidth = spriteBackground.getContentSize().width;
        var nBackHeight = spriteBackground.getContentSize().height;

        //不知道什么内容的label
        var spriteLabel = cc.Sprite.createWithSpriteFrameName("push_label_title.png");
        spriteBackground.addChild(spriteLabel);
        spriteLabel.setPosition(cc.p(nBackWidth/2,nBackHeight - 60*Defines.BASE_SCALE));
        spriteLabel.setScaleX(0.9);

        //购买按钮
        var buttonBuy = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("push_btn_goto_shop_nor.png"),
            cc.Sprite.createWithSpriteFrameName("push_btn_goto_shop_sel.png"),
            this._btnBuy,this);
        buttonBuy.setPosition(cc.p(nBackWidth/2,nBackHeight/2 - 80*Defines.BASE_SCALE));

        var menuBuy = cc.Menu.create(buttonBuy);
        menuBuy.setPosition(cc.p(0,0));
        spriteBackground.addChild(menuBuy);

        //同样不知道是什么意思
        var labelTxt = cc.LabelTTF.create(Resource.KoreanTxt["push_description"],"Arial",20*Defines.BASE_SCALE);
        labelTxt.setPosition(cc.p(nBackWidth/2,120*Defines.BASE_SCALE));
        spriteBackground.addChild(labelTxt);

        //不再显示
        var spriteNeverShow = cc.Sprite.createWithSpriteFrameName("push_label_never_show.png");
        spriteBackground.addChild(spriteNeverShow);
        spriteNeverShow.setAnchorPoint(cc.p(0,0.5));
        spriteNeverShow.setPosition(cc.p(nBackWidth/2 - 120*Defines.BASE_SCALE,60*Defines.BASE_SCALE));

        this.m_buttonNeverShowNor = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("push_btn_unselect.png"),
            cc.Sprite.createWithSpriteFrameName("push_btn_unselect.png"),
            this._btnSelect,this);
        this.m_buttonNeverShowNor.setAnchorPoint(cc.p(1,0.5));
        this.m_buttonNeverShowNor.setPosition(cc.p(nBackWidth/2 - 120*Defines.BASE_SCALE,60*Defines.BASE_SCALE));
        this.m_buttonNeverShowNor.setVisible(bShowFailedItemPush);

        this.m_buttonNeverShowSel = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("push_btn_select.png"),
            cc.Sprite.createWithSpriteFrameName("push_btn_select.png"),
            this._btnUnSelect,this);
        this.m_buttonNeverShowSel.setAnchorPoint(cc.p(1,0.5));
        this.m_buttonNeverShowSel.setPosition(cc.p(nBackWidth/2 - 120*Defines.BASE_SCALE,60*Defines.BASE_SCALE));
        this.m_buttonNeverShowSel.setVisible(!bShowFailedItemPush);

        var menuNeverShow = cc.Menu.create(this.m_buttonNeverShowNor,this.m_buttonNeverShowSel);
        menuNeverShow.setAnchorPoint(cc.p(0,0));
        menuNeverShow.setPosition(cc.p(0,0));
        spriteBackground.addChild(menuNeverShow);

        //道具框
        var spriteItemBack = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back12.png");
        spriteItemBack.setAnchorPoint(cc.p(0.5,0.5));
        spriteItemBack.setPosition(cc.p(nBackWidth/2,nBackHeight/2 + 70*Defines.BASE_SCALE));
        spriteItemBack.setScaleX(0.9);
        spriteItemBack.setScaleY(0.6);
        spriteBackground.addChild(spriteItemBack);

//        var nItemWidth = spriteItemBack.getContentSize().width;
//        var nItemHeight = spriteItemBack.getContentSize().height;

        var spriteItemIcons = cc.Sprite.createWithSpriteFrameName("push_sprite_item_icons.png");
        spriteItemIcons.setAnchorPoint(cc.p(0.5,1));
        spriteItemIcons.setPosition(cc.p(nBackWidth/2,nBackHeight - 90*Defines.BASE_SCALE));
        spriteItemIcons.setScale(0.9);
        spriteBackground.addChild(spriteItemIcons);

        var spriteFengeLine = cc.Sprite.create(_GUIPath + "GUINewGeneral/fenge_line.png");
        spriteFengeLine.setPosition(cc.p(nBackWidth/2,nBackHeight - 240*Defines.BASE_SCALE));
        spriteFengeLine.setScaleX(0.9);
        spriteBackground.addChild(spriteFengeLine);

        var spritePrice = cc.Sprite.createWithSpriteFrameName("push_label_show_price.png");
        spritePrice.setAnchorPoint(cc.p(1,0.5));
        spritePrice.setPosition(cc.p(nBackWidth/2,nBackHeight - 270));
        spriteBackground.addChild(spritePrice);

        cc.log("GUIFailedItemPush: " + GUI.SHOP_DATA.SHOP_DATA_FAILED_PUSH[0].TOTAL_PRICE.toString());
        var numberPrice = GUI.createNumberLabel(GUI.SHOP_DATA.SHOP_DATA_FAILED_PUSH[0].TOTAL_PRICE.get().toString(),_GUIPath + "Num/num_2_20x24.png",20,24,".");
//        var numberPrice = GUI.createNumberLabel("10000",_GUIPath + "Num/num_10_16x20.png",20,24,"0");
        numberPrice.setAnchorPoint(cc.p(0,0.5));
        numberPrice.setPosition(cc.p(nBackWidth/2 + 25*Defines.BASE_SCALE,nBackHeight - 270));
        spriteBackground.addChild(numberPrice);

        var spriteMoney = cc.Sprite.createWithSpriteFrameName(GUI.SHOP_DATA.SHOP_DATA_FAILED_PUSH[0].MONEY_ICON);
        spriteMoney.setPosition(cc.p(nBackWidth/2 + 5*Defines.BASE_SCALE ,nBackHeight - 270));
        spriteMoney.setScale(0.75);
        spriteBackground.addChild(spriteMoney);


        //关闭按钮
        GUI._AddCloseButton(spriteBackground,this._btnClose,this);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnSelect: function()
    {
        this.m_buttonNeverShowNor.setVisible(false);
        this.m_buttonNeverShowSel.setVisible(true);
        this.m_NeverShow.set(true);
        this.m_NeverShowTime.set(_LocalTime());
//        bShowFailedItemPush = false;
    },

    _btnUnSelect: function()
    {
        this.m_buttonNeverShowNor.setVisible(true);
        this.m_buttonNeverShowSel.setVisible(false);
        this.m_NeverShow.set(false);
//        bShowFailedItemPush = true;
    },
    //------------------------------------------------------------------------------------------------------------------
    addItem: function()
    {
        cc.DataMng.getInstance().buyItemByID(Defines.GameItems.ITEM_TIME.ID,10,0);
        cc.DataMng.getInstance().buyItemByID(Defines.GameItems.ITEM_TRANSPOSITION.ID,10,0);
        cc.DataMng.getInstance().buyItemByID(Defines.GameItems.ITEM_STORM.ID,10,0);
        cc.DataMng.getInstance().buyItemByID(Defines.GameItems.ITEM_DIRECTION_EX.ID,10,0);
        cc.DataMng.getInstance().buyItemByID(Defines.GameItems.ITEM_WARP_EX.ID,10,0);
        cc.DataMng.getInstance().buyItemByID(Defines.GameItems.ITEM_COLORFUL_EX.ID,10,0);
        cc.DataMng.getInstance().addMoney(1200,MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_DEFAULT);
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnBuy: function()
    {
        var shopData = GUI.SHOP_DATA.SHOP_DATA_FAILED_PUSH[0];
        _Pay_ByRMB(shopData);
        this.closeWindow();
    },

    _btnClose: function()
    {
        this.closeWindow();
    },

    //------------------------------------------------------------------------------------------------------------------
    _enterMap: function()
    {
        cc.GUIMapMng.getInstance().update();
        cc.GUIMap.getInstance().openWindow(this.getWindow().getParent());
        cc.GUIMapMng.getInstance().mapDidEnter();
    },

    //------------------------------------------------------------------------------------------------------------------
    needShow: function()
    {
        var neverShowTime = this.m_NeverShowTime.get();

        //如果不是今天设置的则清空
        if(Tools.getDayBegin(_LocalTime()) >= neverShowTime)
        {
            this.m_NeverShow.set(false);
//            this.m_NeverShowTime.set(0);
        }


        var bNever = this.m_NeverShow.get();

        return !bNever;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);

        cc.ResourceMng.getInstance().addToCache(
            Resource._GUIFailedItemPush_plist,
            Resource._GUIFailedItemPush_png);

        cc.AudioMng.getInstance().playOpenWindow();
        this.getWindow().removeAllChildren(true);

        this.addContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        this.m_NeverShow.save();
        this.m_NeverShowTime.save();

        cc.AudioMng.getInstance().playCloseWindow();
        this.getWindow().removeAllChildren(true);

        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUIFailedItemPush_plist,
            Resource._GUIFailedItemPush_png);
		

        return this;
    }
});

//======================================================================================================================
cc.GUIFailedItemPush._instance = null;
cc.GUIFailedItemPush.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIFailedItemPush();
        this._instance.init();
    }

    return this._instance;
};

var bShowFailedItemPush = true;