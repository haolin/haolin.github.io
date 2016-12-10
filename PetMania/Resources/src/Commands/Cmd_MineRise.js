//======================================================================================================================
var Cmd_MineRiseMulti = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(objMines, speed)
    {
        this._super();

        //
        this._objMines = objMines;
        this._grids = [];
        this._speed = speed;
        this._finishedCounts = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "Cmd_MineRiseMulti";
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //
        var self = this;
        this._objMines.forEach(
            function(mine)
            {
                cc.ArmatureDataMng.getInstance().stopArmature(mine);
                mine.getSprite().setVisible(true);
                mine.updateNodePosition();
                self._grids.push(
                    mine.removeFromParentNode().getGridByDirection(Defines.DIRECTION.TOP)
                );
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        //
        var self = this;
        this._objMines.forEach(
            function(mine, index)
            {
                //
                var grid = self._grids[index];
                var pos0 = mine.getPosition();
                var pos1 = grid.getPosition();

                //
                pos0.y += self._speed;
                if (pos0.y >= pos1.y)
                {
                    pos0.y = pos1.y;
                    ++self._finishedCounts;
                }

                //
                mine.setPosition(pos0);
                mine.getSprite().setPosition(pos0);
            }
        );

        return self._finishedCounts >= this._objMines.length;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        this._super(gameLevel);

        //
        var self = this;
        this._objMines.forEach(
            function(mine, index)
            {
                //
                if (!(self._grids[index] instanceof cc.NormalGrid))
                {
                    gameLevel.disposal(mine)
                }
                else
                {
                    self._grids[index].addNode(mine);
                    mine.updateNodePosition();
                    mine.renderNode();
                }
            }
        );

        return this;
    }
});

//======================================================================================================================
var Cmd_MineRiseBackToFactoryMulti = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(objMines, speed)
    {
        this._super();

        //
        this._objMines = objMines;
        this._grids = [];

        //
        this._orgRects = [];
        this._srcRects = [];
        this._srcHeights = [];
        this._speed = speed;

        //
        this._finishedCounts = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        var self = this;
        this._objMines.forEach(
            function(mine, index)
            {
                //
                cc.ArmatureDataMng.getInstance().stopArmature(mine);
                mine.getSprite().setVisible(true);

                //
                self._grids[index] = mine.removeFromParentNode().getGridByDirection(Defines.DIRECTION.TOP);
                self._orgRects[index] = mine.getSprite().getTextureRect();
                self._srcRects[index] = mine.getSprite().getTextureRect();
                self._srcHeights[index] = 0;

                MonsterRender.updateSpecMonsterDecorationVisible(mine, false);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _command: function(/*gameLevel, time*/)
    {
        var self = this;
        this._objMines.forEach(
            function(mine, index)
            {
                //
                self._srcHeights[index] += self._speed * 2;
                if (self._srcHeights[index] >= self._orgRects[index].height)
                {
                    self._srcHeights[index] = self._orgRects[index].height;
                    ++self._finishedCounts;
                }

                //
                mine.getSprite().setTextureRect(
                    cc.rect(self._srcRects[index].x,
                        self._srcRects[index].y + self._srcHeights[index],
                        self._srcRects[index].width,
                        self._srcRects[index].height - self._srcHeights[index]));
            }
        );

        //
        return self._finishedCounts >= this._objMines.length;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        return this._command(gameLevel, time);
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        this._super(gameLevel);

        //
        var self = this;
        this._objMines.forEach(
            function(mine, index)
            {
                mine.getSprite().setTextureRect(self._orgRects[index]);
                mine.getSprite().setVisible(false);

                //
                var isFactory = self._grids[index] instanceof cc.EmptyGrid && self._grids[index].getContent() instanceof cc.Obj_Factory;
                if (isFactory)
                {
                    self._grids[index].getContent().addToPool(mine);
                }
                else
                {
                    gameLevel.disposal(mine);
                }
            }
        );

        return this;
    }
});

//======================================================================================================================
var Cmd_CreateMineAndRiseMulti = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(objMines, grids, speed)
    {
        this._super();

        //
        this._objMines = objMines;
        this._grids = grids;
        this._speed = speed;
        this._finishedCounts = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "Cmd_CreateMineAndRiseMulti";
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        var self = this;
        this._objMines.forEach(
            function(mine, index)
            {
                var pos = self._grids[index].getGridByDirection(Defines.DIRECTION.BOTTOM).getPosition();

                //
                mine.renderNode();
                mine.getSprite().setPosition(pos);
                self.makePopTip(mine.getSprite());
                mine.setPosition(pos);

            }
        );

        return this;
    },

    makePopTip: function(spr) //制作上升气泡
    {
        var mineSpecialRecordArr = cc.DataMng.getInstance().getMineGameSpecialPos();
        if (mineSpecialRecordArr){
//          if (mineSpecialRecordArr[0] == self._moveTo.getPosition().x){ //气泡提示的目标位置
            var showFlag = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("desLine_show_" + mineSpecialRecordArr[1]);
            if (!showFlag){//目标位置是否提示过
//                cc.EffectMng.getInstance().addPopUpTip(spr.getPosition());
                //气泡开启标记
                cc.DataMng.getInstance().setMineGamePopTipPos(spr.getPosition());
                DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().setDestroyObjectToDiary("desLine_show_" + mineSpecialRecordArr[1], 1);
            }
//          }
        }
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        //
        var self = this;
        this._objMines.forEach(
            function(mine, index)
            {
                //
                var pos0 = mine.getPosition();
                var pos1 = self._grids[index].getPosition();
                pos0.y += self._speed;

                //
                if (pos0.y >= pos1.y)
                {
                    pos0.y = pos1.y;
                    ++self._finishedCounts;
                }

                //
                mine.setPosition(pos0);
                mine.getSprite().setPosition(pos0);
            }
        );

        return self._finishedCounts >= this._objMines.length;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        this._super(gameLevel);

        //
        var self = this;
        this._objMines.forEach(
            function(mine, index)
            {
                if (!(self._grids[index] instanceof cc.NormalGrid))
                {
                    gameLevel.disposal(mine)
                }
                else
                {
                    self._grids[index].addNode(mine);
                    mine.renderNode();
                    mine.updateNodePosition();
                }
            }
        );

        return this;
    }
});


