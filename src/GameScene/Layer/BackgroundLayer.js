/**
 * Created by linhao on 15/11/7.
 */

var BackgroundLayer = cc.Layer.extend({
    _bg : null,
    shouldUpdate : true,
    springGround_1 : null,
    springGround_2 : null,
    moutain1_1 : null,
    moutain1_2 : null,
    moutain2_1 : null,
    moutain2_2 : null,
    moutain3_1 : null,
    moutain3_2 : null,
    cloud_1 : null,
    cloud_2 : null,
    ctor:function (bg) {
        this._super();
        this._bg = bg;
        this.loadBackground();
        return true;
    },
    loadBackground : function(){

        //uiHolder
        var uiHolder = ccui.helper.seekWidgetByName(this._bg,"bg_battle");
        //var uiHolder = new cc.Sprite("#uiHolder3.png");
        //uiHolder.setPosition(0.5*ScreenSize.width, 0.17857*ScreenSize.height);
        //this.addChild(uiHolder, 5);

        //ground
        this.springGround_1 = ccui.helper.seekWidgetByName(this._bg,"caodi");
        //this.springGround_1 = new cc.Sprite(res.SpringGround_png);
        //this.springGround_1.setPosition(0.5*ScreenSize.width, 0.40774*ScreenSize.height);
        //this.addChild(this.springGround_1, 5);

        //ground2
        this.springGround_2 = ccui.helper.seekWidgetByName(this._bg,"caodi_0");
        //this.springGround_2 = new cc.Sprite(res.SpringGround_png);
        //this.springGround_2.setPosition(this.springGround_1.getPosition().x + this.springGround_1.getContentSize().width, 0.40774*ScreenSize.height);
        //this.addChild(this.springGround_2, 5);

        //sky
        var sky = ccui.helper.seekWidgetByName(this._bg,"sky");
        //var sky = new cc.Sprite(res.Sky2_png);
        //sky.setPosition(0.5*ScreenSize.width / 2, 0.5*ScreenSize.height);
        //sky.setScale(115);
        //this.addChild(sky, -1);

        //moutain1
       this.moutain1_1 = ccui.helper.seekWidgetByName(this._bg,"bg1");
        //this.moutain1_1 = new cc.Sprite(res.Mountain1_png);
        //this.moutain1_1.setAnchorPoint(0.5, 0);
        //this.moutain1_1.setPosition(0.5*ScreenSize.width, 0.45*ScreenSize.height);
        //this.addChild(this.moutain1_1, 4);

        this.moutain1_2 = ccui.helper.seekWidgetByName(this._bg,"bg1_0");
        //this.moutain1_2 =  new cc.Sprite(res.Mountain1_png);
        //this.moutain1_2.setAnchorPoint(0.5, 0);
        //this.moutain1_2.setPosition(this.moutain1_1.getPosition().x + this.moutain1_1.getContentSize().width, 0.45*ScreenSize.height);
        //this.addChild(this.moutain1_2, 4);


        //moutain2
        this.moutain2_1 = ccui.helper.seekWidgetByName(this._bg,"bg2");
        //this.moutain2_1 = new cc.Sprite(res.Mountain2_png);
        //this.moutain2_1.setAnchorPoint(0.5, 0);
        //this.moutain2_1.setPosition(0.5*ScreenSize.width, 0.45*ScreenSize.height);
        //this.addChild(this.moutain2_1, 3);

        this.moutain2_2 = ccui.helper.seekWidgetByName(this._bg,"bg2_0");
        //this.moutain2_2 = new cc.Sprite(res.Mountain2_png);
        //this.moutain2_2.setAnchorPoint(0.5, 0);
        //this.moutain2_2.setPosition(this.moutain2_1.getPosition().x + this.moutain2_1.getContentSize().width, 0.45*ScreenSize.height);
        //this.addChild(this.moutain2_2, 3);

        //moutain3
        this.moutain3_1 = ccui.helper.seekWidgetByName(this._bg,"bg3");
        //this.moutain3_1 = new cc.Sprite(res.Mountain3_png);
        //this.moutain3_1.setAnchorPoint(0.5, 0);
        //this.moutain3_1.setPosition(0.5*ScreenSize.width, 0.45*ScreenSize.height);
        //this.addChild(this.moutain3_1, 2);

        this.moutain3_2 = ccui.helper.seekWidgetByName(this._bg,"bg3_0");
        //this.moutain3_2 = new cc.Sprite(res.Mountain3_png);
        //this.moutain3_2.setAnchorPoint(0.5, 0);
        //this.moutain3_2.setPosition(this.moutain3_1.getPosition().x + this.moutain3_1.getContentSize().width, 0.45*ScreenSize.height);
        //this.addChild(this.moutain3_2, 2);

        //cloud
        this.cloud_1 = new cc.Sprite(res.WholeClouds_png);
        this.cloud_1.setPosition(0.5*ScreenSize.width, 0.71429*ScreenSize.height);
        //this.addChild(this.cloud_1, 1);
        this._bg.addChild(this.cloud_1,0);

        this.cloud_2 = new cc.Sprite(res.WholeClouds_png);
        this.cloud_2.setPosition(this.cloud_1.getPosition().x + this.cloud_1.getContentSize().width, 0.71429*ScreenSize.height);
        //this.addChild(this.cloud_2, 1);
        this._bg.addChild(this.cloud_2,0);
    },
    update:function(dt){
        this.updateSprite(this.springGround_1, this.springGround_2, 0.13333*ScreenSize.width, dt);
        this.updateSprite(this.moutain1_1, this.moutain1_2, 0.09999*ScreenSize.width, dt);
        this.updateSprite(this.moutain2_1, this.moutain2_2, 0.06666*ScreenSize.width, dt);
        this.updateSprite(this.moutain3_1, this.moutain3_2, 0.03333*ScreenSize.width, dt);
        this.updateSprite(this.cloud_1, this.cloud_2, 0.01666*ScreenSize.width, dt);
    },
    updateSprite:function(first, second, speed, dt){
        if(this.shouldUpdate === true){
            var position = first.getPosition();
            var netPosition = new cc.Point(position.x - dt*speed, position.y);
            if(netPosition.x <= -first.getContentSize().width/2){
                netPosition = new cc.Point(netPosition.x + first.getContentSize().width, position.y);
            }

            first.setPosition(netPosition.x, netPosition.y);
            second.setPosition(first.getPosition().x + first.getContentSize().width, first.getPosition().y);
        }
    },
    updateCloud:function(dt){
        this.updateSprite(this.cloud_1, this.cloud_2, 5, dt);
    }
});