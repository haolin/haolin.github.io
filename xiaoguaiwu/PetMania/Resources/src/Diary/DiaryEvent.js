//======================================================================================================================
var DiaryEvent = cc.IObject.extend({

    ctor: function(eventName)
    {
        this._super();

        //
        this._diaryEventName = eventName || this.description();
        this._diaryCreateTime = _LocalTime();
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getDiaryEventName: function()
    {
        return this._diaryEventName;
    },

    //------------------------------------------------------------------------------------------------------------------
    getDiaryCreateTime: function()
    {
        return this._diaryCreateTime;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return this.getDiaryEventName() + "|" + this.getDiaryCreateTime();
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "DiaryEvent";
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        return this;
    }
});

//
DiaryEvent.create = function()
{
    return (new DiaryEvent()).init();
};