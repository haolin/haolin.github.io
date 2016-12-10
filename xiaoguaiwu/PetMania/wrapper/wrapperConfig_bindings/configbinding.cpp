#include "configbinding.hpp"
#include "cocos2d_specifics.hpp"
#include "../config/Config.h"

template<class T>
static JSBool dummy_constructor(JSContext *cx, uint32_t argc, jsval *vp) {
	TypeTest<T> t;
	T* cobj = new T();
	cocos2d::CCObject *_ccobj = dynamic_cast<cocos2d::CCObject *>(cobj);
	if (_ccobj) {
		_ccobj->autorelease();
	}
	js_type_class_t *p;
	uint32_t typeId = t.s_id();
	HASH_FIND_INT(_js_global_type_ht, &typeId, p);
	assert(p);
	JSObject *_tmp = JS_NewObject(cx, p->jsclass, p->proto, p->parentProto);
	js_proxy_t *pp = jsb_new_proxy(cobj, _tmp);
	JS_AddObjectRoot(cx, &pp->obj);
	JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(_tmp));

	return JS_TRUE;
}

static JSBool empty_constructor(JSContext *cx, uint32_t argc, jsval *vp) {
	return JS_FALSE;
}


JSClass  *jsb_Config_class;
JSObject *jsb_Config_prototype;

JSBool js_configbinding_Config_printLayer(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 2) {
		int arg0;
		double arg1;
		ok &= jsval_to_int32(cx, argv[0], (int32_t *)&arg0);
		ok &= JS_ValueToNumber(cx, argv[1], &arg1);
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		const char* ret = cobj->printLayer(arg0, arg1);
		jsval jsret;
		jsret = c_string_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 2);
	return JS_FALSE;
}
JSBool js_configbinding_Config_GetUnzipPath(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		const char* ret = cobj->GetUnzipPath();
		jsval jsret;
		jsret = c_string_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}
JSBool js_configbinding_Config_getAssetsFileSize(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 1) {
		const char* arg0;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		int ret = cobj->getAssetsFileSize(arg0);
		jsval jsret;
		jsret = int32_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return JS_FALSE;
}
JSBool js_configbinding_Config_printScene(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 2) {
		double arg0;
		double arg1;
		ok &= JS_ValueToNumber(cx, argv[0], &arg0);
		ok &= JS_ValueToNumber(cx, argv[1], &arg1);
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		const char* ret = cobj->printScene(arg0, arg1);
		jsval jsret;
		jsret = c_string_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 2);
	return JS_FALSE;
}
JSBool js_configbinding_Config_getUserSystemFlag(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		int ret = cobj->getUserSystemFlag();
		jsval jsret;
		jsret = int32_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}
JSBool js_configbinding_Config_transIPUrl(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 1) {
		const char* arg0;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->transIPUrl(arg0);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return JS_FALSE;
}
JSBool js_configbinding_Config_getSignHash(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		const char* ret = cobj->getSignHash();
		jsval jsret;
		jsret = c_string_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}
JSBool js_configbinding_Config_getPhoneModel(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		const char* ret = cobj->getPhoneModel();
		jsval jsret;
		jsret = c_string_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}
JSBool js_configbinding_Config_isSizeEnough(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 1) {
		int arg0;
		ok &= jsval_to_int32(cx, argv[0], (int32_t *)&arg0);
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		bool ret = cobj->isSizeEnough(arg0);
		jsval jsret;
		jsret = BOOLEAN_TO_JSVAL(ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return JS_FALSE;
}
JSBool js_configbinding_Config_getMacAddress(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		const char* ret = cobj->getMacAddress();
		jsval jsret;
		jsret = c_string_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}
JSBool js_configbinding_Config_getAppVersion(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		const char* ret = cobj->getAppVersion();
		jsval jsret;
		jsret = c_string_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}
JSBool js_configbinding_Config_getImei(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		const char* ret = cobj->getImei();
		jsval jsret;
		jsret = c_string_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}
JSBool js_configbinding_Config_getUrlFileSize(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 1) {
		const char* arg0;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		int ret = cobj->getUrlFileSize(arg0);
		jsval jsret;
		jsret = int32_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return JS_FALSE;
}
JSBool js_configbinding_Config_showDialogEx(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 4) {
		int arg0;
		const char* arg1;
		const char* arg2;
		const char* arg3;
		ok &= jsval_to_int32(cx, argv[0], (int32_t *)&arg0);
		std::string arg1_tmp; ok &= jsval_to_std_string(cx, argv[1], &arg1_tmp); arg1 = arg1_tmp.c_str();
		std::string arg2_tmp; ok &= jsval_to_std_string(cx, argv[2], &arg2_tmp); arg2 = arg2_tmp.c_str();
		std::string arg3_tmp; ok &= jsval_to_std_string(cx, argv[3], &arg3_tmp); arg3 = arg3_tmp.c_str();
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->showDialogEx(arg0, arg1, arg2, arg3);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 4);
	return JS_FALSE;
}
JSBool js_configbinding_Config_dexMd5(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		const char* ret = cobj->dexMd5();
		jsval jsret;
		jsret = c_string_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}
