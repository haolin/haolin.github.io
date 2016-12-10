/**
 *
 * @param progress   下载每个文件时的进度
 */
function downOneFileProgress(progress){
    cc.log("update : downOneFileProgress : " + progress);
    _Download_Progress = progress;
}

var apk_path = "";
/**
 *
 * @param path       下载完的资源路径
 */
function updateDownloadComplete(path){
    cc.log("update : updateDownloadComplete path : " + path);

    if(type_update == "apk"){
        cc.log(".......update download completed , type : " + type_update);
        removeCompletedMission();
        apk_path = path;
        _Notify_DownloadResult(true);
    }else{
        unZipFile(path);
    }


}
/**
 *
 */
function updateDownloadFail(){
    cc.log("update : updateDownLoadFail ... ");
    //startUpdate();
    _Notify_DownloadResult(false);
}

function updateUnzipFail(){
    cc.log("update : updateUnzipFail ..");
    //startUpdate();
    _Notify_DownloadResult(false);
}
/**
 *
 */
function updateUnzipCompleted(){
    cc.log("update : updateUnzipCompleted : ");
    removeCompletedMission();
    if(isNeedRestartApp()){
        _Notify_DownloadResult(true);
    }else{
       startUpdate();
    }

//    startUpdate();
}
function removeCompletedMission(){
    updateMissionQueue.shift(); //
}

function isNeedRestartApp(){
    return updateMissionQueue == 0;
}

function restartApp(){
    var configClass = wrapperConfig.Config.getInstance();
    configClass.restartApp();
}

function installApk(){
    var configClass = wrapperConfig.Config.getInstance();
	
	var installUrl = "";
	
	if(Defines.OS.isAndroid()){
        installUrl = apk_path;
    }else if(Defines.OS.isiOS()){
        installUrl = storeUri;
    }
	
	cc.log("installUrl = " + installUrl);
    configClass.installApk(installUrl);
}
/**
 * 下载一个文件
 * @param type
 * @param url
 */
function downloadOneFile(type , uri){
    var configClass = wrapperConfig.Config.getInstance();
    cc.log("getdownloadpath in js : " + configClass.GetDownloadPath());
    configClass.updateDownOneFile(configClass.GetDownloadPath(), type , uri);
}
/**
 * 解压一个zip文件
 * @param path
 */
function unZipFile(path){
  var configClass = wrapperConfig.Config.getInstance();
  configClass.updateUnzipFile(path , configClass.GetUnzipPath());
}

/**
 * 有没有需要更新的res or apk
 */
function isNeedUpdate(){
    return updateMissionQueue.length > 0;
}

/**
 * 开始更新
 */
function startUpdate(){
   if(updateMissionQueue.length == 0){
         return;
   }
   var mission = updateMissionQueue[0];
   downloadOneFile(mission.type , mission.uri);
}


