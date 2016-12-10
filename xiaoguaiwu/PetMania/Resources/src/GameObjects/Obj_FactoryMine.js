//======================================================================================================================
cc.Obj_FactoryMine = cc.EmptyObj.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(deep, height)
    {
        this._super();

        //
        this._mineDeep = deep;
        this._mineHeight = height;

        //
        this._gridsDeep = [];
        this._gridsHeight = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        var parent = this.getParentNode();
        if (parent)
        {
            return this.description() + "(" + parent.getGridPos().x + ", " + parent.getGridPos().y + ") deep = " + this.getMineDeep()
                + ", height = " + this.getMineHeight();
        }

        return this.description();
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_FactoryMine";
    },

    //------------------------------------------------------------------------------------------------------------------
    getMineDeep: function()
    {
        return this._mineDeep;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMineHeight: function()
    {
        return this._mineHeight;
    },

    //------------------------------------------------------------------------------------------------------------------
    getGridsDeep: function()
    {
        return this._gridsDeep;
    },

    //------------------------------------------------------------------------------------------------------------------
    getGridsHeight: function()
    {
        return this._gridsHeight;
    },

    //------------------------------------------------------------------------------------------------------------------
    /*_logMineGrids: function()
    {
        cc.log("-----------------------------------------");
        cc.log("_logMineGrids = " + this);

        cc.log("深度的格子--------------------------------");
        this.getGridsDeep().forEach(
            function(grid)
            {
                cc.log("grid = " + grid);
                grid.setRenderColor(cc.c3b(0, 100, 255));
            }
        );

        cc.log("高度的格子--------------------------------");
        this.getGridsHeight().forEach(
            function(grid)
            {
                cc.log("grid = " + grid);
                grid.setRenderColor(cc.c3b(255, 255, 0));
            }
        );

        return this;
    },*/

    //------------------------------------------------------------------------------------------------------------------
    parseMyGrids: function()
    {
        //
        var tmpDeep = this.getMineDeep();
        var tmpHeight = this.getMineHeight();

        //
        var grid = this.getParentNode().getGridByDirection(Defines.DIRECTION.TOP);
        for (;
             grid;
             grid = grid.getGridByDirection(Defines.DIRECTION.TOP)
            )
        {
            if (!(grid instanceof cc.NormalGrid))
            {
                //测试
                cc.Assert(0);
            }

            if (tmpDeep > 0)
            {
                --tmpDeep;
                this._gridsDeep.push(grid);
            }
            else if (tmpHeight > 0)
            {
                --tmpHeight;
                this._gridsHeight.push(grid);
            }
            else
            {
                //停止循环s
                break;
            }
        }

        if (this.getMineDeep() != this.getGridsDeep().length)
        {
            cc.Assert(0);
        }

        if (this.getMineHeight() != this.getGridsHeight().length)
        {
            cc.Assert(0);
        }

//        this.getGridsDeep().forEach(
//            function(grid)
//            {
//                grid.lockTouch();
//            }
//        );

        //this._logMineGrids();
		
		//修改底板颜色
//        var testRender = true;
//        if (testRender)
//        {
//            this.getGridsDeep().forEach(
//                function(grid)
//                {
//                    grid.setRenderColor(cc.c3b(0, 100, 255));
//                }
//            );
//
//            this.getGridsHeight().forEach(
//                function(grid)
//                {
//                    grid.setRenderColor(cc.c3b(255, 255, 0));
//                }
//            );
//        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMineObjectsInHeight: function()
    {
        var res = [];

        this.getGridsHeight().forEach(
            function(grid)
            {
                if (grid.getMiddleObject() && grid.getMiddleObject() instanceof cc.Obj_MonsterMine)
                {
                    res.push(grid.getMiddleObject());
                }
            }
        );

        return res;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseRiseStep: function()
    {
        var grids = [];
        grids = grids.concat(this.getGridsDeep()).concat(this.getGridsHeight());
        grids.reverse();

        //cc.log(this + " parseRiseStep = " + grids);

        var step = 0;
        for (var index = 0; index < grids.length; ++index)
        {
            var a_grid = grids[index];
            if (a_grid.isBlock())
            {
                step = 0;
                continue;
            }

            if (a_grid.getMiddleObject() && a_grid.getMiddleObject() instanceof cc.Obj_MonsterMine)
            {
                break;
            }

            ++step;
        }

		
        return step;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.Obj_FactoryMine.create = function(deep, height)
{
    if (deep < 0)
    {
        cc.log(0, "没有设置矿脉的深度!!!!");
    }

    if (height < 0)
    {
        cc.log(0, "没有设置矿脉的高度!!!!");
    }

    //
    var _mineDeep = deep || 1;
    var _mineheight = height || 1;
    return new cc.Obj_FactoryMine(_mineDeep, _mineheight);
};