JSBool js_configbinding_Config_kakaoLogin(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		cobj->kakaoLogin();
		jsval jsret;
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}
JSBool js_configbinding_Config_transAPYUrl(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 1) {
		const char* arg0;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->transAPYUrl(arg0);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return JS_FALSE;
}
JSBool js_configbinding_Config_restartApp(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		cobj->restartApp();
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}
JSBool js_configbinding_Config_installApk(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 1) {
		const char* arg0;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->installApk(arg0);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return JS_FALSE;
}
JSBool js_configbinding_Config_cancelPush(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		cobj->cancelPush();
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}
JSBool js_configbinding_Config_showDialog(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 1) {
		const char* arg0;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->showDialog(arg0);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return JS_FALSE;
}
JSBool js_configbinding_Config_updateDownOneFile(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 3) {
		const char* arg0;
		const char* arg1;
		const char* arg2;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		std::string arg1_tmp; ok &= jsval_to_std_string(cx, argv[1], &arg1_tmp); arg1 = arg1_tmp.c_str();
		std::string arg2_tmp; ok &= jsval_to_std_string(cx, argv[2], &arg2_tmp); arg2 = arg2_tmp.c_str();
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->updateDownOneFile(arg0, arg1, arg2);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 3);
	return JS_FALSE;
}
JSBool js_configbinding_Config_getDeviceModel(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		const char* ret = cobj->getDeviceModel();
		jsval jsret;
		jsret = c_string_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}
JSBool js_configbinding_Config_showMessageBox(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 3) {
		const char* arg0;
		const char* arg1;
		const char* arg2;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		std::string arg1_tmp; ok &= jsval_to_std_string(cx, argv[1], &arg1_tmp); arg1 = arg1_tmp.c_str();
		std::string arg2_tmp; ok &= jsval_to_std_string(cx, argv[2], &arg2_tmp); arg2 = arg2_tmp.c_str();
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->showMessageBox(arg0, arg1, arg2);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 3);
	return JS_FALSE;
}
JSBool js_configbinding_Config_freshToken(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 1) {
		const char* arg0;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->freshToken(arg0);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return JS_FALSE;
}
JSBool js_configbinding_Config_openURL(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 1) {
		const char* arg0;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->openURL(arg0);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return JS_FALSE;
}
JSBool js_configbinding_Config_sendMails(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 3) {
		const char* arg0;
		const char* arg1;
		const char* arg2;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		std::string arg1_tmp; ok &= jsval_to_std_string(cx, argv[1], &arg1_tmp); arg1 = arg1_tmp.c_str();
		std::string arg2_tmp; ok &= jsval_to_std_string(cx, argv[2], &arg2_tmp); arg2 = arg2_tmp.c_str();
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->sendMails(arg0, arg1, arg2);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 3);
	return JS_FALSE;
}
JSBool js_configbinding_Config_getFileFromSD(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 1) {
		const char* arg0;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		const char* ret = cobj->getFileFromSD(arg0);
		jsval jsret;
		jsret = c_string_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return JS_FALSE;
}
JSBool js_configbinding_Config_isDebug(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		bool ret = cobj->isDebug();
		jsval jsret;
		jsret = BOOLEAN_TO_JSVAL(ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}
JSBool js_configbinding_Config_printSystemView(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		const char* ret = cobj->printSystemView();
		jsval jsret;
		jsret = c_string_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}
JSBool js_configbinding_Config_payListToJava(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 1) {
		const char* arg0;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->payListToJava(arg0);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return JS_FALSE;
}
JSBool js_configbinding_Config_noticeJavaHandlerWithArg(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 2) {
		int arg0;
		const char* arg1;
		ok &= jsval_to_int32(cx, argv[0], (int32_t *)&arg0);
		std::string arg1_tmp; ok &= jsval_to_std_string(cx, argv[1], &arg1_tmp); arg1 = arg1_tmp.c_str();
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->noticeJavaHandlerWithArg(arg0, arg1);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 2);
	return JS_FALSE;
}
JSBool js_configbinding_Config_GetDownloadPath(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		const char* ret = cobj->GetDownloadPath();
		jsval jsret;
		jsret = c_string_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}
