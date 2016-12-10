/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-10-16
 * Time: 上午10:58
 * Version: 1.0
 * Function: This file use to do...
 */


var Effect_MonsterDesWrap = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function()
    {
        this._scale = 1.0;
        this._position = null;
        this._callBack = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init : function(position,scale, callBack)
    {
        this._scale = scale;
        this._position = position;
        this._callBack = callBack;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    play : function()
    {
        var self = this;

        var animationSprite = cc.Sprite.createWithSpriteFrameName("x_explode0.png");
        animationSprite.setPosition(this._position);

        if (this._scale)
        {
            animationSprite.setScaleX(this._scale);
            animationSprite.setScaleY(this._scale);
        }

        effectBatchNode().addChild(animationSprite);

        var animationKey = "x_explode";
        var animation = cc.AnimationCache.getInstance().getAnimation(animationKey);
        if (!animation)
        {
            animation = cc.Animation.create(cc.ResourceMng.getInstance().getAnimationFrames(animationKey), 1/25);
            cc.AnimationCache.getInstance().addAnimation(animation, animationKey);
        }

        var seq = cc.Sequence.create(
            cc.Animate.create(animation),
            cc.CallFunc.create(
                function(sender)
                {
                    sender.removeFromParent(true);

                    if (self._callBack)
                    {
                        self._callBack();
                    }
                },
                null)
        );

        animationSprite.runAction(seq);

        return this;
    }
});

Effect_MonsterDesWrap.create = function(position,scale, callBack)
{
    var createNew = new Effect_MonsterDesWrap();
    if (createNew)
    {
        createNew.init(position,scale, callBack);
    }

    return createNew;
};