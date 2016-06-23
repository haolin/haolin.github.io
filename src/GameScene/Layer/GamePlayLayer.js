/**
 * Created by linhao on 15/11/7.
 */

/**
 * zOrder
 * 0~99   英雄方块
 * 100~199 敌人方块
 * 200 英雄
 * 201 敌人
 * 300 特效
 * 400~499 ui
 * 1000 其他UI层，升级，失败等
 */

var GamePlayLayer = cc.Layer.extend({
    _battle:null,
    hero : null,
    _enemy : null,

    _gameSceneController:null,
    _attackBoxController:null,
    _dataHandler:null,
    _curLevel : 0,
    _curStage : 0,

    //逻辑判断，是否第一次开始游戏
    _isBegin:false,

    //ui
    heroHPCtl : null,

    ComboCtl : null,

    sliderCtl : null,

    _damageLabel : null,
    _powerLabel : null,

    enemyHPCtl : null,
    _enemyDamageLabel:null,
    _enemyDamageIcon:null,
    _enemyNumberLabel:null,
    _comboTime : 0,
    _coinLabel:null,

    _lvLabel:null,
    _expLabel:null,

    //关卡倒计时，用于宝箱关卡
    _countdown : 0,
    _countdownLabel : null,

    //宝箱关卡惩罚时间
    _sliderLockTime : 0,
    ctor:function (battle) {
        this._super();
        this._battle = battle;
        // 加载[配置]
        this.loadConfig();
        // 加载资源
        this.loadResource();
        //// 加载角色
        //this.loadActors();
        // 加载UI
        this.loadUI();
        // 绑定[事件][触摸]
        this.bindTouchListener();

        return true;
    },
    onEnter:function () {
        this._super();

        //todo scheduler不支持repeat和delay
        //this._attackBoxController.initBoxs();
        //初始的4个英雄方块
        //this.schedule(this.addHeroBox, 0.08, 3, 0);
        //this.updateUI();
        //this.updateEnemyUI();

    },
    addHeroBox : function() {
        this._attackBoxController.addHeroBox(false);
    },
    addHeroHealBox : function() {
        this._attackBoxController.addHeroHealBox(false);
    },
    loadConfig : function() {
        this._gameSceneController = GameSceneController.getInstance();
        this._attackBoxController = new AttackBoxController(this);
        this._dataHandler = DataHandler.getInstance();
        this._comboTime = 0;
        this._sliderLockTime = 0;
        this._countdown = 0;
    },
    loadResource : function(){
    },
    loadActors : function(){

        //hero
        this._hero = new Hero();
        this._hero.setPosition(0.3333*ScreenSize.width, 0.40895*ScreenSize.height);
        this._hero.fullHeal();
        this._hero.run();
        this.addChild(this._hero, 200);
        this._attackBoxController.setHero(this._hero);

        this.addNextEnemy();
    },
    configUI:function(){
        this.sliderCtl.loadConfigByEnemy(this._enemy);
        this.heroHPCtl.maxHP = this._hero._maxHP;
        this.heroHPCtl.currentHP = this.heroHPCtl.maxHP;
        this.enemyHPCtl.maxHP = this._enemy._maxHP;
        this.enemyHPCtl.currentHP = this.enemyHPCtl.maxHP;
    },
    loadUI : function(){
        //slider
        this.sliderCtl = new CtlSlider();
        this.sliderCtl.setPosition(ATTACK_HOLDER_MIN_X, 0.26786*ScreenSize.height);
        this.addChild(this.sliderCtl, 400);
        //this.sliderCtl.loadConfigByEnemy(this._enemy);

        var top_panel = ccui.helper.seekWidgetByName(this._battle,"root_panel");
        //actor hp

        this.heroHPCtl = new CtlHP(top_panel,false);
        //this.heroHPCtl.maxHP = this._hero._maxHP;
        //this.heroHPCtl.currentHP = this.heroHPCtl.maxHP;
        this.heroHPCtl.update();

        var heroHPIcon = ccui.helper.seekWidgetByName(top_panel,"hp1");

        //actor power
        var powerIcon = ccui.helper.seekWidgetByName(top_panel,"power");

        this._powerLabel = ccui.helper.seekWidgetByName(top_panel,"power_atlas");
        this._powerLabel.setString(util.parseSringForLabel(this._powerLabel.getString()));
        //actor attack
        var damageIcon = ccui.helper.seekWidgetByName(top_panel,"attack");

        this._damageLabel = ccui.helper.seekWidgetByName(top_panel,"att_atlas");
        this._damageLabel.setString(util.parseSringForLabel(this._powerLabel.getString()));

        //actor combo
        //var comboIcon = ccui.helper.seekWidgetByName(this._battle,"Image_9_0");
        //var comboIcon = new cc.Sprite("#1empty.png");
        //comboIcon.setPosition( 0.19667*ScreenSize.width, 0.66369*ScreenSize.height);
        //comboIcon.setScaleX(-1);
        //this.addChild(comboIcon, 300);

        //enemy hp

        this.enemyHPCtl = new CtlHP(top_panel,true);
        //this.enemyHPCtl.maxHP = this._enemy._maxHP;
        //this.enemyHPCtl.currentHP = this.enemyHPCtl.maxHP;
        //this.enemyHPCtl.setPosition(  0.67167*ScreenSize.width,  0.86012*ScreenSize.height);
        this.enemyHPCtl.update();
        //this.addChild(this.enemyHPCtl, 300);

        var enemyHPIcon = ccui.helper.seekWidgetByName(top_panel,"hp1_0");
        //var enemyHPIcon = new cc.Sprite("#enemyHealthIcon.png");
        //enemyHPIcon.setPosition( 0.82667*ScreenSize.width, 0.86012*ScreenSize.height);
        //this.addChild(enemyHPIcon, 300);

        //enemy Number
        this._enemyNumberLabel = ccui.helper.seekWidgetByName(top_panel,"att_atlas_0_0");
        this._enemyNumberLabel.setString(util.parseSringForLabel(this._enemyNumberLabel.getString()));
        //this._enemyNumberLabel = new cc.LabelTTF(util.parseSringForLabel("0"),  "GUBBLABLO", 0.03*ScreenSize.width);
        //this._enemyNumberLabel.setPosition( 0.67167*ScreenSize.width, 0.94643*ScreenSize.height);
        //this._enemyNumberLabel.setColor(cc.color.WHITE);
        //this._enemyNumberLabel.setFontFillColor(cc.color.BLACK);
        //this.addChild(this._enemyNumberLabel, 201);


        //enemy attack
        this._enemyDamageIcon = ccui.helper.seekWidgetByName(top_panel,"attack_0");
        //this._enemyDamageIcon = new cc.Sprite("#damageIcon.png");
        //this._enemyDamageIcon.setPosition( 0.79167*ScreenSize.width, 0.76786*ScreenSize.height);
        //this.addChild(this._enemyDamageIcon, 300);

        this._enemyDamageLabel = ccui.helper.seekWidgetByName(top_panel,"att_atlas_0");
        this._enemyDamageLabel.setString(util.parseSringForLabel(this._enemyDamageLabel.getString()));
        //this._enemyDamageLabel = new cc.LabelTTF("3-7",  "GUBBLABLO", 0.03*ScreenSize.width);
        //this._enemyDamageLabel.setPosition( 0.765*ScreenSize.width, 0.77381*ScreenSize.height);
        //this._enemyDamageLabel.setAnchorPoint(1, 0.5);
        //this._enemyDamageLabel.setColor(cc.color.WHITE);
        //this._enemyDamageLabel.setFontFillColor(cc.color.BLACK);
        //this.addChild(this._enemyDamageLabel, 300);

        this._countdownLabel = ccui.helper.seekWidgetByName(top_panel,"att_atlas_0_0_0_0");
        this._countdownLabel.setVisible(false);
        //this._countdownLabel = new cc.LabelTTF(util.parseSringForLabel("0"),  "GUBBLABLO", 0.03*ScreenSize.width);
        //this._countdownLabel.setPosition( 0.765*ScreenSize.width, 0.77381*ScreenSize.height);
        //this._countdownLabel.setAnchorPoint(1, 0.5);
        //this._countdownLabel.setColor(cc.color.WHITE);
        //this._countdownLabel.setFontFillColor(cc.color.BLACK);
        //this._countdownLabel.setVisible(false);
        //this.addChild(this._countdownLabel, 400);

        //combo ctl
        this.ComboCtl = new CtlCombo(this._battle);
        this.ComboCtl.setPosition( 0.5*ScreenSize.width,  0.08929*ScreenSize.height);
        this.addChild(this.ComboCtl, 400);

        //coin
        var coin = new cc.Sprite("#coin.png");
        coin.setPosition( 0.03*ScreenSize.width,  0.94643*ScreenSize.height);
        this.addChild(coin, 400);

        var coinsnum = DataHandler.getInstance().getCoinsNumber();
        this._coinLabel = new cc.LabelTTF(String(coinsnum),  "GUBBLABLO", 0.03*ScreenSize.width);
        this._coinLabel.setPosition( 0.07*ScreenSize.width, 0.94643*ScreenSize.height);
        //this._coinLabel.setColor(cc.color.WHITE);
        this._coinLabel.setAnchorPoint(0, 0.5);
        this._coinLabel.setFontFillColor(cc.color.BLACK);
        this.addChild(this._coinLabel, 400);


        //Lv.
        var lvLabel = new cc.LabelTTF('Lv:',  "Arial", 0.02*ScreenSize.width);
        lvLabel.setPosition( 0.01*ScreenSize.width, 0.88*ScreenSize.height);
        lvLabel.setAnchorPoint(0, 0.5);
        lvLabel.setFontFillColor(cc.color.BLACK);
        this.addChild(lvLabel, 400);

        this._lvLabel = new cc.LabelTTF('1',  "Arial", 0.02*ScreenSize.width);
        this._lvLabel.setPosition( 0.04*ScreenSize.width,  0.88*ScreenSize.height);
        this._lvLabel.setAnchorPoint(0, 0.5);
        this._lvLabel.setFontFillColor(cc.color.BLACK);
        this.addChild(this._lvLabel, 400);


        //Exp.
        var expLabel = new cc.LabelTTF('Exp:',  "Arial", 0.02*ScreenSize.width);
        expLabel.setPosition( 0.01*ScreenSize.width, 0.83*ScreenSize.height);
        expLabel.setAnchorPoint(0, 0.5);
        expLabel.setFontFillColor(cc.color.BLACK);
        this.addChild(expLabel, 400);

        this._expLabel = new cc.LabelTTF("50/100",  "Arial", 0.02*ScreenSize.width);
        this._expLabel.setPosition( 0.06*ScreenSize.width,  0.83*ScreenSize.height);
        this._expLabel.setAnchorPoint(0, 0.5);
        this._expLabel.setFontFillColor(cc.color.BLACK);
        this.addChild(this._expLabel, 400);
    },
    update:function(dt){
        if(this._isBegin === true){
            this._enemy.update(dt);
            this._hero.update(dt);
        }
        switch (this._gameSceneController.getStatus()){
            case  GameStatus.Move:{
                //if(this._isBegin === false ){
                //    this.loadActors();
                //    this.configUI();
                //    this.schedule(this.addHeroBox, 0.08, 3, 0);
                //    this.updateUI();
                //    this.updateEnemyUI();
                //    this._isBegin = true;
                //}else {
                    if(this._enemy._status === ActorStatus.Battle){
                        this._enemy._status = ActorStatus.Battle;
                        this._gameSceneController.setStatus(GameStatus.Battle);
                        this._hero.idle();
                        this.updateUI();
                        //this.schedule(this.addEnemyBox, this._enemy._stage1Cd);
                    }
                //}

            }
                break;
            case  GameStatus.Battle:
                var tempComboNumber = this._hero._comboNumber;
                this._attackBoxController.update(dt);
                //todo
                if(this._hero._comboNumber === 0 && tempComboNumber !== 0){
                    this.sliderCtl.slowDown();
                }

                if(this._sliderLockTime <= 0){
                    this.sliderCtl.update(dt);
                }

                if(this._gameSceneController.getBattleType() === BattleType.Chest){
                    this._countdown -= dt;
                    if(this._countdown <= 0){
                        this._countdown = 0;
                        this.battleComplete();
                    }

                    this._sliderLockTime -= dt;
                    if(this._sliderLockTime <= 0){
                        this._sliderLockTime = 0;
                    }

                    this._countdownLabel.setString(parseInt(this._countdown));
                }
                break;
            case  GameStatus.NextEmeny:
                this._hero.run();
                this.addNextEnemy();
                this.updateEnemyUI();
                this._gameSceneController.setStatus(GameStatus.Move);

                this.updateUI();
                break;
            case  GameStatus.LoadChapter:{
                if(this._isBegin === false ){
                    this.loadActors();
                    this.configUI();
                    this.schedule(this.addHeroBox, 0.08, 3, 0);
                    this.updateUI();
                    this.updateEnemyUI();
                    this._isBegin = true;
                }else {
                    this._hero.run();
                    this._hero.reloadData();
                    this._hero.fullHeal();
                    this.addEnemy();
                    this.updateEnemyUI();
                    this.updateCoinsNumberLabel();
                    //取消每章满血
                    /*
                     if(DataHandler.getInstance().getMaxAvailableLevel() % 5 === 0){
                     this._hero.fullHeal();
                     }
                     */
                    this._gameSceneController.setStatus(GameStatus.Move);
                    this.updateUI();
                }
            }

                break;
            case  GameStatus.Combo:
                this._comboTime -= dt;
                if(this._comboTime <= 0){
                    this._gameSceneController.setStatus(GameStatus.Battle);
                }
                break;
            case  GameStatus.GameOver:
                break;
            case GameStatus.GameStart:
                break;
            default :
                break;
        }

        if(this._isBegin == true){
            //this.updateUI();

            if (this._hero._currentHP <= 0 && this._gameSceneController.getStatus() !== GameStatus.GameOver) {
                this.gameOver();
                this._gameSceneController.setStatus(GameStatus.GameOver);
            }
        }

    },
    addNextEnemy:function(){
        this._gameSceneController.nextStage();
        this.addEnemy();
    },
    addEnemy:function(){
        this._curLevel = this._gameSceneController.getCurrentLevel();
        this._curStage = this._gameSceneController.getCurrentStage();
        this._comboTime = 0;
        this._sliderLockTime = 0;

        if(this._gameSceneController.isChestStage()){
            if(this._enemy !== null){
                this._enemy.removeFromParent();
                this._enemy = null;
            }
            this._enemy = new Chest(this._curLevel, this._gameSceneController.getChestId());
            this._gameSceneController.setBattleType(BattleType.Chest);
            this._attackBoxController.cleanHeroBoxes();
            this.schedule(this.addHeroHealBox, 0.08, 3, 0);
            this._countdown = this._enemy._lifeTime;
            this._countdownLabel.setString(parseInt(Math.ceil(this._countdown)));
        }else{
            var enemyId = this._gameSceneController.getEnemyId();
            if(this._enemy !== null){
                this._enemy.removeFromParent();
                this._enemy = null;
            }
            this._enemy = new Enemy(this._curLevel, this._curStage, enemyId);
            this._gameSceneController.setBattleType(BattleType.Normal);
            if(this._curStage === 0){
                this._attackBoxController.cleanHeroBoxes();
                this.schedule(this.addHeroBox, 0.08, 3, 0);
            }
        }

        this._enemy.setPosition(1.1*ScreenSize.width + this._enemy.getContentSize().width/2, 0.40895*ScreenSize.height);
        this._enemy.idle();
        this.addChild(this._enemy, 201);

        this._attackBoxController.loadDataByEnemy(this._enemy);
    },
    updateEnemyUI :function(){
        if(this._gameSceneController.isChestStage()){
            this.showEnemyAttackUI(false);
        }else{
            this.showEnemyAttackUI(true);
        }

        this._curLevel = this._gameSceneController.getCurrentLevel();
        this._curStage = this._gameSceneController.getCurrentStage();
        var str  = (this._curLevel + 1) + "-" + (this._curStage + 1);
        this._enemyNumberLabel.setString(util.parseSringForLabel(str));
        this.sliderCtl.loadConfigByEnemy(this._enemy);
    },
    updateCoinsNumberLabel :function(){
        var coinsnum = DataHandler.getInstance().getCoinsNumber();
        this._coinLabel.setString(coinsnum);
    },
    updateUI:function(){
        var str = this._hero._minAttack + "-" + this._hero._maxAttack;
        this._damageLabel.setString(util.parseSringForLabel(str));

        this.heroHPCtl.currentHP = this._hero._currentHP;
        this.heroHPCtl.maxHP = this._hero._maxHP;
        this.heroHPCtl.update();

        this.ComboCtl.currentComboCount = this._hero._comboNumber;
        this.ComboCtl._comboPoint = this._dataHandler.getComboPoint();
        this.ComboCtl.update();

        this._powerLabel.setString(this._hero._comboAttack);

        var enemyAttackStr = null;
        var enemyMaxHP = 0;
        var enemyCurrentHP = 0;
        var gameStatus = this._gameSceneController.getStatus();
        if(gameStatus === GameStatus.Move){
            enemyAttackStr = "?-?";
            enemyMaxHP = -1;
            enemyCurrentHP = -1;
        }else{
            enemyAttackStr = this._enemy._minAttack + "-" + this._enemy._maxAttack;
            enemyMaxHP = this._enemy._maxHP;
            enemyCurrentHP = this._enemy._currentHP;
        }

        this._enemyDamageLabel.setString(util.parseSringForLabel(enemyAttackStr));

        this.enemyHPCtl.maxHP = enemyMaxHP;
        this.enemyHPCtl.currentHP = enemyCurrentHP;
        this.enemyHPCtl.update();

        //exp and level
        this._lvLabel.setString(this._dataHandler.getHeroLevel() + 1);
        var expStr = this._dataHandler.getExpNumber() + "/" + this._dataHandler.getCurrentMaxExp();
        this._expLabel.setString(expStr);
    },
    //升级
    showUpgradeUI:function(sender){
        sender.removeFromParent();
        this.sliderCtl.reset();
        var upgradeLayer = new UpgradeLayer(this._hero, this);
        this.addChild(upgradeLayer, 1000);
        this._hero.idle();

    },
    //关卡结束
    showLevelCompleteUI:function(sender){
        sender.removeFromParent();
        this.sliderCtl.reset();
        var levelCompleteLayer = new LevelCompleteLayer(this._hero,this);
        this.addChild(levelCompleteLayer,1000);
        this._hero.idle();
    },
    showEnemyAttackUI:function(visible){
        this._enemyDamageIcon.setVisible(visible);
        this._enemyDamageLabel.setVisible(visible);
        this._countdownLabel.setVisible(!visible);

    },
    nextBattle:function(sender){
        if(sender !== null){
            sender.removeFromParent();
        }

        this.sliderCtl.reset();
        this._hero.run();
        this._gameSceneController.setStatus(GameStatus.NextEmeny);
    },
    gameOver:function(){
        var gameOverLayer = new GameOverLayer();
        this.addChild(gameOverLayer, 1000);
    },
    comboAction:function(){
        var attackNum = 0;

        if(this._gameSceneController.getBattleType() === BattleType.Chest){
            var configData = this._dataHandler.getConfigData();
            var comboGold = parseFloat(configData["combo_gold"]);
            attackNum = this._enemy._maxHP * (this._hero._comboNumber/100) * comboGold;
            attackNum = Math.floor(attackNum);
            this._dataHandler.addCoinsNumber(attackNum);
            this.updateCoinsNumberLabel();
        }else{
            attackNum = this._hero._comboAttack * this._hero._comboNumber;
        }

        this._hero.comboAction();
        this._enemy.beAttacked(attackNum);
        this.enemyBeAttack();

        if(this._gameSceneController.getStatus() !== GameStatus.Upgrade){

            //宝箱关，方块不后退
            if(this._gameSceneController.getBattleType() !== BattleType.Chest){
                this._attackBoxController.comboAction();
            }


            this.sliderCtl.reset();
            this._gameSceneController.setStatus(GameStatus.Combo);
            this._comboTime = this._attackBoxController._enemBoxBackTime;
        }

        this._hero.resetCombo();

        //播放动画效果
        this.playComboAction();
    },
    playComboAction :function(){

        var move1 = cc.moveTo(0.04, ScreenSize.width*0.007, -ScreenSize.width*0.0025);
        var move2 = cc.moveTo(0.04, ScreenSize.width*0.0048, ScreenSize.width*0.0048);
        var move3 = cc.moveTo(0.04, -ScreenSize.width*0.00357, -ScreenSize.width*0.00357);
        var move4 = cc.moveTo(0.04, ScreenSize.width*0.00714, -ScreenSize.width*0.00119);
        var move5 = cc.moveTo(0.04, ScreenSize.width*0.00357, ScreenSize.width*0.00119);
        var move6 = cc.moveTo(0.04, ScreenSize.width*0.00595, -ScreenSize.width*0.00119);
        var move7 = cc.moveTo(0.04, -ScreenSize.width*0.00476, -ScreenSize.width*0.00119);
        var move8 = cc.moveTo(0.04, -ScreenSize.width*0.00238, ScreenSize.width*0.00238);
        var move9 = cc.moveTo(0.04, ScreenSize.width*0, ScreenSize.width*0.00238);
        var move10 = cc.moveTo(0.04, ScreenSize.width*0.00714, ScreenSize.width*0);

        var move11 = cc.moveTo(0.04, -ScreenSize.width*0.0019, ScreenSize.width*0.00476);
        var move12 = cc.moveTo(0.04, ScreenSize.width*0.00714, -ScreenSize.width*0.00238);
        var move13 = cc.moveTo(0.04, -ScreenSize.width*0.00238, -ScreenSize.width*0.00714);
        var move14 = cc.moveTo(0.04, ScreenSize.width*0.00357, ScreenSize.width*0.00119);
        var move15 = cc.moveTo(0.04, -ScreenSize.width*0.00238, -ScreenSize.width*0.00238);
        var move16 = cc.moveTo(0.04, 0, 0);

        move1.easing(cc.easeInOut(3.0));
        move2.easing(cc.easeInOut(3.0));
        move3.easing(cc.easeInOut(3.0));
        move4.easing(cc.easeInOut(3.0));
        move5.easing(cc.easeInOut(3.0));
        move6.easing(cc.easeInOut(3.0));
        move7.easing(cc.easeInOut(3.0));
        move8.easing(cc.easeInOut(3.0));
        move9.easing(cc.easeInOut(3.0));
        move10.easing(cc.easeInOut(3.0));
        move11.easing(cc.easeInOut(3.0));
        move12.easing(cc.easeInOut(3.0));
        move13.easing(cc.easeInOut(3.0));
        move14.easing(cc.easeInOut(3.0));
        move15.easing(cc.easeInOut(3.0));
        move16.easing(cc.easeInOut(3.0));


        var action = cc.sequence(move1, move2, move3, move4, move5, move6, move7, move8, move9, move10,
            move11,move12,move13, move14, move15, move16);

        this.getParent().runAction(action);


        var texiao1 = new sp.SkeletonAnimation(res.sp_combo3_json, res.sp_combo3_atlas);
        texiao1.setPosition(ScreenSize.width*0.5, ScreenSize.height*0.5);
        this.addChild(texiao1, 300);
        texiao1.setAnimation(0, "hit3", false);
        texiao1.setAnimationListener(this, this.removeSelf);

        this._hero.playComboEff();
        this._enemy.playComboEff();

        var bg = new cc.LayerColor(cc.color(0,0,0,150), ScreenSize.width*1.2, ScreenSize.height*1.2);
        bg.setPosition(-ScreenSize.width*0.1, -ScreenSize.height*0.1);
        this.addChild(bg, -1);

        var delay = cc.delayTime(0.64);
        var callBack = cc.callFunc(this.removeSelf, this);
        bg.runAction(cc.sequence(delay, callBack));

    },
    removeSelf:function(sender){
        sender.removeFromParent();
    },
    enemyBeAttack :function(){
        this.sliderCtl.speedUp();

        if(this._enemy._currentHP <= 0){
            this.battleComplete();
        }
    },
    //一次战斗结束
    battleComplete :function(){
        var selector = this.nextBattle;
        var currentLevel = this._gameSceneController.getCurrentLevel();
        var currentChapter = this._gameSceneController.getCurrentChapter();

        if(this._gameSceneController.isNextStageExist()){
            selector = this.nextBattle;
            //selector = this.showLevelCompleteUI;
            if(this._gameSceneController.isChestStage() === false){
                var originalLevel = DataHandler.getInstance().getHeroLevel();
                var enemeyExp = this._dataHandler.getExpRewardByEnemy(currentLevel);
                this._dataHandler.addExpNumber(enemeyExp);
                var heroLevel = DataHandler.getInstance().getHeroLevel();
                if(originalLevel < heroLevel ){
                    selector = this.showUpgradeUI;
                }

                this.updateUI();
            }
        }else{
            selector = this.showLevelCompleteUI;
          //selector = this.showUpgradeUI;
            var nextChapter = currentChapter + 1;
            this._dataHandler.saveAvailableChapter(nextChapter);
            this._gameSceneController.saveComboPoint();
        }

        this.sliderCtl.reset();
        this._gameSceneController.setStatus(GameStatus.Upgrade);
        this._enemy.die(this, selector);
        this._attackBoxController.cleanEnemyBoxes();
    },
    heroBeAttack :function(){
        if(this._hero._currentHP <= 0){
            this.gameOver();
            this._gameSceneController.setStatus(GameStatus.GameOver);
        }
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

        if(target._gameSceneController.getStatus() !== GameStatus.Battle || target._sliderLockTime > 0){
            return true;
        }

        //检测是否触发Combo
        var touchPosition = touch._point;
        if(touchPosition.y <= COMBO_AREA_MAX_Y && target._hero._comboNumber >= MAX_BOX_COUNT){
            target.comboAction();
            target.updateUI();
            return true;
        }

        cc.director.drawScene();

        var location = target.sliderCtl.getPosition().x;
        var resuleArray =  target._attackBoxController.clickAt(location);
        var actionType =  resuleArray[0];
        var data =  resuleArray[1];


        if(actionType === ActionType.HeroDefence){
            target._hero.addComboNumber();
            target._gameSceneController.calculateComboPoint(target._hero._comboNumber);
            target._hero.block();
            target._enemy.attack(AttackType.InvalidAttack, target._hero);
            target.sliderCtl.speedUp();
        }else if(actionType === ActionType.HeroNormalAttack || actionType === ActionType.HeroCriticalAttack ){
            target._hero.addComboNumber();
            target._gameSceneController.calculateComboPoint(target._hero._comboNumber);
            target.sliderCtl.speedUp();
            var attackType = AttackType.NormalAttack;
            if(actionType === ActionType.HeroCriticalAttack){
                attackType = AttackType.CriticalAttack;
            }
            target._hero.attack(attackType, target._enemy);
            target.enemyBeAttack();
        }else if(actionType === ActionType.AddHP){
            target._hero.addComboNumber();
            target._gameSceneController.calculateComboPoint(target._hero._comboNumber);
            target.sliderCtl.speedUp();
            target._hero.attackAction();
            target._enemy.beAttackedAction();
            target._hero.addHP(data);
        }else if(actionType === ActionType.AddCoins){
            target._hero.addComboNumber();
            target._gameSceneController.calculateComboPoint(target._hero._comboNumber);
            target.sliderCtl.speedUp();
            target._hero.attackAction();
            target._enemy.beAttacked(data);
            target.enemyBeAttack();
            target._dataHandler.addCoinsNumber(data);
            target.updateCoinsNumberLabel();
        }else{
            target.sliderCtl.slowDown();
            var attackType = AttackType.NormalAttack;
            var damage = 0;

            if(target._gameSceneController.getBattleType() === BattleType.Chest){
                attackType = AttackType.NormalAttack;
                damage = 0;

                //取消锁住一秒
                //target._sliderLockTime = 1;
                target._countdown--;

                if(target._countdown < 0){
                    target._countdown = 0;
                }
                target._hero.resetCombo();
            }else{
                var result = target._dataHandler.getEmptyClickAttackType();
                attackType = result[0];
                damage = result[1];
            }

            target._enemy.attack(attackType, target._hero, damage);
            target.heroBeAttack();
        }

        target.updateUI();
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