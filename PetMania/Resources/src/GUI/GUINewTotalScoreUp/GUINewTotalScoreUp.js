//----------------------------------------------------------------------------------------------------------------------
var GUINewTotalScoreUp_CellBuilder = cc.Class.extend({

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

        this.m_TabIndex = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    _static: function()
    {
        return GUINewTotalScoreUp_CellBuilder.prototype;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "GUINewTotalScoreUp_CellBuilder";
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

        this.m_TabIndex =idx;

        //背景
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

        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    decoratePhoto: function (cell, friendInfo)
    {
        var photoUrl = friendInfo.getPhotoUrl();

        if (photoUrl == "")
        {
            ////cc.log("没有照片 = " + friendInfo);
            return cell;
        }
        var friendPhotoImg =  cc.Sprite.create(photoUrl);
        if (!friendPhotoImg)
        {
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
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.FRIEND_NAME).setString(friendInfo.getName());


        //照片
        this.decoratePhoto(cell, friendInfo);

        var targetScore = 0;
        var targetStr = "";

        if (this.m_TabIndex == Defines._TOP_KEY.LEVEL)
        {
            targetStr = "최종 스테이지 : ";
            targetScore = friendInfo.getTotalLevel();
        }
        else if (this.m_TabIndex == Defines._TOP_KEY.SCORE)
        {
            targetStr = "획득 점수 : ";
            targetScore = friendInfo.getTotalScore();
        }
        else if (this.m_TabIndex == Defines._TOP_KEY.WEEKLY)
        {
            targetStr = "획득 점수 : ";
            targetScore = friendInfo.getScoreUpData();
        }

        //分数
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.FRIEND_SCORE).setString(targetStr + targetScore.toString());
        return cell;
    }

});
//----------------------------------------------------------------------------------------------------------------------



