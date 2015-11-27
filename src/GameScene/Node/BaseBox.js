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
    }
});