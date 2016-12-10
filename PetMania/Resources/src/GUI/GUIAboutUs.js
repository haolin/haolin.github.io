
//=======================================================================================================
cc.GUIAboutUs = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUIAboutUs";
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

        //
        //var isCT = CHANNEL_FLAG == CHANNELList.CT;//(/*CHANNEL_FLAG == CHANNELList.CM*/isTelcomOperators());

        //显示游戏版本号
        var gameName = cc.LabelTTF.create(Resource.ChineseTxt["game_name"], "Arial", 22 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(gameName);
        gameName.setAnchorPoint(cc.p(0.5, 0.5));
        gameName.setPosition(cc.p(mainSize.width/2, mainSize.height/2 + 130 * Defines.BASE_SCALE));

        var gameVersion = cc.LabelTTF.create("V" + GAME_VERSION, "Arial", 22 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(gameVersion);
        gameVersion.setAnchorPoint(cc.p(0.5, 0.5));
        gameVersion.setPosition(cc.p(mainSize.width/2, mainSize.height/2 + 95 * Defines.BASE_SCALE));

        //
        var content = Resource.ChineseTxt[87];
        var label = cc.LabelTTF.create(content, "Arial", 15 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(label);

        var contentMail = Resource.ChineseTxt[88];
        var labelMail = cc.LabelTTF.create(contentMail, "Arial", 15 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelMail);
        labelMail.setAnchorPoint(cc.p(0, 0.5));
        labelMail.setPosition(cc.p(mainSize.width * 0.15, mainSize.height *0.38));
        //label.setColor(cc.c3b(0, 0, 0));

        //
        var yPosAdjust = isCT() ? 25 : 25;
        label.setAnchorPoint(cc.p(0.5, 0.5));
        label.setPosition(cc.p(mainSize.width/2, mainSize.height/2));// + yPosAdjust * Defines.BASE_SCALE));


//        //显示代码版本号
        var labelDataVer = cc.LabelTTF.create(RES_VERSION, "Arial", 19 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelDataVer);
        labelDataVer.setAnchorPoint(cc.p(0.5, 0.5));
        labelDataVer.setPosition(cc.p(mainSize.width/2, mainSize.height/2 - 160 * Defines.BASE_SCALE));
        labelDataVer.setVisible(false);


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


cc.GUIAboutUs._instance = null;
cc.GUIAboutUs.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIAboutUs();
        this._instance.init();
    }

    return this._instance;
};