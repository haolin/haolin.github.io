
//======================================================================================================================
var ShareMng = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_Code = null;
        this.m_CodeShared = false;
        this.m_CanBonus = false;
		this.candyDailyState = false;
		this.diamondDailyState = false;

        //某个登陆角色是否领奖
        //形如:'1': true
        this.m_tRoleBounsState = {};
        this
    },

    //------------------------------------------------------------------------------------------------------------------
    isValid: function()
    {
        return isEnabledShare();
    },

    //------------------------------------------------------------------------------------------------------------------
    getCode: function()
    {
        return this.m_Code;
    },

    //------------------------------------------------------------------------------------------------------------------
    getCodeDesc: function()
    {
        var codeDesc = "";

        //针对于AppStore版本
        if (!cc.DataMng.getInstance().isCDKeyEnabled())
        {
            return codeDesc;
        }

        //
        if (this.m_Code && this.m_Code != "")
        {
            codeDesc = Resource.ChineseTxt["getCodeDesc0"] + this.m_Code + Resource.ChineseTxt["getCodeDesc1"];
        }

        return codeDesc;
    },

    //------------------------------------------------------------------------------------------------------------------
    canRoleBouns: function( nBounsId)
    {
        cc.log("canRoleBouns: " + nBounsId);
        cc.log(JSON.stringify(this.m_tRoleBounsState));
        if(this.m_tRoleBounsState[nBounsId.toString()])
        {
            cc.log("false");
            return false;
        }
        else
        {
            cc.log("true");
            return true;
        }
    },

    setRoleBouns: function( nBounsId, bGet)
    {
        this.m_tRoleBounsState[nBounsId.toString()] = bGet;
    },

    loadRoleBonusState: function()
    {
        var self = this;
        var funcCallback = function( bResult, tBounsInfo)
        {
            cc.log("funcCallback: " + bResult);
            cc.log(JSON.stringify(tBounsInfo));
            if(bResult)
            {
                if(null == tBounsInfo)
                {
                    tBounsInfo = {};
                }
                self.m_tRoleBounsState = tBounsInfo;
                cc.GUIMap.getInstance().notifiedUpdate();
            }
            else
            {

            }
        };

        cc.NodeSelf.getInstance().GetDailyRewardStatus(funcCallback);
    },

    //------------------------------------------------------------------------------------------------------------------
    setCanBonus: function(setValue)
    {
        cc.log("setCanBonus: " + setValue);
        this.m_CanBonus = setValue;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    canBonus: function()
    {
        return this.m_CanBonus;
    },

	setCandyDailyState: function(value)
	{
		if (this.m_CanBonus == 2){
			this.diamondDailyState = value;
		}
		else {
			this.candyDailyState = value;
		}
	},


    //------------------------------------------------------------------------------------------------------------------
    share: function(shareObj)
    {
        if (!this.isValid() || !shareObj)
        {
            return this;
        }

        //
        this.m_CodeShared = true;
        cc.log("ShareMng-----" + JSON.stringify(shareObj));

        //
        if (Defines.IS_EN || Defines.IS_KO)
        {
            _Share_ByFacebook(shareObj);
        }
        else
        {
            _Share_ByMulti(shareObj);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _createShareObj: function(content, preview, picPath)
    {
        var shareObj = {};
        shareObj["content"] = content;
        shareObj["preview"] = preview;
        shareObj["picPath"] = picPath;

        return shareObj;
    },

    //------------------------------------------------------------------------------------------------------------------
    createCode: function(description)
    {
        if (!this.isValid() || !Defines.PLATFORM.isMobile())
        {
            return this;
        }

        //
        var self = this;

        //
        var applyCDKeyFinish = function(result, cdkey)
        {
            cc.log("ShareMng result: " + result + ", " + description + ": " + cdkey);

            if(result)
            {
                self.m_Code = cdkey;
                self.m_CodeShared = false;
            }
            else
            {
                cc.log("ShareMng " + description + ": get code failed");
            }
        };

        //
        var succFunc = function()
        {
            cc.NodeSelf.getInstance().applyCDKeyGenerate(1, applyCDKeyFinish);
        };

        var failFunc = function()
        {
            cc.log("ShareMng-----获取设备号失败，不能申请兑换码");
        };

        //
        Game_ApplyDeviceID.create(succFunc, failFunc);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanup: function()
    {
        //
        if (!this.isValid() || !this.m_CodeShared)
        {
            return this;
        }

        //
        this.createCode("重置兑换码");

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isFirstShare: function()
    {
        //V1.0.2去掉首次奖励钻石
        //return cc.DataMng.getInstance().isFirstShare();
        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    shareWithLevelWin: function(levelData, sysViewPath, diamondAdd)
    {
        if (!levelData)
        {
            return this;
        }


        if (levelData.MODEL == Defines.TARGET_MODEL.MODEL_MINELOTTERY){
            var description = "#进击的小怪物# 小伙伴都在玩的超Q消除手游！我在钻石矿场中得到了"+ diamondAdd +"钻石！快来一起玩吧！奖励码可兑换5钻石! ";
        }
        else if (levelData.IS_SPACE_LEVEL)
        {
            var description = Resource.ChineseTxt["shareWithLevelWin0"] + (levelData.ID + 1) + Resource.ChineseTxt["shareWithLevelWin3"];
        }
        else if (cc.GUIMapMng.getInstance().update() && cc.GUIMapMng.getInstance().isNextLevelNew())
        {
            description = Resource.ChineseTxt["shareWithLevelWin1"] + (levelData.ID + 1) + Resource.ChineseTxt["shareWithLevelWin3"];
        }
        else if (levelData.CUR_SCORE.get() >= levelData.HISTORY_MAX_SCORE.get())
        {
            description = Resource.ChineseTxt["shareWithLevelWin2"] + (levelData.ID + 1) + Resource.ChineseTxt["shareWithLevelWin4"];
        }
        else
        {
            description = Resource.ChineseTxt["shareWithLevelWin1"] + (levelData.ID + 1) + Resource.ChineseTxt["shareWithLevelWin3"];
        }

        //
        var codeDesc = this.getCodeDesc();
        var shareUrl = Defines._GetShareUrl();
        var content = description + codeDesc + shareUrl;
        var preview = Resource.ChineseTxt["share_preview_0"];

        //设计尺寸和实际分辨率不一致的会导致好友界面显示不全
        if (sysViewPath && sysViewPath != "")
        {
            var picPath = _Share_PrintPic_Win(sysViewPath, codeDesc);
        }
        else
        {
            var scale = Defines.BASE_SCALE >= 1 ? 0.6 : 1;
            picPath = _Share_PrintScene(codeDesc, scale);
        }

        //
        var shareObj = this._createShareObj(content, preview, picPath);
        this.share(shareObj);

        //
        BIMng.getBISocial().logShare(levelData.NAME + " Success");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    shareWithNewMapStar: function(mapZoneID, allFinish)
    {
        if (allFinish)
        {
            var description = Resource.ChineseTxt["shareWithNewMapStar0"];
            var preview = Resource.ChineseTxt["share_preview_2"];
        }
        else
        {
            var mapNames = Resource.ChineseTxt["shareWithNewMapStar1"];
            var mapName = mapNames[mapZoneID] ? mapNames[mapZoneID] : Resource.ChineseTxt["shareWithNewMapStar2"];
            description = Resource.ChineseTxt["shareWithNewMapStar3"] + mapName + Resource.ChineseTxt["shareWithNewMapStar4"];
            preview = Resource.ChineseTxt["share_preview_1"];
        }

        //
        var codeDesc = this.getCodeDesc();
        var shareUrl = Defines._GetShareUrl();
        var content = description + codeDesc + shareUrl;

        var scale = Defines.BASE_SCALE >= 1 ? 0.6 : 1;
        var picPath = _Share_PrintScene(codeDesc, scale);

        //
        var shareObj = this._createShareObj(content, preview, picPath);
        this.share(shareObj);

        //
        var logName = allFinish ? "AllFinish" : (mapZoneID + 1);
        BIMng.getBISocial().logShare("UnlockNewMapStar_" + logName);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    shareWithSurpassFriends: function(levelData, friendsInfo)
    {
        //分享文字部分
        var levelTxt = "";

        var levelName = levelData.ID + 1;
        if (levelData.IS_SPACE_LEVEL)
        {
            var mapID = GUI._GetMapIDWithLevelData(levelData) + 1;
            levelTxt = Resource.ChineseTxt["shareWithSurpassFriends0"] + mapID + "-" + levelName + Resource.ChineseTxt["shareWithSurpassFriends1"];
        }
        else
        {
            levelTxt = Resource.ChineseTxt["shareWithSurpassFriends2"] + levelName + Resource.ChineseTxt["shareWithSurpassFriends1"];
        }

        var content_0 = Resource.ChineseTxt["shareWithSurpassFriends3"];
        var content_1 = Resource.ChineseTxt["shareWithSurpassFriends4"];

        var appends = "";
        friendsInfo.forEach(
            function(info)
            {
                var friendName = info.getName();
                if (friendName && friendName != "")
                {
                    appends += ("@" + friendName + " ");
                }
            }
        );

        var codeDesc = this.getCodeDesc();
        var shareUrl = Defines._GetShareUrl();
        var content = content_0 + appends + levelTxt + content_1 + codeDesc + shareUrl;
        var preview = Resource.ChineseTxt["share_preview_3"];

        //
        var picFriendName = friendsInfo[0].getName();
        var append = (picFriendName && picFriendName != "") ? ("@" + picFriendName + " ") : "";
        var picTitle = append + levelTxt + Resource.ChineseTxt["shareWithSurpassFriends5"];
        var picRes = _PublicizePath + "publicize_surpass_1.jpg";

        if (Defines.IS_EN || Defines.IS_KO){
            picRes = _PublicizePath + "publicize_share_EN.jpg";
        }

        var picPath = _Share_PrintPic_Surpass(picRes, 1, picTitle, friendsInfo[0], codeDesc);

        //
        var shareObj = this._createShareObj(content, preview, picPath);
        this.share(shareObj);

        //
        BIMng.getBISocial().logShare(levelData.NAME + " SurpassFriends");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    shareWithScoreTopUp: function(levelData, friendInfo)
    {
        //分享文字部分
        var levelTxt = "";

        var levelName = levelData.ID + 1;
        if (levelData.IS_SPACE_LEVEL)
        {
            var mapID = GUI._GetMapIDWithLevelData(levelData) + 1;
            levelTxt = Resource.ChineseTxt["shareWithSurpassFriends0"] + mapID + "-" + levelName + Resource.ChineseTxt["shareWithSurpassFriends1"];
        }
        else
        {
            levelTxt = Resource.ChineseTxt["shareWithSurpassFriends2"] + levelName + Resource.ChineseTxt["shareWithSurpassFriends1"];
        }

        var content_0 = Resource.ChineseTxt["shareWithSurpassFriends6"];
        var content_1 = Resource.ChineseTxt["shareWithSurpassFriends7"];

        var friendName = friendInfo.getName();
        var append = (friendName && friendName != "") ? ("@" + friendName + " ") : "";
        var codeDesc = this.getCodeDesc();
        var shareUrl = Defines._GetShareUrl();
        var content = content_0 + append + levelTxt + content_1 + codeDesc + shareUrl;
        var preview = Resource.ChineseTxt["share_preview_4"];

        //改为截屏
        var scale = Defines.BASE_SCALE >= 1 ? 0.6 : 1;
        var picPath = _Share_PrintScene(codeDesc, scale);

        var shareObj = this._createShareObj(content, preview, picPath);
        this.share(shareObj);

        //
        BIMng.getBISocial().logShare(levelData.NAME + " RankingRise");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    shareWithInviteFriends: function()
    {
        var shareUrl = Defines._GetShareUrl();
        var content = Resource.ChineseTxt["share_content_1"] + shareUrl;
        var preview = Resource.ChineseTxt["share_preview_5"];

        var randomPic = _Share_RandomPic();
        var picPath = _Share_PrintPic(randomPic, 1, "");

        var shareObj = this._createShareObj(content, preview, picPath);
        this.share(shareObj);

        //
        BIMng.getBISocial().logShare("InviteFriends");
        return this;
    },

    shareWithDailyWeChat: function(weichatFlag)
    {
        var codeDesc = this.getCodeDesc();
        var shareUrl = Defines._GetShareUrl();
        var content = Resource.ChineseTxt["share_content_0"] + codeDesc + shareUrl;

        var randomPic = _Share_RandomPic();
        var picPath = _Share_PrintPic(randomPic, 1, codeDesc);
        var shareClass =  share.Share.getInstance();
        if (weichatFlag == 1){
            var shareObj = this._createShareObj(content, "", picPath);
            _Share_ByWeChatCircle(shareObj);
        }
        else {
            var shareObj = this._createShareObj(content, "", picPath);
            _Share_ByWeChatFriend(shareObj);
        }
    },

    //------------------------------------------------------------------------------------------------------------------
    shareWithLoginFinish: function()
    {
        //
        var codeDesc = this.getCodeDesc();
        var shareUrl = Defines._GetShareUrl();
        var content = Resource.ChineseTxt["share_content_0"] + codeDesc + shareUrl;

        var randomPic = _Share_RandomPic();
        var picPath = _Share_PrintPic(randomPic, 1, codeDesc);

        //
        var shareClass =  share.Share.getInstance();

        if (_IsFacebook())
        {
            //
            picPath = _Share_PrintPic(_PublicizePath + "publicize_share_EN.jpg", 1, codeDesc);
            var shareObj = this._createShareObj(content, "", picPath);
            this.share(shareObj);

//            shareClass.shareToFacebook(content, picPath, false);
        }
        else if (_IsWeibo())
        {
            shareClass.shareToSinaWeibo(content, picPath, false);
        }
        else if (_IsRenren())
        {
            shareClass.shareToRenRen(content, picPath, false);
        }

        //
        BIMng.getBISocial().logShare("LoginFinish");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _test: function()
    {
        var levelID_0 = Tools.randomEx(cc.GUIMapMng.getInstance().getMaxMapLevelID() + 1) - 1;
        var levelID_1 = Tools.randomEx(cc.GUIMapMng.getInstance().getMaxSpaceLevelID() + 1) - 1;

        var levelData_0 = cc.DataMng.getInstance().getLevelDataWithID(levelID_0);
        var levelData_1 = cc.DataMng.getInstance().getLevelDataWithID(levelID_1, true);

        var mapID_0 = GUI._GetMapIDWithLevelData(levelData_0);
        var mapID_1 = GUI._GetMapIDWithLevelData(levelData_1);

        //1
        this.shareWithLevelWin(levelData_0);
        this.shareWithLevelWin(levelData_1);

        //2
        this.shareWithNewMapStar(mapID_0);
        this.shareWithNewMapStar(mapID_1);

        //
        this.shareWithSurpassFriends(levelData_0, ["llll", "jjjj", "wwww", "llll"]);
        this.shareWithSurpassFriends(levelData_1, ["llll", "jjjj", "wwww", "llll"]);

        //
        this.shareWithScoreTopUp(levelData_0, "llll");
        this.shareWithScoreTopUp(levelData_1, "llll");

        //
        this.shareWithLoginFinish();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    /**
     * 有界面控制是否可分享成功奖励
     */
    shareSuccess: function()
    {

        cc.log("canBouns: " + this.m_CanBonus);
        if (!this.m_CanBonus)
        {
            cc.log("ShareMng-----shareSuccess, 不给奖励");
            return this;
        }

        //
        if (this.isFirstShare())
        {
            cc.log("ShareMng-----FirstShare");
            cc.DataMng.getInstance().setFirstShare(false);
//            cc.DataMng.getInstance().addMoney(Defines.DIAMOND_REWARD.FIRST_SHARE, MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_SHARE); //分享成功
            BIMng.getBIDiamond().logDiamondIncome_Share(Defines.DIAMOND_REWARD.FIRST_SHARE);

            _MsgView_FirstShareBonus();
            return this;
        }

        //
        cc.log("ShareMng-----ShareSuccess");

        var self = this;


        var nBounsTag = this.m_CanBonus;
        cc.log("nBounsTag: " + nBounsTag);
        var funcDailyRewardCallback = function( bResult, bFlag)
        {
            cc.log("funcDailyRewardCallback: " + bResult);
            cc.log(bFlag);
            cc.log(nBounsTag);
            if(bResult)
            {
                if(bFlag)
                {
                    if(2 == nBounsTag)
                    {
                        cc.DataMng.getInstance().addHeart(1);
                        self.setRoleBouns(nBounsTag,true);
                        _MsgView_ShareBonus();
                    }
                    else
                    {
//                        cc.DataMng.getInstance().addMoney(100, MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_SHARE);
                        self.setRoleBouns(nBounsTag,true);
                    }

//                    cc.GUIMap.getInstance().notifiedUpdate();
                }
            }
            else
            {

            }
        };

        if(cc.NodeSelf.getInstance().isLogin())
        {
            cc.NodeSelf.getInstance().ReceiveDailyReward(nBounsTag, funcDailyRewardCallback);
        }
        else
        {
            cc.log("");
            if (this.m_CanBonus == 2){
                cc.DataMng.getInstance().addHeart(1);
//                self.setRoleBouns(nBounsTag,true);
                _MsgView_ShareBonus();
//                self.setRoleBouns(nBounsTag,true);
            }
            else {
//                cc.DataMng.getInstance().addMoney(100, MONEY_SOURCE_ADD.MONEY_SOURCE_ADD_SHARE);

            }
        }

		if (this.candyDailyState || this.diamondDailyState){
			if (this.m_CanBonus == 2){
                cc.log("setDiamondDaily");
				cc.DataMng.getInstance().setDiamondDaily();
				this.setCandyDailyState(false);
			}
			else {
                cc.log("setCandyDaily");
				cc.DataMng.getInstance().setCandyDaily();
				this.setCandyDailyState(false);
			}

		}
        cc.log("setCanBonus false");
		this.m_CanBonus = false;
        //记录
        /*ItemPack.getInstance().addHeartRecord(
            ItemRecord.create(HEART_SOURCE.SOURCE_ADD_HEART_BY_SHARE, 1)
        ).save();*/

//        _MsgView_ShareBonus();
        return this;
    }
});

//======================================================================================================================
ShareMng._instance = null;
ShareMng.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new ShareMng();
    }

    return this._instance;
};

//----------------------------------------------------------------------------------------------------------------------
var _Share_RandomPic = function()
{
    var picIndex = Tools.randomEx(Defines.SHARE_PIC_MAXNUM);
    picIndex = picIndex < 1 ? 1 : picIndex;
    picIndex = picIndex > Defines.SHARE_PIC_MAXNUM ? Defines.SHARE_PIC_MAXNUM : picIndex;

    if (Defines.IS_EN || Defines.IS_KO){
        return _PublicizePath + "publicize_share_EN.jpg";
    }
    else {
        return _PublicizePath + "publicize_share_" + picIndex + ".jpg";
    }

};

//----------------------------------------------------------------------------------------------------------------------
var _Share_PrintPic = function(resPath, scale, picTxt)
{
    if (!Defines.PLATFORM.isMobile())
    {
        return "";
    }

    //图像
    var printPic = cc.Sprite.create(resPath);
    printPic.setAnchorPoint(cc.p(0, 0));

    //文字
    if (picTxt && picTxt != "")
    {
        var printTxt = cc.LabelTTF.create(picTxt, "黑体", 28);
        printPic.addChild(printTxt);
        printTxt.setAnchorPoint(cc.p(0, 0));
        printTxt.setPosition(cc.p(5, 5));
    }

    //总Layer
    var printLayer = cc.Layer.create();
    printLayer.setAnchorPoint(cc.p(0, 0));
    printLayer.setContentSize(printPic.getContentSize());

    //
    printLayer.addChild(printPic);

    //
    var runningScene = cc.Director.getInstance().getRunningScene();
    runningScene.addChild(printLayer, 0, Defines.PRINT_TAG);
    printLayer.setPosition(cc.p(0, 0));
    printLayer.setVisible(false);

    var configClass = wrapperConfig.Config.getInstance();
    var picPath = configClass.printLayer(Defines.PRINT_TAG, scale || 1);

    runningScene.removeChildByTag(Defines.PRINT_TAG);
    cc.ResourceMng.getInstance().removeTextureCache(resPath);
    return picPath;
};

//----------------------------------------------------------------------------------------------------------------------
var _Share_PrintPic_Win = function(resPath, picTxt)
{
    if (!Defines.PLATFORM.isMobile())
    {
        return "";
    }

    //总Layer
    var printLayer = cc.LayerColor.create(cc.c4(0, 0, 0, 255));
    printLayer.setAnchorPoint(cc.p(0, 0));

    //文字
    var txtHeight = 0;
    if (picTxt && picTxt != "")
    {
        txtHeight = 36;
        var printTxt = cc.LabelTTF.create(picTxt, Defines.DefaultFont, 18);
        printLayer.addChild(printTxt);
        printTxt.setAnchorPoint(cc.p(0, 0.5));
        printTxt.setPosition(cc.p(5, txtHeight/2));
    }

    //图像
    var printPic = cc.Sprite.create(resPath);
    printLayer.addChild(printPic);
    printPic.setAnchorPoint(cc.p(0, 0));
    printPic.setScale(960 * 0.6 / printPic.getContentSize().width);
    printPic.setPosition(cc.p(0, txtHeight));

    var picBound = printPic.getBoundingBox();
    printLayer.setContentSize(cc.size(picBound.width, picBound.height + txtHeight));

    //
    var runningScene = cc.Director.getInstance().getRunningScene();
    runningScene.addChild(printLayer, 0, Defines.PRINT_TAG);
    printLayer.setPosition(cc.p(0, 0));
    printLayer.setVisible(false);

    var configClass = wrapperConfig.Config.getInstance();
    var picPath = configClass.printLayer(Defines.PRINT_TAG, 1);

    runningScene.removeChildByTag(Defines.PRINT_TAG);
    cc.ResourceMng.getInstance().removeTextureCache(resPath);
    return picPath;
};

//----------------------------------------------------------------------------------------------------------------------
var _Share_PrintPic_Surpass = function(resPath, scale, picTitle, friendInfo, codeDesc)
{
    if (!Defines.PLATFORM.isMobile())
    {
        return "";
    }

    //图像
    var printPic = cc.Sprite.create(resPath);
    printPic.setAnchorPoint(cc.p(0, 0));
    var picSize = printPic.getContentSize();

    //标题
    if (picTitle && picTitle != "")
    {
        var printTitle = cc.LabelTTF.create(picTitle, Defines.DefaultFont, 24);
        printPic.addChild(printTitle);
        printTitle.setPosition(cc.p(picSize.width/2, picSize.height - 45));
        printTitle.setColor(cc.c3b(119, 112, 114));
    }

    //头像
    var photoTemp = cc.Sprite.createWithSpriteFrameName("general_default_photo_1.png");
    printPic.addChild(photoTemp);
    photoTemp.setPosition(cc.p(291, 105));
    var photoSize = photoTemp.getContentSize();
    photoTemp.setScaleX(70/ photoSize.width);
    photoTemp.setScaleY(70/ photoSize.height);

    var photoUrl = friendInfo.getPhotoUrl();
    if (photoUrl)
    {
        var photo = cc.Sprite.create(photoUrl);
        if (photo)
        {
            photoTemp.addChild(photo);
            photo.setPosition(cc.p(photoSize.width/2, photoSize.height/2));
            photo.setScaleX(photoSize.width/ photo.getContentSize().width);
            photo.setScaleY(photoSize.height/ photo.getContentSize().height);
        }
    }

    //@好友
    var friendName = friendInfo.getName();
    if (friendName && friendName != "")
    {
        var labelName = cc.LabelTTF.create("@" + friendName, Defines.DefaultFont, 24);
        printPic.addChild(labelName);
        labelName.setAnchorPoint(cc.p(0, 0.5));
        labelName.setPosition(cc.p(338, 85));
        labelName.setColor(cc.c3b(61, 81, 88));
    }

    //兑换码
    if (codeDesc && codeDesc != "")
    {
        var labelCode = cc.LabelTTF.create(codeDesc, Defines.DefaultFont, 28);
        printPic.addChild(labelCode);
        labelCode.setAnchorPoint(cc.p(0, 0.5));
        labelCode.setPosition(cc.p(10, 25));
        labelCode.setColor(cc.c3b(26, 79, 19));
    }

    //总Layer
    var printLayer = cc.Layer.create();
    printLayer.setContentSize(picSize);

    //
    printLayer.addChild(printPic);

    //
    var runningScene = cc.Director.getInstance().getRunningScene();
    runningScene.addChild(printLayer, 0, Defines.PRINT_TAG);
    printLayer.setVisible(false);

    var configClass = wrapperConfig.Config.getInstance();
    var picPath = configClass.printLayer(Defines.PRINT_TAG, scale || 1);

    runningScene.removeChildByTag(Defines.PRINT_TAG);
    return picPath;
};

//----------------------------------------------------------------------------------------------------------------------
var _Share_PrintScene = function(picTxt, scale)
{
    if (!Defines.PLATFORM.isMobile())
    {
        return "";
    }

    var txtHeight = 0;
    var runningScene = cc.Director.getInstance().getRunningScene();

    //文字
    if (picTxt && picTxt != "")
    {
        txtHeight = 60;
        var txtLayer = cc.LayerColor.create(cc.c4(0, 0, 0, 255));
        txtLayer.setContentSize(cc.size(_ScreenWidth(), txtHeight));
        runningScene.addChild(txtLayer, 100000, Defines.PRINT_TAG);
        txtLayer.setPosition(cc.p(0, -1 * txtHeight));

        var printTxt = cc.LabelTTF.create(picTxt, Defines.DefaultFont, 30);
        txtLayer.addChild(printTxt);
        printTxt.setAnchorPoint(cc.p(0, 0.5));
        printTxt.setPosition(cc.p(5, txtHeight/2));
    }

    //
    var configClass = wrapperConfig.Config.getInstance();
    var picPath = configClass.printScene(scale || 1, txtHeight);

    //
    runningScene.removeChildByTag(Defines.PRINT_TAG);
    return picPath;
};

//----------------------------------------------------------------------------------------------------------------------
var _Share_PrintSysView = function()
{
    if (!Defines.PLATFORM.isMobile())
    {
        return "";
    }

    var configClass = wrapperConfig.Config.getInstance();
    return configClass.printSystemView();
};
