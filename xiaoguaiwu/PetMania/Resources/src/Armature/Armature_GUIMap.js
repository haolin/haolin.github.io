
var Armature_GUIMap = ArmatureControl.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "Armature_GUIMap";
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

        //
       /* cc.ResourceMng.getInstance().removeFromCache(
            _MainMapPath + "mushroom.plist",
            _MainMapPath + "mushroom" + _ChooseImageFormatSuffixPVRorPNG()//"mushroom.png"
        );

        //
        cc.ResourceMng.getInstance().removeFromCache(
            _MainMapPath + "duck.plist",
            _MainMapPath + "duck" + _ChooseImageFormatSuffixPVRorPNG()//"duck.png"
        );

        //
        cc.ResourceMng.getInstance().removeFromCache(
            _MainMapPath + "flower.plist",
            _MainMapPath + "flower" + _ChooseImageFormatSuffixPVRorPNG()//"flower.png"
        );
*/
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
        //var filePath = _MainMapPath + "";

        /*cc.ArmatureDataManager.getInstance().addArmatureFileInfo(
            "mushrooms",
            "",
            filePath + "mushroom" + _ChooseImageFormatSuffixPVRorPNG(),//"mushroom.png",
            filePath + "mushroom.plist",
            filePath + "mushroom.xml");

        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(
            "bluestar_yellow_duck_star_ok",
            "",
            filePath + "duck" + _ChooseImageFormatSuffixPVRorPNG(),//"duck.png",
            filePath + "duck.plist",
            filePath + "duck.xml");

        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(
            "flower_star_ok",
            "",
            filePath + "flower" + _ChooseImageFormatSuffixPVRorPNG(),//"flower.png",
            filePath + "flower.plist",
            filePath + "flower.xml");*/

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createArmature: function(name)
    {
        this._super();

        var valid = (name == "mushrooms"
            || name == "bluestar_yellow_duck_star_ok"
            || name == "flower_star_ok");
        if (!valid)
        {
            cc.Assert(0, "name = " + name);
        }

        return cc.Armature.create(name);
    }

});

//
Armature_GUIMap.create = function()
{
    var createNew = new Armature_GUIMap();
    createNew.init();
    return createNew;
};