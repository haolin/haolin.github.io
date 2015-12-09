var ActorStatus = {
    Enter : 1,
    Battle : 2,
    Death :3
};

var GameStatus = {
    //教学阶段
    Guide : 1,
    //生成新的敌人
    NextEmeny : 2,
    //向前移动
    Move : 3,
    //战斗阶段
    Battle : 4,
    //播放combo动画
    Combo : 5,
    //出升级界面
    Upgrade : 6,
    //暂停
    Pause :7,
    //英雄死亡
    GameOver :8
};

//英雄攻击框种类
var HeroBoxType = {
    //普通攻击
    Normal : 0,
    //暴击
    Critical : 1
};

//敌人攻击框种类
var EmenyBoxType = {
    //普通方块
    Normal : 0,
    //盾牌方块
    Shield : 1,
    //炸弹方块
    Bomb : 2,
    //加速方块
    Speed : 3,
    //Boss方块
    Boss : 4
};

//攻击框大小
var BoxSize = {
    //Hero yellow: 46*60; Hero green: 20*60; Enemy:20*60
    Small : 1,
    //Hero yellow: 60*60; Hero green: 28*60; Enemy:32*60
    Middle : 2,
    //Hero yellow: 80*60; Hero green: 40*60; Enemy:44*60
    Large : 3
};

//攻击类别判定
var ActionType = {
    NullAction : 0,
    HeroNormalAttack : 1,
    HeroCriticalAttack : 2,
    HeroDefence : 3,
    EnemyAttack : 4,
    EnemyCriticalAttack : 5
};

globalScale = function(p){
    return p*1;
};

var ScreenSize = {
    width : 600,
    height : 336
};

var ObjectId = {

    Hero  : 1001,
    Enemy : 1101,

    HeroBox : 2001,
    EnemyBox : 2101
};

//攻击槽宽度
var ATTACK_HOLDER_WIDTH = 395;
var ATTACK_HOLDER_MIN_X = 103;
var ATTACK_HOLDER_MAX_X = 498;

//combo触发区域 <= 59
var COMBO_AREA_MAX_Y = 59;

//combo动画播放时间
var PLAY_COMBO_TIME = 0.5;

//触发combo最低点数
var MAX_BOX_COUNT = 5;

//数值未定义
var DATA_UNDEFINE = -1;