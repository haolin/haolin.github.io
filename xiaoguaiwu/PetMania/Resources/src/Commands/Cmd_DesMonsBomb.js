/*
炸弹摧毁命令 默认是游戏结束
*/


//======================================================================================================================
cc.Cmd_DesMonsBomb = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(bomb)
    {
        this._super();
        this.m_Bomb = bomb;
    },

    //------------------------------------------------------------------------------------------------------------------
    //new
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //
        cc.EffectMng.getInstance().displayMonsterDesWrap(
            this.m_Bomb.getPosition(),
            1.5,
            null);

        //
        var parent = this.m_Bomb.getParentNode();

        //?????
        if (!parent)
        {
            return this;
        }

        //
        this.m_Bomb.destroy(this.m_Bomb, gameLevel);

        //
        var gridPos = parent.getGridPos();
        var validGrids = [];
        var radius = 1;

        //
        var min_x = gridPos.x - radius;
        var max_x = gridPos.x + radius;

        //
        var min_y = gridPos.y - radius;
        var max_y = gridPos.y + radius;

        //
        var table = gameLevel.getTable();
        for (var x = min_x; x <= max_x; ++x)
        {
            for (var y = min_y; y <= max_y; ++y)
            {
                var a_grid = table.getGrid(x, y);
                if (!a_grid
                    || a_grid instanceof cc.EmptyGrid)
                {
                    continue;
                }

                if (a_grid.getTopObject() instanceof cc.Obj_Boss)
                {
                    continue
                }

                validGrids.push(a_grid);
            }
        }

        //
        validGrids.forEach(
            function(a_grid)
            {
                var newHaze = cc.Obj_Haze.create(3);
                a_grid.addNode(newHaze);
                newHaze.updateNodePosition();
                newHaze.renderNode();
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //old
    /*start: function(gameLevel)
    {
        this._super(gameLevel);

        var object = this.m_Bomb;
        var color = object.getColor();
        var createNew = cc.Obj_Monster.create(color);
        var parent = object.getParentNode();

        //
        cc.EffectMng.getInstance().displayMonsterDesWrap(
            object.getPosition(),
            1.5,
            null);

        //
        object.destroy(object, gameLevel);

        if (!object.getParentNode())
        {
            if (parent && createNew)
            {
                parent.addNode(createNew);
                createNew.updateNodePosition();
                createNew.renderNode();
            }
        }
        else
        {
            if (createNew)
            {
                createNew.release();
                createNew = null;
            }
        }

        if (!parent)
        {
            return this;
        }

        var gridPos = parent.getGridPos();
        var validGrids = [];
        var radius = 1;

        //
        var min_x = gridPos.x - radius;
        var max_x = gridPos.x + radius;

        //
        var min_y = gridPos.y - radius;
        var max_y = gridPos.y + radius;

        //
        var table = gameLevel.getTable();
        for (var x = min_x; x <= max_x; ++x)
        {
            for (var y = min_y; y <= max_y; ++y)
            {
                var a_grid = table.getGrid(x, y);
                if (!a_grid
                    || a_grid instanceof cc.EmptyGrid
                    || parent == a_grid)
                {
                    continue;
                }

                if (a_grid.getTopObject() || a_grid.getBottomObject())
                {
                    continue;
                }

                validGrids.push(a_grid);
            }
        }

        //
        validGrids.forEach(
            function(a_grid)
            {
                var children = a_grid.getChildrenNodes();
                children.forEach(
                    function(child)
                    {
                        gameLevel.disposal(child);
                    }
                );

                var newIce = cc.Obj_Ice.create(3);
                a_grid.addNode(newIce);
                newIce.updateNodePosition();
                newIce.renderNode();
            }
        );

        return this;
    },*/

    //------------------------------------------------------------------------------------------------------------------
    finish: function()
    {
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------


});

cc.Cmd_DesMonsBomb.create = function(rule)
{
    return new cc.Cmd_DesMonsBomb(rule);
};
