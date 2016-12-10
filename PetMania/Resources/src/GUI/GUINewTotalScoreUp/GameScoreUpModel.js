//======================================================================================================================
var GameScoreUpModel = cc.IObject.extend({

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

        this.m_FriendsInfosByScoreTop = [];

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
        return "GameScoreUpModel";
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
    //------------------------------------------------------------------------------------------------------------------
    getTopDatasByKey: function(key)
    {
        this._data[key] = this._data[key] || [];
        return this._data[key];
    },
    //------------------------------------------------------------------------------------------------------------------
    setTopDataByKeyAndIndex: function(key, data)
    {
        this._hashMapByUID[key][data.getUID()] = data;

        return this;
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

        this.m_FriendsInfosByScoreTop = FriendsMng.getInstance().getFriendsInfos().concat();

        var m_UID = [cc.NodeSelf.getInstance().getUID()];

        this.m_FriendsInfosByScoreTop.forEach(
            function(friendInfo)
            {
                if (friendInfo){
                    m_UID.push(friendInfo.getID());
                }
            }
        );


        var self = this;

        var getPassportScoreTopCallBack = function(res, weekly)//acket.weekranking, packet.stageranking, packet.scoresranking
        {
            if (res)
            {
                //
                cc.log("获取排行榜数据成功 weekly = " + JSON.stringify(weekly));

                for (var i = 0; i < weekly.length; i++){
                    var friendInfo = weekly[i];
                    if (friendInfo){
                        cc.log("friendInfo uid = " + friendInfo.userid);
//                        cc.log("friendInfo score = " + friendInfo.scores);
//
                        if (friendInfo.userid){
                            if (friendInfo.userid == cc.NodeSelf.getInstance().getUID()){
                                cc.DataMng.getInstance().setWeeklyScore(friendInfo.weekscores);
								cc.log("获取周总分成功 self score = " + friendInfo.weekscores);
                            }
                            else {
                                var updateInfo =  FriendsMng.getInstance().getFriendInfoByRoleId(friendInfo.userid);
                                updateInfo.setScoreUpData(friendInfo.weekscores);
                                updateInfo.setTotalLevel(friendInfo.stagesnum);
                                updateInfo.setTotalScore(friendInfo.totalscores);
                                cc.log("获取周总分成功 score = " + updateInfo.getScoreUpData());
                            }

                        }

                    }

                }

                FriendsMng.getInstance().fireEvent(_FRIENDS_MNG_EVENT.GET_FRIENDS_WEEKLY_SUCC);

//                //打印时间
//                self._lastUpdateTime = _ServerTime();
//                cc.log("上次的更新时间->" + (new Date(uptime * 1000)).toLocaleString());
//                cc.log("更新的时间->" + (new Date(self.getLastUpdateTime())).toLocaleString());

                //
//                self.parseTopDatasFromServer(top);
            }
            else
            {
                cc.log("获取排行榜数据失败");
            }
        };

        if (m_UID.length > 0 ){
            cc.NodeSelf.getInstance().asyncGetFriendsWeeklyScoreTop(m_UID, getPassportScoreTopCallBack);
        }
        else {
            cc.log("当前好友数为0");
        }


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseTopDatasFromServer: function(top)
    {
        var self = this;

        //先清除总榜
        var firstFlag = true;
        if (this._data[GameTopModel._TOP_KEY.KEY_GAME_WEEKLY] && this._data[GameTopModel._TOP_KEY.KEY_GAME_WEEKLY].length > 0){
            firstFlag = false;
        }
        this._data[GameTopModel._TOP_KEY.KEY_GAME_WEEKLY] = [];
        this._hashMapByUID[GameTopModel._TOP_KEY.KEY_GAME_WEEKLY] = {};

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
    }
});

//
GameScoreUpModel._TOP_KEY = {
    KEY_GAME_LEVEL: "KEY_GAME_LEVEL",
    KEY_GAME_SCORE: "KEY_GAME_SCORE",
    KEY_GAME_WEEKLY: "KEY_GAME_WEEKLY"
};

//
GameScoreUpModel._instance = null;
GameScoreUpModel.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = (new GameScoreUpModel()).init();

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
