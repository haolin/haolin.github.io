//======================================================================================================================
cc.GUIMapStation = cc.GUIMapItem.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(mapZone, position)
    {
        this._super(mapZone, position);
    },

    //------------------------------------------------------------------------------------------------------------------
    loadContent: function(zoneMenu, wayPointNode)
    {
        //
        this.m_MainRender = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("map_space_station_nor.png"),
            cc.Sprite.createWithSpriteFrameName("map_space_station_nor.png"),
            cc.Sprite.createWithSpriteFrameName("map_space_station_disabled.png"),
            this._btnMapItemCallback, this
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
                var wayPoint = cc.Sprite.createWithSpriteFrameName("map_space_way_point.png");
                wayPointNode.addChild(wayPoint);
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

        if (this.m_Lock)
        {
            this.m_MainRender.setEnabled(false);
            return this;
        }

        //
        this.m_MainRender.setEnabled(true);

        //四个光
        var spaceLightPosition = [cc.p(86, 53), cc.p(97, 29), cc.p(20, 39), cc.p(150, 39)];

        var self = this;
        spaceLightPosition.forEach(function(position, index)
        {
            var spaceLight = cc.Sprite.createWithSpriteFrameName("map_space_light_" + index +".png");
            self.m_MainRender.addChild(spaceLight);
            spaceLight.setPosition(cc.pMult(position, Defines.BASE_SCALE));

            spaceLight.runAction(cc.RepeatForever.create(cc.Sequence.create(
                cc.FadeOut.create(1.0),
                cc.FadeIn.create(1.0)
            )));
        });

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    releaseContent: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //相对于整个地图的坐标
    getPlayerContentPosition: function()
    {
        var tempLevelSprite = cc.Sprite.createWithSpriteFrameName("map_space_station_nor.png");
        var tempLevelSize = tempLevelSprite.getContentSize();
        var originLevelPos = cc.pSub(this.convertToMapSpace(), cc.p(tempLevelSize.width/2, tempLevelSize.height/2));
        var toLevelPos = cc.pAdd(originLevelPos, cc.p(tempLevelSize.width * 0.16, tempLevelSize.height * 0.7));
        return cc.pAdd(toLevelPos, cc.p(-_PhotoSize().width/2, _PhotoSize().height/2));
    },

    //------------------------------------------------------------------------------------------------------------------
    //相对于区域的坐标
    getFriendPhotoPosition: function()
    {
        var tempLevelSprite = cc.Sprite.createWithSpriteFrameName("map_space_station_nor.png");
        var tempLevelSize = tempLevelSprite.getContentSize();
        return cc.pAdd(this.m_Position, cc.p(0, tempLevelSize.height/2 + _PhotoSize().height/2));
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
    handleEvent: function(sender, isAnimate, isAuto)
    {
        //
        if (!_MapItem_CanHandleEvent())
        {
            return this;
        }

        //
        if (cc.GUIMapMng.getInstance().getMaxProcessMapItem() != this)
        {
            if (!cc.GUIMapMng.getInstance().canReplaySpaceLevel())
            {
                cc.GUIMap.getInstance().setZonesEnabled(true);
                cc.GUIMap.getInstance().handleMapEnterAction(isAnimate);
                return this;
            }
        }

        //
        cc.GUIMap.getInstance().handleMapLeaveAction(isAnimate);

        //
        var myScene = cc.GUIMap.getInstance().getWindow().getParent();

        //直接弹通关
        var mapDefine = this.m_MapZone.getMapDefine();
        if (mapDefine.ID >= cc.GUIMapMng.getInstance().getMaxMapID())
        {
//            if(!Defines.IS_KO)
//            {
                cc.GUIMapNewZoneShare.getInstance().openWindow(myScene, true);
//            }

            return this;
        }

        //已经有五位好友帮助
        if (cc.GUIMapMng.getInstance().getMaxProcessMapItem() == this)
        {
            var helpData = cc.DataMng.getInstance().getFriendCokeHelp(mapDefine.ID.toString());
            cc.log("GUIMapStation-----helpData :" + helpData);

            if (helpData && helpData.length >= 3)
            {
                cc.GUIMsgView.getInstance().openWindow(myScene, Resource.ChineseTxt["space_8"]);
                cc.GUIMapMng.getInstance().unlockNewZone();
                return this;
            }
        }

        cc.log("mapDefine = " + mapDefine);
        //
        if (_UnlockNewStar_Option && !GUI._IsMapSpacePassed(mapDefine) && !isAuto)
        {
            cc.GUIMapSpaceOption.getInstance().openWindow(myScene, mapDefine);
        }
        else
        {
            cc.GUIMapCoke.getInstance().openWindow(myScene, mapDefine);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnMapItemCallback: function()
    {
        //
        if (cc.GUIMapMng.getInstance().getMaxProcessMapItem() != this)
        {
            if (!cc.GUIMapMng.getInstance().canReplaySpaceLevel())
            {
                return this;
            }
        }

        //
        cc.AudioMng.getInstance().playStarSelected();
        cc.GUIMap.getInstance().setZonesEnabled(false);

        this.m_MainRender.stopAllActions();
        this.m_MainRender.runAction(cc.Sequence.create(
            cc.ScaleTo.create(0.08, 1.2),
            cc.ScaleTo.create(0.08, 1),
            cc.CallFunc.create(this.handleEvent, this, true)
        ));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    autoStartNew: function(sender, toActivate)
    {
        //
        cc.GUIMap.getInstance().autoMoveHeadFrameToNext(function()
        {
            //
            this.setLock(false);
            this.updateContent();

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

            this.m_MapZone.getWindow().addChild(spriteFrame, 3000);
            spriteFrame.setPosition(cc.pAdd(this.m_Position, cc.p(0, 20)));
            spriteFrame.runAction(cc.Sequence.create(
                cc.Animate.create(unlockAnimation),
                cc.CallFunc.create(function(sender){

                    //
                    sender.removeFromParent(true);

                    //
                    if (toActivate)
                    {
                        //this.m_MainRender.activate();
                        this.handleEvent(this.m_MainRender, true, true);
                    }
                    else
                    {
                        cc.GUIMap.getInstance().setZonesEnabled(true);
                    }
					cc.log("GUIMapStation ------");
                    //
                    cc.GUIMapMng.getInstance().mapDidFinishUnlockAnim();

                }, this)
            ));
        }, this);

        return this;
    }
});

cc.GUIMapStation.create = function(mapZone, position)
{
    return new cc.GUIMapStation(mapZone, position)
};