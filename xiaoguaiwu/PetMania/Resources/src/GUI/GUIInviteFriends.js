 //======================================================================================================================
var GUIInvite_CellBuilder = cc.Class.extend({

    //
    CELL_CONTENT_TAG:
    {
        INVITE_NAME: 999,      //名字
        INVITE_BUTTON: 1000    //邀请按钮
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(cellSize)
    {
        this.m_CellSize = cellSize || cc.size(10 * Defines.BASE_SCALE, 10 * Defines.BASE_SCALE);
    },

    //------------------------------------------------------------------------------------------------------------------
    _static: function()
    {
        return GUIInvite_CellBuilder.prototype;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "GUIInvite_CellBuilder";
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

        //邮件内容的label
        var nameLab = cc.LabelTTF.create("", Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        cell.addChild(nameLab, 0, this._static().CELL_CONTENT_TAG.INVITE_NAME);
        nameLab.setAnchorPoint(cc.p(0, 0));
        nameLab.setPosition(cc.p(30 * Defines.BASE_SCALE, 20 * Defines.BASE_SCALE));

        //信件内容的收取按钮
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
        button.setAnchorPoint(cc.p(0, 0));
        button.setPosition(cc.p(300 * Defines.BASE_SCALE, -5 * Defines.BASE_SCALE));

        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    decorateCell: function(cell, idx, mailInfo)
    {
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.INVITE_NAME).setString(mailInfo.getName());
        return cell;
    }

});




//======================================================================================================================
cc.GUIInviteFriends = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        //
        this.m_BackGround = null;
        this.m_InviteTableView = null;
        this.m_MyCellsBuilder = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return cc.GUIInviteFriends.description();
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
        cc.log("cell touched at index: " + cell.getIdx());
    },

    //------------------------------------------------------------------------------------------------------------------
    cellSizeForTable:function (/*table*/)
    {
        return this.m_MyCellsBuilder.getCellSize();
    },

    //------------------------------------------------------------------------------------------------------------------
    numberOfCellsInTableView:function (/*table*/)
    {
        return FriendsMng.getInstance().getFriendsInContactList().length;
    },

    //------------------------------------------------------------------------------------------------------------------
    tableCellAtIndex:function (table, idx)
    {
        //
        var cell = table.dequeueCell();
        if (!cell)
        {
            //没有就制造新的 
            cell = new cc.TableViewCell();
        }

        this.m_MyCellsBuilder.buildCell(cell, idx, this._inviteFriend, this);

        //
        var data = FriendsMng.getInstance().getFriendsInContactList()[idx];
        if (data)
        {
            this.m_MyCellsBuilder.decorateCell(cell, idx, data);
        }

        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    _inviteFriend: function(sender)
    {
        cc.log("sender.getTag() = " + sender.getTag());

        //
        var data = FriendsMng.getInstance().getFriendsInContactList()[sender.getTag()];
        if (data)
        {
            //cc.log("\n");    cc.log("\n");cc.log("\n");cc.log("\n");
            //cc.log("邀请!!!!! = " + data.getName());
            FriendsMng.getInstance().inviteFriendByName(data.getName());
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addTableView: function()
    {
        this.m_InviteTableView = cc.TableView.create(this, cc.size(410 * Defines.BASE_SCALE, 266 * Defines.BASE_SCALE));
        this.m_InviteTableView.setTouchPriority(cc.MENU_HANDLER_PRIORITY);
        this.m_BackGround.addChild(this.m_InviteTableView, 1000);
        this.m_InviteTableView.setPosition(cc.p(40 * Defines.BASE_SCALE, 107 * Defines.BASE_SCALE));

        //
        this.m_InviteTableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.m_InviteTableView.setPosition(cc.p(25 * Defines.BASE_SCALE, 30 * Defines.BASE_SCALE));
        this.m_InviteTableView.setDelegate(this);
        this.m_InviteTableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.m_InviteTableView.reloadData();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        this.m_BackGround = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back2.png");
        this.getWindow().addChild(this.m_BackGround);
        this.m_BackGround.setPosition(_ScreenCenter());

        //好友的背景板
        var backCenter = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back3.png");
        this.m_BackGround.addChild(backCenter);
        backCenter.setPosition(
            cc.p(this.m_BackGround.getContentSize().width/2,
                this.m_BackGround.getContentSize().height/2 - 30 * Defines.BASE_SCALE)
        );

        //
        GUI._AddCloseButton(this.m_BackGround, this.closeWindow, this);

        //
        this.addTableView();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);

        //
        cc.AudioMng.getInstance().playOpenWindow();
        this.getWindow().removeAllChildren(true);

        //
        this.m_MyCellsBuilder = new GUIInvite_CellBuilder(cc.size(410 * Defines.BASE_SCALE, 266/4 * Defines.BASE_SCALE));
        this.addContent();

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
});

//======================================================================================================================
cc.GUIInviteFriends.description = function()
{
    return "GUIInviteFriends";
};

//======================================================================================================================
cc.GUIInviteFriends._instance = null;
cc.GUIInviteFriends.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIInviteFriends();
        this._instance.init();

        //
        var self = this;
        FriendsMng.getInstance().registerEvent(
            _FRIENDS_MNG_EVENT.GET_FRIENDS_IN_CONTACT_LIST_SUCC,
            function()
            {
                self._instance.openWindow();
            });
    }

    return this._instance;
};