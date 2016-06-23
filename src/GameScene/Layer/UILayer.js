/**
 * Created by linhao on 15/11/7.
 */

var UILayer = cc.Layer.extend({
    _mainLayer:null,
    _gameSceneController:null,
    ctor:function () {
        this._super();
        this._gameSceneController = GameSceneController.getInstance();
        this.loadUI();
        return true;
    },
    loadUI : function(){
        var size = cc.winSize;
        this._mainLayer = ccs.load(res.ccs_ui_json).node;
        this.addChild(this._mainLayer);
        this._mainLayer.setVisible(false);

        //battle
        var battlebutton = ccui.helper.seekWidgetByName(this._mainLayer,"Button_1");
        battlebutton.addTouchEventListener(this.battleClicked,this);

        var delay = cc.delayTime(0.7);
        var callBack = cc.callFunc(this.show, this);
        this._mainLayer.runAction(cc.sequence(delay, callBack));


    },
    battleClicked:function(sender){
        var battleImage = sender.getParent();
        var top_panel = battleImage.getParent();
        var mainLayer = top_panel.getParent();
        var self = mainLayer.getParent();
        //self._gameSceneController.setStatus(GameStatus.Move);

        //获取mapLayer，并显示
        var gameScene = self.getParent();
        //gameScene.mapLayer.setVisible(true);
        var mapLayer = new MapLayer();
        gameScene.addChild(mapLayer,2);

        self.removeFromParent();
    },
    update:function(dt){

    },
    show:function(sender){

        //var fadeOut = cc.fadeOut(1.0);
        //this._mainLayer.runAction(fadeOut);
        this._mainLayer.setVisible(true);
    }
});