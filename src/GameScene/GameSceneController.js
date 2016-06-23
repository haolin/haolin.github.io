

// 游戏场景管理对象，单例类
var GameSceneController = (function () {

    function _GameSceneController() {
        // 当前

        this._LevelData = null;
        this._chapterData = null;
        //当前章节的所有关卡
        this._currentLevels = null;

        this._status = GameStatus.GameStart;
        this._battleType = BattleType.Normal;
        this._haveChestStage = false;
        this._chestId = "0";

        this._currentChapter = DATA_UNDEFINE;
        this._currentLevel = DATA_UNDEFINE;
        this._currentStage = DATA_UNDEFINE;
        //当前level最大stage
        this._maxStage = DATA_UNDEFINE;
        //当前chapter的Level数量
        this._levelIndex = 0;
        this._levelCount = 0;

        //记录每大关获得的combo值，过关时进行结算
        this._comboPoint = 0;

        this.clear = function(){
            this._LevelData = null;
            this._chapterData = null;
        };

        this.reset = function(){
            this.clear();
            this._status = GameStatus.Move;
            this._LevelData = null;
            this._chapterData = null;
            this._currentChapter = DATA_UNDEFINE;
            this._currentLevel = DATA_UNDEFINE;
            this._currentStage = DATA_UNDEFINE;
            this._comboPoint = 0;
            this._levelIndex = 0;
            this._levelCount = 0;
        };
        // ==============[getter && setter]==============
        this.getGroupVector = function(){
            return this._groupVector;
        };
        this.setGroupVector = function(groupVector){
            this._groupVector = groupVector;
        };

        this.nextStage = function(){
            if( this._currentChapter === DATA_UNDEFINE &&
                this._currentLevel === DATA_UNDEFINE &&
                this._currentStage === DATA_UNDEFINE ){
                this.loadChapter(DataHandler.getInstance().getUnlockedChapter());

            }else{
                this._currentStage ++;
                if(this._currentStage > this._maxStage){
                    this._currentStage = 0;
                    this._levelIndex++;

                    this._currentLevel = this._currentLevels[this._levelIndex];
                    this._LevelData = DataHandler.getInstance().getEnemyData(this._currentLevel);
                    this._maxStage = this._LevelData["enemyIDArray"].length - 1;
                    this._chestId = this._LevelData["round_treasure"];
                    if(this._chestId !== "0"){
                        this._haveChestStage = true;
                        this._maxStage++;
                    }else{
                        this._haveChestStage = false;
                    }
                }
            }
        };

        this.loadChapter = function(lv){
            this._currentChapter = lv;
            var dataHandler = DataHandler.getInstance();
            this._chapterData = dataHandler.getChapterData(lv);
            this._currentLevels = this._chapterData["levelArray"];
            this._currentLevel = this._currentLevels[0];
            this._LevelData = dataHandler.getEnemyData(this._currentLevel);
            this._currentStage = 0;
            this._levelIndex = 0;
            this._comboPoint = 0;
            this._maxStage = this._LevelData["enemyIDArray"].length - 1;
            var levelArray = this._chapterData["levelArray"];
            this._levelCount = levelArray.length;
            this._chestId = this._LevelData["round_treasure"];
            if(this._chestId !== "0"){
                this._maxStage++;
                this._haveChestStage = true;
            }else{
                this._haveChestStage = false;
            }
        };

        this.getStatus = function(){
            return this._status;
        };
        this.setStatus = function(st){
            this._status = st;
        };
        this.getBattleType = function(){
            return this._battleType;
        };
        this.setBattleType = function(bt){
            this._battleType = bt;
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

        this.getCurrentChapter = function(){
            return this._currentChapter;
        };
        this.setCurrentChapter = function(lv){
            this._currentChapter = lv;
        };

        //判断当前level是否还有下一stage
        this.isNextStageExist = function(){
            return (this._levelIndex < (this._levelCount - 1) || this._currentStage < this._maxStage);
        };

        this.isChestStage = function(){
            return (this._currentStage === this._maxStage && this._haveChestStage);
        };


        this.getChestId = function(){
            return this._chestId;
        };

        this.getEnemyId = function(){
            var dataHandler = DataHandler.getInstance();
            var enemyData = dataHandler.getEnemyData(this._currentLevel);
            var enemyId = enemyData["enemyIDArray"][this._currentStage];
            return enemyId;
        };


        this.getComboPoint = function(){
            return this._comboPoint;
        };
        /**
         * 计算新增combo点数，combo层数＋1时计算一次
         * @param {int} comboNum 当前combo层数
         */
        this.calculateComboPoint = function(comboNum){
            var dataHandler = DataHandler.getInstance();
            var comboData = dataHandler.getComboData();

            for(var idx = 0 ; idx < comboData.length;  idx++){
                var sunData = comboData[idx];
                var min = sunData["min_point"];
                var max = sunData["max_point"];
                if((comboNum >= min && comboNum <= max) ||
                    (comboNum >= min && max === DATA_UNDEFINE)){
                    var addCombo = parseInt(sunData["min_damage"]);

                    if(comboNum % 5 === 0){
                        addCombo += parseInt(sunData["max_damage"]);
                    }
                    this._comboPoint += addCombo;
                    break;

                }
            }
        };

        this.saveComboPoint = function(){
            var point = this.getComboPoint();

            var dataHandler = DataHandler.getInstance();
            dataHandler.addComboPoint(point);
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
