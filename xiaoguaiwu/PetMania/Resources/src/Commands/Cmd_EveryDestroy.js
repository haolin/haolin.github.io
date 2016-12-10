//游戏有对象消除之后 进行检查 通知剩余的坠落

//======================================================================================================================
cc.Cmd_EveryDestroy = cc.ICommandGroup.extend({

    ctor: function(firstBuildRules)
    {
        this._super();

        //全部的规则
        this.m_AllRules = [];
        if (firstBuildRules && firstBuildRules instanceof Array && firstBuildRules.length > 0)
        {
            //第一次构造!!!!!
            this.m_AllRules = this.m_AllRules.concat(firstBuildRules);
        }

        //
        this.m_HeighDesRules = []; //高级规则
        this.m_LowDesRules = [];  //低级规则

        //是否摧毁了任何东西
        this.m_IsDestroyAny = false;

        //延迟爆炸的控制
        this.m_DelayTime = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "Cmd_EveryDestroy";
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);
        this.restart(gameLevel, true);  //核心执行
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        if (!this.isStart())
        {
            this.start(gameLevel);
        }

        if (this.m_DelayTime > 0)
        {
            this.m_DelayTime -=time;
            return false;
        }

        if (this.m_Commands.length > 0)
        {
            if (!this.m_IsDestroyAny)
            {
                this.m_IsDestroyAny = true;
            }

            if (this.m_Commands[0].command(gameLevel, time))
            {
                this.m_Commands[0].finish(gameLevel);
                this.m_Commands.shift();
            }
        }

        if (this.m_Commands.length <= 0)
        {
            //没有命令了 就再次执行
            this.restart(gameLevel, null);
        }

        return this.m_Commands.length <= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    _sortAllRules: function()
    {
        //重新加载  m_HeighDesRules m_LowDesRules
        var self = this;

        this.m_HeighDesRules = [];
        this.m_LowDesRules = [];


        /* old
         //将所有合法规则 按着 sortFunc 排列一下
        self.m_AllRules.sort(
            function(left, right)
            {
                return (left.isCreatorRule() || left.getSrcObj().getFireTime() < right.getSrcObj().getFireTime()) ? -1 : 1;
            }
        );
        */

        //
        var createRules = [];
        var specRules = [];

        //
        this.m_AllRules.forEach(
            function(rule)
            {
                if (rule.isCreatorRule())
                {
                    createRules.push(rule);
                }
                else if (rule.isSpecHeighRule())
                {
                    specRules.push(rule);
                }
                else
                {
                    self.m_LowDesRules.push(rule);
                }
            }
        );

        //
        createRules.sort(
            function(left, right)
            {
                return left.getObjects().length > right.getObjects().length ? -1 : 1;
            }
        );

        //
        specRules.sort(
            function(left, right)
            {
                return left.getSrcObj().getFireTime() < right.getSrcObj().getFireTime() ? -1 : 1;
            }
        );

        //
        this.m_HeighDesRules = this.m_HeighDesRules.concat(createRules).concat(specRules);

        /*
        this.m_AllRules.forEach(
            function(x)
            {
                if (x.isCreatorRule() || x.isSpecHeighRule())
                {
                    self.m_HeighDesRules.push(x);
                }
                else
                {
                    self.m_LowDesRules.push(x);
                }
            }
        );*/

        //最后清除了 不用了
        this.m_AllRules = [];
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _handleHeighRules: function()
    {
        if (this.m_HeighDesRules.length <= 0)
        {
            return false;
        }

        var self = this;
        var highDestroy = false;

        //优先处理高级规则
        var handleRule = null;

        //在高优先级里 优先找点燃的
        for (var indx = 0; indx < self.m_HeighDesRules.length; ++indx)
        {
            var rule = self.m_HeighDesRules[indx];

            //
            var isObjectFire = rule.getSrcObj().isFire();
            var isCreatorRule = rule.isCreatorRule();

            //
            if (isObjectFire || isCreatorRule)
            {
                //点燃的对象或者创建型的规则就优先执行
                handleRule = rule;
                break;
            }
        }

        if (!handleRule)
        {
            //没有点燃的就用第一个
            //或者没有创造的
            handleRule = self.m_HeighDesRules.shift();
        }

        if (handleRule.can())
        {
            //添加摧毁命令
            var cmd = handleRule.createCommand();
            if (cmd)
            {
                highDestroy = true;

                self.addCommand(cmd);
                cc.DataMng.getInstance().continuousDestroy();
            }
        }

        return highDestroy;
    },

    //------------------------------------------------------------------------------------------------------------------
    _handleDestroy: function(gameLevel)
    {
        if (this.m_HeighDesRules.length + this.m_LowDesRules.length <= 0)
        {
            return this;
        }

        var highDestroy = this._handleHeighRules(gameLevel);
        if (!highDestroy)
        {
            //高级命令没有消除 就清除普通的
            this.addDesNormalCommand(gameLevel);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    restart: function(gameLevel, first)
    {
        //构建合法规则
        if (this.m_AllRules.length <= 0)
        {
            this._buildRules(gameLevel, first);
        }

        //step2:
        this._sortAllRules();

        //step3
        this._handleDestroy(gameLevel);

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        if (this.m_IsDestroyAny)
        {
            //如果摧毁了任何东西  默认就添加一个下落
            gameLevel.addCommand(cc.Cmd_EveryMoveNext.create());
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //获得所有可删除对象的 删除规则
    _buildRules: function(gameLevel, first)
    {
        this.m_AllRules = [];

        var itr = gameLevel.getTable().createIterForMiddleObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var moveObj = itr.getCurrent();
            if (!moveObj)
            {
                continue;
            }

            //压入规则
            var rule = moveObj.getDestroyRule();
            if (rule && rule.parse(gameLevel).can())
            {
                this.m_AllRules.push(rule);

                //
                if (first && rule instanceof cc.DestroyRule_MonsterUnwrap)
                {
                    this.m_DelayTime = 0.2;
                }
            }
        }

        return this.m_AllRules;
    },

    //------------------------------------------------------------------------------------------------------------------
    //添加一个 Cmd_DesMonsters 一次性消除所有普通的
    addDesNormalCommand: function(gameLevel)
    {
        //只处理低优先级级别的消除
        if (this.m_LowDesRules.length <= 0)
        {
            return this;
        }

        //最终消除的
        var desObjsNeedCleanGrab = [];
        var desObjsGroup = [];
        var dirty = {};

        //开始遍历
        this.m_LowDesRules.forEach(
            function(rule)
            {
                //需要把 爆炸源rule.getSrcObj() 加上
                var desArr = [].concat(rule.getSrcObj(), rule.getObjects()).filter(
                    function(x)
                    {
                        //只要没有标记的
                        return x.getParentNode() && !dirty[x.getObjectID()];
                    }
                );

                if (desArr.length > 0)
                {
                    //上标记
                    desArr.forEach(
                        function(each)
                        {
                            //开始执行精灵的效果
                            dirty[each.getObjectID()] = true
                        }
                    );

                    //新的 加入  desObjsNeedCleanGrab
                    desObjsNeedCleanGrab = desObjsNeedCleanGrab.concat(desArr);
                    desObjsGroup.push(
                        cc.Cmd_DesMonstersGroups.createGroup(rule.getSrcObj(), rule.getObjects())
                    );
                }
            }
        );

        //开放出去
        this.addNormalDesCommand(gameLevel, desObjsNeedCleanGrab, desObjsGroup);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addNormalDesCommand: function(gameLevel, allDesObjs, allDesObjsByGroup)
    {
        if (allDesObjsByGroup.length > 0)
        {
            this.addCommand(cc.Cmd_DesMonstersGroups.create(allDesObjsByGroup));
        }

        return this;
    }
});

//工厂方法
cc.Cmd_EveryDestroy.create = function(firstBuildRules)
{
    return new cc.Cmd_EveryDestroy(firstBuildRules);
};
