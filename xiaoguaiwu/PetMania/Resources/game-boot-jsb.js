var isHtml5 = isHtml5 || false;

//
var gameJSFiles = [

    //safevar安全保护var
    "src/Safe/Safe.js",
    "src/Safe/Appark.js",
    "src/Safe/Safevar.js", //保护运行中的变量
    "src/Safe/SafeFile.js",  //保存变量到本地

    //基础定义
    "src/NameSpace.js",
    "src/Tools.js",
    "src/async.js",
    "src/IObject.js",

    //
    "src/Define_Colors.js",
    "src/Define_Directions.js",
    "src/Define_SysConfig.js",
    "src/Defines.js",
    "src/Wrapper/WrapperConfig.js",
    "src/Wrapper/WrapperFunction.js",
    //
    "src/Datas/DBOperation.js",
    "src/Datas/Datas.js",
    "src/Datas/Data_CustomResult.js",
    "src/Datas/Data_Daily.js",
    "src/Datas/Data_Story.js",
    "src/Datas/Data_Drama.js",
    //"src/Datas/Data_Item.js",
    //"src/Datas/Data_Timer.js",
    //"src/Datas/Data_TimeArriveCustom.js",
    //"src/Datas/Data_ExtAddGold.js",
    //"src/Datas/Data_Role.js",
    //"src/Datas/Data_NodeSelf.js",
    "src/Datas/Data_FloatLevel.js",
    //"src/Datas/Data_NodeLog.js",
    "src/Datas/DataMng.js",
    "src/Datas/Data_Record.js",


    "src/GameClasses/ResourceMng.js",
    "src/GameLevelData.js",
    "src/FloatLevelData.js",
    "src/GameLevelDataEx.js",

    //第三方绑定

    "src/Wrapper/DarkMgr.js",
    "src/Joy/OPJoyStruct.js",
    "src/Joy/KakaoJoyInterface.js",
    "src/Joy/KakaoJoyInterface.js",

    "src/Joy/joyBase.js",
    "src/Joy/JoyCommon.js",
    "src/Joy/OPJoyInterface.js",
    "src/Joy/TextUtility.js",
    "src/Joy/LocalDataHander.js",
    "src/Joy/BillInfoList.js",
	"src/Joy/KakaoJoyInterface.js",
    "src/Joy/PartyTrackInterface.js",
    "src/Joy/CashslideInterface.js",
    //网络
    "src/Wrapper/UpdateApp.js",
    "src/Wrapper/UpdateRes.js",   
    "src/NodeClient/base64.min.js",
    "src/NodeClient/md5.js",
    "src/NodeClient/NodeDefine.js",
    "src/NodeClient/NodeClient.js",
    "src/NodeClient/NodeSelf.js",
    //"src/NodeClient/NodeLog.js",
    "src/NodeClient/NodeHelper.js",
    "src/NodeClient/NodeTime.js",
    "src/NetWorkWrapper/NetWorkHandler.js",
            

    //基础类
    "src/IClasses/INodeObject.js",
    "src/IClasses/IIterator.js",

    "src/IClasses/ITable.js",
    "src/IClasses/IVisitor.js",
    "src/IClasses/IDecoration.js",
    "src/IClasses/IEvent.js",


    //格子相关
    "src/Grid/IGrid.js",
    "src/Grid/EmptyGrid.js",
    "src/Grid/NormalGrid.js",
    "src/Grid/PipelineGrid.js",

    //GameScenes
    "src/GameScenes/LoadHandlers.js",
    "src/GameScenes/Scene_Loading.js",
    "src/GameScenes/Scene_Test.js",
    "src/GameScenes/Scene_MainMenu.js",
    "src/GameScenes/Scene_Shop.js",
    "src/GameScenes/Scene_Story.js",
    "src/GameScenes/Scene_DailyBonus.js",
    "src/GameScenes/Scene_MainMap.js",
    "src/GameScenes/Scene_FloatMap.js",
    "src/GameScenes/Scene_GameLevel.js",
    "src/GameScenes/Scene_Roulette.js",
    "src/GameScenes/Scene_SignBonus.js",

    //State模式
    "src/GameState/IState.js",
    //"src/GameState/GameLevelScene.js",
    "src/GameState/State_GameLevel.js",
    "src/GameState/State_GameItem.js",
    "src/GameState/State_GameGuide.js",
    "src/GameState/State_GameCarnivalBase.js",
    "src/GameState/State_GameLevelWinCelebrate.js",
    "src/GameState/State_GameCarnivalScore.js",
    "src/GameState/State_GameCarnivalDestroy.js",
    "src/GameState/State_GameCarnivalUnlock.js",
    "src/GameState/State_GameOutMoves.js",
    "src/GameState/State_GameOutTime.js",
    "src/GameState/State_GameCarnivalBubble.js",
    "src/GameState/State_GameCarnivalFlower.js",
    "src/GameState/State_GameCarnivalBoss.js",
    "src/GameState/State_GameFail.js",
    "src/GameState/State_GameCarnivalUnlockAndDestroy.js",
    "src/GameState/State_GameCarnivalTime.js",
    "src/GameState/State_GameActivate.js",
    "src/GameState/GameStateWrapper.js",




    //游戏单独的对象
    "src/GameClasses/GameTimers/GameTimer.js",
    "src/GameClasses/GameTimers/GameTimer_Group.js",
    "src/GameClasses/GameTimers/GameTimer_Pay.js",
    "src/GameClasses/GameManager.js",
    "src/GameClasses/Screen.js",
    "src/GameClasses/GameLevel.js",
    "src/GameClasses/GameLevelDump.js",
    "src/GameClasses/GameLevelTimer.js",
    "src/GameClasses/GameLevelTargetChecker.js",
    "src/GameClasses/ToucnSwapCommandMng.js",
    "src/GameClasses/ScoreVisitor.js",
    "src/GameClasses/AudioMng.js",
	"src/GameClasses/KoreanTxt.js",
    "src/GameClasses/EnglishTxt.js",
    "src/GameClasses/ChineseTxt.js",
    "src/GameClasses/GameItems.js",
    "src/GameClasses/PhotoLoad.js",
    "src/GameClasses/ShareMng.js",
    "src/GameClasses/PayMng.js",
    "src/GameClasses/FeedbackMng.js",
    "src/GameClasses/RateMng.js",
    "src/GameClasses/GameItemTips.js",
    "src/GameClasses/DeadTime.js",
    "src/GameClasses/LoginOperation.js",
    "src/GameClasses/Upload.js",
	"src/GameClasses/MineMng.js",
    "src/GameClasses/GameCenterMng.js",

    //
    "src/Effect/Effect_Praise.js",
    "src/Effect/Effect_SmallExplode.js",
    "src/Effect/Effect_ShowClock.js",
    "src/Effect/Effect_FireDrop.js",
    "src/Effect/Effect_Statining.js",
    "src/Effect/Effect_LockDestory.js",
    "src/Effect/Effect_MonsterRunning.js",
    "src/Effect/Effect_ColorfulLight.js",
    "src/Effect/Effect_ColorExplode.js",
    "src/Effect/Effect_Line.js",
    "src/Effect/Effect_MonsterDesWrap.js",
    "src/Effect/Effect_Score.js",
    "src/Effect/Effect_ShowFlower.js",
    "src/Effect/Effect_BezierPath.js",
    "src/Effect/Effect_SprinkleDestory.js",
    "src/Effect/Effect_MonsterFlyTo.js",
	"src/Effect/Effect_MonsterFlyToUFO.js",
    "src/Effect/Effect_NotifyTarget.js",
    "src/Effect/EffectMng.js",

    //
    "src/Armature/ArmatureControl.js",
    "src/Armature/Armature_MainMenu.js",
    //"src/Armature/Armature_GUILoading.js",
    "src/Armature/Armature_GUIStory.js",
    "src/Armature/Armature_GUIMap.js",
    "src/Armature/Armature_NewZone.js",
    "src/Armature/Armature_Monster.js",
    "src/Armature/ArmatureDataMng.js",

    //Touch
    "src/TouchHandle/Touch_ByItem.js",
    "src/TouchHandle/Touch_ByItemDesPoint.js",
    "src/TouchHandle/Touch_ByItemDesLine.js",
    "src/TouchHandle/Touch_ByItemToMonsColorful.js",
    "src/TouchHandle/Touch_ByItemToMonsWrap.js",
    "src/TouchHandle/Touch_ByItemToMonsDirectionEx.js",
    "src/TouchHandle/Touch_ByItemToMonsColorfulEx.js",
    "src/TouchHandle/Touch_ByItemToMonsWrapEx.js",
    "src/TouchHandle/Touch_ByItemToMonsTransposition.js",
    "src/TouchHandle/Touch_ByItemToMonsGoldenKey.js",
	"src/TouchHandle/Touch_ByItemToMonsGoldenKey_new.js",
    "src/TouchHandle/Touch_ByItemToMonsStaining.js",
    "src/TouchHandle/Touch_ByItemToMonsStorm.js",
    "src/TouchHandle/Touch_ByItemToMonsTime.js",
    "src/TouchHandle/Touch_ByItemContinue.js",
    "src/TouchHandle/Touch_ByItemIce.js",
    "src/TouchHandle/TouchPad.js",
    "src/TouchHandle/TouchPad_SwapObject.js",


    //对象类
    "src/GameObjects/ObjectsRenders/MonsterRender.js",
    "src/GameObjects/ObjectsRenders/MonsterBombRender.js",
    "src/GameObjects/ObjectsRenders/ColorBossRender.js",
    "src/GameObjects/ObjectsRenders/BubbleRender.js",
    "src/GameObjects/ObjectsRenders/FloorRender.js",
    "src/GameObjects/ObjectsRenders/MonsterFlowerRender.js",
    "src/GameObjects/ObjectsRenders/LockRender.js",
    "src/GameObjects/ObjectsRenders/HazeRender.js",
    "src/GameObjects/EmptyObj.js",
    "src/GameObjects/NormalObj.js",
    "src/GameObjects/Obj_Begin.js",
    "src/GameObjects/Obj_Factory.js",
    "src/GameObjects/Obj_Monster.js",
    "src/GameObjects/Obj_MonsterDirection.js",
    "src/GameObjects/Obj_MonsterColorful.js",
    "src/GameObjects/Obj_MonsterWrap.js",
    "src/GameObjects/Obj_Floor.js",
    "src/GameObjects/Obj_Lock.js",
    "src/GameObjects/Obj_Stone.js",
    "src/GameObjects/Obj_Bomb.js",
    "src/GameObjects/Obj_BombTip.js",
    "src/GameObjects/Obj_Bubble.js",
    "src/GameObjects/Obj_BubbleCreator.js",
    "src/GameObjects/Obj_Boss.js",
    "src/GameObjects/Obj_ColorBoss.js",
    "src/GameObjects/Obj_Flower.js",
    "src/GameObjects/Obj_Ice.js",
    "src/GameObjects/Obj_MonsterAddTime.js",
    "src/GameObjects/Obj_PipelinePathNode.js",
    "src/GameObjects/Obj_Snake.js",
    "src/GameObjects/Obj_SnakeIce.js",
    "src/GameObjects/Obj_FactoryMine.js",
    "src/GameObjects/Obj_MonsterMine.js",
    "src/GameObjects/Obj_PipeFactory.js",
    "src/GameObjects/Obj_Haze.js",


    //TiledMap相关
    "src/TiledMap/Property.js",
    "src/TiledMap/TiledMapTable.js",
    "src/TiledMap/TiledMapCreateBackGround.js",
    "src/TiledMap/TiledMapBuilderConnect.js",
    "src/TiledMap/TiledMapPaths.js",
    "src/TiledMap/TiledMapGameLevelBuilder.js",
    "src/TiledMap/TiledMapGameObjectFactory.js",
    "src/TiledMap/TiledMapZoneBuilder.js",
    "src/TiledMap/TiledMapFloatBuilder.js",
    "src/TiledMap/TiledMapTableShuffle.js",
    "src/TiledMap/TMXPipePath.js",
    "src/TiledMap/TiledMapPipePaths.js",


    //命令类
    "src/Commands/ICommand.js",
    "src/Commands/Cmd_TouchSwapObj.js",
    "src/Commands/Cmd_AfterTouchSwapFail.js",
    "src/Commands/Cmd_Prompt.js",
    "src/Commands/Cmd_Shuffle.js",
    "src/Commands/Cmd_ShuffleEx.js",
    "src/Commands/Cmd_CreateMonsterDirection.js",
    "src/Commands/Cmd_CreateMonsterColorful.js",
    "src/Commands/Cmd_CreateMonsterWrap.js",
    "src/Commands/Cmd_CreateMonsterUnwrap.js",
    "src/Commands/Cmd_DesMonsBomb.js",
    "src/Commands/Cmd_DesMonsters.js",
    "src/Commands/Cmd_DesMonstersGroups.js",
    "src/Commands/Cmd_DesByColor.js",
    "src/Commands/Cmd_DesByDirection.js",
    "src/Commands/Cmd_DesByWrap.js",
    "src/Commands/Cmd_DesMonsColorfulWithDirection.js",
    "src/Commands/Cmd_DesMonsColorfulWithColorful.js",
    "src/Commands/Cmd_DesMonsColorfulWithWrap.js",
    "src/Commands/Cmd_DesMonsWrapWithWrap.js",
    "src/Commands/Cmd_DesMonsWrapWithDirection.js",
    "src/Commands/Cmd_DesMonsDirectionWithDirection.js",
    "src/Commands/Cmd_SubMove.js",
    "src/Commands/Cmd_EveryMoveNext.js",
    "src/Commands/Cmd_EveryDestroy.js",
    "src/Commands/Cmd_CarnivalScore.js",
    "src/Commands/Cmd_CarnivalUnlock.js",
    "src/Commands/Cmd_CarnivalDestroy.js",
    "src/Commands/Cmd_CreateBubbleCreator.js",
    "src/Commands/Cmd_MoveBubbleCreator.js",
    "src/Commands/Cmd_CarnivalBubble.js",
    "src/Commands/Cmd_CreateFlower.js",
    "src/Commands/Cmd_CarnivalFlower.js",
    "src/Commands/Cmd_CarnivalBoss.js",
    "src/Commands/Cmd_CarnivalBoss_Catch.js",
    "src/Commands/Cmd_CarnivalBoss_LimitTime.js",
    "src/Commands/Cmd_CarnivalUnlockAndDestroy.js",
    "src/Commands/Cmd_CarnivalTime.js",
    "src/Commands/Cmd_LeftBubbleDestroy.js",
    "src/Commands/Cmd_CarnivalUniversal.js",
    "src/Commands/Cmd_OpeningCeremony.js",
    "src/Commands/Cmd_PipePathMove.js",
    "src/Commands/Cmd_PipePath_Unidirection.js",
    "src/Commands/Cmd_PipePath_Circle.js",
    "src/Commands/Cmd_PipePathSnakeCreate.js",
    "src/Commands/Cmd_MineRise.js",
    //"src/Commands/Cmd_CreateMineDiamond.js",

    //消除规则
    "src/DestroyRules/IDestroyRule.js",
    "src/DestroyRules/DestroyRule_MonsterBase.js",
    "src/DestroyRules/DestroyRule_MonsterDirection.js",
    "src/DestroyRules/DestroyRule_MonsterColorful.js",
    "src/DestroyRules/DestroyRule_MonsterWrap.js",
    "src/DestroyRules/DestroyRule_MonsterUnwrap.js",
    "src/DestroyRules/DestroyRule_Flower.js",


    //GUI
    "src/GUI/GUIWindow.js",
    "src/GUI/GUIPopupWindow.js",

    //
    "src/GUI/GUILoading.js",
    "src/GUI/GUIAboutUs.js",
    "src/GUI/GUIShowForum.js",
    "src/GUI/GUISpringAd.js",
    "src/GUI/GUITeachAndHelp.js",
    "src/GUI/GUIMainMenu.js",
	"src/GUI/GUIFirstLoginTip.js",
    "src/GUI/GUIFirstLoginTipNew.js",
    "src/GUI/GUIItemDesc.js",
    //"src/GUI/GUITipsEffect.js",
    "src/GUI/GUIMyFriendsTop.js",
    "src/GUI/GUITotalLevelTop/GameTopModel.js",
	"src/GUI/GUITotalLevelTop/GUITotalLevelTop.js",
    "src/GUI/GUIStory.js",
    "src/GUI/GUIDebugFunc.js",
    "src/GUI/GUIMineEnter.js",
    "src/GUI/GUINewTotalScoreUp/GameScoreUpModel.js",
	"src/GUI/GUINewTotalScoreUp/GUINewTotalScoreUp.js",

    //
    "src/GUI/GUIExtensions/GUIAction.js",
    "src/GUI/GUIExtensions/GUIMenu.js",
    "src/GUI/GUIExtensions/GUIMenuItem.js",

    //
    "src/GUI/GUIBonus/GUIBonus.js",
    "src/GUI/GUIBonus/GUIBonus_Oper.js",
    "src/GUI/GUIBonus/GUIBonus_Daily.js",
    "src/GUI/GUIBonus/GUIBonus_Level.js",

    //
    "src/GUI/GUIGameLevel/GUIGameLevelStart.js",
    "src/GUI/GUIGameLevel/GUIGameLevel.js",
    "src/GUI/GUIGameLevel/GUIGameLevelInfo.js",
    "src/GUI/GUIGameLevel/GUIGameLevelItem.js",
    "src/GUI/GUIGameLevel/GUIGameLevelProgress.js",
    "src/GUI/GUIGameLevel/GUIGameLevelTarget.js",
    "src/GUI/GUIGameLevel/GUIGameLevelEndFail.js",
    "src/GUI/GUIGameLevel/GUIGameLevelEndWin.js",
    "src/GUI/GUIGameLevel/GUIGameOptionAndPause.js",
    "src/GUI/GUIGameLevel/GUIGameGiveUP.js",
    "src/GUI/GUIGameLevel/GUIGameOutMoves.js",
    "src/GUI/GUIGameLevel/GUIGameActivate.js",

    //
    "src/BackGround/IBackGround.js",
    "src/BackGround/GameLevelBackGroundBlue.js",
    "src/BackGround/GameLevelBackGroundMushroom.js",
    "src/BackGround/GameLevelBackGroundFlower.js",
    "src/BackGround/GameLevelBackGroundDuck.js",
    "src/BackGround/GameLevelBackGroundGold.js",
    "src/BackGround/GameLevelBackGroundIce.js",
    "src/BackGround/GameLevelBackGroundBall.js",
    "src/BackGround/GameLevelBackGroundSticky.js",
    "src/BackGround/GameLevelBackGroundBacterium.js",
    "src/BackGround/GameLevelBackGroundChirps.js",
    "src/BackGround/GameLevelBackGroundQuad.js",
    "src/BackGround/MapZoneBackGroundTest.js", //GameLevelBackGround_14
    "src/BackGround/GameLevelBackGround_11.js",
    "src/BackGround/GameLevelBackGround_12.js",
    "src/BackGround/GameLevelBackGround_13.js",
    "src/BackGround/GameLevelBackGround_14.js", //GameLevelBackGround_14
    //
    "src/GUI/GUIMap/GUIMapDefine.js",
    "src/GUI/GUIMap/GUIMapMng.js",
    "src/GUI/GUIMap/GUIMap.js",
    "src/GUI/GUIMap/GUIMapAnim.js",
    "src/GUI/GUIMap/GUIMapZoneTemp.js",
    "src/GUI/GUIMap/GUIMapZone.js",
    "src/GUI/GUIMap/GUIMapItem.js",
    "src/GUI/GUIMap/GUIMapLevel.js",
    "src/GUI/GUIMap/GUIMapStation.js",
    "src/GUI/GUIMap/GUIMapCoke.js",
    "src/GUI/GUIMap/GUIMapCokePrompt.js",
    "src/GUI/GUIMap/GUIMapFriendAid.js",
    "src/GUI/GUIMap/GUIMapSpaceOption.js",
    "src/GUI/GUIMap/GUIMapNewZoneShare.js",
	"src/GUI/GUIMap/GUIMapScoreTop.js",
	
	"src/GUI/GUIMiniFriendsTop.js",

    //
    "src/GUI/GUIFloatMap/GUIFloatMap.js",
    "src/GUI/GUIFloatMap/GUISpendKey.js",

    //
    "src/GUI/GUIShop/GUIShopData.js",
    "src/GUI/GUIShop/GUIShopDataEx.js",
    "src/GUI/GUIShop/GUIShop.js",
    "src/GUI/GUIShop/GUIShopBuyCheck.js",
    "src/GUI/GUIShop/GUIShopCell.js",
    "src/GUI/GUIShop/GUIShopCellNormal.js",
    "src/GUI/GUIShop/GUIBuyDiamond.js",
    "src/GUI/GUIShop/GUIBuySuccess.js",
    "src/GUI/GUIShop/GUIBuyPrompt.js",
	"src/GUI/GUIShop/GUIShopSendGift.js",
	"src/GUI/GUIShop/GUIItemPrompt.js",

    "src/GUI/GUIShop/GUISimpleShop.js",
    "src/GUI/GUIShop/GUISimpleShopCell.js",

    "src/GUI/Guide/GUIGuideNormal.js",
    "src/GUI/Guide/GuideHelper.js",
    "src/GUI/Guide/Guide_ShowWithArrow.js",
    "src/GUI/Guide/Guide_Defines.js",
    "src/GUI/Guide/GuideTest.js",

    //"src/GUI/GUIUnlockItemContainer.js",
    "src/GUI/GUINewPlayerPack.js",
    "src/GUI/GUIMultiShare.js",
    "src/GUI/GUIMultiJoys.js",
    "src/GUI/GUIPopupShare.js",
    "src/GUI/GUIPopupOption.js",
    "src/GUI/GUIPopupOption_ko.js",
    "src/GUI/GUIUpdateApp.js",
    "src/GUI/GUITimeOut.js",

    //
    "src/GUI/GUIAskFriendForHeart.js",
    "src/GUI/GUISendFriendHeart.js",
    "src/GUI/GUIInviteFriends.js",
    "src/GUI/GUIMail.js",
	"src/GUI/GUIRecommend.js",

    "src/GUI/GUIFriendsList/GUISubFriendsList_Operation.js",
    "src/GUI/GUIFriendsList/GUISubFriendsList_Operation_AskHeart.js",
    "src/GUI/GUIFriendsList/GUISubFriendsList_Operation_AskHelp.js",
    "src/GUI/GUIFriendsList/GUISubFriendsList.js",

    //
    "src/GUI/GUISurpassFriends.js",
    "src/GUI/GUIScoreTopUp.js",

    "src/GUI/GUIMsgBox/IMsgBox.js",
    "src/GUI/GUIMsgBox/MsgBox_ServerSync.js",
    "src/GUI/GUIMsgBox/MsgBox_LoginShare.js",
    "src/GUI/GUIMsgBox/GUIMsgBox.js",
    "src/GUI/GUIMsgBox/GUIMsgView.js",
    "src/GUI/GUIMsgBox/MsgBox_QuitGame.js",

	//英文版用推荐登录弹窗
	"src/GUI/GUIInviteLogin_EN.js",

    //轮盘赌
    "src/GUI/GUIRoulette/GUIRoulette.js",
    "src/GUI/GUIRoulette/RouletteController.js",
    "src/GUI/GUIRoulette/RouletteModel.js",
    "src/GUI/GUIRoulette/RouletteRoundModel_Base.js",
    "src/GUI/GUIRoulette/RouletteRoundModel_Item.js",
    "src/GUI/GUIRoulette/RouletteRoundModel_Mons.js",

	//韩文版好友信息弹窗
	"src/GUI/GUIFriendInfo.js",

    //
    "src/Dramas/IDrama.js",
    "src/Dramas/DramaBase.js",
    "src/Dramas/DramaMng.js",
    "src/Dramas/DramaLevelEnd_15.js",
    "src/Dramas/DramaLevelStart_16.js",
    "src/Dramas/DramaLevelEnd_30.js",
    "src/Dramas/DramaLevelStart_31.js",
    "src/Dramas/DramaLevelEnd_45.js",
    "src/Dramas/DramaLevelStart_46.js",
    "src/Dramas/DramaLevelEnd_60.js",
	"src/Dramas/DramaLevelStart_61.js",
    "src/Dramas/DramaLevelEnd_80.js",
	"src/Dramas/DramaLevelStart_81.js",
    "src/Dramas/DramaLevelEnd_100.js",
	"src/Dramas/DramaLevelStart_101.js",
    "src/Dramas/DramaLevelEnd_125.js",
	"src/Dramas/DramaLevelStart_126.js",
	"src/Dramas/DramaLevelEnd_150.js",
    //
    "src/Friends/Impl_FriendsMng.js",
    "src/Friends/FriendInfo.js",
    "src/Friends/FriendsMng.js",
    "src/Friends/Impl_FriendsMngPhone.js",
    "src/Friends/Impl_FriendsMngPhoneKakao.js",

    //
    "src/Mail/MailInfo.js",
    "src/Mail/MailOperation.js",
    "src/Mail/MailOpt_GiveFriendHeart.js",
    "src/Mail/MailOpt_AskFriendHeart.js",
    "src/Mail/MailOpt_GiveFriendHelp.js",
    "src/Mail/MailOpt_ProductOrder.js",
    "src/Mail/MailOpt_FirstLogin.js",
    "src/Mail/MailOpt_GenuineBonus.js",
    "src/Mail/MailMng.js",
    "src/Mail/MailDefine.js",
    "src/Mail/MailOpt_GetItem.js",

    "src/UserRecommend/RecomInfo.js",
    "src/UserRecommend/RecomMng.js",

    //BI
    "src/BI/BIDefines.js",
    "src/BI/BIMng.js",
    "src/BI/BI_Countly.js",
    "src/BI/BI_Home.js",
    "src/BI/BI_IAP.js",
    "src/BI/BI_Diamond.js",
    "src/BI/BI_Item.js",
    "src/BI/BI_Social.js",

    //
    "src/RoundEndEvent/A_RoundEndEvent.js",
    "src/RoundEndEvent/BossMng.js",
    "src/RoundEndEvent/PraiseMng.js",
    "src/RoundEndEvent/BubbleCreateorMonstersMng.js",
    "src/RoundEndEvent/BombsMng.js",
    "src/RoundEndEvent/FactoryMng.js",
    "src/RoundEndEvent/MonsterAddTimeMng.js",
    "src/RoundEndEvent/PipeAndSnakeGame.js",
    "src/RoundEndEvent/MiningGame.js",

    //
    "src/GameClasses/Login.js",

    //日记
    "src/Diary/Diary.js",
    "src/Diary/DiaryEvent.js",
    "src/Diary/DiaryEventName.js",
    "src/Diary/Diary_GameLevel.js",

    //物品封装背包
    "src/ItemPack/Item.js",
    "src/ItemPack/ItemHeart.js",
    "src/ItemPack/ItemSource.js",
    "src/ItemPack/ItemRecord.js",
    "src/ItemPack/ItemPack.js",

    //金钱封装背包
    "src/Bank/MoneyRecord.js",
    "src/Bank/MoneySource.js",
    "src/Bank/Bank.js",

    //kakao
    "src/GUI/GUIKakao/GUITopupShare.js",
    "src/GUI/GUIKakao/GUIInviteFriendsKakao.js",
    "src/GUI/GUIKakao/GUIAskHeartKakao.js",
    "src/GUI/GUIKakao/GUIAskHelpKakao.js",
    "src/GUI/GUIKakao/GUIFailedItemPush.js",
	"src/GUI/GUIKakao/GUIFreeCandyPush.js",
    "src/GUI/GUIKakao/GUILoginItemPush.js",
    "src/GUI/GUIKakao/GUIAppraiseKakao.js",
    "src/Datas/Data_Sign.js",
    "src/GUI/GUISignBonus.js",
    "src/GameClasses/ServerItemTypes.js",
   // "src/Datas/Data_Sign_Node.js"

    "src/GUI/GUIKakao/GUITaskAndOthers.js",

    "src/GUI/GUIKakao/TaskDefines.js",
    "src/GUI/GUIKakao/GUITaskKakao.js",
    "src/GUI/GUIKakao/GUITaskKakaoData.js",

    "src/GUI/GUIKakao/AchievementDefins.js",
    "src/GUI/GUIKakao/GUIAchievement.js",
    "src/GUI/GUIKakao/GUIAchievementData.js",

    "src/GameClasses/ServerItemTypes.js"



	
];

