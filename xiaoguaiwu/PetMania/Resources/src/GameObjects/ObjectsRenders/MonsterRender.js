
//======================================================================================================================
var MonsterRender = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(node)
    {
        this.m_Node = node;
        this.m_Sprite = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    getNode: function()
    {
        return this.m_Node;
    },

    //------------------------------------------------------------------------------------------------------------------
    createMySprite: function()
    {
        //
        var newSprite = MonsterRender.createSprite(this.getNode().getColor());
        if (this.getNode() instanceof cc.Obj_MonsterUnwrap)
        {
            newSprite.runAction(cc.RepeatForever.create(
                cc.Sequence.create(
                    cc.TintTo.create(Defines.FPS * 3, 200, 200, 200),
                    cc.TintTo.create(Defines.FPS * 3, 255, 255, 255))
            ));
        }

        var batchNode = objectsBatchNode();
        if (batchNode)
        {
            newSprite.setVisible(false);
            batchNode.addChild(newSprite, this.getNode().getZOrder());
        }

        return newSprite;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        if (this.m_Sprite)
        {
            this.m_Sprite.removeFromParent(true);
            this.m_Sprite = null;
        }

        cc.ArmatureDataMng.getInstance().stopArmature(this.getNode());
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getSprite: function()
    {
        this.m_Sprite = this.m_Sprite || this.createMySprite();
        return this.m_Sprite;
    },

    //------------------------------------------------------------------------------------------------------------------
    render: function()
    {
        if (this.getSprite())
        {
            this.getSprite().setVisible(true);
            this.updatePositionByNode();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updatePositionByNode: function()
    {
        if (this.getSprite())
        {
            this.getSprite().setPosition(this.getNode().getPosition());
        }

        return this;
    }
});

//
MonsterRender.createSprite = function(color)
{
    if (!color || color == Defines.COLOR.NULL)
    {
        cc.Assert(0, "!color || color == Defines.COLOR.NULL  " + color);
    }

    return cc.Sprite.createWithSpriteFrameName(color.getName() + "_Wrap.png");
};

//------------------------------------------------------------------------------------------------------------------
MonsterRender.updateSpecMonsterDecorationVisible = function(monsObject, vis)
{
    //
    if (monsObject instanceof cc.Obj_MonsterWrap && !(monsObject instanceof cc.Obj_MonsterUnwrap))
    {
        if (monsObject.getRender() instanceof MonsterWrapRender)
        {
            //Obj_MonsterUnwrap 没有这个 setWrapDecorationVisible
            monsObject.getRender().setWrapDecorationVisible(vis);
        }
    }
    else if (monsObject instanceof cc.Obj_MonsterDirection)
    {
        if (monsObject.getRender() instanceof MonsterDirectionRender)
        {
            monsObject.getRender().setDirectionDecorationVisible(vis);
        }
    }
    else if (monsObject instanceof cc.Obj_MonsterColorful)
    {
        if (monsObject.getRender() instanceof MonsterColorfulRender)
        {
            monsObject.getRender().setColorfulDecorationVisible(vis);
        }
    }

    return this;
};

//======================================================================================================================
var MonsterAddTimeRender = MonsterRender.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(node)
    {
        this._super(node);
    },

    //------------------------------------------------------------------------------------------------------------------
    createMySprite: function()
    {
        var newSprite = cc.Sprite.createWithSpriteFrameName(this.getNode().getColorName() + "_AddTime.png");
        if (!newSprite)
        {
            return null;
        }

        //
        var batchNode = objectAddTimeBatchNode();
        if (batchNode)
        {
            newSprite.setVisible(false);
            batchNode.addChild(newSprite, this.getNode().getZOrder());
        }

        return newSprite;
    }
});

