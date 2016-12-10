/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-8-8
 * Time: 下午6:15
 * Version: 1.0
 * Function: This file use to do...
 */

//======================================================================================================================
cc.State_GameCarnivalBase = cc.IState.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        //var startPos = _ScreenLeft();
        //

        this.m_Carnival = null;

        this.m_CuteMonster = null;

        this.m_Boy = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "State_GameCarnivalBase";
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //进入这个State
    enter: function (wrapper, fromState/*, callBack*/)
    {
        this._super(wrapper, fromState);

        var startPos = _ScreenLeft();
        //
//        var boy = cc.Sprite.create(Resource.boy_happy_png);
        var boy = cc.Sprite.createWithSpriteFrameName("Images_boy_1.png");
        boy.setTag(10001);
        var size = boy.getContentSize();
        startPos.x -= size.width;

        animateLayer().addChild(boy);
        boy.setPosition(cc.p(startPos.x,startPos.y+100 * Defines.BASE_SCALE));
        boy.setVisible(true);

//        var carnival = cc.Sprite.create(Resource.zhuijiajiangli_png);
        var carnival = cc.Sprite.createWithSpriteFrameName("Images_zhuijiajiangli.png");
        //var carnivalSize = carnival.getContentSize();
        var carnivalPos = cc.p(size.width/2 ,size.height/10);
        carnival.setPosition(carnivalPos);
        boy.addChild(carnival);

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //var newCuteMonster;
        //var anotherCuteMonster;
        var cuteMonster = cc.ArmatureDataMng.getInstance().createCuteMonster();
        if (cuteMonster)
        {
            cuteMonster.setPosition(cc.p(0,130 * Defines.BASE_SCALE));
            boy.addChild(cuteMonster);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
//        var endPos1 = _ScreenCenter();
//        var middlePos1 = cc.p(endPos1.x+10,endPos1.y);
//        var middlePos2 = cc.p(endPos1.x,endPos1.y);
//        var endPos2 = _ScreenRight();
//        endPos2.x += size.width;
//
//        var cuteTargetPos = cc.p(130,370);
//        var self = this;
//        var sq1 = cc.Sequence.create(
//            cc.MoveTo.create(Defines.FPS * 30, middlePos1),
//            cc.DelayTime.create(Defines.FPS * 20),
//            cc.MoveTo.create(Defines.FPS * 10, middlePos2),
//            cc.DelayTime.create(Defines.FPS * 60),
//            cc.CallFunc.create(
//                function()
//                {
//                    var leftMoves = cc.DataMng.getInstance().getLeftTouchMoves();
//                    if (leftMoves > 0)
//                    {
//                        var pos = cc.p(450,260);
//                        if (cuteMonster)
//                        {
//                            cc.log("+++++++++++++++++++++++++++++ cute Monster +++++++++++++++++++++++++++");
//                            cuteMonster.removeFromParent();
//                            animateLayer().addChild(cuteMonster);
//                            cuteMonster.setPosition(pos);
//
//                            cuteMonster.runAction(
//                                cc.Sequence.create(
//                                    cc.MoveTo.create(Defines.FPS * 20, cuteTargetPos),
//                                    cc.CallFunc.create(
//                                        function()
//                                        {
//                                            cc.log("------------------------------- cute Monster -------------------------------");
//                                            cuteMonster.removeFromParent();
//                                            newCuteMonster = cc.ArmatureDataMng.getInstance().createCuteMonster();
//                                            if (newCuteMonster)
//                                            {
//                                                newCuteMonster.setPosition(cuteTargetPos);
//                                                animateLayer().addChild(newCuteMonster);
//                                            }
//                                        }
//                                    )
//                                )
//
//                            );
//                        }
//                    }
//                    else
//                    {
//                    }
//                }
//            ),
//            cc.DelayTime.create(Defines.FPS * 60),
//            cc.MoveTo.create(Defines.FPS * 30, endPos2),
//            cc.DelayTime.create(Defines.FPS * 30),
//            cc.CallFunc.create(
//                function(sender)
//                {
//                    if (callBack)
//                    {
//                        callBack();
//                    }
//                }
//            ) ,
//            cc.DelayTime.create(Defines.FPS * 60),
//            cc.CallFunc.create(
//                function ()
//                {
//                    carnival.removeFromParent(true);
////                    carnival = cc.Sprite.create(Resource.carnival);
//                    carnival = cc.Sprite.createWithSpriteFrameName("Images_game_succeed.png");
//                    carnivalSize = carnival.getContentSize();
//                    carnivalPos = cc.p(size.width/2 ,size.height/8);
//                    carnival.setPosition(carnivalPos);
//                    boy.addChild(carnival);
//                }
//            ),
//            cc.MoveTo.create(Defines.FPS * 30, middlePos2),
//            cc.CallFunc.create(
//                function ()
//                {
//                    if (newCuteMonster)
//                    {
//                        var pos = cc.p(450,260);
//                        newCuteMonster.runAction(
//                            cc.Sequence.create(
//                                cc.MoveTo.create(Defines.FPS * 20, pos),
//                                cc.CallFunc.create(
//                                    function()
//                                    {
//                                        cc.log("*********************************** cute Monster *********************************");
//                                        newCuteMonster.removeFromParent(true);
//                                        anotherCuteMonster = cc.ArmatureDataMng.getInstance().createCuteMonster();
//                                        if (anotherCuteMonster)
//                                        {
//                                            anotherCuteMonster.setPosition(cc.p(0,130));
//                                            boy.addChild(anotherCuteMonster);
//                                        }
//                                    }
//                                )
//                            )
//                        );
//                    }
//                }
//            ),
//            cc.DelayTime.create(Defines.FPS*30),
//            cc.CallFunc.create(
//                function ()
//                {
//                    var center = cc.p(_ScreenCenter().x,_ScreenCenter().y);
//
//
//                    cc.EffectMng.getInstance().displaySaveSucceedPurple(0,cc.p(center.x-200,center.y+120));
//                    cc.EffectMng.getInstance().displaySaveSucceedPurple(1,cc.p(center.x+200,center.y+100));
//                    cc.EffectMng.getInstance().displaySaveSucceedPurple(0.5,cc.p(center.x-180,center.y-130));
//
//                    cc.EffectMng.getInstance().displaySaveSucceedPurple(1.7,cc.p(center.x+200,center.y-120));
//                    cc.EffectMng.getInstance().displaySaveSucceedPurple(2,cc.p(center.x-150,center.y-150));
//                    cc.EffectMng.getInstance().displaySaveSucceedPurple(0.9,cc.p(center.x,center.y));
//
//                    cc.EffectMng.getInstance().displaySaveSucceedPurple(1.3,cc.p(center.x+50,center.y-160));
//                    cc.EffectMng.getInstance().displaySaveSucceedPurple(0.6,cc.p(center.x+160,center.y-100));
//                }
//            ),
//            cc.CallFunc.create(
//                function ()
//                {
//                    cc.EffectMng.getInstance().displaySaveSucceedYellow(0,endPos1);
//                }
//            ),
//            cc.DelayTime.create(Defines.FPS*60),
//            cc.MoveTo.create(Defines.FPS * 30, endPos2),
//            cc.DelayTime.create(Defines.FPS*60),
//            cc.CallFunc.create(
//                function ()
//                {
//                    sender.removeFromParent(true);
//                }
//            )
//        );
//
//        boy.runAction(sq1);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createRole : function(resName)
    {
        //cc.GUITipsEffect.getInstance().closeWindow();
//        var resourceName = Resource.zhuijiajiangli_png;
        var resourceName = "Images_zhuijiajiangli.png";
        var tag = 10002;
        if (resName)
        {
            tag = 0;
            resourceName = resName;
        }
        var startPos = _ScreenLeft();
        //

//        var carnival = cc.Sprite.create(Resource.zhuijiajiangli_png);
        var carnival = cc.Sprite.createWithSpriteFrameName(resourceName);
        carnival.setTag(tag);
        var carnivalSize = carnival.getContentSize();
        var carnivalPos = cc.p(startPos.x-carnivalSize.width,startPos.y/*+100*/);
        carnival.setPosition(carnivalPos);
        animateLayer().addChild(carnival);

        var cuteMonster = cc.ArmatureDataMng.getInstance().createCuteMonster();
        if (cuteMonster)
        {
            cuteMonster.setPosition(cc.p(0,130));
            carnival.addChild(cuteMonster);
        }

//        this.m_Boy = cc.Sprite.create(_ImagesPath + "boy_1.png");
        this.m_Boy = cc.Sprite.createWithSpriteFrameName("Images_boy_1.png");
        this.m_Boy.setTag(10001);
        var size = this.m_Boy.getContentSize();
        //this.m_Boy.setPosition(cc.p(0-size.width,0-size.height));
        this.m_Boy.setPosition(cc.p(0-size.width,0-size.height));
        animateLayer().addChild(this.m_Boy);
//        cc.AudioMng.getInstance().playGameSuccessSound();

        this.m_CuteMonster = cuteMonster;
        this.m_Carnival = carnival;
    },

    //------------------------------------------------------------------------------------------------------------------
    /*createBoy : function(parent)
    {
        var parentLayer = animateLayer();
        if (parent)
        {
            parentLayer = parent;
        }
//        this.m_Boy = cc.Sprite.create(_ImagesPath + "boy_1.png");
        this.m_Boy = cc.Sprite.createWithSpriteFrameName("Images_boy_1.png");
        var size = this.m_Boy.getContentSize();
        this.m_Boy.setPosition(cc.p(0-size.width,0-size.height));
        parentLayer.addChild(this.m_Boy);
        return this;
    },*/
   
    //------------------------------------------------------------------------------------------------------------------
    getCarnival : function ()
    {
        return this.m_Carnival;
    },
    //------------------------------------------------------------------------------------------------------------------
    getCuteMonster : function ()
    {
        return this.m_CuteMonster;
    },

    //------------------------------------------------------------------------------------------------------------------
    getBoy : function ()
    {
        return this.m_Boy;
    },

    //------------------------------------------------------------------------------------------------------------------
    //离开这个State
    leave: function (/*wrapper*/)
    {
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //更新
    update: function (/*wrapper, time*/)
    {
        return this;
    }
});