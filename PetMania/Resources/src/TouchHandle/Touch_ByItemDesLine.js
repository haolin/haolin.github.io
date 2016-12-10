
//滑动消除单行的道具
cc.Touch_ByItemDesLine = cc.Touch_ByItem.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        //存储要消除的物体
        this.m_DesObjs = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "Touch_ByItemDesLine";
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function (gameLevel, beginPos, endPos)
    {
        var tapObj = this.getHandleObj(gameLevel, endPos);

        if (!tapObj)
        {
            return this;
        }

        //标记脏位
        if (!tapObj.m_DirtyDes)
        {
            tapObj.m_DirtyDes = true;

            this.m_DesObjs.push(tapObj);

            cc.log(tapObj);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleFinish: function (gameLevel)
    {
        if (this.m_DesObjs.length <= 0)
        {
            return this;
        }

        //var visitor = cc.IVisitor.create();

        this.m_IsFinish = true;

        this.m_DesObjs.forEach(

            function (each)
            {
                //清除脏位
                delete each.m_DirtyDes;

                each.destroy(null, gameLevel, null);

                //visitor.visitFinish();

                if (each.getParentNode())
                {
                    //高级糖果点燃
                    var tapObjRule = each.getDestroyRule();

                    if (tapObjRule && tapObjRule.parse(gameLevel).can())
                    {
                        gameLevel.addCommand(tapObjRule.createCommand());
                    }
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    swallowMoveTouch: function ()
    {
        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    isDirectly: function()
    {
        return false;
    }

    //------------------------------------------------------------------------------------------------------------------
});

//工厂方法
cc.Touch_ByItemDesLine.create = function()
{
    return new cc.Touch_ByItemDesLine();
};