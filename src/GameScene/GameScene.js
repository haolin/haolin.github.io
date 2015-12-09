

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


        //ccs.armatureDataManager.addArmatureFileInfo(res.at_dragonbone_png, res.at_dragonbone_plist, res.at_dragonbone_xml);
        //var armature = new ccs.Armature("Dragon");
        //armature.getAnimation().play("walk");
        //armature.getAnimation().setSpeedScale(30/60);
        //this.addChild(armature, 10000);
        //armature.setPosition(ScreenSize.width / 2, 0);
        //return;


        DataHandler.getInstance().reset();

        this.backgroundLayer = new BackgroundLayer();
        this.addChild(this.backgroundLayer, 0);

        this.gamePlayLayer = new GamePlayLayer();
        this.addChild(this.gamePlayLayer, 1);

        this.uiLayer = new UILayer();
        this.addChild(this.uiLayer, 2);

        this.scheduleUpdate();

        //ccs.armatureDataManager.addArmatureFileInfo
    },
    update:function(dt) {
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

