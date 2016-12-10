//----------------------------------------------------------------------------------------------------------------------
var GUIRecommend_CellBuilder = cc.Class.extend({

    //
    CELL_CONTENT_TAG:
    {
        RECOM_PHOTO: 999,            //头像
        RECOM_NAME: 1000,     //名字
        RECOM_VIP: 1001,     //加V标志
        RECOM_ADDRESS: 1002,     //地域
        RECOM_FOLLOW: 1003,     //粉丝数
        RECOM_LEVEL: 1004,     //关数
        RECOM_SCORE: 1005,     //分数
        RECOM_BUTTON: 1007,           //关注按钮
        RECOM_BUTTON_TXT: 1008     //好友内容总
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(cellSize)
    {
        this.m_CellSize = cellSize || cc.size(10 * Defines.BASE_SCALE, 20 * Defines.BASE_SCALE);
    },

    //------------------------------------------------------------------------------------------------------------------
    _static: function()
    {
        return GUIRecommend_CellBuilder.prototype;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "GUIRecommend_CellBuilder";
    },

    //------------------------------------------------------------------------------------------------------------------
    getCellSize: function()
    {
        return this.m_CellSize;
    },

    //------------------------------------------------------------------------------------------------------------------
    buildCell: function(cell, idx, buttonCallBack, target)
    {
        cell.removeAllChildren(true);

        //照片头像
        var friendPhoto = cc.Sprite.createWithSpriteFrameName("general_default_photo.png");
        cell.addChild(friendPhoto, 0, this._static().CELL_CONTENT_TAG.RECOM_PHOTO);
        friendPhoto.setAnchorPoint(cc.p(0, 0));
        friendPhoto.setPosition(cc.p(10 * Defines.BASE_SCALE, 10 * Defines.BASE_SCALE));
        friendPhoto.setScale(1.3);

        //好友信息的label
        var height_1 = 70 * Defines.BASE_SCALE;

        var begin_width = 90 * Defines.BASE_SCALE;
        //load scores
//        var loading = cc.LabelTTF.create("loading...", Defines.DefaultFont, 14 * Defines.BASE_SCALE);
//        cell.addChild(loading, 0, this._static().CELL_CONTENT_TAG.LOAD);
//        loading.setAnchorPoint(cc.p(0.5, 0.5));
//        loading.setPosition(cc.p(110 * Defines.BASE_SCALE, 50 * Defines.BASE_SCALE));
        var recomContentName = cc.LabelTTF.create("loading..", Defines.DefaultFont, 16 * Defines.BASE_SCALE);
        cell.addChild(recomContentName, 0, this._static().CELL_CONTENT_TAG.RECOM_NAME);
        recomContentName.setAnchorPoint(cc.p(0, 0));
        recomContentName.setPosition(cc.p(begin_width, height_1));

        var recomContentVIP = cc.Sprite.createWithSpriteFrameName("general_icon_renzheng.png");
        cell.addChild(recomContentVIP, 0, this._static().CELL_CONTENT_TAG.RECOM_VIP);
        recomContentVIP.setAnchorPoint(cc.p(0, 0));
        recomContentVIP.setPosition(cc.p(begin_width + 110 * Defines.BASE_SCALE, height_1));
        recomContentVIP.setVisible(false);

        var recomContentADDR = cc.LabelTTF.create("", Defines.DefaultFont, 16 * Defines.BASE_SCALE);
        cell.addChild(recomContentADDR, 0, this._static().CELL_CONTENT_TAG.RECOM_ADDRESS);
        recomContentADDR.setAnchorPoint(cc.p(0, 0));
        recomContentADDR.setPosition(cc.p(begin_width + 140 * Defines.BASE_SCALE, height_1));

        var height_2 = 40 * Defines.BASE_SCALE;
        var recomContentFOLLOWtext = cc.LabelTTF.create("粉丝", Defines.DefaultFont, 16 * Defines.BASE_SCALE);
        cell.addChild(recomContentFOLLOWtext);
        recomContentFOLLOWtext.setAnchorPoint(cc.p(0, 0));
        recomContentFOLLOWtext.setPosition(cc.p(begin_width, height_2));

        var recomContentFOLLOW = cc.LabelTTF.create("", Defines.DefaultFont, 16 * Defines.BASE_SCALE);
        cell.addChild(recomContentFOLLOW, 0, this._static().CELL_CONTENT_TAG.RECOM_FOLLOW);
        recomContentFOLLOW.setAnchorPoint(cc.p(0, 0));
        recomContentFOLLOW.setPosition(cc.p(begin_width + 50 * Defines.BASE_SCALE, height_2));

        var height_3 = 10 * Defines.BASE_SCALE;
        var recomContentLEVEL = cc.LabelTTF.create("", Defines.DefaultFont, 16 * Defines.BASE_SCALE);
        cell.addChild(recomContentLEVEL, 0, this._static().CELL_CONTENT_TAG.RECOM_LEVEL);
        recomContentLEVEL.setAnchorPoint(cc.p(0, 0));
        recomContentLEVEL.setPosition(cc.p(begin_width, height_3));

        var recomContentLEVELtext = cc.LabelTTF.create("关", Defines.DefaultFont, 16 * Defines.BASE_SCALE);
        cell.addChild(recomContentLEVELtext);
        recomContentLEVELtext.setAnchorPoint(cc.p(0, 0));
        recomContentLEVELtext.setPosition(cc.p(begin_width + 30 * Defines.BASE_SCALE, height_3));

        var recomContentSCOREtext = cc.LabelTTF.create("总分：", Defines.DefaultFont, 16 * Defines.BASE_SCALE);
        cell.addChild(recomContentSCOREtext, 0);
        recomContentSCOREtext.setAnchorPoint(cc.p(0, 0));
        recomContentSCOREtext.setPosition(cc.p(begin_width + 70 * Defines.BASE_SCALE, height_3));

        var recomContentSCORE = cc.LabelTTF.create("", Defines.DefaultFont, 16 * Defines.BASE_SCALE);
        cell.addChild(recomContentSCORE, 0, this._static().CELL_CONTENT_TAG.RECOM_SCORE);
        recomContentSCORE.setAnchorPoint(cc.p(0, 0));
        recomContentSCORE.setPosition(cc.p(begin_width + 120 * Defines.BASE_SCALE, height_3));

        //关注按钮
        var button = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_guanzhu_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_guanzhu_sel.png"),
            buttonCallBack,
            target);

        button.setTag(idx);

        //
        var menu = cc.Menu.create(button);
        cell.addChild(menu, 1000, this._static().CELL_CONTENT_TAG.RECOM_BUTTON);
        menu.setPosition(cc.p(0, 0));
        button.setAnchorPoint(cc.p(0, 0));
        button.setPosition(cc.p(320 * Defines.BASE_SCALE, 0));//-5

        var recomContentButtontext = cc.LabelTTF.create("已关注", Defines.DefaultFont, 16 * Defines.BASE_SCALE);
        cell.addChild(recomContentButtontext, 0, this._static().CELL_CONTENT_TAG.RECOM_BUTTON_TXT);
        recomContentButtontext.setAnchorPoint(cc.p(0, 0));
        recomContentButtontext.setPosition(cc.p(340 * Defines.BASE_SCALE, height_2));
        //
        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    decorateCellPhoto: function(cell, idx, recomInfo)
    {
        if (!recomInfo)
        {
            return cell;
        }

        if (!recomInfo || recomInfo.getVatar() == "")
        {
            return cell;
        }

        //

        var photo =  cc.Sprite.create(recomInfo.getVatar());
        if (!photo)
        {
            return cell;
        }

        //
        var defaultPhoto = cell.getChildByTag(this._static().CELL_CONTENT_TAG.RECOM_PHOTO);
        defaultPhoto.removeAllChildren(true);

        //
        defaultPhoto.addChild(photo);
        photo.setScaleX(defaultPhoto.getContentSize().width/photo.getContentSize().width);
        photo.setScaleY(defaultPhoto.getContentSize().height/photo.getContentSize().height);
        photo.setPosition(
            cc.p(defaultPhoto.getContentSize().width/2,
                defaultPhoto.getContentSize().height/2)
        );

        return cell;
    },
    //------------------------------------------------------------------------------------------------------------------
    decorateCell: function(cell, idx, recomInfo)
    {
        //

        this.decorateCellPhoto(cell, idx, recomInfo);
        //
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.RECOM_NAME).setString(recomInfo.getName());

        cell.getChildByTag(this._static().CELL_CONTENT_TAG.RECOM_VIP).setVisible(recomInfo.getIsVerified());

        cell.getChildByTag(this._static().CELL_CONTENT_TAG.RECOM_ADDRESS).setString(recomInfo.getLocation());

        cell.getChildByTag(this._static().CELL_CONTENT_TAG.RECOM_FOLLOW).setString(recomInfo.getFollowCount());

        cell.getChildByTag(this._static().CELL_CONTENT_TAG.RECOM_LEVEL).setString(recomInfo.getLevel());

        cell.getChildByTag(this._static().CELL_CONTENT_TAG.RECOM_SCORE).setString(recomInfo.getScores());

        if (recomInfo.getFollowFlag()){
            cell.getChildByTag(this._static().CELL_CONTENT_TAG.RECOM_BUTTON_TXT).setVisible(true);
            cell.getChildByTag(this._static().CELL_CONTENT_TAG.RECOM_BUTTON).setVisible(false);
        }
        else {
            cell.getChildByTag(this._static().CELL_CONTENT_TAG.RECOM_BUTTON_TXT).setVisible(false);
            cell.getChildByTag(this._static().CELL_CONTENT_TAG.RECOM_BUTTON).setVisible(true);
        }

        return cell;
    }

});

