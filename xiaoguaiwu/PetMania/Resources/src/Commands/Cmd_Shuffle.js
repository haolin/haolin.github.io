//洗牌动作

//======================================================================================================================
cc.Cmd_ShuffleJump = cc.ICommand.extend({

    ctor: function(object, grid)
    {
        this._super();

        //
        this.object = object;
        this.grid = grid;
        this.isFinish = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        var self = this;

        cc.AudioMng.getInstance().playShuffle();
        this.object.removeFromParentNode();

        //
        var randomDelayTime = Tools.rangeRandom(0, Defines.FPS * 15);
        var randomJumpHeight =  Tools.rangeRandom(_ScreenHeight() * 0.5, _ScreenHeight() * 0.6);

        //
        var sprite = this.object.getSprite();
        var oldParent = sprite.getParent();

        //
        sprite.retain();
        sprite.removeFromParent(false);

        //
        animateLayer().addChild(sprite);
        sprite.release();

        //
        var sq0 = cc.Sequence.create(
            cc.DelayTime.create(randomDelayTime),
            cc.JumpTo.create(Defines.FPS * 60, this.grid.getPosition(), randomJumpHeight, 1)
        );

        //
        var jumpTime = randomDelayTime + Defines.FPS * 60;

        //
        var sq1 =  cc.Sequence.create(
            cc.DelayTime.create(jumpTime),
            cc.JumpBy.create(Defines.FPS * 12, cc.p(0, 0), Defines.TABLE_GRID_SIZE * 0.15, 1)
        );

        //
        var sq2 =  cc.Sequence.create(
            cc.DelayTime.create(jumpTime),
            cc.Sequence.create(
                cc.ScaleTo.create(Defines.FPS * 6, 1.1, 0.9),
                cc.ScaleTo.create(Defines.FPS * 6, 1.0, 1.0),
                cc.CallFunc.create(
                    function(sender)
                    {
                        self.isFinish = true;

                        //
                        sender.stopActionByTag(10000);
                        sender.stopActionByTag(20000);
                        sender.stopActionByTag(30000);

                        //
                        sender.retain();
                        sender.removeFromParent(false);

                        //
                        oldParent.addChild(sender, self.object.getZOrder());
                        sender.release();

                        //
                        sender.setScale(1);
                        sender.setVisible(true);
                        sender.setRotation(0);
                    },
                    null)
            )
        );

        //3个动作同时播放
        sq0.setTag(10000);
        sq1.setTag(20000);
        sq2.setTag(30000);

        //
        sprite.runAction(sq0);
        sprite.runAction(sq1);
        sprite.runAction(sq2);

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function()
    {
        this.grid.addNode(this.object);
        this.object.updateNodePosition();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        return this.isFinish;
    }
});

//
cc.Cmd_ShuffleJump.create = function(object, grid)
{
    return new cc.Cmd_ShuffleJump(object, grid);
};


//随机洗牌
//======================================================================================================================
cc.Cmd_Shuffle = cc.ICommandGroup.extend({

    ctor: function()
    {
        this._super();

        this.m_Grids = [];
        this.m_Objs = [];

        this.isFinish = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Cmd_Shuffle";
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(gameLevel)
    {
        var itr = gameLevel.getTable().createIterForMiddleObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var moveObj = itr.getCurrent();
            if (!moveObj || !moveObj.canTouch())
            {
                continue;
            }

            if (moveObj.getParentNode().isBlock())
            {
                continue;
            }

            //炸弹不参与洗牌
            if (moveObj instanceof cc.Obj_Bomb)
            {
                continue;
            }

            this.m_Grids.push(moveObj.getParentNode());
            this.m_Objs.push(moveObj);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        cc.log("__Default Shuffle__");

        //必须先初始化!
        this.init(gameLevel);

        //洗牌
        Tools.shuffle(this.m_Objs);

        //
        this.runShufflePrompt(function()
        {
            this.m_Objs.forEach(function(each, index)
            {
                cc.ArmatureDataMng.getInstance().stopArmature(each);
                each.removeFromParentNode();
                this.addCommand(cc.Cmd_ShuffleJump.create(each, this.m_Grids[index]));
            }, this);

            //如果此次洗牌不成功，下次是有准洗牌
            cc.Cmd_Shuffle.setPlannedType();

            this.isFinish = true;
        });

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    runShufflePrompt: function(callback)
    {
        //
        var winSize = cc.Director.getInstance().getWinSize();

        var shuffleSprite = cc.Sprite.createWithSpriteFrameName("game_label_shuffle.png");
        _GUILayer().addChild(shuffleSprite);
        shuffleSprite.setPosition(cc.p(winSize.width + shuffleSprite.getContentSize().width/2, winSize.height/2));

        var sq = cc.Sequence.create(
            cc.DelayTime.create(Defines.FPS * 10),
            cc.EaseElasticOut.create(cc.MoveTo.create(Defines.FPS * 30, cc.p(winSize.width/2, winSize.height/2))),
            cc.DelayTime.create(Defines.FPS * 40),
            cc.MoveTo.create(Defines.FPS * 30, cc.p(0, winSize.height/2)),
            cc.CallFunc.create(function(sender){
                sender.removeFromParent(true);
            }),
            cc.CallFunc.create(callback, this)
        );

        shuffleSprite.runAction(sq);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        //结束之后加一个消除命令
        gameLevel.addCommand(cc.Cmd_EveryDestroy.create());
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        for (var indx = 0; indx < this.m_Commands.length;)
        {
            if (this.m_Commands[indx].command(gameLevel, time))
            {
                //完成 就删除掉
                this.m_Commands[indx].finish(gameLevel);
                this.m_Commands.splice(indx, 1);
            }
            else
            {
                ++indx;
            }
        }

        return this.isFinish && this.m_Commands.length <= 0;
    }

    //------------------------------------------------------------------------------------------------------------------
});

//工厂方法
cc.Cmd_Shuffle.create = function(flag)
{
    return new cc.Cmd_Shuffle(flag);
};

//
cc.Cmd_Shuffle.SHUFFLE_TYPE =
{
    SHUFFLE_RANDOM: 0,
    SHUFFLE_PLANNED: 1
};

//
cc.Cmd_Shuffle.shuffleTypeValue = cc.Cmd_Shuffle.SHUFFLE_TYPE.SHUFFLE_RANDOM;

cc.Cmd_Shuffle.setRandomType = function()
{
    cc.Cmd_Shuffle.shuffleTypeValue = cc.Cmd_Shuffle.SHUFFLE_TYPE.SHUFFLE_RANDOM;
};

cc.Cmd_Shuffle.setPlannedType = function()
{
    cc.Cmd_Shuffle.shuffleTypeValue = cc.Cmd_Shuffle.SHUFFLE_TYPE.SHUFFLE_PLANNED;
};

cc.Cmd_Shuffle.isPlanned = function()
{
    return cc.Cmd_Shuffle.shuffleTypeValue == cc.Cmd_Shuffle.SHUFFLE_TYPE.SHUFFLE_PLANNED;
};
