//临时 条纹和条纹互换

//======================================================================================================================
cc.Cmd_DesMonsDirectionWithDirection = cc.ICommand.extend({

    ctor: function(object0, object1)
    {
        this._super();

        this.object0 = object0;
        this.object1 = object1;
    },

    //------------------------------------------------------------------------------------------------------------------
    parse: function(gameLevel)
    {
        //
        var table = gameLevel.getTable();
        var gridPos = this.object0.getParentNode().getGridPos();

        //
        var row = table.getRow(gridPos.y);
        row = row.filter(
            function(grid)
            {
                return grid instanceof cc.NormalGrid;
            }
        );

        //
        var col = table.getColumn(gridPos.x);
        col = col.filter(
            function(grid)
            {
                return grid instanceof cc.NormalGrid;
            }
        );

        return [].concat(row).concat(col);
    },

	getLowLevel: function(){
		if (this.object0.getLevel() > this.object1.getLevel()){
			return this.object1.getLevel();
		}
		else {
			return this.object0.getLevel();
		}
	},

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        var self = this;
		
		var createDestoryObj = new cc.Obj_MonsterDirectionDestroy();
		/*cc.DataMng.getInstance().recordDestroy*/_DiaryDestroyNodeObject(createDestoryObj, 2);
        //
        cc.DataMng.getInstance().continuousDestroy();
        cc.AudioMng.getInstance().playWrapWithDirection();

        //
        var grids = this.parse(gameLevel);

        //
        cc.EffectMng.getInstance().displayLineEffect(
            this.object0.getPosition(),
            Defines.DIRECTION.HORIZONTAL,
            0.618,
            gameLevel.getTable().getCenterPosition()
        );

        //
        cc.EffectMng.getInstance().displayLineEffect(
            this.object0.getPosition(),
            Defines.DIRECTION.VERTICAL,
            0.618,
            gameLevel.getTable().getCenterPosition()
        );

        //
        gameLevel.disposal(this.object0);
        gameLevel.disposal(this.object1);


        var visitor = cc.ScoreVisitorSingle.create(Defines.SCORE_TYPE.SCORE_DES_DIRECTION_WITH_DIRECTION);

        grids.forEach(
            function(each)
            {
//                var targetObj = each.getMiddleObject();
//                if (targetObj && targetObj.description() == "Obj_MonsterDiamond"){
//                    each.destroy(self.object, gameLevel, visitor, false, self.getLowLevel());
//                }
//                else{
                    each.destroy(self.object0, gameLevel, visitor);
//                }
            }
        );

        visitor.visitFinish();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        //
        _AddFlowerToFactorysPool(gameLevel);

        //
        gameLevel.addCommand(cc.Cmd_EveryDestroy.create());
        gameLevel.addCommand(cc.Cmd_EveryMoveNext.create());

        return this;
    }

});

cc.Cmd_DesMonsDirectionWithDirection.create = function(object0, object1)
{
    return new cc.Cmd_DesMonsDirectionWithDirection(object0, object1);
};
