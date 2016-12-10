
Armature_MonsterConfigure = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(animationScale)
    {
        //
        this._animationScale = animationScale;
        this._normalArmatures = {};
        this._stareArmatures = {};
    },

    //------------------------------------------------------------------------------------------------------------------
    registerNormal: function(armAniName, armatureID)
    {
        this._normalArmatures[armAniName] = armatureID;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    registerStare: function(direction, armatureID)
    {
        this._stareArmatures[direction] = armatureID;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getAnimationScale: function()
    {
        return this._animationScale;
    },

    //------------------------------------------------------------------------------------------------------------------
    getNormalArmatureID: function(armAniName)
    {
        return this._normalArmatures[armAniName];
    },

    //------------------------------------------------------------------------------------------------------------------
    getStareArmatureID: function(direction)
    {
        return this._stareArmatures[direction] ? this._stareArmatures[direction]
            : Armature_MonsterConfigure.INVALID_ARMATURE_ID;
    },

    //------------------------------------------------------------------------------------------------------------------
    canPlayArmature: function(monster)
    {
        var typeOK = (monster instanceof cc.Obj_Monster) && monster.isNormal();
        var noBubble = !_IsAnyBubbleCoverMonster(monster);
        return typeOK && noBubble;
    }
});

//
Armature_MonsterConfigure.INVALID_ARMATURE_ID = -1;
Armature_MonsterConfigure.create = function()
{
    var createNew = new Armature_MonsterConfigure(25/60);

    //
    var normal =
    {
        PROMPT: 0,
        WIN: 1,
        SWAP_FAIL: 2,
        IDLE: 3,

        GUI_WIN: 12,
        GUI_RUNNING: 15
    };

    //
    for (var prop in normal)
    {
        if (normal.hasOwnProperty(prop))
        {
            createNew.registerNormal(prop, normal[prop]);
        }
    }

    //
    createNew.registerStare(Defines.DIRECTION.LEFT, 4);
    createNew.registerStare(Defines.DIRECTION.RIGHT, 5);
    createNew.registerStare(Defines.DIRECTION.TOP, 6);
    createNew.registerStare(Defines.DIRECTION.BOTTOM, 7);

    //
    createNew.registerStare(Defines.DIRECTION.BOTTOM_LEFT, 8);
    createNew.registerStare(Defines.DIRECTION.BOTTOM_RIGHT, 9);
    createNew.registerStare(Defines.DIRECTION.TOP_LEFT, 10);
    createNew.registerStare(Defines.DIRECTION.TOP_RIGHT, 11);

    //
    return createNew;
};

