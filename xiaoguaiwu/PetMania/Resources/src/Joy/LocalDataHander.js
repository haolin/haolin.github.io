/**
 * 保存本地信息
 */

function savePlayerInfo(){

    cc.log("savePlayerInfo 切换后台 存储用户的信息");

    //全局标记 当前的应用未激活
    cc.log("全局标记 当前的应用未激活");
    cc.GameManager.getInstance().appDeactive();

    //
    cc.log("存储");
    //cc.SafeFile.getInstance().set("playerInfo", g_player.toString());
    _SaveGame();

    //
    cc.log("修改界面逻辑");
    cc.GUIWindowsManager.getInstance().notifyAllWindowsAppDisactive();

    //
    cc.log("BI处理");
    BIMng.getInstance().logAppDisactive();

    //
    cc.log("savePlayerInfo 完成");
}

/**
 * 读取本地信息
 */
function loadPlayerInfo(){

    cc.log("loadPlayerInfo 后台->前台 读取用户的信息");

    //
    cc.log("全局标记 当前的应用激活");
    cc.GameManager.getInstance().appActive();

    //
    //cc.log("读取");
    //var playerInfo = cc.SafeFile.getInstance().get("playerInfo");
    //cc.log("playerInfo = " + playerInfo);

    //
    cc.log("界面处理");
    cc.GUIWindowsManager.getInstance().notifyAllWindowsAppActive();

    //
    cc.log("BI处理");
    BIMng.getInstance().logAppActive();

    //
    cc.log("更新音效和音乐");
    cc.AudioMng.getInstance().update();

    //
//    //cc.log("获取是否开始春节活动");
//    Game_ApplySpringFestivalSign.create();

    //
    cc.log("loadPlayerInfo 完成");
}