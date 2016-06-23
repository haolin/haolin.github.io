/**
 * Created by linhao on 15/11/7.
 */

var GameOverLayer = cc.LayerColor.extend({
    _gameSceneController: null,
    _dataHandler: null,
    ctor:function () {
        this._super(cc.color(30 ,31, 32, 255), ScreenSize.width, ScreenSize.height);
        this.loadConfig();
        this.loadUI();
        this.bindTouchListener();
        return true;
    },
    loadConfig : function() {
        this._gameSceneController = GameSceneController.getInstance();
        this._dataHandler = DataHandler.getInstance();
    },
    bindTouchListener : function(){
        var listener = cc.EventListener.create({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,
            target          : this,
            swallowTouches  : true,
            onTouchBegan    : this.onTouchBegan,
            onTouchMoved    : this.onTouchMoved,
            onTouchEnded    : this.onTouchEnded
        });
        cc.eventManager.addListener(listener, this);
    },
    loadUI : function(){
        var retryButton = new cc.MenuItemImage("#resumeBTN.png","#resumeBTN.png","#resumeBTN.png", this.retry, this);
        var text = new cc.LabelTTF(DataHandler.getInstance().getTextByKey("str_game_retry"),  "GUBBLABLO", 0.03*ScreenSize.width);
        text.setPosition(retryButton.getContentSize().width/2, retryButton.getContentSize().height/2);
        retryButton.addChild(text);

        var menu = new cc.Menu(retryButton);
        menu.setPosition(ScreenSize.width/2, ScreenSize.height/4);
        this.addChild(menu);


    },
    update:function(dt){

    },
    // 事件[触摸开始]
    onTouchBegan: function (touch, event) {
        return true;
    },
    // 事件[触摸移动]
    onTouchMoved: function (touch, event) {
    },
    // 事件[触摸结束]
    onTouchEnded: function (touch, event) {
    },
    retry: function (sender) {
        cc.log("Button Clicked " + sender);


        var maxHP = this._dataHandler.getMaxHP();
        this._dataHandler.setCurrentHP(maxHP);

        //var level = this._gameSceneController.getCurrentLevel();
        //this._gameSceneController.loadLevel(level);
        //this._gameSceneController.setStatus(GameStatus.LoadLevel);

        this._gameSceneController.reset();

        cc.director.runScene(new GameScene());
    }
});