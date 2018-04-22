import Vue from 'vue';
import Util from '../common/util';

Vue.filter('currency', function (value) {
  if (value || value === 0) {
    const v = parseFloat(value);
    return !isNaN(v) && (v).toFixed(2);
  }
  return;
})

Vue.filter('dateFormat', function (value, fmt) {
  return Util.timeFmt(value, fmt)
})

Vue.filter('getEndTime', function (timestamp) {
  const timeGap = (timestamp * 1000 - Date.now()) / 1000;
  const HOUR = 60 * 60;
  const DAY = 24 * HOUR;
  const MONTH = 30 * DAY;
  const YEAR = 365 * DAY;
  if (timestamp === 0) {
    return '永久'
  } else if (timeGap > YEAR) {
    return Math.floor(timeGap / YEAR) + '年后过期';
  } else if (timeGap > MONTH) {
    return Math.floor(timeGap / MONTH) + '月后过期';
  } else if (timeGap > DAY) {
    return Math.floor(timeGap / DAY) + '天后过期';
  } else if (timeGap > HOUR) {
    return Math.floor(timeGap / HOUR) + '小时后过期';
  } else {
    return '即将过期';
  }
})

Vue.filter('subStrLast4', function (value) {
  if (value) {
    const v = value.toString().replace(/\s/g, '');
    const len = v.length;
    return v.substr((len - 4), 4);
  }
  return;
})
