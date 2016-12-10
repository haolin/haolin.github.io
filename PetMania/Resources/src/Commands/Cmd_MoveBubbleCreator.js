//

//======================================================================================================================
cc.Cmd_MoveBubbleCreator = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(srcObject, dstObject)
    {
        this._super();

        //
        this.srcObject = srcObject;
        this.srcFinish = false;

        //
        this.dstObject = dstObject;
        this.dstFinish = false;

        //
        this.bubbleCreatorSprTag = 999;
        this.bubbleSprTag = 1000;

        //
        this.m_DelayTimer = 1/25 * 40;
    },

    //------------------------------------------------------------------------------------------------------------------
    cancel: function()
    {
        return this.srcFinish && this.dstFinish;
    },

    //------------------------------------------------------------------------------------------------------------------
    bubbleCreatorMove: function(gameLevel, moveTime)
    {
        //
        var self = this;

        //判断方向
        var direction = this.srcObject.getParentNode().getDirectionTo(
            this.dstObject.getParentNode()
        );

        //
        this.srcObject.destroy(null, gameLevel, null);

        //泡泡怪移动时候的精灵是根据方向来的
        var config = {};
        config[Defines.DIRECTION.TOP] = "bubble_creator_up.png";
        config[Defines.DIRECTION.BOTTOM] = "bubble_creator_down.png";
        config[Defines.DIRECTION.RIGHT] = "bubble_creator_right.png";
        config[Defines.DIRECTION.LEFT] = "bubble_creator_left.png";

        //
        var bubbleMoveSpr = cc.Sprite.createWithSpriteFrameName(config[direction]);
        objectsNode().addChild(bubbleMoveSpr);
        bubbleMoveSpr.setPosition(this.srcObject.getPosition());

        //
        cc.AudioMng.getInstance().playBubbleMove();

        //
        var action = cc.Sequence.create(
            cc.MoveTo.create(moveTime, this.dstObject.getPosition()),
            cc.CallFunc.create(
                function (sender)
                {
                    //
                    var position = sender.getPosition();
                    sender.removeFromParent(true);
                    cc.AudioMng.getInstance().playBubbleCreate();

                    //
                    if (cc.ArmatureDataMng.getInstance().swapFailArmature(self.dstObject))
                    {
                        self.dstObject.getSprite().setVisible(false);
                    }

                    //
                    self.srcFinish = true;

                    //
                    var bubbleSpr = cc.Sprite.createWithSpriteFrameName("bubble_creator0.png");
                    objectsNode().addChild(bubbleSpr, 0, self.bubbleCreatorSprTag);
                    bubbleSpr.setPosition(position);
                },
                null)
        );

        bubbleMoveSpr.runAction(action);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    newBubbleShow: function(gameLevel, moveTime)
    {
        var self = this;

        //泡泡的动画
        var bubbleSpr = cc.Sprite.createWithSpriteFrameName("bubble_creator0.png"/*"bubble.png"*/);
        objectsNode().addChild(bubbleSpr, 0, this.bubbleSprTag);

        //
        bubbleSpr.setPosition(this.srcObject.getPosition());
        bubbleSpr.setScale(0.5);
        bubbleSpr.setVisible(false);

        //
        var action = cc.Sequence.create(
            cc.DelayTime.create(moveTime),
            cc.CallFunc.create(
                function (sender)
                {
                    sender.setVisible(true);
                },
                null),
            cc.EaseElasticOut.create(cc.ScaleTo.create(moveTime, 1, 1)),
            cc.CallFunc.create(
                function()
                {
                    cc.AudioMng.getInstance().playBubbleCreate();

                    if (cc.ArmatureDataMng.getInstance().swapFailArmature(self.srcObject))
                    {
                        self.srcObject.getSprite().setVisible(false);
                    }

                    self.dstFinish = true;
                },
                null)
        );

        bubbleSpr.runAction(action);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //
        this.srcObject.getRender().release();
        this.srcObject.renderNode();
        this.srcObject.updateNodePosition();

        //
        var moveTime = Defines.FPS * 15;
        this.bubbleCreatorMove(gameLevel, moveTime);
        this.newBubbleShow(gameLevel, moveTime);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function()
    {
        //
        objectsNode().removeChildByTag(this.bubbleCreatorSprTag);
        objectsNode().removeChildByTag(this.bubbleSprTag);

        //
        cc.ArmatureDataMng.getInstance().stopArmature(this.srcObject);
        this.srcObject.getSprite().setVisible(true);
        //cc.Obj_Bubble.create(this.srcObject);
        cc.Obj_BubbleCreator.create(this.srcObject);

        //
        cc.ArmatureDataMng.getInstance().stopArmature(this.dstObject);
        this.dstObject.getSprite().setVisible(true);
        cc.Obj_BubbleCreator.create(this.dstObject);

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        if (this.cancel())
        {
            this.m_DelayTimer -= time;
        }

        return this.cancel() && this.m_DelayTimer <= 0;
    }
});

//工厂方法
cc.Cmd_MoveBubbleCreator.create = function(object, validObjs)
{
    //
    var array = validObjs.concat();
    Tools.shuffle(array);

    //
    return new cc.Cmd_MoveBubbleCreator(object, array.shift());
};
