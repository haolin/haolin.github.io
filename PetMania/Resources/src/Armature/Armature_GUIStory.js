
var Armature_GUIStory = ArmatureControl.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "Armature_GUIStory";
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this._super();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    removeArmaturesTexCache: function()
    {
        this._super();

        if (isTelcomOperators() || Defines.IS_SMALL)
        {
            return this;
        }

        //
        cc.ResourceMng.getInstance().removeFromCache(
            _FullPath + "GUIStory/story.plist",
            _FullPath + "GUIStory/story" + _ChooseImageFormatSuffixPVRCCZorPNG()
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    register: function()
    {
        this._super();

        //
        if (isTelcomOperators() || Defines.IS_SMALL)
        {
            return this;
        }

        //
        var filePath = _FullPath + "GUIStory/";

        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(
            "first",
            "",
            filePath + "story" + _ChooseImageFormatSuffixPVRCCZorPNG(),
            filePath + "story.plist",
            filePath + "first.xml");

        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(
            "second",
            "",
            filePath + "story" + _ChooseImageFormatSuffixPVRCCZorPNG(),
            filePath + "story.plist",
            filePath + "second.xml");

        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(
            "third",
            "",
            filePath + "story" + _ChooseImageFormatSuffixPVRCCZorPNG(),
            filePath + "story.plist",
            filePath + "third.xml");

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createArmature: function(name)
    {
        this._super();

        //
        if (isTelcomOperators() || Defines.IS_SMALL)
        {
            return null;
        }

        //
        var valid = (name == "first" ||  name == "second" || name == "third");
        if (!valid)
        {
            cc.Assert(0, "name = " + name);
        }

        return cc.Armature.create(name);
    }

});

//
Armature_GUIStory.create = function()
{
    var createNew = new Armature_GUIStory();
    createNew.init();
    return createNew;
};