//======================================================================================================================
var Cmd_MineRiseGroup = cc.ICommandGroup.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(step)
    {
        this._super();

        this._step = step;
        this._mySpeed = Defines.TABLE_GRID_SIZE * Defines.FPS * 6.18;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);
        this.restart(gameLevel);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _restartMove: function(gameLevel)
    {
        //
        var self = this;

        //
        var monsters = [];
        var normalRise = [];
        var backToFactory = [];

        //
        var itr = gameLevel.getTable().createIterForMiddleObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var middleObj = itr.getCurrent();
            if (middleObj)
            {
                monsters.push(middleObj);

                //
                var topGrid = middleObj.getParentNode().getGridByDirection(Defines.DIRECTION.TOP);
                var isTopFactory = topGrid instanceof cc.EmptyGrid && topGrid.getContent() instanceof cc.Obj_Begin;
                if (isTopFactory)
                {
                    backToFactory.push(middleObj);
                }
                else
                {
                    normalRise.push(middleObj);
                }
            }
        }

        //
        if (normalRise.length > 0)
        {
            self.addCommand((new Cmd_MineRiseMulti(normalRise, self._mySpeed)).start(gameLevel));
        }

        if (backToFactory.length > 0)
        {
            self.addCommand((new Cmd_MineRiseBackToFactoryMulti(backToFactory, self._mySpeed)).start(gameLevel));
        }

        return this;
    },
    //产生采矿模式特殊奖励的行
    isDesLineComing: function(){
        var levelData = cc.DataMng.getInstance().getCurLevelData();
        if (levelData.MODEL != Defines.TARGET_MODEL.MODEL_MINELOTTERY){
            return false;
        }

        var mineSpecialRecordArr = cc.DataMng.getInstance().getMineGameSpecialPos();

        var desLineNum = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterMineDesLine");
        desLineNum = desLineNum || 0;

        if (mineSpecialRecordArr){
//          var existLineShowNum = mineSpecialRecordArr[1];
//          if (desLineNum == existLineShowNum){
//            if (mineSpecialRecordArr[1]){
            return false;
//          }
        }

        desLineNum += 2;

        var desLineExist = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().getCreateObjectContent("desLine_" + desLineNum) || 0;
        var desLineFlag = false;
		
		var SPEC_AWARDPOINTArr = cc.MineMng.getInstance().getSpec_AWARDPOINT();
        if (desLineNum == SPEC_AWARDPOINTArr[0] || desLineNum == SPEC_AWARDPOINTArr[0] + 1 || desLineNum == SPEC_AWARDPOINTArr[0] - 1 || desLineNum == SPEC_AWARDPOINTArr[0] + SPEC_AWARDPOINTArr[1] + Tools.randomEx(SPEC_AWARDPOINTArr[2])){
            desLineFlag = true;
        }

        return !desLineExist && desLineFlag;
    },

    ifShowSpecialPos: function(pos){
        var desLineNum = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterMineDesLine");
        desLineNum = desLineNum || 0;

        var mineSpecialRecordArr = cc.DataMng.getInstance().getMineGameSpecialPos();
        if (mineSpecialRecordArr){
            var existLineShowNum = mineSpecialRecordArr[1];
            if (existLineShowNum < desLineNum ){
                if (pos == mineSpecialRecordArr[0]){//cc.DataMng.getInstance().getMineGameSpecialPos().x){
                    return true;
                }
            }
        }
        return false;
    },
    //------------------------------------------------------------------------------------------------------------------
    _restartCreateMine: function(gameLevel)
    {
        //
        var newMines = [];
        var grids = [];

        //
        var itr = gameLevel.getTable().createIterForEmptyObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var obj = itr.getCurrent();
            if (obj && obj instanceof cc.Obj_FactoryMine)
            {
                var desLineFlag = this.isDesLineComing();
                var levelData = cc.DataMng.getInstance().getCurLevelData();
                if (this.ifShowSpecialPos(obj.getParentNode().getGridPos().x)){
                    var mineSpecialRecordArr = cc.DataMng.getInstance().getMineGameSpecialPos();
                    if (mineSpecialRecordArr){
                        newMines.push(cc.Obj_MonsterSpecial.create(mineSpecialRecordArr[2], levelData));
                        grids.push(obj.getParentNode().getGridByDirection(Defines.DIRECTION.TOP));
                        cc.DataMng.getInstance().setMineGamePopTipPos(null);
                        cc.DataMng.getInstance().setMineGameSpecialPos(null);//[0,0,0]);
                    }
                }
                else {
                    if (desLineFlag){
                        var targetDesLine = cc.MineMng.getInstance().getSpec_Award();
                        var rateDesLine = cc.MineMng.getInstance().getSpec_RATE();
                        var radSum = 0;
                        var getRad = Tools.randomEx(100);
                        for (var i = 0; i < targetDesLine.length; i++){
                            radSum += rateDesLine[i];
                            if (getRad < radSum){
                                var desLineNum = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_MonsterMineDesLine");
                                desLineNum = desLineNum || 0;
                                cc.DataMng.getInstance().setMineGameSpecialPos([obj.getParentNode().getGridPos().x, desLineNum,i, targetDesLine[i]]);
                                break;
                            }
                        }
                    }

                    newMines.push(cc.Obj_MonsterMine.create(false, cc.DataMng.getInstance().getCurLevelData()));
                    grids.push(obj.getParentNode().getGridByDirection(Defines.DIRECTION.TOP));
                }
            }
        }

        this.addCommand((new Cmd_CreateMineAndRiseMulti(newMines, grids, this._mySpeed)).start(gameLevel));
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    restart: function(gameLevel)
    {
        this._restartMove(gameLevel);
        this._restartCreateMine(gameLevel);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        if (!this.isStart())
        {
            this.start(gameLevel);
        }

        //
        for (var indx = 0; indx < this.m_Commands.length;)
        {
            if (this.m_Commands[indx].command(gameLevel, time))
            {
                this.m_Commands[indx].finish(gameLevel);
                this.m_Commands.splice(indx, 1);
            }
            else
            {
                ++indx;
            }
        }

        //
        if (this.m_Commands.length <= 0)
        {
            if (this._step > 0)
            {
                --this._step;
                this.restart(gameLevel);
            }
        }

        return this.m_Commands.length <= 0 && this._step <= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        this._super(gameLevel);
        return this;
    }
});

//
Cmd_MineRiseGroup.create = function(step)
{
    return new Cmd_MineRiseGroup(step);
};



