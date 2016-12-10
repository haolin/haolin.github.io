/**
 * 1.
 * 2.
 */

//======================================================================================================================
GUI.MAP_DEFINE = {

    MAP_0:
    {
        ID: 0,
        NAME: Resource.ChineseTxt["map_0"],             //名字
        SIZE: cc.size(960, 640),                          /*尺寸*/
        POSITION: cc.p(0, 0),                             /*位置*/
        DECORATION: "Map_BackStar_1.png",              /*背景装饰物*/
        DESC_RES: "map_zone_name_1.png",                  /*星球名字文件*/
        DESC_POS: cc.p(0.55, 0.35),                       /*星球名字位置*/
        MIN_LEVEL_ID: 0,                                  /*区域最小关卡*/
        MAX_LEVEL_ID: 14,                                 /*区域最大关卡*/
        SPACE_LEVELS_ID: [0],                             /*空间站关卡*/
        MIN_FLOAT_ID: 0,                                  /*最小漂浮关卡*/
        MAX_FLOAT_ID: 9,                                  /*最大漂浮关卡*/
        DIAMOND_BONUS: [20, 30, 50],                      /*钻石奖励*/
        COKE_TIME: 0                                      /*可乐恢复时间*/
    },

    MAP_1:
    {
        ID: 1,
        NAME: Resource.ChineseTxt["map_1"],             //名字
        SIZE: cc.size(960, 640),
        POSITION: cc.p(960, 0),
        DECORATION: "Map_BackStar_2.png",
        DESC_RES: "map_zone_name_2.png",
        DESC_POS: cc.p(0.5, 0.7),
        MIN_LEVEL_ID: 15,
        MAX_LEVEL_ID: 29,
        SPACE_LEVELS_ID: [1, 2, 3],
        MIN_FLOAT_ID: 10,
        MAX_FLOAT_ID: 19,
        DIAMOND_BONUS: [20, 30, 50],
        COKE_TIME: 0
    },

    MAP_2:
    {
        ID: 2,
        NAME: Resource.ChineseTxt["map_2"],             //名字
        SIZE: cc.size(960, 640),
        POSITION: cc.p(960 * 2, 0),
        DECORATION: "Map_BackStar_3.png",
        DESC_RES: "map_zone_name_3.png" ,
        DESC_POS: cc.p(0.5, 0.7),
        MIN_LEVEL_ID: 30,
        MAX_LEVEL_ID: 44,
        SPACE_LEVELS_ID: [4, 5, 6],
        MIN_FLOAT_ID: 20,
        MAX_FLOAT_ID: 29,
        DIAMOND_BONUS: [20, 30, 50],
        COKE_TIME: 8 * 60 * 60
    },

    MAP_3:
    {
        ID: 3,
        NAME: Resource.ChineseTxt["map_3"],             //名字
        SIZE: cc.size(960, 640),
        POSITION: cc.p(960 * 3, 0),
        DECORATION: "Map_BackStar_4.png",
        DESC_RES: "map_zone_name_4.png",
        DESC_POS: cc.p(0.5, 0.3),
        MIN_LEVEL_ID: 45,
        MAX_LEVEL_ID: 59,
        SPACE_LEVELS_ID: [7, 8, 9],
        MIN_FLOAT_ID: 30,
        MAX_FLOAT_ID: 39,
        DIAMOND_BONUS: [20, 30, 50],
        COKE_TIME: 16 * 60 * 60
    },

    MAP_4:
    {
        ID: 4,
        NAME: Resource.ChineseTxt["map_4"],             //名字
        SIZE: cc.size(960, 640),
        POSITION: cc.p(960 * 4, 0),
        DECORATION: "Map_BackStar_5.png",
        DESC_RES: "map_zone_name_5.png",
        DESC_POS: cc.p(0.5, 0.7),
        MIN_LEVEL_ID: 60,
        MAX_LEVEL_ID: 79,
        SPACE_LEVELS_ID: [10, 11, 12],
        MIN_FLOAT_ID: 40,
        MAX_FLOAT_ID: 49,
        DIAMOND_BONUS: [20, 30, 50],
        COKE_TIME: 24 * 60 * 60
    },

    MAP_5:
    {
        ID: 5,
        NAME: Resource.ChineseTxt["map_5"],             //名字
        SIZE: cc.size(960, 640),
        POSITION: cc.p(960 * 5, 0),
        DECORATION: "Map_BackStar_6.png",
        DESC_RES: "map_zone_name_6.png",
        DESC_POS: cc.p(0.5, 0.35),
        MIN_LEVEL_ID: 80,
        MAX_LEVEL_ID: 99,
        SPACE_LEVELS_ID: [13, 14, 15],
        MIN_FLOAT_ID: 50,
        MAX_FLOAT_ID: 59,
        DIAMOND_BONUS: [20, 30, 50],
        COKE_TIME: 24 * 60 * 60
    },

    MAP_6:
    {
        ID: 6,
        NAME: Resource.ChineseTxt["map_6"],             //名字
        SIZE: cc.size(960, 640),
        POSITION: cc.p(960 * 6, 0),
        DECORATION: "Map_BackStar_7.png",
        DESC_RES: "map_zone_name_7.png",
        DESC_POS: cc.p(0.5, 0.6),
        MIN_LEVEL_ID: 100,
        MAX_LEVEL_ID: 124,
        SPACE_LEVELS_ID: [16, 17, 18],
        MIN_FLOAT_ID: 60,
        MAX_FLOAT_ID: 69,
        DIAMOND_BONUS: [20, 30, 50],
        COKE_TIME: 24 * 60 * 60
    },

    MAP_7:
    {
        ID: 7,
        NAME: Resource.ChineseTxt["map_7"],             //名字
        SIZE: cc.size(960, 640),
        POSITION: cc.p(960 * 7, 0),
        DECORATION: "Map_BackStar_8.png",
        DESC_RES: "map_zone_name_8.png",
        DESC_POS: cc.p(0.5, 0.65),
        MIN_LEVEL_ID: 125,
        MAX_LEVEL_ID: 149,
        SPACE_LEVELS_ID: [19, 20, 21],
        MIN_FLOAT_ID: 70,
        MAX_FLOAT_ID: 79,
        DIAMOND_BONUS: [20, 30, 50],
        COKE_TIME: 24 * 60 * 60
    },

    MAP_8:
    {
        ID: 8,
        NAME: Resource.ChineseTxt["map_8"],             //名字
        SIZE: cc.size(960, 640),
        POSITION: cc.p(960 * 8, 0),
        DECORATION: "Map_BackStar_9.png",
        DESC_RES: "map_zone_name_9.png",
        DESC_POS: cc.p(0.5, 0.35),
        MIN_LEVEL_ID: 150,
        MAX_LEVEL_ID: 174,
        SPACE_LEVELS_ID: [22, 23, 24],
        MIN_FLOAT_ID: 80,
        MAX_FLOAT_ID: 89,
        DIAMOND_BONUS: [20, 30, 50],
        COKE_TIME: 24 * 60 * 60
    },

    MAP_9:
    {
        ID: 9,
        NAME: Resource.ChineseTxt["map_9"],             //名字
        SIZE: cc.size(960, 640),
        POSITION: cc.p(960 * 9, 0),
        DECORATION: "Map_BackStar_10.png",
        DESC_RES: "map_zone_name_10.png",
        DESC_POS: cc.p(0.45, 0.65),
        MIN_LEVEL_ID: 175,
        MAX_LEVEL_ID: 199,
        SPACE_LEVELS_ID: [25, 26, 27],
        MIN_FLOAT_ID: 90,
        MAX_FLOAT_ID: 99,
        DIAMOND_BONUS: [20, 30, 50],
        COKE_TIME: 24 * 60 * 60
    },

    MAP_10:
    {
        ID: 10,
        NAME: Resource.ChineseTxt["map_10"],             //名字
        SIZE: cc.size(960, 640),
        POSITION: cc.p(960 * 10, 0),
        DECORATION: "Map_BackStar_11.png",
        DESC_RES: "map_zone_name_11.png",
        DESC_POS: cc.p(0.5, 0.65),
        MIN_LEVEL_ID: 200,
        MAX_LEVEL_ID: 224,
        SPACE_LEVELS_ID: [28, 29, 30],
        MIN_FLOAT_ID: 100,
        MAX_FLOAT_ID: 109,
        DIAMOND_BONUS: [20, 30, 50],
        COKE_TIME: 24 * 60 * 60
    },
    MAP_11:
    {
        ID: 11,
        NAME: Resource.ChineseTxt["map_11"],             //名字
        SIZE: cc.size(960, 640),
        POSITION: cc.p(960 * 11, 0),
        DECORATION: "Map_BackStar_12.png",
        DESC_RES: "map_zone_name_11.png",
        DESC_POS: cc.p(0.5, 0.4),
        MIN_LEVEL_ID: 225,
        MAX_LEVEL_ID: 249,
        SPACE_LEVELS_ID: [31, 32, 33],
        MIN_FLOAT_ID: 110,
        MAX_FLOAT_ID: 119,
        DIAMOND_BONUS: [20, 30, 50],
        COKE_TIME: 24 * 60 * 60
    },

    MAP_12:
    {
        ID: 12,
        NAME: Resource.ChineseTxt["map_12"],             //名字
        SIZE: cc.size(960, 640),
        POSITION: cc.p(960 * 12, 0),
        DECORATION: "Map_BackStar_13.png",
        DESC_RES: "map_zone_name_11.png",
        DESC_POS: cc.p(0.7, 0.575),
        MIN_LEVEL_ID: 250,
        MAX_LEVEL_ID: 274,
        SPACE_LEVELS_ID: [34, 34, 36],
        MIN_FLOAT_ID: 120,
        MAX_FLOAT_ID: 129,
        DIAMOND_BONUS: [20, 30, 50],
        COKE_TIME: 24 * 60 * 60
    },
    MAP_13:
    {
        ID: 13,
        NAME: Resource.ChineseTxt["map_13"],             //名字
        SIZE: cc.size(960, 640),
        POSITION: cc.p(960 * 13, 0),
        DECORATION: "Map_BackStar_14.png",
        DESC_RES: "map_zone_name_11.png",
        DESC_POS: cc.p(0.575, 0.5),
        MIN_LEVEL_ID: 275,
        MAX_LEVEL_ID: 299,
        SPACE_LEVELS_ID: [37, 38, 39],
        MIN_FLOAT_ID: 130,
        MAX_FLOAT_ID: 139,
        DIAMOND_BONUS: [20, 30, 50],
        COKE_TIME: 24 * 60 * 60
    },

    MAP_14:
    {
        ID: 14,
        NAME: Resource.ChineseTxt["map_14"],             //名字
        SIZE: cc.size(960, 640),
        POSITION: cc.p(960 * 14, 0),
        DECORATION: "Map_BackStar_15.png",
        DESC_RES: "map_zone_name_11.png",
        DESC_POS: cc.p(0.425, 0.35),
        MIN_LEVEL_ID: 300,
        MAX_LEVEL_ID: 324,
        SPACE_LEVELS_ID: [40, 41, 42],
        MIN_FLOAT_ID: 140,
        MAX_FLOAT_ID: 149,
        DIAMOND_BONUS: [20, 30, 50],
        COKE_TIME: 24 * 60 * 60
    },

    MAP_15:
    {
        ID: 15,
        SIZE: cc.size(960, 640),
        POSITION: cc.p(960 * 15, 0),
        DECORATION: "Map_BackStar_1.png",
        DESC_RES: "map_zone_name_1.png",
        DESC_POS: cc.p(0.4, 0.45),
        MIN_LEVEL_ID: 325,
        MAX_LEVEL_ID: 349,
        SPACE_LEVELS_ID: [43, 44, 45],
        MIN_FLOAT_ID: 150,
        MAX_FLOAT_ID: 159,
        DIAMOND_BONUS: [20, 30, 50],
        COKE_TIME: 24 * 60 * 60
    }
};

