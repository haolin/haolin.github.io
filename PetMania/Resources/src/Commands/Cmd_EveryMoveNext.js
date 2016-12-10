//通知所有糖果坠落

//======================================================================================================================
cc.Cmd_EveryMoveNext = cc.ICommandGroup.extend({

    ctor: function()
    {
        this._super();

        //是否移动了任何东西?
        this.m_IsMoveAny = false;

        //工厂对象 其实就是起点
        this.m_FactoryObjs = _GetFactoryObjects().concat(_GetPipeFactoryObjects());

        //移动总时间
        this.m_TotalMoveTime = 0;

        //完成标志
        this.m_IsFinish = false;

        //对于格子的记录
        //this.m_SortGridsDirtyMap = {};
        this.m_MySortGrids = [];

        //
        this.m_GridsGrabDirty = {};

        //
        this.m_BlockMap = {};
        this.m_BottomLeftAndRightBlockGrids = {};
        this.m_GravityMove = {};

        //
        this.m_FirstHandleMove = true;
        this.m_NeedMoveClockObjects = {};

        //
        this.m_DelayTime = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "Cmd_EveryMoveNext";
    },

    //------------------------------------------------------------------------------------------------------------------
    markClock: function(object, gameLevel)
    {
        if (!object)
        {
            return this;
        }

        //
        if (object instanceof cc.Obj_MonsterUnwrap)
        {
            this.m_NeedMoveClockObjects[object.getObjectID()] = object;
            object.toFire(gameLevel);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setGravityMove: function(object)
    {
        this.m_GravityMove[object.getObjectID()] = true;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isGravityMove: function(object)
    {
        return this.m_GravityMove[object.getObjectID()];
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanGravityMove: function(object)
    {
        delete this.m_GravityMove[object.getObjectID()];
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setBlockMap: function(grid)
    {
        if (!grid)
        {
            return this;
        }

        this.m_BlockMap[grid.getObjectID()] = true;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isInBlockMap: function(grid)
    {
        return grid ? this.m_BlockMap[grid.getObjectID()] : false;
    },

    //------------------------------------------------------------------------------------------------------------------
    isHasAnyBlockMap: function()
    {
        var blockCount = 0;
        for (var prop in this.m_BlockMap)
        {
            if (!this.m_BlockMap.hasOwnProperty(prop))
            {
                continue;
            }

            if (this.m_BlockMap[prop])
            {
                 ++blockCount;
            }
        }

        return blockCount > 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    getTotalMoveTime: function()
    {
        return this.m_TotalMoveTime;
    },

    //------------------------------------------------------------------------------------------------------------------
    isMoveAny: function()
    {
        return this.m_IsMoveAny;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyMoveAny: function()
    {
        this.m_IsMoveAny = true;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isGridDirty: function(grid)
    {
        return this.m_GridsGrabDirty[grid.getObjectID()];
    },

    //------------------------------------------------------------------------------------------------------------------
    setGridDirty: function(grid)
    {
        this.m_GridsGrabDirty[grid.getObjectID()] = true;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanGridDirty: function(grid)
    {
        delete this.m_GridsGrabDirty[grid.getObjectID()];
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //创建普通移动命令
    createMoveNext: function(moveObj, dstGrid)
    {
        return Cmd_SubMoveNext.create(moveObj, dstGrid, this);
    },

    //------------------------------------------------------------------------------------------------------------------
    //创建普通移动命令 从工厂出来
    createMoveFromFactory: function(moveObj, dstGrid)
    {
        return Cmd_SubMoveFromFacotry.create(moveObj, dstGrid, this);
    },

    //------------------------------------------------------------------------------------------------------------------
    //创建传送移动命令
    createMoveConnect: function(moveObj, dstGrid)
    {
        return Cmd_SubMoveConnect.create(moveObj, dstGrid, this);
    },

    //------------------------------------------------------------------------------------------------------------------
    handleFirst: function(gameLevel, finishMoves)
    {
        //
        var hasBlockSoNeedSecondHandle = this.isHasAnyBlockMap();

        //用拷贝的  构建所有路径上的 标记 和 脏位
        var self = this;
        gameLevel.getTable().getPaths().forEach(
            function(aPath)
            {
                var emptyCount = 0;

                for (var reverseBegin = aPath.end;
                     reverseBegin;
                     reverseBegin = reverseBegin.getPre())
                {
                    if (!(reverseBegin instanceof cc.NormalGrid) || reverseBegin.isBlock())
                    {
                        emptyCount = 0;
                        continue;
                    }

                    //设置计数
                    var moveObj = reverseBegin.getMiddleObject();
                    if (!moveObj)
                    {
                        //没有东西 就添加一个计数
                        ++emptyCount;
                        continue;
                    }

                    if (emptyCount > 0)
                    {
                        var cur = moveObj.getParentNode();
                        var next = cur.getNext();
                        if (self.isGridMoveToEnable(next))
                        {
                            if (cur.isConnect())
                            {
                                //传送门移动
                                self.addCommand(self.createMoveConnect(moveObj, next).start(gameLevel));
                            }
                            else
                            {
                                //格子->格子 移动
                                self.addCommand(self.createMoveNext(moveObj, next).start(gameLevel));
                            }

                            continue;
                        }
                    }

                    if (!self.m_FirstHandleMove && !hasBlockSoNeedSecondHandle && finishMoves)
                    {
                        //self.markSortGridDirty(reverseBegin);

                        //不是第一次启动 这些就是完成移动的 添加动画
                        if (self.isGravityMove(moveObj))
                        {
                            finishMoves.push(moveObj);
                            self.cleanGravityMove(moveObj);
                        }
                    }
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleSecond: function(gameLevel, finishMoves)
    {
        if (!this.isHasAnyBlockMap())
        {
            return this;
        }

        var self = this;
        this.m_MySortGrids.forEach(
            function(grid)
            {
                if (grid.isBlock())
                {
                    return;
                }

                var moveObj = grid.getMiddleObject();
                if (!moveObj)
                {
                    return;
                }

                var next = grid.getNext();
                if (self.isGridMoveToEnable(next))
                {
                    //
                    if (grid.isConnect())
                    {
                        //传送门移动
                        self.addCommand(self.createMoveConnect(moveObj, next).start(gameLevel));
                    }
                    else
                    {
                        //格子->格子 移动
                        self.addCommand(self.createMoveNext(moveObj, next).start(gameLevel));
                    }

                    return;
                }

                //垂直不能动 就斜线移动
                next = self.getMoveBiasGrid(gameLevel, grid);
                if (next)
                {
                    //格子->格子 移动
                    self.addCommand(self.createMoveNext(moveObj, next).start(gameLevel));
                    return;
                }

                if (!self.m_FirstHandleMove && finishMoves)
                {
                    //
                    //self.markSortGridDirty(grid);

                    //添加动画
                    if (self.isGravityMove(moveObj))
                    {
                        finishMoves.push(moveObj);
                        self.cleanGravityMove(moveObj);
                    }
                }
            }
        );

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleMove: function(gameLevel)
    {
        var finishMoves = [];

        //第一处理 根据Path
        this.handleFirst(gameLevel, finishMoves);

        //工厂生产新的
        this.notifyFactories(gameLevel);

        //第二处理 根据yPos
        this.handleSecond(gameLevel, finishMoves);

        //
        this.m_FirstHandleMove = false;

        //
        //this.updateSortGrids();

        //
        return finishMoves;
    },

    //------------------------------------------------------------------------------------------------------------------
    //初始化
    markPathsBlockMap: function(gameLevel)
    {
        //用拷贝的  构建所有路径上的 标记 和 脏位
        var self = this;
        gameLevel.getTable().getPaths().forEach(
            function(aPath)
            {
                var beginIsBlock = aPath.begin.isBlock();
                var anyBlockInPath = beginIsBlock;

                //
                for (var begin = aPath.begin.getNext();
                     begin;
                     begin = begin.getNext())
                {
                    if (!(begin instanceof cc.NormalGrid))
                    {
                        continue;
                    }

                    if (begin.isBlock())
                    {
                        anyBlockInPath = true;
                    }

                    if (beginIsBlock || anyBlockInPath)
                    {
                        self.setBlockMap(begin);
                    }

                    self.markClock(begin.getMiddleObject(), gameLevel);
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //
        this.markPathsBlockMap(gameLevel);

        //
        //this.m_SortGridsDirtyMap = {};
        this.m_MySortGrids = gameLevel.getTable().getSortGrids().filter(
            function(a_grid)
            {
                return !a_grid.isBlock();
            }
        );

        //
        this.handleMove(gameLevel);

        //
        this.m_IsFinish = (this.m_Commands.length <= 0);

        return  this;
    },

    //------------------------------------------------------------------------------------------------------------------
    /*markSortGridDirty: function(grid)
    {
        this.m_SortGridsDirtyMap[grid.getObjectID()] = true;
        return this;
    },
*/
    //------------------------------------------------------------------------------------------------------------------
    /*updateSortGrids: function()
    {
        //优化作用
        var self = this;
        this.m_MySortGrids.forEach(
            function(a_grid, index, array)
            {
                if (self.m_SortGridsDirtyMap[a_grid.getObjectID()])
                {
                    array.splice(index, 1);
                }
            }
        );

        return this;
    },*/

    //------------------------------------------------------------------------------------------------------------------
    //启动工厂对象
    notifyFactories: function(gameLevel)
    {
        var self = this;

        //遍历工厂对象
        this.m_FactoryObjs.forEach(
            function(facObj)
            {
                var next = facObj.getParentNode().getNext();
                if (!self.isGridMoveToEnable(next))
                {
                    return;
                }

                //工厂的下一个格子可以移动
                var newObj = facObj.createNew(gameLevel);
                if (newObj)
                {
                    //添加移动命令
                    self.addCommand(self.createMoveFromFactory(newObj, next).start(gameLevel));
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getBottomLeftAndRightBlockGrids: function(centerGrid)
    {
        if (!centerGrid)
        {
            return [];
        }

        //
        var self = this;
        var objectId = centerGrid.getObjectID();
        this.m_BottomLeftAndRightBlockGrids[objectId] = this.m_BottomLeftAndRightBlockGrids[objectId] || [];

        //
        var blockGrids = this.m_BottomLeftAndRightBlockGrids[objectId];
        if (blockGrids.length <= 0)
        {
            var array = [_GetGravityLeft(), _GetGravityRight()];
            array.forEach(
                function(direction)
                {
                    var findGrid = centerGrid.getGridByDirection(direction);
                    if (findGrid && self.isInBlockMap(findGrid) && !findGrid.isConnectTo())
                    {
                        //左右找 如果有标记就是遮挡体下的格子
                        blockGrids.push(findGrid);
                    }
                }
            );
        }

        return blockGrids;
    },

    //------------------------------------------------------------------------------------------------------------------
    isGridMoveToEnable: function(grid)
    {
        if (!grid)
        {
            return false;
        }

        var isNormal = grid instanceof cc.NormalGrid;
        var notBlock = isNormal && !grid.isBlock();
        var notDirty = isNormal && !this.isGridDirty(grid);
        var noMiddleObject = isNormal && !grid.getMiddleObject();

        //
        return isNormal && notBlock && notDirty && noMiddleObject;
    },

    //------------------------------------------------------------------------------------------------------------------
    //左右2方向 查找遮挡体标记的格子
    //斜着移动
    getMoveBiasGrid: function(gameLevel, grid)
    {
        //
        var self = this;
        var findGrids = this.getBottomLeftAndRightBlockGrids(grid);
        var validBlock = [];

        //
        findGrids.forEach(
            function(blockGrid)
            {
                //把可以斜着移动的格子筛选出来
                if (!self.isGridMoveToEnable(blockGrid))
                {
                    //普通 非遮挡 而且 没被标记占用的可以
                    return;
                }

                validBlock.push(blockGrid);

                //斜线位置上面的格子上有可移动的东西，不可以抢
                var isPreOrNextGrabNeedPop = false;
                for (var pre = blockGrid.getPre(); pre; pre = pre.getPre())
                {
                    //
                    if (!(pre instanceof cc.NormalGrid) || pre.isBlock())
                    {
                        //遇到空格子或者障碍物格子 就跳出
                        break;
                    }

                    //
                    if (self.isGridDirty(pre) || pre.getMiddleObject())
                    {
                        //如果是普通格子 如果被占用或者有东西 就跳出
                        isPreOrNextGrabNeedPop = true;
                        break;
                    }
                }

                if (isPreOrNextGrabNeedPop)
                {
                    validBlock.pop();
                }
            }
        );

        if (validBlock.length > 0)
        {
            //如果有合法的格子 就洗牌下 造成随机效果
            Tools.shuffle(validBlock);
            return validBlock.shift();
        }

        //没有合理的 返回空
        return null;
    },

    //==================================================================================================================
    gravityFinishAnimation: function(moveFinishObj)
    {
        if (!moveFinishObj)
        {
            return this;
        }

        var sprite = moveFinishObj.getSprite();
        if (!sprite)
        {
            return this;
        }

        if (moveFinishObj instanceof cc.Obj_MonsterMine)
        {
            return this;
        }

        //
        var seq0 = cc.Sequence.create(
            cc.JumpBy.create(Defines.FPS * 12, cc.p(0, 0), Defines.TABLE_GRID_SIZE * 0.15, 1),
            cc.CallFunc.create(
                function()
                {
                    moveFinishObj.updateNodePosition();
                },
                null)
        );

        seq0.setTag(Defines.GLOBAL_ACTION_TAGS.ACT_TAG_GRAVITY_MOVE);
        sprite.runAction(seq0);

        //
        var seq1 = cc.Sequence.create(
            cc.ScaleTo.create(Defines.FPS * 6, 1.1, 0.9),
            cc.ScaleTo.create(Defines.FPS * 6, 1.0, 1.0),
            cc.CallFunc.create(
                function(sender)
                {
                    sender.setScaleX(1.0);
                    sender.setScaleY(1.0);
                },
                null)
        );

        seq1.setTag(Defines.GLOBAL_ACTION_TAGS.ACT_TAG_GRAVITY_SCALE);
        sprite.runAction(seq1);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleMoveGravityFinish: function(moveGravityFinish)
    {
        if (moveGravityFinish.length <= 0)
        {
            return this;
        }

        //
        var self = this;
        var landSound = cc.AudioMng.getInstance().createLandSound();

        //加抖动动画
        moveGravityFinish.forEach(
            function(moveFinishObj)
            {
                landSound.add(moveFinishObj);
                /*_GravityFinishAnimation*/
                self.gravityFinishAnimation(moveFinishObj);
            }
        );

        //加声音
        landSound.playSound();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        if (this.isMoveAny() || this.isAnyMoveClockObjects())
        {
            //如果移动了任何东西
            //就加一个清屏的命令
            gameLevel.addCommand(cc.Cmd_EveryDestroy.create());
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        if (!this.isStart())
        {
            this.start(gameLevel);
        }

        if (!this.m_IsFinish)
        {
            //step1:
            this.commandMoves(gameLevel, time);

            //step2:
            this.afterMoveCommandsClean(gameLevel, time);

            //step3:
            this.handleFinish(gameLevel, time);
        }
        else
        {
            this.m_DelayTime += time;
        }

        return this.m_IsFinish && this.m_DelayTime > Defines.FPS * 10;
    },

    //------------------------------------------------------------------------------------------------------------------
    commandMoves: function(gameLevel, time)
    {
        if (this.m_Commands.length <= 0)
        {
            return this;
        }

        //总移动事件 添加
        this.m_TotalMoveTime += time;

        //
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

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    afterMoveCommandsClean: function(gameLevel)
    {
        if (this.m_Commands.length <= 0)
        {
            var finish = this.handleMove(gameLevel);
            if (finish.length > 0)
            {
                //有下落完成的 就添加抖动的动画
                this.handleMoveGravityFinish(finish);
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isAnyMoveClockObjects: function()
    {
        for (var prop in this.m_NeedMoveClockObjects)
        {
            if (this.m_NeedMoveClockObjects.hasOwnProperty(prop))
            {
                return true;
            }
        }

        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    fireAllNeedMoveClockObjects: function(gameLevel)
    {
        //
        for (var prop in this.m_NeedMoveClockObjects)
        {
            if (!this.m_NeedMoveClockObjects.hasOwnProperty(prop))
            {
                continue;
            }

            var clockObject = this.m_NeedMoveClockObjects[prop];
            if (clockObject)
            {
                clockObject.toFire(gameLevel);
            }
        }

        this.m_NeedMoveClockObjects = {};
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleFinish: function(gameLevel)
    {
        if (this.m_Commands.length <= 0)
        {
            //
            this.m_IsFinish = true;

            //
            this.fireAllNeedMoveClockObjects();

            //
            if (this.isMoveAny())
            {
                //一个下落时钟!
                cc.DataMng.getInstance().handleMoveClock();
            }
        }

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------

});

//
cc.Cmd_EveryMoveNext.create = function()
{
    return new cc.Cmd_EveryMoveNext();
};