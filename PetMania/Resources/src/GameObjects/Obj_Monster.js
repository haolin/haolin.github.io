//普通怪物

//======================================================================================================================
cc.Obj_Monster = cc.NormalObj.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(color)
    {
        this._super(Defines.NORMAL_GRID_OBJ_LAYER.MIDDLE, Defines.GRID_OBJS_ZORDER.OBJ_MIDDLE);

        //
        //this.m_DesRule = cc.DestroyRule_MonsterBase.create(this);
        this.m_Color = color;

        //将渲染部分分离出来
        this.m_MyRender = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    setRender: function(_render)
    {
        if (this.m_MyRender)
        {
            //释放上一个 保持随时唯一
            this.m_MyRender.release();
            this.m_MyRender = null;
        }

        this.m_MyRender = _render;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getRender: function()
    {
        return this.m_MyRender;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_Monster";
    },

    //------------------------------------------------------------------------------------------------------------------
    //是否可手动移动
    canTouch: function()
    {
        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    isNormal: function()
    {
        return this.description() == "Obj_Monster";
    },

    //------------------------------------------------------------------------------------------------------------------
    isSpecial: function()
    {
        return !this.isNormal();
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        var parent = this.getParentNode();
        if (parent)
        {
            var gridPos = parent.getGridPos();
            return this.description() + "(" + gridPos.x + ", " + gridPos.y + ") " + this.getColorName();
        }

        return this.description();
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        this._super();

        //
        if (this.m_MyRender)
        {
            this.m_MyRender.release();
            this.m_MyRender = null;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //拿颜色
    getColor: function()
    {
        return this.m_Color;
    },

    //------------------------------------------------------------------------------------------------------------------
    //拿精灵
    getSprite: function()
    {
        return this.getRender() ? this.getRender().getSprite() : null;
    },

    //------------------------------------------------------------------------------------------------------------------
    createSprite: function(notDecoration)
    {
        return this.getRender() ? this.getRender().createMySprite(notDecoration) : null;
    },

    //------------------------------------------------------------------------------------------------------------------
    renderNode: function()
    {
        this._super();

        if (this.getRender())
        {
            this.getRender().render();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //更新位置
    updateNodePosition: function()
    {
        this._super();

        //
        if (this.getRender())
        {
            this.getRender().updatePositionByNode();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getColorName: function()
    {
        return this.getColor().getName();
    },

    //------------------------------------------------------------------------------------------------------------------
    getDestroyRule: function()
    {
        return cc.DestroyRule_MonsterBase.create(this);/*this.m_DesRule*/
    },

    //------------------------------------------------------------------------------------------------------------------
    //创建 MonsterDirection
    createMonsterDirection: function(hvDir)
    {
        return cc.Obj_MonsterDirection.create(this.getColor(), hvDir);
    },

    //------------------------------------------------------------------------------------------------------------------
    //创建 MonsterWrap
    createMonsterWrap: function()
    {
        return cc.Obj_MonsterWrap.create(this.getColor());
    },
    //创建 MonsterColorful
    createMonsterColorful: function()
    {
        return cc.Obj_MonsterColorful.create();
    },
    //------------------------------------------------------------------------------------------------------------------
    destroy: function(desSrc, gameLevel, visitor)
    {
        if (this.destroyChildren(desSrc, gameLevel, visitor))
        {
            //孩子处理完了 就返回 目前用于泡泡
            return this;
        }

        if (visitor)
        {
            visitor.visit(this);
            /*cc.DataMng.getInstance().recordDestroy*/_DiaryDestroyNodeObject(this);
        }

        var parent = this.getParentNode();
        if (parent)
        {
            parent.beNotifiedDestroy(this, gameLevel, visitor);
        }

        //爆炸中心是不是我 我都直接消除
        gameLevel.disposal(this);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //孩子先处理
    destroyChildren: function(desSrc, gameLevel, visitor)
    {
        var result = false;

        this.getChildrenNodes().forEach(
            function(child)
            {
                if (!child)
                {
                    return;
                }

                if (child.destroy(desSrc, gameLevel, visitor))
                {
                    result = true;
                }
            }
        );

        //
        this.m_ChildrenNodes = this.getChildrenNodes().filter(
            function(child)
            {
                return child && child.getParentNode() == this;
            }
        );

        return result;
    },

    //------------------------------------------------------------------------------------------------------------------
    //被通知销毁
    beNotifiedDestroy: function(notifySrc, gameLevel, visitor)
    {
        this._super(notifySrc, gameLevel, visitor);

        if (cc.ArmatureDataMng.getInstance().stareArmature(this, notifySrc))
        {
            var sprite = this.getSprite();
            if (sprite)
            {
                sprite.setVisible(false);
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getChildByType: function(_class)
    {
        var result = this.getChildrenNodes().filter(
            function(child)
            {
                return child && child instanceof _class;
            }
        );

        return result.length;
    }
});

//
cc.Obj_Monster.create = function(color)
{
    var _color = (color && color != Defines.COLOR.NULL) ? color : _RandColor();
    var createNew = new cc.Obj_Monster(_color);
    if (createNew)
    {
        createNew.setRender(new MonsterRender(createNew));
    }

    return createNew;
};

var _IsMonsterHasBubble = function(monster)
{
    return monster instanceof cc.Obj_Monster && monster.getChildByType(cc.Obj_Bubble);
};

var _IsMonsterHasBubbleCreator = function(monster)
{
    return monster instanceof cc.Obj_Monster && monster.getChildByType(cc.Obj_BubbleCreator);
};

var _IsAnyBubbleCoverMonster = function(monster)
{
    return _IsMonsterHasBubble(monster) || _IsMonsterHasBubbleCreator(monster);
};

var _CanUseItemToMonster = function(monster)
{
    return monster instanceof cc.Obj_Monster
        && monster.isNormal()
        && !_IsAnyBubbleCoverMonster(monster);
};











