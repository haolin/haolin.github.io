//资源管理？

var _ResRoot = Defines.IS_SMALL ? "res_small/" : "res/";
_ResRoot = Defines.OS.isiOS() ? "res_ios/" : _ResRoot;

//
var _UsePVR = (_ResRoot == "res_ios/");
var _UsePVRccz = _UsePVR;
//_ResRoot = "res/";
//_UsePVR = false;
//_UsePVRccz = false;
//
var _ChooseImageFormatSuffixPVRorPNG = function()
{
    return _UsePVR ? ".pvr" : ".png";
};

//
var _ChooseImageFormatSuffixPVRCCZorPNG = function()
{
    return _UsePVRccz ? ".pvr.ccz" : ".png";
};

//
//_ResRoot = "res/";
//_UsePVR = false;
//_UsePVRccz = false;

var _Format_Suffix = ".png";

var _Lan_Suffix = Defines.IS_EN ? "En" : "Ch";
_Lan_Suffix = Defines.IS_KO ? "Ko" : _Lan_Suffix;

var _Lan_Path = _ResRoot + _Lan_Suffix + "/";

//大地图的路径
var _MainMapPath = _ResRoot + "MainMap/";
cc.log("_MainMapPath  = " + _MainMapPath);

//Full的路径
var _FullPath = _ResRoot + "Full/";
cc.log("_FullPath  = " + _FullPath);

//Full的路径
var _ArmaturePath = _ResRoot + "Armature/";
cc.log("_ArmaturePath  = " + _ArmaturePath);

//GUI的路径
var _GUIPath = _ResRoot + "GUI/";
cc.log("_GUIPath  = " + _GUIPath);

//Images的路径
var _ImagesPath = _ResRoot + "Images/";
cc.log("_ImagesPath  = " + _ImagesPath);

//Images的路径
var _TileMapsPath = "src/" + "TileMaps/";
cc.log("_TileMapsPath  = " + _TileMapsPath);

//Sound的路径
var _SoundPath = _ResRoot + "sound/";
cc.log("_SoundPath  = " + _SoundPath);

//Sound的路径
var _AnimationsPath = _ResRoot + "Animations/";
cc.log("_AnimationsPath  = " + _AnimationsPath);

//Particles的路径
var _ParticlesPath = _ResRoot + "Particles/";
cc.log("_ParticlesPath  = " + _ParticlesPath);

//_GameIconsPath的路径
var _GameIconsPath = _ResRoot + "GameIcons/";
cc.log("_GameIconsPath  = " + _GameIconsPath);

//Html的路径
var _HtmlPath = _ResRoot + "Html/";
cc.log("_HtmlPath  = " + _HtmlPath);

//字体的路径
var _FontPath = _ResRoot + "Fonts/";

//
var _PublicizePath = _ResRoot + "publicize/";
cc.log("_PublicizePath  = " + _PublicizePath);




//Animations  ==========================================================================================================
Resource.bubble_creator_plist = _AnimationsPath + "bubble_creator.plist";
Resource.bubble_creator_png = _AnimationsPath + "bubble_creator" + _Format_Suffix;

/*Resource.caikuang_plist = _AnimationsPath + "caikuang.plist";
Resource.caikuang_png = _AnimationsPath + "caikuang.png";*/

Resource.effects_plist = _AnimationsPath + "effects.plist";
Resource.effects_png = _AnimationsPath + "effects" + _ChooseImageFormatSuffixPVRCCZorPNG();

Resource.escape_door_plist = _AnimationsPath + "escape_door.plist";
Resource.escape_door_png = _AnimationsPath + "escape_door" + _ChooseImageFormatSuffixPVRorPNG();

Resource.fireball_plist = _AnimationsPath + "fire.plist";
Resource.fireball_png = _AnimationsPath + "fire" + _ChooseImageFormatSuffixPVRorPNG();

Resource.flower_plist = _AnimationsPath + "flower.plist";
Resource.flower_png = _AnimationsPath + "flower" + _Format_Suffix;

Resource.gate_plist = _AnimationsPath + "gate.plist";
Resource.gate_png = _AnimationsPath + "gate" + _ChooseImageFormatSuffixPVRorPNG();

Resource.hatch_plist = _AnimationsPath + "hatch.plist";
Resource.hatch_png = _AnimationsPath + "hatch" + _ChooseImageFormatSuffixPVRorPNG();

/*Resource.item_container_unlock_plist = _AnimationsPath + "item_container_unlock.plist";
Resource.item_container_unlock_png = _AnimationsPath + "item_container_unlock" + _ChooseImageFormatSuffixPVRorPNG();*/

Resource.item_flash_new_plist = _AnimationsPath + "item_flash_new.plist";
Resource.item_flash_new_png = _AnimationsPath + "item_flash_new" + _ChooseImageFormatSuffixPVRorPNG();

Resource.loading_plist = _AnimationsPath + "loading.plist";
Resource.loading_png = _AnimationsPath + "loading" + _ChooseImageFormatSuffixPVRorPNG();

Resource.mrjl_fanpaishan_plist = _AnimationsPath + "mrjl_fanpai.plist";
Resource.mrjl_fanpaishan_png = _AnimationsPath + "mrjl_fanpai" + _ChooseImageFormatSuffixPVRorPNG();

Resource.win_star_plist = _AnimationsPath + "win_star.plist";
Resource.win_star_png = _AnimationsPath + "win_star" + _Format_Suffix;

//Armature =============================================================================================================
Resource.monsters_armature_plist = _ArmaturePath + "monsters_armature.plist";
Resource.monsters_armature_png = _ArmaturePath + "monsters_armature.png";

Resource.cute_monsters_armature_plist = _ArmaturePath + "cute_monster.plist";
Resource.cute_monsters_armature_png = _ArmaturePath + "cute_monster.png";

