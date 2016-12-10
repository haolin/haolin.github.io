
var Shop_CellBuilder = cc.Class.extend({

    //
    CELL_CONTENT_TAG:
    {
        SELL_TYPE_CONTENT: 101      //背景
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    _static: function()
    {
        return Shop_CellBuilder.prototype;
    },

    buildSpringCell: function(cell, shopData){
        var contentSize = cell.getContentSize();

        //
        var tempStrip = cc.Sprite.createWithSpriteFrameName("shop_item_panel_strip.png");
        var srcSize = tempStrip.getContentSize();

        if (shopData.NAME)
        {
			var title = cc.LabelTTF.create(shopData.NAME, Defines.DefaultFont, 20 * Defines.BASE_SCALE);
			cell.addChild(title, 1);
			title.setColor(cc.c3b(46, 58, 76));
			title.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.9));
		}
        //
        var sprite = cc.Sprite.createWithSpriteFrameName("icon_diamond_5.png");
        cell.addChild(sprite);
        sprite.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.55));
        var spriteCellType = null;
        switch (shopData.CELL_TYPE)
        {
            case GUI.ITEM_CELL_TYPE.CELL_TYPE_NEW:
            {
                spriteCellType = cc.Sprite.createWithSpriteFrameName("shop_mark_new.png");
            }
                break;

            case GUI.ITEM_CELL_TYPE.CELL_TYPE_HOT:
            {
                spriteCellType = cc.Sprite.createWithSpriteFrameName("shop_mark_hot.png");
            }
                break;

            case GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION:
            {
                spriteCellType = cc.Sprite.createWithSpriteFrameName("shop_mark_promotion.png");
            }
                break;

            default :
                break;
        }

        if (spriteCellType)
        {
            cell.addChild(spriteCellType, 0, this._static().CELL_CONTENT_TAG.SELL_TYPE_CONTENT);
            spriteCellType.setPosition(cc.p(43 * Defines.BASE_SCALE, contentSize.height - 41 * Defines.BASE_SCALE));
        }

        //
        var shadow = cc.Sprite.createWithSpriteFrameName("shop_shadow.png");
        cell.addChild(shadow, -1);
        shadow.setAnchorPoint(cc.p(0.5, 0.2));
        shadow.setPosition(cc.pSub(sprite.getPosition(), cc.p(0, sprite.getContentSize().height * 0.5)));
        shadow.setScale(sprite.getContentSize().width/shadow.getContentSize().width);

        //有赠送的用买 没用赠送的用X
        if (shopData.COUNT.get() > 1)
        {
            var labelCount = GUI.createNumberLabel(shopData.COUNT.get(), _GUIPath + "Num/num_9_20x24.png", 20, 24, "0");
            cell.addChild(labelCount);
            labelCount.setAnchorPoint(cc.p(1, 0.5));
            labelCount.setPosition(cc.p(contentSize.width - 60 * Defines.BASE_SCALE, 70 * Defines.BASE_SCALE));

            var typeHaveGift = shopData.GIFT_COUNT && shopData.GIFT_COUNT.get() >= 0;

            if (shopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE){
                var labelCountMulti = typeHaveGift ?
                    cc.Sprite.createWithSpriteFrameName("general_label_buy_Continue.png") :
                    cc.Sprite.create(_GUIPath + "Num/num_9_x.png");
                cell.addChild(labelCountMulti);
                labelCountMulti.setAnchorPoint(cc.p(1, 0.5));

                var offset = typeHaveGift ? cc.p(0, 0) : cc.p(-5 * Defines.BASE_SCALE, 0);

                labelCount.setPosition(cc.p(contentSize.width - 60 * Defines.BASE_SCALE - labelCount.getContentSize().width, 70 * Defines.BASE_SCALE));
                var multiPos = cc.p(labelCount.getPosition().x, 70 * Defines.BASE_SCALE);
                labelCountMulti.setPosition(cc.pAdd(multiPos, offset));
            }
            else {
                var labelCountMulti = typeHaveGift ?
                    cc.Sprite.createWithSpriteFrameName("general_label_buy.png") :
                    cc.Sprite.create(_GUIPath + "Num/num_9_x.png");
                cell.addChild(labelCountMulti);
                labelCountMulti.setAnchorPoint(cc.p(1, 0.5));

                var offset = typeHaveGift ? cc.p(0, 0) : cc.p(-5 * Defines.BASE_SCALE, 0);
                var multiPos = cc.p(labelCount.getPosition().x - labelCount.getContentSize().width, 70 * Defines.BASE_SCALE);
                labelCountMulti.setPosition(cc.pAdd(multiPos, offset));
            }
        }

        //
        if (shopData.GIFT_COUNT && shopData.GIFT_COUNT.get() > 0)
        {
            var spriteGift = null;
            var labelGiftCount = null;
            switch (shopData.ITEM_TYPE)
            {
                case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND:
                {
                    spriteGift = cc.Sprite.createWithSpriteFrameName("general_label_gift_1.png");
                    labelGiftCount = GUI.createNumberLabel(
                        shopData.GIFT_COUNT.get(), _GUIPath + "Num/num_10_16x20.png", 16, 20, "0");
                }
                    break;

                case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE:
                case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE:
                {
                    spriteGift = cc.Sprite.createWithSpriteFrameName("general_label_gift_2.png");
                    labelGiftCount = GUI.createNumberLabel(
                        shopData.GIFT_COUNT.get(), _GUIPath + "Num/num_8_16x22.png", 16, 20, "0");
                }
                    break;

                default :
                    break;
            }

            if (spriteGift && labelGiftCount)
            {
                cell.addChild(spriteGift);
                spriteGift.setAnchorPoint(cc.p(1, 0.5));

                cell.addChild(labelGiftCount);
                labelGiftCount.setAnchorPoint(cc.p(1, 0.5));

                labelGiftCount.setPosition(cc.p(contentSize.width/2 + 75 * Defines.BASE_SCALE, 45 * Defines.BASE_SCALE));
                spriteGift.setPosition(cc.p(labelGiftCount.getPosition().x - labelGiftCount.getContentSize().width, 45 * Defines.BASE_SCALE));
            }

            if (shopData.SF_GIFT && shopData.SF_GIFT.get() > 0){
				var giftBg = cc.Sprite.createWithSpriteFrameName("game_add_moves_back_spring.png");
				cell.addChild(giftBg);
				giftBg.setPosition(cc.p(contentSize.width - 18 * Defines.BASE_SCALE, 60 * Defines.BASE_SCALE));
				giftBg.setScale(0.5);
				
				var giftAdd = cc.Sprite.createWithSpriteFrameName("start_end_diamond_add_spring.png");
				cell.addChild(giftAdd);
				giftAdd.setPosition(cc.p(contentSize.width - 36 * Defines.BASE_SCALE, 60 * Defines.BASE_SCALE));
				giftAdd.setScale(0.4);
				
				var labelGiftCount = GUI.createNumberLabel(
                        shopData.SF_GIFT.get(),
						 _GUIPath + "Num/num_10_16x20.png", 16, 20, "0");
			
				cell.addChild(labelGiftCount);
				labelGiftCount.setScale(0.8);
				labelGiftCount.setPosition(cc.p(contentSize.width - 28 * Defines.BASE_SCALE, 52 * Defines.BASE_SCALE));
						
            }
        }

        var count = 10;
        var labelPrice = cc.LabelTTF.create(shopData.TOTAL_PRICE.get().toString() + "元", Defines.DefaultFont, 15 * Defines.BASE_SCALE);
        cell.addChild(labelPrice);
        labelPrice.setAnchorPoint(cc.p(1, 0.5));

        labelPrice.setPosition(cc.p(contentSize.width * 0.95, contentSize.height * 0.1));
        //
        return cell;

    },
    //------------------------------------------------------------------------------------------------------------------
    buildCell: function(cell, shopData)
    {
        var contentSize = cell.getContentSize();
        //
        var tempStrip = cc.Sprite.createWithSpriteFrameName("shop_item_panel_strip.png");
        var srcSize = tempStrip.getContentSize();

        if (shopData.ITEM_TYPE != GUI.SHOP_ITEM_TYPE.SHOP_ITEM_PRESENT){
            var bottomStrip = cc.Scale9Sprite.createWithSpriteFrameName("shop_item_panel_strip.png",
                cc.rect(srcSize.width * 0.3, srcSize.height * 0.3, srcSize.width * 0.4, srcSize.height * 0.4));

            var stripSize = cc.size(250 * Defines.BASE_SCALE, 40 * Defines.BASE_SCALE);
            bottomStrip.setContentSize(stripSize);
            cell.addChild(bottomStrip);
            bottomStrip.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.16));
        }

