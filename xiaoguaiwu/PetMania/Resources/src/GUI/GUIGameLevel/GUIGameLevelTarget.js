/**
 * 数据和渲染在数组的序列一致
 */

//======================================================================================================================
var _TargetData_ModelScore = function(levelData)
{
    return levelData.TARGET_SCORES[0];
};
//----------------------------------------------------------------------------------------------------------------------
var _TargetData_ModelUnlock = function(/*levelData*/)
{
    var unlockNums = [];

    var lockBuild = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().getCreateObjectContentOfObjLock();
    if (lockBuild > 0)
    {
        var lockDes = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_Lock");
        var lockCount = lockBuild - lockDes;
        unlockNums.push(lockCount);
    }

    var floorBuild = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().getCreateObjectContentOfObjFloor();
    if (floorBuild > 0)
    {
        var floorDes = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_Floor");
        var floorCount = floorBuild - floorDes;
        unlockNums.push(floorCount);
    }

    return unlockNums;
};
//----------------------------------------------------------------------------------------------------------------------
var _TargetData_ModelDes = function(levelData)
{
    var desNums = [];
    var targets = levelData.TARGET_DES_DATA.concat();

    targets.forEach(
        function(a_target)
        {
            if (a_target.color)
            {
                var current = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyMonsterByColorContent(a_target.color);
            }
			else if (a_target.action)
            {
				current = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent(a_target.action);
			}

            current = current || 0;
            a_target.num =  a_target.num || 0;

            var finValue = a_target.num - current;
            if (finValue < 0)
            {
                finValue = 0;
            }

            desNums.push(finValue)
        }
    );

    return desNums;
};
//----------------------------------------------------------------------------------------------------------------------
var _TargetData_ModelTime = function(levelData)
{
    return levelData.TARGET_SCORES[0];
};
//----------------------------------------------------------------------------------------------------------------------
var _TargetData_ModelBubble = function(levelData)
{
    var current = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_BubbleCreator");
    current = current || 0;
    var target =  levelData.TARGET_DES_BUBBLES || 0;

    var finalValue = target- current;
    if (finalValue < 0)
    {
        finalValue = 0;
    }

    return finalValue;
};
//----------------------------------------------------------------------------------------------------------------------
var _TargetData_ModelFlower = function(levelData)
{
    var data = levelData.TARGET_DES_DATA[0];
    var createFlower = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getCreateObjFlowerWhenGameLevelRunning(data.level);
    createFlower = createFlower || 0;

    var finalFlower = data.num - createFlower;
    if (finalFlower < 0)
    {
        finalFlower = 0;
    }

    return finalFlower;
};
//----------------------------------------------------------------------------------------------------------------------
var _TargetData_ModelBoss = function(/*levelData*/)
{
    return cc.BossMng.getInstance().getBossPoints();
};
//----------------------------------------------------------------------------------------------------------------------
var _TargetData_ModelSnake = function(levelData)
{
    var currentSnakes = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_Snake");
    currentSnakes = currentSnakes || 0;

    var leftSnakes = (levelData.SNAKE_COUNT || 0) - currentSnakes;
    if (leftSnakes < 0)
    {
        leftSnakes = 0;
    }

    return leftSnakes;
};
//----------------------------------------------------------------------------------------------------------------------
var _TargetData_ModelMine = function(levelData)
{
    var mineNums = [];

    if (levelData.MINE_LINE)
    {
        var mineDesLine = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterMineDesLine");
        mineDesLine = mineDesLine || 0;

        var leftMineLines = levelData.MINE_LINE - mineDesLine;
        if (leftMineLines < 0)
        {
            leftMineLines = 0;
        }

        mineNums.push(leftMineLines);
    }

    if (levelData.RAD_NUM)
    {
        var mineRad = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterMineRad");
        mineRad = mineRad || 0;

        var leftMineRad = levelData.RAD_NUM - mineRad;
        if (leftMineRad < 0)
        {
            leftMineRad = 0;
        }

        mineNums.push(leftMineRad);
    }

    if (levelData.TASK_NUM)
    {
        var mineTask =DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterMineTask");
        mineTask = mineTask || 0;

        var leftMineTask = levelData.TASK_NUM - mineTask;
        if (leftMineTask < 0)
        {
            leftMineTask = 0;
        }

        mineNums.push(leftMineTask);
    }
    return mineNums;
};

