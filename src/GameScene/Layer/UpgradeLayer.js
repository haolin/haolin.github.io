/**
 * Created by linhao on 15/11/7.
 */

var UpgradeLayer = cc.Layer.extend({
    _gameSceneController: null,
    _dataHandler: null,
    _hero: null,
    _target: null,
    _bg: null,
    _coinReward: 0,
    _expReward: 0,
    ctor:function (hero, target) {
        this._super();
        this._hero = hero;
        this._target = target;
        this.loadConfig();
        this.loadUI();
        this.bindTouchListener();
        return true;
    },
    // 加载[配置]
    loadConfig : function(){
        this._gameSceneController = GameSceneController.getInstance();
        this._dataHandler = DataHandler.getInstance();
    },
    loadUI : function(){
        //if(this._gameSceneController.isNextStageExist()){
            //每次战斗遇到升级出界面
            this.loadUpgradeUI();
        //}else{
        //    //关卡结算
        //    this.loadLevelCompleteUI();
        //}
    },
    //loadLevelCompleteUI : function(){
    //
    //    var originalLevel = this._dataHandler.getHeroLevel();
    //    var chapter = this._gameSceneController.getCurrentChapter();
    //    var level = this._gameSceneController.getCurrentLevel();
    //    this._coinReward = this._dataHandler.getGoldRewardByChapter(chapter);
    //    this._dataHandler.addCoinsNumber(this._coinReward);
    //
    //    this._expReward = this._dataHandler.getExpRewardByChapter(chapter);
    //    if(!this._gameSceneController.isChestStage()){
    //        this._expReward += this._dataHandler.getExpRewardByEnemy(level);
    //    }
    //    this._dataHandler.addExpNumber(this._expReward);
    //
    //    this._target.updateUI();
    //
    //    var heroLevel = DataHandler.getInstance().getHeroLevel();
    //
    //    if(originalLevel < heroLevel ){
    //        //bg
    //        //var bg = new cc.Sprite("#rewardBG.png");
    //        this._bg = new cc.LayerColor(cc.color(0,0,0,150), ScreenSize.width*0.32, ScreenSize.height*0.7);
    //        this._bg.setPosition( ScreenSize.width*(1-0.32)/2, ScreenSize.height*(1-0.7)/2);
    //        this.addChild(this._bg, 201);
    //
    //        var bgWidth = this._bg.getContentSize().width;
    //        var bgHeight = this._bg.getContentSize().height;
    //
    //        //coin
    //        var coin = new cc.Sprite("#coin.png");
    //        coin.setPosition(bgWidth*0.1, bgHeight*0.875);
    //        this._bg.addChild(coin);
    //
    //        var coinLabel = new cc.LabelTTF(String(this._coinReward),  "GUBBLABLO", 0.033333*ScreenSize.width);
    //        coinLabel.setPosition( bgWidth*0.2, bgHeight*0.875);
    //        coinLabel.setAnchorPoint(0, 0.5);
    //        coinLabel.setFontFillColor(cc.color.BLACK);
    //        this._bg.addChild(coinLabel);
    //
    //        //exp
    //        var expLabel = new cc.LabelTTF('Exp: ' + String(this._expReward),  "GUBBLABLO", 0.033333*ScreenSize.width);
    //        expLabel.setPosition( bgWidth*0.55, bgHeight*0.875);
    //        expLabel.setAnchorPoint(0, 0.5);
    //        expLabel.setFontFillColor(cc.color.BLACK);
    //        this._bg.addChild(expLabel);
    //
    //        //Choose Reward
    //        var upgradeLabel = new cc.LabelTTF("Level up!",  "GUBBLABLO", 0.033333*ScreenSize.width);
    //        upgradeLabel.setPosition( bgWidth*0.5, bgHeight*0.73);
    //        //upgradeLabel.setColor(cc.color.WHITE);
    //        //upgradeLabel.setFontFillColor(cc.color.BLACK);
    //        this._bg.addChild(upgradeLabel, 201);
    //
    //        var minDamageButton = util.createButton("#rewardBTN.png","Min Damage", this,this.minDamageClick);
    //        var maxDamageButton = util.createButton("#rewardBTN.png","Max Damage", this,this.maxDamageClick);
    //        var maxHealthButton = util.createButton("#rewardBTN.png","Max Health", this,this.maxHealthClick);
    //        var comboDamageButton = util.createButton("#rewardBTN.png","Combo Damage", this,this.comboDamageClick);
    //        //var fullHealButton = util.createButton("#rewardBTN.png","Full Heal", this,this.fullHealClick);
    //
    //        var array = [minDamageButton,maxDamageButton,maxHealthButton,comboDamageButton];
    //        var upgradeButtons = util.getRandomElements(array, 3);
    //
    //        var menu = new cc.Menu(upgradeButtons);
    //        menu.alignItemsVerticallyWithPadding(bgHeight/25);
    //        menu.setPosition(bgWidth*0.5, bgHeight*0.35);
    //        this._bg.addChild(menu);
    //    }else{
    //        //bg
    //        //var bg = new cc.Sprite("#rewardBG.png");
    //        this._bg = new cc.LayerColor(cc.color(0,0,0,150), ScreenSize.width*0.32, ScreenSize.height*0.38);
    //        this._bg.setPosition( ScreenSize.width*(1-0.32)/2, ScreenSize.height*(1-0.38)/2);
    //        this.addChild(this._bg, 201);
    //
    //        var bgWidth = this._bg.getContentSize().width;
    //        var bgHeight = this._bg.getContentSize().height;
    //
    //        //coin
    //        var coin = new cc.Sprite("#coin.png");
    //        coin.setPosition( bgWidth*0.15,  bgHeight*0.75);
    //        this._bg.addChild(coin);
    //
    //        var coinLabel = new cc.LabelTTF(String(this._coinReward),  "GUBBLABLO", 0.033333*ScreenSize.width);
    //        coinLabel.setPosition( bgWidth*0.25, bgHeight*0.75);
    //        coinLabel.setAnchorPoint(0, 0.5);
    //        coinLabel.setFontFillColor(cc.color.BLACK);
    //        this._bg.addChild(coinLabel);
    //
    //        //exp
    //        var expLabel = new cc.LabelTTF('Exp: ' + String(this._expReward),  "GUBBLABLO", 0.033333*ScreenSize.width);
    //        expLabel.setPosition( bgWidth*0.55, bgHeight*0.75);
    //        expLabel.setAnchorPoint(0, 0.5);
    //        expLabel.setFontFillColor(cc.color.BLACK);
    //        this._bg.addChild(expLabel);
    //
    //        var okButton = util.createButton("#rewardBTN.png","OK", this,this.okClick);
    //        var menu = new cc.Menu(okButton);
    //        menu.setPosition(bgWidth*0.5, bgHeight*0.35);
    //        this._bg.addChild(menu);
    //    }
    //},
    loadUpgradeUI : function(currentLevel){
        //bg
        //var bg = new cc.Sprite("#rewardBG.png");
        //this._bg = new cc.LayerColor(cc.color(0,0,0,150), ScreenSize.width*0.32, ScreenSize.height*0.7);
        //this._bg.setPosition( ScreenSize.width*(1-0.32)/2, ScreenSize.height*(1-0.7)/2);
        //this.addChild(this._bg, 201);
        //
        //var bgWidth = this._bg.getContentSize().width;
        //var bgHeight = this._bg.getContentSize().height;

        //level
        var levelLayer = ccs.load(res.ccs_level_json).node;
        this.addChild(levelLayer);

        //Choose Reward
        //var upgradeLabel = new cc.LabelTTF("Level up!",  "GUBBLABLO", 0.033333*ScreenSize.width);
        //upgradeLabel.setPosition( bgWidth*0.5, bgHeight*0.73);
        ////upgradeLabel.setColor(cc.color.WHITE);
        ////upgradeLabel.setFontFillColor(cc.color.BLACK);
        //this._bg.addChild(upgradeLabel, 201);


        //var minDamageButton = util.createButton("#rewardBTN.png","Min Damage", this,this.minDamageClick);
        //var maxDamageButton = util.createButton("#rewardBTN.png","Max Damage", this,this.maxDamageClick);
        //var maxHealthButton = util.createButton("#rewardBTN.png","Max Health", this,this.maxHealthClick);
        //var comboDamageButton = util.createButton("#rewardBTN.png","Combo Damage", this,this.comboDamageClick);
        //var fullHealButton = util.createButton("#rewardBTN.png","Full Heal", this,this.fullHealClick);

        var array = [UpgradeButtonType.minDamage,UpgradeButtonType.maxDamage,UpgradeButtonType.maxHealth,UpgradeButtonType.comboDamage];
        var upgradeButtons = util.getRandomElements(array, 3);

        for(var i = 0;i<upgradeButtons.length;i++){
            var nodeId = "level_b"+String(i + 1);
            var button = ccui.helper.seekWidgetByName(levelLayer,nodeId);
            button.tag = upgradeButtons[i];
            //button.addTouchEventListener(this.buttonClick,button);
            //设置button的text
            switch (button.tag){
                case UpgradeButtonType.minDamage:{
                    button.setTitleText(this._dataHandler.getTextByKey("str_mixpower"));
                    button.addTouchEventListener(this.minDamageClick,this);
                }break;
                case UpgradeButtonType.maxDamage:{
                    button.setTitleText(this._dataHandler.getTextByKey("str_maxpower"));
                    button.addTouchEventListener(this.maxDamageClick,this);
                }break;
                case  UpgradeButtonType.maxHealth:{
                    button.setTitleText(this._dataHandler.getTextByKey("str_maxhp"));
                    button.addTouchEventListener(this.maxHealthClick,this);
                }break;
                case  UpgradeButtonType.comboDamage:{
                    button.setTitleText(this._dataHandler.getTextByKey("str_combo"));
                    button.addTouchEventListener(this.comboDamageClick,this);
                }break;
            }
        }

        //var menu = new cc.Menu(upgradeButtons);
        //menu.alignItemsVerticallyWithPadding(bgHeight/25);
        //menu.setPosition(bgWidth*0.5, bgHeight*0.35);
        //this._bg.addChild(menu);
    },
    minDamageClick:function(sender){
        var root_panel = sender.getParent();
        var target = root_panel.getParent().getParent();
        target._hero.upgradeMinAttack();
        target.removeFromParent();
    },
    maxDamageClick:function(sender){
        var root_panel = sender.getParent();
        var target = root_panel.getParent().getParent();
        target._hero.upgradeMaxAttack();
        target.removeFromParent();
    },
    maxHealthClick:function(sender){
        var root_panel = sender.getParent();
        var target = root_panel.getParent().getParent();
        target._hero.upgradeMaxHP();
        target.removeFromParent();
    },
    comboDamageClick:function(sender){
        var root_panel = sender.getParent();
        var target = root_panel.getParent().getParent();
        target._hero.upgradeComboAttack();
        target.removeFromParent();
    },
    //fullHealClick:function(sender){
    //    this._hero.fullHeal();
    //    this.removeFromParent();
    //},
    //okClick:function(sender){
    //    this.removeFromParent();
    //},
    addMapLayer:function(){
        var mapLayer = new MapLayer();
        this.getParent().addChild(mapLayer, 1000);
    },
    update:function(dt){

    },
    removeFromParent:function(){
        if(this._gameSceneController.isNextStageExist()){
            this._target.nextBattle(null);
        }else{
            this.addMapLayer();
            this._dataHandler.saveDataIfNeeded();
        }

        this._super();
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