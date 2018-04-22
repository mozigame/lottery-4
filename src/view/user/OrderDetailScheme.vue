<template>
  <div class="order-scheme">
    <v-head title="方案明细"></v-head>
    <div class="padding">
      <span class="order-content-icon"></span> 投注内容
      </div>
    <div v-if="detail.jc_info">
      <order-table :list="detail.jc_info"></order-table>
    </div>
    <div v-else-if="detail.tickets">
      <!--数字彩 -->
      <table class="betting-content" cellspacing="0" cellpadding="0">
        <tbody>
          <tr v-for="(ticket, i) in detail.tickets">
            <!--十一选五 快3 福彩3D-->
            <template v-if="ticket.lotteryType == 'syxw' || ticket.lotteryType == 'k3' || ticket.lotteryType == 'fc3d'">
              <td width="20%" class="text-center" v-if="i === 0" v-rowspan="detail.tickets.length">投注内容</td>
              <td :width="ticket.lotteryType == 'k3'?'30%':'20%'" class="text-center">{{ticket.playTypeText}}</td>
              <td :width="ticket.lotteryType == 'k3'?'50%':'60%'" class="text-sm">
                <span v-for="(r, k) in ticket.result">
                  <span v-if="k > 0">|</span>
                  <template v-if="r.pre">
                    <span>(</span>
                    <span :class="{'margin-left-3': t > 0, 'text-primary': p.checked}" v-for="(p, t) in r.pre">{{p.text}}</span>
                    <span>)</span>
                  </template>
                  <span v-for="i in r.next" class="margin-right-3" :class="{'text-primary': i.checked}">{{i.text}}</span>
                </span>
              </td>
            </template>
            <!--双色球和大乐透- -->
            <template v-else>
              <td width="20%" class="text-center" v-if="i === 0" v-rowspan="detail.tickets.length">投注内容</td>
              <td width="15%" class="text-center" v-if="i === 0" v-rowspan="detail.tickets.length">{{ticket.playTypeText}}</td>
              <td width="45%" class="text-sm">
                <template v-if="ticket.result[0].pre">
                  <span>(</span>
                  <span :class="{'margin-left-3': t > 0, 'text-primary': p.checked}" v-for="(p, t) in ticket.result[0].pre">{{p.text}}</span>
                  <span>)</span>
                </template>
                <span v-for="i in ticket.result[0].next" class="margin-right-3" :class="{'text-primary': i.checked}">{{i.text}}</span>
              </td>
              <td width="20%" class="text-sm">
                <template v-if="ticket.result[1].pre">
                  <span>(</span>
                  <span :class="{'margin-left-3': t > 0, 'text-primary': p.checked}" v-for="(p, t) in ticket.result[1].pre">{{p.text}}</span>
                  <span>)</span>
                </template>
                <span v-for="i in ticket.result[1].next" class="margin-right-3" :class="{'text-primary': i.checked}">{{i.text}}</span>
              </td>
            </template>
          </tr>
          <tr>
            <td colspan="2" class="text-center">彩果</td>
            <template v-if="detail.tickets && detail.tickets[0].lotteryType === 'k3'">
              <td>
                <span class="k3-item" v-for="ball in (detail.prizeResult && detail.prizeResult[0])" :class="'k3-' + ball + '-icon'"></span>
              </td>
            </template>
            <template v-else>
              <td class="text-sm">
                <span v-for="r in (detail.prizeResult && detail.prizeResult[0])" class="bg-red-ball margin-right-3">{{r}}</span>
              </td>
              <td v-if="detail.tickets[0].lotteryType !== 'syxw'">
                <span v-for="r in (detail.prizeResult && detail.prizeResult[1])" class="bg-blue-ball margin-right-3">{{r}}</span>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="padding">
      <span class="order-scheme-icon"></span> 方案明细
    </div>
    <table width="100%" cellspacing="0" cellpadding="0" class="text-sm text-center table-scheme">
      <thead class="text-muted">
      <tr>
        <td :width="detail.tickets && detail.tickets[0].lotteryType === 'k3'?'35%':'45%'">方案拆分</td>
        <td :width="detail.tickets && detail.tickets[0].lotteryType === 'k3'?'20%':'10%'">玩法</td>
        <td width="15%">金额</td>
        <td width="15%">奖金</td>
        <td width="15%">出票</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in scheme.tickets">
        <td style="padding-left: 3px">
          <div v-for="jc in item.jc_info">
            <!--显示足彩和篮彩-->
            <span v-if="jc.showCheck">
              <div v-for="(bet, i) in jc.betting">
                <span class="round-no">{{i === 0 ? jc.round_no : ''}}</span>
                <span style="display: inline-block; padding-left: 10px;" :class="{'text-primary': bet.checked}">
                  {{bet.text}}
                  <template v-if="jc.team && jc.team.letPointText">({{jc.team.letPointText}})</template>
                  <template v-if="jc.team && jc.team.basePointText">({{jc.team.basePointText}})</template>
                  <template v-if="bet.value"><br/>{{`(${bet.value})`}}</template>
                  <span class="red-check-icon" v-if="bet.checked"></span><br>
                </span>
              </div>
            </span>
            <!--胜负彩和任选九-->
            <span v-else>
              <span class="round-no">{{jc.round_no}}</span>
              <span v-for="(bet, i) in jc.betting">
                <span :class="{'text-primary': bet.checked}">{{bet.text}}</span><span v-if="i < jc.betting.length -1">|</span>
              </span>
              <br>
            </span>
          </div>
          <div v-for="(r, k) in item.result">
            <span class="pull-left" v-if="k > 0">{{item.lotteryType === 'syxw' || item.lotteryType === 'fc3d'?'|':':'}}</span>
            <template v-if="r.pre">
              <span class="pull-left">（</span>
              <span class="pull-left" :class="{'margin-left-3': t > 0, 'text-primary': p.checked}" v-for="(p, t) in r.pre">{{p.text}}</span>
              <span class="pull-left">）</span>
            </template>
            <template v-if="detail.tickets && detail.tickets[0].lotteryType === 'k3'">
              <span v-for="i in r.next" class="margin-right-3" :class="{'text-primary': i.checked}">{{i.text}}</span>
            </template>
            <template v-else>
              <span v-for="i in r.next" class="margin-right-3 pull-left" :class="{'text-primary': i.checked}">{{i.text}}</span>
            </template>
          </div>
        </td>
        <td>
          <span v-if="item.seriesText">{{item.seriesText}}<br/></span>
          <span v-if="item.playTypeText">{{item.playTypeText}}<br/></span>
          {{item.multiple}}倍
        </td>
        <td>{{item.ticket_amount | currency}}</td>
        <td :class="{'text-primary': item.ticket_winnings > 0}">{{item.prizeText}}</td>
        <td>{{item.statusText}} <br><span v-if="item.ticket_status > 0 && item.printout_time > 0">{{item.printout_time | dateFormat('hh:mm:ss')}}</span></td>
      </tr>
      </tbody>
    </table>
    <div class="line">
      <img src="../../assets/scheme_line.png" alt="line">
    </div>
    <div class="row text-center bg-white text-xn padding">
      <div class="col">{{scheme.success_amount | currency}}元<br/>出票成功</div>
      <div class="col">{{scheme.failure_amount | currency}}元<br/>出票失败</div>
      <div class="col"><span :class="{'text-primary': scheme.winnings_bonus > 0}">{{scheme.winnings_bonus | currency}}</span>元<br/>奖金</div>
    </div>
  </div>
