//
//======================================================================================================================
var MsgBox_checkGuestText = IMsgBox.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super(
            true,
            false,
            true,
            this.getContent()
        );
    },

    //------------------------------------------------------------------------------------------------------------------
    getContent: function()
    {
        return Resource.ChineseTxt["guest_login_tip"];
    },

    //------------------------------------------------------------------------------------------------------------------
    handleConfirm: function(guiWindow)
    {
        //
        guiWindow.closeWindow();
        cc.AudioMng.getInstance().playButtonSound(true);

        if (Scene_Story.canChangeTo(Story_0))
        {
            Scene_Story.changeTo();
        }
        else if (!Defines.IS_KO && Scene_DailyBonus.canChangeTo())
        {
            Scene_DailyBonus.changeTo();
        }
        else if (Defines.IS_KO && Scene_SignBonus.canChangeTo())
        {
            Scene_SignBonus.changeTo();
        }
        else
        {
            Scene_MainMap.changeTo();
        }
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleCancel: function(guiWindow)
    {
        this._super(guiWindow);

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------

});

//======================================================================================================================
var MsgBox_LoginServer = IMsgBox.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super(
            true,
            false,
            true,
            this.getContent()
        );
    },

    //------------------------------------------------------------------------------------------------------------------
    getContent: function()
    {
        return Resource.ChineseTxt["confirm_tip"];
    },

    //------------------------------------------------------------------------------------------------------------------
    handleConfirm: function(guiWindow)
    {
        //
        guiWindow.closeWindow();
        cc.AudioMng.getInstance().playButtonSound(true);

//        _ImplLogin();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleCancel: function(guiWindow)
    {
        this._super(guiWindow);

        //
//        _LogoutFlag = true;
//        _RefuseAutoLogin = true;
//
//        //
//        cc.GUIMainMenu.getInstance().updateLoginButtonVisibleByLoginState();
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------

});

//重要：调用_Login()前都需要设置当前要登录的用户系统
var _CurJoyFlag = -1;

//
var _Login = function(joyFlag, imme)
{
    _CurJoyFlag = joyFlag;
    //
    if (isTelcomOperators())
    {
        return;
    }

    if (imme)
    {
        _ImplLogin();
    }
    else
    {
        //
		if (Defines.IS_EN || Defines.IS_KO){
			_ImplLogin();
		}
		else {
			cc.GUIMsgBox.getInstance().openWindow(
				cc.Director.getInstance().getRunningScene(),
				new MsgBox_LoginServer()
			);
		}
    }

    //TODO
    /*if (cc.NodeSelf.getInstance().getLocalRoleFreeStatus())
    {
        cc.log("是空闲状态 getLocalRoleFreeStatus");

        //
        cc.GUIMsgBox.getInstance().openWindow(
            cc.Director.getInstance().getRunningScene(),
            new MsgBox_LoginServer()
        );
    }
    else
    {
        cc.log("不是空闲状态");
        _ImplLogin();
    }*/
};

//======================================================================================================================
var LoginConfigure = cc.Class.extend({

    ctor: function(jsonData)
    {
        this._data = jsonData;
    },

    isFirstLogin: function()
    {
        return this._data.isfirst;
    },

    getChannel: function()
    {
        return _ParseChannel("LoginConfigure");
    },

    getUserId: function()
    {
        return this._data.userid;
    },

    getRoleId: function()
    {
        return this._data.roleid;
    },

    getRoleIndex: function()
    {
        return this._data.roleidx;
    },

    getToken: function()
    {
        return this._data.token;
    },

    getNick: function()
    {
        return this._data.nick;
    },
	
    toString: function()
    {
        var _string = "loginConfigure:";
        _string += "\n 第一次登录 = " + this.isFirstLogin();
        _string += "\n 用户系统 = " + this.getChannel();
        _string += "\n CocoID = " + this.getUserId();
        _string += "\n RoleId = " + this.getRoleId();
        _string += "\n RoleIndex = " + this.getRoleIndex();
        _string += "\n 访问令牌Token = " + this.getToken();
        _string += "\n nick= " + this.getNick();
        return _string;
    }
});

LoginConfigure.create = function(json)
{
    return new LoginConfigure(json);
};

