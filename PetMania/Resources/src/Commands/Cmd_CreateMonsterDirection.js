//创建命令: 创建带方向花纹的糖果

//======================================================================================================================
var Cmd_SubCreateMonsterDirection = cc.ICommand.extend({

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
        cc.AudioMng.getInstance().playCreateDirection(this.center);

        //
        var visitor = cc.ScoreVisitorGroup.create(Defines.SCORE_TYPE.SCORE_CREATE_DIRECTION);

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
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function()
    {
        return this;
    }
});

//======================================================================================================================
var Cmd_SubCreateMonsterDirection_Create = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(color, hvDirection, grids, needRand)
    {
        this._super();

        //
        this.color = color;
        this.hvDirection = hvDirection;
        this.grids = grids;
        this.needRand = needRand;
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
        var finalGrid = this.needRand ? Tools.arrayRandom(this.grids): this.grids[0];
        if (finalGrid)
        {
            var createNew = cc.Obj_MonsterDirection.create(this.color, this.hvDirection);
            if (createNew)
            {
                finalGrid.addNode(createNew);
                createNew.updateNodePosition();
                createNew.renderNode();
            }
        }

        return this;
    }
});


//======================================================================================================================
cc.Cmd_CreateMonsterDirection = cc.ICommandGroup.extend({

    ctor: function(centerMonster, otherMonsters, _HVDirection, needRand)
    {
        //
        this._super();

        //
        this.centerMonster = centerMonster;
        this.otherMonsters = otherMonsters;
        this._HVDirection = _HVDirection;
        this.needRand = needRand;

        //
        this.grids = [this.centerMonster.getParentNode()];
        var self = this;
        this.otherMonsters.forEach(
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
        var cmd0 = new Cmd_SubCreateMonsterDirection(this.centerMonster, this.otherMonsters);
        this.addCommand(cmd0);

        //创建命令
        var cmd1 = new Cmd_SubCreateMonsterDirection_Create(this.centerMonster.getColor(),
            this._HVDirection,
            this.grids,
            this.needRand);

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

//
cc.Cmd_CreateMonsterDirection.create = function(centerMonster, otherMonsters, swapDirection)
{
    var needRand = false;

    //
    var _HVDirection = _GetHVDirection(swapDirection);//Defines.DIRECTION.parseHorizontalOrVertical(swapDirection);
    if (_HVDirection == Defines.DIRECTION.NULL)
    {
        needRand = true;
        //走到这里说明没有换位的
       /* _HVDirection = Defines.DIRECTION.parseHorizontalOrVertical(
            Tools.randomEx(100) < 50 ? Defines.DIRECTION.TOP : Defines.DIRECTION.RIGHT
        );*/

        _HVDirection = _RandHVDirection();
    }

    //
    return new cc.Cmd_CreateMonsterDirection(centerMonster, otherMonsters, _HVDirection, needRand);
};
