

cc.GUIGameLevelEndFail = cc.GUIWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUIGameLevelEndFail";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        //
        this.m_RestartButton = null;
        this.m_ButtonBack = null;

        //
        this.m_LevelData = null;

        //
        this.m_FailTips = [];
    },

    //--------------------------------------------------------------------------------------------------------------------
    init:function()
    {
        this._super();
        return this;
    },

    //--------------------------------------------------------------------------------------------------------------------
    registerFailTips: function(failTip)
    {
        this.m_FailTips.push(failTip);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setContent: function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 100));
        this.getWindow().addChild(blockLayer);

        //
        var tempMain = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png");
        var srcSize = tempMain.getContentSize();

        //
        this.m_MainUI = cc.Scale9Sprite.create(
            _GUIPath + "GUINewGeneral/general_back9.png",
            cc.rect(0, 0, srcSize.width, srcSize.height),
            cc.rect(srcSize.width * 0.3, srcSize.height * 0.3, srcSize.width * 0.4, srcSize.height * 0.4));

        //
        var mainSize = cc.size(500 * Defines.BASE_SCALE, 225 * Defines.BASE_SCALE);

        //
        var friendWidth = isTelcomOperators() ? 0 : 100 * Defines.BASE_SCALE;
        var posX = (_ScreenWidth() - friendWidth) * 0.5;

        //
        this.m_MainUI.setContentSize(mainSize);
        this.getWindow().addChild(this.m_MainUI);
        this.m_MainUI.setPosition(cc.p(posX, _ScreenHeight() * 0.5 + 70 * Defines.BASE_SCALE));

        //
        var titleBg = cc.Sprite.createWithSpriteFrameName("general_level_title_bg.png");
        this.m_MainUI.addChild(titleBg);
        titleBg.setPosition(mainSize.width * 0.5, mainSize.height - 5 * Defines.BASE_SCALE);

        //
        var titleBgSize = titleBg.getContentSize();

        //
        var spriteLevelLabel = cc.Sprite.createWithSpriteFrameName("start_end_label_level.png");
        titleBg.addChild(spriteLevelLabel);
        spriteLevelLabel.setPosition(cc.p(titleBgSize.width * 0.5, titleBgSize.height * 0.5));

        //
        if (this.m_LevelData && this.m_LevelData.IS_SPACE_LEVEL)
        {
            var mapID = GUI._GetMapIDWithLevelData(this.m_LevelData);
            var labelMap = GUI.createNumberLabel(mapID + 1, _GUIPath + "Num/num_6_22x30.png", 22, 30, "0");
            titleBg.addChild(labelMap);
            labelMap.setPositionY(titleBgSize.height * 0.55);

            var labelMid = cc.Sprite.create(_GUIPath + "Num/num_6_-.png");
            titleBg.addChild(labelMid);
            labelMid.setPositionY(titleBgSize.height * 0.55);

            var challengeIndex = GUI._GetCokeIndexWithSpaceLevelID(this.m_LevelData.ID);
            var isFit = challengeIndex >= 0 && challengeIndex <= 2;
            challengeIndex = isFit ? challengeIndex : 0;

            var labelChallenge = GUI.createNumberLabel(challengeIndex + 1, _GUIPath + "Num/num_6_22x30.png", 22, 30, "0");
            titleBg.addChild(labelChallenge);
            labelChallenge.setPositionY(titleBgSize.height * 0.55);

            var autoLabels = [labelMap, labelMid, labelChallenge];
            if(Defines.IS_KO){
                labelMap.setPosition(titleBgSize.width * 0.215, titleBgSize.height * 0.43);
                labelMap.setScale(0.5);
                labelMid.setPositionX(titleBgSize.width * 0.33);
                labelMid.setScale(0.5);
                labelChallenge.setPosition(titleBgSize.width * 0.36, titleBgSize.height * 0.43);
                labelChallenge.setScale(0.5);
            }
            if (Defines.IS_EN)
            {
                autoLabels.unshift(spriteLevelLabel);
                spriteLevelLabel.setPositionY(titleBgSize.height * 0.55);
            }

            GUI.autoLayoutX(autoLabels, titleBgSize.width, 0);
        }
        else if (this.m_LevelData)
        {
            var labelLevel = GUI.createNumberLabel(this.m_LevelData.ID + 1, _GUIPath + "Num/num_6_22x30.png", 22, 30, "0");
            titleBg.addChild(labelLevel);
            labelLevel.setAnchorPoint(cc.p(0.5, 0.5));
            labelLevel.setPosition(cc.p(titleBgSize.width * 0.5, titleBgSize.height * 0.55));
            if(Defines.IS_KO){
                labelLevel.setPositionX(titleBgSize.width * 0.32);
                labelLevel.setScale(0.7);
            }
            if (Defines.IS_EN)
            {
                spriteLevelLabel.setPositionY(titleBgSize.height * 0.55);
                GUI.autoLayoutX([spriteLevelLabel, labelLevel], titleBgSize.width, 0);
            }
        }

        //
        var monster = cc.Sprite.createWithSpriteFrameName("Images_monster_1.png");
        this.m_MainUI.addChild(monster);
        monster.setPosition(mainSize.width * 0.25, mainSize.height * 0.7);
        if (Defines.IS_KO)
        {
            monster.setPosition(mainSize.width * 0.15, mainSize.height * 0.7);
        }
        //
        var failDesc = cc.Sprite.createWithSpriteFrameName("start_end_fail_desc.png");
        this.m_MainUI.addChild(failDesc);
        failDesc.setPosition(mainSize.width * 0.5, mainSize.height * 0.5);
        if (Defines.IS_EN){
            failDesc.setPosition(mainSize.width * 0.4, mainSize.height * 0.5);
        }

        var crushSugar = cc.Sprite.createWithSpriteFrameName("start_end_crush_sugar.png");
        this.m_MainUI.addChild(crushSugar);
        crushSugar.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.3));
        if (Defines.IS_EN){
            crushSugar.setPosition(cc.p(mainSize.width * 0.75, mainSize.height * 0.3));
        }
        else if (Defines.IS_KO)
        {
            crushSugar.setPosition(cc.p(mainSize.width * 0.57, mainSize.height * 0.3));
        }
        //
        this.m_RestartButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("start_end_btn_restart_nor.png"),
            cc.Sprite.createWithSpriteFrameName("start_end_btn_restart_sel.png"),
            this.handleRestart, this
        );
        this.m_RestartButton.setPosition(cc.p(posX, 80 * Defines.BASE_SCALE));

        this.m_ButtonBack = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_back_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_back_sel.png"),
            this._btnBackCallback, this
        );
        this.m_ButtonBack.setPosition(cc.p(70 * Defines.BASE_SCALE, 80 * Defines.BASE_SCALE));

        var buttonsMenu = cc.Menu.create(this.m_RestartButton, this.m_ButtonBack);
        buttonsMenu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(buttonsMenu);

        //
        var tipContent = Tools.arrayRandom(this.m_FailTips);

        if (tipContent instanceof Array)
        {
            var tipLayer = _Create_Fail_Tip(tipContent);
            tipLayer.setPosition(cc.p(-friendWidth * 0.5, 165 * Defines.BASE_SCALE));
        }
        else if (tipContent instanceof Function)
        {
            //特殊的在函数内设置位置
            tipLayer = tipContent();
        }

        if (tipLayer)
        {
            this.getWindow().addChild(tipLayer);
        }

        if(Defines.IS_KO)
        {
            tipLayer.setVisible(false);
        }

        return this;
    },
    addGameWinAD: function()
    {
        var self = this;

        var adFLag = false;

        var nowID = this.m_LevelData.ID + 1;
        if (nowID % 5 != 1){
            adFLag = true;
        }

        adFLag = Define_SysConfig.getInstance().isADEnable() && adFLag && (cc.DataMng.getInstance().isBannerADEnabled() || cc.DataMng.getInstance().isFullScreenADEnabled());
        if (adFLag){
            if (nowID % 5 == 2 || nowID % 5 == 4){
                if (cc.DataMng.getInstance().isBannerADEnabled()){
                    cc.log("showPunchBoxBanner");
                    if (Defines._NeedFitIpad()){
                        adManage.AdManage.getInstance().showPunchBoxBanner(150 * Defines.BASE_SCALE,0);
                    }
                    else {
                        adManage.AdManage.getInstance().showPunchBoxBanner(80 * Defines.BASE_SCALE,0);
                    }

                    var groupTimer = cc.GameManager.getInstance().getGameTimerAD();
                    groupTimer.add(10, function(){
                        cc.log("十秒后关闭广告条");
                        adManage.AdManage.getInstance().closePunchBoxBanner();
                        cc.GameManager.getInstance().getGameTimerGroup().remove("BannerAD");
                    }, "BannerAD");
                }
            }
            else if (nowID % 5 == 3 || nowID % 5 == 0){
                if (cc.DataMng.getInstance().isFullScreenADEnabled()){
                    cc.log("showPunchBoxPopUpAds");
                    adManage.AdManage.getInstance().showPunchBoxPopUpAds();

                    var groupTimer = cc.GameManager.getInstance().getGameTimerAD();
                    groupTimer.add(10, function(){
                        cc.log("十秒后关闭全屏广告");
                        adManage.AdManage.getInstance().closePunchBoxPopUpAds();
                        cc.GameManager.getInstance().getGameTimerGroup().remove("FullScreenAD");
                    }, "FullScreenAD");
                }
            }
        }
    },
    //------------------------------------------------------------------------------------------------------------------
    _btnBackCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        this.closeWindow();

		cc.log("cc.DataMng.getInstance().getCurrentFailedTime() = "+ cc.DataMng.getInstance().getCurrentFailedTime());
		if (cc.DataMng.getInstance().getCurrentFailedTime() > 0 && cc.DataMng.getInstance().getCurrentFailedTime() % 5 == 0){
			this.addGameWinAD();
		}
        //
        if (cc.GUIMap.getInstance().isWindowOpen())
        {
            cc.GUIMap.getInstance().handleMapEnterAction(true,null,this.description());
        }
        else if (cc.GUIFloatMap.getInstance().isWindowOpen())
        {
            cc.GUIFloatMap.getInstance().handleFloatEnterAction(true);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleRestart: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        this.closeWindow();

        //
        if (cc.GUIMap.getInstance().isWindowOpen())
        {
            cc.GUIMapMng.getInstance().autoRestart(this.m_LevelData.NAME, true);
        }
        else if (cc.GUIFloatMap.getInstance().isWindowOpen())
        {
            cc.GUIFloatMap.getInstance().activateFloatLevel(this.m_LevelData.ID, true);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setLevelData: function(levelData)
    {
        this.m_LevelData = levelData;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyLoginFinish: function()
    {
        if (!this.m_LevelData || !this.isWindowOpen())
        {
            return this;
        }

        //
        var levelID = this.m_LevelData.ID;
        var isSpace = this.m_LevelData.IS_SPACE_LEVEL;

        if (!cc.DataMng.getInstance().isGameLevelEnabled(levelID, isSpace))
        {
            cc.log("GUIGameLevelEndFail：覆盖数据后，关闭窗口");
            this._btnBackCallback();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);

        //
        cc.ResourceMng.getInstance().addToCache(
            Resource._GUIGameLevel_Start_EndWin_EndFail_plist,
            Resource._GUIGameLevel_Start_EndWin_EndFail_png);

        //
        this.setContent();
		

		if(cc.GUIFailedItemPush.getInstance().needShow() && cc.GUIFreeCandyPush.getInstance().needShow()){
			var radNum = cc.NodeSelf.getInstance()._createRandomNumber(0, 2);
			if (radNum > 1){
				cc.GUIFailedItemPush.getInstance().openWindow();
			}
			else{
				cc.GUIFreeCandyPush.getInstance().openWindow();
			}
		}
		else {
			if(cc.GUIFailedItemPush.getInstance().needShow())
			{
				cc.GUIFailedItemPush.getInstance().openWindow();
			}
			else if(cc.GUIFreeCandyPush.getInstance().needShow()){
				cc.GUIFreeCandyPush.getInstance().openWindow();
			}
		}


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        //
        cc.AudioMng.getInstance().playMainMenuMusic();

        //
        this.getWindow().removeAllChildren(true);

        //
        if(!isTelcomOperators() && cc.NodeSelf.getInstance().isLogin())
        {
            cc.GUIMyFriendsTop.getInstance().closeWindow();
        }

        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUIGameLevel_Start_EndWin_EndFail_plist,
            Resource._GUIGameLevel_Start_EndWin_EndFail_png);

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------

});

cc.GUIGameLevelEndFail._instance = null;
cc.GUIGameLevelEndFail.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIGameLevelEndFail();
        this._instance.init();

        var self = this;

        //
        FriendsMng.getInstance().registerEvent(
            _FRIENDS_MNG_EVENT.LOGIN_SUCC,
            function()
            {
                if (self._instance.isWindowOpen())
                {
                    self._instance.notifyLoginFinish();
                }
            },
            null);

        //
        if (Defines.IS_EN)
        {
            this._instance.registerFailTips(["Try to combine", "icon_item_1.png", "icon_item_2.png", ",surprise!"]);
            this._instance.registerFailTips(["Go share your score and get more mint drops!"]);
            this._instance.registerFailTips(["Go share your score and get more diamonds!"]);
            this._instance.registerFailTips(["icon_item_7.png", "makes a big change, try it!"]);
            this._instance.registerFailTips(["icon_item_8.png", "helps a lot in the end of unlock mode."]);
            this._instance.registerFailTips(["icon_item_4.png", "can change any two positions!"]);
            this._instance.registerFailTips(["icon_item_5.png", "brings extra time!"]);
            this._instance.registerFailTips(["5 in a line will create", "icon_item_3.png", "！"]);
            this._instance.registerFailTips(["Need one colour? Try", "icon_item_6.png", "！"]);
            this._instance.registerFailTips(["icon_item_3.png", "will clear all of one colour!"]);
            this._instance.registerFailTips(["Try to combine", "icon_item_1.png", "icon_item_1.png", ",surprise!"]);
            this._instance.registerFailTips(["Try to combine", "icon_item_3.png", "icon_item_1.png", ",surprise!"]);
            this._instance.registerFailTips(["Try to combine", "icon_item_3.png", "icon_item_2.png", ",surprise!"]);
            this._instance.registerFailTips(["Try to combine", "icon_item_3.png", "icon_item_3.png", ",surprise!"]);
        }
		else if (Defines.IS_KO)
        {
            this._instance.registerFailTips(["사용해 보세요", "icon_item_1.png", "icon_item_2.png", ",함께 하면 서프라이즈!"]);
            this._instance.registerFailTips(["획득 점수를 자랑하여 더 많은 민트를 획득하세요!"]);
            this._instance.registerFailTips(["획득 점수 공유하시면 더많은 보석을 획득 할수 있어요~"]);
            this._instance.registerFailTips(["icon_item_7.png", "몬스터 무작위 썩어드립니다. 사용해봐요!"]);
            this._instance.registerFailTips(["icon_item_8.png", "잠금 모드에서 최소 목표 도달시 큰 도움이 될수 있어요!"]);
            this._instance.registerFailTips(["icon_item_4.png", "특정된 두마리 몬스터의 위치를 바꿀수 있어요,어서 사용해보세요!"]);
            this._instance.registerFailTips(["icon_item_5.png", "시간 추가, 어서 사용해보세요!"]);
            this._instance.registerFailTips(["5개의 몬스터가 직선으로 연결되면 형성되요~", "icon_item_3.png", "！"]);
            this._instance.registerFailTips(["특정된 색상의 몬스터가 부족하시면? 어서 사용해보세요", "icon_item_6.png", "！"]);
            this._instance.registerFailTips(["icon_item_3.png", "스크린의 동일 칼라 몬스터를 한번에! 어서 사용해보세요!"]);
            this._instance.registerFailTips(["사용해 보세요", "icon_item_1.png", "icon_item_1.png", ",함께 하면 서프라이즈！"]);
            this._instance.registerFailTips(["사용해 보세요", "icon_item_3.png", "icon_item_1.png", ",함께 하면 서프라이즈！"]);
            this._instance.registerFailTips(["사용해 보세요", "icon_item_3.png", "icon_item_2.png", ",함께 하면 서프라이즈！"]);
            this._instance.registerFailTips(["사용해 보세요", "icon_item_3.png", "icon_item_3.png", ",함께 하면 서프라이즈！"]);
        }
        else
        {
            this._instance.registerFailTips(["试试", "icon_item_1.png", "icon_item_2.png", "一起消，会有惊喜哦！"]);
            this._instance.registerFailTips(["快去炫耀一下分数拿到更多薄荷糖吧！"]);
            this._instance.registerFailTips(["分享得分可获取更多钻石哦！"]);
            this._instance.registerFailTips(["icon_item_7.png", "能让小怪物重新洗牌，快去试试吧！"]);
            this._instance.registerFailTips(["icon_item_8.png", "在解锁模式关卡只剩很少目标时很有帮助哦！"]);
            this._instance.registerFailTips(["icon_item_4.png", "能将您指定的两只小怪物互换位置，快去试试吧！"]);
            this._instance.registerFailTips(["icon_item_5.png", "会给您带来额外时间，快去试试吧！"]);
            this._instance.registerFailTips(["5个小怪物连成一直线会形成", "icon_item_3.png", "！"]);
            this._instance.registerFailTips(["缺少特定颜色的小怪物？快用", "icon_item_6.png", "吧！"]);
            this._instance.registerFailTips(["icon_item_3.png", "能清除全屏同色怪物，快去试试吧！"]);
            this._instance.registerFailTips(["试试", "icon_item_1.png", "icon_item_1.png", "一起消，会有惊喜哦！"]);
            this._instance.registerFailTips(["试试", "icon_item_3.png", "icon_item_1.png", "一起消，会有惊喜哦！"]);
            this._instance.registerFailTips(["试试", "icon_item_3.png", "icon_item_2.png", "一起消，会有惊喜哦！"]);
            this._instance.registerFailTips(["试试", "icon_item_3.png", "icon_item_3.png", "一起消，会有惊喜哦！"]);
        }
    }

    return this._instance;
};

