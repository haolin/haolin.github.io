/*

cc.GUITipsEffect = cc.GUIWindow.extend({

    ctor: function()
    {
        this._super();

        cc.log("GUITipsEffect ctor!!!!!!");
        this.m_IsHideAll = false;

        //
        this.m_CuteSprite = null;
        this.m_ContentPanel = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "GUITipsEffect";
    },

    //------------------------------------------------------------------------------------------------------------------
    _position: function()
    {
        var targetRect = cc.GUIGameLevel.getInstance().getButtonItemRectForGuide(0);
        return cc.p(_ScreenBottomLeft().x + 80,
            (_ScreenBottomLeft().y + targetRect.y + targetRect.height + 50));
    },

    //------------------------------------------------------------------------------------------------------------------
    displayCuteAtPosition : function(_layer, isShowContent)
    {
        this.openWindow(_layer);
        this.getWindow().setTouchEnabled(true);
        //
//        var layer = _layer || animateLayer();

        this.displayCuteMonster(this._position(), this.getWindow());

        //
        if (isShowContent)
        {
            this.displayContentPanel(this._position(), this.getWindow());
        }

        var self = this;
        this.getWindow().onTouchesBegan = function(touches*/
/*, event*//*
)
        {
            if (self.m_IsHideAll)
            {
                return self;
            }

            // 判定是否点击到小怪物
            var cuteSize = self.m_CuteSprite.getContentSize();
            var panelSize = self.m_ContentPanel.getContentSize();
            var cuteLeftBottom = cc.p(self._position().x-cuteSize.width/2,self._position().y-cuteSize.height/2);

            var touchLocation = touches[0].getLocation();
            if (touchLocation.x < cuteLeftBottom.x
                || touchLocation.x > cuteLeftBottom.x + cuteSize.width + panelSize.width
                || touchLocation.y < cuteLeftBottom.y
                || touchLocation.y > cuteLeftBottom.y + cuteSize.height + panelSize.height)
            {
                return self;
            }

            self.m_IsHideAll = true;
            if (self.m_CuteSprite)
            {
                self.m_CuteSprite.runAction(
                    cc.Sequence.create(
                        cc.MoveTo.create(Defines.FPS*30,cc.p(-self._position().x - 300, self._position().y)),
                        cc.CallFunc.create(
                            function(sender)
                            {
                                sender.removeFromParent(true);
                                self.m_CuteSprite = null;

                                if (self.m_ContentPanel == null &&
                                    self.m_CuteSprite == null)
                                {
                                    self.closeWindow();

                                    self.getWindow().setTouchEnabled(false);
//                                    self.getWindow().removeFromParent(true);
                                }

//                                var gameLevelData = cc.DataMng.getInstance().getCurLevelData();
//                                var GameResult = cc.DataMng.getCustomResult();
//                                // 重置失败次数
//                                GameResult.resetCustomData(gameLevelData.NAME);
                            }
                        )
                    )
                );
            }

            if (self.m_ContentPanel)
            {
                self.m_ContentPanel.runAction(
                    cc.Sequence.create(
                        cc.MoveTo.create(Defines.FPS*30,cc.p(0-self._position().x,self._position().y+100)),
                        cc.CallFunc.create(
                            function(sender)
                            {
                                sender.removeFromParent(true);
                                self.m_ContentPanel = null;

                                if (self.m_ContentPanel == null &&
                                    self.m_CuteSprite == null)
                                {
                                    self.closeWindow();

                                    self.getWindow().setTouchEnabled(false);
//                                    self.getWindow().removeFromParent(true);
                                }
                            }
                        )
                    )
                );
            }

            return self;
        };

        this.getWindow().onTouchesMoved = function(touches*/
