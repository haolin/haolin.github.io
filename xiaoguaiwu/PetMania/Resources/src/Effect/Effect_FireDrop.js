/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-10-14
 * Time: 下午3:46
 * Version: 1.0
 * Function: This file use to do...
 */

var Effect_FireDrop = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function()
    {
        this._endPosition = null;
        this._resName = "";
        this._callBack = null;
        this._target = 0;
		this._level = 0;
		this._isFirst = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    init : function(endPoint, resName, level, callBack, target, isFirst)
    {
        this._endPosition = endPoint; //cc.p(endPoint.x, endPoint.y + Defines.TABLE_GRID_SIZE/2);
        this._resName = resName;
        this._callBack = callBack;
        this._target = target;
		this._level = level;
		this._isFirst = isFirst;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    play : function()
    {
        var self = this;
        var spriteFireBall = cc.Sprite.createWithSpriteFrameName("fire_0.png");
        var fireBallParticle = cc.ParticleSystem.create(this._resName);
        spriteFireBall.addChild(fireBallParticle, Defines.BATCH_NODE.OBJECT_COLORFUL_EFF.Z);
        var size = spriteFireBall.getContentSize();
        fireBallParticle.setPosition(cc.p(size.width/2, size.height/4));

        var startPoint = cc.p(_ScreenTop().x, _ScreenTop().y);
        startPoint.x = this._endPosition.x;
        startPoint.y = startPoint.y + size.height + 10;

        var animationKey = "fire_";
        var animation = cc.AnimationCache.getInstance().getAnimation(animationKey);
        if (!animation)
        {
            animation = cc.Animation.create(cc.ResourceMng.getInstance().getAnimationFrames(animationKey),1/25);
            cc.AnimationCache.getInstance().addAnimation(animation, animationKey);
        }

        if (animation)
        {
            spriteFireBall.runAction(
                cc.RepeatForever.create(
                    cc.Animate.create(animation)
                ));
        }
        animateLayer().addChild(spriteFireBall);
        spriteFireBall.setPosition(startPoint);


        cc.AudioMng.getInstance().playfiredrop();

        var self = this;
        var moveTo = cc.MoveTo.create(Defines.FPS * 60, cc.p(this._endPosition.x, this._endPosition.y + Defines.TABLE_GRID_SIZE/2));
		
        var callBackFunc_fin = cc.CallFunc.create(
            function (sender)
            {
                cc.AudioMng.getInstance().playfirebomb();
				
				if (self._isFirst){
					var fireflyEffectName = "bz_0" + self._level.toString();
					cc.log("fin fireflyEffectName = "+ fireflyEffectName);
					var firefly = cc.ArmatureDataMng.getInstance().createfireMeteor(fireflyEffectName);
					if (firefly)
					{
						animateLayer().addChild(firefly);
						firefly.setPosition(self._endPosition);

					}
				}
				
				var gameTablePos = gameTableLayer().getPosition();
				var actionSes = self.getShock(gameTableLayer().getPosition());
				cc.log("gameTablePos = " + gameTablePos.x + " , " + gameTablePos.y + ")");
				
                // 对象震屏
                if (gameTableLayer())
                {
					cc.log("gameTableLayer().runAction");
                    gameTableLayer().runAction(self.getShock(gameTablePos));
					//
                }
				cc.log("tablelayer ceter = " + gameTableLayer().getPosition().x + " , " + gameTableLayer().getPosition().y + ")");
                // 对象震屏
                if (_GUILayer())
                {
					cc.log("GUILayer().runAction");
                    _GUILayer().runAction(actionSes);

                }
				cc.log("tablelayer after = " + gameTableLayer().getPosition().x + " , " + gameTableLayer().getPosition().y + ")");
                if (self._callBack)
                {
					self._callBack(self._endPosition,true);
                }
                sender.removeFromParent();
				
				var nowTimes = DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().getCreateObjectContent("Touch_ByItemToMonsGoldenKey_new");
				if (nowTimes < 7 ){ //未到达顶级
					DiaryManager.getInstance().getCurrentDiaryOfGameLevel().getCreateDiary().addCreateEventToDiary("Touch_ByItemToMonsGoldenKey_new");
				}
				cc.GUIGameLevel.getInstance().refreshGoldenKeyItem();
            }
        );

        var callBackFunc = cc.CallFunc.create(
            function (sender)
            {
                cc.AudioMng.getInstance().playfirebomb();
				if (self._callBack)
                {
                    self._callBack(self._endPosition, false);
                }
                sender.removeFromParent();
				if (self._isFirst){
					var fireflyEffectName = "bz_0" + self._level.toString();
					cc.log("fireflyEffectName = "+ fireflyEffectName);
					var firefly = cc.ArmatureDataMng.getInstance().createfireMeteor(fireflyEffectName);
					if (firefly)
					{
						animateLayer().addChild(firefly);
						firefly.setPosition(self._endPosition);

					}
				}

            }
        );

        var sequence_fin = cc.Sequence.create(cc.EaseIn.create(moveTo,1.8), callBackFunc_fin);
		var sequence = cc.Sequence.create(cc.EaseIn.create(moveTo,1.8), callBackFunc);
        if (this._target == 0){
			cc.log("this.target = " + this._target);
			spriteFireBall.runAction(sequence_fin);
			
		}
		else {
			spriteFireBall.runAction(sequence);
		}

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getShock : function(pos)
    {
        var distance = 30;
        var deltaTime = 3;//0.8;
        var delta = 2;
        var centerPos = cc.p(pos.x,pos.y);
        var endPos = cc.p(pos.x,pos.y);
        var targetPos = centerPos;
        targetPos.y -= distance;

		cc.log("getshock = (" + pos.x + " , " + pos.y + ")");
		cc.log("tablelayer before = " + gameTableLayer().getPosition().x + " , " + gameTableLayer().getPosition().y + ")");
//		var Sq = cc.Sequence.create(
//            cc.MoveTo.create(
//                Defines.FPS*deltaTime,
//                targetPos
//            ),
//			cc.MoveTo.create(
//                Defines.FPS*(deltaTime/delta) ,
//                cc.p(targetPos.x,  centerPos.y + distance / delta)
//            ),
//			cc.MoveTo.create(
//                Defines.FPS*(deltaTime/delta/delta) ,
//                cc.p(targetPos.x,  centerPos.y - distance / delta/delta)
//            ),
//
//            cc.MoveTo.create(
//                Defines.FPS*(deltaTime/delta/delta/delta),
//                cc.p(targetPos.x,  centerPos.y + distance / delta/delta/delta)
//            ),
//            
//            cc.MoveTo.create(
//                Defines.FPS*(deltaTime/delta/delta/delta),
//                endPos
//            )
//        );
        var Sq = cc.Sequence.create(
            cc.MoveTo.create(
                Defines.FPS*deltaTime,
                targetPos
            ),
            cc.CallFunc.create(
                function ()
                {
                    targetPos.y += distance;
					
                    deltaTime /= delta;
                    distance /= delta;

                    targetPos.y += distance;
                }
            ),
            cc.MoveTo.create(
                Defines.FPS*deltaTime,
                targetPos
            ),
            cc.CallFunc.create(
                function ()
                {
                    targetPos.y -= distance;

                    deltaTime /= delta;
                    distance /= delta;

                    targetPos.y -= distance;
                }
            ),
            cc.MoveTo.create(
                Defines.FPS*deltaTime,
                targetPos
            ),
            cc.CallFunc.create(
                function ()
                {
                    targetPos.y += distance;

                    deltaTime /= delta;
                    distance /= delta;

                    targetPos.y += distance;
                }
            ),
            cc.MoveTo.create(
                Defines.FPS*deltaTime,
                targetPos
            ),
            cc.MoveTo.create(
                Defines.FPS*deltaTime,
                endPos
            )
        );

        return Sq;
    }
});

Effect_FireDrop.create = function(endPoint, resName, level, callBack, target, isFirst)
{
    var createNew = new Effect_FireDrop();
    if (createNew)
    {
        createNew.init(endPoint, resName, level, callBack, target, isFirst);
    }

    return createNew;
};
