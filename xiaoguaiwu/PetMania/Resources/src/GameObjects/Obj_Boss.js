
//======================================================================================================================
cc.Obj_Boss = cc.NormalObj.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(name, type, typeConfig, seqColors)
    {
        this._super(Defines.NORMAL_GRID_OBJ_LAYER.TOP, Defines.GRID_OBJS_ZORDER.OBJ_TOP);
        this.m_Name = name;
        this.m_Type = type;
        this.m_TypeConfig = typeConfig;
        this.m_SeqColors = seqColors;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_Boss_" + this.getName() + "_" + this.getType();
    },

    //------------------------------------------------------------------------------------------------------------------
    getName: function()
    {
        return this.m_Name;
    },

    //------------------------------------------------------------------------------------------------------------------
    getType: function()
    {
        return this.m_Type;
    },

    //------------------------------------------------------------------------------------------------------------------
    getTypeConfig: function()
    {
        return this.m_TypeConfig;
    },

    //-----------------------------------------------------------------------------------------------------
    getSeqColors: function()
    {
        return this.m_SeqColors;
    },

    //-----------------------------------------------------------------------------------------------------
    isBlock: function()
    {
        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    destroy: function(desSrc, gameLevel, visitor)
    {
        if (visitor)
        {
            visitor.visit(this);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    beNotifiedDestroy: function(notifySrc, gameLevel, visitor)
    {
        if (visitor)
        {
            visitor.visit(this);
        }

        return this;
    }

});

//
cc.Obj_Boss.create = function(name, type, typeConfig, seqColors)
{
    return new cc.Obj_Boss(name, type, typeConfig, seqColors);
};

//======================================================================================================================
cc.Obj_BossComposite = cc.Obj_Boss.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(name, type, typeConfig, seqColors, parts)
    {
        this._super(name, type, typeConfig, seqColors);
        this.m_Parts = (parts && parts instanceof Array) ? parts.concat() : [];
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        this._super();

        //
        this.m_Parts.forEach(
            function(part)
            {
                part.removeFromParentNode();
                part.release();
            }
        );

        this.m_Parts.splice(0, this.m_Parts.length);
        this.m_Parts = [];

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addPart: function(part)
    {
        if (!part || !(part instanceof cc.Obj_Boss))
        {
            return this;
        }

        var res = this.m_Parts.some(
            function(a_part)
            {
                return a_part == part;
            }
        );

        if (!res)
        {
            this.m_Parts.push(part)
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    build: function(/*gamelevel*/)
    {
        return this;
    }
});

cc.Obj_BossComposite.create = function(name, type, typeConfig, seqColors, parts)
{
    var createNew = new cc.Obj_Boss(name, type, typeConfig, seqColors, parts);
    if (createNew)
    {
        createNew.init();
    }

    return createNew;
};



