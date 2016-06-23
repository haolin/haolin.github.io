/**
 * Created by linhao on 15/4/2.
 */

var Enemy = BaseActor.extend({
    _status : ActorStatus.Enter,

    //第几大关
    _level : 0,
    //第几波怪物
    _stage : 0,
    //第几波怪物
    _emenyId : 0,

    //触发战斗的位置
    _battlePositionX : 0,

    _stage1Speed : 0,
    _stage1Cd : 0,

    _stage1BoxNumber : 0,
    _stage1SpecialChance : 0,
    _stage2CdMin : 0,
    _stage2CdMax : 0,
    _stage2SpecialChance : 0,
    _stage2DoubleChance : 0,
    _stage2TripleChance : 0,
    //几种方块速度，盾牌，炸弹，加速方块，boss方块
    _shieldSpeed : 0,
    _bombSpeed : 0,
    _speedSpeed1 : 0,
    _speedSpeed2 : 0,
    _bossSpeed : 0,
    //蓝色光标速度
    _sliderSpeed: 0,

    //技能发动概率
    _skillChance: 0,
    //技能时间间隔,从第二阶段开始计算
    _skillCd: 0,
    _skillArray: null,

    _spineNode: null,
    _particleNode: null,
    _daoeff1: null,
    _daoeff2: null,
    _daoeff3: null,

    //combo特效
    _comboNode: null,

    _attackAnimations : null,

    _beAttackedParticle : null,
    _deathParticle : null,

    //宝箱ID，如果为0不触发宝箱关卡
    _chestId: 0,
    ctor : function(level, stage, emenyId){
        this._level = level;
        this._stage = stage;
        this._emenyId = emenyId;

        //this._super("#moster0025.png");
        this._super(res.Sprite_png);


        var spjson = res.sp_enemy_json;
        var spatlas = res.sp_enemy_atlas;
        this._attackAnimations = ["gj11","gj12"];
        var skin = null;
        if(this._emenyId !== EnemyType.Soldier){

            var bossData = DataHandler.getInstance().getBossData(this._emenyId);
            var spineFile = bossData["boss"];
            spjson = RESOURCE_APINE_PATH + spineFile + ".json";
            spatlas = RESOURCE_APINE_PATH + spineFile + ".atlas";
            this._attackAnimations = [bossData["boss_act"]];
            var skinName = bossData["boos_skin"];
            if(parseInt(skinName) !== DATA_UNDEFINE){
                skin = skinName;
            }
        }


        this._spineNode = new sp.SkeletonAnimation(spjson, spatlas);
        if(skin !== null){
            this._spineNode.setSkin(skin);
        }
        this._particleNode = new sp.SkeletonAnimation(res.sp_tx_shang_json, res.sp_tx_shang_atlas);

        var center = cc.p(0, this._spineNode.getContentSize().height/2);
        this._particleNode.setPosition(center);
        this._daoeff1 = new sp.SkeletonAnimation(res.sp_daoeff1_json, res.sp_daoeff1_atlas);
        this._daoeff1.setPosition(center);
        this._daoeff2 = new sp.SkeletonAnimation(res.sp_daoeff2_json, res.sp_daoeff2_atlas);
        this._daoeff2.setPosition(center);
        this._daoeff3 = new sp.SkeletonAnimation(res.sp_daoeff3_json, res.sp_daoeff3_atlas);
        this._daoeff3.setPosition(center);

        this._comboNode = new sp.SkeletonAnimation(res.sp_combo2_json, res.sp_combo2_atlas);
        this._comboNode.setPosition(center);


        this.reloadSkin();

        this.addChild(this._spineNode);
        this.addChild(this._particleNode);
        this.addChild(this._daoeff1);
        this.addChild(this._daoeff2);
        this.addChild(this._daoeff3);
        this.addChild(this._comboNode);

        this._beAttackedParticle = null;
        this._deathParticle = null;

        return true;
    },
    loadConfig : function(){
        this._dataHandler = DataHandler.getInstance();
        this._data = this._dataHandler.getEnemyData(this._level);

        this._speed = cc.p(-0.13333*ScreenSize.width, 0);
        this._battlePositionX = 0.7*ScreenSize.width;
        this._maxHP = parseInt(this._data["max_hp"]);
        this._minAttack = parseInt(this._data["min_damage"]);
        this._maxAttack = parseInt(this._data["max_damage"]);

        if(this._stage > 0){
            var maxHPAdditional = parseInt(this._data["hp_ulimit"]);
            var minHPAdditional = parseInt(this._data["hp_dlimit"]);
            var maxAttackAdditional = parseInt(this._data["att_ulimit"]);
            var minAttackAdditional = parseInt(this._data["att_dlimit"]);
            var hpAdditional =  util.getRandomNumber(minHPAdditional, maxHPAdditional);
            var attackAdditional =  util.getRandomNumber(minAttackAdditional, maxAttackAdditional);
            this._maxHP += hpAdditional;
            this._maxAttack += attackAdditional;
            this._minAttack += attackAdditional;
        }

        this._stage1Speed = util.getValueByPercentage(this._data["stage1_speed"]);
        this._stage1Cd = parseFloat(this._data["stage1_cd"]);
        this._stage1BoxNumber = parseFloat(this._data["stage1_squares"]);
        this._stage1SpecialChance = parseFloat(this._data["stage1_chance"]);
        this._stage2CdMin = parseFloat(this._data["stage2_cdlow"]);
        this._stage2CdMax = parseFloat(this._data["stage2_cdhight"]);
        this._stage2SpecialChance = parseFloat(this._data["specal_chance2"]);
        this._stage2DoubleChance = parseFloat(this._data["double_chance"]);
        this._stage2TripleChance = parseFloat(this._data["triple_chance"]);

        this._shieldSpeed = util.getValueByPercentage(this._data["s1square_speed"]);
        this._bombSpeed = util.getValueByPercentage(this._data["s2square_speed"]);
        this._speedSpeed1 = util.getValueByPercentage(this._data["s3square_speed"]);
        this._speedSpeed2 = util.getValueByPercentage(this._data["s4square_speed"]);
        this._bossSpeed = util.getValueByPercentage(this._data["s5square_speed"]);
        this._sliderSpeed = util.getValueByPercentage(this._data["blue_speed"]);

        this._skillChance = parseFloat(this._data["square_7"])/100;
        this._skillCd = parseFloat(this._data["squaer_8"]);
        this._skillArray = this._data["skillIDArray"];

        this._chestId = this._data["round_treasure"];

        this._currentHP = this._maxHP;
        this._framePrefix = "moster";
    },
    reloadSkin : function(){
        if(this._emenyId !== EnemyType.Soldier){
            return;
        }
        var skin = this._dataHandler.getEnemySkin();
        for (var key in skin){
            this._spineNode.setAttachment(key, skin[key]);
        }

        if(skin["wuqi_02"] !== "wuqi/kongbai"){
            this._attackAnimations = ["gj21","gj22"];
            if(this._emenyId !== EnemyType.Soldier){
                this._attackAnimations = ["gj2"];
            }
        }
    },
    onEnter:function () {

        this._super();
    },
    run : function(){
        //this.playAction(2,12,true);
        this._spineNode.setAnimation(0, "mofa", true);

    },
    idle : function(){
        //this.playAction(25,28,true);
        this._spineNode.setAnimation(0, "idle", true);

        //this._spineNode.setAnimation(0, "pao", true);
    },
    attack : function(attackType, target, damage){
        //this.playAction(29,42,false);

        //this._spineNode.setMix("pao", "gj1", 0.2);

        //this._spineNode.setAnimation(0, "pao", false);
        //this._spineNode.setAnimation(0, "gj1", false);
        //this._spineNode.addAnimation(0, "walk", false);
        //this._spineNode.addAnimation(0, "gj1", true);

        this._spineNode.setAnimation(0, util.getRandomElement(this._attackAnimations), false);
        this._spineNode.addAnimation(0, "idle", true);
        this._super(attackType, target, damage);
    },
    die : function(target,callback){
        this._status = ActorStatus.Death;
        //this.playAction(43,53,false, target,callback);
        this._spineNode.setAnimation(0, "si", false);
        this._spineNode.setAnimationListener(target, callback);
        this.addDeathParticle();
    },
    beAttacked : function(attackNum, isCritical){
        this._spineNode.setAnimation(0, "shang", false);
        this._spineNode.addAnimation(0, "idle", true);
        this._particleNode.setAnimation(0, "beateff", false);
        this._super( attackNum);
        var str = String(attackNum);
        this.beAttackedAction(str, true);

        if(isCritical){
            this._daoeff2.setAnimation(0, "daoeff", false);
        }else{
            if(util.getRandomBool()){
                this._daoeff1.setAnimation(0, "daoeff", false);
            }else{
                this._daoeff3.setAnimation(0, "daoeff", false);
            }
        }

        this.addParticle();

    },
    playComboEff : function(){
        this._comboNode.setAnimation(0, "hit2", false);
    },
    /*
    beAttackedAction : function(text){
        var size = cc.size(0.25*ScreenSize.width, 0.4*ScreenSize.height);

        var x = size.width * (Math.random() - 0.5);
        var xAction  = cc.moveBy(0.85, x, 0);

        var y1 = size.height/3;
        var y1Action  = cc.moveBy(0.25, 0, y1);
        y1Action.easing(cc.easeOut(2.0));

        var y2 = -size.height;
        var y2Action  = cc.moveBy(0.6, 0, y2);
        y2Action.easing(cc.easeIn(2.0));
        var fadeOut = cc.fadeOut(0.6);
        var y2Action  = cc.spawn(y2Action, fadeOut);

        var yAction = cc.sequence(y1Action, y2Action);

        var ac = cc.spawn(xAction, yAction);

        var callBack = cc.callFunc(this.removeActor, text);
        ac = cc.sequence(ac, callBack);
        text.runAction(ac);
    },
    */
    update:function(dt){
        switch (this._status){
            case  ActorStatus.Enter :
                var position = cc.pAdd(this.getPosition(), cc.pMult(this._speed, dt));
                if(position.x <= this._battlePositionX){
                    position.x = this._battlePositionX;
                    this._status = ActorStatus.Battle;
                    this.idle();
                }
                this.setPosition(position);
            case  ActorStatus.Battle :
                break;
            default :
                break;
        }

    },
    addParticle : function(){
        this.removeParticle();
        this._beAttackedParticle = new cc.ParticleSystem(res.pt_be_attacked_plist);
        this._beAttackedParticle.setPosition(0, this._spineNode.getContentSize().height*0.5);
        this.addChild(this._beAttackedParticle, 5);
    },
    removeParticle : function(){
        if(this._beAttackedParticle !== null) {
            this._beAttackedParticle.removeFromParent();
            this._beAttackedParticle = null;
        }
    },
    addDeathParticle : function(){
        this.removeDeathParticle();
        this._deathParticle = new cc.ParticleSystem(res.pt_die_plist);
        this._deathParticle.setPosition(0, this._spineNode.getContentSize().height*0.5);
        this.addChild(this._deathParticle, 5);
    },
    removeDeathParticle : function(){
        if(this._deathParticle !== null) {
            this._deathParticle.removeFromParent();
            this._deathParticle = null;
        }
    },
    removeFromParent : function(){
        //this._comboNode.removeFromParent();
        this._super();
    }
});