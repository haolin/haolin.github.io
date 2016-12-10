

//======================================================================================================================
var Effect_NotifyTarget = cc.Class.extend({

    ctor: function()
    {
        this.m_StartPosition = cc.p(0, 0);
        this.m_EndPosition = cc.p(10, 10);
        this.m_Particle0 = Resource.props_plist;
        this.m_Particle1 = Resource.guangdian_plist;
        this.m_Time = Defines.FPS * 50;
        this.m_MaxActive = 9;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(startPosition, endPosition, particle0, particle1, time)
    {
        //
        this.m_StartPosition = startPosition || this.m_StartPosition;
        this.m_EndPosition = endPosition || this.m_EndPosition;
        this.m_Particle0 = particle0 || this.m_Particle0;
        this.m_Particle1 = particle1 || this.m_Particle1;
        this.m_Time = time || this.m_Time;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    play: function()
    {
        if (Effect_NotifyTarget._ActiveCount > this.m_MaxActive)
        {
            cc.log("超过" + this.m_MaxActive + "个特效 就不要再播放这个 Effect_NotifyTarget 特效");
            return this;
        }

        //
        var particle0 = cc.ParticleSystem.create(this.m_Particle0);
        animateLayer().addChild(particle0, Defines.BATCH_NODE.EFFECT.Z);
        particle0.setPosition(this.m_StartPosition);

        var self = this;
        var sequence = cc.Sequence.create(
            cc.MoveTo.create(this.m_Time, this.m_EndPosition),
            cc.CallFunc.create(
                function (sender)
                {
                    cc.AudioMng.getInstance().playEffectArriveMonster();

                    //
                    var position = sender.getPosition();
                    sender.removeFromParent(true);

                    //
                    var particle1 = cc.ParticleSystem.create(self.m_Particle1);
                    animateLayer().addChild(particle1, Defines.BATCH_NODE.EFFECT.Z);
                    particle1.setPosition(position);

                    //
                    particle1.runAction(cc.Sequence.create(
                        cc.DelayTime.create(0.3),
                        cc.CallFunc.create(
                            function (sender)
                            {
                                --Effect_NotifyTarget._ActiveCount;
                                sender.removeFromParent(true);
                            },
                            null))
                    );

                },
                null)
        );

        ++Effect_NotifyTarget._ActiveCount;
        particle0.runAction(sequence);
        return this;
    }
});

//
Effect_NotifyTarget._ActiveCount = 0;
Effect_NotifyTarget.create = function(startPosition, endPosition, particle0, particle1, time)
{
    var createNew = new Effect_NotifyTarget();
    if (createNew)
    {
        createNew.init(startPosition, endPosition, particle0, particle1, time);
    }

    return createNew;
};




