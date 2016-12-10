//事件基础 在一个输入局结束之后 触发
//封装这个主要是为了代码干净 没啥别的用处

//======================================================================================================================
cc.A_RoundEndEvent = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    priority: function()
    {
        return 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "A_RoundEndEvent";
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    roundEnd: function()
    {
        return false;
    }
});

//======================================================================================================================
cc.RoundEndEventsManager = cc.Class.extend({

    //
    m_ChildEventMngs: [],

    //------------------------------------------------------------------------------------------------------------------
    notifyAllChildrenCleanUpForGameLevelFinish: function()
    {
        this.m_ChildEventMngs.forEach(
            function(event)
            {
                event.cleanUp();
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyAllChildrenRoundEnd: function(gameLevel)
    {
        var result = false;

        this.m_ChildEventMngs.forEach(
            function(event)
            {
                if (event.roundEnd(gameLevel))
                {
                    result = true;
                }
            }
        );

        return result;
    },

    //------------------------------------------------------------------------------------------------------------------
    addChildEventMng: function(event)
    {
        if (!event || !(event instanceof cc.A_RoundEndEvent))
        {
            return this;
        }

        this.removeChildEventMng(event);

        //
        this.m_ChildEventMngs.push(event);
        this.m_ChildEventMngs.sort(
            function(event0, event1)
            {
                var priority0 = event0.priority();
                var priority1 = event1.priority();
                return priority0 > priority1 ? -1 : 1;
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    removeChildEventMng: function(event)
    {
        if (!event || !(event instanceof cc.A_RoundEndEvent))
        {
            return this;
        }

        //
        for (var indx = 0; indx < this.m_ChildEventMngs.length; ++indx)
        {
            if (this.m_ChildEventMngs[indx] == event)
            {
                this.m_ChildEventMngs.splice(indx, 1);
                break;
            }
        }

        return this;
    }
});

cc.RoundEndEventsManager._instance = null;
cc.RoundEndEventsManager.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.RoundEndEventsManager();
    }

    return this._instance;
};

