/**
 * 文本相关功能
 */
var TextCoding = {
    UnKnown : 0,
    Unicode : 1,
    UTF_8 : 2,
    ANSI : 3
}

var TypeOf = function(obj, type) {
    return typeof obj == type;
};

var TextUtility = cc.Class.extend({
    onCreate : function() {




    },

    /**
     * 获得文本长度
     * @param text 文本
     * @ret 返回长度
     */
    getTextLength : function(text) {
        if(!TypeOf(text, "string")) {
            return 0;
        }

        var ret = 0;
        var i = 0;
        var totalWidth = 0;
        var plaintext = "";

        switch(this._coding) {
            case TextCoding.Unicode:
                return text.length;
            case TextCoding.ANSI:
                while (i < text.length) {
                    var c = text.charCodeAt(i);

                    if (c < 256) {
                        i++;
                        ret++;
                    }
                    else{
                        i += 2;
                        ret++
                    }
                }

                return ret;
            case TextCoding.UTF_8:
                while (i < text.length) {
                    var c = text.charCodeAt(i);

                    if (c < 128) {
                        i++;
                        ret++;
                    }
                    else if ((c > 191) && (c < 224)) {
                        i += 2;
                        ret++;
                    }
                    else {
                        i += 3;
                        ret++
                    }
                }

                return ret;
        }

        return 0;
    },

    subStr : function(text, length) {
        if(!TypeOf(text, "string")) {
            return "";
        }

        var ret = 0;
        var i = 0;
        var totalWidth = 0;
        var plaintext = "";

        switch(this._coding) {
            case TextCoding.Unicode:
                if(length > text.length) {
                    length = text.length;
                }

                i = length;
                break;
            case TextCoding.ANSI:
                while (i < text.length) {
                    var c = text.charCodeAt(i);

                    if (c < 256) {
                        i++;
                        ret++;
                    }
                    else{
                        i += 2;
                        ret++
                    }

                    if(ret >= length) {
                        break;
                    }
                }

                break;
            case TextCoding.UTF_8:
                while (i < text.length) {
                    var c = text.charCodeAt(i);

                    if (c < 128) {
                        i++;
                        ret++;
                    }
                    else if ((c > 191) && (c < 224)) {
                        i += 2;
                        ret++;
                    }
                    else {
                        i += 3;
                        ret++
                    }

                    if(ret >= length) {
                        break;
                    }
                }

                break;
        }

        ret = text.substr(0, i);

        return ret;
    },
    subString : function(text, start, length) {
        if(!TypeOf(text, "string")) {
            return "";
        }

        if(!TypeOf(start, "number")) {
            start = 0;
        }
        var ret = 0;
        var i = 0;
        var newindex = 0;
        var _realStart = 0;
        var _realend = 0;
        var bFillStart = false;
        var bFillEnd  = false;


        switch(this._coding) {
            case TextCoding.Unicode:
                if(length > text.length) {
                    length = text.length;
                }

                _realStart = start;
                _realend = length;
                break;
            case TextCoding.ANSI:
                while (i < text.length) {
                    var c = text.charCodeAt(i);

                    if (c < 256) {
                        i++;
                        newindex++;
                    }
                    else{
                        i += 2;
                        newindex +=2;
                    }

                    ret++;
                    newindex =i;

                    if((ret == start)&&!bFillStart) {
                        _realStart = newindex;
                        ret =0;
                        newindex = 0;
                        bFillStart = true;
                    }

                    if(bFillStart &&(ret == length)) {
                        _realend = newindex;
                        bFillEnd = true;
                    }
                    if(bFillStart && bFillEnd)
                    {
                        break;
                    }
                }

                break;
            case TextCoding.UTF_8:
                while (i < text.length) {
                    var c = text.charCodeAt(i);

                    if (c < 128) {
                        i++;
                        newindex ++;
                    }
                    else if ((c > 191) && (c < 224)) {
                        i += 2;
                        newindex +=2;
                    }
                    else {
                        i += 3;
                        newindex +=3;
                    }
                    ret++;


                    if((ret == start)&&!bFillStart) {
                        _realStart = newindex;
                        ret =0;
                        newindex = 0;
                        bFillStart = true;
                    }

                    if(bFillStart &&(ret == length)) {
                        _realend = newindex;
                        bFillEnd = true;
                    }
                    if(bFillStart && bFillEnd)
                    {
                        break;
                    }
                }

                break;
        }

        ret = text.substr(_realStart, _realend);

        return ret;
    } ,
    init : function() {
        this._coding = TextCoding.UnKnown;
        var test = "啊";

        if(test.length == 1) {
            this._coding = TextCoding.Unicode;
        } else if(test.length == 2) {
            this._coding = TextCoding.ANSI;
        } else if(test.length == 3) {
            this._coding = TextCoding.UTF_8;
        }

    }
})

var textUtility = new TextUtility();
textUtility.init();