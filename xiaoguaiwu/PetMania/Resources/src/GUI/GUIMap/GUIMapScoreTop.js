//----------------------------------------------------------------------------------------------------------------------
var GUIMapScoreTop_CellBuilder = cc.Class.extend({

    //
    CELL_CONTENT_TAG:
    {
        BACK_GROUND_SELF: 999,      //背景
        BACK_GROUND_FRIEND: 1000,   //背景
        POSITION: 1001,             //位置
        PHOTO: 1002,                //头像
        FRIEND_NAME: 1003,          //好友名字
        FRIEND_SCORE: 1004,          //好友名字
        GIVE_HEART: 1005,           //给心
        GIVE_HEART_CD: 1006      //给心的cd
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
        return GUIMapScoreTop_CellBuilder.prototype;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "GUIMapScoreTop_CellBuilder";
    },

    //------------------------------------------------------------------------------------------------------------------
    getCellSize: function()
    {
        return this.m_CellSize;
    },

    //------------------------------------------------------------------------------------------------------------------
    buildCell: function(cell, idx, targetGUI)
    {
        var self = this;
        cell.removeAllChildren(true);

        this.m_idx =idx;

        //背景
//        var backGroundSelf = cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_Panel2.png");
//        cell.addChild(backGroundSelf, 0, this._static().CELL_CONTENT_TAG.BACK_GROUND_SELF);
//        backGroundSelf.setAnchorPoint(cc.p(0, 0));
//
//        //
//        var backGroundFriend = cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_Panel1.png");
//        cell.addChild(backGroundFriend, 0, this._static().CELL_CONTENT_TAG.BACK_GROUND_FRIEND);
//        backGroundFriend.setAnchorPoint(cc.p(0, 0));

        var topPos = cc.LabelTTF.create("4", Defines.DefaultFont, 28 * Defines.BASE_SCALE);
        cell.addChild(topPos, 0, this._static().CELL_CONTENT_TAG.POSITION);
        topPos.setAnchorPoint(cc.p(0.5, 0.5));
        topPos.setPosition(cc.p(33 * Defines.BASE_SCALE, 46 * Defines.BASE_SCALE));//35 * Defines.BASE_SCALE


        //照片头像
        var friendPhoto = cc.Sprite.createWithSpriteFrameName("general_default_photo_1.png");
        friendPhoto.setPosition(cc.p(107 * Defines.BASE_SCALE, 45 * Defines.BASE_SCALE));
        cell.addChild(friendPhoto, 100000, this._static().CELL_CONTENT_TAG.PHOTO);

        //名字
        var hisName = cc.LabelTTF.create("名字名字名字111", Defines.DefaultFont, 14 * Defines.BASE_SCALE);
        cell.addChild(hisName, 0, this._static().CELL_CONTENT_TAG.FRIEND_NAME);
        hisName.setAnchorPoint(cc.p(0, 0.5));
        hisName.setPosition(cc.p(152 * Defines.BASE_SCALE, 68 * Defines.BASE_SCALE));//73 * Defines.BASE_SCALE));

        //成绩
        var hisScore = cc.LabelTTF.create("획득 점수 : " , Defines.DefaultFont, 14 * Defines.BASE_SCALE);
        cell.addChild(hisScore, 0, this._static().CELL_CONTENT_TAG.FRIEND_SCORE);
        hisScore.setAnchorPoint(cc.p(0, 0.5));
        hisScore.setPosition(cc.p(152 * Defines.BASE_SCALE, 35 * Defines.BASE_SCALE));

//        var spriteNormal = cc.Sprite.createWithSpriteFrameName("shop_btn_sendGreen_nor.png");
//        var spriteSelected = cc.Sprite.createWithSpriteFrameName("shop_btn_sendGreen_sel.png");
//        var buttonGiveGift = cc.MenuItemSprite.create(spriteNormal, spriteSelected, _btnPhotoCallback, targetGUI);
//        buttonGiveGift.setTag(idx);
//
//        //
//        var menu = cc.Menu.create(buttonGiveGift);
//        cell.addChild(menu, 100000, this._static().CELL_CONTENT_TAG.GIVE_HEART);
//        menu.setPosition(cc.p(0, 0));
//        buttonGiveGift.setPosition(cc.p(363 * Defines.BASE_SCALE, 37 * Defines.BASE_SCALE));

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
        var photoUrl = friendInfo.avatar;

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

        var friendPhoto = cc.Sprite.create(photoUrl);

        var defaultPhoto = cell.getChildByTag(this._static().CELL_CONTENT_TAG.PHOTO);
        defaultPhoto.removeAllChildren(true);
        //
        defaultPhoto.addChild(friendPhoto);

        //
        friendPhoto.setScaleX(defaultPhoto.getContentSize().width/friendPhoto.getContentSize().width);
        friendPhoto.setScaleY(defaultPhoto.getContentSize().height/friendPhoto.getContentSize().height);
        friendPhoto.setPosition(
            cc.p(defaultPhoto.getContentSize().width/2,
                defaultPhoto.getContentSize().height/2)
        );

        return cell;
    },


    //------------------------------------------------------------------------------------------------------------------
    decorateCell: function(cell, idx, friendInfo,isLoading)
    {

        //背景
        var selfIdx = cc.GUIMyFriendsTop.getInstance().getTopIndex(friendInfo["userid"]);

        if (selfIdx && selfIdx != -1){
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
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.FRIEND_NAME).setString(friendInfo.nick);//.getName(8));

        //分数
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.FRIEND_SCORE).setString("획득 점수 : " + friendInfo.score);

        //照片
        this.decoratePhoto(cell, friendInfo);

        return cell;
    }

});
//----------------------------------------------------------------------------------------------------------------------

