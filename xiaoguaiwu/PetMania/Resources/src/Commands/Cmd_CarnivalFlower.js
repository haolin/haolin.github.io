//分数狂欢命令

//======================================================================================================================
cc.Cmd_CarnivalFlowerLevelUp = cc.ICommand.extend({

    //--------------------------------------------------------------------------------------------
    ctor: function(objList)
    {
        this._super();

        //
        this.m_DelayTime = 0;
        this.m_ObjectList = objList;
    },

    //--------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //
        var flowers = this.m_ObjectList;
        var needToFlowerLevel = FLOWER_LEVEL_DEFINE.FRUIT;
        var self = this;
        flowers.forEach(
            function(a_flower)
            {
                var newFlower = cc.Obj_Flower.create(needToFlowerLevel);
                if (!newFlower)
                {
                    return;
                }

                cc.AudioMng.getInstance().playFlowerCreate(needToFlowerLevel);

                //
                var flowerParent = a_flower.removeFromParentNode();
                //a_flower.removeFromParent();
                gameLevel.disposal(a_flower);

                //放上新的花
                flowerParent.addNode(newFlower);
                newFlower.updateNodePosition();
                newFlower.renderNode();

                //
                cc.EffectMng.getInstance().displayMonsterRunning(newFlower);

                var oldPos = newFlower.getPosition();
                var scoreType = _ParseFlowerScoreType(newFlower.getFlowerLevel());

                //直接消除了
                var visitor1 = cc.ScoreVisitorGroup.create(scoreType);
                newFlower.destroy(newFlower, gameLevel, visitor1);
                visitor1.visitFinish(oldPos);

                //
                cc.DataMng.getInstance().addTouchMoves();
            }
        );

        return this;
    },

    //--------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        //
        this.m_DelayTime += time;
        return this.m_DelayTime > Defines.FPS * 20;
    }
});

cc.Cmd_CarnivalFlowerLevelUp.create = function(objList)
{
    return new cc.Cmd_CarnivalFlowerLevelUp(objList.concat());
};

//======================================================================================================================
cc.Cmd_CarnivalFlower = cc.ICommandGroup.extend({

    ctor: function(monsterList)
    {
        this._super();
        this.m_MonsterList = monsterList;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //查找花集合
        var flowers = this.m_MonsterList;
        var normals = [];

        //
//        var table = gameLevel.getTable();
//        var itr = table.createIterForMiddleObjects();
//        for (itr.first(); !itr.isDone(); itr.next())
//        {
//            if (flowers.length >= this.m_Moves)
//            {
//                break;
//            }
//
//            var middleObj = itr.getCurrent();
//            if (!middleObj)
//            {
//                continue;
//            }
//
//            if (middleObj.description() == "Obj_Monster")
//            {
//                normals.push(middleObj);
//            }
//            else if (middleObj instanceof cc.Obj_Flower)
//            {
//                flowers.push(middleObj);
//            }
//        }

        if (flowers.length > 0)
        {
            //
            var cmd0 = cc.Cmd_CarnivalFlowerLevelUp.create(flowers);
            this.addCommand(cmd0);

            //
            var cmd1 = cc.Cmd_EveryMoveNext.create();
            cmd1.finish = function()
            {

            };

            this.addCommand(cmd1);

            //
            var cmd2 = cc.Cmd_EveryDestroy.create();
            cmd2.finish = function()
            {

            };

            this.addCommand(cmd2);

            //
            var cmd3 = cc.Cmd_EveryMoveNext.create();
            cmd3.finish = function()
            {

            };

            this.addCommand(cmd3);
        }

        //
        var leftMoves = this.m_Moves - flowers.length;
        if (leftMoves < 0)
        {
            leftMoves = 0;
        }

        //
        Tools.shuffle(normals);
        normals = normals.slice(0, leftMoves);

        //
        if (normals.length > 0)
        {
            // 生成3级花
            cmd0 = cc.Cmd_CarnivalFlowerLevelUp.create(normals);
            this.addCommand(cmd0);

            cmd1 = cc.Cmd_EveryMoveNext.create();
            cmd1.finish = function()
            {

            };
            this.addCommand(cmd1);

            cmd2 = cc.Cmd_EveryDestroy.create();
            cmd2.finish = function()
            {

            };
            this.addCommand(cmd2);

            //
            cmd3 = cc.Cmd_EveryMoveNext.create();
            cmd3.finish = function()
            {

            };
            this.addCommand(cmd3);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        return this.m_Commands.length <= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        gameLevel.addCommand(cc.Cmd_EveryDestroy.create());
        return this;
    }
});

cc.Cmd_CarnivalFlower.create = function(monsterList)
{
    return new cc.Cmd_CarnivalFlower(monsterList);
};



