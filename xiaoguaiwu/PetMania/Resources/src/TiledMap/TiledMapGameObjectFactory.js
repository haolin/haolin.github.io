//创建对象的工厂类(临时)

//======================================================================================================================
cc.TiledMapGameObjectFactory = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    //注册给  register
    ctor: function()
    {
        this.m_Builders = {};
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //注册给  register
    register: function(tiledMapTypeName, builder)
    {
        this.m_Builders[tiledMapTypeName] = builder;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //根据TiledMap属性创建类对象
    createObject: function(tileMapObj, builder)
    {
        var tiledMapType = tileMapObj[Property.Type];
        if (!tiledMapType)
        {
            return null;
        }

        var build = this.m_Builders[tiledMapType];
        if (!build)
        {
            return null;
        }

        return build(tileMapObj, builder);
    }
    //-----------------------------------d-------------------------------------------------------------------------------

});
//======================================================================================================================
cc.TiledMapGameObjectFactory._propertyToColor = null;
cc.TiledMapGameObjectFactory.propertyToColor = function(property)
{
    if (!cc.TiledMapGameObjectFactory._propertyToColor)
    {
        cc.TiledMapGameObjectFactory._propertyToColor = {};
        cc.TiledMapGameObjectFactory._propertyToColor[Property.Pink] = Defines.COLOR.PINK;
        cc.TiledMapGameObjectFactory._propertyToColor[Property.Green] = Defines.COLOR.GREEN;
        cc.TiledMapGameObjectFactory._propertyToColor[Property.Blue] = Defines.COLOR.BLUE;
        cc.TiledMapGameObjectFactory._propertyToColor[Property.Orange] = Defines.COLOR.ORANGE;
        cc.TiledMapGameObjectFactory._propertyToColor[Property.Purple] = Defines.COLOR.PURPLE;
        cc.TiledMapGameObjectFactory._propertyToColor[Property.Yellow] = Defines.COLOR.YELLOW;
        cc.TiledMapGameObjectFactory._propertyToColor[Property.Colorful] = Defines.COLOR.COLORFUL;
    }

    var res = cc.TiledMapGameObjectFactory._propertyToColor[property];
    return res ? res : _RandColor();
};
//======================================================================================================================
cc.TiledMapGameObjectFactory.propertyToHVDirection = function(property)
{
    if (property == Property.Horiz)
    {
        return Defines.DIRECTION.HORIZONTAL;
    }
    else if (property == Property.Vertic)
    {
        return Defines.DIRECTION.VERTICAL;
    }

    return Defines.DIRECTION.NULL;
};

//======================================================================================================================
cc.TiledMapGameObjectFactory._propertyPipeDirectionToDirection = null;
cc.TiledMapGameObjectFactory.propertyPipeDirectionToDirection = function(property)
{
    if (!property)
    {
        return null;
    }

    if (!cc.TiledMapGameObjectFactory._propertyPipeDirectionToDirection)
    {
        cc.TiledMapGameObjectFactory._propertyPipeDirectionToDirection = {};

        //
        cc.TiledMapGameObjectFactory._propertyPipeDirectionToDirection[Property.Left] = Defines.DIRECTION.LEFT;
        cc.TiledMapGameObjectFactory._propertyPipeDirectionToDirection[Property.Right] = Defines.DIRECTION.RIGHT;
        cc.TiledMapGameObjectFactory._propertyPipeDirectionToDirection[Property.Top] = Defines.DIRECTION.TOP;
        cc.TiledMapGameObjectFactory._propertyPipeDirectionToDirection[Property.Bottom] = Defines.DIRECTION.BOTTOM;
    }

    var res = cc.TiledMapGameObjectFactory._propertyPipeDirectionToDirection[property];
    return res ? res : null;
};