/*Resource.firefly_plist = _ArmaturePath + "firefly.plist";
Resource.firefly_png = _ArmaturePath + "firefly.png";*/

Resource.mainmenu_armature_plist = _ArmaturePath + "MainMenu/GUIMainMenuArmature.plist";
Resource.mainmenu_armature_png = _ArmaturePath + "MainMenu/GUIMainMenuArmature.png";

Resource.fireMeteor_plist = _ArmaturePath + "fireMeteor.plist";
Resource.fireMeteor_png = _ArmaturePath + "fireMeteor" + _ChooseImageFormatSuffixPVRCCZorPNG();

//Images ===============================================================================================================
Resource.monsters_plist = _ImagesPath + "monsters.plist";
Resource.monsters_png = _ImagesPath + "monsters" + _ChooseImageFormatSuffixPVRCCZorPNG();

Resource.bottoms_plist = _ImagesPath + "bottoms.plist";
Resource.bottoms_png = _ImagesPath + "bottoms" + _Format_Suffix;

Resource.tops_plist = _ImagesPath + "tops.plist";
Resource.tops_png = _ImagesPath + "tops" + _Format_Suffix;

Resource.ceils_plist = _ImagesPath + "ceils.plist";
Resource.ceils_png = _ImagesPath + "ceils" + _Format_Suffix;

Resource.bombs_plist = _ImagesPath + "bombs.plist";
Resource.bombs_png = _ImagesPath + "bombs" + _Format_Suffix;

Resource.monsters_time_plist = _ImagesPath + "monsters_time.plist";
Resource.monsters_time_png = _ImagesPath + "monsters_time" + _Format_Suffix;

Resource.zhuijiajiangli_png = _ImagesPath + "zhuijiajiangli.png";
Resource.black_layer_png = _ImagesPath + "black.png";

Resource.mine_plist = _ImagesPath + "mine.plist";
Resource.mine_png = _ImagesPath + "mine" + _ChooseImageFormatSuffixPVRCCZorPNG();
/*
Resource.snake_0_png = _ImagesPath + "snake_0.png";
Resource.snake_1_png = _ImagesPath + "snake_1.png";
Resource.snake_2_png = _ImagesPath + "snake_2.png";
Resource.spiral_png = _ImagesPath + "spiral.png";
Resource.food_png = _ImagesPath + "food.png";
*/

//Particles =============================================================================================================

Resource.props_plist = _ParticlesPath + "daojulizi.plist";
Resource.props_png = _ParticlesPath + "gaiyanse.png";

Resource.guangdian_plist = _ParticlesPath + "daojuguangdian.plist";
Resource.guangdian_png = _ParticlesPath + "(null).png";

Resource.tongyong_plist = _ParticlesPath + "xinglizi.plist";
Resource.tongyong_png = _ParticlesPath + "tongyong.png";

Resource.fire_particle_plist = _ParticlesPath + "fire_particle.plist";
Resource.huo_png = _ParticlesPath + "huo.png";

Resource.yellow_succeed_plist = _ParticlesPath + "yellow_succeed.plist";
Resource.green_succeed_plist = _ParticlesPath + "green_succeed.plist";
Resource.purple_succeed_plist = _ParticlesPath + "purple_succeed.plist";
Resource.xingxing_png = _ParticlesPath + "xingxing.png";

Resource.flower_blue_plist = _ParticlesPath + "flower_blue.plist";
Resource.flower_blue_png = _ParticlesPath + "flower_blue.png";

Resource.flower_white_plist = _ParticlesPath + "flower_white.plist";
Resource.flower_white_png = _ParticlesPath + "flower_white.png";


Resource.flower_up_blue_plist = _ParticlesPath + "flower_up_blue.plist";
Resource.flower_up_white_plist = _ParticlesPath + "flower_up_white.plist";


Resource.up_blue_plist = _ParticlesPath + "up_blue.plist";
Resource.up_green_plist = _ParticlesPath + "up_green.plist";
Resource.up_red_plist = _ParticlesPath + "up_red.plist";

Resource.bomb_blue_plist = _ParticlesPath + "bomb_blue.plist";
Resource.bomb_green_plist = _ParticlesPath + "bomb_green.plist";
Resource.bomb_red_plist = _ParticlesPath + "bomb_red.plist";

Resource.bg_sharp_plist = _ParticlesPath + "bg_sharp.plist";
Resource.bg_sharp_a_plist = _ParticlesPath + "bg_sharp_a.plist";
Resource.paper_plist = _ParticlesPath + "paper.plist";
Resource.star_bomb_plist = _ParticlesPath + "star_bomb.plist";
Resource.star_bomb_png = _ParticlesPath + "caiselizi.png";
Resource.beijingshanshuolizi_png = _ParticlesPath + "beijingshanshuolizi.png";
Resource.xingxingbaozhalizi_png = _ParticlesPath + "xingxingbaozhalizi.png";
Resource.zhipianlizi_png = _ParticlesPath + "zhipianlizi.png";

Resource.xiaoguailizi_a_plist = _ParticlesPath + "xiaoguailizi-a.plist";
Resource.xiaoguailizi_a_png = _ParticlesPath + "xiaoguailizi-a.png";

Resource.ranseqiu_plist = _ParticlesPath + "ranseqiu.plist";
Resource.ranseqiu_png = _ParticlesPath + "ranseqiu.png";

Resource.meirijiangli_plist = _ParticlesPath + "meirijiangli.plist";
Resource.meirijiangli_png = _ParticlesPath + "meirijiangli.png";

Resource.yinzhang_plist = _ParticlesPath + "yinzhang.plist";
Resource.yinzhang_png =  _ParticlesPath + "yinzhang.png";


//TileMaps =============================================================================================================
Resource.normalGrid = _TileMapsPath + "nor_grid_" + ( Defines.IS_SMALL ? "35x35" : "70x70") + ".png";
cc.log("Resource.normalGrid  = " + Resource.normalGrid);

