
//======================================================================================================================
var DiaryManager = cc.IObject.extend({

    ctor: function()
    {
        //
        this._super();

        //
        this._diaryOfGameLevel = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "DiaryManager";
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    activeNewDiaryOfGameLevel: function(levelData)
    {
        var newDiary = Diary_GameLevel.create(levelData);
        this._diaryOfGameLevel.push(newDiary);
        return newDiary;
    },

    //------------------------------------------------------------------------------------------------------------------
    getCurrentDiaryOfGameLevel: function()
    {
        var len = this._diaryOfGameLevel.length;
        return this._diaryOfGameLevel[len - 1];
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanDiariesOfGameLevel: function()
    {
        this._diaryOfGameLevel = [];
        return this;
    }
});


DiaryManager._instance = null;
DiaryManager.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = (new DiaryManager()).init();
    }

    return this._instance;
};

//
var _DiaryDestroyNodeObject = function(object, count)
{
    //
    DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().addDestroyObjectToDiary(object, count);
    cc.DataMng.getInstance().notifyGUIObservers(NOTIFY_EVENT.FOR_SCORE);
};