//----------------------------------------------------------------------------------------------------------------------
var _TargetData_ModelMineLottery = function(levelData)
{
    var mineNums = [];

	var targets = cc.MineMng.getInstance().getSpec_Award();

    var itemArr = _GetMineSpecialArr();

    targets.forEach(
        function(a_target)
        {
            var targetNum = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().getCreateObjectContent("mineSpecial_" + itemArr[a_target - 1].NAME);

//            switch (a_target)
//            {
//                case Defines.GameMineSpecial.ITEM_DIRECTION_EX.ID:
//                    targetNum = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().getCreateObjectContent("mineSpecial_" + Defines.GameMineSpecial.ITEM_DIRECTION_EX.NAME);
//                    break;
//                case Defines.GameMineSpecial.ITEM_COLORFUL_EX.ID:
//                    targetNum = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().getCreateObjectContent("mineSpecial_" + Defines.GameMineSpecial.ITEM_COLORFUL_EX.NAME);
//                    break;
//                case Defines.GameMineSpecial.ITEM_WARP_EX.ID:
//                    targetNum = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().getCreateObjectContent("mineSpecial_" + Defines.GameMineSpecial.ITEM_WARP_EX.NAME);
//                    break;
//                default :
//                    targetNum = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().getCreateObjectContent("mineSpecial_" + Defines.GameMineSpecial.ITEM_DIRECTION_EX.NAME);
//                    break;
//            }
            mineNums.push(targetNum);
        }
    );

    var mineDesLine = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterDiamond");
    var mineDesLine_nor = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterMine");
    mineDesLine = (mineDesLine + mineDesLine_nor) || 0;
    mineNums.push(mineDesLine);

    return mineNums;
};
//----------------------------------------------------------------------------------------------------------------------

var Level_TargetData = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_TargetDataFunc = {};
    },

    //------------------------------------------------------------------------------------------------------------------
    registerTargetDataFunc: function(model, func)
    {
        this.m_TargetDataFunc[model] = func;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    execTargetDataFunc: function(levelData)
    {
        var targetData = [];

        var norFunc = this.m_TargetDataFunc[levelData.MODEL];
        if (norFunc)
        {
            var norTarget = norFunc(levelData);
            targetData = targetData.concat(norTarget);
        }

        if (levelData.MODEL_MIX && levelData.MODEL_MIX != Defines.TARGET_MODEL.MODEL_TIME)
        {
            var mixFunc = this.m_TargetDataFunc[levelData.MODEL_MIX];
            if (mixFunc)
            {
                var mixTarget = mixFunc(levelData);
                targetData = targetData.concat(mixTarget);
            }
        }

        return targetData;
    }

    //------------------------------------------------------------------------------------------------------------------
});

Level_TargetData._instance = null;
Level_TargetData.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new Level_TargetData();

        this._instance.registerTargetDataFunc(Defines.TARGET_MODEL.MODEL_SCORE, _TargetData_ModelScore);
        this._instance.registerTargetDataFunc(Defines.TARGET_MODEL.MODEL_UNLOCK, _TargetData_ModelUnlock);
        this._instance.registerTargetDataFunc(Defines.TARGET_MODEL.MODEL_DESTROY, _TargetData_ModelDes);
        this._instance.registerTargetDataFunc(Defines.TARGET_MODEL.MODEL_TIME, _TargetData_ModelTime);
        this._instance.registerTargetDataFunc(Defines.TARGET_MODEL.MODEL_BUBBLE, _TargetData_ModelBubble);
        this._instance.registerTargetDataFunc(Defines.TARGET_MODEL.MODEL_FLOWER, _TargetData_ModelFlower);
        this._instance.registerTargetDataFunc(Defines.TARGET_MODEL.MODEL_BOSS, _TargetData_ModelBoss);
        this._instance.registerTargetDataFunc(Defines.TARGET_MODEL.MODEL_SNAKE, _TargetData_ModelSnake);
		this._instance.registerTargetDataFunc(Defines.TARGET_MODEL.MODEL_MINELOTTERY, _TargetData_ModelMineLottery);
        this._instance.registerTargetDataFunc(Defines.TARGET_MODEL.MODEL_MINE, _TargetData_ModelMine);
    }

    return this._instance;
};


