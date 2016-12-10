/**
 * Created by hong.zhang on 2014/8/19.
 */

var CashslideInterface = cc.Class.extend({
    ctor: function()
    {

    },

    init: function()
    {

    },

    appFirstLaunched: function()
    {
        cc.log("CashslideInterface appFirstLaunched");
        if(!this.canUse())
        {
            return this;
        }

        joysdk = opJoy.OpJoy();
        joysdk.appFirstLaunched();

    },

    canUse: function()
    {
        return (CashslideInterface.CHANNELS.hasOwnProperty(CHANNEL));
    }

});


CashslideInterface._instance = null;
CashslideInterface.getInstance = function(){
    if(CashslideInterface._instance == null){
        CashslideInterface._instance = new CashslideInterface();
        CashslideInterface._instance.init();
    }
    return  CashslideInterface._instance;
};

CashslideInterface.CHANNELS = {
    "300004" : "GOOGLE_KO"
};