JSBool js_configbinding_Config_getVersionName(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		const char* ret = cobj->getVersionName();
		jsval jsret;
		jsret = c_string_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}
JSBool js_configbinding_Config_showMessageToast(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 1) {
		const char* arg0;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->showMessageToast(arg0);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return JS_FALSE;
}
JSBool js_configbinding_Config_openWebView(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 1) {
		const char* arg0;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->openWebView(arg0);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return JS_FALSE;
}
JSBool js_configbinding_Config_getConfigParam(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		const char* ret = cobj->getConfigParam();
		jsval jsret;
		jsret = c_string_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}
JSBool js_configbinding_Config_updateUnzipFile(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 2) {
		const char* arg0;
		const char* arg1;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		std::string arg1_tmp; ok &= jsval_to_std_string(cx, argv[1], &arg1_tmp); arg1 = arg1_tmp.c_str();
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->updateUnzipFile(arg0, arg1);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 2);
	return JS_FALSE;
}
JSBool js_configbinding_Config_getSmsCardType(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		int ret = cobj->getSmsCardType();
		jsval jsret;
		jsret = int32_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}
JSBool js_configbinding_Config_getNetWorkType(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		int ret = cobj->getNetWorkType();
		jsval jsret;
		jsret = int32_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}
JSBool js_configbinding_Config_getIDFA(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		const char* ret = cobj->getIDFA();
		jsval jsret;
		jsret = c_string_to_jsval(cx, ret);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}
JSBool js_configbinding_Config_getInstance(JSContext *cx, uint32_t argc, jsval *vp)
{
	if (argc == 0) {
		Config* ret = Config::getInstance();
		jsval jsret;
		do {
		if (ret) {
			js_proxy_t *proxy = js_get_or_create_proxy<Config>(cx, ret);
			jsret = OBJECT_TO_JSVAL(proxy->obj);
		} else {
			jsret = JSVAL_NULL;
		}
	} while (0);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}
	JS_ReportError(cx, "wrong number of arguments");
	return JS_FALSE;
}

JSBool js_configbinding_Config_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
	if (argc == 0) {
		Config* cobj = new Config();
		cocos2d::CCObject *_ccobj = dynamic_cast<cocos2d::CCObject *>(cobj);
		if (_ccobj) {
			_ccobj->autorelease();
		}
		TypeTest<Config> t;
		js_type_class_t *typeClass;
		uint32_t typeId = t.s_id();
		HASH_FIND_INT(_js_global_type_ht, &typeId, typeClass);
		assert(typeClass);
		JSObject *obj = JS_NewObject(cx, typeClass->jsclass, typeClass->proto, typeClass->parentProto);
		JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(obj));
		// link the native object with the javascript object
		js_proxy_t* p = jsb_new_proxy(cobj, obj);
		JS_AddNamedObjectRoot(cx, &p->obj, "Config");
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}

