/*

//======================================================================================================================
cc.GUIMapFriendAid = cc.GUIWindow.extend({

    description: function ()
    {
        return "GUIMapFriendAid";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //
        this.m_HelpData = null;
        this.m_CurCountLabel = null;

        //
        this.m_ButtonBuy = null;
        this.m_ButtonGo = null;

        //
        this.m_FriendArray = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._super();

        //
        var background = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(background);

        //
        this.m_MainUI = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back1.png");
        this.getWindow().addChild(this.m_MainUI);
        this.m_MainUI.setPosition(_ScreenCenter());

        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        var backFrame = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back6.png");
        this.m_MainUI.addChild(backFrame);
        backFrame.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.53));

        //
        var labelTitle = cc.Sprite.createWithSpriteFrameName("map_aid_title.png");
        this.m_MainUI.addChild(labelTitle);
        labelTitle.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.92));

        //
        var labelDesc = cc.LabelTTF.create(Resource.ChineseTxt["space_6"], Defines.DefaultFont, 18 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelDesc);
        labelDesc.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.8));

        //
        var curProgress = cc.Sprite.createWithSpriteFrameName("map_cur_progress.png");
        this.m_MainUI.addChild(curProgress);
        curProgress.setPosition(cc.p(mainSize.width * 0.42, mainSize.height * 0.3));

        //
        this.m_CurCountLabel = GUI.createNumberLabel("0/5", _GUIPath + "Num/num_2_20x24.png", 20, 24, ".");
        this.m_MainUI.addChild(this.m_CurCountLabel);
        this.m_CurCountLabel.setAnchorPoint(cc.p(0, 0.5));
        this.m_CurCountLabel.setPosition(cc.p(mainSize.width * 0.59, mainSize.height * 0.3));

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(mainSize.width * 0.94, mainSize.height * 0.94));

        //
        var buttonSend = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_ask_help_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_ask_help_sel.png"),
            this._btnSendAidCallback, this);
        buttonSend.setPosition(cc.p(mainSize.width * 0.25, mainSize.height * 0.12));

        //
        this.m_ButtonBuy = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_temp_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_temp_sel.png"),
            this._btnBuyCallback, this);
        this.m_ButtonBuy.setPosition(cc.p(mainSize.width * 0.75, mainSize.height * 0.12));

        //
        if (_UnlockNewStar_ByRMB)
        {
            var spriteCurrency = cc.Sprite.createWithSpriteFrameName("general_rmb.png");
            this.m_ButtonBuy.addChild(spriteCurrency);
            spriteCurrency.setAnchorPoint(cc.p(0, 0.5));

            //
            var labelPrice = GUI.createNumberLabel(
                GUI.SHOP_DATA.SHOP_DATA_UNLOCK_NEW_ZONE[0].TOTAL_PRICE.get(), _GUIPath + "Num/num_12_28x40.png", 28, 40, ".");
            this.m_ButtonBuy.addChild(labelPrice);
            labelPrice.setAnchorPoint(cc.p(0, 0.5));

            //
            var buttonBuySize = this.m_ButtonBuy.getContentSize();
            var currencySize = spriteCurrency.getContentSize();
            var labelPriceSize = labelPrice.getContentSize();
            var toSide = (buttonBuySize.width - currencySize.width - labelPriceSize.width) * 0.5;

            //
            spriteCurrency.setPosition(cc.p(toSide, buttonBuySize.height * 0.55));
            labelPrice.setPosition(cc.p(toSide + currencySize.width, buttonBuySize.height * 0.55));
        }
        else
        {
            var diamondButtonSize = this.m_ButtonBuy.getContentSize();

            var diamondImg = cc.Sprite.createWithSpriteFrameName("general_diamond_2.png");
            this.m_ButtonBuy.addChild(diamondImg);
            diamondImg.setScale(1.2);
            diamondImg.setPosition(cc.p(diamondButtonSize.width * 0.25, diamondButtonSize.height * 0.55));

            var diamond = Defines.DIAMOND_PAY.UNLOCK_NEW_STAR;
            var number = GUI.createNumberLabel(diamond.toString(), _GUIPath + "Num/num_12_28x40.png", 28, 40, ".");
            this.m_ButtonBuy.addChild(number);
            number.setAnchorPoint(cc.p(0.5, 0.5));
            number.setPosition(cc.p(diamondButtonSize.width * 0.65, diamondButtonSize.height * 0.55));
        }

        //
        this.m_ButtonGo = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_temp_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_temp_sel.png"),
            this._btnGoCallback, this);
        this.m_ButtonGo.setPosition(cc.p(mainSize.width * 0.75, mainSize.height * 0.12));

        var goButtonSize = this.m_ButtonGo.getContentSize();

        var labelGo = cc.LabelTTF.create(Resource.ChineseTxt["space_2"], Defines.DefaultFont, 35 * Defines.BASE_SCALE);
        this.m_ButtonGo.addChild(labelGo);
        labelGo.setPosition(cc.p(goButtonSize.width * 0.5, goButtonSize.height * 0.55));

        //
        var labelBuy = cc.LabelTTF.create(Resource.ChineseTxt["space_2"], Defines.DefaultFont, 17 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelBuy);
        labelBuy.setPosition(cc.p(mainSize.width * 0.75, mainSize.height * 0.04));

        //
        var toNewMenu = cc.Menu.create(buttonClose, buttonSend, this.m_ButtonBuy, this.m_ButtonGo);
        toNewMenu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(toNewMenu);
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback: function()
    {
        this.closeWindow();
        cc.GUIMap.getInstance().setZonesEnabled(true);
        cc.GUIMap.getInstance().handleMapEnterAction(true);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnSendAidCallback: function()
    {
        this.closeWindow();
        cc.GUIMap.getInstance().setZonesEnabled(true);
        cc.GUIMap.getInstance().handleMapEnterAction(true);

        //
        var friendOpen = cc.GUISubFriendsList.getInstance().isWindowOpen();
        if (!friendOpen)
        {
            cc.GUISubFriendsList.getInstance().openWindow(
                this.getWindow().getParent(),
                new GUISubFriendsList_Operation_AskHelp(
                    cc.GUIMapMng.getInstance().getMaxProcessMapZoneID()
                )
            );
        }
        else
        {
            cc.GUISubFriendsList.getInstance().closeWindow();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnBuyCallback: function()
    {
        //
        var myScene = cc.GUIMap.getInstance().getWindow().getParent();

        //
        if (_UnlockNewStar_ByRMB)
        {
            var shopData = GUI.SHOP_DATA.SHOP_DATA_UNLOCK_NEW_ZONE[0];
            if (Defines._NeedPayConfirm())
            {
                this.closeWindow();
                cc.GUIBuyPrompt.getInstance().openWindow(myScene, shopData);
            }
            else
            {
                _Pay_ByRMB(shopData);
            }
        }
        else
        {
            var needDiamond = Defines.DIAMOND_PAY.UNLOCK_NEW_STAR;
            if (cc.DataMng.getInstance().canSpendMoney(needDiamond))
            {
                cc.DataMng.getInstance().spendMoney(needDiamond, MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_NEW_PLANT);//解锁新星球
                cc.GUIMapMng.getInstance().unlockNewZone();
                BIMng.getBIDiamond().logDiamondCost_NewZone();
            }
            else
            {
                this.closeWindow();
                cc.GUIBuyDiamond.getInstance().openWindow(myScene, needDiamond);
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnGoCallback: function()
    {
        cc.GUIMapMng.getInstance().unlockNewZone();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateFriendContent: function()
    {
        //
        var helpCount = this.m_HelpData.length > 5 ? 5 : this.m_HelpData.length;
        this.m_CurCountLabel.setString(helpCount.toString() + "/5");

        //
        var mainSize = this.m_MainUI.getContentSize();

        var friendPosition = [
            cc.p(mainSize.width * 0.2, mainSize.height * 0.65),
            cc.p(mainSize.width * 0.5, mainSize.height * 0.65),
            cc.p(mainSize.width * 0.8, mainSize.height * 0.65),
            cc.p(mainSize.width * 0.35, mainSize.height * 0.45),
            cc.p(mainSize.width * 0.65, mainSize.height * 0.45)
        ];

        //
        var self = this;
        friendPosition.forEach(function(position, index)
        {
            if (self.m_FriendArray[index] && self.m_FriendArray[index].getParent())
            {
                self.m_FriendArray[index].removeFromParent(true);
                self.m_FriendArray[index] = null;
            }

            //
            self.m_FriendArray[index] = cc.Sprite.createWithSpriteFrameName("map_photo_bg.png"*/
