/**
 * Created by linhao on 15/4/2.
 */


var BaseActor = BaseObject.extend({
    _speed : 0,
    _maxHP : 0,

    _minAttack : 0,
    _maxAttack : 0,

    _currentHP : 0,

    _framePrefix : null,

    _data : null,

    ctor : function(aTexture){
        this._super(aTexture);
        this.loadConfig();
        return true;
    },
    onEnter:function () {
        this._super();
    },
    loadConfig : function(){
    },
    run : function(){
    },
    idle : function(){
    },
    attack : function(isCritical){
        var attackNum = util.getRandomNumber(this._minAttack, this._maxAttack);
        if(isCritical){
            attackNum *= 2;
        }
        return attackNum;
    },
    die : function(){

    },
    playAction : function(startIdx, endIdx, isRepeat,target,callback){
        this.stopAllActions();

        var animFrames = [];
        for (var i = startIdx; i <= endIdx; i++) {
            var str = this._framePrefix + util.formatStr(4, i) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);

        }
        var animation = new cc.Animation(animFrames, 0.1);
        var action = new cc.Animate(animation);
        if(isRepeat){
            action = new cc.RepeatForever(action);
        }else if(target !== null && callback !== null){
            var callBack = cc.callFunc(callback, target);
            action = new cc.sequence(action, callBack);
        }

        this.runAction(action);
    }
});
