
cc.GUIFriendInfo = cc.GUIPopupWindow.extend ({

    description: function()
    {
        return "GUIFriendInfo";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //
        this.m_MainUI = null;

        this.m_info = null;
        //
        this.m_Menu = null;
        this.m_ButtonSend = null;
        this.m_ButtonRequest = null;
        this.invaildSendBtn = null;
        this.invaildRequestBtn = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._super();
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    decoratePhoto: function (friendInfo)
    {
        var photoUrl = (friendInfo instanceof FriendInfoSelf)
            ? cc.NodeSelf.getInstance().getSelfPhoto() : friendInfo.getPhotoUrl();

        if (photoUrl == "")
        {
            ////cc.log("没有照片 = " + friendInfo);
            var friendPhoto = cc.Sprite.createWithSpriteFrameName("general_default_photo_1.png");

        }
        else {
            var friendPhotoImg =  cc.Sprite.create(photoUrl);
            if (!friendPhotoImg)
            {
                ////cc.log("好友 = " + friendInfo);
                ////cc.log("照片地址不对?? = " + photoUrl);
                var friendPhoto = cc.Sprite.createWithSpriteFrameName("general_default_photo_1.png");
            }
            else {
                var friendPhoto = cc.Sprite.create(photoUrl);
            }
        }

        this.m_MainUI.addChild(friendPhoto);
//
        friendPhoto.setPosition(cc.p(121 * Defines.BASE_SCALE, 232 * Defines.BASE_SCALE));
        var defaultPhoto = cc.Sprite.createWithSpriteFrameName("general_default_photo_1.png");
        //
        friendPhoto.setScaleX(defaultPhoto.getContentSize().width/friendPhoto.getContentSize().width);
        friendPhoto.setScaleY(defaultPhoto.getContentSize().height/friendPhoto.getContentSize().height);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setContent: function(friendInfo)
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(blockLayer, -1);
        this.m_info = friendInfo;
        //
        this.m_MainUI = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back0.png");
        this.getWindow().addChild(this.m_MainUI);
        this.m_MainUI.setPosition(_ScreenCenter());

        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        var backFrame = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back5.png");
        this.m_MainUI.addChild(backFrame);
        backFrame.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.53));

        //好友头像
        this.decoratePhoto(friendInfo);

        var fontSize = 20 * Defines.BASE_SCALE;
        //好友姓名
        var labelFriendName = cc.LabelTTF.create(friendInfo.getName(10), Defines.DefaultFont, fontSize);
        this.m_MainUI.addChild(labelFriendName);
        labelFriendName.setPosition(cc.p(211 * Defines.BASE_SCALE, 232 * Defines.BASE_SCALE));

        //
        var labelStarName = cc.LabelTTF.create(friendInfo.getCurrentMap(), Defines.DefaultFont, fontSize);
        this.m_MainUI.addChild(labelStarName);
        labelStarName.setPosition(cc.p(mainSize.width/2, 167 * Defines.BASE_SCALE));

        var labelLevelText = cc.LabelTTF.create("진행스테이지 ：", Defines.DefaultFont, fontSize);
        this.m_MainUI.addChild(labelLevelText);
        labelLevelText.setPosition(cc.p(mainSize.width/2 - 20 * Defines.BASE_SCALE, 128 * Defines.BASE_SCALE));

        cc.log("friendInfo.getID() = " + friendInfo.getID());
        cc.log("cc.NodeSelf.getInstance().getUID() = " + cc.NodeSelf.getInstance().getUID());
        if (friendInfo.getID() == cc.NodeSelf.getInstance().getUID()){

            var totaldata = cc.DataMng.getInstance().getTotalData();
            var totalLevel = totaldata[1];

            var labelLevelNum = cc.LabelTTF.create(totalLevel, Defines.DefaultFont, fontSize);
        }
        else {
            var labelLevelNum = cc.LabelTTF.create(friendInfo.getMaxGameLevelIndx(), Defines.DefaultFont, fontSize);
        }

        this.m_MainUI.addChild(labelLevelNum);
        labelLevelNum.setPosition(cc.p(mainSize.width/2 + 50 * Defines.BASE_SCALE, 128 * Defines.BASE_SCALE));

        //
        this.m_Menu = cc.Menu.create();
        this.m_Menu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(this.m_Menu);

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(mainSize.width - 25 * Defines.BASE_SCALE, mainSize.height - 25 * Defines.BASE_SCALE));
        this.m_Menu.addChild(buttonClose);

        //
        this.m_ButtonSend = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_send_heart_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_send_heart_sel.png"),
            this._btnSendCallback, this);
        this.m_ButtonSend.setPosition(cc.p(mainSize.width/2 - 82 * Defines.BASE_SCALE, 50 * Defines.BASE_SCALE));
        this.m_Menu.addChild(this.m_ButtonSend);

        this.invaildSendBtn = cc.Sprite.createWithSpriteFrameName("general_btn_send_heart_grey.png");
        this.invaildSendBtn.setPosition(this.m_ButtonSend.getPosition());
        this.m_MainUI.addChild(this.invaildSendBtn);
        this.invaildSendBtn.setVisible(false);

        //求助按钮
        this.m_ButtonRequest = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_request_heart_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_request_heart_sel.png"),
            this._btnRequestCallback, this);
        this.m_ButtonRequest.setPosition(cc.p(mainSize.width/2 + 82 * Defines.BASE_SCALE, 50 * Defines.BASE_SCALE));

        this.m_Menu.addChild(this.m_ButtonRequest);

        this.invaildRequestBtn = cc.Sprite.createWithSpriteFrameName("general_btn_request_heart_grey.png");
        this.invaildRequestBtn.setPosition(this.m_ButtonRequest.getPosition());
        this.m_MainUI.addChild( this.invaildRequestBtn);
        this.invaildRequestBtn.setVisible(false);

        if (friendInfo.getID() == cc.NodeSelf.getInstance().getUID()){
            this.m_ButtonRequest.setVisible(false);
            this.m_ButtonSend.setVisible(false);
        }
        else {
            this.decorateHeartContent(friendInfo);
        }

        //
        var labelFinalTip = cc.LabelTTF.create("선물과 조르기는 동일 친구에게 1일 1회만 가능 합니다.", Defines.DefaultFont, 16 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelFinalTip);
        labelFinalTip.setPosition(cc.p(mainSize.width/2, -15 * Defines.BASE_SCALE));

        var labelFinalTip_2 = cc.LabelTTF.create(Resource.ChineseTxt["labelFinalTip_2"], Defines.DefaultFont, 16 * Defines.BASE_SCALE);
        this.m_MainUI.addChild(labelFinalTip_2);
        labelFinalTip_2.setPosition(cc.p(mainSize.width/2, labelFinalTip.getPosition().y - labelFinalTip.getContentSize().height / 2 - labelFinalTip_2.getContentSize().height / 2 - 10 *Defines.BASE_SCALE));

        return this;
    },

    decorateHeartContent: function (friendInfo)
    {

        var hasLeftGiveTime = parseInt((friendInfo.getGiveHeartTime() - _ServerTime()));

        this.m_ButtonSend.setVisible(hasLeftGiveTime <= 0);
        this.invaildSendBtn.setVisible(hasLeftGiveTime > 0);

        var hasLeftAskTime = parseInt((friendInfo.getAskHeartTime() - _ServerTime()));
        this.m_ButtonRequest.setVisible(hasLeftAskTime <= 0);
        this.invaildRequestBtn.setVisible(hasLeftAskTime > 0);

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
    _btnSendCallback: function ()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

//        if (!(cc.Director.getInstance().getRunningScene() instanceof Scene_MainMenu))
//        {
//            cc.Director.getInstance().replaceScene(Scene_MainMenu.create(false, true));
//        }
        ////cc.log("_giveHeart cellIndx = " + cellIndx);


        if (this.m_info)
        {
            FriendsMng.getInstance().giveFriendHeart(this.m_info.getID(), 1);
        }
        else
        {
            ////cc.log("cellIndx = " + cellIndx);
        }

        this.closeWindow();
        return this;
    },


    //------------------------------------------------------------------------------------------------------------------
    _btnRequestCallback: function ()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        if (this.m_info)
        {
            FriendsMng.getInstance().askFriendHeart(this.m_info.getID(), 1);
        }
        else
        {
            ////cc.log("cellIndx = " + cellIndx);
        }

        this.closeWindow();

//        if (!(cc.Director.getInstance().getRunningScene() instanceof Scene_MainMenu))
//        {
//            cc.Director.getInstance().replaceScene(Scene_MainMenu.create(false, true));
//        }


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, friendInfo)
    {
        this._super(render);

        //
        cc.AudioMng.getInstance().playOpenWindow();

        //
        this.setContent(friendInfo);
//        this.updateUIContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        cc.AudioMng.getInstance().playCloseWindow();

        //
        this.getWindow().removeAllChildren(true);

        return this;
    }
    //------------------------------------------------------------------------------------------------------------------
});


cc.GUIFriendInfo._instance = null;
cc.GUIFriendInfo.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIFriendInfo();
        this._instance.init();
    }

    return this._instance;
};