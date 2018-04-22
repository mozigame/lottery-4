<template>
  <div>
    <v-head title="找回密码"></v-head>
    <div class="register padding">
      <div>
        <input type="text" v-model="phone" placeholder="请输入手机号码">
      </div>
      <div class="margin-top-10 row">
        <div class="col col-60">
          <input type="text" v-model="captcha" placeholder="请输入短信验证码">
        </div>
        <div class="col col-40 padding-left-10">
          <captcha-button :phone="phone" :type="4" appId="1"></captcha-button>
        </div>
      </div>
      <div class="margin-top-10">
        <input type="password" maxlength="18" v-model="password" placeholder="请输入新密码">
      </div>
      <div class="margin-top-10">
        <input type="password" maxlength="18" v-model="confirmPassword" placeholder="请再次输入新密码">
      </div>
      <div class="margin-top-20">
        <a href="javascript:;" class="btn" @click="submit">提交</a>
      </div>
    </div>
  </div>
</template>

<script>
  import VHead from '../../components/VHead.vue';
  import CaptchaButton from '../../components/CaptchaButton';
  import Util from '../../common/util';
  import Toast from '../../common/toast';
  import { mapActions } from 'vuex';
  import { FORGET_PASSWORD } from '../../store/user/types';

  export default {
    name: 'forgotPassword',
    data () {
      return {
        phone: '',
        captcha: '',
        password: '',
        confirmPassword: ''
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
        if (this.password !== this.confirmPassword) {
          Toast('两次密码不一样!');
          return;
        }
        this.forgetPassword({
          tel: this.phone, passwd: this.password, sms_validation: this.captcha
        })
      },
      ...mapActions({
        forgetPassword: FORGET_PASSWORD
      })
    },
    components: {
      VHead, CaptchaButton
    }
  }
</script>

