
cc.GUIGuideNormal = cc.GUIWindow.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        this.m_IsValide = true;
        this.m_operation = 0;
        //
        this.m_Enum = {
            ENUM_CLIPPER: 10,
            ENUM_DESCRIPTION_BLACK_LAYER : 11,
            ENUM_TOP_ZORDER : 10000
        };

        this.m_SpriteZorder = {
            CUTE_MONSTER : 1000,
            ARROW_ZORDER : 500,
            BLACK_LAYER : -1
        };
        //
        this.m_IsTouched = false;
        this.m_TouchedBeginPos = {x: 0, y: 0};
        this.m_TouchedEndPos = {x: 0, y: 0};

        //
        this.m_SpriteArrow = null;

        //

        this.m_BlackLayer = [];

        this.m_CuteMonster = null;
        this.m_ContentPanel = null;
        this.m_ContentLabel = null;
        this.m_ArrowPoint = null;

        this.m_UIArrowPoint = null;
        this.m_UIContentPanel = null;

        this.m_Boy = null;
        this.m_Monster = null;

        this.m_BoyContent = [];
        this.m_MonsterContent = [];

        this.m_BoyPanel = null;
        this.m_MonsterPanel = null;

        //--------------------------------------------------------------------------------------------------------------
        // 以下变量用来显示带图片的文字提示
        this.m_ImagePanel = null;
        this.m_ImageSprite = null;
        this.m_ImageContentLabel = null;

        this.m_IsShowCuteOut = false;
        //--------------------------------------------------------------------------------------------------------------
        this.m_GiveGiftFinished = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    getSpriteArrow: function()
    {
        if (!this.m_SpriteArrow)
        {
//            this.m_SpriteArrow = cc.Sprite.create(Resource.new_finger_png);
            this.m_SpriteArrow = cc.Sprite.createWithSpriteFrameName("Images_new_finger.png");
            this.m_SpriteArrow.setAnchorPoint(cc.p(0, 1));
            this.getWindow().addChild(this.m_SpriteArrow, this.m_Enum.ENUM_TOP_ZORDER);
        }

        return this.m_SpriteArrow;
    },

    //------------------------------------------------------------------------------------------------------------------
    isValide : function()
    {
        return this.m_IsValide;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "GUIGuideNormal";
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._super();
        this.getWindow().setTouchEnabled(true);

        this.getSpriteArrow().setVisible(false);

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    //进入这个State
    showCanTouchWithFinger : function(render, gamelevel, src, total)
    {
        if (!this.isValide())
        {
            return this;
        }

        this.openWindow(render);

        var blackInstance = GUIGuideBlack.getInstance();
        blackInstance.finishLayer();
        blackInstance.changeLayer(this.getWindow());
        blackInstance.addTableBlackArray(total);
        blackInstance.handle(gamelevel.getTable());
        //
        this.m_IsTouched = false;
        this.m_TouchedBeginPos = {x: 0, y: 0};
        this.m_TouchedEndPos = {x: 0, y: 0};
        this.getWindow().setTouchEnabled(true);

        //
        var table = gamelevel.getTable();
        var size = Defines.TABLE_GRID_SIZE/2;

        //
        var grid0 = total.shift();
        var points0 = [
            cc.p(-size, -size),
            cc.p(size, -size),
            cc.p(size, size),
            cc.p(-size, size)
        ];

        var self = this;
        this.getSpriteArrow().setVisible(true);

        this.getSpriteArrow().stopAllActions();
//        var arrowSize = this.getSpriteArrow().getContentSize();
//        var arrowStart = cc.p(_ScreenLeft().x-arrowSize.width/2,_ScreenLeft().y);
//        arrowStart.y = position.y;
       

		var fstPosition = table.getGrid(src.x, src.y).getPosition();//10.28 by shuiliu
		//cc.log("" + targetRect.x + ",y : " + targetRect.y + ",w : " + targetRect.width + ",h : "+targetRect.height+")");
		this.getSpriteArrow().setPosition(fstPosition);
		this.getSpriteArrow().runAction(
		 cc.RepeatForever.create(
			 cc.Sequence.create(
				cc.MoveTo.create(Defines.FPS*30,cc.p(fstPosition.x,fstPosition.y+10)),
				cc.MoveTo.create(Defines.FPS*30,fstPosition)
			 )
		 )
		);

        //
        var startGrid = table.getGrid(src.x, src.y);
        this.getWindow().onTouchesBegan = function(touches/*, event*/)
        {
            var gameLevelData1 = cc.DataMng.getInstance().getCurLevelData();
            if (self.m_IsTouched)
            {
                return self;
            }

            self.m_IsTouched = true;
            self.cleanCuteMonster();
            self.cleanUITip();
            var location = touches[0].getLocation();
            self.m_TouchedBeginPos.x = location.x;
            self.m_TouchedBeginPos.y = location.y;

            var gird = table.getGridByPos(self.m_TouchedBeginPos);
            if (!gird || startGrid != gird )
            {
                return self;
            }
			
			
			cc.Touch_ByItemToMonsGoldenKey_new.guide(self.m_TouchedBeginPos, gird, gamelevel);
			
			self.closeWindow();
            blackInstance.finishLayer();

            return self;
        };

        self.getWindow().onTouchesEnded = function()
        {
            self.m_IsTouched = false;
            self.m_operation = 0;
            return self;
        };
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    //进入这个State
    showCanTouchWithArrow : function(render, gamelevel, src, dst, total)
    {
        if (!this.isValide())
        {
            return this;
        }

//        var showWithArrow = cc.Guide_ShowWithArrow.getInstance();
//        if (showWithArrow)
//        {
//            showWithArrow.init(render, gamelevel, src, dst, total);
//            showWithArrow.show();
//        }

        this.openWindow(render);

        var blackInstance = GUIGuideBlack.getInstance();
        blackInstance.finishLayer();
        blackInstance.changeLayer(this.getWindow());
        blackInstance.addTableBlackArray(total);
        blackInstance.handle(gamelevel.getTable());
        //
        this.m_IsTouched = false;
        this.m_TouchedBeginPos = {x: 0, y: 0};
        this.m_TouchedEndPos = {x: 0, y: 0};
        this.getWindow().setTouchEnabled(true);

        //
        var table = gamelevel.getTable();
        var size = Defines.TABLE_GRID_SIZE/2;
        var shape = cc.DrawNode.create();

        //
        var grid0 = total.shift();
        var points0 = [
            cc.p(-size, -size),
            cc.p(size, -size),
            cc.p(size, size),
            cc.p(-size, size)
        ];

        var green = cc.c4f(1, 1, 1, 1);
        shape.drawPoly(points0, points0.length, green, 0);

        //
        total.concat().forEach(
            function(gridIndx)
            {
                //
                var gridPos1 = cc.p(gridIndx.x, gridIndx.y);

                //
                gridPos1.x -= grid0.x;
                gridPos1.x *= size * 2;

                gridPos1.y -= grid0.y;
                gridPos1.y *= -1 * size * 2;

                var points1 = [
                    cc.p(gridPos1.x - size, gridPos1.y - size),
                    cc.p(gridPos1.x + size, gridPos1.y - size),
                    cc.p(gridPos1.x + size, gridPos1.y + size),
                    cc.p(gridPos1.x - size, gridPos1.y + size)
                ];

                shape.drawPoly(points1, points1.length, green, 0);
            }
        );

        //
        var position = table.getGrid(grid0.x, grid0.y).getPosition();
        shape.setPosition(position);

        var self = this;
        this.getSpriteArrow().setVisible(true);

        this.getSpriteArrow().stopAllActions();
        var arrowSize = this.getSpriteArrow().getContentSize();
        var arrowStart = cc.p(_ScreenLeft().x-arrowSize.width/2,_ScreenLeft().y);
        arrowStart.y = position.y;
       

		var dstPosition = table.getGrid(dst.x, dst.y).getPosition();
		var fstPosition = table.getGrid(src.x, src.y).getPosition();//10.28 by shuiliu
		//cc.log("" + targetRect.x + ",y : " + targetRect.y + ",w : " + targetRect.width + ",h : "+targetRect.height+")");
		this.getSpriteArrow().setPosition(fstPosition);
		this.getSpriteArrow().runAction(
		 cc.RepeatForever.create(
			 cc.Sequence.create(
				 cc.MoveTo.create(Defines.FPS * 30, dstPosition),
				 cc.DelayTime.create(0.5),
				 cc.MoveTo.create(Defines.FPS * 30, fstPosition)//cc.MoveTo.create(Defines.FPS * 30, position)
			 )
		 )
		);

        //
        var startGrid = table.getGrid(src.x, src.y);
        var destGrid =  table.getGrid(dst.x, dst.y);
        this.getWindow().onTouchesBegan = function(touches/*, event*/)
        {
            var gameLevelData1 = cc.DataMng.getInstance().getCurLevelData();
            if (gameLevelData1.ID == 30-1)
            {
                cc.Guide.round_30++;
            }

            if (self.m_IsTouched)
            {
                return self;
            }

            self.m_IsTouched = true;
            self.cleanCuteMonster();
            self.cleanUITip();
            var location = touches[0].getLocation();
            self.m_TouchedBeginPos.x = location.x;
            self.m_TouchedBeginPos.y = location.y;

            var gird = table.getGridByPos(self.m_TouchedBeginPos);
            if (!gird || (startGrid != gird && destGrid != gird))
            {
                self.getWindow().onTouchesEnded();
                return self;
            }

            if (startGrid == gird)
            {
                self.m_operation = 1;
            }
            else if (destGrid == gird)
            {
                self.m_operation = -1;
            }

            return self;
        };

        self.getWindow().onTouchesMoved = function(touches/*, event*/)
        {
            if (!self.m_IsTouched)
            {
                return self;
            }

            var location = touches[0].getLocation();
            self.m_TouchedEndPos.x = location.x;
            self.m_TouchedEndPos.y = location.y;

            var gird = table.getGridByPos(self.m_TouchedEndPos);
            if (!gird || (self.m_operation == 1 && destGrid != gird))
            {
                return self;
            }
            else if(!gird || (self.m_operation == -1 && startGrid != gird))
            {
                return self;
            }
            else if(self.m_operation == 0)
            {
                return self;
            }

            self.getWindow().onTouchesEnded();

            //
            //cc.GameManager.getInstance().changeTo(cc.State_GameLevel.getInstance());
            _ChangeGameLevelStateTo(cc.State_GameLevel.getInstance(), "269");

            //
            if (self.m_operation == 1)
            {
                self.m_TouchedEndPos = destGrid.getPosition();
            }
            else if (self.m_operation == -1)
            {
                self.m_TouchedEndPos = startGrid.getPosition();
            }

            //cc.GameTouch.create(self.m_TouchedBeginPos, self.m_TouchedEndPos).handle(gamelevel);
            gamelevel.addTouchSwapObjectsCommand(self.m_TouchedBeginPos, self.m_TouchedEndPos);

            self.closeWindow();
            blackInstance.finishLayer();

            return self;
        };

        self.getWindow().onTouchesEnded = function()
        {
            self.m_IsTouched = false;
            self.m_operation = 0;
            return self;
        };

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    //进入这个State
    showCanTouchWithTotalTable : function(render, gamelevel,  pos){
        if (!this.isValide())
        {
            return this;
        }
		
        this.openWindow(render);

        var blackInstance = GUIGuideBlack.getInstance();
        blackInstance.finishLayer();
        blackInstance.changeLayer(this.getWindow());
//		var targetRect = cc.GUIGameLevel.getInstance().getTargetRectForGuide();

		blackInstance.addUIBlackLayerWithTable(gamelevel.getTable());
        this.m_IsTouched = false;
        this.m_TouchedBeginPos = {x: 0, y: 0};
        this.m_TouchedEndPos = {x: 0, y: 0};
        this.getWindow().setTouchEnabled(true);
		
		var table = gamelevel.getTable();
        var size = Defines.TABLE_GRID_SIZE/2;
        var shape = cc.DrawNode.create();
		
        var self = this;
        this.getSpriteArrow().setVisible(true);

//        this.getSpriteArrow().stopAllActions();
        var arrowSize = this.getSpriteArrow().getContentSize();
		
		var position = table.getGrid(pos.x, pos.y).getPosition();
		this.getSpriteArrow().setPosition(position);
		
		this.getWindow().onTouchesBegan = function(touches/*, event*/)
        {
			var location = touches[0].getLocation();
           
			var grid = table.getGridByPos(location);
			
			if (grid == table.getGrid(pos.x, pos.y)){
				if (cc.Guide.round_12 == 2){
					_ChangeGameLevelStateTo(cc.State_GameLevel.getInstance(), "1147");
					cc.Touch_ByItemToMonsGoldenKey_new.guide(location, grid, gamelevel,4);
				}
				
			}

            self.m_IsTouched = true;
            self.cleanCuteMonster();
            self.cleanUITip();

            return self;
        };

		
	},

    //------------------------------------------------------------------------------------------------------------------
    //进入这个State
    showCanTouchWithMubiaoArrow : function(render, gamelevel, src, dst, total, pos, size)
    {
        if (!this.isValide())
        {
            return this;
        }

//        var showWithArrow = cc.Guide_ShowWithArrow.getInstance();
//        if (showWithArrow)
//        {
//            showWithArrow.init(render, gamelevel, src, dst, total);
//            showWithArrow.show();
//        }

        this.openWindow(render);

        var blackInstance = GUIGuideBlack.getInstance();
        blackInstance.finishLayer();
        blackInstance.changeLayer(this.getWindow());
//		var targetRect = cc.GUIGameLevel.getInstance().getTargetRectForGuide();

		blackInstance.addUIBlackLayerWithoutTable(pos, size , gamelevel.getTable());
		blackInstance.addTableBlackArrayWithoutFinish(total);
		blackInstance.addTableBlack(gamelevel.getTable());
		 
        this.m_IsTouched = false;
        this.m_TouchedBeginPos = {x: 0, y: 0};
        this.m_TouchedEndPos = {x: 0, y: 0};
        this.getWindow().setTouchEnabled(true);	
        //
        var table = gamelevel.getTable();
        var size = Defines.TABLE_GRID_SIZE/2;
        var shape = cc.DrawNode.create();

        //
        var grid0 = total.shift();
        var points0 = [
            cc.p(-size, -size),
            cc.p(size, -size),
            cc.p(size, size),
            cc.p(-size, size)
        ];

        var green = cc.c4f(1, 1, 1, 1);
        shape.drawPoly(points0, points0.length, green, 0);

        //
        total.concat().forEach(
            function(gridIndx)
            {
                //
                var gridPos1 = cc.p(gridIndx.x, gridIndx.y);

                //
                gridPos1.x -= grid0.x;
                gridPos1.x *= size * 2;

                gridPos1.y -= grid0.y;
                gridPos1.y *= -1 * size * 2;

                var points1 = [
                    cc.p(gridPos1.x - size, gridPos1.y - size),
                    cc.p(gridPos1.x + size, gridPos1.y - size),
                    cc.p(gridPos1.x + size, gridPos1.y + size),
                    cc.p(gridPos1.x - size, gridPos1.y + size)
                ];

                shape.drawPoly(points1, points1.length, green, 0);
            }
        );

        var position = table.getGrid(grid0.x, grid0.y).getPosition();
        shape.setPosition(position);

        var self = this;
        this.getSpriteArrow().setVisible(true);

        this.getSpriteArrow().stopAllActions();
        var arrowSize = this.getSpriteArrow().getContentSize();
        var arrowStart = cc.p(_ScreenLeft().x-arrowSize.width/2,_ScreenLeft().y);
        arrowStart.y = position.y;
       

		var dstPosition = table.getGrid(dst.x, dst.y).getPosition();
		var fstPosition = table.getGrid(src.x, src.y).getPosition();//10.28 by shuiliu
		//cc.log("" + targetRect.x + ",y : " + targetRect.y + ",w : " + targetRect.width + ",h : "+targetRect.height+")");
		 this.getSpriteArrow().setPosition(fstPosition);
         this.getSpriteArrow().runAction(
             cc.RepeatForever.create(
                 cc.Sequence.create(
                     cc.MoveTo.create(Defines.FPS * 30, dstPosition),
                     cc.DelayTime.create(0.5),
                     cc.MoveTo.create(Defines.FPS * 30, fstPosition)//cc.MoveTo.create(Defines.FPS * 30, position)
                 )
             )
         );

        //
        var startGrid = table.getGrid(src.x, src.y);
        var destGrid =  table.getGrid(dst.x, dst.y);
        this.getWindow().onTouchesBegan = function(touches/*, event*/)
        {
            var gameLevelData1 = cc.DataMng.getInstance().getCurLevelData();
            if (gameLevelData1.ID == 30-1)
            {
                cc.Guide.round_30++;
            }

            if (self.m_IsTouched)
            {
                return self;
            }

            self.m_IsTouched = true;
            self.cleanCuteMonster();
            self.cleanUITip();
            var location = touches[0].getLocation();
            self.m_TouchedBeginPos.x = location.x;
            self.m_TouchedBeginPos.y = location.y;

            var gird = table.getGridByPos(self.m_TouchedBeginPos);
            if (!gird || (startGrid != gird && destGrid != gird))
            {
                self.getWindow().onTouchesEnded();
                return self;
            }

            if (startGrid == gird)
            {
                self.m_operation = 1;
            }
            else if (destGrid == gird)
            {
                self.m_operation = -1;
            }

            return self;
        };

        self.getWindow().onTouchesMoved = function(touches/*, event*/)
        {
            if (!self.m_IsTouched)
            {
                return self;
            }

            var location = touches[0].getLocation();
            self.m_TouchedEndPos.x = location.x;
            self.m_TouchedEndPos.y = location.y;

            var gird = table.getGridByPos(self.m_TouchedEndPos);
            if (!gird || (self.m_operation == 1 && destGrid != gird))
            {
                return self;
            }
            else if(!gird || (self.m_operation == -1 && startGrid != gird))
            {
                return self;
            }
            else if(self.m_operation == 0)
            {
                return self;
            }

            self.getWindow().onTouchesEnded();

            //
            //cc.GameManager.getInstance().changeTo(cc.State_GameLevel.getInstance());
            _ChangeGameLevelStateTo(cc.State_GameLevel.getInstance(), "472");

            //
            if (self.m_operation == 1)
            {
                self.m_TouchedEndPos = destGrid.getPosition();
            }
            else if (self.m_operation == -1)
            {
                self.m_TouchedEndPos = startGrid.getPosition();
            }

            //cc.GameTouch.create(self.m_TouchedBeginPos, self.m_TouchedEndPos).handle(gamelevel);
            gamelevel.addTouchSwapObjectsCommand(self.m_TouchedBeginPos, self.m_TouchedEndPos);

            self.closeWindow();
            blackInstance.finishLayer();

            return self;
        };

        self.getWindow().onTouchesEnded = function()
        {
            self.m_IsTouched = false;
            self.m_operation = 0;
            return self;
        };

        return this;
    },


    //------------------------------------------------------------------------------------------------------------------
    showCuteMonster : function(direction, content, position, showArrow, layer)
    {
        if (!layer)
        {
            layer = animateLayer();
        }

        if (!position)
        {
            position = cc.p(_ScreenCenter().x,_ScreenCenter().y);
            position.x += 250 * Defines.BASE_SCALE;
            position.y -= 250 * Defines.BASE_SCALE;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var resName = "Images_left_right_look_cute.png";
        var isFlipX = false;

        switch (direction)
        {
            case 1: // up
                resName = "Images_up_look_cute.png";
                break;
            case 2: // down
                resName = "Images_down_look_cute.png";
                break;
            case 3: // left
                resName = "Images_left_right_look_cute.png";
                break;
            case 4: // right
                resName = "Images_left_right_look_cute.png";
                isFlipX = true;
                break;
        }

        this.m_CuteMonster = cc.Sprite.createWithSpriteFrameName(resName);
        this.m_CuteMonster.setFlipX(isFlipX);

        this.m_CuteMonster.setPosition(position);
        layer.addChild(this.m_CuteMonster, this.m_SpriteZorder.CUTE_MONSTER);

        this.m_CuteMonster.stopAllActions();
        this.m_CuteMonster.runAction(
            cc.RepeatForever.create(
                cc.Sequence.create(
                    cc.MoveTo.create(Defines.FPS*100,cc.p(position.x-10,position.y)),
                    cc.DelayTime.create(Defines.FPS*10),
                    cc.MoveTo.create(Defines.FPS*100,position)
                )
            )
        );


        var cuteSize = this.m_CuteMonster.getContentSize();
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (content)
        {
            var contentPanelName = "Images_big_frame.png";
            var orignalPanel = cc.Sprite.createWithSpriteFrameName(contentPanelName);
            var orignalSize = orignalPanel.getContentSize();
            var targetSize = cc.size(300 * Defines.BASE_SCALE, 130 * Defines.BASE_SCALE);
            this.m_ContentPanel = cc.Scale9Sprite.createWithSpriteFrameName(contentPanelName,
//                cc.rect(0,0,orignalSize.width,orignalSize.height),
                cc.rect(50 * Defines.BASE_SCALE,50 * Defines.BASE_SCALE,orignalSize.width-100 * Defines.BASE_SCALE,orignalSize.height-100 * Defines.BASE_SCALE));
            this.m_ContentPanel.setPreferredSize(targetSize);


            var panelPos = cc.p(0,0);
            switch (direction)
            {
                case 1: // up
                    panelPos.x = -cuteSize.width-50;
                    panelPos.y = - 50;
                    break;
                case 2: // down
                    panelPos.x = -cuteSize.width-50;
                    panelPos.y = cuteSize.height + 50;
                    break;
                case 3: // left
                    panelPos.x = targetSize.width - 100;
                    panelPos.y = targetSize.height;
                    break;
                case 4: // right
                    panelPos.x = -cuteSize.width - 50;
                    panelPos.y = cuteSize.height + 50;
                    isFlipX = true;
                    break;
            }
			var contentPanel = GUI.createDialogSpr(content, "Images_big_frame.png", 0.3 , 0.3, 0.4, 0.4, 300 * Defines.BASE_SCALE, 130 * Defines.BASE_SCALE);
            contentPanel.setPosition(panelPos);
            this.m_CuteMonster.addChild(contentPanel);

            var panelSize = contentPanel.getContentSize();

            this.m_ContentLabel = cc.LabelTTF.create(content, Defines.DefaultFont, 22 * Defines.BASE_SCALE);
            this.m_ContentLabel.setColor(cc.c3b(0,0,0));
            contentPanel.addChild(this.m_ContentLabel);
            this.m_ContentLabel.setPosition(cc.p(panelSize.width/2, panelSize.height/2));

            contentPanel.stopAllActions();
            contentPanel.runAction(
                cc.RepeatForever.create(
                    cc.Sequence.create(
                        cc.MoveTo.create(Defines.FPS*100,cc.p(panelPos.x+10,panelPos.y)),
                        cc.DelayTime.create(Defines.FPS*10),
                        cc.MoveTo.create(Defines.FPS*100,panelPos)
                    )
                )
            );

        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (showArrow)
        {
            var arrowLocation = cc.p(0,0);
            var degree = 0;
            if (this.m_ArrowPoint)
            {
                this.m_ArrowPoint.removeFromParent(true);
            }

            var moveTo;

            switch (direction)
            {
                case 1: // up
                    arrowLocation.x = cuteSize.width / 2;
                    arrowLocation.y = cuteSize.height + 20;

                    degree = 90;

                    moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x,arrowLocation.y+10));
                    break;
                case 2: // down
                    arrowLocation.x = cuteSize.width / 2;
                    arrowLocation.y = -20;

                    degree = -90;

                    moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x,arrowLocation.y-10));
                    break;
                case 3: // left
                    arrowLocation.x = -30;
                    arrowLocation.y = cuteSize.height / 2;

                    degree = 0;

                    moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x-10,arrowLocation.y));
                    break;
                case 4: // right
                    arrowLocation.x = cuteSize.width + 30;
                    arrowLocation.y = cuteSize.height / 2;

                    degree = -180;

                    moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x+10,arrowLocation.y));
                    break;
            }

            var moveBack = cc.MoveTo.create(Defines.FPS*10, arrowLocation);

