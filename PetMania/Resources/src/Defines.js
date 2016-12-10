//游戏常量定义


if (!cc.pSameAs)
{
    cc.pSameAs = function (A, B) {
        if ((A != null) && (B != null)) {
            return (A.x == B.x && A.y == B.y);
        }
        return false;
    };
}

//
Defines.MAX_NUMBER_DATA_VALUE = 99999999;
Defines.DEBUG_FUNC = true;

//
Defines.IS_SMALL = false;
Defines.BASE_SCALE = Defines.IS_SMALL ? 35/70 : 1.0;
Defines.IPAD_HEIGHT = 768;

//广告ID
Defines.PunchBoxID = "100073-B2CAB2-EA96-4E99-35B628A52871";

//每个格子大小 正方形
Defines.TABLE_GRID_SIZE = Defines.IS_SMALL ? 35 : 70;

//暂时：英文版
Defines.IS_EN = false;

//暂时：韩文版
Defines.IS_KO = false;

//Google Play
Defines.IS_GOOGLE_PLAY = false;

//
Defines.FPS = 1.0/60;

//格子移动速度
Defines.OBJ_MOVE_SPEED = Defines.TABLE_GRID_SIZE * (Defines.IS_SMALL ? 8 * 0.8 : 8);
Defines.ACCELERATION_OF_GRAVITY = Defines.TABLE_GRID_SIZE/3;

// 小怪推荐提示信息下标
Defines.TIPS_POS = {
    NULL_TIPS : 114,
    DIRECTION_EX : 179,   //"快使用横\n纵消除！"
    WARP_EX : 180,       // "试试爆炸\n消除吧！"
    STORM : 183,  // "快试试大\n风暴吧！";
    STAINING : 185,     // "快用染色\n剂换装！";
    COLORFUL_EX : 181, //"使用同色\n消除吧！";
    TRANSPOSITION : 182, //"快使用瞬\n间移动！";
    GOLDEN_KEY : 186, // "火流星摧\n毁障碍！";
    TIME : 184 // "点时钟延\n时间！";
};


//可消除对象的颜色 颜色
Defines.COLOR = 
{ 
    NULL: COLOR_NULL,
    PINK: COLOR_PINK,
    GREEN: COLOR_GREEN,
    BLUE: COLOR_BLUE,
    ORANGE: COLOR_ORANGE,
    PURPLE: COLOR_PURPLE,
    YELLOW: COLOR_YELLOW,
    COLORFUL: COLOR_COLORFUL
};

//方向
Defines.DIRECTION =
{
    //无方向
	NULL: DIR_NULL,

    //8方向
    TOP: DIR_TOP,
	TOP_RIGHT: DIR_TOP_RIGHT,
    RIGHT: DIR_RIGHT,
	BOTTOM_RIGHT: DIR_BOTTOM_RIGHT,
	BOTTOM: DIR_BOTTOM,
	BOTTOM_LEFT: DIR_BOTTOM_LEFT,
	LEFT: DIR_LEFT,
	TOP_LEFT: DIR_TOP_LEFT,

    //水平垂直
    HORIZONTAL: DIR_HORIZE,
    VERTICAL: DIR_VERT
};

//
Defines.DIRECTION.CIRCLE = [

    Defines.DIRECTION.TOP,
    Defines.DIRECTION.LEFT,
    Defines.DIRECTION.BOTTOM,
    Defines.DIRECTION.RIGHT,

    Defines.DIRECTION.TOP_LEFT,
    Defines.DIRECTION.TOP_RIGHT,
    Defines.DIRECTION.BOTTOM_LEFT,
    Defines.DIRECTION.BOTTOM_RIGHT
];

//
Defines.DIRECTION.CROSS = [
    Defines.DIRECTION.TOP,
    Defines.DIRECTION.LEFT,
    Defines.DIRECTION.BOTTOM,
    Defines.DIRECTION.RIGHT
];

Defines.RECORD = {
	DIRECTIONCREATE : "Obj_MonsterDirectionCreate",
	DIRECTIONDESTROY : "Obj_MonsterDirectionDestroy",
	COLORFULCREATE : "Obj_MonsterColorfulCreate",
	COLORFULDESTROY : "Obj_MonsterColorfulDestroy",
	WRAPCREATE : "Obj_MonsterWrapCreate",
	WRAPDESTROY : "Obj_MonsterWrapDestroy"
};

