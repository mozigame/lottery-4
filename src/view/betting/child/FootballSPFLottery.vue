<template>
  <div class="football-spf-lottery">
    <div class="row text-center text-default text-sm">
      <div class="col col-40"> <span class="text-primary" v-if="schedule.home_rank">[{{schedule.home_rank}}]</span>{{schedule.home}}</div>
      <div class="col text-light">VS</div>
      <div class="col col-40">{{schedule.guest}} <span class="text-primary" v-if="schedule.guest_rank">[{{schedule.guest_rank}}]</span></div>
    </div>
    <div class="box">
      <div class="box-item"
        @click="onOptionSelected(item, index)"
        v-for="(item, index) in schedule.holderList"
        :class="{selected: isSelected(item), 'box-center': index===1}">
        <span>{{item.text}} {{item.value}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {SPORTS_OPTION_SELECTED} from '../../../store/betting/types';
  export default {
    name: 'footballSPFLottery',
    props: ['schedule', 'isConfirm'],
    methods: {
      onOptionSelected (item) {
        this.schedule.onOptionSelected(item);
        this.$store.commit(SPORTS_OPTION_SELECTED);
        this.$emit('onOptionSelected');
      },
      isSelected (item) {
        return this.schedule.selected.indexOf(item) !== -1;
      }
    }
  }
</script>

<style>
  .football-spf-lottery {
    padding-left: 10px;
    font-size: 14px;
  }
  .football-spf-lottery .box {
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    background: white;
    text-align: center;
    margin-top: 8px;
    font-size: 13px;
  }
  .football-spf-lottery .box .box-item {
    padding: 7px 0;
    float: left;
    width: 35%;
  }
  .football-spf-lottery .box .box-item.box-center {
    width: 30%;
  }
  .football-spf-lottery .box .box-item.box-center span {
    border-left: 1px dotted #ddd;
    border-right: 1px dotted #ddd;
    display: inline-block;
    width: 100%;
  }
  .football-spf-lottery .box .box-item.selected {
    background: #e73f40;
    color: white;
  }
</style>
