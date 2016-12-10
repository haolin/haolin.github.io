//======================================================================================================================
var Scene_Shop = cc.Scene.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        cc.associateWithNative(this, cc.Scene);

        //
        this.m_ShopType = null;
        this.m_MapItemKey = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Scene_Shop";
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(shopType, mapItemKey)
    {
        //
        this.m_ShopType = (shopType == undefined) ? GUI.SHOP_ITEM_TYPE.SHOP_ITEM_ITEM : shopType;
        this.m_MapItemKey = mapItemKey;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    onEnter: function()
    {
        this._super();
        cc.log("进入 Scene_Shop 场景  **********************");

        //
        cc.GUIShop.getInstance().openWindow(this, this.m_ShopType, this.m_MapItemKey);

        //
        if (cc.Guide.isEnterShopGuide)
        {
            var propsTargetRect = cc.GUIShop.getInstance().getShopItemRectForGuide();
            var blacks = [propsTargetRect];
            var fingerPos = cc.p(_ScreenCenter().x - 300 * Defines.BASE_SCALE,_ScreenCenter().y + 100 * Defines.BASE_SCALE);
            cc.GUIGuideNormal.getInstance().showCustomCuteMonsterBase("BuyProps",
                Resource.ChineseTxt[78],
                this,
                blacks,
                false,
                fingerPos);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    onExit: function()
    {
        this._super();

        cc.log("离开 Scene_Shop 场景  **********************");

        cc.GUIShop.getInstance().closeWindow();

        //
        this.m_ShopType = null;
        this.m_MapItemKey = null;

        this.removeAllChildren(true);
        return this;
    }
});

//
Scene_Shop.create = function(shopType, mapItemKey)
{
    var newScene = new Scene_Shop();
    if (newScene)
    {
        newScene.init(shopType, mapItemKey);
    }

    return newScene;
};

Scene_Shop.changeTo = function(shopType, mapItemKey)
{
    cc.Director.getInstance().replaceScene(Scene_Shop.create(shopType, mapItemKey));
};
