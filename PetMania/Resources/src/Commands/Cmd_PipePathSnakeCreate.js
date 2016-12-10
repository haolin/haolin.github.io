
var indexTest= 0;

//和Cmd_PipePathMoveTrans 效果一致 可以合并起来 进行重构!!!!!!!
//======================================================================================================================
var Cmd_PipePathSnakeCreate = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(objSnake, createTo)
    {
        this._super();

        //
        this._objSnake = objSnake;
        this._objSnake.renderNode();
        this._objSnake.getSprite().setVisible(false);
        this._objSnake.getSprite().setPosition(createTo.getPosition());

        //
        this._createTo = createTo;
        this._finish = false;

        //
        this._clone = null;

        //
        this._orgRect = null;
        this._cloneRect = null;
        this._speed = Defines.OBJ_MOVE_SPEED * 0.2;

        this._cloneWid = 0;
        this._cloneHeight = 0;


        //
        this._transDirection = createTo.getPathNode().getCreateDirection();
        cc.log("this._transDirection = " + this._transDirection);
    },

    //------------------------------------------------------------------------------------------------------------------
    getTransDirection: function()
    {
        return this._transDirection;
    },

    //------------------------------------------------------------------------------------------------------------------
    _start: function(/*gameLevel*/)
    {
        //
        this._clone = this._objSnake.createSprite();
        this._clone.setColor(cc.c3b(128, 128, 128));
        this._clone.setPosition(this._createTo.getPosition());

        //
        this._orgRect = this._clone.getTextureRect();
        this._cloneRect = this._clone.getTextureRect();

        //
        this._cloneWid = 0;
        this._cloneHeight = 0;

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        return this._start(gameLevel);
    },

    //------------------------------------------------------------------------------------------------------------------
    transLeft: function(gameLevel, time)
    {
        this._clone.setVisible(true);

        //
        this._cloneWid += this._speed * time;
        this._clone.setTextureRect(
            cc.rect(this._cloneRect.x,
                this._cloneRect.y,
                this._cloneWid,
                this._cloneRect.height));

        //
        if (this._cloneWid >= this._orgRect.width)
        {
            this._finish = true;
        }

        return this._finish;
    },

    //------------------------------------------------------------------------------------------------------------------
    transRight: function(gameLevel, time)
    {
        this._clone.setVisible(true);

        //
        this._cloneWid += this._speed * time;
        this._clone.setTextureRect(
            cc.rect(/*this._orgRect.width - this._cloneWid*/this._cloneRect.x + this._orgRect.width - this._cloneWid,
                this._cloneRect.y,
                this._cloneWid,
                this._cloneRect.height));

        //
        if (this._cloneWid >= this._orgRect.width)
        {
            this._finish = true;
        }

        return this._finish;
    },

    //------------------------------------------------------------------------------------------------------------------
    transTop: function(gameLevel, time)
    {
        this._clone.setVisible(true);

        //
        this._cloneHeight += this._speed * time;
        this._clone.setTextureRect(
            cc.rect(this._cloneRect.x,
                this._cloneRect.y,
                this._cloneRect.width,
                this._cloneHeight));

        //
        if (this._cloneHeight >= this._orgRect.height)
        {
            this._finish = true;
        }

        return this._finish;
    },

    //------------------------------------------------------------------------------------------------------------------
    transBottom: function(gameLevel, time)
    {
        this._clone.setVisible(true);

        //
        this._cloneHeight += this._speed * time;
        this._clone.setTextureRect(
            cc.rect(this._cloneRect.x,
                this._cloneRect.y + (this._cloneRect.height - this._cloneHeight),
                this._cloneRect.width,
                this._cloneHeight));

        //
        if (this._cloneHeight >= this._orgRect.height)
        {
            this._finish = true;
        }

        return this._finish;
    },

    //------------------------------------------------------------------------------------------------------------------
    _command: function(gameLevel, time)
    {
        switch (this.getTransDirection())
        {
        case Defines.DIRECTION.LEFT:
            return this.transLeft(gameLevel, time);

        case Defines.DIRECTION.RIGHT:
            return this.transRight(gameLevel, time);

        case Defines.DIRECTION.TOP:
            return this.transTop(gameLevel, time);

        case Defines.DIRECTION.BOTTOM:
            return this.transBottom(gameLevel, time);

        default:
            {
                cc.Assert(0, "" + this.getTransDirection());
            }
            break;
        }

        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        return this._command(gameLevel, time);
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        this._super(gameLevel);

        if (this._clone)
        {
            this._clone.removeFromParent(true);
            this._clone = null;
        }

        //
        this._createTo.addNode(this._objSnake);
        this._objSnake.renderNode();
        this._objSnake.updateNodePosition();

        return this;
    }
});

