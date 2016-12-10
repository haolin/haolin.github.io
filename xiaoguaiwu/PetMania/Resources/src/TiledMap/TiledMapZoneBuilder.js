
cc.TiledMapZoneBuilder = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_TiledMap = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    //构建游戏桌面
    init: function(tiledMapName)
    {
        //
        cc.ResourceMng.getInstance().addToCache(
            Resource._MainMap_plist,
            Resource._MainMap_png);

        //
        var mapPath = _MainMapPath + "";
        cc.log("========================="+mapPath + tiledMapName);
        this.m_TiledMap = cc.TMXTiledMap.create(mapPath + tiledMapName);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    buildMapLevels: function(mapZone)
    {
        if (!this.m_TiledMap)
        {
            return null;
        }

        var mapLevels = {};

        //关卡按钮的数据
        var levelGroup = this.m_TiledMap.getObjectGroup("MapLevels");
        if (levelGroup && levelGroup.getObjects())
        {
            var levelObjects = levelGroup.getObjects();

            //
            var tempLevelSprite = cc.Sprite.createWithSpriteFrameName("map_level_nor.png");
            var tempLevelSize = tempLevelSprite.getContentSize();

            levelObjects.forEach(
                function(obj)
                {
                    var x = parseInt(obj["x"]) * Defines.BASE_SCALE;
                    var y = parseInt(obj["y"]) * Defines.BASE_SCALE;
                    y = GUI.levelObjectsScaleToScreen(y);
                    var name = obj["name"];

                    mapLevels["LEVEL_" + name] = cc.GUIMapLevel.create(mapZone,
                        cc.pAdd(cc.p(x, y), cc.p(tempLevelSize.width/2, tempLevelSize.height/2)), parseInt(name));
                }
            );
        }

        //路径点的数据
        var pathGroup = this.m_TiledMap.getObjectGroup("LevelsPath");
        if (pathGroup && pathGroup.getObjects())
        {
            var pathObjects = pathGroup.getObjects();

            //
            var tempWayPoint = cc.Sprite.create(_MainMapPath + "MapWayPoint.png");
            var tempPointSize = tempWayPoint.getContentSize();

            pathObjects.forEach(
                function(obj)
                {
                    var name = parseInt(obj["name"]);
                    var x = parseInt(obj["x"]) * Defines.BASE_SCALE;
                    var y = parseInt(obj["y"]) * Defines.BASE_SCALE;
                    y = GUI.levelObjectsScaleToScreen(y);
                    var from = obj["From"];

                    var mapLevel = mapLevels["LEVEL_" + from];
                    if (mapLevel)
                    {
                        mapLevel.initWayPointsData(name,
                            cc.pAdd(cc.p(x, y), cc.p(tempPointSize.width/2, tempPointSize.height/2)));
                    }
                }
            );
        }

        return mapLevels;
    },

    //------------------------------------------------------------------------------------------------------------------
    buildMapStation: function(mapZone)
    {
        if (!this.m_TiledMap)
        {
            return null;
        }

        //
        var mapStation = null;

        //空间站
        var stationGroup = this.m_TiledMap.getObjectGroup("MapStation");
        if (stationGroup && stationGroup.getObjects())
        {
            var stationObjects = stationGroup.getObjects();

            //
            var tempStation = cc.Sprite.createWithSpriteFrameName("map_space_station_nor.png");
            var tempStationSize = tempStation.getContentSize();

            stationObjects.forEach(
                function(obj)
                {
                    var x = parseInt(obj["x"]) * Defines.BASE_SCALE;
                    var y = parseInt(obj["y"]) * Defines.BASE_SCALE;
                    y = GUI.levelObjectsScaleToScreen(y);
                    mapStation = cc.GUIMapStation.create(mapZone,
                        cc.pAdd(cc.p(x, y), cc.p(tempStationSize.width/2, tempStationSize.height/2)));
                }
            );
        }

        //最后一个太空站不加路径点
        /*var mapDefine = mapZone.getMapDefine();
        var maxSpaceID = cc.GUIMapMng.getInstance().getMaxSpaceLevelID();

        if (mapDefine.SPACE_LEVELS_ID[0] >= maxSpaceID)
        {
            return mapStation;
        }*/

        //路径点的数据
        var pathGroup = this.m_TiledMap.getObjectGroup("StationPath");
        if (pathGroup && pathGroup.getObjects())
        {
            var pathObjects = pathGroup.getObjects();

            //
            var tempWayPoint = cc.Sprite.createWithSpriteFrameName("map_space_way_point.png");
            var tempPointSize = tempWayPoint.getContentSize();

            pathObjects.forEach(
                function(obj)
                {
                    var name = parseInt(obj["name"]);
                    var x = parseInt(obj["x"]) * Defines.BASE_SCALE;
                    var y = parseInt(obj["y"]) * Defines.BASE_SCALE;
                    y = GUI.levelObjectsScaleToScreen(y);

                    if (mapStation)
                    {
                        mapStation.initWayPointsData(name,
                            cc.pAdd(cc.p(x, y), cc.p(tempPointSize.width/2, tempPointSize.height/2)));
                    }
                }
            );
        }

        return mapStation;
    }

    //------------------------------------------------------------------------------------------------------------------
});


cc.TiledMapZoneBuilder.create = function(tiledMapName)
{
    var createNew = new cc.TiledMapZoneBuilder();
    createNew.init(tiledMapName);
    return createNew;
};