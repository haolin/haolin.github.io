//
var _ScreenWidth = function()
{
    return cc.Director.getInstance().getWinSize().width;
};

//
var _ScreenHeight = function()
{
    return cc.Director.getInstance().getWinSize().height;
};

//
var _ScreenTopLeft = function()
{
    return cc.p(0, _ScreenHeight());
};

//
var _ScreenTop = function()
{
    return cc.p(_ScreenWidth()/2, _ScreenHeight());
};

//
var _ScreenTopRight = function()
{
    return cc.p(_ScreenWidth(), _ScreenHeight());
};

//
var _ScreenLeft = function()
{
    return cc.p(0, _ScreenHeight()/2);
};

//
var _ScreenCenter = function()
{
    return cc.p(_ScreenWidth()/2, _ScreenHeight()/2);
};

//
var _ScreenRight = function()
{
    return cc.p(_ScreenWidth(), _ScreenHeight()/2);
};

//
var _ScreenBottomLeft = function()
{
    return cc.p(0, 0);
};

//
var _ScreenBottom = function()
{
    return cc.p(_ScreenWidth()/2, 0);
};

//
var _ScreenBottomRight = function()
{
    return cc.p(_ScreenWidth(), 0);
};






