/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-10-14
 * Time: 下午4:21
 * Version: 1.0
 * Function: This file use to do...
 */

var Effect_ShowFlower = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function()
    {
        this._resName = "";

        this._delayTime = 0;
        this._position = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init : function(delayTime, pos, resName)
    {
        this._resName = resName;

        this._delayTime = delayTime;
        this._position = pos;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    play : function()
    {
        var self = this;
        var parentLayer = animateLayer();
        var succeedParticle;
        var sequence = cc.Sequence.create(
            cc.DelayTime.create(self._delayTime),
            cc.CallFunc.create(
                function(sender)
                {
                    succeedParticle = cc.ParticleSystem.create(self._resName);
                    parentLayer.addChild(
                        succeedParticle,
                        Defines.BATCH_NODE.OBJECT_COLORFUL_EFF.Z
                    );

                    succeedParticle.setPosition(self._position);
                }
            ),
            cc.DelayTime.create(Defines.FPS*100),
            cc.CallFunc.create(
                function ()
                {
                    succeedParticle.removeFromParent(true);
                }
            )
        );


        //
        parentLayer.runAction(sequence);

        return this;
    }
});

Effect_ShowFlower.create = function(delayTime, pos, resName)
{
    var createNew = new Effect_ShowFlower();
    if (createNew)
    {
        createNew.init(delayTime, pos, resName);
    }

    return createNew;
};
