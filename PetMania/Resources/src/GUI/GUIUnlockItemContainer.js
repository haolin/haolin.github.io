/*

//============================================= GUIUnlockItemContainer =================================================
//
cc.GUIUnlockItemContainer = cc.GUIPopupWindow.extend ({

    description: function ()
    {
        return "GUIUnlockItemContainer";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        this.m_MainUI = null;

        this.m_ContainerIndex = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    setContent: function(itemData, handle, fourthDirty)
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(blockLayer, -1);

        //
        this.m_MainUI = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back0.png");
        this.getWindow().addChild(this.m_MainUI);

        var mainSize = this.m_MainUI.getContentSize();
        var winSize = cc.Director.getInstance().getWinSize();

        //
        this.m_MainUI.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.5));

        //
        var backFrame = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back5.png");
        this.m_MainUI.addChild(backFrame);
        backFrame.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.53));

        //
        var labelTitle = cc.Sprite.createWithSpriteFrameName("general_label_unlock_item.png");
        this.m_MainUI.addChild(labelTitle);
        labelTitle.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.9));

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(mainSize.width - 25 * Defines.BASE_SCALE, mainSize.height - 25 * Defines.BASE_SCALE));

        //
        if (!handle)
        {
            if (this.m_ContainerIndex < 3)
            {
                var labelString = Resource.ChineseTxt[170];
            }
            else
            {
                if (fourthDirty)
                {
                    labelString = Resource.ChineseTxt[171];
                }
                else
                {
                    labelString = Resource.ChineseTxt[172];
                }
            }

            var labelName = cc.LabelTTF.create(labelString, Defines.DefaultFont, 20 * Defines.BASE_SCALE);
            this.m_MainUI.addChild(labelName);
            labelName.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.6));

            var buttonConfirm = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("general_btn_confirm_nor.png"),
                cc.Sprite.createWithSpriteFrameName("general_btn_confirm_sel.png"),
                this._btnConfirmCallback, this);
            buttonConfirm.setPosition(cc.p(mainSize.width * 0.5, 40 * Defines.BASE_SCALE));

            var confirmMenu = cc.Menu.create(buttonClose, buttonConfirm);
            confirmMenu.setPosition(cc.p(0, 0));
            this.m_MainUI.addChild(confirmMenu);

            return this;
        }

        //
        var spriteLockItem = cc.Sprite.createWithSpriteFrameName("general_btn_item_nor.png");
        this.m_MainUI.addChild(spriteLockItem);
        spriteLockItem.setPosition(cc.p(mainSize.width * 0.25, mainSize.height * 0.55));

        var spriteLock = cc.Sprite.createWithSpriteFrameName("general_item_lock.png");
        spriteLockItem.addChild(spriteLock);
        var lockItemSize = spriteLockItem.getContentSize();
        spriteLock.setPosition(cc.p(lockItemSize.width * 0.5, lockItemSize.height * 0.55));

        //
        var spriteToUnlock = cc.Sprite.createWithSpriteFrameName("general_sprite_unlock_item.png");
        this.m_MainUI.addChild(spriteToUnlock);
        spriteToUnlock.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.55));

        //
        var spriteUnlock = cc.Sprite.createWithSpriteFrameName("general_btn_item_nor.png");
        this.m_MainUI.addChild(spriteUnlock);
        spriteUnlock.setPosition(cc.p(mainSize.width * 0.75, mainSize.height * 0.55));

        var spriteItem = cc.Sprite.createWithSpriteFrameName(itemData.SPRITESOURCE);
        spriteUnlock.addChild(spriteItem);
        spriteItem.setScale(68/130);
        var unlockItemSize = spriteUnlock.getContentSize();
        spriteItem.setPosition(cc.p(unlockItemSize.width * 0.5, unlockItemSize.height * 0.55));

        //
        var buttonBuy = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_temp_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_temp_sel.png"),
            this._btnBuyCallback, this);
        buttonBuy.setPosition(cc.p(mainSize.width * 0.5, 55 * Defines.BASE_SCALE));

        //
        var spriteCurrency = cc.Sprite.createWithSpriteFrameName("general_diamond_2.png");
        buttonBuy.addChild(spriteCurrency);
        spriteCurrency.setScale(1.2);
        spriteCurrency.setAnchorPoint(cc.p(0, 0.5));

        //
        var diamond = Defines.DIAMOND_PAY.UNLOCK_ITEM_CONTAINER;
        var labelPrice = GUI.createNumberLabel(diamond.toString(), _GUIPath + "Num/num_12_28x40.png", 28, 40, ".");
        buttonBuy.addChild(labelPrice);
        labelPrice.setAnchorPoint(cc.p(0, 0.5));

        //
        var buttonBuySize = buttonBuy.getContentSize();
        var currencySize = spriteCurrency.getContentSize();
        var labelPriceSize = labelPrice.getContentSize();
        var toSide = (buttonBuySize.width - currencySize.width - labelPriceSize.width) * 0.5;

        //
        spriteCurrency.setPosition(cc.p(toSide, buttonBuySize.height * 0.55));
        labelPrice.setPosition(cc.p(toSide + currencySize.width + 10 * Defines.BASE_SCALE, buttonBuySize.height * 0.55));

        //
        var buyMenu = cc.Menu.create(buttonClose, buttonBuy);
        buyMenu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(buyMenu);

        //
        var labelUnlockNow = cc.LabelTTF.create(Resource.ChineseTxt[169], Defines.DefaultFont, 18 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelUnlockNow);
        labelUnlockNow.setPosition(cc.p(mainSize.width * 0.5, 15 * Defines.BASE_SCALE));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback:function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        this.playLeaveAction(
            function()
            {
                this.closeWindow();
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnBuyCallback: function()
    {
        /* 设计修改
        cc.AudioMng.getInstance().playButtonSound(true);

        var handle = false;
        var diamond = Defines.DIAMOND_PAY.UNLOCK_ITEM_CONTAINER;

        //
        if (cc.DataMng.getInstance().canSpendMoney(diamond))
        {
            //
            BIMng.getBIDiamond().logDiamondCost_ItemContainer(diamond);

            cc.DataMng.getInstance().spendMoney(diamond);
            cc.DataMng.getInstance().setItemContainerEnable(this.m_ContainerIndex, true);

            handle = true;
        }

        //
        var myScene = this.getWindow().getParent();
        this.closeWindow();

        //
        if (!handle)
        {
            cc.GUIBuyDiamond.getInstance().openWindow(myScene, diamond);
        }
        */

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnConfirmCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        this.playLeaveAction(
            function()
            {
                this.closeWindow();
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playEnterAction: function(event)
    {
        var winSize = cc.Director.getInstance().getWinSize();

        var mainSize = this.m_MainUI.getContentSize();
        var mainUIToPosition = cc.p(winSize.width * 0.5, winSize.height * 0.5);
        var mainUIFromPosition = cc.p(winSize.width * 0.5, winSize.height + mainSize.height * 0.5);
        this.m_MainUI.setPosition(mainUIFromPosition);
        this.m_MainUI.stopAllActions();
        this.m_MainUI.runAction(cc.Sequence.create(
            cc.EaseElasticOut.create(cc.MoveTo.create(Defines.FPS * 30, mainUIToPosition), 0.6),
            cc.CallFunc.create(event, this)));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playLeaveAction: function(event)
    {
        var winSize = cc.Director.getInstance().getWinSize();

        var mainSize = this.m_MainUI.getContentSize();
        var mainUIToPosition = cc.p(winSize.width * 0.5, winSize.height + mainSize.height * 0.5);
        this.m_MainUI.stopAllActions();
        this.m_MainUI.runAction(cc.Sequence.create(
            cc.MoveTo.create(Defines.FPS * 10, mainUIToPosition),
            cc.CallFunc.create(event, this)));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    */
/**
     * @param render            父节点
     * @param containerIndex    道具槽序号
     * @param itemData          道具数据
     * @param handle            是否可解锁
     * @param fourthDirty       第四个道具槽是否处于引导状态
     *//*

    openWindow: function(render, containerIndex, itemData, handle, fourthDirty)
    {
        this._super(render);

        //
        cc.AudioMng.getInstance().playOpenWindow();
        this.getWindow().removeAllChildren(true);

        //step1:
        this.m_ContainerIndex = containerIndex;

        //step2:
        this.setContent(itemData, handle, fourthDirty);

        //step3:
        this.playEnterAction();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        //
        cc.AudioMng.getInstance().playCloseWindow();

        //
        this.getWindow().removeAllChildren(true);

        //
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIUnlockItemContainer._instance = null;
cc.GUIUnlockItemContainer.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIUnlockItemContainer();
        this._instance.init();
    }

    return this._instance;
};*/
