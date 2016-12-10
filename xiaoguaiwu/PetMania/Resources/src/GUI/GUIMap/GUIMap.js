
//======================================================================================================================
cc.GUIMap = cc.GUIWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        this.m_Zones = [];
        this.m_View = null;
        this.m_ZonesBackGround = null;
        this.m_GuideLayer = null;
        this.m_WidgetLayer = null;
        this.m_HeadFrame = null;
        this.m_PromptTimer = 0;
        this.m_PromptShow = false;
        this.m_CenteredMap = false;

        //单指拖动
        this.m_CanMove = true;
        this.m_Moved = false;
        this.m_MoveSpeed = null;
        this.m_LastPosition = cc.p(0, 1000); //地图不可能达到的值

        //双指缩放
        this.m_TouchesCount = 0;
        this.m_TouchIds = [];
        this.m_TouchPoints = {};

        this.m_ZoomPoint = null;
        this.m_ZoomLength = null;
        this.m_ZoomScale = null;

        //UI Panels
        this.m_LifePanel = null;
        this.m_DiamondPanel = null;

        //UI Buttons
        this.m_Buttons = [];
        this.m_ButtonShop = null;
        this.m_ButtonMail = null;
        this.m_ButtonDebug = null;
        this.m_ButtonSetting = null;
        this.m_ButtonGameCenter = null;
        this.m_ButtonBack = null;
        this.m_ButtonHeartAdd = null;
        this.m_ButtonDiamondAdd = null;
        this.m_ButtonNewPack = null;
        this.m_ButtonRoulette = null;
        this.m_ButtonRecommand = null;
        this.m_ButtonShare = null;
        this.m_ButtonInviteFriends = null;
        this.m_ButtonAskHeart = null;
        this.m_ButtonTask = null;
        this.m_ButtonScoreUp = null;
        //UI Labels
        this.m_MailCountLabel = null;
        this.m_LifeRecoverLabel = null;
        this.m_LifeTimeLabel = null;
        this.m_LifeFullLabel = null;
        this.m_DiamondCountLabel = null;
        this.m_totalRankFreshTip = null;
        this.panel_ShareDaily = null;

        this.shareBtnOpen = true;
        this.head_photoMenu = null;
        //分享按钮一段时间内只能按一次
        this.m_fShareActionStopTime = null;
        this.shareActionCheck = false;
        this.timeToLoadMail = 30;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "GUIMap";
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        //这里必须释放一下 不然内存泄漏
        this.m_Zones.forEach(
            function(a_zone)
            {
                a_zone.release();
            }
        );

        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._super();

        //
        this.m_ZonesBackGround = cc.Layer.create();
        this.getWindow().addChild(this.m_ZonesBackGround);
        this.m_ZonesBackGround.setAnchorPoint(cc.p(0, 0));

        //
        var viewWidth = _ScreenWidth();
        var viewHeight = _ScreenHeight();

        this.m_View = cc.Layer.create();//cc.LayerColor.create(cc.c4(100, 100, 100, 200), viewWidth * 3, viewHeight);
        this.m_View.setContentSize(cc.size(viewWidth * 2, viewHeight));
        this.m_View.setPosition(cc.p(-viewWidth/2, 0));

        this.getWindow().addChild(this.m_View, 10000);

        //
        this.m_WidgetLayer = cc.Layer.create();
        this.getWindow().addChild(this.m_WidgetLayer,10010);

        //
        this.m_GuideLayer = cc.Layer.create();
        this.getWindow().addChild(this.m_GuideLayer, 10020);

        this.m_GuideLayer.onTouchBegan = function(touch, event)
        {
            return self;
        };

        this.m_GuideLayer.onTouchMoved = function(touch, event)
        {
            return self;
        };

        this.m_GuideLayer.onTouchEnded = function(touch, event)
        {
            return self;
        };

        this.m_GuideLayer.onTouchCancelled = function(touch, event)
        {
            return self;
        };

        //添加Touch
        var self = this;
        this.getWindow().onTouchBegan = function(touch, event)
        {
            return self.handleTouchBegan(touch, event);
        };

        this.getWindow().onTouchMoved = function(touch, event)
        {
            self.handleTouchMoved(touch, event);
            return self;
        };

        this.getWindow().onTouchEnded = function(touch, event)
        {
            self.handleTouchEnded(touch, event);
            return self;
        };

        this.getWindow().onTouchCancelled = function(touch, event)
        {
            self.handleTouchCancelled(touch, event);
            return self;
        };

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
                    addTargetedDelegate(this.getWindow(), cc.MENU_HANDLER_PRIORITY + 1, false);
            }
            else
            {
                cc.registerTargettedDelegate(cc.MENU_HANDLER_PRIORITY + 1, false, this.getWindow());
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
    addContent: function()
    {
        cc.log("addContent");
        //
        var winSize = cc.Director.getInstance().getWinSize();

        //邮件按钮
        this.m_ButtonMail = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("map_mail_button_nor.png"),
            cc.Sprite.createWithSpriteFrameName("map_mail_button_sel.png"),
            this._btnMailCallback, this);
        this.m_ButtonMail.setPosition(40 * Defines.BASE_SCALE, _ScreenHeight() - 102 * Defines.BASE_SCALE);
        this.m_Buttons.push(this.m_ButtonMail);

        var mailMenu = cc.Menu.create(this.m_ButtonMail);
        mailMenu.setPosition(cc.p(0, 0));
        this.m_WidgetLayer.addChild(mailMenu);
        mailMenu.setVisible(!isTelcomOperators());

        var mailCountBg = cc.Sprite.createWithSpriteFrameName("map_mail_count_bg.png");
        this.m_ButtonMail.addChild(mailCountBg);
        var mailSize = this.m_ButtonMail.getContentSize();
        mailCountBg.setPosition(cc.p(mailSize.width * 0.8, mailSize.height * 0.25));

        this.m_MailCountLabel = GUI.createNumberLabel("0", _GUIPath + "Num/num_4_10x12.png", 10, 12, "0");
        mailCountBg.addChild(this.m_MailCountLabel);
        var mailCountBgSize = mailCountBg.getContentSize();
        this.m_MailCountLabel.setAnchorPoint(cc.p(0.5, 0.5));
        this.m_MailCountLabel.setPosition(cc.p(mailCountBgSize.width * 0.5, mailCountBgSize.height * 0.55));

        //转盘按钮
        this.m_ButtonRoulette = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("map_mail_button_nor.png"),
            cc.Sprite.createWithSpriteFrameName("map_mail_button_sel.png"),
            this._btnRouletteCallback, this);
        this.m_ButtonRoulette.setPosition(40 * Defines.BASE_SCALE, _ScreenHeight() - 180 * Defines.BASE_SCALE);
        this.m_Buttons.push(this.m_ButtonRoulette);

        var rouletteMenu = cc.Menu.create(this.m_ButtonRoulette);
        rouletteMenu.setPosition(cc.p(0, 0));
        this.m_WidgetLayer.addChild(rouletteMenu);
        rouletteMenu.setVisible(/*!isTelcomOperators()*/false);

        //总排行按钮
		if (cc.DataMng.getInstance().isScoreRankingsEnabled()){
			this.m_ButtonTotalRank = cc.MenuItemSprite.create(
				cc.Sprite.createWithSpriteFrameName("GUITotalLevelTop_panel_06.png"),
				cc.Sprite.createWithSpriteFrameName("GUITotalLevelTop_panel_06.png"),
				this._btnTotalRankCallback, this);
			this.m_ButtonTotalRank.setPosition(cc.p(
				_ScreenLeft().x + this.m_ButtonTotalRank.getContentSize().width * 0.5,
				_ScreenRight().y));
				
			this.m_Buttons.push(this.m_ButtonTotalRank);

			var totalRankMenu = cc.Menu.create(this.m_ButtonTotalRank);
			totalRankMenu.setPosition(cc.p(0, 0));
			this.m_WidgetLayer.addChild(totalRankMenu);

            this.m_totalRankFreshTip = cc.Sprite.createWithSpriteFrameName("icon_fresh.png");
            this.m_totalRankFreshTip.setPosition(cc.p(
                _ScreenLeft().x + this.m_ButtonTotalRank.getContentSize().width * 0.8,
                _ScreenRight().y + 5 * Defines.BASE_SCALE));
            this.m_WidgetLayer.addChild(this.m_totalRankFreshTip);

            this.m_totalRankFreshTip.setVisible(false);
		}
