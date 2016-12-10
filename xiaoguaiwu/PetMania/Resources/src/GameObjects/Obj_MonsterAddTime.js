//添加时间的怪物

//======================================================================================================================
cc.Obj_MonsterAddTime = cc.Obj_Monster.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(color)
    {
        this._super(color);
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_MonsterAddTime";
    },

    //------------------------------------------------------------------------------------------------------------------
    destroy: function(desSrc, gameLevel, visitor)
    {
        //
        var hasChildren = this.hasAnyChildrenNodes();

        //
        this._super(desSrc, gameLevel, visitor);

        //
        if (!hasChildren && !gameLevel.getTimer().isTimeOut())
        {
            //我的特殊处理就是这个
            cc.DataMng.getInstance().addGameLevelTime(6, true);
        }

        return this;
    }
});

//
cc.Obj_MonsterAddTime.create = function(color)
{
    var _color = (color && color != Defines.COLOR.NULL) ? color : _RandColor();
    var createNew = new cc.Obj_MonsterAddTime(_color);
    if (createNew)
    {
        createNew.setRender(new MonsterAddTimeRender(createNew));
    }

    return createNew;
};










