
//----------------------------------------------------------------------------------------------------------------------
var DATA_TYPE_DEFINE =
{
    //操作
    "OpenGame":{ "en":"OpenGame", "cn":"启动游戏"},
    "CloseGame":{ "en":"CloseGame", "cn":"关闭游戏"},
    "FirstPlayGame":{ "en":"FirstPlayGame", "cn":"首次启动游戏"},
    "PlayGameLevel":{ "en":"PlayGameLevel", "cn":"开始游戏关卡"},
    "EndGameLevel":{ "en":"EndGameLevel", "cn":"结束游戏关卡"},
    "FailBeforeWin":{ "en":"FailBeforeWin", "cn":"解锁关卡成功前的失败"},
    "MaxProcessLevel":{ "en":"MaxProcessLevel", "cn":"开启的最远关卡"},
    "Guide":{ "en":"Guide", "cn":"教学"},
    "PlayStory":{ "en":"PlayStory", "cn":"过场动画"},

    //物品
    "IapCost":{ "en":"IapCost", "cn":"IapCost"},
    "DiamondCost":{ "en":"DiamondCost", "cn":"DiamondCost"},
    "DiamondAcquire":{ "en":"DiamondAcquire", "cn":"DiamondAcquire"},

    //物品
    "BuyHeart":{ "en":"BuyHeart", "cn":"购买薄荷糖"},
    "BuyItem":{ "en":"BuyItem", "cn":"购买道具"},
    "UseItem":{ "en":"UseItem", "cn":"使用道具"},
    "BuyContinuePack":{ "en":"BuyContinuePack", "cn":"购买继续游戏包"},
    "UseContinuePack":{ "en":"UseContinuePack", "cn":"使用继续游戏包"},
    "BuyTime":{ "en":"BuyTime", "cn":"购买加15秒"},
    "BuyMoves":{ "en":"BuyMoves", "cn":"购买加5步"},

    //Social
    "Login":{ "en":"Login", "cn":"登陆"},
    "Share":{ "en":"Share", "cn":"分享"},
    "ReceiveHeart":{ "en":"ReceiveHeart", "cn":"收到好友薄荷糖"},
    "AskHeart":{ "en":"AskHeart", "cn":"请求好友薄荷糖"},
    "SendHeart":{ "en":"SendHeart", "cn":"发送好友薄荷糖"},
    "SendHelp":{ "en":"SendHelp", "cn":"发送好友解锁星球帮助"},
    "AskHelp":{ "en":"AskHelp", "cn":"请求好友解锁星球帮助"},
    "ReceiveHelp":{ "en":"ReceiveHelp", "cn":"收到好友解锁星球帮助"},
    "InviteFriend":{ "en":"InviteFriend", "cn":"邀请好友"},
    "FriendsCount":{ "en":"FriendsCount", "cn":"好友数量"},

    //Others
    "Brand":{"en":"Brand","cn":"烙印"},//禁止别处使用
    "END":{"en":"END","cn":"结束"}
};

//----------------------------------------------------------------------------------------------------------------------
var DATA_PARAMETER_DEFINE =
{
    "Brand":{ "en":"Brand", "cn":"渠道"},
    "Flag":{ "en":"Flag", "cn":"标记位"},
    "Result":{ "en":"Result", "cn":"结果"},
    "Level":{ "en":"Level", "cn":"关卡名"},
    "Time":{ "en":"Time", "cn":"时间"},
    "Name":{ "en":"Name", "cn":"名称"},
    "Count":{ "en":"Count", "cn":"数量"},
    "GiftCount":{ "en":"GiftCount", "cn":"赠送数量"},
    "Money":{ "en":"Money", "cn":"钱数"},
    "Last":{ "en":"Last", "cn":"购买前剩余数量"},
    "Index":{ "en":"Index", "cn":"序列号"},
    "Diamond":{ "en":"Diamond", "cn":"钻石数"},
    "SurplusStorage":{ "en":"SurplusStorage", "cn":"剩余库存"},
    "Guide":{ "en":"Guide", "cn":"向导"},
    "isAllPlayed":{ "en":"isAllPlayed", "cn":"是否全部播放"},
    "SharePlace":{ "en":"SharePlace", "cn":"分享位置"},
    "Channel":{ "en":"Channel", "cn":"渠道"}
};

//----------------------------------------------------------------------------------------------------------------------
var _Localization_Type = function(value, language)
{
    if(!DATA_TYPE_DEFINE[value])
    {
        return value;
    }

    return DATA_TYPE_DEFINE[value][language];
};

//------------------------------------------------------------------------------------------------------------------
var _Localization_Parameter = function(value, language)
{
    if(!DATA_PARAMETER_DEFINE[value] && true)
    {
        return value;
    }

    return DATA_PARAMETER_DEFINE[value][language];
};

//------------------------------------------------------------------------------------------------------------------
//钻石收入
var DIAMOND_INCOME =
{
    IAP: 0,                 /*IAP支付*/
    LEVEL_WIN: 1,           /*关卡胜利的奖励*/
    SHARE: 2,               /*首次分享的奖励*/
    GUIDE: 3,               /*向导的奖励*/
    FIRST_LOGIN: 4,         /*首次登录奖励*/
    SYS_BONUS: 5,           /*系统奖励*/
    CD_KEY: 6,              /*分享的兑换码*/
    BI_KEY: 7,              /*BI的兑换码*/
    PHONE_CARD: 8,          /*充值卡多余部分的兑换*/
    NEW_PACK: 9             /*新手包所包含的钻石*/
};

//钻石的消耗 连接商品的ID
var DIAMOND_COST =
{
    UNLOCK_NEW_STAR: 101,           /*钻石解锁新星球*/
    UNLOCK_ITEM_CONTAINER: 102,     /*钻石解锁道具槽*/
    GAME_CONTINUE: 103              /*钻石单次继续游戏*/
};

//道具的来源
var ITEM_INCOME =
{
    DIAMOND: 0,
    NEW_PACK: 1,
    SUPER_PACK: 2,
    WORLD_PACK: 3,
    DAILY_BONUS: 4,
    BI_KEY: 5,
    FIRST_LOGIN: 6,         /*首次登录奖励*/
    SYS_BONUS: 7           /*系统奖励*/
};