//----------------------------------------------------------------------------------------------------------------------
//尺寸处理
(function()
{
    for (var prop in GUI.MAP_DEFINE)
    {
        if (GUI.MAP_DEFINE.hasOwnProperty(prop))
        {
            var mapDefine = GUI.MAP_DEFINE[prop];
            if (mapDefine.SIZE)
            {
                mapDefine.SIZE.width *= Defines.BASE_SCALE;
                mapDefine.SIZE.height *= Defines.BASE_SCALE;
            }

            if (mapDefine.POSITION)
            {
                mapDefine.POSITION.x *= Defines.BASE_SCALE;
                mapDefine.POSITION.y *= Defines.BASE_SCALE;
            }
        }
    }

})();

//----------------------------------------------------------------------------------------------------------------------
//200关的配置
GUI.NORMAL_MAPS = [
    GUI.MAP_DEFINE.MAP_0,
    GUI.MAP_DEFINE.MAP_1,
    GUI.MAP_DEFINE.MAP_2,
    GUI.MAP_DEFINE.MAP_3,
    GUI.MAP_DEFINE.MAP_4,
    GUI.MAP_DEFINE.MAP_5,
    GUI.MAP_DEFINE.MAP_6,
    GUI.MAP_DEFINE.MAP_7,
    GUI.MAP_DEFINE.MAP_8,
    GUI.MAP_DEFINE.MAP_9,
    GUI.MAP_DEFINE.MAP_10,
    GUI.MAP_DEFINE.MAP_11,
    GUI.MAP_DEFINE.MAP_12,
    GUI.MAP_DEFINE.MAP_13,
    GUI.MAP_DEFINE.MAP_14
];

