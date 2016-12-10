//游戏的命名空间

(function()
{
    cc.log("Release.js");

    //
    //_SaveGame();

    //
    BIMng.getInstance().logCloseGame();

    //
    cc.GUIWindowsManager.getInstance().release();

    //
    //cc.ArmatureDataMng.getInstance().cleanUp();

    //
    cc.Director.getInstance().getScheduler().unscheduleAllCallbacks();

})();
