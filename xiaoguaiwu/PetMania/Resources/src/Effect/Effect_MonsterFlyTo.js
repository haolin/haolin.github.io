/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-10-15
 * Time: 上午11:58
 * Version: 1.0
 * Function: This file use to do...
 */
var Effect_MonsterFlyTo = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function()
    {
        this._monster = null;
        this._callBack = null;
        this._target = null;
        this._position = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init : function(monster, position, callBack, target)
    {
        this._monster = monster;
        this._callBack = callBack;
        this._target = target;
        this._position = position;

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
        var randDistance = Defines.TABLE_GRID_SIZE * 2;
        mid.x  += Tools.rangeRandom(-randDistance, randDistance);
        mid.y  += Tools.rangeRandom(-randDistance, randDistance);
        //
        var bezierPath = [
            beginPos,
            mid,
            this._position
        ];
		
    
        //
        var sequence = cc.Sequence.create(
            cc.BezierTo.create(Defines.FPS * 30, bezierPath),
			
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

Effect_MonsterFlyTo.create = function(monster, position, callBack, target)
{
    var createNew = new Effect_MonsterFlyTo();
    if (createNew)
    {
        createNew.init(monster, position, callBack, target);
    }

    return createNew;
};
