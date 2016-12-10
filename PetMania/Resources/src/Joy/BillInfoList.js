var pay_qihuUri = APY_IP + '/qihoo/notify';
var pay_punchboxUri = APY_IP + '/punchbox/notify';
var pay_googleplayUri = APY_IP + '/google/notify';
var pay_googleplaySign = APY_IP + '/google/sign';
var pay_xiaomiUri = APY_IP + '/xiaomi/sign';
var pay_tstoreUri = APY_IP + '/tstore/verify';
/**
 *
 * @param payType  支付类型, sms : 短信支付 ， other ： 其他支付,注意此时，必须先登录360或用户系统
 * @param payid    支付Money
 * @param roleid    所买的数量
 * @param billInfo 订单信息
 * {
 *    money :     ,
 *    type :      ,
 *    name :      ,
 *    count:      ,
 *    describe:   ,     商品描述
 *    ext1:     ,     拓展参数1            payid
 *    ext2:     ,     拓展参数2            roleid
 *    ext3:     ,     拓展参数3            传商品英文名字，joy用户系统专用
 *    ext4:     ,     拓展参数4            没有用到
 *    pay : 计费代码
 *    {
 *       "cmpayCode" : "000",
 *       "cupayCode" : "130909010577",
 *       "ctpayCode" : "0211C1105711022225775311022225704301MC099474000000000000000000000000",
 *       "iap" : "com.cocoentertainment.jinjidexiaoguaiwu.iap.tier1"
 *   }
 *
 * }
 *
 *
 * @param suc 成功回调  参数data
 * @param fail 失败回调 参数data
 */
function pay(payType , payid , roleid , billInfo , suc , fail ){
    if(payType == "other" && !isJOYSystem()){
		if (Defines.IS_EN){
			noticeJaveHandler(6 , "Purchasing...");
		}
        else if (Defines.IS_KO)
        {
            noticeJaveHandler(6, "지급 되는...");
        }
		else {
			noticeJaveHandler(6 , "正在支付...");
		}
	}
    joyCommon.getInstance().pay(suc , fail , payType, payid , roleid , billInfo);
}

var billInfoList = [];

var googleplayiap = [];

function addPayList(pay)
{
    billInfoList.push(pay);
}

function addGoogleIap(pay){
    googleplayiap.push(pay);
}
//把网络支付链接列表传到各个platform
function tranPayList()
{
    var uri = {
            qihoo : pay_qihuUri,
            punchboxPay : pay_punchboxUri,
            googleplaysign : pay_googleplaySign,
            googleplayUri : pay_googleplayUri,
            xiaomi : pay_xiaomiUri,
            tstore : pay_tstoreUri,
            googleplayids : googleplayiap
    };
    //billInfoList.push(uri);
    var configClass = wrapperConfig.Config.getInstance();
    cc.log("allBillInfoList11 : " + JSON.stringify(uri));
    configClass.payListToJava(JSON.stringify(uri));
}


/**
 * 支付成功后，根据payid查找相关信息
 * 根据payid，查找支付相关信息
 * @param payid
 */
function getPayInfoById(payid){
    var payList = billInfoList;
    for(var i = 0 ; i < payList.length ; i++){
        var payInfo = payList[i];
        if(payInfo.ID == payid){
             return payInfo;
        }
    }
    return "";
}

/**
 * 支付成功后，根据payid查找相关信息
 * 根据payid，查找支付相关信息
 * @param payid
 */
function getIOSPayInfoById(productId){
    cc.log("getIOSPayInfoById  "+productId);
    var payList = billInfoList;
    for(var i = 0 ; i < payList.length ; i++){
        var payInfo = payList[i];
        if(payInfo["PAY"] && payInfo["PAY"]["iap"] == productId){
            return payInfo["ID"];
        }
    }
    return "";
}

/**
 *   根据获得的payid来解析数据，增加钻石等等
 */
function parsePayInfoToUser(payid, fromBI, amount){
    
    var payInfo = getPayInfoById(payid);

    //快用版充值卡支付 不足已支付商品处理
    if (amount && parseInt(amount) > 0)
    {
        var price = payInfo.TOTAL_PRICE.get();
        if (parseInt(amount) - price < 0)
        {
            payInfo = GUI.getPayableDiamondShopData(parseInt(amount));
        }
    }

    cc.log("payInfo : " + payInfo.toString() + " ...payid : " + payid + " ...amount : " + amount);
    PayMng.getInstance().paySuccess(payInfo, fromBI, amount);
}


