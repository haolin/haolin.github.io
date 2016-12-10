//======================================================================================================================

cc.GUIMapZone = cc.GUIMapZoneBase.extend({

    description: function ()
    {
        return "GUIMapZone";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //数据定义
        this.m_MapDefine = null;

        //
        this.m_BackGround = null;
        this.m_ZoneMenu = null;
        this.m_ZoneNamePanel = null;
        this.m_PhotoLayer = null;

        //
        this.m_ContentLeft = false;

        //
        this.m_ZoneAnimFunc = {};

        //
        this.m_MapLevels = {};
        this.m_MapStation = null;
        this.mineLevelButton = null;
        //
        this.m_FriendPhotos = {};
        this.m_myInfo = {};

        this.m_zoneName = cc.NodeSelf.getInstance().getNick();
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(mapDefine)
    {
        this._super();

        //
        this.m_MapDefine = mapDefine;
        this.getWindow().setContentSize(this.m_MapDefine.SIZE);
        this.getWindow().setPosition(this.m_MapDefine.POSITION);

        //
        var tiledMapName = "MapZone_" + (this.m_MapDefine.ID + 1) + ".tmx";

        var builder = cc.TiledMapZoneBuilder.create(tiledMapName);

        this.m_MapLevels = builder.buildMapLevels(this);
        this.m_MapStation = builder.buildMapStation(this);

        //
        this.setLockState();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setLockState: function()
    {
        var processLevelData = cc.DataMng.getInstance().getMaxProcessLevelData();
        if (processLevelData.IS_SPACE_LEVEL)
        {
            //空间站不一定会有,用ID判断
            var isLock = this.m_MapDefine.SPACE_LEVELS_ID[0] > processLevelData.ID;

            if (this.m_MapStation)
            {
                this.m_MapStation.setLock(isLock);
            }

            //
            for (var pro in this.m_MapLevels)
            {
                if (this.m_MapLevels.hasOwnProperty(pro))
                {
                    this.m_MapLevels[pro].setLock(isLock);
                }
            }
        }
        else
        {
            for (var prop in this.m_MapLevels)
            {
                if (this.m_MapLevels.hasOwnProperty(prop))
                {
                    this.m_MapLevels[prop].setLock(this.m_MapLevels[prop].getLevelIndex() > processLevelData.ID + 1);
                }
            }

            if (this.m_MapStation)
            {
                this.m_MapStation.setLock(this.m_MapDefine.MAX_LEVEL_ID >= processLevelData.ID);
            }
        }
    },

    //------------------------------------------------------------------------------------------------------------------
    loadContent: function()
    {
        //
        this.m_BackGround = cc.MapZoneBackGroundTest.create();
        this.m_BackGround.setFlip(this.m_MapDefine.ID % 2);
        this.m_BackGround.display(this.getWindow());

        //
        if (this.m_MapDefine.ID == 0)
        {
            this.m_BackGround.addLeftDecoration(this.getWindow());
        }

        //
        this.m_ZoneMenu = cc.GUIMenu.create();
        this.m_ZoneMenu.setForceLength(30);
        this.m_ZoneMenu.setTouchHandle(cc.MENU_HANDLER_PRIORITY + 2, false);
        this.getWindow().addChild(this.m_ZoneMenu, 2000);

        //
        var wayPointBatchNode = cc.SpriteBatchNode.create(_MainMapPath + "MapWayPoint.png", 100);
        this.getWindow().addChild(wayPointBatchNode, 1000);

        for (var prop in this.m_MapLevels)
        {
            if (this.m_MapLevels.hasOwnProperty(prop))
            {
                this.m_MapLevels[prop].loadContent(this.m_ZoneMenu, wayPointBatchNode);
            }
        }

        if (this.m_MapStation)
        {
            this.m_MapStation.loadContent(this.m_ZoneMenu, this.getWindow());
        }

        //
        this.executeZoneAnimFunc();
        this.displayMeterAction();
        this.displayPathsAction();

        //防止头像压倒接缝
        this.m_PhotoLayer = cc.Layer.create();
        this.getWindow().getParent().addChild(this.m_PhotoLayer, 101);
        this.m_PhotoLayer.setContentSize(this.m_MapDefine.SIZE);
        this.m_PhotoLayer.setPosition(this.m_MapDefine.POSITION);

        this.showFriendsPhoto();

		//添加采矿入口
		if (!Defines.IS_EN && this.m_MapDefine.ID < 3 && Defines.isMineGameOpen){

//
			this.mineLevelButton = cc.MenuItemSprite.create(
				cc.Sprite.createWithSpriteFrameName("panel_guanqiarukou.png"),
				cc.Sprite.createWithSpriteFrameName("panel_guanqiarukou.png"),
				this._btnMineLevelCallback, this);
            this.mineLevelButton.setPosition(cc.p(1000 * Defines.BASE_SCALE, 500 * Defines.BASE_SCALE));

            var spriteFrame = cc.Sprite.createWithSpriteFrameName("mineBg_light.png");
            //
            this.mineLevelButton.addChild(spriteFrame, -1);
            spriteFrame.setPosition(cc.p(55 * Defines.BASE_SCALE, 55 * Defines.BASE_SCALE));
            spriteFrame.runAction(cc.RepeatForever.create(cc.RotateBy.create(18, 360)));
            this.m_ZoneMenu.addChild(this.mineLevelButton);
			cc.log("this.mineLevelButton = " + this.mineLevelButton+ " this.m_MapDefine.ID = " + this.m_MapDefine.ID);
		}


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnMineLevelCallback: function()
    {
        if (cc.GUIMineEnter.getInstance().isWindowOpen()){
            return ;
        }
        var myScene = cc.GUIMap.getInstance().getWindow().getParent();
        cc.MineMng.getInstance().setCurLevelKey(this.m_MapDefine.ID);
        var levelData = cc.MineMng.getInstance().getCurMineLevelData();

        cc.GUIMap.getInstance().setZonesEnabled(false);
        cc.GUIMineEnter.getInstance().openWindow(myScene,levelData,true);
    },

    //------------------------------------------------------------------------------------------------------------------
    showFriendsPhoto: function()
    {
//        return this;

        if (!cc.GUIMapMng.getInstance().canShowFriendPhoto())
        {
            return this;
        }

        var self = this;
        var allInfo = FriendsMng.getInstance().getFriendsInfos().concat();

        this.m_myInfo = {};

        allInfo.forEach(function(info)
        {
            var levelKey = info.getFinMaxLevelName();

            //
            var mapItem = cc.GUIMapMng.getInstance().getMapItemWithKey(levelKey);

            if (!mapItem)
            {
                return;
            }

            //
            var mapZone = mapItem.getMapZone();

            if (!mapZone || mapZone != self)
            {
                return;
            }

            //空间站可能会拥有三个Key
            var levelData = cc.DataMng.getInstance().getLevelDataWithName(levelKey);
            if (levelData && levelData.IS_SPACE_LEVEL)
            {
                var spaceLevelsID = self.m_MapDefine.SPACE_LEVELS_ID;
                levelKey = "SPACE_LEVEL_" + (spaceLevelsID[0] + 1);
            }

            //
            if (!self.m_myInfo[levelKey])
            {
                self.m_myInfo[levelKey] = [];
            }

            if (self.m_myInfo[levelKey].length >= 3)
            {
                return;
            }

            self.m_myInfo[levelKey].push(info);
        });

        //
        this.m_FriendPhotos = {};

        //
        var photoMenu = cc.GUIMenu.create();
        photoMenu.setTouchHandle(cc.MENU_HANDLER_PRIORITY + 2, false);
        this.m_PhotoLayer.addChild(photoMenu);

        //防止两个关卡之间的好友重叠
        var baseZOrder = 0;

        //
        for (var prop in self.m_myInfo)
        {
            if (self.m_myInfo.hasOwnProperty(prop))
            {
                var mapItem = cc.GUIMapMng.getInstance().getMapItemWithKey(prop);

                cc.log("every prop = " + self.m_myInfo[prop]);

                self.m_myInfo[prop].forEach(function(info, index, array)
                {
                    cc.log("GUIMapZone-----FriendInfo = " + info);

                    //
                    var photoUrl = info.getPhotoUrl();
                    var hasPhoto = photoUrl && photoUrl != "";
                    var photoBgFile = hasPhoto ? "map_photo_bg.png" : "general_default_photo_1.png";

                    //
                    var createPhoto =  cc.MenuItemSprite.create(
                        cc.Sprite.createWithSpriteFrameName(photoBgFile),
                        cc.Sprite.createWithSpriteFrameName(photoBgFile),
                        self._btnPhotoCallback, self);


                    var levelData = cc.DataMng.getInstance().getLevelDataWithName(prop);
					createPhoto.setTag(levelData.ID);
					if (levelData && levelData.IS_SPACE_LEVEL)
					{
						createPhoto.setTag(-1);
					}
                    
                    //头像
                    if (hasPhoto)
                    {
                        var bgSize = createPhoto.getContentSize();
                        var photo = cc.Sprite.create(photoUrl);
                        if (photo)
                        {
                            var size = photo.getContentSize();
                            photo.setScaleX((bgSize.width - 5 * Defines.BASE_SCALE) /size.width);
                            photo.setScaleY((bgSize.height - 5 * Defines.BASE_SCALE) /size.height);
                        }
                        else
                        {
                            photo = cc.Sprite.createWithSpriteFrameName("general_default_photo_1.png");
                        }

                        createPhoto.addChild(photo);
                        photo.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.5));
                    }

                    cc.log("GUIMapZone-----FriendInfo = " + info);

                    var photoPos = mapItem.getFriendPhotoPosition();

                    var zOrders = [1, 2, 0];
                    var dPositions = [
                        cc.p(0, 0),
                        cc.p(-10 * Defines.BASE_SCALE, -5 * Defines.BASE_SCALE),
                        cc.p(10 * Defines.BASE_SCALE, 5 * Defines.BASE_SCALE)
                    ];

                    //是否是有偏移
                    if (array.length >= 2)
                    {
                        photoPos.y += 5 * Defines.BASE_SCALE;
                        if (photoPos.x != mapItem.getPosition().x)
                        {
                            photoPos.x += 10 * Defines.BASE_SCALE;
                        }
                    }

                    //
                    var zOrder = baseZOrder + zOrders[index];
                    photoPos = cc.pAdd(photoPos, dPositions[index]);

                    photoMenu.addChild(createPhoto, zOrder);
                    createPhoto.setPosition(photoPos);

                    //
                    if (!self.m_FriendPhotos[prop])
                    {
                        self.m_FriendPhotos[prop] = [];
                    }

                    self.m_FriendPhotos[prop].push(createPhoto);
                });

                baseZOrder++;
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    reloadFriendsPhoto: function()
    {
        for (var prop in this.m_FriendPhotos)
        {
            if (this.m_FriendPhotos.hasOwnProperty(prop) && this.m_FriendPhotos[prop] instanceof Array)
            {
                this.m_FriendPhotos[prop].forEach(function(each)
                {
                    if (each && each.getParent())
                    {
                        each.removeFromParent(true);
                    }
                });
            }
        }

        //
        this.showFriendsPhoto();

        //
        if (this.m_ContentLeft)
        {
            for (var pro in this.m_FriendPhotos)
            {
                if (this.m_FriendPhotos.hasOwnProperty(pro) && this.m_FriendPhotos[pro] instanceof Array)
                {
                    this.m_FriendPhotos[pro].forEach(function(each)
                    {
                        each.setScale(0);
                    });
                }
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnPhotoCallback: function(sender)
    {
        if (cc.GUIGuideNormal.getInstance().isWindowOpen()){
            return this;
        }

        cc.log("GUImapzone_btnPhotoCallback");

        var levelDataID = sender.getTag();
		cc.log("levelDataID = " + levelDataID);
		if (levelDataID < 0){
			return this;
		}
        var targetLeveldata = cc.DataMng.getInstance().getLevelDataWithID(levelDataID, false);

        cc.log("targetLeveldata.NAME = " + targetLeveldata.NAME);

        cc.GUIMiniFriendsTop.getInstance().openWindow(cc.Director.getInstance().getRunningScene(),targetLeveldata.NAME);

//        cc.GUIFriendInfo.getInstance().openWindow(this.getWindow().getParent());
//        var handleKey = null;
//        var photoGroup = null;
//
//        for (var prop in this.m_FriendPhotos)
//        {
//            if (this.m_FriendPhotos.hasOwnProperty(prop))
//            {
//                if (this.m_FriendPhotos[prop].indexOf(sender) >= 0)
//                {
//                    handleKey = prop;
//                    photoGroup = this.m_FriendPhotos[prop];
//                    break;
//                }
//            }
//        }
//
//        //
//        if (!handleKey || !photoGroup || !photoGroup[0])
//        {
//            return this;
//        }
//
//        //标记是否摊开
//        if (!this.m_FriendPhotos.hasOwnProperty(handleKey + "_Handle"))
//        {
//            this.m_FriendPhotos[handleKey + "_Handle"] = false;
//        }
//
//        var handle = this.m_FriendPhotos[handleKey + "_Handle"];
//        this.m_FriendPhotos[handleKey + "_Handle"] = !handle;
//
//        //
//        var photoPos = photoGroup[0].getPosition();
//
//        //
//        if (photoGroup[1])
//        {
//            var disPos = handle
//                ? cc.pAdd(photoPos, cc.p(-10 * Defines.BASE_SCALE, -5 * Defines.BASE_SCALE))
//                : cc.pAdd(photoPos, cc.p(-_PhotoSize().width - 5 * Defines.BASE_SCALE, 0));
//
//            photoGroup[1].stopAllActions();
//            photoGroup[1].runAction(cc.MoveTo.create(0.25, disPos));
//        }
//
//        //
//        if (photoGroup[2])
//        {
//            disPos = handle
//                ? cc.pAdd(photoPos, cc.p(10 * Defines.BASE_SCALE, 5 * Defines.BASE_SCALE))
//                : cc.pAdd(photoPos, cc.p(_PhotoSize().width + 5 * Defines.BASE_SCALE, 0));
//
//            photoGroup[2].stopAllActions();
//            photoGroup[2].runAction(cc.MoveTo.create(0.25, disPos));
//        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayMeterAction: function()
    {
        //
        var contentSize = this.getWindow().getContentSize();

        var meteorParticle = cc.ParticleSystem.create(_MainMapPath + "Map_MeteorBlink.plist");
        meteorParticle.setPositionType(cc.PARTICLE_TYPE_GROUPED);
        this.getWindow().addChild(meteorParticle, -2000);

        //
        var meteor = cc.Sprite.createWithSpriteFrameName("meteor_0.png");
        this.getWindow().addChild(meteor, -1000);
        meteor.setRotation(-50);
        meteor.setOpacity(0);
        meteor.setPosition(cc.p(0, contentSize.height * 0.9));

        //
        this.getWindow().runAction(cc.RepeatForever.create(cc.Sequence.create(
            cc.DelayTime.create(3.0),
            cc.CallFunc.create(function()
            {
                meteor.runAction(cc.FadeIn.create(0.6));
                meteor.runAction(cc.RepeatForever.create(cc.Animate.create(
                    cc.Animation.create(cc.ResourceMng.getInstance().getAnimationFrames("meteor_"), Defines.FPS * 2))
                ));
                meteor.runAction(cc.Sequence.create(
                    cc.MoveTo.create(6.5, cc.p(contentSize.width * 0.73, -50)),
                    cc.CallFunc.create(function(){
                        meteor.setPosition(cc.p(0, contentSize.height * 0.9));
                        meteor.setOpacity(0);
                    })
                ));
            }),
            cc.DelayTime.create(12)
        )));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayPathsAction: function()
    {
        var mapLevels = [];

        for (var prop in this.m_MapLevels)
        {
            if (this.m_MapLevels.hasOwnProperty(prop))
            {
                mapLevels.push(this.m_MapLevels[prop]);
            }
        }

        //按关卡序号排序
        mapLevels.sort(function(level1, level2)
        {
            return level1.getLevelIndex() > level2.getLevelIndex() ? 1 : -1;
        });

        var wayPointsFirst = [];
        var wayPointsSecond = [];

        //将显示动画的星星集中
        mapLevels.forEach(function(each, index)
        {
            if (!each.getWayPoints)
            {
                return;
            }

            if (index <= 7)
            {
                wayPointsFirst = wayPointsFirst.concat(each.getWayPoints());
            }
            else
            {
                wayPointsSecond = wayPointsSecond.concat(each.getWayPoints());
            }
        });

        this.runPathsActionWithArray(wayPointsFirst);
        this.runPathsActionWithArray(wayPointsSecond);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    runPathsActionWithArray: function (wayPoints)
    {
        if (!wayPoints[0])
        {
            return this;
        }

        var self = this;
        var index = 0;

        wayPoints[0].schedule(function()
            {
                if (wayPoints[index])
                {
                    wayPoints[index].runAction(cc.Sequence.create(
                        cc.ScaleTo.create(Defines.FPS * 15, 1.3),
                        cc.ScaleTo.create(Defines.FPS * 15, 1)
                    ));
                }

                if (++index >= wayPoints.length)
                {
                    self.runPathsActionWithArray(wayPoints);
                }
            },
            Defines.FPS * 15,
            wayPoints.length - 1
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    runSpacePathActionWithArray: function(wayPoints)
    {
        if (!wayPoints[0])
        {
            return this;
        }

        var self = this;
        var index = 0;

        wayPoints[0].schedule(function()
            {
                if (wayPoints[index])
                {
                    wayPoints[index].runAction(cc.Sequence.create(
                        cc.FadeTo.create(Defines.FPS * 15, 255),
                        cc.FadeTo.create(Defines.FPS * 15, 200)
                    ));
                }

                if (++index >= wayPoints.length)
                {
                    self.runSpacePathActionWithArray(wayPoints);
                }
            },
            Defines.FPS * 30,
            wayPoints.length - 1
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMapLevels: function ()
    {
        return this.m_MapLevels;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMapStation: function ()
    {
        return this.m_MapStation;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMapDefine: function ()
    {
        return this.m_MapDefine;
    },

    //------------------------------------------------------------------------------------------------------------------
    getZoneMenu: function()
    {
        return this.m_ZoneMenu;
    },

    //------------------------------------------------------------------------------------------------------------------
    convertToWindowSpace: function()
    {
        var zonesBackGround = cc.GUIMap.getInstance().getZonesBackGround();
        var boundBox = zonesBackGround.getBoundingBox();

        var zonePosition = this.getWindow().getPosition();
        zonePosition = cc.pMult(zonePosition, zonesBackGround.getScale());

        return cc.pAdd(zonePosition, cc.p(boundBox.x, boundBox.y));
    },

    //------------------------------------------------------------------------------------------------------------------
    addPromptInfoContent: function()
    {
        if (this.m_ContentLeft)
        {
            return false;
        }

        if (cc.GUIMapMng.getInstance().isZoneContentLocked(this))
        {
            return false;
        }

        //var winSize = cc.Director.getInstance().getWinSize();
        var winSize = this.getWindow().getContentSize();
        var toWindowPosition = this.convertToWindowSpace();

        if (this.m_ZoneNamePanel || toWindowPosition.x > winSize.width * 0.5 || toWindowPosition.x < -winSize.width * 0.2)
        {
            return false;
        }

        this.m_ZoneNamePanel = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_name_back.png"),
            cc.Sprite.createWithSpriteFrameName("general_name_back.png"),
            this._btnStarNameCallback, this);
        var zoneName_menu = cc.Menu.create(this.m_ZoneNamePanel);
        zoneName_menu.setPosition(cc.p(0, 0));
//        zoneName_menu.setTouchHandle(cc.MENU_HANDLER_PRIORITY + 2, false);
        this.getWindow().addChild(zoneName_menu);

//        this.getWindow().addChild(this.m_ZoneNamePanel, 100);
        this.m_ZoneNamePanel.setPosition(
            cc.p(winSize.width * this.m_MapDefine.DESC_POS.x, winSize.height * this.m_MapDefine.DESC_POS.y));

        var contentSize = this.m_ZoneNamePanel.getContentSize();

        if (cc.NodeSelf.getInstance().isLogin()){
            if (this.m_MapDefine.ID != null){

                if (this.canGetStarName(this.m_MapDefine.ID)){
                    var titleNameText = cc.LabelTTF.create(this.getStarTitle(this.m_MapDefine.ID) + " 님의 행성", Defines.DefaultFont, 20 * Defines.BASE_SCALE);
                    this.m_ZoneNamePanel.addChild(titleNameText);
                    titleNameText.setAnchorPoint(cc.p(0.5, 0.5));
                    titleNameText.setPosition(cc.p(contentSize.width * 0.5, contentSize .height * 0.5));
                }
                else {
                    this.m_ZoneNamePanel.setVisible(false);
                    this.m_zoneName = "";
                }
            }
        }
        else {
            if (this.m_MapDefine.DESC_RES)
            {
                var zoneName = cc.Sprite.createWithSpriteFrameName(this.m_MapDefine.DESC_RES);
                this.m_ZoneNamePanel.addChild(zoneName);
                zoneName.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.5));
            }
        }


        var stars = [
            {_position: cc.p(0.15, 0.6), _scale: 0.8},
            {_position: cc.p(0.20, 0.0), _scale: 1.0},
            {_position: cc.p(0.80, 0.9), _scale: 1.0}
        ];

        var self = this;
        stars.forEach(function(each)
        {
            var zoneNameStar = cc.Sprite.createWithSpriteFrameName("map_zone_name_star.png");
            self.m_ZoneNamePanel.addChild(zoneNameStar, 0, 101);
            zoneNameStar.setPosition(cc.p(contentSize.width * each._position.x, contentSize.height * each._position.y));
            zoneNameStar.setScale(each._scale);
        });

//        zoneName.stopAllActions();
//        zoneName.setOpacity(0);
//        zoneName.runAction(cc.FadeIn.create(0.8));

//        this.m_ZoneNamePanel.stopAllActions();
//        this.m_ZoneNamePanel.setOpacity(0);
//        this.m_ZoneNamePanel.runAction(cc.FadeIn.create(0.8));

        return true;
    },

    refreshStarName : function()
    {
        if (!this.m_ZoneNamePanel){
            return this;
        }

        var newStarName = this.getStarTitle(this.m_MapDefine.ID);

//        cc.log(" newStarName = " +  newStarName);

        if (this.m_zoneName != newStarName){
            this.m_zoneName = newStarName;
        }
        else {
            return this;
        }

        this.m_ZoneNamePanel.removeAllChildren(true);

        var titleNameText = cc.LabelTTF.create(this.m_zoneName + " 님의 행성", Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        this.m_ZoneNamePanel.addChild(titleNameText);
        titleNameText.setAnchorPoint(cc.p(0.5, 0.5));
        titleNameText.setPosition(cc.p(contentSize.width * 0.5, contentSize .height * 0.5));
        this.m_ZoneNamePanel.setVisible(true);
        return this;
    },

    canGetStarName : function(mapID){
        if (!cc.NodeSelf.getInstance().isLogin() || !FriendsMng.getInstance() ){
            return false;
        }

        if (cc.DataMng.getInstance().getSingleStarScore(mapID) > 0){// 如果自己有分数就显示
            return true;
        }
        else if (!FriendsMng.getInstance().getStarScoreTop || !FriendsMng.getInstance().getStarScoreTop(mapID + 1) || FriendsMng.getInstance().getStarScoreTop(mapID + 1).length <= 0){
            return false;
        }

        return true;
    },

    getStarTitle : function(mapID)
    {
        var m_selfScore = cc.DataMng.getInstance().getSingleStarScore(mapID);

		if (!cc.NodeSelf.getInstance().isLogin() || !FriendsMng.getInstance() || !FriendsMng.getInstance().getStarScoreTop || !FriendsMng.getInstance().getStarScoreTop(mapID + 1)){
            if (m_selfScore > 0){
                return cc.NodeSelf.getInstance().getNick();
            }
            else {
                return "";
            }
		}

        var friendsInfosByScoreTop = FriendsMng.getInstance().getStarScoreTop(mapID + 1).concat();

        //玩家自身数据


        if (friendsInfosByScoreTop[0] != null && friendsInfosByScoreTop[0].score > m_selfScore){
            var localFriendInfo = FriendsMng.getInstance().getFriendInfoByRoleId(friendsInfosByScoreTop[0].userid);
            cc.log("getStarTitle");
            cc.log("getRoleId: " + localFriendInfo.getRoleId());
            cc.log("g_player.roleId: " + g_player.roleId);
            cc.log("getRoleId: " + cc.NodeSelf.getInstance().getRoleId());
            if(localFriendInfo.getRoleId() == g_player.roleId)
            {
                cc.log("mapID: " + mapID);
                cc.GUIAchievement.getInstance().addAchieveScore(Achieve.AchieveType.TYPE_NAME_STAGE,mapID);
            }

            this.m_zoneName = localFriendInfo.getName();

        }
        else {
            this.m_zoneName = cc.NodeSelf.getInstance().getNick();

            cc.log("show player name = " +this.m_zoneName);
            cc.GUIAchievement.getInstance().addAchievementScore(Achieve.AchieveType.TYPE_NAME_STAGE,mapID);
        }
        return this.m_zoneName;
    },


    _btnStarNameCallback: function()
    {
        if (cc.GUIMsgBox.getInstance().isWindowOpen() || cc.GUIGuideNormal.getInstance().isWindowOpen()){
            return this;
        }
        cc.AudioMng.getInstance().playButtonSound(true);
        cc.GUIMapScoreTop.getInstance().openWindow(cc.Director.getInstance().getRunningScene(), this.m_MapDefine.ID);
        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    removePromptInfoContent: function()
    {
        if (this.m_ContentLeft)
        {
            return false;
        }
        if (this.m_ZoneNamePanel)
        {
            var zoneName = this.m_ZoneNamePanel.getChildByTag(101);
            if (zoneName)
            {
                zoneName.runAction(cc.FadeOut.create(0.8));
            }

            var self = this;
            this.m_ZoneNamePanel.stopAllActions();
//            this.m_ZoneNamePanel.runAction(cc.Sequence.create(
//                cc.FadeOut.create(0.8),
//                cc.CallFunc.create(function()
//                {
                    self.m_ZoneNamePanel.removeFromParent(true);
                    self.m_ZoneNamePanel = null;
//                }, this)
//            ));

            return true;
        }

        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleZoneEnter: function(isAnimate)
    {
        //
        this.m_ContentLeft = false;

        //
        var processingLevel = cc.DataMng.getInstance().getMaxProcessLevelKey();

        for (var prop in this.m_MapLevels)
        {
            if (this.m_MapLevels.hasOwnProperty(prop) && this.m_MapLevels[prop].getMainRender())
            {
                var mapLevel = this.m_MapLevels[prop];

                mapLevel.handleMapItemEnter(isAnimate);

                //
                if (prop == processingLevel && mapLevel.getSpriteAureole())
                {
                    mapLevel.getSpriteAureole().setVisible(true);
                }
            }
        }

        //
        if (this.m_MapStation)
        {
            this.m_MapStation.handleMapItemEnter(isAnimate);
        }
		if (this.mineLevelButton){
			this.mineLevelButton.setVisible(true);
		}
        //
        for (var pro in this.m_FriendPhotos)
        {
            if (this.m_FriendPhotos.hasOwnProperty(pro) && this.m_FriendPhotos[pro] instanceof Array)
            {
                this.m_FriendPhotos[pro].forEach(function(each)
                {
                    if (isAnimate)
                    {
                        var size = each.getContentSize();
                        var enterAction = cc.ScaleTo.create(0.08, 1);
                        enterAction.setTag(1001);

                        each.stopActionByTag(1001);
                        each.runAction(enterAction);
                    }
                    else
                    {
                        each.setScale(1);
                    }
                });
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleZoneLeave: function(isAnimate)
    {
        //
        this.m_ContentLeft = true;

        //
        var processingLevel = cc.DataMng.getInstance().getMaxProcessLevelKey();

        for (var prop in this.m_MapLevels)
        {
            if (this.m_MapLevels.hasOwnProperty(prop) && this.m_MapLevels[prop].getMainRender())
            {
                var mapLevel = this.m_MapLevels[prop];

                mapLevel.handleMapItemLeave(isAnimate);

                //
                if (prop == processingLevel && mapLevel.getSpriteAureole())
                {
                    mapLevel.getSpriteAureole().setVisible(false);
                }
            }
        }
		
		if (this.mineLevelButton){
			this.mineLevelButton.setVisible(false);
		}
       
        //
        if (this.m_MapStation)
        {
            this.m_MapStation.handleMapItemLeave(isAnimate);
        }

        //
        for (var pro in this.m_FriendPhotos)
        {
            if (this.m_FriendPhotos.hasOwnProperty(pro) && this.m_FriendPhotos[pro] instanceof Array)
            {
                this.m_FriendPhotos[pro].forEach(function(each)
                {
                    if (isAnimate)
                    {
                        var enterAction = cc.ScaleTo.create(0.08, 0);
                        enterAction.setTag(1001);

                        each.stopActionByTag(1001);
                        each.runAction(enterAction);
                    }
                    else
                    {
                        each.setScale(0);
                    }
                });
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    releaseContent: function()
    {
        for (var prop in this.m_MapLevels)
        {
            if (this.m_MapLevels.hasOwnProperty(prop))
            {
                this.m_MapLevels[prop].releaseContent();
            }
        }

        if (this.m_MapStation)
        {
            this.m_MapStation.releaseContent();
        }

        if (this.getWindow()){
            this.getWindow().stopAllActions();
            this.getWindow().removeAllChildren(true);
        }

        this.m_BackGround = null;
        this.m_ZoneMenu = null;
        this.m_ZoneNamePanel = null;

        //好友头像
        if (this.m_PhotoLayer)
        {
            this.m_PhotoLayer.removeFromParent(true);
        }
        this.m_PhotoLayer = null;
        this.m_FriendPhotos = {};
		
//		if (this.mineLevelButton){
//			this.mineLevelButton.removeFromParent(true);
//		}

		
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setEnabled: function (isEnabled)
    {
        if (this.m_ZoneMenu && this.m_ZoneMenu.setEnabled)
        {
            this.m_ZoneMenu.setEnabled(isEnabled);
        }

        if (this.m_ZoneNamePanel && this.m_ZoneNamePanel.setEnabled)
        {
            this.m_ZoneNamePanel.setEnabled(isEnabled);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);
        this.loadContent();

        //
        this.getWindow().getParent().reorderChild(this.getWindow(), -this.m_MapDefine.ID);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();
        this.releaseContent();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isLock: function()
    {
        return cc.GUIMapMng.getInstance().isZoneContentLocked(this);
    },

    //------------------------------------------------------------------------------------------------------------------
    executeZoneAnimFunc: function()
    {
        var decoration = this.m_MapDefine.DECORATION;

        var mapAnim = cc.GUIMapAnim.create();
        mapAnim.executeZoneAnimFunc(this, decoration);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    reloadAnimContent: function()
    {
        this.getWindow().removeChildByTag(1001);

        this.executeZoneAnimFunc();

        //
        var decoration = this.getWindow().getChildByTag(1001);

        if (!decoration)
        {
            return this;
        }

        //
        decoration.setColor(cc.c3b(5, 5, 5));
        decoration.runAction(cc.TintTo.create(0.8, 255, 255, 255));

        //
        if (decoration instanceof cc.Sprite)
        {
            decoration.getChildren().forEach(
                function(each)
                {
                    if (each instanceof cc.Sprite)
                    {
                        each.setColor(cc.c3b(5, 5, 5));
                        each.runAction(cc.TintTo.create(0.8, 255, 255, 255));
                    }
                }
            );
        }

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIMapZone.create = function(mapDefine)
{
    var createNew = new cc.GUIMapZone();
    createNew.init(mapDefine);
    return createNew;
};