
cc.Defines.GAME_LEVELS = [

//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_1",
    MODEL:Defines.TARGET_MODEL.MODEL_SCORE,        //*//*得分模式*//*
    MOVES:8,                                       //*//*限定布数*//*
    TARGET_SCORES:[200, 400, 600],                //*//*目标得分*//*
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    NO_TIPS:true,
    SHOW_CUSTOM_GUIDE:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_2",
    MODEL:Defines.TARGET_MODEL.MODEL_SCORE,
    MOVES:10,
    TARGET_SCORES:[800, 1600, 2400],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_3",
    MODEL:Defines.TARGET_MODEL.MODEL_SCORE,
    MOVES:10,
    TARGET_SCORES:[1000, 2000, 3000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_4",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:28,

    TARGET_DES_DATA:[ 
        {color: Defines.COLOR.GREEN, num: 25},
        {color: Defines.COLOR.YELLOW, num: 25}
    ],

    TARGET_SCORES:[3000, 6000, 9000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_5",
    MODEL:Defines.TARGET_MODEL.MODEL_SCORE,
    MOVES:10,
    TARGET_SCORES:[1000, 2000, 4000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    NO_TIPS:true,
    SHOP_GUIDE: 1
},

//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_6",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:15,

    TARGET_DES_DATA:[
        {color: Defines.COLOR.PURPLE, num: 25},
        {color: Defines.COLOR.BLUE, num: 25}
    ],

    TARGET_SCORES:[2000, 4000, 6000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STAINING", "ITEM_STORM"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_7",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:30,

    TARGET_DES_DATA:[
        {color: Defines.COLOR.PURPLE, num: 50},
        {color: Defines.COLOR.YELLOW, num: 50},
        {color: Defines.COLOR.BLUE, num: 50}
    ],

    TARGET_SCORES:[6000, 12000, 18000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION","ITEM_COLORFUL_EX" ],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_8",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:20,
    TARGET_SCORES:[10000, 20000, 30000],
    BOSS_POINTS: 60,  //30
    //SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{


    NAME: "LEVEL_9",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:27,
    TARGET_SCORES:[8000, 16000, 24000],
    BOSS_POINTS: 99,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
   /* NAME: "LEVEL_10",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:35,
    TARGET_SCORES:[10000, 15000, 20000],
    BUBBLES_MAX: 3,
    TARGET_DES_BUBBLES: 10*/

    NAME: "LEVEL_10",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:30,
    TARGET_SCORES:[10000, 20000, 30000],
    BOSS_POINTS: 99,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    NO_TIPS:true,
    LOGIN_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_11",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:36,

    TARGET_DES_DATA:[
        {color: Defines.COLOR.PURPLE, num: 68},
        {color: Defines.COLOR.PINK, num: 68}
    ],

    TARGET_SCORES:[10000, 20000, 30000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"],
    NO_TIPS:true,
    FREE_ITEM:true

},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_12",
    MODEL:Defines.TARGET_MODEL.MODEL_SCORE,
    MOVES:25,
    TARGET_SCORES:[5000, 7000, 9000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_13",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:20,
    TARGET_SCORES:[10000,20000,30000],
    BOSS_POINTS: 48,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    NO_TIPS:true,
    FREE_ITEM:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_14",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:36,

    TARGET_DES_DATA:[
        {color: Defines.COLOR.GREEN, num: 60},
        {color: Defines.COLOR.YELLOW, num: 60},
        {color: Defines.COLOR.BLUE, num: 60}
    ],

    TARGET_SCORES:[8000, 16000, 24000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STAINING", "ITEM_TRANSPOSITION"],
    NO_TIPS:true,
    FREE_ITEM:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_15",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:23,
    TARGET_SCORES:[20000, 35000, 50000],
    BOSS_POINTS:99,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    NO_TIPS:true,
    DRAMA_END: "DramaLevelEnd_15"
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_16",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:30,

    TARGET_DES_DATA:[
        {color: Defines.COLOR.GREEN, num: 95},
        {color: Defines.COLOR.BLUE, num: 95}
    ],

    TARGET_SCORES:[10000, 30000, 50000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_STAINING"],
    DRAMA_START: "DramaLevelStart_16"
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_17",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:13,
    TARGET_SCORES:[20000, 30000, 40000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_18",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:16,
    TARGET_SCORES:[24000, 36000, 48000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"],
    FREE_ITEM:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_19",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:18,
    TARGET_SCORES:[20000, 40000, 60000],
    ITEMS:["ITEM_COLORFUL_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_20",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:60,
    TARGET_SCORES:[60000, 90000, 120000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
   /* NAME: "LEVEL_21",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:35,
    TARGET_SCORES:[3000, 4500, 6000],
    MAX_FLOWER_LEVEL: 2,                                           // 本关最大生成等级
    TARGET_DES_DATA:[
        //{ level: 1, num: 1 },
        { level: 2, num: 5}                                      // 级别（4个等级-- 个数
    ]*/

    NAME: "LEVEL_21",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:15,
    TARGET_SCORES:[10000, 18000, 26000],
    BUBBLES_MAX: 6,
    TARGET_DES_BUBBLES: 10,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_22",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:30,
    TARGET_SCORES:[30000, 50000, 70000],
    BUBBLES_MAX: 8,
    TARGET_DES_BUBBLES: 23,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_STORM", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_23",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:35,
    TARGET_SCORES:[60000, 80000, 100000],
    BUBBLES_MAX: 7,
    TARGET_DES_BUBBLES: 25,
    BOSS_POINTS: 60,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_24",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:27,
    TARGET_SCORES:[40000, 60000, 80000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    
    NAME: "LEVEL_25",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:60,
    TARGET_SCORES:[60000, 100000, 140000],
    BUBBLES_MAX: 14,
    TARGET_DES_BUBBLES: 64,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_26",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:30,
    TARGET_SCORES:[60000, 80000, 100000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_27",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:24,
    TARGET_SCORES:[50000, 70000, 90000],
    BUBBLES_MAX: 8,
    TARGET_DES_BUBBLES: 24,
    BOSS_POINTS: 60,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_28",
    MODEL:Defines.TARGET_MODEL.MODEL_TIME,
    TIME:60,
    TARGET_SCORES:[4000, 6000, 8000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TIME", "ITEM_COLORFUL_EX"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_29",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:50,
    TARGET_SCORES:[60000, 90000, 120000],
    BUBBLES_MAX: 15,
    TARGET_DES_BUBBLES: 66,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_30",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:25,
    TARGET_SCORES:[30000, 40000, 50000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"],
    DRAMA_END: "DramaLevelEnd_30"
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_31",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:30,
    TARGET_SCORES:[20000, 30000, 40000],
    BOSS_POINTS:76,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    DRAMA_START: "DramaLevelStart_31"
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_32",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:40,
    TARGET_SCORES:[60000, 120000, 180000],
    BUBBLES_MAX: 7,
    TARGET_DES_BUBBLES: 50,
    BOSS_POINTS: 99,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_33",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:23,
    TARGET_SCORES:[60000, 90000, 120000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_34",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:34,
    TARGET_SCORES:[40000, 60000, 80000],
    BUBBLES_MAX: 10,
    TARGET_DES_BUBBLES: 28,
    ITEMS:["ITEM_COLORFUL_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_35",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:21,
    TARGET_SCORES:[40000, 60000, 80000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_36",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:18,
    TARGET_SCORES:[2000, 4000, 6000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 1 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_37",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,        //*//*得分模式*//*
    MOVES:28,                                       //*//*限定布数*//*
    TARGET_SCORES:[100000, 150000, 200000]   ,                //*//*目标得分*//*
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_38",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:28, 
    BUBBLES_MAX: 10,
    TARGET_DES_BUBBLES: 36,
    TARGET_SCORES:[50000, 70000, 90000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},

//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_39",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:40,
    TARGET_SCORES:[10000, 20000, 30000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 5 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},

//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_40",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:40,
    TARGET_SCORES:[100000, 130000, 160000],
    BUBBLES_MAX: 9,
    TARGET_DES_BUBBLES: 45,
    BOSS_POINTS: 81,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_41",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_TIME,
    TIME:60,
    TARGET_SCORES:[20000, 35000, 50000],
    BOSS_POINTS: 60,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TIME", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_42",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:6,
    TARGET_SCORES:[20000, 40000, 60000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_43",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_TIME,
    TIME:60,
    TARGET_SCORES:[30000, 60000, 90000],
    BOSS_POINTS: 81,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TIME", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_44",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:40,
    TARGET_SCORES:[60000, 100000, 140000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_45",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:48,
    TARGET_SCORES:[100000, 150000, 200000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"],
    DRAMA_END: "DramaLevelEnd_45"
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_46",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:36,
    TARGET_SCORES:[100000, 150000, 200000],
    ITEMS:["ITEM_COLORFUL_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"],
    DRAMA_START: "DramaLevelStart_46"
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_47",
    MODEL:Defines.TARGET_MODEL.MODEL_TIME,
    TIME:45,
    TARGET_SCORES:[7000, 14000, 21000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TIME", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_48",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:20,
    TARGET_SCORES:[30000, 50000, 70000],
    BOSS_POINTS: 108,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_49",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_TIME,
    TIME:45,
    TARGET_SCORES:[30000, 60000, 90000],
    BOSS_POINTS: 60,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TIME", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_50",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:50,

    TARGET_DES_DATA:[
        {color: Defines.COLOR.YELLOW, num: 59},
        {color: Defines.COLOR.ORANGE, num: 59},
        {color: Defines.COLOR.GREEN, num: 59}
    ],
    TARGET_SCORES:[10000, 16000, 22000],
    ITEMS:["ITEM_COLORFUL_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_STAINING"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_51",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:24,
    TARGET_SCORES:[60000, 80000, 100000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_52",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:38,
    TARGET_SCORES:[60000, 80000, 100000],
    //ITEMS:["ITEM_COLORFUL_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_STAINING"],
    ITEMS:["ITEM_COLORFUL_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_DIRECTION_EX"]
},

//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_53",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:39,
    TARGET_SCORES:[10000, 20000, 30000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 8 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_54",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:24,
    TARGET_SCORES:[100000, 150000, 200000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_55",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:18,
    TARGET_SCORES:[90000, 120000, 150000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_56",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:25,
    TARGET_SCORES:[160000, 230000, 300000],
    BUBBLES_MAX: 12,
    TARGET_DES_BUBBLES: 66,
    BOSS_POINTS: 128,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_57",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:35,
    TARGET_SCORES:[20000, 40000, 60000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_58",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:42,

    TARGET_DES_DATA:[
        {color: Defines.COLOR.GREEN, num: 101},
        {color: Defines.COLOR.ORANGE, num: 101},
        {color: Defines.COLOR.PURPLE, num: 101}
    ],

    TARGET_SCORES:[30000, 45000, 60000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STAINING", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
   NAME: "LEVEL_59",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:24,
    TARGET_SCORES:[100000, 130000, 160000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_60",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:10,
    TARGET_SCORES:[4000, 7000, 10000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    DRAMA_END: "DramaLevelEnd_60"
},
//----------------------------------------------------------------------------------------------------------------------
{
	NAME: "LEVEL_61",
    MODEL:Defines.TARGET_MODEL.MODEL_SCORE,
    MOVES:20,
    TARGET_SCORES:[4000, 8000, 12000],
    MAX_BOMBS: 4,
    MIN_BOMBS: 2,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    NO_TIPS:true,
    DRAMA_START: "DramaLevelStart_61"
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_62",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:37,
    TARGET_SCORES:[40000, 60000, 80000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_63",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:54,
    TARGET_SCORES:[30000, 60000, 90000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_64",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_TIME,
    TIME:60,
    TARGET_SCORES:[20000, 40000, 60000],
    BOSS_POINTS: 128,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TIME", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_65",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:38,
    TARGET_SCORES:[10000, 16000, 24000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 5 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_66",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:27,
    TARGET_SCORES:[10000, 16000, 24000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 5 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_67",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:27,
    TARGET_SCORES:[40000, 60000, 80000],
    MAX_BOMBS: 40,
    MIN_BOMBS: 2,
    BOSS_POINTS: 91,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_68",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_TIME,
    TIME:60,
    TARGET_SCORES:[15000, 30000, 45000],
    BOSS_POINTS: 72,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TIME"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_69",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:23,
    TARGET_SCORES:[40000, 60000, 80000],
    BUBBLES_MAX: 13,
    TARGET_DES_BUBBLES: 52,
    ITEMS:["ITEM_COLORFUL_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_70",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:35,
    TARGET_SCORES:[100000,130000, 160000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_71",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:27,
    TARGET_SCORES:[80000, 120000, 160000],
    MAX_BOMBS: 50,
    MIN_BOMBS: 3,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_72",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:26,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.PURPLE, num: 99},
        {color: Defines.COLOR.YELLOW, num: 99},
        {color: Defines.COLOR.BLUE, num: 99}
    ],
    TARGET_SCORES:[20000, 35000, 50000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STAINING"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_73",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:25,
    TARGET_SCORES:[50000, 80000, 120000],
    BUBBLES_MAX: 12,
    TARGET_DES_BUBBLES: 52,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_74",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:26,
    TARGET_SCORES:[8000, 12000, 16000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 3 }
    ],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_75",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:32,
    TARGET_SCORES:[50000, 75000, 100000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_76",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:28,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.PURPLE, num: 55},
        {color: Defines.COLOR.GREEN, num: 55},
        {color: Defines.COLOR.BLUE, num: 55}
    ],
    TARGET_SCORES:[15000, 25000, 35000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STAINING"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_77",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:26,
    TARGET_SCORES:[20000, 40000, 60000],
    BUBBLES_MAX: 10,
    TARGET_DES_BUBBLES: 25,
    MAX_BOMBS: 15,
    MIN_BOMBS: 5,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_78",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:32,
    TARGET_SCORES:[30000, 40000, 50000],
    BOSS_POINTS: 128,
    MAX_BOMBS: 24,
    MIN_BOMBS: 4,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
   NAME: "LEVEL_79",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:34,
    TARGET_SCORES:[30000,50000,70000],
    BUBBLES_MAX: 9,
    TARGET_DES_BUBBLES: 38,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_80",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:45,
    TARGET_SCORES:[20000, 40000, 60000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
    { level: 2, num: 7 }
    ],
    MAX_BOMBS: 24,
    MIN_BOMBS: 2,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    DRAMA_END: "DramaLevelEnd_80"
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_81",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:23,
    TARGET_SCORES:[20000,40000,60000],
    BOSS_POINTS: 99,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
	DRAMA_START: "DramaLevelStart_81"
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_82",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:27,
    TARGET_SCORES:[6000, 8000, 10000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 2 }
    ],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_83",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:28,
    TARGET_SCORES:[60000,100000,140000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_84",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:32,
    TARGET_SCORES:[60000, 100000, 140000],
    MAX_BOMBS: 20,
    MIN_BOMBS: 5,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_85",
    MODEL:Defines.TARGET_MODEL.MODEL_TIME, 
    TIME:90,
    TARGET_SCORES:[40000, 50000, 60000],
    MAX_BOMBS: 30,
    MIN_BOMBS: 3,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TIME"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_86",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:51,
    TARGET_SCORES:[50000, 75000, 100000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_87",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_TIME,
    TIME:60,
    TARGET_SCORES:[25000, 35000, 45000],
    BOSS_POINTS: 99,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TIME"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_88",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:55,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.GREEN, num: 58},
        {color: Defines.COLOR.PINK, num: 59},
        {color: Defines.COLOR.PURPLE, num: 60}       
    ],
    TARGET_SCORES:[18000, 24000, 30000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STAINING"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_89",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:54,
    TARGET_SCORES:[90000, 120000, 150000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_90",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:46,
    TARGET_SCORES:[90000, 120000, 150000],
    //SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_91",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:20,
    TARGET_SCORES:[50000, 65000, 80000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_92",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:52,
    TARGET_SCORES:[100000, 140000, 180000],
    ITEMS:["ITEM_COLORFUL_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_93",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:50,
    TARGET_SCORES:[70000, 90000, 110000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_94",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:37,
    TARGET_SCORES:[40000, 80000, 120000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_95",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:32,
    TARGET_SCORES:[30000, 50000, 70000],
    BUBBLES_MAX: 10,
    TARGET_DES_BUBBLES: 38,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_STORM", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_96",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:45,
    TARGET_SCORES:[8000, 16000, 24000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 6 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_97",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:32,
    TARGET_SCORES:[50000, 70000, 90000],
    //SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    
    NAME: "LEVEL_98",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:42,
    TARGET_SCORES:[90000, 110000, 130000],
    BUBBLES_MAX: 16,
    TARGET_DES_BUBBLES: 68,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_99",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:32,
    TARGET_SCORES:[50000, 70000, 90000],
    BUBBLES_MAX: 9,
    TARGET_DES_BUBBLES: 30,
    BOSS_POINTS: 72,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_100",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:40,
    TARGET_SCORES:[60000, 90000, 120000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
	DRAMA_END: "DramaLevelEnd_100"
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_101",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[50000, 100000, 150000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"],
	DRAMA_START: "DramaLevelStart_101"
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_102",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:38,
    TARGET_SCORES:[70000, 100000, 130000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_103",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[40000, 70000, 100000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_104",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:21,
    TARGET_SCORES:[100000, 150000, 200000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
	 NAME: "LEVEL_105",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:30,
    TARGET_SCORES:[120000, 180000, 240000],
    MAX_BOMBS: 15,
    MIN_BOMBS: 3,
    //SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_106",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:33,
    TARGET_SCORES:[50000, 70000, 90000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_107",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:40,
    TARGET_SCORES:[60000, 90000, 120000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_108",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:40,
    TARGET_SCORES:[60000, 120000, 180000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------\
{
    NAME: "LEVEL_109",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:28,
    TARGET_SCORES:[30000, 40000, 50000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_110",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:40,
    TARGET_SCORES:[100000, 150000, 200000],
    BUBBLES_MAX: 16,
    TARGET_DES_BUBBLES: 54,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_111",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:32,
    TARGET_SCORES:[80000,120000,160000],
    BUBBLES_MAX: 20,
    TARGET_DES_BUBBLES: 72,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_112",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:40,
    TARGET_SCORES:[30000, 50000, 70000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_113",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:52,
    TARGET_SCORES:[100000, 150000, 200000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_114",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:30,
    TARGET_SCORES:[60000,90000,120000],
    BUBBLES_MAX: 12,
    TARGET_DES_BUBBLES: 50,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_115",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:42,
    TARGET_SCORES:[60000,90000,120000],
    BUBBLES_MAX: 12,
    TARGET_DES_BUBBLES: 50,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_116",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:30,
    TARGET_SCORES:[120000, 180000, 240000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_117",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:26,
    TARGET_SCORES:[60000, 90000, 120000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_118",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:26,
    TARGET_SCORES:[40000, 60000, 80000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_119",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:32,
    TARGET_SCORES:[60000, 80000, 100000],
    BUBBLES_MAX: 15,
    TARGET_DES_BUBBLES: 40,
    BOSS_POINTS: 40,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_120",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:20,
    TARGET_SCORES:[20000, 30000, 40000],
    BOSS_POINTS: 99,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_121",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:32,
    TARGET_DES_DATA:[ 
        {color: Defines.COLOR.PINK, num: 5},
        {color: Defines.COLOR.YELLOW, num: 25},
        {color: Defines.COLOR.ORANGE, num: 10}
    ],
    TARGET_SCORES:[50000, 70000, 90000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_122",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:46,
    TARGET_SCORES:[30000, 50000, 70000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 11 }
    ],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_123",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_TIME,
    TIME:45,
    TARGET_SCORES:[30000, 50000, 70000],
    BOSS_POINTS: 60,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TIME", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_124",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_TIME,
    TIME:30,
    TARGET_SCORES:[30000, 50000, 70000],
    BOSS_POINTS: 30,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TIME", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_125",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:36,
    TARGET_SCORES:[150000, 200000, 250000],
    MAX_BOMBS: 60,
    MIN_BOMBS: 4,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"],
    NO_TIPS:true,
	DRAMA_END: "DramaLevelEnd_125"
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_126",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:35,
    TARGET_SCORES:[60000, 90000, 120000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
	DRAMA_START: "DramaLevelStart_126"
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_127",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:10,
    TARGET_SCORES:[35000, 50000, 65000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_128",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:40,
    TARGET_SCORES:[100000, 140000, 180000],
    MAX_BOMBS: 20,
    MIN_BOMBS: 1,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_129",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:15,
    TARGET_SCORES:[90000, 120000, 150000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_130",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:30,
    TARGET_SCORES:[60000, 80000, 100000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_131",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:35,
    TARGET_SCORES:[100000, 130000, 160000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_132",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:33,
    TARGET_SCORES:[90000, 120000, 150000],
    //MAX_BOMBS: 25,
    //MIN_BOMBS: 5,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_133",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:37,
    TARGET_SCORES:[100000, 150000, 200000],
    MAX_BOMBS: 50,
    MIN_BOMBS: 2,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_134",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:35,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.GREEN, num: 68},
        {color: Defines.COLOR.ORANGE, num: 68},
        {color: Defines.COLOR.PURPLE, num: 68}       
    ],
    TARGET_SCORES:[18000, 24000, 30000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STAINING"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_135",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:32,
    TARGET_SCORES:[40000, 60000, 80000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_136",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:23,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.BLUE, num: 50},
        {color: Defines.COLOR.YELLOW, num: 5},
        {color: Defines.COLOR.PURPLE, num: 50}
    ],
    TARGET_SCORES:[15000, 25000, 35000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STAINING", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_137",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:32,
    TARGET_SCORES:[60000, 85000, 110000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_138",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:32,
    TARGET_SCORES:[80000, 100000, 120000],
    MAX_BOMBS: 50,
    MIN_BOMBS: 2,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_139",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:34,
    TARGET_SCORES:[60000, 80000, 100000],
    MAX_BOMBS: 50,
    MIN_BOMBS: 2,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_140",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:42,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.PINK, num: 88}
    ],
    TARGET_SCORES:[20000, 40000, 60000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STAINING", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_141",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:30,
    TARGET_SCORES:[40000, 60000, 80000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_142",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[90000, 120000, 150000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_143",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:46,
    TARGET_SCORES:[120000, 160000, 180000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_144",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:35,
    TARGET_SCORES:[90000, 120000, 150000],
    MAX_BOMBS: 50,
    MIN_BOMBS: 3,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_145",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:30,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.PINK, num: 55},
        {color: Defines.COLOR.YELLOW, num: 55},
        {color: Defines.COLOR.GREEN, num: 55}
    ],
    TARGET_SCORES:[20000, 30000, 40000],
    MAX_BOMBS: 30,
    MIN_BOMBS: 2,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STAINING", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_146",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[50000, 80000, 110000],
    MAX_BOMBS: 40,
    MIN_BOMBS: 1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_147",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:43,
    TARGET_SCORES:[100000, 150000, 200000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_148",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:28,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.PURPLE, num: 66},
        {color: Defines.COLOR.BLUE, num: 66},
        {color: Defines.COLOR.GREEN, num: 66}
    ],
    TARGET_SCORES:[10000, 20000, 30000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STAINING", "ITEM_STORM"]
    //NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_149",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:29,
    TARGET_SCORES:[15000, 30000, 45000],
    BOSS_POINTS: 99,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_150",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[150000, 180000, 210000],
    MAX_BOMBS: 6,
    MIN_BOMBS: 2,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
	DRAMA_END: "DramaLevelEnd_150"
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_151",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:23,
    TARGET_SCORES:[30000, 40000, 50000],
    BOSS_POINTS: 118,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_152",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:25,
    TARGET_SCORES:[120000, 160000, 200000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_153",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:24,
    TARGET_SCORES:[160000, 220000, 280000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_154",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:26,
    TARGET_SCORES:[60000, 100000, 140000],
    BUBBLES_MAX: 12,
    TARGET_DES_BUBBLES: 38,
    BOSS_POINTS: 78,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_155",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:35,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.GREEN, num: 88},
        {color: Defines.COLOR.YELLOW, num: 1},
        {color: Defines.COLOR.PINK, num: 88}
    ],
    TARGET_SCORES:[30000, 45000, 60000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STAINING", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_156",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:37,
    TARGET_SCORES:[60000, 90000, 120000],
    BUBBLES_MAX: 12,
    TARGET_DES_BUBBLES: 50,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_157",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[160000, 220000, 280000],
    MAX_BOMBS: 60,
    MIN_BOMBS: 2,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_158",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:33,
    TARGET_SCORES:[50000, 75000, 100000],
    MAX_BOMBS: 90,
    MIN_BOMBS: 2,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_159",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:42,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.BLUE, num: 70},
        {color: Defines.COLOR.YELLOW, num: 70},
        {color: Defines.COLOR.PURPLE, num: 70}
    ],
    MAX_BOMBS: 60,
    MIN_BOMBS: 4,
    TARGET_SCORES:[30000, 50000, 70000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STAINING", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_160",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:42,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.BLUE, num: 80},
        {color: Defines.COLOR.YELLOW, num: 80},
        {color: Defines.COLOR.PURPLE, num: 80}
    ],
    MAX_BOMBS: 60,
    MIN_BOMBS: 4,
    TARGET_SCORES:[50000, 75000, 100000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STAINING", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_161",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:33,
    TARGET_SCORES:[10000, 14000, 18000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 6 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_162",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:30,
    TARGET_SCORES:[50000, 100000, 150000],
    MAX_BOMBS: 23,
    MIN_BOMBS: 1,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_163",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:34,
    TARGET_SCORES:[30000, 45000, 60000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_164",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:38,
    TARGET_SCORES:[60000, 80000, 100000],
    BUBBLES_MAX: 11,
    TARGET_DES_BUBBLES: 47,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_165",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:36,
    TARGET_SCORES:[70000, 100000, 130000],
    BUBBLES_MAX: 10,
    TARGET_DES_BUBBLES: 45,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_166",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:33,
    TARGET_SCORES:[150000, 200000, 250000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_167",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:33,
    TARGET_SCORES:[30000, 45000, 60000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 8 }
    ],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_168",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:36,
    TARGET_SCORES:[100000, 150000, 200000],
    MAX_BOMBS: 50,
    MIN_BOMBS: 2,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
 NAME: "LEVEL_169",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:37,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.PINK, num: 68},
        {color: Defines.COLOR.BLUE, num: 68},
        {color: Defines.COLOR.GREEN, num: 68}
    ],
    TARGET_SCORES:[30000, 50000, 70000],
    MAX_BOMBS: 99,
    MIN_BOMBS: 7,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STAINING"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_170",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:32,
    TARGET_SCORES:[60000, 90000, 120000],
    BUBBLES_MAX: 15,
    TARGET_DES_BUBBLES: 50,
    BOSS_POINTS: 40,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_171",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:39,
    TARGET_SCORES:[120000, 180000, 240000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_172",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:38,
    TARGET_SCORES:[150000, 250000, 350000],
    MAX_BOMBS: 99,
    MIN_BOMBS: 3,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_173",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:27,
    TARGET_SCORES:[50000, 70000, 90000],
    BOSS_POINTS: 40,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_174",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:25,
    TARGET_SCORES:[60000, 90000, 120000],
    BOSS_POINTS: 27,
    MAX_BOMBS: 60,
    MIN_BOMBS: 2,
    //SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_175",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:24,
    TARGET_SCORES:[60000, 90000, 120000],
    BOSS_POINTS: 32,
    //SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_STORM"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_176",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:33,
    TARGET_SCORES:[150000, 200000, 250000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_177",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:30,
    TARGET_SCORES:[100000, 150000, 200000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_178",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:39,
    TARGET_SCORES:[60000, 90000, 120000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 2 }
    ],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_179",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:30,
    TARGET_SCORES:[15000, 25000, 35000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 1 }
    ],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_180",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:40,
    TARGET_SCORES:[50000, 70000, 90000],
    BUBBLES_MAX: 8,
    TARGET_DES_BUBBLES: 35,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_181",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:40,
    TARGET_SCORES:[80000, 120000, 160000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_182",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:25,
    TARGET_SCORES:[15000, 22000, 29000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 4 }
    ],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.TIME, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_183",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:26,
    TARGET_SCORES:[60000, 90000, 120000],
    BUBBLES_MAX: 9,
    TARGET_DES_BUBBLES: 35,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_184",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:30,
    TARGET_SCORES:[40000, 60000, 80000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 4 }
    ],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_185",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:45,
    TARGET_SCORES:[100000, 150000, 200000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_186",	
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:45,
    TARGET_SCORES:[80000, 130000, 180000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_187",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:48,
    TARGET_SCORES:[90000, 160000, 230000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_188",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:42,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.ORANGE, num: 5}
    ],
    TARGET_SCORES:[30000, 60000, 90000],
    //MAX_BOMBS: 20,
    //MIN_BOMBS: 4,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STAINING"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_189",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:30,
    TARGET_SCORES:[80000, 120000, 160000],
    BUBBLES_MAX: 9,
    TARGET_DES_BUBBLES: 39,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_190",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:36,
    TARGET_SCORES:[160000, 200000, 240000],
    //MAX_BOMBS: 25,
    //MIN_BOMBS: 4,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_191",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:35,
    TARGET_SCORES:[30000, 60000, 90000],
    BOSS_POINTS: 66,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_192",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:37,
    TARGET_SCORES:[100000, 140000, 180000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_193",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:36,
    TARGET_SCORES:[100000, 150000, 200000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_194",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:30,
    TARGET_SCORES:[60000, 90000, 120000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.TIME, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_195",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[100000, 150000, 200000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_196",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:23,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.BLUE, num: 5},
        {color: Defines.COLOR.ORANGE, num: 50},
        {color: Defines.COLOR.GREEN, num: 50}
    ],
    TARGET_SCORES:[50000, 75000, 100000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STAINING"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_197",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[160000, 220000, 280000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_198",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:33,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.PINK, num: 10}
    ],
    SHUFFLE:1,
    TARGET_SCORES:[40000, 70000, 100000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STAINING", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_199",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:35,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.ORANGE, num: 5},
        {color: Defines.COLOR.PURPLE, num: 5}
    ],
    TARGET_SCORES:[40000, 70000, 100000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STAINING", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_200",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:38,
    TARGET_SCORES:[80000, 120000, 160000],
    MAX_BOMBS: 50,
    MIN_BOMBS: 3,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_201",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:28,
    TARGET_SCORES:[20000, 40000, 60000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 2 }
    ],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.TIME, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_202",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:28,
    TARGET_SCORES:[50000, 80000, 110000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_203",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:46,
    TARGET_SCORES:[80000, 110000, 140000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_204",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:35,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.BLUE, num: 5},
        {color: Defines.COLOR.GREEN, num: 5},
        {color: Defines.COLOR.PURPLE, num: 50}
    ],
    TARGET_SCORES:[25000, 40000, 55000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STAINING", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_205",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:32,
    TARGET_SCORES:[100000, 140000, 180000],
    BUBBLES_MAX: 14,
    TARGET_DES_BUBBLES: 39,
    BOSS_POINTS: 99,
    //SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_206",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:36,
    TARGET_SCORES:[20000, 30000, 40000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 5 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_207",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:45,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.YELLOW, num: 66},
        {color: Defines.COLOR.PURPLE, num: 1},
        {color: Defines.COLOR.GREEN, num: 66}
    ],
    TARGET_SCORES:[15000, 25000, 35000],
    MAX_BOMBS: 20,
    MIN_BOMBS: 1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STAINING"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_208",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:28,
    TARGET_SCORES:[40000, 70000, 100000],
    MAX_BOMBS: 60,
    MIN_BOMBS: 3,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_209",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[70000, 100000, 130000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_210",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:33,
    TARGET_SCORES:[50000, 90000, 130000],
    BUBBLES_MAX: 10,
    TARGET_DES_BUBBLES: 40,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"],
    TIPS_INDEX:[Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_211",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:43,
    TARGET_SCORES:[80000, 140000, 200000],
    MAX_BOMBS: 60,
    MIN_BOMBS: 3,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_212",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[80000, 120000, 160000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_213",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:30,
    TARGET_SCORES:[200000, 260000, 320000],
    MAX_BOMBS: 99,
    MIN_BOMBS: 5,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_214",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:38,
    TARGET_SCORES:[80000, 120000, 160000],
    MAX_BOMBS: 99,
    MIN_BOMBS: 3,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_215",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:40, 
    BUBBLES_MAX: 10,
    TARGET_DES_BUBBLES: 42,
    TARGET_SCORES:[60000, 90000, 120000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_216",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:42,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.PINK, num: 8}
    ],
    TARGET_SCORES:[80000, 150000, 220000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STAINING", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_217",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:40,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.PINK, num: 8}
    ],
    TARGET_SCORES:[80000, 150000, 220000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STAINING", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_218",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[140000, 180000, 220000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_219",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:32,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.PINK, num: 7}
    ],
    TARGET_SCORES:[60000, 120000, 180000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STAINING", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_220",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:33,
    TARGET_SCORES:[80000, 120000, 160000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_221",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:45,
    TARGET_SCORES:[150000, 250000, 350000],
    MAX_BOMBS: 80,
    MIN_BOMBS: 4,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_222",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[60000, 100000, 140000],
    //MAX_BOMBS: 20,
    //MIN_BOMBS: 4,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_223",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:37,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.PINK, num: 20},
        {color: Defines.COLOR.PURPLE, num: 20}
    ],
    TARGET_SCORES:[30000, 50000, 80000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STAINING"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
	  NAME: "LEVEL_224",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[100000, 150000, 200000],
    MAX_BOMBS: 90,
    MIN_BOMBS: 3,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_225",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[140000, 210000, 280000],
    MAX_BOMBS: 99,
    MIN_BOMBS: 1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_226",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[120000, 150000, 180000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_227",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:31, 
    BUBBLES_MAX: 12,
    TARGET_DES_BUBBLES: 40,
    TARGET_SCORES:[60000, 90000, 120000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_228",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:40,
    TARGET_SCORES:[150000, 200000, 250000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_229",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:20,
    TARGET_SCORES:[15000, 25000, 35000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 1 }
    ],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_230",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:18,
    TARGET_SCORES:[10000, 15000, 20000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 3 }
    ],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_231",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:40,
    TARGET_SCORES:[240000, 300000, 360000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_232",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:33,
    TARGET_SCORES:[120000, 160000, 200000],
    BUBBLES_MAX: 12,
    TARGET_DES_BUBBLES: 47,
    BOSS_POINTS: 77,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_233",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[120000, 160000, 200000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_234",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:31,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.BLUE, num: 88},
        {color: Defines.COLOR.ORANGE, num: 88}
    ],
    MAX_BOMBS: 99,
    MIN_BOMBS: 1,
    TARGET_SCORES:[20000, 35000, 50000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_235",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:35,
    TARGET_SCORES:[100000, 160000, 220000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_236",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:26,
    TARGET_SCORES:[8000, 16000, 24000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 1 }
    ],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_237",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:45,
    TARGET_SCORES:[150000, 200000, 250000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_238",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:42,

    TARGET_DES_DATA:[
        {color: Defines.COLOR.GREEN, num: 55},
        {color: Defines.COLOR.PINK, num: 3},
        {color: Defines.COLOR.ORANGE, num: 55}
    ],
    //MAX_BOMBS: 25,
    //MIN_BOMBS: 4,
    TARGET_SCORES:[20000, 35000, 50000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STAINING"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_239",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:43,
    TARGET_SCORES:[120000, 180000, 240000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_240",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:40,
    TARGET_SCORES:[140000, 170000, 200000],
    BUBBLES_MAX: 10,
    TARGET_DES_BUBBLES: 49,
    BOSS_POINTS: 88,
    SHUFFLE:1,
    MAX_BOMBS: 99,
    MIN_BOMBS: 3,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_WARP_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_241",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:42,
    TARGET_SCORES:[100000, 150000, 200000],
    BUBBLES_MAX: 10,
    TARGET_DES_BUBBLES: 40,
    BOSS_POINTS: 88,
    SHUFFLE:1,
    MAX_BOMBS: 99,
    MIN_BOMBS: 2,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_WARP_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_242",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:41,
    TARGET_SCORES:[150000, 200000, 250000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_243",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:41,
    TARGET_SCORES:[150000, 200000, 250000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_244",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:42,
    TARGET_SCORES:[20000, 35000, 50000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 6 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_245",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:41,
    TARGET_SCORES:[60000, 100000, 140000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_246",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:38,
    TARGET_SCORES:[150000, 200000, 250000],
    MAX_BOMBS: 99,
    MIN_BOMBS: 1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_247",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:38,
    TARGET_SCORES:[250000, 350000, 450000],
    MAX_BOMBS: 99,
    MIN_BOMBS: 1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_248",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:20,
    TARGET_SCORES:[40000, 60000, 80000],
    BOSS_POINTS: 88,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_249",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:30, 
    BUBBLES_MAX: 10,
    TARGET_DES_BUBBLES: 55,
    TARGET_SCORES:[100000, 140000, 180000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_250",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:34,
    TARGET_SCORES:[80000, 140000, 200000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_251",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:50,
    TARGET_SCORES:[150000, 200000, 250000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_252",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:35, 
    BUBBLES_MAX: 16,
    TARGET_DES_BUBBLES: 58,
    TARGET_SCORES:[100000, 150000, 200000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_253",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:45,
    TARGET_SCORES:[60000, 100000, 140000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_254",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:45,
    TARGET_SCORES:[100000, 130000, 160000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_255",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:42,
    TARGET_SCORES:[70000, 110000, 150000],
    BUBBLES_MAX: 10,
    TARGET_DES_BUBBLES: 45,
    BOSS_POINTS: 80,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_256",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:46,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.GREEN, num: 60},
        {color: Defines.COLOR.YELLOW, num: 60},
        {color: Defines.COLOR.PINK, num: 60}
    ],
    MAX_BOMBS: 99,
    MIN_BOMBS: 4,
    TARGET_SCORES:[35000, 50000, 65000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STAINING"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_257",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:40,
    TARGET_SCORES:[150000, 200000, 250000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_258",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:40,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.GREEN, num: 60},
        {color: Defines.COLOR.YELLOW, num: 60},
        {color: Defines.COLOR.PINK, num: 60}
    ],
    TARGET_SCORES:[30000, 45000, 60000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STAINING"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_259",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:46,
    TARGET_SCORES:[120000, 160000, 200000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_260",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:36,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.PURPLE, num: 55},
        {color: Defines.COLOR.ORANGE, num: 13},
        {color: Defines.COLOR.BLUE, num: 55}
    ],
    TARGET_SCORES:[15000, 25000, 35000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STAINING"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_261",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:35,
    TARGET_SCORES:[12000, 24000, 36000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 3 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_262",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:45,
    TARGET_SCORES:[15000, 25000, 35000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 7 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_263",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:45,
    TARGET_SCORES:[80000, 120000, 160000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_264",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:42,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.GREEN, num: 12},
        {color: Defines.COLOR.YELLOW, num: 90},
        {color: Defines.COLOR.PINK, num: 12}
    ],
    TARGET_SCORES:[30000, 45000, 60000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STAINING"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_265",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:45,
    TARGET_SCORES:[150000, 200000, 250000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_266",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:30,
    TARGET_SCORES:[10000, 20000, 30000],
    BOSS_POINTS: 80,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_267",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:42,
    TARGET_SCORES:[150000, 200000, 250000],
    BUBBLES_MAX: 14,
    TARGET_DES_BUBBLES: 66,
    BOSS_POINTS: 128,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_268",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:40,
    TARGET_SCORES:[120000, 180000, 240000],
    MAX_BOMBS: 99,
    MIN_BOMBS: 1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_269",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:50,
    TARGET_SCORES:[120000, 160000, 200000],
    MAX_BOMBS: 99,
    MIN_BOMBS: 1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_270",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:50,
    TARGET_SCORES:[80000, 120000, 160000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_271",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:50,
    TARGET_SCORES:[100000, 140000, 180000],
    BUBBLES_MAX: 12,
    TARGET_DES_BUBBLES: 48,
    BOSS_POINTS: 66,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_272",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:36, 
    BUBBLES_MAX: 12,
    TARGET_DES_BUBBLES: 69,
    TARGET_SCORES:[180000, 230000, 280000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_273",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[120000, 160000, 200000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_274",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:45,
    TARGET_SCORES:[80000, 120000, 160000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_275",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[120000, 160000, 200000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_276",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:45,
    TARGET_SCORES:[15000, 20000, 25000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 7 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_277",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:33,
    TARGET_SCORES:[20000, 25000, 30000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 1 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_278",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:45,
    TARGET_SCORES:[150000, 200000, 250000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_279",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:42,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.GREEN, num: 69},
        {color: Defines.COLOR.PURPLE, num: 69},
        {color: Defines.COLOR.PINK, num: 69}
    ],
    TARGET_SCORES:[30000, 45000, 60000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STAINING"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_280",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:50,
    TARGET_SCORES:[100000, 150000, 200000],
    SHUFFLE:1,    
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_281",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:50,
    TARGET_SCORES:[160000, 200000, 240000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_282",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[120000, 180000, 240000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_283",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:28,
    TARGET_SCORES:[30000, 60000, 90000],
	SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_284",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:23,
	SHUFFLE:1,
    TARGET_SCORES:[40000, 60000, 80000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_285",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:25,
    TARGET_SCORES:[20000, 40000, 60000],
    BOSS_POINTS: 88,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_286",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:50,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.GREEN, num: 59},
        {color: Defines.COLOR.YELLOW, num: 59},
        {color: Defines.COLOR.PINK, num: 59}
    ],
    MAX_BOMBS: 13,
    MIN_BOMBS: 1,
    TARGET_SCORES:[20000, 40000, 60000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STAINING"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_287",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:27,
    TARGET_SCORES:[140000, 170000, 200000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_288",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
	MODEL_MIX:Defines.TARGET_MODEL.MODEL_TIME,
	TIME:60,
    BOSS_POINTS: 128,
    TARGET_SCORES:[30000, 45000, 60000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_289",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:35,
    TARGET_SCORES:[30000, 50000, 70000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 5 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_290",
    //MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:45,
	BUBBLES_MAX: 12,
    TARGET_DES_BUBBLES: 72,
	MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
	SHUFFLE:1,
    TARGET_SCORES:[180000, 220000, 260000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_291",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:23,
    TARGET_SCORES:[15000, 25000, 35000],
    BOSS_POINTS:54,
    //SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_292",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:36,
    TARGET_SCORES:[60000, 90000, 120000],
    BUBBLES_MAX: 12,
    TARGET_DES_BUBBLES: 45,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_293",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:45,
    TARGET_SCORES:[15000, 25000, 35000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 1 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_294",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:45,
    TARGET_SCORES:[30000, 50000, 70000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 1 }
    ],
	//SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_295",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:28,
    TARGET_SCORES:[30000, 60000, 90000],
    MAX_BOMBS: 99,
    MIN_BOMBS: 3,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_296",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:30,
    TARGET_SCORES:[40000, 50000, 60000],
    BOSS_POINTS: 128,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_297",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:55,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.YELLOW, num: 60},
        {color: Defines.COLOR.PURPLE, num: 4},
        {color: Defines.COLOR.PINK, num: 60}
    ],
    TARGET_SCORES:[30000, 45000, 60000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_298",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:35,
    TARGET_SCORES:[20000, 40000, 60000],
	MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 4 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_299",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:35, 
    BUBBLES_MAX: 13,
    TARGET_DES_BUBBLES: 52,
    TARGET_SCORES:[120000, 160000, 200000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_300",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
	MAX_BOMBS: 99,
    MIN_BOMBS: 3,
    TARGET_SCORES:[140000, 210000, 280000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_301",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:54,
    TARGET_SCORES:[120000, 180000, 240000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_302",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[120000, 180000, 240000],
    SHUFFLE:1,    
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_303",
	MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:50,
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 2 }
	],
	MAX_BOMBS: 99,
    MIN_BOMBS: 1,
    TARGET_SCORES:[50000, 70000, 90000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_304",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:30,
    TARGET_SCORES:[120000, 150000, 180000],
    BUBBLES_MAX: 12,
    TARGET_DES_BUBBLES: 52,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_305",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:42,
    TARGET_SCORES:[15000, 30000, 45000],
	MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 5 }
    ],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_306",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:30,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.GREEN, num: 72},
        {color: Defines.COLOR.PINK, num: 72},
		{color: Defines.COLOR.YELLOW, num: 1},
    ],
	TARGET_SCORES:[30000, 60000, 90000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_307",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:25,
    TARGET_SCORES:[150000, 180000, 210000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_308",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:45,
	MAX_BOMBS: 99,
    MIN_BOMBS: 1,
    TARGET_SCORES:[150000, 200000, 250000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_309",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:36,
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 1 }
	],
    TARGET_SCORES:[20000, 30000, 40000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_310",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:45,
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 6 }
	],
    
    TARGET_SCORES:[15000, 20000, 25000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_311",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:5,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.ORANGE, num: 15},
        {color: Defines.COLOR.PINK, num: 5},
		{color: Defines.COLOR.BLUE, num: 8},
    ],
    TARGET_SCORES:[30000, 40000, 50000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_312",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[100000, 150000, 200000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_313",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:50,
    TARGET_SCORES:[100000, 150000, 200000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_314",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:40,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.GREEN, num: 12},
        {color: Defines.COLOR.PINK, num: 12},
    ],
    MAX_BOMBS: 36,
    MIN_BOMBS: 3,
    SHUFFLE:1,
    TARGET_SCORES:[60000, 90000, 120000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_315",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:50,
    TARGET_SCORES:[70000, 110000, 150000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_316",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:45,
    TARGET_SCORES:[120000, 180000, 240000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_317",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:21,
    TARGET_SCORES:[20000, 40000, 60000],
    BOSS_POINTS: 99,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_318",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:32,
    TARGET_SCORES:[30000, 40000, 50000],
    BOSS_POINTS: 80,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_319",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:40,
    TARGET_SCORES:[30000, 50000, 70000],
    BOSS_POINTS: 90,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_320",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:25,
    TARGET_SCORES:[20000, 30000, 40000],
    BOSS_POINTS: 90,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_321",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:50,
    TARGET_SCORES:[100000, 150000, 200000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_322",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:45,
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 4 }
	  ],
	  SHUFFLE:1,
    TARGET_SCORES:[12000, 24000, 36000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_323",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:48,
    TARGET_SCORES:[80000, 120000, 160000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_324",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:50,
    TARGET_SCORES:[80000, 120000, 160000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_325",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:50,
    TARGET_SCORES:[100000, 150000, 200000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_326",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:45,
	  MAX_BOMBS: 99,
    MIN_BOMBS: 1,
    TARGET_SCORES:[100000, 150000, 200000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_327",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:42,
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 2 }
	  ],
	  SHUFFLE:1,
    TARGET_SCORES:[20000, 40000, 60000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_328",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:30,
    TARGET_SCORES:[20000, 30000, 40000],
    BOSS_POINTS: 66,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_329",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:36,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.GREEN, num: 8},
        {color: Defines.COLOR.ORANGE, num: 80},
        {color: Defines.COLOR.PINK, num: 8},
    ],
    MAX_BOMBS: 99,
    MIN_BOMBS: 3,
    SHUFFLE:1,
    TARGET_SCORES:[60000, 90000, 120000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_330",
     MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:36,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.BLUE, num: 11},
        {color: Defines.COLOR.PURPLE, num: 80},
        {color: Defines.COLOR.ORANGE, num: 10},
    ],
    MAX_BOMBS: 36,
    MIN_BOMBS: 3,
    SHUFFLE:1,
    TARGET_SCORES:[60000, 90000, 120000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_331",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:40,
    TARGET_SCORES:[80000, 120000, 160000],
    BUBBLES_MAX: 14,
    TARGET_DES_BUBBLES: 52,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_332",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:60,
	  MAX_BOMBS: 30,
    MIN_BOMBS: 3,
    TARGET_SCORES:[120000, 180000, 240000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_333",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:50,
    TARGET_SCORES:[120000, 160000, 200000],
    BUBBLES_MAX: 10,
    TARGET_DES_BUBBLES: 75,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_334",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:55,
    TARGET_SCORES:[200000, 260000, 320000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_335",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:60,
    TARGET_SCORES:[150000, 200000, 250000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_336",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:45,
    TARGET_SCORES:[120000, 160000, 200000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_337",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:40,
    TARGET_SCORES:[20000, 30000, 40000],
    BOSS_POINTS: 50,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_338",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:60,
    TARGET_SCORES:[120000, 180000, 240000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_339",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[150000, 200000, 250000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_340",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:55,
    TARGET_SCORES:[160000, 200000, 240000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_341",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:50,
    TARGET_SCORES:[100000, 150000, 200000],
    BUBBLES_MAX: 10,
    TARGET_DES_BUBBLES: 60,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_342",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:48,
	MAX_BOMBS: 99,
    MIN_BOMBS: 1,
    TARGET_SCORES:[300000, 400000, 500000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_343",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
	MAX_BOMBS: 99,
    MIN_BOMBS: 3,
    TARGET_SCORES:[140000, 210000, 280000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_344",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
	MAX_BOMBS: 99,
    MIN_BOMBS: 3,
    TARGET_SCORES:[140000, 210000, 280000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_345",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
	MAX_BOMBS: 99,
    MIN_BOMBS: 3,
    TARGET_SCORES:[140000, 210000, 280000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_346",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
	MAX_BOMBS: 99,
    MIN_BOMBS: 3,
    TARGET_SCORES:[140000, 210000, 280000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_347",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
	MAX_BOMBS: 99,
    MIN_BOMBS: 3,
    TARGET_SCORES:[140000, 210000, 280000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_348",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
	MAX_BOMBS: 99,
    MIN_BOMBS: 3,
    TARGET_SCORES:[140000, 210000, 280000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_349",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
	MAX_BOMBS: 99,
    MIN_BOMBS: 3,
    TARGET_SCORES:[140000, 210000, 280000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "LEVEL_350",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
	MAX_BOMBS: 99,
    MIN_BOMBS: 3,
    TARGET_SCORES:[140000, 210000, 280000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "GOLDEN_KEY"]
}
];

//========================================== GAME_SPACE_LEVELS =========================================================
cc.Defines.GAME_SPACE_LEVELS = [

//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_1",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:6,

    TARGET_DES_DATA:[
        {color: Defines.COLOR.YELLOW, num: 30},
        {color: Defines.COLOR.GREEN, num: 30},
        {color: Defines.COLOR.BLUE, num: 30}
    ],
     TARGET_SCORES:[10000, 16000, 22000],
    ITEMS:["ITEM_COLORFUL_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_STAINING"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_2",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:37,
    TARGET_SCORES:[90000, 120000, 180000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_3",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:20,

    TARGET_DES_DATA:[
        {color: Defines.COLOR.GREEN, num: 20},
        {color: Defines.COLOR.YELLOW, num: 20},
        {color: Defines.COLOR.BLUE, num: 20}
    ],

    TARGET_SCORES:[10000, 15000, 20000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_4",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:38,
    TARGET_SCORES:[100000, 150000, 200000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_5",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:10,
    TARGET_SCORES:[12000, 16000, 20000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_6",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:30,
    TARGET_SCORES:[30000, 40000, 50000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_7",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:12,
    TARGET_SCORES:[15000, 25000, 35000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_8",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:21,
    TARGET_SCORES:[8000, 10000, 12000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_9",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:40,
    TARGET_SCORES:[10000, 20000, 30000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_10",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:42,
    TARGET_SCORES:[40000, 80000, 120000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_11",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_TIME,
    TIME:60,
    TARGET_SCORES:[30000, 50000, 80000],
    BOSS_POINTS: 78,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TIME"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_12",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:40,
    TARGET_SCORES: [90000, 120000, 150000],
    BUBBLES_MAX: 15,
    TARGET_DES_BUBBLES: 42,
    BOSS_POINTS: 68,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_13",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:40,
    TARGET_SCORES:[150000, 200000, 250000],
    //SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_14",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:42,
    TARGET_SCORES:[40000, 60000, 80000],
    BUBBLES_MAX: 8,
    TARGET_DES_BUBBLES: 28,
    BOSS_POINTS: 48,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_15",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:55,
    TARGET_SCORES:[100000, 150000, 200000],
    SHUFFLE:1,
    MAX_BOMBS: 55,
    MIN_BOMBS: 2,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_16",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:60,
    TARGET_SCORES:[100000, 140000, 180000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_17",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:50,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.BLUE, num: 81},
        {color: Defines.COLOR.YELLOW, num: 81},
        {color: Defines.COLOR.ORANGE, num: 81}
    ],
    MAX_BOMBS: 20,
    MIN_BOMBS: 1,
    TARGET_SCORES:[20000, 40000, 60000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STAINING", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_18",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:33,
    TARGET_SCORES:[100000, 130000, 160000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_19",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:45,
    TARGET_SCORES:[30000, 45000, 60000],
    BOSS_POINTS: 15,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_20",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:36,
    TARGET_SCORES:[30000, 45000, 60000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_21",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:23,
    TARGET_SCORES:[60000, 90000, 120000],
    BUBBLES_MAX: 10,
    TARGET_DES_BUBBLES: 33,
    SHUFFLE:1,
    ITEMS:["ITEM_COLORFUL_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_22",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:35,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.YELLOW, num: 60},
        {color: Defines.COLOR.BLUE, num: 60},
        {color: Defines.COLOR.GREEN, num: 60}
    ],
    TARGET_SCORES:[20000, 40000, 60000],
    MAX_BOMBS: 20,
    MIN_BOMBS: 4,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STAINING"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_23",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:50,
    TARGET_SCORES:[60000, 100000, 140000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_24",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:35,
    TARGET_SCORES:[30000, 45000, 60000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_25",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:35,
    TARGET_SCORES:[60000, 90000, 120000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_26",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:42,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.PURPLE,num: 60},
        {color: Defines.COLOR.PINK,num: 60},
        {color: Defines.COLOR.ORANGE,num: 60}
    ],
    TARGET_SCORES:[20000, 30000, 40000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STAINING", "ITEM_STORM"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_27",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:30,
    TARGET_SCORES:[40000, 60000, 80000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_28",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:26,
    TARGET_SCORES:[30000, 40000, 50000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_29",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:33,
    TARGET_SCORES:[50000, 80000, 110000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_30",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:22,
    TARGET_SCORES:[100000, 200000, 300000],
    BUBBLES_MAX: 16,
    TARGET_DES_BUBBLES: 55,
    SHUFFLE:1,
    ITEMS:["ITEM_COLORFUL_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL31",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:11,
    TARGET_SCORES:[10000, 20000, 40000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_32",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:48,
    TARGET_SCORES:[100000, 130000, 160000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
    },
//----------------------------------------------------------------------------------------------------------------------
    {
    NAME: "SPACE_LEVEL_33",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:25,
    TARGET_SCORES:[120000, 160000, 200000],
    MAX_BOMBS: 99,
    MIN_BOMBS: 3,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
    },
//----------------------------------------------------------------------------------------------------------------------
    {
    NAME: "SPACE_LEVEL_34",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:24,
    TARGET_SCORES:[40000, 80000, 120000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
    },
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_35",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:30,
    TARGET_SCORES:[50000, 70000, 90000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_36",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:33, 
    TARGET_SCORES:[40000, 60000, 80000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_37",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:50,
    TARGET_SCORES:[100000, 130000, 160000],
	//SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_38",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:15,
    TARGET_SCORES:[3000, 5000, 7000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 1 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_39",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:36,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.GREEN, num: 88},
        {color: Defines.COLOR.PURPLE, num: 88},
        {color: Defines.COLOR.PINK, num: 88}
    ],
    TARGET_SCORES:[40000, 50000, 60000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_40",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:9,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.ORANGE, num: 12},
        {color: Defines.COLOR.PINK, num: 9},
		{color: Defines.COLOR.BLUE, num: 6},
    ],
    TARGET_SCORES:[140000, 210000, 280000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_41",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:50,
    TARGET_SCORES:[80000, 120000, 150000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_42",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:50,
    TARGET_SCORES:[80000, 120000, 150000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_43",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:50,
    TARGET_SCORES:[80000, 120000, 150000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_44",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:50,
    TARGET_SCORES:[80000, 120000, 150000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_45",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:50,
    TARGET_SCORES:[80000, 120000, 150000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "SPACE_LEVEL_46",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:50,
    TARGET_SCORES:[80000, 120000, 150000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"]
}
];

//----------------------------------------------------------------------------------------------------------------------
cc.Defines.GAME_MINE_LEVELS = [
{
	NAME: "MINE_LEVEL_1",
	MODEL:Defines.TARGET_MODEL.MODEL_MINELOTTERY,
	MOVES:0,
	//在使用的

    SPEC_AWARD:[3, 4],                //本关的特殊奖励类型
    SPEC_RATE:[50, 50],                //本关的两种特殊奖励出现的概率
    SPEC_AWARDPOINT:[20, 20, 30],                //特殊奖励出现行数规则，首次出现为20行，再每过20-30间的随机数行出一次
    LINE_RATE:3.5,
    DIAMONDS_BONUS_LEVEL: 4,            //入口界面上钻石总数的钻石数
    DIAMONDS_BONUS_RATE: 3,             //入口界面上获得几率的钻石数
    TOOL_TYPE:1,                         //该关默认使用工具类型
    STAR_NUM:1,                         //该关处于第几个星球

//=====================================
    MINE_LEVEL_SETTING:[                //采矿等级设定 [等级名/所扣金币，纵横消，爆炸消，同色消，金色石块被消除几率加成，金色石块生成几率加成]
        [1, 0, 0, 0, 0, [0,0,0]],
        [2, 0, 0, 0, 2, [5,5,0]],
        [3, 0.02, 0.02, 0, 3, [10,5,5]],
        [5, 0.05, 0.05, 0, 5, [12,10,5]],
        [10, 0.1, 0.1, 0, 8, [12,10,10]],
        [20, 0.2, 0.2, 0.05, 15,[15,12,12]],
        [30, 0.3, 0.2, 0.1, 18,[15,15,15]],
        [50, 0.4, 0.3, 0.2, 20,[20,20,20]],
        [100, 0.5, 0.4, 0.3, 25,[25,25,25]]
    ],
    DIAMONDS_PLUS:[0, 3, 6],                //三种铲子中钻石出现的叠加几率
    DIAMONDS_GET:[30, 15, 1],                //低、中、高档钻石每次在周边消除时获得钻石的基础几率
    DIAMONDS_NOR_RATE:3,                //普通矿石中获得钻石的几率
    DIAMONDS_FREE:[8, 3, 0.1],               //目前通用的几率 //免费进入时新上升的块中出现低、中、高档钻石的基础几率
    PROGRESS_GET:[60, 20, 20],          //进度条充满后，奖励目标为普通怪 普通矿石 和 钻石矿的几率
    PROGRESS_ITEM:[45, 45, 10],         //进度条充满后，奖励目标为普通怪时，生成的道具为纵横消、爆炸消、同色消的几率
    PROGRESS_LINE: 200,                 //进度条充满所需要的小怪数
    ENTER_TIME_LINE:[3, 2, 1],          //三种工具对应的采矿入口CD 3,2,1
    ENTER_CANDY:[3, 6, 9],              //采矿满足星数、时间的条件下所耗薄荷糖数
    BEFORE_ENTER_DIAMOND:[500, 1000, 1500],     //采矿提前进入时对应工具所付的钻石数
    DIAMONDS_GET_NUM:[10, 20, 100],           //三种钻石矿中获得的钻石数
    STAR_NOTFILL_NUM:500,               //星数不满足时所付钻石为STAR_NOTFILL_NUM * STAR_NUM
	
	
	//未使用的
	DIAMONDS_PAY:[5, 2, 1],                //付费进入时新上升的块中出现低、中、高档钻石的基础几率
	TARGET_SCORES:[30, 30, 40],
	BLOCK_RATE:[5, 8, 15],                //新上升的块中每出现低、中、高档钻石时伴有的障碍数量
	MOVES_LEFT:[3],                //标记剩余的初始步数，到此步数时新出现钻石的概率临时发生变化
	MOVES_PLUS:[10, 5, 5],                //到达剩余步数后下方钻石出现的临时叠加几率
	MOVES_OVER:[6, 3, 2],                //步数用尽后每步都要花钻石的时候下方钻石出现的临时叠加几率
	DIAMONDS_CUT:[50, 100, 200],                //三种铲子的的玩家收益标准
	DIAMONDS_CUTRATE:[0, 0.5, 1],                //当玩家收益超过标准后，钻石出现的几率减低
	DIAMONDS_CUTGET:[0, 0.5, 1],                //当玩家收益超过标准后，得到钻石的几率减低
	ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"]
}];