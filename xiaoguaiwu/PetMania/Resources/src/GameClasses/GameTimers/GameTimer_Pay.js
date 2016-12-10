
//======================================================================================================================
var GameTimer_Pay = GameTimer.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //
        this._configIndex = 0;
        this._timeConfigure = [5, 10, 30, 60, 60 * 30, 60 * 60];

        //
        this._curTime = 0;
        this._maxTime = this._firstTime();
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "GameTimer_Pay";
    },

    //------------------------------------------------------------------------------------------------------------------
    _firstTime: function()
    {
        return this._timeConfigure[0];
    },

    //------------------------------------------------------------------------------------------------------------------
    _nextTime: function()
    {
        //
        ++this._configIndex;

        //
        var endIndex = this._timeConfigure.length - 1;
        if (this._configIndex > endIndex)
        {
            this._configIndex = endIndex;
        }

        //
        this._curTime = 0;
        this._maxTime = this._timeConfigure[this._configIndex];

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    resetTime: function(descripton)
    {
        if (descripton)
        {
            cc.log("" + descripton);
        }

        this._curTime = 0;

        //
        this._configIndex = 0;
        this._maxTime = this._firstTime();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _pay: function(orders)
    {
        cc.log("我的订单orders = " + orders.toString());

        //
        orders.forEach(
            function(a_order)
            {
                cc.log("支付了订单 ＝ " + a_order.goodsid);

                var payId = a_order.goodsid;
                var amount = a_order.amount;
                var orderId = a_order.orderid;
                
                if (isAppStoreWeiBo())
                {
                    payId = getIOSPayInfoById(payId);
                }
                
                parsePayInfoToUser(payId, false, amount);

                //最后确认订单
                var confirmCallback = function(res)
                {
                    cc.log("支付成功后向服务器确认订单，result = " + res);
                };

                cc.NodeSelf.getInstance().confirmOrder(orderId, confirmCallback);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notify: function()
    {
        var self = this;
        cc.log("向服务器要账单 开始 时间为 = " + new Date(_LocalTime()).toLocaleString());

        //
        var callback = function(res, json)
        {
            cc.log("获取订单结果 = " + res);
            
            if (res)
            {
                if (json)
                {
                    //
                    var groupTimer = cc.GameManager.getInstance().getGameTimerGroup();
                    groupTimer.remove("pay");
                    noticeJaveHandler(7);

                    //
                    if(!Defines.OS.isAndroid())
                    {
                        self._pay(json);
                    }

                }
            }
            else
            {

            }
        };

        //
        cc.NodeSelf.getInstance().getDevicePaymentOrders(callback);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    update: function(dt)
    {
        this._super(dt);

		if (isAppStoreWeiBo())
		{
			return this;
		}
        //
        var deviceID = cc.NodeSelf.getInstance().getDeviceID();
        if (!deviceID)
        {
            //cc.log("没有设备号");
            return this;
        }

        //不用刷的太频繁
        this._curTime += dt;
        if (this._curTime >= this._maxTime)
        {
            this._curTime = 0;
            this._nextTime();
            this.notify();
        }

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

GameTimer_Pay.create = function()
{
    return new GameTimer_Pay();
};

//----------------------------------------------------------------------------------------------------------------------
var _ResetPayTimer = function(description)
{
    //
    cc.GameManager.getInstance().getGameTimers().forEach(
        function(a_Timer)
        {
            if (a_Timer instanceof GameTimer_Pay)
            {
                cc.log("_ResetPayTimer ＝ " + description);
                a_Timer.resetTime(description);
            }
        }
    );
};



