
//======================================================================================================================
cc.GUIWindow = cc.Class.extend ({

    GLOBAL_WINDOW_ID: 0,

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "GUIWindow";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_WindowLayer = null;
        this.m_WindowID = cc.GUIWindow.prototype.GLOBAL_WINDOW_ID++;
    },

    //------------------------------------------------------------------------------------------------------------------
    getWindowID: function()
    {
        return this.m_WindowID;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this.m_WindowLayer = cc.Layer.create();
        this.m_WindowLayer.retain();

        cc.GUIWindowsManager.getInstance().registerWindow(this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //释放资源;
    release: function()
    {
        if (this.m_WindowLayer)
        {
            this.m_WindowLayer.removeFromParent(true);
            this.m_WindowLayer.release();
            this.m_WindowLayer = null;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this.render(render);

        if (this.m_WindowLayer)
        {
            this.m_WindowLayer.setVisible(true);
        }
        cc.GUIWindowsManager.getInstance().notifyOpenWindow(this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        if(cc.NodeSelf.getInstance().isLogin())
        {
            MailMng.getInstance().loadMails();
        }
        if (this.m_WindowLayer)
        {
            this.m_WindowLayer.removeFromParent(true);
            this.m_WindowLayer.setVisible(false);
        }

        cc.GUIWindowsManager.getInstance().notifyCloseWindow(this);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isWindowOpen: function()
    {
        return this.m_WindowLayer && this.m_WindowLayer.getParent() && this.m_WindowLayer.isVisible();
    },

    //------------------------------------------------------------------------------------------------------------------
    getWindow: function()
    {
        return this.m_WindowLayer;
    },

    //------------------------------------------------------------------------------------------------------------------
    render: function(_render)
    {
        if (!_render)
        {
            cc.log(0, "GUIWindow !_render");
        }

        //
        var render = _render || cc.Director.getInstance().getRunningScene();
        if (render && this.m_WindowLayer)
        {
            var parent = this.m_WindowLayer.getParent();
            if (parent)
            {
                this.m_WindowLayer.removeFromParent(true);
            }

            render.addChild(this.m_WindowLayer, 0, this.getWindowID());
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifiedUpdate: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyOpenWindow: function(window)
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyCloseWindow: function(window)
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyAppActive: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyAppDisactive: function()
    {
        return this;
    }
});

//======================================================================================================================
cc.GUIWindowsManager = cc.Class.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "GUIWindowsManager";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_RegisterWindows = {};
        this.m_OpenWindows = {};
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        for (var prop in this.m_RegisterWindows)
        {
            if (!this.m_RegisterWindows.hasOwnProperty(prop))
            {
                continue;
            }

            if (!(this.m_RegisterWindows[prop] instanceof cc.GUIWindow))
            {
                continue;
            }

            this.m_RegisterWindows[prop].release();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    registerWindow: function(window)
    {
        if (!window || !(window instanceof cc.GUIWindow) || !window.description)
        {
            cc.Assert(0, "if (!window || !(window instanceof cc.GUIWindow))");
            return this;
        }

        var windName = window.description();
        this.m_RegisterWindows[windName] = window;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isRegister: function(window)
    {
        if (!window || !(window instanceof cc.GUIWindow) || !window.description)
        {
            cc.Assert(0, "isRegister: function(window)");
            return null;
        }

        return this.m_RegisterWindows[window.description()];
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyOpenWindow: function(window)
    {
        if (!this.isRegister(window))
        {
            return this;
        }

        this.m_OpenWindows[window.description()] = window;

        for (var windowName in this.m_OpenWindows)
        {
            if (!this.m_OpenWindows.hasOwnProperty(windowName))
            {
                continue;
            }

            var openWindow = this.m_OpenWindows[windowName];
            if (openWindow)
            {
                openWindow.notifyOpenWindow(window);
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyCloseWindow: function(window)
    {
        if (!this.isRegister(window))
        {
            return this;
        }

        //
        delete this.m_OpenWindows[window.description()];

        //
        for (var windowName in this.m_OpenWindows)
        {
            if (!this.m_OpenWindows.hasOwnProperty(windowName))
            {
                continue;
            }

            var openWindow = this.m_OpenWindows[windowName];
            if (openWindow)
            {
                openWindow.notifyCloseWindow(window);
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyAllWindowsAppActive: function()
    {
        if (cc.Director.getInstance().getRunningScene() instanceof Scene_MainMap)
        {
            cc.log("当前场景是大地图场景 就要重新激活一下cc.GUIMap");
            cc.GUIMap.getInstance().notifyAppActive();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyAllWindowsAppDisactive: function()
    {
        if (cc.Director.getInstance().getRunningScene() instanceof Scene_GameLevel)
        {
            cc.log("当前是Scene_GameLevel 场景 需要做暂停处理");
            cc.GUIGameLevel.getInstance().notifyAppDisactive();
        }
		if (Define_SysConfig.getInstance().isADEnable()){
			adManage.AdManage.getInstance().startPunchBox(Defines.PunchBoxID);
			adManage.AdManage.getInstance().queryRewardCoin();
		}
		
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyAllWindowsLogin: function(first)
    {
        if (cc.GUIMainMenu.getInstance().isWindowOpen())
        {
            cc.GUIMainMenu.getInstance().updateLoginButton();
        }

        if (cc.GUIMap.getInstance().isWindowOpen())
        {
            cc.GUIMap.getInstance().updatePlayerContent();
        }

        //首次登陆分享
        if (first && MsgBox_LoginShare.canOpen())
        {
            MsgBox_LoginShare.openWindow(cc.Director.getInstance().getRunningScene());
        }

        return this;
    }
});

cc.GUIWindowsManager._instance = null;
cc.GUIWindowsManager.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIWindowsManager();
        this._instance.init();
    }

    return this._instance;
};