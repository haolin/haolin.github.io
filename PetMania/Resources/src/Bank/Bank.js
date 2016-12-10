//管理我的所有的钱

var Bank = cc.IObject.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        //
        this._super();

        //当前钻石值
        this._moneyDiamond = null;

        //消费记录
        this._moneyRecordKey = "_moneyRecordKey";
        this._moneyRecord = [];

        //载入标记
        this._loaded = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Bank";
    },

    //------------------------------------------------------------------------------------------------------------------
    //初始化 必须走
    init: function()
    {
        //钱
        this._moneyDiamond = cc.GameDataNumber.create("m_MoneyDiamond", 0, _DB_OP_GAME_ITEMS, Defines.MAX_NUMBER_DATA_VALUE);

        //兼容旧的版本
        this._moneyDiamondCost = cc.GameDataNumber.create("m_MoneyDiamondCost", 0, _DB_OP_GAME_ITEMS, Defines.MAX_NUMBER_DATA_VALUE);
        this._moneyDiamondIncome = cc.GameDataNumber.create("m_MoneyDiamondIncome", 0, _DB_OP_GAME_ITEMS, Defines.MAX_NUMBER_DATA_VALUE);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //我的DB
    getDB: function()
    {
        return _DB_OP_MONEY_RECORD;
    },

    //------------------------------------------------------------------------------------------------------------------
    //存储
    save: function()
    {
        //
        this._moneyDiamond.save();

        //
        var array1 = [];
        this._moneyRecord.forEach(
            function(record)
            {
                array1.push(record.serialize());
            }
        );

        this.getDB().save(this._moneyRecordKey, array1);

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //兼容旧版本
    _oldVersion: function()
    {
        //cc.log("_oldVersion _______________0");

        //兼容旧版本 消费
        var oldCost = this._moneyDiamondCost.get();
        if (oldCost > 0)
        {
            //cc.log("兼容旧版本 消费钻石 = " + oldCost);
            this._record(MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_DEFAULT, (-1 * oldCost), {});
            //cc.log("_oldVersion _______________1");
        }

        //兼容旧版本 赚钱
        //cc.log("_oldVersion _______________2");
        var oldIncome = this._moneyDiamondIncome.get();
        if (oldIncome > 0)
        {
            //cc.log("兼容旧版本 获得钻石 = " + oldIncome);
            this._record(MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_DEFAULT, oldIncome, {});
            //cc.log("_oldVersion _______________3");
        }

        //cc.log("_oldVersion _______________4");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //载入
    load: function()
    {
        var self = this;

        if (this._loaded)
        {
            return this;
        }

        //
        this._loaded = true;

        //载入
        this._moneyDiamond.load();
        this._moneyDiamondCost.load();
        this._moneyDiamondIncome.load();

        //
        this._oldVersion();

        //
        cc.log("消费记录载入_____________________________________________________________________");
        (this.getDB().load(this._moneyRecordKey) || []).forEach(
            function(json, index)
            {
                //
                self._moneyRecord.push(
                    MoneyRecord.createByDeserialize(json)
                );

                //
                cc.log(index + ":" + self._moneyRecord[self._moneyRecord.length - 1]);
                cc.log(index + ":" + self._moneyRecord[self._moneyRecord.length - 1].short());
            }
        );

        //test
        var test = true;
        if (test)
        {
            var value = 0;
            this._moneyRecord.forEach(
                function(a_record)
                {
                    value += a_record.getValue();
                }
            );

            //
            cc.log("读档测试 计算钱数 ＝ " + value);
            cc.log("读档测试 读档钱数 ＝ " + this.getMoney());
        }

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMoney: function()
    {
        return this._moneyDiamond.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    addMoney: function(addValue, source)
    {
        //
        this._moneyDiamond.add(addValue);
        this._moneyDiamond.save();

        //
        this._record(source, addValue, {});

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    canSpendMoney: function(spendValue)
    {
        return spendValue <= this.getMoney() && spendValue >= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    spendMoney: function(spendValue, source, params)
    {
        if (!this.canSpendMoney(spendValue, source))
        {
            return false;
        }

        //
        this._moneyDiamond.sub(spendValue);
        this._moneyDiamond.save();

        //
        this._record(source, -1 * spendValue, params);

        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    //添加了新的消费记录
    _record: function(source, value, params)
    {
        var newRecord = MoneyRecord.create(source, value, params);
        this._moneyRecord.push(newRecord);
        this.save();

        //
        cc.log("添加了新的消费记录 = " + newRecord);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //同步数据
    async: function()
    {
        cc.log("银行同步数据 目前是清除");
        this._moneyRecord = [];
        this.save();
        return this;
    }
});

//
Bank._instance = null;
Bank.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = (new Bank()).init().load();
    }

    return this._instance;
};
