/**
 * Created with JetBrains WebStorm.
 * User: ck01-277
 * Date: 13-8-7
 * Time: 下午9:10
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with JetBrains WebStorm.
 * User: ck01-277
 * Date: 13-8-7
 * Time: 下午7:41
 * To change this template use File | Settings | File Templates.
 */
//======================================================================================================================
cc.Cmd_LeftBubbleDestroy = cc.ICommand.extend({

   /* ctor: function()
    {
        this._super();
    },*/

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        var monstersWithBubbles = [];

        //
        var table = gameLevel.getTable();
        var itr = table.createIterForMiddleObjects();
        for (itr.first(); !itr.isDone(); itr.next())
        {
            var middleObj = itr.getCurrent();
            if (!middleObj)
            {
                continue;
            }

            if (_IsAnyBubbleCoverMonster(middleObj))
            {
                monstersWithBubbles.push(middleObj);
            }
        }

        //
        var visitor = cc.ScoreVisitorSingle.create(Defines.SCORE_TYPE.SCORE_NULL);
        monstersWithBubbles.forEach(
            function(a_monster)
            {
                a_monster.destroy(a_monster, gameLevel, visitor);
            }
        );

        visitor.visitFinish();

        return this;
    }

    //------------------------------------------------------------------------------------------------------------------
    /*command: function(gameLevel, time)
    {
        this._super(gameLevel, time);
        return this.m_Commands.length <= 0;
    },
*/
    //------------------------------------------------------------------------------------------------------------------
    /*finish: function(gameLevel)
    {
        //gameLevel.addCommand(cc.Cmd_EveryDestroy.create());
        return this;
    }*/
});

cc.Cmd_LeftBubbleDestroy.create = function()
{
    return new cc.Cmd_LeftBubbleDestroy();
};
