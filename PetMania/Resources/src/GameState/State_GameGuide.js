//教学引导

cc.Guide.isEnterShopGuide = false;
cc.Guide.isFollowToLogin = false;
cc.Guide.round = 0;
cc.Guide.round_1 = 0;
cc.Guide.round_2 = 0;
cc.Guide.round_4 = 0;
cc.Guide.round_7 = 0;
cc.Guide.round_8 = 0;
cc.Guide.round_12 = 0;
cc.Guide.round_17 = 0;
cc.Guide.round_19 = 0;
cc.Guide.round_21 = 0;
cc.Guide.round_28 = 0;
cc.Guide.round_36 = 0;
cc.Guide.round_46 = 0;
cc.Guide.round_30 = 0;
cc.Guide.round_61 = 0;
cc.Guide.round_91 = 0;
cc.Guide.buy_round = 0;
cc.Guide.buy_GoldenKey = 0;
cc.Guide.MiningGameType = 0;
cc.Guide.cleanAllRoundsFlag = function()
{
    cc.Guide.round = 0;
    cc.Guide.round_1 = 0;
    cc.Guide.round_2 = 0;
    cc.Guide.round_4 = 0;
    cc.Guide.round_7 = 0;
    cc.Guide.round_8 = 0;
	cc.Guide.round_12 = 0;
    cc.Guide.round_17 = 0;
    cc.Guide.round_19 = 0;
    cc.Guide.round_21 = 0;
    cc.Guide.round_28 = 0;
    cc.Guide.round_36 = 0;
    cc.Guide.round_46 = 0;
    cc.Guide.round_30 = 0;
    cc.Guide.round_61 = 0;
    cc.Guide.round_91 = 0;
    cc.Guide.buy_round = 0;
	cc.Guide.buy_GoldenKey = 0;
	cc.Guide.MiningGameType = 0;
};

cc.State_GameGuide = cc.IState.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        
        this.m_IsValid = true;
        this.m_GuideRegister = {};
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "State_GameGuide";
    },

    //------------------------------------------------------------------------------------------------------------------
    isValid: function()
    {
        return this.m_IsValid;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    registerGuide: function(gameLevelName, description, condition, handler, isFinish)
    {
        if (!this.isValid())
        {
            return this;
        }

        this.m_GuideRegister = this.m_GuideRegister || {};
        this.m_GuideRegister[gameLevelName] = this.m_GuideRegister[gameLevelName] || [];

        //
        this.m_GuideRegister[gameLevelName].push(
            {
                description: description,
                condition: condition,
                handler: handler,
                isFinish: isFinish
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    check: function()
    {
        if (!this.isValid())
        {
            return false;
        }

        var gameLevelData = cc.DataMng.getInstance().getCurLevelData();
        if (!gameLevelData)
        {
            return false;
        }

        var register = this.m_GuideRegister[gameLevelData.NAME];
        if (!register)
        {
            return false;
        }

        var result = false;
        for (var indx = 0; indx < register.length; ++indx)
        {
            var _handle = register[indx];
            if (cc.DataMng.getInstance().isGameLevelGuidFinish(gameLevelData.NAME, false))
            {
                continue;
            }

            if (_handle.condition && _handle.condition())
            {
                result = true;
                break;
            }
        }

        return result;
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function(gameLevel)
    {
        if (!this.isValid())
        {
            return this;
        }

        var gameLevelData = cc.DataMng.getInstance().getCurLevelData();
        if (!gameLevelData)
        {
            return this;
        }

        var register = this.m_GuideRegister[gameLevelData.NAME];
        if (!register)
        {
            return false;
        }

        for (var indx = 0; indx < register.length; ++indx)
        {
            var _handle = register[indx];

            if (cc.DataMng.getInstance().isGameLevelGuidFinish(gameLevelData.NAME))
            {
                continue;
            }

            var conditionOK = _handle.condition && _handle.condition();
            if (!conditionOK)
            {
                continue;
            }

            if (_handle.handler)
            {
                if (_handle.handler(gameLevel))
                {
                    BIMng.getInstance().logGuideNormal(_handle.description);
                    if (_handle.isFinish)
                    {
                        cc.AudioMng.getInstance().playGuideEnd();
                        cc.DataMng.getInstance().setGameLevelGuidFinish(gameLevelData.NAME);
                    }
                }
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    enter: function(wrapper, fromState)
    {
        this._super(wrapper, fromState);

        if (!(fromState instanceof cc.State_GameLevel))
        {
            cc.Assert(0, "!(fromState instanceof cc.State_GameLevel)");
        }

        this.handle(wrapper.getGameLevel()/*fromState.m_GameLevel*/);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    leave: function(wrapper)
    {
        this._super(wrapper);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    update: function(wrapper, time)
    {
        this._super(wrapper, time);
        return this;
    }

});

//----------------------------------------------------------------------------------------------------------------------
// 第一关
var guideHandle_normalForTouch0 = function(gameLevel)
{
    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
    pos.y -= 70 * Defines.BASE_SCALE;
    cc.GUIGuideNormal.getInstance().showCuteMonster(1, Resource.ChineseTxt[30], pos, false);

    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(4, 5), cc.p(4, 4),
        [ cc.p(4, 5), cc.p(4, 4), cc.p(5, 4), cc.p(6, 4) ]
    );

    return true;
};

//----------------------------------------------------------------------------------------------------------------------
var guideHandle_normalForTouch1 = function(gameLevel)
{
    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(2, 5), cc.p(2, 4),
        [ cc.p(2, 5), cc.p(2, 4), cc.p(1, 4), cc.p(3, 4) ]
    );

    return true;
};

//----------------------------------------------------------------------------------------------------------------------
var guideHandle_normalForTouch2 = function(gameLevel)
{
    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(4, 7), cc.p(5, 7),
        [ cc.p(4, 7), cc.p(5, 7), cc.p(6, 7), cc.p(7, 7) ]
    );
    return true;
};

//----------------------------------------------------------------------------------------------------------------------
var guideHandle_normalForGUIDescription = function(gameLevel)
{
    var tips = [
        Resource.ChineseTxt[31],
        Resource.ChineseTxt[32]
    ];

    var pos = cc.GUIGameLevel.getInstance().getGuidePromptPositions();
    var posList = [
        cc.p(pos[1].x,pos[1].y-15 * Defines.BASE_SCALE),
        cc.p(pos[0].x,pos[0].y-20 * Defines.BASE_SCALE)
    ];


    var leftMoveRect = cc.GUIGameLevel.getInstance().getMovesRectForGuide();
    var targetRect = cc.GUIGameLevel.getInstance().getTargetRectForGuide();

    var blackList = [
        targetRect,
        leftMoveRect
    ];

    var directionList = [
        1,
        1
    ];


    var directionCute = [
        3,
        3
    ];

    var posListCute = [
        cc.p(_ScreenCenter().x-130 * Defines.BASE_SCALE,_ScreenCenter().y),
        cc.p(_ScreenCenter().x-130 * Defines.BASE_SCALE,_ScreenCenter().y+100 * Defines.BASE_SCALE)
    ];
    cc.GUIGuideNormal.getInstance().showArrowWithCuteContent(_GUILayer(), tips, posList, directionList, blackList, directionCute,posListCute);
    return true;
};

//----------------------------------------------------------------------------------------------------------------------
var guideHandle_StartGameTips = function(gameLevel)
{
    var tips = [
        Resource.ChineseTxt[109]
    ];

    var posList = [
//        _ScreenCenter()
    ];
    var rect = cc.rect(0,0,0,0);

    var blackList = [
        rect
    ];

    var directionList = [
//        2
    ];

    var directionCute = [
        4
    ];

    var posListCute = [
        cc.p(_ScreenCenter().x+150 * Defines.BASE_SCALE,_ScreenCenter().y-100 * Defines.BASE_SCALE)
    ];
	
	var gameLevelData = cc.DataMng.getInstance().getCurLevelData();
	cc.GUIGameLevel.getInstance().unLockButtonList();
    
	cc.GUIGuideNormal.getInstance().showArrowWithCuteContent(_GUILayer(), tips, posList, directionList, blackList, directionCute,posListCute);

    return true;
};

//----------------------------------------------------------------------------------------------------------------------
// 第二关
var guideHandle_Level_2_0 = function(gameLevel)
{
    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(4, 5), cc.p(4, 4),
        [ cc.p(4, 5), cc.p(2, 4), cc.p(3, 4), cc.p(4, 4), cc.p(5, 4) ]
    );

    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
//    pos.x -= 150;
    pos.y -= 100 * Defines.BASE_SCALE;
    cc.GUIGuideNormal.getInstance().showCuteMonster(1, Resource.ChineseTxt[33], pos, false);

    return true;
};


var guideHandle_Level_2_2 = function(gameLevel)
{
    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
    pos.x += 150 * Defines.BASE_SCALE;
    pos.y -= 100 * Defines.BASE_SCALE;
    cc.GUIGuideNormal.getInstance().showCuteMonster(3, Resource.ChineseTxt[34], pos, false);

    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(2, 5), cc.p(2, 4),
        [ cc.p(2, 5), cc.p(2, 4), cc.p(3, 4), cc.p(4, 4) ]
    );
}

var guideHandle_Level_2_3 = function(gameLevel)
{
    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
    pos.x += 50 * Defines.BASE_SCALE;
    pos.y -= 150 * Defines.BASE_SCALE;
    cc.GUIGuideNormal.getInstance().showCuteMonster(4, Resource.ChineseTxt[76], pos, false);

    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(7, 7), cc.p(7, 6),
        [ cc.p(7, 7), cc.p(7, 6), cc.p(5, 6), cc.p(6, 6), cc.p(7,5), cc.p(7,4)]
    );

    return true;
};

var guideHandle_Level_2_5 = function(gameLevel)
{
    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
    pos.x += 170 * Defines.BASE_SCALE;
    pos.y -= 140 * Defines.BASE_SCALE;
    cc.GUIGuideNormal.getInstance().showCuteMonster(4, Resource.ChineseTxt[75], pos, false);

    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(7, 6), cc.p(8, 6),
        [ cc.p(7, 6), cc.p(8, 6), cc.p(8, 5), cc.p(8, 4)]
    );

    return true;
};

//----------------------------------------------------------------------------------------------------------------------
// 第三关
var guideHandle_Level_3_0 = function(gameLevel)
{
    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
//    pos.x += 150;
//    pos.y -= 100;
    cc.GUIGuideNormal.getInstance().showCuteMonster(1, Resource.ChineseTxt[35], pos, false);

    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(4, 4), cc.p(4, 3),
        [ cc.p(4, 4), cc.p(2, 3), cc.p(3, 3), cc.p(4, 3), cc.p(5, 3), cc.p(6, 3) ]
    );
    return true;
};

