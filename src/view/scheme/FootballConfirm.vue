<template>
  <div class="football-confirm padding-bottom-90" v-cloak>
    <div class="head">
      <span v-if="login && !rechargeResult.success" class="text-light text-normal text-p-l" @click="changeAccount">更换账号</span>
      <div>订单确认页</div>
    </div>
    <div v-if="!expired">
      <div class="text-default text-center margin-top-20" v-if="rechargeResult.success">
        <div><span class="green-complete-icon"></span></div>
        <div>恭喜您，充值成功!</div>
        <p class="text-normal margin-top-5">当前余额：<span class="text-primary">￥{{balance}}</span></p>
        <p class="payment-continue-tip">请继续支付订单:</p>
      </div>
      <div class="padding">
        <scheme-box>
          <div class="list">
            <div v-for="(item, index) in confirm.schedule_orders">
              <div class="scheme-line-icon" v-if="index > 0"></div>
              <div class="item row text-center text-sm text-muted">
                <div class="col col-20 col-center text-left padding-left-10">
                  {{item.round_no}}
              </div>
                <div class="col col-80">
                  <div class="row text-normal text-default">
                    <div class="col">{{item.team.left}}</div>
                    <div class="col text-light">VS</div>
                    <div class="col">{{item.team.right}}</div>
                  </div>
                  <div class="margin-top-5">
                    <a href="javascript:;" class="btn">
                      <span v-for="(r, i) in item.result">
                        {{r.text}}
                        <span v-show="i < item.result.length-1">、</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </scheme-box>
        <service-agreement></service-agreement>
      </div>
      <div class="money-confirm">
        <div class="payment-tip text-default">请在<count-down :time="confirm.expire_time" @timeOver="timeOver"></count-down>内支付订单,到期未支付订单自动失效.</div>
        <div class="row text-sm bg-primary">
          <div class="col col-80 bg-white left text-muted">
            <p><span v-for="i in confirm.seriesList">{{i}} </span></p>
            <p>{{confirm.stake_count}}注{{confirm.multiple}}倍 <span class="text-primary text-md margin-left-5">共{{confirm.total_amount | currency}}元</span></p>
            <p>预计奖金：{{confirm.bonus_range | currency}}元</p>
          </div>
          <div class="col col-20 col-center text-ml text-center right" @click="submit">
            付款
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <order-expired></order-expired>
    </div>
  </div>
</template>

<script>
  import VHead from '../../components/VHead.vue';
  import SchemeBox from '../../components/SchemeBox';
  import CountDown from '../../components/CountDown';
  import OrderExpired from '../../components/OrderExpired';
  import Toast from '../../common/toast';
  import Util from '../../common/util';
  import ServiceAgreement from '../../components/ServiceAgreement.vue';
  import { mapActions, mapState, mapMutations } from 'vuex';
  import { GET_SCHEME_CONFIRM, SCHEME_CONFIRM_EXPIRED } from '../../store/scheme/types';
  import { PAYMENT_CONFIRM } from '../../store/payment/types';
  import { SCHEME_CONFIRM_CHANGE_ACCOUNT } from '../../store/user/types';

  export default {
    name: 'footballConfirm',
    data () {
      return {
        orderExpired: false
      }
    },
    computed: {
      ...mapState({
        rechargeResult: state => state.payment.rechargeResult,
        balance: state => state.user.mine.balance,
        confirm: state => state.scheme.confirm,
        expired: state => state.scheme.expired,
        login: state => state.user.token
      })
    },
    methods: {
      submit () {
        if (this.confirm.sale_status === 0) {
          Toast('暂停销售');
        } else {
          this.paymentConfirm(Util.urlSearch());
        }
      },
      timeOver () {
        this.expiredOver();
      },
      ...mapActions({
        getSchemeConfirm: GET_SCHEME_CONFIRM,
        paymentConfirm: PAYMENT_CONFIRM,
        changeAccount: SCHEME_CONFIRM_CHANGE_ACCOUNT
      }),
      ...mapMutations({
        expiredOver: SCHEME_CONFIRM_EXPIRED
      })
    },
    components: {
      VHead, SchemeBox, ServiceAgreement, CountDown, OrderExpired
    },
    created () {
      this.getSchemeConfirm()
    }
  }
</script>

<style>
  .football-confirm .item {
    padding: 5px 10px 10px 10px;
    background: white;
  }
  .football-confirm .item .btn {
    height: 30px; line-height: 30px;
  }
  .football-confirm .money-confirm {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
  }
  .football-confirm .money-confirm .left {
    padding: 5px 10px;
  }
  .football-confirm .money-confirm .right {
    color: white;
  }
  .football-confirm .payment-tip {
    font-size: 14px;
    line-height: 25px;
    height: 25px;
    background: #e9d999;
    padding-left: 10px;
  }
  .football-confirm .green-complete-icon {
    display: inline-block;
  }
  .football-confirm .payment-continue-tip {
    border-top: 1px solid #ddd;
    text-align: left;
    font-size: 14px;
    padding-top: 10px;
    margin: 10px 10px 0 10px;
  }
  .head .text-p-l {
    position: absolute;
    left: 10px;
  }
</style>
