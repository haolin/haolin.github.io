
//=================================================== GUIShopCellDiamond ======================================================
cc.GUIShopCellDiamond = cc.GUIShopCell.extend ({

    //------------------------------------------------------------------------------------------------------------------
    activate: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        if (Defines._NeedPayConfirm())
        {
            var myScene = cc.GUIShop.getInstance().getWindow().getParent();
            cc.GUIBuyPrompt.getInstance().openWindow(myScene, this.m_ShopData);
        }
        else
        {
            _Pay_ByRMB(this.m_ShopData);
        }

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIShopCellDiamond.create = function(shopData)
{
    var createNew = new cc.GUIShopCellDiamond();
    createNew.init(shopData);
    return createNew;
};

//=================================================== GUIShopCellHeart ======================================================
cc.GUIShopCellHeart = cc.GUIShopCell.extend ({

    //------------------------------------------------------------------------------------------------------------------
    activate: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //若购买后库存超出上限，不让购买
        if (_CheckUpperLimit_Heart(this.m_ShopData) || _CheckUpperLimit_HeartRecover(this.m_ShopData))
        {
            _MsgView_BuyUpperLimit();
            return this;
        }

        //
        if (this.m_ShopData.CURRENCY == GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB)
        {
            if (Defines._NeedPayConfirm())
            {
                var myScene = cc.Director.getInstance().getRunningScene();
                cc.GUIBuyPrompt.getInstance().openWindow(myScene, this.m_ShopData);
            }
            else
            {
                _Pay_ByRMB(this.m_ShopData);
            }

            return this;
        }

        //钻石购买部分
//        if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE)
//        {
            this._buyHeartsByDiamond();
//        }
//        else if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_HEART_LIMIT)
//        {
//            this._buyHeartLimitByDiamond();
//        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _buyHeartsByDiamond: function()
    {
        var needDiamond = this.m_ShopData.TOTAL_PRICE.get();
        var myScene = cc.Director.getInstance().getRunningScene();

        if (cc.DataMng.getInstance().canSpendMoney(needDiamond))
        {
			cc.GUIBuyPrompt.getInstance().openWindow(_GUILayer(), this.m_ShopData);
        }
        else
        {
            cc.GUIBuyDiamond.getInstance().openWindow(myScene, needDiamond, GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _buyHeartLimitByDiamond: function()
    {
        var needDiamond = this.m_ShopData.TOTAL_PRICE.get();
        var myScene = cc.Director.getInstance().getRunningScene();

        if (cc.DataMng.getInstance().canSpendMoney(needDiamond))
        {
			cc.GUIBuyPrompt.getInstance().openWindow(_GUILayer(), this.m_ShopData);

        }
        else
        {
            cc.GUIBuyDiamond.getInstance().openWindow(myScene, needDiamond, GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND);
        }

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIShopCellHeart.create = function(shopData)
{
    var createNew = new cc.GUIShopCellHeart();
    createNew.init(shopData);
    return createNew;
};

//=================================================== GUIShopCellItem ======================================================
cc.GUIShopCellItem = cc.GUIShopCell.extend ({//

    CELL_CONTENT_TAG:
    {
        ITEM_STORAGE: 101      //库存说明
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    _static: function()
    {
        return cc.GUIShopCellItem.prototype;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(shopData)
    {
        this._super(shopData);

        //
        var contentSize = this.m_Content.getContentSize();

        //
        this.m_ButtonInfo = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("shop_btn_info_nor.png"),
            cc.Sprite.createWithSpriteFrameName("shop_btn_info_sel.png"),
            this._btnInfoCallback, this);
        this.m_ButtonInfo.setPosition(cc.p(contentSize.width - 27 * Defines.BASE_SCALE, contentSize.height - 27 * Defines.BASE_SCALE));

        var infoMenu = cc.Menu.create(this.m_ButtonInfo);
        infoMenu.setPosition(cc.p(0, 0));
        this.m_NormalContent.addChild(infoMenu);

        //
        var tempStrip = cc.Sprite.createWithSpriteFrameName("shop_item_panel_strip.png");
        var srcSize = tempStrip.getContentSize();

        var bottomStrip = cc.Scale9Sprite.createWithSpriteFrameName("shop_item_panel_strip.png",
            cc.rect(srcSize.width * 0.3, srcSize.height * 0.3, srcSize.width * 0.4, srcSize.height * 0.4));

        var stripSize = cc.size(260 * Defines.BASE_SCALE, 150 * Defines.BASE_SCALE);
        bottomStrip.setContentSize(stripSize);
        this.m_SelectContent.addChild(bottomStrip);
        bottomStrip.setAnchorPoint(cc.p(0.5, 0));
        bottomStrip.setPosition(cc.p(contentSize.width * 0.5, 20 * Defines.BASE_SCALE));

        //
        if (shopData.NAME)
        {
            var title = cc.LabelTTF.create(shopData.NAME, Defines.DefaultFont, 20 * Defines.BASE_SCALE);
            this.m_SelectContent.addChild(title);
            title.setColor(cc.c3b(46, 58, 76));
            title.setPosition(cc.p(contentSize.width * 0.5, contentSize.height- 20 * Defines.BASE_SCALE));
        }

        if (shopData.NAME)
        {
            var title2 = cc.LabelTTF.create(shopData.NAME, Defines.DefaultFont, 20 * Defines.BASE_SCALE);
            this.m_NormalContent.addChild(title2);
            title2.setColor(cc.c3b(46, 58, 76));
            title2.setPosition(cc.p(contentSize.width * 0.5, contentSize.height- 20 * Defines.BASE_SCALE));
        }

        //
        var labelDes = cc.LabelTTF.create(shopData.DESCRIPTION, Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        this.m_SelectContent.addChild(labelDes);
        labelDes.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.4));

        //现有数量
        if (shopData.GAME_ITEM)
        {
            var labelStorage = cc.LabelTTF.create("", Defines.DefaultFont, 20 * Defines.BASE_SCALE);
            this.m_SelectContent.addChild(labelStorage, 0, this._static().CELL_CONTENT_TAG.ITEM_STORAGE);
            labelStorage.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.2));
            labelDes.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.5));
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateStorageContent: function()
    {
        var labelStorage = this.m_SelectContent.getChildByTag(this._static().CELL_CONTENT_TAG.ITEM_STORAGE);
        if (labelStorage && this.m_ShopData.GAME_ITEM)
        {
            var itemData = cc.DataMng.getInstance().getItemByID(this.m_ShopData.GAME_ITEM.ID);
            var strStorage = Resource.ChineseTxt["shop_cell_storage"] + itemData.Number.get();
            labelStorage.setString(strStorage);
        }
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnInfoCallback: function ()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        var norVisible = this.m_NormalContent.isVisible();

        var scaleAction = cc.Sequence.create(
            cc.ScaleTo.create(0.15, 0, 1),
            cc.CallFunc.create(function(){
                this.m_NormalContent.setVisible(!norVisible);
                this.m_SelectContent.setVisible(norVisible);
            }, this),
            cc.ScaleTo.create(0.15, norVisible ? -1 : 1, 1)
        );

        scaleAction.setTag(1001);
        this.getContent().runAction(scaleAction);

        //
        this.updateStorageContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setEnabled: function(isEnabled)
    {
        this.m_ButtonInfo.setEnabled(isEnabled);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    canTouch: function(touchLocation)
    {
        if (!this.m_NormalContent.isVisible())
        {
            return true;
        }

        var contentSize = this.m_Content.getContentSize();

        var toContent = cc.pSub(touchLocation, this.m_Content.getPosition());
        toContent = cc.pAdd(toContent, cc.p(contentSize.width * 0.5, contentSize.height * 0.5));

        var boundBox = this.m_ButtonInfo.getBoundingBox();
        return !cc.rectContainsPoint(boundBox, toContent);
    },

    //------------------------------------------------------------------------------------------------------------------
    //TODO 重构 每种商品类型一个单独的函数
    activate: function()
    {
        if (this.m_Content.getActionByTag(1001))
        {
            return this;
        }

        //
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        if (this.m_SelectContent.isVisible())
        {
            this._btnInfoCallback();
            return this;
        }

        //若购买后库存超出上限，不让购买
        if (this._checkUpperLimit())
        {
            _MsgView_BuyUpperLimit();
            return this;
        }

        if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_FREE_CANDY){
            if (cc.DataMng.getInstance().getFreeCandyFlag()){
                _MsgView_FreeCandyFlag();
                return this;
            }
        }

        //
        var myScene = cc.GUIShop.getInstance().getWindow().getParent();


//        //宇宙包和至尊包只能用其它支付(KAKAO改为也用钻石支付)
//        if (this.m_ShopData.ITEM_TYPE != GUI.SHOP_ITEM_TYPE.SHOP_ITEM_ITEM)
//        {
//            if (Defines._NeedPayConfirm())
//            {
//                cc.GUIBuyPrompt.getInstance().openWindow(myScene, this.m_ShopData, true);
//                return this;
//            }
//
//            _Pay_ByRMB(this.m_ShopData, true);
//            return this;
//        }

        //人民币支付状态下的道具
        if (this.m_ShopData.CURRENCY == GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB)
        {
            if (Defines._NeedPayConfirm())
            {
                cc.GUIBuyPrompt.getInstance().openWindow(myScene, this.m_ShopData);
                return this;
            }

            _Pay_ByRMB(this.m_ShopData);
            return this;
        }

        //
        this._buyItemByDiamondCallback();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _checkUpperLimit: function()
    {
        if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_ITEM)
        {
            //
            var addCount = this.m_ShopData.COUNT.get();

            //
            var itemData = cc.DataMng.getInstance().getItemByID(this.m_ShopData.GAME_ITEM.ID);
            var currentCount = itemData.Number.get();

            //
            if (addCount + currentCount > Defines.MAX_ITEM_COUNT)
            {
                return true;
            }

            //
            return false;
        }

        //
        var itemsCount = {};

        //
        itemsCount[GUI.SHOP_ITEM_TYPE.SHOP_ITEM_NEW] = 1;
        itemsCount[GUI.SHOP_ITEM_TYPE.SHOP_ITEM_SUPER] = 5;
        itemsCount[GUI.SHOP_ITEM_TYPE.SHOP_ITEM_WORLD] = 20;

        //
        addCount = itemsCount[this.m_ShopData.ITEM_TYPE];

        for (var prop in Defines.GameItems)
        {
            if (Defines.GameItems.hasOwnProperty(prop))
            {
                itemData = cc.DataMng.getInstance().getItemByID(Defines.GameItems[prop].ID);
                currentCount = itemData.Number.get();

                if (addCount + currentCount > Defines.MAX_ITEM_COUNT)
                {
                    return true;
                }
            }
        }


        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    _buyItemByDiamondCallback: function()
    {
        //
        var myScene = cc.GUIShop.getInstance().getWindow().getParent();

        //
        if (!cc.DataMng.getInstance().canSpendMoney(this.m_ShopData.TOTAL_PRICE.get()))
        {
            cc.GUIBuyDiamond.getInstance().openWindow(myScene, this.m_ShopData.TOTAL_PRICE.get(), GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND);
            return false;
        }

        //超级礼包和宇宙至尊包都改成用钻石购买
//        if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_SUPER || this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_WORLD)
//        {
            cc.GUIBuyPrompt.getInstance().openWindow(_GUILayer(), this.m_ShopData);
//        }
//        else {
//            var gameItem = this.m_ShopData.GAME_ITEM;
////            cc.DataMng.getInstance().buyItemByID(gameItem.ID, this.m_ShopData.COUNT.get(), this.m_ShopData.TOTAL_PRICE.get());
//        }


        //
//        cc.GUIBuySuccess.getInstance().openWindow(myScene, this.m_ShopData);

        //

        return true;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIShopCellItem.create = function(shopData)
{
    var createNew = new cc.GUIShopCellItem();
    createNew.init(shopData);
    return createNew;
};


//================================================ GUIShopCellContinue =================================================
cc.GUIShopCellContinue = cc.GUIShopCell.extend ({

    //------------------------------------------------------------------------------------------------------------------
    activate: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        var myScene = cc.GUIShop.getInstance().getWindow().getParent();

        if (!cc.DataMng.getInstance().canSpendMoney(this.m_ShopData.TOTAL_PRICE.get()))
        {
            cc.GUIBuyDiamond.getInstance().openWindow(myScene, this.m_ShopData.TOTAL_PRICE.get(), GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND);
            return false;
        }
		cc.GUIBuyPrompt.getInstance().openWindow(_GUILayer(), this.m_ShopData);
        //



        //
//        BIMng.getInstance().logPayByDiamond(this.m_ShopData);

        //
//        cc.GUIBuySuccess.getInstance().openWindow(myScene, this.m_ShopData);
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIShopCellContinue.create = function(shopData)
{
    var createNew = new cc.GUIShopCellContinue();
    createNew.init(shopData);
    return createNew;
};


//================================================ GUIShopCellGift =================================================
cc.GUIShopCellGift = cc.GUIShopCell.extend ({

    //------------------------------------------------------------------------------------------------------------------
    activate: function()
    {
        return this;
    },

    _btnSendCallback: function(sender)
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        //
        var myScene = cc.GUIShop.getInstance().getWindow().getParent();

        cc.GUIShopSendGift.getInstance().openWindow(myScene, GUI.SHOP_DATA.SHOP_DATA_PRESENT[sender.getTag()]);

    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIShopCellGift.create = function(shopData)
{
    var createNew = new cc.GUIShopCellGift();
//    cc.log("shopData = " + shopData);
    createNew.init(shopData);
    return createNew;
};

//================================================ GUIShopCellFreeCandy无限薄荷糖道具的特殊格子 =================================================
cc.GUIShopCellFreeCandy = cc.GUIShopCell.extend ({
    init: function(shopData)
    {
        this._super(shopData);

        //
        var contentSize = this.m_Content.getContentSize();

        //
        var tempStrip = cc.Sprite.createWithSpriteFrameName("shop_item_panel_strip.png");
        var srcSize = tempStrip.getContentSize();

        var bottomStrip = cc.Scale9Sprite.createWithSpriteFrameName("shop_item_panel_strip.png",
            cc.rect(srcSize.width * 0.3, srcSize.height * 0.3, srcSize.width * 0.4, srcSize.height * 0.4));

        var stripSize = cc.size(150 * Defines.BASE_SCALE, 100 * Defines.BASE_SCALE);
        bottomStrip.setContentSize(stripSize);
        this.m_NormalContent.addChild(bottomStrip);
        bottomStrip.setAnchorPoint(cc.p(0, 0));
        bottomStrip.setPosition(cc.p(contentSize.width * 0.5, 50 * Defines.BASE_SCALE));

        var labelDes = cc.LabelTTF.create(shopData.DESCRIPTION, Defines.DefaultFont, 14 * Defines.BASE_SCALE);
        this.m_NormalContent.addChild(labelDes);
        labelDes.setPosition(cc.p(contentSize.width * 0.75, contentSize.height * 0.45));
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    activate: function()
    {
        if (cc.DataMng.getInstance().getFreeCandyFlag()){
            _MsgView_FreeCandyFlag();
            return this;
        }

        var myScene = cc.GUIShop.getInstance().getWindow().getParent();

        //
        if (!cc.DataMng.getInstance().canSpendMoney(this.m_ShopData.TOTAL_PRICE.get()))
        {
            cc.GUIBuyDiamond.getInstance().openWindow(myScene, this.m_ShopData.TOTAL_PRICE.get(), GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND);
            return false;
        }

        cc.GUIBuyPrompt.getInstance().openWindow(_GUILayer(), this.m_ShopData);

        return this;
    }
    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIShopCellFreeCandy.create = function(shopData)
{
    var createNew = new cc.GUIShopCellFreeCandy();
//    cc.log("shopData = " + shopData);
    createNew.init(shopData);
    return createNew;
};