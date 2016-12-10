
var SimpleShop_CellBuilder = cc.Class.extend({

    //
    CELL_CONTENT_TAG:
    {
        SELL_TYPE_CONTENT: 101      //背景
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_ShopData = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    _static: function()
    {
        return Shop_CellBuilder.prototype;
    },
    addBtnUI: function(num)
    {
        var btn = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_temp_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_temp_sel.png"),
            this._btnEnterMiningCallback, this);

        btn.setPosition(cc.p(this.getCellPos(num), _ScreenCenter().y - 150  * Defines.BASE_SCALE));
        btn.setTag(num);

        var diamondImg_1 =  cc.Sprite.createWithSpriteFrameName("general_diamond_1.png");
        btn.addChild(diamondImg_1);
        diamondImg_1.setPosition(cc.p( 40  * Defines.BASE_SCALE, btn.getContentSize().height / 2 + 5  * Defines.BASE_SCALE));
        diamondImg_1.setScale(0.6);

        var diamondPrice_1 = GUI.createNumberLabel(this.getCellPrice(num), _GUIPath + "Num/num_12_28x40.png", 28, 40,".");
        btn.addChild(diamondPrice_1);
        diamondPrice_1.setPosition(cc.p( 65  * Defines.BASE_SCALE, btn.getContentSize().height * 0.3));

        return btn;
    },

    shopCellCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND){
            if (Defines._NeedPayConfirm())
            {
                var myScene = cc.GUISimpleShop.getInstance().getWindow().getParent();
                cc.GUIBuyPrompt.getInstance().openWindow(myScene, this.m_ShopData);
            }
            else
            {
                _Pay_ByRMB(this.m_ShopData);
            }

        }
        else {
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
            if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE)
            {
                this._buyHeartsByDiamond();
            }
            else if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_HEART_LIMIT)
            {
                this._buyHeartLimitByDiamond();
            }

        }
        //

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    _buyHeartsByDiamond: function()
    {
        var needDiamond = this.m_ShopData.TOTAL_PRICE.get();
        var myScene = _GUILayer();//cc.Director.getInstance().getRunningScene();

        if (cc.DataMng.getInstance().canSpendMoney(needDiamond))
        {
            cc.DataMng.getInstance().spendMoney(needDiamond, MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_IN_SHOP, {"id": this.m_ShopData.ID}); //商店购买
            var addCount = this.m_ShopData.COUNT.get() + this.m_ShopData.GIFT_COUNT.get();
            cc.DataMng.getInstance().addHeart(addCount);
            cc.GUITaskKakao.getInstance().addTaskScore(Task.TaskID.DAILY_BUY_HEART,1);

            cc.GUIBuySuccess.getInstance().openWindow(myScene, this.m_ShopData);
            BIMng.getInstance().logPayByDiamond(this.m_ShopData);
        }
        else
        {
            cc.GUIBuyDiamond.getInstance().openWindow(myScene, needDiamond, GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND);
            cc.GUISimpleShop.getInstance().closeWindow();
//            cc.GUIBuyDiamond.getInstance().openWindow(myScene, needDiamond);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _buyHeartLimitByDiamond: function()
    {
        var needDiamond = this.m_ShopData.TOTAL_PRICE.get();
        var myScene = _GUILayer();//cc.Director.getInstance().getRunningScene();

        if (cc.DataMng.getInstance().canSpendMoney(needDiamond))
        {
            cc.DataMng.getInstance().spendMoney(needDiamond, MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_BUY_HEART);
            var addCount = this.m_ShopData.COUNT.get();
            cc.DataMng.getInstance().addHeartRecoverMax(addCount);

            cc.GUIBuySuccess.getInstance().openWindow(myScene, this.m_ShopData);
            BIMng.getInstance().logPayByDiamond(this.m_ShopData);
        }
        else
        {
            cc.GUIBuyDiamond.getInstance().openWindow(myScene, needDiamond, GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND);
            cc.GUISimpleShop.getInstance().closeWindow();
//            cc.GUIBuyDiamond.getInstance().openWindow(myScene, needDiamond);
        }

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    buildCell: function(cell, shopData)
    {
        var contentSize = cell.getContentSize();

        this.m_ShopData = shopData;
        //
        if (shopData.SPRITE_SOURCE)
        {
            if (shopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND){
                var sprite = cc.Sprite.createWithSpriteFrameName("icon_diamond_2.png");
                sprite.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.65));
            }
            else if (shopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_HEART_LIMIT){
                var sprite = cc.Sprite.createWithSpriteFrameName("icon_heart_5.png");
                sprite.setScale(0.75);
                sprite.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.5));
            }
            else {
                var sprite = cc.Sprite.createWithSpriteFrameName("icon_heart_1.png");
                sprite.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.65));
            }

            cell.addChild(sprite);

        }

        //有赠送的用买 没用赠送的用X
        if (shopData.COUNT.get() > 1)
        {
            var labelCount = GUI.createNumberLabel(shopData.COUNT.get(), _GUIPath + "Num/num_9_20x24.png", 20, 24, "0");
            cell.addChild(labelCount);
            labelCount.setAnchorPoint(cc.p(0.5, 0.5));
            labelCount.setPosition(cc.p(contentSize.width * 0.6, 60 * Defines.BASE_SCALE));

            var labelCountMulti =  cc.Sprite.create(_GUIPath + "Num/num_9_x.png");
            cell.addChild(labelCountMulti);
            labelCountMulti.setAnchorPoint(cc.p(0.5, 0.5));
            var multiPos = cc.p(labelCount.getPosition().x - labelCount.getContentSize().width * 0.5 - 20 * Defines.BASE_SCALE, labelCount.getPosition().y);
            labelCountMulti.setPosition(multiPos);
        }

        //
        if (shopData.GIFT_COUNT && shopData.GIFT_COUNT.get() > 0)
        {
            if (shopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND){
                var giftBgSprite = cc.Sprite.createWithSpriteFrameName("images-panel-zhekou01.png");
            }
            else {
                var giftBgSprite = cc.Sprite.createWithSpriteFrameName("images-panel-zhekou02.png");
            }

            cell.addChild(giftBgSprite);
            var giftPos = cc.p(contentSize.width - 30 * Defines.BASE_SCALE, 155 * Defines.BASE_SCALE);
            giftBgSprite.setPosition(giftPos);

            var labelGiftCount = GUI.createNumberLabel(
                shopData.GIFT_COUNT.get(), _GUIPath + "Num/num_10_16x20.png", 16, 20, "0");
            var spriteGift = cc.Sprite.createWithSpriteFrameName("general_label_gift_1.png");

            if (spriteGift && labelGiftCount)
            {
                cell.addChild(spriteGift);
                spriteGift.setAnchorPoint(cc.p(0.5, 0.5));

                cell.addChild(labelGiftCount);
                labelGiftCount.setAnchorPoint(cc.p(0.5, 0.5));

                labelGiftCount.setPosition(cc.p(giftPos.x, giftPos.y - 10 * Defines.BASE_SCALE));
                labelGiftCount.setScale(0.8);
                spriteGift.setPosition(cc.p(labelGiftCount.getPosition().x , labelGiftCount.getPosition().y + 23 * Defines.BASE_SCALE));
                spriteGift.setScale(1.3);
            }

        }
        var btnBuy = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_temp_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_temp_sel.png"),
            this.shopCellCallback, this);
        btnBuy.setScale(0.8);
