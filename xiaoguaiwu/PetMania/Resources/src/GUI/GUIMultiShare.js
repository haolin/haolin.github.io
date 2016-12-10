
var SHARE_TYPE =
{
    SINA: 100,
    WECHAT_FRIEND: 110,
    WECHAT_CIRCLE: 120,
    TENCENT: 130,
    RENREN: 140,
    MAIL: 150
};

cc.GUIMultiShare = cc.GUIPopupWindow.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function ()
    {
        this._super();

        this.m_MainUI  = null;
        this.m_ShareObj = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    description : function ()
    {
        return  "GUIMultiShare";
    },

    //------------------------------------------------------------------------------------------------------------------
    init : function ()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent : function ()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(blockLayer, -1);

        //
        this.m_MainUI = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back11.png");
        this.getWindow().addChild(this.m_MainUI);
        this.m_MainUI.setPosition(_ScreenCenter());

        //
        var mainSize = this.m_MainUI.getContentSize();

        //
        var titleBg = cc.Sprite.createWithSpriteFrameName("general_level_title_bg.png");
        this.m_MainUI.addChild(titleBg);
        titleBg.setPosition(mainSize.width * 0.5, mainSize.height - 5 * Defines.BASE_SCALE);

        //
        var spriteTitle = cc.Sprite.createWithSpriteFrameName("share_label_title.png");
        titleBg.addChild(spriteTitle);
        var titleBgSize = titleBg.getContentSize();
        spriteTitle.setPosition(titleBgSize.width * 0.5, titleBgSize.height * 0.55);

        //
        var tempDesc = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png");
        var srcSize = tempDesc.getContentSize();
        var descSize = cc.size(400 * Defines.BASE_SCALE, 180 * Defines.BASE_SCALE);

        //
        var bgDesc = cc.Scale9Sprite.create(
            _GUIPath + "GUINewGeneral/general_back9.png",
            cc.rect(0, 0, srcSize.width, srcSize.height),
            cc.rect(srcSize.width * 0.3, srcSize.height * 0.3, srcSize.width * 0.4, srcSize.height * 0.4));

        bgDesc.setContentSize(descSize);
        this.m_MainUI.addChild(bgDesc);
        bgDesc.setPosition(cc.p(mainSize.width/2, mainSize.height - 148 * Defines.BASE_SCALE));

        var labelDesc = cc.LabelTTF.create(this.m_ShareObj["preview"], Defines.DefaultFont, 24 * Defines.BASE_SCALE);
        bgDesc.addChild(labelDesc);
        labelDesc.setPosition(cc.p(descSize.width/2, descSize.height/2));

        //
        var spriteMonster = cc.Sprite.createWithSpriteFrameName("Images_monster_4.png");
        this.m_MainUI.addChild(spriteMonster);
        spriteMonster.setPosition(cc.p(-15 * Defines.BASE_SCALE, mainSize.height - 148 * Defines.BASE_SCALE));

        //
        var config = [
            {_nor: "share_btn_wechat_friend_nor.png", _sel: "share_btn_wechat_friend_sel.png", _tag: SHARE_TYPE.WECHAT_FRIEND},
            {_nor: "share_btn_wechat_circle_nor.png", _sel: "share_btn_wechat_circle_sel.png", _tag: SHARE_TYPE.WECHAT_CIRCLE},
            {_nor: "share_btn_sina_nor.png", _sel: "share_btn_sina_sel.png", _tag: SHARE_TYPE.SINA},
            {_nor: "share_btn_tencent_nor.png", _sel: "share_btn_tencent_sel.png", _tag: SHARE_TYPE.TENCENT},
            {_nor: "share_btn_renren_nor.png", _sel: "share_btn_renren_sel.png", _tag: SHARE_TYPE.RENREN},
            {_nor: "share_btn_mail_nor.png", _sel: "share_btn_mail_sel.png", _tag: SHARE_TYPE.MAIL}
        ];

        //
        var positions = [
            cc.p(140 * Defines.BASE_SCALE, 220 * Defines.BASE_SCALE),
            cc.p(mainSize.width - 140 * Defines.BASE_SCALE, 220 * Defines.BASE_SCALE),
            cc.p(140 * Defines.BASE_SCALE, 140 * Defines.BASE_SCALE),
            cc.p(mainSize.width - 140 * Defines.BASE_SCALE, 140 * Defines.BASE_SCALE),
            cc.p(140 * Defines.BASE_SCALE, 60 * Defines.BASE_SCALE),
            cc.p(mainSize.width - 140 * Defines.BASE_SCALE, 60 * Defines.BASE_SCALE)
        ];

        //
        var self = this;

        var shareMenu = cc.Menu.create();
        shareMenu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(shareMenu);

        config.forEach(
            function(each, index)
            {
                var buttonShare = cc.MenuItemSprite.create(
                    cc.Sprite.createWithSpriteFrameName(each._nor),
                    cc.Sprite.createWithSpriteFrameName(each._sel),
                    self._btnShareCallback, self);
                buttonShare.setPosition(positions[index]);
                shareMenu.addChild(buttonShare);
                buttonShare.setTag(each._tag);
            }
        );

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(mainSize.width - 25 * Defines.BASE_SCALE, mainSize.height - 25 * Defines.BASE_SCALE));
        shareMenu.addChild(buttonClose);

        //预览分享图
        var picPath = this.m_ShareObj["picPath"];
        if (picPath && picPath != "")
        {
            var previewPic = cc.Sprite.create(picPath);
            if (previewPic)
            {
                this.m_MainUI.addChild(previewPic);
                previewPic.setPosition(cc.p(mainSize.width + 75 * Defines.BASE_SCALE, mainSize.height - 200 * Defines.BASE_SCALE));

                var picPanel = cc.Sprite.createWithSpriteFrameName("share_panel_1.png");
                this.m_MainUI.addChild(picPanel);
                var offset = cc.p(2 * Defines.BASE_SCALE, 5 * Defines.BASE_SCALE);
                picPanel.setPosition(cc.pAdd(previewPic.getPosition(), offset));

                //保持相框的高度不变，拉伸长度
                var picSize = previewPic.getContentSize();
                var whRatio = picSize.width/ picSize.height;
                var innerSize = cc.size(240 * Defines.BASE_SCALE, 140 * Defines.BASE_SCALE);
                var innerScaleX = (innerSize.height * whRatio)/ innerSize.width;

                picPanel.setScaleX(innerScaleX);
                previewPic.setScale(innerSize.height/ picSize.height);

                this.m_MainUI.setPositionX(_ScreenWidth()/2 - 50 * Defines.BASE_SCALE);
                cc.ResourceMng.getInstance().removeTextureCache(picPath);
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        this.closeWindow();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnShareCallback : function (sender)
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //step1:
        var shareType = sender.getTag();

        //step2:
        this.closeWindow();

        //
        switch(shareType)
        {
        case SHARE_TYPE.SINA:
            {
                _Share_ByWeibo(this.m_ShareObj);
            }
            break;

        case SHARE_TYPE.WECHAT_FRIEND:
            {
                _Share_ByWeChatFriend(this.m_ShareObj);
            }
            break;

        case SHARE_TYPE.WECHAT_CIRCLE:
            {
                _Share_ByWeChatCircle(this.m_ShareObj);
            }
            break;

        case SHARE_TYPE.TENCENT:
            {
                _Share_ByTencent(this.m_ShareObj);
            }
            break;

        case SHARE_TYPE.RENREN:
            {
                _Share_ByRenRen(this.m_ShareObj);
            }
            break;

        case SHARE_TYPE.MAIL:
            {
                _Share_ByMail(this.m_ShareObj);
            }
            break;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow : function (render, shareObj)
    {
        this._super(render);

        //
        cc.ResourceMng.getInstance().addToCache(
            Resource._GUIMultiShare_plist,
            Resource._GUIMultiShare_png);

        //
        this.m_ShareObj = shareObj;
        this.addContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow : function ()
    {
        this._super();

        //
        this.getWindow().removeAllChildren(true);

        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUIMultiShare_plist,
            Resource._GUIMultiShare_png);

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});


cc.GUIMultiShare._instance = null;
cc.GUIMultiShare.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIMultiShare();
        this._instance.init();
    }

    return this._instance;
};

