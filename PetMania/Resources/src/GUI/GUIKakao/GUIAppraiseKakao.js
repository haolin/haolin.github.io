/**
 * Created by hong.zhang on 2014/7/17.
 */

cc.GUIAppraiseKakao = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        this.m_NeverShow = cc.GameDataBoolean.create("Appraise_NeverShow",false,_DB_OP_GAME);
        this.m_LaterShowTime = cc.GameDataTime.create("Appraise_LaterShowTime",0,_DB_OP_GAME);

        this.m_NeverShow.load();
        this.m_LaterShowTime.load();
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "GUIAppraiseKakao";;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function ()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 100));
        this.getWindow().addChild(blockLayer, -1);

        var spriteBackground = cc.Scale9Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png");
        this.getWindow().addChild(spriteBackground);
        spriteBackground.setContentSize(cc.size(550*Defines.BASE_SCALE,300*Defines.BASE_SCALE));
        spriteBackground.setPosition(cc.p(_ScreenWidth()/2,_ScreenHeight()/2));

        var nBackWidth = spriteBackground.getContentSize().width;
        var nBackHeight = spriteBackground.getContentSize().height;

        //说明
        var labelText = cc.LabelTTF.create(Resource.KoreanTxt["appraise"],Defines.DefaultFont,27*Defines.BASE_SCALE);
        labelText.setAnchorPoint(cc.p(0.5,1));
        labelText.setPosition(cc.p(nBackWidth/2,nBackHeight - 15*Defines.BASE_SCALE));
        labelText.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        spriteBackground.addChild(labelText);

        //三个按钮
        var buttonAppraiseNow = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("appraise_btn_now_nor.png"),
            cc.Sprite.createWithSpriteFrameName("appraise_btn_now_sel.png"),
            this._btnAppraiseNow,this);
        buttonAppraiseNow.setAnchorPoint(cc.p(0,0));
        buttonAppraiseNow.setPosition(cc.p(20*Defines.BASE_SCALE,30*Defines.BASE_SCALE));

        var buttonAppraiseLater = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("appraise_btn_next_nor.png"),
            cc.Sprite.createWithSpriteFrameName("appraise_btn_next_sel.png"),
            this._btnAppraiseLater,this);
        buttonAppraiseLater.setAnchorPoint(cc.p(0.5,0));
        buttonAppraiseLater.setPosition(cc.p(nBackWidth/2,30*Defines.BASE_SCALE));

        var buttonAppraiseNever = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("appraise_btn_never_nor.png"),
            cc.Sprite.createWithSpriteFrameName("appraise_btn_never_sel.png"),
            this._btnAppraiseNever,this);
        buttonAppraiseNever.setAnchorPoint(cc.p(1,0));
        buttonAppraiseNever.setPosition(cc.p(nBackWidth - 20*Defines.BASE_SCALE,30*Defines.BASE_SCALE));

        var menuButton = cc.Menu.create(buttonAppraiseNow,buttonAppraiseLater,buttonAppraiseNever);
        spriteBackground.addChild(menuButton);
        menuButton.setPosition(cc.p(0,0));

        //关闭按钮
        GUI._AddCloseButton(blockLayer,this._btnClose,this);


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnAppraiseNow: function()
    {
        //todo 区分渠道
        if(Defines.OS.isiOS())
        {
            var configClass = wrapperConfig.Config.getInstance();
            configClass.openURL(cc.GUIAppraiseKakao.appraiseUrl.URL_APPSTORE);

        }
        else if(Defines.OS.isAndroid() && "300004" == CHANNEL)
        {
            //区分渠道
            var configClass = wrapperConfig.Config.getInstance();
            configClass.openURL(cc.GUIAppraiseKakao.appraiseUrl.URL_GOOGLE);
        }
        else if(Defines.OS.isAndroid() && "300005" == CHANNEL)
        {
            //区分渠道
            var configClass = wrapperConfig.Config.getInstance();
            configClass.openURL(cc.GUIAppraiseKakao.appraiseUrl.URL_TSTORE);
        }

        this.closeWindow();
    },

    _btnAppraiseLater: function()
    {
        this.m_LaterShowTime.set(_ServerTime());
        this.m_LaterShowTime.save();

        this.closeWindow();
    },

    _btnAppraiseNever: function()
    {
        this.m_NeverShow.set(true);
        this.m_NeverShow.save();

        this.closeWindow();
    },

    _btnClose: function()
    {
        this.closeWindow();
    },

    //------------------------------------------------------------------------------------------------------------------
    needShow: function()
    {
//        return true;
//        var curTime = isHtml5 ? _LocalTime() : _ServerTime();
        //三天后才开始显示
        cc.log("GUIAppraise needShow");
        cc.log("_ServerTime(): " + _ServerTime()*1000);
        cc.log("days: " + Tools.oneDay()*2);
        cc.log("creatat: " + g_player.createat?g_player.createat*1000:0);
        if(Tools.getDayBegin(_ServerTime()*1000) < ((g_player.createat?g_player.createat*1000:0) + Tools.oneDay()*2))
        {
            cc.log("评价界面 时间未到");
            cc.log(Tools.getDayBegin(_ServerTime()*1000));
            cc.log((g_player.createat?g_player.createat*1000:0) + Tools.oneDay()*2);
            return false;
        }

        //永不显示的话就不显示

        if(this.m_NeverShow.get())
        {
            cc.log("评价界面 永不显示");
            return false;
        }

        //暂不显示的话第二天在显示
        if(Tools.getDayBegin(_ServerTime()) < this.m_LaterShowTime.get())
        {
            cc.log("评价界面 暂不显示");
            cc.log(_ServerTime());
            cc.log(this.m_LaterShowTime.get());
            return false;
        }
        cc.log("return true");
        return true;

    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {

        this._super(render);

        cc.ResourceMng.getInstance().addToCache(
            Resource._GUIAppraise_plist,
            Resource._GUIAppraise_png);

        cc.AudioMng.getInstance().playOpenWindow();

        this.getWindow().removeAllChildren(true);
        this.addContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        cc.AudioMng.getInstance().playCloseWindow();
        this.getWindow().removeAllChildren(true);

        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUIAppraise_plist,
            Resource._GUIAppraise_png);

        return this;
    }
});

//======================================================================================================================
cc.GUIAppraiseKakao._instance = null;
cc.GUIAppraiseKakao.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIAppraiseKakao();
        this._instance.init();
    }

    return this._instance;
};

cc.GUIAppraiseKakao.appraiseUrl = {
    URL_APPSTORE: "https://itunes.apple.com/kr/app/id891263244",
    URL_GOOGLE: "https://play.google.com/store/apps/details?id=com.ckk.yourstar",
    URL_TSTORE: "http://tsto.re/0000666704"
}
