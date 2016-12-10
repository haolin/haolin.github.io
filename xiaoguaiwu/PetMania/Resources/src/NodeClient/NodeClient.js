cc.NodeClient = cc.Class.extend({
    init : function() {
        cc.log('[NodeClient]Initialize node client module.');
    },

    /**
     * @param {JSON} json 待处理消息包
     * @return {String} 发送的消息字符串
     */
    pack : function(json) {
        if (!json) {
            return '';
        }

        var str = JSON.stringify(json);
        return Base64.encode(str);
    },

    /**
     * @param {JSON} json 待处理消息包
     * @return {String} 发送的消息字符串
     */
    unpack : function(msg) {
        if (!msg) {
            return '';
        }

        var str = Base64.decode(msg);
        return JSON.parse(str);
    },

    /**
     * @param {String} token 用户令牌
     * @param {String} msg 消息字符串
     * @return {String} 生成的签名值
     */
    sign : function(token, msg) {
        var str = md5(msg + '+' + token);
        return str;
    },

    /**
     * 获取指定字符的数值
     * @param c 字符
     */
    getCharCode : function(c) {
        return c.charCodeAt(0);
    },

    /**
     * 对字符串进行urlencode编码
     * @param str
     * @returns {*}
     */
    escape : function(str) {
        return encodeURIComponent(str);
    },

    /**
     * 预格式化参数值
     * @param v
     * @returns {*}
     */
    stringifyPrimitive : function(v) {
        switch (typeof v) {
            case 'string':
                return v;
            case 'boolean':
                return v ? 'true' : 'false';
            case 'number':
                return isFinite(v) ? v : '';
            default:
                return '';
        }
    },

    /**
     * 格式化URL参数对象
     * @param obj
     * @param sep
     * @param eq
     * @param name
     * @returns {*}
     */
    stringify : function(obj, sep, eq, name, sep, eq) {
        var self = cc.NodeClient.getInstance();
        sep = sep || '&';
        eq = eq || '=';
        obj = (obj === null) ? undefined : obj;

        switch (typeof obj) {
            case 'object':
                return Object.keys(obj).map(function(k) {
                    var ks = self.escape(self.stringifyPrimitive(k)) + eq;
                    if (Array.isArray(obj[k])) {
                        return obj[k].map(function(v) {
                            return ks + self.escape(self.stringifyPrimitive(v));
                        }).join(sep);
                    } else {
                        return ks + self.escape(self.stringifyPrimitive(obj[k]));
                    }
                }).join(sep);

            default:
                return (!name) ? '' : self.escape(self.stringifyPrimitive(name)) + eq + self.escape(self.stringifyPrimitive(obj));
        }
    },

    /**
     * 签名消息对象
     * 注意，消息对象里的roleid及sign属性的值将会无效！
     * @param json 待签名的消息对象
     */
    signMSGPacket : function(obj, roleid, idx, token, sep, eq) {
        var self = cc.NodeClient.getInstance();
        sep = sep || '&';
        eq = eq || '=';
        obj = (obj === null) ? undefined : obj;

        var signstr = null;

        switch (typeof obj) {
            case 'object':
                signstr = Object.keys(obj).sort().map(function(k) {
                    if (k === 'sign' || k === 'roleid') {
                        return '';
                    } else {
                        var ks = self.escape(self.stringifyPrimitive(k)) + eq;
                        if (Array.isArray(obj[k])) {
                            return obj[k].map(function(v) {
                                return ks + self.escape(self.stringifyPrimitive(v));
                            }).join(sep);
                        } else {
                            return ks + self.escape(self.stringifyPrimitive(obj[k]));
                        }
                    }
                }).filter(function(ele, idx, arr) {
                    return (ele !== '');
                }).join(sep);
                break;

            default:
                signstr = '';
                break;
        }

        var signv = self.sign(token, signstr);

        return ('roleid=' + roleid + '&idx=' + idx + '&' + signstr + '&sign=' + signv);
    },

    /**
     * 发送ajax请求
     * @param {String} url:
     * @param {Hash} option: { data, ifmod, method, timeout, header, binary, before, after }
     *                  option.data     - Mix: request data
     *                  option.ifmod    - Boolean: true is "If-Modified-Since" header
     *                  option.method - String: "GET", "POST", "PUT"
     *                  option.timeout - Number(=10): timeout sec
     *                  option.header  - Hash(= {}): { key: "value", ... }
     *                  option.binary   - Boolean(=false): true is binary data
     *                  option.before   - Function: before(xhr, option)
     *                  option.after     - Function: after(xhr, option, { status, ok })
     * @param {Function} callback: callback(data, option, { status, ok })
     *                  data        - String/Mix/null:
     *                  option      - Hash: 
     *                  status      - Number: HTTP status code
     *                  ok           - Boolean: 
     */
    ajax : function(url, option, callback) {
        var self = this;

        function readyStateChange() {
            if (xhr && xhr.readyState === 4) {
                var data, status = xhr.status, byteArray,
                    rv = { status : status, ok : status >= 200 && status < 300 };
                
                if (!run++) {
                    if (method === "PUT") {
                        data = rv.ok ? xhr.responseText : "";
                    } else {
                        if (rv.ok) {
                            data = xhr.responseText;
                        }
                    }
                    after && after(xhr, option, rv);
                    callback(data, option, rv);
                    gc();
                }
            }
        }

        function ng(abort, status) {
            if (!run++) {
                var rv = { status : status || 400, ok : false };

                after && after(xhr, option, rv);
                callback(null, option, rv);
                gc(abort);
            }
        }

        function gc(abort) {
            abort && xhr && xhr.abort && xhr.abort();
            //watchdog && (setTimeout(watchdog), watchdog = 0);
            if (watchdog) {
                cc.Director.getInstance().getScheduler().unscheduleCallbackForTarget(
                    self,
                    watchdog
                );
                watchdog = 0;
            }

            xhr = null;
        }

        var watchdog = 0,
            method = option.method || "GET",
            header = option.header || {},
            before = option.before,
            after = option.after,
            data = option.data || null,
            xhr = new XMLHttpRequest(),
            run = 0, i,
            overrideMimeType = "overrideMimeType",
            setRequestHeader = "setRequestHeader",
            getbinary = method === "GET" && option.binary;
        
        try {
            xhr.onreadystatechange = readyStateChange;
            xhr.open(method, url, true);    //Async
            before && before(xhr, option);
            getbinary && xhr[overrideMimeType] && xhr[overrideMimeType] && xhr[overrideMimeType]("text/plain; charset=x-user-defined");
            data && xhr[setRequestHeader]("Content-Type", "application/x-www-form-urlencoded");
            for (i in header) {
                xhr[setRequestHeader](i, header[i]);
            }
            xhr.send(data);
            ///////////////////////////////////////////////////////////////////
            watchdog = function() {
                ng(1, 408);  // 408: Request Time-out
            };
            cc.Director.getInstance().getScheduler().scheduleCallbackForTarget(
                self,
                watchdog,
                (option.timeout || 30),
                0,
                0,
                false
            );
            //watchdog = setTimeout(function() {
            //    cc.log('0000000000');
            //    ng(1, 408); // 408: Request Time-out
            //}, (option.timeout || 10) * 1000);
        } catch (err) {
            ng(0, 400); // 400: Bad Request
        }
    },

    /**
     * 获取当前Unix时间(单位: 秒)
     */
    localtime : function() {
        return Math.ceil(Date.now() / 1000);
    },

    /**
     * Unix时间转换成Date对象
     */
    unix2date : function(timestamp) {
        var date = new Date();
        date.setTime(timestamp * 1000);
        return date;
    },

    /**
     * Date对象转换成Unix时间
     */
    date2unix : function(date) {
        return Math.ceil(date.getTime() / 1000);
    }
});

cc.NodeClient._instance = null;
cc.NodeClient.getInstance = function() {
    if (!this._instance) {
        this._instance = new cc.NodeClient();
        this._instance.init();
    }
    return this._instance;
};
