
//======================================================================================================================
cc.GUIFloatMap = cc.GUIWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //
        this.m_CurMapDefine = null;
        this.m_LevelsData = {};
        this.m_LevelsMenu = null;
        this.m_Levels = [];

        //级别划分、各级别消耗的钥匙
        this.m_GradePart = [];
        this.m_GradeCost = [];

        //
        this.m_KeyPanel = null;
        this.m_LabelKey = null;

        //
        this.m_Buttons = [];
        this.m_ButtonBack = null;
        this.m_ButtonKeyAdd = null;

        //放置关卡的层
        this.m_LevelsLayer = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "GUIFloatMap";
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._super();

        //
        this.m_GradePart = [0, 4, 7, 9];
        this.m_GradeCost = [2, 5, 10, 15];

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentForBack: function()
    {
        //
        var background = cc.Sprite.create(Resource._MapZone);
        background.setAnchorPoint(cc.p(0, 0));
        this.getWindow().addChild(background, -5000);

        //
        if (_ScreenWidth() > background.getContentSize().width)
        {
            var backgroundSecond = cc.Sprite.create(Resource._MapZone);
            backgroundSecond.setAnchorPoint(cc.p(0, 0));
            this.getWindow().addChild(backgroundSecond, -5001);
            backgroundSecond.setPosition(cc.p(background.getContentSize().width, 0));
        }

        //
        var mapAnim = cc.GUIMapAnim.create();
        var decoration = this.m_CurMapDefine.DECORATION;
        mapAnim.executeZoneAnimFunc(this, decoration);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentForWidget: function()
    {
        //生命值面板
        this.m_KeyPanel = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("map_time_panel.png"),
            cc.Sprite.createWithSpriteFrameName("map_time_panel.png"),
            this._btnKeyAddCallback, this);
        this.m_KeyPanel.setPosition(cc.p(_ScreenWidth() - 115 * Defines.BASE_SCALE, _ScreenHeight() - 38 * Defines.BASE_SCALE));

        //
        var keyPanelMenu = cc.Menu.create(this.m_KeyPanel);
        keyPanelMenu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(keyPanelMenu);
        this.m_Buttons.push(this.m_KeyPanel);

        //
        var keyPanelSize = this.m_KeyPanel.getContentSize();

        //
        var spriteKey = cc.Sprite.createWithSpriteFrameName("general_diamond_1.png");
        this.m_KeyPanel.addChild(spriteKey);
        spriteKey.setScale(0.8);
        spriteKey.setPosition(cc.p(keyPanelSize.width * 0.15, keyPanelSize.height * 0.58));

        //
        this.m_LabelKey = GUI.createNumberLabel("", "res/GUI/Num/num_3_14x18.png", 14, 18, "0");
        this.m_KeyPanel.addChild(this.m_LabelKey);
        this.m_LabelKey.setAnchorPoint(cc.p(0.5, 0.5));
        this.m_LabelKey.setPosition(cc.p(keyPanelSize.width * 0.6, keyPanelSize.height * 0.5));

        //
        this.m_ButtonKeyAdd = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_add_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_add_sel.png"),
            this._btnKeyAddCallback, this);
        this.m_ButtonKeyAdd.setScale(0.8);

        //
        var keyAddMenu = cc.Menu.create(this.m_ButtonKeyAdd);
        this.m_KeyPanel.addChild(keyAddMenu);
        keyAddMenu.setPosition(cc.p(keyPanelSize.width * 0.89, keyPanelSize.height * 0.52));
        this.m_Buttons.push(this.m_ButtonKeyAdd);

        //
        this.m_ButtonBack = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("map_btn_back_nor.png"),
            cc.Sprite.createWithSpriteFrameName("map_btn_back_sel.png"),
            this._btnBackCallback, this);
        this.m_ButtonBack.setPosition(cc.p(_ScreenWidth() - 50 * Defines.BASE_SCALE, 50 * Defines.BASE_SCALE));
        this.m_Buttons.push(this.m_ButtonBack);

        //
        var backMenu = cc.Menu.create(this.m_ButtonBack);
        backMenu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(backMenu);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentForLevels: function()
    {
        this.m_LevelsLayer = cc.Layer.create();/*cc.LayerColor.create(cc.c4(100, 100, 100, 200));*/
        this.m_LevelsLayer.setContentSize(cc.size(960, 640));
        this.getWindow().addChild(this.m_LevelsLayer);

        var contentSize = this.m_LevelsLayer.getContentSize();
        var posX = (_ScreenWidth() - contentSize.width) * 0.5;
        var posY = (_ScreenHeight() - contentSize.height) * 0.5;
        this.m_LevelsLayer.setPosition(cc.p(posX, posY));

        //
        if (!this.m_LevelsData[this.m_CurMapDefine.ID])
        {
            var tiledMapName = "MapFloat_" + (this.m_CurMapDefine.ID + 1) + ".tmx";
            var builder = cc.TiledMapFloatBuilder.create(tiledMapName);
            this.m_LevelsData[this.m_CurMapDefine.ID] = builder.build();
        }

        //
        var layoutData = this.m_LevelsData[this.m_CurMapDefine.ID];

        //
        this.m_LevelsMenu = cc.Menu.create();
        this.m_LevelsMenu.setPosition(cc.p(0, 0));
        this.m_LevelsLayer.addChild(this.m_LevelsMenu);

        //
        for (var prop in layoutData)
        {
            if (layoutData.hasOwnProperty(prop))
            {
                var floatIndex = this.m_CurMapDefine.MIN_FLOAT_ID + parseInt(prop) - 1;
                var position = layoutData[prop];

                var levelButton = cc.MenuItemSprite.create(
                    cc.Sprite.createWithSpriteFrameName("map_level_nor.png"),
                    cc.Sprite.createWithSpriteFrameName("map_level_nor.png"),
                    cc.Sprite.createWithSpriteFrameName("map_level_disabled.png"),
                    this._btnFloatLevelCallback, this);
                levelButton.setPosition(position);
                levelButton.setTag(floatIndex);
                this.m_LevelsMenu.addChild(levelButton);
                this.m_Levels.push(levelButton);
            }
        }

        //设置状态
        var maxProcess = cc.DataMng.getFloatLevel().getMaxProcessFloat(this.m_CurMapDefine.ID);

        var self = this;
        this.m_Levels.forEach(
            function(a_level, index)
            {
                if (index > maxProcess - self.m_CurMapDefine.MIN_FLOAT_ID)
                {
                    a_level.setEnabled(false);
                    return;
                }

                //
                var levelLabel = GUI.createNumberLabel.create(
                    (index + 1).toString(), "res/GUI/Num/num_14_18x22.png", 18, 22, "0");
                a_level.addChild(levelLabel);
                var levelItemSize = a_level.getContentSize();
                levelLabel.setAnchorPoint(cc.p(0.5, 0.5));
                levelLabel.setPosition(cc.p(levelItemSize.width * 0.5, levelItemSize.height * 0.65));
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _getKeyCostOfLevel: function(sender)
    {
        //
        var gradePart = 0;
        var floatIndex = sender.getTag() - this.m_CurMapDefine.MIN_FLOAT_ID;

        //
        for (var index = this.m_GradePart.length - 1; index >= 0; index--)
        {
            if (floatIndex >= this.m_GradePart[index])
            {
                gradePart = index;
                break;
            }
        }

        return this.m_GradeCost[gradePart];
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnFloatLevelCallback: function(sender)
    {
        //
        var spendKey = this._getKeyCostOfLevel(sender);

        //
        var floatIndex = sender.getTag();
        var levelData = cc.DataMng.getFloatLevel().getFloatLevelData(floatIndex);

        //
        var myScene = this.getWindow().getParent();
        cc.GUISpendKey.getInstance().openWindow(myScene, levelData, spendKey);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnKeyAddCallback: function()
    {
        //
        cc.DataMng.getFloatLevel().addFloatKey(1);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnBackCallback: function()
    {
        //
        this.closeWindow();
        Scene_MainMap.changeTo();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifiedUpdate: function()
    {
        if (!this.isWindowOpen())
        {
            return this;
        }

        //
        var floatKey = cc.DataMng.getFloatLevel().getFloatKey();
        this.m_LabelKey.setString(floatKey.toString());

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setFloatEnabled: function(isEnabled)
    {
        this.m_Buttons.forEach(
            function(button)
            {
                button.setEnabled(isEnabled);
            }
        );

        this.m_LevelsMenu.setEnabled(isEnabled);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleFloatEnterAction: function(isAnimate)
    {
        if (!this.isWindowOpen())
        {
            return this;
        }

        //
        this.setFloatEnabled(true);

        //
        var playNode = this.m_Levels.concat([this.m_KeyPanel, this.m_ButtonBack]);

        playNode.forEach(function(each)
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

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleFloatLeaveAction: function(isAnimate)
    {
        if (!this.isWindowOpen())
        {
            return this;
        }

        //
        this.setFloatEnabled(false);

        //
        var playNode = this.m_Levels.concat([this.m_KeyPanel, this.m_ButtonBack]);

        playNode.forEach(function(each)
        {
            if (each)
            {
                if (isAnimate)
                {
                    each.stopAllActions();
                    each.runAction(cc.ScaleTo.create(0.1, 0));
                }
                else
                {
                    each.setScale(0);
                }
            }
        });

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyOpenWindow: function(window)
    {
        //
        var forceWindow = [cc.GUISimpleShop, cc.GUIBuyDiamond, cc.GUIBuySuccess, cc.GUIBuyPrompt,
            cc.GUIPopupShare, cc.GUIGuideNormal, cc.GUISubFriendsList, cc.GUIMsgBox];
        var conditionFunc = function()
        {
            return cc.GUIGameLevelStart.getInstance().isWindowOpen()
                || cc.GUIGameLevelEndWin.getInstance().isWindowOpen()
                || cc.GUIGameLevelEndFail.getInstance().isWindowOpen();
        };

        for (var index = 0; index < forceWindow.length; index++)
        {
            if (window instanceof forceWindow[index] && conditionFunc())
            {
                return this;
            }
        }

        //
        var enableWindow = [cc.GUISimpleShop, cc.GUISpendKey, cc.GUISubFriendsList, cc.GUIBuyDiamond, cc.GUIBuySuccess, cc.GUIBuyPrompt, cc.GUIMsgBox];

        for (index = 0; index < enableWindow.length; index++)
        {
            if (window instanceof enableWindow[index])
            {
                this.setFloatEnabled(false);
                break;
            }
        }

        //
        var actionWindow = [cc.GUISpendKey, cc.GUISubFriendsList, cc.GUIBuyDiamond, cc.GUISimpleShop, cc.GUIBuySuccess, cc.GUIBuyPrompt, cc.GUIMsgBox];

        for (index = 0; index < actionWindow.length; index++)
        {
            if (window instanceof actionWindow[index])
            {
                this.handleFloatLeaveAction(true);
                break;
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyCloseWindow: function(window)
    {
        //
        var forceWindow = [cc.GUISimpleShop, cc.GUIBuyDiamond, cc.GUIBuySuccess, cc.GUIBuyPrompt,
            cc.GUIPopupShare, cc.GUIGuideNormal, cc.GUISubFriendsList, cc.GUIMsgBox];
        var conditionFunc = function()
        {
            return cc.GUIGameLevelStart.getInstance().isWindowOpen()
                || cc.GUIGameLevelEndWin.getInstance().isWindowOpen()
                || cc.GUIGameLevelEndFail.getInstance().isWindowOpen();
        };

        for (var index = 0; index < forceWindow.length; index++)
        {
            if (window instanceof forceWindow[index] && conditionFunc())
            {
                return this;
            }
        }

        //
        var enableWindow = [cc.GUISpendKey, cc.GUISubFriendsList, cc.GUISimpleShop, cc.GUIBuyDiamond, cc.GUIBuySuccess, cc.GUIBuyPrompt, cc.GUIMsgBox];

        for (index = 0; index < enableWindow.length; index++)
        {
            if (window instanceof enableWindow[index])
            {
                this.setFloatEnabled(true);
                break;
            }
        }

        //
        var actionWindow = [cc.GUISpendKey, cc.GUISubFriendsList, cc.GUISimpleShop, cc.GUIBuyDiamond, cc.GUIBuySuccess, cc.GUIBuyPrompt, cc.GUIMsgBox];

        for (index = 0; index < actionWindow.length; index++)
        {
            if (window instanceof actionWindow[index])
            {
                this.handleFloatEnterAction(true);
                break;
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    preLoadResource: function()
    {
        //
        var resForMap = [
            [Resource._GUIMap_plist, Resource._GUIMap_png],
            [Resource._MainMap_plist, Resource._MainMap_png]
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
        //
        var resForMap = [
            [Resource._GUIMap_plist, Resource._GUIMap_png],
            [Resource._MainMap_plist, Resource._MainMap_png]
        ];

        //
        resForMap.forEach(
            function(each)
            {
                cc.ResourceMng.getInstance().removeFromCache(each[0], each[1]);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _getFloatLevelItem: function(floatID)
    {
        for (var index = 0; index < this.m_Levels.length; index++)
        {
            if (this.m_Levels[index].getTag() == floatID)
            {
                return this.m_Levels[index];
            }
        }

        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    activateFloatLevel: function(floatID, isAnimate)
    {
        var floatLevel = this._getFloatLevelItem(floatID);

        //
        if (!floatLevel || !floatLevel.isEnabled())
        {
            this.handleFloatEnterAction(isAnimate);
            return this;
        }

        //
        floatLevel.activate();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, curMapDefine)
    {
        this._super(render);

        //
        this.m_CurMapDefine = curMapDefine;

        //
        this.preLoadResource();

        //
        this.addContentForBack();
        this.addContentForWidget();
        this.addContentForLevels();

        //
        this.handleFloatEnterAction(false);

        //
        this.notifiedUpdate();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        //
        this.getWindow().removeAllChildren(true);

        //
        this.cleanupResource();

        //
        this.m_Levels = [];
        this.m_Buttons = [];

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIFloatMap._instance = null;
cc.GUIFloatMap.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIFloatMap();
        this._instance.init();
        cc.DataMng.getInstance().addGUIObserver(this._instance);
    }

    return this._instance;
};