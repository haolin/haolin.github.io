//创建命令： 创建多彩糖果

//======================================================================================================================
var Cmd_SubCreateMonsterColorful = cc.ICommand.extend({

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
        cc.AudioMng.getInstance().playCreateColorful(this.center);

        //
        var visitor = cc.ScoreVisitorGroup.create(Defines.SCORE_TYPE.SCORE_CREATE_COLORFUL);

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



//======================================================================================================================
var Cmd_SubCreateMonsterColorful_Create = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(grids, isSwap)
    {
        this._super();

        //
        this.grids = grids;
        this.isSwap = isSwap;
        this.centerGrid = this.center(grids);
    },

    //------------------------------------------------------------------------------------------------------------------
    center: function(grids)
    {
        var table = grids[0].getParentNode();

        //
        var sumX = 0;
        var sumY = 0;
        grids.forEach(
            function(each)
            {
                var pos = each.getPosition();
                sumX += pos.x;
                sumY += pos.y;
            }
        );

        //计算中点
        var gridPos = cc.p(sumX/grids.length, sumY/grids.length);
        return table.getGridByPos(gridPos);
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

        var finalGrid = this.grids[0];
        if (!this.isSwap)
        {
            if (this.centerGrid && !this.centerGrid.getMiddleObject())
            {
                finalGrid = this.centerGrid;
            }
            else
            {
                finalGrid = Tools.arrayRandom(this.grids);
            }
        }

        //
        var createNew = cc.Obj_MonsterColorful.create();
        finalGrid.addNode(createNew);
        createNew.updateNodePosition();
        createNew.renderNode();

        //
        return this;
    }
});

//======================================================================================================================
cc.Cmd_CreateMonsterColorful = cc.ICommandGroup.extend({

    ctor: function(centerObj, othersObjects, isSwap)
    {
        this._super();

        //
        this.centerObj = centerObj;
        this.othersObjects = othersObjects;
        this.isSwap = isSwap;

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
        var cmd0 = new Cmd_SubCreateMonsterColorful(this.centerObj, this.othersObjects);
        this.addCommand(cmd0);

        //创建命令
        var cmd1 = new Cmd_SubCreateMonsterColorful_Create(this.grids, this.isSwap);
        this.addCommand(cmd1);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        return this.m_Commands.length <= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        this._super(gameLevel);
        return this;
    }
});

cc.Cmd_CreateMonsterColorful.create = function(centerObj, othersObjects, swapDirection)
{
    return new cc.Cmd_CreateMonsterColorful(centerObj, othersObjects, (swapDirection != Defines.DIRECTION.NULL));
};
