//创建命令： 创建普通矿石
/*

//======================================================================================================================
cc.Cmd_CreateMineDiamond = cc.ICommandGroup.extend({

    ctor: function(centerObj)
    {
        this._super();

        //
        this.centerObj = centerObj;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);
		cc.AudioMng.getInstance().playDiamondGone();
		
        var parent = this.centerObj.getParentNode();

        if (!parent)
        {
            return this;
        }

        //
        this.centerObj.destroy(this.centerObj, gameLevel);

        var createNew = cc.Obj_MonsterMine.create(true);
        parent.addNode(createNew);
        createNew.updateNodePosition();
        createNew.renderNode();

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
        this._super(gameLevel);
        return this;
    }
});

cc.Cmd_CreateMineDiamond.create = function(centerObj)
{
    return new cc.Cmd_CreateMineDiamond(centerObj);
};
*/
