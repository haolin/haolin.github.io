

//======================================================================================================================
cc.BombsMng = cc.A_RoundEndEvent.extend({

    m_MinBombs: 0,
    m_MaxBombs: 0,

    //--------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this._super();

        //
        this.m_MinBombs = 0;
        this.m_MaxBombs = 0;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "BombsMng";
    },

    //--------------------------------------------------------------------------------------------------------------
    roundEnd: function(gameLevel)
    {
        this._super(gameLevel);

        var allBombs = this.getBombs(gameLevel);

        var handleTick = this.bombsTick(gameLevel, allBombs);

        if (this.m_MinBombs > 0)
        {
            this.createBombsToFacotry(gameLevel, allBombs);
        }

        return handleTick;
    },

    //--------------------------------------------------------------------------------------------------------------
    bombsTick: function(gameLevel, allBombs)
    {
        //
        var handle = false;
        var timeoutArray = [];

        //
        allBombs.forEach(
            function(a_bomb)
            {
                var isTimeout = a_bomb.tick(gameLevel);
                if (isTimeout)
                {
                    timeoutArray.push(a_bomb);
                }
            }
        );

        //
        timeoutArray.forEach(
            function(a_bomb)
            {
                var cmd = cc.Cmd_DesMonsBomb.create(a_bomb);
                if (cmd)
                {
                    gameLevel.addCommand(cmd);
                    handle = true;
                }
            }
        );

        return handle;
    },

    //--------------------------------------------------------------------------------------------------------------
    createBombsToFacotry: function(gameLevel, allBombs)
    {
        var len = this.m_MinBombs - allBombs.length;
        if (len < 0)
        {
            len = 0;
        }
        else if (len > this.m_MaxBombs)
        {
            len = this.m_MaxBombs;
        }

        //
        this.m_MaxBombs -= len;
        if (this.m_MaxBombs < 0)
        {
            this.m_MaxBombs = 0;
        }

        //
        var minRandTime = 6;
        var maxRandTime = 9;


        var configColors = _GetFactoryColorsConfig();
        var managerPool = _GetFactoryMngPool();
		
        //
        /*for (var indx = 0; indx < len; ++indx)
        {
            //
            var randColor = Tools.arrayRandom(configColors);
            var randBombTime = Tools.rangeRandom(minRandTime, maxRandTime, true);
			var bombArr = {};

			for (var i = 0 ; i < configColors.length ; i ++ )
			{
				var newBomb = cc.Obj_Bomb.create(configColors[i], randBombTime);
				if (newBomb)
				{
					newBomb.getRender().cleanUpDecorations();
					bombArr[configColors[i]] = newBomb;
				}
			}
            //
			pool.push(bombArr);
        }*/

        //
        for (var indx = 0; indx < len; ++indx)
        {
            var randBombTime = Tools.rangeRandom(minRandTime, maxRandTime, true);
			var bombArr = {};
            configColors.forEach(
                function(a_color)
                {
                    var newBomb = cc.Obj_Bomb.create(a_color, randBombTime);
                    if (newBomb)
                    {
                        newBomb.getRender().cleanUpDecorations();
                        bombArr[a_color] = newBomb;
                    }
                }
            );
			managerPool.addObject(bombArr);
        }

		
        return this;
    },

    //--------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this.cleanUp();

        //
        var gameLevelData = cc.DataMng.getInstance().getCurLevelData();
        if (gameLevelData)
        {
            this.m_MinBombs = gameLevelData.MIN_BOMBS ? gameLevelData.MIN_BOMBS : 0;
            this.m_MaxBombs = gameLevelData.MAX_BOMBS ? gameLevelData.MAX_BOMBS : 0;
        }

        return this;
    },

    //--------------------------------------------------------------------------------------------------------------
    getBombs: function(gameLevel)
    {
        var allBombs = [];

        var itr = gameLevel.getTable().createIterForMiddleObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var obj = itr.getCurrent();
            if (!obj)
            {
                continue;
            }

            if (obj instanceof cc.Obj_Bomb)
            {
                allBombs.push(obj);
            }
			
			/*if (obj instanceof cc.Obj_BombTip)
            {
                allBombs.push(obj);
            }*/
        }

        return allBombs;
    }
});

cc.BombsMng._instance = null;
cc.BombsMng.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.BombsMng();
        cc.RoundEndEventsManager.getInstance().addChildEventMng(this._instance);
    }

    return this._instance;
};



