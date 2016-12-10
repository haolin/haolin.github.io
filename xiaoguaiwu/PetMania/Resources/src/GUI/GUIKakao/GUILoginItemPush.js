/**
 * Created by hong.zhang on 2014/7/7.
 */

//======================================================================================================================
cc.GUILoginItemPush = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "GUILoginItemPush";
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function ()
    {
        this._super();

        var myDate = new Date();
        var itemElement = cc.GUILoginItemPush.ITEM_TYPE[myDate.getDay()].type;
        GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].SPRITE_SOURCE = itemElement.SPRITESOURCE;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 100));
        this.getWindow().addChild(blockLayer, -1);

        var spriteBackground = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back0.png");
        this.getWindow().addChild(spriteBackground);
        spriteBackground.setPosition(cc.p(_ScreenWidth()/2,_ScreenHeight()/2));

        var nBackWidth = spriteBackground.getContentSize().width;
        var nBackHeight = spriteBackground.getContentSize().height;

        var spriteItemBack = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back5.png");
        spriteItemBack.setAnchorPoint(cc.p(0.5,1));
        spriteBackground.addChild(spriteItemBack);
        spriteItemBack.setPosition(cc.p(nBackWidth/2,nBackHeight - 60*Defines.BASE_SCALE));

        //不知道什么内容的label
        var spriteLabel = cc.Sprite.createWithSpriteFrameName("general_label_login_itempush.png");
        spriteBackground.addChild(spriteLabel);
        spriteLabel.setPosition(cc.p(nBackWidth/2,nBackHeight - 35*Defines.BASE_SCALE));

        //购买按钮
        var buttonBuy = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_buy_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_buy_sel.png"),
            this._btnBuy,this);
        buttonBuy.setPosition(cc.p(nBackWidth/2,35*Defines.BASE_SCALE));

        var menuBuy = cc.Menu.create(buttonBuy);
        menuBuy.setPosition(cc.p(0,0));
        spriteBackground.addChild(menuBuy);

        //同样不知道是什么意思
        var labelTxt = cc.LabelTTF.create(Resource.KoreanTxt["discount_mall"],"Arial",22*Defines.BASE_SCALE);
        labelTxt.setPosition(cc.p(nBackWidth/2,80*Defines.BASE_SCALE));
        spriteBackground.addChild(labelTxt);

        //道具
        var myDate = new Date();
        var itemElement = cc.GUILoginItemPush.ITEM_TYPE[myDate.getDay()];
        var spriteItem = cc.Sprite.createWithSpriteFrameName(itemElement.type.SPRITESOURCE);
        spriteBackground.addChild(spriteItem);
        spriteItem.setAnchorPoint(cc.p(0.5,0));
        spriteItem.setPosition(cc.p(nBackWidth/2 ,nBackHeight/2 - 30*Defines.BASE_SCALE));

        //数量
        var spriteMul = cc.Sprite.create(_GUIPath + "Num/num_9_x.png");
        spriteItem.addChild(spriteMul);
        spriteMul.setAnchorPoint(cc.p(1,0));
        spriteMul.setPosition(cc.p(spriteItem.getContentSize().width,0));

        var numlabelItem = GUI.createNumberLabel(itemElement.num,_GUIPath + "Num/num_9_20x24.png",20,24,"0");
        spriteItem.addChild(numlabelItem);
        numlabelItem.setAnchorPoint(cc.p(0,0));
        numlabelItem.setPosition(cc.p(spriteItem.getContentSize().width + 2*Defines.BASE_SCALE ,0));

        //价格
        var spriteMoneyOri = cc.Sprite.createWithSpriteFrameName(GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].MONEY_ICON);
        spriteMoneyOri.setPosition(cc.p(nBackWidth/2 - 40*Defines.BASE_SCALE,nBackHeight/2 - 50*Defines.BASE_SCALE));
        spriteMoneyOri.setScale(0.5);
        spriteBackground.addChild(spriteMoneyOri);


        var numlabelOriPrice = GUI.createNumberLabel(itemElement.ori_price.toString(),_GUIPath + "Num/num_14_18x22.png",18,22,"0");
        spriteBackground.addChild(numlabelOriPrice);
        numlabelOriPrice.setAnchorPoint(cc.p(0,0.5));
        numlabelOriPrice.setPosition(cc.p(nBackWidth/2 - 30*Defines.BASE_SCALE,nBackHeight/2 - 50*Defines.BASE_SCALE));

        var spriteDeleteLine = cc.Sprite.createWithSpriteFrameName("shop_delete_line.png");
        spriteBackground.addChild(spriteDeleteLine);
        spriteDeleteLine.setAnchorPoint(cc.p(0,0.5));
        spriteDeleteLine.setPosition(cc.p(nBackWidth/2 - 50*Defines.BASE_SCALE,nBackHeight/2 - 50*Defines.BASE_SCALE));
        spriteDeleteLine.setScaleX(5.5);

        if(Defines.OS.isAndroid())
        {
            numlabelOriPrice.setPosition(cc.p(nBackWidth/2 - 50*Defines.BASE_SCALE,nBackHeight/2 - 50*Defines.BASE_SCALE));
            spriteMoneyOri.setPosition(cc.p(nBackWidth/2 - 60*Defines.BASE_SCALE,nBackHeight/2 - 50*Defines.BASE_SCALE));
        }

        var spriteMoney = cc.Sprite.createWithSpriteFrameName(GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].MONEY_ICON);
        spriteMoney.setPosition(cc.p(nBackWidth/2 + 35*Defines.BASE_SCALE,nBackHeight/2 - 50*Defines.BASE_SCALE));
        spriteMoney.setScale(0.6);
        spriteBackground.addChild(spriteMoney);

        var numlabelCurPrice = GUI.createNumberLabel(itemElement.cur_price.toString(),_GUIPath + "Num/num_2_20x24.png",20,24,".");
        spriteBackground.addChild(numlabelCurPrice);
        numlabelCurPrice.setAnchorPoint(cc.p(0,0.5));
        numlabelCurPrice.setPosition(cc.p(nBackWidth/2 + 50*Defines.BASE_SCALE,nBackHeight/2 - 50*Defines.BASE_SCALE));

        //关闭按钮
        GUI._AddCloseButton(blockLayer,this._btnClose,this);


        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    addItem: function()
    {
        var myDate = new Date();
        var itemElement = cc.GUILoginItemPush.ITEM_TYPE[myDate.getDay()];
        cc.DataMng.getInstance().buyItemByID(itemElement.type.ID,itemElement.num,0);
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnBuy: function()
    {
//        this._enterMap();
        var shopData = GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0];
        _Pay_ByRMB(shopData);

        this.closeWindow();
    },

    _btnClose: function()
    {
//        this._enterMap();
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
    openWindow: function(render)
    {
        this._super(render);

        cc.AudioMng.getInstance().playOpenWindow();
        this.getWindow().removeAllChildren(true);

        cc.ResourceMng.getInstance().addToCache(
            Resource._GUIShop_plist,
            Resource._GUIShop_png);

        this.addContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        cc.AudioMng.getInstance().playCloseWindow();
        this.getWindow().removeAllChildren(true);

        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUIShop_plist,
            Resource._GUIShop_png);

        return this;
    }
});

