
var Scene_MainMap = cc.Scene.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        cc.associateWithNative(this, cc.Scene);

        //
        this.m_AppendWindow = null;
        this.m_NeedPreLoadRes = false;
        this.m_AutoStartKey = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Scene_MainMap";
    },

    //------------------------------------------------------------------------------------------------------------------
    appendWindow: function(window)
    {
        this.m_AppendWindow = window;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    needPreLoadRes: function(isNeedPreLoadRes)
    {
        this.m_NeedPreLoadRes = isNeedPreLoadRes;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setAutoStartKey: function(autoStartKey)
    {
        this.m_AutoStartKey = autoStartKey;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    onEnter: function()
    {
        this._super();

        cc.log("进入 Scene_MainMap 场景  **********************");

        if (this.m_NeedPreLoadRes)
        {
            cc.ArmatureDataMng.getInstance().registerForGame();
        }

        //
//        cc.GUILoginItemPush.getInstance().openWindow(this);

		cc.log("cc.GUIMapMng.getInstance().update();");
        cc.GUIMapMng.getInstance().update();
        cc.log("cc.GUIMap.getInstance().openWindow(this);");
        cc.GUIMap.getInstance().openWindow(this);
        cc.GUIMapMng.getInstance().mapDidEnter();



        //
        var handleGuide = true;

//        //春节活动
//        if (cc.DataMng.getInstance().isSpringFestival() && cc.GUISpringAd.changeTo())
//        {
        if (cc.DataMng.getInstance().isSpringFestival() && cc.DataMng.getInstance().canPush() && cc.GUISpringAd.changeTo())
        {
            handleGuide = false;
            cc.GUISpringAd.getInstance().openWindow(this);
        }

        //
        if (this.m_AutoStartKey)
        {
            handleGuide = false;
            cc.GUIMapMng.getInstance().autoRestart(this.m_AutoStartKey, false);
        }

        //结算界面
        if (this.m_AppendWindow && this.m_AppendWindow instanceof cc.GUIGameLevelEndWin)
        {
            handleGuide = false;
            this.enterEndWin();
        }
        else if (this.m_AppendWindow && this.m_AppendWindow instanceof cc.GUIGameLevelEndFail)
        {
            handleGuide = false;
            this.enterEndFail();
        }
        else {
            if (!JoyType.JOY_KAKAO == JOY_FLAG && !cc.GUIBuyDiamond.getInstance().isCandyLimitOpen()){
                handleGuide = false;
                cc.GUIBuyDiamond.getInstance().openWindow(_GUILayer(), 0, GUI.SHOP_ITEM_TYPE.SHOP_ITEM_HEART_LIMIT);
            }
        }

        //
        _SaveGame();
                                    
        //
        //ItemPack.getInstance().async();
        //Bank.getInstance().async();


//        cc.TaskMng.getInstance().test();

        //
        if (handleGuide)
        {
            if(!this.showGuide())
            {
                //kakao登陆道具推送
                //没有引导则显示道具推送
                //原谅我这么写 实在是不敢改新手引导啊....
                if(JoyType.JOY_KAKAO == JOY_FLAG && bLoginPushed)
                {
//                    cc.log("here333");
//                    cc.GUIAskHelpKakao.getInstance().openWindow(this);
                    cc.GUILoginItemPush.getInstance().openWindow(this);
                    bLoginPushed = false;
//                    cc.GUITopupShare.getInstance().openWindow(this);

                }
            }
        }
        //只有第一次登陆的时候才有可能显示
//        bLoginPushed = false;
        //
        cc.log("进入大地图 dumpCachedTextureInfo");
        cc.ResourceMng.getInstance().removeTextureCache(Resource._MapZone);
        //cc.TextureCache.getInstance().dumpCachedTextureInfo();

        if(showPartyTrackMainMap)
        {
            PartyTrackInterface.getInstance().eventSceneMainMap();
        }
        showPartyTrackMainMap = false;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _isNeedShowGUISurpassFriends: function()
    {
        var isLogin =  cc.NodeSelf.getInstance().isLogin();
        var notTelcom = !isTelcomOperators();
        var firstPlayFinish = cc.GUIMapMng.getInstance().isNextLevelNew();
        return isLogin && notTelcom && firstPlayFinish;
    },

    //------------------------------------------------------------------------------------------------------------------
    enterEndWin: function()
    {
        //
        cc.AudioMng.getInstance().playGameSuccessMusic();
//        cc.AudioMng.getInstance().playGameSuccessSound();

        //
        cc.GUIMap.getInstance().handleMapLeaveAction(false);

        //
        var levelData = cc.GUIGameLevelEndWin.getInstance().m_LevelData;

        //step1:超越好友进度
        if (!Defines.IS_KO && this._isNeedShowGUISurpassFriends())
        {
            var surpassFriends = _GetSurpassFriends(levelData.NAME);
            if (surpassFriends.length > 0)
            {
                cc.GUISurpassFriends.getInstance().openWindow(this, surpassFriends);
                return this;
            }
        }

        //step2:超越好友分数
		cc.log("超越好友分数");
        if (!isTelcomOperators())
        {
            var scoreUpStrategy = GUIScoreTopUpStrategy.create(levelData.NAME);
            if (scoreUpStrategy)
            {
                cc.GUIScoreTopUp.getInstance().openWindow(this, scoreUpStrategy);
                return this;
            }
        }

        //step3:
        cc.GUIGameLevelEndWin.getInstance().openWindow(this);

        //
        if(!isTelcomOperators()&& cc.NodeSelf.getInstance().isLogin())
        {
            cc.GUIMyFriendsTop.getInstance().openWindow(this, cc.GUIGameLevelEndWin.getInstance());
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    enterEndFail: function()
    {
        //new
        cc.AudioMng.getInstance().playGameFailedMusic();
//        cc.AudioMng.getInstance().playGameFailedSound();

        //cc.DataMng.getInstance().desHeart(1);重构掉了
        cc.GUIMap.getInstance().startUpdateHeartsTimer();

        //
        cc.GUIMap.getInstance().handleMapLeaveAction(false);

        //
        cc.GUIGameLevelEndFail.getInstance().openWindow(this);

        //
        if(!isTelcomOperators()&& cc.NodeSelf.getInstance().isLogin())
        {
            cc.GUIMyFriendsTop.getInstance().openWindow(this, cc.GUIGameLevelEndFail.getInstance());
        }

        return this;
    },

    enterSignIn: function()
    {
        cc.GUISignBonus.getInstance().openWindow(this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    update: function (time)
    {
        //this._super();
        cc.GUIMap.getInstance().updateZone(time);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    onExit: function()
    {
        this._super();

        cc.log("离开 Scene_MainMap 场景  **********************");

        cc.GUIMap.getInstance().closeWindow();
        this.m_AppendWindow = null;
        this.m_NeedPreLoadRes = false;
        this.m_AutoStartKey = null;

        //
        if(!isTelcomOperators()&& cc.NodeSelf.getInstance().isLogin())
        {
            cc.GUIMyFriendsTop.getInstance().closeWindow();
        }

        //
        //cc.log("离开大地图 dumpCachedTextureInfo");
        //cc.TextureCache.getInstance().dumpCachedTextureInfo();
        cc.ArmatureDataMng.getGUIMap() && cc.ArmatureDataMng.getGUIMap().removeArmaturesTexCache();

        this.removeAllChildren(true);
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    showGuide : function()
    {
        cc.log("showGuide");
        //
        var maxProcessKey = cc.DataMng.getInstance().getMaxProcessLevelKey();
        var gameLevelData = cc.DataMng.getInstance().getLevelDataWithName(maxProcessKey);
        if (gameLevelData.SHOW_CUSTOM_GUIDE)
        {
            var key = "ShowCustomeGuide_" + gameLevelData.NAME;

            var levelItem = cc.GUIMapMng.getInstance().getMapItemWithKey(maxProcessKey);
            var itemSprite = levelItem.getMainRender();
            if (itemSprite)
            {
                var position = levelItem.convertToWindowSpace();

                //如果关卡在屏幕外，加此向导无法继续游戏
                if (position.x <= 0 || position.y >= _ScreenWidth)
                {
                    return this;
                }

                var contentSize = itemSprite.getContentSize();
                var blackList = [
                    cc.rect(
                        position.x-contentSize.width/2,
                        position.y-contentSize.height/2,
                        contentSize.width,
                        contentSize.height
                    )
                ];
                cc.GUIGuideNormal.getInstance().showCustomCuteMonsterBase(
                    key,
                    Resource.ChineseTxt[115],
                    this,
                    blackList,
                    true,
                    cc.p(0,0)
                );
            }

            return true;
        }

        return false;
    }

    //------------------------------------------------------------------------------------------------------------------
});

//
Scene_MainMap.create = function(appendWindow, isNeedPreLoadRes, autoStartKey)
{
    var newScene = new Scene_MainMap();
    if (newScene)
    {
        newScene.appendWindow(appendWindow);
        newScene.needPreLoadRes(isNeedPreLoadRes);
        newScene.setAutoStartKey(autoStartKey);

        //
        newScene.unscheduleAllCallbacks();
        newScene.schedule(newScene.update, Defines.FPS);
    }

    return newScene;
};

Scene_MainMap.isNeedPreLoadRes = function()
{
    var fromScene = cc.Director.getInstance().getRunningScene();
    return (fromScene instanceof Scene_MainMenu
        || fromScene instanceof Scene_DailyBonus
        || fromScene instanceof Scene_Story);
};

Scene_MainMap.changeTo = function(appendWindow, autoStartKey)
{
    //
    var needLoadingScene = true;
    if (needLoadingScene)
    {
        cc.Director.getInstance().replaceScene(
            Scene_Loading.createToMap(appendWindow, autoStartKey));
    }
    else
    {
        cc.Director.getInstance().replaceScene(
            Scene_MainMap.create(appendWindow,
                Scene_MainMap.isNeedPreLoadRes(),
                autoStartKey));
    }
};

var showPartyTrackMainMap = true;