//----------------------------------------------------------------------------------------------------------------------
var MyFriendsGift_CellBuilder = cc.Class.extend({

    //
    CELL_CONTENT_TAG:
    {
        BACK_GROUND_SELF: 999,      //背景
        BACK_GROUND_FRIEND: 1000,   //背景
        POSITION: 1001,             //位置
        PHOTO: 1002,                //头像
        FRIEND_NAME: 1003,          //好友名字
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
        return MyFriendsGift_CellBuilder.prototype;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "MyFriendsGift_CellBuilder";
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

        //背景
//        var backGroundSelf = cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_Panel2.png");
//        cell.addChild(backGroundSelf, 0, this._static().CELL_CONTENT_TAG.BACK_GROUND_SELF);
//        backGroundSelf.setAnchorPoint(cc.p(0, 0));
//
//        //
//        var backGroundFriend = cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_Panel1.png");
//        cell.addChild(backGroundFriend, 0, this._static().CELL_CONTENT_TAG.BACK_GROUND_FRIEND);
//        backGroundFriend.setAnchorPoint(cc.p(0, 0));

        //照片头像
        var friendPhoto = cc.Sprite.createWithSpriteFrameName("general_default_photo_1.png");
        friendPhoto.setPosition(cc.p(57 * Defines.BASE_SCALE, 41 * Defines.BASE_SCALE));
        cell.addChild(friendPhoto, 100000, this._static().CELL_CONTENT_TAG.PHOTO);

        //名字
        var hisName = cc.LabelTTF.create("名字名字名字", Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        cell.addChild(hisName, 0, this._static().CELL_CONTENT_TAG.FRIEND_NAME);
        hisName.setAnchorPoint(cc.p(0.5, 0.5));
        hisName.setPosition(cc.p(145 * Defines.BASE_SCALE, 41 * Defines.BASE_SCALE));//73 * Defines.BASE_SCALE));

        var spriteNormal = cc.Sprite.createWithSpriteFrameName("shop_btn_sendGreen_nor.png");
        var spriteSelected = cc.Sprite.createWithSpriteFrameName("shop_btn_sendGreen_sel.png");
        var buttonGiveGift = cc.MenuItemSprite.create(spriteNormal, spriteSelected, _btnPhotoCallback, targetGUI);
        buttonGiveGift.setTag(idx);

        //
        var menu = cc.Menu.create(buttonGiveGift);
        cell.addChild(menu, 100000, this._static().CELL_CONTENT_TAG.GIVE_HEART);
        menu.setPosition(cc.p(0, 0));
        buttonGiveGift.setPosition(cc.p(363 * Defines.BASE_SCALE, 37 * Defines.BASE_SCALE));

        var friendSelected = cc.Sprite.createWithSpriteFrameName("shop_btn_select.png");
        friendSelected.setPosition(buttonGiveGift.getPosition());
        cell.addChild(friendSelected, 100000, this._static().CELL_CONTENT_TAG.GIVE_HEART_CD);
        friendSelected.setVisible(false);

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
    decorateCell: function(cell, idx, friendInfo,isChecked)
    {

        //背景
//        cell.getChildByTag(this._static().CELL_CONTENT_TAG.BACK_GROUND_SELF).setVisible(isMySelf);
//        cell.getChildByTag(this._static().CELL_CONTENT_TAG.BACK_GROUND_FRIEND).setVisible(!isMySelf);

        cell.getChildByTag(this._static().CELL_CONTENT_TAG.GIVE_HEART).setVisible(!isChecked);
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.GIVE_HEART_CD).setVisible(isChecked);

        //名字
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.FRIEND_NAME).setString(friendInfo.getName());

        //照片
        this.decoratePhoto(cell, friendInfo);

        return cell;
    }

});
//----------------------------------------------------------------------------------------------------------------------

