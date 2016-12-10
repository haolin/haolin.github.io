//通知所有糖果坠落

//----------------------------------------------------------------------------------------------------------------------
var _GravitySpeed = function(time)
{
    var start = 0;
    var acceleration = Defines.ACCELERATION_OF_GRAVITY;
    var max = Defines.ACCELERATION_OF_GRAVITY * 0.8;//* 0.618 * 1.5;

    //
    var speed = start + acceleration * time;
    if (speed > max)
    {
        speed = max;
    }

    return speed;
};

//----------------------------------------------------------------------------------------------------------------------
var GravityScale = function(sprite, setting, object)
{
    if (!sprite || object instanceof cc.Obj_MonsterMine)
    {
        return this;
    }

    //
    var xScale = setting ? 0.85 : 1.0;
    var yScale = setting ? 1.05 : 1.0;

    sprite.setScaleX(xScale);
    sprite.setScaleY(yScale);

    //
    return this;
};

//----------------------------------------------------------------------------------------------------------------------
var GravityStart = function(monster)
{
    if (!monster)
    {
        return this;
    }

    //
    cc.ArmatureDataMng.getInstance().stopArmature(monster);

    //
    var sprite = monster.getSprite();
    if (sprite)
    {
        sprite.stopActionByTag(Defines.GLOBAL_ACTION_TAGS.ACT_TAG_GRAVITY_MOVE);
        sprite.stopActionByTag(Defines.GLOBAL_ACTION_TAGS.ACT_TAG_GRAVITY_SCALE);
        sprite.setVisible(true);
    }

    //
    return this;
};

