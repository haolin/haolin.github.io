ARK_KEY_FOR_WEB = "SENDTOSEVEREEEQXXTE";

cc.NodeSelf = cc.Class.extend({
    /**
     * 初始化
     * 内部接口，不允许外部文件调用
     */
    init : function() {
        // ### 常量定义 ###
        this.kLoginServerHost = LOGIN_IP; //登录服务器地址
        this.kLogicServerHost = CLIENT_IP; //游戏逻辑服务器地址
        this.kPaymentServerHost = APY_IP;//支付验证服务器地址
        this.kUpdateServerHost = UPDATE_IP; //更新服务器地址

        this.kLoginUrl = this.kLoginServerHost + '/passport/access'; //使用第三方账号申请访问授权请求地址
        this.kValidFriendUrl = this.kLoginServerHost + '/passport/friend';  //校验第三方账号有效好友请求地址
        this.kRoleRequestUrl = this.kLogicServerHost + '/c'; //以角色编号为标签的带签名请求地址

        this.kNewRoleUrl = this.kLoginServerHost + '/role/new'; //申请新角色请求地址
        this.kRoleAccessUrl = this.kLoginServerHost + '/role/access'; //更新角色授权信息请求地址
        this.kRoleEvaluateUrl = this.kLoginServerHost + '/role/evaluate'; //更新角色评价系统状态
        this.kGetSpringFestivalFlagUrl = this.kLoginServerHost + '/activity/festival'; //获取春节活动标记值请求地址
        this.kGet0214FlagUrl = this.kLoginServerHost + '/activity/0214'; //获取情人节活动标记值请求地址

        this.kGetGirlsCarnivalFlagUrl = this.kLoginServerHost + '/activity/0307'; //获取女生节活动标记值请求地址

        this.kLoginUrlGetAllSwitch = this.kLoginServerHost + '/activity/getallswitch'; //所有开关
        this.kLoginUrlGetServerInfo = this.kLoginServerHost + '/activity/getserverinfo'; //获取当前服务器的信息
        this.kLoginUrlDiscountDiamond = this.kLoginServerHost + '/activity/discountdiamond'; //商城钻石打折

        this.kGetPayInfoUrl = this.kPaymentServerHost + '/pay/payInfo';               //每次客户端支付一次, 就给服务器发送一条支付信息

        this.kLoginUrlAddActionUser = this.kLoginServerHost + '/passport/actionUser'; //添加关注
        this.kLoginUrlGetRecomendUsers = this.kLoginServerHost + '/passport/getRecommendUsers'; //好友推荐

        this.kLoginUrlDailySignUp = this.kLoginServerHost + '/signup/dailysignup';          //每日签到
        this.kLoginUrlRecvSignReward = this.kLoginServerHost + '/signup/recvreward';           //领取签到奖励
        this.kLoginUrlGetReward = this.kLoginServerHost + '/signup/getreward';           //获得签到奖励
        this.kLoginUrlLogOffAccount = this.kLoginServerHost + '/passport/logoff';               //注销账号
        this.kLoginUrlSetGuestSwitch = this.kLoginServerHost + '/passport/setguestswitch';               //IOS Guest 按钮隐藏开关
        this.kLoginUrlGetGuestSwitch = this.kLoginServerHost + '/passport/getguestswitch';               //IOS Guest 按钮隐藏开关

        // ### 登陆信息 ###
        this._channel = CHANNEL; //渠道编号
        this._zone = ZONE; //上次登录的游戏区名称(只读属性，不允许修改！！！)
        this._imei = null; //IMEI码
        this._roleid = null; //角色编号(新)(合并原有的roleid和deviceid)
        this._token = null; //访问令牌(新)(合并原有的roleid和deviceid)
        this._idx = -1; //同一账号下此登录设备的索引号
        this._bfree = false; //是否为空闲账号
        this._uid = null; //userid
        this._nick = null; //用户昵称

        this._accounts = {}; //保持第三方账号平台登录信息

        // ### 角色信息 ###
        this._timestamp = 0;    //角色数据快照时间点(Unix时间, 秒)
        this._diamond = 0;      //当前钻石个数
        this._stage1 = null;    //普通关卡得分数组
        this._stage2 = null;    //空间站关卡得分数组
        this._candy_urv = 0;    //薄荷糖上限
        this._ssrn = 0;         //空间站关卡编号
        this._ssrt = 0;         //空间站关卡解锁冷却时间
		this._candy = 0;         //薄荷糖个数

        //道具信息
        this._LineXiao = 0;          //13
        this._BoomXiao = 0;          //14
        this._SameXiao = 0;          //15
        this._Move = 0;                 //16
        this._TimePanel = 0;        //17
        this._Color = 0;                 //18
        this._LanMao = 0;                  //19
        this._FireX = 0;               //20
        this._ConGame = 0;                 //29


        // ### 行为日志 ###
        this._record = [];

        //初始化client (不要直接使用这个值！！！)
        this._client = cc.NodeClient.getInstance();

        //注册动作的响应处理 ( [action:[callbackfn]] )
        this._registercbs = new Array(cc.NodeDefine.NET_ACTIONS.kUndefined);

        //当前服务器时间
        this._tsclient = this._client.localtime();
        this._tsserver = this._client.localtime();

        this._selfPhotoUrl = "";

        cc.log("[NodeClient] [INFO] 初始化NodeSelf单例对象完成.");
    },

    cleanUp : function()
    {
        this._channel = CHANNEL; //渠道编号
        this._zone = ZONE; //上次登录的游戏区名称(只读属性，不允许修改！！！)
        this._imei = null; //IMEI码
        this._roleid = null; //角色编号(新)(合并原有的roleid和deviceid)
        this._token = null; //访问令牌(新)(合并原有的roleid和deviceid)
        this._idx = -1; //同一账号下此登录设备的索引号
        this._bfree = false; //是否为空闲账号
        this._uid = null; //userid
        this._nick = null; //用户昵称
    },

    /**
     * 更新本地缓存的服务器端角色数据
     * @param ts 数据更新时间戳
     * @param diamond 当前钻石个数
     * @param candy_urv 薄荷糖上限个数（仅包含扩充的个数）
     * @param stage1 普通关卡的得分数组
     * @param stage2 空间站关卡的得分数组
     * @param ssrn 空间站关卡的编号
     * @param ssrt 空间站关卡恢复的时间
     * @private
     */
    _updateServerRoleData : function(ts, diamond, candy_urv, stage1, stage2, ssrn, ssrt) {
        this._timestamp = ts;
        this._diamond = diamond;
        this._candy_urv = candy_urv;
        this._ssrn = ssrn;
        this._ssrt = ssrt;
        this._stage1 = stage1;
        this._stage2 = stage2;
    },

    _updateServerPropsData : function (newprops) {
        this._LineXiao = newprops.LineXiao;          //13
        this._BoomXiao = newprops.BoomXiao;          //14
        this._SameXiao = newprops.SameXiao;          //15
        this._Move = newprops.Move;                 //16
        this._TimePanel = newprops.TimePanel;        //17
        this._Color = newprops.Color;                 //18
        this._LanMao = newprops.LanMao;                  //19
        this._FireX = newprops.FireX;               //20
        this._ConGame = newprops.ConGame;
    },

    /**
     * 清空本地缓存的服务器端角色数据
     * @private
     */
    _cleanServerRoleData : function() {
        this._timestamp = 0;
        this._diamond = 0;
        this._candy_urv = 0;
        this._ssrn = 0;
        this._ssrt = 0;
        this._stage1 = null;
        this._stage2 = null;
    },


    /**
     * 获取当前角色编号
     */
    getRoleId : function() {
        cc.log('[NodeClient] [WARN] 调用将废弃接口 NodeSelf->getDeviceID .');
        return this.getLocalRoleID();
    },

    /**
     * 获取当前用户编号
     */
    getUID : function(){
        return this._uid;
    },

    /**
     * 获取当前用户昵称
     */
    getNick : function(){
        return this._nick;
    },

    /**
     * 获取当前角色访问令牌
     */
    getToken : function() {
        cc.log('[NodeClient] [WARN] 调用将废弃接口 NodeSelf->getToken .');
        return this._token;
    },

    /**
     * 获得头像路径
     */
    getSelfPhoto : function() {
        return this._selfPhotoUrl;
    },

    /**
     * 设置头像路径
     */
    setSelfPhoto : function(url) {
        this._selfPhotoUrl = url;
        return this;
    },

    /**
     * 获取当前服务器时间(秒)
     * @return {Number} 返回当前服务器的Unix时间秒数
     */
    getServerTime : function() {
        return this._tsserver + this._client.localtime() - this._tsclient;
    },

    /**
     * 初始化当前设备的imei值
     */
    initIMEI : function(imei) {
        //进行数据简单校验
        if (!imei || ~['null','undefined'].indexOf(imei)) {
            cc.log('[NodeClient] [ERROR] 第三方登录完成时设置角色登录信息有误: 设备号不正确！');
            return;
        }

        //只要当前有值就不变更，以本地保存数据为准.
        if (!this._imei) {
            this._imei = imei;

            cc.log('[NodeClient] [INFO] 当前imei值变更: ' + imei);
        }
    },

    /**
     * 配置当前角色信息
     */
    initRole : function(roleid, idx, token, uid, nick) {
        //进行数据简单校验
        if (!roleid || ~['null','undefined'].indexOf(roleid)) {
            cc.log('[NodeClient] [ERROR] 第三方登录完成时设置角色登录信息有误: 角色编号不正确！');
            return;
        }

        if (!token || ~['null','undefined'].indexOf(token)) {
            cc.log('[NodeClient] [ERROR] 第三方登录完成时设置角色登录信息有误: 访问令牌不正确！');
            return;
        }

        if (isNaN(idx) || !(idx > 0 || idx === 0)) {
            cc.log('[NodeClient] [ERROR] 第三方登录完成时设置角色登录信息有误: 角色索引号不正确！');
            return;
        }

        //角色编号是否发生改变
        var bChange = (this._roleid && this._roleid !== roleid);

        this._roleid = roleid;
        this._idx = idx;
        this._token = token;
        this._uid = uid;
        this._nick = nick;

        if (bChange) {
            this._cleanServerRoleData();
        }

        this.triggerActionCallback(cc.NodeDefine.NET_ACTIONS.kRoleIDChange);
    },

    /**
     * 设置绑定第三方账号信息
     */
    initPassportAccount : function(passport, userid) {
        cc.log("initPassportAccount, passport: " + passport + ", userid: " + userid);
        this._accounts[passport] = userid;
        this._bfree = false;
    },

    /**
     * 配置登陆信息
     * @param {String} imei 设备唯一识别码
     * @param {String} roleid 角色编号(游戏逻辑服务器角色唯一标记符)
     * @param {String} token 访问令牌(目前暂时与登陆账号系统返回的access token一致)
     */
    configure : function(imei, roleid, token, idx, uid, nick) {
        this.initIMEI(imei);
        this.initRole(roleid, idx, token, uid, nick);
        this._cleanServerRoleData();
        cc.log('[NodeClient] [INFO] 第三方登录完成，设置角色登录信息.');
    },

    /**
     * 序列化此对象
     * @return {String} 序列化对象后生成的字符串
     */
    serialize : function() {
        var json = {
            'zone' : this._zone,
            'imei' : this._imei,
            'roleid' : this._roleid,
            'token' : this._token,
            'idx' : this._idx,
            'bfree' : this._bfree
        };

        return JSON.stringify(json);
    },

    /**
     * 反序列化此对象
     * @param str 序列化后的字符串
     * @return {Boolean} 是否发生变换游戏区行为
     */
    deserialize : function(str) {
        var json = JSON.parse(str);
        //对版本进行兼容处理
        if (isNaN(json.idx) || !(json.idx > 0 || json.idx === 0)) {
            //对于旧版不读取任何角色信息
            cc.log('[NodeClient] [WARN] 发现旧版序列化存储文件.');
            return false;
        } else {
            //判断所在区名称是否一致
            this._imei = json.imei || 'unknown';

            if (this._zone === json.zone) {
                this._roleid = json.roleid;
                this._token = json.token;
                this._idx = json.idx;
                this._bfree = json.bfree || false;

                this.triggerActionCallback(cc.NodeDefine.NET_ACTIONS.kRoleIDChange);

                return false;
            } else {
                cc.log('[NodeClient] [WARN] 发现其它游戏区的本地存储数据');
                this._bfree = true;

                return true;
            }
        }
    },

    /**
     * 生成指定范围内的随机数
     * @param min 随机范围的下限值
     * @param max 随机范围的上限值
     * @returns {Number} 生成的随机数
     * @private
     */
    _createRandomNumber : function(min, max) {
        return Math.ceil(Math.random() * (max - min) + min);
    },

    /**
     * 向指定请求地址发送请求（不包含签名机制）
     * @param url
     * @param json
     * @param callback
     * @private
     */
	_sendCommonURLRequest : function(url, json, opts, callback) {
        //linhao 屏蔽联网
        return;
        var self = this;
        var client = cc.NodeClient.getInstance();
        cc.log("send CommonURLRequest to server: + url");
        //附加随机值和渠道编号
        json.t = self._createRandomNumber(100000, 999999);
        json.n = self._channel;

        var msg = JSON.stringify(json);
        var data = this.sever_setValueToAes(msg);

        cc.log("加密： data =" + data);

//        cc.log('Send url=' + url + ' message to LoginServer......' + JSON.stringify(data));

        client.ajax(
            url,
            { 'data' : data, 'method' : 'POST', 'timeout' : (opts.timeout || 10) },
            function(response, option, result) {
                cc.log('Receive url=' + url + ' message from LoginServer......');
                var arg1 = false, arg2 = 0;

                do {

                    if (!result.ok) {
                        cc.log("_sendCommonURLRequest error: " + result.status);
                        netTimeoutCall();
                        break;
                    }

                    var tryJSON = JSON.parse(response);//服务器发过来的有双引号 用此方法去掉

                    var packetStr = self.sever_getValueFromAes(tryJSON);//client.unpack(packet);

                    if (packetStr == "") {
                        break;
                    }

                    cc.log("解密 ： " + packetStr);

                    var packet = JSON.parse(packetStr);

                    cc.log('[NodeClient] receive : ' + JSON.stringify(packet));

                    if (packet.code) {
                        cc.log('[NodeClient] [ERROR] 服务器返回错误信息: ' + packet.message);
                        arg2 = packet.code;
                        break;
                    }

                    arg1 = true;
                    arg2 = packet;
                } while (false);

                callback(arg1, arg2);
            }
        );
    },

    /**
     * 向指定请求地址发送带签名消息(内部接口)
     * @param json
     * @param callback
     * @private
     */
    _sendCommonRoleSignMSG : function(url, json, callback) {
        //linhao 屏蔽联网
        return;

        var self = this;

        var client = cc.NodeClient.getInstance();

        //附加消息编号随机值
        json.t = self._createRandomNumber(100000, 999999);

        //附加渠道编号
        json.n = self._channel;

        var data = client.signMSGPacket(json, self._roleid, self._idx, self._token);
        cc.log('Send url=' + url + ' message to LoginServer......');

        client.ajax(url, { 'data' : data, 'method' : 'POST' }, function(response, option, result) {
            cc.log('Receive url=' + url + ' message from LoginServer......');
            var arg1 = false, arg2 = 0;

            do {
                if (!result.ok) {
                    cc.log("网络错误 错误码: " + result.status);
                    netTimeoutCall();
                    break;
                }

                var packet = JSON.parse(response);
                if (!packet) {
                    break;
                }

                cc.log('[NodeClient] receive : ' + JSON.stringify(packet));

                if (packet.code) {
                    cc.log('[NodeClient] [ERROR] 服务器返回错误信息: ' + packet.message);
                    arg2 = packet.code;
                    break;
                }

                arg1 = true;
                arg2 = packet;
            } while (false);

            callback(arg1, arg2);
        });
    },

    /**
     * 向游戏逻辑服务器发送带签名消息(内部接口)
     * @param {JSON} json 待发送消息包JSON对象
     *      其中，字段 r, m, s, n, t 为保留字段，不允许自行定义与使用
     *      r代表角色编号roleid
     *      m代表消息文本msg
     *      s代表签名文本sign
     *      n代表渠道编号channel
     *
     * @param {Function} callback 发送完成回调
     */
    _sendRoleSignMSG : function(json, callback) {
        //linhao 屏蔽联网
        return;
        var self = this;

        var client = cc.NodeClient.getInstance();

        //附加消息编号随机值
        json.t = self._createRandomNumber(100000, 999999);

        //附加渠道编号
        json.n = self._channel;

        var msg = JSON.stringify(json);

        //client.pack(json);
        var data = {
            'u': self._roleid,
            'idx': self._idx,
            'm' : msg,
            's' : client.sign(self._token, msg)
        }
//        var data = 'u=' + self._roleid + '&idx=' + self._idx + '&m=' + msg + '&s=' + client.sign(self._token, msg);
        cc.log('Send pid=' + json.pid + ' message to GameServer......');
        data = this.sever_setValueToAes(JSON.stringify(data));

        client.ajax(
            self.kRoleRequestUrl,
            { 'data' : data, 'method' : 'POST', 'timeout' : (json.timeout || 60)  },
            function(response, option, result) {
                cc.log('Receive pid=' + json.pid + ' message from GameServer......');
                var arg1 = false, arg2 = 0, arg3 = null;

                do {
                    if (!result.ok) {
                        cc.log("send message error: " + result.status);
                        netTimeoutCall();
                        break;
                    }

                    var packetStr = self.sever_getValueFromAes(response);//client.unpack(packet);

                    if (packetStr == "") {
                        break;
                    }

                    var packet = JSON.parse(packetStr);

                    cc.log('[NodeClient] receive : ' + JSON.stringify(packet));

                    var code = packet.c || packet.code || 0;
                    if (code !== -1) {
                        arg2 = code;
                        arg3 = packet;
                        break;
                    }

                    arg1 = true;
                    arg2 = packet;
                } while (false);

                callback(arg1, arg2, arg3);
            }
        );
    },

//    /**
//     * 查找是否存在指定的回调函数注册
//     * @param action 合法的网络动作编号
//     * @param callback 执行完成回调函数
//     * @param owner 回调归属者
//     * @return {Boolean} 此回调函数是否已经注册
//     */
//    _checkRegisterActionCallbackExist : function(action, callback, owner) {
//        var isfound = false;
//
//        var cbs = this._registercbs[action];
//        for (var i = 0, len = cbs.length; i < len; i++) {
//            var func = cbs[i];
//            if (callback === func[0] && (!owner || owner === func[1])) {
//                isfound = true;
//                break;
//            }
//        }
//
//        return isfound;
//    },
//
//    /**
//     * 查找指定的回调函数在注册列表里的索引值
//     * @param action 合法的网络动作编号
//     * @param callback 执行完成回调函数
//     * @param owner 回调归属者
//     * @return {Number} 实际的索引值，不存在则为-1
//     */
//    _findIndexOfRegisterActionCallback : function(action, callback, owner) {
//        var idx = -1;
//
//        var cbs = this._registercbs[action];
//        for (var i = 0, len = cbs.length; i < len; i++) {
//            var func = cbs[i];
//            if (callback === func[0] && (!owner || owner === func[1])) {
//                idx = i;
//                break;
//            }
//        }
//
//        return idx;
//    },

    /**
     * 注册指定动作的回调(允许同一个动作注册不同的回调，但相同回调相同动作的只能有一个)
     * @param action 指定的动作类型编号
     * @param callback 回调函数
     * @param owner [可选]回调函数的归属者
     */
    registerActionCallback : function(action, callback, owner) {
        var maxaction = cc.NodeDefine.NET_ACTIONS.kUndefined;
        if (0 < action && action < maxaction) {
            var cbs = this._registercbs[action];
            if (cbs) {
                if (~cbs.indexOf(callback)) {
                    cc.log('[NodeClient]repeat register ' + action + ', ' + callback);
                } else {
                    cbs.push(callback);
                }
                //if (this._checkRegisterActionCallbackExist(action, callback, owner)) {
                //    cc.log('[NodeClient]repeat register ' + action + ', ' + callback);
                //} else {
                //    cbs.push([callback,owner]);
                //}
            } else {
                this._registercbs[action] = [callback];
                //this._registercbs[action] = [[callback,owner]];
            }
        }
    },

    /**
     * 注销指定动作的回调(将移除所有与动作和回调一致的注册项)
     * @param action 指定的动作类型编号
     * @param callback [可选]回调函数, 如果此值为空则移除此动作注册的所有回调
     * @param owner [可选]回调归属者, 当前仅当回调函数存在时
     */
    unregisterActionCallback : function(action, callback, owner) {
        var maxaction = cc.NodeDefine.NET_ACTIONS.kUndefined;
        if (0 < action && action < maxaction) {
            var cbs = this._registercbs[action];
            if (cbs && cbs.length > 0) {
                if (callback) {
                    var idx = cbs.indexOf(callback);
                    //var idx = this._findIndexOfRegisterActionCallback(action, callback, owner);
                    if (~idx) {
                        //注意：splice可能存在不同JS引擎的兼容性问题
                        cbs.splice(idx, 1);
                    }
                } else {
                    this._registercbs[action] = [];
                }
            }
        }
    },

    /**
     * 触发注册动作(内部接口)
     * @param action 指定的动作类型编号
     * @param arguments 可选的附加参数
     */
    triggerActionCallback : function(action) {
        var maxaction = cc.NodeDefine.NET_ACTIONS.kUndefined;
        if (0 < action && action < maxaction) {
            var cbs = this._registercbs[action];
            if (cbs && cbs.length > 0) {
                var args = Array.prototype.slice.call(arguments, 1);
                cbs.forEach(function(fn) {
                    fn && fn.apply(null, args);
                    //fn && fn[0].apply(fn[1], args);
                });
            }
        }
    },

    /**
     * 是否已经登录
     * 登录状态不会保持在本地存储文件，故无法跨启动使用
     * 登录状态仅代表登录第三方账号平台，游戏服务器无需登录状态
     * @return {Boolean} 是否处于登陆状态
     */
    isLogin : function() {
        return (Object.keys(this._accounts).length > 0);
    },

    /**
     * 获取userid
     */
    getUserID : function(passport) {
        return this._accounts[passport];
    },


    /**
     * 登录第三方账号平台
     */
    login : function() {
        //不在此文件内处理！！！
        cc.log('[NodeClient] [ERROR] 调用无实现的接口 NodeSelf->login .');
    },

    /**
     * 注销第三方账号平台当前登录信息
     */
    logout : function() {
        this._accounts = {};
    },

    /**
     * 申请游戏逻辑服务器访问授权
     * 如果是KaKao帐号，code是一个对象(access_token, user_id)
     */
    applyGameServerAccess : function(passport, code, callback) {
        var client = cc.NodeClient.getInstance();
        var self = this;
        var json = {
            'd' : passport,
            'r' : self._roleid,
            'i' : self._idx
        };

        if (passport == 'kakao') {
            json['c'] = code.access_token;
            json['token'] = self._token;
            json['userid'] = code.user_id;
            json['nick'] = code.nick;
            json['avatar'] = code.avatar;
        } else {
            json['c'] = code;
        }

        var opts = {
            'timeout' : 1000
        };
		
		cc.log("applyGameServerAccess to self._sendCommonURLRequest");
        self._sendCommonURLRequest(self.kLoginUrl, json, opts, callback);
    },

    /**
     * 第三方账号平台有效好友过滤
     * @param passport 第三方账号平台
     * @param fids 好友编号
     * @param callback
     */
    validPassportFriends : function(passport, fids, callback) {
        var self = this;
        var json = {
            'd' : passport,
            'uids' : fids
        };
        var opts = {
            'timeout' : 15
        };
        self._sendCommonURLRequest(self.kValidFriendUrl, json, opts, callback);
    },

    /**
     * 添加关注
     * @param provider
     * @param uid 第三方用户编号，如微博编号
     * @param callback
     */
    asyncAddActionUser : function(provider, uid, callback) {
        var self = this;
        var json = {
            'uid' : uid,
            'provider' : provider,
            'token' : self._token
        };
        var opts = {
            'timeout' : 3000000
        };

        self._sendCommonURLRequest(self.kLoginUrlAddActionUser, json, opts, function(err, reply) {
            if(err) {
                callback(err);
            } else {
                callback(err, reply);
            }
        });
    },

    /**
     * 获取好友推荐
     * @param provider
     * @param uid 第三方用户编号，如微博编号
     * @param token
     * @param callback
     */
    asyncGetRecomendUsers : function(provider, callback) {
        var client = cc.NodeClient.getInstance();
        var self = this;
        var json = {
            'd' : provider,
            'roleid' : self._roleid,
            'token' : self._token
        };
        var opts = {
            'timeout' : 3000000
        };

        self._sendCommonURLRequest(self.kLoginUrlGetRecomendUsers, json, opts, function(err, reply) {
            if (err && err !== true) {
                callback(err);
            } else {
                var decode = client.unpack(reply);
                callback(err, decode);
            }
        });
    },

    /**
     * 上传角色属性快照
     * @param {JSON} diamond 当前角色数据 { 'cur' : 0, 'cost' : 0, 'income' : 0 }
     * @param {Array} scores1 普通关卡得分数组（按关卡序号顺序，从0开始）
     * @param {Array} scores2 空间站关卡得分数组（按关卡序号顺序，从0开始）
     * @param {JSON} candy 薄荷糖数组 { 'max' : [当前最大值], 'add' : [此次增加值], 'cur' : [当前薄荷糖数量] }
     *      其中,
     *      当前薄荷糖数量不得超过999，否则整个数据上传将会失败！！！
     *      props = {
     *          'LineXiao' : LineXiao,          //13
     *          'BoomXiao' : BoomXiao,          //14
     *          'SameXiao' : SameXiao,          //15
     *          'Move' : Move,                  //16
     *          'TimePanel' : TimePanel,        //17
     *          'Color' : Color,                  //18
     *          'LanMao' : LanMao,                  //19
     *          'FireX' : FireX,                  //20
     *          'ConGame' : ConGame                  //29
     *      }
     * @param {Number} ssrd 空间站关卡恢复数据
     * @param {Function} callback 执行完成回调函数
     *      callback(result, diamond, scores)
     *      1: {Boolean} result 是否成功
     *      2: {Number} diamond 当前最新的钻石数
     *      3: {Array} scores 当前最新的关卡得分
     */
    snapshot : function(diamond, scores1, scores2, candy, ssrd,callback) {
        var self = this;
        //版本兼容处理
        scores2 = scores2 || [];
        candy = candy || { 'max' : 0, 'add' : 0 };
        ssrd = ssrd || { 'ssrn' : -1, 'ssrt' : 0 };
        ssrd.ssrn += 1; //兼容客户端从0开始编号关卡

        var json = {
            'pid' : '1001',
            'diamond' : diamond,
            'ssl' : scores1,
            's2sl' : scores2,
            'candy' : candy,
            'ssrd' : ssrd
        };
        self._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                var ts = packet.d.timestamp;
                var diamond = packet.d.diamond;
                var stage1 = packet.d.stage1_scores;
                var stage2 = packet.d.stage2_scores;
                var candy_urv = packet.d.candy_urv;
                var ssrn = packet.d.ssrn - 1;
                var ssrt = packet.d.ssrt;
                var ssrd = { 'ssrn' : ssrn, 'ssrt' : ssrt };
				var _candy = packet.d.candy;
                self._updateServerRoleData(ts, diamond, candy_urv, stage1, stage2, ssrn, ssrt);

                callback(true, diamond, stage1, stage2, candy_urv, ssrd, _candy);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 下载角色属性最近存储的快照
     * @param {Function} callback 执行完成回调
     *      callback(result, diamond, scores1, scores2, candy_urv)
     *      1: {Boolean} result 是否成功
     *      2: {Number} diamond 当前最新的钻石数
     *      3: {Array} scores1 当前普通关卡最高得分
     *      4: {Array} scores2 空间站关卡最高得分
     *      5: {Number} candy_urv 薄荷糖上限值
	 *      6: {Number} freeCandy 薄荷糖无限时间
	 *      7: {Number} recvtime 薄荷糖恢复CD时间
	 *      8: {Number} candy 薄荷糖数量
     */
    download : function(callback) {
        var self = this;
        var json = {'pid':'1002'};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                var snapshot = packet.ss;
                var ts = 0, diamond = 0, candy_urv = 0;
                var scores1 = [];
                var scores2 = [];
                var ssrd = {};
                var newprops = null;
                var freeCandy = null;
                var recvtime = null;
				var candy = null;

				cc.log("snapshot = " + JSON.stringify(snapshot));
                if (snapshot) {
                    ts = snapshot.timestamp;
                    diamond = snapshot.diamond || 0;
                    scores1 = snapshot.stage1_scores;
                    scores2 = snapshot.stage2_scores;
                    candy_urv = snapshot.candy_urv;
                    ssrd.ssrn = snapshot.ssrn - 1;
                    ssrd.ssrt = snapshot.ssrt;

                    newprops = {
                        'LineXiao' : snapshot.LineXiao,          //13
                        'BoomXiao' : snapshot.BoomXiao,          //14
                        'SameXiao' : snapshot.SameXiao,          //15
                        'Move' : snapshot.Move,                  //16
                        'TimePanel' : snapshot.TimePanel,        //17
                        'Color' : snapshot.Color,                  //18
                        'LanMao' : snapshot.LanMao,                  //19
                        'FireX' : snapshot.FireX,                  //20
                        'ConGame' : snapshot.ConGame                  //29
                    };

                    freeCandy = snapshot.freecandy || 0;
                    recvtime = snapshot.recvtime;
					candy = snapshot.candy || 0;
                }
				
				cc.log("newprops = " + JSON.stringify(newprops));
				
//                self._updateServerRoleData(ts, diamond, candy_urv, scores1, scores2, ssrd.ssrn, ssrd.ssrt);
//                self._updateServerPropsData(newprops);
                callback(true, diamond, scores1, scores2, candy_urv, ssrd, newprops, freeCandy, recvtime, candy);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 逻辑心跳请求
     * 此逻辑请求还用于服务端与客户端的校时
     * @param {Function} callback 执行完成回调
     *      callback(result, notices)
     *      1: {Boolean} result 是否成功完成
     */
    heartbeat : function(callback) {
        var self = this;
        var ts = this._client.localtime();
        var json = { 'pid' : '1003', 'ts' : ts };
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                self._handleServerTime(packet.ct, packet.st);
                self._handleReceiveNotices(packet.notices, function() {
                    callback(true);
                });
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 处理服务端与客户端时间同步
     * @param {Number} ct 发起请求时客户端的时间戳
     * @param {Number} st 接收到请求时服务端的时间戳
     * @private
     */
    _handleServerTime : function(ct, st) {
        var curt = this._client.localtime();
        var dt = curt - ct; //此次客户端出现的时间差

        if (dt >= 0 && dt < 120) {
            cc.log('[NodeSelf] [WARN] 出现过长的延时时间.');
        }

        this._tsserver = st;
        this._tsclient = curt;
    },

    /**
     * 处理接收到的通知消息(内部接口)
     * @param notices 通知消息数组
     * @param callback 执行完成回调(无参数)
     */
    _handleReceiveNotices : function(notices, callback) {
        var ACTIONS = cc.NodeDefine.NET_ACTIONS;
        var NOTICES = cc.NodeDefine.NOTICES;

        for (var i = 0; i < notices.length; i++) {
            var notice = notices[i];
            switch (notice.evt) {
                case NOTICES.kReceivePowerFromFriendNotice: //赠送者角色编号，赠送数量，赠送时间
                    this.triggerActionCallback(ACTIONS.kReceivePowerFromFriend, notice.frid, notice.num, notice.ct);
                    break;
                case NOTICES.kRecvNewMail: //(邮件全文S)
                    this.triggerActionCallback(ACTIONS.kRecvNewMail, JSON.parse(notice.mt));
                    break;
                default:
                    cc.log('Found NOT handle net action：' + JSON.stringify(notice));
                    break;
            }
        }
        callback();
    },

    /**
     * 获取好友信息，支持批量获取
     * @param {String} ditch 账号渠道名称标识值:'qihoo','facebook','coco', 'weibo', suid是玩家自身的user_id
     * @param {Array} friends 好友Qihoo角色编号数组
     * @param {Function} callback 执行完成回调
     *      callback(isok, infos)
     *      1:{Boolean} isok 是否执行成功
     *      2:{JSON} infos 好友信息对象
     *          示例格式：{
     *              '账号来源渠道编号' : [
     *                 '角色编号',
     *                 '完成普通关卡个数',
     *                 '索要体力CD',
     *                 '赠送体力CD',
     *                 '关卡援助数据',
     *                 '完成挑战关卡个数'
     *              ]
     *          }
     *     3：星球排行榜
     */
    getFriendsInfo : function(suid, ditch, friends, callback) {

        var json = { 'pid' : '1004', 'ditch' : ditch, 'fids' : friends, 'suid' : suid};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                var infos = packet.infos;
                //关卡援助数据处理
                var keylist = Object.keys(infos);
                for (var i = 0; i < keylist.length; i++) {
                    var keyname = keylist[i];
                    var helpcds = infos[keyname][4];
                    if (helpcds) {
                        //TODO(Neil): 由于客户端还未统一关卡起始编号，故此处暂不作-1处理.
                        helpcds.stageid = parseInt(helpcds.stageid, 10) - 1;
                        infos[keyname][4] = helpcds;
                    }
                }
                callback(result, infos, packet.planetRank);
            } else {
                callback(result, packet);
            }
        });
    },

    /**
     * 获取指定关卡指定好友的得分情况
     * @param {Number} stage 指定关卡编号
     * @param {Array} friends 指定好友角色编号数组，注意此角色编号为roleid
     * @param {Function} callback 执行完成回调
     *      callback(result, stage, scores)
     *      1: {Boolean} result 是否成功执行完成
     *      2: {Number} stage 关卡编号
     *      3: {JSON} scores 返回的好友关卡得分 { 好友角色编号 : 当前得分 }
     */
    getStageScoresFromFriends : function(stage, friends, callback) {
        var json = { 'pid' : '1005', 'stage' : (stage + 1), 'fids' : friends};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.stage - 1, packet.scores);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 赠送好友体力点
     * @param {String} fid 好友角色编号
     * @param {Number} count 赠送的体力点个数
     * @param {Function} callback 执行完成回调
     */
    givePowerToFriend : function(fid, count, callback) {
        var json = { 'pid' : '1008', 'fid' : fid, 'count' : count };
        this._sendRoleSignMSG(json, function(result, packet, extraparam) {
            if (result) {
                callback(true, packet.cd, packet.power);
            } else {
                callback(false, packet, extraparam);
            }
        });
    },

    /**
     * 向指定角色发送普通类型邮件
     * @param {String} recvrid 接收者角色编号
     * @param {String} text 附加文本
     * @param {Function} callback 执行完成回调(通知执行结果)
     */
    sendMail : function(recvrid, text, callback) {
        var json = { 'pid' : '1009', 'trid' : recvrid, 'text' : text };
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 获取玩家邮件列表
     * @param {Function} callback 执行完成回调
     *      callback(result, maillist)
     *      1:{Boolean} result 是否成功完成
     *      2:{Array} maillist 邮件数组
     *          每封邮件都是一个JSON对象, {'mt':1,'ct':134232123,'sid':'10',msg':'aaa'}
     *          其中,
     *          mt代表邮件类型,数字型
     *          ct代表邮件发送时间,数字型,Unix时间
     *          sid代表发送者角色编号
     *          msg代表附加文本,由客户端自行填充与解析
     */
    getMailList : function(callback) {
        var json = { 'pid' : '1010', 't' : this._client.localtime() };
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.ml);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 收取邮件
     * 无论成功与否都移除此邮件，但只有成功返回才给予玩家附件内容
     * @param {String} mid 邮件标识字符串
     * @param {Number} mt 邮件类型
     * @param {Number} ct 邮件发送时间
     * @param {String} sid 发送者角色编号
     * @param {String} msg 附加文本
     * @param {Function} callback 执行完成回调
     *      callback(result, props)
     *      1: {Boolean} 是否成功执行
     *      2: {JSON} 物品列表
     *          {
     *              "LineXiao":0,
     *              "BoomXiao":0,
     *              "SameXiao":0,
     *              "Move":0,
     *              "TimePanel":0,
     *              "Color":0,
     *              "LanMao":0,
     *              "FireX":0,
     *              "ConGame":0,
     *              "candy":0,
     *              "candy_urv":0,
     *              "diamond":0
     *          }
     */
    collectMail : function(mid, callback) {
        //由于目前邮件是全文字符串存储，所以务必保持以下字段的顺序与服务端一致！！！
        var json = { 'pid' : '1011', 'mid' : mid, 'version' : true };
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.props);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 向指定的一批好友请求过关援助
     * @param {Array} fids 好友角色编号数组
     * @param {Number} stageid 关卡编号(从1开始编号的值)
     * @param {Function} callback 执行成功回调
     *      callback(result, packet)
     *      1: {Boolean} 是否成功执行
     *      2: {JSON} 成功发送的记录, 第一条记录都是 好友角色编号->可以再次向此好友请求的冷却时间
     */
    begStageHelpToFriends : function(fids, stageid, callback) {
        var json = {'pid' : '1012', 'sid' : stageid + 1, 'fids' : fids };
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.cds);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 向好友索要体力点
     * @param {String} fid 好友角色编号
     * @param {Number} count 体力点个数
     * @param {Function} callback 执行完成回调
     *      1: {Boolean} result 是否成功
     *      2: {Number} cdtime 向该好友再次索要的冷却时间
     */
    begPowerToFriend : function(fid, count, callback) {
        var json = { 'pid' : '1013', 'fid' : fid, 'count' : count};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.cd);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 获取空间站关卡好友得分列表
     * @param {Number} stage 指定空间站关卡编号(从0开始计数)
     * @param {Array} friends 指定好友角色编号roleid列表
     */
    getSpaceportStageScoresFromFriend : function(stage, friends, callback) {
        var json = { 'pid' : '1015', 'stage' : (stage + 1), 'fids' : friends};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(result, packet.stage, packet.scores);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 异步更新角色当前钻石数据
     * @param current
     * @param income
     * @param cost
     * @param callback
     */
    asyncUpdateRoleDiamondData : function(current, income, cost, source, callback) {
        var self = this;
        var json = { 'pid' : '1017', 'cur' : current, 'income' : income, 'cost' : cost , 'source' : source};
        cc.log("asyncUpdateRoleDiamondData = " + JSON.stringify(json));
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                var ts = packet.timestamp;
                var diamond = packet.diamond;
                self._timestamp = ts;
                self._diamond = diamond;
                callback(true, diamond);
            } else {
                cc.log('[NodeClient] [ERROR] 调用NodeSelf->asyncAnnexRole接口出错.');
                callback(false, packet);
            }
        });
    },

    /**
     * 异步更新角色当前道具数据
     * @param current
     * @param income
     * @param cost
     * @param callback
     */
    asyncUpdateRolePropsData : function(current, income, cost, props, callback) {
        var self = this;
        var json = { 'pid' : '2007', 'cur' : current, 'income' : income, 'cost' : cost , 'props' : props};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                var ts = packet.timestamp;
                var dbprops = packet.props;
                self._timestamp = ts;
                self[props] = dbprops;
                callback(true, dbprops);
            } else {
                cc.log('[NodeClient] [ERROR] 调用NodeSelf->asyncAnnexRole接口出错.');
                callback(false, packet);
            }
        });
    },

    /**
     * 异步更新参与周排名的数据
     * @param point
     * @param intv
     * @param callback
     */
    asyncUpdateWeekTopData : function(point, intv, callback) {
        var self = this;
        var json = { 'pid' : '1018', 'pt' : point, 'iv' : intv };
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 异步获取部分好友的周排名数据
     * @param point
     * @param intv
     * @param callback
     */
    asyncGetFriendsWeekTopData : function( fids, callback) {
        var self = this;
        var json = {'pid' : '1019', 'fids' : fids };
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 异步获取角色的概述信息
     * @param callback
     */
    asyncGetOverviewData : function(callback) {
        var self = this;
        var json = { 'pid' : '1020' };
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 达成活动任务
     */
    asyncAchieveActivity : function(channel, activityid, callback) {
        var json = {
            'pid' : '1022',
            'av' : GAME_VERSION,
            'rv' : RES_VERSION,
            'cmd5' : '',
            'csign' : ''
        };
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(packet.done);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 获取登录渠道过关总得分排行榜
     * @param passport 登录渠道名称
     * @param callback
     *      1:{Boolean}执行是否成功
     */
    asyncGetPassportScoreTop : function(passport, callback) {
        var json = { 'pid' : '1024', 'd' : passport };
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.uptime, packet.top);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 更新指定普通关卡的得分
     * @param stageidx 关卡序号，从0开始计数
     * @param score 得分值（前置条件：请预判此值发生变化）
     * @param callback
     */
    asyncUpdateNormalStageScore : function(stageidx, score, callback) {
        var json = { 'pid' : '1025', 'stageid' : stageidx + 1, 'score' : score };
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true);
            } else {
                //在失败情况下, 第二个参数为失败错误码
                callback(false, packet);
            }
        });
    },

    /**
     * 更新指定空间站关卡的得分
     * @param stageidx 关卡序号，从0开始计数
     * @param score 得分值（前置条件：请预判此值发生变化）
     * @param callback
     */
    asyncUpdateSpaceportStageScore : function(stageidx, score, callback) {
        var json = { 'pid' : '1026', 'stageid' : stageidx + 1, 'score' : score };
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true);
            } else {
                //在失败情况下, 第二个参数为失败错误码
                callback(false, packet);
            }
        });
    },

    /**
     * 获取指定第三方账号平台的好友信息列表
     * @param ditch 第三方账号平台名称标识字符串
     * @param uid 指定的第三方账号平台用户编号
     * @param callback
     */
    asyncGetPassportFriendsList : function(ditch, uid, atoken, callback) {
        var json = { 'pid' : '1027', 'ditch' : ditch, 'uid' : uid, 'token' : atoken, 'timeout' : 90000 };
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet);
            } else {
                //在失败情况下, 第二个参数为失败错误码
                callback(false, packet);
            }
        });
    },

    getMineGameLevelInfo : function(callback) {
        var self = this;
        var json = { 'pid' : '2000'};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.mine);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 异步更新参与周总分数排名的数据
     * @param point
     * @param intv
     * @param callback
     */
    asyncUpdateWeeklyScoreTopData : function(intv, callback) {
        var self = this;
        var json = { 'pid' : '4001', 'iv' : intv };
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 获得总分数周排行榜数据
     * @param point
     * @param intv
     * @param callback
     */
    asyncGetFriendsWeeklyScoreTop : function(fids, callback) {
        var self = this;
        var json = { 'pid' : '4002', 'fids' : fids };
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.rankings);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 获得邀请好友列表
     * @param point
     * @param intv
     * @param callback
     */
    asyncGetInviteFriendList : function(callback) {
        var self = this;
        var json = { 'pid' : '4003'};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.inviteData, packet.leftCount);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 邀请好友进入游戏
     * @param point
     * @param intv
     * @param callback
     */
    asyncInviteFriendToGame : function(userid, callback) {
        var self = this;
        var json = { 'pid' : '4004', 'userid' : userid};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 领取邀请好友奖励
     * @param point
     * @param intv
     * @param callback
     */
    asyncRecvInviteFriendReward : function(index, callback) {
        var self = this;
        var json = { 'pid' : '4005', 'index' : index};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.flag, packet.leftCount);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 向好友求助太空站帮助
     * @param point
     * @param intv
     * @param callback
     */
    AskSpaceHelpToFriend : function(provider, userid, stageid, callback) {
        var json = { 'provider' :  provider ,'pid' : '4006', 'sid' : stageid + 1, 'userid' : userid };
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.helpinfo);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 赠送薄荷糖
     * @param point
     * @param intv
     * @param callback
     */
    asyncSendPowerToRole : function(callback) {
        var self = this;
        var json = { 'pid' : '4009'};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 获取任务列表(每日任务和周任务)
     * @param point
     * @param intv
     * @param callback
     */
    asyncGetMissionList : function(callback) {
        var self = this;
        var json = { 'pid' : '4010'};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.dailymission, packet.weeklymission);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 更新每日任务列表进度
     * @param point
     * @param intv
     * @param callback
     */
    asyncUpdateDailyMission : function(missionlist, callback) {
        var self = this;
        var json = { 'pid' : '4011', 'missionlist' : missionlist};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.dailymission);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 更新周任务列表进度
     * @param point
     * @param intv
     * @param callback
     */
    asyncUpdateWeeklyMission : function(missionlist, callback) {
        var self = this;
        var json = { 'pid' : '4012', 'missionlist' : missionlist};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.weeklymission);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 领取任务奖励
     * @param point
     * @param intv
     * @param callback
     */
    asyncRecvMissionReward : function(misType, mid, callback) {
        var self = this;
        var json = { 'pid' : '4013', 'misType' : misType, 'mid' : mid};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 商城赠送好友礼品
     * @param fuids : 好友userid
     * @param gid : 礼品id
     * @param callback
     */
    asyncGiveFriendMarketGift : function(fuids, gid, callback) {
        var self = this;
        var json = { 'pid' : '4014', 'fuids' : fuids, 'gid' : gid};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, gid, packet.flag, fuids);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 领取首充礼包
     * @param point
     * @param intv
     * @param callback
     */
    asyncGetFirstRecharge : function(callback) {
        var self = this;
        var json = { 'pid' : '4015'};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 获得成就列表
     * @param point
     * @param intv
     * @param callback
     */
    asyncGetAchievementList : function(callback) {
        var self = this;
        var json = { 'pid' : '4017'};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.achievement);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 更新成就列表
     * @param point
     * @param intv
     * @param callback
     */
    asyncUpdateAchievementList : function(achlist, callback) {
        var self = this;
        var json = { 'pid' : '4018', 'achlist' : achlist};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.achievement);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 领取成就奖励
     * @param point
     * @param intv
     * @param callback
     */
    asyncRecieveAchieveReward : function(achType, achIdx, callback) {
        var self = this;
        var json = { 'pid' : '4019', 'achType' : achType, 'achIdx' : achIdx};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.achievement);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 无限薄荷糖礼包
     * @param point
     * @param gid
     * @param callback
     */
    asyncUpdateUnlimitedCandyGift : function(callback) {
        var self = this;
        var json = { 'pid' : '4020', 'roleid' : this._roleid};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.ftime);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 获得无限薄荷糖礼包cd时间
     * @param point
     * @param gid
     * @param callback
     */
    asyncGetUnlimitedCandyGift : function( callback) {
        var self = this;
        var json = { 'pid' : '4021'};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 创建公会
     * @param {String} roleid 角色id， guildname 公会名称, provider 帐号类型， guildinfo 中 guildname是公会名称, battle是总战斗力，
     * rankingscore是成员分数, farstage是最远关卡, maxdiamond是当前钻石数, givecandy是赠送薄荷糖总数. revcandy是接受薄荷糖数量, type，0表示自由加入，1表示需要申请
     *  var guildinfo = {
			‘guildname’ : guildname,
			‘battle’ : battle,
			‘rankingscore’ : rankingscore,
			‘farstage’ : farstage,
			‘maxdiamond’ : maxdiamond,
			‘givecandy’ : givecandy,
			‘revcandy’ : revcandy,
			 'type' : type
        }
     * @param {Function} callback 公会信息和公会成员列表
     */
    createGuildInfo : function(provider, guildinfo, callback) {
        var self = this;
        var json = { 'pid' : '1030', 'roleid' : this._roleid, 'provider' : provider, 'guildname' : escape(guildinfo.guildname), 'guildinfo' : guildinfo};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.guildInfo, packet.memberlist);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 获取公会列表信息
     * @param {String} roleid 角色id (没有加入公会的角色，才可以查询)
     * @param {Function} callback 公会信息列表
     */
    GetGuilidInfoList : function(index, callback) {
        var self = this;
        var json = { 'pid' : '1031', 'roleid' : this._roleid, 'index' : index};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.guildlist, packet.applyCount);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 查询所属公会信息
     * @param {String} roleid 角色id
     * @param {Function} callback 所属公会信息
     */
    QueryBelongsGuildInfo : function(callback) {
        var self = this;
        var json = { 'pid' : '1033', 'roleid' : this._roleid};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.guildInfo, packet.memberlist);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 退出公会
     * @param {String} roleid 角色id
     * @param {Function} callback 成功或者失败
     */
    QuitBelongsGuild : function(callback) {
        var self = this;
        var json = { 'pid' : '1034', 'roleid' : this._roleid};
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 解散公会
     * @param {String} roleid 角色id
     * @param {Function} callback 成功或者失败
     */
    DissolveBelongsGuild : function(callback) {
        var self = this;
        var json = { 'pid' : '1035', 'roleid' : this._roleid};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 公会发送邀请
     * @param {String} roleid 角色id，inviteid 邀请人的roleid
     * @param {Function} callback 成功或者失败
     */
    InviteRoleJoinGuild : function(inviteid, callback) {
        var self = this;
        var json = { 'pid' : '1036', 'roleid' : this._roleid, 'inviteid' : inviteid};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 玩家同意加入到公会消息处理
     * @param {String} roleid 角色id, guildid 申请加入公会id, battle是总战斗力，
     *  rankingscore是成员分数, farstage是最远关卡, maxdiamond是当前钻石数, givecandy是赠送薄荷糖总数. revcandy是接受薄荷糖数量
     * var memberinfo = {
                    'battle' : 120,
                    'rankingscore' : 67865,
                    'farstage' : 66,
                    'maxdiamond' : 22223,
                    'givecandy' : 12,
                    'revcandy' : 5
                };
     * @param {Function} callback 公会成员列表或者错误码
     */
    HandleInviteGuildMsg : function(provider, guildid, memberinfo, callback) {
        var self = this;
        var json = { 'pid' : '1037', 'roleid' : this._roleid, 'provider' : provider, 'guildid' : guildid, 'memberinfo' : memberinfo};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.guildInfo, packet.memberlist);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 申请加入公会
     * @param {String} roleid 角色id, roleInfo是玩家加入公会的基本信息, provider 是帐号类型
     *   var roleInfo = {};
     roleInfo['memberid'] = this._roleid;
     roleInfo['viplevel'] = 1;                 //成员vip等级（目前没有vip等级）
     roleInfo['battle'] = 0;  //成员战斗力
     roleInfo['ranking'] = 1;                  //成员名次
     roleInfo['rankingscore'] = 222000; //成员分数
     roleInfo['farstage'] = 20;        //最远到达关卡
     roleInfo['maxdiamond'] = 10000;              //当前资产数量
     roleInfo['givecandy'] = 0;               //薄荷糖赠送总数量
     roleInfo['revcandy'] = 0;                 //获赠薄荷糖数量
     * @param {Function} callback 成功或者失败
     */
    ApplyGuild : function(provider, guildid, roleInfo, callback) {
        var self = this;
        var json = { 'pid' : '1032', 'roleid' : this._roleid, 'guildid' : guildid, 'roleInfo' : roleInfo, 'provider' : provider};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 处理申请加入公会消息
     * @param {String} roleid 角色id, applyinfo 申请加入角色的基本信息
     * var applyinfo = { nickname: '李四',
            viplevel: 1,
            battle: 0,
            memberid : 'a6',
            ranking: 1,
            rankingscore: 222000,
            farstage: 20,
            maxdiamond: 10000,
            givecandy: 0,
            revcandy: 0
        };
     * @param {Function} callback 成功或者失败
     */
    HandleApplyGuildMsg : function(provider, guildid, memberid, callback) {
        var self = this;
        var json = { 'pid' : '1038', 'roleid' : this._roleid, 'provider' : provider, 'guildid' : guildid, 'memberid' : memberid};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true,  packet.guildInfo, packet.memberlist);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 查询所有邀请消息列表
     * @param {String} roleid 角色id
     * @param {Function} callback 成功或者失败
     */
    QueryInviteGuildMsgList : function(callback) {
        var self = this;
        var json = { 'pid' : '1039', 'roleid' : this._roleid};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.invitelist);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 查询所有申请加入公会的消息列表
     * @param {String} roleid 角色id
     * @param {Function} callback 成功或者失败
     */
    QueryApplyGuildMsgList : function(callback) {
        var self = this;
        var json = { 'pid' : '1040', 'roleid' : this._roleid};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.applylist);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 删除公会成员
     * @param {String} roleid 角色id, memberid 删除公会成员roleid
     * @param {Function} callback 成功或者失败
     */
    DeleteGuildMember : function(memberid, callback) {
        var self = this;
        var json = { 'pid' : '1041', 'roleid' : this._roleid, 'memberid' : memberid};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.guildInfo, packet.memberlist);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 修改成员权限
     * @param {String} roleid 角色id, memberid 修改成员的roleid,permission 2表示副会长，3表示会员
     * @param {Function} callback 成功或者失败
     */
    ModifyMemberPermission : function(memberid, permission, callback) {
        var self = this;
        var json = { 'pid' : '1042', 'roleid' : this._roleid, 'memberid' : memberid, 'permission' : permission};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.guildInfo, packet.memberlist);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 编辑公告
     * @param {String} roleid 角色id, announceInfo 公告信息
     * @param {Function} callback 成功或者失败
     */
    EditGuildAnnouncement : function(announceInfo, callback) {
        var self = this;
        var json = { 'pid' : '1043', 'roleid' : this._roleid, 'announceInfo' : escape(announceInfo)};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.announcelist);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 删除公告
     * @param {String} roleid 角色id, announceid 表示公告id
     * @param {Function} callback 成功或者失败
     */
    DeleteGuildAnnouncement : function(announceid, callback) {
        var self = this;
        var json = { 'pid' : '1044', 'roleid' : this._roleid, 'announceid' : announceid};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 查询公告
     * @param {String} roleid 角色id
     * @param {Function} callback 成功或者失败
     */
    QueryGuildAnnouncement : function(callback) {
        var self = this;
        var json = { 'pid' : '1045', 'roleid' : this._roleid};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.announcelist);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 重置每日任务
     * @param {String} roleid 角色id
     * @param {Function} callback 任务列表
     */
    ResetDailyMission : function(callback) {
        var self = this;
        var json = { 'pid' : '1046', 'roleid' : this._roleid};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.missionlist);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 获得每日任务列表
     * @param {String} roleid 角色id
     * @param {Function} callback 任务列表
     */
    GetDialyMissionList : function(callback) {
        var self = this;
        var json = { 'pid' : '1047', 'roleid' : this._roleid};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.missionInfo);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 更新每日任务完成进度
     * @param {String} roleid 角色id, progressInfo 是 任务进度对象
     * @param {Function} callback 任务列表
     */
    UpdateMissionProgress : function(progressInfo, callback) {
        var self = this;
        var json = { 'pid' : '1048', 'roleid' : this._roleid, 'progressInfo' : progressInfo};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.missionInfo);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 领取每日任务
     * @param {String} roleid 角色id
     * @param {Function} callback 任务列表
     */
    ReceiveDialyMission : function(index, callback) {
        var self = this;
        var json = { 'pid' : '1049', 'roleid' : this._roleid, 'index' : index};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 领取任务奖励
     * @param {String} roleid 角色id
     * @param {Function} callback 任务列表
     */
    ReceiveMissionReward : function(index, callback) {
        var self = this;
        var json = { 'pid' : '1050', 'roleid' : this._roleid, 'index' : index};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.missionInfo, packet.guildInfo);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 更新公会信息
     * @param {String} roleid 角色id
     * @param {Function} callback 任务列表
     */
    UpdateGuildInfo : function(callback) {
        var self = this;
        var guildinfo = {};
        var json = { 'pid' : '1051', 'roleid' : this._roleid, 'guildinfo' : guildinfo};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.guildInfo, packet.memberlist);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 查找玩家信息
     * @param {String} roleid 角色id
     * @param {Function} callback 任务列表
     */
    QueryRoleInfoByNickName : function(nickname, callback) {
        var self = this;
        var json = { 'pid' : '1052', 'roleid' : this._roleid, 'nickname' : escape(nickname)};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.roleInfo);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 查询玩家信息列表
     * @param {String} roleid 角色id, provider 是帐号类型
     * @param {Function} callback 任务列表
     */
    QueryRoleInfoList : function(provider, callback) {
        var self = this;
        var json = { 'pid' : '1053', 'roleid' : this._roleid, 'provider' : provider};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.memberlist);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 移交公会职务
     * @param {String} roleid 角色id, memberid 被移交职务角色的roleid
     * @param {Function} callback 任务列表
     */
    TransferGuildDuty : function(provider, memberid, callback) {
        var self = this;
        var json = { 'pid' : '1054', 'roleid' : this._roleid, 'memberid' : memberid, 'provider' : provider};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.guildInfo, packet.memberlist);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 发送奖励
     * @param {String} roleid 角色id, memberid 被发送奖励玩家的roleid
     *          var memberid = 'a6';
                var rewardInfo = {
                    'candy' : 2,
                    'diamond' : 20
                };
     * @param {Function} callback 任务列表
     */
    GiveOffGuildReward : function(memberid, rewardInfo, callback) {
        var self = this;
        var json = { 'pid' : '1055', 'roleid' : this._roleid, 'memberid' : memberid, 'rewardInfo' : rewardInfo};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 自由加入公会
     * @param {String} roleid 角色id, guildid 公会id
     var roleInfo = {};
     roleInfo['memberid'] = this._roleid;
     roleInfo['viplevel'] = 1;                 //成员vip等级（目前没有vip等级）
     roleInfo['battle'] = 0;  //成员战斗力
     roleInfo['ranking'] = 1;                  //成员名次
     roleInfo['rankingscore'] = 222000; //成员分数
     roleInfo['farstage'] = 20;        //最远到达关卡
     roleInfo['maxdiamond'] = 10000;              //当前资产数量
     roleInfo['givecandy'] = 0;               //薄荷糖赠送总数量
     roleInfo['revcandy'] = 0;                 //获赠薄荷糖数量
     * @param {Function} callback
     */
    FreelyJoinGuild : function(provider, guildid, roleInfo, callback) {
        var self = this;
        var json = { 'pid' : '1056', 'roleid' : this._roleid, 'guildid' : guildid, 'roleInfo' : roleInfo, 'provider' : provider};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.guildInfo, packet.memberlist);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 修改公会申请类型
     * @param {String} roleid 角色id, guildid 公会id
     * @param {Function} callback
     */
    ModifyGuildType : function(type, callback) {
        var self = this;
        var json = { 'pid' : '1057', 'roleid' : this._roleid, 'type' : type};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 公会拒绝申请加入
     * @param {String} roleid 角色id, guildid 公会id
     * @param {Function} callback
     */
    RefuseToJoinGuildMsg : function(memberid, callback) {
        var self = this;
        var json = { 'pid' : '1058', 'roleid' : this._roleid, 'memberid' : memberid};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 查找公会信息
     * @param {String} roleid 角色id, guildname 公会name
     * @param {Function} callback
     */
    GetGuildInfoByName : function(guildname, callback) {
        var self = this;
        var json = { 'pid' : '1059', 'roleid' : this._roleid, 'guildname' : escape(guildname)};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.guildInfo);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 辞去公会职务
     * @param {String} roleid 角色id
     * @param {Function} callback
     */
    GiveUpGuildDuty : function(callback) {
        var self = this;
        var json = { 'pid' : '1060', 'roleid' : this._roleid};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.guildInfo, packet.memberlist);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 公会捐赠
     * @param {String} roleid 角色id
     * @param {Function} callback
     */
    DevoteGuildExp : function(diamond, candy, callback) {
        var self = this;
        var json = { 'pid' : '1062', 'roleid' : this._roleid, 'diamond' : diamond, 'candy' : candy};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.guildInfo, packet.memberInfo);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 删除公会邀请邮件
     * @param {String} roleid 角色id
     * @param {Function} callback
     */
    DeleteGuildInviteMail : function(mailid, callback) {
        var self = this;
        var json = { 'pid' : '1063', 'roleid' : this._roleid, 'mailid' : mailid};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },


    /**
     * 获取公会挑战关卡信息
     * @param {String} roleid 角色id, guildid 公会id
     * @param {Function} callback
     */
    GetGuildLevelsInfo : function(callback) {
        var self = this;
        var json = { 'pid' : '1080', 'roleid' : this._roleid};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.levelsInfo);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 更新挑战关卡星数信息
     * @param {String} roleid 角色id, guildid 公会id
     * @param {Function} callback
     */
    UpdateLevelsStars : function(index, stars, score, callback) {
        var self = this;
        var json = { 'pid' : '1081', 'roleid' : this._roleid, 'stars' : stars, 'index' : index, 'score' : score};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.levelsInfo, packet.guildInfo);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 重置挑战关卡信息
     * @param {String} roleid 角色id, guildid 公会id
     * @param {Function} callback
     */
    ResetLevelsInfo : function(index, callback) {
        var self = this;
        var json = { 'pid' : '1082', 'roleid' : this._roleid, 'index' : index};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.levelsInfo);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 领取挑战关卡奖励
     * @param {String} roleid 角色id, guildid 公会id
     * @param {Function} callback
     */
    ReceiveLevelsReward : function(index, callback) {
        var self = this;
        var json = { 'pid' : '1083', 'roleid' : this._roleid, 'index' : index};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.levelsInfo);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 获取挑战关卡排行榜信息
     * @param {String} roleid 角色id, guildid 公会id
     * @param {Function} callback
     */
    GetLevelsRankings : function(callback) {
        var self = this;
        var json = { 'pid' : '1084', 'roleid' : this._roleid};

        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.levelsranks);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 向轻型游戏用户平台申请唯一设备标识号
     * @param {String} imei 设备标识字符串，仅供反向查询时使用，不必确保全球唯一
     * @param {Function} callback 执行完成回调
     *      callback(isok, userid, token)
     *      1: {Boolean} isok 是否成功
     *      2: {String} userid 生成的用户编号
     *      3: {String} token 对应的访问令牌
     */
    applyDeviceID : function(imei, callback) {
        cc.log('[NodeClient] [ERROR] 调用废弃接口 NodeSelf->applyDeviceID .');
        callback(false);
    },

    /**
     * 获取当前设备标识号
     * @return {String} 设备标识号
     */
    getDeviceID : function() {
        //cc.log('[NodeClient] [WARN] 调用将废弃接口 NodeSelf->getDeviceID .');
        return this.getLocalRoleID();
    },

    /**
     * 生成兑换码
     * @param {Number} gtype 礼包类型(1:普通类型礼包)
     * @param {Function} callback 执行完成回调
     *      callback(result, cdkey)
     *      1: {Boolean} result 是否成功执行完成
     *      2: {String} cdkey 生成的兑换码
     */
    applyCDKeyGenerate : function(gtype, callback) {
        var self = this;
        var json = { 'pid' : '2001', 'gtype' : gtype };
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.cdkey);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 领取兑换码
     * @param {String} cdkey 兑换码编号
     * @param {Function} callback 执行完成回调
     *      0:{Boolean}是否成功执行
     *      1:{JSON}旧版的奖励数据,不支持道具(即将废弃)
     *      2:{JSON}奖励数据
     */
    exchangeCDKey : function(cdkey, callback) {
        var self = this;
        var json = { 'pid' : '2002', 'cdkey' : cdkey };
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.cdkey, packet.gift, packet.award);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 查询指定设备号的支付订单
     * @param {Function} callback 执行完成回调
     *      callback(isok)
     *      1:{Boolean} isok 是否成功执行完成
     */
    getDevicePaymentOrders : function(callback) {
        var self = this;
        var json = { 'pid' : '2003','timeout' : 90000 };
        this._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.orders);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 确认订单
     * 订单支付流程里的最后一步，用于确定客户端已完成订单交易流程并提交服务器端备份存档。
     * @param {String} orderid 订单编号
     * @param {Function} callback 支付确认回调
     */
    confirmOrder : function(orderid, callback) {
        var self = this;
        var json = { 'pid' : '2004', 'orderid' : orderid };
        self._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 分享成功每日奖励
     *
     * @param {String}
     * @param {Function} callback
     */
    ReceiveDailyReward : function(rewardId, callback) {
        var self = this;
        var json = { 'pid' : '2005', 'rewardId' : rewardId };
        self._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 每日奖励状态
     *
     * @param {String}
     * @param {Function} callback
     */
    GetDailyRewardStatus : function(callback) {
        var self = this;
        var json = { 'pid' : '2006'};
        self._sendRoleSignMSG(json, function(result, packet) {
            if (result) {
                callback(true, packet.rewardstatus);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 获取客户端在线设置
     */
    getOnlineSettings : function(callback) {
        var self = this;
		cc.log("Send updateurl=" + getUpdateUrl() + '/settings.json message');

        self._client.ajax(
            getUpdateUrl() + '/settings.json',
            { 'method' : 'GET', 'timeout' : 6 },
            function(response, option, result) {
                cc.log("Receive updateurl=" + getUpdateUrl() + '/settings.json message');
                if (result.ok) {
                    var json = JSON.parse(response);
					cc.log("json  = " + JSON.stringify(json));
                    if (json) {
                        callback(true, json);
                    } else {
                        callback(false);
                    }
                } else {
                    callback(false);
                }
            }
        );
    },
    
    ///////////////////////////////////////////////////////////////////////////
    // 接口调整（以下为新接口）

    /**
     * 获取本地的角色编号
     * @param callback
     */
    getLocalRoleID : function() {
        return this._roleid;
    },

    /**
     * 查询本地的角色是否为空闲角色（即未被第三方账号绑定）
     * @param {Boolean} 是否空闲角色
     */
    getLocalRoleFreeStatus : function() {
        return this._bfree;
    },

    /**
     * 申请新角色编号请求
     * @param callback
     */
    applyNewRoleID : function(callback) {
        var self = this;
        if (!self._imei) {
            callback(false, '设备号不存在');
        } else {
            var json = {
                'imei' : self._imei
            };
            self._sendCommonURLRequest(self.kNewRoleUrl, json, {}, function(isok, packet) {
                if (isok) {
                    self.initRole(packet.roleid, packet.idx, packet.token, packet.roleid, "");
                    self._bfree = true;
                }
                callback(isok);
            });
        }
    },

    /**
     * 刷新角色的访问令牌
     * @param callback
     */
    refreshRoleToken : function(callback) {
        var self = this;
        if (!self._imei) {
            callback(false, '设备号不存在');
        } else {
            var json = {
                'roleid' : self._roleid,
                'imei' : self._imei,
                'idx' : self._idx,
                'token' : self._token
            };
            self._sendCommonURLRequest(self.kRoleAccessUrl, json, {}, function(isok, packet) {
                if (isok) {
                    self._token = packet.token;
                }
                callback(isok);
            });
        }
    },

    /**
     * 更新角色评价系统状态
     * @param callback
     */
    updateEvaluateStatus : function(evaluate, callback) {
        var self = this;
        var json = {
            'roleid' : self._roleid,
            'evaluate' : evaluate
        };
        self._sendCommonURLRequest(self.kRoleEvaluateUrl, json, {}, function(isok, packet) {
            if (isok) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 获取春节活动标记(已过期)
     */
    asyncGetSpringFestivalSign : function(callback) {
        callback(true, false);
    },
    
    /**
     * 获取情人节活动标记
     */
    asyncGet0214Sign : function(callback) {
        var self = this;
        self._sendCommonURLRequest(self.kGet0214FlagUrl, {}, {}, function(isok, packet) {
            if (isok) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 每日签到
     * @param callback json对象
     */
    LoginDailySignUp : function(provider, callback) {
        var client = cc.NodeClient.getInstance();
        var self = this;
        var json = {
            'roleid' : self._roleid,
            'provider' : provider
        };
        var opts = {
            'timeout' : 3000
        };
        self._sendCommonURLRequest(self.kLoginUrlDailySignUp, json, opts, function(isok, packet) {
            if (isok) {
                callback(true, packet.signData, packet.signReward);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 领取签到奖励
     * @param callback json对象
     */
    RecvSignReward : function(provider, awardType, callback) {
        var client = cc.NodeClient.getInstance();
        var self = this;
        var json = {
            'roleid' : self._roleid,
            'provider' : provider,
            'awardType' : awardType
        };
        var opts = {
            'timeout' : 3000
        };
        self._sendCommonURLRequest(self.kLoginUrlRecvSignReward, json, opts, function(isok, packet) {
            if (isok) {
                callback(true, packet.signData, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 获得签到奖励
     * @param callback json对象
     */
    asyncGetReward : function(callback) {
        var client = cc.NodeClient.getInstance();
        var self = this;
        var json = {
            'roleid' : self._roleid
        };
        var opts = {
            'timeout' : 3000
        };
        self._sendCommonURLRequest(self.kLoginUrlGetReward, json, opts, function(isok, packet) {
            if (isok) {
                callback(true, packet.signData, packet.signReward);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 注销帐号
     * @param callback json对象
     */
    LogOffAccount : function(callback) {
        var client = cc.NodeClient.getInstance();
        var self = this;
        var json = {
            'roleid' : self._roleid
        };
        var opts = {
            'timeout' : 3000
        };
        self._sendCommonURLRequest(self.kLoginUrlLogOffAccount, json, opts, function(isok, packet) {
            if (isok) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 设置 Guest 开关
     * @param callback json对象
     */
    asyncSetGuestSwitch : function(bswitch, callback) {
        var client = cc.NodeClient.getInstance();
        var self = this;
        var json = {
            'roleid' : self._roleid,
            'bswitch' : bswitch
        };
        var opts = {
            'timeout' : 3000
        };
        self._sendCommonURLRequest(self.kLoginUrlSetGuestSwitch, json, opts, function(isok, packet) {
            if (isok) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 获取 Guest 开关
     * @param callback json对象
     */
    asyncGetGuestSwitch : function(callback) {
        var client = cc.NodeClient.getInstance();
        var self = this;
        var json = {
            'roleid' : self._roleid
        };
        var opts = {
            'timeout' : 3000
        };
		
		cc.log(" asyncGetGuestSwitch 获取 Guest 开关");
		
        self._sendCommonURLRequest(self.kLoginUrlGetGuestSwitch, json, opts, function(isok, packet) {
			cc.log("asyncGetGuestSwitch 获取 Guest 开关 ok = " + packet.flag);
            if (isok) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 获取女生节活动标记
     */
    asyncGetGirlsCarnivalSign : function(callback) {
        var self = this;
        self._sendCommonURLRequest(self.kGetGirlsCarnivalFlagUrl, {}, {}, function(isok, packet) {
            if (isok) {
                callback(true, packet.flag);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 获取所有开关标记
     * @param callback json对象
     */
    asyncGetAllSwitchFlag : function(callback) {
        var client = cc.NodeClient.getInstance();
        var self = this;
        var opts = {
            'timeout' : 3000000
        };

        self._sendCommonURLRequest(self.kLoginUrlGetAllSwitch, {}, opts, function(isok, packet) {
            if (isok) {
                callback(true, packet);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 每次客户端支付一次, 就给服务器发送一条支付信息
     */
    asyncUpdatePayInfo : function(payType, payid, roleid, billInfo, channel, result, data, callback) {
        cc.log(" temasyncUpdatePayInfo");
		var self = this;
        var json = {
            'paytype' : payType,
            'payid' : payid,
            'roleid' : roleid,
            'billinfo' :billInfo,
            'time' : Date.now(),
            'channel' : channel,
            'result' : result
        };
        var purchaseinfo = {
            'service_user_id' : data.service_user_id,
            'platform' : data.platform,
            'price' : data.price,
            'currency' : data.currency,
            'os' : data.os,
            'buy_no' : data.buy_no
        };

        var tempObj = {};
        tempObj.payinfo = JSON.stringify(json);
        tempObj.purchaseinfo = JSON.stringify(purchaseinfo);
        tempObj.roleid = roleid;
		cc.log(" tempObj.purchaseinfo = " +  tempObj.purchaseinfo);
		cc.log(" tempObj.payinfo = " +  tempObj.payinfo);
        self._sendCommonURLRequest(self.kGetPayInfoUrl, tempObj, {}, function(isok, packet) {
            if (isok && packet && packet.result && (packet.result == 'ok')) {
                callback(true, (packet.result == 'ok'));
            } else {
                callback(false, packet.result);
            }
        });
    },

    /**
     * 获得商城钻石打折百分数
     * @param callback json对象
     */
    asyncDiscountDiamond : function(callback) {
        var client = cc.NodeClient.getInstance();
        var self = this;
        var opts = {
            'timeout' : 3000
        };
        self._sendCommonURLRequest(self.kLoginUrlDiscountDiamond, {}, opts, function(isok, packet) {
            if (isok) {
                callback(true, packet.perNum);
            } else {
                callback(false, packet);
            }
        });
    },

    /**
     * 获取服务器信息(时间)
     * @param callback json对象
     */
    asyncGetServerInfo : function(callback) {
        var client = cc.NodeClient.getInstance();
        var self = this;
        var opts = {
            'timeout' : 3000000
        };

        self._sendCommonURLRequest(self.kLoginUrlGetServerInfo, {}, opts, function(isok, packet) {
            if (isok) {
                callback(true, packet.serverInfo);
            } else {
                callback(false, packet);
            }
        });
    },

    //AES加密，返回加密后的传输内容
    sever_setValueToAes:function(value){
        var valueUtf8 = Safe.enc.Utf8.parse(value);
        var base64_ark = Safe.enc.Base64.stringify(valueUtf8);

        var aes_ark = Safe.AES.encrypt(base64_ark,ARK_KEY_FOR_WEB);

        return aes_ark;
    },

    //AES解密
    sever_getValueFromAes:function(value){
        var aes_parse_ark = Safe.AES.decrypt(value,ARK_KEY_FOR_WEB);

        var aes_parse_ark_utf8 = aes_parse_ark.toString(Safe.enc.Utf8);

        var base64_parse_ark = Safe.enc.Base64.parse(aes_parse_ark_utf8);
        var base64_parse_ark_utf8 = base64_parse_ark.toString(Safe.enc.Utf8);

        return base64_parse_ark_utf8;
    }
    ///////////////////////////////////////////////////////////////////////////
});

cc.NodeSelf._instance = null;
cc.NodeSelf.getInstance = function() {
    if (!this._instance) {
        this._instance = new cc.NodeSelf();
        this._instance.init();
    }
    return this._instance;
};
