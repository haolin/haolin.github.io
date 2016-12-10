

var _DIRTY_COLORS_FOR_COLOR_BOSSES = [];

//======================================================================================================================
cc.BossMng = cc.A_RoundEndEvent.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        this.m_Bosses = [];
        this.m_BossPoints = cc.GameDataNumber.create(null, 0);
        this.m_IsRunning = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this._super();

        //
        this.m_Bosses.forEach(
            function(a_boss)
            {
                if (a_boss)
                {
                    a_boss.release();
                }
            }
        );

        this.m_Bosses.splice(0, this.m_Bosses.length);
        this.m_BossPoints.set(0);
        this.m_IsRunning = false;

        _DIRTY_COLORS_FOR_COLOR_BOSSES = [];

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "BossMng";
    },

    //------------------------------------------------------------------------------------------------------------------
    isRunning: function()
    {
        return this.m_IsRunning;
    },

    //--------------------------------------------------------------------------------------------------------------
    roundEnd: function(gameLevel)
    {
        if (this.isFinish() || !this.isRunning())
        {
            return false;
        }

        //
        cc.log("BossMng 逻辑行动!!!!!!!!!");

        //
        _DIRTY_COLORS_FOR_COLOR_BOSSES = [];
        this.m_Bosses.forEach(
            function(a_boss)
            {
                if (a_boss && a_boss instanceof cc.Obj_ColorBoss)
                {
                    _DIRTY_COLORS_FOR_COLOR_BOSSES.push(a_boss.getCurrentColor());
                }
            }
        );

        var res = false;
        this.m_Bosses.forEach(
            function(a_boss)
            {
                if (a_boss && a_boss.bossLogic(gameLevel))
                {
                    res = true;
                }
            }
        );

        return res;
    },

    //--------------------------------------------------------------------------------------------------------------
    isFinish: function()
    {
        return this.m_BossPoints.get() <= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(gamelevel)
    {
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        if (!curLevelData || (curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_BOSS && curLevelData.MODEL_MIX != Defines.TARGET_MODEL.MODEL_BOSS))
        {
            return this;
        }

        //
        this.cleanUp();

        //
        this.initAllBosses(gamelevel);

        //
        var bossPoints = curLevelData.BOSS_POINTS_SAVE ? curLevelData.BOSS_POINTS_SAVE.get() : 10;
        this.m_BossPoints.set(bossPoints);

        //
        this.m_IsRunning = true;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    initAllBosses: function(gamelevel)
    {
        var boss = {};

        var itr = gamelevel.getTable().createIterForTopObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var obj = itr.getCurrent();
            if (!obj || !(obj instanceof cc.Obj_Boss))
            {
                continue;
            }

            var bossName = obj.getName();
            if (!boss[bossName])
            {
                if (obj.getType() == "ColorBoss")
                {
                    boss[bossName] = cc.Obj_ColorBoss.create(bossName, obj.getType(), []);
                }
            }

            boss[bossName].addPart(obj);
        }

        for (var prop in boss)
        {
            if (!boss.hasOwnProperty(prop))
            {
                continue;
            }

            var build = boss[prop].build(gamelevel);
            if (build)
            {
                this.m_Bosses.push(boss[prop]);
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleVisitFinish: function(visitor)
    {
        var self = this;
        this.m_Bosses.forEach(
            function(a_boss)
            {
                a_boss.handleVisitFinish(visitor, self);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    desBossPoints: function(points)
    {
        this.m_BossPoints.sub(points);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getBossPoints: function()
    {
        return this.m_BossPoints.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    getAllBosses: function()
    {
        return this.m_Bosses;
    }
});

//======================================================================================================================
cc.BossMng._instance = null;
cc.BossMng.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.BossMng();
        cc.RoundEndEventsManager.getInstance().addChildEventMng(this._instance);
    }

    return this._instance;
};

