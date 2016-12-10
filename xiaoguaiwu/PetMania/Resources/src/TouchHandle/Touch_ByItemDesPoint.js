
//单点击消除的道具
cc.Touch_ByItemDesPoint = cc.Touch_ByItem.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "Touch_ByItemDesPoint";
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function (gameLevel, beginPos)
    {
        var tapObj = this.getHandleObj(gameLevel, beginPos);
        if (tapObj)
        {
            //var visitor = cc.IVisitor.create();

            tapObj.destroy(null, gameLevel, null);

            //visitor.visitFinish();

            if (tapObj.getParentNode())
            {
                //高级糖果点燃
                var tapObjRule = tapObj.getDestroyRule();

                if (tapObjRule && tapObjRule.parse(gameLevel).can() )
                {
                    gameLevel.addCommand(tapObjRule.createCommand());
                }
            }

            //
            gameLevel.addCommand(cc.Cmd_EveryMoveNext.create());

            this.m_IsFinish = true;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    swallowMoveTouch: function ()
    {
        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    isDirectly: function()
    {
        return false;
    }

    //------------------------------------------------------------------------------------------------------------------
});


//工厂方法
cc.Touch_ByItemDesPoint.create = function()
{
    return new cc.Touch_ByItemDesPoint();
};