//=======================================================================================================
cc.GUINewTotalScoreUp = cc.GUIWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUINewTotalScoreUp";
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
        this.m_selfScore = 0;
        this.m_TabIndex = -1;
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

        var top = cc.Sprite.createWithSpriteFrameName("GUI_TotalScoreUp_title.png");
        this.m_MainUI.addChild(top);
        top.setPosition(cc.p(mainSize.width / 2, mainSize.height - 30 * Defines.BASE_SCALE));//35, 37));

        //三个选项卡

        var mainSize = this.m_MainUI.getContentSize();

        //关卡排行
        this.buttonLevel =cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("GUI_Stage_Friend_Off.png"),
            cc.Sprite.createWithSpriteFrameName("GUI_Stage_Friend_Off.png"),
            this._btnTabCallback, this);
        this.buttonLevel.setPosition(cc.p(mainSize.width * 0.25, mainSize.height - top.getContentSize().height - 44 * Defines.BASE_SCALE));
        this.buttonLevel.setTag(Defines._TOP_KEY.LEVEL);

        this.tabSelectLevel = cc.Sprite.createWithSpriteFrameName("GUI_Stage_Friend_On.png");
        this.m_MainUI.addChild(this.tabSelectLevel);
        this.tabSelectLevel.setPosition(cc.p(mainSize.width * 0.25, mainSize.height - top.getContentSize().height - 44 * Defines.BASE_SCALE ));
        this.tabSelectLevel.setVisible(false);

        //分数排行
        this.buttonScore =cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("GUI_Stage_Score_Off.png"),
            cc.Sprite.createWithSpriteFrameName("GUI_Stage_Score_Off.png"),
            this._btnTabCallback, this);
        this.buttonScore.setPosition(cc.p(mainSize.width * 0.5, mainSize.height - top.getContentSize().height - 44 * Defines.BASE_SCALE));
        this.buttonScore.setTag(Defines._TOP_KEY.SCORE);

        this.tabSelectScore = cc.Sprite.createWithSpriteFrameName("GUI_Stage_Score_On.png");
        this.m_MainUI.addChild(this.tabSelectScore);
        this.tabSelectScore.setPosition(cc.p(mainSize.width * 0.5, mainSize.height - top.getContentSize().height - 44 * Defines.BASE_SCALE ));
        this.tabSelectScore.setVisible(false);

        //周排行
        this.buttonWeekly =cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("GUI_Stage_Weekly_Off.png"),
            cc.Sprite.createWithSpriteFrameName("GUI_Stage_Weekly_Off.png"),
            this._btnTabCallback, this);
        this.buttonWeekly.setPosition(cc.p(mainSize.width * 0.75, mainSize.height - top.getContentSize().height - 44 * Defines.BASE_SCALE));
        this.buttonWeekly.setTag(Defines._TOP_KEY.WEEKLY);

        this.tabSelectWeekly = cc.Sprite.createWithSpriteFrameName("GUI_Stage_Weekly_On.png");
        this.m_MainUI.addChild(this.tabSelectWeekly);
        this.tabSelectWeekly.setPosition(cc.p(mainSize.width * 0.75, mainSize.height - top.getContentSize().height - 44 * Defines.BASE_SCALE ));
        this.tabSelectWeekly.setVisible(false);

        this.m_Menu = cc.Menu.create(this.buttonLevel ,this.buttonScore , this.buttonWeekly);
        this.m_Menu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(this.m_Menu);

        //
        var backFrame = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back12.png");
        this.m_MainUI.addChild(backFrame);
        backFrame.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.44));
        backFrame.setScaleY(0.93);

        var backSize = backFrame.getContentSize();

        var fenge_Line_1 = cc.Sprite.create(_GUIPath + "GUINewGeneral/fenge_line.png");
        backFrame.addChild(fenge_Line_1);
        fenge_Line_1.setPosition(cc.p(backSize.width * 0.5, backSize.height  * 0.75));

        var fenge_Line_2 = cc.Sprite.create(_GUIPath + "GUINewGeneral/fenge_line.png");
        backFrame.addChild(fenge_Line_2);
        fenge_Line_2.setPosition(cc.p(backSize.width * 0.5, backSize.height * 0.5));

        var fenge_Line_2 = cc.Sprite.create(_GUIPath + "GUINewGeneral/fenge_line.png");
        backFrame.addChild(fenge_Line_2);
        fenge_Line_2.setPosition(cc.p(backSize.width * 0.5, backSize.height * 0.25));

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnTabCallback: function (sender)
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        this.m_TabIndex = sender.getTag();
        this.updateUIContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateUIContent: function()
    {
        if (this.m_TabIndex == Defines._TOP_KEY.LEVEL){
            this.buttonLevel.setVisible(false);
            this.tabSelectLevel.setVisible(true);
            this.buttonScore.setVisible(true);
            this.tabSelectScore.setVisible(false);
            this.buttonWeekly.setVisible(true);
            this.tabSelectWeekly.setVisible(false);

        }
        else if (this.m_TabIndex == Defines._TOP_KEY.SCORE){
            this.buttonLevel.setVisible(true);
            this.tabSelectLevel.setVisible(false);
            this.buttonScore.setVisible(false);
            this.tabSelectScore.setVisible(true);
            this.buttonWeekly.setVisible(true);
            this.tabSelectWeekly.setVisible(false);

//            this.addContentLogin();
        }
        else if (this.m_TabIndex == Defines._TOP_KEY.WEEKLY){
            this.buttonLevel.setVisible(true);
            this.tabSelectLevel.setVisible(false);
            this.buttonScore.setVisible(true);
            this.tabSelectScore.setVisible(false);
            this.buttonWeekly.setVisible(false);
            this.tabSelectWeekly.setVisible(true);
//            this.addContentLogin();
        }
        this.reloadFriendsTableView();
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
        this.m_MyCellsBuilder.buildCell(cell, this.m_TabIndex,  this);

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

//        var friendsInfosByScoreTop = FriendsMng.getInstance().getFriendsInfos().concat();

		this.m_FriendsInfosByScoreTop = [];
		this.m_FriendsInfosByScoreTop = FriendsMng.getInstance().getFriendsInfos().concat();
		this.m_FriendsInfosByScoreTop.unshift(FriendInfo.createSelfForTotalScore());

        //
        this.m_MapFriendRoleIdToPos = {};
//
//        //
        //按着分数大小排列

        if (this.m_TabIndex == Defines._TOP_KEY.LEVEL)
        {
            this.m_FriendsInfosByScoreTop.sort(
                function(left, right)
                {
                    var leftScore = left.getTotalLevel();
                    var rightScore = right.getTotalLevel();
                    return leftScore > rightScore ? -1 : 1;
                }
            );

        }
        else if (this.m_TabIndex == Defines._TOP_KEY.SCORE)
        {
            this.m_FriendsInfosByScoreTop.sort(
                function(left, right)
                {
                    var leftScore = left.getTotalScore();
                    var rightScore = right.getTotalScore();
                    return leftScore > rightScore ? -1 : 1;
                }
            );
        }
        else if (this.m_TabIndex == Defines._TOP_KEY.WEEKLY)
        {
            this.m_FriendsInfosByScoreTop.sort(
                function(left, right)
                {
                    var leftScore = left.getScoreUpData();
                    var rightScore = right.getScoreUpData();
                    return leftScore > rightScore ? -1 : 1;
                }
            );
        }


        //
        this.m_FriendsInfosByScoreTop.forEach(
            function(a_friend, index)
            {
                self.m_MapFriendRoleIdToPos[a_friend.getRoleId()] = index;
            }
        );
        //
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    reloadFriendsTableView: function()
    {
        //
        this.reloadFriendsDatas();

        this.m_MainUI.removeChildByTag(1000);

        //
        this.m_FriendTableView = cc.TableView.create(
            this,
            cc.size(
                this.m_MyCellsBuilder.getCellSize().width,
                this.m_MyCellsBuilder.getCellSize().height * 4
            )
        );

        this.m_MainUI.addChild(this.m_FriendTableView,0,1000);

        //
        this.m_FriendTableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.m_FriendTableView.setAnchorPoint(cc.p(0, 0));
        this.m_FriendTableView.setPosition(cc.p(30 * Defines.BASE_SCALE, 50 * Defines.BASE_SCALE));
        this.m_FriendTableView.setDelegate(this);
        this.m_FriendTableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);

        //
        this.m_FriendTableView.reloadData();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);
        this.getWindow().removeAllChildren(true);
        cc.ResourceMng.getInstance().addToCache(
            Resource._GUITotalLevelTop_plist,
            Resource._GUITotalLevelTop_png);


        this.m_MyCellsBuilder = new GUINewTotalScoreUp_CellBuilder(
            cc.size(422 * Defines.BASE_SCALE, 80 * Defines.BASE_SCALE)
        );
        //
        this.m_TabIndex = 0;

        GameScoreUpModel.getInstance().askServerForTopDatas();


        this.addContent();

        this.updateUIContent();
        this.reloadFriendsTableView();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();
        cc.AudioMng.getInstance().playButtonSound(true);
        this.getWindow().unscheduleAllCallbacks();
        this.getWindow().removeAllChildren(true);
        this.m_FriendTableView = null;
        this.m_FriendsInfosByScoreTop = [];
        this.m_MapFriendRoleIdToPos = {};
        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUITotalLevelTop_plist,
            Resource._GUITotalLevelTop_png);

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});


cc.GUINewTotalScoreUp._instance = null;
cc.GUINewTotalScoreUp.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUINewTotalScoreUp();
        this._instance.init();

        var self = this;
        FriendsMng.getInstance().registerEvent(
            _FRIENDS_MNG_EVENT.GET_FRIENDS_WEEKLY_SUCC,
            function()
            {
                cc.log("_FRIENDS_MNG_EVENT.GET_FRIENDS_WEEKLY_SUCC");

                if (self._instance.isWindowOpen())
                {
                    self._instance.reloadFriendsTableView();
                }
            },
            null);
    }

    return this._instance;
};