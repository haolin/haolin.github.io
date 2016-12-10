//======================================================================================================================
var BubbleRender = MonsterRender.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(srcRender)
    {
        this._super(srcRender.getNode());
        this._CoreRender = srcRender;
    },

    //------------------------------------------------------------------------------------------------------------------
    popRender: function()
    {
        var old = this._CoreRender;
        this._CoreRender = null;
        return old;
    },

    //------------------------------------------------------------------------------------------------------------------
    createMySprite: function()
    {
        //装饰者模式:
        //this._CoreRender.createMySprite(); 制造出来的精灵 我再装饰一遍 并改掉ParentNode objectsNode
        var newSprite = this._CoreRender.createMySprite();
        newSprite.setPosition(this.getNode().getPosition());

        //不然就会崩溃
        newSprite.removeFromParent(false);
        objectsNode().addChild(newSprite);

        //
        var bubble = cc.Sprite.createWithSpriteFrameName("bubble.png");
        if (bubble)
        {
            newSprite.addChild(bubble);
            bubble.setPosition(cc.p(newSprite.getContentSize().width/2, newSprite.getContentSize().height/2));
        }

        return newSprite;
    }
});

//======================================================================================================================
var BubbleCreatorRender = BubbleRender.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(srcRender)
    {
        this._super(srcRender);
    },

    //------------------------------------------------------------------------------------------------------------------
    createMySprite: function()
    {
        //装饰者模式:
        //this._CoreRender.createMySprite(); 制造出来的精灵 我再装饰一遍 并改掉ParentNode objectsNode
        var newSprite = this._CoreRender.createMySprite();
        newSprite.setPosition(this.getNode().getPosition());

        newSprite.removeFromParent(false);
        objectsNode().addChild(newSprite);

        var bubble = cc.Sprite.createWithSpriteFrameName("bubble_creator0.png");
        if (bubble)
        {
            newSprite.addChild(bubble, 0, 1000);
            bubble.setPosition(cc.p(newSprite.getContentSize().width/2, newSprite.getContentSize().height/2));

            //
            var animation = cc.Animation.create(
                cc.ResourceMng.getInstance().getAnimationFrames("bubble_creator"),
                (1/25) * 1.5
            );

            animation.setLoops(Tools.rangeRandom(6, 10, true));

            /*bubble.runAction(
                cc.RepeatForever.create(
                    cc.Animate.create(animation)
                ));*/

            bubble.runAction(
                cc.RepeatForever.create(
                    cc.Sequence.create(
                        cc.Animate.create(animation),
                        cc.DelayTime.create(Tools.rangeRandom(2, 5))
                    )
                ));
        }

        return newSprite;
    }
});

