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
  import {SFC_OPTION_SELECTED} from '../../../store/betting/types';
  export default {
    name: 'sfcSPFLottery',
    props: ['schedule'],
    methods: {
      onOptionSelected (item) {
        this.schedule.onOptionSelected(item);
        this.$store.commit(SFC_OPTION_SELECTED);
        this.$emit('onOptionSelected');
      },
      isSelected (item) {
        return this.schedule.selected.indexOf(item) !== -1;
      }
    }
  }
</script>
