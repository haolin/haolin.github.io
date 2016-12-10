//======================================================================================================================
var GUITeachAndHelpContent = cc.Class.extend({

    //==================================================================================================================
    ctor: function()
    {

    },

    //==================================================================================================================
    display: function()
    {
        return this;
    }
});

//======================================================================================================================
var GUITeachAndHelpContent_0 = GUITeachAndHelpContent.extend({

    //==================================================================================================================
    ctor: function()
    {
        this._super();
        cc.log("连接3只同色小怪可以消除它们");
    },

    //==================================================================================================================
    display: function(layer)
    {
        //
        var size = layer.getContentSize();

        //
        var spr = cc.Sprite.createWithSpriteFrameName("GUITeachAndHelp_1.png");
        layer.addChild(spr);
        spr.setPosition(cc.p(size.width/2, size.height/2 - 30 * Defines.BASE_SCALE));

        //
        var label = cc.LabelTTF.create(Resource.ChineseTxt["teach_0"], "Arial", 24 * Defines.BASE_SCALE);
        layer.addChild(label);
        label.setAnchorPoint(cc.p(0.5, 0.5));
        label.setPosition(cc.p(size.width/2, size.height/2 + 50 * Defines.BASE_SCALE));


        return this;
    }
});

//======================================================================================================================
var GUITeachAndHelpContent_1 = GUITeachAndHelpContent.extend({

    //==================================================================================================================
    ctor: function()
    {
        this._super();
        cc.log("连接更多同色小怪可生成特殊怪物");
    },

    //==================================================================================================================
    display: function(layer)
    {
        //
        var size = layer.getContentSize();

        //
        var spr = cc.Sprite.createWithSpriteFrameName("GUITeachAndHelp_2.png");
        layer.addChild(spr);
        spr.setPosition(cc.p(size.width/2, size.height/2));

        //
        if (Defines.IS_EN ){
            var label = cc.LabelTTF.create(Resource.ChineseTxt["teach_1"], "Arial", 17 * Defines.BASE_SCALE);
        }
		else if (Defines.IS_KO){
            var label = cc.LabelTTF.create(Resource.ChineseTxt["teach_1"], "Arial", 13 * Defines.BASE_SCALE);
		}
        else{
            var label = cc.LabelTTF.create(Resource.ChineseTxt["teach_1"], "Arial", 24 * Defines.BASE_SCALE);
        }

        layer.addChild(label);
        label.setAnchorPoint(cc.p(0.5, 0.5));
        label.setPosition(cc.p(size.width/2, size.height/2 + 140 * Defines.BASE_SCALE));

        return this;
    }
});

//======================================================================================================================
var GUITeachAndHelpContent_2 = GUITeachAndHelpContent.extend({

    //==================================================================================================================
    ctor: function()
    {
        this._super();
        cc.log("相邻2个特殊怪物可以直接互相消除");
    },

    //==================================================================================================================
    display: function(layer)
    {
        //
        var size = layer.getContentSize();

        //
        var spr = cc.Sprite.createWithSpriteFrameName("GUITeachAndHelp_3.png");
        layer.addChild(spr);
        spr.setPosition(cc.p(size.width/2, size.height/2 - 30 * Defines.BASE_SCALE));

        //
        var label = cc.LabelTTF.create(Resource.ChineseTxt["teach_2"], "Arial", 24 * Defines.BASE_SCALE);
        layer.addChild(label);
        label.setAnchorPoint(cc.p(0.5, 0.5));
        label.setPosition(cc.p(size.width/2, size.height/2 + 90 * Defines.BASE_SCALE));

        return this;
    }
});

