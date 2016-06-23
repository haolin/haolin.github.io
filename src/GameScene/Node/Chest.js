/**
 * Created by linhao on 15/4/2.
 */

var Chest = BaseActor.extend({
    _status : ActorStatus.Enter,

    //宝箱Id
    _chestId : 0,
    //第几大关
    _level : 0,

    //存在时间
    _lifeTime : 0,

    //combo特效
    _comboNode: null,

    //触发战斗的位置
    _battlePositionX : 0,

    _healBox1Change : 0,
    _healBox2Change : 0,
    _goldBox1Change : 0,
    _goldBox2Change : 0,

    _goldBox1MinGold : 0,
    _goldBox1MaxGold : 0,
    _goldBox2MinGold : 0,
    _goldBox2MaxGold : 0,

    _healBox1Speed : 0,
    _healBox2Speed : 0,

    //固定方块恢复血量
    _healBox1RecoverHp : 0,
    //百分比方块恢复血量
    _healBox2RecoverHp : 0,

    //蓝色光标速度
    _sliderSpeed: 0,
    _stage1Cd:0,
    _stage2CdMin:0,
    _stage2CdMax:0,

    _spineNode: null,
    ctor : function(level, chestId){
        this._chestId = chestId;
        this._level = level;

        var dataHandler = DataHandler.getInstance();
        this._data = dataHandler.getChestData(this._chestId);
        var pic = this._data["treasure_pic"];
        var skin = "baoxiang_01";
        if(pic === 2){
            skin = "baoxiang_02";
        }

        this._super(res.Sprite_png);
        this.setAnchorPoint(0.5, 0);

        this._spineNode = new sp.SkeletonAnimation(res.sp_chest_json, res.sp_chest_atlas);
        this._spineNode.setSkin(skin);
        this.addChild(this._spineNode);

        var center = cc.p(0, this._spineNode.getContentSize().height/2);
        this._comboNode = new sp.SkeletonAnimation(res.sp_combo2_json, res.sp_combo2_atlas);
        this._comboNode.setPosition(center);
        this.addChild(this._comboNode);

        return true;
    },
    loadConfig : function(){

        this._lifeTime = parseInt(this._data["treasure_time"]);
        this._maxHP = parseInt(this._data["maxgold"]);
        var s1 = this._data["square1_gold"].split(",");
        this._goldBox1MinGold = parseInt(s1[0]);
        this._goldBox1MaxGold = parseInt(s1[1]);
        var s2 = this._data["square2_gold"].split(",");
        this._goldBox2MinGold = parseInt(s2[0]);
        this._goldBox2MaxGold = parseInt(s2[1]);

        this._healBox2Change = parseFloat(this._data["stage2_probability"]);
        this._healBox1Change = 1 - this._healBox2Change;

        this._goldBox2Change = parseFloat(this._data["square2_probability"]);
        this._goldBox1Change = 1 - this._goldBox2Change;

        this._healBox1RecoverHp = parseInt(this._data["hp1"]);

        var maxHP = DataHandler.getInstance().getMaxHP();
        var recoverHp2 = parseFloat(this._data["hp2"]) * maxHP;
        this._healBox2RecoverHp = Math.floor(recoverHp2);

        this._healBox1Speed = util.getValueByPercentage(this._data["stage_speed"]);
        this._healBox2Speed = util.getValueByPercentage(this._data["stage2_speed"]);

        this._stage1Cd =  parseFloat(this._data["stage_cd"]);
        this._stage2CdMin = this._stage1Cd;
        this._stage2CdMax = this._stage1Cd;

        this._speed = cc.p(-0.13333*ScreenSize.width, 0);
        this._battlePositionX = 0.7*ScreenSize.width;

        //从关卡配置取方块和蓝光标数据
        var dataHandler = DataHandler.getInstance();
        var levelData = dataHandler.getEnemyData(this._level);

        this._sliderSpeed = util.getValueByPercentage(levelData["blue_speed"]);

        this._currentHP = this._maxHP;
    },
    onEnter:function () {
        this._super();
    },
    run : function(){
        this._spineNode.setAnimation(0, "shake", true);
    },
    idle : function(){
        this._spineNode.setAnimation(0, "shake", true);
    },
    attack : function(attackType, target){

    },
    die : function(target,callback){
        callback.call(target, this);
    },
    playComboEff : function(){
        this._comboNode.setAnimation(0, "hit2", false);
    },
    beAttackedAction : function(attackNum) {
        this._spineNode.setAnimation(0, "open", false);
        this._spineNode.addAnimation(0, "shake", true);
    },
    beAttacked : function(attackNum){
        this.beAttackedAction();

        var currentHP = this._currentHP - attackNum;
        if(currentHP <0 ){
            currentHP = 0;
        }
        this._currentHP = currentHP;
    },
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
                break;
            case  ActorStatus.Battle :
                break;
            default :
                break;
        }

    }
});