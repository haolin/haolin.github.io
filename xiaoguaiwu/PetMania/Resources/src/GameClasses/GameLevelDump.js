//======================================================================================================================
var GameLevelDump = cc.Class.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this.m_Dump = [];
        this.m_CleanDump = false;
    },

    //------------------------------------------------------------------------------------------------------------------
    addToDump: function(nodeObject)
    {
        //
        if (!(nodeObject instanceof cc.INodeObject))
        {
            return this;
        }

        //
        if (nodeObject)
        {
            nodeObject.removeFromParentNode();
            nodeObject.release();
            this.m_Dump.push(nodeObject);
        }

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    notify: function()
    {
        this.m_CleanDump = true;
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    release: function()
    {
        this.m_Dump = [];
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    update: function()
    {
        if (this.m_CleanDump)
        {
            this.m_CleanDump = false;
            this.release();
        }

        return this;
    }
});
