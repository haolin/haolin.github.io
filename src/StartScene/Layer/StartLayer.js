/**
 * Created by linhao on 15/12/11.
 */

var StartLayer = cc.LayerColor.extend({
    ctor:function () {
        this._super(cc.color(0 ,0, 0, 255), ScreenSize.width, ScreenSize.height);
        // 加载UI
        this.loadUI();
        return true;
    },
    loadUI : function(){

        var dataHandler = DataHandler.getInstance();

        var button1 = util.createButtonWithFontName("#rewardBTN.png",dataHandler.getTextByKey("str_game_s"),"Arial", this, this.storyMode);
        var button2 = util.createButtonWithFontName("#rewardBTN.png",dataHandler.getTextByKey("tr_game_g"),"Arial", this, this.battleMode);

        var menu = new cc.Menu(button1, button2);
        menu.alignItemsVerticallyWithPadding(ScreenSize.height/8);
        this.addChild(menu);

    },
    onEnter:function () {
        this._super();

    },
    storyMode: function (sender) {
        cc.director.runScene(new GameScene());
    },
    battleMode: function (sender) {

    }
});