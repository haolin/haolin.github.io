/**
 * Created by hong.zhang on 2014/7/3.
 */

//======================================================================================================================
var GUIIAskHelpKakao_CellBuilder = cc.Class.extend({

    //
    CELL_CONTENT_TAG:
    {
        INVITE_TIME: 555,       //cd时间
        INVITE_DISABLE: 666,
        INVITE_PHOTO: 888,     //头像
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
        return GUIIAskHelpKakao_CellBuilder.prototype;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "GUIIAskHelpKakao_CellBuilder";
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
        var labelTxt = cc.LabelTTF.create(Resource.KoreanTxt["ask_help"], Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        cell.addChild(labelTxt);
        labelTxt.setAnchorPoint(cc.p(0, 1));
        labelTxt.setPosition(cc.p(90 * Defines.BASE_SCALE, cellHeight/2 - 7 * Defines.BASE_SCALE));

        //邀请按钮
        var button = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("map_btn_askhelp_nor.png"),
            cc.Sprite.createWithSpriteFrameName("map_btn_askhelp_sel.png"),
            buttonCallBack,
            target);
        button.setScale(0.8)
        button.setTag(idx);

        //
        var menu = cc.Menu.create(button);
        cell.addChild(menu, 1000, this._static().CELL_CONTENT_TAG.INVITE_BUTTON);
        menu.setPosition(cc.p(0, 0));
        button.setAnchorPoint(cc.p(1, 0.5));
        button.setPosition(cc.p(cellWidth, cellHeight/2));
//        button.setVisible(false);

//        var spriteDisabled = cc.Sprite.createWithSpriteFrameName("map_btn_askhelp_disabled.png");
//        spriteDisabled.setAnchorPoint(cc.p(1, 0.5));
//        spriteDisabled.setPosition(cc.p(cellWidth, cellHeight/2));
//        spriteDisabled.setScale(0.8);
////        spriteDisabled.setVisible(true);
//        cell.addChild(spriteDisabled,1000,this._static().CELL_CONTENT_TAG.INVITE_DISABLE);

        //分割线
        var spriteFenge = cc.Sprite.create(_GUIPath + "GUINewGeneral/fenge_line.png");
        cell.addChild(spriteFenge);
        spriteFenge.setAnchorPoint(cc.p(0.5,0.5));
        spriteFenge.setPosition(cc.p(cellWidth/2,cellHeight));
        spriteFenge.setScaleX(0.95);

        //剩余时间
        var timeLabel = GUI.createNumberLabel("00:00", _GUIPath + "Num/num_0_10x10.png", 10, 10, "0");
        timeLabel.setAnchorPoint(cc.p(1, 0.5));
        timeLabel.setPosition(cc.p(cellWidth-5*Defines.BASE_SCALE, cellHeight/2));
        cell.addChild(timeLabel, 1000, this._static().CELL_CONTENT_TAG.INVITE_TIME);

        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    decorateCell: function(cell, idx, friendInfo)
    {
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.INVITE_NAME).setString(friendInfo.getName());

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

        var leftTime = friendInfo.getHelpTime() - _ServerTime();

        cc.log("friendInfo.getHelpTime()" + friendInfo.getHelpTime());

        cc.log("_LocalTime()" + _ServerTime());

        cc.log("leftTime" + leftTime);

        cell.getChildByTag(this._static().CELL_CONTENT_TAG.INVITE_BUTTON).setVisible(leftTime <= 0);

        cell.getChildByTag(this._static().CELL_CONTENT_TAG.INVITE_TIME).setVisible(leftTime > 0);

        var timeLabel = cell.getChildByTag(this._static().CELL_CONTENT_TAG.INVITE_TIME);



        timeLabel.setString(Tools.convertSecondTimeEx(leftTime.toString(), true, true, true));
        var self = this;
        cell.schedule(
            function()
            {
                cc.log("leftTime:" + leftTime);
                --leftTime;
                if (leftTime < 0)
                {

                    leftTime = 0;
                }

                if (leftTime <= 0)
                {

                    cell.unscheduleAllCallbacks();

//                    friendInfo.setAskHeartTime(0);

                    cell.getChildByTag(self._static().CELL_CONTENT_TAG.INVITE_BUTTON).setVisible(true);

                    timeLabel.setVisible(false);

                }
                else
                {
                    //
                    cell.getChildByTag(self._static().CELL_CONTENT_TAG.INVITE_BUTTON).setVisible(false);

                    timeLabel.setVisible(true);
                    timeLabel.setString(Tools.convertSecondTimeEx(leftTime, true, true, true));
//                    timeLabel.setString("0000000");
                }
            },
            1);

        //TODO 头像
        return cell;
    }

});




