/**
 * Created by hong.zhang on 2014/7/23.
 */

//======================================================================================================================
cc.GUITaskKakaoData = cc.Class.extend({

//------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {

        //每日任务
        this.m_tHashDailyTask = {};
        this.m_arrDailyTask = {};
        //周任务
        this.m_tWeekendTask = {};
        this.m_arrWeekendTask = {};

    },

    init: function()
    {
        if(isHtml5)
        {
            this._initTestData();
        }

    },

    _initTestData: function()
    {

        var dailymission =
        {
            "mr03":
            {
                "id":"mr03",
                "type":"0",
                "content":"10003",
                "condition":"3",
                "finishcount":"2",
                "rewardid":"101",
                "count":1,
                "recvReward":0,
                "finishNum":2,
                "status":1
            },
            "mr04":
            {
                "id":"mr04",
                "type":"0",
                "content":"10004",
                "condition":"4",
                "finishcount":"100000",
                "rewardid":"101",
                "count":1,
                "recvReward":0,
                "finishNum":0,
                "status":1
            },
            "mr01":
            {
                "id":"mr01",
                "type":"0",
                "content":"10001",
                "condition":"1",
                "finishcount":"3",
                "rewardid":"101",
                "count":1,
                "recvReward":0,
                "finishNum":2,
                "status":1
            }
        };

        this.setDailyTaskWithHash(dailymission);

        weeklymission =
        {
            "zr01": {
                "id": "zr01",
                "type": "1",
                "content": "10001",
                "condition": "1",
                "finishcount": "15",
                "rewardid": "16",
                "count": 3,
                "recvReward": 0,
                "finishNum": 13,
                "status": 1
            },
            "zr02": {
                "id": "zr02",
                "type": "1",
                "content": "10002",
                "condition": "2",
                "finishcount": "5",
                "rewardid": "14",
                "count": 3,
                "recvReward": 0,
                "finishNum": 5,
                "status": 1
            },
            "zr03": {
                "id": "zr03",
                "type": "1",
                "content": "10003",
                "condition": "2",
                "finishcount": "5",
                "rewardid": "14",
                "count": 3,
                "recvReward": 0,
                "finishNum": 0,
                "status": 1
            },
            "zr04": {
                "id": "zr04",
                "type": "1",
                "content": "10004",
                "condition": "2",
                "finishcount": "5",
                "rewardid": "14",
                "count": 3,
                "recvReward": 0,
                "finishNum": 0,
                "status": 1
            },
            "zr05": {
                "id": "zr05",
                "type": "1",
                "content": "10005",
                "condition": "2",
                "finishcount": "5",
                "rewardid": "14",
                "count": 3,
                "recvReward": 0,
                "finishNum": 5,
                "status": 1
            }
        }

        this.setWeekendTaskWithHash(weeklymission);
    },

//------------------------------------------------------------------------------------------------------------------
//日常任务的处理
    _setHashDailyTask: function(tTask)
    {
        if(tTask == null)
        {
            return;
        }
        this.m_tHashDailyTask = null;
        this.m_tHashDailyTask =tTask;
    },

    _setDailyTask: function(arrTask)
    {
        if(arrTask == null)
        {
            return;
        }
        this.m_arrDailyTask = null;
        this.m_arrDailyTask = arrTask;
    },

    setDailyTaskWithHash: function(tTask)
    {
        this._setHashDailyTask(tTask);

        var arrTask = new Array();
        for( var value in tTask)
        {
            arrTask.push(tTask[value]);
        }

        this._setDailyTask(arrTask);
    },

    getHashDailyTask: function()
    {
        return this.m_tHashDailyTask;
    },

    getDailyTask: function()
    {
        return this.m_arrDailyTask;
    },

    getDailyTaskByID: function( strID )
    {
        return this.getHashDailyTask()[strID];
    },


    addDailyTaskScore: function( strID, nScore)
    {
        var tTask = this.getDailyTaskByID(strID);

        if(!tTask)
        {
            return;
        }

        var nNewScore = parseInt(tTask.finishNum) + nScore;
        tTask.finishNum = nNewScore.toString();
    },

    ifDailyTaskComplete: function( strID)
    {
        var tTask = this.getDailyTaskByID(strID);

        if(!tTask)
        {
            return false;
        }

        var nScore = parseInt(tTask.finishNum);
        var nTarget = parseInt(tTask.finishcount);

        return nScore >= nTarget;
    },

////------------------------------------------------------------------------------------------------------------------
////周任务的处理
    _setHashWeekendTask: function(tTask)
    {
        if(tTask == null)
        {
            return;
        }
        this.m_tHashWeekendTask = null;
        this.m_tHashWeekendTask =tTask;
    },

    _setWeekendTask: function(arrTask)
    {
        if(arrTask == null)
        {
            return;
        }
        this.m_arrWeekendTask = null;
        this.m_arrWeekendTask = arrTask;
    },

    setWeekendTaskWithHash: function(tTask)
    {
        this._setHashWeekendTask(tTask);

        var arrTask = new Array();
        for( var value in tTask)
        {
            arrTask.push(tTask[value]);
        }

        this._setWeekendTask(arrTask);
    },

    getHashWeekendTask: function()
    {
        return this.m_tHashWeekendTask;
    },

    getWeekendTask: function()
    {
        return this.m_arrWeekendTask;
    },

    getWeekendTaskByID: function( strID )
    {
        if(!this.getHashWeekendTask || !this.getHashWeekendTask())
        {
            return;
        }
        return this.getHashWeekendTask()[strID];
    },


    addWeekendTaskScore: function( strID, nScore)
    {
        var tTask = this.getWeekendTaskByID(strID);

        if(!tTask)
        {
            return;
        }

        var nNewScore = parseInt(tTask.finishNum) + nScore;
        tTask.finishNum = nNewScore.toString();
    },

    ifWeekendTaskComplete: function( strID)
    {
        var tTask = this.getWeekendTaskByID(strID);

        if(!tTask)
        {
            return false;
        }

        var nScore = parseInt(tTask.finishNum);
        var nTarget = parseInt(tTask.finishcount);

        return nScore >= nTarget;
    },

////------------------------------------------------------------------------------------------------------------------
    ifTaskComplete: function(strID)
    {
        if(this.getDailyTaskByID(strID))
        {
            return this.ifDailyTaskComplete(strID);
        }

        if(this.getWeekendTaskByID(strID))
        {
            return this.ifWeekendTaskComplete(strID);
        }

        return false;
    },

//------------------------------------------------------------------------------------------------------------------
    uploadDailyTaskScore: function()
    {
        var tUpload = {};
        for( var value in this.getHashDailyTask())
        {
            var tElement = {}
            tElement.id = this.getHashDailyTask()[value].id;
            tElement.finishNum = this.getHashDailyTask()[value].finishNum;

            tUpload[value] = tElement;
        }

        //不管上传成功不成功本地都加上
        cc.NodeSelf.getInstance().asyncUpdateDailyMission(tUpload,function(){});
    },

    uploadWeekendTaskScore: function()
    {
        var tUpload = {};
        for( var value in this.getHashWeekendTask())
        {
            var tElement = {}
            tElement.id = this.getHashWeekendTask()[value].id;
            tElement.finishNum = this.getHashWeekendTask()[value].finishNum;

            tUpload[value] = tElement;
        }

        //不管上传成功不成功本地都加上
        cc.NodeSelf.getInstance().asyncUpdateWeeklyMission(tUpload,function(){});
    },

    uploadTaskScore: function()
    {
        this.uploadDailyTaskScore();
        this.uploadWeekendTaskScore();
    },

//------------------------------------------------------------------------------------------------------------------
    downloadTaskInfo: function()
    {
        var self = this;
        var callBack = function(bResult, tDailymission, tWeeklymission)
        {
            if(bResult)
            {
                self.setDailyTaskWithHash(tDailymission);
                self.setWeekendTaskWithHash(tWeeklymission);
            }
        }
        cc.NodeSelf.getInstance().asyncGetMissionList(callBack);
    }

});

cc.GUITaskKakaoData._instance = null;
cc.GUITaskKakaoData.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUITaskKakaoData();
        this._instance.init();
    }

    return this._instance;
};