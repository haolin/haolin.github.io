//游戏桌面的基础类

cc.ITable = cc.INodeObject.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(width, height)
    {
        this._super();

        this.m_TabWidth = width;
        this.m_TabHeight = height;

        //必须这么初始化
        this.m_ChildrenNodes = new Array(this.getTabWidth());
        for (var indx = 0; indx < this.m_ChildrenNodes.length; ++indx)
        {
            this.m_ChildrenNodes[indx] = new Array(this.getTabHeight());
        }
    },

    //------------------------------------------------------------------------------------------------------------------
    getTabWidth: function()
    {
        return this.m_TabWidth;
    },

    //------------------------------------------------------------------------------------------------------------------
    getTabHeight: function()
    {
        return this.m_TabHeight;
    },

    //------------------------------------------------------------------------------------------------------------------
    getCenterGrid: function()
    {
        return this.getGrid(
            parseInt(this.getTabWidth()/2), parseInt(this.getTabHeight()/2)
        );
    },

    //------------------------------------------------------------------------------------------------------------------
    getCenterPosition: function()
    {
        var grid = this.getCenterGrid();
        //cc.log("center = " + grid);
        return grid ? grid.getPosition() : _ScreenCenter();
    },

    //------------------------------------------------------------------------------------------------------------------
    gridPosIntersect: function(x, y)
    {
        return (x >= 0 && x < this.getTabWidth() && y >= 0 && y < this.getTabHeight());
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "ITable";
    },

    //------------------------------------------------------------------------------------------------------------------
    //释放
    release: function()
    {
        //
        this._super();

        //
        this.tableTreeFunction(
            function(a_node)
            {
                a_node.release();
            }
        );

        this.m_ChildrenNodes = [];
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //获得一个格子
    getGrid: function(x, y)
    {
        //cc.log("x = " + x + ", y = " + y);
        return this.gridPosIntersect(x, y) ? this.m_ChildrenNodes[x][y] : null;
    },

    //------------------------------------------------------------------------------------------------------------------
    //设置一个格子
    setGrid: function(x, y, grid)
    {
        var ok = (grid  && this.gridPosIntersect(x, y));
        if (ok)
        {
            this.m_ChildrenNodes[x][y] = grid;
            grid.setParentNode(this);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //通过实际位置获得一个格子
    getGridByPos: function(pos)
    {
        var zeroGrid = this.getGrid(0, 0);
        if (!zeroGrid)
        {
            cc.Assert(0);
        }

        //因为gridpos是以左上weight为0,0的
        var startPos = cc.p(zeroGrid.getPosition().x - Defines.TABLE_GRID_SIZE/2,
            zeroGrid.getPosition().y + Defines.TABLE_GRID_SIZE/2);

        var xDis = pos.x - startPos.x;
        var yDis = pos.y - startPos.y;

        var x_ok = (xDis >= 0 && xDis <= this.getTabWidth() * Defines.TABLE_GRID_SIZE);
        var y_ok = (yDis <= 0 && Math.abs(yDis) <= this.getTabHeight() * Defines.TABLE_GRID_SIZE);

        return (x_ok && y_ok) ?
            this.getGrid(parseInt(xDis/Defines.TABLE_GRID_SIZE),
                parseInt(Math.abs(yDis)/Defines.TABLE_GRID_SIZE)) : null;
    },

    //------------------------------------------------------------------------------------------------------------------
    //通过实际位置获得一个格子的坐标
    getGridPointByPos: function(pos)
    {
        var zeroGrid = this.getGrid(0, 0);
        if (!zeroGrid)
        {
            cc.Assert(0);
        }

        //因为gridpos是以左上weight为0,0的
        var startPos = cc.p(zeroGrid.getPosition().x - Defines.TABLE_GRID_SIZE/2,
            zeroGrid.getPosition().y + Defines.TABLE_GRID_SIZE/2);

        var xDis = pos.x - startPos.x;
        var yDis = pos.y - startPos.y;

        var x_ok = (xDis >= 0 && xDis <= this.getTabWidth() * Defines.TABLE_GRID_SIZE);
        var y_ok = (yDis <= 0 && Math.abs(yDis) <= this.getTabHeight() * Defines.TABLE_GRID_SIZE);

        return (x_ok && y_ok) ?
            cc.p(parseInt(xDis/Defines.TABLE_GRID_SIZE),
                parseInt(Math.abs(yDis)/Defines.TABLE_GRID_SIZE)) : null;
    },


    //------------------------------------------------------------------------------------------------------------------
    //添加渲染
    renderNode: function()
    {
        //
        this._super();

        //
        this.tableTreeFunction(
            function(a_node)
            {
                a_node.renderNode();
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //设置位置
    setPosition: function(pos)
    {
        this._super(pos);

        //
        this.tableTreeFunction(
            function(a_node)
            {
                a_node.updateNodePosition();
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //设置位置
    tableTreeFunction: function(func)
    {
        if (!func)
        {
            return this;
        }

        var children = this.getChildrenNodes();
        for (var x = 0; x < children.length; ++x)
        {
            for (var y = 0; y < children[x].length; ++y)
            {
                var grid = children[x][y];
                if (!grid)
                {
                    continue;
                }

                //
                func(grid);

                //
                var objectsNodes = grid.getChildrenNodes();
                objectsNodes.forEach(
                    function(object)
                    {
                        if (object)
                        {
                            func(object);
                        }
                    }
                );
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getRow: function(yValue)
    {
        var row = [];
        for (var wid = 0; wid < this.getTabWidth(); ++wid)
        {
            var grid = this.getGrid(wid, yValue);
            if (grid)
            {
                row.push(grid);
            }
        }

        return row;
    },

    //------------------------------------------------------------------------------------------------------------------
    getColumn: function(xValue)
    {
        var col = [];
        for (var height = 0; height < this.getTabHeight(); ++height)
        {
            var grid = this.getGrid(xValue, height);
            if (grid)
            {
                col.push(grid);
            }
        }

        return col;
    }

    //------------------------------------------------------------------------------------------------------------------

});


