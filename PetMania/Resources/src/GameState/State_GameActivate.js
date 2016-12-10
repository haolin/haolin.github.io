
//======================================================================================================================
cc.State_GameActivate = cc.IState.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "State_GameActivate";
    },

    //------------------------------------------------------------------------------------------------------------------
    enter: function(/*wrapper, fromState*/)
    {
        cc.GUIGameActivate.getInstance().openWindow(_GUILayer());
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    leave: function(/*wrapper*/)
    {
        cc.GUIGameActivate.getInstance().closeWindow();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    update: function(/*wrapper, time*/)
    {
        return this;
    }
});


cc.State_GameActivate._instance = null;
cc.State_GameActivate.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.State_GameActivate();
    }

    return this._instance;
};