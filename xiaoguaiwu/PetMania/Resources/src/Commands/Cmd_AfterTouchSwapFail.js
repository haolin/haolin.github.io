//Touch 移动2个游戏对象后 失败的处理命令

//======================================================================================================================
cc.Cmd_AfterTouchSwapFail = cc.ICommand.extend({

    //--------------------------------------------------------------------------------------------------
    ctor: function(monsters)
    {
        this._super();

        this.m_Monsters = monsters.concat();
        this.m_Time = 0;
    },

    //-----------------------------------------------------------------------------------------------------------------
    start: function(gameLevel)
    {
        this._super(gameLevel);

        this.m_Monsters.forEach(
            function(monster)
            {
                if (cc.ArmatureDataMng.getInstance().swapFailArmature(monster))
                {
                    monster.getSprite().setVisible(false);
                }
            }
        );

        return this;
    },

    //-----------------------------------------------------------------------------------------------------------------
    command: function(gameLevel, time)
    {
        this._super(gameLevel, time);

        this.m_Time += time;
        return this.m_Time >= 1/24 * 40;
    },

    //------------------------------------------------------------------------------------------------------------------
    finish: function(/*gameLevel*/)
    {
        this.m_Monsters.forEach(
            function(monster)
            {
                monster.getSprite().setVisible(true);
            }
        );

        cc.ArmatureDataMng.getInstance().stopAllArmatures(this.m_Monsters);

        return this;
    }

});

//工厂方法
cc.Cmd_AfterTouchSwapFail.create = function(objs)
{
    if (cc.ArmatureDataMng.getInstance().isValid())
    {
        return new cc.Cmd_AfterTouchSwapFail(objs);
    }

    return null;
};
