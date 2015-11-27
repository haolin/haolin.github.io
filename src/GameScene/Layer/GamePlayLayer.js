/**
 * Created by linhao on 15/11/7.
 */

/**
 * zOrder
 * 0~99   英雄方块
 * 100~199 敌人方块
 * 200 英雄
 * 201 敌人
 * 300~399 ui
 * 1000 其他UI层，升级，失败等
 */

var GamePlayLayer = cc.Layer.extend({
    hero : null,
    enemy : null,
    slider : null,
    _defSliderSpeed : 0,
    _sliderSpeed : 0,
    _sliderAcceleration : 0,
    _gameSceneController: null,
    _attackBoxController:null,
    _enemyNumber : 0,

    //ui
    heroHPCtl : null,

    ComboCtl : null,

    _damageLabel : null,
    _powerLabel : null,

    enemyHPCtl : null,
    _enemyDamageLabel:null,
    _enemyNumberLabel:null,
    _comboTime : 0,
    ctor:function () {
        this._super();
        // 加载[配置]
        this.loadConfig();
        // 加载资源
        this.loadResource();
        // 加载角色
        this.loadActors();
        // 加载UI
        this.loadUI();
        // 绑定[事件][触摸]
        this.bindTouchListener();

        return true;
    },
    onEnter:function () {
        this._super();

        this._attackBoxController.initBoxs();
    },
    loadConfig : function() {
        this._gameSceneController = GameSceneController.getInstance();
        this._attackBoxController = new AttackBoxController(this);
        this._enemyNumber = 1;
        this._comboTime = 0;

        var dataHandler = DataHandler.getInstance();
        var data = dataHandler.getConfigData();
        var percentageAcceleration = parseFloat(data["blue_speedup1"]);
        this._sliderAcceleration = ATTACK_HOLDER_WIDTH * (percentageAcceleration / 100);
    },
    loadResource : function(){
        cc.spriteFrameCache.addSpriteFrames(res.ActorRun_plist);
        cc.spriteFrameCache.addSpriteFrames(res.Enemy_plist);
        cc.spriteFrameCache.addSpriteFrames(res.tp_slider_plist);
        cc.spriteFrameCache.addSpriteFrames(res.tp_ui_plist);
    },
    loadActors : function(){

        //hero
        this._hero = new Hero();
        this._hero.setPosition(ScreenSize.width / 2 - 100, 120 + 55);
        this._hero.run();
        this.addChild(this._hero, 200);
        this._attackBoxController.setHero(this._hero);

        //enemy
        this.enemy = new Enemy(this._enemyNumber);
        this.enemy.setPosition(ScreenSize.width + 20, 120 + 55);
        this.enemy.idle();
        this.addChild(this.enemy, 201);
        this._defSliderSpeed = this.enemy._sliderSpeed;
        this._sliderSpeed = this._defSliderSpeed;
        this._attackBoxController.loadDataByEnemy(this.enemy);
    },
    loadUI : function(){
        //slider
        this.slider = new cc.Sprite("#movingBarBlue.png");
        this.slider.setPosition(ATTACK_HOLDER_MIN_X, 90);
        this.addChild(this.slider, 300);


        //actor hp
        this.heroHPCtl = new CtlHP(false);
        var hpCtlWidth =this.heroHPCtl.getContentSize().width;
        this.heroHPCtl.setPosition( ScreenSize.width/2 - hpCtlWidth/2 - 10, ScreenSize.height - 47);
        this.heroHPCtl.maxHP = this._hero._maxHP;
        this.heroHPCtl.currentHP = this.heroHPCtl.maxHP;
        this.heroHPCtl.update();
        this.addChild(this.heroHPCtl, 300);

        var heroHPIcon = new cc.Sprite("#heroHealthIcon.png");
        heroHPIcon.maxHP = this._hero._maxHP;
        heroHPIcon.setPosition( ScreenSize.width/2 - hpCtlWidth  - 10, ScreenSize.height - 47);
        this.addChild(heroHPIcon, 300);

        //actor power
        var powerIcon = new cc.Sprite("#powerIcon.png");
        powerIcon.setScale(0.625);
        powerIcon.setPosition( ScreenSize.width/2 - hpCtlWidth/2 - 10 - 25, ScreenSize.height - 17);
        this.addChild(powerIcon, 300);

        this._powerLabel = new cc.LabelTTF("Pwr:5",  "GUBBLABLO", 18);
        this._powerLabel.setPosition( ScreenSize.width/2 - hpCtlWidth/2 - 19, ScreenSize.height - 18);
        this._powerLabel.setAnchorPoint(0, 0.5);
        this._powerLabel.setColor(cc.color.WHITE);
        this._powerLabel.setFontFillColor(cc.color.BLACK);
        this.addChild(this._powerLabel, 300);

        //actor attack
        var damageIcon = new cc.Sprite("#damageIcon.png");
        damageIcon.setPosition( ScreenSize.width/2 - hpCtlWidth - 10 + 14, ScreenSize.height - 78);
        damageIcon.setScaleX(-1);
        this.addChild(damageIcon, 300);

        this._damageLabel = new cc.LabelTTF("2-5",  "GUBBLABLO", 18);
        this._damageLabel.setPosition( ScreenSize.width/2 - hpCtlWidth - 10 + 31, ScreenSize.height - 76);
        this._damageLabel.setAnchorPoint(0, 0.5);
        this._damageLabel.setColor(cc.color.WHITE);
        this._damageLabel.setFontFillColor(cc.color.BLACK);
        this.addChild(this._damageLabel, 300);

        //actor combo
        var comboIcon = new cc.Sprite("#1empty.png");
        comboIcon.setPosition( ScreenSize.width/2 - hpCtlWidth - 10 + 14, ScreenSize.height - 113);
        comboIcon.setScaleX(-1);
        this.addChild(comboIcon, 300);

        //enemy hp
        this.enemyHPCtl = new CtlHP(true);
        this.enemyHPCtl.maxHP = this.enemy._maxHP;
        this.enemyHPCtl.currentHP = this.enemyHPCtl.maxHP;
        this.enemyHPCtl.setPosition( ScreenSize.width/2 + hpCtlWidth/2 + 10,  ScreenSize.height - 47);
        this.enemyHPCtl.update();
        this.addChild(this.enemyHPCtl, 300);

        var enemyHPIcon = new cc.Sprite("#enemyHealthIcon.png");
        enemyHPIcon.setPosition( ScreenSize.width/2 + hpCtlWidth  + 10, ScreenSize.height - 47);
        this.addChild(enemyHPIcon, 300);

        //enemy Number
        this._enemyNumberLabel = new cc.LabelTTF("1",  "GUBBLABLO", 18);
        this._enemyNumberLabel.setPosition( ScreenSize.width/2 + hpCtlWidth/2 + 10, ScreenSize.height - 18);
        this._enemyNumberLabel.setColor(cc.color.WHITE);
        this._enemyNumberLabel.setFontFillColor(cc.color.BLACK);
        this.addChild(this._enemyNumberLabel, 201);

        //enemy attack
        var enemyDamageIcon = new cc.Sprite("#damageIcon.png");
        enemyDamageIcon.setPosition( ScreenSize.width/2 + hpCtlWidth - 10 - 1, ScreenSize.height - 78);
        this.addChild(enemyDamageIcon, 300);

        this._enemyDamageLabel = new cc.LabelTTF("3-7",  "GUBBLABLO", 18);
        this._enemyDamageLabel.setPosition( ScreenSize.width/2 + hpCtlWidth - 10 - 17, ScreenSize.height - 76);
        this._enemyDamageLabel.setAnchorPoint(1, 0.5);
        this._enemyDamageLabel.setColor(cc.color.WHITE);
        this._enemyDamageLabel.setFontFillColor(cc.color.BLACK);
        this.addChild(this._enemyDamageLabel, 300);

        //combo ctl
        this.ComboCtl = new CtlCombo();
        this.ComboCtl.setPosition( ScreenSize.width/2,  30);
        this.addChild(this.ComboCtl, 300);
    },
    update:function(dt){
        this.enemy.update(dt);

        switch (this._gameSceneController.getStatus()){
            case  GameStatus.Move :

                if(this.enemy._status === ActorStatus.Battle){
                    this.enemy._status = ActorStatus.Battle;
                    this._gameSceneController.setStatus(GameStatus.Battle);
                    this._hero.idle();
                    //this.schedule(this.addEnemyBox, this.enemy._stage1Cd);
                }
                break;
            case  GameStatus.Battle :
                this._attackBoxController.update(dt);
                this.updateSlider(dt);
                break;
            case  GameStatus.NextEmeny :
                this._hero.run();
                this.addNextEnemy();
                this._gameSceneController.setStatus(GameStatus.Move);
                break;
            case  GameStatus.Combo :
                this._comboTime -= dt;
                if(this._comboTime <= 0){
                    this._gameSceneController.setStatus(GameStatus.Battle);
                }
                break;
            case  GameStatus.GameOver :
                break;
            default :
                break;
        }

        this.updateUI();

        if (this._hero._currentHP <= 0) {
            this.gameOver();
            this._gameSceneController.setStatus(GameStatus.GameOver);
        }
    },
    addNextEnemy:function(){
        this._enemyNumber += 1;
        this._enemyNumberLabel.setString(this._enemyNumber);
        this._comboTime = 0;

        this.enemy = new Enemy(this._enemyNumber);
        this.enemy.setPosition(ScreenSize.width + 20, 120 + 55);
        this.enemy.idle();
        this.addChild(this.enemy, 201);

        this._defSliderSpeed = this.enemy._sliderSpeed;
        this._sliderSpeed = this._defSliderSpeed;

        this._attackBoxController.loadDataByEnemy(this.enemy);
    },
    updateSlider:function(dt){
        var position = cc.pAdd(this.slider.getPosition(), cc.p(this._sliderSpeed * dt, 0));
        if(position.x >= ATTACK_HOLDER_MAX_X && this._sliderSpeed > 0){
            position.x = ATTACK_HOLDER_MAX_X - (position.x - ATTACK_HOLDER_MAX_X);
            this._sliderSpeed = -this._sliderSpeed;
        }else if(position.x <= ATTACK_HOLDER_MIN_X && this._sliderSpeed < 0){
            position.x = ATTACK_HOLDER_MIN_X + (position.x - ATTACK_HOLDER_MIN_X);
            this._sliderSpeed = -this._sliderSpeed;
        }
        this.slider.setPosition(position);
    },
    updateUI:function(dt){
        var str = this._hero._minAttack + "-" + this._hero._maxAttack;
        this._damageLabel.setString(str);

        this.heroHPCtl.currentHP = this._hero._currentHP;
        this.heroHPCtl.maxHP = this._hero._maxHP;
        this.heroHPCtl.update();

        this.ComboCtl.currentComboCount = this._hero._comboNumber;
        this.ComboCtl.update();

        this._powerLabel.setString("Pwr:" + this._hero._comboAttack);

        var str = this.enemy._minAttack + "-" + this.enemy._maxAttack;
        this._enemyDamageLabel.setString(str);

        this.enemyHPCtl.maxHP = this.enemy._maxHP;
        this.enemyHPCtl.currentHP = this.enemy._currentHP;
        this.enemyHPCtl.update();
    },
    nextBattle:function(sender){
        sender.removeFromParent();
        this.slider.setPosition(cc.p(ATTACK_HOLDER_MIN_X, this.slider.getPosition().y));
        var upgradeLayer = new UpgradeLayer(this._hero);
        this.addChild(upgradeLayer, 1000);
        this._hero.idle();

    },
    gameOver:function(){
        var gameOverLayer = new GameOverLayer();
        this.addChild(gameOverLayer, 1000);
    },
    comboAction:function(){
        var attackNum = this._hero._comboAttack * this._hero._comboNumber;
        this.enemyBeAttack(attackNum);

        if(this._gameSceneController.getStatus() !== GameStatus.Upgrade){
            this._attackBoxController.comboAction();
            this._sliderSpeed = this._defSliderSpeed;
            this.slider.setPosition(cc.p(ATTACK_HOLDER_MIN_X, this.slider.getPosition().y));
            this._gameSceneController.setStatus(GameStatus.Combo);
            this._comboTime = PLAY_COMBO_TIME;
        }

        this._hero._comboNumber = 0;
    },
    enemyBeAttack :function(attackNum){
        this._hero._comboNumber = 0;
        this._sliderSpeed = this._sliderSpeed > 0 ? this._defSliderSpeed : -this._defSliderSpeed ;
        this.enemy._currentHP = this.enemy._currentHP - attackNum;
        if(this.enemy._currentHP <= 0){
            this.enemy.die(this, this.nextBattle);
            this._gameSceneController.setStatus(GameStatus.Upgrade);
            this._attackBoxController.cleanEnemyBoxes();
        }
    },
    heroBeAttack :function(attackNum){
        this._hero._currentHP = this._hero._currentHP - attackNum;
        if(this._hero._currentHP <= 0){
            this.gameOver();
            this._gameSceneController.setStatus(GameStatus.GameOver);
            this._attackBoxController.cleanEnemyBoxes();
        }
        this._hero._comboNumber = 0;
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
        //cc.log("onTouchBegan");
        var target = event.getCurrentTarget();

        if(target._gameSceneController.getStatus() !== GameStatus.Battle){
            return false;
        }

        //检测是否触发Combo
        var touchPosition = touch._point;
        if(touchPosition.y <= COMBO_AREA_MAX_Y && target._hero._comboNumber >= MAX_BOX_COUNT){
            target.comboAction();
            return true;
        }

        var location = target.slider.getPosition().x;
        var actionType =  target._attackBoxController.clickAt(location);

        if(actionType === ActionType.HeroDefence){
            target._hero._comboNumber++;
            target._sliderSpeed += (target._sliderSpeed > 0 ? target._sliderAcceleration : -target._sliderAcceleration);
        }else if(actionType === ActionType.HeroNormalAttack || actionType === ActionType.HeroCriticalAttack ){
            target._hero._comboNumber++;
            target._sliderSpeed += (target._sliderSpeed > 0 ? target._sliderAcceleration : -target._sliderAcceleration);
            var isCritical = actionType === ActionType.HeroCriticalAttack;
            var attackNum = target._hero.attack(isCritical);
            target.enemyBeAttack(attackNum);
        }else{
            var attackNum = target.enemy.attack();
            target.heroBeAttack(attackNum);
        }

        return true;
    },
    // 事件[触摸移动]
    onTouchMoved: function (touch, event) {
        //var target = this.target;
        //cc.log("onTouchMoved");
    },
    // 事件[触摸结束]
    onTouchEnded: function (touch, event) {
        //var target = this.target;
        //cc.log("onTouchEnded");
    }
});