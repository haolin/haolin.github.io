//======================================================================================================================
var GUISubFriendsList_CellBuilder = cc.Class.extend({

    //
    CELL_CONTENT_TAG:
    {
        SUB_FRIEND_PHOTO: 999,
        SUB_FRIEND_NAME: 1000,
        SUB_FRIEND_GAMELEVEL: 1001,
        SUB_FRIEND_BUTTON: 1002
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(cellSize)
    {
        this.m_CellSize = cellSize || cc.size(10 * Defines.BASE_SCALE, 10 * Defines.BASE_SCALE);
    },

    //------------------------------------------------------------------------------------------------------------------
    _static: function()
    {
        return GUISubFriendsList_CellBuilder.prototype;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "GUISubFriendsList_CellBuilder";
    },

    //------------------------------------------------------------------------------------------------------------------
    getCellSize: function()
    {
        return this.m_CellSize;
    },

    //------------------------------------------------------------------------------------------------------------------
    buildCell: function(cell)
    {
        cell.removeAllChildren(true);

        var res = _GUIPath + "GUINewGeneral/general_back4.png";
        var tmp =  cc.Sprite.create(res);
        var back = cc.Scale9Sprite.create(
            res,
            cc.rect(0, 0, tmp.getContentSize().width, tmp.getContentSize().height),
            cc.rect(tmp.getContentSize().width * 0.45, tmp.getContentSize().height * 0.45, tmp.getContentSize().width * 0.1, tmp.getContentSize().height * 0.1));

        back.setContentSize(cc.size(260 * Defines.BASE_SCALE, tmp.getContentSize().height));

        //
        cell.addChild(back);
        back.setAnchorPoint(cc.p(0, 0));
        back.setPosition(cc.p(80 * Defines.BASE_SCALE, 10 * Defines.BASE_SCALE));

        //
        var photo =  cc.Sprite.createWithSpriteFrameName("general_default_photo.png");
        cell.addChild(photo, 0, this._static().CELL_CONTENT_TAG.SUB_FRIEND_PHOTO);
        photo.setPosition(cc.p(40 * Defines.BASE_SCALE, 32 * Defines.BASE_SCALE));

        //
        var name = cc.LabelTTF.create("", Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        name.setPosition(cc.p(160 * Defines.BASE_SCALE, 30 * Defines.BASE_SCALE));
        cell.addChild(name, 0, this._static().CELL_CONTENT_TAG.SUB_FRIEND_NAME);

        //
        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    decorateCell: function(cell, idx, friendInfo)
    {
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.SUB_FRIEND_NAME).setString(friendInfo.getName());

        //
        var photo = cell.getChildByTag(this._static().CELL_CONTENT_TAG.SUB_FRIEND_PHOTO);
        photo.removeAllChildren(true);

        //
        if (friendInfo.getPhotoUrl() != "")
        {
            var friendPhoto = cc.Sprite.create(friendInfo.getPhotoUrl());
            if (friendPhoto)
            {
                photo.addChild(friendPhoto);
                friendPhoto.setPosition(cc.p(photo.getContentSize().width/2, photo.getContentSize().height/2));
                friendPhoto.setScale(photo.getContentSize().width/friendPhoto.getContentSize().width);
            }
        }

        return cell;
    }
});
//======================================================================================================================
cc.GUISubFriendsList = cc.GUIWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        //
        this.m_BackGround = null;
        this.m_TableView = null;
        this.m_MyCellsBuilder = null;
        this.m_MyOperation = null;
        this.m_FindTableViewIndexFromFriendData = {};

        //
        /*this.tmp = [];
        for (var indx = 0; indx < 2; ++indx)
        {
            this.tmp.push(FriendInfo.createTest("Name" + indx, _GUIPath + "item_6.png"));
        }*/
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return cc.GUISubFriendsList.description();
    },

    //------------------------------------------------------------------------------------------------------------------
    _friends: function()
    {
        return FriendsMng.getInstance().getFriendsInfos();
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function ()
    {
        this._super();
        cc.log("GUISubFriendsList init");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(blockLayer, -1);

        //背景
        this.m_BackGround = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back2.png");
        this.getWindow().addChild(this.m_BackGround);
        this.m_BackGround.setPosition(cc.p(_ScreenCenter().x, _ScreenCenter().y));

        var backCenter = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back3.png");
        this.m_BackGround.addChild(backCenter);
        backCenter.setPosition(
            cc.p(this.m_BackGround.getContentSize().width/2,
                this.m_BackGround.getContentSize().height/2 - 30 * Defines.BASE_SCALE)
        );

        //
        GUI._AddCloseButton(this.m_BackGround, this._btnCloseCallback, this);

        //
        var spriteTitle = cc.Sprite.createWithSpriteFrameName("general_label_ask_help.png");
        this.m_BackGround.addChild(spriteTitle);
        spriteTitle.setPosition(
            cc.p(this.m_BackGround.getContentSize().width/2,
                this.m_BackGround.getContentSize().height - 40 * Defines.BASE_SCALE)
        );

        //
        this._addTableView();

        //
        var havePopup = cc.GUIAskFriendForHeart.getInstance().isWindowOpen();
        if (havePopup)
        {
            blockLayer.setVisible(false);
            this.m_BackGround.setPositionX(_ScreenWidth() + this.m_BackGround.getContentSize().width);
            this.m_BackGround.runAction(
                cc.MoveTo.create(0.15,  cc.p(_ScreenWidth()/2 + 235 * Defines.BASE_SCALE, _ScreenHeight()/2)));
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _addTableView: function()
    {
        this.m_FindTableViewIndexFromFriendData = {};

        //
        this.m_TableView = cc.TableView.create(this, cc.size(430 * Defines.BASE_SCALE, 270 * Defines.BASE_SCALE));
        this.m_TableView.setTouchPriority(cc.MENU_HANDLER_PRIORITY);
        this.m_BackGround.addChild(this.m_TableView);

        //
        this.m_TableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.m_TableView.setPosition(cc.p(25 * Defines.BASE_SCALE, 30 * Defines.BASE_SCALE));
        this.m_TableView.setDelegate(this);
        this.m_TableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.m_TableView.reloadData();

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
    tableCellTouched: function(table, cell)
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    cellSizeForTable: function(table)
    {
        return this.m_MyCellsBuilder.getCellSize();
    },

    //------------------------------------------------------------------------------------------------------------------
    numberOfCellsInTableView: function(table)
    {
        return this._friends().length;
    },

    //------------------------------------------------------------------------------------------------------------------
    tableCellAtIndex: function (table, idx)
    {
        //
        var cell = table.dequeueCell();
        if (!cell)
        {
            //没有就制造新的?
            cell = new cc.TableViewCell();
        }

        //
        this.m_MyCellsBuilder.buildCell(cell, idx);

        //
        var friendInfo = this._friends()[idx];
        if (friendInfo)
        {
            this.m_FindTableViewIndexFromFriendData[friendInfo.getRoleId()] = idx;
            this.m_MyCellsBuilder.decorateCell(cell, idx, friendInfo, table);

            //
            if (this.m_MyOperation)
            {
                this.m_MyOperation.decorateCell(cell, idx, friendInfo, table);
            }
        }

        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyCloseWindow: function(window)
    {
        if (this.isWindowOpen() && window instanceof cc.GUIAskFriendForHeart)
        {
            this.closeWindow();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback: function()
    {
        var havePopup = cc.GUIAskFriendForHeart.getInstance().isWindowOpen();
        if (havePopup)
        {
            this.m_BackGround.runAction(cc.Sequence.create(cc.MoveTo.create(0.1,
                cc.p(_ScreenWidth() + this.m_BackGround.getContentSize().width/2, _ScreenHeight()/2)),
                cc.CallFunc.create(
                    function()
                    {
                        this.closeWindow();
                    },
                    this)
            ));
        }
        else
        {
            this.closeWindow();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, operation)
    {
        //
        this._super(render);
        cc.AudioMng.getInstance().playOpenWindow();

        //
        this.m_MyOperation = operation;
        this.m_MyCellsBuilder = new GUISubFriendsList_CellBuilder(cc.size(430 * Defines.BASE_SCALE, 270/4 * Defines.BASE_SCALE));

        //
        this.getWindow().removeAllChildren(true);
        this.addContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        //
        cc.AudioMng.getInstance().playCloseWindow();
        this.getWindow().removeAllChildren(true);

        //
        this.m_TableView = null;
        this.m_FindTableViewIndexFromFriendData = {};

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyFriendsUpdate: function(friends)
    {
        if (!this.isWindowOpen())
        {
            return this;
        }

        //this.getWindow().removeAllChildren(true);
        //this.addContent();

        var self = this;

        if (this.m_TableView)
        {
            friends.forEach(
                function(a_friend)
                {
                    var tableViewIndex = self.m_FindTableViewIndexFromFriendData[a_friend.getRoleId()];
                    self.m_TableView.updateCellAtIndex(tableViewIndex);
                }
            );
        }

        return this;
    }
});

//======================================================================================================================
cc.GUISubFriendsList.description = function()
{
    return "GUISubFriendsList";
};

//======================================================================================================================
cc.GUISubFriendsList._instance = null;
cc.GUISubFriendsList.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUISubFriendsList();
        this._instance.init();

        //
        var self = this;

        //注册一个事件
        FriendsMng.getInstance().registerEvent(
            _FRIENDS_MNG_EVENT.ASK_FRIEND_HEART_SUCC,
            function(manager, friends)
            {
                cc.log("ASK_FRIEND_HEART_SUCC 向好友要薄荷糖完成");
                friends.forEach(
                    function(a_friend)
                    {
                        cc.log("a_friend = " + a_friend);
                    }
                );

                self._instance.notifyFriendsUpdate(friends);
            },
            null);

        FriendsMng.getInstance().registerEvent(
            _FRIENDS_MNG_EVENT.ASK_FRIEND_HELP_SUCC,
            function(manager, friends)
            {
                cc.log("ASK_FRIEND_HELP_SUCC 向好友要空间站帮助完成");
                friends.forEach(
                    function(a_friend)
                    {
                        cc.log("a_friend = " + a_friend);
                    }
                );

                self._instance.notifyFriendsUpdate(friends);
            },
            null);
    }

    return this._instance;
};