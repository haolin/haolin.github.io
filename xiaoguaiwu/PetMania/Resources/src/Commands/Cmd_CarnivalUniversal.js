/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-8-20
 * Time: 下午9:06
 * Version: 1.0
 * Function: This file use to do...
 */

//======================================================================================================================
cc.Cmd_CarnivalBoyEnter = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(boy)
    {
        this._super();
        this.m_Boy = boy;
        this.m_DelayTime = 0;
        this.m_IsFinish = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);
        var self = this;

        var boyPosition = this.m_Boy.getPosition();
        var endPos1 = _ScreenCenter();
        var middlePos2 = cc.p(endPos1.x + 20,boyPosition.y);

        this.m_Boy.runAction(cc.MoveTo.create(Defines.FPS * 30, middlePos2));
        //时间紧迫 暂时只能这么写了
        //根据不同的图片波声音
        if(this.m_Boy.getTag() == 10001)
        {
            cc.AudioMng.getInstance().playGameSuccessSound();
        }
        else if(this.m_Boy.getTag() == 10002)
        {
            cc.AudioMng.getInstance().playPerfect();
        }
//        cc.AudioMng.getInstance().playGameSuccessSound();
        this.m_IsFinish = true;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        if (this.m_IsFinish)
        {
            if (this.m_DelayTime > Defines.FPS*30)
            {
                return true;
            }

            this.m_DelayTime += time;
        }
        return false;
    }
});

cc.Cmd_CarnivalBoyEnter.create = function(boy)
{
    return new cc.Cmd_CarnivalBoyEnter(boy);
};

//======================================================================================================================
cc.Cmd_CuteMonsterMoveToTarget = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(cuteMonster,isMoves)
    {
        this._super();
        this.m_Monster = cuteMonster;
        this.m_IsMoves = isMoves;
        this.m_DelayTime = 0;
        this.m_IsFinish = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);
        var self = this;

        var cuteTargetPos = cc.GUIGameLevel.getInstance().getMovesRectForGuide();
        if (!this.m_IsMoves)
        {
            cuteTargetPos = cc.GUIGameLevel.getInstance().getTimeRectForGuide();
        }

        var leftMoves = cc.DataMng.getInstance().getLeftTouchMoves();
        if (leftMoves > 0 && this.m_Monster)
        {
            var endPos1 = _ScreenCenter();
            var pos = cc.p(endPos1.x,endPos1.y+50 * Defines.BASE_SCALE);
//             = this.m_Monster.getPosition();
//            pos.x = pos.x + middlePos2.x;
//            pos.y = pos.y + middlePos2.y;

            this.m_Monster.removeFromParent(false);
            animateLayer().addChild(this.m_Monster);
            this.m_Monster.setPosition(pos);

            this.m_Monster.runAction(
                cc.Sequence.create(
                    cc.MoveTo.create(Defines.FPS * 20, cc.p(cuteTargetPos.x,cuteTargetPos.y)),
                    cc.CallFunc.create(
                        function()
                        {
                            self.m_Monster.setPosition(cc.p(cuteTargetPos.x,cuteTargetPos.y));
                            self.m_IsFinish = true;
                            return this;
                        }
                    )
                )

            );
        }
        else
        {
            this.m_IsFinish = true;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        if (this.m_IsFinish)
        {
            if (this.m_DelayTime > Defines.FPS*30)
            {
                return true;
            }

            this.m_DelayTime += time;
        }
        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function()
    {
        return this;
    }
});

cc.Cmd_CuteMonsterMoveToTarget.create = function(cuteMonster,isMoves)
{
    return new cc.Cmd_CuteMonsterMoveToTarget(cuteMonster,isMoves);
};

//======================================================================================================================
cc.Cmd_AddBoy = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(boy,carnival,cute)
    {
        this._super();
        this.m_Carnival = carnival;
        this.m_Cute = cute;
        this.m_Boy = boy;
        this.m_DelayTime = 0;
        this.m_IsFinish = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);
        var self = this;

        if (!this.m_Carnival || !this.m_Cute || !this.m_Boy)
        {
            this.m_IsFinish = true;
            return this;
        }

        //
        this.m_IsFinish = true;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        if (this.m_IsFinish)
        {
            if (this.m_DelayTime > Defines.FPS*60)
            {
                return true;
            }

            this.m_DelayTime += time;
        }
        return false;
    },
    //------------------------------------------------------------------------------------------------------------------
    finish: function()
    {
        return this;
    }
});

cc.Cmd_AddBoy.create = function(boy,carnival,cute)
{
    return new cc.Cmd_AddBoy(boy,carnival,cute);
};


//======================================================================================================================
cc.Cmd_CuteBoyLeave = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(boy)
    {
        this._super();
        this.m_Boy = boy;
        this.m_DelayTime = 0;
        this.m_IsFinish = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);
        var self = this;

        var boyPosition = this.m_Boy.getPosition();
        var size = this.m_Boy.getContentSize();
        var endPos2 = _ScreenRight();
        endPos2.x += size.width;

        this.m_Boy.runAction(
            cc.Sequence.create(
                cc.MoveTo.create(Defines.FPS * 30, cc.p(endPos2.x,boyPosition.y)),
                cc.CallFunc.create(
                    function (sender)
                    {
                        sender.setPosition(endPos2);
                    }
                )
            )
        );
        this.m_IsFinish = true;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        if (this.m_IsFinish)
        {
            if (this.m_DelayTime > Defines.FPS*60)
            {
                return true;
            }

            this.m_DelayTime += time;
        }
        return false;
    },
    //------------------------------------------------------------------------------------------------------------------
    finish: function()
    {
        return this;
    }
});

