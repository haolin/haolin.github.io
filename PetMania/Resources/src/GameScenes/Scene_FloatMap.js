
var Scene_FloatMap = cc.Scene.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(curMapDefine, appendWindow)
    {
        this._super();
        cc.associateWithNative(this, cc.Scene);

        this.m_CurMapDefine = curMapDefine;
        this.m_AppendWindow = appendWindow;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Scene_FloatMap";
    },

    //------------------------------------------------------------------------------------------------------------------
    onEnter: function()
    {
        this._super();

        cc.log("进入 Scene_FloatMap 场景  **********************");

        //
        if (this.m_AppendWindow)
        {
            this.m_CurMapDefine = GUI._GetMapDefineWithLevelData(this.m_AppendWindow.m_LevelData);
        }

        //
        cc.GUIFloatMap.getInstance().openWindow(this, this.m_CurMapDefine);

        //结算界面
        if (this.m_AppendWindow && this.m_AppendWindow instanceof cc.GUIGameLevelEndWin)
        {
            this.enterEndWin();
        }
        else if (this.m_AppendWindow && this.m_AppendWindow instanceof cc.GUIGameLevelEndFail)
        {
            this.enterEndFail();
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    enterEndWin: function()
    {
        //
        cc.AudioMng.getInstance().playGameSuccessMusic();
//        cc.AudioMng.getInstance().playGameSuccessSound();
        cc.GUIFloatMap.getInstance().handleFloatLeaveAction(false);

        //
        var isNextNew = cc.DataMng.getFloatLevel().isNextFloatLevelNew(this.m_CurMapDefine.ID);
        isNextNew && cc.DataMng.getFloatLevel().syncMaxProcessState();

        //抽奖
        if (isNextNew)
        {
            //
            var floatData = cc.GUIGameLevelEndWin.getInstance().m_LevelData;
            var floatIndex = floatData.ID - this.m_CurMapDefine.MIN_FLOAT_ID;

            //
            var levelBonus = cc.GUIBonus_Level.create(floatIndex);
            if (levelBonus)
            {
                cc.GUIBonus.getInstance().openWindow(this, levelBonus);
                return this;
            }
        }

        //正常流程
        cc.GUIGameLevelEndWin.getInstance().openWindow(this);

        //
        if(!isTelcomOperators() && cc.NodeSelf.getInstance().isLogin())
        {
            cc.GUIMyFriendsTop.getInstance().openWindow(this, cc.GUIGameLevelEndWin.getInstance());
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    enterEndFail: function()
    {
        //new
        cc.AudioMng.getInstance().playGameFailedMusic();
//        cc.AudioMng.getInstance().playGameFailedSound();

        //
        cc.GUIFloatMap.getInstance().handleFloatLeaveAction(false);
        cc.GUIGameLevelEndFail.getInstance().openWindow(this);

        //
        if(!isTelcomOperators()&& cc.NodeSelf.getInstance().isLogin())
        {
            cc.GUIMyFriendsTop.getInstance().openWindow(this, cc.GUIGameLevelEndFail.getInstance());
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    onExit: function()
    {
        this._super();

        cc.log("离开 Scene_FloatMap 场景  **********************");

        cc.GUIFloatMap.getInstance().closeWindow();

        //
        this.m_CurMapDefine = null;
        this.m_AppendWindow = null;

        this.removeAllChildren(true);
        return this;
    }
});


//
Scene_FloatMap.create = function(curMapDefine, appendWindow)
{
    return new Scene_FloatMap(curMapDefine, appendWindow);
};

Scene_FloatMap.changeTo = function(curMapDefine, appendWindow)
{
    cc.Director.getInstance().replaceScene(Scene_FloatMap.create(curMapDefine, appendWindow));
};