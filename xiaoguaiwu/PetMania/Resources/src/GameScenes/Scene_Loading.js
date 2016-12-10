
//======================================================================================================================
var Scene_Loading = cc.Scene.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(loadingHandler)
    {
        //
        this._super();
        cc.associateWithNative(this, cc.Scene);

        //
        this._loadingHandler = loadingHandler;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Scene_Loading";
    },

    //------------------------------------------------------------------------------------------------------------------
    onEnter: function()
    {
        this._super();

        if (this._loadingHandler)
        {
            this._loadingHandler.onEnter(this);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    onExit: function()
    {
        this._super();

        if (this._loadingHandler)
        {
            this._loadingHandler.onExit(this);
        }

        this.removeAllChildren(true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //更新
    update: function (time)
    {
        if (this._loadingHandler)
        {
            this._loadingHandler.update(this, time);
        }

        return this;
    }
});

//
Scene_Loading.create = function(loadingHandler)
{
    var newScene = new Scene_Loading(loadingHandler);
    if (newScene)
    {
        newScene.unscheduleAllCallbacks();
        newScene.schedule(newScene.update, Defines.FPS);
    }

    return newScene;
};

//
Scene_Loading.createToMainMenu = function()
{
    cc.log("创建 Scene_Loading.createToMainMenu");
    return Scene_Loading.create(
        new LoadHandler_ToMainMenu(Defines.FPS * 5)
    );
};

//
Scene_Loading.createToMap = function(appendWindow, autoStartKey)
{
    //
    cc.log("创建 Scene_Loading.createToMap");
    return Scene_Loading.create(
        new LoadHandler_ToMap(appendWindow, autoStartKey)
    );
};


