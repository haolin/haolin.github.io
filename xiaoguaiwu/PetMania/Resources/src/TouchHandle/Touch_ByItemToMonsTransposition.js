
//瞬间移动	将两只玩家指定位置的怪物交换位置。
cc.Touch_ByItemToMonsTransposition = cc.Touch_ByItem.extend({

    //------------------------------------------------------------------------------------------------------------------
    //浮空缩放频率
    CONST_floatScale:[{"time":0.15,"num":1.2}, {"time":0.15,"num":1.0}, {"time":0.15,"num":0.8}],

    //交换的时间
    CONST_exchange:Defines.FPS*40,

    //第一个选中的元素
    beginObject:null,

    //第二个选中的元素
    endObject:null,

    //放大缩小的动画TAG
    FloatAnimTag:189,

    //两个动作计数
    finCount:0,

    ctor: function ()
    {
        //cc.DataMng.getInstance().useItemById(Defines.GameItems.ITEM_TRANSPOSITION.ID);
    },

    //------------------------------------------------------------------------------------------------------------------
    description: function ()
    {
        return "Touch_ByItemToMonsTransposition";
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function (gameLevel, beginPos)
    {
        var tapObj = this.getHandleObj(gameLevel, beginPos);
        if (!tapObj || this.endObject)
        {
            return this;
        }

        if(this.beginObject == tapObj)
        {
            //复原第一个选中的物体
            this.beginObject.getSprite().stopAllActions();

            var restore = cc.ScaleTo.create(Number(0.25),Number(1));

            this.beginObject.getSprite().runAction(restore);
            this.beginObject = null;
            return this;
        }

        if(!this.beginObject)
        {
            this.beginObject = tapObj;

            this.floatObjAnim(this.beginObject);

            // 添加显示第二次文字；
            cc.EffectMng.getInstance().displayLabelShow(Resource.ChineseTxt[97]);

        }else if(!this.endObject)
        {
            this.endObject = tapObj;

            this.floatObjAnim(this.endObject);

            this.exchangeObjAnim(gameLevel, this.beginObject, this.endObject);
        }

        return this;
    },

    //选中动画
    floatObjAnim: function(obj)
    {
        var self = this;

        obj.getSprite().runAction(self.createFloatAnim());
    },

    createFloatAnim: function()
    {
        var repeatForever = cc.RepeatForever.create(
            cc.Sequence.create(
                cc.ScaleTo.create(this.CONST_floatScale[0]["time"],this.CONST_floatScale[0]["num"]),
                cc.ScaleTo.create(this.CONST_floatScale[1]["time"],this.CONST_floatScale[1]["num"]),
                cc.ScaleTo.create(this.CONST_floatScale[2]["time"],this.CONST_floatScale[2]["num"])
            )
        );
        repeatForever.setTag(this.FloatAnimTag);
        return repeatForever;
    },

    //交换动画
    exchangeObjAnim: function(gameLevel,objSrc, objDst)
    {
        var self = this;

        var srcParent = objSrc.getParentNode();
        var dstParent = objDst.getParentNode();

        //从父节点拿下来
        srcParent.removeNode(objSrc);
        dstParent.removeNode(objDst);

/*修改层级关系 by shuiliu*/
        var sprSrc = objSrc.getSprite();
		var sprDst = objDst.getSprite();
        var oldParentSrc = sprSrc.getParent();
		var oldParentDst = sprDst.getParent();

        //
        sprSrc.retain();
		sprDst.retain();
        sprSrc.removeFromParent(false);
		sprDst.removeFromParent(false);

        //
        animateLayer().addChild(sprSrc);
		animateLayer().addChild(sprDst);
        sprSrc.release();
		sprDst.release();


        //重新添加节点
        srcParent.addNode(objDst);
        dstParent.addNode(objSrc);

        var objDstPos = objDst.getSprite().getPosition();
        var objSrcPos = objSrc.getSprite().getPosition();

        var objCenterPos = cc.p((objDstPos.x+objSrcPos.x)/2,(objDstPos.y+objSrcPos.y)/2);

        var slope = 0;
        if (Math.abs(objDstPos.x - objSrcPos.x) <= 0.0000001)
        {
            slope = 32767;
        }
        else
        {
            slope = (objDstPos.y - objSrcPos.y) / (objDstPos.x - objSrcPos.x);
        }

        if (Math.abs(slope) < 0.0000001)
        {
            slope = 0;
        }


        var new_slope = 32767;
        if (slope == 32767)
        {
            new_slope = 0;
        }
        else if (slope == 0)
        {
            new_slope = 32767;
        }
        else
        {
            new_slope = -1 / slope;
        }
//        var inter = objCenterPos.y - new_slope * objCenterPos.x;
//
//        var dis = 100;
        var targetPos = cc.p(0,0);

        if (Math.abs(slope) >= 1)
        {
            targetPos.x = objCenterPos.x + 400;
            targetPos.y = objCenterPos.y;
        }
        else
        {
            targetPos.x = objCenterPos.x;
            targetPos.y = objCenterPos.y + 400;
        }


        //objSrc的动画
        var objSrcBezier = [objSrcPos, targetPos/*cc.pMult(objCenterPos,0.5)*/, objDstPos];

         /*
        objSrc.getSprite().runActionAndChild(function(type){
            return self.createExchangeAnim(type,objSrcBezier,objSrc,false,gameLevel);
        });
        */
        var endStateSrc = cc.CallFunc.create(function(sender){

			sender.retain();
			sender.removeFromParent(false);

			//
			oldParentSrc.addChild(sender,objSrc.getZOrder());
			sender.release();

            ++this.finCount;

        }, this);

        objSrc.getSprite().runAction(self.createExchangeAnim(objSrcBezier, objSrc, true, gameLevel, endStateSrc));
		var actionRotateSrc = cc.RotateBy.create(Defines.FPS*30,360);
		actionRotateSrc.setTag(1002);
        objSrc.getSprite().runAction(
                actionRotateSrc
        );


        var new_targetPos = cc.p(0,0);
        if (Math.abs(slope) >= 1)
        {
            new_targetPos.x = objCenterPos.x - 400;
            new_targetPos.y = objCenterPos.y;
        }
        else
        {
            new_targetPos.x = objCenterPos.x;
            new_targetPos.y = objCenterPos.y - 400;
        }
        //objDst的动画
        var objDstBezier = [objDstPos, new_targetPos/*cc.pMult(objCenterPos,1.5)*/, objSrcPos];

        /*
        objDst.getSprite().runActionAndChild(function(type){
            return self.createExchangeAnim(type,objDstBezier,objDst,true,gameLevel);
        });
        */
        var endStateDst = cc.CallFunc.create(function(sender){

			sender.retain();
			sender.removeFromParent(false);

			//
			oldParentDst.addChild(sender,objDst.getZOrder());
			sender.release();

            ++this.finCount;

        }, this);

        objDst.getSprite().runAction(self.createExchangeAnim(objDstBezier,objDst, true, gameLevel, endStateDst ));
		var actionRotateDst = cc.RotateBy.create(Defines.FPS*30,360);
		actionRotateDst.setTag(1002);
        objDst.getSprite().runAction(
             actionRotateDst
        );
		
        cc.EffectMng.getInstance().displayLabelHide();
    },

    createExchangeAnim: function(BezierArray,object,isEndState,gameLevel, endState)
    {
        var self = this;
        //曲线动画
        var bezier = cc.BezierTo.create(self.CONST_exchange,BezierArray);
		bezier.setTag(1001);
//        var bezier = cc.EaseInOut.create( cc.BezierTo.create(self.CONST_exchange,BezierArray),0.3 );

        //还原动画
        var callObjState = cc.CallFunc.create(function(){
//            object.getSprite().stopAllActions();
			object.getSprite().stopActionByTag(1001);
			object.getSprite().stopActionByTag(1002);
			object.getSprite().stopActionByTag(self.FloatAnimTag);
            object.getSprite().runAction(cc.ScaleTo.create(Number(0),Number(1))) ;
            object.updateNodePosition();
        });

        //游戏结束
//        var endState = cc.CallFunc.create(function(sender){
//            self.endTransposition(gameLevel);
//			sender.retain();
//			sender.removeFromParent(false);
//
//			//
//			oldParent.addChild(sender, self.object.getZOrder());
//			sender.release();
//        });

        var exchangeForever = null;

        //if(type == "iObject")
        //{
            if(isEndState)
            {
                exchangeForever = cc.Sequence.create(bezier,callObjState,endState);
            }
            else
            {
                exchangeForever = cc.Sequence.create(bezier,callObjState,endState);
            }
        //}
        /*
        else
        {
            exchangeForever = cc.Sequence.create(bezier);
        }
        */

        return exchangeForever;
    },

    endTransposition: function(gameLevel)
    {
        //扣钱
        cc.DataMng.getInstance().useItemById(Defines.GameItems.ITEM_TRANSPOSITION.ID);

        //
        this.m_IsFinish = true;

        //
        this.forcedInterrupt();

        //
        gameLevel.addCommand(cc.Cmd_EveryDestroy.create([]));
    },

    //------------------------------------------------------------------------------------------------------------------
    swallowMoveTouch: function ()
    {
        return true;
    },

    isDirectly: function()
    {
        //子类实现
        return false;
    },

    update: function()
    {
        if (this.finCount >= 2)
        {
            this.endTransposition(_GameLevelStateWrapper.getGameLevel());
        }
    }

    //------------------------------------------------------------------------------------------------------------------
});

//工厂方法
cc.Touch_ByItemToMonsTransposition.create = function()
{
    return new cc.Touch_ByItemToMonsTransposition();
};