//            this.m_ArrowPoint = cc.Sprite.create(Resource.new_arrows_png);
            this.m_ArrowPoint = cc.Sprite.createWithSpriteFrameName("Images_new_arrows.png");
            this.m_ArrowPoint.setAnchorPoint(cc.p(0.5,0.5));
            this.m_ArrowPoint.setPosition(arrowLocation);
            this.m_ArrowPoint.setRotation(degree);
            this.m_CuteMonster.addChild(this.m_ArrowPoint,this.m_SpriteZorder.ARROW_ZORDER);

            this.m_ArrowPoint.runAction(
                cc.RepeatForever.create(
                    cc.Sequence.create(
                        moveTo,
                        cc.DelayTime(Defines.FPS*10),
                        moveBack
                    )
                )
            );
        }

        return this;
    },

    showArrow : function(position,direction,layer)
    {
        var arrowLocation = cc.p(position.x,position.y);
        var degree = 0;
        if (this.m_ArrowPoint)
        {
            this.m_ArrowPoint.removeFromParent(true);
        }

        var moveTo;

        switch (direction)
        {
            case 1: // up
                degree = 90;

                moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x,arrowLocation.y+10));
                break;
            case 2: // down

                degree = -90;

                moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x,arrowLocation.y-10));
                break;
            case 3: // left

                degree = 0;

                moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x-10,arrowLocation.y));
                break;
            case 4: // right

                degree = -180;

                moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x+10,arrowLocation.y));
                break;
        }

        var moveBack = cc.MoveTo.create(Defines.FPS*10, arrowLocation);

