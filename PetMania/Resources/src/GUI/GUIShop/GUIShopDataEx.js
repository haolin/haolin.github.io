
//检验
var _CheckShopData = function(shopData)
{
    if (!shopData.ID)
    {
        cc.Assert(0, shopData.NAME + "的ID必须是大于0的整数");
    }
};

(function()
{
    for(var pro in GUI.SHOP_DATA)
    {
        if (!GUI.SHOP_DATA.hasOwnProperty(pro))
        {
            return;
        }

        GUI.SHOP_DATA[pro].forEach(
            function(a_shopData)
            {
                _CheckShopData(a_shopData);
            }
        );
    }
})();

//----------------------------------------------------------------------------------------------------------------------
//加密
(function()
{
    for (var shopTab in GUI.SHOP_DATA)
    {
        if (!GUI.SHOP_DATA.hasOwnProperty(shopTab))
        {
            continue;
        }

        //
        GUI.SHOP_DATA[shopTab].forEach(
            function(each)
            {
                if (each.SF_GIFT >= 0)
                {
                    var sfGift = each.SF_GIFT;
                    each.SF_GIFT = cc.GameData.create(null, sfGift);
                }

                //
                if (each.GIFT_COUNT >= 0)
                {
                    var giftCount = each.GIFT_COUNT;
                    each.GIFT_COUNT = cc.GameData.create(null, giftCount);
                }

                //
                if (each.UNIT_PRICE >= 0)
                {
                    var unitPrice = each.UNIT_PRICE;
                    each.UNIT_PRICE = cc.GameData.create(null, unitPrice);
                }

                //
				if (each.COUNT && each.COUNT >= 0)
                {
					var count = each.COUNT;
					each.COUNT = cc.GameData.create(null, count);
                }


                //
                var totalPrice = each.TOTAL_PRICE;
                each.TOTAL_PRICE = cc.GameData.create(null, totalPrice);
				
				if (each.GIFT_DIAMOND && each.GIFT_DIAMOND >= 0)
                {
                    var sfGiftDIAMOND = each.GIFT_DIAMOND;
                    each.GIFT_DIAMOND = cc.GameData.create(null, sfGiftDIAMOND);
                }

                //
                if (each.GIFT_CANDY && each.GIFT_CANDY >= 0)
                {
                    var giftCountCANDY = each.GIFT_CANDY;
                    each.GIFT_CANDY = cc.GameData.create(null, giftCountCANDY);
                }
				
            }
        );
    }
})();


//----------------------------------------------------------------------------------------------------------------------
for(var plist in GUI.SHOP_DATA)
{
    var shopData = GUI.SHOP_DATA[plist];
    if(shopData)
    {

        for(var i in shopData)
        {
            if(shopData[i].PAY && shopData[i].PAY.googleiap){
                addGoogleIap(shopData[i].PAY.googleiap);
            }
            addPayList(shopData[i]);
        }
    }
}

//----------------------------------------------------------------------------------------------------------------------
var _GetShopDataByID = function(id)
{
    for (var shopTab in GUI.SHOP_DATA)
    {
        if (!GUI.SHOP_DATA.hasOwnProperty(shopTab))
        {
            continue;
        }

        var items = GUI.SHOP_DATA[shopTab];
        for (var index = 0; index < items.length; ++index)
        {
            if (items[index] && items[index].ID == id)
            {
                return items[index];
            }
        }
    }

    return null;
};

//----------------------------------------------------------------------------------------------------------------------
GUI.getShopDataWithItemID = function(itemID)
{
    var shopItemData = GUI.SHOP_DATA.SHOP_DATA_ITEM;

    for (var index = 0; index < shopItemData.length; index++)
    {
        if (!shopItemData[index].GAME_ITEM)
        {
            continue;
        }

        if (shopItemData[index].GAME_ITEM.ID == itemID)
        {
            return shopItemData[index];
        }
    }

    return null;
};

