
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
    addContent: function()
    {
        //
        var background = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(background);

        //
        var spriteTitle = cc.Sprite.createWithSpriteFrameName("map_label_option_challenge.png");
        this.getWindow().addChild(spriteTitle);
        spriteTitle.setPosition(cc.p(_ScreenWidth()/2, _ScreenHeight()/2 + 170 * Defines.BASE_SCALE));

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(_ScreenWidth() - 50 * Defines.BASE_SCALE, _ScreenHeight() - 50 * Defines.BASE_SCALE));

        //
        var closeMenu = cc.Menu.create(buttonClose);
        closeMenu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(closeMenu);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateCokeContent: function()
    {
        //
        if (this.m_CokeLayer)
        {
            this.m_CokeLayer.removeFromParent(true);
        }

        this.m_CokeLayer = cc.Layer.create();
        this.getWindow().addChild(this.m_CokeLayer);

        //
        var cokePosition = [
            cc.p(_ScreenWidth()/2 - 225 * Defines.BASE_SCALE, _ScreenHeight()/2),
            cc.p(_ScreenWidth()/2, _ScreenHeight()/2),
            cc.p(_ScreenWidth()/2 + 225 * Defines.BASE_SCALE, _ScreenHeight()/2)
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
            if (index < processCoke)
            {
                var cokeContent = self._createGainedCoke(spaceLevelsID[index]);
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
                cokeContent = self._createLockCoke();
            }

            self.m_CokeLayer.addChild(
                cokeContent instanceof cc.MenuItemSprite ? cokeContent.getParent() : cokeContent);
            cokeContent.setPosition(position);

            //
            var bgSize = cokeContent.getContentSize();

            var levelLabel = GUI.createNumberLabel(index + 1, _GUIPath + "Num/num_9_20x24.png", 20, 24, "0");
            cokeContent.addChild(levelLabel);
            levelLabel.setAnchorPoint(cc.p(0.5, 0.5));
            levelLabel.setPosition(cc.p(bgSize.width * 0.3, bgSize.height * 0.8));

            //
            if (index >= 1)
            {
                var pointPos = [
                    cc.p(position.x - 87 * Defines.BASE_SCALE, position.y),
                    cc.p(position.x - 112 * Defines.BASE_SCALE, position.y),
                    cc.p(position.x - 137 * Defines.BASE_SCALE, position.y)
                ];

                pointPos.forEach(
                    function(each)
                    {
                        var wayPoint = cc.Sprite.create(_MainMapPath + "MapWayPoint.png");
                        self.m_CokeLayer.addChild(wayPoint);
                        wayPoint.setPosition(each);
                    }
                );
            }
        });

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _createGainedCoke: function(tag)
    {
        //
        var gainedCoke = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("map_btn_coke_nor.png"),
            cc.Sprite.createWithSpriteFrameName("map_btn_coke_nor.png"),
            this._btnChallengeCallback, this);
        gainedCoke.setTag(tag);
        gainedCoke.setEnabled(cc.GUIMapMng.getInstance().canReplaySpaceLevel());

        //
        var cokeSize = gainedCoke.getContentSize();

        //
        var spriteCoke = cc.Sprite.createWithSpriteFrameName("general_coke_1.png");
        gainedCoke.addChild(spriteCoke);
        spriteCoke.setPosition(cc.p(cokeSize.width * 0.5, cokeSize.height * 0.5));

        //
        var contentMenu = cc.Menu.create(gainedCoke);
        contentMenu.setPosition(cc.p(0, 0));

        //V1.0.3
        var levelData = cc.DataMng.getInstance().getLevelDataWithID(tag, true);
        var rateValue = !levelData || !levelData.HISTORY_MAX_SCORE ? 0 : Tools.getScoreRate(
            levelData.HISTORY_MAX_SCORE.getFaceValue(), levelData.TARGET_SCORES.concat());

        var starPos = [
            cc.p(cokeSize.width * 0.15, -10 * Defines.BASE_SCALE),
            cc.p(cokeSize.width * 0.50, -25 * Defines.BASE_SCALE),
            cc.p(cokeSize.width * 0.85, -10 * Defines.BASE_SCALE)
        ];

        for (var index = 0; index < starPos.length; index++)
        {
            var starFile = (index < rateValue) ? "map_coke_star_light.png" : "map_coke_star_gray.png";
            var rateStar = cc.Sprite.createWithSpriteFrameName(starFile);
            rateStar.setPosition(starPos[index]);
            gainedCoke.addChild(rateStar);
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
                cc.Sprite.createWithSpriteFrameName("map_btn_coke_nor.png"),
                cc.Sprite.createWithSpriteFrameName("map_btn_coke_nor.png"),
                this._btnChallengeCallback, this);
            cokeContent.setTag(tag);

            //
            var bgSize = cokeContent.getContentSize();

            //
            var spriteCoke = cc.Sprite.createWithSpriteFrameName("general_coke_1.png");
            cokeContent.addChild(spriteCoke);
            spriteCoke.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.5));

            //
            var contentMenu = cc.Menu.create(cokeContent);
            contentMenu.setPosition(cc.p(0, 0));

            //
            var btnChallenge = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("map_btn_challenge_nor.png"),
                cc.Sprite.createWithSpriteFrameName("map_btn_challenge_sel.png"),
                this._btnChallengeCallback, this);
            btnChallenge.setPosition(cc.p(bgSize.width/2, -25 * Defines.BASE_SCALE));
            btnChallenge.setTag(tag);

            var challengeMenu = cc.Menu.create(btnChallenge);
            challengeMenu.setPosition(cc.p(0, 0));
            cokeContent.addChild(challengeMenu);

            return cokeContent;
        }

        //倒计时的状态
        cokeContent = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("map_btn_coke_nor.png"),
            cc.Sprite.createWithSpriteFrameName("map_btn_coke_nor.png"),
            this._btnCokeTimeCallback, this);

        //
        contentMenu = cc.Menu.create(cokeContent);
        contentMenu.setPosition(cc.p(0, 0));

        //
        bgSize = cokeContent.getContentSize();

        //
        spriteCoke = cc.Sprite.createWithSpriteFrameName("general_coke_0.png");
        cokeContent.addChild(spriteCoke);
        spriteCoke.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.5));

        //
        var spriteChallenge = cc.Sprite.createWithSpriteFrameName("map_btn_challenge_disabled.png");
        cokeContent.addChild(spriteChallenge);
        spriteChallenge.setPosition(cc.p(bgSize.width * 0.5, -25 * Defines.BASE_SCALE));

        //
        //封装一个对象
        var timeHandler = {};
        timeHandler.curTime = /*_LocalTime()/1000;*/_ServerTime();
        timeHandler.endTime = cokeEndTime;
        timeHandler.getShowTime = function()
        {
            var timeValue = (timeHandler.endTime - timeHandler.curTime);
            timeValue = timeValue < 0 ? 0 : timeValue;
            return parseInt(timeValue);
        };

        //
        var cokeTimePanel = cc.Sprite.createWithSpriteFrameName("coke_time_bg.png");
        cokeContent.addChild(cokeTimePanel);
        cokeTimePanel.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.5));

        //
        var cokeTimeLabel = GUI.createNumberLabel("00:00:00", _GUIPath + "Num/num_3_14x18.png", 14, 18, "0");
        cokeTimePanel.addChild(cokeTimeLabel);
        cokeTimeLabel.setAnchorPoint(cc.p(0.5, 0.5));
        var panelSize = cokeTimePanel.getContentSize();
        cokeTimeLabel.setPosition(cc.p(panelSize.width * 0.5, panelSize.height * 0.5));

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
                    timeHandler.curTime = /*_LocalTime()/1000;*/_ServerTime();
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
        var cokeContent = cc.Sprite.createWithSpriteFrameName("map_btn_coke_disabled.png");

        //
        var bgSize = cokeContent.getContentSize();

        //
        var spriteCoke = cc.Sprite.createWithSpriteFrameName("general_coke_0.png");
        cokeContent.addChild(spriteCoke);
        spriteCoke.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.5));

        //
        var labelClose = cc.Sprite.createWithSpriteFrameName("map_coke_label_close.png");
        cokeContent.addChild(labelClose);
        labelClose.setPosition(cc.p(bgSize.width * 0.5, -25 * Defines.BASE_SCALE));

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
			cc.GUIBuyDiamond.getInstance().openWindow(myScene, 0, GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE);
            return this;
        }

        //
        cc.GUIGameLevelStart.getInstance().openWindow(myScene, levelData);
        cc.GUIGameLevelStart.getInstance().handleStartEnterAction(true);

        //
        if(!isTelcomOperators() && cc.NodeSelf.getInstance().isLogin())
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
        var timeValue = cokeEndTime - /*_LocalTime()/1000;*/_ServerTime();
        timeValue = timeValue < 0 ? 0 : timeValue;
        var stringTime = Tools.convertSecondTimeEx(parseInt(timeValue), true, true, true);

        //
        var myScene = cc.GUIMap.getInstance().getWindow().getParent();
        cc.GUIMapCokePrompt.getInstance().openWindow(myScene, stringTime);

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
    notifyLoginFinish: function()
    {
        if (this.isWindowOpen())
        {
            cc.log("GUIMapCoke：覆盖数据后，关闭窗口");
            this._btnCloseCallback();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, curMapDefine)
    {
        this._super(render);
        cc.log("cc.GUIMapCoke.getInstance");
        //
        this.m_CurMapDefine = curMapDefine;

        //
        this.addContent();
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
};