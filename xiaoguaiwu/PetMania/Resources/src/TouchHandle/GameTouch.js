//触摸移动事件 交换2个 对象
/*

//======================================================================================================================
cc.GameTouch = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(beginPos, endPos)
    {
        this.beginPos = beginPos;
        this.endPos = endPos;
    },

    //------------------------------------------------------------------------------------------------------------------
    //根据x, y偏移量分析方向
    */
/*_parseDirection: function(beginPos, endPos)
    {
        if (!cc.pToAngle)
        {
            cc.pToAngle = function (v) {
                return Math.atan2(v.y, v.x);
            };
        }

        //
        var angle = cc.pToAngle(cc.pSub(endPos, beginPos));
        angle = angle/Math.PI * 180;

        //
        var crossDirection = Defines.DIRECTION.LEFT;

        //
        if (angle >= 0 && angle < 45 || angle <= 0 && angle > -45)
        {
            crossDirection  = Defines.DIRECTION.RIGHT;
        }
        else if (angle >= 45 && angle <= 135)
        {
            crossDirection  = Defines.DIRECTION.TOP;
        }
        else if (angle <= -45 && angle >= -135)
        {
            crossDirection  = Defines.DIRECTION.BOTTOM;
        }

        return crossDirection;
    },*//*


    //------------------------------------------------------------------------------------------------------------------
    //处理
    handle: function(gameLevel)
    {
        //发起的格子
        var srcGrid = gameLevel.getTable().getGridByPos(this.beginPos);
        if (!srcGrid)
        {
            return this;
        }

        //方向
        //根据方向找目标格子
        var srcToDirection = _ParseCrossDirection(this.beginPos, this.endPos);//this._parseDirection(this.beginPos, this.endPos);
        var dstGrid = srcGrid.getGridByDirection(srcToDirection);
        if (!dstGrid)
        {
            return this;
        }

        //原来格子 可以移动的obj
        var srcMoveObj = srcGrid.getTouchEnabledObject ? srcGrid.getTouchEnabledObject() : null;
        if (!srcMoveObj)
        {
            return this;
        }

        //目标格子可以移动的obj
        var dstMoveObj = dstGrid.getTouchEnabledObject ? dstGrid.getTouchEnabledObject() : null;
        if (!dstMoveObj)
        {
            return this;
        }

        var dstToDirection = srcToDirection.getNegative();//Defines.DIRECTION.getNegativeDirection(srcToDirection);

        var cmd = cc.Cmd_TouchSwapObj.create(srcMoveObj,
            dstMoveObj,
            srcToDirection,
            dstToDirection);

        if (cmd)
        {
            gameLevel.addCommand(cmd.start(gameLevel));
        }

        return this;
    }
});

//工厂方法
cc.GameTouch.create = function(beginPos, endPos)
{
    return new cc.GameTouch(beginPos, endPos);
};
*/
