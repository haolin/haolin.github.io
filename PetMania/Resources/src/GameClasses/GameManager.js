//======================================================================================================================
cc.GameManager = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        //
        this.m_GameTimers = [];
        this.m_GameTimersFinder = {};
        this.m_GameTimerGroup = null;
		this.m_GameTimerAD = null;
        this.m_CurrentAppActive = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        cc.log("GameManager init");

        //默认必须添加这个时钟
        this.m_GameTimerGroup = GameTimer_Group.create();
		
		this.m_GameTimerAD = GameTimer_AD.create();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getGameTimerGroup: function()
    {
        return this.m_GameTimerGroup;
    },
	
    //------------------------------------------------------------------------------------------------------------------
    getGameTimerAD: function()
    {
        return this.m_GameTimerAD;
    },
	
    //------------------------------------------------------------------------------------------------------------------
    update: function(time)
    {
        //
        this.updateMyTimers(time);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateMyTimers: function(dt)
    {
        //
        this.m_GameTimerGroup.update(dt);

        //广告的全局计时器
		this.m_GameTimerAD.update(dt);

        //
        this.m_GameTimers.forEach(
            function(a_timer)
            {
                a_timer.update(dt);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addGameTimer: function(newTimer)
    {
        this.m_GameTimers.push(newTimer);
        this.m_GameTimersFinder[newTimer.description()] = newTimer;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getGameTimers: function()
    {
        return this.m_GameTimers;
    },

    //------------------------------------------------------------------------------------------------------------------
    isCurrentGameLevel: function()
    {
        return cc.Director.getInstance().getRunningScene() instanceof Scene_GameLevel;
    },

    //------------------------------------------------------------------------------------------------------------------
    isCurrentMainMap: function()
    {
        return cc.Director.getInstance().getRunningScene() instanceof Scene_MainMap;
    },

    //------------------------------------------------------------------------------------------------------------------
    getGameTimerByDescription: function(description)
    {
        return this.m_GameTimersFinder[description];
    },

    //------------------------------------------------------------------------------------------------------------------
    appActive: function()
    {
        this.m_CurrentAppActive = true;
        return this.isAppActive();
    },

    //------------------------------------------------------------------------------------------------------------------
    appDeactive: function()
    {
        this.m_CurrentAppActive = false;
        return this.isAppActive();
    },

    //------------------------------------------------------------------------------------------------------------------
    isAppActive: function()
    {
        return this.m_CurrentAppActive;
    }

    //------------------------------------------------------------------------------------------------------------------

});

//单件模式
cc.GameManager._instance = null;
cc.GameManager.getInstance = function()
{
    if (!this._instance)
    {
        //
        this._instance = new cc.GameManager();
        this._instance.init();

        //添加4个时钟
        if (!isTelcomOperators())
        {
            this._instance.addGameTimer(NodeSelfTimer.create());
        }

        this._instance.addGameTimer(DataMngNotifyTimer.create());
        this._instance.addGameTimer(BITimer.create());
        this._instance.addGameTimer(GameTimer_Pay.create());
    }

    return this._instance;
};

//======================================================================================================================
var _StartGame = function(test)
{
    //
    cc.Director.getInstance().setAnimationInterval(Defines.FPS);
    cc.Director.getInstance().setDisplayStats(false);

    //
    NodeTime.getInstance().startLocalTime();

    //添加效果的控制
    Defines.LOW_PERFORMANCE = Define_SysConfig.getInstance().isSysLowDevice();

    //启动NodeHelper
   /* if (!isTelcomOperators())
    {
        cc.NodeHelper.getInstance().onInitGame(ROBOT_IMEI);
        if (_IsNetWorkEnable())
        {
            cc.log("_StartGame 启动逻辑 检测网络, 有网络连接 = " + netWorkType);
            cc.NodeHelper.getInstance().onNetworkConnect();
        }
        else
        {
            cc.log("_StartGame 启动逻辑 检测网络, 没有网络连接");
        }
    }*/

    //
    cc.GameManager.getInstance().appActive();

    //
    var interval = Defines.FPS;
    var repeat = cc.REPEAT_FOREVER;
    var delay = 0;
    var paused = false;
    cc.Director.getInstance().getScheduler().scheduleCallbackForTarget(
        cc.GameManager.getInstance(),
        cc.GameManager.getInstance().update,
        interval,
        repeat,
        delay,
        paused);

    //
    if (test)
    {
        //测试大转盘场景
        //_ToSceneRoulette();

        //测试场景
        //cc.Director.getInstance().runWithScene(Scene_Test.create());

        //直接进入 测试某个关卡
        //cc.DataMng.getInstance().setCurLevelData(cc.DataMng.getInstance().getLevelDataWithName("LEVEL_8"));
        //Scene_GameLevel.changeTo();
    }
    else
    {
        cc.Director.getInstance().runWithScene(Scene_Loading.createToMainMenu());
    }
};

//----------------------------------------------------------------------------------------------------------------------
var _CloseCOCOLogo = function(delayTime)
{
    if (Defines.PLATFORM.isMobile())
    {
        cc.log("_CloseCOCOLogo = " + delayTime);
        noticeJaveHandler(1, delayTime.toString());
    }
};

//----------------------------------------------------------------------------------------------------------------------
var handlePressBackKey = function()
{
    if (_GetCurGameLevelState() instanceof cc.State_GameGuide)
    {
        showMessageToast(Resource.ChineseTxt["msg_4"]);
        return true;
    }

    if (!(_GetCurGameLevelState() instanceof cc.State_GameLevel))
    {
        return false;
    }

    cc.GUIGameLevel.getInstance().getPauseButton().activate();
    return true;
};
//----------------------------------------------------------------------------------------------------------------------
var _LogoutFlag = false;
var _RefuseAutoLogin = false;
var _AutoLogin = function()
{
    if (Defines.PLATFORM.isBrowser())
    {
        return;
    }

    var curJoyFlag = cc.DataMng.getInstance().getCurJoyFlag();
    var ok = !isTelcomOperators() && !cc.NodeSelf.getInstance().isLogin() && curJoyFlag >= 0;
    if (ok)
    {
        joyCommon.getInstance().isAutoLogin(
            function()
            {
                if (!_RefuseAutoLogin)
                {
                    _Login(curJoyFlag, true);
                }
            },
            function()
            {
                //
                cc.log("自动登录失败");
            },
            curJoyFlag
        );
    }
};


