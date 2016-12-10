/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-10-15
 * Time: 上午11:58
 * Version: 1.0
 * Function: This file use to do...
 */
var Effect_MonsterFlyToUFO = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function()
    {
        this._monster = null;
        this._callBack = null;
        this._target = null;
        this._position = null;
		this._flyTime = null;
		this._centerPos = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init : function(monster, position, flyTime, centerPos, callBack, target)
    {
        this._monster = monster;
        this._callBack = callBack;
        this._target = target;
        this._position = position;
		this._flyTime = flyTime;
		this._centerPos = centerPos;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    play : function()
    {
        var self = this;

        var sprite = MonsterRender.createSprite(this._monster.getColor());

        //
        animateLayer().addChild(sprite);
        sprite.setVisible(true);

        //
        var beginPos = this._monster.getPosition();
        sprite.setPosition(beginPos);

        //
        var mid = cc.pMidpoint(this._position, beginPos);
//        var randDistance = Defines.TABLE_GRID_SIZE * 2;
//        mid.x  += Tools.rangeRandom(-randDistance, randDistance);
//        mid.y  += Tools.rangeRandom(-randDistance, randDistance);
		mid.x = this._centerPos.x;
		mid.y = this._centerPos.y;
        //
        var bezierPath = [
            beginPos,
            mid,
            this._position
        ];
		
		var firstJumpTime = Tools.rangeRandom(Defines.FPS * 10, Defines.FPS * 20);
    
        //
        var sequence = cc.Sequence.create(
            cc.BezierTo.create(this._flyTime, bezierPath),
            cc.DelayTime.create(firstJumpTime),
			cc.ScaleTo.create(firstJumpTime * 0.7, 1.25, 0.25),
			
			cc.CallFunc.create(
                function (sender)
                {
                    sender.removeFromParent(true);

                    if (self._callBack)
                    {
                        if (self._target)
                        {
                            self._callBack.call(self._target, sender);
                        }
                        else
                        {
                            self._callBack(sender);
                        }
                    }
                },
                null)
        );

        //
        sprite.runAction(sequence);
        sprite.runAction(
            cc.RepeatForever.create(cc.RotateBy.create(Defines.FPS * 30, 360))
        );

        return this;
    }
});

Effect_MonsterFlyToUFO.create = function(monster, position, flyTime, centerPos, callBack, target)
{
    var createNew = new Effect_MonsterFlyToUFO();
    if (createNew)
    {
        createNew.init(monster, position, flyTime, centerPos, callBack, target);
    }

    return createNew;
};
