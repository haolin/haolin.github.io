
//======================================================================================================================
var IMsgBox = cc.Class.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(_addConfirm, _addCancel, _addClose, _content)
    {
        this._addConfirm = _addConfirm;
        this._addCancel = _addCancel;
        this._addClose = _addClose;
        this._content = _content;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "IMsgBox";
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return this.description();
    },

    //------------------------------------------------------------------------------------------------------------------
    modify: function(guiWindow)
    {
        guiWindow.m_ConfirmButton.setVisible(this._addConfirm);
        guiWindow.m_CancelButton.setVisible(this._addCancel);
        guiWindow.m_CloseButton.setVisible(this._addClose);

        var both = this._addConfirm && this._addCancel;
        if (!both)
        {
            var centerBtn =  this._addConfirm ? guiWindow.m_ConfirmButton : guiWindow.m_CancelButton;
            centerBtn.setPosition(cc.p(guiWindow.m_BackGround.getContentSize().width/2, 35 * Defines.BASE_SCALE));
        }

        guiWindow.m_MsgContent.setString(this._content);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function(_content)
    {
        this._content = _content;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleConfirm: function(guiWindow)
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleCancel: function(guiWindow)
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        guiWindow.closeWindow();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleClose: function(guiWindow)
    {
        return this.handleCancel(guiWindow);
    }

    //------------------------------------------------------------------------------------------------------------------
});

