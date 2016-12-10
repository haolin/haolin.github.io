
//======================================================================================================================
var Scene_Roulette = cc.Scene.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(loadingHandler)
    {
        //
        this._super();
        cc.associateWithNative(this, cc.Scene);
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Scene_Roulette";
    },

    //------------------------------------------------------------------------------------------------------------------
    onEnter: function()
    {
        this._super();

        cc.GUIRoulette.getInstance().openWindow(this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    onExit: function()
    {
        this._super();

        cc.GUIRoulette.getInstance().closeWindow(this);
        this.removeAllChildren(true);
        return this;
    }
});

//
Scene_Roulette.create = function()
{
    return new Scene_Roulette();
};

//
var _CanChangeToRoulette = function()
{
    return true;
};

//
var _ToSceneRoulette = function()
{
    cc.Director.getInstance().replaceScene(Scene_Roulette.create());
};


