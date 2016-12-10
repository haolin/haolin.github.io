//创建命令： 创建包装糖果

//======================================================================================================================
var Cmd_SubCreateMonsterWrap = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(center, others)
    {
        this._super();

        //
        this.center = center;
        this.others = others;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //
        cc.AudioMng.getInstance().playCreateWrap(this.center);

        //
        var visitor = cc.ScoreVisitorGroup.create(Defines.SCORE_TYPE.SCORE_CREATE_WRAP);

        //把普通的怪物都过滤出来
        var array = [].concat(this.center, this.others);
        array.forEach(
            function(object)
            {
                object.destroy(null, gameLevel, visitor);
            }
        );

        visitor.visitFinish();
        return this;
    }
});

//======================================================================================================================
var Cmd_SubCreateMonsterWrap_Create = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(grids, color)
    {
        this._super();
        this.grids = grids;
        this.color = color;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        this.grids = this.grids.filter(
            function(grid)
            {
                return grid && !grid.getMiddleObject();
            }
        );

        if (this.grids.length <= 0)
        {
            return this;
        }

        //
        var createNew = cc.Obj_MonsterWrap.create(this.color);
        this.grids[0].addNode(createNew);
        createNew.updateNodePosition();
        createNew.renderNode();

        //
        return this;
    }
});

//======================================================================================================================
cc.Cmd_CreateMonsterWrap = cc.ICommandGroup.extend({

    ctor: function(centerObj, othersObjects)
    {
        this._super();
        this.centerObj = centerObj;
        this.othersObjects = othersObjects;

        //
        this.grids = [this.centerObj.getParentNode()];
        var self = this;
        this.othersObjects.forEach(
            function(mons)
            {
                self.grids.push(mons.getParentNode());
            }
        );
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);
        //消除命令
        var cmd0 = new Cmd_SubCreateMonsterWrap(this.centerObj, this.othersObjects);
        this.addCommand(cmd0);

        //创建命令
        var cmd1 = new Cmd_SubCreateMonsterWrap_Create(this.grids, this.centerObj.getColor());
        this.addCommand(cmd1);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        return this.m_Commands.length <= 0;
    }
});

//工厂方法
cc.Cmd_CreateMonsterWrap.create = function(centerObj, othersObjects)
{
    return new cc.Cmd_CreateMonsterWrap(centerObj, othersObjects);
};
