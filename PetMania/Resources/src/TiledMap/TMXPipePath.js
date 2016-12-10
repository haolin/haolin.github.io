var TMXPipePath =  cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(pathName)
    {
        this._pathName = pathName || "";
        this._front = null;
        this._back = null;
        this._reverse = false;
        this._sequences = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "TMXPipePath " + this.getName();
    },

    //------------------------------------------------------------------------------------------------------------------
    getPathName: function()
    {
        return this._pathName;
    },

    //------------------------------------------------------------------------------------------------------------------
    addNode: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //创建蛇的等级队列
    addLevelSequence: function(seq)
    {
        this._sequences.push(seq);
    },

    //------------------------------------------------------------------------------------------------------------------
    getLevelSequence: function()
    {
        return this._sequences;
    },

    //------------------------------------------------------------------------------------------------------------------
    build: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    reverse: function()
    {
        //标记一下就好!!!
        this._reverse = !this._reverse;
        this._afterReverseUpdateTrans();

        //
        return this._reverse;
    },

    //------------------------------------------------------------------------------------------------------------------
    _afterReverseUpdateTrans: function()
    {
        var dirty = {};

        for (var cur = this._front;
             cur;
             cur = cur.getPipeNext(this.getPathName())
            )
        {
            if (dirty[cur.getObjectID()])
            {
                //防止Circle造成死循环
                break;
            }

            cur.reverseTransDirection();
            dirty[cur.getObjectID()] = true;
        }

        return this._reverse;
    },

    //------------------------------------------------------------------------------------------------------------------
    isReverse: function()
    {
        return this._reverse;
    },

    //------------------------------------------------------------------------------------------------------------------
    frontNode: function()
    {
        return this._front;
    },

    //------------------------------------------------------------------------------------------------------------------
    backNode: function()
    {
        return this._back;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function()
    {
        return cc.ICommand.create();
    },

    //------------------------------------------------------------------------------------------------------------------
    updateTransState: function()
    {
        //防止环形回路 死循环
        var dirty = {};
        var all = {};

        //
        for (var a_grid = this.frontNode();
             a_grid;
             a_grid = a_grid.getPipeNext(this.getPathName()))
        {
            if (dirty[a_grid.getObjectID()])
            {
                break;
            }

            var next = a_grid.getPipeNext(this.getPathName());
            if (!next)
            {
                break;
            }

            dirty[a_grid.getObjectID()] = true;
            var isNear = a_grid.near(next);
            if (!isNear)
            {
                if (a_grid.getPathNode().getMoveDirection())
                {
                    //
                    a_grid.setTransTo(a_grid.getPathNode().getMoveDirection());
                    next.setTransFrom(a_grid.getPathNode().getMoveDirection().getNegative());

                    //
                    all[a_grid.getObjectID()] = a_grid;
                    all[next.getObjectID()] = next;
                }
                else
                {
                    cc.log("这个格子忘了加上传送的 标记了 ?? = " + a_grid);
                }
            }
        }

        //
        /*cc.log("log标记传送门");
        for (var prop in all)
        {
            if (all.hasOwnProperty(prop))
            {
                all[prop].logAboutTrans();
            }
        }*/

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    checkPath: function()
    {
        var self = this;


        var grids = [];
        var snakes = [];

        //防止环形回路 死循环
        var dirty = {};
        for (var a_grid = this.frontNode();
             a_grid;
             a_grid = a_grid.getPipeNext(this.getPathName()))
        {
            if (dirty[a_grid.getObjectID()])
            {
                break;
            }

            dirty[a_grid.getObjectID()] = a_grid;
            grids.push(a_grid);

            //
            if (a_grid.getSnakeObj() && a_grid.getSnakeObj().isNormalSnake())
            {
                snakes.push(a_grid.getSnakeObj());
            }
        }


        //
        var result =  {

            _resPathName: self.getPathName(),

            levelsLength: function()
            {
                var allLength = 0;
                snakes.forEach(
                    function(a_snake)
                    {
                        allLength += a_snake.getSnakeLevel();
                    }
                );

                return allLength;
            },

            hasSnakes: function()
            {
                return snakes.length > 0;
            },

            isEmpty: function()
            {
                return !this.hasSnakes();
            },

            isFull: function()
            {
                return this.hasSnakes() && snakes.length >= grids.length;
            },

            toString: function()
            {
                return " " + this._resPathName + ":" + "empty = " + this.isEmpty() + ", isFull = " + this.isFull();
            }
        };

        cc.log("" + result);

        return result;
    }
});

