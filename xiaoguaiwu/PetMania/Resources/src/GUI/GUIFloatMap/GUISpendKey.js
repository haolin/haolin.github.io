
//================================================ GUISpendKey =========================================================
cc.GUISpendKey = cc.GUIWindow.extend ({

    description: function ()
    {
        return "GUISpendKey";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        this.m_MainUI = null;
        this.m_LevelData = null;
        this.m_NeddKeys = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function ()
    {
        this._super();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function ()
    {
        //
        this.m_MainUI = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back0.png");
        this.getWindow().addChild(this.m_MainUI);
        this.m_MainUI.setPosition(_ScreenCenter());

        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        var backFrame = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back5.png");
        this.m_MainUI.addChild(backFrame);
        backFrame.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.53));

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(mainSize.width - 25 * Defines.BASE_SCALE, mainSize.height - 25 * Defines.BASE_SCALE));

        //
        var buttonSpend = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_temp_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_temp_sel.png"),
            this._btnSpendCallback, this);
        buttonSpend.setPosition(cc.p(mainSize.width * 0.5, 45 * Defines.BASE_SCALE));

        //
        var menu = cc.Menu.create(buttonClose, buttonSpend);
        menu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(menu);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback:function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        this.closeWindow();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnSpendCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        this.closeWindow();

        //
        if (!cc.DataMng.getFloatLevel().spendFloatKey(this.m_NeddKeys))
        {
            Scene_Shop.changeTo(GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND, this.m_LevelData.NAME);
            return this;
        }

        //
        cc.GUIFloatMap.getInstance().handleFloatLeaveAction(true);

        //
        var myScene = this.getWindow().getParent();
        cc.GUIGameLevelStart.getInstance().openWindow(myScene, this.m_LevelData);
        cc.GUIGameLevelStart.getInstance().handleStartEnterAction(true);

        //
        if(!isTelcomOperators()&& cc.NodeSelf.getInstance().isLogin())
        {
            cc.GUIMyFriendsTop.getInstance().openWindow(myScene, cc.GUIGameLevelStart.getInstance());
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, levelData, needKeys)
    {
        this._super(render);

        //
        cc.AudioMng.getInstance().playOpenWindow();

        //
        this.m_LevelData = levelData;
        this.m_NeddKeys = needKeys;

        //
        this.addContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        //
        cc.AudioMng.getInstance().playCloseWindow();

        //
        this.getWindow().removeAllChildren(true);

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUISpendKey._instance = null;
cc.GUISpendKey.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUISpendKey();
        this._instance.init();
    }

    return this._instance;
};