var guideHandle_Level_3_1 = function(gameLevel)
{
    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
//    pos.x += 150;
//    pos.y -= 100;
    cc.GUIGuideNormal.getInstance().showCuteMonster(1, Resource.ChineseTxt[36], pos, false);


    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(4, 3), cc.p(3, 3),
        [ cc.p(4, 3), cc.p(3, 3), cc.p(5, 3), cc.p(4, 4), cc.p(4, 2) ]
    );
    return true;
};

//----------------------------------------------------------------------------------------------------------------------
// 第五关
var guideHandle_Level_5_0 = function(gameLevel)
{
    var black = cc.GUIGameLevel.getInstance().getButtonItemRectForGuide(0);
    cc.log("guideHandle_Level_5_0 -- block (x : " + black.x + ",y : " + black.y + ",w : " + black.width + ",h : "+black.height+")");
    var blackList = [
        black
    ];
    cc.GUIGuideNormal.getInstance().showArrowForPropsClicked(
        _GUILayer(),
        Resource.ChineseTxt[40],
        cc.p(black.x+3*black.width/4,black.y+black.height/4),
        1,
        blackList,
        gameLevel
    );
    return true;
};

var guideHandle_Level_5_1 = function(gameLevel)
{
    var black = cc.GUIGameLevel.getInstance().getButtonItemRectForGuide(1);
    cc.log("guideHandle_Level_5_1 -- block (x : " + black.x + ",y : " + black.y + ",w : " + black.width + ",h : "+black.height+")");
    var blackList = [
        black
    ];

    cc.GUIGuideNormal.getInstance().showArrowForPropsClicked(
        _GUILayer(),
        "",
        cc.p(black.x+3*black.width/4,black.y+black.height/4),
        1,
        blackList,
        gameLevel
    );


    return true;
};

var guideHandle_Level_5_2 = function(gameLevel)
{
    var black = cc.GUIGameLevel.getInstance().getButtonItemRectForGuide(2);
    cc.log("guideHandle_Level_5_2 -- block (x : " + black.x + ",y : " + black.y + ",w : " + black.width + ",h : "+black.height+")");
    var blackList = [
        black
    ];

    cc.GUIGuideNormal.getInstance().showArrowForPropsClicked(
        _GUILayer(),
        "",
        cc.p(black.x+3*black.width/4,black.y+black.height/4),
        1,
        blackList,
        gameLevel
    );


    return true;
};

//var guideHandle_Level_5_3 = function(gameLevel)
//{
//    var black = cc.GUIGameLevel.getInstance().getButtonItemRectForGuide(3);
//    cc.log("guideHandle_Level_5_3 -- block (x : " + black.x + ",y : " + black.y + ",w : " + black.width + ",h : "+black.height+")");
//    var blackList = [
//        black
//    ];
//
//
//    cc.GUIGuideNormal.getInstance().showArrowForPropsClicked(
//        _GUILayer(),
//        Resource.ChineseTxt[80],
//        cc.p(black.x+black.width,black.y+black.height/2),
//        1,
//        blackList,
//        2
//    );
//
//
//    return true;
//};

var guideHandle_Level_5_4 = function(gameLevel)
{
    var black = cc.GUIGameLevel.getInstance().getTotalButtonItemRectForGuide();
    cc.log("guideHandle_Level_5_4 -- block (x : " + black.x + ",y : " + black.y + ",w : " + black.width + ",h : "+black.height+")");
    var blackList = [
        black
    ];

    cc.log("guideHandle_Level_5_4");
    cc.GUIGuideNormal.getInstance().showArrowForPropsClicked(
        _GUILayer(),
        Resource.ChineseTxt[67],
        cc.p(0,0),
        1,
        blackList
    );

    return true;
};

//----------------------------------------------------------------------------------------------------------------------
// 第四关
var guideHandle_Level_4_0 = function(gameLevel)
{
    var targetRect = cc.GUIGameLevel.getInstance().getTargetRectForGuide();
	
	var blackList = [
        targetRect
    ];
    var tips = [
        Resource.ChineseTxt[42]
    ];

    var pos = cc.GUIGameLevel.getInstance().getGuidePromptPositions();
    var posList = [
        cc.p(pos[1].x,pos[1].y-10 * Defines.BASE_SCALE)
    ];

    var directionList = [
        1
    ];

    var directionCute = [
        3
    ];

    var posListCute = [
        cc.p(_ScreenCenter().x-130 * Defines.BASE_SCALE,_ScreenCenter().y)
    ];
    cc.GUIGuideNormal.getInstance().showArrowWithCuteContent(_GUILayer(), tips, posList, directionList, blackList, directionCute,posListCute);
    return true;

};


var guideHandle_Level_4_1 = function(gameLevel)
{
	var targetRect = cc.GUIGameLevel.getInstance().getTargetRectForGuide();
	var blackPos = cc.p(targetRect.x, targetRect.y);
	var blackSize = cc.size(targetRect.width/2,targetRect.height);
	
    cc.GUIGuideNormal.getInstance().showCanTouchWithMubiaoArrow(_GUILayer(), gameLevel,
        cc.p(5, 3), cc.p(6, 3),
        [ cc.p(3,3), cc.p(4, 3), cc.p(5, 3), cc.p(6, 3) ],
		blackPos,
		blackSize
    );
	
//    var tips = [
////        Resource.ChineseTxt[52]
//    ];
//
    var pos = cc.GUIGameLevel.getInstance().getGuidePromptPositions();
    var posList = [
        cc.p(pos[1].x,pos[1].y-10 * Defines.BASE_SCALE)
    ];

    var directionList = [
        1
    ];

    cc.GUIGuideNormal.getInstance().showUITipWithoutContent( directionList[0],posList[0]);

    return true;
};