//普通类型格子的所在层数的枚举
Defines.NORMAL_GRID_OBJ_LAYER = 
{ 
    BOTTOM: 0,
    MIDDLE: 1,
    TOP: 2,
    CEIL: 3
};

//
Defines.NORMAL_GRID_OBJ_LAYER_ARRAY = [
    Defines.NORMAL_GRID_OBJ_LAYER.CEIL,
    Defines.NORMAL_GRID_OBJ_LAYER.TOP,
    Defines.NORMAL_GRID_OBJ_LAYER.MIDDLE,
    Defines.NORMAL_GRID_OBJ_LAYER.BOTTOM
];

//
Defines.TARGET_MODEL =
{
    //得分模式
    MODEL_SCORE: 0,

    //解锁模式
    MODEL_UNLOCK: 1,

    //清除模式
    MODEL_DESTROY: 2,

    //时间模式
    MODEL_TIME: 3,

    //捕捉模式 泡泡怪玩法
    MODEL_BUBBLE: 4,

    //种植模式
    MODEL_FLOWER: 5,

    //种植模式
    MODEL_BOSS: 6,

    //贪吃蛇模式
    MODEL_SNAKE: 7,

    //采矿模式
    MODEL_MINE: 8,

    //采矿有奖模式
    MODEL_MINELOTTERY: 9,
    //
    MODEL_MAX: 9
};

Defines.PUSH =
{
    MIX_TIME: 300,//最小push时长（秒）
    THREE_DAYS_PUSHTIME: 3 * 24 * 60 * 60,//如果红心满后Push时长为3天(秒)
    SEVEN_DAYS_PUSHTIME: 7 * 24 * 60 * 60//如果红心满后Push时长为3天(秒)
};

Defines.SCORE_TYPE =
{
    //不计分数
    SCORE_NULL:
    {
        SCORE_EACH: 0,
        SCORE: 0
    },

    //普通三消
    SCORE_DES_NORMAL_GROUP:
    {
        SCORE: 80
    },

    //创建条纹糖
    SCORE_CREATE_DIRECTION:
    {
        SCORE: 120
    },

    //创建多彩糖
    SCORE_CREATE_COLORFUL:
    {
        SCORE_WITH_FIVE: 280,
        SCORE_WITH_SEVEN: 380
    },

    //创建爆炸糖
    SCORE_CREATE_WRAP:
    {
        SCORE_WITH_FIVE: 180,
        SCORE_WITH_SIX: 280
    },

    SCORE_CREATE_UNWRAP:
    {
        SCORE_EACH: 80
    },

    //条纹糖的消除
    SCORE_DES_BY_DIRECTION:
    {
        SCORE_EACH: 80
    },

    //多彩糖的消除
    SCORE_DES_BY_COLOR:
    {
        SCORE_EACH: 80
    },

    //激活爆炸糖的消除
    SCORE_DES_BY_WRAP:
    {
        SCORE_EACH: 80
    },

    //联合消除
    SCORE_DES_NORMAL:
    {
        SCORE_EACH: 80
    },

    SCORE_DES_WRAP_WITH_DIRECTION:
    {
        SCORE_EACH: 80
    },

    SCORE_DES_DIRECTION_WITH_DIRECTION:
    {
        SCORE_EACH: 80
    },

    SCORE_DES_WRAP_WITH_WRAP:
    {
        SCORE_EACH: 80
    },

    SCORE_DES_COLOR_WITH_COLOR:
    {
        SCORE_EACH: 80
    },

    SCORE_DES_COLOR_WITH_WRAP:
    {
        SCORE_EACH: 80
    },

    //----非Obj_Monster的物体
    //Obj_Floor
    SCORE_DES_FLOOR:
    {
        SCORE: 1000
    },

    //Obj_FloorEx
    SCORE_DES_FLOOREX:
    {
        SCORE: 2000
    },

    //Obj_Lock
    SCORE_DES_LOCK:
    {
        SCORE: 20
    },

    //Obj_Stone
    SCORE_DES_LOCK_STONE:
    {
        SCORE: 20
    },

    //Obj_Wall
    SCORE_DES_WALL:
    {
        SCORE: 20
    },

    //Obj_Stone
    SCORE_DES_STONE:
    {
        SCORE: 20
    },

    //Obj_Bomb
    SCORE_DES_BOMB:
    {
        SCORE: 1000
    },

    //Obj_Bubble
    SCORE_DES_BUBBLE:
    {
        SCORE: 20
    },

    SCORE_DES_CREATOR:
    {
        SCORE: 1800
    },

    //种植模式
    /*
     超过三个植物相连也只生成一个高一级的植物，只是分数更高。
     （三个一级升一个二级得300分，四个得500分，五个得700分，超过五个得900分。
     三个二级升三级得600分，四个得1000分，五个得1400分，超过五个得1800分。
     三个三级合体变为果实得900分，四个得1500分，五个得2100分，超过五个得2700分。）
     */
    SCORE_CREATE_BY_FLOWER_SEED:
    {
        3: 300,
        4: 500,
        5: 700,
        6: 900
    },

    SCORE_CREATE_BY_FLOWER_STEM:
    {
        3: 600,
        4: 1000,
        5: 1400,
        6: 1800
    },

    SCORE_CREATE_BY_FLOWER_FLOWER:
    {
        3: 900,
        4: 1500,
        5: 2100,
        6: 2700
    },

    //Obj_Haze
    SCORE_DES_HAZE:
    {
        SCORE: 100
    },

    //Obj_Ice
    SCORE_DES_ICE:
    {
        SCORE: 100
    }
};

