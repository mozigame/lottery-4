<template>
  <div class="sport-filter" v-show="show">
    <v-dialog title="赛事选择" @close="closeDialog">
      <div class="dialog-container">
        <div class="top-btn-wrap clear">
          <a href="javascript:;" :class="{selected: currentNav === 0}" @click="navSelect(0)">全选</a>
          <a href="javascript:;" :class="{selected: currentNav === 1}" @click="navSelect(1)">反选</a>
          <a v-if="type === 'football'" href="javascript:;" :class="{selected: currentNav === 2}" @click="navSelect(2)">仅五大联赛</a>
        </div>
        <div class="selected-box">
          <div class="text-item"
               v-for="text in textContent"
               @click="textSelect(text)"
               :class="{selected: textIsSelected(text)}">{{text}}</div>
        </div>
        <div class="text-center text-light text-sm margin-top-10">
          共有 <span class="text-primary">{{total}}</span> 场比赛
        </div>
      </div>
      <div class="btn-wrap clear">
        <a href="javascript:;" @click="closeDialog">取消</a>
        <a href="javascript:;" @click="confirm">确定</a>
      </div>
    </v-dialog>
  </div>
</template>

<script>
  import VDialog from '../../../components/VDialog.vue';
  import {mapState} from 'vuex';
  import Toast from '../../../common/toast';
  import {SPORTS_FILTER_PANEL_CHANGE} from '../../../store/betting/types';
  const FIVE_LEAGUE = ['德甲', '西甲', '英超', '法甲', '意甲'];
  export default {
    name: 'sportFilter',
    props: ['type'],
    data () {
      return {
        currentNav: 0,
        currentSelected: []
      }
    },
    computed: {
      ...mapState({
        show: state => state.betting.filterPanelVisible
      }),
      textContent () {
        let texts = [];
        let current = this.$store.state.betting[this.$store.state.betting.lottery];
        if (current.scheme[current.mode === 2 ? 0 : 1]) {
          current.scheme[current.mode === 2 ? 0 : 1].groups.map(value => {
            value.schedules.map(v => {
              if (!texts.includes(v.league)) {
                texts.push(v.league);
              }
            })
          });
          this.currentSelected = [...texts];
        }
        return texts;
      },
      total () {
        let total = 0;
        let current = this.$store.state.betting[this.$store.state.betting.lottery];
        if (current.scheme[current.mode === 2 ? 0 : 1]) {
          current.scheme[current.mode === 2 ? 0 : 1].groups.map(value => {
            value.schedules.map(v => {
              if (this.currentSelected.includes(v.league)) {
                total++;
              }
            })
          });
        }
        return total;
      }
    },
    methods: {
      textIsSelected (item) {
        return this.currentSelected.includes(item);
      },
      textSelect (item) {
        let index = this.currentSelected.indexOf(item);
        if (index !== -1) {
          this.currentSelected.splice(index, 1);
        } else {
          this.currentSelected.push(item);
        }
      },
      navSelect (type) {
        if (type === 0) {
          this.currentSelected = [...this.textContent];
        } else if (type === 1) {
          let other = [];
          this.textContent.map(v => {
            if (!this.currentSelected.includes(v)) {
              other.push(v);
            }
          });
          this.currentSelected = other;
        } else if (type === 2) {
          let other = [];
          this.textContent.map(v => {
            if (FIVE_LEAGUE.includes(v)) {
              other.push(v);
            }
          });
          this.currentSelected = other;
        }
        this.currentNav = type;
      },
      closeDialog () {
        this.$store.commit(SPORTS_FILTER_PANEL_CHANGE, false);
      },
      confirm () {
        if (this.total > 0) {
          this.$store.commit(SPORTS_FILTER_PANEL_CHANGE, false);
          this.$emit('confirm', [...this.currentSelected]);
        } else {
          Toast('筛选结果为空,请重新选择');
        }
      }
    },
    components: {VDialog}
  }
</script>

<style>
  .sport-filter .dialog .content {
    background: #f2f2f2;
  }
  .sport-filter .dialog-container {
    padding: 10px 8px;
  }
  .sport-filter .dialog-container .top-btn-wrap {
    margin: 0 1%;
  }
  .sport-filter .dialog-container .top-btn-wrap a{
    width: 33.3%; float: left;
    color: #e73f40; background: white;
    text-align: center; font-size: 12px;
    padding: 5px; border: 1px solid #e73f40;
  }
  .sport-filter .dialog-container .top-btn-wrap a:first-child {
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
    border-right: 0;
  }
  .sport-filter .dialog-container .top-btn-wrap a:last-child {
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
    border-left: 0;
  }
  .sport-filter .dialog-container .top-btn-wrap a.selected {
    color: white;
    background: #e73f40;
  }
  .sport-filter .selected-box {
    padding: 15px 0 0 0;
    max-height: 200px;
    overflow-y: auto;
  }
  .sport-filter .selected-box .text-item {
    background: white;
    margin: 3px 1%;
    width: 31%; float: left;
    border-radius: 5px;
    text-align: center; font-size: 14px;
    padding: 5px 0;
    border: 1px solid white;
  }
  .sport-filter .selected-box .text-item.selected {
    background: white url(../../../assets/betting/selected.png) right bottom no-repeat;
    background-size: auto 60%;
    border: 1px solid #e73f40;
  }
  .sport-filter .btn-wrap a {
    width: 50%; float: left;
    padding: 10px 0;
    border-top: 1px solid #ddd;
    color: #666;
  }
  .sport-filter .btn-wrap a:last-child {
    border-left: 1px solid #ddd;
    color: #e73f40;
  }
</style>
