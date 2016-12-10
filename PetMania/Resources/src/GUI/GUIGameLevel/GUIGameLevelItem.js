
//================================================== GUIGameLevel ===================================================
cc.GUIGameLevelItem = cc.Class.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        //
        this.m_MainUI = null;
        this.m_OriginPos = cc.p(0, 0);
        this.m_LabelDiamondCount = null;
        this.m_ButtonInfo = null;

        //
        this.m_ItemFlash = null;
        this.m_AvailableButtons = [];
        this.m_ItemCountLabels = [];
        this.m_DevoidContents = [];
        this.m_LockButtons = [];
		
		this.m_FreeContents = [];
		this.m_FreeInfo = [];
		this.m_FreeTip01 = false;
		this.m_FreeTip02 = false;

        this.m_LockGUIUpdate = false;
		
		this.goldenKeyOldTimes = 0;
		this.oldMove = 0;
		
		this.oldItemCheckTag = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function ()
    {
        //
        this.m_MainUI = cc.Sprite.createWithSpriteFrameName("game_panel_item.png");
        this.m_MainUI.setAnchorPoint(cc.p(0, 0));

        var mainSize = this.m_MainUI.getContentSize();

        var spriteConnect = cc.Sprite.createWithSpriteFrameName("game_connect_0.png");
        this.m_MainUI.addChild(spriteConnect);
        spriteConnect.setAnchorPoint(cc.p(1, 0.5));
        spriteConnect.setPosition(cc.p(0, mainSize.height * 0.4));

        this.m_MainUI.setPosition(cc.p(spriteConnect.getContentSize().width, 5));
        this.m_OriginPos = cc.p(24 * Defines.BASE_SCALE, 5 * Defines.BASE_SCALE);
		if (Defines._NeedFitIpad()){
			this.m_OriginPos.y = _ScreenHeight() * 0.25 - mainSize.height * 0.5;
		}
        //
        var itemLabelBackground = cc.Sprite.createWithSpriteFrameName("game_diamond_panel.png");
        this.m_MainUI.addChild(itemLabelBackground);
        itemLabelBackground.setPosition(mainSize.width * 0.5, mainSize.height * 0.84);

        var diamondUp = cc.Sprite.createWithSpriteFrameName("general_diamond_2.png");
        itemLabelBackground.addChild(diamondUp);
        diamondUp.setScale(0.8);
        diamondUp.setPosition(cc.p(30 * Defines.BASE_SCALE, itemLabelBackground.getContentSize().height * 0.5));

        this.m_LabelDiamondCount = GUI.createNumberLabel("", _GUIPath + "Num/num_3_14x18.png", 14, 18, "0");
        itemLabelBackground.addChild(this.m_LabelDiamondCount);
        this.m_LabelDiamondCount .setAnchorPoint(cc.p(0.5, 0.5));
        var panelSize = itemLabelBackground.getContentSize();
        this.m_LabelDiamondCount.setPosition(cc.p(panelSize.width * 0.63, panelSize.height * 0.5));

        //
        var itemMenu = cc.GUIMenu.create();
        itemMenu.setTouchHandle(cc.MENU_HANDLER_PRIORITY, false);
        this.m_MainUI.addChild(itemMenu);

        //
        this.m_ButtonInfo = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_item_help_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_item_help_sel.png"),
            this._btnItemHelpCallback, this);
        this.m_ButtonInfo.setPosition(cc.p(0, mainSize.height + 12 * Defines.BASE_SCALE));
        itemMenu.addChild(this.m_ButtonInfo);
        this.m_ButtonInfo.setVisible(cc.DataMng.getInstance().isItemContainerEnable(0));

        //
        var btnPositions = [
            cc.p(mainSize.width * 0.27, mainSize.height * 0.55),
            cc.p(mainSize.width * 0.71, mainSize.height * 0.55),
            cc.p(mainSize.width * 0.27, mainSize.height * 0.21),
            cc.p(mainSize.width * 0.71, mainSize.height * 0.21)
        ];

        //
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        var configItems = cc.DataMng.getInstance().getItemsWithLevelData(curLevelData);

        //
        var self = this;
        btnPositions.forEach(function (position, index)
        {
            if (configItems[index] && cc.DataMng.getInstance().isItemContainerEnable(index))
            {
                var itemButton = self._createItemButton(configItems[index]);
                itemMenu.addChild(itemButton);
                itemButton.setPosition(position);
                self.m_AvailableButtons.push(itemButton);
            }
            else
            {
            	var btnLock = cc.MenuItemSprite.create(
                    cc.Sprite.createWithSpriteFrameName("general_btn_item_nor.png"),
                    cc.Sprite.createWithSpriteFrameName("general_btn_item_sel.png"),
                    self._btnLockCallback, self);

                var spriteLock = cc.Sprite.createWithSpriteFrameName("general_item_lock.png");
                btnLock.addChild(spriteLock);
                var btnSize = btnLock.getContentSize();
                spriteLock.setPosition(cc.p(btnSize.width * 0.5, btnSize.height * 0.55));

                btnLock.setPosition(position);
                itemMenu.addChild(btnLock);
                btnLock.setTag(index);
                self.m_LockButtons.push(btnLock);
			}
        });

		btnPositions.forEach(function (position, index)
		{
			var Free_Flag = true;
			self.m_FreeInfo.push(Free_Flag);
		});

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _createItemButton: function(itemData)
    {
		//
        var itemButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_item_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_item_sel.png"),
            this._btnItemCallback, this);
        itemButton.setTag(itemData.ID);

        //
        var bgSize = itemButton.getContentSize();
		
		if (_IsGoldenKey(itemData.ID)){
			this.goldenKeySpr = cc.Sprite.createWithSpriteFrameName("icon_item_8_1.png");
			itemButton.addChild(this.goldenKeySpr,201);
			this.goldenKeySpr.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.55));
			this.goldenKeySpr.setScale(68/130);
		
			this.goldenKeyStar = cc.Sprite.createWithSpriteFrameName("goldenKeyStar_0.png");
			itemButton.addChild(this.goldenKeyStar,204);
			this.goldenKeyStar.setPosition(cc.p(bgSize.width * 0.1, bgSize.height * 0.9));
			this.goldenKeyOldTimes = 0;
			
			this.goldenKeySpr_2 = cc.Sprite.createWithSpriteFrameName("icon_item_8_2.png");
			itemButton.addChild(this.goldenKeySpr_2,201);
			this.goldenKeySpr_2.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.55));
			this.goldenKeySpr_2.setScale(68/130);

			this.goldenKeySpr_3 = cc.Sprite.createWithSpriteFrameName("icon_item_8_3.png");
			itemButton.addChild(this.goldenKeySpr_3,201);
			this.goldenKeySpr_3.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.55));
			this.goldenKeySpr_3.setScale(68/130);
			
			this.setGoldenKeySpr(1);
		}
		else {
			var itemSprite = cc.Sprite.createWithSpriteFrameName(itemData.SPRITESOURCE);
			itemButton.addChild(itemSprite,201);
			itemSprite.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.55));
			itemSprite.setScale(68/130);
		}
		
        var countLabel = GUI.createNumberLabel("", _GUIPath + "Num/num_1_18x22.png", 18, 22, "0");
        itemButton.addChild(countLabel,203);
        countLabel.setAnchorPoint(cc.p(0.5, 0.5));
        countLabel.setPosition(cc.p(bgSize.width * 0.78, bgSize.height * 0.82));
        this.m_ItemCountLabels.push(countLabel);

        //
        var devoidContent = cc.Sprite.createWithSpriteFrameName("game_panel_price.png");
        itemButton.addChild(devoidContent,204);
        devoidContent.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.25));
        devoidContent.setVisible(false);

        var panelSize = devoidContent.getContentSize();

		var diamondUp = cc.Sprite.createWithSpriteFrameName("general_diamond_2.png");
		devoidContent.addChild(diamondUp);
		diamondUp.setScale(0.5);
		diamondUp.setPosition(cc.p(panelSize.width * 0.25, panelSize.height * 0.5));

		var shopData = GUI.getShopDataWithItemID(itemData.ID);
		var price = shopData ? shopData.UNIT_PRICE.get() : 0;
		var itemPriceLabel = GUI.createNumberLabel(price.toString(), _GUIPath + "Num/num_4_10x12.png", 10, 12, "0");
		itemPriceLabel.setAnchorPoint(cc.p(0, 0.5));
		itemPriceLabel.setPosition(cc.p(panelSize.width * 0.38, panelSize.height * 0.5));
		devoidContent.addChild(itemPriceLabel);
        this.m_DevoidContents.push(devoidContent);
		
		var gameLevelData = cc.DataMng.getInstance().getCurLevelData();
		var key = "FreeItems_" + gameLevelData.NAME ;
		if (gameLevelData.FREE_ITEM && !cc.DataMng.getInstance().isGameLevelGuidFinish(key, false))//添加免费道具的教学接口
		{
			var freeContent = cc.Sprite.createWithSpriteFrameName("game_panel_price.png");
			itemButton.addChild(freeContent,204);
			freeContent.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.25));
			freeContent.setVisible(false);
			if (Defines.IS_EN){
				itemPriceLabel = cc.LabelTTF.create("Free", Defines.DefaultFont, 18 * Defines.BASE_SCALE);
			}
			else if (Defines.IS_KO){
				itemPriceLabel = cc.LabelTTF.create("무료", Defines.DefaultFont, 18 * Defines.BASE_SCALE);
			}
			else {
				itemPriceLabel = cc.LabelTTF.create("免费", Defines.DefaultFont, 18 * Defines.BASE_SCALE);
			}
			itemPriceLabel.setAnchorPoint(cc.p(0.5, 0.5));
			itemPriceLabel.setPosition(cc.p(panelSize.width * 0.5, panelSize.height * 0.5));
			freeContent.addChild(itemPriceLabel);
			this.m_FreeContents.push(freeContent);
			
			this.m_FreeTip01 = true;
		}
  
        return itemButton;
    },
    //------------------------------------------------------------------------------------------------------------------
    setGoldenKeySpr:function(sprIndex)
    {
		this.goldenKeySpr.setVisible(false);
		this.goldenKeySpr_2.setVisible(false);
		this.goldenKeySpr_3.setVisible(false);
		if (sprIndex == 1){
			this.goldenKeySpr.setVisible(true);
		}
		else if (sprIndex == 2){
			this.goldenKeySpr_2.setVisible(true);
		}
		else if (sprIndex == 3){
			this.goldenKeySpr_3.setVisible(true);
		}
	},
	//------------------------------------------------------------------------------------------------------------------
    refreshGoldenKeyItem:function()
	{
		var self = this;
		
		this.m_AvailableButtons.forEach(function(each, index)
        {
			var itemData = cc.DataMng.getInstance().getItemByID(each.getTag());
			var bgSize = each.getContentSize();

            if (_IsGoldenKey(itemData.ID)){
				var goldenKeyTimes = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().getCreateObjectContent("Touch_ByItemToMonsGoldenKey_new");
					
				if (self.goldenKeyOldTimes != goldenKeyTimes && goldenKeyTimes < 8 && self.goldenKeySpr){
					if (goldenKeyTimes >= 3){
						if (goldenKeyTimes < 6){
							self.setGoldenKeySpr(2);
						}
						else {
							self.setGoldenKeySpr(3);
						}
					}
					else {
						self.setGoldenKeySpr(1);
					}
				}

				if (self.goldenKeyOldTimes != goldenKeyTimes && goldenKeyTimes < 7 && goldenKeyTimes > 0){
					if (self.goldenKeyStar){
						self.goldenKeyStar.removeFromParent();
						self.goldenKeyStar = cc.Sprite.createWithSpriteFrameName("goldenKeyStar_" + goldenKeyTimes.toString() + ".png");
						each.addChild(self.goldenKeyStar,204);
						self.goldenKeyStar.setPosition(cc.p(bgSize.width * 0.1, bgSize.height * 0.9));
		//						self.goldenKeyStar.setScale(80/130);
					}
				}
				if (self.goldenKeyOldTimes != goldenKeyTimes){
					self.oldMove = cc.DataMng.getInstance().getCurTouchMoves();
					self.goldenKeyOldTimes = goldenKeyTimes;
				}
			}
		});
	},
    //------------------------------------------------------------------------------------------------------------------
    updateItemInfo:function()
    {
        if (this.isLockGUIUpdate())
        {
            return this;
        }

        //
        var diamondCount = cc.DataMng.getInstance().getMoney();
        if (diamondCount != parseInt(this.m_LabelDiamondCount.getString()))
        {
            this.m_LabelDiamondCount.setString(diamondCount.toString());

            this.m_LabelDiamondCount.stopAllActions();
            this.m_LabelDiamondCount.runAction(cc.Sequence.create(
                cc.ScaleTo.create(Defines.FPS * 7, 1.5),
                cc.ScaleTo.create(Defines.FPS * 7, 1)
            ));
        }

        //
        var self = this;
        this.m_AvailableButtons.forEach(function(each, index)
        {
            var itemData = cc.DataMng.getInstance().getItemByID(each.getTag());
            var itemNum = itemData.Number.get();
			var bgSize = each.getContentSize();

			var gameLevelData = cc.DataMng.getInstance().getCurLevelData();
			var key = "FreeItems_" + gameLevelData.NAME;

//			if (!cc.DataMng.getInstance().isGameLevelGuidFinish(key, false)){
			if (gameLevelData.FREE_ITEM && !cc.DataMng.getInstance().isGameLevelGuidFinish(key, false) && self.m_FreeInfo[index]){
				self.m_FreeContents[index].setVisible(true);
				self.m_ItemCountLabels[index].setVisible(false);
				self.m_DevoidContents[index].setVisible(false);
			}
			else {
				if (gameLevelData.FREE_ITEM && !cc.DataMng.getInstance().isGameLevelGuidFinish(key, false))
				{
					self.m_FreeContents[index].setVisible(false);
				}
				if (itemNum <= 0)
				{
					self.m_ItemCountLabels[index].setVisible(false);
					self.m_DevoidContents[index].setVisible(Defines._CanPayDiamond());
				}
				else
				{
					self.m_ItemCountLabels[index].setVisible(true);
					self.m_DevoidContents[index].setVisible(false);

					if (itemNum != parseInt(self.m_ItemCountLabels[index].getString()))
					{
						self.m_ItemCountLabels[index].setString(itemNum.toString());
						var labelBgSize = self.m_ItemCountLabels[index].getParent().getContentSize();
						var labelSize = self.m_ItemCountLabels[index].getContentSize();
						self.m_ItemCountLabels[index].setPositionX(labelBgSize.width - labelSize.width * 0.5 - 5 * Defines.BASE_SCALE);

						self.m_ItemCountLabels[index].stopAllActions();
						self.m_ItemCountLabels[index].runAction(cc.Sequence.create(
							cc.ScaleTo.create(Defines.FPS * 7, 1.5),
							cc.ScaleTo.create(Defines.FPS * 7, 1)
						));
					}
				}
			}
        });

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateItemPrompt: function()
    {
		var self = this;
        //游戏已经有了结果，不管胜利还是失败
        if (cc.DataMng.getInstance().getGameLevelResult())
        {
            return this;
        }

        if (this.m_AvailableButtons.length <= 0)
        {
            return this;
        }

        //时间模式暂时不提示
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();

        if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_TIME
            || curLevelData.MODEL_MIX == Defines.TARGET_MODEL.MODEL_TIME)
        {
            return this;
        }
		this.m_AvailableButtons.forEach(
            function(each)
            {
				var buttonItem = each;//Tools.arrayRandom(this.m_AvailableButtons);
				var buttonSize = buttonItem.getContentSize();
				var itemData = cc.DataMng.getInstance().getItemByID(each.getTag());
				if (itemData.NAME == "ITEM_GOLDEN_KEY"){
					var goldenKeyTimes = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().getCreateObjectContent("Touch_ByItemToMonsGoldenKey_new");
					
					var pastMove = cc.DataMng.getInstance().getCurTouchMoves() - self.oldMove;
					
					if (self.goldenKeyOldTimes == goldenKeyTimes && goldenKeyTimes > 0){//没使用火流星时的回退效果
						var changeFlag = false;
						if (pastMove >= 3 && goldenKeyTimes <= 3){
							changeFlag = true;
						}
						if (pastMove >= 2 && goldenKeyTimes > 3 && goldenKeyTimes < 7){
							changeFlag = true;
						}
						if (pastMove >= 1 && goldenKeyTimes >=7){
							changeFlag = true;
						}
						if (changeFlag){
							if (goldenKeyTimes == 7){
								goldenKeyTimes -= 2;
							}
							else{
								goldenKeyTimes --;
							}
							self.oldMove = cc.DataMng.getInstance().getCurTouchMoves();
							DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().setCreateObjectContent("Touch_ByItemToMonsGoldenKey_new", goldenKeyTimes);
						}
					}
										
					if (self.goldenKeyOldTimes != goldenKeyTimes && goldenKeyTimes < 8 && self.goldenKeySpr){
						if (goldenKeyTimes > 3){
							if (goldenKeyTimes < 7){
								self.setGoldenKeySpr(2);
							}
							else {
								self.setGoldenKeySpr(3);
							}
						}
						else {
							self.setGoldenKeySpr(1);
						}
					}
					if (self.goldenKeyOldTimes != goldenKeyTimes && goldenKeyTimes < 7){
						if (self.goldenKeyStar){
							self.goldenKeyStar.removeFromParent();
							self.goldenKeyStar = cc.Sprite.createWithSpriteFrameName("goldenKeyStar_" + goldenKeyTimes.toString() + ".png");
							self.goldenKeyOldTimes = goldenKeyTimes;
							each.addChild(self.goldenKeyStar,204);
							self.goldenKeyStar.setPosition(cc.p(buttonSize.width * 0.1, buttonSize.height * 0.9));
	//						self.goldenKeyStar.setScale(80/130);
						}
					}
				}
            }
        );

        //
        var leftMoves = cc.DataMng.getInstance().getLeftTouchMoves();
        if (leftMoves > 5 || leftMoves <= 0)
        {
            return this;
        }

        //
        var handle = false;

        //
        this.m_AvailableButtons.forEach(
            function(each)
            {
                if (each.m_PromptAction)
                {
                    handle = true;
                }
            }
        );

        //已经有闪光提示
        if (handle)
        {
            return this;
        }

        //
		this.m_AvailableButtons.forEach(
            function(each)
            {
				var buttonItem = each;
				var buttonSize = buttonItem.getContentSize();
				
				//
				var particlePrompt = cc.ParticleSystem.create(_GUIPath + "GUIGameLevel/item_prompt_particle.plist");
				buttonItem.addChild(particlePrompt, 1001);
				particlePrompt.setPosition(cc.p(buttonSize.width/2, buttonSize.height/2));
				particlePrompt.setScale(Defines.BASE_SCALE);

				//
				var spritePrompt = cc.Sprite.createWithSpriteFrameName("game_item_prompt.png");
				buttonItem.addChild(spritePrompt, 1000);
				spritePrompt.setPosition(cc.p(buttonSize.width/2, buttonSize.height/2));
				spritePrompt.setOpacity(0);
				
				var promptBase = cc.Sequence.create(
					cc.FadeTo.create(0.4, 255),
					cc.FadeTo.create(0.4, 0),
					cc.FadeTo.create(0.4, 255),
					cc.FadeTo.create(0.4, 0),
					cc.DelayTime.create(0.4));

				var promptFinish = cc.CallFunc.create(function(sender){
					sender.removeFromParent(true);
					particlePrompt.removeFromParent(true);
					delete buttonItem.m_PromptAction;
				});

				var promptRepeat = cc.Sequence.create(promptBase, promptBase.copy(), promptBase.copy(), promptFinish);
				spritePrompt.runAction(cc.Repeat.create(promptRepeat, 3));
				//
				buttonItem.m_PromptAction = true;
            }
        );

        return this;
    },

	getItemFreeInfo: function()
	{
		return this.m_FreeInfo;
	},

    setItemFreeInfo: function(index, flag)
    {
        this.m_FreeInfo[index] = flag;

        return this.m_FreeInfo;
    },


    //------------------------------------------------------------------------------------------------------------------
    _btnItemCallback: function (sender)
    {
        var self = this;
		
		if (keyNotEnd){
			return ;
		}
		
		var gameLevelData = cc.DataMng.getInstance().getCurLevelData();
		if (this.m_FreeTip01)//添加免费道具的教学接口
        {	
			var key = "FreeItems_" + gameLevelData.NAME + "_01";
 
			if (!cc.DataMng.getInstance().isGameLevelGuidFinish(key, false)){
				var black = cc.GUIGameLevel.getInstance().getTotalButtonItemRectForGuide();
				_ChangeGameLevelStateTo(cc.State_GameGuide.getInstance());
				cc.log("guideHandle_Level_5_3 -- block (x : " + black.x + ",y : " + black.y + ",w : " + black.width + ",h : "+black.height+")");
				var blackList = [
					black
				];
				cc.GUIGuideNormal.getInstance().showCustomCuteMonsterBase(
					key,
					Resource.ChineseTxt[223],
					cc.GUIGameLevel.getInstance().getWindow().getParent(),
					blackList,
					true,
					cc.p(0,0)
				);
                cc.AudioMng.getInstance().playFreeItem();
				
				
				return this;
			}
			this.m_FreeTip01 = false;
			this.m_FreeTip02 = true;
		}
		
        //
        var curState = _GetCurGameLevelState();
        if (!curState)
        {
            return this;
        }

        //
        var stateOK = false;
        if (curState instanceof cc.State_GameLevel)
        {
            stateOK = _GameLevelStateWrapper.getGameLevel()
                && _GameLevelStateWrapper.getGameLevel().canTouch()
                && _GameLevelStateWrapper.getGameLevel().isStart();
        }
        else if (curState instanceof cc.State_GameItem)
        {
            stateOK = curState.canUse();
        }

		if (!stateOK && this.oldItemCheckTag && sender.getTag() == this.oldItemCheckTag && this.oldItemCheckTag == 10){
			_ChangeGameLevelStateTo(cc.State_GameLevel.getInstance(), "1100");
			cc.Guide.buy_GoldenKey = 0;
		}
        var itemID = sender.getTag();

		cc.log("stateOK = " + stateOK);

        if (!stateOK)
        {
            return this;
        }

        var curTouchItemNum = cc.DataMng.getInstance().getCurTouchItemNum();
		
				cc.log("curTouchItemNum =" + curTouchItemNum);
        if (itemID != 3 && itemID != 4 && itemID != 5 && curTouchItemNum > 0){
            return this;
        }

        //
        cc.AudioMng.getInstance().playButtonSound(true);

        //


		this.oldItemCheckTag = itemID;
        //
		if (this.m_FreeTip02 ){
			//cc.GUIGameLevel.getInstance().getGameItem().setLockGUIUpdate(true);

			this.m_AvailableButtons.forEach(function(each, index)
			{
				if (each.getTag() == itemID && self.m_FreeInfo[index])
				{
					self.m_FreeInfo[index] = false;
					if (index == 3){
						cc.Guide.buy_GoldenKey = -1;
						self.setLockGUIUpdate(false);
						cc.DataMng.getInstance().notifyGUIObservers(NOTIFY_EVENT.FOR_MONEY);
						cc.log("LockGUIUpdate = " + self.isLockGUIUpdate());
					}
					else {
						cc.DataMng.getInstance().buyItemByID(itemID, 1, 0);
					}

				}
				
			});
			var key02 = "FreeItemsUsed";
			cc.DataMng.getInstance().setGameLevelGuidFinish(key02);
			//cc.DataMng.getInstance().setGameLevelGuidFinish(key);
		}

        //
        var itemData = cc.DataMng.getInstance().getItemByID(itemID);
        var itemNum = itemData.Number.get();

        if (itemNum <= 0 && cc.Guide.buy_GoldenKey != -1)
        {
            var shopData = GUI.getShopDataWithItemID(itemID);
            if (!shopData)
            {
                cc.log("没有shopData????????????????????????");
                return this;
            }

            //不能使用钻石购买版本
            if (!Defines._CanPayDiamond())
            {
                if (Defines._NeedPayConfirm())
                {
                    cc.GUIBuyPrompt.getInstance().openWindow(_GUILayer(), shopData);
                }
                else
                {
                    _Pay_ByRMB(shopData);
                }

                return this;
            }

            //单个购买
            if (!cc.DataMng.getInstance().canSpendMoney(shopData.UNIT_PRICE.get()))
            {
                cc.GUIBuyDiamond.getInstance().openWindow(_GUILayer(), shopData.UNIT_PRICE.get(), GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND);
                return this;
            }
        }

        //
        this.cleanItemAnimate();

        this.m_ItemFlash = cc.Sprite.createWithSpriteFrameName("item_flash_new_0.png");
        sender.addChild(this.m_ItemFlash);
        this.m_ItemFlash.setPosition(cc.p(sender.getContentSize().width * 0.49, sender.getContentSize().height * 0.55));

        var itemFlashAnimate = cc.Animate.create(cc.Animation.create(
            cc.ResourceMng.getInstance().getAnimationFrames("item_flash_new_"), Defines.FPS * 2));
        this.m_ItemFlash.runAction(cc.RepeatForever.create(itemFlashAnimate));

        //
        var toWindowPos = cc.pAdd(this.m_MainUI.getPosition(), sender.getPosition());
        if (curState instanceof cc.State_GameLevel)
        {
            _ChangeGameLevelStateTo(cc.State_GameItem.getInstance().init(itemID, toWindowPos));
        }
        else if (curState instanceof cc.State_GameItem)
        {
            curState.useAgain(itemID, toWindowPos);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnLockCallback: function(/*sender*/)
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        cc.GUIMsgView.getInstance().openWindow(_GUILayer(), Resource.ChineseTxt["msg_1"]);
        return this;

        /*var handle = true;

        //
        var processLevelData = cc.DataMng.getInstance().getMaxProcessLevelData();

        //到第五关的时候才解锁
        if (!processLevelData.IS_SPACE_LEVEL && processLevelData.ID < 4)
        {
            handle = false;
        }

        //
        var curState = _GetCurGameLevelState();
        if (!curState)
        {
            return this;
        }

        if (curState instanceof cc.State_GameLevel)
        {
            //小怪物未下落完时，弹框再弹走会强行调向导
            var stateOK = _GameLevelStateWrapper.getGameLevel()
                && _GameLevelStateWrapper.getGameLevel().canTouch()
                && _GameLevelStateWrapper.getGameLevel().isStart();

            if (!stateOK)
            {
                return this;
            }
        }
        else
        {
            return this;
        }

        //
        var index = sender.getTag();
        if (index < 0 || index > 3)
        {
            return this;
        }

        //
        if (cc.DataMng.getInstance().isItemContainerEnable(index))
        {
            return this;
        }

        //
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        var strItems = curLevelData.ITEMS || [];

        var configItems= [];

        strItems.forEach(function(each)
        {
            if (Defines.GameItems[each])
            {
                configItems.push(Defines.GameItems[each]);
            }
        });

        //
        var myScene = cc.GUIGameLevel.getInstance().getWindow().getParent();
        cc.GUIUnlockItemContainer.getInstance().openWindow(myScene, index, configItems[index], handle);
        return this;*/
    },

    //------------------------------------------------------------------------------------------------------------------
    /*runUnlockAction: function()
    {
        //待 重构
        if (this.m_LockButtons.length <= 0)
        {
            return this;
        }

        //
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        var strItems = curLevelData.ITEMS || [];

        var configItems= [];

        strItems.forEach(function(each)
        {
            if (Defines.GameItems[each])
            {
                configItems.push(Defines.GameItems[each]);
            }
        });

        //
        var handleIndex = -1;

        this.m_LockButtons.forEach(
            function(each, index)
            {
                var itemID = each.getTag();

                if (cc.DataMng.getInstance().isItemContainerEnable(itemID))
                {
                    handleIndex = index;
                }
            }
        );

        //
        if (handleIndex < 0)
        {
            return this;
        }

        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        var btnPositions = [
            cc.p(mainSize.width * 0.27, mainSize.height * 0.55),
            cc.p(mainSize.width * 0.71, mainSize.height * 0.55),
            cc.p(mainSize.width * 0.27, mainSize.height * 0.21),
            cc.p(mainSize.width * 0.71, mainSize.height * 0.21)
        ];

        //
        var dataIndex = this.m_LockButtons[handleIndex].getTag();
        var itemMenu = this.m_LockButtons[handleIndex].getParent();

        //
        this.m_LockButtons[handleIndex].removeFromParent(true);
        this.m_LockButtons.splice(handleIndex, 1);

        //
        var itemButton = this._createItemButton(configItems[dataIndex]);
        itemMenu.addChild(itemButton);
        itemButton.setPosition(btnPositions[dataIndex]);

        this.m_AvailableButtons.push(itemButton);

        //
        this.updateItemInfo();

        //
        cc.ResourceMng.getInstance().addToCache(
            Resource.item_container_unlock_plist,
            Resource.item_container_unlock_png);

        //
        var unlockFrames = cc.ResourceMng.getInstance().getAnimationFrames("item_container_unlock_");
        var unlockAnimation = cc.Animation.create(unlockFrames, 1/25);

        var animSprite = cc.Sprite.createWithSpriteFrameName("item_container_unlock_0.png");
        itemButton.addChild(animSprite);
        var buttonSize = itemButton.getContentSize();
        animSprite.setPosition(cc.p(buttonSize.width * 0.5, buttonSize.height * 0.5));

        animSprite.runAction(cc.Sequence.create(
            cc.Animate.create(unlockAnimation),
            cc.CallFunc.create(function(sender){
                sender.removeFromParent(true);
            })
        ));

        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource.item_container_unlock_plist,
            Resource.item_container_unlock_png);

        return this;
    },*/

    //------------------------------------------------------------------------------------------------------------------
    _btnItemHelpCallback: function()
    {

        var curState = _GetCurGameLevelState();

        if (curState instanceof cc.State_GameCarnivalBase || curState instanceof cc.State_GameGuide){
            return this;
        }

        cc.AudioMng.getInstance().playButtonSound(true);

        //
        if (cc.GUIItemDesc.getInstance().isWindowOpen())
        {
            cc.GUIItemDesc.getInstance().closeWindow();
        }
        else
        {
            var curLevelData = cc.DataMng.getInstance().getCurLevelData();
            cc.GUIItemDesc.getInstance().openWindow(_GUILayer(), curLevelData);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getButtonItemRect: function(index)
    {
        var buttonItem = this.m_AvailableButtons[index] || this.m_LockButtons[3 - index];
        if (!buttonItem)
        {
            return null;
        }

        var size = buttonItem.getContentSize();
        var origin = cc.pSub(buttonItem.getPosition(), cc.p(size.width/2, size.height/2));
        origin = cc.pAdd(this.m_OriginPos, origin);
        return cc.rect(origin.x, origin.y, size.width, size.height);
    },

    //------------------------------------------------------------------------------------------------------------------
    getButtonItemTotalRect: function()
    {
        var rectTopRight = this.getButtonItemRect(1);
        var rectBottomLeft = this.getButtonItemRect(2);

        var sizeX = rectTopRight.x - rectBottomLeft.x + rectTopRight.width;
        var sizeY = rectTopRight.y - rectBottomLeft.y + rectTopRight.height;

        return cc.rect(rectBottomLeft.x, rectBottomLeft.y, sizeX, sizeY);
    },

    //------------------------------------------------------------------------------------------------------------------
    getMainUI: function()
    {
        return this.m_MainUI;
    },

    //------------------------------------------------------------------------------------------------------------------
    getItemButtonsForGuide: function()
    {
        return this.m_AvailableButtons.concat(this.m_LockButtons);
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanItemAnimate:function( )
    {
        if (this.m_ItemFlash && this.m_ItemFlash.getParent())
        {
            this.m_ItemFlash.removeFromParent(true);
            this.m_ItemFlash = null;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setLockGUIUpdate: function(setting)
    {
        this.m_LockGUIUpdate = setting;
        return this.isLockGUIUpdate();
    },

    //------------------------------------------------------------------------------------------------------------------
    isLockGUIUpdate: function()
    {
        return this.m_LockGUIUpdate;
    },

    //------------------------------------------------------------------------------------------------------------------
    renderNode: function(layer)
    {
        if (layer)
        {
            layer.addChild(this.m_MainUI);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        if (this.m_MainUI)
        {
            this.m_MainUI.removeAllChildren(true);
            this.m_MainUI.removeFromParent(true);
            this.m_MainUI = null;
        }

        this.setLockGUIUpdate(false);
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIGameLevelItem.create = function ()
{
    var createNew = new cc.GUIGameLevelItem();
    createNew.init();
    return createNew;
};