//----------------------------------------------------------------------------------------------------------------------
GUI.getExactDiamondShopData = function(needCount)
{
    var curCount = cc.DataMng.getInstance().getMoney();
    var devoidCount = needCount - curCount;

    var shopData = GUI.SHOP_DATA.SHOP_DATA_DIAMOND;

    for (var index = 0; index < shopData.length; index++)
    {
        var diaCount = shopData[index].COUNT.get();
        var giftCount = shopData[index].GIFT_COUNT.get();
        if (diaCount + giftCount >= devoidCount)
        {
            return shopData[index];
        }
    }

    return GUI.SHOP_DATA.SHOP_DATA_DIAMOND[index - 1];
};

//----------------------------------------------------------------------------------------------------------------------
GUI.getExactShopDataByDiamond = function(needCount)
{
    var shopData = GUI.SHOP_DATA.SHOP_DATA_DIAMOND;

    for (var index = 0; index < shopData.length; index++)
    {
        var diaCount = shopData[index].TOTAL_PRICE.get();
        if (diaCount >= needCount)
        {
            return shopData[index];
        }
    }

    return GUI.SHOP_DATA.SHOP_DATA_DIAMOND[index - 1];
};

//----------------------------------------------------------------------------------------------------------------------
GUI.getExactDoubleDiamondShopData = function(needCount)
{
    var shopDataArr = GUI.SHOP_DATA.SHOP_DATA_DIAMOND;
    var shopData_0 = GUI.getExactDiamondShopData(needCount);

    var indexOf = shopDataArr.indexOf(shopData_0);
    if (indexOf >= shopDataArr.length - 1)
    {
        var shopData_1 = shopDataArr[indexOf - 1];
        return [shopData_1, shopData_0];
    }

    //AppStore版最少为第三档，其它为第四档
    var minIndex = isAppStoreWeiBo() ? 1 : 3;
    var nextIndex = indexOf + 1;
    nextIndex = nextIndex < minIndex ? minIndex : nextIndex;

    shopData_1 = shopDataArr[nextIndex];
    return [shopData_0, shopData_1];
};

//----------------------------------------------------------------------------------------------------------------------
GUI.getPayableDiamondShopData = function(amount)
{
    var shopData = GUI.SHOP_DATA.SHOP_DATA_DIAMOND;
    for (var index = shopData.length - 1; index >= 0; index--)
    {
        var price = shopData[index].TOTAL_PRICE.get();
        if (amount >= price)
        {
            return shopData[index];
        }
    }

    return GUI.SHOP_DATA.SHOP_DATA_DIAMOND[0];
};

//----------------------------------------------------------------------------------------------------------------------
//春节活动的钻石包
GUI.getSpringFestivalDiamondPack = function()
{
    var shopID = Defines.OS.isiOS() ? 6 : 5;
    return _GetShopDataByID(shopID);
};

//是否是春节活动的钻石包
GUI.isSpringFestivalDiamondPack = function(shopID)
{
    var diamondPack = GUI.getSpringFestivalDiamondPack();
    if (diamondPack)
    {
        return diamondPack.ID == shopID;
    }

    return false;
};

GUI.getSpringFestivalDiamondConfig = function(shopID)
{
    var configs =
    {
        "6": {"_norDiscount": 85, "_sfDiscount": 80, "_sfGift": 500},
        "5": {"_norDiscount": 87, "_sfDiscount": 81, "_sfGift": 300}
    };
//    {
//        "3": {"_norDiscount": 90, "_sfDiscount": 83, "_sfGift": 200},
//        "6": {"_norDiscount": 85, "_sfDiscount": 80, "_sfGift": 500}
//    };

    return configs[shopID];
};

//设置到春节活动状态
GUI.setSpringFestivalDiamondPack = function(isSF)
{
	

    var diamondPack = GUI.getSpringFestivalDiamondPack();
    if (diamondPack)
    {
        var packConfig = GUI.getSpringFestivalDiamondConfig(diamondPack.ID);
        if (packConfig)
        {
            diamondPack.SF_GIFT.set(isSF ? packConfig["_sfGift"] : 0);
            diamondPack.DISCOUNT = isSF ? packConfig["_sfDiscount"] : packConfig["_norDiscount"];

            cc.log("设置情人节活动的钻石包： " + diamondPack.NAME + ".SF_GIFT = " + diamondPack.SF_GIFT.get());
        }
    }
};

//----------------------------------------------------------------------------------------------------------------------


