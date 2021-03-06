#include "sharebinding.hpp"
#include "cocos2d_specifics.hpp"
#include "../share/shareSdk.h"

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


JSClass  *jsb_Share_class;
JSObject *jsb_Share_prototype;

JSBool js_sharebinding_Share_shareToFacebook(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Share* cobj = (Share *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 3) {
		const char* arg0;
		const char* arg1;
		JSBool arg2;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		std::string arg1_tmp; ok &= jsval_to_std_string(cx, argv[1], &arg1_tmp); arg1 = arg1_tmp.c_str();
		ok &= JS_ValueToBoolean(cx, argv[2], &arg2);
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->shareToFacebook(arg0, arg1, arg2);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 3);
	return JS_FALSE;
}
JSBool js_sharebinding_Share_shareToSinaWeibo(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Share* cobj = (Share *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 3) {
		const char* arg0;
		const char* arg1;
		JSBool arg2;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		std::string arg1_tmp; ok &= jsval_to_std_string(cx, argv[1], &arg1_tmp); arg1 = arg1_tmp.c_str();
		ok &= JS_ValueToBoolean(cx, argv[2], &arg2);
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->shareToSinaWeibo(arg0, arg1, arg2);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 3);
	return JS_FALSE;
}
JSBool js_sharebinding_Share_shareToWeChatCircle(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Share* cobj = (Share *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 3) {
		const char* arg0;
		const char* arg1;
		JSBool arg2;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		std::string arg1_tmp; ok &= jsval_to_std_string(cx, argv[1], &arg1_tmp); arg1 = arg1_tmp.c_str();
		ok &= JS_ValueToBoolean(cx, argv[2], &arg2);
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->shareToWeChatCircle(arg0, arg1, arg2);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 3);
	return JS_FALSE;
}
JSBool js_sharebinding_Share_shareToTencentWeibo(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Share* cobj = (Share *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 3) {
		const char* arg0;
		const char* arg1;
		JSBool arg2;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		std::string arg1_tmp; ok &= jsval_to_std_string(cx, argv[1], &arg1_tmp); arg1 = arg1_tmp.c_str();
		ok &= JS_ValueToBoolean(cx, argv[2], &arg2);
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->shareToTencentWeibo(arg0, arg1, arg2);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 3);
	return JS_FALSE;
}
JSBool js_sharebinding_Share_shareToRenRen(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Share* cobj = (Share *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 3) {
		const char* arg0;
		const char* arg1;
		JSBool arg2;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		std::string arg1_tmp; ok &= jsval_to_std_string(cx, argv[1], &arg1_tmp); arg1 = arg1_tmp.c_str();
		ok &= JS_ValueToBoolean(cx, argv[2], &arg2);
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->shareToRenRen(arg0, arg1, arg2);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 3);
	return JS_FALSE;
}
JSBool js_sharebinding_Share_shareToMail(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Share* cobj = (Share *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 4) {
		const char* arg0;
		const char* arg1;
		const char* arg2;
		JSBool arg3;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		std::string arg1_tmp; ok &= jsval_to_std_string(cx, argv[1], &arg1_tmp); arg1 = arg1_tmp.c_str();
		std::string arg2_tmp; ok &= jsval_to_std_string(cx, argv[2], &arg2_tmp); arg2 = arg2_tmp.c_str();
		ok &= JS_ValueToBoolean(cx, argv[3], &arg3);
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->shareToMail(arg0, arg1, arg2, arg3);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 4);
	return JS_FALSE;
}
JSBool js_sharebinding_Share_shareback(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Share* cobj = (Share *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 0) {
		cobj->shareback();
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}
JSBool js_sharebinding_Share_shareToWeChatFriend(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSBool ok = JS_TRUE;
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	Share* cobj = (Share *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
	if (argc == 3) {
		const char* arg0;
		const char* arg1;
		JSBool arg2;
		std::string arg0_tmp; ok &= jsval_to_std_string(cx, argv[0], &arg0_tmp); arg0 = arg0_tmp.c_str();
		std::string arg1_tmp; ok &= jsval_to_std_string(cx, argv[1], &arg1_tmp); arg1 = arg1_tmp.c_str();
		ok &= JS_ValueToBoolean(cx, argv[2], &arg2);
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->shareToWeChatFriend(arg0, arg1, arg2);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 3);
	return JS_FALSE;
}
JSBool js_sharebinding_Share_getInstance(JSContext *cx, uint32_t argc, jsval *vp)
{
	if (argc == 0) {
		Share* ret = Share::getInstance();
		jsval jsret;
		do {
		if (ret) {
			js_proxy_t *proxy = js_get_or_create_proxy<Share>(cx, ret);
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

JSBool js_sharebinding_Share_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
	if (argc == 0) {
		Share* cobj = new Share();
		cocos2d::CCObject *_ccobj = dynamic_cast<cocos2d::CCObject *>(cobj);
		if (_ccobj) {
			_ccobj->autorelease();
		}
		TypeTest<Share> t;
		js_type_class_t *typeClass;
		uint32_t typeId = t.s_id();
		HASH_FIND_INT(_js_global_type_ht, &typeId, typeClass);
		assert(typeClass);
		JSObject *obj = JS_NewObject(cx, typeClass->jsclass, typeClass->proto, typeClass->parentProto);
		JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(obj));
		// link the native object with the javascript object
		js_proxy_t* p = jsb_new_proxy(cobj, obj);
		JS_AddNamedObjectRoot(cx, &p->obj, "Share");
		return JS_TRUE;
	}

	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
	return JS_FALSE;
}




void js_sharebinding_Share_finalize(JSFreeOp *fop, JSObject *obj) {
    CCLOGINFO("jsbindings: finalizing JS object %p (Share)", obj);
}

static JSBool js_sharebinding_Share_ctor(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
    Share *nobj = new Share();
    js_proxy_t* p = jsb_new_proxy(nobj, obj);
    nobj->autorelease();
    JS_AddNamedObjectRoot(cx, &p->obj, "Share");
    JS_SET_RVAL(cx, vp, JSVAL_VOID);
    return JS_TRUE;
}

void js_register_sharebinding_Share(JSContext *cx, JSObject *global) {
	jsb_Share_class = (JSClass *)calloc(1, sizeof(JSClass));
	jsb_Share_class->name = "Share";
	jsb_Share_class->addProperty = JS_PropertyStub;
	jsb_Share_class->delProperty = JS_PropertyStub;
	jsb_Share_class->getProperty = JS_PropertyStub;
	jsb_Share_class->setProperty = JS_StrictPropertyStub;
	jsb_Share_class->enumerate = JS_EnumerateStub;
	jsb_Share_class->resolve = JS_ResolveStub;
	jsb_Share_class->convert = JS_ConvertStub;
	jsb_Share_class->finalize = js_sharebinding_Share_finalize;
	jsb_Share_class->flags = JSCLASS_HAS_RESERVED_SLOTS(2);

	JSPropertySpec *properties = NULL;

	static JSFunctionSpec funcs[] = {
		JS_FN("shareToFacebook", js_sharebinding_Share_shareToFacebook, 3, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("shareToSinaWeibo", js_sharebinding_Share_shareToSinaWeibo, 3, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("shareToWeChatCircle", js_sharebinding_Share_shareToWeChatCircle, 3, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("shareToTencentWeibo", js_sharebinding_Share_shareToTencentWeibo, 3, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("shareToRenRen", js_sharebinding_Share_shareToRenRen, 3, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("shareToMail", js_sharebinding_Share_shareToMail, 4, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("shareback", js_sharebinding_Share_shareback, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FN("shareToWeChatFriend", js_sharebinding_Share_shareToWeChatFriend, 3, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("ctor", js_sharebinding_Share_ctor, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
	};

	static JSFunctionSpec st_funcs[] = {
		JS_FN("getInstance", js_sharebinding_Share_getInstance, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FS_END
	};

	jsb_Share_prototype = JS_InitClass(
		cx, global,
		NULL, // parent proto
		jsb_Share_class,
		js_sharebinding_Share_constructor, 0, // constructor
		properties,
		funcs,
		NULL, // no static properties
		st_funcs);
	// make the class enumerable in the registered namespace
	JSBool found;
	JS_SetPropertyAttributes(cx, global, "Share", JSPROP_ENUMERATE | JSPROP_READONLY, &found);

	// add the proto and JSClass to the type->js info hash table
	TypeTest<Share> t;
	js_type_class_t *p;
	uint32_t typeId = t.s_id();
	HASH_FIND_INT(_js_global_type_ht, &typeId, p);
	if (!p) {
		p = (js_type_class_t *)malloc(sizeof(js_type_class_t));
		p->type = typeId;
		p->jsclass = jsb_Share_class;
		p->proto = jsb_Share_prototype;
		p->parentProto = NULL;
		HASH_ADD_INT(_js_global_type_ht, type, p);
	}
}

void register_all_sharebinding(JSContext* cx, JSObject* obj) {
	// first, try to get the ns
	jsval nsval;
	JSObject *ns;
	JS_GetProperty(cx, obj, "share", &nsval);
	if (nsval == JSVAL_VOID) {
		ns = JS_NewObject(cx, NULL, NULL, NULL);
		nsval = OBJECT_TO_JSVAL(ns);
		JS_SetProperty(cx, obj, "share", &nsval);
	} else {
		JS_ValueToObject(cx, nsval, &ns);
	}
	obj = ns;

	js_register_sharebinding_Share(cx, obj);
}

