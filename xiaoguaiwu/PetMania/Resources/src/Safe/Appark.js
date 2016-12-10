//数据管理器

//高级加密标准（Advanced Encryption Standard，AES），在密码学中又称Rijndael加密法，是美国联邦政府采用的一种区块加密标准。
//Base64是一种基于64个可打印字符来表示二进制数据的表示方法,编码后的数据比原始数据略长.可以估算编码后数据长度大约为原长的135.1%

ARK_KEY = "AboutUsEEEQXXTE"; //密钥 请勿公开 请勿乱改 版本中修改会导致数据不兼容 切记

//========================================================
cc.Appark = cc.Class.extend({

    m_DataArk : {},//数据池

    stringifyHigh:function(value){

        return this.__pushValueToArk(value);
    },

    parseHigh:function(value){

        return this.__getValueFromArk(value);
    },
    
    stringifyLow:function(value)
    {
        return this.__setValueToBase64(value);
    },
    
    parseLow:function(value){
                            
        return this.__getValueFromBase64(value);
    },

/* 下面函数不需要外界调用 */

    __pushValueToArk:function(value){

        var base64_ark = this.__setValueToBase64(value);
//
        var aes_ark = this.__setValueToAes(base64_ark);

        return aes_ark;
    },

    __getValueFromArk:function(value){

        var aes_parse_ark = this.__getValueFromAes(value);
//
        var base64_parse_ark = this.__getValueFromBase64(aes_parse_ark);
//
        if(base64_parse_ark==""){
            base64_parse_ark="{}";
        };

        return base64_parse_ark;
    },

/* b a s e 基础 */

    __setValueToBase64:function(value){

        var valueUtf8 = Safe.enc.Utf8.parse(value);
        var base64_ark = Safe.enc.Base64.stringify(valueUtf8);

        return base64_ark;
    },

    __getValueFromBase64:function(value){

        var base64_parse_ark = Safe.enc.Base64.parse(value);
        var base64_parse_ark_utf8 = base64_parse_ark.toString(Safe.enc.Utf8);

        return base64_parse_ark_utf8;
    },

    __setValueToAes:function(value){

        var aes_ark = Safe.AES.encrypt(value,ARK_KEY);

        return aes_ark;
    },

    __getValueFromAes:function(value){


        var aes_parse_ark = Safe.AES.decrypt(value,ARK_KEY);
        var aes_parse_ark_utf8 = aes_parse_ark.toString(Safe.enc.Utf8);

        return aes_parse_ark_utf8;
    }


});

//单件模式
cc.Appark._instance = null;

cc.Appark.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.Appark();
    }

    return this._instance;
};