//音效管理者

//======================================================================================================================
cc.AudioMng = cc.Class.extend({

    //对 cc.AudioEngine 封装一层而已
    m_Audio: cc.AudioEngine.getInstance(),

    //音效开关
    m_PlaySoundEffect: null,

    //音乐开关
    m_PlayMusic: null,

    //下落音效的集合
    m_LandSounds: null,

    //
    m_ContinuousDestroySounds: null,

    //
    m_DestroyVoiceSounds: null,

    //------------------------------------------------------------------------------------------------------------------
    init: function()
    {
        //更新
        this.m_PlaySoundEffect = cc.GameDataBoolean.create("m_PlaySoundEffect", true, _DB_OP_GAME);
        this.m_PlaySoundEffect.load();

        //更新
        this.m_PlayMusic = cc.GameDataBoolean.create("m_PlayMusic", true, _DB_OP_GAME);
        this.m_PlayMusic.load();

        //
        this.update();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    isGALAXY_i9100: function()
    {
        //三星i9100 这个问题始终没解决 声音崩溃
        //必须是真机
        return Defines.PLATFORM.isMobile() && "GT-I9100" == getAndDeviceModell();
    },

    //------------------------------------------------------------------------------------------------------------------
    //停止音乐
    force: function(setting)
    {
        //
        this.setPlayEffect(setting);
        this.setPlayMusic(setting);
        this.update();

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    update: function()
    {
        this.canPlayEffect() ? this.resumeAllEffects() : this.pauseAllEffects();
        this.canPlayMusic() ? this.resumeMusic() : this.pauseMusic();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //暂停音乐
    pauseMusic: function()
    {
        this.setPlayMusic(false);
        this.m_Audio.pauseMusic();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //回复音乐
    resumeMusic: function()
    {
        this.setPlayMusic(true);
        this.m_Audio.resumeMusic();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //暂停所有音效
    pauseAllEffects: function()
    {
        //this.m_PlaySoundEffect = false;
        this.setPlayEffect(false);
        this.stopAllEffects();
        //this.m_Audio.pauseAllEffects();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //暂停所有音效
    stopAllEffects: function(isSwitchOff)
    {
        if (isSwitchOff)
        {
            this.setPlayEffect(false);
        }

        this.m_Audio.stopAllEffects();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //回复所有音效
    resumeAllEffects: function()
    {
        //this.m_PlaySoundEffect = true;
        this.setPlayEffect(true);
        this.m_Audio.resumeAllEffects();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setPlayMusic: function(setting)
    {
        setting ? this.m_PlayMusic.setFlag() : this.m_PlayMusic.resetFlag();
        this.m_PlayMusic.save();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    setPlayEffect: function(setting)
    {
        setting ? this.m_PlaySoundEffect.setFlag() : this.m_PlaySoundEffect.resetFlag();
        this.m_PlaySoundEffect.save();
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    canPlayMusic: function()
    {
        return this.m_PlayMusic.getFlag();
    },

    //------------------------------------------------------------------------------------------------------------------
    canPlayEffect: function()
    {
        return this.m_PlaySoundEffect.getFlag();
    },

    //------------------------------------------------------------------------------------------------------------------
    playMainMenuSound: function()
    {
        if (this.canPlayEffect())
        {
            this.m_Audio.playEffect(_SoundPath + "sounds/main.mp3", false);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //播放主背景音乐
    playMainMenuMusic: function()
    {
        if (this.canPlayMusic())
        {
            this.m_Audio.playMusic(_SoundPath + "music/main_back0.mp3", true);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //播放主背景音乐
    playGameLevelMusic: function(index)
    {
        if (this.canPlayMusic())
        {
            index = index >= 3 ? 3 : index;

            if (Defines.IS_SMALL)
            {
                index = 0;
            }

            this.m_Audio.playMusic(_SoundPath + "music/game_level" + index + ".mp3", true);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playGameFailedSound:function()
    {
        if (this.canPlayMusic())
        {
            this.m_Audio.playMusic(_SoundPath + "sounds/01_02.mp3", false);
        }

        if(this.canPlayEffect())
        {
            return this.m_Audio.playEffect(_SoundPath + "sounds/01_01.mp3");
        }
    },

    playGameFailedMusic: function()
    {
        if (this.canPlayMusic())
        {
            this.m_Audio.playMusic(_SoundPath + "sounds/game_failed.mp3", true);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playGameSuccessSound:function()
    {
        if (this.canPlayMusic())
        {
            this.m_Audio.playMusic(_SoundPath + "sounds/03_02.mp3", false);
        }

        if(this.canPlayEffect())
        {
            this.m_Audio.playEffect(_SoundPath + "sounds/03_01.mp3");
        }


    },

    playGameSuccessMusic: function()
    {
        if (this.canPlayMusic())
        {
            this.m_Audio.playMusic(_SoundPath + "sounds/game_success.mp3", true);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //播放下落音效
    _playLandSound: function(/*className*/)
    {
        if (this.isGALAXY_i9100())
        {
            return this;
        }

        var randSound = Tools.randomEx(100) < 50 ?
            _SoundPath + "sounds/monster_land0.mp3" : _SoundPath + "sounds/monster_land1.mp3";

        this.m_Audio.playEffect(randSound, false);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //创建一个下落音效的数据
    createLandSound: function()
    {
        var sound = {};
        sound.data = {};

        var self = this;

        //添加一个下落完成对象
        sound.add = function(obj)
        {
            var className = obj.description();

            if (!sound.data[className])
            {
                sound.data[className] = 0;
            }

            ++sound.data[className];

            return sound;
        };

        //播放
        sound.playSound = function()
        {
            if (!self.canPlayEffect())
            {
                return sound;
            }

            for (var prop in sound.data)
            {
                if (!sound.data.hasOwnProperty(prop))
                {
                    continue;
                }

                if (typeof(sound.data[prop]) != "number")
                {
                    continue;
                }

                if (sound.data[prop] > 0)
                {
                    self._playLandSound(prop);
                }
            }

            return sound;
        };

        return sound;
    },

    //------------------------------------------------------------------------------------------------------------------
    //播放音效
    _playSound: function(soundName)
    {
        if (this.canPlayEffect() && cc.GameManager.getInstance().isAppActive())
        {
            this.m_Audio.playEffect(soundName, false);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //播放音效 单个消除
    playDestroy: function(monster)
    {
        if (this.isGALAXY_i9100())
        {
            return this;
        }

        this.playContinuousDestroy();
        this.playDestroyVoice(monster);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playDestroyVoice: function(monster)
    {
        if (this.isGALAXY_i9100())
        {
            return this;
        }

        if (!this.m_DestroyVoiceSounds)
        {
            this.m_DestroyVoiceSounds = {};
            this.m_DestroyVoiceSounds[Defines.COLOR.PINK] =  _SoundPath + "sounds/destroy_voice0.mp3";
            this.m_DestroyVoiceSounds[Defines.COLOR.YELLOW] =  _SoundPath + "sounds/destroy_voice1.mp3";
            this.m_DestroyVoiceSounds[Defines.COLOR.PURPLE] =  _SoundPath + "sounds/destroy_voice2.mp3";
            this.m_DestroyVoiceSounds[Defines.COLOR.GREEN] =  _SoundPath + "sounds/destroy_voice3.mp3";
            this.m_DestroyVoiceSounds[Defines.COLOR.ORANGE] =  _SoundPath + "sounds/destroy_voice4.mp3";
            this.m_DestroyVoiceSounds[Defines.COLOR.BLUE] =  _SoundPath + "sounds/destroy_voice5.mp3";
        }

        if (monster)
        {
            var monsterColor = monster.getColor();
            this._playSound(this.m_DestroyVoiceSounds[monsterColor]);
        }
        else
        {
            var randColor = _RandColor();//Tools.arrayRandom(Defines.COLORS_ARRAY);
            this._playSound(this.m_DestroyVoiceSounds[randColor]);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playContinuousDestroy: function()
    {
        if (this.isGALAXY_i9100())
        {
            return this;
        }

        if (!this.m_ContinuousDestroySounds)
        {
            this.m_ContinuousDestroySounds = {};
            this.m_ContinuousDestroySounds[1] =  _SoundPath + "sounds/continuous_destroy0.mp3";
            this.m_ContinuousDestroySounds[2] =  _SoundPath + "sounds/continuous_destroy1.mp3";
            this.m_ContinuousDestroySounds[3] =  _SoundPath + "sounds/continuous_destroy2.mp3";
            this.m_ContinuousDestroySounds[4] =  _SoundPath + "sounds/continuous_destroy3.mp3";
            this.m_ContinuousDestroySounds[5] =  _SoundPath + "sounds/continuous_destroy4.mp3";
        }

        var count = cc.DataMng.getInstance().getContinuousDestroyCount();
        var soundName = this.m_ContinuousDestroySounds[count];
        soundName = soundName || this.m_ContinuousDestroySounds[5];
        this._playSound(soundName);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playGameLevelTimeLost: function()
    {
        this._playSound(_SoundPath + "sounds/count_down.mp3");
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    playGameLevelButton: function()
    {
        this._playSound(_SoundPath + "sounds/game_level_button.mp3");
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    playFloorDestory: function()
    {
        if (this.isGALAXY_i9100())
        {
            return this;
        }

        this._playSound(_SoundPath + "sounds/floor_destroy.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //播放音效 直线消除
    playDirectionDestroy: function()
    {
        if (this.isGALAXY_i9100())
        {
            return this;
        }

        this._playSound(_SoundPath + "sounds/direction_destory.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //播放音效 多彩消除
    playColorfulDestroy: function()
    {
        if (this.isGALAXY_i9100())
        {
            return this;
        }

        this._playSound(_SoundPath + "sounds/colorful_destroy.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //播放音效 多彩消除
    playWrapDestroy: function()
    {
        if (this.isGALAXY_i9100())
        {
            return this;
        }

        this._playSound(_SoundPath + "sounds/wrap_destroy.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //播放音效 创建条纹糖
    playCreateDirection: function(monster)
    {
        if (this.isGALAXY_i9100())
        {
            return this;
        }

        this._playSound(_SoundPath + "sounds/continuous_destroy4.mp3");
        this.playDestroyVoice(monster);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //播放音效 创建多彩糖
    playCreateColorful: function(monster)
    {
        if (this.isGALAXY_i9100())
        {
            return this;
        }

        this._playSound(_SoundPath + "sounds/continuous_destroy4.mp3");
        this.playDestroyVoice(monster);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //播放音效 创建多彩糖
    playCreateWrap: function(monster)
    {
        if (this.isGALAXY_i9100())
        {
            return this;
        }

        this._playSound(_SoundPath + "sounds/continuous_destroy4.mp3");
        this.playDestroyVoice(monster);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playTouchSwapFail: function()
    {
        this._playSound(_SoundPath + "sounds/touch_swap_fail.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //播放音效 多彩 + 多彩 消除
    playColorfulWithColorful: function()
    {
        this._playSound(_SoundPath + "sounds/colorful_with_colorful.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    //播放音效 多彩 + 多彩 消除
    playWrapWithDirection: function()
    {
        this._playSound(_SoundPath + "sounds/wrap_with_direction.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playGameLevelWin: function()
    {
        this._playSound(_SoundPath + "sounds/game_level_win.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playGameLevelFail: function()
    {
        this.m_Audio.pauseMusic();
        this._playSound(_SoundPath + "sounds/game_level_fail.mp3");

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playDiamondBonus: function(index)
    {
        //需要audioID
        if(this.canPlayEffect())
        {
            return this.m_Audio.playEffect(_SoundPath + "sounds/diamond_bonus" + index + ".mp3");
        }

        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    stopDiamondBonus: function(audioID)
    {
        this.m_Audio.stopEffect(audioID);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playStarRaiseWithIndex: function(index)
    {
        this._playSound(_SoundPath + "sounds/star_raise" + index +".mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playStarRateWithIndex: function(index)
    {
        this._playSound(_SoundPath + "sounds/star_rate" + index +".mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playPraiseSound: function(/*level*/)
    {
        var res = Tools.randomEx(100) < 50 ?  _SoundPath + "sounds/praise0.mp3" : _SoundPath + "sounds/praise1.mp3";
        this._playSound(res);

        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    playOpenWindow: function()
    {
        this._playSound(_SoundPath + "sounds/window_open.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playCloseWindow: function()
    {
        this._playSound(_SoundPath + "sounds/window_close.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playButtonSound: function(valid)
    {
        var res = valid ? _SoundPath + "sounds/button.mp3" : _SoundPath + "sounds/button_invalid.mp3";
        this._playSound(res);
        return this;
    },
    //------------------------------------------------------------------------------------------------------------------
    playButtonGameLevelStar: function()
    {
        this._playSound(_SoundPath + "sounds/02_01_06.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playGuideEnd: function()
    {
        this._playSound(_SoundPath + "sounds/03_02_02.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playLeft3: function()
    {
        this._playSound(_SoundPath + "sounds/05_01_01.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playPerfect: function()
    {
        this._playSound(_SoundPath + "sounds/06_01_03.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playFreeItem: function()
    {
        this._playSound(_SoundPath + "sounds/07_02_01.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playRates3: function()
    {
        this._playSound(_SoundPath + "sounds/08_02_02.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playBonus: function()
    {
        this._playSound(_SoundPath + "sounds/04_02_02.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playExit: function()
    {
        this._playSound(_SoundPath + "sounds/10_02_02.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playMoveToNextLevel: function()
    {
        this._playSound(_SoundPath + "sounds/09_02_01.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playStory: function( nIndex )
    {
        if(this.canPlayMusic())
        {
            this.m_Audio.playMusic(_SoundPath + "sounds/output" + nIndex +".mp3",false);
//            this._playSound(_SoundPath + "sounds/output" + nIndex +".mp3");
        }

        return this;
    },

    playSkipStory: function()
    {
        this._playSound(_SoundPath + "sounds/start.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playMonsterEscape: function(/*monster*/)
    {
        if (this.isGALAXY_i9100())
        {
            return this;
        }

        var array = [
            _SoundPath + "sounds/escape0.mp3",
            _SoundPath + "sounds/escape1.mp3",
            _SoundPath + "sounds/escape2.mp3",
            _SoundPath + "sounds/escape3.mp3",
            _SoundPath + "sounds/escape4.mp3"
        ];

        this._playSound(Tools.arrayRandom(array));
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playUseItemSound: function()
    {
        this._playSound(_SoundPath + "sounds/use_item.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playStarSelected: function()
    {
        this._playSound(_SoundPath + "sounds/star_selected.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playCarnival: function(model)
    {
        if (model == Defines.TARGET_MODEL.MODEL_BOSS)
        {
            this._playSound(_SoundPath + "sounds/carnival_boss.mp3");
        }
        else
        {
            this._playSound(_SoundPath + "sounds/carnival.mp3");
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playOpeningCeremony: function(open)
    {
        var indx = open ? 0 : 1;
        var res = _SoundPath + "sounds/opening_ceremony" + indx + ".mp3";
        this._playSound(res);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playBubbleExplode: function()
    {
        if (this.isGALAXY_i9100())
        {
            return this;
        }

        this._playSound(_SoundPath + "sounds/bubble_explode.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playBubbleMove: function()
    {
        this._playSound(_SoundPath + "sounds/bubble_move.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playBubbleCreate: function()
    {
        if (this.isGALAXY_i9100())
        {
            return this;
        }

        this._playSound(_SoundPath + "sounds/bubble_create.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playHatchOpenOrClose: function(isOpen)
    {
        var res = isOpen ? _SoundPath + "sounds/hatch_open.mp3" : _SoundPath + "sounds/hatch_close.mp3";
        this._playSound(res);
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playIceShatter: function()
    {
        if (this.isGALAXY_i9100())
        {
            return this;
        }

        this._playSound(_SoundPath + "sounds/ice_shatter.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playFlowerCreate: function(flowerLevel)
    {
        if (this.isGALAXY_i9100())
        {
            return this;
        }

        if (flowerLevel == "0" || flowerLevel == 0)
        {
            flowerLevel = 1;
        }

        //
        var res = _SoundPath + "sounds/create_flower" + flowerLevel + ".mp3";
        this._playSound(res);

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playMapLevelUnlock: function(index)
    {
        this._playSound(_SoundPath + "sounds/maplevel_unlock" + index + ".mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playBossByeBye: function()
    {
        if (this.isGALAXY_i9100())
        {
            return this;
        }

        var index = Tools.rangeRandom(0, 1, true);
        this._playSound(_SoundPath + "sounds/boss_byebye" + index + ".mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playfiredrop: function()
    {
        this._playSound(_SoundPath + "sounds/fire_drop.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playfirebomb: function()
    {
        this._playSound(_SoundPath + "sounds/fire_bomb.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playEffectArriveMonster: function()
    {
        if (this.isGALAXY_i9100())
        {
            return this;
        }

        this._playSound(_SoundPath + "sounds/effect_arrive_monster.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playFlower: function()
    {
        if (this.isGALAXY_i9100())
        {
            return this;
        }

        this._playSound(_SoundPath + "sounds/flower.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playShuffle: function()
    {
        if (this.isGALAXY_i9100())
        {
            return this;
        }

        this._playSound(_SoundPath + "sounds/shuffle.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playOpenEveryday: function()
    {
        this._playSound(_SoundPath + "sounds/open_everyday.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playGetEveryday: function()
    {
        this._playSound(_SoundPath + "sounds/get_everyday.mp3");
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    playClock : function()
    {
        this._playSound(_SoundPath + "sounds/clock.mp3");
        return this;
    },
	//------------------------------------------------------------------------------------------------------------------
    playDiamondGet : function()
    {
        this._playSound(_SoundPath + "sounds/diamondGet.mp3");
        return this;
    },
	//------------------------------------------------------------------------------------------------------------------
    playDiamondGone : function()
    {
        this._playSound(_SoundPath + "sounds/diamondGone.mp3");
        return this;
    },
	//------------------------------------------------------------------------------------------------------------------
    playStoneBreak : function()
    {
        this._playSound(_SoundPath + "sounds/stoneBreak.mp3");
        return this;
    },
	//------------------------------------------------------------------------------------------------------------------
    playStoneShift : function()
    {
        this._playSound(_SoundPath + "sounds/stoneShift.mp3");
        return this;
    }

});

//单件模式
cc.AudioMng._instance = null;
cc.AudioMng.getInstance = function()
{
    if (!this._instance)
    {
        this._instance = new cc.AudioMng();
        this._instance.init();
    }

    return this._instance;
};

