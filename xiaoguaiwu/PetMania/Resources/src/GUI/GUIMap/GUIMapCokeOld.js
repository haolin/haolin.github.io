/*

//======================================================================================================================
cc.GUIMapCoke = cc.GUIWindow.extend({

    description: function ()
    {
        return "GUIMapCoke";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //UI
        this.m_MainUI = null;

        this.m_CokeLayer = null;
        this.m_CurMapDefine = null;
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
        var background = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(background);

        //
        this.m_MainUI = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back2.png");
        this.getWindow().addChild(this.m_MainUI);
        this.m_MainUI.setPosition(_ScreenCenter());

        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        var labelTitle = cc.LabelTTF.create(Resource.ChineseTxt["space_0"], Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelTitle);
        labelTitle.setPosition(cc.p(mainSize.width * 0.5, mainSize.height - 50 * Defines.BASE_SCALE));

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(mainSize.width - 25 * Defines.BASE_SCALE, mainSize.height - 25 * Defines.BASE_SCALE));

        //
        var buttonHelp = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_ask_help_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_ask_help_sel.png"),
            this._btnAskHelpCallback, this);
        buttonHelp.setPosition(cc.p(mainSize.width * */
/*0.42*//*
0.25, 0));

        //
        var buttonBuy = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_temp_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_temp_sel.png"),
            this._btnBuyCallback, this);
        buttonBuy.setPosition(cc.p(mainSize.width * */
/*0.77*//*
0.67, 0));

        //old
        if (_UnlockNewStar_ByRMB)
        {
            var spriteCurrency = cc.Sprite.createWithSpriteFrameName("general_rmb.png");
            buttonBuy.addChild(spriteCurrency);
            spriteCurrency.setAnchorPoint(cc.p(0, 0.5));

            //
            var labelPrice = GUI.createNumberLabel(
                GUI.SHOP_DATA.SHOP_DATA_UNLOCK_NEW_ZONE[0].TOTAL_PRICE.get(), _GUIPath + "Num/num_12_28x40.png", 28, 40, ".");
            buttonBuy.addChild(labelPrice);
            labelPrice.setAnchorPoint(cc.p(0, 0.5));

            //
            var buttonBuySize = buttonBuy.getContentSize();
            var currencySize = spriteCurrency.getContentSize();
            var labelPriceSize = labelPrice.getContentSize();
            var toSide = (buttonBuySize.width - currencySize.width - labelPriceSize.width) * 0.5;

            //
            spriteCurrency.setPosition(cc.p(toSide, buttonBuySize.height * 0.55));
            labelPrice.setPosition(cc.p(toSide + currencySize.width, buttonBuySize.height * 0.55));
        }
        else
        {
            var diamondButtonSize = buttonBuy.getContentSize();

            var diamondImg = cc.Sprite.createWithSpriteFrameName("general_diamond_2.png");
            buttonBuy.addChild(diamondImg);
            diamondImg.setScale(1.2);
            diamondImg.setPosition(cc.p(diamondButtonSize.width * 0.2, diamondButtonSize.height * 0.52));

            var diamond = Defines.DIAMOND_PAY.UNLOCK_NEW_STAR;
            var number = GUI.createNumberLabel(diamond.toString(), _GUIPath + "Num/num_12_28x40.png", 28, 40, ".");
            buttonBuy.addChild(number);
            number.setAnchorPoint(cc.p(0.5, 0.5));
            number.setPosition(cc.p(diamondButtonSize.width * 0.6, diamondButtonSize.height * 0.55));
        }

        //
        var labelBuy = cc.LabelTTF.create(Resource.ChineseTxt["space_2"], Defines.DefaultFont, 18 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelBuy);
        labelBuy.setPosition(cc.p(mainSize.width * 0.67, -35 * Defines.BASE_SCALE));

        //
        var toNewMenu = cc.Menu.create(buttonClose, buttonBuy, buttonHelp*/
