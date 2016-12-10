
//======================================================================================================================
var MsgBox_ServerSync = IMsgBox.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super(true, true, false, Resource.ChineseTxt[101]);
    },

    //------------------------------------------------------------------------------------------------------------------
    handleConfirm: function(guiWindow)
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        guiWindow.closeWindow();

        //禁用大地图的所有按钮

        cc.GUIMap.getInstance().setZonesEnabled(false);

        //
        GameLogoutOperation.create();
        return this;
    }

});

MsgBox_ServerSync.openWindow = function(render)
{
    cc.GUIMsgBox.getInstance().openWindow(render, new MsgBox_ServerSync());
};

