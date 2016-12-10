#ifndef __configbinding_h__
#define __configbinding_h__

#include "jsapi.h"
#include "jsfriendapi.h"


extern JSClass  *jsb_Config_class;
extern JSObject *jsb_Config_prototype;

JSBool js_configbinding_Config_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_configbinding_Config_finalize(JSContext *cx, JSObject *obj);
void js_register_configbinding_Config(JSContext *cx, JSObject *global);
void register_all_configbinding(JSContext* cx, JSObject* obj);
JSBool js_configbinding_Config_printLayer(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_GetUnzipPath(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_getAssetsFileSize(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_printScene(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_getUserSystemFlag(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_transIPUrl(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_getSignHash(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_getPhoneModel(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_isSizeEnough(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_getMacAddress(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_getAppVersion(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_getImei(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_getUrlFileSize(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_showDialogEx(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_dexMd5(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_kakaoLogin(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_transAPYUrl(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_restartApp(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_installApk(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_cancelPush(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_showDialog(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_updateDownOneFile(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_getDeviceModel(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_showMessageBox(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_freshToken(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_openURL(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_sendMails(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_getFileFromSD(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_isDebug(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_printSystemView(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_payListToJava(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_noticeJavaHandlerWithArg(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_GetDownloadPath(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_getVersionName(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_showMessageToast(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_openWebView(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_getConfigParam(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_updateUnzipFile(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_getSmsCardType(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_getNetWorkType(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_getIDFA(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_getInstance(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_Config(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_configbinding_Config_setTimeOutPassSign(JSContext *cx, uint32_t argc, jsval *vp);
#endif

