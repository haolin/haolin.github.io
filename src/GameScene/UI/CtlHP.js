/**
 * Created by linhao on 15/4/2.
 */


var CtlHP = cc.Sprite.extend({
    _top_panel:null,
    maxHP: 0,
    currentHP: 0,
    greenBar : null,
    greenBarWidth : 0,
    textLabel : null,

    //血条动画是否反方向，用于怪物血条
    reverse: false,
    ctor : function(top_panel,isReverse){
        this._super("#healthBarBack.png");
        this._top_panel = top_panel;
        this.reverse = isReverse;
        this.loadConfig();
        this.initialize();
        return true;
    },
    loadConfig : function(){

    },
    initialize : function(){
        if(this.reverse === false){
            this.textLabel = ccui.helper.seekWidgetByName(this._top_panel,"hp_atlas");
            this.greenBar = ccui.helper.seekWidgetByName(this._top_panel,"hp_g");
            this.greenBarWidth = this.greenBar.getContentSize().width;
            //设置进度条加载方向，不能直接调用属性，因为setter中有其他的相关设置，否则会造成页面混乱
            this.greenBar.setDirection(ccui.LoadingBar.TYPE_LEFT);
        }else {
            this.textLabel = ccui.helper.seekWidgetByName(this._top_panel,"hp_atlas_0");
            this.greenBar = ccui.helper.seekWidgetByName(this._top_panel,"hp_g_0");
            this.greenBarWidth = this.greenBar.getContentSize().width;
            //设置进度条加载方向，不能直接调用属性，因为setter中有其他的相关设置，否则会造成页面混乱
            this.greenBar.setDirection(ccui.LoadingBar.TYPE_RIGHT);
        }
        //this.textLabel = new cc.LabelTTF("100/100",  "GUBBLABLO", 0.03*ScreenSize.width);
        //this.textLabel.setColor(cc.color.BLACK);
        ////label.setFontFillColor(cc.color.BLACK);
        ////label.enableStroke(cc.color.BLACK, 2);
        //this.textLabel.setPosition(this.getContentSize().width/2, this.getContentSize().height/2);
        //this.addChild(this.textLabel, 2);
        //
        //
        //this.greenBar = new cc.Sprite(res.GreenBar_png);
        //if(this.reverse === true){
        //    this.greenBar.setPosition(this.getContentSize().width - 0.00833333*ScreenSize.width, 0.01488095*ScreenSize.height);
        //    this.greenBar.setAnchorPoint(1,0);
        //}else{
        //    this.greenBar.setPosition(0.00833333*ScreenSize.width, 0.01488095*ScreenSize.height);
        //    this.greenBar.setAnchorPoint(0,0);
        //}
        //this.greenBarWidth = this.greenBar.getContentSize().width;
        ////green.setTextureRect(cc.rect(0, 0,green.getContentSize().width/2, green.getContentSize().height));
        //this.addChild(this.greenBar,1);
    },
    update : function() {
        if(this.maxHP === DATA_UNDEFINE || this.currentHP === DATA_UNDEFINE){
            this.textLabel.setString(util.parseSringForLabel("???/???"));
            return;
        }

        if(this.maxHP <= 0 || this.currentHP <= 0){
            this.currentHP = 0;
            this.greenBar.setPercent(0);
            this.greenBar.setVisible(false);
        }else if(this.currentHP >= this.maxHP){
            this.greenBar.setVisible(true);
            this.greenBar.setPercent(100);
        }else{
            this.greenBar.setVisible(true);
            this.greenBar.setPercent(util.getLoadingValue(this.currentHP * 100 / this.maxHP));
        }

        this.textLabel.setString(util.parseSringForLabel(this.currentHP + "/" + this.maxHP));
    }
});
