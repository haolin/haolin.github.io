
//======================================================================================================================
cc.GUIMapAnim = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_ZoneAnimFunc = {};
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this.registerZoneAnimFunc(GUI.MAP_DEFINE.MAP_0.DECORATION, this._zoneGreenAnimFunc);
        this.registerZoneAnimFunc(GUI.MAP_DEFINE.MAP_1.DECORATION, this._zoneMushroomAnimFunc);
        this.registerZoneAnimFunc(GUI.MAP_DEFINE.MAP_2.DECORATION, this._zoneDuckAnimFunc);
        this.registerZoneAnimFunc(GUI.MAP_DEFINE.MAP_3.DECORATION, this._zoneFlowerAnimFunc);
        this.registerZoneAnimFunc(GUI.MAP_DEFINE.MAP_4.DECORATION, this._zoneGoldAnimFunc);
        this.registerZoneAnimFunc(GUI.MAP_DEFINE.MAP_5.DECORATION, this._zoneIceAnimFunc);
        this.registerZoneAnimFunc(GUI.MAP_DEFINE.MAP_6.DECORATION, this._zoneBallAnimFunc);
        this.registerZoneAnimFunc(GUI.MAP_DEFINE.MAP_7.DECORATION, this._zoneStickyAnimFunc);
        this.registerZoneAnimFunc(GUI.MAP_DEFINE.MAP_8.DECORATION, this._zoneBacteriumAnimFunc);
        this.registerZoneAnimFunc(GUI.MAP_DEFINE.MAP_9.DECORATION, this._zoneChirpsAnimFunc);
        this.registerZoneAnimFunc(GUI.MAP_DEFINE.MAP_10.DECORATION, this._zoneQuadAnimFunc);
        this.registerZoneAnimFunc(GUI.MAP_DEFINE.MAP_11.DECORATION, this._zoneQuadAnimFunc);
        this.registerZoneAnimFunc(GUI.MAP_DEFINE.MAP_12.DECORATION, this._zoneQuadAnimFunc);
        this.registerZoneAnimFunc(GUI.MAP_DEFINE.MAP_13.DECORATION, this._zoneQuadAnimFunc);
        this.registerZoneAnimFunc(GUI.MAP_DEFINE.MAP_14.DECORATION, this._zoneQuadAnimFunc);
        this.registerZoneAnimFunc(GUI.MAP_DEFINE.MAP_15.DECORATION, this._zoneQuadAnimFunc);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    registerZoneAnimFunc: function(descKey, func)
    {
        this.m_ZoneAnimFunc[descKey] = func;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    executeZoneAnimFunc: function(target, decoration)
    {
        var animFunc = this.m_ZoneAnimFunc[decoration];

        if (!(target instanceof cc.GUIWindow) || !animFunc)
        {
            return this;
        }

        //
        animFunc.call(target, decoration);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _zoneGreenAnimFunc: function(decoName)
    {
        //
        var contentSize = this.getWindow().getContentSize();

        //
        var decoration = cc.Sprite.create(_MainMapPath + decoName);
        this.getWindow().addChild(decoration, -3000, 1001);
        decoration.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.5));
        //cc.ResourceMng.getInstance().removeTextureCache(_MainMapPath + decoName);

        //
        var flowTree = cc.Sprite.createWithSpriteFrameName("map_flow_tree.png");
        decoration.addChild(flowTree);
        flowTree.setAnchorPoint(cc.p(0.5, 0));
        var decorationSize = decoration.getContentSize();
        flowTree.setPosition(cc.p(decorationSize.width * 0.43, decorationSize.height * 0.863));

        flowTree.runAction(cc.RepeatForever.create(cc.Sequence.create(
            cc.RotateTo.create(2.4, -16),
            cc.RotateTo.create(3.6,  8),
            cc.RotateTo.create(1.2,   0)
        )));

        //
        if (this.isLock && this.isLock())
        {
            decoration.setColor(cc.c3b(5, 5, 5));

            decoration.getChildren().forEach(
                function(each)
                {
                    if (each instanceof cc.Sprite)
                    {
                        each.setColor(cc.c3b(5, 5, 5));
                    }
                }
            );

            return this;
        }

        //
        var decorationTree = cc.Sprite.createWithSpriteFrameName("map_green_tree.png");
        this.getWindow().addChild(decorationTree, -2000);
        decorationTree.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.5));

        //
        var rainbow = cc.Sprite.create();
        decoration.addChild(rainbow);
        rainbow.setPosition(cc.p(decorationSize.width * 0.2, decorationSize.height * 0.35));

        /*
        var rainbowAppearAnimation = cc.Animation.create(
            cc.ResourceMng.getInstance().getAnimationFrames("rainbow_appear_"), Defines.FPS * 5);
        var rainbowDisappearAnimation = cc.Animation.create(
            cc.ResourceMng.getInstance().getAnimationFrames("rainbow_disappear_"), Defines.FPS * 5);

        rainbow.runAction(cc.RepeatForever.create(cc.Sequence.create(
            cc.DelayTime.create(2),
            cc.Animate.create(rainbowAppearAnimation),
            cc.DelayTime.create(1),
            cc.Animate.create(rainbowDisappearAnimation),
            cc.DelayTime.create(8)
        )));
        */ 
         

        //
       /* var decorationOpacity = cc.Sprite.create(_MainMapPath + "Map_BackStar_Opacity.png");
        this.getWindow().addChild(decorationOpacity, -5000);
        decorationOpacity.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.5));

        decorationOpacity.runAction(cc.RepeatForever.create(cc.Sequence.create(
            cc.ScaleTo.create(2, 0.9),
            cc.ScaleTo.create(2, 1)
        )));*/

        //内存小就先删除掉
        //cc.ResourceMng.getInstance().removeTextureCache(_MainMapPath + "Map_BackStar_Opacity.png");

        //小怪物骨骼动画
        var monsterInfo = [
            {_position: cc.p(290, 533), _rotation:  -30, _scale: 0.55},
            {_position: cc.p(373, 478), _rotation:    0, _scale: 0.55},
            {_position: cc.p(500, 430), _rotation:   45, _scale: 0.55},
            {_position: cc.p(625, 275), _rotation:   90, _scale: 0.55},
            {_position: cc.p(300, 140), _rotation: -135, _scale: 0.55}
        ];

        monsterInfo.forEach(function(each)
        {
            var armature = cc.ArmatureDataMng.getMonsters() ?
                cc.ArmatureDataMng.getMonsters().createForMapZone() : null;//cc.ArmatureDataMng.getInstance().createMonsterGladArmature();

            if (armature)
            {
                decoration.addChild(armature);
                armature.setRotation(each._rotation);
                armature.setScale(each._scale);
                armature.setPosition(each._position);
            }
        });

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _zoneMushroomAnimFunc: function(decoName)
    {
        //
        var contentSize = this.getWindow().getContentSize();

        //
        var handle = false;

        //
        //var decoration = cc.ArmatureDataMng.getInstance().createMapStarArmature("mushrooms");
        /*var decoration = cc.ArmatureDataMng.getGUIMap() ?
            cc.ArmatureDataMng.getGUIMap().createArmature("mushrooms") : null;
        if (decoration)
        {
            handle = true;

            this.getWindow().addChild(decoration, -3000, 1001);
            decoration.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.5));
            decoration.getAnimation().playByIndex(0, 0, -1, true);
            decoration.getAnimation().setAnimationScale(25/60);
        }*/

        //
        if (!handle)
        {
            decoration = cc.Sprite.create(_MainMapPath + decoName);
            this.getWindow().addChild(decoration, -3000, 1001);
            decoration.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.5));
        }

        //
        if (this.isLock && this.isLock())
        {
            decoration.setColor(cc.c3b(5, 5, 5));
            return this;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _zoneDuckAnimFunc: function(decoName)
    {
        //
        var contentSize = this.getWindow().getContentSize();

        //
        var handle = false;

        //
        //var decoration = cc.ArmatureDataMng.getInstance().createMapStarArmature("bluestar_yellow_duck_star_ok");
       /* var decoration = cc.ArmatureDataMng.getGUIMap() ?
            cc.ArmatureDataMng.getGUIMap().createArmature("bluestar_yellow_duck_star_ok") : null;
        if (decoration)
        {
            handle = true;

            this.getWindow().addChild(decoration, -3000, 1001);
            decoration.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.5));
            decoration.getAnimation().playByIndex(0, 0, -1, true);
            decoration.getAnimation().setAnimationScale(25/60);
        }*/

        //
        if (!handle)
        {
            decoration = cc.Sprite.create(_MainMapPath + decoName);
            this.getWindow().addChild(decoration, -3000, 1001);
            decoration.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.5));
        }

        //
        if (this.isLock && this.isLock())
        {
            decoration.setColor(cc.c3b(5, 5, 5));
            return this;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _zoneFlowerAnimFunc: function(decoName)
    {
        //
        var contentSize = this.getWindow().getContentSize();

        //
        var handle = false;

        //
        //var decoration = cc.ArmatureDataMng.getInstance().createMapStarArmature("flower_star_ok");
        /*var decoration = cc.ArmatureDataMng.getGUIMap() ?
            cc.ArmatureDataMng.getGUIMap().createArmature("flower_star_ok") : null;
        if (decoration)
        {
            handle = true;

            this.getWindow().addChild(decoration, -3000, 1001);
            decoration.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.5));
            decoration.getAnimation().playByIndex(0, 0, -1, true);
            decoration.getAnimation().setAnimationScale(25/60);
        }*/

        //
        if (!handle)
        {
            decoration = cc.Sprite.create(_MainMapPath + decoName);
            this.getWindow().addChild(decoration, -3000, 1001);
            decoration.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.5));
        }

        //
        if (this.isLock && this.isLock())
        {
            decoration.setColor(cc.c3b(5, 5, 5));
            return this;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _zoneGoldAnimFunc: function(decoName)
    {
        //
        var contentSize = this.getWindow().getContentSize();

        //
        var handle = false;

        //
        /*var decoration = cc.ArmatureDataMng.getGUIMap() ?
            cc.ArmatureDataMng.getGUIMap().createArmature("flower_star_ok") : null;*/
        var decoration = null;
        if (decoration)
        {
            handle = true;

            this.getWindow().addChild(decoration, -3000, 1001);
            decoration.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.5));
            decoration.getAnimation().playByIndex(0, 0, -1, true);
            decoration.getAnimation().setAnimationScale(25/60);
        }

        //
        if (!handle)
        {
            decoration = cc.Sprite.create(_MainMapPath + decoName);
            this.getWindow().addChild(decoration, -3000, 1001);
            decoration.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.5));
            //cc.ResourceMng.getInstance().removeTextureCache(_MainMapPath + decoName);
        }

        //
        if (this.isLock && this.isLock())
        {
            decoration.setColor(cc.c3b(5, 5, 5));
            return this;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _zoneIceAnimFunc: function(decoName)
    {
        //
        var contentSize = this.getWindow().getContentSize();

        //
        var handle = false;

        //
        /*var decoration = cc.ArmatureDataMng.getGUIMap() ?
         cc.ArmatureDataMng.getGUIMap().createArmature("flower_star_ok") : null;*/
        var decoration = null;
        if (decoration)
        {
            handle = true;

            this.getWindow().addChild(decoration, -3000, 1001);
            decoration.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.5));
            decoration.getAnimation().playByIndex(0, 0, -1, true);
            decoration.getAnimation().setAnimationScale(25/60);
        }

        //
        if (!handle)
        {
            decoration = cc.Sprite.create(_MainMapPath + decoName);
            this.getWindow().addChild(decoration, -3000, 1001);
            decoration.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.5));
            //cc.ResourceMng.getInstance().removeTextureCache(_MainMapPath + decoName);
        }

        //
        if (this.isLock && this.isLock())
        {
            decoration.setColor(cc.c3b(5, 5, 5));
            return this;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _zoneBallAnimFunc: function(decoName)
    {
        //
        var contentSize = this.getWindow().getContentSize();

        //
        var decoration = cc.Sprite.create(_MainMapPath + decoName);
        this.getWindow().addChild(decoration, -3000, 1001);
        decoration.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.5));
        //cc.ResourceMng.getInstance().removeTextureCache(_MainMapPath + decoName);

        //
        if (this.isLock && this.isLock())
        {
            decoration.setColor(cc.c3b(5, 5, 5));
            return this;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _zoneStickyAnimFunc: function(decoName)
    {
        //
        var contentSize = this.getWindow().getContentSize();

        //
        var decoration = cc.Sprite.create(_MainMapPath + decoName);
        this.getWindow().addChild(decoration, -3000, 1001);
        decoration.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.5));
        //cc.ResourceMng.getInstance().removeTextureCache(_MainMapPath + decoName);

        //
        if (this.isLock && this.isLock())
        {
            decoration.setColor(cc.c3b(5, 5, 5));
            return this;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _zoneBacteriumAnimFunc: function(decoName)
    {
        //
        var contentSize = this.getWindow().getContentSize();

        //
        var decoration = cc.Sprite.create(_MainMapPath + decoName);
        this.getWindow().addChild(decoration, -3000, 1001);
        decoration.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.5));

        //
        if (this.isLock && this.isLock())
        {
            decoration.setColor(cc.c3b(5, 5, 5));
            return this;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _zoneChirpsAnimFunc: function(decoName)
    {
        //
        var contentSize = this.getWindow().getContentSize();

        //
        var decoration = cc.Sprite.create(_MainMapPath + decoName);
        this.getWindow().addChild(decoration, -3000, 1001);
        decoration.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.5));

        //
        if (this.isLock && this.isLock())
        {
            decoration.setColor(cc.c3b(5, 5, 5));
            return this;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _zoneQuadAnimFunc: function(decoName)
    {
        //
        var contentSize = this.getWindow().getContentSize();

        //
        var decoration = cc.Sprite.create(_MainMapPath + decoName);
        this.getWindow().addChild(decoration, -3000, 1001);
        decoration.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.5));

        //
        if (this.isLock && this.isLock())
        {
            decoration.setColor(cc.c3b(5, 5, 5));
            return this;
        }

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIMapAnim.create = function()
{
    var createNew = new cc.GUIMapAnim();
    createNew.init();
    return createNew;
};