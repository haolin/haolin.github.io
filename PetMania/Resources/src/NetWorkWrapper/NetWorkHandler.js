/**
 * 通过IMEI登陆的请求和返回
 * @constructor
 */
function NetWork_Request_Login_ByIMEI(){
    cc.NodeSelf.getInstance().loginByIMEI(ROBOT_IMEI , NetWork_Accept_Login_ByIMEI);
}

function NetWork_Accept_Login_ByIMEI(data){
    cc.log("login  by ime : " + data);
}

/**-------------------------------------------------------------------------------**/
function setNetWorkType(type){
    cc.log("set the netWork type : " + type);

    var old = netWorkType;
    netWorkType = type;
    if (netWorkType == old)
    {
        return;
    }

    if (!isTelcomOperators())
    {
        if (_IsNetWorkEnable())
        {
            //有网络了
            cc.NodeHelper.getInstance().onNetworkConnect();
        }
        else
        {
            //无网络了
            cc.NodeHelper.getInstance().onNetworkDisconnect();
            netTimeoutCall();
        }

        //
//        GameCenterMng.getInstance().netWorkChanged();
    }
}