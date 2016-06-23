/**
 * Created by linhao on 15/12/11.
 */

var StartScene = cc.Scene.extend({
    backgroundLayer : null,
    startLayer : null,

    ctor: function () {
        this._super();
        this.loadResource();


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
        this.startLayer = new StartLayer();
        this.addChild(this.startLayer, 0);

        /****test********
        /*
        for(var i = 1; i <= 10; i++){
            for(var j = 1; j <= 10; j++) {
                var sp1 = new sp.SkeletonAnimation(res.sp_test_json, res.sp_test_atlas);

                ////sp1.setDebugBones(true);
                sp1.setPosition(ScreenSize.width*0.09 * i, ScreenSize.height*0.09*j);
                //sp1.setAttachment("wuqi_01", "wuqi/wuqi_01" + util.formatStr(2, i));
                sp1.setAttachment("wuqi_02", "wuqi/wuqi_02" + util.formatStr(2, j));
                sp1.setAnimation(0, "idle", true);
                //sp1.setSkin("red");

                this.addChild(sp1, 1);
            }
        }*/

        //var sp1 = new sp.SkeletonAnimation(res.sp_test1_json, res.sp_test1_atlas);
        //
        //////sp1.setDebugBones(true);
        //sp1.setPosition(ScreenSize.width*0.6, ScreenSize.height*0.5);
        //sp1.setAttachment("wuqi_01", "wuqi/wuqi_0101");
        //sp1.setAttachment("wuqi_02", "wuqi/kongbai");
        //var slot = sp1.findBone("wuqi_02");
        //var x = slot.worldX;
        //var y = slot.worldY;
        //sp1.setAnimation(0, "gj1", true);
        //this.addChild(sp1, 1);
        //
        //var sp2 = new sp.SkeletonAnimation(res.sp_test2_json, res.sp_test2_atlas);
        //
        //////sp1.setDebugBones(true);
        //sp2.setPosition(ScreenSize.width*0.6, ScreenSize.height*0.5);
        ////sp1.setAttachment("wuqi_01", "wuqi/wuqi_01" + util.formatStr(2, i));
        ////sp1.setAttachment("wuqi_02", "wuqi/wuqi_02" + util.formatStr(2, j));
        //sp2.setAnimation(0, "ren_gj1", true);
        //this.addChild(sp2, 2);


        //var sp1 = new sp.SkeletonAnimation(res.sp_tx_shang_json, res.sp_tx_shang_atlas);
        //sp1.setPosition(ScreenSize.width*0.2, 200);
        //sp1.setAnimation(0, "tx_shang", true);
        //this.addChild(sp1, 2);
        //
        //var sp2 = new sp.SkeletonAnimation(res.sp_daoeff2_json, res.sp_daoeff2_atlas);
        //sp2.setPosition(ScreenSize.width*0.2, 200);
        //sp2.setBlendFunc(cc.ZERO, cc.ONE);
        //sp2.setAnimation(0, "daoeff", true);
        //this.addChild(sp2, 2);
        //
        //var sp3 = new sp.SkeletonAnimation(res.sp_daoeff2_json, res.sp_daoeff2_atlas);
        //sp3.setPosition(ScreenSize.width*0.3, 200);
        //sp3.setBlendFunc(cc.ONE, cc.ONE);
        //sp3.setAnimation(0, "daoeff2", true);
        //this.addChild(sp3, 2);

        //var sp2 = new sp.SkeletonAnimation(res.sp_test_json, res.sp_test_atlas);
        //
        //sp2.setDebugBones(true);
        //sp2.setPosition(ScreenSize.width*0.75, ScreenSize.height*0.75);
        ////sp2.setSkin("blue");
        //sp2.setAnimation(0, "gj1", true);
        //
        //this.addChild(sp2, 1)


        //var textLabel = new cc.LabelTTF("我567889国",  "msyh_sub", 32);
        ////label.setColor(cc.color.BLACK);
        //textLabel.setFontFillColor(cc.color.WHITE);
        //textLabel.enableStroke(cc.color.MAGENTA, 1.5);
        //textLabel.setPosition(0.5*ScreenSize.width, this.getContentSize().height*0.7);
        //this.addChild(textLabel,2);
        ////
        //var textLabel1 = new cc.LabelTTF("刀",  "STLITI", 32);
        ////label.setColor(cc.color.BLACK);
        //textLabel1.setFontFillColor(cc.color.WHITE);
        //textLabel1.enableStroke(cc.color.BLACK, 1.5);
        //textLabel1.setPosition(0.5*ScreenSize.width, this.getContentSize().height*0.3);
        //this.addChild(textLabel1,2);

        //var bmLabel = new cc.LabelBMFont("BMFont",  "res/font/futura.fnt");
        ////bmLabel.setFontFillColor(cc.color.BLACK);
        ////bmLabel.enableStroke(cc.color.MAGENTA, 1.5);
        //bmLabel.setPosition(0.5*ScreenSize.width, this.getContentSize().height*0.5);
        //this.addChild(bmLabel,2);

        //var mainLayer = ccs.load(res.ccs_main_json).node;
        //
        //var bg = ccui.helper.seekWidgetByName(mainLayer, "bg");
        //this.addChild(mainLayer, 6);
        //
        //var loginButton = ccui.helper.seekWidgetByName(mainLayer, "bg");
        //loginButton.setVisible(false);

        //var layer = new LevelCompleteLayer(null, null);
        //this.addChild(layer, 1000);
        //var layer = new UpgradeLayer(null,null);
        //this.addChild(layer,1000);
        //var mainLayer = ccs.load(res.ccs_main_json).node;
        //this.addChild(mainLayer);

        var sp1 = new sp.SkeletonAnimation(res.sp_juanzhou_json, res.sp_juanzhou_atlas);
        sp1.setPosition(ScreenSize.width*0.5,0);
        sp1.setTimeScale(0.5);
        this.addChild(sp1, 1);
        sp1.setAnimation(0, "juanzhou_gun01", false);
        sp1.addAnimation(0, "juanzhou_gun02", false);
    }
});

