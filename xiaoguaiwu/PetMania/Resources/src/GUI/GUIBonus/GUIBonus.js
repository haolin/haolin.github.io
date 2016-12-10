/**
 * 登录1天可免费开1张卡片，连续登录2、3天2张，4-6天3张，第7天开始每天5张，一旦中断则从第1天重新开始。右侧用进度条表示当前的连续登录时间和可抽取的卡数。
 * 界面中有9张倒扣的卡片，直接点击一张卡片进行抽奖，点击后卡片翻开，配有持续光效，显示其内容。
 * 继续点击直到用尽今日的数量，剩下未翻开的卡片翻开，显示其中内容后全部消失，只剩下今天得到的奖励，持续2秒后本界面自动左右离开。
 * 9件奖品的搭配：不同数量的钻石（5、10、15、20、25、30、35、40）随机出6种，体力1、2、3点随机出1种，道具随机出1种。
 */
//======================================================================================================================
cc.GUIBonus = cc.GUIWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUIBonus";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        //
        this.m_Operation = null;
        this.m_BonusData = [];

        //
        this.m_BonusCardMenu = null;
        this.m_BonusCards = [];

        //
        this.m_FinishCheck = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent:function()
    {
        //
        this.m_Operation.decorate(this.getWindow());

        //
        this.m_BonusCardMenu = cc.Menu.create();
        this.m_BonusCardMenu.setPosition(cc.p(0, 0));
        this.getWindow().addChild(this.m_BonusCardMenu);

        //
        var cardsPos = this.m_Operation.getCardsPos(this.getWindow());

        //
        var self = this;
        cardsPos.forEach(
            function(each, index)
            {
                var bonusCard = cc.MenuItemSprite.create(
                    cc.Sprite.createWithSpriteFrameName("daily_bonus_card_0.png"),
                    cc.Sprite.createWithSpriteFrameName("daily_bonus_card_0.png"),
                    self._bonusCardCallback, self);

                self.m_BonusCardMenu.addChild(bonusCard);
                bonusCard.setPosition(each);
                bonusCard.setTag(index);

                self.m_BonusCards.push(bonusCard);
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _addBonusContent: function(flipCard, bonusData, hasEffect)
    {
        //
        var bgSize = flipCard.getContentSize();

        var bonusSprite = cc.Sprite.createWithSpriteFrameName(bonusData["_source"]);
        flipCard.addChild(bonusSprite);
        bonusSprite.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.5));

        var spriteSize = bonusSprite.getContentSize();
        bonusSprite.setScale(bgSize.width * 0.7 / spriteSize.width);

        //
        var labelCount = GUI.createNumberLabel(bonusData["_count"], _GUIPath + "Num/num_11_16x26.png", 16, 26, "0");
        flipCard.addChild(labelCount);
        labelCount.setAnchorPoint(cc.p(1, 0.5));
        labelCount.setPosition(cc.p(bgSize.width * 0.85, bgSize.height * 0.2));

        //
        var spriteMultiply = cc.Sprite.createWithSpriteFrameName("general_num_multi.png");
        flipCard.addChild(spriteMultiply);
        spriteMultiply.setAnchorPoint(cc.p(1, 0.5));
        var labelCountSize = labelCount.getContentSize();
        spriteMultiply.setPosition(cc.p(labelCount.getPosition().x - labelCountSize.width, bgSize.height * 0.2));

        //
        if (hasEffect)
        {
            var effectSprite = cc.Sprite.createWithSpriteFrameName("mrjl_0.png");
            flipCard.addChild(effectSprite);
            effectSprite.setPosition(cc.p(bgSize.width * 0.5, bgSize.height * 0.5 + 30 * Defines.BASE_SCALE));

            var animation = cc.Animation.create(cc.ResourceMng.getInstance().getAnimationFrames("mrjl_"), 10/60);
            effectSprite.runAction(cc.Sequence.create(
                cc.Animate.create(animation),
                cc.CallFunc.create(function(sender){
                    sender.removeFromParent(true);
                })
            ));
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _bonusCardCallback: function(sender)
    {
        //
        if (this.m_Operation.isFinish())
        {
            return this;
        }

        //
        cc.AudioMng.getInstance().playOpenEveryday();

        //
        this.m_Operation.addBonus();

        //
        var scaleAction = cc.Sequence.create(
            cc.ScaleTo.create(0.15, 0, 1),
            cc.CallFunc.create(function()
            {
                var flipCard = cc.Sprite.createWithSpriteFrameName("daily_bonus_card_1.png");
                this.getWindow().addChild(flipCard);
                flipCard.setPosition(sender.getPosition());
                flipCard.setScaleX(0);
                flipCard.runAction(cc.Sequence.create(
                    cc.ScaleTo.create(0.15, 1, 1),
                    cc.CallFunc.create(this.checkForFinish, this)
                ));

                //
                var bonusIndex = sender.getTag();
                var bonusData = this.m_BonusData[bonusIndex];
                this._addBonusContent(flipCard, bonusData, true);

                //
                bonusData["_func"].call();

                //记录
                sender.m_FlipCard = flipCard;
                flipCard.setTag(bonusIndex);

            }, this)
        );

        sender.runAction(scaleAction);
        sender.setEnabled(false);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _autoFlipCard: function(sender, index)
    {
        //
        cc.AudioMng.getInstance().playOpenEveryday();

        //
        var scaleAction = cc.Sequence.create(
            cc.ScaleTo.create(0.15, 0, 1),
            cc.CallFunc.create(function()
            {
                var flipCard = cc.Sprite.createWithSpriteFrameName("daily_bonus_card_1.png");
                this.getWindow().addChild(flipCard);
                flipCard.setPosition(sender.getPosition());
                flipCard.setScaleX(0);
                flipCard.runAction(cc.ScaleTo.create(0.15, 1, 1));

                //
                var bonusIndex = sender.getTag();
                var bonusData = this.m_BonusData[bonusIndex];
                this._addBonusContent(flipCard, bonusData, false);

                //
                this._dropOutCard(flipCard, 0.5 + 0.05 * index);

            }, this)
        );

        sender.runAction(scaleAction);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _dropOutCard: function(sender, delay)
    {
        //
        var curPos = sender.getPosition();
        var bgSize = sender.getContentSize();
        var finPos = cc.p(curPos.x, -bgSize.height);

        var moveAction = cc.Sequence.create(
            cc.DelayTime.create(delay),
            cc.MoveTo.create(0.1, finPos)
        );

        sender.runAction(moveAction);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _appearContent: function(sender, isFirst)
    {
        //
        if (isFirst)
        {
            cc.AudioMng.getInstance().playGetEveryday();
        }

        //
        var bonusIndex = sender.getTag();
        var bonusData = this.m_BonusData[bonusIndex];

        //
        var bgSize = sender.getContentSize();
        var numPos = cc.pAdd(sender.getPosition(), cc.p(20 * Defines.BASE_SCALE, bgSize.height/2));
        var srcPos = cc.pAdd(sender.getPosition(), cc.p(-30 * Defines.BASE_SCALE, bgSize.height/2 + 5 * Defines.BASE_SCALE));

        //
        var appearAction = cc.Sequence.create(
            cc.DelayTime.create(Tools.rangeRandom(0, 0.3)),
            cc.CallFunc.create(function()
            {
                //
                cc.EffectMng.getInstance().displayNumber(
                    bonusData["_count"], numPos, Defines.COLOR.ORANGE, this.getWindow(), 10);

                //
                var bonusSprite = cc.Sprite.createWithSpriteFrameName(bonusData["_source"]);
                this.getWindow().addChild(bonusSprite, 10);
                bonusSprite.setPosition(srcPos);
                bonusSprite.setScale(0.5);

                //
                var winSize = cc.Director.getInstance().getWinSize();
                bonusSprite.runAction(cc.MoveBy.create(1.2, cc.p(0, winSize.height * 0.03)));
                bonusSprite.runAction(cc.Sequence.create(
                    cc.DelayTime.create(0.8),
                    cc.FadeOut.create(0.4),
                    cc.CallFunc.create(function()
                    {
                        bonusSprite.setOpacity(255);
                        bonusSprite.setVisible(false);
                    })
                ));

                //
                var particle = cc.ParticleSystem.create(Resource.meirijiangli_plist);
                particle.setPosition(sender.getPosition());
                this.getWindow().addChild(particle);
                sender.setVisible(false);

            }, this)
        );

        sender.runAction(appearAction);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _finish: function()
    {
        this.m_Operation.finish();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    checkForFinish: function()
    {
        if (this.m_FinishCheck || !this.m_Operation.isFinish())
        {
            return this;
        }

        //
        this.m_FinishCheck = true;
        this.m_BonusCardMenu.setEnabled(false);

        //
        var self = this;

        //剩余的翻拍
        this.getWindow().runAction(cc.Sequence.create(
            cc.DelayTime.create(0.5),
            cc.CallFunc.create(function()
            {
                this.m_BonusCards.forEach(
                    function(each, index)
                    {
                        if (!each.m_FlipCard)
                        {
                            self._autoFlipCard(each, index);
                        }
                    }
                );
            }, this)
        ));

        //翻过的牌显示内容
        this.getWindow().runAction(cc.Sequence.create(
            cc.DelayTime.create(2.0),
            cc.CallFunc.create(function()
            {
                var isFirst = true;

                this.m_BonusCards.forEach(
                    function(each)
                    {
                        if (each.m_FlipCard)
                        {
                            self._appearContent(each.m_FlipCard, isFirst);
                            isFirst = false;
                        }
                    }
                );
            }, this)
        ));

        //所有的都结束了
        this.getWindow().runAction(cc.Sequence.create(
            cc.DelayTime.create(4.0),
            cc.CallFunc.create(this._finish, this)
        ));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, operation)
    {
        this._super(render);

        //
        cc.ResourceMng.getInstance().addToCache(
            Resource._GUIDailyBonus_plist,
            Resource._GUIDailyBonus_png);

        cc.ResourceMng.getInstance().addToCache(
            Resource.mrjl_fanpaishan_plist,
            Resource.mrjl_fanpaishan_png);

        //重置当日的游戏胜利次数
        cc.DataMng.getInstance().resetTotalWinTime();
        //
        this.m_Operation = operation;
        this.m_BonusData = this.m_Operation.siftBonusData();

        //
        this.addContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        //
        this.getWindow().removeAllChildren(true);

        //
        this.m_BonusCards = [];
        this.m_FinishCheck = false;

        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUIDailyBonus_plist,
            Resource._GUIDailyBonus_png);

        cc.ResourceMng.getInstance().removeFromCache(
            Resource.mrjl_fanpaishan_plist,
            Resource.mrjl_fanpaishan_png);

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIBonus._instance = null;
cc.GUIBonus.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIBonus();
        this._instance.init();
    }

    return this._instance;
};