//======================================================================================================================
var _TargetRender_Base = function(render)
{
    //为了使Info界面和GiveUp界面与元素的属性无关
    var baseLayer = cc.Layer.create();
    baseLayer.ignoreAnchorPointForPosition(false);
    var tempSprite = cc.Sprite.createWithSpriteFrameName("game_panel_target_0.png");
    baseLayer.setContentSize(cc.size(10, tempSprite.getContentSize().height));
    render.addChild(baseLayer);
    return baseLayer;
};
//======================================================================================================================
var _TargetRender_BaseMine = function(render)
{
    //采矿的UI版本
    var baseLayer = cc.Layer.create();
    baseLayer.ignoreAnchorPointForPosition(false);
    var tempSprite = cc.Sprite.createWithSpriteFrameName("game_panel_target_2.png");
    baseLayer.setContentSize(cc.size(tempSprite.getContentSize().width, 40 * Defines.BASE_SCALE));
    render.addChild(baseLayer);
    return baseLayer;
};
//----------------------------------------------------------------------------------------------------------------------
var _TargetRender_ModelScore = function(levelData, render)
{
    var renderBase = _TargetRender_Base(render);
    var renderSize = renderBase.getContentSize();

    var labelScore = GUI.createNumberLabel("", _GUIPath + "Num/num_2_20x24.png", 20, 24, ".");
    renderBase.addChild(labelScore);
    labelScore.setAnchorPoint(cc.p(0.5, 0.5));
    labelScore.setPosition(cc.p(renderSize.width/2, renderSize.height/2));

    return labelScore;
};
//----------------------------------------------------------------------------------------------------------------------
var _TargetRender_ModelUnlock = function(levelData, render)
{
    var unlockLabels = [];

    var lockBuild = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().getCreateObjectContentOfObjLock();
    if (lockBuild > 0)
    {
        var renderBase = _TargetRender_Base(render);
        var renderSize = renderBase.getContentSize();

        var spriteLock = cc.Sprite.createWithSpriteFrameName("lock.png");
        renderBase.addChild(spriteLock);
        spriteLock.setPosition(cc.p(renderSize.width/2, renderSize.height * 0.65));
        spriteLock.setScale(0.55);

        var lockLabel = GUI.createNumberLabel("", _GUIPath + "Num/num_2_20x24.png", 20, 24, ".");
        renderBase.addChild(lockLabel);
        lockLabel.setAnchorPoint(cc.p(0.5, 0.5));
        lockLabel.setPosition(cc.p(renderSize.width/2, renderSize.height * 0.3));

        unlockLabels.push(lockLabel);
    }

    var floorBuild = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().getCreateObjectContentOfObjFloor();
    if (floorBuild > 0)
    {
        renderBase = _TargetRender_Base(render);
        renderSize = renderBase.getContentSize();

        var spriteFloor = cc.Sprite.createWithSpriteFrameName("floor0.png");
        renderBase.addChild(spriteFloor);
        spriteFloor.setPosition(cc.p(renderSize.width/2, renderSize.height * 0.65));
        spriteFloor.setScale(0.55);

        var floorLabel = GUI.createNumberLabel("", _GUIPath + "Num/num_2_20x24.png", 20, 24, ".");
        renderBase.addChild(floorLabel);
        floorLabel.setAnchorPoint(cc.p(0.5, 0.5));
        floorLabel.setPosition(cc.p(renderSize.width/2, renderSize.height * 0.3));

        unlockLabels.push(floorLabel);
    }

    return unlockLabels;
};
//----------------------------------------------------------------------------------------------------------------------
var _TargetRender_ModelDes = function(levelData, render)
{
    var desLabels = [];
    var targets = levelData.TARGET_DES_DATA.concat();

    targets.forEach(
        function(a_target)
        {
            var renderBase = _TargetRender_Base(render);
            var renderSize = renderBase.getContentSize();

			if (a_target.color)
            {
				var sprite = MonsterRender.createSprite(a_target.color);
				sprite.setScale(0.65);
			}
			else if (a_target.action)
            {
				switch (a_target.action)
                {
					case Defines.RECORD.DIRECTIONCREATE:
					case Defines.RECORD.DIRECTIONDESTROY:
						sprite = cc.Sprite.createWithSpriteFrameName("icon_item_1.png");
						break;

					case Defines.RECORD.COLORFULCREATE:
					case Defines.RECORD.COLORFULDESTROY:
						sprite = cc.Sprite.createWithSpriteFrameName("icon_item_3.png");
						break;

                    case Defines.RECORD.WRAPCREATE:
					case Defines.RECORD.WRAPDESTROY:
						sprite = cc.Sprite.createWithSpriteFrameName("icon_item_2.png");
						break;

					default:
						break;
				}

				if (sprite)
                {
					sprite.setScale(0.4);
				}
			}

            if (sprite)
            {
                renderBase.addChild(sprite);
                sprite.setPosition(cc.p(renderSize.width/2, renderSize.height * 0.65));
            }

            //
            var desLabel = GUI.createNumberLabel("", _GUIPath + "Num/num_2_20x24.png", 20, 24, ".");
            renderBase.addChild(desLabel);
            desLabel.setAnchorPoint(cc.p(0.5, 0.5));
            desLabel.setPosition(cc.p(renderSize.width/2, renderSize.height * 0.35));
            desLabel.setScale(0.8);

            desLabels.push(desLabel);
        }
    );

    return desLabels;
};
//----------------------------------------------------------------------------------------------------------------------
var _TargetRender_ModelTime = function(levelData, render)
{
    var renderBase = _TargetRender_Base(render);
    var renderSize = renderBase.getContentSize();

    var labelScore = GUI.createNumberLabel("", _GUIPath + "Num/num_2_20x24.png", 20, 24, ".");
    renderBase.addChild(labelScore);
    labelScore.setAnchorPoint(cc.p(0.5, 0.5));
    labelScore.setPosition(cc.p(renderSize.width/2, renderSize.height/2));

    return labelScore;
};
//----------------------------------------------------------------------------------------------------------------------
var _TargetRender_ModelBubble = function(levelData, render)
{
    var renderBase = _TargetRender_Base(render);
    var renderSize = renderBase.getContentSize();

    var sprite = cc.Sprite.createWithSpriteFrameName("bubble_creator0.png");
    renderBase.addChild(sprite);
    sprite.setPosition(cc.p(renderSize.width/2, renderSize.height * 0.6));
    sprite.setScale(0.55);

    var bubbleLabel = GUI.createNumberLabel("", _GUIPath + "Num/num_2_20x24.png", 20, 24, ".");
    renderBase.addChild(bubbleLabel);
    bubbleLabel.setAnchorPoint(cc.p(0.5, 0.5));
    bubbleLabel.setPosition(cc.p(renderSize.width/2, renderSize.height * 0.26));

    return bubbleLabel;
};
//----------------------------------------------------------------------------------------------------------------------
var _TargetRender_ModelFlower = function(levelData, render)
{
    var renderBase = _TargetRender_Base(render);
    var renderSize = renderBase.getContentSize();

    var sprite = MonsterFlowerRender.createSprite(levelData.TARGET_DES_DATA[0].level);
    renderBase.addChild(sprite);
    sprite.setPosition(cc.p(renderSize.width/2, renderSize.height * 0.65));
    sprite.stopAllActions();
    sprite.setScale(0.55);

    var createLabel = GUI.createNumberLabel("", _GUIPath + "Num/num_2_20x24.png", 20, 24, ".");
    renderBase.addChild(createLabel);
    createLabel.setAnchorPoint(cc.p(0.5, 0.5));
    createLabel.setPosition(cc.p(renderSize.width/2, renderSize.height * 0.35));

    return createLabel;
};
//----------------------------------------------------------------------------------------------------------------------
var _TargetRender_ModelBoss = function(levelData, render)
{
    var renderBase = _TargetRender_Base(render);
    var renderSize = renderBase.getContentSize();

    var sprite = cc.Sprite.createWithSpriteFrameName("hatch_open_7.png");
    renderBase.addChild(sprite);
    sprite.setPosition(cc.p(renderSize.width/2, renderSize.height * 0.6));
    sprite.stopAllActions();
    sprite.setScale(0.40);

    var bossLabel = GUI.createNumberLabel("", _GUIPath + "Num/num_2_20x24.png", 20, 24, ".");
    renderBase.addChild(bossLabel);
    bossLabel.setAnchorPoint(cc.p(0.5, 0.5));
    bossLabel.setPosition(cc.p(renderSize.width/2, renderSize.height * 0.26));

    return bossLabel;
};
//----------------------------------------------------------------------------------------------------------------------
var _TargetRender_ModelSnake = function(levelData, render)
{
    var renderBase = _TargetRender_Base(render);
    var renderSize = renderBase.getContentSize();

    var sprite = cc.Sprite.createWithSpriteFrameName("hatch_open_7.png");
    renderBase.addChild(sprite);
    sprite.setPosition(cc.p(renderSize.width/2, renderSize.height * 0.6));
    sprite.stopAllActions();
    sprite.setScale(0.40);

    var bossLabel = GUI.createNumberLabel("", _GUIPath + "Num/num_2_20x24.png", 20, 24, ".");
    renderBase.addChild(bossLabel);
    bossLabel.setAnchorPoint(cc.p(0.5, 0.5));
    bossLabel.setPosition(cc.p(renderSize.width/2, renderSize.height * 0.26));

    return bossLabel;
};

