
cc.Touch_ByItemToMonsStorm = cc.Touch_ByItem.extend({

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "Touch_ByItemToMonsStorm";
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function (gameLevel)
    {
        this.endTransposition(gameLevel);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    swallowMoveTouch: function ()
    {
        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    endTransposition: function(gameLevel)
    {
        this.m_IsFinish = true;
        this.forcedInterrupt();

        if (cc.DataMng.getInstance().useItemById(Defines.GameItems.ITEM_STORM.ID))
        {
            gameLevel.addCommand(cc.Cmd_ShuffleEx.create(true));
        }
    }

    //------------------------------------------------------------------------------------------------------------------
});

//工厂方法
cc.Touch_ByItemToMonsStorm.create = function(srcPos)
{
    return new cc.Touch_ByItemToMonsStorm(srcPos);
};