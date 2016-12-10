//创造交换命令的逻辑
//----------------------------------------------------------------------------------------------------------------------
var _Colorful_Colorful = function(srcRule, dstRule)
{
    //
    return cc.Cmd_DesMonsColorfulWithColorful.create(
        srcRule.getSrcObj(),
        dstRule.getSrcObj());
};

//----------------------------------------------------------------------------------------------------------------------
var _Colorful_Direction = function(srcRule, dstRule)
{
    return cc.Cmd_DesMonsColorfulWithDirection.create(srcRule.getSrcObj(), dstRule.getSrcObj());
};

//----------------------------------------------------------------------------------------------------------------------
var _Colorful_Wrap = function(srcRule, dstRule)
{
    return cc.Cmd_DesMonsColorfulWithWrap.create(srcRule.getSrcObj(), dstRule.getSrcObj());
};

//----------------------------------------------------------------------------------------------------------------------
var _Wrap_Wrap = function(srcRule, dstRule)
{
    return cc.Cmd_DesMonsWrapWithWrap.create(srcRule.getSrcObj(), dstRule.getSrcObj());
};

//----------------------------------------------------------------------------------------------------------------------
var _Wrap_Direction = function(srcRule, dstRule)
{
    return cc.Cmd_DesMonsWrapWithDirection.create(srcRule.getSrcObj(), dstRule.getSrcObj());
};

//----------------------------------------------------------------------------------------------------------------------
var _Direction_Direction = function(srcRule, dstRule)
{
    return cc.Cmd_DesMonsDirectionWithDirection.create(srcRule.getSrcObj(), dstRule.getSrcObj());
};

//----------------------------------------------------------------------------------------------------------------------
var _Monster_Monster = function(srcRule, dstRule)
{
    var buildRules = [];

    if (srcRule.can())
    {
        buildRules.push(srcRule);
    }

    if (dstRule.can())
    {
        buildRules.push(dstRule);
    }

    return cc.Cmd_EveryDestroy.create(buildRules);
};

//----------------------------------------------------------------------------------------------------------------------
var _Flower = function(srcRule, dstRule)
{
    var buildRules = [];

    if (srcRule.can())
    {
        buildRules.push(srcRule);
    }

    if (dstRule.can())
    {
        buildRules.push(dstRule);
    }

    return cc.Cmd_EveryDestroy.create(buildRules);
};

//======================================================================================================================
cc.ToucnSwapCommandMng = cc.Class.extend({

    //函数队列
    m_CreateCommandFuncs: [],

    //------------------------------------------------------------------------------------------------------------------
    createCommand: function(srcRule, dstRule)
    {
        if (!srcRule || !dstRule)
        {
            return null;
        }

        //
        if (srcRule.getSrcObj() instanceof cc.Obj_Flower || dstRule.getSrcObj() instanceof cc.Obj_Flower)
        {
            return _Flower(srcRule, dstRule);
        }

        //
        var srcName = srcRule.getSrcObj().description();
        var dstName = dstRule.getSrcObj().description();

        for (var indx = 0; indx < this.m_CreateCommandFuncs.length; ++indx)
        {
            var data = this.m_CreateCommandFuncs[indx];

            if (data.srcName == srcName
                && data.dstName == dstName)
            {
                return data.func(srcRule, dstRule);
            }
        }

        return _Monster_Monster(srcRule, dstRule);
    },

    //------------------------------------------------------------------------------------------------------------------
    //注册一个处理函数
    //_srcName, _dstName 交换的2个
    //func 处理函数
    //reverseOk 反着是不是成立
    registerFunc: function(_srcName, _dstName, _func, reverseOk)
    {
        this.m_CreateCommandFuncs.push(
            {srcName: _srcName, dstName: _dstName, func: _func}
        );

        if (reverseOk && _srcName != _dstName)
        {
            this.m_CreateCommandFuncs.push(
                {srcName: _dstName, dstName: _srcName, func: _func}
            );
        }

        return this;
    }

});

//单件模式
cc.ToucnSwapCommandMng._instance = null;
cc.ToucnSwapCommandMng.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.ToucnSwapCommandMng();
        this.registerAll();
    }

    return this._instance;
};

//第一次注册
cc.ToucnSwapCommandMng.registerAll = function()
{
    if (!this._instance)
    {
        return this;
    }

    //反着是不是也成立?
    var reverseOk = true;

    //
    this._instance.registerFunc("Obj_Monster", "Obj_Monster", _Monster_Monster);
    this._instance.registerFunc("Obj_Monster", "Obj_MonsterDirection", _Monster_Monster, reverseOk);
    this._instance.registerFunc("Obj_Monster", "Obj_MonsterColorful", _Monster_Monster, reverseOk);
    this._instance.registerFunc("Obj_Monster", "Obj_MonsterWrap", _Monster_Monster, reverseOk);

    //
    this._instance.registerFunc("Obj_MonsterColorful", "Obj_MonsterColorful", _Colorful_Colorful);

    this._instance.registerFunc("Obj_MonsterColorful", "Obj_MonsterDirection", _Colorful_Direction, reverseOk);


    this._instance.registerFunc("Obj_MonsterColorful", "Obj_MonsterWrap", _Colorful_Wrap, reverseOk);

    this._instance.registerFunc("Obj_MonsterWrap", "Obj_MonsterWrap", _Wrap_Wrap);
    this._instance.registerFunc("Obj_MonsterWrap", "Obj_MonsterDirection", _Wrap_Direction, reverseOk);

    this._instance.registerFunc("Obj_MonsterDirection", "Obj_MonsterDirection", _Direction_Direction);

    //
    this._instance.registerFunc("Obj_Bomb", "Obj_Bomb", _Monster_Monster);
    this._instance.registerFunc("Obj_Bomb", "Obj_Monster", _Monster_Monster, reverseOk);
    this._instance.registerFunc("Obj_Bomb", "Obj_MonsterDirection", _Monster_Monster, reverseOk);
    this._instance.registerFunc("Obj_Bomb", "Obj_MonsterColorful", _Monster_Monster, reverseOk);
    this._instance.registerFunc("Obj_Bomb", "Obj_MonsterWrap", _Monster_Monster, reverseOk);

    //
    this._instance.registerFunc("Obj_MonsterAddTime", "Obj_MonsterAddTime", _Monster_Monster);
    this._instance.registerFunc("Obj_MonsterAddTime", "Obj_Monster", _Monster_Monster, reverseOk);
    this._instance.registerFunc("Obj_MonsterAddTime", "Obj_MonsterDirection", _Monster_Monster, reverseOk);
    this._instance.registerFunc("Obj_MonsterAddTime", "Obj_MonsterColorful", _Monster_Monster, reverseOk);
    this._instance.registerFunc("Obj_MonsterAddTime", "Obj_MonsterWrap", _Monster_Monster, reverseOk);

    //
    this._instance.registerFunc("Obj_Bomb", "Obj_MonsterAddTime", _Monster_Monster, reverseOk);


    //
    return this;
};


