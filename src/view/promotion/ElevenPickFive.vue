<template>
  <div class="eleven-pick-five">
    <div class="banner">
      <img src="../../assets/promotion/11选5/banner.png" alt="banner">
    </div>
    <div class="box">
      <div class="title">
        <img src="../../assets/promotion/11选5/title_1.png" alt="title">
        {{topTip}}
      </div>
      <div class="container">
        <div class="text-light text-sm" style="line-height: 18px">
          至少选2个号 <br/> 猜对任意2个即中<span class="text-primary">6</span>元
        </div>
        <div class="shake">
          <i class="shake-icon"></i>
          <span @click="randomSelectedBall">摇一摇机选</span>
        </div>
        <div class="row margin-top-10">
          <div class="col col-20">
            <span class="side-title">选号</span>
          </div>
          <div class="col col-80" v-if="panelBallGroups">
            <span class="play-ball-white"
              :class="{active: item.selected}"
              v-for="item in panelBallGroups[0].list"
              @click="ballChanged(item, 0)">
              {{item.id}}
            </span>
          </div>
        </div>
        <hr>
        <div class="btn-wrap text-muted">
          共 {{lotteryObj.stakeCount}}注 {{lotteryObj.stakeCount*2}}元
          <a href="javascript:;" class="btn" @click="confirmBet" :class="{disabled: lotteryObj.stakeCount == 0}"> 去投注 </a>
        </div>
      </div>
    </div>
    <div class="introduce-box">
      <img src="../../assets/promotion/11选5/title_2.png" alt="title">
      <p>1、本活动限活动2017年07月14日0时后注册的新用户专享；</p>
      <p>2、每个新注册账户在都可参与一次买一送一活动；</p>
      <p>3、注册新用户登录老虎彩票APP后，购买一注高频彩即可获得购彩红包一个；</p>
      <p>4、本活动解释权归老虎彩票所有；</p>
    </div>
    <carousel-swipe :list="imgList"></carousel-swipe>
    <div class="dialog" v-show="dialogVisible">
      <div class="mask"></div>
      <div class="content">
        <img src="../../assets/promotion/11选5/dialog_title.png" alt="title">
        <div class="form-input">
          <div class="input">
            <input type="text" v-model="phone" placeholder="输入手机号免费领取">
          </div>
          <div class="row margin-top-10">
            <div class="col col-60">
              <div class="input">
                <input type="text" v-model="captcha" placeholder="请输入短信验证码">
              </div>
            </div>
            <div class="col-40 padding-left-10">
              <captcha-button :phone="phone" :type="1" appId="1"></captcha-button>
            </div>
          </div>
          <div class="input margin-top-10">
            <input type="password" v-model="password" placeholder="请设置密码">
          </div>
          <div class="margin-top-10">
            <a href="javascript:;" class="btn" @click="submit">注册领取</a>
          </div>
        </div>
        <span class="close" @click="dialogClose"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import {SET_CURRENT_LOTTERY, GET_CURRENT_LOTTERY, CONFIRM_BET, CLEAR_BETTING_SELECTED,
    CURRENT_PLAY_TYPE_SELECT, RANDOM_SELECTED_BALL} from '../../store/betting/types';
  import CaptchaButton from '../../components/CaptchaButton.vue';
  import Util from '../../common/util';
  import Toast from '../../common/toast';
  import {BASE_REGISTER} from '../../store/user/types';
  import CarouselSwipe from '../../components/CarouselSwipe.vue';
  export default {
    name: 'elevenPickFive',
    data () {
      return {
        phone: '',
        password: '',
        captcha: '',
        dialogVisible: false,
        imgList: [
          {className: 'img-left', src: 'http://tclottery.oss-cn-hangzhou.aliyuncs.com/admin_file/2017-05-02/5907e14956eba.jpg'},
          {className: 'img-active', src: '/static/img/promotion/193900880774050480.jpg'},
          {className: 'img-right', src: 'http://tclottery.oss-cn-hangzhou.aliyuncs.com/admin_file/2017-06-02/59313d15e293c.jpg'}
        ]
      }
    },
    computed: {
      lotteryObj () {
        return this.$store.state.betting[this.$store.state.betting.lottery];
      },
      panelBallGroups () {
        return this.lotteryObj.initBettingPanelBallGroups &&
          this.lotteryObj.initBettingPanelBallGroups();
      },
      topTip () {
        return this.$store.state.betting.currentLottery &&
          this.$store.state.betting.currentLottery.betTip;
      }
    },
    methods: {
      ballChanged (item, index) {
        this.lotteryObj.onBallChanged(item, index);
      },
      randomSelectedBall () {
        this.$store.commit(RANDOM_SELECTED_BALL);
      },
      confirmBet () {
        if (!this.$store.state.user.token) {
          this.dialogShow();
        } else {
          this.$store.commit(CONFIRM_BET);
          this.$store.commit(CLEAR_BETTING_SELECTED);
          this.$router.push({name: 'DigitalConfirm'});
        }
      },
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
        this.$store.dispatch(BASE_REGISTER, {
          tel: this.phone,
          passwd: this.password,
          sms_validation: this.captcha,
          channel_type: Util.urlSearch()['channel_type'],
          channel_id: Util.urlSearch()['channel_id']
        }).then(() => {
          Toast('已注册成功!');
          this.dialogClose();
        });
      },
      dialogClose () {
        this.dialogVisible = false;
      },
      dialogShow () {
        this.dialogVisible = true;
      }
    },
    created () {
      this.$store.commit(SET_CURRENT_LOTTERY, 18);
      this.$store.dispatch(GET_CURRENT_LOTTERY).then(() => {
        this.$store.commit(CURRENT_PLAY_TYPE_SELECT, {id: 22, value: '任选二'});
      });
    },
    components: {CaptchaButton, CarouselSwipe}
  }
