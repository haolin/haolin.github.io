
//======================================================================================================================
var MonsterFlowerRender = MonsterRender.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(node)
    {
        this._super(node);
    },

    //------------------------------------------------------------------------------------------------------------------
    createMySprite: function()
    {
        var newSprite = MonsterFlowerRender.createSprite(this.getNode().getFlowerLevel(), true);
        if (!newSprite)
        {
            return null;
        }

        MonsterFlowerRender.animation(newSprite, this.getNode().getFlowerLevel());

        var batchNode = objectFlowers();
        if (batchNode)
        {
            newSprite.setVisible(false);
            batchNode.addChild(newSprite, this.getNode().getZOrder());
        }

        return newSprite;
    },

    //------------------------------------------------------------------------------------------------------------------
    startAnimateAction: function()
    {
        this.getSprite().stopAllActions();
        MonsterFlowerRender.animation(this.getSprite(), this.getNode().getFlowerLevel());
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    stopAnimateAction: function()
    {
        this.getSprite().stopAllActions();
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

MonsterFlowerRender.animation = function(sprite, flowerLevel)
{
    //
    var frameName = "flower" + flowerLevel + "_";
    var animation = cc.Animation.create(
        cc.ResourceMng.getInstance().getAnimationFrames(frameName),
        (1/25) * 2);

    sprite.runAction(
        cc.RepeatForever.create(
            cc.Animate.create(animation)
        )
    );

    return sprite;
};

MonsterFlowerRender.createSprite = function(flowerLevel, action)
{
    //
    var frameName = "flower" + flowerLevel + "_";
    var newSprite = cc.Sprite.createWithSpriteFrameName(frameName + "0.png");
    if (action)
    {
        MonsterFlowerRender.animation(newSprite, flowerLevel)
    }

    return newSprite;
};
