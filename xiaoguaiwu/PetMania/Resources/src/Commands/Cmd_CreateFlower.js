//======================================================================================================================
var Cmd_SubCreateFlowersMove = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(objects, centerGrid)
    {
        this._super();

        //
        this.objects = objects;
        this.centerGrid = centerGrid;
        this.isFinish = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseNewLevel: function()
    {
        var level = this.objects[0].getFlowerLevel();
        ++level;

        //
        if (level > _GetCurGameLevelMaxFlowersLevel())
        {
            level = _GetCurGameLevelMaxFlowersLevel();
        }

        //
        return level;
    },

    //------------------------------------------------------------------------------------------------------------------
    createNewFlower: function(gameLevel)
    {
        var self = this;

        //
        var visitor = cc.ScoreVisitorGroup.create(
            _ParseFlowerScoreType(this.objects[0].getFlowerLevel())
        );

        //
        this.objects.forEach(
            function(a_obj)
            {
                a_obj.destroy(a_obj, gameLevel, visitor);
            }
        );

        //
        var newFlowerLevel = this.parseNewLevel();
        var newFlower = cc.Obj_Flower.create(newFlowerLevel);
        if (!newFlower)
        {
            return this;
        }

        //
        cc.AudioMng.getInstance().playFlowerCreate(this.objects[0].getFlowerLevel());

        //放上新的花
        this.centerGrid.addNode(newFlower);
        newFlower.updateNodePosition();
        newFlower.renderNode();
        //cc.DataMng.getInstance().recordCreate(newFlower);
        DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().addCreateObjectWhenGameLevelRunning(newFlower);

        //
        var flowerSprt = newFlower.getSprite();
        flowerSprt.setScale(0.8);
        var seq2 = cc.Sequence.create(
            cc.EaseElasticOut.create(cc.ScaleTo.create(Defines.FPS * 6.18, 1.2, 1.2)),
            cc.ScaleTo.create(Defines.FPS * 6.18, 1, 1),
            cc.CallFunc.create(
                function()
                {
                    visitor.visitFinish(newFlower.getPosition());
                    self.isFinish = true;
                },
                null));

        flowerSprt.runAction(seq2);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //
        var self = this;
        var time = Defines.FPS * 6.18;

        //
        var finCount = 0;
        var addFinishCount = function()
        {
            ++finCount;
            if (finCount >= self.objects.length)
            {
                self.createNewFlower(gameLevel);
            }
        };

        //
        this.objects.forEach(
            function(each)
            {
                if (each.getParentNode() == self.centerGrid)
                {
                    addFinishCount();
                    return;
                }

                //
                each.getSprite().runAction(
                    cc.Sequence.create(
                    cc.MoveTo.create(time, self.centerGrid.getPosition()),
                    cc.CallFunc.create(
                        function (sender)
                        {
                            sender.setVisible(false);
                            addFinishCount();
                        },
                        null))
                );
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        return this.isFinish;
    }
});

//======================================================================================================================
var Cmd_FlowerLevelUp = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(object)
    {
        this._super();

        //
        this.object = object;
        this.isFinish = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        var self = this;
        if (this.object.getFlowerLevel() >= FLOWER_LEVEL_DEFINE.FRUIT)
        {
            cc.EffectMng.getInstance().displayMonsterDesWrap(
                this.object.getPosition(),
                3,
                function()
                {
                    self.isFinish = true;
                });
        }
        else
        {
            //其余的一起处理
            self.isFinish = true;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        return this.isFinish;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        //
        cc.EffectMng.getInstance().displayMonsterRunning(this.object);

        //
        var vis = cc.ScoreVisitorGroup.create(_ParseFlowerScoreType(this.object.getFlowerLevel()));
        this.object.destroy(this.object, gameLevel, vis);
        vis.visitFinish(this.object.getPosition());

        return this;
    }
});

//======================================================================================================================
cc.Cmd_CreateFlower = cc.ICommandGroup.extend({

    ctor: function(center, objects, swapDirection, isCross)
    {
        this._super();
        this.m_Finish = false;

        //
        this.center = center;
        this.objects = objects;
        this.swapDirection = swapDirection;
        this.isCross = isCross;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseGrid: function(gameLevel)
    {
        if ((this.swapDirection && this.swapDirection != Defines.DIRECTION.NULL) || this.isCross)
        {
            return this.center.getParentNode();
        }

        var arr = [this.center].concat(this.objects);

        //
        var sumX = 0;
        var sumY = 0;
        arr.forEach(
            function(each)
            {
                var pos = each.getPosition();
                sumX += pos.x;
                sumY += pos.y;
            }
        );

        //计算中点
        var realCenter = gameLevel.getTable().getGridByPos(cc.p(sumX/arr.length, sumY/arr.length));
        if (realCenter)
        {
            return realCenter;
        }

        return this.center.getParentNode();

        //
        /* old
        var grid = this.center.getParentNode();
        if (!this.swapDirection)
        {
            //
            var firstPos = this.center.getPosition();
            var xPosSameLine = true;
            var yPosSameLine = true;
            this.objects.forEach(
                function(a_obj)
                {
                    var pos = a_obj.getPosition();
                    if (pos.x != firstPos.x)
                    {
                        xPosSameLine = false;
                    }

                    if (pos.y != firstPos.y)
                    {
                        yPosSameLine = false;
                    }
                }
            );

            if (xPosSameLine || yPosSameLine)
            {
                var arr = [this.center].concat(this.objects);

                //
                var sumX = 0;
                var sumY = 0;
                arr.forEach(
                    function(each)
                    {
                        var pos = each.getPosition();
                        sumX += pos.x;
                        sumY += pos.y;
                    }
                );

                //计算中点
                var center = gameLevel.getTable().getGridByPos(cc.p(sumX/arr.length, sumY/arr.length));
                grid = center || grid;
            }
        }

        return grid;
         */
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);
        //
        var self = this;
        var centerGrid = this.parseGrid(gameLevel);

        //
        var command = new Cmd_SubCreateFlowersMove(
            [this.center].concat(this.objects),
            centerGrid
        );

        //
        command.finish = function()
        {
            //最大等级 才加这个命令
            var newFlower = centerGrid.getMiddleObject();
            if (newFlower
                && newFlower instanceof cc.Obj_Flower
                && newFlower.getFlowerLevel() >= _GetCurGameLevelMaxFlowersLevel())
            {
                self.addCommand(new Cmd_FlowerLevelUp(newFlower));
            }
        };

        //
        this.addCommand(command);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        _AddFlowerToFactorysPool(gameLevel);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        return this.m_Commands.length <= 0;
    }
});

cc.Cmd_CreateFlower.create = function(center, objects, swapDirection, isCross)
{
    return new cc.Cmd_CreateFlower(center, objects, swapDirection, isCross);
};
