

//======================================================================================================================
var Effect_Praise = cc.Class.extend({

    ctor: function()
    {
        this.m_Index = 0;
        this.m_Poisition = cc.p(0, 0);
        this.m_LastTime = 0;
        this.m_Height = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(index, startPosition, lastTime, height)
    {
        this.m_Index = index || 0;
        this.m_Poisition = startPosition;
        this.m_LastTime = lastTime;
        this.m_Height = height;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    play: function()
    {
        cc.AudioMng.getInstance().playPraiseSound(this.m_Index);
        var sprite = cc.Sprite.createWithSpriteFrameName("Images_praise" + this.m_Index + ".png");
        if (!sprite)
        {
            return this;
        }

        animateLayer().addChild(sprite);
        sprite.setPosition(this.m_Poisition);

        var monster = cc.Sprite.createWithSpriteFrameName("Images_monster_0.png");
        sprite.addChild(monster);

        var size = monster.getContentSize();
        monster.setPosition(cc.p(-size.width/2, size.height/2));

        //
        var sq = cc.Sequence.create(
            cc.MoveTo.create(this.m_LastTime, cc.p(this.m_Poisition.x, this.m_Poisition.y + this.m_Height)),
            cc.CallFunc.create(
                function ()
                {
                    sprite.runAction(cc.FadeOut.create(0.5));
                    monster.runAction(cc.FadeOut.create(0.5));
                }
            ),
            cc.DelayTime.create(0.5),
            cc.CallFunc.create(
                function(sender)
                {
                    sender.removeFromParent(true);
                },
                null)
        );

        //
        sprite.runAction(sq);
        return this;
    }

});

//
Effect_Praise.create = function(index, startPosition, lastTime, height)
{
    var createNew = new Effect_Praise();
    if (createNew)
    {
        //
        var _MIN_PRAISE_IMG_INDEX = 0;
        var _MAX_PRAISE_IMG_INDEX = 3;

        //
        if (index < _MIN_PRAISE_IMG_INDEX)
        {
            index = _MIN_PRAISE_IMG_INDEX;
        }
        else if (index > _MAX_PRAISE_IMG_INDEX)
        {
            index = _MAX_PRAISE_IMG_INDEX;
        }

        createNew.init(index, startPosition, lastTime, height);
    }

    return createNew;
};