Resource.pipeGrid = _TileMapsPath + "pipe_grid_" + ( Defines.IS_SMALL ? "35x35" : "70x70") + ".png";
cc.log("Resource.pipeGrid  = " + Resource.pipeGrid);

//Num ==================================================================================================================
//
Resource.scores_pngs = Resource.scores_pngs || {};
Resource.scores_pngs[Defines.COLOR.PINK] = _GUIPath + "Num/score_pink.png";
Resource.scores_pngs[Defines.COLOR.GREEN] = _GUIPath + "Num/score_green.png";
Resource.scores_pngs[Defines.COLOR.BLUE] = _GUIPath + "Num/score_blue.png";
Resource.scores_pngs[Defines.COLOR.ORANGE] = _GUIPath + "Num/score_orange.png";
Resource.scores_pngs[Defines.COLOR.PURPLE] = _GUIPath + "Num/score_purple.png";
Resource.scores_pngs[Defines.COLOR.YELLOW] = _GUIPath + "Num/score_yellow.png";
Resource.scores_pngs[Defines.COLOR.COLORFUL] = _GUIPath + "Num/score_pink.png";

//GameIcons ============================================================================================================
Resource.Icon_Social_plist = _GameIconsPath + "Icon_Social.plist";
Resource.Icon_Social_png = _GameIconsPath + "Icon_Social.png";

//GUI ==================================================================================================================
Resource.add_moves_star_plist = _GUIPath + "GUIGameLevel/add_moves_star.plist";
Resource.add_moves_star_png = _GUIPath + "GUIGameLevel/add_moves_star.png";

//Resource.map_rainbow_plist = _MainMapPath + "Map_Rainbow.plist";
//Resource.map_rainbow_png = _MainMapPath + "Map_Rainbow" + _Format_Suffix;

Resource.map_meteor_plist = _MainMapPath + "Map_Meteor.plist";
Resource.map_meteor_png = _MainMapPath + "Map_Meteor" + _Format_Suffix;

Resource.map_level_unlock_plist = _MainMapPath + "map_unlock.plist";
Resource.map_level_unlock_png = _MainMapPath + "map_unlock" + _ChooseImageFormatSuffixPVRorPNG();

//
Resource._GUITeachAndHelp_plist = _Lan_Path + "_GUITeachAndHelp_" + _Lan_Suffix + ".plist";
Resource._GUITeachAndHelp_png = _Lan_Path + "_GUITeachAndHelp_" + _Lan_Suffix + _ChooseImageFormatSuffixPVRCCZorPNG();

//
Resource._GUIFirendsScoresTop_plist = _Lan_Path + "Full/_GUIFriendsScoresTop_" + _Lan_Suffix + ".plist";
Resource._GUIFirendsScoresTop_png = _Lan_Path + "Full/_GUIFriendsScoresTop_" + _Lan_Suffix + _ChooseImageFormatSuffixPVRCCZorPNG();

//
Resource._GUIMultiShare_plist = _Lan_Path + "Full/_GUIMultiShare_" + _Lan_Suffix + ".plist";
Resource._GUIMultiShare_png = _Lan_Path + "Full/_GUIMultiShare_" + _Lan_Suffix + _Format_Suffix;

//
Resource._GUITotalLevelTop_plist = _Lan_Path + "Full/_GUITotalLevelTop_" + _Lan_Suffix + ".plist";
Resource._GUITotalLevelTop_png = _Lan_Path + "Full/_GUITotalLevelTop_" + _Lan_Suffix + _ChooseImageFormatSuffixPVRCCZorPNG();//".png";

//
Resource._GUIDailyBonus_plist = _Lan_Path + "_GUIDailyBonus_" + _Lan_Suffix + ".plist";
Resource._GUIDailyBonus_png = _Lan_Path + "_GUIDailyBonus_" + _Lan_Suffix + _ChooseImageFormatSuffixPVRCCZorPNG();

//
Resource._GUIShop_plist = _Lan_Path + "_GUIShop_" + _Lan_Suffix + ".plist";
Resource._GUIShop_png = _Lan_Path + "_GUIShop_" + _Lan_Suffix + /*".png"*/_Format_Suffix;

//
Resource._GUIMap_plist = _Lan_Path + "_GUIMap_" + _Lan_Suffix + ".plist";
Resource._GUIMap_png = _Lan_Path + "_GUIMap_" + _Lan_Suffix + /*".png"*/_Format_Suffix;

//
Resource._GUIGameLevel_plist = _Lan_Path + "_GUIGameLevel_" + _Lan_Suffix + ".plist";
Resource._GUIGameLevel_png = _Lan_Path + "_GUIGameLevel_" + _Lan_Suffix + _ChooseImageFormatSuffixPVRCCZorPNG();

//
Resource._GUIGameLevelOpening_plist = _Lan_Path + "_GUIGameLevelOpening_" + _Lan_Suffix + ".plist";
Resource._GUIGameLevelOpening_png = _Lan_Path + "_GUIGameLevelOpening_" + _Lan_Suffix + _ChooseImageFormatSuffixPVRCCZorPNG();

//
Resource._GUIGameLevel_Start_EndWin_EndFail_plist = _Lan_Path + "_GUIGameLevel_Start_EndWin_EndFail_" + _Lan_Suffix + ".plist";
Resource._GUIGameLevel_Start_EndWin_EndFail_png = _Lan_Path + "_GUIGameLevel_Start_EndWin_EndFail_" + _Lan_Suffix + _ChooseImageFormatSuffixPVRCCZorPNG();

