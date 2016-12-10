//迭代器

//======================================================================================================================
var IEvent = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(holder)
    {
        this.m_Holder = holder;
        this.m_Events = {};
    },

    //------------------------------------------------------------------------------------------------------------------
    getHolder: function()
    {
        return this.m_Holder;
    },

    //------------------------------------------------------------------------------------------------------------------
    registerEvent: function(eventName, _eventFunction, _eventTarget)
    {
        //
        this.m_Events[eventName] = this.m_Events[eventName] || [];
        this.m_Events[eventName].push(
            {
                eventFunction: _eventFunction,
                eventTarget: _eventTarget
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    fireEvent: function(eventName, params)
    {
        //
        var self = this;

        //
        this.m_Events[eventName] = this.m_Events[eventName] || [];
        this.m_Events[eventName].forEach(
            function(a_event)
            {
                if (!a_event.eventFunction)
                {
                    return;
                }

                if (a_event.eventTarget)
                {
                    a_event.eventFunction.call(a_event.eventTarget, self.getHolder(), params);
                }
                else
                {
                    a_event.eventFunction(self.getHolder(), params);
                }
            }
        );

        return this;
    }

});

IEvent.create = function(holder)
{
    return new IEvent(holder);
};