//======================================================================================================================
var GUISubFriendsList_Operation_AskHelp = GUISubFriendsList_Operation.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(gameLevelIndex)
    {
        this._super();
        this.gameLevelIndex = gameLevelIndex;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContentOfGameLevel: function(cell)
    {
        var gameLevel = cc.LabelTTF.create(Resource.ChineseTxt["mail_content_1"], Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        cell.addChild(gameLevel);
        gameLevel.setPosition(cc.p(290 * Defines.BASE_SCALE, 30 * Defines.BASE_SCALE));
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    decorateCell: function(cell, indx, friendInfo, tableView)
    {
        var leftTime = parseInt((friendInfo.getHelpTime() - _ServerTime()));
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
        var self = this;

        //
        var button = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_button_empty_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_button_empty_sel.png"),
            function()
            {
                cc.log("RoleId = " + friendInfo.getRoleId() + ", gameLevelIndex = " + (self.gameLevelIndex));

                //FriendsMng.getInstance().askFriendHeart(friendInfo.getRoleId(), 1);
                FriendsMng.getInstance().begHelpToFriends([friendInfo.getRoleId()], self.gameLevelIndex);
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
        var image = cc.Sprite.createWithSpriteFrameName("general_coke_1.png");
        cell.addChild(image, 10000);
        image.setScaleX(50 * Defines.BASE_SCALE /image.getContentSize().width);
        image.setScaleY(50 * Defines.BASE_SCALE /image.getContentSize().height);
        image.setPosition(button.getPosition());

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createButtonByCD: function(cell, indx, friendInfo, _leftTime, tableView)
    {
        cc.log("dsaghjdas  friendInfo = " + friendInfo);

        //
        var image = cc.Sprite.createWithSpriteFrameName("general_coke_1.png");
        cell.addChild(image);

        //
        image.setScale(50 * Defines.BASE_SCALE /image.getContentSize().width);
        image.setScaleY(50 * Defines.BASE_SCALE /image.getContentSize().height);
        image.setPosition(cc.p(380 * Defines.BASE_SCALE, 30 * Defines.BASE_SCALE));

        //
        var timeLabel = GUI.createNumberLabel("00:00", _GUIPath + "Num/num_0_10x10.png", 10, 10, "0");
        cell.addChild(timeLabel);
        timeLabel.setPosition(image.getPosition());
        //timeLabel.setScale(0.5);
        timeLabel.setAnchorPoint(cc.p(0.5, 0.5));

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
                    friendInfo.setHelpTime(0);
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
