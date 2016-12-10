//条纹怪物

//======================================================================================================================
cc.Obj_MonsterDirection = cc.Obj_Monster.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(color, hvDir)
    {
        this._super(color);

        //this.m_DesRule = cc.DestroyRule_MonsterDirection.create(this);
        this.hvDir = (hvDir && hvDir != Defines.DIRECTION.NULL) ? hvDir : Defines.DIRECTION.HORIZONTAL;
		this._level = cc.DataMng.getInstance().getMineLevelNum();
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_MonsterDirection";
    },

    //------------------------------------------------------------------------------------------------------------------
    getDestroyRule: function()
    {
        return cc.DestroyRule_MonsterDirection.create(this);/*this.m_DesRule*/
    },

	getLevel: function()
	{
        cc.log("Obj_MonsterDirection level = " + this._level);
		return this._level;
	},
	
    //------------------------------------------------------------------------------------------------------------------
    //水平还是垂直?
    getHVDirection: function()
    {
        return this.hvDir;
    },

    //------------------------------------------------------------------------------------------------------------------
    destroy: function(desSrc, gameLevel, visitor)
    {
        if (this.destroyChildren(desSrc, gameLevel, visitor))
        {
            //孩子处理完了 就返回 目前用于泡泡
            return this;
        }

//		var createDestoryObj = new cc.Obj_MonsterDirectionDestroy();
//		/*cc.DataMng.getInstance().recordDestroy*/_DiaryDestroyNodeObject(createDestoryObj);

		
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
        if (swapOther && swapOther instanceof cc.Obj_MonsterDirection)
        {
            this.toFire(gameLevel);
        }

        return this;
    }
});

//多彩加方向创造出来的
cc.Obj_MonsterDirectionSpeed = cc.Obj_MonsterDirection.extend({

});

cc.Obj_MonsterDirection.create = function(color, hvDir, isSpeed)
{
    //
    var _hvDirection = (hvDir && hvDir != Defines.DIRECTION.NULL) ? hvDir : Defines.DIRECTION.HORIZONTAL;

    //
    var createNew = !isSpeed ? new cc.Obj_MonsterDirection(color, _hvDirection)
        : new cc.Obj_MonsterDirectionSpeed(color, _hvDirection);
	
    if (createNew)
    {
		var createRecord = new cc.Obj_MonsterDirectionCreate();
		/*cc.DataMng.getInstance().recordDestroy*/_DiaryDestroyNodeObject(createRecord);
		
		createNew.setRender(new MonsterDirectionRender(createNew));
    }

    return createNew;
};


cc.Obj_MonsterDirectionDestroy = cc.INodeObject.extend({
    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_MonsterDirectionDestroy";
    }
});


cc.Obj_MonsterDirectionCreate = cc.INodeObject.extend({
    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_MonsterDirectionCreate";
    }
});



