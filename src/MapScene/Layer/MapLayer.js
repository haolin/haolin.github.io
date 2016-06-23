/**
 * Created by linhao on 15/11/7.
 */

var MapLayer = cc.LayerColor.extend({
    _data : null,
    _gameSceneController: null,
    _dataHandler : null,

    //UI
    _stageLayer:null,

    ctor:function () {
        this._super(cc.color(80 ,80, 80, 0), ScreenSize.width, ScreenSize.height);
        // 加载[配置]
        this.loadConfig();

        // 加载UI
        this.loadUI();

        return true;
    },
    onEnter:function () {
        this._super();

    },
    loadConfig : function(){
        this._gameSceneController = GameSceneController.getInstance();
        this._dataHandler = DataHandler.getInstance();
    },
    loadUI : function(){

        //加载UI页面
        this._stageLayer = ccs.load(res.ccs_stage_json).node;
        this.addChild(this._stageLayer);


        this._data = this._dataHandler.getChaptersData();
        var maxAvailableLevel = this._dataHandler.getMaxAvailableChapter();

        //获取button
        var button = ccui.helper.seekWidgetByName(this._stageLayer,"Button_53");
        button.setVisible(false);

        //获取listView，用来保存button
        var listView = ccui.helper.seekWidgetByName(this._stageLayer,"ListView_58");
        listView.removeAllItems();
        //循环创建button，并设置相应的点击事件
        for(var idx = 0; idx < this._data.length; idx++){
            var btn = button.clone();
            btn.setTag(1000 + idx);
            btn.setVisible(true);
            btn.setTitleText(String(idx + 1));
            listView.insertCustomItem(btn,idx);
            btn.setUserData(idx);
            btn.addTouchEventListener(this.buttonClick, this);

            if(idx > maxAvailableLevel){
                btn.setEnabled(false);
                btn._onPressStateChangedToDisabled();
            }
        }

        //coin
        var coin = new cc.Sprite("#coin.png");
        coin.setPosition( ScreenSize.width*0.03,  ScreenSize.height - 18);
        this.addChild(coin, 300);

        var coinsnum = DataHandler.getInstance().getCoinsNumber();
        var coinLabel = new cc.LabelTTF(String(coinsnum),  "GUBBLABLO", 0.03*ScreenSize.width);
        coinLabel.setPosition( ScreenSize.width*0.07, ScreenSize.height - 18);
        //this._coinLabel.setColor(cc.color.WHITE);
        coinLabel.setAnchorPoint(0, 0.5);
        coinLabel.setFontFillColor(cc.color.BLACK);
        this.addChild(coinLabel, 300);

        //修炼所
        var button = new cc.MenuItemFont("修炼所", this.allocatePoints, this);
        button.setPosition(ScreenSize.width*0.8, ScreenSize.height*0.075);
        var menu1 = new cc.Menu(button);
        menu1.setPosition(0, 0);
        this.addChild(menu1, 300);
    },
    buttonClick : function(sender,type) {
        if(type !== ccui.Widget.TOUCH_BEGAN){
            return;
        }

        var chaperIndex = sender.getUserData();
        var unlockedChapter = this._dataHandler.getUnlockedChapter();
        if(chaperIndex >  unlockedChapter){
            var heroLevel = this._dataHandler.getHeroLevel();

            var chaperData = this._dataHandler.getChapterData(chaperIndex);
            var availableLevel = parseInt(chaperData["unlock_level"]) - 1;

            if(heroLevel < availableLevel){
                var levelStr = availableLevel + 1;
                alert("需要等级"+levelStr);
                return;
            }

            var coins = this._dataHandler.getCoinsNumber();
            var cost = parseInt(chaperData["unlock_cost"]);

            if(coins < cost){
                alert("需要金币"+cost);
                return;
            }else{
                alert("解锁成功，花费金币"+cost);
                this._dataHandler.reduceCoinsNumber(cost);
                this._dataHandler.unlockChapter(chaperIndex);
            }

        }

        var delay = cc.delayTime(0.7);
        var callBack = cc.callFunc(this.startBattle, this, chaperIndex);
        this.runAction(cc.sequence((delay, callBack)));
        this.getParent().hideBambooSlip();

        return;


    },
    allocatePoints : function(sender) {
        var allocatePointsLayer = new AllocatePointsLayer();
        this.addChild(allocatePointsLayer, 1000);
    },
    startBattle:function(sender, chaperIndex){
        this._gameSceneController.loadChapter(chaperIndex);
        this._gameSceneController.setStatus(GameStatus.LoadChapter);
        //this._gameSceneController.setStatus(GameStatus.Move);
        this.removeFromParent();
    }
});