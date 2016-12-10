
//TODO 获取可用的多用户系统 暂时
var _GetJoyFlags = function()
{
    cc.log("_GetJoyFlags");
    if (Defines.IS_EN){
        cc.log("Defines.IS_EN");
        return [JoyType.JOY_FACEBOOK];
    }
    else if (Defines.IS_KO){
        cc.log("Defines.IS_KO");
        return [JoyType.JOY_KAKAO];
    }
    else {
        return [JoyType.JOY_WEIBO, JoyType.JOY_RENREN];
    }
};


//======================================================================================================================
cc.GUIMainMenu = cc.GUIWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUIMainMenu";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor:function()
    {
        this._super();

        this.m_Menu = null;
        this._loginButton = null;
        this._secLoginButton = null;
        this._inputButton = null;
        this._feedbackButton = null;
        this._moreButton = null;
        this.startBtn_2_forEN = null;
        this.startButton = null;
        this.first_login_btn_check_nor = null;
        this.first_login_btn_check_sel = null;
        this.first_login_btn_flag = true;

        this._firstLoginTipMonster = null;
        this._firstLoginTipTxtBack = null;
        this._firstLoginTipTxtContent = null;
		this.first_login_tip_bg = null;
        this.first_login_tip_bg_2 = null;
		this._firstOpen = false;
        this._forceOpen = false;
    },

    //--------------------------------------------------------------------------------------------------------------------
    init:function()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //背景

        var self = this;
        var background = cc.ArmatureDataMng.getGUIMainMenu() ?
            cc.ArmatureDataMng.getGUIMainMenu().createArmature(this._firstOpen) : null;

        if (!background)
        {
            background = cc.Sprite.create(_HtmlPath + "main_bg1.jpg");
            GUI.backGroundScaleToScreen(background);
        }

        this.getWindow().addChild(background);

        var offPosition = -1 * Math.abs(background.getContentSize().width - _ScreenWidth())/2;
        background.setPosition(_ScreenBottomLeft().x + offPosition, _ScreenBottomLeft().y);
        background.setAnchorPoint(cc.p(0, 0));

        //菜单
        this.m_Menu = cc.Menu.create();
        this.m_Menu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(this.m_Menu, 1);
		
        //开始按钮
        this.startButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("MainMenu_start_nor.png"),
            cc.Sprite.createWithSpriteFrameName("MainMenu_start_sel.png"),
            this.startGame, this);
        this.m_Menu.addChild(this.startButton);
        this.startButton.setPosition(cc.p(_ScreenWidth() - 110 * Defines.BASE_SCALE, 81 * Defines.BASE_SCALE));
        if (!Defines.OS.isiOS() && !Defines.OS.isBrowser()){
            this.startButton.setVisible(false);
        }
        if (!cc.DataMng.getInstance().isGetGuestEnabled()){
            this.startButton.setVisible(false);
        }

        if(Defines.OS.isAndroid() && Defines.IS_KO)
        {
            this.startButton.setVisible(false);
        }

//        if()

        //登录
        var joyFlags = _GetJoyFlags();

        //登陆按钮
        this._loginButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("MainMenu_btn_login_nor.png"),
            cc.Sprite.createWithSpriteFrameName("MainMenu_btn_login_nor.png"),
            this.callBackLogin, this);
        this.m_Menu.addChild(this._loginButton);
        this._loginButton.setTag(joyFlags[0]);
        this._loginButton.setPosition(cc.p(_ScreenWidth()/2, 190 * Defines.BASE_SCALE));
        cc.log("_loginButton 用户系统为 = " + joyFlags[0]);
