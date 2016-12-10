/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-8-12
 * Time: 上午11:28
 * Version: 1.0
 * Function: This file use to provide a base class.
 */

cc.DramaBase = cc.IDrama.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return cc.IDrama.description();
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cancel: function()
    {
        return this;
    }

});

cc.DramaBase.create = function()
{
    return new cc.IDrama();
};

cc.DramaBase.description = function()
{
    return "IDrama";
};
