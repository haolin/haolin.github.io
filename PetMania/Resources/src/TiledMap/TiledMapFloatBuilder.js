
cc.TiledMapFloatBuilder = cc.Class.extend({

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
        var mapPath = "res/MainMap/";
        this.m_TiledMap = cc.TMXTiledMap.create(mapPath + tiledMapName);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    build: function()
    {
        if (!this.m_TiledMap)
        {
            return null;
        }

        var floatLevels = {};

        //关卡按钮的数据
        var levelGroup = this.m_TiledMap.getObjectGroup("FloatLevels");
        if (levelGroup && levelGroup.getObjects())
        {
            var levelObjects = levelGroup.getObjects();

            //
            var tempLevelSprite = cc.Sprite.createWithSpriteFrameName("map_level_nor.png");
            var tempLevelSize = tempLevelSprite.getContentSize();

            levelObjects.forEach(
                function(obj)
                {
                    var x = parseInt(obj["x"]);
                    var y = parseInt(obj["y"]);
                    var name = obj["name"];

                    floatLevels[name] = cc.pAdd(cc.p(x, y), cc.p(tempLevelSize.width/2, tempLevelSize.height/2))
                }
            );
        }

        return floatLevels;
    }

    //------------------------------------------------------------------------------------------------------------------
});


cc.TiledMapFloatBuilder.create = function(tiledMapName)
{
    var createNew = new cc.TiledMapFloatBuilder();
    createNew.init(tiledMapName);
    return createNew;
};