var guideHandle_Level_4_2 = function(gameLevel)
{
	var targetRect = cc.GUIGameLevel.getInstance().getTargetRectForGuide();
	var blackPos = cc.p(targetRect.x + targetRect.width/2, targetRect.y);
	var blackSize = cc.size(targetRect.width/2,targetRect.height);
	
    cc.GUIGuideNormal.getInstance().showCanTouchWithMubiaoArrow(_GUILayer(), gameLevel,
        cc.p(4, 4), cc.p(5, 4),
        [ cc.p(2, 4), cc.p(3, 4), cc.p(4, 4), cc.p(5, 4) ],
		blackPos,
		blackSize
    );

    var pos = cc.GUIGameLevel.getInstance().getGuidePromptPositions();
    var posList = [
        cc.p(pos[1].x,pos[1].y-10 * Defines.BASE_SCALE)
    ];

    var directionList = [
        1
    ];
	
    var posListCute = [
        cc.p(_ScreenCenter().x-130 * Defines.BASE_SCALE,_ScreenCenter().y - 30 * Defines.BASE_SCALE)
    ];
	if (Defines.IS_SMALL){
		 posListCute[0].x += 20 * Defines.BASE_SCALE;
	}
    cc.GUIGuideNormal.getInstance().showCuteMonster(1, Resource.ChineseTxt[43], posListCute[0], false);
	
    cc.GUIGuideNormal.getInstance().showUITipWithoutContent( directionList[0],posList[0]);
    return true;
};


var guideHandle_Level_4_3 = function(gameLevel)
{
    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
    pos.x -= 100 * Defines.BASE_SCALE;

//    pos.y -= 100;
    cc.GUIGuideNormal.getInstance().showCuteMonster(4, Resource.ChineseTxt[203], pos, false);

    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(4, 5), cc.p(3, 5),
        [ cc.p(4, 5), cc.p(3, 5) ]
    );
    //cc.GUIGuideNormal.getInstance().openWindowForPanelDescription(_GUILayer(),Resource.ChineseTxt[41]);
    return true;
};

//----------------------------------------------------------------------------------------------------------------------
// 第六关
var guideHandle_Level_6_0 = function(gameLevel)
{
    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(4, 5), cc.p(3, 5),
        [ cc.p(4, 5), cc.p(3, 5) ]
    );

    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
//    pos.x += 150;
    pos.y -= 100 * Defines.BASE_SCALE;
    cc.GUIGuideNormal.getInstance().showCuteMonster(1, Resource.ChineseTxt[204], pos, false);

    return true;
};

//----------------------------------------------------------------------------------------------------------------------
// 第七关
var guideHandle_Level_7_0 = function(gameLevel)
{
    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(4, 6), cc.p(3, 6),
        [ cc.p(4, 6), cc.p(3, 6) ]
    );

    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
    pos.x += 150 * Defines.BASE_SCALE;
    pos.y += 70 * Defines.BASE_SCALE;
    cc.GUIGuideNormal.getInstance().showCuteMonster(2, Resource.ChineseTxt[205], pos, false);
}

var guideHandle_Level_7_1 = function(gameLevel)
{
    var targetRect = cc.GUIGameLevel.getInstance().getButtonItemRectForGuide(2);
    cc.log("guideHandle_Level_7_0 -- block (x : " + targetRect.x + ",y : " + targetRect.y + ",w : " + targetRect.width + ",h : "+targetRect.height+")");
    var blacks = [
        targetRect
    ];

    cc.GUIGuideNormal.getInstance().showArrowForPropsClicked(
        _GUILayer(),
        "",
        cc.p(targetRect.x+3*targetRect.width/4,targetRect.y+targetRect.height/4),
        1,
        blacks
    );

    return true;
};

//----------------------------------------------------------------------------------------------------------------------
// 第八关

var guideHandle_Level_8_0 = function(gameLevel)
{
    var tips = [
        Resource.ChineseTxt[44]
    ];

    var pos = cc.GUIGameLevel.getInstance().getGuidePromptPositions();
    var posList = [
        cc.p(_ScreenCenter().x+200 * Defines.BASE_SCALE,_ScreenCenter().y-10 * Defines.BASE_SCALE)
    ];

    // 洗衣机比较特殊……
    var bossList = cc.BossMng.getInstance().getAllBosses();

    var posBoss = cc.p(0,0);
    if (bossList.length > 0)
    {
        posBoss.x = bossList[0].getPosition().x-Defines.TABLE_GRID_SIZE;
        posBoss.y = bossList[0].getPosition().y-Defines.TABLE_GRID_SIZE;
    }
    var rect = cc.rect(posBoss.x,posBoss.y,Defines.TABLE_GRID_SIZE*2,Defines.TABLE_GRID_SIZE*2);
    var targetRect = cc.GUIGameLevel.getInstance().getTargetRectForGuide();

    var blockList = [
        rect
    ];

    var directionList = [
        2
    ];

    var directionCute = [
        4
    ];

    var posListCute = [
        cc.p(_ScreenCenter().x+150 * Defines.BASE_SCALE,_ScreenCenter().y-100 * Defines.BASE_SCALE)
    ];
    cc.GUIGuideNormal.getInstance().showArrowWithCuteContent(_GUILayer(), tips, posList, directionList, blockList, directionCute,posListCute);

    return true;
};

var guideHandle_Level_8_1 = function(gameLevel)
{

//	var targetRect = cc.GUIGameLevel.getInstance().getTargetRectForGuide();
//	var blackPos = cc.p(targetRect.x, targetRect.y);
//	var blackSize = cc.size(targetRect.width,targetRect.height);
//	
//    cc.GUIGuideNormal.getInstance().showCanTouchWithMubiaoArrow(_GUILayer(), gameLevel,
//        cc.p(3, 3), cc.p(3, 2),
//        [ cc.p(3, 3), cc.p(3, 2), cc.p(4, 2), cc.p(5, 2)],
//		blackPos,
//		blackSize
//    );
//	
////    var tips = [
//////        Resource.ChineseTxt[52]
////    ];
////
//    var pos = cc.GUIGameLevel.getInstance().getGuidePromptPositions();
//    var posList = [
//        cc.p(pos[1].x,pos[1].y-10 * Defines.BASE_SCALE)
//    ];
//
//    var directionList = [
//        1
//    ];
//
//    cc.GUIGuideNormal.getInstance().showUITipWithoutContent( directionList[0],posList[0]);
    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(3, 3), cc.p(3, 2),
        [ cc.p(3, 3), cc.p(3, 2), cc.p(4, 2), cc.p(5, 2)]
    );
    return true;
}

var guideHandle_Level_8_2 = function(gameLevel)
{
    var tips = [

        Resource.ChineseTxt[47]
    ];

    var pos = cc.GUIGameLevel.getInstance().getGuidePromptPositions();
    var posList = [
        pos[1]
    ];

    // 洗衣机比较特殊……
    var bossList = cc.BossMng.getInstance().getAllBosses();

    var posBoss = cc.p(0,0);
    if (bossList.length > 0)
    {
        posBoss.x = bossList[0].getPosition().x-Defines.TABLE_GRID_SIZE;
        posBoss.y = bossList[0].getPosition().y-Defines.TABLE_GRID_SIZE;
    }
    var rect = cc.rect(posBoss.x,posBoss.y,Defines.TABLE_GRID_SIZE*2,Defines.TABLE_GRID_SIZE*2);
    var targetRect = cc.GUIGameLevel.getInstance().getTargetRectForGuide();

    var blockList = [
        targetRect
    ];

    var directionList = [

        1
    ];

    var directionCute = [

        3
    ];

    var posListCute = [
        cc.p(_ScreenCenter().x-130 * Defines.BASE_SCALE,_ScreenCenter().y)
    ];
    cc.GUIGuideNormal.getInstance().showArrowWithCuteContent(_GUILayer(), tips, posList, directionList, blockList, directionCute,posListCute);

    return true;
}

var guideHandle_Level_8_3 = function(gameLevel)
{
    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(4, 5), cc.p(3, 5),
        [ cc.p(4, 5), cc.p(3, 5) ]
    );
	

    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
    pos.x += 150 * Defines.BASE_SCALE;
    pos.y += 70 * Defines.BASE_SCALE;
    cc.GUIGuideNormal.getInstance().showCuteMonster(2, Resource.ChineseTxt[206], pos, false);
	return true;
}


