/**
 * Created by linhao on 15/11/7.
 */

var GameOverLayer = cc.LayerColor.extend({
    _gameSceneController: null,
    ctor:function () {
        this._super(cc.color(30 ,31, 32, 255), ScreenSize.width, ScreenSize.height);
        this.loadConfig();
        this.loadUI();
        this.bindTouchListener();
        return true;
    },
    loadConfig : function() {
        this._gameSceneController = GameSceneController.getInstance();
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
        var text = new cc.LabelTTF("Retry",  "GUBBLABLO", 18);
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

        cc.director.runScene(new GameScene());
        this._gameSceneController.reset();
    }
});