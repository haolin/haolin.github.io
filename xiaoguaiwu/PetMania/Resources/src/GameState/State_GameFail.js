
//======================================================================================================================
cc.State_GameFail = cc.IState.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "State_GameFail";
    },

    //------------------------------------------------------------------------------------------------------------------
    enter: function (wrapper, fromState)
    {
        if (!(fromState instanceof cc.State_GameLevel))
        {
            return this;
        }

		cc.DataMng.getInstance().addFailedTime();
        //cc.GUITipsEffect.getInstance().closeWindow();

        //
        cc.AudioMng.getInstance().playGameLevelFail();

        //
        var winSize = cc.Director.getInstance().getWinSize();

        //
        var character = cc.Sprite.createWithSpriteFrameName("Images_boy_3.png");
        _GUILayer().addChild(character);
        character.setPosition(cc.p(winSize.width * 1.1, winSize.height * 0.6));

        var characterSize = character.getContentSize();
        cc.AudioMng.getInstance().playGameFailedSound();
        //
//        var monster = cc.Sprite.create(_ImagesPath + "monster_1.png");
        var monster = cc.Sprite.createWithSpriteFrameName("Images_monster_1.png");
        monster.setFlipX(true);
        character.addChild(monster);
        monster.setPosition(cc.p(characterSize.width * 1.2, characterSize.height * 0.4));

//        var failSprite = cc.Sprite.create(_ImagesPath + "game_fail.png");
        var failSprite = cc.Sprite.createWithSpriteFrameName("Images_game_fail.png");
        character.addChild(failSprite);
        failSprite.setPosition(cc.p(characterSize.width, characterSize.height * -0.15));
        if (Defines.IS_EN){
            failSprite.setPosition(cc.p(characterSize.width - 10 * Defines.BASE_SCALE, 0));
        }
		else if (Defines.IS_KO){
		    failSprite.setPosition(cc.p(characterSize.width - 60 * Defines.BASE_SCALE, 0));
		}

        var sq = cc.Sequence.create(
            cc.EaseElasticOut.create(cc.MoveTo.create(Defines.FPS * 50, cc.p(winSize.width * 0.4, winSize.height * 0.6))),
            cc.DelayTime.create(Defines.FPS * 60),
            cc.MoveTo.create(Defines.FPS * 50, cc.p(-winSize.width * 0.5, winSize.height * 0.6)),
            cc.CallFunc.create(
                function(sender)
                {
                    sender.removeFromParent(true);

                    //cc.GameManager.getInstance().changeTo(cc.State_GameLevel.getInstance());
                    _ChangeGameLevelStateTo(cc.State_GameLevel.getInstance());

                    //
                    var curLevelData = cc.DataMng.getInstance().getCurLevelData();
                    if (curLevelData.IS_FLOAT_LEVEL)
                    {
                        Scene_FloatMap.changeTo(null, cc.GUIGameLevelEndFail.getInstance());
                    }
                    else
                    {
                        Scene_MainMap.changeTo(cc.GUIGameLevelEndFail.getInstance());
                    }
                },
                null)
        );

        character.runAction(sq);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //离开这个State
    leave: function (/*wrapper*/)
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //更新
    update: function (/*wrapper, time*/)
    {
        return this;
    }
});

//单件模式
cc.State_GameFail._instance = null;
cc.State_GameFail.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.State_GameFail();
        //cc.GameManager.getInstance().registerState(this._instance);
    }

    return this._instance;
};