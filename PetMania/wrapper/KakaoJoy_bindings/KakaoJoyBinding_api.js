/**
 * @module KakaoJoyBinding
 */
var kakaoJoy = kakaoJoy || {};

/**
 * @class KakaoJoy
 */
kakaoJoy.KakaoJoy = {

    /**
     * @method sendTemplateMessage
     * @param {int}             messageType,1 = normal,2 = invite
     * @param {const char*}     friendid
     * @param {const char*}     templete id
     * @param {const char*}     excuteurl string form like "key1=value1&key2=value2" , if no excuteurl, use empty string
     */
    sendTemplateMessage: function(){},

    /**
     * @method getInstance
     * @return A value converted from C/C++ "KakaoJoy*"
     */
    getInstance : function () {},

    /**
     * @method KakaoJoy
     * @constructor
     */
    KakaoJoy : function () {},

};
