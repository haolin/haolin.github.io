/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-8-12
 * Time: 下午2:01
 * Version: 1.0
 * Function: This file use to do...
 */

cc.DramaLevelEnd_150 = cc.IDrama.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function()
    {
        this._super();
        this.m_Layer = null;

        this.m_Monster = null;
        this.m_Boy = null;

        this.m_BoyContent = [];
        this.m_MonsterContent = [];

        this.m_BoyPanel = null;
        this.m_MonsterPanel = null;

        this.m_Talk_boy = false;
    },
    //-----------------------------------------------------------------------------------------------------------------
    description : function()
    {
        return "DramaLevelEnd_150";
    },
    //-----------------------------------------------------------------------------------------------------------------
    start : function()
    {
        this.m_Layer = cc.Layer.create();
        animateLayer().addChild(this.m_Layer);

        this.m_Layer.setTouchEnabled(true);
        // Add role boy.
//        this.m_Boy = cc.Sprite.create(Resource.boy_talk_png);
        this.m_Boy = cc.Sprite.createWithSpriteFrameName("Images_boy_0.png");
        this.m_Layer.addChild(this.m_Boy);

        var size = this.m_Boy.getContentSize();
        var position = _ScreenBottomLeft();
        position.x += size.width / 2;
        position.y += size.height / 2;

        var boyStart = cc.p(position.x,position.y-size.height*0.05);
        boyStart.x -= size.width;

        var boyEnd = cc.p(boyStart.x+size.width,boyStart.y);

        this.m_Boy.setPosition(boyStart);
        this.m_Boy.setVisible(false);

        position.x += 250 * Defines.BASE_SCALE;
        // Add role monster
//        this.m_Monster = cc.Sprite.create(Resource.cutemonster_png);
        this.m_Monster = cc.Sprite.createWithSpriteFrameName("Images_monster_0.png");
        this.m_Layer.addChild(this.m_Monster);
        var monsterSize = this.m_Monster.getContentSize();
        var monsterPos = _ScreenTopRight();
        monsterPos.x -= monsterSize.width / 2;
        monsterPos.y -= monsterSize.height / 2;

        var monsterStart = monsterPos;
        monsterStart.x += monsterSize.width;

        this.m_Monster.setPosition(monsterStart);
        this.m_Monster.setVisible(false);
        this.m_Monster.setFlipX(true);

        monsterPos.x -= 150 * Defines.BASE_SCALE;

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.m_BoyContent.push(Resource.ChineseTxt[261]);
        this.m_MonsterContent.push(Resource.ChineseTxt[260]);
        this.m_Talk_boy = false;


        var self = this;
        var sq = cc.Sequence.create(
            cc.CallFunc.create(
                function ()
                {
                    self.m_Boy.setVisible(true);
                }
            ),
            cc.DelayTime.create(Defines.FPS * 30),
            cc.MoveTo.create(Defines.FPS*15,cc.p(boyEnd.x+50,boyEnd.y)),
            cc.MoveTo.create(Defines.FPS*3,boyEnd),
            cc.CallFunc.create(
                function(sender)
                {
                    position.x += 270 * Defines.BASE_SCALE;
                    position.y += 150 * Defines.BASE_SCALE;
                    self.talk(cc.p(boyEnd.x+size.width,boyEnd.y+size.height/2),Resource.ChineseTxt[259],true);
                })
        );

        this.m_Boy.runAction(sq);

        self.m_Layer.onTouchesBegan = function(touches/*, event*/)
        {
            return this;
        };

        self.m_Layer.onTouchesMoved = function(touches/*, event*/)
        {
            return this;
        };

        self.m_Layer.onTouchesEnded = function()
        {
            if (self.m_MonsterContent.length <= 0
                && self.m_BoyContent.length <= 0)
            {
                self.cancel();
                return this;
            }

            if (self.m_Talk_boy)
            {
                var size = self.m_Boy.getContentSize();
                var position = _ScreenBottomLeft();
                position.x += size.width / 2;
                position.y += size.height / 2;

                self.m_Talk_boy = false;
                // 男孩说话
                if (self.m_MonsterPanel)
                {
                    self.m_MonsterPanel.runAction(
                        cc.Sequence.create(
                            cc.ScaleTo.create(Defines.FPS*7,0),
                            cc.CallFunc.create(
                                function ()
                                {
                                    self.m_MonsterPanel.removeFromParent(true);
                                    self.m_MonsterPanel = null;
                                }
                            )
                        )

                    );
                }

                if (!self.m_Boy.isVisible())
                {
                    self.m_Boy.setVisible(true);
                    self.m_Boy.runAction(cc.Sequence.create(
                        cc.MoveTo.create(Defines.FPS*15,cc.p(boyEnd.x+50,boyEnd.y)),
                        cc.MoveTo.create(Defines.FPS*3,boyEnd),
                        cc.CallFunc.create(
                            function ()
                            {
                                position.x += 270 * Defines.BASE_SCALE;
                                position.y += 150 * Defines.BASE_SCALE;

                                var nextContent = self.m_BoyContent.shift();
                                self.talk(cc.p(boyEnd.x+size.width,boyEnd.y+size.height/2),nextContent,true);
                                return this;
                            }
                        )
                    ));
                }
                else
                {
                    position.x += 270 * Defines.BASE_SCALE;
                    position.y += 150 * Defines.BASE_SCALE;
                    var nextContent = self.m_BoyContent.shift();
                    self.talk(cc.p(boyEnd.x+size.width,boyEnd.y+size.height/2),nextContent,true);
                }
            }
            else
            {
                var monsterSize = self.m_Monster.getContentSize();
                var monsterPos = _ScreenTopRight();
                monsterPos.x -= monsterSize.width / 2;
                monsterPos.y -= monsterSize.height / 2;
                monsterPos.x -= 150 * Defines.BASE_SCALE;

                self.m_Talk_boy = true;
                if (self.m_BoyPanel)
                {
                    self.m_BoyPanel.runAction(
                        cc.Sequence.create(
                            cc.ScaleTo.create(Defines.FPS*7,0),
                            cc.CallFunc.create(
                                function ()
                                {
                                    self.m_BoyPanel.removeFromParent(true);
                                    self.m_BoyPanel = null;
                                }
                            )
                        )

                    );
                }

                // 小怪物说话
                if (!self.m_Monster.isVisible())
                {
                    self.m_Monster.setVisible(true);
                    self.m_Monster.runAction(cc.Sequence.create(
                        cc.MoveTo.create(Defines.FPS*15,cc.p(monsterPos.x-50,monsterPos.y)),
                        cc.MoveTo.create(Defines.FPS*3,monsterPos),
                        cc.CallFunc.create(
                            function ()
                            {
                                monsterPos.x -= 130 * Defines.BASE_SCALE;
                                monsterPos.y -= 130 * Defines.BASE_SCALE;
                                var nextContent = self.m_MonsterContent.shift();
                                self.talk(monsterPos,nextContent,false);
                                return this;
                            }
                        )
                    ));
                }
                else
                {
                    monsterPos.x -= 50 * Defines.BASE_SCALE;
                    monsterPos.y -= 130 * Defines.BASE_SCALE;
                    var nextContent = self.m_MonsterContent.shift();
                    self.talk(monsterPos,nextContent,false);
                }
            }
            return this;
        }
    },
    //-----------------------------------------------------------------------------------------------------------------
    finish : function()
    {

    },
    //-----------------------------------------------------------------------------------------------------------------
    cancel : function()
    {
        if (this.m_Monster)
        {
            this.m_Monster.removeFromParent(true);
            this.m_Monster = null;
        }

        if (this.m_Boy)
        {
            this.m_Boy.removeFromParent(true);
            this.m_Boy = null;
        }

        this.m_BoyContent = [];
        this.m_MonsterContent = [];

        if (this.m_BoyPanel)
        {
            this.m_BoyPanel.removeFromParent(true);
            this.m_BoyPanel = null;
        }
        if (this.m_MonsterPanel)
        {
            this.m_MonsterPanel.removeFromParent(true);
            this.m_MonsterPanel = null;
        }


        if (this.m_Layer)
        {
            this.m_Layer.removeFromParent(true);
            this.m_Layer = null;
        }

        //
        this.finish();
        return this;
    },
    //-----------------------------------------------------------------------------------------------------------------
    init : function()
    {
        return this;
    },
    //-----------------------------------------------------------------------------------------------------------------
    talk : function(position, content, isFlip,callBack)
    {
//        var talk_panel = cc.Sprite.create(Resource.talk_panel_png);
        var talk_panel = cc.Sprite.createWithSpriteFrameName("Images_talk_panel.png");
        var talkPanelSize = talk_panel.getContentSize();
        var targetSize = cc.size(350 * Defines.BASE_SCALE, 160 * Defines.BASE_SCALE);

        var panel = null;
        if (!isFlip)
        {
            if (this.m_MonsterPanel)
            {
                this.m_MonsterPanel.removeFromParent(true);
                this.m_MonsterPanel = null;
            }

            this.m_MonsterPanel = GUI.createDialogSpr(content, "Images_talk_panel.png", 0.3 , 0.3, 0.4, 0.4, 350 * Defines.BASE_SCALE, 160 * Defines.BASE_SCALE);
			targetSize = this.m_MonsterPanel.getContentSize();
            this.m_MonsterPanel.setAnchorPoint(cc.p(1, 1));

            this.m_Layer.addChild(this.m_MonsterPanel);
        }
        else if (isFlip)
        {
            if (this.m_BoyPanel)
            {
                this.m_BoyPanel.removeFromParent(true);
                this.m_BoyPanel = null;
            }

            this.m_BoyPanel = GUI.createDialogSpr(content, "Images_talk_panel.png", 0.3 , 0.3, 0.4, 0.4, 350 * Defines.BASE_SCALE, 160 * Defines.BASE_SCALE);
			targetSize = this.m_BoyPanel.getContentSize();
            this.m_BoyPanel.setAnchorPoint(cc.p(1, 1));

            this.m_Layer.addChild(this.m_BoyPanel);
        }

        if (!panel)
        {
            if (isFlip)
            {
                panel = this.m_BoyPanel;
            }
            else
            {
                panel = this.m_MonsterPanel;
            }
        }

        var Tage = 0;
        if (panel == this.m_BoyPanel)
        {
            Tage = 10010;
        }
        else if (panel == this.m_MonsterPanel)
        {
            Tage = 10011;
        }
        //
        var createNew = cc.LabelTTF.create(content, Defines.DefaultFont, 22 * Defines.BASE_SCALE);
        createNew.setColor(cc.c3b(78,160,34));
        panel.removeChildByTag(Tage,true);
        panel.addChild(createNew,Tage);


        var labelPos = cc.p(targetSize.width/2/*-30*/,targetSize.height/2-11/*+20*/);
        var labelNewPos = cc.p(targetSize.width/2/*-20*/,targetSize.height/2-11/*+30*/);
        if (isFlip)
        {
            createNew.setPosition(labelPos);
            panel.setRotation(180);
            createNew.setRotation(180);
            panel.setPosition(cc.p(position.x-targetSize.width/2,position.y-targetSize.height/2));
        }
        else
        {
            createNew.setPosition(labelNewPos);
            panel.setPosition(cc.p(position.x+targetSize.width/2,position.y+targetSize.height/2));
        }
        //
   
        createNew.setAnchorPoint(cc.p(0.5, 0.5));

        panel.setScale(0);
        var moveout = cc.ScaleTo.create(Defines.FPS*7,0);

        panel.runAction(
            cc.Sequence.create(
                cc.ScaleTo.create(Defines.FPS*7,1.2),
                cc.ScaleTo.create(Defines.FPS*7,1),
                cc.DelayTime.create(Defines.FPS*100),
//                moveout,
                cc.CallFunc.create(
                    function (sender)
                    {
//                        sender.removeFromParent();
                        if (callBack)
                        {
                            callBack();
                        }
                    }
                )
            )
        )

        return this;
    }
});

cc.DramaLevelEnd_150.create = function()
{
    var newCreate = new cc.DramaLevelEnd_150();
    if (newCreate)
    {
        newCreate.init();
    }

    return newCreate;
};

cc.DramaLevelEnd_150.description = function()
{
    return "DramaLevelEnd_150";
};