//        btnBuy.setTag(num);

        this.m_Menu = cc.Menu.create(btnBuy);
        this.m_Menu.setPosition(cc.p(0, 0));
        cell.addChild(this.m_Menu);

        //
        var spriteCurrency = null;
        switch (shopData.CURRENCY)
        {
            case GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB:
            {
                if (Defines.OS.isiOS()){
                    spriteCurrency = cc.Sprite.createWithSpriteFrameName("general_rmb.png");
                }
                else {
                    spriteCurrency = cc.Sprite.createWithSpriteFrameName("general_korean.png");
                }
            }
                break;

            case GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND:
            {
                spriteCurrency = cc.Sprite.createWithSpriteFrameName("general_diamond_2.png");
            }
                break;

            default :
                break;
        }

        if (spriteCurrency)
        {
            cell.addChild(spriteCurrency);
            spriteCurrency.setAnchorPoint(cc.p(0, 0.5));
            spriteCurrency.setScale(0.8);
        }

        if (shopData.ORIGINAL_PRICE)
        {
            //
            var originalPrice = GUI.createNumberLabel(
                shopData.ORIGINAL_PRICE, _GUIPath + "Num/num_3_14x18.png", 14, 18, "0");
            cell.addChild(originalPrice);
            originalPrice.setAnchorPoint(cc.p(1, 0.5));

            //删除线
            var deleteLine = cc.Sprite.createWithSpriteFrameName("shop_delete_line.png");
            originalPrice.addChild(deleteLine);
            var lineBgSize = originalPrice.getContentSize();
            deleteLine.setPosition(cc.p(lineBgSize.width * 0.5, lineBgSize.height * 0.5));
            deleteLine.setScaleX(lineBgSize.width/deleteLine.getContentSize().width);
        }

        //
        var labelPrice = GUI.createNumberLabel(
            shopData.TOTAL_PRICE.get(),_GUIPath + "Num/num_12_28x40.png", 28, 40,".");
        cell.addChild(labelPrice);
        labelPrice.setAnchorPoint(cc.p(1, 0.5));
        labelPrice.setScale(0.8);
        var currencySize = spriteCurrency.getContentSize();
        var labelPriceSize = labelPrice.getContentSize();
        var originPriceSize = originalPrice ? originalPrice.getContentSize() : cc.size(0, 0);
        var toSide = (contentSize.width - currencySize.width - labelPriceSize.width - originPriceSize.width) * 0.5 ;

        switch (shopData.CURRENCY)
        {
            case GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB:
            {
                if (Defines.IS_EN ){
                    toSide *= 1.5;

                    if (shopData.TOTAL_PRICE.get() > 10){
                        toSide *= 2.5;
                    }
                }
                else if (Defines.IS_KO){
                    cc.log("if (Defines.IS_KO){ toside = " + toSide);


//                    if (shopData.TOTAL_PRICE.get() > 9.99 ){
                        toSide *= 1.6;
//                    }
                    if (shopData.TOTAL_PRICE.get() > 9.99){
                        toSide = 20 * Defines.BASE_SCALE;
                    }
                }
            }
                break;

            case GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND:
            {
                if (shopData.TOTAL_PRICE.get() > 999 ){
                    toSide *= 1.5;
                }
                if (shopData.TOTAL_PRICE.get() > 9999){
                    toSide *= 2.5;
                }
            }
                break;

            default :
                break;
        }




        spriteCurrency.setPosition(cc.p(toSide, contentSize.height * 0.13));
        labelPrice.setPosition(cc.p(contentSize.width - toSide, contentSize.height * 0.13));
        btnBuy.setPosition(cc.p(contentSize.width * 0.5 ,contentSize.height * 0.10));
        originalPrice && originalPrice.setPosition(cc.p(toSide + currencySize.width, contentSize.height * 0.15));

        return cell;
    }

});


