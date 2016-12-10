
var ROULETTE_TYPE =
{
    MONS: 101,      /*转盘物品是小怪物*/
    ITEM: 102       /*转盘物品是道具*/
};

var ROULETTE_ROUND =
{
    "0" : {TYPE: ROULETTE_TYPE.MONS, STAR: 0},
    "1" : {TYPE: ROULETTE_TYPE.MONS, STAR: 1},
    "2" : {TYPE: ROULETTE_TYPE.MONS, STAR: 2},
    "3" : {TYPE: ROULETTE_TYPE.MONS, STAR: 3},
    "4" : {TYPE: ROULETTE_TYPE.ITEM, STAR: 4},
    "5" : {TYPE: ROULETTE_TYPE.MONS, STAR: 4},
    "6" : {TYPE: ROULETTE_TYPE.MONS, STAR: 5},
    "7" : {TYPE: ROULETTE_TYPE.MONS, STAR: 6},
    "8" : {TYPE: ROULETTE_TYPE.MONS, STAR: 7},
    "9" : {TYPE: ROULETTE_TYPE.ITEM, STAR: 8}
};

var ROULETTE_EVENT =
{
    BROADCAST: 101      /*好友广播改变*/
};

//======================================================================================================================
var RouletteModel = cc.IObject.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //局数
        this._round = 0;
        this._result = false;

        //赌码 倍数
        this._betBase = 0;
        this._betMult = 1;

        //物品
        this._referObjs = [];
        this._totalObjs = [];
        this._selectObj = null;

        //奖励
        this._bonusMult = 2;
        this._bonusRecord = [];

        //
        this._leastDiamond = 200;
        this._lossDiamond = 100000;

        //视图观察者
        this._observers = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "RouletteModel";
    },

    //------------------------------------------------------------------------------------------------------------------
    beginRound: function()
    {
        //TODO: 设置两种Round模型：Mons和Item

        //扣除赌码
        var bet = this.getBet();

        if (!cc.DataMng.getInstance().canSpendMoney(bet))
        {
            cc.log("RouletteModel Error: 不能支付赌码" + this);
            bet = cc.DataMng.getInstance().getMoney();
        }

        cc.DataMng.getInstance().spendMoney(bet);
        this._recordBonus(-1 * bet);

        //设置结果
        this._parseResult();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    endRound: function()
    {
        //设置奖励
        if (this._result)
        {
            var bonus = this._getBonus();
            cc.DataMng.getInstance().addMoney(bonus);
            this._recordBonus(bonus);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    nextRound: function()
    {
        //设置局数
        this._round++;
        var arrRound = Object.keys(ROULETTE_ROUND);
        if (this._round >= arrRound.length)
        {
            this._round = 0;
        }

        //重置数据
        this.resetRound(this._round);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    resetRound: function(round)
    {
        this._round = round;
        this._result = false;

        this._parseBetBase();
        this.setBetMult(1);

        this._referObjs = [];
        this._totalObjs = [];
        this._selectObj = null;
        this._parseObjs();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _parseResult: function()
    {
        this._result = Tools.arrayRandom([false, false, false, false, false, true, true, true, true, true]);
        return this._result;
    },

    //------------------------------------------------------------------------------------------------------------------
    _parseObjs: function()
    {
        //一局内不可重复设置物品
        if (this._referObjs.length > 0 || this._totalObjs.length > 0)
        {
            return this;
        }

        //
        var curType = this.getRouletteType();

        if (curType == ROULETTE_TYPE.ITEM)
        {
            this._parseItems();
        }
        else
        {
            this._parseMons();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _parseMons: function()
    {
        var colorArr = Tools.shuffle(_GetColorsArray());

        //
        this._referObjs = [];
        this._referObjs.push(colorArr[0]);
        this._referObjs.push(colorArr[1]);

        //
        this._totalObjs = [];
        for (var index = 0; index < ROULETTE_PIECES; index++)
        {
            var objColor = index < ROULETTE_PIECES/2 ? this._referObjs[0] : this._referObjs[1];
            this._totalObjs.push(objColor);
        }

        Tools.shuffle(this._totalObjs);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _parseItems: function()
    {
        var itemsArr = _GetItemsArr();

        //
        this._referObjs = [];

        //
        var self = this;

        //
        itemsArr.forEach(
            function(item)
            {
                self._totalObjs.push(item.ID);
            }
        );

        //
        var tempLength = ROULETTE_PIECES - this._totalObjs.length;
        for (var index = 0; index < tempLength; index++)
        {
            //未中奖
            this._totalObjs.push(-1);
        }

        Tools.shuffle(this._totalObjs);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parsePointTo: function()
    {
        var rightArr = [];
        var wrongArr = [];

        //
        var curType = this.getRouletteType();
        if (curType == ROULETTE_TYPE.ITEM)
        {
            var condition = function(select, compare)
            {
                return compare >= 0;
            }
        }
        else
        {
            condition = function(select, compare)
            {
                return select == compare;
            }
        }

        //
        var self = this;

        //
        this._totalObjs.forEach(
            function(each, index)
            {
                if (condition(self._selectObj, each))
                {
                    rightArr.push(index);
                }
                else
                {
                    wrongArr.push(index);
                }
            }
        );

        //
        var pointTo = -1;

        if (this._result)
        {
            pointTo = Tools.arrayRandom(rightArr);
        }
        else
        {
            pointTo = Tools.arrayRandom(wrongArr);
        }

        if (pointTo <= -1)
        {
            pointTo = 0;
            cc.log("RouletteModel Error: 转盘物品晒选错误" + this);
            cc.log("RouletteModel rightArr = " + rightArr);
            cc.log("RouletteModel wrongArr = " + wrongArr);
        }

        return pointTo;
    },

    //------------------------------------------------------------------------------------------------------------------
    getReferObjs: function()
    {
        return this._referObjs;
    },

    //------------------------------------------------------------------------------------------------------------------
    getTotalObjs: function()
    {
        return this._totalObjs;
    },

    //------------------------------------------------------------------------------------------------------------------
    //设置小怪物赌注的颜色
    setSelectObj: function(select)
    {
        var indexOf = this._totalObjs.indexOf(select);
        cc.Assert(indexOf >= 0, "转盘赌注设置错误");

        this._selectObj = select;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _parseBetBase: function()
    {
        var extents = [0, 1200, 2400, 6000, 13600, 25600, 51200, 100000, 200000, 400000, 800000, 1600000];
        var betBase = [50, 100,  200,  500,  1000,  2000,  5000,  10000,  20000,  40000,  80000,  200000];
        var diamond = cc.DataMng.getInstance().getMoney();

        for (var index = extents.length - 1; index >= 0; index--)
        {
            if (diamond > extents[index])
            {
                this._betBase = betBase[index];
                break;
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setBetMult: function(betMult)
    {
        if (betMult >= 1){
			cc.log("转盘加倍值设置错误！");
		}

        //
        var diamond = cc.DataMng.getInstance().getMoney();
        if (betMult * this._betBase > diamond)
        {
            return false;
        }

        //
        this._betMult = betMult;
        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    getBet: function()
    {
        return this._betBase * this._betMult;
    },

    //------------------------------------------------------------------------------------------------------------------
    _getBonus: function()
    {
        var bet = this.getBet();
        return this._bonusMult * bet;
    },

    //------------------------------------------------------------------------------------------------------------------
    _recordBonus: function(bonus)
    {
        this._bonusRecord.push(bonus);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //每局记录
    getRecordBonus: function()
    {
        return this._bonusRecord;
    },

    //------------------------------------------------------------------------------------------------------------------
    //此局物品是小怪物还是道具
    getRouletteType: function()
    {
        var roundDefine = ROULETTE_ROUND[this._round];
        return roundDefine.TYPE;
    },

    //------------------------------------------------------------------------------------------------------------------
    //此局要显示几颗星星
    getRouletteStar: function()
    {
        var roundDefine = ROULETTE_ROUND[this._round];
        return roundDefine.STAR;
    },

    //------------------------------------------------------------------------------------------------------------------
    //好友播报
    getBroadcast: function()
    {
        return [{photo: "", desc: ""}];
    },

    //------------------------------------------------------------------------------------------------------------------
    addObserver: function(window)
    {
        if (window instanceof cc.GUIWindow)
        {
            this._observers.push(window);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyObservers: function(event)
    {
        if (this._observers.length <= 0)
        {
            return this;
        }

        //
        var self = this;

        //
        this._observers.forEach(
            function(observer)
            {
                if (observer.isWindowOpen())
                {
                    observer.notifiedUpdate(self, event);
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return ""
            + "\n _round = " + this._round
            + "\n _result = " + this._result
            + "\n _betBase = " + this._betBase
            + "\n _betMult = " + this._betMult
            + "\n _bonusMult = " + this._bonusMult
            + "\n _bonusRecord = " + this._bonusRecord
            + "\n _referObjs = " + this._referObjs
            + "\n _totalObjs = " + this._totalObjs
            + "\n _selectObj = " + this._selectObj;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

RouletteModel._instance = null;
RouletteModel.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = (new RouletteModel()).init();
    }

    return this._instance;
};