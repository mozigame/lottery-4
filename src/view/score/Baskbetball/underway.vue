<template>
  <div class="bg-white" style="margin-bottom: 10px;">
    <div style="position: relative;padding:0.26rem 0 0 0;border-radius: 5px;">
      <module1
        :data="[weekDay(propsData.first_half_begin_time,1),propsData.round_no,propsData.league,weekDay(propsData.first_half_begin_time,2)]"/>
      <div @click="$emit('go',propsData.third_party_schedule_id)" class="row" style="margin: 0.34rem 0 0 0;">

        <div class="text-center color9292" style="width: 17.5%;position: relative;color:#888888;font-size: 0.36rem;">
          <div style="float: left;width: 98%;">
            <div class="row">
              <div class="col-center text-center" style="width: 100%;">
                <div style="font-weight: 600;margin-top: 0.25rem;line-height:100%;">{{ propsData.match_status_description }}</div>
                <div style="font-size: 0.3rem;margin-top: 0.25rem;line-height:100%;">{{ propsData.match_duration }}</div>
              </div>
            </div>
          </div>
          <div style="float: right;width:1px;height: 1.23rem;background-color: #ddd"></div>
        </div>

        <div class="module3" style="font-size: 0.36rem;font-weight: 600;width: 34%">
          <div class="item">
            <span class="score1 color60a839">{{ scoreArray(1) }}</span>
            <span class="name maxWidth62">{{ propsData.guest }}</span>
          </div>
          <div class="item">
            <span class="score1 color60a839">{{ scoreArray(0)}}</span>
            <span class="name maxWidth62">{{ propsData.home }}</span>
          </div>
        </div>
        <div v-if="propsData.result_odds" class="text-center module4"
             style="position: relative;height: 1.76rem;width: 38.2%;">
          <template v-if="propsData.guest_info.score.length>=5&&propsData.home_info.score.length>=5">
            <div class="row item4 body4">
              <div class="child" v-for="inx in 5">
                <div>{{ propsData.guest_info.score[inx-1]? propsData.guest_info.score[inx-1].score:'-' }}</div>
              </div>
            </div>
            <div class="row item4 body4">
              <div class="child" v-for="inx in 5">
                <div>{{ propsData.home_info.score[inx-1]? propsData.home_info.score[inx-1].score:'-' }}</div>
              </div>
            </div>
            <div class="row item4" style="position: absolute;top: -0.47rem;color: #cccccc">
              <div class="child" v-for="i in ['1st','2nd','3rd','4th','TO']">{{ i }}</div>
            </div>
          </template>
          <template v-else>
            <div class="row item4 body4">
              <div class="child" v-for="inx in 4">
                <div>{{ propsData.guest_info.score[inx-1]? propsData.guest_info.score[inx-1].score:'-' }}</div>
              </div>
            </div>
            <div class="row item4 body4">
              <div class="child" v-for="inx in 4">
                <div>{{ propsData.home_info.score[inx-1]? propsData.home_info.score[inx-1].score:'-' }}</div>
              </div>
            </div>
            <div class="row item4" style="position: absolute;top: -0.47rem;color: #cccccc">
              <div class="child" v-for="i in ['1st','2nd','3rd','4th']">{{ i }}</div>
            </div>
          </template>
        </div>
      </div>
      <is-top :index="groupsIndex" :toTop="propsData.toTop"/>
    </div>
  </div>
</template>
<script>
  import module1 from '../components/item-title.vue'
  import IsTop from '../components/Istop.vue'

  // 进行中
  export default {
    name: 'underway',
    props: {
      propsData: {type: Object},
      groupsIndex: {type: Array}
    },
    components: {
      module1,
      IsTop
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

  .module4 .item4 {
    height: 0.88rem;
    margin: 0;
  }

  .item4 .child div {
    line-height: .42rem;
  }

  .item4 .child {
    flex: 1 1 100%;
    font-size: 0.19rem;
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

  .color333 {
    color: #333333;
  }

  .color9292 {
    color: #929292;
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

  .maxWidth80 {
    max-width: 80%;
  }

  .maxWidth62 {
    max-width: 62%;
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
