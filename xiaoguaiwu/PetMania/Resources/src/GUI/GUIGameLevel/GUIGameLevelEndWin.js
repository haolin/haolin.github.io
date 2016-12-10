

cc.GUIGameLevelEndWin = cc.GUIWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUIGameLevelEndWin";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        //
        this.m_MainUI = null;

        //
        this.m_SpriteDiamond = null;
        this.m_LabelAddDiamond = null;

        //
        this.m_ButtonRestart = null;
        this.m_ButtonNext = null;
        this.m_ButtonShare = null;

        //
        this.m_LevelData = null;
        this.m_DiamondAdd = 0;
		this.m_ItemAdd = [];

        //
        this.m_DiamondBatchNode = null;
        this.m_DiamondAddValue = 0;
        this.m_BonusAudioID = null;

        //
        this.m_AnimationLayer = null;

    },

    //--------------------------------------------------------------------------------------------------------------------
    init:function()
    {
        this._super();
        return this;
    },

    //--------------------------------------------------------------------------------------------------------------------
    addContent:function()
    {
        this.addContentForMainUI();
        this.addContentForRateStars();
        this.addContentForBackgroundLight();
        return this;
    },

    //-------------------------------------------------------------------------------------------------------------------
    addContentForMainUI:function()
    {
		cc.log("addContentForMainUI");
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 100));
        this.getWindow().addChild(blockLayer, -1);

        //
        var friendWidth = isTelcomOperators() ? 0 : 100 * Defines.BASE_SCALE;
        var posX = (_ScreenWidth() - friendWidth) * 0.5;

        //
        this.m_MainUI = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back11.png");
        this.getWindow().addChild(this.m_MainUI, 1);
        this.m_MainUI.setPosition(cc.p(posX, _ScreenHeight() * 0.5));

        //
        var mainSize = this.m_MainUI.getContentSize();

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

            if (Defines.IS_KO){
                labelMap.setPosition(titleBgSize.width * 0.215, titleBgSize.height * 0.43);
                labelMap.setScale(0.5);
                labelMid.setPositionX(titleBgSize.width * 0.33);
                labelMid.setScale(0.5);
                labelChallenge.setPosition(titleBgSize.width * 0.36, titleBgSize.height * 0.43);
                labelChallenge.setScale(0.5);
                autoLabels.unshift(spriteLevelLabel);
                spriteLevelLabel.setPositionY(titleBgSize.height * 0.55);
            }
            else {
                GUI.autoLayoutX(autoLabels, titleBgSize.width, 0);
            }
            if (Defines.IS_EN)
            {
                autoLabels.unshift(spriteLevelLabel);
                spriteLevelLabel.setPositionY(titleBgSize.height * 0.55);
            }
        }
        else if (this.m_LevelData)
        {
            var labelLevel = GUI.createNumberLabel(this.m_LevelData.ID + 1, _GUIPath + "Num/num_6_22x30.png", 22, 30, "0");
            titleBg.addChild(labelLevel);
            labelLevel.setAnchorPoint(cc.p(0.5, 0.5));
            labelLevel.setPosition(cc.p(titleBgSize.width * 0.5, titleBgSize.height * 0.55));
            if (Defines.IS_KO){
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
        if (this.m_LevelData)
        {
            var spriteLabelCurScore = cc.Sprite.createWithSpriteFrameName("start_end_label_score.png");
            this.m_MainUI.addChild(spriteLabelCurScore);
            spriteLabelCurScore.setAnchorPoint(cc.p(0, 0.5));

            //
            var labelCurScore = GUI.createNumberLabel(
                this.m_LevelData.CUR_SCORE.get().toString(), _GUIPath + "Num/num_7_36x46.png", 36, 46, "0");
            this.m_MainUI.addChild(labelCurScore);
            labelCurScore.setAnchorPoint(cc.p(0, 0.5));

            //
            var spriteLabelCurScoreSize = spriteLabelCurScore.getContentSize();
            var labelCurScoreSize = labelCurScore.getContentSize();
            var curScoreToSide = (mainSize.width - spriteLabelCurScoreSize.width - labelCurScoreSize.width) * 0.5;

            var curScorePosY = 125 * Defines.BASE_SCALE;
            spriteLabelCurScore.setPosition(cc.p(curScoreToSide, curScorePosY));
            labelCurScore.setPosition(cc.p(curScoreToSide + spriteLabelCurScoreSize.width, curScorePosY));
        }

        //
        if (this.m_DiamondAdd > 0)
        {
            //已经加上的值，即钻石飞到的数量值
            this.m_DiamondAddValue = 0;

            this.m_SpriteDiamond = cc.Sprite.createWithSpriteFrameName("general_diamond_1.png");
            this.m_MainUI.addChild(this.m_SpriteDiamond);

            var spriteDiamondAdd = cc.Sprite.createWithSpriteFrameName("start_end_diamond_add.png");
            this.m_MainUI.addChild(spriteDiamondAdd);
            spriteDiamondAdd.setAnchorPoint(cc.p(0, 0.5));

            this.m_LabelAddDiamond = GUI.createNumberLabel(
                this.m_DiamondAdd.toString(), _GUIPath + "Num/num_7_36x46.png", 36, 46, "0");
            this.m_MainUI.addChild(this.m_LabelAddDiamond);
            this.m_LabelAddDiamond.setAnchorPoint(cc.p(0, 0.5));

            var spriteDiamondSize = this.m_SpriteDiamond.getContentSize();
            var spriteDiamondAddSize = spriteDiamondAdd.getContentSize();
            var labelAddDiamondSize = this.m_LabelAddDiamond.getContentSize();

            var diamondToSide = (mainSize.width
                - spriteDiamondSize.width - spriteDiamondAddSize.width - labelAddDiamondSize.width) * 0.5;

            var diamondPosY = 190 * Defines.BASE_SCALE;
            this.m_SpriteDiamond.setPosition(cc.p(diamondToSide + spriteDiamondSize.width * 0.5, diamondPosY));
            spriteDiamondAdd.setPosition(cc.p(diamondToSide + spriteDiamondSize.width, diamondPosY));
            this.m_LabelAddDiamond.setPosition(
                cc.p(diamondToSide + spriteDiamondSize.width + spriteDiamondAddSize.width, diamondPosY));

            //
            this.m_LabelAddDiamond.setString("0");
        }

//		this.m_ButtonMoreDiamond = cc.MenuItemSprite.create(
//			cc.Sprite.createWithSpriteFrameName("button_gengduozuanshi-up.png"),
//			cc.Sprite.createWithSpriteFrameName("button_gengduozuanshi-down.png"),
//			this._btnMoreDiamondCallback, this);
//		this.m_ButtonMoreDiamond.setPosition(cc.p(mainSize.width * 0.5, 250 * Defines.BASE_SCALE));
//		this.m_ButtonMoreDiamond.setVisible(false);
//
//		var moreMenu = cc.Menu.create(this.m_ButtonMoreDiamond);
//		moreMenu.setPosition(cc.p(0, 0));
//		this.m_MainUI.addChild(moreMenu);
//
//		if (cc.DataMng.getInstance().isMoreDiamondADEnabled()){
//			this.m_ButtonMoreDiamond.setVisible(true);
//		}

        //
        this.m_ButtonBack = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_back_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_back_sel.png"),
            this._btnBackCallback, this);
        this.m_ButtonBack.setPosition(cc.p(70 * Defines.BASE_SCALE, 80 * Defines.BASE_SCALE));

        var backMenu = cc.Menu.create(this.m_ButtonBack);
        backMenu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(backMenu);

        //
        if (ShareMng.getInstance().isValid() && !Defines.IS_KO)
        {
            //
            this.m_ButtonShare = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("start_end_share_nor.png"),
                cc.Sprite.createWithSpriteFrameName("start_end_share_sel.png"),
                this._btnShareCallback, this);
            this.m_ButtonShare.setPosition(cc.p(-60 * Defines.BASE_SCALE, 215 * Defines.BASE_SCALE));

            var shareMenu = cc.GUIMenu.create(this.m_ButtonShare);
            shareMenu.setTouchHandle(cc.MENU_HANDLER_PRIORITY, false);
            this.m_MainUI.addChild(shareMenu);

            //
            var monster = cc.Sprite.createWithSpriteFrameName("Images_monster_3.png");
            this.getWindow().addChild(monster);
            monster.setPosition(cc.pSub(this.m_MainUI.getPosition(),
                cc.p(mainSize.width * 0.5, mainSize.height * 0.5 - 120 * Defines.BASE_SCALE)));
        }

        //
        this.m_ButtonRestart = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("start_end_btn_restart_nor.png"),
            cc.Sprite.createWithSpriteFrameName("start_end_btn_restart_sel.png"),
            this._btnRestartCallback, this);
        this.m_ButtonRestart.setScale(0.8);
        this.m_ButtonRestart.setPosition(cc.p(mainSize.width * 0.3, 10 * Defines.BASE_SCALE));

        this.m_ButtonNext = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("start_end_btn_next_nor.png"),
            cc.Sprite.createWithSpriteFrameName("start_end_btn_next_sel.png"),
            this._btnNextLevelCallback, this);
        this.m_ButtonNext.setPosition(cc.p(mainSize.width * 0.7, 10 * Defines.BASE_SCALE));

        var playMenu = cc.Menu.create(this.m_ButtonRestart, this.m_ButtonNext);
        playMenu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(playMenu);

        //
        if (this.m_LevelData && this.m_LevelData.IS_SPACE_LEVEL)
        {
            this.m_ButtonRestart.setVisible(false);
            this.m_ButtonNext.setPosition(cc.p(mainSize.width * 0.5, 10 * Defines.BASE_SCALE));
        }

        //
        this.m_DiamondBatchNode = cc.SpriteBatchNode.create(Resource._GUIGeneral_png);
        this.m_MainUI.addChild(this.m_DiamondBatchNode);

        return this;
    },

    addContentForMiningGame: function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 100));
        this.getWindow().addChild(blockLayer, -1);

        //
        var friendWidth = isTelcomOperators() ? 0 : 0;//100 * Defines.BASE_SCALE;
        var posX = (_ScreenWidth() - friendWidth) * 0.5;

        //
        this.m_MainUI = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back11.png");
        this.getWindow().addChild(this.m_MainUI, 1);
        this.m_MainUI.setPosition(cc.p(posX, _ScreenHeight() * 0.5));

        //
        var mainSize = this.m_MainUI.getContentSize();

        var titleBg = cc.Sprite.createWithSpriteFrameName("general_level_title_bg.png");
        this.m_MainUI.addChild(titleBg);
        titleBg.setPosition(mainSize.width * 0.5, mainSize.height - 5 * Defines.BASE_SCALE);

        //
        var titleBgSize = titleBg.getContentSize();

        if (this.m_LevelData)
        {
            //
            var spriteLevelLabel = cc.Sprite.createWithSpriteFrameName("wenzi-zuanshikuangchang.png");
            titleBg.addChild(spriteLevelLabel);
            spriteLevelLabel.setPosition(cc.p(titleBgSize.width * 0.5, titleBgSize.height * 0.5));

            //
            if (Defines.IS_EN)
            {
                //
                var spriteLabelSize = spriteLevelLabel.getContentSize();
                var toSide = (titleBgSize.width - spriteLabelSize.width)/2;

                //
                spriteLevelLabel.setAnchorPoint(cc.p(0, 0.5));
                spriteLevelLabel.setPosition(cc.p(toSide, titleBgSize.height * 0.5));
            }
        }

        var spriteCenterImage = cc.Sprite.createWithSpriteFrameName("bg-zuanshikuangchang.png");
        this.m_MainUI.addChild(spriteCenterImage);
        spriteCenterImage.setAnchorPoint(cc.p(0.5, 0.5));
        spriteCenterImage.setPosition(mainSize.width * 0.5, 350 * Defines.BASE_SCALE);

        var bonusPanel_1 = cc.Sprite.createWithSpriteFrameName("panel_caikuang.png");
        this.m_MainUI.addChild(bonusPanel_1);
        bonusPanel_1.setPosition(mainSize.width * 0.25, mainSize.height * 0.3);

        this.makeBonusPanel(bonusPanel_1, "general_diamond_1.png", this.m_DiamondAdd.toString(), 0.8);

        var bonusPanel_2 = cc.Sprite.createWithSpriteFrameName("panel_caikuang.png");
        this.m_MainUI.addChild(bonusPanel_2);
        bonusPanel_2.setPosition(mainSize.width * 0.5, mainSize.height * 0.3);

        var targetDesLine = cc.MineMng.getInstance().getSpec_Award();
        var itemArr = _GetMineSpecialArr();
        if (targetDesLine[0]){
            var itemSpr = itemArr[targetDesLine[0] - 1].SPRITESOURCE;
            this.addBonus(itemArr[targetDesLine[0] - 1].ID, this.m_ItemAdd[0]);
            this.makeBonusPanel(bonusPanel_2, itemSpr, this.m_ItemAdd[0].toString(), 0.5);
        }

        var bonusPanel_3 = cc.Sprite.createWithSpriteFrameName("panel_caikuang.png");
        this.m_MainUI.addChild(bonusPanel_3);
        bonusPanel_3.setPosition(mainSize.width * 0.75, mainSize.height * 0.3);

        if (targetDesLine[1]){
            var itemSpr = itemArr[targetDesLine[1] - 1].SPRITESOURCE;
            this.addBonus(itemArr[targetDesLine[1] - 1].ID, this.m_ItemAdd[1]);
            this.makeBonusPanel(bonusPanel_3, itemSpr, this.m_ItemAdd[1].toString(), 0.5);
        }
