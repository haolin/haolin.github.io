

//======================================================================================================================
var Effect_SmallExplode = cc.Class.extend({

    ctor: function()
    {
        this.m_Position = cc.p(0, 0);
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(position)
    {
        this.m_Position = position;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    play: function()
    {
        //
        var sprite = cc.Sprite.createWithSpriteFrameName("explode0.png");
        effectBatchNode().addChild(sprite);
        sprite.setPosition(this.m_Position);

        //
        var animationKey = "explode";
        var animation = cc.AnimationCache.getInstance().getAnimation(animationKey);
        if (!animation)
        {
            var animationFrames = cc.ResourceMng.getInstance().getAnimationFrames(animationKey);
            animation = cc.Animation.create(animationFrames, 1/25);
            cc.AnimationCache.getInstance().addAnimation(animation, animationKey);
        }

        //
        var seq = cc.Sequence.create(
            cc.Animate.create(animation),
            cc.CallFunc.create(
                function(sender)
                {
                    sender.removeFromParent(true);
                },
                null)
        );

        sprite.runAction(seq);
        return this;
    }
});

//
Effect_SmallExplode.create = function(position)
{
    var createNew = new Effect_SmallExplode();
    if (createNew)
    {
        createNew.init(position);
    }

    return createNew;
};




