
//======================================================================================================================
var Cmd_PipePath_Circle = cc.ICommandGroup.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(tmxPath)
    {
        this._super();

        //
        this._tmxPath = tmxPath;
    },

    //------------------------------------------------------------------------------------------------------------------
    _parseCircleNext: function(a_grid)
    {
        return this._tmxPath.isReverse() ?
            a_grid.getPipePre(this._tmxPath.getPathName()) : a_grid.getPipeNext(this._tmxPath.getPathName());
    },

    //------------------------------------------------------------------------------------------------------------------
    _parseCircleReverseNext: function(a_grid)
    {
        return this._tmxPath.isReverse() ? a_grid.getPipeNext(this._tmxPath.getPathName())
            : a_grid.getPipePre(this._tmxPath.getPathName());
    },

    //------------------------------------------------------------------------------------------------------------------
    _parseFrontPull: function()
    {
        return this._tmxPath.isReverse() ?
            this._tmxPath.frontNode().getPipeNext(this._tmxPath.getPathName())
            : this._tmxPath.frontNode().getPipePre(this._tmxPath.getPathName());
    },

    //------------------------------------------------------------------------------------------------------------------
    _parseCircleMoveTo: function(a_dirty)
    {
        return this._tmxPath.isReverse() ? a_dirty.getPipePre(this._tmxPath.getPathName()) : a_dirty.getPipeNext(this._tmxPath.getPathName());
    },

    //------------------------------------------------------------------------------------------------------------------
    parse: function()
    {
        var grids = [];
        var dirty = {};

        for (var a_grid = this._tmxPath.frontNode();
             a_grid;
             a_grid = this._parseCircleNext(a_grid)
            )
        {
            if (dirty[a_grid.getObjectID()])
            {
                //因为是闭合的 防止死循环!!!!
                break;
            }

            dirty[a_grid.getObjectID()] = true;
            var snake = a_grid.getMiddleObject();
            if (!snake)
            {
                if (grids.length > 0)
                {
                    break;
                }
            }
            else if (!snake.isLocked())
            {
                grids.push(a_grid);
            }
        }

        if (grids.length > 0)
        {
            grids.reverse();
        }

        //清除一下
        dirty = {};
        var grids1 = [];
        if (this._tmxPath.frontNode().getMiddleObject())
        {
            for (var a_grid1 = this._parseFrontPull();
                 a_grid1;
                 a_grid1 = this._parseCircleReverseNext(a_grid1)
                )
            {
                if (dirty[a_grid1.getObjectID()])
                {
                    break;
                }

                dirty[a_grid1.getObjectID()] = true;
                var snake1 = a_grid1.getMiddleObject();
                if (!snake1)
                {
                    break;
                }
                else if (!snake1.isLocked())
                {
                    grids1.push(a_grid1);
                }
            }
        }

        //
        grids = grids.concat(grids1);
        return grids;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        var self = this;

        //
        var dirtys = this.parse();
        if (dirtys.length <= 0)
        {
            return this;
        }

        for (var indx = 0; indx < dirtys.length; ++indx)
        {
            var a_dirty = dirtys[indx];
            var snake = a_dirty.getMiddleObject();
            if (!snake)
            {
                break;
            }

            var moveTo = this._parseCircleMoveTo(a_dirty);
            if (!moveTo)
            {
                break;
            }

            var nextSnake = moveTo.getMiddleObject();
            if (nextSnake)
            {
                break;
            }

            //
            var newCmd = Cmd_PipePathMove.create(snake, moveTo);
            if (newCmd)
            {
                //必须先从格子上拿下来 不然会出问题
                self.addCommand(newCmd.start(gameLevel));
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        if (!this.isStart())
        {
            this.start(gameLevel);
        }

        //
        this.m_Commands.forEach(
            function(cmd, index, array)
            {
                if (cmd.command(gameLevel, time))
                {
                    cmd.finish(gameLevel);
                    array.splice(index, 1);
                }
            }
        );

        return this.m_Commands.length <= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        this._super(gameLevel);
        return this;
    }
});

//
Cmd_PipePath_Circle.create = function(pipePath)
{
    if (!( pipePath instanceof TMXPipePath))
    {
        cc.Assert(0, "!!!!!!");
    }

    return new Cmd_PipePath_Circle(pipePath);
};