//======================================================================================================================
cc.GUIAskHelpKakao = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        //
        this.m_BackGround = null;
        this.m_AskHeartTableView = null;
        this.m_MyCellsBuilder = null;

        //数据
        this.m_data = cc.GUIAskHelpKakaoData.getInstance();

    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return cc.GUIAskHelpKakao.description();
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
//        return FriendsMng.getInstance().getFriendsInContactList().length;
//        return 10;
        return this.m_data.getFriendsInfo().length;
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

        this.m_MyCellsBuilder.buildCell(cell, idx, this._btnAskHeart, this);

        //
//        var data = FriendsMng.getInstance().getFriendsInContactList()[idx];
        var data = this.m_data.getFriendsInfo()[idx];
        if (data)
        {
            this.m_MyCellsBuilder.decorateCell(cell, idx, data);
        }

        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnAskHeart: function(sender)
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        cc.log("sender.getTag() = " + sender.getParent().getParent().getIdx());

        var nUId = this.m_data.getFriendsInfo()[sender.getParent().getParent().getIdx()].getID();
        cc.log("_btnAskHeart nUId:" + nUId);

//        var arr = new Array();
//        arr.push(nUId);
        FriendsMng.getInstance().begHelpToFriends([nUId], cc.GUIMapMng.getInstance().getMaxProcessMapZoneID());
        KakaoJoyInterface.getInstance().sendMessageForAskHelp(nUId);
//        this.m_AskHeartTableView.reloadData();
        sender.setVisible(false);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addTableView: function()
    {
        this.m_AskHeartTableView = cc.TableView.create(this, cc.size(410 * Defines.BASE_SCALE, 310 * Defines.BASE_SCALE));
        this.m_AskHeartTableView.setTouchPriority(cc.MENU_HANDLER_PRIORITY);
        this.m_BackGround.addChild(this.m_AskHeartTableView, 1000);

        //
        this.m_AskHeartTableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.m_AskHeartTableView.setPosition(cc.p(25 * Defines.BASE_SCALE, 45 * Defines.BASE_SCALE));
        this.m_AskHeartTableView.setDelegate(this);
        this.m_AskHeartTableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.m_AskHeartTableView.reloadData();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 100));
        this.getWindow().addChild(blockLayer, -1);

        this.m_BackGround = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back1.png");
        this.getWindow().addChild(this.m_BackGround);
        this.m_BackGround.setAnchorPoint(cc.p(0.5,0.5));
        this.m_BackGround.setPosition(cc.p(_ScreenWidth()/2,_ScreenHeight()/2));

        //好友的背景板
        var backCenter = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back12.png");
        this.m_BackGround.addChild(backCenter);
        backCenter.setPosition(
            cc.p(this.m_BackGround.getContentSize().width/2,
                    this.m_BackGround.getContentSize().height/2 - 40*Defines.BASE_SCALE)
        );

        //不知道是什么意思的文字
        var spriteUpTxt = cc.Sprite.createWithSpriteFrameName("map_label_askhelp.png");
        this.m_BackGround.addChild(spriteUpTxt);
        spriteUpTxt.setScale(0.9);
        spriteUpTxt.setPosition(cc.p(this.m_BackGround.getContentSize().width/2,
                this.m_BackGround.getContentSize().height - 53*Defines.BASE_SCALE));

        //
        GUI._AddCloseButton(this.m_BackGround, this.closeWindow, this);

        //
        this.addTableView();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    reloadTableView: function()
    {
        this.m_AskHeartTableView.reloadData();
    },


    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);
        //
        cc.AudioMng.getInstance().playOpenWindow();
        this.getWindow().removeAllChildren(true);

        //
        this.m_MyCellsBuilder = new GUIIAskHelpKakao_CellBuilder(cc.size(410 * Defines.BASE_SCALE, 310/4 * Defines.BASE_SCALE));
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
cc.GUIAskHelpKakao.description = function()
{
    return "GUIAskHelpKakao";
};

//======================================================================================================================
cc.GUIAskHelpKakao._instance = null;
cc.GUIAskHelpKakao.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIAskHelpKakao();
        this._instance.init();
    }

    return this._instance;
};


//======================================================================================================================
cc.GUIAskHelpKakaoData = cc.Class.extend({

//------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {

        //好友的信息列表
        this.m_arrFriendsInfo = null;

    },

    init: function()
    {
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
            var tElement = {name: "임광근" + i.toString()};

            this.m_arrFriendsInfo.push(tElement);
        }

    },

//------------------------------------------------------------------------------------------------------------------
    getFriendsInfo: function()
    {
        this.m_arrFriendsInfo = null;

        this.m_arrFriendsInfo = FriendsMng.getInstance().getFriendsInfos();
        return this.m_arrFriendsInfo;
    },

    setFriendsInfo: function( arrInfo )
    {
        this.m_arrFriendsInfo = null;
        this.m_arrFriendsInfo = Tools.clone(arrInfo);
    }

//------------------------------------------------------------------------------------------------------------------
});

cc.GUIAskHelpKakaoData._instance = null;
cc.GUIAskHelpKakaoData.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIAskHelpKakaoData();
        this._instance.init();
    }

    return this._instance;
};