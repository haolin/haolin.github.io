//特效管理者

//======================================================================================================================
cc.EffectMng = cc.Class.extend({

    //
    m_IsValid: true,

    //
    m_ShowLabel: null,

    //------------------------------------------------------------------------------------------------------------------
    isValid: function()
    {
        return this.m_IsValid;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        //
        Effect_Score.cleanUpPool();

        //
        this.removeShowLabel();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    prepare: function(scorePoolSize)
    {
        if (!this.isValid())
        {
            return this;
        }

        Effect_Score.prepare(scorePoolSize);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //显示分数
    displayScore: function(score, position, color)
    {
        if (!this.isValid() || Defines.LOW_PERFORMANCE)
        {
            return this;
        }

        var scoreEffect = Effect_Score.create(score, position, color);
        if (scoreEffect)
        {
            scoreEffect.play();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //显示分数
    displayDiamondScore: function(score, position)
    {
        if (!this.isValid() || Defines.LOW_PERFORMANCE)
        {
            return this;
        }

//        var scoreEffect = Effect_Score.create(score, position, color);
//        if (scoreEffect)
//        {
//            scoreEffect.play();
//        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayMonsterDesWrap: function (position,scale, callBack)
    {
        if (!this.isValid())
        {
            if (callBack)
            {
                callBack();
            }

            return this;
        }

        var monsterDesWrapEffect = Effect_MonsterDesWrap.create(position,scale, callBack);
        if (monsterDesWrapEffect)
        {
            monsterDesWrapEffect.play();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayMonsterDesSingle: function (position, targetEffect)
    {
        if (!this.isValid())
        {
            return this;
        }

        var explode = Effect_SmallExplode.create(position);
        if (explode)
        {
            explode.play();
        }

        if (!Defines.LOW_PERFORMANCE && targetEffect && !Defines.IS_SMALL)
        {
			var desPos = cc.p(127 * Defines.BASE_SCALE, 373 * Defines.BASE_SCALE);

			if (Defines._NeedFitIpad()){
				desPos = cc.p(127 * Defines.BASE_SCALE, 410 * Defines.BASE_SCALE);
			}
			
			var notifyTargegt = Effect_NotifyTarget.create(
                position,
                desPos,
                Resource.xiaoguailizi_a_plist,
                Resource.guangdian_plist,
                Defines.FPS * 25);
				
            if (notifyTargegt)
            {
                notifyTargegt.play();
            }
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayLineEffect: function(position, hvDirection, scaleTime, centerPosition)
    {
        if (!this.isValid())
        {
            return this;
        }

        var lineEffect = Effect_Line.create(position, hvDirection, scaleTime, centerPosition);
        if (lineEffect)
        {
            lineEffect.play();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayColorfulEffectExplode: function(position, timeScale)
    {
        if (!this.isValid())
        {
            return this;
        }

        var colorExplodeEffect = Effect_ColorExplode.create(position, timeScale);
        if (colorExplodeEffect)
        {
            colorExplodeEffect.play();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayColorfulEffectLight: function(srcPos, dstPos, callBackFunc)
    {
        if (!this.isValid())
        {
            if (callBackFunc)
            {
                callBackFunc();
            }

            return this;
        }

        var colorfulEffect = Effect_ColorfulLight.create(srcPos, dstPos, callBackFunc);
        if (colorfulEffect)
        {
            colorfulEffect.play();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayLockDestroy: function(location)
    {
        if (!this.isValid())
        {
            return this;
        }

        var lockDestory = Effect_LockDestory.create(location);
        if (lockDestory)
        {
            lockDestory.play();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayFloorDestroy: function(location)
    {
        if (!this.isValid())
        {
            return this;
        }

        this.displayFullSprinkleDestroy(location, "star1.png");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayStoneDestroy: function(location)
    {
        if (!this.isValid())
        {
            return this;
        }

        this.displayFullSprinkleDestroy(location, "stone1.png");
        return this;
    },
	
	//------------------------------------------------------------------------------------------------------------------
    displayMineDestroy: function(location)
    {
        if (!this.isValid())
        {
            return this;
        }

        this.displayFullSprinkleDestroy(location, "images-teshudi-suipian01.png");
        return this;
    },
	
	//------------------------------------------------------------------------------------------------------------------
    displayMineNorDestroy: function(location)
    {
        if (!this.isValid())
        {
            return this;
        }

        this.displayFullSprinkleDestroy(location, "images-zuanshidi-suipian01.png");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayIceDestroy: function(location)
    {
        if (!this.isValid())
        {
            return this;
        }

        cc.AudioMng.getInstance().playIceShatter();
        this.displayFullSprinkleDestroy(location, "ice_shatter.png");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayBubbleDestroy: function(location)
    {
        if (!this.isValid())
        {
            return this;
        }

        cc.AudioMng.getInstance().playBubbleExplode();
        this.displayFullSprinkleDestroy(location, "bubble_creator_shatter.png");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayBubbleCreatorDestroy: function(location)
    {
        if (!this.isValid())
        {
            return this;
        }

        cc.AudioMng.getInstance().playBubbleExplode();
        this.displayFullSprinkleDestroy(location, "small_bubble.png");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayHazeDestroy: function(location)
    {
        if (!this.isValid())
        {
            return this;
        }

        //
        var hazeInfo = [
            {_scale: 0.5, _anchorPoint: cc.p(0.2, 0.5), _position: cc.p(18, 0)},
            {_scale: 0.4, _anchorPoint: cc.p(0.5, 0.2), _position: cc.p(0, 20)},
            {_scale: 0.3, _anchorPoint: cc.p(0.5, 0.8), _position: cc.p(0, -20)}
        ];

        //
        hazeInfo.forEach(
            function(each)
            {
                var spriteHaze = cc.Sprite.createWithSpriteFrameName("haze_0.png");
                animateLayer().addChild(spriteHaze);
                spriteHaze.setScale(each._scale);
                spriteHaze.setAnchorPoint(each._anchorPoint);
                spriteHaze.setPosition(cc.pSub(location, cc.p(5 * Defines.BASE_SCALE, 0)));

                spriteHaze.runAction(cc.MoveBy.create(0.5, cc.pMult(each._position, Defines.BASE_SCALE)));
                spriteHaze.runAction(cc.Sequence.create(
                    cc.DelayTime.create(0.2),
                    cc.FadeOut.create(0.3)
                ));
            }
        );

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    addItemsFlyTo : function(source, pos, targetPos)
    {
        var self = this;
        var diamondList = [];
        var diamondLevel = 0;

        var diamond1 = cc.Sprite.createWithSpriteFrameName(source);
        diamond1.setPosition(pos)//(cc.p(centerPos.x-200,centerPos.y-100));
        diamond1.setScale(0.4);
        animateLayer().addChild(diamond1); //??

        ////////////////////////////////////////////////////////////////////////////////////////////////////////

        var num = 0;
        var distanceTime = 0;
        var intervalPoint = cc.p(pos.x,pos.y);
        var X = Tools.rangeRandom(-100,100);
        var Y = Tools.rangeRandom(-100,100);

        intervalPoint.x += X;
        intervalPoint.y += Y;
        var bezierPath = [intervalPoint, cc.p(200,200), targetPos];
        var playDiamondBonusFlag = false;
        diamond1.runAction(
            cc.Sequence.create(
                cc.DelayTime.create(0.03),

//                cc.MoveTo.create(Defines.FPS * 20,intervalPoint),
                cc.BezierTo.create(Defines.FPS * 50, bezierPath),
//                        cc.EaseIn.create(cc.MoveTo.create(Defines.FPS*20,targetPos),1.8),
//                        cc.DelayTime.create(0.5),
                cc.CallFunc.create(
                    function (sender)
                    {
                        cc.AudioMng.getInstance().playDiamondBonus(diamondLevel);

                        self.dislaySharpParticle(targetPos, Defines.FPS * 10);
                        sender.stopAllActions();
                        sender.removeFromParent(true);
                        sender = null;
                    }
                )
            )
        );
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    addPopUpTip : function(_pos)
    {
        var self = this;
		cc.log("popUpTip again gamelvel");
        var pos = cc.p(_pos.x, _pos.y - 10 * Defines.BASE_SCALE);

        var popUpTip = cc.Sprite.createWithSpriteFrameName("popUpTip.png");
        animateLayer().addChild(popUpTip);
        popUpTip.setPosition(pos);
        var tipSize = popUpTip.getContentSize();

        var mineSpecialRecordArr = cc.DataMng.getInstance().getMineGameSpecialPos();
        var itemID = mineSpecialRecordArr[3];

        if (itemID){
            var itemArr = _GetMineSpecialArr();
            var itemSpr = cc.Sprite.createWithSpriteFrameName(itemArr[itemID - 1].SPRITESOURCE);
            popUpTip.addChild(itemSpr);
            itemSpr.setPosition(cc.p(tipSize.width * 0.45,tipSize.height * 0.6));
            itemSpr.setScale(0.4);
        }

//        mineLine.setScale(0.65);
        ////////////////////////////////////////////////////////////////////////////////////////////////////////

        var num = 0;
        var targetPos = cc.p(pos.x , pos.y + tipSize.height * 0.8);

		var shockTime = 0.05;
        popUpTip.runAction(
            cc.Sequence.create(
                cc.DelayTime.create(1.8),
                cc.EaseIn.create(cc.MoveTo.create(Defines.FPS*40,targetPos),1.8),
				cc.MoveTo.create(shockTime,cc.p(targetPos.x - 5 * Defines.BASE_SCALE, targetPos.y)),
				cc.MoveTo.create(shockTime,cc.p(targetPos.x , targetPos.y)),
				cc.MoveTo.create(shockTime,cc.p(targetPos.x + 5 * Defines.BASE_SCALE, targetPos.y)),
				cc.MoveTo.create(shockTime,cc.p(targetPos.x , targetPos.y)),
//                        cc.DelayTime.create(0.5),
                cc.DelayTime.create(0.1),
                cc.CallFunc.create(
                    function (sender)
                    {
//                        DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getDestroyDiary().setDestroyObjectToDiary("desLine_show_" + mineSpecialRecordArr[1], 0);
                        sender.stopAllActions();
                        sender.removeFromParent(true);
                        sender = null;
                    }
                )
            )
        );

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    addDiamondFlyTo : function(num, pos, targetPos)
    {
        var self = this;
        var diamondList = [];
        var diamondLevel = 0;

        switch (num){
            case 20:
                diamondLevel = 0;
                break;
            case 60:
                diamondLevel = 1;
                break;
            case 200:
                diamondLevel = 2;
                break;
            default :
                diamondLevel = 0;
                break;
        }

        num = num/4;
        for (var i= 0; i < num; i++)
        {
            var diamond1 = cc.Sprite.createWithSpriteFrameName("general_diamond_2.png");
            diamond1.setPosition(pos)//(cc.p(centerPos.x-200,centerPos.y-100));
            animateLayer().addChild(diamond1); //??
            diamondList.push(diamond1);
            diamond1.setVisible(false);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////

        var num = 0;
        var totalNum = diamondList.length;
        var distanceTime = 0;
		
		var playDiamondBonusFlag = false;
        diamondList.forEach(
            function (a_diamond,index)
            {
                distanceTime += 0.03;
                var intervalPoint = cc.p(pos.x,pos.y);
                var X = Tools.rangeRandom(-100,100);
                var Y = Tools.rangeRandom(-100,100);

                intervalPoint.x += X;
                intervalPoint.y += Y;
                var bezierPath = [intervalPoint, cc.p(200,200), targetPos];
                a_diamond.runAction(
                    cc.Sequence.create(
                        cc.DelayTime.create(distanceTime),
                        cc.CallFunc.create(
                            function (sender)
                            {
                                a_diamond.setVisible(true);
                            }
                        ),
                        cc.MoveTo.create(Defines.FPS * 20,intervalPoint),
                        cc.BezierTo.create(Defines.FPS * 50, bezierPath),
//                        cc.EaseIn.create(cc.MoveTo.create(Defines.FPS*20,targetPos),1.8),
//                        cc.DelayTime.create(0.5),
                        cc.CallFunc.create(
                            function (sender)
                            {
								if (!playDiamondBonusFlag){
									playDiamondBonusFlag = true;
									cc.AudioMng.getInstance().playDiamondBonus(diamondLevel);
								}
                                self.dislaySharpParticle(targetPos, Defines.FPS * 10);
                                sender.stopAllActions();
                                sender.removeFromParent(true);
                                sender = null;
                            }
                        )
                    )
                );
            }
        );
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    displayTailerBezierPath : function(start, end, callBack, tapObj,pos)
    {
        this.displayBezierPath(start, end, Resource.props_plist,callBack, tapObj, pos);
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    displayFireBallDrop : function(endPoint, level, callBack, target, isFirst)
    {
        this.displayFireDrop(endPoint, Resource.fire_particle_plist, level, callBack, target, isFirst);
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    displayFullSprinkleDestroy: function(location, res)
    {
        if (!this.isValid())
        {
            return this;
        }

        var sprinkleDestoryEffect = Effect_SprinkleDestory.create(location, res);
        if (sprinkleDestoryEffect)
        {
            sprinkleDestoryEffect.play();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayMonsterFlyTo: function(monster, position, callBack, target)
    {
        if (!this.isValid())
        {
            if (callBack)
            {
                if (target)
                {
                    callBack.call(target, null);
                }
                else
                {
                    callBack(null);
                }
            }

            return this;
        }

        if (monster instanceof cc.Obj_MonsterColorful)
        {
            cc.log("有问题！！！！displayMonsterFlyTo 这个函数传进来一个Colorful!!!");
            return this;
        }

        var monsterFlyToEffect = Effect_MonsterFlyTo.create(monster, position, callBack, target);
        if (monsterFlyToEffect)
        {
            monsterFlyToEffect.play();
        }

        return this;
    },
    displayMonsterFlyToByTime: function(monster, position, flyTime, centerPos, callBack, target)
    {
        if (!this.isValid())
        {
            if (callBack)
            {
                if (target)
                {
                    callBack.call(target, null);
                }
                else
                {
                    callBack(null);
                }
            }

            return this;
        }

        var monsterFlyToEffect = Effect_MonsterFlyToUFO.create(monster, position, flyTime, centerPos, callBack, target);
        if (monsterFlyToEffect)
        {
            monsterFlyToEffect.play();
        }

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    displayMonsterRunning: function(monster)
    {
        if (!this.isValid() || !(monster instanceof cc.Obj_Monster))
        {
            return false;
        }

        var monsterRunningEffect = Effect_MonsterRunning.create(monster);
        if (monsterRunningEffect)
        {
            monsterRunningEffect.play();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayBezierPath : function(startPoint, endPoint, tailerResName, callBack, tapObj,pos)
    {
        if (!this.isValid())
        {
            if (callBack)
            {
                if (tapObj)
                {
                    callBack(tapObj);
                }
                else
                {
                    callBack();
                }
            }

            return this;
        }

        var bezierPathEffect = Effect_BezierPath.create(startPoint, endPoint, tailerResName, callBack, tapObj, pos);
        if (bezierPathEffect)
        {
            bezierPathEffect.play();
        }

        return this;
    },

    /**
     * @param pos
     * @returns this
     */
    dislaySharpParticle : function(pos,time)
    {
        var spriteParticle = cc.ParticleSystem.create(Resource.guangdian_plist);
        spriteParticle.setPosition(pos);
        animateLayer().addChild(spriteParticle);

        if (time == null){
            time = Defines.FPS*30;
        }
        spriteParticle.runAction(
            cc.Sequence.create(
                cc.DelayTime.create(time),
                cc.CallFunc.create(
                    function (sender)
                    {
                        sender.removeFromParent(true);
                    }
                )
            )
        );
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayStaining : function(start, end, callBack, tapObj,pos)
    {
        this.displayStainingBase(start, end, Resource.props_plist,callBack, tapObj, pos);
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    displayStainingBase : function(startPoint, endPoint, tailerResName, callBack, tapObj,pos)
    {
        if (!this.isValid())
        {
            if (callBack)
            {
                if (tapObj)
                {
                    callBack(tapObj);
                }
                else
                {
                    callBack();
                }
            }

            return this;
        }

        var stainningEffect = Effect_Statining.create(startPoint, endPoint, tailerResName, callBack, tapObj,pos);
        if (stainningEffect)
        {
            stainningEffect.play();
        }

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    displayFireDrop : function(endPoint, resName, level, callBack, target, isFirst)
    {
        if (!this.isValid())
        {
            if (callBack)
            {
                if (target)
                {
                    callBack(target);
                }
                else
                {
                    callBack();
                }
            }

            return this;
        }

        var fireDropEffect = Effect_FireDrop.create(endPoint, resName, level, callBack, target, isFirst);
        if (fireDropEffect)
        {
            fireDropEffect.play();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displaySaveSucceedYellow : function(delayTime,pos)
    {
        this.displaySaveSucceed(delayTime,pos,Resource.bg_sharp_plist);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displaySaveSucceedPurple : function(delayTime,pos)
    {
        this.displaySaveSucceed(delayTime,pos,Resource.star_bomb_plist);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displaySaveSucceed : function(delayTime, pos, resName)
    {
        if (!this.isValid())
        {
            return this;
        }

       /* var showFlowerEffect = Effect_ShowFlower.create(delayTime, pos, resName);
        if (showFlowerEffect)
        {
            showFlowerEffect.play();
        }*/

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayClock5 : function(callBack)
    {
        this.displayClock(40,callBack);
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    displayClock10 : function(callBack)
    {
        this.displayClock(120,callBack);
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    displayClock20 : function(callBack)
    {
        this.displayClock(190,callBack);
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    displayClock30 : function(callBack)
    {
        this.displayClock(290,callBack);
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    displayClock : function(degree,callBack)
    {
        if (!this.isValid())
        {
            if (callBack)
            {
                callback();
            }

            return this;
        }

        var showClockEffect = Effect_ShowClock.create(degree, callBack);
        if (showClockEffect)
        {
            showClockEffect.play();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayPraise : function(index, startPosition, lastTime, height)
    {
        var newEffect = Effect_Praise.create(index, startPosition, lastTime, height);
        if (newEffect)
        {
            newEffect.play();
        }

        return this;
    },
  
    //------------------------------------------------------------------------------------------------------------------
    getShowLabel: function(content)
    {
        var _content = content || "";

        if (!this.m_ShowLabel)
        {
            this.m_ShowLabel = cc.LabelTTF.create(_content, Defines.DefaultFont, 30 * Defines.BASE_SCALE);
            this.m_ShowLabel.setColor(cc.c3b(255, 255, 255));
            this.m_ShowLabel.setVisible(false);

            //
            animateLayer().addChild(this.m_ShowLabel);
        }

        this.m_ShowLabel.setString(_content);
        return this.m_ShowLabel;
    },

    //------------------------------------------------------------------------------------------------------------------
    removeShowLabel: function()
    {
        if (this.m_ShowLabel)
        {
            this.m_ShowLabel.removeFromParent(true);
            this.m_ShowLabel = null;
        }

        return this.m_ShowLabel;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayLabelShow : function(content)
    {
        var label = this.getShowLabel(content);
        if (label)
        {
            label.setVisible(true);
            label.setPosition(cc.p(_ScreenCenter().x + 50 * Defines.BASE_SCALE, -100 * Defines.BASE_SCALE));
            label.runAction(
                cc.Sequence.create(
                    cc.MoveTo.create(Defines.FPS * 10, cc.p(_ScreenCenter().x + 50 * Defines.BASE_SCALE, 80)),
                    cc.MoveTo.create(Defines.FPS * 5, cc.p(_ScreenCenter().x + 50 * Defines.BASE_SCALE, 40))
                )
            );
        }

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    displayLabelHide : function()
    {
        var label = this.getShowLabel();
        if (label)
        {
            var self = this;

            label.runAction(
                cc.Sequence.create(
                    cc.MoveTo.create(Defines.FPS * 5, cc.p(_ScreenCenter().x + 50, 0 - 40)),
                    cc.CallFunc.create(
                        function ()
                        {
                            self.removeShowLabel();
                        }
                    )
                )
            );
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //显示分数
    displayNumber: function(score, position, color, layer, zorder)
    {
        if (!this.isValid())
        {
            return this;
        }

        if (!score || !position || !layer)
        {
            return this;
        }

        var fileName = Resource.scores_pngs[color] || Resource.scores_pngs[Defines.COLOR.PINK];
        var scoreLabel = GUI.createNumberLabel("", fileName, 22, 28, '0');
        if (scoreLabel)
        {
            scoreLabel.setAnchorPoint(cc.p(0.5, 0.5));
            scoreLabel.setVisible(true);
            layer.addChild(scoreLabel);
        }

        //
        zorder && scoreLabel.setZOrder(zorder);

        //
        if (!scoreLabel)
        {
            return this;
        }

        //
        scoreLabel.setString(score.toString());
        scoreLabel.setPosition(position);
        scoreLabel.setScale(0.9);

        //
        scoreLabel.runAction(cc.ScaleTo.create(0.2, 1));
        scoreLabel.runAction(cc.MoveBy.create(1.2, cc.p(0, _ScreenHeight() * 0.03)));
        scoreLabel.runAction(cc.Sequence.create(
            cc.DelayTime.create(0.8),
            cc.FadeOut.create(0.4),
            cc.CallFunc.create(
                function (sender)
                {
                    //
                    sender.setOpacity(255);
                    sender.setVisible(false);
                },
                null
            ))
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayMonsterFlyToUFO: function(monster)
    {
        if (!this.isValid()
            || !(monster instanceof cc.Obj_Monster)
            || monster instanceof cc.Obj_MonsterColorful
            || monster instanceof cc.Obj_MonsterMine
            )
        {
            return false;
        }
		
		var beginPos = monster.getPosition();
		var position = cc.p(
            _ScreenBottomRight().x - Defines.TABLE_GRID_SIZE/1.5,
            _ScreenBottomRight().y + Defines.TABLE_GRID_SIZE/2 + 10
        );
        var mid = cc.pMidpoint(position, beginPos);
		mid.x -= 130;
		mid.y -= 150;
        return this.displayMonsterFlyToByTime(monster, position, Defines.FPS * 37, mid);
    }

});

cc.EffectMng._instance = null;
cc.EffectMng.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.EffectMng();
    }

    return this._instance;
};