//        rouletteMenu.setVisible(/*!isTelcomOperators()*/false);

        //生命值面板
        this.m_LifePanel = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("map_time_panel.png"),
            cc.Sprite.createWithSpriteFrameName("map_time_panel.png"),
            this._btnHeartAddCallback, this);
        this.m_LifePanel.setPosition(cc.p(105 * Defines.BASE_SCALE, winSize.height - 38 * Defines.BASE_SCALE));
        var lifePanelMenu = cc.Menu.create(this.m_LifePanel);
        lifePanelMenu.setPosition(cc.p(0, 0));
        this.m_WidgetLayer.addChild(lifePanelMenu);
        this.m_Buttons.push(this.m_LifePanel);

        var lifePanelSize = this.m_LifePanel.getContentSize();

        var spriteSugar = cc.Sprite.createWithSpriteFrameName("general_sugar_0.png");
        this.m_LifePanel.addChild(spriteSugar);
        spriteSugar.setPosition(cc.p(lifePanelSize.width * 0.2, lifePanelSize.height * 0.58));
        spriteSugar.setRotation(-35);
        spriteSugar.setScale(0.9);

        this.m_LifeRecoverLabel = GUI.createNumberLabel("0", _GUIPath + "Num/num_13_20x24.png", 20, 24, "0");
        this.m_LifePanel.addChild(this.m_LifeRecoverLabel);
        this.m_LifeRecoverLabel.setAnchorPoint(cc.p(1.0, 0.5));
        this.m_LifeRecoverLabel.setPosition(cc.p(65 * Defines.BASE_SCALE, lifePanelSize.height * 0.35));

        this.m_LifeTimeLabel = GUI.createNumberLabel("00:00", _GUIPath + "Num/num_3_14x18.png", 14, 18, "0");
        this.m_LifePanel.addChild(this.m_LifeTimeLabel);
        this.m_LifeTimeLabel.setAnchorPoint(cc.p(0.5, 0.5));
        this.m_LifeTimeLabel.setPosition(cc.p(lifePanelSize.width * 0.6, lifePanelSize.height * 0.5));

		if (Defines.IS_KO){
			this.m_LifeFullLabel = cc.LabelTTF.create(Resource.ChineseTxt[162], Defines.DefaultFont, 14 * Defines.BASE_SCALE);
		}
		else {
			this.m_LifeFullLabel = cc.LabelTTF.create(Resource.ChineseTxt[162], Defines.DefaultFont, 20 * Defines.BASE_SCALE);
		}

        this.m_LifePanel.addChild(this.m_LifeFullLabel);
        this.m_LifeFullLabel.setPosition(cc.p(lifePanelSize.width * 0.6, lifePanelSize.height * 0.5));
        this.m_LifeFullLabel.setVisible(false);

        this.m_ButtonHeartAdd = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("map_heart_add_nor.png"),
            cc.Sprite.createWithSpriteFrameName("map_heart_add_sel.png"),
            this._btnHeartAddCallback, this);
        var heartAddMenu = cc.Menu.create(this.m_ButtonHeartAdd);
        this.m_LifePanel.addChild(heartAddMenu);
        heartAddMenu.setPosition(cc.p(lifePanelSize.width * 0.89, lifePanelSize.height * 0.52));
        this.m_Buttons.push(this.m_ButtonHeartAdd);

        //钻石面板
        this.m_DiamondPanel = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("map_diamond_panel.png"),
            cc.Sprite.createWithSpriteFrameName("map_diamond_panel.png"),
            this._btnDiamondAddCallback, this);
        this.m_DiamondPanel.setPosition(
            cc.p(winSize.width - 115 * Defines.BASE_SCALE, winSize.height - 38 * Defines.BASE_SCALE));
        var diamondPanelMenu = cc.Menu.create(this.m_DiamondPanel);
        diamondPanelMenu.setPosition(cc.p(0, 0));
        this.m_WidgetLayer.addChild(diamondPanelMenu);
        this.m_Buttons.push(this.m_DiamondPanel);

        var diamondPanelSize = this.m_DiamondPanel.getContentSize();

        this.m_ButtonDiamondAdd = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_add_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_add_sel.png"),
            this._btnDiamondAddCallback, this);
        var diamondAddMenu = cc.Menu.create(this.m_ButtonDiamondAdd);
        this.m_DiamondPanel.addChild(diamondAddMenu);
        this.m_ButtonDiamondAdd.setScale(0.8);
        diamondAddMenu.setPosition(cc.p(diamondPanelSize.width * 0.89, diamondPanelSize.height * 0.5));
        this.m_Buttons.push(this.m_ButtonDiamondAdd);

        var diamondCount = cc.DataMng.getInstance().getMoney();
        this.m_DiamondCountLabel = GUI.createNumberLabel(
            diamondCount.toString(), _GUIPath + "Num/num_3_14x18.png", 14, 18, "0");
        this.m_DiamondPanel.addChild(this.m_DiamondCountLabel);
        this.m_DiamondCountLabel.setAnchorPoint(cc.p(0.5, 0.5));
        this.m_DiamondCountLabel.setPosition(cc.p(diamondPanelSize.width * 0.58, diamondPanelSize.height * 0.5));

        /*var spriteDiamond = cc.Sprite.createWithSpriteFrameName("general_diamond_1.png");
        this.m_DiamondPanel.addChild(spriteDiamond);
        spriteDiamond.setScale(0.8);
        spriteDiamond.setPosition(cc.p(diamondPanelSize.width * 0.15, diamondPanelSize.height * 0.58));*/

        //debug
        this.m_ButtonDebug = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_diamond_1.png"),
            cc.Sprite.createWithSpriteFrameName("general_diamond_1.png"),
            this._btnDebugCallback, this);
        this.m_ButtonDebug.setScale(0.8);
        this.m_ButtonDebug.setPosition(cc.p(diamondPanelSize.width * 0.15, diamondPanelSize.height * 0.58));
        this.m_Buttons.push(this.m_ButtonDebug);

        var debugMenu = cc.Menu.create(this.m_ButtonDebug);
        debugMenu.setPosition(cc.p(0, 0));
        this.m_DiamondPanel.addChild(debugMenu);

        //
        if (!Defines._CanPayDiamond())
        {
            this.m_DiamondPanel.setEnabled(false);
            var indexOf = this.m_Buttons.indexOf(this.m_DiamondPanel);
            this.m_Buttons.splice(indexOf, 1);

            this.m_ButtonDiamondAdd.setVisible(false);
            this.m_DiamondCountLabel.setPosition(cc.p(diamondPanelSize.width * 0.65, diamondPanelSize.height * 0.5));
        }

        //
        this.m_ButtonShop = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("map_shop_button_nor.png"),
            cc.Sprite.createWithSpriteFrameName("map_shop_button_sel.png"),
            this._btnShopCallback, this);
        this.m_ButtonShop.setPosition(
            winSize.width - 50 * Defines.BASE_SCALE, winSize.height - 110 * Defines.BASE_SCALE);
        this.m_Buttons.push(this.m_ButtonShop);

        var shopMenu = cc.Menu.create(this.m_ButtonShop);
        shopMenu.setPosition(cc.p(0, 0));
        this.m_WidgetLayer.addChild(shopMenu);

        //
        this.m_ButtonNewPack = null;
        if (!cc.DataMng.getInstance().isPayedNewPackage() && Defines._CanPayNewPack())
        {
            this.m_ButtonNewPack = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("map_btn_new_pack_nor.png"),
                cc.Sprite.createWithSpriteFrameName("map_btn_new_pack_sel.png"),
                this._btnNewPackCallback, this);
            this.m_ButtonNewPack.setPosition(
                winSize.width - 135 * Defines.BASE_SCALE, winSize.height - 110 * Defines.BASE_SCALE);
            this.m_Buttons.push(this.m_ButtonNewPack);
            shopMenu.addChild(this.m_ButtonNewPack);
        }

        //
        this.m_ButtonSetting = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_option_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_option_nor.png"),
            this._btnSettingCallback, this);
        this.m_ButtonSetting.setPosition(50 * Defines.BASE_SCALE, 50 * Defines.BASE_SCALE);
        this.m_Buttons.push(this.m_ButtonSetting);

        ////苹果GameCenter
//        if (GameCenterMng.getInstance().isEnable())
//        {
//            //
//            this.m_ButtonGameCenter = cc.MenuItemSprite.create(
//                cc.Sprite.create(_GUIPath + "GUINewGeneral/btn_game_center_up.png"),
//                cc.Sprite.create(_GUIPath + "GUINewGeneral/btn_game_center_down.png"),
//                this._btnGameCenterLogin,
//                this);
//
//            //
//            this.m_Buttons.push(this.m_ButtonGameCenter);
//            this.m_ButtonGameCenter.setPosition(cc.p((50 + 70) * Defines.BASE_SCALE, 50 * Defines.BASE_SCALE));
//        }


        //增加即时分享按钮

        this.m_ButtonShare = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("button_share_type_nor.png"),
            cc.Sprite.createWithSpriteFrameName("button_share_type_sel.png"),
            this._btnShareCallback, this);
//        this.m_Buttons.push(this.m_ButtonShare);
//        this.m_Menu.addChild(shareButton);
        this.m_ButtonShare.setPosition(cc.p((50 + 70 + 70) * Defines.BASE_SCALE, 50 * Defines.BASE_SCALE));

        //kakao版邀请好友按钮
        if(Defines.IS_KO)
        {
            //邀请好友
            this.m_ButtonInviteFriends = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("map_invite_button_nor.png"),
                cc.Sprite.createWithSpriteFrameName("map_invite_button_sel.png"),
                this._btnInviteFriends, this);
            this.m_ButtonInviteFriends.setPosition(
                    winSize.width - 250 * Defines.BASE_SCALE, winSize.height - 40 * Defines.BASE_SCALE);
            this.m_Buttons.push(this.m_ButtonInviteFriends);

            var inviteMenu = cc.Menu.create(this.m_ButtonInviteFriends);
            inviteMenu.setPosition(cc.p(0, 0));
            this.m_WidgetLayer.addChild(inviteMenu);
			


            //请求体力
            this.m_ButtonAskHeart = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("map_askheart_button_nor.png"),
                cc.Sprite.createWithSpriteFrameName("map_askheart_button_sel.png"),
                this._btnAskHeart, this);
            this.m_ButtonAskHeart.setPosition(
                    winSize.width - 320 * Defines.BASE_SCALE, winSize.height - 40 * Defines.BASE_SCALE);
            this.m_Buttons.push(this.m_ButtonAskHeart);

            var askMenu = cc.Menu.create(this.m_ButtonAskHeart);
            askMenu.setPosition(cc.p(0, 0));
            this.m_WidgetLayer.addChild(askMenu);

            //任务成就与活动
            this.m_ButtonTask = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("btn_taskAndOthers_nor.png"),
                cc.Sprite.createWithSpriteFrameName("btn_taskAndOthers_sel.png"),
                this._btnTask, this);
            this.m_ButtonTask.setPosition(
                    winSize.width - 100 * Defines.BASE_SCALE, 40 * Defines.BASE_SCALE);
            this.m_Buttons.push(this.m_ButtonTask);
