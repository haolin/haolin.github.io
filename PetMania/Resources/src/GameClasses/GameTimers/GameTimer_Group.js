
//======================================================================================================================
var GameTimer_Group = GameTimer.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        this._timers = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "GameTimer_Group";
    },

    //------------------------------------------------------------------------------------------------------------------
    make: function(time, callBack, name)
    {
        return  {
            _time: time,
            _callBack: callBack,
            _name: name
        };
    },

    //------------------------------------------------------------------------------------------------------------------
    add: function(time, callBack, name)
    {
        this._timers.push(this.make(time, callBack, name));
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(a_timer)
    {
        if (a_timer._callBack)
        {
            a_timer._callBack();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    remove: function(name)
    {
        for (var indx = 0; indx < this._timers.length; ++indx)
        {
            if (this._timers[indx]._name == name)
            {
                this._timers.splice(indx, 1);
                return true;
            }
        }

        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    update: function(dt)
    {
//        this._super(dt);

        var self = this;
        this._timers.forEach(
            function(a_timer, index, array)
            {
                a_timer._time -= dt;
                if (a_timer._time <= 0)
                {
                    self.finish(a_timer);
                    array.splice(index, 1);
                }
            }
        );

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

GameTimer_Group.create = function()
{
    return new GameTimer_Group();
};


//======================================================================================================================
var GameTimer_AD = GameTimer.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        this._timers = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "GameTimer_Group";
    },

    //------------------------------------------------------------------------------------------------------------------
    make: function(time, callBack, name)
    {
        return  {
            _time: time,
            _callBack: callBack,
            _name: name
        };
    },

    //------------------------------------------------------------------------------------------------------------------
    add: function(time, callBack, name)
    {
        this._timers.push(this.make(time, callBack, name));
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(a_timer)
    {
        if (a_timer._callBack)
        {
            a_timer._callBack();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    remove: function(name)
    {
        for (var indx = 0; indx < this._timers.length; ++indx)
        {
            if (this._timers[indx]._name == name)
            {
                this._timers.splice(indx, 1);
                return true;
            }
        }

        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    update: function(dt)
    {
        this._super(dt);

        var self = this;
        this._timers.forEach(
            function(a_timer, index, array)
            {
                a_timer._time -= dt;
                if (a_timer._time <= 0)
                {
                    self.finish(a_timer);
                    array.splice(index, 1);
                }
            }
        );

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

GameTimer_AD.create = function()
{
    return new GameTimer_AD();
};


