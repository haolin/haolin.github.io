/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-10-15
 * Time: 下午1:49
 * Version: 1.0
 * Function: This file use to do...
 */

var Effect_LockDestory = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function()
    {
        this._position = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init : function(location)
    {
        this._position = location;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    play : function()
    {
        var self = this;

        var position0 = [
            {x: -14, y: 0},
            {x: 14, y: 0}
        ];

        var arr_mids = [];
        for (var indx0 = 0; indx0 < position0.length; ++indx0)
        {
            var sprite_lock_mid = cc.Sprite.createWithSpriteFrameName("lock_mid.png");
            animateLayer().addChild(sprite_lock_mid, 100000);

            var pos0 = position0[indx0];
            sprite_lock_mid.setPosition(cc.p(this._position.x + pos0.x, this._position.y + pos0.y));
            arr_mids.push(sprite_lock_mid);
        }

        //
        var position1 = [
            {x: -14, y: 29, scale: 1},
            {x: 14, y: 29, scale: 1},
            {x: -14, y: -29, scale: -1},
            {x: 14, y: -29, scale: -1}
        ];

        var arr_po = [];
        for (var indx = 0; indx < position1.length; ++indx)
        {
            var sprite_lock_po = cc.Sprite.createWithSpriteFrameName("lock_po.png");
            animateLayer().addChild(sprite_lock_po, 100001);

            var pos = position1[indx];

            sprite_lock_po.setPosition(
                cc.p(this._position.x + pos.x, this._position.y + pos.y)
            );

            sprite_lock_po.setScaleY(pos.scale);
            arr_po.push(sprite_lock_po);
        }

        //
        arr_mids.forEach(
            function(mid)
            {
                mid.runAction(cc.Sequence.create(
                    cc.ScaleTo.create(Defines.FPS * 15, 0.1, 0.1),
                    cc.CallFunc.create(
                        function (sender)
                        {
                            sender.removeFromParent(true);
                        },
                        null
                    ))
                );
            }
        );

        var size = Defines.TABLE_GRID_SIZE;
        var position = [
            {x: -2.5 * size, y: size * 4},
            {x: 2.5 * size, y: size * 4},
            {x: -1.5 * size, y: size * 3},
            {x: 1.5 * size, y: size * 3}
        ];


        arr_po.forEach(
            function(po, indx)
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
                po.runAction(sequence);
                po.runAction(
                    cc.RepeatForever.create(cc.RotateBy.create(actionTime/2, 360))
                );
            }
        );

        return this;
    }
});

Effect_LockDestory.create = function(location)
{
    var createNew = new Effect_LockDestory();
    if (createNew)
    {
        createNew.init(location);
    }

    return createNew;
};