//----------------------------------------------------------------------------------------------------------------------
var _TargetRender_ModelMineLottery = function(levelData, render)
{
//    var mineLabels = [];
//	var renderBase = _TargetRender_Base(render);
//	var renderSize = renderBase.getContentSize();
//
//	var mineLine = cc.Sprite.createWithSpriteFrameName("general_diamond_1.png");
//	renderBase.addChild(mineLine);
//	mineLine.setPosition(cc.p(renderSize.width/2, renderSize.height * 0.65));
//	mineLine.setScale(0.65);
//
//	//
//	var diamondLabel = GUI.createNumberLabel("0", _GUIPath + "Num/num_2_20x24.png", 20, 24, ".");
//	renderBase.addChild(diamondLabel);
//	diamondLabel.setAnchorPoint(cc.p(0.5, 0.5));
//	diamondLabel.setPosition(cc.p(renderSize.width/2, renderSize.height * 0.35));
//	diamondLabel.setScale(0.8);
//
//	mineLabels.push(diamondLabel);

    var desLabels = [];
	var targets = cc.MineMng.getInstance().getSpec_Award();

    var renderBase = _TargetRender_BaseMine(render);
    var renderSize = renderBase.getContentSize();

    var itemArr = _GetMineSpecialArr();


    targets.forEach(
        function(a_target)
        {
            var renderBase = _TargetRender_BaseMine(render);
            var renderSize = renderBase.getContentSize();

//            cc.log("target = " + tag);
            var itemSpr = cc.Sprite.createWithSpriteFrameName(itemArr[a_target - 1].SPRITESOURCE);

            if (itemSpr)
            {
                itemSpr.setScale(0.4);
            }

            if (itemSpr)
            {
                renderBase.addChild(itemSpr);
                itemSpr.setPosition(cc.p(renderSize.width * 0.4, renderSize.height * 0.35));
            }

            //
            var desLabel = GUI.createNumberLabel("", _GUIPath + "Num/num_2_20x24.png", 20, 24, ".");
            renderBase.addChild(desLabel);
            desLabel.setAnchorPoint(cc.p(0.5, 0.5));
            desLabel.setPosition(cc.p(renderSize.width * 0.7, renderSize.height * 0.35));
            desLabel.setScale(0.8);

            desLabels.push(desLabel);
        }
    );
    var mineLine = cc.Sprite.createWithSpriteFrameName("general_diamond_1.png");
    renderBase.addChild(mineLine);
    mineLine.setPosition(cc.p(renderSize.width * 0.4, renderSize.height * 0.35));
    mineLine.setScale(0.65);

    //
    var diamondLabel = GUI.createNumberLabel("0", _GUIPath + "Num/num_2_20x24.png", 20, 24, ".");
    renderBase.addChild(diamondLabel);
    diamondLabel.setAnchorPoint(cc.p(0.5, 0.5));
    diamondLabel.setPosition(cc.p(renderSize.width * 0.7, renderSize.height * 0.35));
    diamondLabel.setScale(0.8);

    desLabels.push(diamondLabel);
    return desLabels;
};
//----------------------------------------------------------------------------------------------------------------------
var _TargetRender_ModelMine = function(levelData, render)
{

    if (levelData.MINE_LINE)
    {
        var renderBase = _TargetRender_Base(render);
        var renderSize = renderBase.getContentSize();

        var mineLine = cc.Sprite.createWithSpriteFrameName("fengeceng.png");
        renderBase.addChild(mineLine);
        mineLine.setPosition(cc.p(renderSize.width/2, renderSize.height * 0.65));
        mineLine.setScale(0.65);

        //
        var lineLabel = GUI.createNumberLabel(levelData.MINE_LINE.toString(), _GUIPath + "Num/num_2_20x24.png", 20, 24, ".");
        renderBase.addChild(lineLabel);
        lineLabel.setAnchorPoint(cc.p(0.5, 0.5));
        lineLabel.setPosition(cc.p(renderSize.width/2, renderSize.height * 0.35));
        lineLabel.setScale(0.8);

        mineLabels.push(lineLabel);
    }

    if (levelData.RAD_NUM)
    {
        renderBase = _TargetRender_Base(render);
        renderSize = renderBase.getContentSize();

        var mineRad = MonsterRender.createSprite(Defines.COLOR.GREEN);
        renderBase.addChild(mineRad);
        mineRad.setPosition(cc.p(renderSize.width/2, renderSize.height * 0.65));
        mineRad.setScale(0.65);

        //
        var radLabel = GUI.createNumberLabel(levelData.MINE_LINE.toString(), _GUIPath + "Num/num_2_20x24.png", 20, 24, ".");
        renderBase.addChild(radLabel);
        radLabel.setAnchorPoint(cc.p(0.5, 0.5));
        radLabel.setPosition(cc.p(renderSize.width/2, renderSize.height * 0.35));
        radLabel.setScale(0.8);

        mineLabels.push(radLabel);
    }

    if (levelData.TASK_NUM)
    {
        renderBase = _TargetRender_Base(render);
        renderSize = renderBase.getContentSize();

        var mineTask = MonsterRender.createSprite(Defines.COLOR.GREEN);
        renderBase.addChild(mineTask);
        mineTask.setPosition(cc.p(renderSize.width/2, renderSize.height * 0.65));
        mineTask.setScale(0.65);

        //
        var taskLabel = GUI.createNumberLabel(levelData.MINE_LINE.toString(), _GUIPath + "Num/num_2_20x24.png", 20, 24, ".");
        renderBase.addChild(taskLabel);
        taskLabel.setAnchorPoint(cc.p(0.5, 0.5));
        taskLabel.setPosition(cc.p(renderSize.width/2, renderSize.height * 0.35));
        taskLabel.setScale(0.8);

        mineLabels.push(taskLabel);
    }

    return mineLabels;
};
//----------------------------------------------------------------------------------------------------------------------