Cmd_PipePathSnakeCreate.create = function(objSnake, createTo)
{
    return new Cmd_PipePathSnakeCreate(objSnake, createTo);
};




//======================================================================================================================
var _Cmd_PipePathSnakeCreateAndMoveDirty = {};
var Cmd_PipePathSnakeCreateAndMove = cc.ICommandGroup.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(objSnake, pipePath, moves)
    {
        this._super();

        this._objSnake = objSnake;
        this._pipePath = pipePath;

        this._moves = moves;
        this._curMove = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function()
    {
        this._super();

        var frontNode = this._pipePath.frontNode();
        var createCmd = Cmd_PipePathSnakeCreate.create(this._objSnake, frontNode);
        if (createCmd)
        {
            this.addCommand(createCmd);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        //
        if (this.m_Commands.length > 0)
        {
            return this.m_Commands.length <= 0;
        }

        //移动
        if (this._curMove >= this._moves)
        {
            return this.m_Commands.length <= 0;
        }

        var pathName = this._pipePath.getPathName();
        var curPipeNode = this._objSnake.getParentNode();
        var moveTo = curPipeNode.getPipeNext(pathName);

        if (moveTo)
        {
            if (!moveTo.getMiddleObject())
            {
                _Cmd_PipePathGroupDirty = {};
                var moveCmd = Cmd_PipePathMove.create(this._objSnake, moveTo);
                if (moveCmd)
                {
                    this.addCommand(moveCmd);
                }
            }
        }

        //
        ++this._curMove;

        return this.m_Commands.length <= 0;
    }
});

Cmd_PipePathSnakeCreateAndMove.create = function(objSnake, pipePath, moves)
{
    return new Cmd_PipePathSnakeCreateAndMove(objSnake, pipePath, moves);
};

//======================================================================================================================
var Cmd_PipePathSnakeCreateAndMoveGroup = cc.ICommandGroup.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(objSnakes, pipePath)
    {
        this._super();

        this._objSnakes = objSnakes;
        this._pipePath = pipePath;

        this._snakeIndex = 0;
        this._createTime = 0.9;
        this._heapTime = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function()
    {
        this._super();

        this._addCreateAndMove();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _addCreateAndMove: function()
    {
        //
        var aSnake = this._objSnakes[this._snakeIndex];
        var moves = this._objSnakes.length - this._snakeIndex - 1;
        var aCmd = Cmd_PipePathSnakeCreateAndMove.create(aSnake, this._pipePath, moves);
        if (aCmd)
        {
            this.addCommand(aCmd);
        }

        //
        ++this._snakeIndex;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _command: function(gameLevel, time)
    {
        if (this._snakeIndex >= this._objSnakes.length)
        {
            return this;
        }

        //
        this._heapTime += time;
        if (this._heapTime >= this._createTime)
        {
            this._heapTime = 0;
            this._addCreateAndMove();
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
        this._command(gameLevel, time);

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
    }
});

//
Cmd_PipePathSnakeCreateAndMoveGroup.create = function(objSnakes, pipePath)
{
    return new Cmd_PipePathSnakeCreateAndMoveGroup(objSnakes, pipePath);
};