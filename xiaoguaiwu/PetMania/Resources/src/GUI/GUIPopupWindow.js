/**
 * TODO：新的弹框机制解决方案，弃用之前的窗口间通知机制，且旧的机制无法满足多重弹框
 * TODO：window和其上挂载的按钮触摸优先级都设置为-128，游戏内按钮就不要再设置到之上了，待重构
 */

/**
 * 继承一个cc.Layer 防止切换场景的时候调用不到GUIPopupWindow的closeWindow，无法删除其触摸优先级
 * 使用其onEnter和onExit来注册和删除其优先级
 */
//======================================================================================================================
cc.GUIPopupLayer = cc.Layer.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        cc.associateWithNative(this, cc.Layer);
    },

    //------------------------------------------------------------------------------------------------------------------
    onTouchBegan: function()
    {
        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    registerTouchHandle: function()
    {
        if (cc.Director.getInstance().getTouchDispatcher)
        {
            cc.Director.getInstance().getTouchDispatcher().
                addTargetedDelegate(this, cc.MENU_HANDLER_PRIORITY, true);
        }
        else
        {
            cc.registerTargettedDelegate(cc.MENU_HANDLER_PRIORITY, true, this);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    removeTouchHandle: function()
    {
        if (cc.Director.getInstance().getTouchDispatcher)
        {
            cc.Director.getInstance().getTouchDispatcher().removeDelegate(this);
        }
        else
        {
            cc.unregisterTouchDelegate(this);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    onEnter: function()
    {
        //cc.log("GUIPopupLayer------onEnter");
        this.registerTouchHandle();
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    onExit:function ()
    {
        //cc.log("GUIPopupLayer------onExit");
        this.removeTouchHandle();
        this._super();
    }
});

cc.GUIPopupLayer.create = function ()
{
    return new cc.GUIPopupLayer();
};

//======================================================================================================================
cc.GUIPopupWindow = cc.GUIWindow.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function ()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    description : function ()
    {
        return  "GUIPopupWindow";
    },

    //------------------------------------------------------------------------------------------------------------------
    //不使用cc.Layer
    init : function ()
    {
        this.m_WindowLayer = cc.GUIPopupLayer.create();
        this.m_WindowLayer.retain();

        cc.GUIWindowsManager.getInstance().registerWindow(this);
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});