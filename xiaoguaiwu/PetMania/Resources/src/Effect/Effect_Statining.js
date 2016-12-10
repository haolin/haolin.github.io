/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-10-14
 * Time: 下午4:04
 * Version: 1.0
 * Function: This file use to do...
 */

var Effect_Statining = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function()
    {
        this._resName = "";

        this._startPoint = null;
        this._endPoint = null;
        this._callBack = null;
        this._target = null;
        this._position = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init : function(startPoint, endPoint, tailerResName, callBack, tapObj,pos)
    {
        this._resName = tailerResName;

        this._startPoint = startPoint;
        this._endPoint = endPoint;
        this._callBack = callBack;
        this._target = tapObj;
        this._position = pos;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    play : function()
    {
        var self = this;
        var tailerParticle = cc.ParticleSystem.create(this._resName);
        animateLayer().addChild(tailerParticle,
            Defines.BATCH_NODE.OBJECT_COLORFUL_EFF.Z);
        tailerParticle.setPosition(this._startPoint);


        var mid = cc.p(0, 0);
        mid.x = this._endPoint.x - this._startPoint.x;
        mid.y = this._endPoint.y - this._startPoint.y;

        var randDistance = Defines.TABLE_GRID_SIZE * 2;
        mid.x  += Tools.rangeRandom(-randDistance, randDistance);
        mid.y  += Tools.rangeRandom(-randDistance, randDistance);

        if (this._position)
        {
            mid.x = this._position.x;
            mid.y = this._position.y;
        }
        //
        var bezierPath = [
            this._startPoint,
            mid,
            this._endPoint
        ];

        var sequence = cc.Sequence.create(
            cc.BezierTo.create(Defines.FPS * 50, bezierPath),
            cc.CallFunc.create(
                function (sender)
                {
                    cc.AudioMng.getInstance().playEffectArriveMonster();
                    var position = sender.getPosition();

                    sender.removeFromParent();

                    var spriteBezierParticle = cc.ParticleSystem.create(Resource.ranseqiu_plist);
                    spriteBezierParticle.setPosition(position);


                    animateLayer().addChild(spriteBezierParticle,
                        Defines.BATCH_NODE.OBJECT_COLORFUL_EFF.Z
                    );

                    spriteBezierParticle.runAction(
                        cc.Sequence.create(
                            cc.CallFunc.create(
                                function ()
                                {
                                    if (self._callBack)
                                    {
                                        if (self._target)
                                        {
                                            self._callBack(self._target);
                                        }
                                        else
                                        {
                                            self._callBack();
                                        }
                                    }
                                },
                                null)
                        ));
                },
                null)
        );

        tailerParticle.runAction(sequence);

        return this;
    }
});

Effect_Statining.create = function(startPoint, endPoint, tailerResName, callBack, tapObj,pos)
{
    var createNew = new Effect_Statining();
    if (createNew)
    {
        createNew.init(startPoint, endPoint, tailerResName, callBack, tapObj,pos);
    }

    return createNew;
};
