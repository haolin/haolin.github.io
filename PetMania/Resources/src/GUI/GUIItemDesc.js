
cc.GUIItemDesc = cc.GUIPopupWindow.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function ()
    {
        this._super();
        this.m_LevelData = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    description : function ()
    {
        return  "GUIItemDesc";
    },

    //------------------------------------------------------------------------------------------------------------------
    init : function ()
    {
        this._super();

        //
        var self = this;
        this.getWindow().onTouchBegan = function(touch, event)
        {
            return self.handleTouchBegan(touch, event);
        };

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent : function ()
    {
        // 使用九宫格方式创建面板
        var srcSprite = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png");
        var srcSize = srcSprite.getContentSize();

        var targetSize = Defines.IS_EN ?
            cc.size(320 * Defines.BASE_SCALE, 420 * Defines.BASE_SCALE) :
            cc.size(280 * Defines.BASE_SCALE, 420 * Defines.BASE_SCALE);
        var panel = cc.Scale9Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png",
            cc.rect(0, 0, srcSize.width, srcSize.height),
            cc.rect(srcSize.width * 0.3, srcSize.height * 0.3, srcSize.width * 0.4, srcSize.height * 0.4));

        //
        panel.setPreferredSize(targetSize);
        panel.setAnchorPoint(cc.p(0, 0.5));
        panel.setPosition(cc.p(110 * Defines.BASE_SCALE, _ScreenHeight()/2));
        this.getWindow().addChild(panel);

        //
        if (cc.GUIGameLevel.getInstance().isWindowOpen())
        {
            panel.setPosition(cc.p(240 * Defines.BASE_SCALE, targetSize.height/2 + 5 * Defines.BASE_SCALE));
        }

        //
        var labelTitle = cc.Sprite.createWithSpriteFrameName("general_label_item_desc.png");
        labelTitle.setPosition(cc.p(targetSize.width * 0.5, targetSize.height - 38 * Defines.BASE_SCALE));
        panel.addChild(labelTitle);

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(
            cc.p(targetSize.width - 15 * Defines.BASE_SCALE, targetSize.height - 15 * Defines.BASE_SCALE));

        var toNewMenu = cc.Menu.create(buttonClose);
        toNewMenu.setPosition(cc.p(0, 0));
        panel.addChild(toNewMenu);

        //
        var descPosY = [300, 220, 140, 60];

        //
        var itemsList = cc.DataMng.getInstance().getItemsWithLevelData(this.m_LevelData);

        itemsList.forEach(
            function (item, index)
            {
                if (cc.DataMng.getInstance().isItemContainerEnable(index)){
                    //
                    var imageSprite = cc.Sprite.createWithSpriteFrameName(item.SPRITESOURCE);
                    panel.addChild(imageSprite);
                    imageSprite.setPosition(cc.p(50 * Defines.BASE_SCALE, descPosY[index] * Defines.BASE_SCALE));
                    imageSprite.setScale(0.5);

                    //
                    var shopData = GUI.getShopDataWithItemID(item.ID);
                    var itemDesc =
                        (index == 3 && !cc.DataMng.getInstance().isItemContainerEnable(index)) ?
                            Resource.ChineseTxt[117] :  shopData.DESCRIPTION;

                    //
                    var contentDescription = cc.LabelTTF.create(itemDesc, Defines.DefaultFont, 16 * Defines.BASE_SCALE);
                    contentDescription.setAnchorPoint(cc.p(0, 0.5));
                    contentDescription.setPosition(cc.p(90 * Defines.BASE_SCALE, descPosY[index] * Defines.BASE_SCALE));
                    panel.addChild(contentDescription);
                }

            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback: function()
    {
        if (!this.isWindowOpen())
        {
            return this;
        }

        //
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        this.closeWindow();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleTouchBegan: function(/*touch, event*/)
    {
        if (this.isWindowOpen())
        {
            this.closeWindow();
        }

        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow : function (render, levelData)
    {
        this._super(render);

        this.m_LevelData = levelData;
        this.addContent();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow : function ()
    {
        this._super();
        this.getWindow().removeAllChildren(true);
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});


cc.GUIItemDesc._instance = null;
cc.GUIItemDesc.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIItemDesc();
        this._instance.init();
    }

    return this._instance;
};
