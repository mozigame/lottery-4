<template>
  <div style="position: relative;height: 1.76rem;">
    <div @click="show" class="body" style="height: 1.76rem;overflow: hidden">
      <div v-if="downShow" style="height: 1.23rem">
        <div v-for="(i,index) in showItem"
             :key="index"
             class="text-center item"
        >
          <div>{{i.txt}}{{ i.colorRed }}</div>
          <div>{{i.odds?`(${i.odds})`:null}}</div>
        </div>
      </div>
      <div v-else class="row" style="height: 1.23rem">
        <div class="col-center" style="width: 100%">
          <div v-for="(i,index) in showItem"
               :key="index"
               class="text-center item"
               :class="{color73f40:((jcInfo.lottery_id === '20' || jcInfo.lottery_id === '21')&&i.colorRed)}"
          >
            <div>{{i.txt}}</div>
            <div>{{i.odds?`(${i.odds})`:null}}</div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="downShow">
      <div @click="show" class="down_gray">
        <div>
          <!--图标-->
        </div>
      </div>
      <div v-show="down" class="down-gray-details">
        <div @click="show" class="body">
          <div v-for="(item,key) in jcInfo.betTxt" :key="key">
            <div v-for="(i,index) in item" :key="index" class="text-center item borderBottom">
              <div class="color333">{{i.txt}}</div>
              <div class="color888">{{i.odds?`(${i.odds})`:null}}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'example',
    props: {
      jcInfo: {type: null}
    },
    data () {
      return {
        down: false,
        downShow: false
      }
    },
    computed: {
      showItem () {
        let arr = []
        const isBig2 = this.jcInfo.betTxt.some(item => {
          if (item.length > 2) {
            item.length = 2
          }
          if (this.jcInfo.lottery_id === '20' || this.jcInfo.lottery_id === '21') {
            item[0].colorRed = this.jcInfo.result_odds && this.jcInfo.result_odds.prize_num === this.jcInfo.betting_order.betting_num
          }
          arr.push(...item)
          return arr.length >= 2
        })
        if (isBig2) {
          this.downShow = true
        }
        // console.log(arr)
        return arr
      }
    },
    methods: {
      show () {
        this.down = !this.down
      }
    }
  }
</script>

<style scoped>
  .down_gray {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    background: -webkit-linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5)); /* Safari 5.1 - 6 */
    background: -o-linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5)); /* Opera 11.1 - 12*/
    background: -moz-linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5)); /* Firefox 3.6 - 15*/
    background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5)); /* 标准的语法 */
  }

  .down_gray div {
    display: inline-block;
    width: 0.31rem;
    height: 0.6rem;
    background-image: url('../../../assets/betting/down_gray.png');
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: bottom;
  }

  .down-gray-details {
    width: 100%;
    font-size: 0.25rem;
    position: absolute;
    background-color: white;
    box-shadow: -3px 3px 5px #ddd;
    z-index: 1;
    top: 1.8rem;
  }

  .color73f40 {
    color: #e73f40;
  }

  .color333 {
    color: #333333;
  }

  .color888 {
    color: #888888;
  }

  .body {
    height: 100%;
    font-size: 0.25rem;
  }

  .body > div {
    border-left: 1px solid #dddddd;
  }

  .body .item, .body .item div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .borderBottom {
    background-image: url("../../../assets/dashed.png");
    background-position: bottom;
    background-repeat: repeat-x;
    background-size: 6px 1px;
  }

</style>
