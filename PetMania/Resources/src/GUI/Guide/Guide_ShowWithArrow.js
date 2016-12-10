/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-10-16
 * Time: 下午5:53
 * Version: 1.0
 * Function: This file use to do...
 */

cc.Guide_ShowWithArrow = cc.GUIWindow.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function()
    {
        this._super();

        this._spriteArrow = null;
        this._render = null;
        this._gameLevel = null;
        this._src = null;
        this._dst = null;
        this._total = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init : function(render, gamelevel, src, dst, total)
    {
        this._super();

        this._render = render;
        this._gameLevel = gamelevel;
        this._src = src;
        this._dst = dst;
        this._total = total;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "Guide_ShowWithArrow";
    },

    //------------------------------------------------------------------------------------------------------------------
    openWindow: function(render)
    {
        this._super(render);

        this.getSpriteArrow();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    closeWindow: function()
    {
        this._super();

        if (this._spriteArrow)
        {
            this._spriteArrow.removeFromParent(true);
            this._spriteArrow = null;
        }
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getSpriteArrow: function()
    {
        if (!this._spriteArrow)
        {
//            this.m_SpriteArrow = cc.Sprite.create(Resource.new_finger_png);
            this._spriteArrow = cc.Sprite.createWithSpriteFrameName("Images_new_finger.png");
            this._spriteArrow.setAnchorPoint(cc.p(0, 1));
            this.getWindow().addChild(this._spriteArrow, cc.Guide_Defines.Enum.ENUM_TOP_ZORDER);
        }

        return this._spriteArrow;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanCuteMonster : function()
    {
        if (this._spriteArrow)
        {
            this._spriteArrow.removeFromParent(true);
            this._spriteArrow = null;
        }
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUITip : function()
    {

    },

    //------------------------------------------------------------------------------------------------------------------
    show : function()
    {
        var self = this;

        this.openWindow(this._render);

        var blackInstance = GUIGuideBlack.getInstance();
        blackInstance.finishLayer();
        blackInstance.changeLayer(this.getWindow());
        blackInstance.addTableBlackArray(this._total);
        blackInstance.handle(this._gameLevel.getTable());
        //
        this.m_IsTouched = false;
        this.m_TouchedBeginPos = {x: 0, y: 0};
        this.m_TouchedEndPos = {x: 0, y: 0};
        this.getWindow().setTouchEnabled(true);

        //
        var table = this._gameLevel.getTable();
        var size = Defines.TABLE_GRID_SIZE/2;
        var shape = cc.DrawNode.create();

        //
        var grid0 = this._total.shift();
        var points0 = [
            cc.p(-size, -size),
            cc.p(size, -size),
            cc.p(size, size),
            cc.p(-size, size)
        ];

        var green = cc.c4f(1, 1, 1, 1);
        shape.drawPoly(points0, points0.length, green, 0);

        //
        this._total.concat().forEach(
            function(gridIndx)
            {
                //
                var gridPos1 = cc.p(gridIndx.x, gridIndx.y);

                //
                gridPos1.x -= grid0.x;
                gridPos1.x *= size * 2;

                gridPos1.y -= grid0.y;
                gridPos1.y *= -1 * size * 2;

                var points1 = [
                    cc.p(gridPos1.x - size, gridPos1.y - size),
                    cc.p(gridPos1.x + size, gridPos1.y - size),
                    cc.p(gridPos1.x + size, gridPos1.y + size),
                    cc.p(gridPos1.x - size, gridPos1.y + size)
                ];

                shape.drawPoly(points1, points1.length, green, 0);
            }
        );

        //
        var position = table.getGrid(grid0.x, grid0.y).getPosition();
        shape.setPosition(position);

        var self = this;
        this.getSpriteArrow().setVisible(true);

        this.getSpriteArrow().stopAllActions();
        var arrowSize = this.getSpriteArrow().getContentSize();
        var arrowStart = cc.p(_ScreenLeft().x-arrowSize.width/2,_ScreenLeft().y);
        arrowStart.y = position.y;
        this.getSpriteArrow().setPosition(position);

        var dstPosition = table.getGrid(this._dst.x, this._dst.y).getPosition();

        this.getSpriteArrow().runAction(
            cc.RepeatForever.create(
                cc.Sequence.create(
                    cc.MoveTo.create(Defines.FPS * 30, dstPosition),
                    cc.DelayTime.create(0.5),
                    cc.MoveTo.create(Defines.FPS * 30, position)
                )
            )
        );

        //
        var startGrid = table.getGrid(this._src.x, this._src.y);
        var destGrid =  table.getGrid(this._dst.x, this._dst.y);
        this.getWindow().onTouchesBegan = function(touches/*, event*/)
        {
            var gameLevelData1 = cc.DataMng.getInstance().getCurLevelData();
            if (gameLevelData1.ID == 30-1)
            {
                cc.Guide.round_30++;
            }

            if (self.m_IsTouched)
            {
                return self;
            }

            self.m_IsTouched = true;
            self.cleanCuteMonster();
            self.cleanUITip();
            var location = touches[0].getLocation();
            self.m_TouchedBeginPos.x = location.x;
            self.m_TouchedBeginPos.y = location.y;

            var gird = table.getGridByPos(self.m_TouchedBeginPos);
            if (!gird || (startGrid != gird && destGrid != gird))
            {
                self.getWindow().onTouchesEnded();
                return self;
            }

            if (startGrid == gird)
            {
                self.m_operation = 1;
            }
            else if (destGrid == gird)
            {
                self.m_operation = -1;
            }

            return self;
        };

        self.getWindow().onTouchesMoved = function(touches/*, event*/)
        {
            if (!self.m_IsTouched)
            {
                return self;
            }

            var location = touches[0].getLocation();
            self.m_TouchedEndPos.x = location.x;
            self.m_TouchedEndPos.y = location.y;

            var gird = table.getGridByPos(self.m_TouchedEndPos);
            if (!gird || (self.m_operation == 1 && destGrid != gird))
            {
                return self;
            }
            else if(!gird || (self.m_operation == -1 && startGrid != gird))
            {
                return self;
            }
            else if(self.m_operation == 0)
            {
                return self;
            }

            self.getWindow().onTouchesEnded();

            //
            //cc.GameManager.getInstance().changeTo(cc.State_GameLevel.getInstance());
            _ChangeGameLevelStateTo(cc.State_GameLevel.getInstance());

            //
            if (self.m_operation == 1)
            {
                self.m_TouchedEndPos = destGrid.getPosition();
            }
            else if (self.m_operation == -1)
            {
                self.m_TouchedEndPos = startGrid.getPosition();
            }

            //cc.GameTouch.create(self.m_TouchedBeginPos, self.m_TouchedEndPos).handle(gamelevel);
            self._gameLevel.addTouchSwapObjectsCommand(self.m_TouchedBeginPos, self.m_TouchedEndPos);

            self.closeWindow();
            blackInstance.finishLayer();

            return self;
        };

        self.getWindow().onTouchesEnded = function()
        {
            self.m_IsTouched = false;
            self.m_operation = 0;
            return self;
        };
    }
});


cc.Guide_ShowWithArrow._instance = null;
cc.Guide_ShowWithArrow.getInstance = function()
{
    if (!cc.Guide_ShowWithArrow._instance)
    {
        cc.Guide_ShowWithArrow._instance = new cc.Guide_ShowWithArrow();
    }

    return cc.Guide_ShowWithArrow._instance;
};