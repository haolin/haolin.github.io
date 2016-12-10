

//======================================================================================================================
cc.Cmd_CreateBubbleCreator = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(monsters)
    {
        this._super();
        this.m_Monsters = monsters.concat();
        this.m_IsFinish = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        var self = this;
        this.m_Monsters.forEach(
            function(mons)
            {
                //
                var sprite = cc.Sprite.createWithSpriteFrameName("bubble_creator0.png");

                var animation = cc.Animation.create(cc.ResourceMng.getInstance().getAnimationFrames("bubble_creator"), (1/25)*1.2);
                sprite.runAction(
                    cc.RepeatForever.create(
                        cc.Animate.create(animation)
                    ));

                //
                //gameTableLayer().addChild(sprite, Defines.BATCH_NODE.OBJECT_BUBBLE.Z);
                objectsNode().addChild(sprite);

                sprite.setPosition(mons.getPosition());
                sprite.setScale(0.5);

                //
                var scaleAction = cc.Sequence.create(
                    cc.EaseElasticOut.create(cc.ScaleTo.create(Defines.FPS * 30, 1, 1)),
                    cc.CallFunc.create(
                        function (sender)
                        {
                            sender.removeFromParent(true);
                            self.m_IsFinish = true;

                            cc.AudioMng.getInstance().playBubbleCreate();
                            cc.Obj_BubbleCreator.create(mons);
                        },
                        null
                    ));

                sprite.runAction(scaleAction);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(/*gameLevel*/)
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        return this.m_IsFinish;
    }
});

//工厂方法
cc.Cmd_CreateBubbleCreator.create = function(monsters)
{
    return new cc.Cmd_CreateBubbleCreator(monsters);
};
