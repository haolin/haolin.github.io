/**
 * Created by linhao on 15/4/2.
 */


var CtlCombo = cc.Sprite.extend({
    _battle:null,
    maxComboCount: 0,
    currentComboCount: 0,
    _comboPoint: 0,

    _textLabel : null,
    _comboLabel : null,
    _greenBar : null,
    _particle : null,
    _greenBarWidth : 0,
    ctor : function(battle){
        //this._super("#comboHolder.png");
        this._super();
        this._battle = battle;
        this.loadConfig();
        this.initialize();
        return true;
    },
    loadConfig : function(){
        this.currentComboCount = 0;
        this._comboPoint = 0;
        this.maxComboCount = MAX_BOX_COUNT;
    },
    initialize : function(){
        this._greenBar = ccui.helper.seekWidgetByName(this._battle,"combobar");
        this._greenBar.setDirection(ccui.LoadingBar.TYPE_LEFT);
        this._greenBarWidth = this._greenBar.getContentSize().width;
        this._greenBarWidth = this._greenBar.getContentSize().width;

        this._setWidth( 0.55*ScreenSize.width);

        //this.setScale(1);
        var comboIcon = ccui.helper.seekWidgetByName(this._battle,"Image_9_0");

        //var mainLaye = ccs.load(res.ccs_main_json).node;
        var root_panel = ccui.helper.seekWidgetByName(this._battle,"root_panel");
        this._textLabel = ccui.helper.seekWidgetByName(root_panel,"att_atlas_0_0_0");
        //this._textLabel = new cc.LabelTTF("0",  "GUBBLABLO", 0.066667*ScreenSize.width);
        ////label.setColor(cc.color.BLACK);
        ////label.setFontFillColor(cc.color.BLACK);
        //this._textLabel.enableStroke(cc.color.BLACK, 4);
        //this._textLabel.setPosition(-0.1*ScreenSize.width, this.getContentSize().height/2);
        //this.addChild(this._textLabel,2);

        var label = new cc.LabelTTF("Combo:",  "Arial", 0.03*ScreenSize.width);
        label.enableStroke(cc.color.BLACK, 4);
        label.setAnchorPoint(1, 0.5);
        label.setPosition(this.getContentSize().width + 0.12*ScreenSize.width, this.getContentSize().height/2);
        this.addChild(label,2);

        this._comboLabel = new cc.LabelTTF("0",  "Arial", 0.03*ScreenSize.width);
        this._comboLabel.enableStroke(cc.color.BLACK, 4);
        this._comboLabel.setAnchorPoint(0, 0.5);
        this._comboLabel.setPosition(this.getContentSize().width + 0.15*ScreenSize.width, this.getContentSize().height/2);
        this.addChild(this._comboLabel,2);

        // m_hpBar->setTextureRect(CCRect(0, 0, width, m_hpBarHeight));

        //闪电图标
        //var powerIcon = new cc.Sprite("#powerIcon.png");
        //powerIcon.setPosition(-30, this.getContentSize().height/2);
        //this.addChild(powerIcon, 2);

        //this._greenBar = new cc.Sprite(res.ComboBar_png);
        //this._greenBar.setPosition(0.00583333*ScreenSize.width, 0.01339286*ScreenSize.height);
        //this._greenBar.setAnchorPoint(0,0);
        ////
        ////green.setTextureRect(cc.rect(0, 0, 0 , green.getContentSize().height));
        //this.addChild(this._greenBar,1);
        //this._greenBarWidth = this._greenBar.getContentSize().width;

    },
    update : function() {
        if(this.maxComboCount <= 0 || this.currentComboCount <= 0){
            this.currentComboCount = 0;
            this._greenBar.setPercent(util.getLoadingValue(0));
            this._greenBar.setVisible(false);
            //this._greenBar.setTextureRect(cc.rect(0, 0, 0, this._greenBar.getContentSize().height));
            this.removieParticle();
        }else if(this.currentComboCount >= this.maxComboCount){
            //this._greenBar.setTextureRect(cc.rect(0, 0, this._greenBarWidth, this._greenBar.getContentSize().height));
            this._greenBar.setVisible(true);
            this._greenBar.setPercent(util.getLoadingValue(100));
            this.addParticle();
        }else{
            this._greenBar.setVisible(true);
            this._greenBar.setPercent(util.getLoadingValue(this.currentComboCount / this.maxComboCount * 100));
            //var width = this._greenBarWidth * this.currentComboCount / this.maxComboCount;
            //this._greenBar.setTextureRect(cc.rect(0, 0, width, this._greenBar.getContentSize().height));
        }

        this._textLabel.setString(util.parseSringForLabel(String(this.currentComboCount)));
        this._comboLabel.setString(this._comboPoint);
    },
    addParticle : function(){
        var file = DataHandler.getInstance().getComboParticleFile(this.currentComboCount, "combo_lz");
        if(file !== null){
            this.removieParticle();
            this._particle = new cc.ParticleSystem(file);
            var p = this._greenBar.convertToWorldSpace();
            this._particle.setPosition(p.x, p.y - this._greenBar.getContentSize().height/2);
            this.addChild(this._particle, -1);
        }
    },
    removieParticle : function(){
        if(this._particle !== null){
            this._particle.stopSystem();
            this._particle.removeFromParent();
            this._particle = null;
        }
    }

});
