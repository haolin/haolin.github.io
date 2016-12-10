//消除命令: 多彩糖果

//======================================================================================================================
var Cmd_FlowerLevelUpMax = cc.ICommand.extend({

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

        //
        var visitor = cc.ScoreVisitorGroup.create(
            _ParseFlowerScoreType(this.object.getFlowerLevel())
        );

        var newFlower = cc.Obj_Flower.create(_GetCurGameLevelMaxFlowersLevel());
        cc.AudioMng.getInstance().playFlowerCreate(_GetCurGameLevelMaxFlowersLevel());

        var grid = this.object.getParentNode();
        gameLevel.disposal(this.object);

        //放上新的花
        grid.addNode(newFlower);
        newFlower.updateNodePosition();
        newFlower.renderNode();
        //cc.DataMng.getInstance().recordCreate(newFlower);
        DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().addCreateObjectWhenGameLevelRunning(newFlower);
        this.object = newFlower;

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
var Cmd_SubDesByColor = cc.ICommand.extend({

    ctor: function(fromPosition, toPosition, centerObj, object)
    {
        this._super();

        //
        this.fromPosition = fromPosition;
        this.toPosition = toPosition;

        //
        this.centerObj = centerObj;
        this.object = object;

        //
        this.isFinish = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        var self = this;
        cc.EffectMng.getInstance().displayColorfulEffectLight(
            this.fromPosition,
            this.toPosition,
            function()
            {
                cc.AudioMng.getInstance().playColorfulDestroy();
                cc.EffectMng.getInstance().displayColorfulEffectExplode(self.toPosition);
                self.isFinish = true;
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        this._super(gameLevel);

        //
        var visitor = cc.ScoreVisitorSingle.create(Defines.SCORE_TYPE.SCORE_DES_BY_COLOR);
        this.object.destroy(this.centerObj, gameLevel, visitor);
        visitor.visitFinish();

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
cc.Cmd_DesByColor = cc.ICommandGroup.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(centerObject, swapOtherObject, objects)
    {
        this._super();

        //重构
        this.centerObject = centerObject;
        this.swapOtherObject = swapOtherObject;
        this.objects = objects;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //
        if (_IsAnyBubbleCoverMonster(this.centerObject))
        {
            this.desBubbleBeforeHandle(this.centerObject);
        }

        //
        if (_IsAnyBubbleCoverMonster(this.swapOtherObject))
        {
            this.desBubbleBeforeHandle(this.swapOtherObject);
        }

        //
        this._objects(gameLevel);

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    desBubbleBeforeHandle: function(object, gameLevel)
    {
        //
        if (_IsAnyBubbleCoverMonster(object))
        {
            //有泡泡就直接把泡泡删除掉
            var visitor = cc.ScoreVisitorSingle.create(Defines.SCORE_TYPE.SCORE_DES_BY_COLOR);
            object.destroy(object, gameLevel, visitor);
            visitor.visitFinish();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _objects: function(gameLevel)
    {
        var self = this;
        var createDestoryObj = new cc.Obj_MonsterColorfulDestroy();
        _DiaryDestroyNodeObject(createDestoryObj);

        //
        Tools.shuffle(this.objects);
        var positions = [];
        this.objects.forEach(
            function(obj)
            {
                positions.push(obj.getPosition());
            }
        );

        //
        positions.unshift(this.centerObject.getPosition());

        //
        var vis = cc.ScoreVisitorSingle.create(Defines.SCORE_TYPE.SCORE_DES_BY_COLOR);
        this.centerObject.destroy(this.centerObject, gameLevel, vis);
        vis.visitFinish();

        //临时这么写 需要重构
        //当前的方式是用同色消除的彩球连接一个合体怪物时，消除一个随机颜色的所有小怪。在此基础上再增加一项，被连接的那个合体怪物立即升一级。
        if (this.swapOtherObject && this.swapOtherObject instanceof cc.Obj_Flower)
        {
            self.addCommand(
                new Cmd_FlowerLevelUpMax(this.swapOtherObject)
            );
        }

        //
        positions.forEach(
            function(pos, index, array)
            {
                if (index < array.length - 1)
                {
                    self.addCommand(
                        new Cmd_SubDesByColor(pos, array[index + 1], self.centerObject, self.objects[index])
                    );
                }
            }
        );

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
        this._super(gameLevel);
        return this;
    }
});

//
cc.Cmd_DesByColor.colorfulStrategy = function(table, desColor)
{
    //
    var res = [];
    var colorsMap = {};

    //
    var itr = table.createIterForMiddleObjects();
    for (itr.first(); !itr.isDone(); itr.next())
    {
        var object = itr.getCurrent();
        if (!object || !(object instanceof cc.Obj_Monster))
        {
            continue;
        }

        //雾霾下
        var grid = object.getParentNode();
        if (grid && (grid.getCeilObject() instanceof cc.Obj_Haze))
        {
            continue;
        }

        //
        if (desColor)
        {
            if (desColor != Defines.COLOR.NULL
                && desColor == object.getColor()
                && !object.isFire()
                && !(object instanceof cc.Obj_MonsterUnwrap))
            {
                res.push(object);
            }
        }
        else
        {
            if (object.getColor() != Defines.COLOR.NULL
                && !object.isFire()
                && !(object instanceof cc.Obj_MonsterUnwrap))
            {
                colorsMap[object.getColor()] = colorsMap[object.getColor()] || [];
                colorsMap[object.getColor()].push(object);
            }
        }
    }

    //
    if (res.length <= 0)
    {
        var sortArray = [];

        for (var color in colorsMap)
        {
            if (colorsMap.hasOwnProperty(color))
            {
                //添加数据，为了排序
                sortArray.push(
                    {
                        color: color,
                        objects: colorsMap[color]
                    }
                );
            }
        }

        //消除颜色最多的
        sortArray.sort(
            function(left, right)
            {
                return left.objects.length > right.objects.length ? -1 : 1;
            }
        );

        //输出一下
        sortArray.forEach(
            function(a_sortData)
            {
                cc.log("color = " + a_sortData.color + ", objects = " + a_sortData.objects);
            }
        );

        if (sortArray.length > 0)
        {
            //最终结果
            res = res.concat(Tools.shuffle(sortArray.shift().objects));
        }
    }

    //
    cc.log("_ColorfulStrategy最后的结果 = " + res);
    return res;
};

cc.Cmd_DesByColor.create = function(centerObject, swapOtherObject)
{
    //var color = centerObject.getFireColor();
    /*if (swapOtherObject && (swapOtherObject instanceof cc.Obj_Monster)
        && (swapOtherObject.isNormal() || swapOtherObject instanceof cc.Obj_MonsterAddTime))
    {
        color = swapOtherObject.getColor();
    }*/

    if (!(centerObject instanceof cc.Obj_MonsterColorful))
    {
        cc.log("error cc.Cmd_DesByColor.create");
    }

    return new cc.Cmd_DesByColor(centerObject,
        swapOtherObject,
        cc.Cmd_DesByColor.colorfulStrategy(
            centerObject.getParentNode().getParentNode(),
            centerObject.getFireColor()));
};