//        this.m_ArrowPoint = cc.Sprite.create(Resource.new_arrows_png);
        this.m_ArrowPoint = cc.Sprite.createWithSpriteFrameName("Images_new_arrows.png");
        this.m_ArrowPoint.setAnchorPoint(cc.p(0.5,0.5));
        this.m_ArrowPoint.setPosition(arrowLocation);
        this.m_ArrowPoint.setRotation(degree);
        layer.addChild(this.m_ArrowPoint,this.m_SpriteZorder.ARROW_ZORDER);

        this.m_ArrowPoint.runAction(
            cc.RepeatForever.create(
                cc.Sequence.create(
                    moveTo,
                    cc.DelayTime(Defines.FPS*10),
                    moveBack
                )
            )
        );
    },
	    //------------------------------------------------------------------------------------------------------------------
    //进入这个State
    showArrowWithCuteContent: function(render, content, posList, directionList, blackList, directionCuteList, posListCute)
    {
        var directionCute = 4;
        this.openWindow(render);
        this.getWindow().setTouchEnabled(true);

        var positions = posList;
        var pos = 0;

        if (posList.length > pos)
        {
            this.showUITipWithoutContent(directionList[pos], positions[pos]);
        }

        if (directionCuteList && directionCuteList.length > 0)
        {
            directionCute = directionCuteList[0];
        }

        if (content.length > 0 && content[pos] != "")
        {
            var centerPos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
            centerPos.x += 250 * Defines.BASE_SCALE;
            centerPos.y -= 250 * Defines.BASE_SCALE;

            if (posListCute && posListCute.length > 0)
            {
                centerPos.x = posListCute[0].x;
                centerPos.y = posListCute[0].y;
            }
            this.showCuteMonster(directionCute, content[pos], centerPos, false);
        }

        var blackInstance = GUIGuideBlack.getInstance();
        if (blackList && blackList.length > 0)
        {
			cc.log("blackList" );
            blackInstance.changeLayer(this.getWindow());
            blackInstance.handleUI(cc.p(blackList[pos].x,blackList[pos].y), cc.size(blackList[pos].width,blackList[pos].height));
        }

        pos++;
		var gameLevelData = cc.DataMng.getInstance().getCurLevelData();

        var self = this;
        this.getWindow().onTouchesBegan = function(touches /*, event*/)
        {
            self.cleanUITip();
            self.cleanCuteMonster();
            
            if (gameLevelData.ID == 1-1)
            {
				cc.State_GameLevel.getInstance().setGuideState();
                cc.Guide.round_1++;
            }
            else if (gameLevelData.ID ==2-1)
            {
                cc.Guide.round_2++;
            }
            else if (gameLevelData.ID == 4-1)
            {
                //不然 4关卡 横纵消除教学 会断
                cc.State_GameLevel.getInstance().setGuideState();
                cc.Guide.round_4++;
            }
            else if (gameLevelData.ID == 8-1)
            {
                cc.State_GameLevel.getInstance().setGuideState("GUIGuide 810");
                cc.Guide.round_8++;
            }
			else if (gameLevelData.ID == 12-1)
            {
				if (cc.Guide.round_12 == 1  || cc.Guide.round_12 == 4 || cc.Guide.round_12 == 7){
					var location = touches[0].getLocation();
					var itemIndex = -1;
					for (var i=0; i<4; i++)
					{
						if (cc.GuideHelper.getInstance().isContainPointInButtonByIndex(location, i))
						{
							itemIndex = i;
						}
					}
					
					if (itemIndex == 3){
						cc.State_GameLevel.getInstance().setGuideState();
						cc.Guide.round_12++;
					}
					else {
						return self;
					}
				}
				else {
					cc.State_GameLevel.getInstance().setGuideState();
					cc.Guide.round_12++;
				}
            }
            else if (gameLevelData.ID == 21-1)
            {
                //不然 21关卡 泡泡教学 会断
                cc.State_GameLevel.getInstance().setGuideState();
                cc.Guide.round_21++;
            }
            else if (gameLevelData.ID == 28-1)
            {
                //不然 28关卡 时钟教学 会断
                cc.State_GameLevel.getInstance().setGuideState();
                cc.Guide.round_28++;
            }
            else if (gameLevelData.ID == 36-1)
            {
                //不然 28关卡 合体怪教学 会断
                cc.State_GameLevel.getInstance().setGuideState();
                cc.Guide.round_36++;
            }


            if (pos >= posList.length && pos >= content.length)
            {
                if (self.m_UIArrowPoint)
                {
                    self.m_UIArrowPoint.stopAllActions();
                    self.m_UIArrowPoint.removeFromParent(true);
                }
                //cc.GameManager.getInstance().changeTo(cc.State_GameLevel.getInstance());
                _ChangeGameLevelStateTo(cc.State_GameLevel.getInstance(), "841");
                self.closeWindow();
                blackInstance.finishLayer();
                return self;
            }

            if (blackList && blackList.length > pos)
            {
                blackInstance.finishLayer();
                blackInstance.changeLayer(self.getWindow());
                blackInstance.handleUI(cc.p(blackList[pos].x,blackList[pos].y), cc.size(blackList[pos].width,blackList[pos].height));
            }

            //var oldPos = pos;
            if (content.length > pos && content[pos] != "")
            {
                if (directionCuteList.length > pos)
                {
                    directionCute = directionCuteList[pos];
                }
                else
                {
                    directionCute = 4;
                }

                centerPos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
                centerPos.x += 250 * Defines.BASE_SCALE;
                centerPos.y -= 250 * Defines.BASE_SCALE;

                if (posListCute && posListCute.length > pos)
                {
                    centerPos.x = posListCute[pos].x;
                    centerPos.y = posListCute[pos].y;
                }

                self.showCuteMonster(directionCute, content[pos], centerPos, false);
            }

            if (posList.length > pos)
            {
                self.showUITipWithoutContent(directionList[pos], positions[pos]);
            }

            pos++;


            return self;
        };

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //进入这个State
    showArrowForPropsClicked: function(render, content, position, direction, black, gameLevel)
    {
        var showFinger = true;
//        if (isFinger && isFinger == 2)
//        {
//            showFinger = false;
//        }

        this.openWindow(render);
        this.getWindow().setTouchEnabled(true);

        if (position && position.x != 0 && position.y != 0)
        {
            cc.log("showArrowForPropsClicked -- position is valid");
            cc.log("position( x = " + position.x + ", y =" + position.y + ")");
            if (showFinger == false)
            {
                cc.log("showArrowForPropsClicked -- not show finger");
                this.showUITipWithoutContent(direction, position);
            }
            else
            {
                cc.log("showArrowForPropsClicked -- show finger");

                this.getSpriteArrow().setVisible(true);
                this.getSpriteArrow().setPosition(position);

                this.getSpriteArrow().stopAllActions();
                this.getSpriteArrow().runAction(
                    cc.RepeatForever.create(
                        cc.Sequence.create(
                            cc.MoveTo.create(Defines.FPS*30,cc.p(position.x,position.y+10)),
                            cc.MoveTo.create(Defines.FPS*30,position)
                        )
                    )
                );
            }
        }
        else
        {
            cc.log("showArrowForPropsClicked -- position is null or (x=0 and y=0)");
            this.getSpriteArrow().stopAllActions();
            this.getSpriteArrow().setVisible(false);
        }


        if (content && content != "")
        {
            var centerPos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
            centerPos.x -= 150 * Defines.BASE_SCALE;
            centerPos.y -= 250 * Defines.BASE_SCALE;
            this.showCuteMonster(3, content, centerPos, false);
        }

        var indexPos = 0;
        var blackInstance = GUIGuideBlack.getInstance();
        if (black && black.length > 0)
        {
            cc.log("Add black layer...");
            blackInstance.changeLayer(this.getWindow());
            blackInstance.handleUI(cc.p(black[indexPos].x,black[indexPos].y), cc.size(black[indexPos].width, black[indexPos].height));
        }
        else
        {
            cc.log("Black layer is null, needn't add black layer.");
        }

        var gameLevelData = cc.DataMng.getInstance().getCurLevelData();
        if (gameLevelData.NAME == "LEVEL_5" || gameLevelData.NAME == "LEVEL_12")
        {
            if (black && black.length > 0)
            {
                cc.GUIGameLevel.getInstance().lockButtonList();
                for (var i=0; i<4; i++)
                {
                    if (cc.GuideHelper.getInstance().checkIsUnLockButton(black[indexPos],i))
                    {
                        cc.GUIGameLevel.getInstance().unLockButtonByIndex(i);
                    }
                }
            }
        }
        else if (gameLevelData.NAME == "LEVEL_7")
        {
            var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
            cc.GUIGuideNormal.getInstance().showPanelWithImage("icon_item_4.png",Resource.ChineseTxt[70],pos,1.0, true/*,blackList*/);
        }

        indexPos++;
        //
        var self = this;
        this.getWindow().onTouchesBegan = function(touches /*,event*/)
        {
            if (position.x == 0 && position.y == 0)
            {
                if (gameLevelData.NAME == "LEVEL_5" )
                {
                    cc.GUIGameLevel.getInstance().unLockButtonList();

                    //只能这么写 强制通知主状态 调用教学逻辑 不然5关道具教学会断掉
                    cc.State_GameLevel.getInstance().setGuideState();

                    cc.Guide.round++;
                }

                if (self.getSpriteArrow())
                {
                    self.getSpriteArrow().removeFromParent(true);
                    self.m_SpriteArrow = null;
                }
                self.cleanUITip();
                self.cleanCuteMonster();
                self.cleanPanelWithImage();

                if (self.m_UIArrowPoint)
                {
                    self.m_UIArrowPoint.stopAllActions();
                    self.m_UIArrowPoint.removeFromParent(true);
                }

                //cc.GameManager.getInstance().changeTo(cc.State_GameLevel.getInstance());
                _ChangeGameLevelStateTo(cc.State_GameLevel.getInstance(), "1016");
                self.closeWindow();
                return self;
            }

            var location = touches[0].getLocation();
            var itemIndex = -1;

            for (var i=0; i<4; i++)
            {
                if (cc.GuideHelper.getInstance().isContainPointInButtonByIndex(location, i))
                {
                    itemIndex = i;
                }
            }

//            var targetRect0 = cc.GUIGameLevel.getInstance().getButtonItemRectForGuide(0);
//            var targetRect1 = cc.GUIGameLevel.getInstance().getButtonItemRectForGuide(1);
//            var targetRect2 = cc.GUIGameLevel.getInstance().getButtonItemRectForGuide(2);
//            var targetRect3 = cc.GUIGameLevel.getInstance().getButtonItemRectForGuide(3);
//            //
//
//            if (location.x > targetRect0.x
//                && location.x < targetRect0.x + targetRect0.width
//                && location.y > targetRect0.y
//                && location.y < targetRect0.y + targetRect0.height)
//            {
//                itemIndex = 0;
//            }
//            else if (location.x > targetRect1.x
//                && location.x < targetRect1.x + targetRect1.width
//                && location.y > targetRect1.y
//                && location.y < targetRect1.y + targetRect1.height)
//            {
//                itemIndex = 1;
//            }
//            else if (location.x > targetRect2.x
//                && location.x < targetRect2.x + targetRect2.width
//                && location.y > targetRect2.y
//                && location.y < targetRect2.y + targetRect2.height)
//            {
//                itemIndex = 2;
//            }
//            else if (location.x > targetRect3.x
//                && location.x < targetRect3.x + targetRect3.width
//                && location.y > targetRect3.y
//                && location.y < targetRect3.y + targetRect3.height)
//            {
//                itemIndex = 3;
//            }

            if (gameLevelData.NAME == "LEVEL_5")
            {
                if (cc.Guide.round < 4 && cc.Guide.round != itemIndex)
                {
                    return self;
                }
//                else
//                {
//				    cc.GUIGameLevel.getInstance().unLockButtonByIndex(itemIndex);
//
//                }
            }
            else if(gameLevelData.NAME == "LEVEL_7")
            {
                if (cc.Guide.round_7+2 != itemIndex)
                {
                    return self;
                }
            }
			else if (gameLevelData.NAME == "LEVEL_12")
			{
				if (itemIndex != 3)
                {
                    return self;
                }
                else
                {
				    cc.GUIGameLevel.getInstance().unLockButtonByIndex(itemIndex);

                }
			}

            if (itemIndex == -1)
            {
                return self;
            }

            if (gameLevelData.NAME == "LEVEL_5"  || gameLevelData.NAME == "LEVEL_12")
            {
//                cc.GUIGameLevel.getInstance().lockButtonList();

                cc.Guide.round++;
                if (itemIndex == 0)
                {
//                    cc.GUIGameLevel.getInstance().getGameItem().setLockGUIUpdate(true);
                    cc.DataMng.getInstance().buyItemByID(Defines.GameItems.ITEM_DIRECTION_EX.ID, 1, 0);
                    var guideTry = new cc.Touch_ByItemContinue.create(Defines.GameItems.ITEM_DIRECTION_EX.ID, position);
                }
                else if (itemIndex == 1)
                {
//                    cc.GUIGameLevel.getInstance().getGameItem().setLockGUIUpdate(true);
                    cc.DataMng.getInstance().buyItemByID(Defines.GameItems.ITEM_WARP_EX.ID, 1, 0);
                    var guideTry = new cc.Touch_ByItemContinue.create(Defines.GameItems.ITEM_WARP_EX.ID, position);
                }
                else if (itemIndex == 2)
                {
//                    cc.GUIGameLevel.getInstance().getGameItem().setLockGUIUpdate(true);
                    cc.DataMng.getInstance().buyItemByID(Defines.GameItems.ITEM_COLORFUL_EX.ID, 1, 0);
                    var guideTry = new cc.Touch_ByItemContinue.create(Defines.GameItems.ITEM_COLORFUL_EX.ID, position);
                }
                else if (itemIndex == 3)
                {
                    cc.GUIGameLevel.getInstance().getGameItem().setLockGUIUpdate(true);
                    cc.DataMng.getInstance().buyItemByID(Defines.GameItems.ITEM_GOLDEN_KEY.ID, 1, 0);
//					cc.Guide.round_12 ++;
                }
                guideTry.handle(gameLevel);


            }

            if (gameLevelData.NAME == "LEVEL_7")
            {
                cc.Guide.round_7++;

                if (itemIndex == 2)
                {
                    cc.log("使用交换道具??????????");
                    cc.GUIGameLevel.getInstance().getGameItem().setLockGUIUpdate(true);
                    cc.DataMng.getInstance().buyItemByID(Defines.GameItems.ITEM_TRANSPOSITION.ID, 1, 0);
                }

            }

			
            if (self.getSpriteArrow())
            {
                self.getSpriteArrow().removeFromParent(true);
                self.m_SpriteArrow = null;
            }

            self.cleanUITip();
            self.cleanCuteMonster();
            self.cleanPanelWithImage();

            if (self.m_UIArrowPoint)
            {
                self.m_UIArrowPoint.stopAllActions();
                self.m_UIArrowPoint.removeFromParent(true);
            }

            if (gameLevelData.NAME != "LEVEL_5"){
                _ChangeGameLevelStateTo(cc.State_GameLevel.getInstance(), "1147");
            }

            //cc.GameManager.getInstance().changeTo(cc.State_GameLevel.getInstance());

            self.closeWindow();

            return self;
        };

        return this;
    },

//    //------------------------------------------------------------------------------------------------------------------
//    checkIsUnLockButton : function(black, index)
//    {
//        var targetRect = cc.GUIGameLevel.getInstance().getButtonItemRectForGuide(index);
//
//        if (black.x == targetRect.x
//            && black.y == targetRect.y
//            && black.width == targetRect.width
//            && black.height == targetRect.height)
//        {
//            return true;
//        }
//
//        return false;
//    },

    //------------------------------------------------------------------------------------------------------------------
    showUITipWithoutContent : function(direction, position)
    {
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var arrowLocation = cc.p(position.x,position.y);
        var degree = 0;
        if (this.m_UIArrowPoint)
        {
            this.m_UIArrowPoint.removeFromParent(true);
        }

        var moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x-10,arrowLocation.y));

        switch (direction)
        {
            case 1: // left
                degree = 0;
                moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x-10,arrowLocation.y));
                break;
            case 2: // right
                degree = -180;
                moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x+10,arrowLocation.y));
                break;

            default:
                degree = -180;
                moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x+10,arrowLocation.y));
                break;
        }

        var moveBack = cc.MoveTo.create(Defines.FPS*10, arrowLocation);

