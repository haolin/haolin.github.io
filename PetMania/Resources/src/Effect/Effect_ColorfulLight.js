/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-10-15
 * Time: 下午5:06
 * Version: 1.0
 * Function: This file use to do...
 */

var Effect_ColorfulLight = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function()
    {
        this._colorfulIndex = null;
        this._srcPos = null;
        this._dstPos = null;
        this._callBack = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init : function(colorfulIndex, srcPos, dstPos, callBackFunc)
    {
        this._colorfulIndex = colorfulIndex;
        this._srcPos = srcPos;
        this._dstPos = dstPos;
        this._callBack = callBackFunc;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    play : function()
    {
        var self = this;

        var sp = cc.Sprite.createWithSpriteFrameName("color_explode_line" + this._colorfulIndex + ".png");
        var batchNode = effectBatchNodeWithBlend();

        //
        batchNode.addChild(sp);
        sp.setPosition(this._srcPos);

        var distance = Math.sqrt(
            Math.pow((this._dstPos.x - this._srcPos.x), 2) + Math.pow((this._dstPos.y - this._srcPos.y), 2)

        );

        var angle = Math.atan((this._dstPos.y - this._srcPos.y) / (this._dstPos.x - this._srcPos.x)) / 3.14 * 180;

        sp.setAnchorPoint(
            (this._dstPos.x < this._srcPos.x) ? cc.p(1, 0.5) :cc.p(0, 0.5)
        );

        //
        var scaleValue = distance / sp.getContentSize().width;
        sp.setScaleX(scaleValue);
        sp.setScaleY(1);
        sp.setRotation(-angle);

        var scaleTime = Defines.FPS * 35;

        sp.runAction(
            cc.Sequence.create(
                cc.ScaleTo.create(scaleTime, scaleValue, 0.1),
                cc.CallFunc.create(
                    function(sender)
                    {
                        sender.removeFromParent(true);
                    },
                    null)
            )
        );

        //
        var delayTime = Defines.FPS * 2;
        sp.runAction(
            cc.Sequence.create(
                cc.DelayTime.create(delayTime),
                cc.CallFunc.create(
                    function(/*sender*/)
                    {
                        if (self._callBack)
                        {
                            self._callBack();
                        }
                    },
                    null)
            )
        );

        return this;
    }
});

Effect_ColorfulLight.colorfulIndex = 1;
Effect_ColorfulLight.getColorIndex = function()
{
    return this.colorfulIndex;
};

Effect_ColorfulLight.nextColorIndex = function()
{
    this.colorfulIndex = (this.colorfulIndex++)%5 + 1;
    return this.colorfulIndex;
};

Effect_ColorfulLight.create = function(srcPos, dstPos, callBackFunc)
{
    var createNew = new Effect_ColorfulLight();
    if (createNew)
    {
        createNew.init(Effect_ColorfulLight.nextColorIndex(), srcPos, dstPos, callBackFunc);
    }

    return createNew;
};