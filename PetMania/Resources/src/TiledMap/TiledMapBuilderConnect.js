//构造传送门

//======================================================================================================================
var TiledMapBuilderConnect = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_TableConnects = [];
    },

    //------------------------------------------------------------------------------------------------------------------
    add: function(_from, _to, _vis)
    {
        this.m_TableConnects.push(
            {
                from: cc.p(_from.x, _from.y),
                to: cc.p(_to.x, _to.y),
                vis: _vis
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    get: function()
    {
        return this.m_TableConnects.concat();
    }
});

TiledMapBuilderConnect.create = function(tiledMapProperty)
{
    if (!tiledMapProperty)
    {
        return null;
    }

    //
    cc.log("tiledMapProperty = " + tiledMapProperty);
    var createNew = new TiledMapBuilderConnect();
    if (!createNew)
    {
        return null;
    }

    //
    var array = tiledMapProperty.split("|");
    cc.log("TiledMapBuilderConnect = " + array);
    array.forEach(
        function(_property)
        {
            var info = _property.split(",");

            //
            var from = cc.p(parseInt(info[0]/10), parseInt(info[0]%10));
            var to = cc.p(parseInt(info[1]/10), parseInt(info[1]%10));
            var visible = (info[2] > 0);

            createNew.add(from, to, visible);
        }
    );

    return createNew;
};
