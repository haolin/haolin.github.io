/**
 * Created by hong.zhang on 2014/7/21.
 */

//======================================================================================================================
var GUIAchievement_CellBuilder = cc.Class.extend({

    //
    CELL_CONTENT_TAG:
    {
        ACHIEVE_NAME: 100,       //名字
        ACHIEVE_PROGRESS: 200,  //进度
        ACHIEVE_BUTTON: 300,    //领奖按钮
        ACHIEVE_PRIDE: 400,      //奖励内容
        ACHIEVE_PHASE: 500      //阶段
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(cellSize)
    {
        this.m_CellSize = cellSize || cc.size(10 * Defines.BASE_SCALE, 10 * Defines.BASE_SCALE);
    },

    //------------------------------------------------------------------------------------------------------------------
    _static: function()
    {
        return GUIAchievement_CellBuilder.prototype;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "GUIAchievement_CellBuilder";
    },

    //------------------------------------------------------------------------------------------------------------------
    getCellSize: function()
    {
        return this.m_CellSize;
    },

    //------------------------------------------------------------------------------------------------------------------
    buildCell: function(cell, idx, buttonCallBack, target)
    {
        cell.removeAllChildren(true);

        var cellWidth = this.m_CellSize.width;
        var cellHeight = this.m_CellSize.height;


        //头像
//        var spritePhoto = cc.Sprite.createWithSpriteFrameName("general_photo_frame.png");
//        cell.addChild(spritePhoto,0,this._static().CELL_CONTENT_TAG.INVITE_PHOTO);
//        spritePhoto.setAnchorPoint(cc.p(0,0.5));
//        spritePhoto.setPosition(cc.p(10*Defines.BASE_SCALE,cellHeight/2));

        //成就名字
        var nameLab = cc.LabelTTF.create("행성 돌파!!", Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        cell.addChild(nameLab, 0, this._static().CELL_CONTENT_TAG.ACHIEVE_NAME);
        nameLab.setAnchorPoint(cc.p(0, 0));
        nameLab.setPosition(cc.p(20 * Defines.BASE_SCALE, cellHeight/2));

        //阶段
        var labelPhase = cc.LabelTTF.create(Resource.KoreanTxt["achieve_phase"], Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        cell.addChild(labelPhase,0, this._static().CELL_CONTENT_TAG.ACHIEVE_PHASE);
        labelPhase.setAnchorPoint(cc.p(0, 0));
        labelPhase.setPosition(cc.p(cellWidth/2  + 15*Defines.BASE_SCALE, cellHeight/2));
        labelPhase.setColor(cc.c3b(255,255,0));

        //进度
        var labelTxt = cc.LabelTTF.create("행성 11개 타이틀 달기(3/15)", Defines.DefaultFont, 13 * Defines.BASE_SCALE);
        cell.addChild(labelTxt, 0, this._static().CELL_CONTENT_TAG.ACHIEVE_PROGRESS);
        labelTxt.setAnchorPoint(cc.p(0, 1));
        labelTxt.setPosition(cc.p(20 * Defines.BASE_SCALE, cellHeight/2 - 7 * Defines.BASE_SCALE));

        //领奖按钮
        var button = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("btn_reciver_pride_nor.png"),
            cc.Sprite.createWithSpriteFrameName("btn_reciver_pride_sel.png"),
            buttonCallBack,
            target);
        button.setScale(0.8)
        button.setTag(idx);

        //
        var menu = cc.Menu.create(button);
        cell.addChild(menu, 1000, this._static().CELL_CONTENT_TAG.ACHIEVE_BUTTON);
        menu.setPosition(cc.p(0, 0));
        button.setAnchorPoint(cc.p(1, 0.5));
        button.setPosition(cc.p(cellWidth, cellHeight/2));

        //分割线
        var spriteFenge = cc.Sprite.create(_GUIPath + "GUINewGeneral/fenge_line.png");
        cell.addChild(spriteFenge);
        spriteFenge.setAnchorPoint(cc.p(0.5,0.5));
        spriteFenge.setPosition(cc.p(cellWidth/2,cellHeight));
        spriteFenge.setScaleX(0.95);

        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    decorateCell: function(cell, idx, tInfo)
    {
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.ACHIEVE_NAME).setString(
            Achieve.AchieveName[parseInt(tInfo.type)](tInfo.curindex));

        cell.getChildByTag(this._static().CELL_CONTENT_TAG.ACHIEVE_PHASE).setString(
            Tools.sprintfs(Resource.KoreanTxt["achieve_phase"],tInfo.curindex));

        cell.getChildByTag(this._static().CELL_CONTENT_TAG.ACHIEVE_PROGRESS).setString(
            Achieve.AchieveDes[parseInt(tInfo.type)](tInfo.maxnum) + "(" + tInfo.curnum + "/" + tInfo.maxnum + ")");

        var bComplete = cc.GUIAchievementData.getInstance().ifComplete(tInfo.type);
        cc.log("achievment decoratecell, bComplete: " + bComplete);
        if(cell.getChildByTag(this._static().CELL_CONTENT_TAG.ACHIEVE_PRIDE))
        {
            cell.getChildByTag(this._static().CELL_CONTENT_TAG.ACHIEVE_PRIDE).removeFromParent(true);
        }

        if(bComplete)
        {
            cc.log("tInfo.status:" + tInfo.status);
            cc.log("parseInt(tInfo.status) == 1: " + parseInt(tInfo.status) == 1);
            cell.getChildByTag(this._static().CELL_CONTENT_TAG.ACHIEVE_BUTTON).setVisible(parseInt(tInfo.status) == 1);
        }
        else
        {
            cell.getChildByTag(this._static().CELL_CONTENT_TAG.ACHIEVE_BUTTON).setVisible(false);

            var layerItem = cc.Layer.create();
            layerItem.setPosition(cc.p(0.5,0.5));
            cell.addChild(layerItem,0, this._static().CELL_CONTENT_TAG.ACHIEVE_PRIDE);
            //创建奖励内容图片
            var spritePride = cc.Sprite.createWithSpriteFrameName(ServerItemTypes[tInfo.rewardid.toString()].SPRITESOURCE);
            spritePride.setAnchorPoint(cc.p(1, 0.5));
            spritePride.setPosition(cc.p(this.getCellSize().width, this.getCellSize().height/2));
            spritePride.setScale(tInfo.rewardid.toString() == 101 ? 0.9 : 0.55);
            layerItem.addChild(spritePride);

            var numLabel = GUI.createNumberLabel(tInfo.count,_GUIPath + "Num/num_9_20x24.png",20,24,"0");
            numLabel.setAnchorPoint(cc.p(1, 0.5));
            numLabel.setPosition(cc.p(this.getCellSize().width,20*Defines.BASE_SCALE));
            layerItem.addChild(numLabel)


        }


        //TODO 头像
        return cell;
    }

});

//======================================================================================================================
cc.GUIAchievement = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        //
        this.m_BackGround = null;
        this.m_AchieveTableView = null;
        this.m_MyCellsBuilder = null;

        //数据
        this.m_data = cc.GUIAchievementData.getInstance();


    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return cc.GUIAchievement.description();
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function ()
    {
        this._super();
        return this;
    },

    _initTestData: function()
    {

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
    tableCellTouched:function (table, cell)
    {
        cc.log("cell touched at index: " + cell.getIdx());
    },

    //------------------------------------------------------------------------------------------------------------------
    cellSizeForTable:function (/*table*/)
    {
        return this.m_MyCellsBuilder.getCellSize();
    },

    //------------------------------------------------------------------------------------------------------------------
    numberOfCellsInTableView:function (/*table*/)
    {
        var tAchieves = this.m_data.getAchieveInfo();
        var n = 0;

        for(var value in tAchieves)
        {
            ++n;
        }

        return n;

    },

    //------------------------------------------------------------------------------------------------------------------
    tableCellAtIndex:function (table, idx)
    {
        //
        var cell = table.dequeueCell();
        if (!cell)
        {
            //没有就制造新的 
            cell = new cc.TableViewCell();
        }

        this.m_MyCellsBuilder.buildCell(cell, idx, this._btnAskHeart, this);

        var data = this.m_data.getAchieveByType(idx.toString());
//        var data = null;
        if (data)
        {
            this.m_MyCellsBuilder.decorateCell(cell, idx, data);
        }

        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnAskHeart: function(sender)
    {
        cc.log("sender.getTag() = " + sender.getParent().getParent().getIdx());
        cc.AudioMng.getInstance().playButtonSound(true);

        var tAchieve = this.m_data.getAchieveByType(sender.getParent().getParent().getIdx().toString());
        sender.setVisible(false);
        var recieveAchieveRewardCallback = function(bResult, tInfo)
        {
            if(bResult)
            {
                cc.GUIAchievement.getInstance().m_data.setAchieveInfo(tInfo);
                if(cc.GUIAchievement.getInstance().isWindowOpen())
                {
                    cc.GUIAchievement.getInstance().m_AchieveTableView.reloadData();
                }

                sender.setVisible(true);

                MailMng.getInstance().loadMails();
            }
        };

        cc.NodeSelf.getInstance().asyncRecieveAchieveReward(tAchieve.type,tAchieve.curindex,recieveAchieveRewardCallback);

        tAchieve.curindex = tAchieve.curindex == tAchieve.maxindex?tAchieve.curindex:(parseInt(tAchieve.curindex) + 1).toString();
//        tAchieve.status = tAchieve.curindex == tAchieve.maxindex?0:1;
        tAchieve.status = 0;
        this.m_AchieveTableView.reloadData();

        return this;
    },



    //------------------------------------------------------------------------------------------------------------------
    addTableViewAchievement: function()
    {
        this.m_AchieveTableView = cc.TableView.create(this, cc.size(410 * Defines.BASE_SCALE, 360 * Defines.BASE_SCALE));
        this.m_AchieveTableView.setTouchPriority(cc.MENU_HANDLER_PRIORITY);
        this.m_BackGround.addChild(this.m_AchieveTableView, 1000);

        //
        this.m_AchieveTableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.m_AchieveTableView.setPosition(cc.p(25 * Defines.BASE_SCALE, 45 * Defines.BASE_SCALE));
        this.m_AchieveTableView.setDelegate(this);
        this.m_AchieveTableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.m_AchieveTableView.reloadData();

        return this;
    },


    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 100));
        this.getWindow().addChild(blockLayer, -1);

        this.m_BackGround = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back1.png");
        this.getWindow().addChild(this.m_BackGround);
        this.m_BackGround.setAnchorPoint(cc.p(0.5,0.5));
        this.m_BackGround.setPosition(cc.p(_ScreenWidth()/2,_ScreenHeight()/2));

        var nBackWidth = this.m_BackGround.getContentSize().width;
        var nBackHeight = this.m_BackGround.getContentSize().height;

        //好友的背景板
        var backCenter = cc.Scale9Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png");
        this.m_BackGround.addChild(backCenter);
        backCenter.setAnchorPoint(cc.p(0.5,1));
        backCenter.setPosition(
            cc.p(this.m_BackGround.getContentSize().width/2,
                    this.m_BackGround.getContentSize().height*0.9));
        backCenter.setPreferredSize(cc.size(this.m_BackGround.getContentSize().width*0.9,this.m_BackGround.getContentSize().height*0.85));

        //不知道是什么意思的文字
        var spriteUpTxt = cc.Sprite.createWithSpriteFrameName("label_achievement.png");
        this.m_BackGround.addChild(spriteUpTxt);
        spriteUpTxt.setPosition(cc.p(this.m_BackGround.getContentSize().width/2,
                this.m_BackGround.getContentSize().height - 25*Defines.BASE_SCALE));
//
        //
        GUI._AddCloseButton(this.m_BackGround, this.closeWindow, this);

        //
        this.addTableViewAchievement();


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addAchievementScore: function(strType,nScore)
    {
        this.m_data.addAchieveScore(strType,nScore);
        //先加数据再上传
        this.m_data.uploadAchieveScore();
    },

    addAchievementScoreWithOutUpload: function(strType,nScore)
    {
        this.m_data.addAchieveScore(strType,nScore);
    },

    setAchievementScore: function(strType,nScore)
    {
        this.m_data.setAchieveScore(strType,nScore);
        //先加数据再上传
        this.m_data.uploadAchieveScore();
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);

        cc.ResourceMng.getInstance().addToCache(
            Resource._GUITask_plist,
            Resource._GUITask_png);

        //
        cc.AudioMng.getInstance().playOpenWindow();
        this.getWindow().removeAllChildren(true);

        //
        this.m_MyCellsBuilder = new GUIAchievement_CellBuilder(cc.size(410 * Defines.BASE_SCALE, 310/4 * Defines.BASE_SCALE));
        this.addContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        cc.AudioMng.getInstance().playCloseWindow();
        this.getWindow().removeAllChildren(true);

        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUITask_plist,
            Resource._GUITask_png);


        return this;
    }
});

//======================================================================================================================
cc.GUIAchievement.description = function()
{
    return "GUIAchievement";
};

//======================================================================================================================
cc.GUIAchievement._instance = null;
cc.GUIAchievement.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIAchievement();
        this._instance.init();
    }

    return this._instance;
};


