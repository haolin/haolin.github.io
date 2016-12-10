#ifndef __OpJoybinding_h__
#define __OpJoybinding_h__

#include "jsapi.h"
#include "jsfriendapi.h"


extern JSClass  *jsb_OpJoy_class;
extern JSObject *jsb_OpJoy_prototype;

JSBool js_OpJoybinding_OpJoy_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_OpJoybinding_OpJoy_finalize(JSContext *cx, JSObject *obj);
void js_register_OpJoybinding_OpJoy(JSContext *cx, JSObject *global);
void register_all_OpJoybinding(JSContext* cx, JSObject* obj);
JSBool js_OpJoybinding_OpJoy_ShowGameCenterLeaderboard(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_getAbledInviteFriends(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_addGetUidInfo(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_updateUserPhoto(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_CommonInterface_navitecallBack(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_CommonUserInfo_navitecallBack(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_isGameCenterAvailable(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_ReportGameCenterScore(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_isAutoLogin(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_isGameCenterLogin(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_facebookInvite(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_inviteOneFriend(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_downUserPhoto(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_addFriendFromID(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_payBilling(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_logout(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_GameCenterLogin(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_loginCallBack(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_getJoyGameFriends(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_bindUserInfo(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_login(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_sendTemplateMessage(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_showMessageBlockDialog(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_partytrackEvent(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_partytrackPayment(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_appFirstLaunched(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_getInstance(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_OpJoybinding_OpJoy_OpJoy(JSContext *cx, uint32_t argc, jsval *vp);

#endif

