//State_GameItem 继承IState
//游戏道具

//======================================================================================================================
cc.State_GameItem = cc.IState.extend({

    //-----------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();

        //this.m_GameLevel = null;
        this.m_TouchedBeginPos = {x: 0, y: 0};
        this.m_TouchedEndPos = {x: 0, y: 0};
        this.m_TouchByItem = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    getTouchByItem: function()
    {
        return this.m_TouchByItem;
    },

    //------------------------------------------------------------------------------------------------------------------
    getGameLevel: function()
    {
        return _GameLevelStateWrapper.getGameLevel();
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "State_GameItem";
    },

    //--------------------------------------------------------------------------------------------------------------
    init: function(itemFlag, srcPos)
    {
        var self = this;

        self.m_TouchByItem = this._genTouchByItem(itemFlag, srcPos);

        self.m_TouchByItem.forcedInterrupt = function()
        {
            cc.GUIGameLevel.getInstance().getGameItem().setLockGUIUpdate(false);
            self.handleTouchesEnded();
        };

        return self;
    },

    //------------------------------------------------------------------------------------------------------------------
    canUse: function()
    {
        if (!this.m_TouchByItem)
        {
            return true;
        }

        return this.m_TouchByItem instanceof cc.Touch_ByItemContinue;
    },

    //--------------------------------------------------------------------------------------------------------------
    useAgain: function(itemFlag, srcPos)
    {
        if (this.m_TouchByItem)
        {
            this.m_TouchByItem.useAgain(itemFlag, srcPos, /*this.m_GameLevel*/this.getGameLevel());
        }

        return this;
    },

    //--------------------------------------------------------------------------------------------------------------
    //道具触摸事件依据itemFlag的生成器
    _genTouchByItem: function (itemFlag, srcPos)
    {
        switch(itemFlag)
        {
        /*
        case Defines.ITEM_FLAG.ITEM_DES_POINT:
            return cc.Touch_ByItemDesPoint.create();

        case Defines.ITEM_FLAG.ITEM_DES_LINE:
            return cc.Touch_ByItemDesLine.create();
            */


        case Defines.GameItems.ITEM_DIRECTION_EX.ID:
        case Defines.GameItems.ITEM_COLORFUL_EX.ID:
        case Defines.GameItems.ITEM_WARP_EX.ID:
            return cc.Touch_ByItemContinue.create(itemFlag, srcPos);


        //case Defines.GameItems.ITEM_DIRECTION_EX.ID:
            //return cc.Touch_ByItemToMonsDirectionEx.create(srcPos);

        //case Defines.GameItems.ITEM_COLORFUL_EX.ID:
            //return cc.Touch_ByItemToMonsColorfulEx.create(srcPos);

        //case Defines.GameItems.ITEM_WARP_EX.ID:
            //return cc.Touch_ByItemToMonsWrapEx.create(srcPos);

        case Defines.GameItems.ITEM_TRANSPOSITION.ID:
            {
                // 显示第一行文字；
                cc.EffectMng.getInstance().displayLabelShow(Resource.ChineseTxt[96]);
            }
            return cc.Touch_ByItemToMonsTransposition.create();

        case Defines.GameItems.ITEM_TIME.ID:
            return cc.Touch_ByItemToMonsTime.create();

        case Defines.GameItems.ITEM_STAINING.ID:
            return cc.Touch_ByItemToMonsStaining.create(srcPos);

        case Defines.GameItems.ITEM_STORM.ID:
            return cc.Touch_ByItemToMonsStorm.create();

        case Defines.GameItems.ITEM_GOLDEN_KEY.ID:
			{
				if (cc.DataMng.getInstance().getCurLevelData().MODEL == Defines.TARGET_MODEL.MODEL_FLOWER){
					cc.EffectMng.getInstance().displayLabelShow(Resource.ChineseTxt["FireDropTip"]);//Resource.ChineseTxt[96]);
				}
				else {
                // 显示第一行文字；
					cc.EffectMng.getInstance().displayLabelShow(Resource.ChineseTxt["FireDropTip"]);//Resource.ChineseTxt[96]);				
				}
            }

			cc.GUIGameLevel.getInstance().makeBlackScene(this.getGameLevel());
			if (cc.Guide.buy_GoldenKey == -1){
				cc.Guide.buy_GoldenKey = 1;
			}
			return cc.Touch_ByItemToMonsGoldenKey_new.create();

        case Defines.GameItems.ITEM_ICE.ID:
            return cc.Touch_ByItemIce.create();

        default:
            break;
        }

        return cc.Touch_ByItem.create();
    },

    //--------------------------------------------------------------------------------------------------------------
    handleTouchesBegan: function (touches/*, event*/)
    {
        if (!this.m_TouchByItem)
        {
            return this;
        }

        var location = gameTableLayer().convertTouchToNodeSpace(touches[0]);
        this.m_TouchedBeginPos.x = location.x;
        this.m_TouchedBeginPos.y = location.y;

        if (this.m_TouchByItem.swallowMoveTouch())
        {
            this.m_TouchByItem.handle(/*this.m_GameLevel*/this.getGameLevel(), this.m_TouchedBeginPos);
        }

        return this;
    },

    //--------------------------------------------------------------------------------------------------------------
    handleTouchesMoved: function (touches/*, event*/)
    {
        if (!this.m_TouchByItem)
        {
            return this;
        }

        if (this.m_TouchByItem.swallowMoveTouch() || this.m_TouchByItem.isFinish())
        {
            return this;
        }

        var location = gameTableLayer().convertTouchToNodeSpace(touches[0]);
        this.m_TouchedEndPos.x = location.x;
        this.m_TouchedEndPos.y = location.y;

        this.m_TouchByItem.handle(/*this.m_GameLevel*/this.getGameLevel(), this.m_TouchedBeginPos, this.m_TouchedEndPos);

        return this;
    },

    //--------------------------------------------------------------------------------------------------------------
    handleTouchesEnded: function (/*touches, event*/)
    {
        if (!this.m_TouchByItem)
        {
            return this;
        }

        this.m_TouchByItem.handleFinish(/*this.m_GameLevel*/this.getGameLevel());

        if (this.m_TouchByItem.isFinish())
        {
            this.m_TouchByItem = null;
            //cc.GameManager.getInstance().changeTo(cc.State_GameLevel.getInstance());
            _ChangeGameLevelStateTo(cc.State_GameLevel.getInstance());

            //
            //var emptyCommandForUseItemFin = cc.Cmd_Empty.create();
            //cc.State_GameLevel.getInstance().m_GameLevel.addCommand(emptyCommandForUseItemFin);
            cc.log("cc.Cmd_Empty.create() 000");
            _GameLevelStateWrapper.getGameLevel().addCommand(cc.Cmd_Empty.create());
        }

        return this;
    },

    //--------------------------------------------------------------------------------------------------------------
    //进入这个State
    enter: function (/*wrapper, fromState*/)
    {
        /*if (!fromState.m_GameLevel)
        {
            return this;
        }*/
        /* layer添加属性 */
        var self = this;
        var layer = gameTableLayer();

        layer.onTouchesBegan = function(touches, event)
        {
            self.handleTouchesBegan(touches, event);
            return self;
        };

        layer.onTouchesMoved = function(touches, event)
        {
            self.handleTouchesMoved(touches, event);
            return self;
        };

        layer.onTouchesEnded = function()
        {
            self.handleTouchesEnded();
            return self;
        };


        /* 逻辑添加 */

        //this.m_GameLevel = fromState.m_GameLevel;

        if(this.m_TouchByItem && this.m_TouchByItem.isDirectly())      //如果道具是及时触发的走这部分逻辑
        {
            this.m_TouchByItem.handle(/*this.m_GameLevel*/this.getGameLevel());
            return this;
        }

        layer.setTouchEnabled(true);



        return this;
    },

    //--------------------------------------------------------------------------------------------------------------
    //离开这个State
    leave: function (/*wrapper*/)
    {
        cc.log("item leave");
        gameTableLayer().setTouchEnabled(false);
		
		cc.GUIGameLevel.getInstance().notifyCloseWindow();
		cc.EffectMng.getInstance().displayLabelHide();
		cc.GUIGameLevel.getInstance().removeBlackScreen();
		cc.GUIGameLevel.getInstance().stopALlMonsterAction(this.getGameLevel());
        return this;
    },

    //--------------------------------------------------------------------------------------------------------------
    //更新
    update: function (wrapper, time)
    {
        /*this.m_GameLevel*/wrapper.getGameLevel().update(this, time);

        if (this.m_TouchByItem)
        {
            this.m_TouchByItem.update(this, time);
        }

        return this;
    }
});

//单件模式
cc.State_GameItem._instance = null;
cc.State_GameItem.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.State_GameItem();
        //cc.GameManager.getInstance().registerState(this._instance);
    }

    return this._instance;
};