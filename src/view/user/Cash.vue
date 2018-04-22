<template>
  <div class="cash">
    <v-head title="提现"></v-head>
    <div v-if="this.userBank.no!=''">
      <div>
        <div class="padding-0-10 bg-white margin-top-10">
          <div class="info no-border padding-10">
            <span class="icon bank-icon" v-bind:style="{ backgroundImage: 'url('+userBank.image+')' }"></span>
            <div class="bank-info">
              <span>{{ userBank.type }}</span>
              <span class="color-666">{{ userBank.no | subStrLast4 }} {{ userBank.account }}</span>
            </div>
          </div>
        </div>
        <div class="padding-0-10 bg-white margin-top-10">
          <div class="info">
            <span class="mine-recharge-icon icon"></span>
            <input type="text" placeholder="请输入提现金额" v-model="amount">
          </div>
          <div class="info no-border">
            <span class="name">可提现金额 </span>
            <span class="red">{{mine.balance | currency}}元</span>
          </div>
        </div>
        <div class="margin-top-20 padding-0-10">
          <a href="javascript:;" class="btn" @click="onShowDialog">提交</a>
        </div>
      </div>
      <div class="item-text">
        <div class="prompt margin-top-20 padding-0-10 red">注：暂不支持信用卡提现申请</div>
        <div class="prompt margin-top-20 padding-0-10">温馨提示：<br>手续费：提现金额必须>2元，手续费2元/次，每日首次提现金额若大于50元，可免当次手续费。</div>
        <div class="prompt margin-top-10 padding-0-10">说明：为防止套现和洗钱，根据国家相应政策要求，充值金额必须消费超过30%（不包含红包消费）才能提现。</div>
        <div class="prompt margin-top-10 padding-0-10">由于银行批量转账批次先后原因，每天10:00前申请，13:00前到账，10:00~15:00申请，18:00前到账，15:00后申请，次日13:00前到账，如遇节假日，则顺延至第一个工作日，请了解。</div>
      </div>
      <v-dialog v-show="dialogShow" @close="onCloseDialog">
        <p class="text-md">提示</p>
        <p class="text-md margin-top-5">每次提现系统代收2元手续费，每日<br>首笔提现若金额>=50元，可免当次<br>手续费，您确认提现</p>
        <div class="padding margin-top-10">
          <!--<router-link tag="div" to="cash_detail" class="width-45">-->
            <a href="javascript:;" class="btn width-45" @click="submit">确定</a>
          <!--</router-link>-->
          <a href="javascript:;" class="btn width-45 bg-gray" @click="onCloseDialog">取消</a>
        </div>
      </v-dialog>
    </div>
    <div v-else>
      <div class="padding">
        <div class="prompt text-center">可提现金额 <span class="red">&#165;{{mine.balance | currency}}</span></div>
        <div class="prompt margin-top-20 text-center">您还没有完善银行信息，无法提现。<br>赶快去完善银行信息吧。</div>
        <div class="margin-top-20">
          <router-link to="bank_card" tag="div" >
            <a href="javascript:;" class="btn">完善银行信息</a>
          </router-link>
        </div>
      </div>
    </div>
    <div class="tel-panel">客服热线 400-835-1108</div>
  </div>

</template>

<script>
  import VHead from '../../components/VHead.vue';
  import CaptchaButton from '../../components/CaptchaButton';
  import VDialog from '../../components/VDialog.vue';
  import Util from '../../common/util';
  import Toast from '../../common/toast';
  import { mapActions, mapState } from 'vuex';
  import { WITH_DRAW_CASH, MINE_INFO, GET_USER_BANKCARD } from '../../store/user/types';

  export default {
    name: 'cash',
    data: () => {
      return {
        amount: '',
        dialogShow: false
      }
    },
    computed: {
      ...mapState({
        mine: state => state.user.mine,
        userBank: state => state.user.userBank
      })
    },
    methods: {
      submit () {
        this.dialogShow = false;
        const money = parseFloat(this.amount);
        this.with_draw_cash({
          money: money.toFixed(2)
        })
      },
      onShowDialog () {
        if (!Util.isPositive(this.amount)) {
          Toast('请输入正确的金额!');
          return;
        }
        if (Number(this.amount) <= 2) {
          Toast('提现金额不能少于2元!');
          return;
        }
        this.dialogShow = true;
      },
      onCloseDialog () {
        this.dialogShow = false;
      },
      ...mapActions({
        with_draw_cash: WITH_DRAW_CASH,
        getUserBankCard: GET_USER_BANKCARD,
        getMineInfo: MINE_INFO
      })
    },
    components: {
      VHead, CaptchaButton, VDialog
    },
    created () {
      this.getUserBankCard();
      this.getMineInfo();
    }
  }
</script>

<style>
  .cash {
    position: relative; height: 100%;
  }
  .cash .red{
    color: #e73f40 !important;
  }
  .cash .color-666{
    color: #666666;
  }
  .cash .padding-0-10{
    padding: 0 10px;
  }
  .cash .padding-10{
    padding: 10px 0 !important;
  }
  .cash .bank-info{
    height: 60px;
    line-height: 30px;
    display: inline-block;
    color: #333333;
    padding: 0 10px;
    margin-left: 28px;
  }
  .cash .bank-info span{
    display: block;
  }
  .cash .info {
    padding: 15px 0;
    color: #333333;
    font-size: 14px;
    border-bottom: 1px solid #dddddd;
    position: relative;
  }
  .cash .info .name{
    color: #999999;
  }
  .cash .info.no-border{
    border-bottom: none;
  }
  .cash .info .icon{
    display: inline-block;
    position: relative;
    width: 28px; height: 28px;

  }
  .cash .info input{
    display: inline-block;
    border: none;
    width: 80%;
    height: 28px;
    line-height: 28px;
    border-radius: 0;
    position: absolute;
  }
  .cash .prompt {
    padding: 0 0;
    color: #999999;
    font-size: 13px;
  }
  .cash .prompt.padding-0-10 {
    padding: 0 10px;
  }
  .cash .tel-panel{
    position: fixed;
    padding: 0 0;
    width: 100%;
    bottom: 0;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #999999;
    font-size: 13px;
    background-color: #F2F2F2;
  }
  .cash .width-45 {
    width: 45%;
    display: inline-block;
  }
  .cash .bank-icon{
    position: absolute !important;
    top: 28px;
    background-size: 100% 100%;
  }
  .cash .item-text{
    padding-bottom: 60px;
  }
</style>

