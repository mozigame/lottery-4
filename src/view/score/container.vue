<style scoped>

</style>
<template>
  <div>
    <!--没有登陆去登陆-->
    <not-logged-in v-if="showLogin&&isLogin"/>
    <!--竞足-->
    <div v-else-if="switchBody[0]===1">
      <div v-show="switchBody[1]===1">
        <div v-if="a11.groups.length">
          <to-the-top v-if="toTop11.length" :propsData="toTop11">
            <template slot-scope="props">
              <football :propsData="props.data" :index="[0,props.index]"/>
            </template>
          </to-the-top>
          <organ-list v-for="(item,index) in a11.groups"
                      :key="item.data"
                      :propsData="item">
            <template slot-scope="props">
              <football :propsData="props.data" :index="[index,props.index]"/>
            </template>
          </organ-list>
        </div>
      </div>
      <div v-show="switchBody[1]===2">
        <div v-if="a12.groups.length">
          <to-the-top v-if="toTop12.length" :propsData="toTop12">
            <template slot-scope="props">
              <football :propsData="props.data" :index="[0,props.index]"/>
            </template>
          </to-the-top>
          <organ-list v-for="(item,index) in a12.groups"
                      :key="item.data"
                      :propsData="item">
            <template slot-scope="props">
              <football :propsData="props.data" :index="[index,props.index]"/>
            </template>
          </organ-list>
        </div>
      </div>
      <div v-show="switchBody[1]===3">
        <div v-if="a13.groups.length">
          <to-the-top v-if="toTop13.length" :propsData="toTop13">
            <template slot-scope="props">
              <football :propsData="props.data" :index="[0,props.index]"/>
            </template>
          </to-the-top>
          <organ-list v-for="(item,index) in a13.groups"
                      :key="item.data"
                      :propsData="item">
            <template slot-scope="props">
              <football :propsData="props.data" :index="[index,props.index]"/>
            </template>
          </organ-list>
        </div>
      </div>
      <div v-show="switchBody[1]===4">
        <div v-if="a14.groups.length">
          <mine-football :propsData="a14.groups"/>
        </div>
      </div>
    </div>
    <!--胜负彩-->
    <div v-else-if="switchBody[0]===2">
      <div v-show="switchBody[1]===1">
        <div v-if="a21.groups.length">
          <to-the-top v-if="toTop21.length" :propsData="toTop21">
            <template slot-scope="props">
              <result :propsData="props.data" :index="[0,props.index]"/>
            </template>
          </to-the-top>
          <organ-list :propsData="a21.groups[SelectIndex]"
                      :name="toTop21.length?`第${a21.groups[SelectIndex].id}期`:''">
            <template slot-scope="props">
              <result :propsData="props.data" :index="[SelectIndex,props.index]"/>
            </template>
          </organ-list>
        </div>
      </div>
      <div v-show="switchBody[1]===2">
        <div v-if="a22.groups.length">
          <mine-football :propsData="a22.groups"/>
        </div>
      </div>
    </div>
    <!--竞篮-->
    <div v-else-if="switchBody[0]===3">
      <div v-show="switchBody[1]===1">
        <div v-if="a31.groups.length">
          <to-the-top v-if="toTop31.length" :propsData="toTop31">
            <template slot-scope="props">
              <baskbetball :propsData="props.data" :index="[0,props.index]"/>
            </template>
          </to-the-top>
          <organ-list v-for="(item,index)  in a31.groups" :key="item.data" :propsData="item">
            <template slot-scope="props">
              <baskbetball :propsData="props.data" :index="[index,props.index]"/>
            </template>
          </organ-list>
        </div>
      </div>
      <div v-show="switchBody[1]===2">
        <div v-if="a32.groups.length">
          <to-the-top v-if="toTop32.length" :propsData="toTop32">
            <template slot-scope="props">
              <baskbetball :propsData="props.data" :index="[0,props.index]"/>
            </template>
          </to-the-top>
          <organ-list v-for="(item,index)  in a32.groups" :key="item.data" :propsData="item">
            <template slot-scope="props">
              <baskbetball :propsData="props.data" :index="[index,props.index]"/>
            </template>
          </organ-list>
        </div>
      </div>
      <div v-show="switchBody[1]===3">
        <div v-if="a33.groups.length">
          <to-the-top v-if="toTop33.length" :propsData="toTop33">
            <template slot-scope="props">
              <baskbetball :propsData="props.data" :index="[0,props.index]"/>
            </template>
          </to-the-top>
          <organ-list v-for="(item,index)  in a33.groups" :key="item.data" :propsData="item">
            <template slot-scope="props">
              <baskbetball :propsData="props.data" :index="[index,props.index]"/>
            </template>
          </organ-list>
        </div>
      </div>
      <div v-show="switchBody[1]===4">
        <div v-if="a34.groups.length">
          <mine-baskbetball :propsData="a34.groups"/>
        </div>
      </div>
    </div>
    <!---->
    <to-bet-buy v-show="showToB" :to="loadingFinish[switchBody]"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import ToBetBuy from '../../components/ToBetBuy.vue'
  import NotLoggedIn from '../../components/NotLoggedIn.vue'
  import toTheTop from './ListContainer/toTheTop.vue'
  import organList from './ListContainer/organList.vue'
  import Result from './Result/mine.vue'
  import Baskbetball from './Baskbetball/mine.vue'
  import Football from './Football/mine.vue'
  import MineFootball from './mine/MineFootball/mine.vue'
  import MineBaskbetball from './mine/MineBaskbetball/mine.vue'

  export default {
    name: 'container',
    props: {
      SelectIndex: {type: Number},
      showToB: {type: Boolean},
      switchBody: {type: Array}, // 当前显示
      isLogin: {type: Boolean} // 是否登陆
    },
    data () {
      return {
        loadingFinish: {[`1,4`]: `/betting/football`, [`2,2`]: `/betting/sfc/20`, [`3,4`]: `/betting/basketball`}
      }
    },
    computed: {
      ...mapState({
        a11: state => state.score[`11`],
        a12: state => state.score[`12`],
        a13: state => state.score[`13`],
        a14: state => state.score[`14`],
        a31: state => state.score[`31`],
        a32: state => state.score[`32`],
        a33: state => state.score[`33`],
        a34: state => state.score[`34`],
        a21: state => state.score[`21`],
        a22: state => state.score[`22`],
        toTop11: state => state.score['toTop11'],
        toTop12: state => state.score['toTop12'],
        toTop13: state => state.score['toTop13'],
        toTop31: state => state.score['toTop31'],
        toTop32: state => state.score['toTop32'],
        toTop33: state => state.score['toTop33'],
        toTop21: state => state.score['toTop21']
      }),
      showLogin () {
        if (this.switchBody[0] === 1 || this.switchBody[0] === 3) {
          if (this.switchBody[1] === 4) {
            return true
          }
        } else if (this.switchBody[1] === 2) {
          return true
        }
        return false
      }
    },
    components: {
      NotLoggedIn,
      ToBetBuy,
      toTheTop,
      organList,
      Result,
      Baskbetball,
      Football,
      MineFootball,
      MineBaskbetball
    }
  }
</script>
