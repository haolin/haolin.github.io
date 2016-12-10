//临时 爆炸和爆炸互换 = 5格子范围消除

//======================================================================================================================
cc.Cmd_DesMonsWrapWithWrap = cc.ICommandGroup.extend({

    ctor: function(object0, object1, radius)
    {
        this._super();

        this.object0 = object0;
        this.object1 = object1;
        this.radius = radius || 2;
    },

    //------------------------------------------------------------------------------------------------------------------
    getGrids: function(gameLevel)
    {
        var dirtyMap = {};
        var grids = [];

        //
        var itr = gameLevel.getTable().createIterByRadius(
            this.object0.getParentNode(),
            this.object0.getRadius());

        //
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var grid = itr.getCurrent();
            if (grid)
            {
                dirtyMap[grid.getObjectID()] = true;
                grids.push(grid);
            }
        }

        //
        var itr1 = gameLevel.getTable().createIterByRadius(
            this.object1.getParentNode(),
            this.object1.getRadius());

        //
        for (itr1.first(); !itr1.isDone(); itr1.next())
        {
            var grid1 = itr1.getCurrent();
            if (grid1 && !dirtyMap[grid1.getObjectID()])
            {
                grids.push(grid1);
            }
        }

        return grids;
    },

    //------------------------------------------------------------------------------------------------------------------
    addUnwrap: function(parent, color)
    {
        if (!parent.getMiddleObject())
        {
            var unwrap = cc.Obj_MonsterUnwrap.create(color, this.radius);
            parent.addNode(unwrap);
            unwrap.updateNodePosition();
            unwrap.renderNode();

            return unwrap;
        }

        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    first: function(gameLevel)
    {
        var self = this;

        cc.DataMng.getInstance().continuousDestroy();
        cc.AudioMng.getInstance().playWrapDestroy();

        //
        this.object0.setRadius(this.radius);
        this.object1.setRadius(this.radius);

        //
        var grids = this.getGrids(gameLevel);

        //
        var midPos = cc.pMidpoint(this.object0.getPosition(), this.object1.getPosition());
        cc.EffectMng.getInstance().displayMonsterDesWrap(
            midPos,
            this.object0.getRadius());

        //
        var parent0 = this.object0.getParentNode();
        var parent1 = this.object1.getParentNode();

        //
        var visitor = cc.ScoreVisitorGroup.create(Defines.SCORE_TYPE.SCORE_DES_WRAP_WITH_WRAP);
        grids.forEach(
            function(each)
            {
                each.destroy(self.object0, gameLevel, visitor);
            }
        );

        //
        this.object0.destroy(this.object0, gameLevel, visitor);
        this.object1.destroy(this.object1, gameLevel, visitor);

        //
        visitor.visitFinish(midPos);

        //
        return [
            this.addUnwrap(parent0, this.object0.getColor()),
            this.addUnwrap(parent1, this.object1.getColor())
        ];
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        var self = this;

        //
        var newUnwraps = this.first(gameLevel);

        //
        var command1 = cc.Cmd_EveryMoveNext.create();
        command1.finish = function()
        {

        };

        this.addCommand(command1);

        newUnwraps.forEach(
            function(unwrap)
            {
                if (unwrap)
                {
                    self.addCommand(cc.Cmd_DesByWrap.create(unwrap));
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        _AddFlowerToFactorysPool(gameLevel);
        gameLevel.addCommand(cc.Cmd_EveryMoveNext.create());
        return this;
    }

});

//工厂方法
cc.Cmd_DesMonsWrapWithWrap.create = function(object0, object1)
{
    return new cc.Cmd_DesMonsWrapWithWrap(object0, object1, 2);
};

