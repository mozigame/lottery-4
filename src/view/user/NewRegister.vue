<template>
  <div class="new-register">
    <div class="logo">
      <img src="../../assets/new_register/logo.png" alt="logo">
    </div>
    <div class="form">
      <div class="flag"></div>
      <div class="form-input" v-show="!success">
        <div class="input">
          <input type="text" v-model="phone" placeholder="请输入手机号码">
        </div>
        <div class="row margin-top-10">
          <div class="col col-60">
            <div class="input">
              <input type="text" v-model="captcha" placeholder="请输入短信验证码">
            </div>
          </div>
          <div class="col-40 padding-left-10">
            <captcha-button :phone="phone" :type="1" appId="3"></captcha-button>
          </div>
        </div>
        <div class="input margin-top-10">
          <input type="password" v-model="password" placeholder="请设置密码">
        </div>
        <div class="margin-top-10">
          <a href="javascript:;" class="btn" @click="submit">注册</a>
        </div>
      </div>
      <div class="success-panel text-center" v-show="success">
        <p class="margin-top-10 text-muted text-ml">注册成功</p>
        <div class="margin-top-10">
          <a href="javascript:;" @click="download('ios')" class="btn" style="background: #3a70e5">IOS下载</a>
        </div>
        <div class="margin-top-10">
          <a href="javascript:;" @click="download('android')" class="btn">Android下载</a>
        </div>
        <p class="margin-top-10 text-light" style="padding-bottom: 20px;">赶紧下载“新彩票”吧！</p>
      </div>
    </div>
    <div class="bottom">
      <img src="../../assets/new_register/bottom.png" alt="bottom">
    </div>
    <div class="bottom-download" v-show="!success">
      <div class="row">
        <div class="col"><a href="javascript:;" @click="download('ios')" class="btn" style="background: #3a70e5">IOS下载</a></div>
        <div class="col"><a href="javascript:;" @click="download('android')" class="btn">Android下载</a></div>
      </div>
      <div class="overlay"></div>
    </div>
    <wei-xin-mask v-show="mask" @onMaskHide="maskHide"></wei-xin-mask>
  </div>
</template>

<script>
  import CaptchaButton from '../../components/CaptchaButton.vue';
  import WeiXinMask from '../../components/WeiXinMask.vue';
  import Util from '../../common/util';
  import Toast from '../../common/toast';
  import { mapActions, mapState } from 'vuex';
  import { NEW_REGISTER } from '../../store/user/types';

  export default {
    name: 'newRegister',
    components: { CaptchaButton, WeiXinMask },
    data () {
      return {
        phone: '',
        password: '',
        captcha: '',
        mask: false
      }
    },
    computed: {
      ...mapState({
        success: state => state.user.newRegisterStatus
      })
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
        register: NEW_REGISTER
      }),
      download (type) {
        if (type === 'ios') {
          location.href = 'https://itunes.apple.com/cn/app/id1232478761?mt=8'
        } else {
          if (Util.mobile.isWeiXin()) {
            this.mask = true;
          } else {
            location.href = 'http://tclottery.oss-cn-hangzhou.aliyuncs.com/admin_file/2017-08-18/5996af45edbb4.apk'
          }
        }
      },
      maskHide () {
        this.mask = false;
      }
    }
  }
</script>

<style scoped>
  .new-register {
    background: url("../../assets/new_register/bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .new-register .logo {
    padding: 12px 15px;
  }
  .new-register .logo img {
    width: 50%;
  }
  .new-register .form {
    margin: 35px 15px 0 15px;
    background: white;
    padding: 35px 10px 10px;
    border-radius: 5px;
    position: relative;
  }
  .new-register .form .flag {
    width: 54px; height: 54px;
    position: absolute;
    top: -27px;
    left: 50%;
    margin-left: -27px;
    background: url("../../assets/new_register/form_flag.png") no-repeat;
    background-size: 100% 100%;
  }
  .new-register .form.success .flag {
    background: url("../../assets/new_register/form_sucess.png") no-repeat;
    background-size: 100% 100%;
  }
  .new-register .input input {
    background: #eee;
  }
  .new-register .introduce {
    padding: 15px;
  }
  .new-register .introduce img {
    width: 100%;
  }
  .new-register .bottom {
    margin-top: 5px;
    font-size: 0;
  }
  .new-register .bottom img {
    width: 100%;
  }
  .new-register .bottom-download {
    position: fixed;
    height: 50px;
    width: 100%;
    padding: 5px;
    background: transparent;
    bottom: 0; left: 0;
  }
  .new-register .bottom-download .overlay {
    position: absolute;
    left: 0; bottom: 0;
    width: 100%; height: 100%;
    background: black;
    opacity: 0.3;
    z-index: -1;
  }
  .new-register .bottom-download .col {
    padding: 0 5px;
  }
  .new-register a.btn:active {
    opacity: 0.95;
  }
</style>
