//var isImageGetAllFlag = {};
//var isImageGetAll = [];

//
var _TopApplyDataAgain = {};

//----------------------------------------------------------------------------------------------------------------------
var TotalLevelTop_CellBuilder = cc.Class.extend({

    //
    CELL_CONTENT_TAG:
    {
        TOP_BACK_GROUND: 999,      //背景
        TOP_POSITION: 1000,        //排行榜位置
        TOP_PLAYER_PHOTO: 1001,    //头像
        TOP_PLAYER_NAME: 1002,     //名字
        TOP_PLAYER_SCORE: 1003,    //分数
        TOP_GAME_LEVEL: 1004       //关卡数
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(cellSize)
    {
        this.m_CellSize = cellSize || cc.size(10 * Defines.BASE_SCALE, 10 * Defines.BASE_SCALE);
        this.m_CellSize = cc.size(cellSize.width, cellSize.height + 6 * Defines.BASE_SCALE);
    },

    //------------------------------------------------------------------------------------------------------------------
    _static: function()
    {
        return TotalLevelTop_CellBuilder.prototype;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "TotalLevelTop_CellBuilder";
    },

    //------------------------------------------------------------------------------------------------------------------
    getCellSize: function()
    {
        return this.m_CellSize;
    },

    //------------------------------------------------------------------------------------------------------------------
    buildCell: function(cell, idx)
    {
        cell.removeAllChildren(true);

        //背景
        var backGroundSelf = cc.Sprite.createWithSpriteFrameName("GUITotalLevelTop_panel_02.png");
        cell.addChild(backGroundSelf, 0, this._static().CELL_CONTENT_TAG.TOP_BACK_GROUND);
        backGroundSelf.setAnchorPoint(cc.p(0, 0));

        //排行榜位置
        if (idx < 3){
            var topPos = cc.LabelAtlas.create("9",
                _GUIPath + "Num/num_16_30x40.png",
                30, 40,
                "0");
        }
        else {
            var topPos = cc.LabelTTF.create("4", Defines.DefaultFont, 28 * Defines.BASE_SCALE);
        }
        cell.addChild(topPos, 0, this._static().CELL_CONTENT_TAG.TOP_POSITION);
        topPos.setAnchorPoint(cc.p(0.5, 0.5));
        topPos.setPosition(cc.p(30 * Defines.BASE_SCALE, backGroundSelf.getContentSize().height /2));

        //名字
        var hisName = cc.LabelTTF.create("名字名字名字", Defines.DefaultFont, 14 * Defines.BASE_SCALE);
        cell.addChild(hisName, 0, this._static().CELL_CONTENT_TAG.TOP_PLAYER_NAME);
        hisName.setAnchorPoint(cc.p(0, 0.5));
        hisName.setPosition(cc.p(130 * Defines.BASE_SCALE, backGroundSelf.getContentSize().height * 0.75));

        //关卡数
        var levelNum = cc.LabelTTF.create("102", Defines.DefaultFont, 14 * Defines.BASE_SCALE);
        cell.addChild(levelNum, 0, this._static().CELL_CONTENT_TAG.TOP_GAME_LEVEL);
        levelNum.setAnchorPoint(cc.p(0, 0.5));
        levelNum.setPosition(cc.p(260 * Defines.BASE_SCALE, backGroundSelf.getContentSize().height * 0.75));

        var levelText = "关";
        var scoreText = "总分:";
        if (Defines.IS_EN){
            levelText = "level ";
            scoreText = "score:";
        }

        var levelTxt = cc.LabelTTF.create(levelText, Defines.DefaultFont, 14 * Defines.BASE_SCALE);
        cell.addChild(levelTxt);
        levelTxt.setAnchorPoint(cc.p(0, 0.5));
        levelTxt.setPosition(cc.p(285 * Defines.BASE_SCALE, backGroundSelf.getContentSize().height * 0.75));
        if (Defines.IS_EN){
            levelTxt.setPosition(cc.p(240 * Defines.BASE_SCALE, backGroundSelf.getContentSize().height * 0.75));
            levelNum.setPosition(cc.p(285 * Defines.BASE_SCALE, backGroundSelf.getContentSize().height * 0.75));
        }

        //照片头像
        var friendPhoto = cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_PhotoFake.png");
        cell.addChild(friendPhoto, 0, this._static().CELL_CONTENT_TAG.TOP_PLAYER_PHOTO);
        friendPhoto.setPosition(cc.p(65 * Defines.BASE_SCALE + friendPhoto.getContentSize().width / 2, backGroundSelf.getContentSize().height /2));
        if (idx == 0) {
            cc.log("friendPhoto.setScale(1.5)");
            friendPhoto.setScale(1.5);
        }

        //分数
        var scoreTxt = cc.LabelTTF.create(scoreText, Defines.DefaultFont, 14 * Defines.BASE_SCALE);
        cell.addChild(scoreTxt , 0);
        scoreTxt.setAnchorPoint(cc.p(0, 0.5));
        scoreTxt.setPosition(cc.p(130 * Defines.BASE_SCALE, backGroundSelf.getContentSize().height * 0.25));

        //
        var scoreLab = GUI.createNumberLabel("1234567",
            _GUIPath + "Num/num_5_12x18.png",
            12, 18,
            "0");

        //
        cell.addChild(scoreLab, 0, this._static().CELL_CONTENT_TAG.TOP_PLAYER_SCORE);
        scoreLab.setAnchorPoint(cc.p(0, 0.5));
        scoreLab.setPosition(cc.p(185 * Defines.BASE_SCALE,  backGroundSelf.getContentSize().height * 0.25));

        //
        return cell;
    },

    getRealLength: function(str){
        var realLength = 0;
        var len = str.length;
        var charCode = -1;

        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return realLength;
    },

    getRealDrop: function(str){
        var realLength = 0;
        var len = str.length;
        var charCode = -1;

        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
            if (realLength > 14){
                return i;
            }
        }
        return 13;
    },

    //------------------------------------------------------------------------------------------------------------------
    decorateCell: function(cell, idx, topInfo)
    {
        cc.log("decorateCell");
        //背景
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.TOP_BACK_GROUND).setVisible(true);

        //位置
        if (idx < 3){
            var posBase = cell.getChildByTag(this._static().CELL_CONTENT_TAG.TOP_POSITION);
            var posSpr = cc.Sprite.createWithSpriteFrameName("icon_huangguan0" + (idx + 1) +".png");
            posSpr.setPosition(posBase.getPosition());
            cell.addChild(posSpr);
            posBase.setVisible(posSpr == null);
        }
        else {
            cell.getChildByTag(this._static().CELL_CONTENT_TAG.TOP_POSITION).setString((idx + 1).toString());
        }

        //名字
        var playerName = topInfo.getPlayerName();

        cc.log("playerName = " + playerName);
        if (!playerName){
            playerName = "name not found";
        }
        if (this.getRealLength(playerName) > 14){
            var real_str = playerName.substring(0 , this.getRealDrop(playerName));
            cell.getChildByTag(this._static().CELL_CONTENT_TAG.TOP_PLAYER_NAME).setString(real_str + "...");
        }
        else {
            cell.getChildByTag(this._static().CELL_CONTENT_TAG.TOP_PLAYER_NAME).setString(playerName);
        }

        //关卡数
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.TOP_GAME_LEVEL).setString(topInfo.getGameLevel());

        //分数
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.TOP_PLAYER_SCORE).setString(
            topInfo.getTotalScore().toString());

        //照片头像
        var photoFake = cell.getChildByTag(this._static().CELL_CONTENT_TAG.TOP_PLAYER_PHOTO);

        cc.log("topInfo.getPhotoResPath() = " + topInfo.getPhotoResPath());

        var photo = topInfo.getPhotoResPath() != "" ? cc.Sprite.create(topInfo.getPhotoResPath()) : null;
        if (photo)
        {
            cc.log("cell.addChild");
            cell.addChild(photo);
//            photo.setScale((photoFake.getContentSize().width/photoFake.getContentSize().width) * photoFake.getScale());
            photo.setScaleX(photoFake.getContentSize().width/photo.getContentSize().width);
            photo.setScaleY(photoFake.getContentSize().height/photo.getContentSize().height);
            photo.setPosition(photoFake.getPosition());
            //isImageGetAllFlag[playerName] = 0;

            if (_TopApplyDataAgain[playerName])
            {
                cc.log("再次申请数据完成 ＝ " + playerName);
                delete _TopApplyDataAgain[playerName];
            }
        }
        else {

            _TopApplyDataAgain[playerName] = topInfo;

            //isImageGetAll.push(topInfo);
            //isImageGetAllFlag[playerName] = 1;
            //cc.log("not get info : playername = " + playerName);
        }
        photoFake.setVisible(photo == null);

        var changeFlag = topInfo.getPosChange();
        if (changeFlag == "up"){
            var posChangeTip = cc.Sprite.createWithSpriteFrameName("icon_up.png");
            cell.addChild(posChangeTip);
            posChangeTip.setPosition(cc.p(photoFake.getPositionX() + photoFake.getContentSize().width * 0.5, photoFake.getPositionY() - photoFake.getContentSize().height * 0.5));
        }
        else if (changeFlag == "down"){
            var posChangeTip = cc.Sprite.createWithSpriteFrameName("icon_down.png");
            cell.addChild(posChangeTip);
            posChangeTip.setPosition(cc.p(photoFake.getPositionX() + photoFake.getContentSize().width * 0.5, photoFake.getPositionY() - photoFake.getContentSize().height * 0.5));
        }


        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    decoratePhoto: function (cell, friendInfo)
    {
        var photoUrl = (friendInfo instanceof FriendInfoSelf)
            ? cc.NodeSelf.getInstance().getSelfPhoto() : friendInfo.getPhotoUrl();

        if (photoUrl == "")
        {
            ////cc.log("没有照片 = " + friendInfo);
            return cell;
        }

        //
        var friendPhoto =  cc.Sprite.create(photoUrl);
        if (!friendPhoto)
        {
            return cell;
        }

        var defaultPhoto = cell.getChildByTag(this._static().CELL_CONTENT_TAG.TOP_PLAYER_PHOTO);
        defaultPhoto.removeAllChildren(true);

        //
        defaultPhoto.addChild(friendPhoto);

        //
        friendPhoto.setScaleX(defaultPhoto.getContentSize().width/friendPhoto.getContentSize().width);
        friendPhoto.setScaleY(defaultPhoto.getContentSize().height/friendPhoto.getContentSize().height);
        friendPhoto.setPosition(
            cc.p(defaultPhoto.getContentSize().width/2,
                defaultPhoto.getContentSize().height/2)
        );

        return cell;
    }

});
//----------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------------------
cc.GUITotalLevelTop = cc.GUIWindow.extend ({

    description: function()
    {
        return "GUITotalLevelTop";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();
        this.m_GameLevelName = "LEVEL_1";
        //
        this.m_TopPlayersTableView = null;

        //
        this.m_BackGround = null;
        this.m_MyCellsBuilder = null;
        this.m_selfCell = null;
        //
        this.switchBtnOn = null;
        this.switchBtnOff = null;

        this.m_IsLoading = false;

        this.isFresh = false;

    },

    //------------------------------------------------------------------------------------------------------------------
    init: function ()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    markLoading: function()
    {
        this.m_IsLoading = true;
        this.updateGUI();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanLoading: function()
    {
        this.m_IsLoading = false;
        this.updateGUI();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getModel:function ()
    {
        return GameTopModel.getInstance();
    },

    //------------------------------------------------------------------------------------------------------------------
    scrollViewDidScroll:function (view)
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    scrollViewDidZoom:function (view)
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    tableCellTouched:function (/*table, cell*/)
    {
        ////cc.log("cell touched at index: " + cell.getIdx());
        //return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cellSizeForTable: function(/*table*/)
    {
        return this.m_MyCellsBuilder.getCellSize();
    },

    //------------------------------------------------------------------------------------------------------------------
    numberOfCellsInTableView:function (/*table*/)
    {
        return this.getModel().getTopGameLevelSize();
    },

    //------------------------------------------------------------------------------------------------------------------
    tableCellAtIndex:function (table, idx)
    {
        cc.log("tableCellAtIndex");
        //
        var cell = table.dequeueCell();
        if (!cell)
        {
            cell = new cc.TableViewCell();
        }

        //
        this.m_MyCellsBuilder.buildCell(cell, idx);

        //
        var targetData = this.getModel().getTopGameLevelDataByIndex(idx);
        if (targetData){
            var targetMapData = this.getModel().getHashMapUIDByKey(GameTopModel._TOP_KEY.KEY_GAME_LEVEL);
            this.m_MyCellsBuilder.decorateCell(cell, idx, targetMapData[targetData.getUID()]);
        }

        //
        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    _inviteFriends: function()
    {
        if (_CanInviteFriend())
        {
            if (cc.GUIInviteFriends.getInstance().isWindowOpen())
            {
                cc.GUIInviteFriends.getInstance().closeWindow();
            }
            else
            {
                FriendsMng.getInstance().applyFriendsInContactList();
            }

            //cc.GUIInviteFriends.getInstance().applyOpenWindow(this.getWindow().getParent());
        }
        else if (SHARE_ENABLED)
        {
            //邀请好友不给奖励
            ShareMng.getInstance().setCanBonus(false);
            ShareMng.getInstance().shareWithInviteFriends();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _switchOn: function()
    {
        var self = this;
//		this.switchBtnOn.setVisible(false);

        var moveTime = (this.m_BackGround.getContentSize().width)/Defines.OBJ_MOVE_SPEED * 0.5;
        var moveTo = cc.MoveTo.create(
            moveTime,
            cc.p(-this.m_BackGround.getContentSize().width,this.m_BackGround.getPosition().y)
        );
        var seqMove = cc.Sequence.create(
            moveTo,
            cc.CallFunc.create(
                function()
                {
                    self.switchBtnOff.setVisible(true);
                    if (self.blockLayer){
                        self.blockLayer.setVisible(false);
                    }
                    self.closeWindow();
                },
                null
            )
        );
        this.m_BackGround.runAction(seqMove);
    },

    //------------------------------------------------------------------------------------------------------------------
    _switchOff: function()
    {
        var self = this;
        this.switchBtnOff.setVisible(false);

        var moveTime = (this.m_BackGround.getContentSize().width)/Defines.OBJ_MOVE_SPEED * 0.5;
        var moveTo = cc.MoveTo.create(
            moveTime,
            cc.p(this.m_BackGround.getContentSize().width/2,this.m_BackGround.getPosition().y)
        );
        var seqMove = cc.Sequence.create(
            moveTo,
            cc.CallFunc.create(
                function()
                {
//					self.switchBtnOn.setVisible(true);
                    if (self.blockLayer){
                        self.blockLayer.setVisible(true);
                    }

                },
                null
            )
        );
        this.m_BackGround.runAction(seqMove);
    },

    //------------------------------------------------------------------------------------------------------------------
    _addContentOfBackImage: function()
    {
        this.blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(this.blockLayer, -1);

        //
        this.m_BackGround = cc.Sprite.createWithSpriteFrameName("GUITotalLevelTop_panel_01.png");
        this.getWindow().addChild(this.m_BackGround);

        //
        this.m_BackGround.setPosition(
            cc.p(_ScreenLeft().x - this.m_BackGround.getContentSize().width/2,
                _ScreenRight().y
            )
        );

        //
        var totalBgKuang = cc.Sprite.createWithSpriteFrameName("GUITotalLevelTop_kuang_panel_01.png");
        this.m_BackGround.addChild(totalBgKuang, 10000);
        totalBgKuang.setPosition(
            cc.p(this.m_BackGround.getContentSize().width/2,
                this.m_BackGround.getContentSize().height/2
            )
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _addContentOfButtons: function()
    {
        //
        var totalBtn = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("GUITotalLevelTop_btnTotal_up.png"),
            cc.Sprite.createWithSpriteFrameName("GUITotalLevelTop_btnTotal_down.png"),
            this._totalTopInfo, this);

        //
        this.switchBtnOn = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("GUITotalLevelTop_panel_05.png"),
            cc.Sprite.createWithSpriteFrameName("GUITotalLevelTop_panel_05.png"),
            this._switchOn, this);

        //
        this.switchBtnOff = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("GUITotalLevelTop_panel_06.png"),
            cc.Sprite.createWithSpriteFrameName("GUITotalLevelTop_panel_06.png"),
            this._switchOff, this);

        //
        var menu_total = cc.Menu.create(this.switchBtnOn,totalBtn);
        this.m_BackGround.addChild(menu_total, 100000);
        menu_total.setPosition(cc.p(0, 0));
        totalBtn.setPosition(cc.p(
            this.m_BackGround.getContentSize().width / 2 - totalBtn.getContentSize().width * 1.2,
            this.m_BackGround.getContentSize().height - totalBtn.getContentSize().height/2 * 1.5));

        //
        var menu_switch = cc.Menu.create(this.switchBtnOff);
        this.getWindow().addChild(menu_switch, 100000);
        menu_switch.setPosition(cc.p(0, 0));

        //
        this.switchBtnOn.setPosition(cc.p(
            this.m_BackGround.getContentSize().width + this.switchBtnOn.getContentSize().width * 0.5 - 4,
            this.m_BackGround.getContentSize().height / 2));

        //
        this.switchBtnOff.setPosition(cc.p(
            _ScreenLeft().x + this.switchBtnOff.getContentSize().width * 0.5,
            _ScreenRight().y));

        //
        this.switchBtnOff.setVisible(false);


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _addContentOfInviteButton: function()
    {
        //邀请好友
        var self = this;

        var spriteNormal = cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_BtnInviteUp.png");
        var spriteSelected = cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_BtnInviteDown.png");
        var buttonInviteFriends = cc.MenuItemSprite.create(spriteNormal, spriteSelected, this._inviteFriends, this);

        var panelSize = this.m_BackGround.getContentSize();

        var cokeTimeContent = "下次更新：";
        if (Defines.IS_EN){
            cokeTimeContent = "Update：";
        }
		else if (Defines.IS_KO){
			cokeTimeContent = "나중에 하기：";
		}

        var cokeTimeTxt = cc.LabelTTF.create(cokeTimeContent, Defines.DefaultFont, 14 * Defines.BASE_SCALE);
        this.m_BackGround.addChild(cokeTimeTxt);
        cokeTimeTxt.setPosition(cc.p(panelSize.width * 0.13 , 35 * Defines.BASE_SCALE));

        var cokeTimeLabel = GUI.createNumberLabel("00:00:00", _GUIPath + "Num/num_3_14x18.png", 14, 18, "0");
        this.m_BackGround.addChild(cokeTimeLabel,10001);

        cokeTimeLabel.setPosition(cc.p(panelSize.width * 0.2 , 30 * Defines.BASE_SCALE));

        if (cc.DataMng.getInstance().getCurFreshLine() && cc.DataMng.getInstance().getCurFreshLine() <  cc.DataMng.getInstance().getNowLeftTime()){
            self.isFresh = true;
            GameTopModel.getInstance().askServerForTopDatas();
        }

        if (cc.DataMng.getInstance().getCurFreshLine() == 0){
            cc.DataMng.getInstance().setCurFreshLine();
        }

        var leftTime = cc.DataMng.getInstance().getCurFreshLine() - cc.DataMng.getInstance().getNowLeftTime();
        if (leftTime < 0 ){
            leftTime = 0;
        }
        cokeTimeLabel.setString(Tools.convertSecondTimeEx(leftTime, true, true, true));
        cokeTimeLabel.unscheduleAllCallbacks();
        cokeTimeLabel.schedule(
            function()
            {
                --leftTime;
                if (leftTime < 0)
                {
                    leftTime = 0;
                }

                //
                cokeTimeLabel.setString(Tools.convertSecondTimeEx(leftTime, true, true, true));
                //
                if (leftTime <= 0)
                {
                    //
                    cc.DataMng.getInstance().setCurFreshLine();
                    leftTime = cc.DataMng.getInstance().getCurFreshLine() - cc.DataMng.getInstance().getNowLeftTime();
                    self.isFresh = true;
                    GameTopModel.getInstance().askServerForTopDatas();

                }
            }, 1);

        var menu = cc.Menu.create(buttonInviteFriends);
        this.m_BackGround.addChild(menu, 100000);
        menu.setPosition(cc.p(0, 0));
        buttonInviteFriends.setPosition(cc.p(this.m_BackGround.getContentSize().width * 0.7,35 * Defines.BASE_SCALE));


        return this;
    },



    ifLevelTopFresh: function(){
        return this.isFresh;
    },
    //------------------------------------------------------------------------------------------------------------------
    _addSelfScoreCell: function()
    {
        //添加自己的成绩

        this.m_selfCell = cc.Sprite.createWithSpriteFrameName("GUITotalLevelTop_panel_02.png");
        this.m_BackGround.addChild(this.m_selfCell);
        this.m_selfCell.setAnchorPoint(cc.p(0, 0));
        this.m_selfCell.setPosition(cc.p(23 * Defines.BASE_SCALE , 80 * Defines.BASE_SCALE ));

        //照片头像
        var friendPhoto = cc.Sprite.createWithSpriteFrameName("GUIFriendsScoresTop_PhotoFake.png");
        this.m_selfCell.addChild(friendPhoto, 0, 1001);
        friendPhoto.setPosition(cc.p(90 * Defines.BASE_SCALE + friendPhoto.getContentSize().width / 2, this.m_selfCell.getContentSize().height /2));//35, 37));

        //名字
        var hisName = cc.LabelTTF.create("myself", Defines.DefaultFont, 14 * Defines.BASE_SCALE);
        this.m_selfCell.addChild(hisName, 0, 1002);
        hisName.setAnchorPoint(cc.p(0, 0.5));
        hisName.setPosition(cc.p(150 * Defines.BASE_SCALE, this.m_selfCell.getContentSize().height * 0.75));

        //关卡数
        var levelNum = cc.LabelTTF.create("102", Defines.DefaultFont, 14 * Defines.BASE_SCALE);
        this.m_selfCell.addChild(levelNum, 0, 1004);
        levelNum.setAnchorPoint(cc.p(0, 0.5));
        levelNum.setPosition(cc.p(210 * Defines.BASE_SCALE, this.m_selfCell.getContentSize().height * 0.75));

        var levelText = "关";
        var scoreText = "总分:";
        if (Defines.IS_EN){
            levelText = "level ";
            scoreText = "score:";
        }
		else if (Defines.IS_KO)
		{
            levelText = "라운드 ";
            scoreText = "총점:";
		}

        var levelTxt = cc.LabelTTF.create(levelText, Defines.DefaultFont, 14 * Defines.BASE_SCALE);
        this.m_selfCell.addChild(levelTxt);
        levelTxt.setAnchorPoint(cc.p(0, 0.5));
        levelTxt.setPosition(cc.p(235 * Defines.BASE_SCALE, this.m_selfCell.getContentSize().height * 0.75));
        if (Defines.IS_EN){
            levelTxt.setPosition(cc.p(210 * Defines.BASE_SCALE, this.m_selfCell.getContentSize().height * 0.75));
            levelNum.setPosition(cc.p(255 * Defines.BASE_SCALE, this.m_selfCell.getContentSize().height * 0.75));
        }

        //分数
        var scoreTxt = cc.LabelTTF.create(scoreText, Defines.DefaultFont, 14 * Defines.BASE_SCALE);
        this.m_selfCell.addChild(scoreTxt , 0);
        scoreTxt.setAnchorPoint(cc.p(0, 0.5));
        scoreTxt.setPosition(cc.p(150 * Defines.BASE_SCALE, this.m_selfCell.getContentSize().height * 0.25));

        //
        var scoreLab = GUI.createNumberLabel("1234567",
            _GUIPath + "Num/num_5_12x18.png",
            12, 18,
            "0");

        //
        this.m_selfCell.addChild(scoreLab, 0, 1003);
        scoreLab.setAnchorPoint(cc.p(0, 0.5));
        scoreLab.setPosition(cc.p(205 * Defines.BASE_SCALE,  this.m_selfCell.getContentSize().height * 0.25));

        //设置数据

        var friendInfoSelf = FriendInfo.createSelf("LEVEL_1");
        if (friendInfoSelf == null){
            return this;
        }
        hisName.setString(friendInfoSelf.getName());

        var photoUrl = cc.NodeSelf.getInstance().getSelfPhoto();
        if (photoUrl != "")
        {
            var selfPhoto =  cc.Sprite.create(photoUrl);
            friendPhoto.addChild(selfPhoto, 0);
            selfPhoto.setScaleX(friendPhoto.getContentSize().width/selfPhoto.getContentSize().width);
            selfPhoto.setScaleY(friendPhoto.getContentSize().height/selfPhoto.getContentSize().height);
            selfPhoto.setPosition(
                cc.p(friendPhoto.getContentSize().width/2,
                    friendPhoto.getContentSize().height/2)
            );
        }

		var totaldata = cc.DataMng.getInstance().getTotalData();
        var totalGameScore = totaldata[0];
        var totalLevel = totaldata[1];

        levelNum.setString(totalLevel.toString());
        scoreLab.setString(totalGameScore.toString());

        var totalListDatas = this.getModel().getTopDatasByKey(GameTopModel._TOP_KEY.KEY_GAME_LEVEL);
        var dataLength = totalListDatas.length;

        if (dataLength <= 0){
            cc.log("排行榜为空");
            return ;
        }

        var curLevelTopPos = GameTopModel.getInstance().getTopDatasIndexForSelf();
        var lastLevelTopPos = cc.DataMng.getInstance().getLastLevelTopNum();
        cc.log("curLevelTopPos = " + curLevelTopPos);
        cc.log("lastLevelTopPos = " + lastLevelTopPos);

        if (curLevelTopPos > Defines.totalLevelTopLength){
            var topPos = cc.LabelTTF.create("1", Defines.DefaultFont, 28 * Defines.BASE_SCALE);
            this.m_selfCell.addChild(topPos, 0);
            topPos.setAnchorPoint(cc.p(0.5, 0.5));
            topPos.setPosition(cc.p(45 * Defines.BASE_SCALE, this.m_selfCell.getContentSize().height /2));

            topPos.setString(curLevelTopPos.toString());
            cc.DataMng.getInstance().setLastLevelTopNum(curLevelTopPos);

            if (lastLevelTopPos > -1){
                if (curLevelTopPos > lastLevelTopPos){
                    var posChangeTip = cc.Sprite.createWithSpriteFrameName("icon_down.png");
                    this.m_selfCell.addChild(posChangeTip);
                    posChangeTip.setPosition(cc.p(friendPhoto.getPositionX() + friendPhoto.getContentSize().width * 0.5, friendPhoto.getPositionY() - friendPhoto.getContentSize().height * 0.5));
                }
                else if (curLevelTopPos < lastLevelTopPos){
                    var posChangeTip = cc.Sprite.createWithSpriteFrameName("icon_up.png");
                    this.m_selfCell.addChild(posChangeTip);
                    posChangeTip.setPosition(cc.p(friendPhoto.getPositionX() + friendPhoto.getContentSize().width * 0.5, friendPhoto.getPositionY() - friendPhoto.getContentSize().height * 0.5));
                }
            }
        }
        else {
            //名次的判断
            var selfIndex = -1;
            for (var i = dataLength - 1; i >= 0; i--){
                if (totalListDatas[i].getRoleId()==friendInfoSelf.getID()){
                    selfIndex = i;
                }
            }

            if (selfIndex > -1){
                totalListDatas.splice(selfIndex,1);
                cc.DataMng.getInstance().setLastLevelTopNum(selfIndex + 1);
                dataLength--;
            }

            var createNew = TopData_GameLevel.create(friendInfoSelf.getName(),
                totalLevel.toString(),
                totalGameScore.toString(),
                friendInfoSelf.getID(),
                friendInfoSelf.getID());
            createNew.setPhotoResPath(photoUrl);
            var copyTarget = totalListDatas[curLevelTopPos - 1];

            totalListDatas.splice(curLevelTopPos - 1,1,createNew, copyTarget);

            this.getModel().setTopDataByKeyAndIndex(GameTopModel._TOP_KEY.KEY_GAME_LEVEL, createNew);
            if (lastLevelTopPos > -1){
                if (curLevelTopPos > lastLevelTopPos){
                    createNew.setPosChange("down");
                }
                else if (curLevelTopPos < lastLevelTopPos){
                    createNew.setPosChange("up");
                }
                else {
                    createNew.setPosChange("same");
                }
            }
            else {
                createNew.setPosChange("same");
            }

            if (totalListDatas.length > Defines.totalLevelTopLength){
                var curDelData = totalListDatas[Defines.totalLevelTopLength];
                this.getModel().delTopDataByKey(GameTopModel._TOP_KEY.KEY_GAME_LEVEL,curDelData);
                totalListDatas.splice(Defines.totalLevelTopLength,totalListDatas.length - Defines.totalLevelTopLength);

            }

            if (curLevelTopPos <= 3){
                var topPos = cc.Sprite.createWithSpriteFrameName("icon_huangguan0" + curLevelTopPos +".png");
            }
            else {
                var topPos = cc.LabelTTF.create(curLevelTopPos.toString(), Defines.DefaultFont, 28 * Defines.BASE_SCALE);
                topPos.setString(curLevelTopPos.toString());
            }
            this.m_selfCell.addChild(topPos, 0);
            topPos.setAnchorPoint(cc.p(0.5, 0.5));
            topPos.setPosition(cc.p(45 * Defines.BASE_SCALE, this.m_selfCell.getContentSize().height /2));
            cc.DataMng.getInstance().setLastLevelTopNum(curLevelTopPos);


            var changeFlag = createNew.getPosChange();
            if (changeFlag == "up"){
                var posChangeTip = cc.Sprite.createWithSpriteFrameName("icon_up.png");
                this.m_selfCell.addChild(posChangeTip);
                posChangeTip.setPosition(cc.p(friendPhoto.getPositionX() + friendPhoto.getContentSize().width * 0.5, friendPhoto.getPositionY() - friendPhoto.getContentSize().height * 0.5));
            }
            else if (changeFlag == "down"){
                var posChangeTip = cc.Sprite.createWithSpriteFrameName("icon_down.png");
                this.m_selfCell.addChild(posChangeTip);
                posChangeTip.setPosition(cc.p(friendPhoto.getPositionX() + friendPhoto.getContentSize().width * 0.5, friendPhoto.getPositionY() - friendPhoto.getContentSize().height * 0.5));
            }
        }
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //添加背景相关的内容
        cc.log("this._addContentOfBackImage");
        this._addContentOfBackImage();

        cc.log("this._addContentOfButtons");
        //添加按钮等等
        this._addContentOfButtons();
        cc.log("this._addContentOfInviteButton");
        //添加邀请按钮
        this._addContentOfInviteButton();

        cc.log("this._addSelfScoreCell");
        //添加自己的成绩
        this._addSelfScoreCell();

        //刷新榜的内容
        this.reloadFriendsTableView();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _totalTopInfo: function(sender)
    {
        cc.log("总榜 总榜 总榜 总榜");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        //
        //var self = this;
        this._super(render);
        //isImageGetAll = [];

        this.isFresh = false;
        //
        cc.ResourceMng.getInstance().addToCache(
            Resource._GUITotalLevelTop_plist,
            Resource._GUITotalLevelTop_png);

        cc.ResourceMng.getInstance().addToCache(
            Resource._GUIFirendsScoresTop_plist,
            Resource._GUIFirendsScoresTop_png);

        this.m_GameLevelName = "LEVEL_1";
        //
        this.m_MyCellsBuilder = new TotalLevelTop_CellBuilder(
            cc.Sprite.createWithSpriteFrameName("GUITotalLevelTop_panel_02.png").getContentSize()
        );

        //
        this.updateGUI();

        //
        this._addTimerToApplyDataAgain(Defines.FPS * 60 * 10);

        /*this.getWindow().schedule(
         function(time)
         {
         if (isImageGetAll && isImageGetAll.length > 0){
         cc.log("get isImageGetAll again");
         isImageGetAll.forEach(
         function(a_topData)
         {
         if (isImageGetAllFlag[a_topData.getPlayerName()] == 1){
         a_topData.applyDataFromThird();
         }
         }
         );
         }
         },
         Defines.FPS * 1800
         );*/

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _addTimerToApplyDataAgain: function(dt)
    {
        var self = this;

        //
        cc.log("有部分数据没有申请下来 需要重新申请 添加Timer");
        this.getWindow().unscheduleAllCallbacks();
        this.getWindow().schedule(
            function()
            {
                //
                if (Object.keys(_TopApplyDataAgain).length <= 0)
                {
                    cc.log("再申请数据完成");
                    self.getWindow().unscheduleAllCallbacks();
                }
                else
                {
                    cc.log("重新申请数据__________________________________________");

                    //导出数据
                    for (var playerName in _TopApplyDataAgain)
                    {
                        if (_TopApplyDataAgain.hasOwnProperty(playerName))
                        {
                            cc.log("重新申请数据的人 ＝ " + _TopApplyDataAgain[playerName].getPlayerName());
                            _TopApplyDataAgain[playerName].applyDataFromThird();
                        }
                    }

                    cc.log("_____________________________________________________");
                }
            },
            dt
        );

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateGUI: function()
    {
        if (this.isWindowOpen())
        {
            this.getWindow().removeAllChildren(true);
            this.addContent();

            this._switchOff();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        //
        cc.AudioMng.getInstance().playCloseWindow();

        //
        this.getWindow().unscheduleAllCallbacks();
        this.getWindow().removeAllChildren(true);
        this.m_TopPlayersTableView = null;

        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUITotalLevelTop_plist,
            Resource._GUITotalLevelTop_png);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    reloadFriendsTableView: function()
    {

        //
        this.m_TopPlayersTableView = cc.TableView.create(
            this,
            cc.size(
                this.m_MyCellsBuilder.getCellSize().width,
                this.m_MyCellsBuilder.getCellSize().height * 4
            )
        );

        this.m_BackGround.addChild(this.m_TopPlayersTableView);

        //
        this.m_TopPlayersTableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.m_TopPlayersTableView.setAnchorPoint(cc.p(0, 0));
        this.m_TopPlayersTableView.setPosition(cc.p(23 * Defines.BASE_SCALE, 80 * Defines.BASE_SCALE + this.m_MyCellsBuilder.getCellSize().height ));
        this.m_TopPlayersTableView.setDelegate(this);
        this.m_TopPlayersTableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);

        //
        this.m_TopPlayersTableView.reloadData();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notifyFriendsUpdate: function(friends)
    {
        cc.log("notifyFriendsUpdate");
        if (!this.isWindowOpen() || !this.m_TopPlayersTableView)
        {
            return this;
        }

        //
        var self = this;

        cc.log("notifyFriendsUpdate friend length = " + friends.length);

        friends.forEach(
            function(a_friend)
            {
                var topIndex = self.getModel().getIndexById(a_friend.getRoleId());

                //
                self.m_TopPlayersTableView.updateCellAtIndex(topIndex);
            }
        );


        return this;
    }
});

cc.GUITotalLevelTop._instance = null;
cc.GUITotalLevelTop.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = (new cc.GUITotalLevelTop()).init();
    }


    return this._instance;
};

