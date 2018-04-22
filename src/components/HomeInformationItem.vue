<template>
  <div class="home-information-item" @click="goWebPage">
    <div class="top"></div>
    <div class="information-item-container">
      <div class="img">
        <img :src="information.image_url">
      </div>
      <div class="title">
        {{information.title}}
        <span class="sub-title">{{information.sub_title}}</span>
      </div>
      <div class="description">
        {{description}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'homeInformationItem',
    props: {
      information: {type: Object, required: true}
    },
    computed: {
      description () {
        const des = this.information.description;
        const lg = des.length;
        return lg > 50 ? des.substr(0, 50) + ' ...' : des;
      }
    },
    methods: {
      goWebPage () {
        /* this.$router.push({
          name: 'WebPage',
          query: {
            title: this.information.title || ' ',
            url: this.information.webpage_url
          }
        }) */
        location.href = this.information.webpage_url;
      }
    }
  }
</script>

<style>
  .home-information-item {
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-top: 10px;
    background: white;
  }
  .home-information-item .top {
    height: 10px;
    background: #e3e3e3;
  }
  .home-information-item .information-item-container {
    padding-left: 55px;
    min-height: 50px;
    position: relative;
  }
  .home-information-item .information-item-container .img {
    position: absolute;
    width: 40px; height: 40px;
    left: 5px; top: 5px;
    border-radius: 40px;
    padding: 3px;
    border: 1px solid #ddd;
    overflow: hidden;
  }
  .home-information-item .information-item-container img {
    width: 100%;
    height: 100%;
    border-radius: 40px;
    border: none;
    background: #ddd;
  }
  .home-information-item .information-item-container .title {
    padding: 10px 0 5px 0;
    border-bottom: 1px solid #ddd;
    font-size: 15px;
    margin-right: 15px;
  }
  .home-information-item .information-item-container .sub-title {
    font-size: 13px; margin-left: 10px;
    color: #999;
  }
  .home-information-item .information-item-container .description {
    padding: 5px 15px 5px 0;
    color: #999;
    font-size: 14px;
    word-break: break-all;
  }
</style>
