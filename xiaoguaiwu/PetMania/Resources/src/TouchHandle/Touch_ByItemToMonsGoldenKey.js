//金钥匙 随机消除1个有底板或牢笼障碍的位置的小怪物及所有障碍。
cc.Touch_ByItemToMonsGoldenKey = cc.Touch_ByItem.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        cc.log(this.description() + " ctor");
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Touch_ByItemToMonsGoldenKey";
    },

    //------------------------------------------------------------------------------------------------------------------
    _checkGrid: function(gameLevel)
    {
		var	hasLock = null;
		var hasBubbleMaker = null; //保存当前的啫喱怪
		var hasBubble = null;//保存当前的泡泡
		
        var itr = gameLevel.getTable().createIterForGrids();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            //
            var grid = itr.getCurrent();
            if (!grid || !(grid instanceof cc.NormalGrid))
            {
                continue;
            }
			
			grid.getChildrenNodes().forEach(
				function(child)
				{
					var isOnlyLock = (child instanceof cc.Obj_Lock) && !( child instanceof cc.Obj_Ice);
					if (isOnlyLock || child instanceof cc.Obj_Floor)
					{
						hasLock = grid;
					}
					else if (child instanceof cc.Obj_Monster)
					{
						if (_IsMonsterHasBubbleCreator(child)){
							hasBubbleMaker = grid;
						}
						else if (_IsMonsterHasBubble(child)){
							hasBubble = grid;
						}
					}
				}
			);
			
        }
		
		if (hasLock != null){
			return hasLock;
		}
		else if (hasBubbleMaker != null){
			return hasBubbleMaker;
		}
		else if (hasBubble != null){
			return hasBubble;
		}

        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    _desObj: function(obj, playPosition, gameLevel)
    {
        //
		if (obj == null ){
			return ;
		}
		else {
			cc.log("golden key = " + obj.description());
		
		}

        obj.destroy(obj, gameLevel, cc.IVisitor.create(), true);
		
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
//                else if (child instanceof cc.Obj_Monster)
//                {
//                    if (_IsAnyBubbleCoverMonster(child))
//                    {
//                        objs = objs.concat(child.getChildrenNodes());
//                    }

                    objs.push(child);
//                }
            }
        );



        //
        objs.forEach(
            function(a_obj)
            {
                self._desObj(a_obj, grid.getPosition(), gameLevel);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _handle: function(gameLevel)
    {
		var grids = [];
		var gridToClean = this._checkGrid(gameLevel);
		if (gridToClean != null){
			grids.push(gridToClean);
		}

        cc.log("火流星 ！！！！！ grids = " + grids);

        if (grids.length <= 0)
        {
            this.endTransposition(gameLevel);
            return this;
        }

        //
        if (!cc.DataMng.getInstance().useItemById(Defines.GameItems.ITEM_GOLDEN_KEY.ID))
        {
            this.endTransposition(gameLevel);
            return this;
        }
		
		DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().addCreateEventToDiary(this.description());
		DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().getCreateObjectContent(this.description());
		
        //
        Tools.shuffle(grids);
        var randFirst = grids.shift();

        //
        var self = this;
        cc.EffectMng.getInstance().displayFireBallDrop(
            randFirst.getPosition(),
            function()
            {
				var goldenKeyTimes = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().getCreateObjectContent(self.description());
				
				if (goldenKeyTimes > 3 ){
					if (goldenKeyTimes < 7){
						var itr = gameLevel.getTable().createIterByCross(randFirst , 1);
						for (itr.first(); !itr.isDone(); itr.next())
						{
							var grid = itr.getCurrent();
							if (grid)
							{
								self._cleanGridObjects(grid, gameLevel);
							}
						}
					}
					else if (goldenKeyTimes < 10){
						var itr = gameLevel.getTable().createIterByRadius(randFirst , 1);
						for (itr.first(); !itr.isDone(); itr.next())
						{
							var grid = itr.getCurrent();
							if (grid)
							{
								self._cleanGridObjects(grid, gameLevel);
							}
						}
					}
				}
				else {
					self._cleanGridObjects(randFirst, gameLevel);
				}
       
                self.endTransposition(gameLevel);
            },
            null);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function(gameLevel)
    {
        //
        return this._handle(gameLevel);
/*
        var self = this;
        var monsters = [];
        var table = gameLevel.getTable();
        var normal = table.getNormalGrids();

        for (var key in normal)
        {
            if (!normal.hasOwnProperty(key))
            {
                continue;
            }

            var itr = normal[key];
            var topObj = itr.getTopObject();
            var bottomObj = itr.getBottomObject();
            var centreObj = itr.getMiddleObject();
            var saveobj = {"centreObj":centreObj};

            if(!centreObj)
            {
                continue;
            }

            if (topObj || bottomObj)
            {
                if(topObj && (topObj instanceof cc.Obj_Lock))
                {
                    saveobj["topObj"] = topObj;
                }
                if(bottomObj  && (bottomObj instanceof cc.Obj_Floor))
                {
                    saveobj["bottomObj"] = bottomObj;
                }


                if(saveobj["topObj"] || saveobj["bottomObj"])
                {
                    monsters.push(saveobj);
                }
            }
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////
            else
            {
                 var childNode = itr.getChildrenNodes().filter(
                    function(child)
                    {
                        return child && child.hasBubbleCreator();
                    }
                );

                if (childNode && childNode.length > 0)
                {
                    monsters.push(saveobj);
                }
            }
        }

        if(monsters.length)
        {
            //道具使用成功
            Tools.shuffle(monsters);
            var tmpTapObj = monsters[0];

            if (!cc.DataMng.getInstance().useItemById(Defines.GameItems.ITEM_GOLDEN_KEY.ID))
            {
                this.endTransposition(gameLevel);
                return this;
            }

            var endPoint = tmpTapObj["centreObj"].getSprite().getPosition();
            cc.EffectMng.getInstance().displayFireBallDrop(endPoint, function(tapObj)
            {
                for(var num in tapObj)
                {
                    if (!tapObj.hasOwnProperty(num))
                    {
                        continue;
                    }

                    self.showDestoryEffect(tapObj, num, endPoint);
                    tapObj[num].destroy(tapObj[num],gameLevel, cc.IVisitor.create(), true);
                    break;
                }

                self.endTransposition(gameLevel);

             },tmpTapObj);
        }
        else
        {
            //没有使用成功，给予提示
            self.endTransposition(gameLevel);
        }

        return this;
        */
    },

    //------------------------------------------------------------------------------------------------------------------
    endTransposition: function(gameLevel)
    {
        //
        this.m_IsFinish = true;
        this.forcedInterrupt();
        gameLevel.addCommand(cc.Cmd_EveryMoveNext.create([]));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    swallowMoveTouch: function()
    {
        return true;
    }

    //------------------------------------------------------------------------------------------------------------------
   /* showDestoryEffect : function (tapObj,num, endPoint)
    {
        if (tapObj[num] instanceof cc.Obj_Floor)
        {
            cc.AudioMng.getInstance().playFloorDestory();
            cc.EffectMng.getInstance().displayFloorDestroy(endPoint);
        }
        else if (tapObj[num] instanceof cc.Obj_Lock)
        {
            cc.EffectMng.getInstance().displayLockDestroy(endPoint);
        }
        else
        {
            var children = tapObj[num].getChildrenNodes();
            children.forEach(
                function(a_childNode)
                {
                    if (a_childNode instanceof cc.Obj_BubbleCreator)
                    {
                        cc.EffectMng.getInstance().displayBubbleCreatorDestroy(
                            endPoint
                        );
                    }
                }
            );
        }

        return this;
    }*/
});

//工厂方法
cc.Touch_ByItemToMonsGoldenKey.create = function()
{
    return new cc.Touch_ByItemToMonsGoldenKey();
};
