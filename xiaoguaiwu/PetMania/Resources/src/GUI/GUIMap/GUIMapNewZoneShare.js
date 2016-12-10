
//======================================================================================================================
cc.GUIMapNewZoneShare = cc.GUIWindow.extend({

    description: function ()
    {
        return "GUIMapNewZoneShare";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        this.m_Menu = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setContent: function()
    {
        //
        var winSize = cc.Director.getInstance().getWinSize();

        //
        var background = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(background, -1);

        //
        this.m_Menu = cc.Menu.create();
        this.m_Menu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(this.m_Menu, 1);

        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(cc.p(winSize.width * 0.96, winSize.height * 0.94));
        this.m_Menu.addChild(buttonClose);

        //
        if (ShareMng.getInstance().isValid())
        {
            var buttonShare = cc.MenuItemSprite.create(
                cc.Sprite.createWithSpriteFrameName("general_btn_share_nor.png"),
                cc.Sprite.createWithSpriteFrameName("general_btn_share_sel.png"),
                this._btnShareCallback, this);
            buttonShare.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.1));

            this.m_Menu.addChild(buttonShare);
        }

        //当前是新区域第一关
        var processKey = cc.DataMng.getInstance().getMaxProcessLevelKey();
        if (processKey == "SPACE_LEVEL_" + (cc.GUIMapMng.getInstance().getMaxSpaceLevelID() + 1))
        {
            //
            var tempFrame = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png");
            var srcSize = tempFrame.getContentSize();

            //
            var labelFrame = cc.Scale9Sprite.create(
                _GUIPath + "GUINewGeneral/general_back9.png",
                cc.rect(0, 0, srcSize.width, srcSize.height),
                cc.rect(srcSize.width * 0.3, srcSize.height * 0.3, srcSize.width * 0.4, srcSize.height * 0.4));

            //
            var frameSize = cc.size(500 * Defines.BASE_SCALE, 188 * Defines.BASE_SCALE);
            labelFrame.setContentSize(frameSize);
            this.getWindow().addChild(labelFrame, -1);
            labelFrame.setPosition(cc.p(winSize.width * 0.55, winSize.height * 0.55));

            //
            var lastLabel = cc.LabelTTF.create(Resource.ChineseTxt["space_7"], Defines.DefaultFont, 18 * Defines.BASE_SCALE);
            labelFrame.addChild(lastLabel);
            lastLabel.setPosition(cc.p(frameSize.width * 0.5, frameSize.height * 0.5));

            //
            var spriteBoy = cc.Sprite.createWithSpriteFrameName("Images_boy_0.png");
            this.getWindow().addChild(spriteBoy);
            spriteBoy.setPosition(cc.p(winSize.width * 0.25, winSize.height * 0.6));

            var spriteMons = cc.Sprite.createWithSpriteFrameName("Images_monster_0.png");
            spriteBoy.addChild(spriteMons);
            var boySize = spriteBoy.getContentSize();
            spriteMons.setPosition(cc.p(0/*-boySize.width * 0.1*/, boySize.height * 0.2));

            var labelUnlockAll = cc.Sprite.createWithSpriteFrameName("map_label_unlock_all.png");
            spriteBoy.addChild(labelUnlockAll);
            labelUnlockAll.setPosition(cc.p(boySize.width - 50 * Defines.BASE_SCALE, -20 * Defines.BASE_SCALE));

            //
            buttonClose.setPosition(cc.pAdd(labelFrame.getPosition(),
                cc.p(frameSize.width * 0.5 - 10 * Defines.BASE_SCALE, frameSize.height * 0.5 - 10 * Defines.BASE_SCALE)));
        }
        else
        {
            this.getWindow().runAction(cc.Sequence.create(
                cc.DelayTime.create(0.2),
                cc.CallFunc.create(function()
                    {
                        var toNewArmature = cc.ArmatureDataMng.getNewZone() ?
                            cc.ArmatureDataMng.getNewZone().createArmature() : null;

                        if (toNewArmature)
                        {
                            this.getWindow().addChild(toNewArmature);
                            toNewArmature.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.65));
                            toNewArmature.getAnimation().playByIndex(0, 0);
                            toNewArmature.getAnimation().setAnimationScale(25/60);
                        }

                    }, this)
            ));
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback: function()
    {
        //
        cc.GUIMap.getInstance().setZonesEnabled(true);
        cc.GUIMap.getInstance().handleMapEnterAction(true);

        //
        if (this.isWindowOpen())
        {
            this.closeWindow();
        }

        //
        var maxLevelData = cc.DataMng.getInstance().getMaxProcessLevelData();
        if (maxLevelData.IS_SPACE_LEVEL && maxLevelData.ID >= cc.GUIMapMng.getInstance().getMaxSpaceLevelID())
        {
            return this;
        }

        //
        cc.GUIMapMng.getInstance().update();
        cc.GUIMapMng.getInstance().autoEnterNewZone();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnShareCallback: function()
    {
        var allFinish = false;
        var processKey = cc.DataMng.getInstance().getMaxProcessLevelKey();
        if (processKey == "SPACE_LEVEL_" + (cc.GUIMapMng.getInstance().getMaxSpaceLevelID() + 1))
        {
            allFinish = true;
            cc.DataMng.getInstance().setLastLevelShared(true);
        }

        //
        var mapItem = cc.GUIMapMng.getInstance().getMaxProcessMapItem();
        var mapZoneID = mapItem.getMapZone().getMapDefine().ID;

        //
        var callFunc = function()
        {
            ShareMng.getInstance().shareWithNewMapStar(mapZoneID, allFinish);
        };

        cc.GUIPopupShare.getInstance().openWindow(this.getWindow().getParent(), callFunc);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, lastZone)
    {
        if (Defines.IS_KO || (!lastZone && Defines.IS_SMALL))
        {
            this._btnCloseCallback();
            return this;
        }

        this._super(render);

        //
        if (cc.ArmatureDataMng.getNewZone())
        {
            cc.ArmatureDataMng.getNewZone().register();
        }

        //
        this.setContent();

        //
        if (!cc.DataMng.getInstance().isLastLevelShared())
        {
            //通关界面没有分享过才有奖励
            ShareMng.getInstance().setCanBonus(true);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        //
        this.getWindow().removeAllChildren(true);

        //每个页面只生成一个分享Code
        ShareMng.getInstance().cleanup();

        //
        if (cc.ArmatureDataMng.getNewZone())
        {
            cc.ArmatureDataMng.getNewZone().removeArmaturesTexCache();
        }

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIMapNewZoneShare._instance = null;
cc.GUIMapNewZoneShare.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIMapNewZoneShare();
        this._instance.init();
    }

    return this._instance;
};