/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-10-15
 * Time: 下午4:53
 * Version: 1.0
 * Function: This file use to do...
 */

var Effect_MonsterRunning = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function()
    {
        this._monster = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init : function(monster)
    {
        this._monster= monster;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    play : function()
    {
        var self = this;

        var monsterSprite = this._monster.createSprite();
        monsterSprite.removeFromParent();
        //cc.log("************************************ monsterSprite.removeFromParent()");

        //
        gameTableLayer().addChild(monsterSprite, Defines.BATCH_NODE.MONSTER_RUNNING.Z);
        monsterSprite.setVisible(true);

        //
        var location = this._monster.getPosition();
        monsterSprite.setPosition(location);

        //
        var jump0_xMove = Tools.rangeRandom(Defines.TABLE_GRID_SIZE * 0.618, Defines.TABLE_GRID_SIZE)
            * (location.x > _ScreenCenter().x ? -1 : 1);

        var jump0_yMove = Tools.rangeRandom(Defines.TABLE_GRID_SIZE * 4, Defines.TABLE_GRID_SIZE * 5);

        var firstJumpTime = Tools.rangeRandom(Defines.FPS * 30, Defines.FPS * 40);

        //
        var jump0 = cc.JumpBy.create(firstJumpTime,
            cc.p(jump0_xMove, -1 * (location.y - Defines.TABLE_GRID_SIZE/2)),
            jump0_yMove *(location.y/_ScreenHeight()),
            1);

        //
        var secondJumpTime = Tools.rangeRandom(Defines.FPS * 20, Defines.FPS * 30);
        var jump1Scale = cc.Sequence.create(
            cc.DelayTime.create(firstJumpTime),
            cc.ScaleTo.create(secondJumpTime * 0.2, 1.25, 0.75),
            cc.ScaleTo.create(secondJumpTime * 0.3, 0.75, 1.25),
            cc.ScaleTo.create(secondJumpTime * 0.5, 1.0, 1.0),
            cc.CallFunc.create(
                function(sender)
                {
                    sender.setScaleX(1.0);
                    sender.setScaleY(1.0);
                },
                null)
        );

        //
        var jump1 = cc.JumpBy.create(secondJumpTime,
            cc.p(Defines.TABLE_GRID_SIZE, 0),
            Defines.TABLE_GRID_SIZE,
            1);

        //
        var xMovePosAfterJump = _ScreenBottomRight().x - Defines.TABLE_GRID_SIZE/1.5;
        var yMovePosAfterJump = _ScreenBottomRight().y + Defines.TABLE_GRID_SIZE/2;

        //
        var sequence0 = cc.Sequence.create(
            jump0,
            jump1,
            cc.CallFunc.create(
                function (sender)
                {
                    var pos = sender.getPosition();
                    if (pos.x < xMovePosAfterJump)
                    {
                        var moveTime = (_ScreenWidth() - pos.x)/Defines.OBJ_MOVE_SPEED;//(_ScreenWidth() - pos.x)/Defines.OBJ_MOVE_SPEED;

                        var moveTo = cc.MoveTo.create(
                            moveTime,
                            cc.p(xMovePosAfterJump, yMovePosAfterJump)
                        );

                        var rotAction = cc.RepeatForever.create(cc.RotateBy.create(moveTime/2, 360));

                        var scaleAction = cc.ScaleTo.create(Defines.FPS * 10, 0.2, 1.0);

                        //
                        var seqMove = cc.Sequence.create(
                            moveTo,
                            cc.CallFunc.create(
                                function (sender)
                                {
                                    cc.AudioMng.getInstance().playMonsterEscape();
                                    sender.setRotation(0);
                                },
                                null
                            ),
                            scaleAction,
                            cc.CallFunc.create(
                                function (sender)
                                {
                                    sender.removeFromParent(true);
                                },
                                null
                            )
                        );

                        monsterSprite.runAction(seqMove);
                        monsterSprite.runAction(rotAction);

                        //
                        var jump2 = cc.Sequence.create(
                            cc.DelayTime.create(moveTime),
                            cc.JumpBy.create(Defines.FPS * 10,
                                cc.p(0, 0),
                                Defines.TABLE_GRID_SIZE/2,
                                1)
                        );

                        monsterSprite.runAction(jump2);
                    }
                    else
                    {
                        sender.setPosition(cc.p(xMovePosAfterJump, yMovePosAfterJump));
                        var seqMove0 = cc.Sequence.create(
                            cc.ScaleTo.create(Defines.FPS * 10, 0.2, 1.0),
                            cc.CallFunc.create(
                                function (sender)
                                {
                                    cc.AudioMng.getInstance().playMonsterEscape();
                                    sender.removeFromParent(true);
                                },
                                null
                            )
                        );

                        sender.runAction(seqMove0);
                        sender.runAction(
                            cc.JumpBy.create(
                                Defines.FPS * 10,
                                cc.p(0, 0),
                                Defines.TABLE_GRID_SIZE/2,
                                1
                            ));
                    }
                },
                null
            )
        );

        //
        monsterSprite.runAction(sequence0);
        monsterSprite.runAction(jump1Scale);

        return this;
    }
});

Effect_MonsterRunning.create = function(monster)
{
    var createNew = new Effect_MonsterRunning();
    if (createNew)
    {
        createNew.init(monster);
    }

    return createNew;
};
