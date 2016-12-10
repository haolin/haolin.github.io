//从TiledMap创建关卡构造器

//======================================================================================================================
cc.TiledMapGameLevelBuilder = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(gameLevel, tileMapName)
    {
        //读取 *.tmx
        this.m_TiledMap = cc.TMXTiledMap.create(_TileMapsPath + "" + tileMapName);
        this.m_TiledMap.retain();

        //创建背景逻辑
        this.m_BackGroundCreator = TiledMapCreateBackGround.create(gameLevel);

        //构建传送门的逻辑
        this.m_TiledMapConnect = TiledMapBuilderConnect.create(this.getTiledMapProperty(Property.Connect));

        //构建路径逻辑
        this.m_TiledMapPaths = TiledMapPaths.create();

        //对象创建工具
        this.m_TiledMapObjectsFactory = cc.TiledMapGameObjectFactory.create();

        ///是否需要随机关卡
        this.m_IsNeedShuffle = gameLevel.SHUFFLE;

        //贪食蛇逻辑的关卡??????????????
        this.m_TiledMapPipePath = (gameLevel.MODEL == Defines.TARGET_MODEL.MODEL_SNAKE) ? this.createPipePath() : null;
    },

    //------------------------------------------------------------------------------------------------------------------
    //创建背景图片
    createPipePath: function()
    {
        var properties = {};
        var evProperties = {};

        var maxPipe = 5;
        for (var indx = 0; indx < maxPipe; ++indx)
        {
            //蛇道的路径类型和路径节点
            var key = Property.PipelinePath + indx.toString();

            var property = this.getTiledMapProperty(key);
            if (property)
            {
                properties[key] = property;
            }

            //蛇道的创建蛇配置，对应Property.CleanUp事件
            var evKey = Property.PPEvent + indx.toString();

            var evProperty = this.getTiledMapProperty(evKey);
            if (evProperty)
            {
                evProperties[evKey] = evProperty;
            }
        }

        return TiledMapPipePaths.create(properties, evProperties);
    },

    //------------------------------------------------------------------------------------------------------------------
    //创建背景图片
    isNeedShuffle: function()
    {
        return this.m_IsNeedShuffle;
    },

    //------------------------------------------------------------------------------------------------------------------
    //是否是贪吃蛇的关卡模式
    isPipleModel: function()
    {
        return this.m_TiledMapPipePath;
    },

    //------------------------------------------------------------------------------------------------------------------
    //创建背景图片
    release: function()
    {
        if (this.m_TiledMap)
        {
            cc.log("this.m_TiledMap 释放 不然就会内存泄漏");
            this.m_TiledMap.release();
            this.m_TiledMap = null;
        }

        this.m_BackGroundCreator = null;

        //构建传送门的逻辑
        this.m_TiledMapConnect = null;

        //构建路径逻辑
        this.m_TiledMapPaths = null;

        //对象创建工具
        this.m_TiledMapObjectsFactory = null;

        //贪吃蛇模式的管理者
        this.m_TiledMapPipePath = null;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //创建背景图片
    createBackGround: function()
    {
        return this.m_BackGroundCreator.create();
    },

    //------------------------------------------------------------------------------------------------------------------
    //位置
    buildTablePosition: function(screenWidth, screenHeight, gridSize)
    {
        return cc.p(
            screenWidth/2 - (gridSize * this.m_TiledMap.getMapSize().width)/2 + gridSize * 1.6,
            screenHeight + Math.abs(gridSize * this.m_TiledMap.getMapSize().height - screenHeight)/2 - gridSize/2
        );
    },

    //------------------------------------------------------------------------------------------------------------------
    //构建游戏桌面
    buildTable: function()
    {
        var self = this;

        var createNewTable = new cc.TiledMapTable(
            this.m_TiledMap.getMapSize().width,
            this.m_TiledMap.getMapSize().height
        );

        //数据往里填
        //初始化BackImage层 并创建格子(有图的地方才放格子)
        this._initGrids(createNewTable);

        //初始化"BottomObj" 层 对应TiledMap里编辑的名字
        this._initLayerObj(Property.BottomObj, createNewTable,
            function(_object)
            {
                if (_object && (_object instanceof cc.Obj_PipelinePathNode))
                {
                    if (self.m_TiledMapPipePath)
                    {
                        self.m_TiledMapPipePath.addPathNode(_object);
                    }
                }
            }
        );

        //初始化中间层
        this._initLayerObj(Property.MiddleObj, createNewTable);

        //初始化顶层
        this._initLayerObj(Property.TopObj, createNewTable,
            function(_object)
            {
                if (!_object)
                {
                    return;
                }

                if (_object instanceof cc.Obj_Begin)
                {
                    self.m_TiledMapPaths.addPathBegin(_object.getParentNode());
                }
            }
        );

        //初始化CeilObj顶层
        this._initLayerObj(Property.CeilObj, createNewTable,
            function(_object)
            {
                if (!_object)
                {
                    return;
                }

                if (_object instanceof cc.Obj_PipeFactory)
                {
                    cc.log("创建了 cc.Obj_PipeFactory = " + _object);
                }
            }
        );

        //添加传送门装饰
        if (this.m_TiledMapConnect)
        {
            this.updateTableConnect(createNewTable);
        }

        //
        this.m_TiledMapPaths.buildPaths(this.m_TiledMapConnect, createNewTable);

        //
        createNewTable.buildFinish(this.m_TiledMapPaths.clone());

        //贪吃蛇关卡专用
        if (this.m_TiledMapPipePath)
        {
            //贪吃蛇模式的关卡????
            this.m_TiledMapPipePath.buildPaths(createNewTable);
            //createNewTable.logPipePaths();
        }

        //返回产品
        return createNewTable;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateTableConnect: function(table)
    {
        if (!this.m_TiledMapConnect)
        {
            return this;
        }

        this.m_TiledMapConnect.get().forEach(
            function(info)
            {
                if (!info.vis)
                {
                    return;
                }

                if (info.from)
                {
                    var grid0 = table.getGrid(info.from.x, info.from.y);
                    if (grid0 && grid0 instanceof cc.NormalGrid)
                    {
                        grid0.setConnectFrom(true);
                    }
                }

                if (info.to)
                {
                    var grid1 = table.getGrid(info.to.x, info.to.y);
                    if (grid1 && grid1 instanceof cc.NormalGrid)
                    {
                        grid1.setConnectTo(true);
                    }
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getTiledMapProperty: function(propertyName)
    {
        if (!this.m_TiledMap)
        {
            return null;
        }

        //传送门问题
        var properties = this.m_TiledMap.getProperties();
        var a_property = properties[propertyName];
        if (!a_property)
        {
            for (var prop in properties)
            {
                if (properties.hasOwnProperty(prop))
                {
                    a_property = properties[prop][propertyName];
                    if (a_property)
                    {
                        break;
                    }
                }
            }
        }

        return a_property;
    },

    //------------------------------------------------------------------------------------------------------------------
    haveGameObject: function(objType, layerName)
    {
        var tiledMapObjGroup = this.m_TiledMap.getObjectGroup(layerName);
        if (!tiledMapObjGroup)
        {
            return false;
        }

        //
        var gameObjects = tiledMapObjGroup.getObjects();

        //
        for (var index = 0; index < gameObjects.length; index++)
        {
            var object = gameObjects[index];
            if (object["type"] == objType)
            {
                return true;
            }
        }

        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    //初始化"BackImage" 层 对应TiledMap里编辑的名字
    _initGrids: function(/*layerName, */table)
    {
        //背景格子 需要2个层来决定
        var validLayer = this.m_TiledMap.getLayer(Property.Valid);
        if (!validLayer)
        {
            cc.Assert(0);
        }

        //贪吃蛇专用
        var pipeLayer = this.isPipleModel() ? this.m_TiledMap.getLayer(Property.Pipe) : null;
        if (this.isPipleModel() && !pipeLayer)
        {
            cc.Assert(0);
        }

        //
        for (var x = 0; x < this.m_TiledMap.getMapSize().width; ++x)
        {
            for (var y = 0; y < this.m_TiledMap.getMapSize().height; ++y)
            {
                var grid = this._createGrid(validLayer, pipeLayer, cc.p(x, y));
                if (grid)
                {
                    table.setGrid(x, y, grid);
                }
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //创建格子
    _createGrid: function(tileLayer, pipeLayer, tilePos)
    {
        //拿精灵
        var tile = tileLayer.getTileAt(tilePos);
        if (!tile)
        {
            //
            if (pipeLayer)
            {
                //有管道层 就返回管道层的 格子
                var pipeTile = pipeLayer.getTileAt(tilePos);
                if (pipeTile)
                {
                    return cc.PipelineGrid.create(tilePos);
                }
            }

            //没有返回空的格子
            return cc.EmptyGrid.create(tilePos);
        }
        else
        {
            if (pipeLayer)
            {
                var pipeTileTest = pipeLayer.getTileAt(tilePos);
                if (pipeTileTest)
                {
                    cc.Assert(0, "管道格子和普通的格子放置的重复了!!!! + (" + tilePos.x + ", " + tilePos.y + ")");
                }
            }
        }


        //最后返回 普通格子
        return cc.NormalGrid.create(tilePos);
    },

    //------------------------------------------------------------------------------------------------------------------
    //添加对象给一层
    //layerName 层的名字
    checkObjectMatchGrid: function(layerName, createNew, gird)
    {
        if (!gird)
        {
            return this;
        }

        //
        var gridAndcreateNewIsMatch = (
            gird instanceof cc.NormalGrid && createNew instanceof cc.NormalObj
                || gird instanceof cc.EmptyGrid && createNew instanceof cc.EmptyObj
                || gird instanceof cc.PipelineGrid && (createNew instanceof cc.Obj_PipelinePathNode
                    || createNew instanceof cc.Obj_Snake
                    ||  createNew instanceof cc.Obj_PipeFactory)

            );

        if (!gridAndcreateNewIsMatch)
        {
            cc.log("类型和格子不匹配 gridAndcreateNewIsMatch");
        }

        //
        var objectsCheck = true;
        if (createNew instanceof cc.NormalObj)
        {
            var ceilCheck = layerName == Property.CeilObj
                && createNew.getGridLayerIndx() == Defines.NORMAL_GRID_OBJ_LAYER.CEIL;

            var topCheck = layerName == Property.TopObj
                && createNew.getGridLayerIndx() == Defines.NORMAL_GRID_OBJ_LAYER.TOP;

            var middleCheck = layerName == Property.MiddleObj
                && createNew.getGridLayerIndx() == Defines.NORMAL_GRID_OBJ_LAYER.MIDDLE;

            var bottomCheck = layerName == Property.BottomObj
                && createNew.getGridLayerIndx() == Defines.NORMAL_GRID_OBJ_LAYER.BOTTOM;

            objectsCheck = ceilCheck || topCheck || middleCheck || bottomCheck;

            if (!objectsCheck)
            {
                cc.log("格子层数不匹配 objectsCheck");
            }
        }

        //格子和对象类型不匹配，策划编辑问题
        if (!gridAndcreateNewIsMatch || !objectsCheck)
        {
            cc.Assert(0, "这个格子有问题!!! = " + gird.getGridPos().x + ", " + gird.getGridPos().y);
        }

        return gridAndcreateNewIsMatch && objectsCheck;
    },

    //------------------------------------------------------------------------------------------------------------------
    //添加对象给一层
    //layerName 层的名字
    _initLayerObj: function(layerName, table, handleObjectFunc)
    {
        var tiledMapObjGroup = this.m_TiledMap.getObjectGroup(layerName);
        if (!tiledMapObjGroup)
        {
            //编辑文件里没有这个 对象层?!
            return this;
        }

        var self = this;
        var gridSz = Math.min(this.m_TiledMap.getTileSize().width, this.m_TiledMap.getTileSize().height);
        if (this.m_TiledMap.getTileSize().width != this.m_TiledMap.getTileSize().height)
        {
            cc.log("this.m_TiledMap.getTileSize().width = " + this.m_TiledMap.getTileSize().width);
            cc.log("this.m_TiledMap.getTileSize().height = " + this.m_TiledMap.getTileSize().height);
            cc.Assert(0);
        }

        tiledMapObjGroup.getObjects().forEach(
            function(tileMapObj)
            {
                var createNew = self.m_TiledMapObjectsFactory.createObject(tileMapObj, self);
                if (!createNew)
                {
                    cc.log("没创建出来 对象");
                    return;
                }

                //
                var x = tileMapObj["x"];
                var y = tileMapObj["y"];

                //
                var gridPosX = x/gridSz;
                var gridPosY = self.m_TiledMap.getMapSize().height - y/gridSz - 1;
                var gird = table.getGrid(gridPosX, gridPosY);

                if (!self.checkObjectMatchGrid(layerName, createNew, gird))
                {
                    return;
                }

                //
                if (gird)
                {
                    gird.addNode(createNew);

                    if (handleObjectFunc)
                    {
                        handleObjectFunc(createNew);
                    }
                }
            }
        );

        return this;
    }
});

cc.TiledMapGameLevelBuilder.create = function(gameLevel, tileMapName)
{
    cc.log("___" + tileMapName);
    return new cc.TiledMapGameLevelBuilder(gameLevel, tileMapName);
};