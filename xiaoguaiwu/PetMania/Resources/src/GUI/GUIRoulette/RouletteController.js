
//======================================================================================================================
var RouletteController = cc.IObject.extend({

    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "RouletteController";
    },

    //------------------------------------------------------------------------------------------------------------------
    getModel: function()
    {
        return RouletteModel.getInstance();
    },

    //------------------------------------------------------------------------------------------------------------------
    //返回转盘有效偏移量
    activateRoulette: function()
    {
        //
        this.getModel().beginRound();
        var offset = this.getModel().parsePointTo();

        cc.log("activateRoulette-----offset = " + offset + this.getModel());

        return offset;
    },

    //------------------------------------------------------------------------------------------------------------------
    //返回是否可继续进行下一局
    finishRoulette: function()
    {
        //TODO: 判断是否可进入下一局
        this.getModel().endRound();

        var handle = true;
        var diamond = cc.DataMng.getInstance().getMoney();

        //赌码的最小值
        if (diamond < 50)
        {
            handle = false;
        }

        if (handle)
        {
            this.getModel().nextRound();
        }

        cc.log("finishRoulette-----handle = " + handle + this.getModel());

        return handle;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});


RouletteController.create = function()
{
    return (new RouletteController()).init();
};