
//======================================================================================================================
var GameLogoutOperation = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._do();
    },

    //------------------------------------------------------------------------------------------------------------------
    _do: function()
    {
        var uploadBeforeLogoutCallBack = function(res/*, diamond, norScores, spaceScores, heartRecoverMax, curHeart*/)
        {
            cc.log("uploadBeforeLogoutCallBack");

            _SystemLoadingControl(false);

            var realLogoutCallBackSucc = function()
            {
                //
                _LogoutFlag = true;

                //
                cc.Director.getInstance().replaceScene(Scene_MainMenu.create());
                MailMng.getInstance().notifyLogout();
                FriendsMng.getInstance().notifyLogout();

                //清除了照片
                PhotoLoad.getInstance().cleanUpLocalData();
                cc.NodeSelf.getInstance().setSelfPhoto("");

                //
                cc.log("realLogoutCallBackSucc");
            };

            var realLogoutCallBackFailed = function()
            {
                //
                cc.log("realLogoutCallBackFailed");
                realLogoutCallBackSucc();
            };

            if (res)
            {
                cc.log("退出之前的上传成功了");
                joyCommon.getInstance().logout(realLogoutCallBackSucc, realLogoutCallBackFailed);
            }
            else
            {
                cc.log("退出之前的上传失败了");
                joyCommon.getInstance().logout(realLogoutCallBackSucc, realLogoutCallBackFailed);
            }
        };

        if (cc.NodeHelper.getInstance().isUploadEnable())
        {
            //上传数据
            cc.log("开始登出流程");
            _SystemLoadingControl(true);
            cc.NodeHelper.getInstance().uploadAll(uploadBeforeLogoutCallBack);
        }
        else
        {
            //
            cc.log("开始登出流程, 此时网络中断");
            _SystemLoadingControl(true);
            uploadBeforeLogoutCallBack(false);
        }

        return this;
    }
});

GameLogoutOperation.create = function()
{
    if (Defines.PLATFORM.isMobile()
        && cc.NodeSelf.getInstance().isLogin()
        && !isTelcomOperators()
        )
    {
        return new GameLogoutOperation();
    }
    else
    {
        cc.log("GameLogoutOperation.create Defines.PLATFORM.isMobile() && cc.NodeSelf.getInstance().isLogin()");
    }

    return null;
};

//======================================================================================================================
var Game_ApplyDeviceID = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(succFunc, failFunc, isNotice)
    {
        cc.log("申请设备号");
        this.handle(succFunc, failFunc, isNotice);
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function(succFunc, failFunc, isNotice)
    {
        cc.log("Game_ApplyDeviceID handle");

        if (cc.NodeSelf.getInstance().getLocalRoleID())
        {
            cc.log("已存在设备号 = " + cc.NodeSelf.getInstance().getLocalRoleID());

            succFunc && succFunc();
            return this;
        }

        //如果本地没有 直接失败，不申请
        failFunc && failFunc();
        return this;
    }

});

Game_ApplyDeviceID.create = function(succFunc, failFunc, isNotice)
{
    if (Defines.PLATFORM.isMobile())
    {
        return (new Game_ApplyDeviceID(succFunc, failFunc, isNotice));
    }

    failFunc && failFunc();

    return null;
};


//======================================================================================================================
var Game_ApplyCDKeySwitch = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(succFunc, failFunc)
    {
        cc.log("兑换码功能是否开启");
        this.handle(succFunc, failFunc);
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function(succFunc, failFunc)
    {
        var callback = function(res)
        {
            cc.log("兑换码功能是否开启: " + res);

            //step1:
            cc.DataMng.getInstance().setCDKeyEnabled(res);

            //step2:
            if (res)
            {
                succFunc && succFunc();
            }
            else
            {
                failFunc && failFunc();
            }
        };

        if (cc.NodeHelper.getInstance().getOnlineCDKeySwitch)
        {
            cc.NodeHelper.getInstance().getOnlineCDKeySwitch(callback);
        }

        return this;
    }

});

Game_ApplyCDKeySwitch.create = function(succFunc, failFunc)
{
    if (Defines.PLATFORM.isMobile())
    {
        return (new Game_ApplyCDKeySwitch(succFunc, failFunc));
    }

    return null;
};