//======================================================================================================================
//单方向的
var TMXPipePath_Unidirection =  TMXPipePath.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(pathName, nodesIDs)
    {
        this._super(pathName);

        //
        this._nodesIDs = nodesIDs || [];
        this._nodes = {};
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        var _string = "TMXPipePath_Unidirection";
        _string += " ";
        _string += this.getPathName();
        _string += ":";
        _string += this._nodesIDs;

        //
        return _string;
    },

    //------------------------------------------------------------------------------------------------------------------
    addNode: function(node)
    {
        this._nodes[node.getNodeID()] = node;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    build: function()
    {
        //
        cc.log("开始构造 = " + this.getPathName() + " " + this._nodesIDs);

        //
        var self = this;

        //test
        var test = true;
        if (test)
        {
            var count = 0;
            for (var prop in this._nodes)
            {
                if (this._nodes.hasOwnProperty(prop))
                {
                    ++count;
                }
            }

            if (count != this._nodesIDs.length)
            {
                cc.log("count = " + count);
                cc.log("this._nodesIDs.length = " + this._nodesIDs.length);
                cc.Assert(0, "count != this._nodesIDs.length");
            }
        }

        //
        this._nodesIDs.forEach(
            function(a_nodeId, index, array)
            {
                var curNode = self._nodes[a_nodeId];
                if (!curNode || !curNode.getParentNode())
                {
                    return;
                }

                if (index == 0)
                {
                    self._front = curNode.getParentNode();
                }
                else if (index == array.length - 1)
                {
                    self._back = curNode.getParentNode();
                }

                var nextNode = array[index + 1] ? self._nodes[array[index + 1]] : null;
                if (!nextNode || !nextNode.getParentNode())
                {
                    return;
                }

                //
                curNode.getParentNode().setPipeNext(nextNode.getParentNode(), self.getPathName());
                cc.log("nextNode.getParentNode() + " + nextNode.getParentNode());
                nextNode.getParentNode().setPipePre(curNode.getParentNode(), self.getPathName());
            }
        );

        //test
        cc.log("输出一条路径 = " + this.getPathName());
        for (var grid = this.frontNode(); grid; grid = grid.getNext())
        {
            cc.log("" + grid);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function()
    {
        return Cmd_PipePath_Unidirection.create(this);
    }
});

TMXPipePath_Unidirection.create = function(pathName, tiledMapProperty)
{
    //需要分解一下
    var nodesIDs = tiledMapProperty.split(",");
    nodesIDs = nodesIDs || [];

    return new TMXPipePath_Unidirection(pathName, nodesIDs);
};


//======================================================================================================================
//======================================================================================================================
//======================================================================================================================
//单方向的
var TMXPipePath_Circle = TMXPipePath_Unidirection.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(pathName, nodesIDs)
    {
        this._super(pathName, nodesIDs);
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        var _string = "TMXPipePath_Circle";
        _string += " ";
        _string += this.getPathName();
        _string += ":";
        _string += this._nodesIDs;

        //
        return _string;
    },

    //------------------------------------------------------------------------------------------------------------------
    build: function()
    {
        this._super();

        //环形 首位相连
        this.backNode().setPipeNext(this.frontNode(), this.getPathName());
        this.frontNode().setPipePre(this.backNode(), this.getPathName());

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function()
    {
        return Cmd_PipePath_Circle.create(this);
    }
});

TMXPipePath_Circle.create = function(pathName, tiledMapProperty)
{
    //需要分解一下
    var nodesIDs = tiledMapProperty.split(",");
    nodesIDs = nodesIDs || [];

    return new TMXPipePath_Circle(pathName, nodesIDs);
};
