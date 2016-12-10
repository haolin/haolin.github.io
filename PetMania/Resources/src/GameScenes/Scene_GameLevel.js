
//
var _GameLevelScene = null;
var _GameLevelStateWrapper = null;
var _GameLevelBuilder = null;

//
var Scene_GameLevel = cc.Scene.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        //
        this._super();
        cc.associateWithNative(this, cc.Scene);
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "Scene_GameLevel";
    },

    //------------------------------------------------------------------------------------------------------------------
    addLayers: function()
    {
        cc.log("添加游戏关卡相关的Layer");

        for (var prop1 in Defines.CHILD_LAYERS)
        {
            if (Defines.CHILD_LAYERS.hasOwnProperty(prop1))
            {
                cc.log("添加了 Layer = " + prop1);
                this.addChild(
                    cc.Layer.create(),
                    Defines.CHILD_LAYERS[prop1].Z,
                    Defines.CHILD_LAYERS[prop1].TAG);
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    removeAllLayers: function()
    {
        for (var prop1 in Defines.CHILD_LAYERS)
        {
            if (Defines.CHILD_LAYERS.hasOwnProperty(prop1))
            {
                this.removeChildByTag(Defines.CHILD_LAYERS[prop1].TAG);
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _initBatchNodes: function()
    {
        //
        var objCapacity = 81;
        cc.log("objCapacity = " + objCapacity);

        //初始化所有batchNode
        gridBatchNode(objCapacity);

        //
        bottomObjBatchNode();
        objectsBatchNode(objCapacity);
        topObjBatchNode();

        //
        effectBatchNode(objCapacity);
        effectBatchNodeWithBlend(objCapacity);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    onEnter: function()
    {
        this._super();

        //Step1
        _GameLevelScene = this;

        //Step2 初始化所有Layers
        this.addLayers();

        //Step3 初始化所有BatchNode
        this._initBatchNodes();

        //
        _GameLevelStateWrapper = cc.GameStateWrapper.create();
        _GameLevelStateWrapper.wrapperStartGameLevel();

        //
        _ChangeGameLevelStateTo(cc.State_GameLevel.getInstance().resetState());

        //释放掉builder
        if (_GameLevelBuilder)
        {
            _GameLevelBuilder.release();
            _GameLevelBuilder = null;
        }

        //
        cc.log("进入关卡 dumpCachedTextureInfo");
        //cc.TextureCache.getInstance().dumpCachedTextureInfo();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    onExit: function()
    {
        cc.log("退出游戏场景开始");

        this._super();

        //
        _GameLevelStateWrapper.wrapperEndGameLevel();

        //Step1:
        _ChangeGameLevelStateTo(new cc.IState());

        //
        var restart = _GameLevelStateWrapper.isNeedRestart();
        cc.log("是否重启关卡 ＝ " + restart);

        //
        if (_GameLevelStateWrapper)
        {
            _GameLevelStateWrapper.release();
            _GameLevelStateWrapper = null;
        }

        //释放掉builder
        if (_GameLevelBuilder)
        {
            _GameLevelBuilder.release();
            _GameLevelBuilder = null;
        }

        //Step2: 这个值清除掉
        //
        this.removeAllLayers();
        _GameLevelScene = null;

        //
        DiaryManager.getInstance().cleanDiariesOfGameLevel();

        //
        if (!restart)
        {
            cc.ResourceMng.getInstance().cleanUpGameLevelResources();
        }
        else
        {
            cc.log("需要重启关卡, 所以不需要清理资源");
        }

        //
        //cc.log("离开关卡 dumpCachedTextureInfo");
        //cc.TextureCache.getInstance().dumpCachedTextureInfo();

        this.removeAllChildren(true);

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //更新
    update: function(time)
    {
        if (_GameLevelStateWrapper)
        {
            _GameLevelStateWrapper.update(time);
            cc.ArmatureDataMng.getInstance().update(time);
        }

        return this;
    }
});

//======================================================================================================================
var _ChangeGameLevelStateTo = function(state, stackDesc)
{
    if (stackDesc)
    {
        cc.log(stackDesc + "     _ChangeGameLevelStateTo => " + state.description());
    }

    if (_GameLevelStateWrapper)
    {
        _GameLevelStateWrapper.changeTo(state);
    }
};

//======================================================================================================================
var _GetCurGameLevelState = function()
{
    return _GameLevelStateWrapper ? _GameLevelStateWrapper.getCurState() : null;
};

//======================================================================================================================
Scene_GameLevel.create = function(gameLevelBuilder)
{
    var newScene = new Scene_GameLevel(gameLevelBuilder);
    if (newScene)
    {
        newScene.unscheduleAllCallbacks();
        newScene.schedule(newScene.update, Defines.FPS);
    }

    return newScene;
};

//======================================================================================================================
Scene_GameLevel.changeTo = function()
{
    if (_GameLevelBuilder)
    {
        _GameLevelBuilder.release();
        _GameLevelBuilder = null;
    }

    //
    var levelData = cc.DataMng.getInstance().getCurLevelData();

    //添加新的日记
    DiaryManager.getInstance().activeNewDiaryOfGameLevel(levelData);
    cc.log("Scene_GameLevel 创建了新的日记 = " + DiaryManager.getInstance().getCurrentDiaryOfGameLevel());

    //
    cc.log("Scene_GameLevel 准备进入关卡 = " + levelData.NAME);
    _GameLevelBuilder = cc.TiledMapGameLevelBuilder.create(levelData, levelData.TILED_MAP_NAME);

    //必须先进入 Scene_Loading
    cc.Director.getInstance().replaceScene(
        Scene_Loading.create(
            new LoadHandler_ToGameLevel()
        )
    );
};

//======================================================================================================================
//======================================================================================================================
//======================================================================================================================
//======================================================================================================================
//简化调用，就是防止函数写的太长
var backGroundLayer = function()
{
    return _GameLevelScene ? _GameLevelScene.getChildByTag(Defines.CHILD_LAYERS.BACK_GROUND.TAG) : null;
};

var gameTableLayer = function()
{
    return _GameLevelScene ? _GameLevelScene.getChildByTag(Defines.CHILD_LAYERS.TABLE.TAG) : null;
};

var _GUILayer = function()
{
    return _GameLevelScene ? _GameLevelScene.getChildByTag(Defines.CHILD_LAYERS.GUI.TAG) : null;
};

var animateLayer = function()
{
    return _GameLevelScene ? _GameLevelScene.getChildByTag(Defines.CHILD_LAYERS.ANIMATE.TAG) : null;
};

//
var getBatchNodeFromLayer = function(layer, resource, zOrder, tag, setBlend, capacity)
{
    var batchNode = layer.getChildByTag(tag);
    if (!batchNode)
    {
        cc.log("resource = " + resource + ", capacity = " + capacity);
        batchNode = cc.SpriteBatchNode.create(resource, (capacity || 30));

        layer.addChild(
            batchNode,
            zOrder,
            tag);

        if (setBlend)
        {
            batchNode.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
        }
    }

    return batchNode;
};

var getNodeFromLayer = function(layer, zOrder, tag)
{
    var newNode = layer.getChildByTag(tag);
    if (!newNode)
    {
        cc.log("tag = " + tag);

        newNode = cc.Node.create();

        layer.addChild(
            newNode,
            zOrder,
            tag);
    }

    return newNode;
};

var gridBatchNode = function(capacity)
{
    return getBatchNodeFromLayer(gameTableLayer(),
        Resource.normalGrid,
        Defines.BATCH_NODE.GRIDS.Z,
        Defines.BATCH_NODE.GRIDS.TAG, false, capacity);
};

var gridBatchNodePipe = function(capacity)
{
    return getBatchNodeFromLayer(gameTableLayer(),
        Resource.pipeGrid,
        Defines.BATCH_NODE.GRIDS_PIPLE.Z,
        Defines.BATCH_NODE.GRIDS_PIPLE.TAG, false, capacity);
};

var bottomObjBatchNode = function()
{
    return getBatchNodeFromLayer(gameTableLayer(),
        Resource.bottoms_png,
        Defines.BATCH_NODE.OBJECTS_BOTTOM.Z,
        Defines.BATCH_NODE.OBJECTS_BOTTOM.TAG);
};

var objectsBatchNode = function(capacity)
{
    return getBatchNodeFromLayer(gameTableLayer(),
        Resource.monsters_png,
        Defines.BATCH_NODE.OBJECTS.Z,
        Defines.BATCH_NODE.OBJECTS.TAG, false, capacity);
};

var objectsNode = function()
{
    return getNodeFromLayer(gameTableLayer(),
        Defines.BATCH_NODE.OBJECTS_NO_BATCH.Z,
        Defines.BATCH_NODE.OBJECTS_NO_BATCH.TAG);
};

var topObjBatchNode = function()
{
    return getBatchNodeFromLayer(gameTableLayer(),
        Resource.tops_png,
        Defines.BATCH_NODE.OBJECTS_TOP.Z,
        Defines.BATCH_NODE.OBJECTS_TOP.TAG);
};

var ceilObjBatchNode = function()
{
    return getBatchNodeFromLayer(gameTableLayer(),
        Resource.ceils_png,
        Defines.BATCH_NODE.OBJECT_CEIL.Z,
        Defines.BATCH_NODE.OBJECT_CEIL.TAG);
};

var objectBombBatchNode = function()
{
    return getBatchNodeFromLayer(gameTableLayer(),
        Resource.bombs_png,
        Defines.BATCH_NODE.OBJECTS_BOMBS.Z,
        Defines.BATCH_NODE.OBJECTS_BOMBS.TAG);
};

var objectAddTimeBatchNode = function()
{
    return getBatchNodeFromLayer(gameTableLayer(),
        Resource.monsters_time_png,
        Defines.BATCH_NODE.OBJECTS_ADD_TIME.Z,
        Defines.BATCH_NODE.OBJECTS_ADD_TIME.TAG);
};

var effectBatchNode = function(capacity)
{
    return getBatchNodeFromLayer(animateLayer(),
        Resource.effects_png,
        Defines.BATCH_NODE.EFFECT.Z,
        Defines.BATCH_NODE.EFFECT.TAG,
        false, capacity);
};

var effectBatchNodeWithBlend = function(capacity)
{
    return getBatchNodeFromLayer(animateLayer(),
        Resource.effects_png,
        Defines.BATCH_NODE.EFFECT_BLEND.Z,
        Defines.BATCH_NODE.EFFECT_BLEND.TAG,
        true, capacity);
};

var objectGate = function()
{
    return getBatchNodeFromLayer(gameTableLayer(),
        Resource.gate_png,
        Defines.BATCH_NODE.OBJECT_GATE.Z,
        Defines.BATCH_NODE.OBJECT_GATE.TAG,
        false);
};

var objectFlowers = function()
{
    return getBatchNodeFromLayer(gameTableLayer(),
        Resource.flower_png,
        Defines.BATCH_NODE.OBJECTS_FLOWERS.Z,
        Defines.BATCH_NODE.OBJECTS_FLOWERS.TAG,
        false);
};

var monsterRunning = function()
{
    return getBatchNodeFromLayer(gameTableLayer(),
        Resource.monsters_png,
        Defines.BATCH_NODE.MONSTER_RUNNING_IMG.Z,
        Defines.BATCH_NODE.MONSTER_RUNNING_IMG.TAG,
        false);
};










