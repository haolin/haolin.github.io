
/**
 * 0:退出游戏
 * 1:隐藏启动log
 * 2:打开更多游戏
 * 4:兑换码
 * 5:更新
 * 6:show dialog
 * 7:隐藏登陆loading
 * 8:微博邀请功能 参数JsonString
 * @param flag
 * @param argument 附带参数，字符串形式
 */
function noticeJaveHandler(flag , argument)
{
    if(!argument)
    {//如果是undefine直接赋值为空字符串
        argument = "";
    }
    var configClass = wrapperConfig.Config.getInstance();
    configClass.noticeJavaHandlerWithArg(flag , argument);
}


//分享      参数：兑换码
function shareMsg(param,key)
{
    var shareClass =  share.Share.getInstance();
    cc.log("share....sharemsg....start "+key);
    
    /*==========  Subsection comment block  ==========*/
    
    var sharePicNum = Tools.randomEx(Defines.SHARE_PIC_MAXNUM);
    if(sharePicNum<1 || sharePicNum>Defines.SHARE_PIC_MAXNUM)
    {
        sharePicNum = 1;
    }
    var sharePicName = _PublicizePath + "publicize_share_"+sharePicNum+".jpg";

    if (Defines.IS_EN){
        sharePicName = _PublicizePath + "publicize_share_EN.jpg";
    }

    /*-----  End of Section comment block  ------*/
    
    shareClass.shareMsg(param,key,sharePicName);
    cc.log("share....sharemsg....after  sharePicName  "+sharePicName);
}

function shareSinaWeiBo(content)
{
    var shareClass =  share.Share.getInstance();
    
    /*==========  Subsection comment block  ==========*/
    
    var sharePicNum = Tools.randomEx(Defines.SHARE_PIC_MAXNUM);
    if(sharePicNum<1 || sharePicNum>Defines.SHARE_PIC_MAXNUM)
    {
        sharePicNum = 1;
    }
    var sharePicName = _PublicizePath + "publicize_share_"+sharePicNum+".jpg";
    
    /*-----  End of Section comment block  ------*/
    
    shareClass.shareSinaWeiBo(content,sharePicName,storeUri);
}

/**
 * 带兑换码的分享
 * jsonObj : {
 *      content : ,
 *      code : ,
 *      url : ,
 *      picPath :
 * }
 */
function shareWithCode(jsonObj){
    cc.log("sharewith code : " + storeUri);
    if(storeUri == null || storeUri == ''){
        cc.log("sharewith get storeuri");
        storeUri = Defines.STOREURL;
        jsonObj.uri = storeUri;
        //return;
    }
    shareMsg(JSON.stringify(jsonObj),jsonObj.code);
}

/**
 * 成功分享后的回调
 * @returns {number}
 */
function shareback(){
    cc.log("shareback ... successfully in js");

    //
    ShareMng.getInstance().shareSuccess();

    return 0;
}

//********************************************************************************************
/**
 * 输入兑换码之后的回调
 * @param jsonData
 */


function inputCodeBack(jsonData){
    cc.log("inputCodeBack : " +  jsonData);
    var jsonObj = JSON.parse(jsonData);
    var state = jsonObj.state;

    if(state == 1){
        var code = jsonObj.code;
        var type = jsonObj.type;
        var bi = statistics.Statistics.getInstance();

//        if(type == "bi"){
//            bi.redeemCode(code);
//        }else{
        cc.NodeSelf.getInstance().exchangeCDKey(code , function(result , key , jsonData, award){
            cc.log("result : " + result + "  key : " + key + " jsonData: " + JSON.stringify(jsonData));
            if(result){
                if(Defines.IS_KO)
                {
                    //加钻石
                    if(award.base)
                    {
                        if(award.base.diamond)
                        {
                            cc.DataMng.getInstance().addMoney(award.base.diamond, MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_EXCHANGE_CODE);
                        }
                    }

                    //道具
                    if(award.item)
                    {
                        for(var value in award.item)
                        {
                            if(ExchangeCodeItem[value])
                            {
                                cc.DataMng.getInstance().buyItemByID(ExchangeCodeItem[value],award.item[value],0);
                            }

                        }
                    }
                }
                else
                {
                    var diamondNum = jsonData.diamond;
                    cc.DataMng.getInstance().addMoney(diamondNum, MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_EXCHANGE_CODE); //兑换码
                }

                cc.log("diamondNum = " + diamondNum);
                var succMsg = Resource.ChineseTxt["msg_key_0"] + diamondNum + Resource.ChineseTxt["msg_key_1"];
                if(Defines.IS_KO)
                {
                    succMsg = Resource.KoreanTxt["cdkey_right"];
                }
                _MsgView_CodeBonus(succMsg);
                BIMng.getBIDiamond().logDiamondIncome_CDKey(diamondNum ? diamondNum : 0);
            }else{

                if(Defines.IS_KO)
                {
                    if(120 == key)
                    {
                        _MsgView_CodeBonus(Resource.KoreanTxt["cdkey_error1"]);
                    }
                    else if(102 == key)
                    {
                        _MsgView_CodeBonus(Resource.KoreanTxt["cdkey_error2"]);
                    }
                    return;
                }

                if(Defines.OS.isiOS()){
                    //若失败，第二个参数是失败原因 100:兑换码生成者无法使用
                    var failMsg = (key == 100) ? Resource.ChineseTxt["msg_key_2"] : Resource.ChineseTxt["msg_key_3"];
                    _MsgView_CodeBonus(failMsg);
                }else if(Defines.OS.isAndroid()){
                    if(key == 100){
                        _MsgView_CodeBonus(Resource.ChineseTxt["msg_key_2"]);
                        return;
                    }
                    bi.redeemCode(code);
                }
            }
        });
//        }
    }else{
        //输入替换码失败
        cc.log("user doesnot input code");
    }
}