//
Resource._GUIGeneral_plist = _Lan_Path + "_GUIGeneral_" + _Lan_Suffix + ".plist";
Resource._GUIGeneral_png = _Lan_Path + "_GUIGeneral_" + _Lan_Suffix + _ChooseImageFormatSuffixPVRCCZorPNG();
//
Resource._MainMap_plist = _Lan_Path + "_MainMap_" + _Lan_Suffix + ".plist";
Resource._MainMap_png = _Lan_Path + "_MainMap_" + _Lan_Suffix + /*".png"*/_Format_Suffix;

//
Resource.GUIMainMenu_plist = _Lan_Path + "_GUIMainMenu_" + _Lan_Suffix + ".plist";
Resource.GUIMainMenu_png = _Lan_Path + "_GUIMainMenu_" + _Lan_Suffix + /*".png"*/_Format_Suffix;

Resource._Images_plist = _Lan_Path + "_Images_" + _Lan_Suffix + ".plist";
Resource._Images_png = _Lan_Path + "_Images_" + _Lan_Suffix + _ChooseImageFormatSuffixPVRCCZorPNG();

/*Resource.GUIRoulette_plist = _Lan_Path + "_GUIRoulette_" + _Lan_Suffix + ".plist";
Resource.GUIRoulette_png = _Lan_Path + "_GUIRoulette_" + _Lan_Suffix + ".png";*/

Resource._GUIInviteFriendsKakao_plist = _Lan_Path + "_GUIInviteFriendsKakao_" + _Lan_Suffix + ".plist";
Resource._GUIInviteFriendsKakao_png = _Lan_Path + "_GUIInviteFriendsKakao_" + _Lan_Suffix + _ChooseImageFormatSuffixPVRCCZorPNG();

Resource._GUIFailedItemPush_plist = _Lan_Path + "_GUIFailedItemPush_" + _Lan_Suffix + ".plist";
Resource._GUIFailedItemPush_png = _Lan_Path + "_GUIFailedItemPush_" + _Lan_Suffix + _ChooseImageFormatSuffixPVRCCZorPNG();
//
Resource._GUIAppraise_plist = _Lan_Path + "_GUIAppraise_" + _Lan_Suffix + ".plist";
Resource._GUIAppraise_png = _Lan_Path + "_GUIAppraise_" + _Lan_Suffix + _ChooseImageFormatSuffixPVRCCZorPNG();

Resource._GUITask_plist = _Lan_Path + "_GUITask_" + _Lan_Suffix + ".plist";
Resource._GUITask_png = _Lan_Path + "_GUITask_" + _Lan_Suffix + _ChooseImageFormatSuffixPVRCCZorPNG();

Resource._MapZone = _MainMapPath + "MapZone_1.png";

Resource.Icon_Item_plist = _Lan_Path + "IconItem.plist";
Resource.Icon_Item_png = _Lan_Path + "IconItem" + _ChooseImageFormatSuffixPVRCCZorPNG();

Resource.to_new_zone_plist = _Lan_Path + "to_new_zone.plist";
Resource.to_new_zone_png = _Lan_Path + "to_new_zone.png";
Resource.to_new_zone_xml = _Lan_Path + "to_new_zone.xml";

Resource._GUISpring_plist = _Lan_Path + "_GUISpring_" + _Lan_Suffix + ".plist";
Resource._GUISpring_png = _Lan_Path + "_GUISpring_" + _Lan_Suffix + _ChooseImageFormatSuffixPVRCCZorPNG();

Resource._GUIMineEnter_plist = _Lan_Path + "_GUIMineEnter_" + _Lan_Suffix + ".plist";
Resource._GUIMineEnter_png = _Lan_Path + "_GUIMineEnter_" + _Lan_Suffix + _ChooseImageFormatSuffixPVRCCZorPNG();

Resource._GUIDiamondBuy_plist = _Lan_Path + "_GUIDiamondBuy_" + _Lan_Suffix + ".plist";
Resource._GUIDiamondBuy_png = _Lan_Path + "_GUIDiamondBuy_" + _Lan_Suffix + _ChooseImageFormatSuffixPVRCCZorPNG();

Resource._GUISignBonus_plist = _Lan_Path + "_GUISignBonus_" + _Lan_Suffix + ".plist";
Resource._GUISignBonus_png = _Lan_Path + "_GUISignBonus_" + _Lan_Suffix + _ChooseImageFormatSuffixPVRCCZorPNG();

Resource._GUIPopupOption_plist = _Lan_Path + "_GUIPopupOption_" + _Lan_Suffix + ".plist";
Resource._GUIPopupOption_png = _Lan_Path + "_GUIPopupOption_" + _Lan_Suffix + _ChooseImageFormatSuffixPVRCCZorPNG();

Resource._GUIMail_plist = _Lan_Path + "_GUIMail_" + _Lan_Suffix + ".plist";
Resource._GUIMail_png = _Lan_Path + "_GUIMail_" + _Lan_Suffix + _ChooseImageFormatSuffixPVRCCZorPNG();

var Fonts = {
    BLACK: "黑体",
    SEOULNAMSAN_M : _FontPath + "SeoulNamsan M.ttf"
};

Defines.DefaultFont = Fonts.SEOULNAMSAN_M;

