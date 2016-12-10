
//----------------------------------------------------------------------------------------------------------------------
var _CheckUpperLimit_Diamond = function(shopData)
{
    if (shopData.ITEM_TYPE != GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND)
    {
        cc.log("ERROR: _CheckUpperLimit_Diamond");
    }

    var addCount = shopData.COUNT.get() + (shopData.GIFT_COUNT ? shopData.GIFT_COUNT.get() : 0);
    var currentCount = cc.DataMng.getInstance().getMoney();

    return addCount + currentCount > Defines.MAX_NUMBER_DATA_VALUE;
};

//----------------------------------------------------------------------------------------------------------------------
var _CheckUpperLimit_Heart = function(shopData)
{
    if (shopData.ITEM_TYPE != GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE)
    {
        return false;
    }

    //
    var addCount = shopData.COUNT.get() + (shopData.GIFT_COUNT ? shopData.GIFT_COUNT.get() : 0);
    var currentCount = cc.DataMng.getInstance().getCurrentHeart();

    //
    return addCount + currentCount > Defines.MAX_HEART_COUNT;
};

//----------------------------------------------------------------------------------------------------------------------
var _CheckUpperLimit_HeartRecover = function(shopData)
{
    if (shopData.ITEM_TYPE != GUI.SHOP_ITEM_TYPE.SHOP_ITEM_HEART_LIMIT)
    {
        return false;
    }

    //
    var addCount = shopData.COUNT.get() + (shopData.GIFT_COUNT ? shopData.GIFT_COUNT.get() : 0);
    var currentCount = cc.DataMng.getInstance().getHeartRecoverMax();

	if (!currentCount){
		currentCount = Defines._GetMaxHearts();
	}

    //
    return addCount + currentCount > Defines.MAX_HEART_COUNT;
};