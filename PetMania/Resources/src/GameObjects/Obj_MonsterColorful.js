//多彩怪物

//======================================================================================================================
cc.Obj_MonsterColorful = cc.Obj_Monster.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super(Defines.COLOR.COLORFUL);

        //
        this.m_FireColor = null;

        //
		var createNew = new cc.Obj_MonsterColorfulCreate();
		_DiaryDestroyNodeObject(createNew);
        this._level = cc.DataMng.getInstance().getMineLevelNum();
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_MonsterColorful";
    },
    getLevel: function()
    {
        cc.log("Obj_MonsterColor level = " + this._level);
        return this._level;
    },

    //------------------------------------------------------------------------------------------------------------------
    getDestroyRule: function()
    {
        return cc.DestroyRule_MonsterColorful.create(this);
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
        }
		
        //
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
        if (swapOther)
        {
            this.toFire(gameLevel);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setFireColor: function(setting)
    {
        this.m_FireColor = setting;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getFireColor: function()
    {
        return this.m_FireColor;
    }
});

cc.Obj_MonsterColorful.create = function()
{
    var createNew = new cc.Obj_MonsterColorful();
    if (createNew)
    {
		var createRecord = new cc.Obj_MonsterColorfulCreate();
		_DiaryDestroyNodeObject(createRecord);
		
        createNew.setRender(new MonsterColorfulRender(createNew));
    }

    return createNew;
};

cc.Obj_MonsterColorful.createDumb = function()
{
    var createNew = cc.Obj_MonsterColorful.create();
    createNew.toFire = function(){};
    createNew.destroy = function(){};
    return createNew;
};


cc.Obj_MonsterColorfulCreate = cc.INodeObject.extend({
    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_MonsterColorfulCreate";
    }
});

cc.Obj_MonsterColorfulDestroy = cc.INodeObject.extend({
    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_MonsterColorfulDestroy";
    }
});





