
//使用道具时的触摸事件
cc.Touch_ByItem = cc.Class.extend({
	
	//------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this.m_IsFinish = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "Touch_ByItem";
    },

    //------------------------------------------------------------------------------------------------------------------
    getHandleObj: function (gameLevel, beginPos)
    {
        var tapGrid = gameLevel.getTable().getGridByPos(beginPos);
        if (!tapGrid)
        {
            return null;
        }

        var tapObj = tapGrid.getTouchEnabledObject ? tapGrid.getTouchEnabledObject() : null;
        if (!tapObj)
        {
            return null;
        }

        return tapObj;
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function (/*gameLevel, beginPos, endPos*/)
    {
        //子类实现
        this.m_IsFinish = true;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleFinish: function ()
    {
        //子类实现
        return this;
    },

    //是否直接触发
    isDirectly: function()
    {
        //子类实现
        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    //只使用单点事件
    swallowMoveTouch: function ()
    {
        //子类实现
        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    //道具结束
    isFinish: function ()
    {
        return this.m_IsFinish;
    },

    //--------------------------------------------------------------------------------------------------------------
    useAgain: function()
    {
        return this;
    },

    //--------------------------------------------------------------------------------------------------------------
    update: function()
    {
        return this;
    }
});

//工厂方法
cc.Touch_ByItem.create = function()
{
    return new cc.Touch_ByItem();
};