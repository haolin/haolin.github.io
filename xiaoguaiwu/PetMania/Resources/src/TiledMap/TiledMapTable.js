//游戏桌面

//======================================================================================================================
cc.TiledMapTable = cc.ITable.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(width, height)
    {
        this._super(width, height);

        //
        this.m_NormalGrids = [];
        this.m_EmptyGrids = [];
        this.m_PipeGrids = [];

        //
        this.m_MyPathsData = null;

        //
        this.m_SortGrids = [];

        //
        this.m_PipePathsData = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    //测试渲染的区域
    _renderNodeTest: function()
    {
        //
        var black = cc.LayerColor.create(cc.c4b(128, 128, 128, 128));
        gameTableLayer().addChild(black, -1000);

        //
        var _width = Defines.TABLE_GRID_SIZE * this.getTabWidth();
        var _height = Defines.TABLE_GRID_SIZE * this.getTabHeight();

        //
        black.setContentSize(cc.size(_width, _height));
        black.setPosition(cc.p(this.getPosition().x - Defines.TABLE_GRID_SIZE/2,
            this.getPosition().y - _height + Defines.TABLE_GRID_SIZE/2));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //添加渲染
    renderNode: function()
    {
        this._super();
        //this._renderNodeTest();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "TiledMapTable";
    },

    //------------------------------------------------------------------------------------------------------------------
    buildFinish: function(pathsData)
    {
        if (!pathsData || !(pathsData instanceof TiledMapPaths))
        {
            return this;
        }

        var self = this;

        this.m_MyPathsData = pathsData;

        //
        this.m_SortGrids = this.getNormalGrids().concat();
        this.m_SortGrids.sort(
            function(grid0, grid1)
            {
                //
                var gridPos0 = grid0.getGridPos();
                var gridPos1 = grid1.getGridPos();

                //
                if (gridPos0.y == gridPos1.y)
                {
                    //越接近中间的 越大 因为是9x9 所以中间位置 定为5   Math.round(number)

                    var center = Math.round(self.getTabWidth()/2);
                    if (center != 5)
                    {
                        cc.Assert(0);
                    }

                    return Math.abs(center - gridPos0.x) < Math.abs(center - gridPos1.x) ? -1 : 1;
                }

                return gridPos0.y > gridPos1.y ? -1 : 1;
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getPaths: function()
    {
        return this.m_MyPathsData ? this.m_MyPathsData.get() : [];
    },

    //------------------------------------------------------------------------------------------------------------------
    getSortGrids: function()
    {
        return this.m_SortGrids;
    },

    //------------------------------------------------------------------------------------------------------------------
    getNormalGrids: function()
    {
        return this.m_NormalGrids;
    },

    //------------------------------------------------------------------------------------------------------------------
    getEmptyGrids: function()
    {
        return this.m_EmptyGrids;
    },

    //------------------------------------------------------------------------------------------------------------------
    setGrid: function(x, y, grid)
    {
        this._super(x, y, grid);

        var setOk = this.getGrid(x, y);
        if (setOk)
        {
            //记录下
            if (grid instanceof cc.NormalGrid)
            {
                this.m_NormalGrids.push(grid);

                if (grid instanceof cc.PipelineGrid)
                {
                    this.m_PipeGrids.push(grid);
                }
            }
            else if (grid instanceof cc.EmptyGrid)
            {
                this.m_EmptyGrids.push(grid);
            }
        }
        else
        {
            cc.log("TiledMapTable x = " + x);
            cc.log("TiledMapTable y = " + y);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createIterForMiddleObjects: function()
    {
        var iter = new TableIterator(this.getNormalGrids());
        iter.getCurrent = function()
        {
            var grid = iter.m_Grids[iter.m_Index];
            if (grid)
            {
                return grid.getMiddleObject();
            }

            return null;
        };

        return iter;
    },

    //------------------------------------------------------------------------------------------------------------------
    createIterForTouchEnabledObjects: function()
    {
        var iter = new TableIterator(this.getNormalGrids());
        iter.getCurrent = function()
        {
            var grid = iter.m_Grids[iter.m_Index];
            if (grid)
            {
                return grid.getTouchEnabledObject();
            }

            return null;
        };

        return iter;
    },

    //------------------------------------------------------------------------------------------------------------------
    createIterForTopObjects: function()
    {
        var iter = new TableIterator(this.getNormalGrids());
        iter.getCurrent = function()
        {
            var grid = iter.m_Grids[iter.m_Index];
            if (grid)
            {
                return grid.getTopObject();
            }

            return null;
        };

        return iter;
    },

    //------------------------------------------------------------------------------------------------------------------
    createIterForEmptyObjects: function()
    {
        var iter = new TableIterator(this.getEmptyGrids());
        iter.getCurrent = function()
        {
            var grid = iter.m_Grids[iter.m_Index];
            if (grid)
            {
                return grid.getContent();
            }

            return null;
        };

        return iter;
    },

    //------------------------------------------------------------------------------------------------------------------
    createIterByRadius: function(center, radius)
    {
        //
        var grids = [];
		
        var gridPos = center.getGridPos();

        //
        for (var x = gridPos.x - radius; x <= gridPos.x + radius; ++x)
        {
            for (var y = gridPos.y - radius; y <= gridPos.y + radius; ++y)
            {
                var a_grid = this.getGrid(x, y);
                if (!a_grid || !(a_grid instanceof cc.NormalGrid))
                {
                    continue;
                }

                if (a_grid.hasAnyChildrenNodes())
                {
                    grids.push(a_grid);
                }
            }
        }

        return new TableIterator(grids);
    },
    //------------------------------------------------------------------------------------------------------------------
    createIterByCross: function(center, radius)
    {
        //
        var grids = [];
		
		cc.log("center = " + center.description());
		
        var gridPos = center.getGridPos();

        //
        for (var x = gridPos.x - radius; x <= gridPos.x + radius; ++x)
        {
			var a_grid = this.getGrid(x, gridPos.y);
			if (!a_grid || !(a_grid instanceof cc.NormalGrid))
			{
				continue;
			}

			if (a_grid.hasAnyChildrenNodes())
			{
				grids.push(a_grid);
			}
        }
		for (var y = gridPos.y - radius; y <= gridPos.y + radius; ++y)
		{
			var a_grid = this.getGrid(gridPos.x, y);
			if (a_grid == center || !a_grid || !(a_grid instanceof cc.NormalGrid))
			{
				continue;
			}

			if (a_grid.hasAnyChildrenNodes())
			{
				grids.push(a_grid);
			}
		}
        return new TableIterator(grids);
    },
    //------------------------------------------------------------------------------------------------------------------
    createIterForGrids: function()
    {
        var grids = [].concat(this.getNormalGrids()).concat(this.getEmptyGrids());
        return new TableIterator(grids);
    },

    //------------------------------------------------------------------------------------------------------------------
    createIterForSnakeObjects: function()
    {
        var iter = new TableIterator(this.m_PipeGrids);
        iter.getCurrent = function()
        {
            var grid = iter.m_Grids[iter.m_Index];
            if (grid)
            {
                return grid.getMiddleObject();
            }

            return null;
        };

        //
        iter.getGrid = function()
        {
            return iter.m_Grids[iter.m_Index];
        };

        //
        iter.getPathNode = function()
        {
            var grid = iter.m_Grids[iter.m_Index];
            if (grid)
            {
                return grid.getPathNode();
            }

            return null;
        };

        return iter;
    },

    //------------------------------------------------------------------------------------------------------------------
    isNeedAdjustVerticalPosition: function()
    {
        var height = 1;
        for (var index = 0; index < this.getTabWidth(); ++index)
        {
            var grid = this.getGrid(index, height);
            if (grid && grid instanceof cc.NormalGrid)
            {
                return true;
            }
        }

        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    getPipePaths: function()
    {
        return this.m_PipePathsData;
    },

    //------------------------------------------------------------------------------------------------------------------
    setPipePaths: function(setting)
    {
        this.m_PipePathsData = setting;
        return this.m_PipePathsData;
    },

    //------------------------------------------------------------------------------------------------------------------
    logPipePaths: function()
    {
        cc.log("--------------------------------------------------------------------------------------------------");
        cc.log("贪吃蛇的关卡");

        var paths = this.getPipePaths();
        for (var pathName in paths)
        {
            if (paths.hasOwnProperty(pathName))
            {
                cc.log("" + paths[pathName]);
            }
        }

        cc.log("--------------------------------------------------------------------------------------------------");

        return this;
    }

});

//======================================================================================================================
var TableIterator = cc.IIterator.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(grids)
    {
        this.m_Index = 0;
        this.m_Grids = grids || [];
    },

    //------------------------------------------------------------------------------------------------------------------
    first: function()
    {
        this.m_Index = 0;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    next: function()
    {
        ++this.m_Index;
        return this;
    },
	
	length : function()
	{
		return this.m_Grids.length;
	},
	
    //------------------------------------------------------------------------------------------------------------------
    isDone: function()
    {
        return !(this.m_Index < this.m_Grids.length);
    },

    //------------------------------------------------------------------------------------------------------------------
    getCurrent: function()
    {
        return this.m_Grids[this.m_Index];
    }
});
//======================================================================================================================

