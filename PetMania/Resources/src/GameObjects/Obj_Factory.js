
//======================================================================================================================
cc.IFactoryBuilder = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_Pool = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    createNew: function()
    {
        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    addToPool: function(object)
    {
        this.m_Pool.unshift(object);
        return null;
    }
});

cc.IFactoryBuilder.create = function()
{
    return new cc.IFactoryBuilder();
};


//一个工厂核心的实现 生成普通的怪物 带颜色配置的
cc.FactoryBuilder_Colors = cc.IFactoryBuilder.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //
        this.m_ColorsConfig = [];
        this.m_ColorsPreBuild = [];

        //
        this.m_PoolSize = 3;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(configColors, poolSize, preBuild)
    {
        //
        this.m_ColorsConfig = configColors;
        this.m_ColorsPreBuild = preBuild;

        //
        this.m_PoolSize = poolSize;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getColorsConfig: function()
    {
        return this.m_ColorsConfig.concat();
    },

    //------------------------------------------------------------------------------------------------------------------
    createNewToPool: function()
    {
        //
        var self = this;
        self.colorsListInPool = self.colorsListInPool || [];

        //
        if (this.m_ColorsPreBuild.length > 0)
        {
            self.colorsListInPool = self.colorsListInPool.concat(this.m_ColorsPreBuild);
            this.m_ColorsPreBuild = [];
        }

        if (self.colorsListInPool.length <= this.m_PoolSize)
        {
            var arr = self.m_ColorsConfig.concat();
            Tools.shuffle(arr);
            self.colorsListInPool = self.colorsListInPool.concat(arr);
        }


//        if (createNew == null){
        var createNew = cc.Obj_Monster.create(self.colorsListInPool.shift());
//        }
        if (createNew)
        {
            this.m_Pool.push(createNew);
        }

        return this;
    },

    //添加掉落小怪中有几率为道具的情况
    createSpecialItem: function(){
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();

        if (curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_MINELOTTERY){
            return null;
        }
        var createNew = cc.Obj_Monster.create(this.colorsListInPool.shift());
        var curLevel = cc.DataMng.getInstance().getMineGameLevel();
        if (curLevel > 1){
            var crossPer = cc.DataMng.getInstance().getMineGameLevelItemCreateRate(1); //纵横消几率
            var wrapPer = cc.DataMng.getInstance().getMineGameLevelItemCreateRate(2); //爆炸消几率
            var samePer = cc.DataMng.getInstance().getMineGameLevelItemCreateRate(3); //同色消几率
			
            var showSpecialFlag = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("firstLevelBonus_" + curLevel);
			//计算当前步数
			showSpecialFlag = showSpecialFlag || 0;
			var curMove = cc.DataMng.getInstance().getCurTouchMoves();
			if (showSpecialFlag == 0){
				showSpecialFlag = curMove;
				DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().setDestroyObjectToDiary("firstLevelBonus_" + curLevel,showSpecialFlag);
				return null;
			}
			else if (curMove - showSpecialFlag < 6){
				return null;
			}

	
			
//            //第一次到该等级时必定下落特殊道具
//            if (showSpecialFlag){
//                if (wrapPer == 0){
//                    crossPer = 100;
//                }
//                else if (samePer == 0){
//                    crossPer = 50;
//                    wrapPer = 50;
//                }
//                else {
//                    crossPer = 40;
//                    wrapPer = 40;
//                    samePer = 30;
//                }
//
//                DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().setDestroyObjectToDiary("firstLevelBonus_" + curLevel,0);
//            }
            //test
            crossPer *= 10;
            wrapPer *= 10;
            samePer *= 10;


            var radSum = 1000;
            var radRes = Tools.randomEx(radSum);


            if (crossPer){
                if (radRes < crossPer){
                    return createNew.createMonsterDirection();
                }

                if (radRes < wrapPer + crossPer){
                    return createNew.createMonsterWrap();
                }

                if (radRes < wrapPer + crossPer + samePer){
                    return createNew.createMonsterColorful();
                }
            }

        }
        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    createNew: function()
    {
        this.createNewToPool();

        /*if (_GetFactoryMngPool().length > 0)
        {
			var curItem = _GetFactoryMngPool().shift();
			var curContent = null;
			
			if (this.colorsListInPool.length > 0){
				curContent = curItem[Tools.arrayRandom(this.colorsListInPool)];
			}
			
			if (curContent != null ){
				return curContent;
			}
        }*/

        //
        var managerPool = _GetFactoryMngPool();

        var createNew = this.createSpecialItem();

        if (createNew != null){
            return createNew;
        }

        if (managerPool.hasAny())
        {
            var randColor = Tools.arrayRandom(this.colorsListInPool);
            var object = managerPool.popByColor(randColor);
            if (object)
            {
                return object;
            }
        }

        //
        if (this.m_Pool.length > 0)
        {
            return this.m_Pool.shift();
        }

        return null;
    }
});

cc.FactoryBuilder_Colors.create = function(configColors, preBuild)
{
    var createNew = new cc.FactoryBuilder_Colors();
    if (createNew)
    {
        //
        configColors = configColors || [];
        if (configColors.length < 1)// <= 1)
        {
            configColors = _GetColorsArray();
        }

        createNew.init(configColors, 10, preBuild);
        createNew.createNewToPool();
    }

    return createNew;
};
//======================================================================================================================


//======================================================================================================================
cc.Obj_Factory = cc.Obj_Begin.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(builder, isBlock, flowerSwitch)
    {
        this._super(isBlock);
        this.m_Builder = builder;
		this.hasFlower = flowerSwitch || false;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Obj_Factory";
    },

    //------------------------------------------------------------------------------------------------------------------
    createNew: function()
    {
        //工厂创建 就是用核心m_Builder创建 多个工厂就是实现多个核心
        if (!this.m_Builder)
        {
            return null;
        }

        var newObj = this._create();
        if (newObj)
        {
            this.getParentNode().addNode(newObj);

            //
            newObj.updateNodePosition();
            newObj.renderNode();
            newObj.getSprite().setVisible(true);
        }

        return newObj;
    },

    //------------------------------------------------------------------------------------------------------------------
    _create: function()
    {
        return this.m_Builder ? this.m_Builder.createNew() : null;
    },

    //------------------------------------------------------------------------------------------------------------------
    getBuilder: function()
    {
        return this.m_Builder;
    },

    //------------------------------------------------------------------------------------------------------------------
    addToPool: function(object)
    {
        return this.m_Builder ? this.m_Builder.addToPool(object) : null;
    },
	
	ifHasFlower: function(){
		return this.hasFlower;
	}
});

cc.Obj_Factory.create = function(builder, isBlock, flowerSwitch)
{
    return new cc.Obj_Factory(builder, isBlock, flowerSwitch);
};



