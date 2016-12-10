//染色剂	只在计数模式下起效 step1 选取剩余目标多的怪物的颜色 2在棋盘上选取不是这个颜色的怪物染色 最多3个

cc.Touch_ByItemToMonsStaining = cc.Touch_ByItem.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(srcPos)
    {
        this._super();
        this._srcPos = srcPos;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Touch_ByItemToMonsStaining";
    },

    //------------------------------------------------------------------------------------------------------------------
    _parseTargets: function()
    {
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        var sortArray = [];

        var targets = curLevelData.TARGET_DES_DATA.concat();
        targets.forEach(
            function (a_target)
            {
                //
                var current = /*cc.DataMng.getInstance().getRecordColor*/DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyMonsterByColorContent(a_target.color) || 0;
                a_target.num = a_target.num || 0;

                //
                var left = a_target.num - current;
                if (left > 0)
                {
                    var a_sortData = {

                        color: a_target.color,
                        left: left,

                        toString: function()
                        {
                            return a_sortData.color + " = " + left + "";
                        }
                    };

                    sortArray.push(a_sortData);
                }
            }
        );

        if (sortArray.length > 0)
        {
            //排序一下 只染色剩余的最多的
            sortArray.sort(
                function(left, right)
                {
                    return left.left > right.left ? -1 : 1;
                }
            );
        }

        return sortArray;
    },

    //------------------------------------------------------------------------------------------------------------------
    _getStainingFromGameLevel: function(gameLevel, targetColor, count)
    {
        var res = [];

        //
        var table = gameLevel.getTable();
        var itr = table.createIterForMiddleObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var mons = itr.getCurrent();
            if (mons && mons.isNormal() && mons.getColor() != targetColor)
            {
                res.push(mons);
            }
        }

        //
        Tools.shuffle(res);
        cc.log("所有的染色目标 = " + res);

        if (res.length > count)
        {
            res = res.slice(0, count);
        }

        return res;
    },

    //------------------------------------------------------------------------------------------------------------------
    _runEffect: function(gameLevel, targets, color)
    {
        cc.log("_runEffect color = " + color);

        //
        var self = this;
        var finishCount = 0;
        var finishCallBack = function()
        {
            ++finishCount;
            if (finishCount >= targets.length)
            {
                cc.log("完成染色");
                self.endTransposition(gameLevel);
            }
        };

        //
        /*var targetRect = cc.GUIGameLevel.getInstance().getButtonItemRectForGuide(2);
        var startPos = cc.p(
            targetRect.x + targetRect.width/2,
            targetRect.y + targetRect.height/2
        );*/

        targets.forEach(
            function (object)
            {
                var endPosition = object.getPosition();
                cc.EffectMng.getInstance().displayStaining(
                    self._srcPos,
                    endPosition,
                    function()
                    {
                        //
                        cc.log("染色了一个 = " + object);
                        var grid = object.removeFromParentNode();
                        var createNew = cc.Obj_Monster.create(color);
                        gameLevel.disposal(object);

                        //
                        grid.addNode(createNew);
                        createNew.updateNodePosition();
                        createNew.renderNode();

                        //
                        finishCallBack();
                    }
                );
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function (gameLevel)
    {
        cc.log("进入染色剂的流程");

        //step1
        var sortArray = this._parseTargets(gameLevel);
        if (sortArray.length <= 0)
        {
            cc.log("没有可以染色的了!!!直接返回");
            this.endTransposition(gameLevel);
            return this;
        }

        //
        cc.log("染色剂的目标信息 = " + sortArray);
        var firstData = sortArray.shift();

        //step2
        cc.log("染色剂的目标颜色 = " + firstData.color);
        var targets = this._getStainingFromGameLevel(gameLevel, firstData.color, 3);
        if (targets.length <= 0)
        {
            cc.log("选取不出来目标???!!!直接返回");
            this.endTransposition(gameLevel);
            return this;
        }

        //step3 直接扣钱
        cc.log("选取的染色剂的目标 = " + targets);
        cc.DataMng.getInstance().useItemById(Defines.GameItems.ITEM_STAINING.ID);
        this._runEffect(gameLevel, targets, firstData.color);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    endTransposition: function(gameLevel)
    {
        cc.log("退出染色剂的流程");

        this.m_IsFinish = true;
        this.forcedInterrupt();
        gameLevel.addCommand(cc.Cmd_EveryDestroy.create());

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    swallowMoveTouch: function()
    {
        return true;
    }

    //------------------------------------------------------------------------------------------------------------------
});

//工厂方法
cc.Touch_ByItemToMonsStaining.create = function(srcPos)
{
    return new cc.Touch_ByItemToMonsStaining(srcPos);
};
