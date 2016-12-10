
cc.GameItemTips = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function()
    {
        this.m_IsShowCute = false;
        this.m_Timer = 0;
//        this.m_EffectDisplay = new cc.GUITipsEffect();
    },

    //------------------------------------------------------------------------------------------------------------------
    //本次关卡中小怪提示是否显示过了
    setIsShowCute : function(isShow)
    {
        this.m_IsShowCute = isShow;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getIsShowCute : function()
    {
        return this.m_IsShowCute;
    },

    //------------------------------------------------------------------------------------------------------------------
    update: function(/*state, */time)
    {
        this.m_Timer += time;
        if (this.m_Timer > 1)
        {
            cc.log("道具使用的提示！！！！！！！！！！");
            //不要跳的太快 1秒就可以
            this.m_Timer = 0;
            this.handle();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
   /* isShowContent : function()
    {
        return true;
        //return cc.DataMng.getInstance().getTipsCuteCount() < 5;
    },*/

    //------------------------------------------------------------------------------------------------------------------
    handle : function()
    {
        var needShowAnimation = false;

        var RATE = 0.2;
        var dataLevel = cc.DataMng.getInstance();
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
        // 需要完成的分数还差多于20%
        var RateScore = curLevelData.TARGET_SCORES[0] * RATE;
        var needScore = curLevelData.TARGET_SCORES[0] - dataLevel.getCurScore();

        if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_SCORE)
        {
            needShowAnimation = (cc.DataMng.getInstance().getLeftTouchMoves() <= 3
                && (cc.DataMng.getInstance().getCurScore() < curLevelData.TARGET_SCORES[0])
                && !this.getIsShowCute()
                && needScore > RateScore);
        }
        else if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_TIME
            || curLevelData.MODEL_MIX == Defines.TARGET_MODEL.MODEL_TIME)
        {
            if (curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_BOSS)
            {
                // 单一的时间模式
                needShowAnimation = (cc.DataMng.getInstance().getLeftGameLevelTime() <= 15
                    && !this.getIsShowCute()
                    && needScore > RateScore);
            }
            else
            {
                // 变色时间混合模式
                var RatePoint = curLevelData.BOSS_POINTS * RATE;
                var needPoint = cc.BossMng.getInstance().getBossPoints();

                needShowAnimation = (cc.DataMng.getInstance().getLeftGameLevelTime() <= 15
                    && !this.getIsShowCute()
//                    && needScore > RateScore
                    && needPoint > RatePoint);
            }
        }
        else if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_DESTROY)
        {
            // 获取要消除的总数
            var totalNum = 0;
            var hasDestory = 0;
            curLevelData.TARGET_DES_DATA.forEach(
                function (a_target)
                {
                    totalNum += a_target.num;
					if (a_target.color){
						hasDestory += /*dataLevel.getRecordColor*/DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyMonsterByColorContent(a_target.color);
					}
					else if (a_target.action){
						hasDestory += /*cc.DataMng.getInstance().getRecordDestroy*/DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent(a_target.action);
					}
                }
            );

            var rateDestory = totalNum * RATE;
            var needDestory = totalNum - hasDestory;

            needShowAnimation = (cc.DataMng.getInstance().getLeftTouchMoves() <= 5
                && !this.getIsShowCute()
                && needScore > RateScore
                && needDestory > rateDestory);
        }
        else if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_BOSS
            || curLevelData.MODEL_MIX == Defines.TARGET_MODEL.MODEL_BOSS)
        {
            if (curLevelData.MODEL != Defines.TARGET_MODEL.MODEL_BUBBLE
                && curLevelData.MODEL_MIX != Defines.TARGET_MODEL.MODEL_BUBBLE)
            {
                // 单一的变色模式
                var RatePoint = curLevelData.BOSS_POINTS * RATE;
                var needPoint = cc.BossMng.getInstance().getBossPoints();

                needShowAnimation = (cc.DataMng.getInstance().getLeftTouchMoves() <= 5
                    && !this.getIsShowCute()
                    && needScore > RateScore
                    && needPoint > RatePoint);
            }
            else
            {
                // 变色啫喱混合模式，注意这里不可能是时间混合模式，时间混合模式只在时间模式那个分支出现
                var RateBubble = curLevelData.TARGET_DES_BUBBLES * RATE;
                var hasDestoryBubble = /*cc.DataMng.getInstance().getRecordDestroy*/DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_BubbleCreator");
                hasDestoryBubble = hasDestoryBubble || 0;
                var needBubble = curLevelData.TARGET_DES_BUBBLES - hasDestoryBubble;

                var RatePoint = curLevelData.BOSS_POINTS * RATE;
                var needPoint = cc.BossMng.getInstance().getBossPoints();

                needShowAnimation = (cc.DataMng.getInstance().getLeftTouchMoves() <= 5
                    && !this.getIsShowCute()
//                    && needScore > RateScore
                    && needPoint > RatePoint
                    && needBubble > RateBubble);
            }
        }
        else if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_BUBBLE)
        {
            // 单一bubble模式
            var RateBubble = curLevelData.TARGET_DES_BUBBLES * RATE;
            var hasDestoryBubble = /*cc.DataMng.getInstance().getRecordDestroy*/DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getDestroyObjectContent("Obj_BubbleCreator");
            hasDestoryBubble = hasDestoryBubble || 0;
            var needBubble = curLevelData.TARGET_DES_BUBBLES - hasDestoryBubble;

            needShowAnimation = (cc.DataMng.getInstance().getLeftTouchMoves() <= 5
                && !this.getIsShowCute()
                && needScore > RateScore
                && needBubble > RateBubble);
        }
        else if (curLevelData.MODEL == Defines.TARGET_MODEL.MODEL_FLOWER)
        {
            // 单一合体怪模式
            var RateFlower = curLevelData.TARGET_DES_DATA[0].num * RATE;
            var hasDestoryFlower = 0;
            //检查每个目标
            var targetOfFlowers = curLevelData.TARGET_DES_DATA;
            targetOfFlowers.forEach(
                function(data)
                {
                    if (!data.level)
                    {
                        return;
                    }

                    //创造了多少个花?
                    var flowerDesc = "Obj_Flower_" + data.level;
                    var create = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().getCreateObjFlowerWhenGameLevelRunning(data.level);//cc.DataMng.getInstance().getCreateRecord(flowerDesc);
                    create = create || 0;
                    hasDestoryFlower += create;
                }
            );
            hasDestoryFlower = hasDestoryFlower || 0;
            var needFlower = curLevelData.TARGET_DES_DATA[0].num - hasDestoryFlower;

            needShowAnimation = (cc.DataMng.getInstance().getLeftTouchMoves() <= 5
                && !this.getIsShowCute()
                && needScore > RateScore
                && needFlower > RateFlower);
        }
        else
        {
            needShowAnimation = (cc.DataMng.getInstance().getLeftTouchMoves() <= 5
                && !this.getIsShowCute()
                && needScore > RateScore);
        }

        // 小怪动画暂时注释掉
        if (needShowAnimation)
        {
            //cc.GUITipsEffect.getInstance().displayCuteAtPosition(animateLayer(), this.isShowContent());
            for (var i=0; i<4; i++)
            {
                var targetRect = cc.GUIGameLevel.getInstance().getButtonItemRectForGuide(i);
                cc.EffectMng.getInstance().dislaySharpParticle(cc.p(targetRect.x+targetRect.width/2,targetRect.y+targetRect.height/2));
            }
            this.setIsShowCute(true);

            var gameLevelData = cc.DataMng.getInstance().getCurLevelData();
            var GameResult = cc.DataMng.getCustomResult();
            // 重置失败次数
            GameResult.resetCustomData(gameLevelData.NAME);
        }

        return this;
    }
});


cc.GameItemTips.create = function(gameLevelData)
{
    if (!gameLevelData || gameLevelData.NO_TIPS)
    {
        return null;
    }

    var failedResult =  cc.DataMng.getCustomResult().getCustomValue(gameLevelData.NAME);
    if (failedResult)
    {
        cc.log("State_GameLevel +++ customResult level name = " + failedResult.CustomName + " result = " + failedResult.CustomFailedCount);

        if (failedResult.CustomFailedCount && failedResult.CustomFailedCount >= 3)
        {
            return new cc.GameItemTips();
            //this.m_GameItemTip = cc.GameItemTips.create();
        }
    }

    return null;

    //return new cc.GameItemTips();
};

