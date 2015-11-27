/**
 * Created by linhao on 15/11/7.
 */

var UpgradeLayer = cc.Layer.extend({
    _hero: null,
    _gameSceneController: null,
    ctor:function (hero) {
        this._super();
        this._hero = hero;
        this.loadConfig();
        this.loadUI();
        this.bindTouchListener();
        return true;
    },
    // 加载[配置]
    loadConfig : function(){
        this._gameSceneController = GameSceneController.getInstance();
    },
    loadUI : function(){
        //bg
        var bg = new cc.Sprite("#rewardBG.png");
        bg.setPosition( ScreenSize.width/2, ScreenSize.height/2);
        this.addChild(bg, 201);

        var upgradeLabel = new cc.LabelTTF("Choose Reward!",  "GUBBLABLO", 20);
        upgradeLabel.setPosition( bg.getContentSize().width/2, bg.getContentSize().height*9/10);
        //upgradeLabel.setColor(cc.color.WHITE);
        //upgradeLabel.setFontFillColor(cc.color.BLACK);
        bg.addChild(upgradeLabel, 201);

        var minDamageButton = util.createButton("#rewardBTN.png","Min Damage", this,this.minDamageClick);
        var maxDamageButton = util.createButton("#rewardBTN.png","Max Damage", this,this.maxDamageClick);
        var maxHealthButton = util.createButton("#rewardBTN.png","Max Health", this,this.maxHealthClick);
        var comboDamageButton = util.createButton("#rewardBTN.png","Combo Damage", this,this.comboDamageClick);
        var fullHealButton = util.createButton("#rewardBTN.png","Full Heal", this,this.fullHealClick);

        var array = [minDamageButton,maxDamageButton,maxHealthButton,comboDamageButton,fullHealButton];
        var upgradeButtons = util.getRandomElements(array, 3);

        var menu = new cc.Menu(upgradeButtons);
        menu.alignItemsVerticallyWithPadding(bg.getContentSize().height/25);
        menu.setPosition(bg.width/2, bg.height*3/7);
        bg.addChild(menu);
    },
    minDamageClick:function(dt){
        cc.log("minDamageClick");
        this._hero.upgradeMinAttack();
        this._gameSceneController.setStatus(GameStatus.NextEmeny);
        this.removeFromParent();
    },
    maxDamageClick:function(dt){
        cc.log("maxDamageClick");
        this._hero.upgradeMaxAttack();
        this._gameSceneController.setStatus(GameStatus.NextEmeny);
        this.removeFromParent();
    },
    maxHealthClick:function(dt){
        cc.log("maxHealthClick");
        this._hero.upgradeMaxHP();
        this._gameSceneController.setStatus(GameStatus.NextEmeny);
        this.removeFromParent();
    },
    comboDamageClick:function(dt){
        cc.log("comboDamageClick");
        this._hero.upgradeComboAttack();
        this._gameSceneController.setStatus(GameStatus.NextEmeny);
        this.removeFromParent();
    },
    fullHealClick:function(dt){
        cc.log("fullHealClick");
        this._hero.fullHeal();
        this._gameSceneController.setStatus(GameStatus.NextEmeny);
        this.removeFromParent();
    },
    update:function(dt){

    },
    bindTouchListener : function(){
        var listener = cc.EventListener.create({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,
            target          : this,
            swallowTouches  : true,
            onTouchBegan    : this.onTouchBegan,
            onTouchMoved    : this.onTouchMoved,
            onTouchEnded    : this.onTouchEnded
        });
        cc.eventManager.addListener(listener, this);
    },
    // 事件[触摸开始]
    onTouchBegan: function (touch, event) {
        return true;
    },
    // 事件[触摸移动]
    onTouchMoved: function (touch, event) {
    },
    // 事件[触摸结束]
    onTouchEnded: function (touch, event) {
    }
});