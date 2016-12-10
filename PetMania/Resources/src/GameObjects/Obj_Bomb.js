//======================================================================================================================
cc.Obj_Bomb = cc.Obj_Monster.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(color, bombTime, start)
    {
        this._super(color);

        //
        this.m_BombTime = bombTime ? bombTime : 1;
        //this.m_DesRule = cc.DestroyRule_MonsterBase.create(this);
        this.m_Start = start;

    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_Bomb";
    },

    //------------------------------------------------------------------------------------------------------------------
    getBombTime: function()
    {
        return this.m_BombTime;
    },

    //------------------------------------------------------------------------------------------------------------------
    getDestroyRule: function()
    {
        return cc.DestroyRule_MonsterBase.create(this);/*this.m_DesRule*/
    },

    //--------------------------------------------------------------------------------------------------------------
    tick: function()
    {
        if (!this.m_Start)
        {
            this.m_Start = true;
            return false;
        }
		
        //在雾霾底下的炸弹失效
        var parent = this.getParentNode();
        if (parent)
        {
            var ceilObj = parent.getCeilObject();
            if (ceilObj instanceof cc.Obj_Haze)
            {
                return this.m_BombTime <= 0;
            }
        }

        //
        --this.m_BombTime;
        if (this.m_BombTime <= 0)
        {
            this.m_BombTime = 0;
        }
        
        if (this.getRender())
        {
            this.getRender().updateDecorations();
        }

        return this.m_BombTime <= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    destroy: function(desSrc, gameLevel, visitor)
    {
        //
        if (this.destroyChildren(desSrc, gameLevel, visitor))
        {
            //孩子处理完了 就返回 目前用于泡泡
            return this;
        }

        //
        if (visitor)
        {
            visitor.visit(this);
            _DiaryDestroyNodeObject(this);
        }

        //
        var parent = this.getParentNode();
        if (parent)
        {
            //因该炸掉笼子之类的东西......
            var top = parent.getTopObject();
            var bottom = parent.getBottomObject();
            if (top && top instanceof cc.Obj_Lock)
            {
                top.beNotifiedDestroy(this, gameLevel, visitor);
            }
            else if (bottom && bottom instanceof cc.Obj_Floor)
            {
                //因该炸掉底板之类的东西......
                bottom.beNotifiedDestroy(this, gameLevel, visitor);
            }
        }

        //爆炸中心是不是我 我都直接消除
        gameLevel.disposal(this);
        return this;
    },


    //------------------------------------------------------------------------------------------------------------------
    leaveFromFactory: function()
    {
        this._super();

        //这么写的原因 是因为 从工厂格子出来 为了造成切割精灵的效果，
        //用了改变texture rect的方式
        //如果他有序列帧，切割就会出错
        if (this.getRender())
        {
            this.getRender().updateDecorations();
        }

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------

});

//工厂方法
cc.Obj_Bomb.create = function(color, bombTime, start)
{
    cc.BombsMng.getInstance();

    var createNew = new cc.Obj_Bomb(color, bombTime, start);
    if (createNew)
    {
        createNew.setRender(new MonsterBombRender(createNew));
    }

    return createNew;
};
