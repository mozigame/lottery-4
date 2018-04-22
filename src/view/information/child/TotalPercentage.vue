<template>
  <div class="total-percentage">
    <div class="percentage" :class="direction">
      <span :style="style"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'totalPercentage',
    props: ['direction', 'percent'],
    computed: {
      style () {
        if (this.percent > 0 && this.percent < 1) {
          return { width: this.percent * 100 + '%' };
        } else if (parseFloat(this.percent) === 0) {
          return { border: 'none' };
        } else if (parseFloat(this.percent) === 1) {
          return { width: '100%', height: '5px', border: 'none', background: this.direction === 'left' ? 'red' : 'blue' }
        }
      }
    }
  }
</script>

<style>
  .total-percentage .percentage {
    background: #F5F5F5;
    height: 5px; width: 100%;
    position: relative;
  }
  .total-percentage .percentage span {
    height: 0;
    display: block;
    position: absolute;
    right: 0;
    width: 0;
  }
  .total-percentage .percentage.center {
    background: red;
  }
  .total-percentage .percentage.center span {
    border-color: blue blue transparent transparent;
    border-style: solid none solid solid;
    border-width: 5px 0 0 5px;
  }
  .total-percentage .percentage.left span {
    border-color: red red transparent transparent;
    border-style: solid none solid solid;
    border-width: 5px 0 0 5px;
  }
  .total-percentage .percentage.left.zero span,
  .total-percentage .percentage.right.zero span{
    border: none;
  }
  .total-percentage .percentage.left span.full {
    border: none;
    width: 100%;
    height: 5px;
    background: red;
  }
  .total-percentage .percentage.right span.full {
    border: none;
    width: 100%;
    height: 5px;
    background: blue;
  }
  .total-percentage .percentage.right span {
    border-color: blue transparent transparent transparent;
    border-style: solid solid solid solid;
    border-width: 5px 5px 0 0;
    right: auto;
    left:0;
  }
</style>
