/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-10-16
 * Time: 上午10:35
 * Version: 1.0
 * Function: This file use to do...
 */

var Effect_Line = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function()
    {
        this._position = null;
        this._hvDirection = Defines.DIRECTION.NULL;
        this._scaleTime = 1;
        this._centerPosition = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init : function(position, hvDirection, scaleTime, centerPosition)
    {
        this._position = position;
        this._hvDirection = hvDirection;
        this._scaleTime = scaleTime;
        this._centerPosition = centerPosition;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    play : function()
    {
        var self = this;

        var aniScaleTime = this._scaleTime ? this._scaleTime : 1;

        var needRot =  this._hvDirection == Defines.DIRECTION.HORIZONTAL;
        var xCenterPos = _ScreenWidth()/2 + Defines.TABLE_GRID_SIZE;
        var yCenterPos = _ScreenHeight()/2;

        xCenterPos = this._centerPosition.x;
        yCenterPos = this._centerPosition.y;

        var batchNode = effectBatchNodeWithBlend();

        var sprite0 = cc.Sprite.createWithSpriteFrameName("line0.png");
        var sprite1 = cc.Sprite.createWithSpriteFrameName("line1.png");

        batchNode.addChild(sprite0);
        batchNode.addChild(sprite1);

        sprite0.setPosition(cc.p(this._position.x, this._position.y));
        sprite1.setPosition(cc.p(this._position.x, this._position.y));

        if (needRot)
        {
            sprite0.setRotation(-90);
            sprite1.setRotation(-90);
        }

        var scaleActionTime = Defines.FPS * 12 * aniScaleTime;
        var initScale = 0.1;
        var toScale = 0.5;
        var explodeTime = Defines.FPS * 5 * aniScaleTime;

        sprite0.setScaleX(initScale);
        sprite0.setScaleY(initScale);

        sprite1.setScaleX(initScale);
        sprite1.setScaleY(initScale);

        sprite0.runAction(
            cc.Sequence.create(
                cc.ScaleTo.create(scaleActionTime, toScale, toScale),
                cc.CallFunc.create(
                    function(sender)
                    {
                        if (!needRot)
                        {
                            sender.setPosition(cc.p(self._position.x, yCenterPos));
                        }
                        else
                        {
                            sender.setPosition(cc.p(xCenterPos, self._position.y));
                        }
                    },
                    null),
                cc.ScaleTo.create(explodeTime, toScale, _ScreenHeight()/Defines.TABLE_GRID_SIZE),
                cc.CallFunc.create(
                    function(sender)
                    {
                        sender.removeFromParent(true);
                    },
                    null)
            )
        );

        sprite1.runAction(
            cc.Sequence.create(
                cc.ScaleTo.create(scaleActionTime, toScale, toScale),
                cc.CallFunc.create(
                    function(sender)
                    {
                        if (!needRot)
                        {
                            sender.setPosition(cc.p(self._position.x, yCenterPos));
                        }
                        else
                        {
                            sender.setPosition(cc.p(xCenterPos, self._position.y));
                        }
                    },
                    null),
                cc.ScaleTo.create(explodeTime, toScale, _ScreenHeight()/Defines.TABLE_GRID_SIZE),
                cc.CallFunc.create(
                    function(sender)
                    {
                        sender.removeFromParent(true);
                    },
                    null)
            )
        );

        var sprite2 = cc.Sprite.createWithSpriteFrameName("line2.png");
        var sprite3 = cc.Sprite.createWithSpriteFrameName("line3.png");

        batchNode.addChild(sprite3);
        batchNode.addChild(sprite2);

        sprite2.setVisible(false);
        sprite3.setVisible(false);

        if (!needRot)
        {
            sprite2.setPosition(cc.p(self._position.x, yCenterPos));
            sprite3.setPosition(cc.p(self._position.x, yCenterPos));
        }
        else
        {
            sprite2.setPosition(cc.p(xCenterPos, self._position.y));
            sprite3.setPosition(cc.p(xCenterPos, self._position.y));

            sprite2.setRotation(-90);
            sprite3.setRotation(-90);
        }

        var toScale2 = 0.1;
        var scaleActionTime2 = Defines.FPS * 35 * aniScaleTime;

        sprite2.runAction(
            cc.Sequence.create(
                cc.DelayTime.create(scaleActionTime + explodeTime),
                cc.CallFunc.create(
                    function(sender)
                    {
                        sender.setVisible(true);
                    },
                    null),
                cc.ScaleTo.create(scaleActionTime2, toScale2, 1),
                cc.CallFunc.create(
                    function(sender)
                    {
                        sender.removeFromParent(true);
                    },
                    null)
            )
        );

        sprite3.runAction(
            cc.Sequence.create(
                cc.DelayTime.create(scaleActionTime + explodeTime),
                cc.CallFunc.create(
                    function(sender)
                    {
                        sender.setVisible(true);
                    },
                    null),
                cc.ScaleTo.create(scaleActionTime2, toScale2, 1),
                cc.CallFunc.create(
                    function(sender)
                    {
                        sender.removeFromParent(true);
                    },
                    null)
            )
        );

        //
        var lightningSprite = cc.Sprite.createWithSpriteFrameName("shandian0.png");
        lightningSprite.setVisible(false);

        if (!needRot)
        {
            lightningSprite.setPosition(cc.p(self._position.x, yCenterPos));
        }
        else
        {
            lightningSprite.setPosition(cc.p(xCenterPos, self._position.y));
            lightningSprite.setRotation(-90);
        }

        batchNode.addChild(lightningSprite);

        var frameTime = 1/30 * aniScaleTime;
        var waitTime = Defines.FPS * 3 * aniScaleTime;

        var animation = cc.Animation.create(cc.ResourceMng.getInstance().getAnimationFrames("shandian"), frameTime);
        var seq = cc.Sequence.create(
            cc.DelayTime.create(scaleActionTime + waitTime),
            cc.CallFunc.create(
                function(sender)
                {
                    sender.setVisible(true);
                },
                null),
            cc.Animate.create(animation),
            cc.CallFunc.create(
                function(sender)
                {
                    sender.removeFromParent(true);
                },
                null)
        );

        lightningSprite.runAction(seq);

        return this;
    }
});

Effect_Line.create = function(position, hvDirection, scaleTime, centerPosition)
{
    var createNew = new Effect_Line();
    if (createNew)
    {
        createNew.init(position, hvDirection, scaleTime, centerPosition);
    }

    return createNew;
};