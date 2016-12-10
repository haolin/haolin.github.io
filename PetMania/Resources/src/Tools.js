
//工具方法集合
//----------------------------------------------------------------------------------------------------------------------
//字符串格式化
//匹配形如 XXXXX{0}XXXXX{1}XXXXX{2}...
//参数 ( string matchingString, ...)
Tools.sprintfs = function(src){
    if (!src) return null;
    if (arguments.length == 0) return null;
    var args = Array.prototype.slice.call(arguments, 1);
    return src.replace(/\{(\d+)\}/g, function(m, i){
        return args[i];
    });
};
//----------------------------------------------------------------------------------------------------------------------
//随即的种子
Tools.seed = (new Date()).getTime();
//----------------------------------------------------------------------------------------------------------------------
//随机方法
Tools.random = function() 
{
    Tools.seed = (Tools.seed * 9301 + 49297) % 233280;
    return Tools.seed/(233280.0);
};
//----------------------------------------------------------------------------------------------------------------------
//随机方法
Tools.randomEx = function(number) 
{
    return Math.ceil(Tools.random() * number);
};
//----------------------------------------------------------------------------------------------------------------------
//洗牌方法
Tools.shuffle = function(array) 
{
    var i = array.length;
    var j = 0;
    var arri = 0;  

    //
    while( i > 1 )
    {  
       j = Math.floor( Tools.random() * i );  
       i--;  
        
       if( i != j )
       {
           arri = array[i];
           array[i] = array[j];
           array[j] = arri;  
       }  
    }

    return array;
};
//----------------------------------------------------------------------------------------------------------------------
//数组随机
Tools.rangeRandom = function(min, max, needRound)
{
    var randValue = (min + Tools.random() * (max - min));
    return needRound ? Math.round(randValue) : randValue;
};
//----------------------------------------------------------------------------------------------------------------------
//数组随机
Tools.arrayRandom = function(array)
{
    var len = array.length;
    return array[Tools.randomEx(len) - 1];
};
//----------------------------------------------------------------------------------------------------------------------
//打印当前时间（精确到秒数）
Tools.logSeconds = function(mark)
{
    var myDate = new Date();
    var markLog = "Current time";
    if(mark)
    {
        markLog = mark;
    }
    cc.log(markLog+" : "+myDate.toLocaleTimeString()+":"+myDate.getMilliseconds());
};
//----------------------------------------------------------------------------------------------------------------------
Tools.clone = function(obj)
{
    /*var tmp = [].concat(obj);
    return tmp[0];*/
    var newObj = (obj instanceof Array) ? [] : {};

    for (var key in obj)
    {
        var copy = obj[key];
        if (copy instanceof Array)
        {
            newObj[key] = Tools.clone(copy);
        }
        else if (
            ((typeof copy) == "object")
            && !(copy instanceof cc.Node)
            )
        {
            newObj[key] = Tools.clone(copy);
        }
        else
        {
            newObj[key] = copy;
        }
    }

    return newObj;
};

//----------------------------------------------------------------------------------------------------------------------
Tools.convertSecondTime = function(time)
{
    var minute = parseInt(time/ 60);
    var second = time % 60;

    var sMinute = minute < 10 ? ("0" + minute.toString()) : minute.toString();
    var sSecond = second < 10 ? ("0" + second.toString()) : second.toString();

    return sMinute + ":" + sSecond;
};

//----------------------------------------------------------------------------------------------------------------------
Tools.convertSecondTimeEx = function(time, showHour, showMinute, showSecond)
{
    var hour = parseInt(time/ 3600);
    var minute = parseInt(time/ 60 % 60);
    var second = parseInt(time % 60);

    var sHour = hour < 10 ? ("0" + hour.toString()) : hour.toString();
    var sMinute = minute < 10 ? ("0" + minute.toString()) : minute.toString();
    var sSecond = second < 10 ? ("0" + second.toString()) : second.toString();

    var res = "";

    if (showHour)
    {
        res += sHour;
        if (showMinute)
        {
            res += ":";
        }
    }

    if (showMinute)
    {
        res += sMinute;
        if (showSecond)
        {
            res += ":";
        }
    }

    if (showSecond)
    {
        res += sSecond;
    }


    return res;
    //return sHour + ":" + sMinute + ":" + sSecond;
};

//----------------------------------------------------------------------------------------------------------------------
Tools.oneDay = function()
{
    return 24 * 3600 * 1000;
};

//----------------------------------------------------------------------------------------------------------------------
Tools.getDayPass = function(millSec)
{
    var a_Date = new Date(millSec);
    return (a_Date.getHours() * 3600 + a_Date.getMinutes() * 60 + a_Date.getSeconds()) * 1000;
};

