//======================================================================================================================
var Cmd_PipePathMove = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(objSnake, moveTo)
    {
        this._super();

        //
        this._objSnake = objSnake;
        this._moveTo = moveTo;
        this._finish = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //
        var self = this;
        this._objSnake.removeFromParentNode();

        //
        var spr = this._objSnake.getSprite();
        //spr.setColor(cc.c3b(78, 160, 34));

        //
        var seq = cc.Sequence.create(
            cc.MoveTo.create(0.618, self._moveTo.getPosition()),
            cc.CallFunc.create(
                function(sender)
                {
                    //
                    //sender.setColor(cc.c3b(255, 255, 255));

                    //
                    self._moveTo.addNode(self._objSnake);
                    self._objSnake.updateNodePosition();
                    self._finish = true;
                },
                null)
        );

        //
        spr.runAction(seq);

        //
        _Cmd_PipePathGroupDirty[self._moveTo.getObjectID()] = true;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        return this._finish;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        this._super(gameLevel);
        this._moveTo.getPathNode().firePathNodeEvent();
        this._moveTo.handleTake();
        return this;
    }
});
//======================================================================================================================
var Cmd_PipePathMoveTrans = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(objSnake, moveTo)
    {
        this._super();

        //
        this._objSnake = objSnake;
        this._moveTo = moveTo;
        this._finish = false;

        //
        this._clone = null;

        //
        this._orgRect = null;
        this._srcRect = null;
        this._cloneRect = null;
        this._speed = Defines.OBJ_MOVE_SPEED * 0.2;

        //
        this._srcWid = 0;
        this._cloneWid = 0;

        //
        this._srcHeight = 0;
        this._cloneHeight = 0;

        //
        this._transDirection = this._objSnake.getParentNode().getTransTo();
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
        this._objSnake.removeFromParentNode();
        var spr = this._objSnake.getSprite();
        //spr.setColor(cc.c3b(255, 0, 0));

        //
        this._clone = this._objSnake.createSprite();
        //this._clone.setColor(cc.c3b(128, 128, 128));
        this._clone.setPosition(this._moveTo.getPosition());

        //
        this._orgRect = this._objSnake.getSprite().getTextureRect();
        this._srcRect = this._objSnake.getSprite().getTextureRect();
        this._cloneRect = this._objSnake.getSprite().getTextureRect();

        //
        this._srcWid = 0;
        this._cloneWid = 0;

        //
        this._srcHeight = 0;
        this._cloneHeight = 0;

        //
        _Cmd_PipePathGroupDirty[this._moveTo.getObjectID()] = true;
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
        this._srcWid += this._speed * time;
        this._objSnake.getSprite().setTextureRect(
            cc.rect(this._srcRect.x + this._srcWid,
                this._srcRect.y,
                this._srcRect.width - this._srcWid,
                this._srcRect.height));

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
            cc.rect(this._cloneRect.x + this._orgRect.width - this._cloneWid,
                this._cloneRect.y,
                this._cloneWid,
                this._cloneRect.height));

        //
        this._srcWid += /*mv.x **/ this._speed * time;
        this._objSnake.getSprite().setTextureRect(
            cc.rect(this._srcRect.x,
                this._srcRect.y,
                this._srcRect.width - this._srcWid,
                this._srcRect.height));

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
        this._srcHeight += this._speed * time;
        this._objSnake.getSprite().setTextureRect(
            cc.rect(this._srcRect.x,
                this._srcRect.y + this._srcHeight,
                this._srcRect.width,
                this._srcRect.height - this._srcHeight));

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
        this._srcHeight += this._speed * time;
        this._objSnake.getSprite().setTextureRect(
            cc.rect(this._srcRect.x,
                this._srcRect.y,
                this._srcRect.width,
                this._srcRect.height - this._srcHeight));

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

        //this._objSnake.getSprite().setColor(cc.c3b(255, 255, 255));
        this._objSnake.getSprite().setTextureRect(this._orgRect);

        this._moveTo.addNode(this._objSnake);
        this._objSnake.updateNodePosition();

        //
        this._moveTo.getPathNode().firePathNodeEvent();
        this._moveTo.handleTake();
        //
        return this;
    }
});

Cmd_PipePathMove.create = function(objSnake, moveTo)
{
    if (_Cmd_PipePathGroupDirty[moveTo.getObjectID()])
    {
        //被标记脏的 就创建不出来
        return null;
    }

    var isNear = objSnake.getParentNode().near(moveTo);
    if (!isNear)
    {
        if (!objSnake.getParentNode().getTransTo())
        {
            cc.log("这个格子忘了加上传送的 标记了 ?? = " + objSnake.getParentNode());
            return new Cmd_PipePathMove(objSnake, moveTo);
        }

        return new Cmd_PipePathMoveTrans(objSnake, moveTo);
    }

    return new Cmd_PipePathMove(objSnake, moveTo);
};
//======================================================================================================================


var _Cmd_PipePathGroupDirty = {};
var Cmd_PipePathGroup = cc.ICommandGroup.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function()
    {
        this._super();
        _Cmd_PipePathGroupDirty = {};
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

        cc.PipeAndSnakeGame.getInstance().fireEvent(gameLevel);
        _Cmd_PipePathGroupDirty = {};

        return this;
    }
});

//
Cmd_PipePathGroup.create = function()
{
    return new Cmd_PipePathGroup();
};