var Level_TargetRender = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_TargetRenderFunc = {};
    },

    //------------------------------------------------------------------------------------------------------------------
    registerTargetRenderFunc: function(model, func)
    {
        this.m_TargetRenderFunc[model] = func;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    execTargetRenderFunc: function(levelData, render)
    {
        var targetLabels = [];

        var norFunc = this.m_TargetRenderFunc[levelData.MODEL];
        if (norFunc)
        {
            var norLabels = norFunc(levelData, render);
            targetLabels = targetLabels.concat(norLabels);
        }

        if (levelData.MODEL_MIX && levelData.MODEL_MIX != Defines.TARGET_MODEL.MODEL_TIME)
        {
            var mixFunc = this.m_TargetRenderFunc[levelData.MODEL_MIX];
            if (mixFunc)
            {
                var mixLabels = mixFunc(levelData, render);
                targetLabels = targetLabels.concat(mixLabels);
            }
        }

        return targetLabels;
    }

    //------------------------------------------------------------------------------------------------------------------
});

Level_TargetRender._instance = null;
Level_TargetRender.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new Level_TargetRender();

        this._instance.registerTargetRenderFunc(Defines.TARGET_MODEL.MODEL_SCORE, _TargetRender_ModelScore);
        this._instance.registerTargetRenderFunc(Defines.TARGET_MODEL.MODEL_UNLOCK, _TargetRender_ModelUnlock);
        this._instance.registerTargetRenderFunc(Defines.TARGET_MODEL.MODEL_DESTROY, _TargetRender_ModelDes);
        this._instance.registerTargetRenderFunc(Defines.TARGET_MODEL.MODEL_TIME, _TargetRender_ModelTime);
        this._instance.registerTargetRenderFunc(Defines.TARGET_MODEL.MODEL_BUBBLE, _TargetRender_ModelBubble);
        this._instance.registerTargetRenderFunc(Defines.TARGET_MODEL.MODEL_FLOWER, _TargetRender_ModelFlower);
        this._instance.registerTargetRenderFunc(Defines.TARGET_MODEL.MODEL_BOSS, _TargetRender_ModelBoss);
        this._instance.registerTargetRenderFunc(Defines.TARGET_MODEL.MODEL_SNAKE, _TargetRender_ModelSnake);
        this._instance.registerTargetRenderFunc(Defines.TARGET_MODEL.MODEL_MINE, _TargetRender_ModelMine);
		this._instance.registerTargetRenderFunc(Defines.TARGET_MODEL.MODEL_MINELOTTERY, _TargetRender_ModelMineLottery);
    }

    return this._instance;
};


