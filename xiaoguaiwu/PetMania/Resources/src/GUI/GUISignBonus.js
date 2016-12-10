cc.GUISignBonus = cc.GUIWindow.extend({

    CONTENT_TAG:
    {
        CURRENT_CELL : 1000,
        CONTINUE_CELL : 1001,
        SIGN_MENU : 1002,
        SIGN_CELL_BASE : 1003
    },

    _static: function()
    {
        return cc.GUISignBonus.prototype;
    },

    ctor: function()
    {
        this._super();
        this._leftBack = null;
        this._rightBack = null;
        this._currentIndex = new safevar();
        this._currentIndex.setValue(0);
        this._signMenu = null;
        this.labelSignCount = null;
        this.labelContinueCount = null;
        //this.blockLayer = null;
    },

    init: function()
    {
        this._super();

    },

    addContent: function()
    {
        this._currentIndex.setValue(cc.DataMng.getDataSignIn().getCurrentContinueSignCount());
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 100));
        this.getWindow().addChild(blockLayer, -1);
        var background = cc.Sprite.create(_GUIPath + "GUIShop/shop_background.jpg");
        var scaleX = _ScreenWidth()/background.getContentSize().width;
        var scaleY = _ScreenHeight()/background.getContentSize().height;
        if(scaleX < scaleY)
        {
            blockLayer.setScale(scaleX);
        }
        else
        {
            blockLayer.setScale(scaleY);
        }
        blockLayer.addChild(background, 0);
        background.setPosition(_ScreenCenter());
        var menu = cc.Menu.create();
        this.getWindow().addChild(menu, 1000);
        menu.setPosition(cc.p(0, 0));
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this.btnCloseCallback, this);
        menu.addChild(buttonClose);
        buttonClose.setPosition(
            cc.pSub(_ScreenTopRight(), cc.p(30 * Defines.BASE_SCALE, 30 * Defines.BASE_SCALE))
        );
        this.addRightContent(background);
        this.addLeftContent(background);

        var labelBottom = cc.Sprite.createWithSpriteFrameName("sign_label_bottom.png");
        labelBottom.setPosition(cc.pAdd(_ScreenBottom(), cc.p(0, 20 * Defines.BASE_SCALE)));
        background.addChild(labelBottom);
        var countNumber = cc.DataMng.getDataSignIn().getSignCount();
        this.labelSignCount = GUI.createNumberLabel(countNumber, _GUIPath + "Num/num_sign_18_22.png", 18, 22, "0");
        labelBottom.addChild(this.labelSignCount);
        this.labelSignCount.setPosition(cc.p(labelBottom.getContentSize().width/12, labelBottom.getContentSize().height/6));

        var continueNumber = cc.DataMng.getDataSignIn().getCurrentContinueSignCount();
        this.labelContinueCount = GUI.createNumberLabel(continueNumber, _GUIPath + "Num/num_sign_18_22.png", 18, 22, "0");
        labelBottom.addChild(this.labelContinueCount);
        this.labelContinueCount.setPosition(cc.p(labelBottom.getContentSize().width  * 0.66, labelBottom.getContentSize().height/6));

    },

    addLeftContent: function(background)
    {
        var size = background.getContentSize();
        var baseScaleX = background.getScaleX();
        var baseScaleY = background.getScaleY();

        this._leftBack = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back22.png");
        background.addChild(this._leftBack);
        this._leftBack.setAnchorPoint(cc.p(0, 0.5));
        this._leftBack.setPosition(cc.p(0, size.height/2));
        this._leftBack.setScaleX(((size.width * 0.3) / (this._leftBack.getContentSize().width)) / baseScaleX);
        this._leftBack.setScaleY(((size.height * 0.8) / (this._leftBack.getContentSize().height)) / baseScaleY);

        var leftSize = this._leftBack.getContentSize();
        var leftContentTop = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back12.png");
        this._leftBack.addChild(leftContentTop, 0, this._static().CONTENT_TAG.CURRENT_CELL);
        var leftContentBottom = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back12.png");
        this._leftBack.addChild(leftContentBottom, 0, this._static().CONTENT_TAG.CONTINUE_CELL);
        var leftLabelTop = cc.Sprite.createWithSpriteFrameName("sign_current_label.png");
        leftContentTop.addChild(leftLabelTop);
        var leftLabelBottom = cc.Sprite.createWithSpriteFrameName("sign_continue_label.png");
        leftContentBottom.addChild(leftLabelBottom);
        leftContentTop.setPosition(cc.p(leftSize.width/2, leftSize.height * 0.7));
        leftContentBottom.setPosition(cc.p(leftSize.width/2, leftSize.height * 0.3));
        leftLabelTop.setPosition(cc.p(leftContentTop.getContentSize().width/2, leftContentTop.getContentSize().height));
        leftLabelBottom.setPosition(cc.p(leftContentBottom.getContentSize().width/2, leftContentBottom.getContentSize().height));


        leftContentTop.setScaleX(0.5/this._leftBack.getScaleX());
        leftContentTop.setScaleY(0.5/this._leftBack.getScaleY());
        leftContentBottom.setScaleX(0.5/this._leftBack.getScaleX());
        leftContentBottom.setScaleY(0.5/this._leftBack.getScaleY());
        leftLabelTop.setScaleX(1/leftContentTop.getScaleX());
        leftLabelTop.setScaleY(1/leftContentTop.getScaleY());
        leftLabelBottom.setScaleX(1/leftContentBottom.getScaleX());
        leftLabelBottom.setScaleY(1/leftContentBottom.getScaleY());

        var index = this._currentIndex.getValue();
        var frame = cc.DataMng.getDataSignIn().getBonusFrameByIndex(index);
        if(frame == "")
        {
            return;
        }
        var sprDiamond = cc.Sprite.createWithSpriteFrameName("icon_diamond_0.png");
        leftContentTop.addChild(sprDiamond);
        sprDiamond.setPosition(cc.p(leftContentBottom.getContentSize().width/2, leftContentBottom.getContentSize().height/2));
        sprDiamond.setScaleX(1/leftContentBottom.getScaleX());
        sprDiamond.setScaleY(1/leftContentBottom.getScaleY());

        var spr = cc.Sprite.createWithSpriteFrameName(frame);
        leftContentBottom.addChild(spr);
        spr.setPosition(cc.p(leftContentBottom.getContentSize().width/2, leftContentBottom.getContentSize().height/2));
        spr.setScaleX(1/leftContentBottom.getScaleX());
        spr.setScaleY(1/leftContentBottom.getScaleY());
    },

    addRightContent: function(background)
    {
        var size = background.getContentSize();
        var baseScaleX = background.getScaleX();
        var baseScaleY = background.getScaleY();

        var tempMain = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png");
        var srcSize = tempMain.getContentSize();

        //
        this._rightBack = cc.Scale9Sprite.create(
            _GUIPath + "GUINewGeneral/general_back9.png",
            cc.rect(0, 0, srcSize.width, srcSize.height),
            cc.rect(srcSize.width * 0.3, srcSize.height * 0.3, srcSize.width * 0.4, srcSize.height * 0.4));

        //
        var mainSize = cc.size(900 * Defines.BASE_SCALE, 600 * Defines.BASE_SCALE);
        this._rightBack.setContentSize(mainSize);

        //this._rightBack = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png");
        background.addChild(this._rightBack);
        this._rightBack.setAnchorPoint(cc.p(1, 0.5));
        this._rightBack.setPosition(cc.p(size.width, size.height/2));
        this._rightBack.setScaleX(((size.width * 0.7) / (this._rightBack.getContentSize().width)) / baseScaleX);
        this._rightBack.setScaleY(((size.height * 0.8) / (this._rightBack.getContentSize().height)) / baseScaleY);

        this._signMenu = cc.Menu.create();
        this._rightBack.addChild(this._signMenu);
        this._signMenu.setPosition(cc.p(0, 0));
        var baseCellPos = cc.p(10 * Defines.BASE_SCALE, this._rightBack.getContentSize().height - 20 * Defines.BASE_SCALE);
        var currentTag = this._currentIndex.getValue() + this._static().CONTENT_TAG.SIGN_CELL_BASE;

        var bonus = [];
        bonus = cc.DataMng.getDataSignIn().getSignInBonus();

        for(var i=0; i<28; i++)
        {
            //var cell = cc.Sprite.createWithSpriteFrameName("sign_cell.png");
            var cell = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("sign_cell.png"),
                cc.Sprite.createWithSpriteFrameName("sign_cell.png"),
                this.btnSignInCallback,
                this
            );

            var offsetX = 1 * Defines.BASE_SCALE;
            var offsetY = 1 * Defines.BASE_SCALE;
            var deltaX = this._rightBack.getContentSize().width/7 + offsetX;
            var deltaY = 0 - (this._rightBack.getContentSize().height/4 + offsetY);
            var indexX = i%7;
            var indexY = Math.floor(i/7);
            var tag = this._static().CONTENT_TAG.SIGN_CELL_BASE + i;
            cell.setAnchorPoint(cc.p(0, 1));
            var cellPos = cc.pAdd(baseCellPos, cc.p(indexX * deltaX, indexY * deltaY));
            this._signMenu.addChild(cell, 0, tag);
            cell.setPosition(cellPos);
            cell.setScaleX(1/this._rightBack.getScaleX());
            cell.setScaleY(1/this._rightBack.getScaleY());

            if(tag < currentTag)
            {
                var finishSpr = cc.Sprite.createWithSpriteFrameName("sign_finish.png");
                this._rightBack.addChild(finishSpr, 3);
                finishSpr.setAnchorPoint(cc.p(0, 1));
                finishSpr.setScaleX(0.45/this._rightBack.getScaleX());
                finishSpr.setScaleY(0.45/this._rightBack.getScaleY());
                finishSpr.setPosition(cellPos);
            }
            if(tag != currentTag)
            {
                cell.setEnabled(false);
            }
            if(bonus[i] != null)
            {
                if(bonus[i][0] instanceof SignType_Items)
                {
                    var frame = bonus[i][0]._prototype.SPRITESOURCE;
                    var spr = cc.Sprite.createWithSpriteFrameName(frame);
                    spr.setScaleX(0.62/this._rightBack.getScaleX());
                    spr.setScaleY(0.62/this._rightBack.getScaleY());
                }
                if(bonus[i][0] instanceof SignType_Money)
                {
                    var spr = cc.Sprite.createWithSpriteFrameName("icon_diamond_0.png");
                    spr.setScaleX(1/this._rightBack.getScaleX());
                    spr.setScaleY(1/this._rightBack.getScaleY());
                }
                if(bonus[i][0] instanceof SignType_Continue)
                {
                    var spr = cc.Sprite.createWithSpriteFrameName("icon_continue.png");
                    spr.setScaleX(0.62/this._rightBack.getScaleX());
                    spr.setScaleY(0.62/this._rightBack.getScaleY());
                }
                this._rightBack.addChild(spr, 2);
                //spr.setAnchorPoint(cc.p(0, 1));
                spr.setPosition(cc.pAdd(cellPos, cc.p(50 * Defines.BASE_SCALE, -50 * Defines.BASE_SCALE)));

                //var numberIndex = GUI.createNumberLabel(i+1, _GUIPath + "Num/num_0_10x10.png", 10, 10, "0");
                var numberIndex = GUI.createNumberLabel(i+1, _GUIPath + "Num/num_sign_18_22.png", 18, 22, "0");
                this._rightBack.addChild(numberIndex, 4);
                numberIndex.setPosition(cc.pAdd(cellPos, cc.p(0 * Defines.BASE_SCALE, -20 * Defines.BASE_SCALE)));
            }

        }
    },

    addSignBonus: function()
    {


    },
    btnCloseCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        this.closeWindow();
    },

    btnSignInCallback: function(sender)
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        cc.log("sign in call" + sender.getTag());
        if(!this.canSignIn())
        {
            return;
        }
        var finishSpr = cc.Sprite.createWithSpriteFrameName("sign_finish.png");
        this._rightBack.addChild(finishSpr, 3);
        finishSpr.setAnchorPoint(cc.p(0, 1));
        finishSpr.setScaleX(0.45/this._rightBack.getScaleX());
        finishSpr.setScaleY(0.45/this._rightBack.getScaleY());
        finishSpr.setPosition(sender.getPosition());

        cc.DataMng.getDataSignIn().updateDataAfterSignIn();
        sender.setEnabled(false);
        //this._test(sender);

    },

    _test: function(sender)
    {
        this._currentIndex.setValue(cc.DataMng.getDataSignIn().getCurrentContinueSignCount());
        if(this._currentIndex.getValue() == sender.getTag() + 1 - this._static().CONTENT_TAG.SIGN_CELL_BASE)
        {
            var cell = this._signMenu.getChildByTag(sender.getTag() + 1);
            if(cell)
            {
                cell.setEnabled(true);
            }
        }
    },

    canSignIn: function()
    {
        return !cc.DataMng.getDataSignIn().isSignedToday();
    },

    openWindow: function(render)
    {
        cc.AudioMng.getInstance().playOpenWindow();
        this._super(render);

        cc.ResourceMng.getInstance().addToCache(
            Resource._GUISignBonus_plist,
            Resource._GUISignBonus_png);
        this.addContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        cc.AudioMng.getInstance().playCloseWindow();
        this._super();
        this.getWindow().removeAllChildren(true);
        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUISignBonus_plist,
            Resource._GUISignBonus_png);

        Scene_MainMap.changeTo();
        return this;
    }
});


cc.GUISignBonus._instance = null;
cc.GUISignBonus.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUISignBonus();
        this._instance.init();
    }

    return this._instance;
};