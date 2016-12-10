//======================================================================================================================
cc.GUIMapZoneBase = cc.GUIWindow.extend({

    description: function ()
    {
        return "GUIMapZoneBase";
    },

    //------------------------------------------------------------------------------------------------------------------
    setLockState: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isLock: function()
    {
        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    loadContent: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    reloadFriendsPhoto: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addPromptInfoContent: function()
    {
        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    removePromptInfoContent: function()
    {
        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleZoneEnter: function()
    {
       return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleZoneLeave: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    releaseContent: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setEnabled: function ()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    reloadAnimContent: function()
    {
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});


//======================================================================================================================
cc.GUIMapZoneTemp = cc.GUIMapZoneBase.extend({

    description: function ()
    {
        return "GUIMapZoneTemp";
    },


    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //数据定义
        this.m_MapDefine = null;
        this.m_BackGround = null;
        this.m_ZoneMenu = null;

        //
        this.m_ZoneAnimFunc = {};
        this.m_ZoneNamePanel = null;

        //
        this.m_MapLevels = {};
        this.m_MapStation = null;

        //
        this.m_ContentLeft = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(mapDefine)
    {
        this._super();

        //
        this.m_MapDefine = mapDefine;
        this.getWindow().setContentSize(this.m_MapDefine.SIZE);
        this.getWindow().setPosition(this.m_MapDefine.POSITION);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    loadContent: function()
    {
        //
        this.m_BackGround = cc.MapZoneBackGroundTest.create();
        this.m_BackGround.setFlip(this.m_MapDefine.ID % 2);
        this.m_BackGround.display(this.getWindow());
        this.m_BackGround.addRightDecoration(this.getWindow());

        //
        this.executeZoneAnimFunc();
        this.displayMeterAction();

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
    isLock: function()
    {
        return true;
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

        //
        //var winSize = cc.Director.getInstance().getWinSize();
        var winSize = this.getWindow().getContentSize();
        var toWindowPosition = this.convertToWindowSpace();

        if (this.m_ZoneNamePanel || toWindowPosition.x > winSize.width * 0.5 || toWindowPosition.x < -winSize.width * 0.2)
        {
            return false;
        }

        this.m_ZoneNamePanel = cc.Sprite.createWithSpriteFrameName("general_name_back.png");
        this.getWindow().addChild(this.m_ZoneNamePanel, 100);
        this.m_ZoneNamePanel.setPosition(cc.p(winSize.width * 0.4, winSize.height * 0.5));

        var contentSize = this.m_ZoneNamePanel.getContentSize();

        //
        var zoneName = cc.LabelTTF.create(Resource.ChineseTxt[166], Defines.DefaultFont, 40 * Defines.BASE_SCALE);
        this.m_ZoneNamePanel.addChild(zoneName);
        zoneName.setPosition(cc.p(contentSize.width * 0.5, contentSize.height * 0.5));

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

        zoneName.stopAllActions();
        zoneName.setOpacity(0);
        zoneName.runAction(cc.FadeIn.create(0.8));

        this.m_ZoneNamePanel.stopAllActions();
        this.m_ZoneNamePanel.setOpacity(0);
        this.m_ZoneNamePanel.runAction(cc.FadeIn.create(0.8));

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
            this.m_ZoneNamePanel.runAction(cc.Sequence.create(
                cc.FadeOut.create(0.8),
                cc.CallFunc.create(function()
                {
                    self.m_ZoneNamePanel.removeFromParent(true);
                    self.m_ZoneNamePanel = null;
                }, this)
            ));

            return true;
        }

        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleZoneEnter: function()
    {
        //
        this.m_ContentLeft = false;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleZoneLeave: function()
    {
        //
        this.m_ContentLeft = true;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    releaseContent: function()
    {
        this.getWindow().stopAllActions();
        this.getWindow().removeAllChildren(true);

        this.m_BackGround = null;
        this.m_ZoneNamePanel = null;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);

        //
        this.loadContent();

        //
        this.getWindow().getParent().reorderChild(this.getWindow(), -this.m_MapDefine.ID);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        //
        this.releaseContent();

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    executeZoneAnimFunc: function()
    {
        var decoration = GUI.MAP_DEFINE.MAP_0.DECORATION;

        var mapAnim = cc.GUIMapAnim.create();
        mapAnim.executeZoneAnimFunc(this, decoration);

        //
        var contentSize = this.getWindow().getContentSize();

        //
        var spriteDeco = this.getWindow().getChildByTag(1001);
        if (spriteDeco)
        {
            spriteDeco.setPositionX(contentSize.width * 0.4);
        }

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIMapZoneTemp.create = function(mapDefine)
{
    var createNew = new cc.GUIMapZoneTemp();
    createNew.init(mapDefine);
    return createNew;
};