/*, this.m_ButtonChallenge*//*
);
        toNewMenu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(toNewMenu);

        //
        if (isTelcomOperators())
        {
            buttonHelp.setVisible(false);
            buttonBuy.setPositionX(mainSize.width * 0.5);
            labelBuy.setPositionX(mainSize.width * 0.5);
        }

        //空间站重玩
        if (GUI._IsMapSpacePassed(this.m_CurMapDefine))
        {
            buttonHelp.setVisible(false);
            buttonBuy.setVisible(false);
            labelBuy.setVisible(false);
            labelTitle.setString(Resource.ChineseTxt["space_1"]);
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
                cc.DataMng.getInstance().spendMoney(needDiamond, MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_NEW_PLANT); //解锁新星球
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
    _btnCloseCallback: function()
    {
        this.closeWindow();
        cc.GUIMap.getInstance().setZonesEnabled(true);
        cc.GUIMap.getInstance().handleMapEnterAction(true);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnAskHelpCallback: function()
    {
        this.closeWindow();

        if (cc.NodeSelf.getInstance().isLogin())
        {
            var myScene = cc.Director.getInstance().getRunningScene();
            cc.GUIMapFriendAid.getInstance().openWindow(myScene);
        }
        else
        {
            _NeedLogin();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateCokeContent: function()
    {
        var mainSize = this.m_MainUI.getContentSize();

        //
        if (this.m_CokeLayer)
        {
            this.m_CokeLayer.removeFromParent(true);
        }

        this.m_CokeLayer = cc.Layer.create();
        this.m_CokeLayer.setContentSize(mainSize);
        this.m_MainUI.addChild(this.m_CokeLayer);

        //
        var cokePosition = [
            cc.p(mainSize.width * 0.18, mainSize.height * 0.5 - 10 * Defines.BASE_SCALE),
            cc.p(mainSize.width * 0.5, mainSize.height * 0.5 - 10 * Defines.BASE_SCALE),
            cc.p(mainSize.width * 0.82, mainSize.height * 0.5 - 10 * Defines.BASE_SCALE)
        ];

        //
        var processLevelData = cc.DataMng.getInstance().getMaxProcessLevelData();
        var spaceLevelsID = this.m_CurMapDefine.SPACE_LEVELS_ID;
        var processCoke = processLevelData.IS_SPACE_LEVEL ? spaceLevelsID.indexOf(processLevelData.ID) : -1;

        //最远关卡一定在此空间站或远于空间站
        processCoke = processCoke < 0 ? 3 : processCoke;

        //第一个空间站只有一个挑战关卡
        if (spaceLevelsID.length == 1)
        {
            cokePosition.splice(0, 1);
            cokePosition.splice(1, 1);
        }

        //
        var self = this;
        cokePosition.forEach(function(position, index)
        {
            var cokeContent = null;

            var handle = true;

            //
            if (index < processCoke)
            {
                cokeContent = self._createGainedCoke(spaceLevelsID[index]);
            }
            else if (index == processCoke)
            {
                //第一个挑战关卡没有CD时间
                if (index == 0 && cc.DataMng.getInstance().updateCokeEndTime() > 0)
                {
                    cc.log("GUIMapCoke-----updateCokeContent: 可乐时间异常");
                    cc.DataMng.getInstance().resetCokeEndTime(true);
                }

                cokeContent = self._createProcessCoke(spaceLevelsID[index]);
            }
            else
            {
                handle = false;
                cokeContent = self._createLockCoke();
            }

            self.m_CokeLayer.addChild(
                cokeContent instanceof cc.MenuItemSprite ? cokeContent.getParent() : cokeContent);
            cokeContent.setPosition(position);

            //
            var bgSize = cokeContent.getContentSize();

            //
            var titleFile = handle ?
                "general_coke_title_label_light_" + index +".png" :
                "general_coke_title_label_gray_" + index + ".png";
            var labelTitle = cc.Sprite.createWithSpriteFrameName(titleFile);
            cokeContent.addChild(labelTitle);
            labelTitle.setPosition(cc.p(bgSize.width * 0.5, bgSize.height - 28 * Defines.BASE_SCALE));
        });

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _createGainedCoke: function(tag)
    {
        //
        var gainedCoke = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("map_coke_bg_3.png"),
            cc.Sprite.createWithSpriteFrameName("map_coke_bg_3.png"),
            this._btnChallengeCallback, this);
        gainedCoke.setTag(tag);
        gainedCoke.setEnabled(cc.GUIMapMng.getInstance().canReplaySpaceLevel());

        //
        var cokeSize = gainedCoke.getContentSize();

        //
        var spriteCoke = cc.Sprite.createWithSpriteFrameName("general_coke_1.png");
        gainedCoke.addChild(spriteCoke);
        spriteCoke.setPosition(cc.p(cokeSize.width * 0.5, cokeSize.height * 0.55));

        //
        var contentMenu = cc.Menu.create(gainedCoke);
        contentMenu.setPosition(cc.p(0, 0));

        //V1.0.2
        var levelData = cc.DataMng.getInstance().getLevelDataWithID(tag, true);
        var rateValue = !levelData || !levelData.HISTORY_MAX_SCORE ? 0 : Tools.getScoreRate(
            levelData.HISTORY_MAX_SCORE.getFaceValue(), levelData.TARGET_SCORES.concat());

        var starPosX = [
            [cokeSize.width * 0.50],
            [cokeSize.width * 0.35, cokeSize.width * 0.65],
            [cokeSize.width * 0.25, cokeSize.width * 0.50, cokeSize.width * 0.75]
        ];

        for (var index = 0; index < rateValue; index++)
        {
            var rateStar = cc.Sprite.createWithSpriteFrameName("map_coke_star.png");
            rateStar.setPosition(cc.p(starPosX[rateValue - 1][index], -0.6 * rateStar.getContentSize().height/2));
            gainedCoke.addChild(rateStar);
            rateStar.setScale(0.6);
        }

        return gainedCoke;
    },

    //------------------------------------------------------------------------------------------------------------------
    _createProcessCoke: function(tag)
    {
        var cokeContent = null;

        //
        var cokeEndTime = cc.DataMng.getInstance().updateCokeEndTime();

        if (cokeEndTime <= 0)
        {
            cokeContent = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("map_coke_bg_2.png"),
                cc.Sprite.createWithSpriteFrameName("map_coke_bg_2.png"),
                this._btnChallengeCallback, this);
            cokeContent.setTag(tag);

            //
            var bgSize = cokeContent.getContentSize();

            //
            var spriteCoke = cc.Sprite.createWithSpriteFrameName("general_coke_1.png");
            cokeContent.addChild(spriteCoke);
            spriteCoke.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.55));

            //
            var contentMenu = cc.Menu.create(cokeContent);
            contentMenu.setPosition(cc.p(0, 0));

            //V1.0.2
            var challengeLabel = cc.Sprite.createWithSpriteFrameName("map_label_challenge.png");
            cokeContent.addChild(challengeLabel);
            challengeLabel.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.2));

            //
            */
