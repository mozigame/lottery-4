<template>
  <div class="basket-panel-container">
    <div class="block">
      <div class="panel-title bg-white" @click="changeVisible">
        {{title}}
        <p class="test">
          <a class="cross2" :class="{cross: !visible}"></a>
        </p>
      </div>
      <div class="panel-container" v-show="visible">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'basketPanelContainer',
    props: ['title'],
    data () {
      return { visible: true }
    },
    methods: {
      changeVisible () {
        this.visible = !this.visible;
      }
    }
  }
</script>

<style>
  .basket-panel-container .cross2{
    background: transparent;
    height: 8px;
    position: relative;
    width: 2px;
    display: inline-block;
  }
  .basket-panel-container .cross2:after {
    background: white;
    content: "";
    height: 2px;
    left: -3px;
    position: absolute;
    top: 3px;
    width: 8px;
  }
  .basket-panel-container .cross {
    background: white;
    height: 8px;
    position: relative;
    width: 2px;
    display: inline-block;
  }

  .basket-panel-container .icon-up:after {
    content: "\2191";
  }
  .basket-panel-container .icon-down:after {
    content: "\2193";
  }
</style>