//操作系统/运行平台
Defines.OS = Define_SysConfig.getInstance();
Defines.PLATFORM = Define_SysConfig.getInstance();

//多个Layer
Defines.CHILD_LAYERS =
{
    TOUCH_PAD: {Z: 1000, TAG: 1000}, //触摸板
    BACK_GROUND: {Z: 100000, TAG: 100000},
    TABLE: {Z: 200000, TAG: 200000},
    GUI: {Z: 300000, TAG: 300000},
    ANIMATE: {Z: 400000, TAG: 400000}
};

//BatchNode 定义
Defines.BATCH_NODE = {};

(function()
{
   var value = 20000;

   var props = [
       "GRIDS",
       "GRIDS_PIPLE",
       "OBJECTS_BOTTOM",
       "OBJECTS",
       "OBJECTS_NO_BATCH",
       "OBJECTS_FLOWERS",
       "OBJECTS_BOMBS",
       "OBJECTS_ADD_TIME",
       "OBJECT_BUBBLE",
       "OBJECTS_TOP",
       "OBJECT_GATE",
       "OBJECT_CEIL",
       "OBJECT_COLORFUL_EFF",
       "MONSTER_RUNNING",
       "EFFECT",
       "EFFECT_BLEND",
       "MONSTER_RUNNING_IMG"
    ];

    props.forEach(
        function(pro, index)
        {
            Defines.BATCH_NODE[pro] = Defines.BATCH_NODE[pro] || {};
            Defines.BATCH_NODE[pro].Z = value + index;
            Defines.BATCH_NODE[pro].TAG = value + index;
        }
    );
})();

//关于TABLE 的 setZOrder
Defines.GRID_OBJS_ZORDER =
{
    BACK_IMG: 0,
    OBJ_BOTTOM: 1000,
    OBJ_BOTTOM_WRAPPER: 2000,
    OBJ_MIDDLE: 3000,
    OBJ_TOP_WRAPPER: 4000,
    OBJ_TOP: 5000,
    OBJ_CEIL: 6000,
    OBJ_ANIMATE: 7000
};

//动作标记
Defines.GLOBAL_ACTION_TAGS =
{
    ACT_TAG_GRAVITY_MOVE: 100,
    ACT_TAG_GRAVITY_SCALE: 200,
    ACT_TAG_TOUCH_SWAP_MOVE: 300,
    ACT_TAG_PROMPT: 400,
    ACT_TAG_MINE_RISE: 500
};

