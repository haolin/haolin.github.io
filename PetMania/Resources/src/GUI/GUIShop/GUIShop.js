
//是否有薄荷糖上限加1的商品
var _CanBuy_HeartLimit = true;

//======================================================= GUIShop ======================================================
cc.GUIShop = cc.GUIWindow.extend ({

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
        this.m_button = [];
        //
        this.m_Enabled = true;
        this.m_SelectItem = null;

        //拖动禁止响应判断
        this.m_ForceActivate = false;
        this.m_MovedDistance = cc.p(0, 0);

        //自动返回开启的关卡
        this.m_BackMapItemKey = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUIShop";
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
        var filePath = _GUIPath + "GUIShop/";

        //
        var winSize = cc.Director.getInstance().getWinSize();

        //
        var background = cc.Sprite.create(filePath + "shop_background.jpg");
        this.getWindow().addChild(background);
        background.setPosition(winSize.width * 0.5, winSize.height * 0.5);
        cc.ResourceMng.getInstance().removeTextureCache(filePath + "shop_background.jpg");

        //
        var textureRect = background.getTextureRect();
        background.setScaleX(_ScreenWidth()/textureRect.width);
        background.setScaleY(_ScreenHeight()/textureRect.height);

        //
        var diamondFrame = cc.Sprite.createWithSpriteFrameName("shop_diamond_panel.png");
        this.getWindow().addChild(diamondFrame);
        diamondFrame.setPosition(cc.p(winSize.width - 120 * Defines.BASE_SCALE, winSize.height - 85 * Defines.BASE_SCALE));

        var diamondFrameSize = diamondFrame.getContentSize();

        var diamondUp = cc.Sprite.createWithSpriteFrameName("general_diamond_2.png");
        diamondUp.setAnchorPoint(cc.p(0, 0.5));
        diamondUp.setPosition(cc.p(diamondFrameSize.width * 0.05, diamondFrameSize.height * 0.55));
        diamondFrame.addChild(diamondUp);

        var diamondCount = cc.DataMng.getInstance().getMoney();
        this.m_DiamondCountLabel = GUI.createNumberLabel(
            diamondCount.toString(), _GUIPath + "Num/num_3_14x18.png", 14, 18, "0");
        diamondFrame.addChild(this.m_DiamondCountLabel);
        this.m_DiamondCountLabel.setAnchorPoint(cc.p(0.5, 0.5));
        this.m_DiamondCountLabel.setPosition(cc.p(diamondFrameSize.width * 0.6, diamondFrameSize.height * 0.55));

        //
        this.m_ButtonBack = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_back_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_back_sel.png"),
            this._btnCloseCallback, this);
        this.m_ButtonBack.setScale(0.8);
        this.m_ButtonBack.setPosition(cc.p(40 * Defines.BASE_SCALE, 30 * Defines.BASE_SCALE));

        //
        var tabPosX = Defines._CanPayDiamond() ? [75, 195, 315, 435, 555] : [0, 75, 195, 315, 435];

        //Tab Buttons
        var buttonDiamond =cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("shop_diamond_nor.png"),
            cc.Sprite.createWithSpriteFrameName("shop_diamond_nor.png"),
            this._btnTabCallback, this);
        buttonDiamond.setPosition(cc.p(tabPosX[0] * Defines.BASE_SCALE, winSize.height - 85 * Defines.BASE_SCALE));
        buttonDiamond.setTag(GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND);
        this.m_TabButton.push(buttonDiamond);

        var tabSelectDiamond = cc.Sprite.createWithSpriteFrameName("shop_diamond_sel.png");
        this.getWindow().addChild(tabSelectDiamond);
        tabSelectDiamond.setPosition(cc.p(tabPosX[0] * Defines.BASE_SCALE, winSize.height - 85 * Defines.BASE_SCALE));
        this.m_TabSelect.push(tabSelectDiamond);

        var tabLineDiamond = cc.Sprite.createWithSpriteFrameName("shop_line_diamond.png");
        tabSelectDiamond.addChild(tabLineDiamond);
        tabLineDiamond.setAnchorPoint(cc.p(0.5, 1));
        tabLineDiamond.setPosition(cc.p(0, 8 * Defines.BASE_SCALE));
        tabLineDiamond.setScaleX(winSize.width * 2.5 / tabLineDiamond.getContentSize().width);

        buttonDiamond.setVisible(Defines._CanPayDiamond());
        tabSelectDiamond.setVisible(Defines._CanPayDiamond());

        //
        var buttonHeart =cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("shop_heart_nor.png"),
            cc.Sprite.createWithSpriteFrameName("shop_heart_nor.png"),
            this._btnTabCallback, this);
        buttonHeart.setPosition(cc.p(tabPosX[1] * Defines.BASE_SCALE, winSize.height - 85 * Defines.BASE_SCALE));
        buttonHeart.setTag(GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE);
        this.m_TabButton.push(buttonHeart);

        var tabSelectHeart = cc.Sprite.createWithSpriteFrameName("shop_heart_sel.png");
        this.getWindow().addChild(tabSelectHeart);
        tabSelectHeart.setPosition(cc.p(tabPosX[1] * Defines.BASE_SCALE, winSize.height - 85 * Defines.BASE_SCALE));
        this.m_TabSelect.push(tabSelectHeart);

        var tabLineHeart = cc.Sprite.createWithSpriteFrameName("shop_line_heart.png");
        tabSelectHeart.addChild(tabLineHeart);
        tabLineHeart.setAnchorPoint(cc.p(0.5, 1));
        tabLineHeart.setPosition(cc.p(0, 8 * Defines.BASE_SCALE));
        tabLineHeart.setScaleX(winSize.width * 2 / tabLineHeart.getContentSize().width);

        //
        var buttonItem =cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("shop_item_nor.png"),
            cc.Sprite.createWithSpriteFrameName("shop_item_nor.png"),
            this._btnTabCallback, this);
        buttonItem.setPosition(cc.p(tabPosX[2] * Defines.BASE_SCALE, winSize.height - 85 * Defines.BASE_SCALE));
        buttonItem.setTag(GUI.SHOP_ITEM_TYPE.SHOP_ITEM_ITEM);
        this.m_TabButton.push(buttonItem);

        var tabSelectItem = cc.Sprite.createWithSpriteFrameName("shop_item_sel.png");
        this.getWindow().addChild(tabSelectItem);
        tabSelectItem.setPosition(cc.p(tabPosX[2] * Defines.BASE_SCALE, winSize.height - 85 * Defines.BASE_SCALE));
        this.m_TabSelect.push(tabSelectItem);

        var tabLineItem = cc.Sprite.createWithSpriteFrameName("shop_line_item.png");
        tabSelectItem.addChild(tabLineItem);
        tabLineItem.setAnchorPoint(cc.p(0.5, 1));
        tabLineItem.setPosition(cc.p(0, 8 * Defines.BASE_SCALE));
        tabLineItem.setScaleX(winSize.width * 2 / tabLineItem.getContentSize().width);

        //
        var buttonContinue =cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("shop_continue_nor.png"),
            cc.Sprite.createWithSpriteFrameName("shop_continue_nor.png"),
            this._btnTabCallback, this);
        buttonContinue.setPosition(cc.p(tabPosX[3] * Defines.BASE_SCALE, winSize.height - 85 * Defines.BASE_SCALE));
        buttonContinue.setTag(GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE);
        this.m_TabButton.push(buttonContinue);

        var tabSelectContinue = cc.Sprite.createWithSpriteFrameName("shop_continue_sel.png");
        this.getWindow().addChild(tabSelectContinue);
        tabSelectContinue.setPosition(cc.p(tabPosX[3] * Defines.BASE_SCALE, winSize.height - 85 * Defines.BASE_SCALE));
        this.m_TabSelect.push(tabSelectContinue);

        var tabLineContinue = cc.Sprite.createWithSpriteFrameName("shop_line_continue.png");
        tabSelectContinue.addChild(tabLineContinue);
        tabLineContinue.setAnchorPoint(cc.p(0.5, 1));
        tabLineContinue.setPosition(cc.p(0, 8 * Defines.BASE_SCALE));
        tabLineContinue.setScaleX(winSize.width * 2 / tabLineContinue.getContentSize().width);

        //
        var buttonPresent =cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("shop_present_nor.png"),
            cc.Sprite.createWithSpriteFrameName("shop_present_nor.png"),
            this._btnTabCallback, this);
        buttonPresent.setPosition(cc.p(tabPosX[4] * Defines.BASE_SCALE, winSize.height - 85 * Defines.BASE_SCALE));
        buttonPresent.setTag(GUI.SHOP_ITEM_TYPE.SHOP_ITEM_PRESENT);
        this.m_TabButton.push(buttonPresent);

        var tabSelectPresent = cc.Sprite.createWithSpriteFrameName("shop_present_sel.png");
        this.getWindow().addChild(tabSelectPresent);
        tabSelectPresent.setPosition(cc.p(tabPosX[4] * Defines.BASE_SCALE, winSize.height - 85 * Defines.BASE_SCALE));
        this.m_TabSelect.push(tabSelectPresent);

        var tabLinePresent = cc.Sprite.createWithSpriteFrameName("shop_line_present.png");
        tabSelectPresent.addChild(tabLinePresent);
        tabLinePresent.setAnchorPoint(cc.p(0.5, 1));
        tabLinePresent.setPosition(cc.p(0, 8 * Defines.BASE_SCALE));
        tabLinePresent.setScaleX(winSize.width * 2 / tabLinePresent.getContentSize().width);




        this.m_ButtonMoreDiamond = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("button_gengduozuanshi-up.png"),
            cc.Sprite.createWithSpriteFrameName("button_gengduozuanshi-down.png"),
            this._btnMoreDiamondCallback, this);
        this.m_ButtonMoreDiamond.setPosition(cc.p(600 * Defines.BASE_SCALE, winSize.height - 85 * Defines.BASE_SCALE));
        this.m_ButtonMoreDiamond.setVisible(false);
        this.m_ButtonMoreDiamond.setScale(0.73);

