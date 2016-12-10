
//单点击变成多彩糖
cc.Touch_ByItemToMonsColorful = cc.Touch_ByItem.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "Touch_ByItemToMonsColorful";
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function (gameLevel, beginPos)
    {
        var tapObj = this.getHandleObj(gameLevel, beginPos);
        if (!tapObj)
        {
            return this;
        }

        if (tapObj.description() != "Obj_Monster")
        {
            return this;
        }

        cc.AudioMng.getInstance().playUseItemSound();

        var gridParent = tapObj.getParentNode();
        var createSuper = cc.Obj_MonsterColorful.create();

        gameLevel.disposal(tapObj);

        gridParent.addNode(createSuper);
        createSuper.updateNodePosition();
        createSuper.renderNode();

        this.m_IsFinish = true;

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
cc.Touch_ByItemToMonsColorful.create = function()
{
    return new cc.Touch_ByItemToMonsColorful();
};