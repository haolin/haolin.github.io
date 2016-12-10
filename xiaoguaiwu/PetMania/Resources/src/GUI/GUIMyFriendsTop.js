
//----------------------------------------------------------------------------------------------------------------------
var MyFriendsTop_CellBuilder = cc.Class.extend({

    //
    CELL_CONTENT_TAG:
    {
        BACK_GROUND_SELF: 999,      //背景
        BACK_GROUND_FRIEND: 1000,   //背景
        POSITION: 1001,             //位置
        PHOTO: 1002,                //头像
        FRIEND_NAME: 1003,          //好友名字
        FRIEND_SCORE: 1004,         //好友分数
        GIVE_HEART: 1005,           //给心
        GIVE_HEART_CD: 1006,        //给心的cd
        LOAD: 1007                  //更新分数
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(cellSize)
    {
        this.m_CellSize = cellSize || cc.size(10 * Defines.BASE_SCALE, 10 * Defines.BASE_SCALE);

        this.m_idx = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    _static: function()
    {
        return MyFriendsTop_CellBuilder.prototype;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "MyFriendsTop_CellBuilder";
    },

    //------------------------------------------------------------------------------------------------------------------
    getCellSize: function()
    {
        return this.m_CellSize;
    },

    //------------------------------------------------------------------------------------------------------------------
    buildCell: function(cell, idx, _btnPhotoCallback, targetGUI)
    {
        var self = this;
        cell.removeAllChildren(true);

        this.m_idx =idx;

        this.m_btnPhotoCallback = _btnPhotoCallback;
        this.m_targetGUI = targetGUI;

        //背景
        var backGroundSelf = cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_Panel2.png");
        cell.addChild(backGroundSelf, 0, this._static().CELL_CONTENT_TAG.BACK_GROUND_SELF);
        backGroundSelf.setAnchorPoint(cc.p(0, 0));

        //
        var backGroundFriend = cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_Panel1.png");
        cell.addChild(backGroundFriend, 0, this._static().CELL_CONTENT_TAG.BACK_GROUND_FRIEND);
        backGroundFriend.setAnchorPoint(cc.p(0, 0));

        //排行榜位置


//        if (idx < 3){
//            var topPos = cc.LabelAtlas.create("9",
//                _GUIPath + "Num/num_16_30x40.png",
//                30, 40,
//                "0");
//        }
//        else {
            var topPos = cc.LabelTTF.create("4", Defines.DefaultFont, 28 * Defines.BASE_SCALE);
//        }

//        var topPos = cc.LabelTTF.create("999", Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        cell.addChild(topPos, 0, this._static().CELL_CONTENT_TAG.POSITION);
        topPos.setAnchorPoint(cc.p(0.5, 0.5));
        topPos.setPosition(cc.p(110 * Defines.BASE_SCALE, 66 * Defines.BASE_SCALE));//35 * Defines.BASE_SCALE


        //名字
        var hisName = cc.LabelTTF.create("名字名字名字", Defines.DefaultFont, 14 * Defines.BASE_SCALE);
        cell.addChild(hisName, 0, this._static().CELL_CONTENT_TAG.FRIEND_NAME);
        hisName.setAnchorPoint(cc.p(0.5, 0.5));
        hisName.setPosition(cc.p(110 * Defines.BASE_SCALE, 42 * Defines.BASE_SCALE));//73 * Defines.BASE_SCALE));

        //照片头像
        var friendPhoto =  cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_PhotoFake.png"),
            cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_PhotoFake.png"),
            _btnPhotoCallback, targetGUI);
        friendPhoto.setTag(idx);
        friendPhoto.setAnchorPoint(cc.p(0.5, 0.5));
//        var friendPhoto = cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_PhotoFake.png");
//        cell.addChild(friendPhoto, 0, this._static().CELL_CONTENT_TAG.PHOTO);
        friendPhoto.setPosition(cc.p(38 * Defines.BASE_SCALE,  45 * Defines.BASE_SCALE));//38 * Defines.BASE_SCALE, 37 * Defines.BASE_SCALE));

        var menu = cc.Menu.create(friendPhoto);
        cell.addChild(menu, 100000, this._static().CELL_CONTENT_TAG.PHOTO);
        menu.setPosition(cc.p(0, 0));

        //分数
        var scoreLab = GUI.createNumberLabel("1234567",
            _GUIPath + "Num/num_5_12x18.png",
            12, 18,
            "0");

        cell.addChild(scoreLab, 0, this._static().CELL_CONTENT_TAG.FRIEND_SCORE);
        scoreLab.setAnchorPoint(cc.p(0.5, 0.5));
        scoreLab.setPosition(cc.p(110 * Defines.BASE_SCALE, 22 * Defines.BASE_SCALE));//52 * Defines.BASE_SCALE));

        //给心的按钮
        //if (true)
        //{
//            var spriteNormal = cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_BtnUp.png");
//            var spriteSelected = cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_BtnDown.png");
//            var buttonGiveHeart = cc.MenuItemSprite.create(spriteNormal, spriteSelected, _btnPhotoCallback, targetGUI);
//            buttonGiveHeart.setTag(idx);
//
//            //
//            var menu = cc.Menu.create(buttonGiveHeart);
//            cell.addChild(menu, 100000, this._static().CELL_CONTENT_TAG.GIVE_HEART);
//            menu.setPosition(cc.p(0, 0));
//            buttonGiveHeart.setPosition(cc.p(110 * Defines.BASE_SCALE, 22 * Defines.BASE_SCALE));
//        //}
//
//        //给心的cd
//        //if (true)
//        //{
//            var cdBack = cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_Panel3.png");
//            cell.addChild(cdBack, 0, this._static().CELL_CONTENT_TAG.GIVE_HEART_CD);
//            cdBack.setPosition(cc.p(120 * Defines.BASE_SCALE, 23 * Defines.BASE_SCALE));
//
//            var giveHeartCDSpr = cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_Invalid.png");
//            cdBack.addChild(giveHeartCDSpr);
//            giveHeartCDSpr.setPosition(cc.p(-5 * Defines.BASE_SCALE, 16 * Defines.BASE_SCALE));
//
//            var timeLab = GUI.createNumberLabel("00:00",
//                _GUIPath + "Num/num_0_10x10.png",
//                10, 10, "0");
//
//            cdBack.addChild(timeLab, 0, this._static().CELL_CONTENT_TAG.GIVE_HEART_CD);
//            timeLab.setAnchorPoint(cc.p(0.5, 0.5));
//            timeLab.setPosition(cc.p(35 * Defines.BASE_SCALE, 17 * Defines.BASE_SCALE));
        //}

        //load scores
//        var loading = cc.LabelTTF.create("loading...", Defines.DefaultFont, 14 * Defines.BASE_SCALE);
//        cell.addChild(loading, 0, this._static().CELL_CONTENT_TAG.LOAD);
//        loading.setAnchorPoint(cc.p(0.5, 0.5));
//        loading.setPosition(cc.p(110 * Defines.BASE_SCALE, 50 * Defines.BASE_SCALE));

        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    decorateCellForSelf: function (cell)
    {
        var buttonGiveHeart = cell.getChildByTag(this._static().CELL_CONTENT_TAG.GIVE_HEART);
        buttonGiveHeart.setVisible(false);

        var cdBack = cell.getChildByTag(this._static().CELL_CONTENT_TAG.GIVE_HEART_CD);
        cdBack.setVisible(false);

        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    decoratePhoto: function (cell, friendInfo)
    {
        var photoUrl = (friendInfo instanceof FriendInfoSelf)
            ? cc.NodeSelf.getInstance().getSelfPhoto() : friendInfo.getPhotoUrl();

        if (photoUrl == "")
        {
            ////cc.log("没有照片 = " + friendInfo);
            return cell;
        }
        var friendPhotoImg =  cc.Sprite.create(photoUrl);
        if (!friendPhotoImg)
        {
            ////cc.log("好友 = " + friendInfo);
            ////cc.log("照片地址不对?? = " + photoUrl);
            return cell;
        }

        var basePhoto = cell.getChildByTag(this._static().CELL_CONTENT_TAG.PHOTO);

        var friendPhoto =  cc.MenuItemSprite.create(
            cc.Sprite.create(photoUrl),
            cc.Sprite.create(photoUrl),
            this.m_btnPhotoCallback, this.m_targetGUI);

        friendPhoto.setPosition(cc.p(38 * Defines.BASE_SCALE,  48 * Defines.BASE_SCALE));//basePhoto.getPosition());
        friendPhoto.setTag(this.m_idx);

        var defaultPhoto = cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_PhotoFake.png");
        //
        friendPhoto.setScaleX(defaultPhoto.getContentSize().width/friendPhoto.getContentSize().width);
        friendPhoto.setScaleY(defaultPhoto.getContentSize().height/friendPhoto.getContentSize().height);


        cell.removeChildByTag(this._static().CELL_CONTENT_TAG.PHOTO);
        var menu = cc.Menu.create(friendPhoto);
        cell.addChild(menu, 100000, this._static().CELL_CONTENT_TAG.PHOTO);
        menu.setPosition(cc.p(0, 0));

        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    decorateGiveHeartContent: function (cell, friendInfo)
    {
        return this;
        var self = this;

        var leftTime = parseInt((friendInfo.getGiveHeartTime() - _ServerTime()));
        if (leftTime < 0)
        {
            leftTime = 0;
        }

        //
        var hasLeftCDTime = (leftTime > 0);
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.GIVE_HEART).setVisible(!hasLeftCDTime);

        //
        var cdBack = cell.getChildByTag(this._static().CELL_CONTENT_TAG.GIVE_HEART_CD);
        cdBack.setVisible(hasLeftCDTime);
        if (!hasLeftCDTime)
        {
            return cell;
        }

        //
        var timeLab = cdBack.getChildByTag(this._static().CELL_CONTENT_TAG.GIVE_HEART_CD);
        timeLab.setString(Tools.convertSecondTimeEx(leftTime, true, true, false));

        //
        cell.unscheduleAllCallbacks();
        cell.schedule(
            function()
            {
                --leftTime;
                if (leftTime < 0)
                {
                    leftTime = 0;
                }

                //
                timeLab.setString(Tools.convertSecondTimeEx(leftTime, true, true, false));
                if (leftTime > 0 && leftTime < 60)
                {
                    //防止出现"00:00"的情况
                    timeLab.setString("00:01");
                }

                //
                if (leftTime <= 0)
                {
                    //
                    cell.unscheduleAllCallbacks();

                    //
                    cell.getChildByTag(self._static().CELL_CONTENT_TAG.GIVE_HEART).setVisible(true);
                    cdBack.setVisible(false);

                    //
                    var friend = FriendsMng.getInstance().getFriendInfoByRoleId(friendInfo.getRoleId());
                    if (friend)
                    {
                        friend.setGiveHeartTime(0);
                    }
                }
            }, 1);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    decorateCell: function(cell, idx, friendInfo, gameLevelName, isLoading)
    {
        var isMySelf = (friendInfo instanceof FriendInfoSelf);

        //背景
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.BACK_GROUND_SELF).setVisible(isMySelf);
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.BACK_GROUND_FRIEND).setVisible(!isMySelf);

        var selfIdx = cc.GUIMyFriendsTop.getInstance().getTopIndex(friendInfo.getRoleId());

        if (selfIdx != -1){
            idx = selfIdx;
        }

        //
        if (idx < 3){
            var posBase = cell.getChildByTag(this._static().CELL_CONTENT_TAG.POSITION);
            var posSpr = cc.Sprite.createWithSpriteFrameName("icon_huangguan0" + (idx + 1) +".png");
            posSpr.setPosition(posBase.getPosition());

            cell.addChild(posSpr);
            posBase.setVisible(posSpr == null);
        }
        else {

            cell.getChildByTag(this._static().CELL_CONTENT_TAG.POSITION).setString((idx + 1).toString());
        }

        //名字
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.FRIEND_NAME).setString(friendInfo.getName(8));

        //分数


        //
        if (isMySelf)
        {
            cell.getChildByTag(this._static().CELL_CONTENT_TAG.FRIEND_SCORE).setVisible(true);
//            cell.getChildByTag(this._static().CELL_CONTENT_TAG.LOAD).setVisible(false);
        }
        else
        {
            cell.getChildByTag(this._static().CELL_CONTENT_TAG.FRIEND_SCORE).setVisible(!isLoading);
//            cell.getChildByTag(this._static().CELL_CONTENT_TAG.LOAD).setVisible(isLoading);
        }

        cell.getChildByTag(this._static().CELL_CONTENT_TAG.FRIEND_SCORE).setString(
            friendInfo.getGameLevelScore(gameLevelName).toString());
        //照片
        this.decoratePhoto(cell, friendInfo);

//        //cd时间的问题
//        if (!isMySelf)
//        {
//            this.decorateGiveHeartContent(cell, friendInfo);
//        }
//        else
//        {
//            this.decorateCellForSelf(cell);
//        }



        return cell;
    }

});
//----------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------------------
cc.GUIMyFriendsTop = cc.GUIWindow.extend ({

    description: function()
    {
        return "GUIMyFriendsTop";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        //

        //this.m_GameLevelIndx = 0;
        this.m_GameLevelName = "LEVEL_1";
		this.buttonInviteFriends = null;
        //
        this.m_FriendTableView = null;
        this.m_FriendsInfosByScoreTop = [];
        this.m_MapFriendRoleIdToPos = {};


        this.m_SelfTableView = null;
        this.m_SelfInfosByScoreTop = [];
        this.m_MapSelfRoleIdToPos = {};
        //
        this.m_BackGround = null;
        this.m_MyCellsBuilder = null;

        //
        this.m_IsLoading = false;

        //Tabs
        this.m_TabIndex = -1;
        this.m_TabButton = [];
        this.m_TabSelect = [];
        this.m_TabLayer = [];
        this.m_TabScroll = [];
        this.empty_tabLayer = null;

        this.buttonSelf = null;
        this.buttonTotal = null;
        this.tabSelectTotal = null;
        this.tabSelectSelf = null;
        //
        this.m_LabelWaitForNext = null;
        this.m_LoginRect = cc.rect(0,0,0,0);
        this.m_NextRect = cc.rect(0,0,0,0);
    },

    //------------------------------------------------------------------------------------------------------------------
    markLoading: function()
    {
        this.m_IsLoading = true;
        //this.updateGUI();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanLoading: function()
    {
        this.m_IsLoading = false;
        //this.updateGUI();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getCurGameLevel: function()
    {
        return /*this.m_GameLevelIndx*/this.m_GameLevelName;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function ()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyButtonEnabled: function(window, setting)
    {
        if (!this.isWindowOpen())
        {
            cc.log("GUIFriendsTop 没有Open 这是个错误");
            return this;
        }

        if (/*window instanceof cc.GUIUnlockItemContainer ||*/
			window instanceof cc.GUISimpleShop ||
            window instanceof cc.GUIBuyDiamond ||
            window instanceof cc.GUIBuySuccess ||
            window instanceof cc.GUIBuyPrompt ||
            window instanceof cc.GUIPopupShare ||
			window instanceof cc.GUIGuideNormal)
        {
            if (this.m_FriendTableView)
            {
                this.m_FriendTableView.setTouchEnabled(setting);
            }
			if (this.buttonInviteFriends)
			{
				this.buttonInviteFriends.setEnabled(setting);
			}
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyOpenWindow: function(window)
    {
		
        this.notifyButtonEnabled(window, false);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyCloseWindow: function(window)
    {
        this.notifyButtonEnabled(window, true);
//		if (window instanceof cc.GUIGuideNormal)
//        {
//			this.notifyButtonEnabled(window, true);
//        }
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    scrollViewDidScroll:function (view)
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    scrollViewDidZoom:function (view)
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    tableCellTouched:function (/*table, cell*/)
    {
        ////cc.log("cell touched at index: " + cell.getIdx());
        //return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cellSizeForTable: function(/*table*/)
    {
        return this.m_MyCellsBuilder.getCellSize();
    },

    //------------------------------------------------------------------------------------------------------------------
    numberOfCellsInTableView:function (/*table*/)
    {

        if (this.m_TabIndex == 0){
            return this.m_FriendsInfosByScoreTop.length;
        }
        else {
            return this.m_SelfInfosByScoreTop.length;
//            var friendInfo = this.m_SelfInfosByScoreTop[idx];
        }
//        return this.m_FriendsInfosByScoreTop.length;
    },

    //------------------------------------------------------------------------------------------------------------------
    tableCellAtIndex:function (table, idx)
    {
        //
        var cell = table.dequeueCell();
        if (!cell)
        {
            cell = new cc.TableViewCell();
        }

        //
        this.m_MyCellsBuilder.buildCell(cell, idx, this._btnPhotoCallback, this);

        //
        if (this.m_TabIndex == 0){
            var friendInfo = this.m_FriendsInfosByScoreTop[idx];
        }
        else {
            var friendInfo = this.m_SelfInfosByScoreTop[idx];
        }

        if (!friendInfo)
        {
            //cc.log("没有好友信息? = " + idx);
            return cell;
        }

        //
        this.m_MyCellsBuilder.decorateCell(cell, idx, friendInfo, this.getCurGameLevel(), this.m_IsLoading);

        return cell;
    },
    //------------------------------------------------------------------------------------------------------------------
    _btnPhotoCallback: function(sender)
    {
        cc.log("_btnPhotoCallback");

        if (this.m_TabIndex == 0){
            var friendInfo = this.m_FriendsInfosByScoreTop[sender.getTag()];
        }
        else {
            var friendInfo = this.m_SelfInfosByScoreTop[sender.getTag()];
        }

//        var friendInfo = this.m_FriendsInfosByScoreTop[sender.getTag()];//this.m_MapFriendRoleIdToPos[sender.getTag()];

        cc.GUIFriendInfo.getInstance().openWindow(this.getWindow(), friendInfo);
    },

    getTopIndex : function(roleId){
        if (this.m_MapFriendRoleIdToPos == {} || roleId == 0 ||!roleId){
            return -1;
        }
        return this.m_MapFriendRoleIdToPos[roleId] || -1;
    },

    //------------------------------------------------------------------------------------------------------------------
    _giveHeart: function(sender)
    {
        var cellIndx = sender.getTag();
        ////cc.log("_giveHeart cellIndx = " + cellIndx);

        var friendInfo = this.m_FriendsInfosByScoreTop[cellIndx];
        if (friendInfo)
        {
            FriendsMng.getInstance().giveFriendHeart(friendInfo.getRoleId(), 1);
        }
        else
        {
            ////cc.log("cellIndx = " + cellIndx);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentNotLogin: function()
    {
        cc.log("未通关提示~");

        var promptLabel = cc.LabelTTF.create(Resource.ChineseTxt[116], Defines.DefaultFont, 16 * Defines.BASE_SCALE);
//        this.m_BackGround.addChild(promptLabel);

        var offset = 0;
        promptLabel.setPosition(
            cc.p(this.m_BackGround.getContentSize().width/2,
                this.m_BackGround.getContentSize().height/2// - 430 * Defines.BASE_SCALE - offset
            ));

        this.empty_tabLayer = cc.Layer.create();
        this.empty_tabLayer.addChild(promptLabel);
        this.m_BackGround.addChild(this.empty_tabLayer,10000);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _addLoginButtonImage: function(loginButton, joyFlag)
    {
        var buttonSize = loginButton.getContentSize();
        if (joyFlag == JoyType.JOY_WEIBO)
        {
            var img = cc.Sprite.createWithSpriteFrameName("icon_social_weibo.png");
            img.setPosition(cc.p(40 * Defines.BASE_SCALE, buttonSize.height/2));
        }
        else if (joyFlag == JoyType.JOY_COCO)
        {
            img = cc.Sprite.createWithSpriteFrameName("icon_social_coco.png");
            img.setPosition(cc.p(40 * Defines.BASE_SCALE, buttonSize.height/2));
        }
        else if (joyFlag == JoyType.JOY_RENREN)
        {
            img = cc.Sprite.createWithSpriteFrameName("icon_social_renren.png");
            img.setPosition(cc.p(40 * Defines.BASE_SCALE, buttonSize.height/2));
        }
        else if (joyFlag == JoyType.JOY_FACEBOOK)
        {
            img = cc.Sprite.createWithSpriteFrameName("icon_social_facebook.png");
            img.setAnchorPoint(cc.p(0, 0.5));
            img.setPosition(cc.p(30 * Defines.BASE_SCALE, buttonSize.height * 0.543));
        }

        if (img)
        {
            loginButton.addChild(img);
            img.setScale(0.6);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _loginGuide: function(/*gameLevelID*/gameLevelName, loginButtonSize, secButtonSize)
    {
        /*if (this.m_GameLevelIndx != gameLevelID)
        {
            return this;
        }*/

        if (this.m_GameLevelName != gameLevelName)
        {
            return this;
        }

        //
//        this.m_LabelWaitForNext = cc.LabelTTF.create(Resource.ChineseTxt[112], Defines.DefaultFont, 30 * Defines.BASE_SCALE);
//        this.m_LabelWaitForNext.setColor(cc.c3b(255,255,255));

        //
//        var defaultWidth = loginButtonSize.width > this.m_LabelWaitForNext.getContentSize().width
//            ? loginButtonSize.width : this.m_LabelWaitForNext.getContentSize().width;
//        var defaultHeigth = loginButtonSize.height > this.m_LabelWaitForNext.getContentSize().height
//            ? loginButtonSize.height : this.m_LabelWaitForNext.getContentSize().height;
        var defaultWidth = loginButtonSize.width;
        var defaultHeight = loginButtonSize.height;
		
		cc.log("defaultWidth =" + defaultWidth);
		cc.log("defaultHeight =" + defaultHeight);
        //
        var offSet = 0;

        if (Defines._NeedFitIpad()){
            offSet = 60 * Defines.BASE_SCALE;
        }

        this.m_LoginRect = cc.rect(
            this.m_BackGround.getPosition().x-this.m_BackGround.getContentSize().width/2.8,
            this.m_BackGround.getContentSize().height - 380 * Defines.BASE_SCALE + offSet,
            defaultWidth,
            defaultHeight);



		if (secButtonSize){
			this.m_LoginRect_2 = cc.rect(
				this.m_BackGround.getPosition().x-this.m_BackGround.getContentSize().width/2.8,
				this.m_BackGround.getContentSize().height - 450 * Defines.BASE_SCALE + offSet,
				defaultWidth,
				defaultHeight);
		}

        //
//        this.m_NextRect = cc.rect(
//            this.m_BackGround.getPosition().x-this.m_BackGround.getContentSize().width/2.8,
//            this.m_BackGround.getContentSize().height - 530 * Defines.BASE_SCALE,
//            defaultWidth,
//            defaultHeigth
//        );

        if (cc.Guide.isFollowToLogin)
        {
            cc.Guide.isFollowToLogin = false;
            //
//            this.m_BackGround.addChild(this.m_LabelWaitForNext, 100001);
//            this.m_LabelWaitForNext.setPosition(
//                cc.p(this.m_BackGround.getContentSize().width/2,
//                    this.m_BackGround.getContentSize().height - 500 * Defines.BASE_SCALE
//                )
//            );
        }

        //
		if (secButtonSize){
			cc.GUIGuideNormal.getInstance().showCustomCuteMonsterBase_FollowLogin("FollowToLogin",
				Resource.ChineseTxt[111],
				this.getWindow().getParent(),
				[this.getButtonLoginRectForGuide() ,this.getButtonNextRectForGuide()]
			);
		}
		else{
			cc.GUIGuideNormal.getInstance().showCustomCuteMonsterBase_FollowLogin("FollowToLogin",
				Resource.ChineseTxt[111],
				this.getWindow().getParent(),
				[this.getButtonLoginRectForGuide()]
			);
		}


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _closeLoginGuide: function()
    {
        if (cc.GUIGuideNormal.getInstance().isWindowOpen())
        {
            this.removeWaitForNext();
            cc.GUIGuideNormal.getInstance().closeWindow();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _login: function(sender)
    {
        //
        //cc.DataMng.getRole().markEverLoginHomeServer();

        ///
        this._closeLoginGuide();
        //
        ////cc.log("_login");
        cc.AudioMng.getInstance().playButtonSound(true);

        var curJoyFlag = sender.getTag();
        cc.log("将要登录的用户系统 = " + curJoyFlag);

        _Login(curJoyFlag);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentLogin: function()
    {
        this.reloadFriendsTableView();

//        //邀请好友
//        var spriteNormal = cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_BtnInviteUp.png");
//        var spriteSelected = cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_BtnInviteDown.png");
//        this.buttonInviteFriends = cc.MenuItemSprite.create(spriteNormal, spriteSelected, this._inviteFriends, this);
//
//        //
//        var menu = cc.Menu.create(this.buttonInviteFriends);
//        this.m_BackGround.addChild(menu, 100000);
//        menu.setPosition(cc.p(0, 0));
//        this.buttonInviteFriends.setPosition(cc.p(this.m_BackGround.getContentSize().width/2, 85 * Defines.BASE_SCALE));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _inviteFriends: function()
    {
        if (_CanInviteFriend())
        {
            if (cc.GUIInviteFriends.getInstance().isWindowOpen())
            {
                cc.GUIInviteFriends.getInstance().closeWindow();
            }
            else
            {
                FriendsMng.getInstance().applyFriendsInContactList();
            }

            //cc.GUIInviteFriends.getInstance().applyOpenWindow(this.getWindow().getParent());
        }
        else if (_IsFacebook())
        {
            facebookInvite("come to play,baby!This is a very interesting game!");
        }
        else if (SHARE_ENABLED)
        {
            //邀请好友不给奖励
            ShareMng.getInstance().setCanBonus(false);
            ShareMng.getInstance().shareWithInviteFriends();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        this.m_BackGround = cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_Panel0.png");
        this.getWindow().addChild(this.m_BackGround);

        //
        this.m_BackGround.setPosition(
            cc.p(_ScreenRight().x - this.m_BackGround.getContentSize().width/2,
                _ScreenRight().y
            )
        );

        //
        var isLogin = cc.NodeSelf.getInstance().isLogin();
        var top = cc.Sprite.createWithSpriteFrameName(
            (!isLogin ? "GUIFriendsScoresTop_Txt0.png" : "GUIFriendsScoresTop_Txt2.png")
        );

        //
        this.m_BackGround.addChild(top, 10000);
        top.setPosition(
            cc.p(this.m_BackGround.getContentSize().width/2,
                this.m_BackGround.getContentSize().height - top.getContentSize().height/2 * 1.5)
        );

        this.buttonTotal =cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("GUI_Score_Total_off.png"),
            cc.Sprite.createWithSpriteFrameName("GUI_Score_Total_off.png"),
            this._btnTabCallback, this);
        this.buttonTotal.setPosition(cc.p(this.m_BackGround.getContentSize().width * 0.27, this.m_BackGround.getContentSize().height - top.getContentSize().height - 44 * Defines.BASE_SCALE));
        this.buttonTotal.setTag(0);
//        this.m_TabButton.push(this.buttonTotal);

        this.tabSelectTotal = cc.Sprite.createWithSpriteFrameName("GUI_Score_Total_on.png");
        this.m_BackGround.addChild(this.tabSelectTotal);
        this.tabSelectTotal.setPosition(cc.p(this.m_BackGround.getContentSize().width * 0.27, this.m_BackGround.getContentSize().height - top.getContentSize().height - 44 * Defines.BASE_SCALE ));
//        this.m_TabSelect.push(tabSelectTotal);

        var tabLineTotal = cc.Sprite.createWithSpriteFrameName("GUI_Line_Total.png");
        this.tabSelectTotal.addChild(tabLineTotal);
        tabLineTotal.setAnchorPoint(cc.p(0, 1));
        tabLineTotal.setPosition(cc.p(0, 2 * Defines.BASE_SCALE));
//        tabLineTotal.setScaleX(winSize.width * 2 / tabLineItem.getContentSize().width);

        this.tabSelectTotal.setVisible(false);
        //
        this.buttonSelf =cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("GUI_Score_Self_off.png"),
            cc.Sprite.createWithSpriteFrameName("GUI_Score_Self_off.png"),
            this._btnTabCallback, this);
        this.buttonSelf.setPosition(cc.p(this.m_BackGround.getContentSize().width * 0.72, this.m_BackGround.getContentSize().height - top.getContentSize().height - 44 * Defines.BASE_SCALE));
        this.buttonSelf.setTag(1);
//        this.m_TabButton.push(buttonSelf);

        this.tabSelectSelf = cc.Sprite.createWithSpriteFrameName("GUI_Score_Self_on.png");
        this.m_BackGround.addChild(this.tabSelectSelf);
        this.tabSelectSelf.setPosition(cc.p(this.m_BackGround.getContentSize().width * 0.72, this.m_BackGround.getContentSize().height - top.getContentSize().height - 44 * Defines.BASE_SCALE));
//        this.m_TabSelect.push(this.tabSelectSelf);

        var tabLineSelf = cc.Sprite.createWithSpriteFrameName("GUI_Line_Self.png");
        this.tabSelectSelf.addChild(tabLineSelf);
        tabLineSelf.setAnchorPoint(cc.p(0.5, 1));
        tabLineSelf.setPosition(cc.p(0, 2 * Defines.BASE_SCALE));

        this.tabSelectSelf.setVisible(false);

        this.m_Menu = cc.Menu.create(this.buttonTotal ,this.buttonSelf);
        this.m_Menu.setPosition(cc.p(0, 0));
        this.m_BackGround.addChild(this.m_Menu);

        //根据是否登陆 选择刷新的内容
        if (this.m_TabIndex != -1)
        {
            this.updateUIContent();
        }
        else
        {
            this.addContentNotLogin();
        }

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    _btnTabCallback: function (sender)
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        if (this.m_TabIndex == -1){
            return this;
        }

        this.m_TabIndex = sender.getTag();
        this.updateUIContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateUIContent: function()
    {
        cc.log("updateUIContent");
        cc.log("this.empty_tabLayer" + this.empty_tabLayer);
        if (this.empty_tabLayer){
            this.empty_tabLayer.setVisible(false);
            this.empty_tabLayer = null;
        }

        this.m_TabSelect.forEach(function(each)
        {
            each.setVisible(false);
        });
//
        if (this.m_TabIndex == 1){
            this.buttonSelf.setVisible(false);
            this.buttonTotal.setVisible(true);
            this.tabSelectTotal.setVisible(false);
            this.tabSelectSelf.setVisible(true);
            this.reloadSelfTableView();
        }
        else if (this.m_TabIndex == 0){
            this.buttonSelf.setVisible(true);
            this.buttonTotal.setVisible(false);
            this.tabSelectTotal.setVisible(true);
            this.tabSelectSelf.setVisible(false);
            this.addContentLogin();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseGameLevelByGUIWindow: function(guiWindow)
    {
        var res = "LEVEL_1";

        if (guiWindow instanceof cc.GUIGameLevelEndWin)
        {
            res = guiWindow.m_LevelData ? guiWindow.m_LevelData.NAME: res;
        }
        else if (guiWindow instanceof cc.GUIGameLevelEndFail)
        {
            res = guiWindow.m_LevelData ? guiWindow.m_LevelData.NAME : res;
        }
        else if (guiWindow instanceof cc.GUIGameLevelStart)
        {
            res = guiWindow.m_LevelData ? guiWindow.m_LevelData.NAME: res;
        }

        return res;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, guiWindow)
    {
        //
        this._super(render);

        //
        cc.ResourceMng.getInstance().addToCache(
            Resource._GUIFirendsScoresTop_plist,
            Resource._GUIFirendsScoresTop_png);

        //this.m_GameLevelIndx = this.parseGameLevelByGUIWindow(guiWindow);
        this.m_GameLevelName = this.parseGameLevelByGUIWindow(guiWindow);

        //
        this.m_MyCellsBuilder = new MyFriendsTop_CellBuilder(
            cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_Panel1.png").getContentSize()
        );

        var tarGameLevelData = cc.DataMng.getInstance().getLevelDataWithName(this.m_GameLevelName);
        cc.log("tarGameLevelData.HISTORY_MAX_SCORE.get() = " + tarGameLevelData.HISTORY_MAX_SCORE.get());

        if (tarGameLevelData.HISTORY_MAX_SCORE.get() > 0){
            this.m_TabIndex = 0;
        }
        else {
            this.m_TabIndex = -1;
        }
        //

        this.updateGUI();

        //
        if (guiWindow instanceof cc.GUIGameLevelStart)
        {
            FriendsMng.getInstance().applyFriendsGameLevelScoresFromHome(this.getCurGameLevel());
//            this.markLoading();
        }
//        else if (guiWindow instanceof cc.GUIGameLevelEndWin){
//            this.m_TabIndex = 0;
//        }
        else {
//            this.cleanLoading();
        }



		if (guiWindow instanceof cc.GUIGameLevelEndWin){
			if (guiWindow.isGuide()){
				if (this.m_FriendTableView)
				{
					this.m_FriendTableView.setTouchEnabled(false);
				}
				if (this.buttonInviteFriends)
				{
					this.buttonInviteFriends.setEnabled(false);
				}
			}
		}
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateGUI: function()
    {
        cc.log("GUIMyFriendsTop updateGUI");

        if (this.isWindowOpen())
        {
            this.getWindow().removeAllChildren(true);
            this.addContent();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();
        cc.AudioMng.getInstance().playCloseWindow();
        this.cleanLoading();

        this.getWindow().removeAllChildren(true);

        //
        this.m_FriendTableView = null;
        this.m_FriendsInfosByScoreTop = [];
        this.m_MapFriendRoleIdToPos = {};
        this.m_SelfTableView = null;
        this.m_SelfInfosByScoreTop = [];
        this.empty_tabLayer = null;
        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUIFirendsScoresTop_plist,
            Resource._GUIFirendsScoresTop_png);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    reloadSelfDatas: function()
    {
        var self = this;

        var friendsInfos = FriendsMng.getInstance().getFriendsInfos().concat();

        friendsInfos.unshift(FriendInfo.createSelf(this.getCurGameLevel()));

        var m_FriendsInfos = [];

        friendsInfos.forEach(
            function(a_friend, index)
            {
                if (a_friend.getGameLevelScore(self.getCurGameLevel()) > 0){
                    m_FriendsInfos.push(a_friend);
                }
            }
        );

        m_FriendsInfos.sort(
            function(left, right)
            {
                var leftScore = left.getGameLevelScore(self.getCurGameLevel());
                var rightScore = right.getGameLevelScore(self.getCurGameLevel());
                return leftScore > rightScore ? -1 : 1;
            }
        );


        this.m_SelfInfosByScoreTop = [];
        var selfInfo = FriendInfo.createSelf(this.getCurGameLevel());
        var selfIdx = -1;
        m_FriendsInfos.forEach(
            function(a_friend, index)
            {
                if (a_friend.getID() == selfInfo.getID()){
                    selfIdx = index;

                }
//                self.m_MapFriendRoleIdToPos[a_friend.getRoleId()] = index;
            }
        );


        if (selfIdx >= 2){

            if (selfIdx + 3 <= m_FriendsInfos.length){
                for (var j = selfIdx - 2 ; j  <= selfIdx + 2; j++){
                    this.m_SelfInfosByScoreTop.push(m_FriendsInfos[j]);
                }
            }
            else {
                var elseIndex = 5 - (m_FriendsInfos.length - selfIdx);

                if (elseIndex > selfIdx) {
                    elseIndex = selfIdx;
                }
                for (var j = selfIdx - elseIndex ; j < m_FriendsInfos.length; j++){
                    this.m_SelfInfosByScoreTop.push(m_FriendsInfos[j]);
                }

            }

        }
        else {
            for (var j = selfIdx - 1 ; j >= 0; j--){
                this.m_SelfInfosByScoreTop.push(m_FriendsInfos[j]);
            }

            var elseIndex = 5 - this.m_SelfInfosByScoreTop.length;

            cc.log("elseIndex = " + elseIndex);

            for (var i = selfIdx ; i< m_FriendsInfos.length && i - selfIdx < elseIndex; i++){
                this.m_SelfInfosByScoreTop.push(m_FriendsInfos[i]);
            }
        }
        //
        this.m_MapSelfRoleIdToPos = {};
        //
        //按着分数大小排列
        //
        this.m_SelfInfosByScoreTop.forEach(
            function(a_friend, index)
            {
                self.m_MapSelfRoleIdToPos[a_friend.getID()] = index;
            }
        );

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    reloadSelfTableView: function()
    {
        if (this.m_FriendsInfosByScoreTop != null && this.m_FriendsInfosByScoreTop.length > 0){
            this.m_FriendTableView.setVisible(false);
        }

//        if (this.m_FriendTableView != null){
//            this.m_FriendTableView.setVisible(false);
//        }

        //
        this.reloadSelfDatas();

        //
        this.m_SelfTableView = cc.TableView.create(
            this,
            cc.size(
                this.m_MyCellsBuilder.getCellSize().width,
                this.m_MyCellsBuilder.getCellSize().height * 5
            )
        );

        this.m_BackGround.addChild(this.m_SelfTableView);

        //
        this.m_SelfTableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.m_SelfTableView.setAnchorPoint(cc.p(0, 0));
        this.m_SelfTableView.setPosition(cc.p(13 * Defines.BASE_SCALE, 75 * Defines.BASE_SCALE));
        this.m_SelfTableView.setDelegate(this);
        this.m_SelfTableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);

        //
        this.m_SelfTableView.reloadData();

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    reloadFriendsDatas: function()
    {
        var self = this;

        var friendsInfosByScoreTop = FriendsMng.getInstance().getFriendsInfos().concat();

        //
        this.m_MapFriendRoleIdToPos = {};
        friendsInfosByScoreTop.unshift(FriendInfo.createSelf(this.getCurGameLevel()));

        this.m_FriendsInfosByScoreTop = [];

        friendsInfosByScoreTop.forEach(
            function(a_friend, index)
            {
                if  (a_friend.getGameLevelScore(self.getCurGameLevel()) > 0){
                    self.m_FriendsInfosByScoreTop.push(a_friend);
                }
            }
        );

        //
        //按着分数大小排列
        this.m_FriendsInfosByScoreTop.sort(
            function(left, right)
            {
                var leftScore = left.getGameLevelScore(self.getCurGameLevel());
                var rightScore = right.getGameLevelScore(self.getCurGameLevel());
                return leftScore > rightScore ? -1 : 1;
            }
        );

        //
        this.m_FriendsInfosByScoreTop.forEach(
            function(a_friend, index)
            {
                cc.log("a_friend = " + a_friend.getID());
                self.m_MapFriendRoleIdToPos[a_friend.getID()] = index;
            }
        );

        //
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    reloadFriendsTableView: function()
    {
        cc.log("this.m_SelfInfosByScoreTop.length = " + this.m_SelfInfosByScoreTop.length);
        if (this.m_SelfTableView){
            this.m_SelfTableView.setVisible(false);
            this.m_SelfTableView = null;
        }

        //
        this.reloadFriendsDatas();

        //
        this.m_FriendTableView = cc.TableView.create(
            this,
            cc.size(
                this.m_MyCellsBuilder.getCellSize().width,
                this.m_MyCellsBuilder.getCellSize().height * 5
            )
        );

        this.m_BackGround.addChild(this.m_FriendTableView);

        //
        this.m_FriendTableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.m_FriendTableView.setAnchorPoint(cc.p(0, 0));
        this.m_FriendTableView.setPosition(cc.p(13 * Defines.BASE_SCALE, 75 * Defines.BASE_SCALE));
        this.m_FriendTableView.setDelegate(this);
        this.m_FriendTableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);

        //
        this.m_FriendTableView.reloadData();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyFriendsUpdate: function(friends)
    {
        if (!this.isWindowOpen())
        {
            return this;
        }
        var self = this;

        if (self.m_TabIndex == 1){
//            self.reloadSelfTableView();
            if (!this.m_SelfTableView){
                return this;
            }
            friends.forEach(
                function(a_friend, index)
                {
                    cc.log("a_friend.id = " + a_friend.getID());

                    var topIndex = self.m_MapSelfRoleIdToPos[a_friend.getID()];
                    var targetFriend = self.m_SelfInfosByScoreTop[topIndex];
                    //
                    //

                    targetFriend.setGameLevelScore(self.m_GameLevelName,a_friend.getGameLevelScore(self.m_GameLevelName));

                    cc.log("更新 = " + a_friend.id);
                    self.m_SelfTableView.updateCellAtIndex(topIndex);
                }
            );

        }
        else if (self.m_TabIndex == 0){
//            self.reloadFriendsTableView();
            if (!this.m_FriendTableView){
                return this;
            }
            friends.forEach(
                function(a_friend)
                {
                    cc.log("a_friend.id = " + a_friend.getID());
                  var topIndex = self.m_MapFriendRoleIdToPos[a_friend.getID()];
                   cc.log("topIndex = " + topIndex);
                  var targetFriend = self.m_FriendsInfosByScoreTop[topIndex];
                    //
                    //

                    targetFriend.setGameLevelScore(self.m_GameLevelName,a_friend.getGameLevelScore(self.m_GameLevelName));
                    cc.log("更新 = " + a_friend);
                 self.m_FriendTableView.updateCellAtIndex(topIndex);
                }
            );
        }

        //



        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getButtonLoginRectForGuide : function()
    {
        return this.m_LoginRect;
    },

    //------------------------------------------------------------------------------------------------------------------
    getButtonNextRectForGuide : function()
    {
        return this.m_LoginRect_2;
    },

    //------------------------------------------------------------------------------------------------------------------
    removeWaitForNext: function()
    {
		return this;
        if (this.m_LabelWaitForNext)
        {
            this.m_LabelWaitForNext.removeFromParent(true);
            this.m_LabelWaitForNext = null;
        }

        return this;
    }
    //------------------------------------------------------------------------------------------------------------------

});

cc.GUIMyFriendsTop._instance = null;
cc.GUIMyFriendsTop.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIMyFriendsTop();
        this._instance.init();

        var self = this;

        //
        FriendsMng.getInstance().registerEvent(
            _FRIENDS_MNG_EVENT.GET_FRIENDS_FROM_HOME_SUCC,
            function()
            {
                if (self._instance.isWindowOpen())
                {
                    FriendsMng.getInstance().applyFriendsGameLevelScoresFromHome(self._instance.getCurGameLevel());
                    self._instance.markLoading();
                    self._instance.updateGUI();
                }
            },
            null);

        //
        FriendsMng.getInstance().registerEvent(
            _FRIENDS_MNG_EVENT.GET_FRIENDS_SCORE_SUCC,
            function(manager,friends)
            {
                if (self._instance.isWindowOpen())
                {
//                    self._instance.cleanLoading();
                    self._instance.updateGUI();
                }
            },
            null);

        //
        FriendsMng.getInstance().registerEvent(
            _FRIENDS_MNG_EVENT.LOAD_PHOTO,
            function(manager, friends)
            {
                self._instance.notifyFriendsUpdate(friends);
            },
            null);

        //
        FriendsMng.getInstance().registerEvent(
            _FRIENDS_MNG_EVENT.GIVE_FRIEND_HEART_SUCC,
            function(manager, friends)
            {
                self._instance.notifyFriendsUpdate(friends);
            },
            null);
    }

    return this._instance;
};

