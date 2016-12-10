//直线摧毁

//======================================================================================================================
cc.Cmd_DesByDirection = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(object, otherObjects, grids)
    {
        this._super();

        //
        this.object = object;
        this.otherObjects = otherObjects;
        this.grids = grids;

    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //
        cc.AudioMng.getInstance().playDirectionDestroy();

        if (_IsAnyBubbleCoverMonster(this.object))
        {
            //
            var visitor = cc.ScoreVisitorGroup.create(Defines.SCORE_TYPE.SCORE_DES_NORMAL_GROUP);
            this.object.destroy(this.object, gameLevel, visitor);
            visitor.visitFinish();
        }
        else
        {
            //
            cc.EffectMng.getInstance().displayLineEffect(
                this.object.getPosition(),
                this.object.getHVDirection(),
                (this.object instanceof cc.Obj_MonsterDirectionSpeed ? 0.618 : 0.618),
                gameLevel.getTable().getCenterPosition()
            );

            //
            this._objects(gameLevel);
            this._grids(gameLevel);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _objects: function(gameLevel)
    {
        var self = this;
		
		var createDestoryObj = new cc.Obj_MonsterDirectionDestroy();
		_DiaryDestroyNodeObject(createDestoryObj);
			
        //正常消除
        var visitorNormal = cc.ScoreVisitorGroup.create(Defines.SCORE_TYPE.SCORE_DES_NORMAL_GROUP);
        //
        this.object.destroy(this.object, gameLevel, visitorNormal);
        this.otherObjects.forEach(
            function(x)
            {
                    x.destroy(self.object, gameLevel, visitorNormal);
            }
        );

        //
        visitorNormal.visitFinish();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _grids: function(gameLevel)
    {
        var self = this;

        //特殊消除，即行内除正常消除以外的消除
        var visitorEx = cc.ScoreVisitorSingle.create(Defines.SCORE_TYPE.SCORE_DES_BY_DIRECTION);
        this.grids.forEach(
            function(x)
            {
//				var targetObj = x.getMiddleObject();
//				if (targetObj && targetObj.description() == "Obj_MonsterDiamond"){
//                    x.destroy(self.object, gameLevel, visitorEx, false, self.object.getLevel());
//                }
//                else{
					x.destroy(self.object, gameLevel, visitorEx);
//				}
            }
        );

        visitorEx.visitFinish();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function()
    {
        return this;
    }
});

//策略!!!!!
var _DirectionStrategy = function(centerObject, otherObjects)
{
    //
    var dirty = {};
    otherObjects.forEach(
        function(each)
        {
            //添加标记
            dirty[each.getParentNode().getObjectID()] = true;
        }
    );

    //拿水平方向
    var dirArray =  (Defines.DIRECTION.HORIZONTAL == centerObject.getHVDirection())?
        [Defines.DIRECTION.LEFT, Defines.DIRECTION.RIGHT]
        : [Defines.DIRECTION.TOP, Defines.DIRECTION.BOTTOM];

    //添加额外删除对象的格子
    var resGrids = [];
    dirArray.forEach(
        function(a_direction)
        {
            for (var next = centerObject.getParentNode().getGridByDirection(a_direction);
                 next;
                 next = next.getGridByDirection(a_direction))
            {
                if (!(next instanceof cc.NormalGrid) || dirty[next.getObjectID()])
                {
                    continue;
                }

                if (next.hasAnyChildrenNodes())
                {
                    resGrids.push(next);
                }
            }
        }
    );

    return resGrids;
};

//工厂方法
cc.Cmd_DesByDirection.create = function(object, otherObjects)
{
    return new cc.Cmd_DesByDirection(object, otherObjects, _DirectionStrategy(object, otherObjects));
};