//======================================================================================================================
cc.GUIRecommend = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        //
        this.m_RecomBackGround = null;
        this.m_RecomTableView = null;
        this.m_MapFriendRoleIdToPos = {};
        //
        this.m_MyCellsBuilder = null;

        this.m_tableSize = cc.size(0,0);
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return cc.GUIRecommend.description();
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function ()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    scrollViewDidScroll: function(view)
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    scrollViewDidZoom: function(view)
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    tableCellTouched:function (table, cell)
    {
        cc.log("cell touched at index: " + cell.getIdx());
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cellSizeForTable:function ()
    {
        return this.m_MyCellsBuilder.getCellSize();
    },

    //------------------------------------------------------------------------------------------------------------------
    numberOfCellsInTableView:function ()
    {
		var RecomsList = RecomMng.getInstance().getRecomsList();
        return RecomsList.length;
//        return MailMng.getInstance().getMailsList().length;
    },

    //------------------------------------------------------------------------------------------------------------------
    tableCellAtIndex: function(table, idx)
    {
        //
        var cell = table.dequeueCell();
        if (!cell)
        {
            //没有就制造新的 
            cell = new cc.TableViewCell();
        }
        //
        this.m_MyCellsBuilder.buildCell(cell, idx, this._buttonCallBack, this);
        //
        var RecomsList = RecomMng.getInstance().getRecomsList();
        var a_recom = RecomsList[idx];

        if (a_recom)
        {
            this.m_MyCellsBuilder.decorateCell(cell, idx, a_recom);
        }

        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    _buttonCallBack: function(sender)
    {
        cc.log("_buttonCallBack = " + sender.getTag());

        var a_commend = RecomMng.getInstance().getRecomsList()[sender.getTag()];
        if (a_commend)
        {
            RecomMng.getInstance().followUser(a_commend);
        }

        return this;
    },

//    //------------------------------------------------------------------------------------------------------------------
//    _buttonPickAll: function()
//    {
////        MailMng.getInstance().pickAll();
//        this.closeWindow();
//        return this;
//    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 128));
        this.getWindow().addChild(blockLayer, -1);

        //大背景
        this.m_RecomBackGround = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back1.png");
        this.getWindow().addChild(this.m_RecomBackGround);
        this.m_RecomBackGround.setPosition(_ScreenCenter());

        //好友的背景板
        var backCenter = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back12.png");
        this.m_RecomBackGround.addChild(backCenter);
        backCenter.setPosition(
            cc.p(this.m_RecomBackGround.getContentSize().width/2,
                this.m_RecomBackGround.getContentSize().height/2)
        );
        //
        var titleLabel = cc.Sprite.createWithSpriteFrameName("wenzi-yiqiwanba.png");
        this.m_RecomBackGround.addChild(titleLabel);
        titleLabel.setPosition(
            cc.p(this.m_RecomBackGround.getContentSize().width/2,
                this.m_RecomBackGround.getContentSize().height - 30 * Defines.BASE_SCALE)
        );

        var fenge_line_01 = cc.Sprite.create(_GUIPath + "GUINewGeneral/fenge_line.png");
        this.m_RecomBackGround.addChild(fenge_line_01);
        fenge_line_01.setPosition(
            cc.p(this.m_RecomBackGround.getContentSize().width/2,
                this.m_RecomBackGround.getContentSize().height/2 + backCenter.getContentSize().height/6)
        );

        var fenge_line_02 = cc.Sprite.create(_GUIPath + "GUINewGeneral/fenge_line.png");
        this.m_RecomBackGround.addChild(fenge_line_02);
        fenge_line_02.setPosition(
            cc.p(this.m_RecomBackGround.getContentSize().width/2,
                this.m_RecomBackGround.getContentSize().height/2 - backCenter.getContentSize().height/6)
        );

        //
        GUI._AddCloseButton(this.m_RecomBackGround, this.closeWindow, this);

        //
        this.loadRecomTableView();

        //
//        var buttonPickAll = cc.MenuItemSprite.create(
//            cc.Sprite.createWithSpriteFrameName("general_button_pickall_nor.png"),
//            cc.Sprite.createWithSpriteFrameName("general_button_pickall_sel.png"),
//            this._buttonPickAll,
//            this);
        //
//        var itemMenu = cc.Menu.create(buttonPickAll);
//        itemMenu.setPosition(cc.p(0, 0));
//        this.m_MailBackGround.addChild(itemMenu, 10000);
//        buttonPickAll.setPosition(
//            cc.p(this.m_MailBackGround.getContentSize().width/2,
//                43 * Defines.BASE_SCALE));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    loadRecomTableView: function()
    {
        //
        var self = this;
        this.m_MapFriendRoleIdToPos = {};
        var recomList = RecomMng.getInstance().getRecomsList();

        recomList.forEach(
            function(a_friend, index)
            {
				cc.log("self.m_MapFriendRoleIdToPos[a_friend.getRoleId()] = " + a_friend.getRoleId());
                self.m_MapFriendRoleIdToPos[a_friend.getRoleId()] = index;
            }
        );

        var backCenter = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back12.png");
        this.m_RecomTableView = cc.TableView.create(this,
            cc.size(backCenter.getContentSize().width,
                backCenter.getContentSize().height - 30 * Defines.BASE_SCALE));

        //cc.size(410 * Defines.BASE_SCALE, 340 * Defines.BASE_SCALE));
        this.m_RecomTableView.setTouchPriority(cc.MENU_HANDLER_PRIORITY);
        this.m_RecomBackGround.addChild(this.m_RecomTableView, 1000);
        this.m_RecomTableView.setPosition(
            cc.p(40 * Defines.BASE_SCALE,
                75 * Defines.BASE_SCALE));
//        cc.p(40 * Defines.BASE_SCALE, 107 * Defines.BASE_SCALE));

        //
        this.m_RecomTableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.m_RecomTableView.setDelegate(this);
        this.m_RecomTableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.m_RecomTableView.reloadData();



        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);
        var backCenter = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back12.png")
        this.m_MyCellsBuilder = new GUIRecommend_CellBuilder(cc.size(backCenter.getContentSize().width,
            (backCenter.getContentSize().height - 30 * Defines.BASE_SCALE) / 3));
        //410 * Defines.BASE_SCALE, 340/3 * Defines.BASE_SCALE));

        //
        cc.AudioMng.getInstance().playOpenWindow();
        this.updateGUI();

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyFriendsUpdate: function(recoms)
    {
        if (!this.isWindowOpen() || !this.m_RecomTableView)
        {
            return this;
        }

        //
        var self = this;
        recoms.forEach(
            function(a_recom)
            {
                var topIndex = self.m_MapFriendRoleIdToPos[a_recom.id];
                cc.log("a_recom.roleid = " + a_recom.id);
                cc.log("topIndex = " + topIndex);
                cc.log("更新 = " + a_recom);
                self.m_RecomTableView.updateCellAtIndex(topIndex);
            }
        );


        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();
        cc.AudioMng.getInstance().playCloseWindow();
        this.getWindow().removeAllChildren(true);
        if (RecomMng.getInstance().needRefresh()){
             RecomMng.getInstance().loadRecoms();
        }
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateGUI: function()
    {
        if (this.isWindowOpen())
        {
            this.getWindow().removeAllChildren(true);
            this.addContent();
        }

        return this;
    }
});

//======================================================================================================================
cc.GUIRecommend.description = function()
{
    return "GUIRecommend";
};

//======================================================================================================================
cc.GUIRecommend._instance = null;
cc.GUIRecommend.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIRecommend();
        this._instance.init();

        var self = this;
        var arr = [
            _RECOM_MNG_EVENT.RELOAD_RECOMS_FINISH,
            _RECOM_MNG_EVENT.FOLLOW_RECOM
        ];
//        var _RECOM_MNG_EVENT = {
//            RELOAD_RECOMS_FINISH: 100,
//            FOLLOW_RECOM: 300
//        };
        arr.forEach(
            function(name)
            {
                RecomMng.getInstance().registerEvent(
                    name,
                    function()
                    {
                        cc.log("_RECOM_MNG_EVENT.RELOAD_RECOMS_FINISH or _RECOM_MNG_EVENT.FOLLOW_RECOM");
                        self._instance.updateGUI();
                    },
                    null);
            }
        );

        RecomMng.getInstance().registerEvent(
            _RECOM_MNG_EVENT.LOAD_PHOTO,
            function(manager, friends)
            {
                cc.log("_RECOM_MNG_EVENT.LOAD_PHOTO start");
                self._instance.notifyFriendsUpdate(friends);
            },
            null);
    }

    return this._instance;
};