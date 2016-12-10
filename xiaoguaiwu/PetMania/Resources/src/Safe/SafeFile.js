//安全的保存数据 防止部分破解
/*
*   用法:
*   保存   cc.SafeFile.getInstance().set("keys",20);    需要参数有:key以及要保存的值
*   读取   cc.SafeFile.getInstance().get("keys",0);     需要参数有:key以及读取不到时的默认值
*
* */

var SAFE_FILE_KEY = "ALL_KEY";
var SAFE_DATA_KEY = "DATA";                     //数据
var SAFE_DEVICE_ID_KEY = "SAFE_DEVICE_ID_KEY";  //设备ID

cc.SafeFile = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._apparkData = null;
        this._prepareData = null;
        this._localStorageEnable = (Defines.PLATFORM.isMobile() && !Defines.OS.isWindows()) || Defines.OS.isBrowser();
    },

    //------------------------------------------------------------------------------------------------------------------
    //检查Storage是否启动，因为Windows下是没有的
    isLocalStorageEnable: function()
    {
        return this._localStorageEnable;
    },

    //------------------------------------------------------------------------------------------------------------------
    //保存变量的值(理论上支持所有类型)
    set: function(key, value)
    {
        this.setValueByKey(key, value);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //获取变量的值
    get: function(key)
    {
        //key和默认值
        return this.getValueByKey(key);
    },

    //------------------------------------------------------------------------------------------------------------------
    //创建空的文档
    _createNewFileData: function()
    {
        //
        var newData = {};

        //
        newData[SAFE_DATA_KEY] = {};

        //网页版本不需要这个
        newData[SAFE_DEVICE_ID_KEY] = Defines.PLATFORM.isMobile() ?
            wrapperConfig.Config.getInstance().getImei() : "IMEI";

        //
        return newData;
    },

    //------------------------------------------------------------------------------------------------------------------
    //初始化 必须调用
    init: function()
    {
        //
        this._apparkData = this.isLocalStorageEnable() ? sys.localStorage.getItem(SAFE_FILE_KEY) : null;
        if (!this._apparkData)
        {
            cc.log("创建新的档案");
            var newData = this._createNewFileData();

            cc.log("加密新的档案 = " + newData[SAFE_DEVICE_ID_KEY]);
            this._apparkData = this.setApparkAndEncryption(newData);

            cc.log("新的档案，先存储一下");
            this.saveToLocalStorage();
        }

        //
        cc.log("文件读取完成");

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //存储sys.localStorage
    saveToLocalStorage: function()
    {
        if(this._apparkData && this.isLocalStorageEnable())
        {
            sys.localStorage.setItem(SAFE_FILE_KEY, this._apparkData);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //解密数据
    apparkDecryption: function()
    {
        var parseResult = cc.Appark.getInstance().parseHigh(this._apparkData);
        return JSON.parse(parseResult);
    },

    //------------------------------------------------------------------------------------------------------------------
    //设置数据
    setApparkAndEncryption: function(object)
    {
        this._apparkData = cc.Appark.getInstance().stringifyHigh(JSON.stringify(object));
        return this._apparkData;
    },

    //------------------------------------------------------------------------------------------------------------------
    //存储数据
    setValueByKey: function(key, value)
    {
        if (this._prepareData)
        {
            cc.log("this._prepareData 数据准备好了 直接设置临时的");
            this._prepareData[SAFE_DATA_KEY][key] = value;
            return this;
        }

        cc.log("setValueByKey 解密");
        var decryptionData = this.apparkDecryption();

        cc.log("设置数据");
        decryptionData[SAFE_DATA_KEY][key] = value;

        cc.log("数据设置完毕，再次赋值，加密");
        this.setApparkAndEncryption(decryptionData);

        cc.log("存储LocalStorage");
        this.saveToLocalStorage();

        cc.log("存储完成 key = " + key + ", value = " + value);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //读取数据
    getValueByKey: function(key, defaultValue)
    {
        if (this._prepareData)
        {
            cc.log("有准备数据 直接返回 = " + this._prepareData[SAFE_DATA_KEY][key]);
            return this._prepareData[SAFE_DATA_KEY][key];
        }

        //
        cc.log("getValueByKey 解密");
        var decryptionData = this.apparkDecryption();

        //
        cc.log("查找数据 key = " + key);
        var findData = decryptionData[SAFE_DATA_KEY][key];

        //
        cc.log("找到的数据 = " + findData);
        return findData;
    },

    //------------------------------------------------------------------------------------------------------------------
    prepareBegin: function()
    {
        cc.log("prepareBegin 准备数据");
        this._prepareData = this.apparkDecryption();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    prepareEnd: function()
    {
        if (this._prepareData)
        {
            cc.log("prepareEnd 设置");
            this.setApparkAndEncryption(this._prepareData);

            cc.log("prepareEnd 结束存储一下");
            this.saveToLocalStorage();
        }

        this._prepareData = null;
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.SafeFile._instance = null;
cc.SafeFile.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = (new cc.SafeFile()).init();
    }

    return this._instance;
};