//
var _HandleFinishLogin = function(first)
{
    cc.log("完成登录!!!!! isfirstLogin = " + first);

    //登录成功保存登录的用户系统
    if (_CurJoyFlag >= 0)
    {
        JOY_FLAG = _CurJoyFlag;
        cc.DataMng.getInstance().setCurJoyFlag(_CurJoyFlag);
    }

    //
    if (first)
    {
        BIMng.getInstance().logFirstLogin();
    }

    //
    _LogoutFlag = false;

    //
    var selfPhotoURL = PhotoLoad.getInstance().getPhotoURL(cc.NodeSelf.getInstance().getRoleId());
	cc.log("selfPhotoURL = " + selfPhotoURL);
    cc.NodeSelf.getInstance().setSelfPhoto(selfPhotoURL);

    //正常登陆流程
    BIMng.getInstance().logLogin(true);
    FriendsMng.getInstance().applyFriendsInfosFromThirdParty();
    FriendsMng.getInstance().fireEvent(_FRIENDS_MNG_EVENT.LOGIN_SUCC);
    MailMng.getInstance().loadMails();
    cc.GUITaskKakaoData.getInstance().downloadTaskInfo();
    cc.GUIAchievementData.getInstance().downloadAchieveInfo();
//	RecomMng.getInstance().loadRecoms();
    ShareMng.getInstance().loadRoleBonusState();
    CashslideInterface.getInstance().appFirstLaunched();
    cc.NodeHelper.getInstance().getDiamondDiscount();
	cc.DataMng.getInstance().resetSpringDaily();
    //通知界面部分
    cc.GUIWindowsManager.getInstance().notifyAllWindowsLogin(first);
	
	if (cc.NodeSelf.getInstance().isLogin() && cc.DataMng.getInstance().isScoreRankingsEnabled()){
		GameTopModel.getInstance().askServerForTopDatas();
	}


    //读取商城打折信息

    cc.log("cc.NodeSelf.getInstance().isLogin() = " + cc.NodeSelf.getInstance().isLogin());
};

var _ImplLogin = function()
{
    //
    var isAlreadyLogn = cc.NodeSelf.getInstance().isLogin();
    var telcomOperators = isTelcomOperators();

    //
    if (isAlreadyLogn || telcomOperators)
    {
        cc.log("不能登陆");
        cc.log("isAlreadyLogn = " + isAlreadyLogn);
        cc.log("telcomOperators = " + telcomOperators);
        cc.GUIMainMenu.getInstance().updateLoginButtonVisibleByLoginState();
        return;
    }

    //
    var getLocalRoleCallBack = function(json)
    {
        //
        cc.log("执行asyncGetLocalRole进行登录前准备完成，返回结果");

        //
        if (!json)
        {
            //
            cc.log("返回结果 !json");
            _SystemLoadingControl(false);
//			showMessageToast("本地roleID获取失败");
            showMessageToast(Resource.ChineseTxt["msg_0"]);
            cc.GUIMainMenu.getInstance().updateLoginButtonVisibleByLoginState();
            return;
        }

        //
        cc.log("登录准备,返回结果 json ＝ " + JSON.stringify(json));

        //
        var loginFailedCallBack = function()
        {
            cc.log("登录失败了loginFailedCallBack");
            showMessageToast(Resource.ChineseTxt["msg_login_0"]);

            //
            cc.log("登录失败的处理");
            cc.NodeSelf.getInstance().logout();
            cc.GUIMainMenu.getInstance().updateLoginButtonVisibleByLoginState();
        };

        //
        var loginSuccCallBack = function(loginConfigure)
        {
            cc.DataMng.getDataSignIn().receiveBonusFromServer();
            cc.log("登录成功 loginSuccCallBack_______________________________________________________________");
            var configure = LoginConfigure.create(loginConfigure);
            cc.log(configure);
            cc.log("________________________________________________________________________________________");
			showMessageToast(Resource.ChineseTxt[199]);
			
//			cc.NodeSelf.getInstance().initRole(configure.getRoleId(), configure.getRoleIndex(), configure.getToken());//刷新本地的roleid
			
            //
            cc.NodeHelper.getInstance().onPassportAuthorization(
                configure.getChannel(),
                configure.getUserId(),
                configure.getRoleId(),
                configure.getRoleIndex(),
                configure.getToken(),
                function(res)
                {
                    //
                    _SystemLoadingControl(false);

                    //
                    if (res)
                    {
                        cc.log("登录完成，执行_HandleFinishLogin");
                        _HandleFinishLogin(configure.isFirstLogin());
                    }
                    else
                    {
                        cc.log("登录完成，执行loginFailedCallBack");
                        loginFailedCallBack();
                    }
                });
        };

        //防止登录前 没有设置要登录的用户系统标识
        if (_CurJoyFlag == undefined || _CurJoyFlag < 0)
        {
            var joyFlags = _GetJoyFlags();
            _CurJoyFlag = joyFlags[0];
        }

        //
        joyCommon.getInstance().login(loginSuccCallBack, loginFailedCallBack, _CurJoyFlag);
    };

    //
    cc.log("登录开始");
    _SystemLoadingControl(true, Resource.ChineseTxt["isLogining"]);
    cc.log("_______________________________0");
    cc.NodeHelper.getInstance().asyncGetLocalRole(getLocalRoleCallBack);
    cc.log("执行asyncGetLocalRole进行登录前准备__________________________________1");
};


