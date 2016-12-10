


//======================================================================================================================
cc.DestroyRule_MonsterBase = cc.IDestroyRule.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(src)
    {
        this._super(src);

        //4方向队列
        this.m_Left = [];
        this.m_Right = [];
        this.m_Top = [];
        this.m_Bottom = [];

        //分析结果的值
        this.m_ParseResultVal = cc.IDestroyRule.NORMAL_DES;
        this.m_SwapDirection = Defines.DIRECTION.NULL;
    },

    //------------------------------------------------------------------------------------------------------------------
    isSpecHeighRule: function()
    {
        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    getSwapDirection: function()
    {
        return this.m_SwapDirection;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseImplBase: function(grid, swapOther, swapDir/*, gameLevel*/)
    {
        //方向记录
        this.m_SwapDirection = swapDir;

        //4个方向上的结果
        if (grid)
        {
            this.m_Left = this.parseGridsOfDirection(grid, Defines.DIRECTION.LEFT);
            this.m_Right = this.parseGridsOfDirection(grid, Defines.DIRECTION.RIGHT);
            this.m_Top = this.parseGridsOfDirection(grid, Defines.DIRECTION.TOP);
            this.m_Bottom = this.parseGridsOfDirection(grid, Defines.DIRECTION.BOTTOM);
        }
        else
        {
            //throw new Error("DestroyRule_MonsterBase !grid");
        }

        //如果左->右可以消除?
        if (this.m_Left.length + this.m_Right.length + 1 >= 3)
        {
            this.m_Objects = this.m_Objects.concat(this.m_Left);
            this.m_Objects = this.m_Objects.concat(this.m_Right);
        }

        //如果上->下可以消除?
        if ( this.m_Top.length + this.m_Bottom.length + 1 >= 3)
        {
            this.m_Objects = this.m_Objects.concat(this.m_Top);
            this.m_Objects = this.m_Objects.concat(this.m_Bottom);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseImpl: function(grid, swapOther, swapDir, gameLevel)
    {
        this.parseImplBase(grid, swapOther, swapDir, gameLevel);
        this._afterParseImpl();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //分析结果 因为3消 4消 5消 结果是不一样的 要根据m_ParseResultVal 创建不同的销毁命令
    //例如3消 就是全都消除
    //但是4消 5消 的销毁命令就是创建特殊的东西
    _afterParseImpl: function()
    {
        //
        var highPriority = 3 + 2; //5消 炸弹糖 或者 多彩
        var lowPriority = 3 + 1;  //4消 方向条纹糖
        var noPriority = 3;       //3消

        //算上自己 +1
        var canDesCount = this.getObjects().length + 1;
        if (canDesCount >= highPriority)
        {
            //优先级最大 爆炸或者同色 >=5消
            var canDesInALine = (this.m_Top.length + this.m_Bottom.length + 1 >= highPriority)
                || (this.m_Left.length + this.m_Right.length + 1 >= highPriority);

            if (canDesInALine)
            {
                //在一列上消除超过5个highPriority 就是多彩
                this.m_ParseResultVal = cc.IDestroyRule.CREATE_COLORFUL;
                this.m_IsCreatorRule = true;
            }
            else
            {
                //否则就是爆炸糖果
                this.m_ParseResultVal = cc.IDestroyRule.CREATE_WRAPPER;
                this.m_IsCreatorRule = true;
            }
        }
        else if (canDesCount == lowPriority)
        {
            //优先级其次 横纵4消
            this.m_ParseResultVal = cc.IDestroyRule.CREATE_DIR;
            this.m_IsCreatorRule = true;
        }
        else if (canDesCount == noPriority)
        {
            //优先级最次 普通3消
            this.m_ParseResultVal = cc.IDestroyRule.NORMAL_DES;
        }

        //
        if (this.m_IsCreatorRule)
        {
            //如果是创造必须判断 是否每个都是普通的 如果不是 就是联合消除
            var total = [].concat(this.getSrcObj()).concat(this.getObjects());
            total = total.filter(
                function(an_obj)
                {
                    return an_obj instanceof cc.Obj_Monster && an_obj.isNormal();
                }
            );

            if (total.length <= 0)
            {
                //一个普通的都没有 就将创建型结果 修改为消除型的
                cc.log("一个普通的都没有，就是执行消除命令");
                this.m_IsCreatorRule = false;
                this.m_ParseResultVal = cc.IDestroyRule.NORMAL_DES;
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //分析direction这个方向上所有格子 内 是否有可消除的对象
    parseGridsOfDirection: function(grid, direction)
    {
        //最终结果
        var finalResult = [];

        //雾霾格子不可消除
        var srcCeil = grid.getCeilObject();
        if (srcCeil && srcCeil instanceof cc.Obj_Haze)
        {
            return finalResult;
        }

        //
        var srcColor =  this.getSrcObj().getColor();

        //在目标方向上 寻找每个块
        for (var next = grid.getGridByDirection(direction);
             next;
             next = next.getGridByDirection(direction))
        {
            if (!(next instanceof cc.NormalGrid))
            {
                //只检查普通格子 遇到空格子 就跳出
                break;
            }

            //雾霾格子不可消除
            var ceilObj = next.getCeilObject();
            if (ceilObj && ceilObj instanceof cc.Obj_Haze)
            {
                break;
            }

            //冰块下面不要消除
            var topObj = next.getTopObject();
            if (topObj && topObj instanceof cc.Obj_Ice)
            {
                break;
            }

            var movable = next.getMiddleObject();
            if (!movable || movable == this.getSrcObj())
            {
                break;
            }

            if (!(movable instanceof cc.Obj_Monster) || movable.getColor() != srcColor)
            {
                break;
            }

            finalResult.push(movable);
        }

        //这个方向上所有格子 checkObj可以摧毁的 OBJ
        return finalResult;
    },

    //------------------------------------------------------------------------------------------------------------------
    createCommand: function()
    {
        switch(this.m_ParseResultVal)
        {
        //创建 方向 条纹糖
        case cc.IDestroyRule.CREATE_DIR:
            return cc.Cmd_CreateMonsterDirection.create(this.getSrcObj(), this.getObjects(), this.getSwapDirection());

        //爆炸糖果
        case cc.IDestroyRule.CREATE_WRAPPER:
            return cc.Cmd_CreateMonsterWrap.create(this.getSrcObj(), this.getObjects());

        //多彩
        case cc.IDestroyRule.CREATE_COLORFUL:
            return cc.Cmd_CreateMonsterColorful.create(this.getSrcObj(), this.getObjects(), this.getSwapDirection());

        default:
            break;
        }

        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    can: function()
    {
        switch(this.m_ParseResultVal)
        {
        //普通3消
        case cc.IDestroyRule.NORMAL_DES:
            return this.getObjects().length + 1 >= 3;

        //方向条纹糖
        case cc.IDestroyRule.CREATE_DIR:
            return this.getObjects().length + 1 >= 3 + 1;

        //包装糖果
        case cc.IDestroyRule.CREATE_WRAPPER:
            return this.getObjects().length + 1 >= 3 + 2;

        //多彩
        case cc.IDestroyRule.CREATE_COLORFUL:
            return this.getObjects().length + 1 >= 3 + 2;

        default:
            break;
        }

        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    suppose: function()
    {
        var resGroups = [];

        var allDirections = Defines.DIRECTION.CROSS.concat();
        var srcObj = this.getSrcObj();
        var grid = srcObj.getParentNode();
        var self = this;

        allDirections.forEach(
            function(dir)
            {
                var gridOfDir = grid.getGridByDirection(dir);
                if (!gridOfDir || !(gridOfDir instanceof cc.NormalGrid))
                {
                    return;
                }

                var hisObj = gridOfDir.getTouchEnabledObject();
                if (!hisObj)
                {
                    return;
                }

                if (!self.parseImpl(gridOfDir, null, Defines.DIRECTION.NULL, null).can())
                {
                    return;
                }

                resGroups.push(self.m_Objects.concat());
            }
        );

        return resGroups;
    }

});

//工厂方法
cc.DestroyRule_MonsterBase.create = function(srcObject)
{
    return new cc.DestroyRule_MonsterBase(srcObject);
};





