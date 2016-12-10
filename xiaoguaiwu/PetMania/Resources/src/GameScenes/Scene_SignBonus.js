var Scene_SignBonus = cc.Scene.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        cc.associateWithNative(this, cc.Scene);
        //
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Scene_SignBonus";
    },

    //------------------------------------------------------------------------------------------------------------------
    onEnter: function()
    {
        this._super();
        cc.GUISignBonus.getInstance().openWindow(this);
    },

    //------------------------------------------------------------------------------------------------------------------
    onExit: function()
    {
        this._super();
        cc.log("离开 Scene_SignBonus 场景  **********************");
        this.removeAllChildren(true);
        return this;
    }
});

//
Scene_SignBonus.create = function()
{
    var newScene = new Scene_SignBonus();
    return newScene;
};

Scene_SignBonus.changeTo = function()
{
    //cc.DataMng.getDataSignIn().resetNewDay();
    cc.Director.getInstance().replaceScene(Scene_SignBonus.create());
};

Scene_SignBonus.canChangeTo = function()
{
    if (!NodeTime.getInstance().fuzzyMatchingServerTime(60 * 60 * 1000))
    {
        return false;
    }
	
	cc.log("cc.DataMng.getDataSignIn().isServerError() = " + cc.DataMng.getDataSignIn().isServerError());
	
    return cc.NodeSelf.getInstance().isLogin() && !cc.DataMng.getDataSignIn().isSignedToday() && !cc.DataMng.getDataSignIn().isServerError();
};