//        if (cc.DataMng.getInstance().isSpringFestival() && GUI.isSpringFestivalDiamondPack(shopData.ID)){
//            var spriteHorse = cc.Sprite.createWithSpriteFrameName("girlFestival_image.png");
//            cell.addChild(spriteHorse);
//            spriteHorse.setScale(0.8);
//            spriteHorse.setPosition(contentSize.width - spriteHorse.getContentSize().width * 0.50, contentSize.height * 0.85);
//        }
//
        //
        if (shopData.NAME && !Defines.IS_EN && !Defines.IS_KO)
        {
            var title = cc.LabelTTF.create(shopData.NAME, Defines.DefaultFont, 20 * Defines.BASE_SCALE);
            cell.addChild(title, 1);
            title.setColor(cc.c3b(46, 58, 76));
            title.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.9));
        }

        if (shopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_PRESENT){
            var title = cc.LabelTTF.create(shopData.NAME, Defines.DefaultFont, 20 * Defines.BASE_SCALE);
            cell.addChild(title, 1);
            title.setColor(cc.c3b(46, 58, 76));
            title.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.9));
        }

        //
        var spriteCellType = null;
        switch (shopData.CELL_TYPE)
        {
        case GUI.ITEM_CELL_TYPE.CELL_TYPE_NEW:
            {
                spriteCellType = cc.Sprite.createWithSpriteFrameName("shop_mark_new.png");
            }
            break;

        case GUI.ITEM_CELL_TYPE.CELL_TYPE_HOT:
            {
                spriteCellType = cc.Sprite.createWithSpriteFrameName("shop_mark_hot.png");
            }
            break;

            case GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION:
            {
                spriteCellType = cc.Sprite.createWithSpriteFrameName("shop_mark_promotion.png");
            }
            break;

        default :
            break;
        }

        if (spriteCellType)
        {
            cell.addChild(spriteCellType, 0, this._static().CELL_CONTENT_TAG.SELL_TYPE_CONTENT);
            spriteCellType.setPosition(cc.p(43 * Defines.BASE_SCALE, contentSize.height - 41 * Defines.BASE_SCALE));
            spriteCellType.setVisible(false);
        }

        //
        if (shopData.SPRITE_SOURCE)
        {

            if (shopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE ){
                var sprite = cc.Sprite.createWithSpriteFrameName("shop_cell_sprite_continue.png");
            }
            else{
                var sprite = cc.Sprite.createWithSpriteFrameName(shopData.SPRITE_SOURCE);
            }

            cell.addChild(sprite);

            var shadow = cc.Sprite.createWithSpriteFrameName("shop_shadow.png");
            cell.addChild(shadow, -1);
            shadow.setAnchorPoint(cc.p(0.5, 0.2));

            var itemSprSize = sprite.getContentSize();

            if (Defines.IS_EN){
                if (shopData.ID == 108 || shopData.ID == 109){
                    sprite.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.6));
                }
                else {
                    sprite.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.65));
                }
            }
            else if (shopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_PRESENT){
                sprite.setPosition(cc.p(contentSize.width * 0.3, contentSize.height * 0.7));
                sprite.setScale(0.5);
                itemSprSize = cc.size(itemSprSize.width / 2 , itemSprSize.height / 2);
            }
            else {
                sprite.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.55));
            }

            shadow.setPosition(cc.pSub(sprite.getPosition(), cc.p(0, itemSprSize.height * 0.5)));
            shadow.setScale(itemSprSize.width/shadow.getContentSize().width);
        }
        //


        //有赠送的用买 没用赠送的用X
        if (shopData.COUNT && shopData.COUNT.get() > 1)
        {
            var labelCount = GUI.createNumberLabel(shopData.COUNT.get(), _GUIPath + "Num/num_9_20x24.png", 20, 24, "0");
            cell.addChild(labelCount);
            labelCount.setAnchorPoint(cc.p(1, 0.5));
            labelCount.setPosition(cc.p(contentSize.width - 25 * Defines.BASE_SCALE, 90 * Defines.BASE_SCALE));
			if (shopData.SF_GIFT && shopData.SF_GIFT.get() > 0){
				labelCount.setPosition(cc.p(contentSize.width - 60 * Defines.BASE_SCALE, 90 * Defines.BASE_SCALE));
			}

            var typeHaveGift = shopData.GIFT_COUNT && shopData.GIFT_COUNT.get() >= 0;
            if (shopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE){

                labelCount.setPosition(cc.p(contentSize.width - 60 * Defines.BASE_SCALE - labelCount.getContentSize().width / 2 - 20 * Defines.BASE_SCALE, 190 * Defines.BASE_SCALE));
                var labelCountMulti = typeHaveGift ?
                    cc.Sprite.createWithSpriteFrameName("general_label_buy_Continue.png") :
                    cc.Sprite.create(_GUIPath + "Num/num_9_x.png");
                cell.addChild(labelCountMulti);
                labelCountMulti.setAnchorPoint(cc.p(1, 0.5));

//                labelCount.setPosition(cc.p(contentSize.width - 60 * Defines.BASE_SCALE - labelCount.getContentSize().width, 70 * Defines.BASE_SCALE));
                var offset = typeHaveGift ? cc.p(0, 0) : cc.p(-5 * Defines.BASE_SCALE, 0);
                var multiPos = cc.p(labelCount.getPosition().x + labelCount.getContentSize().width/ 2 + 20 * Defines.BASE_SCALE, labelCount.getPosition().y);
                labelCountMulti.setPosition(cc.pAdd(multiPos, offset));
            }
            else {
                if (shopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND){
                    var labelCountMulti = typeHaveGift ?
                        cc.Sprite.createWithSpriteFrameName("general_label_buy_diamond.png") :
                        cc.Sprite.create(_GUIPath + "Num/num_9_x.png");
                }
                else {
                    var labelCountMulti = typeHaveGift ?
                        cc.Sprite.createWithSpriteFrameName("general_label_buy.png") :
                        cc.Sprite.create(_GUIPath + "Num/num_9_x.png");
                }
                cell.addChild(labelCountMulti);
                labelCountMulti.setAnchorPoint(cc.p(1, 0.5));

                var offset = typeHaveGift ? cc.p(0, 0) : cc.p(-5 * Defines.BASE_SCALE, 0);
                var multiPos = cc.p(labelCount.getPosition().x - labelCount.getContentSize().width, labelCount.getPosition().y);
                labelCountMulti.setPosition(cc.pAdd(multiPos, offset));
            }


        }
        //
        if (shopData.GIFT_COUNT && shopData.GIFT_COUNT.get() > 0)
        {
            var spriteGift = null;
            var labelGiftCount = null;
            switch (shopData.ITEM_TYPE)
            {
            case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND:
                {
                    spriteGift = cc.Sprite.createWithSpriteFrameName("general_label_gift_1.png");
                    labelGiftCount = GUI.createNumberLabel(
                        shopData.GIFT_COUNT.get(), _GUIPath + "Num/num_10_16x20.png", 16, 20, "0");
                }
                break;

            case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE:
            case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE:
                {
                    spriteGift = cc.Sprite.createWithSpriteFrameName("general_label_gift_2.png");
                    labelGiftCount = GUI.createNumberLabel(
                        shopData.GIFT_COUNT.get(), _GUIPath + "Num/num_8_16x22.png", 16, 20, "0");
                }
                break;

            default :
                break;
            }

            if (spriteGift && labelGiftCount)
            {
                cell.addChild(spriteGift);
                spriteGift.setAnchorPoint(cc.p(1, 0.5));

                cell.addChild(labelGiftCount);
                labelGiftCount.setAnchorPoint(cc.p(1, 0.5));

                labelGiftCount.setPosition(cc.p(contentSize.width - 25 * Defines.BASE_SCALE, 65 * Defines.BASE_SCALE));

                if (shopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE){
                    labelGiftCount.setPosition(cc.p(labelCount.getPosition().x, 165 * Defines.BASE_SCALE));
                }

                spriteGift.setPosition(cc.p(labelGiftCount.getPosition().x - labelGiftCount.getContentSize().width, labelGiftCount.getPosition().y));
            }

			if (shopData.SF_GIFT && shopData.SF_GIFT.get() > 0){		
				labelGiftCount.setPosition(cc.p(contentSize.width/2 + 75 * Defines.BASE_SCALE, 65 * Defines.BASE_SCALE));
                spriteGift.setPosition(cc.p(labelGiftCount.getPosition().x - labelGiftCount.getContentSize().width, 65 * Defines.BASE_SCALE));
			
				var giftBg = cc.Sprite.createWithSpriteFrameName("game_add_moves_back_spring.png");
				cell.addChild(giftBg);
				giftBg.setPosition(cc.p(contentSize.width - 18 * Defines.BASE_SCALE, 60 * Defines.BASE_SCALE));
				giftBg.setScale(0.5);
				
				var giftAdd = cc.Sprite.createWithSpriteFrameName("start_end_diamond_add_spring.png");
				cell.addChild(giftAdd);
				giftAdd.setPosition(cc.p(contentSize.width - 36 * Defines.BASE_SCALE, 60 * Defines.BASE_SCALE));
				giftAdd.setScale(0.4);
				
				var labelGiftCount = GUI.createNumberLabel(
                        shopData.SF_GIFT.get(),
						 _GUIPath + "Num/num_10_16x20.png", 16, 20, "0");
			
				cell.addChild(labelGiftCount);
				labelGiftCount.setScale(0.8);
				labelGiftCount.setPosition(cc.p(contentSize.width - 28 * Defines.BASE_SCALE, 52 * Defines.BASE_SCALE));
			}
				
        }
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
        }

        if (shopData.ORIGINAL_PRICE)
        {
            //
            var originalPrice = GUI.createNumberLabel(
                shopData.ORIGINAL_PRICE, _GUIPath + "Num/num_3_14x18.png", 14, 18, "0");
            cell.addChild(originalPrice);
            originalPrice.setAnchorPoint(cc.p(0, 0.5));

            //删除线
            var deleteLine = cc.Sprite.createWithSpriteFrameName("shop_delete_line.png");
            originalPrice.addChild(deleteLine);
            var lineBgSize = originalPrice.getContentSize();
            deleteLine.setPosition(cc.p(lineBgSize.width * 0.5, lineBgSize.height * 0.5));
            deleteLine.setScaleX(lineBgSize.width/deleteLine.getContentSize().width);
        }

        //
        var labelPrice = GUI.createNumberLabel(
            shopData.TOTAL_PRICE.get(), _GUIPath + "Num/num_2_20x24.png", 20, 24, ".");
        cell.addChild(labelPrice);
        labelPrice.setAnchorPoint(cc.p(1, 0.5));

        var currencySize = spriteCurrency.getContentSize();
        var labelPriceSize = labelPrice.getContentSize();
        var originPriceSize = originalPrice ? originalPrice.getContentSize() : cc.size(0, 0);
        var toSide = (contentSize.width - currencySize.width - labelPriceSize.width - originPriceSize.width) * 0.5;

        if (shopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_PRESENT){
            labelPrice.setAnchorPoint(cc.p(0, 0.5));
            spriteCurrency.setPosition(cc.p(contentSize.width * 0.55, contentSize.height * 0.7));
            labelPrice.setPosition(cc.p(spriteCurrency.getPosition().x + spriteCurrency.getContentSize().width + 5 * Defines.BASE_SCALE, contentSize.height * 0.7));//40
            labelPrice.setScale(0.8);
        }
        else if (shopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE ){
            spriteCurrency.setPosition(cc.p(toSide, contentSize.height * 0.16));
            labelPrice.setPosition(cc.p(contentSize.width - toSide, contentSize.height * 0.15 + 5 * Defines.BASE_SCALE));
        }
        else {
            spriteCurrency.setPosition(cc.p(toSide, contentSize.height * 0.16));
            labelPrice.setPosition(cc.p(contentSize.width - toSide, contentSize.height * 0.15));
        }

        originalPrice && originalPrice.setPosition(cc.p(toSide + currencySize.width, contentSize.height * 0.15));

        if (shopData.GIFT_DIAMOND){
            var diamond_icon = cc.Sprite.createWithSpriteFrameName("general_diamond_1.png");
            cell.addChild(diamond_icon);
            diamond_icon.setPosition(cc.p(50 * Defines.BASE_SCALE, 188 * Defines.BASE_SCALE));

            var labelCount = GUI.createNumberLabel(shopData.GIFT_DIAMOND.get(), _GUIPath + "Num/num_9_20x24.png", 20, 24, "0");
            cell.addChild(labelCount);
            labelCount.setAnchorPoint(cc.p(0, 0.5));
            labelCount.setPosition(cc.p(110 * Defines.BASE_SCALE, 182 * Defines.BASE_SCALE));

            var labelCountMulti = cc.Sprite.create(_GUIPath + "Num/num_9_x.png");
            cell.addChild(labelCountMulti);
            labelCountMulti.setAnchorPoint(cc.p(0, 0.5));

            labelCountMulti.setPosition(cc.p(90 * Defines.BASE_SCALE, 182 * Defines.BASE_SCALE));
        }

        if (shopData.GIFT_CANDY){
            var candy_icon = cc.Sprite.createWithSpriteFrameName("general_sugar_0.png");
            cell.addChild(candy_icon);
            candy_icon.setPosition(cc.p(50 * Defines.BASE_SCALE, 117 * Defines.BASE_SCALE));

            var labelCountCandy = GUI.createNumberLabel(shopData.GIFT_CANDY.get(), _GUIPath + "Num/num_9_20x24.png", 20, 24, "0");
            cell.addChild(labelCountCandy);
            labelCountCandy.setAnchorPoint(cc.p(0, 0.5));
            labelCountCandy.setPosition(cc.p(110 * Defines.BASE_SCALE, 117 * Defines.BASE_SCALE));

            var labelCountMultiCandy = cc.Sprite.create(_GUIPath + "Num/num_9_x.png");
            cell.addChild(labelCountMultiCandy);
            labelCountMultiCandy.setAnchorPoint(cc.p(0, 0.5));

            labelCountMultiCandy.setPosition(cc.p(90 * Defines.BASE_SCALE, 117 * Defines.BASE_SCALE));
        }

        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    decorateCellDiscount: function(cell, discount, isSpringFestival)
    {
        cc.log("decorateCellDiscount = " + discount);
        //
        var sellTypeContent = cell.getChildByTag(this._static().CELL_CONTENT_TAG.SELL_TYPE_CONTENT);
        sellTypeContent.setVisible(false);

        if (discount <= 0 )
        {
            if (!isSpringFestival){
                return this;
            }
        }

        //
//		if (isSpringFestival){
//			var discountContent = cc.Sprite.createWithSpriteFrameName("shop_mark_temp.png");
//		}
        var discountContent = cc.Sprite.createWithSpriteFrameName("shop_mark_temp.png");
        discountContent.setAnchorPoint(sellTypeContent.getAnchorPoint());
        discountContent.setPosition(sellTypeContent.getPosition());
        cell.addChild(discountContent);

        //
        if (Defines.IS_EN)
        {
            var strEn = (100 - discount) + "%off";
            var enLabel = cc.LabelTTF.create(strEn, Defines.DefaultFont, 20 * Defines.BASE_SCALE);
            discountContent.addChild(enLabel);
            enLabel.setPosition(cc.p(30 * Defines.BASE_SCALE, 62 * Defines.BASE_SCALE));
            enLabel.setRotation(-45);
            return cell;
        }

        if (Defines.IS_KO)
        {
            if (isSpringFestival)
            {
                var strEn = "1 + 1";
            }
            else {
                var strEn = discount + "%추가";
            }

            var enLabel = cc.LabelTTF.create(strEn, Defines.DefaultFont, 16 * Defines.BASE_SCALE);
            discountContent.addChild(enLabel);
            enLabel.setPosition(cc.p(30 * Defines.BASE_SCALE, 62 * Defines.BASE_SCALE));
            enLabel.setRotation(-45);
            return cell;
        }

        //
        var contentLayer = cc.Layer.create();/*cc.LayerColor.create(cc.c4(32, 32, 32, 150));*/
        contentLayer.ignoreAnchorPointForPosition(false);
        contentLayer.setContentSize(sellTypeContent.getContentSize());
        contentLayer.setAnchorPoint(sellTypeContent.getAnchorPoint());
        contentLayer.setPosition(sellTypeContent.getPosition());
        contentLayer.setRotation(-45);
        cell.addChild(contentLayer);

        //
        var discountArr = [];

        //
        var discount_0 = parseInt(discount/10);
        var discountContent_0 = GUI.createNumberLabel(discount_0, _GUIPath + "Num/num_17_18X26.png", 18, 26, "0");
        contentLayer.addChild(discountContent_0);
        discountContent_0.setPositionY(contentLayer.getContentSize().height * 0.71);
        discountArr.push(discountContent_0);

        var discount_1 = parseInt(discount%10);
        if (discount_1 > 0)
        {
            var discountPoint = cc.Sprite.create(_GUIPath + "Num/num_17_point.png");
            contentLayer.addChild(discountPoint);
            discountPoint.setPositionY(contentLayer.getContentSize().height * 0.65);
            discountArr.push(discountPoint);

            var discountContent_1 = GUI.createNumberLabel(discount_1, _GUIPath + "Num/num_17_18X26.png", 18, 26, "0");
            contentLayer.addChild(discountContent_1);
            discountContent_1.setPositionY(contentLayer.getContentSize().height * 0.71);
            discountArr.push(discountContent_1);
        }

        var discountLabel = cc.Sprite.createWithSpriteFrameName("shop_label_discount.png");
        contentLayer.addChild(discountLabel);
        discountLabel.setPositionY(contentLayer.getContentSize().height * 0.72);
        discountArr.push(discountLabel);

        GUI.autoLayoutX(discountArr, contentLayer.getContentSize().width, -2.5);
        return cell;
    }

});


