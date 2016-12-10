/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-10-15
 * Time: 下午9:03
 * Version: 1.0
 * Function: This file use to do...
 */

var Effect_ColorExplode = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function()
    {
        this._colorfulIndex = null;
        this._timeScale = null;
        this._position = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init : function(colorfulIndex, position, timeScale)
    {
        this._colorfulIndex = colorfulIndex;
        this._timeScale = timeScale;
        this._position = position;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    play : function()
    {
        var self = this;

        var batchNode = effectBatchNodeWithBlend();
        var spritesArr = [];

        for (var indx = 0; indx < 3; ++indx)
        {
            var name = "color_explode" + this._colorfulIndex + "" + indx + ".png";

            var a_sprite = cc.Sprite.createWithSpriteFrameName(name);
            spritesArr.push(a_sprite);

            batchNode.addChild(a_sprite);
            a_sprite.setPosition(self._position);
        }

        var a_sprite1 = cc.Sprite.createWithSpriteFrameName("color_explode_back.png");
        spritesArr.push(a_sprite1);

        batchNode.addChild(a_sprite1);
        a_sprite1.setPosition(self._position);

        var scaleActionTime = Defines.FPS * 16;
        if (this._timeScale > 0)
        {
            scaleActionTime *= self._timeScale;
        }

        var scaleValue = 2;

        spritesArr.forEach(
            function(eachSprite)
            {
                eachSprite.setVisible(false);
                eachSprite.setScaleX(0.8);
                eachSprite.setScaleY(0.8);

                eachSprite.runAction(
                    cc.Sequence.create(
                        cc.DelayTime.create(scaleActionTime),
                        cc.FadeOut.create(scaleActionTime)
                    )
                );

                eachSprite.runAction(
                    cc.Sequence.create(
                        cc.DelayTime.create(scaleActionTime),
                        cc.CallFunc.create(
                            function(sender)
                            {
                                sender.setVisible(true);
                            },
                            null),
                        cc.ScaleTo.create(scaleActionTime, scaleValue, scaleValue),
                        cc.CallFunc.create(
                            function(sender)
                            {
                                sender.removeFromParent(true);
                            },
                            null)
                    )
                );
            }
        );
        return this;
    }
});

Effect_ColorExplode.create = function(position, timeScale)
{
    var createNew = new Effect_ColorExplode();
    if (createNew)
    {
        createNew.init(Effect_ColorfulLight.getColorIndex(), position, timeScale);
    }

    return createNew;
};