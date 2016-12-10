//命令基础类

cc.ICommand = cc.Class.extend({

    ctor: function()
    {
        this.m_IsStart = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function()
    {
        this.m_IsStart = true;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "ICommand";
    },

    //------------------------------------------------------------------------------------------------------------------
    isStart: function()
    {
        return this.m_IsStart;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel)
    {
        if (!this.isStart())
        {
            this.start(gameLevel);
        }

        return true;
    }

});

//工厂方法
cc.ICommand.create = function()
{
    return new cc.ICommand();
};

//======================================================================================================================
cc.Cmd_Empty = cc.ICommand.extend({

    toString: function()
    {
        return "Cmd_Empty";
    }
});

cc.Cmd_Empty.create = function()
{
    cc.log("cc.Cmd_Empty.create = function()");
    return new cc.Cmd_Empty();
};

//======================================================================================================================
cc.ICommandGroup = cc.ICommand.extend({

    ctor: function()
    {
        this._super();
        this.m_Commands = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    addCommand: function(cmd)
    {
        if (cmd)
        {
            this.m_Commands.push(cmd);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        if (this.m_Commands.length > 0)
        {
            if (this.m_Commands[0].command(gameLevel, time))
            {
                this.m_Commands[0].finish(gameLevel);
                this.m_Commands.shift();
            }
        }

        return this.m_Commands.length <= 0;
    }
});

//工厂方法
cc.ICommandGroup.create = function()
{
    return new cc.ICommandGroup();
};