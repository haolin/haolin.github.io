//Touch 移动2个游戏对象后 的处理命令
//var _MOVE_TIME = Defines.TABLE_GRID_SIZE/Defines.OBJ_MOVE_SPEED;

//======================================================================================================================
cc.Cmd_TouchSwapObj = cc.ICommandGroup.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(srcObj, dstObj/*, srcDir, dstDir*/)
    {
        this._super();

        this.srcObj = srcObj;
        this.dstObj = dstObj;

        this.srcDir = _ParseCrossDirection(srcObj.getPosition(), dstObj.getPosition());//srcDir;
        this.dstDir =  _ParseCrossDirection(dstObj.getPosition(), srcObj.getPosition());//dstDir;

        this._gameLevelForTouch = null;

        this.m_IsCommandFinish = true;
        this.m_SwapSuccess = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    //交换的回调函数
    _swapFirst: function (/*sender*/)
    {
        this.m_IsCommandFinish = true;

        this._swapObj(this.srcObj, this.dstObj);

        var needBack = true;

        var srcRule = this.srcObj.getDestroyRule();
        var dstRule = this.dstObj.getDestroyRule();

        if (srcRule && dstRule)
        {
            //
            this.srcObj.touchSwap(this._gameLevelForTouch, this.dstObj);
            this.dstObj.touchSwap(this._gameLevelForTouch, this.srcObj);

            //
            srcRule.parseImpl(this.srcObj.getParentNode(), this.dstObj, this.srcDir, this._gameLevelForTouch);
            dstRule.parseImpl(this.dstObj.getParentNode(), this.srcObj, this.dstDir, this._gameLevelForTouch);

            //
            if (srcRule.can() || dstRule.can())
            {
                var cmd = cc.ToucnSwapCommandMng.getInstance().createCommand(srcRule, dstRule);
                if (cmd)
                {
                    cc.DataMng.getInstance().beginRound();
                    cc.PraiseMng.getInstance().beginRound();

                    this._gameLevelForTouch.addCommand(cmd);
                    needBack = false;
                    this.m_SwapSuccess = true;
                }
                else
                {
                    cc.log(this.dstObj + ", " + this.srcObj);
                }
            }
        }

        //移动回去
        if (needBack)
        {
            this.m_IsCommandFinish = false;

            var self = this;

            //再次移动
            this._move(
                this.srcObj,
                this.dstObj.getPosition(),
                function (/*sender*/)
                {
                    self._swapObj(self.srcObj, self.dstObj);
                    self.m_IsCommandFinish = true;
                }
            );

            //再次移动
            this._move(this.dstObj, this.srcObj.getPosition(), null);
        }
        else {
			var curLevelData = cc.DataMng.getInstance().getCurLevelData();
					
			if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_MINELOTTERY){
				if (cc.DataMng.getInstance().getCurTouchMoves() > cc.DataMng.getInstance().getMaxTouchMoves())
				{
				
					cc.DataMng.getInstance().spendMoney(cc.DataMng.getInstance().getMineGameLevelSpendMoney(), MONEY_SOURCE_SPEND.MONEY_SOURCE_SPEND_MINE_STEP); //单次购买步数
					cc.DataMng.getInstance().addMineGameLevelStep();
				}
			}
        }

        var leftMoves = cc.DataMng.getInstance().getLeftTouchMoves();

        //时间急迫...
        if(leftMoves == 3)
        {
            cc.AudioMng.getInstance().playLeft3();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function (gameLevel)
    {
        this._super(gameLevel);

        //cc.log("cc.Cmd_TouchSwapObj start");

        //
        this._gameLevelForTouch = gameLevel;
        this.m_IsCommandFinish = false;

        //
        this._move(this.srcObj, this.dstObj.getPosition(), this._swapFirst);
        this._move(this.dstObj, this.srcObj.getPosition(), null);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        return this.m_IsCommandFinish && this.m_Commands.length <= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    //交换对象
    _swapObj: function(srcObj, dstObj)
    {
        var srcParent = srcObj.removeFromParentNode();
        var dstParent = dstObj.removeFromParentNode();

        //从父节点拿下来
        /*srcParent.removeNode(srcObj);
        dstParent.removeNode(dstObj);*/

        //重新添加节点
        srcParent.addNode(dstObj);
        dstParent.addNode(srcObj);

        //动画必须停了 不然会有移动后 错一点位置的效果
        srcObj.getSprite().stopActionByTag(Defines.GLOBAL_ACTION_TAGS.ACT_TAG_TOUCH_SWAP_MOVE);
        dstObj.getSprite().stopActionByTag(Defines.GLOBAL_ACTION_TAGS.ACT_TAG_TOUCH_SWAP_MOVE);

        //更新位置
        srcObj.updateNodePosition();
        dstObj.updateNodePosition();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //移动实现
    _move: function(moveObj, moveToPos, _callBack)
    {
        //这么写因为是c++ jsb对动作绑定的问题
        var self = this;

        //_callBack = _callBack || function(){};

        //
        cc.ArmatureDataMng.getInstance().stopArmature(moveObj);

        //
        var sprite = moveObj.getSprite();
        sprite.setVisible(true);

        //var _MOVE_TIME = Defines.TABLE_GRID_SIZE/Defines.OBJ_MOVE_SPEED;
        var seq = cc.Sequence.create(
            cc.MoveTo.create(Defines.TABLE_GRID_SIZE/Defines.OBJ_MOVE_SPEED, moveToPos),
            cc.CallFunc.create(_callBack || function(){}, self)
        );

        seq.setTag(Defines.GLOBAL_ACTION_TAGS.ACT_TAG_TOUCH_SWAP_MOVE);
        sprite.runAction(seq);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        //cc.log("cc.Cmd_TouchSwapObj finish");

        if (!this.m_SwapSuccess)
        {
            cc.AudioMng.getInstance().playTouchSwapFail();

            var afterFailCmd = cc.Cmd_AfterTouchSwapFail.create([this.srcObj, this.dstObj]);
            if (afterFailCmd)
            {
                gameLevel.addCommand(afterFailCmd);
            }
        }

        return this;
    }

});

//工厂方法
cc.Cmd_TouchSwapObj.create = function(srcObj, dstObj/*, srcDir, dstDir*/)
{
    return new cc.Cmd_TouchSwapObj(srcObj, dstObj/*, srcDir, dstDir*/);
};
