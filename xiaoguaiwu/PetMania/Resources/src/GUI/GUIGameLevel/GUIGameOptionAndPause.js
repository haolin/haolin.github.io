
cc.GUIGameOptionAndPause = cc.GUIWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "GUIGameOptionAndPause";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        this.m_TopMainUI = null;
        this.m_BottomMainUI = null;

        this.m_Menu = null;
        this.m_SpriteSoundDisabled = null;
        this.m_SpriteMusicDisabled = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._super();

        //
        var self = this;
        this.getWindow().setTouchMode(cc.TOUCH_ONE_BY_ONE);
        this.getWindow().onTouchBegan = function(touch, event)
        {
            return self.handleTouchBegan(touch, event);
        };

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 100));
        this.getWindow().addChild(blockLayer, -1);

        //
        this.addTopMainUI();
        this.addBottomMainUI();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addTopMainUI:function()
    {
        //
        this.m_TopMainUI = cc.Sprite.createWithSpriteFrameName("game_pause_panel_0.png");
        this.getWindow().addChild(this.m_TopMainUI);
        this.m_TopMainUI.setAnchorPoint(cc.p(0, 1));
        this.m_TopMainUI.setPosition(23 * Defines.BASE_SCALE, _ScreenHeight() * 0.75);

        //
        var mainSize = this.m_TopMainUI.getContentSize();

        //
        var connectBg = cc.Sprite.createWithSpriteFrameName("game_connect_1.png");
        this.m_TopMainUI.addChild(connectBg);
        connectBg.setAnchorPoint(cc.p(1, 0.5));
        connectBg.setPosition(cc.p(0, mainSize.height * 0.6));

        //
        var height = 16 * Defines.BASE_SCALE;

        //
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
		
		if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_MINELOTTERY){ //采矿模式修改暂停界面关卡标签
			var spriteLevelLabel = cc.Sprite.createWithSpriteFrameName("wenzi-zuanshikuangchang.png");
			this.m_TopMainUI.addChild(spriteLevelLabel);
			spriteLevelLabel.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.5 + height));
			return this;
		}
		
        var spriteLevelLabel = cc.Sprite.createWithSpriteFrameName("game_label_level.png");
        this.m_TopMainUI.addChild(spriteLevelLabel);
        spriteLevelLabel.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.5 + height));

        //

        if (curLevelData && curLevelData.IS_SPACE_LEVEL)
        {
            var mapID = GUI._GetMapIDWithLevelData(curLevelData);
            var labelMap = GUI.createNumberLabel(mapID + 1, _GUIPath + "Num/num_6_22x30.png", 22, 30, "0");
            this.m_TopMainUI.addChild(labelMap);
            labelMap.setPositionY(mainSize.height * 0.5 + height);

            var labelMid = cc.Sprite.create(_GUIPath + "Num/num_6_-.png");
            this.m_TopMainUI.addChild(labelMid);
            labelMid.setPositionY(mainSize.height * 0.5 + height);

            var challengeIndex = GUI._GetCokeIndexWithSpaceLevelID(curLevelData.ID);
            var isFit = challengeIndex >= 0 && challengeIndex <= 2;
            challengeIndex = isFit ? challengeIndex : 0;

            var labelChallenge = GUI.createNumberLabel(challengeIndex + 1, _GUIPath + "Num/num_6_22x30.png", 22, 30, "0");
            this.m_TopMainUI.addChild(labelChallenge);
            labelChallenge.setPositionY(mainSize.height * 0.5 + height);

            var autoLabels = [labelMap, labelMid, labelChallenge];
            //如果第一个mapID 是2位数，就整体小一点，防止遮挡
            var isNeedScaleSmale = mapID >= 9;
            if (isNeedScaleSmale)
            {
                cc.log("如果第一个mapID 是2位数，就整体小一点，防止遮挡 mapID = " + mapID);
                autoLabels.forEach(
                    function(a_label)
                    {
                        a_label.setScale(0.8);
                    }
                )
            }

            //
            if (Defines.IS_EN || Defines.IS_KO)
            {
                autoLabels.unshift(spriteLevelLabel);
            }

            GUI.autoLayoutX(autoLabels, mainSize.width, 0);
        }
        else if (curLevelData)
        {
            var labelLevel = GUI.createNumberLabel(curLevelData.ID + 1, _GUIPath + "Num/num_6_22x30.png", 22, 30, "0");
            this.m_TopMainUI.addChild(labelLevel);
            labelLevel.setAnchorPoint(cc.p(0.5, 0.5));
            labelLevel.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.5 + height/*16*/));

            if (Defines.IS_EN || Defines.IS_KO)
            {
                GUI.autoLayoutX([spriteLevelLabel, labelLevel], mainSize.width, 0);
            }
        }

        return this;
    },


    //------------------------------------------------------------------------------------------------------------------
    addBottomMainUI:function()
    {
        //
        this.m_BottomMainUI = cc.Sprite.createWithSpriteFrameName("game_pause_panel_1.png");
        this.getWindow().addChild(this.m_BottomMainUI);
        this.m_BottomMainUI.setAnchorPoint(cc.p(0,1));
        this.m_BottomMainUI.setPosition(cc.p(23 * Defines.BASE_SCALE,
            _ScreenHeight() - this.m_TopMainUI.getContentSize().height - 35 * Defines.BASE_SCALE));

        //
        var mainSize = this.m_BottomMainUI.getContentSize();

        //
        var connectBg = cc.Sprite.createWithSpriteFrameName("game_connect_0.png");
        this.m_BottomMainUI.addChild(connectBg);
        connectBg.setAnchorPoint(cc.p(1, 0.5));
        connectBg.setPosition(cc.p(0, mainSize.height * 0.55));

        //
        this.m_Menu = cc.Menu.create();
        this.m_BottomMainUI.addChild(this.m_Menu);
        this.m_Menu.setPosition(cc.p(0, 0));

        //播放
        var playButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("game_btn_back_game_nor.png"),
            cc.Sprite.createWithSpriteFrameName("game_btn_back_game_sel.png"),
            this._btnGameContinueCallback, this);
        playButton.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.73));
        this.m_Menu.addChild(playButton);

        //返回主菜单
        var backMenuButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("game_btn_quit_game_nor.png"),
            cc.Sprite.createWithSpriteFrameName("game_btn_quit_game_sel.png"),
            this._btnToGiveUpCallback, this);
        backMenuButton.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.43));
        this.m_Menu.addChild(backMenuButton);

        //音效
        var voiceButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_sound_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_sound_sel.png"),
            this._btnSoundCallback, this);
        voiceButton.setAnchorPoint(cc.p(0, 0));
        voiceButton.setPosition(cc.p(20 * Defines.BASE_SCALE, 10 * Defines.BASE_SCALE));
        this.m_Menu.addChild(voiceButton);

        this.m_SpriteSoundDisabled = cc.Sprite.createWithSpriteFrameName("general_disabled.png");
        voiceButton.addChild(this.m_SpriteSoundDisabled);
        var voiceButtonSize = voiceButton.getContentSize();
        this.m_SpriteSoundDisabled.setPosition(
            cc.p(voiceButtonSize.width * 0.5, voiceButtonSize.height * 0.5));
        this.m_SpriteSoundDisabled.setVisible(false);

        //音乐
        var musicButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_music_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_music_sel.png"),
            this._btnMusicCallback, this);
        musicButton.setAnchorPoint(cc.p(1, 0));
        musicButton.setPosition(cc.p(mainSize.width - 20 * Defines.BASE_SCALE, 10 * Defines.BASE_SCALE));
        this.m_Menu.addChild(musicButton);

        this.m_SpriteMusicDisabled = cc.Sprite.createWithSpriteFrameName("general_disabled.png");
        musicButton.addChild(this.m_SpriteMusicDisabled);
        var musicButtonSize = voiceButton.getContentSize();
        this.m_SpriteMusicDisabled.setPosition(
            cc.p(musicButtonSize.width * 0.5, musicButtonSize.height * 0.5));
        this.m_SpriteMusicDisabled.setVisible(false);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleTouchBegan: function(touch/*, event*/)
    {
        var location = touch.getLocation();

        var topBoundBox = this.m_TopMainUI.getBoundingBox();
        if (cc.rectContainsPoint(topBoundBox, location))
        {
            return this;
        }

        var bottomBoundBox = this.m_BottomMainUI.getBoundingBox();
        if (cc.rectContainsPoint(bottomBoundBox, location))
        {
            return this;
        }

        this.playLeaveAction(function()
        {
            this.closeWindow();
            cc.GUIGameLevel.getInstance().playEnterAction();
        });

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnGameContinueCallback:function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
		cc.Guide.buy_GoldenKey = 0;
		
        //
        this.playLeaveAction(function()
        {
            this.closeWindow();
            cc.GUIGameLevel.getInstance().playEnterAction();
        });

        //
        if (cc.GUIGameGiveUp.getInstance().isWindowOpen())
        {
            cc.GUIGameGiveUp.getInstance().playLeaveAction(function()
            {
                cc.GUIGameGiveUp.getInstance().closeWindow();
            });
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnToGiveUpCallback:function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        if (curLevelData.MODEL ==  Defines.TARGET_MODEL.MODEL_MINELOTTERY){
            this.mineGameEndUpCallback(curLevelData);
			return this;
        }

        if (!cc.GUIGameGiveUp.getInstance().isWindowOpen())
        {
            cc.GUIGameGiveUp.getInstance().openWindow(_GUILayer());
        }

        return this;
    },

    mineGameEndUpCallback: function(curLevelData)
    {
        var mineDesLine = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterDiamond");
		var mineDesLine_nor = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterMine");
		mineDesLine = (mineDesLine + mineDesLine_nor) || 0;
        cc.DataMng.getInstance().setCurLevelDiamondBonus(mineDesLine);
        cc.DataMng.getInstance().addMoney(mineDesLine, MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_GAME_WIN);//游戏胜利
        cc.DataMng.getInstance().closeNotifyGUIObservers(NOTIFY_EVENT.FOR_MONEY);

        BIMng.getBIDiamond().logDiamondIncome_LevelWin(this.m_DiamondBonus);
        cc.GUIGameLevelEndWin.getInstance().setLevelData(curLevelData);
        this.playLeaveAction(
            function()
            {
                this.closeWindow();
                Scene_MainMap.changeTo(cc.GUIGameLevelEndWin.getInstance());
            }
        );

//            cc.GUIGameLevelEndWin.getInstance().openWindow(_GUILayer());
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

        //
        if (cc.AudioMng.getInstance().canPlayMusic())
        {
            cc.AudioMng.getInstance().pauseMusic();
            this.m_SpriteMusicDisabled.setVisible(true);
        }
        else
        {
            cc.AudioMng.getInstance().resumeMusic();
            var curLevelData = cc.DataMng.getInstance().getCurLevelData();
            cc.AudioMng.getInstance().playGameLevelMusic(GUI._GetMapIDWithLevelData(curLevelData));
            this.m_SpriteMusicDisabled.setVisible(false);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateUIContent: function()
    {
        var canPlayEffect = cc.AudioMng.getInstance().canPlayEffect();
        this.m_SpriteSoundDisabled.setVisible(!canPlayEffect);

        var canPlayMusic = cc.AudioMng.getInstance().canPlayMusic();
        this.m_SpriteMusicDisabled.setVisible(!canPlayMusic);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playEnterAction: function()
    {
        var topMainUISize = this.m_TopMainUI.getContentSize();
        var topMainUIToPosition = cc.p(23 * Defines.BASE_SCALE, _ScreenHeight() * 0.75 + topMainUISize.height * 0.5);
        var topMainUIFromPosition = cc.p(-topMainUISize.width, _ScreenHeight() - 15 * Defines.BASE_SCALE);
        this.m_TopMainUI.setPosition(topMainUIFromPosition);
        this.m_TopMainUI.stopAllActions();
        this.m_TopMainUI.runAction(cc.EaseElasticOut.create(cc.MoveTo.create(Defines.FPS * 30, topMainUIToPosition), 0.6));

        var bottomMainUISize = this.m_BottomMainUI.getContentSize();
        var bottomMainUIToPosition = cc.p(23 * Defines.BASE_SCALE, _ScreenHeight() * 0.35 + bottomMainUISize.height * 0.5);
        var bottomMainUIFromPosition = cc.p(-bottomMainUISize.width, _ScreenHeight() - topMainUISize.height - 35 * Defines.BASE_SCALE);
        this.m_BottomMainUI.setPosition(bottomMainUIFromPosition);
        this.m_BottomMainUI.stopAllActions();
        this.m_BottomMainUI.runAction(cc.EaseElasticOut.create(cc.MoveTo.create(Defines.FPS * 30, bottomMainUIToPosition), 0.6));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playLeaveAction: function(event)
    {
        //运行离开动画就不允许再接受点击了
        this.m_Menu.getChildren().forEach(
            function(each)
            {
                each.setEnabled(false);
            }
        );

        this.getWindow().setTouchEnabled(false);

        //
        var topMainUISize = this.m_TopMainUI.getContentSize();
        var topMainUIToPosition = cc.p(-topMainUISize.width - 100, 0);
        this.m_TopMainUI.stopAllActions();
        this.m_TopMainUI.runAction(cc.MoveBy.create(Defines.FPS * 10, topMainUIToPosition));

        var bottomMainUISize = this.m_BottomMainUI.getContentSize();
        var bottomMainUIToPosition = cc.p(-bottomMainUISize.width - 100, 0);
        this.m_BottomMainUI.stopAllActions();
        this.m_BottomMainUI.runAction(cc.Sequence.create(
            cc.MoveBy.create(Defines.FPS * 10, bottomMainUIToPosition),
            cc.CallFunc.create(event, this)));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyOpenWindow: function(window)
    {
        if (window instanceof cc.GUIGameGiveUp)
        {
            this.getWindow().setTouchEnabled(false);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyCloseWindow: function(window)
    {
        if (window instanceof cc.GUIGameGiveUp)
        {
            this.getWindow().setTouchEnabled(true);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);

//        if (cc.GUIBuyDiamond.getInstance().isWindowOpen()){
//            cc.GUIBuyDiamond.getInstance().closeWindow();
//        }
		
		if (cc.GUISimpleShop.getInstance().isWindowOpen()){
            cc.GUISimpleShop.getInstance().closeWindow();
        }
		
		
        //
        cc.AudioMng.getInstance().playOpenWindow();

        //
        var curState = _GetCurGameLevelState();
        if (curState instanceof cc.State_GameLevel)
        {
            cc.State_GameLevel.getInstance().pause();
        }

        //
        this.getWindow().setTouchEnabled(true);

        //
        this.addContent();
        this.updateUIContent();

        this.playEnterAction();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        cc.AudioMng.getInstance().playCloseWindow();

        //
        var curState = _GetCurGameLevelState();
        if (curState instanceof cc.State_GameLevel)
        {
            cc.State_GameLevel.getInstance().resume();
        }

        //
        this.getWindow().removeAllChildren(true);
        this.getWindow().setTouchEnabled(false);
        return this;
    }
    //------------------------------------------------------------------------------------------------------------------
});


cc.GUIGameOptionAndPause._instance = null;
cc.GUIGameOptionAndPause.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIGameOptionAndPause();
        this._instance.init();
    }

    return this._instance;
};