//        var moreMenu = cc.Menu.create(this.m_ButtonMoreDiamond);
//        moreMenu.setPosition(cc.p(0, 0));
//        this.m_MainUI.addChild(moreMenu);

        if (cc.DataMng.getInstance().isMoreDiamondADEnabled()){
            this.m_ButtonMoreDiamond.setVisible(true);
        }
        //
        this.m_Menu = cc.Menu.create(this.m_ButtonBack ,buttonDiamond, buttonHeart, buttonItem, buttonContinue, buttonPresent, this.m_ButtonMoreDiamond);
		


        this.m_Menu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(this.m_Menu);

        //
        //添加Touch
        var self = this;
        this.getWindow().onTouchBegan = function(touch, event)
        {
            return self.handleTouchBegan(touch, event);
        };

        this.getWindow().onTouchMoved = function(touch, event)
        {
            return self.handleTouchMoved(touch, event);
        };

        this.getWindow().onTouchEnded = function(touch, event)
        {
            return self.handleTouchEnded(touch, event);
        };

        this.getWindow().onTouchCancelled = function(touch, event)
        {
            return self.handleTouchCancelled(touch, event);
        };

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    _btnMoreDiamondCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
//		showMessageToast(Resource.ChineseTxt["msg_0"]);
        if (Define_SysConfig.getInstance().isADEnable()){
            var openResult = adManage.AdManage.getInstance().showPunchBoxOfferWall();
            if (!openResult){
                showMessageToast(Resource.ChineseTxt["msg_0"]);
            }
        }

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    loadShopContent: function()
    {
        var winSize = cc.Director.getInstance().getWinSize();
		
        var itemWidth = 305 * Defines.BASE_SCALE + 30  * Defines.BASE_SCALE;

        //
        var shopData = [
            GUI.SHOP_DATA.SHOP_DATA_DIAMOND.concat(),
            GUI.SHOP_DATA.SHOP_DATA_LIFE.concat(),
            GUI.SHOP_DATA.SHOP_DATA_ITEM.concat(),
            GUI.SHOP_DATA.SHOP_DATA_CONTINUE.concat(),
            GUI.SHOP_DATA.SHOP_DATA_PRESENT.concat()
        ];

        //薄荷糖上限放在薄荷糖包中显示
        if (_CanBuy_HeartLimit)
        {
            shopData[1].push(Tools.clone(GUI.SHOP_DATA.SHOP_DATA_HEART_LIMIT[0]));
        }
		
		//添加无限薄荷糖道具
		shopData[1].push(Tools.clone(GUI.SHOP_DATA.SHOP_DATA_FREE_CANDY[0]));
		

        //礼包放在道具里面显示,除新手礼包外
        //if (/*!isTelcomOperators()*/_Channel_OnlySms.indexOf(CHANNEL) < 0)
        if (_GetForcePayType() != GUI.PAY_TYPE.SMS)
        {
            shopData[2].push(Tools.clone(GUI.SHOP_DATA.SHOP_DATA_SUPER[0]));
            shopData[2].push(Tools.clone(GUI.SHOP_DATA.SHOP_DATA_WORLD[0]));
        }

        //
		var shopCell = [
			cc.GUIShopCellDiamond,
			cc.GUIShopCellHeart,
			cc.GUIShopCellItem,
			cc.GUIShopCellContinue,
			cc.GUIShopCellGift
		];
		
        if (!cc.DataMng.getInstance().isCDKeyEnabled())
        {
			shopData.splice(4,1);
        }

        //
        var self = this;
        shopData.forEach(function(data, index)
        {
            var tabLayer = cc.Layer.create();
            tabLayer.setContentSize(cc.size(itemWidth * Math.ceil(data.length/2), winSize.height));

            data.forEach(function(each, idx, array)
            {
                if (each.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_FREE_CANDY) {
                    var shopItem = cc.GUIShopCellFreeCandy.create(each);
                }
                else {
                    var shopItem = shopCell[index].create(each);
                }

                var itemContent = shopItem.getContent();
                tabLayer.addChild(itemContent);

                if (each.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE){
                    itemContent.setPositionX(itemWidth * (idx  + 0.53));//0.5));
                    itemContent.setPositionY( winSize.height * 0.47);
                }
                else if (each.ITEM_TYPE == GUI.SHOP_ITEM_TYPE.SHOP_ITEM_PRESENT){
                    itemContent.setPositionX(itemWidth * (idx  + 0.53));//0.5));
                    itemContent.setPositionY( winSize.height * 0.47);
                    var btn_Send = cc.MenuItemSprite.create(
                        cc.Sprite.createWithSpriteFrameName("shop_btn_gift_open_nor.png"),
                        cc.Sprite.createWithSpriteFrameName("shop_btn_gift_open_sel.png"),
                        shopItem._btnSendCallback, this);
                    btn_Send.setPosition(cc.p(itemContent.getContentSize().width / 2, 60 * Defines.BASE_SCALE));
                    btn_Send.setTag(idx);

                    self.m_button.push(btn_Send);

                    var send_menu = cc.Menu.create(btn_Send);
                    send_menu.setPosition(cc.p(0, 0));
                    itemContent.addChild(send_menu);

                }
                else {
                    itemContent.setPositionX(itemWidth * ((idx < array.length/2 ? idx : idx - Math.ceil(array.length/2)) + 0.53));//0.5));
                    itemContent.setPositionY(idx < array.length/2 ? winSize.height * 0.63 : winSize.height * 0.28);
                }

                //
                if (!self.m_ShopItem[index])
                {
                    self.m_ShopItem[index] = [];
                }

                self.m_ShopItem[index].push(shopItem);
            });

            //
            var scrollView = cc.ScrollView.create(winSize, tabLayer);
            scrollView.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
            self.getWindow().addChild(scrollView);

            //
            self.m_TabLayer.push(tabLayer);
            self.m_TabScroll.push(scrollView);
        });

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    /*reloadShopContent: function()
    {
        //
        this.m_TabScroll.forEach(function(tabScroll)
        {
            if (tabScroll)
            {
                tabScroll.removeFromParent(true);
                tabScroll = null;
            }
        });

        this.m_TabLayer.splice(0, this.m_TabLayer.length);
        this.m_ShopItem.splice(0, this.m_ShopItem.length);
        this.m_TabScroll.splice(0, this.m_TabScroll.length);

        //
        this.loadShopContent();
        this.updateUIContent();

        return this;
    },*/

    //------------------------------------------------------------------------------------------------------------------
    setEnabled:function (enabled)
    {
        this.m_Enabled = enabled;

        //
        this.m_TabScroll.forEach(function(tabScroll)
        {
            tabScroll.setTouchEnabled(enabled);
        });

        //
        this.m_Menu.setEnabled(enabled);

        this.m_button.forEach(function(btn)
        {
            if (btn){
                btn.setEnabled(enabled);
            }
        });

        //
        this.m_ShopItem[this.m_TabIndex].forEach(function(shopItem)
        {
            shopItem.setEnabled(enabled);
        });

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    registerWithTouchDispatcher: function(isRegister)
    {
        if (isRegister)
        {
            if (cc.Director.getInstance().getTouchDispatcher)
            {
                cc.Director.getInstance().getTouchDispatcher().
                    addTargetedDelegate(this.getWindow(), cc.MENU_HANDLER_PRIORITY, false);
            }
            else
            {
                cc.registerTargettedDelegate(cc.MENU_HANDLER_PRIORITY, false, this.getWindow());
            }
        }
        else
        {
            if (cc.Director.getInstance().getTouchDispatcher)
            {
                cc.Director.getInstance().getTouchDispatcher().removeDelegate(this.getWindow());
            }
            else
            {
                cc.unregisterTouchDelegate(this.getWindow());
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleTouchBegan: function(touch/*, event*/)
    {
        if (!this.m_Enabled)
        {
            return false;
        }

		if (this.m_SelectItem){
			return false;
		}

        this.m_SelectItem = this._itemForTouch(touch);

        if (this.m_SelectItem)
        {
            this.m_SelectItem.selected();

            return true;
        }

        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleTouchMoved: function(touch/*, event*/)
    {
        if (!this.m_SelectItem)
        {
            return this;
        }

        if (!this.m_ForceActivate)
        {
            var delta = touch.getDelta();
            this.m_MovedDistance = cc.pAdd(this.m_MovedDistance, delta);

            var checkDis = 30;

            if (Math.abs(this.m_MovedDistance.x) > checkDis || Math.abs(this.m_MovedDistance.y) > checkDis)
            {
                this.m_ForceActivate = true;
            }
        }

        //
        var currentItem = this._itemForTouch(touch);

        if (currentItem != this.m_SelectItem)
        {
            if (this.m_SelectItem)
            {
                this.m_SelectItem.unselected();
                this.m_SelectItem = null;
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleTouchEnded: function(/*touch, event*/)
    {
        if (this.m_SelectItem)
        {
            this.m_SelectItem.unselected();

            if (!this.m_ForceActivate)
            {
                this.m_SelectItem.activate();
            }

            this.m_SelectItem = null;
        }

        //
        this.m_ForceActivate = false;
        this.m_MovedDistance = cc.p(0, 0);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleTouchCancelled:function (/*touch, event*/)
    {
        if (this.m_SelectItem)
        {
            this.m_SelectItem.unselected();
            this.m_SelectItem = null;
        }

        //
        this.m_ForceActivate = false;
        this.m_MovedDistance = cc.p(0, 0);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _itemForTouch: function(touch)
    {
        var tabLayer = this.m_TabLayer[this.m_TabIndex];
        var touchLocation = tabLayer.convertTouchToNodeSpace(touch);

        var shopItem = this.m_ShopItem[this.m_TabIndex];

        for (var index = 0; index < shopItem.length; index++)
        {
            var bound = shopItem[index].getContent().getBoundingBox();

            if (cc.rectContainsPoint(bound, touchLocation))
            {
                if (shopItem[index].canTouch(touchLocation))
                {
                    return shopItem[index];
                }
            }
        }

        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanupHandleData: function()
    {
        //清空触摸数据
        this.m_ForceActivate = false;
        this.m_MovedDistance = cc.p(0, 0);
        this.m_SelectItem = null;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback: function ()
    {
        if (cc.GUIBuyPrompt.getInstance().isWindowOpen()){
            cc.GUIBuyPrompt.getInstance().closeWindow();
        }
		
		if (cc.GUIBuyDiamond.getInstance().isWindowOpen()){
            cc.GUIBuyDiamond.getInstance().closeWindow();
        }

        cc.AudioMng.getInstance().playButtonSound(true);
        cc.log("cc.GUIShop._btnCloseCallback()");
        Scene_MainMap.changeTo(null, this.m_BackMapItemKey);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getButtonCloseRectForGuide: function()
    {
        if (!this.m_ButtonBack)
        {
            return null;
        }

        var size = this.m_ButtonBack.getContentSize();
        var anchorPoint = this.m_ButtonBack.getAnchorPoint();
        var origin = cc.pSub(this.m_ButtonBack.getPosition(), cc.p(size.width * anchorPoint.x, size.height * anchorPoint.y));

        return cc.rect(origin.x, origin.y, size.width, size.height);
    },

    //------------------------------------------------------------------------------------------------------------------
    getShopItemRectForGuide: function()
    {
        var shopItem = this.m_ShopItem[this.m_TabIndex][0];

        if (!shopItem)
        {
            return null;
        }

        var itemContent = shopItem.getContent();
        var size = itemContent.getContentSize();
        var origin = cc.pSub(itemContent.getPosition(), cc.p(size.width/2, size.height/2));
        origin = cc.pAdd(itemContent.getParent().getPosition(), origin);

        return cc.rect(origin.x, origin.y, size.width, size.height);
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnTabCallback: function (sender)
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        this.m_TabIndex = sender.getTag();
        this.updateUIContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifiedUpdate: function()
    {
        if (!this.isWindowOpen())
        {
            return this;
        }

        var diamondCount = cc.DataMng.getInstance().getMoney();
        this.m_DiamondCountLabel.setString(diamondCount.toString());

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateUIContent: function()
    {
        this.m_TabButton.forEach(function(each)
        {
            each.setVisible(true);
        });

        this.m_TabSelect.forEach(function(each)
        {
            each.setVisible(false);
        });

        this.m_TabLayer.forEach(function(each)
        {
            each.setVisible(false);
        });

        this.m_TabScroll.forEach(function(each)
        {
            each.setVisible(false);
        });

        this.m_TabButton[this.m_TabIndex].setVisible(false);
        this.m_TabSelect[this.m_TabIndex].setVisible(true);
        this.m_TabLayer[this.m_TabIndex].setVisible(true);
        this.m_TabScroll[this.m_TabIndex].setVisible(true);

		if (!cc.DataMng.getInstance().isCDKeyEnabled())
        {
			this.m_TabButton[4].setVisible(false);
			this.m_TabSelect[4].setVisible(false);
        }

        //
        if (!Defines._CanPayDiamond())
        {
            this.m_TabButton[0].setVisible(false);
            this.m_TabSelect[0].setVisible(false);
            this.m_TabLayer[0].setVisible(false);
            this.m_TabScroll[0].setVisible(false);
        }

        if (cc.DataMng.getInstance().isMoreDiamondADEnabled()){
            this.m_ButtonMoreDiamond.setVisible(true);
        }
        else {
            this.m_ButtonMoreDiamond.setVisible(false);
        }
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyOpenWindow: function(window)
    {
        if (window instanceof cc.GUIBuyPrompt || window instanceof cc.GUIGuideNormal || window instanceof cc.GUIShopSendGift)
        {
            this.setEnabled(false);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyCloseWindow: function(window)
    {
        if (window instanceof cc.GUIBuyPrompt || window instanceof cc.GUIGuideNormal || window instanceof cc.GUIShopSendGift)
        {
            this.setEnabled(true);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getShopItem: function(group,index)
    {
        if (group >= this.m_ShopItem.length)
        {
            return null;
        }

        if (index >= this.m_ShopItem[group].length)
        {
            return null;
        }

        return this.m_ShopItem[group][index];
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, tabIndex, backMapItemKey)
    {
        this._super(render);
        cc.log("openwindow");
        //
        cc.ResourceMng.getInstance().addToCache(
            Resource._GUIShop_plist,
            Resource._GUIShop_png);

        //
        cc.AudioMng.getInstance().playOpenWindow();

        //
        this.m_TabIndex = tabIndex;
        this.m_BackMapItemKey = backMapItemKey;
        //
        this.registerWithTouchDispatcher(true);
        //
        this.setContent();
        //
        this.loadShopContent();

        //
        this.notifiedUpdate();
        //
        this.updateUIContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();
        cc.log("cc.GUIShop.closeWindow()");
        cc.AudioMng.getInstance().playCloseWindow();

        //
        this.registerWithTouchDispatcher(false);

        //
        this.cleanupHandleData();

        //
        this.getWindow().removeAllChildren(true);

        //
        this.m_TabButton = [];
        this.m_TabSelect = [];
        this.m_TabLayer = [];
        this.m_TabScroll = [];
        this.m_ShopItem = [];
        this.m_ButtonMoreDiamond = null;
        //
        this.m_BackMapItemKey = null;
        this.m_button = [];
        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUIShop_plist,
            Resource._GUIShop_png);
			
	
//		cc.ResourceMng.getInstance().removeFromCache(
//            Resource.Icon_Item_plist,
//            Resource.Icon_Item_png);
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});


cc.GUIShop._instance = null;
cc.GUIShop.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIShop();
        this._instance.init();
        cc.DataMng.getInstance().addGUIObserver(this._instance);
    }

    return this._instance;
};