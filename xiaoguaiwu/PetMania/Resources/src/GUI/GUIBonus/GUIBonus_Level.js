
//======================================================================================================================
cc.GUIBonus_Level = cc.GUIBonus_Oper.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        this.m_BonusCount = 1;
    },

    //------------------------------------------------------------------------------------------------------------------
    decorate: function(layer)
    {
        //
        var mainSize = layer.getContentSize();

        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 100));
        layer.addChild(blockLayer);

        //
        var tempMain = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png");
        var srcSize = tempMain.getContentSize();

        //
        var background = cc.Scale9Sprite.create(
            _GUIPath + "GUINewGeneral/general_back9.png",
            cc.rect(0, 0, srcSize.width, srcSize.height),
            cc.rect(srcSize.width * 0.3, srcSize.height * 0.3, srcSize.width * 0.4, srcSize.height * 0.4));

        //
        var panelSize = cc.size(740 * Defines.BASE_SCALE, 420 * Defines.BASE_SCALE);
        background.setContentSize(panelSize);
        layer.addChild(background);
        background.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.5));

        //
        var titleBg = cc.Sprite.createWithSpriteFrameName("general_level_title_bg.png");
        background.addChild(titleBg);
        titleBg.setPosition(panelSize.width * 0.5, panelSize.height);

        //
        //var spriteTitle = cc.Sprite.createWithSpriteFrameName("daily_label_title.png");
        var spriteTitle = cc.LabelTTF.create("惊喜抽奖", Defines.DefaultFont, 30 * Defines.BASE_SCALE);
        titleBg.addChild(spriteTitle);
        var titleBgSize = titleBg.getContentSize();
        spriteTitle.setPosition(titleBgSize.width * 0.5, titleBgSize.height * 0.55);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getCardsPos: function(layer)
    {
        var cardsPos = [];

        var tempCard = cc.Sprite.createWithSpriteFrameName("daily_bonus_card_0.png");
        var cardSize = tempCard.getContentSize();
        var mainSize  = layer.getContentSize();

        //牌与牌之间的间距
        var dX = 24 * Defines.BASE_SCALE;
        var dY = 24 * Defines.BASE_SCALE;
        var cardDisX = cardSize.width + dX;
        var cardDisY = cardSize.height + dY;

        //上面五个
        var topFirX = mainSize.width * 0.5 - 2 * cardDisX;
        var topFirY = mainSize.height * 0.5 + cardDisY * 0.5;
        for (var idT = 0; idT < 5; idT++)
        {
            cardsPos.push(cc.p(topFirX + idT * cardDisX, topFirY));
        }

        //下面四个
        var bottomFirX = mainSize.width * 0.5 - 1.5 * cardDisX;
        var bottomFirY = mainSize.height * 0.5 - cardDisY * 0.5;
        for (var idB = 0; idB < 4; idB++)
        {
            cardsPos.push(cc.p(bottomFirX + idB * cardDisX, bottomFirY));
        }

        return cardsPos;
    },

    //------------------------------------------------------------------------------------------------------------------
    addBonus: function()
    {
        //
        --this.m_BonusCount;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isFinish : function ()
    {
        return this.m_BonusCount <= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish : function ()
    {
        cc.GUIBonus.getInstance().closeWindow();

        //
        var myScene = cc.GUIMap.getInstance().getWindow().getParent();
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

cc.GUIBonus_Level.create = function(floatIndex)
{
    //------------------------------------------------------------------------------------------------------------------
    //在第1、4、7、9、10关完成后可以进行惊喜抽奖
    var bonusLevel = [0, 3, 6, 8, 9];
    var indexOf = bonusLevel.indexOf(floatIndex);

    if (indexOf < 0)
    {
        return null;
    }

    //------------------------------------------------------------------------------------------------------------------
    var createNew = new cc.GUIBonus_Level();

    //------------------------------------------------------------------------------------------------------------------
    var bonusCates = {};

    bonusCates["0"] = {
        "_item": 3, "_heart": 4, "_key": 1, "_card": 1,
        "_heartArr": [1, 1, 2, 3], "_keyArr": [1, 1, 1, 1, 1, 1, 1, 2, 2, 3], "_cardArr": [1, 1, 1, 1, 1, 1, 1, 2, 2, 3]
    };

    bonusCates["3"] = {
        "_item": 3, "_heart": 4, "_key": 1, "_card": 1,
        "_heartArr": [1, 1, 2, 3], "_keyArr": [1, 1, 1, 1, 1, 1, 1, 2, 2, 3], "_cardArr": [1, 1, 1, 1, 1, 1, 1, 2, 2, 3]
    };

    bonusCates["6"] = {
        "_item": 3, "_heart": 4, "_key": 1, "_card": 1,
        "_heartArr": [2, 2, 3, 5], "_keyArr": [1, 1, 1, 1, 1, 2, 2, 2, 3, 3], "_cardArr": [1, 1, 1, 1, 1, 2, 2, 2, 3, 3]
    };

    bonusCates["8"] = {
        "_item": 4, "_heart": 3, "_key": 1, "_card": 1,
        "_heartArr": [2, 3, 5], "_keyArr": [1, 1, 1, 2, 2, 2, 3, 3, 3, 3], "_cardArr": [1, 1, 1, 2, 2, 2, 3, 3, 3, 3]
    };

    bonusCates["9"] = {
        "_item": 4, "_heart": 3, "_key": 1, "_card": 1,
        "_heartArr": [3, 5, 5], "_keyArr": [3], "_cardArr": [3]
    };

    var indexValue = bonusLevel[indexOf];
    var bonusCate = bonusCates[indexValue];

    //--------------------------------------------------------------------------------------------------------------
    //道具奖励
    var itemDataArr = [];
    var itemBonusArr = [];

    itemDataArr.push(Defines.GameItems.ITEM_DIRECTION_EX);
    itemDataArr.push(Defines.GameItems.ITEM_WARP_EX);
    itemDataArr.push(Defines.GameItems.ITEM_COLORFUL_EX);
    itemDataArr.push(Defines.GameItems.ITEM_STORM);
    itemDataArr.push(Defines.GameItems.ITEM_GOLDEN_KEY);

    itemDataArr.forEach(
        function(each)
        {
            var bonus = {};
            bonus["_source"] = each.SPRITESOURCE;
            bonus["_count"] = 1;
            bonus["_func"] = function(){
                cc.DataMng.getInstance().buyItemByID(each.ID, 1, 0);
            };

            itemBonusArr.push(bonus);
        }
    );

    createNew.registerBonus(
        "Bonus_Item",
        bonusCate["_item"],
        itemBonusArr
    );

    //------------------------------------------------------------------------------------------------------------------
    //薄荷糖奖励
    var heartCountArr = bonusCate["_heartArr"];
    var heartBonusArr = [];

    heartCountArr.forEach(
        function(each)
        {
            var bonus = {};
            bonus["_source"] = "icon_heart_0.png";
            bonus["_count"] = each;
            bonus["_func"] = function(){
                cc.DataMng.getInstance().addHeart(each);
            };

            heartBonusArr.push(bonus);
        }
    );

    createNew.registerBonus(
        "Bonus_Heart",
        bonusCate["_heart"],
        heartBonusArr
    );

    //--------------------------------------------------------------------------------------------------------------
    //钥匙奖励
    var keyDataArr = bonusCate["_keyArr"];
    var keyBonusArr = [];

    keyDataArr.forEach(
        function(each)
        {
            var bonus = {};
            bonus["_source"] = "Images_clock_star.png";
            bonus["_count"] = each;
            bonus["_func"] = function(){
                cc.DataMng.getFloatLevel().addFloatKey(each);
            };

            keyBonusArr.push(bonus);
        }
    );

    createNew.registerBonus(
        "Bonus_Key",
        bonusCate["_key"],
        keyBonusArr
    );

    //--------------------------------------------------------------------------------------------------------------
    //加油卡奖励
    var cardDataArr = bonusCate["_cardArr"];
    var cardBonusArr = [];

    cardDataArr.forEach(
        function(each)
        {
            var bonus = {};
            bonus["_source"] = "Images_clock_star.png";
            bonus["_count"] = each;
            bonus["_func"] = function(){
                cc.DataMng.getInstance().addMovesCard(each);
            };

            cardBonusArr.push(bonus);
        }
    );

    createNew.registerBonus(
        "Bonus_Card",
        bonusCate["_card"],
        cardBonusArr
    );
    //--------------------------------------------------------------------------------------------------------------

    return createNew;
};