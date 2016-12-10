//内测版用的东西

//
var DeadTime = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(year, month, day)
    {
        //因为month : 0 ~ 11
        this._date = new Date(year, (month - 1), day);
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function()
    {
        //
        var dateNow = _LocalTime();
        var deadTime = this._date.getTime();
        var sec = deadTime - dateNow;

        cc.log("这个版本终止的时间 = " + this._date.toLocaleString());

        if (sec > 0)
        {
            cc.log("剩余时间为 = " + (Tools.convertSecondTimeEx(sec/1000, true, true, true)));
            return false;
        }

        cc.log("当前本机时间 = " + (new Date(dateNow)).toLocaleString() + ", 时间到了");
        return true;
    }

});

//
DeadTime.create = function()
{
    //return null;
    return new DeadTime(2013, 11, 1);
};