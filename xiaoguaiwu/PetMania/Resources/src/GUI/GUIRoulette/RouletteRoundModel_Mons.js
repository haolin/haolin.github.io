
//======================================================================================================================
var RouletteRoundModel_Base = cc.IObject.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "RouletteRoundModel_Base";
    },

    //------------------------------------------------------------------------------------------------------------------
    beginRound: function()
    {
        //TODO: 设置两种Round模型：Mons和Item

        //扣除赌码
        var bet = this.getBet();

        if (!cc.DataMng.getInstance().canSpendMoney(bet))
        {
            cc.log("RouletteRoundModel_Base Error: 不能支付赌码" + this);
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
    parseObjs: function()
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
            cc.log("RouletteRoundModel_Base Error: 转盘物品晒选错误" + this);
            cc.log("RouletteRoundModel_Base rightArr = " + rightArr);
            cc.log("RouletteRoundModel_Base wrongArr = " + wrongArr);
        }

        return pointTo;
    }

    //------------------------------------------------------------------------------------------------------------------
});

RouletteRoundModel_Base.create = function()
{
    return (new RouletteRoundModel_Base()).init();
};