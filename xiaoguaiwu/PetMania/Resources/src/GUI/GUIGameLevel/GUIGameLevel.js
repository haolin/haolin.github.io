//================================================== GUIGameLevel ===================================================
cc.GUIGameLevel = cc.GUIWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUIGameLevel";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        this.m_GameInfo = null;
        this.m_GameItem = null;
        this.m_GameProgress = null;

        this.m_PauseButton = null;
		this.blackScreen = null;
        this.desLabel = null;
		
		this.m_pauseClosed = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._super();
        return this;
    },

	setPauseButton: function(flag){
		this.m_pauseClosed = flag;
	},

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        this.m_PauseButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("game_btn_pause_nor.png"),
            cc.Sprite.createWithSpriteFrameName("game_btn_pause_sel.png"),
            this._btnPauseCallback, this);
        this.m_PauseButton.setPosition(cc.pSub(_ScreenTopRight(), cc.p(50, 36)));

        var pauseMenu = cc.Menu.create(this.m_PauseButton);
        pauseMenu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(pauseMenu);

        //
        this.m_AniLightFront = cc.Sprite.createWithSpriteFrameName("escape_door_light.png");
        this.getWindow().addChild(this.m_AniLightFront, -1);
        this.m_AniLightFront.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
        this.m_AniLightFront.setPosition(cc.pSub(_ScreenBottomRight(), cc.p(45 * Defines.BASE_SCALE, -50 * Defines.BASE_SCALE)));
		
		if (Defines._NeedFitIpad())
        {
			this.m_AniLightFront.setPosition(cc.pSub(_ScreenBottomRight(), cc.p(45 * Defines.BASE_SCALE, -120 * Defines.BASE_SCALE)));
		}

        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_MINELOTTERY){
            var destroy1 = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterMineDesLine");
            destroy1 = destroy1 || 0;

            var orignalPanel = cc.Sprite.createWithSpriteFrameName("fengeceng.png");
            var orignalSize = orignalPanel.getContentSize();
            var gridSize = Defines.TABLE_GRID_SIZE;
            var targetSize = cc.size(gridSize * 9.7, orignalSize.height);

            this.desLabel = GUI.createNumberLabel(destroy1.toString(),_GUIPath + "Num/num_1_18x22.png", 18, 22,"0");
            gameTableLayer().addChild(this.desLabel , Defines.BATCH_NODE.OBJECT_GATE.Z + 1);
            this.desLabel.setAnchorPoint(cc.p(0.5, 0.5));

            var heightOffSet = (_ScreenHeight() - gridSize * 11)/2 + gridSize * 4;
            this.desLabel.setPosition(cc.p(_ScreenWidth()/2 + gridSize*1.25 + targetSize.width* 0.46, heightOffSet));
            this.desLabel.setScale(0.85);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getGameItem: function()
    {
        return this.m_GameItem;
    },

    //------------------------------------------------------------------------------------------------------------------
    getPauseButton: function()
    {
        return this.m_PauseButton;
    },

    //------------------------------------------------------------------------------------------------------------------
    getGuidePromptPositions: function()
    {
        var promptPositions = [];

        if (this.m_GameInfo)
        {
            promptPositions = promptPositions.concat(this.m_GameInfo.getGuidePromptPositions());
        }

        return promptPositions;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMovesRectForGuide: function()
    {
        if (this.m_GameInfo)
        {
            return this.m_GameInfo.getMovesRect();
        }

        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    getTimeRectForGuide: function()
    {
        if (this.m_GameInfo)
        {
            return this.m_GameInfo.getTimeRect();
        }

        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    getTargetRectForGuide: function()
    {
        if (this.m_GameInfo)
        {
            return this.m_GameInfo.getTargetRect();
        }

        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    getButtonItemRectForGuide: function(index)
    {
        if (this.m_GameItem)
        {
            return this.m_GameItem.getButtonItemRect(index);
        }

        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    getTotalButtonItemRectForGuide: function()
    {
        if (this.m_GameItem)
        {
            return this.m_GameItem.getButtonItemTotalRect();
        }

        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    getGameProgressTopPosForMiningGame: function()
    {
        if (this.m_GameProgress)
        {
            return this.m_GameProgress.getTopPos();
        }

        return null;
    },

    addGameWinAD: function()
    {
        var self = this;
//        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
//
//        var adFLag = false;
//
//        var nowID =curLevelData.ID + 1;
//        if (nowID % 5 != 1){
//            adFLag = true;
//        }
//
//        adFLag = Defines.PLATFORM.isMobile() && adFLag && (cc.DataMng.getInstance().isBannerADEnabled() || cc.DataMng.getInstance().isFullScreenADEnabled());
//        if (adFLag){
//            if (nowID % 5 == 2 || nowID % 5 == 4){
                if (cc.DataMng.getInstance().isBannerADEnabled() && Define_SysConfig.getInstance().isADEnable()){
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
                        cc.GameManager.getInstance().getGameTimerGroup().remove("BannerAD_pause");
                    }, "BannerAD_pause");
                }
//            }
//            else if (nowID % 5 == 3 || nowID % 5 == 0){
//        if (cc.DataMng.getInstance().isFullScreenADEnabled()){
//            cc.log("showPunchBoxPopUpAds");
//            adManage.AdManage.getInstance().showPunchBoxPopUpAds();
//
//            var groupTimer = cc.GameManager.getInstance().getGameTimerAD();
//            groupTimer.add(10, function(){
//                cc.log("十秒后关闭全屏广告");
//                adManage.AdManage.getInstance().closePunchBoxPopUpAds();
//                cc.GameManager.getInstance().getGameTimerGroup().remove("FullScreenAD_pause");
//            }, "FullScreenAD_pause");
//        }
//            }
//        }
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnPauseCallback: function ()
    {
        //？？？？？ 改掉此代码
        var curState = _GetCurGameLevelState();

        if (curState instanceof cc.State_GameCarnivalBase || curState instanceof cc.State_GameGuide){
            return this;
        }

		if (cc.GUIBuyDiamond.getInstance().isWindowOpen() || cc.GUISimpleShop.getInstance().isWindowOpen() || this.m_pauseClosed){
			return this;
		}
        this.addGameWinAD();

        cc.EffectMng.getInstance().displayLabelHide();

        //
        var handle = false;
        //

        if (curState instanceof cc.State_GameLevel)
        {
            handle = true;
        }
        else if(curState instanceof cc.State_GameItem)//道具状态
        {
            handle = true;
            _ChangeGameLevelStateTo(cc.State_GameLevel.getInstance());
        }
        else if (curState instanceof cc.State_GameGuide){
            handle = true;
            _ChangeGameLevelStateTo(cc.State_GameLevel.getInstance());
        }

        //
        if (handle)
        {
            cc.AudioMng.getInstance().playGameLevelButton();
            this.playLeaveAction();
            cc.GUIGameOptionAndPause.getInstance().openWindow(_GUILayer());
        }

        //
        //cc.TextureCache.getInstance().dumpCachedTextureInfo();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    gameLevelStatePaused: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    gameLevelStateResumed: function()
    {
        if (this.m_GameItem)
        {
            this.m_GameItem.cleanItemAnimate();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyOpenWindow: function(window)
    {
        if (window instanceof cc.GUIBuyDiamond
            || window instanceof cc.GUIBuySuccess
            || window instanceof cc.GUIBuyPrompt
			|| window instanceof cc.GUIGameOutMoves
			|| window instanceof cc.GUISimpleShop)
        {
            this.pauseGame();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyCloseWindow: function(window)
    {
        if (window instanceof cc.GUIGameOutMoves
			||window instanceof cc.GUIBuyDiamond
            || window instanceof cc.GUIBuySuccess
            || window instanceof cc.GUIBuyPrompt
			|| window instanceof cc.GUISimpleShop)
        {
            this.resumeGame();
        }

        return this;
    },

	//------------------------------------------------------------------------------------------------------------------
    stopALlMonsterAction: function(gameLevel){
		var table = gameLevel.getTable();
		
		var itr = table.createIterForGrids();
		
        for (itr.first(); !itr.isDone(); itr.next())
        {
            //
			var grid = itr.getCurrent();
			var tapFlag = true;
			var tapGrid = grid;
			
			var tapObj = tapGrid.getTouchEnabledObject ? tapGrid.getTouchEnabledObject() : null;
			if (!tapObj)
			{
				tapFlag = false;
			}
			else {
//				tapObj.getSprite().stopAllActions();
//				tapObj.getSprite().setScale(1);
			}
		}
	},

    //------------------------------------------------------------------------------------------------------------------
    pauseGame: function()
    {
        //
        var curState = _GetCurGameLevelState();
        if (curState instanceof cc.State_GameLevel)
        {
            cc.State_GameLevel.getInstance().pause();
        }
        else if(curState instanceof cc.State_GameItem)//道具状态
        {
            _ChangeGameLevelStateTo(cc.State_GameLevel.getInstance());
            cc.State_GameLevel.getInstance().pause();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    resumeGame: function()
    {
        if (!this._canResumeGame())
        {
            return this;
        }

        //
        var curState = _GetCurGameLevelState();
        if (curState instanceof cc.State_GameLevel)
        {
            cc.State_GameLevel.getInstance().resume();
            this.specHandleForGameGuide();
        }
        else if(curState instanceof cc.State_GameItem)//道具状态
        {
            _ChangeGameLevelStateTo(cc.State_GameLevel.getInstance());
            cc.State_GameLevel.getInstance().resume();
        }
//        else

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _canResumeGame: function()
    {
        return !cc.GUIGameGiveUp.getInstance().isWindowOpen()
            && !cc.GUIGameOptionAndPause.getInstance().isWindowOpen();
    },

    //------------------------------------------------------------------------------------------------------------------
    //TODO
    specHandleForGameGuide: function()
    {
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        if (curLevelData
            && curLevelData.NAME == "LEVEL_5"
            && !cc.DataMng.getInstance().isGameLevelGuidFinish(curLevelData.NAME))
        {
            //只能这么写 强制通知主状态 调用教学逻辑 不然5关道具教学会断掉
            cc.State_GameLevel.getInstance().setGuideState("resumeGame");
        }

        return this;
    },

	updateContentGameInfoForMine: function()
	{
		this.m_GameInfo.updateContentForConditionMoves();
	},

    updateDesLabel: function()
    {
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_MINELOTTERY){
            var destroy1 = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterMineDesLine");
            destroy1 = destroy1 || 0;
            this.desLabel.setString(destroy1.toString());
        }
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateContent: function(events)
    {
        if (!events)
        {
            this.m_GameInfo.updateContentForConditionTime();
            this.m_GameInfo.updateContentForConditionMoves();
            this.m_GameInfo.updateScoreLabel();
            this.m_GameInfo.updateContentForTarget();
            this.m_GameProgress.updateContentForProgressBar();
            this.m_GameItem.updateItemInfo();
        }
        else
        {
            if (events[NOTIFY_EVENT.FOR_TIME])
            {
                this.m_GameInfo.updateContentForConditionTime();
            }
            else if (events[NOTIFY_EVENT.FOR_MOVES])
            {
                this.m_GameInfo.updateContentForConditionMoves();
                this.m_GameItem.updateItemPrompt();

            }

            if (events[NOTIFY_EVENT.FOR_SCORE])
            {
                this.m_GameInfo.updateScoreLabel();
                this.m_GameInfo.updateContentForTarget();
                this.m_GameProgress.updateContentForProgressBar();
                this.updateDesLabel();
            }

			if (events[NOTIFY_EVENT.FOR_MINE])
			{
                this.updateDesLabel();			
			}

            if (events[NOTIFY_EVENT.FOR_MONEY])
            {
                this.m_GameItem.updateItemInfo();
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifiedUpdate: function(subject, events)
    {
        if (!this.isWindowOpen())
        {
            return this;
        }

        this.updateContent(events);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playEnterAction: function()
    {
        var self = this;
        var winSize = cc.Director.getInstance().getWinSize();

        this.m_AniLightFront.setVisible(false);
        this.m_PauseButton.setEnabled(false);

        if (this.m_GameInfo)
        {
            var gameInfoSize = this.m_GameInfo.getMainUI().getContentSize();
            var gameInfoFromPosition = cc.p(
                24 * Defines.BASE_SCALE,
                winSize.height);

            var gameInfoToPosition = cc.p(
                24 * Defines.BASE_SCALE,
                winSize.height - gameInfoSize.height - 5 * Defines.BASE_SCALE
               );
			if (Defines._NeedFitIpad()){
				gameInfoToPosition.y = winSize.height * 0.68 - gameInfoSize.height * 0.5;
			}
            //
            this.m_GameInfo.getMainUI().setPosition(gameInfoFromPosition);
            this.m_GameInfo.getMainUI().stopAllActions();
            this.m_GameInfo.getMainUI().runAction(
                cc.EaseElasticOut.create(cc.MoveTo.create(0.5, gameInfoToPosition), 0.6));
        }

        if (this.m_GameItem)
        {
			var gameItemSize = this.m_GameItem.getMainUI().getContentSize();
            var gameItemFromPosition = cc.p(
                24 * Defines.BASE_SCALE,
                winSize.height);

            var gameItemToPosition = cc.p(
                24 * Defines.BASE_SCALE,
                5 * Defines.BASE_SCALE);

			if (Defines._NeedFitIpad()){
				gameItemToPosition.y = winSize.height * 0.25 - gameItemSize.height * 0.5;
			}

            this.m_GameItem.getMainUI().setPosition(gameItemFromPosition);
            this.m_GameItem.getMainUI().stopAllActions();
            this.m_GameItem.getMainUI().runAction(cc.Sequence.create(
                cc.DelayTime.create(Defines.FPS * 20),
                cc.EaseElasticOut.create(cc.MoveTo.create(0.5, gameItemToPosition), 0.6)));
        }

        if (this.m_GameProgress)
        {
            this.m_GameProgress.enterActionWillDisplay();

			var gameProgressSize = this.m_GameProgress.getMainUI().getContentSize();
            var gameProgressFromPosition = cc.p(winSize.width - 46 * Defines.BASE_SCALE,
                winSize.height);

            var gameProgressToPosition = cc.p(winSize.width - 46 * Defines.BASE_SCALE,
                80 * Defines.BASE_SCALE);

			if (Defines._NeedFitIpad()){
				gameProgressToPosition.y = winSize.height * 0.48 - gameProgressSize.height * 0.5;
			}

            this.m_GameProgress.getMainUI().setPosition(gameProgressFromPosition);
            this.m_GameProgress.getMainUI().stopAllActions();
            this.m_GameProgress.getMainUI().runAction(cc.Sequence.create(
                cc.EaseElasticOut.create(cc.MoveTo.create(0.5, gameProgressToPosition), 0.6),
                cc.CallFunc.create(function(sender)
                {
                    self.m_AniLightFront.setVisible(true);
                    self.m_GameProgress.enterActionDidFinish();
                }, this)));
        }

        if (this.m_PauseButton)
        {
            //
            var pauseButtonFromPosition = cc.p(winSize.width - 50 * Defines.BASE_SCALE,
			winSize.height + 36 * Defines.BASE_SCALE);
			
            var pauseButtonToPosition = cc.p(winSize.width - 50 * Defines.BASE_SCALE,
			winSize.height - 36 * Defines.BASE_SCALE);
			
			if (Defines._NeedFitIpad()){
				pauseButtonFromPosition.y = winSize.height - 50 * Defines.BASE_SCALE;
				pauseButtonToPosition.y = winSize.height - 50 * Defines.BASE_SCALE;
			}
			
            this.m_PauseButton.setPosition(pauseButtonFromPosition);
            this.m_PauseButton.stopAllActions();
            this.m_PauseButton.runAction(cc.Sequence.create(
                cc.EaseElasticOut.create(cc.MoveTo.create(0.5, pauseButtonToPosition), 0.6),
                cc.CallFunc.create(function()
                {
                    self.m_PauseButton.setEnabled(true);
                }, this)));
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playLeaveAction: function()
    {
        var winSize = cc.Director.getInstance().getWinSize();

        this.m_AniLightFront.setVisible(false);
        this.m_PauseButton.setEnabled(false);

        if (this.m_GameInfo)
        {
            var gameInfoContentSize = this.m_GameInfo.getMainUI().getContentSize();
            var gameInfoToPosition = cc.p(-gameInfoContentSize.width - 100, 0);
            this.m_GameInfo.getMainUI().stopAllActions();
            this.m_GameInfo.getMainUI().runAction(cc.MoveBy.create(Defines.FPS * 10, gameInfoToPosition));
        }

        if (this.m_GameItem)
        {
            var gameItemContentSize = this.m_GameItem.getMainUI().getContentSize();
            var gameItemToPosition = cc.p(-gameItemContentSize.width - 100, 0);
            this.m_GameItem.getMainUI().stopAllActions();
            this.m_GameItem.getMainUI().runAction(cc.MoveBy.create(Defines.FPS * 10, gameItemToPosition));
        }

        if (this.m_GameProgress)
        {
            var gameProgressContentSize = this.m_GameProgress.getMainUI().getContentSize();
            var gameProgressToPosition = cc.p(winSize.width + gameProgressContentSize.width, 0);
            this.m_GameProgress.getMainUI().stopAllActions();
            this.m_GameProgress.getMainUI().runAction(cc.MoveBy.create(Defines.FPS * 10, gameProgressToPosition));
        }

        if (this.m_PauseButton)
        {
            var pauseButtonToPosition = cc.p(winSize.width - 50 * Defines.BASE_SCALE, winSize.height + 36 * Defines.BASE_SCALE);
            this.m_PauseButton.stopAllActions();
            this.m_PauseButton.runAction(
                cc.EaseElasticOut.create(cc.MoveTo.create(1, pauseButtonToPosition), 0.5));
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);

        //
        cc.ResourceMng.getInstance().addToCache(
            Resource._GUIGameLevel_plist,
            Resource._GUIGameLevel_png);

        //
        this.addContent();

        //
        this.m_GameItem = cc.GUIGameLevelItem.create();
        this.m_GameItem.renderNode(this.getWindow());

        this.m_GameInfo = cc.GUIGameLevelInfo.create();
        this.m_GameInfo.renderNode(this.getWindow());

        this.m_GameProgress = cc.GUIGameLevelProgress.create();
        this.m_GameProgress.renderNode(this.getWindow());

        this.updateContent();
        this.playEnterAction();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        if (this.m_GameInfo)
        {
            this.m_GameInfo.release();
            this.m_GameInfo = null;
        }

        if (this.m_GameItem)
        {
            this.m_GameItem.release();
            this.m_GameItem = null;
        }

        if (this.m_GameProgress)
        {
            this.m_GameProgress.release();
            this.m_GameProgress = null;
        }

        //
        this.getWindow().removeAllChildren(true);

        //
        if (cc.GUIItemDesc.getInstance().isWindowOpen())
        {
            cc.GUIItemDesc.getInstance().closeWindow();
        }

        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUIGameLevel_plist,
            Resource._GUIGameLevel_png);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyAppDisactive: function()
    {
        if (!this.isWindowOpen())
        {
            return this;
        }

        if (_GetCurGameLevelState() instanceof cc.State_GameLevel)
        {
            this.m_PauseButton.activate();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    lockButtonByIndex : function(index)
    {
        var buttonList = this.m_GameItem.getItemButtonsForGuide();
        buttonList.forEach(

            function(button,pos)
            {
                if (pos == index)
                {
                    cc.log("Lock Index = " + index + " , button ID = " + button.getTag());
                    button.setEnabled(false);
                }
            }

        );

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    lockButtonList : function()
    {
        this.lockButtonByIndex(0);
        this.lockButtonByIndex(1);
        this.lockButtonByIndex(2);
        this.lockButtonByIndex(3);

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    unLockButtonByIndex : function(index)
    {
        var buttonList = this.m_GameItem.getItemButtonsForGuide();
        buttonList.forEach(

            function(button, pos)
            {
                if (pos == index)
                {
                    cc.log("Unlock Index = " + index + " , button ID = " + button.getTag());
                    button.setEnabled(true);
                }
            }
        );

        return this;
    },
	makeBlackScene : function (gameLevel)
	{
		var table = gameLevel.getTable();
		
		var itr = table.createIterForGrids();
		
		var gridPointTotal = [];
        for (itr.first(); !itr.isDone(); itr.next())
        {
            //
			var grid = itr.getCurrent();
			var tapFlag = true;
			var tapGrid = grid;
			
			if (!tapGrid.getTouchEnabledObject)
			{
				tapFlag = false;
			}

			tapGrid.getChildrenNodes().forEach(
				function(child)
				{
					if (child){
						var des = child.description();
					}
					var isOnlyLock = (child instanceof cc.Obj_Lock) || ( child instanceof cc.Obj_Ice);
					if (isOnlyLock || child instanceof cc.Obj_Floor)
					{
						tapFlag = true;
					}
				}
			);
			
			if (!tapFlag){

                continue;
            }
//
//            //
            var pos = grid.getPosition();
//            pos.x -= Defines.TABLE_GRID_SIZE/2;
            pos.y += 5 * Defines.BASE_SCALE;
			
			var gridPoint = table.getGridPointByPos(pos);
			
			gridPointTotal.push(gridPoint);

        }
		
		var size = this.getButtonItemRectForGuide(3);
		var pos = cc.p(size.x,size.y);
		var blackInstance = GUIGuideBlack.getInstance();
		
		blackInstance.finishLayer();
		blackInstance.changeLayer(this.getWindow());
		blackInstance.addUIBlackLayerWithoutTable(pos, size , table);
		blackInstance.addTableBlackArrayWithoutFinish(gridPointTotal);
		blackInstance.addTableBlack(table);
		
		this.blackScreen = blackInstance;

	},

    //------------------------------------------------------------------------------------------------------------------
	removeBlackScreen: function(){
		if (this.blackScreen){
			this.blackScreen.finishLayer();
		}
	},
	
    //------------------------------------------------------------------------------------------------------------------
    unLockButtonList : function()
    {
        this.unLockButtonByIndex(0);
        this.unLockButtonByIndex(1);
        this.unLockButtonByIndex(2);
        this.unLockButtonByIndex(3);

        return this;
    },
	
	//------------------------------------------------------------------------------------------------------------------
    refreshGoldenKeyItem : function()
	{
		this.m_GameItem.refreshGoldenKeyItem();
	}
});

cc.GUIGameLevel._instance = null;
cc.GUIGameLevel.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIGameLevel();
        this._instance.init();
        cc.DataMng.getInstance().addGUIObserver(this._instance);
    }

    return this._instance;
};