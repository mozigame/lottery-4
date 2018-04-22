<template>
  <div class="infinite-scroll-loading" v-show="show">
    <div class="mint-spinner-fading-circle circle-color-10">
      <div class="mint-spinner-fading-circle-circle is-circle2"></div>
      <div class="mint-spinner-fading-circle-circle is-circle3"></div>
      <div class="mint-spinner-fading-circle-circle is-circle4"></div>
      <div class="mint-spinner-fading-circle-circle is-circle5"></div>
      <div class="mint-spinner-fading-circle-circle is-circle6"></div>
      <div class="mint-spinner-fading-circle-circle is-circle7"></div>
      <div class="mint-spinner-fading-circle-circle is-circle8"></div>
      <div class="mint-spinner-fading-circle-circle is-circle9"></div>
      <div class="mint-spinner-fading-circle-circle is-circle10"></div>
      <div class="mint-spinner-fading-circle-circle is-circle11"></div>
      <div class="mint-spinner-fading-circle-circle is-circle12"></div>
      <div class="mint-spinner-fading-circle-circle is-circle13"></div>
    </div>
    <span class="text-muted padding-left">加载中...</span>
  </div>
</template>

<script>
  export default {
    name: 'infiniteScrollLoading',
    props: ['show']
  }
</script>

<style>
  .infinite-scroll-loading {
    height: 32px; line-height: 32px;
    text-align: center;
    font-size: 14px;
  }
  .infinite-scroll-loading .mint-spinner-fading-circle {
    width: 20px; height: 20px;
    display: inline-block;
    vertical-align: middle;
  }
</style>
