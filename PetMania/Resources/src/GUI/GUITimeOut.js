/**
 * Created by hong.zhang on 2014/8/27.
 */

cc.GUITimeOut = cc.GUIPopupWindow.extend ({

    description: function ()
    {
        return "GUITimeOut";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    addMainContent: function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(blockLayer, -1);
        cc.log("gogogo 1");
        //
        this.m_MainUI = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back0.png");
        this.getWindow().addChild(this.m_MainUI);
        cc.log("gogogo 2");
        var mainSize = this.m_MainUI.getContentSize();
        var winSize = cc.Director.getInstance().getWinSize();
        cc.log("gogogo 3");
        //
        this.m_MainUI.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.4));
        cc.log("gogogo 4");
        var spriteTextBack = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back5.png");
        this.getWindow().addChild(spriteTextBack);
        spriteTextBack.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.45));
        cc.log("gogogo 5");
        var labelName = cc.LabelTTF.create(Resource.KoreanTxt["bad_internet"], Defines.DefaultFont, 18 * Defines.BASE_SCALE);
        this.getWindow().addChild(labelName);
        labelName.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.45));
        cc.log("gogogo 6");
        //
        var buttonBuy = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_confirm_sel.png"),
            this._btnConfirm, this);
        cc.log("gogogo 62");
        buttonBuy.setPosition(cc.p(mainSize.width * 0.5, 50 * Defines.BASE_SCALE));
        cc.log("gogogo 7");
        //
        var buyMenu = cc.Menu.create(buttonBuy);
        buyMenu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(buyMenu);
        cc.log("gogogo 8");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnConfirm: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        timeoutBacktoMaineMenu();
        this.closeWindow();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, shopData, forceOther)
    {
        this._super(render);
        cc.log("GUITimeOut openWindow");
        //
        cc.AudioMng.getInstance().playOpenWindow();
        this.getWindow().removeAllChildren(true);

        //step2:
        this.addMainContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();
        cc.log("cc.GUITimeOut.closeWindow()");

        //
        cc.AudioMng.getInstance().playCloseWindow();

        //
        this.getWindow().removeAllChildren(true);
        this.m_ShopData = null;
        this.m_ForceOther = null;

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUITimeOut._instance = null;
cc.GUITimeOut.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUITimeOut();
        this._instance.init();
    }

    return this._instance;
};

var timeoutBacktoMaineMenu = function()
{
    cc.log("超时退出登录");

    //linhao
    return;

    cc.NodeSelf.getInstance().logout();
    cc.DataMng.getInstance().setAutoLoginFlag(false);
    MailMng.getInstance().notifyLogout();
    FriendsMng.getInstance().notifyLogout();

    //清除了照片
    PhotoLoad.getInstance().cleanUpLocalData();
    cc.NodeSelf.getInstance().setSelfPhoto("");
    if (!(cc.Director.getInstance().getRunningScene() instanceof Scene_MainMenu))
    {
        cc.Director.getInstance().replaceScene(Scene_MainMenu.create(false, true));
    }
};

var netTimeoutCall = function()
{
    cc.log("netTimeoutCall");
    if (cc.Director.getInstance().getRunningScene() instanceof Scene_MainMenu)
    {
        cc.log("正在scene_mainMenu");
        return;
    }
    if(cc.GUITimeOut && false)
    {
        cc.GUITimeOut.getInstance().openWindow(cc.Director.getInstance().getRunningScene());
    }
    else
    {
        cc.GUIMsgView.getInstance().openWindow(cc.Director.getInstance().getRunningScene(), Resource.KoreanTxt["bad_internet"]);

        var myaction = cc.Sequence.create(
            cc.CallFunc.create(
                function()
                {
                    cc.log("runaction...netTimeoutCall");
                }
            ),
            cc.DelayTime.create(5),
            cc.CallFunc.create(
                function()
                {
                    timeoutBacktoMaineMenu();
                }
            )
        );

        cc.Director.getInstance().getRunningScene().runAction(myaction);

    }
};