//======================================================================================================================
var GUITeachAndHelpContent_3 = GUITeachAndHelpContent.extend({

    //==================================================================================================================
    ctor: function()
    {
        this._super();
        cc.log("游戏中需要完成目标才能过关");
    },

    //==================================================================================================================
    display: function(layer)
    {
        //
        var size = layer.getContentSize();

        //
        var spr = cc.Sprite.createWithSpriteFrameName("GUITeachAndHelp_4.png");
        layer.addChild(spr);
        spr.setPosition(cc.p(size.width/2, size.height/2 - 30 * Defines.BASE_SCALE));

        //
        var label = cc.LabelTTF.create(Resource.ChineseTxt["teach_3"], "Arial", 24 * Defines.BASE_SCALE);
        layer.addChild(label);
        label.setAnchorPoint(cc.p(0.5, 0.5));
        label.setPosition(cc.p(size.width/2, size.height/2 + 120 * Defines.BASE_SCALE));

        return this;
    }
});


//======================================================================================================================
var GUITeachAndHelpContent_4 = GUITeachAndHelpContent.extend({

    //==================================================================================================================
    ctor: function()
    {
        this._super();
        cc.log("各种障碍物会影响你的操作，先把他们干掉吧!");
    },

    //==================================================================================================================
    display: function(layer)
    {
        //
        var size = layer.getContentSize();

        //
        var spr = cc.Sprite.createWithSpriteFrameName("GUITeachAndHelp_5.png");
        layer.addChild(spr);
        spr.setPosition(cc.p(size.width/2, size.height/2 - 30 * Defines.BASE_SCALE));

        //
        var label = cc.LabelTTF.create(Resource.ChineseTxt["teach_4"], "Arial", 24 * Defines.BASE_SCALE);
        layer.addChild(label);
        label.setAnchorPoint(cc.p(0.5, 0.5));
        label.setPosition(cc.p(size.width/2, size.height/2 + 100 * Defines.BASE_SCALE));

        return this;
    }
});


//======================================================================================================================
var GUITeachAndHelpContent_5 = GUITeachAndHelpContent.extend({

    //==================================================================================================================
    ctor: function()
    {
        this._super();
        cc.log("使用道具可以帮助你顺利过关,\n      马上开始挑战吧!");
    },

    //==================================================================================================================
    display: function(layer)
    {
        //
        var size = layer.getContentSize();

        //
        var spr = cc.Sprite.createWithSpriteFrameName("GUITeachAndHelp_6.png");
        layer.addChild(spr);
        spr.setPosition(cc.p(size.width/2, size.height/2 - 70 * Defines.BASE_SCALE));

        //
        var label = cc.LabelTTF.create(Resource.ChineseTxt["teach_5"], "Arial", 24 * Defines.BASE_SCALE);
        layer.addChild(label);
        label.setAnchorPoint(cc.p(0.5, 0.5));
        label.setPosition(cc.p(size.width/2, size.height/2 + 100 * Defines.BASE_SCALE));

        return this;
    }
});

