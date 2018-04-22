<template>
  <div class="captcha-button">
    <a href="javascript:;" class="btn" :class="{disabled: disabled}" @click="getCaptcha">{{text}}</a>
  </div>
</template>

<script>
  import Util from '../common/util';
  import Toast from '../common/toast';
  import { GET_CAPTCHA } from '../store/user/types';

  const textArr = ['获取验证码', '等待 '];
  export default {
    name: 'captchaButton',
    data () {
      return {
        disabled: false,
        text: textArr[0]
      }
    },
    props: ['phone', 'type', 'appId'],
    methods: {
      getCaptcha () {
        if (Util.isMobile(this.phone)) {
          let times = 60;
          const countDown = () => {
            setTimeout(() => {
              times--;
              this.text = textArr[1] + times;
              if (times === 0) {
                this.disabled = false;
                this.text = textArr[0];
              } else {
                countDown();
              }
            }, 1000);
          };
          if (!this.disabled) {
            this.disabled = true;
            this.text = textArr[1] + times;
            // 发送短信API
            this.$store.dispatch(GET_CAPTCHA, { tel: this.phone, type: this.type, app_id: this.appId });
            countDown();
          }
        } else {
          Toast('请输入正确的手机号!');
        }
      }
    }
  }
</script>

<style scoped>
  .captcha-button a.disabled {
    background: #ddd;
    color: white;
  }
</style>
