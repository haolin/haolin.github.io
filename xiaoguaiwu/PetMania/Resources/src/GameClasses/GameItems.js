//-----------------------------ItemDefine-------------------------------------------------------------------------------
Defines.MAX_ITEM_COUNT = 999;
Defines.MAX_ITEM_CONTAINER_COUNT = 4;

Defines.GameItems =
{

    //上线道具-----------------------------------------------------------------------------------------------------------

    //纵横消
    ITEM_DIRECTION_EX:
    {
        ID:3,
        NAME:"ITEM_DIRECTION_EX",
        ENG_NAME:"LineXiao",
        SPRITESOURCE:"icon_item_1.png",
        DESCRIPTION: "生成纵横消，消除整行整列！"
    },

    //爆炸消
    ITEM_WARP_EX:
    {
        ID:4,
        NAME:"ITEM_WARP_EX",
        ENG_NAME:"BoomXiao",
        SPRITESOURCE:"icon_item_2.png",
        DESCRIPTION: "生成爆炸消，消除周边区域！"
    },

    //同色消
    ITEM_COLORFUL_EX:
    {
        ID:5,
        NAME:"ITEM_COLORFUL_EX",
        ENG_NAME:"SameXiao",
        SPRITESOURCE:"icon_item_3.png",
        DESCRIPTION: "消除全屏所有同色小怪物！"
    },

    //瞬间移动
    ITEM_TRANSPOSITION:
    {
        ID:6,
        NAME:"ITEM_TRANSPOSITION",
        ENG_NAME:"Move",
        SPRITESOURCE:"icon_item_4.png",
        DESCRIPTION: "将您指定的两只小怪物互换位置！"
    },

    //时钟
    ITEM_TIME:
    {
        ID:7,
        NAME:"ITEM_TIME",
        ENG_NAME:"TimePanel",
        SPRITESOURCE:"icon_item_5.png",
        DESCRIPTION: "增加时间！ 试试运气吧！"
    },

    //染色剂
    ITEM_STAINING:
    {
        ID:8,
        NAME:"ITEM_STAINING",
        ENG_NAME:"Color",
        SPRITESOURCE:"icon_item_6.png",
        DESCRIPTION: "缺少特定颜色的小怪物？马上使用染色剂！"
    },

    //大风暴
    ITEM_STORM:
    {
        ID:9,
        NAME:"ITEM_STORM",
        ENG_NAME:"LanMao",
        SPRITESOURCE:"icon_item_7.png",
        DESCRIPTION: "马上重新排列小怪物的位置！"
    },

    //金钥匙
    ITEM_GOLDEN_KEY:
    {
        ID:10,
        ENG_NAME:"FireX",
        NAME:"ITEM_GOLDEN_KEY",
        SPRITESOURCE:"icon_item_8.png",
        DESCRIPTION: "消除一格中的所有障碍！"
    },

    //冰块
    ITEM_ICE:
    {
        ID:11,
        NAME:"ITEM_ICE",
        SPRITESOURCE:"icon_package_0.png",
        DESCRIPTION: "冰块(贪吃蛇专用)"
    },

    //无限薄荷糖
    FREE_CANDY:
    {
        ID:12,
        NAME:"FREE_CANDY",
        SPRITESOURCE:"icon_package_0.png",
        DESCRIPTION: "无限薄荷糖"
    }
};

(function()
{
    for (var prop in Defines.GameItems)
    {
        if (Defines.GameItems.hasOwnProperty(prop))
        {
            if (prop != Defines.GameItems[prop].NAME)
            {
                cc.Assert(0, prop + "的NAME错误");
            }
        }
    }
})();

//TODO:正式启用道具后记得添加
var _GetItemsArr = function()
{
    var itemsArr = [];
    itemsArr.push(Defines.GameItems.ITEM_DIRECTION_EX);
    itemsArr.push(Defines.GameItems.ITEM_WARP_EX);
    itemsArr.push(Defines.GameItems.ITEM_COLORFUL_EX);
    itemsArr.push(Defines.GameItems.ITEM_TRANSPOSITION);
    itemsArr.push(Defines.GameItems.ITEM_TIME);
    itemsArr.push(Defines.GameItems.ITEM_STAINING);
    itemsArr.push(Defines.GameItems.ITEM_STORM);
    itemsArr.push(Defines.GameItems.ITEM_GOLDEN_KEY);
    return itemsArr;
};

//
var _IsGoldenKey = function(itemID)
{
    return itemID == Defines.GameItems.ITEM_GOLDEN_KEY.ID;
};

