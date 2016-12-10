cc.NodeHelper = cc.Class.extend({
    /**
     * 初始化(内部接口)
     */
    _init : function() {
        cc.NodeSelf.getInstance();

        this.kLocalStorageKeyName = 'NODE_SELF_DATA'; //本地存储主键(必须保证全局唯一)
        this.kOldStorageKeyName = '_nodeSelfConfigure'; //旧版本存储主键
        this.bIsLoadFile = false; //是否已读取本地存储数据
        this.bIsUpdateToken = false; //是否已更新访问令牌
        this.bNetWorkEnable = false; //网络连接是否正常

        this.bIsSyncData = false;   //是否正在同步角色数据
        this.dCacheData = {};       //缓存本地的角色数据

        this.dOverviewData = {};    //缓存的角色概述数据
        this.bIsLoadOverviewData = false; //是否加载概述数据

        this.bDidReceivedReward = false; //是否已领取奖励
        
        this.bIsLoadOnlineSettings = false; //是否已加载在线设置数据
        this.dCacheOnlineSettings = {}; //缓存的在线设置数据
    },

    /**
     * 输出日志信息
     * @param formator 格式化字符串(注意不要使用格式化%s,%d之类的)
     */
    log : function(loglevel, formator) {
        //控制日志输出等级
        switch (loglevel) {
            case 'TRACE':
                return;
            case 'DEBUG':
            case 'INFO':
            case 'WARN':
            case 'ERROR':
            case 'FAULT':
            {
                var args = Array.prototype.slice.call(arguments, 1);
                var arr = new Array(args.length);
                arr[0] = '[NodeClient] (' + loglevel + ') ' + formator;
                for (var i = 1; i < args.length; i++) {
                    arr[i] = args[i];
                }

                cc.log.apply(null, arr);

                break;
            }
            default:
                break;
        }
    },

    /**
     * 开始申请统一的角色编号流程
     * @param callback
     */
    startApplyNewRoleID : function(callback) {
        var self = this;
        var nself = cc.NodeSelf.getInstance();
        if (!self.bIsLoadFile) {
            self.log('ERROR', '未读取本地存储数据');
            callback(false);
        } else {
            nself.applyNewRoleID(function(isok, errmsg) {
                if (!isok) {
                    self.log('DEBUG', '申请新角色编号失败: ' + errmsg);
                    callback(false);
                } else {
                    self.bIsUpdateToken = true;
                    callback(true);
                }
            });
        }
    },

    /**
     * 获取本机的角色信息
     * @return {JSON} 若成功则返回json，否则为null
     */
    asyncGetLocalRole : function(callback) {
        var nself = cc.NodeSelf.getInstance();
        if (nself.getLocalRoleID()) {
            var json = {
                'roleid' : nself.getLocalRoleID(),
                'idx' : nself._idx
            };
            callback(json);
        } else {
            callback(null);
        }
    },

    /**
     * 获取本机的角色编号（若当前没有则自动申请）
     * @param {Function} callback 查询角色编号完成回调
     *      callback(roleid)
     *      1: {String} roleid 当前角色编号，若不存在则为空null
     */
    asyncGetLocalRoleIDWithCheck : function(callback) {
        var self = cc.NodeHelper.getInstance();
        var nself = cc.NodeSelf.getInstance();

        var roleid = nself.getLocalRoleID();
        if (roleid) {
            callback(roleid);
        } else {
            self.startApplyNewRoleID(function(isok) {
                if (isok) {
                    callback(nself.getLocalRoleID());
                } else {
                    callback(null);
                }
            });
        }
    },

    /**
     * 同步内存缓存数据与客户端存储数据//TODO(Neil): 功能待实现
     */
//    doSyncRoleDataToCache : function() {
//
//        var self = this;
//
//        _DB_OP_GAME_LEVELS.prepareLoad();
//        _DB_OP_GAME_ITEMS.prepareLoad();
//        _DB_OP_GAME.prepareLoad();
//
//
//        var diamondData = cc.DataMng.getInstance().getDiamondUploadData();
//        var norScoresData = cc.DataMng.getInstance().getScoresUploadData(false);
//        var spaceScoresData = cc.DataMng.getInstance().getScoresUploadData(true);
//        var heartData = cc.DataMng.getInstance().getHeartUploadData();
//        var cokeTimeData = cc.DataMng.getInstance().getCokeTimeUploadData();
//
//        _DB_OP_GAME_LEVELS.prepareLoadFinish();
//        _DB_OP_GAME_ITEMS.prepareLoadFinish();
//        _DB_OP_GAME.prepareLoadFinish();
//
//        self.updateDiamondCacheData(diamondData.cur, diamondData.income, diamondData.cost);
//        self.updateCandyData(heartData.max, heartData.add);
//        self.updateNormalStageScoreList(norScoresData.length, norScoresData);
//        self.updateSpaceportStageScoreList(spaceScoresData.length, spaceScoresData);
//        self.updateSpaceportStageRecoveryData(cokeTimeData.ssrn, cokeTimeData.ssrt);
//    },

    /**
     * 同步至服务器本地的缓存客户端角色数据（已弃用）
     */
//    doSyncRoleDataToServer : function(callback) {
//        var self = cc.NodeHelper.getInstance();
//        if (self.bIsSyncData) {
//            return;
//        }
//
//        self.log('INFO', '上传角色数据流程开始');
//        self.bIsSyncData = true;
//
//        var cached = JSON.parse(JSON.stringify(self.dCacheData));
//        self.dCacheData = {};
//
//        cc.NodeSelf.getInstance().snapshot(
//            cached.ddiamond,
//            cached.stage1,
//            cached.stage2,
//            cached.dcandy,
//            cached.ssrd,
//            function(isok, ddiamond, dscores1, dscores2, dcandy, dcoke) {
//                if (callback) {
//                    callback(isok);
//                }
//                if (isok) {
//                    self.log('INFO', '上传角色数据流程成功');
//                } else {
//                    //如果没有上传成功
//                    self.dCacheData = cached;
//                    self.log('INFO', '上传角色数据流程失败');
//                }
//                self.bIsSyncData = false;
//            }
//        );
//    },

    /**
     * 加载角色的概述数据并缓存
     */
    doLoadOverviewData : function() {
        var self = this;
        if (self.bIsLoadOverviewData) {
            return;
        }

        self.bIsLoadOverviewData = true;
        cc.NodeSelf.getInstance().asyncGetOverviewData(function(isok, overview) {
            if (isok) {
                self.dOverviewData = overview;
                self.bIsLoadOverviewData = true;
            } else {
                self.bIsLoadOverviewData = false;
            }
        });
    },

    /**
     * 响应游戏初始化事件处理
     * @param imei
     */
    onInitGame : function(imei) {
        var self = cc.NodeHelper.getInstance();
        var nself = cc.NodeSelf.getInstance();

        if (!imei) {
            self.log('ERROR', '未成功读取机器设备标识值！');
            imei = 'unknown';
        }
        nself.initIMEI(imei);

        //备注：以下这个注册事件的时机必须在其它代码之前
        //确保触发事件时能够及时响应事件
        nself.registerActionCallback(cc.NodeDefine.NET_ACTIONS.kRoleIDChange, self.onLocalRoleIDChange);

        if (!self.bIsLoadFile) {
            self.bIsLoadFile = true;

            var storage = cc.SafeFile.getInstance().get(self.kLocalStorageKeyName);
            if (!storage) {
                //兼容旧版本
                var osdata = cc.SafeFile.getInstance().get(self.kOldStorageKeyName);
                if (osdata) {
                    self.log('INFO', '发现旧版本数据文件');
                    var json = JSON.parse(osdata);
                    if (json) {
                        nself.initRole(json.roleid, 1, 'oneoff', json.roleid, "");
                        self.log('INFO', '初始化本地角色: ' + json.roleid);
                    }
                    cc.SafeFile.getInstance().set(self.kOldStorageKeyName, null);
                }
            } else {
                self.log('INFO', '读取本地存储数据 : ' + storage);
                var bchange = nself.deserialize(storage);
                if (bchange) {
                    self.log('DEBUG', '连接游戏服务器区与上次不一致');
                    //TODO: 处理游戏服务器区变换的内容

                }
            }

            self.log('INFO', '加载本地存储数据完成:' + storage);
        }
    },

    /**
     * 响应网络连接开启事件处理
     */
    onNetworkConnect : function() {
        var self = cc.NodeHelper.getInstance();
        var nself = cc.NodeSelf.getInstance();
        self.log('DEBUG', '网络连接开启');
        self.setNetWorkEnable(true);

        if (!self.bIsUpdateToken) {
            //先设置为true，若校验时出现异常则重置为false
            self.bIsUpdateToken = true;

            if (nself.getLocalRoleID()) {
                self.onServerConnected();
                cc.log("onNetworkConnect 检查是否本地文件里有＝" + nself.getLocalRoleID());
            } else {
                cc.log("onNetworkConnect 检查是否本地文件里有，没有因该申请新的～");
                self.startApplyNewRoleID(function(isok) {
                    if (!isok)
                    {
                        self.bIsUpdateToken = false;
                    }
                    else
                    {
                        cc.log("onNetworkConnect 检查是否本地文件里有, 没有因该申请新的, 申请完成写文件~");
                        self.writeNodeSelf();
                    }
                });
            }
        }


        //self.doSyncRoleDataToServer();
        //cc.Director.getInstance().getScheduler().scheduleCallbackForTarget(
        //    self,
        //    doSyncRoleDataToServer,
        //    10,
        //    0,
        //    0,
        //    false
        //);

    },

    /**
     * 响应网络连接断开事件处理
     */
    onNetworkDisconnect : function() {
        var self = cc.NodeHelper.getInstance();
        self.log('DEBUG', '网络连接断开');
        self.setNetWorkEnable(false);
        self.onServerDisconnected();
    },

    /**
     * 响应本地角色编号发生改变
     * 包括读取本地存储文件时从空变为有值和异步申请成功时
     */
    onLocalRoleIDChange : function() {
        var self = cc.NodeHelper.getInstance();
        if (self.isNetWorkEnable()) {
            self.onServerConnected();
        }

        self.bDidReceivedReward = false;
    },

    /**
     * 响应游戏服务器连接开启事件
     * 此事件触发时机为当前角色编号存在且网络连接畅通
     */
    onServerConnected : function() {
        var self = cc.NodeHelper.getInstance();
        //注意：此事件会多次触发，需要自行处理重复调用问题
        self.log('INFO', "游戏服务器连接开启");

        //申请角色的评价数据
        self.doLoadOverviewData();

        //申请兑换码
        if (!ShareMng.getInstance().getCode())
        {
            ShareMng.getInstance().createCode("先存储一个分享码");
        }

        //达成活动
        if (!this.bDidReceivedReward)
        {
            cc.NodeSelf.getInstance().asyncAchieveActivity(CHANNEL + "", '06_activity_001', function(isdone) {
                cc.log('达到活动奖励：' + isdone);
                if (isdone)
                {
                    self.bDidReceivedReward = true;
                }
            });
        }
    },

    /**
     * 响应游戏服务器连接断开事件
     * 此事件触发时机为网络连接断开
     */
    onServerDisconnected : function() {
        var self = cc.NodeHelper.getInstance();
        //注意：此事件会多次触发，需要自行处理重复调用问题
        self.log('INFO', "游戏服务器连接断开");

    },

    //------------------------------------------------------------------------------------------------------------------
    setNetWorkEnable: function(setting)
    { 
        this.bNetWorkEnable = setting;
        return this.bNetWorkEnable;
    },

    //------------------------------------------------------------------------------------------------------------------
    isNetWorkEnable: function()
    {
        return this.bNetWorkEnable;
    },

    //------------------------------------------------------------------------------------------------------------------
    isUploadEnable: function()
    {
        return this.isNetWorkEnable() || false;
    },

    //------------------------------------------------------------------------------------------------------------------
    uploadDiamond: function(addScore, callback)
    {
        cc.log("执行 uploadDiamond");

        if (!this.isUploadEnable())
        {
            cc.log("ERROR 无法上传 uploadDiamond");
            return this;
        }

        //
        if (_UploadingDiamond)
        {
            cc.log("ERROR 不可连续上传钻石");
            callback && callback(false);
            return this;
        }

        //
        var flag = Date.now();
        cc.log("uploadDiamond开始执行 上传标志随机数 = " + flag);
        _UploadingDiamond = true;

        //
        var diamondData = cc.DataMng.getInstance().getDiamondUploadData();
        var cur = diamondData["cur"];
        var income = diamondData["income"];
        var cost = diamondData["cost"];

        var uploadDiamondCallback = function(res, diamond)
        {
            _UploadingDiamond = false;

            //
            cc.log("uploadDiamond上传钻石完成 上传标志随机数 ＝ " + flag);
            cc.log("uploadDiamond上传钻石完成 结果 = " + res);

            //
            if (res)
            {
                cc.log("获得服务器最新，当前的钻石数 diamond = " + diamond + ", 上传标志随机数 = " + flag);
                cc.log("上传了进账 income = " + income);
                cc.log("上传了消费 cost = " + cost);

                var dm = cc.DataMng.getInstance();

                //
                dm.m_MoneyDiamondIncome.sub(income);
                dm.m_MoneyDiamondIncome.save();

                //
                dm.m_MoneyDiamondCost.sub(cost);
                dm.m_MoneyDiamondCost.save();

                //
                var imcomeNew = dm.m_MoneyDiamondIncome.get();
                cc.log("剩余 进账 income = " + imcomeNew);

                var costNew = dm.m_MoneyDiamondCost.get();
                cc.log("剩余 消费 cost = " + costNew);

                //
                dm.m_MoneyDiamond.set(diamond);
                if (imcomeNew > 0 || costNew > 0)
                {
                    cc.log("因为本地有残余 income 或者 cost1, 所以需要调整一下数据");
                    dm.m_MoneyDiamond.add(imcomeNew);
                    dm.m_MoneyDiamond.sub(costNew);

                    cc.log("新的当前钱数为 = " + dm.m_MoneyDiamond.get());
                }

                //
                dm.m_MoneyDiamond.save();

                //重置一下脏位 时间不清，时间是为了上传其它值
                cc.DataMng.getInstance().getDirty().cleanDiamondDirty();
            }
            else
            {
                cc.log("ERROR 处理数据更新流程 uploadDiamond上传钻石失败了 上传标志随机数 = " + flag);
            }

            if (callback)
            {
                cc.log("处理外部CallBack 上传标志随机数 = " + flag);
                callback(res, diamond);
            }
        };

        //
        cc.log("处理数据更新流程 数据上传(钻石上传流程)asyncUpdateRoleDiamondData 上传标志随机数 = " + flag);
        cc.log("当前钻石 cur = " + cur);
        cc.log("进账钻石 income = " + income);
        cc.log("消费钻石 cost = " + cost);
        cc.NodeSelf.getInstance().asyncUpdateRoleDiamondData(cur, income, cost, addScore, uploadDiamondCallback);

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    uploadItems: function(itemData, callback)
    {
        cc.log("执行 uploadItems");

        if (!this.isUploadEnable())
        {
            cc.log("ERROR 无法上传 uploadItems");
            return this;
        }

//        //
//        if (_UploadingItems)
//        {
//            cc.log("ERROR 不可连续上传道具");
//            callback && callback(false);
//            return this;
//        }

        //
        var flag = Date.now();
        cc.log("uploadItems开始执行 上传标志随机数 = " + flag);
        _UploadingItems = true;

        //
//        var diamondData = cc.DataMng.getInstance().getDiamondUploadData();
        var cur = itemData.Number.get();
        var income = itemData.Income;
        var cost = itemData.Cost;

        if (income > 0 ){
            cur -= income;
        }
        else if (cost > 0) {
            cur += cost;
        }

        var props = itemData.ENG_NAME;

        var uploadItemCallback = function(res, itemNum)
        {
            _UploadingItems = false;

            //
            cc.log("uploadItems上传道具完成 上传标志随机数 ＝ " + flag);
            cc.log("uploadItems上传道具完成 结果 = " + res);

            //
            if (res)
            {
                cc.log("获得服务器最新，当前的道具 items = " + itemNum + ", 上传标志随机数 = " + flag);
                cc.log("上传了进账 income = " + income);
                cc.log("上传了消费 cost = " + cost);

//                if (itemData.ID == -1){
//                    var dm = cc.DataMng.getInstance();
////                    dm.m_GameContinueCountIncome.sub(income);
////                    dm.m_GameContinueCountCost.sub(cost);
////
////                    var imcomeNew = dm.m_GameContinueCountIncome.get();
////                    cc.log("剩余 进账 income = " + imcomeNew);
////
////                    var costNew = dm.m_GameContinueCountCost.get();
////                    cc.log("剩余 消费 cost = " + costNew);
////
////                    //
//                    dm.m_GameContinueCount.set(itemNum);
////                    if (imcomeNew > 0 || costNew > 0)
////                    {
////                        cc.log("因为本地有残余 income 或者 cost1, 所以需要调整一下数据");
////                        dm.m_GameContinueCountIncome.add(imcomeNew);
////                        dm.m_GameContinueCountCost.sub(costNew);
//
//                        cc.log("新的当前道具数为 = " + dm.m_GameContinueCount.get());
////                    }
//
//                }
//                else {
//                    var dm = cc.DataMng.getInstance().getItemByID(itemData.ID);
//
////                    //
////                    dm.Income.sub(income);
//////                dm.m_MoneyDiamondIncome.save();
////
////                    //
////                    dm.Cost.sub(cost);
//////                dm.m_MoneyDiamondCost.save();
////
////                    //
////                    var imcomeNew = dm.Income.get();
////                    cc.log("剩余 进账 income = " + imcomeNew);
////
////                    var costNew = dm.Cost.get();
////                    cc.log("剩余 消费 cost = " + costNew);
////
////                    //
//                    dm.Number.set(itemNum);
////                    if (imcomeNew > 0 || costNew > 0)
////                    {
////                        cc.log("因为本地有残余 income 或者 cost1, 所以需要调整一下数据");
////                        dm.Income.add(imcomeNew);
////                        dm.Cost.sub(costNew);
//
////                        cc.log("新的当前道具数为 = " + dm.Number.get());
////                    }
//
//                }

                //重置一下脏位 时间不清，时间是为了上传其它值
                cc.DataMng.getInstance().getDirty().cleanItemDirty();
            }
            else
            {
                cc.log("ERROR 处理数据更新流程 uploadItems上传道具失败了 上传标志随机数 = " + flag);
            }

            if (callback)
            {
                cc.log("处理外部CallBack 上传标志随机数 = " + flag);
                callback(res, item);
            }
        };

        //
        cc.log("处理数据更新流程 数据上传(道具上传流程)asyncUpdateRolePropsData 上传标志随机数 = " + flag);
        cc.log("当前道具 cur = " + cur);
        cc.log("进账道具 income = " + income);
        cc.log("消费道具 cost = " + cost);
        cc.NodeSelf.getInstance().asyncUpdateRolePropsData(cur, income, cost, props, uploadItemCallback);

        //
        return this;
    },


    //------------------------------------------------------------------------------------------------------------------
    uploadOthers: function(callback)
    {
        if (!this.isUploadEnable())
        {
            cc.log("无法上传 uploadOthers");
            return this;
        }

        //
        if (_UploadingOthers)
        {
            cc.log("ERROR 不可连续上传快照");
            callback && callback(false);
            return this;
        }

        _UploadingOthers = true;

        //
        var self = this;

        var uploadOthersCallback = function(res, diamond, norScores, spaceScores, heartRecoverMax, cokeValue, candy)
        {
            _UploadingOthers = false;
            _SystemLoadingControl(false);
            if (res)
            {
                //
                self.finishUploadOthers(diamond, norScores, spaceScores, heartRecoverMax, cokeValue, candy);
            }
            else
            {
                cc.log("处理数据更新流程 数据上传(快照流程) 但是失败了!!!!");
            }

            if (callback)
            {
                callback(res, diamond, norScores, spaceScores, heartRecoverMax, cokeValue, candy);
            }
        };

        //
        _DB_OP_GAME_LEVELS.prepareLoad();
        _DB_OP_GAME_ITEMS.prepareLoad();
        _DB_OP_GAME.prepareLoad();

        //钻石有单独的流程，为版本兼容传空值
        var diamondData = cc.DataMng.getInstance().getDiamondTempUploadData();
        var norScoresData = cc.DataMng.getInstance().getScoresUploadData(false);
        var spaceScoresData = cc.DataMng.getInstance().getScoresUploadData(true);
        var heartData = cc.DataMng.getInstance().getHeartUploadData();
        var cokeTimeData = cc.DataMng.getInstance().getCokeTimeUploadData();


        _DB_OP_GAME_LEVELS.prepareLoadFinish();
        _DB_OP_GAME_ITEMS.prepareLoadFinish();
        _DB_OP_GAME.prepareLoadFinish();

        //
        cc.log("处理数据更新流程 数据上传(快照流程)!!!!!!");

        _SystemLoadingControl(true);
        cc.NodeSelf.getInstance().snapshot(diamondData, norScoresData, spaceScoresData, heartData, cokeTimeData, uploadOthersCallback);

        //GameCenter也上传数据
        GameCenterMng.getInstance().uploadScore();

        //
        //ItemPack.getInstance().async();
        //Bank.getInstance().async();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    uploadWeeklyData: function()
    {
	
        if (!this.isUploadEnable())
        {
            cc.log("uploadWeeklyData");
            return this;
        }

        //


        //
        var self = this;
//
        var uploadOthersCallback = function(res, flag)
        {

            if (res)
            {
                cc.log("处理数据更新流程 周排行 成功");
                
            }
            else
            {
                cc.log("处理数据更新流程 数据上传(周排行) 但是失败了!!!!");
            }
        };

		var updateScore = cc.DataMng.getInstance().getUpdateScore();
		
//        //
        cc.log("处理数据更新流程 数据上传(周排行)!!!!!!updateScore = " + updateScore);
        cc.NodeSelf.getInstance().asyncUpdateWeeklyScoreTopData(updateScore, uploadOthersCallback);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    uploadAll: function(callback)
    {
        var diamondFin = false;
        var othersFin = false;

        var diamondRes = false;
        var othersRes = false;

        var uploadDiamondFin = function(res/*, diamond*/)
        {
            diamondFin = true;
            diamondRes = res;

            if (othersFin && callback)
            {
                callback(diamondRes && othersRes);
            }
        };

        var uploadOthersFin = function(res/*, diamond, norScores, spaceScores, heartRecoverMax, cokeValue*/)
        {
            othersFin = true;
            othersRes = res;

            if (diamondFin && callback)
            {
                callback(diamondRes && othersRes);
            }
        };

        //
        this.uploadDiamond(MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_DEFAULT, uploadDiamondFin);
        this.uploadOthers(uploadOthersFin);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    /**
     * 申请第三方账号的访问授权成功完成
     */
    onPassportAuthorization: function(passport, userid, roleid, idx, token, callBack) {
        var self = cc.NodeHelper.getInstance();
        var nself = cc.NodeSelf.getInstance();
		cc.log("onPassportAuthorization:");
        //判断是否产生角色替换
        var oroleid = nself.getLocalRoleID();

        if (!oroleid) {
            //原本的roleid不存在？不应该出现！！！
            self.log('ERROR', '申请第三方账号访问授权完成时发生原本角色编号不存在的问题');
        }
		else if (oroleid !== roleid) {
			cc.log("无论如何先把旧角色的数据上传一次");
            //无论如何先把旧角色的数据上传一次
//            self.uploadCurrentRoleData(function() {
                nself.logout();
                nself.initPassportAccount(passport, userid);
                nself.initRole(roleid, idx, token, userid,"");
                self.writeNodeSelf();

                nself.download(function(isok, diamond, scores1, scores2, candy_urv, ssrd, newprops, freecandy, recvtime, candy) {
                    if (isok) {
                        //处理数据下载成功分支
                        cc.DataMng.getInstance().cleanRoleData();
                        self.coverData(diamond, scores1, scores2, candy_urv, ssrd, newprops, freecandy, recvtime, candy);
                    }
                    callBack && callBack(isok);
                });
//            });
         }
		else {
			cc.log("前后角色编号一致, 进行数据更新流程");
            //前后角色编号一致, 进行数据更新流程
            nself.initPassportAccount(passport, userid);
            nself.initRole(roleid, idx, token, userid,nself.getNick());
            self.writeNodeSelf();

//            self.uploadCurrentRoleData(function(res) {
//                callBack && callBack(res);
//            });
			nself.download(function(isok, diamond, scores1, scores2, candy_urv, ssrd, newprops, freecandy, recvtime, candy) {
				if (isok) {
					//处理数据下载成功分支
					cc.DataMng.getInstance().cleanRoleData();
					self.coverData(diamond, scores1, scores2, candy_urv, ssrd, newprops, freecandy, recvtime, candy);
				}
				callBack && callBack(isok);
			});
        }

        return self;
    },

//    已弃用//------------------------------------------------------------------------------------------------------------------
//    uploadCurrentRoleData: function(callback)
//    {
//        var self = this;
//
//        var uploadCallBack = function(res, diamond, norScores, spaceScores, heartRecoverMax, cokeValue)
//        {
//            if (res)
//            {
//                //
//                cc.log("处理数据更新流程 uploadCurrentRoleData 完成");
//                self.coverData(diamond, norScores, spaceScores, heartRecoverMax, cokeValue);
//            }
//            else
//            {
//                cc.log("处理数据更新流程 数据上传(快照流程) 但是失败了!!!!");
//            }
//
//            if (callback)
//            {
//                callback(res, diamond, norScores, spaceScores, heartRecoverMax, cokeValue);
//            }
//        };
//
//        //
//        _DB_OP_GAME_LEVELS.prepareLoad();
//        _DB_OP_GAME_ITEMS.prepareLoad();
//        _DB_OP_GAME.prepareLoad();
//
//        //
//        var diamondData = cc.DataMng.getInstance().getDiamondUploadData();
//        var norScoresData = cc.DataMng.getInstance().getScoresUploadData(false);
//        var spaceScoresData = cc.DataMng.getInstance().getScoresUploadData(true);
//        var heartData = cc.DataMng.getInstance().getHeartUploadData();
//        var cokeTimeData = cc.DataMng.getInstance().getCokeTimeUploadData();
//
//        //
//        _DB_OP_GAME_LEVELS.prepareLoadFinish();
//        _DB_OP_GAME_ITEMS.prepareLoadFinish();
//        _DB_OP_GAME.prepareLoadFinish();
//
//        //
//        cc.log("处理数据更新流程 数据上传(快照流程)!!!!!!");
//        cc.NodeSelf.getInstance().snapshot(diamondData, norScoresData, spaceScoresData, heartData, cokeTimeData, uploadCallBack);
//        GameCenterMng.getInstance().uploadScore();
//        //
//        //ItemPack.getInstance().async();
//        //Bank.getInstance().async();
//    },

    //------------------------------------------------------------------------------------------------------------------
    coverData: function(diamond, norScores, spaceScores, heartRecoverMax, cokeValue, newprops, freeCandyValue, candyCDTime, candy)
    {
        //
        _DB_OP_GAME_LEVELS.prepareSave();
        _DB_OP_GAME_ITEMS.prepareSave();
        _DB_OP_GAME.prepareSave();

        //数据覆盖
        cc.log("数据覆盖");
        cc.DataMng.getInstance().coverDiamondData(diamond);
        cc.DataMng.getInstance().coverScoresData(norScores, spaceScores);
        cc.DataMng.getInstance().coverHeartData(heartRecoverMax, candy);
        cc.DataMng.getInstance().coverItemData(newprops);

        //step:end 一定在设置进度之后
        cc.DataMng.getInstance().coverCokeTimeData(cokeValue);
		
		cc.log("freeCandyValue = " + freeCandyValue);
		cc.DataMng.getInstance().coverFreeCandyData(freeCandyValue);
        cc.DataMng.getInstance().setCandyCDTime(candyCDTime);
        //
        _DB_OP_GAME_LEVELS.prepareSaveFinish();
        _DB_OP_GAME_ITEMS.prepareSaveFinish();
        _DB_OP_GAME.prepareSaveFinish();

        //重置一下时间 和脏位
        cc.DataMng.getInstance().getDirty().cleanDirty();

        var nodeTimer = cc.GameManager.getInstance().getGameTimerByDescription("NodeSelfTimer");
        if (nodeTimer)
        {
            nodeTimer.reset();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
   /* finishUploadDiamond: function(diamond)
    {
        cc.DataMng.getInstance().coverDiamondData(diamond);

        //重置一下脏位 时间不清，时间是为了上传其它值
        cc.DataMng.getInstance().getDirty().cleanDiamondDirty();
        return this;
    },*/

    //------------------------------------------------------------------------------------------------------------------
    finishUploadOthers: function(diamond, norScores, spaceScores, heartRecoverMax, cokeValue, candy)
    {
        //钻石有单独的流程，此处不覆盖
        cc.DataMng.getInstance().coverHeartData(heartRecoverMax, candy);
        cc.DataMng.getInstance().coverCokeTimeData(cokeValue);

        //关卡别覆盖 会出问题 TODO

        //重置一下脏位
        cc.DataMng.getInstance().getDirty().cleanOthersDirty();

        //没有脏值后才清时间
        var anyDirty = cc.DataMng.getInstance().getDirty().isDirty();
        var nodeTimer = cc.GameManager.getInstance().getGameTimerByDescription("NodeSelfTimer");
        if (!anyDirty && nodeTimer)
        {
            nodeTimer.reset();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    writeNodeSelf: function()
    {
        //
        var self = this;
        var ser = cc.NodeSelf.getInstance().serialize();
        cc.log("开始存储 = " + ser);
        cc.SafeFile.getInstance().set(self.kLocalStorageKeyName, ser);

        return ser;
    },

    //-------------------------------------------------------------------------
    //数据缓存相关接口集

    /**
     * 更新本地缓存的客户端钻石数据
     * @param current 本地当前值
     * @param income 收入值
     * @param cost 支出值
     */
    updateDiamondCacheData : function(current, income, cost, callback) {
        var json = this.dCacheData.ddiamond;
        if (json) {
            json.cur = current;
            json.income += income;
            json.cost += cost;
        } else {
            this.dCacheData.ddiamond = {
                'cur' : current,
                'cost' : cost,
                'income' : income
            };
        }

        if (callback) {
            var action = cc.NodeDefine.NET_ACTIONS.kRoleDataChange;
            var cbfunc = function() {
                self.unregisterActionCallback(action, cbfunc);
                callback();
            };
            self.registerActionCallback(action, cbfunc);
        }
    },

    /**
     * 更新本地缓存的薄荷糖数据
     */
    updateCandyData : function(maxv, addv, callback) {
        var json = this.dCacheData.dcandy;
        if (json) {
            json.max = maxv;
            json.add += addv;
        } else {
            this.dCacheData.dcandy = {
                'max' : maxv,
                'addv' : addv
            };
        }

        if (callback) {
            var action = cc.NodeDefine.NET_ACTIONS.kRoleDataChange;
            var cbfunc = function() {
                self.unregisterActionCallback(action, cbfunc);
                callback();
            };
            self.registerActionCallback(action, cbfunc);
        }
    },

    /**
     * 更新本地缓存的客户端普通关卡得分数组
     * @param {Number} completed_count 完成的关卡数目
     * @param {Array} score_list 得分数组
     */
    updateNormalStageScoreList : function(completed_count, score_list, callback) {
        var arr = this.dCacheData.stage1;
        this.dCacheData.stage1 = JSON.parse(JSON.stringify(score_list));

        if (callback) {
            var action = cc.NodeDefine.NET_ACTIONS.kRoleDataChange;
            var cbfunc = function() {
                self.unregisterActionCallback(action, cbfunc);
                callback();
            };
            self.registerActionCallback(action, cbfunc);
        }
    },

    /**
     * 更新本地缓存的客户端空间站关卡得分数组
     */
    updateSpaceportStageScoreList : function(completed_count, score_list, callback) {
        var arr = this.dCacheData.stage2;
        this.dCacheData.stage2 = JSON.parse(JSON.stringify(score_list));

        if (callback) {
            var action = cc.NodeDefine.NET_ACTIONS.kRoleDataChange;
            var cbfunc = function() {
                self.unregisterActionCallback(action, cbfunc);
                callback();
            };
            self.registerActionCallback(action, cbfunc);
        }
    },

    /**
     * 更新空间站关卡恢复时间
     */
    updateSpaceportStageRecoveryData : function(stage_id, recovery_time, callback) {
        var self = cc.NodeSelf.getInstance();
        var json = this.dCacheData.ssrd;
        if (json) {
            json.ssrn = stage_id;
            json.ssrt = recovery_time;
        } else {
            this.dCacheData.ssrd = {
                'ssrn' : stage_id,
                'ssrt' : recovery_time
            };
        }

        if (callback) {
            var action = cc.NodeDefine.NET_ACTIONS.kRoleDataChange;
            var cbfunc = function() {
                self.unregisterActionCallback(action, cbfunc);
                callback();
            };
            self.registerActionCallback(action, cbfunc);
        }
    },


    /**
     * 获取角色钻石消费评定等级
     * @returns {number}
     */
    getRoleConsumptionDiamondLevel : function() {
        var self = this;

        if (!self.bIsLoadOverviewData) {
            return 0;
        }

        var hdtc = self.dOverviewData.hdtc || 0;
        if (hdtc < 1000) {
            return 0;
        } else if (hdtc < 2000) {
            return 1;
        } else if (hdtc < 3000) {
            return 2;
        } else if (hdtc < 4000) {
            return 3;
        } else if (hdtc < 5000) {
            return 4;
        } else if (hdtc < 6000) {
            return 5;
        } else if (hdtc < 7000) {
            return 6;
        } else if (hdtc < 8000) {
            return 7;
        } else if (hdtc < 10000) {
            return 8;
        } else {
            return 9;
        }
    },
    
    /**
     * 获取单个在线设置属性值
     */
    getSingleOnlineSetting : function(setting, callback) {
        var self = this;
        if (self.bIsLoadOnlineSettings) {
            callback(self.dCacheOnlineSettings[setting]);
        } else {
            cc.NodeSelf.getInstance().getOnlineSettings(function(isok, settings) {

                if (isok) {
                    self.bIsLoadOnlineSettings = true;
                    self.dCacheOnlineSettings = settings;
                } else {
                    //如果失败的话？
                    //目前处理：不再获取新的设置
                    self.bIsLoadOnlineSettings = true;
                }

                callback(self.dCacheOnlineSettings[setting]);

            });
        }
    },
    
	/**
     * 游客入口按钮在线开关
     */
    getOnlineGuestBtnSwitch : function(callback) {
        var self = this;
        self.getSingleOnlineSetting('visitor', callback);
    },
	
    /**
     * 获取兑换码功能在线开关
     */
    getOnlineCDKeySwitch : function(callback) {
        var self = this;
        self.getSingleOnlineSetting('cdkey', callback);
    },
    
    /**
     * 获取过关总得分排行榜功能在线开关
     */
    getOnlineScoreRankingsSwitch : function(callback) {
        var self = this;
        self.getSingleOnlineSetting('score_rankings', callback);
    },
    
    /**
     * 获取广告在线开关
     */
    getOnlineADSwitch : function(callback) {
        var self = this;
        self.getSingleOnlineSetting('ad', callback);
    },
    
    /**
     * 获取广告条在线开关
     */
    getOnlineBannerADSwitch : function(callback) {
        var self = this;
        self.getOnlineADSwitch(function(bopen) {
            if (bopen) {
                self.getSingleOnlineSetting('BannerAD', callback);
            } else {
                callback(false);
            }
        });

    },
    
    /**
     * 获取全屏广告在线开关
     */
    getOnlineFullScreenADSwitch : function(callback) {
        var self = this;
        self.getOnlineADSwitch(function(bopen) {
            if (bopen) {
                self.getSingleOnlineSetting('FullScreenAD', callback);
            } else {
                callback(false);
            }
        });
    },
    
    /**
     * 获取更多钻石在线开关
     */
    getOnlineMoreDiamondADSwitch : function(callback) {
        var self = this;
        self.getOnlineADSwitch(function(bopen) {
            if (bopen) {
                self.getSingleOnlineSetting('MoreDiamondAD', callback);
            } else {
                callback(false);
            }
        });
    },
    
    /**
     * 获取更多游戏在线开关
     */
    getOnlineMoreGameADSwitch : function(callback) {
        var self = this;
        self.getOnlineADSwitch(function(bopen) {
            if (bopen) {
                self.getSingleOnlineSetting('MoreGameAD', callback);
            } else {
                callback(false);
            }
        });
    },
    /**
     * 获取跳过超时功能在线开关
     */
    getOnlinePassTimeOutSwitch : function(callback) {
        var self = this;
        self.getSingleOnlineSetting('timeout', callback);
    },

	//获取折扣信息
	getDiamondDiscount:function()
	{
		var callBack = function(result, packet)
		{
			//
            cc.log("获取折扣信息 结果 = " + result);
			
			if (result)
            {
                cc.log("获取折扣信息 折扣 " + packet);

                var targetPer = parseInt(packet);

                cc.log("获取折扣信息 实际折扣" + targetPer);
//                for (var shopTab in GUI.SHOP_DATA)
//                {
//                    if (!GUI.SHOP_DATA.hasOwnProperty(shopTab))
//                    {
//                        continue;
//                    }
//
//                    //
                GUI.SHOP_DATA.SHOP_DATA_DIAMOND.forEach(
                        function(each)
                        {
                            each.DISCOUNT = targetPer;

                            cc.log("each.DISCOUNT = " + each.DISCOUNT);
                        }
                    );
//                }

            }
            else
            {

            }
			
		};

		cc.NodeSelf.getInstance().asyncDiscountDiamond(callBack);
	}
    
});

cc.NodeHelper._instance = null;
cc.NodeHelper.getInstance = function() {
    if (!this._instance) {
        this._instance = new cc.NodeHelper();
        this._instance._init();
    }
    return this._instance;
};