/**
 * bi的替换码获取宝石,成功回调
 * @param diamondNum
 */
function biCodeFeedBack(diamondNum){
    cc.log("biCodeFeedBack : diamondNum " + diamondNum + "  ... " + diamondNum.substring(0 , 3));
    if(diamondNum.substring(0 ,3) == '100'){   //100代表宝石
        var realNum = diamondNum.substring(3);
        cc.DataMng.getInstance().addMoney(parseInt(realNum), MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_FEED_BACK); //BI兑换钻石
        //showMessageToast("兑换成功,获得钻石" + realNum);
        _MsgView_CodeBonus(true, realNum);
        BIMng.getBIDiamond().logDiamondIncome_BIKey(realNum);
    }else if(diamondNum.substring(0 , 3) == '200'){
        var id = diamondNum.substring(3);
        //_GetShopDataByID(id);
        parsePayInfoToUser(id, true);
        // showMessageToast("兑换成功,获得奖励");
    }
}

//-------------------------------------------------------------------------
/**
 * 获取红心满的cd时间
 * @returns {number}
 */
function getPlayerPowerDelayTime(){
    cc.log("get player power delay time 1");
//    var canPush = cc.DataMng.getInstance().canPush();
//
//    if(!canPush)
//    {
//        return JSON.stringify([]);
//    }

    var heartNum = cc.DataMng.getInstance().getCurrentHeart();
    var heartTime = parseInt(cc.DataMng.getInstance().getAddHeartTime()) - new Date().getTime()/1000;


    heartTime += ((Defines._GetMaxHearts() - heartNum - 1) * Defines.RESPONSE_TIME);

    if(heartTime<Defines.PUSH.MIX_TIME)
    {
        heartTime = Defines.PUSH.MIX_TIME;
    }

    var messageArray = [{"message":Resource.ChineseTxt["push_0"],"time":heartTime}];

    if(Defines.IS_KO)
    {
        var pushTime = Tools.getDayBegin(_LocalTime()) + Tools.oneDay()/2 - _LocalTime();
        if( pushTime > 0)
        {
            cc.log("pushTime1 > 0 : " + pushTime/1000);
            cc.log("pushTime: " + pushTime);
            messageArray.push({"message":Resource.ChineseTxt["push_1"],"time":pushTime/1000});
        }
        else
        {
            cc.log("pushTime1 <= 0 : " + (pushTime + Tools.oneDay())/1000);
            cc.log("pushTime: " + pushTime);
            messageArray.push({"message":Resource.ChineseTxt["push_1"],"time":(pushTime + Tools.oneDay())/1000});
        }

        pushTime = Tools.getDayBegin(_LocalTime()) + Tools.oneDay()/4*3 - _LocalTime();
        if( pushTime > 0)
        {
            cc.log("pushTime2 > 0 : " + pushTime/1000);
            cc.log("pushTime: " + pushTime);
            messageArray.push({"message":Resource.ChineseTxt["push_1"],"time":pushTime/1000});
        }
        else
        {
            cc.log("pushTime2 <= 0 : " + (pushTime + Tools.oneDay())/1000);
            cc.log("pushTime: " + pushTime);
            messageArray.push({"message":Resource.ChineseTxt["push_1"],"time":(pushTime + Tools.oneDay())/1000});
        }
    }
    else
    {
        messageArray.push({"message":Resource.ChineseTxt["push_1"],"time":Defines.PUSH.THREE_DAYS_PUSHTIME});
        messageArray.push({"message":Resource.ChineseTxt["push_1"],"time":Defines.PUSH.SEVEN_DAYS_PUSHTIME});
    }


    return JSON.stringify(messageArray);
}

