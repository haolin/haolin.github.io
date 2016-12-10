
var _PhotoSize = function()
{
    return cc.size(60 * Defines.BASE_SCALE, 60 * Defines.BASE_SCALE);
};

//TODO 多触摸可以同时点击两个关卡,临时解决方案
var _MapItem_CanHandleEvent = function()
{
    var conditionGUI = [cc.GUIGameLevelStart, cc.GUIMapCoke, cc.GUIMapNewZoneShare];
    for (var index = 0; index < conditionGUI.length; index++)
    {
        var assignGUI = conditionGUI[index];
        if (assignGUI.getInstance().isWindowOpen())
        {
            return false;
        }
    }

    return true;
};

//======================================================================================================================
cc.GUIMapItem = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(mapZone, position)
    {
        //父节点
        this.m_MapZone = mapZone;
        this.m_Position = position;
        this.m_WayPointsPos = [];

        this.m_MainRender = null;
        this.m_WayPoints = [];

        this.m_Lock = true;
    },

    //------------------------------------------------------------------------------------------------------------------
    initWayPointsData: function(index ,position)
    {
        this.m_WayPointsPos[index] = position;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    loadContent: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateContent: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    releaseContent: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMainRender: function()
    {
        return this.m_MainRender;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMapZone: function()
    {
        return this.m_MapZone;
    },

    //------------------------------------------------------------------------------------------------------------------
    getPosition: function()
    {
        return this.m_Position;
    },

    //------------------------------------------------------------------------------------------------------------------
    setLock: function(isLock)
    {
        this.m_Lock = isLock;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isLock: function()
    {
        return this.m_Lock;
    },

    //------------------------------------------------------------------------------------------------------------------
    getWayPoints: function()
    {
        return this.m_WayPoints;
    },

    //------------------------------------------------------------------------------------------------------------------
    convertToWindowSpace: function()
    {
        var zonesBackGround = cc.GUIMap.getInstance().getZonesBackGround();
        var boundBox = zonesBackGround.getBoundingBox();

        var zonePosition = this.m_MapZone.getWindow().getPosition();
        var itemPosition = cc.pAdd(zonePosition, this.m_Position);
        itemPosition = cc.pMult(itemPosition, zonesBackGround.getScale());

        return cc.pAdd(itemPosition, cc.p(boundBox.x, boundBox.y));
    },

    //------------------------------------------------------------------------------------------------------------------
    convertToMapSpace: function()
    {
        var zonePosition = this.m_MapZone.getWindow().getPosition();
        return cc.pAdd(zonePosition, this.m_Position);
    },

    //------------------------------------------------------------------------------------------------------------------
    getPlayerContentPosition: function()
    {
        return cc.p(0, 0);
    },

    //------------------------------------------------------------------------------------------------------------------
    getFriendPhotoPosition: function()
    {
        return cc.p(0, 0);
    },

    //------------------------------------------------------------------------------------------------------------------
    handleMapItemEnter: function(isAnimate)
    {
        if (!this.m_MainRender)
        {
            return this;
        }

        if (isAnimate)
        {
            var enterAction = cc.ScaleTo.create(0.08, 1);
            enterAction.setTag(1001);

            this.m_MainRender.stopActionByTag(1001);
            this.m_MainRender.runAction(enterAction);
        }
        else
        {
            this.m_MainRender.setScale(1);
        }

        this.m_WayPoints.forEach(function(wayPoint)
        {
            wayPoint.setVisible(true);
        });

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleMapItemLeave: function(isAnimate)
    {
        if (!this.m_MainRender)
        {
            return this;
        }

        if (isAnimate)
        {
            var leaveAction = cc.ScaleTo.create(0.08, 0);
            leaveAction.setTag(1001);

            this.m_MainRender.stopActionByTag(1001);
            this.m_MainRender.runAction(leaveAction);
        }
        else
        {
            this.m_MainRender.setScale(0);
        }

        this.m_WayPoints.forEach(function(wayPoint)
        {
            wayPoint.setVisible(false);
        });

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleEvent: function()
    {
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});


cc.GUIMapItem.create = function(mapZone, position)
{
    return new cc.GUIMapItem(mapZone, position);
};