//金钥匙 随机消除1个有底板或牢笼障碍的位置的小怪物及所有障碍。 new

var keyNotEnd = false;

cc.Touch_ByItemToMonsGoldenKey_new = cc.Touch_ByItem.extend({
    //第一个选中的元素
    beginPosition:null,
	
    //------------------------------------------------------------------------------------------------------------------
    ctor: function(guide_time)
    {
        this._super();
        cc.log(this.description() + " ctor");
		this._guide_Time = guide_time;
		this.firstObj = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Touch_ByItemToMonsGoldenKey_new";
    },

    //------------------------------------------------------------------------------------------------------------------
    _desObj: function(obj, playPosition, gameLevel, visitor)
    {
        //
		if (obj == null ){
			return ;
		}
		else {
			cc.log("golden key = " + obj.description());
		
		}
		
		if (obj instanceof cc.Obj_Flower){
			return ;
		}
		
		//var visitor = cc.ScoreVisitorSingle.create(Defines.SCORE_TYPE.SCORE_NULL);

		obj.destroy(obj, gameLevel, visitor, true);
		
        //
        if (obj instanceof cc.Obj_Floor)
        {
            cc.AudioMng.getInstance().playFloorDestory();
            cc.EffectMng.getInstance().displayFloorDestroy(playPosition);
        }
        else if (obj instanceof cc.Obj_Lock)
        {
            cc.EffectMng.getInstance().displayLockDestroy(playPosition);
        }
        else if (obj instanceof cc.Obj_Bubble || obj instanceof cc.Obj_BubbleCreator)
        {
            cc.EffectMng.getInstance().displayBubbleCreatorDestroy(playPosition);
        }
		else if (obj instanceof cc.Obj_Ice)
		{
			cc.EffectMng.getInstance().displayIceDestroy(playPosition);
		}

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _cleanGridObjects: function(grid, gameLevel)
    {
        var self = this;
        var objs = [];	

        grid.getChildrenNodes().forEach(
            function(child)
            {
//                var isOnlyLock = (child instanceof cc.Obj_Lock) && !( child instanceof cc.Obj_Ice);
//                if (isOnlyLock || child instanceof cc.Obj_Floor)
//                {
//                    objs.push(child)
//                }
                if (child instanceof cc.Obj_Monster)
                {
                    if (_IsAnyBubbleCoverMonster(child) )
                    {
                        objs = objs.concat(child.getChildrenNodes());
                    }
				}
				
				
//				if (child instanceof cc.Obj_MonsterColorful){
//
//				}
                    objs.push(child);
//                }
            }
        );
		cc.DataMng.getInstance().continuousDestroy();
		var visitor = cc.ScoreVisitorSingle.create(Defines.SCORE_TYPE.SCORE_DES_NORMAL);
		
        //
        objs.forEach(
            function(a_obj)
            {
				if (a_obj instanceof cc.Obj_MonsterColorful || a_obj instanceof cc.Obj_MonsterDirection || a_obj instanceof cc.Obj_MonsterWrap){
					a_obj.toFire(gameLevel);
				}
                else {
					self._desObj(a_obj, grid.getPosition(), gameLevel , visitor);
				}
            }
        );
		
		visitor.visitFinish();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function(gameLevel, beginPos)
    {
		var tapGrid = gameLevel.getTable().getGridByPos(beginPos);
        if (!tapGrid || this.firstObj)
        {
            return null;
        }

		var tapFlag = true;
		var allNull = true;
		if (!tapGrid.getTouchEnabledObject)
		{
			tapFlag = false;
		}

		tapGrid.getChildrenNodes().forEach(
			function(child)
			{
				if (child){
					allNull = false;
				}

				var isOnlyLock = (child instanceof cc.Obj_Lock) || ( child instanceof cc.Obj_Ice);
				if (isOnlyLock || child instanceof cc.Obj_Floor)
				{
					tapFlag = true;
				}

				if (child instanceof cc.Obj_Boss){
					tapFlag = false;
				}

			}
		);

		if (!tapFlag || allNull){
			return null;
		}
		
		keyNotEnd = true;
        //
		if (cc.Guide.buy_GoldenKey != 1){
			if (!cc.DataMng.getInstance().useItemById(Defines.GameItems.ITEM_GOLDEN_KEY.ID) && cc.Guide.round_12 == 0)
			{
				this.endTranspositionSafe(gameLevel);
				return this;
			}
		}
		else {
			cc.Guide.buy_GoldenKey = 0;
		}
		
		this.firstObj = gameLevel.getTable().getGridByPos(beginPos);
		
		if(!this.beginPosition)
        {
            this.beginPosition = beginPos;

			//
			var self = this;
			this.fireAnimate(beginPos, this.firstObj, gameLevel);
			
        }

        return this;
    },
	
    //------------------------------------------------------------------------------------------------------------------
    fireAnimate: function(beginPos, firstObj, gameLevel, _guide_Time)
    {
		var self = this;
		
		var goldenKeyTimes = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().getCreateObjectContent(self.description());
		
		if (_guide_Time){
			goldenKeyTimes = _guide_Time;
		}
//		goldenKeyTimes = 7;
		if (goldenKeyTimes > 2 ){
			if (goldenKeyTimes < 6){
				var itr = gameLevel.getTable().createIterByCross(firstObj , 1);
				var num = itr.length();
				
				for (itr.first(); !itr.isDone(); itr.next())
				{
					num --;
					if (itr.getCurrent()==firstObj) {
						cc.log("num = " + num);
					}
					cc.EffectMng.getInstance().displayFireBallDrop(
						itr.getCurrent().getPosition(),
						2,
						function(endPos,flag){
							var grid = gameLevel.getTable().getGridByPos(endPos);
							if (grid)
							{
								self._cleanGridObjects(grid, gameLevel);
							}
							if (flag){
								self.endTransposition(gameLevel);
							}
						},
						num,
						itr.getCurrent()==firstObj);

				}
			}
			else {//if (goldenKeyTimes < 10){
				var itr = gameLevel.getTable().createIterByRadius(firstObj , 1);
				var num = itr.length();
				for (itr.first(); !itr.isDone(); itr.next())
				{
					num --;
					cc.EffectMng.getInstance().displayFireBallDrop(
						itr.getCurrent().getPosition(),
						3,
						function(endPos,flag){
							var grid = gameLevel.getTable().getGridByPos(endPos);
							if (grid)
							{
								self._cleanGridObjects(grid, gameLevel);
							}
							if (flag){
								self.endTransposition(gameLevel);
							}
						},
					num,
					itr.getCurrent()==firstObj);
				}
			}
		}
		else {
			cc.EffectMng.getInstance().displayFireBallDrop(
					firstObj.getPosition(),
					1,
					function(endPos,flag){
						self._cleanGridObjects(firstObj, gameLevel);
						if (flag){
							self.endTransposition(gameLevel);
						}
					},
					0,
					true);

		}

		cc.EffectMng.getInstance().displayLabelHide();
		
		cc.GUIGameLevel.getInstance().removeBlackScreen();
    },
    isDirectly: function()
    {
        //子类实现
        return false;
    },
    //------------------------------------------------------------------------------------------------------------------
    endTransposition: function(gameLevel)
    {
		cc.log("endTransposition");
        //
        this.m_IsFinish = true;
        this.forcedInterrupt();
		gameLevel.addCommand(cc.Cmd_EveryDestroy.create([]));
        gameLevel.addCommand(cc.Cmd_EveryMoveNext.create([]));
        cc.DataMng.getInstance().beginRound(true);

		if (cc.Guide.round_12 == 2 || cc.Guide.round_12 == 5 || cc.Guide.round_12 == 8){
			cc.log("cc.guide.next + " + cc.Guide.round_12);
			cc.Guide.round_12 ++;
			_ChangeGameLevelStateTo(cc.State_GameLevel.getInstance(), "841");
			if (cc.Guide.round_12 == 9){
				DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().setCreateObjectContent("Touch_ByItemToMonsGoldenKey_new", 0);
			}
		}
		
		keyNotEnd = false;
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    endTranspositionSafe: function(gameLevel)
    {
        //
        this.m_IsFinish = true;
        this.forcedInterrupt();
		gameLevel.addCommand(cc.Cmd_EveryDestroy.create([]));
        gameLevel.addCommand(cc.Cmd_EveryMoveNext.create([]));
        cc.DataMng.getInstance().notifyGUIObservers(NOTIFY_EVENT.FOR_SCORE);
        cc.DataMng.getInstance().beginRound(true);
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    swallowMoveTouch: function()
    {
        return true;
    }
});

//工厂方法
cc.Touch_ByItemToMonsGoldenKey_new.create = function()
{
    return new cc.Touch_ByItemToMonsGoldenKey_new();
};

cc.Touch_ByItemToMonsGoldenKey_new.guide = function(beginPos, firstObj, gameLevel, _guide_Time)
{
	var guideTry = new cc.Touch_ByItemToMonsGoldenKey_new();
	guideTry.forcedInterrupt = function()
        {
//            cc.GUIGameLevel.getInstance().getGameItem().setLockGUIUpdate(false);
        };
	_ChangeGameLevelStateTo(cc.State_GameItem.getInstance(), "1100");
	guideTry.fireAnimate(beginPos, firstObj, gameLevel, _guide_Time);
	return ;
};
