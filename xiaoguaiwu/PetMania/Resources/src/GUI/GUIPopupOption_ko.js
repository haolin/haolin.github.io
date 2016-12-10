

cc.GUIPopupOption_ko = cc.GUIPopupWindow.extend ({

    description: function()
    {
        return "GUIPopupOption_ko";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //
        this.m_MainUI = null;

        //
        this.m_Menu = null;
        this.btn_check = null;
        this._inputButton = null;
        //
        this.m_SpriteSoundDisabled = null;
        this.m_SpriteMusicDisabled = null;
        this.m_SpriteNotifDisabled = null;
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
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(blockLayer, -1);

        //
        var tempMain = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png");
        var srcSize = tempMain.getContentSize();

        //
        this.m_MainUI = cc.Scale9Sprite.create(
            _GUIPath + "GUINewGeneral/general_back9.png",
            cc.rect(0, 0, srcSize.width, srcSize.height),
            cc.rect(srcSize.width * 0.3, srcSize.height * 0.3, srcSize.width * 0.4, srcSize.height * 0.4));

        //
        var mainSize = cc.size(450 * Defines.BASE_SCALE, 500 * Defines.BASE_SCALE);

        //
        this.m_MainUI.setContentSize(mainSize);
        this.getWindow().addChild(this.m_MainUI);
        this.m_MainUI.setPosition(_ScreenCenter());

        //
        var settingLabel = cc.Sprite.createWithSpriteFrameName("option_label_main.png");
        this.m_MainUI.addChild(settingLabel);
        settingLabel.setPosition(cc.p(mainSize.width * 0.5, mainSize.height - 37 * Defines.BASE_SCALE));

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(mainSize.width - 20 * Defines.BASE_SCALE, mainSize.height - 20 * Defines.BASE_SCALE));

        //音效
        var buttonSound = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_sound_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_sound_sel.png"),
            this._btnSoundCallback, this);
        buttonSound.setPosition(cc.p(mainSize.width * 0.16, mainSize.height * 0.8));

        this.m_SpriteSoundDisabled = cc.Sprite.createWithSpriteFrameName("general_disabled.png");
        buttonSound.addChild(this.m_SpriteSoundDisabled);
        var voiceButtonSize = buttonSound.getContentSize();
        this.m_SpriteSoundDisabled.setPosition(
            cc.p(voiceButtonSize.width * 0.5, voiceButtonSize.height * 0.5));
        this.m_SpriteSoundDisabled.setVisible(false);

        //音乐
        var buttonMusic = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_music_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_music_sel.png"),
            this._btnMusicCallback, this);
        buttonMusic.setPosition(cc.p(mainSize.width * 0.38, mainSize.height * 0.8));

        this.m_SpriteMusicDisabled = cc.Sprite.createWithSpriteFrameName("general_disabled.png");
        buttonMusic.addChild(this.m_SpriteMusicDisabled);
        var musicButtonSize = buttonMusic.getContentSize();
        this.m_SpriteMusicDisabled.setPosition(
            cc.p(musicButtonSize.width * 0.5, musicButtonSize.height * 0.5));
        this.m_SpriteMusicDisabled.setVisible(false);

        //通知
        var notifyPanel = cc.Sprite.createWithSpriteFrameName("general_label_panel_0.png");
        this.m_MainUI.addChild(notifyPanel);
        notifyPanel.setPosition(cc.p(mainSize.width * 0.73, mainSize.height * 0.8));

        var notifyLabel = cc.Sprite.createWithSpriteFrameName("general_label_notify.png");
        notifyPanel.addChild(notifyLabel);
        var notifyBg = notifyPanel.getContentSize();
        notifyLabel.setScale(0.8);
        notifyLabel.setPosition(cc.p(notifyBg.width * 0.36, notifyBg.height * 0.5 - 2 * Defines.BASE_SCALE));

        var buttonNotification = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_notify_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_notify_sel.png"),
            this._btnNotificationCallback, this);
        buttonNotification.setPosition(cc.p(mainSize.width * 0.84, mainSize.height * 0.8));

        this.m_SpriteNotifDisabled = cc.Sprite.createWithSpriteFrameName("general_disabled.png");
        buttonNotification.addChild(this.m_SpriteNotifDisabled);
        var notificationButtonSize = buttonNotification.getContentSize();
        this.m_SpriteNotifDisabled.setPosition(
            cc.p(notificationButtonSize.width * 0.5, notificationButtonSize.height * 0.5 + 3 * Defines.BASE_SCALE));
        this.m_SpriteNotifDisabled.setVisible(false);


        this.btn_check = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("option_check_nor.png"),
            cc.Sprite.createWithSpriteFrameName("option_check_sel.png"),
            this._btnCheckCallback,this);
        this.btn_check.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.65));

        var accountLabel = cc.LabelTTF.create("카카오 회원 번호", Defines.DefaultFont, 22 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(accountLabel);
        accountLabel.setAnchorPoint(cc.p(0, 0.5));
        accountLabel.setPosition(cc.p(mainSize.width * 0.05, mainSize.height * 0.55));

        var accountInfo = cc.LabelTTF.create(this.getAccountInfo(), Defines.DefaultFont, 22 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(accountInfo);

        accountInfo.setPosition(cc.p(mainSize.width * 0.7, mainSize.height * 0.55));

        //关于
        var buttonAbout = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("option_about_nor.png"),
            cc.Sprite.createWithSpriteFrameName("option_about_sel.png"),
            this._btnAboutCallback, this);
        //GUI.addLabelToButton(buttonAbout, "about", 32);
        buttonAbout.setPosition(cc.p(mainSize.width * 0.2, mainSize.height * 0.4));

        var buttonForum = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("option_forum_nor.png"),
            cc.Sprite.createWithSpriteFrameName("option_forum_sel.png"),
            this._btnForumCallback, this);
        //GUI.addLabelToButton(buttonForum, "forum", 32);
        buttonForum.setPosition(cc.p(mainSize.width * 0.66, mainSize.height * 0.4));

        if (!cc.DataMng.getInstance().isCDKeyEnabled())
        {
            buttonForum.setVisible(false);
        }                                                 
                                                 
        this._inputButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("option_code_nor.png"),
            cc.Sprite.createWithSpriteFrameName("option_code_sel.png"),
            this._btnCodeCallback, this);
        //GUI.addLabelToButton(buttonCode, "code", 32);
        this._inputButton.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.25));
        this._inputButton.setVisible(false);

        //登出
        var buttonLogOut = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("option_logout_nor.png"),
            cc.Sprite.createWithSpriteFrameName("option_logout_sel.png"),
            this._btnLogOutCallback, this);
        //GUI.addLabelToButton(buttonLogOut, "LogOut", 32);
        buttonLogOut.setPosition(cc.p(mainSize.width * 0.27, mainSize.height * 0.1));

        //退出
        var buttonQuitGame = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("option_quit_nor.png"),
            cc.Sprite.createWithSpriteFrameName("option_quit_sel.png"),
            this._btnQuitGameCallback, this);
        //GUI.addLabelToButton(buttonQuitGame, "QuitGame", 32);
        buttonQuitGame.setPosition(cc.p(mainSize.width * 0.73, mainSize.height * 0.1));

        //
        this.m_Menu = cc.Menu.create(buttonClose, buttonSound, buttonMusic, buttonNotification,
            buttonAbout, buttonForum, this._inputButton, buttonLogOut, buttonQuitGame, this.btn_check);
        this.m_MainUI.addChild(this.m_Menu);
        this.m_Menu.setPosition(cc.p(0, 0));

        return this;
    },

    getAccountInfo: function()
    {
        if(cc.NodeSelf.getInstance().isLogin())
        {
            return cc.NodeSelf.getInstance().getUserID("kakao");
        }
        else
        {
            return "not login";
        }
    },
    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback: function ()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        this.closeWindow();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnSoundCallback: function ()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        if (cc.AudioMng.getInstance().canPlayEffect())
        {
            cc.AudioMng.getInstance().pauseAllEffects();
            this.m_SpriteSoundDisabled.setVisible(true);
        }
        else
        {
            cc.AudioMng.getInstance().resumeAllEffects();
            this.m_SpriteSoundDisabled.setVisible(false);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnMusicCallback: function ()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        if (cc.AudioMng.getInstance().canPlayMusic())
        {
            cc.AudioMng.getInstance().pauseMusic();
            this.m_SpriteMusicDisabled.setVisible(true);
        }
        else
        {
            cc.AudioMng.getInstance().resumeMusic();
            cc.AudioMng.getInstance().playMainMenuMusic();
            this.m_SpriteMusicDisabled.setVisible(false);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnNotificationCallback: function ()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        var canPush = cc.DataMng.getInstance().canPush();
        this.m_SpriteNotifDisabled.setVisible(canPush);

        cc.DataMng.getInstance().setCanPush(!canPush);

        if(canPush)
        {
            cancelPush();
        }

        return this;
    },


    //------------------------------------------------------------------------------------------------------------------
    _btnCheckCallback: function()
    {

        cc.AudioMng.getInstance().playButtonSound(true);
        KakaoJoyInterface.getInstance().showMessageBlockDialog();
//        this.check_sel_flag = !this.check_sel_flag;
//        cc.DataMng.getInstance().changeOptionCheckSel(this.check_sel_flag);
//        this.btn_check_nor.setVisible(!this.check_sel_flag);
//        this.btn_check_sel.setVisible(this.check_sel_flag);
    },

    _btnAboutCallback: function ()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        this.closeWindow();
        cc.GUIAboutUs.getInstance().openWindow(this.getWindow().getParent());
        return this;
    },

    _btnForumCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        if(!Defines.PLATFORM.isBrowser() && Defines.PLATFORM.isMobile())
        {
            wrapperConfig.Config.getInstance().openURL(Defines.FORUM_URL);
        }
