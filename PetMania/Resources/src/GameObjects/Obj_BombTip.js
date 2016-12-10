

//======================================================================================================================
cc.Obj_BombTip = cc.Obj_Bomb.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(color, bombTime, start)
    {
        this._super(color, bombTime, start);
    },

    //--------------------------------------------------------------------------------------------------------------
    tick: function()
    {
        if (!this._super())
        {
            return false;
        }

		var gameLevelData = cc.DataMng.getInstance().getCurLevelData();
        if (gameLevelData)
        {
            cc.DataMng.getInstance().setGameLevelGuidFinishValue(gameLevelData.NAME,false);
            cc.State_GameLevel.getInstance().setGuideState();
            cc.Obj_BombTip._globalBombTip = this;
        }

		return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    destroy: function(desSrc, gameLevel, visitor)
    {
        this._super(desSrc, gameLevel, visitor);

		//
		var gameLevelData = cc.DataMng.getInstance().getCurLevelData();
        if (gameLevelData)
        {
            cc.DataMng.getInstance().setGameLevelGuidFinishValue(gameLevelData.NAME,false);
            cc.State_GameLevel.getInstance().setGuideState();
        }

        return this;
    }
});

//工厂方法
cc.Obj_BombTip.create = function(color, bombTime, start)
{
    cc.BombsMng.getInstance();

    var createNew = new cc.Obj_BombTip(color, bombTime, start);
    if (createNew)
    {
        createNew.setRender(new MonsterBombRender(createNew));
    }

    return createNew;
};

cc.Obj_BombTip._globalBombTip = null;
cc.Obj_BombTip.getNowTip = function()
{
    return cc.Obj_BombTip._globalBombTip;
};
