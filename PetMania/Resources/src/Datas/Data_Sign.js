var SignType = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(prototype, params)
    {
        this._prototype = prototype;

        this._params = new safevar();
        this._params.setValue(params);
    },

    //------------------------------------------------------------------------------------------------------------------
    run: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getPrototype: function()
    {
        return this._prototype;
    },

    //------------------------------------------------------------------------------------------------------------------
    getParams: function()
    {
        return this._params.getValue();
    }
});

var SignType_Continue = SignType.extend({
    ctor: function(params)
    {
        this._super("CONTINUE", params);
    },

    run: function()
    {
        this._super();

        var params = this.getParams();
        cc.DataMng.getInstance().addGameContinueCount(params);
    }
});

var SignType_Money = SignType.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(params)
    {
        this._super("MONEY", params);
    },

    //------------------------------------------------------------------------------------------------------------------
    run: function()
    {
        this._super();

        //
        var params = this.getParams();
        cc.DataMng.getInstance().addMoney(params, MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_ATTANDANT);
        //BIMng.getBIDiamond().logDiamondIncome_SignIn(params);

        //
        cc.log("签到奖励 添加Diamond = " + params);
        return this;
    }
});

var SignType_Items = SignType.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(prototype, params)
    {
        this._super(prototype, params);

        //
        if (!Defines.GameItems[prototype.NAME])
        {
            cc.Assert(0);
        }
    },

    //------------------------------------------------------------------------------------------------------------------
    run: function()
    {
        this._super();

        //
        var params = this.getParams();
        cc.DataMng.getInstance().buyItemByID(this._prototype.ID, params, 0);

        //
        cc.log("签到奖励 添加道具 = " + this._prototype.NAME + ", " + params);
        return this;
    }
});


var Data_Sign = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.dailySignMoney = new safevar();
        this.dailySignMoney.setValue(100);
        this.dailySignBonus = [];
        this.signCount = null;
        this.currentContinueSignCount = null;
        this.maxContinueSignCount = null;
        this.serverSignedToday = false;
        this.serverError = true;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this.signCount = cc.GameDataNumber.create("signCount", 0, _DB_OP_GAME, Defines.MAX_NUMBER_DATA_VALUE);
        this.currentContinueSignCount = cc.GameDataNumber.create("currentContinueSignCount", 0, _DB_OP_GAME, Defines.SignCycle);
        this.maxContinueSignCount = cc.GameDataNumber.create("maxContinueSignCount", 0, _DB_OP_GAME, Defines.SignCycle);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this.signCount = null;
        this.currentContinueSignCount = null;
        this.maxContinueSignCount = null;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _getDateString: function()
    {
        var date = new Date();

        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        return year + "/" + month + "/" + day;
    },
    //------------------------------------------------------------------------------------------------------------------
    isServerError: function()
    {
        return this.serverError;
    },
    //------------------------------------------------------------------------------------------------------------------
    getSignCount: function()
    {
        return this.signCount.get();
    },

    getCurrentContinueSignCount: function()
    {
        return this.currentContinueSignCount.get();
    },

    getMaxContinueSignCount: function()
    {
        return this.maxContinueSignCount.get();
    },

    getSignInBonus: function()
    {
        return this.dailySignBonus;
    },

    getBonusFrameByIndex: function(indx)
    {
        var index = indx;
        if(!this.dailySignBonus[index])
        {
            return "";
        }
        var bonus = this.dailySignBonus[index][0];
        if(bonus instanceof SignType_Items)
        {
            var frame = bonus._prototype.SPRITESOURCE;
        }
        if(bonus instanceof SignType_Money)
        {
            var frame = "icon_diamond_0.png";
        }
        if(bonus instanceof SignType_Continue)
        {
            var frame = "icon_continue.png";
        }
        return frame;
    },

    isSignedToday: function()
    {
        return this.serverSignedToday;
    },

    updateDataAfterSignIn: function()
    {
        this.dailySignBonus[this.getCurrentContinueSignCount()].forEach(
            function(each)
            {
//                each.run();
            }
        );
        cc.DataMng.getInstance().addMoney(this.dailySignMoney.getValue(), MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_ATTANDANT);
        this.signCount.add(1);
        this.signCount.save();
        if(this.getCurrentContinueSignCount() > this.getMaxContinueSignCount())
        {
            this.maxContinueSignCount.add(1);
            this.maxContinueSignCount.save();
        }

        cc.NodeSelf.getInstance().LoginDailySignUp("kakao",
            function(isOk)
            {
                if(isOk)
                {
                    cc.log("send sign data to server success");
                }
                else
                {
                    cc.log("send sign data to server fail");
                }
            }
        );


    },
    //------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------
    load: function()
    {
        this.signCount.load();
        this.currentContinueSignCount.load();
        this.maxContinueSignCount.load();

        return this;
    },

    receiveBonusFromServer: function()
    {
        var self = this;
        cc.log("should receive Bonus from server");
        cc.NodeSelf.getInstance().asyncGetReward(
            function(isOk, signData, signReward)
            {
                cc.log("get sign data from server " + JSON.stringify(signData) + " and " + JSON.stringify(signReward));
                if(isOk)
                {
                    self.serverSignedToday = false;
                    var date = new Date();
                    var day = date.getDate();
                    self.signCount.set(signData.signCount);
                    self.signCount.save();
                    if(signData.monthDay == null)
                    {
                        self.currentContinueSignCount.set(0);
                        self.currentContinueSignCount.save();
                    }
                    else if(signData.monthDay.length == 0)
                    {
                        self.currentContinueSignCount.set(0);
                        self.currentContinueSignCount.save();
                    }
                    else
                    {
                        self.currentContinueSignCount.set(signData.monthDay.length);
                        self.currentContinueSignCount.save();
                    }
                    if(signData.monthDay != null && signData.monthDay[signData.monthDay.length - 1] == day)
                    {
                        cc.log("get data from server signed already");
                        self.serverSignedToday = true;
                    }
                    var index = 0;
                    for(var each in signReward)
                    {
                        var data = signReward[each];
                        cc.log("get sign data from server data is " + JSON.stringify(data) +" index is" + index);
                        if(index>= 28)
                        {
                            cc.log("get sign data from server data out of ");
                            return;
                        }
                        if(data.rewardid == 101)
                        {
                            var signItem = new SignType_Money(data.count);
                        }
                        else if(data.rewardid == 29)
                        {
                            var signItem = new SignType_Continue(data.count);
                        }
                        else if(data.rewardid == 24)
                        {
                            var signItem = new SignType_Money(data.count);
                        }
                        else
                        {
//                            cc.log("get sign data from server data is " + data.rewardid.toString());
//                            cc.log("get sign data from server data is " + ServerItemTypes[data.rewardid.toString()]);
//                            cc.log("get sign data from server data is " + ServerItemTypes[data.rewardid.toString()].GameItem);
                            var signItem = new SignType_Items(ServerItemTypes[data.rewardid.toString()].GameItem, data.count);
                        }
                        self.register(index, signItem);
                        index++;
						 if(index >=27)
                    	{
                        	self.serverError = false;
                    	}
                    }
                   
                }
                else
                {
                    self.serverError = ture;
                }
            }
        );
    },
    register: function(day, signType)
    {
        cc.log("register msg " + day + signType.toString());
        if (!this.dailySignBonus[day])
        {
            this.dailySignBonus[day] = [];
        }
        this.dailySignBonus[day].push(signType);
        return this;
    }

});

