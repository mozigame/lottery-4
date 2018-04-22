<template>
  <div class="web-page">
    <v-head :title="title"></v-head>
    <iframe :src="url" ref="frame"></iframe>
  </div>
</template>

<script>
  import VHead from '../components/VHead.vue';
  import loading from '../common/loading';
  export default {
    name: 'webPage',
    data () {
      return {
        title: '加载中',
        url: ''
      }
    },
    created () {
      const query = this.$router.currentRoute.query;
      if (query.url) {
        this.url = query.url;
        query.title && (this.title = query.title);
      }
    },
    mounted () {
      loading.show();
      this.$refs.frame.onload = () => {
        loading.hide();
      }
      this.$refs.frame.onerror = () => {
        loading.hide();
      }
      this.$refs.frame.style.height = (window.innerHeight - 40) + 'px';
    },
    components: {VHead}
  }
</script>

<style>
  .web-page {
    height: 100%;
    position: relative;
  }
  .web-page .head {
    position: relative;
    z-index: 1;
  }
  .web-page iframe {
    width: 100%;
    border: none;
    position: absolute;
    top: 40px;
    left: 0; right: 0;
    bottom: 0;
    box-sizing: border-box;
    z-index: 0;
  }
</style>
