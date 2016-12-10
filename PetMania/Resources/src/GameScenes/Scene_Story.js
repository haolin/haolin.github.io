var Scene_Story = cc.Scene.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        cc.associateWithNative(this, cc.Scene);
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Scene_Story";
    },

    //------------------------------------------------------------------------------------------------------------------
    onEnter: function()
    {
        this._super();
        cc.log("进入 Scene_Story 场景  **********************");
        cc.GUIStory.getInstance().openWindow(this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    onExit: function()
    {
        this._super();
        cc.log("离开 Scene_Story 场景  **********************");

        //
        cc.GUIStory.getInstance().closeWindow();
        cc.DataMng.getStory().finishStory(Story_0);
        this.removeAllChildren(true);
        return this;
    }
});

//
Scene_Story.create = function()
{
    return new Scene_Story();
};

Scene_Story.canChangeTo = function(storyName)
{
    var storyNameOk = storyName ? !cc.DataMng.getStory().isStoryFinish(storyName) : true;
    return !isTelcomOperators() && !Defines.IS_SMALL && Defines.PLATFORM.isMobile() && storyNameOk;
};

Scene_Story.changeTo = function(/*transTimer*/)
{
    /*cc.Director.getInstance().replaceScene(
        cc.TransitionFade.create(
            (transTimer || Defines.FPS * 10),
            Scene_Story.create()
        )
    );*/

    cc.Director.getInstance().replaceScene(Scene_Story.create());
};