/**
 * Created by hong.zhang on 2014/7/24.
 */


//======================================================================================================================
cc.GUIAchievementData = cc.Class.extend({

//------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {

        this.m_tAchieveInfo = new Array();

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

        var achievement =
        {
            "0":
            {
                "type" :0,
                "curindex":1,
                "maxindex":11,
                "curnum":0,
                "maxnum":"1",
                "status":0,
                "rewardid":"101",
                "count":"1"
            },
            "1":
            {
                "type" :1,
                "curindex":1,
                "maxindex":7,
                "curnum":0,
                "maxnum":"10",
                "status":0,
                "rewardid":"13",
                "count":"1"
            },
            "2":
            {
                "type" :2,
                "curindex":1,
                "maxindex":7,
                "curnum":0,
                "maxnum":"10",
                "status":0,
                "rewardid":"14",
                "count":"1"
            },
            "3":
            {
                "type" :3,
                "curindex":1,
                "maxindex":7,
                "curnum":0,
                "maxnum":"10",
                "status":0,
                "rewardid":"19",
                "count":"1"
            },
            "4":
            {
                "type" :4,
                "curindex":1,
                "maxindex":11,
                "curnum":0,
                "maxnum":"1",
                "status":0,
                "rewardid":"15",
                "count":"1",
                "extra": ["0"]
            },
            "5":
            {
                "type" :5,
                "curindex":1,
                "maxindex":6,
                "curnum":0,
                "maxnum":"10",
                "status":0,
                "rewardid":"101",
                "count":"100"
            }
        }

        this.setAchieveInfo(achievement);
    },

//------------------------------------------------------------------------------------------------------------------
//日常任务的处理

    setAchieveInfo: function(tInfo)
    {
        if(tInfo == null)
        {
            return;
        }
        this.m_tAchieveInfo = null;
        cc.log("setAchieveInfo, tInfo: " + JSON.stringify(tInfo));
        this.m_tAchieveInfo = tInfo;
    },

    getAchieveInfo: function()
    {
        return this.m_tAchieveInfo;
    },

    getAchieveByType: function( strType )
    {
        return this.getAchieveInfo()[strType];
    },

    _addAchieveScoreNameStage: function( strType,nIndex )
    {
        cc.log("_addAchieveScoreNameStage, strType: " + strType + ", nIndex: " + nIndex);
        var tAchieve = this.getAchieveByType(strType);

        if(!tAchieve || !tAchieve.extra)
        {
            return;
        }

        //服务器第一次使用的时候会传一个[0]
        if(tAchieve.extra.length == 1)
        {
            tAchieve.extra = null;
            tAchieve.extra = [0,0,0,0,0,0,0,0,0,0,0];
        }
        cc.log("extra: " + JSON.stringify(tAchieve.extra));
        tAchieve.extra[nIndex] = 1;

        var nNewNum = 0;
        for(var i = 0; i < tAchieve.extra.length; ++i)
        {
            if(1 == tAchieve.extra[i])
            {
                ++nNewNum;
                cc.log("nNewNum: " + nNewNum);
            }
        }
        tAchieve.curnum = nNewNum;
    },

    //如果是命名星球成就传的是星球序编号
    addAchieveScore: function( strType, nScore)
    {
        var tAchieve = this.getAchieveByType(strType);

        if(!tAchieve)
        {
            return;
        }

        if(tAchieve.extra)
        {
            this._addAchieveScoreNameStage(strType,nScore);
        }
        else
        {
            var nNewScore = parseInt(tAchieve.curnum) + nScore;
            tAchieve.curnum = nNewScore.toString();
        }



    },

    setAchieveScore: function( strType, nScore)
    {
        var tAchieve = this.getAchieveByType(strType);

        if(!tAchieve)
        {
            return;
        }

        tAchieve.curnum = nScore.toString();
    },

//------------------------------------------------------------------------------------------------------------------
    ifComplete: function(strType)
    {
        var tAchieve = this.getAchieveByType(strType);
        if(tAchieve)
        {
            cc.log("achievementData ifComplete");
            cc.log("tAchieve.curnum: " + tAchieve.curnum);
            cc.log("tAchieve.maxnum: " + tAchieve.maxnum);
            return parseInt(tAchieve.curnum) >= parseInt(tAchieve.maxnum);
        }

        return false;

    },

//------------------------------------------------------------------------------------------------------------------
     uploadAchieveScore: function()
    {
        var tUpload = {};
        for( var value in this.getAchieveInfo())
        {
            var tElement = {}
            tElement.curnum = this.getAchieveInfo()[value].curnum;
            if(this.getAchieveInfo()[value].extra)
            {
                tElement.extra = this.getAchieveInfo()[value].extra;
            }

            tUpload[value] = tElement;
        }

        //不管上传成功不成功本地都加上
        if(!isHtml5)
        {
            cc.NodeSelf.getInstance().asyncUpdateAchievementList(tUpload,
                function(bResult, tInfo){
                    if(bResult)
                    {
                        cc.GUIAchievementData.getInstance().setAchieveInfo(tInfo);
                    }
            });
        }

    },

//------------------------------------------------------------------------------------------------------------------
    downloadAchieveInfo: function()
    {
        var self = this;
        var callBack = function(bResult, achievement)
        {
            cc.log("downloadAchieveInfo callback")
            cc.log("result: " + bResult);
            cc.log("achievement: " +  JSON.stringify(achievement));
            if(bResult)
            {
                self.setAchieveInfo(achievement);
            }
        }
        if(!isHtml5)
        {
            cc.NodeSelf.getInstance().asyncGetAchievementList(callBack);
        }

    }

});

cc.GUIAchievementData._instance = null;
cc.GUIAchievementData.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIAchievementData();
        this._instance.init();
    }

    return this._instance;
};