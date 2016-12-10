
//======================================================================================================================
var _Pay_ByRMB = function(shopData, forceOthers)
{
    Tools.logShopData(shopData);

    //
//
//    parsePayInfoToUser(shopData.ID);
//    return;
    _Pay_Begin();
//    //小000909渠道用小米支付,单机版
//    if(isXiaoMi909()){
//        forceOthers = false;
//    }
//    //

	var nowDate = Date.now();

	shopData.orderID = shopData.ID + shopData.COUNT.get() + nowDate;
	
    if (forceOthers || PayMng.getInstance().canPayByOthers(shopData.TOTAL_PRICE.get()))
    {
        cc.log("_Pay_ByRMB By Others------" + shopData.NAME);

        //
        var succFunc = function()
        {
            PayMng.getInstance().pay("other", shopData);
        };

        var failFunc = function()
        {
            //添加BI统计
            BIMng.getInstance().logBiBuyFailed(shopData.ID);
            _Pay_Finish(false);
            _MsgView_ApplyDeviceIDFail();
        };
		BIMng.getInstance().logPayByRMB(shopData);
        //没有设备号需要服务器请求的情况下锁住UI
        Game_ApplyDeviceID.create(succFunc, failFunc, true);

        return;
    }

    cc.log("_Pay_ByRMB By SMS------" + shopData.NAME);
	
	cc.log("_Pay_ByRMB By SMS------orderID = " + shopData.orderID);

    BIMng.getInstance().logPayByRMB(shopData);

    if (Defines.OS.isiOS() && !_IsNetWorkEnable()) 
    {//移动在IOS为了防止投诉，要求加网络限制，咱们如果要违反可以修改此处
        var msgStr = Resource.ChineseTxt["msg_0"];
        cc.GUIMsgView.getInstance().openWindow(cc.Director.getInstance().getRunningScene(), msgStr);
    }else
    {
        PayMng.getInstance().pay("sms", shopData);
    }
    
    
};

//======================================================================================================================
var _Pay_Begin = function()
{
    //在游戏中购买要暂停游戏
    if (cc.GUIGameLevel.getInstance().isWindowOpen())
    {
        cc.GUIGameLevel.getInstance().pauseGame();
    }
};

var _Pay_Finish = function(result)
{

    if (cc.GUIGameLevel.getInstance().isWindowOpen())
    {
        cc.GUIGameLevel.getInstance().resumeGame();

        if (isCM() && Tools.compareDateNow(Defines.CM_PAY_PROMPT)){
            var curState = _GetCurGameLevelState();
            if(curState instanceof cc.State_GameOutMoves || curState instanceof cc.State_GameOutTime)//步数用尽状态
            {
                var curLevelData = cc.DataMng.getInstance().getCurLevelData();
                var m_MoveModel =
                    curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_TIME &&
                        curLevelData.MODEL_MIX != Defines.TARGET_MODEL.MODEL_TIME;
                _ChangeGameLevelStateTo(cc.State_GameLevel.getInstance());
                if (result){

//                    var shopData = cc.GUIBuyDiamond.getInstance().getContinueData();
//
//                    if (cc.DataMng.getInstance().canSpendMoney(shopData.TOTAL_PRICE.get()))
//                    {
////        //            cc.GUIBuyDiamond.getInstance().openWindow(myScene, this.m_ShopData.TOTAL_PRICE.get());
//                        //
//                        cc.DataMng.getInstance().spendMoney(shopData.TOTAL_PRICE.get(), MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_IN_SHOP, {"id": shopData.ID});//商店购买
//                        cc.DataMng.getInstance().addGameContinueCount(shopData.COUNT.get() + shopData.GIFT_COUNT.get());
//                        cc.DataMng.getInstance().spendGameContinueCount(1);
//                        BIMng.getInstance().logUseContinuePack();
//
//                        m_MoveModel ? _ContinueGame_OutMoves() : _ContinueGame_OutTime();
//                        BIMng.getInstance().logPayByDiamond(shopData);
//                    }
                }
                else {

                    var isFailed = m_MoveModel ?
                        cc.DataMng.getInstance().getLeftTouchMoves() <= 0 :
                        cc.DataMng.getInstance().getLeftGameLevelTime() <= 0;
        //
                    if (isFailed)
                    {
                        cc.DataMng.getInstance().setGameLevelResult(Defines.GAME_RESULT.RESULT_FAILED);
                        _ChangeGameLevelStateTo(cc.State_GameFail.getInstance());
                    }
                }
            }

        }

    }
};

