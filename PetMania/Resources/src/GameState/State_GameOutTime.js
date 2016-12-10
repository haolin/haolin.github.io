

//======================================================================================================================
cc.State_GameOutTime = cc.IState.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "State_GameOutTime";
    },

    //------------------------------------------------------------------------------------------------------------------
    //进入这个State
    enter: function(/*wrapper, fromState*/)
    {
//		if (cc.DataMng.getInstance().getGameContinueCount() >= 1){
		cc.GUIGameOutMoves.getInstance().openWindow(_GUILayer());
//		}
//		else {
//			cc.GUIBuyDiamond.getInstance().openWindow(_GUILayer(), 0, GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE);
//		}
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //离开这个State
    leave: function(/*wrapper*/)
    {
        cc.GUIGameOutMoves.getInstance().closeWindow();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    update: function(/*wrapper, time*/)
    {
        return this;
    }
});

cc.State_GameOutTime._instance = null;
cc.State_GameOutTime.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.State_GameOutTime();
        //cc.GameManager.getInstance().registerState(this._instance);
    }

    return this._instance;
};