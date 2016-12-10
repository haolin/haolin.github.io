
//======================================================================================================================
cc.GUIBonus_Oper = cc.Class.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this.m_TotalBonus = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    decorate: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getCardsPos: function()
    {
        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    addBonus: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isFinish: function()
    {
        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function()
    {
        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    registerBonus: function(type, siftCount, bonusArr)
    {
        var bonusFunc = {};

        bonusFunc["_type"] = type;
        bonusFunc["_siftCount"] = siftCount;
        bonusFunc["_bonusArr"] = bonusArr;

        this.m_TotalBonus.push(bonusFunc);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    siftBonusData: function()
    {
        var bonusData = [];

        //
        this.m_TotalBonus.forEach(
            function(each)
            {
                var siftCount = each["_siftCount"];
                var bonusArr = each["_bonusArr"].concat();

                for (var index = 0; index < siftCount; index++)
                {
                    var siftIndex = Tools.randomEx(bonusArr.length) - 1;
                    bonusData.push(bonusArr[siftIndex]);
                    bonusArr.splice(siftIndex, 1);
                }
            }
        );

        //
        Tools.shuffle(bonusData);

        return bonusData;
    }

    //------------------------------------------------------------------------------------------------------------------
});