
/*
限定倒数时间内得分超过最低标准，可通过消除+5秒怪物延长倒数时间，倒数时间结束时关卡终止。
当一步消除超过8只怪物（含连锁）时，下落的怪物中会包含1只+5秒怪物。16只怪物出现2只加时怪物。
同理类推一步消除超过8n只时出现n只加时怪物，n的上限为5，超过5皆按5计算。
*/

var _ADD_TIME_BASE_COUNT = 18;

//======================================================================================================================
cc.MonsterAddTimeMng = cc.A_RoundEndEvent.extend({

    m_Count: 0,

    //--------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this._super();
        this.m_Count = 0;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "MonsterAddTimeMng";
    },

    //--------------------------------------------------------------------------------------------------------------
    roundEnd: function(gameLevel)
    {
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        if (!curLevelData
            || (curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_TIME
            && curLevelData.MODEL_MIX != Defines.TARGET_MODEL.MODEL_TIME))
        {
            return this;
        }

        //
        this._super(gameLevel);

        //
        var old = this.m_Count;
        this.m_Count = 0;

        if (old > 0)
        {
            var count = parseInt(old/_ADD_TIME_BASE_COUNT);
            if (count > 0)
            {
                this.createMonsterAddTimeToFacotry(gameLevel, count);
            }
        }

        return false;
    },

    //--------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this.cleanUp();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleVisitFinish: function(visitor)
    {
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        if (!curLevelData || !curLevelData.TIME)
        {
            return this;
        }

        if (visitor)
        {
            //cc.log("---->" + visitor.m_Elements.length);
            this.m_Count += visitor.m_Elements.length;
        }

        return this;
    },

    //--------------------------------------------------------------------------------------------------------------
    createMonsterAddTimeToFacotry: function(gameLevel, count)
    {
        if (!gameLevel || count <= 0)
        {
            return this;
        }

        //
        var configColors = _GetFactoryColorsConfig();
        var managerPool = _GetFactoryMngPool();
        //
		
        /*for (var indx = 0; indx < count; ++indx)
        {
			var colorRad = Tools.arrayRandom(configColors);
			
			var addTimeArr = {};
			
			for (var i = 0 ; i < configColors.length ; i ++ )
			{
				var newaddTime = cc.Obj_MonsterAddTime.create(configColors[i]);
				if (newaddTime)
				{
					addTimeArr[configColors[i]] = newaddTime;
				}
			}
            pool.push(addTimeArr);
        }*/

        for (var indx = 0; indx < count; ++indx)
        {
			var addTimeArr = {};
            configColors.forEach(
                function(a_color)
                {
                    var newaddTime = cc.Obj_MonsterAddTime.create(a_color);
                    if (newaddTime)
                    {
						addTimeArr[a_color] = newaddTime;
                    }
                }
            );
			managerPool.addObject(addTimeArr);
        }

        return this;
    }
});

cc.MonsterAddTimeMng._instance = null;
cc.MonsterAddTimeMng.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.MonsterAddTimeMng();
        this._instance.cleanUp();

        //
        cc.RoundEndEventsManager.getInstance().addChildEventMng(this._instance);
    }

    return this._instance;
};


