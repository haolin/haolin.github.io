//======================================================================================================================
var HazeRender = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(node)
    {
        this.m_Node = node;
        this.m_Sprite = null;
        this.m_Appeared = false;
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
        var hazeCount = this.m_Node.getHazeCount() - 1;
        hazeCount = hazeCount < 0 ? 0 : hazeCount;
        hazeCount = hazeCount > 2 ? 2 : hazeCount;

        //
        var bottomNode = cc.Layer.create();
        var bottomSize = cc.size(Defines.TABLE_GRID_SIZE, Defines.TABLE_GRID_SIZE);
        bottomNode.ignoreAnchorPointForPosition(false);
        bottomNode.setContentSize(bottomSize);

        //
        var batchNode = gameTableLayer();
        if (batchNode)
        {
            bottomNode.setVisible(false);
            batchNode.addChild(bottomNode, Defines.BATCH_NODE.OBJECT_CEIL.Z);
        }

        //
        var spriteHazes = [];

        //
        for (var index = 0; index <= hazeCount; index++)
        {
            var frameName = "haze_" + index + ".png";
            var newSprite = cc.Sprite.createWithSpriteFrameName(frameName);
            bottomNode.addChild(newSprite);
            newSprite.setPosition(cc.p(bottomSize.width/2, bottomSize.height/2));
            spriteHazes.push(newSprite);
        }

        //
        var delay = this.m_Appeared ? 0 : 0.6;
        var firHaze = spriteHazes[spriteHazes.length - 1];
        var secHaze = spriteHazes[spriteHazes.length - 2];

        if (firHaze)
        {
            firHaze.runAction(cc.Sequence.create(
                cc.DelayTime.create(Tools.rangeRandom(0, delay)),
                cc.CallFunc.create(this.runHazeAction, this, false)
            ));
        }

        //
        if (secHaze)
        {
            secHaze.runAction(cc.Sequence.create(
                cc.DelayTime.create(Tools.rangeRandom(0, delay)),
                cc.CallFunc.create(this.runHazeAction, this, true)
            ));
        }

        return bottomNode;
    },

    //------------------------------------------------------------------------------------------------------------------
    runHazeAction: function(sender, flip)
    {
        var scale = flip ? -1: 1;
        var duration = 0.25/Defines.BASE_SCALE;

        sender.runAction(cc.RepeatForever.create(cc.Sequence.create(
            cc.MoveBy.create(duration, cc.p(2 * scale, 0)),
            cc.MoveBy.create(2 * duration, cc.p(-4 * scale, 0)),
            cc.MoveBy.create(duration, cc.p(2 * scale, 0))
        )));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        if (this.m_Sprite)
        {
            this.m_Sprite.removeFromParent(true);
            this.m_Sprite = null;
        }

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

            if (!this.m_Appeared)
            {
                this.m_Appeared = true;

                this.getSprite().setScale(0);
                this.getSprite().runAction(cc.Sequence.create(
                    cc.DelayTime.create(Tools.rangeRandom(0.2, 0.4)),
                    cc.EaseElasticOut.create(cc.ScaleTo.create(0.2, 1), 0.6)
                ));
            }
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
