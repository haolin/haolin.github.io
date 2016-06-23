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
    attack : function(attackType, target, damage){

        var attackNum = util.getRandomNumber(this._minAttack, this._maxAttack);
        var isCritical = false;
        switch (attackType){
            case  AttackType.NormalAttack :
                break;
            case  AttackType.CriticalAttack :
                attackNum *= 1.5;
                isCritical = true;
                break;
            case  AttackType.FixDamageAttack:
                attackNum = damage;
                isCritical = false;
                break;
            case  AttackType.InvalidAttack :
            default :
                return;
                break;
        }

        attackNum = Math.floor(attackNum+0.5);
        target.beAttacked(attackNum, isCritical);
    },
    die : function(){

    },
    beAttacked : function(attackNum){
        var currentHP = this._currentHP - attackNum;
        if(currentHP <0 ){
            currentHP = 0;
        }
        this._currentHP = currentHP;
    },
    beAttackedAction : function(text, useAtlas){
        var textLabel;

        if(useAtlas){
            var str = util.parseSringForLabel(text);
            var textLabel = new cc.LabelAtlas(str, res.ShuZi_png, 22, 20, "0");
        }else{
            var textLabel = new cc.LabelTTF(text, "GUBBLABLO", 0.0416667*ScreenSize.width);
            textLabel.setColor(cc.color.BLACK);
        }

        var size = cc.size(0.12536*ScreenSize.width, 0.20242*ScreenSize.height);
        textLabel.setPosition(0, size.height/2);
        this.addChild(textLabel);

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
        textLabel.runAction(ac);
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
            cc.spriteFrameCache.addSpriteFrame();
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
