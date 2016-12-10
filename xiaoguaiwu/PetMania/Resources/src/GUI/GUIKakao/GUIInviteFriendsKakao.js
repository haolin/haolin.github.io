/**
 * Created by hong.zhang on 2014/7/1.
 */
//======================================================================================================================
var GUIInviteKakao_CellBuilder = cc.Class.extend({

    //
    CELL_CONTENT_TAG:
    {
        INVITE_PHOTO: 888,     //头像
        INVITE_NAME: 999,      //名字
        INVITE_BUTTON: 1000    //邀请按钮
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(cellSize)
    {
        cc.log("GUIInviteKakao ctor");
        this.m_CellSize = cellSize || cc.size(10 * Defines.BASE_SCALE, 10 * Defines.BASE_SCALE);
    },

    //------------------------------------------------------------------------------------------------------------------
    _static: function()
    {
        cc.log("GUIInviteKakao _static");
        return GUIInviteKakao_CellBuilder.prototype;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        cc.log("GUIInviteKakao toString");
        return "GUIInviteKakao_CellBuilder";
    },

    //------------------------------------------------------------------------------------------------------------------
    getCellSize: function()
    {
        cc.log("GUIInviteKakao getCellSize");
        return this.m_CellSize;
    },

    //------------------------------------------------------------------------------------------------------------------
    buildCell: function(cell, idx, buttonCallBack, target)
    {
        cc.log("GUIInviteKakao buildCell");
        cell.removeAllChildren(true);

        var cellWidth = this.m_CellSize.width;
        var cellHeight = this.m_CellSize.height;


        //头像
        var spritePhoto = cc.Sprite.createWithSpriteFrameName("general_photo_frame.png");
        cell.addChild(spritePhoto,0,this._static().CELL_CONTENT_TAG.INVITE_PHOTO);
        spritePhoto.setAnchorPoint(cc.p(0,0.5));
        spritePhoto.setPosition(cc.p(10*Defines.BASE_SCALE,cellHeight/2));

        //名字
        var nameLab = cc.LabelTTF.create("", Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        cell.addChild(nameLab, 0, this._static().CELL_CONTENT_TAG.INVITE_NAME);
        nameLab.setAnchorPoint(cc.p(0, 0));
        nameLab.setPosition(cc.p(90 * Defines.BASE_SCALE, cellHeight/2 + 7 * Defines.BASE_SCALE));

        //不知道是什么
        var labelTxt = cc.LabelTTF.create(Resource.KoreanTxt["invite_friends"], Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        cell.addChild(labelTxt);
        labelTxt.setAnchorPoint(cc.p(0, 1));
        labelTxt.setPosition(cc.p(90 * Defines.BASE_SCALE, cellHeight/2 - 7 * Defines.BASE_SCALE));

        //邀请按钮
        var button = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_invite_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_invite_sel.png"),
            buttonCallBack,
            target);

        button.setTag(idx);

        //
        var menu = cc.Menu.create(button);
        cell.addChild(menu, 1000, this._static().CELL_CONTENT_TAG.INVITE_BUTTON);
        menu.setPosition(cc.p(0, 0));
        button.setAnchorPoint(cc.p(0, 0.5));
        button.setPosition(cc.p(310 * Defines.BASE_SCALE, cellHeight/2));
        button.setScale(0.8);

        //分割线
        var spriteFenge = cc.Sprite.create(_GUIPath + "GUINewGeneral/fenge_line.png");
        cell.addChild(spriteFenge);
        spriteFenge.setAnchorPoint(cc.p(0.5,0.5));
        spriteFenge.setPosition(cc.p(cellWidth/2,cellHeight));
        spriteFenge.setScaleX(0.95);

        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    decorateCell: function(cell, idx, friendInfo)
    {
        cc.log("invitefriendsKakao decorateCell");
        cc.log("func decorateCell, idx:" + idx);
        cc.log("firendInfo.getName():" + friendInfo.getName() == null);
//        cc.log(null == cell);
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.INVITE_NAME).setString(friendInfo.getName());
        //头像

        var photoUrl = friendInfo.getPhotoUrl();

        if (photoUrl != "")
        {
            cc.log("没有照片" + photoUrl);
            var friendPhotoImg =  cc.Sprite.create(photoUrl);
//            return this;
        }

        if (friendPhotoImg)
        {
            cc.log("照片地址正确");
//            return this;
            var friendPhoto = cc.Sprite.create(photoUrl);
        }
        else
        {
            cc.log("照片地址不对?? = " + photoUrl);
            var friendPhoto = cc.Sprite.createWithSpriteFrameName("general_default_photo_1.png");
        }

        var photoFrame = cell.getChildByTag(this._static().CELL_CONTENT_TAG.INVITE_PHOTO);
        photoFrame.removeAllChildren();

        friendPhoto.setAnchorPoint(cc.p(0.5,0.5));
        friendPhoto.setPosition(cc.p(photoFrame.getContentSize().width/2,photoFrame.getContentSize().height/2));
        friendPhoto.setScale(photoFrame.getContentSize().width > friendPhoto.getContentSize().width?
            1.0: photoFrame.getContentSize().width/friendPhoto.getContentSize().width);
        cc.log("friendPhoto.getScale: " + friendPhoto.getScale());
        photoFrame.addChild(friendPhoto);

        var button = cell.getChildByTag(this._static().CELL_CONTENT_TAG.INVITE_BUTTON);
        button.setVisible(!cc.GUIInviteFriendsKakaoData.getInstance().isInvited(friendInfo.getID()));


        return cell;
    }

});




//======================================================================================================================
cc.GUIInviteFriendsKakao = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        cc.log("GUIInviteKakao ctor");
        this._super();

        //
        this.m_BackGround = null;
        this.m_InviteTableView = null;
        this.m_MyCellsBuilder = null;
        this.m_labelCurrentInviteNum = null;
        this.m_numlabelLeftFriends = null;
        this.m_spriteProbarBack = null;
        this.m_spriteProbar = null;
        this.m_spriteAwardBack = null;
//        this.m_sizeAwardBack = null;
        this.m_arrBox = [
            { imageEnabled : "box_1.png" , spriteEnabled: null,
                imageDisabled: "box_1_disabled.png", spriteDisabled: null,
                position:1/4, num: 10},
            { imageEnabled : "box_1.png" , spriteEnabled: null,
                imageDisabled: "box_1_disabled.png", spriteDisabled: null,
                position:1/2, num: 20},
            { imageEnabled : "box_3.png" , spriteEnabled: null,
                imageDisabled: "box_3_disabled.png", spriteDisabled: null,
                position:3/4, num: 30},
            { imageEnabled : "box_3.png" , spriteEnabled: null,
                imageDisabled: "box_3_disabled.png", spriteDisabled: null,
                position:0.93, num: 40}
//            { imageEnabled : "box_5.png" , spriteEnabled: null,
//                imageDisabled: "box_5_disabled.png", spriteDisabled: null,
//                position:0.93, num: 40}
        ];

        this.m_arrItem = [
            {icon:null, num: null},
            {icon:null, num: null},
            {icon:null, num: null},
            {icon:null, num: null}
        ];

        this.m_buttonAward = null;
        this.m_spriteAwardDisabled = null;

        this.m_bGetServerData = null;
        this.m_bGetKakaoData = null;

        this.m_pointOffset = null;
        //数据
        this.m_data = cc.GUIInviteFriendsKakaoData.getInstance();

    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return cc.GUIInviteFriendsKakao.description();
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function ()
    {
        this._super();
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
    tableCellTouched:function (table, cell)
    {
        cc.log("GUIInviteKakao tableCellTouched");
        cc.log("cell touched at index: " + cell.getIdx());
    },

    //------------------------------------------------------------------------------------------------------------------
    cellSizeForTable:function (/*table*/)
    {
        cc.log("GUIInviteKakao cellSizeForTable");
        return this.m_MyCellsBuilder.getCellSize();
    },

    //------------------------------------------------------------------------------------------------------------------
    numberOfCellsInTableView:function (/*table*/)
    {
        cc.log("GUIInviteKakao numberOfCellsInTableView");
//        return FriendsMng.getInstance().getFriendsInContactList().length;
        if(this.m_data.getFriendsInfo())
        {
            return this.m_data.getFriendsInfo().length;

        }

        return 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    tableCellAtIndex:function (table, idx)
    {
        //
        cc.log("GUIInviteKakao tableCellAtIndex");
        var cell = table.dequeueCell();
        if (!cell)
        {
            //没有就制造新的 
            cell = new cc.TableViewCell();
        }

        this.m_MyCellsBuilder.buildCell(cell, idx, this._btnInviteFriend, this);

        //
//        var data = FriendsMng.getInstance().getFriendsInContactList()[idx];
        if(!this.m_data.getFriendsInfo())
        {
            cc.log("no friendInfo");
            return;
        }
        var data = this.m_data.getFriendsInfo()[idx];
        if (data)
        {
            this.m_MyCellsBuilder.decorateCell(cell, idx, data);
        }

        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnInviteFriend: function(sender)
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        cc.log("GUIInviteKakao _btnInviteFriend");
        if(this.m_data.getDailyLefts() <= 0)
        {
            cc.GUIMsgView.getInstance().openWindow(cc.Director.getInstance().getRunningScene(), Resource.KoreanTxt["invite_max"]);
            return;
            cc.log("今日邀请次数已用尽");
        }

        cc.log("sender.getTag() = " + sender.getParent().getParent().getIdx());

        if(!this.m_data.getFriendsInfo()[sender.getParent().getParent().getIdx()])
        {
            cc.log("没有这个好友的信息");
            return this;
        }

        if(!this.m_data.getFriendsInfo()[sender.getParent().getParent().getIdx()].getSupportedDevice())
        {
            cc.GUIMsgView.getInstance().openWindow(cc.Director.getInstance().getRunningScene(), Resource.KoreanTxt["supported_device"]);
            cc.log("好友设备不支持游戏");
            return this;
        }

        if(this.m_data.getFriendsInfo()[sender.getParent().getParent().getIdx()].getMessageBlocked())
        {
            cc.GUIMsgView.getInstance().openWindow(cc.Director.getInstance().getRunningScene(), Resource.KoreanTxt["message_block_other"]);
            cc.log("好友不想接受邀请消息");
            return this;
        }

        var nUId = this.m_data.getFriendsInfo()[sender.getParent().getParent().getIdx()].getID();

        _inviteFriendToGame = function(bResult, bFlag)
        {
            cc.log("GUIInviteKakao _inviteFriendToGame");
            if(bResult)
            {
                cc.log("_inviteFriendToGame success");
                var data = cc.GUIInviteFriendsKakaoData.getInstance();
                data.getInvitedUid().push(nUId);
                data.setDailyLefts(data.getDailyLefts() - 1);
                data.setDailyInvites(data.getDailyInvites() + 1);
                data.setInviteNum(data.getInviteNum() + 1);

                if(cc.GUIInviteFriendsKakao.getInstance().isWindowOpen())
                {
                    cc.GUIInviteFriendsKakao.getInstance()._refreshUI(true);
                }
            }
            else
            {
                sender.setVisible(true);
                cc.log("_inviteFriendToGame fail");
            }
        };

        _kakaoMessageSuccCallback = function( status )
        {
            cc.log("_kakaoMessageSuccCallback");
            _SystemLoadingControl(false);
            if(!isHtml5)
            {
                cc.NodeSelf.getInstance().asyncInviteFriendToGame(nUId,_inviteFriendToGame);
//                KakaoJoyInterface.getInstance().sendMessageForInviteFriends(nUId);
            }
        };

        _kakaoMessageFailCallback = function( status )
        {
            cc.log("_kakaoMessageFailCallback");
            _SystemLoadingControl(false);
            if(-16 == status)
            {
                cc.GUIMsgView.getInstance().openWindow(cc.Director.getInstance().getRunningScene(), Resource.KoreanTxt["message_blocked"]);
                cc.log("好友不想接受游戏消息");
                return this;
            }
            else if(-17 == status)
            {
                cc.GUIMsgView.getInstance().openWindow(cc.Director.getInstance().getRunningScene(), Resource.KoreanTxt["message_block_other"]);
                cc.log("好友不想接受邀请消息");
                return this;
            }
            else if(-31 == status)
            {
                cc.GUIMsgView.getInstance().openWindow(cc.Director.getInstance().getRunningScene(), Resource.KoreanTxt["invite_in_cd"]);
                cc.log("好友在邀请CD时间内");
                return this;
            }
            else if(-32 == status)
            {
                cc.GUIMsgView.getInstance().openWindow(cc.Director.getInstance().getRunningScene(), Resource.KoreanTxt["invite_32"]);
                cc.log("邀请好友返回-32错误");
                return this;
            }
        };



        //TODO 移除

		sender.setVisible(false);
        KakaoJoyInterface.getInstance().sendMessageForInviteFriends(nUId,_kakaoMessageSuccCallback,_kakaoMessageFailCallback);
        _SystemLoadingControl(true);

//        this._refreshUI();
        //TODO 推送


        return this;
    },



    //------------------------------------------------------------------------------------------------------------------
    addTableView: function()
    {
        cc.log("GUIInviteKakao addTableView");

//        if(this.m_InviteTableView)
//        {
//            return;
//        }
        this.m_InviteTableView = cc.TableView.create(this, cc.size(410 * Defines.BASE_SCALE, 310 * Defines.BASE_SCALE));
        this.m_InviteTableView.setTouchPriority(cc.MENU_HANDLER_PRIORITY);
        this.m_BackGround.addChild(this.m_InviteTableView, 1000);
//        this.m_InviteTableView.setPosition(cc.p(40 * Defines.BASE_SCALE, 107 * Defines.BASE_SCALE));

        //
        this.m_InviteTableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.m_InviteTableView.setPosition(cc.p(25 * Defines.BASE_SCALE, 85 * Defines.BASE_SCALE));
        this.m_InviteTableView.setDelegate(this);
        this.m_InviteTableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.m_InviteTableView.reloadData();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        cc.log("GUIInviteKakao addContent");
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 100));
        this.getWindow().addChild(blockLayer, -1);

        this.m_BackGround = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back1.png");
        this.getWindow().addChild(this.m_BackGround);
        this.m_BackGround.setAnchorPoint(cc.p(1,0.5));
        this.m_BackGround.setPosition(cc.p(_ScreenWidth()/2,_ScreenHeight()/2));

        //好友的背景板
        var backCenter = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back12.png");
        this.m_BackGround.addChild(backCenter);
        backCenter.setPosition(
            cc.p(this.m_BackGround.getContentSize().width/2,
                    this.m_BackGround.getContentSize().height/2)
        );

        //两行不知道是什么意思的文字
        var spriteUpTxt = cc.Sprite.createWithSpriteFrameName("invite_friends.png");
        this.m_BackGround.addChild(spriteUpTxt);
        spriteUpTxt.setPosition(cc.p(this.m_BackGround.getContentSize().width/2,
                this.m_BackGround.getContentSize().height - 33*Defines.BASE_SCALE));

        this.m_labelCurrentInviteNum = cc.LabelTTF.create(Resource.KoreanTxt["current_invite_I_guess"],Defines.DefaultFont,
                                                                26*Defines.BASE_SCALE);
        this.m_BackGround.addChild(this.m_labelCurrentInviteNum);
        this.m_labelCurrentInviteNum.setPosition(cc.p(this.m_BackGround.getContentSize().width/2,
                                                    33*Defines.BASE_SCALE));

        //
        GUI._AddCloseButton(blockLayer, this.closeWindow, this);

        //
//        this.addTableView();

        this._addContentAward();

        //向kakao发送message的提示
        var laberAlert = cc.LabelTTF.create(Resource.KoreanTxt["invite_message_alert"],Defines.DefaultFont,35*Defines.BASE_SCALE);
        laberAlert.setAnchorPoint(cc.p(0.5,0));
        laberAlert.setPosition(cc.p(_ScreenWidth()/2,20*Defines.BASE_SCALE));
        blockLayer.addChild(laberAlert);

        return this;
    },

    _addContentAward: function()
    {
        cc.log("GUIInviteKakao _addContentAward");
        this.m_spriteAwardBack = cc.Scale9Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png");
        this.getWindow().addChild(this.m_spriteAwardBack);
        this.m_spriteAwardBack.setAnchorPoint(cc.p(0,0.5));
        this.m_spriteAwardBack.setPosition(cc.p(_ScreenWidth()/2,_ScreenHeight()/2));
        this.m_spriteAwardBack.setContentSize(this.m_BackGround.getContentSize());

        var nBackWidth = this.m_spriteAwardBack.getContentSize().width;
        var nBackHeight = this.m_spriteAwardBack.getContentSize().height;

        //分割线
        var spriteLine = cc.Sprite.create(_GUIPath + "GUINewGeneral/fenge_line.png");
        this.m_spriteAwardBack.addChild(spriteLine);
        spriteLine.setPosition(cc.p(nBackWidth/2 ,nBackHeight - 120*Defines.BASE_SCALE));
        spriteLine.setScaleX(1.1*Defines.BASE_SCALE);

        //进度条
        this.m_spriteProbarBack = cc.Sprite.createWithSpriteFrameName("probar_down.png");
        this.m_spriteAwardBack.addChild(this.m_spriteProbarBack);
        this.m_spriteProbarBack.setAnchorPoint(cc.p(0,0.5));
        this.m_spriteProbarBack.setPosition(cc.p(8*Defines.BASE_SCALE,nBackHeight - 60*Defines.BASE_SCALE));
        this.m_spriteProbarBack.setScaleX(1.38*Defines.BASE_SCALE);

        this.m_spriteProbar = cc.Sprite.createWithSpriteFrameName("probar_up.png");
        this.m_spriteAwardBack.addChild(this.m_spriteProbar);
        this.m_spriteProbar.setAnchorPoint(cc.p(0,0.5));
        this.m_spriteProbar.setPosition(cc.p(8*Defines.BASE_SCALE,nBackHeight - 60*Defines.BASE_SCALE));
        this.m_spriteProbar.setScale(0.01);

        //宝箱
        for(var i = 0; i < this.m_arrBox.length; i++)
        {
            var tElement = this.m_arrBox[i];
            tElement.spriteEnabled = cc.Sprite.createWithSpriteFrameName(tElement.imageEnabled);
            this.m_spriteAwardBack.addChild(tElement.spriteEnabled);
            tElement.spriteEnabled.setPosition(cc.p(nBackWidth*tElement.position*Defines.BASE_SCALE,nBackHeight - 60*Defines.BASE_SCALE));

            tElement.spriteDisabled = cc.Sprite.createWithSpriteFrameName(tElement.imageDisabled);
            this.m_spriteAwardBack.addChild(tElement.spriteDisabled);
            tElement.spriteDisabled.setPosition(cc.p(nBackWidth*tElement.position*Defines.BASE_SCALE,nBackHeight - 60*Defines.BASE_SCALE));

            var labelTxt = cc.LabelTTF.create(tElement.num + Resource.KoreanTxt["invite_award"],Defines.DefaultFont,14*Defines.BASE_SCALE);
            this.m_spriteAwardBack.addChild(labelTxt);
            labelTxt.setPosition(cc.p(nBackWidth*tElement.position*Defines.BASE_SCALE,nBackHeight - 95*Defines.BASE_SCALE));
            if(i == this.m_arrBox.length - 1)
            {
                labelTxt.setColor(cc.c3b(248,248,31));
            }
        }

        //谁知道是什么了，领奖时间？
        var spriteAwardTime = cc.Sprite.createWithSpriteFrameName("lingjiang_time.png");
        this.m_spriteAwardBack.addChild(spriteAwardTime);
        spriteAwardTime.setPosition(cc.p(nBackWidth/2 ,nBackHeight/2 + 80*Defines.BASE_SCALE));

        //剩余人数
        var spriteLeftFriends = cc.Sprite.createWithSpriteFrameName("left_people.png");
        this.m_spriteAwardBack.addChild(spriteLeftFriends);
        spriteLeftFriends.setAnchorPoint(cc.p(0,0.5));
        spriteLeftFriends.setPosition(cc.p(nBackWidth/2 - 30*Defines.BASE_SCALE,nBackHeight/2 + 30*Defines.BASE_SCALE));

        this.m_numlabelLeftFriends = GUI.createNumberLabel("00",_GUIPath + "Num/num_16_30x40.png",30,40,"0");
        this.m_spriteAwardBack.addChild(this.m_numlabelLeftFriends);
        this.m_numlabelLeftFriends.setAnchorPoint(cc.p(1,0.5));
        this.m_numlabelLeftFriends.setPosition(cc.p(nBackWidth/2 - 30*Defines.BASE_SCALE,nBackHeight/2 + 30*Defines.BASE_SCALE));

        //奖励道具
        for(var i = this.m_arrItem.length - 1; i >=0; i--)
        {
            var tElement = this.m_arrItem[i];
            var tInfo = this.m_data.getAwardInfoByIndex(i);

            tElement.icon = cc.Sprite.create();
//            tElement.icon.setPosition(cc.p(130*Defines.BASE_SCALE + (nBackWidth - 260)/4*2,nBackHeight/2 - 40*Defines.BASE_SCALE));
            tElement.icon.setScale(0.6);
            this.m_spriteAwardBack.addChild(tElement.icon);

            tElement.num = GUI.createNumberLabel("00",_GUIPath + "Num/num_16_30x40.png",30,40,"0");
            tElement.num.setAnchorPoint(cc.p(1,0));
            tElement.num.setPosition(cc.p(tElement.icon.getContentSize().width - 5*Defines.BASE_SCALE,5*Defines.BASE_SCALE));
            tElement.icon.addChild(tElement.num);
        }

        //领奖按钮
        this.m_buttonAward = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("button_lingqu_nor.png"),
            cc.Sprite.createWithSpriteFrameName("button_lingqu_sel.png"),
            this._btnAward,this
        );
        this.m_buttonAward.setPosition(cc.p(nBackWidth/2,110*Defines.BASE_SCALE));

        var menuAward = cc.Menu.create(this.m_buttonAward);
        menuAward.setPosition(cc.p(0,0));
        this.m_spriteAwardBack.addChild(menuAward);

        this.m_spriteAwardDisabled = cc.Sprite.createWithSpriteFrameName("button_lingqu_disabled.png");
        this.m_spriteAwardDisabled.setPosition(cc.p(nBackWidth/2,110*Defines.BASE_SCALE));
        this.m_spriteAwardBack.addChild(this.m_spriteAwardDisabled);

        //邀请得薄荷糖的label
        var labelFront = cc.LabelTTF.create(Resource.KoreanTxt["invite_for_heart_0"],Defines.DefaultFont,24*Defines.BASE_SCALE);
        this.m_spriteAwardBack.addChild(labelFront);
        labelFront.setAnchorPoint(cc.p(0,0.5));
        labelFront.setPosition(cc.p(10*Defines.BASE_SCALE,40*Defines.BASE_SCALE));

        var labelBack = cc.LabelTTF.create(Resource.KoreanTxt["invite_for_heart_1"],Defines.DefaultFont,24*Defines.BASE_SCALE);
        this.m_spriteAwardBack.addChild(labelBack);
        labelBack.setAnchorPoint(cc.p(1,0.5));
        labelBack.setPosition(cc.p(nBackWidth - 10*Defines.BASE_SCALE,40*Defines.BASE_SCALE));

        var spriteHeart = cc.Sprite.createWithSpriteFrameName("general_sugar_0.png");
        this.m_spriteAwardBack.addChild(spriteHeart);
        spriteHeart.setPosition(cc.p(nBackWidth/2 + 45*Defines.BASE_SCALE,40*Defines.BASE_SCALE))
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnAward: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        cc.log("GUIInviteKakao _btnAward");
        var nCurrentAward = 0;
        for(var i = 0; i < this.m_arrBox.length; i++) {
            nCurrentAward = i;
            if (!this.m_data.hasAwardWithIndex(i)) {
                break;
            }
        }

//        var arrInfo = this.m_data.getAwardInfoByIndex(nCurrentAward);
//
//        for(var i = 0; i < arrInfo.length; ++i)
//        {
//            var tElement = arrInfo[i];
//            switch (tElement.type)
//            {
//                case cc.InviteFriendsAwardType.RELIVE:
//                {
//                    cc.DataMng.getInstance().addGameContinueCount(tElement.num);
//                    break;
//                }
//                case cc.InviteFriendsAwardType.DIAMOND:
//                {
//                    cc.DataMng.getInstance().addMoney(tElement.num);
//                    break;
//                }
//                case cc.InviteFriendsAwardType.KAKAOGIFT:
//                {
//                    //todo kakao冰激凌
//
//                    break;
//                }
//                default :
//                {
//                    cc.DataMng.getInstance().buyItemByID(tElement.type.ID,tElement.num,0);
//                    break;
//                }
//            }
//        }

        cc.NodeSelf.getInstance().asyncRecvInviteFriendReward(nCurrentAward,function callback(){});
        //设置自己的领奖状态
        var arrAwardStatus = this.m_data.getAwardStatus();
        arrAwardStatus[nCurrentAward] = 1;

        this._refreshUI(true);
    },

    //------------------------------------------------------------------------------------------------------------------
    _refreshAwardItem: function()
    {
        cc.log("GUIInviteKakao _refreshAwardItem");
        //默认显示第一个未领奖的
        var nCurrentAward = 0;
        for(var i = 0; i < this.m_arrBox.length; i++)
        {
            nCurrentAward = i;
            if(!this.m_data.hasAwardWithIndex(i))
            {
                break;
            }
        }

        var arrInfo = this.m_data.getAwardInfoByIndex(nCurrentAward);
        var nAwardNum = arrInfo.length;

         //设置位置
        for(var i = this.m_arrItem.length - 1; i >=0; i--)
        {
            var tElement = arrInfo[i];
            var tSprite = this.m_arrItem[i];

            if(tSprite.num)
            {
                tSprite.num.removeFromParent();
                tSprite.num = null;
            }
            if(tSprite.icon)
            {
                tSprite.icon.removeFromParent();
                tSprite.icon = null;
            }
            //没有的不显示
            if(!tElement)
            {
                continue;
            }


            switch (tElement.type)
            {
                case cc.InviteFriendsAwardType.RELIVE:
                {
                    var strSprite = "game_add_moves_back.png";
                    var strAdd5 = "game_add_moves_five.png";
                    var fScale = 0.6;
                    break;
                }
                case cc.InviteFriendsAwardType.DIAMOND:
                {
                    var strSprite = "icon_diamond_0.png";
                    var fScale = 1.1;
                    break;
                }
                case cc.InviteFriendsAwardType.KAKAOGIFT:
                {
                    //todo kakao冰激凌
                    var strSprite = "icon_diamond_0.png";
                    var fScale = 1.1;
                    break;
                }
                default :
                {
                    var strSprite = tElement.type.SPRITESOURCE;
                    var fScale = 0.6;
                    break;
                }
            }

            var nBackWidth = this.m_spriteAwardBack.getContentSize().width;
            var nBackHeight = this.m_spriteAwardBack.getContentSize().height;

            tSprite.icon = cc.Sprite.createWithSpriteFrameName(strSprite);
            var nPositionX = (nBackWidth - 140)/4*((4-nAwardNum)*0.5 + i);
            tSprite.icon.setPosition(cc.p(70*Defines.BASE_SCALE + nPositionX,nBackHeight/2 - 40*Defines.BASE_SCALE));
            tSprite.icon.setAnchorPoint(cc.p(0,0.5));
            tSprite.icon.setScale(fScale);
            this.m_spriteAwardBack.addChild(tSprite.icon);

            tSprite.num = GUI.createNumberLabel(tElement.num,_GUIPath + "Num/num_16_30x40.png",30,40,"0");
            tSprite.num.setAnchorPoint(cc.p(1,0));
            tSprite.num.setScale(0.6/fScale);
            tSprite.num.setPosition(cc.p(tSprite.icon.getContentSize().width - 5*Defines.BASE_SCALE,5*Defines.BASE_SCALE));
            tSprite.icon.addChild(tSprite.num);

            if(strAdd5)
            {
                var spriteAdd5 = cc.Sprite.createWithSpriteFrameName(strAdd5);
                tSprite.icon.addChild(spriteAdd5);
                spriteAdd5.setPosition(cc.p(tSprite.icon.getContentSize().width/2,tSprite.icon.getContentSize().height/2));
            }

        }
    },

    //------------------------------------------------------------------------------------------------------------------
    _refreshUI: function( bKeepOffset )
    {
        cc.log("GUIInviteKakao _refreshUI");
//        if(!isHtml5)
//        {
        this.m_data.updataFriendsInfo();
//        }
        var nDailyLefts = this.m_data.getDailyInvites();
        var nInvitesNum = this.m_data.getInviteNum();

        this.m_labelCurrentInviteNum.setString(Tools.sprintfs(Resource.ChineseTxt["current_invite_I_guess"],nDailyLefts));

        var nCurrentAward = -1;
        //设置领奖状态
        for(var i = 0; i < this.m_arrBox.length; i++)
        {
            var tElement = this.m_arrBox[i];
            tElement.spriteEnabled.setVisible((nInvitesNum >= tElement.num) && !this.m_data.hasAwardWithIndex(i));
            tElement.spriteDisabled.setVisible((nInvitesNum < tElement.num) || this.m_data.hasAwardWithIndex(i));

            if(nInvitesNum >= tElement.num) nCurrentAward = i;
        }

        //进度条
        var fBaseScale = this.m_spriteProbarBack.getScaleX();
        var fScale = (nCurrentAward == this.m_arrBox.length - 1) ? 1.0 : (nInvitesNum / 40);
        this.m_spriteProbar.setScale(fScale*fBaseScale);

        //还需邀请的人数
        var strLeftInvites = (nCurrentAward == this.m_arrBox.length - 1) ?
                "00" : (this.m_arrBox[nCurrentAward+1].num - nInvitesNum).toString();
        this.m_numlabelLeftFriends.setString(strLeftInvites);

        this._refreshAwardItem();

        //领奖按钮
        this.m_buttonAward.setVisible(nCurrentAward != -1 && !this.m_data.hasAwardWithIndex(nCurrentAward));
        this.m_spriteAwardDisabled.setVisible(nCurrentAward == -1 || this.m_data.hasAwardWithIndex(nCurrentAward));

//        if(this.m_InviteTableView && bReloadTableview)
//        {
        this.m_pointOffset = this.m_InviteTableView.getContentOffset();
        cc.log("m_pointOffset: " + this.m_pointOffset.x + "," + this.m_pointOffset.y);
        this.m_InviteTableView.reloadData();
        cc.log(bKeepOffset);
        if(bKeepOffset && this.m_pointOffset)
        {
            cc.log("m_pointOffset: " + this.m_pointOffset.x + "," + this.m_pointOffset.y);
            this.m_InviteTableView.setContentOffset(this.m_pointOffset);
        }
//        }


    },

    hopeAddTableView: function()
    {
        cc.log("hopeAddTableView");
        cc.log("m_bGetKakaoData: " + this.m_bGetKakaoData);
        cc.log("m_bGetServerData: " + this.m_bGetServerData);
        
        if(this.m_bGetKakaoData && this.m_bGetServerData)
        {
            cc.GUIInviteFriendsKakao.getInstance().addTableView();
            cc.GUIInviteFriendsKakao.getInstance()._refreshUI(false);
        }
    },

    //------------------------------------------------------------------------------------------------------------------
    _getInviteFriendListCallback: function(bResult, tInviteData, nleftCount)
    {
        cc.log("GUIInviteKakao _getInviteFriendListCallback");
//        cc.GUIInviteFriendsKakao.getInstance().addContent();
        if(bResult)
        {
            cc.GUIInviteFriendsKakao.getInstance().m_data.setInviteNum(tInviteData.curInvite);
            cc.GUIInviteFriendsKakao.getInstance().m_data.setDailyLefts(tInviteData.dayMaxInvite - tInviteData.dayInvite);
            cc.GUIInviteFriendsKakao.getInstance().m_data.setDailyInvites(tInviteData.dayInvite);
            cc.GUIInviteFriendsKakao.getInstance().m_data.setAwardStatus(tInviteData.recvReward);
            cc.GUIInviteFriendsKakao.getInstance().m_data.setInvitedUid(tInviteData.invitedUid);

            if(cc.GUIInviteFriendsKakao.getInstance().isWindowOpen())
            {
//
                cc.GUIInviteFriendsKakao.getInstance().m_bGetServerData = true;
                cc.GUIInviteFriendsKakao.getInstance().hopeAddTableView();
            }

        }
        else
        {
            cc.log("_getInviteFriendListCallback failed, 错误码" + tInviteData);
        }
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        cc.log("GUIInviteKakao openWindow");
        this._super(render);

        cc.ResourceMng.getInstance().addToCache(
            Resource._GUIGameLevel_plist,
            Resource._GUIGameLevel_png);

        cc.ResourceMng.getInstance().addToCache(
            Resource._GUIInviteFriendsKakao_plist,
            Resource._GUIInviteFriendsKakao_png);
        //
        cc.AudioMng.getInstance().playOpenWindow();

        this.m_bGetKakaoData = false;
        this.m_bGetServerData = false;
        var self = this;
        //去kakao刷新message_block信息
        joyCommon.getInstance().getJoyFriendsListMessageBlock(
            function(){
                self.m_bGetKakaoData = true;
                self.hopeAddTableView();
            },
            function()
            {
                self.m_bGetKakaoData = true;
                self.hopeAddTableView();
            });

        cc.NodeSelf.getInstance().asyncGetInviteFriendList(this._getInviteFriendListCallback);
        this.getWindow().removeAllChildren(true);
        this.m_pointOffset = null;
        //
        this.m_MyCellsBuilder = new GUIInviteKakao_CellBuilder(cc.size(410 * Defines.BASE_SCALE, 310/4 * Defines.BASE_SCALE));
        this.addContent();
//        this._refreshUI();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        cc.log("GUIInviteKakao closeWindow");
        this._super();

        cc.AudioMng.getInstance().playCloseWindow();
        this.getWindow().removeAllChildren(true);

        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUIInviteFriendsKakao_plist,
            Resource._GUIInviteFriendsKakao_png);

        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUIGameLevel_plist,
            Resource._GUIGameLevel_png);

        this.m_bGetKakaoData = false;
        this.m_bGetServerData = false;
        this.m_pointOffset = null;

        return this;
    }
});

