//todo 各个模块数据分开处理

//本地数据储存key
//LS: local storage
//英雄最小攻击
var LSKEY_HERO_LEVEL = "hero_level";
//英雄血量等级
var LSKEY_HERO_HP_LEVEL = "hero_maxhp_level";
//英雄最小攻击等级
var LSKEY_HERO_MIN_ATT_LEVEL = "hero_mindamage_level";
//英雄最大攻击等级
var LSKEY_HERO_MAX_ATT_LEVEL = "hero_maxdamage_level";
//英雄最小攻击等级
var LSKEY_HERO_COMBO_ATT_LEVEL = "hero_combodamage_level";
//但前开启的章节
var LSKEY_AVAILABLE_CHAPTER = "max_available_chapter";
//当前已经解锁的章节
var LSKEY_UNLOCKED_CHAPTER = "max_unlocked_chapter";
//金币数量
var LSKEY_COINS_NUMBER = "coins_number";
//当前血量
var LSKEY_CURRENT_HP = "current_hp";
//combo点数
var LSKEY_COMBO_POINT = "combo_count";

//*********装备***********
//头盔等级
var LSKEY_HELMET_LEVEL = "helmet_level";
//衣服等级
var LSKEY_ARMOR_LEVEL = "armor_level";
//武器等级
var LSKEY_WEAPON_LEVEL = "weapon_level";
//鞋子
var LSKEY_BOOTS_LEVEL = "boots_level";


