var GameCenterMng = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    isEnable: function()
    {
        var deviceOK = Defines.PLATFORM.isMobile();
        var osIsOk  = Defines.OS.isiOS();
        return deviceOK && osIsOk;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isLogin: function()
    {
        if (this.isEnable())
        {
            cc.log("opJoy.OpJoy().isGameCenterLogin() = " + opJoy.OpJoy().isGameCenterLogin());
            return opJoy.OpJoy().isGameCenterLogin();
        }

        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    login: function()
    {
        cc.log("[GameCenterMng]: login");

        //
        if (!this.isEnable())
        {
            cc.log("[GameCenterMng]: 无法启动 GameCenter, 机型, 系统");
            return this;
        }

        //
        if (this.isLogin())
        {
            cc.log("[GameCenterMng]: 已经启动了GameCenter 返回");
            return this;
        }

        //
        cc.log("[GameCenterMng]: 正式启动__________________________________");
        opJoy.OpJoy().GameCenterLogin();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    netWorkChanged: function()
    {
        return this; //先不调用这个，不然每次home回来 都会弹出

        if (!this.isEnable())
        {
            return this;
        }

        //
        cc.log("[GameCenterMng]: 网络环境变化 = " + netWorkType);
        if (!this.isLogin())
        {
            cc.log("[GameCenterMng]: GameCenter尚未登陆");
            this.login();
        }
        else
        {
            cc.log("[GameCenterMng]: GameCenter已经登陆");
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    uploadScore: function()
    {
        if (this.isEnable())
        {
            var totalScoreData = cc.DataMng.getInstance().getTotalData();
            cc.log("[GameCenterMng]: 准备上传分数 = " + totalScoreData[0]);
            if (totalScoreData[0] > 0)
            {
                cc.log("[GameCenterMng]: ReportGameCenterScore = " + totalScoreData[0]);
                opJoy.OpJoy().ReportGameCenterScore(totalScoreData[0]);
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    showScoreTop: function()
    {
	
        if (this.isEnable())
        {
            cc.log("[GameCenterMng]: showScoreTop");
            opJoy.OpJoy().ShowGameCenterLeaderboard();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    log: function()
    {
        cc.log("[GameCenterMng]: 系统状态 = " + this.isEnable());
        cc.log("[GameCenterMng]: 登陆状态 = " + this.isLogin());
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------

});

//单件模式
GameCenterMng._instance = null;
GameCenterMng.getInstance = function()
{
    if (!this._instance)
    {
        //
        this._instance = (new GameCenterMng()).init();
        this._instance.init();
    }

    return this._instance;
};