//        cc.GUIShowForum.getInstance().openWindow(this.getWindow().getParent());

        //this.closeWindow();
    },

    _btnCodeCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

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
    _btnLogOutCallback: function ()
    {

        cc.AudioMng.getInstance().playButtonSound(true);

        this.closeWindow();
        if(cc.NodeSelf.getInstance().isLogin())
        {
            joyCommon.getInstance().logout(function()
                {
                    cc.log("退出登录成功");

                    cc.DataMng.getInstance().setAutoLoginFlag(false);
                    if (!(cc.Director.getInstance().getRunningScene() instanceof Scene_MainMenu))
                    {
                        cc.Director.getInstance().replaceScene(Scene_MainMenu.create(false, true));
                    }

                },
                function()
                {
                    //
                    cc.log("退出登录失败");
                });
        }

        return this;
    },

    _btnQuitGameCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        cc.GUIMap.getInstance().setZonesEnabled(false);

        cc.DataMng.getInstance().setAutoLoginFlag(false);

        cc.GUIMsgBox.getInstance().openWindow(
            this.getWindow().getParent(),
            new MsgBox_QuitGame()
        );

        this.closeWindow();
        return this;
    },
    notifiedUpdate: function(/*subject*/)
    {
        if (!this.isWindowOpen())
        {
            return this;
        }

        //
        var isCDKeyEnabled = cc.DataMng.getInstance().isCDKeyEnabled();
        cc.log("isCDKeyEnabled =" + isCDKeyEnabled);
        this._inputButton.setVisible(isCDKeyEnabled);

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    updateUIContent: function()
    {

        //
        if (cc.AudioMng.getInstance().canPlayEffect())
        {
            this.m_SpriteSoundDisabled.setVisible(false);
        }
        else
        {
            this.m_SpriteSoundDisabled.setVisible(true);
        }

        //
        if (cc.AudioMng.getInstance().canPlayMusic())
        {
            this.m_SpriteMusicDisabled.setVisible(false);
        }
        else
        {
            this.m_SpriteMusicDisabled.setVisible(true);
        }

        //
        var canPush = cc.DataMng.getInstance().canPush();
        this.m_SpriteNotifDisabled.setVisible(!canPush);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);

        //
        cc.AudioMng.getInstance().playOpenWindow();

        //
        cc.ResourceMng.getInstance().addToCache(
            Resource._GUIPopupOption_plist,
            Resource._GUIPopupOption_png);

        this.setContent();
        this.updateUIContent();
        this.notifiedUpdate();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        cc.AudioMng.getInstance().playCloseWindow();

        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUIPopupOption_plist,
            Resource._GUIPopupOption_png);

        this.getWindow().removeAllChildren(true);

        return this;
    }
    //------------------------------------------------------------------------------------------------------------------
});


cc.GUIPopupOption_ko._instance = null;
cc.GUIPopupOption_ko.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIPopupOption_ko();
        this._instance.init();
    }

    return this._instance;
};



