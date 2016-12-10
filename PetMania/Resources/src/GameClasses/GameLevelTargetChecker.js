
//======================================================================================================================
var GameLevelTargetChecker = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_TargetColors = {};
        this.m_IsUnLockModel = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(gameLevelData)
    {
        if (!gameLevelData)
        {
            return this;
        }

        this.parseColor(gameLevelData);
        this.parseLock(gameLevelData);


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseColor: function(gameLevelData)
    {
        switch (gameLevelData.MODEL)
        {
        case Defines.TARGET_MODEL.MODEL_DESTROY:
            {
                for (var prop in gameLevelData.TARGET_DES_DATA)
                {
                    if (gameLevelData.TARGET_DES_DATA.hasOwnProperty(prop))
                    {
                        var a_target = gameLevelData.TARGET_DES_DATA[prop];
                        if (a_target.color && a_target.num > 0)
                        {
                            this.m_TargetColors[a_target.color] = true;
                        }
                    }
                }
            }
            break;

        default:
            break;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseLock: function(gameLevelData)
    {
        if (gameLevelData.MODEL == Defines.TARGET_MODEL.MODEL_UNLOCK)
        {
            this.m_IsUnLockModel = true;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    check: function(object)
    {
        if (!object)
        {
            return false;
        }

        if (object instanceof cc.Obj_Monster)
        {
            var color = object.getColor();
            return this.m_TargetColors[color];
        }

        if (this.m_IsUnLockModel)
        {
           return (object instanceof cc.Obj_Lock || object instanceof cc.Obj_Floor);
        }

        //
        return false;
    }

});

//======================================================================================================================

GameLevelTargetChecker.create = function(gameLevelData)
{
    var createNew = new GameLevelTargetChecker();
    if (createNew)
    {
        createNew.init(gameLevelData);
    }

    return createNew;
};