//======================================================================================================================
var PayMng = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this.lastPayOrderID = "";
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isValid: function()
    {
        return Defines.PLATFORM.isMobile();
    },

    //------------------------------------------------------------------------------------------------------------------
    canPayByOthers: function(price)
    {
        var payType = _GetForcePayType();
        if (payType == GUI.PAY_TYPE.SMS)
        {
            return false;
        }
        else if (payType == GUI.PAY_TYPE.OTHERS)
        {
            return true;
        }

        //移动卡30元下不可以
        if (SMS_TYPE == 1 && price <= 30)
        {
            return false;
        }
        //电信卡20元下不可以
        else if (SMS_TYPE == 2 && price <= 20)
        {
            return false;
        }
        //联通卡30元下不可以
        else if (SMS_TYPE == 3 && price <= 30)
        {
            return false;
        }

        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    pay: function(payType, shopData)
    {
        if (!this.isValid() || !shopData)
        {
            _Pay_Finish(false);
            return this;
        }

        //
        var payid = shopData.ID;
        var billInfo = this._createBillInfo(shopData);

        var androidPayInfo = PayMng.PayLogInfo_Android[CHANNEL];
        var isAndroid = Defines.OS.isAndroid();

        var sendData = {
            'service_user_id' : cc.NodeSelf.getInstance().getUID(),
            'platform' : isAndroid ? androidPayInfo.platform : "apple",
            'price' : shopData.TOTAL_PRICE.get(),
            'currency' : isAndroid ? androidPayInfo.currency : "USD",
            'os' : isAndroid ? androidPayInfo.os : "ios",
            'buy_no' : shopData.orderID
        };

        //
        var successFunc = function(type, payId)
        {
            cc.log("pay ...  successfully : " + type + "  ,payId : " + payId);

            //短信支付
            if(type == "cm" || type == "ct" || type == "cu" || type == "cmmm" || type == "amazon")
            {
                parsePayInfoToUser(payId);
            }
            else if (type== "IAP"){
                var iapId = getIOSPayInfoById(payId);
                parsePayInfoToUser(iapId);
                noticeJaveHandler(7);
            }
            else if ("tstore" == type)
            {
                parsePayInfoToUser(payId);
            }
            else if("googlePlay" == type)
            {
                parsePayInfoToUser(payId);
            }
			else
            {
                _ResetPayTimer("支付成功 修改支付Timer的心跳频率");
                var groupTimer = cc.GameManager.getInstance().getGameTimerGroup();
                groupTimer.add(15, function(){
                    cc.log("pay suc and cancel the dialog after 15 seconds");
                    noticeJaveHandler(7);
                    _Pay_Finish(false);
                }, "pay");
            }

            cc.log("send asyncUpdatePayInfo successFunc");
            cc.NodeSelf.getInstance().asyncUpdatePayInfo(payType,
                payid,
                cc.NodeSelf.getInstance().getLocalRoleID(),
                billInfo,
                CHANNEL,
                true,
                sendData,
                function(result)
                {
                    cc.log("asyncUpdatePayInfo successFunc = " + result);
                    if(Defines.OS.isAndroid())
                    {
                        _SystemLoadingControl(false);
                        PartyTrackInterface.getInstance().payment(billInfo.ext3,billInfo.money,1);
                    }
                }
            );
        };

        //
        var failFunc = function(data)
        {
            noticeJaveHandler(7);   //java层直接返回的失败回调   ，
            cc.log("pay ... failed : " + data);

            _Pay_Finish(false);
			BIMng.getInstance().logBiBuyFailed(shopData.orderID);

            //
            cc.log("send asyncUpdatePayInfo failFunc");
            cc.NodeSelf.getInstance().asyncUpdatePayInfo(payType,
                payid,
                cc.NodeSelf.getInstance().getLocalRoleID(),
                billInfo,
                CHANNEL,
                false,
                sendData,
                function(result)
                {
                    cc.log("asyncUpdatePayInfo failFunc = " + result);
                    if(Defines.OS.isAndroid())
                    {
                        _SystemLoadingControl(false);
                    }
                }
            );
        };

        //old 废弃接口
        //var deviceID = cc.NodeSelf.getInstance().getDeviceID();
        //var deviceID = cc.NodeSelf.getInstance().getLocalRoleID();
        cc.log("payMng.pay, begin pay");
        pay(payType, payid, cc.NodeSelf.getInstance().getLocalRoleID(), billInfo, successFunc, failFunc);

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _createBillInfo: function(shopData)
    {
        var billInfo = {};

        //
        billInfo.money = shopData.TOTAL_PRICE.get();
        billInfo.type = shopData.BILL_TYPE;
        billInfo.name = shopData.NAME;
        billInfo.count = shopData.COUNT.get();
//        billInfo.describe = "aaa";//shopData.DESCRIPTION;
        billInfo.ext1 = shopData.ID;
        billInfo.ext2 = cc.NodeSelf.getInstance().getLocalRoleID();/*getDeviceID();*/
        billInfo.ext3 = shopData.ENG_NAME;
        billInfo.pay = shopData.PAY;
        billInfo.orderID = shopData.orderID;

        return billInfo;
    },

    //------------------------------------------------------------------------------------------------------------------
    paySuccess: function(payInfo, fromBI, amount)
    {
		cc.log("payInfo.orderID = " + payInfo.orderID);
		cc.log("this.lastPayOrderID = " + this.lastPayOrderID);
	
        if (payInfo.orderID == this.lastPayOrderID){
            return this;
        }
        else {
            this.lastPayOrderID = payInfo.orderID;
        }
		
        switch (parseInt(payInfo.ITEM_TYPE))
        {
        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND:
            {
                this.payDiamondSuccess(payInfo);
            }
            break;

        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE:
            {
                this.payHeartSuccess(payInfo);
            }
            break;

        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_ITEM:
            {
                this.payItemSuccess(payInfo);
            }
            break;

        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_TIME:
            {
                this.payTimeSuccess(payInfo);
            }
            break;

        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_MOVES:
            {
                this.payMovesSuccess(payInfo);
            }
            break;

        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_NEW:
            {
                this.payNewPlayerPackageSuccess(payInfo);
            }
            break;

        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_SUPER:
            {
                this.paySuperGiftPackageSuccess(payInfo);
            }
            break;

        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_WORLD:
            {
                this.payWorldGiftPackageSuccess(payInfo);
            }
            break;

        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_UNLOCK_NEW_ZONE:
            {
                this.payUnlockNewZoneSuccess(payInfo);
            }
            break;

        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_HEART_LIMIT:
            {
                this.payUpperHeartLimitSuccess(payInfo);
            }
            break;

        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_ACTIVATE:
            {
                this.payGameActivateSuccess(payInfo);
            }
            break;

        case GUI.SHOP_ITEM_TYPE.SHOP_ITEM_PRESENT:
            {
                this.paySendGiftSuccess(payInfo);
            }
            break;

        case GUI.SHOP_ITEM_TYPE.SHOP_LOGIN_ITEM :
            {
                cc.GUILoginItemPush.getInstance().addItem();
            }
            break;

        case GUI.SHOP_ITEM_TYPE.SHOP_FAILED_ITEM :
            {
                cc.GUIFailedItemPush.getInstance().addItem();
            }
            break;

        default:
            break;
        }

        //
		
		//支付成功BI统计
		cc.log("orderID = " + payInfo.orderID);
		BIMng.getInstance().logBiBuySuccess(payInfo.orderID);

        _Pay_Finish(true);

        //获得：购买
        var shopData = _GetShopDataByID(payInfo.ID);
        var promptTxt = shopData.NAME + Resource.ChineseTxt["pay_2"];
        var succTxt = fromBI ? Resource.ChineseTxt["pay_1"] + promptTxt : Resource.ChineseTxt["pay_0"] + promptTxt;
        var handleMore = false;

        //快用版充值卡多余部分兑换钻石
        if (amount && parseInt(amount) > 0)
        {
            var price = shopData.TOTAL_PRICE.get();
            var more = parseInt(amount) - price;
            if (more > 0)
            {
                handleMore = true;
                var norDiamond = 200 * more;
                var giftDiamond = 20 * more;
                cc.DataMng.getInstance().addMoney(norDiamond + giftDiamond, MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_KUAI_YONG_MORE);//快用版充值卡多余部分兑换钻石
                cc.GUITaskKakao.getInstance().addTaskScore(Task.TaskID.DAILY_BUY_DIAMOND,1);
                BIMng.getBIDiamond().logDiamondIncome_PhoneCard(norDiamond + giftDiamond);
                succTxt += "\n" + Resource.ChineseTxt["pay_3"] + norDiamond + "+" + giftDiamond + Resource.ChineseTxt["pay_4"];
            }
        }

        //
        var runningScene = cc.Director.getInstance().getRunningScene();

        //优先弹框提示
        if (!fromBI && this._canPopupPrompt(shopData))
        {
            if (cc.GUIGameLevel.getInstance().isWindowOpen())
            {
                runningScene = _GUILayer();
            }
            cc.GUIBuySuccess.getInstance().openWindow(runningScene, shopData);
        }
        else
        {
            cc.GUIMsgView.getInstance().openWindow(runningScene, succTxt);
        }

        //充值卡支付有余额多重提示
        if (handleMore)
        {
            cc.GUIMsgView.getInstance().openWindow(runningScene, succTxt);
        }

//        //统计部分
//        if (!fromBI)
//        {
//            BIMng.getInstance().logPayByRMB(shopData, amount);
//        }
//        else
//        {
//            BIMng.getInstance().logPayByBI(shopData);
//        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _canPopupPrompt: function(payInfo)
    {
        //继续游戏和解锁新星球用视图提示
        var msgType = [
            GUI.SHOP_ITEM_TYPE.SHOP_ITEM_TIME,
            GUI.SHOP_ITEM_TYPE.SHOP_ITEM_MOVES,
            GUI.SHOP_ITEM_TYPE.SHOP_ITEM_UNLOCK_NEW_ZONE
        ];

        if (msgType.indexOf(parseInt(payInfo.ITEM_TYPE)) >= 0)
        {
            return false;
        }

        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    payDiamondSuccess: function(payInfo)
    {
        //
        var count = payInfo.COUNT.get();
        var giftCount = payInfo.GIFT_COUNT.get();
        var discount = parseInt(payInfo.DISCOUNT * count / 100);
        var sfGift = payInfo.SF_GIFT ? payInfo.SF_GIFT.get() : 0;
        var finalAddValue = count + giftCount + sfGift + discount;

        //

        cc.DataMng.getInstance().addMoney(finalAddValue, MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_PAY);

        cc.GUITaskKakao.getInstance().addTaskScore(Task.TaskID.DAILY_BUY_DIAMOND,1);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    payHeartSuccess: function(payInfo)
    {
        var count = payInfo.COUNT.get();
        var giftCount = payInfo.GIFT_COUNT.get();
        cc.DataMng.getInstance().addHeart(count + giftCount);
        cc.GUITaskKakao.getInstance().addTaskScore(Task.TaskID.DAILY_BUY_HEART,1);
        //记录
       /* ItemPack.getInstance().addHeartRecord(
            ItemRecord.create(HEART_SOURCE.SOURCE_PAY_HEART_SUCCESS, count + giftCount)
        ).save();*/

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    payItemSuccess: function(payInfo)
    {
        var count = payInfo.COUNT.get();
        var gameItem = payInfo.GAME_ITEM;
        cc.DataMng.getInstance().buyItemByID(gameItem.ID, count, 0);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    payTimeSuccess: function(/*payInfo*/)
    {
        _ContinueGame_OutTime();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    payMovesSuccess: function(/*payInfo*/)
    {
        _ContinueGame_OutMoves();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    payNewPlayerPackageSuccess: function(/*payInfo*/)
    {
        if (!cc.DataMng.getInstance().isPayedNewPackage())
        {
            cc.DataMng.getInstance().payedNewPackage(true);

            //
            //cc.DataMng.getInstance().addHeart(5);
            cc.DataMng.getInstance().addMoney(1200, MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_PAY); //新手礼包
            cc.GUITaskKakao.getInstance().addTaskScore(Task.TaskID.DAILY_BUY_DIAMOND,1);
            //
            cc.DataMng.getInstance().buyItemByID(Defines.GameItems.ITEM_DIRECTION_EX.ID, 5, 0);
            cc.DataMng.getInstance().buyItemByID(Defines.GameItems.ITEM_WARP_EX.ID, 5, 0);
            cc.DataMng.getInstance().buyItemByID(Defines.GameItems.ITEM_COLORFUL_EX.ID, 5, 0);

            //
            if (cc.GUINewPlayerPack.getInstance().isWindowOpen())
            {
                cc.GUINewPlayerPack.getInstance().closeWindow();
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    paySuperGiftPackageSuccess: function(/*payInfo*/)
    {
        //所有道具每种5个
        for (var prop in Defines.GameItems)
        {
            if (Defines.GameItems.hasOwnProperty(prop))
            {
                cc.DataMng.getInstance().buyItemByID(Defines.GameItems[prop].ID, 5, 0);
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    payWorldGiftPackageSuccess: function(/*payInfo*/)
    {
        //所有道具每种25个
        for (var prop in Defines.GameItems)
        {
            if (Defines.GameItems.hasOwnProperty(prop))
            {
                cc.DataMng.getInstance().buyItemByID(Defines.GameItems[prop].ID, 25, 0);
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    payUnlockNewZoneSuccess: function(/*payInfo*/)
    {
        cc.GUIMapMng.getInstance().unlockNewZone();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    payUpperHeartLimitSuccess: function(payInfo)
    {
        var count = payInfo.COUNT.get();
        cc.DataMng.getInstance().addHeartRecoverMax(count);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    payGameActivateSuccess: function(/*payInfo*/)
    {
        cc.DataMng.getInstance().setTelcomActivate(true);

        var curState = _GetCurGameLevelState();
        if (curState instanceof cc.State_GameActivate)
        {
            _ChangeGameLevelStateTo(cc.State_GameLevel.getInstance());
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    paySendGiftSuccess: function(payInfo)
    {

        var sendGiftCallBack = function(res, pID, flag, fuids)
        {
            fuids.forEach(
                function(each, index)
                {
                    cc.log("sendMessageForShopGift eachUID = " + each);
                    if (pID == 32){
                        KakaoJoyInterface.getInstance().sendMessageForEarthGift(each, cc.NodeSelf.getInstance().getNick());
                    }
                    else if (pID == 33){
                        KakaoJoyInterface.getInstance().sendMessageForVenusGift(each, cc.NodeSelf.getInstance().getNick());
                    }
                    else if (pID == 34){
                        KakaoJoyInterface.getInstance().sendMessageForMars_Gift(each, cc.NodeSelf.getInstance().getNick());
                    }

                }
            );
        };

        var uArr = cc.GUIShopSendGift.getInstance().getSendUserArr();


        cc.NodeSelf.getInstance().asyncGiveFriendMarketGift(uArr, payInfo.ID, sendGiftCallBack);
        return this;
    }
});

//======================================================================================================================
PayMng._instance = null;
PayMng.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new PayMng();
        this._instance.init();
    }

    return this._instance;
};

PayMng.PayLogInfo_Android = {
    "300004": {channel: "300004", currency: "KRW", platform:"google", os:"android"},
    "300005": {channel: "300005", currency: "KRW", platform:"tstore", os:"android"}
}