/*, event*//*
)
        {
            return self;
        };

        this.getWindow().onTouchesEnded = function()
        {
            return self;
        };

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    displayCuteMonster : function(pos, layer)
    {
        var self = this;
//        this.m_CuteSprite = cc.Sprite.create(_ImagesPath + "monster_3.png");
        this.m_CuteSprite = cc.Sprite.createWithSpriteFrameName("Images_monster_3.png");
        layer.addChild(this.m_CuteSprite);

        this.m_CuteSprite.setPosition(cc.p(-pos.x, pos.y));
        this.m_CuteSprite.setFlipX(true);

        this.m_CuteSprite.runAction(
            cc.Sequence.create(
                cc.MoveTo.create(Defines.FPS*30,pos),
                cc.CallFunc.create(
                    function(sender)
                    {
                        sender.runAction(
                            cc.RepeatForever.create(
                                cc.Sequence.create(
                                    cc.MoveTo.create(Defines.FPS*40,cc.p(pos.x, pos.y-10)),
                                    cc.MoveTo.create(Defines.FPS*40,cc.p(pos.x, pos.y+10))
                                )
                            )
                        )
                    }
                ),
                cc.DelayTime.create(5),
                cc.MoveTo.create(Defines.FPS*30,cc.p(-pos.x - 300, pos.y)),
                cc.CallFunc.create(
                    function(sender)
                    {
                        self.closeWindow();

                        self.getWindow().setTouchEnabled(false);
//                        sender.removeFromParent(true);
                    }
                )
            )
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayContentPanel : function(pos, layer)
    {
        var self = this;
        var curLevelData = cc.DataMng.getInstance().getCurLevelData();
//        this.m_ContentPanel = cc.Sprite.create(_ImagesPath + "kuaishiyongdaoju.png");
        this.m_ContentPanel = cc.Sprite.createWithSpriteFrameName("Images_kuaishiyongdaoju.png");
        this.m_ContentPanel.setFlipX(true);
        var sizePanel = this.m_ContentPanel.getContentSize();

        var interval = 3-1;
        var randPos = Tools.rangeRandom(0,0+interval,true);
        var contextPos = curLevelData.TIPS_INDEX[randPos] || 114;

        var context = cc.LabelTTF.create(Resource.ChineseTxt[contextPos],Defines.DefaultFont,24 * Defines.BASE_SCALE);
        context.setPosition(cc.p(sizePanel.width/2,sizePanel.height/2+15 * Defines.BASE_SCALE));
        this.m_ContentPanel.addChild(context);

        layer.addChild(this.m_ContentPanel);

        this.m_ContentPanel.setPosition(cc.p(-pos.x, pos.y+100 * Defines.BASE_SCALE));
        this.m_ContentPanel.runAction(
            cc.Sequence.create(
                cc.MoveTo.create(Defines.FPS*30,cc.p(pos.x+100 * Defines.BASE_SCALE,pos.y+100 * Defines.BASE_SCALE)),
                cc.DelayTime.create(5),
                cc.MoveTo.create(Defines.FPS*30,cc.p(0-pos.x,pos.y+100 * Defines.BASE_SCALE)),
                cc.CallFunc.create(
                    function(sender)
                    {
                        self.closeWindow();

                        self.getWindow().setTouchEnabled(false);
//                        sender.removeFromParent(true);
                    }
                )
            )
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        //?
        this.getWindow().setTouchEnabled(false);

        this.cleanAll();

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    cleanAll : function()
    {
        this.m_IsHideAll = false;

        if (this.m_CuteSprite)
        {
            this.m_CuteSprite.removeFromParent(true);
            this.m_CuteSprite = null;
        }

        if (this.m_ContentPanel)
        {
            this.m_ContentPanel.removeAllChildren(true);
            this.m_ContentPanel.removeFromParent(true);
            this.m_ContentPanel = null;
        }
    }
});

//
cc.GUITipsEffect._instance = null;
cc.GUITipsEffect.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUITipsEffect();
        this._instance.init();
    }

    return this._instance;
};
*/
