//游戏常量定义
var DefColor = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(name, code)
    {
        this.name = name;
        this.code = code;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return this.getName();
    },

    //------------------------------------------------------------------------------------------------------------------
    getName: function()
    {
        return this.name;
    },

    //------------------------------------------------------------------------------------------------------------------
    getCode: function()
    {
        return this.code;
    }
});

//
DefColor.create = function(name, code)
{
    return new DefColor(name, code);
};


//======================================================================================================================
//全局的颜色常量
var COLOR_NULL = DefColor.create("null", 0);
var COLOR_PINK = DefColor.create("Pink", 10);
var COLOR_GREEN = DefColor.create("Green", 20);
var COLOR_BLUE = DefColor.create("Blue", 30);
var COLOR_ORANGE = DefColor.create("Orange", 40);
var COLOR_PURPLE = DefColor.create("Purple", 50);
var COLOR_YELLOW = DefColor.create("Yellow", 60);
var COLOR_COLORFUL = DefColor.create("Colorful", 70);
//======================================================================================================================
var _GetColorsArray = function()
{
//    var curLevelData = cc.DataMng.getInstance().getCurLevelData();
//    if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_MINELOTTERY){
        return [COLOR_PINK, COLOR_GREEN, COLOR_BLUE, COLOR_ORANGE, COLOR_PURPLE, COLOR_YELLOW];
//    }
//    else{
//        return [COLOR_PINK, COLOR_GREEN, COLOR_BLUE, COLOR_ORANGE, COLOR_PURPLE];
//    }
};

var _RandColor = function()
{
    return Tools.arrayRandom(_GetColorsArray());
};
//======================================================================================================================