//======================================================================================================================
var Level_Target = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(from)
    {
        this._data = Level_TargetData.getInstance();
        this._render = Level_TargetRender.getInstance();

        this._labels = [];
        this._from = from;
    },

    //------------------------------------------------------------------------------------------------------------------
    _isForGiveUp: function()
    {
        return (this._from instanceof cc.GUIGameGiveUp);
    },

    //------------------------------------------------------------------------------------------------------------------
    _renderTarget: function(node)
    {
        //
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        var label = this._render.execTargetRenderFunc(curLevelData, node);
        this._labels = this._labels.concat(label);

        if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_MINELOTTERY){
            this._Mine_renderTarget(node);
            return this;
        }

        //数字标签数量对应的X坐标队列
        var mainSize = node.getContentSize();
        var posXArr = [[0.5], [0.32, 0.68], [0.21, 0.5, 0.79]];

        //
        var self = this;
        this._labels.forEach(
            function(a_label, index, array)
            {
                var setNode = a_label.getParent();

                var posX = posXArr[array.length - 1];
                setNode.setPositionX(posX[index] * mainSize.width);
                setNode.setPositionY(mainSize.height * 0.5);

                if (self._isForGiveUp())
                {
                    //放弃界面调整，只让有目标显示的精灵放大
                    if (curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_SCORE
                        && curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_TIME)
                    {
                        setNode.setScale(1.2);
                        setNode.setPositionY(mainSize.height * 0.42);
                        a_label.setScale(1/1.2);
                    }
                }
            }
        );

        return this;
    },

    _Mine_renderTarget: function(node)
    {
        //数字标签数量对应的X坐标队列
        var mainSize = node.getContentSize();
        var posXArr = [[0.5], [0.32, 0.68], [0.30, 0.54, 0.78]];

        //
        var self = this;
        this._labels.forEach(
            function(a_label, index, array)
            {
                var setNode = a_label.getParent();

                var posX = posXArr[array.length - 1];
                setNode.setPositionX(mainSize.width * 0.4);
                setNode.setPositionY(posX[index] * mainSize.height);

                if (self._isForGiveUp())
                {
                    //放弃界面调整，只让有目标显示的精灵放大
                    if (curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_SCORE
                        && curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_TIME)
                    {
                        setNode.setScale(1.2);
                        setNode.setPositionX(mainSize.width * 0.42);
                        a_label.setScale(1/1.2);
                    }
                }
            }
        );

    },
    //------------------------------------------------------------------------------------------------------------------
    updateTarget: function(node)
    {
        //
        if (!node._AddedTarget)
        {
            this._renderTarget(node);
            node._AddedTarget = true;
        }

        //
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        var targetNum = this._data.execTargetDataFunc(curLevelData);
        var targetData = [].concat(targetNum);

        //
        if (this._labels.length != targetData.length)
        {
            cc.log("目标数据获取错误！！！");
        }

        //
        var self = this;
        this._labels.forEach(
            function(a_label, index)
            {
                var num = targetData[index];
                if (num >= 0 && num != parseInt(a_label.getString()))
                {
                    a_label.setString(num.toString());

                    //放弃界面没有跳动
                    if (!self._isForGiveUp())
                    {
                        a_label.getParent().stopAllActions();
                        a_label.getParent().runAction(cc.Sequence.create(
                            cc.ScaleTo.create(Defines.FPS * 5, 1.6),
                            cc.ScaleTo.create(Defines.FPS * 5, 1.0)
                        ));
                    }
                }
            }
        );

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

Level_Target.create = function(from)
{
    return new Level_Target(from);
};