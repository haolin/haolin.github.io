/**
 * Created by hong.zhang on 2014/7/2.
 */

//======================================================================================================================
var GUIIAskHeartKakao_CellBuilder = cc.Class.extend({

    //
    CELL_CONTENT_TAG:
    {
        INVITE_DISABLE:666,     //不能邀请按钮
        INVITE_TIME:777,        //CD时间
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
        return GUIIAskHeartKakao_CellBuilder.prototype;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "GUIIAskHeartKakao_CellBuilder";
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
        var labelTxt = cc.LabelTTF.create(Resource.KoreanTxt["ask_heart"], Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        cell.addChild(labelTxt);
        labelTxt.setAnchorPoint(cc.p(0, 1));
        labelTxt.setPosition(cc.p(90 * Defines.BASE_SCALE, cellHeight/2 - 7 * Defines.BASE_SCALE));

        //邀请按钮
        var button = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("btn_ask_heart_nor.png"),
            cc.Sprite.createWithSpriteFrameName("btn_ask_heart_sel.png"),
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

//        var spriteDisabled = cc.Sprite.createWithSpriteFrameName("btn_ask_heart_disabled.png");
//        spriteDisabled.setAnchorPoint(cc.p(1, 0.5));
//        spriteDisabled.setPosition(cc.p(cellWidth, cellHeight/2));
//        spriteDisabled.setScale(0.8);
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
        cc.log("func decorateCell, idx:" + idx);
        cc.log("firendInfo.getName():" + friendInfo.getName());
        cc.log(null == cell);
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.INVITE_NAME).setString(friendInfo.getName());

        var photoUrl = friendInfo.getPhotoUrl();

        if (photoUrl != "")
        {
            cc.log("没有照片" );
            var friendPhotoImg =  cc.Sprite.create(photoUrl);
//            return this;
        }



        if (friendPhotoImg)
        {
            cc.log("照片地址不对?? = " + photoUrl);
            var friendPhoto = cc.Sprite.create(photoUrl);

//            return this;
        }
        else
        {
            cc.log("照片地址不对?? = " + photoUrl);
            var friendPhoto = cc.Sprite.createWithSpriteFrameName("general_default_photo_1.png");
        }

        var photoFrame = cell.getChildByTag(this._static().CELL_CONTENT_TAG.INVITE_PHOTO);
        photoFrame.removeAllChildren();

        friendPhoto.setPosition(cc.p(photoFrame.getContentSize().width/2,photoFrame.getContentSize().height/2));
        friendPhoto.setScale(photoFrame.getContentSize().width > friendPhoto.getContentSize().width?
            1.0: photoFrame.getContentSize().width/friendPhoto.getContentSize().width);
        photoFrame.addChild(friendPhoto);

        var leftTime = friendInfo.getAskHeartTime() - _ServerTime();
//        if(!leftTime)
//        {
//
//            leftTime = 0;
//        }
        cc.log("friendInfo.getAskHeartTime()" + friendInfo.getAskHeartTime());
        cc.log("_LocalTime()" + _ServerTime());
        cc.log("leftTime" + leftTime);
//        leftTime = 100000000;

        cell.getChildByTag(this._static().CELL_CONTENT_TAG.INVITE_BUTTON).setVisible(leftTime <= 0);
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.INVITE_TIME).setVisible(leftTime > 0);
//                cell.getChildByTag(this._static().CELL_CONTENT_TAG.INVITE_BUTTON).setVisible(true);
//        cell.getChildByTag(this._static().CELL_CONTENT_TAG.INVITE_TIME).setVisible(false);

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
//        cell.getChildByTag(this._static().CELL_CONTENT_TAG.INVITE_TIME).setVisible(friendInfo.getAskHeartTime() <= 0);
////        if(friendInfo.getAskHeartTime() >)

        return cell;
    }

});




