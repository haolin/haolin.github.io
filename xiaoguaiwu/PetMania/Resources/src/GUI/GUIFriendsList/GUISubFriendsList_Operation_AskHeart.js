//======================================================================================================================
var GUISubFriendsList_Operation_AskHeart = GUISubFriendsList_Operation.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
    },

    //------------------------------------------------------------------------------------------------------------------
    _static: function()
    {
        return GUISubFriendsList_Operation_AskHeart.prototype;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentOfGameLevel: function(cell)
    {
        var gameLevel = cc.LabelTTF.create(Resource.ChineseTxt["mail_content_2"], Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        cell.addChild(gameLevel);
        gameLevel.setPosition(cc.p(300 * Defines.BASE_SCALE, 30 * Defines.BASE_SCALE));
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    decorateCell: function(cell, indx, friendInfo, tableView)
    {
        var leftTime = parseInt((friendInfo.getAskHeartTime() - _ServerTime()));
        if (leftTime < 0)
        {
            leftTime = 0;
        }

        this.addContentOfGameLevel(cell);

        if (leftTime > 0)
        {
            this.createButtonByCD(cell, indx, friendInfo, leftTime, tableView);
        }
        else
        {
            this.createButton(cell, indx, friendInfo, tableView);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createButton: function(cell, indx, friendInfo, tableView)
    {
        var button = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_button_empty_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_button_empty_sel.png"),
            function()
            {
                cc.log("sender = " + indx);
                FriendsMng.getInstance().askFriendHeart(friendInfo.getRoleId(), 1);
            });


        button.setTag(indx);

        //
        var menu = cc.Menu.create(button);
        menu.setPosition(cc.p(0, 0));

        button.setAnchorPoint(cc.p(0.5, 0.5));
        button.setPosition(cc.p(380 * Defines.BASE_SCALE, 30 * Defines.BASE_SCALE));

        //
        cell.addChild(menu, 1000);

        //
        var image = cc.Sprite.createWithSpriteFrameName("general_ask_sugar.png");
        cell.addChild(image, 10000);

        //
        image.setScale(button.getContentSize().width/image.getContentSize().width);
        image.setPosition(button.getPosition());

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createButtonByCD: function(cell, indx, friendInfo, _leftTime, tableView)
    {
        //
        var tmp = cc.Sprite.createWithSpriteFrameName("general_button_empty_nor.png");
        var image = cc.Sprite.createWithSpriteFrameName("general_ask_sugar_cd.png");
        cell.addChild(image);
        image.setScale(tmp.getContentSize().width/image.getContentSize().width);
        image.setPosition(cc.p(380 * Defines.BASE_SCALE, 30 * Defines.BASE_SCALE));

        //
        var timeLabel = GUI.createNumberLabel("00:00", _GUIPath + "Num/num_0_10x10.png", 10, 10, "0");
        image.addChild(timeLabel);
        //timeLabel.setScale(0.5);
        timeLabel.setAnchorPoint(cc.p(0.5, 0.5));
        timeLabel.setPosition(cc.p(image.getContentSize().width * 0.5, image.getContentSize().height * 0.25));

        //
        var leftTime = _leftTime;
        timeLabel.setString(Tools.convertSecondTimeEx(leftTime, true, true, true));
        cell.schedule(
            function()
            {
                --leftTime;
                if (leftTime < 0)
                {
                    leftTime = 0;
                }

                if (leftTime <= 0)
                {
                    cell.unscheduleAllCallbacks();
                    friendInfo.setAskHeartTime(0);
                    tableView.updateCellAtIndex(indx);
                }
                else
                {
                    //
                    timeLabel.setString(Tools.convertSecondTimeEx(leftTime, true, true, true));
                }
            },
            1);

        return this;
    }
});