//----------------------------------------------------------------------------------------------------------------------
var Cmd_SubMoveNext = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(moveObj, dstGrid, parentCommand)
    {
        //
        this.moveObj = moveObj;
        this.dstGrid = dstGrid;
        this.parentCommand = parentCommand;

        //
        this.vector = cc.p(0, 0);
        this.isMoveBias = this.moveObj.getParentNode().getGridPos().x != this.dstGrid.getGridPos().x;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function()
    {
        this._super();

        this.parentCommand.setGridDirty(this.dstGrid);

        this.moveObj.updateNodePosition();
        var srcGrid = this.moveObj.removeFromParentNode();

        //
        GravityStart(this.moveObj);

        //
        this.parentCommand.setGravityMove(this.moveObj);

        //
        this.vector = cc.pSub(this.dstGrid.getPosition(), srcGrid.getPosition());
        this.vector = cc.pNormalize(this.vector);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function()
    {
        this.parentCommand.cleanGridDirty(this.dstGrid);
        this.dstGrid.addNode(this.moveObj);
        this.moveObj.updateNodePosition();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function()
    {
        //
        this.parentCommand.notifyMoveAny();

        //计算重力加速度
        var speed = _GravitySpeed(this.parentCommand.getTotalMoveTime());
        var position = cc.pAdd(
            this.moveObj.getPosition(),
            cc.p(this.vector.x * speed, this.vector.y * speed)
        );

        //
        var finish = false;
        var dstPos = this.dstGrid.getPosition();
        if (position.y <= dstPos.y)
        {
            //只算y看是否完成
            finish = true;
            position.y = dstPos.y;
        }

        //
        var sprite = this.moveObj.getSprite();
        GravityScale(sprite, !this.isMoveBias, this.moveObj);

        //
        this.moveObj.setPosition(position);
        sprite.setPosition(position);

        return finish;
    }

});

Cmd_SubMoveNext.create = function(moveObj, dstGrid, parentCommand)
{
    if (!parentCommand || !(parentCommand instanceof cc.Cmd_EveryMoveNext))
    {
        cc.Assert(0, "");
    }

    return new Cmd_SubMoveNext(moveObj, dstGrid, parentCommand);
};

//----------------------------------------------------------------------------------------------------------------------
var Cmd_SubMoveFromFacotry = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(moveObj, dstGrid, parentCommand)
    {
        this.moveObj = moveObj;
        this.dstGrid = dstGrid;
        this.parentCommand = parentCommand;

        //
        this.spriteRect = null;
        this.srcHeight = 0;
        this.currentHeight = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function()
    {
        //标记占用
        this.parentCommand.setGridDirty(this.dstGrid);

        var sprite = this.moveObj.getSprite();

        //
        this.spriteRect = sprite.getTextureRect();
        this.srcHeight = this.spriteRect.height;
        this.currentHeight = 0;

        //
        GravityStart(this.moveObj);

        //
        sprite.setVisible(false);
        sprite.setAnchorPoint(cc.p(0.5, 0));

        //从父节点拿下来
        var srcGrid = this.moveObj.removeFromParentNode();
        this.parentCommand.setGravityMove(this.moveObj);

        //
        var srcPos = srcGrid.getPosition();
        sprite.setPosition(cc.p(srcPos.x, srcPos.y - this.srcHeight/2));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function()
    {
        this.parentCommand.cleanGridDirty(this.dstGrid);

        var sprite = this.moveObj.getSprite();
        sprite.setAnchorPoint(cc.p(0.5, 0.5));

        //重新设置格子
        sprite.setTextureRect(
            cc.rect(this.spriteRect.x,
                this.spriteRect.y,
                this.spriteRect.width,
                this.srcHeight));

        //重新设置格子
        this.dstGrid.addNode(this.moveObj);
        this.moveObj.updateNodePosition();
        this.moveObj.leaveFromFactory();

        MonsterRender.updateSpecMonsterDecorationVisible(this.moveObj, true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function()
    {
        this.parentCommand.notifyMoveAny();

        //计算重力加速度
        var speed = _GravitySpeed(this.parentCommand.getTotalMoveTime());

        //x方向没有 就是垂直移动
        var position = this.moveObj.getPosition();
        position.y -= speed;

        var sprite = this.moveObj.getSprite();
        sprite.setVisible(true);

        var ccPos = sprite.getPosition();
        ccPos.y -= speed;
        sprite.setPosition(ccPos);

        this.currentHeight += speed;
        sprite.setTextureRect(
            cc.rect(
                this.spriteRect.x,
                this.spriteRect.y + (this.srcHeight - this.currentHeight),
                this.spriteRect.width,
                this.currentHeight
            )
        );

        //
        GravityScale(sprite, true, this.moveObj);
        return (this.currentHeight >= this.srcHeight);
    }

});

Cmd_SubMoveFromFacotry.create = function(moveObj, dstGrid, parentCommand)
{
    if (!parentCommand || !(parentCommand instanceof cc.Cmd_EveryMoveNext))
    {
        cc.Assert(0, "");
    }

    return new Cmd_SubMoveFromFacotry(moveObj, dstGrid, parentCommand);
};

//======================================================================================================================
var Cmd_SubMoveConnect = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(moveObj, dstGrid, parentCommand)
    {
        this.moveObj = moveObj;
        this.dstGrid = dstGrid;
        this.parentCommand = parentCommand;

        this.spriteRect = null;
        this.srcHeight = 0;

        this.cloneSprite = null;
        this.cloneSpriteRect = null;
        this.cloneSpriteHeight = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function()
    {
        //标记占用
        this.parentCommand.setGridDirty(this.dstGrid);

        this.spriteRect = this.moveObj.getSprite().getTextureRect();
        this.srcHeight = this.spriteRect.height;

        //假精灵
        this.cloneSprite = this.moveObj.createSprite(true);
        this.cloneSprite.setVisible(false);
        this.cloneSprite.setAnchorPoint(cc.p(0.5, 0));

        this.cloneSpriteRect = this.cloneSprite.getTextureRect();
        this.cloneSpriteHeight = 0;

        //从父节点拿下来
        this.moveObj.updateNodePosition();
        this.moveObj.removeFromParentNode();

        var sprite = this.moveObj.getSprite();
        sprite.stopActionByTag(Defines.GLOBAL_ACTION_TAGS.ACT_TAG_GRAVITY_MOVE);
        sprite.stopActionByTag(Defines.GLOBAL_ACTION_TAGS.ACT_TAG_GRAVITY_SCALE);
        sprite.setVisible(true);

        this.parentCommand.setGravityMove(this.moveObj);

        //目标格子的垂直上一个
        var dstTopDirGrid = this.dstGrid.getGridByDirection(Defines.DIRECTION.TOP);
        var dstTopDirGridPos = dstTopDirGrid.getPosition();

        //
        this.cloneSprite.setPosition(cc.p(dstTopDirGridPos.x,
            dstTopDirGridPos.y - this.srcHeight/2));

        this.cloneSprite.setVisible(false);
        cc.ArmatureDataMng.getInstance().stopArmature(this.moveObj);

        //
        MonsterRender.updateSpecMonsterDecorationVisible(this.moveObj, false);
        //this._updateSpecMonsterDecorationVisible(false);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function()
    {
        this.parentCommand.cleanGridDirty(this.dstGrid);

        //重新设置格子
        this.moveObj.getSprite().setTextureRect(
            cc.rect(this.spriteRect.x,
                this.spriteRect.y,
                this.spriteRect.width,
                this.srcHeight));

        this.dstGrid.addNode(this.moveObj);
        this.moveObj.updateNodePosition();

        //假的精灵释放了
        if (this.cloneSprite)
        {
            this.cloneSprite.removeFromParent(true);
            this.cloneSprite = null;
        }

        //
        MonsterRender.updateSpecMonsterDecorationVisible(this.moveObj, true);
        //this._updateSpecMonsterDecorationVisible(true);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function()
    {
        this.parentCommand.notifyMoveAny();

        var distance = _GravitySpeed(this.parentCommand.getTotalMoveTime());
        var position = this.moveObj.getPosition();
        position.y -= distance/2;

        //
        var srcSprite = this.moveObj.getSprite();
        this.spriteRect.height -= distance;

        srcSprite.setTextureRect(
            cc.rect(this.spriteRect.x,
                this.spriteRect.y,
                this.spriteRect.width,
                this.spriteRect.height));

        //真对象的精灵 设置位置
        srcSprite.setPosition(position);
        this.moveObj.setPosition(position);

        //
        this.cloneSprite.setVisible(true);
        var ccPos = this.cloneSprite.getPosition();
        ccPos.y -= distance;
        this.cloneSprite.setPosition(ccPos);

        this.cloneSpriteHeight += distance;
        this.cloneSprite.setTextureRect(
            cc.rect(this.cloneSpriteRect.x,
                this.cloneSpriteRect.y + (this.srcHeight - this.cloneSpriteHeight),
                this.cloneSpriteRect.width,
                this.cloneSpriteHeight));

        //
        GravityScale(srcSprite, true, this.moveObj);
        GravityScale(this.cloneSprite, true, this.moveObj);

        return (this.cloneSpriteHeight >= this.srcHeight);
    }

    //------------------------------------------------------------------------------------------------------------------
    /*_updateSpecMonsterDecorationVisible: function(vis)
    {
        //
        if (this.moveObj instanceof cc.Obj_MonsterWrap && !(this.moveObj instanceof cc.Obj_MonsterUnwrap))
        {
            if (this.moveObj.getRender() instanceof MonsterWrapRender)
            {
                //Obj_MonsterUnwrap 没有这个 setWrapDecorationVisible
                this.moveObj.getRender().setWrapDecorationVisible(vis);
            }
        }
        else if (this.moveObj instanceof cc.Obj_MonsterDirection)
        {
            if (this.moveObj.getRender() instanceof MonsterDirectionRender)
            {
                this.moveObj.getRender().setDirectionDecorationVisible(vis);
            }
        }
        else if (this.moveObj instanceof cc.Obj_MonsterColorful)
        {
            if (this.moveObj.getRender() instanceof MonsterColorfulRender)
            {
                this.moveObj.getRender().setColorfulDecorationVisible(vis);
            }
        }

        return this;
    }*/
});

Cmd_SubMoveConnect.create = function(moveObj, dstGrid, parentCommand)
{
    if (!parentCommand || !(parentCommand instanceof cc.Cmd_EveryMoveNext))
    {
        cc.Assert(0, "");
    }

    return new Cmd_SubMoveConnect(moveObj, dstGrid, parentCommand);
};



