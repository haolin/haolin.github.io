/**
 * Created by linhao on 15/4/2.
 */


var Hero = BaseActor.extend({
    _comboAttack : 0,
    //当前连击数
    _comboNumber : 0,
    _configData : null,
    ctor : function(){
        this._super("#juese_0015.png");
        return true;
    },
    onEnter:function () {
        this._super();
    },
    loadConfig : function(){
        var dataHandler = DataHandler.getInstance();
        this._data = dataHandler.getHeroData();
        this._configData = dataHandler.getConfigData();

        this._speed = cc.p(-80, 0);
        this._comboNumber = 0;

        this._maxHP = this.getMaxHP();
        this._minAttack = this.getMinAttack();
        this._maxAttack = this.getMaxAttack();
        this._comboAttack = this.getComboAttack();

        this._currentHP = this._maxHP;
        this._framePrefix = "juese_";
    },
    run : function(){
        this.playAction(15,21,true);
    },
    idle : function(){
        this.playAction(0,10,true);
    },
    attack : function(isCritical, target){
        this.playAction(110,137,false);
        this._super(isCritical, target);
    },
    die : function(target,callback) {
        this.playAction(35, 57, false, target,callback);
    },
    beAttacked : function(isCritical, attackNum){
        this._super(isCritical, attackNum);
        this._comboNumber = 0;
        var str = "-" + attackNum;
        var textLabel = new cc.LabelTTF(str,  "GUBBLABLO", 25);
        textLabel.setColor(cc.color.BLACK);
        textLabel.setPosition(this.getContentSize().width/2, this.getContentSize().height/2);
        this.addChild(textLabel);
        this.beAttackedAction(textLabel);
    },
    block : function(){
        var str = "BLOCK!";
        var textLabel = new cc.LabelTTF(str,  "GUBBLABLO", 25);
        textLabel.setColor(cc.color.BLACK);
        textLabel.setPosition(this.getContentSize().width/2, this.getContentSize().height/2);
        this.addChild(textLabel);
        this.beAttackedAction(textLabel);
    },
    getMaxHP : function(){
        return this.getValueByLevel("def_maxhp","hero_maxhp_level","max_hp");
    },
    getMinAttack : function(){
        return this.getValueByLevel("def_mindamage","hero_mindamage_level","min_damage");
    },
    getMaxAttack : function(){
        var maxAttack = this.getValueByLevel("def_maxdamage","hero_maxdamage_level","max_damage");
        var additionalMinAttack = this.getAdditionalValue("hero_mindamage_level","min_damage");
        maxAttack = maxAttack + additionalMinAttack;
        return maxAttack;
    },
    getComboAttack : function(){
        return this.getValueByLevel("def_mgcdamage","hero_combodamage_level","mgc_damage");
    },
    getValueByLevel : function(defKey, levelKey, additionalKey){
        var defValue = parseInt(this._configData[defKey]);
        var additionalValue = this.getAdditionalValue(levelKey,additionalKey);

        var value = defValue + additionalValue;
        return value;
    },
    getAdditionalValue : function(levelKey,additionalKey){
        var additionalValue = 0;
        var levelStr = cc.sys.localStorage.getItem(levelKey);
        var level = levelStr ? parseInt(levelStr) : 0;
        if(!levelStr){
            cc.sys.localStorage.setItem(levelKey, level);
        }

        var len = this._data.length;
        for(var idx = 0;idx < level && idx < this._data.length ; idx++){
            additionalValue = additionalValue + parseInt(this._data[idx][additionalKey]);
        }
        return additionalValue;
    },
    upgradeMaxHP : function(){
        this.upgradeByLevel("hero_maxhp_level");
        var originalMaxHP = this._maxHP;
        this._maxHP = this.getMaxHP();
        var deltaMaxHP = this._maxHP - originalMaxHP;
        this._currentHP = this._currentHP + deltaMaxHP;
    },
    upgradeMinAttack : function(){
        this.upgradeByLevel("hero_mindamage_level");
        this._minAttack = this.getMinAttack();
        this._maxAttack = this.getMaxAttack();
    },
    upgradeMaxAttack : function(){
        this.upgradeByLevel("hero_maxdamage_level");
        this._maxAttack = this.getMaxAttack();
    },
    upgradeComboAttack : function(){
        this.upgradeByLevel("hero_combodamage_level");
        this._comboAttack = this.getComboAttack();
    },
    fullHeal : function(){
        this._currentHP = this._maxHP;
    },
    upgradeByLevel  : function(levelKey){
        var levelStr = cc.sys.localStorage.getItem(levelKey);
        var level = levelStr ? parseInt(levelStr) : 0;
        level = level + 1;
        cc.sys.localStorage.setItem(levelKey, level);
    }
});