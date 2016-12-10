//======================================================================================================================
var _Obj_ColorBoss_DesLifeRule = function(visitor, elements)
{
    /*
    成功将小怪物送入舱口后，左侧目标栏中的个数相应变化，舱口上方飘“XX”数字。
    普通3消计3点，
    4消、5消计6点、8点，
    纵横、爆炸、同色消除的每个小怪物计2点。每1点可得200分。
     */

    var point = elements.length;
    switch (visitor.m_ScoreType)
    {
    case Defines.SCORE_TYPE.SCORE_CREATE_DIRECTION://创建条纹糖
        {
            point = 6;
        }
        break;

    case Defines.SCORE_TYPE.SCORE_CREATE_COLORFUL://创建多彩糖
    case Defines.SCORE_TYPE.SCORE_CREATE_WRAP://创建爆炸糖
        {
            point = 8;
        }
        break;

    case Defines.SCORE_TYPE.SCORE_DES_BY_DIRECTION:
    case Defines.SCORE_TYPE.SCORE_DES_BY_WRAP:
    case Defines.SCORE_TYPE.SCORE_DES_WRAP_WITH_WRAP:
    case Defines.SCORE_TYPE.SCORE_DES_WRAP_WITH_DIRECTION:
    case Defines.SCORE_TYPE.SCORE_DES_DIRECTION_WITH_DIRECTION:
    case Defines.SCORE_TYPE.SCORE_DES_BY_COLOR:
    case Defines.SCORE_TYPE.SCORE_DES_COLOR_WITH_COLOR:
    case Defines.SCORE_TYPE.SCORE_DES_COLOR_WITH_WRAP:
        {
            point = 2 * elements.length;
        }
        break;

    default:
        {
            //cc.log("visitor.m_ScoreType = " + visitor.m_ScoreType);
        }
        break;
    }

    return point;
};

