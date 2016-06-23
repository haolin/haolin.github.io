/**
 * Created by liji.liu on 2016/3/8.
 */
var LevelCompleteLayer = cc.Layer.extend({
    _gameSceneController: null,
    _dataHandler: null,
    _hero: null,
    _target: null,
    _bg: null,
    _coinReward: 0,
    _expReward: 0,
    _comboPoint:0,
    ctor:function(hero,target){
        this._super();
        this._hero = hero;
        this._target = target;
        this.loadConfig();
        this.loadUI();
        this.bindTouchListener();
        return true;
    },
    loadConfig:function(){
        this._gameSceneController = GameSceneController.getInstance();
        this._dataHandler = DataHandler.getInstance();
    },
    loadUI:function(){
        var passLayer = ccs.load(res.ccs_pass_json).node;
        this.addChild(passLayer);
        //点击后，让页面消失
        var root_panel = ccui.helper.seekWidgetByName(passLayer,"root_panel");
        root_panel.addTouchEventListener(this.rootPanelClicked,root_panel);

        var chapter = this._gameSceneController.getCurrentChapter();
        var level = this._gameSceneController.getCurrentLevel();
        this._coinReward = this._dataHandler.getGoldRewardByChapter(chapter);
        this._dataHandler.addCoinsNumber(this._coinReward);

        this._expReward = this._dataHandler.getExpRewardByChapter(chapter);
        if (!this._gameSceneController.isChestStage()){
            this._expReward += this._dataHandler.getExpRewardByEnemy(level);
        }
        this._dataHandler.addExpNumber(this._expReward);

        //exp
        var expLabel = ccui.helper.seekWidgetByName(passLayer,"atlas_exp");
        expLabel.setString(String(this._expReward));

        //coin
        var coinLabel = ccui.helper.seekWidgetByName(passLayer,"atlas_exp_0");
        coinLabel.setString(String(this._coinReward));

        //钢材
        var ironLabel = ccui.helper.seekWidgetByName(passLayer,"atlas_exp_1");

        //连击
        this._comboPoint = this._gameSceneController.getComboPoint();
        var comboLabel = ccui.helper.seekWidgetByName(passLayer,"atlas_exp_2");
        comboLabel.setString(String(this._comboPoint));

        //所有label的值设置完成之后，刷新ＵＩ界面
        this._target.updateUI();


    },
    rootPanelClicked:function(sender){
        var pass = sender.getParent();
        var target = pass.getParent();
        target.remove();
    },
    remove:function(){
        this.addMapLayer();
        this._dataHandler.saveDataIfNeeded();
        this.removeFromParent(true);
    },
    addMapLayer:function(){
        var mapLayer = new MapLayer();
        this.getParent().getParent().addChild(mapLayer,1000);
        this.getParent().getParent().showBambooSlip();
    },
    bindTouchListener:function(){
        var listener = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            target:this,
            swallowTouches:true,
            onTouchBegan:this.onTouchBegan,
            onTouchMoved:this.onTouchMoved,
            onTouchEnded:this.onTouchEnded,
        });
    },
    onTouchBegan:function(touch, event){
        return false;
    },
    onTouchMoved:function(touch, event){
        var pos = touch.getLocation();
        var target = event.getCurrentTarget();
        if(target === this ){
            console.log("touched");
            this.removeFromParent(true);
        }
    },
    onTouchEnded:function(touch, event){
        var pos = touch.getLocation();
        var target = event.getCurrentTarget();
        if(target === this ){
            console.log("touched");
            this.removeFromParent(true);
        }
    }
});


