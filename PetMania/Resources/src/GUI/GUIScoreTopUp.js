//======================================================================================================================
//超越好友的分析策略
var GUIScoreTopUpStrategy = cc.Class.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(gameLevel/*, isSpace*//*, test*/)
    {
        cc.log("创建一个策略 GUIScoreTopUpStrategy");

        //
        this.gameLevel = gameLevel;

        //
        this.lastTop = 0;
        this.currentTop = 0;
        this.passFriend = null;
        this.mySelf = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    getGameLevel: function()
    {
        return this.gameLevel;
    },

    //------------------------------------------------------------------------------------------------------------------
    getFriend: function()
    {
        return this.passFriend;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMySelf: function()
    {
        return this.mySelf;
    },

    //------------------------------------------------------------------------------------------------------------------
    isActive: function()
    {
        return this.getFriend();
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "GUIScoreTopUpStrategy, lastTop = " + this.lastTop
            + ", currentTop = " + this.currentTop + ", passFriend = " + (this.passFriend || "???");
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function()
    {
        this._handle();
        cc.log("handle = " + this);
        return this;
    },


    //------------------------------------------------------------------------------------------------------------------
    getScoreValue: function(src)
    {
        return (src instanceof FriendInfoSelf) ? src.getLastGameLevelScore(this.getGameLevel())
            : src.getGameLevelScore(this.getGameLevel());
    },

    //------------------------------------------------------------------------------------------------------------------
    parseSelfTopPos: function(_top)
    {
        for (var indx = 0; indx < _top.length; ++indx)
        {
            if (_top[indx] instanceof FriendInfoSelf)
            {
                return indx;
            }
        }

        return 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    logTop: function(_top, description)
    {
        var self = this;

        //
        cc.log("------------------------------------------------------------------------");
        cc.log("description = " + description);
        _top.forEach(
            function(each, indx)
            {
                if (each instanceof FriendInfoSelf)
                {
                    cc.log("top = " + indx + " :" + each.getName()
                        + ", last = " + each.getLastGameLevelScore(self.getGameLevel())
                        + ", cur = " + each.getGameLevelScore(self.getGameLevel())
                    );
                }
                else
                {
                    cc.log("top = " + indx + ":" + each.getName() + ", " + each.getGameLevelScore(self.getGameLevel()));
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _handle: function()
    {
        var self = this;

        //
        var top = FriendsMng.getInstance().getFriendsInfos().concat();

        //
        top = top.filter(
            function(a_friend)
            {
                return self.getScoreValue(a_friend) > 0;
            }
        );

        //
        top = top || [];

        //
        var friendInfoSelf = FriendInfo.createSelf(this.getGameLevel());
        top.unshift(friendInfoSelf);

        ///
        this.logTop(top, "原始");

        //按着分数大小排列
        top.sort(
            function(left, right)
            {
                return self.getScoreValue(left) > self.getScoreValue(right) ? -1 : 1;
            }
        );

        this.logTop(top, "第1次排序后");
        var lastPos = this.parseSelfTopPos(top);

        //按着分数大小排列
        top.sort(
            function(left, right)
            {
                return left.getGameLevelScore(self.getGameLevel()) > right.getGameLevelScore(self.getGameLevel()) ? -1 : 1;
            }
        );

        //
        this.logTop(top, "第2次排序后");
        var curPos = this.parseSelfTopPos(top);

        //
        cc.log("上一次的位置 = " + lastPos);
        cc.log("上一次的分数 = " + friendInfoSelf.getLastGameLevelScore(self.getGameLevel()));

        cc.log("新的位置 = " + curPos);
        cc.log("新的分数 = " + friendInfoSelf.getGameLevelScore(self.getGameLevel()));

        //
        if (curPos < lastPos)
        {
            //
            this.lastTop = lastPos;
            this.currentTop = curPos;

            //
            this.passFriend = top[curPos + 1];
            this.mySelf = friendInfoSelf;

            //cc.log("超越了= " + this.passFriend.getName());

            //
            this._updateNewLastScore();
        }

        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    _updateNewLastScore: function()
    {
        //
        var levelData = cc.DataMng.getInstance().getLevelDataWithName(this.getGameLevel());
        if (levelData)
        {
            //
            var historyScore = levelData.HISTORY_MAX_SCORE.get();
            levelData.LAST_HISTORY_MAX_SCORE.set(historyScore);
            levelData.LAST_HISTORY_MAX_SCORE.save();
        }

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------

});

GUIScoreTopUpStrategy.create = function(gameLevel)
{
    var createNew = new GUIScoreTopUpStrategy(gameLevel, false, false);
    createNew.handle();
    return createNew.isActive() ? createNew : null;
};

//======================================================================================================================
cc.GUIScoreTopUp = cc.GUIWindow.extend ({

    //
    SPRITE_TAG:
    {
        PHOTO: 999,      //照片
        NAME: 1000,      //名字
        SCORE: 1001      //分数
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUIScoreTopUp";
    },

    //------------------------------------------------------------------------------------------------------------------
    _static: function()
    {
        return cc.GUIScoreTopUp.prototype;
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //控件
        this.m_ShareButton = null;
        this.m_TopLabTop = null;
        this.m_TopLabBottom = null;

        //保存一个策略就成
        this._strategy = null;

        //关闭回调函数
        //this.closeWindowCallBack = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _addShareButton: function()
    {
        //
        this.m_ShareButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_share_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_share_sel.png"),
            this.handleShareButton,
            this);

        //
        var positionShareButton = Defines.IS_KO ? cc.p(_ScreenBottom().x, _ScreenBottom().y + 150 * Defines.BASE_SCALE) :
                                                    cc.p(_ScreenBottom().x, _ScreenBottom().y + 50 * Defines.BASE_SCALE);
        this.m_ShareButton.setPosition(positionShareButton);
        this.m_ShareButton.setAnchorPoint(cc.p(0.5, 0.5));

        //
        var menu = cc.Menu.create(this.m_ShareButton);
        this.getWindow().addChild(menu);
        menu.setPosition(cc.p(0, 0));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    decorateLabel: function(lab)
    {
        lab.removeAllChildren();

        //
        var photo = cc.Sprite.createWithSpriteFrameName("map_photo_bg.png"/*"general_friend_frame_light.png"*/);
        lab.addChild(photo, 0, this._static().SPRITE_TAG.PHOTO);
        photo.setPosition(cc.p(-30 * Defines.BASE_SCALE, lab.getContentSize().height/2));

        //
        var name = cc.LabelTTF.create("名字名字名字", Defines.DefaultFont, 18 * Defines.BASE_SCALE);
        lab.addChild(name, 0, this._static().SPRITE_TAG.NAME);
        name.setAnchorPoint(cc.p(0.5, 0.5));
        name.setPosition(cc.p(100 * Defines.BASE_SCALE, lab.getContentSize().height/2 + 5*Defines.BASE_SCALE));

        //
        var scoreLab = GUI.createNumberLabel("1234567",
            _GUIPath + "Num/num_2_20x24.png",
            20, 24, ".");

        lab.addChild(scoreLab, 0, this._static().SPRITE_TAG.SCORE);
        scoreLab.setAnchorPoint(cc.p(0.5, 0.5));
        scoreLab.setPosition(cc.p(260 * Defines.BASE_SCALE, lab.getContentSize().height/2));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        var self = this;

        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 100));
        this.getWindow().addChild(blockLayer, -1);

        //上面的板子
        this.m_TopLabTop = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back8.png");
        this.getWindow().addChild(this.m_TopLabTop);
        this.m_TopLabTop.setPosition(cc.p(_ScreenCenter().x - 50 * Defines.BASE_SCALE, _ScreenCenter().y + 50 * Defines.BASE_SCALE));
        this.decorateLabel(this.m_TopLabTop);

        //下面的板子
        this.m_TopLabBottom = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back7.png");
        this.getWindow().addChild(this.m_TopLabBottom);
        this.m_TopLabBottom.setPosition(cc.p(_ScreenCenter().x + 50 * Defines.BASE_SCALE, _ScreenCenter().y - 50 * Defines.BASE_SCALE));
        this.decorateLabel(this.m_TopLabBottom);

        //关闭按钮
        GUI._AddCloseButton(this.getWindow(), this.closeWindow, this);

        //分享按钮
        this._addShareButton();

        //超越好友的字
        var topTxt = cc.Sprite.createWithSpriteFrameName("general_surpass_txt2.png");
        this.getWindow().addChild(topTxt, 1000);
        topTxt.setPosition(cc.p(_ScreenCenter().x + 20 * Defines.BASE_SCALE, _ScreenCenter().y + 180 * Defines.BASE_SCALE));

        //不知道写的什么的label，只用于韩国版
        if(Defines.IS_KO)
        {
            var labelTxt = cc.LabelTTF.create(Resource.KoreanTxt["scroe_topup"],Defines.DefaultFont,28*Defines.BASE_SCALE);
            labelTxt.setPosition(cc.p(_ScreenWidth()/2,60*Defines.BASE_SCALE));
            this.getWindow().addChild(labelTxt);
        }

        //添加我的内容
//        var testInfo = {
//            getPhotoUrl: function(){ return "";},
//            getName: function(){return "testName";},
//            getGameLevelScore: function(){return 99999;}
//        };

        this._addContentFriendInfo(this._strategy.getMySelf()/*testInfo*/, this.m_TopLabBottom, this._strategy.getGameLevel()/*1*/);

        //添加好友的内容
        this._addContentFriendInfo(this._strategy.getFriend()/*testInfo*/, this.m_TopLabTop, this._strategy.getGameLevel()/*1*/);

        //加动作?????
        var topPath = [this.m_TopLabTop.getPosition(), _ScreenLeft(), this.m_TopLabBottom.getPosition()];
        var bottomPath = [this.m_TopLabBottom.getPosition(), _ScreenRight(), this.m_TopLabTop.getPosition()];

        this.m_TopLabTop.runAction(cc.Sequence.create(
            cc.DelayTime.create(Defines.FPS * 45),
            cc.BezierTo.create(Defines.FPS * 45, topPath)
        ));

        this.m_TopLabBottom.runAction(cc.Sequence.create(
            cc.DelayTime.create(Defines.FPS * 45),
            cc.BezierTo.create(Defines.FPS * 45, bottomPath)
        ));

        //背景特效
        //
        var backgroundLight = cc.Sprite.create(_GUIPath + "GUIGameLevel_Start_EndWin_EndFail/score_top_up_light.png");
        this.getWindow().addChild(backgroundLight, -1);
        backgroundLight.setPosition(cc.p(_ScreenCenter().x - 50 * Defines.BASE_SCALE, _ScreenCenter().y + 50 * Defines.BASE_SCALE));
        backgroundLight.setOpacity(0);

        //
        backgroundLight.runAction(cc.Sequence.create(
            cc.DelayTime.create(Defines.FPS * 78),
            cc.CallFunc.create(function(){
                backgroundLight.runAction(cc.FadeIn.create(0.3));
                backgroundLight.runAction(cc.RepeatForever.create(cc.RotateBy.create(18, 360)));
            }),
            cc.DelayTime.create(Defines.FPS * 50),
            cc.CallFunc.create(function()
            {
                if(Defines.IS_KO)
                {
                    self._playSeal();
                }
            })
        ));


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _playSeal: function()
    {
        //光圈
        var spriteLight = cc.Sprite.createWithSpriteFrameName("seal_light.png");
        spriteLight.setPosition(cc.p(_ScreenWidth()/2,_ScreenHeight()/2));
        spriteLight.setScale(2.0);
        spriteLight.setVisible(false);
        this.getWindow().addChild(spriteLight);



        //印章
        var spriteSeal = cc.Sprite.createWithSpriteFrameName("topup_seal.png");
        spriteSeal.setPosition(cc.p(_ScreenWidth()/2,_ScreenHeight()/2));
        spriteSeal.setScale(6.5);
        spriteSeal.setRotation(-40);
        spriteSeal.setVisible(false);
        this.getWindow().addChild(spriteSeal);


        var self = this;
        var funcLightParticle = function()
        {
            //粒子
            var particleSeal = cc.ParticleSystem.create(Resource.yinzhang_plist);
            particleSeal.setPosition(cc.p(_ScreenWidth()/2,_ScreenHeight()/2));
            particleSeal.setScale(Defines.BASE_SCALE*2);
            self.getWindow().addChild(particleSeal);
        };

        var funcSealLightAction = function()
        {
            spriteLight.setVisible(true);
            spriteLight.runAction(cc.Spawn.create(
                cc.FadeOut.create(Defines.FPS*30),
                cc.CallFunc.create(funcLightParticle)
            ));
        };

        spriteSeal.setVisible(true);
        spriteSeal.runAction(cc.Sequence.create(
                cc.ScaleTo.create(Defines.FPS*10,1.0,1.0),
//                cc.DelayTime.create(Defines.FPS*20),
                cc.CallFunc.create(funcSealLightAction)
        ));
    },

    //------------------------------------------------------------------------------------------------------------------
    _addContentFriendInfo: function(friendInfo, lab, gameLevel)
    {
        //照片
        var photoBack = lab.getChildByTag(this._static().SPRITE_TAG.PHOTO);
        photoBack.removeAllChildren();

        var photoUrl = friendInfo.getPhotoUrl();

        if (photoUrl != "")
        {
            cc.log("_addContentFriendInfo, photoUrl: " + photoUrl);
            var photo = cc.Sprite.create(photoUrl);
        }

        if(!photo)
        {
            photo = cc.Sprite.createWithSpriteFrameName("general_default_photo_1.png");
        }

        if (photo)
        {
            //
            photoBack.addChild(photo);
            photo.setPosition(cc.p(photoBack.getContentSize().width/2, photoBack.getContentSize().height/2));
            photo.setScaleX(55 * Defines.BASE_SCALE /photo.getContentSize().width);
            photo.setScaleY(55 * Defines.BASE_SCALE /photo.getContentSize().height);
        }

        //名字
        lab.getChildByTag(this._static().SPRITE_TAG.NAME).setString(friendInfo.getName());

        //添加分数
        lab.getChildByTag(this._static().SPRITE_TAG.SCORE).setString(friendInfo.getGameLevelScore(gameLevel).toString());

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleShareButton: function()
    {
        //
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        var levelData = cc.GUIGameLevelEndWin.getInstance().m_LevelData;
        var friendInfo = this._strategy.getFriend();
        var myInfo = this._strategy.getMySelf();
//        friendInfo = {
//            getName: function(){return "testName";}
//        };


        //
        var callFunc = function()
        {
            ShareMng.getInstance().shareWithScoreTopUp(levelData, friendInfo);
        };

        if(Defines.IS_KO)
        {
            cc.GUITopupShare.getInstance().openWindow(this.getWindow().getParent(), callFunc, myInfo, friendInfo,this._strategy.getGameLevel());
        }
        else
        {
            cc.GUIPopupShare.getInstance().openWindow(this.getWindow().getParent(), callFunc);
        }


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, _GUIScoreTopUpStrategy/*, callBack*/)
    {
        this._super(render);
        this.getWindow().removeAllChildren(true);

        //打开需要一个策略
        this._strategy = _GUIScoreTopUpStrategy;
        cc.log("this._strategy = " + this._strategy);
        if (!this._strategy)
        {
            cc.Assert(0, "!this._strategy.isActive()");
        }

        //需要一个关闭界面的回掉函数
        //this.closeWindowCallBack = callBack;

        //添加内容
        this.addContent();

        //每个页面只可以分享奖励一次
        ShareMng.getInstance().setCanBonus(true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();
        cc.AudioMng.getInstance().playCloseWindow();
        //
        this.getWindow().removeAllChildren(true);

        //
        var myScene = cc.GUIMap.getInstance().getWindow().getParent();
        cc.GUIGameLevelEndWin.getInstance().openWindow(myScene);

        //
        if(!isTelcomOperators()&& cc.NodeSelf.getInstance().isLogin())
        {
            cc.GUIMyFriendsTop.getInstance().openWindow(myScene, cc.GUIGameLevelEndWin.getInstance());
        }

        //每个页面只生成一个分享Code
        ShareMng.getInstance().cleanup();

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});


cc.GUIScoreTopUp._instance = null;
cc.GUIScoreTopUp.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIScoreTopUp();
        this._instance.init();
    }

    return this._instance;
};
