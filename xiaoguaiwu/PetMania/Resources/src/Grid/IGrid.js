//一个块的抽象 必须摆在桌子上

cc.IGrid = cc.INodeObject.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(gridPos)
    {
        this._super();

        //
        this.gridPos = cc.p(gridPos.x, gridPos.y);

        //前一个格子
        this.m_Pre = null;

        //下一个格子
        this.m_Next = null;

        //
        this._lockTouch = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function()
    {
        return "IGrid";
    },

    //------------------------------------------------------------------------------------------------------------------
    //拿格子在桌面上的位置
    getGridPos: function()
    {
        return cc.p(this.gridPos.x, this.gridPos.y);
    },

    //------------------------------------------------------------------------------------------------------------------
    //更新位置
    updateNodePosition: function()
    {
        this._super();

        //
        var sz = Defines.TABLE_GRID_SIZE;
        var parentPos = this.getParentNode().getPosition();
        var myGridPos = this.getGridPos();

        //
        this.setPosition(cc.p(
            parentPos.x + sz * myGridPos.x,
            parentPos.y - sz * myGridPos.y
        ));

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //按着direction 方向 拿邻居格子
    getGridByDirection: function(direction)
    {
        var dst = cc.pAdd(this.getGridPos(), direction.getOff());
        return this.getParentNode().getGrid(dst.x, dst.y);
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        var gridPos = this.getGridPos();
        return this.description() + " = (" + gridPos.x + ", " + gridPos.y + ")";
    },

    //------------------------------------------------------------------------------------------------------------------
    //获得前一个格子
    getPre: function()
    {
        return this.m_Pre;
    },

    //------------------------------------------------------------------------------------------------------------------
    //设置前一个 格子
    setPre: function(grid)
    {
        this.m_Pre = grid;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //设置下一个格子
    setNext: function(grid)
    {
        this.m_Next = grid;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //拿下一个格子
    getNext: function()
    {
        return this.m_Next;
    },

    //------------------------------------------------------------------------------------------------------------------
    //是不是遮挡体
    isBlock: function()
    {
        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    //是传送门
    isConnect: function()
    {
        return false;
    },

    //------------------------------------------------------------------------------------------------------------------
    //是路径终点
    getDirectionTo: function(grid)
    {
        return DefDirection.getByOff(cc.pSub(grid.getGridPos(), this.getGridPos()));
    },

    //------------------------------------------------------------------------------------------------------------------
    //是不是邻居
    near: function(grid)
    {
        if (grid == this)
        {
            cc.Assert(0, "??????");
        }

        var off = cc.pSub(grid.getGridPos(), this.getGridPos());
        return Math.abs(off.x) + Math.abs(off.y) <= 1;
    },

    //------------------------------------------------------------------------------------------------------------------
    isLockTouch: function()
    {
        return this._lockTouch;
    },

    //------------------------------------------------------------------------------------------------------------------
    lockTouch: function()
    {
        this._lockTouch = true;
        return this.isLockTouch();
    },

    //------------------------------------------------------------------------------------------------------------------
    unLockTouch: function()
    {
        this._lockTouch = false;
        return this.isLockTouch();
    }
});

cc.IGrid.create = function(gridPos)
{
    return new cc.IGrid(gridPos);
};


