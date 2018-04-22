/**
 * Created by weishuwen on 2017/3/29.
 */

if (!String.prototype.format) {
  String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
      if (arguments.length === 1 && typeof (args) === 'object') {
        for (var key in args) {
          if (args[key] !== undefined) {
            let reg = new RegExp('({' + key + '})', 'g');
            result = result.replace(reg, args[key]);
          }
        }
      } else {
        for (var i = 0; i < arguments.length; i++) {
          if (arguments[i] !== undefined) {
            let reg = new RegExp('({)' + i + '(})', 'g');
            result = result.replace(reg, arguments[i]);
          }
        }
      }
    }
    return result;
  }
}

export default {
  isMobile (mobile) {
    return /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(mobile);
  },
  passwordValid (value) {
    return /^(?=.*\d)[a-zA-Z\d]{6,18}$/.test(value);
  },
  smsValid (value) {
    return /^\d{6}$/.test(value);
  },
  identityValid (value) {
    return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/.test(value);
  },
  isBank (value) {
    return /^[\d\s]+$/.test(value);
  },
  isNull (value) {
    return /\S/.test(value);
  },
  isPositive (value) {
    return /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value);
  },
  analyseBetting (o, keyValue) {
    let arr = [];
    for (var key in keyValue) {
      if (o.hasOwnProperty(key)) {
        arr.push({
          text: keyValue[key], value: o[key]
        });
      }
    }
    return arr;
  },
  urlSearch () {
    var name;
    var value;
    var result = {};
    var str = location.hash; // 取得整个地址栏
    var num = str.indexOf('?');
    str = str.substr(num + 1); // 取得所有参数 stringvar.substr(start [, length ]

    var arr = str.split('&'); // 各个参数放到数组里
    for (var i = 0; i < arr.length; i++) {
      num = arr[i].indexOf('=');
      if (num > 0) {
        name = arr[i].substring(0, num);
        value = decodeURI(arr[i].substr(num + 1));
        result[name] = value;
      }
    }
    return result;
  },
  originUrlSearch () {
    let name;
    let value;
    let result = {};
    if (location.search) {
      let str = location.search.substr(1);
      let arr = str.split('&');
      arr.map(v => {
        let num = v.indexOf('=');
        if (num > 0) {
          name = v.substr(0, num);
          value = decodeURI(v.substr(num + 1));
          result[name] = value;
        }
      })
    }
    return result;
  },
  isFootball (lotteryId) {
    const ids = ['601', '602', '603', '604', '605', '606'];
    return ids.indexOf(String(lotteryId)) !== -1;
  },
  isBasketball (lotteryId) {
    const ids = ['701', '702', '703', '704', '705'];
    return ids.indexOf(String(lotteryId)) !== -1;
  },
  timeFmt (value, fmt) {
    var time = new Date(value * 1000);
    const o = {
      'M+': time.getMonth() + 1, // 月份
      'd+': time.getDate(), // 日
      'h+': time.getHours(), // 小时
      'm+': time.getMinutes(), // 分
      's+': time.getSeconds(), // 秒
      'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
      'S': time.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
  },
  mobile: {
    agent: navigator.userAgent,
    isWeiXin () {
      console.log(this.agent);
      return /MicroMessenger/i.test(this.agent);
    }
  },
  timeCountdown (end, callback) {
    callback && callback((end * 1000 - Date.now()) / 1000);
    const t = setInterval(() => {
      let result = (end * 1000 - Date.now()) / 1000;
      if (result <= 0) {
        window.clearInterval(t);
        callback && callback(result);
      } else {
        callback && callback(result);
      }
    }, 1000);
    return t;
  },
  getWeekDay (timestamp) {
    const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return weeks[new Date(timestamp * 1000).getDay()];
  },
  loadingCalculator (callbackModule) {
    this.loadScript('{0}/static/js/calculate.js?v=20170719'.format(location.origin), function () { // 加载,并执行回调函数
      callbackModule(window.Module);
    });
  },
  loadScript (url, callback) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    if (typeof (callback) !== 'undefined') {
      if (script.readyState) {
        script.onreadystatechange = function () {
          if (script.readyState === 'loaded' || script.readyState === 'complete') {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {
        script.onload = function () {
          callback();
        };
      }
    }
    script.src = url;
    document.body.appendChild(script);
  }
}
