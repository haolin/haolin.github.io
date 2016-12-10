//包装的怪物

//======================================================================================================================
cc.Obj_MonsterWrap = cc.Obj_Monster.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(color, radius)
    {
        this._super(color);
        this.m_Radius = radius || 1;  //爆炸半径
        this._level = cc.DataMng.getInstance().getMineLevelNum();
    },
    getLevel: function()
    {
        cc.log("Obj_MonsterWrap level = " + this._level);
        return this._level;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_MonsterWrap";
    },

    //------------------------------------------------------------------------------------------------------------------
    getDestroyRule: function()
    {
        return cc.DestroyRule_MonsterWrap.create(this);/*this.m_DesRule*/
    },

    //------------------------------------------------------------------------------------------------------------------
    destroy: function(desSrc, gameLevel, visitor)
    {
        if (this.destroyChildren(desSrc, gameLevel, visitor))
        {
            //孩子处理完了 就返回 目前用于泡泡
            return this;
        }


        if (desSrc != this)
        {
            this.toFire(gameLevel);
        }
        else
        {
            this._super(desSrc, gameLevel, visitor);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    touchSwap: function(gameLevel, swapOther)
    {
        if (!swapOther)
        {
            return this;
        }

        if (swapOther instanceof cc.Obj_MonsterWrap || swapOther instanceof cc.Obj_MonsterDirection)
        {
            this.toFire(gameLevel);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setRadius: function(setting)
    {
        this.m_Radius = setting;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getRadius: function()
    {
        return this.m_Radius;
    }
});

//工厂方法
cc.Obj_MonsterWrap.create = function(color, radius)
{
    var _color = (color && color != Defines.COLOR.NULL) ? color : _RandColor();
    var createNew = new cc.Obj_MonsterWrap(_color, radius);
    if (createNew)
    {
        createNew.setRender(new MonsterWrapRender(createNew));
    }

    return createNew;
};


//======================================================================================================================
//爆炸糖果 爆炸之后创造的闪动的糖果
cc.Obj_MonsterUnwrap = cc.Obj_MonsterWrap.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(color, radius)
    {
        this._super(color, radius);
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_MonsterUnwrap";
    },

    //------------------------------------------------------------------------------------------------------------------
    getDestroyRule: function()
    {
        return cc.DestroyRule_MonsterUnwrap.create(this);
    },

    //------------------------------------------------------------------------------------------------------------------
    destroy: function(desSrc, gameLevel, visitor)
    {
        if (desSrc == this)
        {
            this._super(desSrc, gameLevel, visitor);
        }

        return this;
    }
});

//
cc.Obj_MonsterUnwrap.create = function(color, radius)
{
    var _color = (color && color != Defines.COLOR.NULL) ? color : _RandColor();
    var createNew = new cc.Obj_MonsterUnwrap(_color, radius);
    if (createNew)
    {
		var createRecord = new cc.Obj_MonsterWrapCreate();
		_DiaryDestroyNodeObject(createRecord);
		
        createNew.setRender(new MonsterRender(createNew));
    }

    return createNew;
};

cc.Obj_MonsterWrapDestroy = cc.INodeObject.extend({
    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_MonsterWrapDestroy";
    }
});


cc.Obj_MonsterWrapCreate = cc.INodeObject.extend({
    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_MonsterWrapCreate";
    }
});

