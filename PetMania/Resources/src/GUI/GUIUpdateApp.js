
//============================================= GUIUpdateApp =================================================
cc.GUIUpdateApp = cc.GUIPopupWindow.extend ({

    description: function ()
    {
        return "GUIUpdateApp";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        this.m_MainUI = null;
        this.m_OptionLayer = null;
        this.m_ProgressLayer = null;
        this.m_FinishLayer = null;
        this.m_FailedLayer = null;

        this.m_ProgressBar = null;
        this.m_LabelProgress = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        cc.log("进入内更新");

        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(blockLayer, -1);

        //
        this.m_MainUI = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back0.png");
        this.getWindow().addChild(this.m_MainUI);
        this.m_MainUI.setPosition(cc.p(_ScreenWidth() * 0.5, _ScreenHeight() * 0.5));

        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        var backFrame = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back5.png");
        this.m_MainUI.addChild(backFrame);
        backFrame.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.53));

        //
        var labelVersion = cc.LabelTTF.create("V" + GAME_VERSION + "-" + RES_VERSION, Defines.DefaultFont, 15 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelVersion);
        labelVersion.setPosition(cc.p(mainSize.width * 0.5, 115 * Defines.BASE_SCALE));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentForOption: function()
    {
        cc.log("选择是否更新！");

        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        this.m_OptionLayer = cc.Layer.create();
        this.m_OptionLayer.setContentSize(mainSize);
        this.m_MainUI.addChild(this.m_OptionLayer);

        //
        var labelTitle = cc.LabelTTF.create(Resource.ChineseTxt["update_title_0"], Defines.DefaultFont, 28 * Defines.BASE_SCALE);
        this.m_OptionLayer.addChild(labelTitle);
        labelTitle.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.9));

        //
        var strDesc = updateContentByCurrentVersion;
        strDesc = (!strDesc || strDesc == "") ? Resource.ChineseTxt["update_desc_0"] : strDesc;
        var labelDesc = cc.LabelTTF.create(strDesc, Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        this.m_OptionLayer.addChild(labelDesc);
        labelDesc.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.55));

        //
        var confirmButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_sel.png"),
            this._btnStartUpdateCallback, this);
        confirmButton.setPosition(cc.p(mainSize.width/2 + 80 * Defines.BASE_SCALE, 50 * Defines.BASE_SCALE));

        var confirmLabel = cc.LabelTTF.create(Resource.ChineseTxt["update_name_0"], Defines.DefaultFont, 16 * Defines.BASE_SCALE);
        this.m_OptionLayer.addChild(confirmLabel);
        confirmLabel.setPosition(cc.p(mainSize.width/2 + 80 * Defines.BASE_SCALE, 15 * Defines.BASE_SCALE));

        //
        var cancelButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_cancel_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_cancel_sel.png"),
            this._btnCancelCallback, this);
        cancelButton.setPosition(cc.p(mainSize.width/2 - 80 * Defines.BASE_SCALE, 50 * Defines.BASE_SCALE));

        //
        var menu = cc.Menu.create(confirmButton, cancelButton);
        menu.setPosition(cc.p(0, 0));
        this.m_OptionLayer.addChild(menu, 10000);

        //强制更新的处理
        if (updateMissionForce)
        {
            cancelButton.setVisible(false);
            confirmButton.setPositionX(mainSize.width/2);
            confirmLabel.setPositionX(mainSize.width/2);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentForProgress: function()
    {
        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        this.m_ProgressLayer = cc.Layer.create();
        this.m_ProgressLayer.setContentSize(mainSize);
        this.m_MainUI.addChild(this.m_ProgressLayer);

        //
        var labelTitle = cc.LabelTTF.create(Resource.ChineseTxt["update_title_1"], Defines.DefaultFont, 28 * Defines.BASE_SCALE);
        this.m_ProgressLayer.addChild(labelTitle);
        labelTitle.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.9));

        //
        var backButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_sel.png"),
            this._btnUpdateBackCallback, this);
        backButton.setPosition(cc.p(mainSize.width/2, 50 * Defines.BASE_SCALE));

        //
        var menu = cc.Menu.create(backButton);
        menu.setPosition(cc.p(0, 0));
        this.m_ProgressLayer.addChild(menu, 10000);

        //
        this.m_ProgressBar = cc.ProgressTimer.create(cc.Sprite.create(_GUIPath + "GUINewGeneral/progress_bar.png"));
        this.m_ProgressLayer.addChild(this.m_ProgressBar);
        this.m_ProgressBar.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.55));
        this.m_ProgressBar.setRotation(90);
        this.m_ProgressBar.setScaleY(0.65);

        this.m_ProgressBar.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        this.m_ProgressBar.setMidpoint(cc.p(0, 0));
        this.m_ProgressBar.setBarChangeRate(cc.p(0, 1));

        //下载数
        var strDesc = this._getDownloadDesc();
        this.m_LabelProgress = cc.LabelTTF.create(strDesc, Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        this.m_ProgressLayer.addChild(this.m_LabelProgress);
        this.m_LabelProgress.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.45));

        //强制更新的处理
        if (updateMissionForce)
        {
            backButton.setVisible(false);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentForFinish: function()
    {
        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        this.m_FinishLayer = cc.Layer.create();
        this.m_FinishLayer.setContentSize(mainSize);
        this.m_MainUI.addChild(this.m_FinishLayer);

        //
        var labelTitle = cc.LabelTTF.create(Resource.ChineseTxt["update_title_2"], Defines.DefaultFont, 28 * Defines.BASE_SCALE);
        this.m_FinishLayer.addChild(labelTitle);
        labelTitle.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.9));

        //
        if (type_update == "apk")
        {
            this._addContentForFinishWithApk();
        }
        else
        {
            this._addContentForFinishWithRes();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _addContentForFinishWithRes: function()
    {
        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        var strDesc = Defines.OS.isiOS() ? Resource.ChineseTxt["update_desc_2"] : Resource.ChineseTxt["update_desc_3"];
        var labelDesc = cc.LabelTTF.create(strDesc, Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        this.m_FinishLayer.addChild(labelDesc);
        labelDesc.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.55));

        //iOS不能重启
        if (Defines.OS.isiOS())
        {
            var confirmButton = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("general_btn_confirm_nor.png"),
                cc.Sprite.createWithSpriteFrameName("general_btn_confirm_sel.png"),
                this._btnCancelCallback, this);
            confirmButton.setPosition(cc.p(mainSize.width/2, 50 * Defines.BASE_SCALE));

            var menu = cc.Menu.create(confirmButton);
            menu.setPosition(cc.p(0, 0));
            this.m_FinishLayer.addChild(menu, 10000);

            return this;
        }

        //安卓可以重启
        var restartButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_sel.png"),
            this._btnRestartAppCallback, this);
        restartButton.setPosition(cc.p(mainSize.width/2 + 80 * Defines.BASE_SCALE, 50 * Defines.BASE_SCALE));

        //
        var cancelButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_cancel_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_cancel_sel.png"),
            this._btnCancelCallback, this);
        cancelButton.setPosition(cc.p(mainSize.width/2 - 80 * Defines.BASE_SCALE, 50 * Defines.BASE_SCALE));

        //
        menu = cc.Menu.create(restartButton, cancelButton);
        menu.setPosition(cc.p(0, 0));
        this.m_FinishLayer.addChild(menu, 10000);

        //强制更新的处理
        if (updateMissionForce)
        {
            cancelButton.setVisible(false);
            restartButton.setPositionX(mainSize.width/2);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _addContentForFinishWithApk: function()
    {
        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        var labelDesc = cc.LabelTTF.create(Resource.ChineseTxt["update_desc_5"], Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        this.m_FinishLayer.addChild(labelDesc);
        labelDesc.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.55));

        //
        var installButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_sel.png"),
            this._btnInstallAppCallback, this);
        installButton.setPosition(cc.p(mainSize.width/2 + 80 * Defines.BASE_SCALE, 50 * Defines.BASE_SCALE));

        //
        var cancelButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_cancel_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_cancel_sel.png"),
            this._btnCancelCallback, this);
        cancelButton.setPosition(cc.p(mainSize.width/2 - 80 * Defines.BASE_SCALE, 50 * Defines.BASE_SCALE));

        //
        var menu = cc.Menu.create(installButton, cancelButton);
        menu.setPosition(cc.p(0, 0));
        this.m_FinishLayer.addChild(menu, 10000);

        //强制更新的处理
        if (updateMissionForce)
        {
            cancelButton.setVisible(false);
            installButton.setPositionX(mainSize.width/2);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentForFailed: function()
    {
        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        this.m_FailedLayer = cc.Layer.create();
        this.m_FailedLayer.setContentSize(mainSize);
        this.m_MainUI.addChild(this.m_FailedLayer);

        //
        var labelTitle = cc.LabelTTF.create(Resource.ChineseTxt["update_title_2"], Defines.DefaultFont, 28 * Defines.BASE_SCALE);
        this.m_FailedLayer.addChild(labelTitle);
        labelTitle.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.9));

        //
        var labelDesc = cc.LabelTTF.create(Resource.ChineseTxt["update_desc_4"], Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        this.m_FailedLayer.addChild(labelDesc);
        labelDesc.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.55));

        //
        var restartButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_sel.png"),
            this._btnRestartUpdateCallback, this);
        restartButton.setPosition(cc.p(mainSize.width/2 + 80 * Defines.BASE_SCALE, 50 * Defines.BASE_SCALE));

        //
        var cancelButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_cancel_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_cancel_sel.png"),
            this._btnCancelCallback, this);
        cancelButton.setPosition(cc.p(mainSize.width/2 - 80 * Defines.BASE_SCALE, 50 * Defines.BASE_SCALE));

        //
        var menu = cc.Menu.create(restartButton, cancelButton);
        menu.setPosition(cc.p(0, 0));
        this.m_FailedLayer.addChild(menu, 10000);

        //强制更新的处理
        if (updateMissionForce)
        {
            cancelButton.setVisible(false);
            restartButton.setPositionX(mainSize.width/2);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCancelCallback:function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        _Download_Refused = true;
        this.closeWindow();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnUpdateBackCallback:function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        _Download_Background = true;
        this.closeWindow();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnStartUpdateCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        cc.log("开始更新");

        if(Defines.OS.isAndroid() && "300004" == CHANNEL)
        {
            //区分渠道
            var configClass = wrapperConfig.Config.getInstance();
            configClass.openURL(cc.GUIAppraiseKakao.appraiseUrl.URL_GOOGLE);
        }
        //
        _Cleanup_Download();
        startUpdate();

        //
        this.m_OptionLayer.removeFromParent();
        this.addContentForProgress();

        //
        var self = this;
        this.getWindow().schedule(
            function(time)
            {
                self.update(time);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnRestartUpdateCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        cc.log("失败后，重新更新");

        //
        _Cleanup_Download();
        startUpdate();

        //
        this.m_FailedLayer.removeFromParent();
        this.addContentForProgress();

        //
        var self = this;
        this.getWindow().schedule(
            function(time)
            {
                self.update(time);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnRestartAppCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        restartApp();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnInstallAppCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        installApk();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _getDownloadDesc: function()
    {
        var totalFiles = updateMissionNum;
        var curFiles = totalFiles - updateMissionQueue.length;
        var progress = "(" + parseInt(_Download_Progress) + "%)";

        return Resource.ChineseTxt["update_desc_1"] + curFiles + "/" + totalFiles + progress;
    },

    //------------------------------------------------------------------------------------------------------------------
    update: function(time)
    {
        //test
        /*_Download_Progress += 20 * time;
        if (_Download_Progress >= 100)
        {
            _Notify_DownloadResult(false);
        }*/

        //设置进度条
        if (this.m_ProgressBar && _Download_Progress >= 0)
        {
            this.m_ProgressBar.setPercentage(_Download_Progress);
        }

        //设置进度描述
        var strDesc = this._getDownloadDesc();
        if (this.m_LabelProgress && strDesc)
        {
            this.m_LabelProgress.setString(strDesc);
        }

        //下载结果通知
        if (_Download_Notify)
        {
            this.getWindow().unscheduleAllCallbacks();
            this.m_ProgressLayer.removeFromParent(true);

            //step1:下载结果
            if (_Download_Result)
            {
                cc.log("收到内更新结果-----内更新下载成功");
                this.addContentForFinish();
            }
            else
            {
                cc.log("收到内更新结果-----内更新下载失败");
                this.addContentForFailed();
            }

            //step2:
            _Cleanup_Download();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);

        //
        cc.AudioMng.getInstance().playOpenWindow();

        //
        this.addContent();

        //有了下载结果通知
        if (_Download_Notify)
        {
            //step1:下载结果
            if (_Download_Result)
            {
                cc.log("直接弹结果-----内更新下载成功");
                this.addContentForFinish();
            }
            else
            {
                cc.log("直接弹结果-----内更新下载失败");
                this.addContentForFailed();
            }

            //step2:
            _Cleanup_Download();

            return this;
        }

        //
        this.addContentForOption();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        //
        cc.AudioMng.getInstance().playCloseWindow();

        //
        this.getWindow().removeAllChildren(true);
        this.getWindow().unscheduleAllCallbacks();

        //
        this.m_ProgressBar = null;
        this.m_LabelProgress = null;

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIUpdateApp._instance = null;
cc.GUIUpdateApp.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIUpdateApp();
        this._instance.init();
    }

    return this._instance;
};

//======================================================================================================================
var _Download_Refused = false;
var _Download_Background = false;

//单个文件下载进度
var _Download_Progress = 0;

//下载是否有了结果
var _Download_Notify = false;
var _Download_Result = false;

//
var _Notify_DownloadResult = function(result)
{
    _Download_Notify = true;
    _Download_Result = result;
    _TryToUpdateApp();
};

//
var _Cleanup_Download = function()
{
    _Download_Progress = 0;
    _Download_Notify = false;
    _Download_Result = false;
};

//----------------------------------------------------------------------------------------------------------------------
cc.GUIUpdateApp.canOpen = function()
{
    //如果拒绝过了，不弹更新
    if (_Download_Refused)
    {
        cc.log("cc.GUIUpdateApp _Download_Refused");
        return false;
    }

    //
    var isOpen = cc.GUIUpdateApp.getInstance().isWindowOpen();
    var isMainMenu = cc.Director.getInstance().getRunningScene() instanceof Scene_MainMenu;

    //只能在主界面
    if (isOpen || !isMainMenu)
    {
        cc.log("cc.GUIUpdateApp isOpen || !isMainMenu ");
        return false;
    }

    //有更新结果时
    if (_Download_Notify && _Download_Background)
    {
        return true;
    }

    //虽然有更新任务但处于后台不可以打开
    cc.log("cc.GUIUpdateApp isNeedUpdate = " + isNeedUpdate());
    return (isNeedUpdate() && !_Download_Background);
};

//----------------------------------------------------------------------------------------------------------------------
var _TryToUpdateApp = function()
{
    if (cc.GUIUpdateApp.canOpen())
    {
        var runningScene = cc.Director.getInstance().getRunningScene();
        cc.GUIUpdateApp.getInstance().openWindow(runningScene);
    }
};