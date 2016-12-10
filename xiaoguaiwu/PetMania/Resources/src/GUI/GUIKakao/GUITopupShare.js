/**
 * Created by hong.zhang on 2014/7/1.
 */

//========================================================= GUITopupShare ===================================================
//
cc.GUITopupShare = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUITopupShare";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        this.m_MainUI = null;
        this.m_ShareFunc = null;
        this.m_shareType = 1;
        this.m_strFriendId = "";
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setContent: function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(blockLayer, -1);

        //
        this.m_MainUI = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back0.png");
        this.getWindow().addChild(this.m_MainUI);

        var mainSize = this.m_MainUI.getContentSize();
        var winSize = cc.Director.getInstance().getWinSize();

        //
        this.m_MainUI.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.5));

        //
        var backFrame = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back5.png");
        this.m_MainUI.addChild(backFrame);
        backFrame.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.53));

        var labelLarge = cc.LabelTTF.create(Resource.KoreanTxt["topup_share_large"], Defines.DefaultFont, 13 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelLarge);
        labelLarge.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.65));

        var labelSmall = cc.LabelTTF.create(Resource.KoreanTxt["topup_share_small"], Defines.DefaultFont, 13 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelSmall);
        labelSmall.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.4));
        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(mainSize.width * 0.75,43 * Defines.BASE_SCALE));

        //
        var buttonConfirm = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("btn_send_meesage_nor.png"),
            cc.Sprite.createWithSpriteFrameName("btn_send_meesage_sel.png"),
            this._btnConfirmCallback, this);
        buttonConfirm.setPosition(cc.p(mainSize.width * 0.25, 43 * Defines.BASE_SCALE));

        //
        var shareMenu = cc.Menu.create(buttonClose, buttonConfirm);
        shareMenu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(shareMenu);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback:function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        this.closeWindow();
        if(cc.GUIScoreTopUp.getInstance().isWindowOpen())
        {
            cc.GUIScoreTopUp.getInstance().closeWindow();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnConfirmCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        this.closeWindow();
        if(cc.GUIScoreTopUp.getInstance().isWindowOpen())
        {
            cc.GUIScoreTopUp.getInstance().closeWindow();
        }
        cc.DataMng.getInstance().addPopupShareCount(1);

        cc.NodeSelf.getInstance().asyncSendPowerToRole(function(){});
        cc.log("this.m_strFriendId:" + this.m_strFriendId);
                                        
        KakaoJoyInterface.getInstance().sendMessageForShareScore(this.m_strFriendId,this.m_strFriendName,this.m_nScore);

        cc.GUITaskKakao.getInstance().addTaskScore(Task.TaskID.DAILY_CLEAR_SHARE,1);
        cc.GUITaskKakao.getInstance().addTaskScore(Task.TaskID.WEEKEND_COMPLETE_SHARE,1);
        cc.GUIAchievement.getInstance().addAchievementScore(Achieve.AchieveType.TYPE_CLEAR_SHARE.toString(),1);

        //
//        if (this.m_ShareFunc)
//        {
//            this.m_ShareFunc();
//        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, callFunc, myInfo, friendInfo, gameLevel)
    {
        //没有分享奖励的话不弹此界面

        if(!_IsNetWorkEnable() && false){
            showMessageToast(Resource.ChineseTxt["msg_0"]);
            return this;
        }

        cc.log("ShareMng.getInstance().canBonus() = " + ShareMng.getInstance().canBonus());
        cc.log("cc.DataMng.getInstance().getPopupShareCount() = " + cc.DataMng.getInstance().getPopupShareCount());
//        if (!ShareMng.getInstance().canBonus() || cc.DataMng.getInstance().getPopupShareCount() >= 3)
//        {
//            callFunc && callFunc();
//            return this;
//        }
//        this.m_shareType = ShareMng.getInstance().canBonus();
        //
        this._super(render);

        //
        cc.AudioMng.getInstance().playOpenWindow();
        this.getWindow().removeAllChildren(true);

        this.m_ShareFunc = callFunc;

        if(!friendInfo.getID())
        {
            cc.log("GUITopupShare, friend没有ID");
        }

                                             
        cc.log("GUITopupShare openWindow");
        cc.log("gameLevel: " + gameLevel);
        cc.log("friendInfo.getName(): " + friendInfo.getName());
        cc.log("friendInfo.getGameLevelScore(gameLevel): " + friendInfo.getGameLevelScore(gameLevel));
        this.m_strFriendId = friendInfo.getID();
        this.m_strFriendName = myInfo.getName();
        this.m_nScore = myInfo.getGameLevelScore(gameLevel);
        //
        this.setContent();

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

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUITopupShare._instance = null;
cc.GUITopupShare.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUITopupShare();
        this._instance.init();
    }

    return this._instance;
};

cc.GUITopupShare.changeTo = function(targetType)
{
    if (!NodeTime.getInstance().fuzzyMatchingServerTime(60 * 60 * 1000))
    {
        cc.log("cc.GUITopupShare.changeTo= " + false);
        return false;
    }
    cc.log("cc.GUITopupShare.changeTo = " + true);

    var nowTime = _LocalTime();

    if (targetType == 1){
        var candyDailyTime = cc.DataMng.getInstance().getCandyDaily();
        cc.log("getCandyDaily: " + candyDailyTime);
    }
    else {
        var candyDailyTime = cc.DataMng.getInstance().getDiamondDaily();
        cc.log("getDiamondDaily: " + candyDailyTime);
    }
//
    var curCandyDailyTime = Tools.getDayEnd(candyDailyTime);

    cc.log("nowTime = " + nowTime);
    cc.log("candyDailyTime = " + candyDailyTime);
    cc.log("curCandyDailyTime = " + curCandyDailyTime);
    if (nowTime > curCandyDailyTime)
    {

        return true;
    }

    return false;
};
