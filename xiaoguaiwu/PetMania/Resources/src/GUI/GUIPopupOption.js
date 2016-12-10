
cc.GUIPopupOption = cc.GUIPopupWindow.extend ({

    description: function()
    {
        return "GUIPopupOption";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //
        this.m_MainUI = null;

        //
        this.m_Menu = null;
        this.m_ButtonModeSmooth = null;
        this.m_ButtonModeAdvanced = null;
        this.m_ButtonAccount = null;
        this.m_ButtonBackToMain = null;

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
        var mainSize = cc.size(450 * Defines.BASE_SCALE, 400 * Defines.BASE_SCALE);

        //
        this.m_MainUI.setContentSize(mainSize);
        this.getWindow().addChild(this.m_MainUI);
        this.m_MainUI.setPosition(_ScreenCenter());

        //
        var settingLabel = cc.Sprite.createWithSpriteFrameName("general_label_option.png");
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
        buttonSound.setPosition(cc.p(mainSize.width * 0.16, mainSize.height * 0.75));

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
        buttonMusic.setPosition(cc.p(mainSize.width * 0.38, mainSize.height * 0.75));

        this.m_SpriteMusicDisabled = cc.Sprite.createWithSpriteFrameName("general_disabled.png");
        buttonMusic.addChild(this.m_SpriteMusicDisabled);
        var musicButtonSize = buttonMusic.getContentSize();
        this.m_SpriteMusicDisabled.setPosition(
            cc.p(musicButtonSize.width * 0.5, musicButtonSize.height * 0.5));
        this.m_SpriteMusicDisabled.setVisible(false);

        //通知
        var notifyPanel = cc.Sprite.createWithSpriteFrameName("general_label_panel_0.png");
        this.m_MainUI.addChild(notifyPanel);
        notifyPanel.setPosition(cc.p(mainSize.width * 0.73, mainSize.height * 0.75));

        var notifyLabel = cc.Sprite.createWithSpriteFrameName("general_label_notify.png");
        notifyPanel.addChild(notifyLabel);
        var notifyBg = notifyPanel.getContentSize();
        notifyLabel.setScale(0.8);
        notifyLabel.setPosition(cc.p(notifyBg.width * 0.36, notifyBg.height * 0.5 - 2 * Defines.BASE_SCALE));

        var buttonNotification = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_notify_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_notify_sel.png"),
            this._btnNotificationCallback, this);
        buttonNotification.setPosition(cc.p(mainSize.width * 0.84, mainSize.height * 0.75));

        this.m_SpriteNotifDisabled = cc.Sprite.createWithSpriteFrameName("general_disabled.png");
        buttonNotification.addChild(this.m_SpriteNotifDisabled);
        var notificationButtonSize = buttonNotification.getContentSize();
        this.m_SpriteNotifDisabled.setPosition(
            cc.p(notificationButtonSize.width * 0.5, notificationButtonSize.height * 0.5 + 3 * Defines.BASE_SCALE));
        this.m_SpriteNotifDisabled.setVisible(false);

        //运行模式
        this.m_ButtonModeSmooth = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_smooth_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_smooth_sel.png"),
            this._btnModeSmoothCallback, this);
        this.m_ButtonModeSmooth.setPosition(cc.p(mainSize.width * 0.27, mainSize.height * 0.55));

        this.m_ButtonModeAdvanced = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_advanced_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_advanced_sel.png"),
            this._btnModeAdvancedCallback, this);
        this.m_ButtonModeAdvanced.setPosition(cc.p(mainSize.width * 0.27, mainSize.height * 0.55));

        //动画
        var buttonPlayStory = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_story_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_story_sel.png"),
            this._btnPlayStoryCallback, this);
        buttonPlayStory.setPosition(cc.p(mainSize.width * 0.73, mainSize.height * 0.55));

        //向导
        var buttonGuide = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_guide_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_guide_sel.png"),
            this._btnGuideCallback, this);
        buttonGuide.setPosition(cc.p(mainSize.width * 0.27, mainSize.height * 0.35));

        //关于
        var buttonAbout = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_about_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_about_sel.png"),
            this._btnAboutCallback, this);
        buttonAbout.setPosition(cc.p(mainSize.width * 0.73, mainSize.height * 0.35));

        //账号
        this.m_ButtonAccount = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_change_account_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_change_account_sel.png"),
            this._btnChangeAccountCallback, this);
        this.m_ButtonAccount.setPosition(cc.p(mainSize.width * 0.27, mainSize.height * 0.15));

        //
        this.m_ButtonBackToMain = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_back_main_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_back_main_sel.png"),
            this._btnBackToMainMenuCallback, this);
        this.m_ButtonBackToMain.setPosition(cc.p(mainSize.width * 0.73, mainSize.height * 0.15));

        //
        this.m_Menu = cc.Menu.create(buttonClose, buttonSound, buttonMusic, buttonNotification,
            buttonPlayStory, buttonGuide, buttonAbout, this.m_ButtonAccount, this.m_ButtonBackToMain,
            this.m_ButtonModeSmooth, this.m_ButtonModeAdvanced);
        this.m_MainUI.addChild(this.m_Menu);
        this.m_Menu.setPosition(cc.p(0, 0));

        //
        if (isTelcomOperators())
        {
            buttonSound.setPositionY(mainSize.height * 0.7);
            buttonMusic.setPositionY(mainSize.height * 0.7);

            notifyPanel.setVisible(false);
            buttonNotification.setVisible(false);
            buttonPlayStory.setVisible(false);

            this.m_ButtonModeAdvanced.setPosition(cc.p(mainSize.width * 0.73, mainSize.height * 0.7));
            this.m_ButtonModeSmooth.setPosition(cc.p(mainSize.width * 0.73, mainSize.height * 0.7));

            buttonGuide.setPositionY(mainSize.height * 0.45);
            buttonAbout.setPositionY(mainSize.height * 0.45);

            this.m_ButtonAccount.setVisible(false);
            this.m_ButtonBackToMain.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.2));
        }
        else if (Defines.IS_SMALL)
        {
            buttonPlayStory.setVisible(false);
            this.m_ButtonModeAdvanced.setPositionX(mainSize.width * 0.5);
            this.m_ButtonModeSmooth.setPositionX(mainSize.width * 0.5);
        }
        else if (isXiaoMi909())
        {
            this.m_ButtonBackToMain.setPositionX(mainSize.width * 0.5);
            this.m_ButtonAccount.setVisible(false);
        }

        return this;
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
    _btnModeSmoothCallback: function ()
    {
        Defines.LOW_PERFORMANCE = true;
        this.updateUIContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnModeAdvancedCallback: function ()
    {
        Defines.LOW_PERFORMANCE = false;
        this.updateUIContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnPlayStoryCallback: function ()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        this.closeWindow();

        //
        if (Scene_Story.canChangeTo())
        {
            Scene_Story.changeTo();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnGuideCallback: function ()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        this.closeWindow();
        cc.GUITeachAndHelp.getInstance().openWindow(this.getWindow().getParent());
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnAboutCallback: function ()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        this.closeWindow();
        cc.GUIAboutUs.getInstance().openWindow(this.getWindow().getParent());
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnChangeAccountCallback: function ()
    {
        cc.AudioMng.getInstance().playButtonSound(true);


        if (cc.NodeSelf.getInstance().isLogin())
        {
            this.closeWindow();
            MsgBox_ServerSync.openWindow(this.getWindow().getParent());
        }
        else
        {
            //
            cc.GUIMsgView.getInstance().openWindow(
                cc.Director.getInstance().getRunningScene(),
                Resource.ChineseTxt[201]);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnBackToMainMenuCallback: function ()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        this.closeWindow();

        if (!(cc.Director.getInstance().getRunningScene() instanceof Scene_MainMenu))
        {
            cc.Director.getInstance().replaceScene(Scene_MainMenu.create(false, true));
        }


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

        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        if (cc.Director.getInstance().getRunningScene() instanceof Scene_MainMenu)
        {
            this.m_ButtonBackToMain.setVisible(false);
            this.m_ButtonAccount.setPositionX(mainSize.width * 0.5);
        }

        //运行模式
        var isSmoothMode = Defines.LOW_PERFORMANCE;
        this.m_ButtonModeAdvanced.setVisible(isSmoothMode);
        this.m_ButtonModeSmooth.setVisible(!isSmoothMode);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);

        //
        cc.AudioMng.getInstance().playOpenWindow();

        //
        this.setContent();
        this.updateUIContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        cc.AudioMng.getInstance().playCloseWindow();

        //
        this.getWindow().removeAllChildren(true);

        return this;
    }
    //------------------------------------------------------------------------------------------------------------------
});


cc.GUIPopupOption._instance = null;
cc.GUIPopupOption.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIPopupOption();
        this._instance.init();
    }

    return this._instance;
};