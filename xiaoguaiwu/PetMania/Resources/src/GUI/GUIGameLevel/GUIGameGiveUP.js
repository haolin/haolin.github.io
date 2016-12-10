
//-----------------------------------GUIGameGiveUp----------------------------------------------
cc.GUIGameGiveUp = cc.GUIWindow.extend ({

    description: function()
    {
        return "GUIGameGiveUp";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();
        this.m_MainUI = null;
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
        this.m_MainUI = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back0.png");
        this.getWindow().addChild(this.m_MainUI);
        this.m_MainUI.setPosition(_ScreenCenter());

        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        var title = cc.Sprite.createWithSpriteFrameName("game_label_give_up.png");
        this.m_MainUI.addChild(title);
        title.setPosition(cc.p(mainSize.width * 0.5, mainSize.height - 30 * Defines.BASE_SCALE));
        if (Defines.IS_EN ){
            title.setPosition(cc.p(mainSize.width * 0.45, mainSize.height - 30 * Defines.BASE_SCALE));
        }
		else if (Defines.IS_KO){
            title.setPosition(cc.p(mainSize.width * 0.45, mainSize.height - 30 * Defines.BASE_SCALE));
			title.setScale(0.8);
		}

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnContinueCallback, this);
        buttonClose.setPosition(cc.p(mainSize.width - 25 * Defines.BASE_SCALE, mainSize.height - 25 * Defines.BASE_SCALE));

        //
        var giveUpButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("game_btn_give_up_nor.png"),
            cc.Sprite.createWithSpriteFrameName("game_btn_give_up_sel.png"),
            this._btnGiveUpCallback, this);
        giveUpButton.setPosition(cc.p(75 * Defines.BASE_SCALE, 42 * Defines.BASE_SCALE));

        //
        /*var continueButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("game_btn_continue_game_nor.png"),
            cc.Sprite.createWithSpriteFrameName("game_btn_continue_game_sel.png"),
            this._btnContinueCallback, this);
        continueButton.setPosition(cc.p(mainSize.width - 115 * Defines.BASE_SCALE, 45 * Defines.BASE_SCALE));*/

        var buttonRestart = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("game_btn_restart_nor.png"),
            cc.Sprite.createWithSpriteFrameName("game_btn_restart_sel.png"),
            this._btnRestartCallback, this);
        buttonRestart.setPosition(cc.p(mainSize.width - 115 * Defines.BASE_SCALE, 45 * Defines.BASE_SCALE));
		
		if (Defines.IS_EN || Defines.IS_KO){
			buttonRestart.setPosition(cc.p(mainSize.width - 115 * Defines.BASE_SCALE, 39 * Defines.BASE_SCALE));
		}

        //
        var giveUpMenu = cc.Menu.create(buttonClose, giveUpButton, buttonRestart);
        giveUpMenu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(giveUpMenu);

        //积分
        var spriteScore = cc.Sprite.createWithSpriteFrameName("game_label_score.png");
        this.m_MainUI.addChild(spriteScore);
        spriteScore.setPosition(cc.p(mainSize.width * 0.5, 147 * Defines.BASE_SCALE));

        var labelScoreBg = cc.Sprite.createWithSpriteFrameName("game_panel_score.png");
        this.m_MainUI.addChild(labelScoreBg);
        labelScoreBg.setPosition(cc.p(mainSize.width * 0.5, 110 * Defines.BASE_SCALE));

        var curScore = cc.DataMng.getInstance().getCurScore();
        this.m_LabelScore = GUI.createNumberLabel(curScore.toString(), _GUIPath + "Num/num_3_14x18.png", 14, 18, "0");
        labelScoreBg.addChild(this.m_LabelScore);
        this.m_LabelScore.setAnchorPoint(cc.p(0.5, 0.5));
        var labelScoreBgSize = labelScoreBg.getContentSize();
        this.m_LabelScore.setPosition(cc.p(labelScoreBgSize.width * 0.5, labelScoreBgSize.height * 0.5));

        //目标
        var spriteTarget = cc.Sprite.createWithSpriteFrameName("game_label_target.png");
        this.m_MainUI.addChild(spriteTarget, 1);
        spriteTarget.setPosition(cc.p(mainSize.width * 0.5, mainSize.height - 75 * Defines.BASE_SCALE));

        var spriteTargetBg = cc.Sprite.createWithSpriteFrameName("game_panel_target_1.png");
        this.m_MainUI.addChild(spriteTargetBg);
        spriteTargetBg.setPosition(cc.p(mainSize.width * 0.5, mainSize.height -133 * Defines.BASE_SCALE));

        var gameLevelTarget = Level_Target.create(this);
        gameLevelTarget.updateTarget(spriteTargetBg);

        return this;
    },



    //------------------------------------------------------------------------------------------------------------------
    _btnRestartCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //处理薄荷糖不足的情况，使用了步数且小于等于0
        if (cc.DataMng.getInstance().getCurTouchMoves() > 0
            && cc.DataMng.getInstance().getCurrentHeart() <= 0)
        {
            cc.GUIBuyDiamond.getInstance().openWindow(_GUILayer(), 0, GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE);
            return this;
        }

        //没有用步数，把心加回去
        if (cc.DataMng.getInstance().getCurTouchMoves() <= 0)
        {
            if (!cc.DataMng.getInstance().getFreeCandyFlag()){
                cc.DataMng.getInstance().addHeart(1);
            }

            var gameTimer = cc.DataMng.getInstance().updateGameLevelBITime(0);
            BIMng.getInstance().logEndGameLevel(Defines.GAME_RESULT.RESULT_FAILED, gameTimer);
        }
        else
        {
            cc.DataMng.getInstance().setGameLevelResult(Defines.GAME_RESULT.RESULT_FAILED);
        }

        //窗口需要关闭
        this.closeWindow();
        cc.GUIGameOptionAndPause.getInstance().closeWindow();

        _GameLevelStateWrapper.restart();
        cc.Director.getInstance().replaceScene(
            Scene_Loading.create(
                new LoadHandler_RestartGameLevel(cc.DataMng.getInstance().getCurLevelData())
            ));
			
        if (!cc.DataMng.getInstance().getFreeCandyFlag()){
           cc.DataMng.getInstance().desHeart(1);
        }
		

        BIMng.getInstance().logPlayGameLevel();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnGiveUpCallback:function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        this.playLeaveAction(
            function()
            {
                this.closeWindow();
            }
        );

        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
		var self =this;
        //
        cc.GUIGameOptionAndPause.getInstance().playLeaveAction(
            function()
            {
                cc.GUIGameOptionAndPause.getInstance().closeWindow();

                //没有用步数，把心加回去
                if (cc.DataMng.getInstance().getCurTouchMoves() <= 0 && curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_TIME)
                {
                    if (!cc.DataMng.getInstance().getFreeCandyFlag()){
                        cc.DataMng.getInstance().addHeart(1);
                    }

                    //
                    var gameTimer = cc.DataMng.getInstance().updateGameLevelBITime(0);
                    BIMng.getInstance().logEndGameLevel(Defines.GAME_RESULT.RESULT_FAILED, gameTimer);


                    if (curLevelData.IS_FLOAT_LEVEL)
                    {
                        Scene_FloatMap.changeTo(GUI._GetMapDefineWithLevelData(curLevelData));
                    }
                    else
                    {
                        Scene_MainMap.changeTo();
                    }
                }
                else
                {
                    cc.DataMng.getInstance().setGameLevelResult(Defines.GAME_RESULT.RESULT_FAILED);
                    _ChangeGameLevelStateTo(cc.State_GameFail.getInstance());
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnContinueCallback:function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        this.playLeaveAction(
            function()
            {
                this.closeWindow();
                cc.GUIGameLevel.getInstance().playEnterAction();
            }
        );

        //
        cc.GUIGameOptionAndPause.getInstance().playLeaveAction(
            function()
            {
                cc.GUIGameOptionAndPause.getInstance().closeWindow();
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playEnterAction: function()
    {
        var mainSize = this.m_MainUI.getContentSize();
        var mainUIToPosition = _ScreenCenter();
        var mainUIFromPosition = cc.p(_ScreenWidth() + mainSize.width/2, _ScreenHeight()/2);
        this.m_MainUI.setPosition(mainUIFromPosition);
        this.m_MainUI.stopAllActions();
        this.m_MainUI.runAction(cc.EaseElasticOut.create(cc.MoveTo.create(Defines.FPS * 30, mainUIToPosition), 0.6));
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playLeaveAction: function(event)
    {
        var mainSize = this.m_MainUI.getContentSize();
        var mainUIToPosition = cc.p(_ScreenWidth() + mainSize.width/2, _ScreenHeight()/2);
        this.m_MainUI.stopAllActions();
        this.m_MainUI.runAction(cc.Sequence.create(
            cc.MoveTo.create(Defines.FPS * 10, mainUIToPosition),
            cc.CallFunc.create(event, this)));
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);
        cc.AudioMng.getInstance().playOpenWindow();

//        this.m_levelData = curLevelData;

        this.addContent();
        this.playEnterAction();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();
        cc.AudioMng.getInstance().playCloseWindow();

        this.getWindow().removeAllChildren(true);
        return this;
    }
    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIGameGiveUp._instance = null;
cc.GUIGameGiveUp.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIGameGiveUp();
        this._instance.init();
    }

    return this._instance;
};