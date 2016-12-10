
//======================================================================================================================
var PhotoLoad = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._roleIdToPhotoURL = {};
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this.cleanUpLocalData();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUpLocalData: function()
    {
        cc.log("清除了照片");
        this._roleIdToPhotoURL = {};
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _updateSelfPhotoOfMap: function()
    {
        //现在只处理大地图的东西
        if (cc.GUIMap.getInstance().isWindowOpen())
        {
            cc.log("_updateSelfPhotoOfMap");
            cc.GUIMap.getInstance().updatePlayerContent();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getPhotoURL: function(roleId)
    {
        return this._roleIdToPhotoURL[roleId] || "";
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function(datas)
    {
        //
        var self = this;
        var friends = [];
        var hasSelf = false;

        //
        datas.forEach(
            function(userPhoto)
            {
                //
                self._roleIdToPhotoURL[userPhoto.roleid] = userPhoto.url;

                if (userPhoto.roleid == cc.NodeSelf.getInstance().getRoleId())
                {
                    hasSelf = true;

                    //
                    cc.log("更新自己的头像 = " + userPhoto.url);
                    cc.NodeSelf.getInstance().setSelfPhoto(userPhoto.url);
                }
                else
                {
                    friends.push(userPhoto);
                }
            }
        );

        //
        if (hasSelf)
        {
            this._updateSelfPhotoOfMap();
        }

        //
        if (friends.length > 0)
        {
            FriendsMng.getInstance().loadUserPhotoUrl(friends.concat());
        }

        return this;
    }
});

PhotoLoad._instance = null;
PhotoLoad.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = (new PhotoLoad()).init();
    }

    return this._instance;
};