//=======================================================================================================
cc.GUIShopSendGift = cc.GUIWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUIShopSendGift";
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
        this.m_MapFriendRoleIdToSelect = {};
        this.m_curSelectRoleID = -1;
        this.m_MyCellsBuilder = null;
        this.btn_Send = null;
        this.btn_Send_grey = null;

        this.have_send_friend = false;
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

        var titleSpr = cc.Sprite.createWithSpriteFrameName("shop_sendGift_title.png");
        this.m_MainUI.addChild(titleSpr);
        titleSpr.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.9));

        //
        var backFrame = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back12.png");
        this.m_MainUI.addChild(backFrame);
        backFrame.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.53));
        backFrame.setScaleY(0.72);

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

        var targetSize = cc.size(433 * Defines.BASE_SCALE, 92 * Defines.BASE_SCALE);
        var panel = cc.Scale9Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png",
            cc.rect(0, 0, srcSize.width, srcSize.height),
            cc.rect(srcSize.width * 0.3, srcSize.height * 0.3, srcSize.width * 0.4, srcSize.height * 0.4));

        //
        panel.setPreferredSize(targetSize);
//        panel.setAnchorPoint(cc.p(0, 0.5));
        panel.setPosition(cc.p(mainSize.width * 0.5, 64 * Defines.BASE_SCALE));
        this.m_MainUI.addChild(panel);

        //道具描述
        var spriteItem = cc.Sprite.createWithSpriteFrameName(this.m_ShopData.SPRITE_SOURCE);
        panel.addChild(spriteItem);
        spriteItem.setPosition(cc.p(77 * Defines.BASE_SCALE, 44 * Defines.BASE_SCALE));

        var sprSize = spriteItem.getContentSize();

        var getMaxLength = (sprSize.width > sprSize.height) ? sprSize.width : sprSize.height;

        spriteItem.setScale(72 * Defines.BASE_SCALE/getMaxLength);
