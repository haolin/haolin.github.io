
//======================================================================================================================
cc.GUIBonus_Daily = cc.GUIBonus_Oper.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        //剩余次数标签的Tag
        this.m_TimesTag = 10002;
    },

    //------------------------------------------------------------------------------------------------------------------
    decorate: function(layer)
    {
        //
        var dailyContinue = cc.DataMng.getDataDaily().getDailyContinue();
        dailyContinue = dailyContinue > 7 ? 7 : dailyContinue;

        //
        var mainSize = layer.getContentSize();

        //
//		if (Defines._IsSpringFestival()){
//			var background = cc.Sprite.createWithSpriteFrameName( "SpringFestival_Map.png");
//			background.setAnchorPoint(cc.p(0, 0));
//			layer.addChild(background);
//			GUI.backGroundScaleToScreen(background);
//		}
//		else {
			var background = cc.Sprite.create(Resource._MapZone);
			background.setAnchorPoint(cc.p(0, 0));
			layer.addChild(background);
			GUI.backGroundScaleToScreen(background);
			cc.ResourceMng.getInstance().removeTextureCache(Resource._MapZone);
//		}
        //
       /* var plantTopName = _GUIPath + "GUIGameLevel_Start_EndWin_EndFail/plant_top.png";
        var plantTop = cc.Sprite.create(plantTopName);
        layer.addChild(plantTop);
        plantTop.setAnchorPoint(cc.p(1, 0));
        plantTop.setPosition(cc.p(mainSize.width, 0));
        cc.ResourceMng.getInstance().removeTextureCache(plantTopName);*/

        //
//		if (Defines._IsSpringFestival()){
//			var spriteTitle = cc.Sprite.createWithSpriteFrameName("spring_label_title.png");
//			layer.addChild(spriteTitle);
//			spriteTitle.setPosition(mainSize.width * 0.35, mainSize.height * 0.92);
//		}
//		else {
			var spriteTitle = cc.Sprite.createWithSpriteFrameName("daily_label_title.png");
			layer.addChild(spriteTitle);
			spriteTitle.setPosition(mainSize.width * 0.35, mainSize.height * 0.92);
//		}

        //
        var spriteTimes = cc.Sprite.createWithSpriteFrameName("daily_label_times.png");
        layer.addChild(spriteTimes);
        spriteTimes.setPosition(mainSize.width * 0.75, mainSize.height * 0.9);

        //
        var bonusCards = cc.DataMng.getDataDaily().getDailyCards();
        var labelTimes = GUI.createNumberLabel(bonusCards, _GUIPath + "Num/daily_num_times.png", 74, 90, "0");
        layer.addChild(labelTimes, 0, this.m_TimesTag);
        labelTimes.setAnchorPoint(cc.p(0.5, 0.5));
        labelTimes.setPosition(mainSize.width * 0.75, mainSize.height * 0.75);

        //
			var dailyProgressBg = cc.Sprite.createWithSpriteFrameName("daily_progress_bg.png");
			layer.addChild(dailyProgressBg);
			dailyProgressBg.setAnchorPoint(cc.p(0.5, 0));
			dailyProgressBg.setPosition(mainSize.width * 0.81, mainSize.height * 0.1 - 6 * Defines.BASE_SCALE);

			//
			var spriteProgress = cc.Sprite.createWithSpriteFrameName("daily_progress.png");
			var dailyProgress = cc.ProgressTimer.create(spriteProgress);
			layer.addChild(dailyProgress);
			dailyProgress.setAnchorPoint(cc.p(0.5, 0));
			dailyProgress.setPosition(mainSize.width * 0.81, mainSize.height * 0.1);

			dailyProgress.setType(cc.PROGRESS_TIMER_TYPE_BAR);
			dailyProgress.setMidpoint(cc.p(0, 0));
			dailyProgress.setBarChangeRate(cc.p(0, 1));

			//
			var progressHeight = [0, 54, 110, 166, 210, 246, 286, 340];
			var progressFinHeight = progressHeight[dailyContinue] * Defines.BASE_SCALE;
			var progressSrcSize = spriteProgress.getContentSize();
			dailyProgress.setPercentage(progressFinHeight/progressSrcSize.height * 100);

			//
			/*dailyProgress.setTextureRect(cc.rect(
				progressSrcRect.x, progressSrcRect.y + progressSrcRect.height - progressFinHeight,
				progressSrcRect.width, progressFinHeight));*/

			//
			var dailyInfoPosition = [
				cc.p(mainSize.width * 0.7, mainSize.height * 0.10),
				cc.p(mainSize.width * 0.7, mainSize.height * 0.25),
				cc.p(mainSize.width * 0.7, mainSize.height * 0.40),
				cc.p(mainSize.width * 0.7, mainSize.height * 0.55)
			];

			dailyInfoPosition.forEach(function(position, index)
			{
				//
				var dailyCard = cc.Sprite.createWithSpriteFrameName("daily_card_" + index +".png");
				layer.addChild(dailyCard);
				dailyCard.setAnchorPoint(cc.p(0.5, 0));
				dailyCard.setPosition(position);

				//
				var bonusLevel = this._getBonusLevel(dailyContinue);

				//
				var dailyName = (index < bonusLevel) ? "daily_label_light_" : "daily_label_nor_";
				var dailyLabel = cc.Sprite.createWithSpriteFrameName(dailyName + index +".png");
				layer.addChild(dailyLabel);
				dailyLabel.setAnchorPoint(cc.p(0.5, 0));
				dailyLabel.setPosition(position);

			}, this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _getBonusLevel: function (dailyContinue)
    {
        var condition = [0, 1, 2, 4, 7];

        for (var index = condition.length - 1; index >= 0; index--)
        {
            if (dailyContinue >= condition[index])
            {
                return index;
            }
        }

        return 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    getCardsPos: function(layer)
    {
        var cardsPos = [];
        var contentSize  = layer.getContentSize();

        //
        var dX = 0.15;
        var dY = 0.28;
        for (var idX = 0; idX < 3; idX++)
        {
            for (var idY = 0; idY < 3; idY++)
            {
                var pos = cc.p(0, 0);
                pos.x = contentSize.width * (0.18 + dX * idX);
                pos.y = contentSize.height * (0.15 + dY * idY);
                cardsPos.push(pos);
            }
        }

        return cardsPos;
    },

    //------------------------------------------------------------------------------------------------------------------
    addBonus: function()
    {
        //
        cc.DataMng.getDataDaily().useDailyCards(1);

        //
        var bonusLayer = cc.GUIBonus.getInstance().getWindow();
        var bonusTimes = bonusLayer.getChildByTag(this.m_TimesTag);

        if (bonusTimes)
        {
            var bonusCards = cc.DataMng.getDataDaily().getDailyCards();
            bonusTimes.setString(bonusCards.toString());
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isFinish : function ()
    {
        return cc.DataMng.getDataDaily().getDailyCards() <= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish : function ()
    {
        Scene_MainMap.changeTo();
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIBonus_Daily.create = function()
{
    var createNew = new cc.GUIBonus_Daily();

    //--------------------------------------------------------------------------------------------------------------
    //薄荷糖奖励

	var heartCountArr = [1, 1, 2, 3];

    var heartBonusArr = [];

    heartCountArr.forEach(
        function(each)
        {
            var bonus = {};
            bonus["_source"] = "icon_heart_0.png";
            bonus["_count"] = each;
            bonus["_func"] = function(){

                //
                cc.DataMng.getInstance().addHeart(each);

                //记录
                /*ItemPack.getInstance().addHeartRecord(
                    ItemRecord.create(HEART_SOURCE.SOURCE_ADD_HEART_BY_DAILY, each)
                ).save();*/
            };

            heartBonusArr.push(bonus);
        }
    );

    createNew.registerBonus(
        "Bonus_Heart",
        4,
        heartBonusArr
    );

    //--------------------------------------------------------------------------------------------------------------
    //道具奖励
    var itemDataArr = [];
    var itemBonusArr = [];

	var itemCountArr = [];
	itemDataArr.push(Defines.GameItems.ITEM_DIRECTION_EX);
	itemDataArr.push(Defines.GameItems.ITEM_WARP_EX);
	itemDataArr.push(Defines.GameItems.ITEM_COLORFUL_EX);
	itemDataArr.push(Defines.GameItems.ITEM_STORM);
	itemDataArr.push(Defines.GameItems.ITEM_GOLDEN_KEY);

	//暂时为电信版本
	itemDataArr.push(Defines.GameItems.ITEM_TRANSPOSITION);
	itemDataArr.push(Defines.GameItems.ITEM_TIME);
	itemDataArr.push(Defines.GameItems.ITEM_STAINING);

    itemDataArr.forEach(
        function(each,index)
        {
            var bonus = {};
            bonus["_source"] = each.SPRITESOURCE;
            bonus["_count"] = itemCountArr[index] || 1;
            bonus["_func"] = function(){
                cc.DataMng.getInstance().buyItemByID(each.ID, bonus["_count"], 0);
                //BIMng.getBIItem().logItemIncome_DailyBonus(each.ID, 1);
            };

            itemBonusArr.push(bonus);
        }
    );

    createNew.registerBonus(
        "Bonus_Item",
        /*3*/5,
        itemBonusArr
    );

    //--------------------------------------------------------------------------------------------------------------
    //钥匙奖励
    /*var keyDataArr = [1, 1, 1, 1, 1, 1, 1, 2, 2, 3];
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
        1,
        keyBonusArr
    );*/

    //--------------------------------------------------------------------------------------------------------------
    //加油卡奖励
    /*var cardDataArr = [1, 1, 1, 1, 1, 1, 1, 2, 2, 3];
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
        1,
        cardBonusArr
    );*/
    //--------------------------------------------------------------------------------------------------------------

    return createNew;
};