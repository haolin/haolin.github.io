//临时 多彩和条纹互换

//======================================================================================================================
cc.Cmd_DesHorizGrids = cc.ICommand.extend({

    ctor: function(horiz, center, object)
    {
        this._super();

        this.horiz = horiz;
        this.center = center;
        this._object = object;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //
        cc.DataMng.getInstance().continuousDestroy();

        //
        var table = gameLevel.getTable();
        for (var prop in this.horiz)
        {
            if (!this.horiz.hasOwnProperty(prop))
            {
                continue;
            }

            var arr = this.horiz[prop];
            if (arr.length > 0)
            {
                cc.EffectMng.getInstance().displayLineEffect(
                    cc.p(this.center.getPosition().x, arr[0].getPosition().y),
                    Defines.DIRECTION.HORIZONTAL,
                    0.618,
                    table.getCenterPosition()
                );
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        var self = this;

        cc.AudioMng.getInstance().playWrapWithDirection();

        var visitor = cc.ScoreVisitorSingle.create(Defines.SCORE_TYPE.SCORE_DES_WRAP_WITH_DIRECTION);
        for (var prop in this.horiz)
        {
            if (!this.horiz.hasOwnProperty(prop))
            {
                continue;
            }

            var arr = this.horiz[prop];
            arr.forEach(
                function(each)
                {
//                    var targetObj = each.getMiddleObject();
//                    if (targetObj && targetObj.description() == "Obj_MonsterDiamond"){
//                        each.destroy(self.object, gameLevel, visitor, false, self._object.getLevel());
//                    }
//                    else{
                        each.destroy(self._object, gameLevel, visitor);
//                    }
                }
            );
        }

        visitor.visitFinish();

        return this;
    }
});

//=====================================================================================================================
cc.Cmd_DesVertGrids = cc.ICommand.extend({

    ctor: function(vert, center, object)
    {
        this._super();

        //
        this.vert = vert;
        this.center = center;
        this._object = object;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        cc.DataMng.getInstance().continuousDestroy();


        //
        var table = gameLevel.getTable();
        for (var prop in this.vert)
        {
            if (!this.vert.hasOwnProperty(prop))
            {
                continue;
            }

            var arr = this.vert[prop];
            if (arr.length > 0)
            {
                cc.EffectMng.getInstance().displayLineEffect(
                    cc.p(arr[0].getPosition().x, this.center.getPosition().y),
                    Defines.DIRECTION.VERTICAL,
                    0.618,
                    table.getCenterPosition()
                );
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        var self = this;

        cc.AudioMng.getInstance().playWrapWithDirection();

        var visitor = cc.ScoreVisitorSingle.create(Defines.SCORE_TYPE.SCORE_DES_WRAP_WITH_DIRECTION);
        for (var prop in this.vert)
        {
            if (!this.vert.hasOwnProperty(prop))
            {
                continue;
            }

            var arr = this.vert[prop];
            arr.forEach(
                function(each)
                {
//                    var targetObj = each.getMiddleObject();
//                    if (targetObj && targetObj.description() == "Obj_MonsterDiamond"){
//                        var nowLevel = self._object.getLevel();
//                        each.destroy(self.object, gameLevel, visitor, false, nowLevel);
//                    }
//                    else{
                        each.destroy(self._object, gameLevel, visitor);
//                    }
                }
            );
        }

        visitor.visitFinish();

        return this;
    }
});

//======================================================================================================================
cc.Cmd_DesMonsWrapWithDirection = cc.ICommandGroup.extend({

    ctor: function(srcObject, dstObject, centerGrid)
    {
        //
        this._super();

        //
        this.srcObject = srcObject;
        this.dstObject = dstObject;
        this.centerGrid = centerGrid;
    },

    //------------------------------------------------------------------------------------------------------------------
    parse: function(gameLevel)
    {
        var gridPos = this.centerGrid.getGridPos();
        var table = gameLevel.getTable();

        //
        var horiz = {};
        for (var y = gridPos.y - 1; y <= gridPos.y + 1; ++y)
        {
            var row = table.getRow(y);
            row = row.filter(
                function(grid)
                {
                    return grid instanceof cc.NormalGrid;
                }
            );

            if (row.length > 0)
            {
                horiz[y] = row;
                //cc.log("horiz y = " + y);
                //cc.log("row = " + row);
            }
        }

        //
        var vert = {};
        for (var x = gridPos.x - 1; x <= gridPos.x + 1; ++x)
        {
            var col = table.getColumn(x);
            col = col.filter(
                function(grid)
                {
                    return grid instanceof cc.NormalGrid;
                }
            );

            if (col.length > 0)
            {
                vert[x] = col;
                //cc.log("vert x = " + x);
                //cc.log("col = " + col);
            }
        }

        return {
            horiz: horiz,
            vert: vert
        };
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //
        var visitor = cc.ScoreVisitorSingle.create(Defines.SCORE_TYPE.SCORE_DES_WRAP_WITH_DIRECTION);
        this.srcObject.destroy(this.srcObject, gameLevel, visitor);
        this.dstObject.destroy(this.dstObject, gameLevel, visitor);

        visitor.visitFinish();

        var parseRes = this.parse(gameLevel);

        //横3消除********************************************************
        var cmd0 = new cc.Cmd_DesHorizGrids(parseRes.horiz, this.centerGrid, this.srcObject);
        this.addCommand(cmd0);

        //一个连锁
        var cmd1 = cc.Cmd_EveryDestroy.create();
        cmd1.addNormalDesCommand = function(){};
        this.addCommand(cmd1);

        //加一个下落
        var cmd2 = cc.Cmd_EveryMoveNext.create();
        cmd2.finish = function(){};
        this.addCommand(cmd2);

        //竖3消除********************************************************
        var cmd3 = new cc.Cmd_DesVertGrids(parseRes.vert, this.centerGrid, this.srcObject);
        this.addCommand(cmd3);

        //一个连锁
        var cmd4= cc.Cmd_EveryDestroy.create();
        cmd4.addNormalDesCommand = function(){};
        this.addCommand(cmd4);

        //加一个下落
        var cmd5 = cc.Cmd_EveryMoveNext.create();
        cmd5.finish = function(){};
        this.addCommand(cmd5);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        _AddFlowerToFactorysPool(gameLevel);
        gameLevel.addCommand(cc.Cmd_EveryDestroy.create());
        return this;
    }
});

cc.Cmd_DesMonsWrapWithDirection.create = function(srcObject, dstObject)
{
    return new cc.Cmd_DesMonsWrapWithDirection(srcObject, dstObject, srcObject.getParentNode());
};
