//======================================================================================================================
var GUIGuideBlack = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(layer)
    {
        this.m_Layer = layer;
        this.m_GridPos = [];
        this.m_BlackLayer = [];
        this.m_SpriteList = [];
    },
    //------------------------------------------------------------------------------------------------------------------
    getSpriteLayer : function(position,size)
    {
        var spriteLayer = cc.Sprite.create(Resource.black_layer_png);
//        var spriteLayer = cc.Sprite.createWithSpriteFrameName("Images_black.png");
        if (spriteLayer)
        {
            spriteLayer.setAnchorPoint(cc.p(0,0));
            spriteLayer.setPosition(position);

            var scaleX = size.width / 10;
            var scaleY = size.height / 10;
			
            spriteLayer.setScaleX(scaleX);
            spriteLayer.setScaleY(scaleY);

            this.m_Layer.addChild(spriteLayer);
            this.m_SpriteList.push(spriteLayer);
            return spriteLayer;
        }

        return null;
    },
    //------------------------------------------------------------------------------------------------------------------
    changeLayer : function(layer)
    {
        this.finishLayer();
        this.m_Layer = layer;
    },
    //------------------------------------------------------------------------------------------------------------------
    addTableBlackArray : function(array)
    {
        this.finishLayer();
        var self = this;
        if (array && array instanceof Array)
        {
            array.forEach(
                function(pos)
                {
                    self.addGridPos(pos);
                }
            )
        }
    },
	
	addTableBlackArrayWithoutFinish : function(array) //2013.10.29 by shuiliu
	{
        //this.finishLayer();
        var self = this;
        if (array && array instanceof Array)
        {
            array.forEach(
                function(pos)
                {
                    self.addGridPos(pos);
                }
            )
        }
    },
    //------------------------------------------------------------------------------------------------------------------
    addUIBlackLayer : function(location, size)
    {
        this.finishLayer();

        if (location.x == 0 && location.y == 0
            && size.width == 0 && size.height == 0)
        {
            this.getSpriteLayer(
                cc.p(0,0),
                cc.size(
                    /*cc.GameManager.getInstance().getScreenWidth()*/_ScreenWidth(),
                    /*cc.GameManager.getInstance().getScreenHeight()*/_ScreenHeight()
                )
            );

            return this;
        }

        this.getSpriteLayer(
            cc.p(0,0),
            cc.size(
                location.x,
                /*cc.GameManager.getInstance().getScreenHeight()*/_ScreenHeight()
            )
        );

        // right
        var tableRightLocation = location.x + size.width;

        this.getSpriteLayer(
            cc.p(tableRightLocation,0),
            cc.size(
                /*cc.GameManager.getInstance().getScreenWidth()*/_ScreenWidth() - tableRightLocation,
                /*cc.GameManager.getInstance().getScreenHeight()*/_ScreenHeight()
            )
        );

        // Up
        var tableUpLocationX = location.x;
        var tableUpLocationY = location.y + size.height;

        this.getSpriteLayer(
            cc.p(tableUpLocationX,tableUpLocationY),
            cc.size(
                size.width,
                /*cc.GameManager.getInstance().getScreenHeight()*/_ScreenHeight() - tableUpLocationY
            )
        );

        // Down
        var tableUpLocationX = location.x;
        var tableUpLocationY = 0;

        this.getSpriteLayer(
            cc.p(tableUpLocationX,tableUpLocationY),
            cc.size(
                size.width,
                location.y
            )
        );
    },
	
	addUIBlackLayerWithTable : function(table)
	{
        this.finishLayer();
			
		var tablePosition = table.getPosition();
		var tableWidth = Defines.TABLE_GRID_SIZE * table.getTabWidth();
		var tableHeight = Defines.TABLE_GRID_SIZE * table.getTabHeight();
		
		this.getSpriteLayer(
            cc.p(0,0),
            cc.size(
                tablePosition.x - Defines.TABLE_GRID_SIZE/2,
                /*cc.GameManager.getInstance().getScreenHeight()*/_ScreenHeight()
            )
        );
		
		var gridRightLocationX = tablePosition.x - Defines.TABLE_GRID_SIZE/2 + tableWidth;
		this.getSpriteLayer(
			cc.p(gridRightLocationX,0),
            cc.size(
                _ScreenWidth() - gridRightLocationX,
                /*cc.GameManager.getInstance().getScreenHeight()*/_ScreenHeight()
            )
        );
		
		var gridUpLocationY = tablePosition.y + Defines.TABLE_GRID_SIZE/2;//- tableHeight;
		this.getSpriteLayer(
            cc.p(
				tablePosition.x - Defines.TABLE_GRID_SIZE/2,
				gridUpLocationY
			),
            cc.size(
                tableWidth,
                /*cc.GameManager.getInstance().getScreenHeight()*/_ScreenHeight() - gridUpLocationY
            )
        );
		
		
		this.getSpriteLayer(
            cc.p(tablePosition.x - Defines.TABLE_GRID_SIZE/2,
				0),
            cc.size(
                tableWidth,
                tablePosition.y + Defines.TABLE_GRID_SIZE/2 - tableHeight
            )
        );
	},
	
	addUIBlackLayerWithoutTable : function(location, size,table)
    {
        this.finishLayer();

        if (location.x == 0 && location.y == 0
            && size.width == 0 && size.height == 0)
        {
            this.getSpriteLayer(
                cc.p(0,0),
                cc.size(
                    /*cc.GameManager.getInstance().getScreenWidth()*/_ScreenWidth(),
                    /*cc.GameManager.getInstance().getScreenHeight()*/_ScreenHeight()
                )
            );

            return this;
        }
		//left
        this.getSpriteLayer(
            cc.p(0,0),
            cc.size(
                location.x,
                /*cc.GameManager.getInstance().getScreenHeight()*/_ScreenHeight()
            )
        );

        // right
		//分成两个部分 gridleft gridright
		var tablePosition = table.getPosition();
		var tableWidth = Defines.TABLE_GRID_SIZE * table.getTabWidth();
		var tableHeight = Defines.TABLE_GRID_SIZE * table.getTabHeight();
		//gridleft 
        var gridleftLocationX = location.x + size.width;

        this.getSpriteLayer(
            cc.p(gridleftLocationX,0),
            cc.size(
                /*cc.GameManager.getInstance().getScreenWidth()*/tablePosition.x - Defines.TABLE_GRID_SIZE/2 - gridleftLocationX,
                /*cc.GameManager.getInstance().getScreenHeight()*/_ScreenHeight()
            )
        );
		//
		
		//gridright
        var gridRightLocationX = tablePosition.x - Defines.TABLE_GRID_SIZE/2 + tableWidth;
		
        this.getSpriteLayer(
            cc.p(gridRightLocationX,0),
            cc.size(
                /*cc.GameManager.getInstance().getScreenWidth()*/_ScreenWidth() - gridRightLocationX,
                /*cc.GameManager.getInstance().getScreenHeight()*/_ScreenHeight()
            )
        );
		//
		
        // Up
        var tableUpLocationX = location.x;
        var tableUpLocationY = location.y + size.height;

        this.getSpriteLayer(
            cc.p(tableUpLocationX,tableUpLocationY),
            cc.size(
                size.width,
                /*cc.GameManager.getInstance().getScreenHeight()*/_ScreenHeight() - tableUpLocationY
            )
        );


        this.getSpriteLayer(
            cc.p(tablePosition.x - Defines.TABLE_GRID_SIZE/2,tablePosition.y + Defines.TABLE_GRID_SIZE/2),
            cc.size(
                tableWidth,
                _ScreenHeight() - tablePosition.y - Defines.TABLE_GRID_SIZE/2
            )
        );


        // Down
        var tableUpLocationX = location.x;
        var tableUpLocationY = 0;

        this.getSpriteLayer(
            cc.p(tableUpLocationX,tableUpLocationY),
            cc.size(
                size.width,
                location.y
            )
        );
    },
	
    //------------------------------------------------------------------------------------------------------------------
    addGridPos: function(pos)
    {
        this.m_GridPos.push(pos);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function(table)
    {
        this.finishLayer();

        this.addTableBlack(table);

        this.addTableWrapBlack(table);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleUI : function (location, size)
    {
        this.finishLayer();

        this.addUIBlackLayer(location, size);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleUIOutCustom : function (rectList)
    {
        var self = this;
        if (!rectList || rectList.length <=0)
        {
            return this;
        }

        this.finishLayer();

        // left
        this.getSpriteLayer(
            cc.p(0,0),
            cc.size(
                rectList[0].x,
                /*cc.GameManager.getInstance().getScreenHeight()*/_ScreenHeight()
            )
        );

        // right
        var tableRightLocation = rectList[0].x + rectList[0].width;

        this.getSpriteLayer(
            cc.p(tableRightLocation,0),
            cc.size(
                /*cc.GameManager.getInstance().getScreenWidth()*/_ScreenWidth() - tableRightLocation,
                /*cc.GameManager.getInstance().getScreenHeight()*/_ScreenHeight()
            )
        );

        // interval
        rectList.forEach(
            function(a_rect,index)
            {
                var heightRect = /*cc.GameManager.getInstance().getScreenHeight()*/_ScreenHeight() - (rectList[index].y+rectList[index].height);
                if (index != 0)
                {
                    heightRect = rectList[index-1].y - (rectList[index].y+rectList[index].height);
                }

                self.getSpriteLayer(
                    cc.p(rectList[index].x,rectList[index].y+rectList[index].height),
                    cc.size(
                        rectList[index].width,
                        heightRect
                    )
                );
            }
        );

        // down
        var lastPos = rectList.length-1;
        self.getSpriteLayer(
            cc.p(rectList[lastPos].x,0),
            cc.size(
                rectList[lastPos].width,
                rectList[lastPos].y
            )
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addTableWrapBlack: function(table)
    {
        var tablePosition = table.getPosition();

        //table左边

        this.getSpriteLayer(
            cc.p(0,0),
            cc.size(
                tablePosition.x - Defines.TABLE_GRID_SIZE/2,
                /*cc.GameManager.getInstance().getScreenHeight()*/_ScreenHeight()
            )
        );
        //table右边
        var tableRightX = tablePosition.x + Defines.TABLE_GRID_SIZE * table.getTabWidth() - Defines.TABLE_GRID_SIZE/2;

        this.getSpriteLayer(
            cc.p(tableRightX, 0),
            cc.size(
                /*cc.GameManager.getInstance().getScreenWidth()*/_ScreenWidth() - tableRightX,
                /*cc.GameManager.getInstance().getScreenHeight()*/_ScreenHeight()
            )
        );
        //table上边和下边也需要处理！！！
		
        // Up
        var tableUpLocationX = tablePosition.x - Defines.TABLE_GRID_SIZE / 2;
        var tableUpLocationY = tablePosition.y + Defines.TABLE_GRID_SIZE / 2 ;
		cc.log("table shangbian x = " + tableUpLocationX + "table shangbian y = " + tableUpLocationY);
        this.getSpriteLayer(
            cc.p(tableUpLocationX,tableUpLocationY),
            cc.size(
                Defines.TABLE_GRID_SIZE * table.getTabWidth(),
                /*cc.GameManager.getInstance().getScreenHeight()*/_ScreenHeight() - tableUpLocationY
            )
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    addTableBlack: function(table)
    {
        var dirty = {};
        this.m_GridPos.forEach(
            function(gridPos)
            {
                var grid = table.getGrid(gridPos.x, gridPos.y);
                if (grid)
                {
                    dirty[grid.getObjectID()] = true;
                }
            }
        );

        //
        var itr = table.createIterForGrids();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            //
            var grid = itr.getCurrent();
            if (!grid || dirty[grid.getObjectID()])
            {
                continue;
            }
//
//            //
            var pos = grid.getPosition();
            pos.x -= Defines.TABLE_GRID_SIZE/2;
            pos.y -= Defines.TABLE_GRID_SIZE/2;
//            blackLayer.setPosition(pos);
//
//            this.m_BlackLayer.push(blackLayer);
            this.getSpriteLayer(
                pos,
                cc.size(
                    Defines.TABLE_GRID_SIZE,
                    Defines.TABLE_GRID_SIZE
                )
            );
        }

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    finishLayer : function ()
    {
        if (this.m_SpriteList.length <= 0)
        {
            return this;
        }

        if (!this.m_Layer)
        {
            return this;
        }

        var self = this;

        this.m_SpriteList.forEach(
            function (sender)
            {
                sender.removeFromParent(true);
            }
        );

        this.m_SpriteList = [];
        this.m_GridPos = [];
        this.m_Layer = null;

        return this;
    }
});

//单件模式
GUIGuideBlack._instance = null;
GUIGuideBlack.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new GUIGuideBlack();
    }

    return this._instance;
};