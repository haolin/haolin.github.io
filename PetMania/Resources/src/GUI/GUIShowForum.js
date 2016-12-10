

//=======================================================================================================
cc.GUIShowForum = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUIShowForum";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();
        this.m_MainUI = null;
        this.m_ButtonClose = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(blockLayer, -1);

        //
        this.m_MainUI = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back1.png");
        this.getWindow().addChild(this.m_MainUI);
        this.m_MainUI.setPosition(_ScreenCenter());

        //
        this.m_ButtonClose = GUI._AddCloseButton(this.m_MainUI, this.closeWindow, this);
        var mainSize = this.m_MainUI.getContentSize();

        //
        var backFrame = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back6.png");
        this.m_MainUI.addChild(backFrame);
        backFrame.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.53));

        var content = Resource.ChineseTxt["forum"];
        var label = cc.LabelTTF.create(content, "Arial", 22 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(label);

        label.setAnchorPoint(cc.p(0.5, 0.5));
        label.setPosition(cc.p(mainSize.width/2, mainSize.height * 0.55));

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);
        this.getWindow().removeAllChildren(true);
        this.addContent();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();
        this.getWindow().removeAllChildren(true);
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});


cc.GUIShowForum._instance = null;
cc.GUIShowForum.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIShowForum();
        this._instance.init();
    }

    return this._instance;
};