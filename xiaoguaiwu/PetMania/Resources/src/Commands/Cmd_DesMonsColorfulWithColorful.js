//多彩和多彩互换 首先激活桌面上所有的 特殊糖果
//然后 再清除所有的普通糖果

//======================================================================================================================
var Cmd_SubColorfulWithColorful = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(objects, effectStartPosition)
    {
        this._super();
        this.objects = objects;
        this.isFinish = false;
        this.effectStartPosition = effectStartPosition;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //
        var finCount = 0;

        //
        var self = this;
        this.objects.forEach(
            function(an_obj, index, array)
            {
                cc.EffectMng.getInstance().displayColorfulEffectLight(
                    self.effectStartPosition,
                    an_obj.getPosition(),
                    function()
                    {
                        ++finCount;
                        if (finCount >= array.length)
                        {
                            self.isFinish = true;
                        }
                    }
                )
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        //
        this.objects.forEach(
            function(an_obj)
            {
                an_obj.toFire(gameLevel);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        return this.isFinish;
    }
});

//======================================================================================================================
var Cmd_SubColorfulWithColorfulGrids = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(grids, object)
    {
        this._super();
        this.grids = grids;
        this.object = object;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        var self = this;

        var visitor = cc.ScoreVisitorSingle.create(Defines.SCORE_TYPE.SCORE_DES_NORMAL);
        this.grids.forEach(
            function(a_grid)
            {
                a_grid.destroy(self.object, gameLevel, visitor);
            }
        );

        visitor.visitFinish();
        return this;
    }
});

//======================================================================================================================
cc.Cmd_DesMonsColorfulWithColorful = cc.ICommandGroup.extend({

    ctor: function(colorful0, colorful1)
    {
        this._super();

        ///
        this.colorful0 = colorful0;
        this.colorful1 = colorful1;
        this.specObjects = [];
        this.grids = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    prepare: function(gameLevel)
    {
        var itr = gameLevel.getTable().createIterForGrids();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            //
            var grid = itr.getCurrent();
            if (!grid || !(grid instanceof cc.NormalGrid))
            {
                continue;
            }

            //
            this.grids.push(grid);

            //雾霾下的高效除规则物体不激活
            var ceilObj = grid.getCeilObject();
            if (ceilObj instanceof cc.Obj_Haze)
            {
                continue;
            }

            //
            var middle = grid.getMiddleObject();
            if (middle && middle instanceof cc.Obj_Monster && !( middle instanceof cc.Obj_MonsterMine ) && middle.isSpecial())
            {
                if (middle instanceof cc.Obj_MonsterMineRad)
                {
                    cc.Assert(0);
                }

                this.specObjects.push(middle);
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        cc.DataMng.getInstance().continuousDestroy();
        cc.AudioMng.getInstance().playColorfulWithColorful();

		var createDestoryObj_color = new cc.Obj_MonsterColorfulDestroy();
				
		/*cc.DataMng.getInstance().recordDestroy*/_DiaryDestroyNodeObject(createDestoryObj_color,2);

        this.prepare(gameLevel);

        //
        var grid0 = this.colorful0.getParentNode();
        var grid1 = this.colorful1.getParentNode();

        //
        var visitor = cc.ScoreVisitorSingle.create(Defines.SCORE_TYPE.SCORE_NULL);
        this.colorful0.destroy(this.colorful0, gameLevel, visitor);
        this.colorful1.destroy(this.colorful1, gameLevel, visitor);
        visitor.visitFinish();

        //
        if (this.specObjects.length > 0)
        {
            //
            this.addCommand(
                new Cmd_SubColorfulWithColorful(this.specObjects, cc.pMidpoint(grid0.getPosition(), grid1.getPosition()))
            );

            //
            var cmd0 = cc.Cmd_EveryDestroy.create();
            cmd0.addNormalDesCommand = function()
            {

            };

            //
            this.addCommand(cmd0);
        }

        //
        this.addCommand(
            new Cmd_SubColorfulWithColorfulGrids(this.grids, this.colorful0)
        );

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
        _AddFlowerToFactorysPool(gameLevel);
        gameLevel.addCommand(cc.Cmd_EveryMoveNext.create());
        return this;
    }

});

cc.Cmd_DesMonsColorfulWithColorful.create = function(colorful0, colorful1)
{
    return new cc.Cmd_DesMonsColorfulWithColorful(colorful0, colorful1);
};



