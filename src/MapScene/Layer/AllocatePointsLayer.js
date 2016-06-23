/**
 * Created by linhao on 15/11/7.
 */

var HeroPropertyType = {

    MinDamage : 1,
    MaxDamage : 2,
    MaxHealth : 3,
    ComboDamage : 4
};


var AllocatePointsLayer = cc.LayerColor.extend({
    _data : null,
    _gameSceneController: null,
    _dataHandler: null,

    _pointsLable: null,
    _minDamageLable: null,
    _maxDamageLable: null,
    _maxHealthLable: null,
    _comboDamageLable: null,

    _hpLable: null,
    _attackLable: null,
    _powerLable: null,

    _okButton: null,

    _pointsLeft: 0,
    _minDamageLevel: 0,
    _maxDamageLevel: 0,
    _maxHPLevel: 0,
    _comboDamageLevel: 0,

    ctor:function () {
        this._super(cc.color(80 ,80, 80, 255), ScreenSize.width, ScreenSize.height);
        // 加载[配置]
        this.loadConfig();

        // 加载UI
        this.loadUI();
        this.updateUI();

        return true;
    },
    onEnter:function () {
        this._super();

    },
    loadConfig : function(){
        this._gameSceneController = GameSceneController.getInstance();
        this._dataHandler = DataHandler.getInstance();
        this._pointsLeft = this._dataHandler.getHeroLevel() + 1;
    },
    loadUI : function(){

        //
        var pointsLeftLabel = new cc.LabelTTF("剩余点数：",  "Arial",  0.043333*ScreenSize.width);
        pointsLeftLabel.setPosition(ScreenSize.width*0.49, ScreenSize.height*0.9);
        pointsLeftLabel.setAnchorPoint(1, 0.5);
        pointsLeftLabel.setColor(cc.color.WHITE);
        this.addChild(pointsLeftLabel);

        //
        this._pointsLable = new cc.LabelTTF("0",  "Arial",  0.043333*ScreenSize.width);
        this._pointsLable.setPosition(ScreenSize.width*0.5, ScreenSize.height*0.9);
        this._pointsLable.setAnchorPoint(0, 0.5);
        this._pointsLable.setColor(cc.color.WHITE);
        this.addChild(this._pointsLable);

        var minDamageButton = util.createButton("#rewardBTN.png","Min Damage", this,this.minDamageClick);
        var maxDamageButton = util.createButton("#rewardBTN.png","Max Damage", this,this.maxDamageClick);
        var maxHealthButton = util.createButton("#rewardBTN.png","Max Health", this,this.maxHealthClick);
        var comboDamageButton = util.createButton("#rewardBTN.png","Combo Damage", this,this.comboDamageClick);

        var buttons = [];

        this.loadAllocateUI(buttons, HeroPropertyType.MinDamage, ScreenSize.height*0.75);
        this.loadAllocateUI(buttons, HeroPropertyType.MaxDamage, ScreenSize.height*0.65);
        this.loadAllocateUI(buttons, HeroPropertyType.MaxHealth, ScreenSize.height*0.55);
        this.loadAllocateUI(buttons, HeroPropertyType.ComboDamage, ScreenSize.height*0.45);


        //hp
        var hpText  = new cc.LabelTTF("Hp:",  "Arial",  0.025*ScreenSize.width);
        hpText.setPosition(ScreenSize.width*0.83, ScreenSize.height*0.75);
        hpText.setAnchorPoint(1, 0.5);
        hpText.setColor(cc.color.WHITE);
        this.addChild(hpText);

        this._hpLable = new cc.LabelTTF("0",  "Arial",  0.025*ScreenSize.width);
        this._hpLable.setPosition(ScreenSize.width*0.85, ScreenSize.height*0.75);
        this._hpLable.setAnchorPoint(0, 0.5);
        this._hpLable.setColor(cc.color.WHITE);
        this.addChild(this._hpLable);

        //attack
        var attackText  = new cc.LabelTTF("Att:",  "Arial",  0.025*ScreenSize.width);
        attackText.setPosition(ScreenSize.width*0.83, ScreenSize.height*0.7);
        attackText.setAnchorPoint(1, 0.5);
        attackText.setColor(cc.color.WHITE);
        this.addChild(attackText);

        this._attackLable = new cc.LabelTTF("0-0",  "Arial",  0.025*ScreenSize.width);
        this._attackLable.setPosition(ScreenSize.width*0.85, ScreenSize.height*0.7);
        this._attackLable.setAnchorPoint(0, 0.5);
        this._attackLable.setColor(cc.color.WHITE);
        this.addChild(this._attackLable);

        //power
        var powerText  = new cc.LabelTTF("Pwr:",  "Arial",  0.025*ScreenSize.width);
        powerText.setPosition(ScreenSize.width*0.83, ScreenSize.height*0.65);
        powerText.setAnchorPoint(1, 0.5);
        powerText.setColor(cc.color.WHITE);
        this.addChild(powerText);

        this._powerLable = new cc.LabelTTF("0",  "Arial",  0.025*ScreenSize.width);
        this._powerLable.setPosition(ScreenSize.width*0.85, ScreenSize.height*0.65);
        this._powerLable.setAnchorPoint(0, 0.5);
        this._powerLable.setColor(cc.color.WHITE);
        this.addChild(this._powerLable);


        this._okButton = util.createButton("#resumeBTN.png","#quitBTN.png","#quitBTN.png","OK", this,this.okButtonClick);
        this._okButton.setPosition(ScreenSize.width*0.5,ScreenSize.height*0.1);
        if(this._pointsLeft > 0){
            this._okButton.setEnabled(false);
        }

        buttons.push(this._okButton);
        var menu = new cc.Menu(buttons);
        menu.setPosition(0, 0);
        this.addChild(menu);
    },
    loadAllocateUI : function(buttons, data, height) {

        var propertyLable = new cc.LabelTTF("0",  "Arial",  0.03*ScreenSize.width);
        propertyLable.setPosition(ScreenSize.width*0.43, height);
        propertyLable.setAnchorPoint(0.5, 0.5);
        propertyLable.setColor(cc.color.WHITE);
        this.addChild(propertyLable);

        var propertyStr = null;
        switch (data){
            case  HeroPropertyType.MinDamage:
                propertyStr = "Min Damage:";
                this._minDamageLable = propertyLable;
                break;
            case  HeroPropertyType.MaxDamage:
                propertyStr = "Max Damage:";
                this._maxDamageLable = propertyLable;
                break;
            case  HeroPropertyType.MaxHealth:
                propertyStr = "Max Health:";
                this._maxHealthLable = propertyLable;
                break;
            case  HeroPropertyType.ComboDamage:
                propertyStr = "Combo Damage:";
                this._comboDamageLable = propertyLable;
                break;
            default :
                break;
        }

        var minDamageLabel = new cc.LabelTTF(propertyStr,  "Arial",  0.03*ScreenSize.width);
        minDamageLabel.setPosition(ScreenSize.width*0.3, height);
        minDamageLabel.setAnchorPoint(1.0, 0.5);
        minDamageLabel.setColor(cc.color.WHITE);
        this.addChild(minDamageLabel);

        var menuItem1 = new cc.MenuItemFont("-", this.reduceButtonClick, this);
        menuItem1.setColor(cc.color.RED);
        menuItem1.setUserData(data);
        menuItem1.setPosition(ScreenSize.width*0.35, height);
        buttons.push(menuItem1);

        var menuItem2 = new cc.MenuItemFont("+", this.addButtonClick, this);
        menuItem2.setColor(cc.color.GREEN);
        menuItem2.setUserData(data);
        menuItem2.setPosition(ScreenSize.width*0.51, height);
        buttons.push(menuItem2);
    },
    addButtonClick : function(sender) {
        if(this._pointsLeft <= 0){
            return;
        }
        switch (sender.getUserData()){
            case  HeroPropertyType.MinDamage:
                this._minDamageLevel++;
                break;
            case  HeroPropertyType.MaxDamage:
                this._maxDamageLevel++;
                break;
            case  HeroPropertyType.MaxHealth:
                this._maxHPLevel++;
                break;
            case  HeroPropertyType.ComboDamage:
                this._comboDamageLevel++;
                break;
            default :
                break;
        }
        this._pointsLeft--;
        this.updateUI();
        if(this._pointsLeft <= 0){
            this.setOKEnabled(true);
        }
    },
    reduceButtonClick : function(sender) {
        switch (sender.getUserData()){
            case  HeroPropertyType.MinDamage:
                if(this._minDamageLevel <= 0){
                    return;
                }
                this._minDamageLevel--;
                break;
            case  HeroPropertyType.MaxDamage:
                if(this._maxDamageLevel <= 0){
                    return;
                }
                this._maxDamageLevel--;
                break;
            case  HeroPropertyType.MaxHealth:
                if(this._maxHPLevel <= 0){
                    return;
                }
                this._maxHPLevel--;
                break;
            case  HeroPropertyType.ComboDamage:
                if(this._comboDamageLevel <= 0){
                    return;
                }
                this._comboDamageLevel--;
                break;
            default :
                break;
        }
        this._pointsLeft++;
        this.updateUI();
        this.setOKEnabled(false);
    },
    okButtonClick : function(sender) {
        this._dataHandler.saveAllocatedData(this._maxHPLevel,this._minDamageLevel, this._maxDamageLevel, this._comboDamageLevel);
        this.removeFromParent();
    },
    setOKEnabled : function(enable) {
        this._okButton.setEnabled(enable);
    },
    updateUI :  function(){
        this._pointsLable.setString(String(this._pointsLeft));
        this._minDamageLable.setString(String(this._minDamageLevel));
        this._maxDamageLable.setString(String(this._maxDamageLevel));
        this._maxHealthLable.setString(String(this._maxHPLevel));
        this._comboDamageLable.setString(String(this._comboDamageLevel));

        var maxHp = this._dataHandler.getMaxHPByLevel(this._maxHPLevel);
        this._hpLable.setString(String(maxHp));
        var minDamage = this._dataHandler.getMinAttackByLevel(this._minDamageLevel);
        var maxDamage = this._dataHandler.getMaxAttackByLevel(this._maxDamageLevel, this._minDamageLevel);
        var str = minDamage + "-" + maxDamage;
        this._attackLable.setString(str);
        var comboDamage = this._dataHandler.getComboAttackByLevel(this._comboDamageLevel);
        this._powerLable.setString(String(comboDamage));
    }
});