//        this.m_UIArrowPoint = cc.Sprite.create(Resource.new_arrows_png);
        this.m_UIArrowPoint = cc.Sprite.createWithSpriteFrameName("Images_new_arrows.png");
        this.m_UIArrowPoint.setAnchorPoint(cc.p(0.5,0.5));
        this.m_UIArrowPoint.setPosition(arrowLocation);
        this.m_UIArrowPoint.setRotation(degree);
        animateLayer().addChild(this.m_UIArrowPoint,this.m_SpriteZorder.ARROW_ZORDER);

        this.m_UIArrowPoint.runAction(
            cc.RepeatForever.create(
                cc.Sequence.create(
                    moveTo,
                    cc.DelayTime.create(Defines.FPS*10),
                    moveBack
                )
            )
        );
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        var arrowSize = this.m_UIArrowPoint.getContentSize();
        if (this.m_UIContentPanel)
        {
            this.m_UIContentPanel.removeFromParent(true);
        }
    },
    //------------------------------------------------------------------------------------------------------------------
    showPanelWithImage : function(image,content,position,scale,isFrame,blackList)
    {
        var self = this;
        if (!scale)
        {
            scale = 1;
        }

        if (!isFrame)
        {
            isFrame = false;
        }

        this.cleanPanelWithImage();

//        this.m_ImagePanel = cc.Sprite.create(Resource.image_panel_bg_png);
        this.m_ImagePanel = cc.Sprite.createWithSpriteFrameName("Images_image_panel_bg.png");
        var imagePanelSize = this.m_ImagePanel.getContentSize();

        var indexPos = 0;
        var blackInstance = GUIGuideBlack.getInstance();
        if (blackList && blackList.length > 0)
        {
            blackInstance.changeLayer(this.getWindow());
            blackInstance.handleUI(cc.p(blackList[indexPos].x,blackList[indexPos].y), cc.size(blackList[indexPos].width,blackList[indexPos].height));
        }
        indexPos++;

        if (this.m_ImagePanel)
        {
            if (content)
            {
                var panelSize = this.m_ImagePanel.getContentSize();

				if (Defines.IS_EN){
					this.m_ImageContentLabel = cc.LabelTTF.create(content, Defines.DefaultFont, 26 * Defines.BASE_SCALE);
				}
				else {
					this.m_ImageContentLabel = cc.LabelTTF.create(content, Defines.DefaultFont, 30 * Defines.BASE_SCALE);
				}

                this.m_ImageContentLabel.setColor(cc.c3b(255,255,255));
                this.m_ImagePanel.addChild(this.m_ImageContentLabel);
                this.m_ImageContentLabel.setPosition(cc.p(panelSize.width/2 + 50 * Defines.BASE_SCALE, panelSize.height/2 + 10 * Defines.BASE_SCALE));
            }

            if (image)
            {
                var sizeSprite;
                if (isFrame)
                {
                    this.m_ImageSprite = cc.Sprite.createWithSpriteFrameName(image);
                }
                else
                {
                    this.m_ImageSprite = cc.Sprite.create(image);
                }

                this.m_ImageSprite.setScale(scale);
//                sizeSprite = this.m_ImageSprite.getContentSize();
//                sizeSprite.width = sizeSprite.width*scale;
//                sizeSprite.height = sizeSprite.height*scale;
                this.m_ImageSprite.setPosition(cc.p(imagePanelSize.width/7,imagePanelSize.height/2 + 15 * Defines.BASE_SCALE));
                this.m_ImagePanel.addChild(this.m_ImageSprite);
                this.m_ImageSprite.setRotation(-10);

                //position.x += sizeSprite.width;
            }

            this.m_ImagePanel.setPosition(position);
            this.getWindow().addChild(this.m_ImagePanel);
        }

        this.getWindow().onTouchesBegan = function(touches, event)
        {
            var gameLevelData1 = cc.DataMng.getInstance().getCurLevelData();
            if (gameLevelData1.ID == 17-1)
            {
                //只能这么写 强制通知主状态 调用教学逻辑 不然17关道具教学会断掉
                cc.State_GameLevel.getInstance().setGuideState();
                cc.Guide.round_17++;
            }
            else if (gameLevelData1.ID == 19-1)
            {
                cc.State_GameLevel.getInstance().setGuideState();
                cc.Guide.round_19++;
            }
            else if (gameLevelData1.ID == 28-1)
            {
//                var targetRect =cc.GUIGameLevel.getInstance().getButtonItemRectForGuide(2);
//                var location = touches[0].getLocation();
//                if (location.x < targetRect.x ||
//                    location.x > targetRect.x + targetRect.width ||
//                    location.y < targetRect.y ||
//                    location.y > targetRect.y + targetRect.height)
//                {
//                    return self;
//                }

                var location = touches[0].getLocation();
                if (!cc.GuideHelper.getInstance().isContainPointInButtonByIndex(location,2))
                {
                     return self;
                }

                cc.Guide.round_28++;

                //
                cc.GUIGameLevel.getInstance().getGameItem().setLockGUIUpdate(true);
                cc.DataMng.getInstance().buyItemByID(Defines.GameItems.ITEM_TIME.ID, 1, 0);
            }
            else if (gameLevelData1.ID == 46-1)
            {
                cc.Guide.round_46++;
            }
            else if (gameLevelData1.ID == 30-1)
            {
                //冰块教学
                cc.State_GameLevel.getInstance().setGuideState();
                cc.Guide.round_30++;
            }

            blackInstance.finishLayer();
            self.cleanCuteMonster();
            self.cleanUITip();
            self.cleanPanelWithImage();
            self.closeWindow();
            //cc.GameManager.getInstance().changeTo(cc.State_GameLevel.getInstance());
            _ChangeGameLevelStateTo(cc.State_GameLevel.getInstance(), "1351");
            return self;
        };

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    showCustomCuteMonsterBase_onlytable : function (constent,gamelevel,layer,blackList,arrowDir,monsDir,monsPos)
    {
        var isShow = true;
//        if (isShowArrow)
//        {
//            isShow = isShowArrow;
//        }

        var self  = this;
        if (!cc.State_GameGuide.getInstance().isValid())
        {
            return this;
        }

        //
        if (this.getWindow().getParent())
        {
            this.getWindow().removeFromParent(false);
        }

        this.openWindow(layer);

        this.getSpriteArrow().stopAllActions();
        this.getSpriteArrow().setVisible(false);

        var self = this;

        cc.GUIGuideNormal.getInstance().showCuteMonster(monsDir,constent, monsPos, false, this.getWindow());

        this.getWindow().setTouchEnabled(true);

        var indexPos = 0;
        var blackInstance = GUIGuideBlack.getInstance();
        if (blackList && blackList.length > 0)
        {
            blackInstance.changeLayer(this.getWindow());
			blackInstance.finishLayer();
            blackInstance.addTableBlackArray(blackList);
			blackInstance.handle(gamelevel.getTable());
        }
        indexPos++;

		var table = gamelevel.getTable();
        if (isShow)
        {
            var arrowLocation = cc.p(_ScreenCenter().x-400 * Defines.BASE_SCALE,_ScreenCenter().y-130 * Defines.BASE_SCALE);
            if (blackList && blackList.length > 0)
            {
				var dstPosition = table.getGrid(blackList[0].x-1, blackList[0].y).getPosition();
				if (arrowDir == 3){
					dstPosition = table.getGrid(blackList[0].x + 1, blackList[0].y).getPosition();
				}
                arrowLocation.x = dstPosition.x;
                arrowLocation.y = dstPosition.y;
            }

            var degree = 0;
            if (this.m_ArrowPoint && this.m_ArrowPoint.getParent())
            {
                this.m_ArrowPoint.removeFromParent(true);
                this.m_ArrowPoint = null;
            }

            var moveTo;

            var direction = arrowDir;
            switch (direction)
            {
                case 1: // up
                    degree = 90;

                    moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x,arrowLocation.y+10));
                    break;
                case 2: // down

                    degree = -90;

                    moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x,arrowLocation.y-10));
                    break;
                case 3: // left

                    degree = 0;

                    moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x-10,arrowLocation.y));
                    break;
                case 4: // right

                    degree = -180;

                    moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x+10,arrowLocation.y));
                    break;
            }

            var moveBack = cc.MoveTo.create(Defines.FPS*10, arrowLocation);