//----------------------------------------------------------------------------------------------------------------------
var _Share_ByMulti = function(shareObj)
{
    var runningScene = cc.Director.getInstance().getRunningScene();
    cc.GUIMultiShare.getInstance().openWindow(runningScene, shareObj);
};

//----------------------------------------------------------------------------------------------------------------------
var _Share_ByFacebook = function(shareObj)
{
    if(Defines.IS_KO)
    {
        return;
    }
    var content = shareObj["content"];
    var picPath = shareObj["picPath"];
    var shareClass =  share.Share.getInstance();
    shareClass.shareToFacebook(content, picPath, true);
};

//----------------------------------------------------------------------------------------------------------------------
var _Share_ByWeibo = function(shareObj)
{
    var content = shareObj["content"];
    var picPath = shareObj["picPath"];
    var shareClass =  share.Share.getInstance();
    shareClass.shareToSinaWeibo(content, picPath, true);
};

//----------------------------------------------------------------------------------------------------------------------
var _Share_ByWeChatFriend = function(shareObj)
{
    var content = "#进击的小怪物# 小伙伴都在玩的超Q消除手游！";
    var oriPicPath = shareObj["picPath"];
    var picPath = _Share_PrintPic(oriPicPath, 0.5, "");
    var shareClass =  share.Share.getInstance();
    shareClass.shareToWeChatFriend(content, picPath, true);
};

//----------------------------------------------------------------------------------------------------------------------
var _Share_ByWeChatCircle = function(shareObj)
{
    var content = shareObj["content"];
    var picPath = shareObj["picPath"];
    var shareClass =  share.Share.getInstance();
    shareClass.shareToWeChatCircle(content, picPath, true);
};

//----------------------------------------------------------------------------------------------------------------------
var _Share_ByTencent = function(shareObj)
{
    var content = shareObj["content"];
    var picPath = shareObj["picPath"];
    var shareClass =  share.Share.getInstance();
    shareClass.shareToTencentWeibo(content, picPath, true);
};

//----------------------------------------------------------------------------------------------------------------------
var _Share_ByRenRen = function(shareObj)
{
    var content = shareObj["content"];
    var picPath = shareObj["picPath"];
    var shareClass =  share.Share.getInstance();
    shareClass.shareToRenRen(content, picPath, true);
};

//----------------------------------------------------------------------------------------------------------------------
var _Share_ByMail = function(shareObj)
{
    var subject = Resource.ChineseTxt["share_subject_0"];
    var content = shareObj["content"];
    var picPath = shareObj["picPath"];
    var shareClass =  share.Share.getInstance();
    shareClass.shareToMail(subject, content, picPath, true);
};

//----------------------------------------------------------------------------------------------------------------------