//游戏常量定义

var deviceMap = [
    // iPhone
    {Key : "iPhone1,1",Value:"iPhone 2G"},
    {Key : "iPhone1,2",Value:"iPhone 3G"},
    {Key : "iPhone2,1",Value:"iPhone 3GS"},
    {Key : "iPhone3,1",Value:"iPhone 4"},
    {Key : "iPhone3,2",Value:"iPhone 4"},
    {Key : "iPhone3,3",Value:"iPhone 4 (CDMA)"},
    {Key : "iPhone4,1",Value:"iPhone 4S"},
    {Key : "iPhone5,1",Value:"iPhone 5"},
    {Key : "iPhone5,2",Value:"iPhone 5 (GSM+CDMA)"},
    // iPod
    {Key : "iPod1,1",Value:"iPod Touch (1 Gen)"},
    {Key : "iPod2,1",Value:"iPod Touch (2 Gen)"},
    {Key : "iPod3,1",Value:"iPod Touch (3 Gen)"},
    {Key : "iPod4,1",Value:"iPod Touch (4 Gen)"},
    {Key : "iPod5,1",Value:"iPod Touch (5 Gen)"},
    // iPad
    {Key : "iPad1,1",Value:"iPad"},
    {Key : "iPad1,2",Value:"iPad 3G"},
    {Key : "iPad2,1",Value:"iPad 2 (WiFi)"},
    {Key : "iPad2,2",Value:"iPad 2"},
    {Key : "iPad2,3",Value:"iPad 2 (CDMA)"},
    {Key : "iPad2,4",Value:"iPad 2"},
    {Key : "iPad2,5",Value:"iPad Mini (WiFi)"},
    {Key : "iPad2,6",Value:"iPad Mini"},
    {Key : "iPad2,7",Value:"iPad Mini (GSM+CDMA)"},
    {Key : "iPad3,1",Value:"iPad 3 (WiFi)"},
    {Key : "iPad3,2",Value:"iPad 3 (GSM+CDMA)"},
    {Key : "iPad3,3",Value:"iPad 3"},
    {Key : "iPad3,4",Value:"iPad 4 (WiFi)"},
    {Key : "iPad3,5",Value:"iPad 4"},
    {Key : "iPad3,6",Value:"iPad 4 (GSM+CDMA)"},
    // Simulator
    {Key : "i386",Value:"Simulator"},
    {Key : "x86_64",Value:"Simulator"}
];

//var tmp = [
//    ["iPhone1,1", "iPhone 2G"],
//    ["iPhone1,2", "iPhone 3G"],
//];
//
//tmp.forEach(
//    function(data)
//    {
//        deviceMap.push(
//            {Key:data[0], Value: data[1]}
//        );
//    }
//);

var low_IOS_Device = [
    "iPhone 2G",
    "iPhone 3G",
    "iPhone 3GS",
    "iPhone 4",
    "iPhone 4 (CDMA)",
    "iPod Touch (1 Gen)",
    "iPod Touch (2 Gen)",
    "iPod Touch (3 Gen)"
];


var high_IOS_Device = [
    // IOS high device
    "iPhone 4S",
    "iPhone 5",
    "iPhone 5 (GSM+CDMA)",
    "iPod Touch (4 Gen)",
    "iPad",
    "iPad 3G",
    "iPad 2 (WiFi)",
    "iPad 2",
    "iPad 2 (CDMA)",
    "iPad Mini",
    "iPad Mini (GSM+CDMA)",
    "iPad 3 (WiFi)",
    "iPad 3 (GSM+CDMA)",
    "iPad 4 (WiFi)",
    "iPad 4",
    "iPad 4 (GSM+CDMA)"
];

//
var low_Android_Device = 200;

//
var Define_SysConfig = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        cc.log("Define_SysConfig = " + this);
    },

    //------------------------------------------------------------------------------------------------------------------
    _os: function()
    {
        return sys["os"];
    },

    //------------------------------------------------------------------------------------------------------------------
    _platform: function()
    {
        return sys["platform"];
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "os = " + this._os() + ", platform = " + this._platform();
    },

    //------------------------------------------------------------------------------------------------------------------
    isWindows: function()
    {
        return this._os() == "Windows" || this._os() == "windows";
    },

    //------------------------------------------------------------------------------------------------------------------
    isAndroid: function()
    {
        return this._os() == "Android" || this._os() == "android";
    },

    //------------------------------------------------------------------------------------------------------------------
    isiOS: function()
    {
        return this._os() == "iOS" || this._os() == "ios";
    },

    //------------------------------------------------------------------------------------------------------------------
    isBrowser: function()
    {
        return this._platform() == "browser";
    },

    //------------------------------------------------------------------------------------------------------------------
    isMobile: function()
    {
        return this._platform() == "mobile";
    },
    //------------------------------------------------------------------------------------------------------------------
    /**
     * 获取Android内存大小
     * @returns {*}
     */
    getAndroidRAM : function()
    {
        return this.isAndroid() ? parseInt(getDeviceInfo().data) : 0;
    },
    //------------------------------------------------------------------------------------------------------------------
    /**
     * 获取IOS设备信息
     * @returns {*}
     */
    getIOSDeviceInfo : function()
    {
        //var value = getDeviceInfo();
        //cc.log("value = " + value);
        return this.isiOS() ? getDeviceInfo().data.toString() : "";
    },
    //------------------------------------------------------------------------------------------------------------------
    /**
     * 判定是否Android低端机
     * 外部不要直接调用
     */
    isLowAndroidDevice : function()
    {
        if (!this.isAndroid())
        {
            cc.log("This is not Android device.");
            return false;
        }

        return this.getAndroidRAM() <= low_Android_Device;
    },
    //------------------------------------------------------------------------------------------------------------------
    /**
     * 判定是否IOS低端机
     * 外部不要直接调用
     */
    isLowIOSDevice : function()
    {
        if (!this.isiOS())
        {
            cc.log("This is not IOS device.");
            return false;
        }

        var devName = this.getIOSDeviceName(this.getIOSDeviceInfo());
        cc.log("IOS = " + devName);
        return low_IOS_Device.some(
            function (a_device)
            {
                return a_device.toLowerCase() == devName.toLowerCase();
            }
        );
    },
    //------------------------------------------------------------------------------------------------------------------
    /**
     * 外部调用是否低端机
     */
    isSysLowDevice : function()
    {
        if (this.isAndroid())
        {
           return this.isLowAndroidDevice();
        }
        else if (this.isiOS())
        {
            return this.isLowIOSDevice();
        }
        else
        {
            cc.log("This device is not IOS or Android!");
        }

        return false;
    },
    //------------------------------------------------------------------------------------------------------------------
    /**
     *根据设备真实名返回程序使用的设备名
     */
    getIOSDeviceName : function(deviceType)
    {
        var deviceName = "";
        deviceMap.forEach(
            function (a_device)
            {
                if (a_device.Key == deviceType)
                {
                    cc.log("设备名称：" + a_device.Key + " 设备转化名称：" + a_device.Value);
                    deviceName = a_device.Value;
                }
            }
        );

        return deviceName;
    },

    //------------------------------------------------------------------------------------------------------------------
    //是否广告可用
    isADEnable: function()
    {
        /*if (!this.isMobile())
        {
            return false;
        }

        if (this.isiOS())
        {
            return getAppVersion() > 5.0;
        }
*/
        return this.isMobile() && !Defines.IS_EN && !Defines.IS_KO && !isTelcomOperators();
    }
});

//
Define_SysConfig._instance = null;
Define_SysConfig.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new Define_SysConfig();
    }

    return this._instance;
};

