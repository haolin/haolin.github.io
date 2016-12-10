//数据

//======================================================================================================================
cc.GameData = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_Key = "";
        this.m_Core = new safevar();

        //
        this.m_DBOperation = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    invalidSave: function()
    {
        return Defines.OS.isWindows() && !Defines.PLATFORM.isBrowser();
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(key, value, _DBOperation)
    {
        this.m_Key = key;
        this.m_Core.setValue(value);

        this.m_DBOperation = _DBOperation;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    set: function(value)
    {
        this.m_Core.setValue(value);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    get: function()
    {
        return this.m_Core.getValue();
    },

    //------------------------------------------------------------------------------------------------------------------
    save: function()
    {
        if (this.invalidSave())
        {
            return this;
        }

        if (this.m_DBOperation)
        {
            var value = this.get();
            cc.log("save  key =  " + this.m_Key + "  value = " + value);
            this.m_DBOperation.save(this.m_Key, value);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    load: function()
    {
        if (this.invalidSave())
        {
            return this;
        }

        if (this.m_DBOperation)
        {
            var value = this.m_DBOperation.load(this.m_Key);
            this.set(value);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return this.m_Key + " = " + this.get();
    }
});

//
cc.GameData.create = function(key, value, _DBOperation)
{
    var createNew = new cc.GameData();
    if (createNew)
    {
        createNew.init(key, value, _DBOperation);
    }

    return createNew;
};

//======================================================================================================================
cc.GameDataNumber = cc.GameData.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        this.m_MaxValue = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(key, value, _DBOperation, maxValue)
    {
        this._super(key, value, _DBOperation);
        this.m_MaxValue = parseInt(maxValue || Defines.MAX_NUMBER_DATA_VALUE);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    add: function(value)
    {
        var curValue = this.get();

        curValue += parseInt(value);
        if (curValue > this.m_MaxValue)
        {
            curValue = this.m_MaxValue;
        }

        this.set(curValue);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    sub: function(value)
    {
        var curValue = this.get();

        curValue -= parseInt(value);
        if (curValue < 0)
        {
            curValue = 0;
        }

        this.set(curValue);
        return this;
    }
});

//
cc.GameDataNumber.create = function(key, value, _DBOperation, max)
{
    if (!max)
    {
        cc.log("error 没有最大值的控制  = " + key);
    }

    var createNew = new cc.GameDataNumber();
    if (createNew)
    {
        createNew.init(key, value, _DBOperation, max);
    }

    return createNew;
};

//======================================================================================================================
cc.GameLevelHistoryScore = cc.GameDataNumber.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        this._faceValue = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    set: function(value)
    {
        this._faceValue = value;
        return this.m_DBOperation ? this.m_DBOperation.save(this.m_Key, value) : null;
    },

    //------------------------------------------------------------------------------------------------------------------
    get: function()
    {
        //return this.m_DBOperation ? this.m_DBOperation.load(this.m_Key) : null;
        this._faceValue = this.m_DBOperation ? this.m_DBOperation.load(this.m_Key) : 0;
        this._faceValue = this._faceValue || 0;
        return this.getFaceValue();
    },

    //------------------------------------------------------------------------------------------------------------------
    getFaceValue: function()
    {
        return this._faceValue;
    },

    //------------------------------------------------------------------------------------------------------------------
    save: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    load: function()
    {
        if (this.invalidSave())
        {
            return this;
        }

        if (this.m_DBOperation)
        {
            this._faceValue = this.m_DBOperation.load(this.m_Key) || 0;
        }

        return this.getFaceValue();
    }
});

//
cc.GameLevelHistoryScore.create = function(key, value, _DBOperation, max)
{
    var createNew = new cc.GameLevelHistoryScore();
    if (createNew)
    {
        createNew.init(key, value, _DBOperation, max);
    }

    return createNew;
};

//======================================================================================================================
cc.GameLevelScore = cc.GameDataNumber.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        this._scoreValue = 0;
        this._changeValue = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(key, value, _DBOperation, maxValue)
    {
        this._super(key, value, _DBOperation, maxValue);

        //
        this._scoreValue = value;
        this._changeValue = 0;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setScoreValue: function(value)
    {
        this._scoreValue = value;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getScoreValue: function()
    {
        return this._scoreValue;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateScoreValue: function()
    {
        var change = this._changeValue > 0 || this._changeValue < 0;
        if (!change)
        {
            return this;
        }

        //
        var curScoreValue = this.getScoreValue();
        curScoreValue += this._changeValue;
        this._changeValue = 0;

        if (curScoreValue > this.m_MaxValue)
        {
            curScoreValue = this.m_MaxValue;
        }
        else if (curScoreValue < 0)
        {
            curScoreValue = 0;
        }

        this.set(curScoreValue);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    set: function(value)
    {
        this._super(value);
        this.setScoreValue(value);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    add: function(value)
    {
        this._changeValue += value;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    sub: function(value)
    {
        this._changeValue -= value;
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

//
cc.GameLevelScore.create = function(key, value, _DBOperation, max)
{
    var createNew = new cc.GameLevelScore();
    if (createNew)
    {
        createNew.init(key, value, _DBOperation, max);
    }

    return createNew;
};


//======================================================================================================================
cc.GameDataBoolean = cc.GameData.extend({

    //------------------------------------------------------------------------------------------------------------------
    setFlag: function()
    {
        this.set(true);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    resetFlag: function()
    {
        this.set(false);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getFlag: function()
    {
        return this.get();
    }
});

//
cc.GameDataBoolean.create = function(key, value, _DBOperation)
{
    var createNew = new cc.GameDataBoolean();
    if (createNew)
    {
        createNew.init(key, value, _DBOperation);
    }

    return createNew;
};

//======================================================================================================================
cc.GameDataTime = cc.GameData.extend({


});

//
cc.GameDataTime.create = function(key, value, _DBOperation)
{
    var createNew = new cc.GameDataTime();
    if (createNew)
    {
        createNew.init(key, value, _DBOperation);
    }

    return createNew;
};

//======================================================================================================================
cc.GameDataMap = cc.GameData.extend({

    //------------------------------------------------------------------------------------------------------------------
    init: function(key, _DBOperation)
    {
        this._super(key, {}, _DBOperation);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setByKey: function(mapKey, value)
    {
        var mapValue = this.m_Core.getValue();
        mapValue[mapKey] = value;
        this.m_Core.setValue(mapValue);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getByKey: function(mapKey)
    {
        var mapValue = this.m_Core.getValue();
        return mapValue[mapKey];
    }

});

//
cc.GameDataMap.create = function(key, _DBOperation)
{
    var createNew = new cc.GameDataMap();
    if (createNew)
    {
        createNew.init(key, _DBOperation);
    }

    return createNew;
};