//=======================================================================================================
cc.GUIMapScoreTop = cc.GUIWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUIMapScoreTop";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();
        this.m_MainUI = null;
        this.m_ButtonClose = null;

        this.m_FriendTableView = null;
        this.m_FriendsInfosByScoreTop = [];
        this.m_MapFriendRoleIdToPos = {};
        this.m_MyCellsBuilder = null;
        this.m_mapID = -1;
        this.m_selfScore = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(blockLayer, -1);

        //
        this.m_MainUI = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back1.png");
        this.getWindow().addChild(this.m_MainUI);
        this.m_MainUI.setPosition(_ScreenCenter());
        var mainSize = this.m_MainUI.getContentSize();
        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this.closeWindow, this);
        buttonClose.setPosition(cc.p(mainSize.width - 5 * Defines.BASE_SCALE, mainSize.height - 5 * Defines.BASE_SCALE));
        var close_menu = cc.Menu.create(buttonClose);
        close_menu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(close_menu);

        var titleBgSprite = cc.Sprite.create(_GUIPath + "GUINewGeneral/StarNameTitle_nine.png");
        var titleSize = titleBgSprite.getContentSize();

        var titleTargetSize = cc.size(345 * Defines.BASE_SCALE, 43 * Defines.BASE_SCALE);
        var titlePanel = cc.Scale9Sprite.create(_GUIPath + "GUINewGeneral/StarNameTitle_nine.png",
            cc.rect(0, 0, titleSize.width, titleSize.height),
            cc.rect(titleSize.width * 0.3, titleSize.height * 0.3, titleSize.width * 0.4, titleSize.height * 0.4));
        titlePanel.setPreferredSize(titleTargetSize);
//        panel.setAnchorPoint(cc.p(0, 0.5));
        titlePanel.setPosition(cc.p(mainSize.width/2, 433 * Defines.BASE_SCALE));
        this.m_MainUI.addChild(titlePanel);

        var backFrame = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back12.png");
        this.m_MainUI.addChild(backFrame);
        backFrame.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.51));
        backFrame.setScaleY(0.83);

        var backSize = backFrame.getContentSize();

        var fenge_Line_1 = cc.Sprite.create(_GUIPath + "GUINewGeneral/fenge_line.png");
        backFrame.addChild(fenge_Line_1);
        fenge_Line_1.setPosition(cc.p(backSize.width * 0.5, backSize.height  * 0.66));

        var fenge_Line_2 = cc.Sprite.create(_GUIPath + "GUINewGeneral/fenge_line.png");
        backFrame.addChild(fenge_Line_2);
        fenge_Line_2.setPosition(cc.p(backSize.width * 0.5, backSize.height * 0.33));

        //下方赠送栏

        var srcSprite = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png");
        var srcSize = srcSprite.getContentSize();

        var targetSize = cc.size(433 * Defines.BASE_SCALE, 60  * Defines.BASE_SCALE);//(433 * Defines.BASE_SCALE, 92 * Defines.BASE_SCALE);
        var panel = cc.Scale9Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png",
            cc.rect(0, 0, srcSize.width, srcSize.height),
            cc.rect(srcSize.width * 0.3, srcSize.height * 0.3, srcSize.width * 0.4, srcSize.height * 0.4));

        //
        panel.setPreferredSize(targetSize);
