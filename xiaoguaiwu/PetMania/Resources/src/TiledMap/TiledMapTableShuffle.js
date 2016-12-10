
var TiledMapTableShuffle = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_ShuffleTable = null;
        this.m_Factories = [];
        this.m_NormalGrids = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(table)
    {
        //拿引用
        this.m_ShuffleTable = table;

        //工厂记录下来
        var itr = table.createIterForEmptyObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var obj = itr.getCurrent();
            if (!obj)
            {
                continue;
            }

            if (obj instanceof cc.Obj_Factory)
            {
                this.m_Factories.push(obj);
            }
        }

        //普通的各自记录下来
        this.m_NormalGrids = this.m_ShuffleTable.getNormalGrids().concat();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    shuffle: function(shuffleCount, needTest)
    {
        var result = true;

        var shuffleCurCount = 0;
        while (shuffleCurCount < shuffleCount)
        {
            ++shuffleCurCount;

            var objects = this.shuffle_first();
            this.shuffle_again(objects);

            if (needTest)
            {
                if (!this.shuffle_test())
                {
                    result = false;
                    break;
                }
            }
        }

        return result;
    },

    //------------------------------------------------------------------------------------------------------------------
    shuffle_first: function()
    {
        cc.log("TiledMapTableShuffle shuffle!!!!!!!");

        //
        var grids = [];
        var objects = [];

        //
        this.m_NormalGrids.forEach(
            function(grid)
            {
                if (grid.isBlock())
                {
                    //笼子下面的小怪物也洗掉
                    var topObj = grid.getTopObject();
                    if (!topObj || topObj.description() != "Obj_Lock")
                    {
                        return;
                    }
                }

                //
                var middleObj = grid.getMiddleObject();
                if (!middleObj || !middleObj.getColor || middleObj.getColor() == Defines.COLOR.NULL)
                {
                    return;
                }

                //
                grids.push(grid);
                objects.push(middleObj);
            }
        );

        //
        Tools.shuffle(objects);

        //
        objects.forEach(
            function(obj)
            {
                obj.removeFromParentNode();
            }
        );

        grids.forEach(
            function(grid, index)
            {
                var a_obj = objects[index];
                if (a_obj)
                {
                    grid.addNode(a_obj);
                    a_obj.updateNodePosition();
                }
            }
        );

        //
        var rulesArray = [];
        objects.forEach(
            function(obj)
            {
                //压入规则
                var a_rule = obj.getDestroyRule();
                if (a_rule && a_rule.parse().can())
                {
                    rulesArray.push(a_rule);
                }
            }
        );

        //
        cc.log("rulesArray.length = " + rulesArray.length);
        if (rulesArray.length <= 0)
        {
            cc.log("shuffle OK!!! no rulesArray");
            return null;
        }

        //把还能消除的 整理出来
        var dirty = {};
        rulesArray.forEach(
            function(rule)
            {
                if (rule.getSrcObj())
                {
                    var srcId = rule.getSrcObj().getObjectID();
                    dirty[srcId] = true;
                }

                if (rule.getObjects())
                {
                    rule.getObjects().forEach(
                        function(obj)
                        {
                            dirty[obj.getObjectID()] = true;
                        }
                    )
                }
            }
        );

        //
        var dirtyLen = 0;
        for (var prop in dirty)
        {
            if (dirty.hasOwnProperty(prop) && dirty[prop])
            {
                ++dirtyLen;
            }
        }

        //
        cc.log("dirtyLen = " + dirtyLen);
        return objects.filter(
            function(obj)
            {
                //炸弹的放弃掉
                return dirty[obj.getObjectID()] && !(obj instanceof cc.Obj_Bomb);
            }
        );
    },

    //------------------------------------------------------------------------------------------------------------------
    shuffle_again: function(dirtyObjs)
    {
        if (!dirtyObjs || !(dirtyObjs instanceof Array))
        {
            return this;
        }

        var grids = [];
        dirtyObjs.forEach(
            function(obj)
            {
                grids.push(obj.removeFromParentNode());
            }
        );

        Tools.shuffle(dirtyObjs);
        dirtyObjs.forEach(
            function(obj, index)
            {
                grids[index].addNode(obj);
                obj.updateNodePosition();
            }
        );

        var shuffleCount = 0;
        var shuffleMax = 100; //一百次都洗不出来 就放弃

        var factory = Tools.arrayRandom(this.m_Factories);
        while (shuffleCount < shuffleMax)
        {
            ++shuffleCount;

            var finish = true;


            dirtyObjs.forEach(
                function(obj, index, array)
                {
                    var a_rule = obj.getDestroyRule();

                    var canDestory = (a_rule && a_rule.parse().can());
                    if (canDestory)
                    {
                        cc.log("obj ->" + obj);
                        var pa = obj.removeFromParentNode();
                        obj.release();

                        //
                        var createNew = factory._create();
                        if (createNew)
                        {
                            pa.addNode(createNew);
                            createNew.renderNode();
                            createNew.updateNodePosition();
                            cc.log("createNew ->" + createNew);
                            array[index] = createNew;
                        }

                        finish = false;
                    }
                }
            );

            if (finish)
            {
                break;
            }
        }

        cc.log("shuffle Count = " + shuffleCount);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    shuffle_test: function()
    {
        for (var index = 0; index < this.m_NormalGrids.length; ++index)
        {
            var grid = this.m_NormalGrids[index];
            if (grid.isBlock())
            {
                //笼子下面的小怪物也洗掉
                var topObj = grid.getTopObject();
                if (!topObj || topObj.description() != "Obj_Lock")
                {
                    continue;
                }
            }

            //
            var middleObj = grid.getMiddleObject();
            if (!middleObj || !middleObj.getColor || middleObj.getColor() == Defines.COLOR.NULL)
            {
                continue;
            }

            var a_rule = middleObj.getDestroyRule();
            var canDestory = (a_rule && a_rule.parse().can());
            if (canDestory)
            {
                cc.log(0, "shuffle_test false!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                return false;
            }
        }

        return true;
    }
    //------------------------------------------------------------------------------------------------------------------

});

TiledMapTableShuffle.create = function(table)
{
    var createNew = new TiledMapTableShuffle();
    if (createNew)
    {
        createNew.init(table);
    }

    return createNew;
};