//        spriteItem.setScaleY(72 /sprSize.height);

        var moneySign = Defines.OS.isiOS() ? "$" : "";

        var currencyFile = Defines.OS.isiOS() ? "" : "원에";

        var labelDescription = cc.LabelTTF.create(this.m_ShopData.NAME + " \n"  + " " +moneySign +
            this.m_ShopData.TOTAL_PRICE.get() + currencyFile , Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        panel.addChild(labelDescription);
        labelDescription.setAnchorPoint(cc.p(0.5, 0.5));
        labelDescription.setPosition(cc.p(194 * Defines.BASE_SCALE, 48 * Defines.BASE_SCALE));

        this.btn_Send = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("shop_btn_send_nor.png"),
            cc.Sprite.createWithSpriteFrameName("shop_btn_send_sel.png"),
            this._btnSendCallback, this);
        this.btn_Send.setPosition(cc.p(355 * Defines.BASE_SCALE, 47 * Defines.BASE_SCALE));
        this.btn_Send.setVisible(false);
        var send_menu = cc.Menu.create(this.btn_Send);
        send_menu.setPosition(cc.p(0, 0));
        panel.addChild(send_menu);

        this.btn_Send_grey = cc.Sprite.createWithSpriteFrameName("shop_btn_send_grey.png");
        panel.addChild(this.btn_Send_grey);
        this.btn_Send_grey.setPosition(this.btn_Send.getPosition());

        //
        return this;
    },

    _btnSearchCallback : function(){
        cc.log("_btnSearchCallback");
    },

    getSendUserArr : function(){
	
		var self = this;
        var targetUserArr = [];

        cc.log("getSendUserArr = ID = " + this.m_curSelectRoleID);

        if (this.m_curSelectRoleID != -1){
            targetUserArr.push(this.m_curSelectRoleID);
            cc.log("send uid = " +this.m_curSelectRoleID);
        }
//        this.m_FriendsInfosByScoreTop.forEach(
//            function(a_friend, index)
//            {
//                if (self.m_MapFriendRoleIdToSelect[a_friend.getRoleId()]){
//                    targetUserArr.push(a_friend.getID());
//                    cc.log("send uid = " + a_friend.getID());
//                }
//            }
//        );
        return targetUserArr;
    },

    _btnSendCallback : function(){
        cc.log("_btnSendCallback");
        var self = this;
        cc.AudioMng.getInstance().playButtonSound(true);
        var sendGiftCallBack = function()
        {
        };
		var myScene = cc.GUIShop.getInstance().getWindow().getParent();
        if (Defines._NeedPayConfirm())
        {
            cc.GUIBuyPrompt.getInstance().openWindow(myScene, this.m_ShopData);
        }
        else
        {
            _Pay_ByRMB(this.m_ShopData);
        }

//        cc.NodeSelf.getInstance().asyncGiveFriendMarketGift(targetUserArr, this.m_ShopData.ID, sendGiftCallBack);

        this.closeWindow();
    },
    //------------------------------------------------------------------------------------------------------------------
    _giveGift: function(sender)
    {
        var cellIndx = sender.getTag();
		cc.AudioMng.getInstance().playButtonSound(true);
        cc.log("_giveGift cellIndx = " + cellIndx);

        var friendInfo = this.m_FriendsInfosByScoreTop[cellIndx];
        if (friendInfo)
        {
//            this.m_MapFriendRoleIdToSelect[friendInfo.getRoleId()] = true;
            if (this.m_curSelectRoleID != friendInfo.getID()){
                if (this.m_curSelectRoleID != -1){
                    var lastIndex = this.m_MapFriendRoleIdToPos[this.m_curSelectRoleID];
                    cc.log("更新之前的 = " + lastIndex);
                    this.m_curSelectRoleID = friendInfo.getID();
                    this.m_FriendTableView.updateCellAtIndex(lastIndex);
                }
                else {
                    this.m_curSelectRoleID = friendInfo.getID();
                }
                cc.log("更新 = " + cellIndx + " ID = " + this.m_curSelectRoleID);
                this.m_FriendTableView.updateCellAtIndex(cellIndx);
            }

            if (!this.have_send_friend){
                this.have_send_friend = true;
                this.btn_Send.setVisible(this.have_send_friend);
                this.btn_Send_grey.setVisible(!this.have_send_friend);
            }
        }
        else
        {
            ////cc.log("cellIndx = " + cellIndx);
        }

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
        this.m_MyCellsBuilder.buildCell(cell, idx, this._giveGift,  this);

        //
        var friendInfo = this.m_FriendsInfosByScoreTop[idx];
        if (!friendInfo)
        {
            //cc.log("没有好友信息? = " + idx);
            return cell;
        }

        var selectFlag = false;
        if (this.m_curSelectRoleID == friendInfo.getID()){
            selectFlag = true;
        }

        //
        this.m_MyCellsBuilder.decorateCell(cell, idx, friendInfo, selectFlag);//this.m_MapFriendRoleIdToSelect[friendInfo.getRoleId()]);

        return cell;
    },
    //------------------------------------------------------------------------------------------------------------------
    reloadFriendsDatas: function()
    {
        var self = this;

        this.m_FriendsInfosByScoreTop = FriendsMng.getInstance().getFriendsInfos().concat();

        //
        this.m_MapFriendRoleIdToPos = {};

        //
//        //按着分数大小排列
//        this.m_FriendsInfosByScoreTop.sort(
//            function(left, right)
//            {
//                var leftScore = left.getGameLevelScore(self.getCurGameLevel());
//                var rightScore = right.getGameLevelScore(self.getCurGameLevel());
//                return leftScore > rightScore ? -1 : 1;
//            }
//        );

        //
        this.m_FriendsInfosByScoreTop.forEach(
            function(a_friend, index)
            {
                self.m_MapFriendRoleIdToPos[a_friend.getID()] = index;
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
        this.m_FriendTableView.setPosition(cc.p(30 * Defines.BASE_SCALE, 128 * Defines.BASE_SCALE));
        this.m_FriendTableView.setDelegate(this);
        this.m_FriendTableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);

        //
        this.m_FriendTableView.reloadData();
        this.m_FriendTableView.setTouchEnabled(true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, shopData)
    {
        this._super(render);
        this.getWindow().removeAllChildren(true);

        cc.ResourceMng.getInstance().addToCache(
            Resource._GUIShop_plist,
            Resource._GUIShop_png);

        this.m_MapFriendRoleIdToSelect = {};
        this.m_curSelectRoleID = -1;

        this.m_MyCellsBuilder = new MyFriendsGift_CellBuilder(
            cc.size(422 * Defines.BASE_SCALE, 82 * Defines.BASE_SCALE)
        );
        //
        this.m_TabIndex = -1;
        this.have_send_friend = false;
        this.m_ShopData = shopData;
        this.addContent();

        this.reloadFriendsTableView();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();
		cc.AudioMng.getInstance().playCloseWindow();
        this.getWindow().removeAllChildren(true);

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});


cc.GUIShopSendGift._instance = null;
cc.GUIShopSendGift.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIShopSendGift();
        this._instance.init();
    }

    return this._instance;
};