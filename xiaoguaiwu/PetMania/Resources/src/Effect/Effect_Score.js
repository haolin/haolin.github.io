/**
 * Created with JetBrains WebStorm.
 * Author: Forward
 * Date: 13-10-16
 * Time: 上午11:08
 * Version: 1.0
 * Function: This file use to do...
 */

var Effect_ScoreCreateCount = 0;
var Effect_ScoreRemoveCount = 0;

var Effect_Score = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor : function()
    {
        this._score = 0;
        this._position = null;
        this._color = null;
    },

    //------------------------------------------------------------------------------------------------------------------
    init : function(score, position, color)
    {
        this._score = score;
        this._position = position;
        this._color = color;

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    createLabel: function(fileName)
    {
        var labelsPool = Effect_Score.pool;
        if (labelsPool)
        {
            labelsPool[fileName] = labelsPool[fileName] || [];
            if (labelsPool[fileName].length > 0)
            {
                var label = labelsPool[fileName].shift();
                label.setVisible(true);
                return label;
            }
        }

        var newLabel = GUI.createNumberLabel("", fileName, 22, 28, '0');//cc.LabelAtlas.create("", fileName, 22, 28, '0');
        if (newLabel)
        {
            newLabel.setAnchorPoint(cc.p(0.5, 0.5));
            newLabel.setVisible(true);
            animateLayer().addChild(newLabel);

            ++Effect_ScoreCreateCount;

            return newLabel;
        }

        cc.Assert(0, "没创造出来???");
        return null;
    },

    //------------------------------------------------------------------------------------------------------------------
    play : function()
    {
        var fileName = Resource.scores_pngs[this._color];
        var scoreLabel = this.createLabel(fileName);
        if (!scoreLabel)
        {
            return this;
        }

        //
        scoreLabel.setString(this._score.toString());
        scoreLabel.setPosition(this._position);
        scoreLabel.setScale(0.9);

        //
        scoreLabel.runAction(cc.ScaleTo.create(0.2, 1));
        scoreLabel.runAction(cc.MoveBy.create(1.2, cc.p(0, _ScreenHeight() * 0.03)));
        scoreLabel.runAction(cc.Sequence.create(
            cc.DelayTime.create(0.8),
            cc.FadeOut.create(0.4),
            cc.CallFunc.create(
                function (sender)
                {
                    //
                    sender.setOpacity(255);
                    sender.setVisible(false);

                    Effect_Score.pool[fileName] = Effect_Score.pool[fileName] || [];
                    Effect_Score.pool[fileName].push(sender);
                },
                null
            ))
        );

        return this;
    }
});

//----------------------------------------------------------------------------------------------------------------------
Effect_Score.pool = {};
Effect_Score.cleanUpPool = function()
{
    if (this.pool != Effect_Score.pool)
    {
        cc.Assert(0, "!!!!!")
    }

    for (var colorName in this.pool)
    {
        if (!this.pool.hasOwnProperty(colorName))
        {
            continue;
        }

        var labels = this.pool[colorName] || [];
        labels.forEach(
            function(a_label)
            {
                if (a_label.getParent())
                {
                    a_label.removeFromParent(true);
                    ++Effect_ScoreRemoveCount;
                }

            }
        );

        this.pool[colorName] = [];
    }

    this.pool = {};

    //
    cc.log("Effect_ScoreCreateCount = " + Effect_ScoreCreateCount);
    cc.log("Effect_ScoreRemoveCount = " + Effect_ScoreRemoveCount);

    Effect_ScoreCreateCount = 0;
    Effect_ScoreRemoveCount = 0;

    return this.pool;
};

//----------------------------------------------------------------------------------------------------------------------
Effect_Score.prepare = function(poolSize)
{
    if (this.pool != Effect_Score.pool)
    {
        cc.Assert(0, "!!!!!")
    }

    Effect_Score.cleanUpPool();
    for (var prop in Resource.scores_pngs)
    {
        if (!Resource.scores_pngs.hasOwnProperty(prop))
        {
            continue;
        }

        //
        var fileName = Resource.scores_pngs[prop];
        this.pool[fileName] = this.pool[fileName] || [];

        //
        var size = poolSize;
        while (size > 0)
        {
            var createNew = GUI.createNumberLabel("", fileName, 22, 28, '0');//cc.LabelAtlas.create("", fileName, 22, 28, '0');
            this.pool[fileName].push(createNew);

            //
            createNew.setAnchorPoint(cc.p(0.5, 0.5));
            createNew.setVisible(false);

            //
            animateLayer().addChild(createNew);
            --size;

            //
            ++Effect_ScoreCreateCount;
        }
    }

    return this.pool;
};
//----------------------------------------------------------------------------------------------------------------------
Effect_Score.create = function(score, position, color)
{
    if (!animateLayer() || !score || !position)
    {
        cc.Assert(0, "!!!!!!")
    }

    var createNew = new Effect_Score();
    if (createNew)
    {
        createNew.init(
            score || 1,
            position || cc.p(0, 0),
            Resource.scores_pngs[color] ? color : Defines.COLOR.PINK
        );
    }

    return createNew;
};