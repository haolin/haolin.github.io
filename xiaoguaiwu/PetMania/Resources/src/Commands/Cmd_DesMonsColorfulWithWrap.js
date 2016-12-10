//多彩和爆炸互换 = 多彩消除 + 下落 + 再多彩随机消除

//======================================================================================================================
cc.Cmd_DesMonsColorfulWithWrap = cc.ICommandGroup.extend({

    //--------------------------------------------------------------------------------------------
    ctor: function(objectColorful, objectColorfuWrap)
    {
        this._super();

        this.objectColorful = objectColorful;
        this.objectColorfuWrap = objectColorfuWrap;
    },

    //--------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //
        this.objectColorfuWrap.toFire(gameLevel);
        this.objectColorful.setFireColor(this.objectColorfuWrap.getColor());

        //??????
		var createDestoryObj_color = new cc.Obj_MonsterColorfulDestroy();
		var createDestoryObj_wrap = new cc.Obj_MonsterWrapDestroy();
		_DiaryDestroyNodeObject(createDestoryObj_color);
		_DiaryDestroyNodeObject(createDestoryObj_wrap);

        //
        var self = this;
        var createColorfulDumb = null;

        //
        var grid = this.objectColorful.getParentNode();
        this.objectColorful.destroy = function(desSrc, gameLevel, visitor)
        {
            if (self.objectColorful.destroyChildren(desSrc, gameLevel, visitor))
            {
                //孩子处理完了 就返回 目前用于泡泡
                return this;
            }

            if (desSrc != this)
            {
                self.objectColorful.toFire(gameLevel);
            }
            else
            {
                //就得删除掉
                grid.removeNode(self.objectColorful);
                self.objectColorful.release();

                //把他的消除改掉 加上dumb
                var dumb = cc.Obj_MonsterColorful.createDumb();
                grid.addNode(dumb);
                dumb.updateNodePosition();
                dumb.renderNode();

                //
                createColorfulDumb = dumb;
            }

            return this;
        };

        var cmd0 = cc.Cmd_EveryDestroy.create();
        cmd0.finish = function(gameLevel)
        {
            if (createColorfulDumb)
            {
                gameLevel.disposal(createColorfulDumb);

                //
                var createColorful = cc.Obj_MonsterColorful.create();
                grid.addNode(createColorful);
                createColorful.updateNodePosition();
                createColorful.renderNode();

                createColorful.toFire(gameLevel);
            }
        };

        //
        this.addCommand(cmd0);

        //
        var cmd1 = cc.Cmd_EveryMoveNext.create();
        cmd1.finish = function(){};
        this.addCommand(cmd1);

        //
        var cmd2 = cc.Cmd_EveryDestroy.create();
        cmd2.finish = function(){};
        this.addCommand(cmd2);

        return this;
    },

    //---------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        _AddFlowerToFactorysPool(gameLevel);
        gameLevel.addCommand(cc.Cmd_EveryMoveNext.create());
        return this;
    }
});

//工厂方法
cc.Cmd_DesMonsColorfulWithWrap.create = function(_objectColorful, _objectColorfuWrap)
{
    var objectColorful = _objectColorful;
    var objectColorfuWrap = _objectColorfuWrap;
    if (!(objectColorful instanceof cc.Obj_MonsterColorful))
    {
        objectColorful = _objectColorfuWrap;
        objectColorfuWrap = _objectColorful;
    }

    return new cc.Cmd_DesMonsColorfulWithWrap(objectColorful, objectColorfuWrap);
};

