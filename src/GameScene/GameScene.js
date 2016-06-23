

var GameScene = cc.Scene.extend({
    backgroundLayer : null,
    gamePlayLayer : null,
    uiLayer : null,
    _bambooSlip : null,
    _gameSceneController: null,
    ctor: function () {
        this._super();
        this.loadResource();
        this._gameSceneController = GameSceneController.getInstance();

    },
    loadResource : function(){
        cc.spriteFrameCache.addSpriteFrames(res.ActorRun_plist);
        cc.spriteFrameCache.addSpriteFrames(res.Enemy_plist);
        cc.spriteFrameCache.addSpriteFrames(res.tp_slider_plist);
        cc.spriteFrameCache.addSpriteFrames(res.tp_ui_plist);
        cc.spriteFrameCache.addSpriteFrames(res.tp_bg_plist);
        cc.spriteFrameCache.addSpriteFrames(res.ccs_main_plist);
        cc.spriteFrameCache.addSpriteFrames(res.ccs_pass_plist);

        //var str = "_:,/";
        //var str2 = util.parseSringForLabel(str);
        //ccs.armatureDataManager.addArmatureFileInfo(res.at_achievement_png, res.at_achievement_plist, res.at_achievement_xml);
        //ccs.armatureDataManager.addArmatureFileInfo(res.at_dragon_png, res.at_dragon_plist, res.at_dragon_xml);
        //ccs.armatureDataManager.addArmatureFileInfo(res.at_dragonbone_png, res.at_dragonbone_plist, res.at_dragonbone_xml);
    },
    onEnter:function () {
        this._super();

        //粒子测试
        //var particleSystem = new cc.ParticleSystem(res.pt_snow_plist);
        //this.addChild(particleSystem, 10000);

        //armature test
        //ccs.armatureDataManager.addArmatureFileInfo(res.at_hero_png, res.at_hero_plist, res.at_hero_xml);
        //var armature = new ccs.Armature("Hero");
        //armature.getAnimation().play("run");
        //armature.getAnimation().setSpeedScale(30/60);
        //this.addChild(armature, 10000);
        //armature.setPosition(ScreenSize.width / 2, ScreenSize.height/2);

        //取消每5关保存一次的逻辑
        //DataHandler.getInstance().reset();


        var mainLayer = ccs.load(res.ccs_main_json).node;

        var bg = ccui.helper.seekWidgetByName(mainLayer, "bg");
        this.addChild(mainLayer, 0);
        //
        //var loginButton = ccui.helper.seekWidgetByName(mainLayer, "bg");
        //loginButton.setVisible(false);


        this.backgroundLayer = new BackgroundLayer(bg);
        this.addChild(this.backgroundLayer, 0);

        var battle = ccs.load(res.ccs_battle_json).node;
        this.addChild(battle,0);

        this.gamePlayLayer = new GamePlayLayer(battle);
        this.addChild(this.gamePlayLayer, 1);

        //this.mapLayer = new MapLayer();
        //this.addChild(this.mapLayer,2);
        //this.mapLayer.setVisible(false);

        this._bambooSlip = new sp.SkeletonAnimation(res.sp_juanzhou_json, res.sp_juanzhou_atlas);
        this._bambooSlip.setPosition(ScreenSize.width*0.5,0);
        this._bambooSlip.setVisible(false);
        this.addChild(this._bambooSlip, 2);
        this.showBambooSlip();

        this.uiLayer = new UILayer();
        this.addChild(this.uiLayer, 3);

        this.scheduleUpdate();

        //ccs.armatureDataManager.addArmatureFileInfo

        //var sp1 = new sp.SkeletonAnimation(res.sp_daoeff2_json, res.sp_daoeff2_atlas);
        //sp1.setPosition(ScreenSize.width*0.1, 200);
        //sp1.setAnimation(0, "daoeff2", true);
        //this.addChild(sp1, 1000);
        //
        //var sp2 = new sp.SkeletonAnimation(res.sp_daoeff2_json, res.sp_daoeff2_atlas);
        //sp2.setPosition(ScreenSize.width*0.2, 200);
        //sp2.setBlendFunc(cc.ZERO, cc.ONE);
        //sp2.setAnimation(0, "daoeff2", true);
        //this.addChild(sp2, 1000);
        //
        //var sp3 = new sp.SkeletonAnimation(res.sp_daoeff2_json, res.sp_daoeff2_atlas);
        //sp3.setPosition(ScreenSize.width*0.3, 200);
        //sp3.setBlendFunc(cc.ONE, cc.ONE);
        //sp3.setAnimation(0, "daoeff2", true);
        //this.addChild(sp3, 1000);
        //
        //var sp4 = new sp.SkeletonAnimation(res.sp_daoeff2_json, res.sp_daoeff2_atlas);
        //sp4.setPosition(ScreenSize.width*0.4, 200);
        //sp4.setBlendFunc(cc.ONE, cc.ZERO);
        //sp4.setAnimation(0, "daoeff2", true);
        //this.addChild(sp4, 1000);
        //
        //var sp5 = new sp.SkeletonAnimation(res.sp_daoeff2_json, res.sp_daoeff2_atlas);
        //sp5.setPosition(ScreenSize.width*0.5, 200);
        //sp5.setBlendFunc(cc.ZERO, cc.ZERO);
        //sp5.setAnimation(0, "daoeff2", true);
        //this.addChild(sp5, 1000);
    },
    update:function(dt) {
        if(this._gameSceneController.getStatus() === GameStatus.GameOver){
            this.unscheduleUpdate();
            return;
        }

        this.gamePlayLayer.update(dt);

        if(this._gameSceneController.getStatus() === GameStatus.Move ||
            this._gameSceneController.getStatus() === GameStatus.Battle) {
            this.backgroundLayer.updateCloud(dt);
        }

        if(this._gameSceneController.getStatus() === GameStatus.Move){
            this.backgroundLayer.update(dt);
        }
    },
    showBambooSlip:function(){
        this._bambooSlip.setVisible(true);
        this._bambooSlip.setAnimation(0, "juanzhou_gun01", false);
    },
    hideBambooSlip:function(){

        this._bambooSlip.setAnimation(0, "juanzhou_gun02", false);

        var delay = cc.delayTime(0.7);
        var callBack = cc.callFunc(this.setBambooSlipInvisible, this);
        this.runAction(cc.sequence((delay, callBack)));
    },
    setBambooSlipInvisible:function(sender){
        this._bambooSlip.setVisible(false);
    }

});

