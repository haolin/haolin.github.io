
cc.Defines.FLOAT_LEVELS = [

//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_1",
    MODEL:Defines.TARGET_MODEL.MODEL_SCORE,        //*//*得分模式*//*
    MOVES:8,                                       //*//*限定布数*//*
    TARGET_SCORES:[200, 400, 600],                //*//*目标得分*//*
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    NO_TIPS:true,
    SHOW_CUSTOM_GUIDE:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_2",
    MODEL:Defines.TARGET_MODEL.MODEL_SCORE,
    MOVES:10,
    TARGET_SCORES:[800, 1600, 2400],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_3",
    MODEL:Defines.TARGET_MODEL.MODEL_SCORE,
    MOVES:10,
    TARGET_SCORES:[1000, 2000, 3000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_4",
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
    NAME: "FLOAT_LEVEL_5",
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
    NAME: "FLOAT_LEVEL_6",
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
    NAME: "FLOAT_LEVEL_7",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:30,

    TARGET_DES_DATA:[
        {color: Defines.COLOR.PURPLE, num: 50},
        {color: Defines.COLOR.YELLOW, num: 50},
        {color: Defines.COLOR.BLUE, num: 50}
    ],

    TARGET_SCORES:[6000, 12000, 18000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TRANSPOSITION","ITEM_COLORFUL_EX" ],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_8",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:20,
    TARGET_SCORES:[10000, 20000, 30000],
    BOSS_POINTS: 60,  //30
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{


    NAME: "FLOAT_LEVEL_9",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:27,
    TARGET_SCORES:[8000, 16000, 24000],
    BOSS_POINTS: 99,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
   /* NAME: "FLOAT_LEVEL_10",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:35,
    TARGET_SCORES:[10000, 15000, 20000],
    BUBBLES_MAX: 3,
    TARGET_DES_BUBBLES: 10*/

    NAME: "FLOAT_LEVEL_10",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:30,
    TARGET_SCORES:[10000, 20000, 30000],
    BOSS_POINTS: 99,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    NO_TIPS:true,
    LOGIN_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_11",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:36,

    TARGET_DES_DATA:[
        {color: Defines.COLOR.PURPLE, num: 36},
        {color: Defines.COLOR.PINK, num: 36}
    ],

    TARGET_SCORES:[10000, 20000, 30000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_12",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:35,

    TARGET_DES_DATA:[
        {color: Defines.COLOR.GREEN, num: 28},
        {color: Defines.COLOR.PINK, num: 29},
        {color: Defines.COLOR.ORANGE, num: 30}
    ],

    TARGET_SCORES:[8000, 14000, 20000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_13",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:20,
    TARGET_SCORES:[10000,20000,30000],
    BOSS_POINTS: 30,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_14",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:36,

    TARGET_DES_DATA:[
        {color: Defines.COLOR.GREEN, num: 36},
        {color: Defines.COLOR.YELLOW, num: 37},
        {color: Defines.COLOR.BLUE, num: 38}
    ],

    TARGET_SCORES:[8000, 16000, 24000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STAINING", "ITEM_TRANSPOSITION"],
    NO_TIPS:true
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_15",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:23,
    TARGET_SCORES:[20000, 40000, 60000],
    BOSS_POINTS:99,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    NO_TIPS:true,
    DRAMA_END: "DramaLevelEnd_15"
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_16",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:30,

    TARGET_DES_DATA:[
        {color: Defines.COLOR.GREEN, num: 90},
        {color: Defines.COLOR.BLUE, num: 90}
    ],

    TARGET_SCORES:[10000, 30000, 50000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_STAINING"],
    DRAMA_START: "DramaLevelStart_16",
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.STORM, Defines.TIPS_POS.STAINING]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_17",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:13,
    TARGET_SCORES:[20000, 30000, 40000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_18",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:18,
    TARGET_SCORES:[24000, 36000, 48000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.STORM, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_19",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:18,
    TARGET_SCORES:[20000, 40000, 60000],
    ITEMS:["ITEM_COLORFUL_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_GOLDEN_KEY"],
    TIPS_INDEX:[Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.STORM, Defines.TIPS_POS.GOLDEN_KEY]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_20",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:55,
    TARGET_SCORES:[50000, 80000, 110000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_21",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:15,
    TARGET_SCORES:[10000, 18000, 26000],
    BUBBLES_MAX: 6,
    TARGET_DES_BUBBLES: 10,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_GOLDEN_KEY", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_22",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:30,
    TARGET_SCORES:[30000, 50000, 70000],
    BUBBLES_MAX: 8,
    TARGET_DES_BUBBLES: 27,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY", "ITEM_STORM"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.STORM]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_23",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:40,
    TARGET_SCORES:[50000, 90000, 130000],
    BUBBLES_MAX: 7,
    TARGET_DES_BUBBLES: 28,
    BOSS_POINTS: 60,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.STORM, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_24",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:25,
    TARGET_SCORES:[40000, 60000, 80000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    
    NAME: "FLOAT_LEVEL_25",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:48,
    TARGET_SCORES:[60000, 90000, 120000],
    BUBBLES_MAX: 14,
    TARGET_DES_BUBBLES: 49,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.STORM, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_26",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:30,
    TARGET_SCORES:[60000, 80000, 100000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_GOLDEN_KEY", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_27",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:24,
    TARGET_SCORES:[30000, 50000, 70000],
    BUBBLES_MAX: 8,
    TARGET_DES_BUBBLES: 24,
    BOSS_POINTS: 72,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_GOLDEN_KEY", "ITEM_STORM"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.STORM]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_28",
    MODEL:Defines.TARGET_MODEL.MODEL_TIME,
    TIME:60,
    TARGET_SCORES:[4000, 6000, 8000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TIME", "ITEM_COLORFUL_EX"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.TIME, Defines.TIPS_POS.COLORFUL_EX]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_29",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:50,
    TARGET_SCORES:[60000, 90000, 120000],
    BUBBLES_MAX: 15,
    TARGET_DES_BUBBLES: 76,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.STORM, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_30",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:25,
    TARGET_SCORES:[30000, 40000, 50000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY", "ITEM_TRANSPOSITION"],
    DRAMA_END: "DramaLevelEnd_30",
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_31",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:30,
    TARGET_SCORES:[20000, 40000, 60000],
    BOSS_POINTS:99,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    DRAMA_START: "DramaLevelStart_31",
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.STORM]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_32",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:40,
    TARGET_SCORES:[40000, 80000, 120000],
    BUBBLES_MAX: 7,
    TARGET_DES_BUBBLES: 49,
    BOSS_POINTS: 99,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.STORM]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_33",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:23,
    TARGET_SCORES:[60000, 90000, 120000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.STORM, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_34",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:34,
    TARGET_SCORES:[40000, 60000, 80000],
    BUBBLES_MAX: 10,
    TARGET_DES_BUBBLES: 34,
    ITEMS:["ITEM_COLORFUL_EX", "ITEM_WARP_EX", "ITEM_GOLDEN_KEY", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_35",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:16,
    TARGET_SCORES:[70000, 100000, 130000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_GOLDEN_KEY"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.STORM, Defines.TIPS_POS.GOLDEN_KEY]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_36",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:18,
    TARGET_SCORES:[2000, 4000, 6000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 1 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_37",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,        //*//*得分模式*//*
    MOVES:15,                                       //*//*限定布数*//*
    TARGET_SCORES:[60000, 90000, 120000]   ,                //*//*目标得分*//*
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.STORM]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_38",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:28, 
    BUBBLES_MAX: 10,
    TARGET_DES_BUBBLES: 38,
    TARGET_SCORES:[30000, 50000, 70000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.TRANSPOSITION]
},

//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_39",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:40,
    TARGET_SCORES:[10000, 20000, 30000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 7 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.STORM]
},

//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_40",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:40,
    TARGET_SCORES:[30000, 60000, 90000],
    BUBBLES_MAX: 9,
    TARGET_DES_BUBBLES: 40,
    BOSS_POINTS: 80,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_41",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_TIME,
    TIME:60,
    TARGET_SCORES:[30000, 60000, 120000],
    BOSS_POINTS: 99,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TIME", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.TIME, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_42",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_TIME,
    TIME:45,
    TARGET_SCORES:[30000, 60000, 90000],
    BOSS_POINTS: 68,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TIME", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.TIME, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_43",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_TIME,
    TIME:60,
    TARGET_SCORES:[50000, 100000, 150000],
    BOSS_POINTS: 108,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TIME", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.TIME, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_44",
    MODEL:Defines.TARGET_MODEL.MODEL_TIME,
    TIME:45,
    TARGET_SCORES:[15000, 30000, 45000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TIME", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.TIME, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_45",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:36,
    TARGET_SCORES:[100000, 150000, 200000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"],
    DRAMA_END: "DramaLevelEnd_45",
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.STORM, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_46",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:36,
    TARGET_SCORES:[80000, 130000, 180000],
    ITEMS:["ITEM_COLORFUL_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"],
    DRAMA_START: "DramaLevelStart_46",
    TIPS_INDEX:[Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.STORM, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_47",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:40,
    TARGET_SCORES:[60000, 100000, 140000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_GOLDEN_KEY"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.STORM, Defines.TIPS_POS.GOLDEN_KEY]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_48",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:6,
    TARGET_SCORES:[20000, 40000, 60000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.STORM, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_49",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:20,
    TARGET_SCORES:[30000, 50000, 70000],
    BOSS_POINTS: 128,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.TRANSPOSITION]
},

//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_50",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:50,

    TARGET_DES_DATA:[
        {color: Defines.COLOR.YELLOW, num: 59},
        {color: Defines.COLOR.ORANGE, num: 59},
        {color: Defines.COLOR.GREEN, num: 59}
    ],
    TARGET_SCORES:[10000, 16000, 22000],
    ITEMS:["ITEM_COLORFUL_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_STAINING"],
    TIPS_INDEX:[Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.STORM, Defines.TIPS_POS.STAINING]
},
//----------------------------------------------------------------------------------------------------------------------
{
   NAME: "FLOAT_LEVEL_51",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:21,
    TARGET_SCORES:[60000, 80000, 100000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_52",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:38,
    TARGET_SCORES:[60000, 80000, 100000],
    //ITEMS:["ITEM_COLORFUL_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_STAINING"],
    ITEMS:["ITEM_COLORFUL_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_DIRECTION_EX"],
    TIPS_INDEX:[Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.STORM, Defines.TIPS_POS.STAINING]
},

//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_53",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:39,
    TARGET_SCORES:[10000, 20000, 30000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 10 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_54",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:32,
    TARGET_SCORES:[150000, 200000, 250000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.STORM]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_55",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:18,
    TARGET_SCORES:[90000, 120000, 150000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.STORM]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_56",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:25,
    TARGET_SCORES:[60000, 90000, 120000],
    BUBBLES_MAX: 12,
    TARGET_DES_BUBBLES: 30,
    BOSS_POINTS: 144,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_GOLDEN_KEY", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_57",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:30,
    TARGET_SCORES:[20000, 40000, 60000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.STORM]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_58",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:40,

    TARGET_DES_DATA:[
        {color: Defines.COLOR.BLUE, num: 108},
        {color: Defines.COLOR.ORANGE, num: 108},
        {color: Defines.COLOR.PURPLE, num: 108}
    ],

    TARGET_SCORES:[15000, 25000, 35000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STAINING", "ITEM_STORM"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.STAINING, Defines.TIPS_POS.STORM]
},
//----------------------------------------------------------------------------------------------------------------------
{
   NAME: "FLOAT_LEVEL_59",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:28,
    TARGET_SCORES:[100000, 130000, 160000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_60",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:10,
    TARGET_SCORES:[4000, 7000, 10000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    DRAMA_END: "DramaLevelEnd_60",
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.STORM]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_61",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:30,
    TARGET_SCORES:[80000, 110000, 150000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    DRAMA_START: "DramaLevelStart_61",
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.STORM]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_62",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:40,
    TARGET_SCORES:[10000, 16000, 24000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 7 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_63",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:50,
    TARGET_SCORES:[30000, 60000, 90000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_64",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_TIME,
    TIME:60,
    TARGET_SCORES:[10000, 20000, 30000],
    BOSS_POINTS: 180,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_TIME", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.TIME, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_65",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:38,
    TARGET_SCORES:[25000, 40000, 55000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.STORM]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_66",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:30,
    TARGET_SCORES:[10000, 16000, 24000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 5 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_67",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:22,
    TARGET_SCORES:[20000, 30000, 40000],
    BOSS_POINTS: 76,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.STORM]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_68",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_TIME,
    TIME:60,
    TARGET_SCORES:[15000, 30000, 45000],
    BOSS_POINTS: 135,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TIME"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_69",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:25,
    TARGET_SCORES:[40000, 60000, 80000],
    BUBBLES_MAX: 13,
    TARGET_DES_BUBBLES: 48,
    ITEMS:["ITEM_COLORFUL_EX", "ITEM_WARP_EX", "ITEM_GOLDEN_KEY", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_70",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:45,
    TARGET_SCORES:[90000,120000, 150000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.STORM]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_71",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:30,
    TARGET_SCORES:[80000, 120000, 160000],
    MAX_BOMBS: 50,
    MIN_BOMBS: 8,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_COLORFUL_EX"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.TIME, Defines.TIPS_POS.COLORFUL_EX]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_72",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:25,

    TARGET_DES_DATA:[
        {color: Defines.COLOR.PURPLE, num: 99},
        {color: Defines.COLOR.YELLOW, num: 99},
        {color: Defines.COLOR.BLUE, num: 99}
    ],

    TARGET_SCORES:[20000, 35000, 50000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STAINING"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.STAINING, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_73",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:25,
    TARGET_SCORES:[50000, 80000, 120000],
    BUBBLES_MAX: 12,
    TARGET_DES_BUBBLES: 42,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.STAINING, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_74",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:28,
    TARGET_SCORES:[8000, 14000, 20000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 3 }
    ],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_75",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:35,
    TARGET_SCORES:[50000, 75000, 100000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_COLORFUL_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.STORM, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_76",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:30,

    TARGET_DES_DATA:[
        {color: Defines.COLOR.PURPLE, num: 56},
        {color: Defines.COLOR.GREEN, num: 57},
        {color: Defines.COLOR.BLUE, num: 58}
    ],

    TARGET_SCORES:[20000, 30000, 40000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STAINING"],
    TIPS_INDEX:[Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.STAINING, Defines.TIPS_POS.STORM]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_77",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:30,
    TARGET_SCORES:[20000, 40000, 60000],
    BUBBLES_MAX: 10,
    TARGET_DES_BUBBLES: 15,
    MAX_BOMBS: 15,
    MIN_BOMBS: 5,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_STORM", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.STORM, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_78",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:33,
    TARGET_SCORES:[30000, 40000, 50000],
    BOSS_POINTS: 168,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.STORM]
},
//----------------------------------------------------------------------------------------------------------------------
{
   NAME: "FLOAT_LEVEL_79",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:50,
    TARGET_SCORES:[15000, 25000, 35000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 7 }
    ],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
   NAME: "FLOAT_LEVEL_80",
    MODEL:Defines.TARGET_MODEL.MODEL_BUBBLE,
    MOVES:35,
    TARGET_SCORES:[30000,50000,70000],
    BUBBLES_MAX: 8,
    TARGET_DES_BUBBLES: 24,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
	DRAMA_END: "DramaLevelEnd_80",
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.STORM]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_81",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MOVES:25,
    TARGET_SCORES:[20000,40000,60000],
    BOSS_POINTS: 123,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STORM"],
    DRAMA_START: "DramaLevelStart_81",
	TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.STORM]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_82",
    MODEL:Defines.TARGET_MODEL.MODEL_FLOWER,
    MOVES:30,
    TARGET_SCORES:[6000, 8000, 10000],
    MAX_FLOWER_LEVEL: 2,
    TARGET_DES_DATA:[
        { level: 2, num: 2 }
    ],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_83",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:30,
    TARGET_SCORES:[60000,80000,100000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.STORM]
},
//----------------------------------------------------------------------------------------------------------------------
{
   NAME: "FLOAT_LEVEL_84",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:35,
    TARGET_SCORES:[30000, 60000, 90000],
    MAX_BOMBS: 20,
    MIN_BOMBS: 5,
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_85",
    MODEL:Defines.TARGET_MODEL.MODEL_TIME,
    TIME:90,
    TARGET_SCORES:[10000, 15000, 20000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TIME"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_86",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:50,
    TARGET_SCORES:[50000, 70000, 100000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_87",
    MODEL:Defines.TARGET_MODEL.MODEL_BOSS,
    MODEL_MIX:Defines.TARGET_MODEL.MODEL_TIME,
    TIME:60,
    TARGET_SCORES:[25000, 35000, 45000],
    BOSS_POINTS: 128,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_TIME"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_88",
    MODEL:Defines.TARGET_MODEL.MODEL_DESTROY,
    MOVES:60,
    TARGET_DES_DATA:[
        {color: Defines.COLOR.GREEN, num: 68},
        {color: Defines.COLOR.PINK, num: 68},
        {color: Defines.COLOR.PURPLE, num: 68}       
    ],
    TARGET_SCORES:[18000, 24000, 30000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_STAINING"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.STORM, Defines.TIPS_POS.STAINING]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_89",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:50,
    TARGET_SCORES:[90000, 130000, 180000],
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_COLORFUL_EX", "ITEM_GOLDEN_KEY"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.COLORFUL_EX, Defines.TIPS_POS.TRANSPOSITION]
},
//----------------------------------------------------------------------------------------------------------------------
{
    NAME: "FLOAT_LEVEL_90",
    MODEL:Defines.TARGET_MODEL.MODEL_UNLOCK,
    MOVES:30,
    TARGET_SCORES:[60000, 100000, 140000],
    SHUFFLE:1,
    ITEMS:["ITEM_DIRECTION_EX", "ITEM_WARP_EX", "ITEM_GOLDEN_KEY", "ITEM_TRANSPOSITION"],
    TIPS_INDEX:[Defines.TIPS_POS.DIRECTION_EX, Defines.TIPS_POS.WARP_EX, Defines.TIPS_POS.GOLDEN_KEY, Defines.TIPS_POS.TRANSPOSITION]
}
];