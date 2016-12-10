
cc.Touch_ByItemToMonsTime = cc.Touch_ByItem.extend({

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "Touch_ByItemToMonsTime";
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function (gameLevel)
    {
        var self = this;
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_TIME
            || curLevelData.MODEL_MIX == Defines.TARGET_MODEL.MODEL_TIME)
        {
            if (!cc.DataMng.getInstance().useItemById(Defines.GameItems.ITEM_TIME.ID))
            {
                this.endTransposition(gameLevel);
                return this;
            }

             var addTime = -1;
             var rand = Tools.rangeRandom(1,5);
             if (rand >= 1 && rand <2)
             {
                 cc.EffectMng.getInstance().displayClock5(
                     function ()
                     {
                         //cc.EffectMng.getInstance().displayNumber("+5",cc.p(130,520));
                         cc.EffectMng.getInstance().displayScore(
                             5,
                             cc.p(130,520),
                             Defines.COLOR.BLUE
                         );
                         cc.DataMng.getInstance().addGameLevelTimeForItemClock(5);
                         self.endTransposition(gameLevel);
                     }
                 );
             }
             else if (rand >= 2 && rand < 3)
             {
                 cc.EffectMng.getInstance().displayClock10(
                     function ()
                     {
                         //cc.EffectMng.getInstance().displayNumber("+10",cc.p(130,520));
                         cc.EffectMng.getInstance().displayScore(
                             10,
                             cc.p(130,520),
                             Defines.COLOR.GREEN
                         );
                         cc.DataMng.getInstance().addGameLevelTimeForItemClock(10);
                         self.endTransposition(gameLevel);
                     }
                 );
             }
             else if (rand >= 3 && rand < 4)
             {
                 cc.EffectMng.getInstance().displayClock20(
                     function ()
                     {
                         //cc.EffectMng.getInstance().displayNumber("+20",cc.p(130,520));
                         cc.EffectMng.getInstance().displayScore(
                             20,
                             cc.p(130,520),
                             Defines.COLOR.PINK
                         );
                         cc.DataMng.getInstance().addGameLevelTimeForItemClock(20);
                         self.endTransposition(gameLevel);
                     }
                 );
             }
             else
             {
                 cc.EffectMng.getInstance().displayClock30(
                     function ()
                     {
                         //cc.EffectMng.getInstance().displayNumber("+30",cc.p(130,520));
                         cc.EffectMng.getInstance().displayScore(
                             30,
                             cc.p(130,520),
                             Defines.COLOR.ORANGE
                         );
                         cc.DataMng.getInstance().addGameLevelTimeForItemClock(30);
                         self.endTransposition(gameLevel);
                     }
                 );
             }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    swallowMoveTouch: function ()
    {
        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    endTransposition: function(/*gameLevel*/)
    {
        this.m_IsFinish = true;
        this.forcedInterrupt();

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

//工厂方法
cc.Touch_ByItemToMonsTime.create = function()
{
    return new cc.Touch_ByItemToMonsTime();
};