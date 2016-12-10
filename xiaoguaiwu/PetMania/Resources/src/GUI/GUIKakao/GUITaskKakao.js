/**
 * Created by hong.zhang on 2014/7/21.
 */

//======================================================================================================================
var GUITaskKakao_CellBuilder = cc.Class.extend({

    //
    CELL_CONTENT_TAG:
    {
        TASK_INTRO: 100,     //描述
        TASK_PROGRESS: 200,  //进度
        TASK_BUTTON: 300,    //领奖按钮
        TASK_PRIDE: 400,      //奖励内容
        TASK_PRIDED: 500      //已经领奖
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(cellSize)
    {
        this.m_CellSize = cellSize || cc.size(10 * Defines.BASE_SCALE, 10 * Defines.BASE_SCALE);
    },

    //------------------------------------------------------------------------------------------------------------------
    _static: function()
    {
        return GUITaskKakao_CellBuilder.prototype;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "GUITaskKakao_CellBuilder";
    },

    //------------------------------------------------------------------------------------------------------------------
    getCellSize: function()
    {
        return this.m_CellSize;
    },

    //------------------------------------------------------------------------------------------------------------------
    buildCell: function(cell, idx, buttonCallBack, target)
    {
        cc.log("GUITaskKakao, buildCell");
        cell.removeAllChildren(true);

        var cellWidth = this.m_CellSize.width;
        var cellHeight = this.m_CellSize.height;


        //头像
//        var spritePhoto = cc.Sprite.createWithSpriteFrameName("general_photo_frame.png");
//        cell.addChild(spritePhoto,0,this._static().CELL_CONTENT_TAG.INVITE_PHOTO);
//        spritePhoto.setAnchorPoint(cc.p(0,0.5));
//        spritePhoto.setPosition(cc.p(10*Defines.BASE_SCALE,cellHeight/2));

        //任务描述
        var nameLab = cc.LabelTTF.create("Stage Clear 3회", Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        cell.addChild(nameLab, 0, this._static().CELL_CONTENT_TAG.TASK_INTRO);
        nameLab.setAnchorPoint(cc.p(0, 0));
        nameLab.setPosition(cc.p(20 * Defines.BASE_SCALE, cellHeight/2));

        //进度
        var labelTxt = cc.LabelTTF.create(Resource.KoreanTxt["task_progress"], Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        cell.addChild(labelTxt);
        labelTxt.setAnchorPoint(cc.p(0, 1));
        labelTxt.setPosition(cc.p(20 * Defines.BASE_SCALE, cellHeight/2 - 7 * Defines.BASE_SCALE));

        var labelProgres = cc.LabelTTF.create("1000 / 2000", Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        cell.addChild(labelProgres, 0, this._static().CELL_CONTENT_TAG.TASK_PROGRESS);
        labelProgres.setAnchorPoint(cc.p(0, 1));
        labelProgres.setPosition(cc.p(90 * Defines.BASE_SCALE, cellHeight/2 - 7 * Defines.BASE_SCALE));

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
        cell.addChild(menu, 1000, this._static().CELL_CONTENT_TAG.TASK_BUTTON);
        menu.setPosition(cc.p(0, 0));
        button.setAnchorPoint(cc.p(1, 0.5));
        button.setPosition(cc.p(cellWidth, cellHeight/2));

        //已领奖
//        cc.log("pride1111");
        var labelPrided = cc.LabelTTF.create(Resource.KoreanTxt["task_prided"],Defines.DefaultFont,28*Defines.BASE_SCALE);
//        cc.log("pride2222");
        labelPrided.setAnchorPoint(cc.p(1,0.5));
//        cc.log("pride3333");
        labelPrided.setPosition(cc.p(cellWidth - 10*Defines.BASE_SCALE, cellHeight/2));
//        cc.log("pride4444");
        cell.addChild(labelPrided, 1000, this._static().CELL_CONTENT_TAG.TASK_PRIDED);
        cc.log("labelPrided");
        //分割线
        var spriteFenge = cc.Sprite.create(_GUIPath + "GUINewGeneral/fenge_line.png");
        cell.addChild(spriteFenge);
        spriteFenge.setAnchorPoint(cc.p(0.5,0.5));
        spriteFenge.setPosition(cc.p(cellWidth/2,cellHeight));
        spriteFenge.setScaleX(0.95);

        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    decorateCell: function(cell, idx, taskInfo)
    {
        cc.log("GUITaskKakao, decorateCell");
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.TASK_INTRO).setString(
            Tools.sprintfs(Resource.KoreanTxt[parseInt(taskInfo.content)],taskInfo.finishcount));
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.TASK_PROGRESS).setString(taskInfo.finishNum + " / " + taskInfo.finishcount);

        var bComplete = cc.GUITaskKakaoData.getInstance().ifTaskComplete(taskInfo.id);

        if(cell.getChildByTag(this._static().CELL_CONTENT_TAG.TASK_PRIDE))
        {
            cell.getChildByTag(this._static().CELL_CONTENT_TAG.TASK_PRIDE).removeFromParent(true);
        }

        cc.log("bComplete");
        if(bComplete)
        {
            cell.getChildByTag(this._static().CELL_CONTENT_TAG.TASK_BUTTON).setVisible(parseInt(taskInfo.recvReward) == 0);
            cell.getChildByTag(this._static().CELL_CONTENT_TAG.TASK_PRIDED).setVisible(!(parseInt(taskInfo.recvReward) == 0));
        }
        else
        {
            cell.getChildByTag(this._static().CELL_CONTENT_TAG.TASK_BUTTON).setVisible(false);
            cell.getChildByTag(this._static().CELL_CONTENT_TAG.TASK_PRIDED).setVisible(false);

            var layerItem = cc.Layer.create();
            layerItem.setPosition(cc.p(0.5,0.5));
            cell.addChild(layerItem,0, this._static().CELL_CONTENT_TAG.TASK_PRIDE);
            //创建奖励内容图片
            var spritePride = cc.Sprite.createWithSpriteFrameName(ServerItemTypes[taskInfo.rewardid.toString()].SPRITESOURCE);
            spritePride.setAnchorPoint(cc.p(1, 0.5));
            spritePride.setPosition(cc.p(this.getCellSize().width, this.getCellSize().height/2));
            spritePride.setScale(taskInfo.rewardid.toString() == 101 ? 0.9 : 0.55);
            layerItem.addChild(spritePride);

            var numLabel = GUI.createNumberLabel(taskInfo.count,_GUIPath + "Num/num_9_20x24.png",20,24,"0");
            numLabel.setAnchorPoint(cc.p(1, 0.5));
            numLabel.setPosition(cc.p(this.getCellSize().width,20*Defines.BASE_SCALE));
            layerItem.addChild(numLabel)


        }
        cc.log("return cell");


        //TODO 头像
        return cell;
    }

});

//======================================================================================================================
cc.GUITaskKakao = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        //
        this.m_BackGround = null;
        this.m_DailyTableView = null;
        this.m_WeekendTableView = null;
        this.m_MyCellsBuilder = null;

        this.m_buttonDaily = null;
        this.m_spriteDaily = null;
        this.m_buttonWeekend = null;
        this.m_spriteWeekend = null;

        this.m_nPanelType = null;

        this.m_data = cc.GUITaskKakaoData.getInstance();

        //数据
//        this.m_data = cc.GUITaskData.getInstance();

    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return cc.GUITaskKakao.description();
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
//        return FriendsMng.getInstance().getFriendsInContactList().length;

        var arrTask = cc.GUITaskKakao.getInstance().m_nPanelType == cc.GUITaskKakao.PanelType.TYPE_DAILY?
            cc.GUITaskKakao.getInstance().m_data.getDailyTask():
            cc.GUITaskKakao.getInstance().m_data.getWeekendTask();

        return arrTask.length;
//        return 10;
//        return this.m_data.getFriendsInfo().length;
    },

    //------------------------------------------------------------------------------------------------------------------
    tableCellAtIndex:function (table, idx)
    {
        //
        cc.log("GUITaskKakao, tableCellAtIndex");
        var cell = table.dequeueCell();
        if (!cell)
        {
            //没有就制造新的 
            cell = new cc.TableViewCell();
        }

        this.m_MyCellsBuilder.buildCell(cell, idx, this._btnAskHeart, this);


        var arrTask = cc.GUITaskKakao.getInstance().m_nPanelType == cc.GUITaskKakao.PanelType.TYPE_DAILY?
            cc.GUITaskKakao.getInstance().m_data.getDailyTask():
            cc.GUITaskKakao.getInstance().m_data.getWeekendTask();

        var data = arrTask[idx];
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
        var tTasks = cc.GUITaskKakao.getInstance().m_nPanelType == cc.GUITaskKakao.PanelType.TYPE_DAILY?
            cc.GUITaskKakao.getInstance().m_data.getDailyTask():
            cc.GUITaskKakao.getInstance().m_data.getWeekendTask();


        var task = tTasks[sender.getParent().getParent().getIdx()];

        cc.NodeSelf.getInstance().asyncRecvMissionReward(cc.GUITaskKakao.getInstance().m_nPanelType,task.id,function(){
            MailMng.getInstance().loadMails();
        });

        task.recvReward = 1;
        this.m_DailyTableView.reloadData();
        this.m_WeekendTableView.reloadData();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addTableViewDaily: function()
    {
        this.m_DailyTableView = cc.TableView.create(this, cc.size(410 * Defines.BASE_SCALE, 310 * Defines.BASE_SCALE));
        this.m_DailyTableView.setTouchPriority(cc.MENU_HANDLER_PRIORITY);
        this.m_BackGround.addChild(this.m_DailyTableView, 1000);

        //
        this.m_DailyTableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.m_DailyTableView.setPosition(cc.p(25 * Defines.BASE_SCALE, 45 * Defines.BASE_SCALE));
        this.m_DailyTableView.setDelegate(this);
        this.m_DailyTableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
//        this.m_DailyTableView.reloadData();

        return this;
    },

    addTableViewWeekend: function()
    {
        this.m_WeekendTableView = cc.TableView.create(this, cc.size(410 * Defines.BASE_SCALE, 310 * Defines.BASE_SCALE));
        this.m_WeekendTableView.setTouchPriority(cc.MENU_HANDLER_PRIORITY);
        this.m_BackGround.addChild(this.m_WeekendTableView, 1000);

        //
        this.m_WeekendTableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.m_WeekendTableView.setPosition(cc.p(25 * Defines.BASE_SCALE, 45 * Defines.BASE_SCALE));
        this.m_WeekendTableView.setDelegate(this);
        this.m_WeekendTableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
//        this.m_DailyTableView.reloadData();

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
        var backCenter = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back12.png");
        this.m_BackGround.addChild(backCenter);
        backCenter.setAnchorPoint(cc.p(0.5,1));
        backCenter.setPosition(
            cc.p(this.m_BackGround.getContentSize().width/2,
                    this.m_BackGround.getContentSize().height*0.8));

        //不知道是什么意思的文字
        var spriteUpTxt = cc.Sprite.createWithSpriteFrameName("label_task.png");
        this.m_BackGround.addChild(spriteUpTxt);
        spriteUpTxt.setPosition(cc.p(this.m_BackGround.getContentSize().width/2,
                this.m_BackGround.getContentSize().height - 25*Defines.BASE_SCALE));

//        //按钮
        this.m_buttonDaily = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("btn_weekend_task_nor.png"),
            cc.Sprite.createWithSpriteFrameName("btn_weekend_task_nor.png"),
            this._btnDaily,this);
        this.m_buttonDaily.setPosition(cc.p(nBackWidth*0.2,nBackHeight*0.8 - 3*Defines.BASE_SCALE));
        this.m_buttonDaily.setAnchorPoint(cc.p(0.5,0));
//        this.m_buttonDaily.setVisible(false);

        this.m_spriteDaily = cc.Sprite.createWithSpriteFrameName("btn_weekend_task_sel.png");
        this.m_spriteDaily.setAnchorPoint(cc.p(0.5,0));
        this.m_spriteDaily.setPosition(cc.p(nBackWidth*0.2,nBackHeight*0.8 - 8*Defines.BASE_SCALE));
        this.m_BackGround.addChild(this.m_spriteDaily);


        this.m_buttonWeekend = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("btn_daily_task_nor.png"),
            cc.Sprite.createWithSpriteFrameName("btn_daily_task_nor.png"),
            this._btnWeekend,this);
        this.m_buttonWeekend.setPosition(cc.p(nBackWidth*0.45,nBackHeight*0.8 - 3*Defines.BASE_SCALE));
        this.m_buttonWeekend.setAnchorPoint(cc.p(0.5,0));

        this.m_spriteWeekend = cc.Sprite.createWithSpriteFrameName("btn_daily_task_sel.png");
        this.m_spriteWeekend.setAnchorPoint(cc.p(0.5,0));
        this.m_spriteWeekend.setPosition(cc.p(nBackWidth*0.45,nBackHeight*0.8 - 8*Defines.BASE_SCALE));
        this.m_BackGround.addChild(this.m_spriteWeekend);


        var menuButton = cc.Menu.create(this.m_buttonDaily,this.m_buttonWeekend);
        menuButton.setPosition(cc.p(0,0));
        this.m_BackGround.addChild(menuButton);

        //
        GUI._AddCloseButton(this.m_BackGround, this.closeWindow, this);

        //
        this.addTableViewDaily();
        this.addTableViewWeekend();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnDaily: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        this._switchPanel(cc.GUITaskKakao.PanelType.TYPE_DAILY);
    },

    _btnWeekend: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        this._switchPanel(cc.GUITaskKakao.PanelType.TYPE_WEEKEND);
    },

    _switchPanel: function( nType )
    {
        this.m_nPanelType = nType;

        var TYPE_DAILY = cc.GUITaskKakao.PanelType.TYPE_DAILY;
        var TYPE_WEEKEND = cc.GUITaskKakao.PanelType.TYPE_WEEKEND;

        this.m_buttonDaily.setVisible(!(nType == TYPE_DAILY));
        this.m_spriteDaily.setVisible(nType == TYPE_DAILY);
        this.m_buttonWeekend.setVisible(!(nType == TYPE_WEEKEND));
        this.m_spriteWeekend.setVisible(nType == TYPE_WEEKEND);

        this.m_DailyTableView.setVisible(nType == TYPE_DAILY);
        this.m_WeekendTableView.setVisible(nType == TYPE_WEEKEND);

        if(TYPE_DAILY == nType)
        {
            this.m_DailyTableView.reloadData();
        }
        else if(TYPE_WEEKEND == nType)
        {
            this.m_WeekendTableView.reloadData();
        }
    },

    //------------------------------------------------------------------------------------------------------------------
    addTaskScore: function(strID,nScore)
    {
        this.m_data.addDailyTaskScore(strID,nScore);
        this.m_data.addWeekendTaskScore(strID,nScore);
        //先加数据再上传
        this.m_data.uploadTaskScore();
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
        this.m_MyCellsBuilder = new GUITaskKakao_CellBuilder(cc.size(410 * Defines.BASE_SCALE, 310/4 * Defines.BASE_SCALE));
        this.addContent();

        this._switchPanel(cc.GUITaskKakao.PanelType.TYPE_DAILY);

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
cc.GUITaskKakao.description = function()
{
    return "GUITaskKakao";
};

//======================================================================================================================
cc.GUITaskKakao._instance = null;
cc.GUITaskKakao.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUITaskKakao();
        this._instance.init();
    }

    return this._instance;
};

cc.GUITaskKakao.PanelType = {
    TYPE_DAILY: Task.TaskType.TYPE_DAILY,
    TYPE_WEEKEND: Task.TaskType.TYPE_WEEKEND
};

