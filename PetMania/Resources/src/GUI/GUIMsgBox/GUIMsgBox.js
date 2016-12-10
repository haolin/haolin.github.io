
//======================================================================================================================
cc.GUIMsgBox = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUIMsgBox";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        this.m_BackGround = null;
        this.m_ConfirmButton = null;
        this.m_CancelButton = null;
        this.m_CloseButton = null;
        this.m_MsgContent = null;

        //
        this.m_IMsgBox = null;
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
        this.m_BackGround = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back0.png");
        this.getWindow().addChild(this.m_BackGround);
        this.m_BackGround.setPosition(_ScreenCenter());

        //
        var center = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back5.png");
        this.m_BackGround.addChild(center);
        center.setPosition(cc.p(this.m_BackGround.getContentSize().width/2, this.m_BackGround.getContentSize().height * 0.53));

        //
        this.m_CloseButton = GUI._AddCloseButton(
            this.m_BackGround,
            function()
            {
                this.m_IMsgBox.handleClose(this);
            },
            this);

        //
        this.m_ConfirmButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_sel.png"),
            function()
            {
                this.m_IMsgBox.handleConfirm(this);
            },
            this);

        this.m_ConfirmButton.setPosition(
            cc.p(this.m_BackGround.getContentSize().width/2 + 80 * Defines.BASE_SCALE,
                40 * Defines.BASE_SCALE)
        );

        //
        this.m_CancelButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_cancel_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_cancel_sel.png"),
            function()
            {
                this.m_IMsgBox.handleCancel(this);
            },
            this);

        this.m_CancelButton.setPosition(
            cc.p(this.m_BackGround.getContentSize().width/2 - 80 * Defines.BASE_SCALE,
                40 * Defines.BASE_SCALE));

        //
        var menu = cc.Menu.create(this.m_ConfirmButton, this.m_CancelButton);
        menu.setPosition(cc.p(0, 0));
        this.m_BackGround.addChild(menu, 10000);

        //
        this.m_MsgContent = cc.LabelTTF.create("", Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        center.addChild(this.m_MsgContent);
        this.m_MsgContent.setAnchorPoint(cc.p(0.5, 0.5));
        this.m_MsgContent.setPosition(cc.p(center.getContentSize().width/2, center.getContentSize().height/2));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, _IMsgBox)
    {
        this._super(render);
        this.m_IMsgBox = _IMsgBox;

        //
        this.getWindow().removeAllChildren(true);
        this.addContent();

        //
        if (this.m_IMsgBox)
        {
            this.m_IMsgBox.modify(this);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        //
        this.getWindow().removeAllChildren(true);
        this.m_IMsgBox = null;
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIMsgBox._instance = null;
cc.GUIMsgBox.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIMsgBox();
        this._instance.init();
    }

    return this._instance;
};



