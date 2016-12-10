/**
 * Created by hong.zhang on 2014/7/22.
 */


//======================================================================================================================
cc.GUITaskAndOthers = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return cc.GUITaskAndOthers.description();
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function ()
    {
        this._super();
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 100));
        this.getWindow().addChild(blockLayer, -1);

        var btnTask = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("btn_task_nor.png"),
            cc.Sprite.createWithSpriteFrameName("btn_task_sel.png"),
            this._btnTask,this);
//        btnTask.setPosition(cc.p(_ScreenWidth()/6,_ScreenHeight()/2));
        btnTask.setPosition(cc.p(_ScreenWidth()/3,_ScreenHeight()/2));

        var btnAchievement = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("btn_achievement_nor.png"),
            cc.Sprite.createWithSpriteFrameName("btn_achievement_sel.png"),
            this._btnAchievement,this);
//        btnAchievement.setPosition(cc.p(_ScreenWidth()/2,_ScreenHeight()/2));
        btnAchievement.setPosition(cc.p(_ScreenWidth()/3*2,_ScreenHeight()/2));

        var btnActivity = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("btn_activity_nor.png"),
            cc.Sprite.createWithSpriteFrameName("btn_activity_sel.png"),
            this._btnActivity,this);
        btnActivity.setPosition(cc.p(_ScreenWidth()/6*5,_ScreenHeight()/2));
        btnActivity.setVisible(false);

        var menuButton = cc.Menu.create(btnTask,btnAchievement,btnActivity);
        menuButton.setPosition(cc.p(0,0));
        blockLayer.addChild(menuButton);

        GUI._AddCloseButton(blockLayer, this.closeWindow, this);


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnTask: function()
    {
        this.closeWindow();
        cc.GUITaskKakao.getInstance().openWindow();
    },

    _btnAchievement: function()
    {
        this.closeWindow();
        cc.GUIAchievement.getInstance().openWindow();
    },

    _btnActivity: function()
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);
        //
        cc.ResourceMng.getInstance().addToCache(
            Resource._GUITask_plist,
            Resource._GUITask_png);

        cc.AudioMng.getInstance().playOpenWindow();
        this.getWindow().removeAllChildren(true);

        this.addContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        cc.AudioMng.getInstance().playCloseWindow();
        this.getWindow().removeAllChildren(true);

        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUITask_plist,
            Resource._GUITask_png);

        return this;
    }
});

//======================================================================================================================
cc.GUITaskAndOthers.description = function()
{
    return "GUITaskAndOthers";
};

//======================================================================================================================
cc.GUITaskAndOthers._instance = null;
cc.GUITaskAndOthers.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUITaskAndOthers();
        this._instance.init();
    }

    return this._instance;
};