</template>

<script>
  import OrderTable from '../../components/OrderTable';
  import VHead from '../../components/VHead';
  import { mapState, mapActions } from 'vuex';
  import { ORDER_SCHEME_REQUEST } from '../../store/user/types';

  export default {
    name: 'orderScheme',
    computed: {
      ...mapState({
        detail: state => state.user.orders.detail,
        scheme: state => state.user.orders.scheme
      })
    },
    methods: {
      ...mapActions({
        getOrderScheme: ORDER_SCHEME_REQUEST
      })
    },
    created () {
      this.getOrderScheme(this.$route.params.id);
    },
    components: {
      OrderTable, VHead
    }
  }
</script>

<style>
  .order-scheme .order-content-icon,
  .order-scheme .order-scheme-icon {
    display: inline-block;
    vertical-align: top;
    margin-top: 1px;
  }
  .order-scheme .red-check-icon {
    margin-left: 0; margin-top: 5px;
    position: absolute;
  }
  .order-scheme .table-scheme {
    border-collapse:collapse;
  }
  .order-scheme .table-scheme tr{
    border-top: 1px solid #f2f2f2;
    background: white;
  }
  .order-scheme .table-scheme thead td {
    padding: 5px 0;
  }
  .order-scheme .table-scheme tbody td {
    padding: 10px 0;
  }
  .order-scheme .line {
    line-height: 0;
  }
  .order-scheme .line img {
    width: 100%;
  }
  .order-scheme .round-no {
    width: 60px; display: inline-block;
    padding-left: 10px;
    vertical-align: top;
  }
  .order-scheme .betting-content {
    font-size: 14px;
    background: white;
    width: 100%;
  }
  .order-scheme .betting-content td {
    border-top: 1px solid #f2f2f2;
    border-left: 1px solid #f2f2f2;
    padding: 5px 5px;
  }
  @media screen and (max-width: 350px) {
    .order-scheme .table-scheme {
      font-size: 10px;
    }
  }
  .order-scheme .k3-item {
    display: inline-block; margin-right: 10px; vertical-align: middle;
  }
</style>