//=================================================== GUIShopCell ======================================================
cc.GUIShopCell = cc.Class.extend ({

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
        if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE || this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_PRESENT){
            this.m_Content = cc.Sprite.createWithSpriteFrameName("shop_cell_panel_continue.png");
        }
        else {
            this.m_Content = cc.Sprite.createWithSpriteFrameName("shop_cell_panel.png");
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
        var cellBuilder = new Shop_CellBuilder();
        cellBuilder.buildCell(this.m_NormalContent, this.m_ShopData);

        if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND ){
            cellBuilder.decorateCellDiscount(this.m_NormalContent, this.m_ShopData.DISCOUNT , this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_PRESENT);
        }

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
    selected: function()
    {
        if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_PRESENT){
            return this;
        }

        if (this.m_Content.getScaleX() < 0)
        {
            this.m_Content.setScaleX(-0.9);
            this.m_Content.setScaleY(0.9);
            return this;
        }

        this.m_Content.setScale(0.9);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    unselected: function()
    {
        if (this.m_ShopData.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_PRESENT){
            return this;
        }

        if (this.m_Content.getScaleX() < 0)
        {
            this.m_Content.setScaleX(-1.0);
            this.m_Content.setScaleY(1.0);
            return this;
        }

        this.m_Content.setScale(1.0);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    activate: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});