
//======================================================================================================================
var MsgBox_LoginShare = IMsgBox.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super(true, false, true, this._parseTxt());
    },

    //------------------------------------------------------------------------------------------------------------------
    _parseTxt: function()
    {
        return _IsWeibo() ? Resource.ChineseTxt["msg_login_share_0"] : Resource.ChineseTxt["msg_login_share_1"];
    },

    //------------------------------------------------------------------------------------------------------------------
    handleConfirm: function(guiWindow)
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        guiWindow.closeWindow();

        //
        ShareMng.getInstance().setCanBonus(true);
        ShareMng.getInstance().shareWithLoginFinish();

        ShareMng.getInstance().cleanup();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleCancel: function(guiWindow)
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        guiWindow.closeWindow();
        return this;
    }
});

//----------------------------------------------------------------------------------------------------------------------
MsgBox_LoginShare.openWindow = function(render)
{
    cc.GUIMsgBox.getInstance().openWindow(render, new MsgBox_LoginShare());
};

//----------------------------------------------------------------------------------------------------------------------
MsgBox_LoginShare.canOpen = function()
{
    //微薄、人人、Facebook登录后可分享
    if (!_IsWeibo() && !_IsRenren() && !_IsFacebook())
    {
        return false;
    }

    //只弹出位置只有首屏和地图
    var runningScene = cc.Director.getInstance().getRunningScene();
    var isMainMenu = runningScene instanceof Scene_MainMenu;
    var isMainMap = runningScene instanceof Scene_MainMap;
    return isMainMenu || isMainMap;
};

