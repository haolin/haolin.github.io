
var _CheckGameLevel = function(a_level)
{
    if (!a_level.NAME || typeof(a_level.NAME) != "string")
    {
        cc.Assert(0, "a_level.NAME");
        return;
    }

    if (a_level.NAME == "LEVEL_5" && !a_level.SHOP_GUIDE)
    {
        cc.Assert(0, "a_level.NAME == LEVEL_5 && !a_level.SHOP_GUIDE");
    }

    if (typeof(a_level.MODEL) != "number"
        || a_level.MODEL < Defines.TARGET_MODEL.MODEL_SCORE
        || a_level.MODEL > Defines.TARGET_MODEL.MODEL_MAX)
    {
        cc.Assert(0, "a_level.MODEL");
        return;
    }

    if (!a_level.TARGET_SCORES || !(a_level.TARGET_SCORES instanceof Array) || a_level.TARGET_SCORES.length < 3)
    {
        cc.Assert(0, "a_level.TARGET_SCORES");
        return;
    }

    if (!a_level.ITEMS || !(a_level.ITEMS instanceof Array) || a_level.ITEMS.length > 4)
    {
        cc.Assert(0, "a_level.ITEMS");
        return;
    }

    /*//检查金钥匙
    var hasGoldenKey = false;
    a_level.ITEMS.forEach(
        function(a_item)
        {
            if (a_item == "ITEM_GOLDEN_KEY")
            {
                hasGoldenKey = true;
            }
        }
    );

    if (hasGoldenKey)
    {
        var validCondition =
            a_level.MODEL == Defines.TARGET_MODEL.MODEL_UNLOCK
                || a_level.TARGET_DES_BUBBLES;

        if (!validCondition)
        {
//            cc.Assert(0, "hasGoldenKey !validCondition = " + a_level.NAME);
        }
    }*/

    //检查染色剂
    var hasStaining = false;
    a_level.ITEMS.forEach(
        function(a_item)
        {
            if (a_item == "ITEM_STAINING")
            {
                hasStaining = true;
            }
        }
    );

    if (hasStaining)
    {
        validCondition =
            a_level.MODEL == Defines.TARGET_MODEL.MODEL_DESTROY
                && a_level.TARGET_DES_DATA;

        if (!validCondition)
        {
            cc.log(0, "hasStaining !validCondition = " + a_level.NAME);
        }
    }

    //
    if (a_level.MODEL_MIX == Defines.TARGET_MODEL.MODEL_BOSS)
    {
        //cc.Assert(0, a_level.NAME + "的MODEL_MIX不可以是BOSS模式");
    }

    //
    switch (a_level.MODEL)
    {
        case Defines.TARGET_MODEL.MODEL_DESTROY:
        {
            if (!a_level.TARGET_DES_DATA
                || !(a_level.TARGET_DES_DATA instanceof Array)
                || a_level.TARGET_DES_DATA.length < 1)
            {
                cc.Assert(0, "" + a_level.TARGET_DES_DATA);
            }
        }
            break;

        case Defines.TARGET_MODEL.MODEL_TIME:
        {
            if (!a_level.TIME)
            {
                cc.Assert(0, "" + a_level.TIME);
            }
        }
            break;

        case Defines.TARGET_MODEL.MODEL_BUBBLE:
        {
            if (!a_level.BUBBLES_MAX || !a_level.TARGET_DES_BUBBLES)
            {
                cc.Assert(0, "" + a_level.BUBBLES_MAX);
                cc.Assert(0, "" + a_level.TARGET_DES_BUBBLES);
            }
        }
            break;

        case Defines.TARGET_MODEL.MODEL_FLOWER:
        {
            if (!a_level.MAX_FLOWER_LEVEL)
            {
                cc.Assert(0, "" + a_level.MAX_FLOWER_LEVEL);
            }

            //
            var validRange = a_level.MAX_FLOWER_LEVEL >= 0 && a_level.MAX_FLOWER_LEVEL <= 3;
            if (!validRange)
            {
                cc.Assert(0, "" + a_level.MAX_FLOWER_LEVEL);
            }

            if (!a_level.TARGET_DES_DATA
                || !(a_level.TARGET_DES_DATA instanceof Array)
                || a_level.TARGET_DES_DATA.length < 1)
            {
                cc.Assert(0, "" + a_level.TARGET_DES_DATA);
            }
        }
            break;

        //
        case Defines.TARGET_MODEL.MODEL_BOSS:
        {
            if (!a_level.BOSS_POINTS || a_level.BOSS_POINTS <= 0)
            {
                cc.Assert(0, "" + a_level.BOSS_POINTS);
            }
        }
            break;
        default:
            break;
    }
};

