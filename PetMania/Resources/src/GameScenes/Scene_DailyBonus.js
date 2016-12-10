
var Scene_DailyBonus = cc.Scene.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        cc.associateWithNative(this, cc.Scene);
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Scene_DailyBonus";
    },

    //------------------------------------------------------------------------------------------------------------------
    onEnter: function()
    {
        this._super();

        cc.log("进入 Scene_DailyBonus 场景  **********************");

        //
        var dailyBonus = cc.GUIBonus_Daily.create();
        cc.GUIBonus.getInstance().openWindow(this, dailyBonus);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    onExit: function()
    {
        this._super();
        cc.log("离开 Scene_DailyBonus 场景  **********************");
        cc.GUIBonus.getInstance().closeWindow();
        this.removeAllChildren(true);
        return this;
    }
});

//
Scene_DailyBonus.create = function()
{
    return new Scene_DailyBonus();
};

Scene_DailyBonus.canChangeTo = function()
{
	
    if (!NodeTime.getInstance().fuzzyMatchingServerTime(60 * 60 * 1000))
    {
		cc.log("Scene_DailyBonus.canChangeTo = " + false);
        return false;
    }
	cc.log("Scene_DailyBonus.canChangeTo = " + true);
    //先检查一下
    cc.DataMng.getDataDaily().dailyStart();

    //
//	if (Defines._IsSpringFestival()){
//        //春节特殊处理
//		return cc.DataMng.getDataDaily().getDailyCards() > 0;
//	}

    //
    var dailyContinue = cc.DataMng.getDataDaily().getDailyContinue();
    cc.log("连续登陆次数 = " + dailyContinue);

    var dailyCards = cc.DataMng.getDataDaily().getDailyCards();
    cc.log("每日奖励牌数 = " + dailyCards);

    return dailyContinue > 0 && dailyCards > 0;
    //return cc.DataMng.getDataDaily().getDailyContinue() > 0 && cc.DataMng.getDataDaily().getDailyCards() > 0;
	
};

Scene_DailyBonus.changeTo = function()
{
    cc.Director.getInstance().replaceScene(Scene_DailyBonus.create());
};
