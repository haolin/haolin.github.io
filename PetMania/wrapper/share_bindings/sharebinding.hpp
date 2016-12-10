#ifndef __sharebinding_h__
#define __sharebinding_h__

#include "jsapi.h"
#include "jsfriendapi.h"


extern JSClass  *jsb_Share_class;
extern JSObject *jsb_Share_prototype;

JSBool js_sharebinding_Share_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_sharebinding_Share_finalize(JSContext *cx, JSObject *obj);
void js_register_sharebinding_Share(JSContext *cx, JSObject *global);
void register_all_sharebinding(JSContext* cx, JSObject* obj);
JSBool js_sharebinding_Share_shareToFacebook(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_sharebinding_Share_shareToSinaWeibo(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_sharebinding_Share_shareToWeChatCircle(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_sharebinding_Share_shareToTencentWeibo(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_sharebinding_Share_shareToRenRen(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_sharebinding_Share_shareToMail(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_sharebinding_Share_shareback(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_sharebinding_Share_shareToWeChatFriend(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_sharebinding_Share_getInstance(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_sharebinding_Share_Share(JSContext *cx, uint32_t argc, jsval *vp);
#endif

