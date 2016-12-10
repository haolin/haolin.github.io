
//解锁星球计费
var _UnlockNewStar_ByRMB = !isAppStoreWeiBo();

//可以选择解锁新星球的方式
var _UnlockNewStar_Option = true;

//======================================================================================================================
cc.GUIMapMng = cc.Class.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_Map = null;

        //
        this.m_LevelKey = "LEVEL_1";
        this.m_NextLevelIsNew = false;

        //
        this.m_ShowFriendPhoto = true;
        this.m_CanReplaySpaceLevel = true;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        //
        this.m_Map = cc.GUIMap.getInstance();

        //
        this.m_LevelKey = cc.DataMng.getInstance().getMaxProcessLevelKey();

        //For Debug
        this.m_OriginLevelKey = this.m_LevelKey;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    /**
     * 是否可在地图加载好友头像
     */
    canShowFriendPhoto: function()
    {
        return this.m_ShowFriendPhoto;
    },

    //------------------------------------------------------------------------------------------------------------------
    /**
     * 是否可重玩挑战关卡
     */
    canReplaySpaceLevel: function()
    {
        return this.m_CanReplaySpaceLevel;
    },

    //------------------------------------------------------------------------------------------------------------------
    resetNextLevelIsNew: function()
    {
        if (this.m_NextLevelIsNew)
        {
            this.getMaxProcessMapItem().setLock(false);
            this.getMaxProcessMapItem().updateContent();
            this.m_Map.updatePlayerContent();
            this.m_NextLevelIsNew = false;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    autoRestart: function(key, isAnimate)
    {
        var mapItem = this.getMapItemWithKey(key);

        if (!mapItem)
        {
            return this;
        }

        //
        mapItem.handleEvent(mapItem.getMainRender(), isAnimate, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    autoEnterNextWithFromKey: function(fromKey, toActivate)
    {
	
        //
        var nextKey = this.getNextMapItemKey(fromKey);
        if (!nextKey)
        {
            return this;
        }

        //
        var mapItem = this.getMapItemWithKey(nextKey);
        if (!mapItem)
        {
            return this;
        }

        //直接进入
        if (!this.m_NextLevelIsNew || !mapItem.isLock())
        {
            //强行设置一下
            this.m_NextLevelIsNew = false;
            mapItem.handleEvent(mapItem.getMainRender(), true, true);
            return this;
        }

        //解锁太空站关卡进入新星球
        var lastLevelData = cc.DataMng.getInstance().getLevelDataWithName(fromKey);
        var nextLevelData = cc.DataMng.getInstance().getLevelDataWithName(nextKey);

        if (lastLevelData.IS_SPACE_LEVEL && !nextLevelData.IS_SPACE_LEVEL)
        {
            this.m_Map.handleMapLeaveAction(true);
//            if(!Defines.IS_KO)
//            {
                cc.GUIMapNewZoneShare.getInstance().openWindow(this.m_Map.getWindow().getParent());
//            }

            return this;
        }

        //为新关卡,动画进入
        this.m_NextLevelIsNew = false;
        this.m_Map.setZonesEnabled(false);
        this.m_Map.autoMoveZonesBackToMapLevel(true, mapItem.autoStartNew, mapItem, toActivate);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    autoEnterNextWithKey: function(key, toActivate)
    {
        cc.log("autoEnterNextWithKey");

        //
        var mapItem = this.getMapItemWithKey(key);
        if (!mapItem)
        {
            return this;
        }

        //直接进入
        if (!this.m_NextLevelIsNew || !mapItem.isLock())
        {
            //强行设置一下
            this.m_NextLevelIsNew = false;
            mapItem.handleEvent(mapItem.getMainRender(), false, true);
            return this;
        }

        //为新关卡,动画进入
        this.m_NextLevelIsNew = false;
        this.m_Map.setZonesEnabled(false);
        this.m_Map.autoMoveZonesBackToMapLevel(true, mapItem.autoStartNew, mapItem, toActivate);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    autoEnterNewZone: function()
    {
        //
        var processKey = cc.DataMng.getInstance().getMaxProcessLevelKey();
        var mapLevel = this.getMapItemWithKey(processKey);
        var mapZoneID = mapLevel.getMapZone().getMapDefine().ID;

        //
        var nextMapZone = this.getMapZoneWithID(mapZoneID);
        nextMapZone && nextMapZone.reloadAnimContent();

        //
        this.autoEnterNextWithKey(processKey, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMapItemWithKey: function(key)
    {
        var gameLevelData = cc.DataMng.getInstance().getLevelDataWithName(key);

        var mapZones = this.m_Map.getMapZones();

        if (gameLevelData && gameLevelData.IS_SPACE_LEVEL)
        {
            for (var index = 0; index < mapZones.length; index++)
            {
                var spaceLevelsID = mapZones[index].getMapDefine().SPACE_LEVELS_ID;

                if (spaceLevelsID.indexOf(gameLevelData.ID) >= 0)
                {
                    return mapZones[index].getMapStation();
                }
            }

            return null;
        }

        for (index = 0; index < mapZones.length; index++)
        {
            var mapLevels =  mapZones[index].getMapLevels();
            if (mapLevels && mapLevels[key])
            {
                return mapLevels[key];
            }
        }

        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    getNextMapItemKey: function(fromKey)
    {
        var mapItem = this.getMapItemWithKey(fromKey);
        if (!mapItem)
        {
            return null;
        }

        //
        var mapZone = mapItem.getMapZone();
        var zoneDefine = mapZone.getMapDefine();

        var fromLevelData = cc.DataMng.getInstance().getLevelDataWithName(fromKey);

        //1.当前是太空站
        if (fromLevelData.IS_SPACE_LEVEL)
        {
            var spaceLevelsID = zoneDefine.SPACE_LEVELS_ID;

            if (fromLevelData.ID >= this.getMaxSpaceLevelID())
            {
                return null;
            }

            //1.1 下一关是否还是空间站
            if (fromLevelData.ID >= spaceLevelsID[spaceLevelsID.length - 1])
            {
                var nextLevelData = cc.DataMng.getInstance().getLevelDataWithID(zoneDefine.MAX_LEVEL_ID + 1, false);
                return nextLevelData.NAME;
            }
            else
            {
                nextLevelData = cc.DataMng.getInstance().getLevelDataWithID(fromLevelData.ID + 1, true);
                return nextLevelData.NAME;
            }
        }

        //2 当前是普通关卡
        //2.1下一关是普通关
        if (fromLevelData.ID < zoneDefine.MAX_LEVEL_ID)
        {
            nextLevelData = cc.DataMng.getInstance().getLevelDataWithID(fromLevelData.ID + 1, false);
            return nextLevelData.NAME;
        }

        //下一关是挑战关卡
        nextLevelData = cc.DataMng.getInstance().getLevelDataWithID(zoneDefine.SPACE_LEVELS_ID[0], true);
        return nextLevelData.NAME;

        //挑战关卡可以重玩 可忽略此检测
        /*//2.2.1下一关是太空站
        if (fromLevelData.ID >= this.getMaxMapLevelID())
        {
            nextLevelData = cc.DataMng.getInstance().getLevelDataWithID(zoneDefine.SPACE_LEVELS_ID[0], true);
            return nextLevelData.NAME;
        }

        //新区域的下一个关卡
        nextLevelData = cc.DataMng.getInstance().getLevelDataWithID(fromLevelData.ID + 1, false);
        var nextLevelItem = this.getMapItemWithKey(nextLevelData.NAME);
        var mapSpace = mapZone.getMapStation();

        if (!mapSpace || !nextLevelItem.isLock())
        {
            return nextLevelData.NAME;
        }

        //
        nextLevelData = cc.DataMng.getInstance().getLevelDataWithID(zoneDefine.SPACE_LEVELS_ID[0], true);
        return nextLevelData.NAME;*/
    },

    //------------------------------------------------------------------------------------------------------------------
    getMaxProcessMapItem: function()
    {
        return this.getMapItemWithKey(cc.DataMng.getInstance().getMaxProcessLevelKey());
    },

    //------------------------------------------------------------------------------------------------------------------
    getMaxProcessMapZoneID: function()
    {
		cc.log("getMaxProcessMapZoneID");
        return GUI._GetMapIDWithLevelData(cc.DataMng.getInstance().getMaxProcessLevelData());
    },

    //------------------------------------------------------------------------------------------------------------------
    getMapZoneWithID: function(zoneID)
    {
        var mapZones = this.m_Map.getMapZones();

        for (var index = 0; index < mapZones.length; index++)
        {
            var mapDefine = mapZones[index].getMapDefine();
            if (mapDefine.ID == zoneID)
            {
                return mapZones[index];
            }
        }

        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    update: function()
    {
		cc.log("GUIMapmng");
        var maxLevelData = cc.DataMng.getInstance().getMaxProcessLevelData();

        //new
        if (this.m_LevelKey != maxLevelData.NAME)
        {
            this.m_LevelKey = maxLevelData.NAME;
            this.m_NextLevelIsNew = true;
        }

        //old
        /*if (this.m_LevelKey != maxLevelData.NAME)
        {
            var lastLevelData = cc.DataMng.getInstance().getLevelDataWithName(this.m_LevelKey);
            if (lastLevelData.IS_SPACE_LEVEL && maxLevelData.IS_SPACE_LEVEL)
            {
                this.m_LevelKey = maxLevelData.NAME;
                return this;
            }

            this.m_LevelKey = maxLevelData.NAME;
            this.m_NextLevelIsNew = true;
        }*/

//        //评论
//        if (this.m_NextLevelIsNew)
//        {
//            RateMng.getInstance().parseRate();
//        }


		cc.log("GUIMapmng update end");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isZoneContentLocked: function(mapZone)
    {
        var processLevelData = cc.DataMng.getInstance().getMaxProcessLevelData();

        if (processLevelData.IS_SPACE_LEVEL)
        {
            return mapZone.getMapDefine().SPACE_LEVELS_ID[0] > processLevelData.ID;
        }

        //
        if (this.m_NextLevelIsNew)
        {
            return mapZone.getMapDefine().MIN_LEVEL_ID >= processLevelData.ID;
        }

        //
        return mapZone.getMapDefine().MIN_LEVEL_ID > processLevelData.ID;
    },

    //------------------------------------------------------------------------------------------------------------------
    mapDidEnter: function()
    {
		cc.log("mapDidEnter");
        //重新设置前三个道具
        var unlockLevels = [4, 4, 4, 11];
        var maxLevelData = cc.DataMng.getInstance().getMaxProcessLevelData();

        for (var index = 0; index < 4; index++)
        {
            var shouldUnlock = false;
            var unlockLevel = unlockLevels[index];

            if (maxLevelData.IS_SPACE_LEVEL || maxLevelData.ID >= unlockLevel)
            {
                shouldUnlock = true;
            }

            if (cc.DataMng.getInstance().isItemContainerEnable(index) != shouldUnlock)
            {
                cc.DataMng.getInstance().setItemContainerEnable(index, shouldUnlock);
            }
        }

        return this;
    },

	isHaveGuideAnim : function()
	{
		return (this.m_LevelKey == "LEVEL_6" && !cc.DataMng.getInstance().isGameLevelGuidFinish("GiveGift", false));
	},

    //------------------------------------------------------------------------------------------------------------------
    mapDidFinishUnlockAnim: function()
    {
        //ForDebug
        this.m_OriginLevelKey = this.m_LevelKey;

        if (this.m_LevelKey == "LEVEL_6")
        {
            cc.GUIGuideNormal.getInstance().showCustomCuteMonster("GiveGift",Resource.ChineseTxt[71]);
        }

//        //评论
//        if (RateMng.getInstance().shouldRate())
//        {
//            RateMng.getInstance().rate();
//        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    resetMaxProcessMapItem: function(itemKey)
    {
        //数据部分
        cc.DataMng.getInstance().setMaxProcessLevelKey(itemKey);

        //重新设置UI的最远状态
        this.m_LevelKey = itemKey;
        this.update();

        //
        var mapZones = this.m_Map.getMapZones();

        mapZones.forEach(
            function(mapZone)
            {
                mapZone.setLockState();
            }
        );

        //渲染部分
        if (!this.m_Map.isWindowOpen())
        {
            return this;
        }
        //
        this.mapDidEnter();

        //
        var mapItem = this.getMaxProcessMapItem();

        if (mapItem && mapItem.m_SpriteAureole)
        {
            mapItem.m_SpriteAureole.removeFromParent(true);
            mapItem.m_SpriteAureole = null;
        }

        /*if (this.m_Map.m_HeadFrame)
        {
            this.m_Map.m_HeadFrame.removeFromParent(true);
            this.m_Map.m_HeadFrame = null;
        }*/

        mapZones.forEach(
            function(mapZone)
            {
                if (mapZone.isWindowOpen())
                {
                    mapZone.releaseContent();
                    mapZone.loadContent();

                    if (mapZone.m_ContentLeft)
                    {
                        mapZone.handleZoneLeave(false);
                    }
                }
            }
        );

        //
        this.m_Map.updatePlayerContent();
        this.m_Map.notifiedUpdate();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    unlockAllForDebug: function()
    {
        //
        var maxLevelKey = "SPACE_LEVEL_" + (this.getMaxSpaceLevelID() + 1);

        //
        this.resetMaxProcessMapItem(maxLevelKey);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    lockAllForDebug: function()
    {
        //
        this.resetMaxProcessMapItem("LEVEL_1");

        //this.mapDidEnter();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _simulateGameLevelWin: function(curLevelData)
    {
        //
        if (cc.DataMng.getInstance().getMaxProcessLevelKey() == curLevelData.NAME)
        {
            //
            var nextLevelKey = this.getNextMapItemKey(curLevelData.NAME);

            if (nextLevelKey)
            {
                var nextLevelData = cc.DataMng.getInstance().getLevelDataWithName(nextLevelKey);

                if (nextLevelData)
                {
                    cc.DataMng.getInstance().setMaxProcessLevelKey(nextLevelKey);

                    //下一关是空间站关卡
                    if (curLevelData.IS_SPACE_LEVEL && nextLevelData.IS_SPACE_LEVEL)
                    {
                        cc.DataMng.getInstance().setNewCokeEndTime();
                    }
                }
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    unlockNextFroDebug: function()
    {
        cc.log("unlockNextFroDebug");
        //
        var curLevelData = cc.DataMng.getInstance().getMaxProcessLevelData();

        //
        if (curLevelData.IS_SPACE_LEVEL && curLevelData.ID >= this.getMaxSpaceLevelID())
        {
            return this;
        }

        //
        var curMapItem = this.getMaxProcessMapItem();
        if (curMapItem.m_SpriteAureole)
        {
            curMapItem.m_SpriteAureole.removeFromParent(true);
            curMapItem.m_SpriteAureole = null;
        }

        //
        if (curLevelData.IS_SPACE_LEVEL && cc.DataMng.getInstance().updateCokeEndTime() > 0)
        {
            cc.log("this.autoEnterNextWithKey(curLevelData.NAME, true);");
            cc.DataMng.getInstance().resetCokeEndTime(true);
            this.autoEnterNextWithKey(curLevelData.NAME, true);
            return this;
        }

        //
        cc.DataMng.getInstance().setCurLevelData(curLevelData);
        this._simulateGameLevelWin(curLevelData);

        //

        this.update();

        this.mapDidEnter();

        this.autoEnterNextWithFromKey(curLevelData.NAME, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    restoreLevelForDebug: function()
    {
        if (this.m_OriginLevelKey)
        {
            this.resetMaxProcessMapItem(this.m_OriginLevelKey);

            //this.mapDidEnter();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    unlockNextSpaceFroDebug: function()
    {
        //
        var curMapID = this.getMaxProcessMapZoneID();
        var curLevelData = cc.DataMng.getInstance().getMaxProcessLevelData();

        if (curLevelData.IS_SPACE_LEVEL)
        {
            if (curLevelData.ID >= this.getMaxSpaceLevelID())
            {
                return this;
            }

            //
            var nextMapID = curMapID + 1;
            var spaceLevelsID = this.getMapZoneWithID(nextMapID).getMapDefine().SPACE_LEVELS_ID;
            this.resetMaxProcessMapItem("SPACE_LEVEL_" + (spaceLevelsID[0] + 1));
            cc.DataMng.getInstance().resetCokeEndTime(true);

            //
            //this.mapDidEnter();

            return this;
        }

        //
        spaceLevelsID = this.getMapZoneWithID(curMapID).getMapDefine().SPACE_LEVELS_ID;
        this.resetMaxProcessMapItem("SPACE_LEVEL_" + (spaceLevelsID[0] + 1));
        cc.DataMng.getInstance().resetCokeEndTime(true);

        //
        //this.mapDidEnter();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    unlockNewZone: function()
    {
        //关闭支付的窗口
        var dirtyWindows = [cc.GUIMapSpaceOption, cc.GUIMapCoke, cc.GUIMapCokePrompt, cc.GUIMapFriendAid, cc.GUIBuyPrompt];
        dirtyWindows.forEach(
            function (each)
            {
                if (each.getInstance().isWindowOpen())
                {
                    each.getInstance().closeWindow();
                }
            }
        );

        //有支付一定有下一个地图
        var mapZone = this.getMaxProcessMapItem().getMapZone();
        var nextLevelIndex = mapZone.getMapDefine().MAX_LEVEL_ID + 2;
        var nextLevelName = "LEVEL_" + nextLevelIndex;

        //
        cc.DataMng.getInstance().setMaxProcessLevelKey(nextLevelName, true);
        cc.DataMng.getInstance().resetCokeEndTime(true);

        //保险
        if (!this.m_Map.isWindowOpen())
        {
            this.resetMaxProcessMapItem(nextLevelName);
            return this;
        }

        //进入分享页面
        this.m_Map.handleMapLeaveAction(true);
        var myScene = this.m_Map.getWindow().getParent();
//        if(!Defines.IS_KO)
//        {
            cc.GUIMapNewZoneShare.getInstance().openWindow(myScene);
//        }


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getProcessLevel: function()
    {
        return this.m_LevelKey;
    },

    //------------------------------------------------------------------------------------------------------------------
    isNextLevelNew: function()
    {
        return this.m_NextLevelIsNew;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMaxMapID: function()
    {
        var maxMapDefine = GUI.NORMAL_MAPS[GUI.NORMAL_MAPS.length - 1];
        return maxMapDefine.ID;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMaxMapLevelID: function()
    {
        var maxMapDefine = GUI.NORMAL_MAPS[GUI.NORMAL_MAPS.length - 1];
        return maxMapDefine.MAX_LEVEL_ID;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMaxSpaceLevelID: function()
    {
        var maxMapDefine = GUI.NORMAL_MAPS[GUI.NORMAL_MAPS.length - 1];
        return maxMapDefine.SPACE_LEVELS_ID[0];
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIMapMng._instance = null;
cc.GUIMapMng.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIMapMng();
        this._instance.init();
    }

    return this._instance;
};
