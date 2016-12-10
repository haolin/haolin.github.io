
//======================================================================================================================
cc.Cmd_DesMonstersGroups = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(allGroups)
    {
        this._super();
        this.allGroups = allGroups.concat();
    },

    //------------------------------------------------------------------------------------------------------------------
    _destroyObjects: function(gameLevel)
    {
        if (this.allGroups.length <= 0)
        {
            return this;
        }

        this.allGroups.forEach(
            function(each)
            {
                cc.DataMng.getInstance().continuousDestroy();
                cc.AudioMng.getInstance().playDestroy(each.objects[0]);

                var visitor = cc.ScoreVisitorGroup.create(Defines.SCORE_TYPE.SCORE_DES_NORMAL_GROUP);

                //删除中心
                each.center.destroy(null, gameLevel, visitor);
                each.objects.forEach(
                    function(each1)
                    {
                        //删除其他的
                        each1.destroy(null, gameLevel, visitor);
                    }
                );

                visitor.visitFinish();
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);
        this._destroyObjects(gameLevel);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        this._super(gameLevel);
        _AddFlowerToFactorysPool(gameLevel);

        return this;
    }

});

cc.Cmd_DesMonstersGroups.create = function(allGroups)
{
    return new cc.Cmd_DesMonstersGroups(allGroups);
};

cc.Cmd_DesMonstersGroups.createGroup = function(_center, _objects)
{
    return {center: _center, objects: _objects};
};