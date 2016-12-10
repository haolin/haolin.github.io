//安全的var 防止八门神器
/*
*
* 由于时间，我暂时没有办法攻破替换掉var，以后有机会再研究。
*
* 用法：
*
*   var test = new safevar(); //首先是声明
*   test.setValue(100);       //赋值操作
*   cc.log(test.getValue());   //获取test里面收到保护的值,如果是参与判断和运算可以直接写test，不过遇到return等不是运算方面的必须写getValue()
*
* */
function safevar() {

    var _this = this;
    this.nx = 0;

    this.setValue = function(n)
    {
        if(n == undefined)
        {
            return;
        }
        var random = Tools.randomEx(9999999);
        
        var randomAndN = {"data":n,"random":random};
        _this.nx = cc.Appark.getInstance().stringifyLow(JSON.stringify(randomAndN));
        //cc.log("加密后数据: "+_this.nx);
    };

    this.getValue = function()
    {
        return this.toString();
    };

    this.toString = function()
    {
        var parse = cc.Appark.getInstance().parseLow(_this.nx);
        return JSON.parse(parse)["data"];
    };
}