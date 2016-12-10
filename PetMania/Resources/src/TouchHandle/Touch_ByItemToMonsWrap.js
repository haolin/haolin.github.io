
//单点击变成爆炸糖
cc.Touch_ByItemToMonsWrap = cc.Touch_ByItem.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "Touch_ByItemToMonsWrap";
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function (gameLevel, beginPos)
    {
        var tapObj = this.getHandleObj(gameLevel, beginPos);
        if (!tapObj)
        {
            return this;
        }

        var bubbleDebug = false;
        if (!bubbleDebug)
        {
            if (tapObj.description() == "Obj_Monster")
            {
                cc.AudioMng.getInstance().playUseItemSound();

                var gridParent = tapObj.getParentNode();
                var createSuper = tapObj.createMonsterWrap();
                gameLevel.disposal(tapObj);

                gridParent.addNode(createSuper);
                createSuper.updateNodePosition();
                createSuper.renderNode();

                this.m_IsFinish = true;
            }
        }
        else
        {
            if (tapObj instanceof cc.Obj_Monster)
            {
                var gridParent1 = tapObj.getParentNode();
                gameLevel.disposal(tapObj);
                var newFlower = cc.Obj_Flower.create(FLOWER_LEVEL_DEFINE.SEED);
                if (newFlower)
                {
                    gridParent1.addNode(newFlower);
                    newFlower.updateNodePosition();
                    newFlower.renderNode();
                }

                this.m_IsFinish = true;
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    swallowMoveTouch: function ()
    {
        return true;
    },

    isDirectly: function()
    {
        //子类实现
        return false;
    }

    //------------------------------------------------------------------------------------------------------------------
});

//工厂方法
cc.Touch_ByItemToMonsWrap.create = function()
{
    return new cc.Touch_ByItemToMonsWrap();
};
