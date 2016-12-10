#ifndef __KakaoJoyBinding_h__
#define __KakaoJoyBinding_h__

#include "jsapi.h"
#include "jsfriendapi.h"


extern JSClass  *jsb_KakaoJoy_class;
extern JSObject *jsb_KakaoJoy_prototype;

JSBool js_KakaoJoyBinding_KakaoJoy_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_KakaoJoyBinding_KakaoJoy_finalize(JSContext *cx, JSObject *obj);
void js_register_KakaoJoyBinding_KakaoJoy(JSContext *cx, JSObject *global);
void register_all_KakaoJoyBinding(JSContext* cx, JSObject* obj);
JSBool js_KakaoJoyGameBinding_KakaoJoy_sendTemplateMessage(JSContext *cx, uint32_t argc, jsval *vp);
#endif