//            this.m_ArrowPoint = cc.Sprite.create(Resource.new_arrows_png);
            this.m_ArrowPoint = cc.Sprite.createWithSpriteFrameName("Images_new_arrows.png");
            this.m_ArrowPoint.setAnchorPoint(cc.p(0.5,0.5));
            this.m_ArrowPoint.setPosition(arrowLocation);
            this.m_ArrowPoint.setRotation(degree);
            self.getWindow().addChild(this.m_ArrowPoint,this.m_SpriteZorder.ARROW_ZORDER);

            this.m_ArrowPoint.stopAllActions();
            this.m_ArrowPoint.runAction(
                cc.RepeatForever.create(
                    cc.Sequence.create(
                        moveTo,
                        cc.DelayTime(Defines.FPS*10),
                        moveBack
                    )
                )
            );
        }

        this.getWindow().onTouchesBegan = function(touches, event)
        {

			cc.State_GameLevel.getInstance().setGuideState("showCustomCuteMonsterBase_onlytable onTouchesBegan");
			var gameLevelData1 = cc.DataMng.getInstance().getCurLevelData();
            if (gameLevelData1.ID == 91-1){

				cc.Guide.round_91 ++;
			}
			else if (gameLevelData1.ID == 61-1){
				cc.Guide.round_61 ++;
			}

			if (self.getSpriteArrow())
			{
				self.getSpriteArrow().removeFromParent(true);
				self.m_SpriteArrow = null;
			}
			
			blackInstance.finishLayer();
			self.cleanCuteMonster();
			self.cleanUITip();
			self.cleanPanelWithImage();
			_ChangeGameLevelStateTo(cc.State_GameLevel.getInstance(), "1496");
			if (gameLevelData1.ID == 61-1 && cc.Guide.round_61 == 2){
				var a_bomb = cc.Obj_BombTip.getNowTip();
				if (a_bomb != null){
					var cmd = cc.Cmd_DesMonsBomb.create(a_bomb);
					if (cmd)
					{
						gamelevel.addCommand(cmd);
					}					
				}
			}
			
			
			self.closeWindow();
		
			return self;

        }

        return this;
    },
	
    //------------------------------------------------------------------------------------------------------------------
    showCustomCuteMonsterBase : function (name,constent,layer,blackList,isShowArrow,fingerPos)
    {
        var maxProcessKey = cc.DataMng.getInstance().getMaxProcessLevelKey();
        var maxLevelData = cc.DataMng.getInstance().getLevelDataWithName(maxProcessKey);
        var keyName = "ShowCustomeGuide_" + maxLevelData.NAME;
		
		var gameLevelData = cc.DataMng.getInstance().getCurLevelData();
		if (gameLevelData)
		{
			//var freeKeyName = "FreeContinue_" + gameLevelData.NAME + cc.DataMng.getInstance().isGameLevelGuidFinish("freeContinue_time" + gameLevelData.NAME, false);
			var freeKeyName = "FreeContinue_" + cc.DataMng.getInstance().isGameLevelGuidFinish("freeContinue_time", false);
		}
		else {
			var freeKeyName = "";
		}


		
        var isShow = false;
        if (isShowArrow)
        {
            isShow = isShowArrow;
        }

        var self  = this;
        if (!cc.State_GameGuide.getInstance().isValid())
        {
            return this;
        }

        if (cc.DataMng.getInstance().isGameLevelGuidFinish(name, false))
        {
            return this;
        }

        //
        if (this.getWindow().getParent())
        {
            this.getWindow().removeFromParent(false);
        }


        this.openWindow(layer);

        this.getWindow().getParent().reorderChild(this.getWindow(), 1);

        var isFinger = false;
        if (fingerPos && fingerPos.x != 0 && fingerPos.y != 0)
        {
            this.getSpriteArrow().setVisible(true);
            this.getSpriteArrow().setPosition(fingerPos);

            this.getSpriteArrow().stopAllActions();
            this.getSpriteArrow().runAction(
                cc.RepeatForever.create(
                    cc.Sequence.create(
                        cc.MoveTo.create(Defines.FPS*30,cc.p(fingerPos.x,fingerPos.y-20)),
                        cc.MoveTo.create(Defines.FPS*30,fingerPos)
                    )
                )
            );
        }
        else
        {
            this.getSpriteArrow().stopAllActions();
            this.getSpriteArrow().setVisible(false);
        }

        var self = this;
        var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);


        if (name == "ShareToFriend")
        {
            pos.x -= 130 * Defines.BASE_SCALE;
			if (Defines.IS_SMALL){
				pos.x += 20 * Defines.BASE_SCALE;
			}
//            pos.y -= 100;
            cc.GUIGuideNormal.getInstance().showCuteMonster(2,constent, pos, false, this.getWindow());
        }
        else if (name == keyName)
        {
            pos.x -= 300 * Defines.BASE_SCALE;
            pos.y -= 100 * Defines.BASE_SCALE;
			if (Defines.IS_SMALL){
				pos.x += 40 * Defines.BASE_SCALE;
			}

            if (constent == Resource.ChineseTxt[115]){

                pos.x += 60 * Defines.BASE_SCALE;
            }
            cc.GUIGuideNormal.getInstance().showCuteMonster(3,constent, pos, false, this.getWindow());
        }
        else if (name == freeKeyName){
		
            pos.x += 450 * Defines.BASE_SCALE;
            pos.y -= 80 * Defines.BASE_SCALE;
			if (Defines.IS_SMALL){
//				pos.y += 100 * Defines.BASE_SCALE;
			}
            cc.GUIGuideNormal.getInstance().showCuteMonster(2,constent, pos, false, this.getWindow());
		}
		else
        {
            pos.x -= 60 * Defines.BASE_SCALE;
//            pos.y -= 250;
            cc.GUIGuideNormal.getInstance().showCuteMonster(3,constent, pos, false, this.getWindow());
        }

        this.getWindow().setTouchEnabled(true);

        var indexPos = 0;
        var blackInstance = GUIGuideBlack.getInstance();
        if (blackList && blackList.length > 0)
        {
            blackInstance.changeLayer(this.getWindow());
            blackInstance.handleUI(cc.p(blackList[indexPos].x,blackList[indexPos].y), cc.size(blackList[indexPos].width,blackList[indexPos].height));
        }
        indexPos++;

        if (isShow)
        {
            var arrowLocation = cc.p(_ScreenCenter().x-400 * Defines.BASE_SCALE,_ScreenCenter().y-130 * Defines.BASE_SCALE);
            if (blackList && blackList.length > 0)
            {
                arrowLocation.x = blackList[0].x + blackList[0].width;
                arrowLocation.y = blackList[0].y + blackList[0].height / 2;
            }

			if (name == freeKeyName){
				arrowLocation.x = blackList[0].x + blackList[0].width + 40 * Defines.BASE_SCALE;
			}
			if (name == keyName ){
                if (Defines.IS_SMALL){
                    arrowLocation.x = blackList[0].x + blackList[0].width + 40 * Defines.BASE_SCALE;
                }

                if (constent == Resource.ChineseTxt[115]){

                    arrowLocation.x += 60 * Defines.BASE_SCALE;
                }

            }

            var degree = 0;
            if (this.m_ArrowPoint && this.m_ArrowPoint.getParent())
            {
                this.m_ArrowPoint.removeFromParent(true);
                this.m_ArrowPoint = null;
            }

            var moveTo;

            var direction = 3;
            switch (direction)
            {
                case 1: // up
                    degree = 90;

                    moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x,arrowLocation.y+10));
                    break;
                case 2: // down

                    degree = -90;

                    moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x,arrowLocation.y-10));
                    break;
                case 3: // left

                    degree = 0;

                    moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x-10,arrowLocation.y));
                    break;
                case 4: // right

                    degree = -180;

                    moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x+10,arrowLocation.y));
                    break;
            }

            var moveBack = cc.MoveTo.create(Defines.FPS*10, arrowLocation);


