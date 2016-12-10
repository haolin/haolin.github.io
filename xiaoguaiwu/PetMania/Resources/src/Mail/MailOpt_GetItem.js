var ITEM_GET_WAY = {
    ACHIEVE_SUCCESS : 100,
    COMPLETE_MISSION : 101,
    SHARE_DONE : 102,
    INVITE_FRIEND: 103,
    SIGN_BONUS: 104,
    GIFT_BAG: 105
};

//======================================================================================================================
var MailHandler_GetItem = IMailHandler.extend({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function(getWayIndex, items)
    {
        this._super();
        this._way = getWayIndex;
        this._items = items;
    },

    getIconSprite: function()
    {
        var iconId = this._items[0].id + 10;
        if(ServerItemTypes[iconId.toString()] != null && ServerItemTypes[iconId.toString()] != "")
        {
            return ServerItemTypes[iconId.toString()].SPRITESOURCE;
        }
        else
        {
            return "default";
        }
    },
    //------------------------------------------------------------------------------------------------------------------
    toString: function()
    {
        return "MailHandler_GetItem";
    },

    //------------------------------------------------------------------------------------------------------------------
    handle: function(mailInfo, objectInfo)
    {
        //服务器返回邮件内的物品
        ParseGameObjectInfo(objectInfo);

        /*this._items.forEach(
            function(each)
            {
                if(each.id == 22)
                {
                    cc.DataMng.getInstance().addMoney(11000);
                    cc.DataMng.getInstance().addHeart(5);
                }
                else if(each.id == 23)
                {
                    cc.DataMng.getInstance().addMoney(48000);
                    cc.DataMng.getInstance().addHeart(20);
                }
                else if(each.id == 24)
                {
                    cc.DataMng.getInstance().addMoney(110000);
                    cc.DataMng.getInstance().addHeart(50);
                }
                else if(each.id == 14)
                {
                    cc.DataMng.getInstance().buyItemByID(3, 5, 0);
                    cc.DataMng.getInstance().buyItemByID(4, 5, 0);
                    cc.DataMng.getInstance().buyItemByID(5, 5, 0);
                    cc.DataMng.getInstance().buyItemByID(6, 5, 0);
                    cc.DataMng.getInstance().buyItemByID(7, 5, 0);
                    cc.DataMng.getInstance().buyItemByID(8, 5, 0);
                    cc.DataMng.getInstance().buyItemByID(9, 5, 0);
                    cc.DataMng.getInstance().buyItemByID(10, 5, 0);
                }
                else if(each.id == 19)
                {
                    cc.DataMng.getInstance().addGameContinueCount(each.amount);
                }
                else if(each.id == 91)
                {
                    cc.DataMng.getInstance().addMoney(each.amount);
                }
                else if(each.id == 111)
                {
                    cc.DataMng.getInstance().addHeart(each.amount);
                }
                else
                {
                    cc.DataMng.getInstance().buyItemByID(each.id, each.amount, 0);
                }
            }
        );*/
        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    parseMailContent: function(/*mailInfo*/)
    {
        var content = "";
        switch (this._way)
        {
            case ITEM_GET_WAY.ACHIEVE_SUCCESS:
            {
                content =Resource.ChineseTxt["mail_content_8"];
                break;
            }
            case ITEM_GET_WAY.COMPLETE_MISSION:
            {
                content = Resource.ChineseTxt["mail_content_7"];
                break;
            }
            case ITEM_GET_WAY.SHARE_DONE:
            {
                content = Resource.ChineseTxt["mail_content_5"];
                break;
            }
            case ITEM_GET_WAY.INVITE_FRIEND:
            {
                content = Resource.ChineseTxt["mail_content_10"];
                break;
            }
            case ITEM_GET_WAY.SIGN_BONUS:
            {
                content = Resource.ChineseTxt["mail_content_11"];
                break;
            }
            case ITEM_GET_WAY.GIFT_BAG:
            {
                content = Resource.ChineseTxt["mail_content_12"];
                break;
            }
            case ITEM_GET_WAY.INVITE_FRIEND:
            {
                content = Resource.ChineseTxt["mail_content_13"];
                break;
            }
            default :
                break;
        }

        return content;
    }
});

MailHandler_GetItem.create = function(wayIndex, items)
{
    return new MailHandler_GetItem(wayIndex, items);
};

MailHandler_GetItem.createByJson = function(json)
{
    var items = [];
    json.msg.base.forEach(
        function(each)
        {
            var item = {};
            item.amount = each.num;
            item.type = "item";
            item.id = each.rewardid - 10;
            items.push(item);
            cc.log("server give item " + each.propsid);
            cc.log("server give item " + each.num);
        }
    );
    cc.log("server send msg json " + json.toString());
    cc.log("server send msg " + json.msg.toString());
    for(var sth in json.msg)
    {
        cc.log("server send msg in msg" + sth.toString());
    }
    for(var sth in json.msg.base)
    {
        cc.log("server send msg in msg.base " + sth.toString());
    }
    for(var sth in json.msg.base[0])
    {
        cc.log("server send msg in msg.base[0] " + sth.toString());
    }
    cc.log("server send msg of json " + JSON.stringify(json));
    cc.log("server send msg of msg.base[0]" + JSON.stringify(json.msg.base[0]));

    if(json.msg.brief == 6)
    {
        return new MailHandler_GetItem(ITEM_GET_WAY.ACHIEVE_SUCCESS, items);
    }
    else if(json.msg.brief == 8)
    {
        return new MailHandler_GetItem(ITEM_GET_WAY.SIGN_BONUS, items);
    }
    else if(json.msg.brief == 7)
    {
        return new MailHandler_GetItem(ITEM_GET_WAY.GIFT_BAG, items);
    }
    else if(json.msg.brief == 10)
    {
        return new MailHandler_GetItem(ITEM_GET_WAY.INVITE_FRIEND, items);
    }
    else
    {
        return new MailHandler_GetItem(ITEM_GET_WAY.COMPLETE_MISSION, items);
    }
};
