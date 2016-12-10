//======================================================================================================================
var PipelineEvent = cc.Class.extend({

    //==================================================================================================================
    ctor: function()
    {
        this._eventName = "";
        this._eventType = "";
        this._eventArgus = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return this._eventName;
    },

    //------------------------------------------------------------------------------------------------------------------
    parse: function(property)
    {
        var propArray = property.split("|");

        //
        this._eventName = propArray[0] || "";
        this._eventType = propArray[1] || "";

        //
        if (propArray[2])
        {
            var propArgus = propArray[2] || "";

            //
            var self = this;
            propArgus.split(",").forEach(
                function(argu)
                {
                    self._eventArgus.push(parseInt(argu));
                }
            );
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    check: function()
    {
        var isComplete = true;

        //
        if (!this._eventName)
        {
            isComplete = false;
        }

        //创建新的蛇的事件
        if (this._eventName == Property.Create)
        {
            if (this._eventType == "" || this._eventArgus.length <= 0)
            {
                isComplete = false;
            }
        }

        //
        if (!isComplete)
        {
            var curLevelData = cc.DataMng.getInstance().getCurLevelData();
            cc.log(curLevelData.NAME + ": " + this + "的蛇道事件没有配全");
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getEventName: function()
    {
        return this._eventName;
    },

    //------------------------------------------------------------------------------------------------------------------
    getEventType: function()
    {
        return this._eventType;
    },

    //------------------------------------------------------------------------------------------------------------------
    getEventArgus: function()
    {
        return this._eventArgus;
    }

});

PipelineEvent.create = function(property)
{
    var createNew = new PipelineEvent();
    createNew.parse(property);
    createNew.check();
    return createNew;
};

//======================================================================================================================
var PipeAndSnakeGameEvent = cc.Class.extend({

    //==================================================================================================================
    ctor: function()
    {
        this._eventsMap = {};
    },

    //==================================================================================================================
    catchPathNodeEvent: function(key, newEvent)
    {
        this._eventsMap[key] = this._eventsMap[key] || [];
        this._eventsMap[key].push(newEvent);

        cc.log("key = " + key + ", newEvent = " + newEvent);
        return this;
    },

    //==================================================================================================================
    cleanUp: function()
    {
        this._eventsMap = {};
        return this._eventsMap;
    },

    //==================================================================================================================
    getPathEventsByKey: function(key)
    {
        this._eventsMap[key] = this._eventsMap[key] || [];
        return this._eventsMap[key];
    }

    //==================================================================================================================

});

PipeAndSnakeGameEvent._instance = null;
PipeAndSnakeGameEvent.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new PipeAndSnakeGameEvent();
    }

    return this._instance;
};

//======================================================================================================================
cc.PipeAndSnakeGame = cc.A_RoundEndEvent.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //
        this._running = false;
        this._stopForARoundMap = {};
        this._failed = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this._super();

        //
        this._running = false;
        this._stopForARoundMap = {};
        this._failed = false;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "PipeAndSnakeGame";
    },

    //------------------------------------------------------------------------------------------------------------------
    isRunning: function()
    {
        return this._running;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(gameLevel)
    {
        this.cleanUp();

        this._running = gameLevel.getTable().getPipePaths();
        if (!this.isRunning())
        {
            cc.log("不是贪食蛇模式 放弃初始化");
            return this;
        }

        //
        cc.log("是贪食蛇模式 初始化!!!!!!!");
        this.test(gameLevel);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    test: function(gameLevel)
    {
        //
        var itr = gameLevel.getTable().createIterForSnakeObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            //
            var pathNode = itr.getPathNode();
            if (!pathNode)
            {
                cc.log("这个格子有问题, 没有路径点 = " + itr.getGrid());
                cc.Assert(0, "!pathNode");
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    roundEnd: function(gameLevel)
    {
        this._super();

        if (!this.isRunning())
        {
            return this;
        }

        //破冰
        this.breakIce(gameLevel);

        //检查全部都是空的情况
        var isAllPathEmpty = this.checkAllPaths(gameLevel);
        if (!isAllPathEmpty)
        {
            //移动蛇
            this.moveSnakes(gameLevel);
        }

        //
        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    checkAllPaths: function(gameLevel)
    {
        //总长度小于SNAKES_MIN就要创建蛇
        var allLength = 0;
        var lengthsMap = {};
        var eventsMap = {};

        var pathsMap = gameLevel.getTable().getPipePaths();
        for (var pathName in pathsMap)
        {
            if (!pathsMap.hasOwnProperty(pathName))
            {
                continue;
            }

            //
            var path = pathsMap[pathName];
            var checkRes = path.checkPath();
            eventsMap[pathName] = eventsMap[pathName] || [];

            //
            allLength += checkRes.levelsLength();
            lengthsMap[pathName] = checkRes.levelsLength();

            //
            if (checkRes.isFull())
            {
                eventsMap[pathName].push(PipelineEvent.create(Property.PathFull));
            }
            else if (checkRes.isEmpty())
            {
                eventsMap[pathName].push(PipelineEvent.create(Property.CleanUp));
            }
        }

        //查找最小长度
        var minPathName = null;
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        if (allLength <= curLevelData.SNAKES_MIN)
        {
            for (var lengthName in lengthsMap)
            {
                if (!lengthsMap.hasOwnProperty(lengthName))
                {
                    continue;
                }

                if (!minPathName || lengthsMap[lengthName] < lengthsMap[minPathName])
                {
                    minPathName = lengthName;
                }
            }
        }

        if (minPathName)
        {
            var hasCleanUpEv = eventsMap[minPathName].some(
                function(event)
                {
                    return event.getEventName() == Property.CleanUp;
                }
            );

            if (!hasCleanUpEv)
            {
                eventsMap[minPathName].push(PipelineEvent.create(Property.CleanUp));
            }
        }

        //
        var anyEvent = false;
        for (var pathName1 in eventsMap)
        {
            if (!eventsMap.hasOwnProperty(pathName1))
            {
                continue;
            }

            var events = eventsMap[pathName1];
            events.forEach(
                function(an_event)
                {
                    anyEvent = true;
                    PipeAndSnakeGameEvent.getInstance().catchPathNodeEvent(pathName1, an_event);
                }
            );
        }

        if (anyEvent)
        {
            this.fireEvent(gameLevel);
        }

        return allLength <= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    moveSnakes: function(gameLevel)
    {
        var pathsMap = gameLevel.getTable().getPipePaths();
        var paths = [];

        for (var pathName in pathsMap)
        {
            if (!pathsMap.hasOwnProperty(pathName))
            {
                continue;
            }

            if (this._stopForARoundMap[pathName])
            {
                cc.log("this._stopForARoundMap = " + pathName);
                delete this._stopForARoundMap[pathName];
                continue;
            }

            paths.push(pathsMap[pathName]);
        }

        if (paths.length > 0)
        {
            Tools.shuffle(paths);

            //
            var groupCmd = null;
            paths.forEach(
                function(a_path)
                {
                    var subCmd = a_path.command();
                    if (subCmd)
                    {
                        groupCmd = groupCmd || Cmd_PipePathGroup.create();
                        groupCmd.addCommand(subCmd);
                    }
                }
            );

            if (groupCmd)
            {
                gameLevel.addCommand(groupCmd);
            }
        }

        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    fireEvent: function(gameLevel)
    {
        var self = this;

        var pathsMap = gameLevel.getTable().getPipePaths();
        for (var pathName in pathsMap)
        {
            if (!pathsMap.hasOwnProperty(pathName))
            {
                continue;
            }

            var eventsOfPath = PipeAndSnakeGameEvent.getInstance().getPathEventsByKey(pathName);
            eventsOfPath.forEach(
                function(a_event)
                {
                    cc.log(pathName + "蛇道事件: " + a_event);
                    var eventName = a_event.getEventName();

                    //
                    if (eventName == Property.Create || eventName == Property.CleanUp)
                    {
                        var a_path = pathsMap[pathName];
                        var frontNode = a_path.frontNode();
                        if (!frontNode || frontNode.getMiddleObject())
                        {
                            return;
                        }

                        if (eventName == Property.Create)
                        {
                            var eventType = a_event.getEventType();
                            if (eventType == Property.Assign)
                            {
                                var eventArgus = a_event.getEventArgus();
                                var snakeLevel = eventArgus[0];
                            }
                            else if (eventType == Property.Rand)
                            {
                                snakeLevel = Tools.rangeRandom(1, 3, true);
                            }

                            //
                            var newSnake = cc.Obj_Snake.create(snakeLevel || 1);

                            if (a_path instanceof TMXPipePath_Unidirection)
                            {
                                //Property.CleanUp 是不需要的
                                newSnake.lock();
                            }

                            //
                            var createCmd = Cmd_PipePathSnakeCreate.create(newSnake, frontNode);
                            if (createCmd)
                            {
                                gameLevel.addCommand(createCmd);
                            }
                        }
                        else if (eventName == Property.CleanUp)
                        {
                            //
                            delete self._stopForARoundMap[pathName];

                            //
                            var levelSequences = a_path.getLevelSequence();
                            cc.log("移动队列：" + levelSequences);

                            //
                            var newSnakes = [];
                            var levelSeq = levelSequences[0] || [1];

                            levelSeq.forEach(
                                function(level)
                                {
                                    newSnakes.push(cc.Obj_Snake.create(level || 1));
                                }
                            );

                            //
                            var seqMoveCmd = Cmd_PipePathSnakeCreateAndMoveGroup.create(newSnakes, a_path);
                            if (seqMoveCmd)
                            {
                                gameLevel.addCommand(seqMoveCmd);
                            }
                        }
                    }
                    else if (eventName == Property.Failed || eventName == Property.PathFull)
                    {
                        cc.log("游戏失败!!!!!!! = " + a_event);
                        self._failed = true;
                    }
                }
            );
        }

        //必须清除一下
        PipeAndSnakeGameEvent.getInstance().cleanUp();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    checkFailed: function(/*gameLevel*/)
    {
        return this._failed;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleVisitFinish: function(visitor)
    {
        var self = this;
        visitor.getElements().forEach(
            function(element)
            {
                if (!(element instanceof cc.Obj_Snake))
                {
                    return;
                }

                element.getSavePathNames().forEach(
                    function(a_name)
                    {
                        cc.log("handleVisitFinish = " + a_name + "停止行动一局!!!!");
                        self._stopForARoundMap[a_name] = true;
                    }
                );
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    useIce: function(gameLevel, iceCount)
    {
        //测试用 待整理!!!!!
        //this._iceStop = iceCount || 3;
        //cc.log("添加冰块 = " + this._iceStop);

        //
        var pathsMap = gameLevel.getTable().getPipePaths();
        for (var pathName in pathsMap)
        {
            if (!pathsMap.hasOwnProperty(pathName))
            {
                continue;
            }

            var path = pathsMap[pathName];

            //
            var totalGroups = [];
            var group = [];
            var dirty = {};

            //
            for (var node = path.frontNode(); node; node = node.getPipeNext(pathName))
            {
                if (dirty[node.getObjectID()])
                {
                    break;
                }

                dirty[node.getObjectID()] = true;

                //
                if (node.getSnakeObj())
                {
                    group.push(node.getSnakeObj().getParentNode());
                }
                else
                {
                    if (group.length > 0)
                    {
                        totalGroups.push(group.concat());
                        group = [];
                    }
                }
            }

            //最后再添加一下
            if (group.length > 0)
            {
                totalGroups.push(group.concat());
            }

            var addIce = [];

            cc.log("分段检查-------------------------------");
            totalGroups.forEach(
                function(a_group)
                {
                    //
                    var pre = a_group[0].getPipePre(pathName);
                    var next = a_group[a_group.length - 1].getPipeNext(pathName);

                    //
                    cc.log("a_group = " + a_group);
                    cc.log("pre = " + pre);
                    cc.log("next = " + next);

                    if (pre)
                    {
                        addIce.push(pre);
                    }

                    if (next)
                    {
                        addIce.push(next);
                    }
                }
            );

            //
            dirty = {};
            addIce.forEach(
                function(grid)
                {
                    if (!grid || dirty[grid.getObjectID()])
                    {
                        return;
                    }

                    if (grid.getSnakeObj())
                    {
                        return;
                    }

                    //
                    cc.log("添加了冰块???? = " + grid);
                    dirty[grid.getObjectID()] = true;

                    //
                    var snaleIce = cc.Obj_SnakeIce.create(iceCount);
                    grid.addNode(snaleIce);
                    snaleIce.updateNodePosition();
                    snaleIce.renderNode();
                }
            );
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    breakIce: function(gameLevel)
    {
        //cc.log("破冰破冰破冰破冰破冰 = " + this._iceStop);

        //
        var pathsMap = gameLevel.getTable().getPipePaths();
        for (var pathName in pathsMap)
        {
            if (!pathsMap.hasOwnProperty(pathName))
            {
                continue;
            }

            var path = pathsMap[pathName];
            var dirty = {};

            //
            for (var node = path.frontNode(); node; node = node.getPipeNext(pathName))
            {
                if (dirty[node.getObjectID()])
                {
                    break;
                }

                //
                dirty[node.getObjectID()] = true;
                if (node.getSnakeObj() && node.getSnakeObj() instanceof cc.Obj_SnakeIce)
                {
                    cc.EffectMng.getInstance().displayIceDestroy(
                        node.getSnakeObj().getPosition()
                    );

                    node.getSnakeObj().snakeBreakIce(gameLevel);
                }
            }
        }

        return this;
    }
});

cc.PipeAndSnakeGame._instance = null;
cc.PipeAndSnakeGame.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.PipeAndSnakeGame();
        this._instance.cleanUp();

        //
        cc.RoundEndEventsManager.getInstance().addChildEventMng(this._instance);
    }

    return this._instance;
};



