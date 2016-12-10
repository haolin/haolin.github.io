
//=======================================================================================================
cc.GUISpringAd = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUISpringAd";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();
        this.m_MainUI = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(blockLayer, -1);

        // 使用九宫格方式创建面板
        var srcSprite = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png");
        var srcSize = srcSprite.getContentSize();

        var targetSize = cc.size(_ScreenWidth() * 0.92, _ScreenHeight() * 0.82);
        var panel = cc.Scale9Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png",
            cc.rect(0, 0, srcSize.width, srcSize.height),
            cc.rect(srcSize.width * 0.3, srcSize.height * 0.3, srcSize.width * 0.4, srcSize.height * 0.4));

        //
        panel.setPreferredSize(targetSize);
        panel.setAnchorPoint(cc.p(0.5, 0.5));
        panel.setPosition(cc.p(_ScreenWidth()/2, _ScreenHeight()/2));
        this.getWindow().addChild(panel);

        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(
            cc.p(_ScreenWidth()/2 + targetSize.width / 2, _ScreenHeight()/2 + targetSize.height / 2));

        //下面是要显示的图片部分

//        {src:_GUIPath + "GUINewGeneral/cross_910x195_1.png"},
//        {src:_GUIPath + "GUINewGeneral/cross_910x195_2.png"},
//        {src:_GUIPath + "GUINewGeneral/cross_910x195_3.png"},

        var adNum = 1;

        var adImageFile = [
            cc.Sprite.create(_GUIPath + "GUINewGeneral/AD_900x580_2.jpg")];

        var menu = cc.Menu.create(buttonClose);//,backFrame_up, backFrame_down);
        menu.setPosition(cc.p(0.5, 0.5));
        this.getWindow().addChild(menu);

        for (var i = 0; i < adNum ; i++){
            var backFrame_up = cc.MenuItemSprite.create(
                adImageFile[i],
                adImageFile[i],
                this._btnLinkToCallback, this);
            backFrame_up.setTag(i);

            backFrame_up.setAnchorPoint(cc.p(0.5, 0));

            if (backFrame_up.getContentSize().height * adNum > (targetSize.height - 15 *Defines.BASE_SCALE)){
                backFrame_up.setScale((targetSize.height - 15 *Defines.BASE_SCALE) / (backFrame_up.getContentSize().height * adNum));
            }

            if (adNum == 1){
                backFrame_up.setAnchorPoint(cc.p(0.5, 0.5));
                backFrame_up.setPosition(cc.p(_ScreenWidth()/2,_ScreenHeight()/2 ));
            }
            else{
                backFrame_up.setPosition(cc.p(_ScreenWidth()/2,_ScreenHeight()/2 - targetSize.height/ 2 + 7 * Defines.BASE_SCALE +  (targetSize.height - 15 *Defines.BASE_SCALE) /adNum * (adNum - i - 1)));
            }


            menu.addChild(backFrame_up);
        }


//        var backFrame_up = cc.MenuItemSprite.create(
//            cc.Sprite.create(_GUIPath + "GUINewGeneral/AD_up_910x295.png"),
//            cc.Sprite.create(_GUIPath + "GUINewGeneral/AD_up_910x295.png"),
//            this._btnLinkToCallback, this);
//        backFrame_up.setTag(1);
//
//        backFrame_up.setAnchorPoint(cc.p(0.5, 0));
//
//        if (backFrame_up.getContentSize().height * 2 > (targetSize.height - 15 *Defines.BASE_SCALE)){
//            backFrame_up.setScale((targetSize.height - 15 *Defines.BASE_SCALE) / (backFrame_up.getContentSize().height * 2));
//        }
//
//        backFrame_up.setPosition(cc.p(_ScreenWidth()/2, _ScreenHeight()/2));
//
//        var backFrame_cen = cc.MenuItemSprite.create(
//            cc.Sprite.create(_GUIPath + "GUINewGeneral/AD_up_910x295.png"),
//            cc.Sprite.create(_GUIPath + "GUINewGeneral/AD_up_910x295.png"),
//            this._btnLinkToCallback, this);
//        backFrame_cen.setTag(2);
//
//        backFrame_cen.setAnchorPoint(cc.p(0.5, 0));
//
//        if (backFrame_cen.getContentSize().height * 2 > (targetSize.height - 15 *Defines.BASE_SCALE)){
//            backFrame_cen.setScale((targetSize.height - 15 *Defines.BASE_SCALE) / (backFrame_up.getContentSize().height * 2));
//        }
//
//        backFrame_cen.setPosition(cc.p(_ScreenWidth()/2, _ScreenHeight()/2));
//
//        var backFrame_down = cc.MenuItemSprite.create(
//            cc.Sprite.create(_GUIPath + "GUINewGeneral/AD_down_910x295.png"),
//            cc.Sprite.create(_GUIPath + "GUINewGeneral/AD_down_910x295.png"),
//            this._btnLinkToCallback, this);
//        backFrame_down.setTag(3);
//
//        if (backFrame_down.getContentSize().height * 2> (targetSize.height - 15 *Defines.BASE_SCALE)){
//            backFrame_down.setScale((targetSize.height - 15 *Defines.BASE_SCALE) / (backFrame_down.getContentSize().height * 2));
//        }
//
//        backFrame_down.setPosition(cc.p(_ScreenWidth()/2, _ScreenHeight()/2));
//        backFrame_down.setAnchorPoint(cc.p(0.5, 1));



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
    _btnLinkToCallback: function(sender)
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        var adImageURL = [
            "http://cafe.naver.com/goyourstar.cafe?iframe_url=/MyCafeIntro.nhn%3Fclubid=27459175"];

        var configClass = wrapperConfig.Config.getInstance();

        var tarTag = sender.getTag();
        configClass.openURL(adImageURL[tarTag]);
        return this;
    },


    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);
        this.getWindow().removeAllChildren(true);
        this.addContent();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();
        this.getWindow().removeAllChildren(true);

        cc.log("GUISpringAd closeWindow");
        if(JoyType.JOY_KAKAO == JOY_FLAG)
        {
            cc.GUILoginItemPush.getInstance().openWindow(cc.Director.getInstance().getRunningScene());
        }
        bLoginPushed = false;

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});


cc.GUISpringAd._instance = null;
cc.GUISpringAd.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUISpringAd();
        this._instance.init();
    }

    return this._instance;
};

cc.GUISpringAd.changeTo = function()
{
    var nowTime = _LocalTime();
    var springDailyTime = cc.DataMng.getInstance().getSpringDaily();

    var curSpringDailyTime = Tools.getDayEnd(springDailyTime);

    if (nowTime > curSpringDailyTime)
    {
        cc.DataMng.getInstance().setSpringDaily();
        return true;
    }

    return false;
};