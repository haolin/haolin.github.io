//======================================================================================================================
cc.PraiseMng = cc.A_RoundEndEvent.extend({

    //
    m_MonsterPos : [],

    //------------------------------------------------------------------------------------------------------------------
    priority: function()
    {
        return 1000000;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "PraiseMng";
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this.m_MonsterPos = [];
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parsePraiseLevel: function()
    {
        //
        var data = [
            [21, 30, 0],
            [31, 40, 1],
            [41, 50, 2],
            [51, 999999999, 3]
        ];

        //
        var count = this.m_MonsterPos.length;
        for (var indx = 0; indx < data.length; ++indx)
        {
            var da = data[indx];
            if (count >= da[0] && count <= da[1])
            {
                return da[2];
            }
        }

        return -1;
    },

    //------------------------------------------------------------------------------------------------------------------
    roundEnd: function()
    {
        var level = this.parsePraiseLevel();

        var result = (level >= 0);
        if (result)
        {
            var lastPosition = this.m_MonsterPos.pop();

            //
            cc.EffectMng.getInstance().displayPraise(level,
                lastPosition,
                Defines.FPS * 90,
                30);
        }

        this.m_MonsterPos = [];
        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    beginRound: function()
    {
        this.m_MonsterPos = [];
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleVisitFinish: function(visitor)
    {
        if (visitor.m_Elements.length <= 0)
        {
            return this;
        }

        //
        var filter = visitor.m_Elements.filter(
            function(element)
            {
                return element instanceof cc.Obj_Monster;
            }
        );

        //
        var self = this;
        filter.forEach(
            function(mons)
            {
                //cc.log("PraiseMng mons = " + mons);
                self.m_MonsterPos.push(mons.getPosition());
            }
        );

        return this;
    }
});

cc.PraiseMng._instance = null;
cc.PraiseMng.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.PraiseMng();
        this._instance.cleanUp();

        //
        cc.RoundEndEventsManager.getInstance().addChildEventMng(this._instance);
    }

    return this._instance;
};



