//======================================================================================================================
//======================================================================================================================
var TiledMapPipePaths =  cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        //
        this._pathProperties = [];
        this._pathEvProperties = [];
        this._pathNodes = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    _parser: function(property)
    {
        var parser = {};
        parser.array = property.split("|");
        cc.log("创建分析属性的对象 = " + parser.array);

        parser.getPathName = function()
        {
            return parser.array[0];
        };

        parser.getPathType = function()
        {
            return parser.array[1];
        };

        parser.getPathParams = function()
        {
            return parser.array[2];
        };

        return parser;
    },

    //------------------------------------------------------------------------------------------------------------------
    addPathProperty: function(property)
    {
        this._pathProperties.push(property);
        return this._pathProperties;
    },

    //------------------------------------------------------------------------------------------------------------------
    _parserEvent: function(evProperty)
    {
        var parser = {};
        parser.array = evProperty.split("|");
        cc.log("创建分析事件的对象 = " + parser.array);

        parser.getPathName = function()
        {
            return parser.array[0];
        };

        //创建等级队列
        parser.getLevelSeq = function()
        {
            var levelSeq = parser.array[1].split(",");
            levelSeq.forEach(
                function(level, index, array)
                {
                    array[index] = parseInt(level);
                }
            );

            return levelSeq;
        };

        //其它事件添加

        return parser;
    },

    //------------------------------------------------------------------------------------------------------------------
    addPathEvProperty: function(evProperty)
    {
        this._pathEvProperties.push(evProperty);
        return this._pathEvProperties;
    },

    //------------------------------------------------------------------------------------------------------------------
    createPathByProperty: function(property)
    {
        //
        cc.log("property = " + property);
        var parser = this._parser(property);

        //
        cc.log("pathName = " + parser.getPathName());
        cc.log("pathType = " + parser.getPathType());
        cc.log("param = " + parser.getPathParams());

        //
        if (parser.getPathType() == Property.Unidirection)
        {
            return TMXPipePath_Unidirection.create(
                parser.getPathName(),
                parser.getPathParams());
        }
        else if (parser.getPathType() == Property.Circle)
        {
            return TMXPipePath_Circle.create(
                parser.getPathName(),
                parser.getPathParams());
        }
        else
        {
            cc.Assert(0, "" + parser.getPathType());
        }

        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    addPathNode: function(node)
    {
        this._pathNodes.push(node);
        return this._pathNodes;
    },

    //------------------------------------------------------------------------------------------------------------------
    pathNodeToPathMap: function(node, pathMap)
    {
        if (!(node instanceof cc.Obj_PipelinePathNode))
        {
            return this;
        }

        var name = node.getPathName();
        if (name instanceof Array)
        {
            var mutiNames = name.concat();
            mutiNames.forEach(
                function(a_name)
                {
                    //每个全加上
                    var a_path = pathMap[a_name];
                    if (a_path)
                    {
                        a_path.addNode(node);
                    }
                    else
                    {
                        cc.Assert(0, "没有这个名字? 2222 = " + a_name);
                    }
                }
            );
        }
        else
        {
            //
            var a_path = pathMap[name];
            if (a_path)
            {
                a_path.addNode(node);
            }
            else
            {
                cc.Assert(0, "没有这个名字? 111 = " + node.getPathName());
            }
        }

        return pathMap;
    },

    //------------------------------------------------------------------------------------------------------------------
    buildPaths: function(createNewTable)
    {
        var self = this;

        //Step1:根据地图属性构造路径
        var tablePathsMap = {}; //createNewTable.getPipePaths();
        this._pathProperties.forEach(
            function(property)
            {
                //根据地图属性构造路径
                var newPath = self.createPathByProperty(property);
                if (newPath)
                {
                    tablePathsMap[newPath.getPathName()] = newPath;
                }
            }
        );

        //step2:添加路径事件
        this._pathEvProperties.forEach(
            function(evProperty)
            {
                var evParser = self._parserEvent(evProperty);
                var evPath = tablePathsMap[evParser.getPathName()];
                if (evPath)
                {
                    evPath.addLevelSequence(evParser.getLevelSeq());
                }
            }
        );

        //Step3:将路径点 添加给path
        this._pathNodes.forEach(
            function(a_node)
            {
                //将路径点 添加给path
                self.pathNodeToPathMap(a_node, tablePathsMap);
            }
        );

        //Step4: 全部构造开始
        for (var name in tablePathsMap)
        {
            if (tablePathsMap.hasOwnProperty(name))
            {
                tablePathsMap[name].build();
                tablePathsMap[name].updateTransState();
            }
        }

        createNewTable.setPipePaths(tablePathsMap);

        return this;
    }
});

//
TiledMapPipePaths.create = function(properties, evProperties)
{
    var createNew = new TiledMapPipePaths();

    //
    for (var proKey in properties)
    {
        if (properties.hasOwnProperty(proKey))
        {
            cc.log(proKey + " = " + properties[proKey]);
            createNew.addPathProperty(properties[proKey]);
        }
    }

    //
    for (var evProKey in evProperties)
    {
        if (evProperties.hasOwnProperty(evProKey))
        {
            cc.log(evProKey + " = " + evProperties[evProKey]);
            createNew.addPathEvProperty(evProperties[evProKey]);
        }
    }

    return createNew;
};