//        this._addLoginButtonImage(this._loginButton, joyFlags[0]);

		if (Defines.IS_KO){
		    var _icon_monster = cc.Sprite.createWithSpriteFrameName("MainMenu_monster_logo.png");
            this.getWindow().addChild(_icon_monster);
            _icon_monster.setPosition(cc.p(_ScreenWidth()/2, 445 * Defines.BASE_SCALE));
		}

        if (Defines.IS_EN){
            this.startButton.setPosition(cc.p(_ScreenWidth()/2, 70 * Defines.BASE_SCALE));
            this._loginButton.setPosition(cc.p(_ScreenWidth()/2, 165 * Defines.BASE_SCALE));
            var _icon_monster = cc.Sprite.createWithSpriteFrameName("MainMenu_monster_logo.png");
            this.getWindow().addChild(_icon_monster);
            _icon_monster.setPosition(cc.p(_ScreenWidth()/2, _ScreenHeight()*0.6));

            this.startBtn_2_forEN = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("MainMenu_startEN_nor.png"),
                cc.Sprite.createWithSpriteFrameName("MainMenu_startEN_sel.png"),
                this.startGame, this);
            this.m_Menu.addChild(this.startBtn_2_forEN);
            this.startBtn_2_forEN.setPosition(cc.p(_ScreenWidth()/2, 165 * Defines.BASE_SCALE));
            this.startBtn_2_forEN.setVisible(false);
        }

        //TODO 第二个登录按钮
        if (joyFlags.length >= 2)
        {
            this._secLoginButton = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("MainMenu_btn_login_nor.png"),
                cc.Sprite.createWithSpriteFrameName("MainMenu_btn_login_sel.png"),
                this.callBackLogin, this);
            this.m_Menu.addChild(this._secLoginButton);
            this._secLoginButton.setTag(joyFlags[1]);
            this._secLoginButton.setPosition(cc.p(_ScreenWidth()/2 + 120 * Defines.BASE_SCALE, 70 * Defines.BASE_SCALE));
            this._loginButton.setPosition(cc.p(_ScreenWidth()/2 - 120 * Defines.BASE_SCALE, 70 * Defines.BASE_SCALE));
            this._addLoginButtonImage(this._secLoginButton, joyFlags[1]);
        }

        var first_login_height = 87 * Defines.BASE_SCALE;

        this.first_login_btn_check_nor = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("MainMenu_Image_check_nor.png"),
            cc.Sprite.createWithSpriteFrameName("MainMenu_Image_check_nor.png"),
            this.tipCheckBack, this);
        this.first_login_btn_check_nor.setPosition(cc.p(293 * Defines.BASE_SCALE, first_login_height));
        this.m_Menu.addChild(this.first_login_btn_check_nor);
        this.first_login_btn_flag = true;

        this.first_login_btn_check_sel = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("MainMenu_Image_check_sel.png"),
            cc.Sprite.createWithSpriteFrameName("MainMenu_Image_check_sel.png"),
            this.tipCheckBack, this);
        this.first_login_btn_check_sel.setPosition(cc.p(293 * Defines.BASE_SCALE, first_login_height));
        this.m_Menu.addChild(this.first_login_btn_check_sel);
        this.first_login_btn_check_sel.setVisible(false);

        this.first_login_tip_bg = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("MainMenu_bg_textTip.png"),
            cc.Sprite.createWithSpriteFrameName("MainMenu_bg_textTip.png"),
            this.tipTextBack, this);
        this.m_Menu.addChild(this.first_login_tip_bg);
        this.first_login_tip_bg.setTag(1);
        this.first_login_tip_bg.setPosition(cc.p(410 * Defines.BASE_SCALE, first_login_height));
        this.first_login_tip_bg.setScaleX (2.8);

        this.first_login_tip_bg_2 = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("MainMenu_bg_textTip.png"),
            cc.Sprite.createWithSpriteFrameName("MainMenu_bg_textTip.png"),
            this.tipTextBack, this);
        this.m_Menu.addChild(this.first_login_tip_bg_2);
        this.first_login_tip_bg_2.setTag(2);
        this.first_login_tip_bg_2.setPosition(cc.p(525 * Defines.BASE_SCALE, first_login_height));
        this.first_login_tip_bg_2.setScaleX (1.8);

        var first_login_tip_text = cc.LabelTTF.create(Resource.ChineseTxt["first_tip"], Defines.DefaultFont, 22 * Defines.BASE_SCALE);
        this.first_login_tip_bg.addChild(first_login_tip_text);
        first_login_tip_text.setAnchorPoint(cc.p(0, 0.5));
        first_login_tip_text.setPosition(cc.p(2 * Defines.BASE_SCALE, this.first_login_tip_bg.getContentSize().height / 2));
		first_login_tip_text.setScaleX(1/3);

        var curJoyFlag = cc.DataMng.getInstance().getCurJoyFlag();
        var ok = cc.DataMng.getInstance().getAutoLoginFlag() && !isTelcomOperators() && !cc.NodeSelf.getInstance().isLogin() && curJoyFlag >= 0;
