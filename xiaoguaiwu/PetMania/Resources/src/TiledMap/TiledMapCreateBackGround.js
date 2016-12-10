//构造背景


//======================================================================================================================
var TiledMapCreateBackGround =  cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(gameLevel)
    {
        this.gameLevel = gameLevel;
    },

    //------------------------------------------------------------------------------------------------------------------
    create: function()
    {
        //
        var mapID = GUI._GetMapIDWithLevelData(this.gameLevel);

        //
        var datas = [
            cc.GameLevelBackGroundBlue,
            cc.GameLevelBackGroundMushroom,
            cc.GameLevelBackGroundDuck,
            cc.GameLevelBackGroundFlower,
            cc.GameLevelBackGroundGold,
            cc.GameLevelBackGroundIce,
            cc.GameLevelBackGroundBall,
            cc.GameLevelBackGroundSticky,
            cc.GameLevelBackGroundBacterium,
            cc.GameLevelBackGroundChirps,
            cc.GameLevelBackGroundQuad,
            cc.GameLevelBackGround_11,
            cc.GameLevelBackGround_12,
            cc.GameLevelBackGround_13,
            cc.GameLevelBackGround_14
        ];

        var createNew = null;

        //
        if (mapID < datas.length)
        {
            var backGroundClass = datas[mapID];
            if (backGroundClass.create)
            {
                createNew = backGroundClass.create();
            }
        }

        if (!createNew)
        {
            cc.log("TiledMapCreateBackGround = " + this.gameLevel.NAME);
            createNew = cc.GameLevelBackGroundBlue.create();
        }

        return createNew;
    }
});

TiledMapCreateBackGround.create = function(gameLevel)
{
    return new TiledMapCreateBackGround(gameLevel);
};
