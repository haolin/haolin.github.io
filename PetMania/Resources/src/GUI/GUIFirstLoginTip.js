//----------------------------------------------------------------------------------------------------------------------
var GUIFirstLoginTip_CellBuilder = cc.Class.extend({

    //
    CELL_CONTENT_TAG:
    {
        CONTENT_TIP: 999      //文字
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(cellSize)
    {
        this.m_CellSize = cellSize || cc.size(10 * Defines.BASE_SCALE, 10 * Defines.BASE_SCALE);

        this.m_idx = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    _static: function()
    {
        return  GUIFirstLoginTip_CellBuilder.prototype;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return " GUIFirstLoginTip_CellBuilder";
    },

    //------------------------------------------------------------------------------------------------------------------
    getCellSize: function()
    {
        return this.m_CellSize;
    },

    //------------------------------------------------------------------------------------------------------------------
    buildCell: function(cell, idx)
    {
        var self = this;
        cell.removeAllChildren(true);

        this.m_idx =idx;

        //文字
        var hisName = cc.LabelTTF.create("名字名字名字", Defines.DefaultFont, 14 * Defines.BASE_SCALE);
        cell.addChild(hisName, 0, this._static().CELL_CONTENT_TAG.CONTENT_TIP);
        hisName.setAnchorPoint(cc.p(0, 0));
        hisName.setPosition(cc.p( 10 * Defines.BASE_SCALE, 10 * Defines.BASE_SCALE));//this.getCellSize().height/ 2));//73 * Defines.BASE_SCALE));
        hisName.setHorizontalAlignment(0);
        return cell;
    },

    //------------------------------------------------------------------------------------------------------------------
    decorateCell: function(cell, idx, friendInfo)
    {
        //文字
        cell.getChildByTag(this._static().CELL_CONTENT_TAG.CONTENT_TIP).setString(friendInfo);//cc.GUIFirstLoginTip.getInstance().autoChangeLength(friendInfo));

        return cell;
    }

});

cc.GUIFirstLoginTip = cc.GUIWindow.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function ()
    {
        this._super();
        this.m_showNum = 0;
        this.m_MainUI = null;
        this.m_ButtonClose = null;

        this.m_FriendTableView = null;
        this.m_FriendsInfosByScoreTop = [];
        this.m_MapFriendRoleIdToPos = {};
        this.m_MapFriendRoleIdToSelect = {};
        this.m_MyCellsBuilder = null;
        this.btn_Send = null;
        this.btn_Send_grey = null;

        this.have_send_friend = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    description : function ()
    {
        return  "GUIFirstLoginTip";
    },

    //------------------------------------------------------------------------------------------------------------------
    init : function ()
    {
        this._super();

        //
        var self = this;
        this.getWindow().onTouchBegan = function(touch, event)
        {
            return self.handleTouchBegan(touch, event);
        };
//
        this.getWindow().onTouchMoved = function(touch, event)
        {
            return self.handleTouchMoved(touch, event);
        };

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent : function ()
    {
        // 使用九宫格方式创建面板
        var srcSprite = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png");
        var srcSize = srcSprite.getContentSize();

        var targetSize = cc.size(_ScreenWidth() * 0.92, _ScreenHeight() * 0.82);
        var panel = cc.Scale9Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png",
            cc.rect(0, 0, srcSize.width, srcSize.height),
            cc.rect(srcSize.width * 0.3, srcSize.height * 0.3, srcSize.width * 0.4, srcSize.height * 0.4));

        //
        panel.setPreferredSize(targetSize);
        panel.setAnchorPoint(cc.p(0.5, 0.5));
        panel.setPosition(cc.p(_ScreenWidth()/2, _ScreenHeight()/2));
        this.getWindow().addChild(panel);
        //
//        var labelText = cc.LabelTTF.create(Resource.ChineseTxt["first_tip_full"], Defines.DefaultFont, 10 * Defines.BASE_SCALE);
////        this.getWindow().addChild(labelText);
//        labelText.setPosition(cc.p(targetSize.width * 0.5, targetSize.width * 0.5));
//        labelText.setAnchorPoint(cc.p(0.5, 0.5));
//        //
        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(
            cc.p(targetSize.width - 15 * Defines.BASE_SCALE, targetSize.height - 15 * Defines.BASE_SCALE));

        var toNewMenu = cc.Menu.create(buttonClose);
        toNewMenu.setPosition(cc.p(0, 0));
        panel.addChild(toNewMenu);

//        var tabLayer = cc.Layer.create();
////
//        tabLayer.addChild(labelText);
//        this.scrollView = cc.ScrollView.create(targetSize, tabLayer);
//        this.scrollView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
////        this.scrollView.setContentSize(targetSize);
//        this.scrollView.setTouchEnabled(true);
//        this.getWindow().addChild(this.scrollView);

//        this.m_textScrollView = cc.ScrollView.create(this, cc.size(410 * Defines.BASE_SCALE, 360 * Defines.BASE_SCALE));
////        this.m_AchieveTableView.setTouchPriority(cc.MENU_HANDLER_PRIORITY);
//        this.getWindow().addChild(this.m_textScrollView, 1000);

//        //
//        this.m_AchieveTableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
//        this.m_AchieveTableView.setPosition(cc.p(25 * Defines.BASE_SCALE, 45 * Defines.BASE_SCALE));
//        this.m_AchieveTableView.setDelegate(this);
//        this.m_AchieveTableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
//        this.m_AchieveTableView.reloadData();


        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback: function()
    {
        if (!this.isWindowOpen())
        {
            return this;
        }

        //
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        this.closeWindow();

        return this;
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
    handleTouchBegan: function(/*touch, event*/)
    {
//        if (this.isWindowOpen())
//        {
//            this.closeWindow();
//        }

        return true;
    },

    handleTouchMoved: function(/*touch, event*/)
    {
        cc.log("handleTouchMoved");
        var pp_v = this.scrollView.getContentOffset();
        this.scrollView.setContentOffset(cc.p(pp_v.x, pp_v.y + 10 *Defines.BASE_SCALE));

//        if (this.isWindowOpen())
//        {
//            this.closeWindow();
//        }

        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    reloadFriendsDatas: function()
    {
        var self = this;

        this.m_FriendsInfosByScoreTop = FriendsMng.getInstance().getFriendsInfos().concat();

        //
        this.m_MapFriendRoleIdToPos = {};

        //
//        //按着分数大小排列
//        this.m_FriendsInfosByScoreTop.sort(
//            function(left, right)
//            {
//                var leftScore = left.getGameLevelScore(self.getCurGameLevel());
//                var rightScore = right.getGameLevelScore(self.getCurGameLevel());
//                return leftScore > rightScore ? -1 : 1;
//            }
//        );

        //
        this.m_FriendsInfosByScoreTop.forEach(
            function(a_friend, index)
            {
                self.m_MapFriendRoleIdToPos[a_friend.getRoleId()] = index;
            }
        );

        //
        return this;
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
//        return 3;
        return this.m_FriendsInfosByScoreTop.length;
    },
    //------------------------------------------------------------------------------------------------------------------
    tableCellAtIndex:function (table, idx)
    {
        //
        var cell = table.dequeueCell();
        if (!cell)
        {
            cell = new cc.TableViewCell();
        }

        //
        this.m_MyCellsBuilder.buildCell(cell, idx);

        //
        var friendInfo = this.m_FriendsInfosByScoreTop[idx];
        if (!friendInfo)
        {
            //cc.log("没有好友信息? = " + idx);
            return cell;
        }

        //
        this.m_MyCellsBuilder.decorateCell(cell, idx, friendInfo);

        return cell;
    },

    autoChangeLength : function(str)
    {
        var len = str.length;

        var length = 80;

        var eachLength = 0;

        var targetStr = "";
        for (var i = 0; i < len; i++) {
            var curChar = str.charAt(i);

            if (curChar == "\n"){
                eachLength = 0;
            }
            else {
                if (eachLength + 1 > length){
                    targetStr +="\n";
                    eachLength = 1;
                }
                else {
                    eachLength ++;
                }
            }
            targetStr += curChar;
//            if (charCode >= 0 && charCode <= 128) realLength += 1;
//            else realLength += 2;
//            if (realLength > length){
//                return i;
//            }
        }
        return targetStr;
    },

    resetFriendsInfos : function(eachLine){
        var nextStr = "";
        var curStr = "";
        for (var i = 0; i < this.m_FriendsInfosByScoreTop.length; i++){
            var str = this.m_FriendsInfosByScoreTop[i];
            var curText = nextStr + this.autoChangeLength(str);
            nextStr = "";
            var curLen = curText.length;
            var curLine = 0;
            for (var j= 0; j < curLen; j++){
              var curChar = curText.charAt(j);
              if (curChar == "\n"){
                  curLine ++;
              }
              if (curLine < eachLine){
                  curStr += curChar;
              }
              else {
                  nextStr += curChar;
              }
            }

            this.m_FriendsInfosByScoreTop[i] = curStr;

            curStr = "";
        }

        var nextLength = this.m_FriendsInfosByScoreTop.length;

        cc.log("nextStr = " + nextStr);

        while  (nextStr != ""){
            var curText = nextStr;
            nextStr = "";
            var curLen = curText.length;
            var curLine = 0;
            for (var j= 0; j < curLen; j++){
                var curChar = curText.charAt(j);
                if (curChar == "\n"){
                    curLine ++;
                }
                if (curLine < eachLine){
                    curStr += curChar;
                }
                else {
                    nextStr += curChar;
                }
            }
            this.m_FriendsInfosByScoreTop[nextLength] = curStr;
            curStr = "";
            nextLength ++;
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    reloadFriendsDatas: function()
    {
        var self = this;
        if (this.m_showNum == 2){
            this.m_FriendsInfosByScoreTop = [
                Resource.KoreanTxt["first_tip_full"],
                Resource.KoreanTxt["first_tip_full_1"],
                Resource.KoreanTxt["first_tip_full_2"],
                Resource.KoreanTxt["first_tip_full_3"],
                Resource.KoreanTxt["first_tip_full_4"]
//                Resource.KoreanTxt["first_tip_full_5"]
            ];
        }
        else if (this.m_showNum == 1){
            this.m_FriendsInfosByScoreTop = [
                Resource.KoreanTxt["second_tip_full_1"],
                Resource.KoreanTxt["second_tip_full_2"],
                Resource.KoreanTxt["second_tip_full_3"],
                Resource.KoreanTxt["second_tip_full_4"],
                Resource.KoreanTxt["second_tip_full_5"],
                Resource.KoreanTxt["second_tip_full_6"],
                Resource.KoreanTxt["second_tip_full_7"],
                Resource.KoreanTxt["second_tip_full_8"]
            ];
        }

        var screenLine = 30;
        if (Defines._NeedFitIpad()){
            screenLine =  40;
        }//

        if(Defines.OS.isAndroid() || isHtml5)
        {
            screenLine =  20;
        }

        this.resetFriendsInfos(screenLine);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    reloadFriendsTableView: function()
    {
        //
        this.reloadFriendsDatas();

        //
        this.m_FriendTableView = cc.TableView.create(
            this,
            cc.size(
                _ScreenWidth() * 0.9,
                this.m_MyCellsBuilder.getCellSize().height
            )
        );

        this.getWindow().addChild(this.m_FriendTableView);

        //
        this.m_FriendTableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.m_FriendTableView.setAnchorPoint(cc.p(0, 0));
        this.m_FriendTableView.setPosition(cc.p(50 * Defines.BASE_SCALE, 78 * Defines.BASE_SCALE));
        this.m_FriendTableView.setDelegate(this);
        this.m_FriendTableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);

        //
        this.m_FriendTableView.reloadData();
        this.m_FriendTableView.setTouchEnabled(true);

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    openWindow : function (render, showNum)
    {
        this._super(render);

        this.m_showNum = showNum;
        this.addContent();

        this.m_MyCellsBuilder = new GUIFirstLoginTip_CellBuilder(
            cc.size(_ScreenWidth() * 0.9, _ScreenHeight() * 0.78)
        );

        this.reloadFriendsTableView();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow : function ()
    {
        this._super();
        this.getWindow().removeAllChildren(true);
        this.m_FriendTableView = null;
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});


cc.GUIFirstLoginTip._instance = null;
cc.GUIFirstLoginTip.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIFirstLoginTip();
        this._instance.init();
    }

    return this._instance;
};