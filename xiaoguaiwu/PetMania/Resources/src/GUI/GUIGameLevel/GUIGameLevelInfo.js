
//================================================== GUIGameLevel ===================================================
cc.GUIGameLevelInfo = cc.Class.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this.m_MainUI = null;

        //
        this.m_LabelScore = null;
        this.m_LabelMoves = null;
        this.m_LabelTime = null;
        this.m_ProgressTime = null;

        //
        this.m_SpriteMoveLabel = null;
        this.m_SpriteTimeLabel = null;
        //
        this.m_SpritePromptMoves = null;
        this.m_SpritePromptMovesEx = null;

        this.m_MineGameLevel = null;
        //
        this.m_SpriteTargetBg = null;
        this.m_GameLevelTarget = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function ()
    {
        //主界面
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_MINELOTTERY){
            this.mineGameTopInfoInit();
            return this;
        }

        this.m_MainUI = cc.Sprite.createWithSpriteFrameName("game_panel_info.png");
        this.m_MainUI.setAnchorPoint(cc.p(0, 0));

        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        var spriteConnect = cc.Sprite.createWithSpriteFrameName("game_connect_0.png");
        this.m_MainUI.addChild(spriteConnect);
        spriteConnect.setAnchorPoint(cc.p(1, 0.5));
        spriteConnect.setPosition(cc.p(0, mainSize.height * 0.5));

        this.m_MainUI.setPosition(cc.p(spriteConnect.getContentSize().width, _ScreenHeight() - mainSize.height - 5));

        //积分
        var spriteScore = cc.Sprite.createWithSpriteFrameName("game_label_score.png");
        this.m_MainUI.addChild(spriteScore);
        spriteScore.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.91));

        var labelScoreBg = cc.Sprite.createWithSpriteFrameName("game_panel_score.png");
        this.m_MainUI.addChild(labelScoreBg);
        labelScoreBg.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.81));

        this.m_LabelScore = GUI.createNumberLabel("0", _GUIPath + "Num/num_3_14x18.png", 14, 18, "0");
        labelScoreBg.addChild(this.m_LabelScore);
        this.m_LabelScore.setAnchorPoint(cc.p(0.5, 0.5));
        var labelScoreBgSize = labelScoreBg.getContentSize();
        this.m_LabelScore.setPosition(cc.p(labelScoreBgSize.width * 0.5, labelScoreBgSize.height * 0.5));

        //剩余步数或剩余时间

        if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_TIME || curLevelData.MODEL_MIX == Defines.TARGET_MODEL.MODEL_TIME)
        {
            this.m_SpriteTimeLabel = cc.Sprite.createWithSpriteFrameName("game_label_timer.png");
            this.m_MainUI.addChild(this.m_SpriteTimeLabel);
            this.m_SpriteTimeLabel.setPosition(cc.p(mainSize.width * 0.5, mainSize.height - 112 * Defines.BASE_SCALE));

            if (Defines.IS_EN){
                this.m_SpriteTimeLabel.setScale(0.8);
            }

            var timeLineBg = cc.Sprite.createWithSpriteFrameName("game_panel_time.png");
            this.m_MainUI.addChild(timeLineBg);
            timeLineBg.setPosition(cc.p(mainSize.width * 0.5, mainSize.height - 167 * Defines.BASE_SCALE));

            this.m_ProgressTime = cc.ProgressTimer.create(cc.Sprite.createWithSpriteFrameName("game_time_bar.png"));
            timeLineBg.addChild(this.m_ProgressTime);
            this.m_ProgressTime.setAnchorPoint(cc.p(0, 0));
            this.m_ProgressTime.setPosition(cc.p(4 * Defines.BASE_SCALE, 4 * Defines.BASE_SCALE));

            this.m_ProgressTime.setType(cc.PROGRESS_TIMER_TYPE_BAR);
            this.m_ProgressTime.setMidpoint(cc.p(0, 0));
            this.m_ProgressTime.setBarChangeRate(cc.p(1, 0));

            this.m_LabelTime = GUI.createNumberLabel("00:00", _GUIPath + "Num/num_3_14x18.png", 14, 18, "0");
            timeLineBg.addChild(this.m_LabelTime);
            this.m_LabelTime.setAnchorPoint(cc.p(0.5, 0.5));
            var labelTimeBgSize = timeLineBg.getContentSize();
            this.m_LabelTime.setPosition(cc.p(labelTimeBgSize.width * 0.5, labelTimeBgSize.height * 0.72));
        }
        else {
            this.m_SpriteMoveLabel = cc.Sprite.createWithSpriteFrameName("game_label_moves.png");
            this.m_MainUI.addChild(this.m_SpriteMoveLabel);
            this.m_SpriteMoveLabel.setPosition(
                cc.p(mainSize.width * 0.5, mainSize.height - 125 * Defines.BASE_SCALE)
            );

            var spriteMovesBg = cc.Sprite.createWithSpriteFrameName("game_panel_score.png");
            this.m_MainUI.addChild(spriteMovesBg);
            spriteMovesBg.setPosition(cc.p(mainSize.width * 0.5, mainSize.height - 163 * Defines.BASE_SCALE));

            this.m_LabelMoves = GUI.createNumberLabel("", _GUIPath + "Num/num_3_14x18.png", 14, 18, "0");
            spriteMovesBg.addChild(this.m_LabelMoves);
            this.m_LabelMoves.setAnchorPoint(cc.p(0.5, 0.5));
            var labelMovesBgSize = spriteMovesBg.getContentSize();
            this.m_LabelMoves.setPosition(cc.p(labelMovesBgSize.width * 0.5, labelMovesBgSize.height * 0.5));
        }

        var spriteTarget = cc.Sprite.createWithSpriteFrameName("game_label_target.png");
        this.m_SpriteTargetBg = cc.Sprite.createWithSpriteFrameName("game_panel_target_0.png");
        this.m_SpriteTargetBg.setPosition(cc.p(mainSize.width * 0.5, mainSize.height - 285 * Defines.BASE_SCALE));
        //目标

        this.m_MainUI.addChild(this.m_SpriteTargetBg);
        var targetBgSize = this.m_SpriteTargetBg.getContentSize();

        this.m_SpriteTargetBg.addChild(spriteTarget);
        spriteTarget.setPosition(cc.p(targetBgSize.width * 0.5, targetBgSize.height + 5 * Defines.BASE_SCALE));

        this.m_GameLevelTarget = Level_Target.create(this);
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    mineGameTopInfoInit: function()
    {
        //采矿模式的游戏信息初始化
        //主界面
        this.m_MainUI = cc.Sprite.createWithSpriteFrameName("game_panel_info.png");
        this.m_MainUI.setAnchorPoint(cc.p(0, 0));
        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        var spriteConnect = cc.Sprite.createWithSpriteFrameName("game_connect_0.png");
        this.m_MainUI.addChild(spriteConnect);
        spriteConnect.setAnchorPoint(cc.p(1, 0.5));
        spriteConnect.setPosition(cc.p(0, mainSize.height * 0.5));

        this.m_MainUI.setPosition(cc.p(spriteConnect.getContentSize().width, _ScreenHeight() - mainSize.height - 5));

        this.m_SpriteMoveLabel = cc.Sprite.createWithSpriteFrameName("game_label_moves.png");
        this.m_MainUI.addChild(this.m_SpriteMoveLabel);
        this.m_SpriteMoveLabel.setPosition(
            cc.p(mainSize.width * 0.5, mainSize.height - 27 * Defines.BASE_SCALE)
        );

        var spriteMovesBg = cc.Sprite.createWithSpriteFrameName("game_panel_level.png");
        this.m_MainUI.addChild(spriteMovesBg);
        spriteMovesBg.setPosition(cc.p(mainSize.width * 0.5, mainSize.height - 92 * Defines.BASE_SCALE));

        this.m_LabelMoves = GUI.createNumberLabel("", _GUIPath + "Num/num_3_14x18.png", 14, 18, "0");
        spriteMovesBg.addChild(this.m_LabelMoves);
        this.m_LabelMoves.setAnchorPoint(cc.p(0.5, 0.5));
        var labelMovesBgSize = spriteMovesBg.getContentSize();
        this.m_LabelMoves.setPosition(cc.p(labelMovesBgSize.width * 0.5, labelMovesBgSize.height * 0.5));

        var spriteTarget = cc.Sprite.createWithSpriteFrameName("wenzi-shouhuo.png");
        this.m_SpriteTargetBg = cc.Sprite.createWithSpriteFrameName("game_panel_target_2.png");
        this.m_SpriteTargetBg.setPosition(cc.p(mainSize.width * 0.5, mainSize.height - 250 * Defines.BASE_SCALE));

        this.m_MainUI.addChild(this.m_SpriteTargetBg);
        var targetBgSize = this.m_SpriteTargetBg.getContentSize();

        this.m_SpriteTargetBg.addChild(spriteTarget);
        spriteTarget.setPosition(cc.p(targetBgSize.width * 0.5, targetBgSize.height - 5 * Defines.BASE_SCALE));

        this.m_GameLevelTarget = Level_Target.create(this);
        return this;

    },
    //------------------------------------------------------------------------------------------------------------------
    updateScoreLabel: function()
    {
        if (!this.m_LabelScore){
            return this;
        }
        var curScore = cc.DataMng.getInstance().getCurScore(true);

        if (curScore != parseInt(this.m_LabelScore.getString()))
        {
            this.m_LabelScore.setString(curScore.toString());

            this.m_LabelScore.stopAllActions();
            this.m_LabelScore.runAction(cc.Sequence.create(
                cc.ScaleTo.create(Defines.FPS * 5, 1.5),
                cc.ScaleTo.create(Defines.FPS * 5, 1)
            ));
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateContentForConditionTime: function()
    {
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();

        if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_TIME || curLevelData.MODEL_MIX == Defines.TARGET_MODEL.MODEL_TIME)
        {
            var leftTime = cc.DataMng.getInstance().getLeftGameLevelTime();
            leftTime = parseInt(leftTime);

            //
            if (leftTime <= 10)
            {
                if (leftTime > 0)
                {
                    if (!this.TimeLost)
                    {
                        this.TimeLost = true;
                        cc.AudioMng.getInstance().playGameLevelTimeLost();
                    }

                    if (Tools.convertSecondTime(leftTime) != this.m_LabelTime.getString())
                    {
                        this.m_LabelTime.stopAllActions();
                        this.m_LabelTime.runAction(cc.Sequence.create(
                            cc.ScaleTo.create(Defines.FPS * 8, 1.5),
                            cc.ScaleTo.create(Defines.FPS * 8, 1)
                        ));
                    }
                }
                else
                {
                    delete this.TimeLost;
                }
            }

            this.m_LabelTime.setString(Tools.convertSecondTime(leftTime));

            var allTime = curLevelData.TIME;
            var scale = 1 - leftTime/allTime;
            scale = scale > 1 ? 1 : scale;

            this.m_ProgressTime.setPercentage((1 - scale) * 100);
        }

        return this;
    },

    miningGameContentForConditionMoves: function()
    {
        var leftMoves = cc.DataMng.getInstance().getLeftTouchMoves();
        var mainSize = this.m_MainUI.getContentSize();

        var popTipPos = cc.DataMng.getInstance().getMineGameSpecialPopTipPos();
        if (popTipPos){
            if (cc.DataMng.getInstance().getMineGamePopTipStep() % 5 == 0){
                cc.EffectMng.getInstance().addPopUpTip(popTipPos);
                cc.DataMng.getInstance().addMineGamePopTipStep();
            }
            else {
                cc.DataMng.getInstance().addMineGamePopTipStep();
            }

        }

        if (leftMoves <= 0){

            var moveLabelPos = this.m_SpriteMoveLabel.getPosition();
            this.m_SpriteMoveLabel.removeFromParent();
            this.m_SpriteMoveLabel = cc.Sprite.createWithSpriteFrameName("wenzi-jibie.png");
            this.m_MainUI.addChild(this.m_SpriteMoveLabel);
            this.m_SpriteMoveLabel.setPosition(
                moveLabelPos
            );

            var addLevelBtn = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("button_jia-up.png"),
                cc.Sprite.createWithSpriteFrameName("button_jia-down.png"),
                this._btnMineAddLevelCallback, this);
            if (!this.m_LabelMoves.getParent().getChildByTag(1002)){

                addLevelBtn.setPosition(cc.p(this.m_LabelMoves.getPosition().x * 1.6, this.m_LabelMoves.getPosition().y));

                var subLevelBtn = cc.MenuItemSprite.create(
                    cc.Sprite.createWithSpriteFrameName("button_jian-up.png"),
                    cc.Sprite.createWithSpriteFrameName("button_jian-down.png"),
                    this._btnMineSubLevelCallback, this);
                subLevelBtn.setPosition(cc.p(this.m_LabelMoves.getPosition().x * 0.4, this.m_LabelMoves.getPosition().y));

                var levelMenu = cc.Menu.create(addLevelBtn, subLevelBtn);
                levelMenu.setPosition(cc.p(0, 0));
                this.m_LabelMoves.getParent().addChild(levelMenu, 10000, 1002);
            }

            var curLevel = cc.DataMng.getInstance().getMineGameLevel();
            if (this.m_MineGameLevel){
                this.m_MineGameLevel.removeFromParent();
            }
			
			var realLevel = 0;
			
			switch (curLevel){
				case 1:
				case 2:
						realLevel = 1;
						break;
				case 3:
				case 5:
						realLevel = 2;
						break;
				case 10:
				case 20:
						realLevel = 3;
						break;
				case 30:
				case 50:
						realLevel = 4;
						break;
				case 100:
						realLevel = 5;
						break;
				default:
						realLevel = 1;
						break;
			}
            this.m_MineGameLevel = cc.Sprite.createWithSpriteFrameName("icon-wankuang0"+ realLevel +".png");
            this.m_LabelMoves.getParent().addChild(this.m_MineGameLevel);
            this.m_MineGameLevel.setPosition(cc.p(this.m_LabelMoves.getPosition().x, this.m_LabelMoves.getPosition().y ));

            var sizeBgSpr = cc.Sprite.createWithSpriteFrameName("game_panel_level.png");
            var widthSide = sizeBgSpr.getContentSize().width - addLevelBtn.getContentSize().width * 2 - 5 * Defines.BASE_SCALE;
            var heightSize = sizeBgSpr.getContentSize().height - 5 * Defines.BASE_SCALE;
            var smallerScale = heightSize /this.m_MineGameLevel.getContentSize().height;
            if (widthSide/this.m_MineGameLevel.getContentSize().width < smallerScale){
                smallerScale = widthSide/this.m_MineGameLevel.getContentSize().width;
            }

            this.m_MineGameLevel.setScale(smallerScale);

            if (this.m_LabelMoves.getParent().getChildByTag(1001)){
                this.m_LabelMoves.getParent().removeChildByTag(1001);
            }
            var diamondNumLabel = GUI.createNumberLabel(curLevel.toString(), _GUIPath + "Num/num_3_14x18.png", 14, 18, "0");
            this.m_LabelMoves.getParent().addChild(diamondNumLabel,0, 1001);
            diamondNumLabel.setPosition(cc.p(this.m_LabelMoves.getPosition().x + 10 * Defines.BASE_SCALE, this.m_LabelMoves.getPosition().y - 30 * Defines.BASE_SCALE));
            if (curLevel > 99){
                diamondNumLabel.setPosition(cc.p(this.m_LabelMoves.getPosition().x- 5 * Defines.BASE_SCALE, this.m_LabelMoves.getPosition().y - 30 * Defines.BASE_SCALE));
            }


            this.m_LabelMoves.setVisible(false);
//                if (!this.m_MineDiamondStepOver)
//                {
//                    this.m_MineDiamondStepOver = cc.Sprite.createWithSpriteFrameName("wenzi-meibujian.png");
//                    this.m_LabelMoves.getParent().addChild(this.m_MineDiamondStepOver);
//                    this.m_LabelMoves.setVisible(false);
//                    this.m_MineDiamondStepOver.setPosition(cc.p(this.m_LabelMoves.getPosition().x - 30, this.m_LabelMoves.getPosition().y));
//
//                    var diamondImage = cc.Sprite.createWithSpriteFrameName("general_diamond_2.png");
//                    this.m_LabelMoves.getParent().addChild(diamondImage);
//                    diamondImage.setPosition(cc.p(this.m_LabelMoves.getPosition().x + 17, this.m_LabelMoves.getPosition().y));
//                    diamondImage.setScale(0.6);
//
//                    var diamondNumLabel = GUI.createNumberLabel("1", _GUIPath + "Num/num_3_14x18.png", 14, 18, "0");
//                    this.m_LabelMoves.getParent().addChild(diamondNumLabel);
//                    diamondNumLabel.setPosition(cc.p(this.m_LabelMoves.getPosition().x + 35, this.m_LabelMoves.getPosition().y - 7));
////                    this.m_MineDiamondStepOver.setScale(0.6);
//                }
        }
        else if (leftMoves != parseInt(this.m_LabelMoves.getString()))
        {
            this.m_LabelMoves.setString(leftMoves.toString());

            this.m_LabelMoves.stopAllActions();
            this.m_LabelMoves.runAction(cc.Sequence.create(
                cc.ScaleTo.create(Defines.FPS * 5, 1.8),
                cc.ScaleTo.create(Defines.FPS * 5, 1)
            ));
        }
    },

    _btnMineAddLevelCallback: function()
    {
        cc.DataMng.getInstance().addMineGameLevel();
    },

    _btnMineSubLevelCallback: function()
    {
        cc.DataMng.getInstance().subMineGameLevel();
    },

    //------------------------------------------------------------------------------------------------------------------
    updateContentForConditionMoves: function()
    {
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();

        if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_MINELOTTERY){
            this.miningGameContentForConditionMoves();
        }
        else if (curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_TIME && curLevelData.MODEL_MIX != Defines.TARGET_MODEL.MODEL_TIME)
        {
            var leftMoves = cc.DataMng.getInstance().getLeftTouchMoves();

            //
//            if(leftMoves <= 3)
//            {
//                cc.AudioMng.getInstance().playLeft3();
//            }

            if (leftMoves <= 5)
            {
                var key = "FreeItems_" + curLevelData.NAME + "_01";
				if (curLevelData.FREE_ITEM && !cc.DataMng.getInstance().isGameLevelGuidFinish(key, false))//添加免费道具的教学接口
				{	
					if (!cc.DataMng.getInstance().isGameLevelGuidFinish(key, false)){
						_ChangeGameLevelStateTo(cc.State_GameGuide.getInstance());
						var black = cc.GUIGameLevel.getInstance().getTotalButtonItemRectForGuide();
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

					}
				}
				
				if (!this.m_SpritePromptMovesEx)
                {
                    this.m_SpritePromptMovesEx = cc.Sprite.createWithSpriteFrameName("game_moves_prompt_1.png");
                    this.m_LabelMoves.getParent().addChild(this.m_SpritePromptMovesEx);
                    this.m_SpritePromptMovesEx.setPosition(this.m_LabelMoves.getPosition());
                    this.m_SpritePromptMovesEx.setScale(0.6);
                }

                this.m_SpritePromptMovesEx.setVisible(true);

                if (!this.m_SpritePromptMovesEx.getActionByTag(10001))
                {
                    var fadeActionEx = cc.RepeatForever.create(cc.Sequence.create(
                        cc.FadeTo.create(0.2, 0),
                        cc.DelayTime.create(0.2),
                        cc.CallFunc.create(function(sender)
                        {
                            sender.setOpacity(150);
                        }, this)
                    ));

                    fadeActionEx.setTag(10001);

                    this.m_SpritePromptMovesEx.setOpacity(150);
                    this.m_SpritePromptMovesEx.runAction(fadeActionEx);
                }

                //
                if (!this.m_SpritePromptMoves)
                {
                    this.m_SpritePromptMoves = cc.Sprite.createWithSpriteFrameName("game_moves_prompt_0.png");
                    this.m_LabelMoves.getParent().addChild(this.m_SpritePromptMoves);
                    this.m_SpritePromptMoves.setPosition(this.m_LabelMoves.getPosition());
                }

                this.m_SpritePromptMoves.setVisible(true);

                if (!this.m_SpritePromptMoves.getActionByTag(10001))
                {
                    var scaleAction = cc.RepeatForever.create(cc.Sequence.create(
                        cc.ScaleTo.create(0.4, 1.2),
                        cc.CallFunc.create(function(sender){
                            sender.setScale(0.6);
                        }, this)
                    ));

                    var fadeAction = cc.RepeatForever.create(cc.Sequence.create(
                        cc.FadeTo.create(0.4, 0),
                        cc.CallFunc.create(function(sender)
                        {
                            sender.setOpacity(255);
                        }, this)
                    ));

                    scaleAction.setTag(10001);
                    fadeAction.setTag(10002);

                    this.m_SpritePromptMoves.setScale(0.6);
                    this.m_SpritePromptMoves.runAction(scaleAction);
                    this.m_SpritePromptMoves.runAction(fadeAction);
                }
            }
            else
            {
                if (this.m_SpritePromptMoves)
                {
                    this.m_SpritePromptMoves.setVisible(false);
                    this.m_SpritePromptMoves.stopActionByTag(10001);
                    this.m_SpritePromptMoves.stopActionByTag(10002);
                }

                if (this.m_SpritePromptMovesEx)
                {
                    this.m_SpritePromptMovesEx.setVisible(false);
                    this.m_SpritePromptMovesEx.stopActionByTag(10002);
                }
            }

            //
            if (leftMoves != parseInt(this.m_LabelMoves.getString()))
            {
                this.m_LabelMoves.setString(leftMoves.toString());

                this.m_LabelMoves.stopAllActions();
                this.m_LabelMoves.runAction(cc.Sequence.create(
                    cc.ScaleTo.create(Defines.FPS * 5, 1.8),
                    cc.ScaleTo.create(Defines.FPS * 5, 1)
                ));
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateContentForTarget:function()
    {
        if (this.m_GameLevelTarget)
        {
            this.m_GameLevelTarget.updateTarget(this.m_SpriteTargetBg);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getGuidePromptPositions: function()
    {
        var promptPositions = [];
        var mainSize = this.m_MainUI.getContentSize();

        //
        if (this.m_SpriteMoveLabel)
        {
            var movesPosition = this.m_SpriteMoveLabel.getPosition();
            var movesLabelSize = this.m_SpriteMoveLabel.getContentSize();
            var promptConditionPosition = cc.pAdd(this.m_MainUI.getPosition(),
                cc.p(mainSize.width, movesPosition.y - movesLabelSize.height * 0.5));
        }
        else
        {
            var timerPosition = this.m_SpriteMoveLabel.getPosition();
            var timerLabelSize = this.m_SpriteMoveLabel.getContentSize();
            promptConditionPosition = cc.pAdd(this.m_MainUI.getPosition(),
                cc.p(mainSize.width, timerPosition.y - timerLabelSize.height * 0.5));
        }

        //
        var targetPosition = this.m_SpriteTargetBg.getPosition();
        var targetBgSize = this.m_SpriteTargetBg.getContentSize();
        var promptTargetPosition = cc.pAdd(this.m_MainUI.getPosition(),
            cc.p(mainSize.width, targetPosition.y + targetBgSize.height * 0.2));

        promptPositions.push(promptConditionPosition);
        promptPositions.push(promptTargetPosition);

        return promptPositions;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMovesRect: function()
    {
        if (this.m_LabelMoves)
        {
            var boundBox = this.m_LabelMoves.getParent().getBoundingBox();
            var origin = this.m_LabelMoves.getParent().convertToWorldSpace(cc.p(0, 0));
            return cc.rect(origin.x, origin.y, boundBox.width, boundBox.height * 2.0);
        }

        return this.getTimeRect();
    },

    //------------------------------------------------------------------------------------------------------------------
    getTimeRect: function()
    {
        if (this.m_LabelTime)
        {
            var boundBox = this.m_LabelTime.getParent().getBoundingBox();
            var origin = this.m_LabelTime.getParent().convertToWorldSpace(cc.p(0, 0));
            return cc.rect(origin.x, origin.y, boundBox.width, boundBox.height * 1.5);
        }

        return cc.rect(120, 470, 100, 100);
    },

    //------------------------------------------------------------------------------------------------------------------
    getTargetRect: function()
    {
        var boundBox = this.m_SpriteTargetBg.getBoundingBox();
        var origin = this.m_SpriteTargetBg.convertToWorldSpace(cc.p(0, 0));
        return cc.rect(origin.x, origin.y, boundBox.width, boundBox.height * 1.25);
    },

    //------------------------------------------------------------------------------------------------------------------
    getMainUI: function()
    {
        return this.m_MainUI;
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

        return this;
    }

});

cc.GUIGameLevelInfo.create = function ()
{
    var createNew = new cc.GUIGameLevelInfo();
    createNew.init();
    return createNew;
};