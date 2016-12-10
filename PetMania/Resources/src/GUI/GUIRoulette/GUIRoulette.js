var ROULETTE_PIECES = 12;

//======================================================================================================================
cc.GUIRoulette = cc.GUIWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        //
        this._super();

        //控制器
        this._controller = RouletteController.create();

        //
        this._test = false;
		this._buttonChoice = null;
		this.leftMonsterColor = null;
		this.rightMonsterColor = null;
		this.monsterArr = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "GUIRoulette";
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
		//随机出两种颜色的小怪
		this.leftMonsterColor = _RandColor();
		while (this.rightMonsterColor == null || this.rightMonsterColor == this.leftMonsterColor)
		{
			this.rightMonsterColor = _RandColor();
		}
		
		this.addTopUI();
		this.addCenterUI();
		this.addBottomUI();
	},
	//------------------------------------------------------------------------------------------------------------------
    addTopUI:function()
    {
		var winSize = cc.Director.getInstance().getWinSize();
		var topUI = cc.Sprite.createWithSpriteFrameName("Roulette_panel_xinxixianshi1.png");
        this.getWindow().addChild(topUI);
        topUI.setAnchorPoint(cc.p(0.5, 1));
        topUI.setPosition(cc.p(winSize.width * 0.5, winSize.height));
		
		var topPanelSize = topUI.getContentSize();
		
//		var topUIkuang = cc.Sprite.createWithSpriteFrameName("Roulette_panel_baitiao.png");
//        topUI.addChild(topUIkuang);
//        topUIkuang.setAnchorPoint(cc.p(0.5, 0.5));
//        topUIkuang.setPosition(cc.p(topPanelSize.width * 0.5, topPanelSize.height * 0.5));
		
		var diamondSpr = cc.Sprite.createWithSpriteFrameName("general_diamond_2.png");
		topUI.addChild(diamondSpr);
		diamondSpr.setPosition(cc.p(topPanelSize.width * 0.04, topPanelSize.height * 0.5));

        this.m_topDiamondCount = GUI.createNumberLabel("4567", _GUIPath + "Num/num_3_14x18.png", 14, 18, "0");
        topUI.addChild(this.m_topDiamondCount,500);
        this.m_topDiamondCount.setAnchorPoint(cc.p(0.5, 0.5));
        this.m_topDiamondCount.setPosition(cc.p(topPanelSize.width * 0.15, topPanelSize.height * 0.5));
		
		var buttonAdd = cc.MenuItemSprite.create(
			cc.Sprite.createWithSpriteFrameName("general_btn_add_nor.png"),
			cc.Sprite.createWithSpriteFrameName("general_btn_add_sel.png"),
			this.onClickButtonMulTwo,
			this);
		buttonAdd.setPosition(cc.p(topPanelSize.width * 0.26, topPanelSize.height * 0.5));
		
		var addMenu = cc.Menu.create(buttonAdd);
		addMenu.setPosition(cc.p(0, 0));
		topUI.addChild(addMenu, 10000);
		
		var buttonClose = cc.MenuItemSprite.create(
			cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
			cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
			this.onClickButtonMulTwo,
			this);
		buttonClose.setPosition(cc.p(winSize.width * 0.97, winSize.height * 0.95));
    //
		var itemMenu = cc.Menu.create();
		itemMenu.setPosition(cc.p(0, 0));
		itemMenu.addChild(buttonClose);
		this.getWindow().addChild(itemMenu, 10000);
	},
	//------------------------------------------------------------------------------------------------------------------
    addCenterUI:function()
    {
		var self = this;
		
        this.m_MainUI = cc.Sprite.createWithSpriteFrameName("Roulette_panel_zhuanpanbian.png");
        this.getWindow().addChild(this.m_MainUI);

        var mainSize = this.m_MainUI.getContentSize();
        var winSize = cc.Director.getInstance().getWinSize();

        this.m_MainUI.setAnchorPoint(cc.p(0.5, 0.5));
        this.m_MainUI.setPosition(winSize.width * 0.5,winSize.height * 0.5);
		
		this.rouletteBg = cc.Sprite.createWithSpriteFrameName("Roulette_panel_zhuanpan.png");
        this.m_MainUI.addChild(this.rouletteBg);
        this.rouletteBg.setAnchorPoint(cc.p(0.5, 0.5));
        this.rouletteBg.setPosition(cc.p(mainSize.width * 0.5, this.rouletteBg.getContentSize().height * 0.5));

//		var sequence = cc.Sequence.create(
//			cc.DelayTime.create(Defines.FPS * 50),
//			cc.CallFunc.create(
//		);
		this.rouletteBg.runAction(cc.RepeatForever.create(cc.RotateBy.create(Defines.FPS * 30, 360)));

		//中间的一圈小怪
		var monsterPositions = [
            cc.p(mainSize.width * 0.12, mainSize.height * 0.50),
            cc.p(mainSize.width * 0.19, mainSize.height * 0.64),
            cc.p(mainSize.width * 0.32, mainSize.height * 0.74),
            cc.p(mainSize.width * 0.48, mainSize.height * 0.75),
			cc.p(331 * Defines.BASE_SCALE, 357 * Defines.BASE_SCALE),
            cc.p(382 * Defines.BASE_SCALE, 285 * Defines.BASE_SCALE),
            cc.p(388 * Defines.BASE_SCALE, 203 * Defines.BASE_SCALE),
            cc.p(354 * Defines.BASE_SCALE, 124 * Defines.BASE_SCALE),
			cc.p(286 * Defines.BASE_SCALE, 75 * Defines.BASE_SCALE),
            cc.p(200 * Defines.BASE_SCALE, 65 * Defines.BASE_SCALE),
            cc.p(122 * Defines.BASE_SCALE, 104 * Defines.BASE_SCALE),
            cc.p(72 * Defines.BASE_SCALE, 174 * Defines.BASE_SCALE)
        ];
		monsterPositions.forEach(function (position, index)
        {
			if (index % 2 == 0){
				//var monsterSpr = cc.Sprite.createWithSpriteFrameName(Defines.COLOR.YELLOW + "_Wrap.png");
				var monsterSpr = MonsterRender.createSprite(self.leftMonsterColor);
			}
			else {
				//var monsterSpr = cc.Sprite.createWithSpriteFrameName(Defines.COLOR.ORANGE + "_Wrap.png");
				var monsterSpr = MonsterRender.createSprite(self.rightMonsterColor);
			}
			self.m_MainUI.addChild(monsterSpr);
			self.monsterArr.push(monsterSpr);
			monsterSpr.runAction(cc.RepeatForever.create(cc.RotateBy.create(Defines.FPS * 30, 360)));
//			monsterSpr.setPosition(position);
			monsterSpr.setPosition(cc.p(position.x + 34, position.y));
        });
	
		this.rouletteBg.schedule(function()
			{
			starArm.setPosition(cc.p(beginPos_butterFly.x + 150, beginPos_butterFly.y- 150));
			starArm.runAction(cc.BezierTo.create(flyTime + Defines.FPS * 20, bezierPath_1));
			},
			9
		);

		//外面的一圈星星
		var starPositions = [
            cc.p(42 * Defines.BASE_SCALE, 404 * Defines.BASE_SCALE),
			cc.p(87 * Defines.BASE_SCALE, 446 * Defines.BASE_SCALE),
			cc.p(144 * Defines.BASE_SCALE, 477 * Defines.BASE_SCALE),
			cc.p(200 * Defines.BASE_SCALE, 490 * Defines.BASE_SCALE),
			cc.p(258 * Defines.BASE_SCALE, 490 * Defines.BASE_SCALE),
			cc.p(317 * Defines.BASE_SCALE, 474 * Defines.BASE_SCALE),
			cc.p(373 * Defines.BASE_SCALE, 447 * Defines.BASE_SCALE),
			cc.p(417 * Defines.BASE_SCALE, 404 * Defines.BASE_SCALE)
        ];
		
		var starRotate = [
			23,
			30,
			49,
			68,
			79,
			94,
			40,
			48
		];
		
		
		starPositions.forEach(function (position, index)
        {
			var starSpr = cc.Sprite.createWithSpriteFrameName("Roulette_panel_xingxing.png");
			self.m_MainUI.addChild(starSpr);
			starSpr.setPosition(cc.p(position.x + 34, position.y));
			starSpr.setRotation(starRotate[index]);
        });


		var rouletteCenter = cc.Sprite.createWithSpriteFrameName("images-panel-zhuanpanzhongxin.png");
        this.m_MainUI.addChild(rouletteCenter);
        rouletteCenter.setAnchorPoint(cc.p(0.5, 0.5));
        rouletteCenter.setPosition(cc.p(mainSize.width * 0.5, mainSize.height * 0.5));

		var panelSize = rouletteCenter.getContentSize();
		
		var diamondSpr = cc.Sprite.createWithSpriteFrameName("general_diamond_1.png");
		rouletteCenter.addChild(diamondSpr);
		diamondSpr.setPosition(cc.p(panelSize.width * 0.5, panelSize.height * 0.55));

        this.m_rouleDiamondCount = GUI.createNumberLabel("1246", _GUIPath + "Num/num_3_14x18.png", 14, 18, "0");
        rouletteCenter.addChild(this.m_rouleDiamondCount,500);
        this.m_rouleDiamondCount .setAnchorPoint(cc.p(0.5, 0.5));
        this.m_rouleDiamondCount.setPosition(cc.p(panelSize.width * 0.5, panelSize.height * 0.3));
	},
	//------------------------------------------------------------------------------------------------------------------
	getBottomButtonRect:function(targetButton)
    {
		var size = targetButton.getContentSize();
        var mainSize = this.bottomUI.getContentSize();
		var winSize = cc.Director.getInstance().getWinSize();
        var toWindow = cc.pSub(cc.p(winSize.width * 0.5, 0), cc.p(mainSize.width * 0.5, 0));
        var origin = cc.pAdd(targetButton.getPosition(), toWindow);

        return cc.rect(origin.x - size.width * 0.5, origin.y - size.height * 0.5, size.width, size.height);
    },

	//------------------------------------------------------------------------------------------------------------------
    addBottomUI:function()
    {
		this.getWindow().setTouchEnabled(true);
		var self = this;
		var winSize = cc.Director.getInstance().getWinSize();
		this.bottomUI = cc.Sprite.createWithSpriteFrameName("Roulette_panel_xinxixianshi2.png");
        this.getWindow().addChild(this.bottomUI);
        this.bottomUI.setAnchorPoint(cc.p(0.5, 0));
        this.bottomUI.setPosition(cc.p(winSize.width * 0.5, 0));
		
		var bottomSize = this.bottomUI.getContentSize();
		
		
		var leftMonsterButton = cc.Sprite.createWithSpriteFrameName("Roulette_btn_monster_nor.png");
		this.bottomUI.addChild(leftMonsterButton);
		leftMonsterButton.setPosition(cc.p(bottomSize.width * 0.1, 70 * Defines.BASE_SCALE));
		
		var leftMonsterButtonBack = cc.Sprite.createWithSpriteFrameName("Roulette_btn_monster_sel.png");
		this.bottomUI.addChild(leftMonsterButtonBack);
		leftMonsterButtonBack.setPosition(cc.p(bottomSize.width * 0.1, 70 * Defines.BASE_SCALE));
		leftMonsterButtonBack.setVisible(false);
		
		var leftMonsterSprite = MonsterRender.createSprite(this.leftMonsterColor);
		this.bottomUI.addChild(leftMonsterSprite);
		leftMonsterSprite.setPosition(cc.p(bottomSize.width * 0.1, 70 * Defines.BASE_SCALE));
						
		var mulTwoButton = cc.MenuItemSprite.create(
			cc.Sprite.createWithSpriteFrameName("Roulette_btn_2_nor.png"),
			cc.Sprite.createWithSpriteFrameName("Roulette_btn_2_sel.png"),
			this.onClickButtonMulTwo, this);
        mulTwoButton.setPosition(cc.p(bottomSize.width * 0.3, 55 * Defines.BASE_SCALE));

		var mulFiveButton = cc.MenuItemSprite.create(
			cc.Sprite.createWithSpriteFrameName("Roulette_btn_5_nor.png"),
			cc.Sprite.createWithSpriteFrameName("Roulette_btn_5_sel.png"),
			this.onClickButtonMulTwo, this);
        mulFiveButton.setPosition(cc.p(bottomSize.width * 0.5, 55 * Defines.BASE_SCALE));
		
		var mulTenButton = cc.MenuItemSprite.create(
			cc.Sprite.createWithSpriteFrameName("Roulette_btn_10_nor.png"),
			cc.Sprite.createWithSpriteFrameName("Roulette_btn_10_sel.png"),
			this.onClickButtonMulTwo, this);
        mulTenButton.setPosition(cc.p(bottomSize.width * 0.7, 55 * Defines.BASE_SCALE));
		
		var rightMonsterButton = cc.Sprite.createWithSpriteFrameName("Roulette_btn_monster_nor.png");
		this.bottomUI.addChild(rightMonsterButton);
        rightMonsterButton.setPosition(cc.p(bottomSize.width * 0.9, 70 * Defines.BASE_SCALE));
		
		var rightMonsterButtonBack = cc.Sprite.createWithSpriteFrameName("Roulette_btn_monster_sel.png");
		this.bottomUI.addChild(rightMonsterButtonBack);
		rightMonsterButtonBack.setPosition(cc.p(bottomSize.width * 0.9, 70 * Defines.BASE_SCALE));
		rightMonsterButtonBack.setVisible(false);
		
		var rightMonsterSprite = MonsterRender.createSprite(this.rightMonsterColor);
		this.bottomUI.addChild(rightMonsterSprite);
		rightMonsterSprite.setPosition(cc.p(bottomSize.width * 0.9, 70 * Defines.BASE_SCALE));
		
		this.getWindow().onTouchesEnded = function(touches, event)
        {
			if (!touches[0]){
				return ;
			}
			var location = touches[0].getLocation();
			
			var leftButtonRect = self.getBottomButtonRect(leftMonsterButton);
			var rightButtonRect = self.getBottomButtonRect(rightMonsterButton);
			
			if (cc.GuideHelper.getInstance().isContainPointInRect(location, leftButtonRect)){
				cc.log("leftButtonRect touch");
				if (self._buttonChoice != "left"){
					leftMonsterButton.setVisible(false);
					leftMonsterButtonBack.setVisible(true);
					rightMonsterButton.setVisible(true);
					rightMonsterButtonBack.setVisible(false);
					self.rouletteBg.stopAllActions();
					self.monsterArr.forEach(function (monsterSpr, index)
					{
						monsterSpr.stopAllActions();
					});
				}
				self.buttonChoice = "left";
			}
			else if (cc.GuideHelper.getInstance().isContainPointInRect(location, rightButtonRect)){
				cc.log("rightButtonRect touch");
				if (self._buttonChoice != "right"){
					leftMonsterButton.setVisible(true);
					leftMonsterButtonBack.setVisible(false);
					rightMonsterButton.setVisible(false);
					rightMonsterButtonBack.setVisible(true);
				}
				self.buttonChoice = "right";
			}
		}
				
        var bottomMenu = cc.Menu.create( mulTwoButton, mulFiveButton, mulTenButton);//, leftMonsterButton,rightMonsterButton);
        bottomMenu.setPosition(cc.p(0, 0));
        this.bottomUI.addChild(bottomMenu);
	},
	//------------------------------------------------------------------------------------------------------------------
    rouletteAnimation:function()
    {
		
	},

	//------------------------------------------------------------------------------------------------------------------
    onClickButtonMulTwo:function()
    {

//        //
//        this.playLeaveAction(
//            function()
//            {
//                this.closeWindow();
//                cc.GUIGameLevel.getInstance().playEnterAction();
//            }
//        );
//
//        //
//        cc.GUIGameOptionAndPause.getInstance().playLeaveAction(
//            function()
//            {
//                cc.GUIGameOptionAndPause.getInstance().closeWindow();
//            }
//        );

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    //控制器
    getController: function()
    {
        return this._controller;
    },

    //------------------------------------------------------------------------------------------------------------------
    //数据模型
    getModel: function()
    {
        return RouletteModel.getInstance();
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);
		cc.log("roulette openwindow");
		
		cc.ResourceMng.getInstance().addToCache(
			Resource.GUIRoulette_plist,
			Resource.GUIRoulette_png);
		
		cc.ResourceMng.getInstance().addToCache(
			Resource.monsters_plist,
			Resource.monsters_png);

		this.getWindow().removeAllChildren(true);
        this.addContent();
		
        //
        this.getModel().resetRound(0);

        //
        if (this._test)
        {
            this._layer = cc.LayerColor.create(cc.c4b(255, 0, 0, 128));
            this.getWindow().addChild(this._layer);

            //
            this._layer.setTouchEnabled(true);

            var self = this;
            this._layer.onTouchesBegan = function(touches)
            {
                return self.handleTouchesBegan(touches);
            };
            this._layer.onTouchesEnded = function(touches)
            {
                return self.handleTouchesEnded(touches);
            };
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleTouchesBegan: function(touches)
    {
        if (this._test)
        {
            var referObjs = this.getModel().getReferObjs();
            this.getModel().setSelectObj(referObjs[1]);
            this.getController().activateRoulette();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleTouchesEnded: function(touches)
    {
        if (this._test)
        {
            this.getController().finishRoulette();
        }

        return this;
    }
});

//======================================================================================================================
cc.GUIRoulette._instance = null;
cc.GUIRoulette.getInstance = function()
{

    if (!this._instance)
    {
        this._instance = (new cc.GUIRoulette()).init();
    }

    return this._instance;
};