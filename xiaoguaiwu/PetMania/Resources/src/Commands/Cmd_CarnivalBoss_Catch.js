/**
 * Created with JetBrains WebStorm.
 * User: ck01-277
 * Date: 13-8-7
 * Time: 下午7:41
 * To change this template use File | Settings | File Templates.
 */
//======================================================================================================================
cc.Cmd_CarnivalBoss_Catch = cc.ICommandGroup.extend({

    ctor: function(moves)
    {
        this._super();
        this.m_Moves = moves;
        this.m_DelayTimer = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        var self = this;
        //
        var cmd0 = cc.Cmd_CarnivalScore.create();
        cmd0.finish = function()
        {

        };
        this.addCommand(cmd0);


        //
        var cmd1 = cc.Cmd_EveryDestroy.create();
        cmd1.finish = function()
        {

        };
        this.addCommand(cmd1);

        //
        var cmd2 = cc.Cmd_EveryMoveNext.create();
        cmd2.finish = function()
        {

        };
        this.addCommand(cmd2);

        var cmd3 = cc.Cmd_BossChangeColorful.create();
        this.addCommand(cmd3);

        var cmd4 = cc.Cmd_LeftBubbleDestroy.create();
        cmd4.finish = function()
        {

        };
        this.addCommand(cmd4);

//        var cmd_Cmd_LeftMovesToMonster = cc.Cmd_LeftMovesToMonster.create();
//        cmd_Cmd_LeftMovesToMonster.finish = function()
//        {
//            monsters = cmd_Cmd_LeftMovesToMonster.getNewMonsterList();
//            var cmd_Cmd_BossSwallowMonster = cc.Cmd_BossSwallowMonster.create(this.m_Moves,monsters);
//            cmd_Cmd_BossSwallowMonster.finish = function()
//            {
//            };
//            self.addCommand(cmd_Cmd_BossSwallowMonster);
//
//            var cmd5 = cc.Cmd_EveryMoveNext.create();
//            cmd5.finish = function()
//            {
//
//            };
//            self.addCommand(cmd5);
//        }
//        this.addCommand(cmd_Cmd_LeftMovesToMonster);

        this.addCarnivalCommand();

//        var cmd6 = cc.Cmd_EveryDestroy.create();
//        cmd6.finish = function()
//        {
//
//        };
//        this.addCommand(cmd6);
//
//        //
//        var cmd7 = cc.Cmd_EveryMoveNext.create();
//        cmd7.finish = function()
//        {
//
//        };
//        this.addCommand(cmd7);

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    addCarnivalCommand : function()
    {
        var self = this;
        var cmd_Cmd_LeftMovesToMonster = cc.Cmd_LeftMovesToMonsterWithNumber.create();
        cmd_Cmd_LeftMovesToMonster.finish = function()
        {
            var monsters = cmd_Cmd_LeftMovesToMonster.getMonsterList();

            //
            var cmd4 = cc.Cmd_BossSwallowMonster.create(cc.DataMng.getInstance().getLeftTouchMoves(),monsters);
            cmd4.finish = function()
            {
            };
            self.addCommand(cmd4);

            var cmd5 = cc.Cmd_EveryMoveNext.create();
            cmd5.finish = function()
            {

            };
            self.addCommand(cmd5);

            var leftMoves = cc.DataMng.getInstance().getLeftTouchMoves();
            if (leftMoves > 0)
            {
                self.addCarnivalCommand();
            }
        }
        this.addCommand(cmd_Cmd_LeftMovesToMonster);
    },
    //------------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        return this.m_Commands.length <= 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(gameLevel)
    {
        gameLevel.addCommand(cc.Cmd_EveryDestroy.create());
        return this;
    }
});

cc.Cmd_CarnivalBoss_Catch.create = function(moves)
{
    return new cc.Cmd_CarnivalBoss_Catch(moves);
};