//======================================================================================================================
var Game_ApplyGuestBtnSwitch = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(succFunc, failFunc)
    {
        cc.log("游客入口是否开启");
        this.handle(succFunc, failFunc);
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function(succFunc, failFunc)
    {
        var callback = function(res)
        {
            cc.log("游客入口是否开启: " + res);

            //step1:
            cc.DataMng.getInstance().setGetGuestEnabled(res);
			if (res){
				cc.GUIMainMenu.getInstance().updateGuestButton(true);
			}

            //step2:
            if (res)
            {
                succFunc && succFunc();
            }
            else
            {
                failFunc && failFunc();
            }
        };

        if (cc.NodeHelper.getInstance().getOnlineGuestBtnSwitch)
        {
            cc.NodeHelper.getInstance().getOnlineGuestBtnSwitch(callback);
        }

        return this;
    }

});

Game_ApplyGuestBtnSwitch.create = function(succFunc, failFunc)
{
    if (Defines.PLATFORM.isMobile())
    {
        return (new Game_ApplyGuestBtnSwitch(succFunc, failFunc));
    }

    return null;
};

//======================================================================================================================
var Game_ApplyScoreRankingsSwitch = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        cc.log("排行榜功能是否开启");
        this.handle();
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function()
    {
        var callback = function(res)
        {
            cc.log("排行榜功能是否开启: " + res);

            //step1:
            cc.DataMng.getInstance().setScoreRankingsEnabled(res);

            //step2:
            if (res)
            {
                cc.ResourceMng.getInstance().addToCache(
                    Resource._GUITotalLevelTop_plist,
                    Resource._GUITotalLevelTop_png);
            }
        };

        if (cc.NodeHelper.getInstance().getOnlineScoreRankingsSwitch)
        {
            cc.NodeHelper.getInstance().getOnlineScoreRankingsSwitch(callback);
        }

        return this;
    }

});

Game_ApplyScoreRankingsSwitch.create = function()
{
    if (Defines.PLATFORM.isMobile())
    {
        return (new Game_ApplyScoreRankingsSwitch());
    }

    return null;
};
//
////======================================================================================================================
//var Game_ApplyADSwitch = cc.Class.extend({
//
//    //------------------------------------------------------------------------------------------------------------------
//    ctor: function()
//    {
//        cc.log("广告功能是否开启");
//        this.handle();
//    },
//
//    //------------------------------------------------------------------------------------------------------------------
//    handle: function()
//    {
//        var callback = function(res)
//        {
//            cc.log("广告功能是否开启: " + res);
//
//            //step1:
//            cc.DataMng.getInstance().setADEnabled(res);
//
//            //step2:
//        };
//
//        if (cc.NodeHelper.getInstance().getOnlineADSwitch)
//        {
//            cc.NodeHelper.getInstance().getOnlineADSwitch(callback);
//        }
//
//        return this;
//    }
//
//});
//
//Game_ApplyADSwitch.create = function()
//{
//    if (Defines.PLATFORM.isMobile())
//    {
//        return (new Game_ApplyADSwitch());
//    }
//
//    return null;
//};

//======================================================================================================================
var Game_ApplyBannerADSwitch = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        cc.log("广告条功能是否开启");
        this.handle();
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function()
    {
        var callback = function(res)
        {
            cc.log("广告条功能是否开启: " + res);

            //step1:
            cc.DataMng.getInstance().setBannerADEnabled(res);

            //step2:
        };

        if (cc.NodeHelper.getInstance().getOnlineBannerADSwitch)
        {
            cc.NodeHelper.getInstance().getOnlineBannerADSwitch(callback);
        }

        return this;
    }

});

Game_ApplyBannerADSwitch.create = function()
{
    if (Defines.PLATFORM.isMobile())
    {
        return (new Game_ApplyBannerADSwitch());
    }

    return null;
};

//======================================================================================================================
var Game_ApplyFullScreenADSwitch = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        cc.log("全屏广告功能是否开启");
        this.handle();
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function()
    {
        var callback = function(res)
        {
            cc.log("全屏广告功能是否开启: " + res);

            //step1:
            cc.DataMng.getInstance().setFullScreenADEnabled(res);

            //step2:
        };

        if (cc.NodeHelper.getInstance().getOnlineFullScreenADSwitch)
        {
            cc.NodeHelper.getInstance().getOnlineFullScreenADSwitch(callback);
        }

        return this;
    }

});

Game_ApplyFullScreenADSwitch.create = function()
{
    if (Defines.PLATFORM.isMobile())
    {
        return (new Game_ApplyFullScreenADSwitch());
    }

    return null;
};

//======================================================================================================================
var Game_ApplyMoreDiamondADSwitch = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        cc.log("更多钻石功能是否开启");
        this.handle();
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function()
    {
        var callback = function(res)
        {
            cc.log("更多钻石功能是否开启: " + res);

            //step1:
            cc.DataMng.getInstance().setMoreDiamondADEnabled(res);

            //step2:
        };

        if (cc.NodeHelper.getInstance().getOnlineMoreDiamondADSwitch)
        {
            cc.NodeHelper.getInstance().getOnlineMoreDiamondADSwitch(callback);
        }

        return this;
    }

});

