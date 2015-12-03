/**
 * Created by linhao on 15/4/2.
 */


var EnemyBox = BaseBox.extend({
    _enemy : null,
    _speed : 0,

    _numberOfClick : 0,

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
                typeStr = "red";
                break;
            case EmenyBoxType.Shield:
                typeStr = "shield1";
                break;
            case EmenyBoxType.Bomb:
                typeStr = "bomb";
                break;
            case EmenyBoxType.Speed:
                typeStr = "speed1";
                break;
            case EmenyBoxType.Boss:
                typeStr = "bossShield";
                break;
            default :
                break;
        }

        if(this._type ===  EmenyBoxType.Normal){
            if(this._size === BoxSize.Small){
                size = "S";
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
        var dataHandler = DataHandler.getInstance();
        this._data = dataHandler.getEnemyData(this._lv);

        switch(this._type){
            case EmenyBoxType.Normal:
                this._speed = -this._enemy._stage1Speed;
                this._actionType = ActionType.EnemyAttack;
                break;
            case EmenyBoxType.Shield:
                this._speed = -this._enemy._shieldSpeed;
                this._actionType = ActionType.EnemyAttack;
                break;
            case EmenyBoxType.Bomb:
                this._speed = -this._enemy._bombSpeed;
                this._actionType = ActionType.EnemyAttack;
                break;
            case EmenyBoxType.Speed:
                this._speed = -this._enemy._speedSpeed1;
                this._speed1 = -this._enemy._speedSpeed2;
                this._changeSpeedPosition = ATTACK_HOLDER_MIN_X + (ATTACK_HOLDER_WIDTH * 3/4);
                this._actionType = ActionType.EnemyAttack;
                break;
            case EmenyBoxType.Boss:
                this._speed = -this._enemy._bossSpeed;
                this._actionType = ActionType.EnemyCriticalAttack;
                break;
            default :
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