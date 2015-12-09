/**
 * Created by linhao on 15/4/2.
 */


var Enemy = BaseActor.extend({
    _status : ActorStatus.Enter,

    //第几大关
    _level : 0,
    //第几波怪物
    _stage : 0,

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
    ctor : function(level, stage){
        this._level = level;
        this._stage = stage;

        this._super("#moster0025.png");
        return true;
    },
    loadConfig : function(){
        var dataHandler = DataHandler.getInstance();
        this._data = dataHandler.getEnemyData(this._level);

        this._speed = cc.p(-80, 0);
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

        this._currentHP = this._maxHP;
        this._framePrefix = "moster";
    },
    onEnter:function () {

        this._super();
    },
    run : function(){
        this.playAction(2,12,true);
    },
    idle : function(){
        this.playAction(25,28,true);
    },
    attack : function(isCritical, target){
        this.playAction(29,42,false);
        this._super(isCritical, target);
    },
    die : function(target,callback){
        this._status = ActorStatus.Death;
        this.playAction(43,53,false, target,callback);
    },
    beAttacked : function(isCritical, attackNum){
        this._super(isCritical, attackNum);
        var str = attackNum;
        var textLabel = new cc.LabelTTF(str,  "GUBBLABLO", 25);
        textLabel.setColor(cc.color.BLACK);
        textLabel.setPosition(this.getContentSize().width/2, this.getContentSize().height/2);
        this.addChild(textLabel);
        this.beAttackedAction(textLabel);
    },
    update:function(dt){

        var size = cc.winSize;

        switch (this._status){
            case  ActorStatus.Enter :
                var position = cc.pAdd(this.getPosition(), cc.pMult(this._speed, dt));
                if(position.x <= (size.width / 2 + 120)){
                    position.x = (size.width / 2 + 120);
                    this._status = ActorStatus.Battle;
                    this.idle();
                }
                this.setPosition(position);
            case  ActorStatus.Battle :
                break;
            default :
                break;
        }

    }
});