JSBool js_configbinding_Config_setTimeOutPassSign(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Config* cobj = (Config *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 1) {
		JSBool arg0;
		ok &= JS_ValueToBoolean(cx, argv[0], &arg0);
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->setTimeOutPassSign(arg0);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}


void js_configbinding_Config_finalize(JSFreeOp *fop, JSObject *obj) {
    CCLOGINFO("jsbindings: finalizing JS object %p (Config)", obj);
}

static JSBool js_configbinding_Config_ctor(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
    Config *nobj = new Config();
    js_proxy_t* p = jsb_new_proxy(nobj, obj);
    nobj->autorelease();
    JS_AddNamedObjectRoot(cx, &p->obj, "Config");
    JS_SET_RVAL(cx, vp, JSVAL_VOID);
    return JS_TRUE;
}

void js_register_configbinding_Config(JSContext *cx, JSObject *global) {
	jsb_Config_class = (JSClass *)calloc(1, sizeof(JSClass));
	jsb_Config_class->name = "Config";
	jsb_Config_class->addProperty = JS_PropertyStub;
	jsb_Config_class->delProperty = JS_PropertyStub;
	jsb_Config_class->getProperty = JS_PropertyStub;
	jsb_Config_class->setProperty = JS_StrictPropertyStub;
	jsb_Config_class->enumerate = JS_EnumerateStub;
	jsb_Config_class->resolve = JS_ResolveStub;
	jsb_Config_class->convert = JS_ConvertStub;
	jsb_Config_class->finalize = js_configbinding_Config_finalize;
	jsb_Config_class->flags = JSCLASS_HAS_RESERVED_SLOTS(2);

	JSPropertySpec *properties = NULL;

	static JSFunctionSpec funcs[] = {
		JS_FN("printLayer", js_configbinding_Config_printLayer, 2, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("GetUnzipPath", js_configbinding_Config_GetUnzipPath, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("getAssetsFileSize", js_configbinding_Config_getAssetsFileSize, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("printScene", js_configbinding_Config_printScene, 2, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("getUserSystemFlag", js_configbinding_Config_getUserSystemFlag, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("transIPUrl", js_configbinding_Config_transIPUrl, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("getSignHash", js_configbinding_Config_getSignHash, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("getPhoneModel", js_configbinding_Config_getPhoneModel, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("isSizeEnough", js_configbinding_Config_isSizeEnough, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("getMacAddress", js_configbinding_Config_getMacAddress, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("getAppVersion", js_configbinding_Config_getAppVersion, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("getImei", js_configbinding_Config_getImei, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("getUrlFileSize", js_configbinding_Config_getUrlFileSize, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("showDialogEx", js_configbinding_Config_showDialogEx, 4, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("dexMd5", js_configbinding_Config_dexMd5, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("kakaoLogin", js_configbinding_Config_kakaoLogin, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("transAPYUrl", js_configbinding_Config_transAPYUrl, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("restartApp", js_configbinding_Config_restartApp, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("installApk", js_configbinding_Config_installApk, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("cancelPush", js_configbinding_Config_cancelPush, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("showDialog", js_configbinding_Config_showDialog, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("updateDownOneFile", js_configbinding_Config_updateDownOneFile, 3, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("getDeviceModel", js_configbinding_Config_getDeviceModel, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("showMessageBox", js_configbinding_Config_showMessageBox, 3, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("freshToken", js_configbinding_Config_freshToken, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("openURL", js_configbinding_Config_openURL, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("sendMails", js_configbinding_Config_sendMails, 3, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("getFileFromSD", js_configbinding_Config_getFileFromSD, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("isDebug", js_configbinding_Config_isDebug, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("printSystemView", js_configbinding_Config_printSystemView, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("payListToJava", js_configbinding_Config_payListToJava, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("noticeJavaHandlerWithArg", js_configbinding_Config_noticeJavaHandlerWithArg, 2, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("GetDownloadPath", js_configbinding_Config_GetDownloadPath, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("getVersionName", js_configbinding_Config_getVersionName, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("showMessageToast", js_configbinding_Config_showMessageToast, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("openWebView", js_configbinding_Config_openWebView, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("getConfigParam", js_configbinding_Config_getConfigParam, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("updateUnzipFile", js_configbinding_Config_updateUnzipFile, 2, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("getSmsCardType", js_configbinding_Config_getSmsCardType, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("getNetWorkType", js_configbinding_Config_getNetWorkType, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("getIDFA", js_configbinding_Config_getIDFA, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("ctor", js_configbinding_Config_ctor, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("setTimeOutPassSign", js_configbinding_Config_setTimeOutPassSign, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
	};

	static JSFunctionSpec st_funcs[] = {
		JS_FN("getInstance", js_configbinding_Config_getInstance, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FS_END
	};

	jsb_Config_prototype = JS_InitClass(
		cx, global,
		NULL, // parent proto
		jsb_Config_class,
		js_configbinding_Config_constructor, 0, // constructor
		properties,
		funcs,
		NULL, // no static properties
		st_funcs);
	// make the class enumerable in the registered namespace
	JSBool found;
	JS_SetPropertyAttributes(cx, global, "Config", JSPROP_ENUMERATE | JSPROP_READONLY, &found);

	// add the proto and JSClass to the type->js info hash table
	TypeTest<Config> t;
	js_type_class_t *p;
	uint32_t typeId = t.s_id();
	HASH_FIND_INT(_js_global_type_ht, &typeId, p);
	if (!p) {
		p = (js_type_class_t *)malloc(sizeof(js_type_class_t));
		p->type = typeId;
		p->jsclass = jsb_Config_class;
		p->proto = jsb_Config_prototype;
		p->parentProto = NULL;
		HASH_ADD_INT(_js_global_type_ht, type, p);
	}
}

void register_all_configbinding(JSContext* cx, JSObject* obj) {
	// first, try to get the ns
	jsval nsval;
	JSObject *ns;
	JS_GetProperty(cx, obj, "wrapperConfig", &nsval);
	if (nsval == JSVAL_VOID) {
		ns = JS_NewObject(cx, NULL, NULL, NULL);
		nsval = OBJECT_TO_JSVAL(ns);
		JS_SetProperty(cx, obj, "wrapperConfig", &nsval);
	} else {
		JS_ValueToObject(cx, nsval, &ns);
	}
	obj = ns;

	js_register_configbinding_Config(cx, obj);
}

