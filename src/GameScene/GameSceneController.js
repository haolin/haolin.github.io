

// 游戏场景管理对象，单例类
var GameSceneController = (function () {

    function _GameSceneController() {
        // 敌人[波组]
        this._groupVector = [];
        // 敌人[数组]
        this._enemyVector = [];
        // 子弹[数组]
        this._bulletVector = [];
        // 移动点集合[数组]
        this._pointVector = [];

        this._status = GameStatus.Move;

        // 当前[背景]
        this._curBgName = "";
        // 当前[关卡]
        this._curLevel = 0;

        // 当前[血量]
        this._curHp = 100;

        // [血量]
        this._maxHp = 100;

        // 当前[血量]
        this._minDamage = 2;

        // [血量]
        this._maxDamage = 5;

        this.clear = function(){
            this._groupVector = [];
            this._enemyVector = [];
            this._bulletVector = [];
            this._pointVector = [];
        };

        this.reset = function(){
            this.clear();
            this._status = GameStatus.Move;
            this._curLevel = 0;
            this._curHp = 100;
            this._maxHp = 100;
            this._minDamage = 2;
            this._maxDamage = 5;
        };
        // ==============[getter && setter]==============
        this.getGroupVector = function(){
            return this._groupVector;
        };
        this.setGroupVector = function(groupVector){
            this._groupVector = groupVector;
        };

        this.getEnemyVector = function(){
            return this._enemyVector;
        };
        this.setEnemyVector = function(enemyVector){
            this._enemyVector = enemyVector;
        };

        this.getBulletVector = function(){
            return this._bulletVector;
        };
        this.setBulletVector = function(bulletVector){
            this._bulletVector = bulletVector;
        };

        this.getPointVector = function(){
            return this._pointVector;
        };
        this.setPointVector = function(pointVector){
            this._pointVector = pointVector;
        };

        this.getStatus = function(){
            return this._status;
        };
        this.setStatus = function(status){
            this._status = status;
        };


        this.getCurBgName = function(){
            return this._curBgName;
        };
        this.setCurBgName = function(curBgName){
            this._curBgName = curBgName;
        };

        this.getCurLevel = function(){
            return this._curLevel;
        };
        this.setCurLevel = function(level){
            this._curLevel = level;
        };

        this.getCurHp = function(){
            return this._curHp;
        };
        this.setCurHp = function(curHp){
            this._curHp = curHp;
        };

        this.getMaxHp = function(){
            return this._maxHp;
        };
        this.setMaxHp = function(maxHp){
            this._maxHp = maxHp;
        };

        this.getMinDamage = function(){
            return this._minDamage;
        };
        this.setMinDamage = function(minDamage){
            this._minDamage = minDamage;
        };
        this.getMaxDamage = function(){
            return this._maxDamage;
        };
        this.setMaxDamage = function(maxDamage){
            this._maxDamage = maxDamage;
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