Game_ApplyMoreDiamondADSwitch.create = function()
{
    if (Defines.PLATFORM.isMobile())
    {
        return (new Game_ApplyMoreDiamondADSwitch());
    }

    return null;
};

//======================================================================================================================
var Game_ApplyMoreGameADSwitch = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        cc.log("更多游戏功能是否开启");
        this.handle();
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function()
    {
        var callback = function(res)
        {
            cc.log("更多游戏功能是否开启: " + res);

            //step1:
            cc.DataMng.getInstance().setMoreGameADEnabled(res);

            //step2:
        };

        if (cc.NodeHelper.getInstance().getOnlineMoreGameADSwitch)
        {
            cc.NodeHelper.getInstance().getOnlineMoreGameADSwitch(callback);
        }

        return this;
    }

});

Game_ApplyMoreGameADSwitch.create = function()
{
    if (Defines.PLATFORM.isMobile())
    {
        return (new Game_ApplyMoreGameADSwitch());
    }

    return null;
};

////======================================================================================================================
//var Game_asyncGetGuestSwitch = cc.Class.extend({
//
//    //------------------------------------------------------------------------------------------------------------------
//    ctor: function()
//    {
//        this.handle();
//    },
//
//    //------------------------------------------------------------------------------------------------------------------
//    handle: function()
//    {
//        var callback = function(res, flag)
//        {
//			cc.log(" Game_asyncGetGuestSwitch  flag = " + flag);
//            //step1:
//            cc.DataMng.getInstance().setGetGuestEnabled(flag);
//			if (flag){
//				cc.GUIMainMenu.getInstance().updateGuestButton(true);
//			}
//            //step2:
//        };
//
//        if (cc.NodeSelf.getInstance().asyncGetGuestSwitch)
//        {
//            cc.NodeSelf.getInstance().asyncGetGuestSwitch(callback);
//        }
//
//        return this;
//    }
//
//});
//
//Game_asyncGetGuestSwitch.create = function()
//{
//    if (Defines.PLATFORM.isMobile())
//    {
//        return (new Game_asyncGetGuestSwitch());
//    }
//
//    return null;
//};

//======================================================================================================================
var Game_ApplySpringFestivalSign = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.handle();
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function()
    {
        var callback = function(res, flag)
        {
            var handle = false;

            if (res)
            {
                //cc.log("春节活动是否开启: " + flag);
                cc.log("公告是否开启: " + flag);
                if (flag)
                {
                    handle = true;
                }
            }
            else
            {
                //cc.log("请求春节活动是否开启失败，直接关闭");
                cc.log("请求公告是否开启失败，直接关闭");
            }

            cc.DataMng.getInstance().setSpringFestival(handle);
//            GUI.setSpringFestivalDiamondPack(handle);

            if (handle)
            {
                cc.ResourceMng.getInstance().addToCache(
                    Resource._GUISpring_plist,
                    Resource._GUISpring_png);
            }
        };

        //cc.NodeSelf.getInstance().asyncGetSpringFestivalSign(callback);
        cc.NodeSelf.getInstance().asyncGetGirlsCarnivalSign(callback);
        return this;
    }

});

Game_ApplySpringFestivalSign.create = function()
{
    if (Defines.PLATFORM.isMobile())
    {
        return (new Game_ApplySpringFestivalSign());
    }

    return null;
};

//======================================================================================================================
var Game_ApplyTimeOutPassSwitch = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(succFunc, failFunc)
    {
        cc.log("跳过支付超时是否开启");
        this.handle(succFunc, failFunc);
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function(succFunc, failFunc)
    {
        var callback = function(res)
        {
            cc.log("跳过支付超时是否开启: " + res);

            //step1:
			var configClass = wrapperConfig.Config.getInstance();
			configClass.setTimeOutPassSign(res);

            //step2:
            if (res)
            {
                succFunc && succFunc();
            }
            else
            {
                failFunc && failFunc();
            }
        };

        if (cc.NodeHelper.getInstance().getOnlinePassTimeOutSwitch)
        {
            cc.NodeHelper.getInstance().getOnlinePassTimeOutSwitch(callback);
        }

        return this;
    }

});

Game_ApplyTimeOutPassSwitch.create = function(succFunc, failFunc)
{
    if (Defines.PLATFORM.isMobile())
    {
        return (new Game_ApplyTimeOutPassSwitch(succFunc, failFunc));
    }

    return null;
};