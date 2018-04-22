<template>
  <div class="cash-detail">
    <v-head title="提现详情"></v-head>
    <div class="">
      <div class="prompt text-center"><span class="green-complete-icon icon"></span><br>您的提现申请已提交</div>
      <div class="item margin-top-20 border-bottom">
        <span>银行卡</span>
        <span class="pull-right text-default">{{ userBank.type }} 尾号{{ userBank.no | subStrLast4 }}</span>
      </div>
      <div class="item">
        <span>提现金额</span>
        <span class="pull-right text-default">&#165; {{ amount }}</span>
      </div>
      <div class="margin-top-20 padding">
        <router-link to="mine" replace tag="div" >
          <a href="javascript:;" class="btn">完成</a>
        </router-link>
      </div>
    </div>
    <div class="tel-panel">客服热线 400-835-1108</div>
  </div>
</template>

<script>
  import VHead from '../../components/VHead.vue';
  import CaptchaButton from '../../components/CaptchaButton';
  import { mapState } from 'vuex';

  export default {
    name: 'cashDetail',
    computed: {
      ...mapState({
        userBank: state => state.user.userBank,
        amount: state => state.user.withDrawCashMoney
      })
    },
    components: {
      VHead, CaptchaButton
    }
  }
</script>

<style>
  .cash-detail {
    position: relative; height: 100%;
  }
  .cash-detail .prompt {
    padding: 0 0;
    color: #999999;
    font-size: 13px;
  }
  .cash-detail .prompt .icon{
    display: inline-block;
    margin: 20px 0 10px 0;
  }
  .cash-detail .tel-panel{
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
  .cash-detail .item {
    padding: 15px 10px;
    position: relative;
    color: #999999;
    font-size: 13px;
    background-color: white;
  }
  .cash-detail .item span {
    display: inline-block;
  }
  .cash-detail .item.border-bottom{
    border-bottom: 1px solid #f2f2f2;
  }

</style>

