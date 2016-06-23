
var RESOURCE_PATH = "res/840/";
var RESOURCE_APINE_PATH = RESOURCE_PATH + "spine/";
var RESOURCE_PARTICLE_PATH =  RESOURCE_PATH + "particle/";

var res = {
    //single image
    GreenBar_png : RESOURCE_PATH + "greenBar.png",
    ComboBar_png : RESOURCE_PATH + "comboBar.png",
    Sprite_png : RESOURCE_PATH + "sprite.png",

    Chest1_png : RESOURCE_PATH + "chest_1.png",
    Chest2_png : RESOURCE_PATH + "chest_2.png",

    ShuZi_png : RESOURCE_PATH + "ccstudio/atlas/shuzi.png",

    //background images
    SpringGround_png : RESOURCE_PATH + "springGround.png",
    Sky1_png : RESOURCE_PATH + "sky1.png",
    Sky2_png : RESOURCE_PATH + "sky2.png",
    Spring1_png : RESOURCE_PATH + "spring1.png",
    Spring2_png : RESOURCE_PATH + "spring2.png",
    Spring3_png : RESOURCE_PATH + "spring3.png",
    Mountain1_png : RESOURCE_PATH + "mountainLayer1.png",
    Mountain2_png : RESOURCE_PATH + "mountainLayer2.png",
    Mountain3_png : RESOURCE_PATH + "mountainLayer3.png",
    WholeClouds_png : RESOURCE_PATH + "wholeClouds.png",

    //font
    GUBBLO___ttf : "res/font/GUBBLO___.ttf",

    //plist｀
    ActorRun_plist : RESOURCE_PATH + "actor_run.plist",
    ActorRun_png : RESOURCE_PATH + "actor_run.png",
    Enemy_plist : RESOURCE_PATH + "enemy.plist",
    Enemy_png : RESOURCE_PATH + "enemy.png",
    tp_slider_png : RESOURCE_PATH + "tp_slider.png",
    tp_slider_plist : RESOURCE_PATH + "tp_slider.plist",
    tp_ui_png : RESOURCE_PATH + "tp_ui.png",
    tp_ui_plist : RESOURCE_PATH + "tp_ui.plist",
    tp_bg_png : RESOURCE_PATH + "tp_bg.png",
    tp_bg_plist : RESOURCE_PATH + "tp_bg.plist",

    //data
    dt_config : "data/config.json",
    dt_enemy : "data/enemy.json",
    dt_hero : "data/hero.json",
    dt_level : "data/monster.json",
    dt_skill : "data/skill.json",
    dt_box : "data/square.json",
    dt_dungeon : "data/dungeon.json",
    dt_treasure : "data/treasure.json",
    dt_combo : "data/combo.json",
    dt_equip : "data/equip.json",
    dt_change : "data/change.json",
    dt_emchange : "data/emchange.json",
    dt_boss : "data/boss.json",
    dt_string : "data/string.json",

    //particle plist
    pt_leap_plist : "res/leap.plist",
    //pt_snow_plist : "res/snowParticle.plist",    pt_leap_plist : "res/leap.plist",
    pt_snow_plist : "res/snowParticle.plist",
    pt_combo1_plist : RESOURCE_PATH + "particle/coblz1.plist",
    pt_combo2_plist : RESOURCE_PATH + "particle/coblz2.plist",
    pt_combo3_plist : RESOURCE_PATH + "particle/coblz3.plist",
    pt_be_attacked_plist : RESOURCE_PATH + "particle/gjlz1.plist",
    pt_die_plist : RESOURCE_PATH + "particle/silz.plist",
    pt_weapon1_plist : RESOURCE_PATH + "particle/wuqilz1.plist",
    pt_weapon2_plist : RESOURCE_PATH + "particle/wuqilz2.plist",
    pt_weapon3_plist : RESOURCE_PATH + "particle/wuqilz3.plist",
    pt_boxdisappear_plist : RESOURCE_PATH + "particle/xiaolz.plist",

    //
    at_achievement_plist : "res/armature/achievement_logindown.plist",
    at_achievement_png : "res/armature/achievement_logindown.png",
    at_achievement_xml : "res/armature/achievement_logindown.xml",

    at_dragon_plist : "res/armature/dragon.plist",
    at_dragon_png : "res/armature/dragon.png",
    at_dragon_xml : "res/armature/dragon.xml",

    at_dragonbone_plist : "res/armature/DragonBones.plist",
    at_dragonbone_png : "res/armature/DragonBones.png",
    at_dragonbone_xml : "res/armature/DragonBones.xml",

    at_skeleton_plist : "res/armature/bone2.1/skeleton.plist",
    at_skeleton_png : "res/armature/bone2.1/skeleton.png",
    at_skeleton_xml : "res/armature/bone2.1/skeleton.xml",

    at_skeleton1_plist : "res/armature/bone2.1/skeleton1.plist",
    at_skeleton1_png : "res/armature/bone2.1/skeleton1.png",
    at_skeleton1_xml : "res/armature/bone2.1/skeleton1.xml",

    at_hero_plist : "res/armature/bone2.1/hero_output2/hero.plist",
    at_hero_png : "res/armature/bone2.1/hero_output2/hero.png",
    at_hero_xml : "res/armature/bone2.1/hero_output2/hero.xml",

    //spine actor

    sp_hero_json : RESOURCE_PATH + "spine/ren_01.json",
    sp_hero_atlas : RESOURCE_PATH + "spine/ren_01.atlas",
    sp_hero_png : RESOURCE_PATH + "spine/ren_01.png",

    sp_enemy_json : RESOURCE_PATH + "spine/ren_02.json",
    sp_enemy_atlas : RESOURCE_PATH + "spine/ren_02.atlas",
    sp_enemy_png : RESOURCE_PATH + "spine/ren_02.png",

    sp_enemy3_json : RESOURCE_PATH + "spine/ren_03.json",
    sp_enemy3_atlas : RESOURCE_PATH + "spine/ren_03.atlas",
    sp_enemy3_png : RESOURCE_PATH + "spine/ren_03.png",

    sp_enemy4_json : RESOURCE_PATH + "spine/ren_04.json",
    sp_enemy4_atlas : RESOURCE_PATH + "spine/ren_04.atlas",
    sp_enemy4_png : RESOURCE_PATH + "spine/ren_04.png",


    sp_chest_json : RESOURCE_PATH + "spine/skeleton.json",
    sp_chest_atlas : RESOURCE_PATH + "spine/skeleton.atlas",
    sp_chest_png : RESOURCE_PATH + "spine/skeleton.png",

    sp_juanzhou_json : RESOURCE_PATH + "spine/juanzhou01.json",
    sp_juanzhou_atlas : RESOURCE_PATH + "spine/juanzhou01.atlas",
    sp_juanzhou_png : RESOURCE_PATH + "spine/juanzhou01.png",

    //spine texiao

    sp_tx_shang_json : RESOURCE_PATH + "spine/beateff.json",
    sp_tx_shang_atlas : RESOURCE_PATH + "spine/beateff.atlas",
    sp_tx_shang_png : RESOURCE_PATH + "spine/beateff.png",

    sp_daoeff1_json : RESOURCE_PATH + "spine/daoeff1.json",
    sp_daoeff1_atlas : RESOURCE_PATH + "spine/daoeff1.atlas",
    sp_daoeff1_png : RESOURCE_PATH + "spine/daoeff1.png",

    sp_daoeff2_json : RESOURCE_PATH + "spine/daoeff2.json",
    sp_daoeff2_atlas : RESOURCE_PATH + "spine/daoeff2.atlas",
    sp_daoeff2_png : RESOURCE_PATH + "spine/daoeff2.png",

    sp_daoeff3_json : RESOURCE_PATH + "spine/daoeff3.json",
    sp_daoeff3_atlas : RESOURCE_PATH + "spine/daoeff3.atlas",
    sp_daoeff3_png : RESOURCE_PATH + "spine/daoeff3.png",

    sp_combo1_json : RESOURCE_PATH + "spine/hit1.json",
    sp_combo1_atlas : RESOURCE_PATH + "spine/hit1.atlas",
    sp_combo1_png : RESOURCE_PATH + "spine/hit1.png",

    sp_combo2_json : RESOURCE_PATH + "spine/hit2.json",
    sp_combo2_atlas : RESOURCE_PATH + "spine/hit2.atlas",
    sp_combo2_png : RESOURCE_PATH + "spine/hit2.png",

    sp_combo3_json : RESOURCE_PATH + "spine/hit3.json",
    sp_combo3_atlas : RESOURCE_PATH + "spine/hit3.atlas",
    sp_combo3_png : RESOURCE_PATH + "spine/hit3.png",

    //spine test
    sp_test_json : "res/spinetest/skeleton.json",
    sp_test_atlas : "res/spinetest/skeleton.atlas",
    sp_test_png : "res/spinetest/skeleton.png",

    sp_test1_json : "res/spinetest/ren.json",
    sp_test1_atlas : "res/spinetest/ren.atlas",
    sp_test1_png : "res/spinetest/ren.png",

    sp_test2_json : "res/spinetest/texiao.json",
    sp_test2_atlas : "res/spinetest/texiao.atlas",
    sp_test2_png : "res/spinetest/texiao.png",


    //cocos studio

    ccs_main_json : RESOURCE_PATH + "ccstudio/main_menu.json",
    ccs_pass_json : RESOURCE_PATH + "ccstudio/pass.json",
    ccs_level_json : RESOURCE_PATH + "ccstudio/level.json",
    ccs_battle_json : RESOURCE_PATH + "ccstudio/battle.json",
    ccs_ui_json : RESOURCE_PATH + "ccstudio/main.json",
    ccs_stage_json : RESOURCE_PATH + "ccstudio/stage.json",

    ccs_main_png : RESOURCE_PATH + "ccstudio/main.png",
    ccs_main_plist : RESOURCE_PATH + "ccstudio/main.plist",
    ccs_pass_png : RESOURCE_PATH + "ccstudio/pass.png",
    ccs_pass_plist : RESOURCE_PATH + "ccstudio/pass.plist"

};

var g_resources = [
    //fornts
    {
        type: "font",
        name: "GUBBLO",
        srcs:["res/font/GUBBLO___.ttf"]
    },
    {
        type: "font",
        name: "GUBBLABLO",
        srcs: ["res/font/GUBBLABLO.ttf"]
    }
    //},
    //{
    //    type: "font",
    //    name: "STLITI",
    //    srcs:["res/font/STLITI_sub.eot", "res/font/STLITI_sub.ttf"]
    //},
    //{
    //    type: "font",
    //    name: "msyh_sub",
    //    srcs:["res/font/msyh_sub.ttf"]
    //}
];

for (var i in res) {
    g_resources.push(res[i]);
}