//======================================================================================================================
cc.GUIAskHeartKakao = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        //
        this.m_BackGround = null;
        this.m_AskHeartTableView = null;
        this.m_MyCellsBuilder = null;

        //数据
        this.m_data = cc.GUIAskHeartKakaoData.getInstance();

    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return cc.GUIAskHeartKakao.description();
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
//        cc.log("func numberOfCellsInTableView");
//        return FriendsMng.getInstance().getFriendsInContactList().length;
        return this.m_data.getFriendsInfo().length;
    },

    //------------------------------------------------------------------------------------------------------------------
    tableCellAtIndex:function (table, idx)
    {
        //
        cc.log("func tableCellAtIndex");
        var cell = table.dequeueCell();
        if (!cell)
        {
            //没有就制造新的 
            cell = new cc.TableViewCell();
//            if(getPlatformName() == "android")
//            {
//                cell.retain();
//            }
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
        cc.log("sender.getTag() = " + sender.getParent().getTag());

        var nUId = this.m_data.getFriendsInfo()[sender.getParent().getParent().getIdx()].getID();
        cc.log("_btnAskHeart nUId:" + nUId);
        FriendsMng.getInstance().askFriendHeart(nUId,1);
//        KakaoJoyInterface.getInstance().sendMessageForAskHeart(nUId);
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
        var spriteUpTxt = cc.Sprite.createWithSpriteFrameName("label_ask_heart.png");
        this.m_BackGround.addChild(spriteUpTxt);
        spriteUpTxt.setPosition(cc.p(this.m_BackGround.getContentSize().width/2,
                this.m_BackGround.getContentSize().height - 53*Defines.BASE_SCALE));

        //
        GUI._AddCloseButton(this.m_BackGround, this.closeWindow, this);

        //
        this.addTableView();

        var labelFinalTip_2 = cc.LabelTTF.create(Resource.ChineseTxt["labelFinalTip_2"], Defines.DefaultFont, 28 * Defines.BASE_SCALE);
        blockLayer.addChild(labelFinalTip_2);
        labelFinalTip_2.setColor(cc.c3b(255, 0, 0));
        labelFinalTip_2.setPosition(cc.p(_ScreenWidth()/2,40*Defines.BASE_SCALE));

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
        this.m_MyCellsBuilder = new GUIIAskHeartKakao_CellBuilder(cc.size(410 * Defines.BASE_SCALE, 310/4 * Defines.BASE_SCALE));
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
cc.GUIAskHeartKakao.description = function()
{
    return "GUIAskHeartKakao";
};

//======================================================================================================================
cc.GUIAskHeartKakao._instance = null;
cc.GUIAskHeartKakao.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIAskHeartKakao();
        this._instance.init();
    }

    return this._instance;
};


//======================================================================================================================
cc.GUIAskHeartKakaoData = cc.Class.extend({

//------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {

        //好友的信息列表
        this.m_arrFriendsInfo = null;

    },

    init: function()
    {
//        this._initTestData();
    },

    _initTestData: function()
    {

        this.m_arrFriendsInfo = new Array();
        for(var i = 0;i < 10; i++)
        {
            var tElement = {name: "임광근" + i.toString()};
            tElement.getName = function(){return "임광근";};
            tElement.getPhotoUrl = function(){return "";};
            tElement.getAskHeartTime = function(){return 0;};
            tElement.setAskHeartTime = function(nTime){};

            this.m_arrFriendsInfo.push(tElement);
        }

    },

//------------------------------------------------------------------------------------------------------------------
    getFriendsInfo: function()
    {
//        cc.log("func getFriendsInfo");
//        return this.m_arrFriendsInfo;
        this.m_arrFriendsInfo = FriendsMng.getInstance().getFriendsInfos();

        return this.m_arrFriendsInfo;
    },

    setFriendsInfo: function( arrInfo )
    {
        this.m_arrFriendsInfo = null;
        this.m_arrFriendsInfo = Tools.clone(arrInfo);
    }

//    updataFriendsInfo: function()
//    {
//        this.m_arrFriendsInfo = null;
//        this.m_arrFriendsInfo = new Array();
//        var arrFriendsInfo = FriendsMng.getInstance().getFriendsInfos();
//
//        for(var i = 0; i < arrFriendsInfo.length; ++i)
//        {
//
//        }
//    }

//------------------------------------------------------------------------------------------------------------------
});

cc.GUIAskHeartKakaoData._instance = null;
cc.GUIAskHeartKakaoData.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIAskHeartKakaoData();
        this._instance.init();
    }

    return this._instance;
};