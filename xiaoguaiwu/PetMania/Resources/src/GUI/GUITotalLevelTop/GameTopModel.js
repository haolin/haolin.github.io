var TopData = cc.IObject.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //
        this._playerName = "";
        this._roleId = 0;
        this._uid = 0;
        this._photoURL = "";
		this.avatar = "";
        this._photoResPath = /*Tools.randomEx(100) < 50 ? Resource.snake_0_png :*/ "";
        this._posChange = "same";
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "TopData";
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getPlayerName: function()
    {
        return this._playerName;
    },

    //------------------------------------------------------------------------------------------------------------------
    getPhotoUrl: function()
    {
        return this._photoURL;
    },

    //------------------------------------------------------------------------------------------------------------------
    getRoleId: function()
    {
        return this._roleId;
    },

    //------------------------------------------------------------------------------------------------------------------
    getUID: function()
    {
        return this._uid;
    },

    //------------------------------------------------------------------------------------------------------------------
    getPhotoResPath: function()
    {
		return this._photoResPath;
    },
    //------------------------------------------------------------------------------------------------------------------
    getPosChange: function()
    {
        return this._posChange;
    },

    setPosChange: function(value)
    {
        this._posChange = value;
    },
    //------------------------------------------------------------------------------------------------------------------
    applyDataFromThird: function()
    {
        //opJoy.OpJoy().addGetUidInfo(this.getUID());
        GetInfoFromUid(this.getUID() , function(uid , info){
            GameTopModel.getInstance().handleInfoFromUidCallBack(uid, info);
			cc.log("GameTopModel.getInstance().handleInfoFromUidCallBack(uid = " +uid);
        });
                                
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setDataOfThird: function(playerName, photoURL)
    {
        this._playerName = playerName;
        this._photoURL = photoURL;
		this.avatar = photoURL;
        return this;
    },
	
	setPhotoResPath: function(path)
	{
		this._photoResPath = path;
	}
});

//======================================================================================================================
var TopData_GameLevel = TopData.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //
        this._gameLevel = 0;
        this._totalScore = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    initByData: function(playerName, gameLevel, totalScore, roleId, uid)
    {
        //
        this._playerName = playerName;
        this._gameLevel = gameLevel;
        this._totalScore = totalScore;
        this._roleId = roleId;
        this._uid = uid;
        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "TopData";
    },

    //------------------------------------------------------------------------------------------------------------------
    getGameLevel: function()
    {
        return this._gameLevel;
    },

    //------------------------------------------------------------------------------------------------------------------
    getTotalScore: function()
    {
        return this._totalScore;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "总榜数据: " + this.getPlayerName()
            + ", 关卡 ＝ " + this.getGameLevel()
            + ", 总分 = " + this.getTotalScore()
            + ", uid = " + this.getUID()
            + ", roleId = " + this.getRoleId()
            + ", photo = " + this.getPhotoUrl()
            + ", photoResPath = " + this.getPhotoResPath();
    }
});

//
TopData_GameLevel.create = function(playerName, gameLevel, totalScore, playerRoleId, uid)
{
    return (new TopData_GameLevel()).initByData(playerName, gameLevel, totalScore, playerRoleId, uid);
};

//
TopData_GameLevel.createTest = function()
{
    return (new TopData_GameLevel()).initByData("Player",
        Tools.rangeRandom(10, 100, true),
        Tools.rangeRandom(1000, 3000, true));
};

//======================================================================================================================
var TopDataProtocol = cc.IObject.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //
        this._heads = null;
        this._data = {};
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "TopDataProtocol";
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(tableHeads)
    {
        this._heads = tableHeads;
        cc.log("tableHeads = " + this._heads);


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this._data = {};
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseTableRow: function(row)
    {
        var self = this;

        if (!(row instanceof Array))
        {
            cc.Assert(0);
        }

        //
        row.forEach(
            function(col, index)
            {
                self._data[self._heads[index]] = col;
            }
        );

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getRoleId: function()
    {
        return this._data["roleid"];
    },

    //------------------------------------------------------------------------------------------------------------------
    getScore: function()
    {
        return this._data["score"];
    },

    //------------------------------------------------------------------------------------------------------------------
    getUID: function()
    {
        return this._data["uid"];
    },

    //------------------------------------------------------------------------------------------------------------------
    getStage: function()
    {
        return this._data["stage"];
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "roleid = " + this.getRoleId()
            + ", score = " + this.getScore()
            + ", uid = " + this.getUID()
            + ", stage = " + this.getStage();
    }
});

