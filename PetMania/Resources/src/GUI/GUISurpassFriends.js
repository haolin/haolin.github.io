
var GUISurpassFriends_PositionsStrategy = cc.IObject.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //每个照片的位置
        this._positions = [];

        //下方文字的高度
        this._bottomPosHeight = 60 * Defines.BASE_SCALE;

        //所有子策略
        this._subPositionsStrategy = {};
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "GUISurpassFriends_PositionsStrategy";
    },

    //------------------------------------------------------------------------------------------------------------------
    prepare: function()
    {
        this._positions = [];
        this._bottomPosHeight = 60 * Defines.BASE_SCALE;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function(size, backgroundCenter, width, height)
    {
        //策略分析开始，拿出一个子策略进行分析
        var subStrategy = this._subPositionsStrategy[size];
        if (subStrategy)
        {
            //需要这些参数
            subStrategy(backgroundCenter, width, height, this);
        }
        else
        {
            //cc.log("错误! 没有" + size + "位置的策略");
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getPositions: function()
    {
        return this._positions;
    },

    //------------------------------------------------------------------------------------------------------------------
    getBottomPosHeight: function()
    {
        return this._bottomPosHeight;
    },

    //------------------------------------------------------------------------------------------------------------------
    registerSubStrategy: function(size, strategyFunc)
    {
        this._subPositionsStrategy[size] = strategyFunc;
        return this;
    }
});

//----------------------------------------------------------------------------------------------------------------------
GUISurpassFriends_PositionsStrategy._SubStrategy1 = function(center, width, height, strategy)
{
    ////cc.log("超越1个人的位置策略");

    //
    strategy._positions = [
        cc.p(center.x + width * 1.5, center.y - height/2)
    ];

    //
    strategy._bottomPosHeight = 90 * Defines.BASE_SCALE;
    return strategy;
};

//----------------------------------------------------------------------------------------------------------------------
GUISurpassFriends_PositionsStrategy._SubStrategy2 = function(center, width, height, strategy)
{
    //cc.log("超越2个人的位置策略");

    //
    strategy._positions = [
        cc.p(center.x + width - 20 * Defines.BASE_SCALE, center.y - height/2),
        cc.p(center.x + width * 2 + 20 * Defines.BASE_SCALE, center.y - height/2)
    ];

    //
    strategy._bottomPosHeight = 90 * Defines.BASE_SCALE;
    return strategy;
};

//----------------------------------------------------------------------------------------------------------------------
GUISurpassFriends_PositionsStrategy._SubStrategy3 = function(center, width, height, strategy)
{
    //cc.log("超越3个人的位置策略");

    //
    strategy._positions = [
        cc.p(center.x + width * 1.5, center.y - height/2),
        cc.p(center.x + width * 1.5 - 100 * Defines.BASE_SCALE, center.y - height/2),
        cc.p(center.x + width * 1.5 + 100 * Defines.BASE_SCALE, center.y - height/2)
    ];

    //
    strategy._bottomPosHeight = 90 * Defines.BASE_SCALE;
    return strategy;
};

//----------------------------------------------------------------------------------------------------------------------
GUISurpassFriends_PositionsStrategy._SubStrategy4 = function(center, width, height, strategy)
{
    //cc.log("超越4个人的位置策略");

    //
    width *= 1.35;
    center.x -= 35 * Defines.BASE_SCALE;

    //
    strategy._positions = [
        cc.p(center.x, center.y - height/2),
        cc.p(center.x + width, center.y - height/2),
        cc.p(center.x + width * 2, center.y - height/2),
        cc.p(center.x + width * 3, center.y - height/2)
    ];

    //
    strategy._bottomPosHeight = 90 * Defines.BASE_SCALE;
    return strategy;
};

//----------------------------------------------------------------------------------------------------------------------
GUISurpassFriends_PositionsStrategy._SubStrategy5 = function(center, width, height, strategy)
{
    //cc.log("超越5个人的位置策略");

    //
    strategy._positions = [

        //
        cc.p(center.x + width * 1.5, center.y),
        cc.p(center.x + width * 1.5 - 100 * Defines.BASE_SCALE, center.y),
        cc.p(center.x + width * 1.5 + 100 * Defines.BASE_SCALE, center.y),

        //
        cc.p(center.x + width - 20 * Defines.BASE_SCALE, center.y - height - 10 * Defines.BASE_SCALE),
        cc.p(center.x + width * 2 + 20 * Defines.BASE_SCALE, center.y - height - 10 * Defines.BASE_SCALE)
    ];

    //
    strategy._bottomPosHeight = 60 * Defines.BASE_SCALE;
    return strategy;
};

//----------------------------------------------------------------------------------------------------------------------
GUISurpassFriends_PositionsStrategy._SubStrategy6 = function(center, width, height, strategy)
{
    //cc.log("超越6个人的位置策略");

    //
    strategy._positions = [

        //
        cc.p(center.x + width * 1.5, center.y),
        cc.p(center.x + width * 1.5 - 100 * Defines.BASE_SCALE, center.y),
        cc.p(center.x + width * 1.5 + 100 * Defines.BASE_SCALE, center.y),

        //
        cc.p(center.x + width * 1.5, center.y - height - 10 * Defines.BASE_SCALE),
        cc.p(center.x + width * 1.5 - 100 * Defines.BASE_SCALE, center.y - height - 10 * Defines.BASE_SCALE),
        cc.p(center.x + width * 1.5 + 100 * Defines.BASE_SCALE, center.y - height - 10 * Defines.BASE_SCALE)
    ];

    //
    strategy._bottomPosHeight = 60 * Defines.BASE_SCALE;
    return strategy;
};

//----------------------------------------------------------------------------------------------------------------------
GUISurpassFriends_PositionsStrategy._SubStrategy7 = function(center, width, height, strategy)
{
    //cc.log("超越7个人的位置策略");

    //
    width *= 1.35;
    center.x -= 35 * Defines.BASE_SCALE;

    //
    strategy._positions = [

        //
        cc.p(center.x, center.y),
        cc.p(center.x + width, center.y),
        cc.p(center.x + width * 2, center.y),
        cc.p(center.x + width * 3, center.y),

        //
        cc.p(center.x + width * 1.5, center.y - height - 10 * Defines.BASE_SCALE),
        cc.p(center.x + width * 1.5 - 100 * Defines.BASE_SCALE, center.y - height - 10 * Defines.BASE_SCALE),
        cc.p(center.x + width * 1.5 + 100 * Defines.BASE_SCALE, center.y - height - 10 * Defines.BASE_SCALE)
    ];

    //
    strategy._bottomPosHeight = 60 * Defines.BASE_SCALE;
    return strategy;
};

//----------------------------------------------------------------------------------------------------------------------
GUISurpassFriends_PositionsStrategy._SubStrategy8 = function(center, width, height, strategy)
{
    //cc.log("超越8个人的位置策略");

    //
    width *= 1.35;
    center.x -= 35 * Defines.BASE_SCALE;

    //
    strategy._positions = [

        cc.p(center.x, center.y),
        cc.p(center.x + width, center.y),
        cc.p(center.x + width * 2, center.y),
        cc.p(center.x + width * 3, center.y),

        cc.p(center.x, center.y - height - 10 * Defines.BASE_SCALE),
        cc.p(center.x + width, center.y - height - 10 * Defines.BASE_SCALE),
        cc.p(center.x + width * 2, center.y - height - 10 * Defines.BASE_SCALE),
        cc.p(center.x + width * 3, center.y - height - 10 * Defines.BASE_SCALE)
    ];

    //
    strategy._bottomPosHeight = 60 * Defines.BASE_SCALE;
    return strategy;
};

//----------------------------------------------------------------------------------------------------------------------
GUISurpassFriends_PositionsStrategy.create = function()
{
    //总策略
    var createNew = new GUISurpassFriends_PositionsStrategy();

    //添加8个子策略
    createNew.registerSubStrategy(1, GUISurpassFriends_PositionsStrategy._SubStrategy1);
    createNew.registerSubStrategy(2, GUISurpassFriends_PositionsStrategy._SubStrategy2);
    createNew.registerSubStrategy(3, GUISurpassFriends_PositionsStrategy._SubStrategy3);
    createNew.registerSubStrategy(4, GUISurpassFriends_PositionsStrategy._SubStrategy4);
    createNew.registerSubStrategy(5, GUISurpassFriends_PositionsStrategy._SubStrategy5);
    createNew.registerSubStrategy(6, GUISurpassFriends_PositionsStrategy._SubStrategy6);
    createNew.registerSubStrategy(7, GUISurpassFriends_PositionsStrategy._SubStrategy7);
    createNew.registerSubStrategy(8, GUISurpassFriends_PositionsStrategy._SubStrategy8);

    //
    return createNew;
};

//======================================================================================================================
cc.GUISurpassFriends = cc.GUIWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUISurpassFriends";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        //
        this.m_BackGround = null;
        this.m_ShareButton = null;
        this.m_SurpassFriends = [];
        this.m_PositionsStrategy = GUISurpassFriends_PositionsStrategy.create();
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getPositionsStrategy: function()
    {
        return this.m_PositionsStrategy;
    },

    //------------------------------------------------------------------------------------------------------------------
    preparePhotoBacks: function()
    {
        //
        var self = this;
        var backRes = "map_photo_bg.png";//"general_friend_frame_light.png";

        //好友头像
        var size = cc.Sprite.createWithSpriteFrameName(backRes).getContentSize();
        var width = size.width * 1.2;
        var height = size.height * 1.2;

        //
        var center = cc.p(this.m_BackGround.getContentSize().width/2, this.m_BackGround.getContentSize().height/2 - 5 * Defines.BASE_SCALE);
        center.x -= width * 1.5;
        center.y += height/2;

        //
       /* var positions = [
            cc.p(center.x, center.y),
            cc.p(center.x + width, center.y),
            cc.p(center.x + width * 2, center.y),
            cc.p(center.x + width * 3, center.y),

            cc.p(center.x, center.y - height),
            cc.p(center.x + width, center.y - height),
            cc.p(center.x + width * 2, center.y - height),
            cc.p(center.x + width * 3, center.y - height)
        ];*/

        //
        this.getPositionsStrategy().handle(this.m_SurpassFriends.length, center, width, height);



        this.getPositionsStrategy().getPositions().forEach(
            function(a_pos, index)
            {
                var photo = cc.Sprite.createWithSpriteFrameName(backRes);
                self.m_BackGround.addChild(photo, 0, index * 1000);
                photo.setPosition(a_pos);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentFriendsPhotos: function()
    {
        this.preparePhotoBacks();

        //
        var self = this;
        /*var max = 8;

        //
        this.m_SurpassFriends = this.m_SurpassFriends.slice(0, max);*/

        for (var index = 0; index < this.getPositionsStrategy().getPositions().length; ++index)
        {
            if (index < this.m_SurpassFriends.length)
            {
                this.m_BackGround.getChildByTag(index * 1000).setVisible(true);

                var photoUrl = this.m_SurpassFriends[index].getPhotoUrl();
                if (photoUrl != "")
                {
                    var back = self.m_BackGround.getChildByTag(index * 1000);
                    back.setVisible(true);

                    //
                    var photo = cc.Sprite.create(photoUrl);
                    if (photo)
                    {
                        //
                        back.addChild(photo);
                        photo.setPosition(cc.p(back.getContentSize().width/2, back.getContentSize().height/2));
                        photo.setScaleX(55 * Defines.BASE_SCALE /photo.getContentSize().width);
                        photo.setScaleY(55 * Defines.BASE_SCALE /photo.getContentSize().height);
                    }
                }
            }
            else
            {
                this.m_BackGround.getChildByTag(index * 1000).setVisible(false);
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 100));
        this.getWindow().addChild(blockLayer, -1);

        //
        this.m_BackGround = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back2.png");
        this.getWindow().addChild(this.m_BackGround);
        this.m_BackGround.setPosition(_ScreenCenter());

        GUI._AddCloseButton(this.m_BackGround, this.closeWindow, this);

        //
        var backFrame = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back6.png");
        this.m_BackGround.addChild(backFrame);
        backFrame.setPosition(cc.p(this.m_BackGround.getContentSize().width/2,
            this.m_BackGround.getContentSize().height/2 - 25 * Defines.BASE_SCALE));

        //
        this.m_ShareButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_share_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_share_sel.png"),
            this.handleShareButton,
            this);

        //
        this.m_ShareButton.setPosition(cc.p(_ScreenBottom().x, _ScreenBottom().y + 50 * Defines.BASE_SCALE));
        this.m_ShareButton.setAnchorPoint(cc.p(0.5, 0.5));

        //
        var menu = cc.Menu.create(this.m_ShareButton);
        this.getWindow().addChild(menu);
        menu.setPosition(cc.p(0, 0));

        //
        this.addContentFriendsPhotos();

        //
        var bottomTxt = cc.Sprite.createWithSpriteFrameName("general_surpass_txt0.png");
        this.m_BackGround.addChild(bottomTxt, 1000);
        bottomTxt.setPosition(cc.p(this.m_BackGround.getContentSize().width/2, this.getPositionsStrategy().getBottomPosHeight()/*60 * Defines.BASE_SCALE*/));

        //
        var topTxt = cc.Sprite.createWithSpriteFrameName("general_surpass_txt1.png");
        this.m_BackGround.addChild(topTxt, 1000);
        topTxt.setPosition(
            cc.p(this.m_BackGround.getContentSize().width/2,
                this.m_BackGround.getContentSize().height - 25 * Defines.BASE_SCALE)
        );

        //
        var monster = cc.Sprite.createWithSpriteFrameName("general_monster1.png");
        this.m_BackGround.addChild(monster, 1000);
        monster.setPosition(cc.p(0, this.m_BackGround.getContentSize().height - 25 * Defines.BASE_SCALE));
        //monster.setScale(2);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleShareButton: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        var levelData = cc.GUIGameLevelEndWin.getInstance().m_LevelData;
        var shareFriends = this.m_SurpassFriends.concat();

        //
        var callFunc = function()
        {
            ShareMng.getInstance().shareWithSurpassFriends(levelData, shareFriends);
        };

        cc.GUIPopupShare.getInstance().openWindow(this.getWindow().getParent(), callFunc);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, friends/*, callBack*/)
    {
        this._super(render);
        this.getWindow().removeAllChildren(true);

        //
        this.m_SurpassFriends = friends.concat();
        if (this.m_SurpassFriends.length > 8)
        {
            this.m_SurpassFriends = this.m_SurpassFriends.slice(0, 8);
        }

        //
        //cc.log("超越的好友 = " + this.m_SurpassFriends);

        //
        this.addContent();

        //每个页面只可以分享奖励一次
        ShareMng.getInstance().setCanBonus(true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        //
        this.getWindow().removeAllChildren(true);
        this.m_SurpassFriends = [];

        //每个页面只生成一个分享Code
        ShareMng.getInstance().cleanup();

        //
        var myScene = cc.GUIMap.getInstance().getWindow().getParent();
        var levelData = cc.GUIGameLevelEndWin.getInstance().m_LevelData;

        //step1:超越好友分数
        var scoreUpStrategy = GUIScoreTopUpStrategy.create(levelData.NAME);
        if (scoreUpStrategy)
        {
            cc.GUIScoreTopUp.getInstance().openWindow(myScene, scoreUpStrategy);
            return this;
        }

        //step2:
        cc.GUIGameLevelEndWin.getInstance().openWindow(myScene);

        //
        if(!isTelcomOperators()&& cc.NodeSelf.getInstance().isLogin())
        {
            cc.GUIMyFriendsTop.getInstance().openWindow(myScene, cc.GUIGameLevelEndWin.getInstance());
        }

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUISurpassFriends._instance = null;
cc.GUISurpassFriends.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = (new cc.GUISurpassFriends()).init();
    }

    return this._instance;
};