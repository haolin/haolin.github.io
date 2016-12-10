cc.darkMgr = cc.Class.extend({
    init:function(){
         this.dark = new statistics.Statistics();
    },

    logEvent : function(){

    }
});

cc.darkMgr._instance = null;
cc.darkMgr.getInstance = function(){
    if(cc.darkMgr._instance == null){
       cc.darkMgr._instance = new cc.darkMgr();
       cc.darkMgr._instance.init();
    }

    return cc.darkMgr._instance;
}