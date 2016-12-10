
//继续游戏支付方式
var _GameContinue_ByRMB = !isAppStoreWeiBo() && !Defines.IS_KO;

//加继续包是否可在游戏内购买开关 老变化了
var _CanBuyContinuePack_InGame = false;

//----------------------------------------------------------------------------------------------------------------------
var _ContinueGame_OutMoves = function()
{
    cc.DataMng.getInstance().addExtraTouchMoves(5);

    var curState = _GetCurGameLevelState();
    if (curState instanceof cc.State_GameOutMoves)
    {
        _ChangeGameLevelStateTo(cc.State_GameLevel.getInstance());
    }
};

//----------------------------------------------------------------------------------------------------------------------
var _ContinueGame_OutTime = function()
{
    cc.DataMng.getInstance().addGameLevelTime(15, true);
    _GameLevelStateWrapper.getGameLevel().getTimer().resetTimeOut();

    var curState = _GetCurGameLevelState();
    if (curState instanceof cc.State_GameOutTime)
    {
        _ChangeGameLevelStateTo(cc.State_GameLevel.getInstance());
    }
};

//================================================ GUIGameOutMoves =====================================================
cc.GUIGameOutMoves = cc.GUIPopupWindow.extend ({

    description: function ()
    {
        return "GUIGameOutMoves";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        this.m_MainUI = null;
        this.m_Menu = null;
        this.m_ButtonFree = null;

        this.m_MoveModel = true;
        this.m_PackFlag = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function ()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function ()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(blockLayer, -1);

        //
        this.m_MainUI = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back0.png");
        this.getWindow().addChild(this.m_MainUI);
        this.m_MainUI.setPosition(_ScreenCenter());

        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        var backFrame = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back5.png");
        this.m_MainUI.addChild(backFrame);
        backFrame.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.53));

        //
        var titleFile = this.m_MoveModel ? "game_title_out_move.png" : "game_title_out_time.png";
        var labelTitle = cc.Sprite.createWithSpriteFrameName(titleFile);
        this.m_MainUI.addChild(labelTitle);
        labelTitle.setPosition(cc.p(mainSize.width * 0.5, mainSize.height - 38 * Defines.BASE_SCALE));
		if (Defines.IS_KO){
			labelTitle.setScale(0.55);
		}

        //
        var monster = cc.Sprite.createWithSpriteFrameName("Images_monster_1.png");
        this.m_MainUI.addChild(monster);
        monster.setPosition(cc.p(mainSize.width * 0.15, mainSize.height * 0.95));

        monster.runAction(cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveBy.create(0.4, cc.p(0, mainSize.height * 0.01)),
            cc.MoveBy.create(0.8, cc.p(0, mainSize.height * 0.02 * -1)),
            cc.MoveBy.create(0.4, cc.p(0, mainSize.height * 0.01))
        )));

        if(Defines.IS_KO)
        {
            monster.setVisible(false);
        }

        //
        this.m_Menu = cc.Menu.create();
        this.m_Menu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(this.m_Menu);

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(mainSize.width - 25 * Defines.BASE_SCALE, mainSize.height - 25 * Defines.BASE_SCALE));
        this.m_Menu.addChild(buttonClose);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentForFree: function()
    {
        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        this.m_ButtonFree = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_mianfeijixu_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_mianfeijixu_sel.png"),
            this._btnContinueByFreeCallback, this);
        this.m_ButtonFree.setPosition(cc.p(mainSize.width/2, 50 * Defines.BASE_SCALE));
        this.m_Menu.addChild(this.m_ButtonFree);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentForStorage: function()
    {
        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        var buttonStorage = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("game_btn_continue_game_nor.png"),
            cc.Sprite.createWithSpriteFrameName("game_btn_continue_game_sel.png"),
            this._btnContinueByStorageCallback, this);
        buttonStorage.setPosition(cc.p(mainSize.width/2, 50 * Defines.BASE_SCALE));
        this.m_Menu.addChild(buttonStorage);

        //
        var continueTxt_0 = Resource.ChineseTxt["game_continue_0"];
        var continueTxt_1 = Resource.ChineseTxt["game_continue_1"];
        var continueStorage = cc.DataMng.getInstance().getGameContinueCount();
        var continueTxt = continueTxt_0 +" " + continueStorage +" "+ continueTxt_1;

        var labelStorage = cc.LabelTTF.create(continueTxt, Defines.DefaultFont, 16 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelStorage);
        labelStorage.setPosition(cc.p(mainSize.width/2, 15 * Defines.BASE_SCALE));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentForDevoid: function()
    {
        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        var onceNor = Defines.IS_EN ? "game_btn_continue_game_nor.png" : "general_btn_buy_nor.png";
        var onceSel = Defines.IS_EN ? "game_btn_continue_game_sel.png" : "general_btn_buy_sel.png";
        var buttonOnce = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName(onceNor),
            cc.Sprite.createWithSpriteFrameName(onceSel),
            this._btnContinueByOnceCallback, this);
        buttonOnce.setPosition(cc.p(93 * Defines.BASE_SCALE, 50 * Defines.BASE_SCALE));
        this.m_Menu.addChild(buttonOnce);

        var shopData = this.m_MoveModel ? GUI.SHOP_DATA.SHOP_DATA_MOVES[0] : GUI.SHOP_DATA.SHOP_DATA_TIME[0];
        var onceTxt_0 = shopData.TOTAL_PRICE.get() + Resource.ChineseTxt["game_continue_2"];
        var onceTxt_1 = Defines.DIAMOND_PAY.GAME_CONTINUE + Resource.ChineseTxt["game_continue_3"];
        var onceTxt = _GameContinue_ByRMB ? onceTxt_0 : onceTxt_1;
        var labelOnce = cc.LabelTTF.create(onceTxt, Defines.DefaultFont, 16 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelOnce);
        labelOnce.setPosition(cc.p(93 * Defines.BASE_SCALE, 15 * Defines.BASE_SCALE));
        if(Defines.IS_KO)
        {
            labelOnce.setVisible(false);
        }

        //
        var buttonPack = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("game_btn_continue_pack_nor.png"),
            cc.Sprite.createWithSpriteFrameName("game_btn_continue_pack_sel.png"),
            this._btnContinueByPackCallback, this);
        buttonPack.setPosition(cc.p(mainSize.width - 93 * Defines.BASE_SCALE, 50 * Defines.BASE_SCALE));
        this.m_Menu.addChild(buttonPack);

        var packData = this._updateContinuePackFlag(0);
        var labelPack = cc.LabelTTF.create(packData.DESCRIPTION, Defines.DefaultFont, 16 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelPack);
        labelPack.setPosition(cc.p(mainSize.width - 93 * Defines.BASE_SCALE, 15 * Defines.BASE_SCALE));

        if (!_CanBuyContinuePack_InGame)
        {
            buttonPack.setVisible(false);
            labelPack.setVisible(false);

            buttonOnce.setPositionX(mainSize.width/2);
            labelOnce.setPositionX(mainSize.width/2);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _updateContinuePackFlag: function(flag)
    {
        flag = flag ? flag : 0;
        var packLength = GUI.SHOP_DATA.SHOP_DATA_CONTINUE.length;

        this.m_PackFlag += flag;
        if (this.m_PackFlag > packLength - 1)
        {
            this.m_PackFlag = packLength - 1;
        }

        return GUI.SHOP_DATA.SHOP_DATA_CONTINUE[this.m_PackFlag];
    },

    //------------------------------------------------------------------------------------------------------------------
    _isLevelContinueFree:function()
    {
        return false;
        
        var conTimes = cc.DataMng.getInstance().isGameLevelGuidFinish("freeContinue_time", true);
        if (conTimes >= 3)
        {
            return false;
        }

        var maxFreeLevelID = 19;
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        if (curLevelData.IS_SPACE_LEVEL)
        {
            return GUI._CompareNorLevelWithSpaceLevel(maxFreeLevelID, curLevelData.ID);
        }

        return curLevelData.ID <= maxFreeLevelID;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback:function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        this.playLeaveAction(
            function()
            {
                _ChangeGameLevelStateTo(cc.State_GameLevel.getInstance());

                var isFailed = this.m_MoveModel ?
                    cc.DataMng.getInstance().getLeftTouchMoves() <= 0 :
                    cc.DataMng.getInstance().getLeftGameLevelTime() <= 0;
//
                if (isFailed)
                {
                    cc.DataMng.getInstance().setGameLevelResult(Defines.GAME_RESULT.RESULT_FAILED);
                    _ChangeGameLevelStateTo(cc.State_GameFail.getInstance());

                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnContinueByFreeCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        this.m_MoveModel ? _ContinueGame_OutMoves() : _ContinueGame_OutTime();

        //
        var conTimes = cc.DataMng.getInstance().isGameLevelGuidFinish("freeContinue_time", true);
        cc.DataMng.getInstance().setGameLevelGuidFinishValue("freeContinue_time", ++conTimes);
        
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnContinueByStorageCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        if (cc.DataMng.getInstance().spendGameContinueCount(1))
        {
            BIMng.getInstance().logUseContinuePack();
            this.m_MoveModel ? _ContinueGame_OutMoves() : _ContinueGame_OutTime();
        }
        else
        {
            cc.log("GUIGameOutMoves Error: " + "没有继续游戏库存却显示了有");
        }
        return this;
    },
    getDiamondShopData: function(needCount){
        var shopDataArr = GUI.getExactDiamondShopData(needCount); //获得目标data

        var recommendPrice = (Defines.OS.isiOS()) ? 30 : 20 ;
        if (needCount <= recommendPrice){
            shopDataArr = GUI.getExactShopDataByDiamond(recommendPrice);
        }

        return shopDataArr;
    },
    //------------------------------------------------------------------------------------------------------------------
    _btnContinueByOnceCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        if (_GameContinue_ByRMB)
        {
            var shopData = this.m_MoveModel ? GUI.SHOP_DATA.SHOP_DATA_MOVES[0] : GUI.SHOP_DATA.SHOP_DATA_TIME[0];

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

        //
        if (cc.DataMng.getInstance().canSpendMoney(Defines.DIAMOND_PAY.GAME_CONTINUE))
        {
            cc.DataMng.getInstance().spendMoney(Defines.DIAMOND_PAY.GAME_CONTINUE, MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_ONCE_BUY_CONTINUE); //单次购买继续游戏
            this.m_MoveModel ? _ContinueGame_OutMoves() : _ContinueGame_OutTime();
            BIMng.getInstance().logSingleContinueGame(this.m_MoveModel);
            this.closeWindow();
        }
        else
        {
            //直接购买钻石
            var shopDataArr = this.getDiamondShopData(Defines.DIAMOND_PAY.GAME_CONTINUE);
            //
            var myScene = this.getWindow().getParent();

            //电信的有二次确认
            if (Defines._NeedPayConfirm())
            {
                cc.GUIBuyPrompt.getInstance().openWindow(myScene, shopDataArr);
                return this;
            }

            _Pay_ByRMB(shopDataArr);
//            cc.GUIBuyDiamond.getInstance().openWindow(_GUILayer(), Defines.DIAMOND_PAY.GAME_CONTINUE, GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND);
        }


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnContinueByPackCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        var packData = this._updateContinuePackFlag(0);
        var totalPrice = packData.TOTAL_PRICE.get();
        if (cc.DataMng.getInstance().canSpendMoney(totalPrice))
        {
            cc.DataMng.getInstance().spendMoney(totalPrice, MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_PACK_BUY_CONTINUE);//买继续游戏包
            cc.DataMng.getInstance().addGameContinueCount(packData.COUNT.get() + packData.GIFT_COUNT.get());
            BIMng.getInstance().logPayByDiamond(packData);
            this._updateContinuePackFlag(1);

            if (cc.DataMng.getInstance().spendGameContinueCount(1))
            {
                BIMng.getInstance().logUseContinuePack();
                this.m_MoveModel ? _ContinueGame_OutMoves() : _ContinueGame_OutTime();
            }
        }
        else
        {
//            cc.GUIBuyDiamond.getInstance().openWindow(_GUILayer(), totalPrice, GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND);
        }

        return this;
    },

    //---------------------------------------------------     ---------------------------------------------------------------
    _runUIAnimations:function()
    {
        var mainSize = this.m_MainUI.getContentSize();

        //
        var animLayer = cc.Layer.create();
        this.m_MainUI.addChild(animLayer);
        animLayer.setContentSize(mainSize);

        //
        var movesBackground = cc.Sprite.createWithSpriteFrameName("game_add_moves_back.png");
        animLayer.addChild(movesBackground);
        movesBackground.setPosition(cc.p(mainSize.width/2, mainSize.height/2 + 15 * Defines.BASE_SCALE));
        movesBackground.setScale(0.5);
        movesBackground.runAction(cc.EaseElasticOut.create(cc.ScaleTo.create(0.5, 1), 0.6));

        //
        if(Defines.IS_KO)
        {
            var movesFileName = this.m_MoveModel ? "game_add_moves_five_kor.png" : "game_add_time_fifteen.png";
        }
        else
        {
            var movesFileName = this.m_MoveModel ? "game_add_moves_five.png" : "game_add_time_fifteen.png";
        }

        var spriteMoves = cc.Sprite.createWithSpriteFrameName(movesFileName);
        animLayer.addChild(spriteMoves);
        spriteMoves.setPosition(cc.p(mainSize.width/2, mainSize.height/2 + 55 * Defines.BASE_SCALE));
        spriteMoves.setVisible(false);

        if("game_add_moves_five_kor.png" == movesFileName)
        {
            spriteMoves.setScale(0.6);
        }

        spriteMoves.runAction(cc.Sequence.create(
            cc.DelayTime.create(0.4),
            cc.CallFunc.create(function(){
                spriteMoves.setVisible(true);
            }),
            cc.EaseElasticOut.create(cc.MoveTo.create(0.5, cc.p(mainSize.width/2, mainSize.height/2 + 15 * Defines.BASE_SCALE)), 0.6))
        );

        //
        var starsAnimation = [
            {pos: cc.p( 50 * Defines.BASE_SCALE, 230 * Defines.BASE_SCALE), delay: 0.1},
            {pos: cc.p(330 * Defines.BASE_SCALE, 300 * Defines.BASE_SCALE), delay: 0.1},
            {pos: cc.p(245 * Defines.BASE_SCALE, 320 * Defines.BASE_SCALE), delay: 0.1},
            {pos: cc.p(156 * Defines.BASE_SCALE, 250 * Defines.BASE_SCALE), delay: 0.3},
            {pos: cc.p(300 * Defines.BASE_SCALE, 380 * Defines.BASE_SCALE), delay: 0.3},
            {pos: cc.p( 80 * Defines.BASE_SCALE, 259 * Defines.BASE_SCALE), delay: 0.5},
            {pos: cc.p(150 * Defines.BASE_SCALE, 280 * Defines.BASE_SCALE), delay: 0.5},
            {pos: cc.p( 70 * Defines.BASE_SCALE, 333 * Defines.BASE_SCALE), delay: 0.8},
            {pos: cc.p(250 * Defines.BASE_SCALE, 290 * Defines.BASE_SCALE), delay: 0.8},
            {pos: cc.p(258 * Defines.BASE_SCALE, 363 * Defines.BASE_SCALE), delay: 0.8}
        ];

        starsAnimation.forEach(function(each)
        {
            var stars = cc.Sprite.create();
            animLayer.addChild(stars);
            stars.setPosition(each.pos);

            var starsAnimation = cc.Animation.create(
                cc.ResourceMng.getInstance().getAnimationFrames("add_moves_star"), 1/25);
            stars.runAction(cc.RepeatForever.create(cc.Sequence.create(
                cc.DelayTime.create(each.delay),
                cc.Animate.create(starsAnimation),
                cc.DelayTime.create(each.delay)
            )));
        });

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playEnterAction: function(event)
    {
        var winSize = cc.Director.getInstance().getWinSize();

        var mainSize = this.m_MainUI.getContentSize();
        var mainUIToPosition = cc.p(winSize.width * 0.5, winSize.height * 0.5);
        var mainUIFromPosition = cc.p(winSize.width * 0.5, winSize.height + mainSize.height * 0.5);
        this.m_MainUI.setPosition(mainUIFromPosition);
        this.m_MainUI.stopAllActions();
        this.m_MainUI.runAction(cc.Sequence.create(
            cc.EaseElasticOut.create(cc.MoveTo.create(Defines.FPS * 30, mainUIToPosition), 0.6),
            cc.CallFunc.create(event, this)));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playLeaveAction: function(event)
    {
        var winSize = cc.Director.getInstance().getWinSize();

        var mainSize = this.m_MainUI.getContentSize();
        var mainUIToPosition = cc.p(winSize.width * 0.5, winSize.height + mainSize.height * 0.5);
        this.m_MainUI.stopAllActions();
        this.m_MainUI.runAction(cc.Sequence.create(
            cc.MoveTo.create(Defines.FPS * 10, mainUIToPosition),
            cc.CallFunc.create(event, this)));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getButtonAddRect: function()
    {
        var mainSize = this.m_MainUI.getContentSize();
        var buttonSize = this.m_ButtonFree.getContentSize();
        var origin = cc.pSub(this.m_ButtonFree.getPosition(), cc.p(buttonSize.width/2, buttonSize.height/2));
        origin = cc.pAdd(cc.p(_ScreenCenter().x - mainSize.width/2, _ScreenCenter().y - mainSize.height/2), origin);
        return cc.rect(origin.x, origin.y + 5 * Defines.BASE_SCALE, buttonSize.width, buttonSize.height);
    },

    //------------------------------------------------------------------------------------------------------------------
    activateButtonFree: function()
    {
        if (this.m_ButtonFree)
        {
            this.m_ButtonFree.activate();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyOpenWindow: function(window)
    {
        if (window instanceof cc.GUIBuyPrompt
            || window instanceof cc.GUIBuyDiamond)
        {
            this.getWindow().setVisible(false);
        }

        if (window instanceof cc.GUIGuideNormal)
        {
            this.m_Menu.setEnabled(false);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyCloseWindow: function(window)
    {
        if (window instanceof cc.GUIBuyPrompt
            || window instanceof cc.GUIBuyDiamond)
        {
            this.getWindow().setVisible(true);
        }

        if (window instanceof cc.GUIGuideNormal)
        {
            this.m_Menu.setEnabled(true);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);

        //
        cc.ResourceMng.getInstance().addToCache(
            Resource.add_moves_star_plist,
            Resource.add_moves_star_png);

        //
        cc.AudioMng.getInstance().playOpenWindow();

        //
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        this.m_MoveModel =
            curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_TIME &&
            curLevelData.MODEL_MIX != Defines.TARGET_MODEL.MODEL_TIME;

        //
        if (cc.DataMng.getInstance().isGameLevelGuidFinish("freeContinue_time", true) == undefined)
        {
            cc.DataMng.getInstance().setGameLevelGuidFinishValue("freeContinue_time", 0);
        }

        var conTimes = cc.DataMng.getInstance().isGameLevelGuidFinish("freeContinue_time", true);
        var key = "FreeContinue_" + cc.DataMng.getInstance().isGameLevelGuidFinish("freeContinue_time", false);
        cc.log("conTimes = " + conTimes);

        //
        this.addContent();


        if (this._isLevelContinueFree())
        {
            this.addContentForFree();
        }
        else  if (cc.DataMng.getInstance().getGameContinueCount() >= 1)
        {
            this.addContentForStorage();
        }
        else
        {
            this.addContentForDevoid();
        }


        this.playEnterAction(
            function()
            {
                this._runUIAnimations();
            }
        );

        //
        if (this._isLevelContinueFree())
        {
            var black = this.getButtonAddRect();
            var blackList = [
                black
            ];
            
            var freeConNum = 224 + conTimes;
            var freeContent = Resource.ChineseTxt[freeConNum];
            
            if (this.buttonClose)
            {
                this.buttonClose.setEnabled(false);
            }
            if (this.buttonAdd)
            {
                this.buttonAdd.setEnabled(false);
            }
            cc.GUIGuideNormal.getInstance().showCustomCuteMonsterBase(
                key,
                freeContent,
                this.getWindow().getParent(),
                blackList,
                true,
                cc.p(0,0)
            );
        }
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        //
        cc.AudioMng.getInstance().playCloseWindow();

        //
        this.getWindow().removeAllChildren(true);

        //
        this.m_ButtonFree = null;

        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource.add_moves_star_plist,
            Resource.add_moves_star_png);

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIGameOutMoves._instance = null;
cc.GUIGameOutMoves.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIGameOutMoves();
        this._instance.init();
    }

    return this._instance;
};