//======================================================================================================================
cc.TiledMapGameObjectFactory.create = function()
{
    var createNew = new cc.TiledMapGameObjectFactory();
    if (!createNew)
    {
        return null;
    }

    //------------------------------------------------------------------------------------------------------------------
    createNew.register(Property.Floor,
        function(tileMapObj)
        {
            return cc.Obj_Floor.create(parseInt(tileMapObj[Property.Layers]));
        }
    );

    //------------------------------------------------------------------------------------------------------------------
    createNew.register(Property.Monster,
        function(tileMapObj)
        {
            var implBuild = function(tileMapObj)
            {
                //优先创造多彩
                var colorCode = cc.TiledMapGameObjectFactory.propertyToColor(tileMapObj[Property.Color]);
                if (colorCode == Defines.COLOR.COLORFUL)
                {
                    return cc.Obj_MonsterColorful.create();
                }
                //其次爆炸糖果
                if (tileMapObj[Property.Wrapper])
                {
                    return cc.Obj_MonsterWrap.create(colorCode);
                }

                //最后是条纹糖果
                var hvDir = cc.TiledMapGameObjectFactory.propertyToHVDirection(tileMapObj[Property.Direction]);
                if (hvDir != Defines.DIRECTION.NULL)
                {
                    return cc.Obj_MonsterDirection.create(colorCode, hvDir);
                }

                //最后是普通的
                return cc.Obj_Monster.create(colorCode);
            };

            var createNew = implBuild(tileMapObj);
            if (createNew)
            {
                //
                if (tileMapObj[Property.Bubble])
                {
                    cc.Obj_BubbleCreator.create(createNew);
                }
            }

            return createNew;
        }
    );

    //------------------------------------------------------------------------------------------------------------------
    createNew.register(Property.Lock,
        function(tileMapObj)
        {
            return cc.Obj_Lock.create(parseInt(tileMapObj[Property.Layers]));
        }
    );

    //------------------------------------------------------------------------------------------------------------------
    createNew.register(Property.Stone,
        function(tileMapObj)
        {
            return cc.Obj_Stone.create(parseInt(tileMapObj[Property.Layers]));
        }
    );

    //------------------------------------------------------------------------------------------------------------------
    createNew.register(Property.Factory,
        function(tileMapObj)
        {
            var colorsConfig = [];
            var property = tileMapObj[Property.FactoryColorsConfig];
            if (property)
            {
                property.split(",").forEach(
                    function(pro)
                    {
                        colorsConfig.push(cc.TiledMapGameObjectFactory.propertyToColor(pro));
                    }
                );
            }

            var preBuildConfig = [];
            property = tileMapObj[Property.FactoryPreBuildConfig];
            if (property)
            {
                property.split(",").forEach(
                    function(pro)
                    {
                        preBuildConfig.push(cc.TiledMapGameObjectFactory.propertyToColor(pro));
                    }
                );
            }

			var flowerSwitchInt = parseInt(tileMapObj[Property.FlowerSwitch]) ;
			var flowerSwitch = (flowerSwitchInt == 1) ? false : true;
            //
            var newFactory = cc.Obj_Factory.create(
                cc.FactoryBuilder_Colors.create(colorsConfig, preBuildConfig),
                (parseInt(tileMapObj[Property.Block]) > 0),
				flowerSwitch
            );

            if (newFactory)
            {

            }

            return newFactory;
        }
    );

    //------------------------------------------------------------------------------------------------------------------
    createNew.register(Property.Begin,
        function(tileMapObj)
        {
            return cc.Obj_Begin.create(parseInt(tileMapObj[Property.Block]));
        }
    );

    //------------------------------------------------------------------------------------------------------------------
    createNew.register(Property.Bomb,
        function(tileMapObj)
        {
            //基本属性
            var colorCode = cc.TiledMapGameObjectFactory.propertyToColor(tileMapObj[Property.Color]);
            var bombTime = parseInt(tileMapObj[Property.BombTime]);
			var IsBombTip = parseInt(tileMapObj[Property.IsBombTip]);

            //根据关卡判断
            var notFinishBombGuideGameLevel = false;
			var gameLevelData = cc.DataMng.getInstance().getCurLevelData();
            if (gameLevelData && !cc.DataMng.getInstance().isGameLevelGuidFinish(gameLevelData.NAME, true))
            {
                notFinishBombGuideGameLevel = true;
            }

            var needAddBombGuide = IsBombTip && notFinishBombGuideGameLevel;
            if (needAddBombGuide)
            {
                //教学的炸弹
                cc.log(gameLevelData.NAME + "需要添加教学用的炸弹");
                return cc.Obj_BombTip.create(colorCode, bombTime, true);
            }

            //最后一定返回默认的
            return cc.Obj_Bomb.create(colorCode, bombTime, true);
        }
    );

    //------------------------------------------------------------------------------------------------------------------
    createNew.register(Property.Boss,
        function(tileMapObj)
        {
            var bossTypeConfig = [];
            var bossSeqColors = [];

            if (tileMapObj[Property.BossType] == "ColorBoss")
            {
                var proColors = tileMapObj[Property.BossTypeConfig];
                if (proColors)
                {
                    proColors.split(",").forEach(
                        function(pro)
                        {
                            bossTypeConfig.push(cc.TiledMapGameObjectFactory.propertyToColor(pro));
                        }
                    );
                }

                var seqColors = tileMapObj[Property.BossSeqColors];
                if (seqColors)
                {
                    seqColors.split(",").forEach(
                        function(pro)
                        {
                            bossSeqColors.push(cc.TiledMapGameObjectFactory.propertyToColor(pro));
                        }
                    );
                }
            }

            return cc.Obj_Boss.create(
                tileMapObj[Property.BossName],
                tileMapObj[Property.BossType],
                bossTypeConfig,
                bossSeqColors
            );
        }
    );

    //------------------------------------------------------------------------------------------------------------------
    createNew.register(Property.Flower,
        function(tileMapObj)
        {
            return cc.Obj_Flower.create(tileMapObj[Property.FlowerLevel]);
        }
    );

    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    createNew.register(Property.Ice,
        function()
        {
            return cc.Obj_Ice.create(3);
        }
    );

    //------------------------------------------------------------------------------------------------------------------
    createNew.register(Property.Haze,
        function(tileMapObj)
        {
            return cc.Obj_Haze.create(tileMapObj[Property.HazeLevel]);
        }
    );

    //------------------------------------------------------------------------------------------------------------------
    createNew.register(Property.PipelinePathNode,
        function(tileMapObj, builder)
        {
            if (!builder.isPipleModel())
            {
                return null;
            }

            var newPathNode = cc.Obj_PipelinePathNode.create(
                tileMapObj[Property.PipePathName],
                parseInt(tileMapObj[Property.PathNodeID] || 0),
                cc.TiledMapGameObjectFactory.propertyPipeDirectionToDirection(tileMapObj[Property.PipelineMoveDirection]),
                cc.TiledMapGameObjectFactory.propertyPipeDirectionToDirection(tileMapObj[Property.PipelineCreateDirection])
            );

            if (newPathNode)
            {
                if (tileMapObj[Property.PipelineEvent])
                {
                    cc.log("PipelinePathNode = " + tileMapObj[Property.PipelineEvent]);
                    newPathNode.addPathNodeEvent(PipelineEvent.create(tileMapObj[Property.PipelineEvent]));
                }
            }

            //
            return newPathNode;
        }
    );

    //------------------------------------------------------------------------------------------------------------------
    createNew.register(Property.PipelineMutiPathNode,
        function(tileMapObj, builder)
        {
            if (!builder.isPipleModel())
            {
                return null;
            }

            var mutiNames = tileMapObj[Property.PipePathName].split("|");
            if (!mutiNames || mutiNames.length <= 0 )
            {
                cc.Assert(0, "!mutiNames || mutiNames.length <= 0");
                return null;
            }

            cc.log("mutiNames = " + mutiNames);

            var newPathNode = cc.Obj_PipelineMutiPathNode.create(
                mutiNames,
                parseInt(tileMapObj[Property.PathNodeID] || 0),
                cc.TiledMapGameObjectFactory.propertyPipeDirectionToDirection(tileMapObj[Property.PipelineMoveDirection]),
                cc.TiledMapGameObjectFactory.propertyPipeDirectionToDirection(tileMapObj[Property.PipelineCreateDirection])
            );

            if (newPathNode)
            {
                if (tileMapObj[Property.PipelineEvent])
                {
                    cc.log("PipelineMutiPathNode = " + tileMapObj[Property.PipelineEvent]);
                    newPathNode.addPathNodeEvent(PipelineEvent.create(tileMapObj[Property.PipelineEvent]));
                }
            }

            //
            return newPathNode;
        }
    );

    //------------------------------------------------------------------------------------------------------------------
    createNew.register(Property.Snake,
        function(tileMapObj, builder)
        {
            if (!builder.isPipleModel())
            {
                return null;
            }

            return cc.Obj_Snake.create(
                parseInt(tileMapObj[Property.SnakeLevel]) || 1
            );
        }
    );

    //------------------------------------------------------------------------------------------------------------------
    createNew.register(Property.Factory_Mineral,
        function(tileMapObj)
        {
            if (!tileMapObj[Property.MineDeep])
            {
                cc.Assert(0);
            }

            if (!tileMapObj[Property.MineHeight])
            {
                cc.Assert(0);
            }

            //
            return cc.Obj_FactoryMine.create(
                parseInt(tileMapObj[Property.MineDeep]) || 1,
                parseInt(tileMapObj[Property.MineHeight]) || 1
            );
        }
    );

    //------------------------------------------------------------------------------------------------------------------
    createNew.register(Property.Mine,
        function()
        {
            return cc.Obj_MonsterMine.create();
        }
    );
	
	//------------------------------------------------------------------------------------------------------------------
    createNew.register(Property.MineDiamond,
        function()
        {
            return cc.Obj_MonsterDiamond.create();
        }
    );

    //------------------------------------------------------------------------------------------------------------------
    createNew.register(Property.PipeFactory,
        function(tileMapObj)
        {
            var colorsConfig = [];
            var property = tileMapObj[Property.FactoryColorsConfig];
            if (property)
            {
                property.split(",").forEach(
                    function(pro)
                    {
                        colorsConfig.push(cc.TiledMapGameObjectFactory.propertyToColor(pro));
                    }
                );
            }

            var preBuildConfig = [];
            property = tileMapObj[Property.FactoryPreBuildConfig];
            if (property)
            {
                property.split(",").forEach(
                    function(pro)
                    {
                        preBuildConfig.push(cc.TiledMapGameObjectFactory.propertyToColor(pro));
                    }
                );
            }

            //
            var newFactory = cc.Obj_PipeFactory.create(
                cc.FactoryBuilder_Colors.create(colorsConfig, preBuildConfig)
            );

            if (newFactory)
            {
                cc.log("管道工厂????!!!!!");
            }

            return newFactory;
        }
    );

    return createNew;
};