/*this.m_ButtonChallenge.setEnabled(true);
            this.m_ButtonChallenge.setTag(tag);
            this.m_LabelChallenge.setVisible(false);*//*


            return cokeContent;
        }

        //倒计时的状态
        cokeContent = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("map_coke_bg_1.png"),
            cc.Sprite.createWithSpriteFrameName("map_coke_bg_1.png"),
            this._btnCokeTimeCallback, this
        );

        //
        contentMenu = cc.Menu.create(cokeContent);
        contentMenu.setPosition(cc.p(0, 0));

        //
        bgSize = cokeContent.getContentSize();

        //
        spriteCoke = cc.Sprite.createWithSpriteFrameName("general_coke_1.png");
        cokeContent.addChild(spriteCoke);
        spriteCoke.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.55));

        //
        //封装一个对象
        var timeHandler = {};
        timeHandler.curTime = */
/*_LocalTime()/1000;*//*
_ServerTime();
        timeHandler.endTime = cokeEndTime;
        timeHandler.getShowTime = function()
        {
            var timeValue = (timeHandler.endTime - timeHandler.curTime);
            timeValue = timeValue < 0 ? 0 : timeValue;
            return parseInt(timeValue);
        };

        //
        var cokeTimeLabel = GUI.createNumberLabel("00:00:00", _GUIPath + "Num/num_3_14x18.png", 14, 18, "0");
        cokeContent.addChild(cokeTimeLabel);
        cokeTimeLabel.setAnchorPoint(cc.p(0.5, 0.5));
        cokeTimeLabel.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.2));
        cokeTimeLabel.setScale(0.8);

        cokeTimeLabel.setString(Tools.convertSecondTimeEx(timeHandler.getShowTime(), true, true, true));

        //
        var self = this;
        cokeTimeLabel.schedule(function()
        {
            timeHandler.curTime += 1;
            if (timeHandler.curTime >= timeHandler.endTime)
            {
                timeHandler.endTime = cc.DataMng.getInstance().updateCokeEndTime();
                if (timeHandler.endTime > 0)
                {
                    timeHandler.curTime = */
