/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-10-15
 * Time: 下午1:39
 * Version: 1.0
 * Function: This file use to do...
 */

var Effect_SprinkleDestory = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function()
    {
        this._resName = "";
        this._position = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init : function(location, res)
    {
        this._resName = res;
        this._position = location;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    play : function()
    {
        var self = this;

        var size = Defines.TABLE_GRID_SIZE;

        var position = [
            {x: -2.5 * size, y: size * 4},
            {x: -1.5 * size, y: size * 3},
            {x: 0, y: size * 3.5},
            {x: 1.5 * size, y: size * 3},
            {x: 2.5 * size, y: size * 4}
        ];

        var spriteStars = [];
        position.forEach(
            function()
            {
                var sp = cc.Sprite.createWithSpriteFrameName(self._resName);

                animateLayer().addChild(sp, 100001);
                sp.setPosition(self._position);

                var scale = 0.4 + Tools.randomEx(6)/10;
                sp.setScaleX(scale);
                sp.setScaleY(scale);

                spriteStars.push(sp);
            }
        );

        spriteStars.forEach(
            function(star, indx)
            {
                var actionTime = 0.8;

                //
                var jumpBy =cc.JumpBy.create(actionTime,
                    cc.p(position[indx].x, -1 * _ScreenHeight()),
                    position[indx].y,
                    1);

                //
                var sequence = cc.Sequence.create(
                    jumpBy,
                    cc.CallFunc.create(
                        function (sender)
                        {
                            sender.removeFromParent(true);
                        },
                        null
                    )
                );

                //
                star.runAction(sequence);
                star.runAction(
                    cc.RepeatForever.create(cc.RotateBy.create(actionTime/2, 360))
                );
            }
        );

        return this;
    }
});

Effect_SprinkleDestory.create = function(location, res)
{
    var createNew = new Effect_SprinkleDestory();
    if (createNew)
    {
        createNew.init(location, res);
    }

    return createNew;
};
