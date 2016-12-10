/**
 * 登录1天可免费开1张卡片，连续登录2、3天2张，4-6天3张，第7天开始每天5张，一旦中断则从第1天重新开始。右侧用进度条表示当前的连续登录时间和可抽取的卡数。
 * 界面中有9张倒扣的卡片，直接点击一张卡片进行抽奖，点击后卡片翻开，配有持续光效，显示其内容。
 * 继续点击直到用尽今日的数量，剩下未翻开的卡片翻开，显示其中内容后全部消失，只剩下今天得到的奖励，持续2秒后本界面自动左右离开。
 * 9件奖品的搭配：不同数量的钻石（5、10、15、20、25、30、35、40）随机出6种，体力1、2、3点随机出1种，道具随机出1种。
 */

var Data_Daily = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        //上一次日常登陆的时间
        this.m_DailyLast = null;

        //连续登陆的天数记录
        this.m_DailyContinue = null;

        //卡片数量
        this.m_DailyCards = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        //初始化3个数据
        this.m_DailyLast = cc.GameDataTime.create("m_DailyLast", 0, _DB_OP_GAME);
        this.m_DailyContinue = cc.GameDataNumber.create("m_DailyContinue", 0, _DB_OP_GAME, Defines.MAX_NUMBER_DATA_VALUE);
        this.m_DailyCards = cc.GameDataNumber.create("m_DailyCards", 0, _DB_OP_GAME, Defines.MAX_NUMBER_DATA_VALUE);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this.m_DailyLast.set(0);
        this.m_DailyContinue.set(0);
        this.m_DailyCards.set(0);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    immeSave: function()
    {
        //临时测试用
        cc.log("immeSave 只有网页才存一下");
        if (!Defines.PLATFORM.isMobile())
        {
        //    _DB_OP_GAME.toDB();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //获得m_DailyLast 实际值
    getDailyLast: function()
    {
        return this.m_DailyLast.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    //设置位当前时间
    saveDailyLast: function()
    {
        this.m_DailyLast.set(_LocalTime());
        this.m_DailyLast.save();
        this.immeSave();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //添加连续登陆的次数
    addDailyContinue: function()
    {
        //
        this.m_DailyContinue.add(1);
        this.m_DailyContinue.save();

        //更新卡片数量
        var addValue = this.parseAddCards(this.m_DailyContinue.get());
        if (addValue > 0)
        {
            //不累积 就是直接设置值
            this.m_DailyCards.set(addValue);
            this.m_DailyCards.save();
        }

        this.immeSave();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //清空连续登陆
    cleanDailyContinue: function()
    {
        this.m_DailyContinue.set(0);
        this.m_DailyContinue.save();
        this.m_DailyCards.set(0);
        this.m_DailyCards.save();
        this.immeSave();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //清空连续登陆
    resetDailyContinueToFirst: function()
    {
//        if (Defines._IsSpringFestival())
//        {
//            this.m_DailyCards.set(5);
//            this.m_DailyCards.save();
//        }
//        else
//        {
//            //
            this.m_DailyContinue.set(1);
            this.m_DailyContinue.save();

            //
            this.m_DailyCards.set(1);
            this.m_DailyCards.save();
//        }

        //
        this.immeSave();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getDailyContinue: function()
    {
        return this.m_DailyContinue.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    getDailyCards: function()
    {
        return this.m_DailyCards.get();
    },

    //------------------------------------------------------------------------------------------------------------------
    useDailyCards: function(count)
    {
        this.m_DailyCards.sub(count);
        this.m_DailyCards.save();
        this.immeSave();
        return this.getDailyCards();
    },

    //------------------------------------------------------------------------------------------------------------------
    //规则
    parseAddCards: function(curValue)
    {
        //登录1天可免费开1张卡片，连续登录2、3天2张，4-6天3张，第7天开始每天5张，一旦中断则从第1天重新开始。
        // 右侧用进度条表示当前的连续登录时间和可抽取的卡数。
        if (curValue == 1)
        {
            return 1;
        }

        if (curValue >= 2 && curValue <= 3)
        {
            return 2;
        }

        if (curValue >= 4 && curValue <= 6)
        {
            return 3;
        }

        if (curValue >= 7)
        {
            return 5;
        }

        return 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    //第一次登陆游戏的处理
    first: function()
    {
        this.addDailyContinue();
        this.saveDailyLast();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //核心执行
    dailyStart: function()
    {
        var last = this.getDailyLast();
        if (last <= 0)
        {
            //第一次记录
            this.first();
        }
        else
        {
            //
            var nowTime = _LocalTime();
            var lastDayEnd = Tools.getDayEnd(last);
            if (nowTime > lastDayEnd)
            {
                //登录1天可免费开1张卡片，连续登录2、3天2张，4-6天3张，第7天开始每天5张，一旦中断则从第1天重新开始。
                if (nowTime <= lastDayEnd + Tools.oneDay())
                {
                    this.addDailyContinue();
                }
                else
                {
                    this.resetDailyContinueToFirst();
                }

                this.saveDailyLast();
            }
            else
            {
                cc.log("每日奖励检查时间，小于一天，不做处理");
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    save: function()
    {
        this.m_DailyLast.save();
        this.m_DailyContinue.save();
        this.m_DailyCards.save();

        this.immeSave();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    load: function()
    {
        //cc.log("Data_Daily load Data_Daily load Data_Daily load ");

        this.m_DailyLast.load();
        this.m_DailyContinue.load();
        this.m_DailyCards.load();

        cc.log("日常奖励的log =====================================================================================");
        cc.log("" + this.logTimeNow());
        cc.log("=====================================================================================");
        cc.log("" + this);
        cc.log("=====================================================================================");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    logTimeNow: function()
    {
        var nowTime = _LocalTime();
        return " now = " + new Date(nowTime).toLocaleString()
            + " dayBegin = " + (new Date(Tools.getDayBegin(nowTime))).toLocaleString()
            + " dayEnd = " + (new Date(Tools.getDayEnd(nowTime))).toLocaleString();
    },

    //------------------------------------------------------------------------------------------------------------------
    logLastTime: function()
    {
        var lastTime = this.getDailyLast();
        if (lastTime <= 0)
        {
            return "";
        }

        //
        return " last_now = " + new Date(lastTime).toLocaleString()
        + " last_dayBegin = " + (new Date(Tools.getDayBegin(lastTime))).toLocaleString()
        + " last_dayEnd = " + (new Date(Tools.getDayEnd(lastTime))).toLocaleString();
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "Data_Daily: m_DailyContinue = "
            + this.m_DailyContinue.get()
            + " m_DailyCards = " + this.m_DailyCards.get()
            + this.logLastTime();
    }
});

//
Data_Daily.create = function()
{
    var createNew = new Data_Daily();
    if (createNew)
    {
        createNew.init();
    }

    return createNew;
};