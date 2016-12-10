

//======================================================================================================================
var Diary_CreateObjectsOfGameLevel = DiaryEvent.extend({

    ctor: function()
    {
        //
        this._super(this.description());
        this._createObjects = {};
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Diary_CreateObjectsOfGameLevel";
    },

    //------------------------------------------------------------------------------------------------------------------
    addCreateEventToDiary: function(description)
    {
        if (!description || description == "")
        {
            return this;
        }

        this._createObjects[description] = this._createObjects[description] || 0;

        ++this._createObjects[description];

        return this._createObjects[description];
    },

    //------------------------------------------------------------------------------------------------------------------
    addCreateObjectToDiary: function(object)
    {
        if (!(object instanceof cc.INodeObject))
        {
            return this;
        }

        this._createObjects[object.description()] = this._createObjects[object.description()] || 0;

        if (object instanceof cc.Obj_Floor)
        {
            this._createObjects[object.description()] += object.getFloorCount();
        }
        else
        {
            ++this._createObjects[object.description()];
        }

        return this._createObjects[object.description()];
    },

    //------------------------------------------------------------------------------------------------------------------
    getCreateObjectContent: function(objDescription)
    {
        this._createObjects[objDescription] = this._createObjects[objDescription] || 0;
        return this._createObjects[objDescription];
    },
	
	setCreateObjectContent: function(objDescription, value)
    {
        this._createObjects[objDescription] = value || 0;
        return this._createObjects[objDescription];
    },

    //------------------------------------------------------------------------------------------------------------------
    logCreateObjects: function()
    {
        cc.log("输出创造的对象日记______________________________________________");

        var self = this;

        for (var desc in this._createObjects)
        {
            if (this._createObjects.hasOwnProperty(desc))
            {
                cc.log(" " + desc + " = " + self.getCreateObjectContent(desc));
            }
        }

        cc.log("_____________________________________________________________");

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getCreateObjectContentOfObjLock: function()
    {
        return this.getCreateObjectContent("Obj_Lock");
    },

    //------------------------------------------------------------------------------------------------------------------
    getCreateObjectContentOfObjFloor: function()
    {
        return this.getCreateObjectContent("Obj_Floor");
    }
});

Diary_CreateObjectsOfGameLevel.create = function()
{
    return (new Diary_CreateObjectsOfGameLevel()).init();
};
//======================================================================================================================


var Diary_DestroyObjectsOfGameLevel = DiaryEvent.extend({

    ctor: function()
    {
        //
        this._super(this.description());

        //
        this._destroyObjects = {};
        this._destroyMonstersByColor = {};
        this._createObjectsWhenGameLevelRunning = {};
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Diary_DestroyObjectsOfGameLevel";
    },

    //------------------------------------------------------------------------------------------------------------------
    addCreateObjectWhenGameLevelRunning: function(object)
    {
        //
        this._createObjectsWhenGameLevelRunning[object.description()] = this._createObjectsWhenGameLevelRunning[object.description()] || 0;
        ++this._createObjectsWhenGameLevelRunning[object.description()];

        //
        return this._createObjectsWhenGameLevelRunning[object.description()];
    },

    //------------------------------------------------------------------------------------------------------------------
    getCreateObjectWhenGameLevelRunning: function(description)
    {
        this._createObjectsWhenGameLevelRunning[description] = this._createObjectsWhenGameLevelRunning[description] || 0;
        return this._createObjectsWhenGameLevelRunning[description];
    },

    //------------------------------------------------------------------------------------------------------------------
    getCreateObjFlowerWhenGameLevelRunning: function(flowerLevel)
    {
        return this.getCreateObjectWhenGameLevelRunning("Obj_Flower_" + flowerLevel);
    },

    //------------------------------------------------------------------------------------------------------------------
    addDestroyObjectToDiary: function(object, count)
    {
        if (!(object instanceof cc.INodeObject))
        {
            return this;
        }

        //
        var addCount = count || 1;

        //
        if (object instanceof cc.INodeObject)
        {
            //
            var desc = object.description();

            //
            this._destroyObjects[desc] = this._destroyObjects[desc] || 0;
            this._destroyObjects[desc] += addCount;
        }

        if (object instanceof cc.Obj_Monster)
        {
            //
            var color = object.getColor();

            //
            this._destroyMonstersByColor[color] = this._destroyMonstersByColor[color] || 0;
            this._destroyMonstersByColor[color] += addCount;

        }

        return this;
    },
	setDestroyObjectToDiary: function(objDescription, value)
    {
        this._destroyObjects[objDescription] = value || 0;
        return this._destroyObjects[objDescription];
    },
    //------------------------------------------------------------------------------------------------------------------
    getDestroyObjectContent: function(objDescription)
    {
        this._destroyObjects[objDescription] = this._destroyObjects[objDescription] || 0;
        return this._destroyObjects[objDescription];
    },

    //------------------------------------------------------------------------------------------------------------------
    getDestroyMonsterByColorContent: function(color)
    {
        this._destroyMonstersByColor[color] = this._destroyMonstersByColor[color] || 0;
        return this._destroyMonstersByColor[color];
    }
});

Diary_DestroyObjectsOfGameLevel.create = function()
{
    return (new Diary_DestroyObjectsOfGameLevel()).init();
};

//======================================================================================================================
var Diary_GameLevel = DiaryEvent.extend({

    ctor: function(levelData)
    {
        //
        this._super(this.description());

        //
        this._levelData = levelData;

        //
        this._createDiary = null;
        this._destroyDiary = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        //
        this._createDiary = Diary_CreateObjectsOfGameLevel.create();
        this._destroyDiary = Diary_DestroyObjectsOfGameLevel.create();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return this._super() + "|" + this._levelData.NAME;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Diary_GameLevel";
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getCreateDiary: function()
    {
        return this._createDiary;
    },

    //------------------------------------------------------------------------------------------------------------------
    getDestroyDiary: function()
    {
        return this._destroyDiary;
    }
});

Diary_GameLevel.create = function(levelData)
{
    return (new Diary_GameLevel(levelData)).init();
};