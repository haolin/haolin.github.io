//5消 爆炸糖 

//======================================================================================================================
cc.DestroyRule_MonsterWrap = cc.DestroyRule_MonsterBase.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(src)
    {
        this._super(src);
    },

    //------------------------------------------------------------------------------------------------------------------
    isSpecHeighRule: function()
    {
        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    can: function()
    {
        return this.getSrcObj().isFire() || this.getObjects().length > 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseImpl: function(grid, swapOther, swapDir, gameLevel)
    {
        this.parseImplBase(grid, swapOther, swapDir, gameLevel);
        this._afterParseImpl();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createCommand: function()
    {
        var cmd = this._super();
        if (cmd)
        {
            return cmd;
        }

        return cc.Cmd_CreateMonsterUnwrap.create(this.getSrcObj(), this.getObjects());
    },

    //------------------------------------------------------------------------------------------------------------------
    suppose: function()
    {
        var resGroups = this._super();

        var allDirections = Defines.DIRECTION.CROSS.concat();
        var srcObj = this.getSrcObj();
        var grid = srcObj.getParentNode();

        allDirections.forEach(
            function(dir)
            {
                var gridOfDir = grid.getGridByDirection(dir);
                if (!gridOfDir || !(gridOfDir instanceof cc.NormalGrid))
                {
                    return;
                }

                var hisObj = gridOfDir.getTouchEnabledObject();
                if (hisObj instanceof cc.Obj_MonsterDirection || hisObj instanceof cc.Obj_MonsterWrap)
                {
                    resGroups.push([hisObj]);
                }
            }
        );

        return resGroups;
    }
});

//工厂方法
cc.DestroyRule_MonsterWrap.create = function(srcObject)
{
    return new cc.DestroyRule_MonsterWrap(srcObject);
};














