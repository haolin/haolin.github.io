/*
//======================================================================================================================
var GUIPositionParser = cc.Class.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._positionMap = {};
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "GUIPositionParser";
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return this.description();
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._positionMap = {};
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _nameWithShuffix: function(name, shuffix)
    {
        var _shuffix = shuffix || "";
        return name + (_shuffix != "" ? "_" : "") + _shuffix;
    },

    //------------------------------------------------------------------------------------------------------------------
    _logOneMapValue: function(name, shuffix)
    {
        //
        cc.log("注册了 ＝ " + this._nameWithShuffix(name, shuffix));

        var mapValue = this._positionMap[this._nameWithShuffix(name, shuffix)];
        for (var key in mapValue)
        {
            if (mapValue.hasOwnProperty(key))
            {
                if (typeof(mapValue[key]) == "object"*/
/*mapValue[key] instanceof cc.Point*//*
)
                {
                    cc.log("key = " + key + ", value = ( x = " + mapValue[key].x + ", y = " + mapValue[key].y + ")");
                }
                else
                {
                    cc.log("key = " + key + ", value = " + mapValue[key]);
                }
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _logAllMapValues: function()
    {
        cc.log("打印所有注册的位置");
        for (var nameWithShuffix in this._positionMap)
        {
            if (this._positionMap.hasOwnProperty(nameWithShuffix))
            {
                this._logOneMapValue(nameWithShuffix, "");
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    register: function(name, shuffix, key, positionValue)
    {
        //
        var nameWithShuffix = this._nameWithShuffix(name, shuffix);
        this._positionMap[nameWithShuffix] = this._positionMap[nameWithShuffix] || {};

        //
        var value = this._positionMap[nameWithShuffix];
        if (value[key])
        {
            //cc.Assert(0, "nameWithShuffix = " + nameWithShuffix + ", key = " + key);
        }

        value[key] = positionValue;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getPosition: function(name, shuffix)
    {
        var key = Defines.IS_SMALL ? GUIPositionParser.key_small : GUIPositionParser.key_normal;
        var nameWithShuffix = this._nameWithShuffix(name, shuffix || "");
        this._positionMap[nameWithShuffix] = this._positionMap[nameWithShuffix] || {};
        return this._positionMap[nameWithShuffix][key];
    }
});

//
GUIPositionParser.key_normal = "key_normal";
GUIPositionParser.key_small = "key_small";

//
GUIPositionParser._instance = null;
GUIPositionParser.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new GUIPositionParser();
        this._instance.init();
    }

    return this._instance;
};*/