GUI.TEMP_MAP = GUI.MAP_DEFINE.MAP_15;


//======================================================================================================================
GUI._GetMapDefineWithID = function(mapID)
{
    for (var prop in GUI.MAP_DEFINE)
    {
        if (GUI.MAP_DEFINE.hasOwnProperty(prop))
        {
            if (GUI.MAP_DEFINE[prop].ID == mapID)
            {
                return GUI.MAP_DEFINE[prop];
            }
        }
    }

    return null;
};

//----------------------------------------------------------------------------------------------------------------------
GUI._GetMapIDWithLevelData = function(levelData)
{
    //
    var mapID = GUI.MAP_DEFINE.MAP_0.ID;

    //
    if (!levelData)
    {
        return mapID;
    }

    //悬浮关卡
    if (levelData.IS_FLOAT_LEVEL)
    {
        for (var prop in GUI.MAP_DEFINE)
        {
            if (!GUI.MAP_DEFINE.hasOwnProperty(prop))
            {
                continue;
            }

            if (levelData.ID >= GUI.MAP_DEFINE[prop].MIN_FLOAT_ID
                && levelData.ID <= GUI.MAP_DEFINE[prop].MAX_FLOAT_ID)
            {
                mapID = GUI.MAP_DEFINE[prop].ID;
                break;
            }
        }

        return mapID;
    }

    //挑战关卡
    if (levelData.IS_SPACE_LEVEL)
    {
        for (var pro in GUI.MAP_DEFINE)
        {
            if (!GUI.MAP_DEFINE.hasOwnProperty(pro))
            {
                continue;
            }

            //
            var spaceLevelsID = GUI.MAP_DEFINE[pro].SPACE_LEVELS_ID;
            if (spaceLevelsID.indexOf(levelData.ID) >= 0)
            {
                mapID = GUI.MAP_DEFINE[pro].ID;
                break;
            }
        }

        return mapID;
    }

    //正常关卡
    for (var pop in GUI.MAP_DEFINE)
    {
        if (!GUI.MAP_DEFINE.hasOwnProperty(pop))
        {
            continue;
        }

        //
        if (levelData.ID >= GUI.MAP_DEFINE[pop].MIN_LEVEL_ID
            && levelData.ID <= GUI.MAP_DEFINE[pop].MAX_LEVEL_ID)
        {
            mapID = GUI.MAP_DEFINE[pop].ID;
            break;
        }
    }

    return mapID;
};

