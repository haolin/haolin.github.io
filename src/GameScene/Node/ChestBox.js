/**
 * Created by linhao on 15/4/2.
 */


var ChestBox = BaseBox.extend({
    _chest : null,
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

    //治疗血量
    _recoverHp : 0,
    ctor : function(type, size, chest){

        this._type = type;
        this._size = size;
        this._chest = chest;
        this._objectId = ObjectId.ChestBox;

        var typeStr = null;

        switch(this._type){
            case EmenyBoxType.Heal1:
                typeStr = "redLHP1";
                break;
            case EmenyBoxType.Heal2:
                typeStr = "redLHP2";
                break;
            default :
                break;
        }

        var frameName = "#" + typeStr  + ".png";
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
            case EmenyBoxType.Heal1:
                this._speed = -this._chest._healBox1Speed;
                this._actionType = ActionType.AddHP;
                this._needClicks = 1;
                this._recoverHp = this._chest._healBox1RecoverHp;
                break;
            case EmenyBoxType.Heal2:
                this._speed = -this._chest._healBox2Speed;
                this._actionType = ActionType.AddHP;
                this._needClicks = 1;
                this._recoverHp = this._chest._healBox2RecoverHp;
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