//            this.m_ButtonTask.setVisible(false);

            var inviteMenu = cc.Menu.create(this.m_ButtonTask);
            inviteMenu.setPosition(cc.p(0, 0));
            this.m_WidgetLayer.addChild(inviteMenu);

            //新的排行榜系统

            this.m_ButtonScoreUp = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("GUI_Map_Btn_ScoreUp_Nor.png"),
                cc.Sprite.createWithSpriteFrameName("GUI_Map_Btn_ScoreUp_Sel.png"),
                this._btnScoreUp, this);
            this.m_ButtonScoreUp.setPosition(
                winSize.width - 60 * Defines.BASE_SCALE, winSize.height - 210 * Defines.BASE_SCALE);
//                winSize.width - 450 * Defines.BASE_SCALE, 60 * Defines.BASE_SCALE);
            this.m_Buttons.push(this.m_ButtonScoreUp);
//            this.m_ButtonTask.setVisible(false);

            var scoreUpMenu = cc.Menu.create(this.m_ButtonScoreUp);
            scoreUpMenu.setPosition(cc.p(0, 0));
            this.m_WidgetLayer.addChild(scoreUpMenu);
            if (!cc.NodeSelf.getInstance().isLogin()){
                this.m_ButtonScoreUp.setVisible(false);
            }

        }


        if (!Defines.IS_EN && !Defines.IS_KO){
            this.panel_WeChat_Bg = cc.Sprite.createWithSpriteFrameName("map_share_button_su.png");
            this.panel_WeChat_Bg.setAnchorPoint(cc.p(0.5, 0));
            this.m_ButtonShare.addChild(this.panel_WeChat_Bg, -1);
            this.panel_WeChat_Bg.setPosition(cc.p(35 * Defines.BASE_SCALE, 10 * Defines.BASE_SCALE));
//        this.panel_WeChat_Bg.setVisible(false);
            this.panel_WeChat_Bg.setScaleY(0.1);

            this.m_ButtonWeChat_Friend = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("map_circle_btn_nor.png"),
                cc.Sprite.createWithSpriteFrameName("map_circle_btn_sel.png"),
                this._btnWeChatCallback, this);
            this.m_ButtonWeChat_Friend.setTag(1);
            this.m_ButtonWeChat_Friend.setPosition(cc.p(40 * Defines.BASE_SCALE, 40 * Defines.BASE_SCALE));
            this.m_ButtonWeChat_Friend.setVisible(false);

            this.m_ButtonWeChat_FriendCircle = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("map_friend_btn_nor.png"),
                cc.Sprite.createWithSpriteFrameName("map_friend_btn_sel.png"),
                this._btnWeChatCallback, this);
            this.m_ButtonWeChat_FriendCircle.setTag(2);
            this.m_ButtonWeChat_FriendCircle.setPosition(cc.p(40 * Defines.BASE_SCALE, 40 * Defines.BASE_SCALE));
            this.m_ButtonWeChat_FriendCircle.setVisible(false);

            var WeChatMenu = cc.Menu.create(this.m_ButtonWeChat_Friend, this.m_ButtonWeChat_FriendCircle);
            this.panel_WeChat_Bg.addChild(WeChatMenu);
            WeChatMenu.setPosition(cc.p(0,0));
        }
//        //
        this.m_ButtonRecommand = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("button_tuijianhaoyou-up.png"),
            cc.Sprite.createWithSpriteFrameName("button_tuijianhaoyou-down.png"),
            this._btnRecommandCallback, this);
        this.m_ButtonRecommand.setPosition(50 * Defines.BASE_SCALE, 120 * Defines.BASE_SCALE);
//        this.m_Buttons.push(this.m_ButtonRecommand);

        if (_IsNetWorkNotWifi() || !cc.NodeSelf.getInstance().isLogin()	|| Defines.IS_EN || Defines.IS_KO){
            this.m_ButtonRecommand.setVisible(false);
        }

        var settingMenu = cc.Menu.create(this.m_ButtonSetting, this.m_ButtonRecommand);
//        if (this.m_ButtonGameCenter)
//        {
//            settingMenu.addChild(this.m_ButtonGameCenter);
//        }