//----------------------------------------------------------------------------------------------------------------------
Tools.getDayBegin = function(millSec)
{
    return millSec - Tools.getDayPass(millSec);
};

//----------------------------------------------------------------------------------------------------------------------
Tools.getDayEnd = function(millSec)
{
    return Tools.getDayBegin(millSec) + Tools.oneDay();
};

//----------------------------------------------------------------------------------------------------------------------
Tools.compareDateNow = function(dateStr)
{
    var endDate = new Date(dateStr);
    var nowDate = Date.now();

    //比较的时间大 返回true
    return endDate > nowDate;
};

//----------------------------------------------------------------------------------------------------------------------
//"yyyy-MM-dd hh:mm:ss"
Tools.formatDate = function(format)
{
    var date = new Date();

    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3)/3),
        "S" : date.getMilliseconds()
    };

    if(/(y+)/.test(format))
    {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for(var k in o)
    {
        if(o.hasOwnProperty(k) && new RegExp("("+ k +")").test(format))
        {
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }

    return format;
};

//----------------------------------------------------------------------------------------------------------------------
Tools.getScoreRate = function(score, targetScores)
{
    if (score >= targetScores[2])
    {
        //3颗星星
        return 3;
    }
    else if (score >= targetScores[1])
    {
        //2颗星星
        return 2;
    }
    else if (score >= targetScores[0])
    {
        //1颗星星
        return 1;
    }

    //没有评级
    return 0;
};

//----------------------------------------------------------------------------------------------------------------------
Tools.logShopData = function(shopData)
{
    var test = true;
    if (!test)
    {
        return;
    }

    var itemTypes = ["钻石", "薄荷糖", "道具", "加时间", "加步数","新手包", "超级包", "宇宙包", "新星球", "薄荷糖上限", "正版激活"];
    cc.log("==================================================================");
    cc.log("商品ID = " + shopData.ID);
    cc.log("名称 = " + shopData.NAME);
    cc.log("英文名称 = " + shopData.ENG_NAME);
    cc.log("交易类型 = " + shopData.BILL_TYPE);
    cc.log("商品类型 = " + itemTypes[shopData.ITEM_TYPE]);
    cc.log("数量 = " + shopData.COUNT.get());
    cc.log("赠送 = " + (shopData.GIFT_COUNT ? shopData.GIFT_COUNT.get() : null));
    cc.log("价格 = " + shopData.TOTAL_PRICE.get());
    cc.log("描述 = " + shopData.DESCRIPTION);
	
	if (shopData.PAY){
	    cc.log("CM = " + shopData.PAY.cmpayCode);
		cc.log("CMMM = " + shopData.PAY.cmmmpayCode);
		cc.log("CU = " + shopData.PAY.cupayCode);
		cc.log("CT = " + shopData.PAY.ctpayCode);
		cc.log("GoogleIAP = " + shopData.PAY.googleiap);
		cc.log("IAP = " + shopData.PAY.iap);
		cc.log("amazoniap = " + shopData.PAY.amazoniap);
	}

    cc.log("==================================================================");
};

//======================================================================================================================
Tools.MyTimeLog = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._log = {};

        //
        this._startTime = 0;
        this._finishTime = 0;
        this._clock = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(description)
    {
        if (description)
        {
            cc.log("-------------------------------------------------------------------------------------------");
            cc.log("" + description);
        }

        this._log = {};

        //
        var now = _LocalTime();
        this._startTime = now;
        this._finishTime = now;
        this._clock = now;

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(description)
    {
        cc.log("-------------------------------------------------------------------------------------------");
        if (description)
        {
            cc.log("" + description);
        }

        this._finishTime = _LocalTime();
        this._logAll();

        cc.log("-------------------------------------------------------------------------------------------");

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    resetClock: function()
    {
        this._clock = _LocalTime();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addData: function(description)
    {
        this._log[description] = (_LocalTime() - this._clock);
        this.resetClock();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _logAll: function()
    {
        //
        var totalTime = this._finishTime - this._startTime;
        cc.log("totalTime = " + totalTime);

        //
        for (var description in this._log)
        {
            if (this._log.hasOwnProperty(description))
            {
                var time = this._log[description];
                cc.log(description + " = " + time + ", per = " + time/totalTime);
            }
        }

        return this;
    }
});

//
Tools.MyTimeLog.create = function()
{
    return new Tools.MyTimeLog();
};

//var _TestLog = null;

//======================================================================================================================
GUI.createNumberLabel = function(strText, charMapFile, itemWidth, itemHeight, startCharMap)
{
    itemWidth *= Defines.BASE_SCALE;
    itemHeight *= Defines.BASE_SCALE;
    return cc.LabelAtlas.create(strText, charMapFile, itemWidth, itemHeight, startCharMap);
};

//======================================================================================================================
GUI.createDialogSpr = function(content, contentPanelName , mx, my, mw, mh, dw, dh)
{
	var contentLabel = cc.LabelTTF.create(content, Defines.DefaultFont, 22 * Defines.BASE_SCALE);
	var labelSize = contentLabel.getContentSize();
	
//	var contentPanelName = "Images_big_frame.png";
	var orignalPanel = cc.Sprite.createWithSpriteFrameName(contentPanelName);
	var orignalSize = orignalPanel.getContentSize();
	cc.log("orignalSize = " + labelSize.width + " , " + labelSize.height );
	var targetSize = cc.size(dw, dh);//contentLabel.getContentSize();
	
	if (labelSize.width * 1.3 > targetSize.width){
		targetSize.width = labelSize.width * 1.2;
	}
	
	if (labelSize.height * 1.3 > targetSize.height){
		targetSize.height = labelSize.height * 1.2;
	}
	
	var contentPanel = cc.Scale9Sprite.createWithSpriteFrameName(contentPanelName,
//                cc.rect(0,0,orignalSize.width,orignalSize.height),
		cc.rect(orignalSize.width * mx,orignalSize.height * my,orignalSize.width * mw,orignalSize.height * mh));
	contentPanel.setPreferredSize(targetSize);
	
	return contentPanel;
};

//======================================================================================================================
/**
 * 关闭按钮
 * @param back
 * @param callBack
 * @param target
 */
GUI._AddCloseButton = function(back, callBack, target)
{
    //关闭按钮
    var buttonClose = cc.MenuItemSprite.create(
        cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
        cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
        callBack,
        target);
    //
    var itemMenu = cc.Menu.create();
    itemMenu.setPosition(cc.p(0, 0));
    itemMenu.addChild(buttonClose);
    back.addChild(itemMenu, 10000);

    buttonClose.setPosition(
        cc.p(back.getContentSize().width - buttonClose.getContentSize().width/2,
            back.getContentSize().height - buttonClose.getContentSize().height/2));

    return buttonClose;
};

//======================================================================================================================
/**
 *
 * @param contents 排版的内容数组
 * @param width 总宽度
 * @param indent 内容间的缩放值
 */

GUI.autoLayoutX = function(contents, width, indent)
{
    var offsetX = [];

    contents.forEach(
        function(content, index)
        {
            content.setAnchorPoint(cc.p(0, 0.5));
            offsetX.push(index == 0 ? 0 : offsetX[index - 1] + contents[index - 1].getBoundingBox().width + indent);
        }
    );

    var totalWidth = offsetX[offsetX.length - 1] + contents[contents.length - 1].getBoundingBox().width;
    var toSideWidth = (width - totalWidth)/2;

    contents.forEach(
        function(each, index)
        {
            each.setPositionX(toSideWidth + offsetX[index]);
        }
    );
};

//======================================================================================================================
GUI.backGroundScaleToScreen = function(backGround)
{
    //
    if (backGround.getContentSize().width < _ScreenWidth())
    {
        backGround.setScaleX(_ScreenWidth()/backGround.getContentSize().width);
    }

    //
    if (backGround.getContentSize().height < _ScreenHeight())
    {
        backGround.setScaleY(_ScreenHeight()/backGround.getContentSize().height);
    }
};

//======================================================================================================================
GUI.mapZonesBackGroundScaleToScreen = function(backGround)
{
    //
    if (backGround.getContentSize().height < _ScreenHeight())
    {
        backGround.setScaleY(_ScreenHeight()/backGround.getContentSize().height);
    }
};

//======================================================================================================================
GUI.levelObjectsScaleToScreen = function(positionY)
{
    var off = Math.abs(_ScreenHeight() - 640 * Defines.BASE_SCALE)/2;
    /*cc.log("_ScreenHeight() * Defines.BASE_SCALE = " + _ScreenHeight() * Defines.BASE_SCALE);
    cc.log("640 * Defines.BASE_SCALE = " + 640 * Defines.BASE_SCALE);
    cc.log("off" + off);*/
    return positionY + off;
};

GUI.addLabelToButton = function(button, labelName, fontSize, color)
{
    var label = cc.LabelTTF.create(labelName, Defines.DefaultFont, fontSize * Defines.BASE_SCALE);
    button.addChild(label, 1);
    label.setPosition(cc.p(button.getContentSize().width/2, button.getContentSize().height/2));
    label.setScaleX(1/button.getScaleX());
    label.setScaleY(1/button.getScaleY());
    label.setColor(color || cc.WHITE);
    return label;
};

//
Tools.forceGC = function()
{
    if (Defines.PLATFORM.isMobile())
    {
        cc.log("Tools.forceGC");
        forceGC();
    }
};



