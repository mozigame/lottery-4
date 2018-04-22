<template>
  <div class="digital-list-item" @click="changePanelStatus">
    <div class="list-item" :class="{spread: spread}">
      <div class="list-item-head">
        <span class="text-normal">第{{data.issue_no}}期</span>
        <span class="text-light text-sm">{{data.prize_time | dateFormat('MM-dd')}} ({{data.week}})</span>
      </div>
      <div class="list-item-result margin-top-10">
        <slot name="number"></slot>
      </div>
    </div>
    <transition
      enter-active-class="animated fadeInDown">
      <div class="panel" v-show="spread">
        <slot name="data"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'digitalListItem',
    props: ['data'],
    data () {
      return {
        spread: false
      }
    },
    methods: {
      changePanelStatus () {
        this.spread = !this.spread;
      }
    }
  }
</script>

<style>
  .digital-list-item .list-item{
    padding: 5px 30px 10px 10px;
    position: relative;
    background: white url("../../../assets/icon/arrow_right.png") 97% center no-repeat;
    background-size: 10px auto;
    border-top: 1px solid #f2f2f2;
  }
  .digital-list-item .list-item.spread {
    background: white url("../../../assets/icon/arrow_bottom.png") 97% center no-repeat;
    background-size: 18px auto;
  }
  .digital-list-item .bg-red-ball,
  .digital-list-item .bg-blue-ball,
  .digital-list-item .red-ball,
  .digital-list-item .blue-ball {
    width: 25px; height: 25px;
    line-height: 25px;
    display: inline-block;
    text-align: center;
    margin-right: 5px;
  }
  .digital-list-item .red-ball {
    color: #e73f40;
  }
  .digital-list-item .blue-ball {
    color: #3f6ee7;
  }
  .digital-list-item .red-ball.bg-red-ball,
  .digital-list-item .blue-ball.bg-blue-ball {
    color: white;
  }
  .digital-list-item .winnings-table {
    text-align: center;
    background: white;
    font-size: 12px;
    color: #999;
  }
  .digital-list-item .winnings-table .col {
    padding: 6px;
  }
  .digital-list-item .winnings-table .row.gray {
    background: #f2f2f2;
  }
  .digital-list-item .winnings-table .row {
    margin-top: 0;
  }
  .digital-list-item .col.padding-top-0 {
    padding-top: 0;
  }
</style>
