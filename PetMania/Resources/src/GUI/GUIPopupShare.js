
//========================================================= GUIPopupShare ===================================================
//
cc.GUIPopupShare = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUIPopupShare";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        this.m_MainUI = null;
        this.m_ShareFunc = null;
        this.m_shareType = 1;
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

        //
        var labelTitle = cc.Sprite.createWithSpriteFrameName("general_label_share.png");
        this.m_MainUI.addChild(labelTitle);
        labelTitle.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.9));

        //
        var isFirstShare = ShareMng.getInstance().isFirstShare();

        //
        var strName = isFirstShare ? Resource.ChineseTxt["share_desc_0"] : Resource.ChineseTxt["share_desc_1"];
        if (this.m_shareType == 2){
            strName = Resource.ChineseTxt["share_desc_2"];
        }

        var labelName = cc.LabelTTF.create(strName, Defines.DefaultFont, 16 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelName);
        labelName.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.7));

        //


        var spriteSugars = cc.Sprite.createWithSpriteFrameName(isFirstShare || (this.m_shareType == 2)? "icon_diamond_2.png" : "icon_heart_3.png");
        this.m_MainUI.addChild(spriteSugars);
        spriteSugars.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.5));

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(mainSize.width - 25 * Defines.BASE_SCALE, mainSize.height - 25 * Defines.BASE_SCALE));

        //
        var buttonConfirm = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_sel.png"),
            this._btnConfirmCallback, this);
        buttonConfirm.setPosition(cc.p(mainSize.width * 0.5, 43 * Defines.BASE_SCALE));

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

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnConfirmCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        this.closeWindow();
        cc.DataMng.getInstance().addPopupShareCount(1);

        //
        if (this.m_ShareFunc)
        {
            this.m_ShareFunc();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, callFunc)
    {
        //没有分享奖励的话不弹此界面
		
		if(!_IsNetWorkEnable()){
            showMessageToast(Resource.ChineseTxt["msg_0"]);
			return this;
        }
		
        cc.log("ShareMng.getInstance().canBonus() = " + ShareMng.getInstance().canBonus());
        cc.log("cc.DataMng.getInstance().getPopupShareCount() = " + cc.DataMng.getInstance().getPopupShareCount());
        if (!ShareMng.getInstance().canBonus() || cc.DataMng.getInstance().getPopupShareCount() >= 3)
        {
            callFunc && callFunc();
            return this;
        }
        this.m_shareType = ShareMng.getInstance().canBonus();
        //
        this._super(render);

        //
        cc.AudioMng.getInstance().playOpenWindow();
        this.getWindow().removeAllChildren(true);

        this.m_ShareFunc = callFunc;

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

cc.GUIPopupShare._instance = null;
cc.GUIPopupShare.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIPopupShare();
        this._instance.init();
    }

    return this._instance;
};

cc.GUIPopupShare.changeTo = function(targetType)
{
    if (!NodeTime.getInstance().fuzzyMatchingServerTime(60 * 60 * 1000))
    {
        cc.log("cc.GUIPopupShare.changeTo= " + false);
        return false;
    }
    cc.log("cc.GUIPopupShare.changeTo = " + true);

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
//        if (targetType == 1){
//            cc.DataMng.getInstance().setCandyDaily();
//        }
//        else {
//            cc.DataMng.getInstance().setDiamondDaily();
//        }

        return true;
    }

    return false;
};