Defines.GameMineSpecial =
{
    //薄荷糖
    LIFE_CANDY:
    {
        ID:1,
        NAME:"LIFE_CANDY",
        SPRITESOURCE:"icon_heart_0.png"
    },
    //薄荷糖上限+1
    LIFE_CANDY_LINE:
    {
        ID:2,
        NAME:"LIFE_CANDY_LINE",
        SPRITESOURCE:"icon_heart_5.png"
    },
    //纵横消
    ITEM_DIRECTION_EX:
    {
        ID:3,
        NAME:"ITEM_DIRECTION_EX",
        SPRITESOURCE:"icon_item_1.png"
    },

    //爆炸消
    ITEM_WARP_EX:
    {
        ID:4,
        NAME:"ITEM_WARP_EX",
        SPRITESOURCE:"icon_item_2.png"

    },

    //同色消
    ITEM_COLORFUL_EX:
    {
        ID:5,
        NAME:"ITEM_COLORFUL_EX",
        SPRITESOURCE:"icon_item_3.png"

    },

    //瞬间移动
    ITEM_TRANSPOSITION:
    {
        ID:6,
        NAME:"ITEM_TRANSPOSITION",
        SPRITESOURCE:"icon_item_4.png"

    },

    //时钟
    ITEM_TIME:
    {
        ID:7,
        NAME:"ITEM_TIME",
        SPRITESOURCE:"icon_item_5.png"

    },

    //染色剂
    ITEM_STAINING:
    {
        ID:8,
        NAME:"ITEM_STAINING",
        SPRITESOURCE:"icon_item_6.png"
    },

    //大风暴
    ITEM_STORM:
    {
        ID:9,
        NAME:"ITEM_STORM",
        SPRITESOURCE:"icon_item_7.png"
    },

    //金钥匙
    ITEM_GOLDEN_KEY:
    {
        ID:10,
        NAME:"ITEM_GOLDEN_KEY",
        SPRITESOURCE:"icon_item_8.png"
    },

    //冰块
    ITEM_ICE:
    {
        ID:11,
        NAME:"ITEM_ICE",
        SPRITESOURCE:"icon_package_0.png"
    }
};

(function()
{
	Defines.GameMineSpecial.ALL = [];
    for (var prop in Defines.GameMineSpecial)
    {
	    if (Defines.GameMineSpecial.hasOwnProperty(prop))
        {
            Defines.GameMineSpecial.ALL.push(Defines.GameMineSpecial[prop]);
        }
	}

})();

var _GetMineSpecialArr = function()
{
    return Defines.GameMineSpecial.ALL;
};


Defines._TOP_KEY = {
    LEVEL: 0,
    SCORE: 1,
    WEEKLY: 2
};

//------------------------------------------------------------------------------------------------------------------

var ExchangeCodeItem = {
    ITEM_DIRECTION_EX: Defines.GameItems.ITEM_DIRECTION_EX.ID,
    ITEM_WARP_EX: Defines.GameItems.ITEM_WARP_EX.ID,
    ITEM_TRANSPOSITION: Defines.GameItems.ITEM_TRANSPOSITION.ID,
    ITEM_COLORFUL_EX: Defines.GameItems.ITEM_COLORFUL_EX.ID,
    ITEM_TIME: Defines.GameItems.ITEM_TIME.ID,
    ITEM_STAINING: Defines.GameItems.ITEM_STAINING.ID,
    ITEM_STORM: Defines.GameItems.ITEM_STORM.ID,
    ITEM_GOLDEN_KEY: Defines.GameItems.ITEM_GOLDEN_KEY.ID
}

//var _GetMineGameData =  function()
//{
//    if (!Defines.PLATFORM.isMobile())
//    {
//        return;
//    }
//
//
//    cc.log("获取采矿数据");
//
//    var self = this;
//
//    //
//    var getMineGameDataCallBack = function(result, packet)
//    {
//        cc.log("获取采矿数据返回结果 result ＝ " + result);
//
//        //
//        if (result)
//        {
//            cc.log("获取采矿数据返回结果 成功 packet = " + JSON.stringify(packet));
//            cc.MineMng.getInstance().initSeverMineData(packet);
//            //处理核心好友信息
//            var body = packet['name'];
//            if (body )
//            {
//                cc.log("body name= " + body);
//            }
//
//        }
//        else
//        {
//            cc.log("获取采矿数据 失败 错误号 = " + packet);
////            manager.fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_FROM_HOME_FAILED);
//        }
//    };
//
//    //
//    cc.log("获取采矿数据........");
//    cc.NodeSelf.getInstance().getMineGameLevelInfo(
//        getMineGameDataCallBack);
//
//    //return this;
//};
//
