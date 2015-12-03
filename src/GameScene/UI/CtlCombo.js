/**
 * Created by linhao on 15/4/2.
 */


var CtlCombo = cc.Sprite.extend({
    maxComboCount: 0,
    currentComboCount: 0,

    _textLabel : null,
    _greenBar : null,
    _greenBarWidth : 0,
    ctor : function(){
        this._super("#comboHolder.png");
        this.loadConfig();
        this.initialize();
        return true;
    },
    loadConfig : function(){
        this.currentComboCount = 0;
        this.maxComboCount = MAX_BOX_COUNT;
    },
    initialize : function(){
        //this.setScale(1);
        this._textLabel = new cc.LabelTTF("0",  "GUBBLABLO", 40);
        //label.setColor(cc.color.BLACK);
        //label.setFontFillColor(cc.color.BLACK);
        this._textLabel.enableStroke(cc.color.BLACK, 4);
        this._textLabel.setPosition(-60, this.getContentSize().height/2);
        this.addChild(this._textLabel,2);

        // m_hpBar->setTextureRect(CCRect(0, 0, width, m_hpBarHeight));

        var powerIcon = new cc.Sprite("#powerIcon.png");
        powerIcon.setPosition(-18, this.getContentSize().height/2);
        this.addChild(powerIcon, 2);

        this._greenBar = new cc.Sprite(res.ComboBar_png);
        this._greenBar.setPosition(3.5, 4.5);
        this._greenBar.setAnchorPoint(0,0);
        //
        //green.setTextureRect(cc.rect(0, 0, 0 , green.getContentSize().height));
        this.addChild(this._greenBar,1);
        this._greenBarWidth = this._greenBar.getContentSize().width;

    },
    update : function() {
        if(this.maxComboCount <= 0 || this.currentComboCount <= 0){
            this.currentComboCount = 0;
            this._greenBar.setTextureRect(cc.rect(0, 0, 0, this._greenBar.getContentSize().height));
        }else if(this.currentComboCount >= this.maxComboCount){
            this._greenBar.setTextureRect(cc.rect(0, 0, this._greenBarWidth, this._greenBar.getContentSize().height));
        }else{
            var width = this._greenBarWidth * this.currentComboCount / this.maxComboCount;
            this._greenBar.setTextureRect(cc.rect(0, 0, width, this._greenBar.getContentSize().height));
        }

        this._textLabel.setString(this.currentComboCount);
        cc.moveBy()
    }

});
