/**
 * Created by hong.zhang on 2014/8/18.
 */

var PartyTrackInterface = cc.Class.extend({
    ctor: function()
    {

    },

    init: function()
    {

    },

    eventSceneMainMenu: function()
    {
        cc.log("PartyTrackInterface eventSceneMainMenu");
        if(!this.canUse())
        {
            return this;
        }
        joysdk = opJoy.OpJoy();
        joysdk.partytrackEvent(PartyTrackInterface.EventId.SCENE_MAINMENU);

    },

    eventSceneMainMap: function()
    {
        cc.log("PartyTrackInterface eventSceneMainMap");
        if(!this.canUse())
        {
            return this;
        }
        joysdk = opJoy.OpJoy();
        joysdk.partytrackEvent(PartyTrackInterface.EventId.SCENE_MAINMAP);
    },

    payment: function(itemName, itemPrice, itemNum)
    {
        cc.log("PartyTrackInterface payMent");
        cc.log("itemName" + itemName);
        cc.log("itemPrice" + itemPrice);
        cc.log("itemPriceCurrency" + PartyTrackInterface.CURRENCY[CHANNEL]);
        cc.log("itemNum" + itemNum);
        if(!this.canUse())
        {
            return this;
        }
        joysdk = opJoy.OpJoy();
        joysdk.partytrackPayment(itemName, PartyTrackInterface.CURRENCY[CHANNEL], itemPrice, itemNum);
    },

    canUse: function()
    {
        return (PartyTrackInterface.CHANNELS.hasOwnProperty(CHANNEL));
    }

});


PartyTrackInterface._instance = null;
PartyTrackInterface.getInstance = function(){
    if(PartyTrackInterface._instance == null){
        PartyTrackInterface._instance = new PartyTrackInterface();
        PartyTrackInterface._instance.init();
    }
    return  PartyTrackInterface._instance;
};


PartyTrackInterface.EventId =  {
    SCENE_MAINMENU: 18389,
    SCENE_MAINMAP: 18390
};

//暂时只有一个渠道使用这个
//就不先利用数组了
PartyTrackInterface.CHANNELS = {
    "300004" : "GOOGLE_KO",
    "300005" : "TSTORE_KO"
};

PartyTrackInterface.CURRENCY = {
    "300004" : "KRW",
    "300005" : "KRW"
};