(function()
{
    Defines.GAME_LEVELS.forEach(
        function(a_level)
        {
            _CheckGameLevel(a_level);
        }
    );

    Defines.GAME_SPACE_LEVELS.forEach(
        function(a_level)
        {
            _CheckGameLevel(a_level);
        }
    );

    Defines.FLOAT_LEVELS.forEach(
        function(a_level)
        {
            _CheckGameLevel(a_level);
        }
    );

})();


//----------------------------------------------------------------------------------------------------------------------
//加密
var _EncryptLevelData = function(levelData)
{
    //步数加密
    if (levelData.MOVES)
    {
        var moves = levelData.MOVES;
        levelData.MOVES_SAVE = cc.GameData.create(null, moves);
    }

    //评级分数加密
    if (levelData.TARGET_SCORES)
    {
        var targetScores = levelData.TARGET_SCORES;
        levelData.TARGET_SCORES_SAVE = cc.GameData.create(null, targetScores.concat());
    }

    //解锁模式或种子模式的过关条件
    if (levelData.TARGET_DES_DATA)
    {
        var targetDesData = levelData.TARGET_DES_DATA;

        targetDesData.forEach(
            function(each)
            {
                if (each.num)
                {
                    var num = each.num;
                    each.num_save = cc.GameData.create(null, num);
                }
            }
        );

        //levelData.TARGET_DES_DATA_SAVE = cc.GameData.create(null, targetDesData);
    }

    //Boss模式
    if (levelData.BOSS_POINTS)
    {
        var bossPoints = levelData.BOSS_POINTS;
        levelData.BOSS_POINTS_SAVE = cc.GameData.create(null, bossPoints);
    }

    //哲理怪模式
    if (levelData.TARGET_DES_BUBBLES)
    {
        var desBubbles = levelData.TARGET_DES_BUBBLES;
        levelData.TARGET_DES_BUBBLES_SAVE = cc.GameData.create(null, desBubbles);
    }
};

(function()
{
    Defines.GAME_LEVELS.forEach(
        function(each)
        {
            _EncryptLevelData(each);
        }
    );

    Defines.GAME_SPACE_LEVELS.forEach(
        function(each)
        {
            _EncryptLevelData(each);
        }
    );

    Defines.FLOAT_LEVELS.forEach(
        function(a_level)
        {
            _EncryptLevelData(a_level);
        }
    );

    Defines.GAME_MINE_LEVELS.forEach(
        function(a_level)
        {
            _EncryptLevelData(a_level);
        }
    );
})();

//----------------------------------------------------------------------------------------------------------------------
//第四个道具槽都改为火流星
var _LastItemTo_GoldenKey = function(levelData)
{
    if (levelData.ITEMS)
    {
        levelData.ITEMS[3] = "ITEM_GOLDEN_KEY";
    }
};

(function()
{
    Defines.GAME_LEVELS.forEach(
        function(each)
        {
            _LastItemTo_GoldenKey(each);
        }
    );

    Defines.GAME_SPACE_LEVELS.forEach(
        function(each)
        {
            _LastItemTo_GoldenKey(each);
        }
    );

    Defines.FLOAT_LEVELS.forEach(
        function(a_level)
        {
            _LastItemTo_GoldenKey(a_level);
        }
    );
})();

//----------------------------------------------------------------------------------------------------------------------