//游戏常量定义
var DefDirection = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(name, off)
    {
        this.name = name;
        this.off = off ? cc.p(off.x, off.y) : cc.p(0, 0);
        this.negative = null;
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
    getOff: function()
    {
        return this.off;
    },

    //------------------------------------------------------------------------------------------------------------------
    setNegative: function(negative)
    {
        this.negative = negative;
        return this.negative;
    },

    //------------------------------------------------------------------------------------------------------------------
    getNegative: function()
    {
        return this.negative;
    }
});

//
DefDirection.create = function(name, off)
{
    return new DefDirection(name, off);
};

//
DefDirection.offMap = null;

//
DefDirection.offToKey = function(off)
{
    return "(" + off.x + "," +  off.y + ")";
};

//
DefDirection.regOffMap = function(direction)
{
    this.offMap = this.offMap || {};
    var key = DefDirection.offToKey(direction.getOff());
    this.offMap[key] = direction;
};

//
DefDirection.getByOff = function(off)
{
    this.offMap = this.offMap || {};
    var key = DefDirection.offToKey(off);
    return this.offMap[key];
};

//======================================================================================================================
//无方向
var DIR_NULL = DefDirection.create("DIR_NULL", cc.p(0, 0));
DefDirection.regOffMap(DIR_NULL);

//方向:上
var DIR_TOP = DefDirection.create("DIR_TOP", cc.p(0, -1));
DefDirection.regOffMap(DIR_TOP);

//方向:下
var DIR_BOTTOM = DefDirection.create("DIR_BOTTOM", cc.p(0, 1));
DefDirection.regOffMap(DIR_BOTTOM);

//方向左
var DIR_LEFT = DefDirection.create("DIR_LEFT", cc.p(-1, 0));
DefDirection.regOffMap(DIR_LEFT);

//方向左
var DIR_RIGHT = DefDirection.create("DIR_RIGHT", cc.p(1, 0));
DefDirection.regOffMap(DIR_RIGHT);

//方向:左上
var DIR_TOP_LEFT = DefDirection.create("DIR_TOP_LEFT", cc.p(-1, -1));
DefDirection.regOffMap(DIR_TOP_LEFT);

//方向:右下
var DIR_BOTTOM_RIGHT = DefDirection.create("DIR_BOTTOM_RIGHT", cc.p(1, 1));
DefDirection.regOffMap(DIR_BOTTOM_RIGHT);

//方向:右上
var DIR_TOP_RIGHT = DefDirection.create("DIR_TOP_RIGHT", cc.p(1, -1));
DefDirection.regOffMap(DIR_TOP_RIGHT);

//方向:左下
var DIR_BOTTOM_LEFT = DefDirection.create("DIR_BOTTOM_LEFT", cc.p(-1, 1));
DefDirection.regOffMap(DIR_BOTTOM_LEFT);

//======================================================================================================================
//设置反方向
DIR_NULL.setNegative(DIR_NULL);

//上->下
DIR_TOP.setNegative(DIR_BOTTOM);
DIR_BOTTOM.setNegative(DIR_TOP);

//左->右
DIR_LEFT.setNegative(DIR_RIGHT);
DIR_RIGHT.setNegative(DIR_LEFT);

//左上->右下
DIR_TOP_LEFT.setNegative(DIR_BOTTOM_RIGHT);
DIR_BOTTOM_RIGHT.setNegative(DIR_TOP_LEFT);

//右上->左下
DIR_TOP_RIGHT.setNegative(DIR_BOTTOM_LEFT);
DIR_BOTTOM_LEFT.setNegative(DIR_TOP_RIGHT);
//======================================================================================================================

//水平方向:水平
var DIR_HORIZE = DefDirection.create("DIR_HORIZE", cc.p(0, 0));

//水平方向:垂直
var DIR_VERT = DefDirection.create("DIR_VERT", cc.p(0, 0));

//分析水平方向
var _GetHVDirection = function(dir)
{
    if (!(dir instanceof DefDirection))
    {
        cc.log("_GetHVDirection = " + dir);
    }

    if (dir == DIR_TOP || dir == DIR_BOTTOM)
    {
        return DIR_VERT;
    }
    else if (dir == DIR_LEFT || dir == DIR_RIGHT)
    {
        return DIR_HORIZE;
    }

    return DIR_NULL;
};

var _RandHVDirection = function()
{
    return Tools.randomEx(100) < 50 ? DIR_HORIZE : DIR_VERT;
};

//
if (!cc.pToAngle)
{
    cc.pToAngle = function (v) {
        return Math.atan2(v.y, v.x);
    };
}

var _ParseCrossDirection = function(beginPos, endPos)
{
    //
    var angle = cc.pToAngle(cc.pSub(endPos, beginPos));
    angle = angle/Math.PI * 180;

    //
    var crossDirection = DIR_LEFT;

    //
    if (angle >= 0 && angle < 45 || angle <= 0 && angle > -45)
    {
        crossDirection  = DIR_RIGHT;
    }
    else if (angle >= 45 && angle <= 135)
    {
        crossDirection  = DIR_TOP;
    }
    else if (angle <= -45 && angle >= -135)
    {
        crossDirection  = DIR_BOTTOM;
    }

    return crossDirection;
};

//======================================================================================================================
var _GetGravity = function()
{
    return DIR_BOTTOM;
};

var _GetGravityLeft = function()
{
    return DIR_BOTTOM_LEFT;
};

var _GetGravityRight = function()
{
    return DIR_BOTTOM_RIGHT;
};




