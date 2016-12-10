
//======================================================================================================================
var ILoadHandler = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    onEnter: function(scene)
    {
        cc.log("进入 Scene_Loading 场景  **********************");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    onExit: function(scene)
    {
        cc.log("离开 Scene_Loading 场景  **********************");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    update: function(scene, time)
    {
        return this;
    }
});

//======================================================================================================================
var LoadHandler_Node = ILoadHandler.extend({

    //------------------------------------------------------------------------------------------------------------------
    onEnter: function(scene)
    {
        //
        this._super(scene);

        //清除一下这个
        cc.Director.getInstance().purgeCachedData();

        //
        //if (Defines.PLATFORM.isMobile())
        //{
        cc.AnimationCache.purgeSharedAnimationCache();
        //}

        //
        Tools.forceGC();

        if (_TimeToUpload)
        {
            _TimeToUpload = false;

            if (cc.DataMng.getInstance().getDirty().isDiamondDirty())
            {
                cc.log("LoadHandler_Node isDiamondDirty = true");
                cc.NodeHelper.getInstance().uploadDiamond(MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_DEFAULT);
            }

            if (cc.DataMng.getInstance().getDirty().isOthersDirty())
            {
                cc.log("LoadHandler_Node isOthersDirty = true");
                cc.NodeHelper.getInstance().uploadOthers();
            }
			

        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _isPVR: function(resName)
    {
        var ext = resName.substring(resName.lastIndexOf(".") + 1, resName.length);
        cc.log("ext = " + ext);
        return (ext == "pvr" || ext == "ccz");
    }
});

//======================================================================================================================
var LoadHandler_ToMainMenu = LoadHandler_Node.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(timer)
    {
        this._super();

        //
        this._timer = timer;
        this._startGameLog = null;
        this._isFinish = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    onEnter: function(scene)
    {
        //
        this._super(scene);

        //
        cc.SafeFile.getInstance().prepareBegin();

        //
        _InitAllDBOperations();

        //
        _DB_OP_GAME_LEVELS.prepareLoad();
        _DB_OP_GAME_ITEMS.prepareLoad();
        _DB_OP_GAME.prepareLoad();
        //_DB_OP_ITEM_RECORD.prepareLoad();
        //_DB_OP_MONEY_RECORD.prepareLoad();

        //启动NodeHelper
        if (!isTelcomOperators())
        {
            cc.NodeHelper.getInstance().onInitGame(ROBOT_IMEI);
            if (_IsNetWorkEnable())
            {
                cc.log("_StartGame 启动逻辑 检测网络, 有网络连接 = " + netWorkType);
                cc.NodeHelper.getInstance().onNetworkConnect();
            }
            else
            {
                cc.log("_StartGame 启动逻辑 检测网络, 没有网络连接");
            }
        }

        //
        this._startGameLog = Tools.MyTimeLog.create();
        this._startGameLog.start("初始化所有的管理器");

        //
        cc.ResourceMng.getInstance();
        this._startGameLog.addData("ResourceMng");

        //
        cc.ArmatureDataMng.getInstance();
        this._startGameLog.addData("ArmatureDataMng");

        //
        FriendsMng.getInstance();
        this._startGameLog.addData("FriendsMng");

        //
        MailMng.getInstance();
        this._startGameLog.addData("MailMng");

        //
        BIMng.getInstance();
        this._startGameLog.addData("BIMng");

        //
        cc.DataMng.getInstance();
        this._startGameLog.addData("DataMng");

        //
        RateMng.getInstance();
        this._startGameLog.addData("RateMng");

        //
        cc.AudioMng.getInstance();
        this._startGameLog.addData("AudioMng");
		
        RecomMng.getInstance();
        this._startGameLog.addData("RecomMng");
        //
        this._startGameLog.finish("初始化所有的管理器 完成!!!!!!!");

        //
        this._isFinish = true;

        //AppStore版本获取是否可使用兑换码
        if (isAppStoreWeiBo())
        {
            Game_ApplyCDKeySwitch.create();
			Game_ApplyTimeOutPassSwitch.create();
			Game_ApplyGuestBtnSwitch.create();
        }

        //获取是否开始春节活动
        //if (!Defines.IS_EN)
        {
            Game_ApplySpringFestivalSign.create();
			
//			Game_asyncGetGuestSwitch.create();

            Game_ApplyBannerADSwitch.create();

            Game_ApplyFullScreenADSwitch.create();

            Game_ApplyMoreDiamondADSwitch.create();

            Game_ApplyMoreGameADSwitch.create();

            Game_ApplyScoreRankingsSwitch.create();
        }


        //
        //ItemPack.getInstance().load();
        //Bank.getInstance().load();

        //
        _DB_OP_GAME_LEVELS.prepareLoadFinish();
        _DB_OP_GAME_ITEMS.prepareLoadFinish();
        _DB_OP_GAME.prepareLoadFinish();
        //_DB_OP_ITEM_RECORD.prepareLoadFinish();
        //_DB_OP_MONEY_RECORD.prepareLoadFinish();

        //
        cc.SafeFile.getInstance().prepareEnd();

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    onExit: function(scene)
    {
        this._super(scene);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    update: function(scene, time)
    {
        this._super(scene, time);

        if (this._isFinish)
        {
            cc.Director.getInstance().replaceScene(Scene_MainMenu.create(true));
//			cc.Director.getInstance().replaceScene(Scene_Roulette.create());
        }

        return this;
    }

});


//======================================================================================================================
var LoadHandler_ToMap = LoadHandler_Node.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(appendWindow, autoStartKey)
    {
        this._super();

        //
        this._appendWindow = appendWindow;
        this._autoStartKey = autoStartKey;
        this._loadArmature = false;
        this._timer = 1;

        //
        this._resForMap = [
            [Resource._GUIMap_plist, Resource._GUIMap_png],
            [Resource._MainMap_plist, Resource._MainMap_png],
            //[Resource.map_rainbow_plist, Resource.map_rainbow_png],
            [Resource.map_meteor_plist, Resource.map_meteor_png],
            [Resource.map_level_unlock_plist, Resource.map_level_unlock_png]
        ];
    },

    //------------------------------------------------------------------------------------------------------------------
    onEnter: function(scene)
    {
        this._super(scene);

        //
        var self = this;

        //
        if (_UsePVR)
        {
            //因为iOS pvr在这里会出现闪的情况
            this._resForMap.forEach(
                function(a_res)
                {
                    if (self._isPVR(a_res[1]))
                    {
                        cc.TextureCache.getInstance().addImage(a_res[1]);
                    }
                }
            );
        }

        cc.GUILoading.getInstance().openWindow(scene, this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    onExit: function(scene)
    {
        this._super(scene);
        cc.GUILoading.getInstance().closeWindow();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _loadRes: function()
    {
        if (this._resForMap.length > 0)
        {
            var firstRes = this._resForMap.shift();
            cc.ResourceMng.getInstance().addToCache(firstRes[0], firstRes[1]);

        }
        else if (!this._loadArmature)
        {
            cc.ArmatureDataMng.getInstance().registerForGame();
            cc.ArmatureDataMng.getGUIMap() && cc.ArmatureDataMng.getGUIMap().register();
            this._loadArmature = true;
        }

        return this._resForMap.length <= 0 && this._loadArmature;
    },

    //------------------------------------------------------------------------------------------------------------------
    update: function(scene, time)
    {
        this._super(scene, time);

        //
        var isLoadingFin = this._loadRes();
        this._timer -= time;
        if (isLoadingFin && this._timer <= 0)
        {
            cc.Director.getInstance().replaceScene(
                Scene_MainMap.create(this._appendWindow, false, this._autoStartKey));
        }

        return this;
    }
});

//======================================================================================================================
var LoadHandler_ToGameLevel = LoadHandler_Node.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //
        this._res = cc.ResourceMng.getInstance().getGameLevelResources().concat();

        //
        this._filterRes();
    },

    //------------------------------------------------------------------------------------------------------------------
    _filterRes: function()
    {
        var filterRes = [];

        //
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();

        //传送门
        if (curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_SNAKE
            && !_GameLevelBuilder.getTiledMapProperty(Property.Connect))
        {
            filterRes.push([Resource.gate_plist, Resource.gate_png]);
        }

        //哲理怪
        if (curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_BUBBLE
            && curLevelData.MODEL_MIX != Defines.TARGET_MODEL.MODEL_BUBBLE)
        {
            filterRes.push([Resource.bubble_creator_plist, Resource.bubble_creator_png]);
        }

        //种子
        if (curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_FLOWER)
        {
            filterRes.push([Resource.flower_plist, Resource.flower_png]);
        }

        //洗衣机
        if (curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_BOSS
            && curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_SNAKE
            && curLevelData.MODEL_MIX != Defines.TARGET_MODEL.MODEL_BOSS)
        {
            filterRes.push([Resource.hatch_plist, Resource.hatch_png]);
        }

        //炸弹
        if (!_GameLevelBuilder.haveGameObject(Property.Bomb, Property.MiddleObj))
        {
            if (!curLevelData.MAX_BOMBS && !curLevelData.MIN_BOMBS)
            {
                filterRes.push([Resource.bombs_plist, Resource.bombs_png]);
            }
        }

        //时间小怪物 同MonsterAddTimeMng:handleVisitFinish
        if (curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_SNAKE)
        {
            if (!curLevelData.TIME)
            {
                filterRes.push([Resource.monsters_time_plist, Resource.monsters_time_png]);
            }
        }

        //火流星 同GameLevelDataEx中的判断
//        if (!curLevelData.TARGET_DES_BUBBLES
//            && curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_UNLOCK)
//        {
//            filterRes.push([Resource.fireball_plist, Resource.fireball_png]);
//        }

        //采矿模式
       /* if (curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_MINE)
        {
            filterRes.push([Resource.caikuang_plist, Resource.caikuang_png]);
        }*/

		if (curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_MINELOTTERY)
        {
            filterRes.push([Resource.mine_plist, Resource.mine_png]);
        }
        //
        var self = this;
        filterRes.forEach(
            function(each)
            {
                var resIndex = self._getResIndex(each);
                if (resIndex >= 0)
                {
                    cc.log("------------------------------------------------------------\n"
                        + "LoadHandler_ToGameLevel:_filterRes = " + each[0] + ", " + each[1]);
                    self._res.splice(resIndex, 1);
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _getResIndex: function(res)
    {
        for (var index = 0; index < this._res.length; index++)
        {
            var oriRes = this._res[index];
            if (oriRes[0] == res[0] && oriRes[1] == res[1])
            {
                return index;
            }
        }

        return -1;
    },

    //------------------------------------------------------------------------------------------------------------------
    onEnter: function(scene)
    {
        this._super(scene);

        var self = this;

        //
        if (_UsePVR)
        {
            //因为iOS pvr在这里会出现闪的情况
            this._res.forEach(
                function(a_res)
                {
                    if (self._isPVR(a_res[1]))
                    {
                        cc.TextureCache.getInstance().addImage(a_res[1]);
                    }
                }
            );
        }

        //
        cc.GUILoading.getInstance().openWindow(scene, this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    onExit: function(scene)
    {
        this._super(scene);
        cc.GUILoading.getInstance().closeWindow();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _load: function()
    {
        if (this._res.length > 0)
        {
            var rs = this._res.shift();
            cc.ResourceMng.getInstance().addToCache(rs[0], rs[1]);
        }

        return this._res.length <= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    update: function(scene, time)
    {
        this._super(scene, time);

        //
        if (this._load())
        {
            cc.Director.getInstance().replaceScene(Scene_GameLevel.create(/*this._builder*/));
        }

        return this;
    }
});


//======================================================================================================================
var LoadHandler_RestartGameLevel = ILoadHandler.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(gameLevelData)
    {
        this._super();
        this._timer = 0.618;
        this._restartGameLevelData = gameLevelData;
    },

    //------------------------------------------------------------------------------------------------------------------
    onEnter: function(scene)
    {
        this._super(scene);
        cc.GUILoading.getInstance().openWindow(scene, this);

        cc.log("准备重启 = " + this._restartGameLevelData.NAME);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    onExit: function(scene)
    {
        this._super(scene);
        cc.GUILoading.getInstance().closeWindow();

        cc.log("重启完毕 = " + this._restartGameLevelData.NAME);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    prepare: function()
    {
        if (_GameLevelBuilder)
        {
            _GameLevelBuilder.release();
            _GameLevelBuilder = null;
        }

        //
        cc.log("再次设置DataMng = " + this._restartGameLevelData.NAME);
        cc.DataMng.getInstance().setCurLevelData(this._restartGameLevelData);
        var levelData = cc.DataMng.getInstance().getCurLevelData();

        //添加新的日记
        DiaryManager.getInstance().activeNewDiaryOfGameLevel(levelData);
        cc.log("重启创建了新的日记 = " + DiaryManager.getInstance().getCurrentDiaryOfGameLevel());

        //
        cc.log("重启关卡 = " + levelData.NAME);
        _GameLevelBuilder = cc.TiledMapGameLevelBuilder.create(levelData, levelData.TILED_MAP_NAME);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    update: function(scene, time)
    {
        this._super(scene, time);

        //
        this._timer -= time;
        if (this._timer <= 0)
        {
            this.prepare();

            cc.log("重启完成，准备再次进入场景");
            cc.Director.getInstance().replaceScene(Scene_GameLevel.create());
        }

        return this;
    }
});