(function()
{

    if (isHtml5)
    {
        (function () {
            var d = document;
            var c = {
                COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
                showFPS:true,
                loadExtension:true,
                frameRate:60,
                tag:'gameCanvas', //the dom element to run cocos2d on
                engineDir:'../../Cocos2d-html5_2.1.4/Cocos2d-html5-v2.1.4/cocos2d/',
                appFiles: gameJSFiles.concat()
            };

            if(!d.createElement('canvas').getContext){
                var s = d.createElement('div');
                s.innerHTML = '<h2>Your browser does not support HTML5 canvas!</h2>' +
                    '<p>Google Chrome is a browser that combines a minimal design with sophisticated technology to make the web faster, safer, and easier.Click the logo to download.</p>' +
                    '<a href="http://www.google.com/chrome" target="_blank"><img src="http://www.google.com/intl/zh-CN/chrome/assets/common/images/chrome_logo_2x.png" border="0"/></a>';
                var p = d.getElementById(c.tag).parentNode;
                p.insertBefore(s);
                return;
            }

            window.addEventListener('DOMContentLoaded', function () {
                //first load engine file if specified
                var s = d.createElement('script');
                /*********Delete this section if you have packed all files into one*******/
                if (c.SingleEngineFile && !c.engineDir) {
                    s.src = c.SingleEngineFile;
                }
                else if (c.engineDir && !c.SingleEngineFile) {
                    s.src = c.engineDir + 'platform/jsloader.js';
                }
                else {
                    alert('You must specify either the single engine file OR the engine directory in "cocos2d.js"');
                }
                /*********Delete this section if you have packed all files into one*******/

                    //s.src = 'Packed_Release_File.js'; //IMPORTANT: Un-comment this line if you have packed all files into one

                d.body.appendChild(s);
                document.ccConfig = c;
                s.id = 'cocos2d-html5';
                //else if single file specified, load singlefile
            });
        })();
    }
    else
    {
        //
        require("jsb.js");

        //
        gameJSFiles.forEach(
            function(filesName)
            {
                //cc.log("Loading: " + filesName );
                require(filesName);
            }
        );

        //
        //Defines.IS_SMALL = Defines.IS_SMALL || isSupportTile();
        if (_ScreenHeight() <= parseInt(768/2))
        {
            Defines.IS_SMALL = Defines.IS_SMALL || true;

            //
            Defines.BASE_SCALE = Defines.IS_SMALL ? 35/70 : 1.0;
            Defines.TABLE_GRID_SIZE = Defines.IS_SMALL ? 35 : 70;

            //
            Defines.OBJ_MOVE_SPEED = Defines.TABLE_GRID_SIZE * (Defines.IS_SMALL ? 8 * 0.8 : 8);
            Defines.ACCELERATION_OF_GRAVITY = Defines.TABLE_GRID_SIZE/3;

            cc.log("==>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>使用小资源");
            require("src/GameClasses/ResourceMng.js");
        }

        //小版本的调整位置
        for (var prop in GUI.MAP_DEFINE)
        {
            if (GUI.MAP_DEFINE.hasOwnProperty(prop))
            {
                var mapDefine = GUI.MAP_DEFINE[prop];
                var width = mapDefine.SIZE.width * Defines.BASE_SCALE;
                mapDefine.SIZE = cc.size(width, _ScreenHeight());
                mapDefine.POSITION = cc.p(mapDefine.ID *width, 0);
            }
        }

        if (!Defines.OS.isWindows())
        {
            tranPayList();//把支付列表传到java层
            musicControl();
        }

       // 先检测有没有更新，如果没有则执行里面的回调
        _StartGame();

        //
        if (!Defines.OS.isWindows())
        {
            //noticeJaveHandler(1, "1500");
            needUpdate();
        }
        cc.log("send mails in js");
//        sendMails("cunkai.wang@chukong-inc.com,jinwu.liu@chukong-inc.com,qingcheng.huang@chukong-inc.com" , "反馈邮件" , "this is a test");
    }
})();





