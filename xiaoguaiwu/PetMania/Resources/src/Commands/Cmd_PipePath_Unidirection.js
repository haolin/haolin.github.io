
//======================================================================================================================
var Cmd_PipePath_Unidirection = cc.ICommandGroup.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(tmxPath)
    {
        this._super();

        this._tmxPath = tmxPath;
    },

    //------------------------------------------------------------------------------------------------------------------
    _parseBegin: function()
    {
        return this._tmxPath.isReverse() ? this._tmxPath.backNode() : this._tmxPath.frontNode();
    },

    //------------------------------------------------------------------------------------------------------------------
    _parseNext: function(a_grid)
    {
        return this._tmxPath.isReverse() ? a_grid.getPipePre(this._tmxPath.getPathName())
            : a_grid.getPipeNext(this._tmxPath.getPathName());
    },

    //------------------------------------------------------------------------------------------------------------------
    _parseFull: function(grids)
    {
        if (grids.length > 0)
        {
            if (!this._tmxPath.isReverse())
            {
                if (grids[0] == this._tmxPath.frontNode() && grids[grids.length - 1] == this._tmxPath.backNode())
                {
                    return true;
                }
            }
            else
            {
                if (grids[0] == this._tmxPath.backNode() && grids[grids.length - 1] == this._tmxPath.frontNode())
                {
                    return true;
                }
            }
        }

        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    parse: function()
    {
        var grids = [];

        for (var a_grid = this._parseBegin();
             a_grid;
             a_grid = this._parseNext(a_grid)
            )
        {
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

        if (this._parseFull(grids))
        {
            cc.log("等长不用移动");
            grids = [];
        }

        return grids;
    },

    //------------------------------------------------------------------------------------------------------------------
    _needPathReverse: function(dirtys)
    {
        if (dirtys.length > 0)
        {
            return dirtys[dirtys.length - 1] == (
                this._tmxPath.isReverse() ? this._tmxPath.frontNode() : this._tmxPath.backNode()
                )
        }

        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    _parseMoveTo: function(a_dirty)
    {
        return this._tmxPath.isReverse() ? a_dirty.getPipePre(this._tmxPath.getPathName()) : a_dirty.getPipeNext(this._tmxPath.getPathName());
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

        //
        if (this._needPathReverse(dirtys))
        {
            this._tmxPath.reverse();
            dirtys = this.parse();
        }

        //必须走这一步!!!!
        dirtys.reverse();
        dirtys.forEach(
            function(a_dirty)
            {
                var snake = a_dirty.getMiddleObject();
                if (!snake)
                {
                    return;
                }

                //
                var moveTo = self._parseMoveTo(a_dirty);
                if (!moveTo)
                {
                    return;
                }

                //
                var nextSnake = moveTo.getMiddleObject();
                if (nextSnake)
                {
                    return;
                }

                //
                var newCmd = Cmd_PipePathMove.create(snake, moveTo);
                if (newCmd)
                {
                    //必须先从格子上拿下来 不然会出问题
                    self.addCommand(newCmd.start(gameLevel));
                }
            }
        );

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
        //cc.log("Cmd_PipePath_Unidirection 完成");
        return this;
    }
});

//
Cmd_PipePath_Unidirection.create = function(pipePath)
{
    if (!( pipePath instanceof TMXPipePath))
    {
        cc.Assert(0, "!!!!!!");
    }

    //cc.log("Cmd_PipePath_Unidirection 创建");
    return new Cmd_PipePath_Unidirection(pipePath);
};