//----------------------------------------------------------------------------------------------------------------------
// 第九关
var guideHandle_Level_9_0 = function(gameLevel)
{
    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(4, 6), cc.p(5, 6),
        [ cc.p(4, 6), cc.p(5, 6) ]
    );

    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
    pos.x -= 100 * Defines.BASE_SCALE;
    pos.y -= 100 * Defines.BASE_SCALE;
    cc.GUIGuideNormal.getInstance().showCuteMonster(4, Resource.ChineseTxt[207], pos, false);
}

//----------------------------------------------------------------------------------------------------------------------
// 第十关
var guideHandle_Level_10_0 = function(gameLevel)
{
    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(6, 2), cc.p(6, 3),
        [ cc.p(6, 2), cc.p(6, 3) ]
    );

    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
    pos.x += 100 * Defines.BASE_SCALE;
    pos.y += 100 * Defines.BASE_SCALE;
    cc.GUIGuideNormal.getInstance().showCuteMonster(4, Resource.ChineseTxt[208], pos, false);
}

//----------------------------------------------------------------------------------------------------------------------
// 第十二关
var guideHandle_Level_12_1 = function(gameLevel)
{
    var targetRect = cc.GUIGameLevel.getInstance().getButtonItemRectForGuide(3);
	
	var blackList = [
        targetRect
    ];
    var tips = [
        Resource.ChineseTxt["LEVEL_12_1"]
    ];

    var pos = cc.GUIGameLevel.getInstance().getGuidePromptPositions();
    var posList = [
        cc.p(targetRect.x + targetRect.width * 1.5,targetRect.y + targetRect.height / 2)
    ];

    var directionList = [
        1
    ];

    var directionCute = [
        3
    ];

    var posListCute = [
        cc.p(_ScreenCenter().x-130 * Defines.BASE_SCALE,_ScreenCenter().y)
    ];
    cc.GUIGuideNormal.getInstance().showArrowWithCuteContent(_GUILayer(), tips, posList, directionList, blackList, directionCute,posListCute);
    return true;
};

var guideHandle_Level_12_2 = function(gameLevel)
{
    var targetRect = cc.GUIGameLevel.getInstance().getButtonItemRectForGuide(3);
	
	var blackList = [
        targetRect
    ];
    var tips = [
        Resource.ChineseTxt["LEVEL_12_2"]
    ];

    var pos = cc.GUIGameLevel.getInstance().getGuidePromptPositions();
    var posList = [
        cc.p(targetRect.x + targetRect.width * 1.5,targetRect.y + targetRect.height / 2)
    ];

    var directionList = [
        1
    ];

    var directionCute = [
        3
    ];

    var posListCute = [
        cc.p(_ScreenCenter().x-130 * Defines.BASE_SCALE,_ScreenCenter().y)
    ];
    cc.GUIGuideNormal.getInstance().showArrowWithCuteContent(_GUILayer(), tips, posList, directionList, blackList, directionCute,posListCute);

    return true;
};

var guideHandle_Level_12_3 = function(gameLevel)
{
//    var fingerPos = cc.p(_ScreenTopRight().x - 50 * Defines.BASE_SCALE,_ScreenTopRight().y - 100 * Defines.BASE_SCALE);
	var blackList = [cc.p(4,4)];


    cc.GUIGuideNormal.getInstance().showCanTouchWithFinger(
        _GUILayer(),
        gameLevel,
        cc.p(4,4),
        blackList
    );
	
	return true;
}


var guideHandle_Level_12_4 = function(gameLevel)
{
    var tips = [
       Resource.ChineseTxt["LEVEL_12_3"]
    ];

    var posList = [
//        _ScreenCenter()
    ];
    var rect = cc.rect(0,0,0,0);

    var blackList = [
        rect
    ];

    var directionList = [
//        2
    ];

    var directionCute = [
        4
    ];

    var posListCute = [
        cc.p(_ScreenCenter().x+150 * Defines.BASE_SCALE,_ScreenCenter().y-100 * Defines.BASE_SCALE)
    ];
    cc.GUIGuideNormal.getInstance().showArrowWithCuteContent(_GUILayer(), tips, posList, directionList, blackList, directionCute,posListCute);

    return true;
};

var guideHandle_Level_12_5 = function(gameLevel)
{
    var targetRect = cc.GUIGameLevel.getInstance().getButtonItemRectForGuide(3);
	
	var blackList = [
        targetRect
    ];
    var tips = [
        Resource.ChineseTxt["LEVEL_12_4"]
    ];

    var pos = cc.GUIGameLevel.getInstance().getGuidePromptPositions();
    var posList = [
        cc.p(targetRect.x + targetRect.width * 1.5,targetRect.y + targetRect.height / 2)
    ];

    var directionList = [
        1
    ];

    var directionCute = [
        3
    ];

    var posListCute = [
        cc.p(_ScreenCenter().x-130 * Defines.BASE_SCALE,_ScreenCenter().y)
    ];
    cc.GUIGuideNormal.getInstance().showArrowWithCuteContent(_GUILayer(), tips, posList, directionList, blackList, directionCute,posListCute);

    return true;
};

var guideHandle_Level_12_6 = function(gameLevel)
{

	DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().setCreateObjectContent("Touch_ByItemToMonsGoldenKey_new", 4);

	var blackList = [cc.p(4,4)];


    cc.GUIGuideNormal.getInstance().showCanTouchWithFinger(
        _GUILayer(),
        gameLevel,
        cc.p(4,4),
        blackList
    );

    return true;
};

var guideHandle_Level_12_7 = function(gameLevel)
{
    var tips = [
       Resource.ChineseTxt["LEVEL_12_5"]
    ];

    var posList = [
//        _ScreenCenter()
    ];
    var rect = cc.rect(0,0,0,0);

    var blackList = [
        rect
    ];

    var directionList = [
//        2
    ];

    var directionCute = [
        4
    ];

    var posListCute = [
        cc.p(_ScreenCenter().x+150 * Defines.BASE_SCALE,_ScreenCenter().y-100 * Defines.BASE_SCALE)
    ];
    cc.GUIGuideNormal.getInstance().showArrowWithCuteContent(_GUILayer(), tips, posList, directionList, blackList, directionCute,posListCute);

    return true;
};

var guideHandle_Level_12_8 = function(gameLevel)
{
    var targetRect = cc.GUIGameLevel.getInstance().getButtonItemRectForGuide(3);
	
	var blackList = [
        targetRect
    ];
    var tips = [
        Resource.ChineseTxt["LEVEL_12_6"]
    ];

    var pos = cc.GUIGameLevel.getInstance().getGuidePromptPositions();
    var posList = [
        cc.p(targetRect.x + targetRect.width * 1.5,targetRect.y + targetRect.height / 2)
    ];

    var directionList = [
        1
    ];

    var directionCute = [
        3
    ];

    var posListCute = [
        cc.p(_ScreenCenter().x-130 * Defines.BASE_SCALE,_ScreenCenter().y)
    ];
    cc.GUIGuideNormal.getInstance().showArrowWithCuteContent(_GUILayer(), tips, posList, directionList, blackList, directionCute,posListCute);

    return true;
};

var guideHandle_Level_12_9 = function(gameLevel)
{

	DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().setCreateObjectContent("Touch_ByItemToMonsGoldenKey_new", 7);

	var blackList = [cc.p(4,4)];


    cc.GUIGuideNormal.getInstance().showCanTouchWithFinger(
        _GUILayer(),
        gameLevel,
        cc.p(4,4),
        blackList
    );

    return true;
};
//----------------------------------------------------------------------------------------------------------------------
// 第十七关
var guideHandle_Level_17_0 = function(gameLevel)
{
    var tips = [
    ];

    var posList = [
    ];

    var directionList = [
        1
    ];
    cc.GUIGuideNormal.getInstance().showArrowWithCuteContent(_GUILayer(), tips, posList, directionList);

    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);

    var black = cc.rect(0,0,0,0);
    var blackList = [
        black
    ];

    cc.GUIGuideNormal.getInstance().showPanelWithImage("floor0.png",Resource.ChineseTxt[59],pos,1.4, true,blackList);

    return true;
};