//
TopDataProtocol.create = function(tableHeads)
{
    if (!(tableHeads instanceof Array))
    {
        cc.Assert(0);
    }

    return (new TopDataProtocol()).init(tableHeads.concat());
};

//======================================================================================================================
var GameTopModel = cc.IObject.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        this._data = {};

        this._hashMapByUID = {};
        this._lastUpdateTime = 0;
		
		this.m_TopLevelEvents = IEvent.create(this);
		
		this.photoUrlArray = [];
		
		this.m_MapFriendRoleIdToPos = {};
        this.m_lastMapRoleIdToPos = {};

        this._lastSelfIndex = 0;

        this._curFreshLine = 0; //当前应该更新的时间点
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "GameTopModel";
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        return this;
    },

    //注册事件
    registerEvent: function(eventName, _eventFunction, _eventTarget)
    {
        this.m_TopLevelEvents.registerEvent(eventName, _eventFunction, _eventTarget);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //触发事件
    fireEvent: function(eventName, params)
    {
		cc.log("fire :" + eventName);
        this.m_TopLevelEvents.fireEvent(eventName, params);
        return this;
    },

	getIndexById: function(rid)
	{
		return this.m_MapFriendRoleIdToPos[rid];
	},

    //------------------------------------------------------------------------------------------------------------------
    getLastUpdateTime: function()
    {
        return this._lastUpdateTime;
    },


    //------------------------------------------------------------------------------------------------------------------
    addTopDataByKey: function(key, data)
    {
		cc.log("addTopDataByKey :" + data.getUID());
        //
        this.getTopDatasByKey(key);
        this.getHashMapUIDByKey(key);

        //
        this._data[key].push(data);
        this._hashMapByUID[key][data.getUID()] = data;

        return this;
    },
	
	//------------------------------------------------------------------------------------------------------------------
    delTopDataByKey: function(key, data)
    {
		cc.log("delTopDataByKey :" + data.getUID());
        //;
        this._hashMapByUID[key][data.getUID()] = null;

        return this;
    },

    setLastSelfPos: function(idx)
    {
        this._lastSelfIndex = idx;
    },

    //------------------------------------------------------------------------------------------------------------------
    getPhotoUrlByRoleId: function(Rid)
    {
        return this.photoUrlArray[Rid];
    },
	
	getTOpdatasLength: function(key)
	{
		var datas = this.getTopDatasByKey(key);
		return datas.length;
	},

    //------------------------------------------------------------------------------------------------------------------
    getTopDatasByKey: function(key)
    {
        this._data[key] = this._data[key] || [];
        return this._data[key];
    },

	getTopDatasByKeyForSelf: function(key)
	{
		var datas = this.getTopDatasByKey(key);
		var targetData = null;
		datas.forEach(
            function(a_data){
				cc.log("a_data = " + a_data);
				
                if (a_data.getRoleId().toString() == cc.NodeSelf.getInstance().getRoleId().toString())
				{
					targetData =  a_data;
				}
            }
        );
		return targetData;
	},

    getTopDatasIndexForSelf: function()
    {
        cc.log("getTopDatasIndexForSelf");
        var datas = this.getTopDatasByKey(GameTopModel._TOP_KEY.KEY_GAME_LEVEL);
        var selfIndex = -1;

        var totaldata = cc.DataMng.getInstance().getTotalData();
        var totalGameScore = totaldata[0];
        var dataLength = datas.length;
        var lastFriend = datas[dataLength - 1];
		
        if (lastFriend && lastFriend.getTotalScore() < totalGameScore){
            var targetIndex = dataLength - 1;
            for (var i = dataLength - 2; i >= 0; i--){
                if (totalGameScore < datas[i].getTotalScore()){
                    targetIndex = i + 1;
                    break;
                }
                else {
                    targetIndex = i;
                }
            }
            selfIndex = targetIndex + 1;
        }
        else {
            var lastFriendScore = 10000;

            if (lastFriend != null){
                lastFriendScore = lastFriend.getTotalScore();
            }

            var arrangeSelf = lastFriendScore - totalGameScore;

            var eachArr = 100;
            var finalNum = parseInt(arrangeSelf / eachArr);
            if (arrangeSelf == 0){
                return dataLength;
            }
            selfIndex = finalNum + dataLength + 1;
        }

        return selfIndex;
    },
    //------------------------------------------------------------------------------------------------------------------
    setTopDataByKeyAndIndex: function(key, data)
    {
        this._hashMapByUID[key][data.getUID()] = data;

        return this;
    },
    getTopDataForNum: function(key, rid)
	{
		var datas = this.getTopDatasByKey(key);
		var targetIndex = 0;

		datas.forEach(
            function(a_data,inx)
            {
                if (a_data.getRoleId() == rid)
				{
					targetIndex = inx;
				}
            }
        );
		return targetIndex;
	},
    //------------------------------------------------------------------------------------------------------------------
    getHashMapUIDByKey: function(key)
    {
		cc.log("getHashMapUIDByKey = " + this._hashMapByUID[key]);
        this._hashMapByUID[key] = this._hashMapByUID[key] || {};
        return this._hashMapByUID[key];
    },

    //------------------------------------------------------------------------------------------------------------------
    logTopGameLevel: function()
    {
        cc.log("打印总榜-----------------------------------------------------");
        this.getTopDatasByKey(GameTopModel._TOP_KEY.KEY_GAME_LEVEL).forEach(
            function(a_data)
            {
                cc.log("" + a_data);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getTopGameLevelSize: function()
    {
        return (this._data[GameTopModel._TOP_KEY.KEY_GAME_LEVEL] || []).length;
    },

    //------------------------------------------------------------------------------------------------------------------
    getTopGameLevelDataByIndex: function(index)
    {
        var datasByKey = this.getTopDatasByKey(GameTopModel._TOP_KEY.KEY_GAME_LEVEL);
        return datasByKey[index];
    },

    //------------------------------------------------------------------------------------------------------------------
    askServerForTopDatas: function()
    {
        //
        cc.log("askServerForTopDatas 获取排行榜的数据");

        var self = this;

        var getPassportScoreTopCallBack = function(res, uptime, top)
        {
            if (res)
            {
                //
                cc.log("获取排行榜数据成功");

                //打印时间
                self._lastUpdateTime = _ServerTime();
                cc.log("上次的更新时间->" + (new Date(uptime * 1000)).toLocaleString());
                cc.log("更新的时间->" + (new Date(self.getLastUpdateTime())).toLocaleString());

                //
                self.parseTopDatasFromServer(top);
            }
            else
            {
                cc.log("获取排行榜数据失败");
            }
        };

        //
        cc.NodeSelf.getInstance().asyncGetPassportScoreTop(_ParseChannel("askServerForTopDatas"), getPassportScoreTopCallBack);
		
        return this;
    },

    getTotalLevelNumChange: function(roleId)
    {
        cc.log("getgetget roleID:" + roleId ); //"  result: " + this.m_lastMapRoleIdToPos[roleId]);
//        return this.m_lastMapRoleIdToPos[roleId];
        return "same";
    },
    //------------------------------------------------------------------------------------------------------------------
    parseTopDatasFromServer: function(top)
    {
        var self = this;

        //先清除总榜
        var firstFlag = true;
        if (this._data[GameTopModel._TOP_KEY.KEY_GAME_LEVEL] && this._data[GameTopModel._TOP_KEY.KEY_GAME_LEVEL].length > 0){
            firstFlag = false;
        }
        this._data[GameTopModel._TOP_KEY.KEY_GAME_LEVEL] = [];
        this._hashMapByUID[GameTopModel._TOP_KEY.KEY_GAME_LEVEL] = {};

        //
        var protocol = TopDataProtocol.create(top[0]);
        top.forEach(
            function(a_topData, index)
            {
                if (index == 0)
                {
                    //是表头 不要
                    return;
                }

                //
                protocol.cleanUp().parseTableRow(a_topData);
                cc.log("" + (index - 1) + ":" + protocol);

                //
                var createNew = TopData_GameLevel.create(("Player:" + protocol.getRoleId()),
                    protocol.getStage(),
                    protocol.getScore(),
                    protocol.getRoleId(),
                    protocol.getUID());

                //
                self.m_lastMapRoleIdToPos[protocol.getRoleId()] = "same";
                if (!firstFlag){

                    if (self.m_MapFriendRoleIdToPos[protocol.getRoleId()]){
                        if (self.m_MapFriendRoleIdToPos[protocol.getRoleId()] > index){
                            self.m_lastMapRoleIdToPos[protocol.getRoleId()] = "up";
                        }
                        else if (self.m_MapFriendRoleIdToPos[protocol.getRoleId()] < index){
                            self.m_lastMapRoleIdToPos[protocol.getRoleId()] = "down";
                        }
                    }
                    else {
                        self.m_lastMapRoleIdToPos[protocol.getRoleId()] = "up";
                    }
                }

                createNew.setPosChange(self.m_lastMapRoleIdToPos[protocol.getRoleId()]);
                cc.log("roleID:" + protocol.getRoleId() + "  result: " + self.m_lastMapRoleIdToPos[protocol.getRoleId()]);
				self.m_MapFriendRoleIdToPos[protocol.getRoleId()] = index;
				
                self.addTopDataByKey(GameTopModel._TOP_KEY.KEY_GAME_LEVEL, createNew);
            }
        );

        //
        cc.log("打印排行榜的数据 = " + GameTopModel._TOP_KEY.KEY_GAME_LEVEL);
        self.logTopGameLevel();

        //
        var datas = this.getTopDatasByKey(GameTopModel._TOP_KEY.KEY_GAME_LEVEL);
		
        datas.forEach(
            function(a_data)
            {
                a_data.applyDataFromThird();
				
				cc.log("a_data getPhotoUrl " + a_data.getPhotoUrl() + "  get roleID  = "  + a_data.getRoleId());
            }
        );
		
		cc.GUITotalLevelTop.getInstance().notifyFriendsUpdate(datas);
		
        return this;
    },
	//------------------------------------------------------------------------------------------------------------------
    getTopDatasById: function(uid)
    {
		var datas = this.getTopDatasByKey(GameTopModel._TOP_KEY.KEY_GAME_LEVEL);
		var targetData = null;
		
        datas.forEach(
            function(a_data,index)
            {
                if (a_data.getRoleId() == uid){
					targetData = a_data;
				}
            }
        );
		cc.log("getTopDatasById targetData= " + targetData);
		return targetData;
	},
	
    //------------------------------------------------------------------------------------------------------------------
    handleInfoFromUidCallBack: function(uid, info)
    {
        cc.log("获得了" + uid + "第三方数据");
		var self = this;
	
        var realInfo = JSON.parse(info);
        if (parseInt(realInfo.state) > 0)
        {
            //
            cc.log(uid + "第三方数据获得成功");

            //
            var topData = this.getHashMapUIDByKey(GameTopModel._TOP_KEY.KEY_GAME_LEVEL)[uid];
            if (topData)
            {
                if (uid != realInfo.data.id)
                {
                    cc.Assert(0);
                }

                //
                topData.setDataOfThird(realInfo.data.nick, realInfo.data.avatar);
                cc.log("" + topData);
				
				var datas = [];
				datas.push(topData);
				
				joyCommon.getInstance().downUserPhoto( datas, function(jsonData){
				
					var obj = JSON.parse(jsonData);
					var photoArray = obj.data;
					var updateData = [];
					photoArray.forEach(
						function(userPhoto)
						{
							self.getHashMapUIDByKey(GameTopModel._TOP_KEY.KEY_GAME_LEVEL)[uid].setPhotoResPath(userPhoto.url);
//							self.photoUrlArray[userPhoto.roleid] = userPhoto.url;
							var readyData = self.getTopDatasById(userPhoto.roleid);
							cc.log("readyData = " + readyData);
							updateData.push(readyData);
						}
					);

                    if (updateData.length > 0){
                        cc.GUITotalLevelTop.getInstance().notifyFriendsUpdate(updateData);
                    }

				});
				
            }
            else
            {
                cc.log(uid + "错误没有找到??");
            }
        }
        else
        {
            cc.log(uid + "第三方数据获得失败");
        }

        return this;
    },
	
	downPhotoHelper: function(datas){
		var self = this;
		cc.log("downPhotoHelper");
	
	}
	
});

//
GameTopModel._TOP_KEY = {
    KEY_GAME_LEVEL: "KEY_GAME_LEVEL"
};

//
GameTopModel._instance = null;
GameTopModel.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = (new GameTopModel()).init();


        //test
       /* for (var indx = 0; indx < 50; ++indx)
        {
            var data = TopData_GameLevel.createTest();
            this._instance.addTopDataByKey(GameTopModel._TOP_KEY.KEY_GAME_LEVEL, data);
        }

        //log
        this._instance.logTopGameLevel();*/

    }

    return this._instance;
};