var g_ressources = [


    //loading ~************************************************************************************************
    {src:Resource.loading_plist},
    {src:Resource.loading_png},

    //图标************************************************************************************************
    {src:Resource.Icon_Item_plist},
    {src:Resource.Icon_Item_png},

    {src:Resource.Icon_Social_plist},
    {src:Resource.Icon_Social_png},

    //帮助界面*********************************************************************************************加载式
    {src:Resource._GUITeachAndHelp_plist},
    {src:Resource._GUITeachAndHelp_png},

    //每日奖励*********************************************************************************************加载式
    {src:Resource._GUIDailyBonus_plist},
    {src:Resource._GUIDailyBonus_png},

    //商城*************************************************************************************************加载式
    {src:Resource._GUIShop_plist},
    {src:Resource._GUIShop_png},
    {src:_GUIPath + "GUIShop/shop_background.jpg"},

    //商城*************************************************************************************************加载式
    {src:Resource._GUISpring_plist},
    {src:Resource._GUISpring_png},

    //地图UI***********************************************************************************************加载式
    {src:Resource._GUIMap_plist},
    {src:Resource._GUIMap_png},

    //地图*************************************************************************************************加载式
    {src:Resource._MainMap_plist},
    {src:Resource._MainMap_plist},
    {src:Resource._MainMap_png},

    //游戏内************************************************************************************************加载式
    {src:Resource._GUIGameLevel_plist},
    {src:Resource._GUIGameLevel_png},
    {src:Resource.add_moves_star_plist},
    {src:Resource.add_moves_star_png},
    {src:_GUIPath + "GUIGameLevel/game_ufo_particle.plist"},
    {src:_GUIPath + "GUIGameLevel/game_ufo_particle.png"},
    {src:_GUIPath + "GUIGameLevel/star_explode_particle.plist"},
    {src:_GUIPath + "GUIGameLevel/star_explode_particle.png"},
    {src:_GUIPath + "GUIGameLevel/item_prompt_particle.plist"},
    {src:_GUIPath + "GUIGameLevel/item_prompt_particle.png"},

    //游戏内*************************************************************************************************加载式
    {src:Resource._GUIGameLevelOpening_plist},
    {src:Resource._GUIGameLevelOpening_png},

    //进出关*************************************************************************************************加载式
    {src:Resource._GUIGameLevel_Start_EndWin_EndFail_plist},
    {src:Resource._GUIGameLevel_Start_EndWin_EndFail_png},
    //{src:_GUIPath + "GUIGameLevel_Start_EndWin_EndFail/plant_top.png"},
    {src:_GUIPath + "GUIGameLevel_Start_EndWin_EndFail/win_particle_0.plist"},
    {src:_GUIPath + "GUIGameLevel_Start_EndWin_EndFail/win_particle_0.png"},
    {src:_GUIPath + "GUIGameLevel_Start_EndWin_EndFail/win_particle_1.plist"},
    {src:_GUIPath + "GUIGameLevel_Start_EndWin_EndFail/win_particle_1.png"},
    {src:_GUIPath + "GUIGameLevel_Start_EndWin_EndFail/win_particle_2.plist"},
    {src:_GUIPath + "GUIGameLevel_Start_EndWin_EndFail/win_particle_2.png"},
    {src:_GUIPath + "GUIGameLevel_Start_EndWin_EndFail/score_top_up_light.png"},

    //通用*************************************************************************************************
    {src:Resource._GUIGeneral_plist},
    {src:Resource._GUIGeneral_png},

    //主场景**********************************************************************************************加载式
    {src:Resource.GUIMainMenu_plist},
    {src:Resource.GUIMainMenu_png},

    //主场景**********************************************************************************************
    {src:Resource._Images_plist},
    {src:Resource._Images_png},

    //好友界面**********************************************************************************************
    {src:Resource._GUIFirendsScoresTop_plist},
    {src:Resource._GUIFirendsScoresTop_png},

    //总排行界面**********************************************************************************************
    {src:Resource._GUITotalLevelTop_plist},
    {src:Resource._GUITotalLevelTop_png},

    //新的分享界面******************************************************************************************
    {src:Resource._GUIMultiShare_plist},
    {src:Resource._GUIMultiShare_png},

    {src:Resource._GUISignBonus_plist},
    {src:Resource._GUISignBonus_png},

    {src:Resource._GUIPopupOption_plist},
    {src:Resource._GUIPopupOption_png},

    {src:Resource._GUIMail_plist},
    {src:Resource._GUIMail_png},


    {src:_ImagesPath + "background_0.jpg"},
    {src:_ImagesPath + "background_1.jpg"},
    {src:_ImagesPath + "background_2.jpg"},
    {src:_ImagesPath + "background_3.jpg"},
    {src:_ImagesPath + "background_4.jpg"},
    {src:_ImagesPath + "background_5.jpg"},
    {src:_ImagesPath + "background_6.jpg"},
    {src:_ImagesPath + "background_7.jpg"},
    {src:_ImagesPath + "background_8.jpg"},
    {src:_ImagesPath + "background_9.jpg"},
    {src:_ImagesPath + "background_10.jpg"},
    {src:_ImagesPath + "background_11.jpg"},
    {src:_ImagesPath + "background_12.jpg"},
    {src:_ImagesPath + "background_13.jpg"},
    {src:_ImagesPath + "background_14.jpg"},
    {src:_ImagesPath + "background_15.jpg"},
    //
    {src:Resource.normalGrid},
    {src:Resource.pipeGrid},

    //
    {src:_TileMapsPath + "game_grid1.png"},
    {src:_TileMapsPath + "game_grid2.png"},

    //
    {src:Resource.bottoms_plist},
    {src:Resource.bottoms_png},


    //==================================================================================================================
    {src:_HtmlPath + "main_bg1.jpg"},
    {src:_HtmlPath + "Map_BackStar_2.png"},
    {src:_HtmlPath + "Map_BackStar_3.png"},
    {src:_HtmlPath + "Map_BackStar_4.png"},

    //==================================================================================================================
    //{src: Resource.map_rainbow_plist},
    //{src: Resource.map_rainbow_png},
    {src: Resource.map_meteor_plist},
    {src: Resource.map_meteor_png},
    {src: Resource.map_level_unlock_plist},
    {src: Resource.map_level_unlock_png},
    {src:_MainMapPath + "MapWayPoint.png"},
    {src:_MainMapPath + "Map_MeteorBlink.plist"},
    {src:_MainMapPath + "Map_MeteorBlink.png"},
    {src:_MainMapPath + "Map_BackStar_1.png"},
    {src:_MainMapPath + "Map_BackStar_5.png"},
    {src:_MainMapPath + "Map_BackStar_6.png"},
    {src:_MainMapPath + "Map_BackStar_7.png"},
    {src:_MainMapPath + "Map_BackStar_8.png"},
    {src:_MainMapPath + "Map_BackStar_9.png"},
    {src:_MainMapPath + "Map_BackStar_10.png"},
    {src:_MainMapPath + "Map_BackStar_11.png"},
    {src:_MainMapPath + "Map_BackStar_12.png"},
    {src:_MainMapPath + "Map_BackStar_13.png"},
    {src:_MainMapPath + "Map_BackStar_14.png"},
    {src:_MainMapPath + "Map_BackStar_15.png"},
    //==================================================================================================================
    {src:_GUIPath + "GUINewGeneral/general_back0.png"},
    {src:_GUIPath + "GUINewGeneral/general_back1.png"},
    {src:_GUIPath + "GUINewGeneral/general_back2.png"},
    {src:_GUIPath + "GUINewGeneral/general_back3.png"},
    {src:_GUIPath + "GUINewGeneral/general_back4.png"},
    {src:_GUIPath + "GUINewGeneral/general_back5.png"},
    {src:_GUIPath + "GUINewGeneral/general_back6.png"},
    {src:_GUIPath + "GUINewGeneral/general_back7.png"},
    {src:_GUIPath + "GUINewGeneral/general_back8.png"},
    {src:_GUIPath + "GUINewGeneral/general_back9.png"},
    {src:_GUIPath + "GUINewGeneral/general_back10.png"},
    {src:_GUIPath + "GUINewGeneral/general_back11.png"},
    {src:_GUIPath + "GUINewGeneral/general_back12.png"},
    {src:_GUIPath + "GUINewGeneral/general_back22.png"},
    {src:_GUIPath + "GUINewGeneral/general_back_mail.png"},

    {src:_GUIPath + "GUINewGeneral/progress_bar.png"},
	{src:_GUIPath + "GUINewGeneral/shop_search_bg_nine.png"},
	{src:_GUIPath + "GUINewGeneral/StarNameTitle_nine.png"},
	{src:_GUIPath + "GUINewGeneral/AD_900x580_2.jpg"},

    {src: _ParticlesPath + "colorful_particle.plist"},
    {src: _ParticlesPath + "colorful_particle.png"},

    {src: Resource.props_plist},
    {src: Resource.props_png},

    {src: Resource.guangdian_plist},
    {src: Resource.guangdian_png},

    {src: Resource.fire_particle_plist},
	{src: Resource.huo_png},
    {src: Resource.tongyong_plist},
    {src: Resource.tongyong_png},

    {src: Resource.yellow_succeed_plist},
    {src: Resource.green_succeed_plist},
    {src: Resource.purple_succeed_plist},
    {src: Resource.xingxing_png},

    {src: Resource.flower_blue_plist},
    {src: Resource.flower_blue_png},

    {src: Resource.flower_white_plist},
    {src: Resource.flower_white_png},

    {src: Resource.flower_up_blue_plist},
    {src: Resource.flower_up_white_plist},

    {src: Resource.up_blue_plist},
    {src: Resource.up_green_plist},
    {src: Resource.up_red_plist},

    {src: Resource.bomb_blue_plist},
    {src: Resource.bomb_green_plist},
    {src: Resource.bomb_red_plist},

    {src: Resource.fireball_png},
    {src: Resource.fireball_plist},


    {src: Resource.win_star_plist},
    {src: Resource.win_star_png},


    //Num
    {src: _GUIPath + "Num/daily_num_times.png"},
    {src: _GUIPath + "Num/num_0_10x10.png"},
    {src: _GUIPath + "Num/num_1_18x22.png"},
    {src: _GUIPath + "Num/num_2_20x24.png"},
    {src: _GUIPath + "Num/num_3_14x18.png"},
    {src: _GUIPath + "Num/num_4_10x12.png"},
    {src: _GUIPath + "Num/num_5_12x18.png"},
    {src: _GUIPath + "Num/num_6_-.png"},
    {src: _GUIPath + "Num/num_6_22x30.png"},
    {src: _GUIPath + "Num/num_7_36x46.png"},
    {src: _GUIPath + "Num/num_8_16x22.png"},
    {src: _GUIPath + "Num/num_9_20x24.png"},
    {src: _GUIPath + "Num/num_9_x.png"},
    {src: _GUIPath + "Num/num_10_16x20.png"},
    {src: _GUIPath + "Num/num_11_16x26.png"},
    {src: _GUIPath + "Num/num_12_28x40.png"},
    {src: _GUIPath + "Num/num_13_20x24.png"},
    {src: _GUIPath + "Num/num_14_18x22.png"},
	{src: _GUIPath + "Num/num_16_30x40.png"},
	{src: _GUIPath + "Num/num_17_18X26.png"},
	{src: _GUIPath + "Num/num_17_point.png"},
	{src: _GUIPath + "Num/num_sign_18_22.png"},



    {src: Resource.monsters_plist},
    {src: Resource.monsters_png},



    {src: Resource.gate_plist},
    {src: Resource.gate_png},

    {src: Resource.item_flash_new_plist},
    {src: Resource.item_flash_new_png},

    {src: Resource.escape_door_plist},
    {src: Resource.escape_door_png},

    /*{src: Resource.item_container_unlock_plist},
    {src: Resource.item_container_unlock_png},*/

    {src: Resource.bubble_creator_plist},
    {src: Resource.bubble_creator_png},

    {src: Resource.flower_plist},
    {src: Resource.flower_png},

    {src: Resource.hatch_plist},
    {src: Resource.hatch_png},

    //
    {src: Resource.effects_plist},
    {src: Resource.effects_png},


    {src: Resource.tops_plist},
    {src: Resource.tops_png},


    {src: Resource.ceils_plist},
    {src: Resource.ceils_png},

    {src: Resource.bombs_plist},
    {src: Resource.bombs_png},


    {src: Resource.monsters_time_plist},
    {src: Resource.monsters_time_png},

    {src: Resource.mine_plist},
    {src: Resource.mine_png},

    {src:Resource.bg_sharp_plist},
    {src:Resource.bg_sharp_a_plist},
    {src:Resource.paper_plist},
    {src:Resource.star_bomb_plist},
    {src:Resource.star_bomb_png},
    {src:Resource.beijingshanshuolizi_png},
    {src:Resource.xingxingbaozhalizi_png},
    {src:Resource.zhipianlizi_png},

    {src:Resource.xiaoguailizi_a_plist},
    {src:Resource.xiaoguailizi_a_png},

    {src:Resource.ranseqiu_plist},
    {src:Resource.ranseqiu_png},

    {src : Resource.meirijiangli_plist},
    {src : Resource.meirijiangli_png},

    {src : Resource.yinzhang_plist},
    {src : Resource.yinzhang_png},

    {src : Resource.mrjl_fanpaishan_plist},
    {src : Resource.mrjl_fanpaishan_png},


    {src:Resource.black_layer_png},

    {src:Resource._MapZone},


    //贪吃蛇资源测试临时
    /*{src:Resource.snake_0_png},
    {src:Resource.snake_1_png},
    {src:Resource.snake_2_png},
    {src:Resource.spiral_png},
    {src:Resource.food_png},*/
	
	/*{src: Resource.caikuang_plist},
    {src: Resource.caikuang_png}*/
	
	{src : Resource._GUIMineEnter_plist},
    {src : Resource._GUIMineEnter_png},
	
	{src : Resource._GUIDiamondBuy_plist},
    {src : Resource._GUIDiamondBuy_png},

    //
    {src : _GUIPath + "GUINewGeneral/btn_game_center_up.png"},
    {src : _GUIPath + "GUINewGeneral/btn_game_center_down.png"}
];

