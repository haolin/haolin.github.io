/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-8-12
 * Time: 上午11:20
 * Version: 1.0
 * Function: This file use to do manage drama.
 */

cc.DramaMng = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function()
    {
        this.m_DramaList = {};
    },
    //------------------------------------------------------------------------------------------------------------------
    init : function()
    {
        //this.registerDrama("Drama_Test", cc.Drama_Test.create());
        this.registerDrama("DramaLevelEnd_15",cc.DramaLevelEnd_15.create());
        this.registerDrama("DramaLevelStart_16",cc.DramaLevelStart_16.create());
        this.registerDrama("DramaLevelEnd_30",cc.DramaLevelEnd_30.create());
        this.registerDrama("DramaLevelStart_31",cc.DramaLevelStart_31.create());
        this.registerDrama("DramaLevelEnd_45",cc.DramaLevelEnd_45.create());
        this.registerDrama("DramaLevelStart_46",cc.DramaLevelStart_46.create());
        this.registerDrama("DramaLevelEnd_60",cc.DramaLevelEnd_60.create());
		this.registerDrama("DramaLevelStart_61",cc.DramaLevelStart_61.create());
		this.registerDrama("DramaLevelEnd_80",cc.DramaLevelEnd_80.create());
		this.registerDrama("DramaLevelStart_81",cc.DramaLevelStart_81.create());
		this.registerDrama("DramaLevelEnd_100",cc.DramaLevelEnd_100.create());
		this.registerDrama("DramaLevelStart_101",cc.DramaLevelStart_101.create());
		this.registerDrama("DramaLevelEnd_125",cc.DramaLevelEnd_125.create());
		this.registerDrama("DramaLevelStart_126",cc.DramaLevelStart_126.create());
		this.registerDrama("DramaLevelEnd_150",cc.DramaLevelEnd_150.create());

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    valid : function()
    {
        return true;
    },
    //------------------------------------------------------------------------------------------------------------------
    registerDrama : function(dramakey, drama)
    {
        if (!this.valid())
        {
            return;
        }

        this.m_DramaList[dramakey] = drama;

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    createDrama : function(dramakey)
    {
        if (!this.valid())
        {
            return null;
        }

        if (this.isFinishDrama(dramakey))
        {
            return null;
        }

        return this.m_DramaList[dramakey]
    },

    //------------------------------------------------------------------------------------------------------------------
    isFinishDrama : function(dramaName)
    {
        return cc.DataMng.getDrama().isDramaFinish(dramaName);
    }
});

cc.DramaMng._instance = null;
cc.DramaMng.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.DramaMng();
        this._instance.init();
    }

    return this._instance;
};