//======================================================================================================================
var Armature_Monster = ArmatureControl.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(configure)
    {
        this._super();

        //
        this._configure = configure;
        this._colorsToArmNames = {};

        //
        this._activeArmatures = {};
        this._activeCount = 0;
        this._poolArmatures = {};

        //
        this._armaturesNames = ["pink", "green", "blue", "orange", "purple", "yellow"];
        this._initArmatureNames();

        //
        this._createCount = 0;
        this._releaseCount = 0;

        //
        this._whoPrepareRunning = [];
        this._whoIsRunningCount = 0;
    },

    //------------------------------------------------------------------------------------------------------------------
    cleanUp: function()
    {
        this._super();

        //
        cc.log("_cleanUpActive");
        this._cleanUpActive();

        //
        cc.log("_cleanUpPool");
        this._cleanUpPool();

        //
        cc.log("骨骼动画创建数量 this._createCount = " + this._createCount);
        cc.log("骨骼动画释放数量 this._releaseCount = " + this._releaseCount);

        //
        if (this._createCount != this._releaseCount)
        {
            cc.Assert(0, "骨骼动画创建数量和释放数量不一致!!!!!!!");
        }

        //
        this._activeCount = 0;

        //
        this._createCount = 0;
        this._releaseCount = 0;

        //
        this._whoPrepareRunning = [];
        this._whoIsRunningCount = 0;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "Armature_Monster";
    },

    //------------------------------------------------------------------------------------------------------------------
    createCount: function()
    {
        return ++this._createCount;
    },

    //------------------------------------------------------------------------------------------------------------------
    releaseCount: function()
    {
        return ++this._releaseCount;
    },

    //------------------------------------------------------------------------------------------------------------------
    getMaxRunningCount: function()
    {
        return 9;
    },

    //------------------------------------------------------------------------------------------------------------------
    getActiveCount: function()
    {
        return this._activeCount;
    },

    //------------------------------------------------------------------------------------------------------------------
    addRunning: function(monster)
    {
        this._whoPrepareRunning.push(monster);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    updateRunning: function(/*dt*/)
    {
        if (this._whoPrepareRunning.length <= 0 /*&& dt > 0*/)
        {
            return this;
        }

       /* var count = 0;
        while (this._whoPrepareRunning.length > 0)
        {
            var first = this._whoPrepareRunning.shift();
            this.createRunningArmature(first);
            ++count;

            if (count > 3)
            {
                //一帧 就处理3个
                cc.log("this._whoPrepareRunning.length = " + this._whoPrepareRunning.length);
                break;
            }
        }*/


        //var first = this._whoPrepareRunning.shift();
        this.createRunningArmature(this._whoPrepareRunning.shift());

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _cleanUpActive: function()
    {
        for (var id in this._activeArmatures)
        {
            if (!this._activeArmatures.hasOwnProperty(id))
            {
                continue;
            }

            cc.log("id = " + id);
            cc.log("this._activeArmatures[id] = " + this._activeArmatures[id]);
            this._activeArmatures[id].getAnimation().stop();
            this._activeArmatures[id].removeFromParent(true);

            //
            this.releaseCount();
        }

        //
        this._activeArmatures = {};
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _cleanUpPool: function()
    {
        var self = this;

        for (var name in this._poolArmatures)
        {
            if (!this._poolArmatures.hasOwnProperty(name))
            {
                continue;
            }

            //
            var pool = this._poolArmatures[name] || [];
            pool.forEach(
                function(a_armature)
                {
                    a_armature.getAnimation().stop();
                    a_armature.removeFromParent(true);
                    self.releaseCount();
                }
            );
        }

        this._poolArmatures = {};
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        this._super();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _initArmatureNames: function()
    {
        this._colorsToArmNames = {};

        //
        this._colorsToArmNames[Defines.COLOR.PINK] = this._armaturesNames[0];
        this._colorsToArmNames[Defines.COLOR.GREEN] = this._armaturesNames[1];
        this._colorsToArmNames[Defines.COLOR.BLUE] = this._armaturesNames[2];
        this._colorsToArmNames[Defines.COLOR.ORANGE] = this._armaturesNames[3];
        this._colorsToArmNames[Defines.COLOR.PURPLE] = this._armaturesNames[4];
        this._colorsToArmNames[Defines.COLOR.YELLOW] = this._armaturesNames[5];

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getArmatureName: function(color)
    {
        return this._colorsToArmNames[color];
    },

    //------------------------------------------------------------------------------------------------------------------
    register: function()
    {
        this._super();

        for (var prop in this._colorsToArmNames)
        {
            if (!this._colorsToArmNames.hasOwnProperty(prop))
            {
                continue;
            }

            //
            var a_name = this._colorsToArmNames[prop];
            cc.ArmatureDataManager.getInstance().addArmatureFileInfo(
                a_name,
                "",
                Resource.monsters_armature_png,
                Resource.monsters_armature_plist,
                _ArmaturePath + a_name + ".xml");
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    removeArmaturesTexCache: function()
    {
        this._super();

        //
        cc.ResourceMng.getInstance().removeFromCache(
            Resource.monsters_armature_plist,
            Resource.monsters_armature_png
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    getConfig: function()
    {
        return this._configure;
    },

    //------------------------------------------------------------------------------------------------------------------
    createArmature: function(monster)
    {
        //
        if (!(monster instanceof cc.Obj_Monster))
        {
            cc.log("不是怪物????? monster = " + monster);
            return null;
        }

        //
        if (this._activeArmatures[monster.getObjectID()])
        {
            return this._activeArmatures[monster.getObjectID()];
        }

        //
        var createNew = this.createByPool(monster.getColor());
        if (!createNew)
        {
            createNew = this.createByColor(monster.getColor());
            this.createCount();
        }

        //
        if (createNew)
        {
            createNew.setPosition(monster.getPosition());
            this._activeArmatures[monster.getObjectID()] = createNew;
            ++this._activeCount;
        }

        //
        return createNew;
    },

    //------------------------------------------------------------------------------------------------------------------
    createByColor: function(color)
    {
        var createNew = cc.Armature.create(this.getArmatureName(color));
        if (createNew)
        {
            createNew.setScale(Defines.BASE_SCALE);
            createNew.getAnimation().setAnimationScale(this.getConfig().getAnimationScale());
        }

        return createNew;
    },

    //------------------------------------------------------------------------------------------------------------------
    createByPool: function(color)
    {
        var armName = this.getArmatureName(color);
        var pool = this._poolArmatures[armName];
        if (pool && pool.length > 0)
        {
            var pop = pool.shift();
            pop.getAnimation().stop();
            pop.setVisible(true);

            return pop;
        }

        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    createForMapZone: function()
    {
        var newArmature = cc.Armature.create(Tools.arrayRandom(this._armaturesNames));
        if (newArmature)
        {
            newArmature.getAnimation().playByIndex(this.getConfig().getNormalArmatureID("GUI_WIN"), 0, -1, true);
            newArmature.getAnimation().setAnimationScale(this.getConfig().getAnimationScale());
        }

        return newArmature;
    },

    //------------------------------------------------------------------------------------------------------------------
    createRunningImage: function(monster)
    {
        //
        var armature = MonsterRender.createSprite(monster.getColor());
        monsterRunning().addChild(armature);

        //
        var location = monster.getPosition();
        armature.setPosition(location);
        armature.stopAllActions();
        armature.runAction(
            cc.RepeatForever.create(cc.RotateBy.create(Defines.FPS * 30, 360))
        );

        //
        var jump0_xMove = Tools.rangeRandom(Defines.TABLE_GRID_SIZE * 0.618, Defines.TABLE_GRID_SIZE)
            * (location.x > _ScreenCenter().x ? -1 : 1);

        var jump0_yMove = Tools.rangeRandom(Defines.TABLE_GRID_SIZE * 4, Defines.TABLE_GRID_SIZE * 5);

        var firstJumpTime = Tools.rangeRandom(Defines.FPS * 30, Defines.FPS * 40);

        //
        var jump0 = cc.JumpBy.create(firstJumpTime,
            cc.p(jump0_xMove, -1 * (location.y - Defines.TABLE_GRID_SIZE/2)),
            jump0_yMove *(location.y/_ScreenHeight()),
            1);

        //
        var secondJumpTime = Tools.rangeRandom(Defines.FPS * 20, Defines.FPS * 30);
        var jump1Scale = cc.Sequence.create(
            cc.DelayTime.create(firstJumpTime),
            cc.ScaleTo.create(secondJumpTime * 0.2, 1.25, 0.75),
            cc.ScaleTo.create(secondJumpTime * 0.3, 0.75, 1.25),
            cc.ScaleTo.create(secondJumpTime * 0.5, 1.0, 1.0),
            cc.CallFunc.create(
                function(sender)
                {
                    sender.setScaleX(1.0);
                    sender.setScaleY(1.0);
                },
                null)
        );

        //
        var jump1 = cc.JumpBy.create(secondJumpTime,
            cc.p(Defines.TABLE_GRID_SIZE, 0),
            Defines.TABLE_GRID_SIZE,
            1);

        //
        var xMovePosAfterJump = _ScreenBottomRight().x - Defines.TABLE_GRID_SIZE/1.5;
        var yMovePosAfterJump = _ScreenBottomRight().y + Defines.TABLE_GRID_SIZE/2;

        //
        var sequence0 = cc.Sequence.create(
            jump0,
            jump1,
            cc.CallFunc.create(
                function(armature)
                {
                    var pos = armature.getPosition();
                    if (pos.x < xMovePosAfterJump)
                    {
                        var moveTime = (_ScreenWidth() - pos.x)/Defines.OBJ_MOVE_SPEED;
                        var moveTo = cc.MoveTo.create(
                            moveTime,
                            cc.p(xMovePosAfterJump, yMovePosAfterJump)
                        );

                        var scaleAction = cc.ScaleTo.create(Defines.FPS * 10, 0.2, 1.0);

                        //
                        var seqMove = cc.Sequence.create(
                            moveTo,
                            cc.CallFunc.create(
                                function()
                                {
                                    cc.AudioMng.getInstance().playMonsterEscape();
                                },
                                null
                            ),
                            scaleAction
                        );

                        armature.runAction(seqMove);

                        //
                        var jump2 = cc.Sequence.create(
                            cc.DelayTime.create(moveTime),
                            cc.JumpBy.create(Defines.FPS * 10,
                                cc.p(0, 0),
                                Defines.TABLE_GRID_SIZE/2,
                                1),
                            cc.CallFunc.create(
                                function (sender)
                                {
                                    sender.removeFromParent(true);
                                },
                                null
                            )
                        );

                        armature.runAction(jump2);
                    }
                    else
                    {
                        armature.setPosition(cc.p(xMovePosAfterJump, yMovePosAfterJump));
                        cc.AudioMng.getInstance().playMonsterEscape();

                        var seqMove0 = cc.Sequence.create(
                            cc.ScaleTo.create(Defines.FPS * 10, 0.2, 1.0),
                            cc.CallFunc.create(
                                function (sender)
                                {
                                    sender.removeFromParent(true);
                                },
                                null
                            )
                        );

                        armature.runAction(seqMove0);
                        armature.runAction(
                            cc.JumpBy.create(
                                Defines.FPS * 10,
                                cc.p(0, 0),
                                Defines.TABLE_GRID_SIZE/2,
                                1
                            ));
                    }
                },
                null
            )
        );

        //
        armature.runAction(sequence0);
        armature.runAction(jump1Scale);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    prepareForPool: function(_poolSize)
    {
        var self = this;

        this.cleanUp();

        var poolSize = _poolSize || 30;
        this._armaturesNames.forEach(
            function(armatureName)
            {
                self._poolArmatures[armatureName] = self._poolArmatures[armatureName] || [];

                var needPool = poolSize;
                while (needPool > 0)
                {
                    var createNew = cc.Armature.create(armatureName);
                    if (createNew)
                    {
                        //
                        createNew.getAnimation().setAnimationScale(self.getConfig().getAnimationScale());
                        createNew.setPosition(cc.p(0, 0));
                        createNew.setVisible(false);
                        createNew.setScale(Defines.BASE_SCALE);

                        //
                        self._poolArmatures[armatureName].push(createNew);
                        gameTableLayer().addChild(createNew);

                        //
                        self.createCount();
                    }

                    --needPool;
                }
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    stopActiveArmature: function(monsters)
    {
        if (!monsters)
        {
            return this;
        }

        var self = this;

        if ((monsters instanceof Array))
        {
            monsters.forEach(
                function(mons)
                {
                    self._stopActive(mons.getObjectID());
                }
            );
        }
        else
        {
            this._stopActive(monsters.getObjectID());
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    _stopActive: function(monstersObjectID)
    {
        var armature = this._activeArmatures[monstersObjectID];
        if (!armature)
        {
            return this;
        }

        //
        armature.getAnimation().stop();

        armature.setRotation(0);
        armature.setScale(Defines.BASE_SCALE);

        armature.setVisible(false);
        armature.stopAllActions();

        //
        var armatrueName = armature.getName();
        this._poolArmatures[armatrueName] = this._poolArmatures[armatrueName] || [];
        this._poolArmatures[armatrueName].push(armature);

        //
        delete this._activeArmatures[monstersObjectID];
        --this._activeCount;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createRunningArmature: function(monster)
    {
        if (!monster)
        {
            return null;
        }

        var self = this;
        var location = monster.getPosition();

        //
        var armature = this.createArmature(monster);
        var monsterObjectID = monster.getObjectID();

        //
        if (monster.getColor() == Defines.COLOR.YELLOW)
        {
            armature.runAction(
                cc.RepeatForever.create(cc.RotateBy.create(Defines.FPS * 30, 360))
            );
        }

        //
        if (!armature.getParent())
        {
            gameTableLayer().addChild(armature);
        }

        //
        armature.getParent().reorderChild(armature, Defines.BATCH_NODE.MONSTER_RUNNING.Z);
        armature.getAnimation().playByIndex(this.getConfig().getNormalArmatureID("GUI_RUNNING"), 0, -1, true);

        //
        if (self._whoIsRunningCount > this.getMaxRunningCount())
        {
            //骨骼动画太多了 就不再更新 只渲染第一帧
            //cc.log("骨骼动画太多了 就不再更新 只渲染第一帧 = " + self._whoIsRunningCount);
            armature.getAnimation().stop();
        }

        //
        var jump0_xMove = Tools.rangeRandom(Defines.TABLE_GRID_SIZE * 0.618, Defines.TABLE_GRID_SIZE)
            * (location.x > _ScreenCenter().x ? -1 : 1);

        var jump0_yMove = Tools.rangeRandom(Defines.TABLE_GRID_SIZE * 4, Defines.TABLE_GRID_SIZE * 5);

        var firstJumpTime = Tools.rangeRandom(Defines.FPS * 30, Defines.FPS * 40);

        //
        var jump0 = cc.JumpBy.create(firstJumpTime,
            cc.p(jump0_xMove, -1 * (location.y - Defines.TABLE_GRID_SIZE/2)),
            jump0_yMove *(location.y/_ScreenHeight()),
            1);

        var scalueValue = Defines.BASE_SCALE;
        var secondJumpTime = Tools.rangeRandom(Defines.FPS * 20, Defines.FPS * 30);

        //
        var jump1Scale = cc.Sequence.create(
            cc.DelayTime.create(firstJumpTime),
            cc.ScaleTo.create(secondJumpTime * 0.2, scalueValue * 1.25, scalueValue * 0.75),
            cc.ScaleTo.create(secondJumpTime * 0.3, scalueValue * 0.75, scalueValue * 1.25),
            cc.ScaleTo.create(secondJumpTime * 0.5, scalueValue, scalueValue),
            cc.CallFunc.create(
                function(sender)
                {
                    //sender.setScaleX(1.0);
                    //sender.setScaleY(1.0);
                    sender.setScale(Defines.BASE_SCALE);
                },
                null)
        );

        //
        var jump1 = cc.JumpBy.create(secondJumpTime,
            cc.p(Defines.TABLE_GRID_SIZE, 0),
            Defines.TABLE_GRID_SIZE,
            1);

        //
        var xMovePosAfterJump = _ScreenBottomRight().x - Defines.TABLE_GRID_SIZE/1.5;
        var yMovePosAfterJump = _ScreenBottomRight().y + Defines.TABLE_GRID_SIZE/2;

        //
        var sequence0 = cc.Sequence.create(
            jump0,
            jump1,
            cc.CallFunc.create(
                function(armature)
                {
                    var pos = armature.getPosition();
                    if (pos.x < xMovePosAfterJump)
                    {
                        var moveTime = (_ScreenWidth() - pos.x)/Defines.OBJ_MOVE_SPEED;
                        var moveTo = cc.MoveTo.create(
                            moveTime,
                            cc.p(xMovePosAfterJump, yMovePosAfterJump)
                        );

                        var scaleAction = cc.ScaleTo.create(Defines.FPS * 10, scalueValue * 0.2, scalueValue);

                        //
                        var seqMove = cc.Sequence.create(
                            moveTo,
                            cc.CallFunc.create(
                                function ()
                                {
                                    cc.AudioMng.getInstance().playMonsterEscape();
                                },
                                null
                            ),
                            scaleAction
                        );

                        armature.runAction(seqMove);

                        //
                        var jump2 = cc.Sequence.create(
                            cc.DelayTime.create(moveTime),
                            cc.JumpBy.create(Defines.FPS * 10,
                                cc.p(0, 0),
                                Defines.TABLE_GRID_SIZE/2,
                                1),
                            cc.CallFunc.create(
                                function ()
                                {
                                    --self._whoIsRunningCount;
                                    self._stopActive(monsterObjectID);
                                },
                                null
                            )
                        );

                        armature.runAction(jump2);
                    }
                    else
                    {
                        armature.setPosition(cc.p(xMovePosAfterJump, yMovePosAfterJump));
                        cc.AudioMng.getInstance().playMonsterEscape();

                        var seqMove0 = cc.Sequence.create(
                            cc.ScaleTo.create(Defines.FPS * 10, scalueValue * 0.2, scalueValue),
                            cc.CallFunc.create(
                                function ()
                                {
                                    --self._whoIsRunningCount;
                                    self._stopActive(monsterObjectID);
                                },
                                null
                            )
                        );

                        armature.runAction(seqMove0);
                        armature.runAction(
                            cc.JumpBy.create(
                                Defines.FPS * 10,
                                cc.p(0, 0),
                                Defines.TABLE_GRID_SIZE/2,
                                1
                            ));
                    }
                },
                null
            )
        );

        //
        ++this._whoIsRunningCount;
        armature.runAction(sequence0);
        armature.runAction(jump1Scale);

        return armature;
    },

    //------------------------------------------------------------------------------------------------------------------
    createTouchArmature: function(objMonster)
    {
        if (!objMonster || !this.getConfig().canPlayArmature(objMonster))
        {
            return null;
        }

        var armature = this.createArmature(objMonster);
        if (!armature)
        {
            return null;
        }

        if (!armature.getParent())
        {
            gameTableLayer().addChild(armature);
        }

        //
        armature.getParent().reorderChild(armature, Defines.BATCH_NODE.OBJECTS.Z);
        armature.getAnimation().playByIndex(this.getConfig().getNormalArmatureID("WIN"), 0, -1, true);

        return armature;
    },

    //------------------------------------------------------------------------------------------------------------------
    createPromptArmature: function(objMonster)
    {
        if (!objMonster || !this.getConfig().canPlayArmature(objMonster))
        {
            return null;
        }

        this.stopActiveArmature(objMonster);

        var armature = this.createArmature(objMonster);
        if (!armature)
        {
            return null;
        }

        if (!armature.getParent())
        {
            gameTableLayer().addChild(armature);
        }

        armature.getParent().reorderChild(armature, Defines.BATCH_NODE.OBJECTS.Z);

        //
        var repeatForever = cc.RepeatForever.create(
            cc.Sequence.create(
                cc.ScaleTo.create(Defines.FPS * 30, Defines.BASE_SCALE * 1.1, Defines.BASE_SCALE *1.1),
                cc.DelayTime.create(Defines.FPS),
                cc.ScaleTo.create(Defines.FPS * 30, Defines.BASE_SCALE, Defines.BASE_SCALE)
            ));

        //
        armature.runAction(repeatForever);
        armature.getAnimation().playByIndex(this.getConfig().getNormalArmatureID("PROMPT"), 0, -1, true);

        return armature;
    },

    //------------------------------------------------------------------------------------------------------------------
    createSwapFailArmature: function(objMonster)
    {
        if (!objMonster || !this.getConfig().canPlayArmature(objMonster))
        {
            return null;
        }

        this.stopActiveArmature(objMonster);

        var armature = this.createArmature(objMonster);
        if (!armature)
        {
            return null;
        }

        if (!armature.getParent())
        {
            gameTableLayer().addChild(armature);
        }

        armature.getParent().reorderChild(armature, Defines.BATCH_NODE.OBJECTS.Z);
        armature.getAnimation().playByIndex(this.getConfig().getNormalArmatureID("SWAP_FAIL"), 0);

        return armature;
    },

    //------------------------------------------------------------------------------------------------------------------
    createIdleArmature: function(objMonster)
    {
        if (!objMonster || !this.getConfig().canPlayArmature(objMonster))
        {
            return null;
        }

        this.stopActiveArmature(objMonster);

        var armature = this.createArmature(objMonster);
        if (!armature)
        {
            return null;
        }

        if (!armature.getParent())
        {
            gameTableLayer().addChild(armature);
        }

        armature.getParent().reorderChild(armature, Defines.BATCH_NODE.OBJECTS.Z);
        armature.getAnimation().playByIndex(this.getConfig().getNormalArmatureID("IDLE"), 0);

        return armature;
    },

    //------------------------------------------------------------------------------------------------------------------
    createWinArmature: function(objMonster)
    {
        if (!objMonster || !this.getConfig().canPlayArmature(objMonster))
        {
            return null;
        }

        this.stopActiveArmature(objMonster);

        var armature = this.createArmature(objMonster);
        if (!armature)
        {
            return null;
        }

        if (!armature.getParent())
        {
            gameTableLayer().addChild(armature);
        }

        armature.getParent().reorderChild(armature, Defines.BATCH_NODE.OBJECTS.Z);
        armature.getAnimation().playByIndex(this.getConfig().getNormalArmatureID("WIN"), 0, -1, true);

        return armature;
    },

    //------------------------------------------------------------------------------------------------------------------
    createStareArmature: function(srcMonster, dstMonster)
    {
        if (!srcMonster
            || !dstMonster
            || !this.getConfig().canPlayArmature(srcMonster)
            || !(dstMonster instanceof cc.Obj_Monster)
            //|| Defines.LOW_PERFORMANCE
            )
        {
            return null;
        }

        //
        if (this.getActiveCount() > 20)
        {
            //cc.log("激活的骨骼动画太多了就不再显示多余的 = " + this.getActiveCount());
            return null;
        }

        //
        var self = this;

        //
        var direction = DefDirection.getByOff(
            cc.pSub(
                dstMonster.getParentNode().getGridPos(),
                srcMonster.getParentNode().getGridPos()
            )
        );

        var playIndx = this.getConfig().getStareArmatureID(direction);
        if (playIndx == Armature_MonsterConfigure.INVALID_ARMATURE_ID)
        {
            return null;
        }

        this.stopActiveArmature(srcMonster);

        //
        var armature = this.createArmature(srcMonster);
        if (!armature)
        {
            return null;
        }

        if (!armature.getParent())
        {
            gameTableLayer().addChild(armature);
        }

        armature.getParent().reorderChild(armature, Defines.BATCH_NODE.OBJECTS.Z);
        armature.getAnimation().playByIndex(playIndx, 0);

        //
        var sequence = cc.Sequence.create(
            cc.DelayTime.create(1/25 * 20),
            cc.CallFunc.create(
                function()
                {
                    //
                    self.stopActiveArmature(srcMonster);

                    //
                    if (srcMonster.getSprite())
                    {
                        srcMonster.getSprite().setVisible(true);
                    }
                },
                null)
        );

        //
        armature.runAction(sequence);
        return armature;
    }


    //------------------------------------------------------------------------------------------------------------------

});

//
Armature_Monster.create = function()
{
    var config = Armature_MonsterConfigure.create();

    //
    var createNew = new Armature_Monster(config);
    createNew.init();

    //
    return createNew;
};