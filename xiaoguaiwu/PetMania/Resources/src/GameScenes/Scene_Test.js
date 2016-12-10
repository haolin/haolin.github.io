
var Scene_Test = cc.Scene.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super();
        cc.associateWithNative(this, cc.Scene);

        //
        this._layer = null;

        //
        this._surpassFriends = 1;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Scene_Test";
    },

    //------------------------------------------------------------------------------------------------------------------
    onEnter: function()
    {
        this._super();
        cc.log("进入 Scene_Test 场景  **********************");

        //
        this._layer = cc.LayerColor.create(cc.c4b(128, 128, 128, 128));
        this.addChild(this._layer, -1);

        //
        this._layer.setTouchEnabled(true);
        var self = this;
        this._layer.onTouchesBegan = function(touches)
        {
            return self.handleTouchesBegan(touches);
        };

        //
        cc.ArmatureDataMng.getInstance();
        _CloseCOCOLogo(1500);

        //
        cc.ResourceMng.getInstance();

        //
        //
        var resForMap = [
            [Resource._GUIMap_plist, Resource._GUIMap_png],
            [Resource._MainMap_plist, Resource._MainMap_png],
            [Resource.map_meteor_plist, Resource.map_meteor_png],
            [Resource.map_level_unlock_plist, Resource.map_level_unlock_png]
        ];

        //
        resForMap.forEach(
            function(each)
            {
                cc.ResourceMng.getInstance().addToCache(each[0], each[1]);
            }
        );

        //
        /*var tmp = [];
        for (var indx = 0; indx < this._surpassFriends; ++indx)
        {
            tmp.push(FriendInfo.createTest("Name" + indx, _ImagesPath + "food.png"));
        }

        //
        cc.GUISurpassFriends.getInstance().openWindow(this, tmp);*/

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    onExit: function()
    {
        this._super();
        cc.log("离开 Scene_Test 场景  **********************");
        this.removeAllChildren(true);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //更新
    update: function(time)
    {
        //cc.log("Scene_Test 场景 update");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //更新
    handleTouchesBegan: function(touches)
    {
        //Scene_SignBonus.changeTo();

        if(!cc.GUISignBonus.getInstance().isWindowOpen())
        {
            cc.GUISignBonus.getInstance().openWindow(this);
        }
        return this;
    }
});

//
Scene_Test.create = function()
{
    var newScene = new Scene_Test();
    if (newScene)
    {
        newScene.unscheduleAllCallbacks();
        newScene.schedule(newScene.update, Defines.FPS);
    }

    return newScene;
};


cc.EllipseTo = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_Duration = 0;
        this.m_AxisLengthA = 0;
        this.m_AxisLengthB = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function(duration, axisLengthA, axisLengthB)
    {
        this.m_Duration = duration;
        this.m_AxisLengthA = axisLengthA;
        this.m_AxisLengthB = axisLengthB;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _getPosXWithDelta: function(time)
    {
        return -1 * this.m_AxisLengthA * Math.cos(2 * 3.1415926 * time) + this.m_AxisLengthA;
    },

    //------------------------------------------------------------------------------------------------------------------
    _getPosYWithDelta: function(time)
    {
        return this.m_AxisLengthB * Math.sin(2 * 3.1415926 * time);
    },

    //------------------------------------------------------------------------------------------------------------------
    runWithTarget: function(target)
    {
        //
        var time = 0;
        var self = this;
        var startPos = target.getPosition();

        //
        target.schedule(
            function(delta)
            {
                //
                time += delta;
                time = time > self.m_Duration ? 0 : time;

                //
                var dX = self._getPosXWithDelta(time/self.m_Duration);
                var dY = self._getPosYWithDelta(time/self.m_Duration);

                target.setPosition(cc.pAdd(startPos, cc.p(dX - self.m_AxisLengthA, dY)));
            }
        );
    }
});

cc.EllipseTo.create = function(duration, axisLengthA, axisLengthB)
{
    var ellipseTo = new cc.EllipseTo();
    ellipseTo.init(duration, axisLengthA, axisLengthB);
    return ellipseTo;
};