//游戏结果
Defines.GAME_RESULT =
{
    RESULT_FAILED: 101,          /*失败*/
    RESULT_SUCCESS: 102          /*成功*/
};

//地图的拉伸区域大小
Defines.MAP_STRETCH = 960;

//库存数量上限
Defines.MAX_HEART_COUNT = 999;

//倒计时的数量上限
Defines._GetMaxHearts = function()
{
    return isTelcomOperators() ? 8 : 5;
};

Defines._GetUnlockNewStarTime = function()
{
    var sixHours = 6 * 60 * 60;
    var oneDay = 24 * 60 * 60;
    return isTelcomOperators() ? sixHours : oneDay;
};

//
Defines.RESPONSE_TIME = 60 * 30;//红心回复时间

Defines.STOREURL = "http://xgw.punchbox.org/  ";//默认官网地址
Defines.APPSTORE_URL = "https://itunes.apple.com/cn/app/id691060201";
Defines.APPSTORE_URL_EN = "https://itunes.apple.com/us/app/id874215474?ls=1&mt=8";
Defines.APPSTORE_URL_KO = "https://itunes.apple.com/kr/app/id891263244";

Defines._GetShareUrl = function()
{
	if (Defines.IS_EN){
		return Defines.APPSTORE_URL_EN;
	}
	else {
	    return "http://xgw.coco.cn/welcome/" + "   ";
	}

};

//反馈邮箱
Defines.FBURL = "gm@coco.cn";

//是否有钻石支付点
Defines._CanPayDiamond = function()
{
    return /*!isCM()*/true;
};

//是否可买新手包
Defines._CanPayNewPack = function()
{
    return /*!isCM()*/true;
};

//支付二次确认
Defines._NeedPayConfirm = function()
{
    return /*isCT()*/true;
};

//是否处理ipad适配
Defines._NeedFitIpad = function()
{
    return _ScreenHeight() == Defines.IPAD_HEIGHT;
};

////是否是春节活动期间
//Defines._IsSpringFestival = function()
//{
//	return false; //测试用
//	
//	var date = new Date(); //日期对象
//	
//	var nowMonth = date.getMonth()+1;
//	var nowDay = date.getDay();
//	
//	var flag = false;
//	
//	if (nowMonth == 1 && nowDay == 31){
//		flag = true;
//	}
//	else if (nowMonth == 2 && nowDay <= 6){
//		flag = true;
//	}
//	
//	return flag;
//};

//
Defines.LOW_PERFORMANCE = false;

//钻石花费
Defines.DIAMOND_PAY =
{
    //解锁道具槽
    UNLOCK_ITEM_CONTAINER: 1800,

    //解锁新星球
    UNLOCK_NEW_STAR: 1200,
	
	//继续游戏
    GAME_CONTINUE: 1500
};

//赚钻石
Defines.DIAMOND_REWARD =
{
    //向导奖励
    GUIDE_REWARD: 500,

    //首次分享
    FIRST_SHARE: 100
};

Defines.SHARE_PIC_MAXNUM = 9;

//截屏所用的Tag，以后不可重复了
Defines.PRINT_TAG = 5400;

//移动的新手礼包和钻石不足提示框
Defines.CM_PAY_PROMPT = "2014/5/20";

//是否开启春节活动
Defines.SPRING_FESTIVAL = true;

Defines.totalLevelTopLength = 100;

Defines.isMineGameOpen = true && !Defines.IS_EN && !Defines.IS_KO;

//广告开关
Defines.adManageOpen = function()
{
	cc.NodeHelper.getInstance().getOnlineADSwitch(function(res) {
		if (res) {
			return true;
		}
		else{
			return false;
		}
	});
    return false;
};

//Defines.FORUM_URL = "http://www.baidu.com";
Defines.FORUM_URL = "http://cafe.naver.com/goyourstar.cafe";

Defines.AD_URL_UP = "http://cafe.naver.com/goyourstar/17";

Defines.AD_URL_DOWN = "https://docs.google.com/forms/d/1SLPO86H7y7CxosPe34v7Y-UJ2TNxthoT2nEYvcfE5Bs/viewform?c=0&w=1&usp=mail_form_link";
