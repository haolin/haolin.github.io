/**
 * Created by linhao on 15/4/2.
 */


var CtlHP = cc.Sprite.extend({
    maxHP: 0,
    currentHP: 0,
    greenBar : null,
    greenBarWidth : 0,
    textLabel : null,

    //血条动画是否反方向，用于怪物血条
    reverse: false,
    ctor : function(isReverse){
        this._super("#healthBarBack.png");
        this.reverse = isReverse;
        this.loadConfig();
        this.initialize();
        return true;
    },
    loadConfig : function(){

    },
    initialize : function(){
        this.textLabel = new cc.LabelTTF("100/100",  "GUBBLABLO", 18);
        this.textLabel.setColor(cc.color.BLACK);
        //label.setFontFillColor(cc.color.BLACK);
        //label.enableStroke(cc.color.BLACK, 2);
        this.textLabel.setPosition(this.getContentSize().width/2, this.getContentSize().height/2);
        this.addChild(this.textLabel, 2);


        this.greenBar = new cc.Sprite(res.GreenBar_png);
        if(this.reverse === true){
            this.greenBar.setPosition(this.getContentSize().width - 5, 5);
            this.greenBar.setAnchorPoint(1,0);
        }else{
            this.greenBar.setPosition(5, 5);
            this.greenBar.setAnchorPoint(0,0);
        }
        this.greenBarWidth = this.greenBar.getContentSize().width;
        //green.setTextureRect(cc.rect(0, 0,green.getContentSize().width/2, green.getContentSize().height));
        this.addChild(this.greenBar,1);
    },
    update : function() {
        if(this.maxHP === DATA_UNDEFINE && this.currentHP === DATA_UNDEFINE){
            this.textLabel.setString("???/???");
            return;
        }

        if(this.maxHP <= 0 || this.currentHP <= 0){
            this.currentHP = 0;
            this.greenBar.setTextureRect(cc.rect(0, 0, 0, this.greenBar.getContentSize().height));
        }else if(this.currentHP >= this.maxHP){
            this.greenBar.setTextureRect(cc.rect(0, 0, this.greenBarWidth, this.greenBar.getContentSize().height));
        }else{
            var width = this.greenBarWidth * this.currentHP / this.maxHP;
            this.greenBar.setTextureRect(cc.rect(0, 0, width, this.greenBar.getContentSize().height));
        }

        this.textLabel.setString(this.currentHP + "/" + this.maxHP);
    }
});