//======================================================================================================================
var MonsterColorfulRender = MonsterRender.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(node)
    {
        this._super(node);

        //
        this._animationTag = 2012;
        this._particleTag = 2013;
    },

    //------------------------------------------------------------------------------------------------------------------
    getAnimationKey: function()
    {
        return "swirl_";
    },

    //------------------------------------------------------------------------------------------------------------------
    createMySprite: function(notDecoration)
    {
        var animationKey = this.getAnimationKey();
        var newSprite = cc.Sprite.createWithSpriteFrameName(animationKey + "0.png");
        if (newSprite)
        {
            if (!notDecoration)
            {
                this.animation(newSprite);
                this.setParticleEnable(newSprite, true);
            }

            var batchNode = objectsNode();
            if (batchNode)
            {
                newSprite.setVisible(false);
                batchNode.addChild(newSprite, this.getNode().getZOrder());
            }
        }

        return newSprite;
    },

    //------------------------------------------------------------------------------------------------------------------
    animation: function(sprite)
    {
        //
        sprite.stopActionByTag(this._animationTag);

        //
        var animationKey = this.getAnimationKey();
        var animation = cc.AnimationCache.getInstance().getAnimation(animationKey);
        if (!animation)
        {
            animation = cc.Animation.create(cc.ResourceMng.getInstance().getAnimationFrames(animationKey), 1/25);
            cc.AnimationCache.getInstance().addAnimation(animation, animationKey);
        }

        if (animation)
        {
            var animationAction = cc.RepeatForever.create(
                cc.Animate.create(animation)
            );

            animationAction.setTag(this._animationTag);
            sprite.runAction(animationAction);
        }

        return sprite;
    },

    //------------------------------------------------------------------------------------------------------------------
    setParticleEnable: function(sprite, setting)
    {
        //
        sprite.removeChildByTag(this._particleTag);

        //
        if (setting)
        {
            var particle = cc.ParticleSystem.create(_ParticlesPath + "colorful_particle.plist");
            if (particle)
            {
                //
                sprite.addChild(particle, 100, this._particleTag);

                //
                particle.setScale(Defines.BASE_SCALE);
                particle.setPositionType(cc.PARTICLE_TYPE_GROUPED);
                particle.setPosition(cc.p(sprite.getContentSize().width/2, sprite.getContentSize().height/2));
            }
        }

        return sprite;
    },

    //------------------------------------------------------------------------------------------------------------------
    setColorfulDecorationVisible: function(setVis)
    {
        if (this.getSprite())
        {
            if (setVis)
            {
                this.animation(this.getSprite());
                this.setParticleEnable(this.getSprite(), true);
            }
            else
            {
                this.getSprite().stopActionByTag(this._animationTag);
                this.getSprite().removeChildByTag(this._particleTag);
            }
        }

        return this.getSprite();
    }
});

MonsterColorfulRender.createSprite = function()
{
	var animationKey = "swirl_";
    return cc.Sprite.createWithSpriteFrameName(animationKey + "0.png");
};

