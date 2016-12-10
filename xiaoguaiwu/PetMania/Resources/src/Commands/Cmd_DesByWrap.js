//3x3 格子销毁

//======================================================================================================================
cc.Cmd_DesByWrap = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(centerObject, delayTime)
    {
        this._super();
        this.centerObject = centerObject;
        this._delayTime = delayTime;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        //
        this._super(gameLevel);

        //
        cc.AudioMng.getInstance().playWrapDestroy();
		
		var createDestoryObj = new cc.Obj_MonsterWrapDestroy();
		_DiaryDestroyNodeObject(createDestoryObj);

        //
        cc.EffectMng.getInstance().displayMonsterDesWrap(
            this.centerObject.getPosition(),
            this.centerObject.getRadius());

        //
        var itr = gameLevel.getTable().createIterByRadius(
            this.centerObject.getParentNode(),
            this.centerObject.getRadius());

        var visitor = cc.ScoreVisitorSingle.create(Defines.SCORE_TYPE.SCORE_DES_BY_WRAP);
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var grid = itr.getCurrent();
            if (grid)
            {
                //cc.log("grid = " + grid);
                grid.destroy(this.centerObject, gameLevel, visitor);
            }
        }

        //最后删!!!!
        this.centerObject.destroy(this.centerObject, gameLevel, visitor);

        //
        visitor.visitFinish();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        this._delayTime -= time;
        return this._delayTime <= 0;
    }
});

cc.Cmd_DesByWrap.create = function(centerObject)
{
    return new cc.Cmd_DesByWrap(centerObject, Defines.FPS * 5);
};
