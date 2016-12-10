//游戏提示 如果找不到可以提示的 就进入洗牌阶段

var Cmd_SubPrompt = cc.ICommand.extend({

    //==================================================================================================================
    ctor: function(promptMonsters, idleMonsters, time, delayTime)
    {
        this._promptMonsters = promptMonsters;
        this._idleMonsters = idleMonsters;
        this._time = time || 1;
        this.delayTime = delayTime || 0;
        this.dirtyMap = {};
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        for (var indx = 0; indx < this._promptMonsters.length; ++indx)
        {
            for (var indx1 = 0; indx1 < this._idleMonsters.length; ++indx1)
            {
                if (this._promptMonsters[indx] == this._idleMonsters[indx1])
                {
                    cc.Assert(0, "this._promptMonsters = " + this._promptMonsters[indx]);
                }
            }
        }

        //
        this.prompt(this._promptMonsters);
        this.idle(this._idleMonsters);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    prompt: function(monsters)
    {
        ////cc.log("\n prompt = " + monsters);

        var self = this;

        //
        monsters.forEach(
            function (each)
            {
                //
                self.dirtyMap[each.getObjectID()] = true;

                if (cc.ArmatureDataMng.getInstance().promptArmature(each))
                {
                    each.getSprite().setVisible(false);
                }
                else
                {
                    var scale = (each instanceof cc.Obj_Flower) ? 1.3 : 1.2;
                    var scaleAction = cc.Sequence.create(
                        cc.ScaleTo.create(0.5, scale, scale),
                        cc.ScaleTo.create(0.5, 1, 1),
                        cc.ScaleTo.create(0.5, scale, scale),
                        cc.ScaleTo.create(0.5, 1, 1),
                        cc.ScaleTo.create(0.5, scale, scale),
                        cc.ScaleTo.create(0.5, 1, 1)
                    );

                    scaleAction.setTag(Defines.GLOBAL_ACTION_TAGS.ACT_TAG_PROMPT);
                    each.getSprite().runAction(scaleAction);
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    idle: function(monsters)
    {
        //cc.log("\n idle = " + monsters);

        var self = this;

        monsters.forEach(
            function (each)
            {
                if (self.dirtyMap[each.getObjectID()])
                {
                    //cc.log("\n");//cc.log("\n");
                    //cc.log("**************************** each = " + each);
                    cc.Assert(0, "1");
                }

                if (cc.ArmatureDataMng.getInstance().idleArmature(each))
                {
                    each.getSprite().setVisible(false);
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        this._super(gameLevel);

        //
        var stopFunc = function(each)
        {
            //cc.log("stop finish" + each);

            cc.ArmatureDataMng.getInstance().stopArmature(each);
            var sp = each.getSprite();
            if (sp)
            {
                sp.setVisible(true);
                sp.stopActionByTag(Defines.GLOBAL_ACTION_TAGS.ACT_TAG_PROMPT);
                sp.setScaleX(1.0);
                sp.setScaleY(1.0);
            }
        };

        //
        this._promptMonsters.forEach(stopFunc);
        this._idleMonsters.forEach(stopFunc);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        if (this.delayTime > 0)
        {
            this.delayTime -= time;
            return false;
        }

        this._super(gameLevel, time);

        this._time -= time;
        return this._time <= 0;
    }
});

//======================================================================================================================
cc.Cmd_Prompt = cc.ICommandGroup.extend({

    ctor: function(firstDelayTime)
    {
        this._super();

        //
        this._firstDelayTime = firstDelayTime;
        this.m_AllCanTouchMonsters = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "Cmd_Prompt";
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //cc.log("Cmd_Prompt start");

        //
        var itr = gameLevel.getTable().createIterForTouchEnabledObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var mons = itr.getCurrent();
            if (mons && mons.getDestroyRule())
            {
                this.m_AllCanTouchMonsters.push(mons);
            }
        }

        //
        this.check(this._firstDelayTime);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    check: function(delayTime)
    {
        //cc.log("\n check = ********************************************");

        //
        Tools.shuffle(this.m_AllCanTouchMonsters);

        //
        var prompts = [];
        var idles = [];
        var dirtyMap = {};

        //
        var groups = [];
        for (var index = 0; index < this.m_AllCanTouchMonsters.length; ++index)
        {
            var mons = this.m_AllCanTouchMonsters[index];

            //
            var rule = mons.getDestroyRule();
            var supposeRes = rule.suppose();
            if (supposeRes.length > 0)
            {
                supposeRes.forEach(
                    function(a_group)
                    {
                        a_group.push(rule.getSrcObj());
                        groups.push(a_group);
                    }
                );

                break;
            }
        }

        if (groups.length <= 0)
        {
            return this;
        }

        //
        prompts = Tools.arrayRandom(groups);
        prompts.forEach(
            function(mons)
            {
                dirtyMap[mons.getObjectID()] = true;
            }
        );

        //
        var idleMax = this.m_AllCanTouchMonsters.length/3;
        for (var index1 = 0; index1 < this.m_AllCanTouchMonsters.length; ++index1)
        {
            if (idles.length >= idleMax)
            {
                break;
            }

            var mons1 = this.m_AllCanTouchMonsters[index1];
            if (!dirtyMap[mons1.getObjectID()])
            {
                idles.push(mons1);
            }
        }

        if (prompts.length > 0)
        {
            this.addCommand(new Cmd_SubPrompt(prompts, idles, 3, delayTime));
        }

        //cc.log("prompts = " + prompts);
        //cc.log("idles = " + idles);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        this.m_Commands.forEach(
            function(cmd)
            {
                cmd.finish(gameLevel)
            }
        );

        this.m_Commands = [];
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    any: function()
    {
        return this.m_Commands.length > 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        //this._super(gameLevel, time);

        if (!this.isStart())
        {
            this.start(gameLevel);
        }

        //
        if (!this.any())
        {
            if(cc.Cmd_Shuffle.isPlanned())
            {
                gameLevel.addCommand(cc.Cmd_ShuffleEx.create());
            }
            else
            {
                gameLevel.addCommand(cc.Cmd_Shuffle.create());
            }

            return true;
        }

        //将洗牌逻辑改回到0
        cc.Cmd_Shuffle.setRandomType();

        if (this.m_Commands.length > 0)
        {
            if (this.m_Commands[0].command(gameLevel, time))
            {
                this.m_Commands[0].finish(gameLevel);
                this.m_Commands.shift();
            }
        }

        if (this.m_Commands.length <= 0)
        {
            this.check(0);
        }

        //一直执行
        return false;
    }
});

cc.Cmd_Prompt.create = function(firstDelayTime)
{
    return new cc.Cmd_Prompt(firstDelayTime);
};


cc.Cmd_Prompt.any = function(gameLevel)
{
    return cc.Cmd_Prompt.create(0).start(gameLevel).any();
};