// 游戏数据缓存与加工类，单例类
var DataHandler = (function () {

    function _DataHandler() {
        // 游戏配置数据，对应config.json[数组]
        this._configData = null;
        // 英雄数据，对应hero.json[数组]
        this._heroData = null;
        // 怪物数据，对应enemy.json[数组]
        this._enemysData = null;
        // 关卡数据[数组]
        this._levelsData = null;
        // 关卡数据[数组]
        this._chaptersData = null;
        // 技能数据[数组]
        this._skillsData = null;
        // 方块数据[数组]
        this._boxesData = null;
        // 宝箱数据[数组]
        this._chestsData = null;
        // combo数据[数组]
        this._comboData = null;
        // 装备升级数据[数组]
        this._equipData = null;
        // 英雄皮肤配置[数组]
        this._heroSkinData = null;
        // 小兵皮肤配置[数组]
        this._enemySkinData = null;
        // boss配置[数组]
        this._bossesData = null;
        // 文字[数组]
        this._textData = null;

        this.reload = function(){
            this._configData = this.loadData(res.dt_config);
            this._heroData = this.loadData(res.dt_hero);
            this._enemyData = this.loadData(res.dt_enemy);
            this._skillsData = this.loadData(res.dt_skill);
            this._boxesData = this.loadData(res.dt_box);
            this._chestsData = this.loadData(res.dt_treasure);
            this._comboData = this.loadData(res.dt_combo);
            this._equipData = this.loadData(res.dt_equip);
            this._heroSkinData = this.loadData(res.dt_change);
            this._chaptersData = this.loadData(res.dt_dungeon);
            this._enemySkinData = this.loadData(res.dt_emchange);
            this._bossesData = this.loadData(res.dt_boss);
            this._textData = this.loadData(res.dt_string);
        };

        this.loadData = function(fileName){
            var data = cc.loader._loadTxtSync(fileName);
            var obj = JSON.parse(data);
            return obj;
        }


        this.reset = function(){
            cc.sys.localStorage.setItem(LSKEY_HERO_HP_LEVEL, this.getIntValue("hero_maxhp_level_saved"));
            cc.sys.localStorage.setItem(LSKEY_HERO_MIN_ATT_LEVEL, this.getIntValue("hero_mindamage_level_saved"));
            cc.sys.localStorage.setItem(LSKEY_HERO_MAX_ATT_LEVEL, this.getIntValue("hero_maxdamage_level_saved"));
            cc.sys.localStorage.setItem(LSKEY_HERO_COMBO_ATT_LEVEL, this.getIntValue("hero_combodamage_level_saved"));
            cc.sys.localStorage.setItem(LSKEY_HERO_LEVEL, this.getIntValue("upgrade_number_saved"));
            cc.sys.localStorage.setItem(LSKEY_AVAILABLE_CHAPTER, this.getIntValue("max_available_level_saved"));
        };

        //每5关存储数据
        this.saveData = function(){
            cc.sys.localStorage.setItem("hero_maxhp_level_saved", this.getIntValue(LSKEY_HERO_HP_LEVEL));
            cc.sys.localStorage.setItem("hero_mindamage_level_saved", this.getIntValue(LSKEY_HERO_MIN_ATT_LEVEL));
            cc.sys.localStorage.setItem("hero_maxdamage_level_saved", this.getIntValue(LSKEY_HERO_MAX_ATT_LEVEL));
            cc.sys.localStorage.setItem("hero_combodamage_level_saved", this.getIntValue(LSKEY_HERO_COMBO_ATT_LEVEL));
            cc.sys.localStorage.setItem("upgrade_number_saved", this.getIntValue(LSKEY_HERO_LEVEL));
            cc.sys.localStorage.setItem("max_available_level_saved", this.getIntValue(LSKEY_AVAILABLE_CHAPTER));
        };

        this.saveAllocatedData = function(maxHpLv, minDamageLv, maxDamageLv, comboDamageLv){
            cc.sys.localStorage.setItem(LSKEY_HERO_HP_LEVEL, maxHpLv);
            cc.sys.localStorage.setItem(LSKEY_HERO_MIN_ATT_LEVEL, minDamageLv);
            cc.sys.localStorage.setItem(LSKEY_HERO_MAX_ATT_LEVEL, maxDamageLv);
            cc.sys.localStorage.setItem(LSKEY_HERO_COMBO_ATT_LEVEL, comboDamageLv);
        };

        this.saveDataIfNeeded = function(){
            if((this.getMaxAvailableChapter() % 5) === 0){
                this.saveData();
            }
        };

        // ==============[getter && setter]==============

        this.getConfigData = function(){
            if(this._configData === null){
                var array = this.loadData(res.dt_config);
                this._configData = array[0];
            }

            return this._configData;
        };

        this.getHeroData = function(){
            if(this._heroData === null){
                this._heroData = this.loadData(res.dt_hero);
            }

            return this._heroData;
        };

        this.getLevelData = function(lv){
            if(this._levelsData === null){
                this._levelsData = this.loadData(res.dt_level);
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

        this.getEnemyData = function(lv){
            var enemysData = this.getAllEnemys();

            if (lv >= enemysData.length){
                lv = enemysData.length - 1;
            }

            return enemysData[lv];
        };

        this.getAllEnemys = function(){
            if(this._enemysData === null){
                this._enemysData = this.loadData(res.dt_enemy);

                for(var idx = 0 ; idx < this._enemysData.length;  idx++){
                    var enemyIds = this._enemysData[idx]["id_enemy"];
                    var idArray = enemyIds.split(",");
                    this._enemysData[idx]["enemyIDArray"] = idArray;

                    var skillIds = this._enemysData[idx]["square_6"];
                    var skillArray = skillIds.split(",");
                    this._enemysData[idx]["skillIDArray"] = skillArray;
                }
            }

            return this._enemysData;
        };

        this.getChaptersData = function(){
            if(this._chaptersData === null){
                this._chaptersData = this.loadData(res.dt_dungeon);

                for(var idx = 0 ; idx < this._chaptersData.length;  idx++){
                    var levelIds = this._chaptersData[idx]["round"];
                    var levelStrArray = levelIds.split(",");
                    var levelArray = [];
                    for(var levelIdx in levelStrArray){
                        var levelIndex =  parseInt(levelStrArray[levelIdx]);
                        if(levelIndex > 0){
                            levelIndex--;
                        }
                        levelArray.push(levelIndex);

                    }
                    this._chaptersData[idx]["levelArray"] = levelArray;
                }
            }

            return this._chaptersData;
        };

        this.getChapterData = function(index){
            var chapterData = this.getChaptersData();

            if (index >= chapterData.length){
                index = chapterData.length - 1;
            }

            return chapterData[index];
        };

        this.getStageCountByChapter = function(chapter){
            var chapterData = this.getChapterData(chapter);

            var count = 0;
            for(var level in chapterData["levelArray"]){
                var levelData = this.getEnemyData(level);
                var num = levelData["enemyIDArray"].length;
                if(levelData["round_treasure"] !== "0"){
                    num++;
                }
                count += num;
            }

            return count;
        };

        this.getAllSkills = function(){
            if(this._skillsData === null){
                this._skillsData = this.loadData(res.dt_skill);
            }

            return this._enemysData;
        };

        this.getSkillData = function(skillId){
            var skillsData = this.getAllSkills();

            if (skillId >= skillsData.length){
                skillId = skillsData.length - 1;
            }

            return skillsData[skillId];
        };

        this.getAllBoxData = function(){
            if(this._boxesData === null){
                this._boxesData = this.loadData(res.dt_box);
            }

            return this._boxesData;
        };

        this.getBoxData = function(boxId){
            var boxData = this.getAllBoxData();

            if (boxId >= boxData.length){
                boxId = boxData.length - 1;
            }

            return boxData[boxId];
        };

        this.getChestData = function(chestId){
            var chestsData = this.getAllChests();
            var chestData = null;

            for(var idx = 0 ; idx < chestsData.length;  idx++){
                var tempId = chestsData[idx]["treasure_id"];
                if(chestId === tempId){
                    chestData = chestsData[idx];
                    break;
                }
            }

            return chestData;
        };

        this.getAllChests = function(){
            if(this._chestsData === null){
                this._chestsData = this.loadData(res.dt_treasure);
            }

            return this._chestsData;
        };


        this.saveAvailableChapter = function(lv){
            var maxChapter = this.getMaxChapter();
            var maxAvailableLevel = this.getMaxAvailableChapter();
            if(lv > maxAvailableLevel && lv <= maxChapter){
                cc.sys.localStorage.setItem(LSKEY_AVAILABLE_CHAPTER, lv);
            }
        };

        this.getMaxChapter = function(){
            var chaptersData = this.getChaptersData();
            return chaptersData.length - 1;
        };

        this.getMaxAvailableChapter = function(){
            var level = this.getIntValue(LSKEY_AVAILABLE_CHAPTER);

            return level;
        };

        this.getUnlockedChapter = function(){
            var level = this.getIntValue(LSKEY_UNLOCKED_CHAPTER);

            return level;
        };

        this.unlockChapter = function(chapter){
            var unlocked = this.getIntValue(LSKEY_UNLOCKED_CHAPTER);
            if(chapter > unlocked){
                cc.sys.localStorage.setItem(LSKEY_UNLOCKED_CHAPTER, chapter);
            }
        };



        this.getExpNumber = function(){
            var num = this.getIntValue("exp_number");
            return num;
        };

        /**
         * 获取当前等级升级所需的经验
         * * @return {Int}
         */
        this.getCurrentMaxExp = function(){
            var heroData = this.getHeroData();
            var heroLevel = this.getHeroLevel();
            var maxExp = parseInt(heroData[heroLevel]["exp"]);
            return maxExp;
        };

        /**
         * 花费金币
         * @param {int} addnum 增加的经验值
         * * @return {Blooen} 英雄升级了，返回true
         */
        this.addExpNumber = function(addnum){
            var num = this.getExpNumber();
            num += addnum;
            var maxExp = this.getCurrentMaxExp();

            while(num >= maxExp){
                if(this.addHeroLevel()){
                    num -= maxExp;
                }else{
                    num = maxExp;
                    break;
                }
                maxExp = this.getCurrentMaxExp();
            }

            cc.sys.localStorage.setItem("exp_number", num);
        };

        /**
         * 每关金币奖励
         *  @param {int} 关卡
         * * @return {Int} 金币奖励数
         */
        this.getGoldRewardByChapter = function(chapter) {
            var levelData =  this.getChapterData(chapter);
            var reward = parseInt(levelData["dungeon_money"]);
            return reward;
        };

        /**
         * 每个怪物的经验奖励
         * * @return {Int} 经验奖励数
         */
        this.getExpRewardByEnemy = function(lv) {
            var levelData =  this.getEnemyData(lv);
            var enemyExp = parseInt(levelData["enemy_exp"]);
            return enemyExp;
        };

        /**
         * 每关的过关经验奖励
         * * @return {Int} 经验奖励数
         */
        this.getExpRewardByChapter = function(chapter) {
            var levelData =  this.getChapterData(chapter);
            var levelExp = parseInt(levelData["dungeon_exp"]);
            return levelExp;
        };

        /**
         * 每关总经验奖励
         * * @return {Int} 经验奖励数
         */
        //this.getTotalExpRewardByChaper = function(chapter) {
        //    var levelData =  this.getEnemyData(lv);
        //    var levelExp = this.getExpRewardByChapter(chapter);
        //    var enemyExp = this.getExpRewardByEnemy(lv);
        //    var enemyCount = levelData["enemyIDArray"].length;
        //    var reward = levelExp + enemyExp*enemyCount;
        //    return reward;
        //};

        /**
         * 获取英雄等级
         * * @return {Int} 等级从0开始，0, 1, 2, 3...
         */
        this.getHeroLevel = function(){
            var num = this.getIntValue(LSKEY_HERO_LEVEL);
            return num;
        };

        /**
         * 英雄升级
         * * @return {Blooen} 升级成功，返回true；到达最高等级，升级失败返回false
         */
        this.addHeroLevel = function(){
            var num = this.getHeroLevel();
            var maxLevel = this.getHeroData().length - 1;
            num ++;
            if(num > maxLevel){
                return false;
            }else{
                cc.sys.localStorage.setItem(LSKEY_HERO_LEVEL, num);
                return true;
            }
        };

        this.getCoinsNumber = function(){
            var num = this.getIntValue(LSKEY_COINS_NUMBER);
            return num;
        };

        this.addCoinsNumber = function(addnum){

            var num = this.getCoinsNumber();
            num += addnum;
            cc.sys.localStorage.setItem(LSKEY_COINS_NUMBER, num);
        };

        /**
         * 花费金币
         * @param {int} reducenum
         * * @return {Blooen} 当前金币小于花费的金币数，返回false
         */
        this.reduceCoinsNumber = function(reducenum){

            var num = this.getCoinsNumber();
            if(reducenum > num){
                return false;
            }
            num -= reducenum;
            this.setIntValue(LSKEY_COINS_NUMBER, num);
            return true;
        };

        this.getIntValue = function(key){
            var numStr = cc.sys.localStorage.getItem(key);
            var num = 0;
            if(numStr){
                num = parseInt(numStr);
            }else{
                num = 0;
                this.setIntValue(key, num);
            }

            return num;
        };

        this.setIntValue = function(key, value){
            cc.sys.localStorage.setItem(key, value);
        };

        //hero data handle
        this.upgradeComboAttack = function(){
            this.upgradeByLevel(LSKEY_HERO_COMBO_ATT_LEVEL);
        };
        this.upgradeMaxHP = function(){
            this.upgradeByLevel(LSKEY_HERO_HP_LEVEL);
        };
        this.upgradeMinAttack = function(){
            this.upgradeByLevel(LSKEY_HERO_MIN_ATT_LEVEL);
        };
        this.upgradeMaxAttack = function(){
            this.upgradeByLevel(LSKEY_HERO_MAX_ATT_LEVEL);
        };

        this.upgradeByLevel  = function(levelKey){
            var level = this.getIntValue(levelKey);
            level = level + 1;
            this.setIntValue(levelKey, level);
        };

        /**
         * 获取combo伤害
         * combo伤害 = 初始伤害 + 英雄升级加点提升 + 头盔强化提升
         */
        this.getComboAttack = function(){
            var comboAttFromLevel = this.getValueByKeys("def_mgcdamage","mgc_damage",LSKEY_HERO_COMBO_ATT_LEVEL);
            var comboAttFromEquipment = this.getComboAttackFromEquipment();
            return comboAttFromLevel + comboAttFromEquipment;
        };
        this.getComboAttackByLevel = function(lv){
            return this.getValueByKeysAndLevel("def_mgcdamage","mgc_damage", lv);
        };
        /**
         * 获取最大生命
         * 最大生命 = 初始生命 + 英雄升级加点提升 + 衣服强化提升
         */
        this.getMaxHP = function(){
            var hpFromEquipment = this.getMaxHPFromEquipment();
            var hpFromLevel = this.getValueByKeys("def_maxhp","max_hp",LSKEY_HERO_HP_LEVEL);
            var hp = hpFromEquipment + hpFromLevel;
            return hp;
        };
        this.getMaxHPByLevel = function(lv){
            return this.getValueByKeysAndLevel("def_maxhp","max_hp",lv);
        };
        /**
         * 获取最小攻击
         * 最小攻击 = 初始最小攻击 + 英雄升级加点提升 + 鞋子强化提升
         */
        this.getMinAttack = function(){
            var minAttFromLevel = this.getValueByKeys("def_mindamage","min_damage",LSKEY_HERO_MIN_ATT_LEVEL);
            var minAttFromEquipment = this.getMinAttackFromEquipment();
            return minAttFromLevel + minAttFromEquipment;
        };
        this.getMinAttackByLevel = function(lv){
            return this.getValueByKeysAndLevel("def_mindamage","min_damage",lv);
        };
        /**
         * 获取最大攻击
         * 最大攻击 = 初始最大攻击 + 英雄升级加点提升的最小攻击 ＋ 英雄升级加点提升的最大攻击 + 武器强化提升
         */
        this.getMaxAttack = function(){
            var maxAttack = this.getValueByKeys("def_maxdamage","max_damage",LSKEY_HERO_MAX_ATT_LEVEL);
            var additionalMinAttack = this.getAdditionalValue(LSKEY_HERO_MIN_ATT_LEVEL,"min_damage");
            var maxAttFromEquipment = this.getMaxAttackFromEquipment();
            maxAttack = maxAttack + additionalMinAttack + maxAttFromEquipment;
            return maxAttack;
        };
        this.getMaxAttackByLevel = function(lv, minDamageLv){
            var maxAttack = this.getValueByKeysAndLevel("def_maxdamage","max_damage",lv);
            var additionalMinAttack = this.getAdditionalValueByLevel(minDamageLv,"min_damage");
            maxAttack = maxAttack + additionalMinAttack;
            return maxAttack;
        };

        //获取hp，attack，power等具体数值
        this.getValueByKeys = function(defKey, additionalKey, levelKey){
            var defValue = this.getDefaultValueByKey(defKey);
            var additionalValue = this.getAdditionalValue(levelKey,additionalKey);

            var value = defValue + additionalValue;
            return value;
        };

        //获取hp，attack，power等具体数值
        this.getValueByKeysAndLevel = function(defKey, additionalKey, lv){
            var defValue = this.getDefaultValueByKey(defKey);
            var additionalValue = this.getAdditionalValueByLevel(lv,additionalKey);

            var value = defValue + additionalValue;
            return value;
        };

        //获取hp，attack，power等默认数值
        this.getDefaultValueByKey = function(defKey){
            var configData = this.getConfigData();
            var defValue = parseInt(configData[defKey]);

            return defValue;
        };

        this.getAdditionalValue = function(levelKey,additionalKey){
            var level = this.getIntValue(levelKey);
            return this.getAdditionalValueByLevel(level, additionalKey);
        };

        this.getAdditionalValueByLevel = function(lv,additionalKey){
            var additionalValue = 0;

            var heroData = this.getHeroData();
            var len = heroData.length;
            for(var idx = 0;idx < lv && idx < len ; idx++){
                additionalValue = additionalValue + parseInt(heroData[idx][additionalKey]);
            }
            return additionalValue;
        };

        this.getCurrentHP = function(){
            var numStr = cc.sys.localStorage.getItem(LSKEY_CURRENT_HP);
            var num = 0;
            if(numStr){
                num = parseInt(numStr);
            }else{
                num = this.getDefaultValueByKey("def_maxhp");
                this.setIntValue(LSKEY_CURRENT_HP, num);
            }

            return num;
        };

        this.setCurrentHP = function(num){
            this.setIntValue(LSKEY_CURRENT_HP, num)
        };

        this.addCurrentHP = function(num){
            var currentHP = this.getCurrentHP();
            currentHP += num;
            var maxHP = this.getMaxHP();

            if (currentHP > maxHP){
                currentHP = maxHP;
            }

            this.setIntValue(LSKEY_CURRENT_HP, currentHP);
        };


        this.getComboData = function(){
            if(this._comboData === null){
                this._comboData = this.loadData(res.dt_combo);

                for(var idx = 0 ; idx < this._comboData.length;  idx++){
                    var enemyIds = this._comboData[idx]["lv"];
                    var array = enemyIds.split(",");

                    if(array.length === 1){
                        this._comboData[idx]["min_point"] = parseInt(array[0]);
                        this._comboData[idx]["max_point"] = DATA_UNDEFINE;
                    }

                    if(array.length > 1){
                        this._comboData[idx]["min_point"] = parseInt(array[0]);
                        this._comboData[idx]["max_point"] = parseInt(array[1]);
                    }
                }

            }

            return this._comboData;
        };

        this.getComboPoint = function(){
            var num = this.getIntValue(LSKEY_COMBO_POINT);

            return num;
        };

        this.setComboPoint = function(num){
            this.setIntValue(LSKEY_COMBO_POINT, num);
        };

        this.addComboPoint = function(num){
            var point = this.getComboPoint();
            point += num;
            this.setComboPoint(point);
        };

        /**
         * 计算新增combo点数，combo层数＋1时计算一次
         * @param {int} comboNum 当前combo层数
         */
        this.calculateComboPoint = function(comboNum){
            var num = this.getIntValue(LSKEY_COMBO_POINT);

            var comboData = this.getComboData();
            this.setIntValue(LSKEY_COMBO_POINT, num);
        };

        //equipment data handle

        this.getEquipData = function(){
            if(this._equipData === null){
                this._equipData = this.loadData(res.dt_equip);
            }

            return this._equipData;
        };

        this.upgradeHelmet = function(){
            this.upgradeByLevel(LSKEY_HELMET_LEVEL);
        };
        this.upgradeArmor = function(){
            this.upgradeByLevel(LSKEY_ARMOR_LEVEL);
        };
        this.upgradeWeapon = function(){
            this.upgradeByLevel(LSKEY_WEAPON_LEVEL);
        };
        this.upgradeBoots = function(){
            this.upgradeByLevel(LSKEY_BOOTS_LEVEL);
        };

        this.getMaxHPFromEquipment = function(){
            var hp = this.getValueFromEquipment(LSKEY_ARMOR_LEVEL, "armor_power");

            return hp;
        };

        this.getMaxAttackFromEquipment = function(){
            var maxAtt = this.getValueFromEquipment(LSKEY_WEAPON_LEVEL, "weapon_power");
            var minAtt = this.getMinAttackFromEquipment();
            return minAtt + maxAtt;
        };

        this.getMinAttackFromEquipment = function(){
            var minAtt = this.getValueFromEquipment(LSKEY_BOOTS_LEVEL, "boots_power");

            return minAtt;
        };

        this.getComboAttackFromEquipment = function(){
            var combo = this.getValueFromEquipment(LSKEY_HELMET_LEVEL, "helmet_power");

            return combo;
        };

        this.getValueFromEquipment = function(levelKey, equipmentKey){

            var value = 0;
            var level = this.getIntValue(levelKey);
            var equipData = this.getEquipData();
            var len = equipData.length;

            for(var idx = 0;idx <= level && idx < len ; idx++){
                value = value + parseInt(equipData[idx][equipmentKey]);
            }
            return value;
        };


        this.getHeroSkinData = function(){
            if(this._heroSkinData === null){
                this._heroSkinData = this.loadData(res.dt_change);
            }

            return this._heroSkinData;
        };

        /**
         * 读取取英雄皮肤配置
         */
        this.getHeroSkin = function(){

            var skins = this.getHeroSkinData();

            var minAttLevel = this.getIntValue(LSKEY_HERO_MIN_ATT_LEVEL);
            var maxAttLevel = this.getIntValue(LSKEY_HERO_MAX_ATT_LEVEL);
            var index = minAttLevel + maxAttLevel;
            if(index >=  skins.length){
                index = skins.length - 1;
            }

            var skin = skins[index];

            var skinSetting = [];

            //weapon
            skinSetting["wuqi_01"] = "wuqi/kongbai";
            skinSetting["wuqi_02"] = "wuqi/kongbai";
            skinSetting["wuqi_03"] = "wuqi/kongbai";

            var weaponSlot = skin["att_slot"];
            var weaponAttachment= skin["att_change"];
            skinSetting[weaponSlot] = weaponAttachment;


            var hpLevel = this.getIntValue(LSKEY_HERO_HP_LEVEL);
            if(hpLevel >=  skins.length){
                hpLevel = skins.length - 1;
            }

            skin = skins[hpLevel];

            skinSetting["ren_body_0101"] = skin["def_body"];
            skinSetting["ren_toufa_0101"] = skin["def_toufa01"];
            skinSetting["ren_toufa_0102"] = skin["def_toufa02"];
            skinSetting["ren_shoubi_0101"] = skin["def_shoubi01"];
            skinSetting["ren_shoubi_0102"] = skin["def_shoubi02"];
            skinSetting["ren_jianbang_0101"] = skin["def_jianbang"];
            skinSetting["ren_tui_0101"] = skin["def_tui"];
            skinSetting["ren_tui_0102"] = skin["def_tui"];
            skinSetting["ren_jiao_01"] = skin["def_jiao"];
            skinSetting["ren_jiao_0102"] = skin["def_jiao"];

            return skinSetting;
        };

        this.getEnemySkinData = function(){
            if(this._enemySkinData === null){
                this._enemySkinData = this.loadData(res.dt_emchange);
            }

            return this._enemySkinData;
        };

        /**
         * 读取英雄皮肤配置
         */
        this.getEnemySkin = function(){

            var skins = this.getEnemySkinData();
            var skinSetting = [];
            var tempSkins = {};

            for(var idx = 0; idx < skins.length; idx++){
                var skin = skins[idx];

                for(var key in skin){
                    var value = skin[key];
                    if(value !== ""){
                        if(tempSkins[key] === undefined){
                            tempSkins[key] = [];
                        }

                        tempSkins[key].push(value);
                    }
                }

            }

            var skinSetting = [];

            //weapon
            skinSetting["wuqi_01"] = "wuqi/kongbai";
            skinSetting["wuqi_02"] = "wuqi/kongbai";
            skinSetting["wuqi_03"] = "wuqi/kongbai";

            skinSetting["ren_tou_0101"] = util.getRandomElement(tempSkins["diren_tou"]);
            skinSetting["ren_toufa_0101"] = util.getRandomElement(tempSkins["diren_toufa"]);
            skinSetting["ren_bizi_0101"] = util.getRandomElement(tempSkins["diren_bizi"]);
            skinSetting["ren_huzi_0101"] = util.getRandomElement(tempSkins["diren_huzi"]);
            skinSetting["ren_meimao_0101"] = util.getRandomElement(tempSkins["diren_meimao"]);
            skinSetting["ren_yanjing_0101"] = util.getRandomElement(tempSkins["diren_yanjing"]);
            skinSetting["ren_zui_0101"] = util.getRandomElement(tempSkins["diren_zui"]);
            skinSetting["ren_body_0101"] = util.getRandomElement(tempSkins["diren_body"]);

            var attachment = util.getRandomElement(tempSkins["diren_shoubi"]);
            skinSetting["ren_shoubi_0101"] = attachment;
            skinSetting["ren_shoubi_0102"] = attachment;
            skinSetting["ren_shou_0101"] = util.getRandomElement(tempSkins["diren_shou01"]);
            skinSetting["ren_shou_0102"] = util.getRandomElement(tempSkins["diren_shou02"]);
            skinSetting["ren_jianbang_0101"] = util.getRandomElement(tempSkins["diren_jianbang"]);
            attachment = util.getRandomElement(tempSkins["diren_tui"]);
            skinSetting["ren_tui_0101"] = attachment;
            skinSetting["ren_tui_0102"] = attachment;
            attachment = util.getRandomElement(tempSkins["diren_jiao"]);
            skinSetting["ren_jiao_0101"] = attachment;
            skinSetting["ren_jiao_0102"] = attachment;
            skinSetting["dunpai_0101"] = util.getRandomElement(tempSkins["diren_dunpai"]);


            var len = tempSkins["diren_huqi"].length;
            var weaponIndex = util.getRandomNumber(0, len - 1);
            attachment = tempSkins["diren_huqi"][weaponIndex];
            var slot = tempSkins["diren_slot"][weaponIndex];
            skinSetting[slot] = attachment;

            if(slot === "wuqi_01"){
                skinSetting["dunpai_0101"] = "wuqi/kongbai";
            }

            return skinSetting;
        };

        this.getBossData = function(bossId){
            var bossesData = this.getBossesData();
            var bossData;

            for(var idx = 0; idx < bossesData.length; idx++){
                if(bossId === bossesData[idx]["id"]){
                    bossData = bossesData[idx];
                    break;
                }
            }

            return bossData;
        };

        this.getBossesData = function(){
            if(this._bossesData === null){
                this._bossesData = this.loadData(res.dt_boss);
            }

            return this._bossesData;
        };

        /**
         * 读取点空时，敌人的攻击类型，
         */
        this.getEmptyClickAttackType = function(){
            var  configData = this.getConfigData();
            var value = parseInt(configData["combo_miss"]);

            var attackType = AttackType.NormalAttack;
            var damage = 0;

            if(value >= 0){
                attackType = AttackType.FixDamageAttack;
                damage = value;
            }

            return [attackType, damage];

        };

        /**
         * 读取点空时，敌人的攻击类型，
         */
        this.getComboParticleFile = function(combo, fileKey) {
            var particleFile = null;

            if(combo >= MAX_BOX_COUNT){
                var comboData = this.getComboData();

                for(var idx in comboData){
                    var data = comboData[idx];

                    var min = data["min_point"];
                    var max = data["max_point"];

                    if(combo === MAX_BOX_COUNT && combo >= min && combo <= max){
                        particleFile = data[fileKey];
                        particleFile = RESOURCE_PARTICLE_PATH + particleFile + ".plist";
                        break;
                    }else if( combo === min ){
                        particleFile = data[fileKey];
                        particleFile = RESOURCE_PARTICLE_PATH + particleFile + ".plist";
                        break;
                    }
                }

            }

            return particleFile;
        };

        //文字配表
        this.getTextData = function(){
            if(this._textData === null){
                this._textData = this.loadData(res.dt_string);
            }

            return this._textData;
        };

        this.getTextByKey = function(key){
            var textData = this.getTextData();

            var text;

            for(var idx = 0; idx < textData.length; idx++){
                if(key === textData[idx]["string_key"]){
                    text = textData[idx]["string_id"];
                    break;
                }
            }

            return text;
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
