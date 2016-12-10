//================================================ GUIMineEnter =====================================================
//
cc.GUIMineEnter = cc.GUIPopupWindow.extend ({

    description: function ()
    {
        return "GUIMineEnter";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        this.m_MainUI = null;
        this.m_ShopData = null;
        this.m_render = null;
        this.m_levelData = null;
        this.isAnimate = null;

        this.m_payDiamond = 0;
        this.m_payCandy = 0;
        this.timeCDText = null;
        this.timeCDSpr = null;
    },

    addNewContent: function()
    {
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(blockLayer, -1);

        var curMineLevelData = this.m_levelData; //为从服务器获取数据做准备

        var srcSprite = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png");
        var srcSize = srcSprite.getContentSize();

        var targetSize = cc.size(668 * Defines.BASE_SCALE, 269 * Defines.BASE_SCALE);
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
            cc.p( targetSize.width,
                targetSize.height - 20 * Defines.BASE_SCALE));

        var buttonEnter = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("button_mashangwakuang-up.png"),
            cc.Sprite.createWithSpriteFrameName("button_mashangwakuang-down.png"),
            this._btnEnterMiningCallback, this);
        buttonEnter.setPosition(
            cc.p( targetSize.width * 0.5,
                -targetSize.height * 0.2));

        this.payEnterTip = cc.LabelTTF.create("", Defines.DefaultFont, 22 * Defines.BASE_SCALE);
        panel.addChild(this.payEnterTip);
        this.payEnterTip.setPosition(
            cc.p( targetSize.width * 0.5, -targetSize.height * 0.4));

        var menu = cc.GUIMenu.create(buttonClose, buttonEnter);
        menu.setPosition(cc.p(0, 0));
        panel.addChild(menu);

        var panelCenterLine = cc.Sprite.createWithSpriteFrameName("panelCenterLine.png");
        panel.addChild(panelCenterLine);
        panelCenterLine.setPosition(cc.p(targetSize.width * 0.4, targetSize.height * 0.5));

        switch (cc.MineMng.getInstance().getTOOL_TYPE()){
            case 0:
			    var toolSprText = cc.Sprite.createWithSpriteFrameName("wenzi-xiaoyiechan.png");
                var toolSprImg = cc.Sprite.createWithSpriteFrameName("icon-xiaoyiechan.png");
                break;
            case 1:
                var toolSprText = cc.Sprite.createWithSpriteFrameName("wenzi-caikuangzuan.png");
                var toolSprImg = cc.Sprite.createWithSpriteFrameName("icon-caikuangzuan.png");
                break;
            case 2:
                var toolSprText = cc.Sprite.createWithSpriteFrameName("wenzi-zhayaobao.png");
                var toolSprImg = cc.Sprite.createWithSpriteFrameName("icon-zhaoyaobao.png");
                break;
            default:
                var toolSprText = cc.Sprite.createWithSpriteFrameName("wenzi-zhayaobao.png");
                var toolSprImg = cc.Sprite.createWithSpriteFrameName("icon-zhaoyaobao.png");
                break;
        }
        panel.addChild(toolSprText);
        toolSprText.setPosition(cc.p(targetSize.width * 0.2, targetSize.height * 0.88));
        toolSprText.setScale(0.65);

        panel.addChild(toolSprImg);
        toolSprImg.setPosition(cc.p(targetSize.width * 0.2, targetSize.height * 0.5));

        var itemBonusText = cc.Sprite.createWithSpriteFrameName("wenzi-benguanjiangli.png");
        panel.addChild(itemBonusText);
        itemBonusText.setPosition(cc.p(targetSize.width * 0.72, targetSize.height * 0.85));
//        itemBonusText.setScale(0.7);

        var diamondTotal = cc.LabelTTF.create("钻石总数：", Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        panel.addChild(diamondTotal);
        diamondTotal.setPosition(cc.p(targetSize.width * 0.55, targetSize.height * 0.67));

        var getDiamondRate = cc.LabelTTF.create("获得几率：", Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        panel.addChild(getDiamondRate);
        getDiamondRate.setPosition(cc.p(targetSize.width * 0.55, targetSize.height * 0.52));

        var disAdd = 40 * Defines.BASE_SCALE;
        for (var i = 0 ; i < 5 ; i++){
            var diamondState_up = cc.MineMng.getInstance().getDIAMONDS_BONUS_LEVEL() < i+1;

            if (diamondState_up){
                var diamondEmptySpr_up = cc.Sprite.createWithSpriteFrameName("emptyStar.png");
            }
            else {
                var diamondEmptySpr_up = cc.Sprite.createWithSpriteFrameName("general_diamond_1.png");
                diamondEmptySpr_up.setScale(0.5);
            }
            panel.addChild(diamondEmptySpr_up);
            diamondEmptySpr_up.setPosition(cc.p(targetSize.width * 0.65 + disAdd * i, diamondTotal.getPosition().y));

            var diamondState_down = cc.MineMng.getInstance().getDIAMONDS_BONUS_RATE() < i+1;
            if (diamondState_down){
                var diamondEmptySpr_down = cc.Sprite.createWithSpriteFrameName("emptyStar.png");
            }
            else {
                var diamondEmptySpr_down = cc.Sprite.createWithSpriteFrameName("general_diamond_1.png");
                diamondEmptySpr_down.setScale(0.5);
            }
            panel.addChild(diamondEmptySpr_down);
            diamondEmptySpr_down.setPosition(cc.p(targetSize.width * 0.65 + disAdd * i, getDiamondRate.getPosition().y));
        }

        //初始化关卡特殊奖励部分
//        var targetDesLine = curMineLevelData.SPEC_AWARD.concat();
//        var itemArr = _GetMineSpecialArr();

        disAdd = 106 * Defines.BASE_SCALE;
        for (var j = 0 ; j < 3; j++){
            var itemEmptyPanel = cc.Sprite.createWithSpriteFrameName("itemBonusPanel.png");
            panel.addChild(itemEmptyPanel);
            itemEmptyPanel.setPosition(cc.p(targetSize.width * 0.56 + disAdd * j, targetSize.height * 0.25));
            var targetDesLine = cc.MineMng.getInstance().getSpec_AwardItem(j);
            if (targetDesLine){
//                var itemSpr = cc.Sprite.createWithSpriteFrameName(itemArr[targetDesLine[j] - 1].SPRITESOURCE);
				var itemSpr = cc.Sprite.createWithSpriteFrameName(targetDesLine.SPRITESOURCE);
                itemEmptyPanel.addChild(itemSpr);
                itemSpr.setScale(0.6);
                itemSpr.setPosition(cc.p(itemEmptyPanel.getContentSize().width/2 , itemEmptyPanel.getContentSize().height/2 ));
            }
        }

        //星数显示栏
        var curStarNum = cc.DataMng.getInstance().getTotalStarNum();
        var totalStarNum = cc.MineMng.getInstance().getSTAR_NUM() * 15 * 3;
        var starFlag = (curStarNum >= totalStarNum) ;
        if (!starFlag) //星数不满足
        {
            var starLinePanel = cc.Sprite.createWithSpriteFrameName("starLinePanel.png");
            panel.addChild(starLinePanel);
            starLinePanel.setPosition(cc.p(targetSize.width * 0.2, targetSize.height * 0.1));

            var starLineSign = cc.Sprite.createWithSpriteFrameName("mine_star_sign.png");
            starLinePanel.addChild(starLineSign);
            starLineSign.setPosition(cc.p(starLinePanel.getContentSize().width * 0.1, starLinePanel.getContentSize().height * 0.6));
            starLineSign.setScale(0.6);

            var starLineNum = cc.LabelTTF.create(curStarNum + "/" + totalStarNum, Defines.DefaultFont, 22 * Defines.BASE_SCALE);
            starLinePanel.addChild(starLineNum);
            starLineNum.setPosition(cc.p(starLinePanel.getContentSize().width * 0.5, starLinePanel.getContentSize().height * 0.6));

            this.m_payDiamond = cc.MineMng.getInstance().getSTAR_NOTFILL_NUM() * cc.MineMng.getInstance().getSTAR_NUM();
            this.payEnterTip.setString("需要" + this.m_payDiamond.toString() + "钻石");
        }
        else {
            this.timeCDSpr = cc.Sprite.createWithSpriteFrameName("timeCDPanel.png");
            panel.addChild(this.timeCDSpr);
            this.timeCDSpr.setPosition(cc.p(targetSize.width * 0.2, targetSize.height * 0.1));

            this.timeCDText = GUI.createNumberLabel("24:55:66", _GUIPath + "Num/num_3_14x18.png", 14, 18, "0");
            this.timeCDSpr.addChild(this.timeCDText);
            this.timeCDText.setPosition(cc.p(this.timeCDSpr.getContentSize().width * 0.15, this.timeCDSpr.getContentSize().height * 0.45));

            var cokeEndTime = cc.MineMng.getInstance().getCD_TIME();

            //封装一个对象
            var timeHandler = {};
            timeHandler.curTime = /*_LocalTime()/1000;*/_ServerTime();
            timeHandler.endTime = cokeEndTime;
            timeHandler.getShowTime = function()
            {
                var timeValue = (timeHandler.endTime - timeHandler.curTime);
                timeValue = timeValue < 0 ? 0 : timeValue;
                return parseInt(timeValue);
            };

            this.timeCDText.setString(Tools.convertSecondTimeEx(timeHandler.getShowTime(), true, true, true));

            if (cokeEndTime <= 0){
                this.updateCokeContent(curMineLevelData);
            }
            else {
                this.m_payDiamond = cc.MineMng.getInstance().getBEFORE_ENTER_DIAMOND()[cc.MineMng.getInstance().getTOOL_TYPE()];
                this.payEnterTip.setString("需要" + this.m_payDiamond.toString() + "钻石");
            }
            //
            var self = this;
            this.timeCDText.schedule(function()
                {
                    timeHandler.curTime += 1;
                    if (timeHandler.curTime >= timeHandler.endTime)
                    {
                        timeHandler.endTime = cc.MineMng.getInstance().getCD_TIME();
                        if (timeHandler.endTime > 0)
                        {
                            timeHandler.curTime = /*_LocalTime()/1000;*/_ServerTime();
                        }
                        else
                        {
                            self.timeCDText.unscheduleAllCallbacks();
                            self.updateCokeContent(curMineLevelData);
                            return;
                        }
                    }

                    //
                    self.timeCDText.setString(Tools.convertSecondTimeEx(timeHandler.getShowTime(), true, true, true));
                },
                1);

        }
    },

    updateCokeContent: function(curMineLevelData){
        if (this.timeCDSpr){
            this.timeCDSpr.setVisible(false);
        }

        this.m_payCandy = cc.MineMng.getInstance().getENTER_CANDY()[cc.MineMng.getInstance().getTOOL_TYPE()];
        this.payEnterTip.setString("需要" + this.m_payCandy.toString() + "薄荷糖");
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(blockLayer, -1);

        var toolUI_1 = cc.Sprite.createWithSpriteFrameName("icon-zhaoyaobao.png");
        this.getWindow().addChild(toolUI_1);
        toolUI_1.setPosition(cc.p(this.getCellPos(0),_ScreenCenter().y));

        var toolUI_2 = cc.Sprite.createWithSpriteFrameName( "icon-caikuangzuan.png");
        this.getWindow().addChild(toolUI_2);
        toolUI_2.setPosition(cc.p(this.getCellPos(1),_ScreenCenter().y));

        var toolUI_3 = cc.Sprite.createWithSpriteFrameName("icon-xiaoyiechan.png");
        this.getWindow().addChild(toolUI_3);
        toolUI_3.setPosition(cc.p(this.getCellPos(2),_ScreenCenter().y));

        var toolText_1 = cc.Sprite.createWithSpriteFrameName("wenzi-zhayaobao.png");
        this.getWindow().addChild(toolText_1);
        toolText_1.setPosition(cc.p(this.getCellPos(0),_ScreenCenter().y + 150  * Defines.BASE_SCALE));

        var toolText_2 = cc.Sprite.createWithSpriteFrameName("wenzi-caikuangzuan.png");
        this.getWindow().addChild(toolText_2);
        toolText_2.setPosition(cc.p(this.getCellPos(1),_ScreenCenter().y + 150  * Defines.BASE_SCALE));

        var toolText_3 = cc.Sprite.createWithSpriteFrameName("wenzi-xiaoyiechan.png");
        this.getWindow().addChild(toolText_3);
        toolText_3.setPosition(cc.p(this.getCellPos(2),_ScreenCenter().y + 150  * Defines.BASE_SCALE));
        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(
            cc.p(_ScreenWidth()  - 50 * Defines.BASE_SCALE,
                _ScreenHeight() - 40 * Defines.BASE_SCALE));

//		var btnArr = [];
//		for (var i = 0 ; i < 3; i++){
//			var newBtn = this.addBtnUI(i);
//			btnArr.push(newBtn);
//		}
//        var toolBtn_1 = cc.MenuItemSprite.create(
//            cc.Sprite.createWithSpriteFrameName("general_btn_temp_nor.png"),
//            cc.Sprite.createWithSpriteFrameName("general_btn_temp_sel.png"),
//            this._btnBuyDiamondCallback, this);
//        toolBtn_1.setPosition(cc.p(pos_1, _ScreenCenter().y - 150  * Defines.BASE_SCALE));
//
//		this.addBtnUI(toolBtn_1);
//
//        var toolBtn_2 = cc.MenuItemSprite.create(
//            cc.Sprite.createWithSpriteFrameName("general_btn_temp_nor.png"),
//            cc.Sprite.createWithSpriteFrameName("general_btn_temp_sel.png"),
//            this._btnBuyDiamondCallback, this);
//        toolBtn_2.setPosition(cc.p(pos_2, _ScreenCenter().y - 150  * Defines.BASE_SCALE));
//
//
//
//        var toolBtn_3 = cc.MenuItemSprite.create(
//            cc.Sprite.createWithSpriteFrameName("general_btn_temp_nor.png"),
//            cc.Sprite.createWithSpriteFrameName("general_btn_temp_sel.png"),
//            this._btnBuyDiamondCallback, this);
//        toolBtn_3.setPosition(cc.p(pos_3, _ScreenCenter().y - 150  * Defines.BASE_SCALE));


        var menu = cc.GUIMenu.create(this.addBtnUI(0), this.addBtnUI(1), this.addBtnUI(2), buttonClose);
        menu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(menu);

        return this;
    },
	
	getCellPos: function(num){
		var pos = [_ScreenCenter().x / 2,
		_ScreenCenter().x,
		_ScreenCenter().x * 1.5];

		return pos[num];
	},

	getCellPrice: function(num){
		var pos = [1000, 500, 180];
		return pos[num];
	},

	addBtnUI: function(num)
	{
		var btn = cc.MenuItemSprite.create(
		cc.Sprite.createWithSpriteFrameName("general_btn_temp_nor.png"),
		cc.Sprite.createWithSpriteFrameName("general_btn_temp_sel.png"),
		this._btnEnterMiningCallback, this);
		
        btn.setPosition(cc.p(this.getCellPos(num), _ScreenCenter().y - 150  * Defines.BASE_SCALE));
        btn.setTag(num);
		
        var diamondImg_1 =  cc.Sprite.createWithSpriteFrameName("general_diamond_1.png");
        btn.addChild(diamondImg_1);
        diamondImg_1.setPosition(cc.p( 40  * Defines.BASE_SCALE, btn.getContentSize().height / 2 + 5  * Defines.BASE_SCALE));
        diamondImg_1.setScale(0.6);

        var diamondPrice_1 = GUI.createNumberLabel(this.getCellPrice(num), _GUIPath + "Num/num_12_28x40.png", 28, 40,".");
        btn.addChild(diamondPrice_1);
        diamondPrice_1.setPosition(cc.p( 65  * Defines.BASE_SCALE, btn.getContentSize().height * 0.3));
		
		return btn;
	},
    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback:function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        this.closeWindow();
        return this;
    },
//
    //------------------------------------------------------------------------------------------------------------------
    _btnEnterMiningCallback: function(sender)
    {
        var curMineLevelData = this.m_levelData;
        var enterFlag = false;
        var myScene = this.getWindow().getParent();
		cc.DataMng.getInstance().setCurLevelData(this.m_levelData);
        cc.Guide.MiningGameType = cc.MineMng.getInstance().getTOOL_TYPE();

        if (this.m_payCandy > 0){
            //消耗薄荷糖
            if (cc.DataMng.getInstance().getCurrentHeart() >= this.m_payCandy){
                cc.DataMng.getInstance().desHeart(this.m_payCandy);
                enterFlag = true;
                BIMng.getInstance().logMineEnterGame(false);
            }
            else {
//                cc.GUIAskFriendForHeart.getInstance().openWindow(myScene, this.m_levelData.NAME);
				cc.GUIBuyDiamond.getInstance().openWindow(myScene, 0, GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE);
            }
        }
        else if (this.m_payDiamond){
            //消耗钻石
            if (cc.DataMng.getInstance().canSpendMoney(this.m_payDiamond)){
                cc.DataMng.getInstance().spendMoney(this.m_payDiamond, MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_MINE_ENTER);
                enterFlag = true;
                BIMng.getInstance().logMineEnterGame(true);
            }
            else {
                cc.GUIBuyDiamond.getInstance().openWindow(myScene, 0, GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND);
            }
        }

        if (enterFlag){
            this.closeWindow();

            var myScene = cc.GUIMap.getInstance().getWindow().getParent();
            Scene_GameLevel.changeTo();

            //sender.getTag();

            cc.MineMng.getInstance().setCD_TIME();
        }
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render,levelData, isAnimate)
    {
        //
        this._super(render);

        this.m_render = render;
        this.m_levelData = levelData;
        this.isAnimate = isAnimate;

        //
        cc.ResourceMng.getInstance().addToCache(
            Resource._GUIMineEnter_plist,
            Resource._GUIMineEnter_png);

        //

        cc.AudioMng.getInstance().playOpenWindow();
        this.getWindow().removeAllChildren(true);
        this.addNewContent();
//        this.addContent();
        //

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        //
        cc.AudioMng.getInstance().playCloseWindow();

        //
        this.getWindow().removeAllChildren(true);

        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUIMineEnter_plist,
            Resource._GUIMineEnter_png);

        this.m_payDiamond = 0;
        this.m_payCandy = 0;
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIMineEnter._instance = null;
cc.GUIMineEnter.getInstance = function ()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIMineEnter();
        this._instance.init();
    }

    return this._instance;
};