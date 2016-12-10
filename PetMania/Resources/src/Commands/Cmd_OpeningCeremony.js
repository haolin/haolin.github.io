//

//======================================================================================================================
cc.Cmd_OpeningCeremony = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(levelData)
    {
        this._super();

        //
        this.m_Layer = null;
        this.m_IsFinish = false;
        this.m_LevelData = levelData;
        gameTableLayer().setVisible(false);

        cc.GUIGameLevel.getInstance().setPauseButton(true);
    },

    //------------------------------------------------------------------------------------------------------------------
    tableLayerAction: function()
    {
        var layer = gameTableLayer();
        layer.setPosition(cc.p(0, _ScreenHeight()));
        layer.setVisible(true);

        var self = this;
        var action = cc.Sequence.create(
            cc.EaseElasticOut.create(cc.MoveTo.create(Defines.FPS * 75,  cc.p(0, 0)), 0.6),
            cc.DelayTime.create(Defines.FPS * (30 + 30 + /*100 +*/ /*30*/ 10)),
            cc.CallFunc.create(
                function ()
                {
                    self.m_IsFinish = true;
                },
                null)
        );

        layer.runAction(action);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    boyCharacterAndMonsterAction: function()
    {
        ///
        var winSize = cc.Director.getInstance().getWinSize();

        var backTemp = cc.Sprite.createWithSpriteFrameName("opening_ceremony_back.png");
        var fullSize = backTemp.getContentSize();

        var back = cc.Scale9Sprite.createWithSpriteFrameName("opening_ceremony_back.png",
            //cc.rect(0, 0, fullSize.width, fullSize.height),
            cc.rect(fullSize.width * 0.3, fullSize.height * 0.3, fullSize.width * 0.6, fullSize.height * 0.6));

        //
        this.m_Layer.addChild(back);
        back.setContentSize(cc.size(winSize.width * 1.2, 150 * Defines.BASE_SCALE));

        //
        var backSize = back.getContentSize();

        //
//        var character = cc.Sprite.create(_ImagesPath + "boy_1.png");
        var character = cc.Sprite.createWithSpriteFrameName("Images_boy_1.png");
        back.addChild(character);
        character.setPosition(cc.p(backSize.width * 0.25, backSize.height * 1.0));

        //
//        var monster = cc.Sprite.create(_ImagesPath + "monster_2.png");
        var monster = cc.Sprite.createWithSpriteFrameName("Images_monster_2.png");
        back.addChild(monster);
        monster.setScaleX(-1);
        monster.setPosition(cc.p(backSize.width * 0.35, backSize.height * 0.2));
		if (Defines.IS_KO || Defines.IS_EN){
	        monster.setPosition(cc.p(backSize.width * 0.86, backSize.height * 0.2));
		}

        ///
        var backPos = _ScreenRight();
        backPos.x -= back.getContentSize().width;
        back.setPosition(backPos);
        back.setVisible(false);

        var backDestPos = _ScreenRight();
        backDestPos.x += back.getContentSize().width;

        //
        var sq = cc.Sequence.create(
            cc.DelayTime.create(/*Defines.FPS * 75 +*/ Defines.FPS * 30),
            cc.CallFunc.create(
                function(sender)
                {
                    sender.setVisible(true);
                },
                null),
            cc.EaseElasticOut.create(cc.MoveTo.create(Defines.FPS * 30, _ScreenCenter())),
            cc.DelayTime.create(Defines.FPS * 100),
            cc.MoveTo.create(Defines.FPS * 30, backDestPos),
            cc.CallFunc.create(
                function(sender)
                {
                    sender.removeFromParent(true);
                },
                null)
        );

        back.runAction(sq);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    contentAction: function()
    {
        //
        var content = cc.Sprite.createWithSpriteFrameName(this.parseContent());
        content.setVisible(false);
        this.m_Layer.addChild(content);

        var spriteList = [];
        var spriteUnlockAll = null;
        var spriteHE = null;
        var spriteGanTanHao = null;
        var targetItemList = this.parseTarget();

        if (targetItemList.length > 0)
        {
            targetItemList.forEach(
                function (target)
                {
                    if (target == "Obj_Lock")
                    {
                        // 添加Lock目标对象
                        cc.log(" --------- Obj_Lock ------------ ");
                        var spriteLock = cc.Sprite.createWithSpriteFrameName("opening_obj_lock.png");
                        spriteList.push(spriteLock);
                    }
                    else if (target == "Obj_Floor")
                    {
                        // 添加Floor对象
                        cc.log(" --------- Obj_Floor ------------ ");
                        spriteLock = cc.Sprite.createWithSpriteFrameName("opening_obj_floor_0.png");
                        spriteList.push(spriteLock);
                    }
                }
            );

            if (targetItemList.length >= 2)
            {
                spriteHE = cc.Sprite.createWithSpriteFrameName("opening_label_with.png");
            }

            spriteGanTanHao = cc.Sprite.createWithSpriteFrameName("opening_label_mark.png");
        }

        var baseX = 140 * Defines.BASE_SCALE;
        var IntervalX = 100 * Defines.BASE_SCALE;
        var baseY = -50 * Defines.BASE_SCALE;
        var shitX = 0;

        if (spriteList.length > 0)
        {
            spriteUnlockAll = cc.Sprite.createWithSpriteFrameName("opening_ceremony_unlock_all.png");
            content.addChild(spriteUnlockAll);
            spriteUnlockAll.setPosition(cc.p(30 * Defines.BASE_SCALE,-50 * Defines.BASE_SCALE));
            if (Defines.IS_KO){
                spriteUnlockAll.setPosition(cc.p(180 * Defines.BASE_SCALE,-50 * Defines.BASE_SCALE));
            }
        }

        //
        spriteList.forEach(
            function(sprite,index,array)
            {
                if (array.length >= 2 && index == array.length-1)
                {
                    spriteHE.setPosition(cc.p(IntervalX*index+baseX,baseY));
                    content.addChild(spriteHE);
                    shitX++;
                }

                if (Defines.IS_EN){
                    if (index == 0){
                        sprite.setPosition(cc.p(IntervalX*(index+shitX)+baseX + 30 * Defines.BASE_SCALE,baseY));
                    }
                    else if (index == 1){
                        sprite.setPosition(cc.p(IntervalX*(index+shitX)+baseX - 20 * Defines.BASE_SCALE,baseY));
                    }
                }
                else if (Defines.IS_KO){
                    if (index == 0){
                        sprite.setPosition(cc.p(IntervalX*(index+shitX)+baseX,baseY));
                    }
                    else if (index == 1){
                        sprite.setPosition(cc.p(IntervalX*(index+shitX)+baseX - 20 * Defines.BASE_SCALE,baseY));
                    }
                }
                else{
                    sprite.setPosition(cc.p(IntervalX*(index+shitX)+baseX,baseY));
                }

                content.addChild(sprite);

                if (array.length-1 == index)
                {
                    spriteGanTanHao.setPosition(cc.p(IntervalX*(index+shitX+0.5)+baseX,baseY));
                    content.addChild(spriteGanTanHao);
                }
            }
        );
        //
        //
        var xPosOff = 80 * Defines.BASE_SCALE;
        var yPosOff = -10 * Defines.BASE_SCALE;

        //
        var contentBeginPos = _ScreenRight();
        contentBeginPos.x += content.getContentSize().width;
        contentBeginPos.y += yPosOff;
        if (spriteList.length > 0)
        {
            contentBeginPos.y += 50 * Defines.BASE_SCALE;
        }

        content.setPosition(contentBeginPos);


        //
        var contentCenterPos = _ScreenCenter();
        contentCenterPos.x += xPosOff;
        contentCenterPos.y += yPosOff;

        if (spriteList.length > 0)
        {
            contentCenterPos.y += 50 * Defines.BASE_SCALE;
        }

        //
        var contentEndPos = _ScreenLeft();
        contentEndPos.x -= content.getContentSize().width;
        contentEndPos.y += yPosOff;

        if (spriteList.length > 0)
        {
            contentEndPos.y += 50 * Defines.BASE_SCALE;
        }

        //
        var sq1 = cc.Sequence.create(
            cc.DelayTime.create(/*Defines.FPS * 75 +*/ Defines.FPS * 30),
            cc.CallFunc.create(
                function(sender)
                {
                    sender.setVisible(true);
                    cc.AudioMng.getInstance().playOpeningCeremony(true);
                },
                null),
            cc.EaseElasticOut.create(cc.MoveTo.create(Defines.FPS * 30, contentCenterPos)),
            cc.DelayTime.create(Defines.FPS * 100),
            cc.CallFunc.create(
                function()
                {
                    cc.AudioMng.getInstance().playOpeningCeremony(false);
                },
                null),
            cc.MoveTo.create(Defines.FPS * 30, contentEndPos),
            cc.CallFunc.create(
                function(sender)
                {
                    sender.removeFromParent(true);
                },
                null)
        );

        content.runAction(sq1);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //
        cc.ResourceMng.getInstance().addToCache(
            Resource._GUIGameLevelOpening_plist,
            Resource._GUIGameLevelOpening_png);

        this.m_Layer = cc.Layer.create();
        animateLayer().addChild(this.m_Layer);

        this.tableLayerAction();

        this.boyCharacterAndMonsterAction(gameLevel);

        this.contentAction(gameLevel);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseContent: function()
    {
        var res = null;
        if (this.m_LevelData)
        {
            if (this.m_LevelData.MODEL_MIX)
            {
                if (this.m_LevelData.MODEL_MIX == Defines.TARGET_MODEL.MODEL_BUBBLE
                    || this.m_LevelData.MODEL_MIX == Defines.TARGET_MODEL.MODEL_BOSS
                    || this.m_LevelData.MODEL_MIX == Defines.TARGET_MODEL.MODEL_TIME)
                {
                    res = "opening_ceremony_multi.png";
                }
				
				var ifModelMixHasTime = this.m_LevelData.MODEL == Defines.TARGET_MODEL.MODEL_TIME || this.m_LevelData.MODEL_MIX == Defines.TARGET_MODEL.MODEL_TIME;
				if (ifModelMixHasTime){
					res = "opening_ceremony_time.png";
				}
            }
            else
            {
                //
                var resArray = {};
                resArray[Defines.TARGET_MODEL.MODEL_SCORE] = "opening_ceremony_score.png";
                resArray[Defines.TARGET_MODEL.MODEL_UNLOCK] = "opening_ceremony_lock.png";
                resArray[Defines.TARGET_MODEL.MODEL_DESTROY] = "opening_ceremony_destroy.png";
                resArray[Defines.TARGET_MODEL.MODEL_TIME] = "opening_ceremony_time.png";
                resArray[Defines.TARGET_MODEL.MODEL_BUBBLE] = "opening_ceremony_bubble.png";
                resArray[Defines.TARGET_MODEL.MODEL_BOSS] = "opening_ceremony_boss.png";
                resArray[Defines.TARGET_MODEL.MODEL_FLOWER] = "opening_ceremony_flower.png";
				resArray[Defines.TARGET_MODEL.MODEL_MINELOTTERY] = "opening_ceremony_mine.png";
                //
                res = resArray[this.m_LevelData.MODEL];
            }
        }

        res = res || "opening_ceremony_score.png";
        return res;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseTarget : function ()
    {
        var models = [];
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        curLevelData.MODEL>=0 && models.push(curLevelData.MODEL);
        curLevelData.MODEL_MIX>=0 && curLevelData.MODEL_MIX != Defines.TARGET_MODEL.MODEL_TIME && models.push(curLevelData.MODEL_MIX);

        var targetStuct = [];
        models.forEach(
            function(model, index)
            {
                if (model == Defines.TARGET_MODEL.MODEL_UNLOCK)
                {
                    var unlockTarget = [];

                    var lockBuildCount = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().getCreateObjectContentOfObjLock();//cc.DataMng.getInstance().getBuildObjectsRecords("Obj_Lock");;
                    if (lockBuildCount > 0)
                    {
                        targetStuct.push("Obj_Lock");
                    }

                    var floorBuildCount = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().getCreateObjectContentOfObjFloor();//cc.DataMng.getInstance().getBuildObjectsRecords("Obj_Floor");
                    if (floorBuildCount > 0)
                    {
                        targetStuct.push("Obj_Floor");
                    }
                }
            }
        );

        return targetStuct;
    },
    //------------------------------------------------------------------------------------------------------------------
    finish: function()
    {
        this._super();

        if (this.m_Layer)
        {
            this.m_Layer.removeFromParent(true);
            this.m_Layer = null;
        }

        this.m_LevelData = null;
        gameTableLayer().setVisible(true);
        cc.GUIGameLevel.getInstance().setPauseButton(false);
        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUIGameLevelOpening_plist,
            Resource._GUIGameLevelOpening_png);
        
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        return this.m_IsFinish;
    }
});

cc.Cmd_OpeningCeremony.create = function(levelData)
{
    return new cc.Cmd_OpeningCeremony(levelData);
};
