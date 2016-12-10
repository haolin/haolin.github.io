//======================================================================================================================
var TouchPad_SwapObject = TouchPad.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(gameLevel)
    {
        this._super();
        cc.associateWithNative(this, cc.Layer);

        //
        this.gameLevel = gameLevel;
        this.touchBegin = null;
        this.touchEnd = null;

        //
        this.directions = Defines.DIRECTION.CIRCLE.concat();

        //
        this.setTouchEnabled(true);
    },

    //------------------------------------------------------------------------------------------------------------------
    _startStareArmature: function()
    {
        if (!this.gameLevel.isStart() || !this.touchBegin || !cc.ArmatureDataMng.getInstance().isValid())
        {
            return this;
        }

        //
        var grid = this.gameLevel.getTable().getGridByPos(this.touchBegin);
        if (!grid || !(grid instanceof cc.NormalGrid))
        {
            return this;
        }

        var mons = grid.getMiddleObject();
        if (!mons)
        {
            return this;
        }

        //
        if (!cc.ArmatureDataMng.getInstance().touchArmature(mons))
        {
            return this;
        }

        //
        mons.getSprite().setVisible(false);

        var center = mons.getParentNode();
        this.directions.forEach(
            function(dir)
            {
                var dirGrid = center.getGridByDirection(dir);
                if (!dirGrid || !(dirGrid instanceof cc.NormalGrid))
                {
                    return;
                }

                var dirMons = dirGrid.getMiddleObject();
                if (!dirMons)
                {
                    return;
                }

                if (cc.ArmatureDataMng.getInstance().stareArmature(dirMons, mons))
                {
                    dirMons.getSprite().setVisible(false);
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _stopStareArmature: function()
    {
        if (!this.gameLevel.isStart() || !this.touchBegin || !cc.ArmatureDataMng.getInstance().isValid())
        {
            return this;
        }

        //
        var grid = this.gameLevel.getTable().getGridByPos(this.touchBegin);
        if (!grid || !(grid instanceof cc.NormalGrid))
        {
            return this;
        }

        var mons = grid.getMiddleObject();
        if (mons)
        {
            cc.ArmatureDataMng.getInstance().stopArmature(mons);

            if (mons.getSprite())
            {
                mons.getSprite().setVisible(true);
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    onTouchesBegan: function(touches)
    {
        if (!this.touchBegin && gameTableLayer())
        {
            //
            var location = gameTableLayer().convertTouchToNodeSpace(touches[0]);

            //
            this.touchBegin = cc.p(location.x, location.y);
            this.touchEnd = cc.p(this.touchBegin.x, this.touchBegin.y);

            //
            this.gameLevel.forceFinishSomeCommands();

            //
            if (this.gameLevel.canTouch())
            {
                this._startStareArmature();
            }
            else
            {

            }
        }

        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    onTouchesMoved: function(touches)
    {
        if (!this.touchBegin || !gameTableLayer())
        {
            return true;
        }

        var location = gameTableLayer().convertTouchToNodeSpace(touches[0]);
        this.touchEnd = cc.p(location.x, location.y);

        //
        var touchMoveDistanceOK = (cc.pDistance(this.touchBegin, this.touchEnd) >= Defines.TABLE_GRID_SIZE/2);
        if (touchMoveDistanceOK)
        {
            //Step1: 优先处理
            this.gameLevel.forceFinishSomeCommands();

            //
            if (this.gameLevel.canTouch())
            {
				var curLevelData = cc.DataMng.getInstance().getCurLevelData();

				if (curLevelData.MODEL ==Defines.TARGET_MODEL.MODEL_MINELOTTERY){
                    var spendMoney = cc.DataMng.getInstance().getMineGameLevelSpendMoney();
                    if (cc.DataMng.getInstance().canSpendMoney(spendMoney))
                    {
                        this.gameLevel.addTouchSwapObjectsCommand(this.touchBegin, this.touchEnd);
                    }
                    else
                    {
                        cc.GUIBuyDiamond.getInstance().openWindow(_GUILayer(), 1, GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND);
                    }
                }
				else {
					this.gameLevel.addTouchSwapObjectsCommand(this.touchBegin, this.touchEnd);
				}
            }

            //
            this.onTouchesEnded();
        }

        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    onTouchesEnded: function()
    {
        //
        this._stopStareArmature();

        //
        this.touchBegin = null;
        this.touchEnd = null;

        // 加一个空命令 触发提示
        //cc.log("cc.Cmd_Empty.create() 111");
        //this.gameLevel.addCommand(cc.Cmd_Empty.create());
        return true;
    }
});

//
TouchPad_SwapObject.create = function(gameLevel)
{
    return new TouchPad_SwapObject(gameLevel);
};