</script>

<style>
  .eleven-pick-five {
    height: 100%;
    overflow-y: auto;
    background: #2d2449;
  }
  .eleven-pick-five .banner img {
    width: 100%;
  }
  .eleven-pick-five .box {
    margin: -35% 10px 0 10px;
    border-radius: 5px;
    overflow: hidden;
  }
  .eleven-pick-five .box .title {
    color: #decfff; text-align: right;
    height: 34px; line-height: 34px;
    background: #5a39a4;
    padding-right: 10px;
    position: relative;
    font-size: 12px;
  }
  .eleven-pick-five .box .title img {
    width: 80px; position: absolute;
    left: 15px; top: 5px;
  }
  .eleven-pick-five .box .container {
    padding: 15px 15px 5px 15px; background: white;
    position: relative;
  }
  .eleven-pick-five .box .container .shake {
    position: absolute;
    right: 0; top: 10px;
    width: 100px;
    background: #eeeded;
    padding-left: 25px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
    color: #666;
  }
  .eleven-pick-five .box .container .shake .shake-icon {
    position: absolute;
    background: url("../../assets/promotion/11选5/shake.png") no-repeat;
    background-size: 100% 100%;
    width: 16px; height: 16px;
    left: 5px; top: 7px;
  }
  .eleven-pick-five .side-title {
    padding: 5px 10px;
    border-radius: 20px;
    background: #e3e2e2;
    color: #a4a4a4;
    display: inline-block;
    margin: 7px 0 0 0px;
    font-size: 12px;
  }
  .eleven-pick-five .play-ball-white {
    width: 35px; height: 35px;
    line-height: 33px;
    text-align: center;
    font-size: 16px;
    border-radius: 35px;
    margin-right: 5px;
    margin-bottom: 10px;
    color: #e73f40;
    border: 1px solid #ddd;
    background: white;
    display: inline-block;
  }
  .eleven-pick-five .play-ball-white.active {
    color: white;
    background: #e73f40;
    border: 1px solid #e73f40;
  }
  .eleven-pick-five .box hr {
    border-width: 0;
    background: #ddd;
    height: 1px;
  }
  .eleven-pick-five .box .btn-wrap {
    height: 35px; line-height: 35px;
    font-size: 14px;
  }
  .eleven-pick-five .box .btn-wrap .btn{
    width: 80px; float: right;
    height: 30px; line-height: 30px;
  }
  .eleven-pick-five .introduce-box {
    margin: 15px 10px;
    border-radius: 5px;
    padding: 10px 15px;
    color: #8972d2;
    font-size: 13px;
    line-height: 24px;
    background: #3c2f66;
  }
  .eleven-pick-five .introduce-box img {
    width: 120px;
  }
  .eleven-pick-five .dialog .content {
    background: linear-gradient(top, #da413b, #fc8b40);
    overflow: visible;
  }
  .eleven-pick-five .dialog .form-input {
    padding: 10px;
  }
  .eleven-pick-five .dialog .close {
    background: url("../../assets/promotion/11选5/dialog_close.png") no-repeat;
    background-size: 100% 100%;
    width: 40px; height: 40px;
    position: absolute;
    left: 50%; margin-left: -20px;
    bottom: -70px;
    z-index: 111;
  }
  .eleven-pick-five .dialog .content img {
    width: 80%;
    margin-top: 10px;
  }
</style>
