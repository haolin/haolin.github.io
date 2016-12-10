//普通3消摧毁

//======================================================================================================================
cc.Cmd_DesMonsters = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(objects, visitorType)
    {
        this._super();

        this.objects = objects.concat();
        this.m_VisitorType = visitorType;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        cc.DataMng.getInstance().continuousDestroy();

        cc.AudioMng.getInstance().playDestroy();

        //分数访问者
        this.m_VisitorType = this.m_VisitorType || Defines.SCORE_TYPE.SCORE_DES_NORMAL;
        var visitor = cc.ScoreVisitorSingle.create(this.m_VisitorType);
        this.objects.forEach(
            function(each)
            {
                //销毁物体
                each.destroy(null, gameLevel, visitor);
            }
        );

        visitor.visitFinish();
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

//工厂方法
cc.Cmd_DesMonsters.create = function(objects, visitorType)
{
    return new cc.Cmd_DesMonsters(objects, visitorType);
};