//
        this.m_ButtonBack = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_back_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_back_sel.png"),
            this._btnBackCallback, this);
        this.m_ButtonBack.setPosition(cc.p(70 * Defines.BASE_SCALE, 80 * Defines.BASE_SCALE));

        var backMenu = cc.Menu.create(this.m_ButtonBack);
        backMenu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(backMenu);


        this.m_ButtonRestart = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("button_zaiwayici-up.png"),
            cc.Sprite.createWithSpriteFrameName("button_zaiwayici-down.png"),
            this._btnMineRestartCallback, this);
//        this.m_ButtonRestart.setScale(0.8);
        this.m_ButtonRestart.setPosition(cc.p(mainSize.width * 0.5, 10 * Defines.BASE_SCALE));

        var playMenu = cc.Menu.create(this.m_ButtonRestart);
        playMenu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(playMenu);

        if (ShareMng.getInstance().isValid())
        {
            //
            this.m_ButtonShare = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("start_end_share_nor.png"),
                cc.Sprite.createWithSpriteFrameName("start_end_share_sel.png"),
                this._btnShareCallback, this);
            this.m_ButtonShare.setPosition(cc.p(-60 * Defines.BASE_SCALE, 215 * Defines.BASE_SCALE));

            var shareMenu = cc.GUIMenu.create(this.m_ButtonShare);
            shareMenu.setTouchHandle(cc.MENU_HANDLER_PRIORITY, false);
            this.m_MainUI.addChild(shareMenu);

            //
            var monster = cc.Sprite.createWithSpriteFrameName("Images_monster_3.png");
            this.getWindow().addChild(monster);
            monster.setPosition(cc.pSub(this.m_MainUI.getPosition(),
                cc.p(mainSize.width * 0.5, mainSize.height * 0.5 - 120 * Defines.BASE_SCALE)));
        }
    },

    addBonus: function(itemID, num){
        if (itemID == 1){
            //薄荷糖
            cc.DataMng.getInstance().addHeart(num);
        }
        else if (itemID == 2){
            //薄荷糖上限+1
            cc.DataMng.getInstance().addHeartRecoverMax(num);
        }
        else{
            cc.DataMng.getInstance().buyItemByID(itemID, num, 0);
        }
        return this;
    },

    makeBonusPanel: function(render, sourceSpr, value, targetScale){
        var panelSize = render.getContentSize();

        var sprDiamond = cc.Sprite.createWithSpriteFrameName(sourceSpr);//"general_diamond_1.png");
        render.addChild(sprDiamond);
        sprDiamond.setPosition(panelSize.width * 0.5, panelSize.height * 0.7);
        sprDiamond.setScale(targetScale);

//        var spriteDiamondAdd = cc.Sprite.createWithSpriteFrameName("start_end_diamond_add.png");
//        render.addChild(spriteDiamondAdd);
//        spriteDiamondAdd.setPosition(panelSize.width * 0.2, panelSize.height * 0.2);
//        spriteDiamondAdd.setScale(0.7);

        var labelCurDiamond = GUI.createNumberLabel(
            value, //this.m_DiamondAdd.toString(),
            _GUIPath + "Num/num_7_36x46.png", 36, 46, "0");
        render.addChild(labelCurDiamond);
        labelCurDiamond.setAnchorPoint(cc.p(0.5, 0.5));
        labelCurDiamond.setScale(0.5);
        labelCurDiamond.setPosition(panelSize.width * 0.5, panelSize.height * 0.2);
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentForRateStars: function()
    {
        var mainSize =  this.m_MainUI.getContentSize();
        var starConfig = [
            {"scale": 0.9, "rotation": -15, "offset": cc.p(-180 * Defines.BASE_SCALE, -165 * Defines.BASE_SCALE)},
            {"scale": 1.0, "rotation":   0, "offset": cc.p(0, -145 * Defines.BASE_SCALE)},
            {"scale": 1.0, "rotation":  15, "offset": cc.p(185 * Defines.BASE_SCALE, -165 * Defines.BASE_SCALE)}
        ];

        var score = this.m_LevelData.CUR_SCORE.get();
        var targets = this.m_LevelData.TARGET_SCORES.concat();
        var starRate = Tools.getScoreRate(score, targets);

        var self = this;
        var lightStars = [];
        var grayStars = [];

        starConfig.forEach(
            function(each, index)
            {
                var grayStar = cc.Sprite.createWithSpriteFrameName("start_end_star_gray.png");
                self.m_MainUI.addChild(grayStar);
                grayStar.setPosition(cc.pAdd(cc.p(mainSize.width/2, mainSize.height), each["offset"]));
                grayStar.setRotation(each["rotation"]);
                grayStar.setScale(each["scale"]);
                grayStars.push(grayStar);

                if (index < starRate)
                {
                    var lightStar = cc.Sprite.createWithSpriteFrameName("start_end_star_light.png");
                    self.m_MainUI.addChild(lightStar);
                    lightStar.setPosition(cc.pAdd(cc.p(mainSize.width/2, mainSize.height), each["offset"]));
                    lightStar.setRotation(each["rotation"]);
                    lightStar.setScale(each["scale"]);
                    lightStar.setVisible(false);
                    lightStars.push(lightStar);
                }
            }
        );

        //星星点亮动画
        var lightenFunc = function(sender, index)
        {
            cc.AudioMng.getInstance().playStarRaiseWithIndex(index);

            sender.setVisible(true);
            grayStars[index].setVisible(false);

            if (self.m_DiamondAdd > 0)
            {
                self.runDiamondBonusAction(index, starRate);
            }
        };

        lightStars.forEach(
            function(each, index)
            {
                var lightenFrames = cc.ResourceMng.getInstance().getAnimationFrames("win_star_");
                var lightenAnimation = cc.Animation.create(lightenFrames, Defines.FPS * 3);
                each.runAction(cc.Sequence.create(
                    cc.DelayTime.create(Defines.FPS * 20 * (index + 1)),
                    cc.CallFunc.create(lightenFunc, self, index),
                    cc.Animate.create(lightenAnimation)
                ));
            }
        );

        //星星闪烁动画
        if (lightStars[0])
        {
            var flickFunc = function()
            {
                lightStars.forEach(
                    function(each, index)
                    {
                        var flickFrames = cc.ResourceMng.getInstance().getAnimationFrames("win_star_flicker_");
                        var flickAnimation = cc.Animation.create(flickFrames, Defines.FPS * 3);
                        each.runAction(cc.Sequence.create(
                            cc.DelayTime.create(Defines.FPS * 24 * index),
                            cc.Animate.create(flickAnimation)
                        ));
                    }
                );
            };

            lightStars[0].runAction(cc.RepeatForever.create(cc.Sequence.create(
                cc.DelayTime.create(3.0),
                cc.CallFunc.create(flickFunc, this)
            )));
        }

        if(3 == starRate)
        {
            cc.AudioMng.getInstance().playRates3();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentForBackgroundLight: function()
    {
        //
        var score = this.m_LevelData.CUR_SCORE.get();
        var targets = this.m_LevelData.TARGET_SCORES.concat();
        var rate = Tools.getScoreRate(score, targets);

        //
        var backgroundLight_0 = cc.Sprite.createWithSpriteFrameName("start_end_bg_light_0.png");
        this.getWindow().addChild(backgroundLight_0, -1);
        backgroundLight_0.setPosition(this.m_MainUI.getPosition());
        backgroundLight_0.setScale(4);
        backgroundLight_0.setOpacity(0);

        //
        backgroundLight_0.runAction(cc.Sequence.create(
            cc.DelayTime.create(Defines.FPS * 20 * (rate + 1)),
            cc.CallFunc.create(function(){
                backgroundLight_0.runAction(cc.FadeIn.create(0.6));
                backgroundLight_0.runAction(cc.RepeatForever.create(cc.RotateBy.create(18, 360)));
            })
        ));

        //
        var backgroundLight_1 = cc.Sprite.createWithSpriteFrameName("start_end_bg_light_1.png");
        this.m_AnimationLayer.addChild(backgroundLight_1);
        backgroundLight_1.setPosition(this.m_MainUI.getPosition());
        backgroundLight_1.setScaleX(_ScreenWidth()/backgroundLight_1.getContentSize().width);
        backgroundLight_1.setScaleY(_ScreenHeight()/backgroundLight_1.getContentSize().height);
        backgroundLight_1.setOpacity(0);

        //
        backgroundLight_1.runAction(cc.Sequence.create(
            cc.DelayTime.create(Defines.FPS * 20 * (rate + 1)),
            cc.FadeIn.create(0.05),
            cc.FadeOut.create(0.3),
            cc.CallFunc.create(function(sender){
                sender.removeFromParent(true);

                //
                var particle_0 = cc.ParticleSystem.create(
                    _GUIPath + "GUIGameLevel_Start_EndWin_EndFail/win_particle_0.plist");
                this.getWindow().addChild(particle_0, 1000);

                //
                var particle_1 = cc.ParticleSystem.create(
                    _GUIPath + "GUIGameLevel_Start_EndWin_EndFail/win_particle_1.plist");
                this.getWindow().addChild(particle_1, 1000);

                //
                var particle_2 = cc.ParticleSystem.create(
                    _GUIPath + "GUIGameLevel_Start_EndWin_EndFail/win_particle_0.plist");
                this.getWindow().addChild(particle_2, 1000);

            }, this)
        ));

        //
        var backgroundLight_2 = cc.Sprite.createWithSpriteFrameName("start_end_bg_light_2.png");
        this.m_AnimationLayer.addChild(backgroundLight_2);
        backgroundLight_2.setPosition(this.m_MainUI.getPosition());
        backgroundLight_2.setOpacity(0);

        var backgroundLight_3 = cc.Sprite.createWithSpriteFrameName("start_end_bg_light_3.png");
        backgroundLight_2.addChild(backgroundLight_3);
        var bgSize = backgroundLight_2.getContentSize();
        backgroundLight_3.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.5));
        backgroundLight_3.setOpacity(0);

        backgroundLight_2.runAction(cc.Sequence.create(
            cc.DelayTime.create(Defines.FPS * 20 * (rate + 1)),
            cc.FadeIn.create(0.01)
        ));

        backgroundLight_3.runAction(cc.Sequence.create(
            cc.DelayTime.create(Defines.FPS * 20 * (rate + 1)),
            cc.FadeIn.create(0.01)
        ));

        backgroundLight_2.runAction(cc.Sequence.create(
            cc.DelayTime.create(Defines.FPS * 20 * (rate + 1)),
            cc.ScaleTo.create(0.25, 6),
            cc.CallFunc.create(function(sender){
                sender.removeFromParent(true);
            })
        ));

        //
        if (this.m_ButtonShare)
        {
            this.m_ButtonShare.runAction(cc.RepeatForever.create(cc.Sequence.create(
                cc.MoveBy.create(0.3, cc.p(0, 5 * Defines.BASE_SCALE)),
                cc.MoveBy.create(0.6, cc.p(0, -10 * Defines.BASE_SCALE)),
                cc.MoveBy.create(0.3, cc.p(0, 5 * Defines.BASE_SCALE))
            )));
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    runDiamondBonusAction: function(index, rate)
    {
        //
        var diamondCount = parseInt(this.m_DiamondAdd/rate);
        if (index == (rate - 1))
        {
            diamondCount += (this.m_DiamondAdd - diamondCount * rate);
        }

        var diamondCountEx = diamondCount > 10 ? 10 : diamondCount;

        //
        var addCount = diamondCount/diamondCountEx;

        //
        var mainSize =  this.m_MainUI.getContentSize();

        //
        var beginPosition = [
            cc.p(mainSize.width * 0.5 - 180 * Defines.BASE_SCALE, mainSize.height - 165 * Defines.BASE_SCALE),
            cc.p(mainSize.width * 0.5, mainSize.height - 145 * Defines.BASE_SCALE),
            cc.p(mainSize.width * 0.5 + 185 * Defines.BASE_SCALE, mainSize.height - 165 * Defines.BASE_SCALE)
        ];

        //
        var bezierPosition = [_ScreenLeft(), _ScreenTop(), _ScreenRight()];

        //
        var randDis = [
            {_randX_0: -300 * Defines.BASE_SCALE, _randX_1: 0, _randY_0: 0, _randY_1: 300 * Defines.BASE_SCALE},
            {_randX_0: -300 * Defines.BASE_SCALE, _randX_1: 300 * Defines.BASE_SCALE, _randY_0: 0, _randY_1: 300 * Defines.BASE_SCALE},
            {_randX_0: 0, _randX_1: 300 * Defines.BASE_SCALE, _randY_0: 0, _randY_1: 300 * Defines.BASE_SCALE}
        ];

        //
        var endPosition = this.m_SpriteDiamond.getPosition();

        //
        var reachCount = 0;

        //
        for (var idx = 0; idx < diamondCountEx; idx++)
        {
            var midPos = this.m_MainUI.convertToNodeSpace(bezierPosition[index]);
            midPos.x += Tools.rangeRandom(randDis[index]._randX_0, randDis[index]._randX_1);
            midPos.y += Tools.rangeRandom(randDis[index]._randY_0, randDis[index]._randY_1);

            //
            var bezierPath = [beginPosition[index], midPos, endPosition];

            this.m_DiamondBatchNode.runAction(cc.Sequence.create(
                cc.DelayTime.create(Tools.rangeRandom(0, Defines.FPS * 30)),
                cc.CallFunc.create(function(sender, path)
                {
                    var spriteDiamond = cc.Sprite.createWithSpriteFrameName("general_diamond_0.png");
                    this.m_DiamondBatchNode.addChild(spriteDiamond);
                    spriteDiamond.setPosition(beginPosition[index]);

                    //
                    spriteDiamond.runAction(cc.Sequence.create(
                        cc.BezierTo.create(Defines.FPS * 60, path),
                        cc.CallFunc.create(function(sender)
                        {
                            ++reachCount;
                            if (index <= 0 && reachCount <= 1)
                            {
                                this.m_BonusAudioID = cc.AudioMng.getInstance().playDiamondBonus(rate - 1);
                            }

                            sender.removeFromParent(true);
                            this.m_DiamondAddValue += addCount;
                            var curValue = parseInt(this.m_DiamondAddValue);
                            this.m_LabelAddDiamond.setString(curValue.toString());

                            if (index == (rate - 1) && reachCount >= diamondCountEx)
                            {
                                this.m_LabelAddDiamond.setString(this.m_DiamondAdd.toString());

                                if (this.m_BonusAudioID >= 0)
                                {
                                    cc.AudioMng.getInstance().stopDiamondBonus(this.m_BonusAudioID);
                                }
                            }

                            this.m_SpriteDiamond.stopAllActions();
                            this.m_SpriteDiamond.runAction(cc.Sequence.create(
                                cc.ScaleTo.create(Defines.FPS * 3, 1.4),
                                cc.ScaleTo.create(Defines.FPS * 3, 1.0)
                            ));

                        }, this)
                    ));
                }, this, bezierPath)
            ));
        }

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
    _btnShareCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        var sysViewPath = _Share_PrintSysView();

        //
        var self = this;
        var callFunc = function()
        {
            ShareMng.getInstance().shareWithLevelWin(self.m_LevelData, sysViewPath, self.m_DiamondAdd);
        };

        cc.GUIPopupShare.getInstance().openWindow(this.getWindow().getParent(), callFunc);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnRestartCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        this.closeWindow();

        //
        if (cc.GUIMap.getInstance().isWindowOpen())
        {
            cc.GUIMapMng.getInstance().resetNextLevelIsNew();
            cc.GUIMapMng.getInstance().autoRestart(this.m_LevelData.NAME, true);

//            if (RateMng.getInstance().shouldRate())
//            {
//                RateMng.getInstance().rate();
//            }
        }
        else if (cc.GUIFloatMap.getInstance().isWindowOpen())
        {
            cc.GUIFloatMap.getInstance().activateFloatLevel(this.m_LevelData.ID, true);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnMineRestartCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        this.closeWindow();

        var myScene = cc.GUIMap.getInstance().getWindow().getParent();
        var levelData = cc.MineMng.getInstance().getCurMineLevelData();

        cc.GUIMap.getInstance().setZonesEnabled(false);
        cc.GUIMineEnter.getInstance().openWindow(myScene,levelData,true);
        //
//        if (cc.GUIMap.getInstance().isWindowOpen())
//        {
//            cc.GUIMapMng.getInstance().resetNextLevelIsNew();
//            cc.GUIMapMng.getInstance().autoRestart(this.m_LevelData.NAME, true);
//
//            if (RateMng.getInstance().shouldRate())
//            {
//                RateMng.getInstance().rate();
//            }
//        }
//        else if (cc.GUIFloatMap.getInstance().isWindowOpen())
//        {
//            cc.GUIFloatMap.getInstance().activateFloatLevel(this.m_LevelData.ID, true);
//        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnNextLevelCallback: function()
    {
        //
        cc.AudioMng.getInstance().playButtonSound(true);

        this.addGameWinAD();
        //
        this.closeWindow();

        //
        if (cc.GUIMap.getInstance().isWindowOpen())
        {
            cc.GUIMap.getInstance().handleMapEnterAction(true);

            //第六关要引导，不启动
            var toActivate = this.m_LevelData.NAME != "LEVEL_5";
            cc.GUIMapMng.getInstance().autoEnterNextWithFromKey(this.m_LevelData.NAME, toActivate);
        }
        else if (cc.GUIFloatMap.getInstance().isWindowOpen())
        {
            cc.GUIFloatMap.getInstance().activateFloatLevel(this.m_LevelData.ID + 1, true);
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
        /*this.getWindow().removeAllChildren(true);
        this.m_AnimationLayer.removeAllChildren(true);
        this.addContent();
        this.updateUIData();
        return;*/

        //
        cc.AudioMng.getInstance().playButtonSound(true);

        this.addGameWinAD();

        this.closeWindow();

		
        if (cc.GUIMap.getInstance().isWindowOpen())
        {
            cc.GUIMap.getInstance().handleMapEnterAction(true);
		
			cc.log("cc.DataMng.getInstance().getTotalWinTime() = " + cc.DataMng.getInstance().getTotalWinTime());
		
//			if (_IsNetWorkWifi() && cc.NodeSelf.getInstance().isLogin() && !Defines.IS_EN && cc.DataMng.getInstance().getTotalWinTime() % 5 ==1){
//				cc.GUIRecommend.getInstance().openWindow();
//			}
			
			if (Defines.IS_EN && cc.DataMng.getInstance().getTotalWinTime() % 5 ==0){
				cc.GUIInviteLogin.getInstance().openWindow();
			}
            //
            if (cc.GUIMapMng.getInstance().isNextLevelNew())
            {
                cc.GUIMapMng.getInstance().autoEnterNextWithFromKey(this.m_LevelData.NAME, true);
            }
        }
        else if (cc.GUIFloatMap.getInstance().isWindowOpen())
        {
            cc.GUIFloatMap.getInstance().handleFloatEnterAction(true);
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
    setDiamondBonus: function(diamond)
    {
        this.m_DiamondAdd = diamond;
        return this;
    },
	
	//------------------------------------------------------------------------------------------------------------------
    setItemBonus: function()
	{
		if (this.m_LevelData.MODEL != Defines.TARGET_MODEL.MODEL_MINELOTTERY){
			return this;
		}
	
		var targetDesLine = cc.MineMng.getInstance().getSpec_Award();

        var itemArr = _GetMineSpecialArr();

		this.m_ItemAdd = [];
        if (targetDesLine[0]){
            var itemNum = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().getCreateObjectContent("mineSpecial_" + itemArr[targetDesLine[0] - 1].NAME);
            this.m_ItemAdd.push(itemNum);
        }
		if (targetDesLine[1]){
            var itemNum = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().getCreateObjectContent("mineSpecial_" + itemArr[targetDesLine[1] - 1].NAME);
            this.m_ItemAdd.push(itemNum);
        }

        var directNum = 0;
        var warpNum = 0;
        var candyLineNum = 0;

        for (var i = 0 ; i < 2; i++){
            switch (itemArr[targetDesLine[i] - 1].NAME){
                case "ITEM_DIRECTION_EX":
                    directNum += this.m_ItemAdd[i];
                    break;
                case "ITEM_WARP_EX":
                    warpNum += this.m_ItemAdd[i];
                    break;
                case "LIFE_CANDY_LINE":
                    candyLineNum += this.m_ItemAdd[i];
                    break;
                default :
                    break;
            }
        }

        var mineTime = cc.DataMng.getInstance().getGameLevelBITime(); //游戏时长
        var curMoves = cc.DataMng.getInstance().getCurTouchMoves(); //总步数
        var diamondPerMove = curMoves ? this.m_DiamondAdd / curMoves * 100 : 0; //平均每步获得钻石

        var finalStepArr = cc.DataMng.getInstance().getMineGameLevelStep();
        var totalCostDiamond = 0;
        var config = {};

        for (var i = 0; i < 9 ; i++){
            var levelNum = cc.MineMng.getInstance().getMINE_LEVEL_SETTING()[i];
            finalStepArr[i] = finalStepArr[i] || 0;
            totalCostDiamond += finalStepArr[i] * levelNum[0];
            config["level_" + levelNum[0] + "_StepNum"] = finalStepArr[i];
        }

        config["levelType"] = cc.Guide.MiningGameType + 1;
        config["mineTime"] = mineTime;
        config["directNum"] = directNum;
        config["warpNum"] = warpNum;
        config["candyLineNum"] = candyLineNum;
        config["diamondGet"] = this.m_DiamondAdd;
        config["curMoves"] = curMoves;
        config["diamondPerMove"] = diamondPerMove;
        config["profitOrLostNum"] = this.m_DiamondAdd - totalCostDiamond;

        BIMng.getInstance().logMineLeaveGame(config);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateUIData: function()
    {
        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        var historyRate = Tools.getScoreRate(this.m_LevelData.HISTORY_MAX_SCORE.getFaceValue(), this.m_LevelData.TARGET_SCORES);

        var showPosUp = false;
        if (!Defines.IS_EN && cc.DataMng.getInstance().isScoreRankingsEnabled() && cc.NodeSelf.getInstance().isLogin()){
            var curLevelTopPos = GameTopModel.getInstance().getTopDatasIndexForSelf();
            var lastLevelTopPos = cc.DataMng.getInstance().getLastLevelTopNum();
            cc.log("curLevelTopPos = " + curLevelTopPos);
            cc.log("lastLevelTopPos = " + lastLevelTopPos);
            if (curLevelTopPos < lastLevelTopPos){
                var levelTopLength = GameTopModel.getInstance().getTOpdatasLength(GameTopModel._TOP_KEY.KEY_GAME_LEVEL);
                var totalMemberNum = 170000;
                var upPercent = (lastLevelTopPos - curLevelTopPos) / totalMemberNum * 1000;

                var selfGetOverTxt = cc.LabelTTF.create("您上升了" + (lastLevelTopPos - curLevelTopPos)  + "名! 超越了" + parseInt(upPercent/10) + "." + parseInt(upPercent%10) + "%的玩家！", Defines.DefaultFont, 18 * Defines.BASE_SCALE);
                selfGetOverTxt.setPosition(cc.p(mainSize.width * 0.5, 70 * Defines.BASE_SCALE));
                this.m_MainUI.addChild(selfGetOverTxt);
//                cc.DataMng.getInstance().setLastLevelTopNum(curLevelTopPos);
                showPosUp = true;
            }
        }

        //
        if (cc.GUIMapMng.getInstance().isNextLevelNew() && GUI._IsFirstLevelForNewZone(this.m_LevelData))
        {
            var promptContent = Resource.ChineseTxt[160];
        }
//        else if (historyRate < 3)
//        {
//            promptContent = Resource.ChineseTxt[161];
//        }

        if (promptContent && !showPosUp)
        {
            var promptLabel = cc.LabelTTF.create(promptContent, Defines.DefaultFont, 18 * Defines.BASE_SCALE);
            this.m_MainUI.addChild(promptLabel);
            promptLabel.setPosition(cc.p(mainSize.width * 0.5, 75 * Defines.BASE_SCALE));
        }


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyOpenWindow: function(window)
    {
        if (window instanceof cc.GUIGuideNormal)
        {
            this.m_ButtonBack.setEnabled(false);
            this.m_ButtonRestart.setEnabled(false);
            this.m_ButtonNext.setEnabled(false);
//			this.m_ButtonMoreDiamond.setEnabled(false);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyCloseWindow: function(window)
    {
        if (window instanceof cc.GUIGuideNormal)
        {
            this.m_ButtonBack.setEnabled(true);
            this.m_ButtonRestart.setEnabled(true);
            this.m_ButtonNext.setEnabled(true);
//			this.m_ButtonMoreDiamond.setEnabled(true);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getButtonShareRectForGuide: function()
    {
        if (!this.m_ButtonShare)
        {
            return null;
        }

        var size = this.m_ButtonShare.getContentSize();
        var mainSize = this.m_MainUI.getContentSize();
        var toWindow = cc.pSub(this.m_MainUI.getPosition(), cc.p(mainSize.width * 0.5, mainSize.height * 0.5));
        var origin = cc.pAdd(this.m_ButtonShare.getPosition(), toWindow);
        return cc.rect(origin.x - size.width * 0.5, origin.y - size.height * 0.5, size.width, size.height);
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
            cc.log("GUIGameLevelEndWin：覆盖数据后，关闭窗口");
            this._btnBackCallback();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);
//        cc.DataMng.getInstance().addTotalWinTime();
        //
        cc.ResourceMng.getInstance().addToCache(
            Resource._GUIGameLevel_Start_EndWin_EndFail_plist,
            Resource._GUIGameLevel_Start_EndWin_EndFail_png);

        //
        cc.ResourceMng.getInstance().addToCache(
            Resource.win_star_plist,
            Resource.win_star_png);

        //
        this.m_AnimationLayer = cc.Layer.create();
        this.getWindow().getParent().addChild(this.m_AnimationLayer, 10000);


        if (this.m_LevelData.MODEL == Defines.TARGET_MODEL.MODEL_MINELOTTERY){

            BIMng.getInstance().logMineEnterGame(true);
            this.addContentForMiningGame();
            this.addContentForBackgroundLight();
            return this;
        }

		//
        this.addContent();
        this.updateUIData();

        //第一次过关或者有钻石奖励 可以有分享奖励
        var canBonus = cc.GUIMapMng.getInstance().isNextLevelNew() || this.m_DiamondAdd > 0;
        ShareMng.getInstance().setCanBonus(canBonus);

        //
        if (this.m_LevelData && this.m_LevelData.ID == 0)
        {
            var shareTarget = this.getButtonShareRectForGuide();
            var blacks = [
                shareTarget
            ];

            if (isEnabledShare() && !Defines.IS_KO)
            {
                cc.GUIGuideNormal.getInstance().showCustomCuteMonsterBase("ShareToFriend",Resource.ChineseTxt[74],this.getWindow().getParent(),blacks,false);
            }
        }
        else
        {
            if(cc.GUIAppraiseKakao.getInstance().needShow())
            {
                cc.GUIAppraiseKakao.getInstance().openWindow();
            }
        }

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
	isGuide: function()
	{
		if (this.m_LevelData && this.m_LevelData.ID == 1-1)
        {
			if (!cc.DataMng.getInstance().isGameLevelGuidFinish("ShareToFriend", false))
			{
				return true;
			}
		}
		return false;
	},
    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        //
        cc.AudioMng.getInstance().stopAllEffects(false);
        cc.AudioMng.getInstance().playMainMenuMusic();

        //关闭界面的时候上传一次数据
        if(Defines.IS_KO)
        {
            cc.NodeHelper.getInstance().uploadOthers();
            cc.GUIAchievementData.getInstance().uploadAchieveScore();
        }
        //
        this.getWindow().removeAllChildren(true);

        //
        if (this.m_AnimationLayer)
        {
            this.m_AnimationLayer.removeFromParent(true);
            this.m_AnimationLayer = null;
        }

        //
        if(!isTelcomOperators() && cc.NodeSelf.getInstance().isLogin())
        {
            cc.GUIMyFriendsTop.getInstance().closeWindow();
        }

        //每个页面只生成一个分享Code
        ShareMng.getInstance().cleanup();

        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUIGameLevel_Start_EndWin_EndFail_plist,
            Resource._GUIGameLevel_Start_EndWin_EndFail_png);

        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource.win_star_plist,
            Resource.win_star_png);

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIGameLevelEndWin._instance = null;
cc.GUIGameLevelEndWin.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIGameLevelEndWin();
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
    }

    return this._instance;
};