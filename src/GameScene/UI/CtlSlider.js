/**
 * Created by linhao on 15/4/2.
 */


var CtlSlider = cc.Sprite.extend({
    _defSliderSpeed : 0,
    _sliderSpeed : 0,
    _sliderAcceleration : 0,

    //目标速度
    _targetSpeed : 0,
    //加速度
    _acceleration : 0,

    //血条动画是否反方向，用于怪物血条
    reverse: false,
    ctor : function(isReverse){
        this._super("#movingBarBlue.png");
        this.loadConfig();
        this.initialize();
        return true;
    },
    loadConfig : function(){
        var dataHandler = DataHandler.getInstance();
        var data = dataHandler.getConfigData();
        var percentageAcceleration = parseFloat(data["blue_speedup1"]);
        this._sliderAcceleration = ATTACK_HOLDER_WIDTH * (percentageAcceleration / 100);
    },
    initialize : function(){

    },
    reset:function(dt) {
        this._sliderSpeed = this._defSliderSpeed;
        this._targetSpeed = this._sliderSpeed;
        this._acceleration = 0;
        this.setPosition(cc.p(ATTACK_HOLDER_MIN_X, this.getPosition().y));
    },
    loadConfigByEnemy : function(enemy){
        this._defSliderSpeed = enemy._sliderSpeed;
        this._sliderSpeed = this._defSliderSpeed;
        this._targetSpeed = this._defSliderSpeed;
    },
    speedUp : function() {
        var absSpeed = Math.abs(this._sliderSpeed);
        this._targetSpeed = absSpeed + this._sliderAcceleration;
        this._acceleration = (this._sliderAcceleration/ 0.3);
    },
    slowDown : function() {
        var absSpeed = Math.abs(this._sliderSpeed);
        this._targetSpeed = this._defSliderSpeed;
        this._acceleration = ((this._targetSpeed - absSpeed)/ 0.3);
    },
    update:function(dt){
        var absSpeed = Math.abs(this._sliderSpeed);
        if (absSpeed !== this._targetSpeed){
            absSpeed += (this._acceleration * dt);
            if((this._acceleration > 0 && absSpeed > this._targetSpeed) ||
                this._acceleration < 0 && absSpeed < this._targetSpeed){
                absSpeed = this._targetSpeed;
                this._acceleration = 0;
            }

            this._sliderSpeed = this._sliderSpeed > 0 ? absSpeed : -absSpeed;
        }

        var position = cc.pAdd(this.getPosition(), cc.p(this._sliderSpeed * dt, 0));
        if(position.x >= ATTACK_HOLDER_MAX_X && this._sliderSpeed > 0){
            position.x = ATTACK_HOLDER_MAX_X - (position.x - ATTACK_HOLDER_MAX_X);
            this._sliderSpeed = -this._sliderSpeed;
        }else if(position.x <= ATTACK_HOLDER_MIN_X && this._sliderSpeed < 0){
            position.x = ATTACK_HOLDER_MIN_X + (position.x - ATTACK_HOLDER_MIN_X);
            this._sliderSpeed = -this._sliderSpeed;
        }
        this.setPosition(position);
    }
});
