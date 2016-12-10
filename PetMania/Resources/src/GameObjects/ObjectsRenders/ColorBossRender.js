
//======================================================================================================================
var ColorBossRender = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(node)
    {
        this.m_Node = node;

        //
        this.m_HatchInside = null;
        this.m_HatchOutside = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    getNode: function()
    {
        return this.m_Node;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        if (this.m_HatchInside)
        {
            this.m_HatchInside.removeFromParent(true);
            this.m_HatchInside = null;
        }

        if (this.m_HatchOutside)
        {
            this.m_HatchOutside.removeFromParent(true);
            this.m_HatchOutside = null;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    render: function()
    {
        //
        var pos = this.getNode().getPosition();
        var tableLayer = gameTableLayer();

        //
        this.m_HatchInside = cc.Sprite.createWithSpriteFrameName("hatch_pink.png");
        tableLayer.addChild(this.m_HatchInside, Defines.BATCH_NODE.OBJECTS.Z);
        this.m_HatchInside.setPosition(pos);

        //
        this.m_HatchOutside = cc.Sprite.createWithSpriteFrameName("hatch_open_0.png");
        tableLayer.addChild(this.m_HatchOutside, Defines.BATCH_NODE.OBJECT_GATE.Z);
        this.m_HatchOutside.setPosition(pos);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateInside: function()
    {
        //
        var config = {};
        config[Defines.COLOR.PINK] = "hatch_pink.png";
        config[Defines.COLOR.GREEN] = "hatch_green.png";
        config[Defines.COLOR.BLUE] = "hatch_blue.png";
        config[Defines.COLOR.ORANGE] = "hatch_orange.png";
        config[Defines.COLOR.PURPLE] = "hatch_purple.png";
        config[Defines.COLOR.YELLOW] = "hatch_yellow.png";
        config[Defines.COLOR.COLORFUL] = "hatch_colorful.png";

        //
        var res = config[this.getNode().getCurrentColor()];
        res = res || config[Defines.COLOR.COLORFUL];

        //
        var newSprite = cc.Sprite.createWithSpriteFrameName(res);
        this.m_HatchInside.getParent().addChild(
            newSprite,
            this.m_HatchInside.getZOrder()
        );

        //
        newSprite.setPosition(this.m_HatchInside.getPosition());

        //
        this.m_HatchInside.removeFromParent(true);
        this.m_HatchInside = null;

        //
        this.m_HatchInside = newSprite;
        this.m_HatchInside.runAction(
            cc.RepeatForever.create(cc.RotateBy.create(1, 360))
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateHatchOpen: function(callBack, callBack1)
    {
        var frames = cc.ResourceMng.getInstance().getAnimationFrames("hatch_open_");
        var fps =  (2/60);

        //
        var openAction = cc.Animate.create(cc.Animation.create(
            frames,
            fps));

        //
        var closeAction = cc.Animate.create(cc.Animation.create(
            frames.concat().reverse(),
            fps));

        //
        var seq = cc.Sequence.create(
            openAction,
            cc.CallFunc.create(
                callBack,
                null),
            closeAction,
            cc.CallFunc.create(
                callBack1,
                null)
        );

        this.m_HatchOutside.runAction(seq);
        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    changeColorful: function(callBack)
    {
        var self = this;

        this.updateHatchOpen(
            function()
            {
                self.updateInside();
            },
            callBack
        );

        return this;
    }

});
