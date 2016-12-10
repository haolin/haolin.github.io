//有准洗牌
//======================================================================================================================
cc.Cmd_ShuffleEx = cc.ICommandGroup.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(usingItem)
    {
        this._super();

        this.m_UsingItem = usingItem;

        //
        this.m_Grids = [];
        this.m_Objs = [];

        //
        this.m_ColorCategoryObjs = [];
        this.m_HighDesRuleObjs = [];
        this.m_BlockObjs = [];

        //
        this.m_BlockLayoutModel = [];

        //
        this.m_Finish = false;
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

            //有雾霾不参与洗牌
            var ceilObj = moveObj.getParentNode().getCeilObject();
            if (ceilObj && ceilObj instanceof cc.Obj_Haze)
            {
                continue;
            }

            //
            var topObj = moveObj.getParentNode().getTopObject();
            if (topObj && topObj instanceof cc.Obj_Lock)
            {
                this.m_BlockObjs.push(moveObj);
                continue;
            }

            //炸弹不参与动洗牌 为静洗牌
            if (moveObj instanceof cc.Obj_Bomb)
            {
                this.m_BlockObjs.push(moveObj);
                continue;
            }

            //以下是参与动洗牌
            this.m_Grids.push(moveObj.getParentNode());
            this.m_Objs.push(moveObj);

            //
            if (moveObj instanceof cc.Obj_MonsterDirection || moveObj instanceof cc.Obj_MonsterWrap)
            {
                this.m_HighDesRuleObjs.push(moveObj);
            }

            //
            if (moveObj instanceof cc.Obj_Monster)
            {
                if (moveObj.getColor && moveObj.getColor().getCode() > 0)
                {
                    var colorIndex = moveObj.getColor().getCode() / 10 - 1;
                }
                //Obj_Flower的处理
                else if (moveObj instanceof cc.Obj_Flower)
                {
                    var flowerLevel = parseInt(moveObj.getFlowerLevel());
                    colorIndex = /*Defines.COLORS_ARRAY.length*/_GetColorsArray().length + flowerLevel;
                }

                if (!this.m_ColorCategoryObjs[colorIndex])
                {
                    this.m_ColorCategoryObjs[colorIndex] = [];
                }

                this.m_ColorCategoryObjs[colorIndex].push(moveObj);
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    registerBlockLayoutModel: function(origin, fixed, optional)
    {
        if (origin && fixed && optional)
        {
            this.m_BlockLayoutModel.push(
                {
                    _origin: origin,
                    _fixed: fixed,
                    _optional: optional
                });

            //模型以Lock为原点，偏转90度
            this.m_BlockLayoutModel.push(
                {
                    _origin: cc.p(origin.y, origin.x),
                    _fixed: cc.p(fixed.y, fixed.x),
                    _optional: optional.map(function(dPoint)
                    {
                        return cc.p(dPoint.y, dPoint.x);
                    })
                });

            //模型以Lock为原点，偏转-90度
            this.m_BlockLayoutModel.push(
                {
                    _origin: cc.p(origin.y, -origin.x),
                    _fixed: cc.p(fixed.y, -fixed.x),
                    _optional: optional.map(function(dPoint)
                    {
                        return cc.p(dPoint.y, -dPoint.x);
                    })
                });

            //模型以Lock为原点，偏转180度
            this.m_BlockLayoutModel.push(
                {
                    _origin: cc.p(-origin.x, origin.y),
                    _fixed: cc.p(-fixed.x, fixed.y),
                    _optional: optional.map(function(dPoint)
                    {
                        return cc.p(-dPoint.x, dPoint.y);
                    })
                });
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    /**
     * 以交换源为中心的九宫格内，满足条件的两个情况
     * 1.上下左右四个方向 有三个以上正常格子
     *      O X O
     *        O
     * 2.四个方向有两个正常格子，并且这两格子至少有一个格子在相同方向上有正常格子
     *      O X O O
     */
    parseBaseLayout: function()
    {
        var grids = this.m_Grids.concat();
        var checkDir = Defines.DIRECTION.CROSS.concat();//[Defines.DIRECTION.TOP, Defines.DIRECTION.LEFT, Defines.DIRECTION.RIGHT, Defines.DIRECTION.BOTTOM];

        var baseLayoutData = [];
        var availableDir = [];

        //grids的长度会一直变,用while
        while(grids.length > 0)
        {
            baseLayoutData.splice(0, baseLayoutData.length);
            availableDir.splice(0, availableDir.length);

            var checkGridIndex  = Tools.randomEx(grids.length) - 1;
            var checkGrid =  grids.splice(checkGridIndex, 1)[0];

            for (var index = 0; index < checkDir.length; index++)
            {
                var dirCheckGrid = checkGrid.getGridByDirection(checkDir[index]);
                if (this.m_Grids.indexOf(dirCheckGrid) >= 0)
                {
                    baseLayoutData.push(dirCheckGrid);
                    availableDir.push(checkDir[index]);

                    if (baseLayoutData.length >= 3)
                    {
                        break;
                    }
                }
            }

            //
            if (baseLayoutData.length >= 3)
            {
                break;
            }

            //
            if (baseLayoutData.length == 2)
            {
                var dirCheckNextGrid = baseLayoutData[0].getGridByDirection(availableDir[0]);
                if (this.m_Grids.indexOf(dirCheckNextGrid) >= 0)
                {
                    baseLayoutData.push(dirCheckNextGrid);
                    break;
                }

                dirCheckNextGrid = baseLayoutData[1].getGridByDirection(availableDir[1]);
                if (this.m_Grids.indexOf(dirCheckNextGrid) >= 0)
                {
                    baseLayoutData.push(dirCheckNextGrid);
                    break;
                }
            }
        }

        return baseLayoutData;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseHighDesRuleLayout: function()
    {
        var grids = this.m_Grids.concat();
        var checkDir = Defines.DIRECTION.CROSS.concat();//[Defines.DIRECTION.TOP, Defines.DIRECTION.LEFT, Defines.DIRECTION.RIGHT, Defines.DIRECTION.BOTTOM];

        var hasAvailable = false;
        var highDesRuleLayoutData = [];

        //grids的长度会一直变,用while
        while(!hasAvailable)
        {
            var checkGridIndex  = Tools.randomEx(grids.length) - 1;
            var checkGrid =  grids.splice(checkGridIndex, 1)[0];

            for (var index = 0; index < checkDir.length; index++)
            {
                var dirCheckGrid = checkGrid.getGridByDirection(checkDir[index]);
                if (this.m_Grids.indexOf(dirCheckGrid) >= 0)
                {
                    highDesRuleLayoutData.push(checkGrid);
                    highDesRuleLayoutData.push(dirCheckGrid);
                    hasAvailable = true;

                    cc.log(">>>>>HighDesRuleLayout first:" + checkGrid + " , second:" + dirCheckGrid);

                    break;
                }
            }

            if (hasAvailable || grids.length <= 0)
            {
                break;
            }
        }

        return highDesRuleLayoutData;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseBlockLayout: function(gameLevel)
    {
        var tableGrids = gameLevel.getTable().getChildrenNodes();
        var blockLayoutData = [];

        //不满足布局的过滤
        var spliceIndex = [];

        var self = this;
        this.m_BlockObjs.forEach(function(blockObj, index)
        {
            var splice = true;
            var gridPos = blockObj.getParentNode().getGridPos();

            self.m_BlockLayoutModel.forEach(function(model)
            {
                var srcGrids = [];

                //判断交换源 X
                var dX = model._origin.x;
                var dY = model._origin.y;

                //TiledMap坐标系的原点在左上角
                var originGrid = tableGrids[gridPos.x + dX] && tableGrids[gridPos.x + dX][gridPos.y - dY];
                //if (!originGrid || !originGrid.getTouchEnabledObject || !originGrid.getTouchEnabledObject())
                if (self.m_Grids.indexOf(originGrid) < 0)
                {
                    return;
                }

                //固定的位置 O
                dX = model._fixed.x;
                dY = model._fixed.y;

                //TiledMap坐标系的原点在左上角
                var fixedGrid = tableGrids[gridPos.x + dX] && tableGrids[gridPos.x + dX][gridPos.y - dY];
                //if (!fixedGrid || !fixedGrid.getTouchEnabledObject || !fixedGrid.getTouchEnabledObject())
                if (self.m_Grids.indexOf(fixedGrid) < 0)
                {
                    return;
                }

                //可选的布局 o
                model._optional.forEach(function(optional)
                {
                    dX = optional.x;
                    dY = optional.y;

                    var optionalGrid = tableGrids[gridPos.x + dX] && tableGrids[gridPos.x + dX][gridPos.y - dY];
                    //if (optionalGrid && optionalGrid.getTouchEnabledObject && optionalGrid.getTouchEnabledObject())
                    if (self.m_Grids.indexOf(optionalGrid) >= 0)
                    {
                        srcGrids.splice(0, srcGrids.length);
                        srcGrids.push(fixedGrid);
                        srcGrids.push(optionalGrid);

                        splice = false;
                        cc.log(">>>>> Block:" + blockObj.getParentNode() + " , Src:" + srcGrids);
                        blockLayoutData.push({_blockObj: blockObj, _srcGrids: srcGrids});
                    }
                });
            });

            if (splice)
            {
                spliceIndex.push(index - spliceIndex.length);
            }
        });

        //
        spliceIndex.forEach(function(each)
        {
            self.m_BlockObjs.splice(each, 1);
        });

        cc.log(">>>>> Filter m_BlockObjs:" + this.m_BlockObjs);

        return blockLayoutData;
    },

    //------------------------------------------------------------------------------------------------------------------
    addShuffleJumpCommand: function(gameLevel, swapInObjs, swapOutGrids)
    {
        var self = this;
        swapInObjs.forEach(function(each, index)
        {
            var swapInIndex = self.m_Objs.indexOf(each);
            var swapOutIndex = self.m_Grids.indexOf(swapOutGrids[index]);

            //cc.log(swapInIndex + " , " + swapOutIndex);

            var temp = self.m_Objs[swapInIndex];
            self.m_Objs[swapInIndex] = self.m_Objs[swapOutIndex];
            self.m_Objs[swapOutIndex] = temp;
        });

        //
        if (this.m_UsingItem)
        {
            this.m_Objs.forEach(function(each, index)
            {
                cc.ArmatureDataMng.getInstance().stopArmature(each);
                //each.removeFromParentNode();
                this.addCommand(cc.Cmd_ShuffleJump.create(each, this.m_Grids[index]));
            }, this);

            this.m_Finish = true;

            return this;
        }

        //
        this.runShufflePrompt(function()
        {
            this.m_Objs.forEach(function(each, index)
            {
                cc.ArmatureDataMng.getInstance().stopArmature(each);
                //each.removeFromParentNode();
                this.addCommand(cc.Cmd_ShuffleJump.create(each, this.m_Grids[index]));
            }, this);

            this.m_Finish = true;
        });

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
    startImplBaseShuffle: function(gameLevel)
    {
        //1.至少有三个同色的
        var baseCategoryObjs = this.m_ColorCategoryObjs.filter(function(group)
        {
            return group.length >= 3;
        });

        if (baseCategoryObjs.length <= 0)
        {
            return false;
        }

        //2
        var swapOutGrids = this.parseBaseLayout();

        if (swapOutGrids.length < 3)
        {
            return false;
        }


        //3.随机挑选三个相同的
        var swapInObjs = [];

        var baseColorObjs = baseCategoryObjs[Tools.randomEx(baseCategoryObjs.length) - 1].concat();
        for (var index = 0; index < 3; index++)
        {
            var objIndex = Tools.randomEx(baseColorObjs.length) - 1;
            swapInObjs.push(baseColorObjs[objIndex]);
            baseColorObjs.splice(objIndex, 1);
        }

        cc.log("Cmd_ShuffleEx------startImplBase : swapInObjs " + swapInObjs);
        cc.log("Cmd_ShuffleEx------startImplBase : swapOutGrids " + swapOutGrids);

        //
        this.addShuffleJumpCommand(gameLevel, swapInObjs, swapOutGrids);

        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    startImplHighDesRuleShuffle: function(gameLevel)
    {
        //1.至少有两个有高消除规则的
        if (this.m_HighDesRuleObjs.length < 2)
        {
            return false;
        }

        //2.至少有一个两个相邻的位置
        var swapOutGrids = this.parseHighDesRuleLayout(gameLevel);

        if (swapOutGrids.length < 2)
        {
            return false;
        }

        //3.随机挑选两个特殊的小怪
        var swapInObjs = [];

        var colorObjs = this.m_HighDesRuleObjs.concat();
        for (var index = 0; index < 2; index++)
        {
            var objIndex = Tools.randomEx(colorObjs.length) - 1;
            swapInObjs.push(colorObjs[objIndex]);
            colorObjs.splice(objIndex, 1);
        }

        cc.log("Cmd_ShuffleEx------startImplHighDesRuleShuffle : swapInObjs " + swapInObjs);
        cc.log("Cmd_ShuffleEx------startImplHighDesRuleShuffle : swapOutGrids " + swapOutGrids);

        //
        this.addShuffleJumpCommand(gameLevel, swapInObjs, swapOutGrids);

        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    startImplBlockShuffle: function(gameLevel)
    {
        //1.至少有两个同色的
        if (this.m_BlockObjs.length <= 0)
        {
            return false;
        }

        var self = this;
        var blockCategoryObjs = this.m_ColorCategoryObjs.filter(function(group)
        {
            return group.length >= 2 && self.m_BlockObjs.some(function(some)
            {
                return some.getColor && some.getColor().getCode() == group[0].getColor().getCode();
            });
        });

        if (blockCategoryObjs.length <= 0)
        {
            return false;
        }

        //2.至少有同色的
        this.m_BlockObjs = this.m_BlockObjs.filter(function(blockObj)
        {
            return blockCategoryObjs.some(function(some)
            {
                return blockObj.getColor && some[0].getColor().getCode() == blockObj.getColor().getCode();
            });
        });

        if (this.m_BlockObjs.length <= 0)
        {
            return false;
        }

        //3.
        var blockLayoutData = this.parseBlockLayout(gameLevel);

        if (this.m_BlockObjs.length <= 0 || blockLayoutData.length <= 0)
        {
            return false;
        }

        //4.
        var blockObj = Tools.arrayRandom(this.m_BlockObjs);

        //5.
        var sameColorObjs = null;
        for (var index = 0; index < blockCategoryObjs.length; index++)
        {
            if(blockCategoryObjs[index][0].getColor().getCode() == blockObj.getColor().getCode())
            {
                sameColorObjs = blockCategoryObjs[index].concat();
                break;
            }
        }

        var swapInObjs = [];

        for (index = 0; index < 2; index++)
        {
            var objIndex = Tools.randomEx(sameColorObjs.length) - 1;
            swapInObjs.push(sameColorObjs[objIndex]);
            sameColorObjs.splice(objIndex, 1);
        }

        cc.log("Cmd_ShuffleEx------startImplBlockShuffle : swapInObjs " + swapInObjs);

        //4.随机取位置
        var blockLayouts = blockLayoutData.filter(function(layout)
        {
            return layout._blockObj == blockObj;
        });

        var oneBlockLayout = Tools.arrayRandom(blockLayouts);

        var swapOutGrids = oneBlockLayout._srcGrids;

        cc.log("Cmd_ShuffleEx------startImplBlockShuffle : swapOutGrids " + swapOutGrids);

        //
        this.addShuffleJumpCommand(gameLevel, swapInObjs, swapOutGrids);

        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        cc.log("__Ex Shuffle__");

        this.init(gameLevel);

        //先随机洗一下
        Tools.shuffle(this.m_Objs);


        if (this.startImplBaseShuffle(gameLevel))
        {
            return this;
        }

        if (this.startImplHighDesRuleShuffle(gameLevel))
        {
            return this;
        }

        if (this.startImplBlockShuffle(gameLevel))
        {
            return this;
        }

        //
        cc.Cmd_Shuffle.setRandomType();

        //
        cc.log("Shuffle Failed ----- Game Over");

        //
        cc.DataMng.getInstance().setGameLevelResult(Defines.GAME_RESULT.RESULT_FAILED);
        //cc.GameManager.getInstance().pauseCurrentAndChangeTo(cc.State_GameFail.getInstance());
        _ChangeGameLevelStateTo(cc.State_GameFail.getInstance());
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

        for (var index = 0; index < this.m_Commands.length;)
        {
            if (this.m_Commands[index].command(gameLevel, time))
            {
                //完成 就删除掉
                this.m_Commands[index].finish(gameLevel);
                this.m_Commands.splice(index, 1);
            }
            else
            {
                ++index;
            }
        }

        return this.m_Finish && this.m_Commands.length <= 0;
    }

    //------------------------------------------------------------------------------------------------------------------
});

//工厂方法
cc.Cmd_ShuffleEx.create = function(usingItem)
{
    var command = new cc.Cmd_ShuffleEx(usingItem);

    //------------------------------------------------------------------------------------------------------------------
    /**
     * L:牢笼下，X:交换源， O:固定的， o:被交换的位置，一个o是一种布局
     * 基本模型是三种,再分别+y, -y, -x三个方向翻转; 三种模型八种布局,翻转后是32种布局
     *
     * 1.1
     *        o
     *      L X O
     *        o
     */
    command.registerBlockLayoutModel(cc.p(1, 0), cc.p(2, 0), [cc.p(1, 1), cc.p(1, -1)]); // X, O, [o, o...] ,相对L的坐标

    /**1.2
     *          o
     *      L O X o
     *          o
     */
    command.registerBlockLayoutModel(cc.p(2, 0), cc.p(1, 0), [cc.p(2, 1), cc.p(-2, -1), cc.p(3, 0)]);

    /**1.3
     *        o
     *      o X L O
     *        o
     */
    command.registerBlockLayoutModel(cc.p(-1, 0), cc.p(1, 0), [cc.p(-2, 0), cc.p(-1, 1), cc.p(-1, -1)]);

    //------------------------------------------------------------------------------------------------------------------

    return command;
};