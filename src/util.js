var util = util || {};
//util.sprintf  = function() {
//    var i = 0, a, f = arguments[i++], o = [], m, p, c, x, s = '';
//    while (f) {
//        if (m = /^[^\x25]+/.exec(f)) {
//            o.push(m[0]);
//        }
//        else if (m = /^\x25{2}/.exec(f)) {
//            o.push('%');
//        }
//        else if (m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f)) {
//            if (((a = arguments[m[1] || i++]) == null) || (a == undefined)) {
//                throw('Too few arguments.');
//            }
//            if (/[^s]/.test(m[7]) && (typeof(a) != 'number')) {
//                throw('Expecting number but found ' + typeof(a));
//            }
//            switch (m[7]) {
//                case 'b': a = a.toString(2); break;
//                case 'c': a = String.fromCharCode(a); break;
//                case 'd': a = parseInt(a); break;
//                case 'e': a = m[6] ? a.toExponential(m[6]) : a.toExponential(); break;
//                case 'f': a = m[6] ? parseFloat(a).toFixed(m[6]) : parseFloat(a); break;
//                case 'o': a = a.toString(8); break;
//                case 's': a = ((a = String(a)) && m[6] ? a.substring(0, m[6]) : a); break;
//                case 'u': a = Math.abs(a); break;
//                case 'x': a = a.toString(16); break;
//                case 'X': a = a.toString(16).toUpperCase(); break;
//            }
//            a = (/[def]/.test(m[7]) && m[2] && a >= 0 ? '+'+ a : a);
//            c = m[3] ? m[3] == '0' ? '0' : m[3].charAt(1) : ' ';
//            x = m[5] - String(a).length - s.length;
//            p = m[5] ? str_repeat(c, x) : '';
//            o.push(s + (m[4] ? a + p : p + a));
//        }
//        else {
//            throw('Huh ?!');
//        }
//        f = f.substring(m[0].length);
//    }
//    return o.join('');
//};

util.formatStr = function(len, integer){
    var result = integer.toString();
    while(result.length < len){
        result = "0" + result;
    }

    return result;
};

//获取Min到Max之间的随机数
util.getRandomNumber = function(Min,Max)
{
    var Range = Max - Min + 1;
    var Rand = Math.random();
    return(Min + Math.floor(Rand * Range));
};

//获取Min到Max之间的随机数

util.getRandomFloat = function(Min,Max)
{
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Rand * Range);
};

util.createButton = function(normalImg, selectedImg, three, four, five, six, seven){
    var normalImage = null,
        selectedImage = null,
        disabledImage = null,
        callback = null,
        target = null,
        text = null,
        fontName = null;

    normalImage = selectedImage = disabledImage = normalImg;
    fontName = "GUBBLABLO";

    if (five === undefined) {
        text = selectedImg;
        target = three;
        callback = four;
    } else if (six === undefined) {
        selectedImage = selectedImg;
        text = three;
        target = four;
        callback = five;
    } else if (six === undefined) {
        selectedImage = selectedImg;
        disabledImage = three;
        text = four;
        target = five;
        callback = six;
    }else{
        selectedImage = selectedImg;
        disabledImage = three;
        text = four;
        target = five;
        callback = six;
        fontName = seven;
    }

    var button = new cc.MenuItemImage(normalImage,selectedImage,disabledImage, callback, target);
    var text = new cc.LabelTTF(text,  fontName, 0.0333333*ScreenSize.width);
    text.setPosition(button.getContentSize().width/2, button.getContentSize().height/2);
    button.addChild(text);
    return button;
};

util.createButtonWithFontName = function(imageName, text, fontName, target, callback ){
    return util.createButton(imageName, imageName, imageName, text, target, callback, fontName);
};

util.getRandomElements = function(array, count){
    if(!array || array.length === 0){
        return null;
    }

    if(count > array.length){
        return null;
    }

    var result = [];
    var arr = array.slice(0);

    for (var idx = 0; idx < count; idx++){
        var elementIdx = util.getRandomNumber(0, arr.length - 1);
        result.push(arr[elementIdx]);
        arr.splice(elementIdx,1);
    }

    return result;
};

util.getRandomElement = function(array){
    var result = util.getRandomElements(array, 1);
    if(result.length > 0){
        return result[0];
    }else{
        return null;
    }
};

util.getRandomBool = function(){
    var random = Math.random();
    if(random >= 0.5){
        return true;
    }else{
        return false;
    }
};

/**
 * 将攻击方块的百分比速度转化为实际速度
 * @param {Float} p   - 0到1
 * @return {Boolen}
 */
util.getRandomProbability = function(p){
    var random = Math.random();
    if(random < p){
        return true;
    }else{
        return false;
    }
};

/**
 * 将攻击方块的百分比速度转化为实际速度
 * @param {String} percentage   -点击位置x坐标
 * @return {Float}
 */
util.getValueByPercentage = function(percentage){
    var percentageValue = parseFloat(percentage);
    var value = ATTACK_HOLDER_WIDTH * (percentageValue / 100);
    return value;
};

util.getPropertyCount = function(o){
    var n, count = 0;
    for(n in o){
        if(o.hasOwnProperty(n)){
            count++;
        }
    }
    return count;
};

util.parseSringForLabel = function(str){
    if(str){
        str = str.replace(/_/,"@");
        str = str.replace(/-/,"?");
        str = str.replace(/\+/,">");
        str = str.replace(/\//,"=");
        str = str.replace(/x/,"<");
        str = str.replace(/:/,";");
        str = str.replace(/,/,":");
    }
    return str;
};
util.getLoadingValue = function(value){
    if(value <= 0){
        return 9;
    }
    else if(value >= 100){
        return 100;
    }
    else {
        return  Math.ceil( 9 + value * (100 - 9)/100);
    }
};