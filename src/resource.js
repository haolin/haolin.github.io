var res = {
    SpringGround_png : "res/springGround.png",
    Sky1_png : "res/sky1.png",
    Sky2_png : "res/sky2.png",
    UiHolder3_png : "res/uiHolder3.png",
    Spring1_png : "res/spring1.png",
    Spring2_png : "res/spring2.png",
    Spring3_png : "res/spring3.png",
    Mountain1_png : "res/mountainLayer1.png",
    Mountain2_png : "res/mountainLayer2.png",
    Mountain3_png : "res/mountainLayer3.png",
    WholeClouds_png : "res/wholeClouds.png",
    GreenBar_png : "res/greenBar.png",
    ComboBar_png : "res/comboBar.png",

    GUBBLO___ttf : "res/font/GUBBLO___.ttf",

    //plist
    ActorRun_plist : "res/actor_run.plist",
    ActorRun_png : "res/actor_run.png",
    Enemy_plist : "res/enemy.plist",
    Enemy_png : "res/enemy.png",
    tp_slider_png : "res/tp_slider.png",
    tp_slider_plist : "res/tp_slider.plist",
    tp_ui_png : "res/tp_ui.png",
    tp_ui_plist : "res/tp_ui.plist",

    //data
    dt_config : "data/config.json",
    dt_enemy : "data/enemy.json",
    dt_hero : "data/hero.json",


    //
    at_achievement_plist : "res/armature/achievement_logindown.plist",
    at_achievement_png : "res/armature/achievement_logindown.png",
    at_achievement_xml : "res/armature/achievement_logindown.xml"
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
        srcs:["res/font/GUBBLABLO.ttf"]
    }
];

for (var i in res) {
    g_resources.push(res[i]);
}
