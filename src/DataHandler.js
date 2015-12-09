

// 游戏数据缓存与加工类，单例类
var DataHandler = (function () {

    function _DataHandler() {
        // 敌人[波组]
        this._configData = null;
        // 敌人[数组]
        this._heroData = null;
        // 子弹[数组]
        this._enemysData = null;
        // 子弹[数组]
        this._levelsData = null;


        this.reload = function(){
            var _data = cc.loader._loadTxtSync(res.dt_config);
            var array = JSON.parse(_data);
            this._configData = array;

            _data = cc.loader._loadTxtSync(res.dt_hero);
            array = JSON.parse(_data);
            this._heroData = array;

            _data = cc.loader._loadTxtSync(res.dt_enemy);
            array = JSON.parse(_data);
            this._enemyData = array;
        };


        this.reset = function(){
            cc.sys.localStorage.setItem("hero_maxhp_level", 0);
            cc.sys.localStorage.setItem("hero_mindamage_level", 0);
            cc.sys.localStorage.setItem("hero_maxdamage_level", 0);
            cc.sys.localStorage.setItem("hero_combodamage_level", 0);
        };

        // ==============[getter && setter]==============

        this.getConfigData = function(){
            if(this._configData === null){
                var data = cc.loader._loadTxtSync(res.dt_config);
                var array = JSON.parse(data);
                this._configData = array[0];
            }

            return this._configData;
        };

        this.getHeroData = function(){
            if(this._heroData === null){
                var data = cc.loader._loadTxtSync(res.dt_hero);
                var array = JSON.parse(data);
                this._heroData = array;
            }

            return this._heroData;
        };

        this.getEnemyData = function(lv){
            if(this._enemysData === null){
                var data = cc.loader._loadTxtSync(res.dt_enemy);
                var array = JSON.parse(data);
                this._enemysData = array;

                for(var idx = 0 ; idx < this._enemysData.length;  idx++){
                    var enemyIds = this._enemysData[idx]["id_enemy"];
                    var idArray = enemyIds.split(",");
                    this._enemysData[idx]["enemyIDArray"] = idArray;
                }
            }

            if (lv >= this._enemysData.length){
                lv = this._enemysData.length - 1;
            }

            return this._enemysData[lv];
        };

        this.getLevelData = function(lv){
            if(this._levelsData === null){
                var data = cc.loader._loadTxtSync(res.dt_level);
                var array = JSON.parse(data);
                this._levelsData = array;
                for(var idx = 0 ; idx < this._levelsData.length;  idx++){
                    var enemyIds = this._levelsData[idx]["id_enemy"];
                    var idArray = enemyIds.split(",");
                    this._levelsData[idx]["enemyIDArray"] = idArray;
                }
            }

            if (lv >= this._levelsData.length){
                lv = this._levelsData.length - 1;
            }


            return this._levelsData[lv];
        };

    }
    //实例容器
    var instance;

    var _static = {
        name: 'DataHandler',
        //获取实例的方法
        //返回Singleton的实例
        getInstance: function () {
            if (instance === undefined) {
                instance = new _DataHandler();
            }
            return instance;
        }
    };
    return _static;
})();
