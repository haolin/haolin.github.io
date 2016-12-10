
//======================================================================================================================
cc.GUIDebugFunc = cc.GUIPopupWindow.extend({

    description: function ()
    {
        return "GUIDebugFunc";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        this.m_MainUI = null;
        this.m_NetLayer = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        var background = cc.LayerColor.create(cc.c4(32, 32, 32, 200));
        this.getWindow().addChild(background);

        //
        this.m_MainUI = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back1.png");
        this.getWindow().addChild(this.m_MainUI);
        this.m_MainUI.setPosition(_ScreenCenter());

        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        var labelTitle = cc.LabelTTF.create("DEBUG FUNC (" + GAME_VERSION + ")", Defines.DefaultFont, 28 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelTitle);
        labelTitle.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.92));
        labelTitle.setColor(cc.c3b(0, 0, 0));

        //
        var debugMenu = cc.Menu.create();
        debugMenu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(debugMenu);

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(mainSize.width * 0.94, mainSize.height * 0.94));
        debugMenu.addChild(buttonClose);

        //
        var funcContent = [
            {_title: "debug_0", _position: cc.p(0.2, 0.8), _func: this._btnAddMoneyCallback},
            {_title: "debug_1", _position: cc.p(0.5, 0.8), _func: this._btnCleanMoneyCallback},
            {_title: "debug_2", _position: cc.p(0.8, 0.8), _func: this._btnLockAllCallback},
            {_title: "debug_3", _position: cc.p(0.2, 0.7), _func: this._btnUnlockAllCallback},
            {_title: "debug_4", _position: cc.p(0.5, 0.7), _func: this._btnUnlockNextCallback},
            {_title: "debug_5", _position: cc.p(0.8, 0.7), _func: this._btnRestoreLevelCallback},
            {_title: "debug_6", _position: cc.p(0.2, 0.6), _func: this._btnDebug1Callback},
            {_title: "debug_7", _position: cc.p(0.5, 0.6), _func: this._btnAddHeartMaxRecover},
            {_title: "debug_8", _position: cc.p(0.8, 0.6), _func: this._btnCleanHearts},
            {_title: "debug_9", _position: cc.p(0.2, 0.5), _func: this._buttonInviteFriend},
            {_title: "debug_10", _position: cc.p(0.5, 0.5), _func: this._btnAdd5Hearts},
            {_title: "debug_11", _position: cc.p(0.8, 0.5), _func: this._btnAdd50Hearts},
            {_title: "debug_12", _position: cc.p(0.2, 0.4), _func: this._btnDailyBonusCallback},
            {_title: "debug_13", _position: cc.p(0.5, 0.4), _func: this._btnCleanDailyBonusCallback},
            {_title: "debug_14", _position: cc.p(0.8, 0.4), _func: this._btnNorMapCallback},
            {_title: "debug_15", _position: cc.p(0.2, 0.3), _func: this._btnFarMapCallback},
            {_title: "debug_16", _position: cc.p(0.5, 0.3), _func: this._btnNextSpaceCallback},
            {_title: "debug_17", _position: cc.p(0.8, 0.3), _func: this._btnShowFPSCallback},
            {_title: "debug_18", _position: cc.p(0.2, 0.2), _func: this._btnHideFPSCallback},
            {_title: "debug_19", _position: cc.p(0.5, 0.2), _func: this._btnAddItem5Callback},
            {_title: "debug_20", _position: cc.p(0.8, 0.2), _func: this._btnAddItem50Callback},
            {_title: "debug_21", _position: cc.p(0.2, 0.1), _func: this._btnCleanItemCallback},
            {_title: "debug_22", _position: cc.p(0.5, 0.1), _func: this._btnFloatLevelCallback},
            {_title: "debug_23", _position: cc.p(0.8, 0.1), _func: this._btnShareInfoCallback}
        ];

        //
        var self = this;
        funcContent.forEach(
            function(each)
            {
                //
                var funcButton = cc.MenuItemSprite.create(
                    cc.Sprite.createWithSpriteFrameName("general_btn_temp_nor.png"),
                    cc.Sprite.createWithSpriteFrameName("general_btn_temp_sel.png"),
                    each._func, self);
                funcButton.setPosition(cc.p(mainSize.width * each._position.x, mainSize.height * each._position.y));
                funcButton.setScale(0.7);
                debugMenu.addChild(funcButton);

                //
                var buttonSize = funcButton.getContentSize();

                //
                var fontSize = Defines.IS_EN ? 20 : 28;
                var labelFunc = cc.LabelTTF.create(Resource.ChineseTxt[each._title], Defines.DefaultFont, fontSize * Defines.BASE_SCALE);
                funcButton.addChild(labelFunc);
                labelFunc.setPosition(cc.p(buttonSize.width * 0.5, buttonSize.height * 0.55));
                labelFunc.setColor(cc.c3b(0, 0, 0));
            }
        );
                                      
        this._btnShowDeviceInfoCallback();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _createNetLayer: function()
    {
        var netLayer = cc.Layer.create();

        var netContent = [
            {_title: "ZONE", _content: ZONE, _position: cc.p(140, 300)},
            {_title: "RoleID", _content: cc.NodeSelf.getInstance().getRoleId(), _position: cc.p(140, 360)},
            {_title: "CHANNEL", _content: CHANNEL, _position: cc.p(140, 420)},
            {_title: "CurJoyFlag", _content: cc.DataMng.getInstance().getCurJoyFlag(), _position: cc.p(140, 480)}
        ];

        //
        netContent.forEach(
            function(each)
            {
                //
                var labelTitle = cc.LabelTTF.create(each._title + ": ", Defines.DefaultFont, 20 * Defines.BASE_SCALE);
                netLayer.addChild(labelTitle);
                labelTitle.setAnchorPoint(cc.p(0, 0.5));
                labelTitle.setPosition(cc.pMult(each._position, Defines.BASE_SCALE));
                labelTitle.setColor(cc.c3b(255, 255, 0));

                //
                var labelContent = cc.LabelTTF.create(each._content || 0, Defines.DefaultFont, 20 * Defines.BASE_SCALE);
                netLayer.addChild(labelContent);
                labelContent.setAnchorPoint(cc.p(0, 0.5));
                var titleSize = labelTitle.getContentSize();
                labelContent.setPosition(cc.pAdd(labelTitle.getPosition(), cc.p(titleSize.width, 0)));
                labelContent.setColor(cc.c3b(255, 255, 0));
            }
        );

        return netLayer;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnDebug1Callback: function()
    {
        noticeJaveHandler(4);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCleanHearts: function()
    {
        cc.DataMng.getInstance().desHeart(999);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnAdd5Hearts: function()
    {
        cc.DataMng.getInstance().addHeart(5);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnAdd50Hearts: function()
    {
        cc.DataMng.getInstance().addHeart(50);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _buttonInviteFriend: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback: function()
    {
        this.closeWindow();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnAddMoneyCallback: function()
    {
        cc.DataMng.getInstance().addMoney(5000, MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_CHEATE);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCleanMoneyCallback: function()
    {
        var totalMoney = cc.DataMng.getInstance().getMoney();
        cc.DataMng.getInstance().spendMoney(totalMoney, MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_CHEATE_CLEAN); //作弊清除钻石
        cc.DataMng.getInstance().notifyGUIObservers();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnUnlockNextCallback: function()
    {
        this.closeWindow();
        cc.GUIMapMng.getInstance().unlockNextFroDebug();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnNextSpaceCallback: function()
    {
        this.closeWindow();

        cc.GUIMapMng.getInstance().unlockNextSpaceFroDebug();

        cc.GUIMap.getInstance().needCenterMap();
        cc.GUIMap.getInstance().centerMaxProcessMapItem();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnUnlockAllCallback: function()
    {
        this.closeWindow();


        _DB_OP_GAME_LEVELS.prepareSave();

        //
        var arr = cc.Defines.GAME_LEVELS.concat(cc.Defines.GAME_SPACE_LEVELS);
        arr.forEach(
            function(_level)
            {
                _level.HISTORY_MAX_SCORE.set(Tools.arrayRandom(_level.TARGET_SCORES));
                _level.HISTORY_MAX_SCORE.save();

                _level.LAST_HISTORY_MAX_SCORE.set(Tools.arrayRandom(_level.TARGET_SCORES));
                _level.LAST_HISTORY_MAX_SCORE.save();
            }
        );

        _DB_OP_GAME_LEVELS.prepareSaveFinish();

        cc.GUIMapMng.getInstance().unlockAllForDebug();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnLockAllCallback: function()
    {
//        cc.Guide.round = 0;
        this.closeWindow();
        cc.GUIMapMng.getInstance().lockAllForDebug();

        //
        cc.DataMng.getInstance().restoreGameData();

        //
        cc.DataMng.getInstance().setItemContainerEnable(3, false);

        cc.Guide.isEnterShopGuide = false;
        cc.Guide.round = 0;
        cc.Guide.round_2 = 0;
        cc.Guide.round_7 = 0;
        cc.Guide.round_8 = 0;
		cc.Guide.round_12 = 0;
        cc.Guide.round_17 = 0;
        cc.Guide.round_19 = 0;
        cc.Guide.round_21 = 0;
        cc.Guide.round_28 = 0;
        cc.Guide.round_36 = 0;
        cc.Guide.round_46 = 0;
        cc.Guide.round_30 = 0;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnRestoreLevelCallback: function()
    {
        this.closeWindow();
        cc.GUIMapMng.getInstance().restoreLevelForDebug();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnDailyBonusCallback: function()
    {
        this.closeWindow();
        cc.DataMng.getDataDaily().addDailyContinue();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCleanDailyBonusCallback: function()
    {
        this.closeWindow();
        cc.DataMng.getDataDaily().cleanDailyContinue();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnNorMapCallback: function()
    {
        if (cc.GUIMapMng.getInstance().getMaxMapLevelID() == 199)
        {
            return this;
        }

        //
        cc.GUIMap.getInstance().closeWindow();
        cc.GUIMap.getInstance().release();
        cc.GUIMap._instance = null;

        //
        GUI.NORMAL_MAPS = [
            GUI.MAP_DEFINE.MAP_0,
            GUI.MAP_DEFINE.MAP_1,
            GUI.MAP_DEFINE.MAP_2,
            GUI.MAP_DEFINE.MAP_3,
            GUI.MAP_DEFINE.MAP_4,
            GUI.MAP_DEFINE.MAP_5,
            GUI.MAP_DEFINE.MAP_6,
            GUI.MAP_DEFINE.MAP_7,
            GUI.MAP_DEFINE.MAP_8,
            GUI.MAP_DEFINE.MAP_9
        ];

        GUI.TEMP_MAP = GUI.MAP_DEFINE.MAP_10;

        //
        var norLength = GUI.NORMAL_MAPS.length;
        var maxLevelID = GUI.NORMAL_MAPS[norLength - 1].SPACE_LEVELS_ID[0];

        if (cc.DataMng.getInstance().isGameLevelEnabled(maxLevelID, true))
        {
            var maxLevelData = cc.DataMng.getInstance().getLevelDataWithID(maxLevelID, true);
            cc.DataMng.getInstance().setMaxProcessLevelKey(maxLevelData.NAME);
            cc.GUIMapMng.getInstance().m_LevelKey = maxLevelData.NAME;
        }

        //
        cc.GUIMapMng.getInstance().m_Map = cc.GUIMap.getInstance();
        cc.GUIMap.getInstance().openWindow();

        //
        this.closeWindow();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnFarMapCallback: function()
    {
        if (cc.GUIMapMng.getInstance().getMaxMapLevelID() == 249)
        {
            return this;
        }

        //
        cc.GUIMap.getInstance().closeWindow();
        cc.GUIMap.getInstance().release();
        cc.GUIMap._instance = null;

        //
        GUI.NORMAL_MAPS = [
            GUI.MAP_DEFINE.MAP_0,
            GUI.MAP_DEFINE.MAP_1,
            GUI.MAP_DEFINE.MAP_2,
            GUI.MAP_DEFINE.MAP_3,
            GUI.MAP_DEFINE.MAP_4,
            GUI.MAP_DEFINE.MAP_5,
            GUI.MAP_DEFINE.MAP_6,
            GUI.MAP_DEFINE.MAP_7,
            GUI.MAP_DEFINE.MAP_8,
            GUI.MAP_DEFINE.MAP_9,
            GUI.MAP_DEFINE.MAP_10,
            GUI.MAP_DEFINE.MAP_11
        ];

        GUI.TEMP_MAP = GUI.MAP_DEFINE.MAP_12;

        //
        cc.GUIMapMng.getInstance().m_Map = cc.GUIMap.getInstance();
        cc.GUIMap.getInstance().openWindow();

        //
        this.closeWindow();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnShowFPSCallback: function()
    {
        this.closeWindow();
        cc.Director.getInstance().setDisplayStats(true);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnHideFPSCallback: function()
    {
        this.closeWindow();
        cc.Director.getInstance().setDisplayStats(false);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnAddItem5Callback: function()
    {
        for (var prop in Defines.GameItems)
        {
            if (Defines.GameItems.hasOwnProperty(prop))
            {
                cc.DataMng.getInstance().buyItemByID(Defines.GameItems[prop].ID, 5, 0);
            }
        }

        //
        cc.log("生成关卡数据的JSON");

        _DB_OP_GAME_LEVELS.prepareLoad();

        var normalLevelJSON = {};
        cc.Defines.GAME_LEVELS.forEach(
            function(_level)
            {
                normalLevelJSON[_level.ID + 1] = [
                    _level.HISTORY_MAX_SCORE.get(),
                    _level.LAST_HISTORY_MAX_SCORE.get()
                ];
            }
        );

        cc.log("普通关卡数据生成______________________________________________________");
        cc.log("" + JSON.stringify(normalLevelJSON));


        var spaceLevelJSON = {};
        cc.Defines.GAME_SPACE_LEVELS.forEach(
            function(_level)
            {
                spaceLevelJSON[_level.ID + 1] = [
                    _level.HISTORY_MAX_SCORE.get(),
                    _level.LAST_HISTORY_MAX_SCORE.get()
                ];
            }
        );

        cc.log("空间站关卡数据生成______________________________________________________");
        cc.log("" + JSON.stringify(spaceLevelJSON));

        _DB_OP_GAME_LEVELS.prepareLoadFinish();


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnAddItem50Callback: function()
    {
        for (var prop in Defines.GameItems)
        {
            if (Defines.GameItems.hasOwnProperty(prop))
            {
                cc.DataMng.getInstance().buyItemByID(Defines.GameItems[prop].ID, 50, 0);
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCleanItemCallback: function()
    {
        for (var prop in Defines.GameItems)
        {
            if (Defines.GameItems.hasOwnProperty(prop))
            {
                var itemData = cc.DataMng.getInstance().getItemByID(Defines.GameItems[prop].ID);
                itemData.Number.sub(999);
                itemData.Number.save();
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnAddHeartMaxRecover: function()
    {
        cc.DataMng.getInstance().addHeartRecoverMax(1);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnFloatLevelCallback: function()
    {
        /*this.closeWindow();
        Scene_FloatMap.changeTo(GUI.MAP_DEFINE.MAP_1);*/

        //
        var itemTxt = "";
        _GetItemsArr().forEach(
            function(each)
            {
                var itemData = cc.DataMng.getInstance().getItemByID(each.ID);
                itemTxt += (itemData.NAME + " = " + itemData.Number.get() + "\n");
            }
        );

        //
        itemTxt += ("GAME_CONTINUE" + " = " + cc.DataMng.getInstance().getGameContinueCount() + "\n");
        itemTxt += ("GAME_CANDY_URV" + " = " + cc.DataMng.getInstance().getHeartRecoverMax());

        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 225));
        this.getWindow().removeChildByTag(2002);
        this.getWindow().addChild(blockLayer, 0, 2002);

        //
        var msgLabel = cc.LabelTTF.create(itemTxt, Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        blockLayer.addChild(msgLabel);

        //
        var msgSize = msgLabel.getContentSize();
        var viewSize = cc.size(msgSize.width + 50 * Defines.BASE_SCALE, msgSize.height + 30 * Defines.BASE_SCALE);

        //
        blockLayer.setContentSize(cc.size(viewSize.width, viewSize.height));
        blockLayer.setPosition(cc.p(_ScreenWidth() * 0.5 - viewSize.width * 0.5, _ScreenHeight() * 0.5));
        msgLabel.setPosition(cc.p(viewSize.width * 0.5, viewSize.height * 0.5));

        //
        blockLayer.runAction(cc.Sequence.create(
            cc.DelayTime.create(5.0),
            cc.CallFunc.create(function(sender){
                sender.removeFromParent(true);
            }, this)
        ));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnShowDeviceInfoCallback: function()
    {
        if (this.m_NetLayer && this.m_NetLayer.isVisible())
        {
            this.m_MainUI.setAnchorPoint(cc.p(0.5, 0.5));
            this.m_MainUI.setPosition(_ScreenCenter());

            this.m_NetLayer.setVisible(false);
            return this;
        }

        //
        this.m_MainUI.setAnchorPoint(cc.p(0, 0.5));
        this.m_MainUI.setPosition(cc.p(_ScreenWidth()/2 - 140 * Defines.BASE_SCALE, _ScreenHeight()/2));

        if (!this.m_NetLayer)
        {
            this.m_NetLayer = this._createNetLayer();
            this.getWindow().addChild(this.m_NetLayer);
        }

        this.m_NetLayer.setVisible(true);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnShareInfoCallback: function()
    {
        ShareMng.getInstance().shareWithScoreTopUp({NAME:"Debug"});                              
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);

        //
        this.addContent();

        //
        //cc.TextureCache.getInstance().dumpCachedTextureInfo();

        //
        //GameCenterMng.getInstance().log();
        //GameCenterMng.getInstance().showScoreTop();
        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        //
        this.getWindow().removeAllChildren(true);

        //
        this.m_NetLayer = null;

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIDebugFunc._instance = null;
cc.GUIDebugFunc.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIDebugFunc();
        this._instance.init();
    }

    return this._instance;
};