//======================================================================================================================
cc.Obj_ColorBoss = cc.Obj_BossComposite.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(name, type, parts)
    {
        this._super(name, type, null, null, parts);

        //
        this.m_CurrentColor = Defines.COLOR.NULL;
        this.m_NeedFireEvent = false;

        this.m_TypeConfig = [];
        this.m_SeqColors = [];

        this.m_ColorBossRender = new ColorBossRender(this);
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        this._super();

        //
        if (this.m_ColorBossRender)
        {
            this.m_ColorBossRender.release();
            this.m_ColorBossRender = null;
        }

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

        //
        this._super(part);

        //
        this._mergeColors(part.getTypeConfig());
        //this.m_TypeConfig = this.m_TypeConfig.concat(part.getTypeConfig());

        //
        if (this.m_SeqColors.length <= 0)
        {
            this.m_SeqColors = this.m_SeqColors.concat(part.getSeqColors());
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _mergeColors: function(colors)
    {
        var self = this;

        //
        var dirty = {};
        this.m_TypeConfig.forEach(
            function(srcColor)
            {
                dirty[srcColor] = true;
            }
        );

        colors.forEach(
            function(dstColor)
            {
                if (!dirty[dstColor])
                {
                    self.m_TypeConfig.push(dstColor);
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    hasManyColors: function()
    {
        return this.m_TypeConfig.length > 1;
    },

    //------------------------------------------------------------------------------------------------------------------
    getCurrentColor: function()
    {
        return this.m_CurrentColor;
    },

    //------------------------------------------------------------------------------------------------------------------
    build: function(/*gameLevel*/)
    {
        //初始化位置
        var sumPosX = 0;
        var sumPosY = 0;

        //
        this.m_Parts.forEach(
            function(each)
            {
                each.updateNodePosition();
                var pos = each.getPosition();
                sumPosX += pos.x;
                sumPosY += pos.y;
            }
        );

        //计算中点
        var len = this.m_Parts.length;
        this.setPosition(cc.p(sumPosX/len, sumPosY/len));

        this.m_ColorBossRender.render();

        //
        this.updateColor();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    bossLogic: function()
    {
        var self = this;
        if (this.m_NeedFireEvent)
        {
            this.m_NeedFireEvent = false;

            //
            cc.AudioMng.getInstance().playHatchOpenOrClose(true);

            //
            cc.log("颜色多于一个 就需要更新颜色");
            if (this.hasManyColors())
            {
                this.m_ColorBossRender.updateHatchOpen(
                    function()
                    {
                        self.updateColor();
                    }
                );
            }
        }

        //
        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateColor: function(/*gameLevel*/)
    {
        //前n次按顺序配置
        if (this.m_SeqColors.length > 0)
        {
            this.m_CurrentColor = this.m_SeqColors.shift() || Defines.COLOR.PINK;
            this.m_ColorBossRender.updateInside();
            return this;
        }

        //
        if (this.m_TypeConfig.length <= 0)
        {
            this.m_TypeConfig = _GetColorsArray();
        }

        //
        var dirty = {};
        _DIRTY_COLORS_FOR_COLOR_BOSSES.forEach(
            function(a_color)
            {
                dirty[a_color] = true;
            }
        );

        //
        var colorsAfterFilter = this.m_TypeConfig.filter(
            function(dirtyColor)
            {
                return !dirty[dirtyColor];
            }
        );

        //
        this.m_CurrentColor = Tools.arrayRandom(colorsAfterFilter);
        if (this.m_CurrentColor)
        {
            _DIRTY_COLORS_FOR_COLOR_BOSSES.push(this.m_CurrentColor);
            this.m_ColorBossRender.updateInside();
        }
        else
        {
            this.m_CurrentColor = this.m_CurrentColor || Tools.arrayRandom(this.m_TypeConfig)/*_RandColor()*/;
            this.m_ColorBossRender.updateInside();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleVisitFinish: function(visitor, bossManager)
    {
        var dirty = {};



        var self = this;
        visitor.m_Elements.forEach(
            function(element)
            {
                if (element.getColor
                    && element.getColor() != Defines.COLOR.NULL
                    && element.getColor() != Defines.COLOR.COLOR_COLORFUL
                    && element.getColor() == self.m_CurrentColor)
                {
                    //element.filterFlag = true;
                    dirty[element.getObjectID()] = true;
                }
                else if (element.getColor && element.getColor() == Defines.COLOR.COLOR_COLORFUL)
                {
                    cc.log("00000000000000000000");
                }
            }
        );

        //
        var elementsByColor = visitor.m_Elements.filter(
            function(elm)
            {
                //return elm.filterFlag;
                return dirty[elm.getObjectID()];
            }
        );

        //
        visitor.m_Elements = visitor.m_Elements.filter(
            function(elm)
            {
                return !dirty[elm.getObjectID()];
                //return !elm.filterFlag;
            }
        );

        //
        if (elementsByColor.length <= 0)
        {
            return this;
        }

        //
        this.m_NeedFireEvent = true;

        //马上减少boss血量 不然就会出bug
        //洗衣机问题，yy测出来的
        var point = elementsByColor.length;//_Obj_ColorBoss_DesLifeRule(visitor, elementsByColor);
        if (point > 0)
        {
            bossManager.desBossPoints(point);
        }

        //
        var count = 0;
        var callBack = function()
        {
            ++count;
            if (count <= 1)
            {
                cc.AudioMng.getInstance().playBossByeBye();
            }

            cc.AudioMng.getInstance().playMonsterEscape();
            if (count < elementsByColor.length)
            {
                return;
            }

           /* var point = _Obj_ColorBoss_DesLifeRule(visitor, elementsByColor);
            if (point <= 0)
            {
                return;
            }

            //
            if (bossManager)
            {
                bossManager.desBossPoints(point);
            }*/

            //
            var continuous = cc.DataMng.getInstance().getContinuousDestroyCount();
            if (continuous < 1)
            {
                continuous = 1;
            }

            var score = 200 * point * continuous;
            if (score)
            {
                //
                cc.DataMng.getInstance().addScore(score);
                cc.EffectMng.getInstance().displayScore(
                    score,
                    self.getPosition(),
                    self.getCurrentColor()
                );
            }
        };

        //
        var myPosition = this.getPosition();
        elementsByColor.forEach(
            function(element)
            {
                //delete element.filterFlag;
                cc.EffectMng.getInstance().displayMonsterFlyTo(element, myPosition, callBack);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    changeColorful : function(callBack)
    {
        //
        cc.AudioMng.getInstance().playHatchOpenOrClose(true);

        //
        this.m_CurrentColor = Defines.COLOR.COLORFUL;
        this.m_ColorBossRender.changeColorful(callBack);
        return this;
    }
});

cc.Obj_ColorBoss.create = function(name, body, parts)
{
    return new cc.Obj_ColorBoss(name, body, parts)
};