//        panel.setAnchorPoint(cc.p(0, 0.5));
        panel.setPosition(cc.p(mainSize.width * 0.5, 45 * Defines.BASE_SCALE));
        this.m_MainUI.addChild(panel);


        var labelDescription = cc.LabelTTF.create("나의 획득 점수 : " +  this.m_selfScore, Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        panel.addChild(labelDescription);
        labelDescription.setAnchorPoint(cc.p(0.5, 0.5));
        labelDescription.setPosition(cc.p(targetSize.width / 2, targetSize.height / 2));

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
//        return 3;
        if (this.m_FriendsInfosByScoreTop.length > 3){
            return 3;
        }
        return this.m_FriendsInfosByScoreTop.length;
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
        this.m_MyCellsBuilder.buildCell(cell, idx,  this);

        //
        var friendInfo = this.m_FriendsInfosByScoreTop[idx];
        if (!friendInfo)
        {
            //cc.log("没有好友信息? = " + idx);
            return cell;
        }

        //
        this.m_MyCellsBuilder.decorateCell(cell, idx, friendInfo, this.m_IsLoading);

        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    reloadFriendsDatas: function()
    {
        var self = this;

        if (FriendsMng.getInstance().getStarScoreTop(this.m_mapID + 1)){
            var friendsInfosByScoreTop = FriendsMng.getInstance().getStarScoreTop(this.m_mapID + 1).concat();
        }
        else {
            var friendsInfosByScoreTop = [];
        }


        //
        this.m_MapFriendRoleIdToPos = {};

        this.m_FriendsInfosByScoreTop = [];

        //更新从服务器获得的数据 去掉空的

        if (friendsInfosByScoreTop.length > 0){
            for (var i = 0; i < 3; i++){
                if (friendsInfosByScoreTop[i] != null){
                    var friendID = friendsInfosByScoreTop[i].userid;
                    var localFriendInfo = FriendsMng.getInstance().getFriendInfoByRoleId(friendID);
                    friendsInfosByScoreTop[i].nick = localFriendInfo.getName();
                    friendsInfosByScoreTop[i].avatar = localFriendInfo.getPhotoUrl();

                    this.m_FriendsInfosByScoreTop.push(friendsInfosByScoreTop[i]);
                }
            }
        }

        //添加玩家自身数据
        var m_selfInfo = {
            'userid':cc.NodeSelf.getInstance().getUID(),
            'avatar':cc.NodeSelf.getInstance().getSelfPhoto(),
            'nick':cc.NodeSelf.getInstance().getNick(),
            'roleid':cc.NodeSelf.getInstance().getRoleId(),
            'score':cc.DataMng.getInstance().getSingleStarScore(this.m_mapID)};

        this.m_FriendsInfosByScoreTop.push(m_selfInfo);



        //
//        //按着分数大小排列
        this.m_FriendsInfosByScoreTop.sort(
            function(left, right)
            {
                var leftScore = left.score;
                var rightScore = right.score;
                return leftScore > rightScore ? -1 : 1;
            }
        );

        //
//        this.m_FriendsInfosByScoreTop.forEach(
//            function(a_friend, index)
//            {
//                self.m_MapFriendRoleIdToPos[a_friend.getRoleId()] = index;
//            }
//        );

        var mainSize = this.m_MainUI.getContentSize();

        var friendInfo = this.m_FriendsInfosByScoreTop[0];

//        cc.log("!!!this.m_FriendsInfosByScoreTop= " + this.m_FriendsInfosByScoreTop);

        if (!friendInfo)
        {
            var titleText = cc.LabelTTF.create("**  * 님의 행성", Defines.DefaultFont, 14 * Defines.BASE_SCALE);
            this.m_MainUI.addChild(titleText);
            titleText.setPosition(cc.p(mainSize.width/2, 433 * Defines.BASE_SCALE));
        }
        else {
            var titleText = cc.LabelTTF.create(friendInfo.nick + " 님의 행성", Defines.DefaultFont, 14 * Defines.BASE_SCALE);
            this.m_MainUI.addChild(titleText);
            titleText.setPosition(cc.p(mainSize.width/2, 433 * Defines.BASE_SCALE));
        }

        //
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    reloadFriendsTableView: function()
    {
        //
        this.reloadFriendsDatas();

        //
        this.m_FriendTableView = cc.TableView.create(
            this,
            cc.size(
                this.m_MyCellsBuilder.getCellSize().width,
                this.m_MyCellsBuilder.getCellSize().height * 3
            )
        );

        this.m_MainUI.addChild(this.m_FriendTableView);

        //
        this.m_FriendTableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.m_FriendTableView.setAnchorPoint(cc.p(0, 0));
        this.m_FriendTableView.setPosition(cc.p(30 * Defines.BASE_SCALE, 98 * Defines.BASE_SCALE));
        this.m_FriendTableView.setDelegate(this);
        this.m_FriendTableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);

        //
        this.m_FriendTableView.reloadData();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, mapID)
    {
        this._super(render);
        this.getWindow().removeAllChildren(true);

        this.m_MyCellsBuilder = new GUIMapScoreTop_CellBuilder(
            cc.size(422 * Defines.BASE_SCALE, 95 * Defines.BASE_SCALE)
        );
        //
        this.m_TabIndex = -1;

        this.m_mapID = mapID;

        this.m_selfScore = cc.DataMng.getInstance().getSingleStarScore(this.m_mapID);

        this.addContent();

        this.reloadFriendsTableView();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();
        cc.AudioMng.getInstance().playButtonSound(true);
        this.getWindow().removeAllChildren(true);
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});


cc.GUIMapScoreTop._instance = null;
cc.GUIMapScoreTop.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIMapScoreTop();
        this._instance.init();
    }

    return this._instance;
};