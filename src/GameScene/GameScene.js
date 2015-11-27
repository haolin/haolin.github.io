

var GameScene = cc.Scene.extend({
    backgroundLayer : null,
    gamePlayLayer : null,
    uiLayer : null,
    _gameSceneController: null,
    ctor: function () {
        this._super();
        this._gameSceneController = GameSceneController.getInstance();

    },
    onEnter:function () {
        this._super();

        DataHandler.getInstance().reset();

        this.backgroundLayer = new BackgroundLayer();
        this.addChild(this.backgroundLayer, 0);

        this.gamePlayLayer = new GamePlayLayer();
        this.addChild(this.gamePlayLayer, 1);

        this.uiLayer = new UILayer();
        this.addChild(this.uiLayer, 2);

        this.scheduleUpdate();
    },
    update:function(dt){
        if(this._gameSceneController.getStatus() === GameStatus.GameOver){
            this.unscheduleUpdate();
            return;
        }

        this.gamePlayLayer.update(dt);

        if(this._gameSceneController.getStatus() === GameStatus.Move ||
            this._gameSceneController.getStatus() === GameStatus.Battle) {
            this.backgroundLayer.updateCloud(dt);
        }

        if(this._gameSceneController.getStatus() === GameStatus.Move){
            this.backgroundLayer.update(dt);
        }

    }

});