//----------------------------------------------------------------------------------------------------------------------
GUI._GetMapDefineWithLevelData = function(levelData)
{
    var mapID = GUI._GetMapIDWithLevelData(levelData);
    return GUI._GetMapDefineWithID(mapID);
};

//----------------------------------------------------------------------------------------------------------------------
GUI._GetDiamondBonusWithLevelData = function(levelData)
{
    var mapID = GUI._GetMapIDWithLevelData(levelData);
    var mapDefine = GUI._GetMapDefineWithID(mapID);
    return mapDefine.DIAMOND_BONUS.concat();
};

//----------------------------------------------------------------------------------------------------------------------
GUI._IsFirstLevelForNewZone = function(levelData)
{
    if (levelData.IS_SPACE_LEVEL)
    {
        return false;
    }

    //
    var mapID = GUI._GetMapIDWithLevelData(levelData);
    var mapDefine = GUI._GetMapDefineWithID(mapID);
    return mapID != 0 && levelData.ID == mapDefine.MIN_LEVEL_ID;
};

//----------------------------------------------------------------------------------------------------------------------
GUI._GetFirstLevelNamesOfZone = function()
{
    var levelNames = [];

    for (var prop in GUI.MAP_DEFINE)
    {
        if (GUI.MAP_DEFINE.hasOwnProperty(prop))
        {
            var levelID = GUI.MAP_DEFINE[prop].MIN_LEVEL_ID;
            levelNames.push("LEVEL_" + (levelID + 1));
        }
    }

    return levelNames;
};

