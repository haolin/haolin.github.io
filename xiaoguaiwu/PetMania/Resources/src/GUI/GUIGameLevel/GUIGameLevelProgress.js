
//================================================== GUIGameLevel ===================================================
cc.GUIGameLevelProgress = cc.Class.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this.m_MainUI = null;

        this.m_ProgressBar = null;
        this.m_ProgressBarSrcSize = null;
        this.m_Stars = [];

        this.m_LastScore = null;
        this.m_LastMonsterNum = null;

        this.lightImage = null;
        this.lightText = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function ()
    {
        var self = this;

        //
        this.m_MainUI = cc.Sprite.createWithSpriteFrameName("game_panel_rate.png");
        this.m_MainUI.setAnchorPoint(cc.p(0.5, 0));
        this.m_MainUI.setPosition(cc.p(_ScreenWidth() - 46 * Defines.BASE_SCALE, 80 * Defines.BASE_SCALE));

        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        this.m_AniLightBack = cc.Sprite.createWithSpriteFrameName("escape_door0.png");
        this.m_MainUI.addChild(this.m_AniLightBack);
        this.m_AniLightBack.setBlendFunc(gl.SRC_ALPHA, gl.ONE);

        //
        this.m_AniLightBack.setAnchorPoint(cc.p(0.5, 1));
        this.m_AniLightBack.setPosition(cc.p(mainSize.width * 0.5 - 4 * Defines.BASE_SCALE, 65 * Defines.BASE_SCALE));
        var animation = cc.Animation.create(cc.ResourceMng.getInstance().getAnimationFrames("escape_door"), 1/25);
        var seq = cc.Sequence.create(cc.Animate.create(animation));
        this.m_AniLightBack.runAction(cc.RepeatForever.create(seq));

        //
        this.m_ProgressBar = cc.ProgressTimer.create(cc.Sprite.createWithSpriteFrameName("game_rate_bar.png"));
        this.m_MainUI.addChild(this.m_ProgressBar);
        this.m_ProgressBar.setAnchorPoint(cc.p(0.5, 0));
        this.m_ProgressBar.setPosition(cc.p(mainSize.width * 0.5 - 1.5 * Defines.BASE_SCALE, 27 * Defines.BASE_SCALE));

        this.m_ProgressBarSrcSize = this.m_ProgressBar.getContentSize();

        this.m_ProgressBar.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        this.m_ProgressBar.setMidpoint(cc.p(0.5, 0));
        this.m_ProgressBar.setBarChangeRate(cc.p(0, 1));

        //星星
        this.m_Stars[0] = cc.Sprite.createWithSpriteFrameName("game_star_gray.png");
        this.m_Stars[1] = cc.Sprite.createWithSpriteFrameName("game_star_gray.png");
        this.m_Stars[2] = cc.Sprite.createWithSpriteFrameName("game_star_gray.png");

        this.m_ProgressBar.addChild(this.m_Stars[0]);
        this.m_ProgressBar.addChild(this.m_Stars[1]);
        this.m_ProgressBar.addChild(this.m_Stars[2]);

        var curLevelData = cc.DataMng.getInstance().getCurLevelData();

        var starSizeHeight = this.m_Stars[0].getContentSize().height;
		//采矿模式闪电
		if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_MINELOTTERY){
			this.lightImage = cc.Sprite.createWithSpriteFrameName("icon-shandianjindutiao.png");
			this.m_ProgressBar.addChild(this.lightImage);
            this.lightImage.setPosition(cc.p(this.m_ProgressBarSrcSize.width * 0.5,
				this.m_ProgressBarSrcSize.height + starSizeHeight * 0.5));
            var targetPos = cc.p(this.m_ProgressBarSrcSize.width * 1.1,
                this.m_ProgressBarSrcSize.height);
            var countBg = cc.Sprite.createWithSpriteFrameName("shandian_count_bg.png");
            this.m_ProgressBar.addChild(countBg);
            countBg.setPosition(targetPos);

            this.lightText = GUI.createNumberLabel("100", _GUIPath + "Num/num_3_14x18.png", 14, 18, "0");
            this.m_ProgressBar.addChild(this.lightText);
            this.lightText.setAnchorPoint(cc.p(0.5, 0.5));
            this.lightText.setPosition(cc.p(targetPos.x - 1 * Defines.BASE_SCALE, targetPos.y + 2 * Defines.BASE_SCALE));
            this.lightText.setScale(0.5);

            this.m_Stars[0].setVisible(false);
            this.m_Stars[1].setVisible(false);
			this.m_Stars[2].setVisible(false);
		}
		else {
			var scoresArray = curLevelData.TARGET_SCORES.concat();

			this.m_Stars[0].setPosition(cc.p(this.m_ProgressBarSrcSize.width * 0.5,
				this.m_ProgressBarSrcSize.height * scoresArray[0]/scoresArray[2] + starSizeHeight * 0.5));
			this.m_Stars[1].setPosition(cc.p(this.m_ProgressBarSrcSize.width * 0.5,
				this.m_ProgressBarSrcSize.height * scoresArray[1]/scoresArray[2] + starSizeHeight * 0.5));
			this.m_Stars[2].setPosition(cc.p(this.m_ProgressBarSrcSize.width * 0.5,
				this.m_ProgressBarSrcSize.height * scoresArray[2]/scoresArray[2] + starSizeHeight * 0.5));
		}


        //飞碟
        var contentUFO = cc.Layer.create();//cc.LayerColor.create(cc.c4(32, 32, 32, 225));
        contentUFO.ignoreAnchorPointForPosition(false);
        this.m_ProgressBar.addChild(contentUFO, 1000);
        contentUFO.setAnchorPoint(cc.p(0.5, 0.8));
        contentUFO.setPosition(cc.p(this.m_ProgressBarSrcSize.width * 0.5, 0));

        //
        var spriteUFO = cc.Sprite.createWithSpriteFrameName("game_ufo.png");
        contentUFO.addChild(spriteUFO);
        var ufoSize = spriteUFO.getContentSize();
        contentUFO.setContentSize(ufoSize);
        spriteUFO.setPosition(cc.p(ufoSize.width * 0.5, ufoSize.height * 0.5));

        //
        var ellipseAction = Action_Ellipse.create(1, 5 * Defines.BASE_SCALE, 2.5 * Defines.BASE_SCALE);
        ellipseAction.runWithTarget(spriteUFO);

        //
        if (!Defines.LOW_PERFORMANCE)
        {
            var emitter = cc.ParticleSystem.create(_GUIPath + "GUIGameLevel/game_ufo_particle.plist");
            spriteUFO.addChild(emitter);
            emitter.setPosition(cc.p(ufoSize.width/2, 0));
            emitter.setScale(Defines.BASE_SCALE);
        }


        //
        this.m_ProgressBar.schedule(function()
        {
            var percentage = self.m_ProgressBar.getPercentage();
            var positionY = self.m_ProgressBarSrcSize.height * percentage / 100;
            if (positionY > contentUFO.getPosition().y || curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_MINELOTTERY)
            {
                contentUFO.setPositionY(positionY);
            }
            else
            {
                return;
            }

            if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_MINELOTTERY){
//                if (positionY <= contentUFO.getPosition().y)
//                {
//                    contentUFO.setPositionY(positionY);
//                }
            }
            else {
                for (var index = 0; index < 3; index ++)
                {
                    var star = self.m_Stars[index];

                    if (!star || star.m_IsMoving)
                    {
                        continue;
                    }

                    var starSize = star.getContentSize();

                    //飞碟移动到评级的位置才可,第三颗星底端位置和评级位置不同
                    //var checkPointY = star.getPosition().y - (index == 2 ? 0 : starSize.height * 0.5);
                    var checkPointY = star.getPosition().y - starSize.height * 0.5;

                    positionY = Math.round(positionY * 1000) * 0.001;
                    checkPointY = Math.round(checkPointY * 1000) * 0.001;

                    if (positionY < checkPointY)
                    {
                        break;
                    }

                    star.m_IsMoving = true;
                    self.displayJumpStar(star, index);


                }
            }
        });

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayJumpStar: function(target, index)
    {
        cc.AudioMng.getInstance().playStarRateWithIndex(index);

        //
        var jumpStar = cc.Sprite.createWithSpriteFrameName("game_star_light.png");
        target.addChild(jumpStar);
        var targetSize = target.getContentSize();
        jumpStar.setPosition(cc.p(targetSize.width * 0.5, targetSize.height * 0.5));

        //
        var starParticle =cc.ParticleSystem.create(_GUIPath + "GUIGameLevel/star_explode_particle.plist");
        jumpStar.addChild(starParticle);
        var jumpStarSize = jumpStar.getContentSize();
        starParticle.setPosition(cc.p(jumpStarSize.width/2, jumpStarSize.height/2));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMainUI: function()
    {
        return this.m_MainUI;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateContentForProgressBar:function()
    {
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();

        if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_MINELOTTERY){//采矿模式对进度条累计的修改
            var curMonsterNum = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_Monster");

            if (this.m_LastMonsterNum == curMonsterNum)
            {
                return this;
            }

            this.m_LastMonsterNum = curMonsterNum;

            cc.log("curMonsterNum = " + curMonsterNum);

            var showMonsterNum = cc.MineMng.getInstance().getPROGRESS_LINE() - curMonsterNum;

            if (showMonsterNum < 0){
                showMonsterNum = 0;
            }
            this.lightText.setString(showMonsterNum.toString());

            var toPercentage = curMonsterNum / cc.MineMng.getInstance().getPROGRESS_LINE() * 100;
            var fromPercentage = this.m_ProgressBar.getPercentage();
            if (fromPercentage < toPercentage)
            {
                var duration = (toPercentage - fromPercentage) / 100 * 1.2;
                duration = duration < 0.6 ? 0.6 : duration;
                this.m_ProgressBar.stopAllActions();
                this.m_ProgressBar.runAction(cc.ProgressFromTo.create(duration, fromPercentage, toPercentage));
            }
            else {
                var duration = 0.6;
                this.m_ProgressBar.stopAllActions();
//                this.m_ProgressBar.runAction(cc.ProgressTo.create(duration,toPercentage));
				this.m_ProgressBar.runAction(cc.ProgressFromTo.create(duration, fromPercentage, toPercentage));
            }
            return this;
        }
        var scoresArray = curLevelData.TARGET_SCORES.concat();

        var score = cc.DataMng.getInstance().getCurScore(true);

        //主要是应用于时间模式下每帧都会被调用，每一帧都不停的执行动作
        if (this.m_LastScore == score)
        {
            return this;
        }
        this.m_LastScore = score;

        var toPercentage = score / scoresArray[2] * 100;
        var fromPercentage = this.m_ProgressBar.getPercentage();
        if (fromPercentage < toPercentage)
        {
            var duration = (toPercentage - fromPercentage) / 100 * 1.2;
            duration = duration < 0.6 ? 0.6 : duration;
            this.m_ProgressBar.stopAllActions();
            this.m_ProgressBar.runAction(cc.ProgressFromTo.create(duration, fromPercentage, toPercentage));
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    enterActionWillDisplay: function()
    {
        this.m_Stars.forEach(function(each)
        {
            each.setScale(0);
        });

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    enterActionDidFinish: function()
    {
        this.m_Stars.forEach(function(each)
        {
            each.stopAllActions();
            each.runAction(cc.ScaleTo.create(Defines.FPS * 20, 1));
        });

        return this;
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

    getTopPos: function()
    {
       if (this.lightImage) {
           var lightPos = this.lightImage.getPosition();

           var targetPos = cc.pAdd(this.m_MainUI.getPosition(),this.m_ProgressBar.getPosition());

           return cc.p(this.m_MainUI.getPosition().x,targetPos.y + lightPos.y);
       }
       return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        if (this.m_MainUI)
        {
            this.m_MainUI.removeFromParent(true);
            this.m_MainUI = null;
        }

        return this;
    }
});

cc.GUIGameLevelProgress.create = function ()
{
    var createNew = new cc.GUIGameLevelProgress();
    createNew.init();
    return createNew;
};