//        if (ok)
//        {
//            cc.log("isAutoLogin 222");
//            joyCommon.getInstance().isAutoLogin(
//                function()
//                {
//                    if (!_RefuseAutoLogin)
//                    {
//                        self.first_login_btn_check_nor.setVisible(true);
//                        self.first_login_btn_check_sel.setVisible(false);
//                        self.first_login_tip_bg.setVisible(false);
//                        self.first_login_tip_bg_2.setVisible(false);
//                        self.first_login_btn_flag = false;
//                    }
//                },
//                function()
//                {
//                    //
//                    cc.log("自动登录失败");
//                },
//                curJoyFlag
//            );
//        }


        //反馈按钮
        this._feedbackButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("MainMenu_btn_feedback_nor.png"),
            cc.Sprite.createWithSpriteFrameName("MainMenu_btn_feedback_sel.png"),
            this.callFeedback, this);
        this.m_Menu.addChild(this._feedbackButton);
        this._feedbackButton.setPosition(cc.p(_ScreenWidth() - 80 * Defines.BASE_SCALE, 140 * Defines.BASE_SCALE));
        this._feedbackButton.setVisible(false);

        //兑换码
        var inputNor = isTelcomOperators() ? "MainMenu_btn_service_nor.png" : "MainMenu_btn_bonus_nor.png";
        var inputSel = isTelcomOperators() ? "MainMenu_btn_service_sel.png" : "MainMenu_btn_bonus_sel.png";
        this._inputButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName(inputNor),
            cc.Sprite.createWithSpriteFrameName(inputSel),
            this.callBackInput, this);
        this.m_Menu.addChild(this._inputButton);
        this._inputButton.setPosition(cc.p(_ScreenWidth() - 80 * Defines.BASE_SCALE, 60 * Defines.BASE_SCALE));
        this._inputButton.setVisible(false);

        if (!isTelcomOperators()){
            //精品推荐按钮-触控广告
            var needShowMore = cc.DataMng.getInstance().isMoreGameADEnabled();
            this._moreButton = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("MainMenu_btn_more_nor.png"),
                cc.Sprite.createWithSpriteFrameName("MainMenu_btn_more_sel.png"),
                this.callBackMore, this);
            this._moreButton.setPosition(cc.p(_ScreenWidth() - 80 * Defines.BASE_SCALE, 60 * Defines.BASE_SCALE));
            this.m_Menu.addChild(this._moreButton);

            this._moreButton.setVisible(needShowMore);
            (needShowMore) && this._inputButton.setPositionY(140 * Defines.BASE_SCALE);
            (needShowMore) && this._feedbackButton.setPositionY(220 * Defines.BASE_SCALE);

        }
        else {
            //更多游戏按钮-运营商
            var needShowOther = isCM() || isCT();
            cc.log("needShowOther = " + needShowOther);
            this._moreButton = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("MainMenu_btn_moreForTel_nor.png"),
                cc.Sprite.createWithSpriteFrameName("MainMenu_btn_moreForTel_sel.png"),
                this.callBackMoreForTelcomOperators, this);
            this._moreButton.setPosition(cc.p(_ScreenWidth() - 80 * Defines.BASE_SCALE, 60 * Defines.BASE_SCALE));
            this.m_Menu.addChild(this._moreButton);

            this._moreButton.setVisible(needShowOther);
            (needShowOther) && this._inputButton.setPositionY(140 * Defines.BASE_SCALE);
            (needShowOther) && this._feedbackButton.setPositionY(220 * Defines.BASE_SCALE);
        }

        this._moreButton.setVisible(false);
        //设置
        var joystickButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("joystick_up.png"),
            cc.Sprite.createWithSpriteFrameName("joystick_down.png"),
            this.callBackJoystick, this);
        this.m_Menu.addChild(joystickButton);
        joystickButton.setPosition(cc.p(50 * Defines.BASE_SCALE, 140 * Defines.BASE_SCALE));
        joystickButton.setVisible(isAbleGoogleGame());

        var optionButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_option_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_option_sel.png"),
            this.callBackOption, this);
        this.m_Menu.addChild(optionButton);
        optionButton.setPosition(cc.p(50 * Defines.BASE_SCALE, 60 * Defines.BASE_SCALE));
        optionButton.setVisible(!isTelcomOperators());

        //关闭
        var closeButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("MainMenu_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("MainMenu_btn_close_sel.png"),
            this.callBackClose, this);
        this.m_Menu.addChild(closeButton);
        closeButton.setPosition(cc.p( _ScreenWidth() - 35 * Defines.BASE_SCALE, _ScreenHeight() - 38 * Defines.BASE_SCALE));
        var needShowClose = (isCM() ||isCT());
        closeButton.setVisible(needShowClose);

        //
        if (isTelcomOperators())
        {
            this.startButton.setPositionY(this.startButton.getPosition().y - 60 * Defines.BASE_SCALE);
            this.addLeftButtonsForCM();
        }

        //苹果GameCenter
        if (GameCenterMng.getInstance().isEnable())
        {
            var btnGameCenter = cc.MenuItemSprite.create(
                cc.Sprite.create(_GUIPath + "GUINewGeneral/btn_game_center_up.png"),
                cc.Sprite.create(_GUIPath + "GUINewGeneral/btn_game_center_down.png"),
                this._btnGameCenterLogin,
                this);

            //
            this.m_Menu.addChild(btnGameCenter);
            btnGameCenter.setPosition(cc.p((50 + 70) * Defines.BASE_SCALE, 60 * Defines.BASE_SCALE));
            btnGameCenter.setVisible(false);
        }


        //小怪推荐登陆
        this._monsterRecommendLogin();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //小怪推荐登陆
    _monsterRecommendLogin: function()
    {
//        if (!cc.NodeSelf.getInstance().getLocalRoleFreeStatus()/*cc.DataMng.getNodeSelf().isEverLogin()*/ /*cc.DataMng.getRole().isEverLoginHomeServer()*/ || isTelcomOperators())
 //        {
//            cc.log("登录过 所以不用显示小怪 推荐登录");
//            return this;
//        }
//		
		if (cc.NodeSelf.getInstance().isLogin())
        {
            cc.log("已经是登录状态 所以不用显示小怪 推荐登录");
            return this;
        }

        cc.log("显示小怪 推荐登录");

        //
        this._firstLoginTipMonster = cc.Sprite.createWithSpriteFrameName("Images_monster_3.png");
        this.getWindow().addChild(this._firstLoginTipMonster);
        this._firstLoginTipMonster.setPosition(cc.p(this._loginButton.getPosition().x - 125 * Defines.BASE_SCALE,
            this._loginButton.getPosition().y + 10 * Defines.BASE_SCALE));

        //
        this._firstLoginTipTxtBack = cc.Sprite.createWithSpriteFrameName("general_name_back.png");
        this.getWindow().addChild(this._firstLoginTipTxtBack);
        this._firstLoginTipTxtBack.setPosition(cc.p(_ScreenBottom().x, _ScreenBottom().y + 10 * Defines.BASE_SCALE));
        this._firstLoginTipTxtBack.setScaleX(1.5);
        this._firstLoginTipTxtBack.setVisible(false);

        //
        this._firstLoginTipTxtContent = cc.LabelTTF.create(Resource.ChineseTxt[108], Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        this.getWindow().addChild(this._firstLoginTipTxtContent);
        this._firstLoginTipTxtContent.setAnchorPoint(cc.p(0.5, 0.5));
        this._firstLoginTipTxtContent.setPosition(cc.p(_ScreenBottom().x, _ScreenBottom().y + 15 * Defines.BASE_SCALE));
        this._firstLoginTipTxtContent.setVisible(false);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addLeftButtonsForCM: function()
    {
        var self = this;

        //
        var buttonHelp = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("MainMenu_btn_help_nor.png"),
            cc.Sprite.createWithSpriteFrameName("MainMenu_btn_help_sel.png"),
            function()
            {
                if (cc.GUITeachAndHelp.getInstance().isWindowOpen())
                {
                    cc.GUITeachAndHelp.getInstance().closeWindow()
                }
                else
                {
                    cc.GUITeachAndHelp.getInstance().openWindow(self.getWindow().getParent())
                }
            },
            this);

        //
        buttonHelp.setPosition(cc.p(48 * Defines.BASE_SCALE, 60 * Defines.BASE_SCALE));
        this.m_Menu.addChild(buttonHelp);

        //
        var buttonInfo = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("MainMenu_btn_info_nor.png"),
            cc.Sprite.createWithSpriteFrameName("MainMenu_btn_info_sel.png"),
            function()
            {
                if (cc.GUIAboutUs.getInstance().isWindowOpen())
                {
                    cc.GUIAboutUs.getInstance().closeWindow()
                }
                else
                {
                    cc.GUIAboutUs.getInstance().openWindow(self.getWindow().getParent())
                }
            },
            this);

        //
        buttonInfo.setPosition(cc.p(48 * Defines.BASE_SCALE, 140 * Defines.BASE_SCALE));
        this.m_Menu.addChild(buttonInfo);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //小怪推荐登陆
    _addLoginButtonImage: function(loginButton, joyFlag)
    {
        var frameName = "";
        if (joyFlag == JoyType.JOY_WEIBO)
        {
            frameName = "icon_social_weibo.png";
        }
        else if (joyFlag == JoyType.JOY_COCO)
        {
            frameName = "icon_social_coco.png";
        }
        else if (joyFlag == JoyType.JOY_RENREN)
        {
            frameName = "icon_social_renren.png";
        }
        else if (joyFlag == JoyType.JOY_FACEBOOK)
        {
            frameName = "icon_social_facebook.png";
        }

        if (frameName != "")
        {
            var img = cc.Sprite.createWithSpriteFrameName(frameName);
            if (img)
            {
                loginButton.addChild(img);
                img.setPosition(cc.p(168 * Defines.BASE_SCALE, 45 * Defines.BASE_SCALE));
            }
        }
        if (joyFlag == JoyType.JOY_FACEBOOK)
        {
            img.setPosition(cc.p(205 * Defines.BASE_SCALE, 55 * Defines.BASE_SCALE));
        }

		if (Defines.IS_KO){
            img.setPosition(cc.p(165 * Defines.BASE_SCALE, 50 * Defines.BASE_SCALE));
		}
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateLoginButtonVisibleByLoginState: function()
    {
        if (!this.isWindowOpen())
        {
            return this;
        }

        var isLogin = cc.NodeSelf.getInstance().isLogin();
        this._setLoginButtonVisible(!isLogin);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _setLoginButtonVisible: function(visible)
    {
        if (!this._loginButton || !this.isWindowOpen())
        {
            return this;
        }

        cc.log("_setLoginButtonVisible = " + visible);
        var self = this;

        //
        this._loginButton.setVisible(visible);
//        this.first_login_btn_check_nor.setVisible(visible);
//        this.first_login_btn_check_sel.setVisible(visible);
//        this.first_login_tip_bg.setVisible(visible);
//        this.first_login_tip_bg_2.setVisible(visible);
//        this.first_login_btn_flag = visible;

        if (this._secLoginButton)
        {
            this._secLoginButton.setVisible(visible);
        }

//        //第一次登陆的小怪相关的控件也隐藏掉
//        [
//            this._firstLoginTipMonster,
////            this._firstLoginTipTxtBack,
////            this._firstLoginTipTxtContent,
//            this.first_login_tip_bg,
////            this.first_login_btn_check_sel,
//            this.first_login_btn_check_nor
//        ].forEach(
//            function(each)
//            {
//                if (each)
//                {
//                    each.setVisible(self._loginButton.isVisible());
//                }
//            }
//        );


        if (!visible){
            this.first_login_btn_check_sel.setVisible(false);
        }

        if (Defines.IS_EN){
            this.startBtn_2_forEN.setVisible(!visible);
            this.startButton.setVisible(visible);
        }

        if(Defines.OS.isAndroid() && Defines.IS_KO)
        {
            this.startButton.setVisible(false);
        }

        return this;
    },

    updateGuestButton : function(res)
    {
        if(Defines.OS.isAndroid())
        {
            this.startButton.setVisible(false);
            return this;
        }

        this.startButton.setVisible(res);
    },

    //------------------------------------------------------------------------------------------------------------------
    _updateLoginButtonVisible: function(autoLogin)
    {
        //var self = this;
        //var final = autoLogin && _LogoutFlag;
        var canAutoLogin = (autoLogin && !_LogoutFlag);
        //this._loginButton.setVisible(!canAutoLogin);
        this._setLoginButtonVisible(!canAutoLogin);

        //第一次登陆的小怪相关的控件也隐藏掉
        /*[
            this._firstLoginTipMonster,
            this._firstLoginTipTxtBack,
            this._firstLoginTipTxtContent
        ].forEach(
            function(each)
            {
                if (each)
                {
                    each.setVisible(self._loginButton.isVisible());
                }
            }
        );
*/
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateLoginButton: function()
    {
        if (!this.isWindowOpen() || !this._loginButton)
        {
            return this;
        }

        var self = this;

        if (!cc.DataMng.getInstance().getAutoLoginFlag()){
            this._setLoginButtonVisible(true);
        }

        cc.log("cc.DataMng.getInstance().getAutoLoginFlag()  = " + cc.DataMng.getInstance().getAutoLoginFlag() );


        if (!cc.GUIUpdateApp.canOpen() && !cc.GUIUpdateApp.getInstance().isWindowOpen()){
            var ok = cc.DataMng.getInstance().getAutoLoginFlag() && !isTelcomOperators() && !cc.NodeSelf.getInstance().isLogin() && !Defines.OS.isBrowser() && CHANNEL != "000909";
            cc.log("updateLoginButton isLogin: " + cc.NodeSelf.getInstance().isLogin());
            if (ok)
            {
                this._setLoginButtonVisible(false);
                cc.DataMng.getInstance().setAutoLoginFlag(true);
                //
                var curJoyFlag = cc.DataMng.getInstance().getCurJoyFlag();
                if (Defines.PLATFORM.isMobile() && curJoyFlag >= 0)
                {
                    cc.log("isAutoLogin 333");
                    joyCommon.getInstance().isAutoLogin(
                        function()
                        {
                            self.first_login_btn_check_nor.setVisible(false);
                            self.first_login_btn_check_sel.setVisible(false);
                            self.first_login_tip_bg.setVisible(false);
                            self.first_login_tip_bg_2.setVisible(false);
                            self.first_login_btn_flag = false;
                            cc.log("3333可以自动登录");
                            self._updateLoginButtonVisible(true);

                            if (!_RefuseAutoLogin)
                            {
                                _Login(curJoyFlag, true);
                            }
                        },
                        function()
                        {
                            cc.log("2222不可以自动登录");
                            self.first_login_btn_check_nor.setVisible(true);
                            self.first_login_btn_check_sel.setVisible(false);
                            self.first_login_tip_bg.setVisible(true);
                            self.first_login_tip_bg_2.setVisible(true);
                            self._updateLoginButtonVisible(false);
                        },
                        curJoyFlag
                    );
                }
                else
                {
                    this._setLoginButtonVisible(true);
                }
            }
        }


//
//        if (!isTelcomOperators() && !cc.NodeSelf.getInstance().isLogin() && !Defines.OS.isBrowser() && CHANNEL != "000909")
//        {
//            cc.log("不需要显示 登录 按钮！！！！");
//            this._setLoginButtonVisible(false);
//        }

        cc.log("before this.foreopen = " + this._forceOpen);
        if (cc.NodeSelf.getInstance().isLogin() && !isTelcomOperators() && (this._forceOpen == undefined)){
			if (Scene_Story.canChangeTo(Story_0))
			{
				Scene_Story.changeTo();
			}
			else if (!Defines.IS_KO && Scene_DailyBonus.canChangeTo())
			{
				Scene_DailyBonus.changeTo();
			}
            else if (Defines.IS_KO && Scene_SignBonus.canChangeTo())
            {
				cc.log("Scene_SignBonus.canChangeTo() true begin changeto");
                Scene_SignBonus.changeTo();
            }
			else
			{
				Scene_MainMap.changeTo();
			}
        }

//        if (this._loginButton)
//        {
//            var needShowLogin = !cc.NodeSelf.getInstance().isLogin() && !isTelcomOperators();
//            this._loginButton.setVisible(needShowLogin);
//
//            //第一次登陆的小怪相关的控件也隐藏掉
//            [
//                this._firstLoginTipMonster,
//                this._firstLoginTipTxtBack,
//                this._firstLoginTipTxtContent
//            ].forEach(
//                    function(each)
//                    {
//                        if (each)
//                        {
//                            each.setVisible(self._loginButton.isVisible());
//                        }
//                    }
//                );
//        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    startGame: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        cc.GUIMsgBox.getInstance().openWindow(
            cc.Director.getInstance().getRunningScene(),
            new MsgBox_checkGuestText()
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    callBackLogin: function(sender)
    {
        if (cc.GUIFirstLoginTip.getInstance().isWindowOpen()){
            return this;
        }

        cc.AudioMng.getInstance().playButtonSound(true);
        this._forceOpen = undefined;
        var curJoyFlag = sender.getTag();
        cc.log("将要登录的用户系统 = " + curJoyFlag);

        if(isHtml5)
        {
            this.startGame();
            return;
        }

        if(!_IsNetWorkEnable()){
            cc.log("!_IsNetWorkEnable()");
            showMessageToast(Resource.ChineseTxt["msg_0"]);
        }
        else {

//            var configClass = wrapperConfig.Config.getInstance();
//            configClass.kakaoLogin();
            if (this.first_login_btn_flag){
                cc.log("first_login_btn_flag");
                cc.GUIMsgBox.getInstance().openWindow(
                    cc.Director.getInstance().getRunningScene(),
                    new MsgBox_LoginServer()
                );
            }
            else {
                cc.log("!first_login_btn_flag, _Login");
                _Login(curJoyFlag);
            }

        }

        return this;
    },

    tipTextBack: function(sender)
    {
        if (cc.GUIFirstLoginTip.getInstance().isWindowOpen()){
            return this;
        }
        cc.AudioMng.getInstance().playButtonSound(true);
        cc.GUIFirstLoginTip.getInstance().openWindow(
            cc.Director.getInstance().getRunningScene(),
            sender.getTag()
        );
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    tipCheckBack: function(sender)
    {
        if (cc.GUIFirstLoginTip.getInstance().isWindowOpen()){
            return this;
        }
        cc.AudioMng.getInstance().playButtonSound(true);
        this.first_login_btn_check_nor.setVisible(!this.first_login_btn_flag);
        this.first_login_btn_check_sel.setVisible(this.first_login_btn_flag);
        this.first_login_btn_flag = !this.first_login_btn_flag;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    callFeedback: function()
    {
                                    
        cc.AudioMng.getInstance().playButtonSound(true);
        FeedbackMng.getInstance().feedback();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    callBackInput: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        if (isTelcomOperators())
        {
            noticeJaveHandler(4 , "game");
            return this;
        }

        //
        var succFunc = function()
        {
            noticeJaveHandler(4 , "game");
        };

        var failFunc = function()
        {
            _MsgView_ApplyDeviceIDFail();
        };

        //
        Game_ApplyDeviceID.create(succFunc, failFunc);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    callBackMore: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        var needShowMore = cc.DataMng.getInstance().isMoreGameADEnabled();
        if (needShowMore){
            if (Define_SysConfig.getInstance().isADEnable()){
                adManage.AdManage.getInstance().showPunchBoxMoreGame();
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    callBackMoreForTelcomOperators: function() //运营商更多游戏
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        noticeJaveHandler(2);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    callBackOption: function()
    {
        if (cc.GUIFirstLoginTip.getInstance().isWindowOpen()){
            return this;
        }
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
    callBackJoystick: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        displayLeaderBoard();
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    callBackClose: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        noticeJaveHandler(0);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifiedUpdate: function(/*subject*/)
    {
        if (!this.isWindowOpen())
        {
            return this;
        }

        //
//        var isCDKeyEnabled = cc.DataMng.getInstance().isCDKeyEnabled();
//        this._inputButton.setVisible(isCDKeyEnabled);

//        if (!isTelcomOperators()){
//            //精品推荐按钮-触控广告
//            var needShowMore = cc.DataMng.getInstance().isMoreGameADEnabled();
//            this._moreButton.setVisible(needShowMore);
//            needShowMore && this._inputButton.setPositionY(140 * Defines.BASE_SCALE);
//        }
//        else {
//            //更多游戏按钮-运营商
//            var needShowOther = isCM() || isCT();
//            this._moreButton.setVisible(needShowOther);
//            needShowOther && this._inputButton.setPositionY(140 * Defines.BASE_SCALE);
//        }
//
//        if (!isCDKeyEnabled)
//        {
//            this._feedbackButton.setPositionY(this._inputButton.getPosition().y);
//        }
//        else
//        {
//            this._feedbackButton.setPositionY(this._inputButton.getPosition().y + 80 * Defines.BASE_SCALE);
//        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, flag, forceOpen)
    {
        this._super(render);

        if(Defines.OS.isAndroid() || isHtml5)
        {
            cc.GUIFirstLoginTip = cc.GUIFirstLoginTipNew;
        }

		this._firstOpen = flag;

        this._forceOpen = forceOpen;
        //
        cc.ResourceMng.getInstance().addToCache(
            Resource.GUIMainMenu_plist,
            Resource.GUIMainMenu_png);

        cc.log("当前设备本身是否支持PunchBox广告SDK = " + Define_SysConfig.getInstance().isADEnable());
		if (Define_SysConfig.getInstance().isADEnable()){
			adManage.AdManage.getInstance().startPunchBox(Defines.PunchBoxID);
		}
		
        //
        cc.ArmatureDataMng.getInstance().registerMainMenu();

        this.getWindow().removeAllChildren(true);
        this.addContent();

        //
        this.updateLoginButton();
        this.notifiedUpdate();



        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        //
        this._super();
        this.getWindow().removeAllChildren(true);

        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource.GUIMainMenu_plist,
            Resource.GUIMainMenu_png);

        //
        this._firstLoginTipMonster = null;
        this._firstLoginTipTxtBack = null;
        this._firstLoginTipTxtContent = null;
        this._loginButton = null;
        this._secLoginButton = null;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnGameCenterLogin: function()
    {
        cc.log("首页登陆 _btnGameCenterLogin");

        if (GameCenterMng.getInstance().isLogin())
        {
            GameCenterMng.getInstance().showScoreTop();
        }
        else
        {
            GameCenterMng.getInstance().login();
        }

        return this;
    }
});


cc.GUIMainMenu._instance = null;
cc.GUIMainMenu.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIMainMenu();
        this._instance.init();
        cc.DataMng.getInstance().addGUIObserver(this._instance);
    }

    return this._instance;
};