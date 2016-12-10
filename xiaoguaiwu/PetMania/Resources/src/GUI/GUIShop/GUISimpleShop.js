
//是否有薄荷糖上限加1的商品
var _CanBuy_HeartLimit = true;

//======================================================= GUIShop ======================================================
cc.GUISimpleShop = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //labels
        this.m_DiamondCountLabel = null;

        //Buttons
        this.m_ButtonBack = null;

        //Tabs
        this.m_TabIndex = 0;
        this.m_TabButton = [];
        this.m_TabSelect = [];
        this.m_TabLayer = [];
        this.m_TabScroll = [];
        this.m_Menu = null;
        this.m_ButtonMoreDiamond = null;
        //cells
        this.m_ShopItem = [];

        //
        this.m_Enabled = true;
        this.m_SelectItem = null;

        this.m_shopItemType = null;
        //自动返回开启的关卡
        this.m_BackMapItemKey = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUISimpleShop";
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setContent: function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(blockLayer, -1);
        //
        var winSize = cc.Director.getInstance().getWinSize();
//
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);

        buttonClose.setPosition(cc.p(_ScreenWidth() - 50 * Defines.BASE_SCALE, _ScreenHeight() - 40 * Defines.BASE_SCALE));
        //
        this.m_Menu = cc.Menu.create(buttonClose);
        this.m_Menu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(this.m_Menu);

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
    loadShopContent: function(targetPrice)
    {
        var winSize = cc.Director.getInstance().getWinSize();
        var itemWidth = 250 * Defines.BASE_SCALE;

        //
        var shopData = [
            GUI.SHOP_DATA.SHOP_DATA_DIAMOND.concat(),
            GUI.SHOP_DATA.SHOP_DATA_LIFE.concat(),
            GUI.SHOP_DATA.SHOP_DATA_ITEM.concat(),
            GUI.SHOP_DATA.SHOP_DATA_CONTINUE.concat()
        ];

        //薄荷糖上限放在薄荷糖包中显示
        if (_CanBuy_HeartLimit)
        {
            shopData[1].push(Tools.clone(GUI.SHOP_DATA.SHOP_DATA_HEART_LIMIT[0]));
        }
//
        //
        var shopCell = [
            cc.GUIShopCellDiamond,
            cc.GUIShopCellHeart,
            cc.GUIShopCellItem,
            cc.GUIShopCellContinue
        ];

        //
        var self = this;

        if (this.m_shopItemType != null){
            var originData = shopData[this.m_shopItemType].concat();
        }
        else {
            var originData = shopData[0].concat();
        }
        var data = [];
        originData.forEach(
            function(_shopData, index){

                if (_shopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND){
                    var dataPrice = _shopData.TOTAL_PRICE.get();
                    if (dataPrice != targetPrice && data.length <= 5){
                        if (Defines.IS_EN){
                            if (dataPrice == 0.99 || dataPrice == 1.99 ||  dataPrice == 4.99 ||dataPrice == 9.99
                                || dataPrice == 19.99 || dataPrice == 49.99 || dataPrice == 99.99){
                                data.push(_shopData);
                            }
                        }
                        else if (Defines.IS_KO){
//                            if (dataPrice == 6 || dataPrice == 12 ||  dataPrice == 30 ||dataPrice == 68
//                                || dataPrice == 128 || dataPrice == 328 || dataPrice == 648){
                                data.push(_shopData);
//                            }
                        }
                        else if (Defines.OS.isiOS()){
                            if (dataPrice == 6 || dataPrice == 12 ||  dataPrice == 30 ||dataPrice == 68
                                || dataPrice == 128 || dataPrice == 328 || dataPrice == 648){
                                data.push(_shopData);
                            }
                        }
                        else{
                            if (dataPrice == 2 || dataPrice == 5 ||  dataPrice == 20 || dataPrice == 10
                                || dataPrice == 128 || dataPrice == 328 || dataPrice == 648){
                                data.push(_shopData);
                            }
                        }
                    }
                }
                else {
                    data.push(_shopData);
                }
        });

        var tabLayer = cc.Layer.create();
        tabLayer.setContentSize(cc.size(itemWidth * Math.ceil(data.length/2), winSize.height));

        data.forEach(function(each, idx, array)
        {
            var shopItem = cc.GUISimpleShopCell.create(each);
            var itemContent = shopItem.getContent();
            tabLayer.addChild(itemContent);

            itemContent.setPositionX(itemWidth * ((idx < array.length/2 ? idx : idx - Math.ceil(array.length/2))) + winSize.width / 2 - itemWidth);
            itemContent.setPositionY(idx < array.length/2 ? winSize.height * 0.63 : winSize.height * 0.28);

            self.m_ShopItem.push(shopItem);
        });

        self.getWindow().addChild(tabLayer);

        //
        self.m_TabLayer.push(tabLayer);

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    notifyOpenWindow: function(window)
    {
        if (window instanceof cc.GUIGuideNormal)
        {
            this.setEnabled(false);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyCloseWindow: function(window)
    {
        if (window instanceof cc.GUIGuideNormal)
        {
            this.setEnabled(true);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getShopItem: function(index)
    {

        if (index >= this.m_ShopItem.length)
        {
            return null;
        }

        return this.m_ShopItem[index];
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, shopItemType, buyPrice)//buyprice: 已经显示过的price
    {
        this._super(render);
        cc.log("openwindow");
        //
        cc.ResourceMng.getInstance().addToCache(
            Resource._GUIShop_plist,
            Resource._GUIShop_png);
        //
        cc.AudioMng.getInstance().playOpenWindow();

        this.m_shopItemType = shopItemType;
        //
        this.setContent();
        //
        this.loadShopContent(buyPrice);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        cc.AudioMng.getInstance().playCloseWindow();

        this.getWindow().removeAllChildren(true);

        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUIShop_plist,
            Resource._GUIShop_png);
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});


cc.GUISimpleShop._instance = null;
cc.GUISimpleShop.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUISimpleShop();
        this._instance.init();
        cc.DataMng.getInstance().addGUIObserver(this._instance);
    }

    return this._instance;
};