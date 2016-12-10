//----------------------------------------------------------------------------------------------------------------------
var GUIMail_CellBuilder = cc.Class.extend({

    //
    CELL_CONTENT_TAG:
    {
        MAIL_PHOTO: 999,            //头像
        MAIL_CONTENT_TXT: 1000,     //邮件内容
        MAIL_BUTTON: 1001,           //按钮
        MAIL_BUTTON_IMG: 1002,      //按钮图标
        MAIL_CONTENT_NAME: 1003,
        MAIL_CONTENT_TIME: 1004
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(cellSize)
    {
        this.m_CellSize = cellSize || cc.size(10 * Defines.BASE_SCALE, 10 * Defines.BASE_SCALE);
    },

    //------------------------------------------------------------------------------------------------------------------
    _static: function()
    {
        return GUIMail_CellBuilder.prototype;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "GUIMail_CellBuilder";
    },

    //------------------------------------------------------------------------------------------------------------------
    getCellSize: function()
    {
        return this.m_CellSize;
    },

    //------------------------------------------------------------------------------------------------------------------
    buildCell: function(cell, idx, buttonCallBack, target, needResponse)
    {
        cell.removeAllChildren(true);

        //照片头像
        var friendPhoto = cc.Sprite.createWithSpriteFrameName("mail_bag_photo.png");
        var photoLayer = cc.Layer.create();
        photoLayer.setContentSize(cc.size(friendPhoto.getContentSize().width * 0.6, friendPhoto.getContentSize().height * 0.6));
        cell.addChild(photoLayer, 0, this._static().CELL_CONTENT_TAG.MAIL_PHOTO);
        photoLayer.addChild(friendPhoto);
        photoLayer.setPosition(cc.p(0, 10 * Defines.BASE_SCALE));
        friendPhoto.setAnchorPoint(cc.p(0, 0));
        friendPhoto.setPosition(cc.p(0, 0));
        friendPhoto.setScale(0.6);


        //mail内容
        var srcSprite = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back4.png");

        //
        var mailContentBack = cc.Scale9Sprite.create(
        _GUIPath + "GUINewGeneral/general_back4.png",
        cc.rect(0, 0, srcSprite.getContentSize().width, srcSprite.getContentSize().height),
        cc.rect(srcSprite.getContentSize().width * 0.45, srcSprite.getContentSize().height * 0.45,
            srcSprite.getContentSize().width * 0.1, srcSprite.getContentSize().height * 0.1));

        cell.addChild(mailContentBack, 0, this._static().CELL_CONTENT_TAG.MAIL_CONTENT_TXT);
        mailContentBack.setAnchorPoint(cc.p(0, 0));
        mailContentBack.setPosition(cc.p(55 * Defines.BASE_SCALE, 0 * Defines.BASE_SCALE));
        mailContentBack.setContentSize(
            cc.size(270 * Defines.BASE_SCALE, 20 * Defines.BASE_SCALE + srcSprite.getContentSize().height));

        var mailContentTime = cc.LabelTTF.create("", Defines.DefaultFont, 8 * Defines.BASE_SCALE);
        mailContentBack.addChild(mailContentTime, 0, this._static().CELL_CONTENT_TAG.MAIL_CONTENT_TIME);
        mailContentTime.setAnchorPoint(cc.p(0, 0));
        mailContentTime.setPosition(cc.p(280 * Defines.BASE_SCALE, 5 * Defines.BASE_SCALE));

        var mailContentName = cc.LabelTTF.create("", Defines.DefaultFont, 14 * Defines.BASE_SCALE);
        mailContentBack.addChild(mailContentName, 0, this._static().CELL_CONTENT_TAG.MAIL_CONTENT_NAME);
        mailContentName.setAnchorPoint(cc.p(0, 0));
        mailContentName.setPosition(cc.p(10 * Defines.BASE_SCALE, 40 * Defines.BASE_SCALE));
        //邮件内容的label
        var maiContentLab = cc.LabelTTF.create("", Defines.DefaultFont, 13 * Defines.BASE_SCALE);
        mailContentBack.addChild(maiContentLab, 0, this._static().CELL_CONTENT_TAG.MAIL_CONTENT_TXT);
        maiContentLab.setAnchorPoint(cc.p(0, 0));
        maiContentLab.setPosition(cc.p(10 * Defines.BASE_SCALE, 15 * Defines.BASE_SCALE));

        //信件内容的收取按钮
        if(!needResponse)
        {
            var button = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("mail_btn_get_nor.png"),
                cc.Sprite.createWithSpriteFrameName("mail_btn_get_sel.png"),
                buttonCallBack,
                target);

        }
        else
        {
            var button = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("mail_btn_send_nor.png"),
                cc.Sprite.createWithSpriteFrameName("mail_btn_send_sel.png"),
                buttonCallBack,
                target);

        }

        button.setTag(idx);

        //
        var menu = cc.Menu.create(button);
        cell.addChild(menu, 1000, this._static().CELL_CONTENT_TAG.MAIL_BUTTON);
        menu.setPosition(cc.p(0, 0));
        button.setAnchorPoint(cc.p(0, 0));
        button.setPosition(cc.p(320 * Defines.BASE_SCALE, 15 * Defines.BASE_SCALE));
        button.setScale(1/1.2);

        //
        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    decorateCellPhoto: function(cell, idx, mailInfo)
    {
        //test show photo
//        var photo = cc.Sprite.createWithSpriteFrameName("general_default_photo.png");
//        var defaultPhoto = cell.getChildByTag(this._static().CELL_CONTENT_TAG.MAIL_PHOTO);
//        defaultPhoto.removeAllChildren(true);
//
//        //
//        defaultPhoto.addChild(photo);
//        photo.setScaleX(defaultPhoto.getContentSize().width/photo.getContentSize().width);
//        photo.setScaleY(defaultPhoto.getContentSize().height/photo.getContentSize().height);
//        photo.setPosition(
//            cc.p(defaultPhoto.getContentSize().width/2,
//                defaultPhoto.getContentSize().height/2)
//        );

        if (!mailInfo)
        {
            return cell;
        }
		cc.log("mailInfo.getRoleId() == " + mailInfo.getRoleId());
        if(mailInfo.getRoleId() == "sys")
        {
            var icon = mailInfo.getMailIcon();
			cc.log("mail icon = " + icon);
            if(icon != "default" && icon != null && icon != "")
            {
                var photo = cc.Sprite.createWithSpriteFrameName(icon);
                if(photo == null)
                {
                    return cell;
                }
                var defaultPhoto = cell.getChildByTag(this._static().CELL_CONTENT_TAG.MAIL_PHOTO);
                defaultPhoto.removeAllChildren(true);

                //
                defaultPhoto.addChild(photo);
				
				var scaleSmaller =defaultPhoto.getContentSize().width/photo.getContentSize().width;
				
				
				if (scaleSmaller > defaultPhoto.getContentSize().height/photo.getContentSize().height){
					scaleSmaller = defaultPhoto.getContentSize().height/photo.getContentSize().height;
				}
				
				
				cc.log(" scaleSmaller= " +  scaleSmaller);
                photo.setScale(scaleSmaller);
                photo.setAnchorPoint(cc.p(0, 0));
                photo.setPosition(cc.p(0, 0));
            }
            return cell;
        }
        var friendInfo = FriendsMng.getInstance().getFriendInfoByRoleId(mailInfo.getRoleId());
        if (!friendInfo)
        {
            cc.log("mail get no friendInfo" + mailInfo.getRoleId());
            return cell;
        }
        if(friendInfo.getPhotoUrl() == "")
        {
            cc.log("mail get no friendInfo nothing" + mailInfo.getRoleId());
            var photo = cc.Sprite.createWithSpriteFrameName("general_default_photo.png");
        }
        else
        {
            var photo = cc.Sprite.create(friendInfo.getPhotoUrl());
        }
        if (!photo)
        {
            return cell;
        }

        //
        var defaultPhoto = cell.getChildByTag(this._static().CELL_CONTENT_TAG.MAIL_PHOTO);
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
    decorateCell: function(cell, idx, mailInfo)
    {
        //
        this.decorateCellPhoto(cell, idx, mailInfo);

        //
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.MAIL_CONTENT_TXT).getChildByTag(
            this._static().CELL_CONTENT_TAG.MAIL_CONTENT_NAME).setString(mailInfo.getMailName());
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.MAIL_CONTENT_TXT).getChildByTag(
            this._static().CELL_CONTENT_TAG.MAIL_CONTENT_TXT).setString(mailInfo.getMyMailContent());
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.MAIL_CONTENT_TXT).getChildByTag(
            this._static().CELL_CONTENT_TAG.MAIL_CONTENT_TIME).setString(mailInfo.getMailTime());

        return cell;
    }

});

