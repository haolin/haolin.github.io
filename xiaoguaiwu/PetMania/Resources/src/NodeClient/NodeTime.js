
//======================================================================================================================
var NodeTime = cc.Class.extend({

    ctor: function()
    {
        this._localStartTime = 0;
        this._localElapseTime = 0;
        this._localTimer = 0;

        this._severTime = cc.GameDataTime.create("_severTime", 0, _DB_OP_GAME);
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        cc.log("初始化.....NodeTime");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getStartLocalTime: function()
    {
        return this._localStartTime;
    },

    //------------------------------------------------------------------------------------------------------------------
    startLocalTime: function()
    {
        this._localStartTime = this.getLocalTime();
        return this.getStartLocalTime();
    },

    //------------------------------------------------------------------------------------------------------------------
    getServerTime: function()
    {
        return cc.NodeSelf.getInstance().getServerTime();
    },

    //------------------------------------------------------------------------------------------------------------------
    getLocalTime: function()
    {
        return Date.now();
    },

    //------------------------------------------------------------------------------------------------------------------
    update: function(time)
    {
        this._localTimer += time;
        if (this._localTimer >= 1)
        {
            this._localTimer = 0;
            ++this._localElapseTime;
        }

        return this;
    },


    //------------------------------------------------------------------------------------------------------------------
    askServer: function()
    {
        //
        var self = this;
        var time = Date.now();

        //
        this._severTime.set(0);

        //
        cc.log("开始向服务器申请申请时间 = " + time);
        cc.NodeSelf.getInstance().asyncGetServerInfo(
            function(res, param0)
            {
                cc.log(time + " 服务器返回时间的结果 = " + res + ", 通信用时 = " + (Date.now() - time));
                if (res)
                {
                    cc.log("param0 = " + JSON.stringify(param0));
                    self._severTime.set(param0['curTime'] * 1000);
                    cc.log("获取当前服务器时间为 = " + self._severTime.get() + " | " + new Date(self._severTime.get()).toLocaleString());
                }
                else
                {
                    self._severTime.set(0);
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    fuzzyMatchingServerTime: function(_stepTime)
    {
        var serverTime = this._severTime.get();
		cc.log("serverTime = " + serverTime);
        if (serverTime <= 0)
        {
            return false;
        }

        //
        var hour = 60 * 60 * 1000;
        var stepTime = _stepTime || hour;

        //
        var minTime = serverTime - stepTime;
        var maxTime = serverTime + stepTime;
        var nowTime = Date.now();


		cc.log("nowTime = " + nowTime + ", " + new Date(nowTime).toLocaleString());
        //
        cc.log("与服务器时间进行模糊比对_________________________________");
        cc.log("服务器时间 = " + serverTime + ", " + new Date(serverTime).toLocaleString());
        cc.log("服务器 模糊最小时间 = " + minTime + ", " + new Date(minTime).toLocaleString());
        cc.log("服务器 模糊最大时间 = " + maxTime + ", " + new Date(maxTime).toLocaleString());

        //
        var res = nowTime >= minTime && nowTime <= maxTime;
        if (!res)
        {
            cc.log("模糊比对时间失败!!!!!!!!");
        }
        else
        {
            cc.log("模糊比对时间正确!!!!!!!");
        }

        return res;
    }
});

NodeTime._instance = null;
NodeTime.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new NodeTime();
        this._instance.init();
    }

    return this._instance;
};

//----------------------------------------------------------------------------------------------------------------------
var _ServerTime = function()
{
    return NodeTime.getInstance().getServerTime();
};

//----------------------------------------------------------------------------------------------------------------------
var _LocalTime = function()
{
    return NodeTime.getInstance().getLocalTime();
    //return cc.NodeSelf.getInstance().getServerTime();
};

