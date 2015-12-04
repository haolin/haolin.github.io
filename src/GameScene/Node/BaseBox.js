/**
 * Created by linhao on 15/4/2.
 */


var BaseBox = BaseObject.extend({
    //区分具体方块种类，盾牌，炸弹等
    _type : 0,
    _size : 0,
    //方块对应的动作类型
    _actionType : 0,
    ctor : function(frameName){
        this._super(frameName);
        this.loadConfig();
        return true;
    },
    loadConfig : function(){
    },
    onClick : function(){
    },
    removeFromParent:function(){
        this.stopAllActions();
        this.scaleX = 9/this.getContentSize().width;
        this.scaleY = 1.5;
        var ac1 = cc.scaleTo(0.15, 0, 2);
        var ac2 = cc.callFunc(this._super, this);
        var ac = cc.sequence(ac1, ac2);
        this.runAction(ac);
    }
});