/*_LocalTime()/1000;*//*
_ServerTime();
                }
                else
                {
                    cokeTimeLabel.unscheduleAllCallbacks();
                    self.updateCokeContent();
                    return;
                }
            }

            //
            cokeTimeLabel.setString(Tools.convertSecondTimeEx(timeHandler.getShowTime(), true, true, true));
        },
        1);

        return cokeContent;
    },

    //------------------------------------------------------------------------------------------------------------------
    _createLockCoke: function()
    {
        var cokeContent = cc.Sprite.createWithSpriteFrameName("map_coke_bg_0.png");

        //
        var bgSize = cokeContent.getContentSize();

        //
        var spriteCoke = cc.Sprite.createWithSpriteFrameName("general_coke_0.png");
        cokeContent.addChild(spriteCoke);
        spriteCoke.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.55));

        //
        var labelClose = cc.Sprite.createWithSpriteFrameName("map_coke_label_close.png");
        cokeContent.addChild(labelClose);
        labelClose.setPosition(cc.p(bgSize.width * 0.5, 36 * Defines.BASE_SCALE));

        return cokeContent;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnChallengeCallback: function(sender)
    {
        //
        var processLevelID = sender.getTag();

        //
        this.closeWindow();

        //
        var myScene = cc.GUIMap.getInstance().getWindow().getParent();
        var levelData = cc.DataMng.getInstance().getLevelDataWithID(processLevelID, true);

        //
        if (cc.DataMng.getInstance().getCurrentHeart() <= 0)
        {
            cc.GUIAskFriendForHeart.getInstance().openWindow(myScene, levelData.NAME);
            return this;
        }

        //
        cc.GUIGameLevelStart.getInstance().openWindow(myScene, levelData);
        cc.GUIGameLevelStart.getInstance().handleStartEnterAction(true);

        //
        if(!isTelcomOperators())
        {
            cc.GUIMyFriendsTop.getInstance().openWindow(myScene, cc.GUIGameLevelStart.getInstance());
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCokeTimeCallback: function()
    {
        //
        this.closeWindow();

        //
        var cokeEndTime = cc.DataMng.getInstance().updateCokeEndTime();
        var timeValue = cokeEndTime - */
/*_LocalTime()/1000;*//*
_ServerTime();
        timeValue = timeValue < 0 ? 0 : timeValue;
        var stringTime = Tools.convertSecondTimeEx(parseInt(timeValue), true, true, true);

        //
        var myScene = cc.GUIMap.getInstance().getWindow().getParent();
        cc.GUIMapCokePrompt.getInstance().openWindow(myScene, stringTime);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyLoginFinish: function()
    {
        if (!this.isWindowOpen())
        {
            return this;
        }

        //
        cc.log("GUIMapCoke：覆盖数据后，关闭窗口");
        this._btnCloseCallback();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, curMapDefine)
    {
        this._super(render);

        //
        this.m_CurMapDefine = curMapDefine;

        //
        this.setContent();
        this.updateCokeContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        //
        this.getWindow().removeAllChildren(true);
        this.m_CokeLayer = null;

        return this;
    }
});

cc.GUIMapCoke._instance = null;
cc.GUIMapCoke.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIMapCoke();
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
};*/