var guideHandle_Level_17_1 = function(gameLevel)
{
    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(7, 5), cc.p(6, 5),
        [ cc.p(7, 5), cc.p(6, 5), cc.p(6, 4), cc.p(6, 6) ]
    );
    //cc.GUIGuideNormal.getInstance().openWindowForPanelDescription(_GUILayer(),Resource.ChineseTxt[59],Resource.clock_star_png);
    return true;
};

//----------------------------------------------------------------------------------------------------------------------
// 第十九关
var guideHandle_Level_19_0 = function(gameLevel)
{
    var tips = [
    ];

    var posList = [
    ];

    var directionList = [
        1
    ];
    cc.GUIGuideNormal.getInstance().showArrowWithCuteContent(_GUILayer(), tips, posList, directionList);

    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);

    var black = cc.rect(0,0,0,0);
    var blackList = [
        black
    ];
    cc.GUIGuideNormal.getInstance().showPanelWithImage("floor1.png",Resource.ChineseTxt[60],pos,1.4, true,blackList);

    return true;
};

var guideHandle_Level_19_1 = function(gameLevel)
{
    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(5, 5), cc.p(4, 5),
        [ cc.p(5, 5), cc.p(4, 5), cc.p(4, 4), cc.p(4, 6) ]
    );
    //cc.GUIGuideNormal.getInstance().openWindowForPanelDescription(_GUILayer(),Resource.ChineseTxt[60],Resource.clock_star_png);
    return true;
};

var guideHandle_Level_19_2 = function(gameLevel)
{
    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(3, 5), cc.p(4, 5),
        [ cc.p(3, 5), cc.p(4, 5), cc.p(4, 4), cc.p(4, 6) ]
    );
    //cc.GUIGuideNormal.getInstance().openWindowForPanelDescription(_GUILayer(),Resource.ChineseTxt[60],Resource.clock_star_png);
    return true;
};

//----------------------------------------------------------------------------------------------------------------------
// 第二十一关
var guideHandle_Level_21_0 = function(gameLevel)
{
    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
    pos.x -= 100 * Defines.BASE_SCALE;
//    pos.y -= 250;
    cc.GUIGuideNormal.getInstance().showCuteMonster(4, Resource.ChineseTxt[51], pos, false);

    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(4, 4), cc.p(4, 3),
        [ cc.p(4, 4), cc.p(4, 3), cc.p(2, 3), cc.p(3, 3)  ]
    );

    return true;
};

var guideHandle_Level_21_1 = function(gameLevel)
{
    var tips = [
        Resource.ChineseTxt[52]
    ];

    var posList = [
        _ScreenCenter()
    ];
    var rect = cc.rect(0,0,0,0);

    var blackList = [
        rect
    ];

    var directionList = [
        2
    ];

    var directionCute = [
        4
    ];

    var posListCute = [
        cc.p(_ScreenCenter().x+150 * Defines.BASE_SCALE,_ScreenCenter().y-100 * Defines.BASE_SCALE)
    ];
    cc.GUIGuideNormal.getInstance().showArrowWithCuteContent(_GUILayer(), tips, posList, directionList, blackList, directionCute,posListCute);

    return true;
};

var guideHandle_Level_21_2 = function(gameLevel)
{
    var tips = [
        Resource.ChineseTxt[54]
    ];

    var pos = cc.GUIGameLevel.getInstance().getGuidePromptPositions();
    var posList = [
        cc.p(pos[1].x,pos[1].y-20 * Defines.BASE_SCALE)
    ];

    var directionList = [
        1
    ];

    var black = cc.GUIGameLevel.getInstance().getTargetRectForGuide();
    var blackList = [
        black
    ];

    var directionCute = [
        3
    ];

    var posListCute = [
        cc.p(_ScreenCenter().x-130 * Defines.BASE_SCALE,_ScreenCenter().y)
    ];
    cc.GUIGuideNormal.getInstance().showArrowWithCuteContent(_GUILayer(), tips, posList, directionList, blackList, directionCute,posListCute);

    return true;
};

//----------------------------------------------------------------------------------------------------------------------
// 第二十八关
var guideHandle_Level_28_0 = function(gameLevel)
{
    var targetRect = cc.GUIGameLevel.getInstance().getTimeRectForGuide();
    var blackList = [
        targetRect
    ];

    var tips = [
        Resource.ChineseTxt[55]
    ];

    var posList = [
        cc.p(250 * Defines.BASE_SCALE ,520 * Defines.BASE_SCALE) //470 * Defines.BASE_SCALE)
    ];

    var directionList = [
        1
    ];


    var directionCute = [
        3
    ];

    var posListCute = [
        cc.p(_ScreenCenter().x-130 * Defines.BASE_SCALE,_ScreenCenter().y+100 * Defines.BASE_SCALE)
    ];
    cc.GUIGuideNormal.getInstance().showArrowWithCuteContent(_GUILayer(), tips, posList, directionList, blackList, directionCute,posListCute);
    return true;
};

var guideHandle_Level_28_1 = function(gameLevel)
{
    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
    pos.x -= 100 * Defines.BASE_SCALE;
    pos.y -= 40 * Defines.BASE_SCALE;
    cc.GUIGuideNormal.getInstance().showCuteMonster(1, Resource.ChineseTxt[56], pos, false);

    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(3, 4), cc.p(3, 3),
        [ cc.p(3, 4), cc.p(3, 3), cc.p(2, 3), cc.p(4, 3)  ]
    );

    return true;
};

var guideHandle_Level_28_3 = function(gameLevel)
{
    var tips = [
//        Resource.ChineseTxt[57]
    ];

	var setDistance = 330;
	if (Defines._NeedFitIpad()){
		setDistance = 360;
	}
	
    var posList = [
        cc.p(_ScreenCenter().x - setDistance * Defines.BASE_SCALE,_ScreenCenter().y-260 * Defines.BASE_SCALE)
    ];

    var directionList = [
        1
    ];
    cc.GUIGuideNormal.getInstance().showArrowWithCuteContent(_GUILayer(), tips, posList, directionList);
//
    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);

    var black = cc.GUIGameLevel.getInstance().getButtonItemRectForGuide(2);
    var blackList = [
        black
    ];

    cc.GUIGuideNormal.getInstance().showPanelWithImage("icon_item_5.png",Resource.ChineseTxt[68],pos,0.8,true,blackList);
    return true;
};

//----------------------------------------------------------------------------------------------------------------------
// 第三十六关
var guideHandle_Level_36_1 = function(gameLevel)
{
    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);
    pos.x -= 100 * Defines.BASE_SCALE;
    pos.y -= 60 * Defines.BASE_SCALE;
    cc.GUIGuideNormal.getInstance().showCuteMonster(4, Resource.ChineseTxt[61], pos, false);

    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(6, 5), cc.p(5, 5),
        [ cc.p(6, 5), cc.p(5, 5), cc.p(3, 5), cc.p(4, 5)  ]
    );

    return true;
};

var guideHandle_Level_36_2 = function(gameLevel)
{
    var tips = [
        Resource.ChineseTxt[64]
    ];

    var pos = cc.GUIGameLevel.getInstance().getGuidePromptPositions();
    var posList = [
        cc.p(pos[1].x,pos[1].y-20 * Defines.BASE_SCALE)
    ];

    var directionList = [
        1
    ];

    var targetRect = cc.GUIGameLevel.getInstance().getTargetRectForGuide();
    var blackList = [
        targetRect
    ];


    var directionCute = [
        3
    ];

    var posListCute = [
        cc.p(_ScreenCenter().x-130 * Defines.BASE_SCALE,_ScreenCenter().y)
    ];
    cc.GUIGuideNormal.getInstance().showArrowWithCuteContent(_GUILayer(), tips, posList, directionList, blackList, directionCute,posListCute);

    return true;
};

//----------------------------------------------------------------------------------------------------------------------
// 第四十六关
var guideHandle_Level_46_0 = function(gameLevel)
{
    var tips = [
    ];

    var posList = [
    ];

    var directionList = [
        4
    ];
    cc.GUIGuideNormal.getInstance().showArrowWithCuteContent(_GUILayer(), tips, posList, directionList);

    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);

    var black = cc.rect(0,0,0,0);
    var blackList = [
        black
    ];
    cc.GUIGuideNormal.getInstance().showPanelWithImage("stone.png",Resource.ChineseTxt[69],pos,1.4,true,blackList);

    return true;
};

