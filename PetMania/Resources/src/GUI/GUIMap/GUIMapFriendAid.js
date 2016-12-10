
//======================================================================================================================
cc.GUIMapFriendAid = cc.GUIWindow.extend({

    description: function ()
    {
        return "GUIMapFriendAid";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        var background = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(background);

        //
        var spriteTitle = cc.Sprite.createWithSpriteFrameName("map_label_option_ask_help.png");
        this.getWindow().addChild(spriteTitle);
        spriteTitle.setPosition(cc.p(_ScreenWidth()/2, _ScreenHeight()/2 + 150 * Defines.BASE_SCALE));

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(_ScreenWidth() - 50 * Defines.BASE_SCALE, _ScreenHeight() - 50 * Defines.BASE_SCALE));

        //
        var buttonAid = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_mass_send_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_mass_send_sel.png"),
            this._btnSendAidCallback, this);
        buttonAid.setPosition(cc.p(_ScreenWidth()/2, _ScreenHeight()/2 - 160 * Defines.BASE_SCALE));
//        buttonAid.setVisible(false);
        //
        var menu = cc.Menu.create(buttonClose, buttonAid);
        menu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(menu);

        //
        var labelDesc = cc.LabelTTF.create(Resource.ChineseTxt["space_6"], Defines.DefaultFont, 22 * Defines.BASE_SCALE);
        this.getWindow().addChild(labelDesc);
        labelDesc.setPosition(cc.p(_ScreenWidth()/2, _ScreenHeight()/2 - 70 * Defines.BASE_SCALE));

        var labelDesc2 = cc.LabelTTF.create(Resource.ChineseTxt["space_9"], Defines.DefaultFont, 22 * Defines.BASE_SCALE);
        this.getWindow().addChild(labelDesc2);
        labelDesc2.setPosition(cc.p(_ScreenWidth()/2, _ScreenHeight()/2 - 115 * Defines.BASE_SCALE));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback: function()
    {
        this.closeWindow();
        cc.GUIMap.getInstance().setZonesEnabled(true);
        cc.GUIMap.getInstance().handleMapEnterAction(true);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnSendAidCallback: function()
    {
        this.closeWindow();
        cc.GUIMap.getInstance().setZonesEnabled(true);
        cc.GUIMap.getInstance().handleMapEnterAction(true);

        //
        if(Defines.IS_KO)
        {
            cc.GUIAskHelpKakao.getInstance().openWindow(cc.Director.getInstance().getRunningScene());
            return;
        }

        var friendOpen = cc.GUISubFriendsList.getInstance().isWindowOpen();
        if (!friendOpen)
        {
            cc.GUISubFriendsList.getInstance().openWindow(
                cc.Director.getInstance().getRunningScene(),
                new GUISubFriendsList_Operation_AskHelp(
                    cc.GUIMapMng.getInstance().getMaxProcessMapZoneID()
                )
            );
        }
        else
        {
            cc.GUISubFriendsList.getInstance().closeWindow();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateFriendContent: function()
    {
        //
        var mapID = cc.GUIMapMng.getInstance().getMaxProcessMapZoneID();
        var helpData = cc.DataMng.getInstance().getFriendCokeHelp(mapID.toString());
        helpData = helpData ? helpData : [];
        cc.log("GUIMapFriendAid-----helpData :" + helpData);

        //
        var friendPosition = [
            cc.p(_ScreenWidth()/2 - 270 * Defines.BASE_SCALE, _ScreenHeight()/2 + 20 * Defines.BASE_SCALE),
            cc.p(_ScreenWidth()/2 - 150 * Defines.BASE_SCALE, _ScreenHeight()/2 + 20 * Defines.BASE_SCALE),
            cc.p(_ScreenWidth()/2 - 35 * Defines.BASE_SCALE, _ScreenHeight()/2 + 20 * Defines.BASE_SCALE),
            cc.p(_ScreenWidth()/2 + 75 * Defines.BASE_SCALE, _ScreenHeight()/2 + 20 * Defines.BASE_SCALE),
            cc.p(_ScreenWidth()/2 + 200 * Defines.BASE_SCALE, _ScreenHeight()/2 + 20 * Defines.BASE_SCALE)
        ];

        if(Defines.IS_KO)
        {
            friendPosition = null;
            friendPosition = [
                cc.p(_ScreenWidth()/2 - 210 * Defines.BASE_SCALE, _ScreenHeight()/2 + 20 * Defines.BASE_SCALE),
                cc.p(_ScreenWidth()/2 - 35 * Defines.BASE_SCALE, _ScreenHeight()/2 + 20 * Defines.BASE_SCALE),
                cc.p(_ScreenWidth()/2 + 135 * Defines.BASE_SCALE, _ScreenHeight()/2 + 20 * Defines.BASE_SCALE)
            ];
        }

        //
        var self = this;
        friendPosition.forEach(function(position, index)
        {
            if (index >= helpData.length)
            {
                var spriteTemp = cc.Sprite.createWithSpriteFrameName("general_photo_frame_temp.png");
                self.getWindow().addChild(spriteTemp, 1);
                spriteTemp.setAnchorPoint(cc.p(0, 0.5));
                spriteTemp.setPosition(position);

                var grayCoke = cc.Sprite.createWithSpriteFrameName("general_coke_0.png");
                self.getWindow().addChild(grayCoke);
                grayCoke.setPosition(cc.p(position.x, position.y + 15 * Defines.BASE_SCALE));
                grayCoke.setRotation(-25);
            }
            else
            {
                var roleID = helpData[index];
                var createPhoto = self._createPhotoWithRoleID(roleID);
                if (createPhoto)
                {
                    self.getWindow().addChild(createPhoto, 1);
                    createPhoto.setPosition(position);

                    var lightCoke = cc.Sprite.createWithSpriteFrameName("general_coke_1.png");
                    self.getWindow().addChild(lightCoke);
                    lightCoke.setPosition(cc.p(position.x, position.y + 15 * Defines.BASE_SCALE));
                    lightCoke.setRotation(-25);
                }
            }
        });

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _createPhotoWithRoleID: function(roleID)
    {
        var photoFrame = cc.Sprite.createWithSpriteFrameName("general_photo_frame.png");
        var photoSize = photoFrame.getContentSize();

        var friendInfo = FriendsMng.getInstance().getFriendInfoByRoleId(roleID);
        if (friendInfo)
        {
            var photoUrl = friendInfo.getPhotoUrl();
            if (photoUrl && photoUrl != "")
            {
                var createPhoto =  cc.Sprite.create(photoUrl);
                if (createPhoto)
                {
                    var photoLayer = cc.Layer.create();
                    photoLayer.ignoreAnchorPointForPosition(false);
                    photoLayer.setContentSize(photoSize);
                    photoLayer.setAnchorPoint(cc.p(0, 0.5));

                    photoLayer.addChild(photoFrame, 1);
                    photoFrame.setPosition(cc.p(photoSize.width/2, photoSize.height/2));

                    photoLayer.addChild(createPhoto);
                    createPhoto.setPosition(cc.p(photoSize.width/2, photoSize.height/2));

                    var createSize = createPhoto.getContentSize();
                    createPhoto.setScaleX((photoSize.width - 8 * Defines.BASE_SCALE) /createSize.width);
                    createPhoto.setScaleY((photoSize.height - 8 * Defines.BASE_SCALE) /createSize.height);

                    return photoLayer;
                }
            }
        }

        //
        var defaultPhoto= cc.Sprite.createWithSpriteFrameName("general_default_photo_1.png");
        defaultPhoto.setAnchorPoint(cc.p(0, 0.5));
        var defaultSize = defaultPhoto.getContentSize();
        defaultPhoto.setScaleX((photoSize.width) /defaultSize.width);
        defaultPhoto.setScaleY((photoSize.height) /defaultSize.height);

        return defaultPhoto;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);

        //
        this.addContent();
        this.updateFriendContent();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();
        this.getWindow().removeAllChildren(true);
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIMapFriendAid._instance = null;
cc.GUIMapFriendAid.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIMapFriendAid();
        this._instance.init();
    }

    return this._instance;
};