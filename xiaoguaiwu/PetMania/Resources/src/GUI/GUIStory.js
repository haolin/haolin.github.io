//=======================================================================================================
cc.GUIStory = cc.GUIWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUIStory";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        //
        this.m_NextButton = null;
        this.m_SkipButton = null;
        this.m_ArmatureLayer = null;
        this.m_DisplayIndex = 0;
    },

    //--------------------------------------------------------------------------------------------------------------------
    init:function()
    {
        this._super();
        return this;
    },

    //--------------------------------------------------------------------------------------------------------------------
    addContent:function()
    {

        //
        this.m_ArmatureLayer = cc.Layer.create();
        this.getWindow().addChild(this.m_ArmatureLayer);

        //
        this.m_NextButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_next_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_next_sel.png"),
            this._btnNextCallback,
            this);

        var pos0 = _ScreenBottomRight();
        this.m_NextButton.setPosition(cc.p(pos0.x - 100 * Defines.BASE_SCALE, pos0.y + 30 * Defines.BASE_SCALE));

        //
        this.m_SkipButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_skip_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_skip_sel.png"),
            this._btnSkipCallback,
            this);

        var pos1 = _ScreenBottomLeft();
        this.m_SkipButton.setPosition(cc.p(pos1.x + 100 * Defines.BASE_SCALE, pos1.y + 30 * Defines.BASE_SCALE));

        //
        var storyMenu = cc.Menu.create(this.m_NextButton, this.m_SkipButton);
        storyMenu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(storyMenu);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    resetDisplay: function()
    {
        this.m_DisplayIndex = 0;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    nextDisplay: function()
    {
        ++this.m_DisplayIndex;
        if (this.m_DisplayIndex >= 2)
        {
            this.m_DisplayIndex = 2;
            //this.m_NextButton.setVisible(false);
            this.m_NextButton.setCallback(this._btnSkipCallback);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    runStoryArmatureAnimation: function()
    {
//        cc.AudioMng.getInstance().stopAllEffects();
        cc.AudioMng.getInstance().playStory(this.m_DisplayIndex + 1);
        this.m_ArmatureLayer.removeAllChildren(true);

        var armatureNames = ["first", "second", "third"];
        //var armature = cc.ArmatureDataMng.getInstance().createStoryArmature(armatureNames[this.m_DisplayIndex]);
        var armature = cc.ArmatureDataMng.getGUIStory() ?
            cc.ArmatureDataMng.getGUIStory().createArmature(armatureNames[this.m_DisplayIndex]) : null;
        if (armature)
        {
            //
            this.m_ArmatureLayer.addChild(armature);
            armature.setPosition(_ScreenCenter());
            armature.getAnimation().playByIndex(0, 0);
            armature.getAnimation().setAnimationScale(25/60);
        }




        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);

        //
        cc.ArmatureDataMng.getInstance().registerStory();

        //
        this.getWindow().removeAllChildren(true);
        this.addContent();

        //
        this.resetDisplay();
        this.runStoryArmatureAnimation();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();
        this.getWindow().removeAllChildren(true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnNextCallback: function()
    {
//        cc.AudioMng.getInstance().playButtonSound(true);
        this.nextDisplay();
        this.runStoryArmatureAnimation();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnSkipCallback: function()
    {
//        cc.AudioMng.getInstance().playButtonSound(true);
//        cc.AudioMng.getInstance().stopAllEffects();
        cc.AudioMng.getInstance().playMainMenuMusic();
        cc.AudioMng.getInstance().playSkipStory();


        //
        this.closeWindow();

        //
        BIMng.getInstance().logPlayOverStory(this.m_DisplayIndex >= 2);

        //cc.GameManager.getInstance().changeTo(cc.State_Episodes.getInstance());
        //Scene_MainMap.changeTo();

        if (!Defines.IS_KO && Scene_DailyBonus.canChangeTo())
        {
            Scene_DailyBonus.changeTo();
        }
        else if (Defines.IS_KO && Scene_SignBonus.canChangeTo())
        {
            Scene_SignBonus.changeTo();
        }
        else
        {
            Scene_MainMap.changeTo();
        }

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});


cc.GUIStory._instance = null;
cc.GUIStory.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIStory();
        this._instance.init();
    }

    return this._instance;
};