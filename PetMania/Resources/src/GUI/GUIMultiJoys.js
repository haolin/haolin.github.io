

//======================================================================================================================
cc.GUIMultiJoys = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUIMsgBox";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();
        this.m_MainUI = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(blockLayer, -1);

        //
        this.m_MainUI = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back0.png");
        this.getWindow().addChild(this.m_MainUI);
        this.m_MainUI.setPosition(_ScreenCenter());

        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        var center = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back5.png");
        this.m_MainUI.addChild(center);
        center.setPosition(cc.p(mainSize.width/2, mainSize.height * 0.53));

        //
        var buttonConfirm = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_login_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_login_sel.png"),
            this._btnConfirmCallback, this);
        buttonConfirm.setPosition(cc.p(mainSize.width/2 + 80 * Defines.BASE_SCALE, 40 * Defines.BASE_SCALE));

        //
        var buttonCancel = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_return_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_return_sel.png"),
            this._btnCancelCallback, this);
        buttonCancel.setPosition(cc.p(mainSize.width/2 - 80 * Defines.BASE_SCALE, 40 * Defines.BASE_SCALE));

        //
        var menu = cc.Menu.create(buttonConfirm, buttonCancel);
        menu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(menu, 10000);

        //
        var msgContent = cc.LabelTTF.create(Resource.ChineseTxt["msg_login_1"], Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(msgContent);
        msgContent.setPosition(cc.p(mainSize.width/2, mainSize.height * 0.55));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnConfirmCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        this.closeWindow();

        cc.Director.getInstance().replaceScene(Scene_MainMenu.create());
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCancelCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        this.closeWindow();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);

        //
        this.getWindow().removeAllChildren(true);
        this.addContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        //
        this.getWindow().removeAllChildren(true);
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIMultiJoys._instance = null;
cc.GUIMultiJoys.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIMultiJoys();
        this._instance.init();
    }

    return this._instance;
};

//======================================================================================================================
var _NeedLogin = function()
{
    var joyFlags = _GetJoyFlags();
    if (joyFlags.length >= 2)
    {
        var runningScene = cc.Director.getInstance().getRunningScene();
        cc.GUIMultiJoys.getInstance().openWindow(runningScene);
    }
    else
    {
        _Login(joyFlags[0]);
    }
};