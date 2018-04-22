<template>
  <div>
    <div class="organ-item"
         v-for="groups in propsData"
         :key="groups.date_timestamp">
      <div class="bg-white organ-item-title"
           @click="show(groups.date_timestamp)">
        <span class="left">{{ groups.name||groups.date }}</span>
        <span class="right" :class="{bgPlay:switchItem(groups.date_timestamp)}"> </span>
      </div>
      <ul v-show="switchItem(groups.date_timestamp)"
          style="padding: 0.14rem;"
          v-for="list in calculate(groups.list)"
          :key="list.id">
        <li class="container row mine-back1">
          <div class="left football" :style="{backgroundImage:`url('${list.lottery_image}')`}"></div>
          <div class="right">
            <div style="line-height: 0.47rem;">
              <div style="overflow: hidden">
                  <span
                    style="display: inline-block;font-weight: bold;font-size:15px;color: #333333">¥{{ list.total_amount }}</span>
                <span class="msgSpan">( {{ list.jc_info.length }}场 )</span>
                <span class="msgSpan">{{ list.seriesText }}</span>
              </div>
            </div>
            <div style="line-height: 0.47rem;height: 0.47rem;">
              <div>
                <template v-if="list.lottery_id==20||list.lottery_id==21">
                  <span class="green-card" v-for="i in list.jc_info">{{i.betting_order.betting_num||'-'}}</span>
                </template>
                <template v-else>
                  <span class="msgSpan">{{ list.status===3?'理论奖金:':'奖金:' }}</span>
                  <span style="font-size:15px;color: #ffb81f;font-weight: bold">{{ list.status===3? `${list.oddsMin}~${list.oddsMax}`:list.winnings_bonus }}</span>
                  <span class="send-icon" @click="Message"></span>
                </template>
              </div>
            </div>
          </div>
        </li>

        <li v-for="(item,index) in list.schedule_list" :key="item.id">
          <template v-if="item.match_status===1">
            <notStarted
              @go="goBasketball"
              :propsData="item"
              :jcInfo="list.jc_info[index]"
            />
          </template>
          <template v-else-if="item.match_status===2">
            <underway
              @go="goBasketball"
              :propsData="item"
              :jcInfo="list.jc_info[index]"
            />
          </template>
          <template v-else>
            <finished
              @go="goBasketball"
              :propsData="item"
              :jcInfo="list.jc_info[index]"
            />
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  import organList from '../../ListContainer/organList'
  import underway from './underway.vue'
  import finished from './finished.vue'
  import notStarted from './notStarted.vue'
  import Compute from '../../components/compute.js'
  import { mapActions } from 'vuex'
  import { GET_MINE_BET_DATA } from '../../../../store/score/types';

  export default {
    name: 'mine',
    props: {
      propsData: {type: Array}
    },
    data () {
      return {
        ShowItem: {}, // 是否显示
        rotate: false, // 旋转
        propsDispose: []
      }
    },
    computed: {},
    methods: {
      ...mapActions({
        getData: GET_MINE_BET_DATA
      }),
      calculate (...item) {
        return new Compute(...item)
      },
      Message () {
        MessageBox('', `<p class="text-left" style="line-height:0.56rem;color:#333 ">该订单相关比赛当期赛况下理论奖金范围,实际赔率有浮动,仅做参考,最终以实际中奖金额为准.<br/>奖金优化方案暂不支持理论奖金计算</p>`);
      },
      show (time) {
        this.rotate = !this.rotate
        let show = {...this.ShowItem}
        if (show[time] !== undefined) {
          show[time] = !show[time]
        } else {
          show[time] = false
        }
        this.ShowItem = show
      },
      switchItem (time) {
        if (this.ShowItem[time] !== undefined) {
          return this.ShowItem[time]
        } else {
          return true
        }
      },
      goBasketball (id) {
        this.$router.push({name: 'FootballInformation', params: {id}})
      }
    },
    components: {
      organList,
      finished,
      underway,
      notStarted
    }
  }
</script>

<style scoped>
  .organ-item-title {
    position: relative;
    border-bottom: 1px solid #ddd;
    padding: 10px;
    color: #666666;
  }

  .organ-item-title .left {
    display: inline-block;
    padding-left: 3px;
    border-left: 3px solid #e73f40;
  }

  .organ-item-title .right {
    position: absolute;
    display: inline-block;
    background: url("../../../../assets/icon/arrow_circle_up.png") no-repeat;
    background-size: 100%;
    right: 10px;
    top: 10px;
    width: 16px;
    height: 16px;
    -webkit-transition: -webkit-transform 300ms;
    transition: transform 300ms;
  }

  .bgPlay {
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  /**/
  .mine-back1 {
    background-image: url('../../../../assets/mine_back.png');
  }

  .mine-back2 {
    background-image: url('../../../../assets/mine_back2.png');
  }

  .container {
    background-color: white;
    padding: 0.359375rem 0.25rem 0.265625rem 0.25rem;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background-size: 12px 100%;
    background-repeat: repeat-x;
  }

  .msgSpan {
    display: inline-block;
    /*font-size: 0.1875rem;*/
    color: #b6b5b5;
    margin: 0 0.2em;
  }

  .container .left {
    height: 0.9375rem;
  }

  .football {
    background-image: url("../../../../assets/ball.png");
  }

  .basketball {
    background-image: url("../../../../assets/basketball.png");
  }

  .container .left {
    width: 0.9375rem;
    margin-right: 0.390625rem;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .container .right {
    width: 80%;
  }

  .send-icon {
    display: inline-block;
    width: 0.3125rem;
    height: 0.3125rem;
    background-image: url("../../../../assets/send_icon.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-left: 0.5em;
  }

  .green-card {
    display: inline-block;
    float: left;
    background-color: #6cb43d;
    padding: 0 0.06rem;
    margin-right: 0.08rem;
    border-radius: 3px;
    font-weight: bold;
    color: white;
  }

  .opacity50 {
    filter: alpha(opacity=50);
    -moz-opacity: 0.5;
    -khtml-opacity: 0.5;
    opacity: 0.5;
  }
</style>
