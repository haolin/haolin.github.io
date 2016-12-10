
cc.GUIInviteLogin = cc.GUIPopupWindow.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function ()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    description : function ()
    {
        return  "GUIInviteLogin";
    },

    //------------------------------------------------------------------------------------------------------------------
    init : function ()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent : function ()
    {
        var panel = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back0.png");
        this.getWindow().addChild(panel);

        var mainSize = panel.getContentSize();
        var winSize = cc.Director.getInstance().getWinSize();

         //
        panel.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.5));

        //
        var backFrame = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back5.png");
        panel.addChild(backFrame);
        backFrame.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.53));

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(mainSize.width - 25 * Defines.BASE_SCALE, mainSize.height - 25 * Defines.BASE_SCALE));

        var toNewMenu = cc.Menu.create(buttonClose);
        toNewMenu.setPosition(cc.p(0, 0));
        panel.addChild(toNewMenu);

        //
        if (!cc.NodeSelf.getInstance().isLogin()){
            var _loginButton = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("MainMenu_btn_login_nor.png"),
                cc.Sprite.createWithSpriteFrameName("MainMenu_btn_login_sel.png"),
                this.callBackLogin, this);

            var img = cc.Sprite.createWithSpriteFrameName("icon_social_facebook.png");
            if (img)
            {
                _loginButton.addChild(img);
                img.setPosition(cc.p(205 * Defines.BASE_SCALE, 55 * Defines.BASE_SCALE));
            }

            _loginButton.setScale(0.75);

            var showText = "Login now \nand get reward! ";
        }
        else {
            var spriteNormal = cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_BtnInviteUp.png");
            var spriteSelected = cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_BtnInviteDown.png");
            var _loginButton = cc.MenuItemSprite.create(spriteNormal, spriteSelected, this._inviteFriends, this);
            var showText = "Invite friends now \nand get reward! ";
        }

        _loginButton.setPosition(cc.p(mainSize.width * 0.5, 45 * Defines.BASE_SCALE));

        var loginMenu = cc.Menu.create(_loginButton);
        loginMenu.setPosition(cc.p(0, 0));
        panel.addChild(loginMenu);

        var labelShowText = cc.LabelTTF.create(showText, Defines.DefaultFont, 22 * Defines.BASE_SCALE);
        panel.addChild(labelShowText);
        labelShowText.setPosition(cc.p(mainSize.width / 2, mainSize.height * 0.5));

        var img_Monster = cc.Sprite.createWithSpriteFrameName("Images_monster_2.png");
        panel.addChild(img_Monster);
        img_Monster.setPosition(cc.p(mainSize.width * 0.2, mainSize.height * 0.7));
        return this;
    },

    callBackLogin: function(sender)
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        var joyFlags = _GetJoyFlags();

        var curJoyFlag = joyFlags[0];
        cc.log("将要登录的用户系统 = " + curJoyFlag);

        _Login(curJoyFlag);

        cc.DataMng.getInstance().addHeart(1);

        this.closeWindow();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _inviteFriends: function()
    {
        if (_IsFacebook())
        {
            facebookInvite("come to play,baby!This is a very interesting game!");
        }
        cc.DataMng.getInstance().addHeart(1);

        this.closeWindow();
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback: function()
    {
        if (!this.isWindowOpen())
        {
            return this;
        }

        //
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        this.closeWindow();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow : function (render)
    {
        this._super(render);
        cc.ResourceMng.getInstance().addToCache(
            Resource.GUIMainMenu_plist,
            Resource.GUIMainMenu_png);
        cc.ResourceMng.getInstance().addToCache(
            Resource._GUIFirendsScoresTop_plist,
            Resource._GUIFirendsScoresTop_png);
        this.addContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow : function ()
    {
        this._super();
        cc.ResourceMng.getInstance().removeFromCache(
            Resource.GUIMainMenu_plist,
            Resource.GUIMainMenu_png);
        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUIFirendsScoresTop_plist,
            Resource._GUIFirendsScoresTop_png);
        this.getWindow().removeAllChildren(true);
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});


cc.GUIInviteLogin._instance = null;
cc.GUIInviteLogin.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIInviteLogin();
        this._instance.init();
    }

    return this._instance;
};