(function()
{
    //添加kakao的资源
    //linhao
    // if(Defines.IS_KO)
    // {
        g_ressources.push({src : Resource._GUIInviteFriendsKakao_plist});
        g_ressources.push({src : Resource._GUIInviteFriendsKakao_png});

        g_ressources.push({src : Resource._GUIFailedItemPush_plist});
        g_ressources.push({src : Resource._GUIFailedItemPush_png});

        g_ressources.push({src : Resource._GUIAppraise_plist});
        g_ressources.push({src : Resource._GUIAppraise_png});

        g_ressources.push({src : Resource._GUITask_plist});
        g_ressources.push({src : Resource._GUITask_png});
    // }
    //tmx
    var maxTiledMapIndx = 325;
    for (var indx = 0; indx < maxTiledMapIndx; ++indx)
    {
        g_ressources.push(
            {src: _TileMapsPath + "Level_" + (indx + 1) + ".tmx"}
        );
    }

    //space tmx
    var maxSpaceTiledMapIndx = 43;
    for (var index = 0; index < maxSpaceTiledMapIndx; ++index)
    {
        g_ressources.push(
            {src: _TileMapsPath + "SpaceLevel_" + (index + 1) + ".tmx"}
        );
    }

    var maxMineTiledMapIndx = 1;
    for (var index = 0; index < maxMineTiledMapIndx; ++index)
    {
        g_ressources.push(
            {src: _TileMapsPath + "MineLevel_" + (index + 1) + ".tmx"}
        );
    }

    //tmx zone
    var maxZoneIndx = 15;
    for (var indx0 = 0; indx0 < maxZoneIndx; ++indx0)
    {
        g_ressources.push(
            {src: _MainMapPath + "MapZone_" + (indx0 + 1) + ".tmx"}
        );
    }

    //tmx float
    /*var maxFloatIndx = 4;
    for (var indx1 = 0; indx1 < maxFloatIndx; ++indx1)
    {
        g_ressources.push(
            {src: _MainMapPath + "MapFloat_" + (indx1 + 1) + ".tmx"}
        );
    }*/

    //分数标签
    for (var prop in Resource.scores_pngs)
    {
        if (!Resource.scores_pngs.hasOwnProperty(prop))
        {
            continue;
        }

        if (typeof(Resource.scores_pngs[prop]) == "string")
        {
            g_ressources.push(
                {src: Resource.scores_pngs[prop]}
            );
        }
    }

    //
    if (Defines.IS_SMALL)
    {

    }
    else
    {
        g_ressources.push(
            {src:_GUIPath + "GUIMainMenu/main_bg.jpg"}
        );
		g_ressources.push(
            {src:_GUIPath + "GUIMainMenu/main_bgAdd.png"}
        );
    }

})();