//            this.m_ArrowPoint = cc.Sprite.create(Resource.new_arrows_png);
            this.m_ArrowPoint = cc.Sprite.createWithSpriteFrameName("Images_new_arrows.png");
            this.m_ArrowPoint.setAnchorPoint(cc.p(0.5,0.5));
            this.m_ArrowPoint.setPosition(arrowLocation);
            this.m_ArrowPoint.setRotation(degree);
            self.getWindow().addChild(this.m_ArrowPoint,this.m_SpriteZorder.ARROW_ZORDER);

            this.m_ArrowPoint.stopAllActions();
            this.m_ArrowPoint.runAction(
                cc.RepeatForever.create(
                    cc.Sequence.create(
                        moveTo,
                        cc.DelayTime(Defines.FPS*10),
                        moveBack
                    )
                )
            );
        }

        this.getWindow().onTouchesBegan = function(touches, event)
        {
			cc.DataMng.getInstance().setGameLevelGuidFinish(name);
            if (name == "ShareToFriend")
            {
                //
                var location = touches[0].getLocation();

                var targetRect = cc.GUIGameLevelEndWin.getInstance().getButtonShareRectForGuide();
                if (cc.GuideHelper.getInstance().isContainPointInRect(location, targetRect))
//                if (location.x > targetRect.x
//                    && location.x < targetRect.x + targetRect.width
//                    && location.y > targetRect.y
//                    && location.y < targetRect.y + targetRect.height)
                {
                    if (self.getSpriteArrow())
                    {
                        self.getSpriteArrow().removeFromParent(true);
                        self.m_SpriteArrow = null;
                    }
                    blackInstance.finishLayer();
                    self.cleanCuteMonster();
                    self.cleanUITip();
                    self.cleanPanelWithImage();
                    self.closeWindow();

                    self.getWindow().setTouchEnabled(false);
                    self.getWindow().removeAllChildren(true);
                    self.getWindow().removeFromParent(true);

                    BIMng.getInstance().logGuideNormal("ShareGuide");
                }
            }
            else if (name == "BuyProps")
            {
                //
                var location = touches[0].getLocation();
                var targetRect = cc.GUIShop.getInstance().getShopItemRectForGuide();
                if (cc.GuideHelper.getInstance().isContainPointInRect(location, targetRect))
//                if (location.x > targetRect.x
//                    && location.x < targetRect.x + targetRect.width
//                    && location.y > targetRect.y
//                    && location.y < targetRect.y + targetRect.height)
                {
                    if (self.getSpriteArrow())
                    {
                        self.getSpriteArrow().removeFromParent(true);
                        self.m_SpriteArrow = null;
                    }

                    blackInstance.finishLayer();
                    self.cleanCuteMonster();
                    self.cleanUITip();
                    self.cleanPanelWithImage();
                    self.closeWindow();

                    self.getWindow().setTouchEnabled(false);
                    self.getWindow().removeAllChildren(true);
                    self.getWindow().removeFromParent(true);
                    //
                    if (cc.GUIShop.getInstance().isWindowOpen())
                    {
                        var item = cc.GUIShop.getInstance().getShopItem(2,0);
                        if (item)
                        {
                            item.activate();
                            BIMng.getInstance().logGuideNormal("BuyProps");
                        }
                    }
                }
            }
			else if (name == freeKeyName){
//					cc.log("FreeContinue_5_322222 -- block (x : " + blackList[0].x + ",y : " + blackList[0].y + ",w : " + blackList[0].width + ",h : "+blackList[0].height+")");
//					cc.log("FreeContinue_5 location = " + location.x + );
                    var location = touches[0].getLocation();
                    if (cc.GuideHelper.getInstance().isContainPointInRect(location, blackList[0]))
                    {
						//cc.GUIGameOutMoves.getInstance().unLockBtnAdd();
						//if (cc.DataMng.getInstance().isGameLevelGuidFinish("freeContinue_time" + gameLevelData.NAME, false) > 2){
						if (cc.DataMng.getInstance().isGameLevelGuidFinish("freeContinue_time", false) > 2){
//							cc.GUIGameOutMoves.getInstance()._btnUseCallback();
						}
						else {
							//cc.GUIGameOutMoves.getInstance()._btnConCallback();
							cc.GUIGameOutMoves.getInstance().activateButtonFree();
						}

                        if (self.getSpriteArrow())
                        {
                            self.getSpriteArrow().removeFromParent(true);
                            self.m_SpriteArrow = null;
                        }

                        blackInstance.finishLayer();
                        self.cleanCuteMonster();
                        self.cleanUITip();
                        self.cleanPanelWithImage();
                        self.closeWindow();

                        self.getWindow().setTouchEnabled(false);
                        self.getWindow().removeAllChildren(true);
                        self.getWindow().removeFromParent(true);

                    }
                
			}
            else if(name == keyName)
            {
                var levelItem = cc.GUIMapMng.getInstance().getMapItemWithKey(maxProcessKey);
                var itemSprite = levelItem.getMainRender();
                if (itemSprite)
                {
                    var position = levelItem.convertToWindowSpace();
                    var contentSize = itemSprite.getContentSize();
                    var targetRect = cc.rect(position.x-contentSize.width/2,position.y-contentSize.height/2,contentSize.width,contentSize.height);

                    var location = touches[0].getLocation();
                    if (cc.GuideHelper.getInstance().isContainPointInRect(location, targetRect))
                    {
                        if (self.getSpriteArrow())
                        {
                            self.getSpriteArrow().removeFromParent(true);
                            self.m_SpriteArrow = null;
                        }

                        blackInstance.finishLayer();
                        self.cleanCuteMonster();
                        self.cleanUITip();
                        self.cleanPanelWithImage();
                        self.closeWindow();

                        self.getWindow().setTouchEnabled(false);
                        self.getWindow().removeAllChildren(true);
                        self.getWindow().removeFromParent(true);

                        BIMng.getInstance().logGuideNormal(keyName);
                        cc.GUIMapMng.getInstance().autoRestart(maxLevelData.NAME,true);
                    }
                }
            }
			else if (name == "FreeItems_" + gameLevelData.NAME + "_01"){
				if (self.getSpriteArrow())
				{
					self.getSpriteArrow().removeFromParent(true);
					self.m_SpriteArrow = null;
				}
				blackInstance.finishLayer();
				self.cleanCuteMonster();
				self.cleanUITip();
				self.cleanPanelWithImage();
				self.closeWindow();

				self.getWindow().setTouchEnabled(false);
				self.getWindow().removeAllChildren(true);
				self.getWindow().removeFromParent(true);
				_ChangeGameLevelStateTo(cc.State_GameLevel.getInstance());
			}
            else
            {
                if (self.getSpriteArrow())
                {
                    self.getSpriteArrow().removeFromParent(true);
                    self.m_SpriteArrow = null;
                }
                blackInstance.finishLayer();
                self.cleanCuteMonster();
                self.cleanUITip();
                self.cleanPanelWithImage();
                self.closeWindow();

                self.getWindow().setTouchEnabled(false);
                self.getWindow().removeAllChildren(true);
                self.getWindow().removeFromParent(true);
            }

        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    showCustomCuteMonsterBase_FollowLogin : function (name,constent,layer,blackList)
    {
        var self  = this;
        if (!cc.State_GameGuide.getInstance().isValid())
        {
            return this;
        }

        if (cc.DataMng.getInstance().isGameLevelGuidFinish(name, false))
        {
            return this;
        }

        cc.Guide.isFollowToLogin = true;
        //
        if (this.getWindow().getParent())
        {
            this.getWindow().removeFromParent(false);
        }

        cc.DataMng.getInstance().setGameLevelGuidFinish(name);
        this.openWindow(layer);

        this.getWindow().getParent().reorderChild(this.getWindow(), 1);


        var self = this;
        var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);


        pos.x += 130;
//      pos.y -= 100;
        this.showCuteMonster(4,constent, pos, false, this.getWindow());



        this.getWindow().setTouchEnabled(true);

        var indexPos = 0;
        var blackInstance = GUIGuideBlack.getInstance();
        if (blackList && blackList.length > indexPos)
        {
            blackInstance.changeLayer(this.getWindow());
            blackInstance.handleUIOutCustom(blackList);
        }
        indexPos++;


        this.getWindow().onTouchesBegan = function(touches, event)
        {

            if (name == "FollowToLogin")
            {
                //
                var location = touches[0].getLocation();

                var targetRect = cc.GUIMyFriendsTop.getInstance().getButtonLoginRectForGuide();
//                var nextRect = cc.GUIMyFriendsTop.getInstance().getButtonNextRectForGuide();
                if (cc.GuideHelper.getInstance().isContainPointInRect(location, targetRect))
//                if (location.x > targetRect.x
//                    && location.x < targetRect.x + targetRect.width
//                    && location.y > targetRect.y
//                    && location.y < targetRect.y + targetRect.height)
                {
                     blackInstance.finishLayer();
                     self.cleanCuteMonster();
                     self.cleanUITip();
                     self.cleanPanelWithImage();
                     self.closeWindow();
//                     self.cleanBlackLayer();

                     self.getWindow().setTouchEnabled(false);
                     self.getWindow().removeAllChildren(true);
                     self.getWindow().removeFromParent(true);

                    cc.GUIMyFriendsTop.getInstance().removeWaitForNext();
                    BIMng.getInstance().logGuideNormal("FollowToLogin");
                }
                else //if (cc.GuideHelper.getInstance().isContainPointInRect(location, nextRect))
//                else if (location.x > nextRect.x
//                    && location.x < nextRect.x + nextRect.width
//                    && location.y > nextRect.y
//                    && location.y < nextRect.y + nextRect.height)
                {
                    blackInstance.finishLayer();
                    self.cleanCuteMonster();
                    self.cleanUITip();
                    self.cleanPanelWithImage();
                    self.closeWindow();
//                    self.cleanBlackLayer();

                    self.getWindow().setTouchEnabled(false);
                    self.getWindow().removeAllChildren(true);
                    self.getWindow().removeFromParent(true);

                    cc.GUIMyFriendsTop.getInstance().removeWaitForNext();
                    BIMng.getInstance().logGuideNormal("FollowToLogin");
                }
            }
            else
            {
                blackInstance.finishLayer();
                self.cleanCuteMonster();
                self.cleanUITip();
                self.cleanPanelWithImage();
                self.closeWindow();

                self.getWindow().setTouchEnabled(false);
                self.getWindow().removeAllChildren(true);
                self.getWindow().removeFromParent(true);
            }

        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    showCustomCuteMonsterList : function (name,constent,layer,blackList,isShowArrow,fingerPos, isFlip,cutePos,cuteDirection)
    {
        var isShow = false;
        if (isShowArrow)
        {
            isShow = isShowArrow;
        }

        var self  = this;
        if (!cc.State_GameGuide.getInstance().isValid())
        {
            return this;
        }

        if (cc.DataMng.getInstance().isGameLevelGuidFinish(name,true))
        {
            return this;
        }

        //
        if (this.getWindow().getParent())
        {
            this.getWindow().removeFromParent(false);
        }

        cc.DataMng.getInstance().setGameLevelGuidFinish(name);
        this.openWindow(layer);

        var fingerIndex = 0;
        var isFinger = false;

        var isFlipX = false;
        if (isFlip && isFlip.length > fingerIndex)
        {
            isFlipX = isFlip[fingerIndex];
        }

        if (fingerPos && fingerPos.length > fingerIndex && fingerPos[fingerIndex].x != 0 && fingerPos[fingerIndex].y != 0)
        {
            this.getSpriteArrow().setVisible(true);
            this.getSpriteArrow().setFlipX(isFlipX);
            if (isFlipX)
            {
                fingerPos[fingerIndex].x -= this.getSpriteArrow().getContentSize().width();
            }
            this.getSpriteArrow().setPosition(fingerPos[fingerIndex]);

            this.getSpriteArrow().stopAllActions();
            this.getSpriteArrow().runAction(
                cc.RepeatForever.create(
                    cc.Sequence.create(
                        cc.MoveTo.create(Defines.FPS*30,cc.p(fingerPos[fingerIndex].x,fingerPos[fingerIndex].y-20)),
                        cc.MoveTo.create(Defines.FPS*30,fingerPos[fingerIndex])
                    )
                )
            );
        }
        else
        {
            this.getSpriteArrow().stopAllActions();
            this.getSpriteArrow().setVisible(false);
        }

        fingerIndex++;

        var self = this;
        var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
        pos.x += 160;
//        pos.y -= 250;

        var cuteIndex = 0;
        if (cutePos && cutePos.length > 0)
        {
            pos.x = cutePos[cuteIndex].x;
            pos.y = cutePos[cuteIndex].y;
        }

        var directionCute = 2;
        if (cuteDirection && cuteDirection.length > 0)
        {
            directionCute = cuteDirection[cuteIndex];
        }
        cuteIndex++;

        var pPos = 0;

        this.getWindow().setTouchEnabled(true);
        if (constent.length > 0)
        {
            cc.GUIGuideNormal.getInstance().showCuteMonster(directionCute,constent[0], pos, false, this.getWindow());
        }

        var indexPos = 0;
        var blackInstance = GUIGuideBlack.getInstance();
        if (blackList && blackList.length > 0)
        {
            blackInstance.changeLayer(this.getWindow());
            blackInstance.handleUI(cc.p(blackList[indexPos].x,blackList[indexPos].y), cc.size(blackList[indexPos].width,blackList[indexPos].height));
        }
        indexPos++;


        if (isShow)
        {
            var arrowLocation = cc.p(_ScreenCenter().x-200,_ScreenCenter().y - 150);
            var degree = 0;
            if (this.m_ArrowPoint && this.m_ArrowPoint.getParent())
            {
                this.m_ArrowPoint.removeFromParent(true);
                this.m_ArrowPoint = null;
            }

            var moveTo;

            var direction = 2;
            switch (direction)
            {
                case 1: // up
                    degree = 90;

                    moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x,arrowLocation.y+10));
                    break;
                case 2: // down

                    degree = -90;

                    moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x,arrowLocation.y-10));
                    break;
                case 3: // left

                    degree = 0;

                    moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x-10,arrowLocation.y));
                    break;
                case 4: // right

                    degree = -180;

                    moveTo = cc.MoveTo.create(Defines.FPS*30, cc.p(arrowLocation.x+10,arrowLocation.y));
                    break;
            }

            var moveBack = cc.MoveTo.create(Defines.FPS*10, arrowLocation);