//        if (!Defines.IS_EN && !Defines.IS_KO){
//            this.addWeChatBtnPanel();
//        }
//
//        if (this.m_ButtonShare)
//        {
//            settingMenu.addChild(this.m_ButtonShare);
//        }

        settingMenu.setPosition(cc.p(0, 0));
        this.m_WidgetLayer.addChild(settingMenu);



        return this;
    },

    addWeChatBtnPanel: function()
    {
        this.panel_WeChat_Friend = cc.Sprite.createWithSpriteFrameName("map_share_button.png");
        this.panel_WeChat_Friend.setAnchorPoint(cc.p(0, 0.5));
        this.m_ButtonWeChat_Friend.addChild(this.panel_WeChat_Friend, -1);
        this.panel_WeChat_Friend.setPosition(cc.p(10  * Defines.BASE_SCALE, 33 * Defines.BASE_SCALE));

        var circleText = cc.Sprite.createWithSpriteFrameName("map_circle_text.png");
        this.panel_WeChat_Friend.addChild(circleText);
        circleText.setPosition(cc.p(92 * Defines.BASE_SCALE, 30 * Defines.BASE_SCALE));

        this.icon_candy = cc.Sprite.createWithSpriteFrameName("general_diamond_1.png");
        this.panel_WeChat_Friend.addChild(this.icon_candy);
        this.icon_candy.setPosition(cc.p(155 * Defines.BASE_SCALE, 30 * Defines.BASE_SCALE));
        this.icon_candy.setScale(0.6);

//        this.panel_WeChat_Friend.setVisible(false);
        this.panel_WeChat_Friend.setScaleX(0.05);

        this.panel_WeChat_FriendCircle = cc.Sprite.createWithSpriteFrameName("map_share_button.png");
        this.panel_WeChat_FriendCircle.setAnchorPoint(cc.p(0, 0.5));
        this.m_ButtonWeChat_FriendCircle.addChild(this.panel_WeChat_FriendCircle, -1);
        this.panel_WeChat_FriendCircle.setPosition(cc.p(10  * Defines.BASE_SCALE, 33 * Defines.BASE_SCALE));

        var shareText = cc.Sprite.createWithSpriteFrameName("wenzi-fenxiang.png");
        this.panel_WeChat_FriendCircle.addChild(shareText);
        shareText.setPosition(cc.p(92 * Defines.BASE_SCALE, 30 * Defines.BASE_SCALE));

        this.icon_diamond = cc.Sprite.createWithSpriteFrameName("general_sugar_0.png");//"general_diamond_1.png");
        this.panel_WeChat_FriendCircle.addChild(this.icon_diamond);
        this.icon_diamond.setPosition(cc.p(155 * Defines.BASE_SCALE, 30 * Defines.BASE_SCALE));
        this.icon_diamond.setScale(0.65);

        var numLabel = GUI.createNumberLabel("100", _GUIPath + "Num/num_13_20x24.png", 20, 24, "0");
        this.icon_candy.addChild(numLabel);
        var diamondSize = this.icon_diamond.getContentSize();
        numLabel.setPosition(cc.p(diamondSize.width * 0.52, 0));
        numLabel.setScale(1.1);

//        this.panel_WeChat_FriendCircle.setVisible(false);
        this.panel_WeChat_FriendCircle.setScaleX(0.05);


    },

    playWeChatBtnPanelAction: function(tag, openFlag)
    {
        var self = this;

        var callBack = function(){
            if (tag == 2){
                self.shareActionCheck = false;
                self.shareBtnOpen = !self.shareBtnOpen;
                cc.log("playWeChatBtnPanelAction self.shareBtnOpen = " + self.shareBtnOpen);
                cc.log(" playWeChatBtnPanelActionself.shareActionCheck = " + self.shareActionCheck);
            }

        };

        if (openFlag){
            var jump1 = cc.Sequence.create(
                cc.ScaleTo.create(Defines.FPS * 7, 1, 1.0),
                cc.CallFunc.create(
                    callBack,
                    null
                )
            );
        }
        else {
            var jump1 = cc.Sequence.create(
                cc.ScaleTo.create(Defines.FPS * 7, 0.05, 1.0)
            );
        }

        if (tag == 1){
            this.panel_WeChat_Friend.runAction(jump1);
        }
        else {
            this.panel_WeChat_FriendCircle.runAction(jump1);
        }
    },
    //------------------------------------------------------------------------------------------------------------------
    _btnWeChatCallback: function(sender)
    {
        if (this.shareActionCheck){
            return this;
        }
        var callFunc = function()
        {
            ShareMng.getInstance().shareWithDailyWeChat(sender.getTag());
            ShareMng.getInstance().cleanup();
        };

//        var bShow = null;
//
//        if(cc.NodeSelf.getInstance().isLogin())
//        {
//            bShow = ShareMng.getInstance().canRoleBouns(sender.getTag());
//        }
//        else
//        {
//            bShow = cc.GUIPopupShare.changeTo();
//        }
//
//        if(bShow){
        if(cc.NodeSelf.getInstance().isLogin())
        {
            if(ShareMng.getInstance().canRoleBouns(sender.getTag()))
            {
                ShareMng.getInstance().setCanBonus(sender.getTag());
                ShareMng.getInstance().setCandyDailyState(true);
                callFunc();
            }
            else
            {
                callFunc();
            }
            return;
        }

        cc.log("_btnWeChatCallback: " + sender.getTag());
        if (cc.GUIPopupShare.changeTo(sender.getTag())){
//        if(ShareMng.getInstance().canRoleBouns(sender.getTag())){

            ShareMng.getInstance().setCanBonus(sender.getTag());
            ShareMng.getInstance().setCandyDailyState(true);
            callFunc();
//            cc.GUIPopupShare.getInstance().openWindow(this.getWindow().getParent(), callFunc);
        }
        else {
            callFunc();
        }
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnShareCallback: function()
    {

        cc.log("_btnShareCallback: " + _LocalTime());
        cc.log("_btnShareCallback self.shareBtnOpen = " + this.shareBtnOpen);
        cc.log("_btnShareCallback self.shareActionCheck = " + this.shareActionCheck);
//        cc.log("_btnShareCallback: " + this.m_fShareActionStopTime);

//        //相应间隔0.8s
//        if( _LocalTime() - this.m_fShareActionStopTime < 800 && this.m_fShareActionStopTime)
//        {
//            return;
//        }
//        this.m_fShareActionStopTime = _LocalTime();
        if (!Defines.IS_EN && !Defines.IS_KO && this.shareActionCheck){
            return this;
        }
        this.shareActionCheck = true;

        cc.AudioMng.getInstance().playButtonSound(true);

        var self = this;
        //
        if (!Defines.IS_EN && !Defines.IS_KO){
            if (this.shareBtnOpen){
                var jump2 = cc.Sequence.create(
                    cc.ScaleTo.create(Defines.FPS * 7, 0.1, 1.0)
                );
                this.panel_ShareDaily.runAction(jump2);

                var jump3 = cc.Sequence.create(
                    cc.ScaleTo.create(Defines.FPS * 7, 1, 1.0)
                );
                this.panel_WeChat_Bg.runAction(jump3);

                var moveTo1 = cc.Sequence.create(
                    cc.MoveTo.create(Defines.FPS * 7, cc.p(25 * Defines.BASE_SCALE, (50 + 70- 23) * Defines.BASE_SCALE)),
                    cc.CallFunc.create(
                        function ()
                        {
                            self.playWeChatBtnPanelAction(1, true);
                        },
                        null
                    )
                );
//
                this.m_ButtonWeChat_Friend.setVisible(true);
                this.m_ButtonWeChat_Friend.runAction( moveTo1 );

                var moveTo2 = cc.Sequence.create(
                    cc.MoveTo.create(Defines.FPS * 10, cc.p(25 * Defines.BASE_SCALE, (50 + 70 + 70 - 23) * Defines.BASE_SCALE)),
                    cc.CallFunc.create(
                        function ()
                        {
                            self.playWeChatBtnPanelAction(2, true);

                        },
                        null
                    )
                );
//
                this.m_ButtonWeChat_FriendCircle.setVisible(true);
                this.m_ButtonWeChat_FriendCircle.runAction( moveTo2 );


            }
            else {
                var jump2 = cc.Sequence.create(
                    cc.ScaleTo.create(Defines.FPS * 7, 1, 1.0)
                );
                this.panel_ShareDaily.runAction(jump2);

                var jump3 = cc.Sequence.create(
                    cc.ScaleTo.create(Defines.FPS * 7, 1, 0.05)
                );
                this.panel_WeChat_Bg.runAction(jump3);

                self.playWeChatBtnPanelAction(1, false);
                self.playWeChatBtnPanelAction(2, false);

                var moveTo1 = cc.Sequence.create(
                    cc.MoveTo.create(Defines.FPS * 7, cc.p(25 * Defines.BASE_SCALE, 50* Defines.BASE_SCALE)),
                    cc.CallFunc.create(
                        function ()
                        {
                            self.m_ButtonWeChat_Friend.setVisible(false);
                        },
                        null
                    )
                );
                this.m_ButtonWeChat_Friend.runAction( moveTo1 );

                var moveTo2 = cc.Sequence.create(
                    cc.MoveTo.create(Defines.FPS * 10, cc.p(25 * Defines.BASE_SCALE, 50* Defines.BASE_SCALE)),
                    cc.CallFunc.create(
                        function ()
                        {
//                            self.m_ButtonWeChat_FriendCircle.setVisible(false);
                            self.shareActionCheck = false;
                            self.shareBtnOpen = !self.shareBtnOpen;
                            cc.log("stateClose self.shareBtnOpen = " + self.shareBtnOpen);
                            cc.log("stateClose self.shareActionCheck = " + self.shareActionCheck);
                        },
                        null
                    )
                );
                this.m_ButtonWeChat_FriendCircle.runAction( moveTo2 );
            }

        }
        else {
            var callFunc = function()
            {
                ShareMng.getInstance().shareWithLoginFinish();
                ShareMng.getInstance().cleanup();
            };

            if (cc.GUIPopupShare.changeTo()){
                ShareMng.getInstance().setCanBonus(1);
                ShareMng.getInstance().setCandyDailyState(true);
                callFunc();
//                cc.GUIPopupShare.getInstance().openWindow(this.getWindow().getParent(), callFunc);
            }
            else {
                callFunc();
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnInviteFriends: function()
    {
        cc.GUIInviteFriendsKakao.getInstance().openWindow(cc.Director.getInstance().getRunningScene());
//        cc.GUIInviteFriends.getInstance().openWindow(cc.Director.getInstance().getRunningScene());
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnTask: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        cc.GUITaskAndOthers.getInstance().openWindow(cc.Director.getInstance().getRunningScene());
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnScoreUp: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        cc.GUINewTotalScoreUp.getInstance().openWindow(cc.Director.getInstance().getRunningScene());

        return this;
    },


    //------------------------------------------------------------------------------------------------------------------
    _btnAskHeart: function()
    {
        cc.GUIAskHeartKakao.getInstance().openWindow(cc.Director.getInstance().getRunningScene());
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnGameCenterLogin: function()
    {
        cc.log("大地图 _btnGameCenterLogin");

        if (GameCenterMng.getInstance().isLogin())
        {
            GameCenterMng.getInstance().showScoreTop();
        }
        else
        {
            GameCenterMng.getInstance().login();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getButtonShopRectForGuide: function()
    {
        if (!this.m_ButtonShop)
        {
            return null;
        }

        var size = this.m_ButtonShop.getContentSize();
        var origin = cc.pSub(this.m_ButtonShop.getPosition(), cc.p(size.width/2, size.height/2));

        return cc.rect(origin.x, origin.y, size.width, size.height);
    },

    //------------------------------------------------------------------------------------------------------------------
    updateMailsCount: function()
    {
        if (this.m_MailCountLabel)
        {
            var mailsCount = MailMng.getInstance().getMailsCount();
            //cc.log("mailsCount = " + mailsCount);
            this.m_MailCountLabel.setString(mailsCount > 0 ? mailsCount.toString() : "");
            this.m_MailCountLabel.getParent().setVisible(mailsCount > 0);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getGuideLayer: function()
    {
        return this.m_GuideLayer;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifiedUpdate: function(subject, events)
    {
        //关卡数据被覆盖后，更新地图位置
        if (events && events[NOTIFY_EVENT.FOR_COVER_DATA])
        {
            this.needCenterMap();
        }

        //
        if (!this.isWindowOpen())
        {
            return this;
        }

        //
        this.startUpdateHeartsTimer();

        //
        var curHeart = cc.DataMng.getInstance().getCurrentHeart();
        var maxRecover = cc.DataMng.getInstance().getHeartRecoverMax();
		
		if (!maxRecover){
			maxRecover = Defines._GetMaxHearts();
		}
        this.m_LifeRecoverLabel.setString((curHeart < maxRecover ? curHeart : maxRecover).toString());

        //薄荷糖上限外的部分
        var otherHeart = curHeart - maxRecover;
        this.m_LifeFullLabel.setString(otherHeart > 0 ? "+" + otherHeart : Resource.ChineseTxt[162]);
        this.m_LifeFullLabel.setFontSize(otherHeart > 0 ? 18 * Defines.BASE_SCALE : 14 * Defines.BASE_SCALE);
        //
        var diamondCount = cc.DataMng.getInstance().getMoney();
        this.m_DiamondCountLabel.setString(diamondCount.toString());

        //新手礼包
        var payedNewPack = cc.DataMng.getInstance().isPayedNewPackage();
        if (payedNewPack && this.m_ButtonNewPack)
        {
            this.m_ButtonNewPack.setVisible(false);
        }

		if (cc.DataMng.getInstance().isScoreRankingsEnabled()){
			if (!cc.NodeSelf.getInstance().isLogin()){
				this.m_ButtonTotalRank.setVisible(false);
			}
			else {
				this.m_ButtonTotalRank.setVisible(true);
			}
        }

        //
        if (!this.m_CenteredMap)
        {
            this.centerMaxProcessMapItem();
        }

        cc.log("notified UPDATE");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    startUpdateHeartsTimer: function()
    {
        var addHeartTime = cc.DataMng.getInstance().updateHeart();
        if (addHeartTime <= 0)
        {
            //现实已满
            this.m_LifeFullLabel.setVisible(true);
            this.m_LifeTimeLabel.setVisible(false);
            this.m_LifeTimeLabel.unscheduleAllCallbacks();
            return this;
        }

        //封装一个对象
        var timeHandler = {};
        timeHandler.curTime = _LocalTime()/1000;
        timeHandler.endTime = addHeartTime;
        timeHandler.getShowTime = function()
        {
            //
            var timeValue = (timeHandler.endTime - timeHandler.curTime);
            if (timeValue < 0)
            {
                timeValue = 0;
            }

            //
            return parseInt(timeValue);
        };

        //
        this.m_LifeFullLabel.setVisible(false);
        this.m_LifeTimeLabel.setVisible(true);
        this.m_LifeTimeLabel.setString(
            Tools.convertSecondTime(timeHandler.getShowTime())
        );

        //
        var self = this;
        this.m_LifeTimeLabel.unscheduleAllCallbacks();
        this.m_LifeTimeLabel.schedule(
            function()
            {
                timeHandler.curTime += 1;
                if (timeHandler.curTime >= timeHandler.endTime)
                {
                    timeHandler.endTime = cc.DataMng.getInstance().updateHeart();
                    if (timeHandler.endTime > 0)
                    {
                        timeHandler.curTime = _LocalTime()/1000;
                    }
                    else
                    {
                        self.m_LifeFullLabel.setVisible(true);
                        self.m_LifeTimeLabel.setVisible(false);
                        self.m_LifeTimeLabel.unscheduleAllCallbacks();
                        return;
                    }
                }

                //
                self.m_LifeTimeLabel.setString(
                    Tools.convertSecondTime(timeHandler.getShowTime())
                );
            },
            1);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnShopCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        Scene_Shop.changeTo();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnNewPackCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        if (isCM() && Tools.compareDateNow(Defines.CM_PAY_PROMPT))
        {
            _Pay_ByRMB(GUI.SHOP_DATA.SHOP_DATA_NEW[0]);
        }
        else
        {
            cc.GUINewPlayerPack.getInstance().openWindow(this.getWindow().getParent());
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnSettingCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        if(Defines.IS_KO)
        {
            cc.GUIPopupOption_ko.getInstance().openWindow(this.getWindow().getParent());
        }
        else
        {
            cc.GUIPopupOption.getInstance().openWindow(this.getWindow().getParent());
        }
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnBackCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        cc.Director.getInstance().replaceScene(Scene_MainMenu.create(false, true));
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnHeartAddCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        Scene_Shop.changeTo(GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnDiamondAddCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        Scene_Shop.changeTo(GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnMailCallback: function()
    {
        //
        cc.AudioMng.getInstance().playButtonSound(true);

        cc.GUIMail.getInstance().openWindow();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnRecommandCallback: function()
    {
        //
        cc.AudioMng.getInstance().playButtonSound(true);

        cc.GUIRecommend.getInstance().openWindow();
        return this;
    },


    //------------------------------------------------------------------------------------------------------------------
    _btnRouletteCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        if (_CanChangeToRoulette())
        {
            _ToSceneRoulette();
        }

        return this;
    },

	_btnTotalRankCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        var maxLevel = cc.DataMng.getInstance().getMaxProcessLevelData();

        if (maxLevel.ID < 9 && !maxLevel.IS_SPACE_LEVEL){
            cc.GUIMsgView.getInstance().openWindow(
                cc.Director.getInstance().getRunningScene(),
                Resource.ChineseTxt["showTotalLevel"]);
        }
        else {
            var myScene = cc.GUIMap.getInstance().getWindow().getParent();
            cc.GUITotalLevelTop.getInstance().openWindow(myScene);
        }
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnDebugCallback: function()
    {
        if (Defines.DEBUG_FUNC)
        {
            cc.AudioMng.getInstance().playButtonSound(true);
            var myScene = this.getWindow().getParent();
            cc.GUIDebugFunc.getInstance().openWindow(myScene);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _canNotifySelf: function(window)
    {
        var forceWindow = [cc.GUISimpleShop, cc.GUIBuyDiamond, cc.GUIBuySuccess, cc.GUIBuyPrompt,
            cc.GUIPopupShare, cc.GUIGuideNormal, cc.GUISubFriendsList, cc.GUIMsgBox];

        var conditionFunc = function()
        {
            return cc.GUIGameLevelStart.getInstance().isWindowOpen()
                || cc.GUIGameLevelEndWin.getInstance().isWindowOpen()
                || cc.GUIGameLevelEndFail.getInstance().isWindowOpen()
                || cc.GUIAskFriendForHeart.getInstance().isWindowOpen()
                || cc.GUIMapCoke.getInstance().isWindowOpen()
                || cc.GUIMapCokePrompt.getInstance().isWindowOpen();
        };

        for (var index = 0; index < forceWindow.length; index++)
        {
            if (window instanceof forceWindow[index] && conditionFunc())
            {
                return false;
            }
        }

        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    _notifyWithWindowEvent: function(window, isClose)
    {
        //
        var actionWindow = [cc.GUISimpleShop, cc.GUIMail, cc.GUIRecommend, cc.GUIInviteLogin, cc.GUIPopupOption_ko, cc.GUIBuyDiamond, cc.GUIBuySuccess, cc.GUIBuyPrompt, cc.GUIAskFriendForHeart, cc.GUIMultiJoys,
            cc.GUISubFriendsList, cc.GUIAboutUs, cc.GUISpringAd, cc.GUITeachAndHelp, cc.GUIMsgBox, cc.GUINewPlayerPack, cc.GUITotalLevelTop, cc.GUIMineEnter];

        if(Defines.IS_KO)
        {
            actionWindow.push(cc.GUIInviteFriendsKakao);
            actionWindow.push(cc.GUIAskHeartKakao);
            actionWindow.push(cc.GUILoginItemPush);
            actionWindow.push(cc.GUIMapScoreTop);
            actionWindow.push(cc.GUINewTotalScoreUp);
            actionWindow.push(cc.GUITaskAndOthers)
//            actionWindow.push(cc.GUITaskAndOthers);
//            actionWindow.push(cc.GUITaskKakao);
        }
//        cc.log("actionWindow.length = " + actionWindow.length);
        for (var index = 0; index < actionWindow.length; index++)
        {
//            cc.log("actionWindow index = " + index);
            if (window instanceof actionWindow[index])
            {
                isClose ? this.handleMapEnterAction(true) : this.handleMapLeaveAction(true);
                return this;
            }
        }

        //地图的进出动作会附带是否接收响应
        var enableWindow = [cc.GUIGuideNormal, cc.GUIDebugFunc];
        for (index = 0; index < enableWindow.length; index++)
        {
            if (window instanceof enableWindow[index])
            {
                this.setZonesEnabled(isClose);
                return this;
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyOpenWindow: function(window)
    {
        if (this._canNotifySelf(window))
        {
            this._notifyWithWindowEvent(window, false);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyCloseWindow: function(window)
    {
        if (this._canNotifySelf(window))
        {
            this._notifyWithWindowEvent(window, true);
        }

        //
		if (cc.DataMng.getInstance().isScoreRankingsEnabled()){
			if (!cc.NodeSelf.getInstance().isLogin()){
				this.m_ButtonTotalRank.setVisible(false);
			}
			else {
				this.m_ButtonTotalRank.setVisible(true);
//                if (cc.DataMng.getInstance().getCurFreshLine() && cc.DataMng.getInstance().getCurFreshLine() <  cc.DataMng.getInstance().getNowLeftTime()){
//                    this.m_totalRankFreshTip.setVisible(true);
//                }
//                else {
//                    this.m_totalRankFreshTip.setVisible(false);
//                }

            }
		}

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updatePlayerContent: function()
    {

        var mapItem = cc.GUIMapMng.getInstance().getMaxProcessMapItem();


        if (!mapItem)
        {
            return this;
        }


        //
        if (mapItem.isLock())
        {
            return this;
        }


        if (!this.m_HeadFrame)
        {
            this.m_HeadFrame = cc.Sprite.createWithSpriteFrameName("general_default_photo_1.png");
            this.getZonesBackGround().addChild(this.m_HeadFrame, 1000);
        }


        //
        this.m_HeadFrame.removeAllChildren(true);


        //
        cc.log("创建我的地图头像 = " + cc.NodeSelf.getInstance().getSelfPhoto());
        if (cc.NodeSelf.getInstance().getSelfPhoto() != "")
        {
            var selfPhoto = cc.Sprite.create(cc.NodeSelf.getInstance().getSelfPhoto());
            if (selfPhoto)
            {
                var headSize = this.m_HeadFrame.getContentSize();


                //
                var bgPhoto = cc.Sprite.createWithSpriteFrameName("map_photo_bg.png");
                this.m_HeadFrame.addChild(bgPhoto);
                bgPhoto.setScale(headSize.width/bgPhoto.getContentSize().width);
                bgPhoto.setPosition(cc.p(headSize.width/2, headSize.height/2));


                //
                this.m_HeadFrame.addChild(selfPhoto);
                selfPhoto.setScaleX((headSize.width - 5 * Defines.BASE_SCALE)/selfPhoto.getContentSize().width);
                selfPhoto.setScaleY((headSize.height - 5 * Defines.BASE_SCALE)/selfPhoto.getContentSize().height);
                selfPhoto.setPosition(cc.p(headSize.width/2, headSize.height/2));
            }
            else
            {
                cc.log("创建创建我的地图头像 失败 ???  = " + cc.NodeSelf.getInstance().getSelfPhoto());
            }
        }


        this.m_HeadFrame.setPosition(mapItem.getPlayerContentPosition());



////        return this;
//        cc.log("updatePlayerContent");
//        //
//        var mapItem = cc.GUIMapMng.getInstance().getMaxProcessMapItem();
//
//        if (!mapItem)
//        {
//            return this;
//        }
//
//        //
//        if (mapItem.isLock())
//        {
//            return this;
//        }
//
//
//        if (!this.m_HeadFrame){
//            var bgPhoto = "general_default_photo_1.png";
//            this.m_HeadFrame = cc.Sprite.createWithSpriteFrameName(bgPhoto);
//
//            this.getZonesBackGround().addChild(this.m_HeadFrame);
//        }
//        this.m_HeadFrame.removeAllChildren(true);
//
//        cc.log("创建我的地图头像 = " + cc.NodeSelf.getInstance().getSelfPhoto());
//        if (cc.NodeSelf.getInstance().getSelfPhoto() != "")
//        {
//            var selfPhoto = cc.Sprite.create(cc.NodeSelf.getInstance().getSelfPhoto());
//            if (selfPhoto)
//            {
//                var headSize = this.m_HeadFrame.getContentSize();
//                var size = selfPhoto.getContentSize();
//                selfPhoto.setScaleX((headSize.width - 5 * Defines.BASE_SCALE) /size.width);
//                selfPhoto.setScaleY((headSize.height - 5 * Defines.BASE_SCALE) /size.height);
//
//                this.m_HeadFrame.addChild(selfPhoto);
//                selfPhoto.setPosition(cc.p(headSize.width * 0.5, headSize.height * 0.5));
//            }
//            else
//            {
//                cc.log("创建创建我的地图头像 失败 ???  = " + cc.NodeSelf.getInstance().getSelfPhoto());
//            }
//        }
//
//        this.m_HeadFrame.setPosition(mapItem.getPlayerContentPosition());
//
//
////        cc.log("updatePlayerContent");
////
////        var bgPhoto = "general_default_photo_1.png";
////        this.m_HeadFrame = cc.MenuItemSprite.create(
////            cc.Sprite.createWithSpriteFrameName(bgPhoto),
////            cc.Sprite.createWithSpriteFrameName(bgPhoto),
////            this._btnPhotoCallback, this);
////
////        cc.log("create this.m_HeadFrame");
////        this.head_photoMenu = cc.GUIMenu.create();
//////            photoMenu.setTouchHandle(cc.MENU_HANDLER_PRIORITY + 2, false);
////        this.head_photoMenu.addChild(this.m_HeadFrame);
////        this.getZonesBackGround().addChild(this.head_photoMenu, 2000, 1234);
////        this.m_Buttons.push(this.m_HeadFrame);
////
////        cc.log("创建我的地图头像 = " + cc.NodeSelf.getInstance().getSelfPhoto());
////        if (cc.NodeSelf.getInstance().getSelfPhoto() != "")
////        {
////            var selfPhoto = cc.Sprite.create(cc.NodeSelf.getInstance().getSelfPhoto());
////            if (selfPhoto)
////            {
////                var headSize = this.m_HeadFrame.getContentSize();
////                var size = selfPhoto.getContentSize();
////                selfPhoto.setScaleX((headSize.width - 5 * Defines.BASE_SCALE) /size.width);
////                selfPhoto.setScaleY((headSize.height - 5 * Defines.BASE_SCALE) /size.height);
////
////                this.m_HeadFrame.addChild(selfPhoto);
////                selfPhoto.setPosition(cc.p(headSize.width * 0.5, headSize.height * 0.5));
////            }
////            else
////            {
////                cc.log("创建创建我的地图头像 失败 ???  = " + cc.NodeSelf.getInstance().getSelfPhoto());
////            }
////        }
////
////        this.m_HeadFrame.setPosition(mapItem.getPlayerContentPosition());

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnPhotoCallback: function()
    {
        cc.log("GUImap_self btnPhotoCallback");

//        var levelDataID = sender.getTag();
//
//        var targetLeveldata = cc.DataMng.getInstance().getLevelDataWithID(levelDataID, false);

        cc.log("self targetLeveldata.NAME = " + cc.DataMng.getInstance().getMaxProcessLevelKey());

        cc.GUIMiniFriendsTop.getInstance().openWindow(cc.Director.getInstance().getRunningScene(),cc.DataMng.getInstance().getMaxProcessLevelKey());

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleMapEnterAction: function(isAnimate, hasAd, fromGUIName)
    {
        if (!this.isWindowOpen())
        {
            return this;
        }

        MailMng.getInstance().loadMails();

        //
        this.setZonesEnabled(true);

        //
        var playNode = [
            this.m_ButtonMail, this.m_ButtonShop, this.m_ButtonSetting, this.m_LifePanel, this.m_DiamondPanel,
            /*this.m_ButtonBack, */ this.m_HeadFrame, this.m_ButtonNewPack, this.m_ButtonRoulette, this.m_ButtonRecommand];

        if(Defines.IS_KO)
        {
            playNode.push(this.m_ButtonInviteFriends);
//            playNode.push(this.m_ButtonInviteFriends);
            playNode.push(this.m_ButtonAskHeart);
            playNode.push(this.m_ButtonScoreUp);
            playNode.push(this.m_ButtonTask);
//            playNode.push(this.m_ButtonTask);
        }
        playNode.forEach(function(each,idx)
        {
            if (each)
            {
                if (isAnimate)
                {
                    each.stopAllActions();
                    each.runAction(cc.ScaleTo.create(0.1, 1));
                }
                else
                {
                    each.setScale(1);
                }

            }
        });

        //
        this.m_Zones.forEach(function(each)
        {
            if (each.isWindowOpen())
            {
                each.handleZoneEnter(isAnimate);
            }
        });


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleMapLeaveAction: function(isAnimate)
    {
        if (!this.isWindowOpen())
        {
            return this;
        }

        //
        this.setZonesEnabled(false);
        this.cleanupHandleData();

        //
        var playNode = [
            this.m_ButtonMail, this.m_ButtonShop, this.m_ButtonSetting, this.m_LifePanel, this.m_DiamondPanel,
            /*this.m_ButtonBack,*/ this.m_HeadFrame, this.m_ButtonNewPack, this.m_ButtonRoulette,this.m_ButtonRecommand];

        if(Defines.IS_KO)
        {
            playNode.push(this.m_ButtonInviteFriends);
//            playNode.push(this.m_ButtonInviteFriends);
            playNode.push(this.m_ButtonAskHeart);
            playNode.push(this.m_ButtonScoreUp);
            playNode.push(this.m_ButtonTask)
//            playNode.push(this.m_ButtonTask);
        }

        playNode.forEach(function(each, index)
        {
            if (each)
            {
                if (isAnimate)
                {
                    each.stopAllActions();
                    each.runAction(cc.ScaleTo.create(0.08, 0));
                }
                else
                {
					each.setScale(0);
                }
            }
        });

        this.m_Zones.forEach(function(each)
        {
            if (each.isWindowOpen())
            {
                each.handleZoneLeave(isAnimate);
            }
        });

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    autoMoveHeadFrameToNext: function(callback, mapItem)
    {

        this.m_HeadFrame.stopAllActions();
        this.m_HeadFrame.runAction(cc.Sequence.create(
            mapItem.createHeadFrameAction(),
            cc.DelayTime.create(Defines.FPS * 15),
            cc.CallFunc.create(callback, mapItem)
        ));
        cc.AudioMng.getInstance().playMoveToNextLevel();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    autoMoveZonesBackToMapLevel: function(isAnimate, callback, mapItem, toActivate)
    {
        var zonesBackGround = this.getZonesBackGround();
        var boundBox = zonesBackGround.getBoundingBox();

        var toWindowPosition = mapItem.convertToWindowSpace();

        var windowCenter = cc.p(_ScreenWidth() * 0.5, _ScreenHeight() * 0.5);
        var dLocation = cc.pSub(windowCenter, toWindowPosition);

        //
        var testX = boundBox.x + dLocation.x;

        if (testX < _ScreenWidth() - boundBox.width)
        {
            dLocation.x = _ScreenWidth() - boundBox.width - boundBox.x;
        }

        if (testX > 0)
        {
            dLocation.x = -boundBox.x;
        }

        //
        var testY = boundBox.y + dLocation.y;

        if (testY < _ScreenHeight() - boundBox.height)
        {
            dLocation.y = _ScreenHeight() - boundBox.height - boundBox.y;
        }

        if (testY > 0)
        {
            dLocation.y = -boundBox.y;
        }

        //
        if (!isAnimate)
        {
            zonesBackGround.setPosition(cc.pAdd(zonesBackGround.getPosition(), dLocation));
            return this;
        }

        //
        var duration = Math.abs(dLocation.x)/240;
        duration = duration < 1.5 ? 1.5 : duration;
        duration = duration > 2.5 ? 2.5 : duration;

        //
        if (dLocation.x == 0 && dLocation.y == 0)
        {
            duration = 0.1;
        }

        //
        zonesBackGround.runAction(cc.Sequence.create(
            cc.EaseInOut.create(cc.MoveBy.create(duration, dLocation), 3.0),
            cc.CallFunc.create(callback, mapItem, toActivate)
        ));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    centerMaxProcessMapItem: function()
    {
        if (this.m_CenteredMap)
        {
            return this;
        }

        //
        this.m_CenteredMap = true;

        //
        var mapItem = cc.GUIMapMng.getInstance().getMaxProcessMapItem();

        if (!mapItem)
        {
            return this;
        }

        this.autoMoveZonesBackToMapLevel(false, null, mapItem, false);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    needCenterMap: function()
    {
        this.m_CenteredMap = false;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getZonesBackGround: function()
    {
        return this.m_ZonesBackGround;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMapZones: function()
    {
        return this.m_Zones;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        cc.log("GUIMap");
        this._super(render);

        //

        this.preLoadResource();
        //step1
        this.addContent();
        this.updatePlayerContent();

        this.registerWithTouchDispatcher(true);
        //step2
        this.setZonesEnabled(true);
        //step3
        this.centerMaxProcessMapItem();
        this.updateZone();

        //step4

        this.handleMapEnterAction(false);

        this.notifiedUpdate();

        this.startUpdateHeartsTimer();

        this.updateMailsCount();


        if(cc.NodeSelf.getInstance().isLogin())
        {
            MailMng.getInstance().loadMails();
        }

		if (cc.DataMng.getInstance().isScoreRankingsEnabled()){
			if (!cc.NodeSelf.getInstance().isLogin()){
				this.m_ButtonTotalRank.setVisible(false);
			}
			else {
				this.m_ButtonTotalRank.setVisible(true);
			}
		}

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        cc.log("GUIMAP closeWindow");

        this._super();

        this.registerWithTouchDispatcher(false);

        //
        this.m_WidgetLayer.removeAllChildren(true);

//        this.getZonesBackGround().removeChildByTag(1234);//addChild(this.head_photoMenu, 0, 1234);
//        this.head_photoMenu = null;
        //
        this.m_Buttons.forEach(
            function(button)
            {
                button = null;
            }
        );

        this.m_Buttons = [];

        //
        this.m_Zones.forEach(
            function(zone)
            {
                zone.closeWindow();
            }
        );

        //
        this.cleanupHandleData();

        //
        this.cleanupResource();

        //
		if (cc.DataMng.getInstance().isScoreRankingsEnabled()){
			cc.GUITotalLevelTop.getInstance().closeWindow();
		}
		
		return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addZone: function(zone)
    {
        this.m_Zones.push(zone);
        this.getZonesBackGround().addChild(zone.getWindow());
        zone.closeWindow();

        //
        var zonePos = zone.getWindow().getPosition();
        var zoneSize = zone.getWindow().getContentSize();

        //
        var backSize = this.getZonesBackGround().getContentSize();

        var newWidth = zonePos.x + zoneSize.width;
        if (newWidth < backSize.width)
        {
            newWidth = backSize.width;
        }

        var newHeight = zonePos.y + zoneSize.height;
        if (newHeight < backSize.height)
        {
            newHeight = backSize.height;
        }

        this.m_ZonesBackGround.setContentSize(cc.size(newWidth, newHeight));

        return this;
    },

	refreshZoneStarName: function ()
	{

        this.m_Zones.forEach(
            function(zone)
            {
                if (zone && zone.refreshStarName){
                    zone.refreshStarName();
                }

            }
        );
	},

    //------------------------------------------------------------------------------------------------------------------
    setZonesEnabled: function (isEnabled)
    {
        cc.log("setZonesEnabled = " + isEnabled);
        this.m_Zones.forEach(
            function(zone)
            {
                zone.setEnabled(isEnabled);
            }
        );

        this.m_Buttons.forEach(
            function(button,index)
            {
                 button.setEnabled(isEnabled);
            }
        );

        this.m_CanMove = isEnabled;

        if (!isEnabled)
        {
            this.m_ZonesBackGround.stopAllActions();
            this.m_ZonesBackGround.unscheduleUpdate();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addPromptZoneInfo: function()
    {
        for (var index = 0; index < this.m_Zones.length; index++)
        {
            if (!this.m_Zones[index].isWindowOpen())
            {
                continue;
            }

            if (this.m_Zones[index].addPromptInfoContent())
            {
                break;
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    removePromptZoneInfo: function()
    {
        for (var index = 0; index < this.m_Zones.length; index++)
        {
            if (!this.m_Zones[index].isWindowOpen())
            {
                continue;
            }

            if (this.m_Zones[index].removePromptInfoContent())
            {
                break;
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    /**
     * 只要位置变了就更新,适用于地图执行移动动作
     */
    updateZone: function(dt)
    {
        this.timeToLoadMail = this.timeToLoadMail - dt;
        if(this.timeToLoadMail <= 0)
        {
            MailMng.getInstance().loadMails();
            this.timeToLoadMail = 30;
        }

        var zonesBackGround = this.getZonesBackGround();
        var zonesBackPosition = zonesBackGround.getPosition();
        if (this.m_LastPosition.x == zonesBackPosition.x && this.m_LastPosition.y == zonesBackPosition.y)
        {
            if (!this.m_PromptShow)
            {
//                this.m_PromptTimer += dt;
//                if (this.m_PromptTimer > 3)
//                {
                    this.m_PromptShow = true;
//                    this.m_PromptTimer = 0;

                    this.addPromptZoneInfo();
//                }
            }

            return this;
        }
        this.m_LastPosition = cc.p(zonesBackPosition.x, zonesBackPosition.y);

        //
        if (this.m_PromptShow)
        {
            this.removePromptZoneInfo();
            this.m_PromptShow = false;
        }

        //
        var openZones = [];
        var closeZones = [];

        var viewBoundingBox = this.m_View.getBoundingBox();
        var viewRect = cc.rect(viewBoundingBox.x, viewBoundingBox.y, viewBoundingBox.width, viewBoundingBox.height);

        var zoneScale = zonesBackGround.getScale();
        this.m_Zones.forEach(
            function(zone)
            {
                var zonePos = zone.getWindow().getPosition();
                zonePos = zonesBackGround.convertToWorldSpace(zonePos);

                var zoneSize = zone.getWindow().getContentSize();
                zoneSize.width *= zoneScale;
                zoneSize.height *= zoneScale;

                var zoneRect = cc.rect(zonePos.x, zonePos.y, zoneSize.width, zoneSize.height);
                if (cc.rectIntersectsRect(viewRect, zoneRect))
                {
                    openZones.push(zone);
                }
                else
                {
                    closeZones.push(zone);
                }
            }
        );

        openZones.forEach(
            function(zone)
            {
                if (!zone.isWindowOpen())
                {
                    zone.openWindow(zonesBackGround);
                }
            }
        );

        closeZones.forEach(
            function(zone)
            {
                if (zone.isWindowOpen())
                {
                    zone.closeWindow();
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updatePosition: function()
    {
        var zonesBackGround = this.getZonesBackGround();
        var boundBox = zonesBackGround.getBoundingBox();

        //加上拉伸后的最远处
        var mapStretch = Defines.MAP_STRETCH * Defines.BASE_SCALE;
        var farthestX = _ScreenWidth() - boundBox.width - mapStretch;
        var farthestY = _ScreenHeight() - boundBox.height/* - mapStretch*/;

        boundBox.x = Math.min(mapStretch, boundBox.x);
        boundBox.x = Math.max(farthestX, boundBox.x);
        boundBox.y = Math.min(/*mapStretch*/ 0, boundBox.y);
        boundBox.y = Math.max(farthestY, boundBox.y);

        zonesBackGround.setPosition(cc.p(boundBox.x, boundBox.y));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    /**
     * 在jsb中onTouchBegan和onTouchMoved参数中的touch不是一个实例,且已被释放，得记录touch
     */
    handleTouchBegan: function(touch/*, event*/)
    {
        //cc.log("GUIMap-----handleTouchBegan | this.m_TouchesCount :"  + this.m_TouchesCount + ", ID : " + touch.getId());

        if (!this.m_CanMove || this.m_TouchesCount >= 2)
        {
            return false;
        }

        //记录
        var touchLocation = touch.getLocation();
        this.m_TouchPoints[touch.getId().toString()] = cc.p(touchLocation.x, touchLocation.y);
        ++this.m_TouchesCount;

        this.m_Moved = false;

        if (this.m_TouchesCount == 1)
        {
            this.m_TouchIds[0] = touch.getId().toString();
            this.m_ZonesBackGround.stopAllActions();
            this.m_ZonesBackGround.unscheduleUpdate();
            this.m_MoveSpeed = cc.p(0, 0);
        }
        else if (this.m_TouchesCount == 2)
        {
            this.m_TouchIds[1] = touch.getId().toString();
            this.setZoomInfo();
        }

        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleTouchMoved: function(touch/*, event*/)
    {
        //
        var touchLocation = touch.getLocation();
        this.m_TouchPoints[touch.getId().toString()] = cc.p(touchLocation.x, touchLocation.y);

        if (this.m_TouchesCount == 1)
        {
            this.m_MoveSpeed = cc.p(touch.getDelta().x, touch.getDelta().y);
            this.setOffsetXWithDelta(this.m_MoveSpeed);

            this.m_Moved = true;
        }
        else if (this.m_TouchesCount == 2)
        {
            //step1:
            var touchPoint1 = this.m_TouchPoints[this.m_TouchIds[0]];
            var touchPoint2 = this.m_TouchPoints[this.m_TouchIds[1]];
            var len = cc.pDistance(touchPoint1, touchPoint2);

            //step2: 通过偏移量设置缩放
            this.setZoomWithDelta(len - this.m_ZoomLength);

            //step3:
            this.setZoomInfo();

            this.m_Moved = false;
        }

        //
        this.updatePosition();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleTouchEnded: function(touch/*, event*/)
    {
        //cc.log("GUIMap-----handleTouchEnded");

        var touchLocation = touch.getLocation();

        var mapItem = cc.GUIMapMng.getInstance().getMaxProcessMapItem();
        if (mapItem && !mapItem.isLock() && mapItem.getPlayerContentPosition_ex)
        {
            var targetPos = mapItem.getPlayerContentPosition_ex();
            var targetSize = this.m_HeadFrame.getContentSize();

            var targetRect = cc.rect(targetPos.x  - targetSize.width /2 , targetPos.y - targetSize.height / 2, targetSize.width, targetSize.height);

            if (cc.rectContainsPoint(targetRect, touchLocation))
            {
                //点击玩家头像

                this._btnPhotoCallback();
//                return this;
            }

        }

        this.m_TouchesCount = 0;
        this.m_TouchIds.splice(0, this.m_TouchIds.length);
        this.m_TouchPoints = {};

        if (this.m_Moved)
        {
            var self = this;
            this.m_ZonesBackGround.update = function(dt)
            {
                self.decelerateMove(dt);
            };
            this.m_ZonesBackGround.scheduleUpdate();

            this.m_Moved = false;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleTouchCancelled: function(touch, event)
    {
        this.handleTouchEnded(touch, event);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setOffsetXWithDelta: function (delta)
    {
        var accelerate = 1.6;
        var decelerate = 0.4;

        var zonesBackGround = this.getZonesBackGround();
        var boundBox = zonesBackGround.getBoundingBox();

        //坐下角最远处
        var fartherX = _ScreenWidth() - boundBox.width;

        var oldPos = zonesBackGround.getPosition();

        var testPosX = oldPos.x + delta.x;

        //处于拉伸区域，偏移量减小
        if (testPosX > 0)
        {
            //>0减速前移，<0加速返回
            delta.x = (delta.x > 0 ? decelerate : accelerate) * delta.x;
        }
        else if (testPosX < fartherX)
        {
            //>0加速返回，<0减速前移
            delta.x = (delta.x < 0 ? decelerate : accelerate) * delta.x;
        }

        var newPos = cc.pAdd(oldPos, delta);
        zonesBackGround.setPosition(newPos);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    /**
     * 手指脱离后的自动减速滑动，会在某个方向先减速完
     * 故分方向返回原位置
     */
    relocateXZonesBackground: function ()
    {
        var zonesBackGround = this.getZonesBackGround();
        var boundBox = zonesBackGround.getBoundingBox();

        //坐下角最远处
        var fartherX = _ScreenWidth() - boundBox.width;

        var oldPos = zonesBackGround.getPosition();

        var newPosX = oldPos.x;

        var autoMoveX = false;

        //是否处在拉伸区域
        if (oldPos.x > 0)
        {
            autoMoveX = true;
            newPosX = 0;
        }
        else if (oldPos.x < fartherX)
        {
            autoMoveX = true;
            newPosX = fartherX;
        }

        //处于拉伸区域
        if (autoMoveX)
        {
            var actionMoveX = cc.MoveTo.create(0.5, cc.p(newPosX, oldPos.y));
            var easeOutMoveX = cc.EaseOut.create(actionMoveX, 3);
            zonesBackGround.runAction(easeOutMoveX);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    decelerateMove: function ()
    {
        //减速度
        var decelerate = 0.95;

        //减速
        this.m_MoveSpeed = cc.pMult(this.m_MoveSpeed, decelerate);
        this.setOffsetXWithDelta(this.m_MoveSpeed);

        this.updatePosition();

        if (Math.abs(this.m_MoveSpeed.x) <= 1)
        {
            this.m_ZonesBackGround.unscheduleUpdate();
            this.relocateXZonesBackground();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setZoomInfo: function ()
    {
        var touchPoint1 = this.m_TouchPoints[this.m_TouchIds[0]];
        var touchPoint2 = this.m_TouchPoints[this.m_TouchIds[1]];

        this.m_ZoomPoint = cc.pMidpoint(touchPoint1, touchPoint2);
        this.m_ZoomLength = cc.pDistance(touchPoint1, touchPoint2);
        this.m_ZoomScale = this.getZonesBackGround().getScale();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setZoomWithDelta: function (delta)
    {
        var zonesBackGround = this.getZonesBackGround();

        //按比率计算缩放值
        var zoomRate = 1/500;
        var factor = delta * zoomRate * 0.9;
        var scale = this.m_ZoomScale + factor;

        var maxScale = 1.2;
        var minScale = 1;
        scale = Math.min(maxScale, Math.max(minScale, scale));

        //设置偏移
        var oldCenter = zonesBackGround.convertToNodeSpace(this.m_ZoomPoint);
        zonesBackGround.setScale(scale);
        var newCenter = zonesBackGround.convertToNodeSpace(this.m_ZoomPoint);

        var dLocation = cc.pSub(newCenter, oldCenter);
        zonesBackGround.setPosition(cc.pAdd(zonesBackGround.getPosition(), dLocation));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanupHandleData: function()
    {
        //清空触摸数据
        this.m_TouchesCount = 0;
        this.m_TouchIds.splice(0, this.m_TouchIds.length);
        this.m_TouchPoints = {};
        this.m_Moved = false;
        this.m_LastPosition = cc.p(0, 1000); //地图不可能达到的值

        //
        this.m_Zones.forEach(
            function(zone)
            {
                if (zone.isWindowOpen() && zone.getZoneMenu())
                {
                    zone.getZoneMenu().cleanupHandleData();
                }
            }
        );

        //
//        if (this.m_PromptShow)
//        {
//            this.removePromptZoneInfo();
//            this.m_PromptShow = false;
//        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyFriendsPhotosLoadFinish: function()
    {
        cc.log("notifyFriendsPhotosLoadFinish");

        this.m_Zones.forEach(
            function(zone)
            {
                if (zone.isWindowOpen())
                {
                    zone.reloadFriendsPhoto();
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    preLoadResource: function()
    {
        //
        //cc.ArmatureDataMng.getInstance().registerMap();

        //
        var resForMap = [
            [Resource._GUIMap_plist, Resource._GUIMap_png],
            [Resource._MainMap_plist, Resource._MainMap_png],
            //[Resource.map_rainbow_plist, Resource.map_rainbow_png],
            [Resource.map_meteor_plist, Resource.map_meteor_png],
            [Resource.map_level_unlock_plist, Resource.map_level_unlock_png]
        ];

        //
        resForMap.forEach(
            function(each)
            {
                cc.ResourceMng.getInstance().addToCache(each[0], each[1]);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanupResource: function()
    {
        var resForMap = [
            [Resource._GUIMap_plist, Resource._GUIMap_png],
            [Resource._MainMap_plist, Resource._MainMap_png],
            //[Resource.map_rainbow_plist, Resource.map_rainbow_png],
            [Resource.map_meteor_plist, Resource.map_meteor_png],
            [Resource.map_level_unlock_plist, Resource.map_level_unlock_png]
        ];

        //
        resForMap.forEach(
            function(each)
            {
                cc.ResourceMng.getInstance().removeFromCache(each[0], each[1]);
            }
        );

        var needRemoveFromCache = [
            Resource._MapZone,
            _MainMapPath + "Map_BackStar_1.png"           //_MainMapPath + "Map_BackStar_Opacity.png"

        ];

        needRemoveFromCache.forEach(
            function(a_res)
            {
                cc.ResourceMng.getInstance().removeTextureCache(a_res);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyAppActive: function()
    {
        if (this.isWindowOpen())
        {
            //
            cc.log("GUIMap GUIMap notifyAppActive");
            this.startUpdateHeartsTimer();
        }

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------


});

cc.GUIMap._instance = null;
cc.GUIMap.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIMap();
        this._instance.init();

        //
        var self = this;

        //加载正常关卡的地图
		cc.log("加载正常关卡的地图");
        GUI.NORMAL_MAPS.forEach(
            function(each)
            {
                self._instance.addZone(cc.GUIMapZone.create(each));
            }
        );

        //加载最后一个待开启的地图
        this._instance.addZone(cc.GUIMapZoneTemp.create(GUI.TEMP_MAP));

        //
        cc.DataMng.getInstance().addGUIObserver(this._instance);

        //注册
        var eventArray = [
            _MAIL_MNG_EVENT.RELOAD_MAILS_FINISH,
            _MAIL_MNG_EVENT.RECV_NEW_MAIL,
            _MAIL_MNG_EVENT.PICK_MAIL
        ];

        //
        eventArray.forEach(
            function(eventName)
            {
                MailMng.getInstance().registerEvent(
                    eventName,
                    function()
                    {
                        if (self._instance.isWindowOpen())
                        {
                            self._instance.updateMailsCount();
                        }
                    },
                    null);
            }
        );


        //
        FriendsMng.getInstance().registerEvent(
            _FRIENDS_MNG_EVENT.LOAD_PHOTO,
            function()
            {
                self._instance.notifyFriendsPhotosLoadFinish();
            },
            null);

        FriendsMng.getInstance().registerEvent(
            _FRIENDS_MNG_EVENT.GET_FRIENDS_FROM_HOME_SUCC,
            function()
            {
                self._instance.notifyFriendsPhotosLoadFinish();
                self._instance.refreshZoneStarName();
            },
            null);

    }

    return this._instance;
};