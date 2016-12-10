

//======================================================================================================================
cc.DestroyRule_Flower = cc.IDestroyRule.extend({

    //-----------------------------------------------------------------------------------------------------------
    ctor: function(src)
    {
        this._super(src);

        //4方向队列
        this.m_Left = [];
        this.m_Right = [];
        this.m_Top = [];
        this.m_Bottom = [];

        //
        this.m_SwapDirection = null;
        this.m_IsCreatorRule = true;

        //
        this.m_Horiz = false;
        this.m_Vertic = false;
        this.m_Cross = false;
    },

    //--------------------------------------------------------------------------------------------------------------
    getSwapDirection: function()
    {
        return this.m_SwapDirection;
    },

    //--------------------------------------------------------------------------------------------------------------
    parseImplBase: function(grid, swapOther, swapDir/*, gameLevel*/)
    {
        //方向记录
        this.m_SwapDirection = swapDir;

        //4个方向上的结果
        if (grid)
        {
            this.m_Left = this.parseGridsOfDirection(grid, Defines.DIRECTION.LEFT);
            this.m_Right = this.parseGridsOfDirection(grid, Defines.DIRECTION.RIGHT);
            this.m_Top = this.parseGridsOfDirection(grid, Defines.DIRECTION.TOP);
            this.m_Bottom = this.parseGridsOfDirection(grid, Defines.DIRECTION.BOTTOM);
        }

        //如果左->右可以消除?
        if (this.m_Left.length + this.m_Right.length + 1 >= 3)
        {
            this.m_Objects = this.m_Objects.concat(this.m_Left);
            this.m_Objects = this.m_Objects.concat(this.m_Right);
            this.m_Horiz = true;
        }

        //如果上->下可以消除?
        if ( this.m_Top.length + this.m_Bottom.length + 1 >= 3)
        {
            this.m_Objects = this.m_Objects.concat(this.m_Top);
            this.m_Objects = this.m_Objects.concat(this.m_Bottom);
            this.m_Vertic = true;
        }

        //是十字相交的
        this.m_Cross = this.m_Horiz && this.m_Vertic;

        return this;
    },

    //--------------------------------------------------------------------------------------------------------------
    parseImpl: function(grid, swapOther, swapDir, gameLevel)
    {
        this.parseImplBase(grid, swapOther, swapDir, gameLevel);
        return this;
    },

    //--------------------------------------------------------------------------------------------------------------
    //分析direction这个方向上所有格子 内 是否有可消除的对象
    parseGridsOfDirection: function(grid, direction)
    {
        //雾霾格子不可消除
        if (grid.getCeilObject() && grid.getCeilObject() instanceof cc.Obj_Haze)
        {
            return [];
        }

        //最终结果
        var finalResult = [];
        var srcFlowerLevel =  this.getSrcObj().getFlowerLevel();

        //在目标方向上 寻找每个块
        for (var next = grid.getGridByDirection(direction);
             next;
             next = next.getGridByDirection(direction))
        {
            if (!(next instanceof cc.NormalGrid))
            {
                //只检查普通格子 遇到空格子 就跳出
                break;
            }

            //雾霾格子不可消除
            if (next.getCeilObject() && next.getCeilObject() instanceof cc.Obj_Haze)
            {
                break;
            }

            var movable = next.getMiddleObject();
            if (!movable || movable == this.getSrcObj())
            {
                break;
            }

            if (!(movable instanceof cc.Obj_Flower) || movable.getFlowerLevel() != srcFlowerLevel)
            {
                break;
            }

            finalResult.push(movable);
        }

        //这个方向上所有格子 checkObj可以摧毁的 OBJ
        return finalResult;
    },

    //--------------------------------------------------------------------------------------------------------------
    createCommand: function()
    {
        return cc.Cmd_CreateFlower.create(this.getSrcObj(), this.getObjects(), this.getSwapDirection(), this.m_Cross);
    },

    //--------------------------------------------------------------------------------------------------------------
    can: function()
    {
        return this.m_Objects.length >= 2;
    },

    //------------------------------------------------------------------------------------------------------------------
    suppose: function()
    {
        var resGroups = [];

        var allDirections = Defines.DIRECTION.CROSS.concat();
        var srcObj = this.getSrcObj();
        var grid = srcObj.getParentNode();
        var self = this;

        allDirections.forEach(
            function(dir)
            {
                var gridOfDir = grid.getGridByDirection(dir);
                if (!gridOfDir || !(gridOfDir instanceof cc.NormalGrid))
                {
                    return;
                }

                var hisObj = gridOfDir.getTouchEnabledObject();
                if (!hisObj)
                {
                    return;
                }

                if (!self.parseImpl(gridOfDir, null, Defines.DIRECTION.NULL, null).can())
                {
                    return;
                }

                resGroups.push(self.m_Objects.concat());
            }
        );

        return resGroups;
    }
});

//工厂方法
cc.DestroyRule_Flower.create = function(objFlower)
{
    if (!(objFlower instanceof cc.Obj_Flower))
    {
        cc.Assert(0, "if (!(objFlower instanceof cc.Obj_Flower))");
        return null;
    }

    return new cc.DestroyRule_Flower(objFlower);
};





