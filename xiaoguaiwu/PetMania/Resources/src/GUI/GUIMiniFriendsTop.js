
cc.GUIMiniFriendsTop = cc.GUIPopupWindow.extend ({

    description: function()
    {
        return "GUIMiniFriendsTop";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //
        this.m_MainUI = null;

        //
        this.m_Menu = null;
        this.m_ButtonModeSmooth = null;
        this.m_ButtonModeAdvanced = null;
        this.m_ButtonAccount = null;
        this.m_ButtonBackToMain = null;

        //
        this.m_SpriteSoundDisabled = null;
        this.m_SpriteMusicDisabled = null;
        this.m_SpriteNotifDisabled = null;

        this.m_gamelevel = "LEVEL_1";
        this.m_Info = {};

        this.m_FriendsInfos = [];
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
        this.getWindow().addChild(blockLayer, 3000);

        //
        var tempMain = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png");
        var srcSize = tempMain.getContentSize();

        //
        this.m_MainUI = cc.Scale9Sprite.create(
            _GUIPath + "GUINewGeneral/general_back9.png",
            cc.rect(0, 0, srcSize.width, srcSize.height),
            cc.rect(srcSize.width * 0.3, srcSize.height * 0.3, srcSize.width * 0.4, srcSize.height * 0.4));


        //
        var mainSize = cc.size(485 * Defines.BASE_SCALE, 286 * Defines.BASE_SCALE);

        //
        this.m_MainUI.setContentSize(mainSize);
        this.getWindow().addChild(this.m_MainUI, 3001);
        this.m_MainUI.setPosition(_ScreenCenter());


        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(mainSize.width - 20 * Defines.BASE_SCALE, mainSize.height - 20 * Defines.BASE_SCALE));
        //
        this.m_Menu = cc.Menu.create(buttonClose);
        this.m_MainUI.addChild(this.m_Menu);
        this.m_Menu.setPosition(cc.p(0, 0));

        //

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback: function ()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        this.closeWindow();

        return this;
    },


    //------------------------------------------------------------------------------------------------------------------
    updateUIContent: function()
    {
        var self = this;
        //

        this.m_FriendsInfos.sort(
            function(left, right)
            {
                var leftScore = left.getGameLevelScore(self.getCurGameLevel());
                var rightScore = right.getGameLevelScore(self.getCurGameLevel());
                return leftScore > rightScore ? -1 : 1;
            }
        );

        this.m_FriendsInfos.forEach(
            function(a_friend, index)
            {
                cc.log("m_FriendsInfos[i] = " + a_friend);
            }
        );

       var mainSize = this.m_MainUI.getContentSize();//cc.size(450 * Defines.BASE_SCALE, 400 * Defines.BASE_SCALE);

        var beginPosition = [
            cc.p(mainSize.width * 0.5 - 160 * Defines.BASE_SCALE, mainSize.height - 104 * Defines.BASE_SCALE),
            cc.p(mainSize.width * 0.5, mainSize.height - 104 * Defines.BASE_SCALE),
            cc.p(mainSize.width * 0.5 + 160 * Defines.BASE_SCALE, mainSize.height - 104 * Defines.BASE_SCALE),
            cc.p(mainSize.width * 0.5 - 80 * Defines.BASE_SCALE, mainSize.height / 2 - 78 * Defines.BASE_SCALE),
            cc.p(mainSize.width * 0.5 + 80 * Defines.BASE_SCALE, mainSize.height / 2 - 78 * Defines.BASE_SCALE)
        ];

        var photoMenu = cc.GUIMenu.create();
//        photoMenu.setTouchHandle(cc.MENU_HANDLER_PRIORITY + 3, false);
        this.m_MainUI.addChild(photoMenu);

        for (var i = 0 ; i < 5 && i < this.m_FriendsInfos.length ; i++){
            var info = this.m_FriendsInfos[i];

            if (info.getGameLevelScore(self.getCurGameLevel()) <= 0){
                continue;
            }

            var photoUrl = info.getPhotoUrl();
            var hasPhoto = photoUrl && photoUrl != "";

            var photoBgFile = hasPhoto ? "map_photo_bg.png" : "general_default_photo_1.png";

            var createPhoto =  cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName(photoBgFile),
                cc.Sprite.createWithSpriteFrameName(photoBgFile),
                self._btnPhotoCallback, self);

            createPhoto.setTag(i);
            var bgSize = createPhoto.getContentSize();
            if (hasPhoto)
            {

                var photo = cc.Sprite.create(photoUrl);
                if (photo)
                {
                    var size = photo.getContentSize();
                    photo.setScaleX((bgSize.width - 5 * Defines.BASE_SCALE) /size.width);
                    photo.setScaleY((bgSize.height - 5 * Defines.BASE_SCALE) /size.height);
                }
                else
                {
                    photo = cc.Sprite.createWithSpriteFrameName("general_default_photo_1.png");
                }
            }
            else {
                var photo = cc.Sprite.createWithSpriteFrameName("general_default_photo_1.png");
            }

            createPhoto.addChild(photo);
            photo.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.5));

            //好友名称
            var labelFriendName = cc.LabelTTF.create(info.getName(10), Defines.DefaultFont, 14 * Defines.BASE_SCALE);

