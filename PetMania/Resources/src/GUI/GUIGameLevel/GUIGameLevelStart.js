
//====================================== GUIGameLevelStart ==========================================================
cc.GUIGameLevelStart = cc.GUIWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUIGameLevelStart";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        //
        this.m_LevelData = null;

        //
        this.m_Background = null;
        this.m_MainUI = null;
        this.m_Menu = null;

        //
        this.m_ButtonStart = null;
        this.m_ButtonBack = null;
        this.m_ButtonInfo = null;

        //
        this.m_GameLevelItems = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    init:function()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        this.addContentForMainUI();
        this.addContentForStars();
        this.addContentForItems();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentForMainUI:function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 100));
        this.getWindow().addChild(blockLayer);

        //
        this.m_Background = cc.Layer.create();
        this.getWindow().addChild(this.m_Background);

        //
        var friendWidth = isTelcomOperators() ? 0 : 100 * Defines.BASE_SCALE;
        var posX = (_ScreenWidth() - friendWidth) * 0.5;

        //
        this.m_MainUI = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back11.png");
        this.m_Background.addChild(this.m_MainUI);
        this.m_MainUI.setPosition(cc.p(posX, _ScreenHeight() * 0.5));

        //
        var mainSize =  this.m_MainUI.getContentSize();
        var mainPos = this.m_MainUI.getPosition();

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
        this.m_Menu = cc.Menu.create();
        this.m_Menu.setPosition(cc.p(0, 0));
        this.m_Background.addChild(this.m_Menu);

        //
        this.m_ButtonStart = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("start_end_btn_start_nor.png"),
            cc.Sprite.createWithSpriteFrameName("start_end_btn_start_sel.png"),
            this._btnStartGameCallback, this);
        this.m_ButtonStart.setPosition(cc.p(mainPos.x, mainPos.y - mainSize.height/2 + 20 * Defines.BASE_SCALE));
        this.m_Menu.addChild(this.m_ButtonStart);

        //
        this.m_ButtonBack = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_back_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_back_sel.png"),
            this._btnBackCallback, this);
        this.m_ButtonBack.setPosition(cc.p(70 * Defines.BASE_SCALE, 80 * Defines.BASE_SCALE));
        this.m_Menu.addChild(this.m_ButtonBack);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentForStars: function()
    {
        var mainSize =  this.m_MainUI.getContentSize();
        var starConfig = [
            {"scale": 0.9, "rotation": -15, "offset": cc.p(-180 * Defines.BASE_SCALE, -165 * Defines.BASE_SCALE)},
            {"scale": 1.0, "rotation":   0, "offset": cc.p(0, -145 * Defines.BASE_SCALE)},
            {"scale": 1.0, "rotation":  15, "offset": cc.p(185 * Defines.BASE_SCALE, -165 * Defines.BASE_SCALE)}
        ];

        var targets = this.m_LevelData.TARGET_SCORES.concat();
        var maxScore = this.m_LevelData.HISTORY_MAX_SCORE.getFaceValue();
        var starRate = Tools.getScoreRate(maxScore, targets);

        var self = this;
        starConfig.forEach(
            function(each, index)
            {
                var starFile = (index < starRate) ? "start_end_star_light.png" : "start_end_star_gray.png";
                var star = cc.Sprite.createWithSpriteFrameName(starFile);
                self.m_MainUI.addChild(star);
                star.setPosition(cc.pAdd(cc.p(mainSize.width/2, mainSize.height), each["offset"]));
                star.setRotation(each["rotation"]);
                star.setScale(each["scale"]);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentForItems:function()
    {
        //
        var mainSize =  this.m_MainUI.getContentSize();
        var mainPos = this.m_MainUI.getPosition();

        var itemBack = cc.Sprite.createWithSpriteFrameName("start_end_panel_item.png");
        itemBack.setPosition(cc.p(mainSize.width * 0.5, mainSize.width * 0.38));
        this.m_MainUI.addChild(itemBack);

        //
        this.m_ButtonInfo = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_item_help_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_item_help_sel.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_item_help_disabled.png"),
            this._btnItemHelpCallback, this
        );

        this.m_ButtonInfo.setPosition(
            cc.p(mainPos.x + mainSize.width/2 - 68 * Defines.BASE_SCALE,
                mainPos.y - mainSize.height/2 + 230 * Defines.BASE_SCALE));
        this.m_Menu.addChild(this.m_ButtonInfo);
        this.m_ButtonInfo.setEnabled(this.canHandleItemInfo());

        //道具槽
        var itemPositions = [
            cc.p(mainSize.width * 0.2, mainSize.height * 0.3),
            cc.p(mainSize.width * 0.4, mainSize.height * 0.3),
            cc.p(mainSize.width * 0.6, mainSize.height * 0.3),
            cc.p(mainSize.width * 0.8, mainSize.height * 0.3)
        ];

        //
        var self = this;
        var configItems = cc.DataMng.getInstance().getItemsWithLevelData(this.m_LevelData);
        itemPositions.forEach(function(position, index)
        {
            if (configItems[index] && cc.DataMng.getInstance().isItemContainerEnable(index))
            {
                var gameItem = cc.GUINewGameLevelStartItem.create(index, configItems[index].ID);
            }
            else
            {
                gameItem = cc.GUINewGameLevelStartItemLock.create(index, configItems[index].ID);
            }

            gameItem.renderNode(self.m_MainUI);
            gameItem.setPosition(itemPositions[index]);

            self.m_GameLevelItems.push(gameItem);
        });

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    canHandleItemInfo: function()
    {
        return cc.DataMng.getInstance().isItemContainerEnable(0);
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnItemHelpCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        if (cc.GUIItemDesc.getInstance().isWindowOpen())
        {
            cc.GUIItemDesc.getInstance().closeWindow();
        }
        else
        {
            var myScene = this.getWindow().getParent();
            cc.GUIItemDesc.getInstance().openWindow(myScene, this.m_LevelData);
        }

        return this;
    },

    _getFreeCandyFlag: function()
    {
		var self = this;
		
        var callBack = function(result, flag){
            if (result){
                if (!flag){
                    cc.DataMng.getInstance().desHeart(1);
                    cc.DataMng.getInstance().coverFreeCandyData(0);
                }
                else {
                    cc.log("在无限薄荷糖期间");
                }
				
				self._enterGame();
            }
            else {
                cc.log("4021 ---获取失败");
            }
        }
        cc.NodeSelf.getInstance().asyncGetUnlimitedCandyGift(callBack);

    },
	
	_enterGame: function()
	{
	    this.closeWindow();

        cc.DataMng.getInstance().setCurLevelData(this.m_LevelData);
        Scene_GameLevel.changeTo();

        //
        BIMng.getInstance().logPlayGameLevel();
	},

    //------------------------------------------------------------------------------------------------------------------
    _btnStartGameCallback: function()
    {
        cc.AudioMng.getInstance().playButtonGameLevelStar();
//        cc.AudioMng.getInstance().playButtonSound(true);

        //


        //linhao
        //this._getFreeCandyFlag();
        this._enterGame();

        //
        // ItemPack.getInstance().addHeartRecord(
        //     ItemRecord.create(HEART_SOURCE.SOURCE_SUB_HEART_FOR_ENTER_GAME_LEVEL, -1)
        // ).save();


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnBackCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        this.handleStartLeaveAction(true,
            function()
            {
                this.closeWindow();
            },
            this
        );

        //
        if (cc.GUIMap.getInstance().isWindowOpen())
        {
            cc.GUIMap.getInstance().handleMapEnterAction(true);
        }
        else if (cc.GUIFloatMap.getInstance().isWindowOpen())
        {
            cc.GUIFloatMap.getInstance().handleFloatEnterAction(true);
        }

        //
        if(!isTelcomOperators() && cc.NodeSelf.getInstance().isLogin())
        {
            cc.GUIMyFriendsTop.getInstance().closeWindow();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    /*reloadGameItemContainer: function()
    {
        //
        var mainSize = this.m_MainUI.getContentSize();
        var itemPositions = [
            cc.p(mainSize.width * 0.2, mainSize.height * 0.3),
            cc.p(mainSize.width * 0.4, mainSize.height * 0.3),
            cc.p(mainSize.width * 0.6, mainSize.height * 0.3),
            cc.p(mainSize.width * 0.8, mainSize.height * 0.3)
        ];

        //
        var self = this;
        var handle = false;
        var configItems = cc.DataMng.getInstance().getItemsWithLevelData(this.m_LevelData);
        this.m_GameLevelItems.forEach(
            function(each, index, array)
            {
                if (each instanceof cc.GUINewGameLevelStartItemLock && cc.DataMng.getInstance().isItemContainerEnable(index))
                {
                    each.release();

                    var itemData = configItems[index];
                    array[index] = cc.GUINewGameLevelStartItem.create(index, itemData.ID);
                    array[index].renderNode(self.m_MainUI);
                    array[index].setPosition(itemPositions[index]);

                    //
                    if (!handle)
                    {
                        cc.ResourceMng.getInstance().addToCache(
                            Resource.item_container_unlock_plist,
                            Resource.item_container_unlock_png);

                        handle = true;
                    }

                    //
                    var unlockFrames = cc.ResourceMng.getInstance().getAnimationFrames("item_container_unlock_");
                    var unlockAnimation = cc.Animation.create(unlockFrames, 1/25);

                    var animSprite = cc.Sprite.createWithSpriteFrameName("item_container_unlock_0.png");
                    array[index].m_AvailableItem.addChild(animSprite);
                    var buttonSize = array[index].m_AvailableItem.getContentSize();
                    animSprite.setPosition(cc.p(buttonSize.width * 0.5, buttonSize.height * 0.5));

                    animSprite.runAction(cc.Sequence.create(
                        cc.Animate.create(unlockAnimation),
                        cc.CallFunc.create(function(sender){
                            sender.removeFromParent(true);
                        })
                    ));
                }
            }
        );

        //
        if (handle)
        {
            cc.ResourceMng.getInstance().removeFromCache(
                Resource.item_container_unlock_plist,
                Resource.item_container_unlock_png);
        }

        return this;
    },*/

    //------------------------------------------------------------------------------------------------------------------
    getGameLevelData: function()
    {
        return this.m_LevelData;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleStartEnterAction: function(isAnimate)
    {
        if (isAnimate)
        {
            this.m_Background.stopAllActions();
            this.m_Background.setScale(0);
            this.m_Background.runAction(cc.ScaleTo.create(0.15, 1));
        }
        else
        {
            this.m_Background.setScale(1);
        }

         return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleStartLeaveAction: function(isAnimate, callback, target)
    {
        if (isAnimate)
        {
            this.m_Background.stopAllActions();
            this.m_Background.runAction(cc.Sequence.create(
                cc.ScaleTo.create(0.15, 0),
                cc.CallFunc.create(callback, target)
            ));
        }
        else
        {
            this.m_Background.setScale(0);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyOpenWindow: function(window)
    {
        if (window instanceof cc.GUIGuideNormal)
        {
            this.m_ButtonStart.setEnabled(false);
            this.m_ButtonBack.setEnabled(false);
            this.m_ButtonInfo.setEnabled(false);

            this.m_GameLevelItems.forEach(
                function(each)
                {
                    each.setEnabled(false);
                }
            );
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyCloseWindow: function(window)
    {
        if (window instanceof cc.GUIGuideNormal)
        {
            this.m_ButtonStart.setEnabled(true);
            this.m_ButtonBack.setEnabled(true);
            this.m_ButtonInfo.setEnabled(this.canHandleItemInfo());

            this.m_GameLevelItems.forEach(
                function(each)
                {
                    each.setEnabled(true);
                }
            );
        }

        //
        /*if (window instanceof cc.GUIUnlockItemContainer)
        {
            this.reloadGameItemContainer();
        }*/

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
            cc.log("GUIGameLevelStart：覆盖数据后，关闭窗口");
            this._btnBackCallback();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(sender, levelData)
    {
        if (cc.GUIMiniFriendsTop.getInstance().isWindowOpen()){
            cc.GUIMiniFriendsTop.getInstance().closeWindow();
        }
        this._super(sender);

        //
        cc.ResourceMng.getInstance().addToCache(
            Resource._GUIGameLevel_Start_EndWin_EndFail_plist,
            Resource._GUIGameLevel_Start_EndWin_EndFail_png);

        //
        this.m_LevelData = levelData;
        this.addContent();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        //
        this.m_GameLevelItems.forEach(function(each)
        {
            each.release();
        });

        this.m_GameLevelItems = [];

        //
        this.getWindow().removeAllChildren(true);

        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUIGameLevel_Start_EndWin_EndFail_plist,
            Resource._GUIGameLevel_Start_EndWin_EndFail_png);

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});


cc.GUIGameLevelStart._instance = null;
cc.GUIGameLevelStart.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIGameLevelStart();
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


/**
 * 四种状态
 * 1.Available
 * 2.Equipped
 * 3.Devoid
 * 4.Locked
 *
 * 两类
 * lock
 * unlock
 */
//====================================== GUINewGameLevelStartItemLock =========================================================
cc.GUINewGameLevelStartItemLock = cc.Class.extend({

    ctor: function()
    {
        this.m_ItemID = null;
        this.m_ItemMenu = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(index, itemID)
    {
        //
        this.m_ItemID = itemID;

        //
        var lockItem = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_item_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_item_sel.png"),
            this._btnLockedItemCallback, this);
        lockItem.setTag(index);

        //
        var spriteLock = cc.Sprite.createWithSpriteFrameName("general_item_lock.png");
        lockItem.addChild(spriteLock);
        var btnSize = lockItem.getContentSize();
        spriteLock.setPosition(cc.p(btnSize.width * 0.5, btnSize.height * 0.55));

        //
        this.m_ItemMenu = cc.Menu.create(lockItem);
        this.m_ItemMenu.setPosition(cc.p(0, 0));
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnLockedItemCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        var myScene = cc.Director.getInstance().getRunningScene();
        cc.GUIMsgView.getInstance().openWindow(myScene, Resource.ChineseTxt["msg_1"]);
        return this;

        /*var handle = true;

        //
        var processLevelData = cc.DataMng.getInstance().getMaxProcessLevelData();

        //到第五关的时候才解锁
        if (!processLevelData.IS_SPACE_LEVEL && processLevelData.ID < 4)
        {
            handle = false;
        }

        //第五关时且向导未完
        var selLevelData = cc.GUIGameLevelStart.getInstance().getGameLevelData();
        if (processLevelData.NAME == "LEVEL_5" && selLevelData.NAME == "LEVEL_5" && cc.Guide.round < 4)
        {
            handle = false;
            var fourthDirty = true;
        }

        cc.AudioMng.getInstance().playButtonSound(true);

        //
        var index = sender.getTag();

        if (index < 0 || index > 3)
        {
            return this;
        }

        if (cc.DataMng.getInstance().isItemContainerEnable(index))
        {
            return this;
        }

        //
        var itemData = cc.DataMng.getInstance().getItemByID(this.m_ItemID);
        var myScene = cc.GUIGameLevelStart.getInstance().getWindow().getParent();
        cc.GUIUnlockItemContainer.getInstance().openWindow(myScene, index, itemData, handle, fourthDirty);
        return this;*/
    },

    //------------------------------------------------------------------------------------------------------------------
    setPosition: function (position)
    {
        this.m_ItemMenu.getChildren().forEach(
            function(each)
            {
                each.setPosition(position);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setEnabled: function(isEnabled)
    {
        this.m_ItemMenu.setEnabled(isEnabled);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    renderNode: function (layer)
    {
        if (layer && !this.m_ItemMenu.getParent())
        {
            layer.addChild(this.m_ItemMenu);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        if (this.m_ItemMenu)
        {
            this.m_ItemMenu.removeFromParent(true);
            this.m_ItemMenu = null;
        }

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUINewGameLevelStartItemLock.create = function(index, itemID)
{
    var createNew = new cc.GUINewGameLevelStartItemLock();
    createNew.init(index, itemID);
    return createNew;
};


//====================================== GUINewGameLevelStartItem =========================================================
cc.GUINewGameLevelStartItem = cc.Class.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this.m_ItemID = null;
        this.m_ItemMenu = null;
        this.m_ButtonAdd = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function (index, itemID)
    {
        this.m_ItemID = itemID;
        var itemData = cc.DataMng.getInstance().getItemByID(this.m_ItemID);

        //1
        var buttonItem = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_item_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_item_sel.png"),
            this._btnToShopCallback, this);
        buttonItem.setTag(index);

        //
        this.m_ItemMenu = cc.Menu.create(buttonItem);
        this.m_ItemMenu.setPosition(cc.p(0, 0));

        //
        var contentSize = buttonItem.getContentSize();

        //
        if (itemData && itemData.SPRITESOURCE)
        {
            var itemSprite = cc.Sprite.createWithSpriteFrameName(itemData.SPRITESOURCE);
            buttonItem.addChild(itemSprite);
            itemSprite.setScale(68/130);
            itemSprite.setPosition(cc.p(contentSize.width *0.5, contentSize.height * 0.55));
        }

        //
        if (itemData.Number.get() > 0)
        {
            var labelCount = GUI.createNumberLabel(itemData.Number.get().toString(),
                _GUIPath + "Num/num_1_18x22.png", 18, 22, "0");
            buttonItem.addChild(labelCount);
            labelCount.setAnchorPoint(cc.p(0.5, 0.5));
            var labelSize = labelCount.getContentSize();
            labelCount.setPosition(cc.p(contentSize.width - labelSize.width * 0.5 - 5 * Defines.BASE_SCALE, contentSize.height * 0.82));
        }
        else
        {
            this.m_ButtonAdd = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("general_btn_add_nor.png"),
                cc.Sprite.createWithSpriteFrameName("general_btn_add_sel.png"),
                this._btnToShopCallback, this);
            this.m_ButtonAdd.setPosition(cc.p(contentSize.width - 15 * Defines.BASE_SCALE, contentSize.height - 15 * Defines.BASE_SCALE));

            var addMenu = cc.Menu.create(this.m_ButtonAdd);
            addMenu.setPosition(cc.p(0, 0));
            buttonItem.addChild(addMenu);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnToShopCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        var gameLevelData = cc.GUIGameLevelStart.getInstance().getGameLevelData();
        cc.GUIGameLevelStart.getInstance().closeWindow();
        Scene_Shop.changeTo(GUI.SHOP_ITEM_TYPE.SHOP_ITEM_ITEM, gameLevelData.NAME);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setPosition: function (position)
    {
        this.m_ItemMenu.getChildren().forEach(
            function(each)
            {
                each.setPosition(position);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setEnabled: function(isEnabled)
    {
        this.m_ItemMenu.setEnabled(isEnabled);

        if (this.m_ButtonAdd)
        {
            this.m_ButtonAdd.setEnabled(isEnabled);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    renderNode: function (layer)
    {
        if (layer && !this.m_ItemMenu.getParent())
        {
            layer.addChild(this.m_ItemMenu);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        if (this.m_ItemMenu)
        {
            this.m_ItemMenu.removeFromParent(true);
            this.m_ItemMenu = null;
        }

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUINewGameLevelStartItem.create = function(index, itemID)
{
    var createNew = new cc.GUINewGameLevelStartItem();
    createNew.init(index, itemID);
    return createNew;
};