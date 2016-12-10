//多彩和条纹互换 桌面上所有的 同色全部染成条纹的
//然后激活一个，进行连锁消除 + 下落，再激活一个，再进行连锁消除 + 下落;

//======================================================================================================================
cc.Cmd_ChangeToMonsDirection = cc.ICommand.extend({

    //--------------------------------------------------------------------------------------------
    ctor: function(needChangeToObjs, beginMoveGrid, parent)
    {
        this._super();

        this.needChangeToObjs = needChangeToObjs;
        this.beginMoveGrid = beginMoveGrid;
        this.parent = parent;

        this.isFinish = false;
        this.delayTime = 0;
    },

    //--------------------------------------------------------------------------------------------
    handleFinish: function(gameLevel)
    {
        //
        var self = this;
        var visitor = cc.ScoreVisitorSingle.create(Defines.SCORE_TYPE.SCORE_NULL);

        //
        this.needChangeToObjs.forEach(
            function(each)
            {
                if (_IsAnyBubbleCoverMonster(each))
                {
                    //有泡泡先消除泡泡!!!
                    each.destroy(each, gameLevel, visitor);
                }

                if (each instanceof cc.Obj_MonsterDirection)
                {
                    self.parent.addNewMonsterDirection(each);
                    return;
                }

                //开始创建条纹糖果
                var gridParent = each.getParentNode();

                //创建新的
                var createNew = cc.Obj_MonsterDirection.create(each.getColor(), _RandHVDirection(), true);
                gameLevel.disposal(each);

                //
                gridParent.addNode(createNew);
                createNew.updateNodePosition();
                createNew.renderNode();

                self.parent.addNewMonsterDirection(createNew);
            }
        );

        visitor.visitFinish();

        return this;
    },

    //--------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        cc.AudioMng.getInstance().playColorfulDestroy();

        //
        var self = this;
        var fin = 0;
        var callBack = function()
        {
            ++fin;
            if (fin >= self.needChangeToObjs.length)
            {
                self.isFinish = true;
                self.handleFinish(gameLevel);
            }
        };

        //
        this.needChangeToObjs.forEach(
            function(each)
            {
                cc.EffectMng.getInstance().displayColorfulEffectLight(
                    self.beginMoveGrid.getPosition(),
                    each.getPosition(),
                    callBack
                )
            }
        );

        return this;
    },

    //--------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        if (this.isFinish)
        {
            //稍微延迟一下
            this.delayTime += time;
        }

        //延迟一下
        return this.isFinish && this.delayTime > 1;
    }
});

cc.Cmd_ChangeToMonsDirection.create = function(needChangeToObjs, beginMoveGrid, parent)
{
    return new cc.Cmd_ChangeToMonsDirection(needChangeToObjs, beginMoveGrid, parent);
};

//======================================================================================================================
cc.Cmd_DesMonsColorfulWithDirection = cc.ICommandGroup.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(object, color)
    {
        this._super();

        //
        this.object = object;
        this.otherObjects = this.parse(color);
        this.newMonsDirections = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    addNewMonsterDirection: function(newMonsDirection)
    {
        this.newMonsDirections.push(newMonsDirection);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parse: function(color)
    {
        var grids = [];

        //
        var itr = this.object.getParentNode().getParentNode().createIterForMiddleObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var midObj = itr.getCurrent();
            if (!midObj || !midObj.getColor || midObj.getColor() != color)
            {
                continue;
            }

            //雾霾下
            var grid = midObj.getParentNode();
            if (grid)
            {
                var ceilObj = grid.getCeilObject();
                if (ceilObj instanceof cc.Obj_Haze)
                {
                    continue;
                }
            }

            if (midObj.isNormal() || (midObj.isSpecial() && midObj instanceof cc.Obj_MonsterDirection))
            {
                grids.push(midObj);
            }
        }

        return grids;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        var centerGrid = this.object.getParentNode();
		
		var createDestoryObj_color = new cc.Obj_MonsterColorfulDestroy();
		var createDestoryObj_dir = new cc.Obj_MonsterDirectionDestroy();
				
		/*cc.DataMng.getInstance().recordDestroy*/_DiaryDestroyNodeObject(createDestoryObj_color);
		/*cc.DataMng.getInstance().recordDestroy*/_DiaryDestroyNodeObject(createDestoryObj_dir);
		
        //
        var visitor = cc.ScoreVisitorSingle.create(Defines.SCORE_TYPE.SCORE_NULL);
        this.object.destroy(this.object, gameLevel, visitor);
        visitor.visitFinish();

        //
        if (this.otherObjects.length > 0)
        {
            //如果有创建第一个命令Cmd_ChangeToSuperA
            //将所有同色的转变成条纹糖
            var cmd0 = cc.Cmd_ChangeToMonsDirection.create(this.otherObjects, centerGrid, this);
            this.addCommand(cmd0);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function(gameLevel)
    {
        //
        this.newMonsDirections = this.newMonsDirections.filter(
            function(x)
            {
                return x && x.getParentNode();
            }
        );

        //
        if (this.newMonsDirections.length <= 0)
        {
            return this;
        }

        //洗一下 随机
        Tools.shuffle(this.newMonsDirections);

        //点燃一个
        var first = this.newMonsDirections.shift();
        first.toFire(gameLevel);

        //添加一个消除
        var cmd0 = cc.Cmd_EveryDestroy.create();
        cmd0.addNormalDesCommand = function(){};
        cmd0.finish = function(){};

        this.addCommand(cmd0);

        //加一个下落
        var cmd1 = cc.Cmd_EveryMoveNext.create();
        cmd1.finish = function(){};
        this.addCommand(cmd1);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        while (this.m_Commands.length <= 0 && this.newMonsDirections.length > 0)
        {
            this.handle(gameLevel);
        }

        return this.newMonsDirections.length <= 0 && this.m_Commands.length <= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        _AddFlowerToFactorysPool(gameLevel);

        //
        gameLevel.addCommand(cc.Cmd_EveryDestroy.create());
        gameLevel.addCommand(cc.Cmd_EveryMoveNext.create());

        return this;
    }
});

//工厂方法
cc.Cmd_DesMonsColorfulWithDirection.create = function( _object, _otherObject)
{
    var object = _object;
    var otherObject = _otherObject;
    if (!(object instanceof cc.Obj_MonsterColorful))
    {
        object = _otherObject;
        otherObject = _object;
    }

    return new cc.Cmd_DesMonsColorfulWithDirection(object, otherObject.getColor());
};