//----------------------------------------------------------------------------------------------------------------------
/**
 * 显示漂浮提示框
 * @param content
 */
function showMessageToast(content){
    var configClass = wrapperConfig.Config.getInstance();
    configClass.showMessageToast(content);
}

//* 6:显示登陆loading
//* 7:隐藏登陆loading
function _SystemLoadingControl(show, content, description)
{
    cc.log("_SystemLoadingControl = " + show + ", description = " + description);
    cc.log("content = " + content);
    noticeJaveHandler(
        (show ? 6 : 7),
        (show ? content : ""));

    //
    var timerName = "_SystemLoadingControl";
    if (show)
    {
        //cc.GameManager.getInstance().removeTimerByName(timerName);
        //临时先这么处理吧。。。。。。。
        cc.GameManager.getInstance().getGameTimerGroup().add(
            40,
            function()
            {
                _SystemLoadingControl(false, "过了一定时间 强行关闭SysLoading", "cc.GameManager.getInstance().addTimer 10");
            },
            timerName
        );
    }
    else
    {
        cc.GameManager.getInstance().getGameTimerGroup().remove(timerName);
    }
}

//picPath : 图片路径    ；content :邀请内容
function _SystemShareWeiBo(picPath, content)
{
    cc.log("_SystemShareWeiBo = " + picPath + ", " + content);
    if(storeUri == null || storeUri == ''){
        storeUri = Defines.STOREURL;
    }
    noticeJaveHandler(8, JSON.stringify({ 'picPath' : picPath, 'content' : content , 'uri' : storeUri}));
}

/**
 * 按下android back键，先通知js层，在游戏中，要弹出暂停界面；如果不在游戏中，即js层不需要处理，那么请调用  noticeJaveHandler(0);
 */

function pressBackKey()
{
    var handled = handlePressBackKey();//cc.GameManager.getInstance().handlePressBackKey();
    if (!handled)
    {
        cc.AudioMng.getInstance().playExit();
        noticeJaveHandler(0);
    }
}

function sendMails(mailArray , subject , context){
    var configClass = wrapperConfig.Config.getInstance();
    configClass.sendMails(mailArray , subject , context);
}

function isSizeEnough(size){
    var configClass = wrapperConfig.Config.getInstance();
    return configClass.isSizeEnough();
}

////**可扩展对话框**////
var dialogCallBackArray = [];
function showDialogEx(title,message,buttonJsonArray,callBack)//显示对话框，可扩展Button个数
{
    var configClass = wrapperConfig.Config.getInstance();
    configClass.showDialogEx(dialogCallBackArray.length,title,message,buttonJsonArray);
    dialogCallBackArray.push(callBack);
}

function dialogExCallBack(tag,buttonIndex)//C++回调
{
    var dialogCallBack = dialogCallBackArray[tag];
    dialogCallBack(buttonIndex);
}

//showDialogEx 可扩展对话框测试用力
//showDialogEx("haha","adfasd","[\"1\",\"2\",\"3\"]",function(buttonIndex){
//          cc.log("buttonIndex: "+buttonIndex);
//});

//获取Uid对应的个人信息
var InfoFromUidObject = {};
var InfoFromUidCallBackArray = [];

function GetInfoFromUid(uid,callBack)
{
    if(InfoFromUidObject[uid])
    {
        return InfoFromUidObject[uid];
    }
    
    var opJoyClass = opJoy.OpJoy.getInstance();
    opJoyClass.addGetUidInfo(InfoFromUidCallBackArray.length,uid);
    InfoFromUidCallBackArray.push(callBack);
}

function infoFromUidCallBack(tag,uid,info)
{
    cc.log("infoFromUidCallBack tag:  " + tag + "  uid:   "+uid+"   info:   " + info);
    
    var _infoCallBack = InfoFromUidCallBackArray[tag];
    _infoCallBack(uid,info);
    
    GameTopModel.getInstance().handleInfoFromUidCallBack(uid, info);
}

//GetInfoFromUid 测试用力


var rootModel = null;
function getAndDeviceModell(){
    if(rootModel == null){
        var configClass = wrapperConfig.Config.getInstance();
        rootModel = configClass.getDeviceModel();
        //cc.log("get root model : " + rootModel);
    }
    return rootModel;
}

/**
 *dex文件的Md5值
 *apk签名的ash算法值
 *
 **/

var dexMd5 = "";

var signAsh = "";

function getDexMd5()
{
    if(dexMd5 == ""){
        var configClass = wrapperConfig.Config.getInstance();
        dexMd5 = configClass.dexMd5();
    }
    cc.log("dexMd5 : " + dexMd5);
    return dexMd5;
}