/*"general_friend_frame_light.png"*//*
);
            self.m_MainUI.addChild(self.m_FriendArray[index]);
            self.m_FriendArray[index].setPosition(position);

            var bgSize = self.m_FriendArray[index].getContentSize();

            if (index >= self.m_HelpData.length)
            {
                var spriteTemp = cc.Sprite.createWithSpriteFrameName("general_friend_frame_temp.png");
                self.m_FriendArray[index].addChild(spriteTemp);
                spriteTemp.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.5));

                return;
            }

            //
            var roleID = self.m_HelpData[index];
            var friendInfo = FriendsMng.getInstance().getFriendInfoByRoleId(roleID);

            if (!friendInfo)
            {
                return;
            }

            //头像
            var photoUrl = friendInfo.getPhotoUrl();
            if (photoUrl != "")
            {
                //
                var createPhoto =  cc.Sprite.create(photoUrl);
                if (createPhoto)
                {
                    cc.log("GUIMapFriendAid-----name = " + friendInfo.getName());
                    cc.log("GUIMapFriendAid-----photoUrl = " + photoUrl);

                    //
                    self.m_FriendArray[index].addChild(createPhoto);
                    createPhoto.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.5));

                    //
                    var size = createPhoto.getContentSize();
                    createPhoto.setScaleX(*/
/*40*//*
55 * Defines.BASE_SCALE /size.width);
                    createPhoto.setScaleY(*/
/*40*//*
55 * Defines.BASE_SCALE /size.height);
                }
            }

        });

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);

        //
        var mapID = cc.GUIMapMng.getInstance().getMaxProcessMapZoneID();
        this.m_HelpData = cc.DataMng.getInstance().getFriendCokeHelp(mapID.toString());
        this.m_HelpData = this.m_HelpData ? this.m_HelpData : [];

        cc.log("GUIMapFriendAid-----helpData :" + this.m_HelpData);

        //
        this.updateFriendContent();

        //
        this.m_ButtonBuy.setVisible(this.m_HelpData.length < 5);
        this.m_ButtonGo.setVisible(this.m_HelpData.length >= 5);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIMapFriendAid._instance = null;
cc.GUIMapFriendAid.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIMapFriendAid();
        this._instance.init();
    }

    return this._instance;
};*/
