/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-10-14
 * Time: 下午3:23
 * Version: 1.0
 * Function: This file use to do...
 */

var Effect_ShowClock = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function()
    {
       this._degree = 0;
       this._callBack = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init : function(degree,callBack)
    {
        this._degree = degree;
        this._callBack = callBack;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    play : function()
    {
        cc.AudioMng.getInstance().playClock();
        var self = this;
//        var clockPanel = cc.Sprite.create(Resource.clock_panel_png);
        var clockPanel = cc.Sprite.createWithSpriteFrameName("Images_clock_panel.png");
//        var clockPoint = cc.Sprite.create(Resource.clock_point_png);
        var clockPoint = cc.Sprite.createWithSpriteFrameName("Images_clock_point.png");
//        var clockStar = cc.Sprite.create(Resource.clock_star_png);
        var clockStar = cc.Sprite.createWithSpriteFrameName("Images_clock_star.png");

        clockPanel.setAnchorPoint(cc.p(0.5,0.5));
        clockPoint.setAnchorPoint(cc.p(0.5,0));
        clockStar.setAnchorPoint(cc.p(0.5,0.5));

        var clockPanelSize = clockPanel.getContentSize();

        clockPanel.setPosition(cc.p(_ScreenCenter().x,_ScreenCenter().y));
        clockPoint.setPosition(cc.p(clockPanelSize.width/2,clockPanelSize.height/2));
        clockStar.setPosition(cc.p(clockPanelSize.width/2,clockPanelSize.height/2));

        animateLayer().addChild(clockPanel);
        clockPanel.addChild(clockPoint);
        clockPanel.addChild(clockStar);

        var totalDegree = self._degree + 360 * 3 + 30;
        var position= cc.p(20,140);

        clockPanel.setScale(0);
        clockPanel.runAction(cc.Sequence.create(
            cc.ScaleTo.create(Defines.FPS*3,1.5,1),
            cc.ScaleTo.create(Defines.FPS*3,1.3,1.3),
            cc.ScaleTo.create(Defines.FPS*3,1,1.5),
            cc.ScaleTo.create(Defines.FPS*3,1.3,1.3),
            cc.ScaleTo.create(Defines.FPS*3,1),
            cc.CallFunc.create(
                function ()
                {
                    clockPanel.setScaleX(1);
                }
            ),
//                cc.DelayTime.create(Defines.FPS*60),
            cc.CallFunc.create(
                function ()
                {
                    clockPoint.runAction(cc.Sequence.create(
                        cc.RotateBy.create(
                            Defines.FPS*60,
                            totalDegree
                        ),
                        cc.RotateBy.create(
                            Defines.FPS*15,
                            -30
                        ),
                        cc.CallFunc.create(
                            function ()
                            {
                                // 播放闪烁
                                var spriteBezierParticle = cc.ParticleSystem.create(Resource.guangdian_plist);
                                spriteBezierParticle.setPosition(position);

                                clockPoint.addChild(spriteBezierParticle,
                                    Defines.BATCH_NODE.OBJECT_COLORFUL_EFF.Z
                                );

                                clockPoint.runAction(cc.Sequence.create(
                                    cc.DelayTime.create(Defines.FPS*30),
                                        cc.CallFunc.create(
                                            function ()
                                            {
                                                var startPos = clockPanel.getPosition();
                                                switch (self._degree)
                                                {
                                                    case 40 :
                                                        startPos.x += 50;
                                                        startPos.y += 80;
                                                        break;
                                                    case 120 :
                                                        startPos.x += 100;
                                                        startPos.y -= 30;
                                                        break;
                                                    case 190 :
                                                        startPos.x -= 30;
                                                        startPos.y -= 100;
                                                        break;
                                                    case 290 :
                                                        startPos.x -= 80;
                                                        startPos.y += 25;
                                                        break;
                                                }

                                                var targetRect = cc.GUIGameLevel.getInstance().getTimeRectForGuide();
                                                var pos = cc.p(200,200);
                                                cc.EffectMng.getInstance().displayTailerBezierPath(startPos, cc.p(targetRect.x+targetRect.width/2,targetRect.y+targetRect.height/2),self._callBack,null,pos);
                                            }
                                        )
                                    )
                                )
                            }
                        ),
                        cc.DelayTime.create(Defines.FPS*60),
                        cc.CallFunc.create(
                            function ()
                            {
                                clockPanel.runAction(
                                    cc.Sequence.create(
                                        cc.ScaleTo.create(Defines.FPS*3,1),
                                        cc.ScaleTo.create(Defines.FPS*3,1.3,1.3),
                                        cc.ScaleTo.create(Defines.FPS*3,1,1.5),
                                        cc.ScaleTo.create(Defines.FPS*3,1.3,1.3),
                                        cc.ScaleTo.create(Defines.FPS*3,1.5,1),
                                        cc.ScaleTo.create(Defines.FPS*5,0.8),
                                        cc.ScaleTo.create(Defines.FPS*5,0.4),
                                        cc.ScaleTo.create(Defines.FPS*5,0.2),
                                        cc.ScaleTo.create(Defines.FPS*5,0),
                                        cc.CallFunc.create(
                                            function ()
                                            {
                                                clockPanel.removeFromParent(true);
                                            }
                                        )
                                    )
                                );
                            }
                        )
                    )
                    );
                }
            )
        )
        );

        return this;
    }
});

Effect_ShowClock.create = function(degree,callBack)
{
    var createNew = new Effect_ShowClock();
    if (createNew)
    {
        createNew.init(degree, callBack);
    }

    return createNew;
};