function getSignHash()
{
    if(signAsh == ""){
        var configClass = wrapperConfig.Config.getInstance();
         signAsh = configClass.getSignHash();

    }
    cc.log("signAsh : " + signAsh);
    return signAsh;
}

//广告
//adManage.AdManage.getInstance().startPunchBox(Defines.PunchBoxID);//初始化
//
//adManage.AdManage.getInstance().showPunchBoxBanner(150,0);//显示上方横条广告需要位置
////showPunchBoxPopUpAds 全屏广告



function adOfferWallCallBack(taskCoins)//下载积分墙任务后的钻石奖励
{
    //     键值说明：taskContent  string   任务名称
    //             coins  int  赚得金币数量
    if(!taskCoins)
    {
        return;
    }
    
    
    var reward = JSON.parse(taskCoins);
    
    if(reward)
    {
        showMessageToast("获得钻石:    "+reward.coins);
//		cc.DataMng.getInstance().addMoney(reward.coins, MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_SYS);//添加钻石
    }
}


//GameCenter

//设备是否支持GameCenter
//var isAvailable= opJoy.OpJoy().isGameCenterAvailable();
//cc.log("isAvailable : "+isAvailable);

//登陆GameCenter
//opJoy.OpJoy().GameCenterLogin();

//是否已经登陆GameCenter
//var isLogin = opJoy.OpJoy().isGameCenterLogin();
//cc.log("isLogin : "+isLogin);

//上传分数
//opJoy.OpJoy().ReportGameCenterScore(3000);

//显示GameCenter排行榜
//opJoy.OpJoy().ShowGameCenterLeaderboard();


/****************google play game inteface*********************************/

var isGoogleGameServiceInIt = false;

function GooglePlayGameInit(jsonData){
    cc.log("google play game init jsonData is " + jsonData);
    var data = JSON.parse(jsonData);
    if(data.state == 1){
        isGoogleGameServiceInIt = true;
    }
}

var AchievementIds = {
    LEVEL_30 : "CgkI-MymsN8OEAIQAg",
    LEVEL_60 : "CgkI-MymsN8OEAIQAw",
    LEVEL_100 : "CgkI-MymsN8OEAIQBA",
    LEVEL_150 : "CgkI-MymsN8OEAIQBQ",
    LEVEL_200 : "CgkI-MymsN8OEAIQBw"
}

function isAbleGoogleGame()
{
    return isGoogleGameServiceInIt;
}

var LeaderBoardIds = {
    Level : "CgkI-MymsN8OEAIQAQ" // 关卡
}

/**解锁关卡**/
function unLockAchievement(achievementId){
    if(!isSupportEn())return;
    if(!isAbleGoogleGame())return;
    
    var googleGame = googlePlayGame.GooglePlayGame.getInstance();
    googleGame.unLockAchievement(achievementId);
}

/**
 *添加成就点,成就点足够时自动解锁
 */
function increment(achievementId , increment)
{
    if(!isSupportEn())return;
    if(!isAbleGoogleGame())return;
    var googleGame = googlePlayGame.GooglePlayGame.getInstance();
    googleGame.increment(achievementId , increment);
}
/**提交关卡**/
function submitLevel(leaderBoardId , newLevel)
{
    if(!isSupportEn())return;
    if(!isAbleGoogleGame())return;
    cc.log("submitlevel : " + leaderBoardId + " : " + newLevel);
    var googleGame = googlePlayGame.GooglePlayGame.getInstance();
    googleGame.submitLevel(leaderBoardId , (newLevel + 1));
}
/*展示成就*/
function displayAchievement()
{
    if(!isSupportEn())return;
    var googleGame = googlePlayGame.GooglePlayGame.getInstance();
    googleGame.displayAchievement();
}
/*展示排行榜*/
function displayLeaderBoard()
{
    if(!isSupportEn())return;
    var googleGame = googlePlayGame.GooglePlayGame.getInstance();
    googleGame.displayLeaderBoard(LeaderBoardIds.Level);
}

// --------------------------------------------------------------------------------
//必须加前缀http://  例如:http://www.baidu.com
function openWebView(url){
    var configClass = wrapperConfig.Config.getInstance();
    configClass.openWebView(url);
}

//openWebView("http://www.baidu.com");
//分享
//shareClass.shareToSinaWeibo(content, picPath);
//
//shareClass.shareToTencentWeibo(content, picPath);
//
//shareClass.shareToWeChatFriend(content, picPath);
//
//shareClass.shareToWeChatCircle(content, picPath);
//
//shareClass.shareToRenRen(content, picPath);
//
//shareClass.shareToMail(subject, content, picPath);