//
Data_Sign.create = function()
{
    var createNew = new Data_Sign();
    if (createNew)
    {
        createNew.init();
    }
/*
    createNew.register(0, new SignType_Money(100));
    createNew.register(1, new SignType_Items(Defines.GameItems.ITEM_COLORFUL_EX, 1));//同色消
    createNew.register(2, new SignType_Items(Defines.GameItems.ITEM_DIRECTION_EX, 1));//纵横消
    createNew.register(3, new SignType_Items(Defines.GameItems.ITEM_WARP_EX, 1));//爆炸消
    createNew.register(4, new SignType_Items(Defines.GameItems.ITEM_TIME, 1));//时间轮盘
    createNew.register(5, new SignType_Items(Defines.GameItems.ITEM_STAINING, 1));//染色剂
    createNew.register(6, new SignType_Items(Defines.GameItems.ITEM_STORM, 1));//大风暴
    createNew.register(7, new SignType_Items(Defines.GameItems.ITEM_TRANSPOSITION, 1));//瞬间移动
    createNew.register(8, new SignType_Items(Defines.GameItems.ITEM_GOLDEN_KEY, 1));//火流星
    createNew.register(9, new SignType_Continue(1));
    createNew.register(10, new SignType_Money(100));
    createNew.register(11, new SignType_Items(Defines.GameItems.ITEM_COLORFUL_EX, 1));//同色消
    createNew.register(12, new SignType_Items(Defines.GameItems.ITEM_DIRECTION_EX, 1));//纵横消
    createNew.register(13, new SignType_Items(Defines.GameItems.ITEM_WARP_EX, 1));//爆炸消
    createNew.register(14, new SignType_Items(Defines.GameItems.ITEM_TIME, 1));//时间轮盘
    createNew.register(15, new SignType_Items(Defines.GameItems.ITEM_STAINING, 1));//染色剂
    createNew.register(16, new SignType_Items(Defines.GameItems.ITEM_STORM, 1));//大风暴
    createNew.register(17, new SignType_Items(Defines.GameItems.ITEM_TRANSPOSITION, 1));//瞬间移动
    createNew.register(18, new SignType_Items(Defines.GameItems.ITEM_GOLDEN_KEY, 1));//火流星
    createNew.register(19, new SignType_Continue(1));
    createNew.register(20, new SignType_Money(100));
    createNew.register(21, new SignType_Items(Defines.GameItems.ITEM_COLORFUL_EX, 1));//同色消
    createNew.register(22, new SignType_Items(Defines.GameItems.ITEM_DIRECTION_EX, 1));//纵横消
    createNew.register(23, new SignType_Items(Defines.GameItems.ITEM_WARP_EX, 1));//爆炸消
    createNew.register(24, new SignType_Items(Defines.GameItems.ITEM_TIME, 1));//时间轮盘
    createNew.register(25, new SignType_Items(Defines.GameItems.ITEM_STAINING, 1));//染色剂
    createNew.register(26, new SignType_Items(Defines.GameItems.ITEM_STORM, 1));//大风暴
    createNew.register(27, new SignType_Items(Defines.GameItems.ITEM_TRANSPOSITION, 1));//瞬间移动
*/
    return createNew;
};