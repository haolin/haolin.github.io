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
    attack : function(isCritical, target){
        var attackNum = util.getRandomNumber(this._minAttack, this._maxAttack);
        if(isCritical){
            attackNum *= 1.5;
        }

        attackNum = Math.floor(attackNum+0.5);

        target.beAttacked(isCritical, attackNum);
    },
    die : function(){

    },
    beAttacked : function(isCritical, attackNum){
        var currentHP = this._currentHP - attackNum;
        if(currentHP <0 ){
            currentHP = 0;
        }
        this._currentHP = currentHP;
    },
    beAttackedAction : function(text){
        var x = this.getContentSize().width * (Math.random() - 0.5);
        var xAction  = cc.moveBy(0.85, x, 0);

        var y1 = this.getContentSize().height/3;
        var y1Action  = cc.moveBy(0.25, 0, y1);
        y1Action.easing(cc.easeOut(2.0));

        var y2 = -this.getContentSize().height;
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
    removeActor:function(sender){
        sender.removeFromParent();
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
