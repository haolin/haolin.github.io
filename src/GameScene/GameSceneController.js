

// 游戏场景管理对象，单例类
var GameSceneController = (function () {

    function _GameSceneController() {
        // 当前

        this._LevelData = null;

        this._status = GameStatus.Move;

        this._currentLevel = DATA_UNDEFINE;
        this._currentStage = DATA_UNDEFINE;
        //当前level最大stage
        this._maxStage = DATA_UNDEFINE;


        this.clear = function(){
            this._LevelData = null;
        };

        this.reset = function(){
            this.clear();
            this._status = GameStatus.Move;
            this._LevelData = null;
            this._currentLevel = DATA_UNDEFINE;
            this._currentStage = DATA_UNDEFINE;
        };
        // ==============[getter && setter]==============
        this.getGroupVector = function(){
            return this._groupVector;
        };
        this.setGroupVector = function(groupVector){
            this._groupVector = groupVector;
        };

        this.nextStage = function(groupVector){
            if(this._currentLevel === DATA_UNDEFINE && this._currentStage === DATA_UNDEFINE ){
                this._currentLevel = 0;
                this._currentStage = 0;
                this._LevelData = DataHandler.getInstance().getEnemyData(this._currentLevel);
                this._maxStage = this._LevelData["enemyIDArray"].length - 1;
            }else{
                this._currentStage ++;
                if(this._currentStage > this._maxStage){
                    this._currentStage = 0;
                    this._currentLevel++;
                    this._LevelData = DataHandler.getInstance().getEnemyData(this._currentLevel);
                    this._maxStage = this._LevelData["enemyIDArray"].length - 1;
                }
            }
        };

        this.getStatus = function(){
            return this._status;
        };
        this.setStatus = function(st){
            this._status = st;
        };

        this.getCurrentLevel = function(){
            return this._currentLevel;
        };
        this.setCurrentLevel = function(lv){
            this._currentLevel = lv;
        };
        this.getCurrentStage = function(){
            return this._currentStage;
        };
        this.setCurrentStage = function(st){
            this._currentStage = st;
        };

        //判断当前level是否还有下一stage
        this.isNextStageExist = function(){
            return (this._currentStage < this._maxStage);
        };

    }
    //实例容器
    var instance;

    var _static = {
        name: 'GameSceneController',
        //获取实例的方法
        //返回Singleton的实例
        getInstance: function () {
            if (instance === undefined) {
                instance = new _GameSceneController();
            }
            return instance;
        }
    };
    return _static;
})();
