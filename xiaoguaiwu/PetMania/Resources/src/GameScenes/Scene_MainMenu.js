var Scene_MainMenu = cc.Scene.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(first, forceOpen)
    {
        this._super();
        cc.associateWithNative(this, cc.Scene);
        this._first = first;
        this._forceOpen = forceOpen;
        cc.log("this._forceOpen = " + this._forceOpen);
//        this._COCOLogoDisappearTime = 1.5;
//        this._showGameCenter = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Scene_MainMenu";
    },

    //------------------------------------------------------------------------------------------------------------------
    onEnter: function()
    {
        this._super();
        cc.log("进入 Scene_MainMenu 场景  **********************");

        //
        var playMusic = cc.Sequence.create(
                cc.CallFunc.create(function(){cc.AudioMng.getInstance().playMainMenuSound();}),
//                cc.DelayTime.create(2),
                cc.CallFunc.create(function(){cc.AudioMng.getInstance().playMainMenuMusic();})
        );

        this.runAction(playMusic);
//        cc.AudioMng.getInstance().playMainMenuMusic();
        cc.GUIMainMenu.getInstance().openWindow(this, this._first, this._forceOpen);

        //关掉coco熊
        if (this._first)
        {
            _CloseCOCOLogo(1500);
            //GameCenterMng.getInstance().login();
        }

        //
        _TryToUpdateApp();

        //
//        _AutoLogin();
		
		NodeTime.getInstance().askServer();
        PartyTrackInterface.getInstance().eventSceneMainMenu();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    onExit: function()
    {
        this._super();
        cc.log("离开 Scene_MainMenu 场景  **********************");

        //
        cc.GUIMainMenu.getInstance().closeWindow();
        this.removeAllChildren(true);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    update: function(dt)
    {
//        if (this._first && !this._showGameCenter)
//        {
//            this._COCOLogoDisappearTime -= dt;
//            if (this._COCOLogoDisappearTime <= 0)
//            {
//                this._showGameCenter = true;
//                this._COCOLogoDisappearTime = 0;
//                GameCenterMng.getInstance().login();
//            }
//        }

        return this;
    }
});

//
Scene_MainMenu.create = function(first, forceOpen)//添加了从设置面板切换回来之后强制进入菜单的开关
{
    var newScene = new Scene_MainMenu(first, forceOpen);
    if (newScene)
    {
        newScene.unscheduleAllCallbacks();
        newScene.schedule(newScene.update, Defines.FPS);
    }

    return newScene;
};