//======================================================================================================================
var MonsterDirectionRender = MonsterRender.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(node)
    {
        this._super(node);

        this._animationTag = 2012;
        this._decorationTag = 2013;
    },

    //------------------------------------------------------------------------------------------------------------------
    createMySprite: function(notDecoration)
    {
        var animationKey = this.getAnimationKey();
        var sprite = cc.Sprite.createWithSpriteFrameName(animationKey + "0.png");
        if (!sprite)
        {
            return null;
        }

        //
        if (!notDecoration)
        {
            this.animaition(sprite);
            this.decoration(sprite);
        }

        //
        var batchNode = objectsBatchNode();
        if (batchNode)
        {
            sprite.setVisible(false);
            batchNode.addChild(sprite, this.getNode().getZOrder());
        }

        return sprite;
    },

    //------------------------------------------------------------------------------------------------------------------
    getAnimationKey: function()
    {
        return this.getNode().getColorName() + ((this.getNode().getHVDirection() == Defines.DIRECTION.HORIZONTAL) ? "_Horiz" : "_Vert");
    },

    //------------------------------------------------------------------------------------------------------------------
    animaition: function(sprite)
    {
        sprite.stopActionByTag(this._animationTag);

        //
        var animationKey = this.getAnimationKey();
        var animation = cc.AnimationCache.getInstance().getAnimation(animationKey);
        if (!animation)
        {
            animation = cc.Animation.create(cc.ResourceMng.getInstance().getAnimationFrames(animationKey), 1/25);
            cc.AnimationCache.getInstance().addAnimation(animation, animationKey);
        }

        //
        if (animation)
        {
            var faceAnimation = cc.RepeatForever.create(
                cc.Animate.create(animation)
            );

            faceAnimation.setTag(this._animationTag);
            sprite.runAction(faceAnimation);
        }

        return sprite;
    },

    //------------------------------------------------------------------------------------------------------------------
    decoration: function(sprite)
    {
        //
        sprite.removeChildByTag(this._decorationTag);

        //
        var animationKey = "dir_buff";
        var animation = cc.AnimationCache.getInstance().getAnimation(animationKey);
        if (!animation)
        {
            animation = cc.Animation.create(cc.ResourceMng.getInstance().getAnimationFrames(animationKey), 1/25);
            cc.AnimationCache.getInstance().addAnimation(animation, animationKey);
        }

        if (animation)
        {
            var aniSpr = cc.Sprite.createWithSpriteFrameName(animationKey + "0.png");
            aniSpr.runAction(
                cc.RepeatForever.create(
                    cc.Animate.create(animation)
                ));

            if (this.getNode().getHVDirection() == Defines.DIRECTION.VERTICAL)
            {
                aniSpr.setRotation(-90);
            }

            sprite.addChild(aniSpr, 100, this._decorationTag);
            aniSpr.setPosition(cc.p(sprite.getContentSize().width/2, sprite.getContentSize().height/2));
        }

        return sprite;
    },

    //------------------------------------------------------------------------------------------------------------------
    setDirectionDecorationVisible: function(setVis)
    {
        if (this.getSprite())
        {
            var decorationAni = this.getSprite().getChildByTag(this._decorationTag);
            if (decorationAni)
            {
                decorationAni.setVisible(setVis);
            }

            if (setVis)
            {
                this.animaition(this.getSprite())
            }
            else
            {
                this.getSprite().stopActionByTag(this._animationTag);
            }
        }

        return this.getSprite();
    }
});

MonsterDirectionRender.createSprite = function()
{
	var animationKey = Defines.COLOR.YELLOW + "_Horiz";
    return cc.Sprite.createWithSpriteFrameName(animationKey + "0.png");
};

//======================================================================================================================
var MonsterWrapRender = MonsterRender.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(node)
    {
        this._super(node);
        this._decorationTag = 2013;
    },

    //------------------------------------------------------------------------------------------------------------------
    createMySprite: function(notDecoration)
    {
        //
        var newSprite = MonsterRender.createSprite(this.getNode().getColor());
        if (!newSprite)
        {
            return null;
        }

        //
        if (!notDecoration)
        {
            this.decoration(newSprite);
        }

        //
        var batchNode = objectsBatchNode();
        if (batchNode)
        {
            newSprite.setVisible(false);
            batchNode.addChild(newSprite, this.getNode().getZOrder());
        }

        return newSprite;
    },

    //------------------------------------------------------------------------------------------------------------------
    decoration: function(sprite)
    {
        //
        sprite.removeChildByTag(this._decorationTag);

        //
        var animationKey = "wrap_buff";
        var animation = cc.AnimationCache.getInstance().getAnimation(animationKey);
        if (!animation)
        {
            animation = cc.Animation.create(cc.ResourceMng.getInstance().getAnimationFrames(animationKey), 1/25);
            cc.AnimationCache.getInstance().addAnimation(animation, animationKey);
        }

        if (animation)
        {
            var aniSpr = cc.Sprite.createWithSpriteFrameName(animationKey + "0.png");
            aniSpr.runAction(
                cc.RepeatForever.create(
                    cc.Animate.create(animation)
                ));

            //
            sprite.addChild(aniSpr, 100, this._decorationTag);
            aniSpr.setPosition(cc.p(sprite.getContentSize().width/2, sprite.getContentSize().height/2));
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setWrapDecorationVisible: function(setVis)
    {
        if (this.getSprite())
        {
            var decorationAni = this.getSprite().getChildByTag(this._decorationTag);
            if (decorationAni)
            {
                decorationAni.setVisible(setVis);
            }
        }

        return this.getSprite();
    }
});

MonsterWrapRender.createSprite = function()
{
    return MonsterRender.createSprite(this.getNode().getColor());
};
