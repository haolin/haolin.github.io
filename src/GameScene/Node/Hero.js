/**
 * Created by linhao on 15/4/2.
 */


var Hero = BaseActor.extend({
    _spineNode: null,
    _particleNode: null,
    _daoeff1: null,
    _daoeff3: null,

    //combo特效
    _comboNode: null,

    _comboAttack : 0,
    //当前连击数
    _comboNumber : 0,
    _configData : null,
    _dataHandler : null,

    _attackAnimation : null,
    _comboAnimation : null,

    _beAttackedParticle : null,
    _weaponParticle : null,

    _weaponBone : null,

    ctor : function(){
        //this._super("#juese_0015.png");
        this._super(res.Sprite_png);

        this._spineNode = new sp.SkeletonAnimation(res.sp_hero_json, res.sp_hero_atlas);

        this._particleNode = new sp.SkeletonAnimation(res.sp_tx_shang_json, res.sp_tx_shang_atlas);
        var center = cc.p(0, this._spineNode.getContentSize().height/2);
        this._particleNode.setPosition(center);
        this._daoeff1 = new sp.SkeletonAnimation(res.sp_daoeff1_json, res.sp_daoeff1_atlas);
        this._daoeff1.setPosition(center);
        this._daoeff3 = new sp.SkeletonAnimation(res.sp_daoeff3_json, res.sp_daoeff3_atlas);
        this._daoeff3.setPosition(center);

        this._comboNode = new sp.SkeletonAnimation(res.sp_combo1_json, res.sp_combo1_atlas);
        this._comboNode.setPosition(center);


        this.reloadData();

        this.addChild(this._spineNode);
        this.addChild(this._particleNode);
        this.addChild(this._daoeff1);
        this.addChild(this._daoeff3);
        this.addChild(this._comboNode);

        return true;
    },
    onEnter:function () {
        this._super();
    },
    loadConfig : function(){
        this._dataHandler = DataHandler.getInstance();
        this._data = this._dataHandler.getHeroData();
        this._configData = this._dataHandler.getConfigData();

        this._speed = cc.p(-80, 0);
        this._comboNumber = 0;

        this._attackAnimation = "gj1";
        this._comboAnimation = "bs1";

        this._framePrefix = "juese_";
    },
    reloadSkin : function(){
        var skin = this._dataHandler.getHeroSkin();
        for (var key in skin){
            this._spineNode.setAttachment(key, skin[key]);
        }


        if(skin["wuqi_01"] !== "wuqi/kongbai") {
            this._attackAnimation = "gj1";
            this._comboAnimation = "bs1";
            this._weaponBone = "qiang";

        }else if(skin["wuqi_02"] !== "wuqi/kongbai"){
            this._attackAnimation = "gj2";
            this._comboAnimation = "bs2";
            this._weaponBone = "dao";
        }else if(skin["wuqi_03"] !== "wuqi/kongbai"){
            this._attackAnimation = "gj2";
            this._comboAnimation = "bs2";
            this._weaponBone = "jian";
        }
    },
    reloadData: function () {
        this._currentHP = this._dataHandler.getCurrentHP();
        this._maxHP = this._dataHandler.getMaxHP();
        this._minAttack = this._dataHandler.getMinAttack();
        this._maxAttack = this._dataHandler.getMaxAttack();
        this._comboAttack = this._dataHandler.getComboAttack();
        this.reloadSkin();
    },
    run : function(){
        this._spineNode.setAnimation(0, "pao", true);
    },
    comboAction : function(){
        this._spineNode.setAnimation(0, this._comboAnimation, false);
        this._spineNode.addAnimation(0, "idle", true);
    },
    playComboEff : function(){
        this._comboNode.setAnimation(0, "hit1", false);
    },
    idle : function(){
        this._spineNode.setAnimation(0, "idle", true);
    },
    attack : function(attackType, target){
        this.attackAction();
        this._super(attackType, target, 0);
    },
    attackAction : function(){
        this._spineNode.setAnimation(0, this._attackAnimation, false);
        this._spineNode.addAnimation(0, "idle", true);
    },
    die : function(target,callback) {
        this._spineNode.setAnimation(0, "si", false);
        this._spineNode.setAnimationListener(target, callback);
    },
    beAttacked : function(attackNum, isCritical){
        this._super(attackNum);
        this.resetCombo();
        var str = "-" + attackNum;
        this.beAttackedAction(str, true);
        this._dataHandler.setCurrentHP(this._currentHP);
        this._spineNode.setAnimation(0, "shang", false);
        this._spineNode.addAnimation(0, "idle", false);
        this._particleNode.setAnimation(0, "beateff", false);

        if(util.getRandomBool()){
            this._daoeff1.setAnimation(0, "daoeff", false);
        }else{
            this._daoeff3.setAnimation(0, "daoeff", false);
        }

        this.addParticle();
    },
    block : function(){
        this._spineNode.setAnimation(0, "def1", false);
        this._spineNode.addAnimation(0, "idle", true);
        this.beAttackedAction("BLOCK!", false);
    },
    upgradeMaxHP : function(){
        this._dataHandler.upgradeMaxHP();
        var originalMaxHP = this._maxHP;
        this._maxHP = this._dataHandler.getMaxHP();
        var deltaMaxHP = this._maxHP - originalMaxHP;
        this._currentHP = this._currentHP + deltaMaxHP;
        this.reloadSkin();
    },
    upgradeMinAttack : function(){
        this._dataHandler.upgradeMinAttack();
        this._minAttack = this._dataHandler.getMinAttack();
        this._maxAttack = this._dataHandler.getMaxAttack();
        this.reloadSkin();
    },
    upgradeMaxAttack : function(){
        this._dataHandler.upgradeMaxAttack();
        this._maxAttack = this._dataHandler.getMaxAttack();
        this.reloadSkin();
    },
    upgradeComboAttack : function(){
        this._dataHandler.upgradeComboAttack();
        this._comboAttack = this._dataHandler.getComboAttack();
        this.reloadSkin();
    },
    fullHeal : function(){
        this._currentHP = this._maxHP;
        this._dataHandler.setCurrentHP(this._currentHP);
    },
    addHP : function(num){
        this._dataHandler.addCurrentHP(num);
        this._currentHP = this._dataHandler.getCurrentHP();
    },
    resetCombo : function(num) {
        this._comboNumber = 0;
        this.removeWeaponParticle();
    },
    addParticle : function(){
        this.removeParticle();
        this._beAttackedParticle = new cc.ParticleSystem(res.pt_be_attacked_plist);
        this._beAttackedParticle.setScaleX(-1);
        this._beAttackedParticle.setPosition(0, this._spineNode.getContentSize().height*0.5);
        this.addChild(this._beAttackedParticle, 5);
    },
    removeParticle : function(){
        if(this._beAttackedParticle !== null) {
            this._beAttackedParticle.removeFromParent();
            this._beAttackedParticle = null;
        }
    },
    addComboNumber : function(){
        this._comboNumber++;
        this.addWeaponParticle();
    },
    addWeaponParticle : function(){
        var file = DataHandler.getInstance().getComboParticleFile(this._comboNumber,"weapon_lz");
        if(file !== null){
            this.removeWeaponParticle();
            this._weaponParticle = new cc.ParticleSystem(file);
            var bone = this._spineNode.findBone(this._weaponBone);
            this._weaponParticle.setPosition(bone.worldX, bone.worldY);
            this.addChild(this._weaponParticle, 2);
        }

    },
    removeWeaponParticle : function(){
        if(this._weaponParticle !== null){
            this._weaponParticle.stopSystem();
            this._weaponParticle.removeFromParent();
            this._weaponParticle = null;
        }
    },
    update : function(dt){
        if(this._weaponParticle !== null){
            var bone = this._spineNode.findBone(this._weaponBone);
            this._weaponParticle.setPosition(bone.worldX, bone.worldY);
        }

    }
});