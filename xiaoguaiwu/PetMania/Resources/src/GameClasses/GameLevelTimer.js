
//======================================================================================================================
var GameLevelTimer = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_SubTimer = [];

        //
        this.m_ModelTimer = new GameLevelModelTimer();
        this.m_BITimer = new GameLevelBITimer();

        this.m_SubTimer.push(this.m_ModelTimer);
        this.m_SubTimer.push(this.m_BITimer);
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        this.m_SubTimer.forEach(
            function(each)
            {
                each.release();
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    startTimer: function(gameLevelData)
    {
        this.m_SubTimer.forEach(
            function(each)
            {
                each.startTimer(gameLevelData);
            }
        );

        //
        this.m_Timer = 0;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isTimeOut: function()
    {
        return this.m_ModelTimer.isTimeOut();
    },

    //------------------------------------------------------------------------------------------------------------------
    resetTimeOut: function()
    {
        return this.m_ModelTimer.resetTimeOut();
    },

    //------------------------------------------------------------------------------------------------------------------
    updateTimer: function(state, time)
    {
        //
        if (state instanceof cc.State_GameLevel)
        {
            this.m_ModelTimer.updateTimer(time);
        }

        //
        if (state instanceof cc.State_GameLevel || state instanceof cc.State_GameItem)
        {
            this.m_BITimer.updateTimer(time);
        }

        return this;
    }
});

//======================================================================================================================
var GameLevelModelTimer = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_Timer = 0;
        this.m_IsEnable = false;
        this.m_IsTimeOut = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    startTimer: function(gameLevelData)
    {
        if (gameLevelData)
        {
            this.m_IsEnable = gameLevelData.MODEL == Defines.TARGET_MODEL.MODEL_TIME ||
                gameLevelData.MODEL_MIX == Defines.TARGET_MODEL.MODEL_TIME;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isTimeOut: function()
    {
        return this.m_IsEnable && this.m_IsTimeOut;
    },

    //------------------------------------------------------------------------------------------------------------------
    resetTimeOut: function()
    {
        this.m_IsTimeOut = false;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateTimer: function(time)
    {
        if (this.m_IsEnable && !this.m_IsTimeOut)
        {
            this.m_Timer += time;

            if (this.m_Timer >= 1)
            {
                this.m_Timer = 0;

                //
                if (cc.DataMng.getInstance().updateGameLevelTime(1))
                {
                    this.m_IsTimeOut = true;
                }
            }
        }

        return this;
    }
});

//======================================================================================================================
var GameLevelBITimer = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_Timer = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    startTimer: function(/*gameLevelData*/)
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateTimer: function(time)
    {
        this.m_Timer += time;

        if (this.m_Timer >= 1)
        {
            this.m_Timer = 0;

            //
            cc.DataMng.getInstance().updateGameLevelBITime(1);
        }

        return this;
    }
});