var guideHandle_Level_46_1 = function(gameLevel)
{
    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(2, 4), cc.p(2, 5),
        [ cc.p(2, 4), cc.p(2, 5), cc.p(1, 5), cc.p(3, 5)  ]
    );

//    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y-200);
//    cc.GUIGuideNormal.getInstance().showPanelWithImage("stone.png",Resource.ChineseTxt[69],pos,2.0,true);

    return true;
};


//----------------------------------------------------------------------------------------------------------------------
// 第四十九关
var guideHandle_Level_30_0 = function(gameLevel)
{
    var tips = [
    ];

    var posList = [
    ];

    var directionList = [
        4
    ];
    cc.GUIGuideNormal.getInstance().showArrowWithCuteContent(_GUILayer(), tips, posList, directionList);


    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);

    var black = cc.rect(0,0,0,0);
    var blackList = [
        black
    ];
    cc.GUIGuideNormal.getInstance().showPanelWithImage("lock.png",Resource.ChineseTxt[48],pos,1.4,true,blackList);
    return true;
};

var guideHandle_Level_30_1 = function(gameLevel)
{
    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(4, 3), cc.p(4, 4),
        [ cc.p(4, 3), cc.p(4, 4), cc.p(3, 4), cc.p(5, 4)  ]
    );

    return true;
};

var guideHandle_Level_30_2 = function(gameLevel)
{
    var tips = [
    ];

    var posList = [
    ];

    var directionList = [
        4
    ];
    cc.GUIGuideNormal.getInstance().showArrowWithCuteContent(_GUILayer(), tips, posList, directionList);

    var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);

    var black = cc.rect(0,0,0,0);
    var blackList = [
        black
    ];
    cc.GUIGuideNormal.getInstance().showPanelWithImage("ice2.png",Resource.ChineseTxt[49],pos,1.4,true,blackList);
    return true;
};
//----------------------------------------------------------------------------------------------------------------------
// 第六十一关
var guideHandle_Level_61_0 = function(gameLevel)
{
	var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);

	pos.x -= 80 * Defines.BASE_SCALE;
	pos.y += 100 * Defines.BASE_SCALE;

    var blackList = [
        cc.p(5, 3)
    ];

	cc.GUIGuideNormal.getInstance().showCustomCuteMonsterBase_onlytable(
		Resource.ChineseTxt[229],
		gameLevel,
		_GUILayer(),
		blackList,
		4,
		4,
		pos
	);
    return true;
};

var guideHandle_Level_61_1 = function(gameLevel)
{
    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(7, 3), cc.p(8, 3),
        [ cc.p(5, 3), cc.p(6, 3), cc.p(7, 3), cc.p(8, 3) ]
    );
    return true;
};

var guideHandle_Level_61_2 = function(gameLevel)
{
	var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);

	pos.x -= 100 * Defines.BASE_SCALE;
	pos.y += 10 * Defines.BASE_SCALE;

    var blackList = [
        cc.p(3, 5)
    ];

	cc.GUIGuideNormal.getInstance().showCustomCuteMonsterBase_onlytable(
		Resource.ChineseTxt[230],
		gameLevel,
		_GUILayer(),
		blackList,
		4,
		4,
		pos
	);
    return true;
};

var guideHandle_Level_61_3 = function(gameLevel)
{
	var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);

	pos.x += 180 * Defines.BASE_SCALE;
	pos.y -= 120 * Defines.BASE_SCALE;

    var blackList = [
        cc.p(4, 5),cc.p(2, 4),cc.p(3, 4),cc.p(4, 4),
		cc.p(2, 5),cc.p(3, 5),
		cc.p(2, 6),cc.p(3, 6),cc.p(4, 6)
    ];

	cc.GUIGuideNormal.getInstance().showCustomCuteMonsterBase_onlytable(
		Resource.ChineseTxt[231],
		gameLevel,
		_GUILayer(),
		blackList,
		3,
		3,
		pos
	);
    return true;
};

var guideHandle_Level_61_4 = function(gameLevel)
{
	var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);

	pos.x += 180 * Defines.BASE_SCALE;
	pos.y -= 120 * Defines.BASE_SCALE;

    var blackList = [
        cc.p(4, 5),cc.p(2, 4),cc.p(3, 4),cc.p(4, 4),
		cc.p(2, 5),cc.p(3, 5),
		cc.p(2, 6),cc.p(3, 6),cc.p(4, 6)
    ];

	cc.GUIGuideNormal.getInstance().showCustomCuteMonsterBase_onlytable(
		Resource.ChineseTxt[232],
		gameLevel,
		_GUILayer(),
		blackList,
		3,
		3,
		pos
	);
    return true;
};

var guideHandle_Level_61_5 = function(gameLevel)
{
	var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);

	pos.x += 180 * Defines.BASE_SCALE;
	pos.y -= 120 * Defines.BASE_SCALE;

    var blackList = [
        cc.p(4, 5),cc.p(2, 4),cc.p(3, 4),cc.p(4, 4),
		cc.p(2, 5),cc.p(3, 5),
		cc.p(2, 6),cc.p(3, 6),cc.p(4, 6)
    ];

	cc.GUIGuideNormal.getInstance().showCustomCuteMonsterBase_onlytable(
		Resource.ChineseTxt[233],
		gameLevel,
		_GUILayer(),
		blackList,
		3,
		3,
		pos
	);
    return true;
};

var guideHandle_Level_61_6 = function(gameLevel)
{
    cc.GUIGuideNormal.getInstance().showCanTouchWithArrow(_GUILayer(), gameLevel,
        cc.p(2, 3), cc.p(2, 2),
        [ cc.p(2, 3), cc.p(3, 3), cc.p(4, 3), cc.p(2, 2) ]
    );
    return true;
};

var guideHandle_Level_61_7 = function(gameLevel)
{
	var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);

	pos.x += 180 * Defines.BASE_SCALE;
	pos.y -= 120 * Defines.BASE_SCALE;

    var blackList = [
        cc.p(4, 4),cc.p(2, 4),cc.p(3, 4)
    ];

	cc.GUIGuideNormal.getInstance().showCustomCuteMonsterBase_onlytable(
		Resource.ChineseTxt[234],
		gameLevel,
		_GUILayer(),
		blackList,
		3,
		3,
		pos
	);
    return true;
};
//----------------------------------------------------------------------------------------------------------------------
// 第九十一关
var guideHandle_Level_91_0 = function(gameLevel)
{
	var pos = cc.p(_ScreenCenter().x,_ScreenCenter().y);

	pos.x -= 80 * Defines.BASE_SCALE;
	pos.y += 100 * Defines.BASE_SCALE;
	
    var blackList = [
        cc.p(4, 1)
    ];

	cc.GUIGuideNormal.getInstance().showCustomCuteMonsterBase_onlytable(
		Resource.ChineseTxt[228],
		gameLevel,
		_GUILayer(),
		blackList,
		4,
		4,
		pos
	);
    return true;
};


//----------------------------------------------------------------------------------------------------------------------
cc.State_GameGuide._instance = null;
cc.State_GameGuide.getInstance = function()
{
    var m_round = 0;
    if (!this._instance)
    {
        this._instance = new cc.State_GameGuide();
        this._instance.init();
        //cc.GameManager.getInstance().registerState(this._instance);
        var self = this;
        var isFinishGuid = true;

        //
        this._instance.registerGuide(
            "LEVEL_1",
            "LEVEL_1_0",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0;
            },
            guideHandle_normalForTouch0);

        //
        this._instance.registerGuide(
            "LEVEL_1",
            "LEVEL_1_1",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1;
            },
            guideHandle_normalForTouch1);

        //
        this._instance.registerGuide(
            "LEVEL_1",
            "LEVEL_1_2",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 2;
            },
            guideHandle_normalForTouch2);

        //
        this._instance.registerGuide(
            "LEVEL_1",
            "LEVEL_1_3",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 3 && cc.Guide.round_1 == 0;
            },
            guideHandle_normalForGUIDescription);

        this._instance.registerGuide(
            "LEVEL_1",
            "LEVEL_1_4",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 3 && cc.Guide.round_1 == 2;
            },
            guideHandle_StartGameTips,
            isFinishGuid);
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this._instance.registerGuide(
            "LEVEL_2",
            "LEVEL_2_0",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0;
            },
            guideHandle_Level_2_0);