//======================================================================================================================
var _Create_Fail_Tip = function(contentArr)
{
    var tipContent = [];
    var tipOffset = [];

    var tipLayer = cc.Layer.create();
    tipLayer.setContentSize(cc.size(_ScreenWidth(), 68 * Defines.BASE_SCALE));

    //
    contentArr.forEach(
        function(each, index)
        {
            //
            var isPngFile = (each.slice(each.length - 3, each.length) == "png");
            var content = isPngFile ?
                cc.Sprite.createWithSpriteFrameName(each) :
                cc.LabelTTF.create(each, Defines.DefaultFont, 25 * Defines.BASE_SCALE);
            isPngFile && content.setScale(68 * Defines.BASE_SCALE / content.getContentSize().width);

            //
            tipLayer.addChild(content);
            content.setAnchorPoint(cc.p(0, 0.5));
            tipContent.push(content);
            tipOffset.push(index == 0 ? 0 : tipOffset[index - 1] + tipContent[index - 1].getBoundingBox().width);
        }
    );

    //
    var totalWidth = tipOffset[tipOffset.length - 1] + tipContent[tipContent.length - 1].getBoundingBox().width;
    var toSideWidth = (tipLayer.getContentSize().width - totalWidth)/2;

    tipContent.forEach(
        function(each, index)
        {
            each.setPosition(cc.p(toSideWidth + tipOffset[index], tipLayer.getBoundingBox().height/2));
        }
    );

    return tipLayer;
};