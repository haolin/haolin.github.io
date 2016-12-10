//======================================================================================================================
var _HALO_SPRITE_UP_LEFT_TAG = 46;
var _HALO_SPRITE_UP_RIGHT_TAG = 47;
var _HALO_SPRITE_DOWN_LEFT_TAG = 48;
var _HALO_SPRITE_DOWN_RIGHT_TAG = 49;
var _HALO_SPRITE_TAG = 50;
var _BOMB_NUM_SPRITE_TAG = 100;

//======================================================================================================================
var MonsterBombRender = MonsterRender.extend({

    //
    config: [
        ["bomb_1.png", false, true, _HALO_SPRITE_UP_LEFT_TAG],
        ["bomb_1.png", true, false, _HALO_SPRITE_UP_RIGHT_TAG],
        ["bomb_2.png", false, false, _HALO_SPRITE_DOWN_LEFT_TAG],
        ["bomb_2.png", true, true, _HALO_SPRITE_DOWN_RIGHT_TAG]
    ],

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(node)
    {
        this._super(node);
    },

    //------------------------------------------------------------------------------------------------------------------
    createMySprite: function()
    {
        //
        var newSprite = cc.Sprite.createWithSpriteFrameName(this.getNode().getColorName() + "_Bomb.png");
        if (!newSprite)
        {
            return null;
        }

        //
        this.updateNumSprite(newSprite);

        //
        this.updateHaloSprite(newSprite);

        //
        this.updateHaloSpriteRange(newSprite);

        //
        var batchNode = objectBombBatchNode();
        if (batchNode)
        {
            newSprite.setVisible(false);
            batchNode.addChild(newSprite, this.getNode().getZOrder());
        }

        return newSprite;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUpDecorations: function()
    {
        if (this.getSprite())
        {
            this.getSprite().removeAllChildren(true);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateDecorations: function()
    {
        if (this.getSprite())
        {
            this.updateNumSprite(this.getSprite());

            //
            this.updateHaloSprite(this.getSprite());

            //
            this.updateHaloSpriteRange(this.getSprite());
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateNumSprite: function(sprite)
    {
        sprite.removeChildByTag(_BOMB_NUM_SPRITE_TAG);

        var numSprte = cc.Sprite.createWithSpriteFrameName("num" + this.getNode().getBombTime() + ".png");
        sprite.addChild(numSprte, 10000, _BOMB_NUM_SPRITE_TAG);
        numSprte.setPosition(cc.p(sprite.getContentSize().width/2, sprite.getContentSize().height/2));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateHaloSprite: function(sprite)
    {
        sprite.removeChildByTag(_HALO_SPRITE_TAG);

        var haloSprite = this.createHaloSprite();
        if (haloSprite)
        {
            sprite.addChild(haloSprite, 50, _HALO_SPRITE_TAG);
            haloSprite.setPosition(cc.p(sprite.getContentSize().width/2, sprite.getContentSize().height/2));
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateHaloSpriteRange: function(sprite)
    {
        var self = this;

        //
        var config = MonsterBombRender.prototype.config.concat();
        config.forEach(
            function(a_cfg)
            {
                sprite.removeChildByTag(a_cfg[3]);

                var newSpr = self.createHaloSpriteRange(a_cfg[0], a_cfg[1], a_cfg[2]);
                if (newSpr)
                {
                    sprite.addChild(newSpr, 50, a_cfg[3]);
                    newSpr.setPosition(cc.p(sprite.getContentSize().width/2, sprite.getContentSize().height/2));
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createHaloSpriteRange: function(resName, flipStart)
    {
        var redPanel = cc.Sprite.createWithSpriteFrameName(resName);
        redPanel.setFlipX(flipStart);

        var time = this.getNode().getBombTime() > 2 ? (Defines.FPS * 40) : (Defines.FPS * 20);
        redPanel.runAction(
            cc.RepeatForever.create(
                cc.Sequence.create(
                    cc.FadeOut.create(time),
                    cc.FadeIn.create(time)
                )
            )
        );

        return redPanel;
    },

    //------------------------------------------------------------------------------------------------------------------
    createHaloSprite: function()
    {
        if (this.getNode().getBombTime() > 1)
        {
            return null;
        }

        //
        var redPanel = cc.Sprite.createWithSpriteFrameName("bomb_3.png");
        var time = Defines.FPS * 20;
        redPanel.runAction(
            cc.RepeatForever.create(
                cc.Sequence.create(
                    cc.FadeOut.create(time),
                    cc.FadeIn.create(time)
                )
            )
        );

        return redPanel;
    }
});


