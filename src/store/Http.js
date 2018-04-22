import axios from 'axios';
import { CLEAR_TOKEN } from './user/types';
import Toast from '../common/toast';
import { user } from '../common/store';
import loading from '../common/loading';
import store from './index';
import md5 from 'js-md5';

let HOST = '/api';

if (window.API_HOST) {
  HOST = window.API_HOST;
}

// code > 0 时，失败处理
function errorHandle (data, reject) {
  reject(data);
  loading.hide();
  switch (data.code) {
    case 10003:
      store && store.commit(CLEAR_TOKEN);
      break;
    default:
      Toast(data.msg);
  }
}
// 请求失败处理
function errorCatch (error, reject) {
  reject(error);
  loading.hide();
  Toast('连接服务器异常');
}

const config = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  withCredentials: false, // default
  responseType: 'json', // default
  xsrfCookieName: 'XSRF-TOKEN', // default
  xsrfHeaderName: 'X-XSRF-TOKEN' // default
}

function getToken () {
  return user.getToken();
}

/*
 ** randomWord 产生任意长度随机字母数字组合
 ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
 */
function randomWord (randomFlag, min, max) {
  var str = '';
  var range = min;
  var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    var pos = Math.round(Math.random() * (arr.length - 1));
    str = str + arr[pos];
  }
  return str;
}

export default class Http {
  static get (url, params = {}) {
    return new Promise(function (resolve, reject) {
      axios.get(HOST + '/Index/getTime', {...config})
        .then(response => {
          if (response.data.code === 0) {
            var currentTimeStemp = (Date.parse(new Date())) / 1000;
            resolve(response.data.data - currentTimeStemp);
          } else {
            errorHandle(response.data, reject);
          }
        })
        .catch(error => {
          errorCatch(error, reject);
        });
    }).then(function (responseData) {
      return new Promise((resolve, reject) => {
        // axios.defaults.headers.common['Authorization'] = getToken();
        var currentTimeStemp = (Date.parse(new Date())) / 1000;
        var timestamps = responseData + currentTimeStemp;
        var valToken = getToken();
        if (valToken === undefined) {
          valToken = '';
        }
        var secretKey = 'ikD12opAwZE1Sobg';
        var nonce = randomWord(true, 5, 32);
        var sign = md5(valToken + timestamps + nonce + secretKey);
        params.timestamp = timestamps;
        params.nonce = nonce;
        params.ssign = sign;
        params.token = valToken;
        axios.get(HOST + url, {...config, params})
          .then(response => {
            if (response.data.code === 0) {
              resolve(response.data.data);
            } else {
              errorHandle(response.data, reject);
            }
          })
          .catch(error => {
            errorCatch(error, reject);
          });
      });
    })
  }

  static post (url, data = {}) {
    return new Promise(function (resolve, reject) {
      axios.get(HOST + '/Index/getTime', {...config})
        .then(response => {
          if (response.data.code === 0) {
            var currentTimeStemp = (Date.parse(new Date())) / 1000;
            resolve(response.data.data - currentTimeStemp);
          } else {
            errorHandle(response.data, reject);
          }
        })
        .catch(error => {
          errorCatch(error, reject);
        });
    }).then(function (responseData) {
      return new Promise((resolve, reject) => {
        data.token = getToken();
        // axios.defaults.headers.common['Authorization'] = getToken();
        var currentTimeStemp = (Date.parse(new Date())) / 1000;
        var timestamps = responseData + currentTimeStemp;
        var valToken = getToken();
        if (valToken === undefined) {
          valToken = '';
        }
        var secretKey = 'ikD12opAwZE1Sobg';
        var nonce = randomWord(true, 5, 32);
        var sign = md5(valToken + timestamps + nonce + secretKey);
        const params = {timestamp: timestamps, nonce: nonce, ssign: sign, token: valToken};
        axios.post(HOST + url, data, {...config, params})
          .then(response => {
            if (response.data.code === 0) {
              resolve(response.data.data);
            } else {
              errorHandle(response.data, reject);
            }
          })
          .catch(error => {
            errorCatch(error, reject);
          });
      });
    })
  }
}
