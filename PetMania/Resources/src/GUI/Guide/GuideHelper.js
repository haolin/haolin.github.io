/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-10-16
 * Time: 下午3:57
 * Version: 1.0
 * Function: This file use to do...
 */

cc.GuideHelper = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function()
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    init : function()
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    isContainPointInRect : function(point, targetRect)
    {
        if (point.x > targetRect.x
            && point.x < targetRect.x + targetRect.width
            && point.y > targetRect.y
            && point.y < targetRect.y + targetRect.height)
        {
            return true;
        }

        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    isContainPointInButtonByIndex : function(point, index)
    {
        var targetRect = cc.GUIGameLevel.getInstance().getButtonItemRectForGuide(index);

        return this.isContainPointInRect(point,targetRect);
    },

    //------------------------------------------------------------------------------------------------------------------
    checkIsUnLockButton : function(black, index)
    {
        var targetRect = cc.GUIGameLevel.getInstance().getButtonItemRectForGuide(index);

        if (black.x == targetRect.x
            && black.y == targetRect.y
            && black.width == targetRect.width
            && black.height == targetRect.height)
        {
            return true;
        }

        return false;
    }
});

cc.GuideHelper._instance = null;
cc.GuideHelper.getInstance = function()
{
    if (!cc.GuideHelper._instance)
    {
        cc.GuideHelper._instance = new cc.GuideHelper();
    }

    return cc.GuideHelper._instance;
};