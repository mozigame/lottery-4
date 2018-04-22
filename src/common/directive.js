import Vue from 'vue';

Vue.directive('avatar', function (el, binding) {
  const defaultUrl = 'http://tclottery.oss-cn-hangzhou.aliyuncs.com/tigerH5App/img/avatar.png';
  el.onerror = function () {
    el.src = defaultUrl;
    el.onerror = null;
  }
  el.src = binding.value ? binding.value : defaultUrl;
})

Vue.directive('vip', function (el, binding) {
  const defaultUrl = 'http://tclottery.oss-cn-hangzhou.aliyuncs.com/admin_file/2017-03-01/58b682bb18bc6.png';
  el.onerror = function () {
    el.src = defaultUrl;
    el.onerror = null;
  }
  el.src = binding.value ? binding.value : defaultUrl;
})

Vue.directive('rowspan', function (el, binding) {
  el.setAttribute('rowspan', binding.value);
})
