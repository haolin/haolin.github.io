/**
 * Created by linhao on 15/4/2.
 */


var EnemyBox = BaseBox.extend({
    _enemy : null,
    _speed : 0,

    //记录当前被点击几次
    _numberOfClick : 0,
    //消除需要点击的次数
    _needClicks : 0,

    _boxId : 0,

    //加速方块变速后的速度
    _speed1 : 0,
    _changeSpeedPosition : 0,

    _acceleration : 0,
    _targetSpeed : 0,
    ctor : function(type, size, enemy){

        this._type = type;
        this._size = size;
        this._enemy = enemy;
        this._objectId = ObjectId.EnemyBox;

        var typeStr = null;
        var size = null;

        switch(this._type){
            case EmenyBoxType.Normal:
                this._boxId = -1;
                typeStr = "red";
                break;
            case EmenyBoxType.Shield:
                this._boxId = -1;
                typeStr = "shield1";
                break;
            case EmenyBoxType.Bomb:
                this._boxId = -1;
                typeStr = "bomb";
                break;
            case EmenyBoxType.Speed:
                this._boxId = -1;
                typeStr = "speed1";
                break;
            case EmenyBoxType.Crital:
                this._boxId = 2;
                typeStr = "critical";
                break;
            case EmenyBoxType.Purple:
                this._boxId = 3;
                typeStr = "bossSpawner";
                break;
            case EmenyBoxType.PurpleSlow:
                this._boxId = 4;
                typeStr = "bossShield";
                break;
            case EmenyBoxType.Long:
                this._boxId = 5;
                typeStr = "necroBlip";
                break;
            case EmenyBoxType.Gold1:
                typeStr = "red";
                break;
            case EmenyBoxType.Gold2:
                typeStr = "redM";
                break;
            case EmenyBoxType.Gold3:
                typeStr = "redL";
                break;
            default :
                break;
        }

        if(this._type ===  EmenyBoxType.Normal){
            if(this._size === BoxSize.Small){
                size = "";
            }else if(this._size === BoxSize.Middle){
                size = "M";
            }else{
                size = "L";
            }
        }else{
            size = "";
        }

        var frameName = "#" + typeStr + size + ".png";
        this._super(frameName);
        return true;
    },
    onEnter:function () {
        this._super();

        this.scale = 0.6;
        var ac1 = cc.scaleTo(0.2, 1.12, 1.12);
        var ac2 = cc.scaleTo(0.2, 1.0, 1.0);
        var ac = cc.sequence(ac1, ac2);
        this.runAction(ac);
    },
    onExit:function () {
        this._super();
    },
    loadConfig : function(){

        switch(this._type){
            case EmenyBoxType.Normal:
                this._speed = -this._enemy._stage1Speed;
                this._actionType = ActionType.EnemyAttack;
                this._needClicks = 1;
                break;
            case EmenyBoxType.Shield:
                this._speed = -this._enemy._shieldSpeed;
                this._actionType = ActionType.EnemyAttack;
                this._needClicks = 3;
                break;
            case EmenyBoxType.Bomb:
                this._speed = -this._enemy._bombSpeed;
                this._actionType = ActionType.EnemyAttack;
                this._needClicks = 3;
                break;
            case EmenyBoxType.Speed:
                this._speed = -this._enemy._speedSpeed1;
                this._speed1 = -this._enemy._speedSpeed2;
                this._changeSpeedPosition = ATTACK_HOLDER_MIN_X + (ATTACK_HOLDER_WIDTH * 3/4);
                this._actionType = ActionType.EnemyAttack;
                this._needClicks = 1;
                break;
            case EmenyBoxType.Gold1:
                this._speed = -this._enemy._stage1Speed;
                this._actionType = ActionType.EnemyAttack;
                this._needClicks = 1;
                break;
            case EmenyBoxType.Gold2:
                this._speed = -this._enemy._stage1Speed;
                this._actionType = ActionType.EnemyAttack;
                this._needClicks = 1;
                break;
            case EmenyBoxType.Gold3:
                this._speed = -this._enemy._stage1Speed;
                this._actionType = ActionType.EnemyAttack;
                this._needClicks = 1;
                break;
            case EmenyBoxType.Crital:
                this._actionType = ActionType.EnemyCriticalAttack;

            case EmenyBoxType.Purple:
                this._actionType = ActionType.EnemyAttack;
            case EmenyBoxType.PurpleSlow:
                this._actionType = ActionType.EnemyAttack;
            case EmenyBoxType.Long:
                this._actionType = ActionType.EnemyAttack;
            default :
                var dataHandler = DataHandler.getInstance();
                var boxData = dataHandler.getBoxData(this._boxId);
                this._speed = -util.getValueByPercentage(boxData["speed_1"]);
                this._needClicks = parseInt(boxData["hit_1"]);
                break;
        }

        this._numberOfClick = 0;
        this._acceleration = 0;
        this._targetSpeed = this._speed;
    },
    update:function(dt){

        if(this._type === EmenyBoxType.Speed && this._speed !== this._speed1){
            if(this.getPosition().x <= this._changeSpeedPosition){
                this._speed = this._speed1;
                this._targetSpeed = this._speed;
            }
        }

        var absSpeed = Math.abs(this._speed);
        if (this._speed !== this._targetSpeed){
            absSpeed += (this._acceleration * dt);
            if((this._acceleration > 0 && absSpeed > this._targetSpeed) ||
                this._acceleration < 0 && absSpeed < this._targetSpeed){
                absSpeed = this._targetSpeed;
                this._acceleration = 0;
            }

            this._speed = this._speed > 0 ? absSpeed : -absSpeed;
        }

        var position = cc.pAdd(this.getPosition(), cc.p(this._speed * dt, 0));
        this.setPosition(position);
    },
    /**
     * 判定蓝光标和盒子的碰撞
     * @return {Boolean}  -方块是否需要被移除
     */
    onClick : function(){
        if(this._type === EmenyBoxType.Shield){
            this._numberOfClick++;
            if(this._numberOfClick < 3){
                var number = this._numberOfClick + 1;
                var frameName = "shield" + number + ".png";
                this.setSpriteFrame(frameName);

                return false;
            }else{
                return true;
            }
        }else{
            return true;
        }
    },
    /**
     * combo结束之后进行匀加速
     */
    speedUp : function() {
        this._targetSpeed = this._speed;
        this._speed = 0;
        this._acceleration = (this._targetSpeed/ 0.3);
    }
});