//            cc.log("short LabelFriendName  = " + info.getName(4));
            createPhoto.addChild(labelFriendName);
            labelFriendName.setPosition(cc.p(50 * Defines.BASE_SCALE, 80 * Defines.BASE_SCALE));

            //好友名次
            if (i < 3){
                var posSpr = cc.Sprite.createWithSpriteFrameName("icon_huangguan0" + (i + 1) +".png");
                posSpr.setPosition(cc.p(- 10 * Defines.BASE_SCALE, 80 * Defines.BASE_SCALE));

                createPhoto.addChild(posSpr);
            }
            else {
                var posSpr = cc.LabelTTF.create((i+1), Defines.DefaultFont, 22 * Defines.BASE_SCALE);
                posSpr.setPosition(cc.p(- 10 * Defines.BASE_SCALE, 80 * Defines.BASE_SCALE));

                createPhoto.addChild(posSpr);
//                cell.getChildByTag(this._static().CELL_CONTENT_TAG.POSITION).setString((idx + 1).toString());
            }


            photoMenu.addChild(createPhoto);
            createPhoto.setPosition(beginPosition[i]);

        }

//        cc.log("this.m_Info = " + this.m_Info);

        return this;
    },

    _btnPhotoCallback: function(sender)
    {
        cc.log("GUIMiniFriendsTop_btnPhotoCallback");

        var friendInfo = this.m_FriendsInfos[sender.getTag()];

//        var friendInfo = this.m_FriendsInfosByScoreTop[sender.getTag()];//this.m_MapFriendRoleIdToPos[sender.getTag()];
        this.closeWindow();

        cc.GUIFriendInfo.getInstance().openWindow(cc.Director.getInstance().getRunningScene(), friendInfo);
    },

        //------------------------------------------------------------------------------------------------------------------
    getCurGameLevel: function()
    {
        return this.m_gamelevel;
    },
    //------------------------------------------------------------------------------------------------------------------
    updateGUI: function()
    {
        cc.log("GUIMyFriendsTop updateGUI");

        if (this.isWindowOpen())
        {
            this.getWindow().removeAllChildren(true);
            this.setContent();
            this.updateUIContent();
        }

        return this;
    },

    openWindowFlag: function()
    {
        this.m_FriendsInfos = [];
        this.m_FriendsInfos = FriendsMng.getInstance().getFriendsInfos().concat();

        this.m_FriendsInfos.unshift(FriendInfo.createSelf(this.getCurGameLevel()));

        var validNum = 0;
        var self = this;
        this.m_FriendsInfos.forEach(
            function(info,index){
                if (info.getGameLevelScore(self.getCurGameLevel()) > 0){
                    validNum ++;
                }
            }
        );

        return validNum;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, gameLevel)
    {
        this.m_gamelevel = gameLevel;

        if (cc.GUIGameLevelStart.getInstance().isWindowOpen()){
            return this;
        }

        var levelData = cc.DataMng.getInstance().getLevelDataWithName(this.m_gamelevel);
        cc.log("levelData name = " + this.m_gamelevel);

        if (levelData)
        {
            if (levelData.IS_SPACE_LEVEL)
            {
                return this;
            }
        }
        if (this.openWindowFlag() <= 0){
            return this;
        }

        this._super(render);

        //
        cc.AudioMng.getInstance().playOpenWindow();

        FriendsMng.getInstance().applyFriendsGameLevelScoresFromHome(this.getCurGameLevel());

        cc.log("this.m_gamelevel = " + this.m_gamelevel);
//        this.m_Info = m_Info;
        //
        this.setContent();
        this.updateUIContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        cc.AudioMng.getInstance().playCloseWindow();
        this.m_FriendsInfos = [];
        //
        this.getWindow().removeAllChildren(true);

        return this;
    }
    //------------------------------------------------------------------------------------------------------------------
});


cc.GUIMiniFriendsTop._instance = null;
cc.GUIMiniFriendsTop.getInstance = function ()
{
    var self = this;

    if (!this._instance)
    {
        this._instance = new cc.GUIMiniFriendsTop();
        this._instance.init();
    }

    FriendsMng.getInstance().registerEvent(
        _FRIENDS_MNG_EVENT.GET_FRIENDS_SCORE_SUCC,
        function()
        {
            cc.log("_FRIENDS_MNG_EVENT.GET_FRIENDS_SCORE_SUCC");

            if (self._instance.isWindowOpen())
            {
//                self._instance.cleanLoading();
                self._instance.updateGUI();
            }
        },
        null);

    return this._instance;
};