//----------------------------------------------------------------------------------------------------------------------
GUI._GetCokeIndexWithSpaceLevelID = function(spaceLevelID)
{
    //为快速，不循环计算，直接计算
    return (spaceLevelID - 1) % 3;
};

//----------------------------------------------------------------------------------------------------------------------
GUI._CompareNorLevelWithSpaceLevel = function(normalLevelID, spaceLevelID)
{
    var spaceLevelData = cc.DataMng.getInstance().getLevelDataWithID(spaceLevelID, true);
    var spaceMapDefine = GUI._GetMapDefineWithLevelData(spaceLevelData);

    //正常关卡比挑战关卡远返回true
    return normalLevelID > spaceMapDefine.MAX_LEVEL_ID;
};

//----------------------------------------------------------------------------------------------------------------------
GUI._CompareSpaceLevelWithNorLevel = function(spaceLevelID, normalLevelID)
{
    //挑战关卡比正常关卡远返回true
    return !GUI._CompareNorLevelWithSpaceLevel(normalLevelID, spaceLevelID);
};

//----------------------------------------------------------------------------------------------------------------------
GUI._IsMapSpacePassed = function(mapDefine)
{
    //所处的空间站是否已经通过了
    var processLevelData = cc.DataMng.getInstance().getMaxProcessLevelData();
    var spaceLevelsID = mapDefine.SPACE_LEVELS_ID;
    var processCoke = processLevelData.IS_SPACE_LEVEL ? spaceLevelsID.indexOf(processLevelData.ID) : -1;
    return processCoke < 0;
};