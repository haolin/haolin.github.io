/**
 * Created by hong.zhang on 2014/8/14.
 */

cc.GUIFirstLoginTipNew = cc.GUIWindow.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function ()
    {
        this._super();

        this.m_showNum = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    description : function ()
    {
        return  "GUIFirstLoginTipNew";
    },

    //------------------------------------------------------------------------------------------------------------------
    init : function ()
    {
        this._super();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent : function ()
    {
        // 使用九宫格方式创建面板
        var srcSprite = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png");
        var srcSize = srcSprite.getContentSize();

        var targetSize = cc.size(_ScreenWidth() * 0.92, _ScreenHeight() * 0.82);
        var panel = cc.Scale9Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png",
            cc.rect(0, 0, srcSize.width, srcSize.height),
            cc.rect(srcSize.width * 0.3, srcSize.height * 0.3, srcSize.width * 0.4, srcSize.height * 0.4));

        //
        panel.setPreferredSize(targetSize);
        panel.setAnchorPoint(cc.p(0.5, 0.5));
        panel.setPosition(cc.p(_ScreenWidth()/2, _ScreenHeight()/2));
        this.getWindow().addChild(panel);

        var buttonClose = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_btn_close_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_btn_close_sel.png"),
            this._btnCloseCallback, this);
        buttonClose.setPosition(
            cc.p(targetSize.width - 15 * Defines.BASE_SCALE, targetSize.height - 15 * Defines.BASE_SCALE));

        var toNewMenu = cc.Menu.create(buttonClose);
        toNewMenu.setPosition(cc.p(0, 0));
        panel.addChild(toNewMenu);
        var i = 0;

        var strText = "";
        var nHeight = 0;
        var layerText = cc.Layer.create();

        if(1 == this.m_showNum)
        {
            var nAddHeight = 0;
            for(var i = 4; i >= 0 ; --i)
            {
                strText = 0 == i ? Resource.KoreanTxt["first_tip_full"] : Resource.KoreanTxt["first_tip_full_" + i];
                var labelText = cc.LabelTTF.create(strText,Defines.DefaultFont,14 * Defines.BASE_SCALE);
                labelText.setString(strText);
//                labelText.setDimensions(cc.size(_ScreenWidth() * 0.86,500*Defines.BASE_SCALE));
                labelText.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
                labelText.setAnchorPoint(cc.p(0,0));
                labelText.setPosition(cc.p(0,nAddHeight));
                layerText.addChild(labelText);
                nAddHeight = nAddHeight + labelText.getContentSize().height;
            }

            nHeight = nAddHeight;
        }
        else if(2 == this.m_showNum)
        {
            var nAddHeight = 0;
            for(var i = 8; i > 0 ; --i)
            {
                strText = Resource.KoreanTxt["second_tip_full_" + i];
                var labelText = cc.LabelTTF.create(strText,Defines.DefaultFont,14 * Defines.BASE_SCALE);
                labelText.setString(strText);
//                labelText.setDimensions(cc.size(_ScreenWidth() * 0.86,nHeight));
                labelText.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
                labelText.setAnchorPoint(cc.p(0,0));
                labelText.setPosition(cc.p(0,nAddHeight));
                layerText.addChild(labelText);
                nAddHeight = nAddHeight + labelText.getContentSize().height;
            }

            nHeight = nAddHeight;
        }

        layerText.setAnchorPoint(cc.p(0,0));
        layerText.setPosition(cc.p(0,0));
        layerText.setContentSize(cc.size(_ScreenWidth() * 0.88,nHeight));
        var scrollLabel = cc.ScrollView.create(cc.size(_ScreenWidth() * 0.88,_ScreenHeight() * 0.78),layerText);
        scrollLabel.setPosition(cc.p(_ScreenWidth() * 0.02,_ScreenHeight() * 0.02));
        scrollLabel.setContentOffset(cc.p(0,(-1)*nHeight + _ScreenHeight() * 0.78));
        scrollLabel.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
//        scrollLabel.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
//        scrollLabel.setBounceable(false);
        panel.addChild(scrollLabel);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnCloseCallback: function()
    {
        if (!this.isWindowOpen())
        {
            return this;
        }

        //
        cc.AudioMng.getInstance().playButtonSound(true);

        //
        this.closeWindow();

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    scrollViewDidScroll:function (view)
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    scrollViewDidZoom:function (view)
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow : function (render, showNum)
    {
        this._super(render);

        this.m_showNum = showNum;
        this.addContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow : function ()
    {
        this._super();
        this.getWindow().removeAllChildren(true);
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});


cc.GUIFirstLoginTipNew._instance = null;
cc.GUIFirstLoginTipNew.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUIFirstLoginTipNew();
        this._instance.init();
    }

    return this._instance;
};