
//======================================================================================================================
var Action_Ellipse = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_Duration = 0;

        //椭圆的长半轴和短半轴
        this.m_AxisLengthA = 0;
        this.m_AxisLengthB = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(duration, axisLengthA, axisLengthB)
    {
        this.m_Duration = duration;
        this.m_AxisLengthA = axisLengthA;
        this.m_AxisLengthB = axisLengthB;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //根据角度计算x坐标
    _getPosXWithDelta: function(time)
    {
        return -1 * this.m_AxisLengthA * Math.cos(2 * 3.1415926 * time) + this.m_AxisLengthA;
    },

    //------------------------------------------------------------------------------------------------------------------
    //根据角度计算y坐标
    _getPosYWithDelta: function(time)
    {
        return this.m_AxisLengthB * Math.sin(2 * 3.1415926 * time);
    },

    //------------------------------------------------------------------------------------------------------------------
    runWithTarget: function(target)
    {
        //
        var time = 0;
        var self = this;
        var startPos = target.getPosition();

        //
        target.schedule(
            function(delta)
            {
                //
                time += delta;
                time = time > self.m_Duration ? 0 : time;

                //
                var dX = self._getPosXWithDelta(time/self.m_Duration);
                var dY = self._getPosYWithDelta(time/self.m_Duration);

                target.setPosition(cc.pAdd(startPos, cc.p(dX - self.m_AxisLengthA, dY)));
            }
        );
    }

    //------------------------------------------------------------------------------------------------------------------
});

Action_Ellipse.create = function(duration, axisLengthA, axisLengthB)
{
    var ellipseTo = new Action_Ellipse();
    ellipseTo.init(duration, axisLengthA, axisLengthB);
    return ellipseTo;
};