//        this._instance.registerGuide(
//            "LEVEL_2",
//            "LEVEL_2_1",
//            function()
//            {
//                return cc.DataMng.getInstance().getCurRounds() == 1 && Defines.round_2 == 0;
//            },
//            guideHandle_Level_2_1
//            );

        this._instance.registerGuide(
            "LEVEL_2",
            "LEVEL_2_2",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1;
            },
            guideHandle_Level_2_2);

        this._instance.registerGuide(
            "LEVEL_2",
            "LEVEL_2_3",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 2;
            },
            guideHandle_Level_2_3);

//        this._instance.registerGuide(
//            "LEVEL_2",
//            "LEVEL_2_4",
//            function()
//            {
//                return cc.DataMng.getInstance().getCurRounds() == 3 && Defines.round_2 == 0;
//            },
//            guideHandle_Level_2_4);

        this._instance.registerGuide(
            "LEVEL_2",
            "LEVEL_2_5",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 3;
            },
            guideHandle_Level_2_5);

        this._instance.registerGuide(
            "LEVEL_2",
            "LEVEL_2_6",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 4;
            },
            guideHandle_StartGameTips,
            isFinishGuid);
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this._instance.registerGuide(
            "LEVEL_3",
            "LEVEL_3_0",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0;
            },
            guideHandle_Level_3_0);

        this._instance.registerGuide(
            "LEVEL_3",
            "LEVEL_3_1",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1;
            },
            guideHandle_Level_3_1);

        this._instance.registerGuide(
            "LEVEL_3",
            "LEVEL_3_2",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 2;
            },
            guideHandle_StartGameTips,
            isFinishGuid);


        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var _log = function(des)
        {
            cc.log("--------------------------------");
            cc.log("" + des);
            cc.log("cc.DataMng.getInstance().getCurRounds() = " + cc.DataMng.getInstance().getCurRounds());
            cc.log("cc.Guide.round  = " + cc.Guide.round);
            cc.log("--------------------------------");
        };

        this._instance.registerGuide(
            "LEVEL_5",
            "LEVEL_5_0",
            function()
            {
                _log("LEVEL_5_0");
                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round == 0;
            },
            guideHandle_Level_5_0);

        this._instance.registerGuide(
            "LEVEL_5",
            "LEVEL_5_1",
            function()
            {
                _log("LEVEL_5_1");
                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round == 1;
            },
            guideHandle_Level_5_1);

        this._instance.registerGuide(
            "LEVEL_5",
            "LEVEL_5_2",
            function()
            {
                _log("LEVEL_5_2");
                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round == 2;
            },
            guideHandle_Level_5_2);

//        this._instance.registerGuide(
//            "LEVEL_5",
//            "LEVEL_5_3",
//            function()
//            {
//                _log("LEVEL_5_3");
//                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round == 3;
//            },
//            guideHandle_Level_5_3);


//        this._instance.registerGuide(
//            "LEVEL_5",
//            "LEVEL_5_4",
//            function()
//            {
//                _log("LEVEL_5_4");
//                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round == 4;
//            },
//            guideHandle_Level_5_4);

        this._instance.registerGuide(
            "LEVEL_5",
            "LEVEL_5_5",
            function()
            {
                _log("LEVEL_5_5");
                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round ==3;//>= 5;
            },
            guideHandle_StartGameTips,
            isFinishGuid);
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this._instance.registerGuide(
            "LEVEL_4",
            "LEVEL_4_0",
            function()
            {
				return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round_4 == 0;
				
            },
            guideHandle_Level_4_0);

        this._instance.registerGuide(
            "LEVEL_4",
            "LEVEL_4_1",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round_4 == 1;
            },
            guideHandle_Level_4_1);

        this._instance.registerGuide(
            "LEVEL_4",
            "LEVEL_4_2",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1 && cc.Guide.round_4 == 1;
            },
            guideHandle_Level_4_2);

        this._instance.registerGuide(
            "LEVEL_4",
            "LEVEL_4_3",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 2 && cc.Guide.round_4 == 1;
            },
            guideHandle_Level_4_3);
			
        this._instance.registerGuide(
            "LEVEL_4",
            "LEVEL_4_4",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 3 && cc.Guide.round_4 == 1;
            },
            guideHandle_StartGameTips,
            isFinishGuid);
