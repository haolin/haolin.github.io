
var apkSize = {
    small : "small",
    normal : "normal",
    large : "large"
}

var apkType = apkSize.normal;

cc.updateApp = cc.Class.extend({

     updateAll : function(sucCall , failCall){
         var url = getUpdateUrl() + "/ver.json";
         cc.log("url : " + url);
         cc.NodeClient.getInstance().ajax(url , {'method' : 'POST'} , function(response , options , result){
            do{
                cc.log("update all : responese " + response + " options : " + options + " result " + result);
                if(!result.ok){
                   break;
                }
                sucCall(response);
                return;
            }while(false);
             failCall();
         });
     }
});

function getUpdateUrl(){
    if(Defines.IS_SMALL){
        apkType = apkSize.small;
    }else{
        apkType = apkSize.normal;
    }
    
    var url = UPDATE_IP + "/v/" + getPlatformName() + "_" + CHANNEL + "/" + GAME_VERSION + "/" + apkType;
    return url;
}

cc.updateApp._instance = null;
cc.updateApp.getInstance = function(){
    if(cc.updateApp._instance == null){
       cc.updateApp._instance = new cc.updateApp();
    }
    return cc.updateApp._instance;
}

function getPlatformName(){
    var platform = "";
    if(Defines.OS.isAndroid()){
        platform = "android";
    }else if(Defines.OS.isiOS()){
        platform = "ios";
    }
    return platform;
}


function needUpdate()
{
    cc.updateApp.getInstance().updateAll(function(data){
        cc.log("need to updateAll ...");

        var obj = JSON.parse(data);
        parseUpdateJson(obj);

        _TryToUpdateApp();
    } , function(){
        cc.log("no need update ...");
    })
}
/**
 * 更新队列
 */
function updateMission(){
    var name = "";
    var type = "";//update apk or update res
    var uri = "";
    var force = false;
}

var updateContentByCurrentVersion = "";

var updateMissionQueue = [];

var updateMissionNum = 0;

var updateMissionForce = false;

var type_update = "";//res , apk
/**
 * code : 100 : 更新apk ; 200: 提示更新res ; 300 : 更新数据表
 * @param obj
 */
function parseUpdateJson(obj)
{
    var version = obj.version;
    var store_uri = obj.store_uri;
    storeUri = store_uri;
    var apk_uri = obj.apk_uri;
    var res_version_array = obj.res;// 数组
    var forceUpdate = obj.forceUpdate;

    var updateContent = obj.updateContent;
    if(updateContent != null || updateContent != undefined){
        updateContentByCurrentVersion = Base64.decode(updateContent);
        var contentArray = updateContentByCurrentVersion.split("\\n");
        cc.log("contentArray.length : " + contentArray.length);
        var content = "";
        for(var i = 0 ; i < contentArray.length ; i++){
            content += contentArray[i];
            if(i != contentArray.length - 1){
                content += "\n";
            }
        }
        updateContentByCurrentVersion = content;
    }

    
    if(compareVersionAB(version , GAME_VERSION) && (apk_uri || store_uri)){
        if (Defines.OS.isAndroid()){
            var apkMission = new updateMission();
            apkMission.type = "apk";
            apkMission.name = "apk";
            type_update = "apk";
            apkMission.uri = apk_uri;
            apkMission.force = forceUpdate;
            updateMissionQueue.push(apkMission);
        }
        else if(Defines.OS.isiOS()) {
            installApk();
        }

    }else{
        for(var i = 0 ;i < res_version_array.length ; i ++){
            type_update = "res";
            var res_version = res_version_array[i];
            if(res_version > RES_VERSION){
               var resMission = new updateMission();
               resMission.type = "res";
               resMission.name = res_version;
               resMission.force = forceUpdate;
               resMission.uri = getUpdateUrl() + "/" + res_version + ".zip" ;
               updateMissionQueue.push(resMission);
            }
        }
    }
    updateMissionNum = updateMissionQueue.length;
    updateMissionForce = forceUpdate;
    //startUpdate();
}

/**
 * 判断版本号a是否比版本号b大
 * @param a
 * @param b
 */
function compareVersionAB(a , b)
{
    var arrayA = a.split('.');
    var arrayB = b.split('.');
    for(var i = 0 ; i < arrayA.length ; i++){
        if(parseInt(arrayA[i]) > parseInt(arrayB[i])){
            return true;
        }else if(parseInt(arrayA[i]) < parseInt(arrayB[i])){
            return false;
        }
    }
    return false;
}

var updateAppJson = "";