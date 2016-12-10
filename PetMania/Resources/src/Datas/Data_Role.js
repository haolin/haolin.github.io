/*

var Data_Role = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_RoleId = null;
        this.m_ChannelIdentity = null;
        this.m_EverLoginHomeServer = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        //
        this.m_RoleId = cc.GameDataNumber.create("m_RoleId", Data_Role.INVALID_ROLE_ID, _DB_OP_GAME, Defines.MAX_NUMBER_DATA_VALUE);
        this.m_ChannelIdentity = cc.GameData.create("m_ChannelIdentity", "", _DB_OP_GAME);
        this.m_EverLoginHomeServer = cc.GameDataBoolean.create("m_EverLoginHomeServer", false, _DB_OP_GAME);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        //
        this.m_RoleId.set(Data_Role.INVALID_ROLE_ID);
        this.m_ChannelIdentity.set("");
        this.m_EverLoginHomeServer.resetFlag();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    save: function(roleId)
    {
        if (roleId && roleId != Data_Role.INVALID_ROLE_ID)
        {
            this.m_RoleId.set(roleId);
            this.m_ChannelIdentity.set(Data_Role.makeChannelIdentity(CHANNEL_NAME, roleId.toString()));
        }

        //
        this.m_RoleId.save();
        this.m_ChannelIdentity.save();
        this.m_EverLoginHomeServer.save();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    load: function()
    {
        this.m_RoleId.load();
        this.m_ChannelIdentity.load();
        this.m_EverLoginHomeServer.load();

        //cc.log("Data_Role = " + this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getRoleId: function()
    {
        return this.m_RoleId.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    getChannelIdentity: function()
    {
        return this.m_ChannelIdentity.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    isEverLoginHomeServer: function()
    {
        return this.m_EverLoginHomeServer.getFlag();
    },

    //------------------------------------------------------------------------------------------------------------------
    markEverLoginHomeServer: function()
    {
        this.m_EverLoginHomeServer.setFlag();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "Data_Role: roleId = " + this.getRoleId()
            + ", isEverLoginHomeServer = " + this.isEverLoginHomeServer()
            + ", m_ChannelIdentity = " + this.getChannelIdentity();
    }
});

//
Data_Role.INVALID_ROLE_ID = -1;

//
Data_Role.makeChannelIdentity = function(channelName, roleId)
{
    return "(" + channelName + ", " + roleId.toString() + ")";
};

Data_Role.create = function()
{
    var createNew = new Data_Role();
    if (createNew)
    {
        createNew.init();
    }

    return createNew;
};*/
