//游戏IState封装

cc.GameStateWrapper = cc.IStateWrapper.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(gameLevel/*, gameItemTip*/)
    {
        this._super();

        //
        this._gameLevel = gameLevel;
        this._restart = false;
        //this._gameItemTip = gameItemTip;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "GameStateWrapper";
    },

    //------------------------------------------------------------------------------------------------------------------
    getGameLevel: function()
    {
        return this._gameLevel;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        if (this._gameLevel)
        {
            this._gameLevel.release();
            this._gameLevel = null;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //切换State
    _notifyStateLeave: function()
    {
        /*if (Defines.PLATFORM.isMobile())
        {
            forceGC();
        }*/

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //切换State
    changeTo: function(toState)
    {
        var old = this.m_CurState;
        this.m_CurState = toState;

        if (this.m_CurState == old)
        {
            return this;
        }

        if (old)
        {
            cc.log("leave -> " + old.description());
            old.leave(this);
            this._notifyStateLeave(old);
        }

        //
        if (this.m_CurState)
        {
            //新的加入
            cc.log("enter -> " + this.m_CurState.description());
            this.m_CurState.enter(this, old);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //更新
    update: function(time)
    {
        this._super(time);

        //物品的提示????
       /* if (this._gameItemTip)
        {
            this._gameItemTip.update(time);
        }*/

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //更新
    wrapperStartGameLevel: function()
    {
        cc.log("wrapperStartGameLevel 初始化所有关卡相关的管理器");

        //
        cc.DataMng.getInstance().handleGameLevelStart(this.getGameLevel());

        //效果累的东西初始化 
        cc.ToucnSwapCommandMng.getInstance();
        cc.EffectMng.getInstance().prepare(30);
        cc.ArmatureDataMng.getInstance().prepareMonsterArmatureForGameLevel(30);

        //
        this.initRoundEndEventsManagers();

        //
        cc.State_GameOutMoves.getInstance().cleanUp();

        //播放声音并开始
        cc.AudioMng.getInstance().playGameLevelMusic(GUI._GetMapIDWithLevelData(cc.DataMng.getInstance().getCurLevelData()));
        this.getGameLevel().stateEnter(false);

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //更新
    initRoundEndEventsManagers: function()
    {
        //洗衣机模式
        cc.BossMng.getInstance().init(this.getGameLevel());

        //泡泡怪物模式
        cc.BubbleCreateorMonstersMng.getInstance().init(this.getGameLevel());

        //工厂
        cc.FactoryMng.getInstance().init(this.getGameLevel());

        //炸弹
        cc.BombsMng.getInstance().init(this.getGameLevel());

        //时间怪物
        cc.MonsterAddTimeMng.getInstance().init(this.getGameLevel());

        //贪吃蛇
        cc.PipeAndSnakeGame.getInstance().init(this.getGameLevel(), _GameLevelBuilder.isPipleModel());

        //采矿
        cc.MiningGame.getInstance().init(this.getGameLevel());

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //更新
    wrapperEndGameLevel: function()
    {
        cc.log("wrapperEndGameLevel 关闭所有关卡相关的管理器");

        //
        cc.GUIGameLevel.getInstance().closeWindow();

        //
        cc.GUIGameLevelEndFail.getInstance().setLevelData(cc.DataMng.getInstance().getCurLevelData());
        cc.GUIGameLevelEndWin.getInstance().setLevelData(cc.DataMng.getInstance().getCurLevelData());
        cc.GUIGameLevelEndWin.getInstance().setDiamondBonus(cc.DataMng.getInstance().getCurLevelDiamondBonus());

		cc.GUIGameLevelEndWin.getInstance().setItemBonus();

        //
        cc.DataMng.getInstance().cleanUpAboutGameLevel();
        cc.RoundEndEventsManager.getInstance().notifyAllChildrenCleanUpForGameLevelFinish();
        cc.ArmatureDataMng.getInstance().cleanUp();
        cc.EffectMng.getInstance().cleanUp();

        //
		cc.Obj_MonsterMine.resetLine();

        //教学的临时变量清除了！！！
        cc.Guide.cleanAllRoundsFlag();
		
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    restart: function()
    {
        this._restart = true;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isNeedRestart: function()
    {
        return this._restart;
    }



});

//纯粹的测试代码
cc.GameStateWrapper.testAllGameLevels = function()
{
    cc.log("检查所有普通关卡的编辑情况!!!!!");

    cc.Defines.GAME_LEVELS.forEach(
        function(gamelevel)
        {
            var builder = cc.TiledMapGameLevelBuilder.create(gamelevel, gamelevel.TILED_MAP_NAME);
            if (builder)
            {
                cc.log("检查 = " + gamelevel.NAME);
                cc.GameLevel.create().build(builder, _GameLevelBuilder.isNeedShuffle())
            }

            cc.log("================================================================");
        }
    );

    cc.log("检查所有挑战关卡的编辑情况!!!!!");

    cc.Defines.GAME_SPACE_LEVELS.forEach(
        function(spaceLevel)
        {
            var builder = cc.TiledMapGameLevelBuilder.create(spaceLevel, spaceLevel.TILED_MAP_NAME);
            if (builder)
            {
                cc.log("检查 = " + spaceLevel.NAME);
                cc.GameLevel.create().build(builder, _GameLevelBuilder.isNeedShuffle())
            }

            cc.log("================================================================");
        }
    );
};

//工厂方法
cc.GameStateWrapper.create = function()
{
    //cc.GameStateWrapper.testAllGameLevels();

    //构造新的关卡
    return new cc.GameStateWrapper(
        cc.GameLevel.create().build(_GameLevelBuilder, _GameLevelBuilder.isNeedShuffle())
       /* cc.GameItemTips.create(cc.DataMng.getInstance().getCurLevelData())*/
    );
};

