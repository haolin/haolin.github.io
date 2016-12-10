

//======================================================================================================================
cc.State_GameOutMoves = cc.IState.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        this.m_EverShuffle = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this.m_EverShuffle = false;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "State_GameOutMoves";
    },

    //------------------------------------------------------------------------------------------------------------------
    //进入这个State
    enter: function(wrapper, fromState)
    {
        var openGUI = false;

        //
        var hasAny = cc.Cmd_Prompt.any(wrapper.getGameLevel());
        if (hasAny)
        {
            openGUI = true;
        }
        else
        {
            if (!this.m_EverShuffle)
            {
                //给玩家一次机会
                wrapper.changeTo(fromState);
                /*fromState.m_GameLevel*/wrapper.getGameLevel().addCommand(cc.Cmd_Shuffle.create());
                this.m_EverShuffle = true;
            }
            else
            {
                openGUI = true;
            }
        }

        //
        if (openGUI)
        {
//			if (cc.DataMng.getInstance().getGameContinueCount() >= 1){
			cc.GUIGameOutMoves.getInstance().openWindow(_GUILayer());
//			}
//			else {
//				cc.GUIBuyDiamond.getInstance().openWindow(_GUILayer(), 0, GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE);
//			}
			//
        }

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //离开这个State
    leave: function()
    {
        cc.GUIGameOutMoves.getInstance().closeWindow();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    update: function(wrapper, time)
    {
        this._super(wrapper, time);
        return this;
    }
});

cc.State_GameOutMoves._instance = null;
cc.State_GameOutMoves.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.State_GameOutMoves();
    }

    return this._instance;
};