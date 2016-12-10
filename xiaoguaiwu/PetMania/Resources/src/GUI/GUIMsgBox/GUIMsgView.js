
//======================================================================================================================
cc.GUIMsgView = cc.GUIWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "GUIMsgView";
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function(msgStr, viewSize)
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 225));
        this.getWindow().addChild(blockLayer, -1);

        //
        var msgLabel = cc.LabelTTF.create(msgStr, Defines.DefaultFont, 20 * Defines.BASE_SCALE);
        blockLayer.addChild(msgLabel);

        //
        var msgSize = msgLabel.getContentSize();
        viewSize = viewSize ? viewSize : cc.size(msgSize.width + 50 * Defines.BASE_SCALE, msgSize.height + 30 * Defines.BASE_SCALE);

        //
        msgLabel.setPosition(cc.p(viewSize.width * 0.5, viewSize.height * 0.5));
        blockLayer.setContentSize(cc.size(viewSize.width, viewSize.height));
        if (msgStr == Resource.ChineseTxt["showTotalLevel"]){
            blockLayer.setPosition(cc.p(_ScreenWidth() * 0.5 - viewSize.width * 0.5, _ScreenHeight() * 0.57));
        }
        else {
            blockLayer.setPosition(cc.p(_ScreenWidth() * 0.5 - viewSize.width * 0.5, _ScreenHeight() * 0.8));
        }


        //
        blockLayer.runAction(cc.Sequence.create(
            cc.DelayTime.create(2.0),
            cc.FadeOut.create(0.1),
            cc.CallFunc.create(this.closeWindow, this)
        ));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render, msgStr, viewSize)
    {
        this._super(render);

        //
        this.getWindow().getParent().reorderChild(this.getWindow(), 1000000);

        //
        this.getWindow().removeAllChildren(true);
        this.addContent(msgStr, viewSize);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        //
        this.getWindow().removeAllChildren(true);

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIMsgView._instance = null;
cc.GUIMsgView.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIMsgView();
        this._instance.init();
    }

    return this._instance;
};

//----------------------------------------------------------------------------------------------------------------------
//奖励码兑换结果
var _MsgView_CodeBonus = function(msgStr)
{
    var runningScene = cc.Director.getInstance().getRunningScene();
    cc.GUIMsgView.getInstance().openWindow(runningScene, msgStr);
};

//----------------------------------------------------------------------------------------------------------------------
//首次登陆
var _MsgView_FirstLogin = function()
{
    cc.GUIMsgView.getInstance().openWindow(cc.Director.getInstance().getRunningScene(),
        Resource.ChineseTxt[200]);
};

//----------------------------------------------------------------------------------------------------------------------
//邀请好友
var _MsgView_InviteFriend = function(result)
{
    var msgStr = result ? Resource.ChineseTxt[192] : Resource.ChineseTxt[193];
    cc.GUIMsgView.getInstance().openWindow(cc.Director.getInstance().getRunningScene(), msgStr);
};

//----------------------------------------------------------------------------------------------------------------------
//获取设备标识失败
var _MsgView_ApplyDeviceIDFail = function()
{
    var msgStr = Resource.ChineseTxt["msg_0"];
    cc.GUIMsgView.getInstance().openWindow(cc.Director.getInstance().getRunningScene(), msgStr);
};

//----------------------------------------------------------------------------------------------------------------------
//购买数量超限
var _MsgView_BuyUpperLimit = function()
{
//    var msgStr = Defines.IS_EN ? "This would be over the maximum storage, try later." : "超过库存上限了，亲，消耗一些再来光顾吧！";
    var msgStr = Resource.ChineseTxt["item_max"];
    cc.GUIMsgView.getInstance().openWindow(cc.Director.getInstance().getRunningScene(), msgStr);
};

//----------------------------------------------------------------------------------------------------------------------
//已在无限薄荷糖状态
var _MsgView_FreeCandyFlag = function()
{
    var msgStr = Resource.KoreanTxt["free_candy_max"];
    cc.GUIMsgView.getInstance().openWindow(cc.Director.getInstance().getRunningScene(), msgStr);
};

//----------------------------------------------------------------------------------------------------------------------
//首次分享奖励10钻石
var _MsgView_FirstShareBonus = function()
{
    var msgStr = Resource.ChineseTxt["share_succ_0"];
    cc.GUIMsgView.getInstance().openWindow(cc.Director.getInstance().getRunningScene(), msgStr);
};

//----------------------------------------------------------------------------------------------------------------------
//分享奖励1薄荷糖
var _MsgView_ShareBonus = function()
{
    var msgStr = Resource.ChineseTxt["share_succ_1"];
    cc.GUIMsgView.getInstance().openWindow(cc.Director.getInstance().getRunningScene(), msgStr);
};