//		this._instance.registerGuide(
//            "LEVEL_4",
//            "LEVEL_4_1",
//            function()
//            {
//                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round_4 == 1;
//            },
//            guideHandle_StartGameTips,
//            isFinishGuid);
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this._instance.registerGuide(
            "LEVEL_6",
            "LEVEL_6_0",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0;
            },
            guideHandle_Level_6_0
        );

        this._instance.registerGuide(
            "LEVEL_6",
            "LEVEL_6_1",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1;
            },
            guideHandle_StartGameTips,
            isFinishGuid);
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this._instance.registerGuide(
            "LEVEL_7",
            "LEVEL_7_0",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0;
            },
            guideHandle_Level_7_0);


        this._instance.registerGuide(
            "LEVEL_7",
            "LEVEL_7_1",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1 && cc.Guide.round_7 == 0;
            },
            guideHandle_Level_7_1
        );

        this._instance.registerGuide(
            "LEVEL_7",
            "LEVEL_7_2",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1 && cc.Guide.round_7 == 1;
            },
            guideHandle_StartGameTips,
            isFinishGuid);

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this._instance.registerGuide(
            "LEVEL_8",
            "LEVEL_8_0",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round_8 == 0;
            },
            guideHandle_Level_8_0);

        this._instance.registerGuide(
            "LEVEL_8",
            "LEVEL_8_1",
            function()
            {
               // var ret = cc.DataMng.getInstance().getCurRounds();
                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round_8 == 1;
            },
            guideHandle_Level_8_1);

        this._instance.registerGuide(
            "LEVEL_8",
            "LEVEL_8_2",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1 && cc.Guide.round_8 == 1;
            },
            guideHandle_Level_8_2);

        this._instance.registerGuide(
            "LEVEL_8",
            "LEVEL_8_3",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1 && cc.Guide.round_8 == 2;
            },
            guideHandle_Level_8_3);
		
        this._instance.registerGuide(
            "LEVEL_8",
            "LEVEL_8_4",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 2 && cc.Guide.round_8 == 2;
            },
            guideHandle_StartGameTips,
            isFinishGuid);
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this._instance.registerGuide(
            "LEVEL_9",
            "LEVEL_9_0",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0;
            },
            guideHandle_Level_9_0);

        this._instance.registerGuide(
            "LEVEL_9",
            "LEVEL_9_1",
            function()
            {
                var ret = cc.DataMng.getInstance().getCurRounds();
                return cc.DataMng.getInstance().getCurRounds() == 1;
            },
            guideHandle_StartGameTips,
            isFinishGuid);
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this._instance.registerGuide(
            "LEVEL_10",
            "LEVEL_10_0",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0;
            },
            guideHandle_Level_10_0);

        this._instance.registerGuide(
            "LEVEL_10",
            "LEVEL_10_1",
            function()
            {
                var ret = cc.DataMng.getInstance().getCurRounds();
                return cc.DataMng.getInstance().getCurRounds() == 1;
            },
            guideHandle_StartGameTips,
            isFinishGuid);
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		this._instance.registerGuide(
            "LEVEL_12",
            "LEVEL_12_1",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round_12 == 0;
            },
            guideHandle_Level_12_1);
		this._instance.registerGuide(
            "LEVEL_12",
            "LEVEL_12_2",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round_12 == 1;
            },
            guideHandle_Level_12_2);

		this._instance.registerGuide(
            "LEVEL_12",
            "LEVEL_12_3",
            function()
            {
                var ret = cc.DataMng.getInstance().getCurRounds();
                return ret == 0 && cc.Guide.round_12 == 2;
            },
            guideHandle_Level_12_3);
		this._instance.registerGuide(
            "LEVEL_12",
            "LEVEL_12_4",
            function()
            {
                var ret = cc.DataMng.getInstance().getCurRounds();
                return ret == 1 && cc.Guide.round_12 == 3;
            },
            guideHandle_Level_12_4);
			
		this._instance.registerGuide(
            "LEVEL_12",
            "LEVEL_12_5",
            function()
            {
                var ret = cc.DataMng.getInstance().getCurRounds();
                return ret == 1 && cc.Guide.round_12 == 4;
            },
            guideHandle_Level_12_5);
		this._instance.registerGuide(
            "LEVEL_12",
            "LEVEL_12_6",
            function()
            {
                var ret = cc.DataMng.getInstance().getCurRounds();
                return ret == 1 && cc.Guide.round_12 == 5;
            },
            guideHandle_Level_12_6);
		this._instance.registerGuide(
            "LEVEL_12",
            "LEVEL_12_7",
            function()
            {
                var ret = cc.DataMng.getInstance().getCurRounds();
                return ret == 2 && cc.Guide.round_12 == 6;
            },
            guideHandle_Level_12_7);
		this._instance.registerGuide(
            "LEVEL_12",
            "LEVEL_12_8",
            function()
            {
                var ret = cc.DataMng.getInstance().getCurRounds();
                return ret == 2 && cc.Guide.round_12 == 7;
            },
            guideHandle_Level_12_8);
		this._instance.registerGuide(
            "LEVEL_12",
            "LEVEL_12_9",
            function()
            {
                var ret = cc.DataMng.getInstance().getCurRounds();
                return ret == 2 && cc.Guide.round_12 == 8;
            },
            guideHandle_Level_12_9);
		this._instance.registerGuide(
            "LEVEL_12",
            "LEVEL_12_10",
            function()
            {
                var ret = cc.DataMng.getInstance().getCurRounds();
                return ret == 3 && cc.Guide.round_12 == 9;
            },
            guideHandle_StartGameTips,
            isFinishGuid
			);
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this._instance.registerGuide(
            "LEVEL_17",
            "LEVEL_17_0",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round_17 == 0;
            },
            guideHandle_Level_17_0);

        this._instance.registerGuide(
            "LEVEL_17",
            "LEVEL_17_1",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round_17 == 1;
            },
            guideHandle_Level_17_1);

        this._instance.registerGuide(
            "LEVEL_17",
            "LEVEL_17_2",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1;
            },
            guideHandle_StartGameTips,
            isFinishGuid);

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this._instance.registerGuide(
            "LEVEL_19",
            "LEVEL_19_0",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round_19 == 0;
            },
            guideHandle_Level_19_0);

        this._instance.registerGuide(
            "LEVEL_19",
            "LEVEL_19_1",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round_19 == 1;
            },
            guideHandle_Level_19_1);


        this._instance.registerGuide(
            "LEVEL_19",
            "LEVEL_19_2",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1;
            },
            guideHandle_Level_19_2);

        this._instance.registerGuide(
            "LEVEL_19",
            "LEVEL_19_3",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 2;
            },
            guideHandle_StartGameTips,
            isFinishGuid);

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this._instance.registerGuide(
            "LEVEL_21",
            "LEVEL_21_0",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0;
            },
            guideHandle_Level_21_0);

        this._instance.registerGuide(
            "LEVEL_21",
            "LEVEL_21_1",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1 && cc.Guide.round_21 == 0;
            },
            guideHandle_Level_21_1);

        this._instance.registerGuide(
            "LEVEL_21",
            "LEVEL_21_2",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1 && cc.Guide.round_21 == 1;
            },
            guideHandle_Level_21_2);

        this._instance.registerGuide(
            "LEVEL_21",
            "LEVEL_21_3",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1 && cc.Guide.round_21 == 2;
            },
            guideHandle_StartGameTips,
            isFinishGuid);

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this._instance.registerGuide(
            "LEVEL_28",
            "LEVEL_28_0",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round_28 == 0;
            },
            guideHandle_Level_28_0);

//        this._instance.registerGuide(
//            "LEVEL_28",
//            "LEVEL_28_1",
//            function()
//            {
//                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round_28 == 1;
//            },
//            guideHandle_Level_28_1);

        this._instance.registerGuide(
            "LEVEL_28",
            "LEVEL_28_3",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round_28 == 1;
            },
            guideHandle_Level_28_3);

        this._instance.registerGuide(
            "LEVEL_28",
            "LEVEL_28_4",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round_28 == 2;
            },
            guideHandle_StartGameTips,
            isFinishGuid);
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this._instance.registerGuide(
            "LEVEL_36",
            "LEVEL_36_1",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0;
            },
            guideHandle_Level_36_1);

        this._instance.registerGuide(
            "LEVEL_36",
            "LEVEL_36_2",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1 && cc.Guide.round_36 == 0;
            },
            guideHandle_Level_36_2);

        this._instance.registerGuide(
            "LEVEL_36",
            "LEVEL_36_3",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1 && cc.Guide.round_36 == 1;
            },
            guideHandle_StartGameTips,
            isFinishGuid);
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//        this._instance.registerGuide(
//            "LEVEL_46",
//            "LEVEL_46_0",
//            function()
//            {
//                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guidez.round_46 == 0;
//            },
//            guideHandle_Level_46_0);
//
//        this._instance.registerGuide(
//            "LEVEL_46",
//            "LEVEL_46_1",
//            function()
//            {
//                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round_46 == 1;
//            },
//            guideHandle_Level_46_1,
//            isFinishGuid);

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this._instance.registerGuide(
            "LEVEL_30",
            "LEVEL_30_0",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round_30 == 0;
            },
            guideHandle_Level_30_0);

        this._instance.registerGuide(
            "LEVEL_30",
            "LEVEL_30_1",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round_30 == 1;
            },
            guideHandle_Level_30_1);

        this._instance.registerGuide(
            "LEVEL_30",
            "LEVEL_30_2",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1 && cc.Guide.round_30 == 2;
            },
            guideHandle_Level_30_2);

        this._instance.registerGuide(
            "LEVEL_30",
            "LEVEL_30_3",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1 && cc.Guide.round_30 == 3;
            },
            guideHandle_StartGameTips,
            isFinishGuid);
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this._instance.registerGuide(
            "LEVEL_61",
            "LEVEL_61_0",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round_61 == 0;
            },
            guideHandle_Level_61_0);
			
		this._instance.registerGuide(
            "LEVEL_61",
            "LEVEL_61_1",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round_61 == 1;
            },
            guideHandle_Level_61_1,
            isFinishGuid);
		
		this._instance.registerGuide(
            "LEVEL_61",
            "LEVEL_61_2",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1 && cc.Guide.round_61 == 1;
            },
            guideHandle_Level_61_2,
			isFinishGuid);
			
		this._instance.registerGuide(
            "LEVEL_61",
            "LEVEL_61_3",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1 && cc.Guide.round_61 == 2;
            },
            guideHandle_Level_61_3);
			
		this._instance.registerGuide(
            "LEVEL_61",
            "LEVEL_61_4",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1 && cc.Guide.round_61 == 3;
            },
            guideHandle_Level_61_4);
			
		this._instance.registerGuide(
            "LEVEL_61",
            "LEVEL_61_5",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1 && cc.Guide.round_61 == 4;
            },
            guideHandle_Level_61_5);
			
		this._instance.registerGuide(
            "LEVEL_61",
            "LEVEL_61_6",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 1 && cc.Guide.round_61 == 5;
            },
            guideHandle_Level_61_6);
					
		this._instance.registerGuide(
            "LEVEL_61",
            "LEVEL_61_7",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 2 && cc.Guide.round_61 == 5;
            },
            guideHandle_Level_61_7);
		
		this._instance.registerGuide(
            "LEVEL_61",
            "LEVEL_61_8",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 2 && cc.Guide.round_61 == 6;
            },
            guideHandle_StartGameTips,
            isFinishGuid);
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this._instance.registerGuide(
            "LEVEL_91",
            "LEVEL_91_0",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round_91 == 0;
            },
            guideHandle_Level_91_0);

        this._instance.registerGuide(
            "LEVEL_91",
            "LEVEL_91_1",
            function()
            {
                return cc.DataMng.getInstance().getCurRounds() == 0 && cc.Guide.round_91 == 1;
            },
            guideHandle_StartGameTips,
            isFinishGuid);
			
    }

    return this._instance;
};