// ---------------------------------------------------------------------------

cc.NodeDefine = {};

cc.NodeDefine.ROLES = {
    kUnknown : 'unknown', //未知
    kGM : 'gm', //GM
    kSys : 'sys' //系统
};

/**
 * 定义网络动作
 * (此常量由服务端提供者统一定义)
 * 此值可与服务端的通知类型编号定义保持一致但实际上无关紧要
 * 尽量让每个动作的值按从1到kUndefined的值顺序排列，越紧凑越好！！！
 * 未尾大写字母表示字段数据类型：S->字符串String, N->数字Number, ARR->数组(Array), JSON
 */
cc.NodeDefine.NET_ACTIONS = {
    kPayCompleted : 1, //支付完成(渠道号S,订单号S,商品编号S,支付金额N,支付时间N)
    kReceivePowerFromFriend : 2, //接收到好友赠送的体力点动作(赠送者角色编号S,赠送数量N,赠送时间N)[废弃](之后将移除)
    kRecvNewMail : 3, //收到新邮件(邮件全文S)
    kRoleIDChange : 4, //角色编号发生改变(新的标识码S)
    kRoleDataChange : 5, //角色数据发生改变

    kUndefined : 6 //此值将作为数组的总长度, 所以, 务必保证此值大于上面任何一个动作的值而且不能太大!!!
};

/**
 * 定义通知消息类型编号（此值注意务必与服务端保持一致）
 */
cc.NodeDefine.NOTICES = {
    kOrderCompleted : 1,  //支付订单完成通知
    kReceivePowerFromFriendNotice : 2, //收到好友赠送体力点通知
    kRecvNewMail : 3, //接收到新邮件通知

    kUndefined : 99
};

cc.NodeDefine.MAILTYPES = {
    kNormal : 1, //客户端型邮件
    kGivePower : 2, //赠送红心邮件
    kBegStageHelp : 3, //索要过关援助邮件
    kBegPower : 4, //索要红心邮件
    kPayOrderCompleted : 5, //支付订单完成邮件
    kFirstTimeLoginReward : 6, //首次登录奖励邮件
    kReward : 7, //系统奖励邮件
    kGuildMail : 8, //公会邮件
    kPropsRewardMail : 9, //道具奖励邮件

    kUndefined : 99
};

// ---------------------------------------------------------------------------