//======================================================================================================================
cc.GUIMail = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        //
        this.m_MailBackGround = null;
        this.m_MailTableView = null;

        //
        this.m_MyCellsBuilder = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return cc.GUIMail.description();
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
        return MailMng.getInstance().getMailsList().length;
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
        var a_mail = MailMng.getInstance().getMailsList()[idx];
        if(!a_mail)
        {
            this.m_MyCellsBuilder.buildCell(cell, idx, this._buttonCallBack, this);
        }

        //
        else if (a_mail)
        {
            this.m_MyCellsBuilder.buildCell(cell, idx, this._buttonCallBack, this, a_mail.needResponse());
            this.m_MyCellsBuilder.decorateCell(cell, idx, a_mail);
        }

        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    _buttonCallBack: function(sender)
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        cc.log("_buttonCallBack = " + sender.getTag());

        var a_mail = MailMng.getInstance().getMailsList()[sender.getTag()];
        if (a_mail)
        {
            MailMng.getInstance().pick(a_mail);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _buttonPickAll: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        MailMng.getInstance().pickAll();
        //this.closeWindow();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 128));
        this.getWindow().addChild(blockLayer, -1);

        //大背景
        this.m_MailBackGround = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back1.png");
        this.getWindow().addChild(this.m_MailBackGround);
        this.m_MailBackGround.setPosition(_ScreenCenter());
        this.m_MailBackGround.setScale(1.2);

        //好友的背景板
        var backCenter = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back3.png");
        this.m_MailBackGround.addChild(backCenter);
        backCenter.setPosition(
            cc.p(this.m_MailBackGround.getContentSize().width/2,
                this.m_MailBackGround.getContentSize().height/2)
        );

        //
        var titleLabel = cc.Sprite.createWithSpriteFrameName("general_label_mail.png");
        this.m_MailBackGround.addChild(titleLabel);
        titleLabel.setPosition(
            cc.p(this.m_MailBackGround.getContentSize().width/2,
                this.m_MailBackGround.getContentSize().height - 50 * Defines.BASE_SCALE)
        );

        //
        GUI._AddCloseButton(this.m_MailBackGround, this.closeWindow, this);

        //
        this.loadMailsTableView();

        //
        var buttonPickAll = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("mail_btn_getall_nor.png"),
            cc.Sprite.createWithSpriteFrameName("mail_btn_getall_sel.png"),
            this._buttonPickAll,
            this);
        //
        var itemMenu = cc.Menu.create(buttonPickAll);
        itemMenu.setPosition(cc.p(0, 0));
        this.m_MailBackGround.addChild(itemMenu, 10000);
        buttonPickAll.setPosition(
            cc.p(this.m_MailBackGround.getContentSize().width/2,
                43 * Defines.BASE_SCALE));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    loadMailsTableView: function()
    {
        //
        this.m_MailTableView = cc.TableView.create(this, cc.size(410 * Defines.BASE_SCALE, 266 * Defines.BASE_SCALE));
        this.m_MailTableView.setTouchPriority(cc.MENU_HANDLER_PRIORITY);
        this.m_MailBackGround.addChild(this.m_MailTableView, 1000);
        this.m_MailTableView.setPosition(cc.p(40 * Defines.BASE_SCALE, 107 * Defines.BASE_SCALE));

        //
        this.m_MailTableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.m_MailTableView.setDelegate(this);
        this.m_MailTableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.m_MailTableView.reloadData();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);

        cc.ResourceMng.getInstance().addToCache(
            Resource._GUIMail_plist,
            Resource._GUIMail_png);

        this.m_MyCellsBuilder = new GUIMail_CellBuilder(cc.size(410 * Defines.BASE_SCALE, 266/4 * Defines.BASE_SCALE));

        //
        cc.AudioMng.getInstance().playOpenWindow();
        this.updateGUI();

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();
        cc.AudioMng.getInstance().playCloseWindow();
        this.getWindow().removeAllChildren(true);

        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUIMail_plist,
            Resource._GUIMail_png);

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
cc.GUIMail.description = function()
{
    return "GUIMail";
};

//======================================================================================================================
cc.GUIMail._instance = null;
cc.GUIMail.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIMail();
        this._instance.init();

        var self = this;
        var arr = [
            _MAIL_MNG_EVENT.RELOAD_MAILS_FINISH,
            _MAIL_MNG_EVENT.PICK_MAIL
        ];

        arr.forEach(
            function(name)
            {
                MailMng.getInstance().registerEvent(
                    name,
                    function()
                    {
                        self._instance.updateGUI();
                    },
                    null);
            }
        );
    }

    return this._instance;
};