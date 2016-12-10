//构造路径


//======================================================================================================================
var TiledMapPaths =  cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(paths)
    {
        this.paths = paths || [];
    },

    //------------------------------------------------------------------------------------------------------------------
    get: function()
    {
        return this.paths.concat();
    },

    //------------------------------------------------------------------------------------------------------------------
    addPathBegin: function(pathBegin)
    {
        this.paths.push(
            {
                begin: pathBegin,
                end: null
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseNext: function(grid)
    {
        //return grid ? grid.getGridByDirection(Defines.DIRECTION.DRAVITY) : null;
        return grid ? grid.getGridByDirection(_GetGravity()) : null;
    },

    //------------------------------------------------------------------------------------------------------------------
    isEnd: function(grid)
    {
        if (!grid)
        {
            return false;
        }

        var isBeginGrid = (grid instanceof cc.EmptyGrid && grid.getContent() instanceof cc.Obj_Begin);
        var isConnectEnd = (grid.getPre() && grid.getPre().isConnect());
        return isBeginGrid || isConnectEnd;
    },

    //------------------------------------------------------------------------------------------------------------------
    _build: function()
    {
        var self = this;
        this.paths.forEach(
            function(a_path)
            {
                var cur = a_path.begin;
                var next = self.parseNext(cur);

                while (next)
                {
                    next.setPre(cur);
                    cur.setNext(next);

                    cur = next;
                    next = self.parseNext(next);

                    if (!next || self.isEnd(next))
                    {
                        //第二个判断 是为了防止死循环 有的关卡(带传送门的) 终点本身也是起点
                        break;
                    }
                }

                a_path.end = cur;
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _buildByConnect: function(connect, table)
    {
        if (!connect || !(connect instanceof TiledMapBuilderConnect))
        {
            return this;
        }

        var self = this;

        var allConnects = connect.get();
        allConnects.forEach(
            function(connect)
            {
                //
                var fromGrid = table.getGrid(connect.from.x, connect.from.y);
                var toGrid = table.getGrid(connect.to.x, connect.to.y);

                //把2个格子联通起来
                var next = fromGrid.getNext();
                if (next)
                {
                    next.setPre(null);
                }

                var pre = toGrid.getPre();
                if (pre)
                {
                    pre.setNext(null);
                }

                fromGrid.setNext(toGrid);
                toGrid.setPre(fromGrid);

                //
                fromGrid.isConnect = function()
                {
                    return true;
                };
            }
        );

        //进行重连接??
        this.paths.forEach(
            function(a_path)
            {
                var cur = a_path.begin;

                var next = cur.getNext();
                for (;next;)
                {
                    cur.setNext(next);
                    next.setPre(cur);

                    cur = next;

                    if (next.getNext())
                    {
                        next = next.getNext();
                    }
                    else
                    {
                        next = self.parseNext(next);
                        if (!next || self.isEnd(next))
                        {
                            break;
                        }
                    }
                }

                a_path.end = cur;
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    buildPaths: function(connect, table)
    {
        //
        this._build();

        //
        if (connect)
        {
            this._buildByConnect(connect, table);
        }

        //
        this.paths.sort(
            function(left, right)
            {
                return left.end.getGridPos().x < right.end.getGridPos().x ? -1 : 1;
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    clone: function()
    {
        return new TiledMapPaths(this.paths.concat());
    }
});

TiledMapPaths.create = function(paths)
{
    return new TiledMapPaths(paths);
};