//======================================================================================================================
cc.ResourceMng = cc.Class.extend({

    m_SpriteFrameCache: cc.SpriteFrameCache.getInstance(),

    //
    m_ResourceFrames: {},

    //
    m_AnimationFrames: {},

    //------------------------------------------------------------------------------------------------------------------
    getGameLevelResources: function()
    {
        return [
            [Resource.monsters_plist, Resource.monsters_png],
            [Resource.effects_plist, Resource.effects_png],
            [Resource.bottoms_plist, Resource.bottoms_png],
            [Resource.tops_plist, Resource.tops_png],
            [Resource.ceils_plist, Resource.ceils_png],
            [Resource.gate_plist, Resource.gate_png],
            [Resource.bubble_creator_plist, Resource.bubble_creator_png],
            [Resource.flower_plist, Resource.flower_png],
            [Resource.hatch_plist, Resource.hatch_png],
            [Resource.bombs_plist, Resource.bombs_png],                               
            [Resource.monsters_time_plist, Resource.monsters_time_png],
			[Resource.mine_plist, Resource.mine_png],
            [Resource.fireball_plist, Resource.fireball_png],
            [Resource.escape_door_plist, Resource.escape_door_png],             /*评级飞碟门*/
            [Resource.item_flash_new_plist, Resource.item_flash_new_png]       /*道具按钮流光*/
			//[Resource.caikuang_plist, Resource.caikuang_png]
        ];
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        //Step1： 添加资源进入Cache
        this.addAllSpriteFramesToCache();

        //Step2:
        this.initAllAnimationFrames();

        //
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addToCache: function(plist, png)
    {
        //
        cc.TextureCache.getInstance().addImage(png);

        //
        this.m_SpriteFrameCache.addSpriteFrames(
            plist,
            png);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    removeFromCache: function(plist, png)
    {
        //
        if (Defines.PLATFORM.isMobile())
        {
            this.m_SpriteFrameCache.removeSpriteFramesFromFile(plist);
            this.removeTextureCache(png);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    removeTextureCache: function(png)
    {
        if (Defines.PLATFORM.isMobile())
        {
            //只有真机才需要把贴图删除掉，网页不用
            cc.TextureCache.getInstance().removeTextureForKey(png);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUpGameLevelResources: function()
    {
        var self = this;
        this.getGameLevelResources().forEach(
            function(data)
            {
                self.removeFromCache(data[0], data[1]);
            }
        );

        //
        /*if (Defines.PLATFORM.isMobile())
        {
            cc.AnimationCache.purgeSharedAnimationCache();
        }*/

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addAllSpriteFramesToCache: function()
    {
        //
        this.m_SpriteFrameCache.addSpriteFrames(
            Resource.Icon_Item_plist,
            Resource.Icon_Item_png);

        this.m_SpriteFrameCache.addSpriteFrames(
            Resource.Icon_Social_plist,
            Resource.Icon_Social_png);

        this.m_SpriteFrameCache.addSpriteFrames(
            Resource._GUIGeneral_plist,
            Resource._GUIGeneral_png);

        this.m_SpriteFrameCache.addSpriteFrames(
            Resource._Images_plist,
            Resource._Images_png);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    registerAnimationFrames: function(framesNameKey, maxFramesCount)
    {
        this.m_AnimationFrames[framesNameKey] = this.m_AnimationFrames[framesNameKey] || [];

        for (var indx = 0; indx < maxFramesCount; ++indx)
        {
            var frameName = framesNameKey + indx + ".png";
            this.m_AnimationFrames[framesNameKey].push(frameName);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getAnimationFrames: function(framesNameKey)
    {
        if (!this.m_AnimationFrames[framesNameKey])
        {
            cc.log("framesNameKey = " + framesNameKey);
            return [];
        }

        var self = this;
        var res = [];

        var framesNames = this.m_AnimationFrames[framesNameKey];
        framesNames.forEach(
            function(a_frameName, index)
            {
                var a_frame = self.m_SpriteFrameCache.getSpriteFrame(a_frameName);
                if (a_frame)
                {
                    res.push(a_frame);
                }
                else
                {
                    cc.log("framesNameKey = " + framesNameKey + ", index = " + index);
                }
            }
        );

        return res;
    },

    //------------------------------------------------------------------------------------------------------------------
    initAllAnimationFrames: function()
    {
        this.registerAnimationFrames("explode", 15);

        this.registerAnimationFrames("x_explode", 10);

        this.registerAnimationFrames("shandian", 8);

        this.registerAnimationFrames("swirl_", 12);

        this.registerAnimationFrames("dir_buff", 15);

        this.registerAnimationFrames("wrap_buff", 15);

        this.registerAnimationFrames("gate_nor", 7);
        this.registerAnimationFrames("gate_blue", 7);
        this.registerAnimationFrames("gate_red", 7);

        this.registerAnimationFrames("escape_door", 11);

        this.registerAnimationFrames("add_moves_star", 7);

        this.registerAnimationFrames("item_flash_new_", 7);

        this.registerAnimationFrames("item_container_unlock_", 10);

        this.registerAnimationFrames("ufo_small_", 25);

        //this.registerAnimationFrames("rainbow_appear_", 9);
        //this.registerAnimationFrames("rainbow_disappear_", 10);

        this.registerAnimationFrames("meteor_", 8);

        this.registerAnimationFrames("map_unlock_", 13);

        this.registerAnimationFrames("bubble_creator", 9);

        //
        this.registerAnimationFrames("flower0_", 5);
        this.registerAnimationFrames("flower1_", 5);
        this.registerAnimationFrames("flower2_", 5);
        this.registerAnimationFrames("flower3_", 5);

        //
        this.registerAnimationFrames("hatch_open_", 8);

        //
        this.registerAnimationFrames("Pink_Horiz", 9);
        this.registerAnimationFrames("Pink_Vert", 9);
        this.registerAnimationFrames("Green_Horiz", 9);
        this.registerAnimationFrames("Green_Vert", 9);
        this.registerAnimationFrames("Blue_Horiz", 9);
        this.registerAnimationFrames("Blue_Vert", 9);
        this.registerAnimationFrames("Orange_Horiz", 9);
        this.registerAnimationFrames("Orange_Vert", 9);
        this.registerAnimationFrames("Purple_Horiz", 9);
        this.registerAnimationFrames("Purple_Vert", 9);
        this.registerAnimationFrames("Yellow_Horiz", 9);
        this.registerAnimationFrames("Yellow_Vert", 9);

        //
        this.registerAnimationFrames("fire_", 8);


        this.registerAnimationFrames("win_star_", 10);
        this.registerAnimationFrames("win_star_flicker_", 8);
        this.registerAnimationFrames("mrjl_", 4);

        this.registerAnimationFrames("loading_", 6);
		
	
		
        return this;
    }

});

//单件模式
cc.ResourceMng._instance = null;
cc.ResourceMng.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.ResourceMng();
        this._instance.init();
    }

    return this._instance;
};
