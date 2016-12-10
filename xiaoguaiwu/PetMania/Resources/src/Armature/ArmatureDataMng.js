//======================================================================================================================
cc.ArmatureDataMng = cc.Class.extend({

    //
    m_ArmtureMainMenu: null,

    //
    m_ArmtureGUIStory: null,

    //
    m_ArmtureGUIMap: null,

    //
    m_ArmtureNewZone: null,

    //
    m_ArmtureMonsters: null,

    //------------------------------------------------------------------------------------------------------------------
    isValid: function()
    {
        return !Defines.IS_SMALL && Defines.PLATFORM.isMobile() ;
    },

    //------------------------------------------------------------------------------------------------------------------
    update : function(dt)
    {
        if (!this.isValid())
        {
            return this;
        }

        this.m_ArmtureMonsters.updateRunning(dt);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        if (!this.isValid())
        {
            return this;
        }

        //
        this.m_ArmtureMainMenu.cleanUp();

        //
        this.m_ArmtureGUIStory.cleanUp();

        //
        this.m_ArmtureGUIMap.cleanUp();

        //
        this.m_ArmtureNewZone.cleanUp();

        //
        this.m_ArmtureMonsters.cleanUp();

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    registerCuteMonster: function()
    {
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("cute_monster",
            "",
            Resource.cute_monsters_armature_png,
            Resource.cute_monsters_armature_plist,
            _ArmaturePath + "cute_monster.xml");

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    registerFireFly : function()
    {
       /* cc.ArmatureDataManager.getInstance().addArmatureFileInfo("firefly",
            "",
            Resource.firefly_png,
            Resource.firefly_plist,
            _ArmaturePath + "firefly.xml");*/


        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    registerFireMeteor : function()
    {
		cc.log("registerFireMeteor");
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo("bz_01",
            "",
            Resource.fireMeteor_png,
            Resource.fireMeteor_plist,
            _ArmaturePath + "fireMeteor_01.xml");
			
		cc.ArmatureDataManager.getInstance().addArmatureFileInfo("bz_02",
            "",
            Resource.fireMeteor_png,
            Resource.fireMeteor_plist,
            _ArmaturePath + "fireMeteor_02.xml");
		
		cc.ArmatureDataManager.getInstance().addArmatureFileInfo("bz_03",
            "",
            Resource.fireMeteor_png,
            Resource.fireMeteor_plist,
            _ArmaturePath + "fireMeteor_03.xml");
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        if (!this.isValid())
        {
            return this;
        }

        //
        this.m_ArmtureMainMenu = Armature_MainMenu.create();

        //
        this.m_ArmtureGUIStory = Armature_GUIStory.create();

        //
        this.m_ArmtureGUIMap = Armature_GUIMap.create();

        //
        this.m_ArmtureNewZone = Armature_NewZone.create();

        //
        this.m_ArmtureMonsters = Armature_Monster.create();

        //
        if (!this.isPreLoadInBatches())
        {
            this.m_ArmtureMainMenu.register();
            this.m_ArmtureGUIStory.register();
            //this.m_ArmtureGUIMap.register();
            //this.m_ArmtureNewZone.register();
            this.m_ArmtureMonsters.register();

            //
            this.registerCuteMonster();

            //
            this.registerFireFly();
			
			this.registerFireMeteor();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isPreLoadInBatches: function()
    {
        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    registerMainMenu: function()
    {
        if (!this.isPreLoadInBatches() || !this.isValid())
        {
            return this;
        }

        //
        cc.ArmatureDataManager.purgeArmatureSystem();
        this.removeArmaturesTexCache();

        //
        this.m_ArmtureMainMenu.register();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    registerStory: function()
    {
        if (!this.isPreLoadInBatches() || !this.isValid())
        {
            return this;
        }

        //
        cc.ArmatureDataManager.purgeArmatureSystem();
        this.removeArmaturesTexCache();

        //
        this.m_ArmtureGUIStory.register();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    registerForGame: function()
    {
        if (!this.isPreLoadInBatches() || !this.isValid())
        {
            return this;
        }

        //
        cc.ArmatureDataManager.purgeArmatureSystem();
        this.removeArmaturesTexCache();

        //this.m_ArmtureGUIMap.register();
        //this.m_ArmtureNewZone.register();
        this.m_ArmtureMonsters.register();
        this.registerCuteMonster();
        this.registerFireFly();
		this.registerFireMeteor();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    removeArmaturesTexCache: function()
    {
        this.m_ArmtureMainMenu.removeArmaturesTexCache();
        this.m_ArmtureGUIStory.removeArmaturesTexCache();
        //this.m_ArmtureGUIMap.removeArmaturesTexCache();
        //this.m_ArmtureNewZone.removeArmaturesTexCache();
        this.m_ArmtureMonsters.removeArmaturesTexCache();

        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource.cute_monsters_armature_plist,
            Resource.cute_monsters_armature_png
        );

        //
        /*cc.ResourceMng.getInstance().removeFromCache(
            Resource.firefly_plist,
            Resource.firefly_png
        );*/

        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource.fireMeteor_plist,
            Resource.fireMeteor_png
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //预存这些
    prepareMonsterArmatureForGameLevel: function(_poolSize)
    {
        if (!this.isValid())
        {
            return this;
        }

        this.m_ArmtureMonsters.prepareForPool(_poolSize);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    stopAllArmatures: function(monsters)
    {
        if (!this.isValid())
        {
            return this;
        }

        this.m_ArmtureMonsters.stopActiveArmature(monsters);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    stopArmature: function(monster)
    {
        if (!this.isValid() || !monster)
        {
            return this;
        }

        this.m_ArmtureMonsters.stopActiveArmature(monster);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    promptArmature: function(objMonster)
    {
        if (!this.isValid() || !objMonster)
        {
            return null;
        }

        return this.m_ArmtureMonsters.createPromptArmature(objMonster);
    },

    //------------------------------------------------------------------------------------------------------------------
    swapFailArmature: function(objMonster)
    {
        if (!this.isValid() || !objMonster)
        {
            return null;
        }

        return this.m_ArmtureMonsters.createSwapFailArmature(objMonster);
    },

    //------------------------------------------------------------------------------------------------------------------
    idleArmature: function(objMonster)
    {
        if (!this.isValid() || !objMonster)
        {
            return null;
        }

        return this.m_ArmtureMonsters.createIdleArmature(objMonster);
    },

    //------------------------------------------------------------------------------------------------------------------
    winArmature: function(objMonster)
    {
        if (!this.isValid() || !objMonster)
        {
            return null;
        }

        return this.m_ArmtureMonsters.createWinArmature(objMonster);
    },

    //------------------------------------------------------------------------------------------------------------------
    stareArmature: function(srcMonster, dstMonster)
    {
        if (!this.isValid()
            || !srcMonster || !dstMonster
            || Defines.LOW_PERFORMANCE
            )
        {
            return false;
        }

        return this.m_ArmtureMonsters.createStareArmature(srcMonster, dstMonster);
    },

    //------------------------------------------------------------------------------------------------------------------
    runningArmature: function(monster)
    {
        if (!this.isValid() || !monster)
        {
            return this;
        }

        if (!(monster instanceof cc.Obj_Monster)
            || monster instanceof cc.Obj_MonsterColorful
            || monster instanceof cc.Obj_Flower)
        {
            return this;
        }

        //其他人统一处理
        return Defines.LOW_PERFORMANCE ?
            this.m_ArmtureMonsters.createRunningImage(monster)
            : this.m_ArmtureMonsters.addRunning(monster);//this.m_ArmtureMonsters.createRunningArmature(monster);
    },

    //------------------------------------------------------------------------------------------------------------------
    touchArmature: function(objMonster)
    {
        if (!this.isValid() || !objMonster)
        {
            return false;
        }

        return this.m_ArmtureMonsters.createTouchArmature(objMonster);
    },

    //------------------------------------------------------------------------------------------------------------------
    createCuteMonster : function()
    {
        if (!this.isValid())
        {
            return null;
        }

        var newArmature = cc.Armature.create("cute_monster");
        if (newArmature)
        {
            newArmature.getAnimation().playByIndex(0, 0, -1, true);
            newArmature.getAnimation().setAnimationScale(45/60);
        }

        return newArmature;
    },
    //------------------------------------------------------------------------------------------------------------------
    createfireMeteor : function(fireStr)
    {
        if (!this.isValid() || Defines.LOW_PERFORMANCE)
        {
            return null;
        }

        var newArmature = cc.Armature.create(fireStr);
        if (newArmature)
        {
            newArmature.getAnimation().playByIndex(0, 0);
            newArmature.getAnimation().setAnimationScale(25/60);
			var sequence = cc.Sequence.create(
				cc.DelayTime.create(Defines.FPS * 30),
				cc.CallFunc.create(
					function (sender)
					{
						sender.getAnimation().stop();
						sender.removeFromParent(true);
					},
					null
				)
			);
			newArmature.runAction(sequence);
        }

        return newArmature;
    }
    //------------------------------------------------------------------------------------------------------------------
   /* createFireFly : function()
    {
        if (!this.isValid() || Defines.LOW_PERFORMANCE)
        {
            return null;
        }

        var newArmature = cc.Armature.create("firefly");
        if (newArmature)
        {
            newArmature.getAnimation().playByIndex(0, 0, -1, true);
            newArmature.getAnimation().setAnimationScale(5/60);
        }

        return newArmature;
    }*/
});

cc.ArmatureDataMng._instance = null;
cc.ArmatureDataMng.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.ArmatureDataMng();
        this._instance.init();
    }

    return this._instance;
};

//
cc.ArmatureDataMng.getGUIMainMenu = function()
{
    return cc.ArmatureDataMng.getInstance().isValid() ? cc.ArmatureDataMng.getInstance().m_ArmtureMainMenu : null;
};

//
cc.ArmatureDataMng.getGUIStory = function()
{
    return cc.ArmatureDataMng.getInstance().isValid() ? cc.ArmatureDataMng.getInstance().m_ArmtureGUIStory : null;
};

//
cc.ArmatureDataMng.getGUIMap = function()
{
    return cc.ArmatureDataMng.getInstance().isValid() ? cc.ArmatureDataMng.getInstance().m_ArmtureGUIMap : null;
};

//
cc.ArmatureDataMng.getNewZone = function()
{
    return cc.ArmatureDataMng.getInstance().isValid() ? cc.ArmatureDataMng.getInstance().m_ArmtureNewZone : null;
};

//
cc.ArmatureDataMng.getMonsters = function()
{
    return cc.ArmatureDataMng.getInstance().isValid() ? cc.ArmatureDataMng.getInstance().m_ArmtureMonsters : null;
};


