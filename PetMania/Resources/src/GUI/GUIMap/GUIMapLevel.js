//======================================================================================================================
cc.GUIMapLevel = cc.GUIMapItem.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(mapZone, position, level)
    {
        this._super(mapZone, position);

        //
        this.m_LevelIndex = level;

        this.m_LevelLabel = null;
        this.m_LightStars = [];
        this.m_SpriteAureole = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    loadContent: function(zoneMenu, wayPointBatchNode)
    {
        //
        this.m_MainRender = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("map_level_nor.png"),
            cc.Sprite.createWithSpriteFrameName("map_level_nor.png"),
            cc.Sprite.createWithSpriteFrameName("map_level_disabled.png"),
            this._btnLevelItemCallback, this
        );

        this.m_MainRender.setPosition(this.m_Position);

        if (zoneMenu)
        {
            zoneMenu.addChild(this.m_MainRender);
        }

        //
        var self = this;
        this.m_WayPointsPos.forEach(
            function(position, index)
            {
                var wayPoint = cc.Sprite.create(_MainMapPath + "MapWayPoint.png");
                wayPointBatchNode.addChild(wayPoint);
                wayPoint.setPosition(position);
                self.m_WayPoints[index] = wayPoint;
            });

        //
        this.updateContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateContent: function()
    {
        //
        if (!this.m_MainRender)
        {
            return this;
        }

        //
        if (this.m_Lock)
        {
            this.m_MainRender.setEnabled(false);
            return this;
        }

        //
        this.m_MainRender.setEnabled(true);

        //
        if (!this.m_LevelLabel)
        {
            this.m_LevelLabel = GUI.createNumberLabel(
                this.m_LevelIndex.toString(), _GUIPath + "Num/num_14_18x22.png", 18, 22, "0");
            this.m_MainRender.addChild(this.m_LevelLabel);

            var levelItemSize = this.m_MainRender.getContentSize();
            this.m_LevelLabel.setAnchorPoint(cc.p(0.5, 0.5));
            this.m_LevelLabel.setPosition(cc.p(levelItemSize.width * 0.5, levelItemSize.height * 0.65));

            if (this.m_LevelIndex >= 100)
            {
                this.m_LevelLabel.setScale(0.9);
            }
        }

        //
        var starPositions = [
            [cc.p(41, 19)],
            [cc.p(26, 19), cc.p(56, 19)],
            [cc.p(16, 19), cc.p(41, 19), cc.p(66, 19)]
        ];
        var gameLevelData = cc.DataMng.getInstance().getLevelDataWithID(this.m_LevelIndex - 1);

        var rateValue = !gameLevelData || !gameLevelData.HISTORY_MAX_SCORE ? 0 : Tools.getScoreRate(
            gameLevelData.HISTORY_MAX_SCORE.getFaceValue(), gameLevelData.TARGET_SCORES.concat());

        for (var index = this.m_LightStars.length; index < rateValue; index++)
        {
            var rockLight = cc.Sprite.createWithSpriteFrameName("map_rate_star_light.png");
            rockLight.setPosition(cc.pMult(starPositions[rateValue - 1][index], Defines.BASE_SCALE));
            this.m_MainRender.addChild(rockLight);
            this.m_LightStars.push(rockLight);
            rockLight.setScale(0.9);
        }

        //
        var processLevel = cc.GUIMapMng.getInstance().getProcessLevel();
        if (("LEVEL_" + this.m_LevelIndex) == processLevel && !this.m_SpriteAureole)
        {
            this.m_SpriteAureole = cc.Sprite.createWithSpriteFrameName("map_level_aureole.png");
            this.m_MapZone.getWindow().addChild(this.m_SpriteAureole, 1500);
            this.m_SpriteAureole.setPosition(this.m_MainRender.getPosition());

            this.m_SpriteAureole.runAction(cc.RepeatForever.create(cc.Sequence.create(
                cc.FadeTo.create(0.8, 0),
                cc.DelayTime.create(0.5),
                cc.CallFunc.create(function(sender)
                {
                    sender.setOpacity(255);
                }, this)
            )));

            this.m_SpriteAureole.runAction(cc.RepeatForever.create(cc.Sequence.create(
                cc.ScaleTo.create(0.8, 1.2),
                cc.DelayTime.create(0.5),
                cc.CallFunc.create(function(sender)
                {
                    sender.setScale(0.6);
                }, this)
            )));
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    releaseContent: function()
    {
        if (this.m_MainRender)
        {
            this.m_MainRender.removeAllChildren(true);
            this.m_MainRender.removeFromParent(true);
            this.m_MainRender = null;
            this.m_LevelLabel = null;
            this.m_SpriteAureole = null;

            this.m_WayPoints.splice(0, this.m_WayPoints.length);
            this.m_LightStars.splice(0, this.m_LightStars.length);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getLevelIndex: function()
    {
        return this.m_LevelIndex;
    },

    //------------------------------------------------------------------------------------------------------------------
    getSpriteAureole: function()
    {
        return this.m_SpriteAureole;
    },

    //------------------------------------------------------------------------------------------------------------------
    //相对于区域的坐标 计算玩家头像位置专用
    getPlayerContentPosition_ex: function()
    {
	
	
        var tempLevelSprite = cc.Sprite.createWithSpriteFrameName("map_level_nor.png");
        var tempLevelSize = tempLevelSprite.getContentSize();
        var originLevelPos = cc.pSub(this.convertToWindowSpace(), cc.p(tempLevelSize.width/2, tempLevelSize.height/2));
        var toLevelPos = cc.pAdd(originLevelPos, cc.p(tempLevelSize.width * 0.16, tempLevelSize.height * 0.7));
        var playerPos = cc.pAdd(toLevelPos, cc.p(-_PhotoSize().width/2, _PhotoSize().height/2));

        var mapDefine = this.m_MapZone.getMapDefine();
        if (mapDefine.SIZE.height - playerPos.y < _PhotoSize().height/2)
        {
            toLevelPos = cc.pAdd(originLevelPos, cc.p(tempLevelSize.width * 0.02, tempLevelSize.height * 0.3));
            playerPos = cc.pAdd(toLevelPos, cc.p(-_PhotoSize().width/2, _PhotoSize().height/2));
        }

        return playerPos;
    },

    //------------------------------------------------------------------------------------------------------------------
    //相对于整个地图的坐标
    getPlayerContentPosition: function()
    {
        var tempLevelSprite = cc.Sprite.createWithSpriteFrameName("map_level_nor.png");
        var tempLevelSize = tempLevelSprite.getContentSize();
        var originLevelPos = cc.pSub(this.convertToMapSpace(), cc.p(tempLevelSize.width/2, tempLevelSize.height/2));
        var toLevelPos = cc.pAdd(originLevelPos, cc.p(tempLevelSize.width * 0.16, tempLevelSize.height * 0.7));
        var playerPos = cc.pAdd(toLevelPos, cc.p(-_PhotoSize().width/2, _PhotoSize().height/2));

        var mapDefine = this.m_MapZone.getMapDefine();
        if (mapDefine.SIZE.height - playerPos.y < _PhotoSize().height/2)
        {
            toLevelPos = cc.pAdd(originLevelPos, cc.p(tempLevelSize.width * 0.02, tempLevelSize.height * 0.3));
            playerPos = cc.pAdd(toLevelPos, cc.p(-_PhotoSize().width/2, _PhotoSize().height/2));
        }

        return playerPos;
    },

    //------------------------------------------------------------------------------------------------------------------
    //相对于区域的坐标
    getFriendPhotoPosition: function()
    {
        var tempLevelSprite = cc.Sprite.createWithSpriteFrameName("map_level_nor.png");
        var tempLevelSize = tempLevelSprite.getContentSize();
        var friendPos = cc.pAdd(this.m_Position, cc.p(0, tempLevelSize.height * 0.5 + _PhotoSize().height/2));

        var mapDefine = this.m_MapZone.getMapDefine();
        if (mapDefine.SIZE.height - friendPos.y < _PhotoSize().height/2)
        {
            var originLevelPos = cc.pSub(this.m_Position, cc.p(tempLevelSize.width/2, tempLevelSize.height/2));
            var toLevelPos = cc.pAdd(originLevelPos, cc.p(tempLevelSize.width * 0.98, tempLevelSize.height * 0.3));
            friendPos = cc.pAdd(toLevelPos, cc.p(_PhotoSize().width/2, _PhotoSize().height/2));
        }

        return friendPos;
    },

    //------------------------------------------------------------------------------------------------------------------
    createHeadFrameAction: function()
    {
        return cc.Sequence.create(
            cc.DelayTime.create(0.5),
            cc.CallFunc.create(function(){
                cc.AudioMng.getInstance().playMapLevelUnlock(1);
            }),
            cc.MoveTo.create(1.0, this.getPlayerContentPosition())
        );
    },

    //------------------------------------------------------------------------------------------------------------------
    playRateAction: function(callback, target, data)
    {
        this.m_MainRender.runAction(cc.Sequence.create(
            cc.DelayTime.create(0.1),
            cc.CallFunc.create(callback, target, data)
        ));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnLevelItemCallback: function()
    {
        //
        cc.AudioMng.getInstance().playStarSelected();
        cc.GUIMap.getInstance().setZonesEnabled(false);

        this.m_MainRender.stopAllActions();
        this.m_MainRender.runAction(cc.Sequence.create(
            cc.ScaleTo.create(0.08, 1.3),
            cc.ScaleTo.create(0.08, 1),
            cc.CallFunc.create(this.handleEvent, this, true)
        ));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleEvent: function(sender, isAnimate)
    {
        //
        if (!_MapItem_CanHandleEvent())
        {
            return this;
        }

        //
        var myScene = cc.GUIMap.getInstance().getWindow().getParent();
        var levelData = cc.DataMng.getInstance().getLevelDataWithID(this.m_LevelIndex - 1, false);

        //
        if (cc.DataMng.getInstance().getCurrentHeart() <= 0)
        {
			cc.GUIBuyDiamond.getInstance().openWindow(myScene, 0, GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE);
            return this;
        }

        //

		if (levelData.MODEL == Defines.TARGET_MODEL.MODEL_MINELOTTERY){
			cc.GUIMineEnter.getInstance().openWindow(myScene,levelData,isAnimate);
		}
		else {
			cc.GUIMap.getInstance().setZonesEnabled(false);
			cc.GUIMap.getInstance().handleMapLeaveAction(isAnimate);
			
			cc.GUIGameLevelStart.getInstance().openWindow(myScene, levelData);
			cc.GUIGameLevelStart.getInstance().handleStartEnterAction(isAnimate);
			        //
			if(!isTelcomOperators() && cc.NodeSelf.getInstance().isLogin())
			{
				cc.GUIMyFriendsTop.getInstance().openWindow(myScene,cc.GUIGameLevelStart.getInstance());
			}
		}

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    autoStartNew: function (sender, toActivate)
    {
        cc.GUIMap.getInstance().autoMoveHeadFrameToNext(function()
        {
            //
            this.m_MainRender.setVisible(false);

            //
            cc.AudioMng.getInstance().playMapLevelUnlock(2);

            //
            var shakeSprite = cc.Sprite.createWithSpriteFrameName("map_level_disabled.png");
            this.m_MapZone.getWindow().addChild(shakeSprite);
            shakeSprite.setAnchorPoint(cc.p(0.5, -0.5));
            var mapLevelSize = shakeSprite.getContentSize();
            shakeSprite.setPosition(cc.pSub(this.m_Position, cc.p(0, mapLevelSize.height)));

            shakeSprite.runAction(cc.Sequence.create(
                cc.RotateTo.create(0.06,  8),
                cc.RotateTo.create(0.12, -8),
                cc.RotateTo.create(0.10,  6),
                cc.RotateTo.create(0.08, -6),
                cc.RotateTo.create(0.06,  4),
                cc.RotateTo.create(0.04, -4),
                cc.RotateTo.create(0.02, -2),
                cc.RotateTo.create(0.01,  0),
                cc.DelayTime.create(0.1),
                cc.CallFunc.create(function(sender){

                    //
                    sender.removeFromParent(true);

                    this.m_MainRender.setVisible(true);
                    this.setLock(false);
                    this.updateContent();
                    this.m_SpriteAureole && this.m_SpriteAureole.setVisible(false);

                    //
                    var unlockFrames = cc.ResourceMng.getInstance().getAnimationFrames("map_unlock_");
                    var unlockAnimation = cc.Animation.create(unlockFrames, 1/18);

                    //
                    cc.AudioMng.getInstance().playMapLevelUnlock(3);

                    //
                    var spriteFrame = cc.Sprite.createWithSpriteFrameName("map_unlock_0.png");
                    if (_UsePVR)
                    {
                        spriteFrame.setScale(2);
                    }

                    //
                    this.m_MapZone.getWindow().getParent().addChild(spriteFrame, 3000);
                    spriteFrame.setPosition(cc.pAdd(this.convertToMapSpace(), cc.p(0, 20 * Defines.BASE_SCALE)));
                    spriteFrame.runAction(cc.Sequence.create(
                        cc.Animate.create(unlockAnimation),
                        cc.CallFunc.create(function(sender){

                            //
                            sender.removeFromParent(true);

                            //
                            if (!cc.GUIMapMng.getInstance().isHaveGuideAnim() && toActivate)
                            {
                                this.m_MainRender.activate();
                            }
                            else
                            {
                                this.m_SpriteAureole && this.m_SpriteAureole.setVisible(true);
                                cc.GUIMap.getInstance().setZonesEnabled(true);
                            }
							cc.log("GUIMapLevel ------");
                            //
                            cc.GUIMapMng.getInstance().mapDidFinishUnlockAnim();

                        }, this)
                    ));
                }, this)
            ));
        }, this);

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIMapLevel.create = function(mapZone, position, level)
{
    return new cc.GUIMapLevel(mapZone, position, level)
};