#ifndef __statisticsBinding_h__
#define __statisticsBinding_h__

#include "jsapi.h"
#include "jsfriendapi.h"


extern JSClass  *jsb_Statistics_class;
extern JSObject *jsb_Statistics_prototype;

JSBool js_statisticsBinding_Statistics_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_statisticsBinding_Statistics_finalize(JSContext *cx, JSObject *obj);
void js_register_statisticsBinding_Statistics(JSContext *cx, JSObject *global);
void register_all_statisticsBinding(JSContext* cx, JSObject* obj);
JSBool js_statisticsBinding_Statistics_loginWithAccount(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_statisticsBinding_Statistics_shopBiTrader(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_statisticsBinding_Statistics_addCashWithAccount(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_statisticsBinding_Statistics_createRoleWithAccount(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_statisticsBinding_Statistics_registerWithAccount(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_statisticsBinding_Statistics_start(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_statisticsBinding_Statistics_logEvent(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_statisticsBinding_Statistics_logEventEx(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_statisticsBinding_Statistics_roleLoginWithAccount(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_statisticsBinding_Statistics_redeemCode(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_statisticsBinding_Statistics_roleLogoutWithAccount(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_statisticsBinding_Statistics_getInstance(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_statisticsBinding_Statistics_Statistics(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_statisticsBinding_Statistics_logBiBuySuccess(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_statisticsBinding_Statistics_logBiBuyFailed(JSContext *cx, uint32_t argc, jsval *vp);
#endif