//=================================================== GUIShopCell ======================================================
cc.GUISimpleShopCell = cc.Class.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_Content = null;

        this.m_NormalContent = null;
        this.m_SelectContent = null;

        this.m_ShopData = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(shopData)
    {
        //
        this.m_ShopData = shopData;

        //
        if (shopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND){
            this.m_Content = cc.Sprite.createWithSpriteFrameName("images-panel-zuanshibeijing.png");
        }
        else {
            this.m_Content = cc.Sprite.createWithSpriteFrameName("images-panel-zuanshibeijing.png");
        }


        var contentSize = this.m_Content.getContentSize();

        //
        this.m_NormalContent = cc.Layer.create();
        this.m_NormalContent.setContentSize(contentSize);
        this.m_Content.addChild(this.m_NormalContent);

        //
        this.m_SelectContent = cc.Layer.create();
        this.m_SelectContent.setContentSize(contentSize);
        this.m_Content.addChild(this.m_SelectContent);
        this.m_SelectContent.setVisible(false);
        this.m_SelectContent.setScaleX(-1);

        //
        var cellBuilder = new SimpleShop_CellBuilder();
        cellBuilder.buildCell(this.m_NormalContent, this.m_ShopData);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getContent: function()
    {
        return this.m_Content;
    },

    //------------------------------------------------------------------------------------------------------------------
    canTouch: function(/*touchLocation*/)
    {
        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    setEnabled: function(/*isEnabled*/)
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
//    selected: function()
//    {
//        if (this.m_Content.getScaleX() < 0)
//        {
//            this.m_Content.setScaleX(-0.9);
//            this.m_Content.setScaleY(0.9);
//            return this;
//        }
//
//        this.m_Content.setScale(0.9);
//
//        return this;
//    },
//
//    //------------------------------------------------------------------------------------------------------------------
//    unselected: function()
//    {
//        if (this.m_Content.getScaleX() < 0)
//        {
//            this.m_Content.setScaleX(-1.0);
//            this.m_Content.setScaleY(1.0);
//            return this;
//        }
//
//        this.m_Content.setScale(1.0);
//
//        return this;
//    },

    //------------------------------------------------------------------------------------------------------------------
    activate: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUISimpleShopCell.create = function(shopData)
{
    var createNew = new cc.GUISimpleShopCell();
    createNew.init(shopData);
    return createNew;
};