//======================================================================================================================
cc.GUITeachAndHelp = cc.GUIPopupWindow.extend ({

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "GUITeachAndHelp";
    },

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        //
        this.m_MainUI = null;
        this.m_NextButton = null;
        this.m_FinishButton = null;

        //
        this.m_BackSize = cc.size(510 * Defines.BASE_SCALE, 400 * Defines.BASE_SCALE);
        this.m_DisplayIndex = 0;
        this.m_ContentTag = 1000;
        this.m_DisplayArray = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function ()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addDisplay: function(display)
    {
        this.m_DisplayArray.push(display);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    resetDisplay: function()
    {
        this.m_DisplayIndex = 0;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    nextDisplay: function()
    {
        ++this.m_DisplayIndex;
        if (this.m_DisplayIndex >= this.m_DisplayArray.length - 1)
        {
            this.m_DisplayIndex = this.m_DisplayArray.length - 1;
            this.m_NextButton.setVisible(false);
            this.m_FinishButton.setVisible(true);
        }

        this.displayContent();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    displayContent: function()
    {
        var display = this.m_DisplayArray[this.m_DisplayIndex];
        if (!display)
        {
            cc.log("m_DisplayIndex = " + this.m_DisplayIndex);
            return this;
        }

        //
        this.m_MainUI.removeChildByTag(this.m_ContentTag);

        //
        var layer = cc.Layer.create();
        layer.setContentSize(this.m_BackSize);

        //
        if (layer)
        {
            this.m_MainUI.addChild(layer, 0, this.m_ContentTag);
            display.display(layer);
            layer.setPosition(cc.p(0, 0));
        }

        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    addContent: function()
    {
        //
        var blockLayer = cc.LayerColor.create(cc.c4(32, 32, 32, 150));
        this.getWindow().addChild(blockLayer, -1);

        //
        var tmp = cc.Sprite.create(_GUIPath + "GUINewGeneral/general_back9.png");
        var srcSize = tmp.getContentSize();

        //
        this.m_MainUI = cc.Scale9Sprite.create(
            _GUIPath + "GUINewGeneral/general_back9.png",
            cc.rect(0, 0, srcSize.width, srcSize.height),
            cc.rect(srcSize.width * 0.3, srcSize.height * 0.3, srcSize.width * 0.4, srcSize.height * 0.4));

        //
        this.m_MainUI.setContentSize(this.m_BackSize);
        this.getWindow().addChild(this.m_MainUI);
        this.m_MainUI.setPosition(_ScreenCenter());

        //
        this.displayContent();

        //
        this.m_NextButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_next_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_next_sel.png"),
            this._btnNextCallback,
            this);

        //
        this.m_NextButton.setPosition(cc.p(this.m_BackSize.width/2, 30 * Defines.BASE_SCALE));

        //
        this.m_FinishButton = cc.MenuItemSprite.create(
            cc.Sprite.createWithSpriteFrameName("general_skip_nor.png"),
            cc.Sprite.createWithSpriteFrameName("general_skip_sel.png"),
            this._btnSkipCallback,
            this);

        //
        this.m_FinishButton.setVisible(false);
        this.m_FinishButton.setPosition(cc.p(this.m_BackSize.width/2, 30 * Defines.BASE_SCALE));

        var menu = cc.Menu.create(this.m_NextButton, this.m_FinishButton);
        menu.setPosition(cc.p(0, 0));
        this.m_MainUI.addChild(menu, 10000);

        //
        GUI._AddCloseButton(this.m_MainUI, this.closeWindow, this);

        //
        var topSprPanel = cc.Sprite.createWithSpriteFrameName("general_level_title_bg.png");
        var sizeTop = topSprPanel.getContentSize();

        //
        var topSprContent = cc.Sprite.createWithSpriteFrameName("GUITeachAndHelp_Top.png");
        topSprPanel.addChild(topSprContent);
        topSprContent.setPosition(cc.p(sizeTop.width/2, sizeTop.height/2));

        //
        this.m_MainUI.addChild(topSprPanel);
        topSprPanel.setPosition(cc.p(this.m_BackSize.width/2, this.m_BackSize.height - 10 * Defines.BASE_SCALE));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnNextCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        this.nextDisplay();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _btnSkipCallback: function()
    {
        cc.AudioMng.getInstance().playButtonSound(true);
        this.closeWindow();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        //
        cc.ResourceMng.getInstance().addToCache(
            Resource._GUITeachAndHelp_plist,
            Resource._GUITeachAndHelp_png);

        //
        this._super(render);
        this.getWindow().removeAllChildren(true);
        this.resetDisplay();
        this.addContent();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        //
        this._super();
        this.getWindow().removeAllChildren(true);

        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource._GUITeachAndHelp_plist,
            Resource._GUITeachAndHelp_png);

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
});


cc.GUITeachAndHelp._instance = null;
cc.GUITeachAndHelp.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.GUITeachAndHelp();
        this._instance.init();

        //添加6个教学 以后可以扩展
        this._instance.addDisplay(new GUITeachAndHelpContent_0());
        this._instance.addDisplay(new GUITeachAndHelpContent_1());
        this._instance.addDisplay(new GUITeachAndHelpContent_2());
        this._instance.addDisplay(new GUITeachAndHelpContent_3());
        this._instance.addDisplay(new GUITeachAndHelpContent_4());
        this._instance.addDisplay(new GUITeachAndHelpContent_5());
    }

    return this._instance;
};