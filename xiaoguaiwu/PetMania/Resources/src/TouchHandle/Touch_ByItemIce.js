//金钥匙 随机消除1个有底板或牢笼障碍的位置的小怪物及所有障碍。
cc.Touch_ByItemIce = cc.Touch_ByItem.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        cc.log(this.description() + " ctor");
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Touch_ByItemIce";
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function(gameLevel)
    {
        cc.log(this.description() + " handle");
        cc.PipeAndSnakeGame.getInstance().useIce(gameLevel, 3);
        this.endTransposition(gameLevel);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    endTransposition: function(gameLevel)
    {
        cc.log(this.description() + " endTransposition");

        //
        this.m_IsFinish = true;
        this.forcedInterrupt();
        gameLevel.addCommand(cc.Cmd_EveryMoveNext.create([]));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    swallowMoveTouch: function()
    {
        return true;
    }
});

//工厂方法
cc.Touch_ByItemIce.create = function()
{
    return new cc.Touch_ByItemIce();
};