//======================================================================================================================
cc.GUILoginItemPush._instance = null;
cc.GUILoginItemPush.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUILoginItemPush();
        this._instance.init();
    }

    return this._instance;
};

cc.GUILoginItemPush.ITEM_TYPE = [
    {type: Defines.GameItems.ITEM_GOLDEN_KEY, num: 20, ori_price: GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].ORI_PRICE,
        cur_price:GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].TOTAL_PRICE.get()},
    {type: Defines.GameItems.ITEM_DIRECTION_EX, num: 50, ori_price: GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].ORI_PRICE,
        cur_price:GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].TOTAL_PRICE.get()},
    {type: Defines.GameItems.ITEM_WARP_EX, num: 50, ori_price: GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].ORI_PRICE,
        cur_price:GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].TOTAL_PRICE.get()},
    {type: Defines.GameItems.ITEM_COLORFUL_EX, num: 25, ori_price: GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].ORI_PRICE,
        cur_price:GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].TOTAL_PRICE.get()},
    {type: Defines.GameItems.ITEM_TRANSPOSITION, num: 20, ori_price: GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].ORI_PRICE,
        cur_price:GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].TOTAL_PRICE.get()},
    {type: Defines.GameItems.ITEM_STAINING, num: 25, ori_price: GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].ORI_PRICE,
        cur_price:GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].TOTAL_PRICE.get()},
    {type: Defines.GameItems.ITEM_STORM, num: 35, ori_price: GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].ORI_PRICE,
        cur_price:GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].TOTAL_PRICE.get()}
];

var bLoginPushed = true;
