   function formatMsgTime(timespan) {
       var dateTime = new Date(timespan) // 将传进来的字符串或者毫秒转为标准时间
       var year = dateTime.getFullYear()
       var month = dateTime.getMonth() + 1
       var day = dateTime.getDate()
       var hour = dateTime.getHours()
       var minute = dateTime.getMinutes()
       // var second = dateTime.getSeconds()
       var millisecond = dateTime.getTime() // 将当前编辑的时间转换为毫秒
       var now = new Date() // 获取本机当前的时间
       var nowNew = now.getTime() // 将本机的时间转换为毫秒
       var milliseconds = 0
       var timeSpanStr
       milliseconds = nowNew - millisecond
       if (milliseconds <= 1000 * 60 * 1) { // 小于一分钟展示为刚刚
           timeSpanStr = '刚刚'
       } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) { // 大于一分钟小于一小时展示为分钟
           timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前'
       } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) { // 大于一小时小于一天展示为小时
           timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前'
       } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) { // 大于一天小于十五天展示位天
           timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前'
       } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year === now.getFullYear()) {
           timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute
       } else {
           timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
       }
       return timeSpanStr
   }

   function createdTime() {
    var dateTime = new Date() // 将传进来的字符串或者毫秒转为标准时间
    var year = dateTime.getFullYear()
    var month = (dateTime.getMonth() + 1)< 10 ? "0"+((dateTime.getMonth() + 1)) : (dateTime.getMonth() + 1)
    var day = dateTime.getDate()< 10 ? "0"+dateTime.getDate() : dateTime.getDate()
    var hour = dateTime.getHours()< 10 ? "0"+dateTime.getHours() : dateTime.getHours()
    var minute = dateTime.getMinutes()< 10 ? "0"+dateTime.getMinutes() : dateTime.getMinutes()
    var second = dateTime.getSeconds() < 10 ? "0"+dateTime.getSeconds() : dateTime.getSeconds()
    var timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute +':'+second
    return timeSpanStr
}

function orderNumber() {
    var dateTime = new Date() // 将传进来的字符串或者毫秒转为标准时间
    var year = dateTime.getFullYear()
    var month = dateTime.getMonth() + 1
    var day = dateTime.getDate()
    var hour = dateTime.getHours()< 10 ? "0"+dateTime.getHours() : dateTime.getHours()
    var minute = dateTime.getMinutes()< 10 ? "0"+dateTime.getMinutes() : dateTime.getMinutes()
    var second = dateTime.getSeconds() < 10 ? "0"+dateTime.getSeconds() : dateTime.getSeconds()
    var timeSpanStr = 'LX'+ year + month + day + hour + minute + second + (Math.round(Math.random() * 10000)).toString()
    return timeSpanStr
}

function refundOrderNumber() {
    var dateTime = new Date() // 将传进来的字符串或者毫秒转为标准时间
    var year = dateTime.getFullYear()
    var month = dateTime.getMonth() + 1
    var day = dateTime.getDate()
    var hour = dateTime.getHours()< 10 ? "0"+dateTime.getHours() : dateTime.getHours()
    var minute = dateTime.getMinutes()< 10 ? "0"+dateTime.getMinutes() : dateTime.getMinutes()
    var second = dateTime.getSeconds() < 10 ? "0"+dateTime.getSeconds() : dateTime.getSeconds()
    var timeSpanStr = 't'+ year + month + day + hour + minute + second + (Math.round(Math.random() * 10000)).toString()
    return timeSpanStr
}

const _charStr = 'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNWQOPQRSTUVWXYZ0123456789';

	/**
	 * 随机生成索引
	 * @param min 最小值
	 * @param max 最大值
	 * @param i 当前获取位置
	 */
	function RandomIndex(min, max, i){
	    let index = Math.floor(Math.random()*(max-min+1)+min),
	        numStart = _charStr.length - 10;
	    //如果字符串第一位是数字，则递归重新获取
	    if(i==0&&index>=numStart){
	        index = RandomIndex(min, max, i);
	    }
	    //返回最终索引值
	    return index;
	}

	/**
	 * 随机生成字符串
	 * @param len 指定生成字符串长度
	 */
    function getRandomString(len){
	    let min = 0, max = _charStr.length-1, _str = '';
	    //判断是否指定长度，否则默认长度为15
	    len = len || 15;
	    //循环生成字符串
	    for(var i = 0, index; i < len; i++){
	        index = RandomIndex(min, max, i);
	        _str += _charStr[index];
	    }
	    return _str;
	}


    function deepClone(obj, hash = new WeakMap()) {
        if (hash.has(obj)) {
            return obj;
        }
        let res = null;
        const reference = [Date, RegExp, Set, WeakSet, Map, WeakMap, Error];

        if (reference.includes(obj.constructor)) {
            res = new obj.constructor(obj);
        } else if (Array.isArray(obj)) {
            res = [];
            obj.forEach((e, i) => {
                res[i] = deepClone(e);
            });
        } else if (typeof obj === "Object" && obj !== null) {
            res = {};
            for (const key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    res[key] = deepClone(obj[key]);
                }
            }
        } else {
            res = obj;
        }
        hash.set(obj, res);
        return res;
    }

   module.exports = {
       formatMsgTime,
       createdTime,
       orderNumber,
       getRandomString,
       deepClone,
       refundOrderNumber
   }
