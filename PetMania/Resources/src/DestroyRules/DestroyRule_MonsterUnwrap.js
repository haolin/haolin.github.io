//5消 爆炸糖 

//======================================================================================================================
cc.DestroyRule_MonsterUnwrap = cc.IDestroyRule.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(src)
    {
        this._super(src);
    },

    //------------------------------------------------------------------------------------------------------------------
    isSpecHeighRule: function()
    {
        return true;
    },

    //--------------------------------------------------------------------------------------------------------------
    can: function()
    {
        return this.getSrcObj().isFire();
    },

    //--------------------------------------------------------------------------------------------------------------
    //添加 多余的销毁目标
    //分析的核心执行
    parseImpl: function(/*grid, swapOther, swapDir, gameLevel*/)
    {
        return this;
    },

    //--------------------------------------------------------------------------------------------------------------
    createCommand: function()
    {
        return cc.Cmd_DesByWrap.create(this.getSrcObj());
    }

});

//工厂方法
cc.DestroyRule_MonsterUnwrap.create = function(srcObject)
{
    return new cc.DestroyRule_MonsterUnwrap(srcObject);
};













