
var Armature_NewZone = ArmatureControl.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "Armature_NewZone";
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
        cc.ResourceMng.getInstance().removeFromCache(
            Resource.to_new_zone_plist,
            Resource.to_new_zone_png
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
        cc.ArmatureDataManager.getInstance().addArmatureFileInfo(
            "to_be_nomber_one",
            "",
            Resource.to_new_zone_png,
            Resource.to_new_zone_plist,
            Resource.to_new_zone_xml
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createArmature: function()
    {
        this._super();

        return cc.Armature.create("to_be_nomber_one");
    }

});

//
Armature_NewZone.create = function()
{
    var createNew = new Armature_NewZone();
    createNew.init();
    return createNew;
};