//======================================================================================================================
cc.GUIInviteFriendsKakao.description = function()
{
    return "GUIInviteFriendsKakao";
};

//======================================================================================================================
cc.GUIInviteFriendsKakao._instance = null;
cc.GUIInviteFriendsKakao.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIInviteFriendsKakao();
        this._instance.init();

        //
//        var self = this;
//        FriendsMng.getInstance().registerEvent(
//            _FRIENDS_MNG_EVENT.GET_FRIENDS_IN_CONTACT_LIST_SUCC,
//            function()
//            {
//                self._instance.openWindow();
//            });
    }

    return this._instance;
};


//======================================================================================================================
cc.GUIInviteFriendsKakaoData = cc.Class.extend({

//------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        cc.log("GUIInviteFriendsKakaoData ctor");
        //好友的信息列表
        this.m_arrFriendsInfo = null;
        //邀请的人数
        this.m_nInviteNum = null;
        //今日还能邀请的人数
        this.m_nDailyLefts = null;
        //领奖状态
        this.m_arrAwardStatus = null;
        //已经临过奖的人
        this.m_arrInvitedUid = null;
        this.m_tHashInviteUid = null;
        //今天邀请的人数
        this.m_nDailyInvites = null;

        //领奖内容
        this.m_arrAwardInfo = [
            [{type: Defines.GameItems.ITEM_DIRECTION_EX, num: 3}],
            [{type: Defines.GameItems.ITEM_COLORFUL_EX, num: 4}],
            [{type: cc.InviteFriendsAwardType.RELIVE, num: 2}],
            [{type: cc.InviteFriendsAwardType.DIAMOND, num: 6000}]
//            [{type: cc.InviteFriendsAwardType.DIAMOND, num: 500},{type: cc.InviteFriendsAwardType.KAKAOGIFT, num: 500}]
        ];

    },

    init: function()
    {
        cc.log("GUIInviteFriendsKakaoData init");
        if(isHtml5)
        {
            this._initTestData();
        }

    },

    _initTestData: function()
    {

        this.m_arrFriendsInfo = new Array();
        for(var i = 0;i < 10; i++)
        {
            var tElement = {
                name: "임광근" + i.toString(),
                getName: function(){return this.name;},
                getPhotoUrl: function() {return "";},
                getID: function() {return this.roleId},
                roleId: i    };

            this.m_arrFriendsInfo.push(tElement);
        }

        this.m_nInviteNum = 3;

        this.m_nDailyLefts = 2;

        this.m_nDailyInvites = 3;

        this.m_arrAwardStatus = [0,0,0,0,0];

        this.m_arrInvitedUid = [4,0,1];
    },

//------------------------------------------------------------------------------------------------------------------
    getFriendsInfo: function()
    {
		
        cc.log("GUIInviteFriendsKakaoData getFriendsInfo");
        if(!isHtml5)
        {
            this.m_arrFriendsInfo = null;
            this.m_arrFriendsInfo = FriendsMng.getInstance().getOtherFriendsInfos();
        }
        return this.m_arrFriendsInfo ? this.m_arrFriendsInfo : [];
    },

    setFriendsInfo: function( arrInfo )
    {
        cc.log("GUIInviteFriendsKakaoData setFriendsInfo");
        this.m_arrFriendsInfo = null;
        this.m_arrFriendsInfo = Tools.clone(arrInfo);
    },

    getFriendsNum: function()
    {
        cc.log("GUIInviteFriendsKakaoData getFriendsNum");
        return this.m_arrFriendsInfo ? this.m_arrFriendsInfo.length : 0;
    },

    updataFriendsInfo: function()
    {
        cc.log("GUIInviteFriendsKakaoData updataFriendsInfo");
//        var arrFriendInfo = Tools.clone(this.m_arrFriendsInfo);
//        this.m_arrFriendsInfo = null;
//        this.m_arrFriendsInfo = new Array();
//         var arrFriendInfo = FriendsMng.getInstance().getOtherFriendsInfos();
        var tHashInvitedUid = {};
        var arrInvitedUid = this.m_arrInvitedUid;
//
        if(arrInvitedUid)
        {
            for(var i = 0; i < arrInvitedUid.length; ++i)
            {
                tHashInvitedUid[arrInvitedUid[i].toString()] = true;
            }
        }

        this.setHashInvitedUid(tHashInvitedUid);
//
//
//        for(var i = 0; i < arrFriendInfo.length; ++i)
//        {
//            if(!tHashInvitedUid[arrFriendInfo[i].roleId])
//            {
//                this.m_arrFriendsInfo.push(arrFriendInfo[i]);
//            }
//        }
    },

//------------------------------------------------------------------------------------------------------------------
    getInviteNum: function()
    {
        cc.log("GUIInviteFriendsKakaoData getInviteNum");
        return this.m_nInviteNum;
    },

    setInviteNum: function( nNum )
    {
        cc.log("GUIInviteFriendsKakaoData setInviteNum");
        this.m_nInviteNum = nNum;
    },

//------------------------------------------------------------------------------------------------------------------
    getDailyInvites: function()
    {
        cc.log("GUIInviteFriendsKakaoData getDailyInvites");
        return this.m_nDailyInvites;
    },

    setDailyInvites: function( nInvites )
    {
        cc.log("GUIInviteFriendsKakaoData setDailyInvites");
        this.m_nDailyInvites = nInvites;
    },

//------------------------------------------------------------------------------------------------------------------
    getDailyLefts: function()
    {
        cc.log("GUIInviteFriendsKakaoData getDailyLefts");
        return this.m_nDailyLefts;
    },

    setDailyLefts: function( nLefts )
    {
        cc.log("GUIInviteFriendsKakaoData setDailyLefts");
        this.m_nDailyLefts = nLefts;
    },

//------------------------------------------------------------------------------------------------------------------
    getAwardStatus: function()
    {
        cc.log("GUIInviteFriendsKakaoData getAwardStatus");
        return this.m_arrAwardStatus;
    },

    setAwardStatus: function(arrStatus)
    {
        cc.log("GUIInviteFriendsKakaoData setAwardStatus");
        this.m_arrAwardStatus = null;
        this.m_arrAwardStatus = Tools.clone(arrStatus);
    },

    hasAwardWithIndex: function( nIndex )
    {
        cc.log("GUIInviteFriendsKakaoData hasAwardWithIndex");
        if(this.getAwardStatus())
        {
            return parseInt(this.getAwardStatus()[nIndex]) == 1 ? true:false;
        }

        return false;

    },

//------------------------------------------------------------------------------------------------------------------
    setInvitedUid: function(arrUid)
    {
        cc.log("GUIInviteFriendsKakaoData setInvitedUid");
        this.m_arrInvitedUid = arrUid;
    },

    getInvitedUid: function()
    {
        cc.log("GUIInviteFriendsKakaoData getInvitedUid");
        return this.m_arrInvitedUid;
    },

//------------------------------------------------------------------------------------------------------------------
    setHashInvitedUid: function(tUid)
    {
        cc.log("GUIInviteFriendsKakaoData setHashInvitedUid");
        this.m_tHashInviteUid = null;
        this.m_tHashInviteUid = tUid;
    },

    getHashInvitedUid: function()
    {
        cc.log("GUIInviteFriendsKakaoData getHashInvitedUid");
        return this.m_tHashInviteUid;
    },

    isInvited: function(strId)
    {
        if(!this.m_tHashInviteUid)
        {
            return false;
        }

        return this.m_tHashInviteUid[strId] ? true : false;
    },

//------------------------------------------------------------------------------------------------------------------
    getAwardInfoByIndex: function( nIndex )
    {
        //
        cc.log("GUIInviteFriendsKakaoData getAwardInfoByIndex");
        return this.m_arrAwardInfo[nIndex];
    }


//------------------------------------------------------------------------------------------------------------------
});

cc.GUIInviteFriendsKakaoData._instance = null;
cc.GUIInviteFriendsKakaoData.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIInviteFriendsKakaoData();
        this._instance.init();
    }

    return this._instance;
};

cc.InviteFriendsAwardType = {
    RELIVE: 666,
    DIAMOND : 888,
    KAKAOGIFT: 999
}