cc.Cmd_CuteBoyLeave.create = function(boy)
{
    return new cc.Cmd_CuteBoyLeave(boy);
};

//======================================================================================================================
cc.Cmd_CuteCarnivalChange = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(boy,carnival)
    {
        this._super();
        this.m_Boy = boy;
        this.m_Carnival = carnival;
        this.m_DelayTime = 0;
        this.m_IsFinish = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        //
        cc.PraiseMng.getInstance().roundEnd();

        this.m_IsFinish = true;

//        var newSprite = cc.Sprite.create(Resource.carnival);
//        this.m_Carnival.setTexture(newSprite.getTexture());
        var position = this.m_Carnival.getPosition();
        this.m_Carnival = cc.Sprite.createWithSpriteFrameName("Images_game_succeed.png");
        this.m_Carnival.setPosition(position);

        if (this.m_Boy && this.m_Carnival)
        {
            this.m_Boy.retain();
            this.m_Boy.removeFromParent(false);

            animateLayer().addChild(this.m_Boy);
            this.m_Boy.release();

            this.m_Boy.setPosition(cc.p(this.m_Carnival.getPosition().x,this.m_Carnival.getPosition().y+100 * Defines.BASE_SCALE));


            var boySize = this.m_Boy.getContentSize();
            this.m_Carnival.setPosition(cc.p(boySize.width/2,0-boySize.height*0.1));

            if (Defines.IS_EN || Defines.IS_KO){
                this.m_Carnival.setPosition(cc.p(boySize.width/2,0));
            }

            this.m_Carnival.retain();
            this.m_Carnival.removeFromParent(false);

            this.m_Boy.addChild(this.m_Carnival);
            this.m_Carnival.release();
        }

        this.m_IsFinish = true;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        if (this.m_IsFinish)
        {
            if (this.m_DelayTime > Defines.FPS*30)
            {
                return true;
            }

            this.m_DelayTime += time;
        }
        return false;
    },
    //------------------------------------------------------------------------------------------------------------------
    getNewCarnival : function()
    {
        return this.m_Carnival;
    },
    //------------------------------------------------------------------------------------------------------------------
    finish: function()
    {
        return this;
    }
});

cc.Cmd_CuteCarnivalChange.create = function(boy, carnival)
{
    return new cc.Cmd_CuteCarnivalChange(boy, carnival);
};


//======================================================================================================================
cc.Cmd_CuteMonsterMoveBack = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(boy,cuteMonster)
    {
        this._super();
        this.m_Boy = boy;
        this.m_Monster = cuteMonster;
        this.m_DelayTime = 0;
        this.m_IsFinish = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);
        var self = this;

        if (this.m_Monster)
        {
            var size = this.m_Boy.getContentSize();
            var endPos1 = _ScreenCenter();
            var pos = cc.p(endPos1.x-size.width/3,endPos1.y + 90);

//            var pos = cc.p(450,260);
            this.m_Monster.runAction(
                cc.Sequence.create(
                    cc.MoveTo.create(Defines.FPS * 20, pos),
                    cc.CallFunc.create(
                        function()
                        {
                            self.m_Monster.removeFromParent(false);
                            self.m_Monster.setPosition(cc.p(0,130 * Defines.BASE_SCALE));
                            self.m_Boy.addChild(self.m_Monster);
                            self.m_IsFinish = true;
                        }
                    )
                )

            );
        }
        else
        {
            this.m_IsFinish = true;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        if (this.m_IsFinish)
        {
            if (this.m_DelayTime > Defines.FPS*30)
            {
                return true;
            }

            this.m_DelayTime += time;
        }
        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function()
    {
        return this;
    }
});

cc.Cmd_CuteMonsterMoveBack.create = function(boy,cuteMonster)
{
    return new cc.Cmd_CuteMonsterMoveBack(boy,cuteMonster);
};

//======================================================================================================================
cc.Cmd_FlowerShow = cc.ICommand.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        this.m_DelayTime = 0;
        this.m_IsFinish = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);
        var self = this;

        var endPos1 = _ScreenCenter();
        var center = cc.p(_ScreenCenter().x,_ScreenCenter().y);
        cc.AudioMng.getInstance().playFlower();

        cc.EffectMng.getInstance().displaySaveSucceedPurple(0,cc.p(center.x-200,center.y+120));
        cc.EffectMng.getInstance().displaySaveSucceedPurple(1,cc.p(center.x+200,center.y+100));
        cc.EffectMng.getInstance().displaySaveSucceedPurple(0.5,cc.p(center.x-180,center.y-130));

        cc.EffectMng.getInstance().displaySaveSucceedPurple(1.7,cc.p(center.x+200,center.y-120));
        cc.EffectMng.getInstance().displaySaveSucceedPurple(2,cc.p(center.x-150,center.y-150));
        cc.EffectMng.getInstance().displaySaveSucceedPurple(0.9,cc.p(center.x,center.y));

        cc.EffectMng.getInstance().displaySaveSucceedPurple(1.3,cc.p(center.x+50,center.y-160));
        cc.EffectMng.getInstance().displaySaveSucceedPurple(0.6,cc.p(center.x+160,center.y-100));

        cc.EffectMng.getInstance().displaySaveSucceedYellow(2.5,endPos1);
        this.m_IsFinish = true;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        if (this.m_IsFinish)
        {
            if (this.m_DelayTime > Defines.FPS*100)
            {
                return true;
            }

            this.m_DelayTime += time;
        }
        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function()
    {
        return this;
    }
});

cc.Cmd_FlowerShow.create = function()
{
    return new cc.Cmd_FlowerShow();
};