//            this.m_ArrowPoint = cc.Sprite.create(Resource.new_arrows_png);
            this.m_ArrowPoint = cc.Sprite.createWithSpriteFrameName("Images_new_arrows.png");
            this.m_ArrowPoint.setAnchorPoint(cc.p(0.5,0.5));
            this.m_ArrowPoint.setPosition(arrowLocation);
            this.m_ArrowPoint.setRotation(degree);
            self.getWindow().addChild(this.m_ArrowPoint,this.m_SpriteZorder.ARROW_ZORDER);

            this.m_ArrowPoint.runAction(
                cc.RepeatForever.create(
                    cc.Sequence.create(
                        moveTo,
                        cc.DelayTime(Defines.FPS*10),
                        moveBack
                    )
                )
            );
        }

        pPos++;
        this.getWindow().onTouchesBegan = function(touches, event)
        {
            var location = touches[0].getLocation();
            if (name == "BuySuccessful" && cc.Guide.buy_round == 1)
            {
//                var targetRect = cc.GUIShop.getInstance().getButtonCloseRectForGuide();
//                if (location.x > targetRect.x
//                    && location.x < targetRect.x + targetRect.width
//                    && location.y > targetRect.y
//                    && location.y < targetRect.y + targetRect.height)
//                {
//
//                }
//                else
//                {
//                    return self;
//                }
                 BIMng.getInstance().logGuideNormal("BuySuccessful");
            }

            cc.Guide.buy_round++;
            if (self.getSpriteArrow())
            {
                self.getSpriteArrow().removeFromParent(true);
                self.m_SpriteArrow = null;
            }
            blackInstance.finishLayer();
           self.cleanCuteMonster();
           self.cleanUITip();
           self.cleanPanelWithImage();

            if (constent.length > pPos)
            {
                if (cuteDirection && cuteDirection.length > cuteIndex)
                {
                    directionCute = cuteDirection[cuteIndex];
                }

                if (cutePos && cutePos.length > cuteIndex)
                {
                    pos.x = cutePos[cuteIndex].x;
                    pos.y = cutePos[cuteIndex].y;
                }


                cc.GUIGuideNormal.getInstance().showCuteMonster(directionCute,constent[pPos], pos, false, self.getWindow());

                isFlipX = false;
                if (isFlip && isFlip.length > fingerIndex)
                {
                    isFlipX = isFlip[fingerIndex];
                }

                if (fingerPos && fingerPos.length > fingerIndex && fingerPos[fingerIndex].x != 0 && fingerPos[fingerIndex].y != 0)
                {
                    self.getSpriteArrow().setVisible(true);
                    self.getSpriteArrow().setFlipX(isFlipX);
                    if (isFlipX)
                    {
                        fingerPos[fingerIndex].x -= self.getSpriteArrow().getContentSize().width;
                    }
                    self.getSpriteArrow().setPosition(fingerPos[fingerIndex]);

                    self.getSpriteArrow().stopAllActions();
                    self.getSpriteArrow().runAction(
                        cc.RepeatForever.create(
                            cc.Sequence.create(
                                cc.MoveTo.create(Defines.FPS*30,cc.p(fingerPos[fingerIndex].x,fingerPos[fingerIndex].y-20)),
                                cc.MoveTo.create(Defines.FPS*30,fingerPos[fingerIndex])
                            )
                        )
                    );
                }
                else
                {
                    self.getSpriteArrow().stopAllActions();
                    self.getSpriteArrow().setVisible(false);
                }

                if (blackList && blackList.length > 0)
                {
                    blackInstance.changeLayer(self.getWindow());
                    blackInstance.handleUI(cc.p(blackList[indexPos].x,blackList[indexPos].y), cc.size(blackList[indexPos].width,blackList[indexPos].height));
                }
                indexPos++;
                fingerIndex++;
                pPos++;
                cuteIndex++;
            }
            else
            {
                blackInstance.finishLayer();
                self.getWindow().setTouchEnabled(false);
//                self.getWindow().removeAllChildren(true);
//                self.getWindow().removeFromParent(true);
                self.closeWindow();
            }
        }

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    showCustomCuteMonster : function (name,constent)
    {
        if (!cc.State_GameGuide.getInstance().isValid())
        {
            return this;
        }

        if (cc.DataMng.getInstance().isGameLevelGuidFinish(name, false))
        {
            return this;
        }
        cc.DataMng.getInstance().setGameLevelGuidFinish(name);
        this.openWindow(cc.GUIMap.getInstance().getGuideLayer());
        var self = this;
        var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
        pos.x += 250 * Defines.BASE_SCALE;
        pos.y -= 250 * Defines.BASE_SCALE;

        var blackInstance = GUIGuideBlack.getInstance();
        if (name == "GiveGift")
        {
            var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);

            var black = cc.rect(0,0,0,0);
            blackInstance.changeLayer(this.getWindow());
            blackInstance.handleUI(cc.p(black.x,black.y), cc.size(black.width,black.height));
        }

        this.getWindow().setTouchEnabled(true);
        cc.GUIGuideNormal.getInstance().showCuteMonster(4,constent, pos, false, this.getWindow());
        var isShow = false;

        this.getWindow().onTouchesBegan = function(touches, event)
        {
            if (name == "GiveGift")
            {
                blackInstance.finishLayer();
            }
            self.cleanCuteMonster();
            self.cleanUITip();
            self.cleanPanelWithImage();


            if (!isShow)
            {
                isShow = true;
                cc.Guide.isEnterShopGuide = Defines._CanPayDiamond();//false;//true;

                ////////////////////////////////////////////////////////////////////////////////////////////////////////
                var centerPos = cc.p(_ScreenCenter().x,_ScreenCenter().y);

                var diamondList = [];
                for (var i= 0; i<30; i++)
                {
                    var diamond1 = cc.Sprite.createWithSpriteFrameName("general_diamond_1.png");
                    diamond1.setPosition(pos)//(cc.p(centerPos.x-200,centerPos.y-100));
                    self.getWindow().addChild(diamond1,100);
                    diamondList.push(diamond1);
                }

                var enterShopTarget = cc.GUIMap.getInstance().getButtonShopRectForGuide();
                var fingerPos = cc.p(_ScreenTopRight().x - 50 * Defines.BASE_SCALE,_ScreenTopRight().y - 100 * Defines.BASE_SCALE);
                var blackList = [
                    enterShopTarget
                ];
                self.showCustomCuteMonsterWithFinger(Resource.ChineseTxt[77],fingerPos,blackList,true,name);
                ////////////////////////////////////////////////////////////////////////////////////////////////////////
                var rightTop = _ScreenTopRight();
                rightTop.x -= 200 * Defines.BASE_SCALE;
                rightTop.y -= 50 * Defines.BASE_SCALE;

                var num = 0;
                var totalNum = diamondList.length;
                var distanceTime = 0;

                diamondList.forEach(
                    function (a_diamond,index)
                    {
                        distanceTime += 0.03;

                        var intervalPoint = cc.p(pos.x,pos.y);
                        var X = Tools.rangeRandom(-200,200);
                        var Y = Tools.rangeRandom(-200,200);

                        intervalPoint.x += X;
                        intervalPoint.y += Y;

                        a_diamond.runAction(
                            cc.Sequence.create(
                                cc.DelayTime.create(distanceTime),
                                cc.MoveTo.create(Defines.FPS*30,intervalPoint),
                                cc.EaseIn.create(cc.MoveTo.create(Defines.FPS*20,rightTop),1.8),
                                cc.ScaleTo.create(Defines.FPS*15,0),
                                cc.DelayTime.create(0.5),
                                cc.CallFunc.create(
                                    function ()
                                    {
                                        a_diamond.removeFromParent(true);
                                        num++;
                                        if (num >= totalNum)
                                        {
                                            cc.DataMng.getInstance().addMoney(Defines.DIAMOND_REWARD.GUIDE_REWARD, MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_GUIDE); //购买教学
                                            BIMng.getBIDiamond().logDiamondIncome_Guide(Defines.DIAMOND_REWARD.GUIDE_REWARD);
                                            self.m_GiveGiftFinished = true;
                                            BIMng.getInstance().logGuideNormal("GiveGift");
                                        }
                                    }
                                )
                            )
                        );
                    }
                );
            }
        };

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    showCustomCuteMonsterWithFinger : function (constent,fingerPos,blackList,isFlip,name)
    {
        var flip = false;
        if (isFlip)
        {
            flip = isFlip;
        }

        if (!cc.State_GameGuide.getInstance().isValid())
        {
            return this;
        }


        this.openWindow(cc.GUIMap.getInstance().getGuideLayer());

        var indexPos = 0;
        var blackInstance = GUIGuideBlack.getInstance();
        if (blackList && blackList.length > 0)
        {
            blackInstance.changeLayer(this.getWindow());
            blackInstance.handleUI(cc.p(blackList[indexPos].x,blackList[indexPos].y), cc.size(blackList[indexPos].width,blackList[indexPos].height));
        }
        indexPos++;

        var self = this;
        var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
//        pos.x += 250;
//        pos.y -= 250;



        this.getSpriteArrow().setVisible(true);
        this.getSpriteArrow().setPosition(fingerPos);
        if (flip)
        {
            this.getSpriteArrow().setFlipX(flip);
            fingerPos.x -= 90 * Defines.BASE_SCALE;
            fingerPos.y -= 30 * Defines.BASE_SCALE;
            this.getSpriteArrow().setPosition(fingerPos);
        }

        this.getSpriteArrow().stopAllActions();
        this.getSpriteArrow().runAction(
            cc.RepeatForever.create(
                cc.Sequence.create(
                    cc.MoveTo.create(Defines.FPS*30,cc.p(fingerPos.x,fingerPos.y+10)),
                    cc.MoveTo.create(Defines.FPS*30,fingerPos)
                )
            )
        );

        this.getWindow().setTouchEnabled(true);
        cc.GUIGuideNormal.getInstance().showCuteMonster(4,constent, pos, false, this.getWindow());
        var isShow = false

        this.getWindow().onTouchesBegan = function(touches, event)
        {
            if (name && name == "GiveGift")
            {
                //
                var location = touches[0].getLocation();

                if (self.m_GiveGiftFinished)
                {
                    var targetRect = cc.GUIMap.getInstance().getButtonShopRectForGuide();
                    if (cc.GuideHelper.getInstance().isContainPointInRect(location, targetRect))
//                    if (location.x > targetRect.x
//                        && location.x < targetRect.x + targetRect.width
//                        && location.y > targetRect.y
//                        && location.y < targetRect.y + targetRect.height)
                    {
                        blackInstance.finishLayer();
                        self.cleanCuteMonster();
                        self.cleanUITip();
                        self.cleanPanelWithImage();

                        if (!isShow)
                        {
                            isShow = true;
                            self.getSpriteArrow().setFlipX(false);

                            self.closeWindow();

                            self.getWindow().setTouchEnabled(false);
//                            self.getWindow().removeFromParent(true);
                        }

                        cc.GUIMap.getInstance()._btnShopCallback();
                        BIMng.getInstance().logGuideNormal("EnterShop");
                    }
                }
            }
            else
            {
                blackInstance.finishLayer();
                self.cleanCuteMonster();
                self.cleanUITip();
                self.cleanPanelWithImage();

                if (!isShow)
                {
                    isShow = true;
                    self.getSpriteArrow().setFlipX(false);

//                    self.cleanBlackLayer();
                    self.closeWindow();

                    self.getWindow().setTouchEnabled(false);
//                    self.getWindow().removeFromParent(true);
                }
            }


        }

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    cleanPanelWithImage : function()
    {
        if (this.m_ImageSprite)
        {
            this.m_ImageSprite.removeFromParent(true);
            this.m_ImageSprite = null;
        }

        if (this.m_ImageContentLabel)
        {
            this.m_ImageContentLabel.removeFromParent(true);
            this.m_ImageContentLabel = null;
        }

        if (this.m_ImagePanel)
        {
            this.m_ImagePanel.removeFromParent(true);
            this.m_ImagePanel = null;
        }

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    cleanUITip : function()
    {
//        if (this.m_UIContentLabel)
//        {
//            this.m_UIContentLabel.removeFromParent(true);
//            this.m_UIContentLabel = null;
//        }

        if (this.m_UIContentPanel)
        {
            this.m_UIContentPanel.removeFromParent(true);
            this.m_UIContentPanel = null;
        }

        if (this.m_UIArrowPoint)
        {
            this.m_UIArrowPoint.removeFromParent(true);
            this.m_UIArrowPoint = null;
        }
    },
//    //------------------------------------------------------------------------------------------------------------------
//    talk : function(position, content, isFlip,callBack)
//    {
////        var talk_panel = cc.Sprite.create(Resource.talk_panel_png);
//        var talk_panel = cc.Sprite.createWithSpriteFrameName("Images_talk_panel.png");
//        var talkPanelSize = talk_panel.getContentSize();
//        var targetSize = cc.size(300, 200);
//
//        //------------------------------------------------------------------------------------------------------------------
//        var panel = null;
//        if (!isFlip)
//        {
//            if (this.m_MonsterPanel)
//            {
//                this.m_MonsterPanel.removeFromParent(true);
//                this.m_MonsterPanel = null;
//            }
//            var talkPanelScale9 = cc.Scale9Sprite.createWithSpriteFrameName("Images_talk_panel.png",
////                cc.rect(0,0,talkPanelSize.width,talkPanelSize.height),
//                cc.rect(50,50,talkPanelSize.width-50,talkPanelSize.height-50));
//
//            talkPanelScale9.setPreferredSize(targetSize);
//            talkPanelScale9.setAnchorPoint(cc.p(1, 1));
//            talkPanelScale9.setVisible(false);
//
//            this.m_Monster.addChild(talkPanelScale9);
//            this.m_MonsterPanel = talkPanelScale9;
//            panel = this.m_MonsterPanel;
//        }
//        else if (isFlip)
//        {
//            if (this.m_BoyPanel)
//            {
//                this.m_BoyPanel.removeFromParent(true);
//                this.m_BoyPanel = null;
//            }
//
//            var talkPanelScale9 = cc.Scale9Sprite.createWithSpriteFrameName("Images_talk_panel.png",
////                cc.rect(0,0,talkPanelSize.width,talkPanelSize.height),
//                cc.rect(50,50,talkPanelSize.width-50,talkPanelSize.height-50));
//
//            talkPanelScale9.setPreferredSize(targetSize);
//            talkPanelScale9.setAnchorPoint(cc.p(1, 1));
//            talkPanelScale9.setVisible(false);
//
//            this.m_Boy.addChild(talkPanelScale9);
//            this.m_BoyPanel = talkPanelScale9;
//            panel = this.m_BoyPanel;
//        }
//        //
//        var createNew = cc.LabelTTF.create(content, Defines.DefaultFont, 22);
//        createNew.setColor(cc.c3b(78,160,34));
//        panel.addChild(createNew);
//
//
//        var labelPos = cc.p(targetSize.width/2,targetSize.height/3);
//        var labelNewPos = cc.p(targetSize.width/2,targetSize.height/2);
//        if (isFlip)
//        {
//            createNew.setPosition(labelPos);
//            panel.setRotation(180);
//            createNew.setRotation(180);
//            panel.setPosition(cc.p(position.x-targetSize.width/2,position.y-targetSize.height/2));
//        }
//        else
//        {
//            createNew.setPosition(labelNewPos);
//            panel.setPosition(cc.p(0,0));
//        }
//        //
//
//        createNew.setAnchorPoint(cc.p(0.5, 0.5));
//
//        panel.setScale(0);
//        var moveout = cc.ScaleTo.create(Defines.FPS*7,0);
//
//        panel.runAction(
//            cc.Sequence.create(
//                cc.CallFunc.create(
//                    function ()
//                    {
//                        panel.setVisible(true);
//                    }
//                ),
//                cc.ScaleTo.create(Defines.FPS*7,1.2),
//                cc.ScaleTo.create(Defines.FPS*7,1),
//                cc.DelayTime.create(Defines.FPS*100),
////                moveout,
//                cc.CallFunc.create(
//                    function (sender)
//                    {
////                        sender.removeFromParent();
//                        if (callBack)
//                        {
//                            callBack();
//                        }
//                    }
//                )
//            )
//        )
//
//        return this;
//    },
    //------------------------------------------------------------------------------------------------------------------
    cleanCuteMonster : function()
    {
        if (this.m_ArrowPoint)
        {
            this.m_ArrowPoint.removeFromParent(true);
            this.m_ArrowPoint = null;
        }

        if (this.m_ContentLabel)
        {
            this.m_ContentLabel.removeFromParent(true);
            this.m_ContentLabel = null;
        }

        if (this.m_CuteMonster)
        {
            this.m_CuteMonster.removeFromParent(true);
            this.m_CuteMonster = null;
        }
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        if (this.m_SpriteArrow)
        {
            this.m_SpriteArrow.removeFromParent(true);
            this.m_SpriteArrow = null;
        }


        this.getWindow().setTouchEnabled(false);

        this.m_BlackLayer.forEach(
            function (blackLayer)
            {
                blackLayer.removeFromParent(true);
            }
        );

        this.m_BlackLayer = [];

        var blackInstance = GUIGuideBlack.getInstance();
        blackInstance.finishLayer();

        this.cleanCuteMonster();
        this.cleanUITip();
        this.cleanPanelWithImage();

        this.getWindow().removeAllChildren(true);
        this.getWindow().removeFromParent(true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    checkGUIAndCloseWindow : function()
    {
        var checkGuideName = ["FollowToLogin"];
        checkGuideName.forEach(
            function(a_name)
            {
                if (!cc.DataMng.getInstance().isGameLevelGuidFinish(a_name, false))
                {
                    cc.DataMng.getInstance().setGameLevelGuidFinish(a_name);
                }

                cc.GUIGuideNormal.getInstance().closeWindow();
            }
        );
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyOpenWindow: function(window)
    {
        var self = this;
        if (!this.isWindowOpen())
        {
            return this;
        }

        var endGuideWindow = [cc.GUIMsgBox];
        for (var index = 0; index < endGuideWindow.length; index++)
        {
            if (window instanceof endGuideWindow[index])
            {
                self.checkGUIAndCloseWindow();
            }
        }

        return this;
    }
});

cc.GUIGuideNormal._instance = null;
cc.GUIGuideNormal.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIGuideNormal();
        this._instance.init();
    }

    return this._instance;
};
