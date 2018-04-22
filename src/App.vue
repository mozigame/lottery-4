<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import 'babel-polyfill';
  import FastClick from 'fastclick';
  FastClick.attach(document.body);
  export default {
    name: 'app'
  }
</script>

<style>
  @import "style/common.css";
  @import "style/animate.css";
  #app {
    height: 100%;
  }
</style>
