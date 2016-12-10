var Story_0 = "Story_0";

var Data_Story = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_FinishStory = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this.m_FinishStory = cc.GameDataMap.create("m_FinishStory", _DB_OP_GAME);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this.m_FinishStory.set({});
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    resetStory: function(stroyName)
    {
        this.m_FinishStory.setByKey(stroyName, true);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finishStory: function(stroyName)
    {
        //
        this.m_FinishStory.setByKey(stroyName, true);
        this.save();

        //
        //cc.log("finishStory Data_Story = " + this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isStoryFinish: function(stroyName)
    {
        //cc.log("isStoryFinish Data_Story = " + this);
        return this.m_FinishStory.getByKey(stroyName);
    },

    //------------------------------------------------------------------------------------------------------------------
    save: function()
    {
        this.m_FinishStory.save();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    load: function()
    {
        this.m_FinishStory.load();
        //cc.log("Data_Story = " + this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        var res = "";

        var allStories = this.m_FinishStory.get();

        for (var stroyName in allStories)
        {
            if (!allStories.hasOwnProperty(stroyName))
            {
                continue;
            }

            if (allStories[stroyName])
            {
                res += "(" + stroyName + " = " + allStories[stroyName] + "), "
            }
        }

        return res;
    }
});

//
Data_Story.create = function()
{
    var createNew = new Data_Story();
    if (createNew)
    {
        createNew.init();
    }

    return createNew;
};