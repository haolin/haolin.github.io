
cc.MENU_STATE_WAITING = 0;
cc.MENU_STATE_TRACKING_TOUCH = 1;

cc.GUIMenu = cc.Layer.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        cc.associateWithNative(this, cc.Layer);

        //
        this.m_State = cc.MENU_STATE_WAITING;
        this.m_SelectedItem = null;

        //拖动禁止响应判断
        this.m_ForceActivate = false;
        this.m_MovedDistance = cc.p(0, 0);

        this.m_ForceLength = 0;

        //触摸优先级
        this.m_Priority = cc.MENU_HANDLER_PRIORITY;
        this.m_SwallowTouch = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    initWithItems: function(args)
    {
        if (args)
        {
            for (var index = 0; index < args.length; index++)
            {
                if (args[index])
                {
                    this.addChild(args[index]);
                }
            }
        }

        //
        this.setTouchEnabled(true);
        this.setEnabled(true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isEnabled:function ()
    {
        return this.m_Enabled;
    },

    //------------------------------------------------------------------------------------------------------------------
    setEnabled:function (enabled)
    {
        this.m_Enabled = enabled;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setForceLength: function(length)
    {
        this.m_ForceLength = length;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setTouchHandle: function(priority, swallowTouch)
    {
        //cc.Assert(!this.getParent(), "GUIMenu setTouchHandle need before add to parent!");
        if (this.getParent())
        {
            cc.log("[Warn] GUIMenu setTouchHandle need before add to parent!");
        }

        this.m_Priority = priority;
        this.m_SwallowTouch = swallowTouch;
    },

    //------------------------------------------------------------------------------------------------------------------
    onTouchBegan:function (touch)
    {
        if (this.m_State != cc.MENU_STATE_WAITING || !this.isVisible() || !this.m_Enabled)
        {
            return false;
        }

        for (var parent = this.getParent(); parent != null; parent = parent.getParent())
        {
            if (!parent.isVisible())
            {
                return false;
            }
        }

        //
        this.m_SelectedItem = this.itemForTouch(touch);

        if (this.m_SelectedItem)
        {
            this.m_State = cc.MENU_STATE_TRACKING_TOUCH;
            //1
            this.m_SelectedItem.selected();

            return true;
        }

        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    onTouchMeeoved:function (touch)
    {
        if (this.m_State != cc.MENU_STATE_TRACKING_TOUCH)
        {
            cc.log("[Menu onTouchMoved] -- invalid state");
        }

        if (!this.m_SelectedItem)
        {
            return this;
        }

        //判断拖动区域
        if (this.m_ForceLength > 0 && !this.m_ForceActivate)
        {
            var delta = touch.getDelta();
            this.m_MovedDistance = cc.pAdd(this.m_MovedDistance, delta);

            var checkDis = this.m_ForceLength;

            if (Math.abs(this.m_MovedDistance.x) > checkDis || Math.abs(this.m_MovedDistance.y) > checkDis)
            {
                this.m_ForceActivate = true;
            }
        }

        var currentItem = this.itemForTouch(touch);

        if (currentItem != this.m_SelectedItem)
        {
            if (this.m_SelectedItem)
            {
                this.m_SelectedItem.unselected();
                this.m_SelectedItem = null;
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    onTouchEnded:function ()
    {
        if (this.m_State != cc.MENU_STATE_TRACKING_TOUCH)
        {
            cc.log("[Menu onTouchEnded] -- invalid state");
        }

        if (this.m_SelectedItem)
        {
            this.m_SelectedItem.unselected();

            if (!this.m_ForceActivate)
            {
                this.m_SelectedItem.activate();
            }

            this.m_SelectedItem = null;
        }

        //
        this.m_State = cc.MENU_STATE_WAITING;
        this.m_ForceActivate = false;
        this.m_MovedDistance = cc.p(0, 0);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    onTouchCancelled:function ()
    {
        if (this.m_State != cc.MENU_STATE_TRACKING_TOUCH)
        {
            cc.log("[Menu onTouchCancelled] -- invalid state");
        }

        if (this.m_SelectedItem)
        {
            this.m_SelectedItem.unselected();
            this.m_SelectedItem = null;
        }

        //
        this.m_State = cc.MENU_STATE_WAITING;
        this.m_ForceActivate = false;
        this.m_MovedDistance = cc.p(0, 0);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    registerTouchHandle: function()
    {
        if (cc.Director.getInstance().getTouchDispatcher)
        {
            cc.Director.getInstance().getTouchDispatcher().
                addTargetedDelegate(this, this.m_Priority, this.m_SwallowTouch);
        }
        else
        {
            cc.registerTargettedDelegate(this.m_Priority, this.m_SwallowTouch, this);
        }
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
    },

    //------------------------------------------------------------------------------------------------------------------
    onEnter: function()
    {
        //cc.log("GUIMenu------onEnter");

        this.registerTouchHandle();
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    onExit:function ()
    {
        this.cleanupHandleData();

        //cc.log("GUIMenu------onExit");
        this.removeTouchHandle();
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanupHandleData: function()
    {
        if (this.m_State == cc.MENU_STATE_TRACKING_TOUCH)
        {
            this.m_SelectedItem.unselected();
            this.m_State = cc.MENU_STATE_WAITING;
            this.m_SelectedItem = null;

            //
            this.m_ForceActivate = false;
            this.m_MovedDistance = cc.p(0, 0);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    itemForTouch:function (touch)
    {
        var itemChildren = this.getChildren();
        if (!itemChildren || itemChildren.length <= 0)
        {
            return null;
        }

        var touchLocation = touch.getLocation();

        for (var index = 0; index < itemChildren.length; index++)
        {
            if (itemChildren[index].isVisible() && itemChildren[index].isEnabled())
            {
                var local = this.convertToNodeSpace(touchLocation);
                var bound = itemChildren[index].getBoundingBox();
                if (cc.rectContainsPoint(bound, local))
                {
                    return itemChildren[index];
                }
            }
        }

        return null;
    }

    //------------------------------------------------------------------------------------------------------------------
});


cc.GUIMenu.create = function ()
{
    var createNew = new cc.GUIMenu();
    createNew.init();
    createNew.initWithItems(arguments);
    return createNew;
};
