<template>
  <div class="bg-white">
    <div style="position: relative;padding:0.26rem 0 0 0;border-radius: 5px;">
      <module1
        :data="[weekDay(propsData.first_half_begin_time,1),propsData.round_no,propsData.league,weekDay(propsData.first_half_begin_time,2)]"/>
      <div class="row" style="margin: 0.34rem 0 0 0;">
        <!---->
        <div @click="$emit('go',propsData.third_party_schedule_id)"
             class="text-center color9292"
             style="width: 12.7%;position: relative;color:#888888;font-size: 0.36rem;">
          <div style="float: left;width: 98%;">
            <div class="row" style="height: 1.23rem">
              <div class="col-center" style="width: 100%;font-weight: 400;">
                {{ propsData.match_status_description}}
              </div>
            </div>
          </div>
          <div style="float: right;width:2%;height: 1.23rem;background-color: #ddd"></div>
        </div>
        <!---->
        <div @click="$emit('go',propsData.third_party_schedule_id)" style="width: 67%">
          <div class="module3" style="font-size: 0.36rem;font-weight: 600;width:64%">
            <div class="item">
              <span class="score1 color734f40">{{ scoreArray(0) }}</span>
              <span class="name maxWidth62"
                    :class="propsData.home_info.red_card>0&&propsData.home_info.yellow_card ?'maxWidth62':'maxWidth80'">{{ propsData.home }}</span>
              <span v-if="propsData.home_info.red_card>0"
                    class="placard back-red">{{ propsData.home_info.red_card }}</span>
              <span v-if="propsData.home_info.yellow_card>0"
                    class="placard back-yellow">{{ propsData.home_info.yellow_card }}</span>
            </div>
            <div class="item">
              <span class="score1 color734f40">{{ scoreArray(1) }}</span>
              <span class="name maxWidth62"
                    :class="propsData.guest_info.red_card>0&&propsData.guest_info.yellow_card ?'maxWidth62':'maxWidth80'">{{ propsData.guest }}</span>
              <span v-if="propsData.guest_info.red_card>0"
                    class="placard back-red">{{ propsData.guest_info.red_card }}</span>
              <span v-if="propsData.guest_info.yellow_card>0"
                    class="placard back-yellow">{{ propsData.guest_info.yellow_card }}</span>
            </div>
          </div>
        </div>
        <!---->
        <example style="width: 20%;" :jcInfo="jcInfo"/>
      </div>
      <div style="margin: 0 auto;width: 90%;height: 1px;background-color: #ddd"></div>
    </div>
  </div>
</template>

<script>
  import module1 from '../../components/item-title.vue'
  import example from '../../components/example.vue'
  import { mapMutations } from 'vuex';
  import { TO_THE_TOP } from '../../../../store/score/types';
  // 结束
  export default {
    name: 'finished',
    props: {
      propsData: {type: Object},
      jcInfo: {type: Object}
    },
    components: {
      module1,
      example
    },
    filters: {
      scoreShow: function (value) {
        if (value && value === '0') {
          return '-'
        }
        return value
      }
    },
    methods: {
      ...mapMutations({
        toTheTop: TO_THE_TOP
      }),
      scoreArray (value) {
        // 比格式化
        let arr = this.propsData.current_score.split(':')
        return arr[value]
      },
      weekDay (timestamp, type) {
        const data = new Date(timestamp * 1000);
        const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

        // 检查是不是两位数字，不足补全
        function check (str) {
          str = str.toString();
          if (str.length < 2) {
            str = '0' + str;
          }
          return str;
        }

        if (type === 1) {
          return weeks[new Date(timestamp * 1000).getDay()];
        } else if (type === 2) {
          return `${check(data.getHours())}:${check(data.getMinutes())}`
        }
        return `${check(data.getMonth() + 1)}-${check(data.getDate())} ${check(data.getHours())}:${check(data.getMinutes())}`
      }
    }
  }
</script>

<style scoped>
  .module4 .item2 {
    height: 0.88rem;
    margin: 0;
  }

  .module4 .item2 div {
    display: inline-block;
    font-size: 0.22rem;
    width: 20%;
    line-height: .42rem;
  }

  .module4 .item2 .score-x1 {
    text-align: right;
  }

  .module4 .item2 .score-x1 div {
    width: auto;
    border-radius: 7px;
    padding: 0 0.09rem;
  }

  .module4 .item2 .body2 {
    color: #8888;
  }

  .module3 .item {
    position: relative;
    height: 0.88rem;
  }

  .module3 .item span {
    float: left;
    line-height: 120%;
  }

  .module3 .score1 {
    display: inline-block;
    width: 30%;
    text-align: center;
  }

  /*比分*/
  .module3 .name {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #363636;
  }

  .module3 .placard {
    display: inline-block;
    text-align: center;
    width: 7.3%;
    margin-left: 1.5%;
    border-radius: 10%;
  }

  /*红牌*/
  .back-yellow {
    background-color: #ffc844;
    color: white;
  }

  .back-red {
    background-color: #e73f40;
    color: white;
  }

  .maxWidth80 {
    max-width: 80%;
  }

  .maxWidth62 {
    max-width: 62%;
  }

  /*黄牌*/
  .back-green {
    background-color: #41b43b;
    color: white;
  }

  .color60a839 {
    color: #60a839;
  }

  .color4a4a4a {
    color: #a4a4a4;
  }

  .color734f40 {
    color: #e73f40;
  }

  .color333 {
    color: #333333;
  }

  .color9292 {
    color: #929292;
  }

  .shoot {
    display: inline-block;
    background-position: center;
  }

  .shoot-1-icon {
    width: 0.3125rem;
    height: 0.5rem;
    background: url("../../../../assets/icon/shoot1.png") no-repeat;
    background-size: 100% 100%;
  }

  .shoot-2-icon {
    width: 0.3125rem;
    height: 0.5rem;
    background: url("../../../../assets/icon/shoot2.png") no-repeat;
    background-size: 100% 100%;
  }

  .backFed223 {
    background-color: #fed223;
    color: white;
  }

  .back41b43b {
    background-color: #41b43b;
    color: white;
  }

  .stick {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    border-top-right-radius: 5px;
    width: 0.89rem;
    height: 0.89rem;
  }

  .pushpin {
    display: inline-block;
    position: absolute;
    bottom: 0.15rem;
    right: 0.15rem;
    width: 0.34375rem;
    height: 0.34375rem;
  }
</style>
