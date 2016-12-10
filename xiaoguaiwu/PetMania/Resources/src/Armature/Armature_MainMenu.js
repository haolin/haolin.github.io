
var Armature_MainMenu = ArmatureControl.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //
        this.m_ArmatureNames = [
            "logo_new_pink_3d_1",//"pink_3d",
            "logo_green_3d",
//            "logo_new_blue_3d",
            "logo_new_purple_3d",
            "logo_new_orange_3d",
			"logo_new_yellow_3d",
//            "logo_star_0",
            "logo_new_1",
			"logo_new_2",
			"butterfly_1",
			"butterfly_2",
            "logo_new_meteor"
        ];
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "Armature_MainMenu";
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this._super();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    removeArmaturesTexCache: function()
    {
        this._super();

        //
        cc.ResourceMng.getInstance().removeFromCache(
            _ArmaturePath + "MainMenu/GUIMainMenuArmature.plist",
            _ArmaturePath + "MainMenu/GUIMainMenuArmature.png"
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    register: function()
    {
        this._super();

        //
        var armaturePath = _ArmaturePath + "MainMenu/";
        var png = armaturePath + "GUIMainMenuArmature.png";
        var plist = armaturePath + "GUIMainMenuArmature.plist";

        //
        this.m_ArmatureNames.forEach(
            function(xmlName)
            {
                //
                cc.ArmatureDataManager.getInstance().addArmatureFileInfo(
                    xmlName,
                    "",
                    png,
                    plist,
                    armaturePath + xmlName + ".xml");

                //cc.log("" + armaturePath + xmlName + ".xml");
            }
        );


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createArmature: function(firstOpen)
    {
        this._super();
		var self = this;

        var ChildNodeZOrder = {
            GLOBAL_Z_ORDER : 100,
            INFO_Z_ORDER : 200,
            MONSTER_Z_ORDER : 300
        };

        var leftBottom = _ScreenBottomLeft();

        //
		//var backGroundName = _GUIPath + (Defines.IS_SMALL ? "GUIMainMenu/main_bg.png" : "GUIMainMenu/main_bg.jpg");
		var backGroundName = _UsePVR ? _GUIPath + "GUIMainMenu/main_bg.png" : _GUIPath + "GUIMainMenu/main_bg.jpg";

        //
        var back = cc.Sprite.create(backGroundName);
		back.setPosition(cc.p(0 , 0));
        cc.TextureCache.getInstance().removeTextureForKey(backGroundName);

		var backAdd = cc.Sprite.create(_GUIPath + "GUIMainMenu/main_bgAdd.png");
		backAdd.setPosition(cc.p((backAdd.getContentSize().width - 38 ) / 2  * Defines.BASE_SCALE, (backAdd.getContentSize().height / 2 - 7)  * Defines.BASE_SCALE));
		cc.TextureCache.getInstance().removeTextureForKey(_GUIPath + "GUIMainMenu/main_bgAdd.png");
		back.addChild(backAdd, 400);//ChildNodeZOrder.MONSTER_Z_ORDER + 1);
        // 添加文字信息


        var positions = [
            cc.p(leftBottom.x + 945 * Defines.BASE_SCALE, leftBottom.y + 85 * Defines.BASE_SCALE),       // pink
            cc.p(leftBottom.x + 700 * Defines.BASE_SCALE, leftBottom.y + 30 * Defines.BASE_SCALE),        // green xg
//            cc.p(leftBottom.x + 280 * Defines.BASE_SCALE, leftBottom.y + 428 * Defines.BASE_SCALE),       // blue xg
            cc.p(leftBottom.x + 1000 * Defines.BASE_SCALE, leftBottom.y + 295 * Defines.BASE_SCALE),       // purple xg 1070 295
            cc.p(leftBottom.x + 785 * Defines.BASE_SCALE, leftBottom.y + 210 * Defines.BASE_SCALE),       // orange
            cc.p(leftBottom.x + 965 * Defines.BASE_SCALE, leftBottom.y + 90 * Defines.BASE_SCALE),       // yellow
//            cc.p(leftBottom.x + 580 * Defines.BASE_SCALE, leftBottom.y + 420 * Defines.BASE_SCALE),       // star
			cc.p(leftBottom.x + 580 * Defines.BASE_SCALE, leftBottom.y + 390 * Defines.BASE_SCALE),       //  eye
			cc.p(leftBottom.x + 574 * Defines.BASE_SCALE, leftBottom.y + 772 * Defines.BASE_SCALE),       //  eye
			cc.p(leftBottom.x + 380 * Defines.BASE_SCALE, leftBottom.y + 170 * Defines.BASE_SCALE),       //  butterfly_1
			cc.p(leftBottom.x + 280 * Defines.BASE_SCALE, leftBottom.y + 170 * Defines.BASE_SCALE),       //  butterfly_2
            _ScreenCenter()                                     // meteo
        ];
		
		if (Defines._NeedFitIpad()){
			positions[3] = cc.p(leftBottom.x + 1070 * Defines.BASE_SCALE, leftBottom.y + 295 * Defines.BASE_SCALE);
		}

		var beginPos_butterFly = cc.p(leftBottom.x + 550 * Defines.BASE_SCALE, leftBottom.y - 60 * Defines.BASE_SCALE);
		var endPos_butterFly = cc.p(leftBottom.x, leftBottom.y + 300 * Defines.BASE_SCALE); //220 280
		var mid = cc.pMidpoint(beginPos_butterFly, endPos_butterFly);
		mid.x += 200 * Defines.BASE_SCALE;
		mid.y += 150 * Defines.BASE_SCALE;
		var flyTime = Defines.FPS * 500;
		
		var bezierPath_1 = [
			cc.p(beginPos_butterFly.x + 100, beginPos_butterFly.y- 100),
			mid,
			endPos_butterFly
		];
		
		var bezierPath_2 = [
			beginPos_butterFly,
			cc.p(mid.x, mid.y),
			cc.p(endPos_butterFly.x  , endPos_butterFly.y - 50)
		];
		
		var firstDelayTime = 0;
		if (firstOpen){
			//firstDelayTime = 300;
		}
		
		var totalDelay = cc.Sequence.create(
			cc.DelayTime.create(Defines.FPS * firstDelayTime), //延迟一段时间再开始首屏动画播放
			cc.CallFunc.create(
				function (sender)
				{
				self.m_ArmatureNames.forEach(
					function(name, index)
					{
						var starArm = cc.Armature.create(name);
                        if ((Defines.IS_EN || Defines.IS_KO) && name == "logo_new_2"){

                        }
						else if (starArm && name != "logo_new_1")
						{
							starArm.setAnchorPoint(cc.p(0.5, 0.5));
							if (name == "logo_new_2"){
                                             cc.log("playByIndex_____________0");
								starArm.getAnimation().playByIndex(0);
								var sequence = cc.Sequence.create(
									cc.DelayTime.create(Defines.FPS * 50),
									cc.CallFunc.create(
										function (sender)
										{
											sender.getAnimation().stop();
											sender.removeFromParent(true);
											
											var exArm = cc.Armature.create("logo_new_1");
											exArm.setAnchorPoint(cc.p(0.5, 0.5));
                                                       cc.log("playByIndex_____________1");
											exArm.getAnimation().playByIndex(0, 0, -1, true);
											exArm.getAnimation().setAnimationScale(25/60);
											exArm.setScale(Defines.BASE_SCALE);
											back.addChild(exArm, ChildNodeZOrder.MONSTER_Z_ORDER);
											if (Defines._NeedFitIpad()){
												exArm.setScaleX(_ScreenHeight()/back.getContentSize().height);
											}
											exArm.setPosition(cc.p(leftBottom.x + 578 * Defines.BASE_SCALE, leftBottom.y + 390 * Defines.BASE_SCALE));
										},
										null
									)
								);
								starArm.runAction(sequence);
							}
							else {
                                             cc.log("playByIndex_____________2");
								starArm.getAnimation().playByIndex(0, 0, -1, true);
							}
							
							starArm.getAnimation().setAnimationScale(25/60);
							starArm.setScale(Defines.BASE_SCALE);
							
							var z_order = ChildNodeZOrder.MONSTER_Z_ORDER;
							
							if (name == "butterfly_1") {
								starArm.setPosition(beginPos_butterFly);
								
								starArm.schedule(function()
									{
									starArm.setPosition(cc.p(beginPos_butterFly.x + 150, beginPos_butterFly.y- 150));
									starArm.runAction(cc.BezierTo.create(flyTime + Defines.FPS * 20, bezierPath_1));
									},
									9
								);
								
							}
							else if (name == "butterfly_2"){
								starArm.setPosition(beginPos_butterFly);
								starArm.schedule(function()
									{
									starArm.setPosition(beginPos_butterFly);
									starArm.runAction(cc.BezierTo.create(flyTime, bezierPath_2));
									},
									9
								);

							}
							
							else {
								starArm.setPosition(positions[index]);
							}
							back.addChild(starArm, z_order);
							

						}
						if (Defines._NeedFitIpad()){
							var scaleX = _ScreenHeight()/back.getContentSize().height;
							cc.log("(name = " + name);
							starArm.setScaleX(scaleX);
						}
					}
				);

				},
				null
			)
		);
		
		back.runAction(totalDelay);
        //处理缩放
        GUI.backGroundScaleToScreen(back);

        return back;
    }

});

//
Armature_MainMenu.create = function()
{
    var createNew = new Armature_MainMenu();
    createNew.init();
    return createNew;
};