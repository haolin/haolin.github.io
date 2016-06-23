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
    //加载指定关卡
    LoadChapter : 3,
    //向前移动
    Move : 4,
    //战斗阶段
    Battle : 5,
    //播放combo动画
    Combo : 6,
    //出升级界面
    Upgrade : 7,
    //暂停
    Pause :8,
    //英雄死亡
    GameOver :9,
    //刚刚进入游戏
    GameStart : 10
};

//升级页面（upgrade）按钮类型
var UpgradeButtonType = {
    //最小伤害
    minDamage : 1,
    //最大伤害
    maxDamage : 2,
    //最大血量
    maxHealth : 3,
    //comboDamage伤害
    comboDamage : 4
};

var BattleType = {
    //正常战斗
    Normal : 1,
    //宝箱关卡
    Chest : 2
};

var EnemyType = {
    //正常战斗
    Boss : "0",
    //宝箱关卡
    Soldier : "1"

};

//英雄攻击框种类
var HeroBoxType = {
    //普通攻击
    Normal : 0,
    //暴击
    Critical : 1,
    //冰块
    Ice : 2,
    //石头
    Stone : 3,

    //固定回血
    Gold1 : 4,
    //百分比回血
    Gold2 : 5
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
    //暴击方块
    Crital : 4,
    //紫色不可点击方块
    Purple : 5,
    //紫色不可点击方块
    PurpleSlow : 6,
    //连续点击方块
    Long : 7,

    //宝箱方块
    Heal1 : 8,
    //紫色不可点击方块
    Heal2 : 9
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
    EnemyCriticalAttack : 5,

    //加血
    AddHP : 6,
    //加金币
    AddCoins : 7
};

var AttackType = {
    NormalAttack : 1,
    CriticalAttack : 2,
    //攻击被防御了
    InvalidAttack : 3,
    //攻击伤害固定为0或其他指定值
    FixDamageAttack : 4
};

globalScale = function(p){
    return p*1;
};

//600*336
//840*470
var ScreenSize = {
    width : 840,
    height : 470
};

var ObjectId = {

    Hero  : 1001,
    Enemy : 1101,

    HeroBox : 2001,
    EnemyBox : 2301,
    ChestBox : 2601,

    //skill
    HeroSkill : 3000,
    EnemySkill : 3100,
    Crital : 3101,
    Purple : 3102,
    PurpleSlow : 3103,
    Swap : 3104,
    AttackCurse : 3105,
    DefenseCurse : 3106,
    Long : 3107,
    Ice : 3108,
    Stone : 3109
};

//攻击槽宽度
var ATTACK_HOLDER_WIDTH = 0.658333*ScreenSize.width;
var ATTACK_HOLDER_MIN_X = 0.1716667*ScreenSize.width;
var ATTACK_HOLDER_MAX_X = 0.83*ScreenSize.width;

//combo触发区域 <= 59
var COMBO_AREA_MAX_Y = 0.1756*ScreenSize.height;

//combo动画播放时间
var PLAY_COMBO_TIME = 0.5;

//触发combo最低点数
var MAX_BOX_COUNT = 5;

//数值未定义
var DATA_UNDEFINE = -1;