<style scoped>
  .organ-item-title {
    position: relative;
    font-size: 0.3125rem;
    border-bottom: 1px solid #c9c9c9;
    padding: 0.21875rem 0.3125rem;
    /*margin:0.015625%;*/
    color: #666666;
  }

  .organ-item-title .left {
    display: inline-block;
    padding-left: 0.09375rem;
    border-left: 0.046875rem solid #e73f40;
  }

  .organ-item-title .right {
    position: absolute;
    display: inline-block;
    background: url("../../../assets/icon/arrow_circle_up.png") no-repeat;
    background-size: 100%;
    right: 0.3125rem;
    top: 0.21875rem;
    width: 0.40625rem;
    height: 0.40625rem;
    -webkit-transition: -webkit-transform 300ms;
    transition: transform 300ms;
  }

  .bgPlay {
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }

</style>
<template>
  <div>
    <div class="bg-white organ-item-title" @click="show">
      <span class="left">置顶比赛</span>
      <span class="right" :class="{bgPlay:rotate}"> </span>
    </div>
    <ul v-show="ShowItem" style="padding: 0.14rem;">
      <slot name="top"></slot>
      <li v-for="(item,index) in propsData" :key="item.id">
        <slot :data="item" :index="index"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'toTheTop',
    props: {
      propsData: {
        type: Array, required: true
      },
      name: {type: String}
    },
    data () {
      return {
        ShowItem: true, // 是否显示
        rotate: false // 旋转
      }
    },
    methods: {
      show () {
        this.rotate = !this.rotate
        this.ShowItem = !this.ShowItem
      }
    }
  }
</script>
