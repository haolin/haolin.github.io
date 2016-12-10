
//======================================================================================================================
var ItemHeart = cc.IObject.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //
        this._hearts = null;
        this._heartsRecoverAdd = null;
        this._heartsMax = null;
        this._addHeartTime = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "ItemHeart";
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        //
        this._hearts = cc.GameDataNumber.create("m_Hearts", Defines._GetMaxHearts(), _DB_OP_GAME, Defines.MAX_HEART_COUNT);
        this._heartsRecoverAdd = cc.GameDataNumber.create("m_HeartRecoverAdd", 0, _DB_OP_GAME, Defines.MAX_HEART_COUNT);
        this._heartsMax = cc.GameDataNumber.create("m_HeartRecoverMax", 0, _DB_OP_GAME, Defines.MAX_HEART_COUNT);
        this._addHeartTime = cc.GameDataTime.create("m_AddHeartTime", 0, _DB_OP_GAME);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    load: function()
    {
        this._hearts.load();
        this._heartsRecoverAdd.load();
        this._heartsMax.load();
        this._addHeartTime.load();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "" + this.getCurrentValue() + "/" + this.getMaxValue()
            + ", add = " + this.getRecoverAddValue()
            + ", time = " + this.getAddTime()
            + ", defineMax = " + Defines._GetMaxHearts();

    },

    //------------------------------------------------------------------------------------------------------------------
    getCurrentValue: function()
    {
        return this._hearts.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    getRecoverAddValue: function()
    {
        return this._heartsRecoverAdd.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    getMaxValue: function()
    {
        return this._heartsMax.get() + Defines._GetMaxHearts();
    },

    //------------------------------------------------------------------------------------------------------------------
    getAddTime: function()
    {
        return this._addHeartTime.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    isFull: function()
    {
        return this.getCurrentValue() >= this.getMaxValue();
    },

    //------------------------------------------------------------------------------------------------------------------
    updateHeartByTime: function()
    {
        //
        if (this.isFull())
        {
            this._addHeartTime.set(0);
            this._addHeartTime.save();
            return this;
        }

        //
        var nowTime = _LocalTime()/1000;
        var responseTime = Defines.RESPONSE_TIME;

        var curAddHeartTime = this._addHeartTime.get();
        if (curAddHeartTime <= 0)
        {
            var nextAddHeartTime = nowTime + responseTime;
            this._addHeartTime.set(nextAddHeartTime);
            this._addHeartTime.save();
        }
        else
        {
            var passTime = nowTime - curAddHeartTime;
            if (passTime >= 0)
            {
                //
                var addCount = parseInt(passTime/responseTime);
                ++addCount;

                //需要控制最大值
                this.addCurrentHeartByTime(addCount);

                //
                if (!this.isFull())
                {
                    var leftTime = passTime%responseTime;
                    var nextTime = responseTime - leftTime;
                    if (nextTime < 0)
                    {
                        nextTime = 0;
                    }

                    this._addHeartTime.set(nowTime + nextTime);
                    this._addHeartTime.save();
                }
                else
                {
                    this._addHeartTime.set(0);
                    this._addHeartTime.save();
                }
            }
            else
            {
                cc.log("时间没到");
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addCurrentHeart: function(addValue)
    {
        this._hearts.add(addValue);
        this._hearts.save();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addCurrentHeartByTime: function(addValue)
    {
        //需要控制最大值
        var value = this._hearts.get() + addValue;
        var max = this.getMaxValue();
        if (value > max)
        {
            value = max;
        }

        //
        this._hearts.set(value);
        this._hearts.save();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    subCurrentHeart: function(subValue)
    {
        this._hearts.sub(subValue);
        this._hearts.save();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addMaxHeart: function(addValue)
    {
        this._heartsMax.add(addValue);
        this._heartsMax.save();

        this._heartsRecoverAdd.add(addValue);
        this._heartsRecoverAdd.save();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setMaxHeart: function(setValue)
    {
        //
        this._heartsMax.set(setValue);
        this._heartsMax.save();

        //
        this._heartsRecoverAdd.add(0);
        this._heartsRecoverAdd.save();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    restore: function()
    {
        cc.log("薄荷糖重置____________________________________________________________");

        this._hearts.set(Defines._GetMaxHearts());
        this._hearts.save();

        this._heartsRecoverAdd.set(0);
        this._heartsRecoverAdd.save();

        this._heartsMax.set(0);
        this._heartsMax.save();

        this._addHeartTime.set(0);
        this._addHeartTime.save();

        //
        return this;
    }
});

//
ItemHeart.create = function()
{
    return (new ItemHeart()).init();
};


