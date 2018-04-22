<template>
  <div>
    <v-head title="注册"></v-head>
    <div class="register padding">
      <div>
        <input type="text" v-model="phone" placeholder="请输入手机号码">
      </div>
      <div class="margin-top-10 row">
        <div class="col col-60">
          <input type="text" v-model="captcha" placeholder="请输入短信验证码">
        </div>
        <div class="col col-40 padding-left-10">
          <captcha-button :phone="phone" :type="1" appId="1"></captcha-button>
        </div>
      </div>
      <div class="margin-top-10">
        <input type="password" v-model="password" maxlength="18" placeholder="请设置密码">
      </div>
      <div class="margin-top-20">
        <a href="javascript:;" class="btn" @click="submit">注册</a>
      </div>
      <div class="margin-top-10">
        <router-link :to="loginUrl" class="btn btn-out-line">已有账号？登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import VHead from '../../components/VHead.vue';
  import CaptchaButton from '../../components/CaptchaButton';
  import Util from '../../common/util';
  import router from '../../router/index';
  import Toast from '../../common/toast';
  import { mapActions } from 'vuex';
  import { REGISTER } from '../../store/user/types';

  export default {
    name: 'register',
    data () {
      return {
        phone: '',
        password: '',
        captcha: '',
        loginUrl: {
          name: 'Login', query: router.currentRoute.query
        }
      }
    },
    methods: {
      submit () {
        if (!Util.isMobile(this.phone)) {
          Toast('请输入正确的手机号!');
          return;
        }
        if (!Util.smsValid(this.captcha)) {
          Toast('请输入短信验证码!');
          return;
        }
        if (!Util.passwordValid(this.password)) {
          Toast('请输入6-18位密码, 不能有特殊字符!');
          return;
        }
        this.register({
          tel: this.phone,
          passwd: this.password,
          sms_validation: this.captcha,
          channel_type: Util.originUrlSearch()['channel_type'] || Util.urlSearch()['channel_type'],
          channel_id: Util.originUrlSearch()['channel_id'] || Util.urlSearch()['channel_id']
        });
      },
      ...mapActions({
        register: REGISTER
      })
    },
    components: {
      VHead, CaptchaButton
    }
  }
</script>

