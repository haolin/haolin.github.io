
//======================================================================================================================
var FactoryMngPool = cc.Class.extend({

    ctor: function()
    {
        this._colorsMap = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "FactoryMngPoolEx";
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this._colorsMap = [];
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addObject: function(object)
    {
//        var color = object.getColor();

//        this._colorsMap = this._colorsMap || [];
        this._colorsMap.push(object);

        return this._colorsMap;
    },

    //------------------------------------------------------------------------------------------------------------------
    getSize: function()
    {
//        var array = [];
//
//        for (var colorName in this._colorsMap)
//        {
//            if (this._colorsMap.hasOwnProperty(colorName))
//            {
//                array = array.concat(this._colorsMap[colorName]);
//            }
//        }

        return this._colorsMap.length;
    },

    //------------------------------------------------------------------------------------------------------------------
    hasAny: function()
    {
        return this.getSize() > 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    popByColor: function(color)
    {
//		this._colorsMap = this._colorsMap || [];
		
		var shiftArr =  this._colorsMap.shift();

        return shiftArr[color];
    }
});

//
cc.FactoryMng = cc.A_RoundEndEvent.extend({

    m_FactoryObjects: [],

    m_FactoryColorsConfig: [],

    m_FactoryMngPool: new FactoryMngPool(),

    m_PipeFactoryObjects: [],

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this._super();

        //
        this.m_FactoryObjects = [];
        this.m_FactoryColorsConfig = [];
        this.m_FactoryMngPool.cleanUp();
        this.m_PipeFactoryObjects = [];

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "FactoryMng";
    },

    //------------------------------------------------------------------------------------------------------------------
    roundEnd: function(gameLevel)
    {
        this._super(gameLevel);
        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(gamelevel)
    {
        this.cleanUp();

        //
        var itr = gamelevel.getTable().createIterForGrids();//createIterForEmptyObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var grid = itr.getCurrent();
            if (!grid)
            {
                continue;
            }

            if (grid instanceof cc.EmptyGrid)
            {
                var emptyObj = grid.getContent();
                if (emptyObj && emptyObj instanceof cc.Obj_Factory)
                {
                    this.m_FactoryObjects.push(emptyObj)
                }
            }
            else if (grid instanceof cc.PipelineGrid)
            {
                var ceilObj = grid.getPipeFactory();
                if (ceilObj && ceilObj instanceof cc.Obj_PipeFactory)
                {
                    this.m_PipeFactoryObjects.push(ceilObj)
                }
            }
        }

        //
        var dirty = {};
        this.m_FactoryObjects.forEach(
            function(factory)
            {
                var builder = factory.getBuilder();
                if (!builder)
                {
                    return;
                }

                if (builder instanceof cc.FactoryBuilder_Colors)
                {
                    builder.getColorsConfig().forEach(
                        function(color)
                        {
                            dirty[color] = color;
                        }
                    );
                }
            }
        );

        //
        for (var prop in dirty)
        {
            if (dirty.hasOwnProperty(prop))
            {
                this.m_FactoryColorsConfig.push(dirty[prop]);
            }
        }

        //
        //cc.log("this.m_PipeFactoryObjects = " + this.m_PipeFactoryObjects);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getFacotryObjects: function()
    {
        return this.m_FactoryObjects;
    },

    //------------------------------------------------------------------------------------------------------------------
    getPipeFacotryObjects: function()
    {
        return this.m_PipeFactoryObjects;
    },

    //------------------------------------------------------------------------------------------------------------------
    getFactoryColorsConfig: function()
    {
        return this.m_FactoryColorsConfig;
    },

    //------------------------------------------------------------------------------------------------------------------
    getFactoryMngPool: function()
    {
        return this.m_FactoryMngPool;
    }
});

//
cc.FactoryMng._instance = null;
cc.FactoryMng.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.FactoryMng();
        cc.RoundEndEventsManager.getInstance().addChildEventMng(this._instance);
    }

    return this._instance;
};

//
var _GetFactoryObjects = function()
{
    return cc.FactoryMng.getInstance().getFacotryObjects().concat();
};

//
var _GetPipeFactoryObjects = function()
{
    return cc.FactoryMng.getInstance().getPipeFacotryObjects().concat();
};

//
var _GetFactoryColorsConfig = function()
{
    return cc.FactoryMng.getInstance().getFactoryColorsConfig().concat();
};

//
var _GetFactoryMngPool = function()
{
    return cc.FactoryMng.getInstance().getFactoryMngPool();
};



