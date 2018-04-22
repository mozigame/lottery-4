<template>
  <div class="idCard">
    <v-head title="身份证信息"></v-head>
    <div v-if="this.mine.identity_status == 1">
      <div class="padding-0-10 bg-white margin-top-10">
        <div class="info">
          <span class="name">姓&emsp;&emsp;名：</span>
          <span>{{ mine.realname }}</span>
        </div>
        <div class="info">
          <span class="name">身份证号：</span>
          <span>{{ mine.identity_no }}</span>
        </div>
        <div class="info no-border">
          <span class="name">手机号码：</span>
          <span>{{ mine.username }}</span>
        </div>
      </div>
      <div class="prompt text-center margin-top-20">身份证信息暂时不支持修改</div>
    </div>
    <div v-else>
      <div class="padding">
        <div>
          <input type="text" v-model="real_name" placeholder="姓名">
        </div>
        <div class="margin-top-10">
          <input type="text" v-model="identity_no" placeholder="身份证号码">
        </div>
        <div class="margin-top-20">
          <a href="javascript:;" class="btn" @click="submit">提交</a>
        </div>
        <div class="prompt margin-top-20">请务必如实填写真实姓名和身份证号，两者信息必须和身份证上的内容完全一致，否则无法领奖；护照、军官证、台胞证、香港身份证、社会保障卡、机动车驾驶证等均不能领奖；</div>
        <div class="prompt margin-top-10">购买彩票是个人行为，请保证以上信息是您个人的真实信息，不要使用公司或他人信息，身份证信息暂时不支持修改，请慎重填写；</div>
        <div class="prompt margin-top-10">依据财政部《彩票发行与销售管理暂行规定》未满18岁不得购买彩票请务必如实填写。</div>
      </div>
      <v-dialog v-show="dialogShow" @close="onCloseDialog">
        <p class="text-md">提示</p>
        <p class="text-md margin-top-5">请认真填写真实身份信息，错误的信<br>息将影响奖金提现！信息一经填写<br>不允许修改！</p>
        <div class="padding margin-top-10">
          <a href="javascript:;" class="btn" @click="onCloseDialog">确定</a>
        </div>
      </v-dialog>
    </div>
    <div class="tel-panel text-center">客服热线 400-835-1108</div>
  </div>
</template>

<script>
  import VHead from '../../components/VHead.vue';
  import CaptchaButton from '../../components/CaptchaButton';
  import VDialog from '../../components/VDialog.vue';
  import Util from '../../common/util';
  import Toast from '../../common/toast';
  import { mapActions, mapState } from 'vuex';
  import { SET_IDCARD, MINE_INFO, GET_USER_BANKCARD } from '../../store/user/types';

  export default {
    name: 'idCard',
    data: () => {
      return {
        real_name: '',
        identity_no: '',
        dialogShow: true
      }
    },
    computed: {
      ...mapState({
        mine: state => state.user.mine
      })
    },
    methods: {
      submit () {
        if (!Util.isNull(this.real_name)) {
          Toast('请输入正确的姓名!');
          return;
        }
        if (!Util.identityValid(this.identity_no)) {
          Toast('请输入正确的身份证号码!');
          return;
        }
        this.setIdCard({
          realname: this.real_name, identity_no: this.identity_no
        })
      },
      onShowDialog () {
        this.dialogShow = true;
      },
      onCloseDialog () {
        this.dialogShow = false;
      },
      ...mapActions({
        getMineInfo: MINE_INFO,
        getUserBankCard: GET_USER_BANKCARD,
        setIdCard: SET_IDCARD
      })
    },
    components: {
      VHead, CaptchaButton, VDialog
    },
    created () {
      this.getMineInfo();
      this.getUserBankCard();
    }
  }
</script>

<style>
  .idCard {
    position: relative; height: 100%;
  }
  .idCard .padding-0-10{
    padding: 0 10px;
  }
  .idCard .info {
    padding: 15px 0;
    color: #333333;
    font-size: 14px;
    border-bottom: 1px solid #dddddd;
  }
  .idCard .info .name{
    color: #999999;
  }
  .idCard .info.no-border{
    border-bottom: none;
  }
  .idCard .prompt {
    padding: 0 0;
    color: #999999;
    font-size: 13px;
  }
  .idCard .tel-panel{
    position: absolute;
    padding: 0 0;
    width: 100%;
    bottom: 20px;
    color: #999999;
    font-size: 13px;
  }
</style>

