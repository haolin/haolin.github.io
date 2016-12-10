//创建命令： 包装糖果消除之后创建的小的糖果

//======================================================================================================================
cc.Cmd_CreateMonsterUnwrap = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(centerObj, otherObjects, grids, delayTime)
    {
        this._super();

        //
        this._centerObj = centerObj;
        this._otherObjects = otherObjects;
        this._grids = grids;
        this._delayTime = delayTime;
        this._bubbleHandle = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        cc.AudioMng.getInstance().playWrapDestroy();

        if (_IsAnyBubbleCoverMonster(this._centerObj))
        {
            //被泡泡阻挡了 优先泡泡处理
            this._bubbleHandle = true;
            this._delayTime = 0;

            //
            var visitor = cc.ScoreVisitorGroup.create(Defines.SCORE_TYPE.SCORE_CREATE_UNWRAP);
            this._centerObj.destroy(this._centerObj, gameLevel, visitor);
            visitor.visitFinish();
        }
        else
        {
            cc.EffectMng.getInstance().displayMonsterDesWrap(this._centerObj.getPosition(), this._centerObj.getRadius());
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        //
        this._delayTime -= time;
        return this._delayTime <= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    _objects: function(gameLevel)
    {
        var self = this;

        var visitor = cc.ScoreVisitorGroup.create(Defines.SCORE_TYPE.SCORE_CREATE_UNWRAP);

        //先保存
        var grid =  this._centerObj.getParentNode();

        //删除源
        this._centerObj.destroy(this._centerObj, gameLevel, visitor);

        //删除对象
        this._otherObjects.forEach(
            function(each)
            {
                each.destroy(self._centerObj, gameLevel, visitor);
            }
        );

        //删除目标格子
        this._grids.forEach(
            function(each)
            {
                each.destroy(self._centerObj, gameLevel, visitor);
            }
        );

        visitor.visitFinish();

        //
        if (!grid.getMiddleObject())
        {
            var createNew = cc.Obj_MonsterUnwrap.create(
                this._centerObj.getColor(),
                this._centerObj.getRadius()
            );

            //删除结束
            grid.addNode(createNew);
            createNew.updateNodePosition();
            createNew.renderNode();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        if (!this._bubbleHandle)
        {
            //泡泡不处理 才走这个
            this._objects(gameLevel);
        }

        return this;
    }

});


//----------------------------------------------------------------------------------------------------------------------
var _CreateUnWrapStrategy = function(centerObject)
{
    //
    var res = [];
    Defines.DIRECTION.CIRCLE.concat().forEach(
        function(dir)
        {
            var dirGrid = centerObject.getParentNode().getGridByDirection(dir);
            if (dirGrid
                && dirGrid instanceof cc.NormalGrid
                && dirGrid.hasAnyChildrenNodes())
            {
                res.push(dirGrid);
            }
        }
    );

    return res;
};

//
cc.Cmd_CreateMonsterUnwrap.create = function(centerObj, otherObjects)
{
    return new cc.Cmd_CreateMonsterUnwrap(centerObj, otherObjects, _CreateUnWrapStrategy(centerObj), Defines.FPS * 6.18);
};
