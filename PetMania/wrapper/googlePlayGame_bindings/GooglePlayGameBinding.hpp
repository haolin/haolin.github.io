#ifndef __GooglePlayGameBinding_h__
#define __GooglePlayGameBinding_h__

#include "jsapi.h"
#include "jsfriendapi.h"


extern JSClass  *jsb_GooglePlayGame_class;
extern JSObject *jsb_GooglePlayGame_prototype;

JSBool js_GooglePlayGameBinding_GooglePlayGame_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_GooglePlayGameBinding_GooglePlayGame_finalize(JSContext *cx, JSObject *obj);
void js_register_GooglePlayGameBinding_GooglePlayGame(JSContext *cx, JSObject *global);
void register_all_GooglePlayGameBinding(JSContext* cx, JSObject* obj);
JSBool js_GooglePlayGameBinding_GooglePlayGame_displayLeaderBoard(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_GooglePlayGameBinding_GooglePlayGame_displayAchievement(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_GooglePlayGameBinding_GooglePlayGame_submitLevel(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_GooglePlayGameBinding_GooglePlayGame_increment(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_GooglePlayGameBinding_GooglePlayGame_unLockAchievement(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_GooglePlayGameBinding_GooglePlayGame_getInstance(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_GooglePlayGameBinding_GooglePlayGame_GooglePlayGame(JSContext *cx, uint32_t argc, jsval *vp);
#endif

