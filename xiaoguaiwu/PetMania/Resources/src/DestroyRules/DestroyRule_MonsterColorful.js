//5消 多彩糖 ObjNormalSuperB 的销毁规则

//======================================================================================================================
cc.DestroyRule_MonsterColorful = cc.IDestroyRule.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(src)
    {
        this._super(src);
        this.m_SwapOther = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    isSpecHeighRule: function()
    {
        return true;
    },

    //--------------------------------------------------------------------------------------------------------------
    can: function()
    {
        return this.getSrcObj().isFire();
    },

    //--------------------------------------------------------------------------------------------------------------
    parseImpl: function(grid, swapOther, swapDir, gameLevel)
    {
        if (!this.can())
        {
            return this;
        }

        //
        this.m_SwapOther = swapOther;

        if (swapOther
            && (swapOther instanceof cc.Obj_Monster)
            && (swapOther.isNormal() || swapOther instanceof cc.Obj_MonsterAddTime || swapOther instanceof cc.Obj_Bomb)
            )
        {
            this.getSrcObj().setFireColor(swapOther.getColor());
        }

        return this;
    },

    //--------------------------------------------------------------------------------------------------------------
    createCommand: function()
    {
        return cc.Cmd_DesByColor.create(this.getSrcObj(), this.m_SwapOther);
    },

    //------------------------------------------------------------------------------------------------------------------
    suppose: function()
    {
        var resGroups = [];

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
                if (!hisObj || !hisObj.getColor)
                {
                    return;
                }

                resGroups.push([hisObj]);
            }
        );

        return resGroups;
    }

});

cc.DestroyRule_MonsterColorful.create = function(srcObject)
{
    return new cc.DestroyRule_MonsterColorful(srcObject);
};










