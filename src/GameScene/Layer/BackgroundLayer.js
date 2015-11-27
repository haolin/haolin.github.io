/**
 * Created by linhao on 15/11/7.
 */

var BackgroundLayer = cc.Layer.extend({
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
    ctor:function () {
        this._super();
        this.loadBackground();
        return true;
    },
    loadBackground : function(){
        var size = cc.winSize;

        //uiHolder
        var uiHolder = new cc.Sprite(res.UiHolder3_png);
        uiHolder.setPosition(size.width / 2, 60);
        this.addChild(uiHolder, 5);

        //ground
        this.springGround_1 = new cc.Sprite(res.SpringGround_png);
        this.springGround_1.setPosition(size.width / 2, 120 + 17);
        this.addChild(this.springGround_1, 5);

        //ground2
        this.springGround_2 = new cc.Sprite(res.SpringGround_png);
        this.springGround_2.setPosition(this.springGround_1.getPosition().x + this.springGround_1.getContentSize().width, 120 + 17);
        this.addChild(this.springGround_2, 5);

        //sky
        var sky = new cc.Sprite(res.Sky2_png);
        sky.setPosition(size.width / 2, size.height / 2);
        sky.setScale(115);
        this.addChild(sky, -1);

        //moutain1
        this.moutain1_1 = new cc.Sprite(res.Mountain1_png);
        this.moutain1_1.setPosition(size.width / 2, 120 + 84);
        this.addChild(this.moutain1_1, 4);

        this.moutain1_2 =  new cc.Sprite(res.Mountain1_png);
        this.moutain1_2.setPosition(this.moutain1_1.getPosition().x + this.moutain1_1.getContentSize().width, 120 + 84);
        this.addChild(this.moutain1_2, 4);


        //moutain2
        this.moutain2_1 = new cc.Sprite(res.Mountain2_png);
        this.moutain2_1.setPosition(size.width / 2, 120 + 84);
        this.addChild(this.moutain2_1, 3);

        this.moutain2_2 = new cc.Sprite(res.Mountain2_png);
        this.moutain2_2.setPosition(this.moutain2_1.getPosition().x + this.moutain2_1.getContentSize().width, 120 + 84);
        this.addChild(this.moutain2_2, 3);

        //moutain3
        this.moutain3_1 = new cc.Sprite(res.Mountain3_png);
        this.moutain3_1.setPosition(size.width / 2, 120 + 117);
        this.addChild(this.moutain3_1, 2);

        this.moutain3_2 = new cc.Sprite(res.Mountain3_png);
        this.moutain3_2.setPosition(this.moutain3_1.getPosition().x + this.moutain3_1.getContentSize().width, 120 + 117);
        this.addChild(this.moutain3_2, 2);

        //moutain3
        this.cloud_1 = new cc.Sprite(res.WholeClouds_png);
        this.cloud_1.setPosition(size.width / 2, 120 + 120);
        this.addChild(this.cloud_1, 1);

        this.cloud_2 = new cc.Sprite(res.WholeClouds_png);
        this.cloud_2.setPosition(this.cloud_1.getPosition().x + this.cloud_1.getContentSize().width, 120 + 120);
        this.addChild(this.cloud_2, 1);
    },
    update:function(dt){
        this.updateSprite(this.springGround_1, this.springGround_2, 80, dt);
        this.updateSprite(this.moutain1_1, this.moutain1_2, 60, dt);
        this.updateSprite(this.moutain2_1, this.moutain2_2, 40, dt);
        this.updateSprite(this.moutain3_1, this.moutain3_2, 20, dt);
        this.updateSprite(this.cloud_1, this.cloud_2, 10, dt);
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