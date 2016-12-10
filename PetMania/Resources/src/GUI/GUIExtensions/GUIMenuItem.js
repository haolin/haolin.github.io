
//======================================================================================================================
cc.GUIMenuItem = cc.Node.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();

        this._listener = null;
        this._selector = null;
        this._isSelected = false;
        this._isEnabled = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    initWithCallback:function (selector, rec)
    {
        this.setAnchorPoint(cc.p(0.5, 0.5));
        this._listener = rec;
        this._selector = selector;
        this._isEnabled = true;
        this._isSelected = false;
        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    isSelected:function ()
    {
        return this._isSelected;
    },

    //------------------------------------------------------------------------------------------------------------------
    setTarget:function (selector, rec)
    {
        this._listener = rec;
        this._selector = selector;
    },

    //------------------------------------------------------------------------------------------------------------------
    isEnabled:function ()
    {
        return this._isEnabled;
    },

    //------------------------------------------------------------------------------------------------------------------
    setEnabled:function (enable)
    {
        this._isEnabled = enable;
    },

    //------------------------------------------------------------------------------------------------------------------
    rect:function ()
    {
        return cc.rect(this._position.x - this.getContentSize().width * this.getAnchorPoint().x,
            this._position.y - this.getContentSize().height * this.getAnchorPoint().y,
            this.getContentSize().width, this.getContentSize().height);
    },

    //------------------------------------------------------------------------------------------------------------------
    selected:function ()
    {
        this._isSelected = true;
    },

    //------------------------------------------------------------------------------------------------------------------
    unselected:function ()
    {
        this._isSelected = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    setCallback:function (selector, rec)
    {
        this._listener = rec;
        this._selector = selector;
    },

    //------------------------------------------------------------------------------------------------------------------
    activate:function ()
    {
        if (this._isEnabled)
        {
            if (this._listener && (typeof(this._selector) == "string"))
            {
                this._listener[this._selector](this);
            }
            else if (this._listener && (typeof(this._selector) == "function"))
            {
                this._selector.call(this._listener, this);
            }
            else
            {
                this._selector(this);
            }
        }

        return this;
    }
});

cc.GUIMenuItem.create = function (selector, rec)
{
    var ret = new cc.GUIMenuItem();
    ret.initWithCallback(rec, selector);
    return ret;
};

//======================================================================================================================
cc.GUIMenuItemSprite = cc.GUIMenuItem.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function ()
    {
        this._super();
        this._sprite = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    initWithSprite:function (sprite, selector, target)
    {
        this.initWithCallback(selector, target);
        this.setSprite(sprite);
        return true;
    },

    //------------------------------------------------------------------------------------------------------------------
    setSprite:function (sprite)
    {
        if (sprite)
        {
            this.addChild(sprite);
            sprite.setAnchorPoint(cc.p(0, 0));
            this.setContentSize(sprite.getContentSize());
        }

        if (this._sprite)
        {
            this.removeChild(this._sprite, true);
        }

        this._sprite = sprite;
    },

    //------------------------------------------------------------------------------------------------------------------
    getSprite:function ()
    {
        return this._sprite;
    },

    //------------------------------------------------------------------------------------------------------------------
    activate:function ()
    {
        if (this._isEnabled)
        {
            this.stopAllActions();
            this.setScale(1);
            this._super();
        }
    },

    //------------------------------------------------------------------------------------------------------------------
    selected:function ()
    {
        if (this._isEnabled)
        {
            this._super();
            this.setScale(0.9);
        }
    },

    //------------------------------------------------------------------------------------------------------------------
    unselected:function ()
    {
        if (this._isEnabled)
        {
            this._super();
            this.setScale(1);
        }
    }

    //------------------------------------------------------------------------------------------------------------------
});

cc.GUIMenuItemSprite.create = function (sprite, selector, target)
{
    var ret = new cc.GUIMenuItemSprite();
    ret.initWithSprite(sprite, selector, target);
    return ret;
};